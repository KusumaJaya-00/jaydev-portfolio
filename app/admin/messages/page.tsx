import { createSupabaseServerClient } from '@/lib/supabase/server'
import MessagesTable from '@/components/admin/MessagesTable'

type Message = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  is_read: boolean | null
  created_at: string
}

async function getMessages(): Promise<Message[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return []
  return data || []
}

export default async function AdminMessagesPage() {
  const messages = await getMessages()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      <MessagesTable messages={messages} />
    </div>
  )
}
