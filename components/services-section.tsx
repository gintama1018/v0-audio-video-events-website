import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2, Lightbulb, Video, Camera, Monitor, Music, Zap } from "lucide-react"

const services = [
  {
    icon: Volume2,
    title: "Professional Sound Systems",
    description:
      "Crystal-clear audio solutions for Rajasthani weddings, corporate events, and cultural celebrations. From intimate mehendi to grand baraat ceremonies.",
    features: ["Wireless Microphones", "Line Array Speakers", "Traditional Music Setup"],
  },
  {
    icon: Lightbulb,
    title: "Event Lighting Design",
    description:
      "Transform your venue with stunning lighting designs. Specialized in heritage venue lighting, LED walls, and traditional Rajasthani ambiance.",
    features: ["Heritage Venue Lighting", "LED Stage Design", "Cultural Theme Lighting"],
  },
  {
    icon: Video,
    title: "Video Production & Live Streaming",
    description:
      "Capture every precious moment with our professional videography. 4K recording, live streaming, and same-day highlight reels for your special occasions.",
    features: ["4K Wedding Films", "Live Streaming", "Same-Day Highlights"],
  },
  {
    icon: Camera,
    title: "Photography Services",
    description:
      "Professional event photography that captures the essence of Rajasthani celebrations. Traditional portraits, candid moments, and aerial photography.",
    features: ["Traditional Portraits", "Candid Photography", "Drone Coverage"],
  },
  {
    icon: Monitor,
    title: "LED Screens & Displays",
    description:
      "High-resolution LED screens and projection systems perfect for presentations, entertainment, and visual storytelling at your events.",
    features: ["Giant LED Walls", "Projection Mapping", "Interactive Displays"],
  },
  {
    icon: Music,
    title: "DJ & Entertainment",
    description:
      "Professional DJs specializing in Bollywood, Rajasthani folk, and international music. Complete entertainment solutions for all celebrations.",
    features: ["Bollywood DJs", "Folk Music Setup", "Karaoke Systems"],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Comprehensive audio-visual solutions tailored for Rajasthani weddings, corporate events, and cultural
            celebrations. Serving Jaipur and across Rajasthan with technical excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 group"
            >
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
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Get Custom Quote
          </Button>
        </div>
      </div>
    </section>
  )
}
