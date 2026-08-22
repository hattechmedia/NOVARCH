import { z } from 'zod';

export type LeadStatus = 'New' | 'Contacted' | 'Proposal Sent' | 'Closed';
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
  createdAt: string;
  updatedAt: string;
}

export const CreateContactSchema = z.object({
  submissionType: z.enum(['service_lead', 'message']).optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  countryCode: z.string().optional(),
  company: z.string().optional(),
  planName: z.string().optional(),
  planTier: z.enum(['Basic', 'Premium']).optional(),
  planPrice: z.string().optional(),
  estimatedValue: z.number().optional(),
  performances: z.array(z.string()).optional(),
  news: z.string().optional(),
  serviceType: z.string().optional(),
  preferredService: z.string().optional(),
  message: z.string().optional(),
});

export type CreateContactDTO = z.infer<typeof CreateContactSchema>;

export const UpdateContactStatusSchema = z.object({
  status: z.enum(['New', 'Contacted', 'Proposal Sent', 'Closed']),
});
