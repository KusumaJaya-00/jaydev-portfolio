'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    const formData = new FormData(e.currentTarget)
    // Kirim ke supabase via API route atau langsung
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        setError('')
        setSuccess(true)
        e.currentTarget.reset()
      } else {
        setSuccess(false)
        const data = await res.json().catch(() => ({}))
        setError((data as { error?: string }).error || 'Something went wrong')
      }
    } catch {
      setSuccess(false)
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} required />
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">Message sent!</p>}
      <Button type="submit" disabled={loading} className="rounded-none notch-sm px-5 font-semibold hover:bg-secondary">
        {loading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}