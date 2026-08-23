import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="dot-grid notch h-24 w-24 border border-border flex items-center justify-center mb-6">
        <span className="text-3xl">📭</span>
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className={cn(buttonVariants({ variant: 'outline' }))}>
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
