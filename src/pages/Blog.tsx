import { Link } from 'react-router-dom'
import FadeIn from '@/components/ui/FadeIn'
import { Calendar, Clock } from 'lucide-react'
import { posts } from '@/data/posts'
import { useLanguage } from '@/context/LanguageContext'

export default function Blog() {
  const { lang } = useLanguage()

  const pageTexts = {
    pt: {
      label: '/BLOG',
      title: 'Meu blog',
      description: 'Um espaço para escrever sobre meus projetos, tecnologias, hobbies e outras ideias suspeitas.',
      noImage: 'sem imagem ainda'
    },
    en: {
      label: '/BLOG',
      title: 'My blog',
      description: 'A space to write about my projects, tech, hobbies, and other questionable ideas.',
      noImage: 'no image yet'
    }
  }

  const currentTexts = pageTexts[lang]

  return (
    <main className="relative min-h-screen px-6 lg:px-10 pt-32 pb-16 w-full">
      <FadeIn>
        <div className="mb-12">
          <p className="text-sm font-mono opacity-50 text-[var(--portfolio-text)] mb-2 uppercase tracking-wider">
            {currentTexts.label}
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold font-mono text-[var(--portfolio-text)] mb-4">
            {currentTexts.title}
          </h1>
          <p className="text-lg opacity-70 text-[var(--portfolio-text)] max-w-2xl leading-relaxed">
            {currentTexts.description}
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {posts.map((blogPost, postIndex) => (
          <FadeIn key={blogPost.slug} delay={postIndex * 0.1}>
            <Link
              to={`/blog/${blogPost.slug}`}
              className="group flex flex-col h-full bg-white dark:bg-black rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-white/5"
            >
              <div className="relative h-56 w-full bg-black/5 dark:bg-white/5 overflow-hidden flex items-center justify-center shrink-0">
                {blogPost.image_path ? (
                  <>
                    <img
                      src={blogPost.image_path}
                      alt={blogPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                ) : (
                  <span className="text-xs font-mono opacity-40 text-[var(--portfolio-text)]">
                    {currentTexts.noImage}
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-[var(--portfolio-text)] mb-3 line-clamp-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                  {blogPost.title}
                </h2>
                
                <p className="text-[var(--portfolio-text)] opacity-70 text-sm leading-relaxed mb-6 line-clamp-3">
                  {blogPost.excerpt}
                </p>

                {(blogPost.readTime || blogPost.date) && (
                  <div className="mt-auto flex items-center gap-4 pt-5 border-t border-black/10 dark:border-white/10 font-mono text-xs opacity-50 text-[var(--portfolio-text)]">
                    {blogPost.readTime && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} /> {blogPost.readTime}
                      </span>
                    )}
                    {blogPost.date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} /> {blogPost.date}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </main>
  )
}