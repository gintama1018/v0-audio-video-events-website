import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { GlobalCursor } from "@/components/global-cursor"
import { AnimationProvider } from "@/components/animation-provider"
import { ScrollAnimations } from "@/components/scroll-animations"
import { Header } from "@/components/header"
import { AuthProvider } from "@/components/auth-provider"
import { CursorGlowTracker } from "@/components/cursor-glow-tracker"
import { AdvancedLoading } from "@/components/advanced-loading"
import "./globals.css"

export const metadata: Metadata = {
  title: "Audio Video Events - We Make Memories | Professional Event Services in India",
  description:
    "Premier audio-visual event management company in India. Specializing in weddings, corporate events, and celebrations. Professional sound, lighting, and video services.",
  generator: "v0.app",
  keywords:
    "audio video events, wedding planning, corporate events, sound system, lighting, video production, event management, India",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <AnimationProvider>
            <CursorGlowTracker />
            <GlobalCursor />
            <ScrollAnimations />
            <Header />
            <Suspense fallback={<AdvancedLoading isLoading={true} />}>
              {children}
            </Suspense>
            <Analytics />
          </AnimationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
