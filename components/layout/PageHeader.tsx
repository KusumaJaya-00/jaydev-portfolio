interface PageHeaderProps {
  title: string
  description?: string
  /** Optional terminal-style command line shown above the title */
  command?: string
}

export function PageHeader({ title, description, command }: PageHeaderProps) {
  return (
    <div className="pt-6 md:pt-8 pb-10 md:pb-14 text-center">
      {command && (
        <p className="font-mono text-xs text-muted-foreground mb-4">{command}</p>
      )}
      <h1 className="text-4xl md:text-5xl font-bold leading-tight text-sweep">{title}</h1>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}
