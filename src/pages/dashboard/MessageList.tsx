import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { StateMessage } from '@/components/ui/StateMessage'
import { useMessages, useToggleAnswered } from '@/hooks/useMessages'
import { formatDateTime } from '@/lib/format'

export function MessageList() {
  const { data, isPending, error, refetch } = useMessages()
  const toggle = useToggleAnswered()

  return (
    <section aria-labelledby="mensagens" className="flex flex-col gap-4">
      <h2 id="mensagens" className="text-xl font-semibold">
        Mensagens recebidas
      </h2>

      {isPending && (
        <div className="flex flex-col gap-3" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      )}

      {error && (
        <StateMessage
          title="Não foi possível carregar as mensagens"
          description={error.message}
          onRetry={() => refetch()}
        />
      )}

      {data?.length === 0 && (
        <StateMessage
          title="Nenhuma mensagem ainda"
          description="Quando alguém escrever pelo formulário, aparecerá aqui."
        />
      )}

      <ul className="flex flex-col gap-3">
        {data?.map((m) => (
          <li key={m.id}>
            <Card className={m.answered ? 'opacity-70' : ''}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{m.name}</p>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-sm text-accent hover:underline"
                  >
                    {m.email}
                  </a>
                </div>
                <time className="text-xs text-muted" dateTime={m.createdAt}>
                  {formatDateTime(m.createdAt)}
                </time>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm">{m.message}</p>
              <div className="mt-4 flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={() => toggle.mutate({ id: m.id, answered: !m.answered })}
                  disabled={toggle.isPending && toggle.variables?.id === m.id}
                >
                  {m.answered ? 'Marcar como pendente' : 'Marcar como respondida'}
                </Button>
                {m.answered && <span className="text-xs text-green-500">Respondida</span>}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
