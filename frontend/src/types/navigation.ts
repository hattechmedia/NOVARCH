export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  highlight?: boolean;
  badge?: string;
  icon?: 'flame' | 'terminal';
}

