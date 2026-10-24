import type { ReactNode } from 'react'
import { Button } from '@/components/ui/Button'

interface StateMessageProps {
  title: string
  description?: string
  onRetry?: () => void
  action?: ReactNode
}

/** Mensagem padrão para estados de erro e lista vazia. */
export function StateMessage({ title, description, onRetry, action }: StateMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-12 text-center"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p className="max-w-md text-sm text-muted">{description}</p>}
      {onRetry && (
        <Button variant="ghost" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
      {action}
    </div>
  )
}
