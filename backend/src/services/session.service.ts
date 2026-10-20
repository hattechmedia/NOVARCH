import { createHmac } from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { connectDatabase } from '../config/database.js';
import { SessionModel } from '../models/session.model.js';

export function credentialVersion(): string {
  return createHmac('sha256', config.jwtSecret).update(config.adminPassword).digest('hex');
}
export async function validateSession(token: string) {
  const decoded = jwt.verify(token, config.jwtSecret, { algorithms: ['HS256'], issuer: 'novarch-api', audience: 'novarch-admin' });
  if (typeof decoded === 'string' || decoded.role !== 'admin' || decoded.username !== config.adminUsername || typeof decoded.jti !== 'string') throw new Error('Invalid claims');
  await connectDatabase();
  const session = await SessionModel.findOne({ tokenId: decoded.jti, username: decoded.username, credentialVersion: credentialVersion(), expiresAt: { $gt: new Date() } }).lean();
  if (!session) throw new Error('Session expired or revoked');
  return decoded as jwt.JwtPayload & { username: string; role: string };
}
