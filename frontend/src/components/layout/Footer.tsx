import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SITE, BRAND_PRINCIPLES } from '@/lib/constants';
import { Container } from '@/components/ui/Container';

const serviceLinks = [
  { label: 'Digital Launch', href: '/services/digital-launch' },
  { label: 'Automation & Integration', href: '/services/automation-integration' },
  { label: 'AI Workflow', href: '/services/ai-workflow' },
  { label: 'Custom Software', href: '/services/custom-software' },
];

const companyLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D1B2A] text-white" role="contentinfo">
      {/* Main Footer */}
      <Container className="pt-16 pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label="NOVARCH — Home" className="flex items-center gap-1.5 mb-6 group">
              <Image
                src="/images/logo/logo4F.png"
                alt="NOVARCH Mark"
                width={80}
                height={80}
                className="h-13 sm:h-15 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_0_10px_rgba(56,178,216,0.3)]"
              />
              <Image
                src="/images/logo/ovarch-text.png"
                alt="OVARCH"
                width={160}
                height={28}
                className="h-5.5 sm:h-6.5 w-auto object-contain -ml-1 transition-opacity duration-200 group-hover:opacity-95"
              />
            </Link>
            <p className="text-sm text-[#7A8FA6] leading-relaxed max-w-xs">
              AI, software and digital systems built with human control and data ownership from the start.
            </p>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#38B2D8] mb-3">
                Principles
              </p>
              <ul className="space-y-1.5">
                {BRAND_PRINCIPLES.map((principle) => (
                  <li key={principle} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#38B2D8]" aria-hidden="true" />
                    <span className="text-xs text-[#7A8FA6]">{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#4A5B6F] mb-4">
              Services
            </h3>
            <ul className="space-y-2.5" role="list">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-[#7A8FA6] hover:text-white transition-colors duration-200"
                  >
                    <ArrowRight className="h-3 w-3 text-[#1E5FBF] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#4A5B6F] mb-4">
              Company
            </h3>
            <ul className="space-y-2.5" role="list">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-[#7A8FA6] hover:text-white transition-colors duration-200"
                  >
                    <ArrowRight className="h-3 w-3 text-[#1E5FBF] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#4A5B6F] mb-3">
                Location
              </h3>
              <p className="text-sm text-[#7A8FA6]">{SITE.location}</p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-1 block text-sm text-[#7A8FA6] hover:text-white transition-colors"
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-[#152E4D]">
        <Container className="py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#4A5B6F]" suppressHydrationWarning>
              © {year} {SITE.name}. All rights reserved.
            </p>
            <p className="text-xs text-[#4A5B6F]">
              Designed by{' '}
              <a
                href="https://hattechmedia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline underline-offset-2"
              >
                hattech
              </a>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
