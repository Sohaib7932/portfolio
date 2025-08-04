'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useGSAPAnimation = (animationConfig) => {
  const elementRef = useRef(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    const { 
      trigger = element,
      animation,
      start = "top 80%",
      end = "bottom 20%",
      scrub = false,
      once = true
    } = animationConfig

    // Set initial state while preserving layout styles
    if (animation.from) {
      const fromStyles = { ...animation.from }
      // Don't override display, position, or alignment styles
      delete fromStyles.display
      delete fromStyles.position
      delete fromStyles.textAlign
      delete fromStyles.justifyContent
      delete fromStyles.alignItems
      gsap.set(element, fromStyles)
    }

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
        once,
        onEnter: () => {
          if (animation.to) {
            const toStyles = { ...animation.to }
            // Don't override display, position, or alignment styles
            delete toStyles.display
            delete toStyles.position
            delete toStyles.textAlign
            delete toStyles.justifyContent
            delete toStyles.alignItems
            gsap.to(element, toStyles)
          }
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [animationConfig])

  return elementRef
}

// Predefined animation presets
export const animationPresets = {
  fadeInUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
  },
  fadeInDown: {
    from: { opacity: 0, y: -50 },
    to: { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
  },
  fadeInLeft: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
  },
  fadeInRight: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
  },
  scaleUp: {
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
  },
  slideInLeft: {
    from: { x: -100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
  },
  slideInRight: {
    from: { x: 100, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
  }
}
