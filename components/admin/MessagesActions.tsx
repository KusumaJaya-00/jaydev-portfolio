'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { CheckCheck, MailOpen, Trash2 } from 'lucide-react'

export default function MessagesActions({ id, isRead }: { id: string; isRead: boolean }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [busy, setBusy] = useState(false)

  async function toggleRead() {
    setBusy(true)
    await supabase.from('messages').update({ is_read: !isRead }).eq('id', id)
    setBusy(false)
    startTransition(() => router.refresh())
  }

  async function handleDelete() {
    if (!confirm('Delete this message? This action cannot be undone.')) return
    setBusy(true)
    await supabase.from('messages').delete().eq('id', id)
    setBusy(false)
    startTransition(() => router.refresh())
  }

  return (
    <div className="flex justify-end gap-1">
      <Button variant="ghost" size="sm" onClick={toggleRead} disabled={busy || pending} title={isRead ? 'Mark as unread' : 'Mark as read'}>
        {isRead ? <MailOpen className="h-4 w-4" /> : <CheckCheck className="h-4 w-4" />}
      </Button>
      <Button variant="ghost" size="sm" onClick={handleDelete} disabled={busy || pending} className="text-destructive hover:text-destructive" title="Delete">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
