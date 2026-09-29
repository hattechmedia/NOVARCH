import { z } from 'zod';

export type ProjectStatus = 'draft' | 'published' | 'archived';
export type ProjectCategory = 'venture' | 'client' | 'lab' | 'internal' | 'case-study';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  category: ProjectCategory;
  period: string;
  summary?: string;
  description: string;
  status: ProjectStatus;
  isSample?: boolean;
  image?: string;
  liveUrl?: string;
  websiteUrl?: string;
  githubUrl?: string;
  tags: string[];
  techStack?: string[];
  metrics?: ProjectMetric[];
  links?: ProjectLink[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export const CreateProjectSchema = z.object({
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  name: z.string().min(2).max(150),
  category: z.enum(['venture', 'client', 'lab', 'internal', 'case-study']).default('venture'),
  period: z.string().min(2).max(50),
  summary: z.string().max(300).optional(),
  description: z.string().min(5).max(5000),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  isSample: z.boolean().optional().default(false),
  image: z.string().url().or(z.string().startsWith('/')).optional(),
  liveUrl: z.string().url().optional(),
  websiteUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  techStack: z.array(z.string()).optional(),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  links: z.array(z.object({ label: z.string(), url: z.string().url(), isExternal: z.boolean().optional() })).optional(),
  featured: z.boolean().optional().default(false),
});

export const UpdateProjectSchema = CreateProjectSchema.partial();

export const ProjectFilterSchema = z.object({
  category: z.enum(['venture', 'client', 'lab', 'internal', 'case-study']).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  featured: z.boolean().optional(),
  search: z.string().optional(),
});

export type CreateProjectDTO = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectDTO = z.infer<typeof UpdateProjectSchema>;
export type ProjectFilterDTO = z.infer<typeof ProjectFilterSchema>;
