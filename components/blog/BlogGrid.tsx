'use client'

import { motion } from 'framer-motion'
import { PostCard } from '@/components/blog/PostCard'
import { Post } from '@/lib/supabase/queries'

export function BlogGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
        >
          <PostCard post={post} />
        </motion.div>
      ))}
    </div>
  )
}
