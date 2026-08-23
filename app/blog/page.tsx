import { getPosts } from '@/lib/supabase/queries'
import { PublicShell } from '@/components/layout/PublicShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { BlogGrid } from '@/components/blog/BlogGrid'
import EmptyState from '@/components/layout/EmptyState'

export const metadata = {
  title: 'Blog',
  description: 'Thoughts, tutorials, and notes on web development.',
}

export default async function BlogPage() {
  const posts = await getPosts()
  return (
    <PublicShell>
      <div className="container mx-auto px-4 md:px-8 py-8">
        <PageHeader
          title="Blog"
          description="Thoughts and tutorials"
          command="$ cat blog/*.md"
        />
        {posts.length === 0 ? (
          <EmptyState
            title="No posts yet"
            description="Writing is on the way. Stay tuned!"
          />
        ) : (
          <BlogGrid posts={posts} />
        )}
      </div>
    </PublicShell>
  )
}
