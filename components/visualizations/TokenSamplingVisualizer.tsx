'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Token {
  text: string
  baseProb: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE_TOKENS: Token[] = [
  { text: 'runtime', baseProb: 0.35 },
  { text: 'JavaScript', baseProb: 0.22 },
  { text: 'framework', baseProb: 0.15 },
  { text: 'popular', baseProb: 0.12 },
  { text: 'fast', baseProb: 0.08 },
  { text: 'server', baseProb: 0.05 },
  { text: 'good', baseProb: 0.02 },
  { text: 'bad', baseProb: 0.01 },
]

function applyTemperature(probs: number[], temp: number): number[] {
  if (temp === 0) {
    const maxIdx = probs.indexOf(Math.max(...probs))
    return probs.map((_, i) => (i === maxIdx ? 1 : 0))
  }
  const logits = probs.map((p) => Math.log(Math.max(p, 1e-10)) / temp)
  const maxLogit = Math.max(...logits)
  const expLogits = logits.map((l) => Math.exp(l - maxLogit))
  const sum = expLogits.reduce((a, b) => a + b, 0)
  return expLogits.map((e) => e / sum)
}

function applyTopK(probs: number[], k: number): { probs: number[]; active: boolean[] } {
  const indexed = probs.map((p, i) => ({ p, i }))
  indexed.sort((a, b) => b.p - a.p)
  const topKIndices = new Set(indexed.slice(0, k).map((x) => x.i))
  const active = probs.map((_, i) => topKIndices.has(i))
  const filtered = probs.map((p, i) => (active[i] ? p : 0))
  const sum = filtered.reduce((a, b) => a + b, 0)
  const normalized = filtered.map((p) => (sum > 0 ? p / sum : 0))
  return { probs: normalized, active }
}

function applyTopP(probs: number[], p: number): { probs: number[]; cumulative: number[] } {
  const indexed = probs.map((prob, i) => ({ prob, i }))
  indexed.sort((a, b) => b.prob - a.prob)

  const cumulative: number[] = new Array(probs.length).fill(0)
  const active = new Array(probs.length).fill(false)
  let cumSum = 0
  for (const item of indexed) {
    cumSum += item.prob
    active[item.i] = true
    cumulative[item.i] = cumSum
    if (cumSum >= p) break
  }

  const filtered = probs.map((prob, i) => (active[i] ? prob : 0))
  const sum = filtered.reduce((a, b) => a + b, 0)
  const normalized = filtered.map((prob) => (sum > 0 ? prob / sum : 0))

  // Build cumulative array in display order
  const displayCumulative = probs.map((_, i) => cumulative[i] || 0)
  return { probs: normalized, cumulative: displayCumulative }
}

