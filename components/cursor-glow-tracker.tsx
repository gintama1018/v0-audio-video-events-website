"use client"

import { useEffect } from "react"

export function CursorGlowTracker() {
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      const elements = document.querySelectorAll(
        '.cursor-glow-target, .cursor-glow-primary, .cursor-glow-card, .nav-glow, .btn-glow-intense, ' +
        '.cursor-glow-success, .cursor-glow-error, .cursor-glow-warning, .cursor-glow-subtle, ' +
        '.cursor-glow-medium, .cursor-glow-intense, .btn-glow-premium, .btn-success-pulse, ' +
        '.btn-error-pulse, .btn-warning-pulse, .btn-premium-cta, .btn-cta-primary, .btn-cta-secondary, .btn-cta-subtle'
      )
      
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        
        ;(element as HTMLElement).style.setProperty('--cursor-x', `${x}%`)
        ;(element as HTMLElement).style.setProperty('--cursor-y', `${y}%`)
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => updateCursorPosition(e))
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return null
}