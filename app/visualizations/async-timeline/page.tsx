import Link from 'next/link'
import AsyncTimeline from '@/components/visualizations/AsyncTimeline'

export const metadata = {
  title: 'Async Execution Timeline — NodeMaster',
  description:
    'Sequential aur Parallel async execution ka time difference khud dekho. Promise.all kaise 3x faster code likhne deta hai.',
}

// ─── Sequential code block lines ──────────────────────────────────────────
const SEQUENTIAL_LINES: { text: string; color?: string }[] = [
  { text: '// SLOW: Sequential awaits — total 700ms', color: '#EF4444' },
  { text: '' },
  { text: 'async function loadProfile(id) {' },
  { text: '  const user  = await getUser(id);    // 200ms', color: '#F59E0B' },
  { text: '  const posts = await getPosts(id);   // 300ms  ← waits for user first', color: '#F59E0B' },
  { text: '  const likes = await getLikes(id);   // 200ms  ← waits for posts first', color: '#F59E0B' },
  { text: '  // Total: 200 + 300 + 200 = 700ms', color: '#71717A' },
  { text: '}' },
]

// ─── Parallel code block lines ────────────────────────────────────────────
const PARALLEL_LINES: { text: string; color?: string }[] = [
  { text: '// FAST: Promise.all — total 300ms (slowest task only)', color: '#10B981' },
  { text: '' },
  { text: 'async function loadProfile(id) {' },
  { text: '  const [user, posts, likes] = await Promise.all([', color: '#10B981' },
  { text: '    getUser(id),    // 200ms ─┐', color: '#10B981' },
  { text: '    getPosts(id),   // 300ms  ├─ all start simultaneously', color: '#10B981' },
  { text: '    getLikes(id),   // 200ms ─┘', color: '#10B981' },
  { text: '  ]);' },
  { text: '  // Total: max(200, 300, 200) = 300ms  ← 2.3x faster!', color: '#71717A' },
  { text: '}' },
]

