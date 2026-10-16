import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config/index.js';
import { timingSafeEqualString } from '../utils/crypto.js';

async function passwordMatches(inputPassword: string, storedPassword: string): Promise<boolean> {
  if (!storedPassword) return false;
  if (storedPassword.startsWith('$2')) {
    return bcrypt.compare(inputPassword, storedPassword);
  }
  return timingSafeEqualString(inputPassword, storedPassword);
}

export const authController = {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!config.jwtSecret || !config.adminPassword) {
        res.status(503).json({ error: 'Authentication is not configured' });
        return;
      }

      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      const inputEmail = String(email).trim().toLowerCase();
      const inputPassword = String(password);

      const isValidEmail = timingSafeEqualString(inputEmail, config.adminUsername);
      const isValidPassword = await passwordMatches(inputPassword, config.adminPassword);

      if (!isValidEmail || !isValidPassword) {
        res.status(401).json({ error: 'Invalid admin credentials' });
        return;
      }

      // Issue signed JWT token valid for 24 hours
      const token = jwt.sign(
        {
          username: inputEmail,
          role: 'admin',
        },
        config.jwtSecret,
        { expiresIn: '24h', algorithm: 'HS256' }
      );

      res.json({
        success: true,
        token,
        user: {
          email: inputEmail,
          role: 'admin',
        },
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Authentication processing error' });
    }
  },

  async verify(req: Request, res: Response): Promise<void> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ valid: false });
      return;
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, config.jwtSecret, { algorithms: ['HS256'] });
      res.json({ valid: true, user: decoded });
    } catch (err) {
      res.status(401).json({ valid: false });
    }
  },
};
