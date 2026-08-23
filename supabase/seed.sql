-- ============================================================
-- SEED awal jaydev portfolio — jalankan SETELAH semua migrasi.
-- Data = kondisi aktual DB produksi (5 project + 3 post).
-- Idempotent: aman dijalankan berulang (NOT EXISTS per slug).
-- Placeholder regenerate: node scripts/generate-placeholders.js
-- ============================================================

\set ON_ERROR_STOP on

-- ---------- projects ----------
INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order)
SELECT * FROM (VALUES
(
  'E-Commerce App', 'e-commerce-app',
  'Full-stack e-commerce with cart and checkout',
  E'## Problem\nBuild a modern e-commerce platform...\n\n## Solution\nNext.js with Supabase...',
  'web', ARRAY['Next.js','Supabase','Tailwind']::text[],
  NULL::text, NULL::text,
  '/images/projects/placeholder-ecommerce-app.webp',
  'published'::text, true, 0
),
(
  'Task Manager', 'task-manager',
  'Real-time task management with Kanban',
  E'## Overview\nA Kanban-style task manager...',
  'web', ARRAY['React','Node.js','Socket.io']::text[],
  NULL::text, NULL::text,
  '/images/projects/placeholder-task-manager.webp',
  'published'::text, true, 0
),
(
  'API Gateway', 'api-gateway',
  'Lightweight gateway: rate limit, caching, dan auth terpusat.',
  E'## Overview\nGateway kecil di depan service internal: rate limiting per-API-key, response cache Redis, dan JWT verification terpusat.',
  'backend', ARRAY['Go','Redis','Docker']::text[],
  NULL::text, NULL::text,
  '/images/projects/placeholder-api-gateway.webp',
  'published'::text, false, 3
),
(
  'HIMA TI Platform', 'hima-ti-platform',
  'Platform internal Himpunan Mahasiswa Teknik Informatika: admin panel, arsip, dan layanan anggota.',
  E'## Overview\nSistem informasi himpunan: manajemen pengurus, arsip kegiatan, dan layanan anggota dengan auth Microsoft kampus.\n\n## Stack\nLaravel 13 + Filament 5 untuk admin, Cloudflare R2 sebagai primary storage.',
  'web', ARRAY['Laravel','Filament','MySQL','Cloudflare R2']::text[],
  NULL::text, NULL::text,
  '/images/projects/placeholder-task-manager.webp',
  'published'::text, true, 4
),
(
  'Weather Dashboard', 'weather-dashboard',
  'Dashboard cuaca dengan forecast harian dan peta interaktif.',
  E'## Overview\nDashboard cuaca open-data: cari kota, lihat forecast 7 hari, dan visualisasi peta. Cache API response di edge biar hemat quota.',
  'web', ARRAY['Next.js','Open-Meteo','MapLibre']::text[],
  NULL::text, NULL::text,
  '/images/projects/placeholder-ecommerce-app.webp',
  'published'::text, false, 5
)
) AS v(title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM projects p WHERE p.slug = v.slug);

-- ---------- posts ----------
INSERT INTO posts (title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at)
SELECT * FROM (VALUES
(
  'How I Built This Portfolio', 'how-i-built-this-portfolio',
  'Learn how I built this portfolio website using Next.js, Supabase, and shadcn/ui.',
  E'## Introduction\nI wanted to build a modern portfolio...\n\n## Tech Stack\n- Next.js\n- Supabase\n- shadcn/ui',
  'tutorial', ARRAY['nextjs','supabase','portfolio']::text[],
  '/images/posts/placeholder-how-i-built-this-portfolio.webp',
  'published'::text, 4, now() - interval '9 day'
),
(
  'Catatan Next.js × Supabase', 'nextjs-supabase-notes',
  'Pola server/client, RLS, storage public URL — catatan singkat yang sering kepakai.',
  E'## Server vs Client\nGunakan server client untuk read di Server Components; browser client hanya untuk interaksi user.\n\n## RLS\nSelalu set policy di tabel publik: baca terbuka, tulis hanya service role atau user terautentikasi.\n\n## Storage\nPublic bucket untuk aset konten; path konsisten kebab-case.',
  'notes', ARRAY['nextjs','supabase']::text[],
  '/images/posts/placeholder-nextjs-supabase-notes.webp',
  'published'::text, 3, now() - interval '5 day'
),
(
  'AI-Assisted Development Workflow', 'ai-assisted-dev-workflow',
  'Cara saya memakai Hermes, Claude, dan Codex harian: delegasi task, review, dan quality gate.',
  E'## Why\nAgent mempercepat eksekusi, tapi arah desain dan keputusan tetap di manusia.\n\n## Daily Flow\n1. Breakdown task jadi unit kecil yang jelas\n2. Delegasikan ke agent dengan konteks lengkap\n3. Review diff — bukan cuma hasil akhir\n4. Quality gate: lint, build, test manual alur kritikal\n\n## Lessons\n- Konteks yang baik = hasil yang baik\n- Small diffs lebih mudah direview\n- Otomatisasi checklist berulang',
  'workflow', ARRAY['ai','tools']::text[],
  '/images/posts/placeholder-ai-assisted-dev.webp',
  'published'::text, 3, now() - interval '8 day'
)
) AS v(title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at)
WHERE NOT EXISTS (SELECT 1 FROM posts p WHERE p.slug = v.slug);

-- ---------- settings default ----------
INSERT INTO settings (key, value) VALUES
  ('site_title', '"jaydev"'),
  ('site_description', '"Full-Stack Developer"'),
  ('footer_text', '"© 2026 Kusjay"')
ON CONFLICT (key) DO NOTHING;
