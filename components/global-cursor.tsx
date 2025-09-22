"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function GlobalCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const pathname = usePathname()

  // Only show custom cursor on landing page
  const showCustomCursor = pathname === "/"

  useEffect(() => {
    if (!showCustomCursor) return

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.style.cursor === "pointer"
      setIsHovering(isInteractive)
    }

    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseover", handleMouseOver)

    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseover", handleMouseOver)
      document.body.style.cursor = "auto"
    }
  }, [showCustomCursor])

  if (!showCustomCursor || !isVisible) return null

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-100 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
      }}
    >
      <div
        className={`relative transition-all duration-200 ${
          isClicking ? "scale-75" : isHovering ? "scale-125" : "scale-100"
        }`}
      >
        <Image
          src="/logo.png"
          alt="AVE Cursor"
          width={32}
          height={32}
          className={`w-8 h-8 object-contain transition-all duration-200 ${
            isHovering ? "brightness-125 drop-shadow-lg" : ""
          }`}
          style={{
            filter: `drop-shadow(0 0 ${isHovering ? "10px" : "5px"} rgba(239, 68, 68, ${isHovering ? "0.8" : "0.5"}))`,
          }}
        />

        {/* Cursor trail effect */}
        <div
          className={`absolute inset-0 w-8 h-8 rounded-full transition-all duration-300 ${
            isClicking ? "bg-red-500/30 scale-150" : "bg-red-500/10 scale-100"
          }`}
          style={{
            animation: isHovering ? "pulse 1s infinite" : "none",
          }}
        />
      </div>
    </div>
  )
}
