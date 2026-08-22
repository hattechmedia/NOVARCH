'use client';

import * as React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';
import { ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { BRAND_PRINCIPLES } from '@/lib/constants';

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28 text-white">
      {/* Background accents */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
          <Reveal delay={100}>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-navy-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan mb-6">
              <ShieldCheck className="h-3.5 w-3.5" /> Direct Delivery Model
            </span>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              Build something your business can own.
            </h2>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-lg sm:text-xl text-white leading-relaxed mb-10 max-w-2xl">
              Clear scope. Visible responsibility. A system you can understand and own.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-12">
              <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button href="#services" variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/30 hover:border-cyan">
                Explore What We Offer
              </Button>
            </div>
          </Reveal>

          {/* Principle badges */}
          <Reveal delay={500}>
            <div className="pt-8 border-t border-navy-700 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
              {BRAND_PRINCIPLES.map((principle) => (
                <div key={principle} className="flex items-start gap-2.5 p-3 rounded bg-navy-800 border border-navy-700">
                  <KeyRound className="h-4 w-4 text-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-blue-light leading-snug font-medium">
                    {principle}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
