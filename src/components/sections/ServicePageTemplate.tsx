'use client';

import * as React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';
import { Service } from '@/types/service';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, Clock, FileText, AlertTriangle, Target } from 'lucide-react';

import { useScroll } from 'framer-motion';
import { DigitalLaunchFlowAnimation } from '@/components/animations/DigitalLaunchFlowAnimation';
import { AutomationIntegrationAnimation } from '@/components/animations/AutomationIntegrationAnimation';
import { CustomSoftwareAnimation } from '@/components/animations/CustomSoftwareAnimation';
import { DNAanimation } from '@/components/animations/DNAanimation';

interface ServicePageTemplateProps {
  service: Service;
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 70%'],
  });
  const dnaHeight = Math.max(800, service.scope.length * 170);

  return (
    <div className="py-12 lg:py-20">
      {/* 1. Hero */}
      <Container className="mb-16 lg:mb-24">
        {service.slug === 'digital-launch' || service.slug === 'automation-integration' || service.slug === 'custom-software' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Text & Metrics */}
            <div className="lg:col-span-5 flex flex-col justify-start pt-6 lg:-mt-[2%]">
              <Reveal delay={100}>
                <Badge variant="default" className="mb-4">
                  {service.tagline}
                </Badge>
              </Reveal>

              <Reveal delay={200}>
                {(() => {
                  const words = service.description.split(' ');
                  const halfIndex = Math.ceil(words.length / 2);
                  const firstHalf = words.slice(0, halfIndex).join(' ');
                  const secondHalf = words.slice(halfIndex).join(' ');
                  return (
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text leading-[1.1] mb-6">
                      {firstHalf} <span className="text-blue">{secondHalf}</span>
                    </h1>
                  );
                })()}
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-col gap-3 mb-8 text-sm text-text-muted">
                  <div className="flex items-center gap-2.5 font-semibold bg-surface-card border border-border px-4 py-2.5 rounded-lg shadow-sm">
                    <FileText className="h-4 w-4 text-blue" />
                    Paid Entry: {service.paidEntry.name} — €{service.paidEntry.price}
                  </div>
                  <div className="flex items-center gap-2.5 font-semibold bg-surface-card border border-border px-4 py-2.5 rounded-lg shadow-sm">
                    <ShieldCheck className="h-4 w-4 text-cyan" />
                    Implementation: From €{service.implementation.from.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2.5 font-semibold bg-surface-card border border-border px-4 py-2.5 rounded-lg shadow-sm">
                    <Clock className="h-4 w-4 text-blue" />
                    Timeline: {service.timeline}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="pt-2">
                  <Button href="/contact" size="lg" className="w-full sm:w-auto font-bold shadow-lg shadow-blue/20">
                    Get {service.paidEntry.name} (€{service.paidEntry.price})
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Dynamic Animation */}
            <div className="lg:col-span-7 w-full">
              <Reveal delay={250}>
                {service.slug === 'digital-launch' ? (
                  <DigitalLaunchFlowAnimation />
                ) : service.slug === 'automation-integration' ? (
                  <AutomationIntegrationAnimation />
                ) : (
                  <CustomSoftwareAnimation />
                )}
              </Reveal>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl">
            <Reveal delay={100}>
              <Badge variant="default" className="mb-4">
                {service.tagline}
              </Badge>
            </Reveal>

            <Reveal delay={200}>
              {(() => {
                const words = service.description.split(' ');
                const halfIndex = Math.ceil(words.length / 2);
                const firstHalf = words.slice(0, halfIndex).join(' ');
                const secondHalf = words.slice(halfIndex).join(' ');
                return (
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-[1.1] mb-6">
                    {firstHalf} <span className="text-blue">{secondHalf}</span>
                  </h1>
                );
              })()}
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-text-muted">
                <div className="flex items-center gap-2 font-semibold bg-surface-card border border-border px-4 py-2 rounded-sm">
                  <FileText className="h-4 w-4 text-blue" />
                  Paid Entry: {service.paidEntry.name} — €{service.paidEntry.price}
                </div>
                <div className="flex items-center gap-2 font-semibold bg-surface-card border border-border px-4 py-2 rounded-sm">
                  <ShieldCheck className="h-4 w-4 text-cyan" />
                  Implementation: From €{service.implementation.from.toLocaleString()}
                </div>
                <div className="flex items-center gap-2 font-semibold bg-surface-card border border-border px-4 py-2 rounded-sm">
                  <Clock className="h-4 w-4 text-blue" />
                  Timeline: {service.timeline}
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </Container>

      {/* 2. Business Problem & 3. Who it is for */}
      <section className="py-20 bg-surface-card border-y border-border relative overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-80 h-80 bg-blue/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Left Card: Common Operational Problems */}
            <Reveal delay={150} className="h-full">
              <div className="h-full rounded-2xl p-6 sm:p-8 bg-surface/50 border border-border/80 shadow-md shadow-navy/5 flex flex-col justify-between hover:border-red-500/30 transition-all duration-300 backdrop-blur-sm">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-red-500/10 text-red-400 border border-red-500/20">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                      THE OPERATIONAL PROBLEM
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3 tracking-tight">
                    What stops teams from moving forward
                  </h2>
                  <p className="text-sm text-text-muted mb-8 leading-relaxed">
                    Recurring bottlenecks caused by off-the-shelf software, manual workarounds, and fragmented tools.
                  </p>

                  <div className="space-y-3.5">
                    {service.problems.map((prob, idx) => (
                      <div
                        key={prob}
                        className="group flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-surface-card border border-border/70 hover:border-red-500/40 hover:bg-surface-card/90 transition-all duration-200 shadow-sm"
                      >
                        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-200">
                          <XCircle className="h-4.5 w-4.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-mono font-bold text-red-400/80 mb-0.5 block">
                            BOTTLENECK 0{idx + 1}
                          </span>
                          <p className="text-sm text-text font-medium leading-relaxed group-hover:text-text transition-colors">
                            {prob}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Card: Buyer Fit & Solution Readiness */}
            <Reveal delay={250} className="h-full">
              <div className="h-full rounded-2xl p-6 sm:p-8 bg-surface/50 border border-border/80 shadow-md shadow-navy/5 flex flex-col justify-between hover:border-cyan/40 transition-all duration-300 backdrop-blur-sm">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-blue/10 text-cyan border border-cyan/30">
                      <Target className="h-3.5 w-3.5 text-cyan" />
                      WHO THIS IS FOR
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3 tracking-tight">
                    Ideal buyer & organizational fit
                  </h2>
                  <p className="text-sm text-text-muted mb-8 leading-relaxed">
                    Built for teams and operations requiring bespoke business logic, automated handoffs, and full control.
                  </p>

                  <div className="space-y-3.5">
                    {service.buyerFit.map((fit, idx) => (
                      <div
                        key={fit}
                        className="group flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-surface-card border border-border/70 hover:border-cyan/50 hover:bg-surface-card/90 transition-all duration-200 shadow-sm"
                      >
                        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue/10 text-cyan border border-cyan/30 flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-200">
                          <CheckCircle2 className="h-4.5 w-4.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-mono font-bold text-cyan mb-0.5 block">
                            FIT CRITERIA 0{idx + 1}
                          </span>
                          <p className="text-sm text-text font-medium leading-relaxed group-hover:text-text transition-colors">
                            {fit}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 4. What NOVARCH builds & 5. Scope */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue/5 rounded-full blur-3xl pointer-events-none" />

        <Container>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal delay={100}>
              <Badge variant="default" className="mb-3 shadow-sm">
                SYSTEM SCOPE & ARCHITECTURE
              </Badge>
            </Reveal>
            <Reveal delay={200}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight mb-4">
                What NOVARCH builds during implementation.
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="text-base text-text-muted max-w-xl mx-auto leading-relaxed">
                End-to-end architecture pipeline delivered through structured, modular development milestones.
              </p>
            </Reveal>
          </div>

          {/* Alternating DNA Timeline Container */}
          <div ref={timelineRef} className="relative">
            {/* Center DNA Helix Animation (Desktop) */}
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-0 bottom-0 items-center justify-center pointer-events-none z-10">
              <DNAanimation scrollYProgress={scrollYProgress} height={dnaHeight} />
            </div>

            {/* Alternating Scope Module Cards */}
            <div className="relative space-y-10 lg:space-y-6">
              {service.scope.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={item.title}
                    className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[150px]"
                  >
                    {/* Left Column (Even items on Left) */}
                    <div className={`lg:col-span-5 ${isEven ? 'block' : 'hidden lg:block lg:invisible'}`}>
                      {isEven && (
                        <Reveal delay={100 + (idx % 4) * 60} className="w-full">
                          <div className="group relative p-6 sm:p-7 rounded-2xl bg-surface-card border border-border hover:border-blue hover:shadow-xl hover:shadow-blue/10 transition-all duration-300 backdrop-blur-sm text-left">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-mono font-bold text-blue bg-blue/10 px-3 py-1 rounded-full border border-blue/20">
                                MODULE 0{idx + 1}
                              </span>
                              <span className="text-[10px] font-mono text-text-light uppercase tracking-wider">
                                SPEC 0{idx + 1}
                              </span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-text mb-2.5 group-hover:text-blue transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </Reveal>
                      )}
                    </div>

                    {/* Center Spacer Column (Width reserved for DNA Helix) */}
                    <div className="hidden lg:flex lg:col-span-2 items-center justify-center pointer-events-none" />

                    {/* Right Column (Odd items on Right) */}
                    <div className={`lg:col-span-5 ${!isEven ? 'block' : 'hidden lg:block lg:invisible'}`}>
                      {!isEven && (
                        <Reveal delay={100 + (idx % 4) * 60} className="w-full">
                          <div className="group relative p-6 sm:p-7 rounded-2xl bg-surface-card border border-border hover:border-cyan hover:shadow-xl hover:shadow-cyan/10 transition-all duration-300 backdrop-blur-sm text-left">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-mono font-bold text-cyan bg-cyan/10 px-3 py-1 rounded-full border border-cyan/30">
                                MODULE 0{idx + 1}
                              </span>
                              <span className="text-[10px] font-mono text-text-light uppercase tracking-wider">
                                SPEC 0{idx + 1}
                              </span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-text mb-2.5 group-hover:text-cyan transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </Reveal>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 6. How engagement works & 7. Paid first step */}
      <section className="py-16 bg-navy-800 text-white border-y border-navy-700">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Paid First Step Highlight */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-sm bg-navy border border-cyan/40 shadow-xl relative overflow-hidden">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan mb-3 block">
                  STEP 01 — REQUIRED ENTRY
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {service.paidEntry.name}
                </h3>
                <p className="text-3xl font-bold text-cyan mb-4">
                  €{service.paidEntry.price}
                </p>
                <p className="text-xs sm:text-sm text-blue-light leading-relaxed mb-6">
                  Every NOVARCH engagement starts with a fixed-price Blueprint sprint to audit constraints, specify data schemas, and validate economic ROI before full build commitments.
                </p>
                <Button href="/contact" variant="primary" size="md" className="w-full bg-blue hover:bg-blue-600">
                  Start With {service.paidEntry.name}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Process Steps */}
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-light mb-3 block">
                ENGAGEMENT PATHWAY
              </span>
              <h2 className="text-3xl font-bold text-white mb-6">
                From Blueprint to live operation.
              </h2>
              <div className="space-y-4">
                {service.engagementSteps.map((step, idx) => (
                  <div key={step} className="flex items-start gap-4 p-4 rounded bg-navy/60 border border-navy-700">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue text-xs font-bold text-white flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-blue-light leading-normal font-medium">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 9. Exclusions & 10. Deliverables */}
      <section className="py-20 bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Deliverables */}
            <Card className="p-8 bg-surface-card border-border">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue mb-2 block">
                CONCRETE OUTPUTS
              </span>
              <h3 className="text-2xl font-bold text-text mb-6">
                Deliverables included
              </h3>
              <ul className="space-y-3">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text font-medium">
                    <CheckCircle2 className="h-4 w-4 text-blue flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Exclusions */}
            <Card className="p-8 bg-surface-card border-border">
              <span className="text-xs font-semibold uppercase tracking-widest text-text-light mb-2 block">
                SCOPE BOUNDARIES
              </span>
              <h3 className="text-2xl font-bold text-text mb-6">
                What is not included
              </h3>
              <ul className="space-y-3">
                {service.exclusions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
                    <XCircle className="h-4 w-4 text-text-light flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* 11. CTA */}
      <section className="bg-navy py-16 text-white text-center">
        <Container size="md">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to deploy your {service.name} System?
          </h2>
          <p className="text-base text-blue-light mb-8 max-w-lg mx-auto">
            Start with the {service.paidEntry.name} (€{service.paidEntry.price}). Clear scope, zero vendor lock-in.
          </p>
          <Button href="/contact" variant="primary" size="lg" className="bg-blue hover:bg-blue-600">
            Start a Project <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Container>
      </section>
    </div>
  );
}
