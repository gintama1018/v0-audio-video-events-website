"use client"

import { Header } from "@/components/header"
import { VideoHeroSection } from "@/components/video-hero-section"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className={`min-h-screen transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <Header />
      <VideoHeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
