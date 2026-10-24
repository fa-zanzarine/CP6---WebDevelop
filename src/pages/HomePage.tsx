import { useMemo } from 'react'
import { Hero3D } from '@/components/three/Hero3D'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { ButtonLink } from '@/components/ui/Button'
import { useFeaturedNames, useProjects } from '@/hooks/useProjects'

export default function HomePage() {
  const projects = useProjects()
  const featured = useFeaturedNames()

  // Sem destaques definidos no dashboard, mostra os 3 mais recentes
  const highlighted = useMemo(() => {
    const all = projects.data ?? []
    const names = featured.data ?? []
    const picked = all.filter((p) => names.includes(p.name))
    return picked.length > 0 ? picked : all.slice(0, 3)
  }, [projects.data, featured.data])

  return (
    <div className="flex flex-col gap-14">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <p className="font-mono text-sm text-accent">Olá, eu sou</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Fabrício Zanzarine
          </h1>
          <p className="text-lg text-muted">
            Engenharia de Software. Construo interfaces acessíveis, rápidas e bem
            testadas.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/projetos">Ver projetos</ButtonLink>
            <ButtonLink to="/contato" variant="ghost">
              Entrar em contato
            </ButtonLink>
          </div>
        </div>
        <Hero3D />
      </section>

      <section aria-labelledby="destaques" className="flex flex-col gap-5">
        <div className="flex items-end justify-between">
          <h2 id="destaques" className="text-2xl font-semibold">
            Projetos em destaque
          </h2>
          <ButtonLink to="/projetos" variant="ghost">
            Ver todos
          </ButtonLink>
        </div>
        <ProjectGrid
          projects={highlighted}
          isLoading={projects.isPending}
          error={projects.error}
          onRetry={() => projects.refetch()}
          skeletonCount={3}
        />
      </section>
    </div>
  )
}
