import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { profile } from '@/data/profile'
import MagneticButton from '@/components/ui/MagneticButton'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const currentYear = 2026
  const { lang } = useLanguage()

  const navigateToLink = (navigationUrl: string) => {
    if (!navigationUrl) return
    window.open(navigationUrl, '_blank', 'noopener,noreferrer')
  }

  const texts = {
    pt: {
      rights: 'Todos os direitos reservados.',
      emailTitle: 'Entre em contato por email',
      githubTitle: 'Acessar Github',
      linkedinTitle: 'Acessar Linkedin'
    },
    en: {
      rights: 'All rights reserved.',
      emailTitle: 'Contact via email',
      githubTitle: 'Access Github',
      linkedinTitle: 'Access Linkedin'
    }
  }

  return (
    <footer className="w-full py-16 flex flex-col items-center justify-center gap-10 border-t border-black/10 dark:border-white/10 mt-20">
      <style>
        {`
          @keyframes colorCycle {
            to {
              background-position: 200% center;
            }
          }
          .hover-rainbow {
            transition: all 0.3s ease;
          }
          .hover-rainbow:hover {
            background: linear-gradient(to right, #c026d3, #06b6d4, #10b981, #06b6d4, #c026d3);
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: colorCycle 3s linear infinite;
          }
        `}
      </style>

      <p className="text-sm font-mono opacity-70 text-[var(--portfolio-text)] flex items-center gap-1.5">
        © {currentYear}
        <span className="font-bold cursor-default hover-rainbow">
          {profile.name}
        </span>
        . {texts[lang].rights}
      </p>

      {(profile.email || profile.github || profile.linkedin) && (
        <div className="flex flex-wrap items-center justify-center gap-4">
          {profile.email && (
            <div title={texts[lang].emailTitle}>
              <MagneticButton
                onClick={() => navigateToLink(`mailto:${profile.email}`)}
                className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-black/15 dark:border-white/15 bg-transparent hover:bg-white dark:hover:bg-black transition-colors text-xs font-mono tracking-widest uppercase text-[var(--portfolio-text)]"
              >
                <Mail size={16} strokeWidth={1.5} /> EMAIL
              </MagneticButton>
            </div>
          )}
          {profile.github && (
            <div title={texts[lang].githubTitle}>
              <MagneticButton
                onClick={() => navigateToLink(profile.github)}
                className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-black/15 dark:border-white/15 bg-transparent hover:bg-white dark:hover:bg-black transition-colors text-xs font-mono tracking-widest uppercase text-[var(--portfolio-text)]"
              >
                <GithubIcon width={16} height={16} /> GITHUB
              </MagneticButton>
            </div>
          )}
          {profile.linkedin && (
            <div title={texts[lang].linkedinTitle}>
              <MagneticButton
                onClick={() => navigateToLink(profile.linkedin)}
                className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-black/15 dark:border-white/15 bg-transparent hover:bg-white dark:hover:bg-black transition-colors text-xs font-mono tracking-widest uppercase text-[var(--portfolio-text)]"
              >
                <LinkedinIcon width={16} height={16} /> LINKEDIN
              </MagneticButton>
            </div>
          )}
        </div>
      )}
    </footer>
  )
}
