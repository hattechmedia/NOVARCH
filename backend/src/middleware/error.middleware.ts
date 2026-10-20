import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error('[API error]', err.name);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  const status = (err as Error & { status?: number }).status;
  const code = status && [400, 413, 429, 503].includes(status) ? status : 500;
  return res.status(code).json({
    success: false,
    message: code === 503 ? 'Service temporarily unavailable' : code === 413 ? 'Request too large' : code === 400 ? 'Invalid request' : 'Internal server error',
  });
}
