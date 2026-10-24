import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { getSession, onAuthChange } from '@/services/auth'

interface AuthContextValue {
  session: Session | null
  /** `true` enquanto a sessão salva ainda está sendo verificada. */
  loading: boolean
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getSession()
      .then((s) => active && setSession(s))
      .finally(() => active && setLoading(false))
    const unsubscribe = onAuthChange((s) => setSession(s))
    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  const value = useMemo(() => ({ session, loading }), [session, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
