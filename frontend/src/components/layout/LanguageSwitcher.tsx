'use client';

import * as React from 'react';
import { Globe, Check } from 'lucide-react';
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

export function LanguageSwitcher({ className, variant = 'pill' }: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = React.useState<'en' | 'de'>('en');
  const [mounted, setMounted] = React.useState(false);
  const [isTranslating, setIsTranslating] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    // 1. Read existing language preference from cookies or localStorage
    const saved = typeof window !== 'undefined' ? localStorage.getItem('novarch_lang') : null;
    const cookieMatch = typeof document !== 'undefined' ? document.cookie.match(/googtrans=\/en\/([a-z]{2})/i) : null;
    const lang = (cookieMatch?.[1] || saved || 'en').toLowerCase();
    if (lang === 'de') {
      setCurrentLang('de');
      if (typeof document !== 'undefined') {
        document.documentElement.lang = 'de';
      }
    } else {
      setCurrentLang('en');
      if (typeof document !== 'undefined') {
        document.documentElement.lang = 'en';
      }
    }

    // 2. Load Google Translate script dynamically if not present
    if (typeof window !== 'undefined' && !document.getElementById('google-translate-script')) {
      window.googleTranslateElementInit = function () {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,de',
              autoDisplay: false,
              multilanguagePage: true,
            },
            'google_translate_element'
          );
        }
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);

      // Prevent Google Translate from modifying body.style.top / margins
      const observer = new MutationObserver(() => {
        if (document.body.style.top && document.body.style.top !== '0px') {
          document.body.style.top = '0px';
        }
        if (document.body.style.position === 'relative') {
          document.body.style.position = 'static';
        }
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    }
  }, []);

  const switchLanguage = (targetLang: 'en' | 'de') => {
    if (targetLang === currentLang && !isTranslating) return;

    setIsTranslating(true);
    setCurrentLang(targetLang);

    if (typeof window !== 'undefined') {
      localStorage.setItem('novarch_lang', targetLang);
      document.documentElement.lang = targetLang;

      // Set cookie for current domain and root path
      const hostname = window.location.hostname;
      const cookieValue = `/en/${targetLang}`;

      // Set for path=/
      document.cookie = `googtrans=${cookieValue}; path=/; max-age=31536000; SameSite=Lax`;

      // Set for domain if on a public domain (e.g. .novarch.eu)
      if (hostname.includes('.') && !hostname.startsWith('localhost') && !hostname.startsWith('127.')) {
        const domainParts = hostname.split('.');
        if (domainParts.length >= 2) {
          const rootDomain = '.' + domainParts.slice(-2).join('.');
          document.cookie = `googtrans=${cookieValue}; path=/; domain=${rootDomain}; max-age=31536000; SameSite=Lax`;
        }
      }

      // Try triggering the Google Translate combo box directly if available
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        select.value = targetLang;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        setTimeout(() => setIsTranslating(false), 300);
      } else {
        // If the combo is not mounted yet, reloading applies the googtrans cookie cleanly
        setTimeout(() => {
          window.location.reload();
        }, 150);
      }
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
        'notranslate inline-flex items-center p-0.5 rounded-full bg-[#081224]/90 backdrop-blur-md border border-white/15 shadow-lg select-none flex-shrink-0',
        className
      )}
      role="group"
      aria-label="Language selection / Sprachauswahl"
    >
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
