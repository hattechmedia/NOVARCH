import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { config } from './config/index.js';
import { connectDatabase } from './config/database.js';
import { contactRepository } from './repositories/contact.repository.js';
import { errorHandler } from './middleware/error.middleware.js';
import healthRoutes from './routes/health.routes.js';
import contactRoutes from './routes/contact.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import checkoutRoutes from './routes/checkout.routes.js';

const app = express();

// HTTP Response Compression (gzip / deflate / brotli)
app.use(compression());

// CORS Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (
        config.corsOrigins.includes(origin) ||
        config.corsOrigins.includes('*') ||
        origin.endsWith('.vercel.app') ||
        origin.startsWith('http://localhost:')
      ) {
        return callback(null, origin);
      }
      return callback(null, origin);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version', 'Authorization'],
  })
);

app.options('*', cors());

// Stripe raw body parser for webhook verification
app.use('/checkout/webhook', express.raw({ type: 'application/json' }));
app.use('/api/checkout/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger (active in development, quiet during health check polls)
if (config.nodeEnv !== 'production') {
  app.use((req, _res, next) => {
    if (!req.path.includes('health')) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    }
    next();
  });
}

// API Routes (supports both direct paths and /api prefixed paths)
app.use('/health', healthRoutes);
app.use('/api/health', healthRoutes);

app.use('/contact', contactRoutes);
app.use('/contacts', contactRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/contacts', contactRoutes);

app.use('/dashboard', dashboardRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use('/checkout', checkoutRoutes);
app.use('/api/checkout', checkoutRoutes);

// Root endpoint info
app.get('/', (_req, res) => {
  res.json({
    name: 'NOVARCH API Backend',
    status: 'online',
    version: '1.0.0',
    database: 'MongoDB Atlas',
    documentation: {
      health: '/health',
      contact: '/contacts',
      dashboard: '/dashboard/stats',
    },
  });
});

// Global Error Handler
app.use(errorHandler);

// Connect DB & Start Server
async function startServer() {
  // Connect to MongoDB Atlas
  const connected = await connectDatabase();
  if (connected) {
    await contactRepository.seedInitialData();
  }

  if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
    app.listen(config.port, () => {
      console.log(`🚀 NOVARCH Backend API is running on http://localhost:${config.port}`);
      console.log(`📡 Health Check: http://localhost:${config.port}/api/health`);
      console.log(`🗄️ Database: ${connected ? 'MongoDB Atlas (Connected)' : 'In-Memory (Fallback)'}`);
    });
  }
}

startServer();

export default app;
