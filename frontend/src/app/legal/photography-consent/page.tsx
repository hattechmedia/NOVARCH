import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Camera, AlertCircle, ArrowLeft, Shield, Check, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Photography & Video Consent Notice | NOVARCH',
  description:
    'Information on photography and video recording at NOVARCH events, participant rights, voluntary consent, and withdrawal process.',
  robots: { index: true, follow: true },
};

export default function PhotographyConsentPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Container size="md" className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/legal"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#38B2D8] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Legal Hub / Zurück zur Übersicht</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 bg-[#081224] border border-[#38B2D8]/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <Camera className="h-3.5 w-3.5 text-cyan-400" />
              <span>Media &amp; Recording Guidelines</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              Photography &amp; Video Consent
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-300 mb-3">
              Einwilligung zur Foto- und Videoaufnahme
            </h2>
            <p className="text-xs font-mono text-[#38B2D8] uppercase tracking-wider">
              NOVARCH Events &amp; Gatherings · Version 1.0 (October 2026)
            </p>
          </div>

          {/* Transparency Callout */}
          <div className="mb-8 p-4 sm:p-5 rounded-2xl border border-cyan-500/30 bg-[#08182D]/70 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white mb-1">
                  Voluntary Participation Guarantee / Freiwilligkeitsgarantie
                </p>
                <p className="text-slate-300">
                  Consent to photo and video recording is entirely voluntary and is never a prerequisite for event acceptance, participation, or receipt of any benefit. If you decline, you are equally welcome at our gatherings.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-10 text-sm text-slate-300 leading-relaxed">

            {/* Scope of Media Use */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">1.</span> Scope &amp; Purpose of Recording / Verwendungszweck
              </h3>
              <div>
                <p className="font-semibold text-slate-200 mb-1">English:</p>
                <p className="mb-2">
                  At select NOVARCH gatherings (including Winter Arc · Treffen 01), photographs and video clips may be taken by designated event documentarians. If you explicitly grant consent on the registration form:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-300">
                  <li><strong>Website:</strong> Media may be published on NOVARCH&apos;s official domains (e.g., novarch.io, novarch.eu) for retrospective event documentation and community showcase.</li>
                  <li><strong>Social Media:</strong> Images or short video highlights may be published on official NOVARCH channels (e.g., LinkedIn, Instagram, X/Twitter).</li>
                  <li><strong>Reporting:</strong> Non-commercial event recap articles and community newsletters.</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-border/40">
                <p className="font-semibold text-slate-200 mb-1">Deutsch:</p>
                <p className="text-xs sm:text-sm text-slate-400">
                  Die Aufnahmen dienen ausschließlich der redaktionellen Nachberichterstattung, der Dokumentation auf unserer Website und offiziellen Social-Media-Kanälen von NOVARCH. Eine Weitergabe oder ein Verkauf an unbefugte Dritte findet nicht statt.
                </p>
              </div>
            </section>

            {/* How Consent Is Recorded */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">2.</span> Consent Logging &amp; Server Verification
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                To guarantee verifiable GDPR compliance (Art. 7(1) GDPR):
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300">
                <li>The checkbox is <strong>unchecked by default</strong> in all registration forms.</li>
                <li>Your decision is transmitted to the server where an immutable server-side timestamp (<code className="text-cyan-300 font-mono">photoConsentAt</code>) and version identifier (<code className="text-cyan-300 font-mono">photoConsentVersion: &quot;v1-2026-10&quot;</code>) are recorded.</li>
                <li>The client application cannot forge or manipulate this timestamp.</li>
                <li>Silence, lack of response, or general event registration is strictly treated as opted-out.</li>
              </ul>
            </section>

            {/* Operational Safeguards for Non-Consenting Participants */}
            <section className="p-6 rounded-2xl border border-cyan-500/30 bg-[#08182D]/70 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">3.</span> On-Site Operational Safeguards / Vor-Ort-Schutzmaßnahmen
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                A digital checkbox alone does not prevent photography at physical venues. NOVARCH establishes the following operational protocols:
              </p>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[#030712] border border-border/60">
                  <p className="font-semibold text-xs text-cyan-300 uppercase font-mono mb-0.5">
                    1. Distinctive Lanyard / Badge System
                  </p>
                  <p className="text-xs text-slate-300">
                    Upon arrival at check-in, participants who have not consented (or who have withdrawn consent) receive a distinct lanyard badge indicating that they are not to be photographed or recorded.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#030712] border border-border/60">
                  <p className="font-semibold text-xs text-cyan-300 uppercase font-mono mb-0.5">
                    2. Dedicated Photographer Briefing
                  </p>
                  <p className="text-xs text-slate-300">
                    Official event photographers receive a mandatory briefing before the event to actively respect attendee badges and exclude non-consenting individuals from portraits and focus shots.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#030712] border border-border/60">
                  <p className="font-semibold text-xs text-cyan-300 uppercase font-mono mb-0.5">
                    3. No-Photo Zones
                  </p>
                  <p className="text-xs text-slate-300">
                    Selected meeting or breakout areas can be designated as recording-free zones where photography and filming are entirely prohibited.
                  </p>
                </div>
              </div>
            </section>

            {/* Withdrawal & Retraction */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">4.</span> Withdrawal of Consent / Widerrufsprozess
              </h3>
              <div>
                <p className="font-semibold text-slate-200 mb-1">English:</p>
                <p className="text-xs sm:text-sm text-slate-300 mb-2">
                  You may withdraw your photography consent at any time with future effect:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-300 mb-3">
                  <li><strong>Before or During the Event:</strong> Inform the on-site registration desk to update your badge status, or email <a href="mailto:hello@novarch.io" className="text-cyan-400 underline">hello@novarch.io</a>.</li>
                  <li><strong>After the Event:</strong> Email us with a brief description or link to any photo where you are identifiable. We will promptly remove or blur your image on digital platforms under our control within 72 hours.</li>
                </ul>
                <p className="text-[11px] text-slate-400">
                  Please note that withdrawal does not affect the lawfulness of processing carried out prior to the revocation, and physical print materials already distributed cannot be retrospectively altered.
                </p>
              </div>
              <div className="pt-2 border-t border-border/40">
                <p className="font-semibold text-slate-200 mb-1">Deutsch:</p>
                <p className="text-xs sm:text-sm text-slate-400">
                  Ein Widerruf ist jederzeit per E-Mail an hello@novarch.io möglich. Bereits veröffentlichte Online-Bilder werden bei berechtigtem Widerruf zeitnah entfernt oder unkenntlich gemacht.
                </p>
              </div>
            </section>

          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-border/40 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/winter-arc"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-[#1E5FBF] hover:bg-[#2B6FD4] text-xs font-semibold text-white transition-colors"
            >
              <Check className="h-4 w-4" />
              <span>Apply for Winter Arc</span>
            </Link>
            <Link
              href="/legal/winter-arc-2026"
              className="text-xs text-cyan-400 hover:underline"
            >
              Read Participant Privacy Notice &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
