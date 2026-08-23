'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import MessagesActions from '@/components/admin/MessagesActions'
import MessageModal, { type MessageDetail } from '@/components/admin/MessageModal'

type Message = MessageDetail

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function MessagesTable({ messages }: { messages: Message[] }) {
  const router = useRouter()
  const [openId, setOpenId] = useState<string | null>(null)
  const open = messages.find((m) => m.id === openId) ?? null

  async function handleOpened() {
    if (!open || open.is_read) return
    // Optimis: tandai terbaca di UI, lalu persist + refresh
    open.is_read = true
    await fetch('/api/messages/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: open.id }),
    })
    router.refresh()
  }

  return (
    <>
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
                <TableRow
                  key={msg.id}
                  onClick={() => setOpenId(msg.id)}
                  className={`cursor-pointer ${msg.is_read ? '' : 'bg-primary/5'}`}
                >
                  <TableCell><Badge variant={msg.is_read ? 'outline' : 'default'} className="badge-notch">{msg.is_read ? 'Read' : 'Unread'}</Badge></TableCell>
                  <TableCell>
                    <div className="font-medium">{msg.name}</div>
                    <a href={`mailto:${msg.email}`} onClick={(e) => e.stopPropagation()} className="text-xs text-muted-foreground hover:text-primary">{msg.email}</a>
                  </TableCell>
                  <TableCell>{msg.subject || '—'}</TableCell>
                  <TableCell className="max-w-sm"><p className="truncate text-muted-foreground">{msg.message}</p></TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">{formatDate(msg.created_at)}</TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <MessagesActions id={msg.id} isRead={!!msg.is_read} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {open && (
        <MessageModal
          message={open}
          onClose={() => setOpenId(null)}
          onOpen={handleOpened}
        />
      )}
    </>
  )
}
