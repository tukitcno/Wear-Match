"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/auth/login")
      return
    }

    const { data: wishlistData } = await supabase
      .from("wishlist")
      .select("*, products(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (wishlistData) {
      setProducts(wishlistData.map((item: any) => item.products))
    }

    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <p>Loading wishlist...</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold tracking-tight mb-8">My Wishlist</h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-4">
          <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
          <p className="text-muted-foreground">Save items you love to view them later</p>
          <Button asChild>
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
