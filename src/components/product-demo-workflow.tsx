"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin)

export default function ProductDemoWorkflow() {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Set initial states
    gsap.set('.workflow-node', { scale: 0, opacity: 0 })
    gsap.set('#toolbox-node rect', { fill: '#9ca3af' }) // Toolbox starts grayed out
    gsap.set('#toolbox-node .thinking-dot', { fill: 'rgba(156, 163, 175, 0.4)', opacity: 1 })
    gsap.set('.connection-path', { drawSVG: '0%' })
    gsap.set('.tool-indicator', { scale: 0, opacity: 0 })
    gsap.set('#legata-toolbox-glow', { opacity: 0, drawSVG: "0% 0%" })
    gsap.set('.thinking-dot', { y: 0, opacity: 1 })
    
    // Create main timeline
    const tl = gsap.timeline({ 
      defaults: { duration: 0.6, ease: 'power2.out' },
      delay: 0.5
    })

    // Phase 1: Scene Setup - Legata-centric approach
    tl
      // Central Legata appears first
      .to('#legata-node', { 
        scale: 1, 
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.2)'
      })
      
      // Draw connection line to toolbox
      .to('#legata-toolbox-line', { 
        drawSVG: '100%',
        duration: 0.6
      }, '+=0.2')
      
      // User and Toolbox appear
      .to('#user-node', { 
        scale: 1, 
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.2)'
      }, '-=0.4')
      .to('#toolbox-node', { 
        scale: 1, 
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.2)'
      }, '-=0.3')

    // Phase 2: First Conversation - Swiss Law
    tl
      // 1. User speaks
      .to('#user-voice-icon', {
        scale: 1,
        opacity: 1,
        duration: 0.3
      }, '+=0.8')
      .to('#user-node', {
        scale: 1.01,
        duration: 0.2
      }, '-=0.1')
      
      // 2. No signal - direct voice communication
      // User stops speaking
      .to('#user-voice-icon', { scale: 0, opacity: 0, duration: 0.2 }, '+=0.3')
      .to('#user-node', { scale: 1, duration: 0.2 }, '-=0.1')
      
      // 3. Legata activates for processing - very subtle scale
      .to('#legata-node', {
        scale: 1.01,
        duration: 0.2
      }, '+=0.1')
      
      // 4. Legata sends signal to Toolbox - glow left to right
      .to('#legata-node', { scale: 1, duration: 0.2 }, '+=0.2') // Legata returns to normal
      .to('#legata-toolbox-glow', {
        opacity: 1,
        drawSVG: "0% 10%", // Start with small segment at beginning
        duration: 0.1
      }, '-=0.1')
      .to('#legata-toolbox-glow', {
        drawSVG: "90% 100%", // Move segment to end and merge into toolbox
        duration: 0.8,
        ease: 'power2.out'
      })
      .to('#legata-toolbox-glow', {
        opacity: 0,
        duration: 0.2
      })
      
      // 5. Toolbox activates - becomes white and thinks
      .to('#toolbox-node rect', {
        fill: 'white',
        duration: 0.3
      }, '-=0.1')
      .to('#toolbox-node .thinking-dot', {
        fill: '#374151',
        duration: 0.3
      }, '-=0.3')
      .to('#toolbox-node', {
        scale: 1.01,
        duration: 0.2
      }, '-=0.2')
      
      // 6. Thinking animation
      .to('.thinking-dot', {
        opacity: 1,
        duration: 0.2
      })
      .to('#dot-1', { y: -5, duration: 0.2 })
      .to('#dot-1', { y: 0, duration: 0.2 })
      .to('#dot-2', { y: -5, duration: 0.2 }, '-=0.3')
      .to('#dot-2', { y: 0, duration: 0.2 })
      .to('#dot-3', { y: -5, duration: 0.2 }, '-=0.3')
      .to('#dot-3', { y: 0, duration: 0.2 })
      
      // 7. Show Memory result (first query)
      .to('.thinking-dot', { y: 0, opacity: 0, duration: 0.2 })
      .set('#tool-result', { 
        textContent: '💾 Memory',
        scale: 1,
        opacity: 1
      })
      
      // 8. Send result back to Legata - glow right to left
      .to('#legata-toolbox-glow', {
        opacity: 1,
        drawSVG: "90% 100%", // Start with small segment at end
        duration: 0.1
      }, '+=0.5')
      .to('#legata-toolbox-glow', {
        drawSVG: "0% 10%", // Move segment to beginning and merge into legata
        duration: 0.8,
        ease: 'power2.out'
      })
      .to('#legata-toolbox-glow', {
        opacity: 0,
        duration: 0.2
      })
      .to('#legata-node', { scale: 1.01, duration: 0.2 }, '-=0.4') // Legata activates when receiving result
      
      // 9. Toolbox goes back to idle (grayed out)
      .to('#tool-result', { scale: 0, opacity: 0, duration: 0.2 }, '-=0.3')
      .to('#toolbox-node rect', {
        fill: '#9ca3af',
        duration: 0.3
      }, '-=0.2')
      .to('#toolbox-node .toolbox-text', {
        fill: 'rgba(156, 163, 175, 0.7)',
        duration: 0.3
      }, '-=0.3')
      .to('#toolbox-node .thinking-dot', {
        fill: 'rgba(156, 163, 175, 0.4)',
        opacity: 1,
        duration: 0.3
      }, '-=0.3')
      .to('#toolbox-node', { scale: 1, duration: 0.2 }, '-=0.2')
      
      // 10. Legata responds with voice
      .to('#legata-voice-icon', {
        scale: 1,
        opacity: 1,
        duration: 0.3
      }, '-=0.1')
      
      // 11. Legata responds with voice - no signal needed
      .to('#legata-voice-icon', { scale: 0, opacity: 0, duration: 0.2 }, '+=0.5')
      .to('#legata-node', { scale: 1, duration: 0.2 }, '-=0.1')

    // Phase 3: Second Conversation - Swiss Law
    tl
      // Repeat similar flow for Swiss Law tool
      .to('#user-voice-icon', { scale: 1, opacity: 1, duration: 0.3 }, '+=0.5')
      .to('#user-node', { scale: 1.01, duration: 0.2 }, '-=0.1')
      
      // No signal for voice communication
      .to('#user-voice-icon', { scale: 0, opacity: 0, duration: 0.2 }, '+=0.3')
      .to('#user-node', { scale: 1, duration: 0.2 }, '-=0.1')
      
      .to('#legata-node', { scale: 1.01, duration: 0.2 }, '+=0.1')
      
      // Second signal: Legata to Toolbox - glow left to right
      .to('#legata-node', { scale: 1, duration: 0.2 }, '+=0.2') // Legata returns to normal
      .to('#legata-toolbox-glow', {
        opacity: 1,
        drawSVG: "0% 10%", // Start with small segment at beginning
        duration: 0.1
      }, '-=0.1')
      .to('#legata-toolbox-glow', {
        drawSVG: "90% 100%", // Move segment to end and merge into toolbox
        duration: 0.8,
        ease: 'power2.out'
      })
      .to('#legata-toolbox-glow', {
        opacity: 0,
        duration: 0.2
      })
      
      // Toolbox activates again
      .to('#toolbox-node rect', { fill: 'white', duration: 0.3 }, '-=0.1')
      .to('#toolbox-node .toolbox-text', { fill: '#374151', duration: 0.3 }, '-=0.3')
      .to('#toolbox-node .thinking-dot', { fill: '#374151', duration: 0.3 }, '-=0.3')
      .to('#toolbox-node', { scale: 1.01, duration: 0.2 }, '-=0.2')
      
      // Thinking for Swiss Law
      .to('.thinking-dot', { opacity: 1, duration: 0.2 })
      .to('#dot-1', { y: -5, duration: 0.2 })
      .to('#dot-1', { y: 0, duration: 0.2 })
      .to('#dot-2', { y: -5, duration: 0.2 }, '-=0.3')
      .to('#dot-2', { y: 0, duration: 0.2 })
      .to('#dot-3', { y: -5, duration: 0.2 }, '-=0.3')
      .to('#dot-3', { y: 0, duration: 0.2 })
      
      .to('.thinking-dot', { opacity: 0, duration: 0.2 })
      .set('#tool-result', { textContent: '⚖️ Swiss Law DB', scale: 1, opacity: 1 })
      
      // Second result back to Legata - glow right to left
      .to('#legata-toolbox-glow', {
        opacity: 1,
        drawSVG: "90% 100%", // Start with small segment at end
        duration: 0.1
      }, '+=0.5')
      .to('#legata-toolbox-glow', {
        drawSVG: "0% 10%", // Move segment to beginning and merge into legata
        duration: 0.8,
        ease: 'power2.out'
      })
      .to('#legata-toolbox-glow', {
        opacity: 0,
        drawSVG: "0% 0%", // Reset
        duration: 0.2
      })
      .to('#legata-node', { scale: 1.01, duration: 0.2 }, '-=0.4') // Legata activates when receiving result
      
      // Toolbox back to idle
      .to('#tool-result', { scale: 0, opacity: 0, duration: 0.2 }, '-=0.3')
      .to('#toolbox-node rect', { fill: '#9ca3af', duration: 0.3 }, '-=0.2')
      .to('#toolbox-node .thinking-dot', { fill: 'rgba(156, 163, 175, 0.4)', opacity: 1, duration: 0.3 }, '-=0.3')
      .to('#toolbox-node', { scale: 1, duration: 0.2 }, '-=0.2')
      
      .to('#legata-voice-icon', { scale: 1, opacity: 1, duration: 0.3 }, '-=0.1')
      
      // Legata responds with voice - no signal needed
      .to('#legata-voice-icon', { scale: 0, opacity: 0, duration: 0.2 }, '+=0.5')
      .to('#legata-node', { scale: 1, duration: 0.2 }, '-=0.1')

    // Phase 4: Document Generation
    tl
      .to('#legata-node', { scale: 1.02, duration: 0.4 }, '+=0.8')
      
      .to('#path-to-document', { drawSVG: '100%', duration: 0.8 })
      
      .to('#document-node', {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.2)'
      }, '-=0.3')
      
      .to('#path-to-handwrite, #path-to-notarize', {
        drawSVG: '100%',
        duration: 0.6,
        stagger: 0.15
      }, '+=0.3')
      
      .to('#handwrite-node, #notarize-node', {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.2)'
      }, '-=0.3')
      .to('#legata-node', { scale: 1, duration: 0.3 }, '-=0.5')

    timelineRef.current = tl

    return () => {
      if (timelineRef.current) timelineRef.current.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center">
      
      {/* Clean SVG Layout */}
      <svg 
        viewBox="0 0 800 400" 
        className="w-full max-w-4xl"
        style={{ maxHeight: '380px' }}
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
          </filter>
          <linearGradient id="signal-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Connection paths */}
        
        {/* Legata to Toolbox communication line */}
        <path id="legata-toolbox-line" className="connection-path" 
          d="M 480 105 L 560 105" 
          fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
        <path id="legata-toolbox-glow" 
          d="M 480 105 L 560 105" 
          fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="6" 
          strokeLinecap="round"
          opacity="0" />
        
        <path id="path-to-document" className="connection-path" 
          d="M 400 140 L 400 200" 
          fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
        
        <path id="path-to-handwrite" className="connection-path" 
          d="M 320 225 L 210 225 L 210 310" 
          fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
        
        <path id="path-to-notarize" className="connection-path" 
          d="M 480 225 L 600 225 L 600 310" 
          fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />

        {/* User Node */}
        <g id="user-node" className="workflow-node">
          <rect x="100" y="80" width="140" height="50" rx="8" 
            fill="white" filter="url(#shadow)" />
          <text x="170" y="109" className="text-base font-semibold fill-gray-800" textAnchor="middle">👤 User</text>
          <text id="user-voice-icon" x="230" y="75" className="text-base tool-indicator">💬</text>
        </g>

        {/* Legata Node (Center, more prominent) */}
        <g id="legata-node" className="workflow-node">
          <rect x="320" y="70" width="160" height="70" rx="10" 
            fill="white" filter="url(#shadow)" />
          <text x="400" y="109" className="text-base font-semibold fill-gray-800" textAnchor="middle">🤖 Legata</text>
          <text id="legata-voice-icon" x="303" y="68" className="text-base tool-indicator">💬</text>
        </g>

        {/* Toolbox Node - starts grayed out */}
        <g id="toolbox-node" className="workflow-node">
          <rect x="560" y="80" width="160" height="50" rx="8" 
            fill="#9ca3af" filter="url(#shadow)" />
          
          {/* Centered thinking dots */}
          <circle id="dot-1" cx="630" cy="105" r="2" fill="rgba(156, 163, 175, 0.4)" className="thinking-dot" />
          <circle id="dot-2" cx="640" cy="105" r="2" fill="rgba(156, 163, 175, 0.4)" className="thinking-dot" />
          <circle id="dot-3" cx="650" cy="105" r="2" fill="rgba(156, 163, 175, 0.4)" className="thinking-dot" />
          
          {/* Tool result with text - centered like other nodes */}
          <text id="tool-result" x="640" y="109" className="text-base font-semibold fill-gray-800" textAnchor="middle"></text>
        </g>

        {/* Final Document Node */}
        <g id="document-node" className="workflow-node">
          <rect x="320" y="200" width="160" height="50" rx="8" 
            fill="white" filter="url(#shadow)" />
          <text x="400" y="229" className="text-base font-semibold fill-gray-800" textAnchor="middle">📝 Final Document</text>
        </g>

        {/* Handwrite & Sign Node */}
        <g id="handwrite-node" className="workflow-node">
          <rect x="120" y="310" width="180" height="50" rx="8" 
            fill="white" filter="url(#shadow)" />
          <text x="210" y="339" className="text-base font-semibold fill-gray-800" textAnchor="middle">✍️ Handwrite & Sign</text>
        </g>

        {/* Notarize & Deposit Node */}
        <g id="notarize-node" className="workflow-node">
          <rect x="500" y="310" width="200" height="50" rx="8" 
            fill="white" filter="url(#shadow)" />
          <text x="600" y="339" className="text-base font-semibold fill-gray-800" textAnchor="middle">🏛️ Notarize & Deposit</text>
        </g>

      </svg>
    </div>
  )
}