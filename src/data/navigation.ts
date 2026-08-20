import type { NavItem } from '@/types/navigation';

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'We Offer',
    href: '#',
    children: [
      {
        label: 'Digital Launch',
        href: '/services/digital-launch',
        description: 'Clear, credible and conversion-ready digital presence.',
      },
      {
        label: 'Automation & Integration',
        href: '/services/automation-integration',
        description: 'Connect tools, data and business handoffs.',
      },
      {
        label: 'AI Workflow',
        href: '/services/ai-workflow',
        description: 'Move valuable AI use cases into controlled daily operation.',
      },
      {
        label: 'Custom Software',
        href: '/services/custom-software',
        description: 'Build the software the operation actually needs.',
      },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
