import mongoose from 'mongoose';
import dns from 'dns';
import { config } from '../config/index.js';
import { ContactModel } from '../models/contact.model.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  console.warn('DNS setServers failed:', e);
}

async function clearDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas to purge dummy data...');
    await mongoose.connect(config.mongodbUri);
    
    const result = await ContactModel.deleteMany({});
    console.log(`✅ Cleared ${result.deletedCount} dummy records from MongoDB Atlas collection 'contacts'.`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected cleanly.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing MongoDB:', error);
    process.exit(1);
  }
}

clearDatabase();