export default function AsyncTimelinePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">

      {/* ── SECTION 1: Breadcrumb + Header ──────────────────────────────── */}
      <div className="border-b border-[rgba(255,255,255,0.08)] py-10 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-6">
            <Link
              href="/visualizations"
              className="hover:text-[#F5F5F7] transition-colors"
            >
              ← Visualizations
            </Link>
            <span className="text-[#71717A]">/</span>
            <span className="text-[#F5F5F7]">Async Timeline</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">⚡</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              Async Execution Timeline
            </h1>
          </div>

          <p className="text-[#A1A1AA] text-lg mb-5 max-w-2xl">
            Sequential aur Parallel execution ka time difference khud dekho — aur samjho Promise.all
            kab aur kyun use karna chahiye.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#10B981', borderColor: 'rgba(16,185,129,0.4)', background: 'rgba(16,185,129,0.08)' }}
            >
              ✅ Beginner
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#A1A1AA', borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
            >
              🕐 ~10 minutes
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#06B6D4', borderColor: 'rgba(6,182,212,0.4)', background: 'rgba(6,182,212,0.08)' }}
            >
              🎯 Interactive
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── SECTION 2: Pehle Samjho — amber callout ─────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-xl font-bold" style={{ color: '#F59E0B' }}>
              Pehle Samjho — Ye Kyun Important Hai?
            </h2>
          </div>

          <div className="space-y-4 text-[#F5F5F7]">
            <p className="text-base leading-relaxed">
              <span className="font-semibold" style={{ color: '#F59E0B' }}>
                Ek common mistake: sab kuch await karte jaana ek ke baad ek.
              </span>{' '}
              Jab tasks independent hote hain — ye 3x slow code produce karta hai! Aur ye mistake
              beginners aur experienced developers dono karte hain.
            </p>
            <p className="text-base leading-relaxed">
              Ye visualization dikhata hai kitna time bachta hai jab tum{' '}
              <code
                className="px-1.5 py-0.5 rounded text-sm font-mono"
                style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}
              >
                Promise.all
              </code>{' '}
              use karte ho. Ek baar ye dekh loge — phir kabhi sequential await nahi likhoge jab
              tasks independent ho.
            </p>
          </div>

          <div className="mt-5 pt-5 border-t border-[rgba(245,158,11,0.2)]">
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: '#F59E0B' }}
            >
              Prerequisites — Pehle Ye Jaan Lo
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'Promises Basics', href: '/course/promises' },
                { label: 'async / await', href: '/course/async-await' },
                { label: 'Event Loop', href: '/visualizations/event-loop' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border transition-colors hover:text-[#F5F5F7]"
                  style={{
                    color: '#F59E0B',
                    borderColor: 'rgba(245,158,11,0.3)',
                    background: 'rgba(245,158,11,0.06)',
                  }}
                >
                  {item.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 3: Real World Analogy — purple card ──────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🫖</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#7C3AED' }}>
                Real World Analogy — Chai Banana
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Sequential vs parallel ko chai banane ke example se samjho
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sequential */}
            <div
              className="rounded-xl border p-5"
              style={{ background: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.25)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🐌</span>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#EF4444' }}>Sequential — Galat Tarika</div>
                  <div className="text-xs text-[#71717A]">Total: 3 + 2 + 1 = 6 minutes</div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { step: '1.', text: 'Paani garam karo', time: '3 min', icon: '💧' },
                  { step: '2.', text: 'Paani garam hone ke BAAD milk ubalo', time: '2 min', icon: '🥛' },
                  { step: '3.', text: 'Milk ke BAAD chai patti daalo', time: '1 min', icon: '🍃' },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="flex items-center gap-2 text-xs p-2 rounded-lg"
                    style={{ background: 'rgba(239,68,68,0.08)' }}
                  >
                    <span>{s.icon}</span>
                    <span className="text-[#71717A] font-mono">{s.step}</span>
                    <span className="text-[#A1A1AA] flex-1">{s.text}</span>
                    <span className="font-mono font-bold" style={{ color: '#EF4444' }}>{s.time}</span>
                  </div>
                ))}
                <div
                  className="flex items-center justify-between p-2 rounded-lg mt-1 text-xs font-bold"
                  style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444' }}
                >
                  <span>Total wait time</span>
                  <span>= 6 minutes ❌</span>
                </div>
              </div>
            </div>

            {/* Parallel */}
            <div
              className="rounded-xl border p-5"
              style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.25)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🚀</span>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#10B981' }}>Parallel — Sahi Tarika</div>
                  <div className="text-xs text-[#71717A]">Total: max(3, 2, 1) = 3 minutes</div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { text: 'Paani garam karo', time: '3 min', icon: '💧' },
                  { text: 'Milk ubalo (saath mein)', time: '2 min', icon: '🥛' },
                  { text: 'Chai patti ready karo (saath mein)', time: '1 min', icon: '🍃' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs p-2 rounded-lg"
                    style={{ background: 'rgba(16,185,129,0.08)' }}
                  >
                    <span>{s.icon}</span>
                    <span className="text-[#71717A] font-mono">{i + 1}.</span>
                    <span className="text-[#A1A1AA] flex-1">{s.text}</span>
                    <span className="font-mono font-bold" style={{ color: '#10B981' }}>{s.time}</span>
                  </div>
                ))}
                <div
                  className="flex items-center justify-between p-2 rounded-lg mt-1 text-xs font-bold"
                  style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}
                >
                  <span>Total wait time</span>
                  <span>= 3 minutes ✅ (2x faster!)</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-4 p-4 rounded-xl text-sm text-center"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
          >
            <span className="text-[#A1A1AA]">Ek hi concept code mein: </span>
            <code className="font-mono font-bold" style={{ color: '#7C3AED' }}>
              Promise.all([task1(), task2(), task3()])
            </code>
            <span className="text-[#A1A1AA]"> = sabse slow task ki time</span>
          </div>
        </div>

        {/* ── SECTION 4: What the 3 Lanes Mean ────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🛣️</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Teen Lanes Ka Matlab</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Visualization mein teen lanes hain — har ek ek alag approach hai
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                lane: 'Lane 1',
                title: 'Sync (Blocking)',
                color: '#EF4444',
                bg: 'rgba(239,68,68,0.06)',
                border: 'rgba(239,68,68,0.2)',
                icon: '🔴',
                speed: 'SLOWEST',
                desc: 'Code runs one after another — ek kaam complete hone ke baad hi doosra shuru. CPU block rehta hai. Koi bhi kaam background mein nahi hota.',
                example: 'const data = fs.readFileSync("file.txt")  // blocks everything',
                exColor: '#EF4444',
              },
              {
                lane: 'Lane 2',
                title: 'Sequential Async (await one by one)',
                color: '#F59E0B',
                bg: 'rgba(245,158,11,0.06)',
                border: 'rgba(245,158,11,0.2)',
                icon: '🟡',
                speed: 'STILL SLOW',
                desc: 'Non-blocking hai lekin phir bhi sequential. await pehle wali task complete hone ka wait karta hai. "Async" code ka matlab "parallel" nahi hota!',
                example: 'const user = await getUser()  // wait\nconst posts = await getPosts()  // then wait again',
                exColor: '#F59E0B',
              },
              {
                lane: 'Lane 3',
                title: 'Parallel Async (Promise.all)',
                color: '#10B981',
                bg: 'rgba(16,185,129,0.06)',
                border: 'rgba(16,185,129,0.2)',
                icon: '🟢',
                speed: 'FASTEST',
                desc: 'Sab tasks ek saath start hote hain. Total time = sabse slow wali task ki time. Independent tasks ke liye ye HAMESHA best approach hai.',
                example: 'const [user, posts] = await Promise.all([\n  getUser(), getPosts()\n])',
                exColor: '#10B981',
              },
            ].map((lane) => (
              <div
                key={lane.lane}
                className="rounded-xl border p-5"
                style={{ background: lane.bg, borderColor: lane.border }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lane.icon}</span>
                    <div>
                      <span
                        className="text-[10px] font-mono uppercase tracking-wider"
                        style={{ color: lane.color }}
                      >
                        {lane.lane}
                      </span>
                      <div className="font-bold text-[#F5F5F7]">{lane.title}</div>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-black tracking-widest px-2 py-1 rounded-full flex-shrink-0"
                    style={{ background: `${lane.color}20`, color: lane.color }}
                  >
                    {lane.speed}
                  </span>
                </div>
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-3">{lane.desc}</p>
                <pre
                  className="text-xs font-mono p-3 rounded-lg leading-5"
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    color: lane.exColor,
                    border: `1px solid ${lane.color}20`,
                  }}
                >
                  {lane.example}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 5: Kaise Use Karein — numbered steps ─────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">📖</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Kaise Use Karein — Step by Step</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Neeche ki visualization ko in steps ke saath use karo
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: '🐢', step: 1, color: '#06B6D4',
                title: 'Speed 0.5x Pe Rakho',
                desc: 'Speed slider se animation slow karo — teenon lanes ko clearly follow kar sako.',
              },
              {
                icon: '▶️', step: 2, color: '#10B981',
                title: '"Run All" Dabao',
                desc: 'Teen lanes ek saath animate hongi. Dekho kitni jaldi parallel lane complete hoti hai.',
              },
              {
                icon: '⏱️', step: 3, color: '#F59E0B',
                title: 'Timer Numbers Compare Karo',
                desc: 'Har lane ke neeche total time dikhta hai. Parallel lane hamesha sabse kam time leti hai.',
              },
              {
                icon: '🟢', step: 4, color: '#10B981',
                title: 'Green Highlight Dekho',
                desc: 'Jab parallel lane complete hoti hai — green highlight aata hai. Notice karo kitni lanes abhi bhi chal rahi hain.',
              },
              {
                icon: '🔄', step: 5, color: '#7C3AED',
                title: 'Reset Karo Aur Again Dekho',
                desc: 'Reset karo aur 1x speed pe dobara dekho. Difference aur clearly dikhega.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: `${item.color}20`,
                    color: item.color,
                    border: `1.5px solid ${item.color}50`,
                  }}
                >
                  {item.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{item.icon}</span>
                    <span className="font-semibold text-[#F5F5F7] text-sm">{item.title}</span>
                  </div>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── SECTION 6: THE VISUALIZATION — full width ───────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ background: 'rgba(18,18,26,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div
            className="px-6 py-4 border-b flex items-center gap-3"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="ml-2 text-sm text-[#71717A] font-mono">async-timeline.js</span>
          </div>
          <AsyncTimeline />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── SECTION 7: Experiments — 2 cards ─────────────────────────────── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🧪</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Try Karo Ye Experiments</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Do experiments — pehle wala dikhata hai Promise.all ka power, doosra dikhata hai kab USE NAHI karna.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                num: '01',
                title: '3 Second Rule',
                color: '#10B981',
                bg: 'rgba(16,185,129,0.06)',
                border: 'rgba(16,185,129,0.25)',
                setup: [
                  'Run karo aur timer dekho',
                  'Parallel lane complete hone ka time note karo',
                  'Woh sabse slow SINGLE task ki time hai',
                ],
                notice: 'Parallel lane hamesha sabse slow single task ki time lete hai — sum nahi.',
                insight: '5 tasks of 1s each: Sequential = 5s, Parallel = 1s. 5x faster! Ye difference real APIs mein bahut bada hota hai.',
                tag: 'The power',
                tagColor: '#10B981',
              },
              {
                num: '02',
                title: 'Kab NAHI Karna Promise.all',
                color: '#EF4444',
                bg: 'rgba(239,68,68,0.06)',
                border: 'rgba(239,68,68,0.25)',
                setup: [
                  'Socho: user login karo, PHIR user data fetch karo',
                  'Task 2 Task 1 ke result pe depend karta hai',
                  'Ye ek parallel nahi kar sakte!',
                ],
                notice: 'Agar Task 2 ko Task 1 ka result chahiye — tab sequential rehna chahiye. Force parallel mat karo.',
                insight: 'Login → fetch user: sequential. User data + posts + likes fetch: parallel. Context decide karta hai.',
                tag: 'The limit',
                tagColor: '#EF4444',
              },
            ].map((exp) => (
              <div
                key={exp.num}
                className="rounded-2xl border p-5 flex flex-col"
                style={{ background: exp.bg, borderColor: exp.border }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="text-4xl font-black opacity-25 select-none"
                    style={{ color: exp.color }}
                  >
                    {exp.num}
                  </div>
                  <span
                    className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full"
                    style={{ background: `${exp.color}20`, color: exp.color }}
                  >
                    {exp.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-3" style={{ color: exp.color }}>
                  {exp.title}
                </h3>

                <div className="mb-4">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] mb-2">
                    Think About
                  </p>
                  <ol className="space-y-1">
                    {exp.setup.map((s, i) => (
                      <li key={i} className="text-xs text-[#A1A1AA] flex items-start gap-2">
                        <span style={{ color: exp.color }}>{i + 1}.</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-auto space-y-2">
                  <div
                    className="rounded-lg p-3"
                    style={{ background: `${exp.color}12`, border: `1px solid ${exp.color}30` }}
                  >
                    <p
                      className="text-[10px] font-mono uppercase tracking-wider mb-1"
                      style={{ color: exp.color }}
                    >
                      Kya Notice Karo
                    </p>
                    <p className="text-xs text-[#F5F5F7] leading-relaxed">{exp.notice}</p>
                  </div>
                  <div
                    className="rounded-lg p-3"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                      Key Insight
                    </p>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">{exp.insight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 8: Key Takeaways — green callout ─────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">✅</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#10B981' }}>
                Key Takeaways — Ye Teen Cheezein Hamesha Yaad Rakho
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Async timeline ke baare mein ye teen golden rules hain.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                num: '1',
                heading: 'Sequential Await = Sum of All Durations',
                body: 'Jab tum await ek ke baad ek karte ho — total time = task1 + task2 + task3 + ... Ye addition hai. Jitne tasks utna time.',
              },
              {
                num: '2',
                heading: 'Promise.all = Duration of Slowest Task',
                body: 'Promise.all ke saath total time = max(task1, task2, task3). Chahe 10 tasks hon — sirf sabse slow wali ki time lagti hai. Baaki sab saath mein chalte hain.',
              },
              {
                num: '3',
                heading: 'Rule: Independent Tasks → Hamesha Promise.all',
                body: 'Agar tasks ek doosre pe depend nahi karte (user data + posts + likes fetch karna) — hamesha Promise.all use karo. Agar depend karte hain (login → then user fetch) — sequential rakho.',
              },
            ].map((point) => (
              <div
                key={point.num}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{ background: 'rgba(16,185,129,0.2)', color: '#10B981' }}
                >
                  {point.num}
                </div>
                <div>
                  <h3 className="font-bold text-[#F5F5F7] mb-1">{point.heading}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 9: Code Comparison ────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">💻</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Real Code Comparison</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Exact same result — 2.3x different speed. Ek hi change: Promise.all.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Slow */}
            <div
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: 'rgba(239,68,68,0.3)' }}
            >
              <div
                className="flex items-center justify-between px-4 py-2.5 border-b"
                style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.2)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                  <span className="text-xs font-mono text-[#EF4444]">slow.js</span>
                </div>
                <span
                  className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(239,68,68,0.2)', color: '#EF4444' }}
                >
                  700ms
                </span>
              </div>
              <div className="p-4 overflow-x-auto" style={{ background: '#0D0D15' }}>
                <pre className="text-xs font-mono leading-6">
                  {SEQUENTIAL_LINES.map((line, i) => (
                    <div key={i} style={{ color: line.color ?? '#F5F5F7' }}>
                      {line.text || ' '}
                    </div>
                  ))}
                </pre>
              </div>
            </div>

            {/* Fast */}
            <div
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: 'rgba(16,185,129,0.3)' }}
            >
              <div
                className="flex items-center justify-between px-4 py-2.5 border-b"
                style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.2)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="text-xs font-mono text-[#10B981]">fast.js</span>
                </div>
                <span
                  className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(16,185,129,0.2)', color: '#10B981' }}
                >
                  300ms ✓
                </span>
              </div>
              <div className="p-4 overflow-x-auto" style={{ background: '#0D0D15' }}>
                <pre className="text-xs font-mono leading-6">
                  {PARALLEL_LINES.map((line, i) => (
                    <div key={i} style={{ color: line.color ?? '#F5F5F7' }}>
                      {line.text || ' '}
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </div>

          <div
            className="mt-4 p-4 rounded-xl text-center"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
          >
            <p className="text-sm font-bold" style={{ color: '#10B981' }}>
              Same output. Same result. 2.3x faster. Sirf Promise.all ki wajah se.
            </p>
          </div>
        </div>

        {/* ── SECTION 10: Common Confusion — 2 misconceptions ──────────────── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🚫</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">
                Common Confusion — Ye Galat Fehmiyan Saaf Karo
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Async ke baare mein do common misconceptions hain.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                wrong: 'async/await is parallel',
                right:
                  'await pehla, phir await doosra = still sequential. "async" function matlab parallel execution nahi hota. Sirf Promise.all ya Promise.allSettled se parallel execution milti hai.',
              },
              {
                wrong: 'Promise.all always better hai',
                right:
                  'Sirf jab tasks independent ho. Agar Task 2 ko Task 1 ka result chahiye (dependent) — tab sequential rakho. Force parallel karna logical errors dega. Context samjho, phir decide karo.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="flex items-start gap-3 p-4"
                  style={{
                    background: 'rgba(239,68,68,0.08)',
                    borderBottom: '1px solid rgba(239,68,68,0.2)',
                  }}
                >
                  <span className="text-lg flex-shrink-0">❌</span>
                  <p className="text-sm text-[#F5F5F7] font-medium">&quot;{item.wrong}&quot;</p>
                </div>
                <div className="flex items-start gap-3 p-4" style={{ background: 'rgba(16,185,129,0.06)' }}>
                  <span className="text-lg flex-shrink-0">✅</span>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.right}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 11: Agla Step — next steps ───────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🚀</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Agla Step — Aage Kya Seekhein?</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Async timeline samajh aaya? In topics se aur gehri samajh milegi.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/course/async-await"
              className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.3)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'rgba(124,58,237,0.15)' }}
              >
                📚
              </div>
              <div>
                <div className="font-bold text-[#F5F5F7] group-hover:text-[#7C3AED] transition-colors">
                  Async / Await Chapter
                </div>
                <div className="text-sm text-[#A1A1AA] mt-0.5">
                  Deep dive — error handling, Promise.allSettled, race conditions
                </div>
              </div>
              <span className="ml-auto text-[#71717A] group-hover:text-[#7C3AED] transition-colors">→</span>
            </Link>

            <Link
              href="/visualizations/event-loop"
              className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(6,182,212,0.08)', borderColor: 'rgba(6,182,212,0.3)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'rgba(6,182,212,0.15)' }}
              >
                ⚙️
              </div>
              <div>
                <div className="font-bold text-[#F5F5F7] group-hover:text-[#06B6D4] transition-colors">
                  Event Loop Dekho
                </div>
                <div className="text-sm text-[#A1A1AA] mt-0.5">
                  Samjho kaise Call Stack, microtasks aur macrotasks ek saath kaam karte hain
                </div>
              </div>
              <span className="ml-auto text-[#71717A] group-hover:text-[#06B6D4] transition-colors">→</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
