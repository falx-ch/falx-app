"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { Flip } from "gsap/Flip"
import { GlassCard } from '@/components/ui/glass-card'
import { cn } from '@/lib/utils'
import type { Translations } from '@/lib/i18n'

// Register GSAP plugins
gsap.registerPlugin(Flip)

interface Props {
  translations: Translations;
}

export default function ProblemShowcaseCards({ translations }: Props) {
  const [isVisible, setIsVisible] = useState(false)

  // Direct access to translation data - no fallbacks needed
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const webRef = useRef<SVGSVGElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cardPositions, setCardPositions] = useState<{ x: number; y: number }[]>([])
  const [isMeshLayout, setIsMeshLayout] = useState(true) // Start with mesh layout

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMousePosition({ x, y })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (!isVisible || cardsRef.current.length === 0) return

    const updatePositions = () => {
      if (!containerRef.current || !webRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const svgRect = webRef.current.getBoundingClientRect()

      const positions = cardsRef.current.map((card) => {
        if (!card) return { x: 0, y: 0 }

        const cardRect = card.getBoundingClientRect()
        const cardCenterX = cardRect.left + cardRect.width / 2
        const cardCenterY = cardRect.top + cardRect.height / 2

        // Convert to SVG viewBox coordinates (0-100)
        const x = ((cardCenterX - svgRect.left) / svgRect.width) * 100
        const y = ((cardCenterY - svgRect.top) / svgRect.height) * 100

        return { x, y }
      })

      setCardPositions(positions)
    }

    // Initial position calculation with delay for grid layout
    const initialTimer = setTimeout(updatePositions, 100)

    // Update positions on window resize
    const handleResize = () => {
      setTimeout(updatePositions, 50) // Small delay for layout changes
    }
    window.addEventListener("resize", handleResize)

    // Observe card position changes for dynamic updates
    const observer = new ResizeObserver(() => {
      setTimeout(updatePositions, 10)
    })

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      clearTimeout(initialTimer)
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
    }
  }, [isVisible])

  // Handle initial card entrance animation
  useEffect(() => {
    if (!isVisible || cardsRef.current.length === 0) return

    // Card entrance animations
    gsap.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        scale: 0.8,
        y: 20,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      }
    )
  }, [isVisible])

  // Handle connection line animation only
  useEffect(() => {
    if (!isVisible) return
    
    // Delay for layout to settle, then animate connections
    const timer = setTimeout(() => {
      if (webRef.current) {
        const paths = webRef.current.querySelectorAll("path")
        gsap.fromTo(
          paths,
          { strokeDasharray: "0 1000", opacity: 0 },
          {
            strokeDasharray: "1000 0",
            opacity: 0.4,
            duration: 2,
            stagger: 0.15,
            ease: "power2.inOut",
          }
        )
      }
    }, 800)
    
    return () => clearTimeout(timer)
  }, [isVisible])

  const getConnectionPath = (fromIndex: number, toIndex: number) => {
    if (!cardsRef.current[fromIndex] || !cardsRef.current[toIndex] || !containerRef.current) {
      return "M0,0 L0,0"
    }

    const fromCard = cardsRef.current[fromIndex]
    const toCard = cardsRef.current[toIndex]
    const containerRect = containerRef.current.getBoundingClientRect()
    
    // Get actual card positions after GSAP transforms
    const fromRect = fromCard.getBoundingClientRect()
    const toRect = toCard.getBoundingClientRect()
    
    // Convert to relative coordinates within container
    const fromX = ((fromRect.left + fromRect.width / 2) - containerRect.left) / containerRect.width * 100
    const fromY = ((fromRect.top + fromRect.height / 2) - containerRect.top) / containerRect.height * 100
    const toX = ((toRect.left + toRect.width / 2) - containerRect.left) / containerRect.width * 100
    const toY = ((toRect.top + toRect.height / 2) - containerRect.top) / containerRect.height * 100

    // Calculate edge connection points
    const dx = toX - fromX
    const dy = toY - fromY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx)
    
    // Card dimensions in SVG coordinates
    const cardWidth = (fromRect.width / containerRect.width) * 100
    const cardHeight = (fromRect.height / containerRect.height) * 100
    
    // Connect at card edges, not centers
    const fromEdgeX = fromX + (cardWidth * 0.35) * Math.cos(angle)
    const fromEdgeY = fromY + (cardHeight * 0.35) * Math.sin(angle)
    const toEdgeX = toX - (cardWidth * 0.35) * Math.cos(angle)
    const toEdgeY = toY - (cardHeight * 0.35) * Math.sin(angle)

    // Create organic curve with varying intensity
    const curveIntensity = 6 + Math.sin(fromIndex + toIndex) * 4
    const midX = (fromEdgeX + toEdgeX) / 2
    const midY = (fromEdgeY + toEdgeY) / 2
    const controlX = midX + (dy / distance) * curveIntensity
    const controlY = midY - (dx / distance) * curveIntensity

    return `M${fromEdgeX},${fromEdgeY} Q${controlX},${controlY} ${toEdgeX},${toEdgeY}`
  }

  // Create fully interconnected web - every card connects to every other card
  const connections = [
    { from: 0, to: 1 }, // Manual → Communication
    { from: 0, to: 2 }, // Manual → Compliance
    { from: 0, to: 3 }, // Manual → Loops
    { from: 0, to: 4 }, // Manual → Costs
    { from: 1, to: 2 }, // Communication → Compliance
    { from: 1, to: 3 }, // Communication → Loops
    { from: 1, to: 4 }, // Communication → Costs
    { from: 2, to: 3 }, // Compliance → Loops
    { from: 2, to: 4 }, // Compliance → Costs
    { from: 3, to: 4 }, // Loops → Costs
  ]

  const problemCards = [
    {
      index: 1,
      color: "red",
    },
    {
      index: 2,
      color: "red",
    },
    {
      index: 3,
      color: "red",
    },
    {
      index: 4,
      color: "red",
    },
    {
      index: 5,
      color: "red",
    },
  ]

  const handleCardHover = (cardIndex: number) => {
    setHoveredCard(cardIndex)
  }

  const handleCardLeave = () => {
    setHoveredCard(null)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* SVG overlay for connections */}
      <svg
        ref={webRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glowEffect">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {connections.map((connection, index) => {
          const isHovered = hoveredCard === connection.from || hoveredCard === connection.to
          return (
            <path
              key={index}
              d={getConnectionPath(connection.from, connection.to)}
              fill="none"
              stroke={isHovered ? "#9ca3af" : "#6b7280"}
              strokeWidth="0.6"
              opacity="0"
              strokeDasharray="0 1000"
              filter={isHovered ? "url(#glowEffect)" : "none"}
              className="transition-all duration-300"
            />
          )
        })}
      </svg>

      {/* Problem Cards - Responsive Layout */}
      <div className="relative z-10 w-full h-[500px] sm:h-[600px] md:h-[400px] lg:h-[450px]">
        {/* Card positioning - mobile stack, desktop organic mesh */}
        <div className="grid grid-cols-12 grid-rows-10 md:grid-rows-8 h-full w-full gap-0">
          {problemCards.map((card, index) => {
            // CSS Grid positioning - mobile-first to prevent overlapping
            const gridPositions = [
              { 
                // Mobile: vertical stack, Desktop: organic mesh
                col: "1 / span 12", 
                row: "1 / span 2", 
                transform: "rotate(-1deg) translate(0px, 0px)",
                mdCol: "2 / span 3",
                mdRow: "1 / span 2", 
                mdTransform: "rotate(-3deg) translate(10px, 5px)"
              },
              { 
                col: "1 / span 12", 
                row: "3 / span 2", 
                transform: "rotate(1deg) translate(0px, 0px)",
                mdCol: "8 / span 3",
                mdRow: "1 / span 2", 
                mdTransform: "rotate(2deg) translate(-5px, 10px)"
              },
              { 
                col: "1 / span 12", 
                row: "5 / span 2", 
                transform: "rotate(-1deg) translate(0px, 0px)",
                mdCol: "10 / span 3",
                mdRow: "4 / span 2", 
                mdTransform: "rotate(-4deg) translate(-10px, 0px)"
              },
              { 
                col: "1 / span 12", 
                row: "7 / span 2", 
                transform: "rotate(1deg) translate(0px, 0px)",
                mdCol: "1 / span 3",
                mdRow: "6 / span 2", 
                mdTransform: "rotate(5deg) translate(15px, -5px)"
              },
              { 
                col: "1 / span 12", 
                row: "9 / span 2", 
                transform: "rotate(-1deg) translate(0px, 0px)",
                mdCol: "5 / span 3",
                mdRow: "6 / span 2", 
                mdTransform: "rotate(-2deg) translate(0px, 5px)"
              },
            ]
            
            const pos = gridPositions[index]
            
            return (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="select-none transition-all duration-300 place-self-center opacity-0"
              style={{
                gridColumn: !isMobile ? pos.mdCol : pos.col,
                gridRow: !isMobile ? pos.mdRow : pos.row,
                transform: `${!isMobile ? pos.mdTransform : pos.transform} scale(0.8) translateY(20px)`,
              }}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
            >
            <GlassCard
              intensity="medium"
              hover="lift"
              size="sm"
              className={cn(
                "relative overflow-hidden transition-all duration-300 rounded-2xl mx-auto",
                "w-72 h-20 sm:w-80 sm:h-22 md:w-44 md:h-22 lg:w-48 lg:h-24", // Full width on mobile, smaller on desktop
                hoveredCard === index
                  ? "border-white/25"
                  : "border-white/15"
              )}
            >
              {/* Subtle gradient overlay for color accent */}
              <div className="absolute inset-0 opacity-10 rounded-2xl" 
              style={{
                background: `radial-gradient(circle at top left, var(--${card.color}-glow) 0%, transparent 70%)`
              }}/>
              
              <div className="relative flex items-center gap-2 h-full px-2 py-2">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <span className="text-xl sm:text-2xl leading-none">{translations.problem_showcase_cards[`card${card.index}` as keyof typeof translations.problem_showcase_cards].icon}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="text-xs sm:text-sm md:text-sm font-medium text-white/90 leading-tight">
                    {translations.problem_showcase_cards[`card${card.index}` as keyof typeof translations.problem_showcase_cards].title}
                  </div>
                </div>
              </div>
            </GlassCard>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}