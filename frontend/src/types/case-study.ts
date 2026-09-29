import type { Project } from './project';

export type CaseStudy = Project;

export interface CaseStudyDetail extends Project {
  challenge?: string;
  solution?: string;
  architecture?: string[];
  impact?: string[];
  clientSector?: string;
}
