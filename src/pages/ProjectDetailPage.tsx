import { Link, useParams } from 'react-router-dom'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { StateMessage } from '@/components/ui/StateMessage'
import { useProject } from '@/hooks/useProjects'
import { formatDate } from '@/lib/format'
import { GithubError } from '@/services/github'
import NotFoundPage from '@/pages/NotFoundPage'

export default function ProjectDetailPage() {
  const { name = '' } = useParams()
  const { data, isPending, error, refetch } = useProject(name)

  if (isPending) {
    return (
      <div className="flex flex-col gap-4" aria-busy="true">
        <Skeleton className="h-9 w-1/2" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  if (error instanceof GithubError && error.status === 404) return <NotFoundPage />

  if (error || !data) {
    return (
      <StateMessage
        title="Não foi possível carregar este projeto"
        description={error?.message}
        onRetry={() => refetch()}
        action={
          <Button variant="ghost" onClick={() => history.back()}>
            Voltar
          </Button>
        }
      />
    )
  }

  return (
    <article className="flex flex-col gap-6">
      <Link to="/projetos" className="text-sm text-muted hover:text-text">
        ← Todos os projetos
      </Link>
      <header>
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="mt-2 text-muted">{data.description ?? 'Sem descrição.'}</p>
      </header>

      <Card>
        <dl className="grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted">Linguagem</dt>
            <dd className="font-medium">{data.language ?? 'Vários'}</dd>
          </div>
          <div>
            <dt className="text-muted">Última atualização</dt>
            <dd className="font-medium">{formatDate(data.updatedAt)}</dd>
          </div>
          <div>
            <dt className="text-muted">Estrelas</dt>
            <dd className="font-medium">{data.stars}</dd>
          </div>
        </dl>
      </Card>

      {data.topics.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {data.topics.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-3">
        <a
          href={data.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-contrast hover:opacity-90"
        >
          Ver no GitHub
        </a>
        {data.homepage && (
          <a
            href={data.homepage}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface"
          >
            Ver online
          </a>
        )}
        <ButtonLink to="/contato" variant="ghost">
          Falar sobre este projeto
        </ButtonLink>
      </div>
    </article>
  )
}
