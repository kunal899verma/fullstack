'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ComponentNode {
  id: string
  name: string
  depth: number
  hasMemo: boolean
  receivesCountProp: boolean
  isContextConsumer: boolean
  description: string
}

interface RenderEvent {
  componentId: string
  type: 'rerender' | 'skip' | 'wasted'
  reason: string
  timestamp: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COMPONENTS: ComponentNode[] = [
  {
    id: 'app',
    name: 'App',
    depth: 0,
    hasMemo: false,
    receivesCountProp: false,
    isContextConsumer: false,
    description: 'Root component — no props from parent',
  },
  {
    id: 'parent',
    name: 'Parent',
    depth: 1,
    hasMemo: false,
    receivesCountProp: false,
    isContextConsumer: false,
    description: 'Has state: count. Re-renders when count changes.',
  },
  {
    id: 'child1',
    name: 'Child1',
    depth: 2,
    hasMemo: false,
    receivesCountProp: true,
    isContextConsumer: false,
    description: 'Receives count as prop — re-renders when prop changes.',
  },
  {
    id: 'child2',
    name: 'Child2',
    depth: 2,
    hasMemo: false,
    receivesCountProp: false,
    isContextConsumer: false,
    description: 'No props from parent — still re-renders! (wasted)',
  },
  {
    id: 'child3',
    name: 'Child3',
    depth: 2,
    hasMemo: true,
    receivesCountProp: false,
    isContextConsumer: false,
    description: 'Wrapped in React.memo — skips re-render!',
  },
  {
    id: 'contextConsumer',
    name: 'ContextConsumer',
    depth: 2,
    hasMemo: false,
    receivesCountProp: false,
    isContextConsumer: true,
    description: 'useContext(ThemeCtx) — re-renders on context change.',
  },
]

const DEPTH_INDENT = 24

// ─── Utility ──────────────────────────────────────────────────────────────────

function getRenderStatus(
  comp: ComponentNode,
  rerenderSet: Set<string>,
  skipSet: Set<string>,
  wastedSet: Set<string>
): 'rerender' | 'skip' | 'wasted' | 'idle' {
  if (skipSet.has(comp.id)) return 'skip'
  if (wastedSet.has(comp.id)) return 'wasted'
  if (rerenderSet.has(comp.id)) return 'rerender'
  return 'idle'
}

const STATUS_COLORS = {
  rerender: '#06B6D4',
  skip: '#10B981',
  wasted: '#F59E0B',
  idle: 'rgba(255,255,255,0.06)',
}

const STATUS_BORDER = {
  rerender: 'rgba(6,182,212,0.6)',
  skip: 'rgba(16,185,129,0.6)',
  wasted: 'rgba(245,158,11,0.6)',
  idle: 'rgba(255,255,255,0.1)',
}

const STATUS_LABEL = {
  rerender: 'Re-rendering',
  skip: 'Skipped (memo)',
  wasted: 'Wasted render',
  idle: 'Stable',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ComponentBoxProps {
  comp: ComponentNode
  status: 'rerender' | 'skip' | 'wasted' | 'idle'
  renderCount: number
  memoEnabled: boolean
  showContext: boolean
}

function ComponentBox({ comp, status, renderCount, memoEnabled, showContext }: ComponentBoxProps) {
  if (comp.id === 'contextConsumer' && !showContext) return null

  const color = STATUS_COLORS[status]
  const border = STATUS_BORDER[status]

  return (
    <motion.div
      layout
      className="relative"
      style={{ marginLeft: comp.depth * DEPTH_INDENT }}
    >
      {/* Connector line */}
      {comp.depth > 0 && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-px"
          style={{ left: -DEPTH_INDENT / 2, background: 'rgba(255,255,255,0.12)' }}
        />
      )}

      <motion.div
        key={`${comp.id}-${status}`}
        className="rounded-xl border-2 px-4 py-3 mb-2 relative overflow-hidden"
        style={{
          background: status !== 'idle' ? `${color}10` : 'rgba(26,26,38,0.8)',
          borderColor: border,
          backdropFilter: 'blur(8px)',
        }}
        animate={
          status === 'rerender' || status === 'wasted'
            ? {
                borderColor: [border, color, border],
                boxShadow: [`0 0 0px ${color}00`, `0 0 18px ${color}60`, `0 0 0px ${color}00`],
              }
            : {}
        }
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            {/* memo badge */}
            {comp.hasMemo && memoEnabled && (
              <span
                className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                style={{ background: 'rgba(16,185,129,0.2)', color: '#10B981', border: '1px solid rgba(16,185,129,0.4)' }}
              >
                memo
              </span>
            )}
            <span className="font-mono font-bold text-sm text-[#F5F5F7] truncate">{comp.name}</span>
            {comp.receivesCountProp && (
              <span
                className="text-[9px] font-mono px-1.5 py-0.5 rounded flex-shrink-0"
                style={{ background: 'rgba(6,182,212,0.15)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.3)' }}
              >
                props.count
              </span>
            )}
            {comp.isContextConsumer && (
              <span
                className="text-[9px] font-mono px-1.5 py-0.5 rounded flex-shrink-0"
                style={{ background: 'rgba(124,58,237,0.15)', color: '#7C3AED', border: '1px solid rgba(124,58,237,0.3)' }}
              >
                useContext
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Status pill */}
            {status !== 'idle' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${color}20`, color, border: `1px solid ${color}50` }}
              >
                {STATUS_LABEL[status]}
              </motion.span>
            )}
            {/* Render counter */}
            <motion.div
              key={renderCount}
              initial={{ scale: 1.5, color: '#FFFFFF' }}
              animate={{ scale: 1, color: '#A1A1AA' }}
              className="text-xs font-mono font-bold rounded px-2 py-0.5"
              style={{ background: 'rgba(255,255,255,0.06)', minWidth: 28, textAlign: 'center' }}
            >
              {renderCount}
            </motion.div>
          </div>
        </div>

        <p className="text-[10px] text-[#71717A] mt-1 leading-relaxed">{comp.description}</p>

        {/* Flash overlay */}
        <AnimatePresence>
          {(status === 'rerender' || status === 'wasted') && (
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{ background: `${color}15` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, repeat: 2 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ReactRerenderVisualizer() {
  const [memoEnabled, setMemoEnabled] = useState(false)
  const [showContext, setShowContext] = useState(false)
  const [renderCounts, setRenderCounts] = useState<Record<string, number>>({
    app: 0, parent: 0, child1: 0, child2: 0, child3: 0, contextConsumer: 0,
  })
  const [activeRenders, setActiveRenders] = useState<Set<string>>(new Set())
  const [activeSkips, setActiveSkips] = useState<Set<string>>(new Set())
  const [activeWasted, setActiveWasted] = useState<Set<string>>(new Set())
  const [events, setEvents] = useState<RenderEvent[]>([])
  const [lastAction, setLastAction] = useState<string>('')
  const [count, setCount] = useState(0)

  const clearActive = useCallback(() => {
    setTimeout(() => {
      setActiveRenders(new Set())
      setActiveSkips(new Set())
      setActiveWasted(new Set())
    }, 1200)
  }, [])

  const addEvent = useCallback((events_: RenderEvent[]) => {
    setEvents((prev) => [...prev.slice(-20), ...events_])
  }, [])

  const triggerIncrementState = useCallback(() => {
    setCount((c) => c + 1)
    setLastAction('Increment Count (state change in Parent)')

    // Parent always re-renders
    // Child1 re-renders (prop changes)
    // Child2 re-renders (parent re-rendered, no memo)
    // Child3: skips if memo on, wasted if memo off
    const rerenders = new Set(['parent', 'child1', 'child2'])
    const skips = new Set<string>()
    const wasted = new Set<string>()

    if (memoEnabled) {
      skips.add('child3')
    } else {
      wasted.add('child3')
    }

    if (showContext) {
      rerenders.add('contextConsumer')
    }

    setActiveRenders(rerenders)
    setActiveSkips(skips)
    setActiveWasted(wasted)

    setRenderCounts((prev) => {
      const next = { ...prev }
      rerenders.forEach((id) => { next[id] = (next[id] ?? 0) + 1 })
      return next
    })

    const now = Date.now()
    const newEvents: RenderEvent[] = [
      { componentId: 'parent', type: 'rerender', reason: 'Own state changed (count++)', timestamp: now },
      { componentId: 'child1', type: 'rerender', reason: 'Received new prop (count changed)', timestamp: now + 1 },
      { componentId: 'child2', type: 'wasted', reason: 'Parent re-rendered — no props changed!', timestamp: now + 2 },
    ]
    if (memoEnabled) {
      newEvents.push({ componentId: 'child3', type: 'skip', reason: 'React.memo: props unchanged → skip!', timestamp: now + 3 })
    } else {
      newEvents.push({ componentId: 'child3', type: 'wasted', reason: 'Parent re-rendered, no memo protection', timestamp: now + 3 })
    }
    addEvent(newEvents)
    clearActive()
  }, [memoEnabled, showContext, addEvent, clearActive])

  const triggerUnrelatedState = useCallback(() => {
    setLastAction('Change Unrelated State (in Parent)')

    const rerenders = new Set(['parent', 'child2'])
    const wasted = new Set<string>()
    const skips = new Set<string>()

    // child1 still re-renders because parent did
    rerenders.add('child1')

    if (memoEnabled) {
      skips.add('child3')
    } else {
      wasted.add('child3')
    }

    if (showContext) {
      rerenders.add('contextConsumer')
    }

    setActiveRenders(rerenders)
    setActiveSkips(skips)
    setActiveWasted(wasted)

    setRenderCounts((prev) => {
      const next = { ...prev }
      rerenders.forEach((id) => { next[id] = (next[id] ?? 0) + 1 })
      return next
    })

    const now = Date.now()
    const newEvents: RenderEvent[] = [
      { componentId: 'parent', type: 'rerender', reason: 'Unrelated state changed in Parent', timestamp: now },
      { componentId: 'child1', type: 'wasted', reason: 'Parent re-rendered — count prop did NOT change!', timestamp: now + 1 },
      { componentId: 'child2', type: 'wasted', reason: 'Parent re-rendered — still no protection', timestamp: now + 2 },
    ]
    if (memoEnabled) {
      newEvents.push({ componentId: 'child3', type: 'skip', reason: 'React.memo saved it!', timestamp: now + 3 })
    } else {
      newEvents.push({ componentId: 'child3', type: 'wasted', reason: 'Wasted again — needs React.memo', timestamp: now + 3 })
    }
    addEvent(newEvents)
    clearActive()
  }, [memoEnabled, showContext, addEvent, clearActive])

  const triggerContextChange = useCallback(() => {
    setLastAction('Context Value Changed')
    const rerenders = new Set<string>()
    rerenders.add('contextConsumer')

    setActiveRenders(rerenders)
    setActiveSkips(new Set())
    setActiveWasted(new Set())
    setRenderCounts((prev) => ({
      ...prev,
      contextConsumer: (prev.contextConsumer ?? 0) + 1,
    }))
    addEvent([{
      componentId: 'contextConsumer',
      type: 'rerender',
      reason: 'Context value changed — all consumers re-render!',
      timestamp: Date.now(),
    }])
    clearActive()
  }, [addEvent, clearActive])

  const reset = useCallback(() => {
    setCount(0)
    setRenderCounts({ app: 0, parent: 0, child1: 0, child2: 0, child3: 0, contextConsumer: 0 })
    setActiveRenders(new Set())
    setActiveSkips(new Set())
    setActiveWasted(new Set())
    setEvents([])
    setLastAction('')
  }, [])

  const totalWasted = events.filter((e) => e.type === 'wasted').length
  const totalSkipped = events.filter((e) => e.type === 'skip').length

  return (
    <div className="w-full text-[#F5F5F7]">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-4 min-h-[600px]">

        {/* ── LEFT: Component Tree ── */}
        <div className="flex flex-col gap-4">
          {/* Controls */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 flex flex-col gap-3"
            style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={triggerIncrementState}
                className="flex-1 min-w-[140px] py-2 px-3 rounded-lg text-sm font-semibold transition-all"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
              >
                ++ Increment Count
              </button>
              <button
                onClick={triggerUnrelatedState}
                className="flex-1 min-w-[140px] py-2 px-3 rounded-lg text-sm font-semibold border transition-all"
                style={{ background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.4)', color: '#F59E0B' }}
              >
                Change Unrelated State
              </button>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Toggle Memo */}
              <button
                onClick={() => setMemoEnabled((v) => !v)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all"
                style={
                  memoEnabled
                    ? { background: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.5)', color: '#10B981' }
                    : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.12)', color: '#A1A1AA' }
                }
              >
                <span className={`w-2 h-2 rounded-full ${memoEnabled ? 'bg-[#10B981]' : 'bg-[#71717A]'}`} />
                React.memo {memoEnabled ? 'ON' : 'OFF'}
              </button>

              {/* Toggle Context */}
              <button
                onClick={() => setShowContext((v) => !v)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all"
                style={
                  showContext
                    ? { background: 'rgba(124,58,237,0.15)', borderColor: 'rgba(124,58,237,0.5)', color: '#7C3AED' }
                    : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.12)', color: '#A1A1AA' }
                }
              >
                <span className={`w-2 h-2 rounded-full ${showContext ? 'bg-[#7C3AED]' : 'bg-[#71717A]'}`} />
                Context {showContext ? 'ON' : 'OFF'}
              </button>

              {showContext && (
                <button
                  onClick={triggerContextChange}
                  className="py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all"
                  style={{ background: 'rgba(124,58,237,0.1)', borderColor: 'rgba(124,58,237,0.4)', color: '#7C3AED' }}
                >
                  Change Context
                </button>
              )}

              <button
                onClick={reset}
                className="ml-auto py-1.5 px-3 rounded-lg text-xs text-[#A1A1AA] border border-[rgba(255,255,255,0.1)] hover:text-[#F5F5F7] transition-all"
              >
                ↺ Reset
              </button>
            </div>

            {lastAction && (
              <div
                className="rounded-lg px-3 py-2 text-xs font-mono"
                style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', color: '#06B6D4' }}
              >
                Last: {lastAction} | count = {count}
              </div>
            )}
          </div>

          {/* Component Tree */}
          <div
            className="flex-1 rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
            style={{ background: 'rgba(18,18,26,0.9)', backdropFilter: 'blur(12px)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">Component Tree</span>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#06B6D4]" />
                  <span className="text-[10px] text-[#A1A1AA]">renders</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <span className="text-[10px] text-[#A1A1AA]">wasted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="text-[10px] text-[#A1A1AA]">skipped</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              {COMPONENTS.map((comp) => {
                const status = getRenderStatus(comp, activeRenders, activeSkips, activeWasted)
                return (
                  <ComponentBox
                    key={comp.id}
                    comp={comp}
                    status={status}
                    renderCount={renderCounts[comp.id] ?? 0}
                    memoEnabled={memoEnabled}
                    showContext={showContext}
                  />
                )
              })}
            </div>

            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)] grid grid-cols-3 gap-3">
              {[
                { label: 'Total Renders', value: Object.values(renderCounts).reduce((a, b) => a + b, 0), color: '#06B6D4' },
                { label: 'Wasted', value: totalWasted, color: '#F59E0B' },
                { label: 'Skipped (memo)', value: totalSkipped, color: '#10B981' },
              ].map((stat) => (
                <div key={stat.label} className="text-center rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="text-lg font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-[9px] text-[#71717A] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Event Log + Explanation ── */}
        <div className="flex flex-col gap-4">
          {/* Insight callout */}
          <AnimatePresence mode="wait">
            {events.length > 0 && (
              <motion.div
                key={events[events.length - 1]?.componentId + events.length}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border-2 p-4"
                style={{
                  background: 'rgba(245,158,11,0.08)',
                  borderColor: 'rgba(245,158,11,0.4)',
                }}
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <div>
                    <p className="text-sm font-semibold text-[#F59E0B]">Child2 re-rendered even though its props didn&apos;t change!</p>
                    <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                      Jab Parent re-render hota hai, uske saare children bhi re-render hote hain —
                      chahe unke props change hue ho ya nahi. React.memo is chain ko rok sakta hai.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Event Log */}
          <div
            className="flex-1 rounded-xl border border-[rgba(255,255,255,0.08)] flex flex-col overflow-hidden"
            style={{ background: 'rgba(18,18,26,0.9)', backdropFilter: 'blur(12px)' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">Render Log</span>
              {events.length > 0 && (
                <button onClick={() => setEvents([])} className="text-[10px] text-[#71717A] hover:text-[#A1A1AA]">
                  clear
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
              <AnimatePresence initial={false}>
                {events.length === 0 ? (
                  <p className="text-xs text-[#71717A] text-center py-8">
                    Koi bhi button dabao — renders yahan track honge
                  </p>
                ) : (
                  events.map((ev, i) => {
                    const color = ev.type === 'rerender' ? '#06B6D4' : ev.type === 'skip' ? '#10B981' : '#F59E0B'
                    const icon = ev.type === 'rerender' ? '↻' : ev.type === 'skip' ? '✓' : '⚠'
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-2 text-xs py-1.5 px-2 rounded-lg"
                        style={{ background: `${color}08`, border: `1px solid ${color}20` }}
                      >
                        <span style={{ color }} className="flex-shrink-0 font-bold">{icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className="font-mono font-semibold" style={{ color }}>{ev.componentId}</span>
                          <span className="text-[#71717A] ml-2">{ev.reason}</span>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Code snippet */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
            style={{ background: 'rgba(18,18,26,0.95)' }}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[rgba(255,255,255,0.06)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs text-[#71717A] font-mono">
                {memoEnabled ? 'with-memo.tsx' : 'without-memo.tsx'}
              </span>
            </div>
            <pre className="text-[11px] font-mono p-4 overflow-x-auto leading-6">
              {memoEnabled ? (
                <>
                  <span style={{ color: '#A1A1AA' }}>{'// Child3 wrapped — no wasted renders\n'}</span>
                  <span style={{ color: '#06B6D4' }}>{'const '}</span>
                  <span style={{ color: '#F5F5F7' }}>{'Child3 = '}</span>
                  <span style={{ color: '#10B981' }}>{'React.memo'}</span>
                  <span style={{ color: '#F5F5F7' }}>{'(function Child3() {\n'}</span>
                  <span style={{ color: '#F5F5F7' }}>{'  return <div>Stable!</div>\n'}</span>
                  <span style={{ color: '#F5F5F7' }}>{'});\n'}</span>
                  <span style={{ color: '#A1A1AA' }}>{'// Props unchanged → React skips render ✓'}</span>
                </>
              ) : (
                <>
                  <span style={{ color: '#A1A1AA' }}>{'// No memo — re-renders with parent\n'}</span>
                  <span style={{ color: '#06B6D4' }}>{'function '}</span>
                  <span style={{ color: '#F5F5F7' }}>{'Child3() {\n'}</span>
                  <span style={{ color: '#F5F5F7' }}>{'  return <div>Will re-render!</div>\n'}</span>
                  <span style={{ color: '#F5F5F7' }}>{'}\n'}</span>
                  <span style={{ color: '#F59E0B' }}>{'// ⚠ Wasted render every time'}</span>
                </>
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
