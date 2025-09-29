import { Shield, Lock, Truck, RefreshCw } from "lucide-react"

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "Secure Checkout",
      description: "SSL encrypted",
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description: "Your data is safe",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $100",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day guarantee",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
      {badges.map((badge, index) => (
        <div key={index} className="flex flex-col items-center text-center gap-2 p-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <badge.icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-sm">{badge.title}</p>
            <p className="text-xs text-muted-foreground">{badge.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
