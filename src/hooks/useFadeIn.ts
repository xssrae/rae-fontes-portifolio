import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  return { ref, isInView }
}