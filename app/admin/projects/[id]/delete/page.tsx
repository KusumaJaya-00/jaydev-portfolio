'use client'

import { useState } from 'react'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'

export default function DeleteProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    setLoading(true)
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/admin/projects')
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-card border border-border notch p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Delete Project</h1>
        <p className="text-muted-foreground mb-6">Are you sure? This action cannot be undone.</p>
        {error && <div className="notch-sm bg-destructive/10 text-destructive p-3 text-sm mb-4">{error}</div>}
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>{loading ? 'Deleting...' : 'Delete'}</Button>
        </div>
      </div>
    </div>
  )
}