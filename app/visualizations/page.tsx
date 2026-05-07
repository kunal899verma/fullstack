'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────

type Track = 'All' | 'JavaScript' | 'React' | 'Node.js' | 'GenAI'

interface Visualization {
  slug: string
  emoji: string
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  time: string
  track: Track
  description: string
  learn: [string, string, string]
  live: boolean
  isNew?: boolean
}

interface ComingSoon {
  emoji: string
  title: string
  track: Track
  desc: string
}

// ─── Color maps ───────────────────────────────────────────────────────────────

const TRACK_COLORS: Record<Track, string> = {
  All: '#A1A1AA',
  JavaScript: '#F59E0B',
  React: '#06B6D4',
  'Node.js': '#10B981',
  GenAI: '#7C3AED',
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: '#10B981',
  Intermediate: '#7C3AED',
  Advanced: '#EF4444',
}

// ─── All Visualizations ───────────────────────────────────────────────────────

const VISUALIZATIONS: Visualization[] = [
  // JavaScript
  {
    slug: 'js-closures',
    emoji: '🔒',
    title: 'Scope & Closures',
    difficulty: 'Intermediate',
    time: '10 min',
    track: 'JavaScript',
    description: 'Closure kaise kaam karta hai — lexical scope aur variable capture visually.',
    learn: ['Lexical scope aur scope chain', 'Closure variable capture', 'Common closure patterns'],
    live: true,
  },
  {
    slug: 'js-array-methods',
    emoji: '🔧',
    title: 'Array Methods',
    difficulty: 'Beginner',
    time: '8 min',
    track: 'JavaScript',
    description: 'map, filter, reduce — har method ka data transformation step-by-step animated.',
    learn: ['map vs forEach difference', 'filter aur chaining', 'reduce ka power'],
    live: true,
  },
  {
    slug: 'js-this-binding',
    emoji: '👈',
    title: 'this Binding',
    difficulty: 'Intermediate',
    time: '10 min',
    track: 'JavaScript',
    description: "'this' ka context kaise decide hota hai — 4 rules visually explained.",
    learn: ['Implicit vs explicit binding', 'Arrow functions aur this', 'bind/call/apply difference'],
    live: true,
  },
  {
    slug: 'js-hoisting',
    emoji: '⬆️',
    title: 'Variable Hoisting',
    difficulty: 'Beginner',
    time: '7 min',
    track: 'JavaScript',
    description: 'var, let, const hoisting — compilation phase mein kya hota hai.',
    learn: ['var vs let/const hoisting', 'Function declaration hoisting', 'TDZ (Temporal Dead Zone)'],
    live: true,
  },
  {
    slug: 'js-prototype',
    emoji: '🧬',
    title: 'Prototype Chain',
    difficulty: 'Advanced',
    time: '12 min',
    track: 'JavaScript',
    description: 'Object.prototype chain walk — JavaScript inheritance ka foundation.',
    learn: ['Prototype chain traversal', '__proto__ vs prototype', 'class syntax ke peeche'],
    live: true,
  },

  // React
  {
    slug: 'react-rerender',
    emoji: '⚛️',
    title: 'React Re-renders',
    difficulty: 'Intermediate',
    time: '10 min',
    track: 'React',
    description: 'Kab aur kyun re-render hota hai — state, props, context triggers animated.',
    learn: ['Re-render triggers', 'memo aur useMemo impact', 'Unnecessary renders prevent karo'],
    live: true,
  },
  {
    slug: 'react-virtual-dom',
    emoji: '🌳',
    title: 'Virtual DOM Diff',
    difficulty: 'Intermediate',
    time: '12 min',
    track: 'React',
    description: 'Reconciliation algorithm — React kaise decide karta hai kya update karna hai.',
    learn: ['Virtual DOM concept', 'Diffing algorithm steps', 'Keys ka importance'],
    live: true,
  },
  {
    slug: 'react-useeffect',
    emoji: '🔄',
    title: 'useEffect Lifecycle',
    difficulty: 'Intermediate',
    time: '10 min',
    track: 'React',
    description: 'useEffect mount, update, cleanup — dependency array behavior live.',
    learn: ['Effect lifecycle phases', 'Dependency array rules', 'Cleanup function timing'],
    live: true,
  },
  {
    slug: 'react-props-state',
    emoji: '📊',
    title: 'Props vs State Flow',
    difficulty: 'Beginner',
    time: '8 min',
    track: 'React',
    description: 'Data flow direction — props down, events up. One-way data binding visualized.',
    learn: ['Props vs state difference', 'Data flow direction', 'Lifting state up pattern'],
    live: true,
  },
  {
    slug: 'react-context',
    emoji: '🕸️',
    title: 'Context vs Prop Drilling',
    difficulty: 'Intermediate',
    time: '10 min',
    track: 'React',
    description: 'Prop drilling problem aur Context solution — component tree animated.',
    learn: ['Prop drilling pain points', 'Context setup aur usage', 'When NOT to use Context'],
    live: true,
  },

  // Node.js
  {
    slug: 'async-timeline',
    emoji: '⚡',
    title: 'Async Timeline',
    difficulty: 'Beginner',
    time: '10 min',
    track: 'Node.js',
    description: 'Promise.all kaise 3x faster hai sequential awaits se — visual timing ke saath.',
    learn: ['Sequential vs Parallel execution', 'Promise.all timing', 'Real-world async patterns'],
    live: true,
  },
  {
    slug: 'event-loop',
    emoji: '⚙️',
    title: 'Event Loop',
    difficulty: 'Intermediate',
    time: '15 min',
    track: 'Node.js',
    description: "Node.js ka dil — animated. Har async operation kahan jaata hai step-by-step.",
    learn: ['6 event loop phases', 'Microtask vs Macrotask priority', 'nextTick aur Promise queue'],
    live: true,
  },
  {
    slug: 'http',
    emoji: '🌐',
    title: 'HTTP Lifecycle',
    difficulty: 'Beginner',
    time: '10 min',
    track: 'Node.js',
    description: 'Browser se server tak — DNS, TCP, TLS, middleware chain, response animated.',
    learn: ['DNS resolution aur TCP handshake', 'Express middleware chain', 'Request/response safar'],
    live: true,
  },
  {
    slug: 'streams',
    emoji: '🌊',
    title: 'Streams & Backpressure',
    difficulty: 'Intermediate',
    time: '12 min',
    track: 'Node.js',
    description: '10GB file ko 64KB at a time process karo — backpressure mechanism live.',
    learn: ['Readable / Writable / Transform streams', 'Backpressure mechanism', 'Memory-efficient processing'],
    live: true,
  },
  {
    slug: 'n-plus-one',
    emoji: '📊',
    title: 'N+1 Problem',
    difficulty: 'Intermediate',
    time: '8 min',
    track: 'Node.js',
    description: '100 posts fetch karte waqt 101 DB queries — silent killer visually samjho.',
    learn: ['N+1 problem kyun hota hai', 'JOIN vs separate queries', 'DataLoader batch optimization'],
    live: true,
  },
  {
    slug: 'jwt-auth',
    emoji: '🔐',
    title: 'JWT Authentication',
    difficulty: 'Intermediate',
    time: '12 min',
    track: 'Node.js',
    description: 'Login se authenticated API call tak — JWT anatomy, login flow, token refresh.',
    learn: ['JWT anatomy: header.payload.signature', 'Login flow aur token generation', 'Token refresh transparent UX'],
    live: true,
  },
  {
    slug: 'cluster-workers',
    emoji: '🔧',
    title: 'Cluster vs Workers',
    difficulty: 'Advanced',
    time: '15 min',
    track: 'Node.js',
    description: '8-core machine pe sirf 1 core use? Ye visualization sab cores use karna sikhata hai.',
    learn: ['CPU-bound vs I/O-bound tasks', 'Cluster for HTTP scaling', 'Worker Threads for CPU tasks'],
    live: true,
  },
  {
    slug: 'promise-states',
    emoji: '🔄',
    title: 'Promise States Machine',
    difficulty: 'Beginner',
    time: '8 min',
    track: 'Node.js',
    description: 'Promise ke 3 states live — Pending, Fulfilled, Rejected. Chaining rules animated.',
    learn: ['3 Promise states aur transitions', '.then()/.catch()/.finally() chaining', 'Promise.all aur async/await'],
    live: true,
    isNew: true,
  },
  {
    slug: 'module-resolution',
    emoji: '📦',
    title: 'Module Resolution',
    difficulty: 'Beginner',
    time: '8 min',
    track: 'Node.js',
    description: 'require() algorithm step-by-step — "Cannot find module" kabhi nahi confuse karega.',
    learn: ['Core vs relative vs third-party', 'node_modules tree walk', 'require() caching behavior'],
    live: true,
    isNew: true,
  },

  // GenAI
  {
    slug: 'genai-tokens',
    emoji: '🎲',
    title: 'Token Sampling',
    difficulty: 'Beginner',
    time: '10 min',
    track: 'GenAI',
    description: 'Temperature, top-p, top-k — LLM text generation ka randomness live.',
    learn: ['Token probability distribution', 'Temperature ka effect', 'top-p vs top-k sampling'],
    live: true,
  },
  {
    slug: 'genai-rag',
    emoji: '📚',
    title: 'RAG Pipeline',
    difficulty: 'Intermediate',
    time: '12 min',
    track: 'GenAI',
    description: 'Retrieval-Augmented Generation — documents se answer kaise nikalta hai animated.',
    learn: ['Embedding aur vector search', 'Context window management', 'Retrieval vs generation'],
    live: true,
  },
  {
    slug: 'genai-attention',
    emoji: '🧠',
    title: 'Attention Mechanism',
    difficulty: 'Advanced',
    time: '15 min',
    track: 'GenAI',
    description: 'Transformer attention — "Attention is all you need" ka core concept visualized.',
    learn: ['Query, Key, Value matrices', 'Self-attention scores', 'Multi-head attention'],
    live: true,
  },
  {
    slug: 'genai-neural-network',
    emoji: '🔬',
    title: 'Neural Network',
    difficulty: 'Intermediate',
    time: '12 min',
    track: 'GenAI',
    description: 'Forward pass, backpropagation, weights update — neural net training animated.',
    learn: ['Layers aur neurons', 'Forward propagation', 'Gradient descent basics'],
    live: true,
  },
  {
    slug: 'genai-prompts',
    emoji: '✍️',
    title: 'Prompt Quality',
    difficulty: 'Beginner',
    time: '8 min',
    track: 'GenAI',
    description: 'Prompt engineering — good vs bad prompts ka LLM output pe impact live.',
    learn: ['Good vs bad prompt comparison', 'System prompt ka role', 'Specificity aur clarity ka impact'],
    live: true,
  },
]

