import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { formatDate } from '@/lib/format'
import type { Project } from '@/types'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-56 flex-col gap-3 hover:border-accent">
      <div className="flex items-start justify-between gap-2">
        <h3 className="truncate text-base font-semibold">
          <Link
            to={`/projetos/${encodeURIComponent(project.name)}`}
            className="after:absolute after:inset-0 hover:text-accent"
          >
            {project.name}
          </Link>
        </h3>
        {project.stars > 0 && (
          <span className="shrink-0 text-xs text-muted" title="Estrelas">
            ★ {project.stars}
          </span>
        )}
      </div>
      <p className="line-clamp-3 flex-1 text-sm text-muted">
        {project.description ?? 'Sem descrição.'}
      </p>
      <div className="flex items-center justify-between text-xs text-muted">
        <span className="rounded-full border border-border px-2 py-0.5">
          {project.language ?? 'Vários'}
        </span>
        <span>Atualizado em {formatDate(project.updatedAt)}</span>
      </div>
    </Card>
  )
}

/** Mesmas dimensões do card real, para não haver salto de layout. */
export function ProjectCardSkeleton() {
  return (
    <Card className="flex h-56 flex-col gap-3" aria-hidden="true">
      <Skeleton className="h-5 w-2/3" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-1/2" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-28" />
      </div>
    </Card>
  )
}
