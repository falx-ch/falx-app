"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ReportSection() {
  const [sliderValue, setSliderValue] = useState([50])
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  
  // Calculate CHF savings based on slider value (simplified calculation)
  const calculateSavings = (value: number) => {
    const baseSavings = 73800
    const multiplier = value / 50 // 50 is the middle value
    return Math.round(baseSavings * multiplier)
  }

  const savings = calculateSavings(sliderValue[0])

  // Smooth number morphing animation
  useEffect(() => {
    if (numberRef.current) {
      // Use a more controlled animation
      const obj = { value: 0 }
      const currentText = numberRef.current.textContent
      const currentNumber = parseInt(currentText?.replace(/[^0-9]/g, '') || '0')
      
      obj.value = currentNumber
      
      gsap.to(obj, {
        value: savings,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: function() {
          const currentValue = Math.round(obj.value)
          if (numberRef.current) {
            numberRef.current.textContent = `CHF ${currentValue.toLocaleString('de-CH')}`
          }
        }
      })
    }
  }, [savings])

  // Setup animations on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Simple setup without complex context
    // Initially hide cards with CSS class instead of GSAP
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean)
    
    // Magnetic slider setup
    let cleanupSlider = () => {}
    if (sliderRef.current) {
      const sliderElement = sliderRef.current
      
      const magneticHover = () => {
        gsap.to(sliderElement, {
          scale: 1.01,
          duration: 0.2,
          ease: "power1.out"
        })
      }
      
      const magneticLeave = () => {
        gsap.to(sliderElement, {
          scale: 1,
          duration: 0.3,
          ease: "power1.out"
        })
      }

      sliderElement.addEventListener('mouseenter', magneticHover)
      sliderElement.addEventListener('mouseleave', magneticLeave)
      
      cleanupSlider = () => {
        sliderElement.removeEventListener('mouseenter', magneticHover)
        sliderElement.removeEventListener('mouseleave', magneticLeave)
      }
    }

    // Card reveal with ScrollTrigger - simplified
    let scrollTriggerInstance = null
    if (cardsRef.current && cards.length > 0) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(cards, 
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out"
            }
          )
        }
      })
    }

    return () => {
      cleanupSlider()
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill()
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center px-8 py-16 text-white relative"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(51, 65, 85, 0.85) 100%)'
      }}
    >
      {/* Main Heading */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl text-center mb-16 max-w-4xl font-light text-white leading-tight">
        Was kostet Sie Ineffizienz wirklich?
      </h2>

      {/* Dynamic CHF Display with morphing animation */}
      <div className="text-center mb-12">
        <div 
          ref={numberRef}
          className="text-7xl md:text-8xl lg:text-9xl font-light mb-4 text-white font-mono tabular-nums"
          style={{
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            minHeight: '1.2em' // Prevent layout shift
          }}
        >
          CHF {savings.toLocaleString('de-CH')}
        </div>
        <p className="text-xl md:text-2xl text-gray-300">
          Potenzielle KI-Ersparnis/Jahr
        </p>
      </div>

      {/* Enhanced Interactive Slider with magnetic effects */}
      <div 
        ref={sliderRef}
        className="w-full max-w-3xl mb-20 px-4"
        style={{
          cursor: 'pointer'
        }}
      >
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          min={10}
          max={100}
          step={1}
          className="w-full h-2 transition-all duration-300"
        />
      </div>

      {/* Data Cards with Swiss precision grid */}
      <div 
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl w-full"
      >
        <Card 
          ref={card1Ref}
          className="text-center border-none shadow-none bg-transparent hover:bg-white/5 transition-all duration-300 rounded-2xl p-2 opacity-0"
          style={{ transform: 'translateY(30px)' }}
        >
          <CardContent className="p-8">
            <div className="text-5xl md:text-6xl font-light mb-4 text-white">54.5h</div>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">Monatlicher Zeitverlust</p>
          </CardContent>
        </Card>
        
        <Card 
          ref={card2Ref}
          className="text-center border-none shadow-none bg-transparent hover:bg-white/5 transition-all duration-300 rounded-2xl p-2 opacity-0"
          style={{ transform: 'translateY(30px)' }}
        >
          <CardContent className="p-8">
            <div className="text-5xl md:text-6xl font-light mb-4 text-white">56%</div>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">Unternehmen teilen Daten unsicher</p>
          </CardContent>
        </Card>
        
        <Card 
          ref={card3Ref}
          className="text-center border-none shadow-none bg-transparent hover:bg-white/5 transition-all duration-300 rounded-2xl p-2 opacity-0"
          style={{ transform: 'translateY(30px)' }}
        >
          <CardContent className="p-8">
            <div className="text-5xl md:text-6xl font-light mb-4 text-white">CHF 9 Mia.</div>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">Jährlicher Verlust in der Schweiz</p>
          </CardContent>
        </Card>
      </div>

      {/* Scroll indicator with subtle animation */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="text-2xl text-white/70">↓</div>
      </div>
    </section>
  )
}