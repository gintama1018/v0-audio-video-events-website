"use client"

import { Button } from "@/components/ui/button"
import { Play, Star, Users, Calendar, Volume2, VolumeX } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function VideoHeroSection() {
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play failed, which is expected
      })
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source
            src="/placeholder.mp4?height=1080&width=1920&query=rajasthani wedding celebration with professional lighting and sound setup in jaipur"
            type="video/mp4"
          />
          {/* Fallback image */}
          <img
            src="/rajasthani-wedding-celebration-with-professional-li.jpg"
            alt="Event background"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Video overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Video Controls */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
      </button>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-balance">
                <span className="text-white">We Make</span>
                <br />
                <span className="text-red-500">Memories</span>
              </h1>
              <p className="text-xl text-gray-200 text-pretty max-w-2xl">
                Premier audio-visual event management company in Jaipur, Rajasthan. From traditional Rajasthani weddings
                to modern corporate celebrations, we bring your vision to life with cutting-edge technology and cultural
                excellence.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 animation-delay-300">
              <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-white">300+ Happy Clients</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-white">500+ Events</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-white">8+ Years Experience</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animation-delay-600">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white pulse-glow transform hover:scale-105 transition-all duration-300"
              >
                Plan Your Event
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              >
                <Play className="h-4 w-4 mr-2" />
                Watch Our Work
              </Button>
            </div>
          </div>

          {/* Featured Video Preview */}
          <div className="relative animate-fade-in-up animation-delay-300">
            <div className="aspect-video bg-gradient-to-br from-red-500/20 to-black/40 rounded-2xl border border-white/20 overflow-hidden backdrop-blur-sm">
              <video className="w-full h-full object-cover rounded-2xl" autoPlay muted loop playsInline>
                <source
                  src="/placeholder.mp4?height=720&width=1280&query=rajasthani wedding highlights reel with bride and groom in traditional attire"
                  type="video/mp4"
                />
                <img
                  src="/rajasthani-wedding-highlights-reel-with-bride-and-.jpg"
                  alt="Wedding highlights"
                  className="w-full h-full object-cover"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-semibold text-white mb-2">Arjun & Kavya's Royal Wedding</h3>
                <p className="text-sm text-gray-300">A magical Rajasthani celebration in Jaipur with 400 guests</p>
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-red-600/80 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-sm">
                  <Play className="h-6 w-6 text-white ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
