import { Router } from 'express';
import { contactController } from '../controllers/contact.controller.js';
import { verifyAdminToken } from '../middleware/jwt.middleware.js';
import { publicFormLimiter } from '../middleware/publicFormLimiter.js';
import { requireInternalApiSecret } from '../middleware/internalApi.middleware.js';

const router = Router();

// Public submission route
router.post('/', requireInternalApiSecret, publicFormLimiter, contactController.createContact);

// Protected Admin Routes (Require Authorization Header: Bearer <jwt>)
router.get('/', verifyAdminToken as any, contactController.getContacts);
router.get('/:id', verifyAdminToken as any, contactController.getContactById);
router.patch('/:id/status', verifyAdminToken as any, contactController.updateContactStatus);
router.delete('/:id', verifyAdminToken as any, contactController.deleteContact);

export default router;
