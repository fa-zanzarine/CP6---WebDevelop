import { Button } from '@/components/ui/Button'
import { InputField, TextareaField } from '@/components/ui/Field'
import { useContactForm } from '@/hooks/useContactForm'

export function ContactForm() {
  const { form, status, onSubmit, submitting } = useContactForm()
  const {
    register,
    formState: { errors },
  } = form

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <InputField
        label="Nome"
        autoComplete="name"
        error={errors.name?.message}
        {...register('name')}
      />
      <InputField
        label="E-mail"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <TextareaField
        label="Mensagem"
        error={errors.message?.message}
        {...register('message')}
      />

      <Button type="submit" loading={submitting} className="self-start">
        {submitting ? 'Enviando…' : 'Enviar mensagem'}
      </Button>

      <div aria-live="polite" className="min-h-6 text-sm">
        {status === 'success' && (
          <p className="text-green-500">Mensagem enviada! Responderei em breve.</p>
        )}
        {status === 'error' && (
          <p className="text-red-500">
            Não foi possível enviar sua mensagem. Tente novamente.
          </p>
        )}
      </div>
    </form>
  )
}
