import type { Session } from '@supabase/supabase-js'
import { requireSupabase, supabase } from '@/lib/supabase'

export async function signIn(email: string, password: string): Promise<void> {
  const { error } = await requireSupabase().auth.signInWithPassword({ email, password })
  if (error) throw new Error('E-mail ou senha incorretos.')
}

export async function signOut(): Promise<void> {
  await supabase?.auth.signOut()
}

export async function getSession(): Promise<Session | null> {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session
}

/** Observa mudanças de sessão. Retorna função para cancelar a assinatura. */
export function onAuthChange(callback: (session: Session | null) => void): () => void {
  if (!supabase) return () => undefined
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
  return () => data.subscription.unsubscribe()
}
