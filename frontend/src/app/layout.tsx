import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { ScrollToTop } from '@/components/layout/ScrollToTop';

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
    <html lang="en" className={`${inter.variable} h-full dark`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          id="theme-init"
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
      <body className="bg-background text-foreground antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            <Navbar />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {/* Hidden mount target for Google Translate web engine outside page flow */}
        <div
          id="google_translate_element"
          className="hidden absolute pointer-events-none w-0 h-0 overflow-hidden -z-50"
          style={{ display: 'none', height: 0, width: 0, margin: 0, padding: 0 }}
          aria-hidden="true"
        />
      </body>
    </html>
  );
}
