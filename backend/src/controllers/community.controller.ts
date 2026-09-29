import { Request, Response, NextFunction } from 'express';
import { communityService } from '../services/community.service.js';
import { CreatePublicCommunitySchema, UpdateCommunityStatusSchema } from '../types/community.types.js';

export const communityController = {
  getMembers: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const members = await communityService.getAllMembers();
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
          message: 'Community member not found',
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
      // Validate against public schema — drops any internal fields
      const validatedData = CreatePublicCommunitySchema.parse(req.body);
      const newMember = await communityService.submitMember(validatedData);

      console.log(`[Community Join]: ${newMember.fullName} (${newMember.email})`);

      return res.status(201).json({
        success: true,
        message: 'Community application received successfully. Welcome to NOVARCH!',
        data: newMember,
      });
    } catch (error) {
      return next(error);
    }
  },

  updateMemberStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = UpdateCommunityStatusSchema.parse(req.body);

      const updated = await communityService.updateMemberStatus(id, status);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Community member not found',
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
          message: 'Community member not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Community member deleted successfully',
      });
    } catch (error) {
      return next(error);
    }
  },
};
