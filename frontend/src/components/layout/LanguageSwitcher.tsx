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

let translateReady: Promise<HTMLSelectElement> | undefined;

function ensureTranslate(): Promise<HTMLSelectElement> {
  const existing = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (existing) return Promise.resolve(existing);
  if (translateReady) return translateReady;
  translateReady = new Promise<HTMLSelectElement>((resolve, reject) => {
    let initialized = false;
    const init = () => {
      if (initialized || document.querySelector('.goog-te-combo')) return;
      if (window.google?.translate?.TranslateElement) {
        initialized = true;
        new window.google.translate.TranslateElement({
          pageLanguage: 'en', includedLanguages: 'en,de', autoDisplay: false,
        }, 'google_translate_element');
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
      document.getElementById('google-translate-script')?.remove();
      reject(new Error('Translation engine did not load'));
    }, 15000);
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
  const [currentLang, setCurrentLang] = React.useState<'en' | 'de'>('en');
  const [mounted, setMounted] = React.useState(false);
  const [isTranslating, setIsTranslating] = React.useState(false);

  const [translationError, setTranslationError] = React.useState('');

  React.useEffect(() => {
    setMounted(true);
    // Google detects the source language before applying the saved cookie.
    // Do not label the English DOM as German before the engine has translated it.
    const syncLanguage = () => {
      const translated = document.documentElement.classList.contains('translated-ltr');
      const lang = translated ? 'de' : 'en';
      setCurrentLang(lang);
      document.documentElement.lang = lang;
      if (translated) {
        setIsTranslating(false);
        setTranslationError('');
      }
    };
    const observer = new MutationObserver(syncLanguage);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    syncLanguage();
    ensureTranslate().catch(() => setTranslationError('Translation unavailable. Please try DE again.'));
    return () => observer.disconnect();
  }, []);

  const switchLanguage = async (targetLang: 'en' | 'de') => {
    setTranslationError('');
    setIsTranslating(true);
    localStorage.setItem('novarch_lang', targetLang);
    // Clear domain-scoped preferences left by older versions as well.
    const parts = window.location.hostname.split('.');
    for (let i = 0; i < parts.length - 1; i++) {
      const domain = parts.slice(i).join('.');
      document.cookie = `googtrans=; path=/; domain=.${domain}; max-age=0`;
    }
    document.cookie = `googtrans=/en/${targetLang}; path=/; max-age=31536000; SameSite=Lax`;
    if (targetLang === 'en') {
      // Restore the original React document rather than retaining translated DOM nodes.
      window.location.reload();
      return;
    }
    try {
      const select = await ensureTranslate();
      select.value = targetLang;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      // Selecting a language is not evidence that translation succeeded.
      window.setTimeout(() => {
        setIsTranslating(false);
        if (!document.documentElement.classList.contains('translated-ltr')) {
          setTranslationError('Translation unavailable. Please try DE again.');
        }
      }, 15000);
    } catch {
      setIsTranslating(false);
      setTranslationError('Translation unavailable. Please try DE again.');
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
      {translationError && <span role="status" className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-white/15 bg-[#081224] p-2 text-xs text-white">{translationError}</span>}
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
