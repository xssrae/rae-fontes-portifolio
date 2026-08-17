import { useScramble } from '@/hooks/useScramble'

interface ScrambleTextProps {
  text: string
  className?: string
  speed?: number
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p'
}

export default function ScrambleText({
  text,
  className,
  speed = 60,
  as: Tag = 'span',
}: ScrambleTextProps) {
  const { text: displayText, scramble, reset } = useScramble(text, speed)

  return (
    <Tag
      className={`inline-block ${className ?? ''}`}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {displayText}
    </Tag>
  )
}