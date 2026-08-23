'use client'

import { useEffect, useState } from 'react'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { supabase } from '@/lib/supabase/client'
import type { Project } from '@/lib/supabase/queries'
import { ChevronLeft } from 'lucide-react'
import RichTextEditor from '@/components/admin/RichTextEditor'
import ImageUpload from '@/components/admin/ImageUpload'

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
 const { id } = use(params)
 const router = useRouter()
 const [loading, setLoading] = useState(false)
 const [fetching, setFetching] = useState(true)
 const [error, setError] = useState('')
 const [project, setProject] = useState<Project | null>(null)

 useEffect(() => {
  async function fetchProject() {
   const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
   if (error) { setError(error.message); setFetching(false); return }
   setProject(data); setFetching(false)
  }
  fetchProject()
 }, [id])

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setLoading(true)
  setError('')
  const formData = new FormData(e.currentTarget)
  const techStack = (formData.get('tech_stack') as string).split(',').map(s => s.trim()).filter(Boolean)
  const updates = {
   title: formData.get('title'),
   description: formData.get('description'),
   content: formData.get('content'),
   category: formData.get('category'),
   tech_stack: techStack,
   live_url: formData.get('live_url'),
   github_url: formData.get('github_url'),
   featured_image: formData.get('featured_image'),
   status: formData.get('status') || 'draft',
   is_featured: formData.get('is_featured') === 'on',
   updated_at: new Date().toISOString(),
  }
  const { error } = await supabase.from('projects').update(updates).eq('id', id)
  if (error) { setError(error.message); setLoading(false); return }
  router.push('/admin/projects')
 }

 if (fetching) return <div>Loading...</div>
 if (error) return <div className="text-destructive">{error}</div>
 if (!project) return <div>Project not found</div>

 return (
  <div>
   <div className="flex items-center gap-4 mb-6">
    <Button variant="ghost" size="sm" onClick={() => router.back()}><ChevronLeft className="h-4 w-4 mr-1" />Back</Button>
    <h1 className="text-3xl font-bold">Edit Project</h1>
   </div>
   <form onSubmit={handleSubmit} className="notch bg-card border border-border space-y-5 p-6 md:p-8">
    {error && <div className="notch-sm bg-destructive/10 text-destructive p-3 text-sm">{error}</div>}
    <div className="space-y-1.5"><Label htmlFor="title">Title *</Label><Input id="title" name="title" defaultValue={project.title} required /></div>
    <div className="space-y-1.5"><Label htmlFor="category">Category</Label><Input id="category" name="category" defaultValue={project.category || ''} /></div>
    <div className="space-y-1.5"><Label htmlFor="description">Short Description</Label><Textarea id="description" name="description" rows={2} defaultValue={project.description || ''} /></div>
    <RichTextEditor defaultValue={project.content || ''} />
    <div className="space-y-1.5"><Label htmlFor="tech_stack">Tech Stack (comma separated)</Label><Input id="tech_stack" name="tech_stack" defaultValue={project.tech_stack?.join(', ') || ''} /></div>
    <div className="grid grid-cols-2 gap-4">
     <div className="space-y-1.5"><Label htmlFor="live_url">Live URL</Label><Input id="live_url" name="live_url" type="url" defaultValue={project.live_url || ''} /></div>
     <div className="space-y-1.5"><Label htmlFor="github_url">GitHub URL</Label><Input id="github_url" name="github_url" type="url" defaultValue={project.github_url || ''} /></div>
    </div>
    <ImageUpload name="featured_image" label="Image" folder="projects" defaultValue={project.featured_image || ''} />
    <div className="flex items-center gap-6">
     <div className="flex items-center gap-2"><Switch id="is_featured" name="is_featured" defaultChecked={project.is_featured} /><Label htmlFor="is_featured">Show on Homepage</Label></div>
     <div className="space-y-1.5"><Label htmlFor="status">Status</Label><select id="status" name="status" className="w-full notch-sm border border-input bg-muted/40 px-3 py-2 text-sm outline-none focus:border-primary/50" defaultValue={project.status || 'draft'}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></div>
    </div>
    <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
   </form>
  </div>
 )
}