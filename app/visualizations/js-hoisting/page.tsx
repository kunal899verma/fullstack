import Link from 'next/link'
import HoistingVisualizer from '@/components/visualizations/HoistingVisualizer'

export const metadata = {
  title: 'Variable Hoisting Visualizer — NodeMaster',
  description:
    "JS engine ka 2-phase behavior — Creation Phase aur Execution Phase animated dekho. var, let, const, aur function declarations ke hoisting ka complete visualization.",
}

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

const HOISTING_QUIZ = `// QUIZ: Output kya hoga? Think before reading answers!

// Question 1:
console.log(a);      // ???
var a = 5;
console.log(a);      // ???
// Answer: undefined, then 5
// Reason: var hoisted as undefined in creation phase

// Question 2:
console.log(b);      // ???
let b = 10;
// Answer: ReferenceError!
// Reason: let in TDZ — cannot access before initialization

// Question 3:
hello();             // ???
function hello() { return 'Hello!'; }
// Answer: 'Hello!' ✓
// Reason: function declarations fully hoisted (body too)

// Question 4:
world();             // ???
var world = function() { return 'World!'; }
// Answer: TypeError — world is not a function!
// Reason: var world hoisted as undefined — not a function yet

// Question 5:
console.log(typeof c); // ???
let c = 'test';
// Answer: ReferenceError!
// Even typeof doesn't save you from TDZ for let/const`

