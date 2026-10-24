import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { useProjects } from '@/hooks/useProjects'

export default function ProjectsPage() {
  const { data, isPending, error, refetch } = useProjects()

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold">Projetos</h1>
        <p className="mt-1 text-muted">
          Repositórios públicos carregados direto do GitHub.
        </p>
      </header>
      <ProjectGrid
        projects={data}
        isLoading={isPending}
        error={error}
        onRetry={() => refetch()}
      />
    </section>
  )
}
