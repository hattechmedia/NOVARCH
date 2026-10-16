'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  ShieldCheck,
  QrCode,
  ExternalLink,
  Smartphone,
  Laptop,
  Lock,
  Server,
  Zap,
  Target,
  Search,
  Code2,
  Flag,
  ArrowRight,
  Box,
  Radio,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { HACKTHEFLAG_CHALLENGE_URL } from '@/lib/constants';

// Exact crisp SVG path generated with Error Correction Level H and 4-module quiet zone (41x41 grid)
const QR_SVG_PATH =
  'M4 4.5h7m1 0h3m4 0h1m1 0h2m1 0h2m1 0h2m1 0h7M4 5.5h1m5 0h1m1 0h1m2 0h2m1 0h1m2 0h2m5 0h1m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h1m1 0h1m4 0h2m4 0h1m1 0h2m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m2 0h1m3 0h2m7 0h3m1 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m3 0h7m3 0h2m4 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m2 0h2m2 0h2m2 0h1m3 0h2m1 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h1m1 0h2m1 0h1m2 0h1m1 0h2m1 0h1m1 0h1M6 12.5h3m1 0h1m1 0h4m1 0h1m1 0h3m2 0h1m1 0h2m1 0h3m2 0h3M9 13.5h1m3 0h1m1 0h1m2 0h3m1 0h1m1 0h2m1 0h1m1 0h2m2 0h4M4 14.5h1m1 0h1m1 0h1m1 0h1m2 0h2m2 0h4m1 0h4m4 0h2m2 0h1M4 15.5h3m4 0h6m4 0h2m2 0h3m1 0h1m3 0h4M9 16.5h2m5 0h10m2 0h2m2 0h1M4 17.5h1m3 0h1m4 0h1m1 0h1m1 0h1m1 0h1m2 0h3m1 0h2m2 0h1m2 0h1m2 0h1M5 18.5h3m2 0h1m1 0h1m2 0h5m2 0h2m2 0h1m2 0h3m3 0h1M4 19.5h1m6 0h1m1 0h2m1 0h4m1 0h1m2 0h3m1 0h1m1 0h2m1 0h4M5 20.5h3m1 0h3m3 0h2m2 0h1m9 0h1m1 0h2m2 0h2M4 21.5h4m1 0h1m2 0h1m3 0h3m1 0h1m2 0h3m1 0h2m1 0h2m4 0h1M5 22.5h1m1 0h1m1 0h2m3 0h7m1 0h1m1 0h3m7 0h1M6 23.5h1m1 0h2m1 0h6m1 0h2m1 0h1m1 0h3m1 0h2m2 0h1m1 0h4M7 24.5h1m2 0h1m2 0h1m2 0h1m1 0h2m2 0h2m4 0h1m3 0h2m2 0h1M4 25.5h1m1 0h1m4 0h2m1 0h2m1 0h3m1 0h1m2 0h1m1 0h1m1 0h1m1 0h2m1 0h2m1 0h1M4 26.5h1m1 0h2m1 0h2m3 0h7m1 0h2m2 0h1m4 0h2m1 0h2M4 27.5h1m3 0h2m3 0h1m2 0h8m1 0h3m5 0h2M4 28.5h1m1 0h1m3 0h2m1 0h2m1 0h3m1 0h1m1 0h1m1 0h1m1 0h7M12 29.5h1m2 0h1m1 0h1m2 0h5m3 0h1m3 0h1m1 0h3M4 30.5h7m2 0h1m3 0h5m1 0h2m1 0h3m1 0h1m1 0h2M4 31.5h1m5 0h1m3 0h2m3 0h6m2 0h2m3 0h1m1 0h3M4 32.5h1m1 0h3m1 0h1m1 0h1m1 0h2m1 0h1m1 0h5m1 0h2m1 0h6m1 0h2M4 33.5h1m1 0h3m1 0h1m1 0h1m1 0h2m1 0h4m3 0h1m4 0h1m2 0h1m1 0h2M4 34.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m1 0h2m1 0h3m1 0h1m1 0h1m1 0h2m2 0h2M4 35.5h1m5 0h1m2 0h1m1 0h1m1 0h2m2 0h2m1 0h1m1 0h1m2 0h1m1 0h1m1 0h2M4 36.5h7m3 0h1m1 0h1m1 0h2m1 0h1m1 0h2m2 0h2m1 0h1m2 0h1m1 0h1';

