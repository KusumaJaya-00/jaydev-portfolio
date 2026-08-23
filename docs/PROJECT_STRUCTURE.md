# PROJECT_STRUCTURE.md
# Complete Project Structure

## 📁 Root Structure

```
portfolio/
│
├── 📄 PRD.md                    # Product Requirements Document
├── 📄 AGENTS.md                 # AI Agent instructions
├── 📄 PROJECT_STRUCTURE.md      # This file
├── 📄 RULES.md                  # Coding rules & conventions
├── 📄 TASKS.md                  # Task breakdown
├── 📄 DESIGN_SYSTEM.md          # Design tokens & components
├── 📄 API.md                    # API documentation
├── 📄 DATABASE.md               # Database schema
├── 📄 DEPLOYMENT.md             # Deployment guide
│
├── 📁 app/                      # Next.js App Router
├── 📁 components/               # React components
├── 📁 lib/                      # Utilities & configs
├── 📁 types/                    # TypeScript types
├── 📁 public/                   # Static assets
├── 📁 supabase/                 # Supabase migrations
│
├── ⚙️ next.config.js            # Next.js config
├── ⚙️ tailwind.config.ts        # Tailwind config
├── ⚙️ tsconfig.json             # TypeScript config
├── ⚙️ postcss.config.js         # PostCSS config
├── ⚙️ .env.local                # Environment variables (NOT in git)
├── ⚙️ .gitignore
├── ⚙️ package.json
└── ⚙️ README.md
```

---

## 📁 app/ — Next.js App Router

```
app/
│
├── 📄 layout.tsx                # Root layout (html, body, fonts)
├── 📄 page.tsx                  # Root redirect → /home
├── 📄 globals.css               # Global styles + Tailwind
│
├── 📁 (public)/                 # Route group (no /public prefix)
│   ├── 📄 layout.tsx            # Public layout (Navbar + Footer)
│   │
│   ├── 📄 page.tsx              # Homepage (/)
│   │
│   ├── 📁 projects/
│   │   ├── 📄 page.tsx          # Projects listing (/projects)
│   │   └── 📁 [slug]/
│   │       └── 📄 page.tsx      # Project detail (/projects/xyz)
│   │
│   ├── 📁 blog/
│   │   ├── 📄 page.tsx          # Blog listing (/blog)
│   │   └── 📁 [slug]/
│   │       └── 📄 page.tsx      # Blog post (/blog/xyz)
│   │
│   └── 📁 contact/
│       └── 📄 page.tsx          # Contact page (/contact)
│
├── 📁 admin/                    # Admin dashboard
│   ├── 📄 layout.tsx            # Admin layout (sidebar + header)
│   ├── 📄 page.tsx              # Dashboard (/admin)
│   │
│   ├── 📁 login/
│   │   └── 📄 page.tsx          # Login page (/login)
│   │
│   ├── 📁 projects/
│   │   ├── 📄 page.tsx          # Projects list (/admin/projects)
│   │   ├── 📁 new/
│   │   │   └── 📄 page.tsx      # Create project
│   │   └── 📁 [id]/
│   │       └── 📄 page.tsx      # Edit project
│   │
│   ├── 📁 blog/
│   │   ├── 📄 page.tsx          # Blog list (/admin/blog)
│   │   ├── 📁 new/
│   │   │   └── 📄 page.tsx      # Create post
│   │   └── 📁 [id]/
│   │       └── 📄 page.tsx      # Edit post
│   │
│   ├── 📁 messages/
│   │   └── 📄 page.tsx          # Messages (/admin/messages)
│   │
│   └── 📁 settings/
│       └── 📄 page.tsx          # Settings (/admin/settings)
│
└── 📁 api/                      # API Routes (if needed)
    ├── 📁 projects/
    │   └── 📄 route.ts          # GET/POST /api/projects
    ├── 📁 posts/
    │   └── 📄 route.ts          # GET/POST /api/posts
    └── 📁 contact/
        └── 📄 route.ts          # POST /api/contact
```

---

## 📁 components/ — React Components

