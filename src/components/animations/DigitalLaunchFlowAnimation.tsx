'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Search,
  Target,
  Calendar,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Zap,
  Activity,
  Filter,
  Check,
} from 'lucide-react';

const FLOW_PAIRS = [
  {
    id: 'leads',
    // Left Source Data
    left: {
      id: 'visitors',
      label: 'Organic Visitors',
      sublabel: 'High-Intent Search Traffic',
      icon: Globe,
      count: '1,420/mo',
      status: 'Active Intake Filter',
    },
    // Right Action Target Data
    right: {
      title: 'Qualified Lead Intake',
      subtitle: 'Automated intake & routing',
      metric: '+340% Lift',
      icon: Target,
      color: 'from-[#1E5FBF] to-[#38B2D8]',
    },
  },
  {
    id: 'meetings',
    // Left Source Data
    left: {
      id: 'search',
      label: 'Search Traffic',
      sublabel: 'Targeted Buyer Keywords',
      icon: Search,
      count: '850/mo',
      status: 'Direct Booking Engine',
    },
    // Right Action Target Data
    right: {
      title: 'Discovery Call Booked',
      subtitle: 'Direct calendar integration',
      metric: '10-Sec Clarity',
      icon: Calendar,
      color: 'from-[#38B2D8] to-[#10B981]',
    },
  },
  {
    id: 'clients',
    // Left Source Data
    left: {
      id: 'referrals',
      label: 'Market Referrals',
      sublabel: 'High-Trust Direct Channels',
      icon: Activity,
      count: '620/mo',
      status: 'Positioning Verified',
    },
    // Right Action Target Data
    right: {
      title: 'Conversion-Ready Client',
      subtitle: 'High-credibility positioning',
      metric: '99.8% Match',
      icon: Briefcase,
      color: 'from-[#10B981] to-[#3B82F6]',
    },
  },
];

export function DigitalLaunchFlowAnimation() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Auto-cycle active step faster (every 1.8 seconds)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FLOW_PAIRS.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const activePair = FLOW_PAIRS[activeIndex];

  return (
    <div className="relative w-full rounded-2xl bg-[#0F2540] border border-[#152E4D] p-4 sm:p-5 shadow-2xl shadow-[#0D1B2A]/40 overflow-hidden text-white">
      {/* Background Tech Grid Pattern & Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E5FBF_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#1E5FBF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#38B2D8]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 flex items-center justify-between pb-4 mb-5 border-b border-[#152E4D]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-[#1E5FBF]/30 text-[#38B2D8] border border-[#38B2D8]/40">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D0E4FF]">
            DIGITAL LAUNCH ENGINE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[11px] font-mono font-semibold text-[#D0E4FF]">
            PostgreSQL · REST API
          </span>
        </div>
      </div>

      {/* Main 3-Column Animation Container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Raw Attention Streams (Updates as right cards hover) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#7A8FA6]">
              Source Traffic Stream
            </span>
          </div>

          {FLOW_PAIRS.map((pair, idx) => {
            const Icon = pair.left.icon;
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={pair.left.id}
                onClick={() => setActiveIndex(idx)}
                animate={{
                  scale: isActive ? 1.02 : 1,
                  borderColor: isActive ? '#38B2D8' : '#152E4D',
                }}
                transition={{ duration: 0.2 }}
                className={`p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-[#152E4D] border-[#38B2D8] shadow-lg shadow-[#1E5FBF]/25 ring-1 ring-[#38B2D8]/40'
                    : 'bg-[#0D1B2A]/80 border-[#152E4D] hover:border-[#38B2D8]/40 hover:bg-[#0D1B2A]'
                }`}
              >
                {/* Active Left Indicator Pill */}
                {isActive && (
                  <motion.div
                    layoutId="leftActivePill"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#38B2D8]"
                  />
                )}

                <div className="flex items-center gap-3 pl-1">
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive ? 'bg-[#1E5FBF] text-white' : 'bg-[#0F2540] text-[#7A8FA6]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">
                      {pair.left.label}
                    </p>
                    <p className="text-[10px] text-[#D0E4FF] font-medium mt-0.5">
                      {pair.left.sublabel}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] font-mono font-bold block ${
                      isActive ? 'text-[#38B2D8]' : 'text-[#7A8FA6]'
                    }`}
                  >
                    {pair.left.count}
                  </span>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -3 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-end text-[9px] font-semibold text-[#10B981] mt-0.5"
                    >
                      <Check className="h-3 w-3 mr-0.5" />
                      Active Flow
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Center Column: Dynamic Glowing Core Engine */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center py-4 lg:py-0 relative">
          <div className="w-full flex flex-col items-center relative">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center bg-gradient-to-b from-[#1E5FBF]/30 via-[#0D1B2A] to-[#0F2540] border border-[#38B2D8]/50 shadow-2xl shadow-[#1E5FBF]/30 backdrop-blur-xl">
              {/* Outer Rotating Pulse Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-[#38B2D8]/60"
              />

              {/* Inner Pulsing Core */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePair.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center text-center p-2"
                >
                  <div className="p-2.5 rounded-full bg-[#1E5FBF] text-white shadow-lg shadow-[#1E5FBF]/60 mb-1">
                    <Zap className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-bold text-white tracking-wide">
                    NOVARCH
                  </span>
                  <span className="text-[9px] font-mono text-[#38B2D8] uppercase">
                    STAGE 0{activeIndex + 1} CORE
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dynamic Status Text underneath Core */}
            <div className="mt-3 flex flex-col items-center gap-1 w-full text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activePair.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#152E4D] text-[10px] font-mono font-semibold text-[#D0E4FF] border border-[#38B2D8]/40 shadow-sm"
                >
                  <Filter className="h-3 w-3 text-[#38B2D8]" />
                  {activePair.left.status}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Structured Action Nodes */}
        <div className="lg:col-span-5 space-y-3">
          <div className="mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#7A8FA6]">
              Conversion Action Nodes
            </span>
          </div>

          {FLOW_PAIRS.map((pair, idx) => {
            const Icon = pair.right.icon;
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={pair.id}
                onClick={() => setActiveIndex(idx)}
                animate={{
                  x: isActive ? 4 : 0,
                  scale: isActive ? 1.02 : 1,
                  borderColor: isActive ? '#38B2D8' : '#152E4D',
                }}
                transition={{ duration: 0.2 }}
                className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-[#152E4D] border-[#38B2D8] shadow-xl shadow-[#1E5FBF]/30 ring-1 ring-[#38B2D8]/40'
                    : 'bg-[#0D1B2A]/90 border-[#152E4D] hover:border-[#38B2D8]/40'
                }`}
              >
                {/* Active Gradient Bar on Left Edge */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${pair.right.color}`}
                />

                <div className="flex items-center justify-between pl-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isActive ? 'bg-[#1E5FBF] text-white' : 'bg-[#0F2540] text-[#38B2D8]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        {pair.right.title}
                        {isActive && <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />}
                      </h4>
                      <p className="text-[10px] text-[#D0E4FF] font-medium">
                        {pair.right.subtitle}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-1 rounded transition-colors ${
                      isActive
                        ? 'bg-[#1E5FBF] text-white border border-[#38B2D8]'
                        : 'bg-[#1E5FBF]/20 text-[#38B2D8] border border-[#38B2D8]/30'
                    }`}
                  >
                    {pair.right.metric}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
