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
  const [sliderValue, setSliderValue] = useState([10])
  const sectionRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const mainNumberRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  
  // Calculate yearly cost per employee based on weekly administrative hours
  const calculateYearlyCost = (weeklyHours: number) => {
    const hourlyRate = 150 // CHF 150 per hour consultant rate
    const yearlyHours = weeklyHours * 52 // 52 weeks per year
    const yearlyCostPerEmployee = yearlyHours * hourlyRate
    return Math.round(yearlyCostPerEmployee)
  }
  
  const weeklyHoursWasted = sliderValue[0]
  const displayHours = Math.round(weeklyHoursWasted) // Round to whole numbers for display
  const yearlyCostPerEmployee = calculateYearlyCost(weeklyHoursWasted)


  // Smart directional number animation (rolling numbers only, no FLIP)
  useEffect(() => {
    if (mainNumberRef.current) {
      const obj = { value: 0 }
      const currentText = mainNumberRef.current.textContent
      const currentNumber = parseInt(currentText?.replace(/[^0-9]/g, '') || '0')
      
      obj.value = currentNumber
      
      // Determine if we're increasing or decreasing
      const isIncreasing = yearlyCostPerEmployee > currentNumber
      
      // Rolling number animation
      gsap.to(obj, {
        value: yearlyCostPerEmployee,
        duration: isIncreasing ? 0.8 : 0.3, // Fast decrease, smooth increase
        ease: isIncreasing ? "power2.out" : "power3.out",
        onUpdate: function() {
          const currentValue = Math.round(obj.value)
          if (mainNumberRef.current) {
            mainNumberRef.current.textContent = `CHF ${currentValue.toLocaleString('de-CH')}`
          }
        }
      })
    }
  }, [yearlyCostPerEmployee])

  // Setup animations on mount with proper GSAP context
  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean)
    
    // Progressive Value Reveal: ScrollTrigger-based initial slider animation
    if (sliderRef.current && sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          // Start from 1 and animate to default value smoothly
          setSliderValue([1]) // Set initial value immediately
          
          // Animate the slider value with smooth decimal precision
          const obj = { value: 1 }
          gsap.to(obj, {
            value: 10, // Animate to default value
            duration: 2.5, // Slower, more elegant animation
            ease: "power3.out",
            delay: 0.5,
            onUpdate: function() {
              // Use precise decimal value for smooth animation, round for display only
              setSliderValue([obj.value])
            }
          })
        }
      })
    }
    
    // Swiss-precision slider micro-interactions
    if (sliderRef.current) {
      const sliderElement = sliderRef.current
      const thumbs = sliderElement.querySelectorAll('[data-slot="slider-thumb"]')
      const ranges = sliderElement.querySelectorAll('[data-slot="slider-range"]')
      
      thumbs.forEach(thumb => {
        gsap.set(thumb, { transformOrigin: "center" })
        
        const sophisticatedHover = () => {
          gsap.to(thumb, {
            scale: 1.08,
            duration: 0.6,
            ease: "power3.out"
          })
          
          // Subtle range glow enhancement
          ranges.forEach(range => {
            gsap.to(range, {
              boxShadow: "0 0 12px rgba(220, 38, 38, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
              duration: 0.4,
              ease: "power2.out"
            })
          })
        }
        
        const sophisticatedLeave = () => {
          gsap.to(thumb, {
            scale: 1,
            duration: 0.5,
            ease: "power3.out"
          })
          
          ranges.forEach(range => {
            gsap.to(range, {
              boxShadow: "0 0 8px rgba(220, 38, 38, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              duration: 0.3,
              ease: "power2.out"
            })
          })
        }

        const preciseDrag = () => {
          gsap.to(thumb, {
            scale: 0.95,
            duration: 0.15,
            ease: "power2.out"
          })
        }

        const dragRelease = () => {
          gsap.to(thumb, {
            scale: 1.08,
            duration: 0.4,
            ease: "back.out(1.2)"
          })
        }

        thumb.addEventListener('mouseenter', sophisticatedHover)
        thumb.addEventListener('mouseleave', sophisticatedLeave)
        thumb.addEventListener('mousedown', preciseDrag)
        thumb.addEventListener('mouseup', dragRelease)
      })
    }

    // Advanced 3D card tilt effects and reveal
    if (cardsRef.current && cards.length > 0) {
      // Initial reveal animation
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(cards, 
            { y: 50, opacity: 0, rotationX: -15 },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              duration: 1,
              stagger: 0.2,
              ease: "power3.out"
            }
          )
        }
      })
      
      // 3D tilt effects for each card
      cards.forEach((card, index) => {
        if (!card) return
        
        gsap.set(card, { 
          transformOrigin: "center",
          transformStyle: "preserve-3d"
        })
        
        const cardContent = card.querySelector('.card-content') || card.firstElementChild
        if (cardContent) {
          gsap.set(cardContent, { transformOrigin: "center" })
        }
        
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const rotateX = (e.clientY - centerY) / 10
          const rotateY = (centerX - e.clientX) / 10
          
          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            z: 30,
            duration: 0.4,
            ease: "power2.out"
          })
          
          if (cardContent) {
            gsap.to(cardContent, {
              x: (e.clientX - centerX) / 20,
              y: (e.clientY - centerY) / 20,
              duration: 0.4,
              ease: "power2.out"
            })
          }
        }
        
        const handleMouseLeave = () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            z: 0,
            duration: 0.6,
            ease: "power3.out"
          })
          
          if (cardContent) {
            gsap.to(cardContent, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "power3.out"
            })
          }
        }
        
        card.addEventListener('mousemove', handleMouseMove)
        card.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    // Keep the red gradient persistent (no morphing that makes it disappear)
    // The hero glow effect should remain visible
    if (backgroundRef.current) {
      // Set a static gradient that maintains the red glow from above
      backgroundRef.current.style.background = `
        linear-gradient(180deg, 
          rgba(220, 38, 38, 0.25) 0%, 
          rgba(127, 29, 29, 0.15) 15%, 
          rgba(0, 0, 0, 0.95) 40%, 
          rgba(0, 0, 0, 1) 100%
        )
      `
    }

    }, sectionRef) // GSAP context scope
    
    return () => {
      ctx.revert() // This will kill all animations and ScrollTriggers in this context
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center px-8 py-16 text-white relative"
    >
      {/* Morphing background layer */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(220, 38, 38, 0.25) 0%, rgba(127, 29, 29, 0.15) 15%, rgba(0, 0, 0, 0.95) 40%, rgba(0, 0, 0, 1) 100%)'
        }}
      />
      
      {/* Content layer */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full">
      {/* Main Heading */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl text-center mb-16 max-w-4xl font-light text-white leading-tight">
        Was kostet Sie Ineffizienz?
      </h2>

      {/* Dynamic CHF Display with rolling numbers */}
      <div className="text-center mb-12">
        <div 
          className="mb-4 font-mono tabular-nums flex flex-col items-center justify-center"
          style={{
            textShadow: '0 4px 20px rgba(220, 38, 38, 0.2)',
            minHeight: '1.2em'
          }}
        >
          <div 
            ref={mainNumberRef}
            className="text-7xl md:text-8xl lg:text-9xl font-light text-white whitespace-nowrap text-center"
          >
            CHF {yearlyCostPerEmployee.toLocaleString('de-CH')}
          </div>
          <div 
            className="mt-2 font-mono text-white/70 text-2xl md:text-3xl lg:text-4xl text-center"
          >
            pro Person und Jahr
          </div>
        </div>
      </div>

      {/* Interactive Slider with Custom Tooltip */}
      <div 
        ref={sliderRef}
        className="w-[90%] max-w-3xl mb-20 px-4 relative"
      >
        <div className="mb-6 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
            <span className="text-lg font-light text-white tabular-nums">
              <span className="inline-block w-6 text-center">{displayHours}</span> Std./Woche für Administration
            </span>
          </div>
        </div>
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          min={1}
          max={20}
          step={0.1}
          className="w-full h-2 transition-all duration-300"
        />
        <div className="flex justify-center mt-3 text-sm text-white/60">
          <span className="font-light">Basis: CHF 150/h Vollkosten</span>
        </div>
      </div>

      {/* Data Cards with Swiss precision grid */}
      <div 
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl w-full"
      >
        <Card 
          ref={card1Ref}
          className="text-center border-none shadow-none bg-transparent hover:bg-white/5 transition-all duration-300 rounded-2xl p-2 opacity-0 h-48 flex flex-col justify-center"
          style={{ transform: 'translateY(30px)' }}
        >
          <CardContent className="p-6 card-content flex flex-col justify-center h-full">
            <div className="text-4xl md:text-5xl font-light mb-3 text-white whitespace-nowrap">+7 Std.</div>
            <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">Nationaler Durchschnitt pro Woche</p>
          </CardContent>
        </Card>
        
        <Card 
          ref={card2Ref}
          className="text-center border-none shadow-none bg-transparent hover:bg-white/5 transition-all duration-300 rounded-2xl p-2 opacity-0 h-48 flex flex-col justify-center"
          style={{ transform: 'translateY(30px)' }}
        >
          <CardContent className="p-6 card-content flex flex-col justify-center h-full">
            <div className="text-4xl md:text-5xl font-light mb-3 text-white whitespace-nowrap">6.8 Tage</div>
            <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">Produktivität verloren pro Monat</p>
          </CardContent>
        </Card>
        
        <Card 
          ref={card3Ref}
          className="text-center border-none shadow-none bg-transparent hover:bg-white/5 transition-all duration-300 rounded-2xl p-2 opacity-0 h-48 flex flex-col justify-center"
          style={{ transform: 'translateY(30px)' }}
        >
          <CardContent className="p-6 card-content flex flex-col justify-center h-full">
            <div className="text-4xl md:text-5xl font-light mb-3 text-white whitespace-nowrap">CHF 6 Mrd.</div>
            <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">Wirtschaftsschaden Schweiz pro Jahr</p>
          </CardContent>
        </Card>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8">
        <div className="text-2xl text-white/60">↓</div>
      </div>
      </div>
    </section>
  )
}