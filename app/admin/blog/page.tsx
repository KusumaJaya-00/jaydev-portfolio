import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, Eye } from 'lucide-react'

async function getPosts() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return []
  return data || []
}

export default async function AdminBlogPage() {
  const posts = await getPosts()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog</h1>
        <Link href="/admin/blog/new" className={cn(buttonVariants(), "inline-flex items-center")}><Plus className="h-4 w-4 mr-2" />New Post</Link>
      </div>
      <div className="notch bg-card border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No posts yet.</TableCell></TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell><Badge variant="secondary" className="badge-notch">{post.category || 'Uncategorized'}</Badge></TableCell>
                  <TableCell><Badge variant={post.status === 'published' ? 'default' : 'outline'} className="badge-notch">{post.status || 'draft'}</Badge></TableCell>
                  <TableCell>{post.published_at ? new Date(post.published_at).toLocaleDateString() : '—'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/blog/${post.slug}`} target="_blank" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}><Eye className="h-4 w-4" /></Link>
                      <Link href={`/admin/blog/${post.id}/edit`} className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}><Pencil className="h-4 w-4" /></Link>
                      <Link href={`/admin/blog/${post.id}/delete`} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-destructive hover:text-destructive")}><Trash2 className="h-4 w-4" /></Link>
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
