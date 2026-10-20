'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Shield,
  AlertCircle,
  ArrowLeft,
  Mail,
  CheckCircle2,
  ListOrdered,
  ChevronDown,
  Building2,
  MapPin,
  ExternalLink,
  Lock,
  Clock,
  Sparkles,
  Server,
  FileText,
  ChevronRight,
  Globe2,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface TocItem {
  id: string;
  number: string;
  titleEN: string;
  titleDE: string;
}

const TOC_ITEMS: TocItem[] = [
  { id: 'controller', number: '01', titleEN: 'Data Controller', titleDE: 'Verantwortliche Stelle' },
  { id: 'data-collected', number: '02', titleEN: 'Collected Information', titleDE: 'Erhobene Daten' },
  { id: 'legal-bases', number: '03', titleEN: 'Legal Bases (Art. 6)', titleDE: 'Rechtsgrundlagen' },
  { id: 'storage-access', number: '04', titleEN: 'Storage & Infrastructure', titleDE: 'Speicherung & Zugriff' },
  { id: 'dashboard-notice', number: '05', titleEN: 'Planned Dashboard', titleDE: 'Geplantes Dashboard' },
  { id: 'retention', number: '06', titleEN: 'Retention & Deletion', titleDE: 'Aufbewahrung & Löschung' },
  { id: 'rights', number: '07', titleEN: 'Your GDPR Rights', titleDE: 'Ihre Rechte & Widerruf' },
];

