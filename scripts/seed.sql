-- ============================================================
-- SEED jaydev portfolio — jalankan di Supabase SQL Editor
-- Aman dijalankan berulang: hanya MENAMBAH slug yang belum ada,
-- TIDAK mengubah/menghapus data existing buatanmu.
-- Gambar placeholder: public/images/{projects,posts}/placeholder-*.webp
-- (generate ulang: node scripts/generate-placeholders.js)
-- ============================================================

-- ---------- PROJECTS (tambahan) ----------
INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order)
SELECT * FROM (VALUES
(
  'API Gateway', 'api-gateway',
  'Lightweight gateway: rate limit, caching, dan auth terpusat.',
  $md$## Overview
Gateway kecil di depan service internal: rate limiting per-API-key, response cache Redis, dan JWT verification terpusat.$md$,
  'backend', ARRAY['Go','Redis','Docker']::text[],
  NULL::text, NULL::text,
  '/images/projects/placeholder-api-gateway.webp',
  'published'::text, false, 3
),
(
  'HIMA TI Platform', 'hima-ti-platform',
  'Platform internal Himpunan Mahasiswa Teknik Informatika: admin panel, arsip, dan layanan anggota.',
  $md$## Overview
Sistem informasi himpunan: manajemen pengurus, arsip kegiatan, dan layanan anggota dengan auth Microsoft kampus.

## Stack
Laravel 13 + Filament 5 untuk admin, Cloudflare R2 sebagai primary storage.$md$,
  'web', ARRAY['Laravel','Filament','MySQL','Cloudflare R2']::text[],
  NULL::text, NULL::text,
  '/images/projects/placeholder-task-manager.webp',
  'published'::text, true, 4
),
(
  'Weather Dashboard', 'weather-dashboard',
  'Dashboard cuaca dengan forecast harian dan peta interaktif.',
  $md$## Overview
Dashboard cuaca open-data: cari kota, lihat forecast 7 hari, dan visualisasi peta. Cache API response di edge biar hemat quota.$md$,
  'web', ARRAY['Next.js','Open-Meteo','MapLibre']::text[],
  NULL::text, NULL::text,
  '/images/projects/placeholder-ecommerce-app.webp',
  'published'::text, false, 5
)
) AS v(title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM projects p WHERE p.slug = v.slug);

-- ---------- BLOG POSTS (tambahan) ----------
INSERT INTO posts (title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at)
SELECT * FROM (VALUES
(
  'Catatan Next.js × Supabase', 'nextjs-supabase-notes',
  'Pola server/client, RLS, storage public URL — catatan singkat yang sering kepakai.',
  $md$## Server vs Client
Gunakan server client untuk read di Server Components; browser client hanya untuk interaksi user.

## RLS
Selalu set policy di tabel publik: baca terbuka, tulis hanya service role atau user terautentikasi.

## Storage
Public bucket untuk aset konten; path konsisten kebab-case.$md$,
  'notes', ARRAY['nextjs','supabase']::text[],
  '/images/posts/placeholder-nextjs-supabase-notes.webp',
  'published'::text, 3, now() - interval '5 day'
),
(
  'AI-Assisted Development Workflow', 'ai-assisted-dev-workflow',
  'Cara saya memakai Hermes, Claude, dan Codex harian: delegasi task, review, dan quality gate.',
  $md$## Why
Agent mempercepat eksekusi, tapi arah desain dan keputusan tetap di manusia.

## Daily Flow
1. Breakdown task jadi unit kecil yang jelas
2. Delegasikan ke agent dengan konteks lengkap
3. Review diff — bukan cuma hasil akhir
4. Quality gate: lint, build, test manual alur kritikal

## Lessons
- Konteks yang baik = hasil yang baik
- Small diffs lebih mudah direview
- Otomatisasi checklist berulang$md$,
  'workflow', ARRAY['ai','tools']::text[],
  '/images/posts/placeholder-ai-assisted-dev.webp',
  'published'::text, 3, now() - interval '8 day'
)
) AS v(title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at)
WHERE NOT EXISTS (SELECT 1 FROM posts p WHERE p.slug = v.slug);

-- ---------- ISI FOTO post yang belum punya (aman diulang) ----------
UPDATE posts
SET featured_image = '/images/posts/placeholder-how-i-built-this-portfolio.webp'
WHERE slug = 'how-i-built-this-portfolio'
  AND (featured_image IS NULL OR featured_image = '');
