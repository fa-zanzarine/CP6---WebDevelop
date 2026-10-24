import type { HTMLAttributes } from 'react'

/** Contêiner visual reutilizado em projetos, mensagens e painéis. */
export function Card({ className = '', ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-5 transition-colors ${className}`}
      {...rest}
    />
  )
}
