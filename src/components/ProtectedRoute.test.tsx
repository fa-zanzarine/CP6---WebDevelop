import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import * as authHook from '@/hooks/useAuth'

vi.mock('@/hooks/useAuth')
const useAuth = vi.mocked(authHook.useAuth)

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/login" element={<p>Tela de login</p>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<p>Conteúdo secreto</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('<ProtectedRoute />', () => {
  beforeEach(() => useAuth.mockReset())

  it('redireciona para o login quando não há sessão', () => {
    useAuth.mockReturnValue({ session: null, loading: false })
    renderAt('/dashboard')
    expect(screen.getByText('Tela de login')).toBeInTheDocument()
    expect(screen.queryByText('Conteúdo secreto')).not.toBeInTheDocument()
  })

  it('não mostra o conteúdo enquanto a sessão ainda é verificada', () => {
    useAuth.mockReturnValue({ session: null, loading: true })
    renderAt('/dashboard')
    expect(screen.queryByText('Conteúdo secreto')).not.toBeInTheDocument()
    expect(screen.queryByText('Tela de login')).not.toBeInTheDocument()
  })

  it('libera o conteúdo para usuário autenticado', () => {
    useAuth.mockReturnValue({
      session: { user: { email: 'dono@exemplo.com' } } as never,
      loading: false,
    })
    renderAt('/dashboard')
    expect(screen.getByText('Conteúdo secreto')).toBeInTheDocument()
  })
})
