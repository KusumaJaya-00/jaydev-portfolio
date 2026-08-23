'use client'

import { useRef, useState } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase/client'

const BUCKET = 'images'
const MAX_SIZE = 2 * 1024 * 1024 // 2 MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

/**
 * Upload gambar ke Supabase Storage (bucket `media`, folder per tipe).
 * Tetap menulis URL hasil upload ke input name={name} agar handleSubmit lama tidak berubah.
 */
export default function ImageUpload({
  name,
  label,
  folder,
  defaultValue = '',
}: {
  name: string
  label: string
  folder: 'projects' | 'posts' | 'gallery'
  defaultValue?: string
}) {
  const [url, setUrl] = useState(defaultValue)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setError('')
    if (!ALLOWED.includes(file.type)) {
      setError('Format harus JPG/PNG/WebP/AVIF.')
      return
    }
    if (file.size > MAX_SIZE) {
      setError('Maksimal 2 MB.')
      return
    }
    setUploading(true)
    const ext = file.name.split('.').pop()?.toLowerCase() || 'webp'
    const base = file.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    const path = `${folder}/${Date.now()}-${base}.${ext}`
    const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
      contentType: file.type,
      upsert: false,
    })
    if (upErr) {
      setError(upErr.message)
      setUploading(false)
      return
    }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    setUrl(data.publicUrl)
    setUploading(false)
  }

  const clear = () => {
    setUrl('')
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex items-start gap-2">
        <Input
          id={name}
          name={name}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Upload file atau tempel URL..."
          readOnly={uploading}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="shrink-0 inline-flex items-center gap-1.5 notch-sm border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors disabled:opacity-50"
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {url && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear image"
            className="shrink-0 notch-sm border border-border p-2 text-muted-foreground hover:text-destructive transition-colors"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
        }}
      />
      {error && <p className="text-destructive text-xs">{error}</p>}
      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="Preview" className="notch-sm max-h-32 w-auto object-cover" />
      )}
    </div>
  )
}
