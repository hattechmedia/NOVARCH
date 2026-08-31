'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Inbox,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronRight,
  ArrowDown,
} from 'lucide-react';
import type { OperatingStep } from '@/types/founder';

interface OperatingBlueprintProps {
  sequence: OperatingStep[];
}

const STEP_ICONS: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    iconColor: string;
  }
> = {
  '01': { icon: Inbox, iconColor: '#60A5FA' }, // Blue
  '02': { icon: Layers, iconColor: '#C084FC' }, // Purple
  '03': { icon: Cpu, iconColor: '#38BDF8' }, // Cyan
  '04': { icon: ShieldCheck, iconColor: '#34D399' }, // Emerald
  '05': { icon: Zap, iconColor: '#FBBF24' }, // Amber
  '06': { icon: CheckCircle2, iconColor: '#2DD4BF' }, // Teal
};

export function OperatingBlueprint({ sequence }: OperatingBlueprintProps) {
  return (
    <div className="relative">
      {/* Desktop Connecting Line behind cards */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-[72px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-blue/20 via-cyan/40 to-blue/20 z-0 pointer-events-none"
      />

      {/* Grid of 6 Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-4 relative z-10">
        {sequence.map((item, idx) => {
          const stepData = STEP_ICONS[item.step] || { icon: Cpu, iconColor: '#38BDF8' };
          const Icon = stepData.icon;
          const isLast = idx === sequence.length - 1;

          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
              className="relative flex flex-col h-full"
            >
              {/* Card Container */}
              <div className="group relative flex-1 p-5 sm:p-6 rounded-2xl border border-border bg-surface-card hover:border-blue/50 hover:shadow-lg hover:shadow-blue/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm">
                {/* Subtle top accent line */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-blue/30 to-transparent group-hover:via-blue/80 transition-all duration-300" />

                <div>
                  {/* Card Header: Step Pill & Icon Box */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue/10 text-blue border border-blue/20">
                      STEP {item.step}
                    </span>

                    {/* Standard Icon Container — ONLY the inner icon receives color */}
                    <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-surface-2 border border-border transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-4 w-4" style={{ color: stepData.iconColor }} />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-base sm:text-lg font-bold text-text mb-2 flex items-center gap-1.5 group-hover:text-blue transition-colors leading-snug">
                    {item.label}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Status / Flow Indicator */}
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-text-light group-hover:text-text-muted transition-colors">
                    Phase 0{idx + 1}
                  </span>

                  {/* Desktop Right Connector Arrow */}
                  {!isLast && (
                    <ChevronRight className="hidden lg:block h-3.5 w-3.5 text-blue/40 group-hover:text-blue group-hover:translate-x-0.5 transition-all" />
                  )}
                </div>
              </div>

              {/* Mobile/Tablet Down Arrow Connector */}
              {!isLast && (
                <div className="lg:hidden flex justify-center py-2 text-blue/40">
                  <ArrowDown className="h-4 w-4 animate-pulse" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
