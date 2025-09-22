"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  Star,
  MessageSquare,
  Calendar,
  Award
} from "lucide-react"
import { AdvancedLoading } from "@/components/advanced-loading"
import { 
  ParallaxWrapper, 
  ParallaxSection, 
  ParallaxText, 
  ParallaxCard 
} from "@/components/parallax-wrapper"

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 98765 43210", "+91 87654 32109"],
    description: "Available 24/7 for emergencies",
    gradient: true
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@avevent.com", "bookings@avevent.com"],
    description: "We'll respond within 2 hours",
    gradient: false
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Pink City Plaza", "Jaipur, Rajasthan 302001"],
    description: "Open Mon-Sat, 9 AM - 8 PM",
    gradient: false
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon-Sat: 9 AM - 8 PM", "Sun: 10 AM - 6 PM"],
    description: "Emergency support 24/7",
    gradient: true
  }
]

const services = [
  "Wedding Events",
  "Corporate Events", 
  "Cultural Celebrations",
  "Private Parties",
  "Conference & Seminars",
  "Product Launches",
  "Fashion Shows",
  "Live Concerts"
]

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    eventDate: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          budget: formData.service === 'Wedding Events' ? 150000 : 
                 formData.service === 'Corporate Events' ? 100000 : 50000,
          guestCount: 100 // Default guest count
        }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setIsSubmitted(true)
        
        // Reset form after success animation
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            service: "",
            eventDate: "",
            message: ""
          })
          setIsSubmitted(false)
        }, 3000)
      } else {
        console.error('Submission failed:', result.message)
        alert('Failed to submit inquiry. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isLoading) {
    return <AdvancedLoading isLoading={isLoading} variant="dots" />
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden pt-20">
      {/* Hero Section */}
      <ParallaxSection className="py-20 bg-gradient-to-br from-background via-primary/5 to-background" backgroundParallax>
        <div className="container mx-auto px-4 text-center">
          <ParallaxText delay={0.2}>
            <Badge variant="outline" className="border-primary text-primary cursor-glow-target mb-6">
              📞 Get In Touch
            </Badge>
          </ParallaxText>
          
          <ParallaxText delay={0.4}>
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Let's Create <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Magic</span> Together
            </h1>
          </ParallaxText>
          
          <ParallaxText delay={0.6}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Ready to turn your vision into reality? Contact us today for a free consultation 
              and let's discuss how we can make your event extraordinary.
            </p>
          </ParallaxText>
        </div>
      </ParallaxSection>

      {/* Contact Info Cards */}
      <ParallaxSection className="py-20" backgroundParallax>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <ParallaxCard
                key={index}
                gradient={info.gradient}
                delay={index * 0.1}
                className="p-6 bg-card text-center"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-sm text-muted-foreground font-medium">
                        {detail}
                      </p>
                    ))}\n                  </div>
                  <p className="text-xs text-primary">{info.description}</p>
                </div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Contact Form & Map */}
      <ParallaxSection className="py-20 bg-secondary/20" backgroundParallax>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <ParallaxCard gradient className="p-8 bg-card">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
                  <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 2 hours</p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">Thank you for contacting us. We'll be in touch soon!</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Full Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                          className="cursor-glow-primary bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Phone Number *</label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          required
                          className="cursor-glow-primary bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email Address *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="cursor-glow-subtle bg-background"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Service Type *</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg cursor-glow-medium focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select a service</option>
                          {services.map((service, index) => (
                            <option key={index} value={service}>{service}</option>
                          ))}\n                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Event Date</label>
                        <Input
                          name="eventDate"
                          type="date"
                          value={formData.eventDate}
                          onChange={handleInputChange}
                          className="cursor-glow-subtle bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Message</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your event requirements, budget, and any special requests..."
                        rows={5}
                        className="cursor-glow-medium bg-background"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-success-pulse bg-primary hover:bg-primary/90 text-primary-foreground group"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </ParallaxCard>

            {/* Additional Info */}
            <div className="space-y-8">
              <ParallaxText>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Why Choose <span className="text-primary">Us</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We're not just service providers – we're your partners in creating unforgettable experiences.
                </p>
              </ParallaxText>

              <div className="space-y-6">
                <ParallaxCard delay={0.2} className="p-6 bg-card">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Award-Winning Team</h3>
                      <p className="text-sm text-muted-foreground">Recognized for excellence in event management across Rajasthan</p>
                    </div>
                  </div>
                </ParallaxCard>

                <ParallaxCard delay={0.4} className="p-6 bg-card">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">500+ Happy Clients</h3>
                      <p className="text-sm text-muted-foreground">Trusted by families and businesses for their most important events</p>
                    </div>
                  </div>
                </ParallaxCard>

                <ParallaxCard delay={0.6} className="p-6 bg-card">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">24/7 Support</h3>
                      <p className="text-sm text-muted-foreground">Always available for your questions and emergency support</p>
                    </div>
                  </div>
                </ParallaxCard>

                <ParallaxCard delay={0.8} className="p-6 bg-card">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Free Consultation</h3>
                      <p className="text-sm text-muted-foreground">Detailed planning session to understand your vision perfectly</p>
                    </div>
                  </div>
                </ParallaxCard>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>
    </div>
  )
}