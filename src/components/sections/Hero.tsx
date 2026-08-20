'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/animations/Reveal';
import { ServicesOrbitAnimation } from '@/components/animations/ServicesOrbitAnimation';
import { ArrowRight, Cpu, GitBranch, Globe, Code2 } from 'lucide-react';

const HERO_SERVICES_STRIP = [
  {
    id: 'ai-workflow',
    title: 'AI Workflows',
    description: 'Intelligent automation with human approval and control.',
    href: '/services/ai-workflow',
    icon: Cpu,
    iconBg: 'bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]',
    accentHover: 'group-hover:text-blue-400',
    borderHover: 'hover:border-blue-500/50 hover:shadow-blue-500/10',
    linkHover: 'text-blue-400',
  },
  {
    id: 'automation-integration',
    title: 'Automation & Integration',
    description: 'Connect tools, eliminate manual work, and streamline operations.',
    href: '/services/automation-integration',
    icon: GitBranch,
    iconBg: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)]',
    accentHover: 'group-hover:text-cyan-400',
    borderHover: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10',
    linkHover: 'text-cyan-400',
  },
  {
    id: 'digital-launch',
    title: 'Digital Launch',
    description: 'High-converting websites, landing pages & digital presence.',
    href: '/services/digital-launch',
    icon: Globe,
    iconBg: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.15)]',
    accentHover: 'group-hover:text-indigo-400',
    borderHover: 'hover:border-indigo-500/50 hover:shadow-indigo-500/10',
    linkHover: 'text-indigo-400',
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    description: 'Powerful web apps, APIs and portals built for your business.',
    href: '/services/custom-software',
    icon: Code2,
    iconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    accentHover: 'group-hover:text-emerald-400',
    borderHover: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10',
    linkHover: 'text-emerald-400',
  },
];

export function Hero() {
  return (
    <section className="relative pt-6 pb-0 lg:pt-10 lg:pb-0 border-b border-border/60 bg-surface-card">
      <Container className="relative z-10 flex flex-col justify-between min-h-[460px] pb-0">
        {/* Main Hero Copy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Copy */}
          <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-4 pt-2 sm:pt-4">
            <Reveal delay={100}>
              <Badge variant="default" className="mb-4 shadow-sm">
                AI / SOFTWARE / DIGITAL SYSTEMS
              </Badge>
            </Reveal>

            <Reveal delay={200}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-[1.1] mb-5">
                Build systems <br className="hidden sm:inline" />
                <span className="text-blue">you own.</span>
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-lg sm:text-xl text-text-muted leading-relaxed mb-7 max-w-xl">
                NOVARCH designs and builds AI, software and digital systems that help businesses sell, operate and grow — with human control and data ownership built in.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Button href="#services" variant="primary" size="lg" className="group shadow-md shadow-blue/20">
                  Explore What We Offer
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
                <Button href="/contact" variant="secondary" size="lg" className="bg-surface-card text-text border-border hover:border-blue hover:text-blue backdrop-blur-sm">
                  Start a Project
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 4-Services Orbit Animation with central Novarch Logo */}
          <div className="lg:col-span-6 flex items-center justify-center w-full">
            <Reveal delay={250} className="w-full flex items-center justify-center">
              <ServicesOrbitAnimation />
            </Reveal>
          </div>
        </div>

        {/* 4-Service Cards Strip Aligned at Lower Edge */}
        <Reveal delay={500} className="mt-8 lg:mt-10 relative z-20">
          <div className="translate-y-6 sm:translate-y-8 lg:translate-y-10 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HERO_SERVICES_STRIP.map((card) => {
                const IconComponent = card.icon;
                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    className={`group flex flex-col justify-between p-4 rounded-xl bg-surface-card/95 backdrop-blur-md border border-border shadow-md shadow-navy/5 ${card.borderHover} hover:bg-surface-card hover:shadow-lg transition-all duration-200`}
                  >
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${card.iconBg} flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className={`text-sm font-bold text-text ${card.accentHover} transition-colors leading-snug`}>
                          {card.title}
                        </h3>
                        <p className="text-xs text-text-muted leading-normal mt-1">
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
