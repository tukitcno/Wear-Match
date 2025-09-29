// Color palettes for matching sneakers with t-shirt designs
export interface ColorPalette {
  id: string
  name: string
  primary: string
  secondary: string
  accent: string
  neutral: string
  description: string
  tags: string[]
}

export const colorPalettes: ColorPalette[] = [
  {
    id: "classic-black-white",
    name: "Classic Monochrome",
    primary: "#000000",
    secondary: "#FFFFFF",
    accent: "#808080",
    neutral: "#F5F5F5",
    description: "Timeless black and white combination",
    tags: ["classic", "minimal", "versatile"],
  },
  {
    id: "red-black",
    name: "Bold Red & Black",
    primary: "#DC2626",
    secondary: "#000000",
    accent: "#991B1B",
    neutral: "#FEE2E2",
    description: "Striking red with deep black",
    tags: ["bold", "energetic", "urban"],
  },
  {
    id: "blue-navy",
    name: "Ocean Blues",
    primary: "#2563EB",
    secondary: "#1E3A8A",
    accent: "#60A5FA",
    neutral: "#DBEAFE",
    description: "Cool blue tones",
    tags: ["cool", "calm", "professional"],
  },
  {
    id: "green-olive",
    name: "Earth Tones",
    primary: "#16A34A",
    secondary: "#854D0E",
    accent: "#65A30D",
    neutral: "#F7FEE7",
    description: "Natural green and olive shades",
    tags: ["natural", "earthy", "outdoor"],
  },
  {
    id: "purple-pink",
    name: "Vibrant Purple",
    primary: "#9333EA",
    secondary: "#EC4899",
    accent: "#A855F7",
    neutral: "#FAE8FF",
    description: "Bold purple with pink accents",
    tags: ["vibrant", "creative", "modern"],
  },
  {
    id: "orange-yellow",
    name: "Sunset Warmth",
    primary: "#EA580C",
    secondary: "#EAB308",
    accent: "#F97316",
    neutral: "#FEF3C7",
    description: "Warm orange and yellow tones",
    tags: ["warm", "energetic", "cheerful"],
  },
  {
    id: "gray-charcoal",
    name: "Urban Gray",
    primary: "#4B5563",
    secondary: "#1F2937",
    accent: "#9CA3AF",
    neutral: "#F3F4F6",
    description: "Sophisticated gray palette",
    tags: ["sophisticated", "urban", "neutral"],
  },
  {
    id: "teal-turquoise",
    name: "Tropical Teal",
    primary: "#14B8A6",
    secondary: "#0D9488",
    accent: "#5EEAD4",
    neutral: "#CCFBF1",
    description: "Fresh teal and turquoise",
    tags: ["fresh", "tropical", "modern"],
  },
  {
    id: "burgundy-wine",
    name: "Wine & Burgundy",
    primary: "#991B1B",
    secondary: "#7C2D12",
    accent: "#DC2626",
    neutral: "#FEE2E2",
    description: "Rich burgundy and wine tones",
    tags: ["rich", "elegant", "classic"],
  },
  {
    id: "neon-cyber",
    name: "Cyber Neon",
    primary: "#10B981",
    secondary: "#8B5CF6",
    accent: "#F59E0B",
    neutral: "#111827",
    description: "Futuristic neon colors",
    tags: ["futuristic", "bold", "tech"],
  },
]

export function getColorPaletteById(id: string): ColorPalette | undefined {
  return colorPalettes.find((p) => p.id === id)
}

export function getColorPalettesByTag(tag: string): ColorPalette[] {
  return colorPalettes.filter((p) => p.tags.includes(tag))
}

// Helper function to extract dominant colors from a hex color
export function getDominantColorFamily(hexColor: string): string {
  const hex = hexColor.replace("#", "")
  const r = Number.parseInt(hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.substring(4, 6), 16)

  // Determine dominant color
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  // Check for grayscale
  if (max - min < 30) {
    if (max < 50) return "black"
    if (max > 200) return "white"
    return "gray"
  }

  // Determine color family
  if (r === max) {
    if (g > b) return "orange"
    return "red"
  } else if (g === max) {
    if (r > b) return "yellow"
    return "green"
  } else {
    if (r > g) return "purple"
    return "blue"
  }
}
