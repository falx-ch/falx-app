import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Animation configuration constants
export const ANIMATION_CONFIGS = {
  cardReveal: {
    from: { y: 50, opacity: 0, rotationX: -15 },
    to: { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
  },
  buttonScale: {
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.3)", delay: 0.3 }
  },
  hover: {
    enter: { scale: 1.05, duration: 0.2, ease: "power2.out" },
    leave: { scale: 1, duration: 0.2, ease: "power2.out" }
  },
  card3D: {
    tilt: { duration: 0.4, ease: "power2.out" },
    reset: { duration: 0.6, ease: "power3.out" }
  },
  workflow: {
    voiceWave: {
      scale: { duration: 1, ease: "power2.out" },
      pulse: { duration: 0.8, ease: "power2.inOut" }
    },
    connectionLine: {
      duration: 2, 
      ease: "power1.inOut", 
      drawSVG: "0% 100%"
    },
    toolReveal: {
      scale: { duration: 0.8, ease: "back.out(2)", stagger: 0.2 },
      elastic: { duration: 0.6, ease: "elastic.out(1.2, 0.3)", stagger: 0.15 }
    },
    documentGeneration: {
      appear: { duration: 0.8, ease: "back.out(1.5)" },
      complete: { duration: 0.7, ease: "elastic.out(1.2, 0.5)", stagger: 0.2 }
    }
  }
} as const

/**
 * Centralized GSAP Animation Manager
 * Provides singleton pattern for plugin registration and reusable animation methods
 */
export class GSAPManager {
  private static instance: GSAPManager
  private initialized = false
  private contexts: gsap.Context[] = []

  private constructor() {}

  static getInstance(): GSAPManager {
    if (!GSAPManager.instance) {
      GSAPManager.instance = new GSAPManager()
    }
    return GSAPManager.instance
  }

  /**
   * Initialize GSAP plugins - call once at app startup
   */
  init(): void {
    if (this.initialized || typeof window === 'undefined') return
    
    gsap.registerPlugin(ScrollTrigger)
    this.initialized = true
    
    // Global GSAP settings for performance
    gsap.config({
      force3D: true,
      nullTargetWarn: false
    })
  }

  /**
   * Create a new GSAP context for component-level cleanup
   */
  createContext(scope?: Element): gsap.Context {
    const ctx = gsap.context(() => {}, scope)
    this.contexts.push(ctx)
    return ctx
  }

  /**
   * Card reveal animation with stagger
   */
  animateCardReveal(elements: (HTMLElement | null)[], trigger: HTMLElement): ScrollTrigger {
    const validElements = elements.filter(Boolean) as HTMLElement[]
    
    return ScrollTrigger.create({
      trigger,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.fromTo(validElements, 
          ANIMATION_CONFIGS.cardReveal.from,
          ANIMATION_CONFIGS.cardReveal.to
        )
      }
    })
  }

  /**
   * 3D tilt effect for cards
   */
  apply3DTilt(card: HTMLElement): () => void {
    gsap.set(card, { 
      transformOrigin: "center",
      transformStyle: "preserve-3d"
    })
    
    const cardContent = card.querySelector('.card-content') || card.firstElementChild as HTMLElement
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
        ...ANIMATION_CONFIGS.card3D.tilt
      })
      
      if (cardContent) {
        gsap.to(cardContent, {
          x: (e.clientX - centerX) / 20,
          y: (e.clientY - centerY) / 20,
          ...ANIMATION_CONFIGS.card3D.tilt
        })
      }
    }
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        z: 0,
        ...ANIMATION_CONFIGS.card3D.reset
      })
      
      if (cardContent) {
        gsap.to(cardContent, {
          x: 0,
          y: 0,
          ...ANIMATION_CONFIGS.card3D.reset
        })
      }
    }
    
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    
    // Return cleanup function
    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }

  /**
   * Animate buttons on scroll with elastic effect
   */
  animateButtonsOnScroll(): void {
    gsap.utils.toArray(".animate-on-scroll").forEach((element: any) => {
      gsap.fromTo(element, 
        ANIMATION_CONFIGS.buttonScale.from,
        {
          ...ANIMATION_CONFIGS.buttonScale.to,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            once: true
          },
          onComplete: () => {
            this.addHoverEffect(element)
          }
        }
      )
    })
  }

  /**
   * Add hover effects to elements
   */
  addHoverEffect(element: HTMLElement): void {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, ANIMATION_CONFIGS.hover.enter)
    })
    element.addEventListener('mouseleave', () => {
      gsap.to(element, ANIMATION_CONFIGS.hover.leave)
    })
  }

  /**
   * Batch add hover effects to elements with .hover-lift class
   */
  initializeHoverEffects(): void {
    gsap.utils.toArray(".hover-lift").forEach((element: any) => {
      this.addHoverEffect(element)
    })
  }

  /**
   * Global cleanup - call on app unmount or route change
   */
  cleanup(): void {
    if (typeof window !== 'undefined') {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      this.contexts.forEach(ctx => ctx.revert())
      this.contexts = []
    }
  }

  /**
   * Refresh ScrollTrigger - useful after dynamic content changes
   */
  refreshScrollTrigger(): void {
    if (typeof window !== 'undefined') {
      ScrollTrigger.refresh()
    }
  }

  /**
   * Create workflow animation timeline with optimized performance
   */
  createWorkflowTimeline(): gsap.core.Timeline {
    return gsap.timeline({ 
      repeat: -1, 
      repeatDelay: 3,
      defaults: { ease: "power2.out" }
    })
  }

  /**
   * Animate SVG path drawing with DrawSVGPlugin
   */
  animatePathDraw(path: string | Element, config = ANIMATION_CONFIGS.workflow.connectionLine): gsap.core.Tween {
    return gsap.fromTo(path, 
      { drawSVG: "0% 0%" },
      { ...config }
    )
  }

  /**
   * Animate element appearance with scale and opacity
   */
  animateElementAppear(element: string | Element, config = ANIMATION_CONFIGS.workflow.toolReveal.scale): gsap.core.Tween {
    return gsap.fromTo(element,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, ...config }
    )
  }

  /**
   * Create pulsing wave effect
   */
  createPulseEffect(element: string | Element): gsap.core.Timeline {
    const tl = gsap.timeline({ repeat: -1 })
    return tl
      .to(element, { scale: 1.2, opacity: 1, ...ANIMATION_CONFIGS.workflow.voiceWave.scale })
      .to(element, { scale: 1, opacity: 0.8, ...ANIMATION_CONFIGS.workflow.voiceWave.pulse })
  }
}

// Export singleton instance
export const gsapManager = GSAPManager.getInstance()

// Auto-initialize when imported (client-side only)
if (typeof window !== 'undefined') {
  gsapManager.init()
}