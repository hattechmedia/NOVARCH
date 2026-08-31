'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Eye,
  Sliders,
  Key,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { FounderPrinciple } from '@/types/founder';

interface FounderPrinciplesProps {
  principles: FounderPrinciple[];
  promise: string;
}

const PRINCIPLE_CONFIG = [
  {
    tag: '01 / UNDERSTAND',
    icon: Eye,
    accentColor: '#3B82F6', // Blue
  },
  {
    tag: '02 / OPERATE',
    icon: Sliders,
    accentColor: '#38BDF8', // Cyan
  },
  {
    tag: '03 / OWN',
    icon: Key,
    accentColor: '#34D399', // Emerald
  },
];

export function FounderPrinciples({ principles, promise }: FounderPrinciplesProps) {
  return (
    <section className="py-20 lg:py-28 bg-surface-2/30 border-t border-border relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Card Container */}
        <div className="rounded-3xl border border-border bg-surface-card p-8 sm:p-10 lg:p-14 shadow-2xl shadow-navy/20 relative overflow-hidden">
          {/* Top subtle glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-blue/15 to-cyan/10 blur-3xl pointer-events-none"
          />

          {/* Section Header */}
          <div className="max-w-3xl mb-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Badge variant="default" className="mb-4">
                WHAT THE FOUNDER BELIEVES
              </Badge>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight mb-4 text-pretty"
            >
              Build systems people can{' '}
              <span className="bg-gradient-to-r from-blue via-cyan to-blue bg-clip-text text-transparent">
                understand, operate, and own.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-base sm:text-lg text-text-muted leading-relaxed"
            >
              Technology should increase human agency — not create opaque dependency.
            </motion.p>
          </div>

          {/* 3 Principle Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-12">
            {principles.map((p, idx) => {
              const config = PRINCIPLE_CONFIG[idx] || PRINCIPLE_CONFIG[0];
              const Icon = config.icon;

              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.1 }}
                  className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-surface-card via-surface-card to-surface-2/50 border border-border/90 hover:border-blue/50 hover:shadow-xl hover:shadow-blue/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                >
                  {/* Subtle top accent line */}
                  <div
                    className="absolute top-0 left-6 right-6 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to right, transparent, ${config.accentColor}, transparent)`,
                    }}
                  />

                  <div>
                    {/* Header: Tag & Icon */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span className="text-xs font-mono font-bold text-blue bg-blue/10 px-3 py-1 rounded-full border border-blue/20 tracking-wider">
                        {config.tag}
                      </span>

                      <div
                        className="h-9 w-9 rounded-xl flex items-center justify-center bg-surface-2 border border-border transition-transform duration-300 group-hover:scale-110"
                        style={{ color: config.accentColor }}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-text mb-3 leading-snug group-hover:text-blue transition-colors">
                      {p.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Operating Promise Footer Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue/10 via-surface-2/80 to-cyan/10 border border-blue/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10"
          >
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-blue/15 text-blue border border-blue/30 flex items-center justify-center flex-shrink-0 shadow-inner">
                <ShieldCheck className="h-6 w-6 text-cyan" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-text-light font-semibold mb-0.5">
                  The Operating Promise
                </p>
                <p className="text-xl sm:text-2xl font-bold text-text tracking-tight">
                  &ldquo;{promise}&rdquo;
                </p>
              </div>
            </div>

            <Button href="/contact" variant="primary" size="lg" className="shadow-md shadow-blue/20">
              Talk to NOVARCH
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
