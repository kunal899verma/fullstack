'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ArrowRight, Pause, RotateCcw } from 'lucide-react'
import Link from 'next/link'

// ── Phase data ────────────────────────────────────────────────────────────────

interface Phase {
  id: string
  label: string
  shortLabel: string
  color: string
  colorAlpha: string
  description: string
  position: { x: number; y: number }
}

const EVENT_LOOP_PHASES: Phase[] = [
  {
    id: 'callstack',
    label: 'Call Stack',
    shortLabel: 'Call\nStack',
    color: '#7C3AED',
    colorAlpha: 'rgba(124,58,237,',
    description: 'Synchronous code execute hota hai — LIFO order mein',
    position: { x: 50, y: 10 },
  },
  {
    id: 'nodeapis',
    label: 'Node APIs',
    shortLabel: 'Node\nAPIs',
    color: '#06B6D4',
    colorAlpha: 'rgba(6,182,212,',
    description: 'setTimeout, fs.readFile — async operations register hoti hain',
    position: { x: 85, y: 40 },
  },
  {
    id: 'callbackqueue',
    label: 'Callback Queue',
    shortLabel: 'Callback\nQueue',
    color: '#10B981',
    colorAlpha: 'rgba(16,185,129,',
    description: 'Completed async operations yahan wait karti hain',
    position: { x: 70, y: 80 },
  },
  {
    id: 'eventloop',
    label: 'Event Loop',
    shortLabel: 'Event\nLoop',
    color: '#F59E0B',
    colorAlpha: 'rgba(245,158,11,',
    description: 'Stack khali hone par callbacks ko stack pe push karta hai',
    position: { x: 30, y: 80 },
  },
  {
    id: 'microtask',
    label: 'Microtask Queue',
    shortLabel: 'Microtask\nQueue',
    color: '#EF4444',
    colorAlpha: 'rgba(239,68,68,',
    description: 'Promise callbacks — callback queue se pehle run hoti hain',
    position: { x: 15, y: 40 },
  },
]

// ── Token positions mapped to phases ─────────────────────────────────────────

// Journey: callstack → nodeapis → callbackqueue → eventloop → microtask → callstack
const JOURNEY = ['callstack', 'nodeapis', 'callbackqueue', 'eventloop', 'microtask', 'callstack']

// ── Node card component ───────────────────────────────────────────────────────

interface PhaseNodeProps {
  phase: Phase
  isActive: boolean
  isPassed: boolean
  onClick: () => void
}

