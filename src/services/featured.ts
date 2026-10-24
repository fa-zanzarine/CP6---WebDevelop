import { requireSupabase } from '@/lib/supabase'

/** Nomes dos repositórios marcados como destaque na home. */
export async function fetchFeaturedNames(): Promise<string[]> {
  const { data, error } = await requireSupabase()
    .from('featured_projects')
    .select('repo_name')
  if (error) throw error
  return (data as { repo_name: string }[]).map((r) => r.repo_name)
}

export async function setFeatured(repoName: string, featured: boolean): Promise<void> {
  const table = requireSupabase().from('featured_projects')
  const { error } = featured
    ? await table.upsert({ repo_name: repoName })
    : await table.delete().eq('repo_name', repoName)
  if (error) throw error
}
