import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Shield, AlertCircle, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Participant Privacy Notice — Winter Arc 2026 | NOVARCH',
  description:
    'Participant Privacy Notice for Winter Arc · Treffen 01 in Ilmenau. Information regarding participant data collection, legal bases under GDPR, retention, and rights.',
  alternates: {
    canonical: 'https://www.novarch.eu/legal/winter-arc-2026',
  },
  robots: { index: true, follow: true },
};

export default function WinterArcLegalPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Container size="md" className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Top Navigation */}
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
              <span>GDPR / DSGVO Disclosures</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              Participant Privacy Notice
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-300 mb-3">
              Datenschutzhinweis für Veranstaltungsteilnehmer
            </h2>
            <p className="text-xs font-mono text-[#38B2D8] uppercase tracking-wider">
              Winter Arc · Treffen 01 · Ilmenau, Germany · Version 1.0 (October 2026)
            </p>
          </div>

          {/* Status & Review Notice */}
          <div className="mb-8 p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-300 mb-1">
                  Draft Document for Operational Transparency / Entwurf zur Vorabinformation
                </p>
                <p className="mb-1 text-slate-300">
                  This notice describes actual technical data processing in effect for Winter Arc 2026. Items marked with brackets <code className="text-amber-300 font-mono">[PENDING NOVARCH CONFIRMATION]</code> require final formal verification by NOVARCH leadership and counsel before production certification.
                </p>
                <p className="text-slate-400 text-xs">
                  Dieser Hinweis beschreibt die tatsächliche technische Datenverarbeitung für Winter Arc 2026. Mit <code className="text-amber-300 font-mono">[AUSSTEHENDE BESTÄTIGUNG]</code> markierte Angaben bedürfen der finalen Bestätigung durch NOVARCH.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-12">
            <div className="p-4 rounded-xl border border-border/70 bg-[#06101E]/80">
              <p className="text-[11px] font-mono text-[#38B2D8] uppercase font-bold mb-1">
                Primary Purpose / Hauptzweck
              </p>
              <p className="text-xs sm:text-sm text-slate-200">
                Application review, curated seat allocation (~15 participants), and venue coordination.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border/70 bg-[#06101E]/80">
              <p className="text-[11px] font-mono text-[#38B2D8] uppercase font-bold mb-1">
                Optional Consents / Freiwillige Einwilligungen
              </p>
              <p className="text-xs sm:text-sm text-slate-200">
                Promotional email and photography are completely voluntary, independent, and revocable at any time.
              </p>
            </div>
          </div>

          {/* Document Content (Bilingual Sections) */}
          <div className="space-y-12 text-sm text-slate-300 leading-relaxed">

            {/* Section 1: Controller */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">1.</span> Data Controller / Verantwortliche Stelle
              </h3>
              <div>
                <p className="font-semibold text-slate-200 mb-1">English:</p>
                <p>
                  The data controller responsible for the processing of participant data in connection with Winter Arc · Treffen 01 is:
                </p>
                <div className="my-2 p-3 rounded-lg bg-[#030712] border border-border/60 text-xs font-mono text-slate-300">
                  NOVARCH<br />
                  Location: Ilmenau, Germany<br />
                  Email: <a href="mailto:hello@novarch.io" className="text-cyan-400 underline">hello@novarch.io</a> / <a href="mailto:hello@novarch.eu" className="text-cyan-400 underline">hello@novarch.eu</a><br />
                  Legal entity registration: <span className="text-amber-300">[PENDING NOVARCH CONFIRMATION — Official registered company name, address, and Commercial Register (Handelsregister) ID]</span>
                </div>
              </div>
              <div className="pt-2 border-t border-border/40">
                <p className="font-semibold text-slate-200 mb-1">Deutsch:</p>
                <p>
                  Verantwortlich für die Datenverarbeitung im Zusammenhang mit Winter Arc · Treffen 01 ist die oben genannte Organisation. Ein Datenschutzbeauftragter ist gesetzlich derzeit nicht bestellt, sofern die gesetzlichen Schwellenwerte nicht erreicht sind <span className="text-amber-300">[AUSSTEHENDE BESTÄTIGUNG]</span>.
                </p>
              </div>
            </section>

            {/* Section 2: Collected Data */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">2.</span> Collected Participant Information / Erhobene Daten
              </h3>
              <div>
                <p className="font-semibold text-slate-200 mb-1">English:</p>
                <p className="mb-2">
                  When you submit an application through the Winter Arc registration form, we collect only data necessary to evaluate applications, organize logistics, and respect your communication preferences:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-300">
                  <li><strong>Core Identification:</strong> Full name and email address.</li>
                  <li><strong>Location &amp; Organization:</strong> City/Location and business, project, or community represented.</li>
                  <li><strong>Qualitative Evaluation:</strong> What you do, what you can offer the group, and what you are looking for.</li>
                  <li><strong>Optional Professional Profiles:</strong> LinkedIn URL, portfolio/GitHub/website URL, proposed guest or partner, and contact phone number.</li>
                  <li><strong>Attribution Data:</strong> Referral source and campaign UTM parameters (if accessed via a campaign link).</li>
                  <li><strong>Consent Records:</strong> Voluntary opt-in status for photography/video recording and promotional emails, stored with an immutable server-side timestamp and presented wording version.</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-border/40">
                <p className="font-semibold text-slate-200 mb-1">Deutsch:</p>
                <p className="text-xs sm:text-sm text-slate-400">
                  Es werden ausschließlich Daten erhoben, die im Anmeldeformular abgefragt werden: Name, E-Mail, Stadt, Organisation/Projekt, Tätigkeitsbeschreibung, Beitragsangebot, Erwartungen, optionale Profillinks sowie die ausdrücklichen Einwilligungsentscheidungen samt Serverzeitstempel.
                </p>
              </div>
            </section>

            {/* Section 3: Legal Basis & Purpose */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">3.</span> Legal Bases for Processing / Rechtsgrundlagen (Art. 6 DSGVO)
              </h3>
              <div>
                <p className="font-semibold text-slate-200 mb-2">We process data under strict, distinct legal bases:</p>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#030712] border border-border/60">
                    <p className="font-bold text-xs uppercase font-mono text-cyan-300 mb-1">
                      Event Evaluation &amp; Logistics — Art. 6(1)(b) &amp; Art. 6(1)(f) GDPR
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Processing application profiles is necessary to take pre-contractual steps at your request (participating in a curated gathering) and serves our legitimate interest in selecting a balanced cohort of ~15 participants and ensuring venue security.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#030712] border border-border/60">
                    <p className="font-bold text-xs uppercase font-mono text-cyan-300 mb-1">
                      Transactional Confirmations — Art. 6(1)(b) GDPR
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Receipt acknowledgments and direct selection/invitation communications are transactional requirements directly connected to your application.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#030712] border border-border/60">
                    <p className="font-bold text-xs uppercase font-mono text-cyan-300 mb-1">
                      Optional Photography &amp; Video — Art. 6(1)(a) GDPR
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Capturing identifiable photo/video material and publishing it on NOVARCH&apos;s website or social channels is strictly based on your voluntary consent. Declining consent has no negative consequences on your application.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#030712] border border-border/60">
                    <p className="font-bold text-xs uppercase font-mono text-cyan-300 mb-1">
                      Optional Promotional Updates — Art. 6(1)(a) GDPR &amp; § 7 UWG
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Receiving updates about future hackathons and events is completely separate and requires an explicit opt-in check. Silence or event registration is never treated as marketing consent.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Storage, Service Providers, and Access */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">4.</span> Storage, Infrastructure &amp; Access Controls
              </h3>
              <div>
                <p className="font-semibold text-slate-200 mb-1">English:</p>
                <p className="mb-2">
                  Participant data is stored in secured production environments with role-based access restrictions. Authorized NOVARCH team members access data strictly for applicant selection and event administration.
                </p>
                <p className="text-xs text-slate-300 mb-2">Our technical service providers include:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                  <li><strong>MongoDB Atlas:</strong> Managed database cluster hosting participant records with encryption at rest and in transit.</li>
                  <li><strong>Vercel Inc.:</strong> Application frontend and serverless API execution.</li>
                  <li><strong>Resend / SMTP Infrastructure:</strong> Transactional email dispatch for acknowledgments and invitations.</li>
                </ul>
                <p className="text-xs text-slate-400 mt-2">
                  Data processing agreements (DPAs) and Standard Contractual Clauses (SCCs) govern external processors where applicable.
                </p>
              </div>
              <div className="pt-2 border-t border-border/40">
                <p className="font-semibold text-slate-200 mb-1">Deutsch:</p>
                <p className="text-xs sm:text-sm text-slate-400">
                  Die Daten werden in verschlüsselten Datenbanken (MongoDB Atlas) gespeichert und ausschließlich durch befugte NOVARCH-Teammitglieder zur Bewerbungsprüfung eingesehen. Ein Verkauf oder eine unberechtigte Weitergabe an Dritte findet nicht statt.
                </p>
              </div>
            </section>

            {/* Section 5: Future Participant Dashboard Transparency */}
            <section className="p-6 rounded-2xl border border-cyan-500/30 bg-[#08182D]/70 space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">5.</span> Transparency Notice: Planned Future Participant Dashboard
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                <strong>Important Notice:</strong> NOVARCH is planning a future authenticated participant portal where participants will be able to review their event history, active applications, and consent settings.
              </p>
              <p className="text-xs text-cyan-200/90">
                Please note that this dashboard is a <strong>planned feature and is not yet active or available</strong>. Your data is currently managed solely through secure internal administrative workflows. You will be notified when self-service access features become available.
              </p>
              <p className="text-[11px] text-slate-400 italic">
                Hinweis: Das Teilnehmer-Dashboard ist eine geplante Funktion und steht aktuell noch nicht zur Verfügung.
              </p>
            </section>

            {/* Section 6: Data Retention & Deletion */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">6.</span> Retention Period &amp; Deletion
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Participant data is retained only as long as necessary to achieve the stated purposes:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                <li><strong>Unselected Applications:</strong> Retained for a maximum of 6 months following event conclusion to address questions or waitlist vacancies, then permanently deleted or anonymized.</li>
                <li><strong>Selected Participants:</strong> Retained for 12 months following the gathering for event follow-up and alumni continuity, subject to statutory tax/commercial retention obligations where applicable.</li>
                <li><strong>Consent Records:</strong> Proof of consent is retained in accordance with statutory limitation periods (Art. 7(1) GDPR) to demonstrate compliant intake.</li>
              </ul>
              <p className="text-xs text-amber-300 font-mono mt-2">
                [PENDING NOVARCH CONFIRMATION — Exact formal retention schedules subject to counsel approval]
              </p>
            </section>

            {/* Section 7: GDPR Rights & Withdrawal */}
            <section className="p-6 rounded-2xl border border-border/70 bg-[#06101E]/90 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#38B2D8]">7.</span> Your Rights &amp; Consent Withdrawal / Ihre Rechte &amp; Widerruf
              </h3>
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-slate-300">
                  Under Articles 15–22 of the GDPR, you have the following rights at any time without fees:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#030712] border border-border/50">
                    <strong className="text-white">Art. 15: Right of Access (Auskunft)</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#030712] border border-border/50">
                    <strong className="text-white">Art. 16: Right to Rectification (Berichtigung)</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#030712] border border-border/50">
                    <strong className="text-white">Art. 17: Right to Erasure (Löschung)</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#030712] border border-border/50">
                    <strong className="text-white">Art. 18: Right to Restriction (Einschränkung)</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#030712] border border-border/50">
                    <strong className="text-white">Art. 20: Data Portability (Datenübertragbarkeit)</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#030712] border border-border/50">
                    <strong className="text-white">Art. 21: Right to Object (Widerspruch)</strong>
                  </div>
                </div>

                <div className="pt-3">
                  <p className="font-semibold text-white text-xs mb-1">
                    How to withdraw marketing or photography consent:
                  </p>
                  <p className="text-xs text-slate-300">
                    You may withdraw your consent at any time with future effect. Simply send an informal email to{' '}
                    <a href="mailto:hello@novarch.io?subject=Withdraw%20Consent" className="text-cyan-400 underline">
                      hello@novarch.io
                    </a>{' '}
                    stating your name, registered email address, and which consent you wish to revoke. We process withdrawals immediately and cease subsequent promotional sends.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Sie können erteilte Einwilligungen jederzeit mit Wirkung für die Zukunft per E-Mail an hello@novarch.io widerrufen.
                  </p>
                </div>

                <div className="pt-2">
                  <p className="font-semibold text-white text-xs mb-1">
                    Right to lodge a complaint with a supervisory authority:
                  </p>
                  <p className="text-xs text-slate-300">
                    You have the right to lodge a complaint with a competent data protection supervisory authority. For Thuringia, Germany, the competent authority is the <em>Thüringer Landesbeauftragte für den Datenschutz und die Informationsfreiheit (TLfDI)</em>.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Bottom Actions */}
          <div className="mt-12 pt-8 border-t border-border/40 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/winter-arc"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-[#1E5FBF] hover:bg-[#2B6FD4] text-xs font-semibold text-white transition-colors"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Back to Winter Arc Registration</span>
            </Link>
            <a
              href="mailto:hello@novarch.io"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Contact Privacy Team: hello@novarch.io</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
