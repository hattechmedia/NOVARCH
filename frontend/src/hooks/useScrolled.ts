'use client';

import { useState, useEffect } from 'react';

/** Returns true when the page has been scrolled past a given threshold (default 20px) */
export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        const isPast = window.scrollY > threshold;
        setScrolled((prev) => (prev !== isPast ? isPast : prev));
        rafId = null;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [threshold]);

  return scrolled;
}
