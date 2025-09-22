"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Users, Calendar, ArrowRight, Phone } from "lucide-react"
import { SplineScene } from "@/components/spline-scene"
import { AdvancedLoading } from "@/components/advanced-loading"
import { GlowShowcase } from "@/components/glow-showcase"
import { 
  ParallaxWrapper, 
  ParallaxSection, 
  ParallaxText, 
  ParallaxImage, 
  ParallaxCard 
} from "@/components/parallax-wrapper"
import Link from "next/link"

const stats = [
  { icon: Star, number: "500+", label: "Happy Clients", color: "text-yellow-400" },
  { icon: Calendar, number: "1000+", label: "Events", color: "text-green-400" },
  { icon: Users, number: "10+", label: "Years Experience", color: "text-blue-400" },
]

const features = [
  {
    title: "Premium Audio Systems",
    description: "Crystal-clear sound that makes every word and note perfect",
    image: "/indian-wedding-celebration-with-professional-light.jpg"
  },
  {
    title: "Stunning Visual Effects",
    description: "Lighting and displays that transform your venue into magic",
    image: "/professional-indian-event-management-team-with-aud.jpg"
  },
  {
    title: "Expert Team",
    description: "Certified professionals who understand your vision",
    image: "/indian-wedding-celebration-with-professional-light.jpg"
  }
]

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <AdvancedLoading isLoading={isLoading} variant="gradient" />
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden pt-20">
      {/* Hero Section */}
      <ParallaxSection className="hero-3d" backgroundParallax>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Enhanced Background with Glass Effect */}
          <div className="absolute inset-0 z-0">
            <SplineScene />
            <div className="hero-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
            
            {/* Floating Glass Elements */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="floating-element glass-primary"
                style={{
                  width: `${60 + i * 20}px`,
                  height: `${60 + i * 20}px`,
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  borderRadius: '50%',
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Enhanced Content with 3D Effects */}
              <div className="space-y-8 hero-content">
                <ParallaxText delay={0.2}>
                  <Badge 
                    variant="outline" 
                    className="border-primary text-primary glass-primary cursor-glow-target btn-3d"
                  >
                    🎉 India's Premier Event Company
                  </Badge>
                </ParallaxText>

                <div className="space-y-6">
                  <ParallaxText delay={0.4}>
                    <h1 className="hero-title">
                      <span className="block">We Make</span>
                      <span className="block text-primary">Memories</span>
                    </h1>
                  </ParallaxText>
                  
                  <ParallaxText delay={0.6}>
                    <p className="hero-subtitle max-w-2xl">
                      Premier audio-visual event management company in India. From intimate weddings to grand corporate
                      celebrations, we bring your vision to life with cutting-edge technology and creative excellence.
                    </p>
                  </ParallaxText>
                </div>

                {/* Enhanced Stats with Glass Cards */}
                <ParallaxText delay={0.8}>
                  <div className="grid grid-cols-3 gap-6 max-w-2xl">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        className="glass-card p-4 rounded-2xl text-center tilt-3d cursor-glow-subtle"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                        <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                        <div className="text-xs text-gray-300">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </ParallaxText>

                {/* Enhanced CTA Buttons */}
                <ParallaxText delay={1.0}>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Button 
                      size="lg" 
                      className="btn-cta-primary bg-primary hover:bg-primary/90 text-primary-foreground group btn-3d glass-primary"
                      asChild
                    >
                      <Link href="/services">
                        Plan Your Event
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="cursor-glow-medium bg-transparent group glass-dark btn-3d"
                    >
                      <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      Watch Our Work
                    </Button>
                  </div>
                </ParallaxText>
              </div>

              {/* Enhanced Featured Image with 3D Glass Card */}
              <ParallaxWrapper speed={0.3} className="relative">
                <div className="interactive-card cursor-glow-card glass-card p-6">
                  <ParallaxImage
                    src="/indian-wedding-celebration-with-professional-light.jpg"
                    alt="Professional event setup"
                    className="aspect-video rounded-2xl overflow-hidden"
                  />
                  <div className="absolute inset-6 bg-gradient-to-t from-background/80 to-transparent rounded-2xl" />
                  <motion.div
                    className="absolute bottom-12 left-12 right-12 glass-dark p-6 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Rajesh & Priya's Dream Wedding
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      A magical celebration in Mumbai with 500 guests
                    </p>
                  </motion.div>
                </div>
              </ParallaxWrapper>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Features Section */}
      <ParallaxSection className="py-20 bg-secondary/20" backgroundParallax>
        <div className="container mx-auto px-4">
          <ParallaxText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Choose <span className="text-primary">Audio Video Events</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the difference with our premium services and cutting-edge technology
            </p>
          </ParallaxText>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ParallaxCard
                key={index}
                gradient={index === 1}
                delay={index * 0.2}
                className="p-6 bg-card cursor-glow-card"
              >
                <div className="space-y-4">
                  <ParallaxImage
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 rounded-lg overflow-hidden"
                    speed={0.2}
                  />
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                  <Button 
                    variant="ghost" 
                    className="text-primary hover:text-primary/80 p-0 h-auto font-medium group cursor-glow-subtle"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Glow Effects Showcase */}
      <ParallaxSection className="py-20" backgroundParallax>
        <div className="container mx-auto px-4">
          <ParallaxText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Interactive <span className="text-primary">Experience</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our enhanced cursor glow effects - hover over any element to see the magic!
            </p>
          </ParallaxText>
          
          <ParallaxCard className="p-8 bg-card cursor-glow-card">
            <GlowShowcase />
          </ParallaxCard>
        </div>
      </ParallaxSection>

      {/* CTA Section */}
      <ParallaxSection className="py-20" backgroundParallax>
        <div className="container mx-auto px-4">
          <ParallaxCard gradient className="p-12 text-center bg-card cursor-glow-primary">
            <ParallaxText>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to Create <span className="text-primary">Unforgettable</span> Memories?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss your event and create something extraordinary together. 
                Our team is ready to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="btn-premium-cta bg-primary hover:bg-primary/90 text-primary-foreground group"
                  asChild
                >
                  <Link href="/contact">
                    <Phone className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                    Get Free Consultation
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="cursor-glow-medium bg-transparent"
                  asChild
                >
                  <Link href="/about">
                    Learn About Us
                  </Link>
                </Button>
              </div>
            </ParallaxText>
          </ParallaxCard>
        </div>
      </ParallaxSection>
    </div>
  )
}