```
components/
│
├── 📁 ui/                       # shadcn/ui components (DO NOT MODIFY)
│   ├── 📄 button.tsx
│   ├── 📄 card.tsx
│   ├── 📄 input.tsx
│   ├── 📄 textarea.tsx
│   ├── 📄 select.tsx
│   ├── 📄 dialog.tsx
│   ├── 📄 dropdown-menu.tsx
│   ├── 📄 toast.tsx
│   ├── 📄 table.tsx
│   ├── 📄 badge.tsx
│   ├── 📄 separator.tsx
│   ├── 📄 skeleton.tsx
│   └── 📄 sheet.tsx
│
├── 📁 layout/                   # Layout components
│   ├── 📄 Navbar.tsx            # Main navigation
│   ├── 📄 MobileNav.tsx         # Mobile navigation
│   ├── 📄 Footer.tsx            # Footer
│   ├── 📄 AdminSidebar.tsx      # Admin sidebar
│   ├── 📄 AdminHeader.tsx       # Admin header
│   └── 📄 PageHeader.tsx        # Reusable page header
│
├── 📁 sections/                 # Homepage sections
│   ├── 📄 HeroSection.tsx       # Hero with cursor effect
│   ├── 📄 AboutSection.tsx      # About me
│   ├── 📄 SkillsSection.tsx     # Skills display
│   ├── 📄 ProjectsSection.tsx   # Featured projects
│   ├── 📄 BlogSection.tsx       # Latest blog posts
│   └── 📄 ContactSection.tsx    # Contact form
│
├── 📁 projects/                 # Project components
│   ├── 📄 ProjectCard.tsx       # Project card for grid
│   ├── 📄 ProjectGrid.tsx       # Projects grid with filter
│   ├── 📄 ProjectDetail.tsx     # Full project view
│   ├── 📄 ProjectFilter.tsx     # Filter controls
│   └── 📄 TechStackBadge.tsx    # Tech stack pill
│
├── 📁 blog/                     # Blog components
│   ├── 📄 PostCard.tsx          # Blog post card
│   ├── 📄 PostGrid.tsx          # Posts grid
│   ├── 📄 PostContent.tsx       # Rendered markdown
│   ├── 📄 TableOfContents.tsx   # Auto-generated TOC
│   └── 📄 RelatedPosts.tsx      # Related posts section
│
├── 📁 admin/                    # Admin components
│   ├── 📄 StatsCard.tsx         # Dashboard stat card
│   ├── 📄 RecentMessages.tsx    # Recent messages widget
│   ├── 📄 ContentForm.tsx       # Reusable content form
│   ├── 📄 DataTable.tsx         # Data table with actions
│   ├── 📄 ImageUpload.tsx       # Image upload component
│   ├── 📄 MarkdownEditor.tsx    # Markdown editor
│   ├── 📄 ConfirmDialog.tsx     # Delete confirmation
│   └── 📄 SearchInput.tsx       # Search with debounce
│
├── 📁 contact/                  # Contact components
│   ├── 📄 ContactForm.tsx       # Contact form
│   └── 📄 SocialLinks.tsx       # Social media links
│
├── 📁 effects/                  # Visual effects
│   ├── 📄 CursorGlow.tsx        # Cursor glow effect
│   ├── 📄 ParticleBackground.tsx # Particle animation
│   └── 📄 FadeIn.tsx            # Fade in animation wrapper
│
└── 📁 shared/                   # Shared/reusable components
    ├── 📄 MarkdownRenderer.tsx  # Render markdown content
    ├── 📄 EmptyState.tsx        # Empty state placeholder
    ├── 📄 LoadingSpinner.tsx    # Loading indicator
    └── 📄 ErrorBoundary.tsx     # Error boundary
```

---

## 📁 lib/ — Utilities & Config

```
lib/
│
├── 📁 supabase/
│   ├── 📄 client.ts             # Browser client (for client components)
│   ├── 📄 server.ts             # Server client (for server components)
│   └── 📄 middleware.ts         # Auth middleware
│
├── 📄 utils.ts                  # General utilities (cn, formatDate, etc.)
├── 📄 constants.ts              # App constants (site name, links, etc.)
├── 📄 validators.ts             # Form validation schemas (zod)
└── 📄 hooks/
    ├── 📄 useDebounce.ts        # Debounce hook
    ├── 📄 useMediaQuery.ts      # Responsive hook
    └── 📄 useToast.ts           # Toast notification hook
```

---

## 📁 types/ — TypeScript Types

```
types/
│
├── 📄 index.ts                  # Export all types
├── 📄 project.ts                # Project types
├── 📄 post.ts                   # Blog post types
├── 📄 message.ts                # Message types
├── 📄 skill.ts                  # Skill types
├── 📄 experience.ts             # Experience types
├── 📄 settings.ts               # Settings types
└── 📄 supabase.ts               # Supabase generated types
```

---

## 📁 public/ — Static Assets

```
public/
│
├── 📁 images/
│   ├── 📄 avatar.jpg            # Profile photo
│   ├── 📄 og-image.jpg          # Open Graph image
│   └── 📁 projects/             # Project screenshots
│
├── 📁 icons/
│   ├── 📄 favicon.ico
│   ├── 📄 favicon-16x16.png
│   ├── 📄 favicon-32x32.png
│   └── 📄 apple-touch-icon.png
│
├── 📄 robots.txt
├── 📄 sitemap.xml
└── 📄 manifest.json
```

---

## 📁 supabase/ — Database Migrations

```
supabase/
│
├── 📁 migrations/
│   ├── 📄 20260821000000_create_projects.sql
│   ├── 📄 20260821000001_create_posts.sql
│   ├── 📄 20260821000002_create_messages.sql
│   ├── 📄 20260821000003_create_settings.sql
│   ├── 📄 20260821000004_create_skills.sql
│   └── 📄 20260821000005_create_experience.sql
│
└── 📄 seed.sql                  # Initial data
```

---

## 📊 File Count Summary

| Directory | Files | Purpose |
|-----------|-------|---------|
| `app/` | ~20 | Pages & layouts |
| `components/` | ~35 | UI components |
| `lib/` | ~8 | Utilities |
| `types/` | ~8 | TypeScript types |
| `public/` | ~10 | Static assets |
| `supabase/` | ~7 | Migrations |
| Config files | ~10 | Project config |
| **Total** | **~100** | |

---

*Last Updated: August 2026*