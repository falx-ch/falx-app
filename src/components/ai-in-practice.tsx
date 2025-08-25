"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from 'gsap'
import { Progress } from "@/components/ui/progress"
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { gsapManager } from '@/lib/gsap-manager'

export default function AiInPractice() {
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
        // Header content animation
        gsap.fromTo(containerRef.current!.querySelector(".header-content"), 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true
            }
          }
        )

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

  return (
    <section 
      ref={containerRef}
      className="min-h-screen ai-practice-gradient text-white flex items-center justify-center relative overflow-hidden py-16 lg:py-24"
    >
      {/* Neutral slate background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(71,85,105,0.06),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(100,116,139,0.04),transparent_65%)]" />

      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 800 600">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path
            d="M100,300 Q400,100 700,300 Q400,500 100,300"
            stroke="url(#flowGradient)"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
            className="animate-pulse"
          />
          <path
            d="M150,250 Q450,150 650,350"
            stroke="url(#flowGradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <path
            d="M150,350 Q450,450 650,250"
            stroke="url(#flowGradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
            className="animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start"> {/* 40/60 split - no margins */}
          {/* Left column - Header content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="header-content">
              <h2 className="text-5xl lg:text-6xl font-light mb-6 tracking-tight leading-tight">
                <span className="font-serif italic text-emerald-300">KI</span> in der <br />
                Praxis
              </h2>
              <p className="text-emerald-300/80 text-lg font-medium mb-4">
                100% Erfolgsgarantie & Schweizer Datensicherheit
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                Transformieren Sie Ihre Geschäftsprozesse mit bewährten KI-Lösungen, die sofort messbare Ergebnisse
                liefern.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="text-white/70 text-sm">DSGVO-konforme Implementierung</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-white/70 text-sm">Schweizer Hosting & Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                <span className="text-white/70 text-sm">ROI-Garantie innerhalb 90 Tagen</span>
              </div>
            </div>

            <Button variant="primary" className="animate-on-scroll">
              Kostenloses Beratungsgespräch
            </Button>
          </div>

          {/* Right column - Solution cards */}
          <div className="lg:col-span-3">
            <div ref={cardsRef} className="space-y-3 sm:space-y-4 lg:space-y-5">
              {[
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
              ].map((solution, index) => (
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
        </div>
      </div>
    </section>
  )
}