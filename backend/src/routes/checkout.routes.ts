import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { config } from '../config/index.js';
import { contactRepository } from '../repositories/contact.repository.js';
import { ContactModel } from '../models/contact.model.js';

const router = Router();
const stripe = new Stripe(config.stripeSecretKey, {
  apiVersion: '2025-02-24.acacia' as any,
});

/**
 * POST /api/checkout/create-session
 * Create Stripe Checkout Session for service packages
 */
router.post('/create-session', async (req: Request, res: Response) => {
  try {
    const {
      serviceName,
      packageName,
      tier,
      price,
      currency = 'eur',
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

    // Parse exact price string (e.g. "$2,499" or "2499") to numeric amount
    const numericPrice = typeof price === 'number'
      ? price
      : parseInt(String(price).replace(/[^0-9]/g, ''), 10) || 2499;

    const unitAmount = Math.max(numericPrice * 100, 500); // minimum 500 cents ($5.00)

    const title = `${serviceName || 'NOVARCH Service'} - ${packageName || 'Package'} (${tier || 'Standard'})`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: title,
              description: `NOVARCH Enterprise Package: ${packageName || 'Service Package'}`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: userEmail,
      metadata: {
        serviceName: serviceName || '',
        packageName: packageName || '',
        tier: tier || '',
        price: String(price || `$${numericPrice}`),
        numericPrice: String(numericPrice),
        userName: userName || '',
        userEmail: userEmail || '',
        userPhone: userPhone || '',
        userCompany: userCompany || '',
        userNotes: userNotes || '',
      },
      success_url: `${config.frontendUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.frontendUrl}/services`,
    });

    // Record initial lead in DB as Payment Pending with exact numeric price
    try {
      await contactRepository.create({
        name: userName,
        email: userEmail,
        phone: userPhone || undefined,
        company: userCompany || undefined,
        submissionType: 'service_lead',
        serviceType: serviceName || 'Service Package',
        preferredService: serviceName || 'Service Package',
        planName: packageName || 'Service Package',
        planTier: (tier === 'Basic' || tier === 'Premium') ? tier : undefined,
        planPrice: String(price || `$${numericPrice}`),
        estimatedValue: numericPrice,
        status: 'Payment Pending',
        message: `Stripe checkout session initiated (${session.id}). Notes: ${userNotes || 'None'}`,
      });
    } catch (dbError) {
      console.error('Failed to create initial lead:', dbError);
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
 * POST /api/checkout/webhook
 * Listen to Stripe Webhook events for Accepted vs Declined payments
 */
router.post('/webhook', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  let event: Stripe.Event;

  try {
    if (sig && config.stripeWebhookSecret) {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        config.stripeWebhookSecret
      );
    } else {
      event = req.body;
    }
  } catch (err: any) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // 1. Payment Accepted (Checkout Completed)
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    const amountInDollars = session.amount_total
      ? session.amount_total / 100
      : (parseInt(metadata.numericPrice, 10) || 2499);

    console.log(`✅ Payment ACCEPTED ($${amountInDollars}) for session:`, session.id);

    try {
      // Find existing pending lead by email or update/create
      const email = metadata.userEmail || session.customer_email || 'client@novarch.io';
      const existing = await ContactModel.findOne({ email, status: 'Payment Pending' }).sort({ createdAt: -1 });

      if (existing) {
        existing.status = 'Paid';
        existing.estimatedValue = amountInDollars;
        existing.planPrice = metadata.price || `$${amountInDollars}`;
        existing.message = `✅ Stripe Payment ACCEPTED! Session: ${session.id}. Notes: ${metadata.userNotes || 'None'}`;
        await existing.save();
        console.log('📥 Updated existing lead status to Paid with amount:', amountInDollars);
      } else {
        await contactRepository.create({
          name: metadata.userName || session.customer_details?.name || 'Valued Client',
          email: email,
          phone: metadata.userPhone || '',
          company: metadata.userCompany || '',
          submissionType: 'service_lead',
          serviceType: metadata.serviceName || 'Service Subscription',
          preferredService: metadata.serviceName || 'Service Subscription',
          planName: metadata.packageName || 'Service Package',
          planTier: (metadata.tier === 'Basic' || metadata.tier === 'Premium') ? metadata.tier : undefined,
          planPrice: metadata.price || `$${amountInDollars}`,
          estimatedValue: amountInDollars,
          status: 'Paid',
          message: `✅ Stripe Payment ACCEPTED! Session: ${session.id}. Notes: ${metadata.userNotes || 'None'}`,
        });
        console.log('📥 Created new Paid inquiry in DB with amount:', amountInDollars);
      }
    } catch (dbErr) {
      console.error('Failed to record paid order in DB:', dbErr);
    }
  }

  // 2. Payment Declined / Failed
  if (
    event.type === 'payment_intent.payment_failed' ||
    event.type === 'checkout.session.async_payment_failed'
  ) {
    const object = event.data.object as any;
    const metadata = object.metadata || {};
    const failureReason = object.last_payment_error?.message || 'Payment declined by bank/Stripe';

    console.log('❌ Payment DECLINED for session/intent:', object.id, failureReason);

    try {
      const email = metadata.userEmail || object.customer_email;
      if (email) {
        const existing = await ContactModel.findOne({ email }).sort({ createdAt: -1 });
        if (existing) {
          existing.status = 'Payment Declined';
          existing.message = `❌ Stripe Payment DECLINED: ${failureReason}`;
          await existing.save();
          console.log('📥 Updated lead status to Payment Declined');
        }
      }
    } catch (dbErr) {
      console.error('Failed to record declined payment in DB:', dbErr);
    }
  }

  res.json({ received: true });
});

export default router;
