"use client"

import { useEffect, useRef } from "react"

export function ScrollAnimations() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
            entry.target.classList.remove("animate-out")
          } else {
            entry.target.classList.add("animate-out")
            entry.target.classList.remove("animate-in")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    // Observe all elements with scroll-animate class
    const elements = document.querySelectorAll(".scroll-animate")
    elements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return null
}
