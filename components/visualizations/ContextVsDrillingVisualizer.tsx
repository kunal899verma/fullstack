'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

type Theme = 'dark' | 'light'

interface TreeNodeDef {
  id: string
  label: string
  depth: number
  isDrillingRelay?: boolean
  isContextConsumer?: boolean
  isProvider?: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DRILLING_TREE: TreeNodeDef[] = [
  { id: 'app', label: 'App', depth: 0 },
  { id: 'layout', label: 'Layout', depth: 1, isDrillingRelay: true },
  { id: 'sidebar', label: 'Sidebar', depth: 2, isDrillingRelay: true },
  { id: 'menu', label: 'Menu', depth: 3, isDrillingRelay: true },
  { id: 'menuitem', label: 'MenuItem', depth: 4, isContextConsumer: false },
]

const CONTEXT_TREE: TreeNodeDef[] = [
  { id: 'provider', label: 'ThemeContext.Provider', depth: 0, isProvider: true },
  { id: 'app-c', label: 'App', depth: 1 },
  { id: 'layout-c', label: 'Layout', depth: 2 },
  { id: 'sidebar-c', label: 'Sidebar', depth: 3 },
  { id: 'menu-c', label: 'Menu', depth: 4 },
  { id: 'menuitem-c', label: 'MenuItem', depth: 5, isContextConsumer: true },
]

const INDENT = 20

// ─── Theme styles ─────────────────────────────────────────────────────────────

const THEME_STYLES: Record<Theme, { bg: string; text: string; border: string; badge: string }> = {
  dark: { bg: '#0A0A0F', text: '#F5F5F7', border: '#2A2A3F', badge: '#7C3AED' },
  light: { bg: '#F8FAFC', text: '#0A0A0F', border: '#E2E8F0', badge: '#F59E0B' },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface DrillNodeProps {
  node: TreeNodeDef
  theme: Theme
  animating: boolean
}

function DrillNode({ node, theme, animating }: DrillNodeProps) {
  const isRelay = node.isDrillingRelay
  const isConsumer = node.id === 'menuitem'
  const style = THEME_STYLES[theme]

  return (
    <motion.div
      layout
      className="relative"
      style={{ marginLeft: node.depth * INDENT }}
    >
      {node.depth > 0 && (
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-px"
          style={{ left: -INDENT / 2, background: 'rgba(255,255,255,0.1)' }}
        />
      )}
      <motion.div
        className="rounded-lg border px-3 py-2 mb-1.5"
        animate={
          animating && isRelay
            ? { borderColor: ['rgba(239,68,68,0.3)', 'rgba(239,68,68,0.7)', 'rgba(239,68,68,0.3)'] }
            : animating && isConsumer
            ? { borderColor: ['rgba(6,182,212,0.3)', 'rgba(6,182,212,0.8)', 'rgba(6,182,212,0.3)'], boxShadow: ['0 0 0px transparent', '0 0 12px rgba(6,182,212,0.5)', '0 0 4px rgba(6,182,212,0.2)'] }
            : {}
        }
        transition={{ duration: 0.7, repeat: animating ? Infinity : 0, repeatDelay: 0.3 }}
        style={{
          background: isConsumer ? 'rgba(6,182,212,0.08)' : isRelay ? 'rgba(239,68,68,0.05)' : 'rgba(26,26,38,0.8)',
          borderColor: isConsumer ? 'rgba(6,182,212,0.4)' : isRelay ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs font-semibold text-[#F5F5F7]">{node.label}</span>
          {isRelay && (
            <span className="text-[9px] px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)' }}>
              theme prop
            </span>
          )}
          {isConsumer && (
            <span className="text-[9px] px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(6,182,212,0.15)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.3)' }}>
              uses theme
            </span>
          )}
          {isRelay && (
            <span className="ml-auto text-[9px] text-[#EF4444] font-mono">just passing through!</span>
          )}
        </div>
        {/* Theme preview on consumer */}
        {isConsumer && (
          <motion.div
            key={theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1.5 rounded px-2 py-1 text-[9px] font-mono"
            style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
          >
            theme=&quot;{theme}&quot; applied!
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

interface ContextNodeProps {
  node: TreeNodeDef
  theme: Theme
  animating: boolean
}

function ContextNode({ node, theme, animating }: ContextNodeProps) {
  const isConsumer = node.isContextConsumer
  const isProvider = node.isProvider
  const style = THEME_STYLES[theme]

  return (
    <motion.div
      layout
      className="relative"
      style={{ marginLeft: node.depth * INDENT }}
    >
      {node.depth > 0 && (
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-px"
          style={{ left: -INDENT / 2, background: 'rgba(255,255,255,0.1)' }}
        />
      )}
      <motion.div
        className="rounded-lg border px-3 py-2 mb-1.5 relative overflow-hidden"
        animate={
          animating && isProvider
            ? { borderColor: ['rgba(124,58,237,0.4)', 'rgba(124,58,237,0.9)', 'rgba(124,58,237,0.4)'], boxShadow: ['0 0 0px transparent', '0 0 16px rgba(124,58,237,0.4)', '0 0 0px transparent'] }
            : animating && isConsumer
            ? { borderColor: ['rgba(16,185,129,0.4)', 'rgba(16,185,129,0.9)', 'rgba(16,185,129,0.4)'], boxShadow: ['0 0 0px transparent', '0 0 12px rgba(16,185,129,0.5)', '0 0 0px transparent'] }
            : {}
        }
        transition={{ duration: 0.7, repeat: animating ? Infinity : 0, repeatDelay: 0.3 }}
        style={{
          background: isProvider ? 'rgba(124,58,237,0.12)' : isConsumer ? 'rgba(16,185,129,0.08)' : 'rgba(26,26,38,0.8)',
          borderColor: isProvider ? 'rgba(124,58,237,0.5)' : isConsumer ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs font-semibold" style={{ color: isProvider ? '#7C3AED' : isConsumer ? '#10B981' : '#F5F5F7' }}>
            {node.label}
          </span>
          {isProvider && (
            <span className="text-[9px] px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(124,58,237,0.2)', color: '#7C3AED', border: '1px solid rgba(124,58,237,0.4)' }}>
              value=&quot;{theme}&quot;
            </span>
          )}
          {isConsumer && (
            <span className="text-[9px] px-1.5 py-0.5 rounded font-mono" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}>
              useContext ✓
            </span>
          )}
        </div>
        {isConsumer && (
          <motion.div
            key={theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1.5 rounded px-2 py-1 text-[9px] font-mono"
            style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
          >
            theme=&quot;{theme}&quot; from context!
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ContextVsDrillingVisualizer() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [animating, setAnimating] = useState(false)

  const toggleTheme = useCallback(() => {
    setAnimating(true)
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
    setTimeout(() => setAnimating(false), 2000)
  }, [])

  // Context jump animation — dotted line from provider to consumer
  const contextJumpPath = {
    from: { x: 10, y: 8 },
    to: { x: 92, y: 88 },
  }

  return (
    <div className="w-full text-[#F5F5F7]">
      {/* Controls */}
      <div
        className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 mb-4 flex items-center gap-4 flex-wrap"
        style={{ background: 'rgba(26,26,38,0.8)' }}
      >
        <button
          onClick={toggleTheme}
          disabled={animating}
          className="flex items-center gap-2 py-2 px-5 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
        >
          Switch Theme: &quot;{theme}&quot; → &quot;{theme === 'dark' ? 'light' : 'dark'}&quot;
        </button>
        <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
          Current theme:
          <span
            className="font-mono font-bold px-2 py-0.5 rounded text-sm"
            style={{ background: theme === 'dark' ? 'rgba(124,58,237,0.2)' : 'rgba(245,158,11,0.2)', color: theme === 'dark' ? '#7C3AED' : '#F59E0B' }}
          >
            {theme}
          </span>
        </div>
        <p className="text-xs text-[#71717A] ml-auto">
          Theme switch karo — dekho prop drilling mein kitne components update hote hain vs context mein.
        </p>
      </div>

      {/* Side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* PROP DRILLING */}
        <div
          className="rounded-xl border border-[rgba(239,68,68,0.3)] overflow-hidden"
          style={{ background: 'rgba(18,18,26,0.9)' }}
        >
          <div className="px-4 py-3 border-b border-[rgba(239,68,68,0.2)]" style={{ background: 'rgba(239,68,68,0.06)' }}>
            <div className="flex items-center gap-2">
              <span className="text-base">😫</span>
              <span className="text-sm font-bold" style={{ color: '#EF4444' }}>Prop Drilling</span>
              <span className="ml-auto text-[10px] font-mono text-[#EF4444] opacity-70">PAINFUL</span>
            </div>
            <p className="text-xs text-[#71717A] mt-1">theme prop har level se pass hota hai</p>
          </div>

          <div className="p-4">
            {DRILLING_TREE.map((node) => (
              <DrillNode key={node.id} node={node} theme={theme} animating={animating} />
            ))}
          </div>

          {animating && (
            <div className="px-4 pb-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg px-3 py-2 text-xs"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444' }}
              >
                ⚠️ Theme change ke liye App → Layout → Sidebar → Menu → MenuItem — sabko update karna pada!
              </motion.div>
            </div>
          )}
        </div>

        {/* CONTEXT API */}
        <div
          className="rounded-xl border border-[rgba(16,185,129,0.3)] overflow-hidden relative"
          style={{ background: 'rgba(18,18,26,0.9)' }}
        >
          <div className="px-4 py-3 border-b border-[rgba(16,185,129,0.2)]" style={{ background: 'rgba(16,185,129,0.06)' }}>
            <div className="flex items-center gap-2">
              <span className="text-base">😊</span>
              <span className="text-sm font-bold" style={{ color: '#10B981' }}>Context API</span>
              <span className="ml-auto text-[10px] font-mono text-[#10B981] opacity-70">CLEAN</span>
            </div>
            <p className="text-xs text-[#71717A] mt-1">theme sirf Provider → Consumer jaata hai</p>
          </div>

          <div className="p-4 relative">
            {CONTEXT_TREE.map((node) => (
              <ContextNode key={node.id} node={node} theme={theme} animating={animating} />
            ))}

            {/* Animated context jump line */}
            <AnimatePresence>
              {animating && (
                <motion.svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <defs>
                    <marker id="ctx-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill="#10B981" />
                    </marker>
                  </defs>
                  <motion.path
                    d={`M ${contextJumpPath.from.x}% ${contextJumpPath.from.y}% Q 100% 50% ${contextJumpPath.to.x}% ${contextJumpPath.to.y}%`}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeDasharray="6 4"
                    markerEnd="url(#ctx-arrow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>

          {animating && (
            <div className="px-4 pb-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg px-3 py-2 text-xs"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981' }}
              >
                ✓ Context: Provider ne value change ki → sirf MenuItem (consumer) re-render hua!
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison table */}
      <div
        className="rounded-xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
        style={{ background: 'rgba(26,26,38,0.8)' }}
      >
        <div className="grid grid-cols-3 text-xs font-mono border-b border-[rgba(255,255,255,0.08)]">
          <div className="px-4 py-2 text-[#71717A]">Comparison</div>
          <div className="px-4 py-2 border-l border-[rgba(255,255,255,0.06)]" style={{ color: '#EF4444' }}>Prop Drilling</div>
          <div className="px-4 py-2 border-l border-[rgba(255,255,255,0.06)]" style={{ color: '#10B981' }}>Context API</div>
        </div>
        {[
          ['Files to update', 'All 4 intermediate components', 'Only Provider + Consumer'],
          ['Boilerplate', 'Pass prop at every level', 'Create context once'],
          ['Refactoring pain', 'Add new level = update all', 'No change needed'],
          ['Performance', 'Only direct children', 'All consumers re-render'],
          ['Best for', 'Shallow trees (1-2 levels)', 'Global: theme, user, language'],
        ].map(([aspect, drill, ctx]) => (
          <div key={aspect} className="grid grid-cols-3 border-b border-[rgba(255,255,255,0.04)] last:border-0">
            <div className="px-4 py-2.5 text-xs text-[#A1A1AA]">{aspect}</div>
            <div className="px-4 py-2.5 text-xs text-[#EF4444] border-l border-[rgba(255,255,255,0.04)]">{drill}</div>
            <div className="px-4 py-2.5 text-xs text-[#10B981] border-l border-[rgba(255,255,255,0.04)]">{ctx}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
