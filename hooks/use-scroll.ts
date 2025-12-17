"use client"

import { useEffect, useState, useCallback } from "react"
import type { ScrollState } from "@/types"

export function useScroll(): ScrollState {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate scroll progress for animations
  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 1000
  const scrollProgress = Math.min(scrollY / windowHeight, 1)
  
  // Hero effects - keep them stable to prevent flickering
  const heroOpacity = Math.max(0, 1 - scrollProgress * 0.5) // Fade out slowly
  const heroScale = Math.max(0.95, 1 - scrollProgress * 0.1) // Slight scale down
  
  // Fix contentTranslateY to prevent components from disappearing
  // Only apply transform when hero is visible, then smoothly transition
  const contentTranslateY = scrollY < windowHeight 
    ? Math.max(0, windowHeight - scrollY) * 0.3 // Reduced multiplier for smoother transition
    : 0

  // Navbar scroll effects
  const navbarOpacity = Math.min(scrollProgress * 2, 0.95)
  const navbarBlur = Math.min(scrollProgress * 20, 20)

  return {
    scrollY,
    scrollProgress,
    heroOpacity,
    heroScale,
    contentTranslateY,
    navbarOpacity,
    navbarBlur,
  }
}
