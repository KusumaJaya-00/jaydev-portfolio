'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export function ContactSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl notch bg-card border border-border p-8 sm:p-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Have a project in mind?</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Let&apos;s work together — tell me what you&apos;re building and I&apos;ll get back within 24 hours.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-1.5 notch-sm bg-primary hover:bg-secondary text-primary-foreground font-semibold px-6 py-2.5 transition-colors"
          >
            Get in Touch <ArrowUpRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
