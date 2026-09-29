import type { BuildWithUsData } from '@/types/buildWithUs';

export const buildWithUsData: BuildWithUsData = {
  eyebrow: 'BUILD WITH US',
  heading: 'Build what comes next',
  headingHighlight: 'with NOVARCH.',
  description:
    'NOVARCH is building ambitious products, systems, and ideas at the intersection of technology, creativity, research, and execution. We are interested in exceptional people who want to contribute, collaborate, experiment, and build alongside us.',
  areas: [
    {
      id: 'builders',
      num: '01',
      title: 'Builders',
      tagline: 'Engineering ideas into resilient, working systems',
      description:
        'Engineers, developers, architects, and technical problem-solvers who turn ideas into production-grade systems, clean APIs, and autonomous workflows.',
      shortDesc:
        'Engineers & architects turning ideas into resilient, production-grade systems and clean autonomous tools.',
      focusAreas: [
        'Distributed Systems Architecture',
        'Applied AI & Inference Pipelines',
        'Reactive Web & Mobile Platforms',
        'Autonomous Workflow Tooling',
      ],
      engagementMode: 'Direct Co-Building & Technical Sprints',
      icon: 'Terminal',
      activeVector: 'Production engineering & systems execution',
    },
    {
      id: 'researchers',
      num: '02',
      title: 'Researchers',
      tagline: 'Exploring emerging systems, models, and paradigms',
      description:
        'Thinkers and domain researchers investigating frontier technologies, agentic coordination, algorithmic mechanisms, and next-generation system dynamics.',
      shortDesc:
        'Thinkers investigating agentic coordination, evaluation frameworks, and frontier system dynamics.',
      focusAreas: [
        'Multi-Agent System Orchestration',
        'Human-in-the-Loop Governance',
        'Deterministic AI Evaluation',
        'Emerging Computing Paradigms',
      ],
      engagementMode: 'Applied R&D & Exploratory Studies',
      icon: 'Atom',
      activeVector: 'Applied investigation & scientific validation',
    },
    {
      id: 'designers',
      num: '03',
      title: 'Designers',
      tagline: 'Transforming complexity into intuitive, humane interfaces',
      description:
        'Creative minds and product architects who sculpt complex technological capabilities into crisp, tactile, and highly empowering software experiences.',
      shortDesc:
        'Product & creative minds shaping complex technical systems into clear, tactile, high-agency tools.',
      focusAreas: [
        'High-Density Interface Ergonomics',
        'Modular Design Systems & Tokens',
        'Interaction Architecture & Motion',
        'Data Visualization & Control Dashboards',
      ],
      engagementMode: 'Interface Architecture & Experience Sprints',
      icon: 'Layers',
      activeVector: 'Human agency & structural visual clarity',
    },
    {
      id: 'operators',
      num: '04',
      title: 'Operators',
      tagline: 'Turning ambitious concepts into functioning organizations',
      description:
        'Pragmatic operators and system orchestrators who align technology with real economics, commercial pipelines, accountability, and operational cadence.',
      shortDesc:
        'System orchestrators aligning technology with commercial realities, SLAs, and operational cadence.',
      focusAreas: [
        'Operational Blueprinting',
        'Workflow Optimization & SLAs',
        'Commerce & Logistics Orchestration',
        'Metrics, Telemetry & Human Oversight',
      ],
      engagementMode: 'Venture Operations & Systems Scaling',
      icon: 'Sliders',
      activeVector: 'Operational rigor & economic translation',
    },
    {
      id: 'collaborators',
      num: '05',
      title: 'Collaborators',
      tagline: 'Independent specialists bringing singular perspectives',
      description:
        'Founders, cross-disciplinary specialists, independent creators, and industry experts looking to experiment, co-venture, or test bold hypotheses.',
      shortDesc:
        'Founders, creators & cross-disciplinary specialists bringing singular perspectives and bold hypotheses.',
      focusAreas: [
        'Venture Incubation & Prototyping',
        'Industry Domain Translation',
        'Specialized Advisory & Synergies',
        'Open Technology Experimentation',
      ],
      engagementMode: 'Strategic Collaboration & Co-Venture',
      icon: 'Sparkles',
      activeVector: 'Cross-disciplinary synthesis & shared upside',
    },
  ],
  pillars: [
    {
      title: 'Direct Co-Building',
      description:
        'Real software, production workflows, and tangible systems — no corporate bureaucracy, endless committee review, or resume screenings.',
      icon: 'Code2',
      image: '/images/pillars/direct-co-building.jpg',
    },
    {
      title: 'Human Agency First',
      description:
        'We build systems that elevate human judgment, accountability, and creative leverage rather than fostering opaque black-box dependencies.',
      icon: 'ShieldCheck',
      image: '/images/pillars/human-agency-first.jpg',
    },
    {
      title: 'Shared Ownership',
      description:
        'Transparent alignments, direct upside participation, and sovereign respect for data, craft, and intellectual contribution.',
      icon: 'KeyRound',
      image: '/images/pillars/shared-ownership.jpg',
    },
  ],
  ctaText: 'Start a Conversation',
  ctaHref: '/contact?service=advisory',
  secondaryCtaText: 'Explore What We Offer',
  secondaryCtaHref: '#services',
  note: "Whether you're developing an ambitious project, exploring a technical hypothesis, or looking for an aligned ecosystem to build with, our doors are open.",
};
