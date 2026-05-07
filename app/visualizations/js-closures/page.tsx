import Link from 'next/link'
import ScopeClosureVisualizer from '@/components/visualizations/ScopeClosureVisualizer'

export const metadata = {
  title: 'Scope & Closures Visualizer — NodeMaster',
  description:
    'JavaScript ka scope chain aur closures visually samjho. Classic loop bug (3,3,3 vs 0,1,2) aur closure counter — animated step-by-step.',
}

// ─── Reusable atoms ──────────────────────────────────────────────────────────
const glassCard = 'rounded-2xl border border-[rgba(255,255,255,0.08)] p-5' as const
const glassCardBg = { background: 'rgba(26,26,38,0.8)', backdropFilter: 'blur(12px)' }

function Badge({ children, color = '#7C3AED' }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
    >
      {children}
    </span>
  )
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`max-w-7xl mx-auto px-6 ${className}`}>{children}</section>
}

function SectionHeading({ emoji, title, subtitle }: { emoji: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl">{emoji}</span>
        <h2 className="text-xl font-bold text-[#F5F5F7]">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-[#71717A] ml-11">{subtitle}</p>}
    </div>
  )
}

const LOOP_BUG_CODE: { text: string; color?: string }[] = [
  { text: '// ❌ THE CLASSIC LOOP BUG (var)', color: '#EF4444' },
  { text: "for (var i = 0; i < 3; i++) {" },
  { text: "  setTimeout(() => console.log(i), 100);", color: '#EF4444' },
  { text: "}" },
  { text: "// Output: 3, 3, 3  ← not 0, 1, 2!", color: '#EF4444' },
  { text: "// Why? var i is SHARED across all callbacks", color: '#71717A' },
  { text: '' },
  { text: '// ✓ FIX 1: Use let (block scope)', color: '#10B981' },
  { text: "for (let j = 0; j < 3; j++) {", color: '#10B981' },
  { text: "  setTimeout(() => console.log(j), 100);", color: '#10B981' },
  { text: "}" },
  { text: "// Output: 0, 1, 2  ✓ each iteration gets own j", color: '#71717A' },
  { text: '' },
  { text: '// ✓ FIX 2: Use IIFE closure (old style)', color: '#7C3AED' },
  { text: "for (var k = 0; k < 3; k++) {", color: '#7C3AED' },
  { text: "  (function(capturedK) {", color: '#7C3AED' },
  { text: "    setTimeout(() => console.log(capturedK), 100);", color: '#7C3AED' },
  { text: "  })(k);", color: '#7C3AED' },
  { text: "}" },
  { text: "// Output: 0, 1, 2  ✓ IIFE creates new scope each time", color: '#71717A' },
]

export default function JsClosuresPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">

      {/* ── 1. HEADER ─────────────────────────────────────────────────────── */}
      <header className="border-b border-[rgba(255,255,255,0.08)] py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-[#71717A] mb-5">
            <Link href="/" className="hover:text-[#F5F5F7] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/visualizations" className="hover:text-[#F5F5F7] transition-colors">Visualizations</Link>
            <span>/</span>
            <span className="text-[#A1A1AA]">Scope &amp; Closures</span>
          </nav>
          <div className="flex items-start gap-4 mb-2">
            <span className="text-4xl">🪆</span>
            <div>
              <h1 className="text-4xl font-bold text-[#F5F5F7] leading-tight">
                Scope &amp; Closures Visualizer
              </h1>
              <p className="text-[#A1A1AA] text-lg mt-2 ml-0">
                JavaScript ka scope chain aur closure mechanism — visually trace karo variable lookup.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <Badge color="#F59E0B">⚡ Intermediate</Badge>
                <Badge color="#06B6D4">⏱ 12 min</Badge>
                <Badge color="#7C3AED">Track: JavaScript</Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. PEHLE SAMJHO ───────────────────────────────────────────────── */}
      <Section className="pt-10 pb-6">
        <SectionHeading
          emoji="🧠"
          title="Pehle Samjho — Ye Kyun Zaroori Hai?"
          subtitle="Closure bugs are the #1 source of confusion for JS beginners"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className={glassCard} style={glassCardBg}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">😱</span>
              <h3 className="font-bold text-[#EF4444]">Classic Loop Bug — Sabko Confuse Karta Hai</h3>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              Ye code likhne par output kya expect karte ho?{' '}
              <code className="text-[#F59E0B] bg-[rgba(245,158,11,0.1)] px-1.5 py-0.5 rounded text-xs">
                0, 1, 2
              </code>{' '}
              ? Wrong!{' '}
              <strong className="text-[#EF4444]">
                Output hai: 3, 3, 3
              </strong>{' '}
              — aur ye beginners ko hamesha stun karta hai.
            </p>
            <div
              className="mt-4 rounded-lg p-3 border border-[rgba(239,68,68,0.2)] font-mono text-xs"
              style={{ background: 'rgba(239,68,68,0.06)' }}
            >
              <p className="text-[#EF4444]">{`for (var i = 0; i < 3; i++) {`}</p>
              <p className="text-[#EF4444] ml-2">{`setTimeout(() => console.log(i), 100);`}</p>
              <p className="text-[#EF4444]">{'}'}</p>
              <p className="text-[#71717A] mt-1">{'// Output: 3, 3, 3  ← NOT 0, 1, 2!'}</p>
            </div>
          </div>
          <div className={glassCard} style={glassCardBg}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">💡</span>
              <h3 className="font-bold text-[#10B981]">Kyun? Scope Chain Ke Wajah Se</h3>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              <code className="text-[#F59E0B] bg-[rgba(245,158,11,0.1)] px-1.5 py-0.5 rounded text-xs">var i</code>{' '}
              function-scoped hai — saare 3 callbacks SAME{' '}
              <code className="text-[#F59E0B] bg-[rgba(245,158,11,0.1)] px-1.5 py-0.5 rounded text-xs">i</code>{' '}
              variable share karte hain. Jab callbacks run hote hain (100ms baad), loop pura ho chuka hota hai — aur{' '}
              <strong className="text-[#F5F5F7]">i = 3</strong>.
              Solution:{' '}
              <code className="text-[#10B981] bg-[rgba(16,185,129,0.1)] px-1.5 py-0.5 rounded text-xs">let</code>{' '}
              use karo — block scope milti hai, har iteration ka apna{' '}
              <code className="text-[#10B981] bg-[rgba(16,185,129,0.1)] px-1.5 py-0.5 rounded text-xs">i</code>.
            </p>
            <div
              className="mt-4 rounded-lg p-3 border border-[rgba(16,185,129,0.2)] font-mono text-xs"
              style={{ background: 'rgba(16,185,129,0.06)' }}
            >
              <p className="text-[#10B981]">{`for (let i = 0; i < 3; i++) {`}</p>
              <p className="text-[#10B981] ml-2">{`setTimeout(() => console.log(i), 100);`}</p>
              <p className="text-[#10B981]">{'}'}</p>
              <p className="text-[#71717A] mt-1">{'// Output: 0, 1, 2  ✓ Fixed!'}</p>
            </div>
          </div>
        </div>

        <div
          className="mt-5 rounded-2xl border border-[rgba(124,58,237,0.3)] p-5"
          style={{ background: 'rgba(124,58,237,0.07)' }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">🔒</span>
            <div>
              <h3 className="font-bold text-[#7C3AED] mb-1">Closure Kya Hai?</h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                Closure = function + us function ke outer scope ka reference. Jab ek inner function outer function ke variable ko remember karta hai — even after outer function return ho chuka ho — woh closure hai.{' '}
                <strong className="text-[#F5F5F7]">Counter function ka example:</strong>{' '}
                makeCounter() return ho jaata hai, lekin{' '}
                <code className="text-[#7C3AED] bg-[rgba(124,58,237,0.1)] px-1.5 py-0.5 rounded text-xs">count</code>{' '}
                variable memory mein zinda rehta hai — closure ke wajah se!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#F59E0B' }}>
            Prerequisites — Pehle Ye Jaan Lo
          </p>
          <div className="flex gap-3 flex-wrap">
            {[
              { label: 'JavaScript Basics', href: '/javascript/js-what-why' },
              { label: 'Functions', href: '/javascript/functions' },
              { label: 'var vs let vs const', href: '/javascript/variables-datatypes' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border transition-colors hover:text-[#F5F5F7]"
                style={{ color: '#F59E0B', borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.06)' }}
              >
                {item.label} →
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 3. ANALOGY ────────────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🪆"
          title="Real-World Analogy — Russian Nesting Dolls (Matryoshka)"
          subtitle="Scope chain ko ek relatable cheez se samjho"
        />
        <div className={glassCard} style={glassCardBg}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                emoji: '🌍',
                label: 'Sabse Badi Doll (Global)',
                color: '#06B6D4',
                desc: 'Global scope — sabse bahar. Iske variables sabko dikhte hain — inner dolls bhi dekh sakti hain.',
              },
              {
                emoji: '📦',
                label: 'Beech wali Doll (Function)',
                color: '#7C3AED',
                desc: 'Function scope — beech mein. Outer (global) dekh sakti hai, inner bhi dekh sakti hai. Lekin bahar wali inner ko nahi dekh sakti!',
              },
              {
                emoji: '🔷',
                label: 'Sabse Chhoti Doll (Block)',
                color: '#10B981',
                desc: 'Block scope (let/const) — sabse andar. Sabko dekh sakti hai — global, function, block. Par bahar wale isko nahi dekh sakte.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border p-4"
                style={{ background: `${item.color}08`, borderColor: `${item.color}30` }}
              >
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: item.color }}>
                  {item.label}
                </div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p
            className="rounded-xl p-3 border text-sm text-[#F5F5F7] font-medium"
            style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
          >
            💡 <strong>Key rule:</strong> Inner doll outer ko dekh sakti hai — outer inner ko nahi dekh sakta. Ye hi LEXICAL SCOPE hai.
            Closure = inner function ne outer doll ka variable pakad liya — even after outer gone!
          </p>
        </div>
      </Section>

      {/* ── 4. COLOR LEGEND ───────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🎨"
          title="Color Legend — Visualization Mein Kya Kya Hai?"
          subtitle="Shuru karne se pehle ye samjho"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { color: '#06B6D4', label: 'Cyan Border — Global Scope', desc: 'Outermost scope — window ya Node.js global. Sab variables yahan accessible hain.' },
            { color: '#7C3AED', label: 'Purple Border — Function Scope', desc: 'Function ke andar declare kiya. Sirf us function ke andar accessible.' },
            { color: '#10B981', label: 'Green Border — Block Scope', desc: 'let/const ke saath if/for block ke andar. Block ke baad accessible nahi.' },
            { color: '#F59E0B', label: 'Amber — var keyword', desc: 'var function-scoped hai — block se leak ho jaata hai. Classic bug ka reason!' },
            { color: '#EF4444', label: 'Red — ReferenceError', desc: 'Variable scope chain mein kahin nahi mila. JS engine yahi error throw karta hai.' },
            { color: '#7C3AED', label: 'Purple button — Lookup trace', desc: 'Click karke variable lookup animation dekho — scope chain pe travel karta arrow.' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 rounded-xl border p-3"
              style={{ background: `${item.color}08`, borderColor: `${item.color}30` }}
            >
              <div className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60` }} />
              <div>
                <div className="text-sm font-semibold text-[#F5F5F7]">{item.label}</div>
                <div className="text-xs text-[#71717A] mt-1 leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. STEP-BY-STEP INSTRUCTIONS ─────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="📋"
          title="Step-by-Step — Kaise Use Karein?"
          subtitle="In steps ko follow karo maximum learning ke liye"
        />
        <div className={glassCard} style={glassCardBg}>
          <div className="space-y-4">
            {[
              { n: '01', action: 'Example 1 se shuru karo', detail: 'Left panel mein "Global + Function Scope" select karo — sabse simple hai.', color: '#06B6D4' },
              { n: '02', action: 'Nested boxes dekho', detail: 'Right side pe colored boxes hain — outer box = global, inner = function, innermost = block.', color: '#7C3AED' },
              { n: '03', action: 'Variable button click karo', detail: '"Access Variable" buttons pe click karo (e.g., innerVar). Dekho lookup animation kahan se shuru hoti hai.', color: '#10B981' },
              { n: '04', action: 'Scope chain trace karo', detail: 'Arrow dikhayega JS engine kaise scope chain mein travel karta hai. Jab variable mila — green glow!', color: '#F59E0B' },
              { n: '05', action: 'Example 2 try karo — var leak dekho', detail: '"Block Scope" example mein dekho varX block se leak karke function scope mein aa jaata hai.', color: '#EF4444' },
              { n: '06', action: 'Example 3 — Closure Counter', detail: 'makeCounter example mein dekho — outer function return ho gayi, lekin count variable zinda hai. Ye closure hai!', color: '#7C3AED' },
              { n: '07', action: 'Example 4 — Loop Bug Fix', detail: 'Classic loop bug aur uska fix dekho. Ye interview mein zaroor poochha jaata hai!', color: '#EF4444' },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-mono font-bold shrink-0"
                  style={{ background: `${step.color}20`, color: step.color, border: `1px solid ${step.color}40` }}
                >
                  {step.n}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-semibold text-[#F5F5F7]">{step.action}</p>
                  <p className="text-sm text-[#71717A] mt-0.5">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 6. VISUALIZATION ──────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading emoji="🎮" title="Visualization — Dekho Aur Seekho!" subtitle="Neeche diye controls se interact karo" />
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ background: 'rgba(18,18,26,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="ml-2 text-sm text-[#71717A] font-mono">scope-closure-visualizer.js</span>
          </div>
          <div className="p-6">
            <ScopeClosureVisualizer />
          </div>
        </div>
      </Section>

      {/* ── 7. EXPERIMENTS ────────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading emoji="🧪" title="Try Karo — Ye Experiments Karo!" subtitle="Specific cheezein try karo ye samjhne ke liye" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Experiment 1: Scope Chain Walk',
              steps: [
                'Example 1 chuno',
                '"globalVar" button click karo (from inner)',
                'Dekho — arrow inner se outer se global tak jaata hai',
                'Ye scope chain lookup hai!',
              ],
              insight: 'JS engine innermost se shuru karke outermost tak jaata hai variable dhundne ke liye.',
              color: '#06B6D4',
              emoji: '🔍',
            },
            {
              title: 'Experiment 2: var Leak Dekho',
              steps: [
                'Example 2 chuno',
                '"varX" button click karo block scope se',
                'Dekho — varX block mein nahi, function scope mein mila',
                'Ye var ka block leak hai!',
              ],
              insight: 'var function-scoped hai — if/for blocks se leak ho jaata hai. let/const use karo!',
              color: '#EF4444',
              emoji: '🚨',
            },
            {
              title: 'Experiment 3: Closure Magic',
              steps: [
                'Example 3 chuno',
                '"count" button click karo',
                'Dekho — count outer scope (closure) mein hai',
                'makeCounter return ho gayi — fir bhi count zinda!',
              ],
              insight: 'Closure = function apne outer scope ko "close over" karta hai. Memory mein rehta hai jab tak reference hai.',
              color: '#7C3AED',
              emoji: '🔒',
            },
          ].map((exp) => (
            <div
              key={exp.title}
              className={`${glassCard} border`}
              style={{ ...glassCardBg, borderColor: `${exp.color}40` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{exp.emoji}</span>
                <h3 className="font-bold text-sm" style={{ color: exp.color }}>{exp.title}</h3>
              </div>
              <ol className="space-y-2 mb-4">
                {exp.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#A1A1AA]">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5" style={{ background: `${exp.color}25`, color: exp.color }}>
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <div className="rounded-lg p-2.5 text-xs text-[#A1A1AA] leading-relaxed border" style={{ background: `${exp.color}08`, borderColor: `${exp.color}25` }}>
                💡 {exp.insight}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 8. KEY TAKEAWAYS ──────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading emoji="🎯" title="Key Takeaways — Ye 3 Cheezein Yaad Rakhna!" subtitle="Ye page band karne ke baad bhi ye yaad rahega" />
        <div className="space-y-4">
          {[
            {
              n: '1',
              bold: 'Scope Chain: Inner → Outer → Global',
              rest: '— JS engine variable dhundne ke liye inner scope se shuru karta hai, phir outer, phir global. Nahi mila toh ReferenceError. Ye lookup hamesha isi order mein hota hai.',
              color: '#06B6D4',
            },
            {
              n: '2',
              bold: 'var leaks, let/const nahi leakta',
              rest: '— var function-scoped hai (block se leak hota hai), let/const block-scoped hain. Modern JS mein hamesha let/const prefer karo. var sirf legacy code mein milega.',
              color: '#F59E0B',
            },
            {
              n: '3',
              bold: 'Closure = Function + Outer Scope Reference',
              rest: '— Jab function return hota hai, woh apne outer scope ka reference "close over" karta hai. Counter, memoization, private variables — sab closures se hote hain. Ye ek powerful pattern hai.',
              color: '#7C3AED',
            },
          ].map((t) => (
            <div
              key={t.n}
              className="flex items-start gap-4 rounded-2xl border p-5"
              style={{ background: `${t.color}08`, borderColor: `${t.color}30` }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0" style={{ background: `${t.color}25`, color: t.color }}>
                {t.n}
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed pt-1.5">
                <strong className="text-[#F5F5F7]">{t.bold}</strong> {t.rest}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 9. COMMON CONFUSION ───────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading emoji="🤔" title="Common Confusion — Ye Galat Hai!" subtitle="Beginners ye mistakes karte hain — tum mat karna" />
        <div className="space-y-4">
          {[
            {
              wrong: 'var aur let same kaam karte hain — sirf syntax alag hai',
              right: 'var function-scoped hai, let block-scoped hai. Fark bahut important hai — loop bug isi wajah se hota hai. Modern JS mein var use karna avoid karo.',
            },
            {
              wrong: 'Closure mein variable ki COPY save hoti hai',
              right: "Closure variable ki REFERENCE save karta hai — COPY nahi. Isliye agar outer variable change hoga, inner function ko new value milegi. Counter example mein count hamesha update hota hai — copy nahi.",
            },
            {
              wrong: 'Global variables sab jagah accessible hain — ye to achha hai',
              right: 'Global variables pollution create karte hain — name collisions, unexpected mutations, testing mushkil. Module pattern ya closures use karo variables ko encapsulate karne ke liye.',
            },
          ].map((item, i) => (
            <div key={i} className={glassCard} style={glassCardBg}>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-lg shrink-0 mt-0.5">❌</span>
                <p className="text-sm text-[#EF4444] font-medium leading-relaxed">&quot;{item.wrong}&quot;</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg shrink-0 mt-0.5">✅</span>
                <p className="text-sm text-[#10B981] leading-relaxed">{item.right}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 10. CODE CONNECTION ───────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading emoji="💻" title="Classic Loop Bug — Complete Solution" subtitle="Interview mein ye poochha jaata hai — yaad rakh lo" />
        <div className={glassCard} style={glassCardBg}>
          <pre className="rounded-xl p-5 overflow-x-auto text-sm leading-relaxed font-mono border border-[rgba(255,255,255,0.06)]" style={{ background: 'rgba(10,10,15,0.8)' }}>
            <code className="whitespace-pre">
              {LOOP_BUG_CODE.map((line, i) => (
                <span key={i} style={{ color: line.color ?? '#A1A1AA', display: 'block' }}>
                  {line.text || ' '}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </Section>

      {/* ── 11. NEXT STEPS ────────────────────────────────────────────────── */}
      <Section className="pt-6 pb-16">
        <SectionHeading emoji="🚀" title="Next Steps — Aage Kya Seekhna Hai?" subtitle="Scope aur closures samajh gaye? Ab ye karo" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            href="/course/scope-closures"
            className="group block rounded-2xl border border-[rgba(124,58,237,0.3)] p-6 transition-all hover:border-[rgba(124,58,237,0.6)] hover:shadow-[0_0_30px_rgba(124,58,237,0.12)]"
            style={{ background: 'rgba(124,58,237,0.07)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📖</span>
                <span className="text-xs font-mono text-[#7C3AED] uppercase tracking-widest">Course Chapter</span>
              </div>
              <span className="text-[#71717A] text-xl group-hover:text-[#7C3AED] transition-colors">→</span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-1">Scope &amp; Closures Chapter Padhna</h3>
            <p className="text-sm text-[#A1A1AA]">Deep dive — lexical scope, IIFE, module pattern, closure-based private variables.</p>
          </Link>

          <Link
            href="/visualizations/js-prototype"
            className="group block rounded-2xl border border-[rgba(6,182,212,0.3)] p-6 transition-all hover:border-[rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]"
            style={{ background: 'rgba(6,182,212,0.07)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔗</span>
                <span className="text-xs font-mono text-[#06B6D4] uppercase tracking-widest">Next Visualization</span>
              </div>
              <span className="text-[#71717A] text-xl group-hover:text-[#06B6D4] transition-colors">→</span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-1">Prototype Chain Dekho</h3>
            <p className="text-sm text-[#A1A1AA]">JavaScript inheritance kaise kaam karta hai — prototype chain animated visualization.</p>
          </Link>
        </div>
      </Section>
    </div>
  )
}
