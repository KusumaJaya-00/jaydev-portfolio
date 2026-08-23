import { getProjectBySlug } from '@/lib/supabase/queries'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import EmptyState from '@/components/layout/EmptyState'
import { BackLink } from '@/components/layout/BackLink'
import { renderMarkdown } from '@/lib/markdown'
import { PublicShell } from '@/components/layout/PublicShell'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: project.title,
    description: project.description || project.seo_description || undefined,
    openGraph: {
      title: project.seo_title || project.title,
      description: project.description || project.seo_description || '',
      images: project.featured_image ? [{ url: project.featured_image }] : undefined,
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <PublicShell>
      <article className="container mx-auto px-4 md:px-8 py-16 max-w-3xl">
      <div className="mb-4">
        <BackLink href="/projects" label="$ cd ~/projects" />
      </div>
      <div className="notch bg-card border border-border p-6 md:p-10">
        <h1 className="text-4xl font-bold mb-4 text-sweep">{project.title}</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.category && (
            <Badge variant="secondary" className="badge-notch capitalize">{project.category}</Badge>
          )}
          {project.tech_stack.map((tech) => (
            <Badge key={tech} variant="outline" className="badge-notch">{tech}</Badge>
          ))}
        </div>

        {project.featured_image && (
          <img
            src={project.featured_image}
            alt={project.title}
            className="notch-sm w-full h-auto mb-8"
          />
        )}

        {project.content ? (
          <div
            className="markdown-body max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(project.content) }}
          />
        ) : (
          <EmptyState
            title="No content yet"
            description="This project doesn't have a write-up yet."
          />
        )}
      </div>
      </article>
    </PublicShell>
  )
}
