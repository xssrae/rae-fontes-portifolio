export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image_path?: string
  content: string
}

export const posts: Post[] = [
  {
    slug: 'em-breve',
    title: 'Em breve',
    excerpt: 'Adicione aqui seu primeiro post quando quiser publicar conteúdo no blog.',
    date: '',
    readTime: '',
    content: '',
  },
]