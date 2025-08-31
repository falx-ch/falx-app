// Simple, lightweight i18n system for Falx landing page
// Following KISS principle - no external dependencies needed

export const SUPPORTED_LANGUAGES = ['de', 'en'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'de';

// Language display names
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
  it: 'Italiano'
};

// Type for translation structure - matches the actual JSON structure
export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    headline_accent: string;
    headline_suffix: string;
    headline_secondary: string;
    description: string;
    cta_primary: string;
    cta_secondary: string;
    cta_secondary_tooltip: string;
  };
  report_section: {
    headline: string;
    headline_accent: string;
    headline_suffix: string;
    description: string;
  };
  problem_identification: {
    headline: string;
    headline_accent: string;
    headline_suffix: string;
    description: string;
    stats: string[];
  };
  solution_showcase: {
    headline: string;
    headline_suffix: string;
    description: string;
    features: string[];
    cta_button: string;
  };
  product_demonstration: {
    headline: string;
    headline_suffix: string;
    description: string;
    mission_statement: string;
    cta_primary: string;
    cta_secondary: string;
    cta_secondary_tooltip: string;
  };
  founder_section: {
    tagline: string;
    tagline_accent: string;
    tagline_suffix: string;
    name: string;
    title: string;
    quote: string;
    cta_button: string;
    image_alt: string;
  };
  call_to_action: {
    headline: string;
    headline_accent: string;
    headline_suffix?: string;
    description: string;
    cta_button: string;
  };
  footer: {
    copyright: string;
    location: string;
    impressum: string;
    datenschutz: string;
    linkedin: string;
  };
  cost_calculator: {
    currency: string;
    per_year: string;
    employee_description: string;
    cost_basis: string;
  };
  report_section_cards: {
    card1: {
      icon: string;
      text: string;
    };
    card2: {
      icon: string;
      text: string;
    };
    card3: {
      icon: string;
      text: string;
    };
  };
  problem_showcase_cards: {
    card1: {
      icon: string;
      title: string;
      subtitle: string;
    };
    card2: {
      icon: string;
      title: string;
      subtitle: string;
    };
    card3: {
      icon: string;
      title: string;
      subtitle: string;
    };
    card4: {
      icon: string;
      title: string;
      subtitle: string;
    };
    card5: {
      icon: string;
      title: string;
      subtitle: string;
    };
  };
  solution_showcase_cards: {
    card1: {
      title: string;
      description: string;
      metric: string;
      icon: string;
    };
    card2: {
      title: string;
      description: string;
      metric: string;
      icon: string;
    };
    card3: {
      title: string;
      description: string;
      metric: string;
      icon: string;
    };
  };
}

// Cache for loaded translations
const translationsCache = new Map<SupportedLanguage, Translations>();

/**
 * Load translations for a specific language
 * Uses dynamic imports to avoid loading all languages at once
 */
export async function loadTranslations(lang: SupportedLanguage): Promise<Translations> {
  // Return cached version if available
  if (translationsCache.has(lang)) {
    return translationsCache.get(lang)!;
  }

  try {
    // Dynamic import based on language
    const translations = await import(`../translations/${lang}.json`);
    const data = translations.default as any; // Use any to avoid strict type checking issues
    
    // Cache the loaded translations
    translationsCache.set(lang, data);
    return data as Translations;
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error);
    
    // Fallback to default language
    if (lang !== DEFAULT_LANGUAGE) {
      return loadTranslations(DEFAULT_LANGUAGE);
    }
    
    throw new Error(`Failed to load default translations for ${DEFAULT_LANGUAGE}: ${error}`);
  }
}

/**
 * Detect preferred language from browser or URL
 * Priority: URL param > URL path > Browser language > Default
 */
export function detectLanguage(
  url?: string,
  browserLang?: string
): SupportedLanguage {
  // Check URL path (e.g., /en/, /fr/)
  if (url) {
    const pathMatch = url.match(/^\/([a-z]{2})\//);
    if (pathMatch) {
      const lang = pathMatch[1] as SupportedLanguage;
      if (SUPPORTED_LANGUAGES.includes(lang)) {
        return lang;
      }
    }
  }

  // Check browser language (first two characters)
  if (browserLang) {
    const browserLangCode = browserLang.slice(0, 2) as SupportedLanguage;
    if (SUPPORTED_LANGUAGES.includes(browserLangCode)) {
      return browserLangCode;
    }
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Get the correct URL for a language
 * German (default) gets no prefix, others get /{lang}/
 */
export function getLocalizedUrl(lang: SupportedLanguage, path: string = ''): string {
  if (lang === DEFAULT_LANGUAGE) {
    return path || '/';
  }
  
  // Remove leading slash from path for consistency
  const cleanPath = path.replace(/^\//, '');
  return `/${lang}/${cleanPath}`.replace(/\/+/g, '/').replace(/\/$/, '') || `/${lang}`;
}

/**
 * Extract language from current URL path
 */
export function getLanguageFromPath(pathname: string): SupportedLanguage {
  // Match /en, /en/, /en/about, etc.
  const match = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
  if (match) {
    const lang = match[1] as SupportedLanguage;
    if (SUPPORTED_LANGUAGES.includes(lang) && lang !== DEFAULT_LANGUAGE) {
      return lang;
    }
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Get path without language prefix
 * /en/about -> /about
 * /de/contact -> /contact  
 * / -> /
 */
export function getPathWithoutLanguage(pathname: string): string {
  // Check if path starts with a language prefix - match /en, /en/, /en/about, etc.
  const match = pathname.match(/^\/([a-z]{2})(?:\/(.*))?$/);
  if (match) {
    const lang = match[1] as SupportedLanguage;
    if (SUPPORTED_LANGUAGES.includes(lang) && lang !== DEFAULT_LANGUAGE) {
      // Return the path without language prefix, or '/' if no path remains
      return match[2] ? `/${match[2]}` : '/';
    }
  }
  // Return original path if no language prefix found
  return pathname;
}

/**
 * Get available language alternatives for current page
 */
export function getLanguageAlternatives(currentLang: SupportedLanguage, currentPath: string) {
  // Get the path without any language prefix
  const cleanPath = getPathWithoutLanguage(currentPath);
  
  return SUPPORTED_LANGUAGES
    .filter(lang => lang !== currentLang)
    .map(lang => ({
      code: lang,
      name: LANGUAGE_NAMES[lang],
      url: getLocalizedUrl(lang, cleanPath)
    }));
}

/**
 * Simple translation helper with dot notation support
 * Usage: t(translations, 'hero.headline') or t(translations.hero, 'headline')
 */
export function t(obj: any, key: string): string {
  return key.split('.').reduce((o, i) => o?.[i], obj) || key;
}