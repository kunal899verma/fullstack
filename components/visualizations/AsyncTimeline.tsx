'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Task {
  id: number
  name: string
  duration: number
  color: string
}

type LaneId = 'sync' | 'sequential' | 'parallel'

interface LaneState {
  id: LaneId
  progress: number[]  // 0-100 for each task
  totalTime: number
  isComplete: boolean
}

type SpeedMultiplier = 0.5 | 1 | 2 | 4

// ─── Constants ────────────────────────────────────────────────────────────────

const TASK_COLORS = [
  '#7C3AED', // purple
  '#06B6D4', // cyan
  '#F59E0B', // amber
  '#10B981', // green
  '#EF4444', // red
]

function generateTaskDurations(): number[] {
  const base = [400, 650, 300, 800, 500]
  return base.map((b) => b + Math.floor(Math.random() * 200) - 100)
}

const TICK_MS = 50 // simulation tick

// ─── Code Snippet Generator ───────────────────────────────────────────────────

function SyncCodeSnippet({ tasks }: { tasks: Task[] }) {
  const total = tasks.reduce((sum, t) => sum + t.duration, 0)
  return (
    <pre className="text-[10px] font-mono text-[#A1A1AA] leading-relaxed">
      <span className="text-[#71717A]">{'// Sync — blocking\n'}</span>
      {tasks.map((t) => (
        <span key={t.id}>
          <span className="text-[#06B6D4]">const </span>
          <span className="text-[#F5F5F7]">r{t.id} </span>
          <span className="text-[#A1A1AA]">= </span>
          <span className="text-[#10B981]">task{t.id}()</span>
          <span className="text-[#71717A]">; </span>
          <span className="text-[#71717A]">{'// '}{t.duration}ms{'\n'}</span>
        </span>
      ))}
      <span className="text-[#71717A]">{'// Total: '}</span>
      <span className="text-[#EF4444]">{total}ms</span>
    </pre>
  )
}

function SequentialCodeSnippet({ tasks }: { tasks: Task[] }) {
  const total = tasks.reduce((sum, t) => sum + t.duration, 0)
  return (
    <pre className="text-[10px] font-mono text-[#A1A1AA] leading-relaxed">
      <span className="text-[#71717A]">{'// Sequential async\n'}</span>
      {tasks.map((t) => (
        <span key={t.id}>
          <span className="text-[#06B6D4]">const </span>
          <span className="text-[#F5F5F7]">r{t.id} </span>
          <span className="text-[#A1A1AA]">= </span>
          <span className="text-[#06B6D4]">await </span>
          <span className="text-[#10B981]">task{t.id}()</span>
          <span className="text-[#71717A]">; </span>
          <span className="text-[#71717A]">{'// '}{t.duration}ms{'\n'}</span>
        </span>
      ))}
      <span className="text-[#71717A]">{'// Total: '}</span>
      <span className="text-[#F59E0B]">{total}ms{'\n'}</span>
      <span className="text-[#71717A]">{'// (Same as sync — still awaiting each)'}</span>
    </pre>
  )
}

function ParallelCodeSnippet({ tasks }: { tasks: Task[] }) {
  const maxDuration = Math.max(...tasks.map((t) => t.duration))
  return (
    <pre className="text-[10px] font-mono text-[#A1A1AA] leading-relaxed">
      <span className="text-[#71717A]">{'// Parallel — Promise.all ✨\n'}</span>
      <span className="text-[#06B6D4]">const </span>
      <span className="text-[#F5F5F7]">[{tasks.map((t) => `r${t.id}`).join(', ')}] </span>
      <span className="text-[#A1A1AA]">= {'\n'}  </span>
      <span className="text-[#06B6D4]">await </span>
      <span className="text-[#F5F5F7]">Promise</span>
      <span className="text-[#A1A1AA]">.</span>
      <span className="text-[#10B981]">all</span>
      <span className="text-[#F5F5F7]">({'[\n'}
</span>
      {tasks.map((t) => (
        <span key={t.id}>
          <span className="text-[#F5F5F7]">    task{t.id}()</span>
          <span className="text-[#71717A]">{', // '}{t.duration}ms{'\n'}</span>
        </span>
      ))}
      <span className="text-[#F5F5F7]">  ])</span>
      <span className="text-[#71717A]">{'\n'}{'// Total: '}</span>
      <span className="text-[#10B981]">{maxDuration}ms ← fastest!</span>
    </pre>
  )
}

