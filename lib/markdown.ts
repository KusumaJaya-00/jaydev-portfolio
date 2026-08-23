import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

marked.setOptions({ gfm: true, breaks: true })

/** Domain video yang boleh di-embed via <iframe>. Selain itu -> dibuang. */
const EMBED_HOSTS = [
  'www.youtube.com',
  'www.youtube-nocookie.com',
  'youtube.com',
  'player.vimeo.com',
]

// Validasi src <iframe> hanya boleh ke domain embed di atas.
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
  }
})

/**
 * Render markdown (+ HTML inline) -> HTML ter-sanitize, aman untuk dangerouslySetInnerHTML.
 * Tag berbahaya (script, event handler, iframe non-video) otomatis dibuang.
 */
export function renderMarkdown(dirty: string | null | undefined): string {
  const html = marked.parse(dirty ?? '', { async: false })
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'strong', 'em', 'del',
      'u', 's', 'small', 'sub', 'sup', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
      'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'span', 'div', 'figure', 'figcaption', 'details', 'summary',
      'iframe', 'video', 'source',
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'target', 'rel',
      'width', 'height', 'colspan', 'rowspan', 'open', 'controls', 'poster', 'type',
      // khusus iframe (divalidasi manual oleh hook di atas):
      'frameborder', 'allow', 'allowfullscreen', 'referrerpolicy',
    ],
    ALLOW_DATA_ATTR: false,
  })
}
