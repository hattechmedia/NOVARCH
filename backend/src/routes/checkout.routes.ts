import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { z } from 'zod';
import { config } from '../config/index.js';
import { getPackageBySlugOrId } from '../config/packageCatalog.js';
import { contactRepository } from '../repositories/contact.repository.js';
import { ContactModel } from '../models/contact.model.js';
import { connectDatabase } from '../config/database.js';
import { emailService } from '../services/email.service.js';

const CreateCheckoutSessionSchema = z.object({
  serviceSlug: z.string().trim().max(200).optional(),
  packageId: z.string().trim().max(200).optional(),
  packageName: z.string().trim().max(200).optional(),
  userName: z.string().trim().min(2).max(100),
  userEmail: z.string().trim().email().toLowerCase(),
  userPhone: z.string().trim().max(50).optional(),
  userCompany: z.string().trim().max(100).optional(),
  userNotes: z.string().trim().max(500).optional(),
});

const router = Router();
const stripe = new Stripe(config.stripeSecretKey || 'sk_test_placeholder_unconfigured', {
  apiVersion: '2025-02-24.acacia' as any,
});

/**
 * POST /api/checkout/create-session
 * Server-side package validation & price lookup
 */
router.post('/create-session', async (req: Request, res: Response) => {
  try {
    if (!config.stripeSecretKey || config.stripeSecretKey.startsWith('sk_test_placeholder')) {
      res.status(503).json({ error: 'Checkout is not configured' });
      return;
    }

    const parsed = CreateCheckoutSessionSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: 'Name and a valid email are required' });
      return;
    }

    const {
      serviceSlug,
      packageId,
      packageName,
      userName,
      userEmail,
      userPhone,
      userCompany,
      userNotes,
    } = parsed.data;

    // SERVER-SIDE CANONICAL PACKAGE LOOKUP
    const catalogItem = getPackageBySlugOrId(packageId || serviceSlug || packageName);

    if (!catalogItem || !catalogItem.isPurchasable) {
      res.status(400).json({
        error: 'Invalid or non-purchasable package selected. Direct checkout is only available for fixed-price Launch Blueprints.',
      });
      return;
    }

    const unitAmountCents = catalogItem.amountCents;
    const priceEURFormatted = `€${catalogItem.priceEUR.toLocaleString()}`;
    const productTitle = `${catalogItem.name} (${catalogItem.serviceName})`;
    const productDesc = `One-time Blueprint purchase for ${catalogItem.serviceName} System`;

    await connectDatabase();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur', // Hardcoded server-side currency
            product_data: {
              name: productTitle,
              description: productDesc,
            },
            unit_amount: unitAmountCents, // Hardcoded server-side amount
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: userEmail,
      metadata: {
        packageId: catalogItem.id,
        serviceName: catalogItem.serviceName,
        packageName: catalogItem.name,
        tier: catalogItem.tier,
        price: priceEURFormatted,
        numericPrice: String(catalogItem.priceEUR),
        userName: userName.trim(),
        userEmail: userEmail.trim().toLowerCase(),
        userPhone: userPhone || '',
        userCompany: userCompany || '',
        userNotes: userNotes || '',
      },
      success_url: `${config.frontendUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.frontendUrl}/services`,
    });

    // Record initial lead in DB as Payment Pending with server-side validated price
    try {
      await connectDatabase();
      await contactRepository.create({
        name: userName.trim(),
        email: userEmail.trim().toLowerCase(),
        phone: userPhone || undefined,
        company: userCompany || undefined,
        submissionType: 'service_lead',
        serviceType: catalogItem.serviceName,
        preferredService: catalogItem.serviceName,
        planName: catalogItem.name,
        planTier: catalogItem.tier,
        planPrice: priceEURFormatted,
        estimatedValue: catalogItem.priceEUR,
        status: 'Payment Pending',
        source: 'Service Package',
        stripeSessionId: session.id,
        message: `Stripe checkout session initiated (${session.id}). Notes: ${userNotes || 'None'}`,
      });
    } catch (dbError) {
      await stripe.checkout.sessions.expire(session.id).catch(() => undefined);
      throw new Error('Unable to persist checkout');
    }

    res.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error('Stripe checkout creation failed');
    res.status(500).json({
      error: 'Failed to create Stripe Checkout session',
    });
  }
});

/**
 * GET /api/checkout/verify-session
 * Server-side verification of Stripe Checkout Session status for success page
 */
