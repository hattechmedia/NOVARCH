'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowRight, Menu, Globe, GitBranch, Cpu, Code2 } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

const CHILD_ICON_MAP = {
  'Digital Launch': Globe,
  'Automation & Integration': GitBranch,
  'AI Workflow': Cpu,
  'Custom Software': Code2,
};

export function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const dropdownTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleMouseEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <>
      {/* ── Background Navbar Header ──────────────────────── */}
      <header
        suppressHydrationWarning
        className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#030712]/80 backdrop-blur-md border-b border-white/[0.06]"
      >
        <div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* ── Logo (Aligned with left edge of container) ── */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex flex-col items-center gap-0.5 group"
              aria-label="NOVARCH — Home"
            >
              <Image
                src="/images/logo/newLogo2.png"
                alt="NOVARCH Mark"
                width={120}
                height={120}
                priority
                className="h-10 sm:h-11 lg:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_0_14px_rgba(56,178,216,0.45)]"
              />
              <Image
                src="/images/logo/newLogo1.png"
                alt="NOVARCH"
                width={220}
                height={40}
                priority
                className="h-6 sm:h-7 lg:h-[30px] w-auto object-contain transition-opacity duration-200 group-hover:opacity-95 drop-shadow-[0_0_8px_rgba(56,178,216,0.25)]"
              />
            </Link>
          </div>

          {/* ── Floating Center Glass NavPill (Desktop, perfectly centered) ───────────── */}
          <nav
            aria-label="Main navigation"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#081224]/85 backdrop-blur-md border border-white/15 shadow-xl shadow-black/50">
              {navigation.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

                if (item.children) {
                  return (
                    <div
                      key={item.label}
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        onClick={() => setDropdownOpen((o) => !o)}
                        aria-expanded={dropdownOpen}
                        aria-haspopup="true"
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200',
                          'text-slate-300 hover:text-white hover:bg-white/10',
                          dropdownOpen && 'text-cyan-400 bg-white/10'
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-200 text-slate-400',
                            dropdownOpen && 'rotate-180 text-cyan-400'
                          )}
                        />
                      </button>

                      {/* Dropdown Panel */}
                      <div
                        className={cn(
                          'absolute left-1/2 top-full mt-3 w-[340px] -translate-x-1/2 rounded-2xl border border-border/80 bg-[#07101E]/98 backdrop-blur-xl shadow-2xl shadow-black/80 transition-all duration-300 origin-top',
                          dropdownOpen
                            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                        )}
                        role="menu"
                      >
                        <div className="p-2 space-y-1">
                          {item.children.map((child) => {
                            const IconComponent =
                              CHILD_ICON_MAP[child.label as keyof typeof CHILD_ICON_MAP] || Globe;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                role="menuitem"
                                onClick={() => setDropdownOpen(false)}
                                className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-white/10"
                              >
                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors duration-200">
                                  <IconComponent className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors duration-200">
                                      {child.label}
                                    </span>
                                    <ArrowRight className="h-3.5 w-3.5 text-white/30 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-cyan-300 transition-all duration-200 flex-shrink-0" />
                                  </div>
                                  {child.description && (
                                    <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">
                                      {child.description}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200',
                      isActive
                        ? 'text-white'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* ── Right CTA: Start a Project Pill Button ── */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#1B64F2] via-[#2277F7] to-[#0D47C7] hover:from-[#2575FC] hover:to-[#1A5BFF] text-white transition-all duration-200 shadow-[0_0_20px_rgba(34,119,247,0.55)] hover:shadow-[0_0_30px_rgba(34,119,247,0.85)] hover:scale-105 active:scale-95"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* ── Mobile Hamburger (top-right) ── */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-[#081224]/85 backdrop-blur-md border border-white/15 text-white hover:bg-white/10 transition-colors shadow-lg"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

export default Navbar;
