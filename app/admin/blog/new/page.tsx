'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase/client'
import { ChevronLeft } from 'lucide-react'
import MarkdownEditor from '@/components/admin/MarkdownEditor'
import ImageUpload from '@/components/admin/ImageUpload'

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export default function NewPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formData = new FormData(e.currentTarget)
    const tags = (formData.get('tags') as string).split(',').map(s => s.trim()).filter(Boolean)
    const slug = (formData.get('title') as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    const content = formData.get('content') as string
    const status = (formData.get('status') as string) || 'draft'
    const post = {
      title: formData.get('title'),
      slug,
      excerpt: formData.get('excerpt'),
      content,
      category: formData.get('category'),
      tags,
      featured_image: formData.get('featured_image'),
      status,
      read_time: estimateReadTime(content || ''),
      published_at: status === 'published' ? new Date().toISOString() : null,
    }
    const { error } = await supabase.from('posts').insert([post])
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/admin/blog')
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()}><ChevronLeft className="h-4 w-4 mr-1" />Back</Button>
        <h1 className="text-3xl font-bold">New Post</h1>
      </div>
      <form onSubmit={handleSubmit} className="notch bg-card border border-border max-w-2xl space-y-5 p-6 md:p-8">
        {error && <div className="notch-sm bg-destructive/10 text-destructive p-3 text-sm">{error}</div>}
        <div className="space-y-1.5"><Label htmlFor="title">Title *</Label><Input id="title" name="title" required /></div>
        <div className="space-y-1.5"><Label htmlFor="category">Category</Label><Input id="category" name="category" placeholder="tutorial, notes, etc." /></div>
        <div className="space-y-1.5"><Label htmlFor="excerpt">Excerpt</Label><Textarea id="excerpt" name="excerpt" rows={2} placeholder="Short summary shown on cards..." /></div>
        <MarkdownEditor />
        <div className="space-y-1.5"><Label htmlFor="tags">Tags (comma separated)</Label><Input id="tags" name="tags" placeholder="nextjs, react, tips" /></div>
        <ImageUpload name="featured_image" label="Featured Image" folder="posts" />
        <div className="space-y-1.5"><Label htmlFor="status">Status</Label><select id="status" name="status" className="w-full notch-sm border border-input bg-muted/40 px-3 py-2 text-sm outline-none focus:border-primary/50" defaultValue="draft"><option value="draft">Draft</option><option value="published">Published</option></select></div>
        <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Post'}</Button>
      </form>
    </div>
  )
}
