'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowRight, Menu, Globe, GitBranch, Cpu, Code2 } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';
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
  const scrolled = useScrolled(24);
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
    return () => { document.body.style.overflow = ''; };
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
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-surface-card/95 backdrop-blur-md border-b border-border shadow-md shadow-navy/5'
            : 'bg-surface-card/80 backdrop-blur-sm border-b border-border/40'
        )}
      >
        <nav
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo with logo2.jpeg icon + adjacent text */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group" aria-label="NOVARCH — Home">
            <Image
              src="/images/logo/logo2-removebg-preview.png"
              alt="NOVARCH Mark"
              width={48}
              height={48}
              priority
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-2xl font-extrabold tracking-wider text-text uppercase font-sans">
              NOVARCH
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navigation.map((item) => {
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
                        'inline-flex items-center gap-1.5 rounded-sm px-4 py-2.5 text-base font-semibold transition-colors duration-200',
                        'text-text hover:text-blue hover:bg-surface-2',
                        dropdownOpen && 'text-blue bg-surface-2'
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-200',
                          dropdownOpen && 'rotate-180'
                        )}
                      />
                    </button>

                    {/* Dropdown Panel */}
                    <div
                      className={cn(
                        'absolute left-1/2 top-full mt-3 w-[360px] -translate-x-1/2 rounded-2xl border border-border bg-surface-card shadow-2xl shadow-navy/15 transition-all duration-300 origin-top',
                        dropdownOpen
                          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                      )}
                      role="menu"
                    >
                      <div className="p-2.5 space-y-1">
                        {item.children.map((child) => {
                          const IconComponent = CHILD_ICON_MAP[child.label as keyof typeof CHILD_ICON_MAP] || Globe;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              role="menuitem"
                              onClick={() => setDropdownOpen(false)}
                              className="group flex items-start gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-blue/5 dark:hover:bg-white/5"
                            >
                              {/* Left: Icon Frame */}
                              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-2 text-text-light group-hover:bg-blue/15 group-hover:text-blue dark:bg-navy-800 dark:group-hover:bg-blue/20 transition-colors duration-200 shadow-sm border border-border/10">
                                <IconComponent className="h-5 w-5" />
                              </div>

                              {/* Right: Text & Arrow */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-bold text-text group-hover:text-blue transition-colors duration-200">
                                    {child.label}
                                  </span>
                                  <ArrowRight className="h-4 w-4 text-text-light opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue transition-all duration-200 flex-shrink-0" />
                                </div>
                                {child.description && (
                                  <p className="mt-1 text-xs text-text-muted leading-relaxed font-medium">
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
                  className="rounded-sm px-4 py-2.5 text-base font-semibold text-text transition-colors duration-200 hover:text-blue hover:bg-surface-2"
                >
                  {item.label}
                </Link>
              );
            })}

            {/* CTA */}
            <div className="ml-4 pl-4 border-l border-border flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-sm bg-blue px-6 py-2.5 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-600 shadow-sm"
              >
                Start a Project
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-sm p-2 text-text hover:bg-surface-2 transition-colors"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
