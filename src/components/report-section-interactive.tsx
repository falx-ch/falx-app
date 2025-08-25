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

export default function ReportSectionInteractive() {
  const [sliderValue, setSliderValue] = useState([10])
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
            mainNumberRef.current.textContent = `${currentValue.toLocaleString('de-CH')}`
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
    if (sliderRef.current) {
      ScrollTrigger.create({
        trigger: sliderRef.current,
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

    }) // GSAP context scope
    
    return () => {
      ctx.revert() // This will kill all animations and ScrollTriggers in this context
    }
  }, [])

  return (
    <>
      {/* Dynamic CHF Display with rolling numbers - adapted for left column */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-red-500/30 transition-all duration-300">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-baseline space-x-2 mb-3">
            <span className="text-sm text-white/60 font-medium">CHF</span>
            <div 
              ref={mainNumberRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight"
              style={{
                textShadow: '0 4px 20px rgba(220, 38, 38, 0.2)',
                minHeight: '1.2em'
              }}
            >
              {yearlyCostPerEmployee.toLocaleString('de-CH')}
            </div>
          </div>
          <p className="text-red-300 text-lg font-medium">Pro Mitarbeiter und Jahr</p>
          <p className="text-white/50 text-sm mt-1">Basierend auf unserem KI 2025 Schweiz Report</p>
        </div>
      </div>

      {/* Interactive Slider with Custom Tooltip - adapted for left column */}
      <div className="space-y-4 lg:space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-white/70 font-medium">
            <span className="inline-block w-6 text-center tabular-nums">{displayHours}</span> Std./Woche für Administration
          </label>
          <div ref={sliderRef}>
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              min={1}
              max={20}
              step={0.1}
              className="w-full h-2 transition-all duration-300"
            />
          </div>
          <div className="text-center">
            <span className="text-xs text-white/60 font-light">Basis: CHF 150/h Vollkosten</span>
          </div>
        </div>
      </div>
    </>
  )
}