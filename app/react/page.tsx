'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  CheckCircle2,
  Circle,
  ChevronRight,
  BookOpen,
  Filter,
  LayoutGrid,
  List,
} from 'lucide-react'
import { reactChapters, reactPhases, reactDifficultyConfig, type ReactChapter, type Difficulty } from '@/lib/react-chapters'

const REACT_STORAGE_KEY = 'react-progress'

// ── React-specific progress hook ──────────────────────────────────────────────

function useReactProgress() {
  const [completedSlugs, setCompletedSlugs] = React.useState<Set<string>>(() => new Set())
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(REACT_STORAGE_KEY)
      if (raw) {
        const arr: string[] = JSON.parse(raw)
        setCompletedSlugs(new Set(arr))
      }
    } catch { /* ignore */ }
    setMounted(true)
  }, [])

  const toggle = React.useCallback((slug: string) => {
    setCompletedSlugs(prev => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      try { localStorage.setItem(REACT_STORAGE_KEY, JSON.stringify(Array.from(next))) } catch { /* ignore */ }
      return next
    })
  }, [])

  const isCompleted = React.useCallback(
    (slug: string) => mounted ? completedSlugs.has(slug) : false,
    [completedSlugs, mounted]
  )

  return { completedSlugs, completedCount: mounted ? completedSlugs.size : 0, toggle, isCompleted }
}

// ── Difficulty badge ──────────────────────────────────────────────────────────

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const cfg = reactDifficultyConfig[difficulty]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.color} ${cfg.bg} ${cfg.border} border`}>
      {cfg.label}
    </span>
  )
}

// ── Progress bar ──────────────────────────────────────────────────────────────

function ProgressBar({ percent, color = '#06B6D4' }: { percent: number; color?: string }) {
  return (
    <div className="relative h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}bb)` }}
      />
    </div>
  )
}

// ── Chapter card (grid view) ──────────────────────────────────────────────────

interface ChapterCardProps {
  chapter: ReactChapter
  isCompleted: boolean
  onToggle: () => void
  index: number
}

