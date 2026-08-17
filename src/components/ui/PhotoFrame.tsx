import { useLanguage } from '@/context/LanguageContext'

interface PhotoFrameProps {
  src?: string
  alt: string
}

export default function PhotoFrame({ src, alt }: PhotoFrameProps) {
  const { lang } = useLanguage()

  return (
    <div className="relative w-72 h-72 md:w-80 md:h-80">
      <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-black/25 dark:border-neutral-800 animate-[spin_20s_linear_infinite]" />

      <div className="absolute inset-3 rounded-full overflow-hidden bg-black/5 dark:bg-white/5 flex items-center justify-center">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover hover:grayscale transition-all duration-300"
          />
        ) : (
          <span className="text-xs opacity-40 text-center px-4">
            {lang === 'pt' ? 'foto em breve' : 'photo coming soon'}
          </span>
        )}
      </div>
    </div>
  )
}