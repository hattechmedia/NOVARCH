'use client';

import * as React from 'react';
import { Globe, Check } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'pill' | 'compact' | 'drawer';
}

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

function setGoogleTransCookies(lang: 'en' | 'de') {
  if (typeof document === 'undefined') return;
  const value = `/en/${lang}`;
  const hostname = window.location.hostname;
  const maxAge = 31536000; // 1 year

  // 1. Host-only
  document.cookie = `googtrans=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
  // 2. Exact hostname
  document.cookie = `googtrans=${value}; path=/; domain=${hostname}; max-age=${maxAge}; SameSite=Lax`;
  // 3. Root domain (e.g. .novarch.eu)
  const parts = hostname.split('.');
  if (parts.length >= 2) {
    const rootDomain = '.' + parts.slice(-2).join('.');
    document.cookie = `googtrans=${value}; path=/; domain=${rootDomain}; max-age=${maxAge}; SameSite=Lax`;
  }
}

function clearGoogleTransCookies() {
  if (typeof document === 'undefined') return;
  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  // Expire cookies across scopes
  document.cookie = 'googtrans=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = `googtrans=; path=/; domain=${hostname}; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  if (parts.length >= 2) {
    const rootDomain = '.' + parts.slice(-2).join('.');
    document.cookie = `googtrans=; path=/; domain=${rootDomain}; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  // Set explicitly to /en/en to overwrite cached translation
  document.cookie = 'googtrans=/en/en; path=/; max-age=31536000; SameSite=Lax';
  document.cookie = `googtrans=/en/en; path=/; domain=${hostname}; max-age=31536000; SameSite=Lax`;
  if (parts.length >= 2) {
    const rootDomain = '.' + parts.slice(-2).join('.');
    document.cookie = `googtrans=/en/en; path=/; domain=${rootDomain}; max-age=31536000; SameSite=Lax`;
  }
}

let translateReady: Promise<HTMLSelectElement> | undefined;

function ensureTranslate(): Promise<HTMLSelectElement> {
  if (typeof document === 'undefined') {
    return Promise.reject(new Error('Document not available'));
  }
  const existing = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (existing) return Promise.resolve(existing);
  if (translateReady) return translateReady;

  translateReady = new Promise<HTMLSelectElement>((resolve, reject) => {
    let initialized = false;

    const init = () => {
      if (initialized || document.querySelector('.goog-te-combo')) return;
      if (window.google?.translate?.TranslateElement) {
        initialized = true;
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,de',
              autoDisplay: false,
            },
            'google_translate_element'
          );
        } catch {}
      }
    };

    window.googleTranslateElementInit = init;

    const poll = window.setInterval(() => {
      init();
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        window.clearInterval(poll);
        window.clearTimeout(timeout);
        resolve(select);
      }
    }, 100);

    const timeout = window.setTimeout(() => {
      window.clearInterval(poll);
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        resolve(select);
      } else {
        reject(new Error('Translation engine did not load in time'));
      }
    }, 10000);

    init();

    if (!window.google?.translate?.TranslateElement && !document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    }
  }).catch((error) => {
    translateReady = undefined;
    throw error;
  });

  return translateReady;
}

export function LanguageSwitcher({ className, variant = 'pill' }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const prevPathname = React.useRef(pathname);

  const [currentLang, setCurrentLang] = React.useState<'en' | 'de'>('en');
  const [mounted, setMounted] = React.useState(false);
  const [isTranslating, setIsTranslating] = React.useState(false);
  const [translationError, setTranslationError] = React.useState('');

  React.useEffect(() => {
    setMounted(true);
    let initialLang: 'en' | 'de' = 'en';

    try {
      const saved = localStorage.getItem('novarch_lang');
      if (saved === 'de' || saved === 'en') {
        initialLang = saved;
      } else if (document.cookie.includes('googtrans=/en/de')) {
        initialLang = 'de';
      }
    } catch {}

    setCurrentLang(initialLang);

    // Keep state in sync with DOM translated state
    const syncLanguage = () => {
      const translated = document.documentElement.classList.contains('translated-ltr');
      if (translated) {
        setCurrentLang('de');
        document.documentElement.lang = 'de';
        setIsTranslating(false);
        setTranslationError('');
      }
    };

    const observer = new MutationObserver(syncLanguage);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Clean body margins/top set by Google Translate
    const bodyObserver = new MutationObserver(() => {
      if (document.body.style.top && document.body.style.top !== '0px') {
        document.body.style.top = '0px';
      }
      if (document.body.style.position === 'relative') {
        document.body.style.position = 'static';
      }
    });
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    // Ensure engine is loaded and applies saved language if DE
    ensureTranslate()
      .then((select) => {
        if (initialLang === 'de' && !document.documentElement.classList.contains('translated-ltr')) {
          select.value = 'de';
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      })
      .catch(() => {
        // Silently catch background load
      });

    return () => {
      observer.disconnect();
      bodyObserver.disconnect();
    };
  }, []);

  // Handle client-side Next.js route navigation
  React.useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      let isDe = currentLang === 'de';
      try {
        if (!isDe && localStorage.getItem('novarch_lang') === 'de') {
          isDe = true;
        }
      } catch {}

      if (isDe) {
        // When client navigates in Next.js, re-trigger translation on the new DOM
        const timer = setTimeout(() => {
          const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
          if (select) {
            select.value = 'en';
            select.dispatchEvent(new Event('change', { bubbles: true }));
            setTimeout(() => {
              select.value = 'de';
              select.dispatchEvent(new Event('change', { bubbles: true }));
            }, 60);
          }
        }, 150);

        return () => clearTimeout(timer);
      }
    }
  }, [pathname, currentLang]);

  const switchLanguage = async (targetLang: 'en' | 'de') => {
    if (targetLang === currentLang && !translationError) return;
    setTranslationError('');
    setIsTranslating(true);

    try {
      localStorage.setItem('novarch_lang', targetLang);
    } catch {}

    if (targetLang === 'en') {
      clearGoogleTransCookies();
      setCurrentLang('en');
      document.documentElement.lang = 'en';
      // Full reload restores pristine original English React DOM
      window.location.reload();
      return;
    }

    // Target: German ('de')
    setGoogleTransCookies('de');
    setCurrentLang('de');

    try {
      const select = await ensureTranslate();
      select.value = 'de';
      select.dispatchEvent(new Event('change', { bubbles: true }));

      // If in-place translation doesn't apply within 400ms, reload with cookie to ensure full page translation
      window.setTimeout(() => {
        setIsTranslating(false);
        if (!document.documentElement.classList.contains('translated-ltr')) {
          window.location.reload();
        }
      }, 400);
    } catch {
      // Fallback: reload with the newly set cookie
      window.location.reload();
    }
  };

  if (!mounted) {
    return (
      <div
        translate="no"
        className={cn('notranslate inline-flex items-center gap-1 rounded-full px-2 py-1 bg-[#081224]/90 border border-white/10 text-[11px] font-mono select-none', className)}
      >
        <span translate="no" className="notranslate text-slate-400">EN</span>
        <span translate="no" className="notranslate text-white/20">|</span>
        <span translate="no" className="notranslate text-slate-400">DE</span>
      </div>
    );
  }

  // Variant: Drawer (Used in mobile slide-out menu)
  if (variant === 'drawer') {
    return (
      <div
        translate="no"
        title={translationError || undefined}
        className={cn('notranslate flex items-center justify-between p-1 rounded-xl bg-white/5 border border-white/10 select-none', className)}
      >
        <button
          type="button"
          translate="no"
          onClick={() => switchLanguage('en')}
          className={cn(
            'notranslate flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer',
            currentLang === 'en'
              ? 'bg-[#1E5FBF] text-white shadow-[0_0_12px_rgba(30,95,191,0.5)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          )}
        >
          {currentLang === 'en' && <Check className="h-3.5 w-3.5 text-cyan-300" />}
          <span translate="no" className="notranslate">English (EN)</span>
        </button>

        <button
          type="button"
          translate="no"
          onClick={() => switchLanguage('de')}
          className={cn(
            'notranslate flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer',
            currentLang === 'de'
              ? 'bg-[#1E5FBF] text-white shadow-[0_0_12px_rgba(30,95,191,0.5)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          )}
        >
          {currentLang === 'de' && <Check className="h-3.5 w-3.5 text-cyan-300" />}
          <span translate="no" className="notranslate">Deutsch / German (DE)</span>
        </button>
      </div>
    );
  }

  // Variant: Pill (Navbar header component - compact & strictly not translated)
  return (
    <div
      translate="no"
      className={cn(
        'notranslate relative inline-flex items-center p-0.5 rounded-full bg-[#081224]/90 backdrop-blur-md border border-white/15 shadow-lg select-none flex-shrink-0',
        className
      )}
      role="group"
      aria-label="Language selection / Sprachauswahl"
      title={translationError || undefined}
    >
      {translationError && (
        <span role="status" className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-white/15 bg-[#081224] p-2 text-xs text-white">
          {translationError}
        </span>
      )}
      <div className="flex items-center pl-1.5 pr-1 text-cyan-400 pointer-events-none" title="English / German (Deutsch)">
        <Globe className={cn('h-3.5 w-3.5 transition-transform duration-300', isTranslating && 'animate-spin')} />
      </div>

      <button
        type="button"
        translate="no"
        onClick={() => switchLanguage('en')}
        className={cn(
          'notranslate px-2 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer',
          currentLang === 'en'
            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_8px_rgba(56,178,216,0.5)]'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        )}
        title="English (EN)"
        aria-pressed={currentLang === 'en'}
      >
        <span translate="no" className="notranslate">EN</span>
      </button>

      <button
        type="button"
        translate="no"
        onClick={() => switchLanguage('de')}
        className={cn(
          'notranslate px-2 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer',
          currentLang === 'de'
            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_8px_rgba(56,178,216,0.5)]'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        )}
        title="German / Deutsch (DE)"
        aria-pressed={currentLang === 'de'}
      >
        <span translate="no" className="notranslate">DE</span>
      </button>
    </div>
  );
}
