import { ArrowUpRight } from 'lucide-react'

const LINKS = [
  { href: 'https://github.com', label: 'GitHub', external: true },
  { href: 'https://linkedin.com', label: 'LinkedIn', external: true },
  { href: 'mailto:officialkusjay@gmail.com', label: 'Email', external: false },
]

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-2">
      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.external ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="notch-sm inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
        >
          {link.label}
          <ArrowUpRight className="size-3 opacity-50" />
        </a>
      ))}
    </div>
  )
}
