import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Sneaker Collector",
      content:
        "wearmatch has completely changed how I style my sneakers. The designs are unique and the quality is outstanding!",
      rating: 5,
      image: "/diverse-group.png",
    },
    {
      name: "Maria Garcia",
      role: "Fashion Blogger",
      content:
        "I love how easy it is to find the perfect T-shirt to match my sneakers. The customer service is also top-notch!",
      rating: 5,
      image: "/diverse-woman-portrait.png",
    },
    {
      name: "David Chen",
      role: "Streetwear Enthusiast",
      content:
        "The exclusive designs you can't find anywhere else make wearmatch my go-to for completing my sneaker outfits.",
      rating: 5,
      image: "/man.jpg",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground">Join thousands of satisfied sneaker enthusiasts</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 p-6 bg-background rounded-lg border">
            <div className="text-center">
              <p className="text-3xl font-bold">50K+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold">100K+</p>
              <p className="text-sm text-muted-foreground">Orders Delivered</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold">4.9/5</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
