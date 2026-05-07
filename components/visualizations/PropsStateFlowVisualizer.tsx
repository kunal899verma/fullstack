'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FlowPacket {
  id: number
  direction: 'down' | 'up'
  label: string
  color: string
  path: string[]
  currentIdx: number
}

// ─── Component tree definition ────────────────────────────────────────────────

const TREE_NODES = [
  { id: 'app', label: 'App', depth: 0, x: 50, y: 0, stateLabel: 'state: { user, count }' },
  { id: 'header', label: 'Header', depth: 1, x: 15, y: 1, propsLabel: 'props: user' },
  { id: 'dashboard', label: 'Dashboard', depth: 1, x: 75, y: 1, propsLabel: 'props: count' },
  { id: 'countdisplay', label: 'CountDisplay', depth: 2, x: 75, y: 2, propsLabel: 'props: count (read-only)' },
]

// ─── Scenarios ────────────────────────────────────────────────────────────────

interface Scenario {
  id: string
  label: string
  description: string
  packets: Omit<FlowPacket, 'id' | 'currentIdx'>[]
  explanation: string
  color: string
}

const SCENARIOS: Scenario[] = [
  {
    id: 'props-down',
    label: 'Change User (Props Down)',
    description: 'App state changes → props flow down to Header',
    color: '#06B6D4',
    packets: [
      { direction: 'down', label: 'user="Alice"', color: '#06B6D4', path: ['app', 'header'] },
    ],
    explanation: 'Data props ki form mein parent se child ko jaata hai — ye UNIDIRECTIONAL flow hai. Header sirf read kar sakta hai.',
  },
  {
    id: 'event-up',
    label: 'Increment Count (Event Up)',
    description: 'CountDisplay triggers event → App state updates → props flow back',
    color: '#F59E0B',
    packets: [
      { direction: 'up', label: 'onIncrement()', color: '#F59E0B', path: ['countdisplay', 'dashboard', 'app'] },
      { direction: 'down', label: 'count=2', color: '#06B6D4', path: ['app', 'dashboard', 'countdisplay'] },
    ],
    explanation: 'Child parent ko directly modify nahi kar sakta. Callback function pass hota hai — child call karta hai → parent state update karta hai → props flow down.',
  },
  {
    id: 'lifting',
    label: 'Lifting State Up Demo',
    description: 'Sibling components need to share data',
    color: '#7C3AED',
    packets: [
      { direction: 'up', label: 'shared data', color: '#7C3AED', path: ['header', 'app'] },
      { direction: 'down', label: 'data prop', color: '#7C3AED', path: ['app', 'dashboard'] },
    ],
    explanation: 'Jab do siblings same data share karein — state ko unke common parent (App) mein "lift" karte hain. Dono phir props mein receive karte hain.',
  },
]

// ─── Node layout positions (percentage based) ─────────────────────────────────

