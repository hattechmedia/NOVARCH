import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function PermanentLegalPage({ privacy = false }: { privacy?: boolean }) {
  return <div translate="no" className="notranslate min-h-[70vh] bg-[#030712] text-slate-200"><Container className="py-14 sm:py-20"><div className="mx-auto max-w-3xl">
    <Link href="/legal/winter-arc-2026" className="text-sm text-cyan-300">← Legal &amp; Event Hub</Link>
    <p className="mt-10 text-xs font-mono uppercase tracking-widest text-cyan-300">NOVARCH / Permanent information</p>
    <h1 className="mt-3 text-4xl font-bold text-white">{privacy ? 'Datenschutz / Privacy' : 'Impressum / Operator information'}</h1>
    <div className="mt-8 rounded-2xl border border-amber-400/25 bg-amber-400/5 p-6 text-sm leading-7">
      <h2 className="font-semibold text-amber-200">Document awaiting approval / Dokument zur Freigabe ausstehend</h2>
      <p className="mt-3" lang="en">{privacy ? 'The approved website privacy policy, including operator details, service providers, processing purposes, retention and transfer information, has not yet been supplied. This page is not a complete website privacy policy. Event registration information is available in the separate event hub.' : 'The verified operator name, service address, authorized representative and applicable registration and tax details have not yet been supplied. This page is not a complete legal notice.'}</p>
      <p className="mt-4" lang="de">{privacy ? 'Die freigegebene Datenschutzerklärung der Website mit Betreiberangaben, Dienstleistern, Verarbeitungszwecken, Aufbewahrung und Übermittlungen liegt noch nicht vor. Diese Seite ist keine vollständige Datenschutzerklärung. Informationen zur Veranstaltungsanmeldung finden Sie im separaten Event-Hub.' : 'Der bestätigte Betreibername, die ladungsfähige Anschrift, die vertretungsberechtigte Person sowie gegebenenfalls Register- und Steuerangaben liegen noch nicht vor. Diese Seite ist kein vollständiges Impressum.'}</p>
    </div>
    <a href="mailto:hello@novarch.io" className="mt-6 inline-block text-sm text-cyan-300 underline underline-offset-4">Contact / Kontakt: hello@novarch.io</a>
  </div></Container></div>;
}
