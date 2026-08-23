# TASKS.md
# Task Breakdown & Progress Tracker

## 📅 Timeline: August 21-23, 2026

---

## 🎯 Day 1 — August 21 (Frontend Focus)

### Phase 1: Project Setup (2 hours)
- [x] Initialize Next.js project with TypeScript
- [x] Install Tailwind CSS
- [x] Install shadcn/ui + add components (Button, Card, Input, etc.)
- [x] Install Framer Motion
- [x] Setup Supabase project
- [x] Create `.env.local` with Supabase credentials
- [x] Setup Supabase client (`lib/supabase/client.ts`, `server.ts`)
- [x] Create database tables via Supabase dashboard
- [x] Define TypeScript types — di `lib/supabase/queries.ts` (Project, Post)

### Phase 2: Layout & Navigation (1.5 hours)
- [x] Create root layout (`app/layout.tsx`)
- [x] Create public layout with Navbar + Footer
- [x] Build Navbar component with mobile menu (functional ✅)
- [x] Build Footer component
- [x] Setup global CSS with dark theme
- [x] Add fonts — Plus Jakarta Sans (NevaGate style)

### Phase 3: Homepage (3 hours)
- [x] HeroSection — Kusjay, tagline, CTA buttons
- [x] CursorGlow effect — radial glow ngikutin cursor (NevaGate style, lerp smooth, off di touch/reduced-motion)
- [x] AboutSection — Photo, bio, stats
- [ ] SkillsSection terpisah — skill list statis di AboutSection
- [x] ProjectsSection — Featured projects grid
- [x] BlogSection — Latest 3 posts
- [x] ContactSection — Form + social links
- [x] Make all sections responsive

### Phase 4: Projects Pages (1.5 hours)
- [x] Projects listing page (+ empty state)
- [x] Project card component
- [x] Project detail page (dynamic route) (+ SEO metadata)
- [ ] Project image gallery
- [x] Tech stack badges

### Phase 5: Blog Pages (1.5 hours)
- [x] Blog listing page (+ empty state)
- [x] Post card component
- [x] Blog post detail page (dynamic route) (+ SEO metadata, tags, read time)
- [x] Markdown rendering (HTML dari DB + styling `.markdown-body`)
- [ ] Table of contents generation

### Phase 6: Contact Page (1 hour)
- [x] Contact form with validation
- [x] Form submission to Supabase (`app/api/contact`)
- [x] Success/error states
- [x] Social links section

**Day 1 Total: ~10.5 hours**

---

## 🎯 Day 2 — August 22-23 (Admin + Polish + Deploy)

### Phase 7: Admin Auth (1.5 hours)
- [x] Login page with form
- [x] Supabase auth integration
- [x] Auth guard for admin routes — `proxy.ts` (Next.js 16, ex-middleware)
- [x] Logout functionality (sidebar admin)
- [x] Protected admin layout

### Phase 8: Admin Dashboard (1 hour)
- [x] Admin layout (sidebar + header + logout)
- [x] Dashboard overview page
- [x] Stats cards (projects count, posts count, messages + unread)
- [x] Recent messages widget
- [x] Quick action buttons (+Project, +Post)

### Phase 9: Admin Projects CRUD (2 hours)
- [x] Projects list with DataTable
- [x] Create new project form
- [x] Edit project form
- [x] Delete with confirmation page
- [ ] Image upload to Supabase Storage — sementara URL manual
- [x] Status toggle (draft/published/archived)

### Phase 10: Admin Blog CRUD (2 hours)
- [x] Posts list with DataTable
- [x] Create new post form
- [ ] Markdown editor (textarea biasa dulu)
- [x] Edit post form
- [x] Delete with confirmation page
- [ ] Image upload
- [x] Status toggle (draft/published) + auto published_at + read_time

### Phase 11: Admin Messages (1 hour)
- [x] Messages list
- [x] Read/unread toggle
- [ ] Message detail view (subject+message truncated di list)
- [x] Delete message (dengan confirm)

