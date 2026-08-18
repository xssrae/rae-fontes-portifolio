import { useState, useMemo, useEffect } from 'react'
import { Search, SearchX, RotateCcw, Star, GitFork, ArrowUpRight } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { projects_pt } from '@/data/projects/pt'
import { projects_eng } from '@/data/projects/eng'
import { useLanguage } from '@/context/LanguageContext'

export default function Projects() {
  const { lang } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const pageTexts = {
    pt: {
      label: '/PROJETOS',
      title: 'Meus projetos recentes',
      searchPlaceholder: 'Buscar por nome, linguagem, tags...',
      nothingFound: 'Nada encontrado para',
      noProjects: 'Adicione seus projetos em src/data/projects.ts',
      clearSearch: 'LIMPAR BUSCA',
    },
    en: {
      label: '/PROJECTS',
      title: 'My recent projects',
      searchPlaceholder: 'Search by name, language, tags...',
      nothingFound: 'Nothing found for',
      noProjects: 'Add your projects in src/data/projects.ts',
      clearSearch: 'CLEAR SEARCH'
    }
  }

  const currentTexts = pageTexts[lang]
  const projects = lang === 'pt' ? projects_pt : projects_eng

  console.log('DEBUG Projects - lang:', lang)
  console.log('DEBUG Projects - projects_pt:', projects_pt)
  console.log('DEBUG Projects - projects_eng:', projects_eng)
  console.log('DEBUG Projects - projects:', projects)

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    if (!normalizedQuery) return projects

    return projects.filter((projectItem) => {
      const matchesTitle = projectItem.title?.toLowerCase().includes(normalizedQuery)
      const matchesLanguage = projectItem.languages?.some((programmingLanguage) =>
        programmingLanguage.toLowerCase().includes(normalizedQuery)
      )
      return matchesTitle || matchesLanguage
    })
  }, [searchQuery, lang, projects])

  return (
    <main className="relative min-h-screen px-6 lg:px-10 pt-32 pb-16 w-full max-w-5xl mx-auto">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-mono opacity-50 text-[var(--portfolio-text)] mb-2 uppercase tracking-wider">
              {currentTexts.label}
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold font-mono text-[var(--portfolio-text)]">
              {currentTexts.title}
            </h1>
          </div>

          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-[var(--portfolio-text)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={currentTexts.searchPlaceholder}
              className="w-full h-11 rounded-full border border-black/15 dark:border-white/10 pl-11 pr-4 font-mono text-sm placeholder:opacity-50 text-[var(--portfolio-text)] bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 transition-all shadow-sm"
            />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col border-t border-black/10 dark:border-white/10 pt-4">
          {filteredProjects.map((projectItem) => (
            <a
              key={projectItem.slug}
              href={projectItem.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row md:items-start justify-between gap-6 py-8 px-6 -mx-6 rounded-2xl border-b border-black/10 dark:border-white/10 hover:bg-white dark:hover:bg-black transition-all duration-300"
            >
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold font-mono text-[var(--portfolio-text)] flex items-center gap-2 transition-colors">
                  {projectItem.title}
                  <ArrowUpRight size={20} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-neutral-500 dark:text-neutral-400" />
                </h3>
                <p className="mt-3 opacity-70 text-base md:text-lg leading-relaxed text-[var(--portfolio-text)] max-w-3xl">
                  {projectItem.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {projectItem.languages?.map((programmingLanguage) => (
                    <span
                      key={programmingLanguage}
                      className="text-xs font-mono border border-black/15 dark:border-white/15 rounded-full px-3 py-1.5 opacity-70 text-[var(--portfolio-text)] bg-transparent transition-colors"
                    >
                      {programmingLanguage}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2 shrink-0 text-sm font-mono opacity-60 text-[var(--portfolio-text)] pt-2 md:pt-0">
                <span className="flex items-center gap-1.5">
                  <Star size={16} /> {projectItem.stars}
                </span>
                <span className="flex items-center gap-1.5">
                  <GitFork size={16} /> {projectItem.forks}
                </span>
              </div>
            </a>
          ))}

          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-6 mt-4">
              <SearchX size={32} className="opacity-40 mb-4 text-[var(--portfolio-text)]" />
              <p className="font-mono text-base opacity-70 text-[var(--portfolio-text)] mb-6">
                $ {searchQuery ? `${currentTexts.nothingFound} "${searchQuery}"` : currentTexts.noProjects}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/20 dark:border-white/20 hover:bg-white dark:hover:bg-white/5 transition-colors font-mono text-sm text-[var(--portfolio-text)]"
                >
                  <RotateCcw size={16} />
                  {currentTexts.clearSearch}
                </button>
              )}
            </div>
          )}
        </div>
      </FadeIn>
    </main>
  )
}
