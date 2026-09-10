'use client';

import Image from 'next/image';
import { Reveal } from '@/components/animations/Reveal';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { COFOUNDER } from '@/data/founders';
import { useInView } from '@/hooks/useInView';

/* ──────────────────────────────────────────────────────────────────────────────
   CofounderSection – premium, animated section for Melissa Pia Mehrle
   ──────────────────────────────────────────────────────────────────────────── */

function PillarCard({
  label,
  desc,
  index,
}: {
  label: string;
  desc: string;
  index: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`
        group relative flex flex-col gap-2 p-5 rounded-xl
        bg-surface-card/80 backdrop-blur-sm
        border border-border/60
        transition-all duration-500 ease-out
        hover:border-cyan/40 hover:shadow-lg hover:shadow-cyan/5
        hover:-translate-y-1
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
      `}
      style={{
        transitionDelay: inView ? `${300 + index * 120}ms` : '0ms',
      }}
    >
      {/* Accent top line */}
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <span className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan">
        {label}
      </span>
      <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
    </div>
  );
}

export function CofounderSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* ── Ambient Glow ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-cyan/10 via-blue/5 to-transparent blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-tl from-blue/8 via-transparent to-transparent blur-3xl pointer-events-none"
      />

      <Container>
        {/* ── Section Header ── */}
        <div className="mb-14 lg:mb-18">
          <Reveal delay={50}>
            <Badge variant="default" className="mb-4">
              CO-FOUNDER
            </Badge>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight text-pretty max-w-2xl">
              Operations.{' '}
              <span className="bg-gradient-to-r from-cyan to-blue bg-clip-text text-transparent">
                People. Systems.
              </span>
            </h2>
          </Reveal>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ── Portrait Card ── */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <Reveal delay={150} className="w-full max-w-[290px] sm:max-w-[310px]">
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-cyan/30 via-blue/15 to-transparent blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-border bg-gradient-to-b from-[#162740] via-[#0D1829] to-[#070D18] shadow-2xl shadow-navy/30">
                  <Image
                    src={COFOUNDER.portrait}
                    alt={COFOUNDER.name}
                    fill
                    sizes="(max-width: 1024px) 70vw, 320px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent pointer-events-none" />

                  {/* Top badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-navy/80 backdrop-blur-md text-[10px] font-mono font-semibold text-white border border-white/10 shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                      Co-founder
                    </span>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-bold text-lg leading-tight">
                      {COFOUNDER.name}
                    </p>
                    <p className="text-cyan text-xs font-medium mt-0.5">
                      {COFOUNDER.role}
                    </p>
                    <span className="inline-block mt-1.5 text-[10px] font-mono text-white/70 px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-sm border border-white/10">
                      {COFOUNDER.location}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Text + Pillars ── */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Bio paragraphs */}
            <div className="space-y-5">
              <Reveal delay={200}>
                <p className="text-base sm:text-lg text-white leading-relaxed max-w-2xl">
                  {COFOUNDER.bio}
                </p>
              </Reveal>
              <Reveal delay={280}>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl">
                  {COFOUNDER.philosophy}
                </p>
              </Reveal>
            </div>

            {/* Decorative divider */}
            <Reveal delay={320}>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-border/80 via-cyan/20 to-transparent" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-light">
                  Key Focus Areas
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-border/80 via-cyan/20 to-transparent" />
              </div>
            </Reveal>

            {/* Pillar cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {COFOUNDER.pillars.map((pillar, i) => (
                <PillarCard
                  key={pillar.label}
                  label={pillar.label}
                  desc={pillar.desc}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
