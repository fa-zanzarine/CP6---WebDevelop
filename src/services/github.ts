import type { Project } from '@/types'

interface GithubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  updated_at: string
  html_url: string
  homepage: string | null
  stargazers_count: number
  topics?: string[]
  fork: boolean
  archived: boolean
}

export class GithubError extends Error {
  readonly status: number
  readonly rateLimited: boolean

  constructor(message: string, status: number, rateLimited = false) {
    super(message)
    this.name = 'GithubError'
    this.status = status
    this.rateLimited = rateLimited
  }
}

export const githubUser = import.meta.env.VITE_GITHUB_USER ?? 'fa-zanzarine'

function headers(): HeadersInit {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  return {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

function toProject(repo: GithubRepo): Project {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    language: repo.language,
    updatedAt: repo.updated_at,
    htmlUrl: repo.html_url,
    homepage: repo.homepage || null,
    stars: repo.stargazers_count,
    topics: repo.topics ?? [],
  }
}

async function handle(res: Response) {
  if (res.ok) return
  const rateLimited =
    res.status === 429 ||
    (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0')
  if (rateLimited) {
    throw new GithubError(
      'Limite de requisições da API do GitHub atingido. Tente novamente mais tarde.',
      res.status,
      true,
    )
  }
  if (res.status === 404) throw new GithubError('Repositório não encontrado.', 404)
  throw new GithubError('Não foi possível carregar os dados do GitHub.', res.status)
}

/** Lista repositórios públicos (sem forks nem arquivados), mais recentes primeiro. */
export async function fetchProjects(signal?: AbortSignal): Promise<Project[]> {
  const res = await fetch(
    `https://api.github.com/users/${githubUser}/repos?per_page=100&sort=updated`,
    { headers: headers(), signal },
  )
  await handle(res)
  const repos = (await res.json()) as GithubRepo[]
  return repos.filter((r) => !r.fork && !r.archived).map(toProject)
}

export async function fetchProject(name: string, signal?: AbortSignal): Promise<Project> {
  const res = await fetch(
    `https://api.github.com/repos/${githubUser}/${encodeURIComponent(name)}`,
    {
      headers: headers(),
      signal,
    },
  )
  await handle(res)
  return toProject((await res.json()) as GithubRepo)
}
