import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import type { Release } from "@/lib/types"

export default async function ReleasesPage() {
  const supabase = await createClient()

  const { data: releases } = await supabase.from("releases").select("*, products(*)").order("date", { ascending: true })

  const upcomingReleases = releases?.filter((r) => new Date(r.date) >= new Date()) || []
  const pastReleases = releases?.filter((r) => new Date(r.date) < new Date()) || []

  return (
    <div className="container py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Sneaker Releases</h1>
        <p className="text-muted-foreground">Stay updated with the latest and upcoming sneaker drops</p>
      </div>

      {upcomingReleases.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Upcoming Releases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingReleases.map((release: Release) => (
              <Card key={release.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-muted">
                  <Image
                    src={release.image_url || release.product?.image_url || "/placeholder.svg"}
                    alt={release.name}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 right-4">{new Date(release.date).toLocaleDateString()}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{release.name}</h3>
                  {release.description && <p className="text-sm text-muted-foreground mb-4">{release.description}</p>}
                  {release.product && (
                    <Button asChild className="w-full">
                      <Link href={`/products/${release.product_id}`}>View Product</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {pastReleases.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-6">Past Releases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastReleases.map((release: Release) => (
              <Card key={release.id} className="overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                <div className="relative aspect-video bg-muted">
                  <Image
                    src={release.image_url || release.product?.image_url || "/placeholder.svg"}
                    alt={release.name}
                    fill
                    className="object-cover"
                  />
                  <Badge variant="secondary" className="absolute top-4 right-4">
                    {new Date(release.date).toLocaleDateString()}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{release.name}</h3>
                  {release.description && <p className="text-sm text-muted-foreground mb-4">{release.description}</p>}
                  {release.product && (
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href={`/products/${release.product_id}`}>View Product</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
