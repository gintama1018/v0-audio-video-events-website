"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Volume2, 
  Lightbulb, 
  Video, 
  Camera, 
  Monitor, 
  Music, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Star,
  Phone
} from "lucide-react"
import { AdvancedLoading } from "@/components/advanced-loading"
import { 
  ParallaxWrapper, 
  ParallaxSection, 
  ParallaxText, 
  ParallaxImage, 
  ParallaxCard 
} from "@/components/parallax-wrapper"
import Link from "next/link"

const services = [
  {
    icon: Volume2,
    title: "Professional Sound Systems",
    description: "Crystal-clear audio solutions for Rajasthani weddings, corporate events, and cultural celebrations. From intimate mehendi to grand baraat ceremonies.",
    features: ["Wireless Microphones", "Line Array Speakers", "Traditional Music Setup", "Live Sound Mixing"],
    image: "/indian-wedding-celebration-with-professional-light.jpg",
    price: "₹15,000+",
    popular: false
  },
  {
    icon: Lightbulb,
    title: "Event Lighting Design",
    description: "Transform your venue with stunning lighting designs. Specialized in heritage venue lighting, LED walls, and traditional Rajasthani ambiance.",
    features: ["Heritage Venue Lighting", "LED Stage Design", "Cultural Theme Lighting", "Mood Lighting"],
    image: "/professional-indian-event-management-team-with-aud.jpg",
    price: "₹25,000+",
    popular: true
  },
  {
    icon: Video,
    title: "Video Production & Live Streaming",
    description: "Capture every precious moment with our professional videography. 4K recording, live streaming, and same-day highlight reels.",
    features: ["4K Wedding Films", "Live Streaming", "Same-Day Highlights", "Drone Coverage"],
    image: "/indian-wedding-celebration-with-professional-light.jpg",
    price: "₹30,000+",
    popular: false
  },
  {
    icon: Camera,
    title: "Photography Services",
    description: "Professional event photography that captures the essence of Rajasthani celebrations. Traditional portraits, candid moments, and aerial photography.",
    features: ["Traditional Portraits", "Candid Photography", "Drone Coverage", "Album Design"],
    image: "/professional-indian-event-management-team-with-aud.jpg",
    price: "₹20,000+",
    popular: false
  },
  {
    icon: Monitor,
    title: "LED Screens & Displays",
    description: "High-resolution LED screens and projection systems perfect for presentations, entertainment, and visual storytelling at your events.",
    features: ["Giant LED Walls", "Projection Mapping", "Interactive Displays", "Content Creation"],
    image: "/indian-wedding-celebration-with-professional-light.jpg",
    price: "₹40,000+",
    popular: false
  },
  {
    icon: Music,
    title: "DJ & Entertainment",
    description: "Professional DJs specializing in Bollywood, Rajasthani folk, and international music. Complete entertainment solutions for all celebrations.",
    features: ["Bollywood DJs", "Folk Music Setup", "Karaoke Systems", "Interactive Entertainment"],
    image: "/professional-indian-event-management-team-with-aud.jpg",
    price: "₹18,000+",
    popular: false
  },
]

const packages = [
  {
    name: "Essential Package",
    price: "₹50,000",
    description: "Perfect for intimate celebrations",
    features: [
      "Basic Sound System",
      "Standard Lighting",
      "Photography (4 hours)",
      "Basic DJ Services"
    ],
    gradient: false
  },
  {
    name: "Premium Package",
    price: "₹1,50,000",
    description: "Our most popular choice",
    features: [
      "Professional Sound System",
      "Designer Lighting",
      "Video + Photography",
      "Professional DJ",
      "LED Displays",
      "Live Streaming"
    ],
    gradient: true,
    popular: true
  },
  {
    name: "Luxury Package",
    price: "₹3,00,000",
    description: "Ultimate event experience",
    features: [
      "Premium Audio System",
      "Custom Lighting Design",
      "Cinematic Videography",
      "Drone Coverage",
      "Interactive Entertainment",
      "Complete Production"
    ],
    gradient: false
  }
]

export default function ServicesPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <AdvancedLoading isLoading={isLoading} variant="wave" />
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden pt-20">
      {/* Hero Section */}
      <ParallaxSection className="py-20 bg-gradient-to-br from-background via-primary/5 to-background" backgroundParallax>
        <div className="container mx-auto px-4 text-center">
          <ParallaxText delay={0.2}>
            <Badge variant="outline" className="border-primary text-primary cursor-glow-target mb-6">
              🎵 Professional Services
            </Badge>
          </ParallaxText>
          
          <ParallaxText delay={0.4}>
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Services</span>
            </h1>
          </ParallaxText>
          
          <ParallaxText delay={0.6}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Comprehensive audio-visual solutions tailored for Rajasthani weddings, corporate events, and cultural
              celebrations. Serving Jaipur and across Rajasthan with technical excellence.
            </p>
          </ParallaxText>
        </div>
      </ParallaxSection>

      {/* Services Grid */}
      <ParallaxSection className="py-20" backgroundParallax>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ParallaxCard
                key={index}
                gradient={service.popular}
                delay={index * 0.1}
                className="group bg-card overflow-hidden"
              >
                <div className="relative">
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}
                  
                  <ParallaxImage
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48"
                    speed={0.2}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 right-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Starting from</div>
                      <div className="text-lg font-bold text-primary">{service.price}</div>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className="w-full cursor-glow-medium bg-transparent group"
                    variant="outline"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Packages Section */}
      <ParallaxSection className="py-20 bg-secondary/20" backgroundParallax>
        <div className="container mx-auto px-4">
          <ParallaxText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Event <span className="text-primary">Packages</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect package for your celebration or customize one just for you
            </p>
          </ParallaxText>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <ParallaxCard
                key={index}
                gradient={pkg.gradient}
                delay={index * 0.2}
                className={`p-8 bg-card text-center relative overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                    <p className="text-muted-foreground">{pkg.description}</p>
                  </div>
                  
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">{pkg.price}</div>
                    <div className="text-sm text-muted-foreground">Per event</div>
                  </div>
                  
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm justify-center">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      pkg.popular 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground btn-premium-cta' 
                        : 'cursor-glow-subtle bg-transparent'
                    } group`}
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    Choose Package
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* CTA Section */}
      <ParallaxSection className="py-20">
        <div className="container mx-auto px-4">
          <ParallaxCard gradient className="p-12 text-center bg-card">
            <ParallaxText>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Need a <span className="text-primary">Custom</span> Solution?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Every event is unique. Let's create a customized package that perfectly matches 
                your vision, budget, and requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="btn-cta-primary bg-primary hover:bg-primary/90 text-primary-foreground group"
                  asChild
                >
                  <Link href="/contact">
                    <Phone className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                    Get Custom Quote
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="cursor-glow-medium bg-transparent"
                  asChild
                >
                  <Link href="/about">
                    About Our Team
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