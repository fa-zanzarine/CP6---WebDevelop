import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'claro' : 'escuro'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Ativar tema ${next}`}
      title={`Ativar tema ${next}`}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-lg hover:bg-surface"
    >
      <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
    </button>
  )
}
