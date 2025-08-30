"use client"

import { useRef, useEffect } from 'react'
import { GlassCard } from '@/components/ui/glass-card'
import { gsapManager } from '@/lib/gsap-manager'

export default function ReportSectionCards() {
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
        variant="interactive"
        hover="lift"
        size="md"
        style={{ transform: 'translateY(50px) rotateX(-15deg)' }}
      >
        <div className="flex items-center justify-between card-content">
          <div>
            <div className="text-lg lg:text-xl font-normal text-white/90 mb-1">+7 Std. Verwaltung pro Woche</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
            <span className="text-red-400 text-xs">⏱</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard 
        ref={card2Ref}
        variant="interactive"
        hover="lift"
        size="md"
        style={{ transform: 'translateY(50px) rotateX(-15deg)' }}
      >
        <div className="flex items-center justify-between card-content">
          <div>
            <div className="text-lg lg:text-xl font-normal text-white/90 mb-1">6.8 Tage verschwendet pro Monat</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
            <span className="text-orange-400 text-xs">⚠</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard 
        ref={card3Ref}
        variant="interactive"
        hover="lift"
        size="md"
        style={{ transform: 'translateY(50px) rotateX(-15deg)' }}
      >
        <div className="flex items-center justify-between card-content">
          <div>
            <div className="text-lg lg:text-xl font-normal text-white/90 mb-1">CHF 6 Mia. schweizweit pro Jahr</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
            <span className="text-red-400 text-xs">📉</span>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}