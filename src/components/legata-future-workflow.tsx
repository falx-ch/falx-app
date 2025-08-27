"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"

export default function LegataFutureWorkflow() {
  const [animationStep, setAnimationStep] = useState(0)
  const [isInteractive, setIsInteractive] = useState(false)
  const [showSplitPath, setShowSplitPath] = useState(false)
  const [activeTools, setActiveTools] = useState<number[]>([])
  const svgRef = useRef<SVGSVGElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

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
        </svg>
      </div>
    </div>
  )
}