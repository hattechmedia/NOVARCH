export interface CollaborationArea {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  shortDesc?: string;
  focusAreas: string[];
  engagementMode: string;
  icon: string;
  activeVector: string;
}

export interface EcosystemPillar {
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface BuildWithUsData {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  description: string;
  areas: CollaborationArea[];
  pillars: EcosystemPillar[];
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  note: string;
}
