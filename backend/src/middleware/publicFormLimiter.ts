import rateLimit from 'express-rate-limit';

/** Unauthenticated public POST only. Admin GET/PATCH/DELETE are not limited here. */
export const publicFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many submissions from this network. Please wait a few minutes and try again.',
  },
});
