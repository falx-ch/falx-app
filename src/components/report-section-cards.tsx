"use client"

import { useRef, useEffect } from 'react'
import { GlassCard } from '@/components/ui/glass-card'
import { gsapManager } from '@/lib/gsap-manager'
import { useTranslations } from '@/hooks/useTranslations'

export default function ReportSectionCards() {
  const { t, isReady } = useTranslations();
  const cardsRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)

  // Setup card animations using GSAP manager
  useEffect(() => {
    if (typeof window === 'undefined' || !cardsRef.current) return

    const ctx = gsapManager.createContext(cardsRef.current)
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current]
    const cleanupFunctions: (() => void)[] = []

    // Small delay to ensure components are fully rendered
    const timer = setTimeout(() => {
      ctx.add(() => {
        // Initial reveal animation using manager
        gsapManager.animateCardReveal(cards, cardsRef.current!)
        
      })
    }, 50)
    
    return () => {
      clearTimeout(timer)
      // Cleanup event listeners
      cleanupFunctions.forEach(cleanup => cleanup())
      // Revert GSAP context
      ctx.revert()
    }
  }, [])

  return (
    <div ref={cardsRef} className="grid grid-cols-1 gap-4">
      <GlassCard 
        ref={card1Ref}
        variant="default"
        hover="lift"
        size="md"
className="opacity-0"
        style={{ transform: 'translateY(50px) rotateX(-15deg)' }}
      >
        <div className="flex items-center gap-3 sm:gap-4 card-content">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <span className="text-xl sm:text-2xl">{t('report_section_cards.card1.icon')}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base sm:text-lg lg:text-xl font-normal text-white/90">{t('report_section_cards.card1.text')}</div>
          </div>
        </div>
      </GlassCard>

      <GlassCard 
        ref={card2Ref}
        variant="default"
        hover="lift"
        size="md"
className="opacity-0"
        style={{ transform: 'translateY(50px) rotateX(-15deg)' }}
      >
        <div className="flex items-center gap-3 sm:gap-4 card-content">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <span className="text-xl sm:text-2xl">{t('report_section_cards.card2.icon')}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base sm:text-lg lg:text-xl font-normal text-white/90">{t('report_section_cards.card2.text')}</div>
          </div>
        </div>
      </GlassCard>

      <GlassCard 
        ref={card3Ref}
        variant="default"
        hover="lift"
        size="md"
className="opacity-0"
        style={{ transform: 'translateY(50px) rotateX(-15deg)' }}
      >
        <div className="flex items-center gap-3 sm:gap-4 card-content">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <span className="text-xl sm:text-2xl">{t('report_section_cards.card3.icon')}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base sm:text-lg lg:text-xl font-normal text-white/90">{t('report_section_cards.card3.text')}</div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}