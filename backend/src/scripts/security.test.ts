import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-only-random-signing-key-0123456789';
process.env.ADMIN_PASSWORD = 'test-only-unconfigured';
process.env.MONGODB_URI = '';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_unit_test';

async function main() {
const { escapeHtml, htmlValues } = await import('../utils/html.js');
const { authController } = await import('../controllers/auth.controller.js');
const { connectDatabase } = await import('../config/database.js');
const { contactRepository } = await import('../repositories/contact.repository.js');
const { validateSession, credentialVersion } = await import('../services/session.service.js');
const { SessionModel } = await import('../models/session.model.js');
const { ContactModel } = await import('../models/contact.model.js');
const checkout = (await import('../routes/checkout.routes.js')).default;

function response() {
  return { code: 200, body: undefined as unknown,
    status(code: number) { this.code = code; return this; },
    json(body: unknown) { this.body = body; return this; },
    send(body: unknown) { this.body = body; return this; }, setHeader() {},
  };
}
test('HTML text and attribute injection are escaped without modifying original data', () => {
  const input = { name: '<img src=x onerror="alert(1)">', portfolioUrl: 'javascript:alert(1)' };
  const safe = htmlValues(input);
  assert.equal(safe.name.includes('<img'), false);
  assert.equal(safe.portfolioUrl, '#');
  assert.equal(input.name.startsWith('<img'), true);
  assert.equal(escapeHtml('&<>"\''), '&amp;&lt;&gt;&quot;&#39;');
});
test('NoSQL objects and oversized credentials are rejected before authentication', async () => {
  for (const body of [{ email: { $ne: null }, password: 'x' }, { email: 'user@example.com', password: 'x'.repeat(1000) }]) {
    const res = response(); await authController.login({ body } as never, res as never); assert.equal(res.code, 400);
  }
});
test('Database failure rejects writes instead of creating a temporary successful record', async () => {
  await assert.rejects(connectDatabase, /Database unavailable/);
  await assert.rejects(() => contactRepository.create({ name: 'Test', email: 'test@example.com' }), /Database unavailable/);
});
test('Bearer tokens need pinned algorithm, admin claims and a live revocable session', async () => {
  const key = process.env.JWT_SECRET!;
  const options = { issuer: 'novarch-api', audience: 'novarch-admin', expiresIn: 60, jwtid: 'unit-session' };
  for (const payload of [{ username: 'admin@novarch.eu', role: 'viewer' }, { username: 'other@example.com', role: 'admin' }]) {
    await assert.rejects(() => validateSession(jwt.sign(payload, key, options)), /Invalid claims/);
  }
  await assert.rejects(() => validateSession(jwt.sign({ role: 'admin' }, key, { algorithm: 'HS384' })));
  const token = jwt.sign({ username: 'admin@novarch.eu', role: 'admin' }, key, options);
  const descriptor = Object.getOwnPropertyDescriptor(mongoose.connection, 'readyState');
  Object.defineProperty(mongoose.connection, 'readyState', { configurable: true, value: 1 });
  const original = SessionModel.findOne;
  try {
    SessionModel.findOne = (() => ({ lean: async () => null })) as never;
    await assert.rejects(() => validateSession(token), /revoked/);
    SessionModel.findOne = ((filter: { credentialVersion: string }) => ({ lean: async () => filter.credentialVersion === credentialVersion() ? { tokenId: 'unit-session' } : null })) as never;
    assert.equal((await validateSession(token)).role, 'admin');
  } finally {
    SessionModel.findOne = original;
    if (descriptor) Object.defineProperty(mongoose.connection, 'readyState', descriptor); else delete (mongoose.connection as unknown as Record<string, unknown>).readyState;
  }
});
test('Unsigned webhook cannot touch payment records', async () => {
  const layer = (checkout as any).stack.find((entry: { route?: { path: string } }) => entry.route?.path === '/webhook');
  const handler = layer.route.stack[0].handle;
  const res = response(); await handler({ headers: {}, body: Buffer.from('{}') }, res);
  assert.equal(res.code, 400);
});
test('Failure webhook updates only its immutable session ID and excludes received payments', async () => {
  const payload = JSON.stringify({ id: 'evt_unit', type: 'checkout.session.async_payment_failed', data: { object: { id: 'cs_unit', customer_email: 'victim@example.com' } } });
  const signature = Stripe.webhooks.generateTestHeaderString({ payload, secret: process.env.STRIPE_WEBHOOK_SECRET! });
  const descriptor = Object.getOwnPropertyDescriptor(mongoose.connection, 'readyState');
  Object.defineProperty(mongoose.connection, 'readyState', { configurable: true, value: 1 });
  const original = ContactModel.updateOne; let query: Record<string, unknown> = {};
  ContactModel.updateOne = ((filter: Record<string, unknown>) => { query = filter; return Promise.resolve({ modifiedCount: 1 }); }) as never;
  try {
    const layer = (checkout as any).stack.find((entry: { route?: { path: string } }) => entry.route?.path === '/webhook');
    const res = response(); await layer.route.stack[0].handle({ headers: { 'stripe-signature': signature }, body: Buffer.from(payload) }, res);
    assert.equal(res.code, 200); assert.equal(query.stripeSessionId, 'cs_unit'); assert.equal('email' in query, false);
    assert.deepEqual(query.paymentReceivedAt, { $exists: false });
  } finally {
    ContactModel.updateOne = original;
    if (descriptor) Object.defineProperty(mongoose.connection, 'readyState', descriptor); else delete (mongoose.connection as unknown as Record<string, unknown>).readyState;
  }
});

test('Paid webhook is idempotent and rejects catalog amount tampering', async () => {
  const { emailService } = await import('../services/email.service.js');
  const descriptor = Object.getOwnPropertyDescriptor(mongoose.connection, 'readyState');
  Object.defineProperty(mongoose.connection, 'readyState', { configurable: true, value: 1 });
  const update = ContactModel.findOneAndUpdate, exists = ContactModel.exists, send = emailService.sendContactLeadNotification;
  let received = false, notifications = 0, writes = 0;
  ContactModel.findOneAndUpdate = (async (filter: Record<string, unknown>) => {
    assert.equal(filter.stripeSessionId, 'cs_paid');
    assert.deepEqual(filter.paymentReceivedAt, { $exists: false });
    writes++;
    if (received) throw Object.assign(new Error('duplicate'), { code: 11000 });
    received = true;
    return { _id: 'id', createdAt: new Date(), updatedAt: new Date(), toJSON: () => ({ name: 'Test', email: 'test@example.com' }) };
  }) as never;
  ContactModel.exists = (async () => received ? { _id: 'id' } : null) as never;
  emailService.sendContactLeadNotification = async () => { notifications++; return { sent: true, status: 'sent' }; };
  try {
    const layer = (checkout as any).stack.find((entry: { route?: { path: string } }) => entry.route?.path === '/webhook');
    async function deliver(amount: number, paymentStatus = 'paid') {
      const payload = JSON.stringify({ id: 'evt_paid', type: 'checkout.session.completed', data: { object: {
        id: 'cs_paid', payment_status: paymentStatus, currency: 'eur', amount_total: amount,
        customer_email: 'test@example.com', metadata: { packageId: 'digital-launch-basic' },
      } } });
      const signature = Stripe.webhooks.generateTestHeaderString({ payload, secret: process.env.STRIPE_WEBHOOK_SECRET! });
      const res = response(); await layer.route.stack[0].handle({ headers: { 'stripe-signature': signature }, body: Buffer.from(payload) }, res); return res;
    }
    assert.equal((await deliver(1)).code, 400); assert.equal(writes, 0);
    assert.equal((await deliver(49000, 'unpaid')).code, 200); assert.equal(writes, 0);
    const results = await Promise.all([deliver(49000), deliver(49000)]);
    assert.ok(results.every(res => res.code === 200)); assert.equal(notifications, 1);
  } finally {
    ContactModel.findOneAndUpdate = update; ContactModel.exists = exists; emailService.sendContactLeadNotification = send;
    if (descriptor) Object.defineProperty(mongoose.connection, 'readyState', descriptor); else delete (mongoose.connection as unknown as Record<string, unknown>).readyState;
  }
});
}
main().catch(error => { console.error(error); process.exitCode = 1; });
