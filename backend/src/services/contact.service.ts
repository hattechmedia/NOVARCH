import { contactRepository, IContactRepository } from '../repositories/contact.repository.js';
import { ContactInquiry, CreateContactDTO, LeadStatus } from '../types/contact.types.js';
import { auditService } from './audit.service.js';
import { emailService } from './email.service.js';

export class ContactService {
  constructor(private repo: IContactRepository = contactRepository) {}

  async getAllInquiries(): Promise<ContactInquiry[]> {
    return this.repo.findAll();
  }

  async getInquiryById(id: string): Promise<ContactInquiry | null> {
    return this.repo.findById(id);
  }

  async findRecentByEmail(email: string, submissionType: 'service_lead' | 'message', withinMs: number) {
    return this.repo.findRecentByEmail(email, submissionType, withinMs);
  }

  async submitInquiry(dto: CreateContactDTO, actor = 'public_client'): Promise<ContactInquiry> {
    const inquiry = await this.repo.create(dto);

    await auditService.log({
      actor,
      action: 'CREATE',
      resource: 'contact_inquiry',
      resourceId: inquiry.id,
      status: 'SUCCESS',
      metadata: { submissionType: inquiry.submissionType, serviceType: inquiry.serviceType },
    });

    // Send instant alert to admin email and acknowledgment to submitter
    try {
      await Promise.allSettled([
        emailService.sendContactLeadNotification(inquiry),
        emailService.sendContactAcknowledgment(inquiry),
      ]);
    } catch (emailErr) {
      console.warn('[ContactService]: Email dispatch warning:', emailErr);
    }

    return inquiry;
  }

  async updateLeadStatus(id: string, status: LeadStatus, actor = 'admin'): Promise<ContactInquiry | null> {
    const updated = await this.repo.updateStatus(id, status);

    await auditService.log({
      actor,
      action: 'UPDATE_STATUS',
      resource: 'contact_inquiry',
      resourceId: id,
      status: updated ? 'SUCCESS' : 'FAILURE',
      metadata: { newStatus: status },
    });

    return updated;
  }

  async deleteInquiry(id: string, actor = 'admin'): Promise<boolean> {
    const success = await this.repo.delete(id);

    await auditService.log({
      actor,
      action: 'DELETE',
      resource: 'contact_inquiry',
      resourceId: id,
      status: success ? 'SUCCESS' : 'FAILURE',
    });

    return success;
  }
}

export const contactService = new ContactService();
