'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ─────────────────────────────────────────────────────────────────────

type ModuleType = 'core' | 'relative' | 'third-party'
type StepStatus = 'pending' | 'checking' | 'found' | 'not-found' | 'skipped'

interface ResolutionStep {
  label: string
  path: string
  status: StepStatus
  note?: string
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function detectType(name: string): ModuleType {
  if (name.startsWith('./') || name.startsWith('../') || name.startsWith('/')) return 'relative'
  const CORE = ['fs', 'path', 'http', 'https', 'os', 'events', 'stream', 'crypto', 'child_process', 'net', 'dns', 'url', 'util', 'buffer']
  if (CORE.includes(name.toLowerCase())) return 'core'
  return 'third-party'
}

function buildSteps(moduleName: string, type: ModuleType): ResolutionStep[] {
  const base = '/Users/project'

  if (type === 'core') {
    return [
      {
        label: 'Core module check',
        path: `Built-in: "${moduleName}"`,
        status: 'pending',
        note: 'Node.js core modules are always checked first',
      },
    ]
  }

  if (type === 'relative') {
    const clean = moduleName.replace(/^\.\//, '').replace(/^\.\.\//, '')
    return [
      {
        label: `Try ${moduleName}.js`,
        path: `${base}/src/${clean}.js`,
        status: 'pending',
        note: 'Exact file with .js extension',
      },
      {
        label: `Try ${moduleName}.ts`,
        path: `${base}/src/${clean}.ts`,
        status: 'pending',
        note: 'TypeScript variant',
      },
      {
        label: `Try ${moduleName}/index.js`,
        path: `${base}/src/${clean}/index.js`,
        status: 'pending',
        note: 'Directory with index file',
      },
      {
        label: `Try ${moduleName}/index.ts`,
        path: `${base}/src/${clean}/index.ts`,
        status: 'pending',
        note: 'Directory with index.ts',
      },
    ]
  }

  // third-party
  return [
    {
      label: 'Core module? No.',
      path: `"${moduleName}" is not a built-in`,
      status: 'pending',
      note: 'Not in Node.js core list',
    },
    {
      label: 'Relative path? No.',
      path: 'No ./ or ../ prefix → node_modules search',
      status: 'pending',
      note: 'Will look in node_modules folders',
    },
    {
      label: 'node_modules (current dir)',
      path: `${base}/node_modules/${moduleName}/`,
      status: 'pending',
      note: 'Start from current directory',
    },
    {
      label: 'node_modules (parent dir)',
      path: `/Users/node_modules/${moduleName}/`,
      status: 'pending',
      note: 'Walk up the directory tree',
    },
    {
      label: 'node_modules (root)',
      path: `/node_modules/${moduleName}/`,
      status: 'pending',
      note: 'Last directory in tree',
    },
  ]
}

const PRESETS = [
  { label: 'fs', desc: 'Core module', color: '#10B981' },
  { label: 'lodash', desc: 'Third-party', color: '#7C3AED' },
  { label: './utils', desc: 'Relative path', color: '#06B6D4' },
  { label: '../config', desc: 'Parent relative', color: '#F59E0B' },
  { label: 'express', desc: 'npm package', color: '#EF4444' },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function StepRow({
  step,
  index,
  isLast,
}: {
  step: ResolutionStep
  index: number
  isLast: boolean
}) {
  const statusConfig = {
    pending: { icon: '○', color: '#52525B', bg: 'rgba(255,255,255,0.03)' },
    checking: { icon: '⟳', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
    found: { icon: '✓', color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
    'not-found': { icon: '✗', color: '#EF4444', bg: 'rgba(239,68,68,0.06)' },
    skipped: { icon: '−', color: '#52525B', bg: 'rgba(255,255,255,0.02)' },
  }[step.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative"
    >
      {/* Connector line */}
      {!isLast && (
        <div
          className="absolute left-4 top-10 bottom-0 w-px"
          style={{
            background:
              step.status === 'found'
                ? 'rgba(16,185,129,0.4)'
                : step.status === 'not-found'
                ? 'rgba(239,68,68,0.25)'
                : 'rgba(255,255,255,0.08)',
          }}
        />
      )}

      <motion.div
        animate={{
          background: statusConfig.bg,
          borderColor:
            step.status === 'found'
              ? 'rgba(16,185,129,0.4)'
              : step.status === 'checking'
              ? 'rgba(245,158,11,0.4)'
              : step.status === 'not-found'
              ? 'rgba(239,68,68,0.25)'
              : 'rgba(255,255,255,0.06)',
        }}
        transition={{ duration: 0.3 }}
        className="flex items-start gap-3 p-3 rounded-xl border mb-2 relative z-10"
      >
        {/* Status icon */}
        <div className="flex-shrink-0 mt-0.5">
          <motion.div
            animate={{ rotate: step.status === 'checking' ? 360 : 0 }}
            transition={{
              duration: 0.6,
              repeat: step.status === 'checking' ? Infinity : 0,
              ease: 'linear',
            }}
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold"
            style={{ background: `${statusConfig.color}20`, color: statusConfig.color }}
          >
            {statusConfig.icon}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p
              className="text-xs font-semibold"
              style={{
                color: step.status === 'skipped' ? '#52525B' : '#F5F5F7',
              }}
            >
              Step {index + 1}: {step.label}
            </p>
            {step.status !== 'pending' && step.status !== 'checking' && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  background: `${statusConfig.color}20`,
                  color: statusConfig.color,
                }}
              >
                {step.status === 'found'
                  ? 'FOUND ✓'
                  : step.status === 'not-found'
                  ? 'NOT FOUND'
                  : 'SKIPPED'}
              </motion.span>
            )}
          </div>

          <p
            className="text-[10px] font-mono mt-0.5 break-all"
            style={{ color: statusConfig.color }}
          >
            {step.path}
          </p>

          {step.note && (
            <p className="text-[10px] text-[#52525B] mt-0.5 leading-tight">{step.note}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ModuleResolutionVisualizer() {
  const [moduleName, setModuleName] = useState('lodash')
  const [inputValue, setInputValue] = useState('lodash')
  const [steps, setSteps] = useState<ResolutionStep[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [foundAt, setFoundAt] = useState<number | null>(null)
  const [cachedRun, setCachedRun] = useState(false)
  const [speed, setSpeed] = useState<'slow' | 'normal'>('normal')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const delay = speed === 'slow' ? 900 : 450

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  const resolve = (mod: string, showCached = false) => {
    if (isRunning) return
    clearTimers()
    setIsRunning(true)
    setIsDone(false)
    setFoundAt(null)
    setCachedRun(showCached)

    const type = detectType(mod)
    const initialSteps = buildSteps(mod, type)
    setSteps(initialSteps.map(s => ({ ...s, status: 'pending' as StepStatus })))

    if (showCached) {
      // Cache hit — instant resolve
      setTimeout(() => {
        const cacheSteps: ResolutionStep[] = [
          {
            label: 'Cache hit!',
            path: `require.cache["${mod}"] — already loaded`,
            status: 'found',
            note: 'require() caches modules. Second call is instant.',
          },
        ]
        setSteps(cacheSteps)
        setFoundAt(0)
        setIsRunning(false)
        setIsDone(true)
      }, 300)
      return
    }

    // Determine where it will be "found"
    let foundIndex = -1
    if (type === 'core') foundIndex = 0
    else if (type === 'relative') foundIndex = 0 // First .js attempt
    else foundIndex = 2 // node_modules/current

    // Animate steps
    const animateStep = (stepIndex: number) => {
      if (stepIndex >= initialSteps.length) {
        // All not found
        setIsRunning(false)
        setIsDone(true)
        setSteps(prev =>
          prev.map((s, i) =>
            i === initialSteps.length - 1 ? { ...s, status: 'not-found' } : s
          )
        )
        return
      }

      // Mark current as checking
      setSteps(prev =>
        prev.map((s, i) =>
          i === stepIndex ? { ...s, status: 'checking' }
          : i < stepIndex ? s
          : s
        )
      )

      timerRef.current = setTimeout(() => {
        if (stepIndex === foundIndex) {
          // Found!
          setSteps(prev =>
            prev.map((s, i) =>
              i === stepIndex ? { ...s, status: 'found' }
              : i < stepIndex ? s
              : { ...s, status: 'skipped' }
            )
          )
          setFoundAt(stepIndex)
          setIsRunning(false)
          setIsDone(true)
        } else if (stepIndex < foundIndex) {
          // Not found, continue
          setSteps(prev =>
            prev.map((s, i) =>
              i === stepIndex ? { ...s, status: 'not-found' } : s
            )
          )
          timerRef.current = setTimeout(() => animateStep(stepIndex + 1), delay * 0.3)
        } else {
          // Past found index — shouldn't happen
          animateStep(stepIndex + 1)
        }
      }, delay)
    }

    animateStep(0)
  }

  const handleResolve = () => {
    const name = inputValue.trim() || 'lodash'
    setModuleName(name)
    resolve(name)
  }

  const handleCached = () => {
    const name = inputValue.trim() || 'lodash'
    setModuleName(name)
    resolve(name, true)
  }

  const handleReset = () => {
    clearTimers()
    setIsRunning(false)
    setIsDone(false)
    setFoundAt(null)
    setSteps([])
    setCachedRun(false)
  }

  const type = detectType(moduleName)
  const typeConfig = {
    core: { label: 'Core Module', color: '#10B981' },
    relative: { label: 'Relative Path', color: '#06B6D4' },
    'third-party': { label: 'Third-Party', color: '#7C3AED' },
  }[type]

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
          <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] animate-pulse" />
          <span className="text-xs font-mono text-[#A1A1AA]">Module Resolution Algorithm</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#71717A] font-mono">Speed:</span>
          {(['slow', 'normal'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md transition-all"
              style={{
                background: speed === s ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.05)',
                color: speed === s ? '#7C3AED' : '#71717A',
                border: `1px solid ${speed === s ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-5">

        {/* Input row */}
        <div className="flex gap-3 items-end flex-wrap">
          <div className="flex-1 min-w-48">
            <label className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider mb-1.5 block">
              require(&apos; ___ &apos;)
            </label>
            <div className="flex items-center gap-2 rounded-xl border px-3 py-2" style={{ background: '#12121A', borderColor: 'rgba(255,255,255,0.12)' }}>
              <span className="text-xs font-mono text-[#71717A]">require(&apos;</span>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleResolve()}
                placeholder="lodash"
                className="flex-1 bg-transparent text-xs font-mono text-[#F5F5F7] outline-none placeholder-[#52525B] min-w-0"
              />
              <span className="text-xs font-mono text-[#71717A]">&apos;)</span>
            </div>
          </div>

          {type && (
            <div
              className="text-[10px] font-mono px-2.5 py-1 rounded-lg h-fit"
              style={{ background: `${typeConfig.color}15`, color: typeConfig.color, border: `1px solid ${typeConfig.color}30` }}
            >
              {typeConfig.label}
            </div>
          )}
        </div>

        {/* Preset buttons */}
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-mono text-[#52525B] self-center">Presets:</span>
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => {
                setInputValue(p.label)
                setModuleName(p.label)
                handleReset()
              }}
              className="text-[10px] font-mono px-2.5 py-1 rounded-lg transition-all"
              style={{
                background: `${p.color}10`,
                color: p.color,
                border: `1px solid ${p.color}25`,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleResolve}
            disabled={isRunning}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all disabled:opacity-40"
            style={{
              background: 'rgba(124,58,237,0.15)',
              color: '#7C3AED',
              border: '1px solid rgba(124,58,237,0.35)',
            }}
          >
            🔍 Resolve Module
          </button>
          <button
            onClick={handleCached}
            disabled={isRunning}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all disabled:opacity-40"
            style={{
              background: 'rgba(16,185,129,0.1)',
              color: '#10B981',
              border: '1px solid rgba(16,185,129,0.3)',
            }}
          >
            ⚡ Show Cached (2nd require)
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: '#71717A',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            Reset
          </button>
        </div>

        {/* Steps visualization */}
        <AnimatePresence mode="wait">
          {steps.length > 0 && (
            <motion.div
              key={moduleName + cachedRun}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-1"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono text-[#71717A] uppercase tracking-wider">
                  Resolution trace for
                </span>
                <code
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                  style={{ background: 'rgba(124,58,237,0.15)', color: '#7C3AED' }}
                >
                  require(&apos;{moduleName}&apos;)
                </code>
              </div>

              {steps.map((step, i) => (
                <StepRow
                  key={i}
                  step={step}
                  index={i}
                  isLast={i === steps.length - 1}
                />
              ))}

              {/* Result banner */}
              {isDone && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 rounded-xl p-4 border flex items-start gap-3"
                  style={
                    foundAt !== null
                      ? {
                          background: 'rgba(16,185,129,0.1)',
                          borderColor: 'rgba(16,185,129,0.35)',
                        }
                      : {
                          background: 'rgba(239,68,68,0.08)',
                          borderColor: 'rgba(239,68,68,0.3)',
                        }
                  }
                >
                  <span className="text-xl flex-shrink-0">
                    {foundAt !== null ? '✅' : '💥'}
                  </span>
                  <div>
                    <p
                      className="text-sm font-bold mb-0.5"
                      style={{ color: foundAt !== null ? '#10B981' : '#EF4444' }}
                    >
                      {cachedRun
                        ? 'Cache hit — instant return!'
                        : foundAt !== null
                        ? `Module resolved at step ${foundAt + 1}`
                        : 'MODULE_NOT_FOUND error thrown'}
                    </p>
                    <p className="text-[11px] text-[#A1A1AA] font-mono">
                      {cachedRun
                        ? 'require() ka result cache hota hai — second call instant hai'
                        : foundAt !== null
                        ? `require('${moduleName}') successfully loaded`
                        : `Error: Cannot find module '${moduleName}'`}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {steps.length === 0 && (
          <div
            className="rounded-xl p-6 text-center border"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <p className="text-[#52525B] text-xs font-mono">
              Type a module name and press &quot;Resolve Module&quot; to see the algorithm
            </p>
          </div>
        )}

        {/* __dirname tip */}
        <div
          className="rounded-xl p-4 border"
          style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.18)' }}
        >
          <p className="text-[11px] font-mono text-[#F59E0B] font-bold mb-1">
            Debug tip: require.resolve()
          </p>
          <pre className="text-[10px] font-mono text-[#A1A1AA] leading-relaxed">{`// Exactly kahan se module load ho raha hai:
console.log(require.resolve('lodash'))
// → /Users/project/node_modules/lodash/lodash.js

// Module cache dekho:
console.log(Object.keys(require.cache))`}</pre>
        </div>
      </div>
    </div>
  )
}
