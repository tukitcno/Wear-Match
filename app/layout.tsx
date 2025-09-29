import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CookieConsent } from "@/components/cookie-consent"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "wearmatch - Match Your Sneakers with Custom T-Shirts",
  description:
    "Browse sneakers and match them with custom T-shirts in various colors and designs. Create your unique style.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <div className="flex min-h-screen flex-col">
          <Suspense fallback={<div>Loading...</div>}>
            <SiteHeader />
          </Suspense>
          <main className="flex-1 animate-fade-in">{children}</main>
          <Suspense fallback={<div>Loading...</div>}>
            <SiteFooter />
          </Suspense>
        </div>
        <CookieConsent />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
