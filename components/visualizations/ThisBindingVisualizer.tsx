'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

type BindingType = 'default' | 'implicit' | 'explicit' | 'arrow'

interface ObjectBox {
  id: string
  label: string
  color: string
  props: { key: string; value: string }[]
}

interface Tab {
  id: BindingType
  label: string
  icon: string
  color: string
  rule: string
  description: string
  objects: ObjectBox[]
  codeLines: { text: string; color?: string }[]
  callOptions?: { label: string; method: string; targetId: string; output: string }[]
}

// ─── Tabs Data ────────────────────────────────────────────────────────────────

const TABS: Tab[] = [
  {
    id: 'default',
    label: 'Default',
    icon: '🌐',
    color: '#A1A1AA',
    rule: 'Rule 1: Default Binding',
    description:
      'When a function is called as a plain function (no object, no call/apply/bind), this = global object (window/global). In strict mode: this = undefined.',
    codeLines: [
      { text: "function sayName() {" },
      { text: "  console.log(this.name); // 'this' = ???", color: '#F59E0B' },
      { text: "}" },
      { text: '' },
      { text: "// Called as plain function — no context" },
      { text: "sayName();", color: '#A1A1AA' },
      { text: "// Non-strict: this = global object", color: '#71717A' },
      { text: "// Strict mode: this = undefined → TypeError!", color: '#EF4444' },
    ],
    objects: [
      {
        id: 'global',
        label: 'Global Object (window/global)',
        color: '#A1A1AA',
        props: [
          { key: 'name', value: '"" (empty)' },
          { key: 'setTimeout', value: 'function' },
          { key: '...', value: 'many more' },
        ],
      },
    ],
    callOptions: [
      {
        label: 'sayName() — non-strict',
        method: 'plain',
        targetId: 'global',
        output: 'this = [Global Object]\nthis.name = "" (empty)',
      },
      {
        label: '"use strict" mode',
        method: 'strict',
        targetId: 'undefined',
        output: 'this = undefined\nTypeError: Cannot read properties of undefined',
      },
    ],
  },
  {
    id: 'implicit',
    label: 'Implicit',
    icon: '📌',
    color: '#06B6D4',
    rule: 'Rule 2: Implicit Binding',
    description:
      'When a function is called as a METHOD of an object (obj.fn()), this = that object. The object to the LEFT of the dot is this.',
    codeLines: [
      { text: "const user = {" },
      { text: "  name: 'Rahul',", color: '#06B6D4' },
      { text: "  greet() {" },
      { text: "    return this.name; // 'this' = user", color: '#10B981' },
      { text: "  }" },
      { text: "}" },
      { text: '' },
      { text: "user.greet(); // 'Rahul'", color: '#10B981' },
      { text: "// this = user (object to left of dot)", color: '#71717A' },
      { text: '' },
      { text: "// ⚠️ Lost binding bug:", color: '#F59E0B' },
      { text: "const fn = user.greet;", color: '#F59E0B' },
      { text: "fn(); // undefined! (no object context)", color: '#EF4444' },
    ],
    objects: [
      {
        id: 'user',
        label: 'user object',
        color: '#06B6D4',
        props: [
          { key: 'name', value: '"Rahul"' },
          { key: 'greet', value: 'function' },
        ],
      },
    ],
    callOptions: [
      {
        label: 'user.greet()',
        method: 'method',
        targetId: 'user',
        output: "this = user\nthis.name = 'Rahul'",
      },
      {
        label: 'const fn = user.greet; fn()',
        method: 'lost',
        targetId: 'global',
        output: "this = Global (lost binding!)\nthis.name = undefined",
      },
    ],
  },
  {
    id: 'explicit',
    label: 'Explicit',
    icon: '🎯',
    color: '#7C3AED',
    rule: 'Rule 3: Explicit Binding',
    description:
      '.call(obj, ...args), .apply(obj, [...args]), .bind(obj) — explicitly set what this should be. You decide.',
    codeLines: [
      { text: "function greet(greeting) {" },
      { text: "  return `${greeting}, ${this.name}!`;", color: '#7C3AED' },
      { text: "}" },
      { text: '' },
      { text: "const rahul = { name: 'Rahul' };" },
      { text: "const priya = { name: 'Priya' };" },
      { text: '' },
      { text: "greet.call(rahul, 'Hello');", color: '#7C3AED' },
      { text: "// this = rahul → 'Hello, Rahul!'", color: '#71717A' },
      { text: '' },
      { text: "greet.apply(priya, ['Namaste']);", color: '#10B981' },
      { text: "// this = priya → 'Namaste, Priya!'", color: '#71717A' },
      { text: '' },
      { text: "const greetRahul = greet.bind(rahul);", color: '#F59E0B' },
      { text: "greetRahul('Hi'); // 'Hi, Rahul!' (always)", color: '#71717A' },
    ],
    objects: [
      {
        id: 'rahul',
        label: 'rahul object',
        color: '#7C3AED',
        props: [{ key: 'name', value: '"Rahul"' }],
      },
      {
        id: 'priya',
        label: 'priya object',
        color: '#10B981',
        props: [{ key: 'name', value: '"Priya"' }],
      },
    ],
    callOptions: [
      {
        label: 'greet.call(rahul)',
        method: 'call',
        targetId: 'rahul',
        output: "this = rahul\nResult: 'Hello, Rahul!'",
      },
      {
        label: 'greet.apply(priya)',
        method: 'apply',
        targetId: 'priya',
        output: "this = priya\nResult: 'Namaste, Priya!'",
      },
      {
        label: 'greet.bind(rahul)()',
        method: 'bind',
        targetId: 'rahul',
        output: "this = rahul (hard bound)\nAlways 'Rahul' — cannot override!",
      },
    ],
  },
  {
    id: 'arrow',
    label: 'Arrow',
    icon: '➡️',
    color: '#F59E0B',
    rule: 'Rule 4: Arrow Functions — Lexical this',
    description:
      'Arrow functions do NOT have their own this. They inherit this from the ENCLOSING SCOPE at definition time (not call time). Cannot be changed with call/apply/bind.',
    codeLines: [
      { text: "const obj = {" },
      { text: "  name: 'Test'," },
      { text: '' },
      { text: "  arrow: () => {", color: '#EF4444' },
      { text: "    return this.name; // ❌ this = outer scope (global)!", color: '#EF4444' },
      { text: "  }," },
      { text: '' },
      { text: "  regular: function() {", color: '#10B981' },
      { text: "    return this.name; // ✓ this = obj", color: '#10B981' },
      { text: "  }," },
      { text: '' },
      { text: "  withTimer() {" },
      { text: "    // Arrow inherits 'this' = obj ✓", color: '#F59E0B' },
      { text: "    setTimeout(() => {", color: '#F59E0B' },
      { text: "      console.log(this.name); // 'Test' ✓", color: '#F59E0B' },
      { text: "    }, 100);" },
      { text: "  }" },
      { text: "}" },
    ],
    objects: [
      {
        id: 'obj',
        label: 'obj object',
        color: '#10B981',
        props: [
          { key: 'name', value: '"Test"' },
          { key: 'arrow', value: '() => ... (inherits outer this)' },
          { key: 'regular', value: 'function() { this = obj }' },
        ],
      },
      {
        id: 'outerscope',
        label: 'Outer / Global Scope',
        color: '#EF4444',
        props: [{ key: 'this.name', value: 'undefined (global)' }],
      },
    ],
    callOptions: [
      {
        label: 'obj.arrow()',
        method: 'arrow',
        targetId: 'outerscope',
        output: 'this = outer scope (NOT obj!)\nthis.name = undefined ❌',
      },
      {
        label: 'obj.regular()',
        method: 'regular',
        targetId: 'obj',
        output: "this = obj\nthis.name = 'Test' ✓",
      },
    ],
  },
]

