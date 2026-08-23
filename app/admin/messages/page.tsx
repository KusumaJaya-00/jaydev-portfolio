import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import MessagesActions from '@/components/admin/MessagesActions'

type Message = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  is_read: boolean | null
  created_at: string
}

async function getMessages(): Promise<Message[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return []
  return data || []
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function AdminMessagesPage() {
  const messages = await getMessages()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      <div className="notch bg-card border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No messages yet.</TableCell></TableRow>
            ) : (
              messages.map((msg) => (
                <TableRow key={msg.id} className={cnRow(msg.is_read)}>
                  <TableCell><Badge variant={msg.is_read ? 'outline' : 'default'} className="badge-notch">{msg.is_read ? 'Read' : 'Unread'}</Badge></TableCell>
                  <TableCell>
                    <div className="font-medium">{msg.name}</div>
                    <a href={`mailto:${msg.email}`} className="text-xs text-muted-foreground hover:text-primary">{msg.email}</a>
                  </TableCell>
                  <TableCell>{msg.subject || '—'}</TableCell>
                  <TableCell className="max-w-sm"><p className="truncate text-muted-foreground">{msg.message}</p></TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">{formatDate(msg.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <MessagesActions id={msg.id} isRead={!!msg.is_read} />
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

function cnRow(isRead: boolean | null) {
  return isRead ? '' : 'bg-primary/5'
}
