import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller.js';
import { verifyAdminToken } from '../middleware/jwt.middleware.js';

const router = Router();

// Protected Admin Route (Require Authorization Header: Bearer <jwt>)
router.get('/stats', verifyAdminToken as any, dashboardController.getStats);

export default router;