// ─── Object Box Component ─────────────────────────────────────────────────────

function ObjectBoxCard({
  box,
  isTarget,
  isPointed,
}: {
  box: ObjectBox
  isTarget: boolean
  isPointed: boolean
}) {
  return (
    <motion.div
      className="rounded-xl border-2 p-4"
      animate={{
        borderColor: isPointed ? box.color : isTarget ? box.color + '80' : 'rgba(255,255,255,0.1)',
        background: isPointed ? `${box.color}15` : isTarget ? `${box.color}08` : 'rgba(26,26,38,0.6)',
        boxShadow: isPointed ? `0 0 24px ${box.color}50` : 'none',
        scale: isPointed ? 1.03 : 1,
      }}
      transition={{ duration: 0.35 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: box.color }} />
        <span className="font-mono text-sm font-bold" style={{ color: box.color }}>
          {box.label}
        </span>
        {isPointed && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: `${box.color}30`, color: box.color }}
          >
            ← this
          </motion.span>
        )}
      </div>
      <div className="space-y-1">
        {box.props.map((p) => (
          <div key={p.key} className="flex gap-2 text-xs font-mono">
            <span className="text-[#71717A]">{p.key}:</span>
            <span className="text-[#A1A1AA]">{p.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ThisBindingVisualizer() {
  const [activeTab, setActiveTab] = useState<BindingType>('default')
  const [selectedCall, setSelectedCall] = useState<number | null>(null)
  const [pointedTarget, setPointedTarget] = useState<string | null>(null)
  const [output, setOutput] = useState<string | null>(null)

  const tab = TABS.find((t) => t.id === activeTab)!

  const handleCall = (idx: number) => {
    const option = tab.callOptions?.[idx]
    if (!option) return
    setSelectedCall(idx)
    setPointedTarget(null)
    setOutput(null)

    setTimeout(() => {
      setPointedTarget(option.targetId)
      setOutput(option.output)
    }, 400)
  }

  const resetTab = (tabId: BindingType) => {
    setActiveTab(tabId)
    setSelectedCall(null)
    setPointedTarget(null)
    setOutput(null)
  }

  return (
    <div className="w-full text-[#F5F5F7]">
      {/* Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => resetTab(t.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all"
            style={{
              background: activeTab === t.id ? `${t.color}15` : 'rgba(26,26,38,0.6)',
              borderColor: activeTab === t.id ? t.color : 'rgba(255,255,255,0.1)',
              color: activeTab === t.id ? t.color : '#71717A',
              boxShadow: activeTab === t.id ? `0 0 16px ${t.color}30` : 'none',
            }}
          >
            <span>{t.icon}</span>
            <span>{t.label} Binding</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[45%_55%] gap-4 min-h-[560px]">

        {/* ── LEFT: Code + Controls ── */}
        <div className="flex flex-col gap-4">
          {/* Rule callout */}
          <div
            className="rounded-xl border-2 p-4"
            style={{
              background: `${tab.color}08`,
              borderColor: `${tab.color}50`,
            }}
          >
            <p className="font-bold text-sm mb-1" style={{ color: tab.color }}>
              {tab.icon} {tab.rule}
            </p>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">{tab.description}</p>
          </div>

          {/* Code block */}
          <div
            className="flex-1 rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
            style={{ background: 'rgba(18,18,26,0.9)' }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs font-mono text-[#A1A1AA]">this-binding.js</span>
            </div>
            <div className="p-4 overflow-auto">
              <pre className="text-xs font-mono leading-7">
                {tab.codeLines.map((line, i) =>
                  line.text === '' ? (
                    <div key={i}>&nbsp;</div>
                  ) : (
                    <div key={i} style={{ color: line.color ?? '#A1A1AA' }}>
                      {line.text}
                    </div>
                  )
                )}
              </pre>
            </div>
          </div>

          {/* Call buttons */}
          {tab.callOptions && tab.callOptions.length > 0 && (
            <div
              className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
              style={{ background: 'rgba(26,26,38,0.8)' }}
            >
              <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-3">
                Call Function — Watch this Arrow
              </p>
              <div className="flex flex-col gap-2">
                {tab.callOptions.map((option, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleCall(i)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-mono border-2 transition-all text-left"
                    style={{
                      background:
                        selectedCall === i ? `${tab.color}20` : 'rgba(255,255,255,0.04)',
                      borderColor:
                        selectedCall === i ? tab.color : 'rgba(255,255,255,0.1)',
                      color: selectedCall === i ? tab.color : '#A1A1AA',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: selectedCall === i ? tab.color : 'rgba(255,255,255,0.08)',
                        color: selectedCall === i ? '#000' : '#71717A',
                      }}
                    >
                      {i + 1}
                    </span>
                    {option.label}
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => { setSelectedCall(null); setPointedTarget(null); setOutput(null) }}
                className="w-full mt-3 py-1.5 rounded-lg text-sm text-[#A1A1AA] hover:text-[#F5F5F7] bg-[#12121A] border border-[rgba(255,255,255,0.06)] transition-all"
              >
                ↺ Reset
              </button>
            </div>
          )}
        </div>

        {/* ── RIGHT: this Arrow + Objects ── */}
        <div className="flex flex-col gap-4">
          {/* this pointer visual */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-5"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-4">
              this points to...
            </p>

            {/* Arrow */}
            <div className="flex items-center gap-4 mb-5">
              <div
                className="px-4 py-2 rounded-xl font-mono font-bold text-lg border-2"
                style={{
                  background: `${tab.color}15`,
                  borderColor: tab.color,
                  color: tab.color,
                  boxShadow: `0 0 20px ${tab.color}30`,
                }}
              >
                this
              </div>
              <motion.div
                className="flex-1 flex items-center"
                animate={{ opacity: pointedTarget ? 1 : 0.3 }}
              >
                <div className="flex-1 h-0.5" style={{ background: `${tab.color}60` }} />
                <motion.span
                  className="text-2xl"
                  style={{ color: tab.color }}
                  animate={{ x: pointedTarget ? [0, 6, 0] : 0 }}
                  transition={{ repeat: pointedTarget ? Infinity : 0, duration: 1 }}
                >
                  →
                </motion.span>
              </motion.div>
              <AnimatePresence mode="wait">
                {pointedTarget ? (
                  <motion.div
                    key={pointedTarget}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="px-3 py-2 rounded-xl font-mono text-sm font-bold border-2"
                    style={{
                      background: `${tab.color}20`,
                      borderColor: tab.color,
                      color: tab.color,
                    }}
                  >
                    {pointedTarget === 'undefined'
                      ? 'undefined ❌'
                      : pointedTarget === 'global'
                      ? 'Global Object'
                      : pointedTarget === 'outerscope'
                      ? 'Outer Scope'
                      : tab.objects.find((o) => o.id === pointedTarget)?.label ?? pointedTarget}
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-3 py-2 rounded-xl font-mono text-sm text-[#71717A] border border-[rgba(255,255,255,0.1)]"
                  >
                    ???
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Objects */}
            <div className="space-y-3">
              {tab.objects.map((box) => (
                <ObjectBoxCard
                  key={box.id}
                  box={box}
                  isTarget={pointedTarget === box.id}
                  isPointed={pointedTarget === box.id}
                />
              ))}
            </div>
          </div>

          {/* Output panel */}
          <motion.div
            className="rounded-xl border-2 p-4 min-h-[100px]"
            animate={{
              borderColor: output ? `${tab.color}50` : 'rgba(255,255,255,0.08)',
              background: output ? `${tab.color}08` : 'rgba(26,26,38,0.8)',
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2">
              Output
            </p>
            <AnimatePresence mode="wait">
              {output ? (
                <motion.pre
                  key={output}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-sm font-mono leading-relaxed"
                  style={{ color: tab.color }}
                >
                  {output}
                </motion.pre>
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-[#71717A]"
                >
                  Call a function above to see where this points
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Priority order reminder */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-3">
              Binding Priority (high → low)
            </p>
            <div className="space-y-1.5">
              {[
                { num: 1, label: 'new binding', color: '#EF4444', note: 'new Fn()' },
                { num: 2, label: 'Explicit binding', color: '#7C3AED', note: '.call/.apply/.bind' },
                { num: 3, label: 'Implicit binding', color: '#06B6D4', note: 'obj.fn()' },
                { num: 4, label: 'Default binding', color: '#A1A1AA', note: 'plain fn()' },
                { num: 0, label: 'Arrow (no own this)', color: '#F59E0B', note: 'lexical scope' },
              ].map((item) => (
                <div key={item.num} className="flex items-center gap-2 text-xs">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0"
                    style={{ background: `${item.color}25`, color: item.color }}
                  >
                    {item.num === 0 ? '—' : item.num}
                  </span>
                  <span style={{ color: item.color }} className="font-semibold">{item.label}</span>
                  <span className="text-[#71717A]">{item.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
