import { Request, Response, NextFunction } from 'express';
import { contactService } from '../services/contact.service.js';
import { CreateContactSchema, UpdateContactStatusSchema } from '../types/contact.types.js';

export const contactController = {
  getContacts: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const contacts = await contactService.getAllInquiries();
      return res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts,
      });
    } catch (error) {
      return next(error);
    }
  },

  getContactById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const contact = await contactService.getInquiryById(id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Inquiry not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: contact,
      });
    } catch (error) {
      return next(error);
    }
  },

  createContact: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = CreateContactSchema.parse(req.body);
      const newContact = await contactService.submitInquiry(validatedData);

      console.log(`[Lead Created]: ${newContact.name} (${newContact.email}) -> ${newContact.serviceType}`);

      return res.status(201).json({
        success: true,
        message: 'Inquiry received successfully. Our architecture team will be in touch.',
        data: newContact,
      });
    } catch (error) {
      return next(error);
    }
  },

  updateContactStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = UpdateContactStatusSchema.parse(req.body);

      const updated = await contactService.updateLeadStatus(id, status);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Inquiry not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: `Status updated to ${status}`,
        data: updated,
      });
    } catch (error) {
      return next(error);
    }
  },

  deleteContact: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleted = await contactService.deleteInquiry(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Inquiry not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Inquiry deleted successfully',
      });
    } catch (error) {
      return next(error);
    }
  },
};
