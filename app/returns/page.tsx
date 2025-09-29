import type { Metadata } from "next"
import { RefreshCw, AlertCircle, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Returns & Refunds - wearmatch",
  description: "Learn about our return policy, refund process, and how to initiate a return.",
}

export default function ReturnsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">Returns & Refunds</h1>

      <div className="space-y-8">
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <RefreshCw className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">Return Policy</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              We want you to be completely satisfied with your purchase. If you're not happy with your order, we accept
              returns within 30 days of delivery.
            </p>
            <p>To be eligible for a return, items must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be unworn, unwashed, and in original condition</li>
              <li>Have all original tags attached</li>
              <li>Be in original packaging when possible</li>
              <li>Include proof of purchase (order confirmation or receipt)</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">Non-Returnable Items</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>The following items cannot be returned:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Custom-designed or personalized items</li>
              <li>Items marked as final sale</li>
              <li>Gift cards</li>
              <li>Items without original tags or in worn/washed condition</li>
              <li>Items returned after 30 days from delivery</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">How to Return an Item</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Initiate your return:</strong> Log into your account and go to your order history. Select the
                order you want to return and click "Request Return."
              </li>
              <li>
                <strong>Print your return label:</strong> You'll receive a prepaid return shipping label via email
                within 24 hours.
              </li>
              <li>
                <strong>Pack your items:</strong> Place items in original packaging if possible, or use a sturdy box.
                Include your order confirmation.
              </li>
              <li>
                <strong>Ship your return:</strong> Attach the return label to your package and drop it off at any
                authorized shipping location.
              </li>
              <li>
                <strong>Track your return:</strong> Use the tracking number on your return label to monitor your return
                shipment.
              </li>
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Refund Process</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Once we receive your return:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We'll inspect the items within 2-3 business days</li>
              <li>If approved, your refund will be processed to your original payment method</li>
              <li>Refunds typically appear in your account within 5-7 business days</li>
              <li>You'll receive an email confirmation once your refund is processed</li>
              <li>Original shipping costs are non-refundable (except for defective items)</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Exchanges</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              We currently don't offer direct exchanges. If you need a different size or color, please return your
              original item for a refund and place a new order. This ensures you get your preferred item as quickly as
              possible.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Defective or Damaged Items</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              If you receive a defective or damaged item, please contact us within 7 days of delivery. We'll provide a
              prepaid return label and send you a replacement or issue a full refund, including original shipping costs.
            </p>
            <p>Please include photos of the defect or damage when contacting us to expedite the process.</p>
          </div>
        </section>

        <div className="mt-8 p-6 bg-muted/40 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Questions About Returns?</h3>
          <p className="text-muted-foreground">
            Our customer support team is here to help. Contact us at returns@wearmatch.com or{" "}
            <a href="/contact" className="text-primary hover:underline">
              visit our contact page
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
