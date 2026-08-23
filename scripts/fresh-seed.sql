-- ============================================================
-- FRESH SEED jaydev portfolio — persis `migrate:fresh --seed`
-- KOSONGKAN tabel lalu isi ulang dengan data awal.
-- Jalankan di: Supabase Dashboard > SQL Editor (tanpa Docker)
-- AMAN DIULANG. Data di-generate dari kondisi DB aktual.
--
-- Catatan: pesan contact (messages) TIDAK dihapus.
-- Mau ikut kosong? Hapus komentar baris TRUNCATE messages di bawah.
-- File gambar di Storage tidak terhapus oleh script ini.
-- ============================================================

TRUNCATE projects, posts;
-- TRUNCATE messages;


INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order) VALUES
  ('E-Commerce App', 'e-commerce-app', 'Full-stack e-commerce with cart and checkout', '## Problem\nBuild a modern e-commerce platform...\n\n## Solution\nNext.js with Supabase...', 'web', ARRAY['Next.js','Supabase','Tailwind']::text[], NULL, NULL, '/images/projects/placeholder-ecommerce-app.webp', 'published', TRUE, 0);

INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order) VALUES
  ('Task Manager', 'task-manager', 'Real-time task management with Kanban', '## Overview\nA Kanban-style task manager...', 'web', ARRAY['React','Node.js','Socket.io']::text[], NULL, NULL, '/images/projects/placeholder-task-manager.webp', 'published', TRUE, 0);

INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order) VALUES
  ('API Gateway', 'api-gateway', 'Lightweight gateway: rate limit, caching, dan auth terpusat.', '## Overview
Gateway kecil di depan service internal: rate limiting per-API-key, response cache Redis, dan JWT verification terpusat.', 'backend', ARRAY['Go','Redis','Docker']::text[], NULL, NULL, '/images/projects/placeholder-api-gateway.webp', 'published', FALSE, 3);

INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order) VALUES
  ('HIMA TI Platform', 'hima-ti-platform', 'Platform internal Himpunan Mahasiswa Teknik Informatika: admin panel, arsip, dan layanan anggota.', '## Overview
Sistem informasi himpunan: manajemen pengurus, arsip kegiatan, dan layanan anggota dengan auth Microsoft kampus.

## Stack
Laravel 13 + Filament 5 untuk admin, Cloudflare R2 sebagai primary storage.', 'web', ARRAY['Laravel','Filament','MySQL','Cloudflare R2']::text[], NULL, NULL, '/images/projects/placeholder-task-manager.webp', 'published', TRUE, 4);

INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order) VALUES
  ('Weather Dashboard', 'weather-dashboard', 'Dashboard cuaca dengan forecast harian dan peta interaktif.', '## Overview
Dashboard cuaca open-data: cari kota, lihat forecast 7 hari, dan visualisasi peta. Cache API response di edge biar hemat quota.', 'web', ARRAY['Next.js','Open-Meteo','MapLibre']::text[], NULL, NULL, '/images/projects/placeholder-ecommerce-app.webp', 'published', FALSE, 5);

INSERT INTO posts (title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at) VALUES
  ('How I Built This Portfolio', 'how-i-built-this-portfolio', 'Learn how I built this portfolio using Next.js, Supabase, and shadcn/ui.', '## Introduction\nI wanted to build a modern portfolio...\n\n## Tech Stack\n- Next.js\n- Supabase\n- shadcn/ui', 'tutorial', ARRAY['nextjs','supabase','portfolio']::text[], '/images/posts/placeholder-how-i-built-this-portfolio.webp', 'published', 1, '2026-08-23T01:58:30.335857+00:00');

INSERT INTO posts (title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at) VALUES
  ('Catatan Next.js × Supabase', 'nextjs-supabase-notes', 'Pola server/client, RLS, storage public URL — catatan singkat yang sering kepakai.', '## Server vs Client
Gunakan server client untuk read di Server Components; browser client hanya untuk interaksi user.

## RLS
Selalu set policy di tabel publik: baca terbuka, tulis hanya service role atau user terautentikasi.

## Storage
Public bucket untuk aset konten; path konsisten kebab-case.', 'notes', ARRAY['nextjs','supabase']::text[], '/images/posts/placeholder-nextjs-supabase-notes.webp', 'published', 3, '2026-08-18T10:57:55.745572+00:00');

INSERT INTO posts (title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at) VALUES
  ('AI-Assisted Development Workflow', 'ai-assisted-dev-workflow', 'Cara saya memakai Hermes, Claude, dan Codex harian: delegasi task, review, dan quality gate.', '## Why
Agent mempercepat eksekusi, tapi arah desain dan keputusan tetap di manusia.

## Daily Flow
1. Breakdown task jadi unit kecil yang jelas
2. Delegasikan ke agent dengan konteks lengkap
3. Review diff — bukan cuma hasil akhir
4. Quality gate: lint, build, test manual alur kritikal

## Lessons
- Konteks yang baik = hasil yang baik
- Small diffs lebih mudah direview
- Otomatisasi checklist berulang', 'workflow', ARRAY['ai','tools']::text[], '/images/posts/placeholder-ai-assisted-dev.webp', 'published', 3, '2026-08-15T10:57:55.745572+00:00');
