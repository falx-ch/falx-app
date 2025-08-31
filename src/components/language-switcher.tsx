import { useState, useEffect } from 'react';
import { 
  SUPPORTED_LANGUAGES, 
  LANGUAGE_NAMES, 
  getLanguageFromPath, 
  getLanguageAlternatives,
  type SupportedLanguage 
} from '@/lib/i18n';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ 
  className = '' 
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [isClient, setIsClient] = useState(false);
  
  // Get current path from browser on client side
  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
      setIsClient(true);
    };
    
    // Set initial path
    updatePath();
    
    // Listen for navigation changes (back/forward buttons)
    window.addEventListener('popstate', updatePath);
    
    return () => {
      window.removeEventListener('popstate', updatePath);
    };
  }, []);
  
  // Get current language from path
  const currentLang = getLanguageFromPath(currentPath);
  
  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className={`${className}`}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
          <span className="uppercase">--</span>
        </div>
      </div>
    );
  }
  
  // Get alternative languages (only after client-side hydration)
  const alternatives = getLanguageAlternatives(currentLang, currentPath)
    // Filter to show only German and English for now
    .filter(alt => ['de', 'en'].includes(alt.code));
  
  // Add current language to the list for display
  const allLanguages = [
    { code: currentLang, name: LANGUAGE_NAMES[currentLang], url: currentPath, current: true },
    ...alternatives.map(alt => ({ ...alt, current: false }))
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Current Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 text-white text-sm font-medium"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="uppercase">{currentLang}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 py-2 w-40 bg-black/80 backdrop-blur-md rounded-lg shadow-xl border border-white/10 z-40">
            {allLanguages.map((lang) => (
              <div key={lang.code}>
                {lang.current ? (
                  <div className="px-4 py-2 text-white text-sm flex items-center justify-between bg-white/10 border-l-2 border-white/30">
                    <span className="font-medium">{lang.name}</span>
                    <div className="w-2 h-2 rounded-full bg-white/60"></div>
                  </div>
                ) : (
                  <a
                    href={lang.url}
                    className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-200 text-sm border-l-2 border-transparent hover:border-white/20"
                    onClick={() => setIsOpen(false)}
                  >
                    {lang.name}
                  </a>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}