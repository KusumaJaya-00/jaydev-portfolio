-- ============================================================
-- FRESH SEED — TRUNCATE projects, posts then insert (idempotent on re-run).
-- Pesan contact (messages) TIDAK dihapus.
-- Jalankan di: Supabase Dashboard > SQL Editor (tanpa Docker).
-- ============================================================

TRUNCATE projects, posts;
-- TRUNCATE messages;

INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order) VALUES
  (
  'E-Commerce App', 'e-commerce-app',
  'Full-stack e-commerce with cart, checkout, and order insights.',
  E'<h2>Why this exists</h2><p>A storefront that stays fast even with large catalogs — clean cart, retry-safe checkout, and order tracking that actually helps support.</p><h3>Build</h3><ul><li>Next.js App Router + Server Actions for cart mutations</li><li>Supabase (Postgres, Auth, Storage) with RLS per user</li><li>Edge caching + image optimization</li></ul><blockquote>Principles: fewest round-trips, reversible actions, readable states.</blockquote><p>Result: checkout feel that doesn''t duplicate orders, and an admin view that stays calm.</p>',
  'web', ARRAY['Next.js','Supabase','Tailwind']::text[],
  'https://demo.jaydev.my.id/ecommerce'::text, 'https://github.com/KusumaJaya-00/jaydev-ecommerce'::text,
  '/images/projects/placeholder-ecommerce-app.webp',
  'published'::text, true, 0);

INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order) VALUES
  ('Task Manager', 'task-manager',
  'Realtime Kanban for small teams — drag, sync, and notify.',
  E'<h2>Overview</h2><p>A focused board: drag cards, see who moved what, get nudged when something blocks you.</p><h3>Architecture</h3><ol><li>React + dnd for the board</li><li>Node.js + Socket.IO for realtime presence</li><li>PostgreSQL as source of truth — sockets are ephemeral, DB is not</li></ol><p>Trade-off: sockets give liveness, but everything critical goes through the DB so refresh never loses work.</p>',
  'web', ARRAY['React','Node.js','Socket.io','PostgreSQL']::text[],
  'https://demo.jaydev.my.id/task-manager'::text, 'https://github.com/KusumaJaya-00/jaydev-task-manager'::text,
  '/images/projects/placeholder-task-manager.webp',
  'published'::text, true, 0);

INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order) VALUES
  ('API Gateway', 'api-gateway',
  'Lightweight gateway: rate limit, cache, and centralized JWT.',
  E'<h2>What it does</h2><p>A thin edge layer in front of internal services: per-key rate limits, Redis response cache, JWT verification once.</p><h3>Corners</h3><ul><li>Token bucket per route · key</li><li>Stale-while-revalidate for hot reads</li><li>Structured logs per hop</li></ul><pre><code>checks = verify(jwt) → limit(key, route) → cache.get() → upstream</code></pre>',
  'tool', ARRAY['Go','Redis','Docker']::text[],
  'https://demo.jaydev.my.id/api-gateway'::text, 'https://github.com/KusumaJaya-00/jaydev-api-gateway'::text,
  '/images/projects/placeholder-api-gateway.webp',
  'published'::text, false, 3);

INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order) VALUES
  ('HIMA TI Platform', 'hima-ti-platform',
  'Internal platform for the informatics student association.',
  E'<h2>Context</h2><p>Admin for Pengurus, archives of activities, and member services — with Microsoft campus auth (NIM as email prefix).</p><h3>Stack</h3><p>Laravel 13 + Filament 5, MySQL, Cloudflare R2 (primary storage) · GDrive backup.</p><h3>Operational notes</h3><ul><li>Image names in kebab-case</li><li>Dot-grid home, card notch everywhere — same language as this portfolio</li></ul>',
  'web', ARRAY['Laravel','Filament','MySQL','Cloudflare R2']::text[],
  'https://demo.jaydev.my.id/hima-ti'::text, 'https://github.com/KusumaJaya-00/jaydev-hima-ti'::text,
  '/images/projects/placeholder-task-manager.webp',
  'published'::text, true, 4);

INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order) VALUES
  ('Weather Dashboard', 'weather-dashboard',
  'Find a city, see the next 7 days, and read the map.',
  E'<h2>Experience</h2><p>Type a city, watch the forecast fill in, scrub the map — data is open, UI hides the seams.</p><h3>Data flow</h3><ol><li>Open-Meteo for forecast</li><li>MapLibre for the layer</li><li>Edge cache so we don''t burn the quota on every pan</li></ol>',
  'web', ARRAY['Next.js','Open-Meteo','MapLibre']::text[],
  'https://demo.jaydev.my.id/weather'::text, 'https://github.com/KusumaJaya-00/jaydev-weather'::text,
  '/images/projects/placeholder-ecommerce-app.webp',
  'published'::text, false, 5);

INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order) VALUES
  ('Inventory Ledger', 'inventory-ledger',
  'Small-warehouse inventory with batch tracking and exports.',
  E'<h2>Problem</h2><p>Spreadsheets drift — counts, batches, and expiries need a ledger.</p><h3>Solution</h3><ul><li>Ledger table as append-only source</li><li>Views for current stock + aging</li><li>CSV/XLSX export without heavy deps</li></ul><p>Outcome: audit-friendly history; corrections are new rows, not edits.</p>',
  'web', ARRAY['Next.js','PostgreSQL','Prisma']::text[],
  'https://demo.jaydev.my.id/inventory'::text, 'https://github.com/KusumaJaya-00/jaydev-inventory-ledger'::text,
  '/images/placeholder-generic.webp',
  'published'::text, false, 6);

INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order) VALUES
  ('Docs Microsite', 'docs-microsite',
  'A docs site that behaves like an app — fast search, dark mode.',
  E'<h2>Details</h2><p>MDX content with the same markdown pipeline as the portfolio, search via pagefind-style static index, and a TOC that follows you.</p><blockquote>Goal: reading feels frictionless — no layout shifts, code copy works first try.</blockquote>',
  'web', ARRAY['Next.js','MDX','Tailwind']::text[],
  'https://demo.jaydev.my.id/docs'::text, 'https://github.com/KusumaJaya-00/jaydev-docs-microsite'::text,
  '/images/placeholder-generic.webp',
  'published'::text, false, 7);

INSERT INTO projects (title, slug, description, content, category, tech_stack, live_url, github_url, featured_image, status, is_featured, sort_order) VALUES
  ('Receipt OCR', 'receipt-ocr',
  'Snap a receipt — get line items, totals, and a tidy table.',
  E'<h2>Flow</h2><ol><li>Capture → perspective fix</li><li>OCR + heuristic line grouping</li><li>Table review → export to sheets</li></ol><p>Privacy by default: images stay on device until the user opts into cloud assist.</p>',
  'tool', ARRAY['TypeScript','Tesseract','Canvas']::text[],
  'https://demo.jaydev.my.id/receipt-ocr'::text, 'https://github.com/KusumaJaya-00/jaydev-receipt-ocr'::text,
  '/images/placeholder-generic.webp',
  'published'::text, false, 8
);

INSERT INTO posts (title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at) VALUES
  (
  'How I Built This Portfolio', 'how-i-built-this-portfolio',
  'Next.js + Supabase + Tailwind v4: notch corners, glass nav, dot-grid — and a daily AI-assisted workflow.',
  E'<h2>Why this stack</h2><p>Next.js App Router keeps data close to the page, Supabase (Postgres · Auth · Storage) keeps ops simple, Tailwind v4 keeps styling in one language.</p><h3>Design choices</h3><ul><li><strong>Notch corners</strong> on every card and button (<code>clip-path</code>) — a single visual identity.</li><li>Dark base with <code>#3D7FFF</code> accents, subtle dot-grid on the body.</li><li>IBM Plex Mono for the <code>jaydev</code> wordmark.</li></ul><blockquote>Principle: smallest diff that communicates — ship, watch, refine.</blockquote><h3>Workflow</h3><p>Designed with AI agents (Hermes, Claude, Codex): I steer, agents execute, I review the diff — not just the outcome.</p>',
  'tutorial', ARRAY['nextjs','supabase','portfolio','tailwind']::text[],
  '/images/posts/placeholder-how-i-built-this-portfolio.webp',
  'published'::text, 4, now() - interval '9 day');

INSERT INTO posts (title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at) VALUES
  ('Catatan Next.js × Supabase', 'nextjs-supabase-notes',
  'Pola server/client, RLS, storage public URL — catatan lapangan yang sering kepakai.',
  E'<h2>Server vs Client</h2><p>Read di Server Components via server client; browser client only for user interactions.</p><h2>RLS</h2><p>Set policies di tabel publik: read terbuka, write hanya lewat <code>auth.role() = ''authenticated''</code>.</p><h2>Storage</h2><p>Satu bucket <code>images</code>, public read; path konsisten <code>kebab-case</code>.</p><h3>Cliff notes</h3><ul><li><code>createServerClient</code> per request di RSC</li><li>service role hanya di trusted routes</li></ul>',
  'notes', ARRAY['nextjs','supabase']::text[],
  '/images/posts/placeholder-nextjs-supabase-notes.webp',
  'published'::text, 3, now() - interval '12 day');

