import { communityRepository, ICommunityRepository } from '../repositories/community.repository.js';
import { CommunityMember, CreateCommunityDTO, CommunityStatus } from '../types/community.types.js';

export class CommunityService {
  constructor(private repo: ICommunityRepository = communityRepository) {}

  async getAllMembers(): Promise<CommunityMember[]> {
    return this.repo.findAll();
  }

  async getMemberById(id: string): Promise<CommunityMember | null> {
    return this.repo.findById(id);
  }

  async submitMember(dto: CreateCommunityDTO): Promise<CommunityMember> {
    return this.repo.create(dto);
  }

  async updateMemberStatus(id: string, status: CommunityStatus): Promise<CommunityMember | null> {
    return this.repo.updateStatus(id, status);
  }

  async deleteMember(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}

export const communityService = new CommunityService();
