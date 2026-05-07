'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Mode = 'no-backpressure' | 'with-backpressure' | 'manual'

interface Chunk {
  id: number
  stage: 'source' | 'pipe1' | 'transform' | 'pipe2' | 'destination' | 'done'
  x: number
  color: string
}

const CHUNK_COLORS = ['#7C3AED', '#06B6D4', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#0EA5E9']
const MAX_BUFFER = 8

export default function StreamFlowVisualizer() {
  const [mode, setMode] = useState<Mode>('manual')
  const [running, setRunning] = useState(false)
  const [chunkInterval, setChunkInterval] = useState(1200)
  const [processingTime, setProcessingTime] = useState(400)
  const [consumptionSpeed, setConsumptionSpeed] = useState(800)
  const [chunks, setChunks] = useState<Chunk[]>([])
  const [buffer, setBuffer] = useState<number>(0)
  const [chunksProduced, setChunksProduced] = useState(0)
  const [chunksWritten, setChunksWritten] = useState(0)
  const [backpressureEvents, setBackpressureEvents] = useState(0)
  const [memoryUsed, setMemoryUsed] = useState(0)
  const [throughput, setThroughput] = useState(0)
  const [backpressureActive, setBackpressureActive] = useState(false)
  const [droppedChunks, setDroppedChunks] = useState(0)

  const chunkIdRef = useRef(0)
  const sourceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const transformQueueRef = useRef<number[]>([])
  const writtenCountRef = useRef(0)
  const producedCountRef = useRef(0)
  const throughputWindowRef = useRef<number[]>([])

  const applyMode = useCallback((m: Mode) => {
    if (m === 'no-backpressure') {
      setChunkInterval(100)
      setProcessingTime(200)
      setConsumptionSpeed(500)
    } else if (m === 'with-backpressure') {
      setChunkInterval(300)
      setProcessingTime(150)
      setConsumptionSpeed(300)
    }
  }, [])

  const reset = useCallback(() => {
    setRunning(false)
    setChunks([])
    setBuffer(0)
    setChunksProduced(0)
    setChunksWritten(0)
    setBackpressureEvents(0)
    setMemoryUsed(0)
    setThroughput(0)
    setBackpressureActive(false)
    setDroppedChunks(0)
    chunkIdRef.current = 0
    transformQueueRef.current = []
    writtenCountRef.current = 0
    producedCountRef.current = 0
    throughputWindowRef.current = []
    if (sourceTimerRef.current) clearTimeout(sourceTimerRef.current)
  }, [])

  const handleModeChange = (m: Mode) => {
    reset()
    setMode(m)
    applyMode(m)
  }

  // Main simulation effect
  useEffect(() => {
    if (!running) return

    let stopped = false
    let localBuffer = 0
    let localBackpressure = false

    const emitChunk = () => {
      if (stopped) return

      const effectiveInterval = (mode === 'with-backpressure' && localBackpressure)
        ? chunkInterval * 3
        : chunkInterval

      const id = ++chunkIdRef.current
      const color = CHUNK_COLORS[id % CHUNK_COLORS.length]

      if (mode === 'no-backpressure' && localBuffer >= MAX_BUFFER) {
        setDroppedChunks(p => p + 1)
        sourceTimerRef.current = setTimeout(emitChunk, effectiveInterval)
        return
      }

      producedCountRef.current += 1
      setChunksProduced(producedCountRef.current)

      setChunks(prev => [...prev, { id, stage: 'pipe1', x: 0, color }])

      // Move to transform after pipe animation
      setTimeout(() => {
        if (stopped) return
        localBuffer = Math.min(localBuffer + 1, MAX_BUFFER)
        setBuffer(localBuffer)
        setMemoryUsed(localBuffer * 16)

        if (localBuffer >= MAX_BUFFER) {
          localBackpressure = true
          setBackpressureActive(true)
          setBackpressureEvents(p => p + 1)
        }

        setChunks(prev => prev.map(c => c.id === id ? { ...c, stage: 'transform' } : c))

        // Move to pipe2 after transform
        setTimeout(() => {
          if (stopped) return
          setChunks(prev => prev.map(c => c.id === id ? { ...c, stage: 'pipe2' } : c))

          // Move to destination after pipe2
          setTimeout(() => {
            if (stopped) return
            localBuffer = Math.max(localBuffer - 1, 0)
            setBuffer(localBuffer)
            setMemoryUsed(localBuffer * 16)

            if (localBuffer < MAX_BUFFER / 2) {
              localBackpressure = false
              setBackpressureActive(false)
            }

            writtenCountRef.current += 1
            setChunksWritten(writtenCountRef.current)

            throughputWindowRef.current.push(Date.now())
            const now = Date.now()
            throughputWindowRef.current = throughputWindowRef.current.filter(t => now - t < 1000)
            setThroughput(throughputWindowRef.current.length)

            setChunks(prev => prev.map(c => c.id === id ? { ...c, stage: 'done' } : c))
            setTimeout(() => {
              setChunks(prev => prev.filter(c => c.id !== id))
            }, 300)
          }, consumptionSpeed)
        }, processingTime)
      }, 200)

      sourceTimerRef.current = setTimeout(emitChunk, effectiveInterval)
    }

    emitChunk()

    return () => {
      stopped = true
      if (sourceTimerRef.current) clearTimeout(sourceTimerRef.current)
    }
  }, [running, chunkInterval, processingTime, consumptionSpeed, mode])

  const bufferPercent = (buffer / MAX_BUFFER) * 100
  const bufferColor = bufferPercent > 75 ? '#EF4444' : bufferPercent > 50 ? '#F59E0B' : '#10B981'

  return (
    <div className="space-y-6">
      {/* Mode Tabs */}
      <div className="flex gap-2 bg-[#12121A] rounded-xl p-1 w-fit">
        {([
          { key: 'no-backpressure', label: 'No Backpressure' },
          { key: 'with-backpressure', label: 'With Backpressure' },
          { key: 'manual', label: 'Manual Control' },
        ] as { key: Mode; label: string }[]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleModeChange(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === key
                ? 'bg-[#7C3AED] text-white'
                : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Visualizer — 3 cols */}
        <div className="xl:col-span-3 space-y-6">
          {/* Stream Pipeline */}
          <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-6">
            {/* Pipeline Row */}
            <div className="relative flex items-center gap-0 min-h-[160px]">
              {/* Source Box */}
              <div className="flex-shrink-0 w-[150px]">
                <div className={`bg-[#1A1A26] border-2 rounded-xl p-4 transition-colors ${
                  backpressureActive && mode === 'with-backpressure'
                    ? 'border-[#F59E0B]'
                    : 'border-[#7C3AED]'
                }`}>
                  <div className="text-2xl mb-1">📄</div>
                  <div className="text-[#F5F5F7] text-sm font-bold">File Source</div>
                  <div className="text-[#A1A1AA] text-xs mt-1">
                    Chunks sent: <span className="text-[#06B6D4] font-mono">{chunksProduced}</span>
                  </div>
                  {backpressureActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[#F59E0B] text-xs mt-1 font-bold"
                    >
                      ⏸ Throttled
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Pipe 1 */}
              <div className="flex-1 relative h-6 mx-0">
                <div
                  className={`absolute inset-0 rounded-full transition-colors duration-500 ${
                    backpressureActive ? 'bg-[rgba(245,158,11,0.3)]' : 'bg-[rgba(6,182,212,0.2)]'
                  }`}
                  style={{ height: '8px', top: '50%', transform: 'translateY(-50%)' }}
                />
                {/* Pipe flow dots */}
                <PipeAnimation active={running} backpressure={backpressureActive} direction="right" />
                {/* Backpressure arrow */}
                {backpressureActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-[#F59E0B] text-xs font-bold"
                  >
                    ◀ BP
                  </motion.div>
                )}
              </div>

              {/* Transform Box */}
              <div className="flex-shrink-0 w-[160px]">
                <div className={`bg-[#1A1A26] border-2 rounded-xl p-4 transition-all ${
                  buffer >= MAX_BUFFER
                    ? 'border-[#EF4444] shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                    : buffer > MAX_BUFFER / 2
                    ? 'border-[#F59E0B]'
                    : 'border-[#06B6D4]'
                }`}>
                  <div className="text-2xl mb-1">⚙️</div>
                  <div className="text-[#F5F5F7] text-sm font-bold">Transform</div>
                  <div className="text-[#A1A1AA] text-xs">→ UPPERCASE</div>
                  {/* Buffer indicator */}
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#A1A1AA]">Buffer</span>
                      <span style={{ color: bufferColor }} className="font-mono font-bold">
                        {buffer}/{MAX_BUFFER}
                      </span>
                    </div>
                    <div className="h-2 bg-[#0A0A0F] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full transition-colors duration-300"
                        style={{ backgroundColor: bufferColor }}
                        animate={{ width: `${bufferPercent}%` }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      />
                    </div>
                  </div>
                  {buffer >= MAX_BUFFER && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-[#EF4444] text-xs mt-1 font-bold text-center"
                    >
                      ⚠ Buffer Full!
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Pipe 2 */}
              <div className="flex-1 relative h-6">
                <div
                  className="absolute inset-0 bg-[rgba(6,182,212,0.2)] rounded-full"
                  style={{ height: '8px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <PipeAnimation active={running} backpressure={false} direction="right" />
              </div>

              {/* Destination Box */}
              <div className="flex-shrink-0 w-[150px]">
                <div className="bg-[#1A1A26] border-2 border-[#10B981] rounded-xl p-4">
                  <div className="text-2xl mb-1">💾</div>
                  <div className="text-[#F5F5F7] text-sm font-bold">File Writer</div>
                  <div className="text-[#A1A1AA] text-xs mt-1">
                    Written: <span className="text-[#10B981] font-mono">{chunksWritten}</span>
                  </div>
                </div>
              </div>

              {/* Floating chunk particles */}
              <AnimatePresence>
                {chunks.map(chunk => (
                  <ChunkParticle key={chunk.id} chunk={chunk} />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-6">
            <h3 className="text-[#F5F5F7] font-bold mb-4">Controls</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SliderControl
                label="Chunk Interval"
                value={chunkInterval}
                min={50}
                max={3000}
                unit="ms"
                disabled={mode !== 'manual'}
                onChange={setChunkInterval}
                color="#7C3AED"
              />
              <SliderControl
                label="Processing Time"
                value={processingTime}
                min={10}
                max={1000}
                unit="ms"
                disabled={mode !== 'manual'}
                onChange={setProcessingTime}
                color="#06B6D4"
              />
              <SliderControl
                label="Consumption Speed"
                value={consumptionSpeed}
                min={50}
                max={2000}
                unit="ms"
                disabled={mode !== 'manual'}
                onChange={setConsumptionSpeed}
                color="#10B981"
              />
            </div>
            <div className="mt-3 px-3 py-2 rounded-lg border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.06)] text-xs text-[#A1A1AA]">
              🐢 <span className="text-[#7C3AED] font-semibold">Beginner:</span> Keep sliders slow (right side = faster). Watch data flow step by step.
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setRunning(r => !r)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  running
                    ? 'bg-[#EF4444] hover:bg-[#DC2626] text-white'
                    : 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white'
                }`}
              >
                {running ? '⏹ Stop' : '▶ Start Stream'}
              </button>
              <button
                onClick={reset}
                className="px-6 py-2 rounded-lg border border-[rgba(255,255,255,0.12)] text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors"
              >
                Reset
              </button>
            </div>
            {mode === 'no-backpressure' && droppedChunks > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-lg"
              >
                <span className="text-[#EF4444] font-bold">⚠ Memory Warning!</span>
                <span className="text-[#A1A1AA] text-sm ml-2">
                  {droppedChunks} chunks dropped — buffer overflow! Without backpressure, fast producer overwhelms slow consumer.
                </span>
              </motion.div>
            )}
          </div>

          {/* Teaching callout */}
          <div className="bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.3)] rounded-2xl p-5">
            <div className="text-[#7C3AED] font-bold mb-2">💡 Backpressure Kya Hai?</div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              Backpressure ye ensure karta hai ki fast producer slow consumer ko overwhelm na kare.
              Node.js streams automatically ye handle karte hain — tum bs{' '}
              <code className="bg-[#0A0A0F] px-1 py-0.5 rounded text-[#06B6D4] font-mono text-xs">.pipe()</code>{' '}
              use karo! &quot;No Backpressure&quot; mode mein dekho kaise buffer overflow hota hai aur chunks drop hote hain.
            </p>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="space-y-4">
          <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-5">
            <h3 className="text-[#F5F5F7] font-bold mb-4">Live Stats</h3>
            <div className="space-y-4">
              <StatItem label="Memory Used" value={`${memoryUsed} KB`} color="#7C3AED" icon="🧠" />
              <StatItem label="Throughput" value={`${throughput} chunks/s`} color="#06B6D4" icon="⚡" />
              <StatItem label="Buffer" value={`${buffer}/${MAX_BUFFER}`} color={bufferColor} icon="📦" />
              <StatItem label="Backpressure Events" value={`${backpressureEvents}`} color="#F59E0B" icon="🔄" />
              <StatItem label="Chunks Produced" value={`${chunksProduced}`} color="#10B981" icon="📄" />
              <StatItem label="Chunks Written" value={`${chunksWritten}`} color="#10B981" icon="💾" />
              {mode === 'no-backpressure' && (
                <StatItem label="Dropped" value={`${droppedChunks}`} color="#EF4444" icon="❌" />
              )}
            </div>
          </div>

          {/* Mode Info Card */}
          <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-5">
            <h3 className="text-[#F5F5F7] font-bold mb-3 text-sm">Mode Info</h3>
            {mode === 'no-backpressure' && (
              <div className="text-[#EF4444] text-xs space-y-1">
                <div>❌ Source: Very fast (100ms)</div>
                <div>❌ Destination: Slow (500ms)</div>
                <div>❌ Buffer overflows!</div>
                <div className="text-[#A1A1AA] mt-2">Memory builds up, chunks get dropped without backpressure.</div>
              </div>
            )}
            {mode === 'with-backpressure' && (
              <div className="text-[#10B981] text-xs space-y-1">
                <div>✅ Auto-throttling active</div>
                <div>✅ Buffer stays in check</div>
                <div>✅ No chunks dropped</div>
                <div className="text-[#A1A1AA] mt-2">Source slows down when buffer fills — sustainable pipeline.</div>
              </div>
            )}
            {mode === 'manual' && (
              <div className="text-[#06B6D4] text-xs space-y-1">
                <div>🎛 Full control</div>
                <div>Adjust all three speeds to explore different scenarios.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function PipeAnimation({ active, backpressure, direction }: { active: boolean; backpressure: boolean; direction: 'right' | 'left' }) {
  if (!active) return null
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ top: '35%', height: '30%' }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: backpressure ? '#F59E0B' : '#06B6D4', top: '50%', translateY: '-50%' }}
          animate={{ x: direction === 'right' ? ['0%', '100%'] : ['100%', '0%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

function ChunkParticle({ chunk }: { chunk: Chunk }) {
  const stagePositions: Record<Chunk['stage'], { left: string; opacity: number }> = {
    source: { left: '5%', opacity: 1 },
    pipe1: { left: '25%', opacity: 1 },
    transform: { left: '42%', opacity: 1 },
    pipe2: { left: '62%', opacity: 1 },
    destination: { left: '80%', opacity: 1 },
    done: { left: '90%', opacity: 0 },
  }
  const pos = stagePositions[chunk.stage]

  return (
    <motion.div
      className="absolute w-4 h-4 rounded-sm text-xs flex items-center justify-center font-bold z-10"
      style={{
        backgroundColor: chunk.color,
        top: '50%',
        translateY: '-50%',
        translateX: '-50%',
        fontSize: '8px',
        color: 'white',
      }}
      animate={{ left: pos.left, opacity: pos.opacity }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      exit={{ opacity: 0, scale: 0 }}
    >
      {chunk.id % 10}
    </motion.div>
  )
}

function SliderControl({
  label, value, min, max, unit, disabled, onChange, color,
}: {
  label: string
  value: number
  min: number
  max: number
  unit: string
  disabled: boolean
  onChange: (v: number) => void
  color: string
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-[#A1A1AA]">{label}</span>
        <span className="font-mono font-bold" style={{ color }}>{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 100%)`,
        }}
      />
    </div>
  )
}

function StatItem({ label, value, color, icon }: { label: string; value: string; color: string; icon: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#A1A1AA] text-xs flex items-center gap-1">
        <span>{icon}</span>
        {label}
      </span>
      <span className="font-mono text-sm font-bold" style={{ color }}>{value}</span>
    </div>
  )
}
