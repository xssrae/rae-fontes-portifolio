import { useEffect, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'

interface Particle {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  opacity: number
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let animationId: number
    const mouse = { x: -9999, y: -9999 }
    const repelRadius = 130

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function createParticles() {
      const count = Math.floor((window.innerWidth * window.innerHeight) / 6000)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.3,
      }))
    }

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particleColor = theme === 'dark' ? '200, 200, 200' : '70, 70, 70'

      for (const p of particles) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius
          p.x += (dx / dist) * force * 4
          p.y += (dy / dist) * force * 4
        }

        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor}, ${p.opacity})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    function handleMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    createParticles()
    draw()

    window.addEventListener('resize', () => {
      resize()
      createParticles()
    })
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}