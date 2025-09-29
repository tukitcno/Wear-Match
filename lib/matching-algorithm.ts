import { colorPalettes, getDominantColorFamily, type ColorPalette } from "./color-palettes"
import { patterns, type Pattern } from "./patterns"

export interface MatchSuggestion {
  pattern: Pattern
  palette: ColorPalette
  matchScore: number
  reason: string
}

// Convert color name to hex (simplified mapping)
const colorNameToHex: Record<string, string> = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#DC2626",
  blue: "#2563EB",
  green: "#16A34A",
  yellow: "#EAB308",
  orange: "#EA580C",
  purple: "#9333EA",
  pink: "#EC4899",
  gray: "#6B7280",
  brown: "#92400E",
  navy: "#1E3A8A",
  teal: "#14B8A6",
  burgundy: "#991B1B",
}

function getHexFromColorName(colorName: string): string {
  const normalized = colorName.toLowerCase().trim()
  return colorNameToHex[normalized] || "#000000"
}

export function findMatchingSuggestions(sneakerColors: string[], limit = 6): MatchSuggestion[] {
  const suggestions: MatchSuggestion[] = []

  // Convert sneaker colors to hex and determine dominant families
  const sneakerHexColors = sneakerColors.map((c) => getHexFromColorName(c))
  const colorFamilies = sneakerHexColors.map((hex) => getDominantColorFamily(hex))

  // Score each palette based on color matching
  for (const palette of colorPalettes) {
    const paletteColors = [palette.primary, palette.secondary, palette.accent]
    const paletteFamilies = paletteColors.map((hex) => getDominantColorFamily(hex))

    // Calculate match score
    let matchScore = 0
    const matchReasons: string[] = []

    // Check for exact color family matches
    for (const sneakerFamily of colorFamilies) {
      if (paletteFamilies.includes(sneakerFamily)) {
        matchScore += 30
        matchReasons.push(`Matches ${sneakerFamily} tones`)
      }
    }

    // Bonus for complementary colors
    if (colorFamilies.includes("red") && paletteFamilies.includes("green")) {
      matchScore += 15
      matchReasons.push("Complementary color scheme")
    }
    if (colorFamilies.includes("blue") && paletteFamilies.includes("orange")) {
      matchScore += 15
      matchReasons.push("Complementary color scheme")
    }
    if (colorFamilies.includes("purple") && paletteFamilies.includes("yellow")) {
      matchScore += 15
      matchReasons.push("Complementary color scheme")
    }

    // Bonus for neutral palettes (always work well)
    if (palette.tags.includes("neutral") || palette.tags.includes("classic")) {
      matchScore += 20
      matchReasons.push("Versatile neutral palette")
    }

    // Match each pattern with this palette
    for (const pattern of patterns) {
      const totalScore = matchScore + Math.random() * 10 // Add slight randomness

      suggestions.push({
        pattern,
        palette,
        matchScore: totalScore,
        reason: matchReasons.length > 0 ? matchReasons[0] : "Stylish combination",
      })
    }
  }

  // Sort by match score and return top matches
  return suggestions.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit)
}

export function getPatternPreview(pattern: Pattern, primaryColor: string): string {
  // Replace grayscale colors in SVG with the selected color
  let coloredSvg = pattern.svg

  // Replace common grayscale values with the primary color
  coloredSvg = coloredSvg.replace(/#222/g, primaryColor)
  coloredSvg = coloredSvg.replace(/#333/g, adjustColorBrightness(primaryColor, 20))
  coloredSvg = coloredSvg.replace(/#444/g, adjustColorBrightness(primaryColor, 40))
  coloredSvg = coloredSvg.replace(/#555/g, adjustColorBrightness(primaryColor, 60))
  coloredSvg = coloredSvg.replace(/#666/g, adjustColorBrightness(primaryColor, 80))
  coloredSvg = coloredSvg.replace(/#777/g, adjustColorBrightness(primaryColor, 100))

  return coloredSvg
}

function adjustColorBrightness(hex: string, amount: number): string {
  const num = Number.parseInt(hex.replace("#", ""), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount))
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount))
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
}
