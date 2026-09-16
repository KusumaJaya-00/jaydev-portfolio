'use client'

import { useRef, useState } from 'react'
import { UploadCloud, X, Loader2, Plus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { uploadImage } from '@/lib/supabase/upload'

/**
 * Upload galeri multi-gambar. Menulis JSON array URL ke input hidden name={name}.
 * Preview grid dengan tombol hapus per item.
 */
export default function GalleryUpload({
  name,
  label,
  folder,
  defaultValue = [],
}: {
  name: string
  label: string
  folder: 'projects' | 'posts' | 'gallery'
  defaultValue?: string[]
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (files: FileList | File[]) => {
    setError('')
    setUploading(true)
    for (const file of Array.from(files)) {
      const res = await uploadImage(file, folder)
      if ('error' in res) {
        setError(res.error)
        continue
      }
      setUrls((prev) => [...prev, res.url])
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const remove = (index: number) => {
    setUrls((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <input type="hidden" name={name} value={JSON.stringify(urls)} />
      {urls.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {urls.map((url, i) => (
            <div key={url + i} className="relative group/img aspect-video notch-sm border border-border overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`${label} ${i + 1}`} className="absolute inset-0 h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label={`Hapus gambar ${i + 1}`}
                className="absolute top-1 right-1 notch-sm border border-border bg-card p-1 text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center justify-center aspect-video notch-sm border border-dashed border-border hover:border-primary/50 bg-muted/30 cursor-pointer transition-colors"
            aria-label="Tambah gambar"
          >
            {uploading ? <Loader2 className="size-4 text-muted-foreground animate-spin" /> : <Plus className="size-4 text-muted-foreground" />}
          </button>
        </div>
      )}
      {urls.length === 0 && (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 notch-sm border border-dashed border-border hover:border-primary/50 bg-muted/30 px-6 py-8 text-center cursor-pointer transition-colors"
        >
          {uploading ? (
            <Loader2 className="size-5 text-muted-foreground animate-spin" />
          ) : (
            <>
              <UploadCloud className="size-5 text-muted-foreground" />
              <span className="text-sm text-foreground">Klik atau tarik gambar ke sini</span>
              <span className="text-xs text-muted-foreground">Bisa beberapa sekaligus — JPG, PNG, WebP, AVIF, maks 2 MB</span>
            </>
          )}
        </button>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(e.target.files)
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files)
        }}
      />
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  )
}