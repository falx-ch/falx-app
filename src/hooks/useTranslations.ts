import { useEffect, useState } from 'react';
import type { Translations, SupportedLanguage } from '@/lib/i18n';

// Extend window interface to include our globals
declare global {
  interface Window {
    __TRANSLATIONS__?: Translations;
    __CURRENT_LANG__?: SupportedLanguage;
  }
}

/**
 * React hook to access translations and current language
 * Reads from window globals set by Astro pages
 */
export function useTranslations() {
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('de');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if translations are available
    if (typeof window !== 'undefined') {
      const windowTranslations = window.__TRANSLATIONS__;
      const windowLang = window.__CURRENT_LANG__;
      
      if (windowTranslations && windowLang) {
        setTranslations(windowTranslations);
        setCurrentLang(windowLang);
        setIsReady(true);
      } else {
        // Wait for translations to be loaded
        const checkTranslations = () => {
          if (window.__TRANSLATIONS__ && window.__CURRENT_LANG__) {
            setTranslations(window.__TRANSLATIONS__);
            setCurrentLang(window.__CURRENT_LANG__);
            setIsReady(true);
          } else {
            requestAnimationFrame(checkTranslations);
          }
        };
        checkTranslations();
      }
    }
  }, []);

  /**
   * Translation function with dot notation support
   * Usage: t('hero.headline') or t('hero.cta_primary')
   */
  const t = (key: string, fallback?: string): string => {
    if (!translations) return fallback || key;
    
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback || key; // Return fallback or key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : (fallback || key);
  };

  return {
    t,
    translations,
    currentLang,
    isReady
  };
}