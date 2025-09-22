"use client"

import { useState, useEffect } from "react"
import { SplineScene } from "@/components/spline-scene"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isClicked, setIsClicked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Landing animation delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleReadyClick = () => {
    setIsClicked(true)
    // Clicking animation delay before navigation
    setTimeout(() => {
      router.push("/home")
    }, 800)
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500 mx-auto mb-4"></div>
          <div className="text-white text-xl font-light tracking-wider">Loading Experience...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden cursor-none">
      {/* Custom Cursor */}
      <div className="custom-cursor fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference">
        <Image
          src="/logo.png"
          alt="AVE Cursor"
          width={32}
          height={32}
          className="w-full h-full object-contain opacity-80"
        />
      </div>

      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <SplineScene />
      </div>

      {/* Content Overlay */}
      <div
        className={`relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 ${
          isClicked ? "scale-110 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Logo */}
        <div className="mb-8 animate-fade-in-up">
          <Image
            src="/logo.png"
            alt="Audio Video Events"
            width={300}
            height={200}
            className="mx-auto drop-shadow-2xl"
            priority
          />
        </div>

        {/* Main Text */}
        <div className="mb-12 animate-fade-in-up animation-delay-300">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">AUDIO VIDEO</h1>
          <h2 className="text-4xl md:text-6xl font-light text-red-500 mb-6 tracking-wider">EVENTS</h2>
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">WE MAKE MEMORIES</p>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in-up animation-delay-600">
          <Button
            onClick={handleReadyClick}
            className={`
              bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-xl font-semibold
              rounded-full transition-all duration-300 transform hover:scale-105
              shadow-2xl hover:shadow-red-500/25 border-2 border-red-500
              ${isClicked ? "animate-pulse scale-110" : ""}
            `}
            disabled={isClicked}
          >
            {isClicked ? "Creating Magic..." : "Ready to Make Memories"}
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
