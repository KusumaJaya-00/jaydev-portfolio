'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Project } from '@/lib/supabase/queries'

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (!projects.length) return null
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const cardW = el.firstElementChild?.clientWidth ?? 340
    el.scrollBy({ left: dir * (cardW + 24), behavior: 'smooth' })
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Projects</h2>
            <p className="text-muted-foreground">Some of my recent work</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollBy(-1)}
              className="notch-sm inline-flex size-9 items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollBy(1)}
              className="notch-sm inline-flex size-9 items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
            >
              <ChevronRight className="size-4" />
            </button>
            <Link
              href="/projects"
              className="ml-1 px-5 py-2.5 notch-sm border border-border text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-card/60 transition-all duration-300"
            >
              View All
            </Link>
          </div>
        </motion.div>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pt-3 pb-4 -mt-3 -mx-4 px-4 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="snap-start shrink-0 basis-[85%] sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
