'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase =
  | 'sync'
  | 'timers'
  | 'pending'
  | 'idle'
  | 'poll'
  | 'check'
  | 'close'
  | 'microtask'
  | 'nextTick'

interface ExecutionStep {
  phase: Phase
  label: string
  explanation: string
  color: string
}

interface OutputLine {
  text: string
  color: string
  phase: Phase
  timestamp: number
}

interface Scenario {
  id: number
  name: string
  code: string
  steps: ExecutionStep[]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PHASE_COLORS: Record<Phase, string> = {
  sync: '#F5F5F7',
  timers: '#06B6D4',
  pending: '#F59E0B',
  idle: '#8B5CF6',
  poll: '#F59E0B',
  check: '#10B981',
  close: '#6B7280',
  microtask: '#7C3AED',
  nextTick: '#EF4444',
}

const PHASE_LABELS: Record<Phase, string> = {
  sync: 'Call Stack',
  timers: 'Timers',
  pending: 'Pending Callbacks',
  idle: 'Idle / Prepare',
  poll: 'Poll (I/O)',
  check: 'Check (setImmediate)',
  close: 'Close Callbacks',
  microtask: 'Microtask Queue',
  nextTick: 'nextTick Queue',
}

// Circle phases (the 6 event loop phases in order)
const LOOP_PHASES: Phase[] = ['timers', 'pending', 'idle', 'poll', 'check', 'close']

// Angles for each phase on the circle (in degrees, 0 = top)
const PHASE_ANGLES: Record<Phase, number> = {
  timers: 0,
  pending: 60,
  idle: 120,
  poll: 180,
  check: 240,
  close: 300,
  sync: 0,
  microtask: 0,
  nextTick: 0,
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    name: 'Sync Only',
    code: `console.log('Start');
console.log('Middle');
console.log('End');`,
    steps: [
      {
        phase: 'sync',
        label: 'Start',
        explanation: 'Synchronous code seedha Call Stack mein execute hota hai — koi queue nahi!',
        color: PHASE_COLORS.sync,
      },
      {
        phase: 'sync',
        label: 'Middle',
        explanation: 'Dusra synchronous statement — ek ke baad ek execute hota hai.',
        color: PHASE_COLORS.sync,
      },
      {
        phase: 'sync',
        label: 'End',
        explanation: 'Teesra aur aakhri synchronous statement. Ab Call Stack khali hai!',
        color: PHASE_COLORS.sync,
      },
    ],
  },
  {
    id: 2,
    name: 'setTimeout vs setImmediate',
    code: `setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));
console.log('Sync');`,
    steps: [
      {
        phase: 'sync',
        label: 'Sync',
        explanation: 'Pehle synchronous code execute hota hai. setTimeout aur setImmediate queue mein jaate hain.',
        color: PHASE_COLORS.sync,
      },
      {
        phase: 'check',
        label: 'setImmediate',
        explanation: 'setImmediate Check phase mein run karta hai — setTimeout se pehle (agar I/O context mein ho)!',
        color: PHASE_COLORS.check,
      },
      {
        phase: 'timers',
        label: 'setTimeout',
        explanation: 'setTimeout Timers phase mein execute hota hai — even with 0ms delay.',
        color: PHASE_COLORS.timers,
      },
    ],
  },
  {
    id: 3,
    name: 'Promise vs setTimeout',
    code: `setTimeout(() => console.log('setTimeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('Sync');`,
    steps: [
      {
        phase: 'sync',
        label: 'Sync',
        explanation: 'Synchronous code pehle. Promise aur setTimeout register ho jaate hain.',
        color: PHASE_COLORS.sync,
      },
      {
        phase: 'microtask',
        label: 'Promise',
        explanation: 'Microtask Queue (Promises) har phase ke BAAD clear hoti hai — macrotasks se pehle!',
        color: PHASE_COLORS.microtask,
      },
      {
        phase: 'timers',
        label: 'setTimeout',
        explanation: 'Ab Timers phase mein setTimeout execute hota hai — Promise ke baad.',
        color: PHASE_COLORS.timers,
      },
    ],
  },
  {
    id: 4,
    name: 'process.nextTick Priority',
    code: `setTimeout(() => console.log('setTimeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
process.nextTick(() => console.log('nextTick'));
console.log('Sync');`,
    steps: [
      {
        phase: 'sync',
        label: 'Sync',
        explanation: 'Sab kuch register hota hai. Call Stack clear hone ka wait.',
        color: PHASE_COLORS.sync,
      },
      {
        phase: 'nextTick',
        label: 'nextTick',
        explanation: 'nextTick queue sabse pehle clear hota hai — even microtasks se pehle! Ye HIGHEST priority hai.',
        color: PHASE_COLORS.nextTick,
      },
      {
        phase: 'microtask',
        label: 'Promise',
        explanation: 'nextTick ke baad Microtask Queue (Promises) execute hoti hai.',
        color: PHASE_COLORS.microtask,
      },
      {
        phase: 'timers',
        label: 'setTimeout',
        explanation: 'Aakhir mein Timers phase — setTimeout execute hota hai.',
        color: PHASE_COLORS.timers,
      },
    ],
  },
  {
    id: 5,
    name: 'I/O Callback Flow',
    code: `console.log('Start');
fs.readFile('file', (err, data) => {
  console.log('File read!');
  process.nextTick(() =>
    console.log('nextTick in I/O')
  );
});
console.log('End');`,
    steps: [
      {
        phase: 'sync',
        label: 'Start',
        explanation: 'Synchronous code pehle execute hota hai. fs.readFile non-blocking hai.',
        color: PHASE_COLORS.sync,
      },
      {
        phase: 'sync',
        label: 'End',
        explanation: 'fs.readFile background mein file padhta hai. Hum block nahi hue!',
        color: PHASE_COLORS.sync,
      },
      {
        phase: 'poll',
        label: 'File read!',
        explanation: 'I/O complete! Poll phase mein callback execute hota hai — file ka data available hai.',
        color: PHASE_COLORS.poll,
      },
      {
        phase: 'nextTick',
        label: 'nextTick in I/O',
        explanation: 'I/O callback ke andar nextTick! Ye next iteration se pehle execute hoga.',
        color: PHASE_COLORS.nextTick,
      },
    ],
  },
]

