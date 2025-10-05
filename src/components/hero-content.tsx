import { GlassCard } from '@/components/ui/glass-card'
import { SwissBadge } from '@/components/ui/swiss-badge'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/hooks/useTranslations'

export default function HeroContent() {
  const { t, isReady } = useTranslations();

  // Show actual layout with default content until translations load
  const displayText = {
    badge: isReady ? t('hero.badge') : 'Swiss Made • 🔒 DSG konform • 🎯 Gratis Growth Audit',
    headlineAccent: isReady ? t('hero.headline_accent') : 'KI-Strategien',
    headlineSuffix: isReady ? t('hero.headline_suffix') : 'für',
    headlineSecondary: isReady ? t('hero.headline_secondary') : 'Schweizer KMU',
    description: isReady ? t('hero.description') : 'Schweizer KMU verlieren jeden Monat 31 Stunden an Administration. Schweizweit sind das CHF 6 Milliarden pro Jahr. Wir holen Ihre Zeit zurück mit KI-Agenten, Automatisierungen oder hybriden Lösungen. Erste Resultate in 2 Wochen.',
    ctaPrimary: isReady ? t('hero.cta_primary') : 'Kostenlos beraten',
    ctaSecondary: isReady ? t('hero.cta_secondary') : 'Report herunterladen',
    ctaSecondaryTooltip: isReady ? t('hero.cta_secondary_tooltip') : 'Bald verfügbar'
  };
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
{displayText.badge}
          </span>
        </SwissBadge>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-1 -mt-1">
          <span className="font-medium italic bitter">{displayText.headlineAccent}</span>
          <br />
          <span className="font-light tracking-tight text-white">{displayText.headlineSecondary}</span>
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm font-light text-white/70 mb-2 -mt-1 leading-relaxed">
          {displayText.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <a href="https://cal.com/chrispkobler/discovery" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button variant="primary" className="hover-lift w-full sm:w-auto min-h-[44px]">
              {displayText.ctaPrimary}
            </Button>
          </a>
          <div className="relative group hidden md:block">
            <Button variant="secondary" className="opacity-50 cursor-not-allowed w-full sm:w-auto min-h-[44px]" disabled>
              {displayText.ctaSecondary}
            </Button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {displayText.ctaSecondaryTooltip}
            </div>
          </div>
        </div>

        {/* Powered by section */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <p className="text-xs text-white/50 mb-2 text-left">POWERED BY</p>
          <div className="flex items-center justify-center sm:justify-start gap-4 opacity-60">
            <img src="/openai-text.svg" alt="OpenAI" className="h-4 object-contain brightness-0 invert" />
            <img src="/make-text.svg" alt="Make" className="h-4 object-contain brightness-0 invert" />
            <img src="/n8n-text.svg" alt="n8n" className="h-3.5 object-contain brightness-0 invert" />
            <img src="/twilio-text.svg" alt="Twilio" className="h-4 object-contain" />
            <img src="/retell-text.svg" alt="Retell" className="h-4 object-contain" />
            <img src="/gemini-text.svg" alt="Gemini" className="h-4 object-contain brightness-0 invert" />
          </div>
        </div>
      </GlassCard>
    </main>
  )
}
