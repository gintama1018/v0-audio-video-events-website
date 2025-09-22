"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 transition-opacity duration-200 ${
        isVisible ? "opacity-80" : "opacity-0"
      }`}
      style={{
        transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
      }}
    >
      <Image
        src="/logo.png"
        alt="AVE Cursor"
        width={32}
        height={32}
        className="w-full h-full object-contain mix-blend-difference"
      />
    </div>
  )
}
