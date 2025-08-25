"use client"

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GlassCard } from '@/components/ui/glass-card'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ReportSectionCards() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)

  // Setup card animations with proper GSAP context
  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean)

      // Advanced 3D card tilt effects and reveal
      if (cardsRef.current && cards.length > 0) {
        // Initial reveal animation
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.fromTo(cards, 
              { y: 50, opacity: 0, rotationX: -15 },
              {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
              }
            )
          }
        })
        
        // 3D tilt effects for each card
        cards.forEach((card, index) => {
          if (!card) return
          
          gsap.set(card, { 
            transformOrigin: "center",
            transformStyle: "preserve-3d"
          })
          
          const cardContent = card.querySelector('.card-content') || card.firstElementChild
          if (cardContent) {
            gsap.set(cardContent, { transformOrigin: "center" })
          }
          
          const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const rotateX = (e.clientY - centerY) / 10
            const rotateY = (centerX - e.clientX) / 10
            
            gsap.to(card, {
              rotationX: rotateX,
              rotationY: rotateY,
              z: 30,
              duration: 0.4,
              ease: "power2.out"
            })
            
            if (cardContent) {
              gsap.to(cardContent, {
                x: (e.clientX - centerX) / 20,
                y: (e.clientY - centerY) / 20,
                duration: 0.4,
                ease: "power2.out"
              })
            }
          }
          
          const handleMouseLeave = () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              z: 0,
              duration: 0.6,
              ease: "power3.out"
            })
            
            if (cardContent) {
              gsap.to(cardContent, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "power3.out"
              })
            }
          }
          
          card.addEventListener('mousemove', handleMouseMove)
          card.addEventListener('mouseleave', handleMouseLeave)
        })
      }
    }, cardsRef) // GSAP context scope
    
    return () => {
      ctx.revert() // This will kill all animations and ScrollTriggers in this context
    }
  }, [])

  return (
    <div ref={cardsRef} className="grid grid-cols-1 gap-4">
      <GlassCard 
        ref={card1Ref}
        variant="interactive"
        hover="glow"
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
        hover="glow"
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
        hover="glow"
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