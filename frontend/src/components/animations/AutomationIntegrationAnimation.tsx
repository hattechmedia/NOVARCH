'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCode,
  Play,
  Mail,
  Cpu,
  ShieldCheck,
  Database,
  MessageSquare,
  Sparkles,
  CheckCircle,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';

type Mode = 'blueprint' | 'execution';

interface FlowNode {
  id: string;
  label: string;
  sublabel: string;
  blueprintLabel: string;
  x: number;
  y: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const FLOW_NODES: FlowNode[] = [
  {
    id: 'source',
    label: 'Email Intake',
    sublabel: 'API client stream',
    blueprintLabel: 'SRC_STREAM_1',
    x: 80,
    y: 80,
    icon: Mail,
    color: '#38B2D8',
  },
  {
    id: 'processor',
    label: 'Data Mapper',
    sublabel: 'JSON schema sync',
    blueprintLabel: 'PROC_VAL_MAP',
    x: 230,
    y: 160,
    icon: Cpu,
    color: '#1E5FBF',
  },
  {
    id: 'gate',
    label: 'Approval Gate',
    sublabel: 'Human-in-the-loop',
    blueprintLabel: 'CTRL_GATE_SEC',
    x: 380,
    y: 160,
    icon: ShieldCheck,
    color: '#10B981',
  },
  {
    id: 'erp',
    label: 'SAP ERP Target',
    sublabel: 'Financial sync',
    blueprintLabel: 'DEST_ERP_SYS',
    x: 540,
    y: 80,
    icon: Database,
    color: '#3B82F6',
  },
  {
    id: 'slack',
    label: 'Slack Alerts',
    sublabel: 'Operational log',
    blueprintLabel: 'DEST_LOG_SLACK',
    x: 540,
    y: 240,
    icon: MessageSquare,
    color: '#EC4899',
  },
];

export function AutomationIntegrationAnimation() {
  const [mode, setMode] = React.useState<Mode>('blueprint');
  const [isApproved, setIsApproved] = React.useState<boolean>(false);
  const [pulseKey, setPulseKey] = React.useState<number>(0);

  // Animation Sequence States
  const [nodeStates, setNodeStates] = React.useState<Record<string, 'blueprint' | 'tracing' | 'execution'>>({
    source: 'blueprint',
    processor: 'blueprint',
    gate: 'blueprint',
    erp: 'blueprint',
    slack: 'blueprint',
  });

  const [activePulse, setActivePulse] = React.useState<'source-to-processor' | 'processor-to-gate' | 'gate-to-destinations' | null>(null);
  const [seqStep, setSeqStep] = React.useState<number>(-1);

  // Switch modes and reset / start sequence
  React.useEffect(() => {
    if (mode === 'blueprint') {
      setSeqStep(-1);
      setNodeStates({
        source: 'blueprint',
        processor: 'blueprint',
        gate: 'blueprint',
        erp: 'blueprint',
        slack: 'blueprint',
      });
      setActivePulse(null);
      setIsApproved(false);
    } else if (mode === 'execution') {
      setNodeStates({
        source: 'blueprint',
        processor: 'blueprint',
        gate: 'blueprint',
        erp: 'blueprint',
        slack: 'blueprint',
      });
      setActivePulse(null);
      setSeqStep(0);
    }
  }, [mode]);

  // Stepper Sequence for blueprint-to-execution transition
  React.useEffect(() => {
    if (mode !== 'execution') return;

    let timer: NodeJS.Timeout;

    if (seqStep === 0) {
      // Step 0: Trace Source Node
      setNodeStates((prev) => ({ ...prev, source: 'tracing' }));
      timer = setTimeout(() => {
        setNodeStates((prev) => ({ ...prev, source: 'execution' }));
        setSeqStep(1);
      }, 1500);
    } else if (seqStep === 1) {
      // Step 1: Pulse from Source to Processor
      setActivePulse('source-to-processor');
      timer = setTimeout(() => {
        setActivePulse(null);
        setSeqStep(2);
      }, 1000);
    } else if (seqStep === 2) {
      // Step 2: Trace Processor Node
      setNodeStates((prev) => ({ ...prev, processor: 'tracing' }));
      timer = setTimeout(() => {
        setNodeStates((prev) => ({ ...prev, processor: 'execution' }));
        setSeqStep(3);
      }, 1500);
    } else if (seqStep === 3) {
      // Step 3: Pulse from Processor to Gate
      setActivePulse('processor-to-gate');
      timer = setTimeout(() => {
        setActivePulse(null);
        setSeqStep(4);
      }, 1000);
    } else if (seqStep === 4) {
      // Step 4: Trace Gate Node
      setNodeStates((prev) => ({ ...prev, gate: 'tracing' }));
      timer = setTimeout(() => {
        setNodeStates((prev) => ({ ...prev, gate: 'execution' }));
        setSeqStep(5);
      }, 1500);
    } else if (seqStep === 5) {
      // Step 5: Pulse from Gate to ERP & Slack
      setActivePulse('gate-to-destinations');
      timer = setTimeout(() => {
        setActivePulse(null);
        setSeqStep(6);
      }, 1000);
    } else if (seqStep === 6) {
      // Step 6: Trace ERP & Slack Nodes
      setNodeStates((prev) => ({ ...prev, erp: 'tracing', slack: 'tracing' }));
      timer = setTimeout(() => {
        setNodeStates((prev) => ({ ...prev, erp: 'execution', slack: 'execution' }));
        setSeqStep(7);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [seqStep, mode]);

  // Auto trigger pulse flow in execution mode (only after sequence finishes)
  React.useEffect(() => {
    if (mode === 'execution' && seqStep === 7) {
      const interval = setInterval(() => {
        setPulseKey((k) => k + 1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [mode, seqStep]);

  const handleApprove = () => {
    setIsApproved(true);
    // Auto-reset approval after 4 seconds
    setTimeout(() => {
      setIsApproved(false);
    }, 4000);
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#0F2540] border border-[#152E4D] p-6 sm:p-8 shadow-2xl shadow-[#0D1B2A]/40 overflow-hidden text-white min-h-[440px] flex flex-col justify-between">
      {/* Background blueprint grid pattern & glows */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #38B2D8 1px, transparent 1px),
            linear-gradient(to bottom, #38B2D8 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#1E5FBF]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#38B2D8]/25 rounded-full blur-3xl pointer-events-none" />

      {/* ── Header Toolbar ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#152E4D]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#1E5FBF]/30 text-[#38B2D8] border border-[#38B2D8]/40">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D0E4FF] block leading-none mb-1">
              SYSTEM MODE SELECTOR
            </span>
            <span className="text-[10px] font-mono text-[#7A8FA6] leading-none uppercase">
              Current: {mode === 'blueprint' ? 'Architecture Draft' : 'Active Flow Pipeline'}
            </span>
          </div>
        </div>

        {/* Premium Mode Switcher Slider */}
        <div className="flex items-center bg-[#0D1B2A] p-1.5 rounded-xl border border-[#152E4D] shadow-inner">
          <button
            onClick={() => setMode('blueprint')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all duration-300 ${
              mode === 'blueprint'
                ? 'bg-[#1E5FBF] text-white shadow-md animate-pulse-subtle'
                : 'text-[#7A8FA6] hover:text-[#D0E4FF]'
            }`}
          >
            <FileCode className="h-3.5 w-3.5" />
            BLUEPRINT
          </button>
          <button
            onClick={() => setMode('execution')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all duration-300 ${
              mode === 'execution'
                ? 'bg-[#10B981] text-white shadow-md'
                : 'text-[#7A8FA6] hover:text-[#D0E4FF]'
            }`}
          >
            <Play className="h-3.5 w-3.5" />
            EXECUTION
          </button>
        </div>
      </div>

      {/* ── Schematic Canvas Area ───────────────────────────────────── */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center py-4 overflow-x-auto min-w-[580px]">
        <svg className="w-[620px] h-[300px] block" viewBox="0 0 620 300">
          <defs>
            {/* Card Border Glowing Gradients */}
            <linearGradient id="card-border-source" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38B2D8" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#38B2D8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1E5FBF" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="card-border-processor" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E5FBF" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#1E5FBF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0F2540" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="card-border-gate-approved" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0F2540" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="card-border-gate-pending" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0F2540" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="card-border-erp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0F2540" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="card-border-slack" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#EC4899" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0F2540" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* SVG Connection Paths */}
          <g>
            {/* Source to Processor */}
            <path
              d="M 150 110 L 160 130"
              fill="none"
              stroke={nodeStates.source === 'execution' ? 'rgba(56, 178, 216, 0.45)' : '#152E4D'}
              strokeWidth={nodeStates.source === 'execution' ? 2.5 : 1.5}
              strokeDasharray={nodeStates.source === 'execution' ? 'none' : '5,5'}
              className="transition-all duration-500"
            />
            {/* Processor to Gate */}
            <path
              d="M 300 190 L 310 130"
              fill="none"
              stroke={nodeStates.processor === 'execution' ? 'rgba(56, 178, 216, 0.45)' : '#152E4D'}
              strokeWidth={nodeStates.processor === 'execution' ? 2.5 : 1.5}
              strokeDasharray={nodeStates.processor === 'execution' ? 'none' : '5,5'}
              className="transition-all duration-500"
            />
            {/* Gate to ERP */}
            <path
              d="M 450 190 L 470 50"
              fill="none"
              stroke={
                nodeStates.gate === 'execution'
                  ? isApproved
                    ? 'rgba(16, 185, 129, 0.75)'
                    : 'rgba(56, 178, 216, 0.45)'
                  : '#152E4D'
              }
              strokeWidth={nodeStates.gate === 'execution' ? 2.5 : 1.5}
              strokeDasharray={nodeStates.gate === 'execution' ? 'none' : '5,5'}
              className="transition-all duration-500"
            />
            {/* Gate to Slack */}
            <path
              d="M 450 190 L 470 210"
              fill="none"
              stroke={
                nodeStates.gate === 'execution'
                  ? isApproved
                    ? 'rgba(236, 72, 153, 0.75)'
                    : 'rgba(56, 178, 216, 0.45)'
                  : '#152E4D'
              }
              strokeWidth={nodeStates.gate === 'execution' ? 2.5 : 1.5}
              strokeDasharray={nodeStates.gate === 'execution' ? 'none' : '5,5'}
              className="transition-all duration-500"
            />

            {/* Transition/Startup sequence pulses (Framer Motion for fluid ease-out) */}
            {mode === 'execution' && (
              <>
                {activePulse === 'source-to-processor' && (
                  <motion.circle
                    r="4.5"
                    fill="#38B2D8"
                    initial={{ cx: 150, cy: 110 }}
                    animate={{ cx: 160, cy: 130 }}
                    transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
                    style={{ filter: "drop-shadow(0px 0px 6px #38B2D8)" }}
                  />
                )}
                {activePulse === 'processor-to-gate' && (
                  <motion.circle
                    r="4.5"
                    fill="#1E5FBF"
                    initial={{ cx: 300, cy: 190 }}
                    animate={{ cx: 310, cy: 130 }}
                    transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
                    style={{ filter: "drop-shadow(0px 0px 6px #1E5FBF)" }}
                  />
                )}
                {activePulse === 'gate-to-destinations' && (
                  <>
                    <motion.circle
                      r="4.5"
                      fill="#10B981"
                      initial={{ cx: 450, cy: 190 }}
                      animate={{ cx: 470, cy: 50 }}
                      transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
                      style={{ filter: "drop-shadow(0px 0px 6px #10B981)" }}
                    />
                    <motion.circle
                      r="4.5"
                      fill="#EC4899"
                      initial={{ cx: 450, cy: 190 }}
                      animate={{ cx: 470, cy: 210 }}
                      transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
                      style={{ filter: "drop-shadow(0px 0px 6px #EC4899)" }}
                    />
                  </>
                )}
              </>
            )}

            {/* Glowing animated path pulses in execution mode (continuous loop once active with spline easing) */}
            {mode === 'execution' && seqStep === 7 && (
              <g key={pulseKey}>
                {/* Source to Processor Pulse */}
                <circle r="3.5" fill="#38B2D8" style={{ filter: "drop-shadow(0px 0px 4px #38B2D8)" }}>
                  <animateMotion
                    path="M 150 110 L 160 130"
                    dur="2s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.25 1 0.5 1"
                    keyTimes="0;1"
                  />
                </circle>

                {/* Processor to Gate Pulse */}
                <circle r="3.5" fill="#1E5FBF" style={{ filter: "drop-shadow(0px 0px 4px #1E5FBF)" }}>
                  <animateMotion
                    path="M 300 190 L 310 130"
                    dur="1.8s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keySplines="0.25 1 0.5 1"
                    keyTimes="0;1"
                  />
                </circle>

                {/* Approved Path Pulses */}
                {isApproved && (
                  <>
                    <circle r="3.5" fill="#10B981" style={{ filter: "drop-shadow(0px 0px 4px #10B981)" }}>
                      <animateMotion
                        path="M 450 190 L 470 50"
                        dur="1.2s"
                        repeatCount="indefinite"
                        calcMode="spline"
                        keySplines="0.25 1 0.5 1"
                        keyTimes="0;1"
                      />
                    </circle>
                    <circle r="3.5" fill="#EC4899" style={{ filter: "drop-shadow(0px 0px 4px #EC4899)" }}>
                      <animateMotion
                        path="M 450 190 L 470 210"
                        dur="1.4s"
                        repeatCount="indefinite"
                        calcMode="spline"
                        keySplines="0.25 1 0.5 1"
                        keyTimes="0;1"
                      />
                    </circle>
                  </>
                )}
              </g>
            )}
          </g>

          {/* SVG Nodes */}
          {FLOW_NODES.map((node) => {
            const Icon = node.icon;
            const isControlGate = node.id === 'gate';
            const nodeState = nodeStates[node.id];
            const strokeColor = 
              node.id === 'source' ? 'url(#card-border-source)' :
              node.id === 'processor' ? 'url(#card-border-processor)' :
              node.id === 'gate' ? (isApproved ? 'url(#card-border-gate-approved)' : 'url(#card-border-gate-pending)') :
              node.id === 'erp' ? 'url(#card-border-erp)' :
              'url(#card-border-slack)';

            return (
              <g key={node.id} className="transition-all duration-500">
                {/* Node Box */}
                {nodeState !== 'execution' ? (
                  // Blueprint / Tracing Mode: Thin dashed schematic rectangles with CAD corner ticks
                  <g>
                    {/* Corner drafting brackets */}
                    <path d={`M ${node.x - 73} ${node.y - 20} V ${node.y - 33} H ${node.x - 60}`} fill="none" stroke="rgba(56, 178, 216, 0.4)" strokeWidth="1" />
                    <path d={`M ${node.x + 60} ${node.y - 33} H ${node.x + 73} V ${node.y - 20}`} fill="none" stroke="rgba(56, 178, 216, 0.4)" strokeWidth="1" />
                    <path d={`M ${node.x - 73} ${node.y + 20} V ${node.y + 33} H ${node.x - 60}`} fill="none" stroke="rgba(56, 178, 216, 0.4)" strokeWidth="1" />
                    <path d={`M ${node.x + 60} ${node.y + 33} H ${node.x + 73} V ${node.y + 20}`} fill="none" stroke="rgba(56, 178, 216, 0.4)" strokeWidth="1" />

                    <rect
                      x={node.x - 70}
                      y={node.y - 30}
                      width="140"
                      height="60"
                      rx="4"
                      fill="#0D1B2A"
                      stroke="#152E4D"
                      strokeWidth="1.5"
                      strokeDasharray="4,3"
                    />
                    {/* Architectural coordinate markers */}
                    <circle cx={node.x} cy={node.y} r="2.5" fill="#38B2D8" />
                    <text
                      x={node.x}
                      y={node.y - 12}
                      textAnchor="middle"
                      className="font-mono text-[9px] font-semibold fill-[#38B2D8] tracking-widest"
                    >
                      {node.blueprintLabel}
                    </text>
                    <text
                      x={node.x}
                      y={node.y + 16}
                      textAnchor="middle"
                      className="font-mono text-[9px] fill-[#7A8FA6]"
                    >
                      X:{node.x} Y:{node.y}
                    </text>

                    {/* Glowing Outline Tracing Wave Animation */}
                    {nodeState === 'tracing' && (
                      <g key={node.id + '-tracing-group'}>
                        {/* Arm 1: Glow underlay */}
                        <motion.path
                          key={node.id + '-arm1-glow'}
                          d={`M ${node.x - 70} ${node.y - 30} H ${node.x + 70} V ${node.y + 30}`}
                          fill="none"
                          stroke={node.color}
                          strokeWidth="5"
                          strokeLinecap="round"
                          opacity="0.35"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                          className="blur-[2px]"
                        />
                        {/* Arm 1: Crisp line */}
                        <motion.path
                          key={node.id + '-arm1-crisp'}
                          d={`M ${node.x - 70} ${node.y - 30} H ${node.x + 70} V ${node.y + 30}`}
                          fill="none"
                          stroke={node.color}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                        />

                        {/* Arm 2: Glow underlay */}
                        <motion.path
                          key={node.id + '-arm2-glow'}
                          d={`M ${node.x - 70} ${node.y - 30} V ${node.y + 30} H ${node.x + 70}`}
                          fill="none"
                          stroke={node.color}
                          strokeWidth="5"
                          strokeLinecap="round"
                          opacity="0.35"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                          className="blur-[2px]"
                        />
                        {/* Arm 2: Crisp line */}
                        <motion.path
                          key={node.id + '-arm2-crisp'}
                          d={`M ${node.x - 70} ${node.y - 30} V ${node.y + 30} H ${node.x + 70}`}
                          fill="none"
                          stroke={node.color}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                        />

                        {/* Tracing Head 1: Glowing White Circle */}
                        <circle
                          key={node.id + '-head1'}
                          r="4.5"
                          fill="#FFFFFF"
                          style={{ filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.9))" }}
                        >
                          <animateMotion
                            path={`M ${node.x - 70} ${node.y - 30} H ${node.x + 70} V ${node.y + 30}`}
                            dur="1.5s"
                            fill="freeze"
                            calcMode="spline"
                            keySplines="0.25 1 0.5 1"
                            keyTimes="0;1"
                          />
                        </circle>

                        {/* Tracing Head 2: Glowing White Circle */}
                        <circle
                          key={node.id + '-head2'}
                          r="4.5"
                          fill="#FFFFFF"
                          style={{ filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.9))" }}
                        >
                          <animateMotion
                            path={`M ${node.x - 70} ${node.y - 30} V ${node.y + 30} H ${node.x + 70}`}
                            dur="1.5s"
                            fill="freeze"
                            calcMode="spline"
                            keySplines="0.25 1 0.5 1"
                            keyTimes="0;1"
                          />
                        </circle>
                      </g>
                    )}
                  </g>
                ) : (
                  // Execution Mode: Full glassmorphic card elements with fading gradient borders
                  <g>
                    {/* Card Body */}
                    <rect
                      x={node.x - 70}
                      y={node.y - 30}
                      width="140"
                      height="60"
                      rx="12"
                      fill="rgba(11, 22, 38, 0.92)"
                      stroke={strokeColor}
                      strokeWidth="1.5"
                      className="shadow-xl backdrop-blur-md transition-all duration-300"
                    />
                    
                    {/* Colored left bar for category sync */}
                    <path
                      d={`M ${node.x - 70} ${node.y - 20} A 10 10 0 0 1 ${node.x - 60} ${node.y - 30} L ${node.x - 60} ${node.y + 30} A 10 10 0 0 1 ${node.x - 70} ${node.y + 20} Z`}
                      fill={node.color}
                    />

                    {/* Node Icon */}
                    <foreignObject x={node.x - 50} y={node.y - 18} width="20" height="20">
                      <div className="text-white" style={{ color: node.color }}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                    </foreignObject>

                    {/* Node Text Label */}
                    <foreignObject x={node.x - 24} y={node.y - 20} width="90" height="40">
                      <div className="flex flex-col text-left leading-none">
                        <span className="text-[11px] font-bold text-white tracking-tight truncate">
                          {node.label}
                        </span>
                        <span className="text-[9px] text-[#A8E0F0] font-medium mt-1 truncate">
                          {node.sublabel}
                        </span>
                      </div>
                    </foreignObject>

                    {/* Approval gate status check */}
                    {isControlGate && (
                      <foreignObject x={node.x - 64} y={node.y + 12} width="128" height="15">
                        <div className="flex justify-center">
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                              isApproved
                                ? 'bg-[#10B981]/25 text-[#10B981]'
                                : 'bg-[#F59E0B]/25 text-[#F59E0B] animate-pulse'
                            }`}
                          >
                            {isApproved ? 'Approved & Locked' : 'Awaiting Action'}
                          </span>
                        </div>
                      </foreignObject>
                    )}
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating human gate controller interaction on top of SVG canvas */}
        {mode === 'execution' && nodeStates.gate === 'execution' && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-[210px] left-[322px] z-20 flex flex-col items-center gap-1.5"
            >
              <button
                onClick={handleApprove}
                disabled={isApproved}
                className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 shadow-lg ${
                  isApproved
                    ? 'bg-[#10B981]/20 border-[#10B981]/50 text-[#10B981] cursor-default'
                    : 'bg-[#F59E0B] hover:bg-[#F59E0B]/90 border-[#F59E0B]/50 text-[#0F2540] hover:scale-[1.03] active:scale-[0.98]'
                }`}
              >
                {isApproved ? (
                  <>
                    <CheckCircle className="h-3.5 w-3.5" />
                    Synced
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Approve Handoff
                  </>
                )}
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* ── Footer Information Banner ─────────────────────────────────── */}
      <div className="relative z-10 mt-6 pt-4 border-t border-[#152E4D] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#D0E4FF]">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-3.5 w-3.5 text-[#38B2D8]" />
          <span>
            {mode === 'blueprint'
              ? 'Auditing raw variables and connection nodes prior to active scripting.'
              : seqStep < 7
              ? 'Initializing systems execution sequence...'
              : 'Flow active. Click "Approve Handoff" to authorize data pipelines.'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-[#7A8FA6]">
          <span className={mode === 'blueprint' ? 'text-[#38B2D8]' : 'text-[#10B981]'}>
            ✓ Operational Mapping
          </span>
          <span className="text-[#38B2D8]">✓ Resilient Schema Validation</span>
        </div>
      </div>
    </div>
  );
}
