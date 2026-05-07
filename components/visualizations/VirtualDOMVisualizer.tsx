'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

type DiffType = 'added' | 'removed' | 'modified' | 'unchanged'

interface VNode {
  id: string
  tag: string
  text?: string
  attrs?: Record<string, string>
  children?: VNode[]
  diffType?: DiffType
}

interface Scenario {
  id: string
  name: string
  description: string
  before: VNode[]
  after: VNode[]
  insight: string
  keyNote?: string
}

// ─── Scenarios ────────────────────────────────────────────────────────────────

const SCENARIOS: Scenario[] = [
  {
    id: 'add-end',
    name: 'Add Item to End',
    description: 'Naya item list ke end mein add hota hai',
    before: [
      { id: 'ul', tag: 'ul', children: [
        { id: 'li-a', tag: 'li', text: 'Apple', diffType: 'unchanged' },
        { id: 'li-b', tag: 'li', text: 'Banana', diffType: 'unchanged' },
      ]},
    ],
    after: [
      { id: 'ul', tag: 'ul', children: [
        { id: 'li-a', tag: 'li', text: 'Apple', diffType: 'unchanged' },
        { id: 'li-b', tag: 'li', text: 'Banana', diffType: 'unchanged' },
        { id: 'li-c', tag: 'li', text: 'Cherry', diffType: 'added' },
      ]},
    ],
    insight: 'End mein add karna efficient hai — React sirf naya node insert karta hai.',
  },
  {
    id: 'add-middle',
    name: 'Add Item (No Key)',
    description: 'Without key prop — React gets confused',
    before: [
      { id: 'ul', tag: 'ul', children: [
        { id: 'li-1', tag: 'li', text: 'Apple', diffType: 'unchanged' },
        { id: 'li-2', tag: 'li', text: 'Banana', diffType: 'unchanged' },
      ]},
    ],
    after: [
      { id: 'ul', tag: 'ul', children: [
        { id: 'li-new', tag: 'li', text: 'Cherry', diffType: 'modified' },
        { id: 'li-1m', tag: 'li', text: 'Apple', diffType: 'modified' },
        { id: 'li-2m', tag: 'li', text: 'Banana', diffType: 'added' },
      ]},
    ],
    insight: 'Without key: React starts from position 0. All existing items get modified — very inefficient!',
    keyNote: 'React har item ko position se compare karta hai — sab modified dikh raha hai!',
  },
  {
    id: 'with-key',
    name: 'Add Item (With Key)',
    description: 'With key prop — React is smart',
    before: [
      { id: 'ul', tag: 'ul', children: [
        { id: 'li-apple', tag: 'li', text: 'key="apple" Apple', attrs: { key: 'apple' }, diffType: 'unchanged' },
        { id: 'li-banana', tag: 'li', text: 'key="banana" Banana', attrs: { key: 'banana' }, diffType: 'unchanged' },
      ]},
    ],
    after: [
      { id: 'ul', tag: 'ul', children: [
        { id: 'li-cherry-new', tag: 'li', text: 'key="cherry" Cherry', attrs: { key: 'cherry' }, diffType: 'added' },
        { id: 'li-apple2', tag: 'li', text: 'key="apple" Apple', attrs: { key: 'apple' }, diffType: 'unchanged' },
        { id: 'li-banana2', tag: 'li', text: 'key="banana" Banana', attrs: { key: 'banana' }, diffType: 'unchanged' },
      ]},
    ],
    insight: 'With key: React tracks identity — only Cherry is inserted. Apple & Banana untouched!',
    keyNote: 'Keys se React accurately pehchanta hai — sirf naya node insert hua!',
  },
  {
    id: 'text-change',
    name: 'Change Text Content',
    description: 'Ek node ka text update hota hai',
    before: [
      { id: 'div', tag: 'div', children: [
        { id: 'h1', tag: 'h1', text: 'Hello World', diffType: 'unchanged' },
        { id: 'p', tag: 'p', text: 'Old paragraph text here.', diffType: 'unchanged' },
      ]},
    ],
    after: [
      { id: 'div', tag: 'div', children: [
        { id: 'h1-2', tag: 'h1', text: 'Hello World', diffType: 'unchanged' },
        { id: 'p-2', tag: 'p', text: 'Updated paragraph text!', diffType: 'modified' },
      ]},
    ],
    insight: 'React sirf modified text node ko update karta hai. H1 ko bilkul touch nahi kiya.',
  },
  {
    id: 'remove',
    name: 'Remove Component',
    description: 'Ek component unmount ho jaata hai',
    before: [
      { id: 'div2', tag: 'div', children: [
        { id: 'nav', tag: 'nav', text: 'Navigation', diffType: 'unchanged' },
        { id: 'modal', tag: 'div', text: 'Modal Content', attrs: { class: 'modal' }, diffType: 'unchanged' },
        { id: 'footer', tag: 'footer', text: 'Footer', diffType: 'unchanged' },
      ]},
    ],
    after: [
      { id: 'div2-2', tag: 'div', children: [
        { id: 'nav-2', tag: 'nav', text: 'Navigation', diffType: 'unchanged' },
        { id: 'modal-r', tag: 'div', text: 'Modal Content', attrs: { class: 'modal' }, diffType: 'removed' },
        { id: 'footer-2', tag: 'footer', text: 'Footer', diffType: 'unchanged' },
      ]},
    ],
    insight: 'Remove hone wala node red ho jaata hai. Sirf wahi DOM operation hota hai.',
  },
]

