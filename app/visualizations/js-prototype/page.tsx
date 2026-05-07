import Link from 'next/link'
import PrototypeChainVisualizer from '@/components/visualizations/PrototypeChainVisualizer'

export const metadata = {
  title: 'Prototype Chain Visualizer — NodeMaster',
  description:
    "JavaScript ka secret inheritance mechanism — prototype chain animated dekho. Dog → Animal → Object → null. Property lookup step by step trace karo.",
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

const PROTOTYPE_CODE = `// How prototype chain actually works under the hood

class Animal {
  breathe() { return 'breathing...'; }
}

class Dog extends Animal {
  constructor(name) {
    super(); // calls Animal constructor
    this.name = name;
  }
  speak() { return 'Woof!'; }
}

const dog = new Dog('Rex');

// Prototype chain:
Object.getPrototypeOf(dog) === Dog.prototype;        // true
Object.getPrototypeOf(Dog.prototype) === Animal.prototype; // true
Object.getPrototypeOf(Animal.prototype) === Object.prototype; // true
Object.getPrototypeOf(Object.prototype) === null;    // true — chain ends!

// Property lookup (what JS engine does internally):
dog.speak();   // 1. Check dog own props → not found
               // 2. Check Dog.prototype → FOUND! ✓
dog.breathe(); // 1. Check dog own props → not found
               // 2. Check Dog.prototype → not found
               // 3. Check Animal.prototype → FOUND! ✓
dog.fly;       // Goes through entire chain → not found → undefined

// instanceof check:
dog instanceof Dog;    // true (Dog.prototype in chain)
dog instanceof Animal; // true (Animal.prototype in chain)
dog instanceof Object; // true (Object.prototype in chain)

// hasOwnProperty:
dog.hasOwnProperty('name');  // true (own property)
dog.hasOwnProperty('speak'); // false (inherited from Dog.prototype)`

export default function JsPrototypePage() {
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
            <span className="text-[#A1A1AA]">Prototype Chain</span>
          </nav>
          <div className="flex items-start gap-4 mb-2">
            <span className="text-4xl">🔗</span>
            <div>
              <h1 className="text-4xl font-bold text-[#F5F5F7] leading-tight">
                Prototype Chain Visualizer
              </h1>
              <p className="text-[#A1A1AA] text-lg mt-2">
                JavaScript ka secret inheritance mechanism — every object has a hidden link to another object.
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
          title="Pehle Samjho — Prototype Chain Kyun Important Hai?"
          subtitle="Every JavaScript object has a secret link to another object"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className={glassCard} style={glassCardBg}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔍</span>
              <h3 className="font-bold text-[#06B6D4]">Property Lookup Mystery</h3>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-3">
              Aapne kabhi socha hai{' '}
              <code className="text-[#06B6D4] bg-[rgba(6,182,212,0.1)] px-1.5 py-0.5 rounded text-xs">
                [].push()
              </code>{' '}
              ya{' '}
              <code className="text-[#06B6D4] bg-[rgba(6,182,212,0.1)] px-1.5 py-0.5 rounded text-xs">
                {'"hello".toUpperCase()'}
              </code>{' '}
              kaise kaam karta hai? Array pe push defined nahi hai — phir bhi kaam karta hai kyunki ye{' '}
              <strong className="text-[#F5F5F7]">prototype chain</strong>{' '}
              mein milta hai!
            </p>
            <div className="rounded-lg p-3 border border-[rgba(6,182,212,0.2)] font-mono text-xs" style={{ background: 'rgba(6,182,212,0.06)' }}>
              <p className="text-[#71717A]">{'// push defined nahi hai on [] directly'}</p>
              <p className="text-[#06B6D4]">[].push(4); {'// works!'}</p>
              <p className="text-[#71717A] mt-1">{'// JS engine: [] → Array.prototype → Object.prototype'}</p>
              <p className="text-[#71717A]">{'// Array.prototype.push mila → execute!'}</p>
            </div>
          </div>
          <div className={glassCard} style={glassCardBg}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔗</span>
              <h3 className="font-bold text-[#7C3AED]">[[Prototype]] Link</h3>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-3">
              Har JS object mein ek hidden property hoti hai{' '}
              <code className="text-[#7C3AED] bg-[rgba(124,58,237,0.1)] px-1.5 py-0.5 rounded text-xs">
                [[Prototype]]
              </code>{' '}
              — jo ek aur object ko point karti hai. Ye chain tab tak chalta hai jab tak{' '}
              <code className="text-[#F59E0B] bg-[rgba(245,158,11,0.1)] px-1.5 py-0.5 rounded text-xs">
                null
              </code>{' '}
              na mile.
            </p>
            <div className="rounded-lg p-3 border border-[rgba(124,58,237,0.2)] font-mono text-xs" style={{ background: 'rgba(124,58,237,0.06)' }}>
              <p className="text-[#06B6D4]">dog</p>
              <p className="text-[#71717A] ml-2">{'→ [[Prototype]]: Dog.prototype'}</p>
              <p className="text-[#7C3AED] ml-4">{'→ [[Prototype]]: Animal.prototype'}</p>
              <p className="text-[#10B981] ml-6">{'→ [[Prototype]]: Object.prototype'}</p>
              <p className="text-[#F59E0B] ml-8">{'→ [[Prototype]]: null (end!)'}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-[rgba(239,68,68,0.3)] p-5" style={{ background: 'rgba(239,68,68,0.07)' }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">💡</span>
            <div>
              <h3 className="font-bold text-[#EF4444] mb-1">&quot;Cannot read property of undefined&quot; Errors</h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                Prototype chain samajhne ke baad ye errors obvious ho jaate hain.{' '}
                <strong className="text-[#F5F5F7]">Error matlab:</strong>{' '}
                property chain mein nahi mili — undefined mila — aur undefined pe aur property access karne ki koshish ki.
                Ye ek dum clear ho jaata hai jab chain visually dekho!
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 3. ANALOGY ────────────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading
          emoji="👨‍👩‍👧"
          title="Real-World Analogy — Family Tree"
          subtitle="Traits inherited from parents/grandparents — same as prototype chain"
        />
        <div className={glassCard} style={glassCardBg}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            {[
              {
                emoji: '🧬',
                title: 'Family Tree',
                color: '#06B6D4',
                points: [
                  { you: 'Baccha (dog instance)', proto: 'Apna — name, age (own properties)' },
                  { you: 'Parent (Dog.prototype)', proto: 'Inherited — speak() method' },
                  { you: 'Grandparent (Animal.prototype)', proto: 'Further inherited — breathe()' },
                  { you: 'Great-great-... (Object.prototype)', proto: 'Foundation — toString(), hasOwnProperty()' },
                ],
              },
              {
                emoji: '🔍',
                title: 'Property Lookup = Trait Lookup',
                color: '#7C3AED',
                points: [
                  { you: '"Kya bacche ke paas yeh trait hai?"', proto: 'Check own properties first' },
                  { you: '"Kya parent ke paas hai?"', proto: 'Check Dog.prototype' },
                  { you: '"Kya grandparent ke paas hai?"', proto: 'Check Animal.prototype' },
                  { you: '"Kisi ke paas nahi → undefined"', proto: 'Chain end — null reached' },
                ],
              },
            ].map((section) => (
              <div key={section.title} className="rounded-xl border p-4" style={{ background: `${section.color}08`, borderColor: `${section.color}30` }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{section.emoji}</span>
                  <span className="font-semibold text-sm" style={{ color: section.color }}>{section.title}</span>
                </div>
                <div className="space-y-2">
                  {section.points.map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: section.color }} />
                      <div>
                        <span className="text-[#F5F5F7] font-medium">{p.you}</span>
                        <span className="text-[#71717A]"> → {p.proto}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="rounded-xl p-3 border text-sm text-[#F5F5F7] font-medium" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
            💡 <strong>Key insight:</strong> Har generation se traits mile hain — aur jab kuch nahi milta tab null (chain ka end). Inheritance is sharing, not copying — methods once defined, all descendants use same definition!
          </p>
        </div>
      </Section>

      {/* ── 4. COLOR LEGEND ───────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading emoji="🎨" title="Element Legend — Visualization Mein Kya Kya Hai?" subtitle="Chain ke elements samjho shuru karne se pehle" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { color: '#06B6D4', label: 'Cyan — Instance', desc: 'Object instance (e.g., dog). Own properties yahan hain — sirf is object ke.' },
            { color: '#7C3AED', label: 'Purple — Prototype', desc: 'Dog.prototype ya koi aur prototype — shared methods. Sab instances share karte hain.' },
            { color: '#F59E0B', label: 'Amber — Object.prototype', desc: 'Root of all objects. toString, hasOwnProperty — sab yahan se aate hain.' },
            { color: '#71717A', label: 'Gray — null', desc: 'Chain ka end. Prototype chain null pe khatam hoti hai. Koi aur link nahi.' },
            { color: '#10B981', label: 'Green glow — Found!', desc: 'Property is chain node mein mili — green glow show karta hai.' },
            { color: '#EF4444', label: 'Red result — undefined', desc: 'Property kisi bhi node mein nahi mili — chain end tak gaye aur result undefined.' },
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
              { n: '01', action: 'Scenario 1 se shuru karo', detail: '"Class Inheritance" — dog → Dog.prototype → Animal.prototype → Object.prototype → null.', color: '#06B6D4' },
              { n: '02', action: 'Chain vertical dekho', detail: 'Left panel pe boxes chain mein hain — ek ke neeche ek. Arrows [[Prototype]] links dikha rahe hain.', color: '#7C3AED' },
              { n: '03', action: '"dog.speak()" button click karo', detail: 'Dekho animation — dog node se shuru, Dog.prototype mein mila — green glow!', color: '#10B981' },
              { n: '04', action: '"dog.breathe()" try karo', detail: '2 levels deep jana padega — Dog.prototype skip, Animal.prototype mein milega.', color: '#F59E0B' },
              { n: '05', action: '"dog.nonExistent" try karo', detail: 'Puri chain traverse hogi — null tak — phir undefined result. "Not found" scenario dekho.', color: '#EF4444' },
              { n: '06', action: 'Scenario 3 — 3-Level Inheritance', detail: 'GoldenRetriever → Dog → Animal → Object. 4 levels deep property lookup trace karo.', color: '#7C3AED' },
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
        <SectionHeading emoji="🎮" title="Visualization — Prototype Chain Live!" subtitle="Neeche diye property lookup buttons se interact karo" />
        <div className="rounded-2xl border overflow-hidden" style={{ background: 'rgba(18,18,26,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="ml-2 text-sm text-[#71717A] font-mono">prototype-chain-visualizer.js</span>
          </div>
          <div className="p-6">
            <PrototypeChainVisualizer />
          </div>
        </div>
      </Section>

      {/* ── 7. EXPERIMENTS ────────────────────────────────────────────────── */}
      <Section className="py-6">
        <SectionHeading emoji="🧪" title="Try Karo — Ye Experiments Karo!" subtitle="Specific scenarios test karo" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Experiment 1: Own vs Inherited',
              steps: [
                'Scenario 1 chuno',
                '"dog.name" click karo — own property',
                '"dog.speak()" click karo — inherited',
                'Fark: own property 1st level, inherited deeper',
              ],
              insight: 'Own properties fast access hoti hain — chain traverse nahi hoti. Inherited properties slower (chain traverse). Performance-critical code mein ye matter karta hai.',
              color: '#06B6D4',
              emoji: '🏠',
            },
            {
              title: 'Experiment 2: toString Deep Chain',
              steps: [
                '"dog.toString()" click karo',
                'Dekho kitni levels traverse hoti hain',
                '3-4 levels deep jaata hai — Object.prototype',
                'Ye JS ka root prototype hai!',
              ],
              insight: 'toString, hasOwnProperty, valueOf — ye sab Object.prototype se aate hain. Sab JS objects ye inherit karte hain automatically.',
              color: '#F59E0B',
              emoji: '🔍',
            },
            {
              title: 'Experiment 3: Not Found = undefined',
              steps: [
                '"dog.nonExistent" click karo',
                'Puri chain traverse hogi',
                'Null tak jaayega — nahi mila',
                'Result: undefined (not ReferenceError!)',
              ],
              insight: 'Property lookup chain mein nahi mili → undefined (not ReferenceError). Aur agar undefined.something karo — tab TypeError aata hai. Ye common bug hai!',
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
        <SectionHeading emoji="🎯" title="Key Takeaways — Ye 3 Cheezein Yaad Rakhna!" subtitle="Prototype chain ke baare mein sabse important points" />
        <div className="space-y-4">
          {[
            {
              n: '1',
              bold: 'Har JS object ka ek [[Prototype]] link hota hai',
              rest: '— Ye link ek aur object ko point karta hai — chain end hoti hai null pe. class extends ke saath explicitly set hota hai, Object.create() se manually set kar sakte ho. Ye JS inheritance ka foundation hai.',
              color: '#06B6D4',
            },
            {
              n: '2',
              bold: 'Property lookup: own → prototype → ... → null',
              rest: '— JS engine hamesha is order mein dhundta hai. Agar kisi level pe mila — wahi return hota hai. Null tak chain traverse karne ke baad bhi nahi mila → undefined. Ye "prototype chain" ka core mechanic hai.',
              color: '#7C3AED',
            },
            {
              n: '3',
              bold: 'class syntax prototype ke upar ek layer hai',
              rest: '— Internally JS hamesha prototypes use karta hai — class sirf syntactic sugar hai (ES6+). Dono ke baare mein jaanna zaroori hai — legacy code aur interviews dono mein prototype pattern milega.',
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
              wrong: '__proto__ aur prototype ek hi cheez hai',
              right: '__proto__ ek instance property hai jo object ka actual prototype link hai. prototype ek function property hai — function.prototype. Dog.prototype alag hai dog.__proto__ se (dono same reference point karte hain — lekin access kaise karo alag hai).',
            },
            {
              wrong: 'Prototype chain se properties copy hoti hain object mein',
              right: 'Nahi! Properties share hoti hain — copy nahi hoti. Ek method Dog.prototype pe define hoti hai — sab Dog instances usi ek definition ko use karte hain. Ye memory efficient hai. Agar copy hoti — har instance pe alag function hota.',
            },
            {
              wrong: 'class ke saath prototype chain khatam ho gayi — ab modern JS mein nahi hoti',
              right: 'class sirf syntactic sugar hai. Internally JS hamesha prototype chain use karta hai. typeof Dog === "function" — class ek function hai! extends bhi prototype chain set karta hai internally.',
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
        <SectionHeading emoji="💻" title="Under The Hood — Prototype Chain Code" subtitle="Actual JS engine behavior — code mein dekho" />
        <div className={glassCard} style={glassCardBg}>
          <pre className="rounded-xl p-5 overflow-x-auto text-xs leading-relaxed font-mono border border-[rgba(255,255,255,0.06)]" style={{ background: 'rgba(10,10,15,0.8)', color: '#A1A1AA' }}>
            <code className="whitespace-pre">{PROTOTYPE_CODE}</code>
          </pre>
        </div>
      </Section>

      {/* ── 11. NEXT STEPS ────────────────────────────────────────────────── */}
      <Section className="pt-6 pb-16">
        <SectionHeading emoji="🚀" title="Next Steps — Aage Kya Seekhna Hai?" subtitle="Prototype chain samajh gaya? Ab ye karo" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            href="/course/prototype-chain"
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
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-1">Prototype Chain Deep Dive</h3>
            <p className="text-sm text-[#A1A1AA]">Mixins, Object.create(), prototype pollution, aur performance implications.</p>
          </Link>

          <Link
            href="/visualizations/js-this-binding"
            className="group block rounded-2xl border border-[rgba(6,182,212,0.3)] p-6 transition-all hover:border-[rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]"
            style={{ background: 'rgba(6,182,212,0.07)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🦎</span>
                <span className="text-xs font-mono text-[#06B6D4] uppercase tracking-widest">Related Visualization</span>
              </div>
              <span className="text-[#71717A] text-xl group-hover:text-[#06B6D4] transition-colors">→</span>
            </div>
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-1">this Binding Dekho</h3>
            <p className="text-sm text-[#A1A1AA]">Prototype aur this — dono milke JavaScript OOP ka core hain. this ka next step!</p>
          </Link>
        </div>
      </Section>
    </div>
  )
}
