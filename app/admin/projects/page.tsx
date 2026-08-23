import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'

async function getProjects() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  if (error) return []
  return data || []
}

export default async function AdminProjectsPage() {
  const projects = await getProjects()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/admin/projects/new" className={cn(buttonVariants(), "inline-flex items-center")}><Plus className="h-4 w-4 mr-2" />New Project</Link>
      </div>
      <div className="notch bg-card border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Homepage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No projects yet.</TableCell></TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
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