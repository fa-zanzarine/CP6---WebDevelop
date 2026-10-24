export interface Project {
  id: number
  name: string
  description: string | null
  language: string | null
  updatedAt: string
  htmlUrl: string
  homepage: string | null
  stars: number
  topics: string[]
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  answered: boolean
  createdAt: string
}

export interface ContactPayload {
  name: string
  email: string
  message: string
}
