'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

export type MessageDetail = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  is_read: boolean | null
  created_at: string
}

/** Modal detail pesan. onOpen dipanggil sekali saat modal mulai dibuka (untuk auto mark-as-read). */
export default function MessageModal({
  message,
  onClose,
  onOpen,
}: {
  message: MessageDetail
  onClose: () => void
  onOpen?: () => void
}) {
  const router = useRouter()
  const [notified, setNotified] = useState(false)

  // Escape untuk menutup + kunci scroll body saat modal terbuka
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  async function markAsRead() {
    if (message.is_read) return
    await fetch('/api/messages/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: message.id }),
    })
    if (!notified) {
      setNotified(true)
      router.refresh()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => { onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={message.subject || 'Message'}
        className="notch bg-card border border-border w-full max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={(e) => {
          e.stopPropagation()
          markAsRead()
        }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-5">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold truncate">{message.subject || '(no subject)'}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Dari <span className="text-foreground font-medium">{message.name}</span>{' '}
              &lt;<a href={`mailto:${message.email}`} className="hover:text-primary">{message.email}</a>&gt;
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-5">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.message}</p>
        </div>

        <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
          {new Date(message.created_at).toLocaleString('en-US', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  )
}
