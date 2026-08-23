import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

/** Tandai pesan sebagai sudah dibaca (dipanggil dari modal detail). */
export async function POST(request: Request) {
  const { id } = await request.json()
  if (typeof id !== 'string' || !id) {
    return NextResponse.json({ error: 'id wajib diisi' }, { status: 400 })
  }

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