/* ── Shared tokens (kept in one place so the whole page stays consistent) ── */
const eyebrow =
  'text-[11px] font-mono font-semibold text-[#38B2D8] uppercase tracking-[0.22em]';
const iconRing =
  'flex items-center justify-center rounded-full border border-[#38B2D8]/50 bg-[#1E5FBF]/10 text-[#38B2D8] shadow-[0_0_18px_rgba(56,178,216,0.18)]';
const sectionBorder = 'border-t border-white/[0.06]';

// Show the real host of the challenge URL instead of a hardcoded string
function getChallengeHost(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, '').split('/')[0];
  }
}

/* ── New: subtle motion presets shared across sections ── */
const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

/* ── New: floating ambient particles for the background ── */
function AmbientParticles() {
  // Deterministic positions so the layout is stable across renders
  const particles = [
    { left: '8%', top: '12%', size: 2, delay: 0 },
    { left: '22%', top: '70%', size: 1, delay: 0.6 },
    { left: '38%', top: '32%', size: 2, delay: 1.1 },
    { left: '55%', top: '85%', size: 1, delay: 0.3 },
    { left: '70%', top: '18%', size: 2, delay: 0.9 },
    { left: '82%', top: '60%', size: 1, delay: 1.4 },
    { left: '90%', top: '28%', size: 2, delay: 0.2 },
    { left: '14%', top: '50%', size: 1, delay: 1.7 },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#38B2D8]"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ opacity: [0, 0.55, 0], y: [0, -22, 0], scale: [1, 1.4, 1] }}
          transition={{
            duration: 6 + (i % 4),
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ── New: animated scan line for the QR card ── */
function ScanLine() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-3 right-3 h-px bg-gradient-to-r from-transparent via-[#38B2D8] to-transparent"
      style={{ filter: 'drop-shadow(0 0 6px rgba(56,178,216,0.85))' }}
      animate={{ top: ['8%', '92%', '8%'] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ── Small reusable pieces ── */
function CornerBrackets({ size = 'w-4 h-4' }: { size?: string }) {
  return (
    <>
      <span className={`absolute top-0 left-0 ${size} border-t-2 border-l-2 border-[#38B2D8]`} />
      <span className={`absolute top-0 right-0 ${size} border-t-2 border-r-2 border-[#38B2D8]`} />
      <span className={`absolute bottom-0 left-0 ${size} border-b-2 border-l-2 border-[#38B2D8]`} />
      <span className={`absolute bottom-0 right-0 ${size} border-b-2 border-r-2 border-[#38B2D8]`} />
    </>
  );
}

function SpecRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#38B2D8]/40 bg-[#1E5FBF]/15 text-[#38B2D8]">
        <Icon className="h-3 w-3" />
      </div>
      <div>
        <div className="text-[9px] font-mono font-semibold uppercase tracking-[0.2em] text-[#38B2D8]">
          {label}
        </div>
        <div className="text-xs font-semibold text-white">{value}</div>
      </div>
    </div>
  );
}

function TelemetryCell({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="group relative flex items-center gap-4 px-6 py-6 transition-colors duration-300 hover:bg-white/[0.02]"
    >
      {/* hover sweep glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 0%, rgba(56,178,216,0.10), transparent 70%)',
        }}
      />
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#38B2D8]/30 bg-[#1E5FBF]/15 text-[#38B2D8] transition-all duration-300 group-hover:border-[#38B2D8]/60 group-hover:shadow-[0_0_22px_rgba(56,178,216,0.35)]">
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#38B2D8]">
          {label}
        </div>
        <div className="mt-1 truncate text-sm font-semibold text-white">{value}</div>
        <div className="mt-0.5 text-[11px] leading-snug text-slate-400">{sub}</div>
      </div>
    </motion.div>
  );
}

function JourneyStep({
  icon: Icon,
  title,
  text,
  showArrow,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
  showArrow?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group relative px-0 py-6 md:px-7 md:py-0 first:md:pl-0"
    >
      {/* hover wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 0%, rgba(56,178,216,0.08), transparent 70%)',
        }}
      />
      <div className="relative mb-5 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.08, rotate: 3 }}
          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          className={`h-14 w-14 ${iconRing}`}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
        {showArrow && <ArrowRight className="hidden h-4 w-4 text-slate-500 md:block" />}
      </div>
      <h3 className="relative mb-2 text-base font-bold text-white">{title}</h3>
      <p className="relative text-xs leading-relaxed text-slate-300">{text}</p>
    </motion.div>
  );
}

function SafetyFeature({
  icon: Icon,
  title,
  text,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="group flex items-start gap-3 px-0 py-4 sm:px-4 sm:py-0 first:sm:pl-0"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#38B2D8]/40 bg-[#1E5FBF]/10 text-[#38B2D8] transition-all duration-300 group-hover:scale-110 group-hover:border-[#38B2D8]/70 group-hover:shadow-[0_0_18px_rgba(56,178,216,0.4)]">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xs font-semibold text-white sm:text-[13px]">{title}</div>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{text}</p>
      </div>
    </motion.div>
  );
}

/* ── New: small section heading wrapper for consistent enter animation ── */
function SectionEyebrow({ children }: { children?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`mb-3 inline-flex items-center gap-3 ${eyebrow}`}
    >
      <span className="h-px w-8 bg-[#38B2D8]/40" />
      <span>{children}</span>
      <span className="h-px w-8 bg-[#38B2D8]/40" />
    </motion.div>
  );
}

export function HackTheFlagContent() {
  const challengeHost = getChallengeHost(HACKTHEFLAG_CHALLENGE_URL);

  const handleScrollToQr = () => {
    const qrSection = document.getElementById('hero-qr-card');
    if (qrSection) {
      qrSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] pb-20 text-white selection:bg-[#38B2D8]/20 selection:text-white">
      {/* ── Background: grid + soft glows + ambient particles ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* animated conic shimmer that slowly drifts */}
        <motion.div
          className="absolute left-1/2 top-0 h-[350px] w-[700px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            background:
              'radial-gradient(closest-side, rgba(30,95,191,0.28), rgba(56,178,216,0.10), transparent)',
          }}
          animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[-10%] top-[35%] h-[400px] w-[500px] rounded-full bg-[#38B2D8]/10 blur-[140px]"
          animate={{ opacity: [0.4, 0.7, 0.4], y: [0, 14, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[-10%] h-[350px] w-[450px] rounded-full bg-[#1E5FBF]/10 blur-[140px]"
          animate={{ opacity: [0.35, 0.65, 0.35], y: [0, -12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <AmbientParticles />
        {/* top hairline */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38B2D8]/40 to-transparent" />
      </div>

      {/* ───────────── 1. HERO ───────────── */}
      <section className="relative pb-16 pt-8 lg:pb-20 lg:pt-14">
        <Container size="xl" className="relative">
          {/* Left margin accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 top-6 hidden select-none font-mono text-[10px] leading-relaxed text-slate-500/70 xl:block"
          >
            <div className="h-4 w-4 border-l-2 border-t-2 border-[#38B2D8]/50" />
            <div className="ml-[3px] mt-1 h-24 w-px bg-gradient-to-b from-[#38B2D8]/40 to-transparent" />
            <div className="mt-20 space-y-1 text-[9px] uppercase tracking-widest text-[#38B2D8]/60">
              {/* <div>RECON</div>
              <div>EXPLOIT</div>
              <div>CAPTURE</div>
              <div>FLAG</div> */}
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Left: headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start text-left lg:col-span-7"
            >
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#38B2D8]/40 bg-[#1E5FBF]/10 px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#38B2D8] shadow-sm shadow-[#38B2D8]/10 sm:text-[11px]"
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Cybersecurity Challenge</span>
                <span className="text-slate-600">|</span>
                <span className="font-normal text-slate-300">Public Entry Point •</span>
              </motion.div>

              <h1 className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[64px]">
                NOVARCH <br />
                <span className="relative inline-block text-[#38B2D8]">
                  HackTheFlag
                  <motion.span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-[#38B2D8] via-[#0084FF] to-transparent"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  />
                </span>
              </h1>

              <p className="mb-8 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Enter the official NOVARCH live cybersecurity challenge. Scan the QR code with your
                mobile device for direct entry, or launch the live environment immediately in your
                browser.
              </p>

              <div className="mb-8 flex w-full flex-wrap items-center gap-3 sm:w-auto">
                <motion.a
                  href={HACKTHEFLAG_CHALLENGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-lg bg-[#0084FF] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(0,132,255,0.55)] transition-all duration-200 hover:bg-[#0070DF] hover:shadow-[0_0_35px_rgba(0,132,255,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38B2D8] active:scale-[0.98] sm:w-auto"
                >
                  {/* sheen */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                  <Zap className="relative h-4 w-4 fill-white text-white" />
                  <span className="relative">Open Live Challenge</span>
                  <ExternalLink className="relative h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.a>

                <motion.button
                  type="button"
                  onClick={handleScrollToQr}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-slate-200 transition-all duration-200 hover:border-[#38B2D8]/50 hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38B2D8] sm:w-auto"
                >
                  <QrCode className="h-4 w-4 text-[#38B2D8]" />
                  <span>Scan QR Code</span>
                </motion.button>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#38B2D8]" />
                  No-Install Required
                </span>
                <span className="hidden h-3 w-px bg-white/15 sm:inline-block" />
                <span className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-[#38B2D8]" />
                  Mobile Responsive
                </span>
                <span className="hidden h-3 w-px bg-white/15 sm:inline-block" />
                <span className="flex items-center gap-2">
                  <Laptop className="h-4 w-4 text-[#38B2D8]" />
                  Desktop Ready
                </span>
              </div>
            </motion.div>

            {/* Right: QR terminal card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <motion.div
                id="hero-qr-card"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                className="relative mx-auto w-full max-w-lg lg:ml-auto"
              >
                <div className="relative overflow-hidden rounded-xl border border-[#1E5FBF]/50 bg-[#061122]/90 p-6 shadow-2xl shadow-[#1E5FBF]/20 backdrop-blur-md sm:p-7">
                  {/* subtle inner glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#38B2D8]/10 blur-3xl"
                  />
                  {/* moving top accent line */}
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 right-0 top-0 h-px"
                    style={{
                      background:
                        'linear-gradient(to right, transparent, rgba(56,178,216,0.85), transparent)',
                    }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Header strip */}
                  <div className="relative mb-6 flex items-center justify-between font-mono text-[10px] sm:text-xs">
                    <div className="flex items-center gap-2 font-semibold uppercase tracking-[0.18em]">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      <span className="text-emerald-400">Live</span>
                      <span className="text-white">Challenge</span>
                    </div>
                    <div className="tracking-[0.18em] text-slate-400">{'//'} SCAN TO JOIN</div>
                  </div>

                  <div className="relative grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
                    {/* QR */}
                    <div className="flex items-center justify-center sm:col-span-6">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="group relative flex items-center justify-center p-3"
                      >
                        <CornerBrackets />
                        {/* pulse ring */}
                        <motion.div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-3 rounded-md border border-[#38B2D8]/30"
                          animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.05, 1] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <div className="relative flex h-[155px] w-[155px] items-center justify-center overflow-hidden rounded-md bg-white p-2 shadow-[0_0_30px_rgba(56,178,216,0.25)]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 41 41"
                            shapeRendering="crispEdges"
                            role="img"
                            aria-label={`QR Code to access live HackTheFlag challenge at ${HACKTHEFLAG_CHALLENGE_URL}`}
                            className="block h-full w-full"
                          >
                            <path fill="#ffffff" d="M0 0h41v41H0z" />
                            <path stroke="#000000" strokeWidth="1" d={QR_SVG_PATH} />
                          </svg>
                          <ScanLine />
                        </div>
                      </motion.div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4 text-left sm:col-span-6">
                      <div>
                        <h3 className="text-lg font-bold tracking-tight text-white">Quick Access</h3>
                        <p className="mt-1 text-xs leading-relaxed text-slate-300">
                          Scan the QR code with your mobile device to join the challenge instantly.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <SpecRow icon={Radio} label="Entry Point" value="Live" />
                        <SpecRow icon={Shield} label="Protocol" value="HTTPS / TLS 1.3" />
                        <SpecRow icon={Lock} label="Security" value="HTTPS / TLS 1.3" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 text-right font-mono text-[10px] tracking-[0.18em] text-slate-500">
                  {'//'} NETWORK &nbsp;/&nbsp; EXPLOIT &nbsp;/&nbsp; SOLVE &nbsp;/&nbsp; WIN
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ───────────── 2. NODE ARCHITECTURE & TELEMETRY ───────────── */}
      <section className={`relative py-14 lg:py-16 ${sectionBorder}`}>
        <Container size="xl">
          <motion.div {...fadeUp} className="mx-auto mb-10 max-w-4xl text-center">
            <SectionEyebrow>Node Architecture &amp; Telemetry</SectionEyebrow>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              One Unified Entry Point. Two Seamless Ways to Connect.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Whether you scan the QR code with your mobile device or launch the direct access link
              below, both methods connect securely to the active live challenge environment.
            </p>
          </motion.div>

          {/* One bordered strip, 4 cells split by thin dividers */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/[0.08] overflow-hidden rounded-xl border border-[#1E5FBF]/35 bg-[#061122]/60 shadow-lg shadow-[#1E5FBF]/10 backdrop-blur-sm lg:grid-cols-4 lg:divide-x lg:divide-y-0"
          >
            <TelemetryCell
              icon={Server}
              label="Target Endpoint"
              value={challengeHost}
              sub="Live HTTPS Challenge Host"
            />
            <TelemetryCell
              icon={Lock}
              label="Transport Protocol"
              value="TLS 1.3 / HTTPS"
              sub="End-to-end encrypted connection"
            />
            <TelemetryCell
              icon={Box}
              label="Target App"
              value="ARCHS (M. Portal)"
              sub="Authentication & System Node"
            />
            <TelemetryCell
              icon={Laptop}
              label="Client Compatibility"
              value="Mobile & Desktop"
              sub="Zero installations required"
            />
          </motion.div>
        </Container>
      </section>

      {/* ───────────── 3. THE JOURNEY ───────────── */}
      <section className={`relative py-16 lg:py-20 ${sectionBorder}`}>
        <Container size="xl">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3 text-left lg:col-span-4"
            >
              <div className={eyebrow}>The Journey</div>
              <h2 className="text-3xl font-bold tracking-tight text-white">Inside the Challenge</h2>
              <p className="max-w-sm text-sm leading-relaxed text-slate-300">
                Put your skills to the test across a realistic attack surface. Each stage builds on
                the last — from finding information to capturing the flag.
              </p>
              <div className="mt-4 h-[2px] w-12 bg-[#38B2D8]" />
            </motion.div>

            <div className="grid grid-cols-1 divide-y divide-white/[0.08] md:grid-cols-3 md:divide-x md:divide-y-0 lg:col-span-8">
              <JourneyStep
                index={0}
                icon={Search}
                title="1. Reconnaissance"
                text="Gather information, analyze the environment and identify potential attack vectors."
                showArrow
              />
              <JourneyStep
                index={1}
                icon={Code2}
                title="2. Exploitation"
                text="Find and leverage vulnerabilities to gain access and escalate your privileges."
                showArrow
              />
              <JourneyStep
                index={2}
                icon={Flag}
                title="3. Flag Capture"
                text="Navigate to the final objective, retrieve the flag and complete the challenge."
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────── 4. ENVIRONMENT & SECURITY ───────────── */}
      <section className={`relative py-16 lg:py-20 ${sectionBorder}`}>
        <Container size="xl">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left: hexagon shield graphic centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center text-center lg:col-span-5"
            >
              <div className="relative flex h-60 w-full max-w-sm items-center justify-center mx-auto">
                <svg
                  viewBox="0 0 360 240"
                  className="h-full w-full drop-shadow-[0_0_24px_rgba(56,178,216,0.25)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* circuit traces left */}
                  <path d="M0 120 H55 L85 95 H102" stroke="#38B2D8" strokeOpacity="0.45" strokeWidth="1.2" />
                  <path d="M20 75 H65 L102 75" stroke="#38B2D8" strokeOpacity="0.35" strokeWidth="1.2" />
                  <path d="M10 165 H65 L102 165" stroke="#38B2D8" strokeOpacity="0.3" strokeDasharray="3 3" strokeWidth="1.2" />
                  <circle cx="55" cy="120" r="2.5" fill="#38B2D8" />
                  <circle cx="65" cy="75" r="2" fill="#38B2D8" />
                  <circle cx="65" cy="165" r="2" fill="#38B2D8" />

                  {/* circuit traces right */}
                  <path d="M360 120 H305 L275 95 H258" stroke="#38B2D8" strokeOpacity="0.45" strokeWidth="1.2" />
                  <path d="M340 75 H295 L258 75" stroke="#38B2D8" strokeOpacity="0.35" strokeWidth="1.2" />
                  <path d="M350 165 H295 L258 165" stroke="#38B2D8" strokeOpacity="0.3" strokeDasharray="3 3" strokeWidth="1.2" />
                  <circle cx="305" cy="120" r="2.5" fill="#38B2D8" />
                  <circle cx="295" cy="75" r="2" fill="#38B2D8" />
                  <circle cx="295" cy="165" r="2" fill="#38B2D8" />

                  {/* outer hexagon - centered at (180, 120) */}
                  <polygon
                    points="180,30 258,75 258,165 180,210 102,165 102,75"
                    stroke="#38B2D8"
                    strokeWidth="1.5"
                    strokeOpacity="0.75"
                    fill="#1E5FBF"
                    fillOpacity="0.08"
                  />

                  {/* inner concentric dashed hexagon - centered at (180, 120) */}
                  <polygon
                    points="180,52 238,85 238,155 180,188 122,155 122,85"
                    stroke="#38B2D8"
                    strokeWidth="1.2"
                    strokeOpacity="0.5"
                    strokeDasharray="4 3"
                    fill="#061122"
                    fillOpacity="0.8"
                  />

                  {/* vertex nodes */}
                  <circle cx="180" cy="30" r="3" fill="#38B2D8" />
                  <circle cx="258" cy="75" r="3" fill="#38B2D8" />
                  <circle cx="258" cy="165" r="3" fill="#38B2D8" />
                  <circle cx="180" cy="210" r="3" fill="#38B2D8" />
                  <circle cx="102" cy="165" r="3" fill="#38B2D8" />
                  <circle cx="102" cy="75" r="3" fill="#38B2D8" />
                </svg>

                {/* Centered lock badge with subtle glow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                  {/* subtle pulse ring */}
                  <motion.div
                    aria-hidden="true"
                    className="absolute h-16 w-16 rounded-2xl border border-[#38B2D8]/40"
                    animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38B2D8]/60 bg-[#061122] shadow-[0_0_30px_rgba(56,178,216,0.45)]">
                    <Lock className="h-8 w-8 text-[#38B2D8]" />
                  </div>
                </div>
              </div>

              {/* Centered labels right below the graphic */}
              <div className="mt-3 space-y-1 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.22em]">
                <div className="text-[#38B2D8]">Isolated Environment</div>
                <div className="text-cyan-200">Real-World Skills</div>
              </div>
            </motion.div>

            {/* Right: heading + 4 features */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-7 text-left lg:col-span-7"
            >
              <div>
                <div className={`mb-2 ${eyebrow}`}>Environment &amp; Security</div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Built for Safe Practice</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
                  This challenge runs in a controlled, isolated environment designed for hands-on
                  learning without risk to your system or data.
                </p>
              </div>

              <div className="grid grid-cols-1 divide-y divide-white/[0.08] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
                <SafetyFeature
                  index={0}
                  icon={ShieldCheck}
                  title="Isolated Live Target"
                  text="Fully separated from production systems."
                />
                <SafetyFeature
                  index={1}
                  icon={Lock}
                  title="HTTPS / TLS"
                  text="Secure, encrypted connections only."
                />
                <SafetyFeature
                  index={2}
                  icon={Globe}
                  title="Browser Access"
                  text="No special tools or installations needed."
                />
                <SafetyFeature
                  index={3}
                  icon={Target}
                  title="Clear Scope"
                  text="Focused, defined and safe boundaries."
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ───────────── 5. PARTICIPATION GUIDE ───────────── */}
      <section className={`relative py-16 lg:py-20 ${sectionBorder}`}>
        <Container size="xl">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-0">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3 text-left lg:col-span-5 lg:pr-10"
            >
              <div className={eyebrow}>Participation Guide</div>
              <h2 className="text-3xl font-bold tracking-tight text-white">Challenge Rules &amp; Readiness</h2>
              <p className="max-w-md text-sm leading-relaxed text-slate-300">
                Make sure you&apos;re prepared and follow the rules to get the most out of the
                experience.
              </p>
              <div className="mt-4 h-[2px] w-12 bg-[#38B2D8]" />
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
              className="space-y-3.5 border-white/[0.1] text-left lg:col-span-7 lg:border-l lg:py-3 lg:pl-10"
            >
              {[
                'Use only the provided link or QR code to join.',
                'Do not attempt to scan or attack external systems.',
                'Stay within the challenge scope and rules.',
                'Avoid sharing solutions or hints publicly.',
                'Be respectful and follow the community guidelines.',
              ].map((rule) => (
                <motion.li
                  key={rule}
                  variants={{
                    hidden: { opacity: 0, x: 12 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="group flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-slate-200 transition-colors duration-200 hover:bg-white/[0.03] hover:text-white"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#38B2D8] transition-transform duration-200 group-hover:scale-110" />
                  <span>{rule}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Container>
      </section>

      {/* ───────────── 6. BOTTOM CTA ───────────── */}
      <section className="relative py-12 md:py-16">
        <Container size="xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border border-[#1E5FBF]/45 bg-[#061122]/85 p-8 text-center shadow-2xl shadow-[#1E5FBF]/20 backdrop-blur-md sm:p-12"
          >
            {/* animated ambient gradient inside the card */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  'radial-gradient(60% 80% at 50% 0%, rgba(56,178,216,0.18), transparent 70%)',
              }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Left Circuit Traces - Channelized PCB Bus Network */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-0 inset-y-0 hidden h-full w-72 sm:block md:w-88 lg:w-[420px] opacity-85"
              viewBox="0 0 420 240"
              fill="none"
            >
              {/* Trace 1 - Top outer high bus */}
              <path
                d="M0 24 H90 L120 44 H210"
                stroke="#38B2D8"
                strokeWidth="1.4"
                strokeOpacity="0.8"
              />
              <circle cx="210" cy="44" r="3" fill="#061122" stroke="#38B2D8" strokeWidth="1.5" />
              <circle cx="210" cy="44" r="1.5" fill="#38B2D8" />
              {/* Micro branch off Trace 1 */}
              <path
                d="M170 44 L190 24 H250"
                stroke="#38B2D8"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <circle cx="250" cy="24" r="2" fill="#38B2D8" />

              {/* Trace 2 - Parallel data channel: runs with parallel 45° step, goes deeper */}
              <path
                d="M0 48 H110 L140 78 H310"
                stroke="#38B2D8"
                strokeWidth="1.5"
                strokeOpacity="0.9"
              />
              <circle cx="310" cy="78" r="3.5" fill="#38B2D8" className="drop-shadow-[0_0_8px_#38B2D8]" />

              {/* Trace 3 - Clock pulse line (dashed channel between parallel lanes) */}
              <path
                d="M0 72 H130 L155 97 H230"
                stroke="#38B2D8"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                strokeOpacity="0.65"
              />
              <circle cx="230" cy="97" r="2.5" fill="#38B2D8" />

              {/* Trace 4 - Midline bus: straight, steps 45° down, branches */}
              <path
                d="M0 115 H75 L105 145 H280"
                stroke="#38B2D8"
                strokeWidth="1.5"
                strokeOpacity="0.85"
              />
              <circle cx="280" cy="145" r="3.5" fill="#38B2D8" className="drop-shadow-[0_0_8px_#38B2D8]" />

              {/* Trace 5 - Secondary branch stepping out from Trace 4 */}
              <path
                d="M190 145 L215 170 H340"
                stroke="#38B2D8"
                strokeWidth="1.2"
                strokeOpacity="0.75"
              />
              <circle cx="340" cy="170" r="3" fill="#38B2D8" className="drop-shadow-[0_0_8px_#38B2D8]" />

              {/* Trace 6 - Lower clock / data sync line: dashed */}
              <path
                d="M0 155 H60 L85 180 H195"
                stroke="#38B2D8"
                strokeWidth="1.2"
                strokeDasharray="5 3"
                strokeOpacity="0.55"
              />
              <circle cx="195" cy="180" r="2.5" fill="#38B2D8" />

              {/* Trace 7 - Low bus channel: steps up-right */}
              <path
                d="M0 195 H100 L125 170 H160"
                stroke="#38B2D8"
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />
              <circle cx="160" cy="170" r="2.5" fill="#061122" stroke="#38B2D8" strokeWidth="1.2" />
              <circle cx="160" cy="170" r="1.2" fill="#38B2D8" />

              {/* Trace 8 - Bottom trace line */}
              <path
                d="M0 216 H140 L160 216 H220"
                stroke="#38B2D8"
                strokeWidth="1"
                strokeOpacity="0.35"
              />
              <circle cx="220" cy="216" r="2" fill="#38B2D8" />

              {/* Registration mark & bus labels */}
              <path d="M140 108 V118 M135 113 H145" stroke="#38B2D8" strokeWidth="1" strokeOpacity="0.4" />
              <text x="25" y="14" fill="#38B2D8" fillOpacity="0.45" fontSize="8" fontFamily="monospace" letterSpacing="0.15em">
                BUS_CH.01 // TX
              </text>
              <text x="35" y="232" fill="#38B2D8" fillOpacity="0.35" fontSize="7" fontFamily="monospace" letterSpacing="0.12em">
                NODE.SIG_04
              </text>
            </svg>

            {/* Right Circuit Traces - Channelized PCB Bus Network */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-0 inset-y-0 hidden h-full w-72 sm:block md:w-88 lg:w-[420px] opacity-85"
              viewBox="0 0 420 240"
              fill="none"
            >
              {/* Trace 1 - Top outer high bus */}
              <path
                d="M420 24 H330 L300 44 H210"
                stroke="#38B2D8"
                strokeWidth="1.4"
                strokeOpacity="0.8"
              />
              <circle cx="210" cy="44" r="3" fill="#061122" stroke="#38B2D8" strokeWidth="1.5" />
              <circle cx="210" cy="44" r="1.5" fill="#38B2D8" />
              {/* Micro branch off Trace 1 */}
              <path
                d="M250 44 L230 24 H170"
                stroke="#38B2D8"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <circle cx="170" cy="24" r="2" fill="#38B2D8" />

              {/* Trace 2 - Parallel data channel: runs with parallel 45° step, goes deeper */}
              <path
                d="M420 48 H310 L280 78 H110"
                stroke="#38B2D8"
                strokeWidth="1.5"
                strokeOpacity="0.9"
              />
              <circle cx="110" cy="78" r="3.5" fill="#38B2D8" className="drop-shadow-[0_0_8px_#38B2D8]" />

              {/* Trace 3 - Clock pulse line (dashed channel) */}
              <path
                d="M420 72 H290 L265 97 H190"
                stroke="#38B2D8"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                strokeOpacity="0.65"
              />
              <circle cx="190" cy="97" r="2.5" fill="#38B2D8" />

              {/* Trace 4 - Midline bus: straight, steps 45° down, branches */}
              <path
                d="M420 115 H345 L315 145 H140"
                stroke="#38B2D8"
                strokeWidth="1.5"
                strokeOpacity="0.85"
              />
              <circle cx="140" cy="145" r="3.5" fill="#38B2D8" className="drop-shadow-[0_0_8px_#38B2D8]" />

              {/* Trace 5 - Secondary branch stepping out from Trace 4 */}
              <path
                d="M230 145 L205 170 H80"
                stroke="#38B2D8"
                strokeWidth="1.2"
                strokeOpacity="0.75"
              />
              <circle cx="80" cy="170" r="3" fill="#38B2D8" className="drop-shadow-[0_0_8px_#38B2D8]" />

              {/* Trace 6 - Lower clock / data sync line: dashed */}
              <path
                d="M420 155 H360 L335 180 H225"
                stroke="#38B2D8"
                strokeWidth="1.2"
                strokeDasharray="5 3"
                strokeOpacity="0.55"
              />
              <circle cx="225" cy="180" r="2.5" fill="#38B2D8" />

              {/* Trace 7 - Low bus channel: steps up-left */}
              <path
                d="M420 195 H320 L295 170 H260"
                stroke="#38B2D8"
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />
              <circle cx="260" cy="170" r="2.5" fill="#061122" stroke="#38B2D8" strokeWidth="1.2" />
              <circle cx="260" cy="170" r="1.2" fill="#38B2D8" />

              {/* Trace 8 - Bottom trace line */}
              <path
                d="M420 216 H280 L260 216 H200"
                stroke="#38B2D8"
                strokeWidth="1"
                strokeOpacity="0.35"
              />
              <circle cx="200" cy="216" r="2" fill="#38B2D8" />

              {/* Registration mark & bus labels */}
              <path d="M280 108 V118 M275 113 H285" stroke="#38B2D8" strokeWidth="1" strokeOpacity="0.4" />
              <text x="315" y="14" fill="#38B2D8" fillOpacity="0.45" fontSize="8" fontFamily="monospace" letterSpacing="0.15em">
                BUS_CH.02 // RX
              </text>
              <text x="305" y="232" fill="#38B2D8" fillOpacity="0.35" fontSize="7" fontFamily="monospace" letterSpacing="0.12em">
                NODE.SIG_08
              </text>
            </svg>

            <h3 className="relative mb-3 text-2xl font-bold text-white sm:text-3xl">
              Ready to start HackTheFlag?
            </h3>
            <p className="relative mx-auto mb-8 max-w-xl text-sm text-slate-300 sm:text-base">
              Launch into the live challenge environment directly or scan the QR code from any
              smartphone.
            </p>

            <div className="relative flex flex-wrap items-center justify-center gap-3.5">
              <motion.a
                href={HACKTHEFLAG_CHALLENGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-[#0084FF] px-7 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(0,132,255,0.45)] transition-all duration-200 hover:bg-[#0070DF] hover:shadow-[0_0_30px_rgba(0,132,255,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38B2D8] active:scale-95"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative">Launch Live Challenge</span>
                <ExternalLink className="relative h-4 w-4 text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.a>

              <motion.button
                type="button"
                onClick={handleScrollToQr}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-[#38B2D8]/50 hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38B2D8] active:scale-95"
              >
                <QrCode className="h-4 w-4 text-[#38B2D8]" />
                <span>View QR Code</span>
              </motion.button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
