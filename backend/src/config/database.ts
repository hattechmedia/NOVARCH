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
  if (isConnected) return true;

  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    const conn = await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      family: 4,
    });

    isConnected = conn.connection.readyState === 1;
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host} (DB: ${conn.connection.name})`);
    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    isConnected = false;
    return false;
  }
}

export function isDatabaseConnected(): boolean {
  return mongoose.connection.readyState === 1;
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
