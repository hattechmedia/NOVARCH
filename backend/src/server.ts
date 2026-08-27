import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { config } from './config/index.js';
import { connectDatabase } from './config/database.js';
import { contactRepository } from './repositories/contact.repository.js';
import { errorHandler } from './middleware/error.middleware.js';

import healthRoutes from './routes/health.routes.js';
import contactRoutes from './routes/contact.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import checkoutRoutes from './routes/checkout.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Disable x-powered-by header for security
app.disable('x-powered-by');

// Security HTTP Headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled to prevent interfering with Next.js/Vite assets
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// HTTP Response Compression
app.use(compression());

// Strict Rate Limiting - General API Limiter (100 requests per 15 mins)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again later.' },
});

// Sensitive Operations Limiter (15 requests per 15 mins) - login, contact submission, checkout creation
const sensitiveOpsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Rate limit exceeded for sensitive operation. Please try again after 15 minutes.' },
});

app.use(generalLimiter);

// CORS Middleware with strict origin whitelisting
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = config.corsOrigins.some((allowed) => {
        if (allowed === '*') return true;
        if (allowed === origin) return true;
        if (origin.endsWith('.vercel.app') && allowed.includes('.vercel.app')) return true;
        return false;
      });
      if (isAllowed) {
        return callback(null, origin);
      }
      return callback(new Error('CORS policy rejection: Origin not allowed.'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'X-CSRF-Token',
      'X-Requested-With',
      'Accept',
      'Accept-Version',
      'Content-Length',
      'Content-MD5',
      'Content-Type',
      'Date',
      'X-Api-Version',
      'Authorization',
    ],
  })
);

app.options('*', cors());

// Stripe raw body parser for signature verification
app.use('/checkout/webhook', express.raw({ type: 'application/json' }));
app.use('/api/checkout/webhook', express.raw({ type: 'application/json' }));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Apply rate limiting to sensitive routes
app.use('/api/auth/login', sensitiveOpsLimiter);
app.use('/api/contact', sensitiveOpsLimiter);
app.use('/api/checkout/create-session', sensitiveOpsLimiter);

// API Routes
app.use('/health', healthRoutes);
app.use('/api/health', healthRoutes);

app.use('/api/auth', authRoutes);

app.use('/contact', contactRoutes);
app.use('/contacts', contactRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/contacts', contactRoutes);

app.use('/dashboard', dashboardRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use('/checkout', checkoutRoutes);
app.use('/api/checkout', checkoutRoutes);

// Root Info Endpoint
app.get('/', (_req, res) => {
  res.json({
    name: 'NOVARCH API Backend',
    status: 'online',
    version: '1.0.0',
  });
});

// Global Error Handler
app.use(errorHandler);

// Connect DB & Start Server
async function startServer() {
  const connected = await connectDatabase();
  if (connected) {
    await contactRepository.seedInitialData();
  }

  if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
    app.listen(config.port, () => {
      console.log(`🚀 NOVARCH Backend API is running on http://localhost:${config.port}`);
    });
  }
}

startServer();

export default app;
