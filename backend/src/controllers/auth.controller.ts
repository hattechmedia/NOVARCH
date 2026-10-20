import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { config } from '../config/index.js';
import { timingSafeEqualString } from '../utils/crypto.js';
import { connectDatabase } from '../config/database.js';
import { SessionModel } from '../models/session.model.js';
import { credentialVersion, validateSession } from '../services/session.service.js';
import { auditService } from '../services/audit.service.js';

const credentials = z.object({ email: z.string().trim().email().max(254).toLowerCase(), password: z.string().min(1).max(72).refine(value => Buffer.byteLength(value, 'utf8') <= 72) }).strict();
const hashFormat = /^\$2[aby]\$(1[2-6])\$[./A-Za-z0-9]{53}$/;
export const authController = {
  async login(req: Request, res: Response): Promise<void> {
    res.setHeader('Cache-Control', 'no-store');
    const parsed = credentials.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: 'Invalid credentials format' }); return; }
    if (config.jwtSecret.length < 32 || !hashFormat.test(config.adminPassword)) {
      res.status(503).json({ error: 'Authentication is not configured' }); return;
    }
    try {
      const validPassword = await bcrypt.compare(parsed.data.password, config.adminPassword);
      const valid = timingSafeEqualString(parsed.data.email, config.adminUsername) && validPassword;
      await auditService.log({ actor: 'login_client', action: 'AUTH_LOGIN', resource: 'admin_session', status: valid ? 'SUCCESS' : 'FAILURE' });
      if (!valid) { res.status(401).json({ error: 'Invalid admin credentials' }); return; }
      await connectDatabase();
      const tokenId = randomUUID();
      const token = jwt.sign({ username: config.adminUsername, role: 'admin' }, config.jwtSecret, {
        expiresIn: '2h', algorithm: 'HS256', issuer: 'novarch-api', audience: 'novarch-admin', jwtid: tokenId,
      });
      await SessionModel.create({ tokenId, username: config.adminUsername, credentialVersion: credentialVersion(), expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000) });
      res.json({ success: true, token, user: { email: config.adminUsername, role: 'admin' } });
    } catch { res.status(503).json({ error: 'Authentication temporarily unavailable' }); }
  },
  async verify(req: Request, res: Response): Promise<void> {
    res.setHeader('Cache-Control', 'no-store');
    try {
      const user = await validateSession(req.headers.authorization?.replace(/^Bearer /, '') || '');
      res.json({ valid: true, user });
    } catch { res.status(401).json({ valid: false }); }
  },
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const user = await validateSession(req.headers.authorization?.replace(/^Bearer /, '') || '');
      await SessionModel.deleteOne({ tokenId: user.jti });
      await auditService.log({ actor: 'admin', action: 'AUTH_LOGOUT', resource: 'admin_session', status: 'SUCCESS' });
      res.json({ success: true });
    } catch { res.status(401).json({ error: 'Invalid session' }); }
  },
};
