import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { config } from '../config/index.js';
import { getPackageBySlugOrId } from '../config/packageCatalog.js';
import { contactRepository } from '../repositories/contact.repository.js';
import { ContactModel } from '../models/contact.model.js';

const router = Router();
const stripe = new Stripe(config.stripeSecretKey || 'sk_test_mock_dummy_key_for_init_123', {
  apiVersion: '2025-02-24.acacia' as any,
});

/**
 * POST /api/checkout/create-session
 * Server-side package validation & price lookup
 */
router.post('/create-session', async (req: Request, res: Response) => {
  try {
    const {
      serviceSlug,
      packageId,
      packageName,
      userName,
      userEmail,
      userPhone,
      userCompany,
      userNotes,
    } = req.body;

    if (!userEmail || !userName) {
      res.status(400).json({ error: 'Name and email are required' });
      return;
    }

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
      console.error('Failed to create initial lead in DB:', dbError);
    }

    res.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to create Stripe Checkout session',
    });
  }
});

/**
 * GET /api/checkout/verify-session
 * Server-side verification of Stripe Checkout Session status for success page
 */
router.get('/verify-session', async (req: Request, res: Response) => {
  const sessionId = req.query.session_id as string;
  if (!sessionId || typeof sessionId !== 'string') {
    res.status(400).json({ verified: false, message: 'Missing session_id parameter' });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session && session.payment_status === 'paid') {
      res.json({
        verified: true,
        customerEmail: session.customer_email || session.customer_details?.email,
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
  let event: Stripe.Event;

  // STRICT WEBHOOK SIGNATURE VERIFICATION
  if (!sig || !config.stripeWebhookSecret) {
    console.error('❌ Webhook Rejected: Missing stripe-signature header or secret configuration');
    res.status(400).send('Webhook Error: Missing Stripe signature or secret');
    return;
  }

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.stripeWebhookSecret
    );
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // 1. Payment Accepted (Checkout Completed)
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};
    const sessionId = session.id;
    const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : undefined;

    const amountEUR = session.amount_total
      ? session.amount_total / 100
      : (parseInt(metadata.numericPrice, 10) || 490);

    console.log(`✅ Webhook: Payment ACCEPTED (€${amountEUR}) for session: ${sessionId}`);

    try {
      // IDEMPOTENCY CHECK: Find by stripeSessionId or email
      let existing = await ContactModel.findOne({ stripeSessionId: sessionId });

      if (!existing && metadata.userEmail) {
        existing = await ContactModel.findOne({
          email: metadata.userEmail.toLowerCase(),
          status: 'Payment Pending',
        }).sort({ createdAt: -1 });
      }

      if (existing) {
        // Prevent duplicate updates if already marked Paid
        if (existing.status === 'Paid') {
          console.log(`ℹ️ Session ${sessionId} already processed as Paid. Idempotency preserved.`);
          res.json({ received: true, status: 'already_processed' });
          return;
        }

        existing.status = 'Paid';
        existing.estimatedValue = amountEUR;
        existing.planPrice = metadata.price || `€${amountEUR}`;
        existing.stripeSessionId = sessionId;
        if (paymentIntentId) existing.stripePaymentIntentId = paymentIntentId;
        existing.message = `✅ Stripe Payment ACCEPTED! Session: ${sessionId}. Notes: ${metadata.userNotes || 'None'}`;
        await existing.save();
        console.log('📥 Updated existing lead status to Paid:', sessionId);
      } else {
        await contactRepository.create({
          name: metadata.userName || session.customer_details?.name || 'Valued Client',
          email: metadata.userEmail || session.customer_email || 'client@novarch.io',
          phone: metadata.userPhone || undefined,
          company: metadata.userCompany || undefined,
          submissionType: 'service_lead',
          serviceType: metadata.serviceName || 'Service Blueprint',
          preferredService: metadata.serviceName || 'Service Blueprint',
          planName: metadata.packageName || 'Launch Blueprint',
          planTier: (metadata.tier === 'Basic' || metadata.tier === 'Premium') ? metadata.tier : 'Basic',
          planPrice: metadata.price || `€${amountEUR}`,
          estimatedValue: amountEUR,
          status: 'Paid',
          source: 'Service Package',
          stripeSessionId: sessionId,
          stripePaymentIntentId: paymentIntentId,
          message: `✅ Stripe Payment ACCEPTED! Session: ${sessionId}. Notes: ${metadata.userNotes || 'None'}`,
        });
        console.log('📥 Created new Paid inquiry in DB:', sessionId);
      }
    } catch (dbErr) {
      console.error('❌ Database processing error during webhook handling:', dbErr);
      // FAIL CLOSED: Return 500 so Stripe automatically retries webhook later
      res.status(500).json({ error: 'Database processing failure, retry queued' });
      return;
    }
  }

  // 2. Payment Declined / Failed
  if (
    event.type === 'payment_intent.payment_failed' ||
    event.type === 'checkout.session.async_payment_failed'
  ) {
    const object = event.data.object as any;
    const metadata = object.metadata || {};
    const failureReason = object.last_payment_error?.message || 'Payment declined by issuing bank';
    const sessionId = object.id;

    console.log('❌ Webhook: Payment DECLINED for session/intent:', sessionId, failureReason);

    try {
      const email = metadata.userEmail || object.customer_email;
      if (email) {
        const existing = await ContactModel.findOne({ email: email.toLowerCase() }).sort({ createdAt: -1 });
        if (existing && existing.status !== 'Paid') {
          existing.status = 'Payment Declined';
          existing.message = `❌ Stripe Payment DECLINED: ${failureReason}`;
          await existing.save();
          console.log('📥 Updated lead status to Payment Declined');
        }
      }
    } catch (dbErr) {
      console.error('❌ Database processing error during failure webhook:', dbErr);
      res.status(500).json({ error: 'Database failure' });
      return;
    }
  }

  res.json({ received: true });
});

export default router;
