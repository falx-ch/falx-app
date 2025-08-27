"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from 'gsap'
import { Progress } from "@/components/ui/progress"
import { GlassCard } from '@/components/ui/glass-card'
import { gsapManager } from '@/lib/gsap-manager'

export default function AiInPracticeSolutions() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)

  // Setup card animations using GSAP manager
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    const ctx = gsapManager.createContext(containerRef.current)
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current]
    const cleanupFunctions: (() => void)[] = []

    // Small delay to ensure components are fully rendered
    const timer = setTimeout(() => {
      ctx.add(() => {
        // Card reveal animation using manager pattern
        const validCards = cards.filter(Boolean) as HTMLElement[]
        if (cardsRef.current && validCards.length > 0) {
          // Custom animation for AI practice cards
          gsap.fromTo(validCards, 
            { y: 50, opacity: 0, rotationY: -45, z: -200 },
            {
              y: 0,
              opacity: 1,
              rotationY: 0,
              z: 0,
              duration: 1.2,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 80%",
                once: true
              }
            }
          )
          
          // Progress bars animation
          const progressBars = validCards.map(card => card.querySelector('.progress-bar')).filter(Boolean)
          gsap.fromTo(progressBars, 
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "elastic.out(1, 0.3)",
              transformOrigin: "left",
              delay: 0.5,
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 80%",
                once: true
              }
            }
          )
        
        // Apply 3D tilt effects using GSAP manager
        validCards.forEach((card) => {
          if (card) {
            const cleanup = gsapManager.apply3DTilt(card)
            cleanupFunctions.push(cleanup)
          }
        })
        }
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

  const solutions = [
    {
      title: "Administration automatisieren",
      description: "Rechnungen, Verträge und Berichte in Sekunden statt Stunden",
      icon: "📋",
      color: "emerald",
      stats: "↗ 78% Zeitersparnis",
      progress: 78,
      ref: card1Ref,
    },
    {
      title: "Marketing optimieren",
      description: "Personalisierte Kampagnen und automatische Kundenansprache",
      icon: "🎯",
      color: "blue",
      stats: "↗ 156% mehr Leads",
      progress: 95,
      ref: card2Ref,
    },
    {
      title: "Verkauf beschleunigen",
      description: "Intelligente Lead-Qualifizierung und automatische Follow-ups",
      icon: "⚡",
      color: "violet",
      stats: "↗ 43% höhere Conversion",
      progress: 89,
      ref: card3Ref,
    },
  ]

  return (
    <div ref={containerRef}>
      <div ref={cardsRef} className="space-y-3 sm:space-y-4 lg:space-y-5">
        {solutions.map((solution, index) => (
          <GlassCard
            key={index}
            ref={solution.ref}
            variant="solution"
            intensity="medium"
            hover="lift"
            className="solution-card opacity-0 transition-all duration-500"
            style={{ 
              transform: 'translateY(50px) rotateY(-45deg) translateZ(-200px)'
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-content">
              <div className="flex items-start justify-between mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <span className="text-lg sm:text-xl filter drop-shadow-sm">{solution.icon}</span>
                </div>
                <div className="text-xs font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
                  {solution.stats}
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-light mb-3 sm:mb-4 text-white leading-tight tracking-tight">{solution.title}</h3>
              <p className="text-white/75 text-sm leading-relaxed mb-4 sm:mb-5 font-light">{solution.description}</p>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60 font-light">Effizienz</span>
                  <span className="font-medium text-white">{solution.progress}%</span>
                </div>
                <div className="relative h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <Progress value={solution.progress} className="h-full progress-bar" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full"></div>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center text-white/60 text-xs sm:text-sm font-light group">
                <span>Mehr erfahren</span>
                <span className="ml-2 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/80">→</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}