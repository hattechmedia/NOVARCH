'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Table2,
  Play,
  Code2,
  Sparkles,
  ShoppingCart,
  Users,
  Package,
  Cpu,
  CheckCircle,
} from 'lucide-react';

/* ─── Data Definitions ────────────────────────────────────────────── */

interface Column {
  name: string;
  type: string;
  pk?: boolean;
  fk?: boolean;
}

interface TableDef {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  columns: Column[];
  endpoint: string;
  method: 'GET' | 'POST';
  jsonOutput: string;
}

const TABLES: TableDef[] = [
  {
    id: 'users',
    label: 'Users',
    icon: Users,
    color: '#1E5FBF',
    endpoint: '/api/users',
    method: 'GET',
    columns: [
      { name: 'id', type: 'uuid', pk: true },
      { name: 'email', type: 'varchar(255)' },
      { name: 'role', type: 'user_role' },
      { name: 'created_at', type: 'timestamptz' },
    ],
    jsonOutput: `{
  "status": 200,
  "data": [
    {
      "id": "u_01j4kz...",
      "email": "alice@acme.io",
      "role": "admin",
      "created_at": "2025-03-12T09:14:00Z"
    },
    {
      "id": "u_01j4m1...",
      "email": "bob@acme.io",
      "role": "member",
      "created_at": "2025-04-01T14:22:00Z"
    }
  ],
  "total": 284
}`,
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: ShoppingCart,
    color: '#38B2D8',
    endpoint: '/api/orders',
    method: 'GET',
    columns: [
      { name: 'id', type: 'uuid', pk: true },
      { name: 'user_id', type: 'uuid', fk: true },
      { name: 'status', type: 'order_status' },
      { name: 'total', type: 'numeric(10,2)' },
      { name: 'created_at', type: 'timestamptz' },
    ],
    jsonOutput: `{
  "status": 200,
  "data": [
    {
      "id": "ord_9f3a...",
      "user_id": "u_01j4kz...",
      "status": "fulfilled",
      "total": "1240.00",
      "created_at": "2025-07-18T11:05:00Z"
    },
    {
      "id": "ord_b821...",
      "user_id": "u_01j4m1...",
      "status": "pending",
      "total": "390.50",
      "created_at": "2025-08-01T08:47:00Z"
    }
  ],
  "total": 1847
}`,
  },
  {
    id: 'products',
    label: 'Products',
    icon: Package,
    color: '#10B981',
    endpoint: '/api/products',
    method: 'GET',
    columns: [
      { name: 'id', type: 'uuid', pk: true },
      { name: 'name', type: 'varchar(120)' },
      { name: 'sku', type: 'varchar(40)' },
      { name: 'price', type: 'numeric(10,2)' },
      { name: 'stock', type: 'integer' },
    ],
    jsonOutput: `{
  "status": 200,
  "data": [
    {
      "id": "prd_cc14...",
      "name": "Enterprise Plan",
      "sku": "ENT-2025-001",
      "price": "299.00",
      "stock": null
    },
    {
      "id": "prd_fa90...",
      "name": "Pro Seat License",
      "sku": "PRO-2025-012",
      "price": "49.00",
      "stock": 500
    }
  ],
  "total": 92
}`,
  },
];

/* ─── Relations: which table pairs to draw SVG lines between ─────── */
// We'll draw lines between Users→Orders and Orders→Products using foreignObject
// Positions are computed relative to the SVG canvas (600×260)

