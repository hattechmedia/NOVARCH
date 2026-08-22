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

export interface DashboardStats {
  totalInquiries: number;
  newLeads: number;
  contactedLeads: number;
  proposalsSent: number;
  closedDeals: number;
  estimatedPipelineValue: number;
  activeAutomatedWorkflows: number;
  conversionRate: number;
  recentActivity: Array<{
    id: string;
    description: string;
    timestamp: string;
    type: 'new_lead' | 'status_change' | 'system';
  }>;
}

export interface HealthResponse {
  success: boolean;
  status: string;
  service: string;
  version: string;
  database?: string;
  databaseType?: string;
  uptime: number;
  timestamp: string;
}
