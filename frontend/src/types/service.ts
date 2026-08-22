export interface ServiceDeliverable {
  item: string;
}

export interface ServiceScope {
  title: string;
  description: string;
}

export interface ServicePackage {
  name: string;
  tier: 'Basic' | 'Premium';
  price: string;
  priceNumber: number;
  description: string;
  features: string[];
  timeline: string;
  isPopular?: boolean;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  packages: {
    basic: ServicePackage;
    premium: ServicePackage;
  };
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
