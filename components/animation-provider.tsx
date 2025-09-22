"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface AnimationContextType {
  isAnimationEnabled: boolean
  toggleAnimation: () => void
  prefersReducedMotion: boolean
}

const AnimationContext = createContext<AnimationContextType>({
  isAnimationEnabled: true,
  toggleAnimation: () => {},
  prefersReducedMotion: false,
})

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    if (mediaQuery.matches) {
      setIsAnimationEnabled(false)
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
      if (e.matches) {
        setIsAnimationEnabled(false)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleAnimation = () => {
    setIsAnimationEnabled(!isAnimationEnabled)
  }

  return (
    <AnimationContext.Provider value={{ isAnimationEnabled, toggleAnimation, prefersReducedMotion }}>
      <div className={isAnimationEnabled ? "animations-enabled" : "animations-disabled"}>{children}</div>
    </AnimationContext.Provider>
  )
}

export const useAnimation = () => useContext(AnimationContext)
