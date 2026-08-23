import Link from 'next/link'

export function InquiryCta() {
  return (
    <div className="mt-10 notch bg-muted/40 border border-border p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold">Need something built?</h3>
      <p className="text-muted-foreground mt-2 leading-relaxed">
        I help teams ship performant, accessible web products — from landing pages
        to full-stack apps. If you have an idea, let&apos;s scope it together.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 notch-sm bg-primary hover:bg-secondary text-primary-foreground font-semibold px-6 py-2.5 transition-colors"
        >
          Discuss a project
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center notch-sm border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-card/60 transition-colors"
        >
          See past work
        </Link>
      </div>
    </div>
  )
}
