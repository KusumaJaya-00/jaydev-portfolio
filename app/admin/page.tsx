import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FileText, FolderGit2, Mail, MailOpen, Plus } from 'lucide-react'

type Stats = {
  projects: number
  posts: number
  messages: number
  unread: number
}

async function getStats(): Promise<Stats> {
  const supabase = await createSupabaseServerClient()
  const [projects, posts, messages] = await Promise.all([
    supabase.from('projects').select('id', { count: 'exact', head: true }),
    supabase.from('posts').select('id', { count: 'exact', head: true }),
    supabase.from('messages').select('is_read', { count: 'exact', head: true }),
  ])
  const { count: unread } = await supabase
    .from('messages')
    .select('id', { count: 'exact', head: true })
    .eq('is_read', false)

  return {
    projects: projects.count ?? 0,
    posts: posts.count ?? 0,
    messages: messages.count ?? 0,
    unread: unread ?? 0,
  }
}

async function getRecentMessages() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('messages')
    .select('id, name, subject, message, is_read, created_at')
    .order('created_at', { ascending: false })
    .limit(5)
  return data || []
}

const statCards = [
  { key: 'projects' as const, label: 'Projects', icon: FolderGit2, href: '/admin/projects' },
  { key: 'posts' as const, label: 'Blog Posts', icon: FileText, href: '/admin/blog' },
  { key: 'messages' as const, label: 'Messages', icon: Mail, href: '/admin/messages' },
]

export default async function AdminDashboard() {
  const stats = await getStats()
  const recent = await getRecentMessages()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/admin/projects/new" className={cn(buttonVariants({ variant: 'outline' }), 'inline-flex items-center')}>
            <Plus className="h-4 w-4 mr-1" />Project
          </Link>
          <Link href="/admin/blog/new" className={cn(buttonVariants(), 'inline-flex items-center')}>
            <Plus className="h-4 w-4 mr-1" />Post
          </Link>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {statCards.map(({ key, label, icon: Icon, href }) => (
          <Link
            key={key}
            href={href}
            className="group notch bg-card border border-border p-6 transition-colors hover:border-primary/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-3xl font-bold mt-1">{stats[key]}</p>
              </div>
              <Icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            {key === 'messages' && stats.unread > 0 && (
              <p className="mt-2 text-xs text-primary">{stats.unread} unread</p>
            )}
          </Link>
        ))}
      </div>

      {/* Recent messages */}
      <div className="notch bg-card border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MailOpen className="h-5 w-5 text-muted-foreground" />Recent Messages
          </h2>
          <Link href="/admin/messages" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-muted-foreground text-sm">No messages yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((msg) => (
              <li key={msg.id} className="py-3 flex items-start justify-between gap-4">
                <Link
                  href="/admin/messages"
                  className="min-w-0 flex-1 group/msg"
                  title="Buka di Messages"
                >
                  <p className="text-sm font-medium truncate group-hover/msg:text-primary transition-colors">
                    {!msg.is_read && <span className="inline-block h-2 w-2 rounded-full bg-primary mr-2 align-middle" />}
                    {msg.name} — {msg.subject || '(no subject)'}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                </Link>
                <span className="text-xs text-muted-foreground whitespace-nowrap pt-0.5">
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
