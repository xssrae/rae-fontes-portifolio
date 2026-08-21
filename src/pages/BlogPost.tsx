import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { posts } from '@/data/posts'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!post) {
    return (
      <main className="relative min-h-screen px-8 pt-32 pb-16 max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
        <p className="font-mono opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-6">Post não encontrado.</p>
        <Link to="/blog" className="px-6 py-2.5 rounded-full border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-mono text-sm text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
          Voltar pro blog
        </Link>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen px-6 md:px-8 pt-32 pb-16 max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-[var(--text-color)] dark:text-[var(--dark-text-color)] tracking-tight">{post.title}</h1>
      <p className="text-sm font-mono opacity-50 mb-12 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
        {post.date} · {post.readTime}
      </p>

      <div className="leading-relaxed opacity-80 whitespace-pre-line text-lg text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
        {post.content}
      </div>
    </main>
  )
}