import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ - wearmatch",
  description: "Frequently asked questions about wearmatch products and services.",
}

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I match sneakers with T-shirts?",
      answer:
        "Simply browse our sneaker collection, click on any sneaker you like, and you'll see a matching section where you can choose from various T-shirt colors and designs that complement your selected sneaker. Our design team has curated collections specifically to match popular sneaker colorways.",
    },
    {
      question: "What is your shipping policy?",
      answer:
        "We offer free standard shipping on orders over $100. Standard shipping typically takes 5-7 business days. Express shipping (2-3 business days) is available for an additional fee. International shipping is available to select countries and delivery times vary by location.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original condition with all tags attached. Custom-designed items are final sale and cannot be returned. Refunds are processed within 5-7 business days after we receive your return.",
    },
    {
      question: "Are the T-shirt designs exclusive?",
      answer:
        "Yes! All our T-shirt designs are created exclusively for wearmatch by our in-house design team and partner artists. You won't find these designs anywhere else. We regularly release new collections to match the latest sneaker drops.",
    },
    {
      question: "What sizes do you offer?",
      answer:
        "We offer T-shirts in sizes XS through 3XL. Our size guide provides detailed measurements to help you find the perfect fit. If you're between sizes, we recommend sizing up for a more relaxed fit.",
    },
    {
      question: "How do I care for my T-shirts?",
      answer:
        "To maintain the quality of your T-shirts, we recommend washing inside out in cold water and tumble drying on low heat. Avoid using bleach or harsh detergents. For best results, iron inside out if needed.",
    },
    {
      question: "Do you offer gift cards?",
      answer:
        "Yes! Gift cards are available in denominations of $25, $50, $100, and $200. They never expire and can be used for any products on our website. Perfect for the sneaker enthusiast in your life!",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can also view your order status by logging into your account and visiting the Orders page. If you have any issues tracking your order, please contact our customer support.",
    },
    {
      question: "Do you restock sold-out items?",
      answer:
        "We try to restock popular items when possible, but some limited edition designs may not be restocked. You can sign up for restock notifications on product pages to be alerted when items become available again.",
    },
    {
      question: "Can I cancel or modify my order?",
      answer:
        "Orders can be cancelled or modified within 1 hour of placement. After that, orders are processed and cannot be changed. Please contact customer support immediately if you need to make changes to your order.",
    },
  ]

  return (
    <div className="container max-w-4xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">
          Find answers to common questions about our products and services
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
            <AccordionTrigger className="text-left hover:no-underline">
              <span className="font-semibold">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 p-6 bg-muted/40 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
        <p className="text-muted-foreground mb-4">Our customer support team is here to help</p>
        <Button asChild>
          <a href="/contact">Contact Us</a>
        </Button>
      </div>
    </div>
  )
}
