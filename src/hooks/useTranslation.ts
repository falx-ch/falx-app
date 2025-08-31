// Simple translation hook for React components
// Following KISS principle - minimal complexity, maximum utility

import { useEffect, useState } from 'react';
import type { Translations, SupportedLanguage } from '@/lib/i18n';

/**
 * Hook to access translations in React components
 * Reads translations from window object set by Astro pages
 * Handles hydration mismatch by only translating on client side
 */
export function useTranslation() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated once the component mounts on client side
    setIsHydrated(true);
  }, []);

  // Simple translation getter with dot notation support
  const t = (key: string): string => {
    // During SSR or before hydration, return the key to match server rendering
    if (!isHydrated || typeof window === 'undefined') {
      return key;
    }

    const translations = (window as any).__TRANSLATIONS__;
    if (!translations) {
      return key;
    }
    
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Get current values directly from window
  const translations = isHydrated && typeof window !== 'undefined' ? (window as any).__TRANSLATIONS__ : null;
  const currentLang = isHydrated && typeof window !== 'undefined' ? ((window as any).__CURRENT_LANG__ || 'de') : 'de';

  return {
    t,
    translations,
    currentLang,
    isReady: isHydrated && translations !== null
  };
}