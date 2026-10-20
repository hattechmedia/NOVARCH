import type { Metadata } from 'next';
import { EventLegalHub } from '@/components/sections/EventLegalHub';

export const metadata: Metadata = {
  title: 'Legal & Event Hub — Winter Arc 2026 | NOVARCH',
  description:
    'Winter Arc event information: confidentiality, participant data, photography choices, challenge information and participation guidance in English and German.',
  alternates: {
    canonical: 'https://www.novarch.eu/legal/winter-arc-2026',
  },
  openGraph: {
    title: 'Legal & Event Hub — Winter Arc 2026 | NOVARCH',
    description:
      'The permanent NOVARCH Winter Arc event hub in English and German.',
    url: 'https://www.novarch.eu/legal/winter-arc-2026',
    siteName: 'NOVARCH',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function WinterArcLegalPage() {
  return (
    <main className="w-full">
      <EventLegalHub />
    </main>
  );
}
