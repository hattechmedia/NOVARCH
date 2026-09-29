'use client';

import * as React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';
import { buildWithUsData } from '@/data/buildWithUs';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Terminal,
  Atom,
  Layers,
  SlidersHorizontal,
  Code2,
  ShieldCheck,
  KeyRound,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal,
  Atom,
  Layers,
  Sliders: SlidersHorizontal,
  Sparkles,
  Code2,
  ShieldCheck,
  KeyRound,
};

export function BuildWithUsSection() {
  const [activePillar, setActivePillar] = React.useState<string | null>(null);

  return (
    <section
      id="build-with-us"
      suppressHydrationWarning
      className="relative overflow-hidden bg-background py-20 lg:py-28 border-b border-border text-text"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-36 h-96 w-96 rounded-full bg-blue/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 -right-36 h-96 w-96 rounded-full bg-cyan/10 blur-3xl pointer-events-none"
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 lg:mb-18">
          <Reveal delay={100}>
            <Badge variant="default" className="mb-4">
              {buildWithUsData.eyebrow}
            </Badge>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text leading-tight mb-4">
              {buildWithUsData.heading}{' '}
              <span className="text-blue">{buildWithUsData.headingHighlight}</span>
            </h2>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl">
              {buildWithUsData.description}
            </p>
          </Reveal>
        </div>

        {/* ── 5 Archetype Square Cards (3 in Row 1, 2 in Row 2) ── */}
        <div
          suppressHydrationWarning
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 items-stretch mb-16 lg:mb-24"
        >
          {buildWithUsData.areas.map((area, index) => {
            const AreaIcon = ICON_MAP[area.icon] || Terminal;

            // Positioning: 3 cards in row 1 (cols 1-2, 3-4, 5-6), 2 cards centered in row 2 (cols 2-3, 4-5)
            const gridColumnClass =
              index === 3
                ? 'lg:col-start-2 lg:col-span-2 md:col-span-1'
                : index === 4
                ? 'lg:col-span-2 md:col-span-2 md:max-w-md md:mx-auto w-full lg:max-w-none'
                : 'lg:col-span-2 md:col-span-1';

            return (
              <motion.div
                key={area.id}
                layout
                transition={{
                  layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                }}
                className={cn(
                  'group relative rounded-2xl flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 cursor-pointer overflow-hidden select-none aspect-auto sm:aspect-square bg-surface-card border border-border hover:border-blue/60 hover:bg-surface-2 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue/10',
                  gridColumnClass
                )}
              >
                {/* Background Ambient Glow */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue/10 rounded-full blur-2xl group-hover:bg-blue/20 transition-all duration-500 pointer-events-none" />

                {/* Card Top: Number + Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-text-light/60 tracking-widest">
                    {area.num}
                  </span>
                  <div className="h-10 w-10 rounded-xl bg-blue-light/50 border border-blue/20 flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white group-hover:border-blue transition-all duration-300 shadow-sm">
                    <AreaIcon className="h-5 w-5" />
                  </div>
                </div>

                {/* Card Body: Title, Tagline & Short Description */}
                <div className="flex-1 flex flex-col justify-center my-1">
                  <h3 className="text-xl font-bold text-text mb-1 group-hover:text-blue transition-colors duration-200">
                    {area.title}
                  </h3>
                  <p className="text-xs font-mono font-medium text-cyan mb-3 leading-snug">
                    {area.tagline}
                  </p>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-3 mb-4">
                    {area.shortDesc || area.description}
                  </p>

                  {/* Focus Area Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {area.focusAreas.slice(0, 2).map((focus) => (
                      <div
                        key={focus}
                        className="flex items-center gap-1 text-[10px] font-mono text-text-light bg-surface px-2 py-0.5 rounded-md border border-border/80"
                      >
                        <CheckCircle2 className="h-2.5 w-2.5 text-blue flex-shrink-0" />
                        <span
                          className="truncate max-w-[170px]"
                          title={focus}
                        >
                          {focus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pillar Bottom / Action Button */}
                <div className="pt-2">
                  <Button
                    href={`/contact?service=advisory&archetype=${area.id}`}
                    variant="secondary"
                    size="sm"
                    className="w-full text-xs font-semibold group/btn"
                  >
                    <span>Collaborate</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ecosystem Pillars — How We Collaborate */}
        <div>
          <div className="mb-8 text-center sm:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-light block mb-2">
              HOW WE WORK TOGETHER
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-text tracking-tight">
              An ecosystem built for builders, not red tape.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {buildWithUsData.pillars.map((pillar) => {
              const PillarIcon = ICON_MAP[pillar.icon] || Code2;
              const isToggled = activePillar === pillar.title;

              return (
                <div
                  key={pillar.title}
                  onClick={() => setActivePillar(isToggled ? null : pillar.title)}
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-border/80 bg-surface-card hover:border-cyan/60 transition-all duration-500 shadow-md hover:shadow-cyan/10 hover:shadow-2xl hover:-translate-y-1 select-none cursor-pointer"
                >
                  {/* Default State: Thematic Render Image */}
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Resting Ambient Gradient & Title Badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080E18]/85 via-[#080E18]/25 to-transparent transition-opacity duration-300 group-hover:opacity-0 pointer-events-none" />

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-center justify-between transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2 pointer-events-none">
                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#080E18]/85 backdrop-blur-md border border-white/10 text-white shadow-lg">
                      <PillarIcon className="h-4 w-4 text-cyan flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold tracking-wide">{pillar.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan bg-cyan/10 border border-cyan/30 px-2 py-0.5 rounded-md">
                      Hover to view
                    </span>
                  </div>

                  {/* Hover / Toggled State: Glassmorphic Overlay with Text & Details */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-[#080E18]/92 backdrop-blur-md transition-all duration-300 flex flex-col items-center justify-center text-center p-6 sm:p-8 z-10',
                      isToggled
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'
                    )}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-light/30 text-cyan border border-cyan/30 mb-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <PillarIcon className="h-6 w-6" />
                    </div>

                    <h4 className="text-lg font-bold text-white mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {pillar.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-text-light leading-relaxed max-w-[250px] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Collaboration Invitation Card (Commented out)
        <div className="relative rounded-2xl bg-gradient-to-br from-navy-800 via-navy to-navy-800 border border-navy-700 p-8 sm:p-12 text-center flex flex-col items-center overflow-hidden shadow-xl mt-16">
          <div
            aria-hidden="true"
            className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-cyan/10 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue/10 blur-3xl pointer-events-none"
          />

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Open Ecosystem
          </span>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight mb-4 max-w-2xl">
            Have an idea, capability, or system you want to build alongside us?
          </h3>

          <p className="text-sm sm:text-base text-blue-light leading-relaxed max-w-2xl mb-8">
            {buildWithUsData.note}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
            <Button
              href={buildWithUsData.ctaHref}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <span>{buildWithUsData.ctaText}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>

            <Button
              href={buildWithUsData.secondaryCtaHref}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-white border-white/20 hover:border-cyan"
            >
              <span>{buildWithUsData.secondaryCtaText}</span>
            </Button>
          </div>

          <p className="text-xs text-[#7A8FA6] mt-6 max-w-lg">
            Direct founder-led technical alignment. No corporate recruitment filters, no endless gatekeeping.
          </p>
        </div>
        */}
      </Container>
    </section>
  );
}
