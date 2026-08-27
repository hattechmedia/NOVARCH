import { z } from 'zod';

export type LeadStatus = 'New' | 'Contacted' | 'Proposal Sent' | 'Closed' | 'Paid' | 'Payment Declined' | 'Payment Pending';
export type SubmissionType = 'service_lead' | 'message';

export interface ContactInquiry {
  id: string;
  submissionType: SubmissionType;
  name: string;
  email: string;
  phone?: string;
  countryCode?: string;
  company?: string;
  planName?: string;
  planTier?: 'Basic' | 'Premium';
  planPrice?: string;
  performances?: string[];
  news?: string;
  serviceType: string;
  preferredService?: string;
  message?: string;
  status: LeadStatus;
  estimatedValue: number;
  source: 'Website Form' | 'Service Package' | 'Direct API' | 'Referral';
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  createdAt: string;
  updatedAt: string;
}

// PUBLIC Customer Submission Schema (Strictly Whitelisted)
// Cannot submit internal fields like status, estimatedValue, source, planPrice
export const CreatePublicContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').toLowerCase(),
  phone: z.string().max(30).optional(),
  countryCode: z.string().max(10).optional(),
  company: z.string().max(100).optional(),
  submissionType: z.enum(['service_lead', 'message']).optional(),
  serviceType: z.string().max(100).optional(),
  preferredService: z.string().max(100).optional(),
  planName: z.string().max(100).optional(),
  planTier: z.enum(['Basic', 'Premium']).optional(),
  performances: z.array(z.string().max(100)).max(15).optional(),
  news: z.string().max(3000).optional(),
  message: z.string().max(3000).optional(),
});

export type CreatePublicContactDTO = z.infer<typeof CreatePublicContactSchema>;

// Internal Full DTO (used by server repository internally)
export interface CreateContactDTO extends CreatePublicContactDTO {
  status?: LeadStatus;
  estimatedValue?: number;
  source?: 'Website Form' | 'Service Package' | 'Direct API' | 'Referral';
  planPrice?: string;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
}

export const UpdateContactStatusSchema = z.object({
  status: z.enum(['New', 'Contacted', 'Proposal Sent', 'Closed', 'Paid', 'Payment Declined', 'Payment Pending']),
});
