'use client'

import React, { useState, useMemo, useEffect } from 'react'
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
import { tsChapters, tsPhases, tsDifficultyConfig, type TSChapter, type Difficulty } from '@/lib/typescript-chapters'

// ── localStorage helpers (ts-prefixed keys) ───────────────────────────────────

const TS_STORAGE_KEY = 'ts-nodemaster-progress'

function loadTsProgress(): Set<number> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(TS_STORAGE_KEY)
    if (!raw) return new Set()
    const arr: number[] = JSON.parse(raw)
    return new Set(arr)
  } catch {
    return new Set()
  }
}

function saveTsProgress(completed: Set<number>): void {
  try {
    localStorage.setItem(TS_STORAGE_KEY, JSON.stringify(Array.from(completed)))
  } catch {
    // ignore
  }
}

// ── Difficulty badge ──────────────────────────────────────────────────────────

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const cfg = tsDifficultyConfig[difficulty]
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.color} ${cfg.bg} ${cfg.border} border`}
    >
      {cfg.label}
    </span>
  )
}

// ── Progress bar ──────────────────────────────────────────────────────────────

function ProgressBar({ percent, color = '#3178C6' }: { percent: number; color?: string }) {
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
  chapter: TSChapter
  isCompleted: boolean
  onToggle: () => void
  index: number
}

function ChapterCard({ chapter, isCompleted, onToggle, index }: ChapterCardProps) {
  const phaseColor = tsPhases[chapter.phase - 1].color
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
      {/* Hover glow */}
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
            onClick={(e) => {
              e.preventDefault()
              onToggle()
            }}
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
          href={`/typescript/${chapter.slug}`}
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
  chapter: TSChapter
  isCompleted: boolean
}

function SidebarLink({ chapter, isCompleted }: SidebarLinkProps) {
  return (
    <Link
      href={`/typescript/${chapter.slug}`}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 group hover:bg-[rgba(255,255,255,0.04)]"
      style={{ border: '1px solid transparent' }}
    >
      {isCompleted ? (
        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
      ) : (
        <div
          className="w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 text-[8px] font-bold"
          style={{
            borderColor: 'rgba(255,255,255,0.2)',
            color: '#71717A',
          }}
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
  completedIds: Set<number>
}

function Sidebar({ completedIds }: SidebarProps) {
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
        {/* Sidebar header */}
        <div
          className="px-4 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-[#3178C6]" />
            <span className="text-sm font-bold text-[#F5F5F7]">TS Chapters</span>
          </div>
          <p className="text-xs text-[#71717A]">
            {completedIds.size} / {tsChapters.length} complete
          </p>
        </div>

        {/* Chapter list */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-2 py-2 space-y-0.5">
          {tsPhases.map((phase) => (
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
                  isCompleted={completedIds.has(chapter.number)}
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

// ── Overall progress ──────────────────────────────────────────────────────────

function OverallProgress({
  completedCount,
  total,
}: {
  completedCount: number
  total: number
}) {
  const percent = Math.round((completedCount / total) * 100)
  const phaseColors = [
    { max: 4, color: '#3178C6' },
    { max: 9, color: '#0EA5E9' },
    { max: 12, color: '#6366F1' },
  ]
  const currentPhaseColor =
    phaseColors.find((p) => completedCount <= p.max)?.color ?? '#6366F1'

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
                background: `linear-gradient(135deg, ${currentPhaseColor}, #06B6D4)`,
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
              ? 'Bhai, start karo — ek chapter roz!'
              : percent < 50
                ? `Acha chal raha hai yaar — ${percent}% ho gaya`
                : percent < 100
                  ? `Almost there dekho — ${100 - percent}% aur bacha hai!`
                  : 'TypeScript Master ban gaya! Zabardast!'}
          </p>
        </div>

        <div className="flex gap-6 shrink-0">
          {tsPhases.map((phase) => (
            <div key={phase.number} className="text-center">
              <span className="text-xs text-[#71717A] block mb-0.5">
                Phase {phase.number}
              </span>
              <span className="text-sm font-bold" style={{ color: phase.color }}>
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

export default function TypeScriptPage() {
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set())
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState<FilterValue>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  useEffect(() => {
    setCompletedIds(loadTsProgress())
    setMounted(true)
  }, [])

  const toggleComplete = (id: number) => {
    setCompletedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      saveTsProgress(next)
      return next
    })
  }

  const isCompleted = (id: number) => mounted && completedIds.has(id)

  const filteredChapters = useMemo(() => {
    return tsChapters.filter((c) => {
      if (filter === 'all') return true
      if (filter === 'completed') return completedIds.has(c.number)
      if (filter === 'incomplete') return !completedIds.has(c.number)
      return c.difficulty === filter
    })
  }, [filter, completedIds])

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Page header */}
      <div
        className="relative py-12 md:py-16 overflow-hidden"
        style={{ background: '#12121A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Background glow — TypeScript blue brand */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(49,120,198,0.14) 0%, transparent 70%)',
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
                  color: '#3178C6',
                  background: 'rgba(49,120,198,0.1)',
                  border: '1px solid rgba(49,120,198,0.25)',
                }}
              >
                TypeScript
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#F5F5F7] mb-3 tracking-tight">
              TypeScript Masterclass
            </h1>
            <p className="text-base md:text-lg text-[#A1A1AA] max-w-2xl">
              TypeScript ki har cheez — beginner se advanced tak. Types se leke generics tak.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Sidebar */}
          <Sidebar completedIds={completedIds} />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Overall progress */}
            <OverallProgress completedCount={mounted ? completedIds.size : 0} total={tsChapters.length} />

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
                      background: filter === opt.value ? 'rgba(49,120,198,0.18)' : 'rgba(255,255,255,0.04)',
                      border:
                        filter === opt.value
                          ? '1px solid rgba(49,120,198,0.45)'
                          : '1px solid rgba(255,255,255,0.07)',
                      color: filter === opt.value ? '#3178C6' : '#A1A1AA',
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
                    background: viewMode === 'grid' ? 'rgba(49,120,198,0.18)' : 'rgba(255,255,255,0.04)',
                    border:
                      viewMode === 'grid'
                        ? '1px solid rgba(49,120,198,0.4)'
                        : '1px solid rgba(255,255,255,0.07)',
                    color: viewMode === 'grid' ? '#3178C6' : '#71717A',
                  }}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className="p-2 rounded-lg transition-all duration-150"
                  style={{
                    background: viewMode === 'list' ? 'rgba(49,120,198,0.18)' : 'rgba(255,255,255,0.04)',
                    border:
                      viewMode === 'list'
                        ? '1px solid rgba(49,120,198,0.4)'
                        : '1px solid rgba(255,255,255,0.07)',
                    color: viewMode === 'list' ? '#3178C6' : '#71717A',
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
                  <p className="text-sm">Koi chapter nahi mila is filter mein, yaar.</p>
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
                      key={chapter.number}
                      chapter={chapter}
                      isCompleted={isCompleted(chapter.number)}
                      onToggle={() => toggleComplete(chapter.number)}
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
                    const phaseColor = tsPhases[chapter.phase - 1].color
                    const completed = isCompleted(chapter.number)
                    return (
                      <motion.div
                        key={chapter.number}
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
                        {/* Number */}
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

                        {/* Info */}
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

                        {/* Time */}
                        <span className="hidden md:flex items-center gap-1 text-xs text-[#71717A] shrink-0">
                          <Clock className="w-3 h-3" />
                          {chapter.estimatedMinutes}m
                        </span>

                        {/* Check toggle */}
                        <button
                          onClick={() => toggleComplete(chapter.number)}
                          className="shrink-0 p-1 rounded-full hover:scale-110 transition-transform duration-200"
                          aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
                        >
                          {completed ? (
                            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                          ) : (
                            <Circle className="w-4 h-4 text-[#71717A] group-hover:text-[#A1A1AA]" />
                          )}
                        </button>

                        {/* Read link */}
                        <Link
                          href={`/typescript/${chapter.slug}`}
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
