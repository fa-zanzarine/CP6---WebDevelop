import { ButtonLink } from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="font-mono text-5xl font-bold text-accent">404</p>
      <h1 className="text-2xl font-semibold">Página não encontrada</h1>
      <p className="max-w-md text-muted">
        O endereço que você acessou não existe ou foi movido. Que tal voltar para o
        início?
      </p>
      <ButtonLink to="/">Voltar ao início</ButtonLink>
    </section>
  )
}
