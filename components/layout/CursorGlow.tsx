'use client'

import { useEffect, useRef } from 'react'

/**
 * CursorGlow — soft radial glow that follows the pointer (NevaGate-style).
 * Fixed layer behind content; disabled on touch devices and reduced-motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip on touch devices / no fine pointer
    if (!window.matchMedia('(pointer: fine)').matches) return
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight * 0.3
    // Current position lags toward the cursor for a smooth trail feel
    let x = targetX
    let y = targetY

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (!el.dataset.visible) {
        el.dataset.visible = '1'
        el.style.opacity = '1'
      }
    }

    const onLeave = () => {
      delete el.dataset.visible
      el.style.opacity = '0'
    }

    const tick = () => {
      // Lerp: ease toward the cursor position
      x += (targetX - x) * 0.12
      y += (targetY - y) * 0.12
      el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-500"
    />
  )
}
