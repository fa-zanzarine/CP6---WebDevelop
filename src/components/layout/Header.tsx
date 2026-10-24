import { NavLink, Link } from 'react-router-dom'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/projetos', label: 'Projetos', end: false },
  { to: '/contato', label: 'Contato', end: false },
]

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
        <Link to="/" className="font-mono text-sm font-semibold text-accent">
          fz<span className="text-muted">.dev</span>
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-md px-2.5 py-1.5 text-sm ${isActive ? 'bg-surface text-text' : 'text-muted hover:text-text'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
