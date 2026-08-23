# PROJECT_STRUCTURE.md
# Complete Project Structure (actual)

## 📁 Root Structure

```
portfolio/
│
├── 📄 README.md                 # Setup, fitur, ERD, struktur
├── 📄 next.config.ts            # Next.js config
├── 📄 tailwind — via @tailwindcss/postcss
├── 📄 tsconfig.json
├── 📄 postcss.config.mjs
├── 📄 components.json           # shadcn
├── 📄 proxy.ts                  # Auth guard: /admin/* → /login
├── 📄 .env.local.example
├── 📄 .env.local                # (gitignored) Supabase keys
│
├── 📁 app/                      # Next.js App Router (flat, no (public) group)
├── 📁 components/               # React components
├── 📁 lib/                      # Utilities & Supabase
├── 📁 public/                   # Static assets
├── 📁 supabase/                 # SQL migrations & seed
├── 📁 scripts/                  # Seeder & placeholder generator
└── 📁 docs/                     # DATABASE, API, DEPLOYMENT, DESIGN_SYSTEM, screenshots
```

---

## 📁 app/ — Next.js App Router

```
app/
│
├── 📄 layout.tsx                # Root layout (html, body, fonts, Toaster)
├── 📄 page.tsx                  # Homepage (/)
├── 📄 globals.css               # Tailwind + custom (marquee, notch, dot-grid)
├── 📄 error.tsx / not-found.tsx / robots.ts / sitemap.ts
├── 📄 favicon.ico / icon.png / icon.svg / apple-icon.png
│
├── 📁 projects/
│   ├── 📄 page.tsx              # Projects listing (/projects)
│   ├── 📄 loading.tsx
│   └── 📁 [slug]/
│       └── 📄 page.tsx          # Project detail (/projects/:slug)
│
├── 📁 blog/
│   ├── 📄 page.tsx              # Blog listing (/blog)
│   ├── 📄 loading.tsx
│   └── 📁 [slug]/
│       └── 📄 page.tsx          # Blog detail (/blog/:slug)
│
├── 📁 contact/
│   └── 📄 page.tsx              # Contact page (/contact)
│
├── 📁 login/
│   └── 📄 page.tsx              # Login admin (/login) — standalone, no shell
│
├── 📁 admin/                    # Admin area (guard via proxy.ts)
│   ├── 📄 layout.tsx            # Admin shell: collapsible sidebar + header
│   ├── 📄 page.tsx              # Dashboard (/admin)
│   ├── 📁 projects/
│   │   ├── 📄 page.tsx          # List (/admin/projects)
│   │   ├── 📁 new/page.tsx      # Create
│   │   └── 📁 [id]/
│   │       ├── 📁 edit/page.tsx
│   │       └── 📁 delete/page.tsx
│   ├── 📁 blog/
│   │   ├── 📄 page.tsx          # List (/admin/blog)
│   │   ├── 📁 new/page.tsx
│   │   └── 📁 [id]/
│   │       ├── 📁 edit/page.tsx
│   │       └── 📁 delete/page.tsx
│   └── 📁 messages/
│       └── 📄 page.tsx          # Inbox (/admin/messages)
│
└── 📁 api/
    ├── 📁 contact/route.ts      # POST /api/contact (public)
    └── 📁 messages/read/route.ts # POST /api/messages/read (auth)
```

> Publik pakai `components/layout/PublicShell.tsx` per halaman (bukan route group `(public)`).
> `app/login` tidak dibungkus shell publik — halaman polos.

---

## 📁 components/ — React Components