// ─── Colors ───────────────────────────────────────────────────────────────────

const DIFF_COLOR: Record<DiffType, string> = {
  added: '#10B981',
  removed: '#EF4444',
  modified: '#F59E0B',
  unchanged: 'rgba(255,255,255,0.15)',
}

const DIFF_LABEL: Record<DiffType, string> = {
  added: 'ADDED',
  removed: 'REMOVED',
  modified: 'MODIFIED',
  unchanged: '',
}

const DIFF_ICON: Record<DiffType, string> = {
  added: '+',
  removed: '−',
  modified: '~',
  unchanged: '·',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface VNodeBoxProps {
  node: VNode
  revealed: boolean
  side: 'before' | 'after'
  depth?: number
}

function VNodeBox({ node, revealed, side, depth = 0 }: VNodeBoxProps) {
  const dtype: DiffType = node.diffType ?? 'unchanged'
  const color = DIFF_COLOR[dtype]
  const isChanged = dtype !== 'unchanged'
  const indent = depth * 20

  return (
    <div style={{ marginLeft: indent }}>
      <motion.div
        className="rounded-lg border px-3 py-2 mb-1.5 relative overflow-hidden"
        style={{
          background: isChanged && revealed ? `${color}12` : 'rgba(26,26,38,0.6)',
          borderColor: isChanged && revealed ? `${color}60` : 'rgba(255,255,255,0.08)',
        }}
        animate={
          revealed && isChanged
            ? { borderColor: [`${color}20`, `${color}80`, `${color}40`] }
            : {}
        }
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          {revealed && isChanged && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs font-bold flex-shrink-0 w-4 text-center"
              style={{ color }}
            >
              {DIFF_ICON[dtype]}
            </motion.span>
          )}
          <span className="font-mono text-xs" style={{ color: revealed && isChanged ? color : '#A1A1AA' }}>
            &lt;{node.tag}
            {node.attrs?.key && (
              <span style={{ color: '#7C3AED' }}> key=&quot;{node.attrs.key}&quot;</span>
            )}
            {node.attrs?.class && (
              <span style={{ color: '#06B6D4' }}> className=&quot;{node.attrs.class}&quot;</span>
            )}
            &gt;
          </span>
          {node.text && (
            <span
              className="text-[11px] font-mono truncate"
              style={{ color: revealed && isChanged ? color : '#F5F5F7' }}
            >
              {node.text}
            </span>
          )}
          {revealed && isChanged && DIFF_LABEL[dtype] && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-auto text-[9px] font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0"
              style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
            >
              {DIFF_LABEL[dtype]}
            </motion.span>
          )}
        </div>

        {/* Flash on change */}
        {revealed && (dtype === 'added' || dtype === 'modified') && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-lg"
            style={{ background: `${color}20` }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </motion.div>

      {/* Children */}
      {node.children?.map((child) => (
        <VNodeBox
          key={child.id + side}
          node={child}
          revealed={revealed}
          side={side}
          depth={depth + 1}
        />
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VirtualDOMVisualizer() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [animating, setAnimating] = useState(false)

  const scenario = SCENARIOS[selectedIdx]

  const handleApply = useCallback(() => {
    setAnimating(true)
    setRevealed(false)
    setTimeout(() => {
      setRevealed(true)
      setAnimating(false)
    }, 400)
  }, [])

  const handleScenarioChange = useCallback((idx: number) => {
    setSelectedIdx(idx)
    setRevealed(false)
    setAnimating(false)
  }, [])

  // Count diff types in after tree
  const countDiff = (nodes: VNode[], type: DiffType): number => {
    return nodes.reduce((acc, n) => {
      let count = n.diffType === type ? 1 : 0
      if (n.children) count += countDiff(n.children, type)
      return acc + count
    }, 0)
  }

  const addedCount = countDiff(scenario.after, 'added')
  const removedCount = countDiff(scenario.after, 'removed')
  const modifiedCount = countDiff(scenario.after, 'modified')
  const unchangedCount = countDiff(scenario.after, 'unchanged')

  return (
    <div className="w-full text-[#F5F5F7]">
      {/* Top controls */}
      <div
        className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 mb-4 flex items-center gap-3 flex-wrap"
        style={{ background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }}
      >
        <select
          value={selectedIdx}
          onChange={(e) => handleScenarioChange(Number(e.target.value))}
          className="bg-[#12121A] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#7C3AED] transition-colors"
        >
          {SCENARIOS.map((s, i) => (
            <option key={s.id} value={i}>{i + 1}. {s.name}</option>
          ))}
        </select>

        <button
          onClick={handleApply}
          disabled={animating}
          className="py-2 px-5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
        >
          {animating ? 'Applying...' : '⚡ Apply Change'}
        </button>

        <button
          onClick={() => setRevealed(false)}
          className="py-2 px-4 rounded-lg text-sm border border-[rgba(255,255,255,0.1)] text-[#A1A1AA] hover:text-[#F5F5F7] transition-all"
        >
          ↺ Reset
        </button>

        <p className="text-xs text-[#71717A] ml-auto">{scenario.description}</p>
      </div>

      {/* Main diff view */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Before */}
        <div
          className="rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
          style={{ background: 'rgba(18,18,26,0.9)' }}
        >
          <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">Before (VDOM)</span>
          </div>
          <div className="p-4">
            {scenario.before.map((node) => (
              <VNodeBox key={node.id + 'b'} node={node} revealed={false} side="before" />
            ))}
          </div>
        </div>

        {/* After */}
        <div
          className="rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
          style={{ background: 'rgba(18,18,26,0.9)' }}
        >
          <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">After (VDOM Diff)</span>
          </div>
          <div className="p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIdx + String(revealed)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {scenario.after.map((node) => (
                  <VNodeBox key={node.id + 'a'} node={node} revealed={revealed} side="after" />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Diff summary */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4"
          >
            {[
              { label: 'Added', count: addedCount, color: '#10B981' },
              { label: 'Removed', count: removedCount, color: '#EF4444' },
              { label: 'Modified', count: modifiedCount, color: '#F59E0B' },
              { label: 'Unchanged', count: unchangedCount, color: 'rgba(255,255,255,0.3)' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border p-3 text-center"
                style={{ background: `${stat.color}08`, borderColor: `${stat.color}30` }}
              >
                <div className="text-2xl font-black font-mono" style={{ color: stat.color }}>{stat.count}</div>
                <div className="text-xs text-[#71717A] mt-0.5">DOM {stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Insight */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border-2 p-4"
            style={{ background: 'rgba(6,182,212,0.06)', borderColor: 'rgba(6,182,212,0.4)' }}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg">💡</span>
              <div>
                <p className="text-sm font-semibold text-[#06B6D4]">{scenario.insight}</p>
                {scenario.keyNote && (
                  <p className="text-xs text-[#F59E0B] mt-2 font-semibold">{scenario.keyNote}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!revealed && (
        <div
          className="rounded-xl border border-[rgba(255,255,255,0.06)] p-4 text-center"
          style={{ background: 'rgba(26,26,38,0.5)' }}
        >
          <p className="text-sm text-[#71717A]">
            &ldquo;Apply Change&rdquo; button dabao — dekho React kya kya update karta hai aur kya untouched rehta hai.
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center gap-6 flex-wrap">
        {([
          ['added', 'Added'],
          ['removed', 'Removed'],
          ['modified', 'Modified'],
          ['unchanged', 'Unchanged'],
        ] as [DiffType, string][]).map(([type, label]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: DIFF_COLOR[type] }} />
            <span className="text-[11px] font-mono text-[#A1A1AA]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