export function WinterArcLegalContent() {
  const [activeSection, setActiveSection] = React.useState<string>('controller');
  const [mobileTocOpen, setMobileTocOpen] = React.useState<boolean>(false);
  const [languageMode, setLanguageMode] = React.useState<'both' | 'en' | 'de'>('both');

  // Active section scrollspy observer
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-100px 0px -65% 0px',
        threshold: 0,
      }
    );

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setMobileTocOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const showEN = languageMode === 'both' || languageMode === 'en';
  const showDE = languageMode === 'both' || languageMode === 'de';

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* ─────────────────────────────────────────────────────────────
          1. EDITORIAL HEADER & METADATA BAR
          ───────────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-800/80 bg-gradient-to-b from-[#060F1E] via-[#030712] to-[#030712] pt-8 pb-10 sm:pt-12 sm:pb-14">
        <Container size="xl">
          <div className="max-w-5xl">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 font-mono">
                <li>
                  <Link
                    href="/"
                    className="hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded px-1"
                  >
                    NOVARCH
                  </Link>
                </li>
                <li aria-hidden="true" className="text-slate-600">/</li>
                <li>
                  <Link
                    href="/legal"
                    className="hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded px-1"
                  >
                    Legal &amp; Event Hub
                  </Link>
                </li>
                <li aria-hidden="true" className="text-slate-600">/</li>
                <li className="text-cyan-300 font-semibold px-1" aria-current="page">
                  Winter Arc 2026
                </li>
              </ol>
            </nav>

            {/* Document Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-mono font-medium tracking-wide uppercase bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 shadow-[0_0_12px_rgba(56,178,216,0.12)]">
                <Shield className="h-3 w-3 text-cyan-400" />
                <span>GDPR / DSGVO Disclosure</span>
              </span>

              <span className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-mono font-medium tracking-wide bg-slate-900 border border-slate-800 text-slate-300">
                <span>Version 1.0</span>
                <span className="text-slate-600">•</span>
                <span>October 2026</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-mono font-medium tracking-wide bg-amber-500/10 border border-amber-500/30 text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Operational Draft</span>
              </span>
            </div>

            {/* Main Document Titles */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 leading-[1.12]">
              Participant Privacy Notice
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-300 tracking-tight mb-4">
              Datenschutzhinweis für Veranstaltungsteilnehmer
            </h2>

            {/* Restrained Accent Rule */}
            <div className="h-[1px] w-full max-w-2xl bg-gradient-to-r from-[#38B2D8]/60 via-[#1E5FBF]/40 to-transparent my-5" />

            {/* Metadata Bar & Language Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400 font-mono">
                <span className="inline-flex items-center gap-1.5 text-slate-300">
                  <span className="text-cyan-400">❄</span> Winter Arc · Treffen 01
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1 text-slate-300">
                  <MapPin className="h-3 w-3 text-slate-400" /> Ilmenau, Germany
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span>Bilingual (EN / DE)</span>
              </div>

              {/* Language Visibility Switcher */}
              <div className="inline-flex items-center rounded-lg border border-slate-800 bg-slate-950/80 p-0.5 text-xs font-mono self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setLanguageMode('both')}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    languageMode === 'both'
                      ? 'bg-[#1E5FBF] text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Both / Beide
                </button>
                <button
                  type="button"
                  onClick={() => setLanguageMode('en')}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    languageMode === 'en'
                      ? 'bg-[#1E5FBF] text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguageMode('de')}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    languageMode === 'de'
                      ? 'bg-[#1E5FBF] text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Deutsch
                </button>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN CONTENT LAYOUT (TOC SIDEBAR + DOCUMENT BODY)
          ───────────────────────────────────────────────────────────── */}
      <div className="py-8 sm:py-12 lg:py-16">
        <Container size="xl">
          {/* Mobile Table of Contents Accordion */}
          <div className="lg:hidden mb-8">
            <div className="rounded-xl border border-slate-800 bg-[#070F1E] overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-xs font-mono font-semibold text-slate-200 hover:text-white transition-colors"
                aria-expanded={mobileTocOpen}
              >
                <span className="flex items-center gap-2">
                  <ListOrdered className="h-4 w-4 text-cyan-400" />
                  <span>Table of Contents / Inhaltsverzeichnis</span>
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                    mobileTocOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileTocOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-1">
                  {TOC_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left py-2 px-2.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        activeSection === item.id
                          ? 'bg-cyan-950/50 text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-2'
                          : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="font-mono text-[10px] text-slate-500">{item.number}</span>
                        <span className="truncate">{item.titleEN}</span>
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono ml-2 flex-shrink-0">
                        {item.titleDE}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
            {/* Desktop Sticky Sidebar (Left: Col 4 / 3) */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28 space-y-6">
              {/* Table of Contents Card */}
              <div className="rounded-2xl border border-slate-800/90 bg-[#070F1E]/95 p-5 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-4 pb-3 border-b border-slate-800">
                  <ListOrdered className="h-3.5 w-3.5" />
                  <span>Contents / Abschnitte</span>
                </div>

                <nav aria-label="Table of Contents" className="space-y-1">
                  {TOC_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-start gap-2.5 transition-all duration-200 group ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-950/60 to-transparent text-cyan-300 font-medium border-l-2 border-cyan-400'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                        }`}
                      >
                        <span
                          className={`font-mono text-[11px] pt-0.5 transition-colors ${
                            isActive ? 'text-cyan-400 font-bold' : 'text-slate-600 group-hover:text-slate-400'
                          }`}
                        >
                          {item.number}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate leading-snug">{item.titleEN}</p>
                          <p className="text-[10px] text-slate-500 font-mono truncate leading-none mt-0.5">
                            {item.titleDE}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Document Quick Metadata Box */}
              <div className="rounded-2xl border border-slate-800/80 bg-[#050C17]/90 p-4 space-y-3 text-xs">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Document Overview
                </div>
                <div className="space-y-2 text-slate-300 divide-y divide-slate-800/60">
                  <div className="pt-1.5 flex justify-between items-center">
                    <span className="text-slate-400">Controller</span>
                    <span className="font-semibold text-white">NOVARCH</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-slate-400">Jurisdiction</span>
                    <span className="text-slate-200 font-mono text-[11px]">Germany / EU</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-slate-400">Target Event</span>
                    <span className="text-cyan-300 font-mono text-[11px]">16 Oct 2026</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-slate-400">Inquiries</span>
                    <a
                      href="mailto:hello@novarch.io"
                      className="text-cyan-400 hover:underline font-mono text-[11px]"
                    >
                      hello@novarch.io
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <Link
                    href="/winter-arc#apply"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#1E5FBF] to-[#2B6FD4] hover:shadow-[0_0_16px_rgba(56,178,216,0.25)] transition-all"
                  >
                    <span>Apply for Winter Arc</span>
                    <ArrowLeft className="h-3 w-3 rotate-180" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Article Document Column (Right: Col 8 / 9) */}
            <main className="lg:col-span-8 xl:col-span-9 max-w-3xl space-y-10 sm:space-y-12">
              {/* ─────────────────────────────────────────────────────────
                  IMPORTANT DRAFT NOTICE (Preserving exact wording)
                  ───────────────────────────────────────────────────────── */}
              <div
                role="alert"
                className="rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-[#070F1E] to-[#070F1E] p-5 sm:p-6 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 text-amber-400 mt-0.5">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-amber-300 tracking-tight">
                      Draft Document for Operational Transparency / Entwurf zur Vorabinformation
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      This notice describes actual technical data processing in effect for Winter Arc 2026. Items marked with brackets{' '}
                      <code className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-semibold border border-amber-500/30">
                        [PENDING NOVARCH CONFIRMATION]
                      </code>{' '}
                      require final formal verification by NOVARCH leadership and counsel before production certification.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-amber-500/20">
                      Dieser Hinweis beschreibt die tatsächliche technische Datenverarbeitung für Winter Arc 2026. Mit{' '}
                      <code className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[11px] font-semibold border border-amber-500/30">
                        [AUSSTEHENDE BESTÄTIGUNG]
                      </code>{' '}
                      markierte Angaben bedürfen der finalen Bestätigung durch NOVARCH.
                    </p>
                  </div>
                </div>
              </div>

              {/* ─────────────────────────────────────────────────────────
                  KEY HIGHLIGHTS SUMMARY GRID
                  ───────────────────────────────────────────────────────── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-slate-800 bg-[#070F1E]/90 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                    <p className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                      Primary Purpose / Hauptzweck
                    </p>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Application review, curated seat allocation (~15 participants), and venue coordination.
                  </p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-800 bg-[#070F1E]/90 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    <p className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wider">
                      Optional Consents / Freiwilligkeit
                    </p>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Promotional email and photography are completely voluntary, independent, and revocable at any time.
                  </p>
                </div>
              </div>

              {/* ─────────────────────────────────────────────────────────
                  SECTION 1: DATA CONTROLLER
                  ───────────────────────────────────────────────────────── */}
              <section id="controller" className="scroll-mt-28 space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs font-bold text-cyan-400">
                    01
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Data Controller / Verantwortliche Stelle
                    </h2>
                  </div>
                </div>

                {showEN && (
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                      <span>EN</span> <span>English</span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      The data controller responsible for the processing of participant data in connection with Winter Arc · Treffen 01 is:
                    </p>

                    {/* Contact Information Panel */}
                    <div className="rounded-2xl border border-slate-800 bg-[#050C17] p-5 sm:p-6 space-y-3.5 shadow-md">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2.5">
                          <Building2 className="h-4 w-4 text-cyan-400" />
                          <span className="font-bold text-base text-white">NOVARCH</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                          Data Controller
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                        <div>
                          <p className="text-slate-400 text-xs font-mono uppercase mb-0.5">Location</p>
                          <p className="text-slate-200 font-medium">Ilmenau, Germany</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs font-mono uppercase mb-0.5">Contact Email</p>
                          <p className="text-slate-200 font-mono text-xs">
                            <a href="mailto:hello@novarch.io" className="text-cyan-400 hover:underline">
                              hello@novarch.io
                            </a>
                            {' / '}
                            <a href="mailto:hello@novarch.eu" className="text-cyan-400 hover:underline">
                              hello@novarch.eu
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80">
                        <p className="text-slate-400 text-xs font-mono uppercase mb-1">Legal Entity Registration</p>
                        <p className="text-xs font-mono text-amber-300 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/30">
                          [PENDING NOVARCH CONFIRMATION — Official registered company name, address, and Commercial Register (Handelsregister) ID]
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {showDE && (
                  <div className="space-y-3 pt-3 border-t border-slate-800/60">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                      <span>DE</span> <span>Deutsch</span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      Verantwortlich für die Datenverarbeitung im Zusammenhang mit Winter Arc · Treffen 01 ist die oben genannte Organisation. Ein Datenschutzbeauftragter ist gesetzlich derzeit nicht bestellt, sofern die gesetzlichen Schwellenwerte nicht erreicht sind{' '}
                      <span className="text-amber-300 font-mono text-xs">[AUSSTEHENDE BESTÄTIGUNG]</span>.
                    </p>
                  </div>
                )}
              </section>

              {/* ─────────────────────────────────────────────────────────
                  SECTION 2: COLLECTED PARTICIPANT INFORMATION
                  ───────────────────────────────────────────────────────── */}
              <section id="data-collected" className="scroll-mt-28 space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs font-bold text-cyan-400">
                    02
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Collected Participant Information / Erhobene Daten
                    </h2>
                  </div>
                </div>

                {showEN && (
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                      <span>EN</span> <span>English</span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      When you submit an application through the Winter Arc registration form, we collect only data necessary to evaluate applications, organize logistics, and respect your communication preferences:
                    </p>

                    <div className="grid grid-cols-1 gap-2.5 pt-1">
                      {[
                        {
                          title: 'Core Identification',
                          desc: 'Full name and email address.',
                        },
                        {
                          title: 'Location & Organization',
                          desc: 'City/Location and business, project, or community represented.',
                        },
                        {
                          title: 'Qualitative Evaluation',
                          desc: 'What you do, what you can offer the group, and what you are looking for.',
                        },
                        {
                          title: 'Optional Professional Profiles',
                          desc: 'LinkedIn URL, portfolio/GitHub/website URL, proposed guest or partner, and contact phone number.',
                        },
                        {
                          title: 'Attribution Data',
                          desc: 'Referral source and campaign UTM parameters (if accessed via a campaign link).',
                        },
                        {
                          title: 'Consent Records',
                          desc: 'Voluntary opt-in status for photography/video recording and promotional emails, stored with an immutable server-side timestamp and presented wording version.',
                        },
                      ].map((item) => (
                        <div
                          key={item.title}
                          className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-800/80 bg-[#070F1E]/80 hover:border-slate-700 transition-colors"
                        >
                          <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <div className="text-xs sm:text-sm">
                            <strong className="text-white font-semibold">{item.title}:</strong>{' '}
                            <span className="text-slate-300">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {showDE && (
                  <div className="space-y-3 pt-3 border-t border-slate-800/60">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                      <span>DE</span> <span>Deutsch</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#070F1E] p-4 rounded-xl border border-slate-800/70">
                      Es werden ausschließlich Daten erhoben, die im Anmeldeformular abgefragt werden: Name, E-Mail, Stadt, Organisation/Projekt, Tätigkeitsbeschreibung, Beitragsangebot, Erwartungen, optionale Profillinks sowie die ausdrücklichen Einwilligungsentscheidungen samt Serverzeitstempel.
                    </p>
                  </div>
                )}
              </section>

              {/* ─────────────────────────────────────────────────────────
                  SECTION 3: LEGAL BASES (ART. 6 DSGVO)
                  ───────────────────────────────────────────────────────── */}
              <section id="legal-bases" className="scroll-mt-28 space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs font-bold text-cyan-400">
                    03
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Legal Bases for Processing / Rechtsgrundlagen (Art. 6 DSGVO)
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  We process data under strict, distinct legal bases:
                </p>

                {/* 4 Distinct Legal Basis Blocks */}
                <div className="grid grid-cols-1 gap-3.5">
                  {/* Basis 1 */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-[#070F1E] space-y-2 hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-sm sm:text-base text-white">
                        Event Evaluation &amp; Logistics
                      </span>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                        Art. 6(1)(b) &amp; Art. 6(1)(f) GDPR
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Processing application profiles is necessary to take pre-contractual steps at your request (participating in a curated gathering) and serves our legitimate interest in selecting a balanced cohort of ~15 participants and ensuring venue security.
                    </p>
                  </div>

                  {/* Basis 2 */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-[#070F1E] space-y-2 hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-sm sm:text-base text-white">
                        Transactional Confirmations
                      </span>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                        Art. 6(1)(b) GDPR
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Receipt acknowledgments and direct selection/invitation communications are transactional requirements directly connected to your application.
                    </p>
                  </div>

                  {/* Basis 3 */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-[#070F1E] space-y-2 hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-sm sm:text-base text-white">
                        Optional Photography &amp; Video
                      </span>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300">
                        Art. 6(1)(a) GDPR
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Capturing identifiable photo/video material and publishing it on NOVARCH&apos;s website or social channels is strictly based on your voluntary consent. Declining consent has no negative consequences on your application.
                    </p>
                  </div>

                  {/* Basis 4 */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-[#070F1E] space-y-2 hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-sm sm:text-base text-white">
                        Optional Promotional Updates
                      </span>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                        Art. 6(1)(a) GDPR &amp; § 7 UWG
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Receiving updates about future hackathons and events is completely separate and requires an explicit opt-in check. Silence or event registration is never treated as marketing consent.
                    </p>
                  </div>
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────
                  SECTION 4: STORAGE & INFRASTRUCTURE
                  ───────────────────────────────────────────────────────── */}
              <section id="storage-access" className="scroll-mt-28 space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs font-bold text-cyan-400">
                    04
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Storage, Infrastructure &amp; Access Controls
                    </h2>
                  </div>
                </div>

                {showEN && (
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                      <span>EN</span> <span>English</span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      Participant data is stored in secured production environments with role-based access restrictions. Authorized NOVARCH team members access data strictly for applicant selection and event administration.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Our technical service providers include:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div className="p-4 rounded-xl border border-slate-800 bg-[#070F1E] space-y-1">
                        <div className="flex items-center gap-2">
                          <Server className="h-4 w-4 text-cyan-400" />
                          <p className="font-bold text-xs sm:text-sm text-white">MongoDB Atlas</p>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Managed database cluster hosting participant records with encryption at rest and in transit.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-800 bg-[#070F1E] space-y-1">
                        <div className="flex items-center gap-2">
                          <Globe2 className="h-4 w-4 text-cyan-400" />
                          <p className="font-bold text-xs sm:text-sm text-white">Vercel Inc.</p>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Application frontend and serverless API execution.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-800 bg-[#070F1E] space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-cyan-400" />
                          <p className="font-bold text-xs sm:text-sm text-white">Resend / SMTP</p>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Transactional email dispatch for acknowledgments and invitations.
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 pt-1">
                      Data processing agreements (DPAs) and Standard Contractual Clauses (SCCs) govern external processors where applicable.
                    </p>
                  </div>
                )}

                {showDE && (
                  <div className="space-y-3 pt-3 border-t border-slate-800/60">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                      <span>DE</span> <span>Deutsch</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#070F1E] p-4 rounded-xl border border-slate-800/70">
                      Die Daten werden in verschlüsselten Datenbanken (MongoDB Atlas) gespeichert und ausschließlich durch befugte NOVARCH-Teammitglieder zur Bewerbungsprüfung eingesehen. Ein Verkauf oder eine unberechtigte Weitergabe an Dritte findet nicht statt.
                    </p>
                  </div>
                )}
              </section>

              {/* ─────────────────────────────────────────────────────────
                  SECTION 5: PLANNED PARTICIPANT DASHBOARD NOTICE
                  ───────────────────────────────────────────────────────── */}
              <section id="dashboard-notice" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs font-bold text-cyan-400">
                    05
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Transparency Notice: Planned Future Participant Dashboard
                    </h2>
                  </div>
                </div>

                <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-950/40 via-[#070F1E] to-[#070F1E] p-5 sm:p-6 space-y-3 shadow-md">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Sparkles className="h-4 w-4" />
                    <span className="font-bold text-sm uppercase font-mono tracking-wider">
                      Planned Feature (Not Yet Active)
                    </span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    <strong>Important Notice:</strong> NOVARCH is planning a future authenticated participant portal where participants will be able to review their event history, active applications, and consent settings.
                  </p>
                  <p className="text-xs sm:text-sm text-cyan-200/90 leading-relaxed">
                    Please note that this dashboard is a <strong>planned feature and is not yet active or available</strong>. Your data is currently managed solely through secure internal administrative workflows. You will be notified when self-service access features become available.
                  </p>
                  <p className="text-xs text-slate-400 italic pt-2 border-t border-cyan-500/20">
                    Hinweis: Das Teilnehmer-Dashboard ist eine geplante Funktion und steht aktuell noch nicht zur Verfügung.
                  </p>
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────
                  SECTION 6: RETENTION & DELETION
                  ───────────────────────────────────────────────────────── */}
              <section id="retention" className="scroll-mt-28 space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs font-bold text-cyan-400">
                    06
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Retention Period &amp; Deletion / Aufbewahrung &amp; Löschung
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Participant data is retained only as long as necessary to achieve the stated purposes:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-slate-800 bg-[#070F1E] flex items-start gap-3">
                    <Clock className="h-4 w-4 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white text-xs sm:text-sm font-semibold">Unselected Applications:</strong>{' '}
                      <span className="text-xs sm:text-sm text-slate-300">
                        Retained for a maximum of 6 months following event conclusion to address questions or waitlist vacancies, then permanently deleted or anonymized.
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-[#070F1E] flex items-start gap-3">
                    <Clock className="h-4 w-4 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white text-xs sm:text-sm font-semibold">Selected Participants:</strong>{' '}
                      <span className="text-xs sm:text-sm text-slate-300">
                        Retained for 12 months following the gathering for event follow-up and alumni continuity, subject to statutory tax/commercial retention obligations where applicable.
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-[#070F1E] flex items-start gap-3">
                    <Lock className="h-4 w-4 text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-white text-xs sm:text-sm font-semibold">Consent Records:</strong>{' '}
                      <span className="text-xs sm:text-sm text-slate-300">
                        Proof of consent is retained in accordance with statutory limitation periods (Art. 7(1) GDPR) to demonstrate compliant intake.
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-amber-300 font-mono bg-amber-500/10 p-3 rounded-lg border border-amber-500/30">
                  [PENDING NOVARCH CONFIRMATION — Exact formal retention schedules subject to counsel approval]
                </p>
              </section>

              {/* ─────────────────────────────────────────────────────────
                  SECTION 7: YOUR GDPR RIGHTS & WITHDRAWAL
                  ───────────────────────────────────────────────────────── */}
              <section id="rights" className="scroll-mt-28 space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs font-bold text-cyan-400">
                    07
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Your Rights &amp; Consent Withdrawal / Ihre Rechte &amp; Widerruf
                    </h2>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Under Articles 15–22 of the GDPR, you have the following rights at any time without fees:
                  </p>

                  {/* 6 GDPR Rights Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { code: 'Art. 15', name: 'Right of Access', nameDE: 'Auskunft' },
                      { code: 'Art. 16', name: 'Right to Rectification', nameDE: 'Berichtigung' },
                      { code: 'Art. 17', name: 'Right to Erasure', nameDE: 'Löschung' },
                      { code: 'Art. 18', name: 'Right to Restriction', nameDE: 'Einschränkung' },
                      { code: 'Art. 20', name: 'Data Portability', nameDE: 'Datenübertragbarkeit' },
                      { code: 'Art. 21', name: 'Right to Object', nameDE: 'Widerspruch' },
                    ].map((r) => (
                      <div
                        key={r.code}
                        className="p-3.5 rounded-xl border border-slate-800 bg-[#070F1E] flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-white">{r.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono italic">{r.nameDE}</p>
                        </div>
                        <span className="text-[11px] font-mono text-cyan-400 font-semibold bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                          {r.code}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* How to withdraw box */}
                  <div className="rounded-2xl border border-slate-800 bg-[#050C17] p-5 space-y-2.5 shadow-md">
                    <p className="font-bold text-sm text-white flex items-center gap-2">
                      <Mail className="h-4 w-4 text-cyan-400" />
                      <span>How to withdraw marketing or photography consent:</span>
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      You may withdraw your consent at any time with future effect. Simply send an informal email to{' '}
                      <a
                        href="mailto:hello@novarch.io?subject=Withdraw%20Consent"
                        className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 font-medium font-mono"
                      >
                        hello@novarch.io
                      </a>{' '}
                      stating your name, registered email address, and which consent you wish to revoke. We process withdrawals immediately and cease subsequent promotional sends.
                    </p>
                    <p className="text-xs text-slate-400 italic pt-1 border-t border-slate-800/80">
                      Sie können erteilte Einwilligungen jederzeit mit Wirkung für die Zukunft per E-Mail an hello@novarch.io widerrufen.
                    </p>
                  </div>

                  {/* Supervisory authority notice */}
                  <div className="rounded-xl border border-slate-800/80 bg-[#070F1E] p-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <p className="font-semibold text-white mb-1">
                      Right to lodge a complaint with a supervisory authority:
                    </p>
                    <p className="text-xs text-slate-300">
                      You have the right to lodge a complaint with a competent data protection supervisory authority. For Thuringia, Germany, the competent authority is the{' '}
                      <em>Thüringer Landesbeauftragte für den Datenschutz und die Informationsfreiheit (TLfDI)</em>.
                    </p>
                  </div>
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────
                  BOTTOM ACTION & RETURN BAR
                  ───────────────────────────────────────────────────────── */}
              <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Link
                  href="/winter-arc#apply"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#1E5FBF] to-[#2B6FD4] hover:shadow-[0_0_20px_rgba(56,178,216,0.3)] transition-all"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Back to Winter Arc Registration</span>
                </Link>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                  <Link
                    href="/legal"
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    ← All Legal Documents
                  </Link>
                  <a
                    href="mailto:hello@novarch.io"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <Mail className="h-3 w-3" />
                    <span>hello@novarch.io</span>
                  </a>
                </div>
              </div>
            </main>
          </div>
        </Container>
      </div>
    </div>
  );
}
