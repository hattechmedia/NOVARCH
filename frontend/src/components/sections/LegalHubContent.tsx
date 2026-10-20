'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Home,
  FileText,
  Calendar,
  Users,
  Camera,
  Shield,
  AlertCircle,
  Info,
  ArrowRight,
  ListOrdered,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface LegalDoc {
  id: string;
  number: number;
  icon: React.ElementType;
  title: string;
  badge: string;
  badgeType: 'cyan' | 'amber';
  titleDE: string;
  descriptionEN: string;
  descriptionDE: string;
  href: string;
}

const LEGAL_DOCUMENTS: LegalDoc[] = [
  {
    id: 'privacy-notice',
    number: 1,
    icon: Users,
    title: 'Participant Privacy Notice — Winter Arc 2026',
    badge: 'Privacy Notice',
    badgeType: 'amber',
    titleDE: 'Datenschutzhinweis für Teilnehmer — Winter Arc 2026',
    descriptionEN:
      'How participant data is collected, processed, and safeguarded under the GDPR for Winter Arc · Treffen 01.',
    descriptionDE:
      'Wie Teilnehmerdaten für Winter Arc · Treffen 01 gemäß DSGVO erhoben, verarbeitet und geschützt werden.',
    href: '/legal/winter-arc-2026',
  },
  {
    id: 'photo-consent',
    number: 2,
    icon: Camera,
    title: 'Photography & Video Consent',
    badge: 'Consent Notice',
    badgeType: 'amber',
    titleDE: 'Einwilligung zur Foto- und Videoaufnahme',
    descriptionEN:
      'Details on media capture at NOVARCH events, intended publications, voluntary consent, and withdrawal procedures.',
    descriptionDE:
      'Details zu Medienaufnahmen bei NOVARCH-Veranstaltungen, Veröffentlichungszwecken, Freiwilligkeit und Widerruf.',
    href: '/legal/photography-consent',
  },
  {
    id: 'nda',
    number: 3,
    icon: Shield,
    title: 'Confidentiality & Non-Disclosure (NDA)',
    badge: 'Draft / In Review',
    badgeType: 'amber',
    titleDE: 'Geheimhaltung & Vertraulichkeit (NDA)',
    descriptionEN:
      'General confidentiality standards, mutual obligations, exclusions, and guidelines for binding agreements.',
    descriptionDE:
      'Allgemeine Vertraulichkeitsstandards, Pflichten, Ausnahmen und Richtlinien für verbindliche Vereinbarungen.',
    href: '/legal/nda',
  },
];

const TOC_SECTIONS = [
  { id: 'item-1', number: 1, label: 'Participant Privacy Notice', href: '/legal/winter-arc-2026' },
  { id: 'item-2', number: 2, label: 'Photography & Video Consent', href: '/legal/photography-consent' },
  { id: 'item-3', number: 3, label: 'Confidentiality & NDA', href: '/legal/nda' },
  { id: 'item-4', number: 4, label: 'Legal Notice & Review Safeguards', href: '#safeguards' },
  { id: 'item-5', number: 5, label: 'Data Controller', href: '/legal/winter-arc-2026#controller' },
  { id: 'item-6', number: 6, label: 'Legal Basis for Processing', href: '/legal/winter-arc-2026#legal-bases' },
  { id: 'item-7', number: 7, label: 'Data Storage & Retention', href: '/legal/winter-arc-2026#storage-access' },
  { id: 'item-8', number: 8, label: 'Data Sharing & Transfers', href: '/legal/winter-arc-2026#storage-access' },
  { id: 'item-9', number: 9, label: 'Participant Rights', href: '/legal/winter-arc-2026#rights' },
  { id: 'item-10', number: 10, label: 'Withdrawal & Consent', href: '/legal/winter-arc-2026#rights' },
  { id: 'item-11', number: 11, label: 'Contact Information', href: '/legal/winter-arc-2026#controller' },
  { id: 'item-12', number: 12, label: 'Final Provisions', href: '/legal/winter-arc-2026#retention' },
];

