import { CommunityMember, CreateCommunityDTO, CommunityStatus, ApplicationType } from '../types/community.types.js';
import { CommunityModel } from '../models/community.model.js';
import { connectDatabase } from '../config/database.js';

export interface ICommunityRepository {
  findAll(filter?: { applicationType?: ApplicationType }): Promise<CommunityMember[]>;
  findById(id: string): Promise<CommunityMember | null>;
  findRecentByEmail(
    email: string,
    applicationType: ApplicationType,
    withinMs: number
  ): Promise<CommunityMember | null>;
  create(dto: CreateCommunityDTO): Promise<CommunityMember>;
  updateStatus(id: string, status: CommunityStatus): Promise<CommunityMember | null>;
  updateMarketingConsent(id: string, consented: boolean): Promise<CommunityMember | null>;
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
    applicationType: rest.applicationType || (rest.whatYouDo || rest.whatCanYouOffer ? 'winter-arc' : 'community'),
    status: rest.status || 'New',
    source: rest.source || 'Website Form',
    createdAt: rest.createdAt instanceof Date ? rest.createdAt.toISOString() : (rest.createdAt || new Date().toISOString()),
    updatedAt: rest.updatedAt instanceof Date ? rest.updatedAt.toISOString() : (rest.updatedAt || new Date().toISOString()),
  } as CommunityMember;
}

export class MongoCommunityRepository implements ICommunityRepository {
  private inMemoryFallback: CommunityMember[] = [];

