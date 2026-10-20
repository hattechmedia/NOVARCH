import type { Metadata } from 'next';
import { WinterArcLegalContent } from '@/components/sections/WinterArcLegalContent';

export const metadata: Metadata = {
  title: 'Participant Privacy Notice — Winter Arc 2026 | NOVARCH',
  description:
    'Participant Privacy Notice for Winter Arc · Treffen 01 in Ilmenau. Information regarding participant data collection, legal bases under GDPR, retention, and rights.',
  alternates: {
    canonical: 'https://www.novarch.eu/legal/winter-arc-2026',
  },
  openGraph: {
    title: 'Participant Privacy Notice — Winter Arc 2026 | NOVARCH',
    description:
      'Participant Privacy Notice for Winter Arc · Treffen 01 in Ilmenau. Official GDPR/DSGVO disclosures, data retention, and participant rights.',
    url: 'https://www.novarch.eu/legal/winter-arc-2026',
    siteName: 'NOVARCH',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function WinterArcLegalPage() {
  return (
    <main className="w-full">
      <WinterArcLegalContent />
    </main>
  );
}
