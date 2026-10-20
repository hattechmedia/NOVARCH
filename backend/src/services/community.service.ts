import { communityRepository, ICommunityRepository } from '../repositories/community.repository.js';
import { CommunityMember, CreateCommunityDTO, CommunityStatus, ApplicationType } from '../types/community.types.js';
import { emailService } from './email.service.js';

export class CommunityService {
  constructor(private repo: ICommunityRepository = communityRepository) {}

  async getAllMembers(filter?: { applicationType?: ApplicationType }): Promise<CommunityMember[]> {
    return this.repo.findAll(filter);
  }

  async getMemberById(id: string): Promise<CommunityMember | null> {
    return this.repo.findById(id);
  }

  async findRecentByEmail(email: string, applicationType: ApplicationType, withinMs: number) {
    return this.repo.findRecentByEmail(email, applicationType, withinMs);
  }

  async submitMember(dto: CreateCommunityDTO): Promise<{ member: CommunityMember; emailResult: { sent: boolean; status: string } }> {
    const member = await this.repo.create(dto);

    // Trigger transactional acknowledgment email and admin notification safely in the background
    let emailResult = { sent: false, status: 'unconfigured' };
    try {
      const [ackRes] = await Promise.allSettled([
        emailService.sendAcknowledgmentEmail({
          to: member.email,
          fullName: member.fullName,
          applicationType: member.applicationType,
        }),
        emailService.sendCommunityAdminNotification(member),
      ]);

      if (ackRes.status === 'fulfilled') {
        emailResult = ackRes.value;
      }
    } catch (err) {
      console.error('Email dispatch error caught in communityService:', err);
    }

    return { member, emailResult };
  }

  async updateMemberStatus(id: string, status: CommunityStatus): Promise<CommunityMember | null> {
    return this.repo.updateStatus(id, status);
  }

  async withdrawMarketingConsent(id: string): Promise<CommunityMember | null> {
    return this.repo.updateMarketingConsent(id, false);
  }

  async deleteMember(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}

export const communityService = new CommunityService();
