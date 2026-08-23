import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-secondary transition-colors"
    >
      <ChevronLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
      {label}
    </Link>
  )
}
