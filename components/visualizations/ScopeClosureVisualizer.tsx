'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScopeVar {
  name: string
  value: string
  type: 'var' | 'let' | 'const' | 'function'
}

interface ScopeBox {
  id: string
  label: string
  icon: string
  color: string
  borderColor: string
  bgColor: string
  vars: ScopeVar[]
}

interface LookupStep {
  scopeId: string
  found: boolean
  value?: string
}

interface Example {
  id: number
  name: string
  description: string
  scopes: ScopeBox[]
  lookupTargets: { name: string; startScope: string }[]
  codeLines: { text: string; color?: string; indent?: number }[]
}

// ─── Examples Data ────────────────────────────────────────────────────────────

const EXAMPLES: Example[] = [
  {
    id: 1,
    name: 'Global + Function Scope',
    description: 'Basic scope chain — inner function can access outer variables',
    codeLines: [
      { text: "var globalVar = 'I am global';", color: '#06B6D4' },
      { text: '' },
      { text: 'function outer() {' },
      { text: "  var outerVar = 'I am outer';", color: '#7C3AED', indent: 1 },
      { text: '' },
      { text: '  function inner() {', indent: 1 },
      { text: "    var innerVar = 'I am inner';", color: '#10B981', indent: 2 },
      { text: '    console.log(innerVar);  // own scope', indent: 2 },
      { text: '    console.log(outerVar);  // outer scope', indent: 2 },
      { text: '    console.log(globalVar); // global scope', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '  inner();', indent: 1 },
      { text: '}' },
    ],
    scopes: [
      {
        id: 'global',
        label: 'Global Scope',
        icon: '🌍',
        color: '#06B6D4',
        borderColor: 'rgba(6,182,212,0.6)',
        bgColor: 'rgba(6,182,212,0.06)',
        vars: [
          { name: 'globalVar', value: "'I am global'", type: 'var' },
          { name: 'outer', value: 'function', type: 'function' },
        ],
      },
      {
        id: 'outer',
        label: 'outer() Function Scope',
        icon: '📦',
        color: '#7C3AED',
        borderColor: 'rgba(124,58,237,0.6)',
        bgColor: 'rgba(124,58,237,0.06)',
        vars: [
          { name: 'outerVar', value: "'I am outer'", type: 'var' },
          { name: 'inner', value: 'function', type: 'function' },
        ],
      },
      {
        id: 'inner',
        label: 'inner() Function Scope',
        icon: '🔷',
        color: '#10B981',
        borderColor: 'rgba(16,185,129,0.6)',
        bgColor: 'rgba(16,185,129,0.06)',
        vars: [{ name: 'innerVar', value: "'I am inner'", type: 'var' }],
      },
    ],
    lookupTargets: [
      { name: 'innerVar', startScope: 'inner' },
      { name: 'outerVar', startScope: 'inner' },
      { name: 'globalVar', startScope: 'inner' },
    ],
  },
  {
    id: 2,
    name: 'Block Scope (let vs var)',
    description: 'var leaks out of blocks, let stays inside',
    codeLines: [
      { text: 'function testScope() {' },
      { text: '  var varX = 1;    // function scoped', color: '#F59E0B', indent: 1 },
      { text: '  let letY = 2;    // block scoped', color: '#10B981', indent: 1 },
      { text: '' },
      { text: '  if (true) {', indent: 1 },
      { text: '    var varX = 99;  // SAME variable!', color: '#EF4444', indent: 2 },
      { text: '    let letY = 99;  // NEW variable (block)', color: '#10B981', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '' },
      { text: '  console.log(varX); // 99 (leaked!)', color: '#EF4444', indent: 1 },
      { text: '  console.log(letY); // 2 (safe!)', color: '#10B981', indent: 1 },
      { text: '}' },
    ],
    scopes: [
      {
        id: 'global',
        label: 'Global Scope',
        icon: '🌍',
        color: '#06B6D4',
        borderColor: 'rgba(6,182,212,0.6)',
        bgColor: 'rgba(6,182,212,0.06)',
        vars: [{ name: 'testScope', value: 'function', type: 'function' }],
      },
      {
        id: 'function',
        label: 'testScope() Function Scope',
        icon: '📦',
        color: '#F59E0B',
        borderColor: 'rgba(245,158,11,0.6)',
        bgColor: 'rgba(245,158,11,0.06)',
        vars: [
          { name: 'varX', value: '99 (leaked from block!)', type: 'var' },
          { name: 'letY', value: '2 (safe)', type: 'let' },
        ],
      },
      {
        id: 'block',
        label: 'if { } Block Scope',
        icon: '🔷',
        color: '#10B981',
        borderColor: 'rgba(16,185,129,0.6)',
        bgColor: 'rgba(16,185,129,0.06)',
        vars: [{ name: 'letY', value: '99 (only here)', type: 'let' }],
      },
    ],
    lookupTargets: [
      { name: 'varX', startScope: 'block' },
      { name: 'letY', startScope: 'block' },
    ],
  },
  {
    id: 3,
    name: 'Closure Counter',
    description: 'A function remembers its outer scope even after outer function returns',
    codeLines: [
      { text: 'function makeCounter() {' },
      { text: '  let count = 0;  // closed over!', color: '#7C3AED', indent: 1 },
      { text: '' },
      { text: '  return function() {', indent: 1 },
      { text: '    count++;         // accesses outer count', color: '#10B981', indent: 2 },
      { text: '    return count;', indent: 2 },
      { text: '  };', indent: 1 },
      { text: '}' },
      { text: '' },
      { text: 'const counter = makeCounter();', color: '#06B6D4' },
      { text: '// makeCounter() returned — but count lives on!' },
      { text: 'counter(); // 1', color: '#F59E0B' },
      { text: 'counter(); // 2', color: '#F59E0B' },
      { text: 'counter(); // 3', color: '#F59E0B' },
    ],
    scopes: [
      {
        id: 'global',
        label: 'Global Scope',
        icon: '🌍',
        color: '#06B6D4',
        borderColor: 'rgba(6,182,212,0.6)',
        bgColor: 'rgba(6,182,212,0.06)',
        vars: [
          { name: 'makeCounter', value: 'function', type: 'function' },
          { name: 'counter', value: 'function (closure)', type: 'const' },
        ],
      },
      {
        id: 'closure',
        label: 'Closure Scope (makeCounter)',
        icon: '🔒',
        color: '#7C3AED',
        borderColor: 'rgba(124,58,237,0.6)',
        bgColor: 'rgba(124,58,237,0.06)',
        vars: [{ name: 'count', value: '3 (remembered!)', type: 'let' }],
      },
      {
        id: 'inner',
        label: 'Returned Function Scope',
        icon: '🔷',
        color: '#10B981',
        borderColor: 'rgba(16,185,129,0.6)',
        bgColor: 'rgba(16,185,129,0.06)',
        vars: [],
      },
    ],
    lookupTargets: [{ name: 'count', startScope: 'inner' }],
  },
  {
    id: 4,
    name: 'Loop Bug & Fix',
    description: 'var in loops: prints 3,3,3. let in loops: prints 0,1,2',
    codeLines: [
      { text: '// BUG: var in loop (prints 3,3,3)', color: '#EF4444' },
      { text: 'for (var i = 0; i < 3; i++) {' },
      { text: "  setTimeout(() => console.log(i), 100);", color: '#EF4444', indent: 1 },
      { text: '}' },
      { text: '// i is function-scoped → all callbacks share same i' },
      { text: '' },
      { text: '// FIX: let in loop (prints 0,1,2)', color: '#10B981' },
      { text: 'for (let j = 0; j < 3; j++) {' },
      { text: "  setTimeout(() => console.log(j), 100);", color: '#10B981', indent: 1 },
      { text: '}' },
      { text: '// j is block-scoped → each iteration gets own j' },
    ],
    scopes: [
      {
        id: 'global',
        label: 'Global / Function Scope',
        icon: '🌍',
        color: '#EF4444',
        borderColor: 'rgba(239,68,68,0.6)',
        bgColor: 'rgba(239,68,68,0.06)',
        vars: [{ name: 'i', value: '3 (shared by all callbacks)', type: 'var' }],
      },
      {
        id: 'block0',
        label: 'Block Scope — iteration 0',
        icon: '🔷',
        color: '#10B981',
        borderColor: 'rgba(16,185,129,0.6)',
        bgColor: 'rgba(16,185,129,0.06)',
        vars: [{ name: 'j', value: '0 (own copy!)', type: 'let' }],
      },
      {
        id: 'block1',
        label: 'Block Scope — iteration 1',
        icon: '🔷',
        color: '#10B981',
        borderColor: 'rgba(16,185,129,0.6)',
        bgColor: 'rgba(16,185,129,0.06)',
        vars: [{ name: 'j', value: '1 (own copy!)', type: 'let' }],
      },
      {
        id: 'block2',
        label: 'Block Scope — iteration 2',
        icon: '🔷',
        color: '#10B981',
        borderColor: 'rgba(16,185,129,0.6)',
        bgColor: 'rgba(16,185,129,0.06)',
        vars: [{ name: 'j', value: '2 (own copy!)', type: 'let' }],
      },
    ],
    lookupTargets: [
      { name: 'i', startScope: 'global' },
      { name: 'j', startScope: 'block0' },
    ],
  },
]

