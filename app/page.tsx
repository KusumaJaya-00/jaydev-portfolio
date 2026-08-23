import { PublicShell } from '@/components/layout/PublicShell'
import { getFeaturedProjects, getPosts } from '@/lib/supabase/queries'
import { CursorGlow } from '@/components/layout/CursorGlow'
import { HeroSection } from '@/components/sections/HeroSection'
import { TechMarqueeSection } from '@/components/sections/TechMarqueeSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { BlogSection } from '@/components/sections/BlogSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default async function HomePage() {
  const [projects, posts] = await Promise.all([
    getFeaturedProjects(3),
    getPosts(3),
  ])

  return (
    <PublicShell>
      <CursorGlow />
      <HeroSection />
      <TechMarqueeSection />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <BlogSection posts={posts} />
      <ContactSection />
    </PublicShell>
  )
}
