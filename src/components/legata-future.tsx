"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'

export default function LegataFuture() {
  const [animationStep, setAnimationStep] = useState(0)
  const [isInteractive, setIsInteractive] = useState(false)
  const [showSplitPath, setShowSplitPath] = useState(false)
  const [activeTools, setActiveTools] = useState<number[]>([])
  const svgRef = useRef<SVGSVGElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>()

  useEffect(() => {
    if (!svgRef.current) return

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 })

    tl.to(".voice-wave", {
      scale: 2,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    })
      .to(".voice-wave", {
        scale: 1,
        opacity: 0.8,
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(
        ".main-flow-line",
        {
          strokeDasharray: "800,0",
          duration: 2,
          ease: "power1.inOut",
        },
        "-=0.5",
      )
      .to(
        ".ai-agent-hub",
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(2)",
        },
        "-=1",
      )
      .to(
        ".tool-connection",
        {
          strokeDasharray: "200,0",
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          onStart: () => {
            setActiveTools([1, 2, 3, 4, 5])
          },
        },
        "-=0.5",
      )
      .to(
        ".dynamic-tool",
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "elastic.out(1.2, 0.3)",
        },
        "-=2",
      )
      .to(
        ".document-flow",
        {
          strokeDasharray: "400,0",
          duration: 1.5,
          ease: "power1.inOut",
        },
        "-=0.5",
      )
      .to(
        ".final-document",
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        "-=0.8",
      )
      .to(".split-path", {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => setShowSplitPath(true),
      })
      .to(".handwritten-option, .notary-option", {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: "back.out(1.5)",
      })

    timelineRef.current = tl

    return () => {
      tl.kill()
    }
  }, [])

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

  return (
    <section className="min-h-screen legata-gradient text-white relative overflow-hidden py-16 lg:py-24">
      {/* Soft neutral background with gentle depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(71,85,105,0.04),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(100,116,139,0.025),transparent_75%)]" />

      <div className="absolute top-0 left-0 right-0 h-1/2 flex items-center justify-center">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full h-full flex items-center justify-center">
          <svg
            ref={svgRef}
            className="w-full h-full"
          viewBox="0 0 1400 400"
          onClick={() => !isInteractive && handleInteraction(0)}
        >
          <defs>
            <linearGradient id="voiceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="25%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="75%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
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
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g onClick={() => handleInteraction(1)} className="cursor-pointer">
            <circle
              className="voice-wave"
              cx="120"
              cy="300"
              r="35"
              fill="url(#voiceGradient)"
              opacity="0.8"
              filter="url(#glow)"
            />
            <circle cx="120" cy="300" r="50" fill="none" stroke="url(#voiceGradient)" strokeWidth="2" opacity="0.5">
              <animate attributeName="r" values="50;70;50" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="120" y="360" textAnchor="middle" fill="white" fontSize="14" opacity="0.9" fontWeight="500">
              🎤 Voice Input
            </text>
            <text x="120" y="375" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">
              DE | FR | IT | EN
            </text>
          </g>

          <path
            className="main-flow-line"
            d="M155,300 Q300,300 450,200"
            stroke="url(#flowGradient)"
            strokeWidth="6"
            fill="none"
            strokeDasharray="0,800"
            filter="url(#glow)"
            strokeLinecap="round"
          />

          <g onClick={() => handleInteraction(2)} className="cursor-pointer">
            <circle
              className="ai-agent-hub"
              cx="450"
              cy="200"
              r="50"
              fill="#3b82f6"
              opacity="0"
              scale="0"
              filter="url(#glow)"
            />
            <circle cx="450" cy="200" r="65" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.3">
              <animate attributeName="r" values="65;75;65" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="450" y="150" textAnchor="middle" fill="white" fontSize="16" opacity="0.9" fontWeight="700">
              🤖 AI Agent
            </text>
            <text x="450" y="165" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="12">
              Dynamic Tool Access
            </text>
          </g>

          <g className="tool-connections">
            {/* ETH LLM */}
            <path
              className="tool-connection"
              d="M400,180 Q320,100 200,50"
              stroke="url(#toolGradient)"
              strokeWidth="6"
              fill="none"
              strokeDasharray="0,200"
              strokeLinecap="round"
              opacity="1"
            />
            <g onClick={() => handleInteraction(3)} className="cursor-pointer">
              <rect
                className="dynamic-tool"
                x="120"
                y="20"
                width="120"
                height="60"
                rx="15"
                fill="#8b5cf6"
                opacity="0"
                scale="0"
                filter="url(#glow)"
              />
              <text x="180" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                🧠 ETH LLM
              </text>
              <text x="180" y="60" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                (OpenSource)
              </text>
            </g>

            {/* Swiss Law RAG Database */}
            <path
              className="tool-connection"
              d="M430,150 Q400,80 350,50"
              stroke="url(#toolGradient)"
              strokeWidth="6"
              fill="none"
              strokeDasharray="0,200"
              strokeLinecap="round"
              opacity="1"
            />
            <g onClick={() => handleInteraction(4)} className="cursor-pointer">
              <rect
                className="dynamic-tool"
                x="270"
                y="20"
                width="120"
                height="60"
                rx="15"
                fill="#dc2626"
                opacity="0"
                scale="0"
                filter="url(#glow)"
              />
              <text x="330" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                ⚖️ Swiss Law
              </text>
              <text x="330" y="60" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                RAG Database
              </text>
            </g>

            {/* Long-Term Memory */}
            <path
              className="tool-connection"
              d="M450,150 Q450,80 450,50"
              stroke="url(#toolGradient)"
              strokeWidth="6"
              fill="none"
              strokeDasharray="0,200"
              strokeLinecap="round"
              opacity="1"
            />
            <g onClick={() => handleInteraction(5)} className="cursor-pointer">
              <rect
                className="dynamic-tool"
                x="390"
                y="20"
                width="120"
                height="60"
                rx="15"
                fill="#059669"
                opacity="0"
                scale="0"
                filter="url(#glow)"
              />
              <text x="450" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                💾 Long-Term
              </text>
              <text x="450" y="60" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                Memory
              </text>
            </g>

            {/* Legal Draft Generator */}
            <path
              className="tool-connection"
              d="M470,150 Q500,80 550,50"
              stroke="url(#toolGradient)"
              strokeWidth="6"
              fill="none"
              strokeDasharray="0,200"
              strokeLinecap="round"
              opacity="1"
            />
            <g onClick={() => handleInteraction(6)} className="cursor-pointer">
              <rect
                className="dynamic-tool"
                x="490"
                y="20"
                width="120"
                height="60"
                rx="15"
                fill="#f59e0b"
                opacity="0"
                scale="0"
                filter="url(#glow)"
              />
              <text x="550" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                📝 Legal Draft
              </text>
              <text x="550" y="60" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                Generator
              </text>
            </g>

            {/* Voice Generator */}
            <path
              className="tool-connection"
              d="M500,180 Q580,100 700,50"
              stroke="url(#toolGradient)"
              strokeWidth="6"
              fill="none"
              strokeDasharray="0,200"
              strokeLinecap="round"
              opacity="1"
            />
            <g onClick={() => handleInteraction(7)} className="cursor-pointer">
              <rect
                className="dynamic-tool"
                x="640"
                y="20"
                width="120"
                height="60"
                rx="15"
                fill="#06b6d4"
                opacity="0"
                scale="0"
                filter="url(#glow)"
              />
              <text x="700" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                🔊 Voice
              </text>
              <text x="700" y="60" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
                Generator
              </text>
            </g>
          </g>

          <path
            className="document-flow"
            d="M500,200 Q650,200 800,200"
            stroke="url(#flowGradient)"
            strokeWidth="6"
            fill="none"
            strokeDasharray="0,400"
            filter="url(#glow)"
            strokeLinecap="round"
          />

          <path
            className="memory-to-agent"
            d="M450,80 L450,150"
            stroke="#059669"
            strokeWidth="6"
            fill="none"
            strokeDasharray="70,0"
            strokeLinecap="round"
            opacity="0.9"
            filter="url(#glow)"
          />

          <g onClick={() => handleInteraction(8)} className="cursor-pointer">
            <rect
              className="final-document"
              x="770"
              y="170"
              width="80"
              height="60"
              rx="15"
              fill="url(#voiceGradient)"
              opacity="0"
              scale="0"
              filter="url(#glow)"
            />
            <text x="810" y="195" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">
              📄 Final
            </text>
            <text x="810" y="210" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">
              Document
            </text>
          </g>

          <g className="split-path" opacity="0">
            <path
              d="M850,180 Q950,140 1050,100"
              stroke="url(#flowGradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M850,220 Q950,260 1050,300"
              stroke="url(#flowGradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>

          <g onClick={() => handleInteraction(9)} className="cursor-pointer">
            <rect
              className="handwritten-option"
              x="1020"
              y="70"
              width="90"
              height="60"
              rx="15"
              fill="#10b981"
              opacity="0"
              scale="0"
              filter="url(#glow)"
            />
            <text x="1065" y="95" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
              ✍️ Handwritten
            </text>
            <text x="1065" y="110" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
              Will
            </text>
          </g>

          <g onClick={() => handleInteraction(10)} className="cursor-pointer">
            <rect
              className="notary-option"
              x="1020"
              y="270"
              width="90"
              height="60"
              rx="15"
              fill="#f59e0b"
              opacity="0"
              scale="0"
              filter="url(#glow)"
            />
            <text x="1065" y="295" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
              🏛️ Trusted
            </text>
            <text x="1065" y="310" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">
              Notary
            </text>
          </g>

          {isInteractive && (
            <g className="detail-expansion">
              <rect
                x="500"
                y="220"
                width="400"
                height="160"
                rx="20"
                fill="rgba(0,0,0,0.9)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                filter="url(#glow)"
              />
              <text x="700" y="260" textAnchor="middle" fill="white" fontSize="18" fontWeight="700">
                {animationStep === 1 && "🎤 Multi-Language Voice Input"}
                {animationStep === 2 && "🤖 Central AI Agent Hub"}
                {animationStep === 3 && "🧠 ETH LLM (OpenSource)"}
                {animationStep === 4 && "⚖️ Swiss Law RAG Database"}
                {animationStep === 5 && "💾 Long-Term Memory"}
                {animationStep === 6 && "📝 Legal Draft Generator"}
                {animationStep === 7 && "🔊 Voice Generator"}
                {animationStep === 8 && "📄 Final Document Creation"}
                {animationStep === 9 && "✍️ Handwritten Will Path"}
                {animationStep === 10 && "🏛️ Notary Connection Service"}
              </text>
              <text x="700" y="290" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="13" fontWeight="500">
                {animationStep === 1 && "Natural speech in German, French, Italian, or English"}
                {animationStep === 2 && "Orchestrates dynamic access to specialized legal tools"}
                {animationStep === 3 && "Open-source language model from ETH Zurich for Swiss legal understanding"}
                {animationStep === 4 && "Comprehensive database of Swiss inheritance laws and regulations"}
                {animationStep === 5 && "Persistent memory for user context and family situation"}
                {animationStep === 6 && "Creates legally compliant drafts in proper Swiss legal language"}
                {animationStep === 7 && "Natural voice synthesis for audio document review"}
                {animationStep === 8 && "Generates final document with quality assurance"}
                {animationStep === 9 && "Traditional handwritten will format option"}
                {animationStep === 10 && "Connect with vetted Swiss notary network"}
              </text>
              <text x="700" y="330" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">
                {animationStep === 1 && "Advanced speech recognition with Swiss dialect support"}
                {animationStep === 2 && "Intelligent tool selection based on user needs and context"}
                {animationStep === 3 && "Specialized in Swiss legal terminology and cantonal variations"}
                {animationStep === 4 && "Real-time updates with federal and cantonal law changes"}
                {animationStep === 5 && "Secure, encrypted storage of personal and family information"}
                {animationStep === 6 && "Professional formatting with legal precision and compliance"}
                {animationStep === 7 && "Multi-language audio output for document verification"}
                {animationStep === 8 && "Multi-layer validation and error checking"}
                {animationStep === 9 && "Maintains full legal validity of handwritten documents"}
                {animationStep === 10 && "Certified professionals with Swiss legal expertise"}
              </text>
            </g>
          )}
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-16 lg:pb-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex justify-center">
          <GlassCard variant="modal" intensity="strong" size="xl">
          <h2 className="text-3xl font-light mb-4 tracking-tight">
            <span className="font-serif italic text-blue-300">Legata:</span> Swiss Legal Innovation
          </h2>
          <p className="text-white/70 text-base mb-6 leading-relaxed">
            Voice-first AI that understands Swiss inheritance law, creating legally compliant wills with empathy and
            precision.
          </p>
          <Button variant="ghost" className="text-white/90 text-base hover:text-white transition-all duration-300 border-b-2 border-white/20 hover:border-white/60 pb-1 p-0 h-auto">
            Experience Legata →
          </Button>
          </GlassCard>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8">
        <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-white/40 transition-colors duration-200">
          <span className="text-white/60 text-lg">↓</span>
        </div>
      </div>
    </section>
  )
}