// ─── Phase positions on the circle diagram ───────────────────────────────────

function getCirclePosition(
  phase: Phase,
  cx: number,
  cy: number,
  radius: number
): { x: number; y: number } {
  const angle = PHASE_ANGLES[phase]
  const rad = ((angle - 90) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface PhaseNodeProps {
  phase: Phase
  x: number
  y: number
  isActive: boolean
  tokenColor?: string
}

function PhaseNode({ phase, x, y, isActive, tokenColor }: PhaseNodeProps) {
  const color = PHASE_COLORS[phase]
  return (
    <g>
      {/* Glow when active */}
      {isActive && (
        <motion.circle
          cx={x}
          cy={y}
          r={34}
          fill={color}
          opacity={0.15}
          initial={{ r: 28, opacity: 0 }}
          animate={{ r: [28, 38, 28], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      )}

      {/* Node background */}
      <motion.rect
        x={x - 52}
        y={y - 18}
        width={104}
        height={36}
        rx={8}
        fill={isActive ? color : '#1A1A26'}
        stroke={isActive ? color : 'rgba(255,255,255,0.1)'}
        strokeWidth={isActive ? 2 : 1}
        animate={{
          fill: isActive ? color + '33' : '#1A1A26',
          stroke: isActive ? color : 'rgba(255,255,255,0.1)',
          strokeWidth: isActive ? 2 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Label */}
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill={isActive ? color : '#A1A1AA'}
        fontSize={10}
        fontFamily="JetBrains Mono, monospace"
        fontWeight={isActive ? '700' : '400'}
      >
        {PHASE_LABELS[phase]}
      </text>

      {/* Token */}
      <AnimatePresence>
        {isActive && tokenColor && (
          <motion.circle
            cx={x}
            cy={y - 28}
            r={7}
            fill={tokenColor}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{ filter: `drop-shadow(0 0 6px ${tokenColor})` }}
          />
        )}
      </AnimatePresence>
    </g>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EventLoopVisualizer() {
  const [selectedScenario, setSelectedScenario] = useState(0)
  const [currentStep, setCurrentStep] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(0.5)
  const [outputLines, setOutputLines] = useState<OutputLine[]>([])
  const [startTime] = useState(Date.now())

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const scenario = SCENARIOS[selectedScenario]
  const steps = scenario.steps
  const currentStepData = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null
  const activePhase = currentStepData?.phase ?? null

  // Circle diagram dimensions
  const svgW = 420
  const svgH = 380
  const cx = svgW / 2
  const cy = svgH / 2 + 20
  const radius = 130

  const clearAnimation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const reset = useCallback(() => {
    clearAnimation()
    setCurrentStep(-1)
    setIsRunning(false)
    setIsPaused(false)
    setOutputLines([])
  }, [clearAnimation])

  const advanceStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev + 1
      if (next >= steps.length) {
        clearAnimation()
        setIsRunning(false)
        return prev
      }
      const step = steps[next]
      setOutputLines((lines) => [
        ...lines,
        {
          text: step.label,
          color: step.color,
          phase: step.phase,
          timestamp: Date.now() - startTime,
        },
      ])
      return next
    })
  }, [steps, clearAnimation, startTime])

  const run = useCallback(() => {
    if (isPaused) {
      setIsPaused(false)
      setIsRunning(true)
    } else {
      reset()
      setTimeout(() => {
        setIsRunning(true)
        setCurrentStep(-1)
      }, 50)
    }
  }, [isPaused, reset])

  const pause = useCallback(() => {
    clearAnimation()
    setIsPaused(true)
    setIsRunning(false)
  }, [clearAnimation])

  const stepForward = useCallback(() => {
    if (!isRunning && !isPaused) {
      // Start stepping from beginning
      if (currentStep === -1) {
        setOutputLines([])
      }
    }
    advanceStep()
  }, [isRunning, isPaused, currentStep, advanceStep])

  // Auto-advance when running
  useEffect(() => {
    if (isRunning && !isPaused) {
      const delay = 1400 / speed
      intervalRef.current = setInterval(advanceStep, delay)
      return () => clearAnimation()
    }
  }, [isRunning, isPaused, speed, advanceStep, clearAnimation])

  // Initial step trigger
  useEffect(() => {
    if (isRunning && currentStep === -1) {
      advanceStep()
    }
  }, [isRunning, currentStep, advanceStep])

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [outputLines])

  // Reset on scenario change
  useEffect(() => {
    reset()
  }, [selectedScenario]) // eslint-disable-line react-hooks/exhaustive-deps

  // Draw connecting arrows between loop phases
  const arrowPaths: string[] = LOOP_PHASES.map((phase, i) => {
    const next = LOOP_PHASES[(i + 1) % LOOP_PHASES.length]
    const from = getCirclePosition(phase, cx, cy, radius)
    const to = getCirclePosition(next, cx, cy, radius)
    const mx = (from.x + to.x) / 2
    const my = (from.y + to.y) / 2
    // Curve slightly toward center
    const dcx = cx + (mx - cx) * 0.3
    const dcy = cy + (my - cy) * 0.3
    return `M ${from.x} ${from.y} Q ${dcx} ${dcy} ${to.x} ${to.y}`
  })

  const isComplete = currentStep >= steps.length - 1 && !isRunning

  return (
    <div className="w-full text-[#F5F5F7]">
      {/* ── 3-panel layout ── */}
      <div className="grid grid-cols-[35%_40%_25%] gap-4 min-h-[600px]">

        {/* ── LEFT: Code Panel ── */}
        <div className="flex flex-col gap-4">
          {/* Scenario selector */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
            style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
          >
            <label className="block text-xs font-mono text-[#A1A1AA] mb-2 uppercase tracking-wider">
              Scenario
            </label>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(Number(e.target.value))}
              className="w-full bg-[#12121A] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#7C3AED] transition-colors"
            >
              {SCENARIOS.map((s, i) => (
                <option key={s.id} value={i}>
                  {i + 1}. {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Code block */}
          <div
            className="flex-1 rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
            style={{ background: 'rgba(18,18,26,0.9)', backdropFilter: 'blur(12px)' }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs font-mono text-[#A1A1AA]">scenario.js</span>
            </div>
            <div className="text-xs">
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                customStyle={{
                  background: 'transparent',
                  margin: 0,
                  padding: '16px',
                  fontSize: '12px',
                  lineHeight: '1.7',
                }}
                wrapLines
                lineProps={(lineNumber) => {
                  const isActiveLine =
                    currentStepData &&
                    steps.findIndex((s) => s === currentStepData) === lineNumber - 1
                  return {
                    style: {
                      display: 'block',
                      borderRadius: '4px',
                      background: isActiveLine
                        ? `${currentStepData?.color}18`
                        : 'transparent',
                      borderLeft: isActiveLine
                        ? `2px solid ${currentStepData?.color}`
                        : '2px solid transparent',
                      paddingLeft: '8px',
                      transition: 'all 0.3s',
                    },
                  }
                }}
              >
                {scenario.code}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* Controls */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 flex flex-col gap-3"
            style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
          >
            {/* Run / Pause / Step */}
            <div className="flex gap-2">
              <button
                onClick={run}
                disabled={isComplete && !isPaused}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all disabled:opacity-40"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                  boxShadow: isRunning ? '0 0 20px rgba(124,58,237,0.4)' : 'none',
                }}
              >
                {isRunning ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Running…
                  </>
                ) : isPaused ? (
                  '▶ Resume'
                ) : (
                  '▶ Run'
                )}
              </button>

              <button
                onClick={pause}
                disabled={!isRunning}
                className="py-2 px-3 rounded-lg text-sm font-semibold bg-[#22222F] border border-[rgba(255,255,255,0.1)] hover:bg-[#2A2A3F] transition-all disabled:opacity-40"
              >
                ⏸
              </button>

              <button
                onClick={stepForward}
                disabled={isRunning || isComplete}
                className="py-2 px-3 rounded-lg text-sm font-semibold border transition-all disabled:opacity-40"
                style={{
                  background: 'rgba(16,185,129,0.15)',
                  borderColor: 'rgba(16,185,129,0.5)',
                  color: '#10B981',
                }}
                title="Best for beginners — step one at a time"
              >
                Step →
              </button>
            </div>

            {/* Reset */}
            <button
              onClick={reset}
              className="w-full py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-[#F5F5F7] bg-[#12121A] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)] transition-all"
            >
              ↺ Reset
            </button>

            {/* Speed */}
            <div>
              <div className="flex justify-between text-xs text-[#A1A1AA] mb-1">
                <span>Speed <span className="text-[#71717A]">(step delay: {Math.round(1400 / speed)}ms)</span></span>
                <span className="font-mono text-[#7C3AED]">{speed}x</span>
              </div>
              <input
                type="range"
                min={0.25}
                max={3}
                step={0.25}
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #7C3AED ${((speed - 0.25) / 2.75) * 100}%, #22222F ${((speed - 0.25) / 2.75) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-[10px] text-[#71717A] mt-1">
                <span>🐢 Slow</span>
                <span>1x</span>
                <span>🚀 Fast</span>
                <span>3x</span>
              </div>
              <div className="mt-1 text-[10px] text-[#71717A]">
                Beginner tip: Keep slider left for step-by-step learning
              </div>
            </div>
          </div>
        </div>

        {/* ── CENTER: Event Loop Diagram ── */}
        <div className="flex flex-col gap-3">
          <div
            className="flex-1 rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden relative"
            style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
              <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Event Loop — Live
              </span>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full transition-colors ${isRunning ? 'bg-[#10B981] animate-pulse' : 'bg-[#6B7280]'}`}
                />
                <span className="text-xs text-[#71717A]">
                  {isRunning ? 'Running' : isPaused ? 'Paused' : isComplete ? 'Done' : 'Idle'}
                </span>
              </div>
            </div>

            <div className="p-2">
              <svg
                width="100%"
                viewBox={`0 0 ${svgW} ${svgH}`}
                className="overflow-visible"
              >
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="6"
                    markerHeight="6"
                    refX="3"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M 0 0 L 6 3 L 0 6 Z" fill="rgba(255,255,255,0.2)" />
                  </marker>
                </defs>

                {/* Connecting arrows */}
                {arrowPaths.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth={1.5}
                    markerEnd="url(#arrowhead)"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Center label */}
                <text
                  x={cx}
                  y={cy - 12}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.15)"
                  fontSize={11}
                  fontFamily="JetBrains Mono, monospace"
                >
                  Event
                </text>
                <text
                  x={cx}
                  y={cy + 6}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.15)"
                  fontSize={11}
                  fontFamily="JetBrains Mono, monospace"
                >
                  Loop
                </text>

                {/* Loop phase nodes */}
                {LOOP_PHASES.map((phase) => {
                  const pos = getCirclePosition(phase, cx, cy, radius)
                  return (
                    <PhaseNode
                      key={phase}
                      phase={phase}
                      x={pos.x}
                      y={pos.y}
                      isActive={activePhase === phase}
                      tokenColor={activePhase === phase ? currentStepData?.color : undefined}
                    />
                  )
                })}

                {/* ── Priority Queues above the loop ── */}

                {/* nextTick Queue */}
                <g>
                  <motion.rect
                    x={cx - 80}
                    y={18}
                    width={160}
                    height={32}
                    rx={6}
                    fill={activePhase === 'nextTick' ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.06)'}
                    stroke={activePhase === 'nextTick' ? '#EF4444' : 'rgba(239,68,68,0.3)'}
                    strokeWidth={activePhase === 'nextTick' ? 2 : 1}
                    transition={{ duration: 0.3 }}
                  />
                  <text x={cx} y={39} textAnchor="middle" fill="#EF4444" fontSize={10} fontFamily="JetBrains Mono, monospace" fontWeight="600">
                    nextTick Queue ⚡ HIGHEST
                  </text>
                  {activePhase === 'nextTick' && (
                    <motion.circle
                      cx={cx - 70}
                      cy={34}
                      r={6}
                      fill="#EF4444"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ filter: 'drop-shadow(0 0 6px #EF4444)' }}
                    />
                  )}
                </g>

                {/* Microtask Queue */}
                <g>
                  <motion.rect
                    x={cx - 80}
                    y={60}
                    width={160}
                    height={32}
                    rx={6}
                    fill={activePhase === 'microtask' ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.06)'}
                    stroke={activePhase === 'microtask' ? '#7C3AED' : 'rgba(124,58,237,0.3)'}
                    strokeWidth={activePhase === 'microtask' ? 2 : 1}
                    transition={{ duration: 0.3 }}
                  />
                  <text x={cx} y={81} textAnchor="middle" fill="#7C3AED" fontSize={10} fontFamily="JetBrains Mono, monospace" fontWeight="600">
                    Microtask Queue (Promises)
                  </text>
                  {activePhase === 'microtask' && (
                    <motion.circle
                      cx={cx - 70}
                      cy={76}
                      r={6}
                      fill="#7C3AED"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ filter: 'drop-shadow(0 0 6px #7C3AED)' }}
                    />
                  )}
                </g>

                {/* Call Stack indicator */}
                <g>
                  <motion.rect
                    x={svgW - 118}
                    y={18}
                    width={108}
                    height={74}
                    rx={6}
                    fill={activePhase === 'sync' ? 'rgba(245,245,247,0.08)' : 'rgba(245,245,247,0.03)'}
                    stroke={activePhase === 'sync' ? 'rgba(245,245,247,0.4)' : 'rgba(245,245,247,0.08)'}
                    strokeWidth={activePhase === 'sync' ? 2 : 1}
                    transition={{ duration: 0.3 }}
                  />
                  <text x={svgW - 64} y={48} textAnchor="middle" fill={activePhase === 'sync' ? '#F5F5F7' : '#A1A1AA'} fontSize={10} fontFamily="JetBrains Mono, monospace" fontWeight="600">
                    Call Stack
                  </text>
                  {activePhase === 'sync' && (
                    <motion.rect
                      x={svgW - 108}
                      y={56}
                      width={88}
                      height={24}
                      rx={4}
                      fill="rgba(245,245,247,0.15)"
                      stroke="rgba(245,245,247,0.3)"
                      strokeWidth={1}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    />
                  )}
                  {activePhase === 'sync' && (
                    <motion.text
                      x={svgW - 64}
                      y={73}
                      textAnchor="middle"
                      fill="#F5F5F7"
                      fontSize={9}
                      fontFamily="JetBrains Mono, monospace"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      console.log()
                    </motion.text>
                  )}
                </g>

                {/* Moving token for loop phases */}
                {currentStepData && LOOP_PHASES.includes(currentStepData.phase) && (
                  <motion.circle
                    key={`token-${currentStep}`}
                    r={8}
                    fill={currentStepData.color}
                    animate={{
                      cx: getCirclePosition(currentStepData.phase, cx, cy, radius).x,
                      cy: getCirclePosition(currentStepData.phase, cx, cy, radius).y - 32,
                    }}
                    initial={{
                      cx: cx,
                      cy: cy,
                    }}
                    transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                    style={{ filter: `drop-shadow(0 0 8px ${currentStepData.color})` }}
                  />
                )}

                {/* Step progress dots */}
                {steps.map((step, i) => (
                  <circle
                    key={i}
                    cx={20 + i * 16}
                    cy={svgH - 14}
                    r={5}
                    fill={i <= currentStep ? step.color : 'rgba(255,255,255,0.1)'}
                    style={{ filter: i <= currentStep ? `drop-shadow(0 0 4px ${step.color})` : 'none' }}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Explanation panel — always visible callout */}
          <motion.div
            className="rounded-xl border-2 px-4 py-3 min-h-[80px]"
            style={{
              background: currentStepData
                ? `${currentStepData.color}12`
                : 'rgba(26,26,38,0.8)',
              borderColor: currentStepData
                ? currentStepData.color + '66'
                : 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
            key={currentStep}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentStepData ? (
              <div className="flex items-start gap-3">
                <div
                  className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                  style={{ background: currentStepData.color, boxShadow: `0 0 10px ${currentStepData.color}` }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs font-mono text-[#A1A1AA]">
                      Phase: <span style={{ color: currentStepData.color }} className="font-bold">{PHASE_LABELS[currentStepData.phase]}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: currentStepData.color + '22', color: currentStepData.color }}>
                      Step {currentStep + 1} of {steps.length} — ~{Math.round(1400 / speed)}ms/step
                    </span>
                  </div>
                  <p className="text-sm text-[#F5F5F7] leading-relaxed font-medium">
                    {currentStepData.explanation}
                  </p>
                </div>
              </div>
            ) : isComplete ? (
              <div className="flex items-center gap-2 text-[#10B981]">
                <span className="text-lg">✓</span>
                <span className="text-sm font-semibold">Execution complete! Scenario {selectedScenario + 1} done.</span>
              </div>
            ) : (
              <div>
                <p className="text-sm text-[#71717A]">
                  Scenario select karo aur ▶ Run dabao to execution dekhne ke liye
                </p>
                <p className="text-xs text-[#4A4A5A] mt-1">
                  Beginner tip: Use &ldquo;Step →&rdquo; button to go one step at a time
                </p>
              </div>
            )}
          </motion.div>

          {/* Legend */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] px-4 py-3"
            style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
          >
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {(
                [
                  ['sync', 'Sync'],
                  ['nextTick', 'nextTick'],
                  ['microtask', 'Microtask'],
                  ['timers', 'Timers'],
                  ['poll', 'I/O Poll'],
                  ['check', 'setImmediate'],
                ] as [Phase, string][]
              ).map(([phase, label]) => (
                <div key={phase} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: PHASE_COLORS[phase] }}
                  />
                  <span className="text-[10px] font-mono text-[#A1A1AA]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Output Panel ── */}
        <div className="flex flex-col">
          <div
            className="flex-1 rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden flex flex-col"
            style={{ background: 'rgba(18,18,26,0.9)', backdropFilter: 'blur(12px)' }}
          >
            {/* Output header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                  Console
                </span>
                {outputLines.length > 0 && (
                  <span className="text-[10px] font-mono bg-[#22222F] text-[#71717A] rounded px-1.5 py-0.5">
                    {outputLines.length}
                  </span>
                )}
              </div>
              {outputLines.length > 0 && (
                <button
                  onClick={() => setOutputLines([])}
                  className="text-[10px] text-[#71717A] hover:text-[#A1A1AA] transition-colors"
                >
                  clear
                </button>
              )}
            </div>

            {/* Output lines */}
            <div ref={outputRef} className="flex-1 overflow-y-auto p-3 space-y-1 font-mono">
              <AnimatePresence initial={false}>
                {outputLines.length === 0 ? (
                  <div className="text-[#71717A] text-xs py-4 text-center">
                    Output yahan aayega...
                  </div>
                ) : (
                  outputLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-2 text-xs py-1 border-b border-[rgba(255,255,255,0.04)] last:border-0"
                    >
                      <span className="text-[#71717A] text-[10px] shrink-0 tabular-nums mt-0.5">
                        {line.timestamp}ms
                      </span>
                      <span className="text-[#71717A] shrink-0">›</span>
                      <span style={{ color: line.color }} className="font-semibold break-all">
                        {line.text}
                      </span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Output footer with phase labels */}
            {outputLines.length > 0 && (
              <div className="border-t border-[rgba(255,255,255,0.06)] px-3 py-2">
                <div className="flex flex-wrap gap-1">
                  {outputLines.map((line, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                      style={{
                        background: line.color + '18',
                        color: line.color,
                        border: `1px solid ${line.color}44`,
                      }}
                    >
                      {PHASE_LABELS[line.phase]}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Priority guide */}
          <div
            className="mt-3 rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
            style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
          >
            <p className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider mb-2">
              Priority Order
            </p>
            <div className="space-y-1">
              {[
                { label: '1. Sync', color: '#F5F5F7', note: 'Call Stack' },
                { label: '2. nextTick', color: '#EF4444', note: 'Highest' },
                { label: '3. Microtasks', color: '#7C3AED', note: 'Promises' },
                { label: '4. Macrotasks', color: '#06B6D4', note: 'setTimeout' },
                { label: '5. setImmediate', color: '#10B981', note: 'Check' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: item.color }}
                  />
                  <span className="text-[11px] font-mono" style={{ color: item.color }}>
                    {item.label}
                  </span>
                  <span className="text-[10px] text-[#71717A]">{item.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
