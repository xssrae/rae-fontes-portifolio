import { useState, useMemo} from 'react'
import ScrambleText from '@/components/ui/ScrambleText'
import ParticlesBackground from '@/components/ui/ParticlesBackground'
import PhotoFrame from '@/components/ui/PhotoFrame'
import NowPlaying from '@/components/ui/NowPlaying'
import MagneticButton from '@/components/ui/MagneticButton'
import PageContainer from '@/components/layout/PageContainer'
import FadeIn from '@/components/ui/FadeIn'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { Mail, Calendar, Clock, ArrowRight, ChevronDown, Star, GitFork, ArrowUpRight, Search, SearchX, RotateCcw, BriefcaseBusiness, Code2 } from 'lucide-react'
import { profile } from '@/data/profile'
import { Link } from 'react-router-dom'
import { posts } from '@/data/posts'
import { projects_pt } from '@/data/projects/pt'
import { projects_eng } from '@/data/projects/eng'
import { jobs_pt } from '@/data/jobs/pt'
import { jobs_eng } from '@/data/jobs/eng'
import { useLanguage } from '@/context/LanguageContext'
import profileImage from '@/assets/profile.png'

export default function Home() {
  const { lang } = useLanguage()
  const highlightPost = posts[0]
  const [searchQuery, setSearchQuery] = useState('')

  const interfaceTexts = {
    pt: {
      blogLabel: '/BLOG',
      blogTitle: 'Blog 𐔌՞. .՞𐦯',
      featuredPost: 'POST EM DESTAQUE',
      noImage: 'sem imagem ainda',
      readMore: 'Ler mais',
      skillsLabel: '/SKILLS',
      skillsTitle: 'Skills',
      noSkills: 'Adicione suas skills em src/data/profile.ts',
      skillCategories: {
        languages: 'Linguagens',
        frameworks: 'Frameworks',
        dados: 'Dados',
        ai: 'Inteligência Artificial',
        tools: 'Ferramentas',
        architecture: 'Arquitetura',
      },
      experienceLabel: '/EXPERIENCIA',
      experienceTitle: 'Experiência',
      experienceDescription: 'Um recorte da minha trajetória profissional, com responsabilidades e tecnologias que usei no caminho.',
      noExperience: 'Adicione suas experiências em src/data/jobs/pt.ts',
      projectsLabel: '/PROJETOS',
      projectsTitle: 'Meus projetos',
      searchPlaceholder: 'Buscar por nome, linguagem, tags...',
      nothingFound: 'Nada encontrado para',
      noProjects: 'Adicione seus projetos em src/data/projects.ts',
      clearSearch: 'LIMPAR BUSCA'
    },
    en: {
      blogLabel: '/BLOG',
      blogTitle: 'Blog 𐔌՞. .՞𐦯',
      featuredPost: 'FEATURED POST',
      noImage: 'no image yet',
      readMore: 'Read more',
      skillsLabel: '/SKILLS',
      skillsTitle: 'Skills',
      noSkills: 'Add your skills in src/data/profile.ts',
      skillCategories: {
        languages: 'Languages',
        frameworks: 'Frameworks',
        databases: 'Databases',
        tools: 'Tools',
        architecture: 'Architecture',
        ai: 'Inteligência Artificial',
      },
      experienceLabel: '/EXPERIENCE',
      experienceTitle: 'Experience',
      experienceDescription: 'A quick look at my professional path, responsibilities, and technologies used along the way.',
      noExperience: 'Add your experience entries in src/data/jobs/eng.ts',
      projectsLabel: '/PROJECTS',
      projectsTitle: 'My projects',
      searchPlaceholder: 'Search by name, language, tags...',
      nothingFound: 'Nothing found for',
      noProjects: 'Add your projects in src/data/projects.ts',
      clearSearch: 'CLEAR SEARCH'
    }
  }

  const currentTexts = interfaceTexts[lang]
  const profileData = profile[lang]
  const jobs = lang === 'pt' ? jobs_pt : jobs_eng
  const previewJobs = jobs.slice(0, 2)
  const skillCategories = Object.entries(profile.skills).filter(([, skillItems]) => skillItems.length > 0)
  const projects = lang === 'pt' ? projects_pt : projects_eng

  console.log('DEBUG Home - lang:', lang)
  console.log('DEBUG Home - projects_pt:', projects_pt)
  console.log('DEBUG Home - projects_eng:', projects_eng)
  console.log('DEBUG Home - projects:', projects)

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    let resultProjects = projects

    if (normalizedQuery) {
      resultProjects = resultProjects.filter((projectItem) => {
        const matchesTitle = projectItem.title?.toLowerCase().includes(normalizedQuery)
        const matchesLanguage = projectItem.languages?.some((programmingLanguage) =>
          programmingLanguage.toLowerCase().includes(normalizedQuery)
        )
        return matchesTitle || matchesLanguage
      })
    }

    return normalizedQuery ? resultProjects : resultProjects.slice(0, 3)
  }, [searchQuery, lang, projects])

  function scrollToSkillsSection() {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative w-full transition-colors duration-300">
      <ParticlesBackground />

      <main id="home" className="relative min-h-screen flex items-center pt-24 pb-16 scroll-mt-24">
        <PageContainer className="relative z-10 flex flex-col-reverse xl:flex-row items-center justify-center gap-10 xl:gap-16 pt-8 xl:pt-0">
          
          {/* Seção de Texto (Centralizada no Mobile/Tela Dividida, Esquerda no Desktop) */}
          <div className="flex-1 max-w-2xl flex flex-col items-center text-center xl:items-start xl:text-left">
            <ScrambleText
              text={`${profile.name}_`}
              as="h1"
              className="text-[2.5rem] md:text-5xl xl:text-6xl font-bold tracking-tight cursor-default leading-none text-[var(--portfolio-text)]"
            />
            <p className="mt-4 xl:mt-5 text-base md:text-lg opacity-60 font-mono text-[var(--portfolio-text)]">
              $ {profileData.role}
            </p>
            <p className="mt-5 xl:mt-7 text-lg md:text-xl leading-relaxed opacity-80 text-[var(--portfolio-text)]">
              {profileData.bio}
            </p>
            
            {(profile.email || profile.github || profile.linkedin) && (
              <div className="flex flex-wrap justify-center xl:justify-start gap-3 mt-8">
                {profile.email && (
                  <MagneticButton
                    className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-black/15 dark:border-white/15 bg-transparent hover:bg-white dark:hover:bg-black transition-colors text-xs font-mono tracking-widest uppercase text-[var(--portfolio-text)]"
                    onClick={() => window.open(`mailto:${profile.email}`)}
                  >
                    <Mail size={16} strokeWidth={1.5} /> EMAIL
                  </MagneticButton>
                )}
                {profile.github && (
                  <MagneticButton
                    className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-black/15 dark:border-white/15 bg-transparent hover:bg-white dark:hover:bg-black transition-colors text-xs font-mono tracking-widest uppercase text-[var(--portfolio-text)]"
                    onClick={() => window.open(profile.github)}
                  >
                    <GithubIcon width={16} height={16} /> GITHUB
                  </MagneticButton>
                )}
                {profile.linkedin && (
                  <MagneticButton
                    className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-black/15 dark:border-white/15 bg-transparent hover:bg-white dark:hover:bg-black transition-colors text-xs font-mono tracking-widest uppercase text-[var(--portfolio-text)]"
                    onClick={() => window.open(profile.linkedin)}
                  >
                    <LinkedinIcon width={16} height={16} /> LINKEDIN
                  </MagneticButton>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-6 relative group shrink-0">
            <PhotoFrame src={profileImage} alt={profile.name} />
            <NowPlaying />
          </div>
        </PageContainer>

        <button
          onClick={scrollToSkillsSection}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50 hover:opacity-100 transition-opacity animate-bounce text-[var(--portfolio-text)] hidden xl:block"
        >
          <ChevronDown size={28} />
        </button>
      </main>

      <section id="skills" className="relative py-24 scroll-mt-10">
        <PageContainer>
          <FadeIn>
            <div className="mb-10">
              <p className="text-sm font-mono opacity-50 text-[var(--portfolio-text)]">{currentTexts.skillsLabel}</p>
              <h2 className="mt-1 text-4xl lg:text-[2.75rem] font-bold font-mono text-[var(--portfolio-text)]">
                {currentTexts.skillsTitle}
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {skillCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-10 border-t border-black/10 dark:border-white/10 pt-8">
                {skillCategories.map(([categoryKey, skillItems]) => (
                  <article key={categoryKey} className="min-w-0">
                    <h3 className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider opacity-60 text-[var(--portfolio-text)] mb-4">
                      <Code2 size={16} />
                      {currentTexts.skillCategories[categoryKey as keyof typeof currentTexts.skillCategories] ?? categoryKey}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {skillItems.map((skillName) => (
                        <span
                          key={skillName}
                          className="text-xs font-mono border border-black/15 dark:border-white/20 rounded-full px-3 py-1.5 opacity-90 text-[var(--portfolio-text)] bg-black/5 dark:bg-black transition-colors"
                        >
                          {skillName}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-6 border-t border-black/10 dark:border-white/10">
                <Code2 size={32} className="opacity-40 mb-4 text-[var(--portfolio-text)]" />
                <p className="font-mono text-base opacity-70 text-[var(--portfolio-text)]">
                  $ {currentTexts.noSkills}
                </p>
              </div>
            )}
          </FadeIn>
        </PageContainer>
      </section>

      <section id="experience" className="relative py-24 scroll-mt-10">
        <PageContainer>
          <FadeIn>
            <div className="mb-10">
              <p className="text-sm font-mono opacity-50 text-[var(--portfolio-text)]">{currentTexts.experienceLabel}</p>
              <Link to="/experience" className="inline-flex items-center gap-3 mt-1 group">
                <h2 className="text-4xl lg:text-[2.75rem] font-bold font-mono text-[var(--portfolio-text)] group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                  {currentTexts.experienceTitle}
                </h2>
                <ArrowRight size={28} className="text-[var(--portfolio-text)] group-hover:translate-x-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-all" />
              </Link>
              <p className="mt-4 text-lg opacity-70 text-[var(--portfolio-text)] max-w-2xl leading-relaxed">
                {currentTexts.experienceDescription}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {previewJobs.length > 0 ? (
              <div className="flex flex-col border-t border-black/10 dark:border-white/10">
                {previewJobs.map((job) => (
                  <Link
                    key={`${job.company}-${job.role}-${job.startDate}`}
                    to="/experience"
                    className="group flex flex-col xl:flex-row xl:items-start justify-between gap-6 py-8 px-6 -mx-6 rounded-2xl border-b border-black/10 dark:border-white/10 hover:bg-white dark:hover:bg-black transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold font-mono text-[var(--portfolio-text)] flex items-center gap-2 transition-colors">
                        {job.role}
                        <ArrowRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neutral-400" />
                      </h3>
                      <p className="mt-2 text-base md:text-lg opacity-70 text-[var(--portfolio-text)]">
                        {job.company}
                      </p>
                      <p className="mt-4 opacity-70 text-base md:text-lg leading-relaxed text-[var(--portfolio-text)] max-w-3xl line-clamp-2">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-6">
                        {job.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="text-xs font-mono border border-black/15 dark:border-white/20 rounded-full px-3 py-1.5 opacity-90 text-[var(--portfolio-text)] bg-black/5 dark:bg-black transition-colors"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-row xl:flex-col items-center xl:items-end gap-4 xl:gap-2 shrink-0 text-sm font-mono opacity-60 text-[var(--portfolio-text)] pt-2 xl:pt-0">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={16} /> {job.startDate} - {job.endDate}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-6 border-t border-black/10 dark:border-white/10">
                <BriefcaseBusiness size={32} className="opacity-40 mb-4 text-[var(--portfolio-text)]" />
                <p className="font-mono text-base opacity-70 text-[var(--portfolio-text)]">
                  $ {currentTexts.noExperience}
                </p>
              </div>
            )}
          </FadeIn>
        </PageContainer>
      </section>

      <section id="projects" className="relative py-24 scroll-mt-10">
        <PageContainer>
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-sm font-mono opacity-50 text-[var(--portfolio-text)]">{currentTexts.projectsLabel}</p>
                <Link to="/projects" className="inline-flex items-center gap-3 mt-1 group">
                  <h2 className="text-4xl lg:text-[2.75rem] font-bold font-mono text-[var(--portfolio-text)] group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                    {currentTexts.projectsTitle}
                  </h2>
                  <ArrowRight size={28} className="text-[var(--portfolio-text)] group-hover:translate-x-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-all" />
                </Link>
              </div>

              <div className="relative w-full md:w-80 group">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-[var(--portfolio-text)] group-focus-within:opacity-100 transition-opacity" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={currentTexts.searchPlaceholder}
                  className="w-full h-11 rounded-full border border-black/15 dark:border-white/20 hover:border-black/50 dark:hover:border-white/60 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white pl-11 pr-4 font-mono text-sm placeholder:opacity-50 text-[var(--portfolio-text)] bg-white dark:bg-black focus:outline-none transition-all shadow-sm"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col border-t border-black/10 dark:border-white/10">
              {filteredProjects.map((projectItem) => (
                <a
                  key={projectItem.slug}
                  href={projectItem.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col xl:flex-row xl:items-start justify-between gap-6 py-8 px-6 -mx-6 rounded-2xl border-b border-black/10 dark:border-white/10 hover:bg-white dark:hover:bg-black transition-all duration-300"
                >
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold font-mono text-[var(--portfolio-text)] flex items-center gap-2 transition-colors">
                      {projectItem.title}
                      <ArrowUpRight size={20} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-neutral-400" />
                    </h3>
                    <p className="mt-3 opacity-70 text-base md:text-lg leading-relaxed text-[var(--portfolio-text)] max-w-3xl">
                      {projectItem.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {projectItem.languages?.map((programmingLanguage) => (
                        <span
                          key={programmingLanguage}
                          className="text-xs font-mono border border-black/15 dark:border-white/20 rounded-full px-3 py-1.5 opacity-90 text-[var(--portfolio-text)] bg-black/5 dark:bg-black transition-colors"
                        >
                          {programmingLanguage}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row xl:flex-col items-center xl:items-end gap-4 xl:gap-2 shrink-0 text-sm font-mono opacity-60 text-[var(--portfolio-text)] pt-2 xl:pt-0">
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
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-mono text-sm text-[var(--portfolio-text)]"
                    >
                      <RotateCcw size={16} />
                      {currentTexts.clearSearch}
                    </button>
                  )}
                </div>
              )}
            </div>
          </FadeIn>
        </PageContainer>
      </section>

      <section id="blog" className="relative py-24 scroll-mt-10">
        <PageContainer>
          <FadeIn>
            <div className="mb-10">
              <p className="text-sm font-mono opacity-50 text-[var(--portfolio-text)]">{currentTexts.blogLabel}</p>
              <Link to="/blog" className="inline-flex items-center gap-3 mt-1 group">
                <h2 className="text-4xl lg:text-[2.75rem] font-bold font-mono text-[var(--portfolio-text)] group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                  {currentTexts.blogTitle}
                </h2>
                <ArrowRight size={28} className="text-[var(--portfolio-text)] group-hover:translate-x-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-all" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {highlightPost && (
              <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col xl:flex-row bg-white dark:bg-black">
                <Link to={`/blog/${highlightPost.slug}`} className="xl:w-1/2 shrink-0 block h-80 xl:h-auto relative overflow-hidden group bg-black/5 dark:bg-white/5 flex items-center justify-center">
                  {highlightPost.image_path ? (
                    <>
                      <img src={highlightPost.image_path} alt={highlightPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/60 to-transparent" />
                    </>
                  ) : (
                    <span className="text-xs opacity-40 font-mono text-[var(--portfolio-text)]">{currentTexts.noImage}</span>
                  )}
                </Link>

                <div className="flex-1 p-8 lg:p-10 flex flex-col bg-white dark:bg-black">
                  <span className="self-start font-mono text-[0.65rem] tracking-widest uppercase px-3 py-1.5 rounded-full mb-5 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 font-semibold text-[var(--portfolio-text)]">
                    {currentTexts.featuredPost}
                  </span>

                  <h3 className="text-3xl font-bold mb-4">
                    <Link
                      to={`/blog/${highlightPost.slug}`}
                      className="group/title inline-flex items-center gap-2 text-[var(--portfolio-text)] hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                    >
                      {highlightPost.title}
                      <ArrowRight size={20} className="shrink-0 translate-x-0 group-hover/title:translate-x-1 transition-transform" />
                    </Link>
                  </h3>

                  <p className="opacity-70 leading-relaxed mb-8 text-[var(--portfolio-text)] text-lg">
                    {highlightPost.excerpt}
                  </p>

                  {(highlightPost.readTime || highlightPost.date) && (
                    <div className="mt-auto flex items-center justify-between pt-5 border-t border-black/10 dark:border-white/10 font-mono text-xs opacity-50 text-[var(--portfolio-text)]">
                      <div className="flex items-center gap-4">
                        {highlightPost.date && (
                          <span className="flex items-center gap-1.5"><Calendar size={14} /> {highlightPost.date}</span>
                        )}
                        {highlightPost.readTime && (
                          <span className="flex items-center gap-1.5"><Clock size={14} /> {highlightPost.readTime}</span>
                        )}
                      </div>
                    <Link to={`/blog/${highlightPost.slug}`} className="flex items-center gap-1.5 group font-semibold text-[var(--portfolio-text)] hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                        {currentTexts.readMore} <ArrowRight size={14} className="group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </FadeIn>
        </PageContainer>
      </section>
    </div>
  )
}
