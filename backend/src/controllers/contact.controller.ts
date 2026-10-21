import { Request, Response, NextFunction } from 'express';
import { contactService } from '../services/contact.service.js';
import { CreatePublicContactSchema, UpdateContactStatusSchema } from '../types/contact.types.js';
import { getPackageBySlugOrId } from '../config/packageCatalog.js';
import { isValidResourceId } from '../utils/ids.js';

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
      if (!isValidResourceId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid inquiry id' });
      }
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
      // Validate customer submission strictly against public schema
      // Drops any internal fields like status, estimatedValue, source, planPrice
      const validatedData = CreatePublicContactSchema.parse(req.body);
      const catalogItem = getPackageBySlugOrId(
        validatedData.planName || validatedData.preferredService || validatedData.serviceType || ''
      );
      if (catalogItem) {
        validatedData.planName = catalogItem.name;
        validatedData.planTier = catalogItem.tier;
        validatedData.planPrice = `€${catalogItem.priceEUR.toLocaleString()}`;
        validatedData.estimatedValue = catalogItem.priceEUR;
        validatedData.serviceType = catalogItem.serviceName;
        validatedData.preferredService = catalogItem.serviceName;
      } else {
        delete validatedData.estimatedValue;
        delete validatedData.planPrice;
      }

      const submissionType = validatedData.submissionType === 'service_lead' ? 'service_lead' : 'message';
      const newContact = await contactService.submitInquiry(validatedData);

      console.log(`[Lead Created]: ${newContact.id}`);

      return res.status(201).json({
        success: true,
        message: 'Inquiry received successfully. Our architecture team will be in touch.',
        data: { id: newContact.id },
      });
    } catch (error) {
      return next(error);
    }
  },

  updateContactStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!isValidResourceId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid inquiry id' });
      }
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
      if (!isValidResourceId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid inquiry id' });
      }
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
