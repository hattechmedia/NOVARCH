import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { FileText, Shield, Camera, Users, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Legal & Compliance Hub | NOVARCH',
  description:
    'NOVARCH legal information, participant privacy notices, confidentiality terms, and event consent documentation.',
  robots: { index: true, follow: true },
};

const legalPages = [
  {
    icon: Users,
    title: 'Participant Privacy Notice — Winter Arc 2026',
    titleDE: 'Datenschutzhinweis für Teilnehmer — Winter Arc 2026',
    href: '/legal/winter-arc-2026',
    description:
      'How participant data is collected, processed, and safeguarded under the GDPR for Winter Arc · Treffen 01.',
    descriptionDE:
      'Wie Teilnehmerdaten für Winter Arc · Treffen 01 gemäß DSGVO erhoben, verarbeitet und geschützt werden.',
    badge: 'Privacy Notice',
    isDraft: true,
  },
  {
    icon: Camera,
    title: 'Photography & Video Consent',
    titleDE: 'Einwilligung zur Foto- und Videoaufnahme',
    href: '/legal/photography-consent',
    description:
      'Details on media capture at NOVARCH events, intended publications, voluntary consent, and withdrawal procedures.',
    descriptionDE:
      'Details zu Medienaufnahmen bei NOVARCH-Veranstaltungen, Veröffentlichungszwecken, Freiwilligkeit und Widerruf.',
    badge: 'Consent Notice',
    isDraft: true,
  },
  {
    icon: Shield,
    title: 'Confidentiality & Non-Disclosure (NDA)',
    titleDE: 'Geheimhaltung & Vertraulichkeit (NDA)',
    href: '/legal/nda',
    description:
      'General confidentiality standards, mutual obligations, exclusions, and guidelines for binding agreements.',
    descriptionDE:
      'Allgemeine Vertraulichkeitsstandards, Pflichten, Ausnahmen und Richtlinien für verbindliche Vereinbarungen.',
    badge: 'Draft / In Review',
    isDraft: true,
  },
];

export default function LegalHubPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Container size="xl" className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 bg-[#081224] border border-[#38B2D8]/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <FileText className="h-3.5 w-3.5 text-cyan-400" />
              <span>Legal &amp; Compliance Hub</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              NOVARCH Legal &amp; Event Hub
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-2xl">
              Legal documents, participant privacy notices, event consent disclosures, and confidentiality terms for NOVARCH gatherings, hackathons, and client engagements.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 italic">
              Rechtliche Dokumente, Datenschutzhinweise für Teilnehmer, Veranstaltungseinwilligungen und Vertraulichkeitsbestimmungen für NOVARCH-Treffen und Projekte.
            </p>
          </div>

          {/* Legal Documents Grid */}
          <div className="grid grid-cols-1 gap-4 sm:gap-5 mb-12">
            {legalPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 hover:border-[#38B2D8]/50 hover:bg-[#0A1A2F]/80 transition-all duration-300 shadow-lg"
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E5FBF]/15 border border-[#38B2D8]/30 text-[#38B2D8] flex-shrink-0 group-hover:scale-105 group-hover:bg-[#1E5FBF]/25 transition-all">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                        <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {page.title}
                        </h2>
                        <span
                          className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                            page.isDraft
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                          }`}
                        >
                          {page.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 italic mb-1.5">{page.titleDE}</p>
                      <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-1">
                        {page.description}
                      </p>
                      <p className="text-[11px] text-slate-400/80 leading-relaxed">
                        {page.descriptionDE}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#38B2D8] flex-shrink-0 self-end sm:self-center group-hover:translate-x-1 transition-transform">
                    <span>View / Öffnen</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Legal Review Safeguards Banner */}
          <div className="p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-[#06101E] to-transparent">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-mono mb-2">
              Legal Notice &amp; Review Safeguards / Rechtlicher Hinweis
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              Documents published in this Hub are prepared for operational transparency. Where marked as drafts or containing placeholders, they remain subject to final review and approval by authorized NOVARCH stakeholders and qualified legal counsel. Technical controls enforce consent choices independently.
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Die in diesem Hub bereitgestellten Dokumente dienen der betrieblichen Transparenz. Soweit sie als Entwürfe gekennzeichnet sind oder Platzhalter enthalten, stehen sie unter dem Vorbehalt der rechtlichen Prüfung und Freigabe durch NOVARCH.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
