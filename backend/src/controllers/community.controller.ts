import { Request, Response, NextFunction } from 'express';
import { communityService } from '../services/community.service.js';
import {
  CreatePublicCommunitySchema,
  CreateWinterArcPublicSchema,
  UpdateCommunityStatusSchema,
  ReplyWinterArcSchema,
  ApplicationType,
} from '../types/community.types.js';
import { emailService } from '../services/email.service.js';
import { isValidResourceId } from '../utils/ids.js';

export const communityController = {
  getMembers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rawType = req.query.applicationType;
      const applicationType: ApplicationType | undefined =
        rawType === 'winter-arc' || rawType === 'community' ? rawType : undefined;
      const members = await communityService.getAllMembers(applicationType ? { applicationType } : undefined);
      return res.status(200).json({
        success: true,
        count: members.length,
        data: members,
      });
    } catch (error) {
      return next(error);
    }
  },

  getMemberById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!isValidResourceId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid record id' });
      }
      const member = await communityService.getMemberById(id);

      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Application/member record not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: member,
      });
    } catch (error) {
      return next(error);
    }
  },

  createMember: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isWinterArc =
        req.body?.applicationType === 'winter-arc' ||
        Boolean(req.body?.whatYouDo || req.body?.whatCanYouOffer || req.body?.whatAreYouLookingFor);

      let validatedData: any;
      if (isWinterArc) {
        validatedData = CreateWinterArcPublicSchema.parse(req.body);
      } else {
        validatedData = CreatePublicCommunitySchema.parse(req.body);
      }

      const { member, emailResult } = await communityService.submitMember(validatedData);

      const isWinterArcApp = member.applicationType === 'winter-arc';
      console.log(
        `[${isWinterArcApp ? 'Winter Arc Treffen 01 Application' : 'Community Join'}]: ${member.id} — Status: ${member.status}`
      );

      const message = isWinterArcApp
        ? "Thank you for applying to Winter Arc. Your application has been received. We'll review it and contact you if you're selected. Thanks for your interest in Treffen 01."
        : 'Community application received successfully. Welcome to NOVARCH!';

      return res.status(201).json({
        success: true,
        message,
        data: { id: member.id },
        emailStatus: emailResult.status,
      });
    } catch (error) {
      return next(error);
    }
  },

  updateMemberStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!isValidResourceId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid record id' });
      }
      const { status } = UpdateCommunityStatusSchema.parse(req.body);

      const updated = await communityService.updateMemberStatus(id, status as any);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Application/member record not found',
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

  replyWinterArc: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!isValidResourceId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid record id' });
      }
      const { subject, message } = ReplyWinterArcSchema.parse(req.body);
      const member = await communityService.getMemberById(id);

      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Application/member record not found',
        });
      }

      if (member.applicationType !== 'winter-arc') {
        return res.status(400).json({
          success: false,
          message: 'Replies can only be sent for Winter Arc applications.',
        });
      }

      const result = await emailService.sendWinterArcReply({
        to: member.email,
        fullName: member.fullName,
        subject,
        message,
      });

      if (result.status === 'unconfigured') {
        return res.status(503).json({
          success: false,
          message: result.message || 'Email delivery is not configured.',
        });
      }

      if (!result.sent) {
        return res.status(502).json({
          success: false,
          message: 'Failed to send reply email. Please try again.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Reply sent',
      });
    } catch (error) {
      return next(error);
    }
  },

  deleteMember: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!isValidResourceId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid record id' });
      }
      const deleted = await communityService.deleteMember(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Application/member record not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Record deleted successfully',
      });
    } catch (error) {
      return next(error);
    }
  },

  withdrawMarketingConsent: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!isValidResourceId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid record id' });
      }
      const updated = await communityService.withdrawMarketingConsent(id);
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Application/member record not found',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Marketing consent withdrawn successfully',
        data: {
          id: updated.id,
          marketingConsent: false,
          marketingConsentWithdrawnAt: updated.marketingConsentWithdrawnAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
};
