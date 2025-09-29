"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ShoppingCart, Search, ZoomIn, Truck, RefreshCw, Shield } from "lucide-react"
import type { Product, Design } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { SizeGuide } from "@/components/size-guide"
import { ProductReviews } from "@/components/product-reviews"
import { StyleMatchSuggestions } from "@/components/style-match-suggestions"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "")
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [designSearch, setDesignSearch] = useState("")
  const [isZoomed, setIsZoomed] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  const filteredDesigns = product.designs.filter((design) =>
    design.name.toLowerCase().includes(designSearch.toLowerCase()),
  )

  const addToCart = async () => {
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      })
      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const cartItem = {
      product_id: product.id,
      product_name: product.name,
      product_image: product.image_url || "",
      quantity,
      price: product.price,
      selected_color: selectedColor,
      selected_design: selectedDesign,
    }

    if (user) {
      // Save to database
      const { error } = await supabase.from("cart").insert({
        user_id: user.id,
        product_id: product.id,
        quantity,
        selected_color: selectedColor,
        selected_design: selectedDesign,
      })

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add to cart",
          variant: "destructive",
        })
        return
      }
    } else {
      // Save to localStorage
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const existingIndex = cart.findIndex(
        (item: any) =>
          item.product_id === product.id &&
          item.selected_color === selectedColor &&
          JSON.stringify(item.selected_design) === JSON.stringify(selectedDesign),
      )

      if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity
      } else {
        cart.push(cartItem)
      }

      localStorage.setItem("cart", JSON.stringify(cart))
    }

    toast({
      title: "Added to cart",
      description: `${quantity} item(s) added to your cart`,
    })

    // Refresh to update cart count
    router.refresh()
  }

  // Mock reviews data - in production, fetch from database
  const mockReviews = [
    {
      id: "1",
      user_name: "John D.",
      rating: 5,
      comment: "Perfect match for my sneakers! The quality is amazing and the design is exactly what I wanted.",
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      user_name: "Sarah M.",
      rating: 4,
      comment: "Great product, fast shipping. The colors are vibrant and the fit is true to size.",
      created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  return (
    <div className="container py-8">
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden group">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className={`object-cover transition-transform ${isZoomed ? "scale-150" : "scale-100"}`}
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-muted/40 rounded-lg">
              <Truck className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">Over $100</p>
            </div>
            <div className="p-3 bg-muted/40 rounded-lg">
              <RefreshCw className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs font-medium">Easy Returns</p>
              <p className="text-xs text-muted-foreground">30 Days</p>
            </div>
            <div className="p-3 bg-muted/40 rounded-lg">
              <Shield className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs font-medium">Secure</p>
              <p className="text-xs text-muted-foreground">SSL Encrypted</p>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            {product.brand && <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>}
            <h1 className="text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
            <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          </div>

          {product.description && <p className="text-muted-foreground leading-relaxed">{product.description}</p>}

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="color">Select Color</Label>
                <SizeGuide />
              </div>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger id="color">
                  <SelectValue placeholder="Choose a color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity" className="mb-2 block">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                className="w-24"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1" onClick={addToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {product.release_date && (
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">Release Date: {new Date(product.release_date).toLocaleDateString()}</Badge>
              <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* AI-Matched Style Suggestions for sneakers */}
      {product.type === "sneaker" && product.colors.length > 0 && (
        <div className="mb-16 p-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-2xl border">
          <StyleMatchSuggestions sneakerColors={product.colors} sneakerName={product.name} />
        </div>
      )}

      <div className="mb-16">
        <Tabs defaultValue="designs" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="designs">Designs</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="designs" className="mt-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Match with Custom Designs</h2>
              <p className="text-muted-foreground">Choose from our exclusive design collections</p>
            </div>

            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search designs..."
                  value={designSearch}
                  onChange={(e) => setDesignSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredDesigns.map((design) => (
                <Card
                  key={design.name}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedDesign?.name === design.name ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedDesign(design)}
                >
                  <CardContent className="p-4">
                    <div className="relative aspect-square bg-muted rounded-md overflow-hidden mb-2">
                      <Image
                        src={design.thumbnail_url || "/placeholder.svg"}
                        alt={design.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-center line-clamp-2">{design.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDesigns.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No designs found matching your search.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="details" className="mt-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h3 className="text-2xl font-bold mb-4">Product Details</h3>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground">Material</p>
                  <p>100% Premium Cotton - Soft, breathable, and durable</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Care Instructions</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Machine wash cold with like colors</li>
                    <li>Tumble dry low</li>
                    <li>Do not bleach</li>
                    <li>Iron inside out if needed</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Features</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>High-quality screen printing</li>
                    <li>Pre-shrunk fabric</li>
                    <li>Reinforced seams for durability</li>
                    <li>Tagless for comfort</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <ProductReviews productId={product.id} reviews={mockReviews} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
