export interface ServiceDeliverable {
  item: string;
}

export interface ServiceScope {
  title: string;
  description: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  paidEntry: {
    name: string;
    price: number;
  };
  implementation: {
    from: number;
    label?: string;
  };
  timeline: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class hint
  buyerFit: string[];
  problems: string[];
  scope: ServiceScope[];
  deliverables: string[];
  exclusions: string[];
  engagementSteps: string[];
}
