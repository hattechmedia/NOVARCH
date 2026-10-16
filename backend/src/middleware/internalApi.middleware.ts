import { Request, Response, NextFunction } from 'express';
import { timingSafeEqualString } from '../utils/crypto.js';

/**
 * Optional shared secret between the Next.js BFF and this API.
 * When INTERNAL_API_SECRET is set, public form POSTs must send X-Internal-Token.
 * Browser CORS + JWT still protect admin routes; this stops direct spam to the backend origin.
 */
export function requireInternalApiSecret(req: Request, res: Response, next: NextFunction): void {
  const expected = process.env.INTERNAL_API_SECRET;
  if (!expected) {
    next();
    return;
  }

  const provided = String(req.headers['x-internal-token'] || '');
  if (!timingSafeEqualString(provided, expected)) {
    res.status(403).json({
      success: false,
      error: 'Forbidden',
    });
    return;
  }

  next();
}
