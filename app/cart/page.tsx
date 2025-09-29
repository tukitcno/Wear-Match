"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus, Minus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import type { CartItem } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    setIsLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)

    if (user) {
      // Load from database
      const { data: cartData } = await supabase.from("cart").select("*, products(*)").eq("user_id", user.id)

      if (cartData) {
        const items: CartItem[] = cartData.map((item: any) => ({
          product_id: item.product_id,
          product_name: item.products.name,
          product_image: item.products.image_url,
          quantity: item.quantity,
          price: item.products.price,
          selected_color: item.selected_color,
          selected_design: item.selected_design,
        }))
        setCartItems(items)
      }
    } else {
      // Load from localStorage
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCartItems(localCart)
    }
    setIsLoading(false)
  }

  const updateQuantity = async (index: number, newQuantity: number) => {
    if (newQuantity < 1) return

    const updatedItems = [...cartItems]
    updatedItems[index].quantity = newQuantity
    setCartItems(updatedItems)

    if (user) {
      await supabase
        .from("cart")
        .update({ quantity: newQuantity })
        .eq("user_id", user.id)
        .eq("product_id", updatedItems[index].product_id)
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedItems))
    }
  }

  const removeItem = async (index: number) => {
    const item = cartItems[index]

    if (user) {
      await supabase.from("cart").delete().eq("user_id", user.id).eq("product_id", item.product_id)
    }

    const updatedItems = cartItems.filter((_, i) => i !== index)
    setCartItems(updatedItems)

    if (!user) {
      localStorage.setItem("cart", JSON.stringify(updatedItems))
    }

    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    })
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% tax
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + tax + shipping

  if (isLoading) {
    return (
      <div className="container py-8">
        <p>Loading cart...</p>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-16">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">Add some items to get started</p>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product_image || "/placeholder.svg"}
                      alt={item.product_name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">{item.product_name}</h3>
                    {item.selected_color && (
                      <p className="text-sm text-muted-foreground">Color: {item.selected_color}</p>
                    )}
                    {item.selected_design && (
                      <p className="text-sm text-muted-foreground">Design: {item.selected_design.name}</p>
                    )}
                    <p className="font-bold">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal < 100 && <p className="text-xs text-muted-foreground">Free shipping on orders over $100</p>}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
