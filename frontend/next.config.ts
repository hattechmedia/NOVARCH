import type { NextConfig } from 'next';

const apiOrigin = new URL(process.env.NEXT_PUBLIC_API_URL || 'https://novarch-backend.vercel.app').origin;

// The widget fetches its language list with a JSONP script, not just fetch/XHR.
const translateScriptOrigins = 'https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com';

const nextConfig: NextConfig = {
  // Enable Gzip/Brotli compression
  compress: true,

  // React Strict Mode for detecting bugs early
  reactStrictMode: true,


  // Production Compiler Optimizations
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },

  // Aggressive tree-shaking for large icon and animation libraries
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // HTTP Header Caching for Immutable Assets
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' " + translateScriptOrigins + (process.env.NODE_ENV !== 'production' ? " 'unsafe-eval'" : '') + "; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com https://www.gstatic.com https://translate.google.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' " + apiOrigin + (process.env.NODE_ENV !== 'production' ? ' http://localhost:5000 ws://localhost:3000 ws://127.0.0.1:3000' : '') + " https://translate.google.com https://translate.googleapis.com https://www.gstatic.com https://translate-pa.googleapis.com https://api.stripe.com; frame-src 'self' https://translate.google.com https://js.stripe.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self' https://checkout.stripe.com;" },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