function ChapterCard({ chapter, isCompleted, onToggle, index }: ChapterCardProps) {
  const phaseColor = reactPhases[chapter.phase - 1].color
  const visibleTopics = chapter.topics.slice(0, 4)
  const extraTopics = chapter.topics.length - 4

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: 'rgba(26,26,38,0.9)',
        border: isCompleted
          ? '1px solid rgba(16,185,129,0.35)'
          : '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Hover gradient glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: isCompleted
            ? '0 0 0 1px rgba(16,185,129,0.4), 0 8px 32px rgba(0,0,0,0.5)'
            : `0 0 0 1px ${phaseColor}40, 0 8px 32px rgba(0,0,0,0.5)`,
        }}
      />

      {/* Top band */}
      <div
        className="h-1 w-full"
        style={{ background: isCompleted ? '#10B981' : phaseColor }}
      />

      <div className="flex flex-col flex-1 p-5">
        {/* Chapter number + check */}
        <div className="flex items-start justify-between mb-3">
          <span
            className="text-4xl font-display font-bold leading-none select-none"
            style={{
              background: isCompleted
                ? 'linear-gradient(135deg, #10B981, #06B6D4)'
                : `linear-gradient(135deg, ${phaseColor}, ${phaseColor}88)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {String(chapter.number).padStart(2, '0')}
          </span>

          <button
            onClick={(e) => { e.preventDefault(); onToggle() }}
            className="p-1 rounded-full transition-all duration-200 hover:scale-110"
            aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
            ) : (
              <Circle className="w-5 h-5 text-[#71717A] hover:text-[#A1A1AA]" />
            )}
          </button>
        </div>

        {/* Title + subtitle */}
        <div className="mb-3 flex-1">
          <h3 className="text-base font-bold font-display text-[#F5F5F7] leading-snug mb-1">
            {chapter.title}
          </h3>
          <p className="text-xs text-[#71717A] leading-relaxed line-clamp-2">
            {chapter.subtitle}
          </p>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <DifficultyBadge difficulty={chapter.difficulty} />
          <span className="flex items-center gap-1 text-xs text-[#71717A]">
            <Clock className="w-3 h-3" />
            {chapter.estimatedMinutes}m
          </span>
        </div>

        {/* Topics chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {visibleTopics.map((topic) => (
            <span
              key={topic}
              className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium text-[#A1A1AA] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.07)]"
            >
              {topic}
            </span>
          ))}
          {extraTopics > 0 && (
            <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium text-[#71717A] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
              +{extraTopics} more
            </span>
          )}
        </div>

        {/* Progress bar */}
        <ProgressBar
          percent={isCompleted ? 100 : 0}
          color={isCompleted ? '#10B981' : phaseColor}
        />

        {/* CTA button */}
        <Link
          href={`/react/${chapter.slug}`}
          className="group/btn mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: isCompleted
              ? 'rgba(16,185,129,0.12)'
              : `${phaseColor}18`,
            border: `1px solid ${isCompleted ? 'rgba(16,185,129,0.3)' : `${phaseColor}30`}`,
            color: isCompleted ? '#10B981' : phaseColor,
          }}
        >
          {isCompleted ? 'Revision Karo' : 'Padhna Shuru Karo'}
          <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>
    </motion.div>
  )
}

// ── Sidebar chapter link ──────────────────────────────────────────────────────

interface SidebarLinkProps {
  chapter: ReactChapter
  isCompleted: boolean
}

function SidebarLink({ chapter, isCompleted }: SidebarLinkProps) {
  return (
    <Link
      href={`/react/${chapter.slug}`}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 group hover:bg-[rgba(6,182,212,0.06)]"
    >
      {isCompleted ? (
        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
      ) : (
        <div
          className="w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 text-[8px] font-bold"
          style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#71717A' }}
        >
          {chapter.number}
        </div>
      )}
      <span className="text-xs font-medium leading-tight flex-1 min-w-0 truncate text-[#71717A] group-hover:text-[#A1A1AA] transition-colors duration-150">
        {chapter.title}
      </span>
    </Link>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

interface SidebarProps {
  completedSlugs: Set<string>
  completedCount: number
}

function Sidebar({ completedSlugs, completedCount }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col sticky top-20 self-start h-[calc(100vh-5rem)] overflow-hidden">
      <div
        className="flex flex-col h-full rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(18,18,26,0.95)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          className="px-4 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-[#06B6D4]" />
            <span className="text-sm font-bold text-[#F5F5F7]">React Chapters</span>
          </div>
          <p className="text-xs text-[#71717A]">
            {completedCount} / {reactChapters.length} complete
          </p>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-2 py-2 space-y-0.5">
          {reactPhases.map((phase) => (
            <div key={phase.number} className="mb-3">
              <div
                className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                style={{ color: phase.color }}
              >
                Phase {phase.number}: {phase.name}
              </div>
              {phase.chapters.map((chapter) => (
                <SidebarLink
                  key={chapter.number}
                  chapter={chapter}
                  isCompleted={completedSlugs.has(chapter.slug)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

// ── Filter bar ────────────────────────────────────────────────────────────────

type FilterValue = 'all' | Difficulty | 'completed' | 'incomplete'
type ViewMode = 'grid' | 'list'

const FILTER_OPTIONS: { label: string; value: FilterValue }[] = [
  { label: 'All', value: 'all' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Completed', value: 'completed' },
  { label: 'Remaining', value: 'incomplete' },
]

// ── Overall progress bar ──────────────────────────────────────────────────────

function OverallProgress({
  completedCount,
  total,
}: {
  completedCount: number
  total: number
}) {
  const percent = Math.round((completedCount / total) * 100)
  const phaseColors = [
    { max: 6, color: '#06B6D4' },
    { max: 13, color: '#F59E0B' },
    { max: 18, color: '#7C3AED' },
  ]
  const currentPhaseColor =
    phaseColors.find((p) => completedCount <= p.max)?.color ?? '#7C3AED'

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-5 md:p-6 mb-8"
      style={{
        background: 'rgba(26,26,38,0.9)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <span
              className="text-3xl font-display font-bold"
              style={{
                background: `linear-gradient(135deg, ${currentPhaseColor}, #7C3AED)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {completedCount}
            </span>
            <span className="text-[#71717A] text-sm">/ {total} chapters complete</span>
          </div>
          <p className="text-xs text-[#71717A]">
            {percent === 0
              ? 'Abhi shuru karo — React seekhna ab kabhi itna easy nahi tha!'
              : percent < 50
                ? `Acha chal raha hai — ${percent}% ho gaya`
                : percent < 100
                  ? `Almost there — ${100 - percent}% remaining!`
                  : 'You are a React Master! Components se full-stack tak!'}
          </p>
        </div>

        <div className="flex gap-6 shrink-0">
          {reactPhases.map((phase) => (
            <div key={phase.number} className="text-center">
              <span className="text-xs text-[#71717A] block mb-0.5">
                Phase {phase.number}
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: phase.color }}
              >
                {phase.chapters.length}ch
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <ProgressBar percent={percent} color={currentPhaseColor} />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-[#71717A]">0%</span>
          <span className="text-[10px] font-medium" style={{ color: currentPhaseColor }}>
            {percent}%
          </span>
          <span className="text-[10px] text-[#71717A]">100%</span>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ReactCoursePage() {
  const { completedSlugs, completedCount, toggle, isCompleted } = useReactProgress()
  const [filter, setFilter] = useState<FilterValue>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const filteredChapters = useMemo(() => {
    return reactChapters.filter((c) => {
      if (filter === 'all') return true
      if (filter === 'completed') return completedSlugs.has(c.slug)
      if (filter === 'incomplete') return !completedSlugs.has(c.slug)
      return c.difficulty === filter
    })
  }, [filter, completedSlugs])

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Page header */}
      <div
        className="relative py-12 md:py-16 overflow-hidden"
        style={{ background: '#12121A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Background glow — React cyan */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(6,182,212,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#06B6D4] px-2.5 py-1 rounded-full bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.25)]">
                React Track
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#F5F5F7] mb-3 tracking-tight">
              React.js Masterclass
            </h1>
            <p className="text-base md:text-lg text-[#A1A1AA] max-w-2xl">
              Components se full-stack apps tak. Sab kuch React mein.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Sidebar */}
          <Sidebar completedSlugs={completedSlugs} completedCount={completedCount} />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Overall progress */}
            <OverallProgress completedCount={completedCount} total={reactChapters.length} />

            {/* Filter + view toggle bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <div className="flex items-center gap-1 flex-wrap">
                <Filter className="w-3.5 h-3.5 text-[#71717A] mr-1" />
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilter(opt.value)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                    style={{
                      background: filter === opt.value ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.04)',
                      border:
                        filter === opt.value
                          ? '1px solid rgba(6,182,212,0.45)'
                          : '1px solid rgba(255,255,255,0.07)',
                      color: filter === opt.value ? '#06B6D4' : '#A1A1AA',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* View mode toggles */}
              <div className="flex items-center gap-1 ml-auto shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className="p-2 rounded-lg transition-all duration-150"
                  style={{
                    background: viewMode === 'grid' ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.04)',
                    border:
                      viewMode === 'grid'
                        ? '1px solid rgba(6,182,212,0.4)'
                        : '1px solid rgba(255,255,255,0.07)',
                    color: viewMode === 'grid' ? '#06B6D4' : '#71717A',
                  }}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className="p-2 rounded-lg transition-all duration-150"
                  style={{
                    background: viewMode === 'list' ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.04)',
                    border:
                      viewMode === 'list'
                        ? '1px solid rgba(6,182,212,0.4)'
                        : '1px solid rgba(255,255,255,0.07)',
                    color: viewMode === 'list' ? '#06B6D4' : '#71717A',
                  }}
                  aria-label="List view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Results count */}
            <p className="text-xs text-[#71717A] mb-5">
              Showing{' '}
              <span className="font-semibold text-[#A1A1AA]">{filteredChapters.length}</span>{' '}
              chapters
            </p>

            {/* Chapters grid or list */}
            <AnimatePresence mode="wait">
              {filteredChapters.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20 text-[#71717A]"
                >
                  <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Koi chapter nahi mila is filter mein.</p>
                </motion.div>
              ) : viewMode === 'grid' ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                  {filteredChapters.map((chapter, i) => (
                    <ChapterCard
                      key={chapter.slug}
                      chapter={chapter}
                      isCompleted={isCompleted(chapter.slug)}
                      onToggle={() => toggle(chapter.slug)}
                      index={i}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  {filteredChapters.map((chapter, i) => {
                    const phaseColor = reactPhases[chapter.phase - 1].color
                    const completed = isCompleted(chapter.slug)
                    return (
                      <motion.div
                        key={chapter.slug}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.03 }}
                        className="group flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-200 hover:-translate-x-0.5"
                        style={{
                          background: 'rgba(26,26,38,0.9)',
                          border: completed
                            ? '1px solid rgba(16,185,129,0.3)'
                            : '1px solid rgba(255,255,255,0.07)',
                        }}
                      >
                        <span
                          className="text-xl font-display font-bold shrink-0 w-10 text-right"
                          style={{
                            background: `linear-gradient(135deg, ${phaseColor}, ${phaseColor}80)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          {String(chapter.number).padStart(2, '0')}
                        </span>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-[#F5F5F7] truncate">
                              {chapter.title}
                            </span>
                            <DifficultyBadge difficulty={chapter.difficulty} />
                          </div>
                          <p className="text-xs text-[#71717A] truncate mt-0.5">
                            {chapter.subtitle}
                          </p>
                        </div>

                        <span className="hidden md:flex items-center gap-1 text-xs text-[#71717A] shrink-0">
                          <Clock className="w-3 h-3" />
                          {chapter.estimatedMinutes}m
                        </span>

                        <button
                          onClick={() => toggle(chapter.slug)}
                          className="shrink-0 p-1 rounded-full hover:scale-110 transition-transform duration-200"
                          aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
                        >
                          {completed ? (
                            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                          ) : (
                            <Circle className="w-4 h-4 text-[#71717A] group-hover:text-[#A1A1AA]" />
                          )}
                        </button>

                        <Link
                          href={`/react/${chapter.slug}`}
                          className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                          style={{
                            background: `${phaseColor}15`,
                            border: `1px solid ${phaseColor}30`,
                            color: phaseColor,
                          }}
                        >
                          Padho
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
