import type { FounderJourneyStep, VentureProof, FounderPrinciple, OperatingStep } from '@/types/founder';

export const FOUNDER = {
  name: 'Mesum',
  role: 'Founder, NOVARCH',
  portrait: '/images/founders/Mesum_Founder_Portrait-removebg-preview.png',
  mantra: 'Ambition made accountable through systems.',
} as const;

export const ORIGIN_STORY = {
  image: '/images/founders/novarch-original-handdrawn-mark.png',
  eyebrow: 'BRAND ORIGIN',
  title: 'Before NOVARCH, there was LifePrime.ai.',
  paragraphs: [
    'The early concept was first explored under the name LifePrime.ai — but it never carried the structural meaning of the company being built, so the search continued.',
    'NOVARCH emerged from a conceptual combination of Nova and Arch: new possibility, given structure.',
    'The first NOVARCH mark was hand-drawn by Sameer, after a real conversation with the founder at the TU Ilmenau library. It is human provenance, not marketing mythology.',
  ],
} as const;

export const JOURNEY: FounderJourneyStep[] = [
  {
    step: '01',
    phase: 'Early Curiosity',
    title: 'A house with one computer, and a curiosity that stuck.',
    description:
      'Early, hands-on familiarity with technology — not a coding origin story, just curiosity that never went away.',
    image: '/images/founders/mesum-childhood-computer.jpg',
  },
  {
    step: '02',
    phase: 'Commercial Translation',
    year: 'From 2021',
    title: 'Globe Digits',
    description:
      'Sustained client-facing, commercial learning: understanding buyer context, explaining digital capability, and moving prospects toward real sales conversations.',
  },
  {
    step: '03',
    phase: 'Operations Exposure',
    year: 'From December 2024',
    title: 'The Retail Cube',
    description:
      'Deeper e-commerce and marketplace-operations exposure — stores, listings, inventory reconciliation, order routing, fulfillment, and customer experience across Amazon FBA, Shopify, Walmart, TikTok Shop, eBay, and Etsy.',
  },
  {
    step: '04',
    phase: 'Solo Product Building',
    year: 'From April 2026',
    title: 'RaabtaDesk',
    description:
      'The founder-built full-stack system bridging strategy and software: capture inquiry, qualify, assign ownership, maintain follow-up discipline, and keep the pipeline visible.',
  },
  {
    step: '05',
    phase: 'NOVARCH',
    title: 'The systems company that combines those lessons.',
    description:
      'Built on one thesis: systems people can understand, operate, and own. Technology should increase human agency, not create opaque dependency.',
  },
];

export const VENTURE_PROOF: VentureProof[] = [
  {
    name: 'Globe Digits',
    period: 'From 2021',
    description:
      'Commercial, client-facing groundwork — structured lead pipelines, buyer context, Amazon catalog optimization, and moving prospects toward decisions.',
    image: '/images/founders/globedigits-dashboard-sample.png',
    isSample: true,
    liveUrl: 'https://globedigits.com',
    tags: ['Commercial Strategy', 'Amazon Growth', 'Client Pipelines'],
  },
  {
    name: 'The Retail Cube',
    period: 'From December 2024',
    description:
      'Multi-marketplace e-commerce operations — inventory reconciliation, supplier routing, order fulfillment, and dispute resolution across major platforms.',
    image: '/images/founders/retailcube-dashboard-sample.png',
    isSample: true,
    liveUrl: 'https://theretailcube.com',
    tags: ['Multi-Marketplace', 'Inventory Reconciliation', 'Fulfillment SLAs'],
  },
  {
    name: 'RaabtaDesk',
    period: 'From April 2026',
    description:
      'Founder-engineered inquiry-to-pipeline monorepo. Not a chatbot — the system layer for capture, qualification, ownership, follow-up discipline, and pipeline visibility.',
    liveUrl: 'https://raabta-desk-app.vercel.app/',
    websiteUrl: 'https://raabtadesk.com',
    githubUrl: 'https://github.com/MesumAbbas51214/RaabtaDeskProduct',
    isSample: false,
    techStack: ['Next.js 14', 'React Native (Expo)', 'Supabase RLS', 'TypeScript'],
    tags: ['Founder Monorepo', 'Web & Mobile Apps', 'Supabase Auth & RLS'],
  },
];

export const OPERATING_SEQUENCE: OperatingStep[] = [
  { step: '01', label: 'Request', desc: 'Inbound demand captured cleanly' },
  { step: '02', label: 'Context', desc: 'Business & operational reality mapped' },
  { step: '03', label: 'Decision', desc: 'Explicit logic, not opaque guessing' },
  { step: '04', label: 'Human Control', desc: 'Visible operator check on sensitive steps' },
  { step: '05', label: 'Action', desc: 'Automated execution and dispatch' },
  { step: '06', label: 'Outcome', desc: 'Verifiable operational result & pipeline visibility' },
];

export const FOUNDER_PRINCIPLES: FounderPrinciple[] = [
  {
    title: 'Systems people can understand.',
    description:
      'No black boxes. Every system NOVARCH builds should make sense to the people who run it, not only to the people who built it.',
  },
  {
    title: 'Systems people can operate.',
    description:
      'Ownership means little if only the developer can touch it. Systems are built to be run day-to-day by the business itself.',
  },
  {
    title: 'Systems people can own.',
    description:
      'Technology should increase human agency, not create opaque dependency. You keep your data, your code, and your control.',
  },
];

export const FOUNDER_PROMISE = 'Build systems you own.';
