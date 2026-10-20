import { Router } from 'express';
import { communityController } from '../controllers/community.controller.js';
import { verifyAdminToken } from '../middleware/jwt.middleware.js';
import { publicFormLimiter } from '../middleware/publicFormLimiter.js';
import { requireInternalApiSecret } from '../middleware/internalApi.middleware.js';

const router = Router();

// Public submission route
router.post('/', requireInternalApiSecret, publicFormLimiter, communityController.createMember);

// Protected Admin Routes (Require Authorization Header: Bearer <jwt>)
router.get('/', verifyAdminToken as any, communityController.getMembers);
router.post('/:id/reply', verifyAdminToken as any, communityController.replyWinterArc);
router.get('/:id', verifyAdminToken as any, communityController.getMemberById);
router.patch('/:id/status', verifyAdminToken as any, communityController.updateMemberStatus);
router.patch('/:id/withdraw-marketing-consent', verifyAdminToken as any, communityController.withdrawMarketingConsent);
router.delete('/:id', verifyAdminToken as any, communityController.deleteMember);

export default router;
