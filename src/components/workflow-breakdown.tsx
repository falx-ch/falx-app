"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"

export default function WorkflowBreakdown() {
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
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const svgRect = webRef.current?.getBoundingClientRect()

      if (!svgRect) return

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

    // Initial position calculation
    updatePositions()

    // Update positions on window resize
    const handleResize = () => updatePositions()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [isVisible])

  useEffect(() => {
    if (!isVisible || !containerRef.current || !webRef.current || cardPositions.length === 0) return

    const cards = cardsRef.current.filter(Boolean)
    const webLines = webRef.current.querySelectorAll(".web-line")
    const webNodes = webRef.current.querySelectorAll(".web-node")

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        scale: 0.8,
        y: 30,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)",
      },
    )

    gsap.fromTo(
      webLines,
      { strokeDasharray: "0 1000" },
      {
        strokeDasharray: "1000 0",
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.inOut",
        delay: 0.8,
      },
    )

    gsap.to(webNodes, {
      scale: 1.3,
      opacity: 0.9,
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: 0.3,
      ease: "sine.inOut",
    })

    cards.forEach((card, index) => {
      gsap.to(card, {
        y: "+=8",
        rotation: "+=1",
        duration: 4 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      })
    })
  }, [isVisible, cardPositions])

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
      position: { top: "8%", left: "50%", transform: "translateX(-50%)" },
    },
    {
      icon: "💬",
      title: "Fragmentierte Kommunikation",
      subtitle: "Informationsverlust garantiert",
      color: "orange",
      position: { bottom: "25%", left: "12%" },
    },
    {
      icon: "⚠️",
      title: "Compliance-Risiken",
      subtitle: "Datenschutz in Gefahr",
      color: "yellow",
      position: { bottom: "20%", right: "5%" },
    },
    {
      icon: "🔄",
      title: "Endlose Schleifen",
      subtitle: "Ineffiziente Workflows",
      color: "purple",
      position: { top: "45%", right: "2%", transform: "translateY(-50%)" },
    },
    {
      icon: "💸",
      title: "Versteckte Kosten",
      subtitle: "Ressourcenverschwendung",
      color: "pink",
      position: { top: "25%", left: "8%" },
    },
  ]

  const handleCardHover = (cardIndex: number) => {
    setHoveredCard(cardIndex)

    // Highlight connected lines
    const connectedLines = connections.filter((conn) => conn.from === cardIndex || conn.to === cardIndex)

    connectedLines.forEach((_, index) => {
      const line = webRef.current?.querySelector(`.web-line-${index}`)
      if (line) {
        gsap.to(line, {
          strokeWidth: 3,
          opacity: 1,
          duration: 0.3,
        })
      }
    })

    // Scale up the hovered card
    const card = cardsRef.current[cardIndex]
    if (card) {
      gsap.to(card, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  const handleCardLeave = () => {
    setHoveredCard(null)

    // Reset all lines
    const allLines = webRef.current?.querySelectorAll(".web-line")
    if (allLines) {
      gsap.to(allLines, {
        strokeWidth: 1.5,
        opacity: 0.6,
        duration: 0.3,
      })
    }

    // Reset all cards
    const cards = cardsRef.current.filter(Boolean)
    gsap.to(cards, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <section className="min-h-screen workflow-gradient text-white flex items-center justify-center relative overflow-hidden py-16 lg:py-24">
      {/* Soft neutral background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(55,65,81,0.08),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(75,85,99,0.05),transparent_65%)]" />

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-16 items-center">
          {/* Left column - Interactive Visualization (70%) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative h-64 sm:h-80 lg:h-96">
              <svg
                ref={webRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {cardPositions.length > 0 &&
                  connections.map((connection, index) => (
                    <path
                      key={index}
                      className={`web-line web-line-${index}`}
                      d={getConnectionPath(connection.from, connection.to)}
                      stroke={connection.color}
                      strokeWidth="1.5"
                      fill="none"
                      opacity="0.6"
                      filter="url(#glow)"
                      strokeDasharray="5,3"
                    />
                  ))}

                {cardPositions.map((pos, index) => (
                  <circle
                    key={index}
                    className="web-node"
                    cx={pos.x}
                    cy={pos.y}
                    r="1.2"
                    fill={
                      problemCards[index]?.color === "red"
                        ? "#ef4444"
                        : problemCards[index]?.color === "orange"
                          ? "#f97316"
                          : problemCards[index]?.color === "yellow"
                            ? "#eab308"
                            : problemCards[index]?.color === "purple"
                              ? "#a855f7"
                              : "#ec4899"
                    }
                    opacity="0.8"
                    filter="url(#glow)"
                  />
                ))}
              </svg>

              {problemCards.map((card, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el
                  }}
                  className="absolute cursor-pointer transform transition-all duration-300 hover:z-10 select-none"
                  style={card.position}
                  onMouseEnter={() => handleCardHover(index)}
                  onMouseLeave={handleCardLeave}
                >
                  <div
                    className={`bg-slate-900/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border-2 transition-all duration-300 shadow-lg
                      ${
                        hoveredCard === index
                          ? `border-${card.color}-400 shadow-${card.color}-500/30`
                          : `border-${card.color}-500/30 hover:border-${card.color}-500/60`
                      }`}
                    style={{ maxWidth: "200px" }}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-${card.color}-500/20 flex items-center justify-center flex-shrink-0 transition-all duration-300`}
                      >
                        <span className={`text-${card.color}-400 text-xs sm:text-sm`}>{card.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-white truncate">{card.title}</div>
                        <div className="text-xs text-white/60 truncate">{card.subtitle}</div>
                      </div>
                    </div>
                    {hoveredCard === index && (
                      <div className="mt-2 text-xs text-white/50">
                        Verbunden mit {connections.filter((c) => c.from === index || c.to === index).length} anderen
                        Problemen
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Content (30%) */}
          <div className="lg:col-span-3 space-y-6 lg:space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light mb-4 lg:mb-6 tracking-tight leading-tight">
                Der <span className="font-serif italic text-red-300">Workflow</span>-<br />
                Zusammenbruch
              </h2>
              <p className="text-white/60 text-base lg:text-lg leading-relaxed mb-6 lg:mb-8">
                Fragmentierte Systeme, manuelle Prozesse und Datenchaos kosten Schweizer Unternehmen täglich wertvolle
                Ressourcen.
              </p>
            </div>

            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0"></div>
                <span className="text-white/70 text-sm lg:text-base">73% der Arbeitszeit für manuelle Aufgaben</span>
              </div>
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0"></div>
                <span className="text-white/70 text-sm lg:text-base">41% Produktivitätsverlust durch Systembrüche</span>
              </div>
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                <span className="text-white/70 text-sm lg:text-base">
                  28% höhere Fehlerrate bei manuellen Prozessen
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}