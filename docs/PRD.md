# Product Requirements Document (PRD)
# Portfolio Website with Admin CMS

## 📋 Overview

| Field | Value |
|-------|-------|
| **Project Name** | Personal Portfolio + CMS Dashboard |
| **Version** | 1.0 |
| **Date** | August 2026 |
| **Deadline** | August 23, 2026 (2 days) |
| **Reference UI** | https://nevagate.anext.dev/ |

---

## 🎯 Goals

1. **Portfolio Website** — Showcase work, skills, and professional profile
2. **Admin CMS** — Manage all content without touching code
3. **Modern UI/UX** — Dark theme with interactive cursor effects
4. **Fast Launch** — Working MVP in 2 days

---

## 🏗️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 14+ (App Router) | Full-stack, SSR, SEO, fast |
| **Language** | TypeScript | Type safety, better DX |
| **Styling** | Tailwind CSS | Utility-first, fast development |
| **UI Components** | shadcn/ui | Beautiful, copy-paste, accessible |
| **Animations** | Framer Motion | Smooth React animations |
| **Cursor Effects** | Custom Canvas + CSS | Interactive background |
| **Database** | Supabase (PostgreSQL) | Free, real-time, auth included |
| **Auth** | Supabase Auth | Built-in, JWT-based |
| **File Storage** | Supabase Storage | Image uploads |
| **Deployment** | Vercel | Free, instant deploy |
| **Icons** | Lucide React | Consistent, tree-shakeable |

---

## 👤 Users

| User | Access | Description |
|------|--------|-------------|
| **Visitor** | Public pages | View portfolio, read blog, contact |
| **Admin** | `/admin` | Manage all content |

---

## 📄 Pages

### Public Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero, about, skills, featured projects, blog preview, contact |
| Projects | `/projects` | Grid of all projects with filters |
| Project Detail | `/projects/[slug]` | Full project showcase |
| Blog | `/blog` | List of blog posts |
| Blog Post | `/blog/[slug]` | Full article with TOC |
| Contact | `/contact` | Contact form + social links |

### Admin Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | Authentication |
| Dashboard | `/admin` | Overview stats, recent activity |
| Projects | `/admin/projects` | CRUD projects |
| Blog | `/admin/blog` | CRUD blog posts |
| Messages | `/admin/messages` | View contact submissions |
| Settings | `/admin/settings` | Site configuration |
| Media | `/admin/media` | Upload and manage files |

---

## 🗄️ Database Tables

| Table | Purpose |
|-------|---------|
| `projects` | Portfolio projects |
| `posts` | Blog articles |
| `messages` | Contact form submissions |
| `settings` | Key-value site config |
| `skills` | Technical skills |
| `experience` | Work/education history |

---

## ⚡ Features

### P0 (Must Have - 2 Days)
- [x] Responsive dark theme
- [x] Interactive cursor background effect
- [x] Homepage with all sections
- [x] Projects listing + detail
- [x] Blog listing + detail
- [x] Contact form
- [x] Admin login
- [x] Admin CRUD for projects
- [x] Admin CRUD for blog
- [x] Admin view messages
- [x] Image upload
- [x] SEO meta tags
- [x] Deploy to Vercel

### P1 (Nice to Have)
- [ ] Skills/Experience management
- [ ] Settings management
- [ ] Content preview before publish
- [ ] Search functionality

### P2 (Future)
- [ ] Analytics dashboard
- [ ] Dark/Light mode toggle
- [ ] RSS feed
- [ ] Multi-language

---

## 📐 Design Specs

- **Theme:** Dark (#0a0a0a background)
- **Font:** Inter (body) + Space Grotesk (headings)
- **Accent:** Indigo (#6366f1)
- **Components:** shadcn/ui
- **Cursor Effect:** Glow/particle following mouse

---

## 🗓️ Timeline

| Day | Date | Tasks |
|-----|------|-------|
| Day 1 | Aug 21 | Setup, homepage, projects, blog, contact |
| Day 2 | Aug 22 | Admin panel, polish, deploy |

---

*Version 1.0 | August 2026*