import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

/**
 * Shared shell for public pages (navbar + main + footer).
 * Replaces the old route-group layout so pages can live flat in app/.
 */
export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-16">{children}</main>
      <Footer />
    </>
  )
}
