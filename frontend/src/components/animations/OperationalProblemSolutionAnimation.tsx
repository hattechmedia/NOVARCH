'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Target,
  XCircle,
  CheckCircle2,
  Zap,
  Activity,
  ArrowRight,
  RefreshCw,
  Cpu,
  Layers,
  Database,
  GitBranch,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OperationalProblemSolutionAnimationProps {
  problems: string[];
  buyerFit: string[];
  serviceSlug?: string;
}

// Telemetry & transformation metadata for each pipeline node
const TELEMETRY_DATA = [
  {
    icon: GitBranch,
    bottleneckMetric: 'LAG: 4.2 hrs / day',
    bottleneckBadge: 'MANUAL HANDOFF',
    solutionMetric: 'SPEED: < 80ms Latency',
    solutionBadge: 'AUTO WEBHOOK BUS',
    packetData: '{ event: "data.sync", status: 200 }',
  },
  {
    icon: Activity,
    bottleneckMetric: 'RISK: ~28% Handoff Drops',
    bottleneckBadge: 'EMAIL & MEMORY',
    solutionMetric: 'SLA: 99.99% Event Queue',
    solutionBadge: 'EVENT-DRIVEN ROUTER',
    packetData: '{ queue: "orders.inbox", routed: true }',
  },
  {
    icon: Database,
    bottleneckMetric: 'SILO: Inconsistent State',
    bottleneckBadge: 'FRAGMENTED DATA',
    solutionMetric: 'SSOT: Canonical Schema',
    solutionBadge: 'UNIFIED POSTGRES DB',
    packetData: '{ schema: "orders_v2", synced: true }',
  },
  {
    icon: Cpu,
    bottleneckMetric: 'WASTE: 65% Repetitive Work',
    bottleneckBadge: 'ROUTINE OVERHEAD',
    solutionMetric: 'EFFICIENCY: 24/7 Daemon',
    solutionBadge: 'HEADLESS WORKER ENGINE',
    packetData: '{ worker: "daemon.execute", count: 1420 }',
  },
];

