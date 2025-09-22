"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail
} from "lucide-react"
import { AdvancedLoading } from "@/components/advanced-loading"
import { ParallaxWrapper, ParallaxText, ParallaxCard } from "@/components/parallax-wrapper"

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  serviceType: string
  eventDate: string | null
  message: string | null
  status: string
  priority: string
  createdAt: string
}

interface DashboardStats {
  totalInquiries: number
  pendingInquiries: number
  convertedInquiries: number
  totalRevenue: number
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalInquiries: 0,
    pendingInquiries: 0,
    convertedInquiries: 0,
    totalRevenue: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/signin")
      return
    }

    if (session.user.role !== "ADMIN" && session.user.role !== "MANAGER") {
      router.push("/home")
      return
    }

    fetchDashboardData()
  }, [session, status, router])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/inquiries?limit=5")
      const data = await response.json()
      
      if (data.success) {
        setInquiries(data.data)
        
        // Calculate stats
        const total = data.pagination.total
        const pending = data.data.filter((i: Inquiry) => i.status === "PENDING").length
        const converted = data.data.filter((i: Inquiry) => i.status === "CONVERTED").length
        
        setStats({
          totalInquiries: total,
          pendingInquiries: pending,
          convertedInquiries: converted,
          totalRevenue: converted * 75000 // Average revenue per conversion
        })
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { variant: "secondary" as const, icon: Clock },
      CONTACTED: { variant: "default" as const, icon: Phone },
      QUOTED: { variant: "default" as const, icon: DollarSign },
      CONVERTED: { variant: "default" as const, icon: CheckCircle },
      LOST: { variant: "destructive" as const, icon: AlertCircle },
      SPAM: { variant: "destructive" as const, icon: Trash2 }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT": return "text-red-500"
      case "HIGH": return "text-orange-500"
      case "MEDIUM": return "text-yellow-500"
      case "LOW": return "text-green-500"
      default: return "text-gray-500"
    }
  }

  if (status === "loading" || isLoading) {
    return <AdvancedLoading isLoading={true} loadingText="Loading Dashboard..." />
  }

  return (
    <div className="min-h-screen bg-background pt-20 px-4">
      <div className="container mx-auto py-8">
        {/* Header */}
        <ParallaxText>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {session?.user?.name || "Admin"}! Here's your business overview.
            </p>
          </div>
        </ParallaxText>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ParallaxCard delay={0.1} className="p-6 bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Inquiries</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalInquiries}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </div>
          </ParallaxCard>

          <ParallaxCard delay={0.2} className="p-6 bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-foreground">{stats.pendingInquiries}</p>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded-full">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </ParallaxCard>

          <ParallaxCard delay={0.3} className="p-6 bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Converted</p>
                <p className="text-3xl font-bold text-foreground">{stats.convertedInquiries}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </ParallaxCard>

          <ParallaxCard delay={0.4} className="p-6 bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-3xl font-bold text-foreground">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </ParallaxCard>
        </div>

        {/* Recent Inquiries */}
        <ParallaxCard gradient className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Inquiries</span>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inquiries.map((inquiry, index) => (
                <motion.div
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/20 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(inquiry.priority)} bg-current`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {inquiry.name}
                        </p>
                        {getStatusBadge(inquiry.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {inquiry.serviceType}
                      </p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {inquiry.email}
                        </span>
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {inquiry.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </ParallaxCard>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ParallaxCard delay={0.2} className="p-6 bg-card text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Manage Users</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add, edit, or remove user accounts
            </p>
            <Button variant="outline" className="w-full">
              User Management
            </Button>
          </ParallaxCard>

          <ParallaxCard delay={0.4} className="p-6 bg-card text-center">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Event Calendar</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View and manage upcoming events
            </p>
            <Button variant="outline" className="w-full">
              View Calendar
            </Button>
          </ParallaxCard>

          <ParallaxCard delay={0.6} className="p-6 bg-card text-center">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Analytics</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View detailed reports and metrics
            </p>
            <Button variant="outline" className="w-full">
              View Reports
            </Button>
          </ParallaxCard>
        </div>
      </div>
    </div>
  )
}