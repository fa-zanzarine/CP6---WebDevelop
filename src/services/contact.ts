import { requireSupabase } from '@/lib/supabase'
import type { ContactMessage, ContactPayload } from '@/types'

const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

interface MessageRow {
  id: string
  name: string
  email: string
  message: string
  answered: boolean
  created_at: string
}

const toMessage = (row: MessageRow): ContactMessage => ({
  id: row.id,
  name: row.name,
  email: row.email,
  message: row.message,
  answered: row.answered,
  createdAt: row.created_at,
})

async function sendEmail(payload: ContactPayload) {
  if (!formspreeEndpoint)
    throw new Error('E-mail não configurado (VITE_FORMSPREE_ENDPOINT).')
  const res = await fetch(formspreeEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...payload, _replyto: payload.email }),
  })
  if (!res.ok) throw new Error('Falha ao enviar o e-mail.')
}

/**
 * Salva a mensagem no Supabase (para o dashboard) e envia por e-mail ao dono.
 * O envio é considerado bem-sucedido se ao menos um dos dois destinos funcionou;
 * se ambos falharem, lança erro para o formulário exibir o feedback.
 */
export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  const saved = (async () => {
    const { error } = await requireSupabase()
      .from('messages')
      .insert({ name: payload.name, email: payload.email, message: payload.message })
    if (error) throw error
  })()

  const results = await Promise.allSettled([saved, sendEmail(payload)])
  if (results.every((r) => r.status === 'rejected')) {
    throw new Error('Não foi possível enviar sua mensagem. Tente novamente em instantes.')
  }
}

export async function fetchMessages(): Promise<ContactMessage[]> {
  const { data, error } = await requireSupabase()
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data as MessageRow[]).map(toMessage)
}

export async function setMessageAnswered(id: string, answered: boolean): Promise<void> {
  const { error } = await requireSupabase()
    .from('messages')
    .update({ answered })
    .eq('id', id)
  if (error) throw error
}
