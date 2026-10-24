import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { InputField } from '@/components/ui/Field'
import { Skeleton } from '@/components/ui/Skeleton'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginFormValues } from '@/lib/validation'
import { signIn } from '@/services/auth'

export default function LoginPage() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'
  const [authError, setAuthError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema), mode: 'onTouched' })

  if (loading) return <Skeleton className="mx-auto h-64 max-w-sm" />
  if (session) return <Navigate to={from} replace />

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setAuthError(null)
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : 'Falha ao entrar.')
    }
  })

  return (
    <section className="mx-auto flex max-w-sm flex-col gap-6">
      <h1 className="text-2xl font-bold">Entrar</h1>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <InputField
          label="E-mail"
          type="email"
          autoComplete="username"
          error={errors.email?.message}
          {...register('email')}
        />
        <InputField
          label="Senha"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />
        {authError && (
          <p role="alert" className="text-sm text-red-500">
            {authError}
          </p>
        )}
        <Button type="submit" loading={isSubmitting}>
          {isSubmitting ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>
    </section>
  )
}