export default function JsHoistingPage() {
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
            <span className="text-[#A1A1AA]">Variable Hoisting</span>
          </nav>
          <div className="flex items-start gap-4 mb-2">
            <span className="text-4xl">🏗️</span>
            <div>
              <h1 className="text-4xl font-bold text-[#F5F5F7] leading-tight">
                Variable Hoisting Visualizer
              </h1>
              <p className="text-[#A1A1AA] text-lg mt-2">
                JS engine ka 2-phase behavior — Creation Phase aur Execution Phase animated dekho.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <Badge color="#10B981">Beginner</Badge>
                <Badge color="#06B6D4">⏱ 8 min</Badge>
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
          title="Pehle Samjho — Hoisting Kyun Confusing Hai?"
          subtitle="console.log(x); var x = 5; — ye undefined deta hai, error nahi. Kyun?"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className={glassCard} style={glassCardBg}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🤔</span>
              <h3 className="font-bold text-[#F59E0B]">Ye Kaise Possible Hai?</h3>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-3">
              Ye code logically impossible lagta hai — variable declare hone se PEHLE use kar rahe ho. Phir bhi error nahi aata?
            </p>
            <div className="rounded-lg p-3 border border-[rgba(245,158,11,0.2)] font-mono text-xs" style={{ background: 'rgba(245,158,11,0.06)' }}>
              <p className="text-[#F59E0B]">console.log(x); {'// undefined (not error!)'}</p>
              <p className="text-[#71717A] mt-1">var x = 5;</p>
              <p className="text-[#71717A] mt-1">console.log(x); {'// 5'}</p>
            </div>
          </div>
          <div className={glassCard} style={glassCardBg}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">💡</span>
              <h3 className="font-bold text-[#10B981]">JS Engine 2-Phase Mein Kaam Karta Hai</h3>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              <strong className="text-[#F5F5F7]">Phase 1: Creation Phase</strong> — Code run hone se PEHLE JS engine poora code scan karta hai. var declarations memory mein jaati hain (as{' '}
              <code className="text-[#F59E0B] bg-[rgba(245,158,11,0.1)] px-1.5 py-0.5 rounded text-xs">undefined</code>),
              function declarations fully hoisted hoti hain.
            </p>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mt-2">
              <strong className="text-[#F5F5F7]">Phase 2: Execution Phase</strong> — Tab actual code run hota hai line by line.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-[rgba(124,58,237,0.3)] p-5" style={{ background: 'rgba(124,58,237,0.07)' }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">⚠️</span>
            <div>
              <h3 className="font-bold text-[#7C3AED] mb-1">TDZ — Temporal Dead Zone Kya Hai?</h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                let aur const bhi technically hoist hote hain — lekin unhe{' '}
                <strong className="text-[#EF4444]">TDZ (Temporal Dead Zone)</strong>{' '}
                mein rakha jaata hai jab tak initialization nahi hoti. TDZ mein access karne par{' '}
                <code className="text-[#EF4444] bg-[rgba(239,68,68,0.1)] px-1.5 py-0.5 rounded text-xs">ReferenceError</code>{' '}
                aata hai. Isliye let/const var se safer hain!
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 3. ANALOGY ────────────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🏗️"
          title="Real-World Analogy — Building Construction"
          subtitle="2 phases ko building banane se compare karo"
        />
        <div className={glassCard} style={glassCardBg}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            {[
              {
                emoji: '🏗️',
                title: 'Phase 1: Foundation (Creation)',
                color: '#7C3AED',
                items: [
                  { label: 'Architect blueprint scan karta hai', detail: 'JS engine poora code scan karta hai' },
                  { label: 'Foundation mark karta hai (var = undefined)', detail: 'var declarations memory mein jaati hain' },
                  { label: 'Pura structure plan hota hai (function = full)', detail: 'Function declarations fully ready' },
                  { label: 'Plot reserved par khali (let/const = TDZ)', detail: 'let/const TDZ mein — wait karo!' },
                ],
              },
              {
                emoji: '🏠',
                title: 'Phase 2: Construction (Execution)',
                color: '#10B981',
                items: [
                  { label: 'Actual building shuru hoti hai', detail: 'Code line by line execute hota hai' },
                  { label: 'Var ko real value milti hai', detail: 'var x = 5 par x = 5 ho jaata hai' },
                  { label: 'Let/const TDZ se bahar aate hain', detail: 'Initialization hone par accessible' },
                  { label: 'Building ready!', detail: 'Execution complete' },
                ],
              },
            ].map((phase) => (
              <div key={phase.title} className="rounded-xl border p-4" style={{ background: `${phase.color}08`, borderColor: `${phase.color}30` }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{phase.emoji}</span>
                  <span className="font-semibold text-sm" style={{ color: phase.color }}>{phase.title}</span>
                </div>
                <div className="space-y-2">
                  {phase.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0" style={{ background: `${phase.color}25`, color: phase.color }}>
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[#F5F5F7] font-medium">{item.label}</p>
                        <p className="text-[#71717A]">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="rounded-xl p-3 border text-sm text-[#F5F5F7] font-medium" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
            💡 <strong>Key insight:</strong> Building ke liye pehle foundation chahiye — phir upar kuch build hoga. JS bhi pehle sab variables/functions register karta hai (phase 1), phir execute karta hai (phase 2). Ye hi hoisting hai!
          </p>
        </div>
      </Section>

      {/* ── 4. COLOR LEGEND ───────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading emoji="🎨" title="Color Legend — Visualization Mein Kya Kya Hai?" subtitle="Dekho kya dikhega before playing" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { color: '#F59E0B', label: 'Amber — var (hoisted as undefined)', desc: 'var memory mein jaata hai creation phase mein — but value undefined. "Ghost" form.' },
            { color: '#EF4444', label: 'Red — TDZ Zone', desc: 'let/const yahan hain creation phase mein — access kiya toh ReferenceError. Danger zone!' },
            { color: '#7C3AED', label: 'Purple — function declaration', desc: 'Function declarations FULLY hoisted — naam aur body dono. Ready to use immediately!' },
            { color: '#10B981', label: 'Green — Execution Phase', desc: 'Actual values assign hote hain — var gets real value, let/const TDZ exit karte hain.' },
            { color: '#7C3AED', label: 'Purple border — Creation Phase', desc: 'Phase 1 active — engine scanning aur memory setup.' },
            { color: '#10B981', label: 'Green border — Execution Phase', desc: 'Phase 2 active — code line by line chal raha hai.' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 rounded-xl border p-3" style={{ background: `${item.color}08`, borderColor: `${item.color}30` }}>
              <div className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60` }} />
              <div>
                <div className="text-sm font-semibold text-[#F5F5F7]">{item.label}</div>
                <div className="text-xs text-[#71717A] mt-1 leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5. INSTRUCTIONS ───────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading emoji="📋" title="Step-by-Step — Kaise Use Karein?" subtitle="In steps ko follow karo maximum learning ke liye" />
        <div className={glassCard} style={glassCardBg}>
          <div className="space-y-4">
            {[
              { n: '01', action: 'Example 1 select karo', detail: '"var vs let Hoisting" — sabse important aur common example.', color: '#7C3AED' },
              { n: '02', action: '"Step →" button se manually advance karo', detail: 'Pehle "Step" click karo — Phase 1 (Creation) start hogi. Variables hoist hote dikhenge.', color: '#06B6D4' },
              { n: '03', action: 'Phase 1 observe karo', detail: 'Creation phase mein: var = undefined, let = TDZ (red), function = fully ready. Code run nahi hua abhi!', color: '#7C3AED' },
              { n: '04', action: 'Phase 2 observe karo', detail: 'Execution phase mein: code line by line chalta hai. Output panel mein results aate hain.', color: '#10B981' },
              { n: '05', action: '"Simulate" button try karo', detail: 'Automatic animation — dono phases clearly dikhte hain. Speed slow karo observation ke liye.', color: '#F59E0B' },
              { n: '06', action: 'Example 2 try karo', detail: '"Function Expression vs Declaration" — common interview question. Difference clearly dikhega.', color: '#EF4444' },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-mono font-bold shrink-0" style={{ background: `${step.color}20`, color: step.color, border: `1px solid ${step.color}40` }}>
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
        <SectionHeading emoji="🎮" title="Visualization — Dekho 2 Phases Live!" subtitle="Neeche diye controls se interact karo" />
        <div className="rounded-2xl border overflow-hidden" style={{ background: 'rgba(18,18,26,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="ml-2 text-sm text-[#71717A] font-mono">hoisting-visualizer.js</span>
          </div>
          <div className="p-6">
            <HoistingVisualizer />
          </div>
        </div>
      </Section>

      {/* ── 7. EXPERIMENTS ────────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading emoji="🧪" title="Try Karo — Ye Experiments Karo!" subtitle="Specific scenarios test karo" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Experiment 1: var vs let',
              steps: [
                'Example 1 chuno',
                'Step karo Phase 1 tak',
                'varX dekho — undefined (ghost)',
                'letY dekho — TDZ (red danger zone)',
              ],
              insight: 'var "ghost" form mein hota hai — exists but undefined. let "blocked" form mein — exists but inaccessible. Ye ek crucial difference hai!',
              color: '#F59E0B',
              emoji: '👻',
            },
            {
              title: 'Experiment 2: Function Declaration Magic',
              steps: [
                'Example 1 chuno',
                'Phase 1 mein greet function dekho',
                'Ye fully hoisted hai — body bhi!',
                'greet() call ho sakti hai pehle line pe',
              ],
              insight: 'Function declarations fully hoisted hain — BEFORE code runs. Ye isliye hai kyunki JS engine pehle functions register karta hai utilities ke roop mein.',
              color: '#7C3AED',
              emoji: '🪄',
            },
            {
              title: 'Experiment 3: Function Expression Trap',
              steps: [
                'Example 2 chuno',
                'sayBye execution Phase 1 mein dekho',
                'var sayBye = undefined (hoisted)',
                'sayBye() call error kyun deta hai?',
              ],
              insight: 'Function expression (var fn = function(){}) mein sirf var hoisted hota hai — function value nahi. Isliye calling before declaration TypeError deta hai.',
              color: '#EF4444',
              emoji: '🚨',
            },
          ].map((exp) => (
            <div key={exp.title} className={`${glassCard} border`} style={{ ...glassCardBg, borderColor: `${exp.color}40` }}>
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
        <SectionHeading emoji="🎯" title="Key Takeaways — Ye 3 Cheezein Yaad Rakhna!" subtitle="Hoisting ke baare mein sabse important points" />
        <div className="space-y-4">
          {[
            {
              n: '1',
              bold: 'var hoisted + undefined, let/const hoisted + TDZ',
              rest: '— Dono hoist hote hain, lekin differently. var safely undefined as placeholder, let/const TDZ mein hain — access karo toh ReferenceError. Isliye var se bugs zyada aate hain aur let/const safer hain.',
              color: '#F59E0B',
            },
            {
              n: '2',
              bold: 'Function declarations FULLY hoisted hain',
              rest: '— Naam aur body dono. Isliye function ko declare karne se pehle call kar sakte ho. Ye convenient hai lekin function expression ke saath nahi hota — common interview question!',
              color: '#7C3AED',
            },
            {
              n: '3',
              bold: 'Best practice: hamesha declare karo use karne se pehle',
              rest: '— Hoisting pe rely mat karo — confusing code hota hai. let/const use karo (var avoid karo), aur variables/functions ko use karne se pehle declare karo. Ye readable aur predictable code create karta hai.',
              color: '#10B981',
            },
          ].map((t) => (
            <div key={t.n} className="flex items-start gap-4 rounded-2xl border p-5" style={{ background: `${t.color}08`, borderColor: `${t.color}30` }}>
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
              wrong: 'Hoisting matlab code literally upar move ho jaata hai',
              right: 'Code move nahi hota — sirf declarations memory mein register hoti hain creation phase mein. Source code wahi rehta hai. JS engine 2-phase mein process karta hai — code literally nahi hilta.',
            },
            {
              wrong: 'let aur const hoist nahi hote',
              right: "let aur const bhi hoist hote hain — sirf TDZ mein initialize hote hain (undefined ke bajaaye). Isliye ReferenceError aata hai 'undefined' nahi — variable 'exists' hai lekin accessible nahi hai.",
            },
            {
              wrong: 'typeof check se TDZ crash avoid ho sakta hai',
              right: 'typeof normally undeclared variables ke liye safe hai — lekin TDZ mein let/const ke saath typeof bhi ReferenceError throw karta hai. Ye ek gotcha hai!',
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
        <SectionHeading emoji="💻" title="Hoisting Quiz — Output Kya Hoga?" subtitle="Interview mein ye questions aate hain — practice karo" />
        <div className={glassCard} style={glassCardBg}>
          <pre className="rounded-xl p-5 overflow-x-auto text-xs leading-relaxed font-mono border border-[rgba(255,255,255,0.06)]" style={{ background: 'rgba(10,10,15,0.8)', color: '#A1A1AA' }}>
            <code className="whitespace-pre">{HOISTING_QUIZ}</code>
          </pre>
        </div>
      </Section>

      {/* ── 11. NEXT STEPS ────────────────────────────────────────────────── */}
      <Section className="pt-6 pb-16">
        <SectionHeading emoji="🚀" title="Next Steps — Aage Kya Seekhna Hai?" subtitle="Hoisting samajh gaya? Ab ye karo" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            href="/course/hoisting"
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
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-1">Hoisting Deep Dive</h3>
            <p className="text-sm text-[#A1A1AA]">Classes aur modules mein hoisting, strict mode behavior, real-world best practices.</p>
          </Link>

          <Link
            href="/visualizations/js-closures"
            className="group block rounded-2xl border border-[rgba(6,182,212,0.3)] p-6 transition-all hover:border-[rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]"
            style={{ background: 'rgba(6,182,212,0.07)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🪆</span>
                <span className="text-xs font-mono text-[#06B6D4] uppercase tracking-widest">Next Visualization</span>
              </div>
              <span className="text-[#71717A] text-xl group-hover:text-[#06B6D4] transition-colors">→</span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-1">Scope &amp; Closures Dekho</h3>
            <p className="text-sm text-[#A1A1AA]">Hoisting scope ke saath connect hota hai — closures ka next step hai!</p>
          </Link>
        </div>
      </Section>
    </div>
  )
}
