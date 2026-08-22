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
