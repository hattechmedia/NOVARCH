import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
    : ['http://localhost:3000', 'http://localhost:5173', 'https://novarch-dashboard.vercel.app', 'https://novarch-frontend.vercel.app', '*'],
  mongodbUri:
    process.env.MONGODB_URI ||
    'mongodb+srv://developerphantoms:Phantoms102102@cluster0.4jrks.mongodb.net/NOVARCH',
};
