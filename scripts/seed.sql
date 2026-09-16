-- ============================================================
-- SEED awal jaydev portfolio — jalankan SETELAH semua migrasi.
-- supabase/seed.sql adalah CANONICAL (idempotent).
-- Placeholder regenerate: node scripts/generate-placeholders.js
-- Konten bertema, format HTML (rich-text). renderContent() di app
-- bisa merender HTML maupun sisa markdown lama (fallback).
-- ============================================================

\set ON_ERROR_STOP on

-- ---------- projects ----------
INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, gallery, status, is_featured, sort_order)
SELECT * FROM (VALUES
(
  'ResepKu', 'resepku',
  'Aplikasi Android untuk menjelajah, mencari, dan menyimpan resep masakan Indonesia — jelajah kartu resep, filter kategori, simpan favorit offline.',
  E'<h2>Tentang ResepKu</h2><p>ResepKu adalah aplikasi Android (Kotlin) untuk menjelajah, mencari, dan menyimpan resep masakan Indonesia dalam satu genggaman. Dibuat sebagai tugas UAS Pemrograman Mobile oleh kelompok 5 orang: I Putu Adhiatman, I Komang Bayu Kurniawan, I Nyoman Pande Guna Darma, I Made Kusuma Jaya Wardana, dan Putu Ryan Raditya.</p><h2>Empat Fitur Utama</h2><h3>1. Beranda — Jelajah Semua Resep</h3><p>Saat aplikasi dibuka, semua resep tampil sebagai kartu berisi gambar, nama, dan kategori. Tinggal scroll untuk menjelajah, tarik ke bawah untuk menyegarkan daftar. Di balik layar, data resep diambil dari internet lalu ditampilkan dalam grid, dengan RecyclerView adapter yang mengubah daftar data menjadi tampilan.</p><h3>2. Pencarian dan Filter</h3><p>Ketik nama, hasil muncul huruf demi huruf tanpa perlu menekan tombol cari. Chip kategori menyaring resep — misalnya hanya menampilkan kategori "Ayam". Data yang sudah diunduh disaring di memori, jadi terasa instan.</p><h3>3. Favorit — Simpan Resep Pilihan</h3><p>Tekan ikon hati untuk menyimpan resep. Resep favorit terkumpul di tab khusus dan tetap tersimpan walau aplikasi ditutup atau sedang tanpa internet — tersimpan di database lokal SQLite di dalam HP.</p><h3>4. Detail Resep</h3><p>Semua informasi dalam satu halaman: foto resep berukuran besar beserta label kategorinya, daftar bahan lengkap, dan langkah memasak yang disusun rapi dengan nomor urut.</p><h2>Sumber Data</h2><p>ResepKu memakai dua sumber data: <strong>internet (GitHub Raw)</strong> untuk daftar resep — file JSON di GitHub diakses lewat link Raw-nya, dipakai persis seperti alamat API tanpa perlu server sendiri — dan <strong>SQLite lokal</strong> untuk resep favorit di tab Favorit yang bisa diakses tanpa koneksi internet.</p><h2>Cara Penggunaan</h2><ol><li><strong>Buka &amp; Jelajah</strong> — aplikasi terbuka di Beranda dan scroll untuk melihat resep.</li><li><strong>Cari &amp; Detail</strong> — saring atau cari resep, lalu ketuk kartunya untuk detail.</li><li><strong>Simpan Favorit</strong> — tekan ikon hati untuk menyimpan resep ke Favorit.</li></ol><h2>Teknologi</h2><ul><li>Kotlin dengan Material Design dan ViewBinding</li><li>Retrofit + Gson untuk mengambil file JSON dari GitHub Raw</li><li>Glide untuk memuat gambar resep</li><li>RecyclerView + ViewModel untuk daftar</li><li>SQLite untuk penyimpanan favorit lokal</li></ul><blockquote>Prinsip desain: semuanya alat standar Android — dipilih yang sederhana dan mudah dijelaskan.</blockquote>',
  'mobile', ARRAY['Kotlin','Retrofit','Gson','Glide','SQLite','Material']::text[],
  NULL::text, 'https://github.com/KusumaJaya-00/ResepKu'::text,
  '/images/projects/resepku/thumbnail.png',
  ARRAY[
    '/images/projects/resepku/ss-resepku-1.png',
    '/images/projects/resepku/ss-resepku-2.png',
    '/images/projects/resepku/ss-resepku-3.png',
    '/images/projects/resepku/ss-resepku-4.png'
  ]::text[],
  'published'::text, false, 9
)
) AS v(title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, gallery, status, is_featured, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM projects p WHERE p.slug = v.slug);