const NODE_POS: Record<string, { x: number; y: number }> = {
  app: { x: 50, y: 8 },
  header: { x: 20, y: 38 },
  dashboard: { x: 73, y: 38 },
  countdisplay: { x: 73, y: 68 },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface TreeNodeProps {
  node: typeof TREE_NODES[0]
  highlight: boolean
  highlightColor: string
}

function TreeNode({ node, highlight, highlightColor }: TreeNodeProps) {
  const pos = NODE_POS[node.id]
  if (!pos) return null

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <motion.div
        animate={highlight ? {
          boxShadow: [`0 0 0px ${highlightColor}00`, `0 0 20px ${highlightColor}80`, `0 0 8px ${highlightColor}40`],
          borderColor: `${highlightColor}80`,
        } : {
          boxShadow: '0 0 0px transparent',
          borderColor: 'rgba(255,255,255,0.12)',
        }}
        transition={{ duration: 0.4 }}
        className="rounded-xl border-2 px-4 py-2.5 text-center"
        style={{
          background: highlight ? `${highlightColor}12` : 'rgba(26,26,38,0.9)',
          minWidth: 110,
        }}
      >
        <div className="font-mono font-bold text-sm text-[#F5F5F7]">{node.label}</div>
        {'stateLabel' in node && node.stateLabel && (
          <div className="text-[9px] font-mono text-[#7C3AED] mt-0.5">{node.stateLabel}</div>
        )}
        {'propsLabel' in node && node.propsLabel && (
          <div className="text-[9px] font-mono text-[#06B6D4] mt-0.5">{node.propsLabel}</div>
        )}
      </motion.div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PropsStateFlowVisualizer() {
  const [activeScenario, setActiveScenario] = useState<string | null>(null)
  const [packets, setPackets] = useState<FlowPacket[]>([])
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set())
  const [highlightColor, setHighlightColor] = useState('#06B6D4')
  const [explanation, setExplanation] = useState('')
  const [animating, setAnimating] = useState(false)
  const counterRef = useRef(0)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const runScenario = useCallback((scenario: Scenario) => {
    if (animating) return
    clearTimers()
    setAnimating(true)
    setActiveScenario(scenario.id)
    setPackets([])
    setHighlightedNodes(new Set())
    setHighlightColor(scenario.color)
    setExplanation(scenario.explanation)

    let delay = 200

    scenario.packets.forEach((packetDef) => {
      // Animate through each step in path
      packetDef.path.forEach((nodeId, pathIdx) => {
        const t = setTimeout(() => {
          setHighlightedNodes((prev) => { const s = new Set(prev); s.add(nodeId); return s })
          counterRef.current += 1
          const packetId = counterRef.current

          setPackets((prev) => {
            const existing = prev.find((p) => p.label === packetDef.label)
            if (existing) {
              return prev.map((p) =>
                p.id === existing.id ? { ...p, currentIdx: pathIdx } : p
              )
            }
            return [
              ...prev,
              {
                id: packetId,
                direction: packetDef.direction,
                label: packetDef.label,
                color: packetDef.color,
                path: packetDef.path,
                currentIdx: pathIdx,
              },
            ]
          })
        }, delay)
        timersRef.current.push(t)
        delay += 700
      })
      delay += 300
    })

    const done = setTimeout(() => {
      setAnimating(false)
    }, delay + 300)
    timersRef.current.push(done)
  }, [animating, clearTimers])

  const reset = useCallback(() => {
    clearTimers()
    setActiveScenario(null)
    setPackets([])
    setHighlightedNodes(new Set())
    setExplanation('')
    setAnimating(false)
  }, [clearTimers])

  return (
    <div className="w-full text-[#F5F5F7]">
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4 min-h-[520px]">

        {/* ── LEFT: Tree + animations ── */}
        <div
          className="rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
          style={{ background: 'rgba(18,18,26,0.9)' }}
        >
          <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
            <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">Component Tree — Data Flow</span>
          </div>

          <div className="relative" style={{ height: 340 }}>
            {/* SVG connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* App → Header */}
              <line x1="50%" y1="12%" x2="20%" y2="34%" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* App → Dashboard */}
              <line x1="50%" y1="12%" x2="73%" y2="34%" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Dashboard → CountDisplay */}
              <line x1="73%" y1="44%" x2="73%" y2="64%" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Animated flow packets */}
              {packets.map((packet) => {
                const fromNode = packet.path[Math.max(0, packet.currentIdx - 1)]
                const toNode = packet.path[packet.currentIdx]
                if (!fromNode || !toNode) return null
                const from = NODE_POS[fromNode]
                const to = NODE_POS[toNode]
                if (!from || !to) return null
                const midX = (from.x + to.x) / 2
                const midY = (from.y + to.y) / 2

                return (
                  <g key={packet.id}>
                    <motion.circle
                      cx={`${from.x}%`}
                      cy={`${from.y}%`}
                      r={8}
                      fill={packet.color}
                      style={{ filter: `drop-shadow(0 0 8px ${packet.color})` }}
                      animate={{ cx: [`${from.x}%`, `${to.x}%`], cy: [`${from.y}%`, `${to.y}%`] }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    />
                    <motion.text
                      x={`${midX}%`}
                      y={`${midY - 2}%`}
                      textAnchor="middle"
                      fill={packet.color}
                      fontSize={9}
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {packet.label}
                    </motion.text>
                    {/* Arrow direction indicator */}
                    <motion.text
                      x={`${midX}%`}
                      y={`${midY + 2}%`}
                      textAnchor="middle"
                      fill={packet.color}
                      fontSize={11}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {packet.direction === 'down' ? '↓' : '↑'}
                    </motion.text>
                  </g>
                )
              })}
            </svg>

            {/* Nodes */}
            {TREE_NODES.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                highlight={highlightedNodes.has(node.id)}
                highlightColor={highlightColor}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="px-4 pb-4 flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#06B6D4]" />
              <span className="text-[10px] text-[#A1A1AA]">Props flow down</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span className="text-[10px] text-[#A1A1AA]">Events flow up</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span className="text-[10px] text-[#A1A1AA]">Lift state</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Controls + Explanation ── */}
        <div className="flex flex-col gap-4">
          {/* Buttons */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 flex flex-col gap-2"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2">Scenarios</p>
            {SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => runScenario(scenario)}
                disabled={animating}
                className="w-full px-4 py-3 rounded-lg text-left border transition-all disabled:opacity-50"
                style={
                  activeScenario === scenario.id
                    ? { background: `${scenario.color}15`, borderColor: `${scenario.color}60`, color: scenario.color }
                    : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', color: '#A1A1AA' }
                }
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: scenario.color }} />
                  <span className="text-sm font-semibold">{scenario.label}</span>
                </div>
                <p className="text-[10px] leading-relaxed pl-4" style={{ color: activeScenario === scenario.id ? `${scenario.color}99` : '#71717A' }}>
                  {scenario.description}
                </p>
              </button>
            ))}
            <button
              onClick={reset}
              className="w-full py-1.5 mt-1 rounded-lg text-xs text-[#71717A] border border-[rgba(255,255,255,0.08)] hover:text-[#A1A1AA] transition-all"
            >
              ↺ Reset
            </button>
          </div>

          {/* Explanation */}
          <AnimatePresence mode="wait">
            {explanation ? (
              <motion.div
                key={activeScenario}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border-2 p-4 flex-1"
                style={{ background: `${highlightColor}08`, borderColor: `${highlightColor}40` }}
              >
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-lg">💡</span>
                  <p className="text-sm font-semibold" style={{ color: highlightColor }}>Kya ho raha hai?</p>
                </div>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">{explanation}</p>

                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] mb-2">Golden Rule</p>
                  <p className="text-xs text-[#F5F5F7] font-semibold">
                    Props = read-only in child. Child kabhi parent ki state directly change nahi karta.
                    Callback function pass hota hai — wo call karna = parent state update karna.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-[rgba(255,255,255,0.06)] p-4 flex-1 flex items-center justify-center"
                style={{ background: 'rgba(26,26,38,0.5)' }}
              >
                <p className="text-sm text-[#71717A] text-center">
                  Ek scenario choose karo — data flow animation dekhne ke liye
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Code snippet */}
          <div
            className="rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
            style={{ background: 'rgba(12,12,20,0.95)' }}
          >
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[rgba(255,255,255,0.06)]">
              <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
              <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <div className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs text-[#71717A] font-mono">lifting-state.tsx</span>
            </div>
            <pre className="text-[10px] font-mono p-3 overflow-x-auto leading-5">
              <span style={{ color: '#6B7280' }}>{'// Lifting state up pattern\n'}</span>
              <span style={{ color: '#06B6D4' }}>{'function '}</span>
              <span style={{ color: '#F5F5F7' }}>{'App() {\n'}</span>
              <span style={{ color: '#F5F5F7' }}>{'  const [count, setCount] = '}</span>
              <span style={{ color: '#10B981' }}>{'useState'}</span>
              <span style={{ color: '#F5F5F7' }}>{'(0)\n'}</span>
              <span style={{ color: '#F5F5F7' }}>{'  return (\n'}</span>
              <span style={{ color: '#7C3AED' }}>{'    <CountDisplay\n'}</span>
              <span style={{ color: '#06B6D4' }}>{'      count='}</span>
              <span style={{ color: '#F5F5F7' }}>{'{count}\n'}</span>
              <span style={{ color: '#F59E0B' }}>{'      onIncrement='}</span>
              <span style={{ color: '#F5F5F7' }}>{'{() => setCount(c => c+1)}\n'}</span>
              <span style={{ color: '#F5F5F7' }}>{'    />\n  )\n}'}</span>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
