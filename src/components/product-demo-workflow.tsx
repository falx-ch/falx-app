"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { ANIMATION_CONFIGS } from '@/lib/gsap-manager'
import { WorkflowTool } from '@/components/ui/workflow-tool'
import { WorkflowStep } from '@/components/ui/workflow-step'

gsap.registerPlugin(DrawSVGPlugin)

export default function ProductDemoWorkflow() {
  const [animationStep, setAnimationStep] = useState(0)
  const [isInteractive, setIsInteractive] = useState(false)
  const [activeTools, setActiveTools] = useState<number[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [cardPositions, setCardPositions] = useState<{ x: number; y: number }[]>([])
  const svgRef = useRef<SVGSVGElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible || cardsRef.current.length === 0) return

    const updatePositions = () => {
      if (!containerRef.current || !svgRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const svgRect = svgRef.current.getBoundingClientRect()

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

  // Dynamic position calculation using tracked positions
  const getConnectionPath = (fromIndex: number, toIndex: number) => {
    if (cardPositions.length === 0 || !cardPositions[fromIndex] || !cardPositions[toIndex]) {
      return "M0,0 L0,0"
    }

    const fromPos = cardPositions[fromIndex]
    const toPos = cardPositions[toIndex]
    
    const fromX = fromPos.x
    const fromY = fromPos.y
    const toX = toPos.x
    const toY = toPos.y

    // Calculate edge connection points
    const dx = toX - fromX
    const dy = toY - fromY
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance < 1) return "M0,0 L0,0"
    
    const angle = Math.atan2(dy, dx)
    
    // Card dimensions in SVG coordinates (estimated)
    const cardWidth = 8
    const cardHeight = 6
    
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

  useEffect(() => {
    if (!isVisible || !svgRef.current) return

    // Initialize tools as hidden
    gsap.set(".dynamic-tool, .workflow-step", { scale: 0, opacity: 0 })

    // Create timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3, defaults: { ease: "power2.out" } })

    // Voice wave pulse animation
    tl.to(".voice-wave", {
      ...ANIMATION_CONFIGS.workflow.voiceWave.scale,
      scale: 1.2,
      opacity: 1,
      duration: 0.6
    })
      .to(".voice-wave", {
        ...ANIMATION_CONFIGS.workflow.voiceWave.pulse,
        scale: 1,
        opacity: 0.9,
        duration: 0.4
      })
      // AI Agent hub appearance
      .fromTo(".ai-agent-hub",
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.8,
          ease: "back.out(2)"
        }, "+=0.3")
      // Tool connections and tools appear simultaneously
      .add(() => setActiveTools([1, 2, 3, 4, 5]))
      .fromTo(".tool-connection", 
        { drawSVG: "0%" },
        { 
          drawSVG: "100%",
          duration: 0.8,
          ease: "power2.out"
        }, "+=0.2")
      .fromTo(".dynamic-tool", {
        scale: 0, 
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1
      }, "<")
      // Document generation flow
      .fromTo(".document-flow",
        { drawSVG: "0%" },
        { 
          drawSVG: "100%",
          duration: 1.2,
          ease: "power1.inOut"
        }, "+=0.5")
      // Final document appearance  
      .fromTo(".final-document",
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.8,
          ease: "back.out(1.5)"
        }, "-=0.6")
      // Choice flows
      .fromTo(".choice-flow-1, .choice-flow-2",
        { drawSVG: "0%" },
        { 
          drawSVG: "100%",
          duration: 1.0,
          stagger: 0.2,
          ease: "power2.out"
        }, "+=0.3")
      // Choice options
      .fromTo(".handwritten-option, .notary-option", {
        scale: 0,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        stagger: 0.2,
        duration: 0.6
      }, "-=0.6")

    timelineRef.current = tl

    return () => {
      if (timelineRef.current) timelineRef.current.kill()
    }
  }, [isVisible])

  const handleInteraction = (step: number) => {
    setIsInteractive(true)
    setAnimationStep(step)

    if (timelineRef.current) {
      timelineRef.current.pause()
    }

    setTimeout(() => {
      setIsInteractive(false)
      if (timelineRef.current) {
        timelineRef.current.resume()
      }
    }, 4000)
  }

  // Connection definitions (0-indexed to match workflowItems array)
  const connections = [
    { from: 0, to: 1 }, // Voice to AI Agent
    { from: 1, to: 2 }, // AI Agent to LLM
    { from: 1, to: 3 }, // AI Agent to Swiss Law
    { from: 1, to: 4 }, // AI Agent to Memory
    { from: 1, to: 5 }, // AI Agent to Legal Draft
    { from: 1, to: 6 }, // AI Agent to Voice Gen
    { from: 1, to: 7 }, // AI Agent to Document
    { from: 7, to: 8 }, // Document to Handwritten
    { from: 7, to: 9 }, // Document to Notary
  ]

  // Workflow items with grid positioning
  const workflowItems = [
    { key: 'voice', component: 'WorkflowStep', icon: "🎤", title: "Voice Input", subtitle: "DE | FR | IT | EN", size: "md", variant: "primary", className: "voice-wave", gridCol: "1 / span 2", gridRow: "6 / span 1" },
    { key: 'ai-agent', component: 'WorkflowStep', icon: "🤖", title: "AI Agent", subtitle: "Dynamic Tool Access", size: "lg", variant: "secondary", className: "ai-agent-hub", gridCol: "5 / span 2", gridRow: "5 / span 2" },
    { key: 'llm', component: 'WorkflowTool', icon: "🧠", title: "ETH LLM", subtitle: "OpenSource", color: "purple", className: "dynamic-tool", gridCol: "2 / span 2", gridRow: "1 / span 1" },
    { key: 'swiss-law', component: 'WorkflowTool', icon: "⚖️", title: "Swiss Law", subtitle: "RAG Database", color: "red", className: "dynamic-tool", gridCol: "4 / span 2", gridRow: "1 / span 1" },
    { key: 'memory', component: 'WorkflowTool', icon: "💾", title: "Long-Term", subtitle: "Memory", color: "emerald", className: "dynamic-tool", gridCol: "6 / span 2", gridRow: "1 / span 1" },
    { key: 'legal-draft', component: 'WorkflowTool', icon: "📝", title: "Legal Draft", subtitle: "Generator", color: "amber", className: "dynamic-tool", gridCol: "8 / span 2", gridRow: "1 / span 1" },
    { key: 'voice-gen', component: 'WorkflowTool', icon: "🔊", title: "Voice", subtitle: "Generator", color: "cyan", className: "dynamic-tool", gridCol: "10 / span 2", gridRow: "2 / span 1" },
    { key: 'document', component: 'WorkflowStep', icon: "📄", title: "Final Document", size: "md", variant: "success", className: "final-document", gridCol: "9 / span 2", gridRow: "5 / span 2" },
    { key: 'handwritten', component: 'WorkflowStep', icon: "✍️", title: "Handschriftlich", subtitle: "Selbst erstellen", size: "md", variant: "success", className: "handwritten-option", gridCol: "11 / span 2", gridRow: "3 / span 1" },
    { key: 'notary', component: 'WorkflowStep', icon: "🏛️", title: "Notar-Termin", subtitle: "Beglaubigung", size: "md", variant: "success", className: "notary-option", gridCol: "11 / span 2", gridRow: "7 / span 1" }
  ]

  return (
    <div ref={containerRef} className="relative w-full h-[400px]">
      {/* SVG overlay for connections */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="toolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
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
            className={index <= 1 ? "main-flow-line" : index <= 6 ? "tool-connection" : index === 7 ? "document-flow" : "choice-flow-" + (index - 7)}
            d={getConnectionPath(connection.from, connection.to)}
            fill="none"
            stroke={index <= 6 ? "url(#toolGradient)" : "url(#flowGradient)"}
            strokeWidth={index === 1 || index === 7 ? "1.2" : "0.8"}
            opacity="0.7"
            filter="url(#glow)"
            strokeLinecap="round"
            strokeDasharray={index > 7 ? "3,2" : "none"}
          />
        ))}
      </svg>

      {/* Workflow Cards - Grid Layout like problem showcase */}
      <div className="relative z-10 w-full h-full">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full gap-0">
          {workflowItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="cursor-pointer select-none transition-all duration-300 place-self-center pointer-events-auto"
              style={{
                gridColumn: item.gridCol,
                gridRow: item.gridRow,
              }}
              onClick={() => handleInteraction(index + 1)}
            >
              {item.component === 'WorkflowStep' ? (
                <WorkflowStep
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                  size={item.size as any}
                  variant={item.variant as any}
                  isActive={animationStep >= index + 1}
                  className={item.className}
                />
              ) : (
                <WorkflowTool
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                  color={item.color as any}
                  isActive={activeTools.includes(index - 1)}
                  className={item.className}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}