export type PerformanceOption =
  | 'Digital Launch'
  | 'Automation & Integration'
  | 'AI Workflow'
  | 'Custom Software'
  | 'Systems Advisory & Architecture Review'
  | 'Technical Editorial Department'
  | 'CE conformity'
  | 'IT systems house'
  | 'Information security'
  | 'Continuing education';

export interface ContactFormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  company: string;
  performances: string[]; // array of selected Performance categories
  news?: string; // Optional message / news
}
