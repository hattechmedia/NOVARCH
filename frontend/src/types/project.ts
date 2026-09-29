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
  createdAt?: string;
  updatedAt?: string;
}

export interface LabEntry {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  hypothesis: string;
  status: 'experimental' | 'validated' | 'active' | 'archived';
  date: string;
  tags: string[];
  description: string;
  findings?: string[];
  techStack?: string[];
  githubUrl?: string;
  demoUrl?: string;
}
