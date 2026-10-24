import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchMessages, setMessageAnswered } from '@/services/contact'
import type { ContactMessage } from '@/types'

const KEY = ['messages'] as const

export function useMessages() {
  return useQuery({ queryKey: KEY, queryFn: fetchMessages })
}

export function useToggleAnswered() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, answered }: { id: string; answered: boolean }) =>
      setMessageAnswered(id, answered),
    onMutate: async ({ id, answered }) => {
      await qc.cancelQueries({ queryKey: KEY })
      const previous = qc.getQueryData<ContactMessage[]>(KEY)
      qc.setQueryData<ContactMessage[]>(KEY, (old) =>
        old?.map((m) => (m.id === id ? { ...m, answered } : m)),
      )
      return { previous }
    },
    onError: (_err, _vars, ctx) => qc.setQueryData(KEY, ctx?.previous),
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}
