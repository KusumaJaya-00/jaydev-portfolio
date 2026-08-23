import { getPostBySlug } from '@/lib/supabase/queries'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { BackLink } from '@/components/layout/BackLink'
import { renderMarkdown } from '@/lib/markdown'
import { PublicShell } from '@/components/layout/PublicShell'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post not found' }
  return {
    title: post.title,
    description: post.excerpt || post.seo_description || undefined,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.excerpt || post.seo_description || '',
      type: 'article',
      publishedTime: post.published_at || undefined,
      images: post.featured_image ? [{ url: post.featured_image }] : undefined,
    },
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <PublicShell>
      <article className="container mx-auto px-4 md:px-8 py-16 max-w-3xl">
        <div className="mb-4">
          <BackLink href="/blog" label="$ cd ~/blog" />
        </div>
        <div className="notch bg-card border border-border p-6 md:p-10">
        <h1 className="text-4xl font-bold mb-4 text-sweep">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
          {post.category && <Badge variant="secondary" className="badge-notch capitalize">{post.category}</Badge>}
          {post.published_at && <time dateTime={post.published_at}>{new Date(post.published_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</time>}
          {post.read_time && <span>· {post.read_time} min read</span>}
        </div>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="badge-notch text-xs">#{tag}</Badge>
            ))}
          </div>
        )}

        {post.featured_image && (
          <img
            src={post.featured_image}
            alt={post.title}
            className="notch-sm w-full h-auto mb-8"
          />
        )}

        <div
          className="markdown-body max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />
        </div>
      </article>
    </PublicShell>
  )
}