export function OperationalProblemSolutionAnimation({
  problems,
  buyerFit,
  serviceSlug = 'automation-integration',
}: OperationalProblemSolutionAnimationProps) {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState<boolean>(true);
  const autoPlayTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Auto-play through nodes every 4.5 seconds if not paused
  React.useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % problems.length);
    }, 4500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, problems.length]);

  const handleSelectNode = (idx: number) => {
    setActiveIndex(idx);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full rounded-3xl bg-[#09131F]/90 border border-[#17304E] p-5 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl overflow-hidden text-white">
      {/* ── Background Circuit Grid & Radial Illumination ──────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E5FBF_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#38B2D8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1E5FBF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── Header Diagnostic Telemetry Bar ────────────────────────────── */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#17304E]/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400">
            <AlertTriangle className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#38B2D8] uppercase">
                SYSTEM TRANSFORMATION MATRIX
              </span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10B981] animate-ping" />
            </div>
            <p className="text-xs text-[#7A8FA6] font-medium">
              Live interactive mapping: Operational Friction ➔ Automated Architecture
            </p>
          </div>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAutoPlaying((p) => !p)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-200 border cursor-pointer',
              isAutoPlaying
                ? 'bg-[#1E5FBF]/20 text-[#38B2D8] border-[#38B2D8]/40 shadow-[0_0_10px_rgba(56,178,216,0.2)]'
                : 'bg-[#0D1B2A] text-[#7A8FA6] border-[#17304E] hover:text-white'
            )}
          >
            <RefreshCw className={cn('h-3.5 w-3.5', isAutoPlaying && 'animate-spin')} />
            <span>{isAutoPlaying ? 'Auto Cycling' : 'Manual Mode'}</span>
          </button>
        </div>
      </div>

      {/* ── Main Comparison Grid with Central Beam Junction ─────────────── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* ── LEFT COLUMN: Operational Bottlenecks ──────────────────────── */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
              THE OPERATIONAL PROBLEM
            </span>
            <span className="text-[11px] font-mono text-red-400/80 font-bold">
              04 CRITICAL DRAGS
            </span>
          </div>

          <div className="space-y-3">
            {problems.map((problem, idx) => {
              const isSelected = activeIndex === idx;
              const meta = TELEMETRY_DATA[idx] || TELEMETRY_DATA[0];

              return (
                <div
                  key={problem}
                  onMouseEnter={() => handleSelectNode(idx)}
                  className={cn(
                    'group relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md text-left',
                    isSelected
                      ? 'bg-[#1A0F1A]/90 border-red-500/80 shadow-[0_0_24px_rgba(239,68,68,0.2)] scale-[1.02]'
                      : 'bg-[#0D1B2A]/75 border-[#17304E] hover:border-red-500/40 hover:bg-[#121E2E]'
                  )}
                >
                  {/* Active Crimson Neon Left Accent */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 to-amber-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
                  )}

                  <div className="flex items-start gap-3.5">
                    <div
                      className={cn(
                        'flex items-center justify-center h-8 w-8 rounded-lg flex-shrink-0 mt-0.5 transition-all duration-200',
                        isSelected
                          ? 'bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.6)]'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20 group-hover:scale-105'
                      )}
                    >
                      <XCircle className="h-4.5 w-4.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={cn(
                            'text-[10px] font-mono font-bold tracking-wider uppercase',
                            isSelected ? 'text-red-300' : 'text-red-400/80'
                          )}
                        >
                          BOTTLENECK 0{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/25">
                          {meta.bottleneckBadge}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-white/95 leading-snug">
                        {problem}
                      </p>

                      {/* Expandable Diagnostic Telemetry */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2.5 pt-2.5 border-t border-red-500/20 flex items-center justify-between text-[11px] font-mono text-red-300"
                          >
                            <span className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3 text-red-400" />
                              {meta.bottleneckMetric}
                            </span>
                            <span className="text-[#7A8FA6] text-[10px]">
                              Active Friction
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CENTER COLUMN: Animated Transformation Node Bus (Desktop) ──── */}
        <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center relative py-6">
          {/* Vertical Bus Line */}
          <div className="absolute top-10 bottom-10 w-0.5 bg-gradient-to-b from-red-500/40 via-[#1E5FBF] to-[#10B981]/50" />

          {/* Central Active Transformer Hub */}
          <div className="relative z-20 flex flex-col items-center justify-between h-full py-4">
            {problems.map((_, idx) => {
              const isSelected = activeIndex === idx;
              const IconComp = TELEMETRY_DATA[idx]?.icon || Zap;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectNode(idx)}
                  className={cn(
                    'relative flex items-center justify-center h-11 w-11 rounded-full border transition-all duration-300 cursor-pointer',
                    isSelected
                      ? 'bg-[#0D1B2A] border-[#38B2D8] text-[#38B2D8] shadow-[0_0_20px_rgba(56,178,216,0.8)] scale-110'
                      : 'bg-[#09131F] border-[#17304E] text-[#7A8FA6] hover:border-[#38B2D8]/50 hover:text-white'
                  )}
                  aria-label={`Select stage ${idx + 1}`}
                >
                  <IconComp className="h-5 w-5" />
                  
                  {/* Energy Wave Ring */}
                  {isSelected && (
                    <span className="absolute -inset-1 rounded-full border border-[#38B2D8] animate-ping opacity-60 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Automated Fit Solutions ─────────────────────── */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-[#38B2D8] bg-[#38B2D8]/10 px-3 py-1 rounded-full border border-[#38B2D8]/30">
              <Target className="h-3.5 w-3.5 text-[#38B2D8]" />
              WHO THIS IS FOR / SOLUTION
            </span>
            <span className="text-[11px] font-mono text-[#10B981] font-bold">
              04 AUTOMATED FIT REQUISITES
            </span>
          </div>

          <div className="space-y-3">
            {buyerFit.map((fit, idx) => {
              const isSelected = activeIndex === idx;
              const meta = TELEMETRY_DATA[idx] || TELEMETRY_DATA[0];

              return (
                <div
                  key={fit}
                  onMouseEnter={() => handleSelectNode(idx)}
                  className={cn(
                    'group relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md text-left',
                    isSelected
                      ? 'bg-[#0D233A]/90 border-[#38B2D8] shadow-[0_0_24px_rgba(56,178,216,0.25)] scale-[1.02]'
                      : 'bg-[#0D1B2A]/75 border-[#17304E] hover:border-[#38B2D8]/40 hover:bg-[#121E2E]'
                  )}
                >
                  {/* Active Cyan Neon Right Accent */}
                  {isSelected && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#38B2D8] to-[#10B981] shadow-[0_0_12px_rgba(56,178,216,0.8)]" />
                  )}

                  <div className="flex items-start gap-3.5">
                    <div
                      className={cn(
                        'flex items-center justify-center h-8 w-8 rounded-lg flex-shrink-0 mt-0.5 transition-all duration-200',
                        isSelected
                          ? 'bg-[#38B2D8] text-[#09131F] shadow-[0_0_12px_rgba(56,178,216,0.6)] font-bold'
                          : 'bg-[#38B2D8]/15 text-[#38B2D8] border border-[#38B2D8]/30 group-hover:scale-105'
                      )}
                    >
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={cn(
                            'text-[10px] font-mono font-bold tracking-wider uppercase',
                            isSelected ? 'text-[#38B2D8]' : 'text-[#38B2D8]/80'
                          )}
                        >
                          FIT CRITERIA 0{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                          {meta.solutionBadge}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-white/95 leading-snug">
                        {fit}
                      </p>

                      {/* Expandable Resolved Telemetry */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2.5 pt-2.5 border-t border-[#38B2D8]/20 flex items-center justify-between text-[11px] font-mono text-[#38B2D8]"
                          >
                            <span className="flex items-center gap-1 text-[#10B981]">
                              <Zap className="h-3 w-3 text-[#10B981]" />
                              {meta.solutionMetric}
                            </span>
                            <span className="text-[#38B2D8] text-[10px] font-mono">
                              {meta.packetData}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Bottom Operational Verdict Strip ───────────────────────────── */}
      <div className="relative z-10 mt-8 pt-6 border-t border-[#17304E]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-7 w-7 rounded-md bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
            <Zap className="h-4 w-4" />
          </div>
          <p className="text-xs text-[#7A8FA6] leading-relaxed">
            <strong className="text-white">The NOVARCH Guarantee:</strong> Every integration point is bounded with explicit data contracts, logging, and human approval checkpoints.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#38B2D8] whitespace-nowrap">
          <span>Active Architecture: Step 0{activeIndex + 1}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
