'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, Eye, ArrowUp, ArrowDown, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import type { Project } from '@/lib/supabase/queries'

export default function AdminProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [movingId, setMovingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })
      if (error) { setError(error.message) } else { setProjects(data || []) }
      setLoading(false)
    }
    fetchProjects()
  }, [])

  /** Swap nilai sort_order dengan tetangga di atas/bawah. */
  async function move(index: number, dir: 1 | -1) {
    const target = index + dir
    if (target < 0 || target >= projects.length || movingId) return
    const a = projects[index]
    const b = projects[target]
    setMovingId(a.id)
    setError('')
    const { error: e1 } = await supabase.from('projects').update({ sort_order: b.sort_order }).eq('id', a.id)
    const { error: e2 } = await supabase.from('projects').update({ sort_order: a.sort_order }).eq('id', b.id)
    if (e1 || e2) {
      setError(e1?.message || e2?.message || 'Gagal mengubah urutan.')
      setMovingId(null)
      return
    }
    setProjects((prev) => {
      const next = [...prev]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
    setMovingId(null)
    router.refresh()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/admin/projects/new" className={cn(buttonVariants(), "inline-flex items-center")}><Plus className="h-4 w-4 mr-2" />New Project</Link>
      </div>
      {error && <div className="notch-sm bg-destructive/10 text-destructive p-3 text-sm mb-4">{error}</div>}
      <div className="notch bg-card border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Homepage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No projects yet.</TableCell></TableRow>
            ) : (
              projects.map((project, index) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground text-sm tabular-nums w-5">{index + 1}</span>
                      <div className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => move(index, -1)}
                          disabled={index === 0 || movingId === project.id}
                          aria-label={`Pindah ${project.title} ke atas`}
                          className="disabled:opacity-30 hover:text-primary transition-colors"
                        >
                          {movingId === project.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ArrowUp className="h-3.5 w-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => move(index, 1)}
                          disabled={index === projects.length - 1 || movingId === project.id}
                          aria-label={`Pindah ${project.title} ke bawah`}
                          className="disabled:opacity-30 hover:text-primary transition-colors"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell><Badge variant="secondary" className="badge-notch capitalize">{project.category || 'Uncategorized'}</Badge></TableCell>
                  <TableCell><Badge variant={project.status === 'published' ? 'default' : 'outline'} className="badge-notch">{project.status || 'draft'}</Badge></TableCell>
                  <TableCell>
                    {project.is_featured ? (
                      <Badge variant="default" className="badge-notch">Shown</Badge>
                    ) : (
                      <Badge variant="outline" className="badge-notch text-muted-foreground">Hidden</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/projects/${project.slug}`} target="_blank" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}><Eye className="h-4 w-4" /></Link>
                      <Link href={`/admin/projects/${project.id}/edit`} className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}><Pencil className="h-4 w-4" /></Link>
                      <Link href={`/admin/projects/${project.id}/delete`} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-destructive hover:text-destructive")}><Trash2 className="h-4 w-4" /></Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}