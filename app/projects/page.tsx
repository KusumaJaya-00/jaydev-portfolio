import { getProjects } from '@/lib/supabase/queries'
import { PublicShell } from '@/components/layout/PublicShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { ProjectsGrid } from '@/components/projects/ProjectsGrid'
import EmptyState from '@/components/layout/EmptyState'

export const metadata = {
  title: 'Projects',
  description: 'A selection of projects I have built — web apps, APIs, and experiments.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  return (
    <PublicShell>
      <div className="container mx-auto px-4 md:px-8 py-8">
        <PageHeader
          title="Projects"
          description="A selection of my work"
          command="$ ls ~/projects --sort=latest"
        />
        {projects.length === 0 ? (
          <EmptyState
            title="No projects yet"
            description="New projects are in the works. Check back soon!"
          />
        ) : (
          <ProjectsGrid projects={projects} />
        )}
      </div>
    </PublicShell>
  )
}
