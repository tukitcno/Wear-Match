// SVG patterns for t-shirts in grayscale format
export interface Pattern {
  id: string
  name: string
  category: string
  svg: string
  thumbnail: string
}

export const patterns: Pattern[] = [
  {
    id: "geometric-1",
    name: "Geometric Grid",
    category: "geometric",
    svg: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="none" stroke="#333" stroke-width="1"/>
          <line x1="0" y1="20" x2="40" y2="20" stroke="#666" stroke-width="0.5"/>
          <line x1="20" y1="0" x2="20" y2="40" stroke="#666" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#grid)"/>
    </svg>`,
    thumbnail: "/geometric-grid-pattern-grayscale.jpg",
  },
  {
    id: "geometric-2",
    name: "Hexagon Mesh",
    category: "geometric",
    svg: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hexagon" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
          <polygon points="28,0 56,15 56,45 28,60 0,45 0,15" fill="none" stroke="#444" stroke-width="1.5"/>
          <polygon points="28,60 56,75 56,105 28,120 0,105 0,75" fill="none" stroke="#444" stroke-width="1.5"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#hexagon)"/>
    </svg>`,
    thumbnail: "/hexagon-mesh-pattern-grayscale.jpg",
  },
  {
    id: "geometric-3",
    name: "Triangle Wave",
    category: "geometric",
    svg: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="triangle" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M0,30 L30,0 L60,30 L30,60 Z" fill="none" stroke="#555" stroke-width="2"/>
          <path d="M30,0 L60,30 L30,60 L0,30 Z" fill="#222" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#triangle)"/>
    </svg>`,
    thumbnail: "/triangle-wave-pattern-grayscale.jpg",
  },
  {
    id: "abstract-1",
    name: "Flowing Lines",
    category: "abstract",
    svg: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="#333" stroke-width="2"/>
          <path d="M0,70 Q25,50 50,70 T100,70" fill="none" stroke="#555" stroke-width="1.5"/>
          <path d="M0,30 Q25,10 50,30 T100,30" fill="none" stroke="#777" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#waves)"/>
    </svg>`,
    thumbnail: "/flowing-lines-abstract-pattern-grayscale.jpg",
  },
  {
    id: "abstract-2",
    name: "Organic Shapes",
    category: "abstract",
    svg: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="organic" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="15" fill="#333" opacity="0.4"/>
          <ellipse cx="60" cy="40" rx="18" ry="12" fill="#555" opacity="0.3"/>
          <circle cx="40" cy="65" r="10" fill="#222" opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#organic)"/>
    </svg>`,
    thumbnail: "/organic-shapes-abstract-pattern-grayscale.jpg",
  },
  {
    id: "minimal-1",
    name: "Dotted Grid",
    category: "minimal",
    svg: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="2" fill="#444"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#dots)"/>
    </svg>`,
    thumbnail: "/dotted-grid-minimal-pattern-grayscale.jpg",
  },
  {
    id: "minimal-2",
    name: "Stripe Lines",
    category: "minimal",
    svg: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="stripes" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="20" stroke="#333" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#stripes)"/>
    </svg>`,
    thumbnail: "/diagonal-stripe-lines-minimal-pattern-grayscale.jpg",
  },
  {
    id: "urban-1",
    name: "City Grid",
    category: "urban",
    svg: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="city" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect x="5" y="5" width="15" height="40" fill="#222"/>
          <rect x="25" y="15" width="20" height="30" fill="#333"/>
          <rect x="10" y="10" width="8" height="8" fill="#555"/>
          <rect x="30" y="20" width="10" height="10" fill="#444"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#city)"/>
    </svg>`,
    thumbnail: "/city-grid-urban-pattern-grayscale.jpg",
  },
  {
    id: "urban-2",
    name: "Street Art",
    category: "urban",
    svg: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="street" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M10,50 L40,20 L70,50 L40,80 Z" fill="#333" opacity="0.6"/>
          <circle cx="80" cy="30" r="15" fill="none" stroke="#222" stroke-width="3"/>
          <line x1="20" y1="70" x2="60" y2="70" stroke="#444" stroke-width="4"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#street)"/>
    </svg>`,
    thumbnail: "/street-art-urban-pattern-grayscale.jpg",
  },
  {
    id: "nature-1",
    name: "Leaf Pattern",
    category: "nature",
    svg: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="leaves" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <ellipse cx="30" cy="30" rx="15" ry="25" fill="#333" opacity="0.4" transform="rotate(45 30 30)"/>
          <ellipse cx="30" cy="30" rx="15" ry="25" fill="#555" opacity="0.3" transform="rotate(-45 30 30)"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#leaves)"/>
    </svg>`,
    thumbnail: "/leaf-nature-pattern-grayscale.jpg",
  },
]

export function getPatternsByCategory(category: string): Pattern[] {
  return patterns.filter((p) => p.category === category)
}

export function getPatternById(id: string): Pattern | undefined {
  return patterns.find((p) => p.id === id)
}
