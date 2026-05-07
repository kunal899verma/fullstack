'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Scenario {
  id: number
  title: string
  icon: string
  bad: {
    prompt: string
    why: string
    response: string
  }
  good: {
    prompt: string
    why: string[]
    response: string
  }
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: 'Code Review',
    icon: '🔍',
    bad: {
      prompt: 'Review my code',
      why: 'No context, no criteria, no format specified.',
      response: 'Your code looks fine! You might want to add some error handling and improve performance. Also consider security. Let me know if you need more details!',
    },
    good: {
      prompt: 'Review this Node.js Express route handler for: (1) SQL injection vulnerabilities, (2) missing error handling, (3) performance issues. Format: JSON array [{severity, issue, fix}]',
      why: [
        'Specific language/framework mentioned',
        'Exactly 3 criteria to check',
        'Output format specified (JSON)',
        'Structured output = parseable, actionable',
      ],
      response: '[{"severity":"HIGH","issue":"SQL injection via raw query concatenation","fix":"Use parameterized queries with ?"},{"severity":"MED","issue":"No try-catch around async db call","fix":"Wrap in try-catch, return 500 on error"},{"severity":"LOW","issue":"N+1 query in loop","fix":"Batch with WHERE id IN (...)"}]',
    },
  },
  {
    id: 2,
    title: 'Explanation',
    icon: '📚',
    bad: {
      prompt: 'Explain async',
      why: 'Too vague — what level? What context? How long?',
      response: 'Async programming allows code to run without blocking the main thread. It is used to handle asynchronous operations like file reading and network requests.',
    },
    good: {
      prompt: 'Explain async/await to a developer who knows callbacks but not Promises. Use one real-world analogy and one code example. Keep under 150 words.',
      why: [
        'Target audience specified (knows callbacks)',
        'Output format: analogy + code',
        'Length constraint (≤150 words)',
        'Builds on existing knowledge',
      ],
      response: 'Think of callbacks as ordering food and waiting at the counter. async/await is like getting a buzzer — you go sit down, and the buzzer alerts you when ready.\n\nasync function getUser(id) {\n  const user = await db.find(id); // waits here\n  return user.name; // runs after\n}\n\nInstead of nested callbacks, await pauses execution until the Promise resolves. No callback hell.',
    },
  },
  {
    id: 3,
    title: 'Data Extraction',
    icon: '📊',
    bad: {
      prompt: 'Get the emails',
      why: 'From what text? What format back? Which emails?',
      response: "I found some emails in the text. There's john@example.com and maybe some others. Do you want me to list them all?",
    },
    good: {
      prompt: "Extract all email addresses from the text below. Return ONLY a JSON array: ['email1@example.com', ...]. No explanation, no markdown, just the JSON.",
      why: [
        'Input source defined ("text below")',
        'Output format exact (JSON array)',
        'Negative constraints ("no explanation")',
        'Format precisely specified with example',
      ],
      response: '["alice@company.com","bob.smith@example.org","support@nodemaster.dev","noreply@github.com"]',
    },
  },
  {
    id: 4,
    title: 'Debugging',
    icon: '🐛',
    bad: {
      prompt: 'Fix this bug',
      why: 'What bug? What error? Where is the code?',
      response: "I'd need to see the code and error message to help you fix the bug. Could you share more details?",
    },
    good: {
      prompt: "The following Node.js code throws 'Cannot read property of undefined' at line 15. (1) Explain why this error occurs, (2) Show the fixed code, (3) Explain how to prevent this in future.",
      why: [
        'Exact error message quoted',
        'Line number specified',
        'Three-part structured response requested',
        'Asks for prevention (actionable learning)',
      ],
      response: '1. WHY: res.data is undefined because the API call failed silently — no null check.\n\n2. FIX:\nconst data = res?.data ?? [];\nconst name = data[0]?.name ?? "Unknown";\n\n3. PREVENT: Use optional chaining (?.) and nullish coalescing (??) everywhere. Add Zod schema validation on API responses.',
    },
  },
  {
    id: 5,
    title: 'System Prompt',
    icon: '⚙️',
    bad: {
      prompt: 'You are a helpful assistant',
      why: 'Every AI defaults to this. Zero differentiation.',
      response: 'Sure! I can help you with a wide variety of tasks. What would you like assistance with today? I am here to help with any questions you might have!',
    },
    good: {
      prompt: "You are a senior Node.js developer at a startup. You answer concisely (max 3 paragraphs), include code examples when relevant, and admit uncertainty rather than guessing. You prefer modern ES2022+ syntax.",
      why: [
        'Role defined with seniority level',
        'Length constraint (max 3 paragraphs)',
        'Behavior rules (admit uncertainty)',
        'Technical preferences specified',
      ],
      response: 'I\'ll use ES2022+ syntax and keep answers concise. Quick question: what Node.js version are you targeting? That determines which features are available natively vs needing polyfills.\n\nFor the pattern you\'re describing, I\'d suggest using Array.at(), structuredClone(), and top-level await if your bundler supports it.',
    },
  },
]

