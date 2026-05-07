'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

type Method = 'map' | 'filter' | 'reduce'

interface Operation {
  id: string
  label: string
  method: Method
  description: string
  fn: (arr: number[]) => { output: unknown[]; steps: StepInfo[] }
  codeStr: string
}

interface StepInfo {
  inputIdx: number
  inputVal: number
  passes?: boolean
  outputVal?: unknown
  accumulator?: unknown
}

interface ItemState {
  val: number
  status: 'idle' | 'active' | 'pass' | 'fail' | 'done'
  outputVal?: unknown
}

// ─── Operations ──────────────────────────────────────────────────────────────

const INPUT_ARRAY = [1, 2, 3, 4, 5]

const OPERATIONS: Operation[] = [
  {
    id: 'double',
    label: 'x => x * 2',
    method: 'map',
    description: 'Double each number — creates new array',
    codeStr: '[1,2,3,4,5].map(x => x * 2)\n// → [2,4,6,8,10]',
    fn: (arr) => ({
      output: arr.map((x) => x * 2),
      steps: arr.map((x, i) => ({ inputIdx: i, inputVal: x, outputVal: x * 2 })),
    }),
  },
  {
    id: 'square',
    label: 'x => x ** 2',
    method: 'map',
    description: 'Square each number',
    codeStr: '[1,2,3,4,5].map(x => x ** 2)\n// → [1,4,9,16,25]',
    fn: (arr) => ({
      output: arr.map((x) => x ** 2),
      steps: arr.map((x, i) => ({ inputIdx: i, inputVal: x, outputVal: x ** 2 })),
    }),
  },
  {
    id: 'stringify',
    label: 'x => `item_${x}`',
    method: 'map',
    description: 'Convert numbers to strings',
    codeStr: "[1,2,3,4,5].map(x => `item_${x}`)\n// → ['item_1','item_2',...]",
    fn: (arr) => ({
      output: arr.map((x) => `item_${x}`),
      steps: arr.map((x, i) => ({ inputIdx: i, inputVal: x, outputVal: `item_${x}` })),
    }),
  },
  {
    id: 'evens',
    label: 'x => x % 2 === 0',
    method: 'filter',
    description: 'Keep only even numbers',
    codeStr: '[1,2,3,4,5].filter(x => x % 2 === 0)\n// → [2,4]',
    fn: (arr) => ({
      output: arr.filter((x) => x % 2 === 0),
      steps: arr.map((x, i) => ({ inputIdx: i, inputVal: x, passes: x % 2 === 0 })),
    }),
  },
  {
    id: 'odds',
    label: 'x => x % 2 !== 0',
    method: 'filter',
    description: 'Keep only odd numbers',
    codeStr: '[1,2,3,4,5].filter(x => x % 2 !== 0)\n// → [1,3,5]',
    fn: (arr) => ({
      output: arr.filter((x) => x % 2 !== 0),
      steps: arr.map((x, i) => ({ inputIdx: i, inputVal: x, passes: x % 2 !== 0 })),
    }),
  },
  {
    id: 'gt2',
    label: 'x => x > 2',
    method: 'filter',
    description: 'Keep numbers greater than 2',
    codeStr: '[1,2,3,4,5].filter(x => x > 2)\n// → [3,4,5]',
    fn: (arr) => ({
      output: arr.filter((x) => x > 2),
      steps: arr.map((x, i) => ({ inputIdx: i, inputVal: x, passes: x > 2 })),
    }),
  },
  {
    id: 'sum',
    label: '(acc, x) => acc + x',
    method: 'reduce',
    description: 'Sum all numbers (initial: 0)',
    codeStr: '[1,2,3,4,5].reduce((acc, x) => acc + x, 0)\n// → 15',
    fn: (arr) => {
      let acc = 0
      const steps: StepInfo[] = arr.map((x, i) => {
        acc += x
        return { inputIdx: i, inputVal: x, accumulator: acc, outputVal: acc }
      })
      return { output: [acc], steps }
    },
  },
  {
    id: 'product',
    label: '(acc, x) => acc * x',
    method: 'reduce',
    description: 'Multiply all numbers (initial: 1)',
    codeStr: '[1,2,3,4,5].reduce((acc, x) => acc * x, 1)\n// → 120',
    fn: (arr) => {
      let acc = 1
      const steps: StepInfo[] = arr.map((x, i) => {
        acc *= x
        return { inputIdx: i, inputVal: x, accumulator: acc, outputVal: acc }
      })
      return { output: [acc], steps }
    },
  },
  {
    id: 'max',
    label: '(acc, x) => Math.max(acc, x)',
    method: 'reduce',
    description: 'Find the maximum (initial: -Infinity)',
    codeStr: '[1,2,3,4,5].reduce((acc,x) => Math.max(acc,x), -Infinity)\n// → 5',
    fn: (arr) => {
      let acc = -Infinity
      const steps: StepInfo[] = arr.map((x, i) => {
        acc = Math.max(acc, x)
        return { inputIdx: i, inputVal: x, accumulator: acc, outputVal: acc }
      })
      return { output: [acc], steps }
    },
  },
]

