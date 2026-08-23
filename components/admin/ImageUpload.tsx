'use client'

import { useRef, useState } from 'react'
import { UploadCloud, X, Loader2, ImageIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase/client'

const BUCKET = 'images'
const MAX_SIZE = 2 * 1024 * 1024 // 2 MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

/**
 * Upload box ala dropzone: klik area untuk pilih file.
 * Tetap menulis URL hasil upload ke input hidden name={name} agar handleSubmit lama tidak berubah.
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

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setUrl('')
    if (fileRef.current) fileRef.current.value = ''
  }

  if (url) {
    return (
      <div className="space-y-1.5">
        <Label htmlFor={name}>{label}</Label>
        <input type="hidden" name={name} value={url} />
        <div
          role="button"
          tabIndex={0}
          aria-label="Ganti gambar"
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              fileRef.current?.click()
            }
          }}
          className="group/notch relative w-80 max-w-full cursor-pointer notch-sm border border-dashed border-border hover:border-primary/50 overflow-hidden transition-colors"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Preview" className="w-full aspect-video object-cover" />
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover/notch:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-sm text-foreground">
            <UploadCloud className="size-4" />
            Ganti gambar
          </div>
          <button
            type="button"
            onClick={clear}
            aria-label="Hapus gambar"
            className="absolute top-2 right-2 notch-sm border border-border bg-card p-1.5 text-muted-foreground hover:text-destructive transition-colors"
          >
            <X className="size-4" />
          </button>
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
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <input type="hidden" name={name} value={url} />
      <div
        role="button"
        tabIndex={0}
        aria-label={`Upload ${label}`}
        onClick={() => fileRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            fileRef.current?.click()
          }
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const f = e.dataTransfer.files?.[0]
          if (f) handleFile(f)
        }}
        className="flex flex-col items-center justify-center gap-2 notch-sm border border-dashed border-border hover:border-primary/50 bg-muted/30 px-6 py-8 text-center cursor-pointer transition-colors"
      >
        {uploading ? (
          <>
            <Loader2 className="size-5 text-muted-foreground animate-spin" />
            <span className="text-sm text-muted-foreground">Uploading...</span>
          </>
        ) : (
          <>
            <UploadCloud className="size-5 text-muted-foreground" />
            <span className="text-sm text-foreground">Klik atau tarik gambar ke sini</span>
            <span className="text-xs text-muted-foreground">JPG, PNG, WebP, AVIF — maksimal 2 MB</span>
          </>
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
    </div>
  )
}
