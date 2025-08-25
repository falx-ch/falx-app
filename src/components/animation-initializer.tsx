"use client"

import { useEffect } from 'react'
import { initializeScrollAnimations, cleanupScrollAnimations } from '@/lib/animations'

/**
 * Global animation initializer component
 * Add this once to your main page/layout to enable all scroll animations
 */
export default function AnimationInitializer() {
  useEffect(() => {
    // Wait for all components to render before initializing animations
    const timer = setTimeout(() => {
      initializeScrollAnimations()
    }, 100)
    
    // Cleanup on unmount
    return () => {
      clearTimeout(timer)
      cleanupScrollAnimations()
    }
  }, [])

  // This component renders nothing, it only handles animations
  return null
}