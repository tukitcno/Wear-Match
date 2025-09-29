"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-in-right">
      <Card className="max-w-4xl mx-auto p-6 shadow-2xl border-2">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">We value your privacy</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
              By clicking "Accept All", you consent to our use of cookies. Read our{" "}
              <Link href="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </Link>{" "}
              for more information.
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button onClick={declineCookies} variant="outline" className="flex-1 md:flex-none bg-transparent">
              Decline
            </Button>
            <Button onClick={acceptCookies} className="flex-1 md:flex-none">
              Accept All
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
