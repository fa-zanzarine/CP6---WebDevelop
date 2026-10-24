import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { Spinner } from '@/components/ui/Spinner'

type Variant = 'primary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60'
const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-contrast hover:opacity-90',
  ghost: 'border border-border text-text hover:bg-surface',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
  children: ReactNode
}

/** Botão padrão do site. Com `loading` fica desabilitado e mostra spinner. */
export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}

interface ButtonLinkProps extends LinkProps {
  variant?: Variant
}

export function ButtonLink({
  variant = 'primary',
  className = '',
  ...rest
}: ButtonLinkProps) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...rest} />
}
