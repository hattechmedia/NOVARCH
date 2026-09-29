import type { PerformanceOption } from '@/types/form';

export interface PerformanceOptionItem {
  id: PerformanceOption;
  label: string;
  description: string;
  iconName: 'Globe' | 'GitBranch' | 'Cpu' | 'Code2' | 'ShieldCheck';
}

export interface CountryCodeItem {
  code: string;
  country: string;
  flag: string;
}

export const PERFORMANCE_OPTIONS: PerformanceOptionItem[] = [
  {
    id: 'Digital Launch',
    label: 'Digital Launch',
    description: 'High-converting web architecture, positioning & digital presence',
    iconName: 'Globe',
  },
  {
    id: 'Automation & Integration',
    label: 'Automation & Integration',
    description: 'Connect operational tools, eliminate manual data transfers and handoffs',
    iconName: 'GitBranch',
  },
  {
    id: 'AI Workflow',
    label: 'AI Workflow',
    description: 'Applied AI pipelines and automated workflows with human approval gates',
    iconName: 'Cpu',
  },
  {
    id: 'Custom Software',
    label: 'Custom Software',
    description: 'Bespoke web applications, APIs, role models and multi-tier platforms',
    iconName: 'Code2',
  },
  {
    id: 'Systems Advisory & Architecture Review',
    label: 'Systems Advisory & Architecture Review',
    description: 'Strategic tech review, discovery sprint, or general systems inquiry',
    iconName: 'ShieldCheck',
  },
];

export const COUNTRY_CODES: CountryCodeItem[] = [
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+43', country: 'Austria', flag: '🇦🇹' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
];
