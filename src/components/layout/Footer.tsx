import { Link } from 'react-router-dom'
import { githubUser } from '@/services/github'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-sm text-muted">
        <span>© {new Date().getFullYear()} Fabrício Zanzarine</span>
        <span className="flex gap-4">
          <a
            href={`https://github.com/${githubUser}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-text"
          >
            GitHub
          </a>
          <Link to="/dashboard" className="hover:text-text">
            Área do dono
          </Link>
        </span>
      </div>
    </footer>
  )
}
