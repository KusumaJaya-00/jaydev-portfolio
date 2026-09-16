'use client'

import { useEffect, useState } from 'react'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase/client'
import type { Post } from '@/lib/supabase/queries'
import { ChevronLeft } from 'lucide-react'
import RichTextEditor from '@/components/admin/RichTextEditor'
import ImageUpload from '@/components/admin/ImageUpload'
import GalleryUpload from '@/components/admin/GalleryUpload'

function estimateReadTime(content: string) {
 const words = content.trim().split(/\s+/).filter(Boolean).length
 return Math.max(1, Math.ceil(words / 200))
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
 const { id } = use(params)
 const router = useRouter()
 const [loading, setLoading] = useState(false)
 const [fetching, setFetching] = useState(true)
 const [error, setError] = useState('')
 const [post, setPost] = useState<Post | null>(null)

 useEffect(() => {
  async function fetchPost() {
   const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()
   if (error) { setError(error.message); setFetching(false); return }
   setPost(data); setFetching(false)
  }
  fetchPost()
 }, [id])

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setLoading(true)
  setError('')
  const formData = new FormData(e.currentTarget)
  const tags = (formData.get('tags') as string).split(',').map(s => s.trim()).filter(Boolean)
  const content = formData.get('content') as string
  const status = (formData.get('status') as string) || 'draft'
  let gallery: string[] = []
  try { gallery = JSON.parse((formData.get('gallery') as string) || '[]') } catch { gallery = [] }
  const updates: Record<string, unknown> = {
   title: formData.get('title'),
   excerpt: formData.get('excerpt'),
   content,
   category: formData.get('category'),
   tags,
   featured_image: formData.get('featured_image'),
   gallery,
   status,
   read_time: estimateReadTime(content || ''),
   updated_at: new Date().toISOString(),
  }
  // Set published_at on first publish; keep original otherwise
  if (status === 'published' && !post?.published_at) {
   updates.published_at = new Date().toISOString()
  }
  const { error } = await supabase.from('posts').update(updates).eq('id', id)
  if (error) { setError(error.message); setLoading(false); return }
  router.push('/admin/blog')
 }

 if (fetching) return <div>Loading...</div>
 if (error) return <div className="text-destructive">{error}</div>
 if (!post) return <div>Post not found</div>

 return (
  <div>
   <div className="flex items-center gap-4 mb-6">
    <Button variant="ghost" size="sm" onClick={() => router.back()}><ChevronLeft className="h-4 w-4 mr-1" />Back</Button>
    <h1 className="text-3xl font-bold">Edit Post</h1>
   </div>
   <form onSubmit={handleSubmit} className="notch bg-card border border-border space-y-5 p-6 md:p-8">
    {error && <div className="notch-sm bg-destructive/10 text-destructive p-3 text-sm">{error}</div>}
    <div className="space-y-1.5"><Label htmlFor="title">Title *</Label><Input id="title" name="title" defaultValue={post.title} required /></div>
    <div className="space-y-1.5"><Label htmlFor="category">Category</Label><Input id="category" name="category" defaultValue={post.category || ''} /></div>
    <div className="space-y-1.5"><Label htmlFor="excerpt">Excerpt</Label><Textarea id="excerpt" name="excerpt" rows={2} defaultValue={post.excerpt || ''} /></div>
    <RichTextEditor defaultValue={post.content || '' } />
    <div className="space-y-1.5"><Label htmlFor="tags">Tags (comma separated)</Label><Input id="tags" name="tags" defaultValue={post.tags?.join(', ') || ''} /></div>
    <ImageUpload name="featured_image" label="Image" folder="posts" defaultValue={post.featured_image || ''} />
    <GalleryUpload name="gallery" label="Gallery Images" folder="posts" defaultValue={post.gallery || []} />
    <div className="space-y-1.5"><Label htmlFor="status">Status</Label><select id="status" name="status" className="w-full notch-sm border border-input bg-muted/40 px-3 py-2 text-sm outline-none focus:border-primary/50" defaultValue={post.status || 'draft'}><option value="draft">Draft</option><option value="published">Published</option></select></div>
    <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
   </form>
  </div>
 )
}
