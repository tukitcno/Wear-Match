import { createClient } from "@/lib/supabase/server"
import { ProductCard } from "@/components/product-card"
import { ShopFilters } from "@/components/shop-filters"
import { ShopSort } from "@/components/shop-sort"
import type { Product } from "@/lib/types"

interface ShopPageProps {
  searchParams: Promise<{
    search?: string
    brand?: string
    color?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
    page?: string
  }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  const page = Number.parseInt(params.page || "1")
  const limit = 12
  const offset = (page - 1) * limit

  // Build query
  let query = supabase.from("products").select("*", { count: "exact" }).eq("type", "sneaker")

  // Apply filters
  if (params.search) {
    query = query.ilike("name", `%${params.search}%`)
  }

  if (params.brand) {
    query = query.eq("brand", params.brand)
  }

  if (params.minPrice) {
    query = query.gte("price", Number.parseFloat(params.minPrice))
  }

  if (params.maxPrice) {
    query = query.lte("price", Number.parseFloat(params.maxPrice))
  }

  // Apply sorting
  switch (params.sort) {
    case "price-asc":
      query = query.order("price", { ascending: true })
      break
    case "price-desc":
      query = query.order("price", { ascending: false })
      break
    case "name-asc":
      query = query.order("name", { ascending: true })
      break
    case "newest":
    default:
      query = query.order("created_at", { ascending: false })
      break
  }

  // Apply pagination
  query = query.range(offset, offset + limit - 1)

  const { data: products, count } = await query

  const totalPages = Math.ceil((count || 0) / limit)

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Shop Sneakers</h1>
        <p className="text-muted-foreground">
          {count} {count === 1 ? "product" : "products"} available
        </p>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        {/* Filters Sidebar */}
        <aside className="space-y-6">
          <ShopFilters />
        </aside>

        {/* Products Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {offset + 1}-{Math.min(offset + limit, count || 0)} of {count}
            </p>
            <ShopSort />
          </div>

          {products && products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <a
                      key={pageNum}
                      href={`/shop?${new URLSearchParams({ ...params, page: pageNum.toString() }).toString()}`}
                      className={`px-4 py-2 rounded-md ${
                        pageNum === page
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80 transition-colors"
                      }`}
                    >
                      {pageNum}
                    </a>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
