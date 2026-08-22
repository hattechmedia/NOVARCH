import type { NextConfig } from 'next';

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
