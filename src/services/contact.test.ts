import { describe, expect, it, vi } from 'vitest'
import { sendContactMessage } from '@/services/contact'

vi.mock('@/lib/supabase', () => ({
  requireSupabase: () => {
    throw new Error('Supabase não configurado')
  },
}))

describe('sendContactMessage', () => {
  it('falha quando nenhum destino (banco e e-mail) funciona', async () => {
    await expect(
      sendContactMessage({
        name: 'Maria Silva',
        email: 'maria@exemplo.com',
        message: 'Uma mensagem com mais de vinte caracteres.',
      }),
    ).rejects.toThrow('Não foi possível enviar sua mensagem')
  })
})
