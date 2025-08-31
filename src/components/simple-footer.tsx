"use client"

import { useTranslations } from '@/hooks/useTranslations'

export default function SimpleFooter() {
  const { t, isReady } = useTranslations();

  // Minimal loading state
  if (!isReady) {
    return (
      <footer 
        className="py-8 relative z-10"
        style={{
          background: 'linear-gradient(to top, #111827 0%, #1f2937 100%)'
        }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-300">
            <div className="text-center sm:text-left">
              <div className="h-4 bg-gray-600 rounded animate-pulse w-32"></div>
              <div className="h-3 bg-gray-600 rounded animate-pulse w-16 mt-1"></div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <div className="h-4 bg-gray-600 rounded animate-pulse w-20"></div>
              <div className="h-4 bg-gray-600 rounded animate-pulse w-24"></div>
              <div className="h-4 bg-gray-600 rounded animate-pulse w-20"></div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer 
      className="py-8 relative z-10"
      style={{
        background: 'linear-gradient(to top, #111827 0%, #1f2937 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-300">
          <div className="text-center sm:text-left">
            <div>{t('footer.copyright')}</div>
            <div className="text-xs text-gray-400 mt-1">{t('footer.location')}</div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <a href="/legal#impressum" className="hover:text-white transition-colors duration-200 py-1">
              {t('footer.impressum')}
            </a>
            <a href="/legal#datenschutz" className="hover:text-white transition-colors duration-200 py-1">
              {t('footer.datenschutz')}
            </a>
            <a href="https://www.linkedin.com/company/falx-ch" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 py-1 whitespace-nowrap">
              {t('footer.linkedin')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}