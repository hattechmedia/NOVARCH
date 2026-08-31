'use client';

import * as React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/animations/Reveal';
import { JOURNEY } from '@/data/founders';
import type { FounderJourneyStep } from '@/types/founder';

const DNAanimation = dynamic(
  () => import('@/components/animations/DNAanimation').then((m) => m.DNAanimation),
  { ssr: false }
);

const OPPOSITE_CONTEXT: Record<
  string,
  { badgeLabel: string; phaseTitle: string; tag: string; summary: string }
> = {
  '01': {
    badgeLabel: 'ARCHIVE',
    phaseTitle: 'Early Curiosity',
    tag: 'ORIGIN',
    summary:
      'Hands-on early familiarity with technology — curiosity that persisted into professional software architecture.',
  },
  '02': {
    badgeLabel: 'PHASE 02',
    phaseTitle: 'Commercial Translation',
    tag: 'FROM 2021',
    summary:
      'Sustained client-facing, commercial learning: understanding buyer context, explaining digital capability, and moving prospects toward real sales conversations.',
  },
  '03': {
    badgeLabel: 'PHASE 03',
    phaseTitle: 'Operations Exposure',
    tag: 'FROM DEC 2024',
    summary:
      'Multi-marketplace store operations, inventory reconciliation, order routing, fulfillment SLAs across Amazon, Shopify, Walmart, TikTok Shop, eBay, and Etsy.',
  },
  '04': {
    badgeLabel: 'PHASE 04',
    phaseTitle: 'Solo Product Building',
    tag: 'FROM APR 2026',
    summary:
      'The founder-built full-stack system bridging strategy and software: capture inquiry, qualify, assign ownership, maintain follow-up discipline, and keep the pipeline visible.',
  },
  '05': {
    badgeLabel: 'CORE THESIS',
    phaseTitle: 'The Systems Company',
    tag: 'PRESENT',
    summary:
      'Built on one thesis: systems people can understand, operate, and own. Technology should increase human agency, not create opaque dependency.',
  },
};

interface MilestoneRowProps {
  step: FounderJourneyStep;
  idx: number;
  isLast: boolean;
}

