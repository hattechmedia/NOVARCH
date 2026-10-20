import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', authController.login);
router.get('/verify', authController.verify);
router.post('/logout', authController.logout);

export default router;