export function LegalHubContent() {
  const [activeTocId, setActiveTocId] = React.useState<string>('item-1');

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* ─────────────────────────────────────────────────────────────
          HERO HEADER WITH BREADCRUMB, TITLES & MOUNTAIN GRAPHIC
          ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#112238]/80 bg-gradient-to-b from-[#06101E] via-[#030712] to-[#030712] pt-8 pb-12 sm:pt-10 sm:pb-16">
        {/* Subtle Background Glow behind mountain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[450px] w-[550px] rounded-full opacity-25 blur-[120px] -z-0"
          style={{
            background: 'radial-gradient(circle at 70% 30%, #38B2D8 0%, #1E5FBF 50%, transparent 80%)',
          }}
        />

        <Container size="xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Breadcrumb, Pill, Titles, Subtitle */}
            <div className="lg:col-span-8">
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <li className="flex items-center">
                    <Link
                      href="/"
                      className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center"
                      aria-label="Home"
                    >
                      <Home className="h-3.5 w-3.5 text-cyan-400" />
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-slate-600">/</li>
                  <li>
                    <Link
                      href="/legal"
                      className="text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      Legal &amp; Compliance
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-slate-600">/</li>
                  <li className="text-slate-200 font-semibold" aria-current="page">
                    Winter Arc 2026
                  </li>
                </ol>
              </nav>

              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-widest mb-4 shadow-[0_0_12px_rgba(56,178,216,0.15)]">
                <span>LEGAL &amp; COMPLIANCE</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
                NOVARCH Legal &amp; Event Hub
              </h1>

              {/* English Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mb-2">
                Legal documents, participant privacy notices, event consent disclosures, and confidentiality terms for NOVARCH gatherings, hackathons, and client engagements.
              </p>

              {/* German Subtitle */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl italic">
                Rechtliche Dokumente, Datenschutzhinweise für Teilnehmer, Veranstaltungseinwilligungen und Vertraulichkeitsbestimmungen für NOVARCH-Treffen und Projekte.
              </p>
            </div>

            {/* Right Column: Version / Last Updated Cards + Neon Mountain Peak Graphic */}
            <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-6 relative">
              {/* Metadata Indicators */}
              <div className="space-y-4 flex-shrink-0 z-10">
                {/* VERSION */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-cyan-400">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      VERSION
                    </span>
                    <span className="text-sm font-bold text-white font-mono">1.0</span>
                  </div>
                </div>

                {/* LAST UPDATED */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-cyan-400">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      LAST Updated
                    </span>
                    <span className="text-sm font-bold text-white font-mono">16 Okt 2026</span>
                  </div>
                </div>
              </div>

              {/* Stylized Mountain Geometric Line Art (Matching screenshot exactly) */}
              <div className="hidden sm:block relative w-44 h-36 flex-shrink-0 opacity-85 pointer-events-none">
                <svg
                  viewBox="0 0 200 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-[0_0_25px_rgba(56,178,216,0.55)]"
                >
                  <defs>
                    <linearGradient id="cyanPeakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38B2D8" />
                      <stop offset="50%" stopColor="#258CF4" />
                      <stop offset="100%" stopColor="#1E5FBF" />
                    </linearGradient>
                    <linearGradient id="cyanFillGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#38B2D8" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0B1A30" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Left mountain silhouette */}
                  <polygon
                    points="30,150 90,65 140,150"
                    fill="url(#cyanFillGrad)"
                    stroke="#1E5FBF"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                  />
                  {/* Central glowing peak */}
                  <polygon
                    points="75,150 145,25 200,150"
                    fill="url(#cyanFillGrad)"
                    stroke="url(#cyanPeakGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Internal geometric facet lines */}
                  <line x1="145" y1="25" x2="145" y2="150" stroke="#38B2D8" strokeWidth="1.8" strokeOpacity="0.8" />
                  <line x1="90" y1="65" x2="145" y2="150" stroke="#258CF4" strokeWidth="1.2" strokeOpacity="0.7" />
                  <line x1="145" y1="25" x2="110" y2="150" stroke="#38B2D8" strokeWidth="1.2" strokeOpacity="0.4" />
                  <line x1="145" y1="25" x2="175" y2="150" stroke="#258CF4" strokeWidth="1.5" strokeOpacity="0.6" />
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT AREA (TWO-COLUMN DESKTOP / STACKED MOBILE)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ── LEFT SIDEBAR: Table of Contents + Privacy Matters Card ── */}
            <aside className="lg:col-span-4 xl:col-span-4 space-y-6">
              {/* Card 1: Table of Contents */}
              <div className="rounded-2xl border border-[#17304E] bg-[#071324]/90 p-5 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2.5 pb-4 border-b border-[#17304E] text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  <ListOrdered className="h-4 w-4 text-cyan-400" />
                  <span>Table of Contents</span>
                </div>

                <nav aria-label="Table of Contents" className="pt-3 space-y-1">
                  {TOC_SECTIONS.map((sec) => {
                    const isActive = activeTocId === sec.id;
                    return (
                      <Link
                        key={sec.id}
                        href={sec.href}
                        onClick={() => setActiveTocId(sec.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-all duration-200 group ${
                          isActive
                            ? 'bg-cyan-950/70 text-cyan-300 font-semibold border-l-2 border-cyan-400 shadow-[0_0_12px_rgba(56,178,216,0.15)]'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                        }`}
                      >
                        <span
                          className={`font-mono text-[11px] w-4 text-right flex-shrink-0 ${
                            isActive ? 'text-cyan-400 font-bold' : 'text-slate-500 group-hover:text-slate-300'
                          }`}
                        >
                          {sec.number}.
                        </span>
                        <span className="truncate">{sec.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Card 2: Your Privacy Matters */}
              <div className="rounded-2xl border border-[#17304E] bg-[#071324]/90 p-5 shadow-md space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                    <Shield className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-tight">Your Privacy Matters</h3>
                </div>
                <p className="text-xs text-slate-300/80 leading-relaxed italic">
                  &ldquo;We are committed to protecting your personal data and ensuring transparency in how it is used.&rdquo;
                </p>
              </div>
            </aside>

            {/* ── RIGHT MAIN COLUMN: Draft Notice + 3 Document Cards + Safeguards ── */}
            <main className="lg:col-span-8 xl:col-span-8 space-y-5">
              {/* Top Alert Banner: Draft / Pending Verification */}
              <div
                role="alert"
                className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-[#071324] to-[#071324] p-5 shadow-lg relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex-shrink-0 mt-0.5">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h2 className="text-sm sm:text-base font-bold text-amber-300 tracking-tight">
                        Draft / Pending Verification
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        This document is currently a draft and has not yet been formally verified by our legal team or German authorities. The information may be subject to change.
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed italic pt-1 border-t border-amber-500/20">
                        Dieses Dokument ist derzeit ein Entwurf und wurde noch nicht von unserem Rechtsteam oder den deutschen Behörden geprüft. Die Informationen können sich noch ändern.
                      </p>
                    </div>
                  </div>

                  {/* "Draft" Pill Badge on right */}
                  <span className="flex-shrink-0 hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase text-amber-300 bg-amber-500/20 border border-amber-500/40">
                    Draft
                  </span>
                </div>
              </div>

              {/* ───────────────────────────────────────────────────────
                  CARD 1: Participant Privacy Notice — Winter Arc 2026
                  ─────────────────────────────────────────────────────── */}
              <Link
                href="/legal/winter-arc-2026"
                className="group block rounded-2xl border border-[#17304E] bg-[#071324]/90 p-5 sm:p-6 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_24px_rgba(56,178,216,0.18)] hover:bg-[#0A1A30]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Icon Box with User */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex-shrink-0 group-hover:scale-105 group-hover:bg-cyan-500/25 transition-all">
                      <Users className="h-6 w-6" />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      {/* Number circle + Title + Badge */}
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 border border-slate-700 font-mono text-[11px] font-bold text-slate-300">
                          1
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          Participant Privacy Notice — Winter Arc 2026
                        </h3>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          Privacy Notice
                        </span>
                      </div>

                      {/* Subtitle DE */}
                      <p className="text-xs text-slate-400 italic">
                        Datenschutzhinweis für Teilnehmer — Winter Arc 2026
                      </p>

                      {/* English Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                        How participant data is collected, processed, and safeguarded under the GDPR for Winter Arc · Treffen 01.
                      </p>

                      {/* German Description */}
                      <p className="text-xs text-cyan-300/80 leading-relaxed">
                        Wie Teilnehmerdaten für Winter Arc · Treffen 01 gemäß DSGVO erhoben, verarbeitet und geschützt werden.
                      </p>
                    </div>
                  </div>

                  {/* View / Öffnen Link */}
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 flex-shrink-0 self-end sm:self-center group-hover:translate-x-1 transition-transform">
                    <span>View / Öffnen</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>

              {/* ───────────────────────────────────────────────────────
                  CARD 2: Photography & Video Consent
                  ─────────────────────────────────────────────────────── */}
              <Link
                href="/legal/photography-consent"
                className="group block rounded-2xl border border-[#17304E] bg-[#071324]/90 p-5 sm:p-6 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_24px_rgba(56,178,216,0.18)] hover:bg-[#0A1A30]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Icon Box with Camera */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex-shrink-0 group-hover:scale-105 group-hover:bg-cyan-500/25 transition-all">
                      <Camera className="h-6 w-6" />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      {/* Number circle + Title + Badge */}
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 border border-slate-700 font-mono text-[11px] font-bold text-slate-300">
                          2
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          Photography &amp; Video Consent
                        </h3>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          Consent Notice
                        </span>
                      </div>

                      {/* Subtitle DE */}
                      <p className="text-xs text-slate-400 italic">
                        Einwilligung zur Foto- und Videoaufnahme
                      </p>

                      {/* English Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                        Details on media capture at NOVARCH events, intended publications, voluntary consent, and withdrawal procedures.
                      </p>

                      {/* German Description */}
                      <p className="text-xs text-cyan-300/80 leading-relaxed">
                        Details zu Medienaufnahmen bei NOVARCH-Veranstaltungen, Veröffentlichungszwecken, Freiwilligkeit und Widerruf.
                      </p>
                    </div>
                  </div>

                  {/* View / Öffnen Link */}
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 flex-shrink-0 self-end sm:self-center group-hover:translate-x-1 transition-transform">
                    <span>View / Öffnen</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>

              {/* ───────────────────────────────────────────────────────
                  CARD 3: Confidentiality & Non-Disclosure (NDA)
                  ─────────────────────────────────────────────────────── */}
              <Link
                href="/legal/nda"
                className="group block rounded-2xl border border-[#17304E] bg-[#071324]/90 p-5 sm:p-6 transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_24px_rgba(56,178,216,0.18)] hover:bg-[#0A1A30]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Icon Box with Shield */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex-shrink-0 group-hover:scale-105 group-hover:bg-cyan-500/25 transition-all">
                      <Shield className="h-6 w-6" />
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      {/* Number circle + Title + Badge */}
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 border border-slate-700 font-mono text-[11px] font-bold text-slate-300">
                          3
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          Confidentiality &amp; Non-Disclosure (NDA)
                        </h3>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          Draft / In Review
                        </span>
                      </div>

                      {/* Subtitle DE */}
                      <p className="text-xs text-slate-400 italic">
                        Geheimhaltung &amp; Vertraulichkeit (NDA)
                      </p>

                      {/* English Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                        General confidentiality standards, mutual obligations, exclusions, and guidelines for binding agreements.
                      </p>

                      {/* German Description */}
                      <p className="text-xs text-cyan-300/80 leading-relaxed">
                        Allgemeine Vertraulichkeitsstandards, Pflichten, Ausnahmen und Richtlinien für verbindliche Vereinbarungen.
                      </p>
                    </div>
                  </div>

                  {/* View / Öffnen Link */}
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 flex-shrink-0 self-end sm:self-center group-hover:translate-x-1 transition-transform">
                    <span>View / Öffnen</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>

              {/* ───────────────────────────────────────────────────────
                  BOTTOM CARD: Legal Notice & Review Safeguards
                  ─────────────────────────────────────────────────────── */}
              <div
                id="safeguards"
                className="rounded-2xl border border-[#17304E] bg-gradient-to-r from-[#071324] via-[#071324] to-[#0A1C35] p-5 sm:p-6 shadow-md relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex-shrink-0 mt-0.5">
                      <Info className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm sm:text-base font-bold text-cyan-300 tracking-tight">
                        Legal Notice &amp; Review Safeguards / Rechtlicher Hinweis
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Documents published in this Hub are prepared for operational transparency. Where marked as drafts or containing placeholders, they remain subject to final review and approval by authorized NOVARCH stakeholders and qualified legal counsel. Technical controls enforce consent choices independently.
                      </p>
                      <p className="text-xs text-cyan-300/80 leading-relaxed italic pt-1 border-t border-[#17304E]">
                        Die in diesem Hub bereitgestellten Dokumente dienen der betrieblichen Transparenz. Soweit sie als Entwürfe gekennzeichnet sind oder Platzhalter enthalten, stehen sie unter dem Vorbehalt der rechtlichen Prüfung und Freigabe durch NOVARCH.
                      </p>
                    </div>
                  </div>

                  {/* Stylized Document Sheets Graphic on Right (Matching screenshot) */}
                  <div className="hidden md:flex items-center justify-center flex-shrink-0 pl-2">
                    <div className="relative w-20 h-24">
                      {/* Back sheet */}
                      <div className="absolute inset-0 translate-x-2 -translate-y-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 transform rotate-6 opacity-60" />
                      {/* Front sheet */}
                      <div className="absolute inset-0 rounded-xl border border-cyan-400/50 bg-[#0A1A2F] p-2.5 shadow-[0_0_20px_rgba(56,178,216,0.25)] flex flex-col justify-between">
                        <div className="space-y-1.5 pt-1">
                          <div className="h-1.5 w-8 rounded-full bg-cyan-400" />
                          <div className="h-1.5 w-12 rounded-full bg-cyan-500/50" />
                          <div className="h-1.5 w-10 rounded-full bg-cyan-500/50" />
                        </div>
                        <div className="h-1 w-6 rounded-full bg-cyan-400/60 self-end" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </Container>
      </section>
    </div>
  );
}
