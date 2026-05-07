'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Scenario {
  name: string
  tokens: string[]
  heads: number[][][]  // [head][row][col]
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SCENARIOS: Scenario[] = [
  {
    name: 'Pronoun Resolution',
    tokens: ['The', 'cat', 'chased', 'it', 'quickly', '.'],
    heads: [
      // Head 1: "it" strongly attends to "cat"
      [
        [0.9, 0.05, 0.02, 0.01, 0.01, 0.01],
        [0.1, 0.75, 0.05, 0.05, 0.03, 0.02],
        [0.05, 0.3, 0.5, 0.1, 0.03, 0.02],
        [0.05, 0.65, 0.15, 0.1, 0.03, 0.02], // "it" → strong to "cat"
        [0.05, 0.1, 0.3, 0.1, 0.4, 0.05],
        [0.02, 0.02, 0.02, 0.02, 0.02, 0.9],
      ],
      // Head 2: positional attention
      [
        [0.7, 0.2, 0.05, 0.02, 0.02, 0.01],
        [0.2, 0.6, 0.1, 0.05, 0.03, 0.02],
        [0.1, 0.2, 0.55, 0.1, 0.03, 0.02],
        [0.05, 0.15, 0.2, 0.5, 0.07, 0.03],
        [0.02, 0.05, 0.1, 0.15, 0.6, 0.08],
        [0.01, 0.02, 0.03, 0.05, 0.09, 0.8],
      ],
      // Head 3: syntactic
      [
        [0.5, 0.3, 0.1, 0.05, 0.03, 0.02],
        [0.3, 0.4, 0.15, 0.08, 0.05, 0.02],
        [0.05, 0.15, 0.5, 0.2, 0.07, 0.03],
        [0.03, 0.4, 0.3, 0.15, 0.08, 0.04],
        [0.02, 0.08, 0.25, 0.3, 0.3, 0.05],
        [0.01, 0.03, 0.05, 0.1, 0.01, 0.8],
      ],
    ],
  },
  {
    name: 'Subject-Verb Agreement',
    tokens: ['The', 'dogs', 'run', 'very', 'fast', '.'],
    heads: [
      // Head 1: "run" attends to "dogs"
      [
        [0.85, 0.08, 0.03, 0.02, 0.01, 0.01],
        [0.1, 0.75, 0.08, 0.04, 0.02, 0.01],
        [0.05, 0.6, 0.25, 0.05, 0.03, 0.02], // "run" → "dogs"
        [0.03, 0.1, 0.4, 0.35, 0.08, 0.04],
        [0.02, 0.05, 0.2, 0.15, 0.5, 0.08],
        [0.01, 0.02, 0.03, 0.04, 0.05, 0.85],
      ],
      [
        [0.65, 0.25, 0.05, 0.03, 0.01, 0.01],
        [0.2, 0.55, 0.15, 0.06, 0.03, 0.01],
        [0.1, 0.25, 0.45, 0.12, 0.06, 0.02],
        [0.05, 0.1, 0.2, 0.5, 0.12, 0.03],
        [0.02, 0.05, 0.1, 0.18, 0.58, 0.07],
        [0.01, 0.02, 0.03, 0.06, 0.08, 0.8],
      ],
      [
        [0.6, 0.3, 0.05, 0.02, 0.02, 0.01],
        [0.25, 0.5, 0.12, 0.07, 0.04, 0.02],
        [0.08, 0.4, 0.35, 0.1, 0.05, 0.02],
        [0.04, 0.12, 0.3, 0.4, 0.1, 0.04],
        [0.02, 0.06, 0.15, 0.2, 0.5, 0.07],
        [0.01, 0.02, 0.03, 0.05, 0.09, 0.8],
      ],
    ],
  },
]

const _COLORS = {
  high: '#7C3AED',
  mid: '#4A2080',
  low: '#1A0A30',
  bg: '#0D0D1A',
}

