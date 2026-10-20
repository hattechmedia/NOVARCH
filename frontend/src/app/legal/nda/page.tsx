import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Shield, AlertTriangle, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Confidentiality & Non-Disclosure (NDA) | NOVARCH',
  description:
    'Confidentiality principles, non-disclosure guidelines, and framework for bilateral NDA agreements with NOVARCH under German and EU law.',
  robots: { index: false, follow: false }, // Disallowed until formally approved
};

export default function NDALegalPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Container size="md" className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/legal"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#38B2D8] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Legal Hub / Zurück zur Übersicht</span>
            </Link>
          </div>

          {/* Page Eyebrow & Title */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 bg-[#081224] border border-[#38B2D8]/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <Shield className="h-3.5 w-3.5 text-cyan-400" />
              <span>Confidentiality Framework</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              Confidentiality &amp; Non-Disclosure
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-300 mb-3">
              Geheimhaltung &amp; Vertraulichkeitsvereinbarung (NDA)
            </h2>
            <p className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              Working Draft for Legal Review · Entwurf zur rechtlichen Prüfung
            </p>
          </div>

          {/* DRAFT NOTICE & DISTINCTION */}
          <div className="mb-8 p-5 sm:p-6 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-[#06101E] to-transparent text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-300 text-sm mb-1 uppercase tracking-wider font-mono">
                  Crucial Distinction / Wichtige rechtliche Unterscheidung
                </p>
                <p className="mb-2 text-slate-200">
                  This page outlines <strong>general confidentiality principles and standard terms</strong> governing discussions, technology demonstrations, and partner interactions with NOVARCH under German law (§§ 1 ff. GeschGehG — German Trade Secret Act / Gesetz zum Schutz von Geschäftsgeheimnissen).
                </p>
                <p className="text-amber-200/90 font-medium">
                  <strong>Notice:</strong> This web page alone does <em>not</em> constitute a binding bilateral contract. Binding non-disclosure obligations for specific commercial projects, client architectures, or proprietary source code require a formally executed bilateral agreement signed by authorized representatives of both parties.
                </p>
                <p className="text-[11px] text-slate-400 italic mt-2">
                  Diese Übersicht dient der Information über unsere Vertraulichkeitsstandards. Eine rechtsverbindliche Geheimhaltungsverpflichtung für konkrete Kundenprojekte bedarf eines gesondert unterzeichneten Vertrags.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-10 text-sm text-slate-300 leading-relaxed">

            {/* Section 1: Definition of Confidential Information */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">1.</span> Scope of Confidential Information / Gegenstand der Geheimhaltung
              </h3>
              <div>
                <p className="font-semibold text-slate-200 mb-1">English:</p>
                <p className="mb-2">
                  &ldquo;Confidential Information&rdquo; encompasses all technical, business, financial, operational, and architectural information disclosed by either party (Disclosing Party) to the other (Receiving Party), whether orally, in writing, electronically, or by inspection of tangible objects, including but not limited to:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-300">
                  <li>Proprietary software architectures, source code, APIs, algorithms, and system designs.</li>
                  <li>Business metrics, customer lists, pricing proposals, and workflow automation blueprints.</li>
                  <li>Unpublished research, roadmap details, hackathon challenge specifications, and event candidate evaluations.</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-border/40">
                <p className="font-semibold text-slate-200 mb-1">Deutsch:</p>
                <p className="text-xs sm:text-sm text-slate-400">
                  Als vertraulich gelten alle geschäftlichen, technischen und organisatorischen Informationen, Unterlagen und Daten, die als vertraulich gekennzeichnet sind oder deren Vertraulichkeit sich aus der Natur der Sache ergibt, insbesondere im Sinne des Gesetzes zum Schutz von Geschäftsgeheimnissen (GeschGehG).
                </p>
              </div>
            </section>

            {/* Section 2: Exclusions */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">2.</span> Standard Exclusions / Ausnahmen von der Vertraulichkeit
              </h3>
              <div>
                <p className="font-semibold text-slate-200 mb-1">English:</p>
                <p className="mb-2">
                  Confidential Information does not include information which the Receiving Party can demonstrate:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-300">
                  <li>Is or becomes publicly known through no wrongful act or omission of the Receiving Party.</li>
                  <li>Was already in the rightful possession of the Receiving Party prior to disclosure without confidentiality restriction.</li>
                  <li>Is independently developed by the Receiving Party without reference to or reliance upon the Disclosing Party&apos;s Confidential Information.</li>
                  <li>Is lawfully received from a third party free of confidentiality restrictions.</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-border/40">
                <p className="font-semibold text-slate-200 mb-1">Deutsch:</p>
                <p className="text-xs sm:text-sm text-slate-400">
                  Ausgenommen sind Informationen, die der Öffentlichkeit vor der Mitteilung nachweislich bekannt oder zugänglich waren, dem Empfänger bereits bekannt waren, von Dritten berechtigt erlangt wurden oder unabhängig entwickelt wurden.
                </p>
              </div>
            </section>

            {/* Section 3: Permitted Use and Obligations */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">3.</span> Permitted Use &amp; Safeguards / Verwendungsbeschränkung &amp; Sorgfalt
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                The Receiving Party agrees to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300">
                <li>Use Confidential Information solely for the authorized purpose of evaluating or executing the mutual business relationship or project.</li>
                <li>Exercise at least the same degree of care as it uses for its own confidential assets of like importance, but no less than reasonable care (Art. 3 GeschGehG — adequate confidentiality measures).</li>
                <li>Restrict access to employees, contractors, and legal/financial advisors who have a strict need to know and are bound by confidentiality obligations at least as restrictive as those herein.</li>
              </ul>
            </section>

            {/* Section 4: Required Disclosure */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">4.</span> Mandatory Disclosure / Gesetzliche Offenlegungspflichten
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                A disclosure required by a valid order of a court or authorized regulatory authority in Germany or the EU is not a breach, provided the Receiving Party gives prompt written notice (where legally permissible) to enable the Disclosing Party to seek a protective order.
              </p>
            </section>

            {/* Section 5: Duration and Return */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">5.</span> Term, Duration &amp; Return / Laufzeit &amp; Rückgabe
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Standard contractual NDA terms typically endure for:
              </p>
              <div className="p-3.5 rounded-xl bg-[#030712] border border-border/60 text-xs font-mono text-amber-300">
                [PENDING NOVARCH CONFIRMATION — Recommended duration: 3 years from disclosure date; trade secrets protected indefinitely under applicable statutory law. Subject to bilateral contract execution.]
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Upon written request or termination of talks, the Receiving Party shall promptly return or verifiably destroy all tangible materials containing Confidential Information, except routine encrypted automated backup archives maintained in compliance with standard retention practices.
              </p>
            </section>

            {/* Section 6: Governing Law & Jurisdiction */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">6.</span> Governing Law &amp; Jurisdiction / Anwendbares Recht
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Unless otherwise explicitly stipulated in an individual written bilateral agreement:
              </p>
              <div className="p-3.5 rounded-xl bg-[#030712] border border-border/60 text-xs font-mono text-amber-300">
                [PENDING NOVARCH CONFIRMATION — Governed by the laws of the Federal Republic of Germany. Place of jurisdiction: competent courts for Ilmenau/Erfurt, Germany. Subject to final corporate registration details.]
              </div>
            </section>

            {/* Request a Bilateral NDA Callout */}
            <section className="p-6 rounded-2xl border border-cyan-500/30 bg-[#08182D]/70 space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                <span>Execute a Bilateral Project NDA / Individuelle NDA anfordern</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                If your company or institution requires a formally signed bilateral NDA prior to sharing proprietary specifications or entering a client engagement with NOVARCH, please contact us directly.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:hello@novarch.io?subject=Request%20Bilateral%20NDA"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-[#1E5FBF] hover:bg-[#2B6FD4] text-xs font-semibold text-white transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Request Bilateral NDA / NDA anfordern (hello@novarch.io)</span>
                </a>
              </div>
            </section>

          </div>

          {/* Bottom Nav */}
          <div className="mt-12 pt-8 border-t border-border/40 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/legal"
              className="text-xs text-cyan-400 hover:underline"
            >
              &larr; Back to Legal Hub
            </Link>
            <Link
              href="/contact"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Contact Engineering Team &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