function PhaseNode({ phase, isActive, isPassed, onClick }: PhaseNodeProps) {
  return (
    <button
      onClick={onClick}
      className="group absolute flex flex-col items-center"
      style={{
        left: `${phase.position.x}%`,
        top: `${phase.position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isActive ? 20 : 10,
      }}
      aria-label={`Phase: ${phase.label}`}
    >
      {/* Outer ring */}
      <motion.div
        animate={isActive ? { scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] } : { scale: 1, opacity: 0 }}
        transition={{ duration: 1.2, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: phase.color,
          margin: '-6px',
        }}
      />

      {/* Main node */}
      <div
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:scale-105"
        style={{
          background: isActive
            ? `${phase.colorAlpha}0.25)`
            : isPassed
              ? `${phase.colorAlpha}0.12)`
              : 'rgba(26,26,38,0.9)',
          border: `2px solid ${isActive ? phase.color : isPassed ? `${phase.colorAlpha}0.4)` : 'rgba(255,255,255,0.1)'}`,
          boxShadow: isActive ? `0 0 24px ${phase.colorAlpha}0.5)` : 'none',
        }}
      >
        <span
          className="text-[9px] md:text-[10px] font-bold leading-tight whitespace-pre-line"
          style={{ color: isActive || isPassed ? phase.color : '#A1A1AA' }}
        >
          {phase.shortLabel}
        </span>
      </div>
    </button>
  )
}

// ── SVG arrows ────────────────────────────────────────────────────────────────

function ArrowsSVG({ activeIndex }: { activeIndex: number }) {
  // Simple curved paths between phases
  const arrows = [
    { d: 'M 50,14 Q 75,20 82,38', active: activeIndex >= 0 },
    { d: 'M 83,46 Q 85,68 72,78', active: activeIndex >= 1 },
    { d: 'M 65,82 Q 50,88 35,82', active: activeIndex >= 2 },
    { d: 'M 28,78 Q 15,68 18,46', active: activeIndex >= 3 },
    { d: 'M 18,38 Q 25,20 48,14', active: activeIndex >= 4 },
  ]

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <marker id="arrowhead" markerWidth="3" markerHeight="3" refX="1.5" refY="1.5" orient="auto">
          <polygon points="0 0, 3 1.5, 0 3" fill="rgba(124,58,237,0.6)" />
        </marker>
        <marker id="arrowhead-active" markerWidth="3" markerHeight="3" refX="1.5" refY="1.5" orient="auto">
          <polygon points="0 0, 3 1.5, 0 3" fill="#7C3AED" />
        </marker>
      </defs>
      {arrows.map((arrow, i) => (
        <path
          key={i}
          d={arrow.d}
          stroke={arrow.active ? '#7C3AED' : 'rgba(255,255,255,0.08)'}
          strokeWidth="0.8"
          fill="none"
          strokeDasharray={arrow.active ? 'none' : '1,1'}
          markerEnd={arrow.active ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
          style={{ transition: 'stroke 0.4s ease' }}
        />
      ))}
    </svg>
  )
}

// ── Token (animated ball) ─────────────────────────────────────────────────────

interface TokenProps {
  currentPhase: Phase | null
}

function Token({ currentPhase }: TokenProps) {
  if (!currentPhase) return null

  return (
    <AnimatePresence>
      <motion.div
        key={currentPhase.id}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="absolute w-5 h-5 rounded-full z-30 pointer-events-none"
        style={{
          left: `${currentPhase.position.x}%`,
          top: `${currentPhase.position.y}%`,
          transform: 'translate(-50%, -50%) translate(24px, 24px)',
          background: `radial-gradient(circle at 30% 30%, white, ${currentPhase.color})`,
          boxShadow: `0 0 12px ${currentPhase.color}, 0 0 24px ${currentPhase.colorAlpha}0.5)`,
        }}
      />
    </AnimatePresence>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

const CODE_EXAMPLE = `setTimeout(() => {
  console.log('2: Callback')
}, 0)

Promise.resolve().then(() => {
  console.log('1: Microtask')
})

