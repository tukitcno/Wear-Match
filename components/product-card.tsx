"use client"

import type React from "react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    checkWishlist()
  }, [product.id])

  const checkWishlist = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase.from("wishlist").select("id").eq("user_id", user.id).eq("product_id", product.id)

    setIsWishlisted(!!data && data.length > 0)
  }

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      if (isWishlisted) {
        await supabase.from("wishlist").delete().eq("user_id", user.id).eq("product_id", product.id)
        setIsWishlisted(false)
        toast({
          title: "Removed from wishlist",
        })
      } else {
        await supabase.from("wishlist").insert({
          user_id: user.id,
          product_id: product.id,
        })
        setIsWishlisted(true)
        toast({
          title: "Added to wishlist",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {product.stock && product.stock < 10 && product.stock > 0 && (
              <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded">
                Only {product.stock} left
              </div>
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <span className="text-lg font-semibold">Out of Stock</span>
              </div>
            )}
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              onClick={toggleWishlist}
              disabled={isLoading}
            >
              <Heart className={`h-4 w-4 transition-colors ${isWishlisted ? "fill-current text-red-500" : ""}`} />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <div className="w-full">
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            {product.brand && <p className="text-sm text-muted-foreground">{product.brand}</p>}
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            <Button size="sm" className="transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              View Details
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
