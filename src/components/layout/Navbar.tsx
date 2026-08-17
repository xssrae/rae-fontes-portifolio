import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Moon, Sun, ArrowLeft, Menu, X } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useLanguage } from '@/context/LanguageContext'

const navigationItems = [
  { id: 'home', label: { pt: 'Início', en: 'Home' } },
  { id: 'experience', label: { pt: 'Experiência', en: 'Experience' } },
  { id: 'projects', label: { pt: 'Projetos', en: 'Projects' } },
  { id: 'blog', label: { pt: 'Blog', en: 'Blog' } },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isCurrentPathHome = location.pathname === '/'
  const isBlogPost = location.pathname.startsWith('/blog/')

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleNavigationAndScroll = (navigationItem: (typeof navigationItems)[number]) => {
    setIsMobileMenuOpen(false)
    const sectionIdentifier = navigationItem.id
    if (!isCurrentPathHome) {
      navigate('/')
      setTimeout(() => {
        document.getElementById(sectionIdentifier)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(sectionIdentifier)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLabels = {
    pt: { blogBtn: 'BLOG', homeBtn: 'INÍCIO' },
    en: { blogBtn: 'BLOG', homeBtn: 'HOME' }
  }

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 xl:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[260px] bg-[#f5f5f0] dark:bg-[#0a0a0a] border-l border-black/10 dark:border-white/10 z-40 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col pt-24 px-8 xl:hidden ${
          isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 font-mono text-lg mt-4">
          {isBlogPost ? (
             <button
              onClick={() => { setIsMobileMenuOpen(false); navigate('/blog'); }}
              className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity text-[var(--portfolio-text)] w-fit"
            >
              <ArrowLeft size={20} /> {navLabels[lang].blogBtn}
            </button>
          ) : !isCurrentPathHome ? (
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigate('/'); }}
              className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity text-[var(--portfolio-text)] text-left w-fit"
            >
              {navLabels[lang].homeBtn}
            </button>
          ) : (
            navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigationAndScroll(item)}
                className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity text-[var(--portfolio-text)] text-left w-fit"
              >
                <span className="text-sm opacity-40 mr-1">•</span> {item.label[lang]}
              </button>
            ))
          )}

          <div className="w-full h-px bg-black/10 dark:bg-white/10 my-4" />

          <div className="flex items-center gap-2 font-mono text-sm uppercase text-[var(--portfolio-text)]">
            <button
              onClick={toggleLang}
              className={`transition-opacity ${lang === 'pt' ? 'font-bold opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              PT
            </button>
            <span className="opacity-30">/</span>
            <button
              onClick={toggleLang}
              className={`transition-opacity ${lang === 'en' ? 'font-bold opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      <nav className={`fixed top-6 left-0 right-0 flex justify-center px-4 transition-all duration-300 z-50 pointer-events-none`}>
        <div className={`flex items-center gap-4 xl:gap-5 bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-sm rounded-full px-5 xl:px-6 py-2.5 pointer-events-auto transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? '-translate-x-[90px] xl:translate-x-0' : 'translate-x-0'}`}>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity text-[var(--portfolio-text)]"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="hidden xl:flex items-center gap-2">
            {isBlogPost ? (
              <button
                onClick={() => navigate('/blog')}
                className="flex items-center gap-2 font-mono text-sm tracking-wider uppercase px-4 py-2 rounded-full transition-colors opacity-70 hover:opacity-100 hover:bg-white dark:hover:bg-white/5 cursor-pointer text-[var(--portfolio-text)]"
              >
                <ArrowLeft size={16} /> {navLabels[lang].blogBtn}
              </button>
            ) : !isCurrentPathHome ? (
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 font-mono text-sm tracking-wider uppercase px-4 py-2 rounded-full transition-colors opacity-70 hover:opacity-100 hover:bg-white dark:hover:bg-white/5 cursor-pointer text-[var(--portfolio-text)]"
              >
                {navLabels[lang].homeBtn}
              </button>
            ) : (
              navigationItems.map((navigationElement) => (
                <button
                  key={navigationElement.id}
                  onClick={() => handleNavigationAndScroll(navigationElement)}
                  className="flex items-center gap-2 font-mono text-sm tracking-wider uppercase px-4 py-2 rounded-full transition-colors opacity-70 hover:opacity-100 hover:bg-white dark:hover:bg-white/5 cursor-pointer text-[var(--portfolio-text)]"
                >
                  {navigationElement.label[lang].toUpperCase()}
                </button>
              ))
            )}
          </div>

          <div className={`items-center gap-2 ${isMobileMenuOpen ? 'hidden xl:flex' : 'flex'}`}>
            <span className="hidden xl:block text-[var(--portfolio-text)] opacity-20 font-mono mr-2" aria-hidden="true">|</span>

            <button
              onClick={toggleLang}
              className="flex items-center gap-2 font-mono text-sm uppercase cursor-pointer text-[var(--portfolio-text)]"
            >
              <span className={`transition-opacity ${lang === 'pt' ? 'font-semibold opacity-100' : 'opacity-40 hover:opacity-70'}`}>
                PT
              </span>
              <span className="opacity-30">/</span>
              <span className={`transition-opacity ${lang === 'en' ? 'font-semibold opacity-100' : 'opacity-40 hover:opacity-70'}`}>
                EN
              </span>
            </button>
          </div>

          <span className={`text-[var(--portfolio-text)] opacity-20 font-mono ${isMobileMenuOpen ? 'hidden xl:block' : 'block'}`} aria-hidden="true">|</span>

          <button
            onClick={toggleTheme}
            className="opacity-70 hover:opacity-100 flex items-center justify-center p-1 transition-opacity cursor-pointer text-[var(--portfolio-text)]"
          >
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

        </div>
      </nav>
    </>
  )
}
