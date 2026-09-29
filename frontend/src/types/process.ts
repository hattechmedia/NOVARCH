export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  detail: string;
  criteria: string[];
  iconName: 'Search' | 'Compass' | 'Layers' | 'Rocket' | 'TrendingUp';
  bgImage: string;
  activeIconBg: string;
  idleIconBg: string;
  tagColor: string;
  activeBorder: string;
}
