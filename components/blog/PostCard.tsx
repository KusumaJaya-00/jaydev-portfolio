'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Post } from '@/lib/supabase/queries'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="bg-card border-border hover:border-primary/50 transition-colors h-full">
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
          <CardTitle className="text-xl">{post.title}</CardTitle>
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
          <p className="text-muted-foreground line-clamp-3">
            {post.excerpt ?? ''}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}