console.log('0: Sync')`

export default function LiveDemoSection() {
  const [journeyIndex, setJourneyIndex] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [activePhaseId, setActivePhaseId] = useState<string | null>(null)
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    stop()
    setJourneyIndex(-1)
    setActivePhaseId(null)
  }, [stop])

  const run = useCallback(() => {
    if (isRunning) {
      stop()
      return
    }

    setIsRunning(true)
    let index = 0
    setJourneyIndex(0)
    setActivePhaseId(JOURNEY[0])

    intervalRef.current = setInterval(() => {
      index++
      if (index >= JOURNEY.length) {
        stop()
        setJourneyIndex(JOURNEY.length - 1)
        setActivePhaseId(null)
        return
      }
      setJourneyIndex(index)
      setActivePhaseId(JOURNEY[index])
    }, 900)
  }, [isRunning, stop])

  React.useEffect(() => () => stop(), [stop])

  const currentPhase = EVENT_LOOP_PHASES.find((p) => p.id === activePhaseId) ?? null
  const passedIds = new Set(JOURNEY.slice(0, journeyIndex))

  const logOutput =
    journeyIndex >= 3
      ? ['0: Sync', ...(journeyIndex >= 4 ? ['1: Microtask'] : []), ...(journeyIndex >= 5 ? ['2: Callback'] : [])]
      : []

  return (
    <section className="relative py-24 md:py-32 bg-[#12121A] overflow-hidden">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 50%, rgba(6,182,212,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 border border-[rgba(6,182,212,0.3)] bg-[rgba(6,182,212,0.08)] text-[#06B6D4]">
            Live Demo
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F5F5F7] mb-4 tracking-tight">
            Ek demo dekho
          </h2>
          <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
            Homepage par hi event loop ka live demo — andar aur bhi hai.
          </p>
        </motion.div>

        {/* Main demo area */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
        >
          {/* Left: Event loop diagram */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(10,10,15,0.9)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Window chrome */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <span className="w-3 h-3 rounded-full bg-[#10B981]" />
              </div>
              <span className="text-xs text-[#71717A] font-mono">Event Loop Visualizer</span>
              <div />
            </div>

            {/* Diagram */}
            <div className="relative" style={{ aspectRatio: '1 / 0.85', minHeight: 280 }}>
              <ArrowsSVG activeIndex={journeyIndex} />

              {EVENT_LOOP_PHASES.map((phase) => (
                <PhaseNode
                  key={phase.id}
                  phase={phase}
                  isActive={phase.id === activePhaseId}
                  isPassed={passedIds.has(phase.id)}
                  onClick={() => {
                    if (!isRunning) setActivePhaseId(phase.id)
                  }}
                />
              ))}

              <Token currentPhase={currentPhase} />

              {/* Center label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <AnimatePresence mode="wait">
                    {currentPhase ? (
                      <motion.div
                        key={currentPhase.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25 }}
                        className="px-3 py-2 rounded-xl max-w-[120px] mx-auto text-center"
                        style={{
                          background: `${currentPhase.colorAlpha}0.12)`,
                          border: `1px solid ${currentPhase.colorAlpha}0.3)`,
                        }}
                      >
                        <p className="text-[10px] font-bold mb-0.5" style={{ color: currentPhase.color }}>
                          {currentPhase.label}
                        </p>
                        <p className="text-[9px] text-[#A1A1AA] leading-tight">
                          {currentPhase.description}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.p
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] text-[#71717A] max-w-[120px]"
                      >
                        Click Run to see the flow
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div
              className="flex items-center justify-center gap-3 px-4 py-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <button
                onClick={run}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: isRunning
                    ? 'rgba(239,68,68,0.2)'
                    : 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
                  border: isRunning ? '1px solid rgba(239,68,68,0.4)' : 'none',
                  color: isRunning ? '#EF4444' : 'white',
                  boxShadow: isRunning ? 'none' : '0 4px 16px rgba(124,58,237,0.4)',
                }}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Run Example
                  </>
                )}
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#A1A1AA] hover:text-[#F5F5F7] transition-all duration-200 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
          </div>

          {/* Right: Code + output */}
          <div className="flex flex-col gap-4">
            {/* Code block */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: '#0d0d14',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-xs text-[#71717A] font-mono">example.js</span>
                <div />
              </div>
              <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto">
                {CODE_EXAMPLE.split('\n').map((line, i) => {
                  const isHighlighted =
                    (journeyIndex >= 0 && i === 0) ||
                    (journeyIndex >= 4 && i === 3) ||
                    (journeyIndex >= 2 && i === 6)

                  return (
                    <div
                      key={i}
                      className="transition-all duration-300 rounded px-1 -mx-1"
                      style={{
                        background: isHighlighted ? 'rgba(124,58,237,0.15)' : 'transparent',
                      }}
                    >
                      <span className="text-[#71717A] select-none mr-4 text-xs">{String(i + 1).padStart(2, ' ')}</span>
                      <span className="text-[#A1A1AA]">{line}</span>
                    </div>
                  )
                })}
              </pre>
            </div>

            {/* Output console */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: '#0d0d14',
                border: '1px solid rgba(255,255,255,0.08)',
                minHeight: 120,
              }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-xs text-[#71717A] font-mono">Output Console</span>
                {logOutput.length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                )}
              </div>
              <div className="p-4 font-mono text-sm min-h-[80px]">
                <AnimatePresence>
                  {logOutput.map((line, i) => (
                    <motion.div
                      key={line}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="flex items-center gap-2 mb-1"
                    >
                      <span className="text-[#10B981] text-xs">&gt;</span>
                      <span className="text-[#F5F5F7]">{line}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {logOutput.length === 0 && (
                  <p className="text-[#71717A] text-xs">Run the example to see output...</p>
                )}
              </div>
            </div>

            {/* Phase descriptions */}
            <div
              className="rounded-2xl p-4"
              style={{
                background: 'rgba(26,26,38,0.8)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p className="text-xs font-semibold text-[#71717A] uppercase tracking-widest mb-3">
                Phases
              </p>
              <div className="space-y-2">
                {EVENT_LOOP_PHASES.map((phase) => (
                  <div key={phase.id} className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: phase.color }}
                    />
                    <span
                      className="text-xs font-semibold shrink-0 w-28"
                      style={{ color: phase.color }}
                    >
                      {phase.label}
                    </span>
                    <span className="text-xs text-[#71717A]">{phase.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Link to full visualizations */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/visualizations"
            className="group inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors duration-200 text-sm font-medium"
          >
            Full interactive version visualizations page par hai
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
