import { CommunityMember, CreateCommunityDTO, CommunityStatus } from '../types/community.types.js';
import { CommunityModel } from '../models/community.model.js';
import { connectDatabase } from '../config/database.js';

export interface ICommunityRepository {
  findAll(): Promise<CommunityMember[]>;
  findById(id: string): Promise<CommunityMember | null>;
  create(dto: CreateCommunityDTO): Promise<CommunityMember>;
  updateStatus(id: string, status: CommunityStatus): Promise<CommunityMember | null>;
  delete(id: string): Promise<boolean>;
}

/**
 * Helper to ensure lean query documents match the CommunityMember interface.
 * Replicates the schema toJSON transform: maps _id -> id, removes __v, ensures ISO dates.
 */
function formatCommunityDoc(doc: any): CommunityMember {
  if (!doc) return doc;
  const { _id, __v, ...rest } = doc;
  return {
    ...rest,
    id: _id ? _id.toString() : (doc.id ? doc.id.toString() : ''),
    createdAt: rest.createdAt instanceof Date ? rest.createdAt.toISOString() : (rest.createdAt || new Date().toISOString()),
    updatedAt: rest.updatedAt instanceof Date ? rest.updatedAt.toISOString() : (rest.updatedAt || new Date().toISOString()),
  } as CommunityMember;
}

export class MongoCommunityRepository implements ICommunityRepository {
  private inMemoryFallback: CommunityMember[] = [];

  async findAll(): Promise<CommunityMember[]> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const docs = await CommunityModel.find().sort({ createdAt: -1 }).lean();
        return docs.map(formatCommunityDoc);
      } catch (err) {
        console.error('Error in MongoCommunityRepository.findAll:', err);
      }
    }

    return [...this.inMemoryFallback].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async findById(id: string): Promise<CommunityMember | null> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const doc = await CommunityModel.findById(id).lean();
        if (doc) return formatCommunityDoc(doc);
      } catch (err) {
        console.error('Error in MongoCommunityRepository.findById:', err);
      }
    }

    const item = this.inMemoryFallback.find((i) => i.id === id);
    return item ? { ...item } : null;
  }

  async create(dto: CreateCommunityDTO): Promise<CommunityMember> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const doc = await CommunityModel.create({
          fullName: dto.fullName,
          email: dto.email,
          contactNumber: dto.contactNumber || undefined,
          countryCode: dto.countryCode || undefined,
          organization: dto.organization || undefined,
          role: dto.role || undefined,
          interests: Array.isArray(dto.interests) ? dto.interests : [],
          message: dto.message || undefined,
          status: dto.status || 'New',
          source: 'Website Form',
        });

        console.log(`💾 Saved community member to MongoDB Atlas: ${doc.fullName} (${doc._id})`);
        return formatCommunityDoc(doc.toJSON ? doc.toJSON() : doc);
      } catch (err) {
        console.error('Error saving community member to MongoDB:', err);
      }
    }

    // In-memory fallback
    const newMember: CommunityMember = {
      id: `cm-${Date.now()}`,
      fullName: dto.fullName,
      email: dto.email,
      contactNumber: dto.contactNumber || undefined,
      countryCode: dto.countryCode || undefined,
      organization: dto.organization || undefined,
      role: dto.role || undefined,
      interests: Array.isArray(dto.interests) ? dto.interests : [],
      message: dto.message || undefined,
      status: dto.status || 'New',
      source: 'Website Form',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.inMemoryFallback.unshift(newMember);
    return { ...newMember };
  }

  async updateStatus(id: string, status: CommunityStatus): Promise<CommunityMember | null> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const doc = await CommunityModel.findByIdAndUpdate(
          id,
          { status, updatedAt: new Date() },
          { new: true }
        ).lean();
        if (doc) return formatCommunityDoc(doc);
      } catch (err) {
        console.error('Error in MongoCommunityRepository.updateStatus:', err);
      }
    }

    const index = this.inMemoryFallback.findIndex((i) => i.id === id);
    if (index === -1) return null;

    this.inMemoryFallback[index] = {
      ...this.inMemoryFallback[index],
      status,
      updatedAt: new Date().toISOString(),
    };

    return { ...this.inMemoryFallback[index] };
  }

  async delete(id: string): Promise<boolean> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const res = await CommunityModel.findByIdAndDelete(id);
        return !!res;
      } catch (err) {
        console.error('Error in MongoCommunityRepository.delete:', err);
      }
    }

    const initialLength = this.inMemoryFallback.length;
    this.inMemoryFallback = this.inMemoryFallback.filter((i) => i.id !== id);
    return this.inMemoryFallback.length < initialLength;
  }
}

export const communityRepository = new MongoCommunityRepository();