/* ─── JSON Syntax Highlighter ─────────────────────────────────────── */
function highlightJson(raw: string): React.ReactNode[] {
  const lines = raw.split('\n');
  return lines.map((line, i) => {
    // Replace key: "value" patterns
    const rendered = line
      .replace(/("[\w_]+")\s*:/g, '<key>$1</key>:')
      .replace(/:\s*("[\w@./:\-]+")/g, ': <str>$1</str>')
      .replace(/:\s*(\d[\d.,]*)/g, ': <num>$1</num>')
      .replace(/:\s*(null|true|false)/g, ': <bool>$1</bool>')
      .replace(/[{}[\]]/g, '<bracket>$&</bracket>');

    // Parse out the fake tags and render spans
    const parts = rendered.split(/(<key>.*?<\/key>|<str>.*?<\/str>|<num>.*?<\/num>|<bool>.*?<\/bool>|<bracket>.*?<\/bracket>)/);

    return (
      <div key={i} className="leading-[1.6]">
        {parts.map((part, j) => {
          if (part.startsWith('<key>')) {
            return <span key={j} className="text-[#38B2D8]">{part.replace(/<\/?key>/g, '')}</span>;
          } else if (part.startsWith('<str>')) {
            return <span key={j} className="text-[#10B981]">{part.replace(/<\/?str>/g, '')}</span>;
          } else if (part.startsWith('<num>')) {
            return <span key={j} className="text-[#F59E0B]">{part.replace(/<\/?num>/g, '')}</span>;
          } else if (part.startsWith('<bool>')) {
            return <span key={j} className="text-[#EC4899]">{part.replace(/<\/?bool>/g, '')}</span>;
          } else if (part.startsWith('<bracket>')) {
            return <span key={j} className="text-[#7A8FA6]">{part.replace(/<\/?bracket>/g, '')}</span>;
          }
          return <span key={j} className="text-[#D0E4FF]">{part}</span>;
        })}
      </div>
    );
  });
}

/* ─── Table Card Component ────────────────────────────────────────── */
function TableCard({
  table,
  isActive,
  onClick,
}: {
  table: TableDef;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = table.icon;
  return (
    <motion.button
      onClick={onClick}
      animate={{
        borderColor: isActive ? table.color : 'rgba(21, 46, 77, 0.8)',
        backgroundColor: isActive ? '#0F2540' : '#0D1B2A',
        boxShadow: isActive
          ? `0 0 20px ${table.color}40, 0 4px 12px rgba(0,0,0,0.4)`
          : '0 2px 8px rgba(0,0,0,0.3)',
      }}
      transition={{ duration: 0.25 }}
      className="relative w-full rounded-xl border text-left overflow-hidden transition-colors duration-200 hover:bg-[#0F2540] cursor-pointer"
      style={{ borderColor: isActive ? table.color : 'rgba(21, 46, 77, 0.8)' }}
    >
      {/* Active left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        animate={{ backgroundColor: isActive ? table.color : 'transparent' }}
        transition={{ duration: 0.2 }}
      />

      {/* Header */}
      <div className="flex items-center gap-2.5 px-3.5 pt-3 pb-2 pl-4">
        <div
          className="flex items-center justify-center h-7 w-7 rounded-lg flex-shrink-0 transition-colors"
          style={{ backgroundColor: `${table.color}25`, color: table.color }}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold text-white block leading-none">{table.label}</span>
          <span className="text-[9px] font-mono text-[#7A8FA6] leading-none mt-0.5 block">
            {table.endpoint}
          </span>
        </div>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-shrink-0"
          >
            <CheckCircle className="h-3.5 w-3.5" style={{ color: table.color }} />
          </motion.div>
        )}
      </div>

      {/* Columns */}
      <div className="px-4 pb-3 pl-5 space-y-0.5">
        {table.columns.map((col) => (
          <div key={col.name} className="flex items-center gap-2 text-[9px] font-mono">
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: col.pk ? '#F59E0B' : col.fk ? '#38B2D8' : '#7A8FA6' }} />
            <span className={`font-semibold ${col.pk ? 'text-[#F59E0B]' : col.fk ? 'text-[#38B2D8]' : 'text-[#D0E4FF]'}`}>
              {col.name}
            </span>
            <span className="text-[#7A8FA6] truncate">{col.type}</span>
            {col.pk && <span className="text-[#F59E0B]/80 font-bold ml-auto">PK</span>}
            {col.fk && <span className="text-[#38B2D8]/80 font-bold ml-auto">FK</span>}
          </div>
        ))}
      </div>
    </motion.button>
  );
}

