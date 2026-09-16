'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { supabase } from '@/lib/supabase/client'
import { ChevronLeft } from 'lucide-react'
import RichTextEditor from '@/components/admin/RichTextEditor'
import ImageUpload from '@/components/admin/ImageUpload'
import GalleryUpload from '@/components/admin/GalleryUpload'

export default function NewProjectPage() {
 const router = useRouter()
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState('')

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setLoading(true)
  setError('')
  const formData = new FormData(e.currentTarget)
  const techStack = (formData.get('tech_stack') as string).split(',').map(s => s.trim()).filter(Boolean)
  const slug = (formData.get('title') as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  let gallery: string[] = []
  try { gallery = JSON.parse((formData.get('gallery') as string) || '[]') } catch { gallery = [] }
  // Project baru ditaruh di urutan paling akhir.
  let sortOrder = 0
  const { data: maxRows } = await supabase.from('projects').select('sort_order').order('sort_order', { ascending: false }).limit(1)
  if (maxRows && maxRows.length > 0) sortOrder = (maxRows[0].sort_order || 0) + 1
  const project = {
   title: formData.get('title'),
   slug,
   description: formData.get('description'),
   content: formData.get('content'),
   category: formData.get('category'),
   tech_stack: techStack,
   live_url: formData.get('live_url'),
   github_url: formData.get('github_url'),
   featured_image: formData.get('featured_image'),
   gallery,
   status: formData.get('status') || 'draft',
   is_featured: formData.get('is_featured') === 'on',
   sort_order: sortOrder,
  }
  const { error } = await supabase.from('projects').insert([project])
  if (error) { setError(error.message); setLoading(false); return }
  router.push('/admin/projects')
 }

 return (
  <div>
   <div className="flex items-center gap-4 mb-6">
    <Button variant="ghost" size="sm" onClick={() => router.back()}><ChevronLeft className="h-4 w-4 mr-1" />Back</Button>
    <h1 className="text-3xl font-bold">New Project</h1>
   </div>
   <form onSubmit={handleSubmit} className="notch bg-card border border-border space-y-5 p-6 md:p-8">
    {error && <div className="notch-sm bg-destructive/10 text-destructive p-3 text-sm">{error}</div>}
    <div className="space-y-1.5"><Label htmlFor="title">Title *</Label><Input id="title" name="title" required /></div>
    <div className="space-y-1.5"><Label htmlFor="category">Category</Label><Input id="category" name="category" placeholder="web, mobile, api, design" /></div>
    <div className="space-y-1.5"><Label htmlFor="description">Short Description</Label><Textarea id="description" name="description" rows={2} /></div>
    <RichTextEditor />
    <div className="space-y-1.5"><Label htmlFor="tech_stack">Tech Stack (comma separated)</Label><Input id="tech_stack" name="tech_stack" placeholder="React, Next.js, TypeScript" /></div>
    <div className="grid grid-cols-2 gap-4">
     <div className="space-y-1.5"><Label htmlFor="live_url">Live URL</Label><Input id="live_url" name="live_url" type="url" placeholder="https://..." /></div>
     <div className="space-y-1.5"><Label htmlFor="github_url">GitHub URL</Label><Input id="github_url" name="github_url" type="url" placeholder="https://github.com/..." /></div>
    </div>
    <ImageUpload name="featured_image" label="Image" folder="projects" />
    <GalleryUpload name="gallery" label="Gallery Images" folder="projects" />
    <div className="flex items-center gap-6">
     <div className="flex items-center gap-2"><Switch id="is_featured" name="is_featured" defaultChecked={false} /><Label htmlFor="is_featured">Show on Homepage</Label></div>
     <div className="space-y-1.5"><Label htmlFor="status">Status</Label><select id="status" name="status" className="w-full notch-sm border border-input bg-muted/40 px-3 py-2 text-sm outline-none focus:border-primary/50" defaultValue="draft"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></div>
    </div>
    <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Project'}</Button>
   </form>
  </div>
 )
}