const COMING_SOON: ComingSoon[] = [
  { emoji: '🕸️', title: 'Microservices Communication', track: 'Node.js', desc: 'REST, gRPC, message queues animated' },
  { emoji: '🧮', title: 'Memory Heap Visualizer', track: 'Node.js', desc: 'V8 heap aur garbage collection live' },
  { emoji: '💾', title: 'Caching Strategy Demo', track: 'Node.js', desc: 'In-memory, Redis, CDN layers' },
  { emoji: '🔌', title: 'WebSockets Real-time', track: 'Node.js', desc: 'Full-duplex connection animated' },
  { emoji: '🎛️', title: 'Redux State Flow', track: 'React', desc: 'Action → Reducer → Store animated' },
  { emoji: '⚡', title: 'React Suspense', track: 'React', desc: 'Concurrent mode aur Suspense boundaries' },
  { emoji: '🔀', title: 'Generator Functions', track: 'JavaScript', desc: 'yield aur lazy evaluation' },
  { emoji: '🌀', title: 'Event Emitter', track: 'Node.js', desc: 'Observer pattern in Node.js' },
  { emoji: '🤖', title: 'Fine-tuning vs RAG', track: 'GenAI', desc: 'When to use which approach' },
  { emoji: '🧊', title: 'Embeddings Space', track: 'GenAI', desc: 'Vector space visualization 3D' },
]

