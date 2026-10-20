import { Request, Response, NextFunction } from 'express';
import { validateSession } from '../services/session.service.js';

export interface AdminAuthRequest extends Request {
  adminUser?: {
    username: string;
    role: string;
  };
}

export async function verifyAdminToken(req: AdminAuthRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication token required to access this resource.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await validateSession(token);
    res.setHeader('Cache-Control', 'no-store');
    req.adminUser = decoded;
    next();
  } catch (error) {
    if ((error as { status?: number }).status === 503) {
      res.status(503).json({ error: 'Authentication temporarily unavailable' });
      return;
    }
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired authentication token. Please log in again.',
    });
    return;
  }
}
