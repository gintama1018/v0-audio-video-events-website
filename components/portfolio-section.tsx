"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Play, Eye } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const portfolioItems = [
  {
    title: "Arjun & Kavya Wedding",
    location: "Udaipur Palace, Rajasthan",
    date: "December 2024",
    guests: "800 Guests",
    category: "Wedding",
    image: "/luxury-indian-wedding-with-professional-lighting-s.jpg",
    description: "A royal wedding celebration with traditional Rajasthani elements and modern AV technology.",
  },
  {
    title: "TCS Annual Conference",
    location: "Hyderabad Convention Center",
    date: "November 2024",
    guests: "1200 Attendees",
    category: "Corporate",
    image: "/modern-corporate-conference-with-led-screens-and-p.jpg",
    description: "Large-scale corporate event with multiple LED screens and simultaneous translation services.",
  },
  {
    title: "Diwali Celebration",
    location: "Mumbai Club, Maharashtra",
    date: "October 2024",
    guests: "500 Guests",
    category: "Festival",
    image: "/diwali-celebration-with-colorful-lighting-and-trad.jpg",
    description: "Traditional Diwali celebration with cultural performances and festive lighting design.",
  },
  {
    title: "Rohit & Sneha Sangam",
    location: "Goa Beach Resort",
    date: "September 2024",
    guests: "300 Guests",
    category: "Wedding",
    image: "/beach-wedding-setup-with-professional-sound-system.jpg",
    description: "Beachside wedding with weather-resistant equipment and sunset ceremony setup.",
  },
  {
    title: "Infosys Product Launch",
    location: "Bangalore Tech Park",
    date: "August 2024",
    guests: "600 Attendees",
    category: "Corporate",
    image: "/tech-product-launch-event-with-modern-led-displays.jpg",
    description: "High-tech product launch with interactive displays and live streaming to global audience.",
  },
  {
    title: "Ganesh Chaturthi Festival",
    location: "Pune Community Center",
    date: "August 2024",
    guests: "1000 Devotees",
    category: "Festival",
    image: "/ganesh-chaturthi-celebration-with-traditional-musi.jpg",
    description: "Community festival with traditional music systems and crowd management solutions.",
  },
]

export function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const categories = ["All", "Wedding", "Corporate", "Festival"]

  const filteredItems =
    selectedCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === selectedCategory)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [filteredItems])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const scrolled = window.pageYOffset
      const parallaxElements = sectionRef.current.querySelectorAll(".parallax-item")

      parallaxElements.forEach((element, index) => {
        const rate = scrolled * -0.5 * (index % 2 === 0 ? 1 : -1)
        const yPos = -(rate / 8)
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Background parallax elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="parallax-item absolute top-20 left-10 w-32 h-32 bg-red-500/5 rounded-full blur-xl"></div>
        <div className="parallax-item absolute top-40 right-20 w-24 h-24 bg-red-500/10 rounded-full blur-lg"></div>
        <div className="parallax-item absolute bottom-20 left-1/4 w-40 h-40 bg-red-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
            Our <span className="text-primary">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty animate-fade-in-up animation-delay-300">
            Discover the magic we've created for clients across India. From intimate celebrations to grand spectacles.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12 animate-fade-in-up animation-delay-600">
          <div className="flex flex-wrap gap-2 bg-card/50 backdrop-blur-sm p-2 rounded-full border border-border">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={`${item.title}-${selectedCategory}`}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`parallax-item transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="bg-card border-border overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Overlay buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                      <Eye className="h-5 w-5 text-white" />
                    </button>
                    <button className="w-12 h-12 bg-red-600/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 transform hover:scale-110">
                      <Play className="h-5 w-5 text-white ml-0.5" />
                    </button>
                  </div>

                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{item.guests}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent transform hover:scale-105 transition-all duration-300"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
