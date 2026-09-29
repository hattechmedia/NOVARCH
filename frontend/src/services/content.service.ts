import { projects, labEntries, getProjectBySlug, getLabEntryBySlug } from '@/data/projects';
import { services, getServiceBySlug } from '@/data/services';
import {
  FOUNDER,
  COFOUNDER,
  JOURNEY,
  VENTURE_PROOF,
  OPERATING_SEQUENCE,
  FOUNDER_PRINCIPLES,
  FOUNDER_PROMISE,
} from '@/data/founders';
import { buildWithUsData } from '@/data/buildWithUs';
import { HERO_SERVICES_STRIP } from '@/data/hero';
import { PROCESS_STEPS } from '@/data/process';
import { DIFFERENTIATORS } from '@/data/whyNovarch';
import { BRAND_PRINCIPLES, SITE } from '@/lib/constants';

import type { Project, LabEntry, ProjectCategory, ProjectStatus } from '@/types/project';
import type { Service } from '@/types/service';
import type {
  FounderJourneyStep,
  VentureProof,
  FounderPrinciple,
  OperatingStep,
} from '@/types/founder';
import type { BuildWithUsData } from '@/types/buildWithUs';
import type { HeroServiceItem } from '@/types/hero';
import type { ProcessStep } from '@/types/process';
import type { Differentiator } from '@/types/whyNovarch';

/**
 * Unified Content Service Layer
 * 
 * Provides a clean boundary between UI presentation and content data sources.
 * In the future, this service can easily route requests to external APIs, CMS,
 * or database endpoints (such as Akilis) without changing UI components.
 */
export class ContentService {
  // --- Projects & Venture Data ---
  async getProjects(filter?: {
    category?: ProjectCategory;
    status?: ProjectStatus;
    featured?: boolean;
  }): Promise<Project[]> {
    let result = [...projects];

    if (filter?.category) {
      result = result.filter((p) => p.category === filter.category);
    }
    if (filter?.status) {
      result = result.filter((p) => p.status === filter.status);
    }
    if (filter?.featured !== undefined) {
      result = result.filter((p) => p.featured === filter.featured);
    }

    return result;
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return getProjectBySlug(slug);
  }

  // --- Lab & R&D Entries ---
  async getLabEntries(): Promise<LabEntry[]> {
    return [...labEntries];
  }

  async getLabEntryBySlug(slug: string): Promise<LabEntry | undefined> {
    return getLabEntryBySlug(slug);
  }

  // --- Services ---
  async getServices(): Promise<Service[]> {
    return [...services];
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return getServiceBySlug(slug);
  }

  // --- Founder & Team ---
  getFounder() {
    return FOUNDER;
  }

  getCofounder() {
    return COFOUNDER;
  }

  getJourney(): FounderJourneyStep[] {
    return [...JOURNEY];
  }

  getVentureProof(): VentureProof[] {
    return [...VENTURE_PROOF];
  }

  getOperatingSequence(): OperatingStep[] {
    return [...OPERATING_SEQUENCE];
  }

  getFounderPrinciples(): FounderPrinciple[] {
    return [...FOUNDER_PRINCIPLES];
  }

  getFounderPromise(): string {
    return FOUNDER_PROMISE;
  }

  // --- Company & Blueprint Content ---
  getBuildWithUs(): BuildWithUsData {
    return buildWithUsData;
  }

  getHeroServices(): HeroServiceItem[] {
    return [...HERO_SERVICES_STRIP];
  }

  getProcessSteps(): ProcessStep[] {
    return [...PROCESS_STEPS];
  }

  getWhyNovarchDifferentiators(): Differentiator[] {
    return [...DIFFERENTIATORS];
  }

  getBrandPrinciples(): readonly string[] {
    return BRAND_PRINCIPLES;
  }

  getSiteMetadata() {
    return SITE;
  }
}

export const contentService = new ContentService();
