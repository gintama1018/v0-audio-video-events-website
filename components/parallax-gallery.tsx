"use client"

import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GalleryItem {
  id: number
  type: "image" | "video"
  src: string
  thumbnail: string
  title: string
  category: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: "image",
    src: "/indian-wedding-mandap-with-professional-lighting.jpg",
    thumbnail: "/indian-wedding-mandap-with-professional-lighting.jpg",
    title: "Wedding Mandap Setup",
    category: "Wedding",
  },
  {
    id: 2,
    type: "video",
    src: "/placeholder.mp4?height=720&width=1280&query=corporate event with led screens and presentations",
    thumbnail: "/corporate-event-with-led-screens-and-presentations.jpg",
    title: "Corporate Event Highlights",
    category: "Corporate",
  },
  {
    id: 3,
    type: "image",
    src: "/diwali-celebration-with-colorful-lights-and-decora.jpg",
    thumbnail: "/diwali-celebration-with-colorful-lights-and-decora.jpg",
    title: "Festival Lighting Design",
    category: "Festival",
  },
  {
    id: 4,
    type: "image",
    src: "/beach-wedding-setup-with-sound-system-at-sunset.jpg",
    thumbnail: "/beach-wedding-setup-with-sound-system-at-sunset.jpg",
    title: "Beach Wedding Audio Setup",
    category: "Wedding",
  },
  {
    id: 5,
    type: "video",
    src: "/placeholder.mp4?height=720&width=1280&query=product launch event with interactive displays",
    thumbnail: "/product-launch-event-with-interactive-displays.jpg",
    title: "Product Launch Experience",
    category: "Corporate",
  },
  {
    id: 6,
    type: "image",
    src: "/ganesh-chaturthi-celebration-with-traditional-musi.jpg",
    thumbnail: "/ganesh-chaturthi-celebration-with-traditional-musi.jpg",
    title: "Traditional Festival Audio",
    category: "Festival",
  },
]

export function ParallaxGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return

      const scrolled = window.pageYOffset
      const items = galleryRef.current.querySelectorAll(".gallery-item")

      items.forEach((item, index) => {
        const rate = scrolled * -0.3
        const yPos = rate * (index % 2 === 0 ? 1 : -1)
        ;(item as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item)
    setCurrentIndex(galleryItems.findIndex((i) => i.id === item.id))
  }

  const closeLightbox = () => {
    setSelectedItem(null)
  }

  const nextItem = () => {
    const nextIndex = (currentIndex + 1) % galleryItems.length
    setCurrentIndex(nextIndex)
    setSelectedItem(galleryItems[nextIndex])
  }

  const prevItem = () => {
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
    setCurrentIndex(prevIndex)
    setSelectedItem(galleryItems[prevIndex])
  }

  return (
    <>
      <div ref={galleryRef} className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            className="gallery-item break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg"
            onClick={() => openLightbox(item)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative">
              <img
                src={item.thumbnail || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-red-600/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="h-6 w-6 text-white ml-1" />
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                <span className="text-white/80 text-xs bg-red-600/80 px-2 py-1 rounded-full">{item.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {selectedItem.type === "image" ? (
              <img
                src={selectedItem.src || "/placeholder.svg"}
                alt={selectedItem.title}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video src={selectedItem.src} controls autoPlay className="max-w-full max-h-full" />
            )}

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-xl font-semibold mb-2">{selectedItem.title}</h3>
              <span className="bg-red-600 px-3 py-1 rounded-full text-sm">{selectedItem.category}</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={prevItem}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={nextItem}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      )}
    </>
  )
}