// ─── Single Lane ──────────────────────────────────────────────────────────────

interface LaneProps {
  lane: LaneState
  tasks: Task[]
  label: string
  badge?: string
  badgeColor?: string
  isHighlight?: boolean
  codeSnippet: React.ReactNode
}

function Lane({ lane, tasks, label, badge, badgeColor, isHighlight, codeSnippet }: LaneProps) {
  const totalDuration = tasks.reduce((sum, t) => sum + t.duration, 0)
  const maxDuration = Math.max(...tasks.map((t) => t.duration))
  const _refDuration = lane.id === 'parallel' ? maxDuration : totalDuration
  void _refDuration

  return (
    <motion.div
      className="rounded-xl border overflow-hidden"
      style={{
        background: 'rgba(26,26,38,0.8)',
        backdropFilter: 'blur(12px)',
        borderColor: isHighlight
          ? 'rgba(16,185,129,0.4)'
          : 'rgba(255,255,255,0.08)',
        boxShadow: isHighlight ? '0 0 30px rgba(16,185,129,0.1)' : 'none',
      }}
      animate={{ borderColor: isHighlight ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.08)' }}
    >
      {/* Lane header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm text-[#F5F5F7]">{label}</span>
          {badge && (
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold"
              style={{
                background: badgeColor ? `${badgeColor}22` : 'rgba(255,255,255,0.08)',
                color: badgeColor ?? '#A1A1AA',
                border: `1px solid ${badgeColor ? `${badgeColor}44` : 'rgba(255,255,255,0.12)'}`,
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {lane.isComplete && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="text-xs font-mono font-semibold"
              style={{ color: isHighlight ? '#10B981' : '#A1A1AA' }}
            >
              {lane.totalTime}ms
              {isHighlight && ' ✓ fastest!'}
            </motion.span>
          )}
        </div>
      </div>

      {/* Timeline bar */}
      <div className="px-5 py-4">
        <div className="relative h-12 bg-[#12121A] rounded-lg overflow-hidden border border-[rgba(255,255,255,0.06)]">
          {/* Task blocks */}
          {tasks.map((task, i) => {
            const taskProgress = lane.progress[i] ?? 0
            const taskWidth = (task.duration / totalDuration) * 100

            // Position: for sync/sequential, tasks are sequential
            // For parallel, all start at x=0
            let left: number
            if (lane.id === 'parallel') {
              left = 0
            } else {
              const prevDurations = tasks.slice(0, i).reduce((sum, t) => sum + t.duration, 0)
              left = (prevDurations / totalDuration) * 100
            }

            const fillWidth = (taskProgress / 100) * taskWidth

            return (
              <div
                key={task.id}
                className="absolute top-0 bottom-0 flex items-center justify-center"
                style={{
                  left: `${left}%`,
                  width: `${taskWidth}%`,
                }}
              >
                {/* Track */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: task.color }}
                />
                {/* Fill */}
                <motion.div
                  className="absolute top-0 bottom-0 left-0"
                  style={{ background: task.color, opacity: 0.85 }}
                  animate={{ width: `${fillWidth > 0 ? (fillWidth / taskWidth) * 100 : 0}%` }}
                  transition={{ ease: 'linear', duration: 0 }}
                />
                {/* Label */}
                <span
                  className="relative z-10 text-[10px] font-mono font-bold text-white"
                  style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
                >
                  T{task.id}
                </span>
                {/* Separator line */}
                {i < tasks.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-[rgba(0,0,0,0.4)]" />
                )}
              </div>
            )
          })}

          {/* Progress cursor */}
          {!lane.isComplete && lane.progress.some((p) => p > 0) && (
            <motion.div
              className="absolute top-0 bottom-0 w-0.5 bg-white"
              style={{ opacity: 0.6 }}
              animate={{
                left: `${
                  lane.id === 'parallel'
                    ? ((Math.max(...lane.progress) / 100) * Math.max(...tasks.map((t) => t.duration)) / totalDuration) * 100
                    : (() => {
                        let elapsed = 0
                        for (let i = 0; i < tasks.length; i++) {
                          if (lane.progress[i] < 100) {
                            elapsed += (tasks[i].duration * lane.progress[i]) / 100
                            break
                          } else {
                            elapsed += tasks[i].duration
                          }
                        }
                        return (elapsed / totalDuration) * 100
                      })()
                }%`,
              }}
              transition={{ ease: 'linear', duration: 0 }}
            />
          )}
        </div>

        {/* Task duration labels */}
        <div className="flex mt-1.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="text-center text-[9px] font-mono text-[#71717A]"
              style={{ flex: task.duration }}
            >
              {task.duration}ms
            </div>
          ))}
        </div>
      </div>

      {/* Code snippet */}
      <div className="px-5 pb-4">
        <div className="bg-[#0A0A0F] rounded-lg p-3 border border-[rgba(255,255,255,0.06)]">
          {codeSnippet}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AsyncTimeline() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [speed, setSpeed] = useState<SpeedMultiplier>(0.5)
  const [elapsedMs, setElapsedMs] = useState<number>(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const [syncState, setSyncState] = useState<LaneState>({
    id: 'sync',
    progress: [0, 0, 0, 0, 0],
    totalTime: 0,
    isComplete: false,
  })
  const [seqState, setSeqState] = useState<LaneState>({
    id: 'sequential',
    progress: [0, 0, 0, 0, 0],
    totalTime: 0,
    isComplete: false,
  })
  const [parState, setParState] = useState<LaneState>({
    id: 'parallel',
    progress: [0, 0, 0, 0, 0],
    totalTime: 0,
    isComplete: false,
  })

  const rafRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const simTimeRef = useRef(0)
  const startRealTimeRef = useRef(0)

  // Generate tasks on mount
  useEffect(() => {
    const durations = generateTaskDurations()
    setTasks(
      durations.map((d, i) => ({
        id: i + 1,
        name: `Task ${i + 1}`,
        duration: d,
        color: TASK_COLORS[i],
      }))
    )
  }, [])

  const resetStates = (taskList: Task[]) => {
    const zeros = taskList.map(() => 0)
    setSyncState({ id: 'sync', progress: zeros, totalTime: 0, isComplete: false })
    setSeqState({ id: 'sequential', progress: zeros, totalTime: 0, isComplete: false })
    setParState({ id: 'parallel', progress: zeros, totalTime: 0, isComplete: false })
    setIsRunning(false)
    setIsDone(false)
    setElapsedMs(0)
    simTimeRef.current = 0
  }

  const reset = () => {
    if (rafRef.current) clearInterval(rafRef.current)
    resetStates(tasks)
  }

  const computeLaneProgress = (
    simTime: number,
    taskList: Task[],
    mode: 'sequential' | 'parallel'
  ): { progress: number[]; isComplete: boolean; totalTime: number } => {
    const totalDuration = taskList.reduce((s, t) => s + t.duration, 0)
    const maxDuration = Math.max(...taskList.map((t) => t.duration))

    if (mode === 'parallel') {
      const progress = taskList.map((t) =>
        Math.min(100, (simTime / t.duration) * 100)
      )
      const isComplete = simTime >= maxDuration
      return { progress, isComplete, totalTime: Math.min(simTime, maxDuration) }
    } else {
      // Sequential
      const progress = taskList.map(() => 0)
      let elapsed = 0
      for (let i = 0; i < taskList.length; i++) {
        const taskStart = elapsed
        const taskEnd = elapsed + taskList[i].duration
        if (simTime <= taskStart) {
          progress[i] = 0
        } else if (simTime >= taskEnd) {
          progress[i] = 100
        } else {
          progress[i] = ((simTime - taskStart) / taskList[i].duration) * 100
        }
        elapsed = taskEnd
      }
      const isComplete = simTime >= totalDuration
      return {
        progress,
        isComplete,
        totalTime: Math.min(simTime, totalDuration),
      }
    }
  }

  const run = () => {
    if (isRunning) return
    resetStates(tasks)
    setIsRunning(true)
    simTimeRef.current = 0
    startRealTimeRef.current = Date.now()

    rafRef.current = setInterval(() => {
      const realElapsed = Date.now() - startRealTimeRef.current
      const simTime = realElapsed * speed

      simTimeRef.current = simTime

      const totalDuration = tasks.reduce((s, t) => s + t.duration, 0)
      const maxDuration = Math.max(...tasks.map((t) => t.duration))

      setElapsedMs(Math.round(realElapsed))

      const seqResult = computeLaneProgress(simTime, tasks, 'sequential')
      const parResult = computeLaneProgress(simTime, tasks, 'parallel')

      setSyncState({
        id: 'sync',
        progress: seqResult.progress,
        totalTime: Math.round(seqResult.totalTime),
        isComplete: seqResult.isComplete,
      })
      setSeqState({
        id: 'sequential',
        progress: seqResult.progress,
        totalTime: Math.round(seqResult.totalTime),
        isComplete: seqResult.isComplete,
      })
      setParState({
        id: 'parallel',
        progress: parResult.progress,
        totalTime: Math.round(parResult.totalTime),
        isComplete: parResult.isComplete,
      })

      if (simTime >= totalDuration) {
        if (rafRef.current) clearInterval(rafRef.current)
        setIsRunning(false)
        setIsDone(true)
        // Set final exact totals
        setSyncState({
          id: 'sync',
          progress: tasks.map(() => 100),
          totalTime: totalDuration,
          isComplete: true,
        })
        setSeqState({
          id: 'sequential',
          progress: tasks.map(() => 100),
          totalTime: totalDuration,
          isComplete: true,
        })
        setParState({
          id: 'parallel',
          progress: tasks.map(() => 100),
          totalTime: maxDuration,
          isComplete: true,
        })
      }
    }, TICK_MS)
  }

  const totalDuration = tasks.reduce((s, t) => s + t.duration, 0)
  const maxDuration = tasks.length > 0 ? Math.max(...tasks.map((t) => t.duration)) : 0
  const savings = totalDuration - maxDuration
  const savingsPct = totalDuration > 0 ? Math.round((savings / totalDuration) * 100) : 0

  return (
    <div className="w-full text-[#F5F5F7]">

      {/* ── Header + Controls ── */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#F5F5F7] font-display">
            Async Execution Timeline
          </h2>
          <p className="text-[#A1A1AA] text-sm mt-1">
            Dekho parallel execution kaise time bachata hai
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Speed selector */}
          <div
            className="flex items-center gap-1 rounded-lg border border-[rgba(255,255,255,0.1)] p-1"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <span className="text-[10px] text-[#71717A] px-2">Speed</span>
            {([0.5, 1, 2, 4] as SpeedMultiplier[]).map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className="px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all"
                style={{
                  background: speed === s ? '#7C3AED' : 'transparent',
                  color: speed === s ? '#F5F5F7' : '#A1A1AA',
                }}
                title={s === 0.5 ? '🐢 Beginner mode — 2x slower' : undefined}
              >
                {s === 0.5 ? '🐢 0.5x' : `${s}x`}
              </button>
            ))}
          </div>

          <button
            onClick={run}
            disabled={isRunning || tasks.length === 0}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              boxShadow: isRunning ? '0 0 20px rgba(124,58,237,0.5)' : 'none',
            }}
          >
            {isRunning ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Running…
              </span>
            ) : (
              '▶ Run All'
            )}
          </button>

          {/* Real-time elapsed counter */}
          {isRunning && (
            <div
              className="px-4 py-2.5 rounded-lg text-sm font-mono font-semibold border"
              style={{ background: 'rgba(6,182,212,0.1)', borderColor: 'rgba(6,182,212,0.4)', color: '#06B6D4' }}
            >
              ⏱ {elapsedMs}ms
            </div>
          )}

          <button
            onClick={reset}
            className="px-4 py-2.5 rounded-lg text-sm text-[#A1A1AA] hover:text-[#F5F5F7] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] transition-all"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            ↺ Reset
          </button>
        </div>
      </div>

      {/* ── Task chips ── */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <span className="text-xs text-[#71717A]">Tasks:</span>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono"
            style={{
              background: `${task.color}18`,
              border: `1px solid ${task.color}44`,
              color: task.color,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: task.color }} />
            T{task.id}: {task.duration}ms
          </div>
        ))}
      </div>

      {/* ── Three Lanes ── */}
      <div className="space-y-4">
        <Lane
          lane={syncState}
          tasks={tasks}
          label="Synchronous"
          badge="Blocking"
          badgeColor="#EF4444"
          codeSnippet={tasks.length > 0 ? <SyncCodeSnippet tasks={tasks} /> : null}
        />
        <Lane
          lane={seqState}
          tasks={tasks}
          label="Sequential Async"
          badge="await each"
          badgeColor="#F59E0B"
          codeSnippet={tasks.length > 0 ? <SequentialCodeSnippet tasks={tasks} /> : null}
        />
        <Lane
          lane={parState}
          tasks={tasks}
          label="Parallel Async"
          badge="Promise.all"
          badgeColor="#10B981"
          isHighlight={isDone}
          codeSnippet={tasks.length > 0 ? <ParallelCodeSnippet tasks={tasks} /> : null}
        />
      </div>

      {/* ── Results summary ── */}
      <AnimatePresence>
        {isDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-6 rounded-xl border border-[rgba(16,185,129,0.3)] overflow-hidden"
            style={{ background: 'rgba(16,185,129,0.06)', backdropFilter: 'blur(12px)' }}
          >
            <div className="px-6 py-5">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <p className="text-sm font-semibold text-[#10B981] mb-1">
                    Promise.all ka magic ✨
                  </p>
                  <p className="text-sm text-[#A1A1AA]">
                    Promise.all ka magic: sab tasks simultaneously start hote hain! Total time = sabse slow task ki time, sab ka sum nahi.
                  </p>
                </div>

                <div className="flex gap-6 flex-wrap">
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-[#EF4444]">
                      {totalDuration}ms
                    </div>
                    <div className="text-[11px] text-[#71717A] mt-0.5">Sequential</div>
                  </div>
                  <div className="flex items-center text-[#71717A]">→</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono text-[#10B981]">
                      {maxDuration}ms
                    </div>
                    <div className="text-[11px] text-[#71717A] mt-0.5">Parallel</div>
                  </div>
                  <div className="flex items-center">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                      className="px-4 py-2 rounded-xl text-lg font-bold font-mono text-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(6,182,212,0.3))',
                        color: '#10B981',
                        border: '2px solid rgba(16,185,129,0.5)',
                        textShadow: '0 0 20px rgba(16,185,129,0.5)',
                      }}
                    >
                      ⚡ {savingsPct}% faster!
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Timing bars comparison */}
              <div className="mt-5 space-y-3">
                <div>
                  <div className="flex justify-between text-[11px] text-[#A1A1AA] mb-1.5">
                    <span className="font-mono">Sequential / Sync</span>
                    <span className="font-mono">{totalDuration}ms</span>
                  </div>
                  <div className="h-3 bg-[#12121A] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: '100%',
                        background: 'linear-gradient(90deg, #EF4444, #F59E0B)',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-[#A1A1AA] mb-1.5">
                    <span className="font-mono">Promise.all (Parallel)</span>
                    <span className="font-mono text-[#10B981]">{maxDuration}ms</span>
                  </div>
                  <div className="h-3 bg-[#12121A] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #10B981, #06B6D4)',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(maxDuration / totalDuration) * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Teaching tip ── */}
      <div
        className="mt-6 rounded-xl border border-[rgba(255,255,255,0.08)] px-5 py-4 flex items-start gap-3"
        style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
      >
        <span className="text-lg mt-0.5">💡</span>
        <div>
          <p className="text-sm font-semibold text-[#F5F5F7] mb-1">Key Insight</p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            <span className="text-[#7C3AED] font-semibold">Sequential async</span> aur{' '}
            <span className="text-[#EF4444] font-semibold">sync</span> mein same time lagta hai —
            dono ek-ek karke wait karte hain. Lekin{' '}
            <span className="text-[#10B981] font-semibold">Promise.all</span> se sab ek saath
            start hote hain. Total time = <em>slowest task ki time</em>, sum nahi!
          </p>
        </div>
      </div>
    </div>
  )
}
