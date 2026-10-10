import { Request, Response, NextFunction } from 'express';
import { communityService } from '../services/community.service.js';
import {
  CreatePublicCommunitySchema,
  CreateWinterArcPublicSchema,
  UpdateCommunityStatusSchema,
  ApplicationType,
} from '../types/community.types.js';

export const communityController = {
  getMembers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const applicationType = req.query.applicationType as ApplicationType | undefined;
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
        `[${isWinterArcApp ? 'Winter Arc Treffen 01 Application' : 'Community Join'}]: ${member.fullName} (${member.email}) — Status: ${member.status}`
      );

      const message = isWinterArcApp
        ? "Thank you for applying to Winter Arc. Your application has been received. We'll review it and contact you if you're selected. Thanks for your interest in Treffen 01."
        : 'Community application received successfully. Welcome to NOVARCH!';

      return res.status(201).json({
        success: true,
        message,
        data: member,
        emailStatus: emailResult.status,
      });
    } catch (error) {
      return next(error);
    }
  },

  updateMemberStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
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

  deleteMember: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
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
};
