'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/animations/Reveal';
import { Globe, GitBranch, Cpu, Code2, ArrowRight } from 'lucide-react';
import { services } from '@/data/services';

const ICON_MAP = { Globe, GitBranch, Cpu, Code2 };

const SERVICE_BACKGROUNDS: Record<string, string> = {
  'digital-launch':         '/images/services/digital-launch-bg.jpg',
  'automation-integration': '/images/services/automation-bg.jpg',
  'ai-workflow':            '/images/services/ai-workflow-bg.jpg',
  'custom-software':        '/images/services/custom-software-bg.jpg',
};

const NAVBAR_H = 80;  // approx navbar height in px
const PEEK_PX  = 0;   // 0px so each card completely covers the previous one when stacked

export function ServicesSection() {
  return (
    /* pt on section itself — compensates for hero card overlap into this section */
    <section
      id="services"
      className="bg-surface-card border-b border-border pt-32 lg:pt-40 pb-24"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-14 items-start">

          {/* ── Left: Sticky Heading — starts at the very TOP ─────────── */}
          <div
            className="lg:col-span-4 lg:sticky flex flex-col items-start self-start
                        pb-10 lg:pb-0"
            style={{ top: `${NAVBAR_H + 16}px` }}
          >
            <Reveal delay={100}>
              <Badge variant="light" className="mb-5">WHAT WE BUILD</Badge>
            </Reveal>

            <Reveal delay={200}>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight
                             text-text leading-tight mb-5">
                Systems built around{' '}
                <span className="text-blue">real business work.</span>
              </h2>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-base text-white leading-relaxed mb-8">
                NOVARCH brings digital systems, automation, AI workflows and custom
                software into one accountable delivery model.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-bold
                           text-[#1E5FBF] hover:text-blue-400 transition-colors"
              >
                View all services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          {/* ── Right: Stacking Cards — also starts at the very TOP ────── */}
          <div className="lg:col-span-8">
            {services.map((service, index) => {
              const IconComponent = ICON_MAP[service.icon as keyof typeof ICON_MAP] || Globe;
              const bgImage      = SERVICE_BACKGROUNDS[service.slug] ?? '/images/hero/hero.jpeg';
              const stickyTop    = NAVBAR_H + index * PEEK_PX;

              return (
                <div
                  key={service.id}
                  className="lg:sticky mb-5 lg:mb-0 w-full"
                  style={{
                    top:    `${stickyTop}px`,
                    zIndex: 10 + index,
                  }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative flex flex-col
                               p-8 rounded-2xl overflow-hidden
                               border border-border
                               hover:border-cyan hover:shadow-2xl hover:shadow-blue/20
                               transition-all duration-500 bg-navy
                               min-h-[300px] lg:min-h-[80vh]"
                  >
                    {/* ── Background image ─────────────────────────── */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <Image
                        src={bgImage}
                        alt={service.name}
                        fill
                        priority={index < 2}
                        className="object-cover object-center
                                   transform transition-transform duration-700
                                   group-hover:scale-105 opacity-60 group-hover:opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t
                                      from-navy/95 via-navy/65 to-navy/25" />
                    </div>

                    {/* ── Text — TOP ───────────────────────────────── */}
                    <div className="relative z-10">
                      <span className="text-xs font-mono font-bold uppercase
                                       tracking-wider text-cyan mb-3 block">
                        Door 0{index + 1}
                      </span>

                      <h3 className="text-2xl sm:text-3xl font-bold !text-white
                                     group-hover:!text-cyan transition-colors mb-4">
                        {service.name}
                      </h3>

                      <p className="text-base text-white leading-relaxed
                                    font-medium max-w-2xl">
                        {service.description}
                      </p>
                    </div>

                    {/* ── Icon / Price / CTA — BOTTOM ──────────────── */}
                    <div className="relative z-10 mt-auto pt-10">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center justify-center h-12 w-12
                                        rounded-lg bg-navy-800/80 text-cyan
                                        border border-cyan/40
                                        group-hover:bg-blue group-hover:text-white
                                        transition-all duration-300
                                        shadow-lg backdrop-blur-md">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <span className="text-xs font-mono font-bold text-white
                                         bg-navy/90 px-3.5 py-1.5 rounded-full
                                         border border-cyan/50 shadow-md backdrop-blur-md">
                          Basic Plan €{service.paidEntry.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm font-bold
                                      text-cyan group-hover:text-white
                                      transition-colors duration-200">
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4 transition-transform
                                               duration-200 group-hover:translate-x-1.5" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
