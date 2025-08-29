"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { Flip } from "gsap/Flip"
import { GlassCard } from '@/components/ui/glass-card'
import { cn } from '@/lib/utils'

// Register GSAP plugins
gsap.registerPlugin(Flip)

export default function ProblemShowcaseCards() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const webRef = useRef<SVGSVGElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cardPositions, setCardPositions] = useState<{ x: number; y: number }[]>([])
  const [isMeshLayout, setIsMeshLayout] = useState(true) // Start with mesh layout

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
      icon: "📊",
      title: "Manuelle Datenerfassung",
      subtitle: "Fehleranfällig & zeitaufwändig",
      color: "red",
    },
    {
      icon: "💬",
      title: "Fragmentierte Kommunikation",
      subtitle: "Informationsverlust garantiert",
      color: "red",
    },
    {
      icon: "⚠️",
      title: "Compliance-Risiken",
      subtitle: "Datenschutz in Gefahr",
      color: "red",
    },
    {
      icon: "🔄",
      title: "Endlose Schleifen",
      subtitle: "Ineffiziente Workflows",
      color: "red",
    },
    {
      icon: "💸",
      title: "Versteckte Kosten",
      subtitle: "Ressourcenverschwendung",
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
        {connections.map((connection, index) => (
          <path
            key={index}
            d={getConnectionPath(connection.from, connection.to)}
            fill="none"
            stroke="#6b7280"
            strokeWidth="0.6"
            opacity={hoveredCard === connection.from || hoveredCard === connection.to ? "0.7" : "0.3"}
            strokeDasharray={hoveredCard === connection.from || hoveredCard === connection.to ? "4,2" : "none"}
            className="transition-all duration-300"
          />
        ))}
      </svg>

      {/* Problem Cards - Organic Mesh Layout */}
      <div className="relative z-10 w-full h-[350px] md:h-[400px] lg:h-[450px]">
        {/* Card positioning using CSS Grid as base with transforms for organic feel */}
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full gap-0">
          {problemCards.map((card, index) => {
            // CSS Grid positioning for organic mesh (no GSAP positioning)
            const gridPositions = [
              { col: "2 / span 3", row: "1 / span 2", transform: "rotate(-3deg) translate(10px, 5px)" },  // Top left
              { col: "8 / span 3", row: "1 / span 2", transform: "rotate(2deg) translate(-5px, 10px)" },   // Top right
              { col: "10 / span 3", row: "4 / span 2", transform: "rotate(-4deg) translate(-10px, 0px)" }, // Right
              { col: "1 / span 3", row: "6 / span 2", transform: "rotate(5deg) translate(15px, -5px)" },  // Bottom left
              { col: "5 / span 3", row: "6 / span 2", transform: "rotate(-2deg) translate(0px, 5px)" },   // Bottom center
            ]
            
            const pos = gridPositions[index]
            
            return (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="cursor-pointer select-none transition-all duration-300 place-self-center"
              style={{
                gridColumn: pos.col,
                gridRow: pos.row,
                transform: pos.transform,
              }}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
            >
            <GlassCard
              intensity="medium"
              hover="none"
              size="sm"
              className={cn(
                "relative overflow-hidden transition-all duration-300 rounded-2xl",
                "w-32 md:w-36 lg:w-40", // Fixed responsive widths
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
              
              <div className="relative flex items-start space-x-2 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <span className="text-white/90 text-sm">{card.icon}</span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-white/90">{card.title}</div>
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