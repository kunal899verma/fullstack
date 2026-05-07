import React from 'react'
import Link from 'next/link'
import { Zap, GitFork, BookOpen, Terminal, FileText, HelpCircle, ExternalLink } from 'lucide-react'

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

const footerColumns: FooterColumn[] = [
  {
    title: 'Course',
    links: [
      { label: 'Chapter 1 — Architecture', href: '/course/architecture' },
      { label: 'Chapter 2 — Setup & Tooling', href: '/course/setup' },
      { label: 'Chapter 3 — JS Refresher', href: '/course/js-refresher' },
      { label: 'Chapter 4 — Module System', href: '/course/modules' },
      { label: 'Chapter 5 — NPM Deep Dive', href: '/course/npm' },
      { label: 'See all 23 chapters →', href: '/course' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { label: 'Playground', href: '/playground' },
      { label: 'Cheatsheet', href: '/cheatsheet' },
      { label: 'Glossary', href: '/glossary' },
      { label: 'Quiz', href: '/quiz' },
      { label: 'Visualizations', href: '/visualizations' },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com',
        external: true,
      },
      { label: 'Blog', href: '/blog' },
      { label: 'Changelog', href: '/changelog' },
      {
        label: 'Node.js Docs',
        href: 'https://nodejs.org/docs',
        external: true,
      },
      {
        label: 'npm Registry',
        href: 'https://www.npmjs.com',
        external: true,
      },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About NodeMaster', href: '/about' },
      { label: 'Contributing', href: '/contributing' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
    ],
  },
]

const toolIcons: Record<string, React.ReactNode> = {
  Playground: <Terminal className="w-3.5 h-3.5" />,
  Cheatsheet: <FileText className="w-3.5 h-3.5" />,
  Quiz: <HelpCircle className="w-3.5 h-3.5" />,
  Visualizations: <BookOpen className="w-3.5 h-3.5" />,
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-24 border-t border-[rgba(255,255,255,0.06)]">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1 sm:col-span-2">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center shadow-[0_0_16px_rgba(124,58,237,0.4)] group-hover:shadow-[0_0_24px_rgba(124,58,237,0.6)] transition-shadow duration-300">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                <span
                  className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text"
                  style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  Node
                </span>
                <span className="text-[#F5F5F7]">Master</span>
              </span>
            </Link>

            <p className="text-[#71717A] text-sm leading-relaxed mb-6 max-w-xs">
              Node.js ko deeply samjho — architecture se leke production deployment tak. Hinglish mein, real examples ke saath.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#71717A] hover:text-[#F5F5F7] hover:bg-white/5 rounded-lg transition-all duration-200 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]"
                aria-label="GitHub"
              >
                <GitFork className="w-4 h-4" />
              </a>
            </div>

            {/* Stats pill */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] text-xs text-[#A1A1AA]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              23 chapters · Free forever
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[#F5F5F7] font-semibold text-sm mb-4 font-display tracking-wide">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-sm text-[#71717A] hover:text-[#A1A1AA] transition-colors duration-150"
                      >
                        <span className="group-hover:text-[#F5F5F7] transition-colors duration-150">
                          {toolIcons[link.label] ?? null}
                        </span>
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-150 shrink-0" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={`group inline-flex items-center gap-1.5 text-sm transition-colors duration-150 ${
                          link.label.includes('See all')
                            ? 'text-[#7C3AED] hover:text-[#9d5ff0] font-medium'
                            : 'text-[#71717A] hover:text-[#A1A1AA]'
                        }`}
                      >
                        {toolIcons[link.label] && (
                          <span className="group-hover:text-[#F5F5F7] transition-colors duration-150">
                            {toolIcons[link.label]}
                          </span>
                        )}
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#71717A] text-xs">
            &copy; {currentYear} NodeMaster. All rights reserved.
          </p>

          <p className="text-[#71717A] text-xs flex items-center gap-1.5">
            Built with{' '}
            <span className="text-red-400" aria-label="love">
              ❤️
            </span>{' '}
            in{' '}
            <span
              className="font-medium"
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Hinglish
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
