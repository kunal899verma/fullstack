'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type PostCount = 5 | 10 | 20 | 50

interface QueryArrow {
  id: number
  type: 'naive' | 'optimized'
  label: string
  delay: number
}

export default function NPlusOneVisualizer() {
  const [postCount, setPostCount] = useState<PostCount>(10)
  const [running, setRunning] = useState(false)
  const [naiveArrows, setNaiveArrows] = useState<QueryArrow[]>([])
  const [optimizedArrows, setOptimizedArrows] = useState<QueryArrow[]>([])
  const [naiveDone, setNaiveDone] = useState(false)
  const [optimizedDone, setOptimizedDone] = useState(false)
  const [naiveProgress, setNaiveProgress] = useState(0)
  const [optimizedProgress, setOptimizedProgress] = useState(0)

  const naiveTime = Math.round(50 + postCount * 50)
  const optimizedTime = Math.round(25 + postCount * 0.5)
  const speedup = Math.round(naiveTime / optimizedTime)

  const reset = () => {
    setNaiveArrows([])
    setOptimizedArrows([])
    setNaiveDone(false)
    setOptimizedDone(false)
    setNaiveProgress(0)
    setOptimizedProgress(0)
    setRunning(false)
  }

  const runBoth = useCallback(async () => {
    reset()
    await new Promise(r => setTimeout(r, 50))
    setRunning(true)

    // Build naive arrows
    const naiveQueries: QueryArrow[] = [
      { id: 0, type: 'naive', label: `SELECT * FROM posts (1 query)`, delay: 0 },
      ...Array.from({ length: postCount }, (_, i) => ({
        id: i + 1,
        type: 'naive' as const,
        label: `SELECT * FROM users WHERE id = ${i + 1}`,
        delay: (i + 1) * 300,
      })),
    ]

    // Emit naive arrows one by one
    for (const arrow of naiveQueries) {
      await new Promise(r => setTimeout(r, arrow.id === 0 ? 0 : 300))
      setNaiveArrows(prev => [...prev, arrow])
      setNaiveProgress(((arrow.id + 1) / (postCount + 1)) * 100)
    }

    await new Promise(r => setTimeout(r, 500))
    setNaiveDone(true)

    // Optimized — single query with delay
    await new Promise(r => setTimeout(r, 200))
    setOptimizedArrows([{ id: 0, type: 'optimized', label: 'SELECT posts.*, users.* FROM posts JOIN users ON...', delay: 0 }])
    setOptimizedProgress(100)
    await new Promise(r => setTimeout(r, 500))
    setOptimizedDone(true)
    setRunning(false)
  }, [postCount])

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-5">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <div className="text-[#A1A1AA] text-sm mb-2">Number of Posts (N)</div>
            <div className="flex gap-2">
              {([5, 10, 20, 50] as PostCount[]).map(n => (
                <button
                  key={n}
                  onClick={() => { setPostCount(n); reset() }}
                  className={`w-12 h-10 rounded-lg font-mono font-bold text-sm transition-all ${
                    postCount === n
                      ? 'bg-[#7C3AED] text-white'
                      : 'bg-[#1A1A26] text-[#A1A1AA] border border-[rgba(255,255,255,0.12)] hover:text-[#F5F5F7]'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={running ? reset : runBoth}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                running
                  ? 'bg-[#EF4444] hover:bg-[#DC2626] text-white'
                  : 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white'
              }`}
            >
              {running ? '⏹ Stop' : '▶ Run Both'}
            </button>
            <button onClick={reset} className="px-5 py-2 rounded-lg border border-[rgba(255,255,255,0.12)] text-[#A1A1AA] hover:text-[#F5F5F7]">
              Reset
            </button>
          </div>

          <div className="ml-auto text-right hidden md:block">
            <div className="text-[#A1A1AA] text-xs">Naive queries</div>
            <div className="text-[#EF4444] font-mono font-bold text-xl">{postCount + 1}</div>
            <div className="text-[#71717A] text-[10px] mt-1">Watch each query appear — 300ms apart</div>
          </div>
        </div>
      </div>

      {/* Split screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — Naive N+1 */}
        <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(239,68,68,0.3)] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">❌</span>
            <h3 className="text-[#F5F5F7] font-bold text-lg">Naive Approach</h3>
            <span className="ml-auto bg-[rgba(239,68,68,0.15)] text-[#EF4444] text-xs px-2 py-1 rounded-full font-mono font-bold">
              {postCount + 1} queries
            </span>
          </div>

          {/* Code */}
          <pre className="bg-[#0A0A0F] rounded-xl p-4 text-xs font-mono text-[#A1A1AA] leading-relaxed mb-4 overflow-x-auto">
<span className="text-[#71717A]">{'// Get all posts, then author for each'}</span>{'\n'}
<span className="text-[#7C3AED]">const</span> posts = <span className="text-[#F59E0B]">await</span> Post.<span className="text-[#06B6D4]">find</span>(); <span className="text-[#71717A]">{'// 1 query'}</span>{'\n'}
<span className="text-[#7C3AED]">for</span> (<span className="text-[#7C3AED]">const</span> post <span className="text-[#7C3AED]">of</span> posts) {`{`}{'\n'}
{'  '}post.author = <span className="text-[#F59E0B]">await</span> User.<span className="text-[#06B6D4]">findById</span>(post.authorId); <span className="text-[#EF4444]">{'// N queries!'}</span>{'\n'}
{`}`}
          </pre>

          {/* DB visualization */}
          <div className="relative min-h-[200px]">
            {/* App Server */}
            <div className="flex justify-between items-start gap-4">
              <div className="bg-[#1A1A26] border border-[rgba(255,255,255,0.12)] rounded-xl p-3 w-28 text-center flex-shrink-0">
                <div className="text-lg mb-1">💻</div>
                <div className="text-[#F5F5F7] text-xs font-bold">App Server</div>
              </div>

              {/* Arrows column */}
              <div className="flex-1 space-y-1.5 min-h-[160px] overflow-y-auto max-h-[200px]">
                <AnimatePresence>
                  {naiveArrows.map((arrow) => (
                    <motion.div
                      key={arrow.id}
                      initial={{ opacity: 0, x: -20, scaleX: 0 }}
                      animate={{ opacity: 1, x: 0, scaleX: 1 }}
                      className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-mono ${
                        arrow.id === 0
                          ? 'bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.3)] text-[#7C3AED]'
                          : 'bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-[#EF4444]'
                      }`}
                      style={{ originX: 0 }}
                    >
                      <span className="shrink-0">→</span>
                      <span className="truncate">{arrow.label}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* DB */}
              <motion.div
                className={`bg-[#1A1A26] border rounded-xl p-3 w-24 text-center flex-shrink-0 transition-all ${
                  naiveArrows.length > postCount / 2 && !naiveDone
                    ? 'border-[#EF4444] shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                    : naiveDone
                    ? 'border-[#EF4444]'
                    : 'border-[rgba(255,255,255,0.12)]'
                }`}
                animate={naiveArrows.length > 5 && !naiveDone ? { scale: [1, 1.02, 1] } : {}}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <div className="text-lg mb-1">🗄️</div>
                <div className="text-xs font-bold text-[#F5F5F7]">DB</div>
                {naiveArrows.length > postCount / 2 && !naiveDone && (
                  <div className="text-[#EF4444] text-[10px] mt-1">Overwhelmed!</div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-2 bg-[#0A0A0F] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#EF4444] rounded-full"
                animate={{ width: `${naiveProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          {naiveDone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-lg text-center"
            >
              <div className="text-[#EF4444] font-bold font-mono text-lg">{naiveTime}ms</div>
              <div className="text-[#A1A1AA] text-xs">{postCount + 1} queries fired to DB</div>
            </motion.div>
          )}
        </div>

        {/* Right — Optimized */}
        <div className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(16,185,129,0.3)] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">✅</span>
            <h3 className="text-[#F5F5F7] font-bold text-lg">With JOIN / populate()</h3>
            <span className="ml-auto bg-[rgba(16,185,129,0.15)] text-[#10B981] text-xs px-2 py-1 rounded-full font-mono font-bold">
              1 query
            </span>
          </div>

          {/* Code */}
          <pre className="bg-[#0A0A0F] rounded-xl p-4 text-xs font-mono text-[#A1A1AA] leading-relaxed mb-4 overflow-x-auto">
<span className="text-[#71717A]">{'// Single query with JOIN'}</span>{'\n'}
<span className="text-[#7C3AED]">const</span> posts = <span className="text-[#F59E0B]">await</span> Post.<span className="text-[#06B6D4]">find</span>(){'\n'}
{'  '}.<span className="text-[#10B981]">populate</span>(<span className="text-[#F59E0B]">{"'author'"}</span>);{'\n'}
<span className="text-[#71717A]">{'// OR in SQL:'}</span>{'\n'}
<span className="text-[#71717A]">{'// SELECT posts.*, users.*'}</span>{'\n'}
<span className="text-[#71717A]">{'// FROM posts'}</span>{'\n'}
<span className="text-[#71717A]">{'// JOIN users ON posts.author_id = users.id'}</span>
          </pre>

          {/* DB visualization */}
          <div className="relative min-h-[200px]">
            <div className="flex justify-between items-start gap-4">
              <div className="bg-[#1A1A26] border border-[rgba(255,255,255,0.12)] rounded-xl p-3 w-28 text-center flex-shrink-0">
                <div className="text-lg mb-1">💻</div>
                <div className="text-[#F5F5F7] text-xs font-bold">App Server</div>
              </div>

              <div className="flex-1 space-y-1.5">
                <AnimatePresence>
                  {optimizedArrows.map(arrow => (
                    <motion.div
                      key={arrow.id}
                      initial={{ opacity: 0, x: -20, scaleX: 0 }}
                      animate={{ opacity: 1, x: 0, scaleX: 1 }}
                      className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-mono bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] text-[#10B981]"
                      style={{ originX: 0 }}
                    >
                      <span>→</span>
                      <span className="truncate">{arrow.label}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {optimizedDone && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-mono bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.3)] text-[#06B6D4]"
                  >
                    <span>←</span>
                    <span>All {postCount} posts + authors in one response!</span>
                  </motion.div>
                )}
              </div>

              <div className={`bg-[#1A1A26] border rounded-xl p-3 w-24 text-center flex-shrink-0 transition-all ${
                optimizedDone ? 'border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-[rgba(255,255,255,0.12)]'
              }`}>
                <div className="text-lg mb-1">🗄️</div>
                <div className="text-xs font-bold text-[#F5F5F7]">DB</div>
                {optimizedDone && <div className="text-[#10B981] text-[10px] mt-1">Happy! ✓</div>}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-2 bg-[#0A0A0F] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#10B981] rounded-full"
                animate={{ width: `${optimizedProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {optimizedDone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] rounded-lg text-center"
            >
              <div className="text-[#10B981] font-bold font-mono text-lg">{optimizedTime}ms</div>
              <div className="text-[#A1A1AA] text-xs">1 query — all data returned at once</div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Comparison bar */}
      {(naiveDone || optimizedDone) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[rgba(26,26,38,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.12)] rounded-2xl p-6"
        >
          <h3 className="text-[#F5F5F7] font-bold mb-4">Performance Comparison</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#EF4444]">Naive (N+1): {postCount + 1} queries</span>
                <span className="text-[#EF4444] font-mono font-bold">{naiveTime}ms</span>
              </div>
              <div className="h-5 bg-[#0A0A0F] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#EF4444] rounded-full flex items-center justify-end pr-2"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-white text-xs font-mono">{naiveTime}ms</span>
                </motion.div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#10B981]">Optimized (JOIN): 1 query</span>
                <span className="text-[#10B981] font-mono font-bold">{optimizedTime}ms</span>
              </div>
              <div className="h-5 bg-[#0A0A0F] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#10B981] rounded-full flex items-center justify-end pr-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${(optimizedTime / naiveTime) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <span className="text-white text-xs font-mono">{optimizedTime}ms</span>
                </motion.div>
              </div>
            </div>
          </div>

          {naiveDone && optimizedDone && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="mt-4 text-center p-6 rounded-xl border-2"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.12))',
                borderColor: 'rgba(16,185,129,0.5)',
              }}
            >
              <div
                className="text-4xl font-bold font-mono mb-1"
                style={{
                  color: '#10B981',
                  textShadow: '0 0 30px rgba(16,185,129,0.6)',
                }}
              >
                ⚡ {speedup}x faster!
              </div>
              <div className="text-[#F5F5F7] text-base font-semibold mt-1">
                {naiveTime}ms → {optimizedTime}ms
              </div>
              <div className="text-[#A1A1AA] text-sm mt-1">
                Sirf JOIN use karne se {naiveTime - optimizedTime}ms bach gaye — {postCount} users ke liye!
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Teaching callout */}
      <div className="bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.3)] rounded-2xl p-5">
        <div className="text-[#7C3AED] font-bold mb-2">💡 N+1 Problem Kya Hai?</div>
        <p className="text-[#A1A1AA] text-sm leading-relaxed">
          Jab tum ek loop mein har item ke liye alag DB query karte ho, toh N+1 problem hota hai.
          N posts ke liye 1 query + N author queries = N+1 total queries. Ye exponentially slow ho jata hai jaise N barhta hai.
          Solution: <code className="bg-[#0A0A0F] px-1 py-0.5 rounded text-[#10B981] font-mono text-xs">.populate()</code> (Mongoose),{' '}
          <code className="bg-[#0A0A0F] px-1 py-0.5 rounded text-[#10B981] font-mono text-xs">JOIN</code> (SQL), ya{' '}
          <code className="bg-[#0A0A0F] px-1 py-0.5 rounded text-[#10B981] font-mono text-xs">DataLoader</code> (GraphQL) use karo!
        </p>
      </div>
    </div>
  )
}
