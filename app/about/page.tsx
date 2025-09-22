"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Award, 
  Clock, 
  Heart, 
  Shield, 
  Users, 
  MapPin, 
  Calendar,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Trophy,
  Target,
  Zap,
  CheckCircle
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

const values = [
  {
    icon: Heart,
    title: "Passion for Excellence",
    description: "Every event is a canvas for our creativity and technical expertise. We pour our hearts into making your special moments unforgettable.",
    gradient: true
  },
  {
    icon: Shield,
    title: "Reliability & Trust",
    description: "Dependable service delivery with backup systems for peace of mind. Your trust is our most valuable asset.",
    gradient: false
  },
  {
    icon: Clock,
    title: "Timely Execution",
    description: "Punctual setup and seamless event flow management. We understand that timing is everything in events.",
    gradient: false
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Award-winning team with certifications in audio-visual technology and event management excellence.",
    gradient: true
  },
]

const achievements = [
  { icon: Trophy, number: "500+", label: "Events Completed", color: "text-yellow-400" },
  { icon: Calendar, number: "8+", label: "Years Experience", color: "text-green-400" },
  { icon: Users, number: "25+", label: "Team Members", color: "text-blue-400" },
  { icon: MapPin, number: "12+", label: "Cities Served", color: "text-purple-400" },
]

const team = [
  {
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    experience: "12+ Years",
    specialization: "Event Strategy & Client Relations",
    image: "/professional-indian-event-management-team-with-aud.jpg"
  },
  {
    name: "Priya Sharma",
    role: "Technical Director",
    experience: "10+ Years",
    specialization: "Audio-Visual Systems & Innovation",
    image: "/indian-wedding-celebration-with-professional-light.jpg"
  },
  {
    name: "Amit Patel",
    role: "Creative Head",
    experience: "8+ Years",
    specialization: "Lighting Design & Visual Effects",
    image: "/professional-indian-event-management-team-with-aud.jpg"
  }
]

const milestones = [
  {
    year: "2016",
    title: "Company Founded",
    description: "Started with a vision to revolutionize event experiences in Rajasthan"
  },
  {
    year: "2018",
    title: "First Major Wedding",
    description: "Successfully managed a 1000+ guest royal wedding in Udaipur"
  },
  {
    year: "2020",
    title: "Digital Innovation",
    description: "Introduced live streaming and virtual event solutions during pandemic"
  },
  {
    year: "2022",
    title: "Award Recognition",
    description: "Received 'Best Event Management Company' award in Rajasthan"
  },
  {
    year: "2024",
    title: "Expansion",
    description: "Extended services to 12+ cities across North India"
  }
]

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2800)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <AdvancedLoading isLoading={isLoading} variant="bounce" />
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden pt-20">
      {/* Hero Section */}
      <ParallaxSection className="py-20 bg-gradient-to-br from-background via-primary/5 to-background" backgroundParallax>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <ParallaxText delay={0.2}>
                <Badge variant="outline" className="border-primary text-primary cursor-glow-target">
                  🏆 About AV Event Jaipur
                </Badge>
              </ParallaxText>
              
              <ParallaxText delay={0.4}>
                <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6">
                  Creating <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Unforgettable</span> Experiences
                </h1>
              </ParallaxText>
              
              <ParallaxText delay={0.6}>
                <p className="text-lg text-muted-foreground text-pretty mb-6">
                  Based in the Pink City of Jaipur, AV Event Jaipur has been transforming celebrations and corporate
                  gatherings across Rajasthan since 2016. We specialize in providing comprehensive audio-visual solutions
                  that blend modern technology with the rich cultural heritage of Rajasthan.
                </p>
              </ParallaxText>
              
              <ParallaxText delay={0.8}>
                <p className="text-lg text-muted-foreground text-pretty">
                  From grand Rajasthani weddings in heritage hotels to corporate conferences in modern venues, we bring
                  technical excellence and creative vision to every event. Our motto "We Make Memories" reflects our
                  commitment to creating experiences that last a lifetime.
                </p>
              </ParallaxText>

              {/* Achievements */}
              <ParallaxText delay={1.0}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  {achievements.map((achievement, index) => (
                    <motion.div 
                      key={index} 
                      className="text-center group"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <achievement.icon className={`h-8 w-8 mx-auto mb-2 ${achievement.color} group-hover:scale-110 transition-transform`} />
                      <div className="text-3xl font-bold text-primary mb-1">{achievement.number}</div>
                      <div className="text-sm text-muted-foreground">{achievement.label}</div>
                    </motion.div>
                  ))}
                </div>
              </ParallaxText>
            </div>

            {/* Image */}
            <ParallaxWrapper speed={0.3} className="relative">
              <div className="cursor-glow-card rounded-2xl overflow-hidden">
                <ParallaxImage
                  src="/professional-indian-event-management-team-with-aud.jpg"
                  alt="Audio Video Events Team"
                  className="aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <motion.div
                  className="absolute bottom-8 left-8 right-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold text-foreground mb-2">Meet Our Expert Team</h3>
                  <p className="text-muted-foreground">
                    Certified professionals with decades of combined experience
                  </p>
                </motion.div>
              </div>
            </ParallaxWrapper>
          </div>
        </div>
      </ParallaxSection>

      {/* Values Section */}
      <ParallaxSection className="py-20" backgroundParallax>
        <div className="container mx-auto px-4">
          <ParallaxText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-primary">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </ParallaxText>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <ParallaxCard
                key={index}
                gradient={value.gradient}
                delay={index * 0.2}
                className="p-6 bg-card"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Team Section */}
      <ParallaxSection className="py-20 bg-secondary/20" backgroundParallax>
        <div className="container mx-auto px-4">
          <ParallaxText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Meet Our <span className="text-primary">Leadership</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The passionate professionals behind your perfect events
            </p>
          </ParallaxText>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <ParallaxCard
                key={index}
                gradient={index === 1}
                delay={index * 0.2}
                className="bg-card text-center overflow-hidden"
              >
                <div className="relative">
                  <ParallaxImage
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64"
                    speed={0.2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <div className="text-sm text-primary font-medium">{member.experience}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.specialization}</p>
                </div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Journey Timeline */}
      <ParallaxSection className="py-20" backgroundParallax>
        <div className="container mx-auto px-4">
          <ParallaxText className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-primary">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key milestones in our quest to create perfect events
            </p>
          </ParallaxText>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-30"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <ParallaxWrapper key={index} speed={0.1} className="relative">
                  <motion.div
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="cursor-glow-primary p-6 bg-card rounded-lg">
                        <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                    </div>
                    
                    <div className="flex-1"></div>
                  </motion.div>
                </ParallaxWrapper>
              ))}
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* CTA Section */}
      <ParallaxSection className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <ParallaxCard gradient className="p-12 text-center bg-card">
            <ParallaxText>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to Work with <span className="text-primary">The Best</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's bring our expertise, passion, and creativity to your next event. 
                Experience the difference that true professionals make.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground group"
                  asChild
                >
                  <Link href="/contact">
                    <Phone className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                    Start Your Project
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="cursor-glow-primary bg-transparent"
                  asChild
                >
                  <Link href="/services">
                    <Target className="mr-2 h-4 w-4" />
                    View Our Services
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