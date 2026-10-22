'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

type Lang = 'de' | 'en';

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex gap-2 mt-6" role="group" aria-label="Language / Sprache">
      {(['de', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-4 py-1.5 rounded-full text-sm font-mono font-semibold transition-colors border ${
            lang === l
              ? 'bg-[#38B2D8] border-[#38B2D8] text-[#030712]'
              : 'border-[#1e3a5f] text-slate-400 hover:border-[#38B2D8] hover:text-white'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#1e3a5f] bg-[#0b1524] p-5 text-sm text-slate-300 not-italic">
      {children}
    </div>
  );
}

export function DatenschutzPage() {
  const [lang, setLang] = React.useState<Lang>('de');

  React.useEffect(() => {
    const saved = localStorage.getItem('novarch_lang');
    if (saved === 'en' || saved === 'de') {
      setLang(saved);
    } else if (typeof document !== 'undefined' && document.cookie.includes('googtrans=/en/de')) {
      setLang('de');
    }
  }, []);

  const handleSetLang = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem('novarch_lang', l);
      const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (combo) {
        combo.value = l;
        combo.dispatchEvent(new Event('change', { bubbles: true }));
      }
    } catch {}
  };

  const de = lang === 'de';

  return (
    <div className="min-h-[70vh] bg-[#030712] text-slate-200">
      <Container className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/legal/winter-arc-2026"
            className="text-sm text-cyan-300 hover:text-cyan-100 transition-colors"
          >
            ← {de ? 'Zurück zum Legal Hub' : 'Back to Legal Hub'}
          </Link>

          <p className="mt-10 text-xs font-mono uppercase tracking-widest text-cyan-300">NOVARCH</p>
          <h1 className="mt-3 text-4xl font-bold text-white">
            {de ? 'Datenschutzerklärung' : 'Privacy Policy'}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {de
              ? 'Zuletzt aktualisiert: Oktober 2026'
              : 'Last updated: October 2026'}
          </p>

          <LangToggle lang={lang} setLang={handleSetLang} />

          <div className="mt-10 space-y-12 leading-7 text-[15px]">

            {/* ─── 1. Verantwortlicher ─── */}
            <section aria-labelledby="s1">
              <h2 id="s1" className="text-xl font-semibold text-white mb-4">
                {de ? '1. Verantwortlicher' : '1. Controller'}
              </h2>
              <p>
                {de
                  ? 'Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und sonstiger anwendbarer Datenschutzvorschriften ist:'
                  : 'The controller within the meaning of the General Data Protection Regulation (GDPR) and other applicable data protection laws is:'}
              </p>
              <InfoBox>
                <strong className="text-white block mb-1">NOVARCH</strong>
                Ilmenau, Thüringen, {de ? 'Deutschland' : 'Germany'}<br />
                E-Mail:{' '}
                <a href="mailto:mesum@novarch.eu" className="text-cyan-300 hover:text-cyan-100">
                  mesum@novarch.eu
                </a>
                <br />
                Website:{' '}
                <a href="https://novarch.eu" className="text-cyan-300 hover:text-cyan-100">
                  https://novarch.eu
                </a>
              </InfoBox>
            </section>

            {/* ─── 2. Datenschutzkontakt ─── */}
            <section aria-labelledby="s2">
              <h2 id="s2" className="text-xl font-semibold text-white mb-4">
                {de ? '2. Datenschutzkontakt' : '2. Privacy Contact'}
              </h2>
              <p>
                {de
                  ? 'Anfragen zur Datenverarbeitung und zur Ausübung von Betroffenenrechten richten Sie bitte an:'
                  : 'Requests relating to data processing and the exercise of data-subject rights should be directed to:'}
              </p>
              <p className="mt-2">
                <a href="mailto:mesum@novarch.eu" className="text-cyan-300 hover:text-cyan-100">
                  mesum@novarch.eu
                </a>
              </p>
            </section>

            {/* ─── 3. Verarbeitete Daten ─── */}
            <section aria-labelledby="s3">
              <h2 id="s3" className="text-xl font-semibold text-white mb-4">
                {de ? '3. Verarbeitete Daten, Zwecke und Rechtsgrundlagen' : '3. Data Processed, Purposes, and Legal Bases'}
              </h2>

              {/* 3.1 */}
              <h3 className="text-base font-semibold text-cyan-300 mt-6 mb-2">
                {de ? '3.1 Kontaktanfragen und Serviceanfragen' : '3.1 Contact and Service Inquiries'}
              </h3>
              <p>
                {de
                  ? 'Wenn Sie das Kontaktformular oder das Serviceanfrageformular nutzen, verarbeiten wir die folgenden Daten:'
                  : 'When you use the contact form or service-inquiry form, we process the following data:'}
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300 text-sm">
                {de ? (
                  <>
                    <li>Name (Pflichtfeld)</li>
                    <li>E-Mail-Adresse (Pflichtfeld)</li>
                    <li>Telefonnummer inkl. Landesvorwahl (optional)</li>
                    <li>Unternehmen (optional)</li>
                    <li>Art der angefragten Dienstleistung und Budgetrahmen (optional)</li>
                    <li>Nachrichteninhalt</li>
                  </>
                ) : (
                  <>
                    <li>Name (required)</li>
                    <li>Email address (required)</li>
                    <li>Phone number incl. country code (optional)</li>
                    <li>Company (optional)</li>
                    <li>Type of service requested and budget range (optional)</li>
                    <li>Message content</li>
                  </>
                )}
              </ul>
              <p className="mt-3 text-sm text-slate-400">
                <strong className="text-slate-200">{de ? 'Zweck:' : 'Purpose:'}</strong>{' '}
                {de
                  ? 'Beantwortung von Anfragen, Erstellung von Angeboten und Durchführung vorvertraglicher Kommunikation.'
                  : 'Responding to inquiries, preparing proposals, and conducting pre-contractual communications.'}
                <br />
                <strong className="text-slate-200">{de ? 'Rechtsgrundlage:' : 'Legal basis:'}</strong>{' '}
                {de
                  ? 'Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) für Serviceanfragen; Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen: Bearbeitung eingehender Anfragen) für allgemeine Kontaktanfragen.'
                  : 'Art. 6(1)(b) GDPR (pre-contractual measures) for service inquiries; Art. 6(1)(f) GDPR (legitimate interests: processing inbound inquiries) for general contact requests.'}
              </p>

              {/* 3.2 */}
              <h3 className="text-base font-semibold text-cyan-300 mt-8 mb-2">
                {de ? '3.2 Community- und Winter-Arc-Bewerbungen' : '3.2 Community and Winter Arc Applications'}
              </h3>
              <p>
                {de
                  ? 'Bei der Bewerbung für die NOVARCH Community oder das Winter-Arc-Programm verarbeiten wir die folgenden Daten:'
                  : 'When applying to the NOVARCH Community or the Winter Arc programme, we process the following data:'}
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300 text-sm">
                {de ? (
                  <>
                    <li>Vollständiger Name und E-Mail-Adresse (Pflichtfelder)</li>
                    <li>Land und Stadt (optional)</li>
                    <li>Telefonnummer inkl. Landesvorwahl (optional)</li>
                    <li>Organisation und berufliche Rolle</li>
                    <li>Beruflicher Hintergrund und Fähigkeiten</li>
                    <li>LinkedIn- und Portfolio-URLs (optional)</li>
                    <li>Interessen, Beitrag zur Community und Erwartungen</li>
                    <li>Vorgeschlagene Gäste (optional, nur Winter Arc)</li>
                    <li>Quellenangabe (wie Sie von NOVARCH erfahren haben)</li>
                    <li>Einwilligung zu Marketingkommunikation (optional, explizite Checkbox)</li>
                    <li>Einwilligung zur Foto- und Medienverwendung (optional, explizite Checkbox, nur Winter Arc)</li>
                  </>
                ) : (
                  <>
                    <li>Full name and email address (required)</li>
                    <li>Country and city (optional)</li>
                    <li>Phone number incl. country code (optional)</li>
                    <li>Organisation and professional role</li>
                    <li>Professional background and skills</li>
                    <li>LinkedIn and portfolio URLs (optional)</li>
                    <li>Interests, community contribution, and expectations</li>
                    <li>Proposed guests (optional, Winter Arc only)</li>
                    <li>Referral source (how you found NOVARCH)</li>
                    <li>Consent to marketing communications (optional, explicit checkbox)</li>
                    <li>Consent to photography and media use (optional, explicit checkbox, Winter Arc only)</li>
                  </>
                )}
              </ul>
              <p className="mt-3 text-sm text-slate-400">
                <strong className="text-slate-200">{de ? 'Zweck:' : 'Purpose:'}</strong>{' '}
                {de
                  ? 'Verwaltung von Community-Mitgliedschaften und Veranstaltungsteilnahmen, Prüfung und Auswahl von Bewerberinnen und Bewerbern.'
                  : 'Managing community memberships and event participations, evaluating and selecting applicants.'}
                <br />
                <strong className="text-slate-200">{de ? 'Rechtsgrundlage:' : 'Legal basis:'}</strong>{' '}
                {de
                  ? 'Art. 6 Abs. 1 lit. b DSGVO (Vertrag oder vorvertragliche Maßnahmen) für die Bearbeitungsgrundlage; Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) für optionale Einwilligungen zu Marketing und Mediennutzung. Einwilligungen können jederzeit ohne Angabe von Gründen mit Wirkung für die Zukunft widerrufen werden (Kontakt: mesum@novarch.eu).'
                  : 'Art. 6(1)(b) GDPR (contract or pre-contractual measures) for core processing; Art. 6(1)(a) GDPR (consent) for optional marketing and media-use consents. Consents may be withdrawn at any time without giving reasons with effect for the future (contact: mesum@novarch.eu).'}
              </p>

              {/* 3.3 */}
              <h3 className="text-base font-semibold text-cyan-300 mt-8 mb-2">
                {de ? '3.3 Zahlungsabwicklung' : '3.3 Payment Processing'}
              </h3>
              <p>
                {de
                  ? 'Für kostenpflichtige Dienstleistungen setzen wir Stripe Inc. als Zahlungsdienstleister ein. Stripe verarbeitet Zahlungsdaten (Karteninformationen oder Kontodaten) direkt; diese werden nicht an uns übertragen. Wir speichern ausschließlich die von Stripe bereitgestellten Bestätigungskennungen (Session-ID und Zahlungsintent-ID) sowie das Zahlungsdatum als Nachweis des Zahlungseingangs.'
                  : 'For paid services, we use Stripe Inc. as our payment processor. Stripe processes payment data (card information or account details) directly; this is not transmitted to us. We only store the confirmation identifiers supplied by Stripe (session ID and payment intent ID) and the payment date as evidence of payment receipt.'}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                <strong className="text-slate-200">{de ? 'Rechtsgrundlage:' : 'Legal basis:'}</strong>{' '}
                {de ? 'Art. 6 Abs. 1 lit. b DSGVO (Vertrag).' : 'Art. 6(1)(b) GDPR (contract).'}
                {' '}
                {de
                  ? 'Stripe verarbeitet Daten in den USA. Datenschutzerklärung von Stripe:'
                  : 'Stripe processes data in the USA. Stripe Privacy Policy:'}
                {' '}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-100"
                >
                  stripe.com/privacy
                </a>
              </p>

              {/* 3.4 */}
              <h3 className="text-base font-semibold text-cyan-300 mt-8 mb-2">
                {de ? '3.4 Transaktionale E-Mail-Kommunikation' : '3.4 Transactional Email Communications'}
              </h3>
              <p>
                {de
                  ? 'Nach dem Absenden eines Formulars erhalten Sie eine automatische Eingangsbestätigung an die angegebene E-Mail-Adresse. Das NOVARCH-Team erhält gleichzeitig eine interne Benachrichtigung mit den für die Bearbeitung erforderlichen Daten.'
                  : 'After submitting a form, you receive an automated acknowledgement to the email address you provided. The NOVARCH team simultaneously receives an internal notification containing the data required to process your submission.'}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                <strong className="text-slate-200">{de ? 'Rechtsgrundlage:' : 'Legal basis:'}</strong>{' '}
                {de
                  ? 'Art. 6 Abs. 1 lit. b DSGVO. E-Mails werden über Resend Inc. (USA) als Primärdienstleister versandt (mit SMTP-Fallback über einen gesonderten Mailserver).'
                  : 'Art. 6(1)(b) GDPR. Emails are dispatched via Resend Inc. (USA) as the primary provider (with SMTP fallback through a separate mail server).'}
              </p>

              {/* 3.5 */}
              <h3 className="text-base font-semibold text-cyan-300 mt-8 mb-2">
                {de ? '3.5 Sicherheits- und Missbrauchsschutz' : '3.5 Security and Abuse Prevention'}
              </h3>
              <p>
                {de
                  ? 'Zum Schutz der öffentlichen Formulare vor Spam, Bots und automatisierten Angriffen wenden wir folgende technische Maßnahmen an:'
                  : 'To protect our public forms against spam, bots, and automated attacks, we apply the following technical measures:'}
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300 text-sm">
                {de ? (
                  <>
                    <li>
                      <strong>Honeypot-Feld:</strong> Ein für Nutzerinnen und Nutzer unsichtbares Formularfeld; Absendungen mit ausgefülltem Feld werden verworfen und nicht gespeichert.
                    </li>
                    <li>
                      <strong>Formulartoken:</strong> Ein per HMAC-SHA256 signierter, zeitlich begrenzter Token, der beim Laden der Seite ausgestellt und serverseitig geprüft wird (Gültigkeitsdauer: 1 Sekunde bis 2 Stunden).
                    </li>
                    <li>
                      <strong>Anfragebegrenzung (Rate Limiting):</strong> Maximal 8 Formularübermittlungen pro IP-Adresse innerhalb von 15 Minuten. IP-Adressen werden vor der Speicherung mit SHA-256 gehasht; die Hashwerte werden nach Ablauf des Zeitfensters automatisch durch TTL-Mechanismus gelöscht.
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <strong>Honeypot field:</strong> A form field invisible to users; submissions with this field filled in are rejected and not stored.
                    </li>
                    <li>
                      <strong>Form token:</strong> An HMAC-SHA256 signed, time-limited token issued on page load and verified server-side (valid 1 second to 2 hours).
                    </li>
                    <li>
                      <strong>Rate limiting:</strong> Maximum 8 form submissions per IP address within 15 minutes. IP addresses are hashed with SHA-256 before storage; hash values are automatically deleted by a TTL mechanism after the time window expires.
                    </li>
                  </>
                )}
              </ul>
              <p className="mt-3 text-sm text-slate-400">
                <strong className="text-slate-200">{de ? 'Rechtsgrundlage:' : 'Legal basis:'}</strong>{' '}
                {de
                  ? 'Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen: Schutz der Dienste vor Missbrauch, Gewährleistung der IT-Sicherheit und Betriebsstabilität).'
                  : 'Art. 6(1)(f) GDPR (legitimate interests: protecting services against abuse, ensuring IT security and operational stability).'}
              </p>

              {/* 3.6 */}
              <h3 className="text-base font-semibold text-cyan-300 mt-8 mb-2">
                {de ? '3.6 Sprachpräferenz (lokaler Speicher)' : '3.6 Language Preference (Local Storage)'}
              </h3>
              <p>
                {de
                  ? 'Wenn Sie den Sprachumschalter (Deutsch/Englisch) auf der Website nutzen, speichern wir Ihre Sprachpräferenz im lokalen Speicher (localStorage) Ihres Browsers unter dem Schlüssel novarch_lang. Diese Information wird ausschließlich lokal auf Ihrem Gerät gespeichert, verlässt es nicht und wird nicht an Server übertragen. Sie dient dazu, Ihre Sprachwahl bei einem erneuten Besuch beizubehalten.'
                  : 'When you use the language switcher (German/English) on the website, we store your language preference in the localStorage of your browser under the key novarch_lang. This information is stored exclusively on your device, does not leave it, and is not transmitted to any server. It is used solely to retain your language choice on future visits.'}
              </p>
            </section>

            {/* ─── 4. Google Translate ─── */}
            <section aria-labelledby="s4">
              <h2 id="s4" className="text-xl font-semibold text-white mb-4">
                {de ? '4. Google Translate Widget' : '4. Google Translate Widget'}
              </h2>
              <p>
                {de
                  ? 'Auf dieser Website ist das Google Translate Widget des Unternehmens Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA integriert. Das Widget wird erst aktiviert, wenn Sie den Sprachumschalter auf der Seite betätigen (keine automatische Aktivierung beim Seitenaufruf).'
                  : 'This website integrates the Google Translate widget provided by Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. The widget is only activated when you click the language switcher (no automatic activation on page load).'}
              </p>
              <p className="mt-3">
                {de
                  ? 'Bei Aktivierung wird ein Skript von translate.google.com geladen. Dabei werden die IP-Adresse Ihres Geräts sowie der Seiteninhalt an Google-Server in den USA übermittelt, um die Übersetzung durchzuführen. Google setzt außerdem ein Cookie mit der Bezeichnung googtrans in Ihrem Browser, um die gewählte Sprache zu speichern.'
                  : 'On activation, a script is loaded from translate.google.com. Your device IP address and page content are transmitted to Google servers in the USA to perform the translation. Google also sets a cookie named googtrans in your browser to remember the selected language.'}
              </p>
              <p className="mt-3 text-sm text-slate-400">
                {de
                  ? 'Die rechtliche Bewertung der Einwilligungserfordernis gemäß § 25 TDDDG für den durch Nutzeraktion ausgelösten Einsatz dieses Widgets wird derzeit durchgeführt und nach Abschluss in dieser Erklärung ergänzt. Weitere Informationen zur Datenverarbeitung durch Google finden Sie unter '
                  : 'The legal assessment of whether consent is required under § 25 TDDDG for this user-triggered widget is currently in progress and will be added to this policy on completion. For further information on data processing by Google, see '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-100"
                >
                  policies.google.com/privacy
                </a>
                .
              </p>
            </section>

            {/* ─── 5. Empfänger ─── */}
            <section aria-labelledby="s5">
              <h2 id="s5" className="text-xl font-semibold text-white mb-4">
                {de ? '5. Empfänger und Auftragsverarbeiter' : '5. Recipients and Processors'}
              </h2>
              <p className="mb-4">
                {de
                  ? 'Personenbezogene Daten werden nur an die folgenden Dienstleister weitergegeben, soweit dies für die Erbringung unserer Leistungen erforderlich ist. Alle Dienstleister sind vertraglich verpflichtet, Daten nur nach Weisung zu verarbeiten.'
                  : 'Personal data is shared with the following service providers only to the extent necessary to provide our services. All providers are contractually bound to process data only on our instructions.'}
              </p>
              <div className="space-y-3">
                {([
                  {
                    name: 'Vercel Inc.',
                    desc_de: 'Hosting der öffentlichen Website (Frontend-Infrastruktur). Daten werden über ein globales Edge-Netzwerk ausgeliefert.',
                    desc_en: 'Hosting of the public website (front-end infrastructure). Data is served via a global edge network.',
                    region_de: 'USA (globales Edge-Netzwerk)',
                    region_en: 'USA (global edge network)',
                    link: 'https://vercel.com/legal/privacy-policy',
                    pending: false,
                  },
                  {
                    name: 'MongoDB Atlas',
                    desc_de: 'Verwalteter Datenbankdienst (Speicherung von Formularübermittlungen, Bewerbungen und Sicherheits-Ratenbegrenzungsdaten).',
                    desc_en: 'Managed database service (storage of form submissions, applications, and security rate-limit data).',
                    region_de: 'Europäische Union (EU-Region)',
                    region_en: 'European Union (EU region)',
                    link: 'https://www.mongodb.com/legal/privacy-policy',
                  },
                  {
                    name: 'Resend Inc.',
                    desc_de: 'Transaktionaler E-Mail-Versanddienst (Eingangsbestätigungen und interne Benachrichtigungen).',
                    desc_en: 'Transactional email delivery service (acknowledgements and internal notifications).',
                    region_de: 'USA',
                    region_en: 'USA',
                    link: 'https://resend.com/privacy',
                  },
                  {
                    name: 'Stripe Inc.',
                    desc_de: 'Zahlungsabwicklung. Karten- und Kontodaten werden ausschließlich von Stripe verarbeitet.',
                    desc_en: 'Payment processing. Card and account data is processed exclusively by Stripe.',
                    region_de: 'USA',
                    region_en: 'USA',
                    link: 'https://stripe.com/privacy',
                  },
                  {
                    name: 'Google LLC (Translate)',
                    desc_de: 'Seitenübersetzung — nur wenn der Sprachumschalter durch die Nutzerin/den Nutzer aktiviert wird.',
                    desc_en: 'Page translation — only when the language switcher is activated by the user.',
                    region_de: 'USA',
                    region_en: 'USA',
                    link: 'https://policies.google.com/privacy',
                  },
                ] as const).map((p) => (
                  <div
                    key={p.name}
                    className="rounded-xl border border-[#1e3a5f] bg-[#0b1524] p-4 text-sm"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <strong className="text-white">{p.name}</strong>
                    </div>
                    <p className="text-slate-300">{de ? p.desc_de : p.desc_en}</p>
                    <p className="text-slate-400 text-xs mt-1">
                      {de ? 'Verarbeitungsort:' : 'Processing location:'}{' '}
                      {de ? p.region_de : p.region_en}
                    </p>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-100 text-xs"
                    >
                      {p.link}
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── 6. Internationale Übermittlungen ─── */}
            <section aria-labelledby="s6">
              <h2 id="s6" className="text-xl font-semibold text-white mb-4">
                {de ? '6. Internationale Datenübermittlungen' : '6. International Data Transfers'}
              </h2>
              <p>
                {de
                  ? 'Einige der genannten Dienstleister verarbeiten Daten in den USA. Für diese Datenübermittlungen stützen wir uns, soweit anwendbar, auf das EU-US-Datenschutzrahmenwerk (EU-US Data Privacy Framework) und auf Standardvertragsklauseln (SCC) gemäß Art. 46 Abs. 2 lit. c DSGVO als geeignete Garantien.'
                  : 'Some of the service providers listed process data in the USA. For these transfers, we rely, where applicable, on the EU-US Data Privacy Framework and on Standard Contractual Clauses (SCCs) pursuant to Art. 46(2)(c) GDPR as appropriate safeguards.'}
              </p>
            </section>

            {/* ─── 7. Speicherdauer ─── */}
            <section aria-labelledby="s7">
              <h2 id="s7" className="text-xl font-semibold text-white mb-4">
                {de ? '7. Speicherdauer' : '7. Retention Periods'}
              </h2>
              <ul className="space-y-3 text-slate-300 text-sm">
                {de ? (
                  <>
                    <li>
                      <strong className="text-white">Sicherheits-Ratenbegrenzungsdaten (gehashte IPs):</strong>{' '}
                      Automatische Löschung nach Ablauf des Zeitfensters (15 Minuten bis wenige Stunden) durch datenbankgestützten TTL-Mechanismus.
                    </li>
                    <li>
                      <strong className="text-white">Kontaktanfragen und Bewerbungsdaten:</strong>{' '}
                      Werden so lange aufbewahrt, wie es für den jeweiligen Verarbeitungszweck erforderlich ist, es sei denn, gesetzliche Aufbewahrungsfristen stehen einer Löschung entgegen.
                    </li>
                    <li>
                      <strong className="text-white">Zahlungsnachweise (Stripe-Kennungen und Zahlungsdatum):</strong>{' '}
                      Aufbewahrung entsprechend den gesetzlichen Buchführungspflichten (in Deutschland i. d. R. 10 Jahre gemäß §§ 238, 257 HGB und § 147 AO).
                    </li>
                    <li>
                      <strong className="text-white">Einwilligungsnachweise:</strong>{' '}
                      Aufbewahrung bis zum Widerruf der Einwilligung zuzüglich der zur Erfüllung der Nachweispflicht erforderlichen Zeit.
                    </li>
                    <li>
                      <strong className="text-white">localStorage-Eintrag novarch_lang:</strong>{' '}
                      Verbleibt bis zur manuellen Löschung im Browser oder bis zur Löschung der Website-Daten durch die Nutzerin/den Nutzer.
                    </li>
                    <li>
                      <strong className="text-white">Google-Translate-Cookie googtrans:</strong>{' '}
                      Wird durch Google gesetzt; Laufzeit gemäß Datenschutzrichtlinie von Google.
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <strong className="text-white">Security rate-limit data (hashed IPs):</strong>{' '}
                      Automatically deleted after the time window expires (15 minutes to a few hours) via a database-backed TTL mechanism.
                    </li>
                    <li>
                      <strong className="text-white">Contact inquiries and application data:</strong>{' '}
                      Retained for as long as necessary to fulfil the stated processing purpose, unless statutory retention obligations prevent erasure.
                    </li>
                    <li>
                      <strong className="text-white">Payment evidence (Stripe identifiers and payment date):</strong>{' '}
                      Retained in accordance with statutory accounting obligations (in Germany typically 10 years under §§ 238, 257 HGB and § 147 AO).
                    </li>
                    <li>
                      <strong className="text-white">Consent records:</strong>{' '}
                      Retained until withdrawal of consent plus any period required to fulfil the evidence obligation.
                    </li>
                    <li>
                      <strong className="text-white">localStorage entry novarch_lang:</strong>{' '}
                      Remains until manually cleared in the browser or until the user deletes website data.
                    </li>
                    <li>
                      <strong className="text-white">Google Translate cookie googtrans:</strong>{' '}
                      Set by Google; duration per Google&apos;s privacy policy.
                    </li>
                  </>
                )}
              </ul>
            </section>

            {/* ─── 8. Ihre Rechte ─── */}
            <section aria-labelledby="s8">
              <h2 id="s8" className="text-xl font-semibold text-white mb-4">
                {de ? '8. Ihre Datenschutzrechte' : '8. Your Data Protection Rights'}
              </h2>
              <p>
                {de
                  ? 'Als betroffene Person stehen Ihnen nach der DSGVO die folgenden Rechte zu:'
                  : 'As a data subject, you have the following rights under the GDPR:'}
              </p>
              <ul className="mt-3 space-y-2 text-slate-300 text-sm">
                {de ? (
                  <>
                    <li><strong className="text-white">Auskunft (Art. 15 DSGVO):</strong> Sie können Auskunft über die zu Ihrer Person gespeicherten Daten verlangen.</li>
                    <li><strong className="text-white">Berichtigung (Art. 16 DSGVO):</strong> Sie können die Berichtigung unrichtiger oder die Vervollständigung unvollständiger Daten verlangen.</li>
                    <li><strong className="text-white">Löschung (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</li>
                    <li><strong className="text-white">Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie können unter bestimmten Voraussetzungen die Einschränkung der Verarbeitung verlangen.</li>
                    <li><strong className="text-white">Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können Ihre Daten in einem strukturierten, gängigen, maschinenlesbaren Format erhalten, soweit die Verarbeitung auf Einwilligung oder Vertrag beruht.</li>
                    <li><strong className="text-white">Widerspruch (Art. 21 DSGVO):</strong> Sie können der Verarbeitung widersprechen, die auf berechtigte Interessen gestützt wird. Wir werden die Verarbeitung dann einstellen, sofern keine zwingenden schutzwürdigen Gründe überwiegen.</li>
                    <li><strong className="text-white">Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO):</strong> Eine erteilte Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden, ohne dass die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung berührt wird.</li>
                  </>
                ) : (
                  <>
                    <li><strong className="text-white">Access (Art. 15 GDPR):</strong> You may request information about the data stored about you.</li>
                    <li><strong className="text-white">Rectification (Art. 16 GDPR):</strong> You may request correction of inaccurate data or completion of incomplete data.</li>
                    <li><strong className="text-white">Erasure (Art. 17 GDPR):</strong> You may request deletion of your data where no statutory retention obligations apply.</li>
                    <li><strong className="text-white">Restriction of processing (Art. 18 GDPR):</strong> You may request restriction of processing under certain conditions.</li>
                    <li><strong className="text-white">Data portability (Art. 20 GDPR):</strong> You may receive your data in a structured, commonly used, machine-readable format where processing is based on consent or contract.</li>
                    <li><strong className="text-white">Objection (Art. 21 GDPR):</strong> You may object to processing based on legitimate interests. We will cease processing unless compelling legitimate grounds override your interests.</li>
                    <li><strong className="text-white">Withdrawal of consent (Art. 7(3) GDPR):</strong> A consent given may be withdrawn at any time with effect for the future, without affecting the lawfulness of processing carried out before withdrawal.</li>
                  </>
                )}
              </ul>
              <p className="mt-4">
                {de
                  ? 'Zur Ausübung Ihrer Rechte wenden Sie sich bitte an '
                  : 'To exercise your rights, please contact '}
                <a href="mailto:mesum@novarch.eu" className="text-cyan-300 hover:text-cyan-100">
                  mesum@novarch.eu
                </a>
                .
              </p>
            </section>

            {/* ─── 9. Beschwerderecht ─── */}
            <section aria-labelledby="s9">
              <h2 id="s9" className="text-xl font-semibold text-white mb-4">
                {de
                  ? '9. Beschwerderecht bei einer Aufsichtsbehörde'
                  : '9. Right to Lodge a Complaint'}
              </h2>
              <p>
                {de
                  ? 'Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt, haben Sie das Recht, eine Beschwerde bei einer zuständigen Datenschutz-Aufsichtsbehörde einzureichen. Die für unseren Standort in Thüringen zuständige Aufsichtsbehörde ist:'
                  : 'If you believe that the processing of your personal data infringes the GDPR, you have the right to lodge a complaint with a competent supervisory authority. The authority responsible for our location in Thuringia is:'}
              </p>
              <InfoBox>
                <strong className="text-white block mb-1">
                  {de
                    ? 'Thüringer Landesbeauftragter für den Datenschutz und die Informationsfreiheit (TLfDI)'
                    : 'Thuringia State Commissioner for Data Protection and Freedom of Information (TLfDI)'}
                </strong>
                Häßlerstraße 8<br />
                99096 Erfurt<br />
                {de ? 'Deutschland' : 'Germany'}<br />
                <a
                  href="https://www.tlfdi.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-100"
                >
                  www.tlfdi.de
                </a>
              </InfoBox>
              <p className="mt-3 text-sm text-slate-400">
                {de
                  ? 'Sie können sich auch an die Aufsichtsbehörde Ihres gewöhnlichen Aufenthaltsorts oder Ihres Arbeitsplatzes wenden.'
                  : 'You may also contact the supervisory authority of your habitual residence or place of work.'}
              </p>
            </section>

            {/* ─── 10. Cookies ─── */}
            <section aria-labelledby="s10">
              <h2 id="s10" className="text-xl font-semibold text-white mb-4">
                {de ? '10. Cookies und lokaler Speicher' : '10. Cookies and Local Storage'}
              </h2>
              <div className="overflow-x-auto rounded-xl border border-[#1e3a5f]">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#1e3a5f] bg-[#0b1524]">
                      <th className="py-3 px-4 text-left text-cyan-300 font-semibold">{de ? 'Name' : 'Name'}</th>
                      <th className="py-3 px-4 text-left text-cyan-300 font-semibold">{de ? 'Typ' : 'Type'}</th>
                      <th className="py-3 px-4 text-left text-cyan-300 font-semibold">{de ? 'Zweck' : 'Purpose'}</th>
                      <th className="py-3 px-4 text-left text-cyan-300 font-semibold">{de ? 'Anbieter' : 'Provider'}</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-[#1e3a5f]/50">
                      <td className="py-3 px-4 font-mono text-xs">novarch_lang</td>
                      <td className="py-3 px-4">localStorage</td>
                      <td className="py-3 px-4">
                        {de
                          ? 'Speichert Sprachpräferenz (de/en) auf dem Endgerät'
                          : 'Stores language preference (de/en) on the device'}
                      </td>
                      <td className="py-3 px-4">NOVARCH</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-xs">googtrans</td>
                      <td className="py-3 px-4">Cookie</td>
                      <td className="py-3 px-4">
                        {de
                          ? 'Speichert gewählte Übersetzungssprache; wird nur nach Betätigung des Sprachumschalters durch Google gesetzt'
                          : 'Stores the selected translation language; set by Google only after the language switcher is activated'}
                      </td>
                      <td className="py-3 px-4">Google LLC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-400">
                {de
                  ? 'Wir setzen keine Analyse-, Tracking- oder Werbecookies ein. Technisch notwendige Session-Cookies des Webservers, die keine personenbezogenen Daten enthalten, werden in dieser Erklärung nicht gesondert aufgeführt.'
                  : 'We do not use analytics, tracking, or advertising cookies. Technically necessary session cookies of the web server that contain no personal data are not separately listed in this policy.'}
              </p>
            </section>

            {/* ─── 11. Änderungen ─── */}
            <section aria-labelledby="s11">
              <h2 id="s11" className="text-xl font-semibold text-white mb-4">
                {de ? '11. Änderungen dieser Datenschutzerklärung' : '11. Changes to This Privacy Policy'}
              </h2>
              <p>
                {de
                  ? 'Wir behalten uns vor, diese Datenschutzerklärung bei Änderungen der rechtlichen Anforderungen oder unserer Verarbeitungspraktiken zu aktualisieren. Die jeweils aktuelle Fassung ist stets unter dieser URL abrufbar. Das Datum der letzten Aktualisierung ist am Anfang des Dokuments angegeben.'
                  : 'We reserve the right to update this privacy policy when legal requirements or our processing practices change. The current version is always available at this URL. The date of the last update is shown at the beginning of this document.'}
              </p>
            </section>

          </div>

          {/* Bottom nav */}
          <div className="mt-16 pt-8 border-t border-[#1e3a5f] flex flex-col sm:flex-row gap-4 text-sm">
            <Link href="/impressum" className="text-cyan-300 hover:text-cyan-100 transition-colors">
              Impressum
            </Link>
            <Link href="/legal/winter-arc-2026" className="text-cyan-300 hover:text-cyan-100 transition-colors">
              Legal &amp; Event Hub
            </Link>
            <a href="mailto:mesum@novarch.eu" className="text-cyan-300 hover:text-cyan-100 transition-colors">
              mesum@novarch.eu
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