function MilestoneRow({ step, idx, isLast }: MilestoneRowProps) {
  const rowRef = React.useRef<HTMLDivElement>(null);
  const isEven = idx % 2 === 0;
  const context = OPPOSITE_CONTEXT[step.step];

  // Track this row's position relative to viewport (same as VentureProofGrid)
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 95%', 'end 5%'],
  });

  // Slides in at 10-35%, stays 35-65%, slides out 65-90%
  const leftX = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [-80, 0, 0, -80]);
  const leftOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [80, 0, 0, 80]);
  const rightOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0]);

  // Last row: always fully visible — no animation, no opacity applied
  const LeftWrapper = isLast
    ? ({ children }: { children: React.ReactNode }) => (
        <div className="lg:col-span-5 w-full">{children}</div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <motion.div className="lg:col-span-5 w-full" style={{ x: leftX, opacity: leftOpacity }}>
          {children}
        </motion.div>
      );

  const RightWrapper = isLast
    ? ({ children }: { children: React.ReactNode }) => (
        <div className="lg:col-span-5 w-full">{children}</div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <motion.div className="lg:col-span-5 w-full" style={{ x: rightX, opacity: rightOpacity }}>
          {children}
        </motion.div>
      );

  return (
    <div
      ref={rowRef}
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[160px]"
    >
      {/* ── Left Column ── */}
      <LeftWrapper>
        {isEven ? (
          <div className="group relative p-6 sm:p-7 rounded-2xl bg-surface-card border border-border hover:border-blue hover:shadow-xl hover:shadow-blue/10 transition-all duration-300 backdrop-blur-sm text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-blue bg-blue/10 px-3 py-1 rounded-full border border-blue/20">
                MILESTONE {step.step}
              </span>
              <span className="text-[10px] font-mono text-text-light uppercase tracking-wider">
                {step.year ?? step.phase}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-text mb-2.5 group-hover:text-blue transition-colors leading-snug">
              {step.title}
            </h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              {step.description}
            </p>
          </div>
        ) : (
          context && (
            <div className="group relative p-6 sm:p-7 rounded-2xl bg-surface-card border border-border hover:border-blue hover:shadow-xl hover:shadow-blue/10 transition-all duration-300 backdrop-blur-sm text-left">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-blue bg-blue/10 px-3 py-1 rounded-full border border-blue/20">
                  {context.badgeLabel}
                </span>
                <span className="text-[10px] font-mono text-text-light uppercase tracking-wider">
                  {context.tag}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-text mb-2.5 group-hover:text-blue transition-colors leading-snug">
                {context.phaseTitle}
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {context.summary}
              </p>
            </div>
          )
        )}
      </LeftWrapper>

      {/* ── Center Spacer (DNA Helix) ── */}
      <div className="hidden lg:flex lg:col-span-2 pointer-events-none" />

      {/* ── Right Column ── */}
      <RightWrapper>
        {isEven ? (
          step.image ? (
            <div className="group relative p-5 rounded-2xl bg-surface-card border border-border hover:border-cyan hover:shadow-xl hover:shadow-cyan/10 transition-all duration-300 backdrop-blur-sm text-left">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-border/80 bg-surface-2 shadow-inner">
                <Image
                  src={step.image}
                  alt="Childhood computer - authentic origin archive"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent pointer-events-none" />
              </div>
              <p className="mt-3 text-xs font-mono text-text-muted leading-relaxed">
                Hands-on early familiarity with technology — curiosity that persisted into professional software architecture.
              </p>
            </div>
          ) : (
            context && (
              <div className="group relative p-6 sm:p-7 rounded-2xl bg-surface-card border border-border hover:border-cyan hover:shadow-xl hover:shadow-cyan/10 transition-all duration-300 backdrop-blur-sm text-left">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-cyan bg-cyan/10 px-3 py-1 rounded-full border border-cyan/30">
                    {context.badgeLabel}
                  </span>
                  <span className="text-[10px] font-mono text-text-light uppercase tracking-wider">
                    {context.tag}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-text mb-2.5 group-hover:text-cyan transition-colors leading-snug">
                  {context.phaseTitle}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {context.summary}
                </p>
              </div>
            )
          )
        ) : (
          <div className="group relative p-6 sm:p-7 rounded-2xl bg-surface-card border border-border hover:border-cyan hover:shadow-xl hover:shadow-cyan/10 transition-all duration-300 backdrop-blur-sm text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-cyan bg-cyan/10 px-3 py-1 rounded-full border border-cyan/30">
                MILESTONE {step.step}
              </span>
              <span className="text-[10px] font-mono text-text-light uppercase tracking-wider">
                {step.year ?? step.phase}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-text mb-2.5 group-hover:text-cyan transition-colors leading-snug">
              {step.title}
            </h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              {step.description}
            </p>
          </div>
        )}
      </RightWrapper>
    </div>
  );
}

export function FounderJourneyTimeline() {
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const [dnaHeight, setDnaHeight] = React.useState(1400);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 70%'],
  });

  React.useEffect(() => {
    if (!timelineRef.current) return;
    const update = () => {
      if (timelineRef.current) setDnaHeight(timelineRef.current.offsetHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(timelineRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue/5 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Reveal delay={100}>
            <Badge variant="default" className="mb-3 shadow-sm">
              THE PATH TO NOVARCH
            </Badge>
          </Reveal>
          <Reveal delay={200}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight mb-4 text-pretty">
              Early curiosity, commercial learning and operations exposure —{' '}
              <span className="text-blue">before the systems company.</span>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-base text-text-muted max-w-xl mx-auto leading-relaxed">
              Five pivotal developmental milestones bridging authentic curiosity, operational scale, and founder-built software architecture.
            </p>
          </Reveal>
        </div>

        {/* Timeline rows */}
        <div ref={timelineRef} className="relative">
          {/* DNA Helix */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none z-10">
            <DNAanimation scrollYProgress={scrollYProgress} height={dnaHeight} />
          </div>

          <div className="relative space-y-20 lg:space-y-32">
            {JOURNEY.map((step, idx) => (
              <MilestoneRow
                key={step.step}
                step={step}
                idx={idx}
                isLast={idx === JOURNEY.length - 1}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
