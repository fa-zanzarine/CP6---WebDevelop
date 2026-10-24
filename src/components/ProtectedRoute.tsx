import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Skeleton } from '@/components/ui/Skeleton'
import { useAuth } from '@/hooks/useAuth'

/** Bloqueia rotas filhas para quem não está autenticado, redirecionando para o login. */
export function ProtectedRoute() {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Skeleton className="h-64 w-full" />
  if (!session)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}
