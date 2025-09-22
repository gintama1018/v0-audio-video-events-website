"use client"

import { useEffect, useRef, ReactNode } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface ParallaxWrapperProps {
  children: ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  offset?: number
}

export function ParallaxWrapper({ 
  children, 
  speed = 0.5, 
  direction = "up",
  className = "",
  offset = 0
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + (speed * 100)])
  const x = useTransform(scrollYProgress, [0, 1], [offset, offset + (speed * 100)])
  
  const ySpring = useSpring(y, springConfig)
  const xSpring = useSpring(x, springConfig)

  const getTransform = () => {
    switch (direction) {
      case "up":
        return { y: ySpring }
      case "down":
        return { y: useTransform(ySpring, value => -value) }
      case "left":
        return { x: xSpring }
      case "right":
        return { x: useTransform(xSpring, value => -value) }
      default:
        return { y: ySpring }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={`parallax-element ${className}`}
      style={getTransform()}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  backgroundParallax?: boolean
}

export function ParallaxSection({ 
  children, 
  className = "",
  backgroundParallax = false 
}: ParallaxSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  return (
    <div 
      ref={ref}
      className={`parallax-container relative overflow-hidden ${className}`}
    >
      {backgroundParallax && (
        <ParallaxWrapper speed={-0.3} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        </ParallaxWrapper>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  )
}

interface ParallaxTextProps {
  children: ReactNode
  speed?: number
  className?: string
  delay?: number
}

export function ParallaxText({ 
  children, 
  speed = 0.3, 
  className = "",
  delay = 0
}: ParallaxTextProps) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  })

  return (
    <div ref={ref}>
      <ParallaxWrapper speed={speed} className={className}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </ParallaxWrapper>
    </div>
  )
}

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
  scale?: boolean
}

export function ParallaxImage({ 
  src, 
  alt, 
  className = "",
  speed = 0.4,
  scale = true
}: ParallaxImageProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <ParallaxWrapper speed={speed}>
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          initial={{ scale: scale ? 1.2 : 1, opacity: 0 }}
          animate={inView ? { 
            scale: 1, 
            opacity: 1 
          } : { 
            scale: scale ? 1.2 : 1, 
            opacity: 0 
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </ParallaxWrapper>
    </div>
  )
}

interface ParallaxCardProps {
  children: ReactNode
  className?: string
  gradient?: boolean
  hover?: boolean
  delay?: number
}

export function ParallaxCard({ 
  children, 
  className = "",
  gradient = false,
  hover = true,
  delay = 0
}: ParallaxCardProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  })

  const borderClass = gradient ? "gradient-border-animated" : "gradient-border"
  const hoverClass = hover ? "hover-gradient-scale" : ""

  return (
    <div ref={ref}>
      <ParallaxWrapper speed={0.2}>
        <motion.div
          className={`${borderClass} ${hoverClass} ${className}`}
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          animate={inView ? { 
            opacity: 1, 
            y: 0, 
            rotateX: 0 
          } : { 
            opacity: 0, 
            y: 50, 
            rotateX: 10 
          }}
          transition={{ 
            duration: 0.8, 
            delay,
            ease: "easeOut" 
          }}
          whileHover={hover ? { 
            y: -10,
            rotateX: 5,
            transition: { duration: 0.3 }
          } : undefined}
          style={{ 
            transformStyle: "preserve-3d",
            perspective: 1000 
          }}
        >
          {children}
        </motion.div>
      </ParallaxWrapper>
    </div>
  )
}

// Hook for custom parallax effects
export function useParallax() {
  const { scrollY } = useScroll()
  
  const createParallaxValue = (speed: number, offset: number = 0) => {
    return useTransform(scrollY, [0, 1000], [offset, offset + (speed * 1000)])
  }

  const createSpringParallax = (speed: number, offset: number = 0) => {
    const value = createParallaxValue(speed, offset)
    return useSpring(value, { stiffness: 100, damping: 30 })
  }

  return {
    scrollY,
    createParallaxValue,
    createSpringParallax
  }
}