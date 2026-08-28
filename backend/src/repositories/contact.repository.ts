import { ContactInquiry, CreateContactDTO, LeadStatus, SubmissionType } from '../types/contact.types.js';
import { initialInquiries } from '../data/store.js';
import { ContactModel } from '../models/contact.model.js';
import { connectDatabase } from '../config/database.js';

export interface IContactRepository {
  findAll(): Promise<ContactInquiry[]>;
  findById(id: string): Promise<ContactInquiry | null>;
  create(dto: CreateContactDTO): Promise<ContactInquiry>;
  updateStatus(id: string, status: LeadStatus): Promise<ContactInquiry | null>;
  delete(id: string): Promise<boolean>;
  seedInitialData(): Promise<void>;
}

/**
 * Helper to ensure lean query documents match the exact ContactInquiry interface
 * Replicates the schema toJSON transform: mapping _id -> id, removing __v, and ensuring ISO dates
 */
function formatContactDoc(doc: any): ContactInquiry {
  if (!doc) return doc;
  const { _id, __v, ...rest } = doc;
  return {
    ...rest,
    id: _id ? _id.toString() : (doc.id ? doc.id.toString() : ''),
    createdAt: rest.createdAt instanceof Date ? rest.createdAt.toISOString() : (rest.createdAt || new Date().toISOString()),
    updatedAt: rest.updatedAt instanceof Date ? rest.updatedAt.toISOString() : (rest.updatedAt || new Date().toISOString()),
  } as ContactInquiry;
}

export class MongoContactRepository implements IContactRepository {
  private inMemoryFallback: ContactInquiry[] = [...initialInquiries];

  async seedInitialData(): Promise<void> {
    // Clean - no dummy seeding
  }

  async findAll(): Promise<ContactInquiry[]> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const docs = await ContactModel.find().sort({ createdAt: -1 }).lean();
        return docs.map(formatContactDoc);
      } catch (err) {
        console.error('Error in MongoContactRepository.findAll:', err);
      }
    }

    return [...this.inMemoryFallback].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async findById(id: string): Promise<ContactInquiry | null> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const doc = await ContactModel.findById(id).lean();
        if (doc) return formatContactDoc(doc);
      } catch (err) {
        console.error('Error in MongoContactRepository.findById:', err);
      }
    }

    const item = this.inMemoryFallback.find((i) => i.id === id);
    return item ? { ...item } : null;
  }

  async create(dto: CreateContactDTO): Promise<ContactInquiry> {
    const isServiceLead = dto.submissionType === 'service_lead';
    const submissionType: SubmissionType = isServiceLead ? 'service_lead' : 'message';
    const source = isServiceLead ? 'Service Package' : 'Website Form';

    const performances = Array.isArray(dto.performances) ? dto.performances : [];
    const serviceType =
      dto.serviceType ||
      (performances.length > 0 ? performances.join(', ') : 'General Inquiry');
    const preferredService =
      dto.preferredService || (performances.length > 0 ? performances[0] : 'General Inquiry');

    // Estimate pipeline value accurately
    let estimatedValue = dto.estimatedValue || 0;
    if (dto.planPrice) {
      const numeric = parseInt(String(dto.planPrice).replace(/[^0-9]/g, ''), 10);
      if (!isNaN(numeric) && numeric > 0) {
        estimatedValue = numeric;
      }
    }
    if (!estimatedValue && performances.length > 0) {
      const valueMap: Record<string, number> = {
        'Technical Editorial Department': 18000,
        'CE conformity': 22000,
        'IT systems house': 35000,
        'Information security': 28000,
        'Continuing education': 12000,
      };
      estimatedValue = performances.reduce(
        (sum, p) => sum + (valueMap[p] || 2500),
        0
      );
    }
    if (!estimatedValue) estimatedValue = 2499;

    const message =
      dto.message ||
      dto.news ||
      (isServiceLead
        ? `Package subscription for ${preferredService} - ${dto.planName || 'Plan'}`
        : 'Inquiry submitted via website contact form.');

    const initialStatus = dto.status || 'New';

    const connected = await connectDatabase();
    if (connected) {
      try {
        const doc = await ContactModel.create({
          submissionType,
          name: dto.name,
          email: dto.email,
          phone: dto.phone || undefined,
          countryCode: dto.countryCode || undefined,
          company: dto.company || undefined,
          planName: dto.planName || undefined,
          planTier: dto.planTier || undefined,
          planPrice: dto.planPrice || undefined,
          performances,
          news: dto.news || undefined,
          serviceType,
          preferredService,
          message,
          status: initialStatus,
          estimatedValue,
          source,
          stripeSessionId: dto.stripeSessionId || undefined,
          stripePaymentIntentId: dto.stripePaymentIntentId || undefined,
        });

        console.log(`💾 Saved ${submissionType} to MongoDB Atlas: ${doc.name} (${doc._id})`);
        return formatContactDoc(doc.toJSON ? doc.toJSON() : doc);
      } catch (err) {
        console.error('Error saving to MongoDB:', err);
      }
    }

    // In-memory fallback
    const newInquiry: ContactInquiry = {
      id: `inq-${Date.now()}`,
      submissionType,
      name: dto.name,
      email: dto.email,
      phone: dto.phone || undefined,
      countryCode: dto.countryCode || undefined,
      company: dto.company || undefined,
      planName: dto.planName || undefined,
      planTier: dto.planTier || undefined,
      planPrice: dto.planPrice || undefined,
      performances,
      news: dto.news || undefined,
      serviceType,
      preferredService,
      message,
      status: initialStatus,
      estimatedValue,
      source,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.inMemoryFallback.unshift(newInquiry);
    return { ...newInquiry };
  }

  async updateStatus(id: string, status: LeadStatus): Promise<ContactInquiry | null> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const doc = await ContactModel.findByIdAndUpdate(
          id,
          { status, updatedAt: new Date() },
          { new: true }
        ).lean();
        if (doc) return formatContactDoc(doc);
      } catch (err) {
        console.error('Error in MongoContactRepository.updateStatus:', err);
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
        const res = await ContactModel.findByIdAndDelete(id);
        return !!res;
      } catch (err) {
        console.error('Error in MongoContactRepository.delete:', err);
      }
    }

    const initialLength = this.inMemoryFallback.length;
    this.inMemoryFallback = this.inMemoryFallback.filter((i) => i.id !== id);
    return this.inMemoryFallback.length < initialLength;
  }
}

export const contactRepository = new MongoContactRepository();
