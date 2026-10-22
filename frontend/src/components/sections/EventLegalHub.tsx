import Link from 'next/link';
import { ArrowUpRight, Shield, Lock, Users, Camera, Flag, HeartHandshake } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const sections = [
  { id: 'confidentiality', title: 'Confidentiality', de: 'Vertraulichkeit', icon: Lock },
  { id: 'participant-data', title: 'Participant data', de: 'Teilnehmerdaten', icon: Users },
  { id: 'photography', title: 'Photography & video', de: 'Foto & Video', icon: Camera },
  { id: 'hacktheflag', title: '#HACKTHEFLAG', de: 'Challenge & Preise', icon: Flag },
  { id: 'participation', title: 'Taking part', de: 'Teilnahme', icon: HeartHandshake },
];

const content = [
  {
    en: 'Approved confidentiality documents', de: 'Freigegebene Vertraulichkeitsdokumente',
    english: 'The approved German and English NDA documents have not yet been supplied for this hub. No replacement NDA terms are presented here. Ask the NOVARCH team for the approved document before disclosing confidential information.',
    german: 'Die freigegebenen deutschen und englischen NDA-Dokumente liegen für diese Übersicht noch nicht vor. Hier werden keine ersatzweisen NDA-Bedingungen veröffentlicht. Bitte fragen Sie das NOVARCH-Team vor der Offenlegung vertraulicher Informationen nach dem freigegebenen Dokument.',
    note: 'Approved document required / Freigegebenes Dokument erforderlich',
  },
  {
    en: 'Your registration, your choices', de: 'Ihre Anmeldung, Ihre Entscheidung',
    english: 'Registration collects your name, email, city, organization, application answers and any optional contact details, links or guest suggestions you provide. Referral information and your separate email and photography choices are also stored. NOVARCH uses these records to review applications, organize the event and contact you about your registration. A future participant dashboard is planned; it is not currently available. Updates about future hackathons, events and NOVARCH activities require the separate optional email checkbox.',
    german: 'Bei der Anmeldung werden Name, E-Mail, Stadt, Organisation, Bewerbungsantworten sowie freiwillig angegebene Kontaktdaten, Links oder Gastvorschläge erfasst. Herkunftsinformationen sowie Ihre getrennten Entscheidungen zu E-Mails und Aufnahmen werden ebenfalls gespeichert. NOVARCH nutzt diese Angaben zur Prüfung der Anmeldung, Veranstaltungsorganisation und Kommunikation zu Ihrer Anmeldung. Ein Teilnehmer-Dashboard ist geplant, aber noch nicht verfügbar. Informationen über zukünftige Hackathons, Veranstaltungen und NOVARCH-Aktivitäten erfordern die gesonderte freiwillige E-Mail-Einwilligung.',
    note: 'Full privacy disclosures await operator and legal review / Vollständige Datenschutzhinweise erfordern Betreiberangaben und rechtliche Prüfung',
  },
  {
    en: 'Consent before the camera', de: 'Einwilligung vor der Aufnahme',
    english: 'The registration form has a separate, optional and initially unchecked photography checkbox. If you consent, photos and videos may be recorded and stored for NOVARCH website and social-media use. If you decline, you must not be intentionally recorded or have such recordings stored, and your participation must not be disadvantaged. Tell the event team your preference before recording. To request withdrawal of email or photography consent, contact mesum@novarch.eu using your registered email. Final publication channels and the on-site recording process still require organizer confirmation.',
    german: 'Das Anmeldeformular enthält ein separates, freiwilliges und zunächst nicht ausgewähltes Foto-Kontrollkästchen. Mit Ihrer Einwilligung dürfen Fotos und Videos für die NOVARCH-Website und soziale Medien aufgenommen und gespeichert werden. Ohne Einwilligung dürfen Sie nicht gezielt aufgenommen oder entsprechende Aufnahmen gespeichert werden; Ihre Teilnahme darf dadurch nicht benachteiligt werden. Teilen Sie dem Veranstaltungsteam Ihre Entscheidung vor Aufnahmen mit. Einen Widerruf der E-Mail- oder Fotoeinwilligung können Sie über Ihre registrierte E-Mail-Adresse an mesum@novarch.eu richten. Die endgültigen Veröffentlichungskanäle und das Aufnahmeverfahren vor Ort bedürfen noch der Bestätigung durch die Veranstalter.',
    note: 'Optional. Separate from event registration. / Freiwillig. Von der Anmeldung getrennt.',
  },
  {
    en: 'Challenge scope & prize information', de: 'Challenge-Umfang & Preisinformationen',
    english: 'Use only the challenge link or QR code provided by NOVARCH. Stay within the designated challenge environment; do not scan or attack external systems. Do not publish solutions or hints during the challenge. Eligibility, opening and closing times including timezone, prize details, judging, tie-breaks and winner conditions have not yet been confirmed. This page does not announce an active prize competition. Obtain the complete confirmed terms from the organizer before entering for a prize.',
    german: 'Verwenden Sie ausschließlich den von NOVARCH bereitgestellten Challenge-Link oder QR-Code. Bleiben Sie innerhalb der vorgesehenen Challenge-Umgebung und scannen oder attackieren Sie keine externen Systeme. Veröffentlichen Sie während der Challenge keine Lösungen oder Hinweise. Teilnahmeberechtigung, Beginn und Ende einschließlich Zeitzone, Preise, Bewertung, Gleichstandsregeln und Gewinnerbedingungen sind noch nicht bestätigt. Diese Seite kündigt kein aktives Gewinnspiel an. Lassen Sie sich vor einer Teilnahme um einen Preis die vollständigen bestätigten Bedingungen vom Veranstalter geben.',
    note: 'Prize terms awaiting confirmation / Preisbedingungen noch nicht bestätigt',
  },
  {
    en: 'A considerate space to build together', de: 'Ein respektvoller Raum für Zusammenarbeit',
    english: 'Treat other participants respectfully and respect their privacy, recording preferences and confidential information. Follow the venue safety instructions and the event team’s directions. Use only systems explicitly included in the challenge scope. Report safety concerns or unwanted behavior to the event team. Final event-specific conduct and safety rules require organizer approval.',
    german: 'Behandeln Sie andere Teilnehmende respektvoll und achten Sie deren Privatsphäre, Aufnahmeentscheidungen und vertrauliche Informationen. Befolgen Sie die Sicherheitshinweise des Veranstaltungsorts und die Anweisungen des Teams. Verwenden Sie ausschließlich ausdrücklich für die Challenge freigegebene Systeme. Melden Sie Sicherheitsbedenken oder unerwünschtes Verhalten dem Veranstaltungsteam. Die endgültigen veranstaltungsspezifischen Verhaltens- und Sicherheitsregeln bedürfen der Freigabe durch den Veranstalter.',
    note: 'Organizer review pending / Freigabe durch Veranstalter ausstehend',
  },
];

