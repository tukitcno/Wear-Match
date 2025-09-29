"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export function ShopFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [brands, setBrands] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  useEffect(() => {
    const brandParam = searchParams.get("brand")
    if (brandParam) {
      setBrands([brandParam])
    }
    setMinPrice(searchParams.get("minPrice") || "")
    setMaxPrice(searchParams.get("maxPrice") || "")
  }, [searchParams])

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (brands.length > 0) {
      params.set("brand", brands[0])
    } else {
      params.delete("brand")
    }

    if (minPrice) {
      params.set("minPrice", minPrice)
    } else {
      params.delete("minPrice")
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice)
    } else {
      params.delete("maxPrice")
    }

    params.delete("page")
    router.push(`/shop?${params.toString()}`)
  }

  const clearFilters = () => {
    setBrands([])
    setMinPrice("")
    setMaxPrice("")
    router.push("/shop")
  }

  const toggleBrand = (brand: string) => {
    setBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [brand]))
  }

  const availableBrands = ["Air Jordan", "Nike"]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Brand</h3>
        <div className="space-y-2">
          {availableBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox id={brand} checked={brands.includes(brand)} onCheckedChange={() => toggleBrand(brand)} />
              <Label htmlFor={brand} className="text-sm font-normal cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
          />
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
          Clear All
        </Button>
      </div>
    </div>
  )
}
