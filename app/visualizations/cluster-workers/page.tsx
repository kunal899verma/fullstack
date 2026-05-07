import ClusterWorkersVisualizer from '@/components/visualizations/ClusterWorkersVisualizer'
import Link from 'next/link'

export const metadata = {
  title: 'Cluster vs Worker Threads — NodeMaster',
  description:
    'Node.js ko multiple cores pe scale karo — Cluster aur Worker Threads ka animated comparison.',
}

// ─── Small reusable primitives ────────────────────────────────────────────────

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

export default function ClusterWorkersPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5F5F7]">

      {/* ── Back nav ── */}
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
          className="absolute top-0 right-1/4 w-96 h-64 rounded-full blur-3xl pointer-events-none opacity-[0.07]"
          style={{ background: '#7C3AED' }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-64 h-48 rounded-full blur-3xl pointer-events-none opacity-[0.05]"
          style={{ background: '#06B6D4' }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Badges row */}
          <div className="flex flex-wrap gap-2 mb-5">
            <Badge color="#EF4444">Advanced</Badge>
            <Badge color="#06B6D4">15 min</Badge>
            <Badge color="#7C3AED">Performance Track</Badge>
          </div>

          <h1 className="text-5xl font-bold font-display leading-tight mb-3">
            ⚡ Cluster vs{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
            >
              Worker Threads
            </span>
          </h1>
          <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-2xl">
            Node.js ko multiple cores pe scale karna — kab kaunsa use karein. Ye decision tumhare
            server ki performance define karta hai.
          </p>
        </div>
      </div>

      {/* ── Lesson body ── */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-14">

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — HOOK
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Pehle Samjho — Problem Statement</SectionLabel>
          <div
            className="rounded-2xl border p-7"
            style={{
              background: 'rgba(245,158,11,0.06)',
              borderColor: 'rgba(245,158,11,0.25)',
            }}
          >
            <p className="text-lg font-semibold text-[#F5F5F7] mb-3">
              8-core machine pe sirf 1 core use ho raha hai?
            </p>
            <p className="text-[#A1A1AA] leading-relaxed mb-4">
              Node.js single-threaded hai. Tumhara server ek 8-core machine pe chal raha hai —
              lekin sirf <strong className="text-[#F5F5F7]">1 core use ho raha hai!</strong> Baaki 7
              cores idle hain. Ye waste hai — tumhara server apni full capacity pe nahi chal raha.
            </p>
            <div
              className="rounded-xl p-5 border"
              style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.2)' }}
            >
              <p className="text-[#F59E0B] font-semibold mb-1">Solution: Cluster ya Worker Threads?</p>
              <p className="text-[#A1A1AA] leading-relaxed">
                Dono alag problems solve karte hain. Galat choice karna matlab performance overhead
                bina benefit ke. Ye visualization woh decision clear karta hai — once and for all.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — CPU-BOUND VS I/O-BOUND
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>The Fundamental Distinction — CPU vs I/O Bound</SectionLabel>
          <p className="text-[#A1A1AA] mb-5 leading-relaxed">
            Cluster aur Worker Threads samajhne se pehle ye samjho — kyunki ye decision issi pe based hai:
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {/* I/O Bound */}
            <div
              className="rounded-2xl border p-6"
              style={{
                background: 'rgba(16,185,129,0.06)',
                borderColor: 'rgba(16,185,129,0.25)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(16,185,129,0.15)' }}
                >
                  <span className="text-xl">🌐</span>
                </div>
                <div>
                  <p className="font-bold text-[#10B981]">I/O-Bound Tasks</p>
                  <p className="text-xs text-[#71717A]">Event loop naturally handles</p>
                </div>
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
                Waiting for external resources — network, disk, database. CPU idle rehta hai is time.
                Event loop naturally handle karta hai — async/await ke saath.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {['🗄️ DB query', '📁 File read', '🌐 API call', '📧 Email send'].map((ex) => (
                  <div
                    key={ex}
                    className="rounded-lg px-3 py-2 text-xs text-[#10B981]"
                    style={{ background: 'rgba(16,185,129,0.1)' }}
                  >
                    {ex}
                  </div>
                ))}
              </div>
              <div
                className="mt-4 rounded-lg px-3 py-2 text-xs"
                style={{ background: 'rgba(16,185,129,0.08)', color: '#10B981' }}
              >
                ✅ No cluster/workers needed — async/await kafi hai
              </div>
            </div>

            {/* CPU Bound */}
            <div
              className="rounded-2xl border p-6"
              style={{
                background: 'rgba(239,68,68,0.06)',
                borderColor: 'rgba(239,68,68,0.25)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.15)' }}
                >
                  <span className="text-xl">🔥</span>
                </div>
                <div>
                  <p className="font-bold text-[#EF4444]">CPU-Bound Tasks</p>
                  <p className="text-xs text-[#71717A]">Main thread BLOCKS</p>
                </div>
              </div>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
                Heavy computation — CPU continuously kaam karta rehta hai. Event loop block ho jaata
                hai. Baaki requests queue mein wait karti hain. Server unresponsive lagta hai.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {['🖼️ Image resize', '🔐 bcrypt (r12+)', '📊 Big data parse', '🤖 ML inference'].map((ex) => (
                  <div
                    key={ex}
                    className="rounded-lg px-3 py-2 text-xs text-[#EF4444]"
                    style={{ background: 'rgba(239,68,68,0.1)' }}
                  >
                    {ex}
                  </div>
                ))}
              </div>
              <div
                className="mt-4 rounded-lg px-3 py-2 text-xs"
                style={{ background: 'rgba(239,68,68,0.08)', color: '#EF4444' }}
              >
                ⚠️ Worker Threads use karo — main thread free rakho
              </div>
            </div>
          </div>

          {/* Decision callout */}
          <div
            className="rounded-xl border p-5 flex gap-4"
            style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.2)' }}
          >
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="text-[#7C3AED] font-semibold mb-1">Decision Rule</p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                <strong className="text-[#F5F5F7]">I/O-bound?</strong> Event loop + async/await — kuch nahi chahiye.{' '}
                <strong className="text-[#F5F5F7]">HTTP load scaling?</strong> Cluster (or PM2).{' '}
                <strong className="text-[#F5F5F7]">CPU-heavy task?</strong> Worker Threads. Ye teen cases yaad karo.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4 — COMPARISON TABLE
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Cluster vs Worker Threads — Side by Side</SectionLabel>
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {/* Header row */}
            <div
              className="grid grid-cols-3 border-b"
              style={{ background: '#12121A', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="px-5 py-4 text-xs font-mono text-[#71717A] uppercase tracking-wider">
                Feature
              </div>
              <div
                className="px-5 py-4 text-xs font-mono font-bold text-center"
                style={{ color: '#7C3AED', background: 'rgba(124,58,237,0.06)' }}
              >
                Cluster
              </div>
              <div
                className="px-5 py-4 text-xs font-mono font-bold text-center"
                style={{ color: '#06B6D4', background: 'rgba(6,182,212,0.06)' }}
              >
                Worker Threads
              </div>
            </div>

            {/* Data rows */}
            {[
              {
                feature: 'Multiple processes?',
                cluster: { val: '✅ Yes (fork)', good: true },
                worker: { val: '❌ No (threads)', good: false },
              },
              {
                feature: 'Memory isolation',
                cluster: { val: '✅ Separate memory', good: true },
                worker: { val: '⚠️ Shared possible', good: null },
              },
              {
                feature: 'Communication',
                cluster: { val: 'IPC (slower)', good: null },
                worker: { val: 'MessageChannel (fast)', good: true },
              },
              {
                feature: 'Best for',
                cluster: { val: 'HTTP servers', good: true },
                worker: { val: 'CPU-heavy tasks', good: true },
              },
              {
                feature: 'Shared state',
                cluster: { val: '❌ No sharing', good: null },
                worker: { val: '✅ SharedArrayBuffer', good: true },
              },
              {
                feature: 'Uses internally',
                cluster: { val: 'child_process.fork', good: null },
                worker: { val: 'worker_threads module', good: null },
              },
              {
                feature: 'PM2 support',
                cluster: { val: '✅ pm2 -i max', good: true },
                worker: { val: 'Manual setup', good: null },
              },
            ].map((row, i) => (
              <div
                key={row.feature}
                className="grid grid-cols-3 border-b transition-colors"
                style={{
                  borderColor: 'rgba(255,255,255,0.05)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                }}
              >
                <div className="px-5 py-4 text-sm text-[#A1A1AA]">{row.feature}</div>
                <div
                  className="px-5 py-4 text-sm text-center font-mono"
                  style={{
                    color: row.cluster.good === true ? '#10B981' : row.cluster.good === false ? '#EF4444' : '#A1A1AA',
                    background: 'rgba(124,58,237,0.03)',
                  }}
                >
                  {row.cluster.val}
                </div>
                <div
                  className="px-5 py-4 text-sm text-center font-mono"
                  style={{
                    color: row.worker.good === true ? '#10B981' : row.worker.good === false ? '#EF4444' : '#A1A1AA',
                    background: 'rgba(6,182,212,0.03)',
                  }}
                >
                  {row.worker.val}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 5 — HIGHWAY ANALOGY
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>8-Lane Highway Analogy — Yaad Rakhne Ka Tarika 🛣️</SectionLabel>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                emoji: '🏗️',
                color: '#7C3AED',
                title: 'Cluster = 8 Separate Roads',
                points: [
                  'Har worker process ek alag road hai',
                  'Cars (requests) apne lane mein independent chalte hain',
                  'Ek road band ho toh dusra chal raha hai — crash isolated',
                  'Traffic cop (load balancer) cars distribute karta hai',
                  'Bottleneck: har road ko ek CPU core chahiye',
                ],
              },
              {
                emoji: '🛣️',
                color: '#06B6D4',
                title: 'Worker Threads = 1 Highway, 8 Lanes',
                points: [
                  'Ek process, multiple threads — ek hi highway',
                  'Threads memory share kar sakte hain — risky but fast',
                  'Ek thread crash → poora process crash risk',
                  'MessageChannel se lanes baat karte hain — fast',
                  'CPU-heavy tasks off main lane move hoti hain',
                ],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border p-6"
                style={{ background: `${item.color}08`, borderColor: `${item.color}25` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{item.emoji}</span>
                  <p className="font-semibold text-[#F5F5F7]">{item.title}</p>
                </div>
                <ul className="space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-[#A1A1AA]">
                      <span style={{ color: item.color }} className="flex-shrink-0 mt-0.5">
                        →
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 6 — STEP-BY-STEP INSTRUCTIONS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Step-by-Step Instructions — Visualization Use Karo</SectionLabel>
          <div
            className="rounded-2xl border p-7"
            style={{ background: '#12121A', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <p className="text-[#F5F5F7] font-semibold mb-5">
              Ye order follow karo — dono tools ka fark clearly samajh aayega:
            </p>
            <ol className="space-y-4">
              {[
                {
                  step: 1,
                  text: 'Left side: Cluster dekho',
                  detail: 'Multiple process boxes visible hain — har ek alag OS process hai with own memory.',
                  color: '#7C3AED',
                },
                {
                  step: 2,
                  text: 'Right side: Worker Threads dekho',
                  detail: 'Ek process box — andar multiple threads. Memory shared hai, processes alag nahi.',
                  color: '#06B6D4',
                },
                {
                  step: 3,
                  text: '"Send 100 HTTP Requests" dabao',
                  detail: 'Dekho requests kaise distribute hoti hain cluster workers mein — round-robin.',
                  color: '#10B981',
                },
                {
                  step: 4,
                  text: 'Request distribution notice karo',
                  detail: 'Cluster mein: Worker 1 → Worker 2 → Worker 3... equally. No single worker overloaded.',
                  color: '#F59E0B',
                },
                {
                  step: 5,
                  text: '"CPU-Heavy Task" dabao',
                  detail: 'WITHOUT workers: main thread freezes — red indicator. Koi request respond nahi kar sakti.',
                  color: '#EF4444',
                },
                {
                  step: 6,
                  text: 'With Worker Threads scenario dekho',
                  detail: 'CPU task worker thread pe hai — main thread green rehta hai. Requests normally handle hote hain.',
                  color: '#10B981',
                },
              ].map((item) => (
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
            SECTION 7 — THE VISUALIZATION
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
              <span className="text-xs font-mono text-[#A1A1AA]">
                Cluster vs Worker Threads — Live Visualization
              </span>
            </div>
            <div className="p-2 md:p-4" style={{ background: '#0A0A0F' }}>
              <ClusterWorkersVisualizer />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 8 — EXPERIMENTS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Try Karo — 2 Experiments</SectionLabel>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Experiment 1 */}
            <div
              className="rounded-2xl border p-6"
              style={{
                background: 'rgba(124,58,237,0.05)',
                borderColor: 'rgba(124,58,237,0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(124,58,237,0.15)', color: '#7C3AED' }}
                >
                  Experiment 1
                </span>
                <span className="text-sm font-semibold text-[#F5F5F7]">HTTP Load Distribution</span>
              </div>
              <div className="space-y-3">
                {[
                  {
                    label: '100 requests send karo',
                    text: 'Dekho — requests evenly distribute hote hain cluster workers mein.',
                    color: '#7C3AED',
                  },
                  {
                    label: 'Round-robin pattern notice karo',
                    text: 'Worker 1 → 2 → 3 → 1 → 2... Koi worker overloaded nahi.',
                    color: '#06B6D4',
                  },
                  {
                    label: 'Production reality',
                    text: 'PM2 cluster mode ye automatically karta hai: pm2 start app.js -i max',
                    color: '#10B981',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <div
                      className="w-1 rounded-full flex-shrink-0"
                      style={{ background: item.color }}
                    />
                    <div>
                      <p className="text-xs font-semibold" style={{ color: item.color }}>
                        {item.label}
                      </p>
                      <p className="text-xs text-[#A1A1AA]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiment 2 */}
            <div
              className="rounded-2xl border p-6"
              style={{
                background: 'rgba(239,68,68,0.05)',
                borderColor: 'rgba(239,68,68,0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-xs font-mono font-bold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444' }}
                >
                  Experiment 2
                </span>
                <span className="text-sm font-semibold text-[#F5F5F7]">CPU Blocking Demo</span>
              </div>
              <div className="space-y-3">
                {[
                  {
                    label: 'Without workers — main thread blocks',
                    text: 'Red indicator — koi request respond nahi kar sakti jab tak task done nahi.',
                    color: '#EF4444',
                  },
                  {
                    label: 'With Worker Threads — main free',
                    text: 'Green indicator — CPU task alag thread pe, main thread requests handle karta rehta hai.',
                    color: '#10B981',
                  },
                  {
                    label: 'Real-world implication',
                    text: 'Isliye Node.js CPU-intensive ML models ke liye directly use nahi hota — Worker Threads + Python bridge.',
                    color: '#F59E0B',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <div
                      className="w-1 rounded-full flex-shrink-0"
                      style={{ background: item.color }}
                    />
                    <div>
                      <p className="text-xs font-semibold" style={{ color: item.color }}>
                        {item.label}
                      </p>
                      <p className="text-xs text-[#A1A1AA]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 9 — KEY TAKEAWAYS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Key Takeaways — Ye 3 Cheezein Yaad Rakho</SectionLabel>
          <div className="space-y-4">
            {[
              {
                num: '01',
                color: '#7C3AED',
                heading: 'Cluster = Multiple processes — HTTP servers ke liye',
                body: 'All CPU cores use ho jaate hain. PM2 cluster mode ye automatically handle karta hai — manually likhne ki zaroorat nahi. pm2 start app.js -i max karo aur sab cores use honge.',
              },
              {
                num: '02',
                color: '#06B6D4',
                heading: 'Worker Threads = CPU tasks off main thread',
                body: 'Image processing, heavy computation, bcrypt with high rounds — ye sab Worker Threads mein karo. Main thread free rehta hai requests handle karne ke liye.',
              },
              {
                num: '03',
                color: '#10B981',
                heading: 'Most apps ko Worker Threads ki zaroorat nahi',
                body: 'Agar tumhara app mostly DB queries, API calls, file reads karta hai — event loop naturally handle karta hai. Cluster for HTTP scaling, Worker Threads sirf CPU tasks ke liye.',
              },
            ].map((item) => (
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
            SECTION 10 — COMMON CONFUSION
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Common Confusion — Myths Clear Karo</SectionLabel>
          <div className="space-y-4">
            {[
              {
                wrong: 'Node.js single-threaded hai toh scale nahi kar sakta',
                right: 'Cluster se all CPU cores use hoti hain. Netflix, LinkedIn — dono Node.js use karte hain at massive scale. Single-threaded = event loop, not limited cores.',
              },
              {
                wrong: 'Worker Threads se sab kuch fast ho jaata hai',
                right: 'Sirf CPU-bound tasks ke liye. I/O-bound tasks ke liye Worker Threads overhead add karte hain bina benefit ke — thread creation + communication cost hoti hai.',
              },
              {
                wrong: 'Manually cluster code likhna padta hai',
                right: 'PM2 cluster mode automatically karta hai: pm2 start app.js -i max. Production mein typically PM2 use hota hai, manual cluster code nahi.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="px-5 py-3 flex items-start gap-3"
                  style={{ background: 'rgba(239,68,68,0.08)' }}
                >
                  <span className="text-[#EF4444] font-bold flex-shrink-0">❌</span>
                  <p className="text-sm text-[#EF4444]">{item.wrong}</p>
                </div>
                <div
                  className="px-5 py-3 flex items-start gap-3"
                  style={{ background: 'rgba(16,185,129,0.06)' }}
                >
                  <span className="text-[#10B981] font-bold flex-shrink-0">✅</span>
                  <p className="text-sm text-[#A1A1AA]">{item.right}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 11 — CODE CONNECTION
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Code Connection — Real Implementation</SectionLabel>
          <p className="text-[#A1A1AA] mb-5 leading-relaxed">
            Visualization mein jo dekha, wahi code mein kaise likhte hain:
          </p>

          {/* Cluster code */}
          <div
            className="rounded-2xl border overflow-hidden mb-4"
            style={{ borderColor: 'rgba(124,58,237,0.2)' }}
          >
            <div
              className="px-5 py-3 border-b flex items-center justify-between"
              style={{ background: '#12121A', borderColor: 'rgba(124,58,237,0.15)' }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-xs font-mono text-[#71717A]">cluster.js</span>
              </div>
              <Badge color="#7C3AED">Cluster — HTTP Scaling</Badge>
            </div>
            <pre
              className="p-6 text-sm font-mono leading-relaxed overflow-x-auto"
              style={{ background: '#0D0D14', color: '#A1A1AA' }}
            >
              <code>{`// Cluster — distribute HTTP load across CPU cores
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  // Master process — fork workers
  for (let i = 0; i < numCPUs; i++) cluster.fork();
  cluster.on('exit', (worker) => cluster.fork()); // auto-restart
} else {
  // Worker process — actual HTTP server
  app.listen(3000);
}

// PM2 shortcut: pm2 start app.js -i max (automatic cluster!)`}</code>
            </pre>
          </div>

          {/* Worker Threads code */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: 'rgba(6,182,212,0.2)' }}
          >
            <div
              className="px-5 py-3 border-b flex items-center justify-between"
              style={{ background: '#12121A', borderColor: 'rgba(6,182,212,0.15)' }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-xs font-mono text-[#71717A]">worker-threads.js</span>
              </div>
              <Badge color="#06B6D4">Worker Threads — CPU Tasks</Badge>
            </div>
            <pre
              className="p-6 text-sm font-mono leading-relaxed overflow-x-auto"
              style={{ background: '#0D0D14', color: '#A1A1AA' }}
            >
              <code>{`// Worker Threads — CPU-heavy task off main thread
const { Worker } = require('worker_threads');

app.post('/resize-image', async (req, res) => {
  const result = await new Promise((resolve, reject) => {
    const worker = new Worker('./image-worker.js', {
      workerData: req.body.imageBuffer
    });
    worker.on('message', resolve);
    worker.on('error', reject);
  });
  res.json({ processed: result });
  // Main thread NEVER blocked!
});`}</code>
            </pre>
          </div>

          {/* Code annotations */}
          <div className="grid md:grid-cols-2 gap-3 mt-4">
            {[
              {
                color: '#7C3AED',
                label: 'cluster.fork()',
                note: 'New OS process create karta hai — full isolation, separate memory.',
              },
              {
                color: '#06B6D4',
                label: 'new Worker()',
                note: 'Same process mein new thread — CPU task off main thread. Fast communication.',
              },
            ].map((ann) => (
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
            SECTION 12 — NEXT STEPS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel>Next Steps — Aage Kya Seekho</SectionLabel>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: '⚡',
                title: 'Worker Threads Chapter',
                desc: 'In-depth Worker Threads — worker pools, SharedArrayBuffer, real-world patterns',
                href: '/course/worker-threads',
                color: '#7C3AED',
                label: 'Chapter dekho →',
              },
              {
                icon: '📊',
                title: 'Performance Chapter',
                desc: 'Profiling, bottleneck identification, memory leaks, CPU optimization in Node.js',
                href: '/course/performance-profiling',
                color: '#06B6D4',
                label: 'Chapter dekho →',
              },
            ].map((next) => (
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
                  <span
                    className="text-xs font-semibold"
                    style={{ color: next.color }}
                  >
                    {next.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Back to all */}
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
