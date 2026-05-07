'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

type HoistStatus = 'hoisted' | 'tdz' | 'full' | 'unhoisted'
type Phase = 'none' | 'creation' | 'execution'

interface Declaration {
  id: string
  kind: 'var' | 'let' | 'const' | 'function'
  name: string
  value: string
  hoistStatus: HoistStatus
  hoistDisplay: string
  tdz?: boolean
}

interface ExecutionStep {
  lineIdx: number
  output: string
  color: string
  explanation: string
}

interface Example {
  id: number
  name: string
  codeLines: { text: string; color?: string; lineIdx?: number }[]
  declarations: Declaration[]
  executionSteps: ExecutionStep[]
}

// ─── Examples ─────────────────────────────────────────────────────────────────

const EXAMPLES: Example[] = [
  {
    id: 1,
    name: 'var vs let Hoisting',
    codeLines: [
      { text: "console.log(varX);    // ??", lineIdx: 0 },
      { text: "console.log(letY);    // ??", lineIdx: 1 },
      { text: "greet();              // ??", lineIdx: 2 },
      { text: '' },
      { text: "var varX = 5;", lineIdx: 4 },
      { text: "let letY = 10;", lineIdx: 5 },
      { text: "function greet() { return 'Hello!'; }", lineIdx: 6 },
    ],
    declarations: [
      {
        id: 'varX',
        kind: 'var',
        name: 'varX',
        value: '5',
        hoistStatus: 'hoisted',
        hoistDisplay: 'var varX = undefined',
        tdz: false,
      },
      {
        id: 'letY',
        kind: 'let',
        name: 'letY',
        value: '10',
        hoistStatus: 'tdz',
        hoistDisplay: 'let letY = [TDZ]',
        tdz: true,
      },
      {
        id: 'greet',
        kind: 'function',
        name: 'greet',
        value: "function() { return 'Hello!'; }",
        hoistStatus: 'full',
        hoistDisplay: "function greet() { ... } // fully hoisted!",
        tdz: false,
      },
    ],
    executionSteps: [
      {
        lineIdx: 0,
        output: 'undefined',
        color: '#F59E0B',
        explanation: "varX is hoisted as undefined — no error, but value not set yet!",
      },
      {
        lineIdx: 1,
        output: 'ReferenceError: Cannot access letY before initialization',
        color: '#EF4444',
        explanation: "letY is in TDZ (Temporal Dead Zone) — accessing before declaration throws ReferenceError!",
      },
      {
        lineIdx: 2,
        output: "'Hello!'",
        color: '#10B981',
        explanation: "greet() works! Function declarations are FULLY hoisted — body and all.",
      },
      {
        lineIdx: 4,
        output: "varX = 5",
        color: '#06B6D4',
        explanation: "Now varX gets its real value: 5.",
      },
      {
        lineIdx: 5,
        output: "letY = 10",
        color: '#06B6D4',
        explanation: "letY exits TDZ — now initialized to 10.",
      },
    ],
  },
  {
    id: 2,
    name: 'Function Expression vs Declaration',
    codeLines: [
      { text: "sayHello();   // works?", lineIdx: 0 },
      { text: "sayBye();     // works?", lineIdx: 1 },
      { text: '' },
      { text: "// Function declaration — fully hoisted", lineIdx: 3, color: '#10B981' },
      { text: "function sayHello() {", lineIdx: 4 },
      { text: "  return 'Hello!';", lineIdx: 4 },
      { text: "}", lineIdx: 4 },
      { text: '' },
      { text: "// Function expression — only var hoisted!", lineIdx: 8, color: '#EF4444' },
      { text: "var sayBye = function() {", lineIdx: 9 },
      { text: "  return 'Bye!';", lineIdx: 9 },
      { text: "};", lineIdx: 9 },
    ],
    declarations: [
      {
        id: 'sayHello',
        kind: 'function',
        name: 'sayHello',
        value: "function() { return 'Hello!'; }",
        hoistStatus: 'full',
        hoistDisplay: "function sayHello() { ... } // fully hoisted!",
        tdz: false,
      },
      {
        id: 'sayBye',
        kind: 'var',
        name: 'sayBye',
        value: 'function() { ... }',
        hoistStatus: 'hoisted',
        hoistDisplay: 'var sayBye = undefined // only var hoisted!',
        tdz: false,
      },
    ],
    executionSteps: [
      {
        lineIdx: 0,
        output: "'Hello!'",
        color: '#10B981',
        explanation: "sayHello() works! Function declarations are fully hoisted.",
      },
      {
        lineIdx: 1,
        output: 'TypeError: sayBye is not a function',
        color: '#EF4444',
        explanation: "sayBye is undefined (var hoisted), not a function yet — TypeError!",
      },
      {
        lineIdx: 9,
        output: "sayBye = function() {...}",
        color: '#06B6D4',
        explanation: "Now sayBye gets the function value.",
      },
    ],
  },
  {
    id: 3,
    name: 'Hoisting in Functions',
    codeLines: [
      { text: "function outer() {", lineIdx: 0 },
      { text: "  console.log(x); // ??", lineIdx: 1 },
      { text: "  var x = 100;" , lineIdx: 2 },
      { text: "  console.log(x); // ??", lineIdx: 3 },
      { text: "}" },
      { text: '' },
      { text: "outer();" },
      { text: "// var hoisting happens PER FUNCTION scope" },
    ],
    declarations: [
      {
        id: 'x_outer',
        kind: 'var',
        name: 'x (in outer)',
        value: '100',
        hoistStatus: 'hoisted',
        hoistDisplay: 'var x = undefined // hoisted to top of outer()',
        tdz: false,
      },
    ],
    executionSteps: [
      {
        lineIdx: 1,
        output: 'undefined',
        color: '#F59E0B',
        explanation: "x is hoisted to the TOP of outer() function — not global. Value is undefined until line 2.",
      },
      {
        lineIdx: 2,
        output: 'x = 100',
        color: '#06B6D4',
        explanation: "Now x gets value 100 in outer's scope.",
      },
      {
        lineIdx: 3,
        output: '100',
        color: '#10B981',
        explanation: "Now x = 100 — after initialization.",
      },
    ],
  },
]

