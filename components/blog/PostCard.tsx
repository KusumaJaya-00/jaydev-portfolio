'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Post } from '@/lib/supabase/queries'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <Card className="group/card relative bg-card border-border hover:border-primary/50 transition-colors overflow-hidden h-full flex flex-col">
          <div className="relative h-48 -mt-4 overflow-hidden shrink-0">
            {/* ponytail: <img> biasa — next/image butuh daftar remotePatterns per domain storage */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.featured_image || '/images/placeholder-generic.webp'}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover group-hover/card:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
          <CardHeader>
            {/* Judul: maks 2 baris, min-h menjaga posisi badge sejajar antar card */}
            <CardTitle className="text-xl line-clamp-2 min-h-[2lh]">
              {post.title}
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="badge-notch capitalize">
                {post.category || 'General'}
              </Badge>
              {post.read_time && (
                <Badge variant="outline" className="badge-notch">{post.read_time} min read</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {/* Deskripsi: maks 2 baris + truncate */}
            <p className="text-muted-foreground line-clamp-2">
              {post.excerpt ?? ''}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
