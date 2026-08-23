/**
 * Generate placeholder images bertema jaydev (dark + blue #3D7FFF) via sharp.
 * Output:
 *   public/images/placeholder-generic.webp        <- fallback umum project & post
 *   public/images/{projects,posts}/placeholder-*.webp  (1200x750)
 */
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const W = 1200
const H = 750
const OUT = [
  'public/images/projects',
  'public/images/posts',
]

// Palet situs
const BG = '#06070A' // background
const CARD = '#0D0F16' // card
const PRIMARY = '#3D7FFF' // primary blue
const SECONDARY = '#7FAEFF' // secondary light blue

function svgPlaceholder({ title, subtitle, variant }) {
  const dots = []
  // dot-grid halus seperti body site
  for (let y = 20; y < H; y += 30) {
    for (let x = 20; x < W; x += 30) {
      dots.push(`<circle cx="${x}" cy="${y}" r="1.4" fill="${PRIMARY}" opacity="0.10"/>`)
    }
  }
  const accents = {
    code: `<g stroke="${PRIMARY}" stroke-width="6" fill="none" opacity="0.85" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="520,260 430,330 520,400" />
        <polyline points="680,260 770,330 680,400" />
        <line x1="630" y1="235" x2="570" y2="425" />
      </g>`,
    terminal: `<g font-family="monospace" font-size="30" fill="${SECONDARY}" opacity="0.9">
        <text x="565" y="355">&gt;_</text>
        <rect x="615" y="330" width="24" height="34" fill="${SECONDARY}"/>
      </g>
      <g stroke="${PRIMARY}" stroke-width="4" opacity="0.5">
        <line x1="520" y1="395" x2="680" y2="395"/>
        <line x1="520" y1="430" x2="620" y2="430"/>
      </g>`,
    layers: `<g fill="none" stroke="${PRIMARY}" stroke-width="5" opacity="0.8" stroke-linejoin="round">
        <polygon points="600,225 775,320 600,415 425,320" opacity="0.9"/>
        <polyline points="425,395 600,490 775,395" opacity="0.45"/>
      </g>`,
  }
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${CARD}"/>
        <stop offset="1" stop-color="${BG}"/>
      </linearGradient>
      <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${PRIMARY}" stop-opacity="0"/>
        <stop offset="0.5" stop-color="${PRIMARY}" stop-opacity="0.18"/>
        <stop offset="1" stop-color="${PRIMARY}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    ${dots.join('')}
    <rect y="${H - 140}" width="${W}" height="140" fill="url(#glow)"/>
    ${accents[variant] || accents.code}
    <text x="${W / 2}" y="${H / 2 + 130}" text-anchor="middle"
      font-family="'IBM Plex Mono', monospace" font-size="44" font-weight="700"
      fill="#F3F5FA">${title}</text>
    <text x="${W / 2}" y="${H / 2 + 180}" text-anchor="middle"
      font-family="sans-serif" font-size="22" fill="#8B93A7">${subtitle}</text>
  </svg>`
}

async function main() {
  const items = [
    ['root', 'generic', 'generic', 'code', 'jaydev', 'project'],
    ['projects', 'ecommerce-app', 'ecommerce_app', 'code', 'E-Commerce App', 'Next.js · Supabase · Tailwind'],
    ['projects', 'task-manager', 'task_manager', 'layers', 'Task Manager', 'React · Node.js · PostgreSQL'],
    ['projects', 'api-gateway', 'api_gateway', 'terminal', 'API Gateway', 'Go · Redis · Docker'],
    ['posts', 'how-i-built-this-portfolio', 'how_i_built_this_portfolio', 'terminal', 'How I Built This Portfolio', 'jaydev.my.id'],
    ['posts', 'nextjs-supabase-notes', 'nextjs_supabase_notes', 'code', 'Next.js × Supabase Notes', 'tutorial'],
    ['posts', 'ai-assisted-dev', 'ai_assisted_dev', 'layers', 'AI-Assisted Development', 'workflow notes'],
  ]
  fs.mkdirSync('public/images', { recursive: true })
  for (const [dir, slug, varName, variant, title, subtitle] of items) {
    const svg = svgPlaceholder({ title, subtitle, variant })
    const out = dir === 'root'
      ? 'public/images/placeholder-generic.webp'
      : path.join(dir === 'projects' ? OUT[0] : OUT[1], `placeholder-${slug}.webp`)
    await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(out)
    console.log('OK', out)
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
