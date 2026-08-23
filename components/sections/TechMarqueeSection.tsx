const TECH = [
  'React',
  'Next.js',
  'TypeScript',
  'Laravel',
  'Tailwind CSS',
  'PHP',
  'MySQL',
  'Docker',
]

export function TechMarqueeSection() {
  return (
    <section className="relative py-10 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Tech stack I work with
        </p>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="marquee-wrap animate-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1}>
              {TECH.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 px-8 sm:px-10 text-lg sm:text-xl font-semibold text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  <span className="w-1 h-1 rounded-full bg-blue-500/60" />
                  {tech}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
