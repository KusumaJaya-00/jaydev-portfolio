import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const quickLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const socials = [
  { href: 'https://github.com', label: 'GitHub' },
  { href: 'https://linkedin.com', label: 'LinkedIn' },
  { href: 'mailto:hello@example.com', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <Link href="/" className="font-mono text-xl font-bold text-primary">
              jaydev
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Full-Stack Developer building modern web applications.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="notch-sm inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
                >
                  {social.label}
                  <ArrowUpRight className="size-3 opacity-50" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-secondary mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3 opacity-0 -translate-x-0.5 translate-y-0.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-secondary mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>hello@example.com</li>
              <li>Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Kusjay. All rights reserved.</p>
          <p>
            Built with{' '}
            <span className="text-foreground">Next.js</span> &amp;{' '}
            <span className="text-foreground">Supabase</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
