"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-3 group cursor-glow-primary">
            <Image 
              src="/logo.png" 
              alt="Audio Video Events Logo" 
              width={60} 
              height={40} 
              className="h-10 w-auto group-hover:scale-105 transition-transform" 
            />
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-foreground cursor-glow-text">Audio Video</div>
              <div className="text-sm text-primary font-medium">Events</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 nav-glow ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                } group`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive(item.href) ? "w-3/4" : "group-hover:w-3/4"
                }`} />
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1 cursor-glow-text transition-colors cursor-pointer">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-1 cursor-glow-text transition-colors cursor-pointer">
                <Mail className="h-4 w-4" />
                <span>info@avevent.com</span>
              </div>
            </div>
            <Button 
              className="btn-glow-intense bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg cursor-glow-target transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <X className="h-6 w-6 text-primary" /> : 
              <Menu className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/30 rounded-lg bg-card/50 backdrop-blur-sm cursor-glow-card">
            <nav className="flex flex-col space-y-2 p-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-3 rounded-lg transition-all duration-300 cursor-glow-target ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border/50 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground px-4 cursor-glow-text">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground px-4 cursor-glow-text">
                  <Mail className="h-4 w-4" />
                  <span>info@avevent.com</span>
                </div>
                <Button 
                  className="btn-glow-intense bg-primary hover:bg-primary/90 text-primary-foreground mx-4 mt-4"
                  asChild
                >
                  <Link href="/contact">Get Quote</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
