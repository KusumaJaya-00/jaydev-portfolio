'use client'

import { motion } from 'framer-motion'
import { User, Code, Server, Sparkles, PenTool } from 'lucide-react'

const SKILLS = [
  { icon: Code, title: 'Frontend', desc: 'Next.js, React, Tailwind CSS' },
  { icon: Server, title: 'Backend', desc: 'Laravel, PHP, MySQL, REST API' },
  { icon: Sparkles, title: 'AI Workflow', desc: 'Hermes, OpenCode, Antigravity' },
  { icon: PenTool, title: 'Ops', desc: 'VPS deploy, Cloudflare R2, Docker' },
]

function FeatureCard({
  children,
  className = '',
  index = 0,
}: {
  children: React.ReactNode
  className?: string
  index?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative notch bg-card border border-border hover:border-primary/40 p-7 md:p-8 transition-colors duration-300 flex flex-col justify-between overflow-hidden ${className}`}
    >
      {children}
      <div className="absolute top-7 right-7 w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary/70 transition-colors duration-300" />
    </motion.div>
  )
}

export function AboutSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">A passionate developer who loves building innovative solutions</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard index={0} className="lg:col-span-2">
            <div>
              <div className="w-11 h-11 notch-sm bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors">
                <User className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2.5">Who I am</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                I&apos;m Kusuma Jaya, or you can call me Kusjay. I&apos;m a web developer from Indonesia. I build things end to end, from the database to the interface people use. Recent work includes a management platform for my university organization and this portfolio.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I use AI tools like Hermes, OpenCode, and Antigravity every day. They speed up the repetitive work, while I stay responsible for the plan and the final result.
              </p>
            </div>
          </FeatureCard>
          {SKILLS.map((skill, i) => (
            <FeatureCard key={skill.title} index={i + 1}>
              <div>
                <div className="w-11 h-11 notch-sm bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors">
                  <skill.icon className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2.5">{skill.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{skill.desc}</p>
              </div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  )
}
