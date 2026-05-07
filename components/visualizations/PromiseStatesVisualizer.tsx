'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ─────────────────────────────────────────────────────────────────────

type PromiseState = 'pending' | 'fulfilled' | 'rejected'
type Scenario = 'simple' | 'catch' | 'all' | 'async-await'

interface ChainStep {
  type: '.then()' | '.catch()' | '.finally()'
  active: boolean
  skipped: boolean
  value: string
}

interface PromiseItem {
  id: number
  label: string
  state: PromiseState
  delay: number
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const SCENARIOS: { id: Scenario; label: string; emoji: string; desc: string }[] = [
  { id: 'simple', label: 'Simple Resolve', emoji: '✅', desc: 'Basic resolve aur .then() chain' },
  { id: 'catch', label: 'Rejected + Catch', emoji: '❌', desc: '.then() skip, .catch() trigger' },
  { id: 'all', label: 'Promise.all', emoji: '⚡', desc: '3 promises ek saath run karo' },
  { id: 'async-await', label: 'Async/Await', emoji: '🔄', desc: 'Same promise, different syntax' },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function StateBadge({ state }: { state: PromiseState }) {
  const config = {
    pending: {
      bg: 'rgba(113,113,122,0.15)',
      border: 'rgba(113,113,122,0.35)',
      color: '#A1A1AA',
      glow: 'none',
      icon: '⏳',
      label: 'PENDING',
    },
    fulfilled: {
      bg: 'rgba(16,185,129,0.15)',
      border: 'rgba(16,185,129,0.5)',
      color: '#10B981',
      glow: '0 0 32px rgba(16,185,129,0.35)',
      icon: '✅',
      label: 'FULFILLED',
    },
    rejected: {
      bg: 'rgba(239,68,68,0.15)',
      border: 'rgba(239,68,68,0.5)',
      color: '#EF4444',
      glow: '0 0 32px rgba(239,68,68,0.35)',
      icon: '❌',
      label: 'REJECTED',
    },
  }[state]

  return (
    <motion.div
      key={state}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="flex flex-col items-center justify-center w-44 h-44 rounded-full border-2 relative"
      style={{
        background: config.bg,
        borderColor: config.border,
        boxShadow: config.glow,
      }}
    >
      {/* Spinning ring for pending */}
      {state === 'pending' && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{ borderTopColor: '#71717A' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}
      <span className="text-4xl mb-1">{config.icon}</span>
      <span className="text-xs font-mono font-bold tracking-widest" style={{ color: config.color }}>
        {config.label}
      </span>
    </motion.div>
  )
}

function ChainViz({ steps, state: _state }: { steps: ChainStep[]; state: PromiseState }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      {steps.map((step, i) => {
        const color =
          step.type === '.then()' ? '#10B981'
          : step.type === '.catch()' ? '#EF4444'
          : '#F59E0B'

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0.3, x: 10 }}
            animate={{
              opacity: step.skipped ? 0.25 : step.active ? 1 : 0.45,
              x: 0,
              scale: step.active ? 1.03 : 1,
            }}
            transition={{ delay: i * 0.12, duration: 0.35 }}
            className="rounded-xl px-4 py-2.5 border relative"
            style={{
              background: step.active
                ? `${color}15`
                : step.skipped
                ? 'rgba(255,255,255,0.02)'
                : 'rgba(255,255,255,0.04)',
              borderColor: step.active ? `${color}50` : 'rgba(255,255,255,0.08)',
              boxShadow: step.active ? `0 0 16px ${color}25` : 'none',
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-mono font-bold"
                style={{ color: step.skipped ? '#52525B' : step.active ? color : '#71717A' }}
              >
                {step.type}
              </span>
              {step.skipped && (
                <span className="text-[10px] text-[#52525B] font-mono">skipped</span>
              )}
              {step.active && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-[10px] font-mono font-bold"
                  style={{ color }}
                >
                  ← running
                </motion.span>
              )}
            </div>
            {step.active && (
              <p className="text-[10px] text-[#A1A1AA] mt-1 font-mono">{step.value}</p>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

function PromiseBall({ item }: { item: PromiseItem }) {
  const colors = {
    pending: { bg: 'rgba(113,113,122,0.2)', border: '#71717A', text: '#A1A1AA' },
    fulfilled: { bg: 'rgba(16,185,129,0.15)', border: '#10B981', text: '#10B981' },
    rejected: { bg: 'rgba(239,68,68,0.15)', border: '#EF4444', text: '#EF4444' },
  }[item.state]

  return (
    <motion.div
      layout
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        animate={{
          boxShadow:
            item.state === 'fulfilled'
              ? '0 0 20px rgba(16,185,129,0.4)'
              : item.state === 'rejected'
              ? '0 0 20px rgba(239,68,68,0.4)'
              : 'none',
        }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-xl relative"
        style={{ background: colors.bg, borderColor: colors.border }}
      >
        {item.state === 'pending' && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{ borderTopColor: '#71717A' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
        )}
        <span>
          {item.state === 'pending' ? '⏳' : item.state === 'fulfilled' ? '✅' : '❌'}
        </span>
      </motion.div>
      <div className="text-center">
        <p className="text-xs font-mono text-[#A1A1AA]">{item.label}</p>
        <p className="text-[10px] font-mono font-bold" style={{ color: colors.text }}>
          {item.state.toUpperCase()}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PromiseStatesVisualizer() {
  const [scenario, setScenario] = useState<Scenario>('simple')
  const [state, setState] = useState<PromiseState>('pending')
  const [chainSteps, setChainSteps] = useState<ChainStep[]>([])
  const [allPromises, setAllPromises] = useState<PromiseItem[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [step, setStep] = useState(0)
  const [_finallyActive, setFinallyActive] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Build chain config per scenario
  const getChainConfig = (sc: Scenario, st: PromiseState, stepN: number): ChainStep[] => {
    if (sc === 'simple' || sc === 'async-await') {
      return [
        { type: '.then()', active: st === 'fulfilled' && stepN >= 1, skipped: st === 'rejected', value: 'data => console.log(data)' },
        { type: '.then()', active: st === 'fulfilled' && stepN >= 2, skipped: st === 'rejected', value: 'data => transform(data)' },
        { type: '.catch()', active: st === 'rejected' && stepN >= 1, skipped: st === 'fulfilled', value: 'err => handleError(err)' },
        { type: '.finally()', active: stepN >= 3, skipped: false, value: '() => cleanup()' },
      ]
    }
    if (sc === 'catch') {
      return [
        { type: '.then()', active: false, skipped: true, value: 'skipped — promise rejected' },
        { type: '.catch()', active: st === 'rejected' && stepN >= 1, skipped: false, value: 'err => { console.log(err) }' },
        { type: '.then()', active: st === 'rejected' && stepN >= 2, skipped: false, value: 'recovered => doNext()' },
        { type: '.finally()', active: stepN >= 3, skipped: false, value: '() => setLoading(false)' },
      ]
    }
    return []
  }

  const resetAll = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setState('pending')
    setStep(0)
    setChainSteps([])
    setIsAnimating(false)
    setFinallyActive(false)
    if (scenario === 'all') {
      setAllPromises([
        { id: 1, label: 'fetchUser()', state: 'pending', delay: 800 },
        { id: 2, label: 'fetchPosts()', state: 'pending', delay: 1400 },
        { id: 3, label: 'fetchComments()', state: 'pending', delay: 1100 },
      ])
    }
  }

  useEffect(() => {
    resetAll()
  }, [scenario])

  const runSimple = (resolveState: 'fulfilled' | 'rejected') => {
    if (isAnimating) return
    setIsAnimating(true)
    setState('pending')
    setStep(0)
    setChainSteps(getChainConfig(scenario, 'pending', 0))

    timerRef.current = setTimeout(() => {
      setState(resolveState)
      setStep(1)
      setChainSteps(getChainConfig(scenario, resolveState, 1))

      timerRef.current = setTimeout(() => {
        setStep(2)
        setChainSteps(getChainConfig(scenario, resolveState, 2))

        timerRef.current = setTimeout(() => {
          setStep(3)
          setChainSteps(getChainConfig(scenario, resolveState, 3))
          setFinallyActive(true)
          setIsAnimating(false)
        }, 900)
      }, 900)
    }, 900)
  }

  const runPromiseAll = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setAllPromises([
      { id: 1, label: 'fetchUser()', state: 'pending', delay: 800 },
      { id: 2, label: 'fetchPosts()', state: 'pending', delay: 1400 },
      { id: 3, label: 'fetchComments()', state: 'pending', delay: 1100 },
    ])
    setState('pending')

    const delays = [800, 1100, 1400]
    delays.forEach((delay, i) => {
      timerRef.current = setTimeout(() => {
        setAllPromises(prev =>
          prev.map(p => (p.id === i + 1 ? { ...p, state: 'fulfilled' } : p))
        )
        if (i === 2) {
          setTimeout(() => {
            setState('fulfilled')
            setIsAnimating(false)
          }, 400)
        }
      }, delay)
    })
  }

  const handleResolve = () => runSimple('fulfilled')
  const handleReject = () => runSimple('rejected')

  const handleRun = () => {
    if (scenario === 'all') runPromiseAll()
    else handleResolve()
  }

  const allSettled = allPromises.length > 0 && allPromises.every(p => p.state !== 'pending')

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: '#0D0D14', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      {/* Header */}
      <div
        className="px-5 py-3 border-b flex items-center justify-between flex-wrap gap-3"
        style={{ background: '#12121A', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-mono text-[#A1A1AA]">Promise States Machine</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map(s => (
            <button
              key={s.id}
              onClick={() => setScenario(s.id)}
              className="text-[10px] font-mono px-2.5 py-1 rounded-lg transition-all"
              style={{
                background: scenario === s.id ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
                color: scenario === s.id ? '#10B981' : '#71717A',
                border: scenario === s.id ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="p-5 md:p-7">

        {/* Scenario description */}
        <div className="mb-6 text-center">
          <p className="text-xs text-[#71717A] font-mono">
            {SCENARIOS.find(s => s.id === scenario)?.desc}
          </p>
        </div>

        {/* ── Promise.all scenario ── */}
        {scenario === 'all' ? (
          <div className="space-y-6">
            {/* 3 Balls row */}
            <div className="flex justify-center gap-8 md:gap-12 flex-wrap">
              {allPromises.map(p => (
                <PromiseBall key={p.id} item={p} />
              ))}
            </div>

            {/* Arrow + final state */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3 text-xs font-mono text-[#52525B]">
                <div className="h-px w-16 bg-[#52525B]" />
                Promise.all([...])
                <div className="h-px w-16 bg-[#52525B]" />
              </div>
              <AnimatePresence>
                {allSettled && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 px-5 py-3 rounded-xl border"
                    style={{
                      background: 'rgba(16,185,129,0.12)',
                      borderColor: 'rgba(16,185,129,0.4)',
                      boxShadow: '0 0 24px rgba(16,185,129,0.2)',
                    }}
                  >
                    <span className="text-xl">✅</span>
                    <div>
                      <p className="text-sm font-bold text-[#10B981]">Promise.all FULFILLED!</p>
                      <p className="text-[10px] text-[#A1A1AA] font-mono">
                        [userData, postsData, commentsData] — sab ek saath resolve!
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Info box */}
            <div
              className="rounded-xl p-4 text-xs text-[#A1A1AA] font-mono leading-relaxed"
              style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}
            >
              <span className="text-[#10B981] font-bold">Promise.all rule: </span>
              Ek bhi reject hua toh poora Promise.all reject. Sab fulfill ho toh array return.
            </div>
          </div>
        ) : scenario === 'async-await' ? (
          /* ── Async/Await scenario ── */
          <div className="space-y-5">
            {/* Side by side */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Promise chain */}
              <div
                className="rounded-xl p-4 border"
                style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.2)' }}
              >
                <p className="text-xs font-mono font-bold text-[#7C3AED] mb-3">Promise Chain</p>
                <pre
                  className="text-[10px] font-mono text-[#A1A1AA] leading-relaxed"
                >{`fetchData()
  .then(data => process(data))
  .then(result => save(result))
  .catch(err => handleError(err))
  .finally(() => setLoading(false))`}</pre>
              </div>

              {/* Async/Await */}
              <div
                className="rounded-xl p-4 border"
                style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.2)' }}
              >
                <p className="text-xs font-mono font-bold text-[#10B981] mb-3">Async / Await (same thing!)</p>
                <pre
                  className="text-[10px] font-mono text-[#A1A1AA] leading-relaxed"
                >{`async function main() {
  try {
    const data = await fetchData()
    const result = await process(data)
    await save(result)
  } catch(err) {
    handleError(err)
  } finally {
    setLoading(false)
  }
}`}</pre>
              </div>
            </div>

            {/* State machine */}
            <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
              <StateBadge state={state} />
              <div className="flex-1 max-w-xs">
                <ChainViz steps={getChainConfig('async-await', state, step)} state={state} />
              </div>
            </div>
          </div>
        ) : (
          /* ── Simple / Catch scenario ── */
          <div className="flex flex-col md:flex-row items-center gap-6 justify-center min-h-[200px]">
            {/* State circle */}
            <div className="flex flex-col items-center gap-3">
              <StateBadge state={state} />
              <AnimatePresence>
                {state !== 'pending' && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-mono text-center"
                    style={{ color: state === 'fulfilled' ? '#10B981' : '#EF4444' }}
                  >
                    {state === 'fulfilled'
                      ? 'Value: { userId: 1, data: "ok" }'
                      : 'Reason: NetworkError: 404'}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ opacity: state !== 'pending' ? 1 : 0.3 }}
                className="text-[#52525B] text-2xl hidden md:block"
              >
                →
              </motion.div>
            </div>

            {/* Chain */}
            <div className="flex-1 max-w-xs w-full">
              <p className="text-[10px] font-mono text-[#71717A] mb-2 uppercase tracking-wider">
                Chain execution
              </p>
              <ChainViz
                steps={chainSteps.length ? chainSteps : getChainConfig(scenario, 'pending', 0)}
                state={state}
              />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap gap-3 justify-center mt-7 pt-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {scenario !== 'all' && scenario !== 'async-await' && (
            <>
              <button
                onClick={handleResolve}
                disabled={isAnimating}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all disabled:opacity-40"
                style={{
                  background: 'rgba(16,185,129,0.15)',
                  color: '#10B981',
                  border: '1px solid rgba(16,185,129,0.35)',
                }}
              >
                ✅ Resolve(value)
              </button>
              <button
                onClick={handleReject}
                disabled={isAnimating}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all disabled:opacity-40"
                style={{
                  background: 'rgba(239,68,68,0.12)',
                  color: '#EF4444',
                  border: '1px solid rgba(239,68,68,0.3)',
                }}
              >
                ❌ Reject(error)
              </button>
            </>
          )}
          {(scenario === 'all' || scenario === 'async-await') && (
            <button
              onClick={handleRun}
              disabled={isAnimating}
              className="px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all disabled:opacity-40"
              style={{
                background: 'rgba(16,185,129,0.15)',
                color: '#10B981',
                border: '1px solid rgba(16,185,129,0.35)',
              }}
            >
              ▶ Run Demo
            </button>
          )}
          <button
            onClick={resetAll}
            disabled={isAnimating}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all disabled:opacity-40"
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: '#71717A',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            🔄 Reset / New Promise
          </button>
        </div>

        {/* Rule reminder */}
        <div
          className="mt-5 rounded-xl px-4 py-3 text-center"
          style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)' }}
        >
          <p className="text-[11px] font-mono text-[#A1A1AA]">
            <span className="text-[#7C3AED] font-bold">Key rule: </span>
            Promise ek baar settle (fulfilled ya rejected) ho jaaye toh kabhi change nahi hoti.
          </p>
        </div>
      </div>
    </div>
  )
}
