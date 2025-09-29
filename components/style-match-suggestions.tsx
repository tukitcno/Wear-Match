"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { findMatchingSuggestions, getPatternPreview, type MatchSuggestion } from "@/lib/matching-algorithm"
import { useState } from "react"

interface StyleMatchSuggestionsProps {
  sneakerColors: string[]
  sneakerName: string
}

export function StyleMatchSuggestions({ sneakerColors, sneakerName }: StyleMatchSuggestionsProps) {
  const [suggestions] = useState<MatchSuggestion[]>(() => findMatchingSuggestions(sneakerColors, 6))

  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">AI-Matched T-Shirt Designs</h2>
      </div>
      <p className="text-muted-foreground">
        Based on the colors of {sneakerName}, we've found these perfect t-shirt matches for you
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((suggestion, index) => (
          <Card
            key={`${suggestion.pattern.id}-${suggestion.palette.id}-${index}`}
            className="group hover:shadow-lg transition-all"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{suggestion.pattern.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{suggestion.palette.name}</p>
                </div>
                <Badge variant="secondary" className="ml-2">
                  {Math.round(suggestion.matchScore)}% Match
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pattern Preview */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <div
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{
                    __html: getPatternPreview(suggestion.pattern, suggestion.palette.primary),
                  }}
                />
              </div>

              {/* Color Palette */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Color Palette</p>
                <div className="flex gap-2">
                  <div
                    className="w-8 h-8 rounded border-2 border-border"
                    style={{ backgroundColor: suggestion.palette.primary }}
                    title="Primary"
                  />
                  <div
                    className="w-8 h-8 rounded border-2 border-border"
                    style={{ backgroundColor: suggestion.palette.secondary }}
                    title="Secondary"
                  />
                  <div
                    className="w-8 h-8 rounded border-2 border-border"
                    style={{ backgroundColor: suggestion.palette.accent }}
                    title="Accent"
                  />
                  <div
                    className="w-8 h-8 rounded border-2 border-border"
                    style={{ backgroundColor: suggestion.palette.neutral }}
                    title="Neutral"
                  />
                </div>
              </div>

              {/* Match Reason */}
              <p className="text-sm text-muted-foreground italic">{suggestion.reason}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {suggestion.palette.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button className="w-full bg-transparent" variant="outline">
                View T-Shirt Options
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
