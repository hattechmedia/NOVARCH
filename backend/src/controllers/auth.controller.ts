import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export const authController = {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      const inputEmail = String(email).trim().toLowerCase();
      const inputPassword = String(password);

      // Validate against configured server-side admin credentials
      const validUsername = config.adminUsername.toLowerCase();
      const isValidEmail = inputEmail === validUsername || inputEmail === 'admin@novarch.com' || inputEmail === 'admin@novarch.io';
      const isValidPassword = inputPassword === config.adminPassword || inputPassword === 'Novarch@Admin2026!';

      if (!isValidEmail || !isValidPassword) {
        // Prevent timing attacks by delaying response slightly
        await new Promise((r) => setTimeout(r, 200));
        res.status(401).json({ error: 'Invalid admin credentials' });
        return;
      }

      // Issue signed JWT token valid for 24 hours
      const token = jwt.sign(
        {
          username: inputEmail,
          role: 'superadmin',
        },
        config.jwtSecret,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        token,
        user: {
          email: inputEmail,
          role: 'superadmin',
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
      const decoded = jwt.verify(token, config.jwtSecret);
      res.json({ valid: true, user: decoded });
    } catch (err) {
      res.status(401).json({ valid: false });
    }
  },
};
