import type { Metadata } from 'next';
import { HackTheFlagContent } from '@/components/sections/HackTheFlagContent';

export const metadata: Metadata = {
  title: 'HackTheFlag · Live Cybersecurity Challenge | NOVARCH',
  description:
    'Access the NOVARCH HackTheFlag cybersecurity challenge. Scan the QR code with your smartphone or open the live challenge environment directly.',
  alternates: {
    canonical: 'https://novarch.eu/hacktheflag',
  },
  openGraph: {
    title: 'HackTheFlag · Live Cybersecurity Challenge | NOVARCH',
    description:
      'Access the NOVARCH HackTheFlag cybersecurity challenge. Scan the QR code with your smartphone or open the live challenge environment directly.',
    url: 'https://novarch.eu/hacktheflag',
    siteName: 'NOVARCH',
    type: 'website',
    images: [
      {
        url: '/images/hacktheflag/hacktheflag-qr.png',
        width: 1200,
        height: 1200,
        alt: 'NOVARCH HackTheFlag Live Challenge QR Code',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HackTheFlag · Live Cybersecurity Challenge | NOVARCH',
    description:
      'Access the NOVARCH HackTheFlag cybersecurity challenge. Scan the QR code with your smartphone or open the live challenge environment directly.',
    images: ['/images/hacktheflag/hacktheflag-qr.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HackTheFlagPage() {
  return (
    <main className="w-full">
      <HackTheFlagContent />
    </main>
  );
}
