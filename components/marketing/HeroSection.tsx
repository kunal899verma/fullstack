'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Play, ChevronDown } from 'lucide-react'

// ── Particle canvas ──────────────────────────────────────────────────────────

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: string
}

const PARTICLE_COLORS = [
  'rgba(124,58,237,',
  'rgba(6,182,212,',
  'rgba(245,158,11,',
]

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(28, Math.floor((w * h) / 28000))
    particlesRef.current = Array.from({ length: count }, () => {
      const colorBase = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.5 + 0.15,
        color: colorBase,
      }
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
      initParticles(w, h)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      particlesRef.current.forEach((p) => {
        // Drift
        p.x += p.vx
        p.y += p.vy

        // Wrap
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // Draw glow circle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3)
        gradient.addColorStop(0, `${p.color}${p.opacity})`)
        gradient.addColorStop(1, `${p.color}0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw solid core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.opacity + 0.2})`
        ctx.fill()
      })

      // Draw faint connections
      particlesRef.current.forEach((a, i) => {
        particlesRef.current.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.08
            ctx.beginPath()
            ctx.strokeStyle = `rgba(124,58,237,${alpha})`
            ctx.lineWidth = 0.5
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        })
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}

// ── Count-up stat ────────────────────────────────────────────────────────────

interface StatItemProps {
  value: number
  suffix: string
  label: string
  delay: number
}

function StatItem({ value, suffix, label, delay }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start: number | null = null
    const duration = 1400

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCurrent(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }

    const timer = setTimeout(() => requestAnimationFrame(step), delay)
    return () => clearTimeout(timer)
  }, [isInView, value, delay])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: delay / 1000 }}
        className="text-3xl md:text-4xl font-bold font-display"
        style={{
          background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {current}{suffix}
      </motion.span>
      <span className="text-xs md:text-sm text-[#A1A1AA] font-medium tracking-wide uppercase">
        {label}
      </span>
    </div>
  )
}

// ── Hero word-by-word headline ───────────────────────────────────────────────

const headlineParts = [
  { text: 'Code Master', gradient: false },
  { text: 'Bano', gradient: false },
  { text: '—', gradient: false },
  { text: '4 Complete', gradient: false },
  { text: 'Tracks', gradient: true },
]

function AnimatedHeadline() {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
      {headlineParts.map((part, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4 + i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={part.gradient ? 'inline-block italic' : 'inline-block text-[#F5F5F7]'}
          style={
            part.gradient
              ? {
                  background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }
              : {}
          }
        >
          {part.text}
        </motion.span>
      ))}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0F]">
      {/* Particle background */}
      <ParticleCanvas />

      {/* Radial glow backgrounds */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(6,182,212,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20 pb-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[rgba(124,58,237,0.35)] bg-[rgba(124,58,237,0.1)] text-sm text-[#A1A1AA]"
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-medium">Free · No Signup · Start Now</span>
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4"
        >
          <span
            className="text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-[#A1A1AA]"
          >
            NodeMaster
          </span>
        </motion.div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-tight mb-6">
          <AnimatedHeadline />
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          <span className="text-[#F5F5F7] font-medium">JavaScript • React • Node.js • Generative AI</span>
          <br />
          Beginner se Expert tak.{' '}
          <span className="text-[#F5F5F7] font-medium">Hinglish mein.</span>{' '}
          Interactive demos ke saath.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/course"
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white text-base overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)' }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #9d5ff0 0%, #22d3ee 100%)' }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Course Shuru Karo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
            <span
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{ boxShadow: '0 4px 24px rgba(124,58,237,0.45)' }}
            />
          </Link>

          <Link
            href="/playground"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-[#F5F5F7] text-base border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)] transition-all duration-200 hover:border-[rgba(124,58,237,0.5)] hover:bg-[rgba(124,58,237,0.08)] hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-current group-hover:text-[#06B6D4] transition-colors duration-200" />
            Playground Try Karo
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex items-center justify-center gap-8 md:gap-16"
        >
          <div className="hidden sm:block w-px h-10 bg-[rgba(255,255,255,0.08)]" />

          <StatItem value={80} suffix="+" label="Chapters" delay={200} />

          <div className="w-px h-10 bg-[rgba(255,255,255,0.08)]" />

          <StatItem value={200} suffix="+" label="Concepts" delay={350} />

          <div className="w-px h-10 bg-[rgba(255,255,255,0.08)]" />

          <StatItem value={40} suffix="+" label="Interactive Demos" delay={500} />

          <div className="hidden sm:block w-px h-10 bg-[rgba(255,255,255,0.08)]" />

          <div className="hidden sm:flex flex-col items-center gap-1">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="text-3xl md:text-4xl font-bold font-display"
              style={{
                background: 'linear-gradient(135deg, #F97316 0%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              4
            </motion.span>
            <span className="text-xs md:text-sm text-[#A1A1AA] font-medium tracking-wide uppercase">
              Complete Tracks
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#features"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#71717A] hover:text-[#A1A1AA] transition-colors duration-200 group"
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  )
}
