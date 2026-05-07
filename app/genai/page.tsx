'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  ChevronRight,
  BookOpen,
  Filter,
  LayoutGrid,
  List,
  Sparkles,
  Brain,
  Zap,
  Layers,
} from 'lucide-react'
import { genaiChapters, genaiPhases, genaiDifficultyConfig, type GenAIChapter, type Difficulty } from '@/lib/genai-chapters'

// ── Difficulty badge ──────────────────────────────────────────────────────────

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const cfg = genaiDifficultyConfig[difficulty]
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.color} ${cfg.bg} ${cfg.border} border`}
    >
      {cfg.label}
    </span>
  )
}

// ── Progress bar ──────────────────────────────────────────────────────────────

// ── Chapter card ──────────────────────────────────────────────────────────────

interface ChapterCardProps {
  chapter: GenAIChapter
  index: number
}

function ChapterCard({ chapter, index }: ChapterCardProps) {
  const phaseColor = genaiPhases[chapter.phase - 1].color
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
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 0 1px ${phaseColor}40, 0 8px 32px rgba(0,0,0,0.5)`,
        }}
      />

      {/* Top band */}
      <div className="h-1 w-full" style={{ background: phaseColor }} />

      <div className="flex flex-col flex-1 p-5">
        {/* Chapter number */}
        <div className="flex items-start justify-between mb-3">
          <span
            className="text-4xl font-display font-bold leading-none select-none"
            style={{
              background: `linear-gradient(135deg, ${phaseColor}, ${phaseColor}88)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {String(chapter.number).padStart(2, '0')}
          </span>

          {/* Phase badge */}
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              background: `${phaseColor}18`,
              border: `1px solid ${phaseColor}35`,
              color: phaseColor,
            }}
          >
            Phase {chapter.phase}
          </span>
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
          <span className="flex items-center gap-1 text-xs text-[#71717A]">
            <BookOpen className="w-3 h-3" />
            {chapter.conceptCount} concepts
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

        {/* CTA */}
        <Link
          href={`/genai/${chapter.slug}`}
          className="group/btn mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: `${phaseColor}18`,
            border: `1px solid ${phaseColor}30`,
            color: phaseColor,
          }}
        >
          Padhna Shuru Karo
          <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>
    </motion.div>
  )
}

// ── Filter bar ────────────────────────────────────────────────────────────────

type FilterValue = 'all' | Difficulty | `phase-${1 | 2 | 3 | 4}`
type ViewMode = 'grid' | 'list'

const FILTER_OPTIONS: { label: string; value: FilterValue }[] = [
  { label: 'All', value: 'all' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Phase 1', value: 'phase-1' },
  { label: 'Phase 2', value: 'phase-2' },
  { label: 'Phase 3', value: 'phase-3' },
  { label: 'Phase 4', value: 'phase-4' },
]

// ── Stats bar ─────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { icon: <Brain className="w-4 h-4" />, label: '22 Chapters', color: '#EF4444' },
    { icon: <Layers className="w-4 h-4" />, label: '4 Phases', color: '#F59E0B' },
    { icon: <Zap className="w-4 h-4" />, label: '~24 Hours Content', color: '#7C3AED' },
    { icon: <Sparkles className="w-4 h-4" />, label: 'Beginner to Expert', color: '#10B981' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="rounded-xl p-4 flex items-center gap-3"
          style={{
            background: 'rgba(26,26,38,0.9)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span style={{ color: stat.color }}>{stat.icon}</span>
          <span className="text-sm font-semibold text-[#A1A1AA]">{stat.label}</span>
        </div>
      ))}
    </motion.div>
  )
}

// ── Phase section header ──────────────────────────────────────────────────────

function PhaseBanner({ phase }: { phase: typeof genaiPhases[number] }) {
  return (
    <div
      className="rounded-xl px-5 py-3 mb-4 flex items-center gap-3"
      style={{
        background: `${phase.color}10`,
        border: `1px solid ${phase.color}25`,
      }}
    >
      <span
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: phase.color }}
      >
        Phase {phase.number}: {phase.name}
      </span>
      <span className="text-xs text-[#71717A]">{phase.chapters.length} chapters</span>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function GenAIPage() {
  const [filter, setFilter] = useState<FilterValue>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const filteredChapters = useMemo(() => {
    return genaiChapters.filter((c) => {
      if (filter === 'all') return true
      if (filter === 'beginner' || filter === 'intermediate' || filter === 'advanced') {
        return c.difficulty === filter
      }
      if (filter === 'phase-1') return c.phase === 1
      if (filter === 'phase-2') return c.phase === 2
      if (filter === 'phase-3') return c.phase === 3
      if (filter === 'phase-4') return c.phase === 4
      return true
    })
  }, [filter])

  const groupByPhase = filter === 'all'

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Page header */}
      <div
        className="relative py-12 md:py-16 overflow-hidden"
        style={{ background: '#12121A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Background glow — AI red/orange theme */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(239,68,68,0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 80% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  color: '#EF4444',
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                }}
              >
                GenAI Track
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  color: '#F59E0B',
                  background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.25)',
                }}
              >
                22 Chapters
              </span>
            </div>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #F5F5F7 0%, #EF4444 50%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Generative AI Masterclass
            </h1>
            <p className="text-base md:text-lg text-[#A1A1AA] max-w-2xl">
              AI/ML fundamentals se production AI apps tak. 0 experience se AI engineer. Hinglish mein — bilkul clear.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats */}
        <StatsBar />

        {/* Filter + view toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <div className="flex items-center gap-1 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-[#71717A] mr-1" />
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style={{
                  background: filter === opt.value ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                  border:
                    filter === opt.value
                      ? '1px solid rgba(239,68,68,0.4)'
                      : '1px solid rgba(255,255,255,0.07)',
                  color: filter === opt.value ? '#EF4444' : '#A1A1AA',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 ml-auto shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className="p-2 rounded-lg transition-all duration-150"
              style={{
                background: viewMode === 'grid' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                border: viewMode === 'grid' ? '1px solid rgba(239,68,68,0.35)' : '1px solid rgba(255,255,255,0.07)',
                color: viewMode === 'grid' ? '#EF4444' : '#71717A',
              }}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className="p-2 rounded-lg transition-all duration-150"
              style={{
                background: viewMode === 'list' ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                border: viewMode === 'list' ? '1px solid rgba(239,68,68,0.35)' : '1px solid rgba(255,255,255,0.07)',
                color: viewMode === 'list' ? '#EF4444' : '#71717A',
              }}
              aria-label="List view"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-xs text-[#71717A] mb-5">
          Showing{' '}
          <span className="font-semibold text-[#A1A1AA]">{filteredChapters.length}</span>{' '}
          chapters
        </p>

        {/* Chapters */}
        <AnimatePresence mode="wait">
          {filteredChapters.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-[#71717A]"
            >
              <Brain className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Koi chapter nahi mila is filter mein.</p>
            </motion.div>
          ) : viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {groupByPhase ? (
                genaiPhases.map((phase) => (
                  <div key={phase.number} className="mb-10">
                    <PhaseBanner phase={phase} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {phase.chapters.map((chapter, i) => (
                        <ChapterCard key={chapter.number} chapter={chapter} index={i} />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredChapters.map((chapter, i) => (
                    <ChapterCard key={chapter.number} chapter={chapter} index={i} />
                  ))}
                </div>
              )}
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
                const phaseColor = genaiPhases[chapter.phase - 1].color
                return (
                  <motion.div
                    key={chapter.number}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    className="group flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-200 hover:-translate-x-0.5"
                    style={{
                      background: 'rgba(26,26,38,0.9)',
                      border: '1px solid rgba(255,255,255,0.07)',
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

                    <Link
                      href={`/genai/${chapter.slug}`}
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
  )
}
