import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center max-w-md">
      <p className="text-sweep text-7xl font-extrabold mb-4">404</p>
      <h1 className="text-2xl font-bold mb-3">Page not found</h1>
      <p className="text-muted-foreground mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className={cn(buttonVariants())}>Back to Home</Link>
    </div>
  )
}
