import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

// Strict CORS domain whitelist
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : [
      'https://novarch.eu',
      'https://www.novarch.eu',
      'https://novarch-dashboard.vercel.app',
      'https://novarch-frontend.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173',
    ];



export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: allowedOrigins,
  mongodbUri: process.env.MONGODB_URI || '',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  frontendUrl: process.env.FRONTEND_URL || 'https://novarch.eu',
  jwtSecret: process.env.JWT_SECRET || '',
  adminUsername: (process.env.ADMIN_USERNAME || 'admin@novarch.eu').trim().toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD || '',
  internalApiSecret: process.env.INTERNAL_API_SECRET || '',
};

if (isProduction) {
  const fatal: string[] = [];
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32 || /your-|example|placeholder/i.test(process.env.JWT_SECRET)) {
    fatal.push('JWT_SECRET must be set to a unique value of at least 32 characters');
  }
  if (!/^\$2[aby]\$(1[2-6])\$[./A-Za-z0-9]{53}$/.test(process.env.ADMIN_PASSWORD || '')) {
    fatal.push('ADMIN_PASSWORD must be a bcrypt hash with cost 12 through 16');
  }
  if (fatal.length > 0) {
    throw new Error(`[Security] Refusing to start in production: ${fatal.join('; ')}`);
  }
  if (!config.mongodbUri) {
    throw new Error('MONGODB_URI is required in production');
  }
  if (!process.env.INTERNAL_API_SECRET || process.env.INTERNAL_API_SECRET.length < 32) {
    throw new Error('INTERNAL_API_SECRET must have at least 32 characters in production');
  }
}
