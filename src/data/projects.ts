export interface Project {
  slug: string
  title: string
  description: string
  githubUrl: string
  stars: number
  forks: number
  languages: string[]
}

export const projects: Project[] = []
