"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Check, 
  X, 
  AlertTriangle, 
  Star, 
  Heart,
  Zap,
  Crown,
  Phone,
  Mail,
  MessageSquare
} from "lucide-react"

export function GlowShowcase() {
  return (
    <div className="space-y-12">
      {/* Success/Error/Warning States */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">State-Based Glows</h3>
        <div className="flex flex-wrap gap-4">
          <Button className="btn-success-pulse bg-green-600 hover:bg-green-700 text-white">
            <Check className="mr-2 h-4 w-4" />
            Success Action
          </Button>
          <Button className="btn-error-pulse bg-red-600 hover:bg-red-700 text-white">
            <X className="mr-2 h-4 w-4" />
            Error Action
          </Button>
          <Button className="btn-warning-pulse bg-yellow-600 hover:bg-yellow-700 text-white">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Warning Action
          </Button>
        </div>
      </div>

      {/* Hierarchical Intensities */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Glow Intensities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-glow-subtle">
            <CardHeader>
              <CardTitle className="text-lg">Subtle Glow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">For secondary elements and quiet interactions.</p>
              <Button className="cursor-glow-subtle mt-4 w-full" variant="outline">
                Hover Me
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-glow-medium">
            <CardHeader>
              <CardTitle className="text-lg">Medium Glow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">For standard interactive elements.</p>
              <Button className="cursor-glow-medium mt-4 w-full" variant="outline">
                Hover Me
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-glow-intense">
            <CardHeader>
              <CardTitle className="text-lg">Intense Glow</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">For primary and important elements.</p>
              <Button className="cursor-glow-intense mt-4 w-full" variant="outline">
                Hover Me
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Animated Pulse Effects */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Call-to-Action Pulses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="btn-cta-primary bg-primary hover:bg-primary/90 text-primary-foreground">
            <Heart className="mr-2 h-4 w-4" />
            Primary CTA
          </Button>
          <Button className="btn-cta-secondary" variant="outline">
            <Star className="mr-2 h-4 w-4" />
            Secondary CTA
          </Button>
          <Button className="btn-premium-cta bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <Crown className="mr-2 h-4 w-4" />
            Premium CTA
          </Button>
          <Button className="btn-cta-subtle" variant="ghost">
            <Zap className="mr-2 h-4 w-4" />
            Subtle CTA
          </Button>
        </div>
      </div>

      {/* Contact Actions */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Contact Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button className="btn-success-pulse bg-green-600 hover:bg-green-700 text-white">
            <Phone className="mr-2 h-4 w-4" />
            Call Now
          </Button>
          <Button className="btn-pulse-primary bg-blue-600 hover:bg-blue-700 text-white">
            <Mail className="mr-2 h-4 w-4" />
            Email Us
          </Button>
          <Button className="btn-pulse-hover" variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Live Chat
          </Button>
        </div>
      </div>

      {/* State Badges */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">State Indicators</h3>
        <div className="flex flex-wrap gap-4">
          <Badge className="cursor-glow-success bg-green-100 text-green-800 hover:bg-green-200">
            ✓ Available
          </Badge>
          <Badge className="cursor-glow-error bg-red-100 text-red-800 hover:bg-red-200">
            ✗ Unavailable
          </Badge>
          <Badge className="cursor-glow-warning bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            ⚠ Limited
          </Badge>
          <Badge className="cursor-glow-intense bg-purple-100 text-purple-800 hover:bg-purple-200">
            ★ Featured
          </Badge>
        </div>
      </div>
    </div>
  )
}