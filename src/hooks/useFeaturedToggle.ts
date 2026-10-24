import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setFeatured } from '@/services/featured'
import { projectKeys } from '@/hooks/useProjects'

export function useFeaturedToggle() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ name, featured }: { name: string; featured: boolean }) =>
      setFeatured(name, featured),
    onSettled: () => qc.invalidateQueries({ queryKey: projectKeys.featured }),
  })
}
