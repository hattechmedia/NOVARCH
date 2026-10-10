import { z } from 'zod';

export type ApplicationType = 'community' | 'winter-arc';

export type CommunityStatus =
  | 'New'
  | 'Contacted'
  | 'Resolved'
  | 'Pending'
  | 'Reviewing'
  | 'Selected'
  | 'Rejected';

export interface ApplicationReferral {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  referrer?: string;
}

export interface CommunityMember {
  id: string;
  applicationType: ApplicationType;
  fullName: string;
  email: string;
  city?: string;
  contactNumber?: string;
  countryCode?: string;
  organization?: string;
  role?: string;
  whatYouDo?: string;
  whatCanYouOffer?: string;
  whatAreYouLookingFor?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  proposedGuest?: string;
  interests?: string[];
  message?: string;
  status: CommunityStatus;
  source: string;
  referral?: ApplicationReferral;
  createdAt: string;
  updatedAt: string;
}

// URL validator that permits empty string or valid http(s) URL
const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .optional()
  .refine(
    (val) => !val || val === '' || /^https?:\/\/.+/i.test(val),
    { message: 'Must be a valid web URL starting with http:// or https://' }
  );

// Referral schema for UTM and attribution parameters
export const ReferralSchema = z
  .object({
    utmSource: z.string().max(150).optional(),
    utmMedium: z.string().max(150).optional(),
    utmCampaign: z.string().max(150).optional(),
    utmContent: z.string().max(150).optional(),
    referrer: z.string().max(500).optional(),
  })
  .optional();

// PUBLIC schema for standard Community joining
export const CreatePublicCommunitySchema = z.object({
  applicationType: z.literal('community').default('community').optional(),
  fullName: z.string().trim().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().trim().email('Invalid email address').toLowerCase(),
  city: z.string().trim().max(100).optional(),
  contactNumber: z.string().trim().max(50).optional(),
  countryCode: z.string().trim().max(10).optional(),
  organization: z.string().trim().max(150).optional(),
  role: z.string().trim().max(150).optional(),
  interests: z.array(z.string().trim().max(100)).max(10).optional(),
  message: z.string().trim().max(3000).optional(),
  referral: ReferralSchema,
  source: z.string().max(100).optional(),
  website_hp: z.string().max(0, 'Spam detected').optional(), // Anti-spam honeypot
});

// PUBLIC schema for Winter Arc Treffen 01 Applications
export const CreateWinterArcPublicSchema = z.object({
  applicationType: z.literal('winter-arc').default('winter-arc'),
  fullName: z.string().trim().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().trim().email('Invalid email address').toLowerCase(),
  city: z.string().trim().min(1, 'City is required').max(100),
  organization: z.string().trim().min(1, 'Business, project, or community is required').max(150),
  whatYouDo: z.string().trim().min(2, 'Please tell us what you do').max(2000),
  whatCanYouOffer: z.string().trim().min(2, 'Please tell us what you can offer the group').max(2000),
  whatAreYouLookingFor: z.string().trim().min(2, 'Please tell us what you are looking for').max(2000),
  linkedinUrl: optionalUrl,
  portfolioUrl: optionalUrl,
  proposedGuest: z.string().trim().max(1000).optional(),
  contactNumber: z.string().trim().max(50).optional(),
  countryCode: z.string().trim().max(10).optional(),
  referral: ReferralSchema,
  source: z.string().max(100).optional(),
  website_hp: z.string().max(0, 'Spam detected').optional(), // Anti-spam honeypot
});

// Unified polymorphic schema for API submissions
export const CreateUnifiedCommunitySchema = z.discriminatedUnion('applicationType', [
  CreateWinterArcPublicSchema,
  CreatePublicCommunitySchema.extend({
    applicationType: z.literal('community').default('community'),
  }),
]).or(CreatePublicCommunitySchema);

export type CreatePublicCommunityDTO = z.infer<typeof CreatePublicCommunitySchema>;
export type CreateWinterArcPublicDTO = z.infer<typeof CreateWinterArcPublicSchema>;

// Internal DTO (used by server/repository)
export interface CreateCommunityDTO {
  applicationType?: ApplicationType;
  fullName: string;
  email: string;
  city?: string;
  contactNumber?: string;
  countryCode?: string;
  organization?: string;
  role?: string;
  whatYouDo?: string;
  whatCanYouOffer?: string;
  whatAreYouLookingFor?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  proposedGuest?: string;
  interests?: string[];
  message?: string;
  status?: CommunityStatus;
  source?: string;
  referral?: ApplicationReferral;
}

export const UpdateCommunityStatusSchema = z.object({
  status: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const lower = val.toLowerCase();
        if (lower === 'new') return 'New';
        if (lower === 'contacted') return 'Contacted';
        if (lower === 'resolved') return 'Resolved';
        if (lower === 'pending') return 'Pending';
        if (lower === 'reviewing') return 'Reviewing';
        if (lower === 'selected') return 'Selected';
        if (lower === 'rejected') return 'Rejected';
      }
      return val;
    },
    z.enum(['New', 'Contacted', 'Resolved', 'Pending', 'Reviewing', 'Selected', 'Rejected'])
  ),
});
