'use client'

import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Project } from '@/lib/supabase/queries'

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  )
}
