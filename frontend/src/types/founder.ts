export interface FounderJourneyStep {
  step: string;
  phase: string;
  year?: string;
  title: string;
  description: string;
  image?: string;
}

export interface VentureProof {
  name: string;
  period: string;
  description: string;
  image?: string;
  isSample?: boolean;
  liveUrl?: string;
  websiteUrl?: string;
  githubUrl?: string;
  tags?: string[];
  techStack?: string[];
}

export interface FounderPrinciple {
  title: string;
  description: string;
}

export interface OperatingStep {
  step: string;
  label: string;
  desc: string;
}
