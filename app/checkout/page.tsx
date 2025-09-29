"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import type { CartItem, ShippingAddress } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Shield, Lock, CreditCard } from "lucide-react"

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    full_name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  })

  useEffect(() => {
    loadCheckoutData()
  }, [])

  const loadCheckoutData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/auth/login")
      return
    }

    setUser(user)

    // Load cart
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

    // Load user profile
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (profile?.full_name) {
      setShippingAddress((prev) => ({
        ...prev,
        full_name: profile.full_name,
      }))
    }
  }

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const tax = subtotal * 0.1
      const shipping = subtotal > 100 ? 0 : 10
      const total = subtotal + tax + shipping

      // Create order
      const { error: orderError } = await supabase.from("orders").insert({
        user_id: user.id,
        items: cartItems,
        status: "pending",
        total,
        shipping_address: shippingAddress,
      })

      if (orderError) throw orderError

      // Clear cart
      await supabase.from("cart").delete().eq("user_id", user.id)

      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase",
      })

      router.push("/account/orders")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + tax + shipping

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Checkout</h1>

      <div className="mb-8 p-4 bg-muted/40 rounded-lg">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <span className="text-muted-foreground">PCI DSS Compliant</span>
          </div>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    required
                    value={shippingAddress.full_name}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    required
                    value={shippingAddress.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      required
                      value={shippingAddress.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      required
                      value={shippingAddress.zip}
                      onChange={(e) => handleInputChange("zip", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={shippingAddress.country}
                      onValueChange={(value) => handleInputChange("country", value)}
                    >
                      <SelectTrigger id="country">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted/40 rounded-md text-sm text-muted-foreground flex items-start gap-2">
                  <Shield className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                  <p>Your payment information is encrypted and secure. We never store your card details.</p>
                </div>

                <div>
                  <Label htmlFor="card_number">Card Number</Label>
                  <Input id="card_number" placeholder="1234 5678 9012 3456" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required maxLength={4} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product_name} x{item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
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
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Place Order"}
                </Button>

                <div className="pt-4 border-t">
                  <p className="text-xs text-center text-muted-foreground mb-2">We accept</p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <div className="px-3 py-1 bg-muted rounded text-xs font-semibold">VISA</div>
                    <div className="px-3 py-1 bg-muted rounded text-xs font-semibold">MASTERCARD</div>
                    <div className="px-3 py-1 bg-muted rounded text-xs font-semibold">AMEX</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
