'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, XCircle, Trophy, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { QuizQuestion } from './ConceptCard'

// ── Interface ─────────────────────────────────────────────────────────────────

export interface QuizSectionProps {
  questions: QuizQuestion[]
  chapterSlug: string
}

// ── localStorage helpers ──────────────────────────────────────────────────────

function getStorageKey(slug: string) {
  return `nodemaster:quiz:${slug}`
}

interface SavedScore {
  score: number
  total: number
  timestamp: number
}

function loadScore(slug: string): SavedScore | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(getStorageKey(slug))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveScore(slug: string, score: number, total: number) {
  try {
    const data: SavedScore = { score, total, timestamp: Date.now() }
    localStorage.setItem(getStorageKey(slug), JSON.stringify(data))
  } catch {
    // ignore
  }
}

// ── Mini confetti ─────────────────────────────────────────────────────────────

function Confetti() {
  const pieces = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    color: ['#7C3AED', '#06B6D4', '#F59E0B', '#10B981', '#EC4899'][i % 5],
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 0.5,
    duration: 1 + Math.random() * 1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0 w-2 h-2 rounded-sm"
          style={{ left: p.left, background: p.color }}
          initial={{ y: -10, opacity: 1, rotate: 0, scale: 1 }}
          animate={{ y: 220, opacity: 0, rotate: 360, scale: 0.5 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}

// ── Main QuizSection ──────────────────────────────────────────────────────────

export default function QuizSection({ questions, chapterSlug }: QuizSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResult, setShowResult] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [prevBest, setPrevBest] = useState<SavedScore | null>(null)

  useEffect(() => {
    setPrevBest(loadScore(chapterSlug))
  }, [chapterSlug])

  const totalQ = questions.length
  const currentQ = questions[currentIndex]
  const chosenOption = answers[currentIndex]
  const isAnswered = chosenOption !== undefined
  const isLastQ = currentIndex === totalQ - 1
  const answeredCount = Object.keys(answers).length

  const score = questions.filter((q, i) => q.options[answers[i]]?.correct).length
  const percentage = Math.round((score / totalQ) * 100)
  const passed = percentage >= 80

  const handleAnswer = useCallback((optionIndex: number) => {
    if (isAnswered) return
    setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }))
  }, [currentIndex, isAnswered])

  const handleNext = () => {
    if (currentIndex < totalQ - 1) setCurrentIndex(i => i + 1)
    else finishQuiz()
  }

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1)
  }

  const finishQuiz = () => {
    setShowResult(true)
    const finalScore = questions.filter((q, i) => q.options[answers[i]]?.correct).length
    saveScore(chapterSlug, finalScore, totalQ)
    if (finalScore / totalQ >= 0.8) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2500)
    }
  }

  const resetQuiz = () => {
    setAnswers({})
    setCurrentIndex(0)
    setShowResult(false)
    setReviewMode(false)
  }

  const wrongQuestions = questions
    .map((q, i) => ({ q, i, chosen: answers[i] }))
    .filter(({ q, chosen }) => chosen !== undefined && !q.options[chosen]?.correct)

  // ── Result Screen ────────────────────────────────────────────────────────────

  if (showResult) {
    return (
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'rgba(26,26,38,0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {showConfetti && <Confetti />}

        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{passed ? '🏆' : '📖'}</div>
          <h3 className="text-2xl font-display font-bold mb-1" style={{ color: passed ? '#10B981' : '#F59E0B' }}>
            {passed ? 'Shandaar!' : 'Thodi Practice Aur!'}
          </h3>
          <p className="text-sm text-[#71717A]">
            {passed
              ? 'Concept clear hai. Aage badho!'
              : 'Revisit karo aur phir try karo — hoga!'}
          </p>
        </div>

        {/* Score ring */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-28 h-28">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke={passed ? '#10B981' : '#F59E0B'}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - percentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-display font-bold text-[#F5F5F7]">{score}/{totalQ}</span>
              <span className="text-xs text-[#71717A]">{percentage}%</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Correct', value: score, color: '#10B981' },
            { label: 'Wrong', value: totalQ - score, color: '#EF4444' },
            { label: 'Score', value: `${percentage}%`, color: passed ? '#7C3AED' : '#F59E0B' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-3 text-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-lg font-display font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-[#71717A]">{s.label}</p>
            </div>
          ))}
        </div>

        {prevBest && (
          <p className="text-xs text-center text-[#71717A] mb-4">
            Previous best: {prevBest.score}/{prevBest.total} ({Math.round(prevBest.score / prevBest.total * 100)}%)
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={resetQuiz}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.35)',
              color: '#9D5FF0',
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Dobara Try Karo
          </button>
          {wrongQuestions.length > 0 && (
            <button
              onClick={() => {
                setReviewMode(true)
                setShowResult(false)
                setCurrentIndex(wrongQuestions[0].i)
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#FCA5A5',
              }}
            >
              <BookOpen className="w-4 h-4" />
              Wrong Answers Review ({wrongQuestions.length})
            </button>
          )}
        </div>
      </div>
    )
  }

  // ── Quiz Screen ──────────────────────────────────────────────────────────────

  const reviewQueue = reviewMode ? wrongQuestions.map(w => w.i) : []
  const reviewPos = reviewMode ? reviewQueue.indexOf(currentIndex) : -1

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(26,26,38,0.9)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">
              {reviewMode ? 'Review Mode' : 'Chapter Quiz'}
            </span>
          </div>
          <span className="text-xs text-[#71717A]">
            {reviewMode
              ? `${reviewPos + 1}/${reviewQueue.length} wrong answers`
              : `${currentIndex + 1} / ${totalQ}`}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #06B6D4)' }}
            initial={false}
            animate={{
              width: reviewMode
                ? `${((reviewPos + 1) / reviewQueue.length) * 100}%`
                : `${((currentIndex + 1) / totalQ) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="px-6 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-base font-semibold text-[#F5F5F7] mb-5 leading-relaxed">
              {currentQ.question}
            </p>

            <div className="space-y-2.5">
              {currentQ.options.map((opt, oi) => {
                const isChosen = chosenOption === oi
                const isRevealed = isAnswered
                const isCorrect = opt.correct

                let borderColor = 'rgba(255,255,255,0.1)'
                let bgColor = 'rgba(255,255,255,0.04)'
                let textColor = '#A1A1AA'
                let hoverClass = 'hover:bg-[rgba(124,58,237,0.08)] hover:border-[rgba(124,58,237,0.3)]'

                if (isRevealed) {
                  hoverClass = ''
                  if (isCorrect) {
                    bgColor = 'rgba(16,185,129,0.1)'
                    borderColor = 'rgba(16,185,129,0.4)'
                    textColor = '#10B981'
                  } else if (isChosen) {
                    bgColor = 'rgba(239,68,68,0.1)'
                    borderColor = 'rgba(239,68,68,0.4)'
                    textColor = '#EF4444'
                  } else {
                    bgColor = 'rgba(255,255,255,0.02)'
                    borderColor = 'rgba(255,255,255,0.05)'
                    textColor = '#52525B'
                  }
                }

                return (
                  <button
                    key={oi}
                    onClick={() => handleAnswer(oi)}
                    disabled={isRevealed}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 flex items-center gap-3',
                      !isRevealed && 'cursor-pointer',
                      hoverClass
                    )}
                    style={{ background: bgColor, borderColor, color: textColor }}
                  >
                    {/* Option letter circle */}
                    <span
                      className="shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold"
                      style={{ borderColor: 'currentColor' }}
                    >
                      {isRevealed && isCorrect ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isRevealed && isChosen && !isCorrect ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        String.fromCharCode(65 + oi)
                      )}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 rounded-xl p-4"
                  style={{
                    background: 'rgba(124,58,237,0.08)',
                    border: '1px solid rgba(124,58,237,0.2)',
                  }}
                >
                  <p className="text-xs leading-relaxed text-[#A1A1AA]">
                    <span className="text-[#9D5FF0] font-semibold">Explanation: </span>
                    {currentQ.options[chosenOption]?.explanation}
                  </p>
                  {!currentQ.options[chosenOption]?.correct && (
                    <p className="text-xs text-[#10B981] mt-2">
                      Sahi jawab: {currentQ.options.find(o => o.correct)?.text}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-5 flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#A1A1AA',
          }}
        >
          <ChevronLeft className="w-4 h-4" />
          Pichla
        </button>

        {/* Dots */}
        <div className="flex gap-1.5">
          {(reviewMode ? reviewQueue : questions.map((_, i) => i)).map((qi, pos) => (
            <button
              key={pos}
              onClick={() => setCurrentIndex(qi)}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{
                background: currentIndex === qi
                  ? '#7C3AED'
                  : answers[qi] !== undefined
                    ? (questions[qi].options[answers[qi]]?.correct ? '#10B981' : '#EF4444')
                    : 'rgba(255,255,255,0.2)',
                transform: currentIndex === qi ? 'scale(1.25)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {isLastQ || (reviewMode && reviewPos === reviewQueue.length - 1) ? (
          <button
            onClick={finishQuiz}
            disabled={answeredCount < totalQ && !reviewMode}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
            style={{
              background: 'rgba(124,58,237,0.2)',
              border: '1px solid rgba(124,58,237,0.4)',
              color: '#9D5FF0',
            }}
          >
            Result Dekho
            <Trophy className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5"
            style={{
              background: 'rgba(124,58,237,0.2)',
              border: '1px solid rgba(124,58,237,0.4)',
              color: '#9D5FF0',
            }}
          >
            Agla
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
