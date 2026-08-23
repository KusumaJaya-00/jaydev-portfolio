# DATABASE.md
# Database Schema Documentation (Supabase PostgreSQL)

## 🗄️ Overview

| Property | Value |
|----------|-------|
| **Database** | PostgreSQL 15 |
| **Provider** | Supabase |
| **Tables** | 6 |
| **Enums** | 4 |

---

## 📋 Tables

### 1. projects

Portfolio projects showcase.

```sql
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

-- Indexes
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(is_featured);

-- Full-text search
CREATE INDEX idx_projects_search ON projects USING gin(
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, ''))
);
```

**Columns:**

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | UUID | Auto | Primary key |
| `title` | TEXT | ✅ | Project name |
| `slug` | TEXT | ✅ | URL-friendly identifier (unique) |
| `description` | TEXT | ❌ | Short description (1-2 sentences) |
| `content` | TEXT | ❌ | Full description (Markdown) |
| `category` | TEXT | ❌ | Category (web, mobile, api, design) |
| `tech_stack` | TEXT[] | ❌ | Technologies used |
| `live_url` | TEXT | ❌ | Live demo URL |
| `github_url` | TEXT | ❌ | GitHub repository URL |
| `featured_image` | TEXT | ❌ | Main image URL |
| `gallery` | TEXT[] | ❌ | Additional images |
| `status` | TEXT | ❌ | draft, published, archived |
| `is_featured` | BOOLEAN | ❌ | Show on homepage |
| `sort_order` | INTEGER | ❌ | Display order |
| `seo_title` | TEXT | ❌ | SEO meta title |
| `seo_description` | TEXT | ❌ | SEO meta description |
| `created_at` | TIMESTAMPTZ | Auto | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Auto | Last update timestamp |

---

### 2. posts

Blog articles.

```sql
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

-- Indexes
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);

-- Full-text search
CREATE INDEX idx_posts_search ON posts USING gin(
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, ''))
);
```

**Columns:**

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | UUID | Auto | Primary key |
| `title` | TEXT | ✅ | Post title |
| `slug` | TEXT | ✅ | URL-friendly identifier (unique) |
| `content` | TEXT | ❌ | Full content (Markdown) |
| `excerpt` | TEXT | ❌ | Short summary |
| `featured_image` | TEXT | ❌ | Main image URL |
| `category` | TEXT | ❌ | Category (tutorial, thoughts, update) |
| `tags` | TEXT[] | ❌ | Tags for filtering |
| `status` | TEXT | ❌ | draft, published |
| `published_at` | TIMESTAMPTZ | ❌ | Publication date |
| `read_time` | INTEGER | ❌ | Estimated read time (minutes) |
| `seo_title` | TEXT | ❌ | SEO meta title |
| `seo_description` | TEXT | ❌ | SEO meta description |
| `created_at` | TIMESTAMPTZ | Auto | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Auto | Last update timestamp |

---

### 3. messages

Contact form submissions.

```sql
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_messages_read ON messages(is_read);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
```

**Columns:**

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | UUID | Auto | Primary key |
| `name` | TEXT | ✅ | Sender name |
| `email` | TEXT | ✅ | Sender email |
| `subject` | TEXT | ❌ | Message subject |
| `message` | TEXT | ✅ | Message content |
| `is_read` | BOOLEAN | ❌ | Read status |
| `created_at` | TIMESTAMPTZ | Auto | Submission timestamp |

---

### 4. settings

Key-value site configuration.

```sql
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Columns:**

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `key` | TEXT | ✅ | Setting key (unique) |
| `value` | JSONB | ❌ | Setting value (any JSON) |
| `updated_at` | TIMESTAMPTZ | Auto | Last update timestamp |

**Default Settings:**

```sql
INSERT INTO settings (key, value) VALUES
  ('site_title', '"My Portfolio"'),
  ('site_description', '"Full-Stack Developer"'),
  ('logo_url', 'null'),
  ('favicon_url', 'null'),
  ('footer_text', '"© 2026 My Portfolio"'),
  ('social_github', '"https://github.com/username"'),
  ('social_linkedin', '"https://linkedin.com/in/username"'),
  ('social_twitter', '"https://twitter.com/username"'),
  ('social_email', '"email@example.com"'),
  ('seo_title', '"My Portfolio - Full-Stack Developer"'),
  ('seo_description', '"Personal portfolio showcasing my work"'),
  ('seo_og_image', 'null');
```

---

### 5. skills

Technical skills showcase.

```sql
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_skills_category ON skills(category);
```

**Columns:**

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | UUID | Auto | Primary key |
| `name` | TEXT | ✅ | Skill name (React, Node.js, etc.) |
| `category` | TEXT | ❌ | frontend, backend, tools |
| `proficiency` | INTEGER | ❌ | Skill level (0-100) |
| `icon` | TEXT | ❌ | Icon name or URL |
| `sort_order` | INTEGER | ❌ | Display order |
| `created_at` | TIMESTAMPTZ | Auto | Creation timestamp |

---

### 6. experience

Work and education history.

```sql
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