/* ─── Main Animation Component ────────────────────────────────────── */
export function CustomSoftwareAnimation() {
  const [activeTableIndex, setActiveTableIndex] = React.useState<number>(0);
  const [queryState, setQueryState] = React.useState<'idle' | 'querying' | 'result'>('idle');
  const [pulseKey, setPulseKey] = React.useState(0);

  const activeTable = TABLES[activeTableIndex] ?? TABLES[0];
  const activeTableId = activeTable.id;

  // ── Auto-Loop Sequence ───────────────────────────────────────────
  // 1. Table highlighted in 'idle' -> triggers 'querying' after 600ms
  // 2. 'querying' runs packet animation -> triggers 'result' after 1300ms
  // 3. 'result' shows JSON -> after 3200ms advances to next table in 'idle'
  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (queryState === 'idle') {
      timer = setTimeout(() => {
        setQueryState('querying');
        setPulseKey((k) => k + 1);
      }, 600);
    } else if (queryState === 'querying') {
      timer = setTimeout(() => {
        setQueryState('result');
      }, 1300);
    } else if (queryState === 'result') {
      timer = setTimeout(() => {
        setActiveTableIndex((prev) => (prev + 1) % TABLES.length);
        setQueryState('idle');
      }, 3200);
    }

    return () => clearTimeout(timer);
  }, [queryState, activeTableIndex]);

  // Manual Table Click Override
  const handleSelectTable = (id: string) => {
    const targetIdx = TABLES.findIndex((t) => t.id === id);
    if (targetIdx === -1) return;
    setActiveTableIndex(targetIdx);
    setQueryState('querying');
    setPulseKey((k) => k + 1);
  };

  // Manual Run Query Button Click Override
  const handleRunQuery = () => {
    setQueryState('querying');
    setPulseKey((k) => k + 1);
  };

  const isQuerying = queryState === 'querying';
  const hasResult = queryState === 'result';

  return (
    <div className="relative w-full rounded-2xl bg-[#0F2540] border border-[#152E4D] p-4 sm:p-5 shadow-2xl shadow-[#0D1B2A]/40 overflow-hidden text-white min-h-[560px] flex flex-col justify-between select-none">
      {/* Background grid + glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E5FBF_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#1E5FBF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#38B2D8]/15 rounded-full blur-3xl pointer-events-none" />

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#152E4D]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#1E5FBF]/30 text-[#38B2D8] border border-[#38B2D8]/40">
            <Database className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D0E4FF] block leading-none">
              API QUERY SIMULATOR
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#0D1B2A]/80 border border-[#152E4D] px-3 py-1.5 rounded-full backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[10px] font-mono font-semibold text-[#D0E4FF]">
            PostgreSQL · REST API
          </span>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-5 flex-1">

        {/* Left: DB Schema Tables */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#7A8FA6]">
              <Table2 className="inline h-3 w-3 mr-1 text-[#38B2D8]" />
              Database Schema
            </span>
            <span className="text-[10px] font-mono text-[#38B2D8]">3 tables · 14 cols</span>
          </div>

          {/* Relation SVG overlay */}
          <div className="relative space-y-2.5">
            {/* Relation connector line */}
            <div className="hidden lg:block absolute -right-2.5 top-[38px] bottom-[38px] w-px border-l border-dashed border-[#152E4D] z-0" />

            {TABLES.map((table) => (
              <div key={table.id} className="relative">
                <TableCard
                  table={table}
                  isActive={activeTableId === table.id}
                  onClick={() => handleSelectTable(table.id)}
                />
                {/* FK connector stub on right side */}
                {table.id !== 'products' && (
                  <div
                    className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 items-center gap-0.5 translate-x-full pl-1 pointer-events-none"
                  >
                    <div className="w-2 h-px bg-[#152E4D]" />
                    <div className="h-1 w-1 rounded-full bg-[#38B2D8]/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Query Runner + Output */}
        <div className="lg:col-span-7 flex flex-col gap-4">

          {/* Query Builder */}
          <div className="rounded-xl bg-[#0D1B2A] border border-[#152E4D] p-3.5 sm:p-4">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Cpu className="h-3.5 w-3.5 text-[#38B2D8]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#7A8FA6]">
                  Query Builder
                </span>
              </div>
              <span className="text-[9px] font-mono text-cyan-400/80">
                Auto-executing
              </span>
            </div>

            {/* Endpoint display */}
            <div className="flex items-center gap-2 bg-[#0F2540] border border-[#152E4D] rounded-lg px-3 py-2 mb-3 font-mono text-xs">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeTable.method}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="font-bold text-[#10B981] flex-shrink-0"
                >
                  {activeTable.method}
                </motion.span>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeTable.endpoint}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  className="text-[#D0E4FF] font-semibold"
                >
                  {activeTable.endpoint}
                </motion.span>
              </AnimatePresence>
              <span className="ml-auto text-[#7A8FA6] text-[10px]">?limit=2&order=desc</span>
            </div>

            {/* Run button */}
            <motion.button
              onClick={handleRunQuery}
              whileHover={{ scale: isQuerying ? 1 : 1.01 }}
              whileTap={{ scale: isQuerying ? 1 : 0.99 }}
              disabled={isQuerying}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                isQuerying
                  ? 'bg-[#1E5FBF] border border-[#38B2D8] text-white shadow-lg shadow-[#1E5FBF]/50 cursor-default'
                  : 'bg-[#1E5FBF] hover:bg-[#2B6FD4] border border-[#1E5FBF] text-white shadow-md shadow-[#1E5FBF]/30 cursor-pointer'
              }`}
            >
              {isQuerying ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#38B2D8]" />
                  </motion.div>
                  <span>Running Query…</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Run Query</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Output Panel — strictly stable height with zero layout shift / jerk */}
          <div className="rounded-xl bg-[#0D1B2A] border border-[#152E4D] overflow-hidden flex flex-col h-[280px]">
            {/* Output header */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-[#152E4D] bg-[#0F2540]/60 h-9">
              <div className="flex items-center gap-2">
                <Code2 className="h-3.5 w-3.5 text-[#38B2D8]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#7A8FA6]">
                  Response Output
                </span>
              </div>
              <AnimatePresence mode="wait">
                {hasResult ? (
                  <motion.span
                    key="ok"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30"
                  >
                    <CheckCircle className="h-2.5 w-2.5" /> 200 OK
                  </motion.span>
                ) : isQuerying ? (
                  <motion.span
                    key="querying-badge"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#1E5FBF]/20 text-[#38B2D8] border border-[#38B2D8]/30 animate-pulse"
                  >
                    Executing…
                  </motion.span>
                ) : (
                  <span className="text-[9px] font-mono text-[#7A8FA6]">
                    Ready
                  </span>
                )}
              </AnimatePresence>
            </div>

            {/* Output body — fixed height container with smooth scrolling */}
            <div className="h-[244px] p-3.5 font-mono text-[10.5px] leading-relaxed overflow-y-auto relative custom-scrollbar">
              <AnimatePresence mode="wait">
                {queryState === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center h-full text-center gap-2"
                  >
                    <div className="relative">
                      <Database className="h-8 w-8 text-[#152E4D]" />
                      <div className="absolute inset-0 bg-[#38B2D8]/10 rounded-full blur-md" />
                    </div>
                    <p className="text-[10px] text-[#7A8FA6] font-mono max-w-[200px]">
                      Selecting <span style={{ color: activeTable.color }} className="font-bold">{activeTable.label}</span>… Auto-running query.
                    </p>
                  </motion.div>
                )}

                {isQuerying && (
                  <motion.div
                    key="querying"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center h-full gap-3"
                  >
                    {/* Animated packet flow */}
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-2.5 w-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                        style={{ backgroundColor: activeTable.color, color: activeTable.color }}
                      />
                      <motion.div
                        className="h-0.5 w-20 bg-gradient-to-r from-transparent via-current to-transparent"
                        style={{ color: activeTable.color }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                      <div className="p-1.5 rounded-lg bg-[#0F2540] border border-[#152E4D]">
                        <Database className="h-4 w-4 text-[#38B2D8] animate-pulse" />
                      </div>
                      <motion.div
                        className="h-0.5 w-20 bg-gradient-to-r from-transparent via-current to-transparent"
                        style={{ color: activeTable.color }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
                      />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                    </div>
                    <p className="text-[10px] text-[#D0E4FF] font-mono animate-pulse">
                      Fetching <span style={{ color: activeTable.color }} className="font-semibold">{activeTable.endpoint}</span>…
                    </p>
                  </motion.div>
                )}

                {hasResult && (
                  <motion.div
                    key={`result-${activeTableId}-${pulseKey}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="pb-2"
                  >
                    {highlightJson(activeTable.jsonOutput)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomSoftwareAnimation;