router.get('/verify-session', async (req: Request, res: Response) => {
  const sessionId = req.query.session_id as string;
  if (!sessionId || typeof sessionId !== 'string' || !sessionId.startsWith('cs_') || sessionId.length > 200) {
    res.status(400).json({ verified: false, message: 'Missing session_id parameter' });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session && session.payment_status === 'paid') {
      res.json({
        verified: true,
        amountTotal: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency?.toUpperCase() || 'EUR',
      });
      return;
    }
    res.json({ verified: false, status: session?.payment_status || 'unpaid' });
  } catch (err: any) {
    console.error('Failed to verify Stripe session server-side:', err.message);
    res.status(400).json({ verified: false, message: 'Invalid or non-existent Stripe session' });
  }
});

/**
 * POST /api/checkout/webhook
 * Signature verification, Idempotency, Fail-closed error handling
 */
router.post('/webhook', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = (config.stripeWebhookSecret || '').trim();

  // STRICT WEBHOOK SIGNATURE VERIFICATION
  if (!sig || !webhookSecret) {
    console.error('❌ Webhook Rejected: Missing stripe-signature header or secret configuration');
    res.status(400).send('Webhook Error: Missing Stripe signature or secret');
    return;
  }

  let event: Stripe.Event;
  let payload: any = (req as any).rawBody || req.body;
  if (typeof payload === 'object' && !Buffer.isBuffer(payload)) {
    payload = JSON.stringify(payload);
  }

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      webhookSecret
    );
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
    res.status(400).send('Invalid webhook signature');
    return;
  }


  try {
    await connectDatabase();
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata || {};
      const item = getPackageBySlugOrId(metadata.packageId);
      if (session.payment_status !== 'paid') { res.json({ received: true }); return; }
      if (!item || session.currency !== 'eur' || session.amount_total !== item.amountCents) {
        res.status(400).json({ error: 'Payment does not match catalog' }); return;
      }
      const email = session.customer_details?.email || session.customer_email;
      if (!email) { res.status(400).json({ error: 'Missing customer email' }); return; }
      const intent = typeof session.payment_intent === 'string' ? session.payment_intent : undefined;
      // Unique session ID plus an immutable receipt marker makes concurrent retries harmless,
      // even when the lead status is subsequently edited by an administrator.
      const paid = await ContactModel.findOneAndUpdate(
        { stripeSessionId: session.id, paymentReceivedAt: { $exists: false } },
        {
          $set: { status: 'Paid', paymentReceivedAt: new Date(), estimatedValue: item.priceEUR,
            planPrice: `€${item.priceEUR}`, stripePaymentIntentId: intent,
            message: 'Stripe payment verified' },
          $setOnInsert: { stripeSessionId: session.id, name: metadata.userName || 'Customer',
            email: email.toLowerCase(), submissionType: 'service_lead', serviceType: item.serviceName,
            preferredService: item.serviceName, planName: item.name, planTier: item.tier,
            source: 'Service Package' },
        }, { upsert: true, new: true, runValidators: true }
      );
      if (paid) {
        await emailService.sendContactLeadNotification({ ...paid.toJSON(), id: String(paid._id),
          createdAt: paid.createdAt.toISOString(), updatedAt: paid.updatedAt.toISOString() });
      }
    } else if (event.type === 'payment_intent.payment_failed' || event.type === 'checkout.session.async_payment_failed') {
      const object = event.data.object;
      let identity = event.type === 'payment_intent.payment_failed'
        ? { stripePaymentIntentId: object.id } : { stripeSessionId: object.id };
      if (event.type === 'payment_intent.payment_failed') {
        const sessions = await stripe.checkout.sessions.list({ payment_intent: object.id, limit: 1 });
        if (sessions.data[0]) identity = { stripeSessionId: sessions.data[0].id };
      }
      await ContactModel.updateOne({ ...identity, paymentReceivedAt: { $exists: false }, status: 'Payment Pending' },
        { $set: { status: 'Payment Declined', message: 'Payment failed; please retry checkout' } });
    }
    res.json({ received: true });
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      const object = event.data.object;
      try {
        const received = await ContactModel.exists({ stripeSessionId: (object as { id?: string }).id, paymentReceivedAt: { $exists: true } });
        if (received) { res.json({ received: true, status: 'already_processed' }); return; }
      } catch { /* Database failures must ask Stripe to retry. */ }
    }
    console.error('Webhook persistence failed');
    res.status(503).json({ error: 'Payment processing temporarily unavailable; retry required' });
  }
});

export default router;
