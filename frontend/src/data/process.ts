import type { ProcessStep } from '@/types/process';

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Understand',
    summary: 'Identify the real job, workflow, value and constraints.',
    detail:
      'We analyze your current operations, bottleneck handoffs, economic levers, and technical boundaries before proposing any architecture.',
    criteria: ['Explicit approval gate', 'Transparent documentation', 'Full customer data control'],
    iconName: 'Search',
    bgImage: '/images/process/understand-bg.jpg',
    activeIconBg: 'bg-blue text-white border-blue-400 shadow-[0_0_12px_rgba(30,95,191,0.5)]',
    idleIconBg: 'bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-[0_0_8px_rgba(30,95,191,0.15)]',
    tagColor: 'text-blue-400',
    activeBorder: 'border-blue shadow-blue/20',
  },
  {
    step: '02',
    title: 'Architect',
    summary: 'Design the system, data flow, roles and integrations.',
    detail:
      'We outline explicit data schemas, human approval checkpoints, system integration paths, and privacy controls.',
    criteria: ['Data schema specification', 'Integration mapping', 'Role-based access matrix'],
    iconName: 'Compass',
    bgImage: '/images/process/architect-bg.jpg',
    activeIconBg: 'bg-cyan text-navy-950 border-cyan-300 shadow-[0_0_12px_rgba(56,178,216,0.5)]',
    idleIconBg: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_8px_rgba(56,178,216,0.15)]',
    tagColor: 'text-cyan-400',
    activeBorder: 'border-cyan shadow-cyan/20',
  },
  {
    step: '03',
    title: 'Build',
    summary: 'Create the interfaces, automations, software and AI components required.',
    detail:
      'We engineer modular frontend interfaces, resilient backend automations, and bounded AI workflows in structured sprints.',
    criteria: ['Modular frontend & API', 'Resilient error routing', 'Human approval gates'],
    iconName: 'Layers',
    bgImage: '/images/process/build-bg.jpg',
    activeIconBg: 'bg-indigo-500 text-white border-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.5)]',
    idleIconBg: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shadow-[0_0_8px_rgba(99,102,241,0.15)]',
    tagColor: 'text-indigo-400',
    activeBorder: 'border-indigo-500 shadow-indigo-500/20',
  },
  {
    step: '04',
    title: 'Deploy',
    summary: 'Test with real users, real inputs and clear acceptance criteria.',
    detail:
      'System goes live in production with real operational inputs, user verification, and strict acceptance criteria testing.',
    criteria: ['Acceptance testing', 'User onboarding', 'Production monitoring'],
    iconName: 'Rocket',
    bgImage: '/images/process/deploy-bg.jpg',
    activeIconBg: 'bg-emerald-500 text-navy-950 border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]',
    idleIconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.15)]',
    tagColor: 'text-emerald-400',
    activeBorder: 'border-emerald-500 shadow-emerald-500/20',
  },
  {
    step: '05',
    title: 'Improve',
    summary: 'Monitor outcomes, exceptions and opportunities to expand.',
    detail:
      'We track system uptime, exception logs, human approval throughput, and optimize continuously based on operational telemetry.',
    criteria: ['Telemetry analytics', 'Exception logging', 'Iterative expansion'],
    iconName: 'TrendingUp',
    bgImage: '/images/process/improve-bg.jpg',
    activeIconBg: 'bg-violet-500 text-white border-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.5)]',
    idleIconBg: 'bg-violet-500/15 text-violet-400 border border-violet-500/30 shadow-[0_0_8px_rgba(139,92,246,0.15)]',
    tagColor: 'text-violet-400',
    activeBorder: 'border-violet-500 shadow-violet-500/20',
  },
];
