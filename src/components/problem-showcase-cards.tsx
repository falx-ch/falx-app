"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"

export default function ProblemShowcaseCards() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const webRef = useRef<SVGSVGElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cardPositions, setCardPositions] = useState<{ x: number; y: number }[]>([])

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

    // Connection line animations
    if (webRef.current) {
      const paths = webRef.current.querySelectorAll("path")
      gsap.fromTo(
        paths,
        {
          strokeDasharray: "0 1000",
        },
        {
          strokeDasharray: "1000 0",
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.inOut",
        }
      )
    }
  }, [isVisible])

  const getConnectionPath = (fromIndex: number, toIndex: number) => {
    if (cardPositions.length === 0 || !cardPositions[fromIndex] || !cardPositions[toIndex]) {
      return "M0,0 L0,0"
    }

    const from = cardPositions[fromIndex]
    const to = cardPositions[toIndex]

    const dx = to.x - from.x
    const dy = to.y - from.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Control point for curve (perpendicular to the line)
    const midX = (from.x + to.x) / 2
    const midY = (from.y + to.y) / 2
    const controlOffset = Math.min(distance * 0.3, 15) // Curve intensity
    const controlX = midX + (dy / distance) * controlOffset
    const controlY = midY - (dx / distance) * controlOffset

    return `M${from.x},${from.y} Q${controlX},${controlY} ${to.x},${to.y}`
  }

  const connections = [
    { from: 0, to: 1, color: "#ef4444" }, // Manual data → Communication
    { from: 1, to: 2, color: "#f97316" }, // Communication → Compliance
    { from: 0, to: 3, color: "#eab308" }, // Manual data → Endless loops
    { from: 3, to: 4, color: "#a855f7" }, // Endless loops → Hidden costs
    { from: 2, to: 4, color: "#ec4899" }, // Compliance → Hidden costs
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
      color: "orange",
    },
    {
      icon: "⚠️",
      title: "Compliance-Risiken",
      subtitle: "Datenschutz in Gefahr",
      color: "yellow",
    },
    {
      icon: "🔄",
      title: "Endlose Schleifen",
      subtitle: "Ineffiziente Workflows",
      color: "purple",
    },
    {
      icon: "💸",
      title: "Versteckte Kosten",
      subtitle: "Ressourcenverschwendung",
      color: "pink",
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
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {connections.map((connection, index) => (
          <path
            key={index}
            d={getConnectionPath(connection.from, connection.to)}
            fill="none"
            stroke={connection.color}
            strokeWidth={hoveredCard === connection.from || hoveredCard === connection.to ? "0.8" : "0.5"}
            opacity={hoveredCard === connection.from || hoveredCard === connection.to ? "0.8" : "0.3"}
            filter="url(#glow)"
            className="transition-all duration-300"
          />
        ))}
      </svg>

      {/* Problem Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6 relative z-10">
        {problemCards.map((card, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el
            }}
            className="cursor-pointer transform transition-all duration-300 hover:scale-105 select-none"
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={handleCardLeave}
          >
            <div
              className={`bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border-2 transition-all duration-300 shadow-lg h-full
                ${
                  hoveredCard === index
                    ? `border-${card.color}-400 shadow-${card.color}-500/30`
                    : `border-${card.color}-500/30 hover:border-${card.color}-500/60`
                }`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-full bg-${card.color}-500/20 flex items-center justify-center flex-shrink-0 transition-all duration-300`}
                >
                  <span className={`text-${card.color}-400 text-lg`}>{card.icon}</span>
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white mb-1">{card.title}</div>
                  <div className="text-xs text-white/60">{card.subtitle}</div>
                </div>
              </div>
              {hoveredCard === index && (
                <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/50">
                  Problem-Kategorie: {card.color}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}