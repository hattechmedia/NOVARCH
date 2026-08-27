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
  jwtSecret: process.env.JWT_SECRET || 'NOVARCH_SECURE_JWT_SECRET_KEY_2026_PRODUCTION_TOKEN',
  adminUsername: (process.env.ADMIN_USERNAME || 'admin@novarch.eu').trim().toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD || 'Novarch@Admin2026!',
};

// Fail fast in production if critical secrets are missing
if (isProduction && !config.mongodbUri) {
  console.warn('⚠️ WARNING: MONGODB_URI is not set in production environment variables.');
}
