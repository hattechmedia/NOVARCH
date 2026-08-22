import { contactRepository, IContactRepository } from '../repositories/contact.repository.js';
import { DashboardStats } from '../types/dashboard.types.js';

export class DashboardService {
  constructor(private repo: IContactRepository = contactRepository) {}

  async getStats(): Promise<DashboardStats> {
    const inquiries = await this.repo.findAll();

    const newLeads = inquiries.filter((i) => i.status === 'New').length;
    const contactedLeads = inquiries.filter((i) => i.status === 'Contacted').length;
    const proposalsSent = inquiries.filter((i) => i.status === 'Proposal Sent').length;
    const closedDeals = inquiries.filter((i) => i.status === 'Closed').length;

    const estimatedPipelineValue = inquiries
      .filter((i) => i.status !== 'Closed')
      .reduce((sum, i) => sum + (i.estimatedValue || 0), 0);

    const conversionRate =
      inquiries.length > 0 ? Math.round((closedDeals / inquiries.length) * 100) : 0;

    const recentActivity = inquiries.slice(0, 5).map((inq) => ({
      id: `act-${inq.id}`,
      description: `Inquiry from ${inq.name} (${inq.company || 'Direct'}) for ${inq.serviceType}`,
      timestamp: inq.createdAt,
      type: 'new_lead' as const,
    }));

    return {
      totalInquiries: inquiries.length,
      newLeads,
      contactedLeads,
      proposalsSent,
      closedDeals,
      estimatedPipelineValue,
      activeAutomatedWorkflows: 0,
      conversionRate,
      recentActivity,
    };
  }
}

export const dashboardService = new DashboardService();
