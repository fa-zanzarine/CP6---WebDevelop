import { QueryClient } from '@tanstack/react-query'

/**
 * Cache global. `staleTime` alto evita novas requisições à API do GitHub
 * ao navegar entre páginas (limite de 60 req/h sem token).
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})