INSERT INTO posts (title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at) VALUES
  ('AI-Assisted Development Workflow', 'ai-assisted-dev-workflow',
  'How I use Hermes, Claude, and Codex daily: delegate, review the diff, gate quality.',
  E'<h2>Why</h2><p>Agents accelerate execution; direction and taste stay human.</p><h2>Daily flow</h2><ol><li>Break the task into small, unambiguous units</li><li>Delegate with full context</li><li>Review the diff — not just the result</li><li>Gate: lint, build, manual check on critical paths</li></ol><blockquote>Strong context in → strong work out.</blockquote><h3>Lessons</h3><ul><li>Small diffs are reviewable diffs</li><li>Automate the checklist, not the judgment</li></ul>',
  'workflow', ARRAY['ai','workflow','hermes']::text[],
  '/images/posts/placeholder-ai-assisted-dev.webp',
  'published'::text, 3, now() - interval '18 day');

INSERT INTO posts (title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at) VALUES
  ('NevaGate on Next: Glass, Dot-grid, and Notch', 'nevagate-on-next',
  'Translating a reference design system into this portfolio — tokens, motion, and where we diverge.',
  E'<h2>From reference to tokens</h2><p>The reference (NevaGate) speaks in <em>surface-line</em> and <em>ink-muted</em> — we map those to our tokens: <code>border</code>, <code>muted-foreground</code>, <code>primary</code>.</p><h2>Shared vocabulary</h2><ul><li><code>.notch</code> · <code>.notch-sm</code> · <code>.badge-notch</code></li><li><code>.glass</code> for nav, dot-grid on body</li><li><code>.text-sweep</code>, <code>.pulse-ring</code>, <code>.btn-glow</code></li></ul><p>Where we diverge is intentional: our cards live denser, typography a touch tighter.</p>',
  'notes', ARRAY['design','nextjs','tokens']::text[],
  '/images/placeholder-generic.webp',
  'published'::text, 4, now() - interval '7 day');

INSERT INTO posts (title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at) VALUES
  ('Laravel Filament: R2 as Primary, GDrive as Backup', 'filament-r2-gdrive',
  'How the HIMA TI app ships uploads: kebab-case names, signed URLs, and a backup heartbeat.',
  E'<h2>Storage</h2><p>R2 as primary, Google Drive as backup (rclone heartbeat). Names in <code>kebab-case</code>: <code>foto-pengurus.webp</code>, never underscores.</p><h2>Gotchas</h2><ul><li>Ensure signed URL policy matches the <code>images</code> public read</li><li>Retry on transient R2 5xx — don''t surface it as a user error</li></ul><pre><code>checks = write(R2) → verify(publicUrl) → enqueue(backup)</code></pre>',
  'tutorial', ARRAY['laravel','filament','r2','storage']::text[],
  '/images/placeholder-generic.webp',
  'published'::text, 5, now() - interval '4 day');

INSERT INTO posts (title, slug, excerpt, content, category, tags, featured_image, status, read_time, published_at) VALUES
  ('The Small-Diff Discipline', 'small-diff-discipline',
  'The shortest path to done is the right path — if you understood the whole thing first.',
  E'<h2>Understand first, then be lazy</h2><p>The ladder that matters: reuse → stdlib → platform feature → installed dep → one line → minimal code. Skipping comprehension to ship a small diff is the dangerous kind of lazy.</p><blockquote>The smallest change in the wrong place isn''t lazy, it''s a second bug.</blockquote><h3>Checklist</h3><ul><li>Fix root cause in the shared function, not every caller</li><li>Leave one runnable check for non-trivial logic</li><li>Name the ceiling: <code># ponytail: …</code></li></ul>',
  'workflow', ARRAY['ponytail','craft','review']::text[],
  '/images/placeholder-generic.webp',
  'published'::text, 3, now() - interval '2 day'
);

INSERT INTO settings (key, value) VALUES
  ('site_title', '"jaydev"'),
  ('site_description', '"Full-Stack Developer"'),
  ('footer_text', '"© 2026 Kusjay"')
ON CONFLICT (key) DO NOTHING;
