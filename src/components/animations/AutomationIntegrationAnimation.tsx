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
    x: 520,
    y: 80,
    icon: Database,
    color: '#3B82F6',
  },
  {
    id: 'slack',
    label: 'Slack Alerts',
    sublabel: 'Operational log',
    blueprintLabel: 'DEST_LOG_SLACK',
    x: 520,
    y: 240,
    icon: MessageSquare,
    color: '#EC4899',
  },
];

export function AutomationIntegrationAnimation() {
  const [mode, setMode] = React.useState<Mode>('blueprint');
  const [isApproved, setIsApproved] = React.useState<boolean>(false);
  const [pulseKey, setPulseKey] = React.useState<number>(0);

  // Auto trigger pulse flow in execution mode
  React.useEffect(() => {
    if (mode === 'execution') {
      const interval = setInterval(() => {
        setPulseKey((k) => k + 1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  const handleApprove = () => {
    setIsApproved(true);
    // Auto-reset approval after 4 seconds
    setTimeout(() => {
      setIsApproved(false);
    }, 4000);
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#0F2540] border border-[#152E4D] p-6 sm:p-8 shadow-2xl shadow-[#0D1B2A]/40 overflow-hidden text-white min-h-[440px] flex flex-col justify-between">
      {/* Background grid pattern & glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E5FBF_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#1E5FBF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#38B2D8]/20 rounded-full blur-3xl pointer-events-none" />

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
                ? 'bg-[#1E5FBF] text-white shadow-md'
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
        <svg className="w-[600px] h-[300px] block" viewBox="0 0 600 300">
          {/* SVG Connection Paths */}
          <g>
            {/* Source to Processor */}
            <path
              d="M 150 110 L 230 160"
              fill="none"
              stroke={mode === 'blueprint' ? '#152E4D' : 'rgba(56, 178, 216, 0.45)'}
              strokeWidth={mode === 'blueprint' ? 1.5 : 2.5}
              strokeDasharray={mode === 'blueprint' ? '5,5' : 'none'}
              className="transition-colors duration-500"
            />
            {/* Processor to Gate */}
            <path
              d="M 310 160 L 380 160"
              fill="none"
              stroke={mode === 'blueprint' ? '#152E4D' : 'rgba(56, 178, 216, 0.45)'}
              strokeWidth={mode === 'blueprint' ? 1.5 : 2.5}
              strokeDasharray={mode === 'blueprint' ? '5,5' : 'none'}
              className="transition-colors duration-500"
            />
            {/* Gate to ERP */}
            <path
              d="M 460 160 L 520 110"
              fill="none"
              stroke={
                mode === 'blueprint'
                  ? '#152E4D'
                  : isApproved
                  ? 'rgba(16, 185, 129, 0.75)'
                  : 'rgba(21, 46, 77, 0.6)'
              }
              strokeWidth={mode === 'blueprint' ? 1.5 : 2.5}
              strokeDasharray={mode === 'blueprint' ? '5,5' : 'none'}
              className="transition-colors duration-500"
            />
            {/* Gate to Slack */}
            <path
              d="M 460 160 L 520 210"
              fill="none"
              stroke={
                mode === 'blueprint'
                  ? '#152E4D'
                  : isApproved
                  ? 'rgba(236, 72, 153, 0.75)'
                  : 'rgba(21, 46, 77, 0.6)'
              }
              strokeWidth={mode === 'blueprint' ? 1.5 : 2.5}
              strokeDasharray={mode === 'blueprint' ? '5,5' : 'none'}
              className="transition-colors duration-500"
            />

            {/* Glowing animated path pulses in execution mode */}
            {mode === 'execution' && (
              <g key={pulseKey}>
                {/* Source to Processor Pulse */}
                <circle r="3.5" fill="#38B2D8" className="shadow-lg shadow-[#38B2D8]">
                  <animateMotion
                    path="M 150 110 L 230 160"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Processor to Gate Pulse */}
                <circle r="3.5" fill="#1E5FBF">
                  <animateMotion
                    path="M 310 160 L 380 160"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Approved Path Pulses */}
                {isApproved && (
                  <>
                    <circle r="3.5" fill="#10B981">
                      <animateMotion
                        path="M 460 160 L 520 110"
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle r="3.5" fill="#EC4899">
                      <animateMotion
                        path="M 460 160 L 520 210"
                        dur="1.4s"
                        repeatCount="indefinite"
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

            return (
              <g key={node.id} className="transition-all duration-500">
                {/* Node Box */}
                {mode === 'blueprint' ? (
                  // Blueprint: Thin dashed schematic rectangles
                  <g>
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
                  </g>
                ) : (
                  // Execution: Full glassmorphic card elements
                  <g>
                    {/* Drop shadow overlay */}
                    <rect
                      x={node.x - 70}
                      y={node.y - 30}
                      width="140"
                      height="60"
                      rx="12"
                      fill="rgba(15, 37, 64, 0.95)"
                      stroke={
                        isControlGate
                          ? isApproved
                            ? '#10B981'
                            : '#F59E0B'
                          : 'rgba(56, 178, 216, 0.3)'
                      }
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
        {mode === 'execution' && (
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
