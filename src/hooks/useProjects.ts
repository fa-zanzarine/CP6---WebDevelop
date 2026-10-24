import { useQuery } from '@tanstack/react-query'
import { fetchFeaturedNames } from '@/services/featured'
import { fetchProject, fetchProjects } from '@/services/github'
import { isSupabaseConfigured } from '@/lib/supabase'

export const projectKeys = {
  all: ['projects'] as const,
  detail: (name: string) => ['projects', name] as const,
  featured: ['featured'] as const,
}

export function useProjects() {
  return useQuery({
    queryKey: projectKeys.all,
    queryFn: ({ signal }) => fetchProjects(signal),
  })
}

export function useProject(name: string) {
  const list = useProjects()
  const cached = list.data?.find((p) => p.name === name)
  return useQuery({
    queryKey: projectKeys.detail(name),
    queryFn: ({ signal }) => fetchProject(name, signal),
    // Reaproveita o item da lista e evita nova chamada ao GitHub
    initialData: cached,
    enabled: !list.isPending,
  })
}

export function useFeaturedNames() {
  return useQuery({
    queryKey: projectKeys.featured,
    queryFn: fetchFeaturedNames,
    enabled: isSupabaseConfigured,
  })
}
