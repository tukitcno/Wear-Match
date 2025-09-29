export interface Product {
  id: string
  type: "sneaker" | "tshirt"
  name: string
  description: string | null
  price: number
  image_url: string | null
  colors: string[]
  designs: Design[]
  release_date: string | null
  stock: number
  brand: string | null
  created_at: string
  updated_at: string
}

export interface Design {
  name: string
  thumbnail_url: string
}

export interface Release {
  id: string
  name: string
  date: string
  product_id: string
  image_url: string | null
  description: string | null
  created_at: string
  product?: Product
}

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string | null
  items: CartItem[]
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  shipping_address: ShippingAddress | null
  created_at: string
  updated_at: string
}

export interface CartItem {
  product_id: string
  product_name: string
  product_image: string
  quantity: number
  price: number
  selected_color?: string
  selected_design?: Design
}

export interface ShippingAddress {
  full_name: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: Product
}
