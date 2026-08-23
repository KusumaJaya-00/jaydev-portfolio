'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(
        error.message.toLowerCase().includes('not confirmed')
          ? 'Verifikasi email dulu sebelum sign in.'
          : 'Email atau password salah.'
      )
      setLoading(false)
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="notch bg-card border border-border w-full max-w-sm p-8">
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="font-mono text-lg font-bold text-primary">
            jaydev
          </Link>
        </div>
        <h1 className="text-lg font-semibold text-foreground text-center mb-6">Sign in to Dashboard</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full notch-sm bg-muted/40 border border-border text-foreground text-sm px-4 py-2.5 focus:border-primary/50 outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full notch-sm bg-muted/40 border border-border text-foreground text-sm px-4 py-2.5 pr-11 focus:border-primary/50 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 notch-sm bg-primary hover:bg-secondary text-primary-foreground font-semibold text-sm disabled:opacity-50 transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
      <Link
        href="/"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3" />
        Back to home
      </Link>
    </div>
  )
}
