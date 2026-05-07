import Link from 'next/link'
import ThisBindingVisualizer from '@/components/visualizations/ThisBindingVisualizer'

export const metadata = {
  title: 'this Binding Visualizer — NodeMaster',
  description:
    "JavaScript ka sabse confusing concept — 'this'. 4 binding rules animated dekho: Default, Implicit, Explicit, Arrow. Interview-ready concept.",
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

const THIS_FIX_CODE = `// Common bug — lost this binding
class Timer {
  constructor() {
    this.count = 0;
  }

  // ❌ BUG: 'this' lost in setTimeout callback
  startBuggy() {
    setTimeout(function() {
      this.count++; // this = undefined or global!
      console.log(this.count); // NaN or error
    }, 1000);
  }

  // ✓ FIX 1: Arrow function (inherits this)
  startFixed1() {
    setTimeout(() => {
      this.count++; // this = Timer instance ✓
      console.log(this.count);
    }, 1000);
  }

  // ✓ FIX 2: .bind(this)
  startFixed2() {
    setTimeout(function() {
      this.count++;
      console.log(this.count);
    }.bind(this), 1000); // explicitly bind ✓
  }

  // ✓ FIX 3: Save reference
  startFixed3() {
    const self = this; // old school style
    setTimeout(function() {
      self.count++;
      console.log(self.count);
    }, 1000);
  }
}`

export default function JsThisBindingPage() {
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
            <span className="text-[#A1A1AA]">this Binding</span>
          </nav>
          <div className="flex items-start gap-4 mb-2">
            <span className="text-4xl">🦎</span>
            <div>
              <h1 className="text-4xl font-bold text-[#F5F5F7] leading-tight">
                <code className="text-[#7C3AED]">this</code> Binding Visualizer
              </h1>
              <p className="text-[#A1A1AA] text-lg mt-2">
                JavaScript ka sabse confusing concept — 4 rules visually samjho.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <Badge color="#F59E0B">⚡ Intermediate</Badge>
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
          title="Pehle Samjho — this Kyun Confusing Hai?"
          subtitle="'Why is this undefined here?!' — every developer has asked this"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className={glassCard} style={glassCardBg}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">😱</span>
              <h3 className="font-bold text-[#EF4444]">The Classic Bug</h3>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-3">
              Ye code sab beginners likhte hain — aur phir confuse hote hain jab{' '}
              <code className="text-[#EF4444] bg-[rgba(239,68,68,0.1)] px-1.5 py-0.5 rounded text-xs">this</code>{' '}
              undefined hota hai ya wrong value deta hai.
            </p>
            <div className="rounded-lg p-3 border border-[rgba(239,68,68,0.2)] font-mono text-xs" style={{ background: 'rgba(239,68,68,0.06)' }}>
              <p className="text-[#71717A]">{'// Inside a class method:'}</p>
              <p className="text-[#EF4444]">{'setTimeout(function() {'}</p>
              <p className="text-[#EF4444] ml-2">{'this.count++; // ❌ undefined!'}</p>
              <p className="text-[#EF4444]">{'}, 1000);'}</p>
            </div>
          </div>
          <div className={glassCard} style={glassCardBg}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🎯</span>
              <h3 className="font-bold text-[#10B981]">The Core Rule</h3>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-3">
              <code className="text-[#7C3AED] bg-[rgba(124,58,237,0.1)] px-1.5 py-0.5 rounded text-xs">this</code>{' '}
              ka value decide hota hai{' '}
              <strong className="text-[#F5F5F7]">CALL SITE pe — definition site pe nahi</strong>{' '}
              (arrow functions ko chhodkar). Yani jis tarike se function call hoti hai — us hisaab se{' '}
              <code className="text-[#7C3AED] bg-[rgba(124,58,237,0.1)] px-1.5 py-0.5 rounded text-xs">this</code>{' '}
              decide hoti hai.
            </p>
            <div className="rounded-lg p-3 border border-[rgba(16,185,129,0.2)] font-mono text-xs" style={{ background: 'rgba(16,185,129,0.06)' }}>
              <p className="text-[#71717A]">{'// Fix: arrow function (lexical this)'}</p>
              <p className="text-[#10B981]">{'setTimeout(() => {'}</p>
              <p className="text-[#10B981] ml-2">{'this.count++; // ✓ class instance!'}</p>
              <p className="text-[#10B981]">{'}, 1000);'}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-[rgba(245,158,11,0.3)] p-5" style={{ background: 'rgba(245,158,11,0.07)' }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">⚡</span>
            <div>
              <h3 className="font-bold text-[#F59E0B] mb-1">Interview Gold — 4 Rules Yaad Karo</h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                this binding ke sirf 4 rules hain — in order: <strong className="text-[#F5F5F7]">new &gt; explicit (.call/.apply/.bind) &gt; implicit (obj.fn()) &gt; default (plain fn())</strong>.
                Arrow functions ka apna this nahi hota — wo lexical scope ka this use karte hain.
                Ye rule yaad hai toh koi bhi this bug instantly fix ho sakta hai.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 3. ANALOGY ────────────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="🦎"
          title="Real-World Analogy — Chameleon"
          subtitle="this changes color (context) based on how it's called, not where defined"
        />
        <div className={glassCard} style={glassCardBg}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {[
              {
                emoji: '🏠',
                title: 'Chameleon at Home (Default)',
                color: '#A1A1AA',
                desc: 'Ghar pe free hai — koi context nahi, toh apni natural color (global). Strict mode mein — color hi nahi (undefined).',
                code: 'fn() → this = global/undefined',
              },
              {
                emoji: '🌿',
                title: 'Chameleon on a Leaf (Implicit)',
                color: '#06B6D4',
                desc: 'Jis object (leaf) pe baithega — uski color le leta hai. Object.method() call — chameleon object ki color mein!',
                code: 'obj.fn() → this = obj',
              },
              {
                emoji: '🎨',
                title: 'Forced Color (Explicit)',
                color: '#7C3AED',
                desc: 'Koi force karke rang deta hai — .call/.apply/.bind. Chameleon ka natural behavior override ho jaata hai.',
                code: 'fn.call(obj) → this = obj',
              },
              {
                emoji: '🔒',
                title: 'Arrow — Fixed Color',
                color: '#F59E0B',
                desc: 'Arrow chameleon ki special species hai — janam ke time ka color hamesha ke liye fix ho jaata hai. Change nahi hota!',
                code: '() => ... → this = outer scope (fixed)',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border p-4" style={{ background: `${item.color}08`, borderColor: `${item.color}30` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="font-semibold text-sm" style={{ color: item.color }}>{item.title}</span>
                </div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-2">{item.desc}</p>
                <code className="text-[10px] font-mono" style={{ color: item.color }}>{item.code}</code>
              </div>
            ))}
          </div>
          <p className="rounded-xl p-3 border text-sm text-[#F5F5F7] font-medium" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}>
            💡 <strong>Key insight:</strong> Regular functions mein this = call site pe depend karta hai. Arrow functions mein this = definition site pe depend karta hai (outer scope). Ye ek fundamental difference hai!
          </p>
        </div>
      </Section>

      {/* ── 4. COLOR LEGEND ───────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading emoji="🎨" title="Element Legend — Visualization Mein Kya Kya Hai?" subtitle="Tabs aur elements samjho shuru karne se pehle" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { color: '#A1A1AA', label: 'Gray — Default Binding', desc: 'Plain function call. this = global (non-strict) ya undefined (strict mode).' },
            { color: '#06B6D4', label: 'Cyan — Implicit Binding', desc: 'Method call via object. this = object to the left of the dot.' },
            { color: '#7C3AED', label: 'Purple — Explicit Binding', desc: '.call/.apply/.bind — tu koi bhi object this ke roop mein pass kar sakta hai.' },
            { color: '#F59E0B', label: 'Amber — Arrow Functions', desc: 'Lexical this — inherited from enclosing scope. No own this.' },
            { color: '#10B981', label: 'Green arrow → Found', desc: 'this is pointing to this object — lookup successful.' },
            { color: '#EF4444', label: 'Red — Undefined/Error', desc: 'this is undefined (strict mode) ya wrong — bug scenario.' },
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
        <SectionHeading emoji="📋" title="Step-by-Step — Kaise Use Karein?" subtitle="In steps ko follow karo maximum learning ke liye" />
        <div className={glassCard} style={glassCardBg}>
          <div className="space-y-4">
            {[
              { n: '01', action: '"Default Binding" tab se shuru karo', detail: 'Sabse simple case. Dekho this arrow kahan point karta hai plain function call mein.', color: '#A1A1AA' },
              { n: '02', action: 'Call buttons click karo', detail: 'Har tab pe numbered call buttons hain. Click karke watch the this arrow animate to different objects.', color: '#06B6D4' },
              { n: '03', action: '"Implicit Binding" tab try karo', detail: '"user.greet()" call karo — this = user. Phir "const fn = user.greet; fn()" — lost binding bug dekho!', color: '#7C3AED' },
              { n: '04', action: '"Explicit Binding" tab dekho', detail: '.call, .apply, .bind ke buttons hain. Dekho kaise same function alag alag objects ke saath call ho sakti hai.', color: '#10B981' },
              { n: '05', action: '"Arrow" tab — sabse important', detail: 'Arrow vs regular function compare karo. Arrow ka this outer scope se aata hai — hamesha!', color: '#F59E0B' },
              { n: '06', action: 'Priority order read karo', detail: 'Right panel mein 1-4 priority order dikhta hai. Ye rule sab this bugs debug karne mein help karta hai.', color: '#EF4444' },
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
        <SectionHeading emoji="🎮" title="Visualization — Khelo Aur Seekho!" subtitle="Neeche diye controls se interact karo" />
        <div className="rounded-2xl border overflow-hidden" style={{ background: 'rgba(18,18,26,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="ml-2 text-sm text-[#71717A] font-mono">this-binding-visualizer.js</span>
          </div>
          <div className="p-6">
            <ThisBindingVisualizer />
          </div>
        </div>
      </Section>

      {/* ── 7. EXPERIMENTS ────────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading emoji="🧪" title="Try Karo — Ye Experiments Karo!" subtitle="Specific scenarios test karo" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Experiment 1: Lost Binding',
              steps: [
                '"Implicit Binding" tab chuno',
                '"user.greet()" call karo — this = user ✓',
                'Phir "const fn = user.greet; fn()" call karo',
                'Dekho this kahan jaati hai!',
              ],
              insight: 'Ye sabse common this bug hai — method ko variable mein store karo aur context kho jaata hai. .bind() ya arrow se fix karo.',
              color: '#EF4444',
              emoji: '🚨',
            },
            {
              title: 'Experiment 2: call vs apply vs bind',
              steps: [
                '"Explicit Binding" tab chuno',
                'Teenon options try karo — call, apply, bind',
                'Dekho different objects pe this point karta hai',
                'bind hard-binds — baar baar call kar sakte ho',
              ],
              insight: 'call aur apply ek baar call karte hain, bind ek naya function return karta hai jo hamesha same this se call hogi.',
              color: '#7C3AED',
              emoji: '🎯',
            },
            {
              title: 'Experiment 3: Arrow in class',
              steps: [
                '"Arrow" tab chuno',
                '"obj.arrow()" call karo — unexpected result!',
                'Phir "obj.regular()" call karo — correct!',
                'Fark samjho — arrow ka this outer scope hai',
              ],
              insight: 'Class mein arrow method as property assign karte hain (this bound) — method shorthand mein regular function hoti hai. Dono ka this behavior alag hota hai!',
              color: '#F59E0B',
              emoji: '➡️',
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
        <SectionHeading emoji="🎯" title="Key Takeaways — Ye 3 Cheezein Yaad Rakhna!" subtitle="this ke baare mein agar teen cheezein yaad ho toh ye teen hain" />
        <div className="space-y-4">
          {[
            {
              n: '1',
              bold: 'this = CALL SITE se determine hota hai (definition site se nahi)',
              rest: '— Regular functions mein this depend karta hai kaise call ki gayi hai function. Ye rule alag alag tarike se call karne pe change ho jaati hai. Arrow functions exception hain.',
              color: '#06B6D4',
            },
            {
              n: '2',
              bold: 'Arrow functions ka apna this nahi hota — outer scope se inherit hoti hai',
              rest: '— Ye "lexical this" hai. Arrow functions mein .call/.apply/.bind bhi this change nahi kar sakti. Class mein setTimeout callback ke liye arrow use karo — "lost binding" bug automatically fix!',
              color: '#F59E0B',
            },
            {
              n: '3',
              bold: 'Priority: new > explicit > implicit > default',
              rest: '— Ye ek decision tree hai. Koi bhi this bug dekho — pehle identify karo konsa rule apply ho raha hai. 90% cases mein implicit binding lost ho rahi hoti hai — arrow ya .bind() se fix karo.',
              color: '#7C3AED',
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
              wrong: 'Arrow function mein this = undefined hota hai',
              right: 'Arrow function mein this = outer scope ka this hota hai — undefined nahi. Lekin outer scope ka this undefined ho sakta hai (e.g., top-level non-method code mein strict mode).',
            },
            {
              wrong: '.bind() function ko immediately call karta hai',
              right: '.bind() ek naya function return karta hai — call nahi karta. Returned function ko separately call karna padta hai. .call() aur .apply() immediately call karte hain.',
            },
            {
              wrong: 'Class methods mein this hamesha class instance hota hai',
              right: 'Sirf tab jab method class instance pe call ho: instance.method(). Agar destructure karo (const {method} = instance; method()) ya callback mein pass karo — this lost ho jaata hai!',
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
        <SectionHeading emoji="💻" title="Real Code — Timer Bug Aur 3 Fixes" subtitle="Ye pattern production code mein bahut common hai" />
        <div className={glassCard} style={glassCardBg}>
          <pre className="rounded-xl p-5 overflow-x-auto text-xs leading-relaxed font-mono border border-[rgba(255,255,255,0.06)]" style={{ background: 'rgba(10,10,15,0.8)', color: '#A1A1AA' }}>
            <code className="whitespace-pre">{THIS_FIX_CODE}</code>
          </pre>
        </div>
      </Section>

      {/* ── 11. NEXT STEPS ────────────────────────────────────────────────── */}
      <Section className="pt-6 pb-16">
        <SectionHeading emoji="🚀" title="Next Steps — Aage Kya Seekhna Hai?" subtitle="this samajh gaya? Ab ye karo" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            href="/course/this-binding"
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
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-1">this Binding Deep Dive</h3>
            <p className="text-sm text-[#A1A1AA]">new binding, getter/setter this, globalThis, aur real-world patterns.</p>
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
            <p className="text-sm text-[#A1A1AA]">this aur prototype — dono milke JavaScript OOP ka base hain. Next step!</p>
          </Link>
        </div>
      </Section>
    </div>
  )
}
