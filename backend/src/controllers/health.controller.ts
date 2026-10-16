import { Request, Response } from 'express';
import { isDatabaseConnected } from '../config/database.js';

const startTime = Date.now();

export const healthController = {
  getHealth: (_req: Request, res: Response) => {
    const uptimeSeconds = (Date.now() - startTime) / 1000;
    const dbStatus = isDatabaseConnected() ? 'connected' : 'disconnected';

    return res.status(200).json({
      success: true,
      status: dbStatus === 'connected' ? 'healthy' : 'degraded',
      database: dbStatus,
      uptime: Math.round(uptimeSeconds),
    });
  },
};
