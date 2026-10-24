import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ContactForm } from '@/components/contact/ContactForm'

// Não simula o serviço: faz o Supabase falhar para exercitar o caminho real de erro.
vi.mock('@/lib/supabase', () => ({
  requireSupabase: () => {
    throw new Error('Supabase não configurado')
  },
}))

describe('<ContactForm /> quando o envio falha', () => {
  it('exibe feedback de erro e mantém o que o visitante digitou', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText('Nome'), 'Maria Silva')
    await user.type(screen.getByLabelText('E-mail'), 'maria@exemplo.com')
    await user.type(
      screen.getByLabelText('Mensagem'),
      'Uma mensagem com mais de vinte caracteres.',
    )
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(
      await screen.findByText(/não foi possível enviar/i, {}, { timeout: 3000 }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Nome')).toHaveValue('Maria Silva')
    expect(screen.getByRole('button', { name: /enviar mensagem/i })).toBeEnabled()
  })
})
