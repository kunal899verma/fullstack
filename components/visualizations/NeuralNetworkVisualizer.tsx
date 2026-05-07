'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface _Neuron {
  id: string
  layer: number
  index: number
  value: number
  activated: number
}

interface _Weight {
  from: string
  to: string
  weight: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LAYER_SIZES = [3, 4, 3, 2]
const LAYER_LABELS = ['Input', 'Hidden 1', 'Hidden 2', 'Output']
const LAYER_COLORS = ['#06B6D4', '#7C3AED', '#F97316', '#10B981']

function relu(x: number): number { return Math.max(0, x) }

function softmax(arr: number[]): number[] {
  const max = Math.max(...arr)
  const exps = arr.map((v) => Math.exp(v - max))
  const sum = exps.reduce((a, b) => a + b, 0)
  return exps.map((e) => e / sum)
}

function _sigmoid(x: number): number { return 1 / (1 + Math.exp(-x)) }

function generateWeights(fromSize: number, toSize: number, seed: number): number[][] {
  const weights: number[][] = []
  let s = seed
  for (let i = 0; i < toSize; i++) {
    weights[i] = []
    for (let j = 0; j < fromSize; j++) {
      s = (s * 1664525 + 1013904223) & 0xffffffff
      weights[i][j] = ((s / 0x80000000) - 1) * 1.5
    }
  }
  return weights
}

function forwardPass(inputs: number[], weightSeed: number) {
  const W01 = generateWeights(LAYER_SIZES[0], LAYER_SIZES[1], weightSeed)
  const W12 = generateWeights(LAYER_SIZES[1], LAYER_SIZES[2], weightSeed + 1)
  const W23 = generateWeights(LAYER_SIZES[2], LAYER_SIZES[3], weightSeed + 2)

  const h1Pre = W01.map((row) => row.reduce((s, w, j) => s + w * inputs[j], 0))
  const h1Act = h1Pre.map(relu)

  const h2Pre = W12.map((row) => row.reduce((s, w, j) => s + w * h1Act[j], 0))
  const h2Act = h2Pre.map(relu)

  const outPre = W23.map((row) => row.reduce((s, w, j) => s + w * h2Act[j], 0))
  const outAct = softmax(outPre)

  return { layers: [inputs, h1Act, h2Act, outAct], weights: [W01, W12, W23] }
}

// ─── SVG Layout ───────────────────────────────────────────────────────────────

const SVG_W = 520
const SVG_H = 280
const LAYER_X = [60, 180, 310, 430]
const NEURON_SPACING = 55

function getNeuronY(layerIdx: number, neuronIdx: number): number {
  const count = LAYER_SIZES[layerIdx]
  const totalH = (count - 1) * NEURON_SPACING
  const startY = (SVG_H - totalH) / 2
  return startY + neuronIdx * NEURON_SPACING
}

function _valueToColor(val: number, layerIdx: number): string {
  const alpha = Math.min(Math.abs(val), 1)
  const color = LAYER_COLORS[layerIdx]
  if (alpha < 0.05) return '#1A1A26'
  return color
}

function weightToOpacity(w: number): number {
  return Math.min(Math.abs(w) / 2, 0.85)
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function NeuralNetworkVisualizer() {
  const [inputs, setInputs] = useState([0.8, 0.3, 0.6])
  const [weightSeed, setWeightSeed] = useState(42)
  const [showWeights, setShowWeights] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [activeLayer, setActiveLayer] = useState(-1)
  const [speed, setSpeed] = useState<'slow' | 'medium' | 'fast'>('medium')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { layers, weights: allWeights } = forwardPass(inputs, weightSeed)

  const speedMs = speed === 'slow' ? 900 : speed === 'medium' ? 500 : 200

  const runForwardPass = useCallback(async () => {
    if (animating) return
    setAnimating(true)
    setActiveLayer(-1)

    for (let i = 0; i < LAYER_SIZES.length; i++) {
      await new Promise<void>((r) => {
        timerRef.current = setTimeout(() => {
          setActiveLayer(i)
          r()
        }, speedMs * i + 100)
      })
    }
    await new Promise<void>((r) => { timerRef.current = setTimeout(r, speedMs) })
    setAnimating(false)
  }, [animating, speedMs])

  const randomizeWeights = useCallback(() => {
    setWeightSeed(Math.floor(Math.random() * 10000))
    setActiveLayer(-1)
    setAnimating(false)
  }, [])

  const outputLabels = ['Cat', 'Dog']
  const outputProbs = layers[3]
  const winnerIdx = outputProbs[0] > outputProbs[1] ? 0 : 1

  return (
    <div className="w-full text-[#F5F5F7]">
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-5">

        {/* ── LEFT: Network Diagram ── */}
        <div
          className="rounded-xl border border-[rgba(255,255,255,0.08)] p-5"
          style={{ background: 'rgba(18,18,26,0.9)', backdropFilter: 'blur(12px)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Neural Network — Forward Pass
            </p>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-colors ${animating ? 'bg-[#F97316] animate-pulse' : activeLayer >= 0 ? 'bg-[#10B981]' : 'bg-[#6B7280]'}`}
              />
              <span className="text-[10px] font-mono text-[#71717A]">
                {animating ? `Layer ${activeLayer + 1} processing...` : activeLayer >= 0 ? 'Complete' : 'Ready'}
              </span>
            </div>
          </div>

          <svg
            width="100%"
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="overflow-visible"
          >
            {/* Connections */}
            {allWeights.map((weightMatrix, li) =>
              weightMatrix.map((row, j) =>
                row.map((w, i) => {
                  const x1 = LAYER_X[li]
                  const y1 = getNeuronY(li, i)
                  const x2 = LAYER_X[li + 1]
                  const y2 = getNeuronY(li + 1, j)
                  const isActive = activeLayer > li
                  const isAnimating = activeLayer === li + 1
                  return (
                    <motion.line
                      key={`${li}-${j}-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={w > 0 ? '#7C3AED' : '#EF4444'}
                      strokeWidth={showWeights ? Math.max(0.5, Math.abs(w) * 1.5) : 0.8}
                      animate={{
                        opacity: isActive ? weightToOpacity(w) : 0.08,
                        strokeWidth: isAnimating ? Math.max(1, Math.abs(w) * 2.5) : showWeights ? Math.max(0.5, Math.abs(w) * 1.5) : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )
                })
              )
            )}

            {/* Neurons */}
            {LAYER_SIZES.map((size, li) =>
              Array.from({ length: size }, (_, ni) => {
                const x = LAYER_X[li]
                const y = getNeuronY(li, ni)
                const value = layers[li][ni]
                const isActive = activeLayer >= li
                const color = LAYER_COLORS[li]
                const r = 18

                return (
                  <g key={`${li}-${ni}`}>
                    {/* Glow when active */}
                    {isActive && (
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={r + 8}
                        fill={color}
                        animate={{ opacity: [0.05, 0.15, 0.05] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                    )}

                    {/* Neuron circle */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={r}
                      animate={{
                        fill: isActive ? `${color}40` : '#1A1A26',
                        stroke: isActive ? color : 'rgba(255,255,255,0.1)',
                        strokeWidth: isActive ? 2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Value fill */}
                    {isActive && (
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={r - 3}
                        fill={color}
                        animate={{ opacity: Math.min(value, 1) * 0.7 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Value text */}
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      fill={isActive ? '#F5F5F7' : '#6B7280'}
                      fontSize={9}
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="600"
                    >
                      {isActive ? value.toFixed(2) : '0.00'}
                    </text>

                    {/* Weight label on connection */}
                    {showWeights && li < LAYER_SIZES.length - 1 && (
                      <text
                        x={x + 28}
                        y={y - 4}
                        fill="#F59E0B"
                        fontSize={7}
                        fontFamily="JetBrains Mono, monospace"
                        opacity={0.7}
                      >
                        {allWeights[li][0]?.[ni]?.toFixed(1)}
                      </text>
                    )}
                  </g>
                )
              })
            )}

            {/* Layer labels */}
            {LAYER_LABELS.map((label, li) => (
              <text
                key={label}
                x={LAYER_X[li]}
                y={SVG_H - 8}
                textAnchor="middle"
                fill={activeLayer >= li ? LAYER_COLORS[li] : '#71717A'}
                fontSize={9}
                fontFamily="JetBrains Mono, monospace"
              >
                {label}
              </text>
            ))}

            {/* ReLU annotation */}
            {activeLayer >= 1 && (
              <text x={LAYER_X[1]} y={20} textAnchor="middle" fill="#7C3AED" fontSize={8} fontFamily="JetBrains Mono, monospace">
                ReLU
              </text>
            )}
            {activeLayer >= 2 && (
              <text x={LAYER_X[2]} y={20} textAnchor="middle" fill="#F97316" fontSize={8} fontFamily="JetBrains Mono, monospace">
                ReLU
              </text>
            )}
            {activeLayer >= 3 && (
              <text x={LAYER_X[3]} y={20} textAnchor="middle" fill="#10B981" fontSize={8} fontFamily="JetBrains Mono, monospace">
                Softmax
              </text>
            )}
          </svg>

          {/* Controls */}
          <div className="flex gap-2 mt-2 flex-wrap">
            <motion.button
              onClick={runForwardPass}
              disabled={animating}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
            >
              {animating ? '⚡ Running...' : '▶ Forward Pass'}
            </motion.button>
            <button
              onClick={randomizeWeights}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B' }}
            >
              🎲 Randomize Weights
            </button>
            <button
              onClick={() => setShowWeights(!showWeights)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: showWeights ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.04)',
                border: showWeights ? '1px solid rgba(249,115,22,0.4)' : '1px solid rgba(255,255,255,0.1)',
                color: showWeights ? '#F97316' : '#71717A',
              }}
            >
              {showWeights ? '🔢 Weights ON' : '🔢 Show Weights'}
            </button>
          </div>

          {/* Speed */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] font-mono text-[#71717A]">Speed:</span>
            {(['slow', 'medium', 'fast'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className="px-2 py-1 rounded text-[10px] font-mono transition-all"
                style={{
                  background: speed === s ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
                  color: speed === s ? '#7C3AED' : '#71717A',
                  border: speed === s ? '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Controls + Output ── */}
        <div className="space-y-4">

          {/* Input sliders */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
            style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-3">
              Input Values (pixel intensity)
            </p>
            {['Pixel 1 (R)', 'Pixel 2 (G)', 'Pixel 3 (B)'].map((label, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-mono text-[#A1A1AA]">{label}</span>
                  <span className="text-xs font-mono text-[#06B6D4] font-bold">{inputs[i].toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={inputs[i]}
                  onChange={(e) => {
                    const newInputs = [...inputs]
                    newInputs[i] = Number(e.target.value)
                    setInputs(newInputs)
                    setActiveLayer(-1)
                  }}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #06B6D4 ${inputs[i] * 100}%, #22222F ${inputs[i] * 100}%)`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Output */}
          <div
            className="rounded-xl border p-4"
            style={{
              background: activeLayer >= 3 ? 'rgba(16,185,129,0.08)' : 'rgba(26,26,38,0.8)',
              borderColor: activeLayer >= 3 ? 'rgba(16,185,129,0.35)' : 'rgba(255,255,255,0.08)',
            }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-3">
              Output — Softmax Probabilities
            </p>
            {outputLabels.map((label, i) => {
              const prob = activeLayer >= 3 ? outputProbs[i] : 0.5
              const isWinner = i === winnerIdx && activeLayer >= 3
              return (
                <div key={label} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold" style={{ color: isWinner ? '#10B981' : '#A1A1AA' }}>
                      {isWinner ? '★ ' : ''}{label}
                    </span>
                    <span className="text-sm font-mono font-bold" style={{ color: isWinner ? '#10B981' : '#71717A' }}>
                      {activeLayer >= 3 ? `${(prob * 100).toFixed(1)}%` : '?'}
                    </span>
                  </div>
                  <div className="h-5 bg-[#12121A] rounded-lg overflow-hidden">
                    <motion.div
                      className="h-full rounded-lg"
                      style={{ background: isWinner ? 'linear-gradient(90deg, #10B981, #06B6D4)' : '#2A2A3F' }}
                      animate={{ width: activeLayer >= 3 ? `${prob * 100}%` : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )
            })}

            <AnimatePresence>
              {activeLayer >= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-2 text-center p-2 rounded-lg"
                  style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
                >
                  <span className="text-sm font-bold text-[#10B981]">
                    Prediction: {outputLabels[winnerIdx]} ({(outputProbs[winnerIdx] * 100).toFixed(1)}%)
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Math explanation */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 space-y-2"
            style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">Layer-by-layer math</p>
            <div className="text-[10px] font-mono space-y-1.5 text-[#71717A]">
              <div className="flex items-center gap-2">
                <span className="text-[#06B6D4]">Input:</span>
                <span>[{inputs.map((v) => v.toFixed(2)).join(', ')}]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#7C3AED]">H1 =</span>
                <span>ReLU(W₀₁ · x)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#F97316]">H2 =</span>
                <span>ReLU(W₁₂ · h₁)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#10B981]">Out =</span>
                <span>Softmax(W₂₃ · h₂)</span>
              </div>
            </div>
            <p className="text-[10px] text-[#71717A] mt-2">
              GPT-4 has 1.7T parameters (weights). Same math, massive scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
