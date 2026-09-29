'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Database,
  Sliders,
  Layers,
  Lock,
} from 'lucide-react';

interface StageInfo {
  id: string;
  step: string;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const WORKFLOW_STAGES: StageInfo[] = [
  {
    id: 'context',
    step: '01',
    title: 'Context & Knowledge Assembly',
    badge: 'STAGE 01 / INGEST',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    description: 'Structured parsing of enterprise briefs, documentation, and operational rules.',
    metric: '100% Isolated',
    metricLabel: 'Customer Data Sovereignty',
    icon: Database,
  },
  {
    id: 'inference',
    step: '02',
    title: 'Bounded Neural Processing',
    badge: 'STAGE 02 / AI MODEL',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    description: 'Deterministic prompt execution with strict JSON schema validation and zero hallucinations.',
    metric: '<180ms',
    metricLabel: 'Inference Latency Target',
    icon: Cpu,
  },
  {
    id: 'human_gate',
    step: '03',
    title: 'Visible Human Approval Gate',
    badge: 'STAGE 03 / OPERATOR',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: 'Sensitive decisions and client outputs require explicit operator confirmation before action.',
    metric: '100% Control',
    metricLabel: 'Human-in-the-Loop Gate',
    icon: ShieldCheck,
  },
  {
    id: 'dispatch',
    step: '04',
    title: 'Deterministic System Dispatch',
    badge: 'STAGE 04 / ACTION',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    description: 'Automated routing to CRM, database records, and operational pipelines with full audit telemetry.',
    metric: 'Zero Lock-in',
    metricLabel: 'Verifiable Audit Log',
    icon: FileCheck2,
  },
];

export function AIWorkflowHeroGraphic() {
  const [activeStage, setActiveStage] = React.useState<number>(0);

  // Auto-cycle through workflow stages every 4.5 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % WORKFLOW_STAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = WORKFLOW_STAGES[activeStage];
  const IconComponent = current.icon;

  return (
    <div className="relative w-full rounded-2xl border border-white/15 bg-[#060D1A]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* ── Background Image with Atmospheric Gradient Overlay ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services/ai-workflow-bg.jpg"
          alt="AI Workflow Neural Processing Engine"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A] via-[#060D1A]/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,178,216,0.15),transparent_70%)]" />
      </div>

      {/* ── Top Header Strip ── */}
      <div className="relative z-10 flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#081224]/60 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
            AI WORKFLOW PIPELINE SIMULATOR
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
          Controlled Execution
        </span>
      </div>

      {/* ── Main Interactive Showcase ── */}
      <div className="relative z-10 p-5 sm:p-7">
        {/* Stage Selector Tabs */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {WORKFLOW_STAGES.map((stage, idx) => {
            const isActive = activeStage === idx;
            const StageIcon = stage.icon;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`group relative flex flex-col items-center gap-1.5 p-2 sm:p-2.5 rounded-xl border text-center transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-[#0B1528]/80 border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200'
                }`}
              >
                <div
                  className={`h-7 w-7 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  <StageIcon className="h-3.5 w-3.5" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wide">
                  0{idx + 1}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeStageIndicator"
                    className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Dynamic Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-white/15 bg-gradient-to-br from-[#0B172E]/90 via-[#081224]/90 to-[#040A16]/90 p-5 sm:p-6 shadow-xl backdrop-blur-md"
          >
            {/* Stage Title and Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${current.badgeColor}`}
              >
                <Sparkles className="h-3 w-3" />
                {current.badge}
              </span>
              <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="h-3 w-3" />
                <span>Verified Governance</span>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-2">
              <IconComponent className="h-5 w-5 text-cyan-400" />
              {current.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              {current.description}
            </p>

            {/* Telemetry Metrics Bar */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="bg-[#050C1A] p-3 rounded-lg border border-white/5">
                <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                  {current.metricLabel}
                </p>
                <p className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">
                  {current.metric}
                </p>
              </div>

              <div className="bg-[#050C1A] p-3 rounded-lg border border-white/5 flex flex-col justify-between">
                <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                  Operational Gate
                </p>
                <p className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Human-in-the-Loop
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom Status Bar ── */}
        <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Active Sprints: 4 Delivery Doors
          </span>
          <span className="text-cyan-400 font-semibold">
            Sprint Handover: 1–2 Weeks
          </span>
        </div>
      </div>
    </div>
  );
}
