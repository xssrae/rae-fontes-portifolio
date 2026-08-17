import { useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'

export function useScramble(originalText: string, speed = 30) {
  const [text, setText] = useState(originalText)
  const frameRef = useRef<number | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function scramble() {
    let iteration = 0

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setText(() =>
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) return originalText[index]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join(''),
      )

      if (iteration >= originalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }

      iteration += 1 / 3
    }, speed)
  }

  function reset() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    setText(originalText)
  }

  return { text, scramble, reset }
}