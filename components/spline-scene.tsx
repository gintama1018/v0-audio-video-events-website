"use client"

import { Suspense, lazy, useRef, useEffect } from "react"

const Spline = lazy(() => import("@splinetool/react-spline"))

interface SplineSceneProps {
  scene?: string
  className?: string
  interactive?: boolean
}

export function SplineScene({ scene, className, interactive = true }: SplineSceneProps) {
  const defaultScene = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
  const splineRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!interactive || !containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !splineRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      // Normalize coordinates to -1 to 1 range
      const normalizedX = (x - 0.5) * 2
      const normalizedY = (y - 0.5) * 2

      // Apply subtle rotation based on mouse position
      if (splineRef.current && splineRef.current.setVariable) {
        try {
          splineRef.current.setVariable("mouseX", normalizedX * 0.1)
          splineRef.current.setVariable("mouseY", normalizedY * 0.1)
        } catch (error) {
          // Silently handle if variables don't exist in the scene
        }
      }
    }

    const container = containerRef.current
    container.addEventListener("mousemove", handleMouseMove)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [interactive])

  const onLoad = (spline: any) => {
    splineRef.current = spline

    if (spline && spline.setVariable) {
      try {
        spline.setVariable("isLoaded", true)
        spline.setVariable("animationSpeed", 1)
      } catch (error) {
        // Silently handle if variables don't exist
      }
    }
  }

  return (
    <div ref={containerRef} className={className || "w-full h-full"}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <div className="text-sm text-muted-foreground animate-pulse">Loading 3D Scene...</div>
            </div>
          </div>
        }
      >
        <Spline scene={scene || defaultScene} onLoad={onLoad} className="w-full h-full" />
      </Suspense>
    </div>
  )
}