const METHOD_COLORS: Record<Method, string> = {
  map: '#7C3AED',
  filter: '#10B981',
  reduce: '#F59E0B',
}

const ITEM_COLORS = ['#06B6D4', '#7C3AED', '#10B981', '#F59E0B', '#EF4444']

// ─── Array Item Box ───────────────────────────────────────────────────────────

function ArrayItem({
  val,
  color,
  status,
  outputVal,
  label,
}: {
  val: number
  color: string
  status: ItemState['status']
  outputVal?: unknown
  label?: string
}) {
  const bgMap: Record<ItemState['status'], string> = {
    idle: 'rgba(255,255,255,0.04)',
    active: `${color}30`,
    pass: 'rgba(16,185,129,0.2)',
    fail: 'rgba(239,68,68,0.15)',
    done: `${color}20`,
  }
  const borderMap: Record<ItemState['status'], string> = {
    idle: 'rgba(255,255,255,0.1)',
    active: color,
    pass: '#10B981',
    fail: '#EF4444',
    done: color,
  }

  return (
    <motion.div
      className="relative flex flex-col items-center gap-1"
      animate={{
        scale: status === 'active' ? 1.15 : status === 'fail' ? 0.9 : 1,
        opacity: status === 'fail' ? 0.4 : 1,
        y: status === 'pass' || status === 'done' ? -4 : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
    >
      {label && (
        <span className="text-[9px] font-mono text-[#71717A] absolute -top-4">{label}</span>
      )}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold font-mono border-2 transition-all"
        style={{
          background: bgMap[status],
          borderColor: borderMap[status],
          color: status === 'fail' ? '#EF4444' : status === 'pass' ? '#10B981' : color,
          boxShadow: status === 'active' ? `0 0 16px ${color}50` : 'none',
        }}
      >
        {status === 'pass' ? '✓' : status === 'fail' ? '✗' : val}
      </div>
      {(status === 'done' || status === 'pass') && outputVal !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] font-mono font-semibold"
          style={{ color: status === 'pass' ? '#10B981' : color }}
        >
          {String(outputVal)}
        </motion.div>
      )}
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ArrayMethodsVisualizer() {
  const [activeMethod, setActiveMethod] = useState<Method>('map')
  const [opId, setOpId] = useState('double')
  const [itemStates, setItemStates] = useState<ItemState[]>(
    INPUT_ARRAY.map((v) => ({ val: v, status: 'idle' }))
  )
  const [outputItems, setOutputItems] = useState<unknown[]>([])
  const [accumulator, setAccumulator] = useState<unknown>(null)
  const [currentStep, setCurrentStep] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(0.5)
  const [isDone, setIsDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentOp = OPERATIONS.find((o) => o.id === opId) ?? OPERATIONS[0]
  const filteredOps = OPERATIONS.filter((o) => o.method === activeMethod)

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setItemStates(INPUT_ARRAY.map((v) => ({ val: v, status: 'idle' })))
    setOutputItems([])
    setAccumulator(null)
    setCurrentStep(-1)
    setIsRunning(false)
    setIsDone(false)
  }, [])

  const changeMethod = useCallback(
    (m: Method) => {
      setActiveMethod(m)
      const firstOp = OPERATIONS.find((o) => o.method === m)
      if (firstOp) setOpId(firstOp.id)
      reset()
    },
    [reset]
  )

  const runStep = useCallback(
    (stepIdx: number, steps: StepInfo[], op: Operation) => {
      if (stepIdx >= steps.length) {
        setIsRunning(false)
        setIsDone(true)
        if (intervalRef.current) clearInterval(intervalRef.current)
        return
      }
      const step = steps[stepIdx]
      setCurrentStep(stepIdx)

      if (op.method === 'map') {
        setItemStates((prev) => {
          const next = [...prev]
          if (stepIdx > 0) next[stepIdx - 1] = { ...next[stepIdx - 1], status: 'done' }
          next[stepIdx] = { ...next[stepIdx], status: 'active', outputVal: step.outputVal }
          return next
        })
        setTimeout(() => {
          setOutputItems((prev) => [...prev, step.outputVal])
          setItemStates((prev) => {
            const next = [...prev]
            next[stepIdx] = { ...next[stepIdx], status: 'done' }
            return next
          })
        }, (400 / speed) * 0.6)
      } else if (op.method === 'filter') {
        setItemStates((prev) => {
          const next = [...prev]
          if (stepIdx > 0) {
            const prevStep = steps[stepIdx - 1]
            next[stepIdx - 1] = {
              ...next[stepIdx - 1],
              status: prevStep.passes ? 'pass' : 'fail',
            }
          }
          next[stepIdx] = { ...next[stepIdx], status: 'active' }
          return next
        })
        setTimeout(() => {
          if (step.passes) {
            setOutputItems((prev) => [...prev, step.inputVal])
          }
          setItemStates((prev) => {
            const next = [...prev]
            next[stepIdx] = {
              ...next[stepIdx],
              status: step.passes ? 'pass' : 'fail',
            }
            return next
          })
        }, (400 / speed) * 0.6)
      } else if (op.method === 'reduce') {
        setItemStates((prev) => {
          const next = [...prev]
          if (stepIdx > 0) next[stepIdx - 1] = { ...next[stepIdx - 1], status: 'done' }
          next[stepIdx] = { ...next[stepIdx], status: 'active' }
          return next
        })
        setTimeout(() => {
          setAccumulator(step.accumulator)
          setItemStates((prev) => {
            const next = [...prev]
            next[stepIdx] = { ...next[stepIdx], status: 'done' }
            return next
          })
        }, (400 / speed) * 0.6)
      }
    },
    [speed]
  )

  const runAll = useCallback(() => {
    reset()
    const { steps } = currentOp.fn(INPUT_ARRAY)
    setIsRunning(true)
    setIsDone(false)
    const delay = 700 / speed

    let step = 0
    intervalRef.current = setInterval(() => {
      if (step >= steps.length) {
        clearInterval(intervalRef.current!)
        setIsRunning(false)
        setIsDone(true)
        return
      }
      runStep(step, steps, currentOp)
      step++
    }, delay)
  }, [currentOp, reset, runStep, speed])

  const stepForward = useCallback(() => {
    const { steps } = currentOp.fn(INPUT_ARRAY)
    const next = currentStep + 1
    if (next >= steps.length) {
      setIsDone(true)
      return
    }
    runStep(next, steps, currentOp)
  }, [currentOp, currentStep, runStep])

  const methodColor = METHOD_COLORS[activeMethod]

  return (
    <div className="w-full text-[#F5F5F7]">
      <div className="flex flex-col gap-4">

        {/* ── Method Tabs + Operation selector ── */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Method tabs */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 flex-shrink-0"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-3">Method</p>
            <div className="flex gap-2">
              {(['map', 'filter', 'reduce'] as Method[]).map((m) => (
                <button
                  key={m}
                  onClick={() => changeMethod(m)}
                  className="px-4 py-2 rounded-lg text-sm font-bold font-mono border-2 transition-all"
                  style={{
                    background: activeMethod === m ? `${METHOD_COLORS[m]}20` : 'transparent',
                    borderColor:
                      activeMethod === m ? METHOD_COLORS[m] : 'rgba(255,255,255,0.1)',
                    color: activeMethod === m ? METHOD_COLORS[m] : '#71717A',
                    boxShadow:
                      activeMethod === m ? `0 0 16px ${METHOD_COLORS[m]}40` : 'none',
                  }}
                >
                  .{m}()
                </button>
              ))}
            </div>
          </div>

          {/* Operation selector */}
          <div
            className="flex-1 rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-3">
              Operation
            </p>
            <div className="flex flex-wrap gap-2">
              {filteredOps.map((op) => (
                <button
                  key={op.id}
                  onClick={() => { setOpId(op.id); reset() }}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono border transition-all"
                  style={{
                    background: opId === op.id ? `${methodColor}20` : 'rgba(255,255,255,0.03)',
                    borderColor: opId === op.id ? methodColor : 'rgba(255,255,255,0.1)',
                    color: opId === op.id ? methodColor : '#A1A1AA',
                  }}
                >
                  {op.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-[#71717A]">{currentOp.description}</p>
          </div>
        </div>

        {/* ── Main visualization area ── */}
        <div
          className="rounded-xl border border-[rgba(255,255,255,0.08)] p-6"
          style={{ background: 'rgba(18,18,26,0.9)' }}
        >
          {/* Input array */}
          <div className="mb-8">
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-4">
              Input Array
            </p>
            <div className="flex items-end gap-4 flex-wrap">
              <span className="text-2xl text-[#71717A] font-mono">[</span>
              {itemStates.map((item, i) => (
                <ArrayItem
                  key={i}
                  val={item.val}
                  color={ITEM_COLORS[i]}
                  status={item.status}
                  outputVal={item.outputVal}
                  label={`arr[${i}]`}
                />
              ))}
              <span className="text-2xl text-[#71717A] font-mono">]</span>
            </div>
          </div>

          {/* Arrow + method label */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="px-3 py-1.5 rounded-lg text-sm font-bold font-mono border"
              style={{
                background: `${methodColor}15`,
                borderColor: `${methodColor}50`,
                color: methodColor,
              }}
            >
              .{activeMethod}( {currentOp.label} )
            </div>
            <div className="flex-1 border-t-2 border-dashed" style={{ borderColor: methodColor + '40' }} />
            <span className="text-2xl" style={{ color: methodColor }}>↓</span>
          </div>

          {/* Reduce: accumulator display */}
          {activeMethod === 'reduce' && (
            <div className="mb-6">
              <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-3">
                Accumulator
              </p>
              <motion.div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border-2 font-mono text-lg font-bold"
                style={{
                  background: 'rgba(245,158,11,0.1)',
                  borderColor: accumulator !== null ? '#F59E0B' : 'rgba(245,158,11,0.3)',
                  color: '#F59E0B',
                }}
                animate={{
                  boxShadow:
                    accumulator !== null ? '0 0 20px rgba(245,158,11,0.4)' : 'none',
                }}
              >
                <span className="text-sm text-[#A1A1AA]">acc =</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={String(accumulator)}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                  >
                    {accumulator === null
                      ? currentOp.id === 'product'
                        ? '1'
                        : currentOp.id === 'max'
                        ? '-∞'
                        : '0'
                      : String(accumulator)}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {/* Output array */}
          <div>
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-4">
              {activeMethod === 'reduce' ? 'Result' : 'Output Array'}{' '}
              {activeMethod !== 'reduce' && (
                <span className="text-[#71717A] normal-case font-normal">
                  (new array — original unchanged)
                </span>
              )}
            </p>
            <div className="flex items-center gap-4 flex-wrap min-h-[60px]">
              <span className="text-2xl text-[#71717A] font-mono">
                {activeMethod === 'reduce' ? '' : '['}
              </span>
              <AnimatePresence>
                {outputItems.length === 0 && !isDone ? (
                  <motion.span className="text-sm text-[#4A4A5A] font-mono">
                    waiting...
                  </motion.span>
                ) : (
                  outputItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold font-mono border-2"
                      style={{
                        background: `${methodColor}20`,
                        borderColor: methodColor,
                        color: methodColor,
                        boxShadow: `0 0 12px ${methodColor}40`,
                      }}
                    >
                      {String(item).length > 5 ? String(item).slice(0, 5) + '…' : String(item)}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
              <span className="text-2xl text-[#71717A] font-mono">
                {activeMethod === 'reduce' ? '' : ']'}
              </span>
            </div>
          </div>
        </div>

        {/* ── Code + Controls row ── */}
        <div className="grid grid-cols-[1fr_auto] gap-4">
          {/* Code preview */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
            style={{ background: 'rgba(18,18,26,0.9)' }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2">
              Code
            </p>
            <pre
              className="text-sm font-mono leading-relaxed"
              style={{ color: methodColor }}
            >
              {currentOp.codeStr}
            </pre>
          </div>

          {/* Controls */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 flex flex-col gap-3 min-w-[200px]"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <div className="flex gap-2">
              <button
                onClick={runAll}
                disabled={isRunning}
                className="flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all disabled:opacity-40"
                style={{
                  background: `linear-gradient(135deg, ${methodColor}, #06B6D4)`,
                }}
              >
                {isRunning ? 'Running…' : '▶ Run All'}
              </button>
              <button
                onClick={stepForward}
                disabled={isRunning || isDone}
                className="py-2 px-3 rounded-lg text-sm font-semibold border transition-all disabled:opacity-40"
                style={{
                  background: 'rgba(16,185,129,0.15)',
                  borderColor: 'rgba(16,185,129,0.5)',
                  color: '#10B981',
                }}
              >
                Step →
              </button>
            </div>

            <button
              onClick={reset}
              className="w-full py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-[#F5F5F7] bg-[#12121A] border border-[rgba(255,255,255,0.06)] transition-all"
            >
              ↺ Reset
            </button>

            <div>
              <div className="flex justify-between text-xs text-[#A1A1AA] mb-1">
                <span>Speed</span>
                <span className="font-mono" style={{ color: methodColor }}>{speed}x</span>
              </div>
              <input
                type="range" min={0.25} max={3} step={0.25} value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${methodColor} ${((speed - 0.25) / 2.75) * 100}%, #22222F ${((speed - 0.25) / 2.75) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-[10px] text-[#71717A] mt-1">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>

            {isDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-2 rounded-lg text-sm font-semibold"
                style={{
                  background: `${methodColor}20`,
                  color: methodColor,
                  border: `1px solid ${methodColor}40`,
                }}
              >
                Done!
              </motion.div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div
          className="rounded-xl border border-[rgba(255,255,255,0.08)] px-4 py-3"
          style={{ background: 'rgba(26,26,38,0.8)' }}
        >
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              { color: '#7C3AED', label: '.map() — transforms each item' },
              { color: '#10B981', label: '.filter() — keeps/removes items' },
              { color: '#F59E0B', label: '.reduce() — accumulates to one value' },
              { color: '#EF4444', label: '✗ filtered out' },
              { color: '#10B981', label: '✓ passed filter' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                <span className="text-[10px] font-mono text-[#A1A1AA]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
