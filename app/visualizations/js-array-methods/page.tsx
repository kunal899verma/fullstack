import Link from 'next/link'
import ArrayMethodsVisualizer from '@/components/visualizations/ArrayMethodsVisualizer'

export const metadata = {
  title: 'Array Methods Visualizer — NodeMaster',
  description:
    'map, filter, reduce — JS ke 3 sabse powerful array methods animated dekho. Har item ka transformation step-by-step.',
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

const REAL_WORLD_CODE = `// Real-world: User data transformation
const users = [
  { id: 1, name: 'Rahul', age: 25, active: true, salary: 50000 },
  { id: 2, name: 'Priya', age: 30, active: false, salary: 70000 },
  { id: 3, name: 'Ankit', age: 22, active: true, salary: 45000 },
  { id: 4, name: 'Sneha', age: 28, active: true, salary: 60000 },
];

// MAP: Extract just names
const names = users.map(u => u.name);
// → ['Rahul', 'Priya', 'Ankit', 'Sneha']

// FILTER: Only active users
const activeUsers = users.filter(u => u.active);
// → [{Rahul}, {Ankit}, {Sneha}]

// REDUCE: Total salary of active users
const totalSalary = users
  .filter(u => u.active)
  .reduce((total, u) => total + u.salary, 0);
// → 155000

// CHAINING: Active users names only
const activeNames = users
  .filter(u => u.active)
  .map(u => u.name);
// → ['Rahul', 'Ankit', 'Sneha']`

export default function JsArrayMethodsPage() {
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
            <span className="text-[#A1A1AA]">Array Methods</span>
          </nav>
          <div className="flex items-start gap-4 mb-2">
            <span className="text-4xl">🏭</span>
            <div>
              <h1 className="text-4xl font-bold text-[#F5F5F7] leading-tight">
                Array Methods Visualizer
              </h1>
              <p className="text-[#A1A1AA] text-lg mt-2">
                map, filter, reduce — animated dekho har item kaise transform hota hai.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <Badge color="#10B981">Beginner</Badge>
                <Badge color="#06B6D4">⏱ 10 min</Badge>
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
          subtitle="map, filter, reduce milke 80% data transformation problems solve karte hain"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              emoji: '🗺️',
              title: '.map() — Transformer',
              color: '#7C3AED',
              problem: 'Har item ko transform karna ho',
              example: '[1,2,3].map(x => x*2) → [2,4,6]',
              note: 'HAMESHA same length ka new array return karta hai',
            },
            {
              emoji: '🔍',
              title: '.filter() — Gate Keeper',
              color: '#10B981',
              problem: 'Kuch items rakhne aur kuch hatane ho',
              example: '[1,2,3,4].filter(x => x%2===0) → [2,4]',
              note: 'Sirf passing items ka new array return karta hai',
            },
            {
              emoji: '🔧',
              title: '.reduce() — Accumulator',
              color: '#F59E0B',
              problem: 'Array se ek single value banana ho',
              example: '[1,2,3,4,5].reduce((acc,x) => acc+x, 0) → 15',
              note: 'Sabse powerful — kuch bhi return kar sakta hai',
            },
          ].map((item) => (
            <div key={item.title} className={glassCard} style={glassCardBg}>
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-bold text-base mb-2" style={{ color: item.color }}>{item.title}</h3>
              <p className="text-xs text-[#71717A] mb-3"><strong className="text-[#A1A1AA]">When to use:</strong> {item.problem}</p>
              <div className="rounded-lg p-2.5 font-mono text-xs mb-3" style={{ background: `${item.color}10`, border: `1px solid ${item.color}30` }}>
                <span style={{ color: item.color }}>{item.example}</span>
              </div>
              <p className="text-xs text-[#71717A]">⚡ {item.note}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-5 rounded-2xl border border-[rgba(245,158,11,0.3)] p-5"
          style={{ background: 'rgba(245,158,11,0.07)' }}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">💡</span>
            <div>
              <h3 className="font-bold text-[#F59E0B] mb-1">Hinglish Mein Samjho</h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                <strong className="text-[#F5F5F7]">map, filter, reduce — ye 3 methods milke 80% of data transformation problems solve karte hain.</strong>{' '}
                Sikhne ke baad for loops bahut kam likhoge. Ye methods{' '}
                <strong className="text-[#F5F5F7]">non-mutating</strong> hain — original array ko kabhi nahi badelte (reduce ke result ko chhodke).
                Aur sab chaining ke saath use ho sakte hain:{' '}
                <code className="text-[#F59E0B] bg-[rgba(245,158,11,0.1)] px-1.5 py-0.5 rounded text-xs">arr.filter(...).map(...).reduce(...)</code>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 3. ANALOGY ────────────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🏭"
          title="Real-World Analogy — Factory Assembly Line"
          subtitle="Array methods ko ek manufacturing line ki tarah socho"
        />
        <div className={glassCard} style={glassCardBg}>
          <div className="flex items-center justify-between gap-2 flex-wrap mb-6">
            {[
              { emoji: '📦', label: 'Raw Input', sub: 'Original Array\n[1,2,3,4,5]', color: '#A1A1AA' },
              { emoji: '══➤', label: '', sub: '', color: '#71717A', isArrow: true },
              { emoji: '🗺️', label: '.map()', sub: 'Transforms each\nitem (conveyor)', color: '#7C3AED' },
              { emoji: '══➤', label: '', sub: '', color: '#71717A', isArrow: true },
              { emoji: '🔍', label: '.filter()', sub: 'Quality check\n(reject/accept)', color: '#10B981' },
              { emoji: '══➤', label: '', sub: '', color: '#71717A', isArrow: true },
              { emoji: '🔧', label: '.reduce()', sub: 'Final assembly\n(one result)', color: '#F59E0B' },
              { emoji: '══➤', label: '', sub: '', color: '#71717A', isArrow: true },
              { emoji: '✅', label: 'Output', sub: 'New value\n(original safe)', color: '#10B981' },
            ].map((item, i) =>
              item.isArrow ? (
                <span key={i} className="text-xl text-[#71717A] hidden sm:block">==&gt;</span>
              ) : (
                <div key={i} className="flex flex-col items-center gap-1 text-center min-w-[70px]">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border"
                    style={{ background: `${item.color}18`, borderColor: `${item.color}44`, boxShadow: `0 0 12px ${item.color}22` }}
                  >
                    {item.emoji}
                  </div>
                  <span className="text-xs font-bold" style={{ color: item.color }}>{item.label}</span>
                  <span className="text-[10px] text-[#71717A] whitespace-pre-line leading-tight">{item.sub}</span>
                </div>
              )
            )}
          </div>
          <p className="mt-2 text-sm text-[#F5F5F7] font-medium rounded-xl p-3 border border-[rgba(16,185,129,0.2)]" style={{ background: 'rgba(16,185,129,0.06)' }}>
            💡 <strong>Key insight:</strong> Factory mein raw material enter karta hai → different machines se guzarta hai → final product aata hai. Original raw material wahi rehta hai. Aur ye sab chain kiya ja sakta hai!
          </p>
        </div>
      </Section>

      {/* ── 4. COLOR LEGEND ───────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🗺️"
          title="Element Legend — Visualization Mein Kya Kya Hai?"
          subtitle="Shuru karne se pehle ye samjho"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { color: '#7C3AED', label: '.map() — Purple', desc: 'Input item purple glow se highlight hota hai, output purple box mein appear hota hai.' },
            { color: '#10B981', label: '.filter() — Green ✓', desc: 'Items jo condition pass karte hain green ho jaate hain, output mein jaate hain.' },
            { color: '#EF4444', label: 'Red ✗ — filtered out', desc: 'Items jo condition fail karte hain red aur fade ho jaate hain — output mein nahi jaate.' },
            { color: '#F59E0B', label: '.reduce() — Amber', desc: 'Accumulator box amber mein update hota rehta hai har step pe.' },
            { color: '#06B6D4', label: 'Blue boxes — Input array', desc: 'Original array items — hamesha unchanged rehte hain.' },
            { color: '#A1A1AA', label: 'Scale animation', desc: 'Active item slightly bada hota hai — yahi currently process ho raha hai.' },
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

      {/* ── 5. INSTRUCTIONS ───────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="📋"
          title="Step-by-Step — Kaise Use Karein?"
          subtitle="Follow karo ye steps visualization mein"
        />
        <div className={glassCard} style={glassCardBg}>
          <div className="space-y-4">
            {[
              { n: '01', action: 'MAP tab se shuru karo', detail: 'Default "x => x * 2" selected hai. Run All dabao aur dekho har item double kaise hota hai.', color: '#7C3AED' },
              { n: '02', action: 'Step mode use karo', detail: '"Step →" button se ek ek item ko process hote dekho. Beginner ke liye ye best hai.', color: '#06B6D4' },
              { n: '03', action: 'FILTER tab try karo', detail: '"x => x % 2 === 0" select karo. Dekho red items fail hote hain aur green items output mein jaate hain.', color: '#10B981' },
              { n: '04', action: 'REDUCE tab try karo', detail: '"(acc, x) => acc + x" select karo. Amber accumulator box dekho kaise build up hota hai.', color: '#F59E0B' },
              { n: '05', action: 'Different operations try karo', detail: 'Har method ke liye multiple operations hain — sabke code snippets neeche dikhen hain.', color: '#A1A1AA' },
              { n: '06', action: 'Speed adjust karo', detail: 'Slow speed pe rakho pehle — har step clearly dikhega. Phir fast karo confident hone ke baad.', color: '#EF4444' },
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
        <SectionHeading emoji="🎮" title="Visualization — Khelo Aur Seekho!" subtitle="Neeche diye gaye controls use karo" />
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ background: 'rgba(18,18,26,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="ml-2 text-sm text-[#71717A] font-mono">array-methods-visualizer.js</span>
          </div>
          <div className="p-6">
            <ArrayMethodsVisualizer />
          </div>
        </div>
      </Section>

      {/* ── 7. EXPERIMENTS ────────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading emoji="🧪" title="Try Karo — Ye Experiments Karo!" subtitle="Specific cheezein try karo ye samjhne ke liye" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Experiment 1: map vs for loop',
              steps: [
                'MAP tab → "x => x * 2" select karo',
                '"Run All" dabao — speed slow rakho',
                'Ye exactly for loop ki jagah use hota hai',
                'Fark: map new array banata hai, original safe!',
              ],
              insight: 'map non-destructive hai — original array kabhi change nahi hota. Ye functional programming ka core principle hai.',
              color: '#7C3AED',
              emoji: '🗺️',
            },
            {
              title: 'Experiment 2: filter chain',
              steps: [
                'FILTER tab → "x => x > 2" select karo',
                'Run karo — dekho kaunse fail hote hain',
                'Phir "x => x % 2 === 0" try karo',
                'Real code: users.filter(u => u.active)',
              ],
              insight: 'filter ke baad map chain karo: arr.filter(...).map(...) — ye ek common pattern hai user data process karne ka.',
              color: '#10B981',
              emoji: '🔍',
            },
            {
              title: 'Experiment 3: reduce power',
              steps: [
                'REDUCE tab → "sum" select karo',
                'Step mode mein dekho accumulator build hota',
                'Initial value 0 se shuru hoti hai',
                'Phir "max" try karo — woh bhi reduce hai!',
              ],
              insight: 'reduce sirf sum ke liye nahi — koi bhi transformation possible hai. Group by, flatten, unique values — sab reduce se ho sakta hai.',
              color: '#F59E0B',
              emoji: '🔧',
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
        <SectionHeading emoji="🎯" title="Key Takeaways — Ye 3 Cheezein Yaad Rakhna!" subtitle="Page band karne ke baad bhi ye yaad rahega" />
        <div className="space-y-4">
          {[
            {
              n: '1',
              bold: 'map aur filter hamesha new array return karte hain',
              rest: '— original array kabhi nahi badalta. Ye non-mutating behavior bahut important hai — safe code likhne ke liye. reduce ek single value return karta hai (jo array bhi ho sakti hai).',
              color: '#7C3AED',
            },
            {
              n: '2',
              bold: 'Chaining powerful hai: arr.filter().map().reduce()',
              rest: '— teen methods chain karo ek line mein. Ye readable, declarative code hai jo exactly batata hai kya ho raha hai. for loops se zyada expressive aur less error-prone.',
              color: '#10B981',
            },
            {
              n: '3',
              bold: 'reduce sabse powerful hai — lekin map/filter prefer karo jab possible ho',
              rest: '— reduce kuch bhi kar sakta hai (map aur filter bhi reduce se implement ho sakte hain). Lekin readability ke liye specific method use karo — code self-documenting hota hai.',
              color: '#F59E0B',
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
              wrong: 'forEach bhi map ki tarah kaam karta hai',
              right: 'forEach kuch return nahi karta — sirf side effects ke liye. map new array return karta hai. forEach ke saath chaining nahi ho sakti. Modern code mein forEach kam hi use hota hai.',
            },
            {
              wrong: 'map aur filter original array ko modify karte hain',
              right: 'Nahi! Dono new array return karte hain — original safe rehta hai. Ye immutability ka principle hai. Agar modify karna ho toh splice/push use karo — lekin usually avoid karo.',
            },
            {
              wrong: 'reduce sirf numbers ke liye hai — sum/average',
              right: 'reduce kisi bhi type ki value return kar sakta hai — string, object, array, boolean. groupBy object, flat array, unique values — sab reduce se possible hai. Ye ek Swiss Army knife hai.',
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
        <SectionHeading emoji="💻" title="Real Code Dekho — Production Pattern" subtitle="Ye patterns actual projects mein use hote hain" />
        <div className={glassCard} style={glassCardBg}>
          <pre className="rounded-xl p-5 overflow-x-auto text-xs leading-relaxed font-mono border border-[rgba(255,255,255,0.06)]" style={{ background: 'rgba(10,10,15,0.8)', color: '#A1A1AA' }}>
            <code className="whitespace-pre">{REAL_WORLD_CODE}</code>
          </pre>
        </div>
      </Section>

      {/* ── 11. NEXT STEPS ────────────────────────────────────────────────── */}
      <Section className="pt-6 pb-16">
        <SectionHeading emoji="🚀" title="Next Steps — Aage Kya Seekhna Hai?" subtitle="Array methods samajh gaye? Ab ye karo" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            href="/course/array-methods"
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
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-1">Array Methods Deep Dive</h3>
            <p className="text-sm text-[#A1A1AA]">flatMap, find, findIndex, every, some, sort — sab covered with real examples.</p>
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
            <p className="text-sm text-[#A1A1AA]">Classic loop bug aur closure counter — scope chain ka animated visualization.</p>
          </Link>
        </div>
      </Section>
    </div>
  )
}
