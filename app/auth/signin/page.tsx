"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react"
import { AdvancedLoading } from "@/components/advanced-loading"
import { ParallaxWrapper, ParallaxText } from "@/components/parallax-wrapper"
import Link from "next/link"

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        // Get updated session to check user role
        const session = await getSession()
        if (session?.user?.role === "ADMIN" || session?.user?.role === "MANAGER") {
          router.push("/admin")
        } else {
          router.push("/home")
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isLoading) {
    return <AdvancedLoading isLoading={isLoading} loadingText="Signing you in..." />
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <ParallaxWrapper speed={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="gradient-border-glow">
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Welcome Back
                </CardTitle>
                <p className="text-muted-foreground">
                  Sign in to access your Audio Video Events account
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="pl-10 gradient-border bg-background"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 gradient-border bg-background"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !formData.email || !formData.password}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group"
                  >
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>

                <div className="mt-6 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-background text-muted-foreground">
                        Don't have an account?
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full gradient-border hover-gradient-scale"
                    asChild
                  >
                    <Link href="/auth/signup">
                      Create Account
                    </Link>
                  </Button>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    href="/home"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    ← Back to Home
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </ParallaxWrapper>
      </div>
    </div>
  )
}