"use client"

import { useEffect } from 'react'
import { gsapManager } from '@/lib/gsap-manager'

/**
 * Simplified global animation handler using GSAP Manager
 * Replaces the old AnimationInitializer with cleaner architecture
 */
export default function GlobalAnimations() {
  useEffect(() => {
    // Wait for all components to render before initializing animations
    const timer = setTimeout(() => {
      gsapManager.animateButtonsOnScroll()
      gsapManager.initializeHoverEffects()
    }, 100)
    
    // Cleanup on unmount
    return () => {
      clearTimeout(timer)
      gsapManager.cleanup()
    }
  }, [])

  // This component renders nothing, it only handles global animations
  return null
}