// ─── Track tabs ───────────────────────────────────────────────────────────────

const TRACKS: Track[] = ['All', 'JavaScript', 'React', 'Node.js', 'GenAI']

const TRACK_STATS: Record<Track, { emoji: string; count: number; desc: string }> = {
  All: { emoji: '🎬', count: 24, desc: 'Interactive Visualizations' },
  JavaScript: { emoji: '🟡', count: 5, desc: 'JS Fundamentals' },
  React: { emoji: '⚛️', count: 5, desc: 'React Concepts' },
  'Node.js': { emoji: '🟢', count: 9, desc: 'Node.js Core' },
  GenAI: { emoji: '🤖', count: 5, desc: 'AI / LLM Concepts' },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TrackBadge({ track }: { track: Track }) {
  const color = TRACK_COLORS[track]
  return (
    <span
      className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
      style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
    >
      {track}
    </span>
  )
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const color = DIFFICULTY_COLORS[difficulty] ?? '#A1A1AA'
  return (
    <span
      className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full"
      style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
    >
      {difficulty}
    </span>
  )
}

function VizCard({ viz }: { viz: Visualization }) {
  const trackColor = TRACK_COLORS[viz.track]
  const diffColor = DIFFICULTY_COLORS[viz.difficulty]

  return (
    <Link
      href={`/visualizations/${viz.slug}`}
      className="group flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg relative"
      style={{
        background: 'rgba(18,18,26,0.9)',
        borderColor: `${trackColor}20`,
      }}
    >
      {/* Top gradient bar */}
      <div
        className="h-0.5 w-full transition-all duration-300 group-hover:h-1"
        style={{ background: `linear-gradient(90deg, ${trackColor}, ${diffColor})` }}
      />

      <div className="p-5 flex flex-col flex-1">
        {/* Row: badges + time + live */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <TrackBadge track={viz.track} />
            <DifficultyBadge difficulty={viz.difficulty} />
            {viz.isNew && (
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)' }}>
                New
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#71717A] font-mono">{viz.time}</span>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#10B981' }} />
          </div>
        </div>

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${trackColor}12`, border: `1px solid ${trackColor}20` }}
        >
          {viz.emoji}
        </div>

        {/* Title + description */}
        <h3 className="text-sm font-bold text-[#F5F5F7] mb-1">{viz.title}</h3>
        <p className="text-[11px] text-[#A1A1AA] leading-relaxed mb-3">{viz.description}</p>

        {/* Learn bullets */}
        <div
          className="rounded-xl p-3 mb-3"
          style={{ background: `${trackColor}08`, border: `1px solid ${trackColor}15` }}
        >
          <p className="text-[9px] font-mono font-bold uppercase tracking-wider mb-1.5" style={{ color: trackColor }}>
            Kya seekhoge
          </p>
          <ul className="space-y-1">
            {viz.learn.map(item => (
              <li key={item} className="flex items-start gap-1.5 text-[10px] text-[#A1A1AA] leading-tight">
                <span style={{ color: trackColor }} className="flex-shrink-0 text-[9px] mt-0.5">›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.05)]">
          <span className="text-[9px] font-mono text-[#52525B]">Interactive</span>
          <span
            className="text-[11px] font-semibold flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
            style={{ color: trackColor }}
          >
            Start Learning →
          </span>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 30% 0%, ${trackColor}06 0%, transparent 70%)` }}
      />
    </Link>
  )
}

function ComingSoonCard({ item }: { item: ComingSoon }) {
  const color = TRACK_COLORS[item.track]
  return (
    <div
      className="rounded-xl p-4 opacity-45 cursor-not-allowed"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-start justify-between mb-1.5">
        <span className="text-xl grayscale">{item.emoji}</span>
        <span
          className="text-[8px] font-mono px-1.5 py-0.5 rounded-full"
          style={{ background: `${color}10`, color }}
        >
          {item.track}
        </span>
      </div>
      <p className="text-xs font-semibold text-[#71717A] mb-0.5">{item.title}</p>
      <p className="text-[10px] text-[#52525B] leading-tight">{item.desc}</p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VisualizationsPage() {
  const [activeTrack, setActiveTrack] = useState<Track>('All')

  const filteredViz = activeTrack === 'All'
    ? VISUALIZATIONS.filter(v => v.live)
    : VISUALIZATIONS.filter(v => v.live && v.track === activeTrack)

  const liveCount = VISUALIZATIONS.filter(v => v.live).length
  const trackCount = TRACKS.length - 1 // exclude "All"

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7]">

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative border-b border-[rgba(255,255,255,0.08)] py-16 px-6 overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.06] blur-3xl pointer-events-none" style={{ background: '#7C3AED' }} />
        <div className="absolute top-0 right-1/3 w-64 h-64 rounded-full opacity-[0.04] blur-3xl pointer-events-none" style={{ background: '#06B6D4' }} />
        <div className="absolute bottom-0 left-1/2 w-80 h-48 rounded-full opacity-[0.03] blur-3xl pointer-events-none" style={{ background: '#10B981' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-8">
            <Link href="/" className="hover:text-[#F5F5F7] transition-colors">Home</Link>
            <span className="text-[#71717A]">/</span>
            <span className="text-[#F5F5F7]">Visualizations</span>
          </div>

          <div className="max-w-4xl">
            {/* Live badge */}
            <div className="flex items-center gap-2 mb-5">
              <span
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981', border: '1px solid rgba(16,185,129,0.25)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                {liveCount}+ Live Visualizations — 4 Tracks
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold font-display leading-tight mb-4">
              🎬 Interactive{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
              >
                Visualizations
              </span>
            </h1>

            <p className="text-xl text-[#A1A1AA] leading-relaxed mb-5 max-w-3xl">
              JavaScript, React, Node.js, aur GenAI — sab concepts ko animated diagrams se samjho.
              Padhne se <strong className="text-[#F5F5F7]">10x better</strong>. Har visualization
              interactive hai, beginner-friendly hai.
            </p>

            <p
              className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl font-medium"
              style={{ background: 'rgba(245,158,11,0.08)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              💡 {liveCount} live visualizations across {trackCount} tracks — sab free, sab interactive
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — STATS BAR
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="border-b border-[rgba(255,255,255,0.06)]">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center gap-6 md:gap-10 flex-wrap">
            {[
              { value: `${liveCount}+`, label: 'Live Visualizations', color: '#7C3AED' },
              { value: '4', label: 'Tracks', color: '#10B981' },
              { value: '~10 min', label: 'Average Each', color: '#06B6D4' },
              { value: '3', label: 'Difficulty Levels', color: '#F59E0B' },
              { value: 'Free', label: 'Always', color: '#10B981' },
            ].map(stat => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono" style={{ color: stat.color }}>
                  {stat.value}
                </span>
                <span className="text-xs text-[#71717A]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — TRACK FILTER TABS
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-20 border-b border-[rgba(255,255,255,0.06)]" style={{ background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex gap-2 flex-wrap">
            {TRACKS.map(track => {
              const color = TRACK_COLORS[track]
              const stat = TRACK_STATS[track]
              const isActive = activeTrack === track
              return (
                <button
                  key={track}
                  onClick={() => setActiveTrack(track)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200"
                  style={{
                    background: isActive ? `${color}18` : 'rgba(255,255,255,0.04)',
                    color: isActive ? color : '#71717A',
                    border: `1px solid ${isActive ? color + '40' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: isActive ? `0 0 16px ${color}15` : 'none',
                  }}
                >
                  <span>{stat.emoji}</span>
                  <span>{track}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                    style={{
                      background: isActive ? `${color}25` : 'rgba(255,255,255,0.06)',
                      color: isActive ? color : '#52525B',
                    }}
                  >
                    {stat.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — VISUALIZATION GRID
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Track heading */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: TRACK_COLORS[activeTrack] }}
          />
          <h2 className="text-xl font-bold text-[#F5F5F7]">
            {activeTrack === 'All' ? 'All Visualizations' : `${activeTrack} Track`}
          </h2>
          <span
            className="text-xs font-mono px-2.5 py-0.5 rounded-full"
            style={{
              background: `${TRACK_COLORS[activeTrack]}12`,
              color: TRACK_COLORS[activeTrack],
              border: `1px solid ${TRACK_COLORS[activeTrack]}25`,
            }}
          >
            {filteredViz.length} live
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-14">
          {filteredViz.map(viz => (
            <VizCard key={viz.slug} viz={viz} />
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 5 — COMING SOON
        ══════════════════════════════════════════════════════════════════ */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#52525B]" />
            <h2 className="text-lg font-bold text-[#71717A]">Coming Soon</h2>
            <span
              className="text-xs font-mono px-2.5 py-0.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.04)', color: '#71717A', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {COMING_SOON.length} in progress
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {COMING_SOON.map(item => (
              <ComingSoonCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 6 — WHY VISUALIZATIONS
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="rounded-2xl border p-8 mb-8 relative overflow-hidden"
          style={{ background: 'rgba(124,58,237,0.05)', borderColor: 'rgba(124,58,237,0.2)' }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.08] blur-3xl pointer-events-none"
            style={{ background: '#7C3AED' }}
          />
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#7C3AED] mb-3">
                Kyun Visualizations?
              </p>
              <h3 className="text-2xl font-bold text-[#F5F5F7] mb-3">
                Padhna kaafi nahi — dekhna padta hai
              </h3>
              <p className="text-[#A1A1AA] leading-relaxed text-sm">
                Concepts — event loop, Promise chain, attention mechanism — sirf padh ke
                samajh nahi aate. Jab tum animation mein dekho ki microtask queue macrotask se
                pehle execute hoti hai, tab ye cheez memory mein permanently settle ho jaati hai.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: '⚡', text: 'Ek visualization = ghante ka text compressed in 10 min' },
                { icon: '🧠', text: 'Visual memory — animation yaad rehti hai, text nahi' },
                { icon: '🎯', text: 'Interactive — sirf dekho nahi, experiment karo' },
                { icon: '🗣️', text: 'Hinglish — jaise koi dost samjhaata hai' },
              ].map(item => (
                <div key={item.text} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 7 — TIP FOOTER
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="rounded-2xl border p-6 flex gap-5 items-start"
          style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)' }}
        >
          <span className="text-3xl flex-shrink-0">🌱</span>
          <div>
            <p className="font-semibold text-[#10B981] mb-1">Beginners ke liye tip</p>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Pehli baar visualizations dekh rahe ho?{' '}
              <strong className="text-[#F5F5F7]">Node.js track mein Async Timeline se shuru karo.</strong>{' '}
              10 minutes mein ek concept clear ho jaata hai jo baaki sab tutorials ghante mein
              nahi karte. Bas &quot;Play&quot; button dabao aur arrows follow karo.
            </p>
            <Link
              href="/visualizations/async-timeline"
              className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-[#10B981] hover:text-[#34D399] transition-colors"
            >
              Async Timeline se shuru karo →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