function sampleToken(probs: number[]): number {
  const r = Math.random()
  let cumsum = 0
  for (let i = 0; i < probs.length; i++) {
    cumsum += probs[i]
    if (r <= cumsum) return i
  }
  return probs.length - 1
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TokenSamplingVisualizer() {
  const [inputText, setInputText] = useState('Node.js is a')
  const [temperature, setTemperature] = useState(1.0)
  const [topK, setTopK] = useState(8)
  const [topP, setTopP] = useState(1.0)
  const [sampledIndex, setSampledIndex] = useState<number | null>(null)
  const [isSampling, setIsSampling] = useState(false)
  const [activeControl, setActiveControl] = useState<'temp' | 'topk' | 'topp'>('temp')

  // Compute probabilities pipeline
  const tempProbs = applyTemperature(BASE_TOKENS.map((t) => t.baseProb), temperature)
  const { probs: topKProbs, active: topKActive } = applyTopK(tempProbs, topK)
  const { probs: finalProbs, cumulative } = applyTopP(topKProbs, topP)

  const handleSample = useCallback(() => {
    if (isSampling) return
    setIsSampling(true)
    setSampledIndex(null)

    // Animate flicker then pick
    let flickers = 0
    const interval = setInterval(() => {
      setSampledIndex(Math.floor(Math.random() * BASE_TOKENS.length))
      flickers++
      if (flickers >= 8) {
        clearInterval(interval)
        const picked = sampleToken(finalProbs)
        setSampledIndex(picked)
        setIsSampling(false)
      }
    }, 80)
  }, [isSampling, finalProbs])

  const maxProb = Math.max(...finalProbs, 0.001)

  return (
    <div className="w-full text-[#F5F5F7]">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-5">

        {/* ── LEFT: Bar Chart ── */}
        <div
          className="rounded-xl border border-[rgba(255,255,255,0.08)] p-5 flex flex-col gap-4"
          style={{ background: 'rgba(18,18,26,0.9)', backdropFilter: 'blur(12px)' }}
        >
          {/* Input sentence */}
          <div>
            <label className="block text-xs font-mono text-[#A1A1AA] mb-1.5 uppercase tracking-wider">
              Input Sentence
            </label>
            <div className="flex items-center gap-2">
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-[#12121A] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-[#F5F5F7] font-mono focus:outline-none focus:border-[#F97316] transition-colors"
              />
              <span className="text-[#F97316] font-mono text-sm font-bold">▋</span>
            </div>
          </div>

          {/* Bar chart header */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Next Token Probabilities
            </p>
            <p className="text-[10px] text-[#71717A] font-mono">
              {temperature === 0 ? 'Deterministic' : `T=${temperature.toFixed(1)}`}
            </p>
          </div>

          {/* Bars */}
          <div className="space-y-2.5">
            {BASE_TOKENS.map((token, i) => {
              const prob = finalProbs[i]
              const isActive = topKActive[i] && prob > 0
              const isSampled = sampledIndex === i
              const barWidth = isActive ? (prob / maxProb) * 100 : 0

              return (
                <motion.div
                  key={token.text}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isActive ? 1 : 0.25, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  {/* Rank */}
                  <span className="text-[10px] font-mono text-[#71717A] w-4 text-right flex-shrink-0">
                    {i + 1}
                  </span>

                  {/* Token label */}
                  <motion.span
                    className="text-sm font-mono w-24 flex-shrink-0 transition-colors"
                    style={{ color: isSampled ? '#F97316' : isActive ? '#F5F5F7' : '#4A4A5A' }}
                    animate={isSampled ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isSampled && <span className="text-[#F97316] mr-1">★</span>}
                    {token.text}
                  </motion.span>

                  {/* Bar */}
                  <div className="flex-1 h-6 bg-[#12121A] rounded-md overflow-hidden relative">
                    <motion.div
                      className="h-full rounded-md"
                      style={{
                        background: isSampled
                          ? 'linear-gradient(90deg, #F97316, #F59E0B)'
                          : isActive
                          ? 'linear-gradient(90deg, #7C3AED, #06B6D4)'
                          : '#22222F',
                        boxShadow: isSampled ? '0 0 12px rgba(249,115,22,0.5)' : 'none',
                      }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                    {/* Top-P cumulative indicator */}
                    {activeControl === 'topp' && cumulative[i] > 0 && (
                      <div
                        className="absolute top-0 right-0 h-full border-r-2 border-[#F59E0B] opacity-60"
                        style={{ right: `${100 - (cumulative[i] / 1) * 100}%` }}
                      />
                    )}
                  </div>

                  {/* Probability */}
                  <span
                    className="text-xs font-mono w-12 text-right flex-shrink-0"
                    style={{ color: isSampled ? '#F97316' : isActive ? '#A1A1AA' : '#4A4A5A' }}
                  >
                    {isActive ? `${(prob * 100).toFixed(1)}%` : '—'}
                  </span>
                </motion.div>
              )
            })}
          </div>

          {/* Top-P cumulative bar */}
          {activeControl === 'topp' && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-wider">
                  Cumulative Probability Budget (Top-P = {topP.toFixed(2)})
                </p>
              </div>
              <div className="h-3 bg-[#12121A] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #F59E0B, #F97316)' }}
                  animate={{ width: `${topP * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between mt-0.5 text-[9px] font-mono text-[#71717A]">
                <span>0%</span>
                <span className="text-[#F59E0B]">{(topP * 100).toFixed(0)}% budget</span>
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Sample button */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleSample}
              disabled={isSampling}
              whileTap={{ scale: 0.96 }}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #F97316, #7C3AED)',
                boxShadow: isSampling ? '0 0 20px rgba(249,115,22,0.4)' : 'none',
              }}
            >
              {isSampling ? '🎲 Sampling...' : '🎲 Sample Next Token'}
            </motion.button>

            <AnimatePresence>
              {sampledIndex !== null && !isSampling && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="px-3 py-2 rounded-xl text-sm font-mono font-bold"
                  style={{
                    background: 'rgba(249,115,22,0.15)',
                    border: '1px solid rgba(249,115,22,0.4)',
                    color: '#F97316',
                  }}
                >
                  → &ldquo;{BASE_TOKENS[sampledIndex].text}&rdquo;
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── RIGHT: Controls ── */}
        <div className="flex flex-col gap-4">

          {/* Control tabs */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
            style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
          >
            <div className="flex gap-2 mb-4">
              {(['temp', 'topk', 'topp'] as const).map((ctrl) => (
                <button
                  key={ctrl}
                  onClick={() => setActiveControl(ctrl)}
                  className="flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all"
                  style={{
                    background: activeControl === ctrl ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.04)',
                    color: activeControl === ctrl ? '#F97316' : '#71717A',
                    border: activeControl === ctrl ? '1px solid rgba(249,115,22,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {ctrl === 'temp' ? 'Temperature' : ctrl === 'topk' ? 'Top-K' : 'Top-P'}
                </button>
              ))}
            </div>

            {/* Temperature Control */}
            {activeControl === 'temp' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#F97316]">Temperature</p>
                  <span
                    className="text-lg font-mono font-bold px-3 py-1 rounded-lg"
                    style={{ background: 'rgba(249,115,22,0.15)', color: '#F97316' }}
                  >
                    {temperature.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={2}
                  step={0.1}
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #F97316 ${(temperature / 2) * 100}%, #22222F ${(temperature / 2) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-[10px] font-mono text-[#71717A]">
                  <span>0 — Deterministic</span>
                  <span>1.0 — Default</span>
                  <span>2.0 — Chaotic</span>
                </div>
                <div className="space-y-2 mt-2">
                  {[
                    { t: 0, label: 'T=0: Always top token (greedy)', color: '#06B6D4' },
                    { t: 0.5, label: 'T=0.5: Focused, slightly random', color: '#7C3AED' },
                    { t: 1.0, label: 'T=1.0: Original probabilities', color: '#F97316' },
                    { t: 2.0, label: 'T=2.0: Nearly uniform — very random', color: '#EF4444' },
                  ].map((preset) => (
                    <button
                      key={preset.t}
                      onClick={() => setTemperature(preset.t)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left transition-all hover:opacity-80"
                      style={{
                        background: `${preset.color}10`,
                        border: `1px solid ${preset.color}30`,
                        color: temperature === preset.t ? preset.color : '#A1A1AA',
                      }}
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: preset.color }} />
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Top-K Control */}
            {activeControl === 'topk' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#06B6D4]">Top-K</p>
                  <span
                    className="text-lg font-mono font-bold px-3 py-1 rounded-lg"
                    style={{ background: 'rgba(6,182,212,0.15)', color: '#06B6D4' }}
                  >
                    K = {topK}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={topK}
                  onChange={(e) => setTopK(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #06B6D4 ${((topK - 1) / 7) * 100}%, #22222F ${((topK - 1) / 7) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-[10px] font-mono text-[#71717A]">
                  <span>K=1 — Greedy</span>
                  <span>K=8 — All tokens</span>
                </div>
                <div
                  className="rounded-lg p-3 mt-2"
                  style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}
                >
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    <span className="text-[#06B6D4] font-semibold">Top-K = {topK}:</span>{' '}
                    {topK === 1
                      ? 'Only the highest probability token is selectable. Same as temperature=0.'
                      : `Only the top ${topK} tokens compete. Grey tokens are eliminated.`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {BASE_TOKENS.map((t, i) => (
                    <span
                      key={t.text}
                      className="text-xs font-mono px-2 py-1 rounded-md transition-all"
                      style={{
                        background: i < topK ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.04)',
                        color: i < topK ? '#06B6D4' : '#4A4A5A',
                        border: i < topK ? '1px solid rgba(6,182,212,0.3)' : '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {t.text}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Top-P Control */}
            {activeControl === 'topp' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#F59E0B]">Top-P (Nucleus)</p>
                  <span
                    className="text-lg font-mono font-bold px-3 py-1 rounded-lg"
                    style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}
                  >
                    P = {topP.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0.05}
                  max={1}
                  step={0.05}
                  value={topP}
                  onChange={(e) => setTopP(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #F59E0B ${topP * 100}%, #22222F ${topP * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-[10px] font-mono text-[#71717A]">
                  <span>0.05 — Very tight</span>
                  <span>0.9 — Common</span>
                  <span>1.0 — All tokens</span>
                </div>
                <div
                  className="rounded-lg p-3 mt-2"
                  style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
                >
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    <span className="text-[#F59E0B] font-semibold">Top-P = {topP.toFixed(2)}:</span>{' '}
                    Tokens included until their cumulative probability reaches {(topP * 100).toFixed(0)}%. The bar chart shows the amber cutoff line.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Simple explanation */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 space-y-3"
            style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">One-Line Summary</p>
            {[
              { icon: '🌡️', label: 'Temperature', desc: 'How random/creative the model is', color: '#F97316' },
              { icon: '🎯', label: 'Top-K', desc: 'How many token candidates', color: '#06B6D4' },
              { icon: '💰', label: 'Top-P', desc: 'Cumulative probability budget', color: '#F59E0B' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold" style={{ color: item.color }}>{item.label}</span>
                  <span className="text-xs text-[#71717A] ml-2">=</span>
                  <span className="text-xs text-[#A1A1AA] ml-1">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Current settings summary */}
          <div
            className="rounded-xl border p-4"
            style={{ background: 'rgba(249,115,22,0.06)', borderColor: 'rgba(249,115,22,0.3)' }}
          >
            <p className="text-xs font-mono text-[#F97316] uppercase tracking-wider mb-2">Current Settings</p>
            <div className="font-mono text-xs space-y-1 text-[#A1A1AA]">
              <div>temperature = <span className="text-[#F97316]">{temperature.toFixed(1)}</span></div>
              <div>top_k = <span className="text-[#06B6D4]">{topK}</span></div>
              <div>top_p = <span className="text-[#F59E0B]">{topP.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
