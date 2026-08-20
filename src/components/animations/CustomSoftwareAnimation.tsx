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
        boxShadow: isActive
          ? `0 0 20px ${table.color}40, 0 4px 12px rgba(0,0,0,0.4)`
          : '0 2px 8px rgba(0,0,0,0.3)',
      }}
      transition={{ duration: 0.25 }}
      className="relative w-full rounded-xl bg-[#0D1B2A] border text-left overflow-hidden transition-all duration-200 hover:bg-[#0F2540] cursor-pointer"
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
          className="flex items-center justify-center h-7 w-7 rounded-lg flex-shrink-0"
          style={{ backgroundColor: `${table.color}20`, color: table.color }}
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
  const [activeTableId, setActiveTableId] = React.useState<string>('orders');
  const [isQuerying, setIsQuerying] = React.useState(false);
  const [hasResult, setHasResult] = React.useState(false);
  const [pulseKey, setPulseKey] = React.useState(0);

  const activeTable = TABLES.find((t) => t.id === activeTableId) ?? TABLES[0];

  // When switching table, reset result state
  const handleSelectTable = (id: string) => {
    if (id === activeTableId) return;
    setActiveTableId(id);
    setHasResult(false);
    setIsQuerying(false);
  };

  const handleRunQuery = () => {
    if (isQuerying) return;
    setIsQuerying(true);
    setHasResult(false);
    setPulseKey((k) => k + 1);
    setTimeout(() => {
      setIsQuerying(false);
      setHasResult(true);
    }, 1800);
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#0F2540] border border-[#152E4D] p-4 sm:p-5 shadow-2xl shadow-[#0D1B2A]/40 overflow-hidden text-white min-h-[420px] flex flex-col">
      {/* Background grid + glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E5FBF_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#1E5FBF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#38B2D8]/15 rounded-full blur-3xl pointer-events-none" />

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-[#152E4D]">
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
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#7A8FA6]">
              <Table2 className="inline h-3 w-3 mr-1 text-[#38B2D8]" />
              Database Schema
            </span>
            <span className="text-[10px] font-mono text-[#38B2D8]">3 tables · 14 cols</span>
          </div>

          {/* Relation SVG overlay (sits on top, purely decorative) */}
          <div className="relative">
            {/* Thin relation lines drawn as horizontal spans between cards */}
            <div className="hidden lg:block absolute -right-2.5 top-[38px] bottom-[38px] w-px border-l border-dashed border-[#152E4D] z-0" />

            {TABLES.map((table) => (
              <div key={table.id} className="mb-3 last:mb-0 relative">
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
          <div className="rounded-xl bg-[#0D1B2A] border border-[#152E4D] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="h-3.5 w-3.5 text-[#38B2D8]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#7A8FA6]">
                Query Builder
              </span>
            </div>

            {/* Endpoint display */}
            <div className="flex items-center gap-2 bg-[#0F2540] border border-[#152E4D] rounded-lg px-3 py-2.5 mb-4 font-mono text-xs">
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
                  className="text-[#D0E4FF]"
                >
                  {activeTable.endpoint}
                </motion.span>
              </AnimatePresence>
              <span className="ml-auto text-[#7A8FA6] text-[10px]">?limit=2&order=desc</span>
            </div>

            {/* Run button */}
            <motion.button
              onClick={handleRunQuery}
              whileHover={{ scale: isQuerying ? 1 : 1.02 }}
              whileTap={{ scale: isQuerying ? 1 : 0.98 }}
              disabled={isQuerying}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                isQuerying
                  ? 'bg-[#1E5FBF]/50 border border-[#1E5FBF]/40 text-[#D0E4FF] cursor-default'
                  : 'bg-[#1E5FBF] hover:bg-[#2B6FD4] border border-[#1E5FBF] text-white shadow-lg shadow-[#1E5FBF]/30 cursor-pointer'
              }`}
            >
              {isQuerying ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                  </motion.div>
                  Running Query…
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" />
                  Run Query
                </>
              )}
            </motion.button>
          </div>

          {/* Output Panel */}
          <div className="flex-1 min-h-0 rounded-xl bg-[#0D1B2A] border border-[#152E4D] overflow-hidden flex flex-col">
            {/* Output header */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-[#152E4D] bg-[#0F2540]/60">
              <div className="flex items-center gap-2">
                <Code2 className="h-3.5 w-3.5 text-[#38B2D8]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#7A8FA6]">
                  Response Output
                </span>
              </div>
              <AnimatePresence>
                {hasResult && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30"
                  >
                    <CheckCircle className="h-2.5 w-2.5" /> 200 OK
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Output body — fixed height, scrollable */}
            <div className="flex-1 min-h-0 p-4 font-mono text-[11px] leading-relaxed overflow-y-auto">
              <AnimatePresence mode="wait">
                {!hasResult && !isQuerying && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[100px] text-center gap-2"
                  >
                    <Database className="h-8 w-8 text-[#152E4D]" />
                    <p className="text-[10px] text-[#7A8FA6] font-mono">
                      Select a table and click <span className="text-[#38B2D8]">Run Query</span> to see live output.
                    </p>
                  </motion.div>
                )}

                {isQuerying && (
                  <motion.div
                    key="querying"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[100px] gap-3"
                  >
                    {/* Animated packet flow */}
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: activeTable.color }}
                      />
                      <motion.div
                        className="h-px w-24 bg-gradient-to-r from-transparent via-current to-transparent"
                        style={{ color: activeTable.color }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      <Database className="h-4 w-4 text-[#1E5FBF]" />
                      <motion.div
                        className="h-px w-24 bg-gradient-to-r from-transparent via-current to-transparent"
                        style={{ color: activeTable.color }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      />
                      <div className="h-2 w-2 rounded-full bg-[#10B981]" />
                    </div>
                    <p className="text-[10px] text-[#7A8FA6] font-mono animate-pulse">
                      Querying <span style={{ color: activeTable.color }}>{activeTable.endpoint}</span>…
                    </p>
                  </motion.div>
                )}

                {hasResult && (
                  <motion.div
                    key={`result-${activeTableId}-${pulseKey}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
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
