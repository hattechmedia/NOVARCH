import rateLimit from 'express-rate-limit';
import { MongoRateStore } from './mongoRateStore.js';
import { ipKeyGenerator } from 'express-rate-limit';
import { isIP } from 'net';

/** Unauthenticated public POST only. Admin GET/PATCH/DELETE are not limited here. */
export const publicFormLimiter = rateLimit({
  store: new MongoRateStore('public-form'),
  keyGenerator: req => {
    // This header is accepted only after requireInternalApiSecret authenticated the BFF.
    const forwarded = process.env.INTERNAL_API_SECRET ? req.get('x-form-client-ip') : undefined;
    return ipKeyGenerator(forwarded && isIP(forwarded) ? forwarded : req.ip || 'unknown');
  },
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many submissions from this network. Please wait a few minutes and try again.',
  },
});
