'use client';

import * as React from 'react';
import { motion, useTransform, useReducedMotion, MotionValue } from 'framer-motion';

interface DNAanimationProps {
  scrollYProgress: MotionValue<number>;
  orbitEnabled?: boolean;
  height?: number;
}

const RUNG_SPACING = 55; // Distance between DNA rungs in px

// --- Geometry: evaluate cubic Bézier ---
const cubic = (p0: number, p1: number, p2: number, p3: number, t: number) => {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
};

// Generates SVG wave path for height H
function generateWavePath(height: number, mirror: boolean): string {
  const segmentH = 400;
  const numSegs = Math.max(2, Math.ceil(height / segmentH));
  let path = 'M 60 0';

  for (let i = 0; i < numSegs; i++) {
    const yStart = i * segmentH;
    const yEnd = Math.min((i + 1) * segmentH, height);
    const segFraction = (yEnd - yStart) / segmentH;
    
    const isRight = mirror ? i % 2 === 1 : i % 2 === 0;
    const cpX = isRight ? 120 : 0;
    const cpY1 = yStart + 120 * segFraction;
    const cpY2 = yStart + 280 * segFraction;

    path += ` C ${cpX} ${cpY1}, ${cpX} ${cpY2}, 60 ${yEnd}`;
  }

  return path;
}

// X coordinate at progress t in [0, 1]
const strandX = (t: number, mirror: boolean, height: number) => {
  const clamped = Math.min(Math.max(t, 0), 1);
  const segmentH = 400;
  const totalY = clamped * height;
  const segIndex = Math.floor(totalY / segmentH);
  const segYStart = segIndex * segmentH;
  const lt = Math.min(Math.max((totalY - segYStart) / segmentH, 0), 1);

  const isRight = mirror ? segIndex % 2 === 1 : segIndex % 2 === 0;
  const ctrl = isRight ? [60, 120, 120, 60] : [60, 0, 0, 60];
  return cubic(ctrl[0], ctrl[1], ctrl[2], ctrl[3], lt);
};

// Individual Rung Component
function Rung({
  y,
  height,
  scrollYProgress,
}: {
  y: number;
  height: number;
  scrollYProgress: MotionValue<number>;
}) {
  const t = y / height;
  const opacity = useTransform(
    scrollYProgress,
    [t - 0.12, t, t + 0.15, t + 0.3],
    [0.1, 0.95, 0.3, 0.1]
  );

  const x1 = strandX(t, false, height);
  const x2 = strandX(t, true, height);

  return (
    <motion.line
      x1={x1}
      y1={y}
      x2={x2}
      y2={y}
      stroke="url(#dna-rung-grad)"
      strokeWidth="1.5"
      strokeLinecap="round"
      style={{ opacity }}
    />
  );
}

export function DNAanimation({
  scrollYProgress,
  orbitEnabled = true,
  height = 800,
}: DNAanimationProps) {
  const reduceMotion = useReducedMotion();
  const idle = orbitEnabled && !reduceMotion;

  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, height]);

  const dotX1 = useTransform(scrollYProgress, (t) => strandX(t, false, height));
  const dotX2 = useTransform(scrollYProgress, (t) => strandX(t, true, height));

  const wavePath1 = React.useMemo(() => generateWavePath(height, false), [height]);
  const wavePath2 = React.useMemo(() => generateWavePath(height, true), [height]);

  const rungCount = Math.max(6, Math.floor(height / RUNG_SPACING));
  const rungs = React.useMemo(() => {
    return Array.from({ length: rungCount }, (_, i) =>
      Math.round((height / (rungCount + 1)) * (i + 1))
    );
  }, [height, rungCount]);

  return (
    <div
      className="relative w-[120px] pointer-events-none select-none"
      style={{ height: `${height}px` }}
    >
      <svg
        width="120"
        height={height}
        viewBox={`0 0 120 ${height}`}
        fill="none"
        className="absolute inset-0 z-10"
      >
        <defs>
          {/* Novarch Brand Blue / Cyan Gradients */}
          <linearGradient id="dna-wave-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E5FBF" />
            <stop offset="50%" stopColor="#38B2D8" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>

          <linearGradient id="dna-wave-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38B2D8" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          <linearGradient id="dna-rung-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E5FBF" />
            <stop offset="50%" stopColor="#38B2D8" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          <linearGradient id="dna-mask-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="black" />
            <stop offset="40%" stopColor="#333" />
            <stop offset="85%" stopColor="white" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>

          <mask id="dna-reveal-mask">
            <motion.rect
              x="-20"
              y={useTransform(lineHeight, (h) => h - height)}
              width="160"
              height={height}
              fill="url(#dna-mask-grad)"
            />
          </mask>
        </defs>

        {/* Ghost background paths (subtle structural baseline) */}
        <path
          d={wavePath1}
          fill="none"
          stroke="rgba(56, 178, 216, 0.12)"
          strokeWidth="1.5"
        />
        <path
          d={wavePath2}
          fill="none"
          stroke="rgba(30, 95, 191, 0.12)"
          strokeWidth="1.5"
        />

        {/* DNA Connecting Rungs */}
        {rungs.map((y) => (
          <Rung
            key={y}
            y={y}
            height={height}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Revealed Active Glowing Strands */}
        <g mask="url(#dna-reveal-mask)">
          {/* Outer glow halos */}
          <path
            d={wavePath1}
            fill="none"
            stroke="rgba(56, 178, 216, 0.35)"
            strokeWidth="7"
            strokeLinecap="round"
            className="blur-sm"
          />
          <path
            d={wavePath2}
            fill="none"
            stroke="rgba(30, 95, 191, 0.35)"
            strokeWidth="7"
            strokeLinecap="round"
            className="blur-sm"
          />

          {/* Crisp Primary Paths */}
          <path
            d={wavePath1}
            fill="none"
            stroke="url(#dna-wave-grad-1)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={wavePath2}
            fill="none"
            stroke="url(#dna-wave-grad-2)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Floating Ambient Tech Particles */}
      {idle &&
        [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#38B2D8]/70 z-0"
            style={{
              top: `${12 + i * 15}%`,
              left: `${25 + (i % 3) * 25}%`,
              boxShadow: '0 0 6px rgba(56, 178, 216, 0.8)',
            }}
            animate={{ y: [0, -14, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

      {/* Leading Energy Orb 1 */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-white border-2 border-[#1E5FBF] shadow-[0_0_20px_5px_rgba(30,95,191,0.9)] z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ top: lineHeight, left: dotX1 }}
      >
        {idle && (
          <div className="absolute inset-0 rounded-full bg-[#38B2D8] animate-ping opacity-70" />
        )}
      </motion.div>

      {/* Leading Energy Orb 2 */}
      <motion.div
        className="absolute w-3.5 h-3.5 rounded-full bg-white border-2 border-[#38B2D8] shadow-[0_0_20px_5px_rgba(56,178,216,0.9)] z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ top: lineHeight, left: dotX2 }}
      >
        {idle && (
          <div className="absolute inset-0 rounded-full bg-[#2563EB] animate-ping opacity-70" />
        )}
      </motion.div>
    </div>
  );
}

export default DNAanimation;
