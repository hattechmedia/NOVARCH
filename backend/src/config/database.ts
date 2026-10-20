import mongoose from 'mongoose';
import dns from 'dns';
import { config } from './index.js';

// Resolve DNS SRV lookup issues on Windows Node.js runtimes
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  console.warn('Could not set custom DNS servers:', e);
}

let isConnected = false;

export async function connectDatabase(): Promise<boolean> {
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return true;
  }

  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      family: 4,
    });

    isConnected = (conn.connection.readyState as number) === 1;
    console.log('Database connected');
    return true;
  } catch (error) {
    isConnected = false;
    throw Object.assign(new Error('Database unavailable'), { status: 503 });
  }
}

export function isDatabaseConnected(): boolean {
  return (mongoose.connection.readyState as number) === 1;
}

// Graceful disconnection handling
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected.');
  isConnected = false;
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected.');
  isConnected = true;
});
