import { notFound } from 'next/navigation';

export default function AboutPage() {
  // ROUTE DISABLED: About page is disabled per requirements
  notFound();
}

/*
// ============================================================================
// DISABLED ABOUT PAGE CODE (COMMENTED OUT BELOW)
// ============================================================================

import { generateMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/animations/Reveal';
import { Button } from '@/components/ui/Button';
import { Globe2, ArrowRight } from 'lucide-react';
import { BRAND_PRINCIPLES } from '@/lib/constants';

export const metadata = generateMetadata({
  title: 'About',
  description:
    'NOVARCH brings entrepreneurial speed together with German precision, privacy, documentation and dependable execution.',
  path: '/about',
});

const COMPANY_PILLARS = [
  {
    title: 'Business Context Before Complexity',
    description:
      'We start every project by establishing why the system needs to exist economically and operationally — not by choosing tech stacks in isolation.',
  },
  {
    title: 'Build, Not Only Advise',
    description:
      'Strategy without technical implementation creates reports that gather dust. Strategy, interface design, automation, integration and custom software remain under one accountable roof.',
  },
  {
    title: 'Visible Human Control',
    description:
      'We reject unmonitored autonomous AI. Sensitive decisions, customer interactions, and financial handoffs retain explicit, visible operator confirmation steps.',
  },
  {
    title: 'Ownership & Deliberate Offboarding',
    description:
      'We build systems you can operate, audit and transfer. You own your code, credentials, and documentation without forced vendor lock-in.',
  },
];

// About Page component code preserved in comment block
*/
