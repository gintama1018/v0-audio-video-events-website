"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface AdvancedLoadingProps {
  isLoading: boolean
  variant?: "dots" | "wave" | "spinner" | "gradient" | "bounce"
  showLogo?: boolean
}

export function AdvancedLoading({ 
  isLoading, 
  variant = "gradient",
  showLogo = true 
}: AdvancedLoadingProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      // Progress simulation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100
          return prev + Math.random() * 4
        })
      }, 50)

      return () => {
        clearInterval(progressInterval)
      }
    }
  }, [isLoading])

  // Animated Logo with Flipping Effect
  const AnimatedLogo = () => {
    return (
      <div className="relative w-96 h-96 flex items-center justify-center">
        {/* Background Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, rgba(245,158,11,0.2) 50%, transparent 70%)',
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />

        {/* Outer Construction Circle */}
        <motion.div
          className="absolute inset-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 320 320" className="w-full h-full">
            <motion.circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="10 5"
              initial={{ pathLength: 0, rotate: 0 }}
              animate={{ pathLength: 1, rotate: 360 }}
              transition={{ 
                pathLength: { duration: 2, ease: "easeInOut" },
                rotate: { duration: 2, ease: "linear" }
              }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Logo Container with Flip Animation */}
        <motion.div
          className="relative w-64 h-64"
          style={{ perspective: '1000px' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 200 }}
        >
          {/* Logo Flip Container */}
          <motion.div
            className="relative w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ rotateY: -180, rotateX: -180 }}
            animate={{ rotateY: 0, rotateX: 0 }}
            transition={{ 
              delay: 2,
              duration: 1.5,
              type: "spring",
              stiffness: 100
            }}
          >
            {/* Logo Background Card */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 rounded-2xl border-2 border-gray-600 backdrop-blur-sm shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            />
            
            {/* Actual Logo Image */}
            <motion.div
              className="absolute inset-4 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3, duration: 0.8, type: "spring" }}
            >
              <Image
                src="/logo.png"
                alt="Audio Video Events Logo"
                width={200}
                height={133}
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Corner Glow Effects */}
            {[0, 1, 2, 3].map((corner) => (
              <motion.div
                key={corner}
                className="absolute w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50"
                style={{
                  top: corner < 2 ? '12px' : 'auto',
                  bottom: corner >= 2 ? '12px' : 'auto',
                  left: corner % 2 === 0 ? '12px' : 'auto',
                  right: corner % 2 === 1 ? '12px' : 'auto',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 3.5 + (corner * 0.1), duration: 0.4 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Company Name with Typewriter Effect */}
        <motion.div
          className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <motion.div
            className="text-3xl font-bold text-white tracking-wider mb-2"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ delay: 4.2, duration: 1 }}
          >
            AUDIO VIDEO EVENTS
          </motion.div>
          <motion.div
            className="text-base text-primary font-light tracking-widest"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 4.8, duration: 0.6 }}
          >
            We Make Memories
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background Particles */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Main Logo Animation */}
          <div className="relative z-10 flex flex-col items-center">
            <AnimatedLogo />
            
            {/* Loading Status Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5.5, duration: 0.5 }}
              className="mt-12 text-center"
            >
              <motion.div
                className="text-sm text-gray-400 tracking-wider"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                LOADING EXPERIENCE...
              </motion.div>
            </motion.div>
            
            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 6, duration: 0.5 }}
              className="mt-6 w-80"
            >
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full shadow-lg"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.div 
                className="text-xs text-center text-gray-500 mt-2 font-mono"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.round(progress)}% COMPLETE
              </motion.div>
            </motion.div>
          </div>

          {/* Ambient Light Effects */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                "radial-gradient(circle at 30% 40%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 60%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 30%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}