import { contactRepository, IContactRepository } from '../repositories/contact.repository.js';
import { ContactInquiry, CreateContactDTO, LeadStatus } from '../types/contact.types.js';

export class ContactService {
  constructor(private repo: IContactRepository = contactRepository) {}

  async getAllInquiries(): Promise<ContactInquiry[]> {
    return this.repo.findAll();
  }

  async getInquiryById(id: string): Promise<ContactInquiry | null> {
    return this.repo.findById(id);
  }

  async submitInquiry(dto: CreateContactDTO): Promise<ContactInquiry> {
    return this.repo.create(dto);
  }

  async updateLeadStatus(id: string, status: LeadStatus): Promise<ContactInquiry | null> {
    return this.repo.updateStatus(id, status);
  }

  async deleteInquiry(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}

export const contactService = new ContactService();
