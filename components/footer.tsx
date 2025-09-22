import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Heart } from "lucide-react"

const services = [
  "Wedding Events",
  "Corporate Functions",
  "Birthday Parties",
  "Festival Celebrations",
  "Conference & Seminars",
  "Product Launches",
]

const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"]

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Audio Video Events Logo" width={60} height={40} className="h-10 w-auto" />
            </div>
            <p className="text-muted-foreground text-sm">
              Premier audio-visual event management company in India. We transform ordinary moments into extraordinary
              memories with cutting-edge technology and creative excellence.
            </p>
            <div className="flex space-x-3">
              <Button
                size="sm"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Cities We Serve</h3>
            <ul className="space-y-3">
              {cities.map((city, index) => (
                <li key={index}>
                  <span className="text-muted-foreground text-sm">{city}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-primary mt-1" />
                <div className="text-sm">
                  <p className="text-muted-foreground">+91 98765 43210</p>
                  <p className="text-muted-foreground">+91 87654 32109</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-primary mt-1" />
                <div className="text-sm">
                  <p className="text-muted-foreground">info@audiovideoevents.in</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <div className="text-sm">
                  <p className="text-muted-foreground">123 Event Plaza, Bandra West</p>
                  <p className="text-muted-foreground">Mumbai, Maharashtra 400050</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">© 2024 Audio Video Events. All rights reserved.</p>
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="h-4 w-4 text-primary mx-1" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