function interpColor(weight: number): string {
  if (weight > 0.6) return `rgba(124,58,237,${0.4 + weight * 0.6})`
  if (weight > 0.3) return `rgba(100,40,200,${0.2 + weight * 0.5})`
  return `rgba(60,20,120,${0.05 + weight * 0.3})`
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AttentionVisualizer() {
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [headIdx, setHeadIdx] = useState(0)
  const [selectedToken, setSelectedToken] = useState<number | null>(null)

  const scenario = SCENARIOS[scenarioIdx]
  const tokens = scenario.tokens
  const matrix = scenario.heads[headIdx]

  const selectedRow = selectedToken !== null ? matrix[selectedToken] : null
  const maxWeight = selectedRow ? Math.max(...selectedRow) : 1

  // Arc thickness based on attention weight
  const arcThickness = (w: number) => Math.max(1, w * 12)

  return (
    <div className="w-full text-[#F5F5F7] space-y-4">

      {/* ── Controls ── */}
      <div
        className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 flex flex-wrap gap-4 items-center"
        style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-mono text-[#A1A1AA] mb-1.5 uppercase tracking-wider">
            Scenario
          </label>
          <select
            value={scenarioIdx}
            onChange={(e) => { setScenarioIdx(Number(e.target.value)); setSelectedToken(null) }}
            className="w-full bg-[#12121A] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#7C3AED] transition-colors"
          >
            {SCENARIOS.map((s, i) => (
              <option key={i} value={i}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono text-[#A1A1AA] mb-1.5 uppercase tracking-wider">
            Attention Head
          </label>
          <div className="flex gap-2">
            {[0, 1, 2].map((h) => (
              <button
                key={h}
                onClick={() => setHeadIdx(h)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all"
                style={{
                  background: headIdx === h ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.04)',
                  color: headIdx === h ? '#7C3AED' : '#71717A',
                  border: headIdx === h ? '1px solid rgba(124,58,237,0.5)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                Head {h + 1}
              </button>
            ))}
          </div>
        </div>

        <div
          className="px-3 py-2 rounded-lg text-xs text-[#A1A1AA]"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <span className="text-[#7C3AED] font-semibold">Click a token</span> to see its attention
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-4">

        {/* ── LEFT: Heatmap + Arcs ── */}
        <div
          className="rounded-xl border border-[rgba(255,255,255,0.08)] p-5"
          style={{ background: 'rgba(18,18,26,0.9)', backdropFilter: 'blur(12px)' }}
        >
          {/* Token row (clickable) */}
          <div className="mb-4">
            <p className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider mb-2">
              Click a token to highlight its attention row
            </p>
            <div className="flex gap-2 flex-wrap">
              {tokens.map((tok, i) => (
                <motion.button
                  key={i}
                  onClick={() => setSelectedToken(selectedToken === i ? null : i)}
                  whileTap={{ scale: 0.93 }}
                  className="px-3 py-1.5 rounded-lg text-sm font-mono font-semibold transition-all"
                  style={{
                    background: selectedToken === i ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.05)',
                    color: selectedToken === i ? '#7C3AED' : '#F5F5F7',
                    border: selectedToken === i ? '1.5px solid rgba(124,58,237,0.6)' : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: selectedToken === i ? '0 0 12px rgba(124,58,237,0.3)' : 'none',
                  }}
                >
                  {tok}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Heatmap */}
          <div className="overflow-x-auto">
            <div className="min-w-[340px]">
              {/* Column headers */}
              <div className="flex mb-1 ml-16">
                {tokens.map((tok, j) => (
                  <div key={j} className="flex-1 text-center">
                    <span className="text-[9px] font-mono text-[#71717A]">{tok}</span>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {matrix.map((row, i) => {
                const isSelectedRow = selectedToken === i
                return (
                  <div key={i} className="flex items-center mb-0.5">
                    {/* Row label */}
                    <div className="w-16 flex-shrink-0 pr-2">
                      <span
                        className="text-[9px] font-mono truncate"
                        style={{ color: isSelectedRow ? '#7C3AED' : '#71717A' }}
                      >
                        {tokens[i]}
                      </span>
                    </div>
                    {/* Cells */}
                    {row.map((weight, j) => (
                      <motion.div
                        key={j}
                        className="flex-1 aspect-square flex items-center justify-center mx-0.5 rounded"
                        style={{
                          background: interpColor(weight),
                          border: isSelectedRow ? `1px solid rgba(124,58,237,${weight * 0.8})` : '1px solid transparent',
                          minWidth: 28,
                          minHeight: 28,
                        }}
                        animate={{
                          scale: isSelectedRow && weight === maxWeight ? 1.08 : 1,
                        }}
                        title={`${tokens[i]} → ${tokens[j]}: ${(weight * 100).toFixed(1)}%`}
                      >
                        <span
                          className="text-[9px] font-mono font-bold"
                          style={{
                            color: weight > 0.4 ? '#F5F5F7' : '#6B7280',
                            opacity: isSelectedRow ? 1 : weight > 0.3 ? 0.8 : 0.4,
                          }}
                        >
                          {(weight * 100).toFixed(0)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Color legend */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px] text-[#71717A] font-mono">Low</span>
            <div className="flex-1 h-2 rounded-full" style={{ background: 'linear-gradient(to right, #1A0A30, #4A2080, #7C3AED)' }} />
            <span className="text-[10px] text-[#71717A] font-mono">High attention</span>
          </div>

          {/* Attention arcs */}
          {selectedToken !== null && (
            <div className="mt-4">
              <p className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider mb-2">
                Attention Arcs — &ldquo;{tokens[selectedToken]}&rdquo; is attending to:
              </p>
              <svg
                viewBox={`0 0 ${tokens.length * 60 + 20} 80`}
                className="w-full"
                style={{ overflow: 'visible' }}
              >
                {tokens.map((tok, i) => {
                  const x = 30 + i * 60
                  return (
                    <text key={i} x={x} y={70} textAnchor="middle" fill={i === selectedToken ? '#7C3AED' : '#A1A1AA'} fontSize={10} fontFamily="monospace">
                      {tok}
                    </text>
                  )
                })}
                {selectedRow && selectedRow.map((weight, j) => {
                  if (weight < 0.05 || j === selectedToken) return null
                  const x1 = 30 + selectedToken * 60
                  const x2 = 30 + j * 60
                  const midX = (x1 + x2) / 2
                  const arcHeight = Math.abs(x2 - x1) * 0.4
                  return (
                    <motion.path
                      key={j}
                      d={`M ${x1} 60 Q ${midX} ${60 - arcHeight} ${x2} 60`}
                      fill="none"
                      stroke="#7C3AED"
                      strokeWidth={arcThickness(weight)}
                      strokeOpacity={weight}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: j * 0.05 }}
                    />
                  )
                })}
                {/* Self-attention dot */}
                {selectedRow && (
                  <motion.circle
                    cx={30 + selectedToken * 60}
                    cy={60}
                    r={arcThickness(selectedRow[selectedToken]) / 2 + 2}
                    fill="#7C3AED"
                    fillOpacity={selectedRow[selectedToken]}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                )}
              </svg>
            </div>
          )}
        </div>

        {/* ── RIGHT: Attention breakdown ── */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {selectedToken !== null && selectedRow ? (
              <motion.div
                key={selectedToken}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border p-5"
                style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.35)' }}
              >
                <p className="text-xs font-mono text-[#7C3AED] uppercase tracking-wider mb-3">
                  &ldquo;{tokens[selectedToken]}&rdquo; attention weights
                </p>
                <div className="space-y-2">
                  {selectedRow
                    .map((w, j) => ({ w, j, tok: tokens[j] }))
                    .sort((a, b) => b.w - a.w)
                    .map(({ w, j, tok }) => (
                      <div key={j} className="flex items-center gap-2">
                        <span className="text-xs font-mono w-20 flex-shrink-0" style={{ color: j === selectedToken ? '#F59E0B' : '#F5F5F7' }}>
                          {tok}{j === selectedToken ? ' (self)' : ''}
                        </span>
                        <div className="flex-1 h-4 bg-[#12121A] rounded-md overflow-hidden">
                          <motion.div
                            className="h-full rounded-md"
                            style={{ background: 'linear-gradient(90deg, #7C3AED, #06B6D4)' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${w * 100}%` }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                        <span className="text-xs font-mono w-12 text-right text-[#A1A1AA]">
                          {(w * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                </div>
                <div
                  className="mt-3 p-3 rounded-lg text-xs text-[#A1A1AA] leading-relaxed"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  Token &ldquo;{tokens[selectedToken]}&rdquo; pays{' '}
                  <span className="text-[#7C3AED] font-semibold">
                    {(Math.max(...selectedRow) * 100).toFixed(0)}%
                  </span>{' '}
                  attention to &ldquo;{tokens[selectedRow.indexOf(Math.max(...selectedRow))]}&rdquo; —
                  {scenarioIdx === 0 && selectedToken === 3
                    ? ' correctly identifying the pronoun referent!'
                    : scenarioIdx === 1 && selectedToken === 2
                    ? ' identifying the subject for agreement!'
                    : ' this is how transformers build context.'}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-[rgba(255,255,255,0.08)] p-5 text-center"
                style={{ background: 'rgba(26,26,38,0.8)' }}
              >
                <p className="text-[#71717A] text-sm">Click a token above to see its attention weights</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Explanation */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 space-y-3"
            style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">How Attention Works</p>
            {[
              { label: 'Query (Q)', desc: 'What am I looking for?', color: '#F97316' },
              { label: 'Key (K)', desc: 'What do I contain?', color: '#06B6D4' },
              { label: 'Value (V)', desc: 'What do I contribute?', color: '#7C3AED' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded flex-shrink-0"
                  style={{ background: `${item.color}18`, color: item.color }}
                >
                  {item.label}
                </span>
                <p className="text-xs text-[#A1A1AA]">{item.desc}</p>
              </div>
            ))}
            <div
              className="p-2 rounded-lg font-mono text-xs"
              style={{ background: 'rgba(255,255,255,0.04)', color: '#71717A' }}
            >
              Attention(Q,K,V) = softmax(QK&#7488; / √d_k) · V
            </div>
          </div>

          {/* Head description */}
          <div
            className="rounded-xl border p-4"
            style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.25)' }}
          >
            <p className="text-xs font-mono text-[#7C3AED] uppercase tracking-wider mb-2">
              Head {headIdx + 1} focuses on:
            </p>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              {headIdx === 0
                ? 'Semantic relationships — pronoun resolution, coreference, meaning connections'
                : headIdx === 1
                ? 'Positional patterns — adjacent tokens, sentence structure, local context'
                : 'Syntactic roles — subject-verb, modifier-noun, grammatical agreement'}
            </p>
            <p className="text-[10px] text-[#71717A] mt-2">
              Real GPT models have 96 heads per layer, each learning different patterns automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
