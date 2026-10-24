import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Informe seu nome (mínimo 2 caracteres)')
    .max(80, 'Nome muito longo (máximo 80 caracteres)'),
  email: z.string().trim().min(1, 'Informe seu e-mail').email('E-mail inválido'),
  message: z
    .string()
    .trim()
    .min(20, 'Mensagem com no mínimo 20 caracteres')
    .max(2000, 'Mensagem com no máximo 2000 caracteres'),
})

export type ContactFormValues = z.infer<typeof contactSchema>

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Informe seu e-mail').email('E-mail inválido'),
  password: z.string().min(6, 'Senha com no mínimo 6 caracteres'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
