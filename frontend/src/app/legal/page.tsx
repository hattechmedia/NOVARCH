import type { Metadata } from 'next';
import { LegalHubContent } from '@/components/sections/LegalHubContent';

export const metadata: Metadata = {
  title: 'Legal & Event Hub | NOVARCH',
  description:
    'Legal documents, participant privacy notices, event consent disclosures, and confidentiality terms for NOVARCH gatherings, hackathons, and client engagements.',
  alternates: {
    canonical: 'https://www.novarch.eu/legal',
  },
  openGraph: {
    title: 'Legal & Event Hub | NOVARCH',
    description:
      'Legal documents, participant privacy notices, event consent disclosures, and confidentiality terms for NOVARCH gatherings, hackathons, and client engagements.',
    url: 'https://www.novarch.eu/legal',
    siteName: 'NOVARCH',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function LegalPage() {
  return (
    <main className="w-full">
      <LegalHubContent />
    </main>
  );
}
