import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - wearmatch",
  description: "Read our terms and conditions for using wearmatch services.",
}

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing and using wearmatch, you accept and agree to be bound by the terms and provision of this
            agreement. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Use of Service</h2>
          <p className="text-muted-foreground leading-relaxed">
            You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Use the service in any way that violates any applicable law or regulation</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use of the service</li>
            <li>Attempt to gain unauthorized access to any portion of the service</li>
            <li>Use the service to transmit any viruses or malicious code</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Account Registration</h2>
          <p className="text-muted-foreground leading-relaxed">
            To access certain features, you may be required to create an account. You are responsible for maintaining
            the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Product Information and Pricing</h2>
          <p className="text-muted-foreground leading-relaxed">
            We strive to provide accurate product descriptions and pricing. However, we do not warrant that product
            descriptions, pricing, or other content is accurate, complete, or error-free. We reserve the right to
            correct any errors and to change or update information at any time without prior notice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Orders and Payment</h2>
          <p className="text-muted-foreground leading-relaxed">
            All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order
            for any reason. Payment must be received before your order is processed. We accept major credit cards and
            other payment methods as indicated on our website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Shipping and Delivery</h2>
          <p className="text-muted-foreground leading-relaxed">
            Shipping times are estimates and not guaranteed. We are not responsible for delays caused by shipping
            carriers or customs. Risk of loss and title for items purchased pass to you upon delivery to the carrier.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Returns and Refunds</h2>
          <p className="text-muted-foreground leading-relaxed">
            Please refer to our Returns Policy for detailed information about returns and refunds. Items must be
            returned in original condition within 30 days of delivery.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            All content on this website, including text, graphics, logos, images, and software, is the property of
            wearmatch and is protected by copyright and other intellectual property laws.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            To the fullest extent permitted by law, wearmatch shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of or inability to use the service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Contact Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            For questions about these Terms, please contact us at legal@wearmatch.com
          </p>
        </section>
      </div>
    </div>
  )
}
