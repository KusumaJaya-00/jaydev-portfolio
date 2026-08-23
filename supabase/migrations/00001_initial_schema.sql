-- ============================================================
-- 00001_initial_schema.sql — skema awal portfolio jaydev
-- Jalankan: Supabase Dashboard > SQL Editor > New query > paste > Run
-- ============================================================

-- ---------- projects ----------
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT,
  category TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  featured_image TEXT,
  gallery TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_search ON projects USING gin(
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, ''))
);

-- ---------- posts ----------
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  read_time INTEGER,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX idx_posts_search ON posts USING gin(
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, ''))
);

-- ---------- messages ----------
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_read ON messages(is_read);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- ---------- settings ----------
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------- skills ----------
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_skills_category ON skills(category);

-- ---------- experience ----------
CREATE TABLE experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  type TEXT CHECK (type IN ('work', 'education', 'certification')),
  logo TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_experience_type ON experience(type);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

-- projects: public read (published), authenticated full manage
CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT USING (status = 'published');
CREATE POLICY "Authenticated can manage projects"
  ON projects FOR ALL USING (auth.role() = 'authenticated');

-- posts: public read (published), authenticated full manage
CREATE POLICY "Public can view published posts"
  ON posts FOR SELECT USING (status = 'published');
CREATE POLICY "Authenticated can manage posts"
  ON posts FOR ALL USING (auth.role() = 'authenticated');

-- messages: anyone may send, only authenticated may read/delete/update
CREATE POLICY "Anyone can insert messages"
  ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated can view messages"
  ON messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update messages"
  ON messages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete messages"
  ON messages FOR DELETE USING (auth.role() = 'authenticated');

-- settings: public read, authenticated write
CREATE POLICY "Public can view settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage settings"
  ON settings FOR ALL USING (auth.role() = 'authenticated');

-- skills: public read, authenticated write
CREATE POLICY "Public can view skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage skills"
  ON skills FOR ALL USING (auth.role() = 'authenticated');

-- experience: public read, authenticated write
CREATE POLICY "Public can view experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage experience"
  ON experience FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- Storage bucket untuk gambar project/post (public read)
-- ============================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Authenticated can upload images"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
