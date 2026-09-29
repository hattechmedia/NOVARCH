import type { Project, LabEntry } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'proj-globe-digits',
    slug: 'globe-digits',
    name: 'Globe Digits',
    category: 'venture',
    period: 'From 2021',
    summary: 'Commercial, client-facing groundwork — structured lead pipelines and marketplace catalog optimization.',
    description:
      'Commercial, client-facing groundwork — structured lead pipelines, buyer context, Amazon catalog optimization, and moving prospects toward decisions.',
    status: 'published',
    image: '/images/founders/globedigits-dashboard-sample.png',
    isSample: true,
    liveUrl: 'https://globedigits.com',
    tags: ['Commercial Strategy', 'Amazon Growth', 'Client Pipelines'],
    techStack: ['Commercial Architecture', 'Catalog Optimization', 'Inbound Pipelines'],
    featured: true,
  },
  {
    id: 'proj-the-retail-cube',
    slug: 'the-retail-cube',
    name: 'The Retail Cube',
    category: 'venture',
    period: 'From December 2024',
    summary: 'Multi-marketplace e-commerce operations — inventory reconciliation and order routing.',
    description:
      'Multi-marketplace e-commerce operations — inventory reconciliation, supplier routing, order fulfillment, and dispute resolution across major platforms.',
    status: 'published',
    image: '/images/founders/retailcube-dashboard-sample.png',
    isSample: true,
    liveUrl: 'https://theretailcube.com',
    tags: ['Multi-Marketplace', 'Inventory Reconciliation', 'Fulfillment SLAs'],
    techStack: ['E-Commerce Ops', 'Inventory Engine', 'SLA Orchestration'],
    featured: true,
  },
  {
    id: 'proj-raabtadesk',
    slug: 'raabtadesk',
    name: 'RaabtaDesk',
    category: 'venture',
    period: 'From April 2026',
    summary: 'Founder-engineered inquiry-to-pipeline monorepo for lead capture, qualification, and follow-up discipline.',
    description:
      'Founder-engineered inquiry-to-pipeline monorepo. Not a chatbot — the system layer for capture, qualification, ownership, follow-up discipline, and pipeline visibility.',
    status: 'published',
    isSample: false,
    liveUrl: 'https://raabta-desk-app.vercel.app/',
    websiteUrl: 'https://raabtadesk.com',
    githubUrl: 'https://github.com/MesumAbbas51214/RaabtaDeskProduct',
    tags: ['Founder Monorepo', 'Web & Mobile Apps', 'Supabase Auth & RLS'],
    techStack: ['Next.js 14', 'React Native (Expo)', 'Supabase RLS', 'TypeScript'],
    metrics: [
      { label: 'Lead Pipeline', value: '186 Inquiries' },
      { label: 'Platform Status', value: 'Live Production App' },
    ],
    featured: true,
  },
];

export const labEntries: LabEntry[] = [
  {
    id: 'lab-autonomous-intake',
    slug: 'autonomous-intake',
    title: 'Autonomous Multi-Tier Intake Protocol',
    subtitle: 'Deterministic routing of incoming enterprise briefs with human qualification gates.',
    hypothesis:
      'Structured schema extraction combined with explicit human-in-the-loop gates reduces qualification latency by 80% without losing context.',
    status: 'active',
    date: '2026-06',
    tags: ['Intake Protocols', 'Human-in-the-Loop', 'Deterministic AI'],
    description:
      'Experimental protocol to test how structured inquiry ingestion maps directly to backend estimation models and pipeline state machines.',
    techStack: ['TypeScript', 'Zod Schemas', 'Event Telemetry'],
    findings: [
      'Pre-computed bounding boxes prevent hallucinations in lead valuation.',
      'Explicit operator checkpoints increase enterprise buyer trust.',
    ],
  },
  {
    id: 'lab-sovereign-data-bridge',
    slug: 'sovereign-data-bridge',
    title: 'Sovereign Client Data Bridge',
    subtitle: 'Isolated credential and state replication across customer-owned infrastructure.',
    hypothesis:
      'Client-owned databases can operate in tandem with centralized orchestration without leaking operational data.',
    status: 'validated',
    date: '2026-04',
    tags: ['Data Sovereignty', 'Offboarding Architecture', 'Multi-Tenant Isolation'],
    description:
      'Architecture blueprint testing zero-lockin data transfer protocols where clients retain full cryptographic ownership of operational schemas.',
    techStack: ['Mongoose', 'MongoDB Atlas', 'JWT RBAC'],
    findings: [
      'Deliberate offboarding patterns eliminate vendor lock-in hesitation during sales cycles.',
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getLabEntryBySlug(slug: string): LabEntry | undefined {
  return labEntries.find((l) => l.slug === slug);
}
