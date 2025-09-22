"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Heart, 
  Eye, 
  Calendar,
  MapPin,
  Filter,
  Grid3X3,
  List,
  Star,
  PlayCircle,
  ImageIcon,
  ExternalLink
} from "lucide-react"
import { AdvancedLoading } from "@/components/advanced-loading"
import { 
  ParallaxWrapper, 
  ParallaxSection, 
  ParallaxText, 
  ParallaxCard 
} from "@/components/parallax-wrapper"

interface PortfolioItem {
  id: string
  title: string
  description: string | null
  eventType: string
  location: string | null
  eventDate: string | null
  images: string[]
  videos: string[]
  featured: boolean
  tags: string[]
  createdAt: string
}

const eventTypeFilters = [
  { value: '', label: 'All Events' },
  { value: 'WEDDING', label: 'Weddings' },
  { value: 'CORPORATE', label: 'Corporate' },
  { value: 'BIRTHDAY', label: 'Birthdays' },
  { value: 'CULTURAL', label: 'Cultural' },
  { value: 'CONCERT', label: 'Concerts' },
  { value: 'OTHER', label: 'Others' }
]

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  useEffect(() => {
    fetchPortfolioItems()
  }, [selectedFilter])

  const fetchPortfolioItems = async () => {
    setIsLoading(true)
    try {
      const queryParams = new URLSearchParams({
        isPublic: 'true',
        ...(selectedFilter && { eventType: selectedFilter })
      })
      
      const response = await fetch(`/api/portfolio?${queryParams}`)
      const data = await response.json()
      
      if (data.success) {
        setPortfolioItems(data.data)
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getEventTypeColor = (eventType: string) => {
    const colors = {
      WEDDING: "bg-pink-100 text-pink-800",
      CORPORATE: "bg-blue-100 text-blue-800",
      BIRTHDAY: "bg-yellow-100 text-yellow-800",
      CULTURAL: "bg-purple-100 text-purple-800",
      CONCERT: "bg-green-100 text-green-800",
      OTHER: "bg-gray-100 text-gray-800"
    }
    return colors[eventType as keyof typeof colors] || colors.OTHER
  }

  if (isLoading) {
    return <AdvancedLoading isLoading={isLoading} variant="spinner" />
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden pt-20 relative">
      {/* Enhanced Background with Animated Gradients */}
      <div className="fixed inset-0 z-0">
        {/* Animated Background Image Carousel */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-[3000ms] ease-in-out"
            style={{
              backgroundImage: `url('/indian-wedding-celebration-with-professional-light.jpg')`,
              animation: 'backgroundSlide 15s infinite'
            }}
          />
        </div>
        
        {/* Animated Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-primary/20 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />
        
        {/* Moving Light Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-96 h-96 rounded-full opacity-10"
              style={{
                background: `radial-gradient(circle, ${i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#8b5cf6'} 0%, transparent 70%)`,
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
                animation: `float${i + 1} ${8 + i * 2}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Hero Section with 3D Glass Effects */}
      <ParallaxSection className="py-20 hero-3d relative z-10" backgroundParallax>
        <div className="hero-background" />
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Floating Glass Elements */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="floating-element glass-primary"
              style={{
                width: `${40 + i * 15}px`,
                height: `${40 + i * 15}px`,
                top: `${Math.random() * 70 + 15}%`,
                left: `${Math.random() * 80 + 10}%`,
                borderRadius: i % 2 === 0 ? '50%' : '20%',
                animationDelay: `${i * 0.7}s`
              }}
            />
          ))}
          
          <ParallaxText delay={0.2}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Badge variant="outline" className="border-primary text-primary glass-primary btn-3d cursor-glow-target mb-8">
                📸 Our Work Portfolio
              </Badge>
            </motion.div>
          </ParallaxText>
          
          <ParallaxText delay={0.4}>
            <motion.h1 
              className="hero-title mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="block">Memories We've</span>
              <span className="block text-primary">Created</span>
            </motion.h1>
          </ParallaxText>
          
          <ParallaxText delay={0.6}>
            <motion.div
              className="glass-card p-8 max-w-4xl mx-auto rounded-3xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="hero-subtitle">
                Explore our collection of successful events and celebrations. Each project represents 
                our commitment to excellence and our passion for creating unforgettable experiences.
              </p>
            </motion.div>
          </ParallaxText>
        </div>
      </ParallaxSection>

      {/* Enhanced Filters and View Controls */}
      <ParallaxSection className="py-8 glass-dark backdrop-blur-xl relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Enhanced Event Type Filters */}
            <div className="flex flex-wrap gap-3">
              {eventTypeFilters.map((filter, index) => (
                <motion.div
                  key={filter.value}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Button
                    variant={selectedFilter === filter.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter.value)}
                    className={selectedFilter === filter.value ? 
                      "bg-primary text-primary-foreground btn-3d glass-primary cursor-glow-primary" : 
                      "glass border-white/20 hover:bg-white/10 cursor-glow-subtle btn-3d"
                    }
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {filter.label}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Enhanced View Mode Toggle */}
            <motion.div 
              className="flex items-center gap-2 glass-card p-1 rounded-lg"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Button
                variant={viewMode === 'grid' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 
                  "bg-primary text-primary-foreground btn-3d" : 
                  "hover:bg-white/10 cursor-glow-subtle"
                }
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 
                  "bg-primary text-primary-foreground btn-3d" : 
                  "hover:bg-white/10 cursor-glow-subtle"
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Enhanced Interactive Portfolio Grid */}
      <ParallaxSection className="py-20 relative z-10" backgroundParallax>
        <div className="container mx-auto px-4">
          {portfolioItems.length === 0 ? (
            <div className="text-center py-12">
              <motion.div
                className="glass-card p-12 rounded-3xl max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Portfolio Items Found</h3>
                <p className="text-muted-foreground">
                  {selectedFilter ? 
                    'No events found for the selected category. Try a different filter.' :
                    'Portfolio items will appear here once they are added.'
                  }
                </p>
              </motion.div>
            </div>
          ) : (
            <div className={`portfolio-grid transform-3d ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}>
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="portfolio-item glass-card cursor-glow-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="portfolio-content">
                    {/* Enhanced Featured Badge */}
                    {item.featured && (
                      <motion.div 
                        className="absolute top-4 left-4 z-20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      >
                        <Badge className="glass-primary text-white border-primary/30 btn-3d">
                          <Star className="w-3 h-3 mr-1 text-yellow-400" />
                          Featured
                        </Badge>
                      </motion.div>
                    )}

                    {/* Enhanced Portfolio Image with 3D Effects */}
                    <div className="portfolio-image relative overflow-hidden rounded-t-3xl">
                      {item.images.length > 0 ? (
                        <motion.img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/indian-wedding-celebration-with-professional-light.jpg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <ImageIcon className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                      
                      {/* Enhanced Glass Overlay with Action Buttons */}
                      <motion.div 
                        className="absolute inset-0 glass-dark opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4"
                        whileHover={{ backdropFilter: "blur(20px)" }}
                      >
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Button
                            size="sm"
                            className="glass-primary text-white border-white/30 btn-3d cursor-glow-primary"
                            onClick={() => setSelectedItem(item)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </motion.div>
                        {item.videos.length > 0 && (
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Button
                              size="sm"
                              className="glass text-white border-white/30 btn-3d cursor-glow-primary"
                            >
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Watch Video
                            </Button>
                          </motion.div>
                        )}
                      </motion.div>
                      
                      {/* Enhanced Image Count Indicator */}
                      {item.images.length > 1 && (
                        <motion.div 
                          className="absolute top-4 right-4 glass-dark text-white px-3 py-1 rounded-full text-sm font-medium"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
                        >
                          +{item.images.length - 1}
                        </motion.div>
                      )}
                    </div>

                    {/* Enhanced Card Content with Glass Effect */}
                    <div className="p-6 space-y-4 bg-gradient-to-b from-card/80 to-card backdrop-blur-sm">
                      {/* Enhanced Event Type Badge */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <Badge className={`${getEventTypeColor(item.eventType)} btn-3d cursor-glow-subtle`}>
                          {item.eventType.charAt(0) + item.eventType.slice(1).toLowerCase()}
                        </Badge>
                      </motion.div>

                      {/* Enhanced Title and Description */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-glow-text">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </motion.div>

                      {/* Enhanced Event Details */}
                      <motion.div 
                        className="flex items-center gap-4 text-sm text-muted-foreground"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        {item.eventDate && (
                          <div className="flex items-center cursor-glow-subtle p-2 rounded-lg hover:bg-primary/10 transition-colors">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(item.eventDate).toLocaleDateString()}
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center cursor-glow-subtle p-2 rounded-lg hover:bg-primary/10 transition-colors">
                            <MapPin className="h-4 w-4 mr-1" />
                            {item.location}
                          </div>
                        )}
                      </motion.div>

                      {/* Enhanced Tags */}
                      {item.tags.length > 0 && (
                        <motion.div 
                          className="flex flex-wrap gap-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          {item.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs glass cursor-glow-subtle">
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs glass cursor-glow-subtle">
                              +{item.tags.length - 3}
                            </Badge>
                          )}
                        </motion.div>
                      )}

                      {/* Enhanced Action Button */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full btn-3d glass border-primary/30 hover:bg-primary/10 cursor-glow-primary group"
                          onClick={() => setSelectedItem(item)}
                        >
                          View Full Project
                          <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:scale-110 transition-transform" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </ParallaxSection>

      {/* Enhanced CTA Section */}
      <ParallaxSection className="py-20 glass-dark backdrop-blur-xl relative z-10">
        <div className="container mx-auto px-4">
          <ParallaxCard gradient className="interactive-card glass-card p-12 text-center">
            <ParallaxText>
              <motion.h2 
                className="hero-subtitle text-3xl lg:text-4xl font-bold mb-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                Ready to Create Your Own <span className="text-primary">Masterpiece</span>?
              </motion.h2>
              <motion.p 
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Let's work together to create an event that will be remembered for years to come. 
                Your vision, our expertise, unforgettable results.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground btn-3d glass-primary cursor-glow-primary group"
                >
                  Start Your Project
                  <Heart className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-3d glass border-primary/30 hover:bg-primary/10 cursor-glow-subtle"
                >
                  View All Services
                </Button>
              </motion.div>
            </ParallaxText>
          </ParallaxCard>
        </div>
      </ParallaxSection>
    </div>
  )
}