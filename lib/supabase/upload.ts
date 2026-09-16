import { supabase } from './client'

const BUCKET = 'images'
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const MAX_SIZE = 2 * 1024 * 1024 // 2 MB

/**
 * Upload satu gambar ke storage, kembalikan public URL.
 * Dipakai ImageUpload & GalleryUpload — validasi format/ukuran di sini.
 */
export async function uploadImage(
  file: File,
  folder: 'projects' | 'posts' | 'gallery'
): Promise<{ url: string } | { error: string }> {
  if (!ALLOWED.includes(file.type)) {
    return { error: 'Format harus JPG/PNG/WebP/AVIF.' }
  }
  if (file.size > MAX_SIZE) {
    return { error: 'Maksimal 2 MB.' }
  }
  const ext = file.name.split('.').pop()?.toLowerCase() || 'webp'
  const base = file.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  const path = `${folder}/${Date.now()}-${base}.${ext}`
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  })
  if (upErr) return { error: upErr.message }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl }
}