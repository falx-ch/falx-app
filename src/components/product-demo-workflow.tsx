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
    gsap.set('.node-pill', { scale: 0, opacity: 0 })
    gsap.set('#cognitive-pill rect', { fill: '#9ca3af' }) // Toolbox starts grayed out
    gsap.set('#cognitive-pill .toolbox-text', { fill: 'rgba(156, 163, 175, 0.7)', opacity: 1 })
    gsap.set('#cognitive-pill .thinking-dot', { fill: 'rgba(156, 163, 175, 0.4)', opacity: 1 })
    gsap.set('.connection-path', { drawSVG: '0%' })
    gsap.set('.tool-indicator', { scale: 0, opacity: 0 })
    gsap.set('.pulse-dot', { scale: 0, opacity: 0 })
    gsap.set('.thinking-dot', { y: 0, opacity: 1 })
    
    // Create main timeline
    const tl = gsap.timeline({ 
      defaults: { duration: 0.6, ease: 'power2.out' },
      delay: 0.5
    })

    // Phase 1: Scene Setup - Legata-centric approach
    tl
      // Central Legata appears first
      .to('#legata-pill', { 
        scale: 1, 
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.2)'
      })
      
      // Connection line to cognitive toolbox only
      .to('#path-to-cognitive', { 
        drawSVG: '100%',
        duration: 0.6
      }, '+=0.2')
      
      // User and Toolbox appear
      .to('#user-pill', { 
        scale: 1, 
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.2)'
      }, '-=0.4')
      .to('#cognitive-pill', { 
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
      .to('#user-pill', {
        scale: 1.05,
        duration: 0.2
      }, '-=0.1')
      
      // 2. No signal - direct voice communication
      // User stops speaking
      .to('#user-voice-icon', { scale: 0, opacity: 0, duration: 0.2 }, '+=0.3')
      .to('#user-pill', { scale: 1, duration: 0.2 }, '-=0.1')
      
      // 3. Legata activates for processing
      .to('#legata-pill', {
        scale: 1.05,
        duration: 0.2
      }, '+=0.1')
      
      // 4. Legata sends signal to Toolbox along path
      .set('#pulse-dot-2', { 
        scale: 1, 
        opacity: 1,
        x: 480, // Legata right border
        y: 100
      }, '+=0.2')
      .to('#pulse-dot-2', {
        x: 560, // Toolbox left border
        duration: 0.5,
        ease: 'power1.inOut'
      })
      .to('#pulse-dot-2', {
        scale: 0,
        opacity: 0,
        duration: 0.1
      })
      
      // 5. Toolbox activates - becomes white and thinks
      .to('#cognitive-pill rect', {
        fill: 'white',
        duration: 0.3
      }, '-=0.1')
      .to('#cognitive-pill .toolbox-text', {
        fill: '#374151',
        duration: 0.3
      }, '-=0.3')
      .to('#cognitive-pill .thinking-dot', {
        fill: '#374151',
        duration: 0.3
      }, '-=0.3')
      .to('#cognitive-pill', {
        scale: 1.05,
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
      
      // 7. Show Swiss Law result
      .to('.thinking-dot', { y: 0, opacity: 0, duration: 0.2 })
      .set('#tool-result', { 
        textContent: '⚖️',
        scale: 1,
        opacity: 1
      })
      
      // 8. Send result back to Legata along path
      .set('#pulse-dot-3', { 
        scale: 1, 
        opacity: 1,
        x: 720, // Toolbox right border
        y: 100
      }, '+=0.5')
      .to('#pulse-dot-3', {
        x: 480, // Legata right border
        duration: 0.5,
        ease: 'power1.inOut'
      })
      .to('#pulse-dot-3', {
        scale: 0,
        opacity: 0,
        duration: 0.1
      })
      
      // 9. Toolbox goes back to idle (grayed out)
      .to('#tool-result', { scale: 0, opacity: 0, duration: 0.2 }, '-=0.3')
      .to('#cognitive-pill rect', {
        fill: '#9ca3af',
        duration: 0.3
      }, '-=0.2')
      .to('#cognitive-pill .toolbox-text', {
        fill: 'rgba(156, 163, 175, 0.7)',
        duration: 0.3
      }, '-=0.3')
      .to('#cognitive-pill .thinking-dot', {
        fill: 'rgba(156, 163, 175, 0.4)',
        opacity: 1,
        duration: 0.3
      }, '-=0.3')
      .to('#cognitive-pill', { scale: 1, duration: 0.2 }, '-=0.2')
      
      // 10. Legata responds with voice
      .to('#legata-voice-icon', {
        scale: 1,
        opacity: 1,
        duration: 0.3
      }, '-=0.1')
      
      // 11. Legata responds with voice - no signal needed
      .to('#legata-voice-icon', { scale: 0, opacity: 0, duration: 0.2 }, '+=0.5')
      .to('#legata-pill', { scale: 1, duration: 0.2 }, '-=0.1')

    // Phase 3: Second Conversation - Memory
    tl
      // Repeat similar flow for Memory tool
      .to('#user-voice-icon', { scale: 1, opacity: 1, duration: 0.3 }, '+=0.5')
      .to('#user-pill', { scale: 1.05, duration: 0.2 }, '-=0.1')
      
      // No signal for voice communication
      .to('#user-voice-icon', { scale: 0, opacity: 0, duration: 0.2 }, '+=0.3')
      .to('#user-pill', { scale: 1, duration: 0.2 }, '-=0.1')
      
      .to('#legata-pill', { scale: 1.05, duration: 0.2 }, '+=0.1')
      
      .set('#pulse-dot-6', { scale: 1, opacity: 1, x: 480, y: 100 }, '+=0.2')
      .to('#pulse-dot-6', { x: 560, duration: 0.5, ease: 'power1.inOut' })
      .to('#pulse-dot-6', { scale: 0, opacity: 0, duration: 0.1 })
      
      // Toolbox activates again
      .to('#cognitive-pill rect', { fill: 'white', duration: 0.3 }, '-=0.1')
      .to('#cognitive-pill .toolbox-text', { fill: '#374151', duration: 0.3 }, '-=0.3')
      .to('#cognitive-pill .thinking-dot', { fill: '#374151', duration: 0.3 }, '-=0.3')
      .to('#cognitive-pill', { scale: 1.05, duration: 0.2 }, '-=0.2')
      
      // Thinking for Memory
      .to('.thinking-dot', { opacity: 1, duration: 0.2 })
      .to('#dot-1', { y: -5, duration: 0.2 })
      .to('#dot-1', { y: 0, duration: 0.2 })
      .to('#dot-2', { y: -5, duration: 0.2 }, '-=0.3')
      .to('#dot-2', { y: 0, duration: 0.2 })
      .to('#dot-3', { y: -5, duration: 0.2 }, '-=0.3')
      .to('#dot-3', { y: 0, duration: 0.2 })
      
      .to('.thinking-dot', { opacity: 0, duration: 0.2 })
      .set('#tool-result', { textContent: '💾', scale: 1, opacity: 1 })
      
      // Result back to Legata
      .set('#pulse-dot-7', { scale: 1, opacity: 1, x: 720, y: 100 }, '+=0.5')
      .to('#pulse-dot-7', { x: 480, duration: 0.5, ease: 'power1.inOut' })
      .to('#pulse-dot-7', { scale: 0, opacity: 0, duration: 0.1 })
      
      // Toolbox back to idle
      .to('#tool-result', { scale: 0, opacity: 0, duration: 0.2 }, '-=0.3')
      .to('#cognitive-pill rect', { fill: '#9ca3af', duration: 0.3 }, '-=0.2')
      .to('#cognitive-pill .toolbox-text', { fill: 'rgba(156, 163, 175, 0.7)', duration: 0.3 }, '-=0.3')
      .to('#cognitive-pill .thinking-dot', { fill: 'rgba(156, 163, 175, 0.4)', opacity: 1, duration: 0.3 }, '-=0.3')
      .to('#cognitive-pill', { scale: 1, duration: 0.2 }, '-=0.2')
      
      .to('#legata-voice-icon', { scale: 1, opacity: 1, duration: 0.3 }, '-=0.1')
      
      // Legata responds with voice - no signal needed
      .to('#legata-voice-icon', { scale: 0, opacity: 0, duration: 0.2 }, '+=0.5')
      .to('#legata-pill', { scale: 1, duration: 0.2 }, '-=0.1')

    // Phase 4: Document Generation
    tl
      .to('#legata-pill', { scale: 1.1, duration: 0.4 }, '+=0.8')
      
      .to('#path-to-document', { drawSVG: '100%', duration: 0.8 })
      
      .to('#document-pill', {
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
      
      .to('#handwrite-pill, #notarize-pill', {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.2)'
      }, '-=0.3')
      .to('#legata-pill', { scale: 1, duration: 0.3 }, '-=0.5')

    timelineRef.current = tl

    return () => {
      if (timelineRef.current) timelineRef.current.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center">
      {/* Toolbox Legend */}
      <div className="absolute top-4 right-4 text-xs text-white/60 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2">
        <div className="font-medium text-white/80 mb-1">Toolbox</div>
        <div className="space-y-1">
          <div>⚖️ Swiss Law Database</div>
          <div>💾 Long-Term Memory</div>
        </div>
      </div>
      
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
        </defs>

        {/* Connection paths - Only to cognitive toolbox */}
        <path id="path-to-cognitive" className="connection-path" 
          d="M 480 100 L 560 100" 
          fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        
        <path id="path-to-document" className="connection-path" 
          d="M 400 140 L 400 200" 
          fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        
        <path id="path-to-split" className="connection-path" 
          d="M 400 250 L 400 280" 
          fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        
        <path id="path-to-handwrite" className="connection-path" 
          d="M 400 280 L 210 280 L 210 310" 
          fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        
        <path id="path-to-notarize" className="connection-path" 
          d="M 400 280 L 600 280 L 600 310" 
          fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

        {/* User Node */}
        <g id="user-pill" className="node-pill">
          <rect x="100" y="80" width="140" height="50" rx="8" 
            fill="white" filter="url(#shadow)" />
          <text x="170" y="109" className="text-sm font-medium fill-gray-800" textAnchor="middle">👤 User</text>
          <text id="user-voice-icon" x="230" y="75" className="text-sm tool-indicator">🔊</text>
        </g>

        {/* Legata Node (Center, more prominent) */}
        <g id="legata-pill" className="node-pill">
          <rect x="320" y="70" width="160" height="70" rx="10" 
            fill="white" filter="url(#shadow)" />
          <text x="400" y="109" className="text-base font-semibold fill-gray-800" textAnchor="middle">🧠 Legata</text>
          <text id="legata-voice-icon" x="330" y="75" className="text-sm tool-indicator">🔊</text>
        </g>

        {/* Toolbox Node - starts grayed out */}
        <g id="cognitive-pill" className="node-pill">
          <rect x="560" y="80" width="160" height="50" rx="8" 
            fill="#9ca3af" filter="url(#shadow)" />
          <text x="600" y="109" className="toolbox-text text-sm font-medium" fill="rgba(156, 163, 175, 0.7)">Toolbox</text>
          
          <circle id="dot-1" cx="680" cy="105" r="2" fill="rgba(156, 163, 175, 0.4)" className="thinking-dot" />
          <circle id="dot-2" cx="690" cy="105" r="2" fill="rgba(156, 163, 175, 0.4)" className="thinking-dot" />
          <circle id="dot-3" cx="700" cy="105" r="2" fill="rgba(156, 163, 175, 0.4)" className="thinking-dot" />
          
          <text id="tool-result" x="680" y="109" className="text-base tool-indicator"></text>
        </g>

        {/* Final Document Node */}
        <g id="document-pill" className="node-pill">
          <rect x="320" y="200" width="160" height="50" rx="8" 
            fill="white" filter="url(#shadow)" />
          <text x="400" y="229" className="text-sm font-medium fill-gray-800" textAnchor="middle">📝 Final Document</text>
        </g>

        {/* Handwrite & Sign Node */}
        <g id="handwrite-pill" className="node-pill">
          <rect x="120" y="310" width="180" height="50" rx="8" 
            fill="white" filter="url(#shadow)" />
          <text x="210" y="339" className="text-sm font-medium fill-gray-800" textAnchor="middle">✍️ Handwrite & Sign</text>
        </g>

        {/* Notarize & Deposit Node */}
        <g id="notarize-pill" className="node-pill">
          <rect x="500" y="310" width="200" height="50" rx="8" 
            fill="white" filter="url(#shadow)" />
          <text x="600" y="339" className="text-sm font-medium fill-gray-800" textAnchor="middle">🏛️ Notarize & Deposit</text>
        </g>

        {/* Pulse dots only for Legata-Toolbox communication */}
        <circle id="pulse-dot-2" cx="480" cy="100" r="4" fill="rgb(220, 38, 38)" className="pulse-dot" />
        <circle id="pulse-dot-3" cx="720" cy="100" r="4" fill="rgb(220, 38, 38)" className="pulse-dot" />
        <circle id="pulse-dot-6" cx="480" cy="100" r="4" fill="rgb(220, 38, 38)" className="pulse-dot" />
        <circle id="pulse-dot-7" cx="720" cy="100" r="4" fill="rgb(220, 38, 38)" className="pulse-dot" />
      </svg>
    </div>
  )
}