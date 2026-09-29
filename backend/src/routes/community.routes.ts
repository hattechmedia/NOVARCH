import { Router } from 'express';
import { communityController } from '../controllers/community.controller.js';
import { verifyAdminToken } from '../middleware/jwt.middleware.js';

const router = Router();

// Public submission route
router.post('/', communityController.createMember);

// Protected Admin Routes (Require Authorization Header: Bearer <jwt>)
router.get('/', verifyAdminToken as any, communityController.getMembers);
router.get('/:id', verifyAdminToken as any, communityController.getMemberById);
router.patch('/:id/status', verifyAdminToken as any, communityController.updateMemberStatus);
router.delete('/:id', verifyAdminToken as any, communityController.deleteMember);

export default router;
