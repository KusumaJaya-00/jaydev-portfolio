'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [authed, setAuthed] = useState(false)
  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    // Sync initial state (e.g. page loaded mid-scroll / anchor link)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let active = true
    supabase.auth.getUser().then(({ data }) => {
      if (active) setAuthed(Boolean(data.user))
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(Boolean(session))
    })
    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || open ? 'bg-background/65 backdrop-blur-lg border-b border-border' : 'bg-transparent border-b border-transparent'
      )}
    >
      <nav className="container mx-auto px-4 md:px-8 h-16 flex items-center">
        <div className="flex-1">
          <Link href="/" className="font-mono text-xl font-bold text-primary" onClick={() => setOpen(false)}>
            jaydev
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'group relative text-sm font-medium transition-colors duration-200',
                pathname === link.href ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.label}
              <span
                className={cn(
                  'absolute left-0 right-0 -bottom-px h-px bg-blue-400 origin-left transition-transform duration-300',
                  pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                )}
              />
            </Link>
          ))}
        </div>
        <div className="hidden md:flex flex-1 items-center justify-end gap-3">
          <Link
            href={authed ? '/admin' : '/login'}
            className="relative px-5 py-2.5 notch-sm border border-border text-sm font-medium hover:border-primary/50 transition-colors duration-200"
          >
            {authed ? 'Dashboard' : 'Sign in'}
          </Link>
          <Link
            href="/contact"
            className="relative px-5 py-2.5 notch-sm bg-primary hover:bg-secondary text-primary-foreground text-sm font-semibold transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>
      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden glass border-t border-border px-4 py-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'block px-3 py-2 rounded-lg text-sm transition-colors',
                pathname === link.href
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={authed ? '/admin' : '/login'}
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            {authed ? 'Dashboard' : 'Sign in'}
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="relative block w-full mt-2 px-5 py-2.5 text-center notch-sm bg-primary hover:bg-secondary text-primary-foreground text-sm font-semibold transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </nav>
      )}
    </header>
  )
}