// ─── Declaration Card ─────────────────────────────────────────────────────────

function DeclarationCard({
  decl,
  phase,
  animDelay,
}: {
  decl: Declaration
  phase: Phase
  animDelay: number
}) {
  const kindColors: Record<string, string> = {
    var: '#F59E0B',
    let: '#10B981',
    const: '#06B6D4',
    function: '#7C3AED',
  }
  const color = kindColors[decl.kind]

  return (
    <motion.div
      className="rounded-xl border-2 p-3"
      initial={{ opacity: 0, y: 12 }}
      animate={
        phase !== 'none'
          ? {
              opacity: 1,
              y: 0,
              borderColor: decl.tdz && phase === 'creation' ? '#EF4444' : color,
              background: decl.tdz && phase === 'creation' ? 'rgba(239,68,68,0.08)' : `${color}08`,
            }
          : { opacity: 0.3, y: 0, borderColor: 'rgba(255,255,255,0.1)', background: 'transparent' }
      }
      transition={{ duration: 0.4, delay: animDelay }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded"
          style={{ background: `${color}25`, color }}
        >
          {decl.kind}
        </span>
        <span className="font-mono text-sm font-bold" style={{ color }}>
          {decl.name}
        </span>
        {decl.tdz && phase === 'creation' && (
          <span className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full bg-[rgba(239,68,68,0.2)] text-[#EF4444]">
            TDZ
          </span>
        )}
        {decl.hoistStatus === 'full' && phase === 'creation' && (
          <span className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full bg-[rgba(16,185,129,0.2)] text-[#10B981]">
            FULL
          </span>
        )}
      </div>
      <div className="font-mono text-xs" style={{ color: decl.tdz ? '#EF4444' : '#A1A1AA' }}>
        {phase !== 'none' ? decl.hoistDisplay : `${decl.kind} ${decl.name} = ${decl.value}`}
      </div>
      {decl.tdz && phase === 'creation' && (
        <motion.div
          className="mt-2 rounded px-2 py-1 text-[10px] font-mono text-[#EF4444]"
          style={{ background: 'rgba(239,68,68,0.12)', border: '1px dashed rgba(239,68,68,0.4)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          ⚠️ Temporal Dead Zone — do not access!
        </motion.div>
      )}
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HoistingVisualizer() {
  const [exampleIdx, setExampleIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('none')
  const [currentStepIdx, setCurrentStepIdx] = useState(-1)
  const [executedSteps, setExecutedSteps] = useState<ExecutionStep[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(0.5)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const example = EXAMPLES[exampleIdx]

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setPhase('none')
    setCurrentStepIdx(-1)
    setExecutedSteps([])
    setIsRunning(false)
  }, [])

  const simulate = useCallback(() => {
    reset()
    const delay = 800 / speed

    setTimeout(() => {
      setPhase('creation')
    }, 200)

    setTimeout(() => {
      setPhase('execution')
      setIsRunning(true)
      let stepIdx = 0
      intervalRef.current = setInterval(() => {
        if (stepIdx >= example.executionSteps.length) {
          clearInterval(intervalRef.current!)
          setIsRunning(false)
          return
        }
        const step = example.executionSteps[stepIdx]
        setCurrentStepIdx(step.lineIdx)
        setExecutedSteps((prev) => [...prev, step])
        stepIdx++
      }, delay)
    }, delay * 2)
  }, [reset, speed, example.executionSteps])

  const stepForward = useCallback(() => {
    if (phase === 'none') {
      setPhase('creation')
      return
    }
    if (phase === 'creation') {
      setPhase('execution')
      return
    }
    const nextIdx = executedSteps.length
    if (nextIdx >= example.executionSteps.length) return
    const step = example.executionSteps[nextIdx]
    setCurrentStepIdx(step.lineIdx)
    setExecutedSteps((prev) => [...prev, step])
  }, [phase, executedSteps.length, example.executionSteps])

  return (
    <div className="w-full text-[#F5F5F7]">

      {/* Example selector + speed */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div
          className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 flex-1"
          style={{ background: 'rgba(26,26,38,0.8)' }}
        >
          <label className="block text-xs font-mono text-[#A1A1AA] mb-2 uppercase tracking-wider">
            Example
          </label>
          <select
            value={exampleIdx}
            onChange={(e) => { setExampleIdx(Number(e.target.value)); reset() }}
            className="w-full bg-[#12121A] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#7C3AED] transition-colors"
          >
            {EXAMPLES.map((ex, i) => (
              <option key={ex.id} value={i}>{i + 1}. {ex.name}</option>
            ))}
          </select>
        </div>

        <div
          className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 flex items-end gap-3"
          style={{ background: 'rgba(26,26,38,0.8)' }}
        >
          <button
            onClick={simulate}
            disabled={isRunning}
            className="py-2 px-5 rounded-lg text-sm font-semibold transition-all disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
          >
            {isRunning ? 'Simulating…' : '▶ Simulate'}
          </button>
          <button
            onClick={stepForward}
            disabled={isRunning}
            className="py-2 px-4 rounded-lg text-sm font-semibold border transition-all disabled:opacity-40"
            style={{ background: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.5)', color: '#10B981' }}
          >
            Step →
          </button>
          <button
            onClick={reset}
            className="py-2 px-3 rounded-lg text-sm text-[#A1A1AA] hover:text-[#F5F5F7] bg-[#12121A] border border-[rgba(255,255,255,0.06)] transition-all"
          >
            ↺
          </button>
        </div>
      </div>

      {/* Speed */}
      <div
        className="rounded-xl border border-[rgba(255,255,255,0.08)] px-4 py-3 mb-4"
        style={{ background: 'rgba(26,26,38,0.8)' }}
      >
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-[#A1A1AA] whitespace-nowrap">Speed: <span className="text-[#7C3AED]">{speed}x</span></span>
          <input
            type="range" min={0.25} max={3} step={0.25} value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, #7C3AED ${((speed - 0.25) / 2.75) * 100}%, #22222F ${((speed - 0.25) / 2.75) * 100}%)` }}
          />
          <span className="text-[10px] text-[#71717A]">Slow → Fast</span>
        </div>
      </div>

      {/* Two-phase layout */}
      <div className="grid grid-cols-[38%_62%] gap-4 min-h-[500px]">

        {/* LEFT: Code + Phase indicator */}
        <div className="flex flex-col gap-4">
          {/* Phase pills */}
          <div className="flex gap-3">
            {[
              { label: 'Phase 1: Creation', ph: 'creation' as Phase, color: '#7C3AED' },
              { label: 'Phase 2: Execution', ph: 'execution' as Phase, color: '#10B981' },
            ].map((p) => (
              <div
                key={p.ph}
                className="flex-1 py-2 rounded-lg text-xs font-semibold text-center border transition-all"
                style={{
                  background: phase === p.ph ? `${p.color}20` : 'rgba(26,26,38,0.6)',
                  borderColor: phase === p.ph ? p.color : 'rgba(255,255,255,0.1)',
                  color: phase === p.ph ? p.color : '#71717A',
                  boxShadow: phase === p.ph ? `0 0 12px ${p.color}30` : 'none',
                }}
              >
                {phase === p.ph && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
                )}
                {p.label}
              </div>
            ))}
          </div>

          {/* Code with line highlight */}
          <div
            className="flex-1 rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
            style={{ background: 'rgba(18,18,26,0.9)' }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs font-mono text-[#A1A1AA]">hoisting.js</span>
            </div>
            <div className="p-4">
              <pre className="text-xs font-mono leading-7">
                {example.codeLines.map((line, i) => {
                  const isActive = line.lineIdx !== undefined && currentStepIdx === line.lineIdx && phase === 'execution'
                  return line.text === '' ? (
                    <div key={i}>&nbsp;</div>
                  ) : (
                    <div
                      key={i}
                      className="rounded px-1 transition-all"
                      style={{
                        color: line.color ?? '#A1A1AA',
                        background: isActive ? 'rgba(16,185,129,0.12)' : 'transparent',
                        borderLeft: isActive ? '2px solid #10B981' : '2px solid transparent',
                        paddingLeft: isActive ? '6px' : '8px',
                      }}
                    >
                      {line.text}
                    </div>
                  )
                })}
              </pre>
            </div>
          </div>
        </div>

        {/* RIGHT: Two phases side by side */}
        <div className="flex flex-col gap-4">
          {/* Creation phase */}
          <div
            className="rounded-xl border-2 p-4 flex-1"
            style={{
              borderColor: phase === 'creation' ? '#7C3AED' : phase === 'execution' ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.08)',
              background: 'rgba(18,18,26,0.9)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: phase !== 'none' ? '#7C3AED' : '#71717A' }}
              />
              <span className="font-semibold text-sm" style={{ color: phase !== 'none' ? '#7C3AED' : '#71717A' }}>
                Phase 1: Creation Phase
              </span>
              <span className="text-xs text-[#71717A]">— before any code runs</span>
            </div>
            <p className="text-xs text-[#71717A] mb-3">
              JS engine scans code and sets up memory:
            </p>
            <div className="space-y-2">
              {example.declarations.map((decl, i) => (
                <DeclarationCard
                  key={decl.id}
                  decl={decl}
                  phase={phase}
                  animDelay={i * 0.15}
                />
              ))}
            </div>
          </div>

          {/* Execution phase output */}
          <div
            className="rounded-xl border-2 p-4"
            style={{
              borderColor: phase === 'execution' ? '#10B981' : 'rgba(255,255,255,0.08)',
              background: 'rgba(18,18,26,0.9)',
              minHeight: '160px',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: phase === 'execution' ? '#10B981' : '#71717A' }}
              />
              <span className="font-semibold text-sm" style={{ color: phase === 'execution' ? '#10B981' : '#71717A' }}>
                Phase 2: Execution Phase
              </span>
              <span className="text-xs text-[#71717A]">— runs line by line</span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <AnimatePresence>
                {executedSteps.length === 0 ? (
                  <p className="text-[#71717A] text-sm">Execution output yahan aayega...</p>
                ) : (
                  executedSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="rounded-lg p-2 border"
                      style={{
                        background: `${step.color}10`,
                        borderColor: `${step.color}30`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#71717A]">›</span>
                        <span style={{ color: step.color }} className="font-semibold">
                          {step.output}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#71717A] leading-relaxed">{step.explanation}</p>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div
        className="rounded-xl border border-[rgba(255,255,255,0.08)] px-4 py-3 mt-4"
        style={{ background: 'rgba(26,26,38,0.8)' }}
      >
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {[
            { color: '#F59E0B', label: 'var — hoisted as undefined' },
            { color: '#EF4444', label: 'let/const — TDZ (Temporal Dead Zone)' },
            { color: '#7C3AED', label: 'function — fully hoisted (body included)' },
            { color: '#10B981', label: 'Execution — line by line' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
              <span className="text-[10px] font-mono text-[#A1A1AA]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
