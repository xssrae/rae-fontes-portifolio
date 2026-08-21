import { useEffect } from 'react'
import { BriefcaseBusiness, CalendarDays, MapPin } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import { useLanguage } from '@/context/LanguageContext'
import { jobs_pt } from '@/data/jobs/pt'
import { jobs_eng } from '@/data/jobs/eng'

export default function Experiences() {
  const { lang } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const pageTexts = {
    pt: {
      label: '/EXPERIENCIA',
      title: 'Experiência',
      description:
        'Um recorte da minha trajetória profissional, com responsabilidades e tecnologias que usei no caminho.',
      current: 'Atualmente',
      empty: 'Adicione suas experiências em src/data/jobs/pt.ts',
      technologies: 'Tecnologias',
    },
    en: {
      label: '/EXPERIENCE',
      title: 'Experience',
      description:
        'A quick look at my professional path, responsibilities, and technologies used along the way.',
      current: 'Currently',
      empty: 'Add your experience entries in src/data/jobs/eng.ts',
      technologies: 'Technologies',
    },
  }

  const currentTexts = pageTexts[lang]
  const jobs = lang === 'pt' ? jobs_pt : jobs_eng

  return (
    <main className="relative min-h-screen px-6 lg:px-10 pt-32 pb-16 w-full max-w-5xl mx-auto">
      <FadeIn>
        <div className="mb-12">
          <p className="text-sm font-mono opacity-50 text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-2 uppercase tracking-wider">
            {currentTexts.label}
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold font-mono text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-4">
            {currentTexts.title}
          </h1>
          <p className="text-lg opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)] max-w-2xl leading-relaxed">
            {currentTexts.description}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        {jobs.length > 0 ? (
          <div className="flex flex-col border-t border-black/10 dark:border-white/10">
            {jobs.map((job, jobIndex) => (
              <article
                key={`${job.company}-${job.role}-${job.startDate}`}
                className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-10 py-8 px-6 -mx-6 border-b border-black/10 dark:border-white/10 hover:bg-[var(--box-color-hover)] dark:hover:bg-[var(--dark-box-color-hover)] transition-all duration-300"
              >
                <div className="font-mono text-sm text-[var(--text-color)] dark:text-[var(--dark-text-color)] opacity-60">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span>
                      {job.startDate} - {job.endDate || currentTexts.current}
                    </span>
                  </div>
                  {job.location && (
                    <div className="flex items-center gap-2 mt-3">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <span className="hidden lg:flex absolute -left-[3.15rem] top-1 h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-[#f5f5f0] dark:bg-[#0a0a0a] text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                    <BriefcaseBusiness size={16} />
                  </span>

                  <p className="text-xs font-mono opacity-40 text-[var(--text-color)] dark:text-[var(--dark-text-color)] mb-2">
                    #{String(jobIndex + 1).padStart(2, '0')}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold font-mono text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                    {job.role}
                  </h2>
                  <p className="mt-2 text-lg opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
                    {job.company}
                  </p>
                  <p className="mt-5 text-base md:text-lg leading-relaxed opacity-80 text-[var(--text-color)] dark:text-[var(--dark-text-color)] max-w-3xl">
                    {job.description}
                  </p>

                  {job.technologies.length > 0 && (
                    <div className="mt-6">
                      <p className="sr-only">{currentTexts.technologies}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="text-xs font-mono border border-black/15 dark:border-white/15 rounded-full px-3 py-1.5 opacity-80 text-[var(--text-color)] dark:text-[var(--dark-text-color)] bg-transparent"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-6 border-t border-black/10 dark:border-white/10">
            <BriefcaseBusiness size={32} className="opacity-40 mb-4 text-[var(--text-color)] dark:text-[var(--dark-text-color)]" />
            <p className="font-mono text-base opacity-70 text-[var(--text-color)] dark:text-[var(--dark-text-color)]">
              $ {currentTexts.empty}
            </p>
          </div>
        )}
      </FadeIn>
    </main>
  )
}