-- ---------- posts ----------
INSERT INTO posts (title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at)
SELECT * FROM (VALUES
(
  'How I Built This Portfolio', 'how-i-built-this-portfolio',
  'Next.js + Supabase + Tailwind v4: notch corners, glass nav, dot-grid — and a daily AI-assisted workflow.',
  E'<h2>Why this stack</h2><p>Next.js App Router keeps data close to the page, Supabase (Postgres · Auth · Storage) keeps ops simple, Tailwind v4 keeps styling in one language.</p><h3>Design choices</h3><ul><li><strong>Notch corners</strong> on every card and button (<code>clip-path</code>) — a single visual identity.</li><li>Dark base with <code>#3D7FFF</code> accents, subtle dot-grid on the body.</li><li>IBM Plex Mono for the <code>jaydev</code> wordmark.</li></ul><blockquote>Principle: smallest diff that communicates — ship, watch, refine.</blockquote><h3>Workflow</h3><p>Designed with AI agents (Hermes, Claude, Codex): I steer, agents execute, I review the diff — not just the outcome.</p>',
  'tutorial', ARRAY['nextjs','supabase','portfolio','tailwind']::text[],
  '/images/posts/placeholder-how-i-built-this-portfolio.webp',
  'published'::text, 4, now() - interval '9 day'
),
(
  'Catatan Next.js × Supabase', 'nextjs-supabase-notes',
  'Pola server/client, RLS, storage public URL — catatan lapangan yang sering kepakai.',
  E'<h2>Server vs Client</h2><p>Read di Server Components via server client; browser client only for user interactions.</p><h2>RLS</h2><p>Set policies di tabel publik: read terbuka, write hanya lewat <code>auth.role() = ''authenticated''</code>.</p><h2>Storage</h2><p>Satu bucket <code>images</code>, public read; path konsisten <code>kebab-case</code>.</p><h3>Cliff notes</h3><ul><li><code>createServerClient</code> per request di RSC</li><li>service role hanya di trusted routes</li></ul>',
  'notes', ARRAY['nextjs','supabase']::text[],
  '/images/posts/placeholder-nextjs-supabase-notes.webp',
  'published'::text, 3, now() - interval '12 day'
),
(
  'AI-Assisted Development Workflow', 'ai-assisted-dev-workflow',
  'How I use Hermes, Claude, and Codex daily: delegate, review the diff, gate quality.',
  E'<h2>Why</h2><p>Agents accelerate execution; direction and taste stay human.</p><h2>Daily flow</h2><ol><li>Break the task into small, unambiguous units</li><li>Delegate with full context</li><li>Review the diff — not just the result</li><li>Gate: lint, build, manual check on critical paths</li></ol><blockquote>Strong context in → strong work out.</blockquote><h3>Lessons</h3><ul><li>Small diffs are reviewable diffs</li><li>Automate the checklist, not the judgment</li></ul>',
  'workflow', ARRAY['ai','workflow','hermes']::text[],
  '/images/posts/placeholder-ai-assisted-dev.webp',
  'published'::text, 3, now() - interval '18 day'
),
(
  'NevaGate on Next: Glass, Dot-grid, and Notch', 'nevagate-on-next',
  'Translating a reference design system into this portfolio — tokens, motion, and where we diverge.',
  E'<h2>From reference to tokens</h2><p>The reference (NevaGate) speaks in <em>surface-line</em> and <em>ink-muted</em> — we map those to our tokens: <code>border</code>, <code>muted-foreground</code>, <code>primary</code>.</p><h2>Shared vocabulary</h2><ul><li><code>.notch</code> · <code>.notch-sm</code> · <code>.badge-notch</code></li><li><code>.glass</code> for nav, dot-grid on body</li><li><code>.text-sweep</code>, <code>.pulse-ring</code>, <code>.btn-glow</code></li></ul><p>Where we diverge is intentional: our cards live denser, typography a touch tighter.</p>',
  'notes', ARRAY['design','nextjs','tokens']::text[],
  '/images/placeholder-generic.webp',
  'published'::text, 4, now() - interval '7 day'
),
(
  'Laravel Filament: R2 as Primary, GDrive as Backup', 'filament-r2-gdrive',
  'How the HIMA TI app ships uploads: kebab-case names, signed URLs, and a backup heartbeat.',
  E'<h2>Storage</h2><p>R2 as primary, Google Drive as backup (rclone heartbeat). Names in <code>kebab-case</code>: <code>foto-pengurus.webp</code>, never underscores.</p><h2>Gotchas</h2><ul><li>Ensure signed URL policy matches the <code>images</code> public read</li><li>Retry on transient R2 5xx — don''t surface it as a user error</li></ul><pre><code>checks = write(R2) → verify(publicUrl) → enqueue(backup)</code></pre>',
  'tutorial', ARRAY['laravel','filament','r2','storage']::text[],
  '/images/placeholder-generic.webp',
  'published'::text, 5, now() - interval '4 day'
),
(
  'The Small-Diff Discipline', 'small-diff-discipline',
  'The shortest path to done is the right path — if you understood the whole thing first.',
  E'<h2>Understand first, then be lazy</h2><p>The ladder that matters: reuse → stdlib → platform feature → installed dep → one line → minimal code. Skipping comprehension to ship a small diff is the dangerous kind of lazy.</p><blockquote>The smallest change in the wrong place isn''t lazy, it''s a second bug.</blockquote><h3>Checklist</h3><ul><li>Fix root cause in the shared function, not every caller</li><li>Leave one runnable check for non-trivial logic</li><li>Name the ceiling: <code># ponytail: …</code></li></ul>',
  'workflow', ARRAY['ponytail','craft','review']::text[],
  '/images/placeholder-generic.webp',
  'published'::text, 3, now() - interval '2 day'
)
) AS v(title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at)
WHERE NOT EXISTS (SELECT 1 FROM posts p WHERE p.slug = v.slug);

-- ---------- settings default ----------
INSERT INTO settings (key, value) VALUES
  ('site_title', '"jaydev"'),
  ('site_description', '"Full-Stack Developer"'),
  ('footer_text', '"© 2026 Kusjay"')
ON CONFLICT (key) DO NOTHING;
