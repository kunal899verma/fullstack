'use client'

import React from 'react'
import { AlignLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useScrollSpy } from '@/hooks/useScrollSpy'

// ── Interface ─────────────────────────────────────────────────────────────────

export interface TocItem {
  id: string
  title: string
  level: number // 1 = h2, 2 = h3
}

export interface TableOfContentsProps {
  items: TocItem[]
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function TableOfContents({ items }: TableOfContentsProps) {
  const activeId = useScrollSpy(items.map((i) => i.id), {
    rootMargin: '-80px 0px -60% 0px',
  })

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  if (items.length === 0) return null

  return (
    <nav
      className="rounded-2xl p-4 sticky top-24 self-start"
      style={{
        background: 'rgba(18,18,26,0.95)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        maxHeight: 'calc(100vh - 7rem)',
        overflowY: 'auto',
      }}
      aria-label="Table of contents"
    >
      {/* Heading */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[rgba(255,255,255,0.06)]">
        <AlignLeft className="w-4 h-4 text-[#7C3AED]" />
        <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">
          On this page
        </span>
      </div>

      {/* Items */}
      <ul className="space-y-0.5">
        {items.map((item) => {
          const isActive = activeId === item.id
          const isSubItem = item.level === 2

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  'flex items-start gap-2 py-1.5 px-2 rounded-lg text-xs leading-relaxed transition-all duration-150',
                  isSubItem ? 'ml-3' : '',
                  isActive
                    ? 'text-[#9D5FF0] font-semibold bg-[rgba(124,58,237,0.1)]'
                    : 'text-[#71717A] hover:text-[#A1A1AA] hover:bg-[rgba(255,255,255,0.04)]'
                )}
                style={
                  isActive
                    ? { borderLeft: '2px solid #7C3AED', paddingLeft: '6px' }
                    : { borderLeft: '2px solid transparent', paddingLeft: '6px' }
                }
              >
                {isSubItem && (
                  <span className="shrink-0 mt-1 w-1 h-1 rounded-full bg-current opacity-50" />
                )}
                <span className="flex-1">{item.title}</span>
              </a>
            </li>
          )
        })}
      </ul>

      {/* Scroll progress indicator */}
      <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
        <div className="h-0.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: activeId
                ? `${((items.findIndex(i => i.id === activeId) + 1) / items.length) * 100}%`
                : '0%',
              background: 'linear-gradient(90deg, #7C3AED, #06B6D4)',
            }}
          />
        </div>
        <p className="text-[10px] text-[#71717A] mt-1.5">
          {activeId
            ? `${items.findIndex(i => i.id === activeId) + 1} / ${items.length} sections`
            : `${items.length} sections`}
        </p>
      </div>
    </nav>
  )
}
