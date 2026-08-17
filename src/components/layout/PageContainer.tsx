import type { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={`max-w-5xl w-full mx-auto px-8 ${className ?? ''}`}>
      {children}
    </div>
  )
}