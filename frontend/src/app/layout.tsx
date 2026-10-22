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
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col flex-1 w-full">
            <ScrollToTop />
            <Navbar />
            <main className="flex-1 flex flex-col pt-20 w-full">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {/* Mount target for Google Translate web engine outside visible viewport */}
        <div
          id="google_translate_element"
          className="pointer-events-none overflow-hidden -z-50"
          style={{ position: 'fixed', top: -9999, left: -9999, width: 1, height: 1, opacity: 0 }}
          aria-hidden="true"
        />
      </body>
    </html>
  );
}
