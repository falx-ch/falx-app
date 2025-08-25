import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Initialize all scroll-based animations globally
 * Restores the original beautiful animation timing
 */
export function initializeScrollAnimations() {
  if (typeof window === 'undefined') return

  // Animate buttons and CTAs on scroll - exactly like the original
  gsap.utils.toArray(".animate-on-scroll").forEach((element: any) => {
    gsap.fromTo(element, 
      { 
        scale: 0.8, 
        opacity: 0 
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
        delay: 0.3,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          once: true
        },
        onComplete: () => {
          // Add hover effects after animation completes
          element.addEventListener('mouseenter', () => {
            gsap.to(element, { scale: 1.05, duration: 0.2, ease: "power2.out" })
          })
          element.addEventListener('mouseleave', () => {
            gsap.to(element, { scale: 1, duration: 0.2, ease: "power2.out" })
          })
        }
      }
    )
  })

  // Add hover effects to buttons that don't need scroll animation
  gsap.utils.toArray(".hover-lift").forEach((element: any) => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, { scale: 1.05, duration: 0.2, ease: "power2.out" })
    })
    element.addEventListener('mouseleave', () => {
      gsap.to(element, { scale: 1, duration: 0.2, ease: "power2.out" })
    })
  })
}

/**
 * Cleanup function to call when component unmounts or route changes
 */
export function cleanupScrollAnimations() {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }
}