import PromiseStatesVisualizer from '@/components/visualizations/PromiseStatesVisualizer'
import Link from 'next/link'

export const metadata = {
  title: 'Promise States Machine — NodeMaster',
  description:
    'Promise ke 3 states interactively samjho — Pending, Fulfilled, Rejected. .then(), .catch(), .finally() chaining live animation ke saath.',
}

// ─── Primitives ───────────────────────────────────────────────────────────────

function Badge({
  children,
  color = '#10B981',
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
    <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#10B981] mb-3">
      {children}
    </p>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PromiseStatesPage() {
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
        {/* Glow blobs */}
        <div
          className="absolute top-0 left-1/3 w-96 h-64 rounded-full blur-3xl pointer-events-none opacity-[0.07]"
          style={{ background: '#10B981' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-64 h-48 rounded-full blur-3xl pointer-events-none opacity-[0.05]"
          style={{ background: '#7C3AED' }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-wrap gap-2 mb-5">
            <Badge color="#10B981">Beginner</Badge>
            <Badge color="#06B6D4">8 min</Badge>
            <Badge color="#7C3AED">JavaScript / Node.js Track</Badge>
          </div>

          <h1 className="text-5xl font-bold font-display leading-tight mb-3">
            🔄 Promise States{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #10B981, #06B6D4)' }}
            >
              Machine
            </span>
          </h1>
          <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl">
            Promise ke 3 states — Pending, Fulfilled, Rejected. Chaining rules live animation
            mein. <em>Ek baar dekho, hamesha ke liye yaad rahega.</em>
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
              background: 'rgba(16,185,129,0.06)',
              borderColor: 'rgba(16,185,129,0.25)',
            }}
          >
            <p className="text-lg font-semibold text-[#F5F5F7] mb-3">
              Promise ke 3 states hain. Settled hone ke baad kabhi change nahi hoti.
            </p>
            <p className="text-[#A1A1AA] leading-relaxed mb-4">
              Ye simple rule sab async confusion clear karta hai. Bahut log Promise padh lete hain
              lekin .then() aur .catch() ke execution order ko galat samajhte hain. Ye visualization
              wahi confusion permanently hatata hai.
            </p>
            <div
              className="rounded-xl p-5 border grid md:grid-cols-3 gap-4"
              style={{ background: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.2)' }}
            >
              {[
                { state: '⏳ PENDING', color: '#A1A1AA', desc: 'Initial state. Operation abhi complete nahi hua.' },
                { state: '✅ FULFILLED', color: '#10B981', desc: 'Success! Value available hai. .then() trigger hogi.' },
                { state: '❌ REJECTED', color: '#EF4444', desc: 'Error! Reason available hai. .catch() trigger hogi.' },
              ].map(s => (
                <div key={s.state}>
                  <p className="font-mono font-bold text-sm mb-1" style={{ color: s.color }}>{s.state}</p>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — ANALOGY
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Real-World Analogy — Food Order 🍕</SectionLabel>
          <p className="text-[#A1A1AA] mb-5 leading-relaxed">
            Promise ko food order ki tarah socho — state transitions bilkul same hain:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                emoji: '🍕',
                promiseState: 'PENDING',
                color: '#A1A1AA',
                orderStatus: 'Order placed — Cooking in progress',
                realCode: 'fetch("/api/data") — response abhi nahi aaya',
                note: 'Aap wait kar rahe ho. Cancel bhi nahi kar sakte.',
              },
              {
                emoji: '🎉',
                promiseState: 'FULFILLED',
                color: '#10B981',
                orderStatus: 'Delivered! Pizza ghar aa gaya',
                realCode: '.then(data => setData(data)) runs',
                note: 'Exactly ek baar hoga — aur phir state kabhi change nahi hogi.',
              },
              {
                emoji: '😢',
                promiseState: 'REJECTED',
                color: '#EF4444',
                orderStatus: 'Cancelled — Restaurant ne reject kiya',
                realCode: '.catch(err => showError(err)) runs',
                note: 'Error reason milti hai. .then() skip ho jaati hai.',
              },
            ].map(item => (
              <div
                key={item.promiseState}
                className="rounded-xl p-5 border"
                style={{
                  background: `${item.color}08`,
                  borderColor: `${item.color}25`,
                }}
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <p className="font-mono font-bold text-sm mb-1" style={{ color: item.color }}>
                  {item.promiseState}
                </p>
                <p className="text-xs text-[#A1A1AA] mb-2 leading-relaxed">{item.orderStatus}</p>
                <div
                  className="rounded-lg px-3 py-2 font-mono text-[10px] mb-2"
                  style={{ background: 'rgba(0,0,0,0.3)', color: item.color }}
                >
                  {item.realCode}
                </div>
                <p className="text-[10px] text-[#71717A] leading-tight">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4 — CHAIN RULES
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Chaining Rules — Visualization Mein Kya Dekhoge</SectionLabel>
          <p className="text-[#A1A1AA] mb-5 leading-relaxed">
            Teen scenarios hain. Inhe ek baar samajh lo, baaki sab automatic ho jaata hai:
          </p>

          <div className="space-y-4">
            {[
              {
                num: '01',
                title: 'Resolve Path',
                color: '#10B981',
                desc: '.then() → .then() → .finally(). Sab execute hote hain sequence mein.',
                flow: 'Resolve → .then(1) ✅ → .then(2) ✅ → .finally() ✅',
              },
              {
                num: '02',
                title: 'Reject Path',
                color: '#EF4444',
                desc: '.then() SKIP hoti hai. Directly .catch() pe jaata hai. .finally() phir bhi chalta hai.',
                flow: 'Reject → .then() ❌ SKIP → .catch() ✅ → .finally() ✅',
              },
              {
                num: '03',
                title: '.finally() Rule',
                color: '#F59E0B',
                desc: 'Hamesha chalta hai — chahe resolve ho ya reject. Cleanup ke liye perfect.',
                flow: 'Fulfill OR Reject → ... → .finally() ✅ ALWAYS',
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
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#F5F5F7] mb-1">{item.title}</p>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed mb-2">{item.desc}</p>
                  <div
                    className="rounded-lg px-3 py-2 font-mono text-[10px]"
                    style={{ background: `${item.color}10`, color: item.color }}
                  >
                    {item.flow}
                  </div>
                </div>
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
              Ye order follow karo — maximum samajh milegi:
            </p>
            <ol className="space-y-4">
              {[
                {
                  step: 1,
                  text: '"Simple Resolve" scenario select karo',
                  detail: 'Default scenario hai. Green "Resolve(value)" button dabao.',
                  color: '#10B981',
                },
                {
                  step: 2,
                  text: 'Watch karo — .then() chain ek-ek step activate hoti hai',
                  detail: 'Green arrows follow karo. Notice: .catch() gray/skipped rehti hai.',
                  color: '#06B6D4',
                },
                {
                  step: 3,
                  text: '"Reset" karo, phir red "Reject(error)" dabao',
                  detail: 'Ab dekho: .then() SKIP ho gayi, .catch() active ho gayi. .finally() dono cases mein chali.',
                  color: '#EF4444',
                },
                {
                  step: 4,
                  text: '"Rejected + Catch" scenario try karo',
                  detail: 'Is mein catch ke baad bhi .then() chain resume ho sakti hai — ye surprising hai!',
                  color: '#7C3AED',
                },
                {
                  step: 5,
                  text: '"Promise.all" scenario run karo',
                  detail: '3 promises simultaneously run hote hain. Sab fulfill = Promise.all fulfilled.',
                  color: '#F59E0B',
                },
                {
                  step: 6,
                  text: '"Async/Await" scenario dekho',
                  detail: 'Same promise logic, different syntax. try/catch = .then()/.catch().',
                  color: '#06B6D4',
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
            SECTION 6 — PROMISE STATES VISUALIZATION
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Interactive Visualization</SectionLabel>
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: 'rgba(16,185,129,0.2)' }}
          >
            <div
              className="px-5 py-3 border-b flex items-center gap-3"
              style={{
                background: '#12121A',
                borderColor: 'rgba(16,185,129,0.15)',
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-mono text-[#A1A1AA]">Promise States Machine — Live</span>
            </div>
            <div className="p-2 md:p-4" style={{ background: '#0A0A0F' }}>
              <PromiseStatesVisualizer />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 7 — EXPERIMENTS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Try Karo — 3 Experiments</SectionLabel>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                num: 'Exp 1',
                color: '#10B981',
                title: 'Catch ke baad .then()',
                items: [
                  '"Rejected + Catch" scenario select karo',
                  'Reject karo — notice karo .catch() ke baad .then() bhi chali',
                  'Iska matlab: catch() returns a new fulfilled promise!',
                ],
              },
              {
                num: 'Exp 2',
                color: '#7C3AED',
                title: 'Promise.all Rejection Rule',
                items: [
                  '"Promise.all" scenario mein try karo',
                  'Agar ek bhi reject ho — poora Array.all reject hoga',
                  'Isliye Promise.allSettled better hai agar partial results chahiye',
                ],
              },
              {
                num: 'Exp 3',
                color: '#F59E0B',
                title: 'Async/Await = Promise chain',
                items: [
                  '"Async/Await" tab dekho — dono code blocks side by side',
                  'try {} = .then() exactly',
                  'catch(err) {} = .catch() exactly',
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
                heading: 'Promise immutable after settling',
                body: 'Ek baar fulfilled ya rejected — never changes. resolve() ko do baar call karo, sirf pehli baar count hogi. Ye guarantee hai jo async code ko predictable banati hai.',
              },
              {
                num: '02',
                color: '#EF4444',
                heading: '.then() skip, .catch() trigger on rejection',
                body: 'Rejection automatically chain mein propagate hoti hai jab tak .catch() na mile. Ek unhandled rejection = crash ya warning. Hamesha .catch() lagao ya try/catch async function mein.',
              },
              {
                num: '03',
                color: '#F59E0B',
                heading: '.finally() hamesha chalta hai — dono paths pe',
                body: 'setLoading(false), cleanup, disconnect — ye sab .finally() mein jaate hain. Isliye code repeat nahi karna padta .then() aur .catch() dono mein.',
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
                wrong: 'reject() ke baad .then() kabhi nahi chalta',
                right: '.catch() ke baad .then() chal sakti hai! .catch() returns a new fulfilled promise by default. Chain continue hoti hai.',
              },
              {
                wrong: 'Promise.all ek bhi reject hone pe sab ka result lose ho jaata hai',
                right: 'Haan, Promise.all fast-fails. Isliye Promise.allSettled() use karo agar partial results chahiye — ye sab promises ka result deta hai chahe reject ho ya fulfill.',
              },
              {
                wrong: 'async/await aur Promise chain alag alag cheezein hain',
                right: 'Bilkul same! async/await sirf syntactic sugar hai Promises ke upar. async function hamesha Promise return karta hai.',
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
          <SectionLabel>Code Connection — Real Patterns</SectionLabel>
          <p className="text-[#A1A1AA] mb-5 leading-relaxed">
            Visualization mein jo dekha — yahi real code mein kaise likhte hain:
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
              <span className="text-xs font-mono text-[#71717A]">promise-patterns.js</span>
            </div>
            <pre
              className="p-6 text-sm font-mono leading-relaxed overflow-x-auto"
              style={{ background: '#0D0D14', color: '#A1A1AA' }}
            >
              <code>{`// 1. Basic chain
fetchUser(id)
  .then(user => fetchPosts(user.id))   // data flows through
  .then(posts => render(posts))         // second then gets prev result
  .catch(err => showError(err))         // any rejection lands here
  .finally(() => setLoading(false))     // ALWAYS runs — cleanup

// 2. Async/Await — exact same behavior
async function loadUserPosts(id) {
  try {
    const user = await fetchUser(id)
    const posts = await fetchPosts(user.id)
    render(posts)
  } catch (err) {
    showError(err)
  } finally {
    setLoading(false)  // ALWAYS runs
  }
}

// 3. Promise.all — parallel execution
const [user, posts, comments] = await Promise.all([
  fetchUser(id),     // starts immediately
  fetchPosts(id),    // starts immediately (parallel!)
  fetchComments(id), // starts immediately (parallel!)
])
// All 3 must fulfill — if any rejects, whole thing rejects

// 4. Promise.allSettled — partial results OK
const results = await Promise.allSettled([p1, p2, p3])
results.forEach(r => {
  if (r.status === 'fulfilled') use(r.value)
  else handleError(r.reason)
})`}</code>
            </pre>
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
                icon: '⚡',
                title: 'Async Timeline Visualizer',
                desc: 'Promise.all vs sequential awaits — visual timing comparison ke saath',
                href: '/visualizations/async-timeline',
                color: '#10B981',
                label: 'Viz dekho →',
              },
              {
                icon: '⚙️',
                title: 'Event Loop Visualizer',
                desc: 'Promise queue aur microtask priority — event loop ke saath',
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
