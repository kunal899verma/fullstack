'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'idle' | 'indexing' | 'indexed' | 'querying' | 'done'

interface Chunk {
  id: number
  text: string
  color: string
  embedding: number[]
}

interface RetrievedChunk extends Chunk {
  score: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const _DOCUMENTS = [
  { id: 1, name: 'nodejs-docs.txt', icon: '📄', color: '#06B6D4' },
  { id: 2, name: 'async-guide.md', icon: '📝', color: '#7C3AED' },
  { id: 3, name: 'backpressure.txt', icon: '📋', color: '#F97316' },
]

const CHUNKS: Chunk[] = [
  { id: 1, text: 'Node.js is a JavaScript runtime built on V8 engine...', color: '#06B6D4', embedding: [0.8, 0.2, 0.6] },
  { id: 2, text: 'Async/await allows writing asynchronous code...', color: '#7C3AED', embedding: [0.3, 0.9, 0.1] },
  { id: 3, text: 'Backpressure occurs when data producer is faster...', color: '#F97316', embedding: [0.1, 0.4, 0.9] },
  { id: 4, text: 'The event loop is the core of Node.js async model...', color: '#06B6D4', embedding: [0.7, 0.3, 0.5] },
  { id: 5, text: 'Streams implement backpressure via highWaterMark...', color: '#F97316', embedding: [0.2, 0.5, 0.8] },
  { id: 6, text: 'Promises provide a cleaner async alternative...', color: '#7C3AED', embedding: [0.4, 0.8, 0.2] },
]

const QUESTIONS = [
  { text: 'What is Node.js?', topChunks: [0, 3] },
  { text: 'How does async work?', topChunks: [1, 5] },
  { text: 'What is backpressure?', topChunks: [2, 4] },
]

const PIPELINE_STEPS = [
  { id: 'docs', label: 'Documents', icon: '📄', color: '#06B6D4' },
  { id: 'chunk', label: 'Chunker', icon: '✂️', color: '#F59E0B' },
  { id: 'embed', label: 'Embedder', icon: '🔢', color: '#7C3AED' },
  { id: 'store', label: 'Vector DB', icon: '💾', color: '#10B981' },
]

const QUERY_STEPS = [
  { id: 'question', label: 'Question', icon: '❓', color: '#F5F5F7' },
  { id: 'embed2', label: 'Embedder', icon: '🔢', color: '#7C3AED' },
  { id: 'search', label: 'Search', icon: '🔍', color: '#06B6D4' },
  { id: 'retrieve', label: 'Chunks', icon: '📋', color: '#F97316' },
  { id: 'llm', label: 'LLM', icon: '🤖', color: '#F59E0B' },
  { id: 'answer', label: 'Answer', icon: '💬', color: '#10B981' },
]

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return dot / (magA * magB)
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RAGPipelineVisualizer() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [selectedQuestion, setSelectedQuestion] = useState(0)
  const [topK, setTopK] = useState(2)
  const [indexStep, setIndexStep] = useState(-1)
  const [queryStep, setQueryStep] = useState(-1)
  const [retrievedChunks, setRetrievedChunks] = useState<RetrievedChunk[]>([])
  const [activeChunks, setActiveChunks] = useState<number[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

  const runIndexing = useCallback(async () => {
    clearTimers()
    setPhase('indexing')
    setIndexStep(-1)
    setQueryStep(-1)
    setActiveChunks([])

    for (let i = 0; i < PIPELINE_STEPS.length; i++) {
      await delay(900)
      setIndexStep(i)
      if (i === 0) setActiveChunks([])
      if (i === 1) setActiveChunks([0, 1, 2])
      if (i === 2) setActiveChunks([0, 1, 2, 3, 4, 5])
    }
    await delay(600)
    setPhase('indexed')
  }, [clearTimers])

  const runQuery = useCallback(async () => {
    if (phase !== 'indexed' && phase !== 'done') return
    setPhase('querying')
    setQueryStep(-1)
    setRetrievedChunks([])

    const q = QUESTIONS[selectedQuestion]
    const questionEmbedding = CHUNKS[q.topChunks[0]].embedding.map((v) => v * 0.9)

    for (let i = 0; i < QUERY_STEPS.length; i++) {
      await delay(800)
      setQueryStep(i)

      if (i === 2) {
        // Compute similarities
        const scored = CHUNKS.map((chunk, idx) => ({
          ...chunk,
          score: cosineSimilarity(questionEmbedding, chunk.embedding) + (q.topChunks.includes(idx) ? 0.3 : 0),
        }))
        scored.sort((a, b) => b.score - a.score)
        setRetrievedChunks(scored.slice(0, topK))
      }
    }
    await delay(400)
    setPhase('done')
  }, [phase, selectedQuestion, topK])

  const reset = useCallback(() => {
    clearTimers()
    setPhase('idle')
    setIndexStep(-1)
    setQueryStep(-1)
    setRetrievedChunks([])
    setActiveChunks([])
  }, [clearTimers])

  return (
    <div className="w-full text-[#F5F5F7] space-y-5">

      {/* ── INDEX PHASE ── */}
      <div
        className="rounded-xl border border-[rgba(255,255,255,0.08)] p-5"
        style={{ background: 'rgba(18,18,26,0.9)', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: phase === 'indexing' ? '#F59E0B' : phase === 'indexed' || phase === 'done' ? '#10B981' : '#6B7280' }}
            />
            <p className="text-sm font-semibold text-[#F5F5F7] uppercase tracking-wider font-mono">
              Phase 1: Index Documents
            </p>
            <span className="text-[10px] text-[#71717A] font-mono">(runs once)</span>
          </div>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{
              background: phase === 'indexed' || phase === 'done' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)',
              color: phase === 'indexed' || phase === 'done' ? '#10B981' : '#71717A',
            }}
          >
            {phase === 'indexing' ? 'Running...' : phase === 'indexed' || phase === 'done' ? '✓ Complete' : 'Not started'}
          </span>
        </div>

