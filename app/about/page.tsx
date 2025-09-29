import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us - wearmatch",
  description: "Learn about wearmatch's mission to help sneaker enthusiasts express their style.",
}

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">About wearmatch</h1>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Founded in 2024, wearmatch was born from a simple observation: sneakerheads spend countless hours finding
              the perfect kicks, but struggle to find apparel that truly complements their style. We set out to solve
              this problem by creating a platform that makes it easy to match premium sneakers with custom-designed
              T-shirts.
            </p>
            <p>
              What started as a passion project has grown into a thriving community of sneaker enthusiasts who
              appreciate the art of coordinated style. Our team of designers works tirelessly to create exclusive
              designs that perfectly complement the latest sneaker releases and classic favorites.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              At wearmatch, we believe that style is personal and should be effortless. Our mission is to empower
              sneaker enthusiasts to express their unique style through carefully curated matches of footwear and
              apparel. We're committed to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Creating exclusive, high-quality designs that complement popular sneaker releases</li>
              <li>Providing an intuitive platform that makes matching sneakers with apparel simple and fun</li>
              <li>Building a community of style-conscious individuals who appreciate attention to detail</li>
              <li>Delivering exceptional customer service and premium products</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Quality & Sustainability</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              We're committed to producing high-quality apparel that lasts. All our T-shirts are made from premium
              materials and printed using state-of-the-art techniques to ensure vibrant colors and durability.
            </p>
            <p>
              We also recognize our responsibility to the environment. We're continuously working to reduce our carbon
              footprint through sustainable packaging, ethical manufacturing practices, and partnerships with
              eco-conscious suppliers.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Join Our Community</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              wearmatch is more than just an e-commerce platform—it's a community of sneaker enthusiasts who share a
              passion for style and self-expression. Follow us on social media to stay updated on new releases, styling
              tips, and exclusive drops.
            </p>
          </div>
        </section>

        <div className="mt-8 p-6 bg-gradient-to-r from-primary to-primary/80 rounded-lg text-primary-foreground text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to Find Your Perfect Match?</h3>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
