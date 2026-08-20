'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronDown, ArrowRight } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [servicesOpen, setServicesOpen] = React.useState(false);

  const handleClose = () => {
    setServicesOpen(false);
    onClose();
  };

  const weOffer = navigation.find((n) => n.label === 'We Offer');

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-80 max-w-full bg-surface-card text-text shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col border-l border-border',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Link href="/" onClick={handleClose} className="flex items-center gap-2.5" aria-label="NOVARCH — Home">
            <Image
              src="/images/logo/logo2-removebg-preview.png"
              alt="NOVARCH"
              width={36}
              height={36}
              className="h-8 w-auto object-contain"
            />
            <span className="text-xl font-extrabold tracking-wider text-text uppercase">
              NOVARCH
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="rounded-sm p-1.5 text-text-muted hover:bg-surface-2 hover:text-text transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile navigation">
          <ul className="space-y-1" role="list">
            {/* Home */}
            <li>
              <Link
                href="/"
                onClick={handleClose}
                className="flex items-center rounded-sm px-3 py-2.5 text-base font-semibold text-text hover:bg-surface-2 hover:text-blue transition-colors"
              >
                Home
              </Link>
            </li>

            {/* We Offer accordion */}
            {weOffer && (
              <li>
                <button
                  onClick={() => setServicesOpen((o) => !o)}
                  aria-expanded={servicesOpen}
                  className="flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-base font-semibold text-text hover:bg-surface-2 transition-colors"
                >
                  We Offer
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-text-muted transition-transform duration-200',
                      servicesOpen && 'rotate-180'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    servicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <ul className="ml-3 mt-1 space-y-0.5 border-l-2 border-blue-light pl-3" role="list">
                    {weOffer.children?.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={handleClose}
                          className="group flex items-start gap-2 rounded-sm px-2 py-2.5 transition-colors hover:bg-surface-2"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-text group-hover:text-blue transition-colors">
                                {child.label}
                              </span>
                              <ArrowRight className="h-3 w-3 text-text-light group-hover:text-blue transition-colors flex-shrink-0" />
                            </div>
                            {child.description && (
                              <p className="mt-0.5 text-xs text-text-light leading-relaxed pr-4">
                                {child.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )}

            {/* About & Contact */}
            {['About', 'Contact'].map((label) => {
              const item = navigation.find((n) => n.label === label);
              if (!item) return null;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleClose}
                    className="flex items-center rounded-sm px-3 py-2.5 text-base font-semibold text-text hover:bg-surface-2 hover:text-blue transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer CTA */}
        <div className="border-t border-border p-4">
          <Link
            href="/contact"
            onClick={handleClose}
            className="flex w-full items-center justify-center rounded-sm bg-text px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue"
          >
            Start a Project
          </Link>
          <p className="mt-3 text-center text-xs text-text-light">
            Based in Ilmenau, Germany
          </p>
        </div>
      </div>
    </>
  );
}
