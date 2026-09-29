import { Project, CreateProjectDTO, UpdateProjectDTO, ProjectFilterDTO, ProjectStatus } from '../types/project.types.js';
import { ProjectModel } from '../models/project.model.js';
import { connectDatabase } from '../config/database.js';

export interface IProjectRepository {
  findAll(filter?: ProjectFilterDTO): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  findBySlug(slug: string): Promise<Project | null>;
  create(dto: CreateProjectDTO): Promise<Project>;
  update(id: string, dto: UpdateProjectDTO): Promise<Project | null>;
  updateStatus(id: string, status: ProjectStatus): Promise<Project | null>;
  delete(id: string): Promise<boolean>;
}

function formatProjectDoc(doc: any): Project {
  if (!doc) return doc;
  const { _id, __v, ...rest } = doc;
  return {
    ...rest,
    id: _id ? _id.toString() : (doc.id ? doc.id.toString() : ''),
    createdAt: rest.createdAt instanceof Date ? rest.createdAt.toISOString() : (rest.createdAt || new Date().toISOString()),
    updatedAt: rest.updatedAt instanceof Date ? rest.updatedAt.toISOString() : (rest.updatedAt || new Date().toISOString()),
  } as Project;
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-globe-digits',
    slug: 'globe-digits',
    name: 'Globe Digits',
    category: 'venture',
    period: 'From 2021',
    summary: 'Commercial, client-facing groundwork — structured lead pipelines and catalog optimization.',
    description:
      'Commercial, client-facing groundwork — structured lead pipelines, buyer context, Amazon catalog optimization, and moving prospects toward decisions.',
    status: 'published',
    image: '/images/founders/globedigits-dashboard-sample.png',
    isSample: true,
    liveUrl: 'https://globedigits.com',
    tags: ['Commercial Strategy', 'Amazon Growth', 'Client Pipelines'],
    techStack: ['Commercial Architecture', 'Catalog Optimization', 'Inbound Pipelines'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-the-retail-cube',
    slug: 'the-retail-cube',
    name: 'The Retail Cube',
    category: 'venture',
    period: 'From December 2024',
    summary: 'Multi-marketplace e-commerce operations — inventory reconciliation and order routing.',
    description:
      'Multi-marketplace e-commerce operations — inventory reconciliation, supplier routing, order fulfillment, and dispute resolution across major platforms.',
    status: 'published',
    image: '/images/founders/retailcube-dashboard-sample.png',
    isSample: true,
    liveUrl: 'https://theretailcube.com',
    tags: ['Multi-Marketplace', 'Inventory Reconciliation', 'Fulfillment SLAs'],
    techStack: ['E-Commerce Ops', 'Inventory Engine', 'SLA Orchestration'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-raabtadesk',
    slug: 'raabtadesk',
    name: 'RaabtaDesk',
    category: 'venture',
    period: 'From April 2026',
    summary: 'Founder-engineered inquiry-to-pipeline monorepo.',
    description:
      'Founder-engineered inquiry-to-pipeline monorepo. Not a chatbot — the system layer for capture, qualification, ownership, follow-up discipline, and pipeline visibility.',
    status: 'published',
    isSample: false,
    liveUrl: 'https://raabta-desk-app.vercel.app/',
    websiteUrl: 'https://raabtadesk.com',
    githubUrl: 'https://github.com/MesumAbbas51214/RaabtaDeskProduct',
    tags: ['Founder Monorepo', 'Web & Mobile Apps', 'Supabase Auth & RLS'],
    techStack: ['Next.js 14', 'React Native (Expo)', 'Supabase RLS', 'TypeScript'],
    metrics: [
      { label: 'Lead Pipeline', value: '186 Inquiries' },
      { label: 'Platform Status', value: 'Live Production App' },
    ],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export class MongoProjectRepository implements IProjectRepository {
  private inMemoryFallback: Project[] = [...INITIAL_PROJECTS];

  async findAll(filter?: ProjectFilterDTO): Promise<Project[]> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const query: Record<string, any> = {};
        if (filter?.category) query.category = filter.category;
        if (filter?.status) query.status = filter.status;
        if (filter?.featured !== undefined) query.featured = filter.featured;
        if (filter?.search) {
          query.$or = [
            { name: { $regex: filter.search, $options: 'i' } },
            { description: { $regex: filter.search, $options: 'i' } },
            { tags: { $in: [new RegExp(filter.search, 'i')] } },
          ];
        }

        const docs = await ProjectModel.find(query).sort({ createdAt: -1 }).lean();
        if (docs.length > 0) {
          return docs.map(formatProjectDoc);
        }
      } catch (err) {
        console.error('Error in MongoProjectRepository.findAll:', err);
      }
    }

    let items = [...this.inMemoryFallback];
    if (filter?.category) items = items.filter((i) => i.category === filter.category);
    if (filter?.status) items = items.filter((i) => i.status === filter.status);
    if (filter?.featured !== undefined) items = items.filter((i) => i.featured === filter.featured);
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return items;
  }

  async findById(id: string): Promise<Project | null> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const doc = await ProjectModel.findById(id).lean();
        if (doc) return formatProjectDoc(doc);
      } catch (err) {
        console.error('Error in MongoProjectRepository.findById:', err);
      }
    }

    const item = this.inMemoryFallback.find((i) => i.id === id);
    return item ? { ...item } : null;
  }

  async findBySlug(slug: string): Promise<Project | null> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const doc = await ProjectModel.findOne({ slug: slug.toLowerCase() }).lean();
        if (doc) return formatProjectDoc(doc);
      } catch (err) {
        console.error('Error in MongoProjectRepository.findBySlug:', err);
      }
    }

    const item = this.inMemoryFallback.find((i) => i.slug === slug.toLowerCase());
    return item ? { ...item } : null;
  }

  async create(dto: CreateProjectDTO): Promise<Project> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const doc = await ProjectModel.create({
          ...dto,
          status: dto.status || 'draft',
        });
        return formatProjectDoc(doc.toJSON ? doc.toJSON() : doc);
      } catch (err) {
        console.error('Error saving project to MongoDB:', err);
      }
    }

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      slug: dto.slug,
      name: dto.name,
      category: dto.category || 'venture',
      period: dto.period,
      summary: dto.summary,
      description: dto.description,
      status: dto.status || 'draft',
      isSample: dto.isSample || false,
      image: dto.image,
      liveUrl: dto.liveUrl,
      websiteUrl: dto.websiteUrl,
      githubUrl: dto.githubUrl,
      tags: dto.tags || [],
      techStack: dto.techStack,
      metrics: dto.metrics,
      links: dto.links,
      featured: dto.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.inMemoryFallback.unshift(newProject);
    return { ...newProject };
  }

  async update(id: string, dto: UpdateProjectDTO): Promise<Project | null> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const doc = await ProjectModel.findByIdAndUpdate(
          id,
          { ...dto, updatedAt: new Date() },
          { new: true }
        ).lean();
        if (doc) return formatProjectDoc(doc);
      } catch (err) {
        console.error('Error updating project in MongoDB:', err);
      }
    }

    const index = this.inMemoryFallback.findIndex((i) => i.id === id);
    if (index === -1) return null;

    this.inMemoryFallback[index] = {
      ...this.inMemoryFallback[index],
      ...dto,
      updatedAt: new Date().toISOString(),
    };

    return { ...this.inMemoryFallback[index] };
  }

  async updateStatus(id: string, status: ProjectStatus): Promise<Project | null> {
    return this.update(id, { status });
  }

  async delete(id: string): Promise<boolean> {
    const connected = await connectDatabase();
    if (connected) {
      try {
        const res = await ProjectModel.findByIdAndDelete(id);
        return !!res;
      } catch (err) {
        console.error('Error deleting project in MongoDB:', err);
      }
    }

    const initialLength = this.inMemoryFallback.length;
    this.inMemoryFallback = this.inMemoryFallback.filter((i) => i.id !== id);
    return this.inMemoryFallback.length < initialLength;
  }
}

export const projectRepository = new MongoProjectRepository();
