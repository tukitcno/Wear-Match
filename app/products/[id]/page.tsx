import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ProductDetailClient } from "@/components/product-detail-client"
import type { Product } from "@/lib/types"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase.from("products").select("*").eq("id", id).single()

  if (!product) {
    notFound()
  }

  // Fetch related products
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("type", "sneaker")
    .eq("brand", product.brand)
    .neq("id", id)
    .limit(4)

  return <ProductDetailClient product={product as Product} relatedProducts={(relatedProducts as Product[]) || []} />
}
