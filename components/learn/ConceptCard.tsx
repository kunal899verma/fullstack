'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, X, Check, Lightbulb, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import CodeBlock from '@/components/ui/CodeBlock'

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface QuizOption {
  text: string
  correct: boolean
  explanation: string
}

export interface QuizQuestion {
  question: string
  options: QuizOption[]
}

export interface CodeExample {
  code: string
  language?: string
  explanation: string
  filename?: string
}

export interface CommonMistake {
  mistake: string
  why: string
  fix: string
}

export interface ConceptCardProps {
  title: string
  emoji: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  whatIsIt: string
  whenToUse: string[]
  whyUseIt: string
  howToUse: CodeExample
  realWorldScenario: string
  commonMistakes: CommonMistake[]
  proTip: string
  demo?: React.ReactNode
  quiz?: QuizQuestion[]
}

// ── Difficulty badge ──────────────────────────────────────────────────────────

const difficultyConfig = {
  beginner: {
    label: 'Beginner',
    color: 'text-[#10B981]',
    bg: 'bg-[rgba(16,185,129,0.12)]',
    border: 'border-[rgba(16,185,129,0.3)]',
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-[#F59E0B]',
    bg: 'bg-[rgba(245,158,11,0.12)]',
    border: 'border-[rgba(245,158,11,0.3)]',
  },
  advanced: {
    label: 'Advanced',
    color: 'text-[#7C3AED]',
    bg: 'bg-[rgba(124,58,237,0.12)]',
    border: 'border-[rgba(124,58,237,0.3)]',
  },
}

// ── Collapsible section wrapper ───────────────────────────────────────────────

interface SectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  accent?: string
}

function CollapsibleSection({ title, icon, children, defaultOpen = true, accent = '#A1A1AA' }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-t border-[rgba(255,255,255,0.06)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-1 group"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base">{icon}</span>
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: accent }}
          >
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-[#71717A] group-hover:text-[#A1A1AA] transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-5 px-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Quiz component ────────────────────────────────────────────────────────────

interface QuizProps {
  questions: QuizQuestion[]
}

function QuizBlock({ questions }: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [score, setScore] = useState<number | null>(null)

  const handleAnswer = (qIndex: number, oIndex: number) => {
    if (answers[qIndex] !== undefined) return
    const newAnswers = { ...answers, [qIndex]: oIndex }
    setAnswers(newAnswers)
    if (Object.keys(newAnswers).length === questions.length) {
      const correct = questions.filter((q, i) => q.options[newAnswers[i]]?.correct).length
      setScore(correct)
    }
  }

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => {
        const chosen = answers[qi]
        return (
          <div key={qi} className="rounded-xl p-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
            <p className="text-sm font-semibold text-[#F5F5F7] mb-3 leading-relaxed">
              <span className="text-[#7C3AED] font-bold mr-2">Q{qi + 1}.</span>
              {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isChosen = chosen === oi
                const isRevealed = chosen !== undefined
                const isCorrect = opt.correct
                let bg = 'bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.07)] border-[rgba(255,255,255,0.08)]'
                let textColor = 'text-[#A1A1AA]'
                if (isRevealed) {
                  if (isCorrect) {
                    bg = 'bg-[rgba(16,185,129,0.12)] border-[rgba(16,185,129,0.35)]'
                    textColor = 'text-[#10B981]'
                  } else if (isChosen && !isCorrect) {
                    bg = 'bg-[rgba(239,68,68,0.12)] border-[rgba(239,68,68,0.35)]'
                    textColor = 'text-[#EF4444]'
                  } else {
                    bg = 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)]'
                    textColor = 'text-[#71717A]'
                  }
                }
                return (
                  <button
                    key={oi}
                    onClick={() => handleAnswer(qi, oi)}
                    disabled={isRevealed}
                    className={cn(
                      'w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all duration-200 flex items-start gap-2.5',
                      bg,
                      textColor,
                      !isRevealed && 'cursor-pointer'
                    )}
                  >
                    <span className="shrink-0 w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold mt-0.5">
                      {isRevealed && isCorrect ? <Check className="w-3 h-3" /> : isRevealed && isChosen && !isCorrect ? <X className="w-3 h-3" /> : String.fromCharCode(65 + oi)}
                    </span>
                    <span className="flex-1">{opt.text}</span>
                  </button>
                )
              })}
            </div>
            {chosen !== undefined && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 px-3 py-2 rounded-lg bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.2)]"
              >
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  <span className="text-[#7C3AED] font-semibold">Explanation: </span>
                  {q.options[chosen].explanation}
                  {!q.options[chosen].correct && (
                    <span className="block mt-1 text-[#10B981]">
                      Sahi jawab: {q.options.find(o => o.correct)?.text}
                    </span>
                  )}
                </p>
              </motion.div>
            )}
          </div>
        )
      })}

      {score !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl p-5 text-center"
          style={{
            background: score >= questions.length * 0.8
              ? 'rgba(16,185,129,0.1)'
              : 'rgba(245,158,11,0.1)',
            border: score >= questions.length * 0.8
              ? '1px solid rgba(16,185,129,0.3)'
              : '1px solid rgba(245,158,11,0.3)',
          }}
        >
          <div className="text-3xl mb-2">{score >= questions.length * 0.8 ? '🎉' : '📚'}</div>
          <p
            className="text-xl font-display font-bold mb-1"
            style={{ color: score >= questions.length * 0.8 ? '#10B981' : '#F59E0B' }}
          >
            {score}/{questions.length} Correct
          </p>
          <p className="text-sm text-[#A1A1AA]">
            {score >= questions.length * 0.8
              ? 'Zabardast! Concept clear hai thumhara.'
              : 'Thoda aur padho — phir try karo!'}
          </p>
        </motion.div>
      )}
    </div>
  )
}