// ─── Variable Tag ─────────────────────────────────────────────────────────────

function VarTag({
  v,
  scopeColor,
  isHighlighted,
  onClick,
}: {
  v: ScopeVar
  scopeColor: string
  isHighlighted: boolean
  onClick: () => void
}) {
  const typeColors: Record<string, string> = {
    var: '#F59E0B',
    let: '#10B981',
    const: '#06B6D4',
    function: '#7C3AED',
  }
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition-all text-left"
      style={{
        background: isHighlighted ? `${scopeColor}25` : 'rgba(255,255,255,0.04)',
        borderColor: isHighlighted ? scopeColor : 'rgba(255,255,255,0.1)',
        boxShadow: isHighlighted ? `0 0 12px ${scopeColor}50` : 'none',
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span
        className="text-[9px] font-bold px-1 rounded"
        style={{ background: typeColors[v.type] + '30', color: typeColors[v.type] }}
      >
        {v.type}
      </span>
      <span className="text-[#F5F5F7] font-semibold">{v.name}</span>
      <span className="text-[#71717A]">=</span>
      <span style={{ color: scopeColor }}>{v.value}</span>
    </motion.button>
  )
}

// ─── Lookup Arrow ─────────────────────────────────────────────────────────────

function LookupTrail({
  steps,
  scopes,
  varName,
}: {
  steps: LookupStep[]
  scopes: ScopeBox[]
  varName: string
}) {
  return (
    <div className="mt-3 space-y-1.5">
      <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] mb-2">
        Looking up: <span className="text-[#F5F5F7]">{varName}</span>
      </p>
      {steps.map((step, i) => {
        const scope = scopes.find((s) => s.id === step.scopeId)
        if (!scope) return null
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.35, duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              style={{
                background: step.found ? `${scope.color}30` : 'rgba(239,68,68,0.2)',
                color: step.found ? scope.color : '#EF4444',
                border: `1px solid ${step.found ? scope.color : '#EF4444'}50`,
              }}
            >
              {step.found ? '✓' : i === steps.length - 1 ? '✗' : '→'}
            </div>
            <span className="text-xs text-[#A1A1AA]">
              {scope.icon} <span style={{ color: scope.color }}>{scope.label}</span>
              {step.found && (
                <span className="text-[#10B981] ml-2 font-semibold">
                  — Found! = {step.value}
                </span>
              )}
              {!step.found && i === steps.length - 1 && (
                <span className="text-[#EF4444] ml-2 font-semibold">— ReferenceError!</span>
              )}
              {!step.found && i < steps.length - 1 && (
                <span className="text-[#71717A] ml-2">— not here, going up...</span>
              )}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ScopeClosureVisualizer() {
  const [exampleIdx, setExampleIdx] = useState(0)
  const [lookupSteps, setLookupSteps] = useState<LookupStep[]>([])
  const [lookingFor, setLookingFor] = useState<string | null>(null)
  const [highlightedVar, setHighlightedVar] = useState<string | null>(null)
  const [speed, setSpeed] = useState(0.5)

  const example = EXAMPLES[exampleIdx]

  const handleLookup = useCallback(
    (targetName: string, startScopeId: string) => {
      setLookingFor(targetName)
      setHighlightedVar(targetName)
      setLookupSteps([])

      const scopes = example.scopes
      const startIdx = scopes.findIndex((s) => s.id === startScopeId)
      if (startIdx === -1) return

      const delay = 400 / speed
      const stepsToAnimate: LookupStep[] = []

      for (let i = startIdx; i < scopes.length; i++) {
        const scope = scopes[i]
        const found = scope.vars.some((v) => v.name === targetName)
        const foundVar = scope.vars.find((v) => v.name === targetName)
        stepsToAnimate.push({
          scopeId: scope.id,
          found,
          value: foundVar?.value,
        })
        if (found) break
      }

      // If not found at all, add a final "not found" marker
      const everFound = stepsToAnimate.some((s) => s.found)
      if (!everFound && stepsToAnimate.length === scopes.length - startIdx) {
        // already covers all scopes
      }

      stepsToAnimate.forEach((step, i) => {
        setTimeout(() => {
          setLookupSteps((prev) => [...prev, step])
        }, i * delay)
      })

      setTimeout(() => setHighlightedVar(null), stepsToAnimate.length * delay + 800)
    },
    [example.scopes, speed]
  )

  const reset = useCallback(() => {
    setLookupSteps([])
    setLookingFor(null)
    setHighlightedVar(null)
  }, [])

  return (
    <div className="w-full text-[#F5F5F7]">
      <div className="grid grid-cols-[40%_60%] gap-4 min-h-[620px]">

        {/* ── LEFT: Code + Controls ── */}
        <div className="flex flex-col gap-4">

          {/* Example selector */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
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
            <p className="mt-2 text-xs text-[#71717A]">{example.description}</p>
          </div>

          {/* Code panel */}
          <div
            className="flex-1 rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
            style={{ background: 'rgba(18,18,26,0.9)' }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs font-mono text-[#A1A1AA]">scope-example.js</span>
            </div>
            <div className="p-4 overflow-auto">
              <pre className="text-xs font-mono leading-7">
                {example.codeLines.map((line, i) =>
                  line.text === '' ? (
                    <div key={i}>&nbsp;</div>
                  ) : (
                    <div
                      key={i}
                      style={{
                        color: line.color ?? '#A1A1AA',
                        paddingLeft: `${(line.indent ?? 0) * 16}px`,
                      }}
                    >
                      {line.text}
                    </div>
                  )
                )}
              </pre>
            </div>
          </div>

          {/* Variable lookup buttons */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-3">
              Access Variable (click to trace lookup)
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {example.lookupTargets.map((t) => (
                <motion.button
                  key={t.name + t.startScope}
                  onClick={() => handleLookup(t.name, t.startScope)}
                  className="px-3 py-1.5 rounded-lg text-sm font-mono font-semibold border transition-all"
                  style={{
                    background: 'rgba(124,58,237,0.15)',
                    borderColor: 'rgba(124,58,237,0.5)',
                    color: '#7C3AED',
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {t.name}
                  <span className="text-[#71717A] ml-1 text-[10px]">from {t.startScope}</span>
                </motion.button>
              ))}
            </div>

            <button
              onClick={reset}
              className="w-full py-1.5 rounded-lg text-sm text-[#A1A1AA] hover:text-[#F5F5F7] bg-[#12121A] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)] transition-all"
            >
              ↺ Reset
            </button>

            {/* Speed */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-[#A1A1AA] mb-1">
                <span>Animation Speed</span>
                <span className="font-mono text-[#7C3AED]">{speed}x</span>
              </div>
              <input
                type="range" min={0.25} max={3} step={0.25} value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #7C3AED ${((speed - 0.25) / 2.75) * 100}%, #22222F ${((speed - 0.25) / 2.75) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-[10px] text-[#71717A] mt-1">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Scope Visualization ── */}
        <div className="flex flex-col gap-4">

          {/* Nested scope boxes */}
          <div
            className="flex-1 rounded-xl border border-[rgba(255,255,255,0.08)] p-5 relative overflow-auto"
            style={{ background: 'rgba(18,18,26,0.9)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Scope Chain Visualization
              </span>
              <span className="text-xs text-[#71717A]">Click a variable to trace lookup</span>
            </div>

            {/* Nested boxes — rendered from outermost to innermost */}
            <div className="relative">
              {example.scopes.map((scope, idx) => (
                <motion.div
                  key={scope.id}
                  className="rounded-xl border-2 p-4 mb-0"
                  style={{
                    borderColor: scope.borderColor,
                    background: scope.bgColor,
                    marginLeft: `${idx * 16}px`,
                    marginTop: idx === 0 ? 0 : -8,
                  }}
                  animate={{
                    boxShadow: lookingFor && lookupSteps.some((s) => s.scopeId === scope.id)
                      ? `0 0 20px ${scope.color}60`
                      : 'none',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Scope header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{scope.icon}</span>
                    <span className="font-semibold text-sm" style={{ color: scope.color }}>
                      {scope.label}
                    </span>
                    <AnimatePresence>
                      {lookupSteps.some((s) => s.scopeId === scope.id) && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="ml-auto flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                          style={{
                            background: lookupSteps.find((s) => s.scopeId === scope.id)?.found
                              ? 'rgba(16,185,129,0.2)'
                              : 'rgba(124,58,237,0.2)',
                            color: lookupSteps.find((s) => s.scopeId === scope.id)?.found
                              ? '#10B981'
                              : '#7C3AED',
                          }}
                        >
                          {lookupSteps.find((s) => s.scopeId === scope.id)?.found
                            ? '✓ Found'
                            : '→ Checking...'}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Variables in this scope */}
                  {scope.vars.length === 0 ? (
                    <p className="text-xs text-[#71717A] italic">No own variables</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {scope.vars.map((v) => (
                        <VarTag
                          key={v.name + scope.id}
                          v={v}
                          scopeColor={scope.color}
                          isHighlighted={highlightedVar === v.name}
                          onClick={() => handleLookup(v.name, scope.id)}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Scope chain arrow label */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#71717A]">
              <span>Outer</span>
              <div className="flex-1 border-t border-dashed border-[rgba(255,255,255,0.1)]" />
              <span className="text-[10px]">scope chain direction (lookup goes this way →)</span>
              <div className="flex-1 border-t border-dashed border-[rgba(255,255,255,0.1)]" />
              <span>Inner</span>
            </div>
          </div>

          {/* Lookup animation panel */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 min-h-[140px]"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <AnimatePresence mode="wait">
              {lookupSteps.length > 0 && lookingFor ? (
                <motion.div
                  key={lookingFor + lookupSteps.length}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  <LookupTrail
                    steps={lookupSteps}
                    scopes={example.scopes}
                    varName={lookingFor}
                  />
                  {/* Final result */}
                  {lookupSteps.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: lookupSteps.length * 0.35 }}
                      className="mt-3 rounded-lg px-3 py-2 border text-xs font-mono"
                      style={
                        lookupSteps[lookupSteps.length - 1].found
                          ? {
                              background: 'rgba(16,185,129,0.1)',
                              borderColor: 'rgba(16,185,129,0.3)',
                              color: '#10B981',
                            }
                          : {
                              background: 'rgba(239,68,68,0.1)',
                              borderColor: 'rgba(239,68,68,0.3)',
                              color: '#EF4444',
                            }
                      }
                    >
                      {lookupSteps[lookupSteps.length - 1].found
                        ? `✓ ${lookingFor} = ${lookupSteps[lookupSteps.length - 1].value}`
                        : `✗ ReferenceError: ${lookingFor} is not defined`}
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full py-4 text-center"
                >
                  <p className="text-sm text-[#71717A]">
                    Kisi variable ko click karo trace dekhne ke liye
                  </p>
                  <p className="text-xs text-[#4A4A5A] mt-1">
                    Arrow dikhayega JS engine kaise scope chain mein variable dhundhta hai
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Legend */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] px-4 py-3"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                { color: '#06B6D4', label: 'Global Scope' },
                { color: '#7C3AED', label: 'Function Scope' },
                { color: '#10B981', label: 'Block Scope' },
                { color: '#F59E0B', label: 'var (function-scoped)' },
                { color: '#EF4444', label: 'ReferenceError' },
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
    </div>
  )
}
