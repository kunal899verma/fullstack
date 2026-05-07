'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, GitFork, Menu, X, ChevronRight, ChevronDown, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TrackLink {
  href: string
  label: string
  dot: string
}

interface ToolLink {
  href: string
  label: string
}

const trackLinks: TrackLink[] = [
  { href: '/javascript', label: 'JavaScript', dot: '#F7DF1E' },
  { href: '/react', label: 'React', dot: '#06B6D4' },
  { href: '/course', label: 'Node.js', dot: '#10B981' },
  { href: '/genai', label: 'GenAI', dot: '#F97316' },
  { href: '/typescript', label: 'TypeScript', dot: '#3178C6' },
  { href: '/databases', label: 'Databases', dot: '#FF6B35' },
  { href: '/visualizations', label: 'Visualizations', dot: '' },
]

const toolLinks: ToolLink[] = [
  { href: '/questions', label: '⭐ Interview Prep' },
  { href: '/playground', label: 'Playground' },
  { href: '/cheatsheet', label: 'Cheatsheet' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/quiz', label: 'Quiz' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const pathname = usePathname()
  const toolsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setToolsOpen(false)
  }, [pathname])

  // Close tools dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-[rgba(255,255,255,0.08)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="NodeMaster home"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center shadow-[0_0_16px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_24px_rgba(124,58,237,0.7)] transition-shadow duration-300">
                  <Zap className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                <span className="gradient-text">Node</span>
                <span className="text-[#F5F5F7]">Master</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {trackLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                      isActive
                        ? 'text-[#F5F5F7]'
                        : 'text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-white/8 border border-white/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.dot && (
                      <span
                        className="relative z-10 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: link.dot }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#7C3AED]" />
                    )}
                  </Link>
                )
              })}

              {/* Tools dropdown */}
              <div ref={toolsRef} className="relative">
                <button
                  onClick={() => setToolsOpen((prev) => !prev)}
                  className={cn(
                    'relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    toolsOpen
                      ? 'text-[#F5F5F7] bg-white/5'
                      : 'text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5'
                  )}
                >
                  <Wrench className="w-3.5 h-3.5" />
                  Tools
                  <motion.span
                    animate={{ rotate: toolsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {toolsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full right-0 mt-2 w-44 rounded-xl overflow-hidden shadow-2xl"
                      style={{
                        background: 'rgba(18,18,26,0.97)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <div className="p-1.5 space-y-0.5">
                        {toolLinks.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 transition-all duration-150"
                          >
                            {tool.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Desktop right side */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 rounded-lg transition-all duration-200"
                aria-label="View on GitHub"
              >
                <GitFork className="w-5 h-5" />
              </a>

              <Link
                href="/course"
                className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] transition-opacity duration-300" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#9d5ff0] to-[#22d3ee] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Shuru Karo</span>
                <ChevronRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2 text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 rounded-lg transition-all duration-200"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-down menu */}
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              className="fixed top-16 left-0 right-0 z-40 md:hidden glass border-b border-[rgba(255,255,255,0.08)] shadow-2xl"
            >
              <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
                {/* Tracks group */}
                <p className="px-4 pb-1 text-[10px] font-semibold tracking-widest uppercase text-[#71717A]">
                  Learning Tracks
                </p>
                {trackLinks.map((link, i) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== '/' && pathname.startsWith(link.href))
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                          isActive
                            ? 'bg-[rgba(124,58,237,0.15)] text-[#F5F5F7] border border-[rgba(124,58,237,0.3)]'
                            : 'text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5'
                        )}
                      >
                        {link.dot && (
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: link.dot }}
                          />
                        )}
                        {link.label}
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}

                {/* Tools group */}
                <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] mt-3">
                  <p className="px-4 pb-1 text-[10px] font-semibold tracking-widest uppercase text-[#71717A]">
                    Tools
                  </p>
                  {toolLinks.map((tool, i) => (
                    <motion.div
                      key={tool.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (trackLinks.length + i) * 0.05 }}
                    >
                      <Link
                        href={tool.href}
                        className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 transition-all duration-200"
                      >
                        {tool.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-3 pb-1 border-t border-[rgba(255,255,255,0.06)] mt-3 space-y-2">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 transition-all duration-200"
                  >
                    <GitFork className="w-4 h-4" />
                    GitHub
                  </a>

                  <Link
                    href="/course"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]"
                  >
                    Shuru Karo
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content jump below fixed navbar */}
      <div className="h-16" aria-hidden="true" />
    </>
  )
}
