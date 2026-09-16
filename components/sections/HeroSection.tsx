'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const ROLES = [
  'full-stack developer',
  'laravel developer',
  'next.js developer',
  'building with ai every day',
]

function useTypewriter(words: string[], typeMs = 70, holdMs = 1800) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), holdMs)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }
    const t = setTimeout(
      () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      deleting ? typeMs / 2 : typeMs
    )
    return () => clearTimeout(t)
  }, [text, deleting, index, words, typeMs, holdMs])

  return text
}

export function HeroSection() {
  const role = useTypewriter(ROLES)

  return (
    <section className="relative -mt-16 min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 notch-sm border border-border bg-card/60 text-muted-foreground text-xs font-medium tracking-wide mb-8">
              <span className="relative flex h-1.5 w-1.5 ml-0.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 pulse-ring" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400" />
              </span>
              <span className="uppercase">Full-Stack Developer</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-extrabold tracking-tight leading-[0.98] mb-7">
              Hi, I&apos;m <span className="text-sweep">Kusjay</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed mb-10">
              Crafting performant, accessible digital products with modern web technologies.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-14">
              <Link
                href="/projects"
                className="group relative w-full sm:w-auto px-7 py-3.5 notch bg-primary hover:bg-secondary text-primary-foreground font-semibold text-base transition-colors duration-300 text-center btn-glow pulse-ring"
              >
                <span className="flex items-center justify-center gap-2">
                  View My Work
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
              <Link
                href="/cv-kusjay.pdf"
                download
                className="w-full sm:w-auto px-7 py-3.5 notch border border-border text-foreground font-semibold text-base hover:border-primary/50 hover:bg-card/60 transition-all duration-300 text-center"
              >
                Download CV
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-6 border-t border-border pt-6 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-bold tabular-nums">2+</div>
                <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">Years Coding</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold tabular-nums">8+</div>
                <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">Projects Shipped</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold tabular-nums">10+</div>
                <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">Teams Helped</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative hidden lg:block animate-float"
          >
            <div className="absolute -inset-6 bg-blue-500/10 blur-3xl rounded-full" />
            <div className="relative notch bg-card border border-border overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                <span className="ml-2 text-xs text-muted-foreground">profile.sh</span>
              </div>
              <div className="p-5 sm:p-7 font-mono text-[13px] sm:text-sm leading-7">
                <div className="text-muted-foreground">$ whoami</div>
                <div className="pl-4">
                  kusjay <span className="text-muted-foreground">—</span>{' '}
                  <span className="text-secondary">{role}</span>
                  <span className="caret-block animate-caret">&nbsp;</span>
                </div>
                <div className="text-muted-foreground">$ stack --list</div>
                <div className="pl-4 text-muted-foreground">
                  → <span className="text-secondary">Next.js</span> · TypeScript · Laravel · Tailwind
                </div>
                <div className="mt-4 pt-4 border-t border-border text-muted-foreground">
                  → status <span className="text-blue-400">·</span> open to work
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
