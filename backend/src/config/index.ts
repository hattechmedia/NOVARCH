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

const INSECURE_JWT_FALLBACK = 'NOVARCH_SECURE_JWT_SECRET_KEY_2026_PRODUCTION_TOKEN';
const INSECURE_PASSWORD_FALLBACK = 'Novarch@Admin2026!';

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: allowedOrigins,
  mongodbUri: process.env.MONGODB_URI || '',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  frontendUrl: process.env.FRONTEND_URL || 'https://novarch.eu',
  jwtSecret: process.env.JWT_SECRET || (isProduction ? '' : INSECURE_JWT_FALLBACK),
  adminUsername: (process.env.ADMIN_USERNAME || 'admin@novarch.eu').trim().toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD || (isProduction ? '' : INSECURE_PASSWORD_FALLBACK),
  internalApiSecret: process.env.INTERNAL_API_SECRET || '',
};

if (isProduction) {
  const fatal: string[] = [];
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32 || process.env.JWT_SECRET === INSECURE_JWT_FALLBACK) {
    fatal.push('JWT_SECRET must be set to a unique value of at least 32 characters');
  }
  if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD === INSECURE_PASSWORD_FALLBACK) {
    fatal.push('ADMIN_PASSWORD must be set and must not use the documented default');
  }
  if (fatal.length > 0) {
    throw new Error(`[Security] Refusing to start in production: ${fatal.join('; ')}`);
  }
  if (!config.mongodbUri) {
    console.warn('⚠️ WARNING: MONGODB_URI is not set in production environment variables.');
  }
  if (!process.env.INTERNAL_API_SECRET || process.env.INTERNAL_API_SECRET.length < 32) {
    console.warn(
      '⚠️ WARNING: INTERNAL_API_SECRET is missing or short. Public form POSTs can be sent directly to this API origin.'
    );
  }
}
