import { GlassCard } from '@/components/ui/glass-card'
import { SwissBadge } from '@/components/ui/swiss-badge'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/hooks/useTranslations'

export default function HeroContent() {
  const { t, isReady } = useTranslations();

  // Show loading state that matches final layout dimensions
  if (!isReady) {
    return (
      <main className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto z-20 max-w-sm sm:max-w-xl max-h-[50vh] sm:max-h-none">
        <GlassCard className="text-left bg-black/10" size="md">
          <div className="animate-pulse">
            {/* Badge placeholder */}
            <div className="h-6 w-3/4 bg-white/10 rounded-full mb-1"></div>
            
            {/* Main heading placeholder - two lines to match actual content */}
            <div className="mb-1 -mt-1">
              <div className="h-12 sm:h-14 md:h-16 bg-white/10 rounded mb-1"></div>
              <div className="h-12 sm:h-14 md:h-16 w-4/5 bg-white/10 rounded"></div>
            </div>
            
            {/* Description placeholder - matches actual height */}
            <div className="mb-2 -mt-1">
              <div className="h-4 bg-white/10 rounded mb-1"></div>
              <div className="h-4 w-5/6 bg-white/10 rounded"></div>
            </div>
            
            {/* Buttons placeholder */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="h-11 bg-white/10 rounded w-full sm:w-auto sm:min-w-[160px]"></div>
              <div className="h-11 bg-white/10 rounded w-full sm:w-auto sm:min-w-[140px] hidden lg:block"></div>
            </div>
          </div>
        </GlassCard>
      </main>
    );
  }
  return (
    <main className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto z-20 max-w-sm sm:max-w-xl max-h-[50vh] sm:max-h-none">
      <GlassCard className="text-left bg-black/10" size="md">
        <SwissBadge 
          className="mb-1 relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/90 text-xs font-light relative z-10 inline-flex items-center gap-1.5 px-2 py-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32" className="inline-block">
              <path d="m0 0h32v32h-32z" fill="#f00"/>
              <path d="m13 6h6v7h7v6h-7v7h-6v-7h-7v-6h7z" fill="#fff"/>
            </svg>
{t('hero.badge')}
          </span>
        </SwissBadge>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-1 -mt-1">
          <span className="font-medium italic bitter">{t('hero.headline_accent')}</span> {t('hero.headline_suffix')}
          <br />
          <span className="font-light tracking-tight text-white">{t('hero.headline_secondary')}</span>
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm font-light text-white/70 mb-2 -mt-1 leading-relaxed">
          {t('hero.description')}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <a href="https://calendly.com/falx-ch/free-strategy-call" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button variant="primary" className="hover-lift w-full sm:w-auto min-h-[44px]">
              {t('hero.cta_primary')}
            </Button>
          </a>
          <div className="relative group hidden lg:block">
            <Button variant="secondary" className="opacity-50 cursor-not-allowed w-full sm:w-auto min-h-[44px]" disabled>
              {t('hero.cta_secondary')}
            </Button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {t('hero.cta_secondary_tooltip')}
            </div>
          </div>
        </div>
      </GlassCard>
    </main>
  )
}
