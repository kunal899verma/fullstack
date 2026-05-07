'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

type EffectMode = 'no-deps' | 'empty-deps' | 'with-deps'

type TimelineEventType =
  | 'render'
  | 'paint'
  | 'effect'
  | 'cleanup'
  | 'mount'
  | 'unmount'

interface TimelineEvent {
  id: number
  type: TimelineEventType
  mode: EffectMode | 'lifecycle'
  label: string
  explanation: string
  timestamp: number
  renderNum: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MODE_COLOR: Record<EffectMode, string> = {
  'no-deps': '#EF4444',
  'empty-deps': '#10B981',
  'with-deps': '#06B6D4',
}

const MODE_LABEL: Record<EffectMode, string> = {
  'no-deps': 'No deps — runs every render',
  'empty-deps': 'Empty [] — runs once on mount',
  'with-deps': 'With [count] — runs when count changes',
}

const MODE_CODE: Record<EffectMode, string> = {
  'no-deps': `useEffect(() => {
  // Runs after EVERY render!
  // ⚠️ Dangerous — can cause infinite loops
  console.log('Effect ran');

  return () => {
    // Cleanup runs before next effect
    console.log('Cleanup!');
  };
}); // No dependency array`,

  'empty-deps': `useEffect(() => {
  // Runs only ONCE after mount
  // Like componentDidMount
  const sub = subscribe();
  console.log('Mounted!');

  return () => {
    // Runs on unmount only
    sub.unsubscribe();
  };
}, []); // Empty array = once`,

  'with-deps': `useEffect(() => {
  // Runs when 'count' changes
  document.title = \`Count: \${count}\`;
  console.log('count changed:', count);

  return () => {
    // Cleanup before next effect
    document.title = 'App';
  };
}, [count]); // Dep array`,
}

const EVENT_COLOR: Record<TimelineEventType, string> = {
  mount: '#7C3AED',
  render: '#A1A1AA',
  paint: '#71717A',
  effect: '#06B6D4',
  cleanup: '#F59E0B',
  unmount: '#EF4444',
}

const EVENT_LABEL: Record<TimelineEventType, string> = {
  mount: 'Mount',
  render: 'Render',
  paint: 'Paint DOM',
  effect: 'Effect',
  cleanup: 'Cleanup',
  unmount: 'Unmount',
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function UseEffectVisualizer() {
  const [mode, setMode] = useState<EffectMode>('empty-deps')
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [renderNum, setRenderNum] = useState(0)
  const [depValue, setDepValue] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [isUnmounted, setIsUnmounted] = useState(false)
  const counterRef = useRef(0)

  const nextId = useCallback(() => {
    counterRef.current += 1
    return counterRef.current
  }, [])

  const addEvents = useCallback((newEvents: Omit<TimelineEvent, 'id'>[]) => {
    setEvents((prev) => [...prev, ...newEvents.map((e) => ({ ...e, id: nextId() }))])
  }, [nextId])

  const handleMount = useCallback(() => {
    if (isMounted) return
    setIsMounted(true)
    setIsUnmounted(false)
    setRenderNum(1)
    const t = Date.now()

    const baseEvents: Omit<TimelineEvent, 'id'>[] = [
      { type: 'mount', mode: 'lifecycle', label: 'Component Mounts', explanation: 'Component pehli baar DOM mein aata hai.', timestamp: t, renderNum: 1 },
      { type: 'render', mode: 'lifecycle', label: 'Render #1', explanation: 'React JSX execute karta hai, VDOM banata hai.', timestamp: t + 1, renderNum: 1 },
      { type: 'paint', mode: 'lifecycle', label: 'Paint DOM', explanation: 'Browser real DOM update karta hai. User ko changes dikh rahe hain.', timestamp: t + 2, renderNum: 1 },
      { type: 'effect', mode, label: 'Effect Runs', explanation: mode === 'no-deps' ? 'No deps: effect pehle render ke baad chala.' : mode === 'empty-deps' ? '[] deps: effect sirf mount pe chala. Subscriptions, API calls yahan karo.' : '[count] deps: effect chala kyunki count initialize hua.', timestamp: t + 3, renderNum: 1 },
    ]
    addEvents(baseEvents)
  }, [isMounted, mode, addEvents])

  const handleStateUpdate = useCallback(() => {
    if (!isMounted || isUnmounted) {
      handleMount()
      return
    }

    const newRender = renderNum + 1
    setRenderNum(newRender)
    const t = Date.now()

    const base: Omit<TimelineEvent, 'id'>[] = [
      { type: 'render', mode: 'lifecycle', label: `Render #${newRender}`, explanation: 'State change se render trigger hua.', timestamp: t, renderNum: newRender },
      { type: 'paint', mode: 'lifecycle', label: 'Paint DOM', explanation: 'Updated VDOM se real DOM sync hua.', timestamp: t + 1, renderNum: newRender },
    ]

    if (mode === 'no-deps') {
      // cleanup before effect, then effect
      base.push(
        { type: 'cleanup', mode, label: 'Cleanup (prev effect)', explanation: 'Pichla effect cleanup hua — no-deps mode mein HAMESHA.', timestamp: t + 2, renderNum: newRender },
        { type: 'effect', mode, label: 'Effect Runs Again', explanation: '⚠️ No deps: effect har render ke baad chalta hai. Memory leak risk!', timestamp: t + 3, renderNum: newRender }
      )
    } else if (mode === 'empty-deps') {
      // no effect on updates
      base.push(
        { type: 'paint', mode: 'lifecycle', label: '✓ Effect Skipped', explanation: 'Empty []: effect run nahi hoga — mount pe ho chuka tha.', timestamp: t + 2, renderNum: newRender }
      )
    } else {
      // with-deps: depends on if dep changed
      base.push(
        { type: 'cleanup', mode, label: 'Cleanup (prev effect)', explanation: 'Dep changed toh pehle cleanup, phir effect.', timestamp: t + 2, renderNum: newRender },
        { type: 'effect', mode, label: 'Effect (dep changed)', explanation: '[count] changed → effect re-ran with new value.', timestamp: t + 3, renderNum: newRender }
      )
    }

    addEvents(base)
  }, [isMounted, isUnmounted, renderNum, mode, addEvents, handleMount])

  const handleChangeDep = useCallback(() => {
    if (!isMounted || isUnmounted) {
      handleMount()
      return
    }
    const newDep = depValue + 1
    setDepValue(newDep)
    const newRender = renderNum + 1
    setRenderNum(newRender)
    const t = Date.now()

    const base: Omit<TimelineEvent, 'id'>[] = [
      { type: 'render', mode: 'lifecycle', label: `Render #${newRender} (count=${newDep})`, explanation: `count = ${newDep} — state changed.`, timestamp: t, renderNum: newRender },
      { type: 'paint', mode: 'lifecycle', label: 'Paint DOM', explanation: 'New count DOM pe dikha.', timestamp: t + 1, renderNum: newRender },
    ]

    if (mode === 'no-deps') {
      base.push(
        { type: 'cleanup', mode, label: 'Cleanup', explanation: 'No-deps: cleanup + effect har baar.', timestamp: t + 2, renderNum: newRender },
        { type: 'effect', mode, label: 'Effect (every render)', explanation: 'No-deps mode — runs after every render regardless.', timestamp: t + 3, renderNum: newRender }
      )
    } else if (mode === 'empty-deps') {
      base.push(
        { type: 'paint', mode: 'lifecycle', label: '✓ Effect Skipped', explanation: 'Empty []: count change ne effect trigger nahi kiya. Effect already ran on mount.', timestamp: t + 2, renderNum: newRender }
      )
    } else {
      base.push(
        { type: 'cleanup', mode, label: `Cleanup (was count=${depValue})`, explanation: 'count changed → cleanup pehle.', timestamp: t + 2, renderNum: newRender },
        { type: 'effect', mode, label: `Effect (count=${newDep})`, explanation: `[count] dep changed: ${depValue} → ${newDep}. Effect re-runs with new value.`, timestamp: t + 3, renderNum: newRender }
      )
    }

    addEvents(base)
  }, [isMounted, isUnmounted, depValue, renderNum, mode, addEvents, handleMount])

  const handleUnmount = useCallback(() => {
    if (!isMounted || isUnmounted) return
    setIsUnmounted(true)
    const t = Date.now()

    addEvents([
      { type: 'unmount', mode: 'lifecycle', label: 'Component Unmounts', explanation: 'Component DOM se remove ho raha hai.', timestamp: t, renderNum },
      { type: 'cleanup', mode, label: 'Final Cleanup', explanation: 'Unmount pe HAMESHA cleanup runs — chahe koi bhi deps ho. Subscriptions cancel karo, intervals clear karo!', timestamp: t + 1, renderNum },
    ])
  }, [isMounted, isUnmounted, mode, renderNum, addEvents])

  const handleReset = useCallback(() => {
    setEvents([])
    setRenderNum(0)
    setDepValue(0)
    setIsMounted(false)
    setIsUnmounted(false)
    counterRef.current = 0
  }, [])

  return (
    <div className="w-full text-[#F5F5F7]">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 min-h-[580px]">

        {/* ── LEFT: Controls + Code ── */}
        <div className="flex flex-col gap-4">
          {/* Mode selector */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-3">Effect Mode</p>
            <div className="space-y-2">
              {(['no-deps', 'empty-deps', 'with-deps'] as EffectMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); handleReset() }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all"
                  style={
                    mode === m
                      ? { background: `${MODE_COLOR[m]}15`, borderColor: `${MODE_COLOR[m]}60`, color: MODE_COLOR[m] }
                      : { background: 'transparent', borderColor: 'rgba(255,255,255,0.08)', color: '#71717A' }
                  }
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: MODE_COLOR[m] }} />
                  <span className="text-xs font-mono">{MODE_LABEL[m]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Simulate buttons */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 flex flex-col gap-2"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-1">Simulate</p>
            <button
              onClick={handleMount}
              disabled={isMounted && !isUnmounted}
              className="w-full py-2 px-3 rounded-lg text-sm font-semibold border transition-all disabled:opacity-40"
              style={{ background: 'rgba(124,58,237,0.15)', borderColor: 'rgba(124,58,237,0.5)', color: '#7C3AED' }}
            >
              Mount Component
            </button>
            <button
              onClick={handleStateUpdate}
              className="w-full py-2 px-3 rounded-lg text-sm font-semibold border transition-all"
              style={{ background: 'rgba(161,161,170,0.08)', borderColor: 'rgba(161,161,170,0.3)', color: '#A1A1AA' }}
            >
              State Update (unrelated)
            </button>
            <button
              onClick={handleChangeDep}
              className="w-full py-2 px-3 rounded-lg text-sm font-semibold border transition-all"
              style={{ background: `${MODE_COLOR[mode]}10`, borderColor: `${MODE_COLOR[mode]}40`, color: MODE_COLOR[mode] }}
            >
              Change Dep Value (count = {depValue} → {depValue + 1})
            </button>
            <button
              onClick={handleUnmount}
              disabled={!isMounted || isUnmounted}
              className="w-full py-2 px-3 rounded-lg text-sm font-semibold border transition-all disabled:opacity-40"
              style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.4)', color: '#EF4444' }}
            >
              Unmount Component
            </button>
            <button
              onClick={handleReset}
              className="w-full py-1.5 rounded-lg text-xs text-[#71717A] border border-[rgba(255,255,255,0.08)] hover:text-[#A1A1AA] transition-all"
            >
              ↺ Reset Timeline
            </button>
          </div>

          {/* Code */}
          <div
            className="flex-1 rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
            style={{ background: 'rgba(12,12,20,0.95)' }}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[rgba(255,255,255,0.06)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs text-[#71717A] font-mono">use-effect.tsx</span>
            </div>
            <pre className="text-[11px] font-mono p-4 overflow-x-auto leading-6" style={{ color: '#F5F5F7' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={mode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="block"
                >
                  {MODE_CODE[mode].split('\n').map((line, i) => {
                    let color = '#F5F5F7'
                    if (line.includes('//')) color = '#6B7280'
                    if (line.includes('useEffect')) color = '#06B6D4'
                    if (line.includes('return')) color = '#F59E0B'
                    if (line.includes('⚠️')) color = '#EF4444'
                    return (
                      <div key={i} style={{ color }}>{line || ' '}</div>
                    )
                  })}
                </motion.span>
              </AnimatePresence>
            </pre>
          </div>
        </div>

        {/* ── RIGHT: Timeline ── */}
        <div
          className="rounded-xl border border-[rgba(255,255,255,0.08)] flex flex-col overflow-hidden"
          style={{ background: 'rgba(18,18,26,0.9)' }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
            <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">Lifecycle Timeline →</span>
            <div className="flex items-center gap-3 flex-wrap">
              {Object.entries(EVENT_COLOR).map(([type, color]) => (
                <div key={type} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-[9px] font-mono text-[#71717A]">{EVENT_LABEL[type as TimelineEventType]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {events.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-sm text-[#71717A] mb-2">Timeline khali hai</p>
                <p className="text-xs text-[#4A4A5A]">Mode chuno aur &ldquo;Mount Component&rdquo; dabao</p>
              </div>
            ) : (
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-3 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]" />

                <AnimatePresence initial={false}>
                  {events.map((ev) => {
                    const color = EVENT_COLOR[ev.type]
                    return (
                      <motion.div
                        key={ev.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-3 mb-3 relative pl-8"
                      >
                        {/* Dot on timeline */}
                        <div
                          className="absolute left-1.5 top-2 w-3 h-3 rounded-full border-2 flex-shrink-0"
                          style={{
                            background: `${color}30`,
                            borderColor: color,
                            boxShadow: `0 0 8px ${color}60`,
                          }}
                        />

                        <div
                          className="flex-1 rounded-lg border p-3"
                          style={{ background: `${color}08`, borderColor: `${color}25` }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                              style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
                            >
                              {EVENT_LABEL[ev.type]}
                            </span>
                            <span className="text-xs font-semibold" style={{ color }}>{ev.label}</span>
                            <span className="ml-auto text-[9px] font-mono text-[#71717A]">#{ev.renderNum}</span>
                          </div>
                          <p className="text-[11px] text-[#A1A1AA] leading-relaxed">{ev.explanation}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
