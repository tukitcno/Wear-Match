import type { Metadata } from "next"
import { Truck, Package, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Shipping Information - wearmatch",
  description: "Learn about our shipping options, delivery times, and international shipping.",
}

export default function ShippingPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">Shipping Information</h1>

      <div className="space-y-8">
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">Domestic Shipping</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>We offer the following shipping options for orders within the United States:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Standard Shipping (5-7 business days):</strong> $5.99 - FREE on orders over $100
              </li>
              <li>
                <strong>Express Shipping (2-3 business days):</strong> $14.99
              </li>
              <li>
                <strong>Overnight Shipping (1 business day):</strong> $24.99
              </li>
            </ul>
            <p>
              Orders are processed within 1-2 business days. You will receive a tracking number via email once your
              order ships.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">International Shipping</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              We ship to over 50 countries worldwide. International shipping rates and delivery times vary by location:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Canada:</strong> 7-14 business days, starting at $15
              </li>
              <li>
                <strong>Europe:</strong> 10-21 business days, starting at $25
              </li>
              <li>
                <strong>Asia & Pacific:</strong> 14-28 business days, starting at $30
              </li>
              <li>
                <strong>Rest of World:</strong> 14-35 business days, starting at $35
              </li>
            </ul>
            <p>
              International orders may be subject to customs duties and taxes, which are the responsibility of the
              recipient. Delivery times do not include customs clearance.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">Order Tracking</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Once your order ships, you'll receive a confirmation email with a tracking number. You can track your
              package using this number or by logging into your account and viewing your order history.
            </p>
            <p>
              If you haven't received your tracking information within 2 business days of placing your order, please
              contact our customer support team.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Shipping Restrictions</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Please note the following shipping restrictions:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do not ship to P.O. boxes for express or overnight shipping</li>
              <li>Some remote areas may require additional delivery time</li>
              <li>We cannot ship to military APO/FPO addresses at this time</li>
              <li>Certain products may have shipping restrictions based on destination</li>
            </ul>
          </div>
        </section>

        <div className="mt-8 p-6 bg-muted/40 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
          <p className="text-muted-foreground">
            If you have questions about shipping or need assistance with your order, please{" "}
            <a href="/contact" className="text-primary hover:underline">
              contact our support team
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
