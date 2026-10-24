import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormValues } from '@/lib/validation'
import { sendContactMessage } from '@/services/contact'

export type SubmitStatus = 'idle' | 'success' | 'error'

/** Lógica do formulário de contato: validação por campo, envio e feedback. */
export function useContactForm() {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
    mode: 'onTouched',
  })

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus('idle')
    try {
      await sendContactMessage(values)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  })

  return { form, status, onSubmit, submitting: form.formState.isSubmitting }
}
