import { Router } from 'express';
import { contactController } from '../controllers/contact.controller.js';

const router = Router();

router.get('/', contactController.getContacts);
router.post('/', contactController.createContact);
router.get('/:id', contactController.getContactById);
router.patch('/:id/status', contactController.updateContactStatus);
router.delete('/:id', contactController.deleteContact);

export default router;
