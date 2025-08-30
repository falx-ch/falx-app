"use client"

import { useRef, useEffect } from "react"
import { gsap } from 'gsap'
import { Badge } from "@/components/ui/badge"
import { GlassCard } from '@/components/ui/glass-card'
import { gsapManager } from '@/lib/gsap-manager'
import { cn } from "@/lib/utils"

export default function SolutionsShowcaseCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)

  // Setup simplified card animations following Swiss design principles
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    const ctx = gsapManager.createContext(containerRef.current)
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current]

    // Small delay to ensure components are fully rendered
    const timer = setTimeout(() => {
      ctx.add(() => {
        // Simple, elegant card reveal animation
        const validCards = cards.filter(Boolean) as HTMLElement[]
        if (cardsRef.current && validCards.length > 0) {
          // Clean Swiss-style reveal animation
          gsap.fromTo(validCards, 
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 85%",
                once: true
              }
            }
          )
          
          // Animate metric badges
          const badges = validCards.map(card => card.querySelector('.metric-badge')).filter(Boolean)
          gsap.fromTo(badges, 
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.4)",
              delay: 0.3,
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 85%",
                once: true
              }
            }
          )
        }
      })
    }, 50)
    
    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [])

  const solutions = [
    {
      title: "Administration automatisieren",
      description: "Rechnungen, Verträge und Berichte in Sekunden statt Stunden",
      icon: "📋",
      metric: "78% Zeitersparnis",
      impact: "↗ CHF 78'000 jährlich gespart",
      ref: card1Ref,
    },
    {
      title: "Marketing optimieren",
      description: "Personalisierte Kampagnen und automatische Kundenansprache",
      icon: "🎯",
      metric: "156% mehr Leads",
      impact: "↗ 3.2x ROI Steigerung",
      ref: card2Ref,
    },
    {
      title: "Verkauf beschleunigen",
      description: "Intelligente Lead-Qualifizierung und automatische Follow-ups",
      icon: "⚡",
      metric: "43% höhere Conversion",
      impact: "↗ CHF 120'000 Mehrumsatz",
      ref: card3Ref,
    },
  ]

  return (
    <div ref={containerRef}>
      <div ref={cardsRef} className="space-y-4 lg:space-y-5">
        {solutions.map((solution, index) => (
          <GlassCard
            key={index}
            ref={solution.ref}
            variant="default"
            intensity="medium"
            hover="lift"
            className={cn(
              "solution-card opacity-0 max-w-sm mx-auto lg:mx-0 lg:max-w-md",
              "transition-all duration-300 transform-gpu will-change-transform"
            )}
          >
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Icon Section */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <span className="text-xl sm:text-2xl">{solution.icon}</span>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="flex-1 min-w-0">
                {/* Header with Title and Metric Badge */}
                <div className="flex items-start gap-3 mb-3 sm:mb-4">
                  <h3 className="flex-1 min-w-0 text-lg sm:text-xl font-light text-white leading-tight tracking-tight">
                    {solution.title}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "metric-badge flex-shrink-0 opacity-0",
                      "bg-white/10 text-white border-white/20 backdrop-blur-sm",
                      "text-[10px] sm:text-xs font-medium px-2 py-1 sm:px-3 sm:py-1.5"
                    )}
                  >
                    {solution.metric}
                  </Badge>
                </div>
                
                {/* Description */}
                <p className="text-white/75 text-sm leading-relaxed mb-4 font-light">
                  {solution.description}
                </p>
                
                {/* Impact Metrics */}
                <div className="text-xs text-white/60 font-medium">
                  {solution.impact}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}