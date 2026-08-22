import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'NOVARCH — AI, Software & Digital Systems',
    template: '%s — NOVARCH',
  },
  description:
    'NOVARCH designs and builds AI, software and digital systems that help businesses sell, operate and grow — with human control and data ownership built in.',
  metadataBase: new URL('https://novarch.io'),
  icons: {
    icon: [
      { url: '/images/logo/logo4F.png' },
      { url: '/favicon.png' },
    ],
    shortcut: '/images/logo/logo4F.png',
    apple: '/images/logo/logo4F.png',
  },
  openGraph: {
    siteName: 'NOVARCH',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.add('dark');
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
