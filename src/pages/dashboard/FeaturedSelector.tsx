import { Skeleton } from '@/components/ui/Skeleton'
import { StateMessage } from '@/components/ui/StateMessage'
import { useFeaturedToggle } from '@/hooks/useFeaturedToggle'
import { useFeaturedNames, useProjects } from '@/hooks/useProjects'

export function FeaturedSelector() {
  const projects = useProjects()
  const featured = useFeaturedNames()
  const toggle = useFeaturedToggle()

  if (projects.isPending || featured.isPending) {
    return <Skeleton className="h-40 w-full" />
  }

  const error = projects.error ?? featured.error
  if (error) {
    return (
      <StateMessage
        title="Não foi possível carregar os projetos"
        description={error.message}
        onRetry={() => {
          projects.refetch()
          featured.refetch()
        }}
      />
    )
  }

  const selected = new Set(featured.data)
  const repos = projects.data ?? []

  return (
    <section aria-labelledby="destaques-dash" className="flex flex-col gap-4">
      <div>
        <h2 id="destaques-dash" className="text-xl font-semibold">
          Projetos em destaque na home
        </h2>
        <p className="text-sm text-muted">
          Sem nenhum selecionado, a home mostra os 3 mais recentes.
        </p>
      </div>
      {repos.length === 0 ? (
        <StateMessage title="Nenhum repositório encontrado" />
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {repos.map((p) => (
            <li key={p.id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={selected.has(p.name)}
                  disabled={toggle.isPending}
                  onChange={(e) =>
                    toggle.mutate({ name: p.name, featured: e.target.checked })
                  }
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                <span className="truncate">{p.name}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
      {toggle.isError && (
        <p role="alert" className="text-sm text-red-500">
          Não foi possível salvar a alteração.
        </p>
      )}
    </section>
  )
}
