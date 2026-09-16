'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight } from 'lucide-react'
import { Project } from '@/lib/supabase/queries'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Link href={`/projects/${project.slug}`}>
        <Card className="group/card relative bg-card border-border hover:border-primary/50 transition-colors overflow-hidden h-full">
          <div className="relative aspect-[16/10] -mt-4 overflow-hidden">
            {/* ponytail: <img> biasa — next/image butuh daftar remotePatterns per domain storage */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.featured_image || '/images/placeholder-generic.webp'}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover group-hover/card:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <Badge variant="secondary" className="badge-notch capitalize shrink-0">
                {project.category || 'Web'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {project.description ?? ''}
            </p>
            <div className="mt-auto flex items-end justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="badge-notch text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-muted-foreground opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-secondary transition-all duration-300" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
