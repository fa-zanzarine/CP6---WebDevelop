import { describe, expect, it } from 'vitest'
import { contactSchema } from '@/lib/validation'

const valid = {
  name: 'Maria Silva',
  email: 'maria@exemplo.com',
  message: 'Gostei do seu portfólio, vamos conversar?',
}

function messagesFor(input: Record<string, string>, field: string) {
  const result = contactSchema.safeParse(input)
  if (result.success) return []
  return result.error.issues.filter((i) => i.path[0] === field).map((i) => i.message)
}

describe('contactSchema', () => {
  it('aceita dados válidos', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('rejeita e-mail inválido com mensagem específica', () => {
    expect(messagesFor({ ...valid, email: 'maria@' }, 'email')).toContain(
      'E-mail inválido',
    )
  })

  it('exige e-mail preenchido', () => {
    expect(messagesFor({ ...valid, email: '' }, 'email')).toContain('Informe seu e-mail')
  })

  it('exige mensagem com no mínimo 20 caracteres', () => {
    expect(messagesFor({ ...valid, message: 'curta demais' }, 'message')).toContain(
      'Mensagem com no mínimo 20 caracteres',
    )
  })

  it('exige nome com no mínimo 2 caracteres', () => {
    expect(messagesFor({ ...valid, name: 'A' }, 'name')).toHaveLength(1)
  })
})
