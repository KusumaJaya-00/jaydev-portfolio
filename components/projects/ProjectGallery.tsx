'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

/**
 * Grid screenshot + overlay modal.
 * Klik thumbnail → overlay penuh (render di body via portal), navigasi panah kiri/kanan, Esc / klik backdrop tutup.
 */
export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const next = useCallback(() => setOpen((i) => (i === null ? null : (i + 1) % images.length)), [images.length])
  const prev = useCallback(() => setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length)), [images.length])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, next, prev])

  return (
    <>
      {/* grid — horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Buka screenshot ${i + 1}`}
            className="group/img shrink-0 w-[280px] md:w-[320px] overflow-hidden notch-sm border border-border cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              loading="lazy"
              className="w-full h-auto object-contain transition-transform duration-300 group-hover/img:scale-105"
            />
          </button>
        ))}
      </div>

      {/* overlay modal — portal ke body supaya tidak terpotong clip-path */}
      {open !== null && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screenshot ${open + 1}`}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
        >
          {/* close */}
          <button
            type="button"
            onClick={close}
            aria-label="Tutup"
            className="absolute top-4 right-4 z-20 notch-sm border border-border bg-card p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-5" />
          </button>

          {/* image + arrows */}
          <div
            className="flex items-center gap-2 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={prev}
              aria-label="Sebelumnya"
              className="shrink-0 z-10 notch-sm border border-border bg-card/95 p-2.5 text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[open]}
              alt={`${title} screenshot ${open + 1}`}
              onClick={next}
              className="max-h-[85vh] w-auto h-auto object-contain bg-card border border-border cursor-pointer"
            />

            <button
              type="button"
              onClick={next}
              aria-label="Berikutnya"
              className="shrink-0 z-10 notch-sm border border-border bg-card/95 p-2.5 text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          {/* counter */}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 notch-sm bg-card border border-border px-3 py-1 text-xs text-muted-foreground tabular-nums">
            {open + 1} / {images.length}
          </span>
        </div>,
        document.body
      )}
    </>
  )
}