// ── Main ConceptCard ──────────────────────────────────────────────────────────

export default function ConceptCard({
  title,
  emoji,
  difficulty,
  whatIsIt,
  whenToUse,
  whyUseIt,
  howToUse,
  realWorldScenario,
  commonMistakes,
  proTip,
  demo,
  quiz,
}: ConceptCardProps) {
  const diffCfg = difficultyConfig[difficulty]

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(26,26,38,0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5 w-full"
        style={{
          background: 'linear-gradient(90deg, #7C3AED, #06B6D4)',
        }}
      />

      <div className="p-6">
        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between mb-5 gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl leading-none">{emoji}</span>
            <h3 className="text-xl font-display font-bold text-[#F5F5F7] leading-tight">
              {title}
            </h3>
          </div>
          <span
            className={cn(
              'shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border',
              diffCfg.color, diffCfg.bg, diffCfg.border
            )}
          >
            {diffCfg.label}
          </span>
        </div>

        {/* ── What is it? (always visible) ─────────────────────────────── */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🤔</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">
              Kya Hai?
            </span>
          </div>
          <p className="text-sm text-[#D4D4D8] leading-relaxed pl-6">{whatIsIt}</p>
        </div>

        {/* ── When to use ──────────────────────────────────────────────── */}
        <CollapsibleSection title="Kab Use Karein?" icon="🎯">
          <ul className="space-y-2 pl-2">
            {whenToUse.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        {/* ── Why use it ───────────────────────────────────────────────── */}
        <CollapsibleSection title="Kyun Use Karein?" icon="💡">
          <p className="text-sm text-[#A1A1AA] leading-relaxed pl-2">{whyUseIt}</p>
        </CollapsibleSection>

        {/* ── How to use ───────────────────────────────────────────────── */}
        <CollapsibleSection title="Kaise Use Karein?" icon="🛠">
          <div className="space-y-4">
            <CodeBlock
              code={howToUse.code}
              language={howToUse.language ?? 'javascript'}
              filename={howToUse.filename}
            />
            <p className="text-sm text-[#A1A1AA] leading-relaxed">{howToUse.explanation}</p>
          </div>
        </CollapsibleSection>

        {/* ── Real World ───────────────────────────────────────────────── */}
        <CollapsibleSection title="Real-World Scenario" icon="🌍" accent="#06B6D4">
          <div
            className="rounded-xl p-4 text-sm text-[#A1A1AA] leading-relaxed"
            style={{
              background: 'rgba(124,58,237,0.06)',
              borderLeft: '3px solid #7C3AED',
            }}
          >
            <Globe className="w-4 h-4 text-[#7C3AED] mb-2" />
            {realWorldScenario}
          </div>
        </CollapsibleSection>

        {/* ── Common Mistakes ──────────────────────────────────────────── */}
        <CollapsibleSection title="Common Galtiyaan" icon="⚠️" accent="#EF4444">
          <div className="space-y-4">
            {commonMistakes.map((m, i) => (
              <div key={i} className="space-y-2">
                {/* Bad */}
                <div
                  className="rounded-lg p-3"
                  style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}
                >
                  <div className="flex items-start gap-2 mb-1">
                    <X className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                    <p className="text-xs font-bold text-[#EF4444] uppercase tracking-wide">Galti</p>
                  </div>
                  <p className="text-sm text-[#FCA5A5] font-mono ml-6">{m.mistake}</p>
                  <p className="text-xs text-[#A1A1AA] mt-1.5 ml-6">{m.why}</p>
                </div>
                {/* Fix */}
                <div
                  className="rounded-lg p-3"
                  style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)' }}
                >
                  <div className="flex items-start gap-2 mb-1">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <p className="text-xs font-bold text-[#10B981] uppercase tracking-wide">Sahi Tarika</p>
                  </div>
                  <p className="text-sm text-[#6EE7B7] font-mono ml-6">{m.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* ── Pro Tip ──────────────────────────────────────────────────── */}
        <CollapsibleSection title="Pro Tip" icon="💎" accent="#F59E0B">
          <div
            className="rounded-xl p-4 flex gap-3"
            style={{
              background: 'rgba(245,158,11,0.07)',
              border: '1px solid rgba(245,158,11,0.25)',
            }}
          >
            <Lightbulb className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
            <p className="text-sm text-[#FDE68A] leading-relaxed">{proTip}</p>
          </div>
        </CollapsibleSection>

        {/* ── Interactive Demo ──────────────────────────────────────────── */}
        {demo && (
          <CollapsibleSection title="Interactive Demo" icon="🎮" accent="#06B6D4">
            <div
              className="rounded-xl p-4"
              style={{
                background: 'rgba(6,182,212,0.05)',
                border: '1px solid rgba(6,182,212,0.2)',
              }}
            >
              {demo}
            </div>
          </CollapsibleSection>
        )}

        {/* ── Quiz ─────────────────────────────────────────────────────── */}
        {quiz && quiz.length > 0 && (
          <CollapsibleSection title="Quick Check" icon="❓" accent="#7C3AED">
            <QuizBlock questions={quiz} />
          </CollapsibleSection>
        )}
      </div>
    </div>
  )
}
