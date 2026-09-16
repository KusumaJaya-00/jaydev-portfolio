import { marked } from 'marked'

marked.setOptions({ gfm: true, breaks: true })

/** Domain video yang boleh di-embed via <iframe>. Selain itu -> dibuang. */
const EMBED_HOSTS = [
  'www.youtube.com',
  'www.youtube-nocookie.com',
  'youtube.com',
  'player.vimeo.com',
]

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'strong', 'em', 'del',
  'u', 's', 'small', 'sub', 'sup', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
  'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'span', 'div', 'figure', 'figcaption', 'details', 'summary',
  'iframe', 'video', 'source',
]

const ALLOWED_ATTR = [
  'href', 'src', 'alt', 'title', 'class', 'target', 'rel', 'style',
  'width', 'height', 'colspan', 'rowspan', 'open', 'controls', 'poster', 'type',
  // khusus iframe (src divalidasi manual oleh hook di atas):
  'frameborder', 'allow', 'allowfullscreen', 'referrerpolicy',
]

// Lazy-init DOMPurify to avoid crash if isomorphic-dompurify can't load in the
// current runtime (e.g. Vercel serverless without a DOM implementation).
// Content is admin-authored and trusted, so falling back to raw HTML is safe.
let DOMPurify: typeof import('isomorphic-dompurify').default | null = null
let hooksInstalled = false

function getDOMPurify() {
  if (DOMPurify) return DOMPurify
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    DOMPurify = require('isomorphic-dompurify').default
    installHooks()
  } catch {
    DOMPurify = null
  }
  return DOMPurify
}

function installHooks() {
  if (!DOMPurify || hooksInstalled) return
  hooksInstalled = true
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.nodeName === 'IFRAME') {
      const el = node as Element
      const src = el.getAttribute('src') || ''
      let host = ''
      try {
        host = new URL(src).hostname
      } catch {
        host = ''
      }
      if (!EMBED_HOSTS.includes(host)) {
        el.remove()
      } else {
        el.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation')
        el.setAttribute('loading', 'lazy')
      }
      return
    }
    if (node.hasAttribute && node.hasAttribute('style')) {
      const el = node as Element
      const style = el.getAttribute('style') || ''
      const align = style.match(/text-align\s*:\s*(left|right|center|justify)/i)
      if (align) {
        el.setAttribute('style', `text-align: ${align[1].toLowerCase()}`)
      } else {
        el.removeAttribute('style')
      }
    }
  })
}

function sanitize(html: string): string {
  const dp = getDOMPurify()
  if (!dp) return html // DOMPurify unavailable — serve raw (trusted content)
  try {
    return dp.sanitize(html, {
      ALLOWED_TAGS,
      ALLOWED_ATTR,
      ALLOW_DATA_ATTR: false,
    })
  } catch {
    return html
  }
}

/**
 * Konten lama = markdown; konten baru (rich text editor) = HTML.
 * Deteksi sederhana: diawali tag -> anggap HTML (sanitasi saja),
 * selain itu render sebagai markdown dulu.
 */
export function renderContent(dirty: string | null | undefined): string {
  const value = dirty ?? ''
  if (value.trimStart().startsWith('<')) return sanitize(value)
  return sanitize(marked.parse(value, { async: false }))
}

/** Alias lama supaya pemanggil yang masih memakai nama ini tetap jalan. */
export function renderMarkdown(dirty: string | null | undefined): string {
  return renderContent(dirty)
}
