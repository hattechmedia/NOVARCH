import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { config } from '../config/index.js';
import { contactRepository } from '../repositories/contact.repository.js';

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
      currency = 'usd',
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

    // Convert price string (e.g. "$2,499" or "2499") to unit amount in cents
    const numericPrice = typeof price === 'number'
      ? price
      : parseInt(String(price).replace(/[^0-9]/g, ''), 10) || 1000;

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
        userName: userName || '',
        userEmail: userEmail || '',
        userPhone: userPhone || '',
        userCompany: userCompany || '',
        userNotes: userNotes || '',
      },
      success_url: `${config.frontendUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.frontendUrl}/services`,
    });

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
 * Listen to Stripe Webhook events
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

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    console.log('✅ Payment succeeded for session:', session.id);

    try {
      await contactRepository.create({
        name: metadata.userName || session.customer_details?.name || 'Valued Client',
        email: metadata.userEmail || session.customer_email || 'client@novarch.io',
        phone: metadata.userPhone || '',
        company: metadata.userCompany || '',
        preferredService: metadata.serviceName || 'Service Subscription',
        projectScope: `Package: ${metadata.packageName || ''} (${metadata.tier || ''})\nStripe Session: ${session.id}\nNotes: ${metadata.userNotes || ''}`,
        status: 'closed-won',
      });
      console.log('📥 Contact inquiry auto-created in DB for paid client!');
    } catch (dbErr) {
      console.error('Failed to record paid order in DB:', dbErr);
    }
  }

  res.json({ received: true });
});

export default router;
