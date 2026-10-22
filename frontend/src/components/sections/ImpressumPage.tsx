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

export function ImpressumPage() {
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
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-300">NOVARCH</p>
          <h1 className="mt-3 text-4xl font-bold text-white">
            {de ? 'Impressum' : 'Legal Notice / Impressum'}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {de
              ? 'Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Abs. 2 Medienstaatsvertrag (MStV)'
              : 'Information pursuant to § 5 Digital Services Act (DDG) and § 18(2) State Media Treaty (MStV)'}
          </p>

          <LangToggle lang={lang} setLang={handleSetLang} />

          <div className="mt-10 space-y-10 leading-7 text-[15px]">

            {/* 1. Anbieterkennzeichnung */}
            <section aria-labelledby="s1">
              <h2 id="s1" className="text-xl font-semibold text-white mb-4">
                {de ? '1. Diensteanbieter' : '1. Service Provider'}
              </h2>
              <InfoBox>
                <strong className="text-white block text-base mb-1">NOVARCH</strong>
                Ilmenau, Thüringen<br />
                {de ? 'Deutschland' : 'Germany'}<br />
                Website:{' '}
                <a href="https://novarch.eu" className="text-cyan-300 hover:text-cyan-100 font-mono">
                  https://novarch.eu
                </a>
              </InfoBox>
            </section>

            {/* 2. Vertretungsberechtigung */}
            <section aria-labelledby="s2">
              <h2 id="s2" className="text-xl font-semibold text-white mb-4">
                {de ? '2. Vertreten durch' : '2. Represented by'}
              </h2>
              <InfoBox>
                <span className="text-white font-medium">Mesum Hafeez</span><br />
                <span className="text-slate-400 text-xs">
                  {de ? 'Verantwortlich für den Geschäftsbetrieb' : 'Responsible for operations'}
                </span>
              </InfoBox>
            </section>

            {/* 3. Kontakt */}
            <section aria-labelledby="s3">
              <h2 id="s3" className="text-xl font-semibold text-white mb-4">
                {de ? '3. Kontakt' : '3. Contact Information'}
              </h2>
              <InfoBox>
                E-Mail:{' '}
                <a href="mailto:mesum@novarch.eu" className="text-cyan-300 hover:text-cyan-100 font-mono">
                  mesum@novarch.eu
                </a>
                <br />
                Website:{' '}
                <a href="https://novarch.eu" className="text-cyan-300 hover:text-cyan-100 font-mono">
                  https://novarch.eu
                </a>
              </InfoBox>
            </section>

            {/* 4. Register & Umsatzsteuer */}
            <section aria-labelledby="s4">
              <h2 id="s4" className="text-xl font-semibold text-white mb-4">
                {de ? '4. Register und Umsatzsteuer' : '4. Register and VAT'}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-cyan-300 mb-1">
                    {de ? 'Registereintragung:' : 'Commercial Register:'}
                  </h3>
                  <p className="text-slate-300 text-sm">
                    {de
                      ? 'Angaben zur Registereintragung (Registergericht und Registernummer) erfolgen vorbehaltlich der gesetzlichen Eintragungspflicht. Sofern keine Eintragungspflicht besteht, wird kein Register geführt.'
                      : 'Commercial register details (register court and registration number) apply subject to statutory registration requirements. Where no registration obligation applies, no register is kept.'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-cyan-300 mb-1">
                    {de ? 'Umsatzsteuer-Identifikationsnummer:' : 'VAT Identification Number:'}
                  </h3>
                  <p className="text-slate-300 text-sm">
                    {de
                      ? 'Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: Vorbehaltlich der Vergabe durch die zuständige Finanzbehörde.'
                      : 'VAT identification number pursuant to § 27 a German VAT Act: Subject to allocation by the competent tax authority.'}
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Verantwortlich für redaktionelle Inhalte */}
            <section aria-labelledby="s5">
              <h2 id="s5" className="text-xl font-semibold text-white mb-4">
                {de ? '5. Verantwortlich für redaktionelle Inhalte' : '5. Editorial Responsibility'}
              </h2>
              <p className="text-sm text-slate-300 mb-2">
                {de
                  ? 'Verantwortlich nach § 18 Abs. 2 MStV:'
                  : 'Responsible under § 18(2) State Media Treaty (MStV):'}
              </p>
              <InfoBox>
                <strong className="text-white block mb-0.5">Mesum Hafeez</strong>
                Ilmenau, Thüringen, {de ? 'Deutschland' : 'Germany'}<br />
                E-Mail:{' '}
                <a href="mailto:mesum@novarch.eu" className="text-cyan-300 hover:text-cyan-100 font-mono">
                  mesum@novarch.eu
                </a>
              </InfoBox>
            </section>

            {/* 6. Streitschlichtung */}
            <section aria-labelledby="s6">
              <h2 id="s6" className="text-xl font-semibold text-white mb-4">
                {de ? '6. Verbraucherstreitbeilegung' : '6. Consumer Dispute Resolution'}
              </h2>
              <p className="text-slate-300 text-sm">
                {de
                  ? 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter '
                  : 'The European Commission provides a platform for online dispute resolution (ODR), accessible at '}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-100"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                {de
                  ? ' finden. Unsere E-Mail-Adresse finden Sie oben im Impressum.'
                  : '. Our email address can be found above in this notice.'}
              </p>
              <p className="mt-3 text-slate-300 text-sm">
                {de
                  ? 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
                  : 'We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.'}
              </p>
            </section>

            {/* 7. Haftung für Inhalte */}
            <section aria-labelledby="s7">
              <h2 id="s7" className="text-xl font-semibold text-white mb-4">
                {de ? '7. Haftung für Inhalte' : '7. Liability for Content'}
              </h2>
              <p className="text-slate-300 text-sm">
                {de
                  ? 'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.'
                  : 'As a service provider, we are responsible under § 7(1) DDG for our own content on these pages in accordance with general laws. According to §§ 8 to 10 DDG, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances pointing to unlawful activity.'}
              </p>
              <p className="mt-2 text-slate-300 text-sm">
                {de
                  ? 'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.'
                  : 'Obligations to remove or block the use of information under general laws remain unaffected. Liability in this respect is, however, only possible from the date of knowledge of a specific infringement. Upon becoming aware of such violations, we will remove this content immediately.'}
              </p>
            </section>

            {/* 8. Haftung für Links */}
            <section aria-labelledby="s8">
              <h2 id="s8" className="text-xl font-semibold text-white mb-4">
                {de ? '8. Haftung für Links' : '8. Liability for Links'}
              </h2>
              <p className="text-slate-300 text-sm">
                {de
                  ? 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.'
                  : 'Our offer contains links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any liability for this external content. The respective provider or operator of the pages is always responsible for the content of linked sites. Linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking.'}
              </p>
              <p className="mt-2 text-slate-300 text-sm">
                {de
                  ? 'Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.'
                  : 'However, continuous monitoring of linked page content is not reasonable without concrete evidence of an infringement. Upon becoming aware of legal violations, we will remove such links immediately.'}
              </p>
            </section>

            {/* 9. Urheberrecht */}
            <section aria-labelledby="s9">
              <h2 id="s9" className="text-xl font-semibold text-white mb-4">
                {de ? '9. Urheberrecht' : '9. Copyright'}
              </h2>
              <p className="text-slate-300 text-sm">
                {de
                  ? 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.'
                  : 'The content and works created by the site operators on these pages are subject to German copyright law. Duplication, editing, distribution, and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are permitted for private, non-commercial use only.'}
              </p>
              <p className="mt-2 text-slate-300 text-sm">
                {de
                  ? 'Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.'
                  : 'Where content on this site was not created by the operator, third-party copyrights are respected. In particular, third-party content is marked as such. Should you nevertheless become aware of a copyright infringement, please notify us accordingly. Upon becoming aware of infringements, we will remove such content immediately.'}
              </p>
            </section>

          </div>

          {/* Bottom nav */}
          <div className="mt-16 pt-8 border-t border-[#1e3a5f] flex flex-col sm:flex-row gap-4 text-sm">
            <Link href="/datenschutz" className="text-cyan-300 hover:text-cyan-100 transition-colors">
              {de ? 'Datenschutzerklärung' : 'Privacy Policy'}
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