-- Indexes
CREATE INDEX idx_experience_type ON experience(type);
```

**Columns:**

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | UUID | Auto | Primary key |
| `company` | TEXT | ✅ | Company/school name |
| `position` | TEXT | ✅ | Job title/degree |
| `description` | TEXT | ❌ | Description |
| `start_date` | DATE | ❌ | Start date |
| `end_date` | DATE | ❌ | End date (null if current) |
| `is_current` | BOOLEAN | ❌ | Currently working here |
| `type` | TEXT | ❌ | work, education, certification |
| `logo` | TEXT | ❌ | Company logo URL |
| `sort_order` | INTEGER | ❌ | Display order |
| `created_at` | TIMESTAMPTZ | Auto | Creation timestamp |

---

## 🔗 Relationships

```
projects ──────────────────────────────────────
  │
  ├── No foreign keys (standalone)
  └── References: None

posts ─────────────────────────────────────────
  │
  ├── No foreign keys (standalone)
  └── References: None

messages ──────────────────────────────────────
  │
  ├── No foreign keys (standalone)
  └── References: None

settings ──────────────────────────────────────
  │
  └── Key-value store (no relationships)

skills ────────────────────────────────────────
  │
  └── No foreign keys (standalone)

experience ────────────────────────────────────
  │
  └── No foreign keys (standalone)
```

> **Note:** This is a simple portfolio site. No complex relationships needed. Each table is independent.

---

## 🔒 Row Level Security (RLS)

### Enable RLS
```sql
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
```

### Policies

```sql
-- Projects: Public read, authenticated write
CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated can manage projects"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated');

-- Posts: Public read, authenticated write
CREATE POLICY "Public can view published posts"
  ON posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated can manage posts"
  ON posts FOR ALL
  USING (auth.role() = 'authenticated');

-- Messages: Authenticated only
CREATE POLICY "Authenticated can view messages"
  ON messages FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can insert messages"
  ON messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete messages"
  ON messages FOR DELETE
  USING (auth.role() = 'authenticated');

-- Settings: Public read, authenticated write
CREATE POLICY "Public can view settings"
  ON settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can update settings"
  ON settings FOR ALL
  USING (auth.role() = 'authenticated');

-- Skills: Public read, authenticated write
CREATE POLICY "Public can view skills"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can manage skills"
  ON skills FOR ALL
  USING (auth.role() = 'authenticated');

-- Experience: Public read, authenticated write
CREATE POLICY "Public can view experience"
  ON experience FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can manage experience"
  ON experience FOR ALL
  USING (auth.role() = 'authenticated');
```

---

## 📊 Sample Data

```sql
-- Sample Projects
INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured) VALUES
  (
    'E-Commerce App',
    'e-commerce-app',
    'Full-stack e-commerce application with cart and checkout',
    '## Problem\nBuild a modern e-commerce platform...\n\n## Solution\nUsed Next.js with Supabase...',
    'web',
    ARRAY['Next.js', 'Supabase', 'Tailwind CSS'],
    'https://ecommerce.vercel.app',
    'https://github.com/user/ecommerce',
    '/images/projects/ecommerce.jpg',
    'published',
    true
  ),
  (
    'Task Manager',
    'task-manager',
    'Real-time task management application',
    '## Overview\nA Kanban-style task manager...',
    'web',
    ARRAY['React', 'Node.js', 'Socket.io'],
    'https://tasks.vercel.app',
    'https://github.com/user/tasks',
    '/images/projects/tasks.jpg',
    'published',
    true
  );

-- Sample Posts
INSERT INTO posts (title, slug, content, excerpt, category, tags, status, published_at, read_time) VALUES
  (
    'How I Built This Portfolio',
    'how-i-built-this-portfolio',
    '## Introduction\nI wanted to build a modern portfolio...\n\n## Tech Stack\n- Next.js\n- Supabase\n    - shadcn/ui',
    'Learn how I built this portfolio website using Next.js, Supabase, and shadcn/ui.',
    'tutorial',
    ARRAY['nextjs', 'supabase', 'portfolio'],
    'published',
    NOW(),
    5
  );

-- Sample Skills
INSERT INTO skills (name, category, proficiency, icon, sort_order) VALUES
  ('React', 'frontend', 90, 'react', 1),
  ('Next.js', 'frontend', 85, 'nextjs', 2),
  ('TypeScript', 'frontend', 80, 'typescript', 3),
  ('Node.js', 'backend', 85, 'nodejs', 1),
  ('PostgreSQL', 'backend', 75, 'postgresql', 2),
  ('Git', 'tools', 90, 'git', 1),
  ('Docker', 'tools', 70, 'docker', 2);
```

---

*Last Updated: August 2026*