const PRINCIPLES = [
  { icon: '🎯', title: 'Be Specific', desc: 'Vague prompt = vague answer. Specificity multiplies quality.', color: '#F97316' },
  { icon: '📐', title: 'Define Format', desc: 'JSON, markdown, bullet points — tell the model exactly what you want back.', color: '#7C3AED' },
  { icon: '🧑‍🤝‍🧑', title: 'Set Context', desc: 'Who are you? What level is the reader? What framework?', color: '#06B6D4' },
  { icon: '📏', title: 'Add Constraints', desc: 'Max words, max paragraphs, "no explanation" — constraints improve focus.', color: '#F59E0B' },
  { icon: '🔢', title: 'Number Steps', desc: '(1) Do X, (2) Do Y, (3) Do Z — numbered tasks get completed fully.', color: '#10B981' },
  { icon: '🚫', title: 'Negative Rules', desc: '"No markdown", "no guessing", "no hedging" — what NOT to do matters.', color: '#EF4444' },
]

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PromptQualityVisualizer() {
  const [activeTab, setActiveTab] = useState(0)
  const [showResponse, setShowResponse] = useState<{ [k: number]: boolean }>({})

  const scenario = SCENARIOS[activeTab]

  const toggleResponse = (id: number) => {
    setShowResponse((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="w-full text-[#F5F5F7] space-y-5">

      {/* ── Scenario tabs ── */}
      <div className="flex gap-2 flex-wrap">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveTab(i)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: activeTab === i ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.04)',
              color: activeTab === i ? '#F97316' : '#71717A',
              border: activeTab === i ? '1.5px solid rgba(249,115,22,0.5)' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span>{s.icon}</span>
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {/* ── Side-by-side comparison ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* BAD prompt */}
          <div
            className="rounded-xl border p-5 space-y-4"
            style={{ background: 'rgba(239,68,68,0.04)', borderColor: 'rgba(239,68,68,0.35)' }}
          >
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444' }}
              >
                ❌ BAD PROMPT
              </span>
            </div>

            <div
              className="p-4 rounded-lg font-mono text-sm text-[#F5F5F7] leading-relaxed"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px dashed rgba(239,68,68,0.3)' }}
            >
              &ldquo;{scenario.bad.prompt}&rdquo;
            </div>

            {/* Vague indicator */}
            <div
              className="p-3 rounded-lg flex items-start gap-2"
              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}
            >
              <span className="text-lg flex-shrink-0">😶‍🌫️</span>
              <div>
                <p className="text-xs font-semibold text-[#EF4444] mb-1">Too vague — response will be generic</p>
                <p className="text-xs text-[#A1A1AA]">{scenario.bad.why}</p>
              </div>
            </div>

            {/* Show Response toggle */}
            <button
              onClick={() => toggleResponse(scenario.id * 10)}
              className="text-xs font-mono text-[#71717A] hover:text-[#A1A1AA] underline decoration-dotted transition-colors"
            >
              {showResponse[scenario.id * 10] ? '▼ Hide response' : '▶ Show simulated response'}
            </button>

            <AnimatePresence>
              {showResponse[scenario.id * 10] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-lg p-3 text-xs text-[#A1A1AA] font-mono leading-relaxed overflow-hidden"
                  style={{ background: '#0D0D15', border: '1px solid rgba(239,68,68,0.2)' }}
                >
                  <span className="text-[#71717A]">AI: </span>{scenario.bad.response}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* GOOD prompt */}
          <div
            className="rounded-xl border p-5 space-y-4"
            style={{ background: 'rgba(16,185,129,0.04)', borderColor: 'rgba(16,185,129,0.35)' }}
          >
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}
              >
                ✅ GOOD PROMPT
              </span>
            </div>

            <div
              className="p-4 rounded-lg font-mono text-sm text-[#F5F5F7] leading-relaxed"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px dashed rgba(16,185,129,0.3)' }}
            >
              &ldquo;{scenario.good.prompt}&rdquo;
            </div>

            {/* Why it works */}
            <div
              className="p-3 rounded-lg"
              style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <p className="text-xs font-semibold text-[#10B981] mb-2">Why this works:</p>
              <ul className="space-y-1">
                {scenario.good.why.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#A1A1AA]">
                    <span className="text-[#10B981] font-bold flex-shrink-0">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Show Response toggle */}
            <button
              onClick={() => toggleResponse(scenario.id * 10 + 1)}
              className="text-xs font-mono text-[#71717A] hover:text-[#A1A1AA] underline decoration-dotted transition-colors"
            >
              {showResponse[scenario.id * 10 + 1] ? '▼ Hide response' : '▶ Show simulated response'}
            </button>

            <AnimatePresence>
              {showResponse[scenario.id * 10 + 1] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-lg p-3 text-xs text-[#A1A1AA] font-mono leading-relaxed overflow-hidden whitespace-pre-wrap"
                  style={{ background: '#0D0D15', border: '1px solid rgba(16,185,129,0.2)' }}
                >
                  <span className="text-[#71717A]">AI: </span>{scenario.good.response}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── 6 Principles ── */}
      <div
        className="rounded-xl border border-[rgba(255,255,255,0.08)] p-5"
        style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
      >
        <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-4">
          6 Prompt Engineering Principles
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="p-3 rounded-lg flex items-start gap-2"
              style={{
                background: `${p.color}08`,
                border: `1px solid ${p.color}25`,
              }}
            >
              <span className="text-xl flex-shrink-0">{p.icon}</span>
              <div>
                <p className="text-xs font-semibold mb-0.5" style={{ color: p.color }}>{p.title}</p>
                <p className="text-[10px] text-[#71717A] leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
