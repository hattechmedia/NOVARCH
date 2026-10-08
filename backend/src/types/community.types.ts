import { z } from 'zod';

export type CommunityStatus = 'New' | 'Contacted' | 'Resolved';

export interface CommunityMember {
  id: string;
  fullName: string;
  email: string;
  country?: string;
  organization?: string;
  role?: string;
  interests?: string[];
  message?: string;
  referral?: string;
  status: CommunityStatus;
  source: 'Website Form';
  createdAt: string;
  updatedAt: string;
}

// PUBLIC submission schema — strictly whitelisted, no internal fields
export const CreatePublicCommunitySchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').toLowerCase(),
  country: z.string().max(100).optional(),
  organization: z.string().max(100).optional(),
  role: z.string().max(100).optional(),
  interests: z.array(z.string().max(100)).max(10).optional(),
  message: z.string().max(3000).optional(),
  referral: z.string().max(200).optional(),
  website_hp: z.string().max(0, 'Spam detected').optional(), // Anti-spam honeypot
});

export type CreatePublicCommunityDTO = z.infer<typeof CreatePublicCommunitySchema>;

// Internal DTO (used by server/repository)
export interface CreateCommunityDTO extends CreatePublicCommunityDTO {
  status?: CommunityStatus;
  source?: 'Website Form';
}

export const UpdateCommunityStatusSchema = z.object({
  status: z.enum(['New', 'Contacted', 'Resolved']),
});