export function EventLegalHub() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-200">
      <div className="border-b border-white/10 bg-[radial-gradient(ellipse_at_top_right,rgba(30,95,191,0.22),transparent_65%)]">
        <Container className="py-12 sm:py-20">
          <div className="mb-6 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-300"><Shield className="h-4 w-4" /> NOVARCH / Winter Arc 2026</div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">Good experiences.<br /><span className="text-cyan-300">Clear ground rules.</span></h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">Legal &amp; Event Hub / Rechtliches &amp; Veranstaltungsinformationen. Your registration, privacy and participation information in one permanent place.</p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs"><span className="rounded-full border border-white/15 px-3 py-2">English + Deutsch</span><span className="rounded-full border border-white/15 px-3 py-2">Permanent QR destination</span></div>
        </Container>
      </div>
      <Container className="py-8 sm:py-12">
        {/* <div className="mb-8 rounded-xl border border-amber-400/25 bg-amber-400/5 p-4 text-sm leading-6 text-amber-100" role="note">Review in progress / Prüfung läuft. Approved NDA text, operator details and final competition terms are still outstanding. This hub is not a completed legal approval.</div> */}
        <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14">
          <nav aria-label="Event hub sections" className="self-start lg:sticky lg:top-28">
            <p className="mb-4 text-xs font-mono uppercase tracking-widest text-slate-400">On this page / Übersicht</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">{sections.map((s, i) => <a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 rounded-xl border border-white/10 p-3 transition-colors hover:border-cyan-400/50 hover:bg-cyan-400/5 focus-visible:outline-2 focus-visible:outline-cyan-300"><span className="text-xs font-mono text-cyan-300">0{i + 1}</span><span className="text-sm">{s.title}<span className="block text-xs text-slate-400">{s.de}</span></span></a>)}</div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-cyan-300"><Link href="/impressum">Impressum ↗</Link><Link href="/datenschutz">Datenschutz ↗</Link></div>
          </nav>
          <div className="min-w-0 space-y-6">{sections.map((s, i) => {
            const item = content[i]; const Icon = s.icon;
            return <section key={s.id} id={s.id} className="scroll-mt-28 rounded-2xl border border-white/10 bg-[#07101c] p-5 sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-4"><div><div className="mb-2 text-xs font-mono text-cyan-300">0{i + 1} / {s.title}</div><h2 className="text-xl font-semibold text-white sm:text-2xl">{item.en}</h2><p className="mt-1 text-sm text-slate-400" lang="de">{item.de}</p></div><Icon className="h-6 w-6 shrink-0 text-cyan-300" /></div>
              <div className="space-y-5 text-sm leading-7"><div lang="en"><h3 className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">English</h3><p>{item.english}</p></div><div lang="de" className="border-t border-white/10 pt-5"><h3 className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">Deutsch</h3><p>{item.german}</p></div></div>
              <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-5 text-cyan-200">{item.note}</p>
              {s.id === 'photography' && <Link href="/winter-arc#apply" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#1E5FBF] px-4 py-3 text-sm font-semibold text-white">Registration &amp; consent / Anmeldung <ArrowUpRight className="h-4 w-4" /></Link>}
            </section>;
          })}</div>
        </div>
      </Container>
    </div>
  );
}