```
components/
│
├── 📁 ui/                       # shadcn-style primitives
│   ├── 📄 badge.tsx / button.tsx / card.tsx
│   ├── 📄 input.tsx / textarea.tsx / label.tsx / switch.tsx
│   ├── 📄 table.tsx / toast.tsx
│   └── 📄 LogoIcon.tsx
│
├── 📁 layout/
│   ├── 📄 Navbar.tsx            # Top nav (public, auth-aware Sign in ↔ Dashboard)
│   ├── 📄 Footer.tsx
│   ├── 📄 PublicShell.tsx       # Navbar + main + Footer wrapper (dipakai page publik)
│   ├── 📄 PageHeader.tsx / BackLink.tsx / EmptyState.tsx
│   ├── 📄 CursorGlow.tsx / InquiryCta.tsx
│   └── 📄 (admin layout ada di app/admin/layout.tsx)
│
├── 📁 sections/                 # Homepage sections
│   ├── 📄 HeroSection.tsx       # Hero + stats + CTAs
│   ├── 📄 AboutSection.tsx
│   ├── 📄 TechMarqueeSection.tsx
│   ├── 📄 ProjectsSection.tsx   # Carousel featured projects
│   ├── 📄 BlogSection.tsx       # Carousel latest posts
│   └── 📄 ContactSection.tsx
│
├── 📁 projects/
│   ├── 📄 ProjectCard.tsx
│   └── 📄 ProjectsGrid.tsx
│
├── 📁 blog/
│   ├── 📄 PostCard.tsx
│   └── 📄 BlogGrid.tsx
│
├── 📁 contact/
│   ├── 📄 ContactForm.tsx / ContactInfo.tsx / SocialLinks.tsx
│
└── 📁 admin/
    ├── 📄 RichTextEditor.tsx    # Tiptap WYSIWYG (HTML)
    ├── 📄 MarkdownEditor.tsx    # (legacy, tetap ada)
    ├── 📄 ImageUpload.tsx       # Supabase Storage bucket `images`
    ├── 📄 MessagesTable.tsx / MessageModal.tsx / MessagesActions.tsx
    └── 📄 LogoutButton.tsx
```

---

## 📁 lib/ — Utilities & Supabase

```
lib/
│
├── 📁 supabase/
│   ├── 📄 client.ts             # Browser client (@supabase/ssr)
│   ├── 📄 server.ts             # Server client (cookies)
│   └── 📄 queries.ts            # Types + getProjects/getPosts/getFeatured... + submitMessage
├── 📄 utils.ts                  # cn(), helpers
└── 📄 markdown.ts               # renderContent(): HTML baru + markdown lama → sanitized HTML
```

---

## 📁 public/ — Static Assets

```
public/
│
├── 📁 images/
│   ├── 📁 projects/             # (juga di Storage bucket `images`)
│   ├── 📁 posts/
│   ├── 📄 placeholder-generic.webp
│   └── 📄 (generate via scripts/generate-placeholders.js)
│
└── 📄 robots.txt (via app/robots.ts) / sitemap.xml (via app/sitemap.ts)
```

---

## 📁 supabase/ — Database

```
supabase/
│
├── 📁 migrations/
│   └── 📄 00001_initial_schema.sql  # Semua tabel + RLS + bucket `images`
└── 📄 seed.sql                      # Data awal (projects + posts) — idempotent
```

> Tabel: `projects | posts | messages | settings | skills | experience` — semua standalone, tanpa FK. Detail: `docs/DATABASE.md`.

---

## 📁 scripts/

```
scripts/
│
├── 📄 seed.sql                  # Copy dari supabase/seed.sql (convenience)
├── 📄 fresh-seed.sql            # TRUNCATE + reseed
└── 📄 generate-placeholders.js  # Generate public/images placeholders
```

---

## 📁 docs/

```
docs/
│
├── 📄 DATABASE.md
├── 📄 API.md / DEPLOYMENT.md / DESIGN_SYSTEM.md
├── 📄 PROJECT_STRUCTURE.md      # (file ini)
├── 📄 PRD.md / RULES.md / TASKS.md
├── 📄 design-reference/
└── 📁 screenshots/              # home, projects, blog, detail, login, admin-*
```

---

## 📊 File Count (actual)

| Directory | Files | Purpose |
|-----------|-------|---------|
| `app/` | ~28 | Pages, layouts, api |
| `components/` | ~28 | UI + sections + admin |
| `lib/` | 5 | Supabase + utils + markdown |
| `public/` | ~8 | Static + images |
| `supabase/` | 2 | Migration + seed |
| Config | ~6 | next, ts, postcss, env |
| **Total** | **~77** | |

---

*Last Updated: Agustus 2026 — disinkronkan dengan struktur aktual (tanpa route group (public), flat app/).*
