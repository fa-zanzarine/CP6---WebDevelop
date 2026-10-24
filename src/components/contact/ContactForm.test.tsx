import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from '@/components/contact/ContactForm'
import * as contact from '@/services/contact'

vi.mock('@/services/contact', () => ({ sendContactMessage: vi.fn() }))

const send = vi.mocked(contact.sendContactMessage)

describe('<ContactForm />', () => {
  beforeEach(() => send.mockReset())

  it('mostra mensagens específicas por campo e não envia dados inválidos', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText('E-mail'), 'invalido')
    await user.type(screen.getByLabelText('Mensagem'), 'curta')
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(await screen.findByText('E-mail inválido')).toBeInTheDocument()
    expect(screen.getByText('Mensagem com no mínimo 20 caracteres')).toBeInTheDocument()
    expect(send).not.toHaveBeenCalled()
  })

  it('bloqueia o botão durante o envio e evita mensagens duplicadas', async () => {
    const user = userEvent.setup()
    let resolve!: () => void
    send.mockReturnValue(new Promise<void>((r) => (resolve = r)))
    render(<ContactForm />)

    await user.type(screen.getByLabelText('Nome'), 'Maria Silva')
    await user.type(screen.getByLabelText('E-mail'), 'maria@exemplo.com')
    await user.type(
      screen.getByLabelText('Mensagem'),
      'Uma mensagem com mais de vinte caracteres.',
    )

    const button = screen.getByRole('button', { name: /enviar mensagem/i })
    await user.click(button)

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /enviando/i })).toBeDisabled(),
    )
    await user.click(screen.getByRole('button', { name: /enviando/i }))
    expect(send).toHaveBeenCalledTimes(1)

    resolve()
    expect(await screen.findByText(/mensagem enviada/i)).toBeInTheDocument()
  })
})
