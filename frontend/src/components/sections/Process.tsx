'use client';

import * as React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/animations/Reveal';
import { cn } from '@/lib/utils';
import {
  Search,
  Compass,
  Layers,
  Rocket,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Understand',
    summary: 'Identify the real job, workflow, value and constraints.',
    detail:
      'We analyze your current operations, bottleneck handoffs, economic levers, and technical boundaries before proposing any architecture.',
    criteria: ['Explicit approval gate', 'Transparent documentation', 'Full customer data control'],
    icon: Search,
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
    icon: Compass,
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
    icon: Layers,
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
    icon: Rocket,
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
    icon: TrendingUp,
    bgImage: '/images/process/improve-bg.jpg',
    activeIconBg: 'bg-violet-500 text-white border-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.5)]',
    idleIconBg: 'bg-violet-500/15 text-violet-400 border border-violet-500/30 shadow-[0_0_8px_rgba(139,92,246,0.15)]',
    tagColor: 'text-violet-400',
    activeBorder: 'border-violet-500 shadow-violet-500/20',
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isTransitioningRef = React.useRef(false);

  // Sequential Step Transition Handler (ensures no skipping)
  const handleSequentialStepChange = (targetIndex: number) => {
    if (targetIndex === activeStep || targetIndex < 0 || targetIndex >= PROCESS_STEPS.length)
      return;

    // Direct 1-step move
    if (Math.abs(targetIndex - activeStep) === 1) {
      setActiveStep(targetIndex);
      return;
    }

    // Multi-step move: step sequentially through intermediate stages
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const direction = targetIndex > activeStep ? 1 : -1;
    let current = activeStep;

    const interval = setInterval(() => {
      current += direction;
      setActiveStep(current);
      if (current === targetIndex) {
        clearInterval(interval);
        isTransitioningRef.current = false;
      }
    }, 280);
  };

  // Scroll listener to update active step sequentially with RAF throttling
  React.useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;

    const updateScrollProgress = () => {
      if (!containerRef.current || isTransitioningRef.current) {
        ticking = false;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableHeight = rect.height - windowHeight;

      if (totalScrollableHeight > 0) {
        const currentScroll = -rect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / totalScrollableHeight));
        const targetStep = Math.min(
          PROCESS_STEPS.length - 1,
          Math.floor(progress * PROCESS_STEPS.length)
        );

        setActiveStep((prevStep) => {
          if (targetStep > prevStep) return prevStep + 1;
          if (targetStep < prevStep) return prevStep - 1;
          return prevStep;
        });
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const current = PROCESS_STEPS[activeStep];
  const IconComponent = current.icon;

  return (
    <section className="bg-surface py-16 lg:py-24 border-b border-border">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-start max-w-3xl mb-10 lg:mb-12">
          <Reveal delay={100}>
            <Badge variant="default" className="mb-4">
              THE NOVARCH SYSTEM
            </Badge>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text leading-tight mb-4">
              From idea <span className="text-blue">to working system.</span>
            </h2>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-base sm:text-lg text-white leading-relaxed">
              Technology becomes valuable when it moves real work forward. Progress sequentially through our 5 delivery stages.
            </p>
          </Reveal>
        </div>

        {/* Scroll Track Container with expanded height for smooth sequential scroll */}
        <div ref={containerRef} className="relative lg:h-[320vh]">
          {/* Sticky 2-Column Boxes Container */}
          <div className="lg:sticky lg:top-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: 5 Stage Selection Boxes */}
              <div className="lg:col-span-5 flex flex-col gap-3 lg:gap-0 lg:justify-between lg:h-full lg:-mt-2.5">
                {PROCESS_STEPS.map((item, idx) => {
                  const ItemIcon = item.icon;
                  const isActive = activeStep === idx;
                  const isCompleted = idx < activeStep;

                  return (
                    <button
                      key={item.step}
                      onClick={() => handleSequentialStepChange(idx)}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer relative group',
                        isActive
                          ? 'bg-navy-800 border-blue text-white shadow-xl shadow-navy/15 scale-[1.02] z-10'
                          : isCompleted
                          ? 'bg-surface-card border-border-2 text-text hover:border-blue'
                          : 'bg-surface-card border-border text-text hover:border-blue/50'
                      )}
                    >
                      {/* Step Icon & Status Badge */}
                      <div
                        className={cn(
                          'flex items-center justify-center h-9 w-9 rounded-lg flex-shrink-0 transition-all duration-200',
                          isActive
                            ? item.activeIconBg
                            : isCompleted
                            ? 'bg-blue-500/20 text-cyan border border-cyan/40 shadow-sm'
                            : item.idleIconBg
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-4.5 w-4.5 text-cyan" />
                        ) : (
                          <ItemIcon className="h-4.5 w-4.5" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span
                            className={cn(
                              'text-[10px] font-mono font-bold uppercase tracking-wider',
                              isActive
                                ? item.tagColor
                                : isCompleted
                                ? 'text-cyan-400'
                                : item.tagColor
                            )}
                          >
                            Stage {item.step}
                          </span>
                        </div>

                        <h3
                          className={cn(
                            'text-sm sm:text-base font-bold transition-colors leading-tight',
                            isActive ? 'text-white' : 'text-text group-hover:text-blue'
                          )}
                        >
                          {item.title}
                        </h3>

                        {isActive && (
                          <p className="text-xs leading-relaxed text-blue-light mt-1 animate-in fade-in duration-300">
                            {item.summary}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Active Stage Showcase Card */}
              <div className="lg:col-span-7 flex flex-col lg:-mt-2.5">
                <div className="flex-1 p-8 sm:p-10 rounded-2xl bg-navy-800 border border-navy-700 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between transition-all duration-300 min-h-[500px]">
                  {/* Dedicated 3D Stage Background Image */}
                  <div
                    key={`bg-${activeStep}`}
                    className="absolute inset-0 z-0 overflow-hidden transition-opacity duration-700 ease-in-out"
                  >
                    <Image
                      src={current.bgImage}
                      alt={current.title}
                      fill
                      priority
                      className="object-cover object-center transform transition-transform duration-1000 scale-105 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/75 to-navy-800/65 z-10" />
                  </div>

                  {/* Animated Stage Text Content Wrapper */}
                  <div
                    key={`content-${activeStep}`}
                    className="relative z-20 transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-3"
                  >
                    {/* Stage Header & Icon */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn(
                        "flex items-center justify-center h-12 w-12 rounded-xl border shadow-lg backdrop-blur-md",
                        current.activeIconBg
                      )}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <span className={cn("text-xs font-mono font-bold uppercase tracking-widest", current.tagColor)}>
                          STAGE {current.step} OF 05
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-md">
                          {current.title}
                        </h3>
                      </div>
                    </div>

                    {/* Summary Highlight */}
                    <p className="text-lg font-semibold text-blue-light leading-snug mb-4 drop-shadow-sm">
                      {current.summary}
                    </p>

                    {/* Detailed Description */}
                    <p className="text-sm sm:text-base text-white leading-relaxed mb-8 font-medium drop-shadow-sm">
                      {current.detail}
                    </p>
                  </div>

                    {/* Deliverables / Verification */}
                    <div className="pt-6 border-t border-navy-700/80">
                      <p className="text-xs font-mono font-bold uppercase tracking-wider text-cyan mb-3">
                        Stage Criteria & Verification:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {current.criteria.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 p-2.5 rounded-lg bg-navy/90 border border-navy-700 backdrop-blur-md shadow-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-cyan flex-shrink-0" />
                            <span className="text-xs font-semibold text-blue-light leading-tight">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