        {/* Pipeline arrows */}
        <div className="flex items-center gap-0">
          {PIPELINE_STEPS.map((step, i) => {
            const isActive = indexStep === i
            const isDone = indexStep > i || phase === 'indexed' || phase === 'done' || phase === 'querying'
            return (
              <div key={step.id} className="flex items-center flex-1">
                <motion.div
                  className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl"
                  animate={{
                    background: isActive ? `${step.color}20` : isDone ? `${step.color}10` : 'rgba(255,255,255,0.02)',
                    borderColor: isActive ? `${step.color}60` : isDone ? `${step.color}30` : 'rgba(255,255,255,0.06)',
                  }}
                  style={{ border: '1px solid' }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="text-2xl"
                    animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                    transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
                  >
                    {step.icon}
                  </motion.span>
                  <span className="text-[10px] font-mono text-center" style={{ color: isActive || isDone ? step.color : '#71717A' }}>
                    {step.label}
                  </span>
                </motion.div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <motion.div
                    className="flex items-center px-1"
                    animate={{ opacity: isDone ? 1 : 0.3 }}
                  >
                    <div className="w-6 h-px" style={{ background: isDone ? step.color : '#374151' }} />
                    <div
                      className="w-0 h-0"
                      style={{
                        borderLeft: `6px solid ${isDone ? step.color : '#374151'}`,
                        borderTop: '4px solid transparent',
                        borderBottom: '4px solid transparent',
                      }}
                    />
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

        {/* Chunks visualization */}
        <AnimatePresence>
          {activeChunks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex flex-wrap gap-2"
            >
              {CHUNKS.slice(0, activeChunks.length).map((chunk, i) => (
                <motion.div
                  key={chunk.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-2 py-1.5 rounded-lg text-[10px] font-mono max-w-[160px] truncate"
                  style={{
                    background: `${chunk.color}12`,
                    border: `1px solid ${chunk.color}30`,
                    color: chunk.color,
                  }}
                >
                  {indexStep >= 2 ? `[${chunk.embedding.map((v) => v.toFixed(1)).join(', ')}]` : chunk.text.slice(0, 22) + '...'}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── QUERY PHASE ── */}
      <div
        className="rounded-xl border border-[rgba(255,255,255,0.08)] p-5"
        style={{ background: 'rgba(18,18,26,0.9)', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: phase === 'querying' ? '#06B6D4' : phase === 'done' ? '#10B981' : '#6B7280' }}
            />
            <p className="text-sm font-semibold text-[#F5F5F7] uppercase tracking-wider font-mono">
              Phase 2: Query
            </p>
            <span className="text-[10px] text-[#71717A] font-mono">(each question)</span>
          </div>
        </div>

        {/* Query pipeline */}
        <div className="flex items-center gap-0 overflow-x-auto">
          {QUERY_STEPS.map((step, i) => {
            const isActive = queryStep === i
            const isDone = queryStep > i || phase === 'done'
            return (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <motion.div
                  className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg"
                  animate={{
                    background: isActive ? `${step.color}20` : isDone ? `${step.color}08` : 'rgba(255,255,255,0.02)',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ border: '1px solid', borderColor: isActive ? `${step.color}50` : isDone ? `${step.color}20` : 'rgba(255,255,255,0.06)', minWidth: 64 }}
                >
                  <motion.span
                    className="text-xl"
                    animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                  >
                    {step.icon}
                  </motion.span>
                  <span className="text-[9px] font-mono text-center" style={{ color: isActive || isDone ? step.color : '#71717A' }}>
                    {step.label}
                  </span>
                </motion.div>
                {i < QUERY_STEPS.length - 1 && (
                  <motion.div
                    className="flex items-center"
                    style={{ padding: '0 2px' }}
                    animate={{ opacity: isDone ? 1 : 0.25 }}
                  >
                    <div className="w-4 h-px" style={{ background: isDone ? step.color : '#374151' }} />
                    <div
                      className="w-0 h-0"
                      style={{
                        borderLeft: `5px solid ${isDone ? step.color : '#374151'}`,
                        borderTop: '3px solid transparent',
                        borderBottom: '3px solid transparent',
                      }}
                    />
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

        {/* Retrieved chunks */}
        <AnimatePresence>
          {retrievedChunks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-2"
            >
              <p className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider">
                Retrieved Chunks (Top-{topK})
              </p>
              {retrievedChunks.map((chunk, i) => (
                <motion.div
                  key={chunk.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{
                    background: `${chunk.color}10`,
                    border: `1px solid ${chunk.color}30`,
                  }}
                >
                  <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: chunk.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#F5F5F7] truncate">{chunk.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-mono text-[#71717A]">Score:</span>
                      <div className="flex-1 h-1.5 bg-[#12121A] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: chunk.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(chunk.score * 80, 100)}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-[9px] font-mono" style={{ color: chunk.color }}>
                        {chunk.score.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {phase === 'done' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="p-3 rounded-lg"
                  style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}
                >
                  <p className="text-xs text-[#10B981] font-semibold mb-1">LLM Answer Generated</p>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    Based on {retrievedChunks.length} retrieved chunks, the LLM generates a grounded answer for: &ldquo;{QUESTIONS[selectedQuestion].text}&rdquo;
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Controls ── */}
      <div
        className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4"
        style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Question selector */}
          <div>
            <label className="block text-xs font-mono text-[#A1A1AA] mb-1.5 uppercase tracking-wider">
              Question
            </label>
            <select
              value={selectedQuestion}
              onChange={(e) => setSelectedQuestion(Number(e.target.value))}
              className="w-full bg-[#12121A] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#F97316] transition-colors"
            >
              {QUESTIONS.map((q, i) => (
                <option key={i} value={i}>{q.text}</option>
              ))}
            </select>
          </div>

          {/* Top K slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">Top-K Chunks</label>
              <span className="text-xs font-mono text-[#F97316] font-bold">K = {topK}</span>
            </div>
            <input
              type="range"
              min={1}
              max={6}
              step={1}
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #F97316 ${((topK - 1) / 5) * 100}%, #22222F ${((topK - 1) / 5) * 100}%)`,
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <motion.button
              onClick={runIndexing}
              disabled={phase === 'indexing' || phase === 'querying'}
              whileTap={{ scale: 0.97 }}
              className="py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #06B6D4, #7C3AED)' }}
            >
              📄 Index Documents
            </motion.button>
            <motion.button
              onClick={runQuery}
              disabled={phase === 'idle' || phase === 'indexing' || phase === 'querying'}
              whileTap={{ scale: 0.97 }}
              className="py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #F97316, #F59E0B)' }}
            >
              ❓ Ask Question
            </motion.button>
          </div>
        </div>

        {phase !== 'idle' && (
          <button
            onClick={reset}
            className="mt-3 w-full py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-[#F5F5F7] bg-[#12121A] border border-[rgba(255,255,255,0.06)] transition-all"
          >
            ↺ Reset
          </button>
        )}
      </div>
    </div>
  )
}
