import ModuleResolutionVisualizer from '@/components/visualizations/ModuleResolutionVisualizer'
import Link from 'next/link'

export const metadata = {
  title: 'Module Resolution Algorithm — NodeMaster',
  description:
    'Node.js require() algorithm step-by-step — core modules, relative paths, node_modules. "Cannot find module" error kabhi nahi aayega.',
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function Badge({
  children,
  color = '#7C3AED',
}: {
  children: React.ReactNode
  color?: string
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full"
      style={{
        background: `${color}18`,
        color,
        border: `1px solid ${color}33`,
      }}
    >
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#7C3AED] mb-3">
      {children}
    </p>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ModuleResolutionPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7]">

      {/* Back nav */}
      <div className="border-b border-[rgba(255,255,255,0.06)] px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/visualizations"
            className="text-[#A1A1AA] text-sm hover:text-[#F5F5F7] flex items-center gap-1.5 transition-colors w-fit"
          >
            ← Sab Visualizations
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HEADER
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative border-b border-[rgba(255,255,255,0.08)] py-14 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/3 w-96 h-64 rounded-full blur-3xl pointer-events-none opacity-[0.07]"
          style={{ background: '#7C3AED' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-64 h-48 rounded-full blur-3xl pointer-events-none opacity-[0.05]"
          style={{ background: '#06B6D4' }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-wrap gap-2 mb-5">
            <Badge color="#10B981">Beginner</Badge>
            <Badge color="#06B6D4">8 min</Badge>
            <Badge color="#7C3AED">Node.js Core Track</Badge>
          </div>

          <h1 className="text-5xl font-bold font-display leading-tight mb-3">
            📦 Module Resolution{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
            >
              Algorithm
            </span>
          </h1>
          <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl">
            Ever got &ldquo;Cannot find module&rdquo; error? Node.js follows a specific algorithm to find modules.{' '}
            <em>Ye algorithm samjho — aur ye error dobara kabhi confuse nahi karega.</em>
          </p>
        </div>
      </div>

      {/* Lesson body */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-14">

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — HOOK
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Pehle Samjho — Concept ka Hook</SectionLabel>
          <div
            className="rounded-2xl border p-7"
            style={{
              background: 'rgba(124,58,237,0.06)',
              borderColor: 'rgba(124,58,237,0.25)',
            }}
          >
            <p className="text-lg font-semibold text-[#F5F5F7] mb-3">
              &ldquo;Cannot find module&rdquo; — iska exact matlab kya hai?
            </p>
            <p className="text-[#A1A1AA] leading-relaxed mb-4">
              Jab tum{' '}
              <code className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: 'rgba(124,58,237,0.15)', color: '#7C3AED' }}>
                require(&apos;lodash&apos;)
              </code>{' '}
              likhte ho, Node.js ek specific algorithm follow karta hai — pehle core modules check
              karta hai, phir relative path, phir node_modules folders walk karta hai. Jab kuch nahi
              milta, error aata hai. Ye algorithm jaanoge toh error kabhi nahi rokaega.
            </p>
            <div
              className="rounded-xl p-5 border grid md:grid-cols-3 gap-4"
              style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.2)' }}
            >
              {[
                { type: 'Core Module', example: "require('fs')", color: '#10B981', note: 'Built-in — instant, no disk IO' },
                { type: 'Relative Path', example: "require('./utils')", color: '#06B6D4', note: 'Resolve from current file' },
                { type: 'Third-Party', example: "require('lodash')", color: '#7C3AED', note: 'Walk up node_modules tree' },
              ].map(t => (
                <div key={t.type}>
                  <code className="text-xs font-mono" style={{ color: t.color }}>{t.example}</code>
                  <p className="font-semibold text-sm text-[#F5F5F7] mt-1">{t.type}</p>
                  <p className="text-xs text-[#A1A1AA] mt-0.5 leading-relaxed">{t.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — ANALOGY
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Real-World Analogy — Library System 📚</SectionLabel>
          <p className="text-[#A1A1AA] mb-5 leading-relaxed">
            Node.js module resolution ek library system ki tarah hai — kahan se kitab dhundhte ho:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                emoji: '🏠',
                title: 'Apni Shelf (Core)',
                nodeEquiv: "require('fs'), require('path')",
                color: '#10B981',
                desc: 'Pehle check karo apni khud ki shelf (built-in modules). Agar mili — instant return. Koi disk IO nahi.',
                example: 'Own bookshelf — hamesha available',
              },
              {
                emoji: '🏘️',
                title: 'Neighborhood Library (Local)',
                nodeEquiv: "require('./utils') in /project/src",
                color: '#06B6D4',
                desc: 'Relative paths — us file ke relative se dhundho. ./utils.js, ./utils/index.js — ek ek try karo.',
                example: 'Neighborhood library — seedha location jaante ho',
              },
              {
                emoji: '🌆',
                title: 'City Library Tree (node_modules)',
                nodeEquiv: "require('lodash')",
                color: '#7C3AED',
                desc: 'Current directory se start karo, parent directory pe jao, root tak jao — har level pe node_modules check karo.',
                example: 'City → State → Country libraries — tree search',
              },
            ].map(item => (
              <div
                key={item.title}
                className="rounded-xl p-5 border"
                style={{
                  background: `${item.color}08`,
                  borderColor: `${item.color}25`,
                }}
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <p className="font-semibold text-[#F5F5F7] mb-1">{item.title}</p>
                <p className="text-[10px] font-mono text-[#71717A] mb-2">{item.nodeEquiv}</p>
                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-2">{item.desc}</p>
                <p className="text-[10px] italic" style={{ color: item.color }}>{item.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4 — ALGORITHM WALKTHROUGH
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Algorithm — Exact Steps Node.js Follow Karta Hai</SectionLabel>
          <p className="text-[#A1A1AA] mb-5 leading-relaxed">
            Teen types ke modules ke liye alag algorithm hota hai:
          </p>

          <div className="space-y-4">
            {[
              {
                color: '#10B981',
                title: "require('fs') — Core Module",
                steps: [
                  'Step 1: Is "fs" a core module? → YES → return built-in immediately',
                  'No disk IO, no node_modules search, instant return',
                  'Core list: fs, path, http, https, os, events, stream, crypto, etc.',
                ],
              },
              {
                color: '#06B6D4',
                title: "require('./utils') — Relative Path",
                steps: [
                  'Step 1: Try ./utils.js → found? return it',
                  'Step 2: Try ./utils.json → found? return it',
                  'Step 3: Try ./utils/index.js → found? return it',
                  'Step 4: Nothing found → MODULE_NOT_FOUND error',
                ],
              },
              {
                color: '#7C3AED',
                title: "require('lodash') — Third-Party",
                steps: [
                  'Step 1: Core module? No → continue',
                  'Step 2: Relative path (./ or ../)? No → continue',
                  'Step 3: /current/dir/node_modules/lodash → found?',
                  'Step 4: /parent/dir/node_modules/lodash → found?',
                  'Step 5: Continue up tree to root...',
                  'Not found anywhere → MODULE_NOT_FOUND',
                ],
              },
            ].map(algo => (
              <div
                key={algo.title}
                className="rounded-xl p-5 border"
                style={{ background: '#12121A', borderColor: `${algo.color}20` }}
              >
                <p
                  className="font-mono font-bold text-sm mb-3"
                  style={{ color: algo.color }}
                >
                  {algo.title}
                </p>
                <ol className="space-y-1.5">
                  {algo.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-xs text-[#A1A1AA]">
                      <span
                        className="flex-shrink-0 font-mono font-bold"
                        style={{ color: algo.color }}
                      >
                        {i + 1}.
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 5 — INSTRUCTIONS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Step-by-Step Instructions — Visualization Use Karo</SectionLabel>
          <div
            className="rounded-2xl border p-7"
            style={{ background: '#12121A', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <p className="text-[#F5F5F7] font-semibold mb-5">
              Ye order follow karo:
            </p>
            <ol className="space-y-4">
              {[
                {
                  step: 1,
                  text: '"fs" preset click karo',
                  detail: 'Core module hai. Notice karo — sirf 1 step! Instant resolution. Core modules fastest hote hain.',
                  color: '#10B981',
                },
                {
                  step: 2,
                  text: '"lodash" preset try karo — Resolve dabao',
                  detail: 'Teen steps: not core → not relative → found in node_modules. Watch each step animate.',
                  color: '#7C3AED',
                },
                {
                  step: 3,
                  text: '"lodash" ke liye "Show Cached" dabao',
                  detail: 'Second require instantly resolve hota hai — cache se! No disk IO. Ye optimization automatic hai.',
                  color: '#06B6D4',
                },
                {
                  step: 4,
                  text: '"./utils" preset try karo',
                  detail: 'Relative path — notice karo file extensions kaise try hote hain ek ek karke.',
                  color: '#F59E0B',
                },
                {
                  step: 5,
                  text: 'Custom module name type karo (e.g., "express", "react")',
                  detail: 'Apna khud ka module name dalo aur dekho algorithm kaise kaam karta hai.',
                  color: '#EF4444',
                },
                {
                  step: 6,
                  text: 'Speed "slow" pe try karo',
                  detail: 'Har step ka timing clearly visible hoga.',
                  color: '#A1A1AA',
                },
              ].map(item => (
                <li key={item.step} className="flex gap-4">
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                    style={{ background: `${item.color}20`, color: item.color }}
                  >
                    {item.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#F5F5F7] mb-0.5">{item.text}</p>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 6 — VISUALIZATION
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Interactive Visualization</SectionLabel>
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: 'rgba(124,58,237,0.2)' }}
          >
            <div
              className="px-5 py-3 border-b flex items-center gap-3"
              style={{
                background: '#12121A',
                borderColor: 'rgba(124,58,237,0.15)',
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] animate-pulse" />
              <span className="text-xs font-mono text-[#A1A1AA]">Module Resolution — Live Algorithm</span>
            </div>
            <div className="p-2 md:p-4" style={{ background: '#0A0A0F' }}>
              <ModuleResolutionVisualizer />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 7 — EXPERIMENTS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Try Karo — 2 Experiments</SectionLabel>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                num: 'Experiment 1',
                color: '#7C3AED',
                title: 'Module Caching Demo',
                items: [
                  '"lodash" resolve karo — track karo step count',
                  'Phir "Show Cached" click karo — instant!',
                  'require() pehli baar disk se load karta hai, uske baad cache mein',
                  'Isliye require() second call me zero IO overhead',
                ],
              },
              {
                num: 'Experiment 2',
                color: '#06B6D4',
                title: 'Debug Real Error',
                items: [
                  'Koi ajeeb module name type karo — e.g., "mymodule123"',
                  'Watch karo: core check → node_modules walk → error',
                  'Ab samajh aaya kyun "Cannot find module" aata hai?',
                  'Fix: npm install karo ya path check karo',
                ],
              },
            ].map(exp => (
              <div
                key={exp.num}
                className="rounded-2xl border p-5"
                style={{ background: `${exp.color}06`, borderColor: `${exp.color}20` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                    style={{ background: `${exp.color}15`, color: exp.color }}
                  >
                    {exp.num}
                  </span>
                  <span className="text-sm font-semibold text-[#F5F5F7]">{exp.title}</span>
                </div>
                <ul className="space-y-2">
                  {exp.items.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[10px] font-mono mt-0.5 flex-shrink-0" style={{ color: exp.color }}>
                        {i + 1}.
                      </span>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 8 — KEY TAKEAWAYS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Key Takeaways — Ye 3 Cheezein Yaad Rakho</SectionLabel>
          <div className="space-y-4">
            {[
              {
                num: '01',
                color: '#10B981',
                heading: 'Core → Relative → node_modules — hamesha is order mein',
                body: 'Node.js hamesha pehle core modules check karta hai (fs, path, http). Phir relative paths (./). Phir node_modules tree walk. Ye order change nahi hota.',
              },
              {
                num: '02',
                color: '#7C3AED',
                heading: 'require() cache karta hai — second call instant',
                body: 'Ek baar module load ho gaya, require.cache mein store ho jaata hai. Dobara require() karo — no disk IO, instant return. Isliye circular requires bhi handle ho jaate hain.',
              },
              {
                num: '03',
                color: '#06B6D4',
                heading: 'require.resolve() se debug karo — exact path milta hai',
                body: 'require.resolve("lodash") run karo — exact file path batata hai. "Cannot find module" error debug karne ka fastest way. __dirname + path.join() se relative paths reliable bante hain.',
              },
            ].map(item => (
              <div
                key={item.num}
                className="flex gap-5 rounded-xl p-5"
                style={{ background: '#12121A', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span
                  className="text-2xl font-mono font-black opacity-40 flex-shrink-0 mt-0.5"
                  style={{ color: item.color }}
                >
                  {item.num}
                </span>
                <div>
                  <p className="font-semibold text-[#F5F5F7] mb-1">{item.heading}</p>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 9 — COMMON CONFUSION
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Common Confusion — Myths Clear Karo</SectionLabel>
          <div className="space-y-4">
            {[
              {
                wrong: '"Cannot find module" matlab module exist nahi karta',
                right: 'Module exist kar sakta hai — lekin galat location pe ya path galat hai. require.resolve() se exact path check karo pehle.',
              },
              {
                wrong: 'require() slow hota hai — cache nahi karta',
                right: 'require() aggressively cache karta hai. Second call instant hota hai. Application startup pe ek baar load hota hai sab.',
              },
              {
                wrong: 'node_modules sirf project root mein hoti hai',
                right: 'Node.js current dir se root tak walk karta hai — har level pe node_modules check karta hai. Monorepos mein ye behavior crucial hai.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="px-5 py-3 flex items-start gap-3" style={{ background: 'rgba(239,68,68,0.08)' }}>
                  <span className="text-[#EF4444] font-bold flex-shrink-0">❌</span>
                  <p className="text-sm text-[#EF4444]">{item.wrong}</p>
                </div>
                <div className="px-5 py-3 flex items-start gap-3" style={{ background: 'rgba(16,185,129,0.06)' }}>
                  <span className="text-[#10B981] font-bold flex-shrink-0">✅</span>
                  <p className="text-sm text-[#A1A1AA]">{item.right}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 10 — CODE CONNECTION
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Code Connection — Debug Tools</SectionLabel>
          <p className="text-[#A1A1AA] mb-5 leading-relaxed">
            Module resolution debug karne ke real tools:
          </p>
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div
              className="px-5 py-3 border-b flex items-center gap-3"
              style={{ background: '#12121A', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <span className="w-3 h-3 rounded-full bg-[#10B981]" />
              </div>
              <span className="text-xs font-mono text-[#71717A]">module-debug.js</span>
            </div>
            <pre
              className="p-6 text-sm font-mono leading-relaxed overflow-x-auto"
              style={{ background: '#0D0D14', color: '#A1A1AA' }}
            >
              <code>{`// 1. Exact path kahan se load ho raha hai
console.log(require.resolve('lodash'))
// → /Users/project/node_modules/lodash/lodash.js

// 2. __dirname — current file ka directory
console.log(__dirname)
// → /Users/project/src

// 3. Reliable relative path — __dirname + path.join
const path = require('path')
const config = require(path.join(__dirname, '../config/db'))
// Works from anywhere — no relative path confusion!

// 4. Module cache dekho
console.log(Object.keys(require.cache))
// → all currently cached modules

// 5. Cache manually clear (hot reload tricks)
delete require.cache[require.resolve('./myModule')]
// Ab next require() fresh load karega

// 6. NODE_PATH environment variable
// NODE_PATH=/shared/lib node app.js
// → require('utils') /shared/lib/utils bhi check karega`}</code>
            </pre>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mt-4">
            {[
              { color: '#7C3AED', label: 'require.resolve()', note: 'Exact path find karo bina loading ke.' },
              { color: '#06B6D4', label: '__dirname', note: 'Always absolute path — no "../" confusion.' },
              { color: '#10B981', label: 'require.cache', note: 'All loaded modules — cache clear kar sakte ho.' },
            ].map(ann => (
              <div
                key={ann.label}
                className="rounded-lg p-3"
                style={{ background: `${ann.color}08`, border: `1px solid ${ann.color}20` }}
              >
                <code className="text-xs font-mono font-bold" style={{ color: ann.color }}>
                  {ann.label}
                </code>
                <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">{ann.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 11 — NEXT STEPS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Next Steps — Aage Kya Seekho</SectionLabel>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: '🔄',
                title: 'Promise States Machine',
                desc: 'Async module loading aur dynamic imports — Promise ke saath connect karo',
                href: '/visualizations/promise-states',
                color: '#10B981',
                label: 'Viz dekho →',
              },
              {
                icon: '⚙️',
                title: 'Event Loop Visualizer',
                desc: 'Module loading ke time event loop ka behavior — synchronous initialization',
                href: '/visualizations/event-loop',
                color: '#7C3AED',
                label: 'Viz dekho →',
              },
            ].map(next => (
              <Link
                key={next.title}
                href={next.href}
                className="group flex gap-4 rounded-xl p-5 transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: `${next.color}08`,
                  border: `1px solid ${next.color}20`,
                }}
              >
                <span className="text-3xl flex-shrink-0">{next.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-[#F5F5F7] mb-1">{next.title}</p>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">{next.desc}</p>
                  <span className="text-xs font-semibold" style={{ color: next.color }}>
                    {next.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/visualizations"
              className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors"
            >
              ← Sab visualizations dekho
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
