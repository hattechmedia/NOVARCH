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
      'We build systems you can operate, audit and transfer. You own your code, databases, credentials, and documentation without forced vendor lock-in.',
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 lg:py-20 text-text">
      {/* Hero Header */}
      <Container className="mb-16 lg:mb-24">
        <div className="max-w-4xl">
          <Reveal delay={100}>
            <Badge variant="default" className="mb-4">
              COMPANY NARRATIVE & ORIGIN
            </Badge>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-[1.15] mb-8">
              Pakistan revealed the potential.{' '}
              <span className="text-blue">Germany reinforced the discipline.</span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-lg sm:text-xl text-text-muted leading-relaxed mb-6">
              NOVARCH brings entrepreneurial speed together with precision, privacy, documentation and dependable execution.
            </p>
            <p className="text-base text-text-muted leading-relaxed">
              NOVARCH begins in Ilmenau, works across local and international markets and grows through real customer systems, proof and reusable capability.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* Operating Philosophy Section */}
      <section className="py-16 bg-surface-2/40 border-y border-border">
        <Container>
          <div className="max-w-3xl mb-12">
            <Badge variant="default" className="mb-3">
              THE NOVARCH APPROACH
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-text tracking-tight">
              Systems built with control, not <span className="text-blue">dependencies.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COMPANY_PILLARS.map((pillar, idx) => (
              <Reveal key={pillar.title} delay={150 + idx * 100}>
                <Card className="h-full bg-surface-card border-border">
                  <span className="text-xs font-mono font-bold text-blue mb-2 block">
                    0{idx + 1} / PRINCIPLE
                  </span>
                  <h3 className="text-xl font-bold text-text mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Data & Ownership Principles Section */}
      <section className="py-20">
        <Container>
          <div className="rounded-2xl border border-border bg-surface-card p-8 lg:p-12 text-text shadow-2xl">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan mb-3 block">
                DATA & OPERATIONAL GUARANTEES
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
                What we promise on every delivery.
              </h2>
              <p className="text-sm sm:text-base text-text-muted">
                We maintain clear boundaries so you retain full sovereignty over your operational assets.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {BRAND_PRINCIPLES.map((principle, idx) => (
                <div key={principle} className="p-5 rounded-xl bg-surface-2 border border-border">
                  <span className="text-xs font-mono text-cyan block mb-2 font-bold">
                    0{idx + 1}
                  </span>
                  <p className="text-sm font-semibold text-text leading-snug">
                    {principle}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-xs text-text-light">
                <Globe2 className="h-4 w-4 text-cyan" />
                <span>Headquartered in Ilmenau, Thuringia, Germany</span>
              </div>
              <Button href="/contact" variant="primary" size="md">
                Talk to NOVARCH
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
