import Image from 'next/image';
import { generateMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';
import {
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  FOUNDER,
  ORIGIN_STORY,
  VENTURE_PROOF,
  OPERATING_SEQUENCE,
  FOUNDER_PRINCIPLES,
  FOUNDER_PROMISE,
} from '@/data/founders';
import { FounderJourneyTimeline } from '@/components/sections/FounderJourneyTimeline';
import { VentureProofGrid } from '@/components/sections/VentureProofGrid';
import { OperatingBlueprint } from '@/components/sections/OperatingBlueprint';
import { FounderPrinciples } from '@/components/sections/FounderPrinciples';

export const metadata = generateMetadata({
  title: 'Our Founder',
  description:
    'The story behind NOVARCH — from early curiosity with computers to a founder-built systems company built on ownership, not dependency.',
  path: '/founders',
});

export default function FoundersPage() {
  return (
    <div className="pt-4 lg:pt-6 pb-12 lg:pb-20 text-text overflow-hidden">
      {/* ─── Hero Section ────────────────────────────────────────────────── */}
      <section className="relative mb-24 lg:mb-32">
        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="absolute -top-24 right-1/4 -z-10 h-[450px] w-[450px] rounded-full bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none"
        />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Headline & Manifesto */}
            <div className="lg:col-span-7 flex flex-col items-start -mt-2 lg:-mt-4">
              <Reveal delay={100}>
                <Badge variant="default" className="mb-5 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  OUR FOUNDER
                </Badge>
              </Reveal>

              <Reveal delay={200}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-[1.12] mb-6 text-pretty">
                  Founder-led.{' '}
                  <span className="bg-gradient-to-r from-blue to-cyan bg-clip-text text-transparent">
                    Not a personality cult.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={300}>
                <p className="text-lg sm:text-xl text-white leading-relaxed mb-4 max-w-2xl">
                  NOVARCH is built on one thesis: technology should increase human agency, not
                  create opaque dependency. That thesis was not written in a workshop — it was
                  learned, venture by venture.
                </p>
                <p className="text-base text-text-muted leading-relaxed mb-8 max-w-xl">
                  Ambitious but evidence-based. Technical but human. Internationally shaped,
                  without stereotypes.
                </p>
              </Reveal>

              <Reveal delay={400}>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-card border border-border shadow-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue/15 text-blue flex-shrink-0">
                      <ShieldCheck className="h-4 w-4 text-cyan" />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-wider text-text-light">
                        Core Working Thesis
                      </p>
                      <p className="text-sm font-semibold text-text">
                        &ldquo;{FOUNDER.mantra}&rdquo;
                      </p>
                    </div>
                  </div>

                  <Button href="/contact" variant="primary" size="md">
                    Talk to NOVARCH
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Right: Founder Portrait Card */}
            <div className="lg:col-span-5 flex justify-center">
              <Reveal delay={250} className="w-full max-w-[340px] sm:max-w-[360px]">
                <div className="relative group">
                  {/* Decorative background border glow */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-blue/40 via-cyan/20 to-transparent blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-border bg-gradient-to-b from-[#162740] via-[#0D1829] to-[#070D18] shadow-2xl shadow-navy/30">
                    <Image
                      src={FOUNDER.portrait}
                      alt={FOUNDER.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 80vw, 420px"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-transparent to-transparent pointer-events-none" />

                    {/* Badge on Image */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/80 backdrop-blur-md text-[11px] font-mono font-semibold text-white border border-white/10 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                        Founder & Builder
                      </span>
                    </div>

                    {/* Bottom Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-bold text-xl leading-tight">{FOUNDER.name}</p>
                          <p className="text-cyan text-sm font-medium mt-0.5">{FOUNDER.role}</p>
                        </div>
                        <span className="text-xs font-mono text-text-light px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/10 text-white">
                          Ilmenau, Germany
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Brand Origin Story ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-surface-2/40 border-y border-border relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Framed Hand-drawn Artifact */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <Reveal delay={100}>
                <div className="relative rounded-2xl overflow-hidden border border-border bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] p-5 shadow-2xl shadow-navy/20">
                  {/* Artifact Header Strip */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono text-text-light">
                    <span className="flex items-center gap-2 text-cyan">
                      <span className="h-2 w-2 rounded-full bg-cyan" />
                      ORIGINAL PROVENANCE ARTIFACT
                    </span>
                    <span className="text-text-muted">TU Ilmenau Library · 2026</span>
                  </div>

                  {/* Image Display */}
                  <div className="relative rounded-xl overflow-hidden bg-white/95 p-3 shadow-inner">
                    <Image
                      src={ORIGIN_STORY.image}
                      alt="Original hand-drawn NOVARCH mark sketched at TU Ilmenau library by Sameer"
                      width={1408}
                      height={736}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>

                  {/* Footnote */}
                  <p className="mt-3 text-[11px] font-mono text-text-light text-center">
                    Original sketch by Sameer after first concept dialogue. Human provenance, not marketing mythology.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right: Origin Narrative */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <Reveal delay={150}>
                <Badge variant="light" className="mb-4">
                  {ORIGIN_STORY.eyebrow}
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight mb-6 text-pretty">
                  {ORIGIN_STORY.title}
                </h2>
              </Reveal>

              <div className="space-y-4">
                {ORIGIN_STORY.paragraphs.map((p, idx) => (
                  <Reveal key={p} delay={200 + idx * 100}>
                    <div className="p-4 rounded-xl bg-surface-card border border-border/80 hover:border-blue/30 transition-colors">
                      <p className="text-base text-white leading-relaxed">{p}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Path to NOVARCH: Journey Timeline ───────────────────────────── */}
      <FounderJourneyTimeline />

      {/* ─── Venture Proof ──────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-surface-2/40 border-y border-border">
        <Container>
          <div className="max-w-3xl mb-14">
            <Reveal delay={100}>
              <Badge variant="light" className="mb-3">
                SYSTEMS BUILT ALONG THE WAY
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight text-pretty">
                Every lesson came from a real venture.
              </h2>
              <p className="mt-3 text-base text-text-muted max-w-2xl">
                Real operations, multi-marketplace architectures, and founder-engineered software codebases.
              </p>
            </Reveal>
          </div>

          <VentureProofGrid ventures={VENTURE_PROOF} />

        </Container>
      </section>

      {/* ─── The 6-Step Operating Blueprint ─────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="max-w-3xl mb-16">
            <Reveal delay={100}>
              <Badge variant="default" className="mb-3">
                SYSTEM BLUEPRINT
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight text-pretty">
                How every NOVARCH system is architected.
              </h2>
              <p className="mt-3 text-base text-white max-w-2xl">
                Automation should eliminate manual drag, while sensitive decisions retain explicit, visible human responsibility.
              </p>
            </Reveal>
          </div>

          <OperatingBlueprint sequence={OPERATING_SEQUENCE} />
        </Container>
      </section>

      {/* ─── Founder Philosophy & Principles ───────────────────────────── */}
      <FounderPrinciples principles={FOUNDER_PRINCIPLES} promise={FOUNDER_PROMISE} />
    </div>
  );
}
