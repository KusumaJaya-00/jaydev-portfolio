import { createSupabaseServerClient } from './server'

export type Project = {
  id: string
  title: string
  slug: string
  description: string | null
  content: string | null
  category: string | null
  tech_stack: string[]
  live_url: string | null
  github_url: string | null
  featured_image: string | null
  gallery: string[]
  status: 'draft' | 'published' | 'archived'
  is_featured: boolean
  sort_order: number
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}

export type Post = {
  id: string
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  featured_image: string | null
  category: string | null
  tags: string[]
  status: 'draft' | 'published'
  published_at: string | null
  read_time: number | null
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}

export async function getProjects(limit?: number): Promise<Project[]> {
  const supabase = await createSupabaseServerClient()
  let query = supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query
  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }
  return data || []
}

export async function getFeaturedProjects(limit: number = 3): Promise<Project[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
  return data || []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching project by slug:', error)
    return null
  }
  return data
}

export async function getPosts(limit?: number): Promise<Post[]> {
  const supabase = await createSupabaseServerClient()
  let query = supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query
  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }
  return data || []
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
  return data
}

export async function submitMessage(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('messages').insert({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  })
  if (error) return { error: error.message }
  return {}
}