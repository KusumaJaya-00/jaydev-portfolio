# jaydev Portfolio

Personal portfolio — Next.js 16 (App Router) + Supabase + Tailwind CSS v4.

## Setup dari nol (buat yang baru clone)

### 1. Install dependencies

```bash
npm install
```

### 2. Setup database Supabase

1. Buat project di [supabase.com](https://supabase.com)
2. Buka **SQL Editor** → jalankan file migrasi satu per satu (urut):
   - `supabase/migrations/00001_initial_schema.sql` — tabel, index, RLS, storage bucket
3. Masih di SQL Editor → jalankan `supabase/seed.sql` — data awal (5 project + 3 post)

> File gambar placeholder sudah ada di repo (`public/images/`), jadi seed langsung tampil.
> Kalau mau regenerasi: `node scripts/generate-placeholders.js`

Skema lengkap & penjelasan kolom: [docs/DATABASE.md](docs/DATABASE.md).

### 3. Konfigurasi environment

```bash
cp .env.local.example .env.local
```

Isi dari Supabase Dashboard → Project Settings → API:

```
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Buat akun admin

Dashboard Supabase → **Authentication** → **Users** → *Add user* (email + password, auto-confirm). Login admin di `/login`.

## Menjalankan

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

- `/` homepage, `/projects`, `/blog`, `/contact`
- `/admin` dashboard (projects, blog, messages) — butuh login

## Scripts tambahan

| Perintah | Fungsi |
|---|---|
| `node scripts/generate-placeholders.js` | Regenerate placeholder images bertema situs |
| `scripts/seed.sql` | Seed tambahan idempotent (aman untuk DB berisi) |
| `scripts/fresh-seed.sql` | Reset data: TRUNCATE projects/posts lalu isi ulang |

## Struktur

```
app/                    # routes (app router): (public)/, admin/, api/
components/             # UI + sections + admin components
lib/supabase/           # clients (server/browser) + queries
supabase/migrations/    # SQL migrations (jalankan berurutan di SQL Editor)
supabase/seed.sql       # data awal
docs/                   # dokumentasi: DATABASE, API, DEPLOYMENT, DESIGN_SYSTEM
```
