'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';
import { ServicesOrbitAnimation } from '@/components/animations/ServicesOrbitAnimation';
import { ConstellationBackground } from '@/components/animations/ConstellationBackground';
import { ArrowRight, Cpu, GitBranch, Globe, Code2 } from 'lucide-react';
import { HERO_SERVICES_STRIP } from '@/data/hero';

const HERO_ICON_MAP = {
  Cpu,
  GitBranch,
  Globe,
  Code2,
};

export function Hero() {
  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] flex flex-col justify-between pt-9 pb-10 lg:pt-11 lg:pb-12 overflow-hidden bg-[#030712] border-b border-border/30">
      {/* ── Dynamic Constellation, Glow & Particle Background ── */}
      <ConstellationBackground />

      <Container className="relative z-10 w-full flex flex-col justify-between flex-1">
        {/* Main Hero Copy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-4 sm:pt-5 lg:pt-6">
          {/* ── Left Column: Copy, Typography & CTA Capsules ── */}
          <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-4">
            {/* Top Badge */}
            <Reveal delay={100}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081222]/90 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider shadow-[0_0_12px_rgba(6,182,212,0.12)] mb-6 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee] animate-pulse" />
                <span>AI / SOFTWARE / DIGITAL SYSTEMS</span>
                <span className="w-8 h-px bg-gradient-to-r from-cyan-500/60 to-transparent ml-1" />
              </div>
            </Reveal>

            {/* Main Hero Heading */}
            <Reveal delay={200}>
              <h1 className="text-3xl sm:text-5xl lg:text-[66px] font-extrabold tracking-tight text-white leading-[1.08] mb-5 break-words">
                Build systems <br />
                <span className="text-[#258CF4] drop-shadow-[0_0_30px_rgba(37,140,244,0.35)]">
                  you own.
                </span>
              </h1>
            </Reveal>

            {/* Subtitle / Paragraph */}
            <Reveal delay={300}>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl font-normal">
                NOVARCH designs and builds AI, software and digital systems that help businesses sell, operate and grow — with human control and data ownership built in.
              </p>
            </Reveal>

            {/* CTA Buttons using standard Button component with ripple hover */}
            <Reveal delay={400}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Button href="#services" variant="primary" size="lg">
                  Explore What We Offer
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Start a Project
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: 3D Holographic Orbit Animation ── */}
          <div className="lg:col-span-6 flex items-center justify-center w-full">
            <Reveal delay={250} className="w-full flex items-center justify-center">
              <ServicesOrbitAnimation />
            </Reveal>
          </div>
        </div>

        {/* ── 4-Service Cards Strip Aligned at Lower Edge (Image 2) ── */}
        <Reveal delay={550} className="mt-12 sm:mt-14 lg:mt-16 relative z-20">
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HERO_SERVICES_STRIP.map((card) => {
                const IconComponent = HERO_ICON_MAP[card.iconName] || Cpu;
                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    className={`group flex flex-col justify-between p-4 rounded-xl bg-[#060D1A]/85 backdrop-blur-md border border-white/10 shadow-md ${card.borderHover} hover:bg-[#091529] hover:shadow-lg transition-all duration-200`}
                  >
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${card.iconBg} flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className={`text-sm font-bold text-white ${card.accentHover} transition-colors leading-snug`}>
                          {card.title}
                        </h3>
                        <p className="text-xs text-slate-300 leading-normal mt-1">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-center gap-1 text-xs font-semibold ${card.linkHover} pt-2 group-hover:translate-x-1 transition-transform duration-150`}>
                      <span>Learn More</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default Hero;
