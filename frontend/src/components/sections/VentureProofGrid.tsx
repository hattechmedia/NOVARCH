'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, ArrowUpRight } from 'lucide-react';
import type { VentureProof } from '@/types/founder';

interface VentureProofGridProps {
  ventures: VentureProof[];
}

function VentureCard({
  v,
  idx,
}: {
  v: VentureProof;
  idx: number;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 95%', 'end 5%'],
  });

  // Determine slide direction: 0=left, 1=center/bottom, 2=right
  const col = idx % 3;
  const xStart = col === 0 ? -80 : col === 2 ? 80 : 0;
  const yStart = col === 1 ? 60 : 0;

  const x = useTransform(scrollYProgress, [0.0, 0.25, 0.75, 1.0], [xStart, 0, 0, xStart]);
  const y = useTransform(scrollYProgress, [0.0, 0.25, 0.75, 1.0], [yStart, 0, 0, yStart]);
  const opacity = useTransform(scrollYProgress, [0.0, 0.25, 0.75, 1.0], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      className="h-full flex flex-col"
      style={{ x, y, opacity }}
    >
      <div className="h-full flex flex-col rounded-2xl border border-border bg-surface-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue/10 hover:-translate-y-1 hover:border-blue/50">
        {/* Top Preview */}
        {v.image ? (
          <div className="relative w-full aspect-[16/10] border-b border-border bg-surface-2 overflow-hidden">
            <Image
              src={v.image}
              alt={`${v.name} — illustrative dashboard`}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-top transition-transform duration-300 hover:scale-105"
            />
            {v.isSample && (
              <span className="absolute top-3 left-3 rounded-md bg-navy/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border border-white/10 shadow-sm">
                Illustrative Sample
              </span>
            )}
          </div>
        ) : (
          <div className="w-full aspect-[16/10] border-b border-border bg-[#0B132B] p-4 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] font-mono text-cyan">
              <span className="flex items-center gap-1.5 font-bold">
                <Terminal className="h-3.5 w-3.5 text-cyan" />
                RaabtaDesk Monorepo
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                ACTUAL BUILD
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono text-text-light my-auto">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white font-semibold">Web Dashboard:</span>
                <span className="text-cyan">Next.js 14 / React 18</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white font-semibold">Mobile App:</span>
                <span className="text-cyan">Expo Router / React Native</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white font-semibold">Auth &amp; RLS:</span>
                <span className="text-emerald-400">Supabase Workspace Auth</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono text-text-muted">
              <span>Lead Pipeline: 186 Inquiries</span>
              <span className="text-blue font-bold">Live Production App</span>
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 sm:p-7 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3 gap-2">
            <h3 className="text-xl font-bold text-text">{v.name}</h3>
            <span className="text-xs text-text-light font-mono font-semibold px-2 py-0.5 rounded bg-surface-2 border border-border">
              {v.period}
            </span>
          </div>

          <p className="text-sm text-white leading-relaxed mb-5 flex-1">
            {v.description}
          </p>

          {/* Tech Stack / Tags */}
          {v.techStack ? (
            <div className="mb-5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-text-light mb-2">
                Engineering Architecture:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {v.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md bg-blue/10 px-2 py-0.5 text-[11px] font-mono text-blue font-semibold border border-blue/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ) : v.tags ? (
            <div className="mb-5">
              <p className="text-[11px] font-mono uppercase tracking-wider text-text-light mb-2">
                Core Operational Focus:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {v.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-surface-2 px-2 py-0.5 text-[11px] font-mono text-text-muted border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* Links */}
          <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
            {v.liveUrl && (
              <a
                href={v.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue hover:text-cyan hover:underline transition-colors"
              >
                {v.name === 'RaabtaDesk' ? 'Launch Live App' : 'Visit Website'}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function VentureProofGrid({ ventures }: VentureProofGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
      {ventures.map((v, idx) => (
        <VentureCard key={v.name} v={v} idx={idx} />
      ))}
    </div>
  );
}