### Phase 12: Polish & Testing (2 hours) — ✅ DONE
- [x] Loading states — skeleton `app/projects/loading.tsx`, `app/blog/loading.tsx`
- [x] Error states — `app/error.tsx` (client error boundary dgn retry)
- [x] Not found page — `app/not-found.tsx` (404 styled)
- [x] Empty states — `components/layout/EmptyState.tsx` dipakai di projects/blog listing & detail content
- [x] SEO meta tags — root metadata template + OG/Twitter, per-page metadata, generateMetadata utk project/post detail, robots.txt, sitemap.xml dinamis
- [x] Viewport themeColor (#06070A)
- [x] Markdown styling `.markdown-body` di globals.css (headings, code, blockquote, list, dll)
- [x] Mobile menu navbar berfungsi (open/close, auto-close on navigate)
- [x] Accessibility — prefers-reduced-motion (matikan sweep/reveal), aria-expanded hamburger
- [x] Lint bersih — 0 errors (sisa warning `<img>` dan full-nav logout disengaja)
- [x] Build sukses + smoke test: /, /projects, /blog, /contact = 200; /admin tanpa auth = 307 → login; robots.txt + sitemap.xml = 200
- [ ] Responsive testing manual di device asli
- [ ] Cross-browser testing

### Phase 13: Deployment (1 hour) — ⬜ TUNGGU SAMPAI AMAN SEMUA
- [ ] Push to GitHub
- [ ] Connect Vercel to GitHub repo
- [ ] Set environment variables in Vercel (incl. NEXT_PUBLIC_SITE_URL)
- [ ] Deploy & test production
- [ ] Custom domain jaydev.my.id (optional)

---

## 📊 Progress Summary

| Phase | Status | Hours |
|-------|--------|-------|
| Phase 1: Project Setup | ✅ Done | 2h |
| Phase 2: Layout & Nav | ✅ Done | 1.5h |
| Phase 3: Homepage | ✅ Done* | 3h |
| Phase 4: Projects Pages | ✅ Done* | 1.5h |
| Phase 5: Blog Pages | ✅ Done* | 1.5h |
| Phase 6: Contact Page | ✅ Done | 1h |
| Phase 7: Admin Auth | ✅ Done | 1.5h |
| Phase 8: Admin Dashboard | ✅ Done | 1h |
| Phase 9: Admin Projects | ✅ Done* | 2h |
| Phase 10: Admin Blog | ✅ Done* | 2h |
| Phase 11: Admin Messages | ✅ Done* | 1h |
| Phase 12: Polish | ✅ Done* | 2h |
| Phase 13: Deployment | ⬜ Pending | 1h |
| **TOTAL** | **~95%** | **22h** |

*\* = core done, item minor tersanda (upload gambar, gallery, TOC, testing manual)*

---

## 🎨 Content Needed (Before/During Development)

### Images
- [ ] Profile photo (avatar.webp)
- [ ] Open Graph image (og-image.jpg) — direferensikan di metadata OG
- [x] Favicon
- [ ] Project screenshots (at least 3 projects)

### Text Content
- [x] Hero tagline — nama "Kusjay" ✅ (tagline masih generik)
- [ ] About me bio (masih lorem-ish placeholder)
- [ ] Skills list dengan level (Frontend/Backend/Mobile/Design "Expert" masih template)
- [ ] Stats angka real (5+ years / 20+ projects / 50+ clients masih placeholder)
- [ ] Project descriptions (via admin panel)
- [ ] Blog posts (via admin panel)
- [ ] Social media links (Footer & SocialLinks masih github.com/linkedin.com generik + hello@example.com)
- [x] Site title & description — "Kusjay | Full-Stack Developer" di metadata

---

## ✅ Definition of Done

- [x] All pages render correctly (smoke test OK)
- [ ] Responsive on all devices (manual test pending)
- [x] Admin can create/edit/delete projects
- [x] Admin can create/edit/delete blog posts
- [x] Contact form submits to database
- [ ] Images upload successfully (belum ada fitur upload, URL manual)
- [x] No TypeScript errors
- [x] No console errors
- [ ] Deployed to Vercel
- [ ] Accessible via public URL

---

## 📝 Notes

- Next.js 16.3.2: middleware deprecated → pakai `proxy.ts` (Node runtime default).
- Docs recovery: file md lama sempat tertimpa instalasi skill design-dna ke `docs/`; sudah dipulihkan dari session history.
- Style referensi: NevaGate (docs/design-reference/) — Plus Jakarta Sans, dark #06070A, blue #3D7FFF.
- Image upload admin masih URL manual; Supabase Storage bucket `images` udah ada policies.
- SEO: `NEXT_PUBLIC_SITE_URL` env var dipakai metadataBase/sitemap/robots (default https://jaydev.my.id).
- Sisa warning lint disengaja: `<img>` (URL eksternal bebas, hindari domain allowlist next/image), full navigation di logout (biar proxy baca cookie bersih).

---

*Last Updated: August 23, 2026*
