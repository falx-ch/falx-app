"use client"

import { useRef, useEffect } from "react"
import { gsap } from 'gsap'
import { GlassCard } from '@/components/ui/glass-card'
import { gsapManager } from '@/lib/gsap-manager'
import { cn } from "@/lib/utils"
import type { Translations } from '@/lib/i18n'

export interface Props {
  translations: Translations;
}

export default function SolutionShowcaseCards({ translations }: Props) {
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
      title: translations.solution_showcase_cards.card1.title,
      description: translations.solution_showcase_cards.card1.description,
      metric: translations.solution_showcase_cards.card1.metric,
      icon: translations.solution_showcase_cards.card1.icon,
      ref: card1Ref,
    },
    {
      title: translations.solution_showcase_cards.card2.title,
      description: translations.solution_showcase_cards.card2.description,
      metric: translations.solution_showcase_cards.card2.metric,
      icon: translations.solution_showcase_cards.card2.icon,
      ref: card2Ref,
    },
    {
      title: translations.solution_showcase_cards.card3.title,
      description: translations.solution_showcase_cards.card3.description,
      metric: translations.solution_showcase_cards.card3.metric,
      icon: translations.solution_showcase_cards.card3.icon,
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
              "solution-card opacity-0 w-full",
              "transition-all duration-300 transform-gpu will-change-transform"
            )}
          >
            <div className="flex items-center gap-3 sm:gap-4 card-content">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <span className="text-xl sm:text-2xl">{solution.icon}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base sm:text-lg lg:text-xl font-normal text-white/90">{solution.title}</div>
                <p className="text-white/60 text-sm leading-relaxed mt-1">
                  {solution.description}
                </p>
                <p className="text-white/80 text-sm font-medium mt-2">
                  {solution.metric}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}