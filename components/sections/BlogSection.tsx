'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PostCard } from '@/components/blog/PostCard'
import { Post } from '@/lib/supabase/queries'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BlogSectionProps {
  posts: Post[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  if (!posts.length) return null

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Blog Posts</h2>
            <p className="text-muted-foreground">Thoughts and tutorials</p>
          </div>
          <Link href="/blog" className="shrink-0 px-5 py-2.5 notch-sm border border-border text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-card/60 transition-all duration-300">
            View All
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}