  async findAll(filter?: { applicationType?: ApplicationType }): Promise<CommunityMember[]> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const query: any = {};
        if (filter?.applicationType) {
          query.applicationType = filter.applicationType;
        }
        const docs = await CommunityModel.find(query).sort({ createdAt: -1 }).lean();
        return docs.map(formatCommunityDoc);
      } catch (err) {
        throw Object.assign(new Error('Database operation failed'), { status: 503 });
      }
    }

    return [...this.inMemoryFallback]
      .filter((m) => (!filter?.applicationType ? true : m.applicationType === filter.applicationType))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async findById(id: string): Promise<CommunityMember | null> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const doc = await CommunityModel.findById(id).lean();
        if (doc) return formatCommunityDoc(doc);
      } catch (err) {
        throw Object.assign(new Error('Database operation failed'), { status: 503 });
      }
    }

    const item = this.inMemoryFallback.find((i) => i.id === id);
    return item ? { ...item } : null;
  }

  async findRecentByEmail(
    email: string,
    applicationType: ApplicationType,
    withinMs: number
  ): Promise<CommunityMember | null> {
    const normalized = email.trim().toLowerCase();
    const cutoff = new Date(Date.now() - withinMs);

    const connected = await connectDatabase();
    if (connected) {
      try {
        const doc = await CommunityModel.findOne({
          email: normalized,
          applicationType,
          createdAt: { $gte: cutoff },
        })
          .sort({ createdAt: -1 })
          .lean();
        if (doc) return formatCommunityDoc(doc);
      } catch (err) {
        throw Object.assign(new Error('Database operation failed'), { status: 503 });
      }
    }

    const item = this.inMemoryFallback.find(
      (i) =>
        i.email === normalized &&
        i.applicationType === applicationType &&
        new Date(i.createdAt).getTime() >= cutoff.getTime()
    );
    return item ? { ...item } : null;
  }

  async create(dto: CreateCommunityDTO): Promise<CommunityMember> {
    const appType: ApplicationType = dto.applicationType || (dto.whatYouDo || dto.whatCanYouOffer ? 'winter-arc' : 'community');
    const referralSource =
      dto.referral && typeof dto.referral === 'object' ? dto.referral.utmSource : undefined;
    const source = dto.source || (referralSource ? `Campaign: ${referralSource}` : 'Website Form');

    const now = new Date();
    const marketingConsent = Boolean(dto.marketingConsent);
    const photoConsent = Boolean(dto.photoConsent);

    const connected = await connectDatabase();
    if (connected) {
      try {
        const doc = await CommunityModel.create({
          applicationType: appType,
          fullName: dto.fullName,
          email: dto.email,
          country: dto.country || undefined,
          city: dto.city || undefined,
          contactNumber: dto.contactNumber || undefined,
          countryCode: dto.countryCode || undefined,
          organization: dto.organization || undefined,
          role: dto.role || undefined,
          whatYouDo: dto.whatYouDo || undefined,
          whatCanYouOffer: dto.whatCanYouOffer || undefined,
          whatAreYouLookingFor: dto.whatAreYouLookingFor || undefined,
          linkedinUrl: dto.linkedinUrl || undefined,
          portfolioUrl: dto.portfolioUrl || undefined,
          proposedGuest: dto.proposedGuest || undefined,
          interests: Array.isArray(dto.interests) ? dto.interests : [],
          message: dto.message || undefined,
          referral: dto.referral || undefined,
          status: dto.status || 'New',
          source: source,
          marketingConsent: marketingConsent,
          marketingConsentAt: marketingConsent ? now : null,
          marketingConsentVersion: marketingConsent ? 'v1-2026-10' : undefined,
          photoConsent: photoConsent,
          photoConsentAt: photoConsent ? now : null,
          photoConsentVersion: photoConsent ? 'v1-2026-10' : undefined,
        });

        console.log('Record saved');
        return formatCommunityDoc(doc.toJSON ? doc.toJSON() : doc);
      } catch (err) {
        throw Object.assign(new Error('Database operation failed'), { status: 503 });
      }
    }

    // In-memory fallback
    const newMember: CommunityMember = {
      id: `app-${Date.now()}`,
      applicationType: appType,
      fullName: dto.fullName,
      email: dto.email,
      country: dto.country || undefined,
      city: dto.city || undefined,
      contactNumber: dto.contactNumber || undefined,
      countryCode: dto.countryCode || undefined,
      organization: dto.organization || undefined,
      role: dto.role || undefined,
      whatYouDo: dto.whatYouDo || undefined,
      whatCanYouOffer: dto.whatCanYouOffer || undefined,
      whatAreYouLookingFor: dto.whatAreYouLookingFor || undefined,
      linkedinUrl: dto.linkedinUrl || undefined,
      portfolioUrl: dto.portfolioUrl || undefined,
      proposedGuest: dto.proposedGuest || undefined,
      interests: Array.isArray(dto.interests) ? dto.interests : [],
      message: dto.message || undefined,
      referral: dto.referral || undefined,
      status: dto.status || 'New',
      source: source,
      marketingConsent: marketingConsent,
      marketingConsentAt: marketingConsent ? now.toISOString() : null,
      marketingConsentVersion: marketingConsent ? 'v1-2026-10' : undefined,
      photoConsent: photoConsent,
      photoConsentAt: photoConsent ? now.toISOString() : null,
      photoConsentVersion: photoConsent ? 'v1-2026-10' : undefined,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
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
          { returnDocument: 'after', runValidators: true }
        ).lean();
        if (doc) return formatCommunityDoc(doc);
      } catch (err) {
        throw Object.assign(new Error('Database operation failed'), { status: 503 });
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

  async updateMarketingConsent(id: string, consented: boolean): Promise<CommunityMember | null> {
    const now = new Date();
    const connected = await connectDatabase();
    if (connected) {
      try {
        const updateFields: any = {
          marketingConsent: consented,
          updatedAt: now,
        };
        if (!consented) {
          updateFields.marketingConsentWithdrawnAt = now;
        }
        const doc = await CommunityModel.findByIdAndUpdate(
          id,
          updateFields,
          { returnDocument: 'after', runValidators: true }
        ).lean();
        if (doc) return formatCommunityDoc(doc);
      } catch (err) {
        throw Object.assign(new Error('Database operation failed'), { status: 503 });
      }
    }
    const index = this.inMemoryFallback.findIndex((i) => i.id === id);
    if (index === -1) return null;
    this.inMemoryFallback[index] = {
      ...this.inMemoryFallback[index],
      marketingConsent: consented,
      marketingConsentWithdrawnAt: consented ? undefined : now.toISOString(),
      updatedAt: now.toISOString(),
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
        throw Object.assign(new Error('Database operation failed'), { status: 503 });
      }
    }

    const initialLength = this.inMemoryFallback.length;
    this.inMemoryFallback = this.inMemoryFallback.filter((i) => i.id !== id);
    return this.inMemoryFallback.length < initialLength;
  }
}

export const communityRepository = new MongoCommunityRepository();
