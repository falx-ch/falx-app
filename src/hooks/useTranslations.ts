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
    const updateTranslations = () => {
      if (typeof window !== 'undefined') {
        const windowTranslations = window.__TRANSLATIONS__;
        const windowLang = window.__CURRENT_LANG__;
        
        if (windowTranslations && windowLang) {
          // Only update if changed to prevent unnecessary re-renders
          if (windowLang !== currentLang || windowTranslations !== translations) {
            setTranslations(windowTranslations);
            setCurrentLang(windowLang);
            setIsReady(true);
          }
          return true;
        }
      }
      return false;
    };

    // Initial check
    updateTranslations();

    // Set up polling for initial load and language switches
    const pollInterval = setInterval(() => {
      updateTranslations();
    }, 16); // ~60fps polling for smooth updates

    // Also listen for page navigation events
    const handlePageShow = () => updateTranslations();
    window.addEventListener('pageshow', handlePageShow);

    // Clean up
    return () => {
      clearInterval(pollInterval);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [currentLang, translations]); // Re-run when these change

  /**
   * Translation function with dot notation support
   * Usage: t('hero.headline') or t('hero.cta_primary')
   * Returns null when translations aren't loaded to allow fallbacks
   */
  const t = (key: string): string | null => {
    if (!translations) return null;
    
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return null; // Return null if translation not found to allow fallbacks
      }
    }
    
    return typeof value === 'string' ? value : null;
  };

  return {
    t,
    translations,
    currentLang,
    isReady
  };
}