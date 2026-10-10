import type { Metadata } from 'next';
import { WinterArcContent } from '@/components/sections/WinterArcContent';

export const metadata: Metadata = {
  title: 'Winter Arc · Treffen 01 | NOVARCH Ilmenau',
  description:
    'Apply for Winter Arc · Treffen 01, a curated gathering in Ilmenau bringing together founders, creatives, researchers, students, and technology communities.',
  alternates: {
    canonical: 'https://www.novarch.com/winter-arc',
  },
  openGraph: {
    title: 'Winter Arc · Treffen 01 | NOVARCH Ilmenau',
    description:
      'Apply for Winter Arc · Treffen 01, a curated gathering in Ilmenau bringing together founders, creatives, researchers, students, and technology communities.',
    url: 'https://www.novarch.com/winter-arc',
    siteName: 'NOVARCH',
    type: 'website',
    images: [
      {
        url: '/images/og/winter-arc.png',
        width: 1200,
        height: 630,
        alt: 'Winter Arc · Treffen 01 | NOVARCH Ilmenau',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Winter Arc · Treffen 01 | NOVARCH Ilmenau',
    description:
      'Apply for Winter Arc · Treffen 01, a curated gathering in Ilmenau bringing together founders, creatives, researchers, students, and technology communities.',
    images: ['/images/og/winter-arc.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WinterArcPage() {
  return (
    <main className="w-full">
      <WinterArcContent />
    </main>
  );
}
