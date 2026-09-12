'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // If navigating to a URL with a hash anchor (e.g. /#section), let hash navigation handle scroll
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Force scroll position reset to top (0, 0) on every route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Fallback RAF to handle async page hydration / layout rendering
    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
}
