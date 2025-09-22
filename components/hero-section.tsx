"use client"

import { Button } from "@/components/ui/button"
import { Play, Star, Users, Calendar } from "lucide-react"
import { SplineScene } from "./spline-scene"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Spline Scene */}
      <div className="absolute inset-0 z-0">
        <SplineScene />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-balance">
                <span className="text-foreground">We Make</span>
                <br />
                <span className="text-primary">Memories</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
                Premier audio-visual event management company in India. From intimate weddings to grand corporate
                celebrations, we bring your vision to life with cutting-edge technology and creative excellence.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">500+ Happy Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">1000+ Events</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">10+ Years Experience</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground pulse-glow">
                Plan Your Event
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Play className="h-4 w-4 mr-2" />
                Watch Our Work
              </Button>
            </div>
          </div>

          {/* Featured Image/Video Placeholder */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-border overflow-hidden">
              <img
                src="/indian-wedding-celebration-with-professional-light.jpg"
                alt="Professional event setup"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Rajesh & Priya's Dream Wedding</h3>
                <p className="text-sm text-muted-foreground">A magical celebration in Mumbai with 500 guests</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
