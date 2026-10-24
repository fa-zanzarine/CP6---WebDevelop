import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import NotFoundPage from '@/pages/NotFoundPage'
import { ButtonLink } from '@/components/ui/Button'

/** Exibido quando um componente lança erro ou um chunk lazy falha ao carregar. */
export default function RouteErrorPage() {
  const error = useRouteError()
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />

  return (
    <section
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center"
    >
      <h1 className="text-2xl font-semibold">Algo deu errado</h1>
      <p className="text-muted">
        Não foi possível carregar esta página. Verifique sua conexão e tente novamente.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-contrast"
        >
          Recarregar
        </button>
        <ButtonLink to="/" variant="ghost" reloadDocument>
          Ir para o início
        </ButtonLink>
      </div>
    </section>
  )
}
