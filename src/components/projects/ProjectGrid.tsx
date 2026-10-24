import { ProjectCard, ProjectCardSkeleton } from '@/components/projects/ProjectCard'
import { StateMessage } from '@/components/ui/StateMessage'
import { GithubError } from '@/services/github'
import type { Project } from '@/types'

interface ProjectGridProps {
  projects?: Project[]
  isLoading: boolean
  error: Error | null
  onRetry: () => void
  skeletonCount?: number
  emptyMessage?: string
}

/** Renderiza os 4 estados da lista: carregando, erro, vazio e dados. */
export function ProjectGrid({
  projects,
  isLoading,
  error,
  onRetry,
  skeletonCount = 6,
  emptyMessage = 'Nenhum projeto público encontrado ainda.',
}: ProjectGridProps) {
  const grid = 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'

  if (isLoading) {
    return (
      <div className={grid} aria-busy="true" aria-label="Carregando projetos">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    const rateLimited = error instanceof GithubError && error.rateLimited
    return (
      <StateMessage
        title={
          rateLimited
            ? 'Muitas requisições ao GitHub'
            : 'Não foi possível carregar os projetos'
        }
        description={error.message}
        onRetry={onRetry}
      />
    )
  }

  if (!projects || projects.length === 0) {
    return <StateMessage title="Nada por aqui" description={emptyMessage} />
  }

  return (
    <ul className={grid}>
      {projects.map((p) => (
        <li key={p.id} className="relative">
          <ProjectCard project={p} />
        </li>
      ))}
    </ul>
  )
}
