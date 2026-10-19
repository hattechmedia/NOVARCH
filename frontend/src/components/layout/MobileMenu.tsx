'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronDown, ArrowRight, Flame, Terminal } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';

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
          'fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 xl:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-80 max-w-full bg-[#07101E] text-white shadow-2xl transition-transform duration-300 ease-out xl:hidden flex flex-col border-l border-white/10',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Link href="/" onClick={handleClose} className="flex flex-col items-center gap-0.5" aria-label="NOVARCH — Home">
            <Image
              src="/images/logo/newLogo2.png"
              alt="NOVARCH Mark"
              width={70}
              height={70}
              className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(56,178,216,0.35)]"
            />
            <Image
              src="/images/logo/newLogo1.png"
              alt="NOVARCH"
              width={140}
              height={24}
              className="h-4 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile navigation">
          <ul className="space-y-1.5" role="list">
            {/* Home */}
            <li>
              <Link
                href="/"
                onClick={handleClose}
                className="flex items-center rounded-xl px-3.5 py-2.5 text-base font-semibold text-slate-200 hover:bg-white/10 hover:text-cyan-400 transition-colors"
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
                  className="flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-base font-semibold text-slate-200 hover:bg-white/10 hover:text-cyan-400 transition-colors"
                >
                  We Offer
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-slate-400 transition-transform duration-200',
                      servicesOpen && 'rotate-180 text-cyan-400'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    servicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <ul className="ml-3 mt-1 space-y-1 border-l-2 border-cyan-500/30 pl-3" role="list">
                    {weOffer.children?.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={handleClose}
                          className="group flex items-start gap-2 rounded-lg px-2.5 py-2 transition-colors hover:bg-white/10"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                                {child.label}
                              </span>
                              <ArrowRight className="h-3 w-3 text-slate-500 group-hover:text-cyan-300 transition-colors flex-shrink-0" />
                            </div>
                            {child.description && (
                              <p className="mt-0.5 text-xs text-slate-400 leading-relaxed pr-2">
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

            {/* Other Nav Items (Build With NOVARCH, Join Community, Winter Arc, Founders) */}
            {navigation
              .filter((item) => item.label !== 'Home' && item.label !== 'We Offer')
              .map((item) => {
                if (item.highlight) {
                  return (
                    <li key={item.href} className="pt-1 pb-1">
                      <Link
                        href={item.href}
                        onClick={handleClose}
                        className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-base font-bold bg-gradient-to-r from-[#1E5FBF]/30 to-cyan-500/25 border border-cyan-400/40 text-cyan-300 shadow-[0_0_12px_rgba(56,178,216,0.2)] hover:bg-cyan-500/30 hover:text-white transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <Flame className="h-4 w-4 text-amber-400" />
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="rounded-full bg-cyan-400/20 px-2 py-0.5 text-xs font-mono font-bold text-cyan-300 border border-cyan-400/30">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-base font-semibold text-slate-200 hover:bg-white/10 hover:text-cyan-400 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon === 'terminal' && (
                          <Terminal className="h-4 w-4 text-cyan-400" />
                        )}
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-xs font-mono font-bold text-emerald-300 border border-emerald-400/30">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>

        {/* Language Switcher */}
        <div className="border-t border-white/10 px-4 pt-3 pb-1">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            Language / Sprache
          </div>
          <LanguageSwitcher variant="drawer" />
        </div>

        {/* Footer CTA */}
        <div className="p-4 pt-2 space-y-3">
          <Link
            href="/contact"
            onClick={handleClose}
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#1B64F2] via-[#2277F7] to-[#0D47C7] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform active:scale-95"
          >
            Start a Project
          </Link>
          <p className="text-center text-xs font-mono text-slate-400">
            Based in Ilmenau, Germany
          </p>
        </div>
      </div>
    </>
  );
}
