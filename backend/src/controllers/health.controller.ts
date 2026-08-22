import { Request, Response } from 'express';
import { isDatabaseConnected } from '../config/database.js';

const startTime = Date.now();

export const healthController = {
  getHealth: (_req: Request, res: Response) => {
    const uptimeSeconds = (Date.now() - startTime) / 1000;
    const dbStatus = isDatabaseConnected() ? 'connected' : 'disconnected';

    return res.status(200).json({
      success: true,
      status: 'healthy',
      service: 'NOVARCH API Backend',
      version: '1.0.0',
      database: dbStatus,
      databaseType: 'MongoDB Atlas',
      uptime: Math.round(uptimeSeconds),
      timestamp: new Date().toISOString(),
    });
  },
};
