import Link from 'next/link'
import EventLoopVisualizer from '@/components/visualizations/EventLoopVisualizer'

export const metadata = {
  title: 'Event Loop Visualizer — NodeMaster',
  description:
    'Node.js Event Loop ka complete guided visualization. Samjho kaise Call Stack, Microtasks, aur Macrotasks ek saath kaam karte hain.',
}

// ─── color-coded lines for the code demo ───────────────────────────────────
const CODE_LINES: { text: string; color?: string }[] = [
  { text: "console.log('A');           // 1st: sync — seedha execute", color: '#10B981' },
  { text: '' },
  { text: "setTimeout(() => {" },
  { text: "  console.log('D');         // macrotask queue", color: '#06B6D4' },
  { text: '}, 0);' },
  { text: '' },
  { text: 'Promise.resolve()' },
  { text: '  .then(() => {' },
  { text: "    console.log('C');       // microtask queue", color: '#7C3AED' },
  { text: '  });' },
  { text: '' },
  { text: "console.log('B');           // 2nd: sync — seedha execute", color: '#10B981' },
  { text: '' },
  { text: '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', color: '#71717A' },
  { text: '// OUTPUT ORDER:  A  →  B  →  C  →  D', color: '#F59E0B' },
  { text: '// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', color: '#71717A' },
  { text: '//', color: '#71717A' },
  { text: '// A, B  →  sync  (Call Stack, seedha execute)', color: '#71717A' },
  { text: '// C     →  microtask (Promise.then) — higher priority', color: '#71717A' },
  { text: '// D     →  macrotask (setTimeout)   — lower priority', color: '#71717A' },
  { text: '//', color: '#71717A' },
  { text: "// Chahe D ka timeout 0ms ho — C ke BAAD hi chalega.", color: '#71717A' },
  { text: '// YE EVENT LOOP KA SABSE IMPORTANT RULE HAI.', color: '#EF4444' },
]

export default function EventLoopPage() {
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
            <span className="text-[#F5F5F7]">Event Loop</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">⚙️</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              Event Loop Visualizer
            </h1>
          </div>

          <p className="text-[#A1A1AA] text-lg mb-5 max-w-2xl">
            Node.js ka dil — live dekho kaise async code actually execute hota hai, step by step.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#F59E0B', borderColor: 'rgba(245,158,11,0.4)', background: 'rgba(245,158,11,0.08)' }}
            >
              ⚡ Intermediate
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#A1A1AA', borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
            >
              🕐 ~15 minutes
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#10B981', borderColor: 'rgba(16,185,129,0.4)', background: 'rgba(16,185,129,0.08)' }}
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
                Event Loop Node.js ka sabse important concept hai.
              </span>{' '}
              Iske bina tum async code ke bugs kabhi fix nahi kar paoge — aur ye bugs production mein
              subtly wrong behavior create karte hain jo reproduce karna bhi mushkil hota hai.
            </p>
            <p className="text-base leading-relaxed">
              Sab log{' '}
              <code
                className="px-1.5 py-0.5 rounded text-sm font-mono"
                style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}
              >
                setTimeout(fn, 0)
              </code>{' '}
              likhte hain expecting immediate execution. Aur phir confused hote hain jab Promise pehle
              run hota hai.{' '}
              <span className="font-semibold">
                Ye visualization ye confusion hamesha ke liye khatam kar dega.
              </span>
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
                { label: 'Basic JavaScript', href: '/javascript/js-what-why' },
                { label: 'Promises Basics', href: '/course/promises' },
                { label: 'async / await', href: '/course/async-await' },
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
            <span className="text-2xl">🍳</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#7C3AED' }}>
                Real World Analogy — Restaurant Kitchen
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Event loop ko restaurant ki kitchen ki tarah socho
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: '👨‍🍳',
                title: 'Chef (JavaScript Engine)',
                subtitle: 'Single Thread',
                desc: 'Ek hi chef hai jo ek kaam ek time par karta hai. Do kaam simultaneously nahi ho sakte — ye JavaScript ka single-threaded nature hai.',
                color: '#F5F5F7',
                bg: 'rgba(245,245,247,0.04)',
                border: 'rgba(245,245,247,0.1)',
              },
              {
                icon: '📋',
                title: 'Orders Board (Call Stack)',
                subtitle: 'Current Tasks',
                desc: 'Jab chef ek order pick karta hai — woh Call Stack mein aata hai. Done hone par stack se hata diya jaata hai. Ek time par sirf ek order.',
                color: '#06B6D4',
                bg: 'rgba(6,182,212,0.06)',
                border: 'rgba(6,182,212,0.2)',
              },
              {
                icon: '🔔',
                title: 'Expediter (Event Loop)',
                subtitle: 'The Coordinator',
                desc: 'Expediter check karta rehta hai — "Kya chef free hai? Koi order ready hai?" Jab Call Stack empty ho — queues check karta hai.',
                color: '#7C3AED',
                bg: 'rgba(124,58,237,0.06)',
                border: 'rgba(124,58,237,0.2)',
              },
              {
                icon: '🏭',
                title: 'Back Kitchen (libuv)',
                subtitle: 'Background Workers',
                desc: 'Slow kaam — file padhna, network request — back kitchen bhej dete hain. Chef ka time waste nahi hota. Jab ready hoga tab expediter ko notify karega.',
                color: '#F59E0B',
                bg: 'rgba(245,158,11,0.06)',
                border: 'rgba(245,158,11,0.2)',
              },
              {
                icon: '🚪',
                title: 'Ready Shelf (Task Queues)',
                subtitle: 'Callbacks Waiting',
                desc: 'Jab back kitchen ka kaam done hota hai — result ready shelf (queue) pe aata hai. Event Loop check karta hai aur chef ko execute karne ke liye deta hai.',
                color: '#10B981',
                bg: 'rgba(16,185,129,0.06)',
                border: 'rgba(16,185,129,0.2)',
              },
              {
                icon: '⭐',
                title: 'VIP Orders (Microtasks)',
                subtitle: 'Highest Priority',
                desc: 'Kuch orders VIP hote hain — Promises aur nextTick — ye normal queue skip karte hain. Jab chef free ho — VIP pehle serve hote hain. Hamesha.',
                color: '#EF4444',
                bg: 'rgba(239,68,68,0.06)',
                border: 'rgba(239,68,68,0.2)',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border p-4"
                style={{ background: card.bg, borderColor: card.border }}
              >
                <div className="text-2xl mb-2">{card.icon}</div>
                <div className="font-semibold text-sm mb-0.5" style={{ color: card.color }}>
                  {card.title}
                </div>
                <div
                  className="text-[10px] font-mono uppercase tracking-wider mb-2"
                  style={{ color: card.color, opacity: 0.65 }}
                >
                  {card.subtitle}
                </div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 4: Color Legend ───────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🎨</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Color Legend</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Har color ek alag type ka operation — pahchanoge toh animation mein easily track kar paoge
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                color: '#F5F5F7',
                label: 'White / Light — Synchronous Code',
                hindi: '"Jo abhi chal raha hai"',
                detail: 'Call Stack mein directly execute hone wala code — console.log(), functions, etc.',
              },
              {
                color: '#EF4444',
                label: 'Red — process.nextTick()',
                hindi: '"Highest priority — SABSE PEHLE"',
                detail: 'Kisi bhi microtask ya macrotask se pehle run hota hai. Node.js specific hai.',
              },
              {
                color: '#7C3AED',
                label: 'Purple — Promises (.then / async-await)',
                hindi: '"Microtasks — sync ke baad, setTimeout se pehle"',
                detail: 'Sync clear hone ke baad, macrotasks se PEHLE. Promise.resolve().then() yahan aata hai.',
              },
              {
                color: '#06B6D4',
                label: 'Cyan — setTimeout / setInterval',
                hindi: '"Macrotasks — sabse baad mein"',
                detail: 'Microtasks clear hone ke BAAD. setTimeout(fn, 0) bhi yahi priority milti hai.',
              },
              {
                color: '#F59E0B',
                label: 'Amber — I/O Callbacks',
                hindi: '"Background kaam ka result"',
                detail: 'File read, network request complete hone ke baad jo callback aata hai — woh yahan aata hai.',
              },
              {
                color: '#10B981',
                label: 'Green — setImmediate',
                hindi: '"I/O ke baad, check phase mein"',
                detail: 'I/O callbacks ke baad run hota hai. I/O context mein setTimeout(fn, 0) se pehle.',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0"
                  style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60` }}
                />
                <div>
                  <div className="text-sm font-semibold text-[#F5F5F7]">{item.label}</div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: item.color }}>
                    {item.hindi}
                  </div>
                  <div className="text-xs text-[#71717A] mt-1 leading-relaxed">{item.detail}</div>
                </div>
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
                Neeche ki visualization ko in steps ke saath use karo for maximum learning
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: '🎯', step: 1, color: '#7C3AED',
                title: 'Scenario Chuno',
                desc: 'Left panel mein dropdown se ek scenario select karo. "Sync Only" se shuru karo — ye sabse simple hai. Ek kaam ek baar complete karo.',
              },
              {
                icon: '🐢', step: 2, color: '#06B6D4',
                title: 'Speed Slow Karo',
                desc: 'Speed slider bilkul left pe rakho (0.25x ya 0.5x). Beginner ke liye slow hi best hai — har token ko carefully dekh paoge.',
              },
              {
                icon: '▶️', step: 3, color: '#10B981',
                title: 'Run Dabao',
                desc: 'Green "Run" button dabao. Animation shuru hogi. Dekho colored circles kahan jaate hain — wahi tumhara execution path hai.',
              },
              {
                icon: '👀', step: 4, color: '#F59E0B',
                title: 'Token Follow Karo',
                desc: 'Colored circle (token) = current operation. Woh Call Stack se queue mein jaata hai, phir wapas execute hone ke liye aata hai. Ye journey samjhna sabse important hai.',
              },
              {
                icon: '📖', step: 5, color: '#EF4444',
                title: 'Explanation Padhte Jao',
                desc: 'Har step pe neeche Hinglish mein explanation aata hai. ZAROOR padhna — ye buttons se zyada important hai. Ye batata hai KYA ho raha hai aur KYUN.',
              },
              {
                icon: '⏸️', step: 6, color: '#A1A1AA',
                title: 'Pause Karo Jab Confusion Ho',
                desc: 'Pause button se rok sakte ho kabhi bhi. Step-by-step mode mein ek ek operation manually advance kar sakte ho.',
              },
              {
                icon: '🔄', step: 7, color: '#7C3AED',
                title: 'Sab Scenarios Try Karo',
                desc: '"Promise vs setTimeout" aur "nextTick Priority" scenarios ZAROOR dekho — ye woh cheezein hain jo interviews mein puchhi jaati hain.',
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
            <span className="ml-2 text-sm text-[#71717A] font-mono">event-loop-visualizer.js</span>
          </div>
          <EventLoopVisualizer />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── SECTION 7: Try Karo Ye Experiments — 3 cards ────────────────── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🧪</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Try Karo Ye Experiments</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Ye teen experiments karo — in order. Har ek kuch naya sikhayega.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: '01',
                title: 'Sync vs Async ka Fark',
                color: '#06B6D4',
                bg: 'rgba(6,182,212,0.06)',
                border: 'rgba(6,182,212,0.25)',
                setup: [
                  'Scenario: "Sync Only" chuno',
                  'Speed: 0.5x pe rakho',
                  'Run karo aur dekho',
                ],
                notice: 'Koi queue nahi, koi wait nahi — sab kuch Call Stack mein seedha execute hota hai.',
                insight: 'Sync code linear aur predictable hai — Event Loop involved hi nahi hota!',
              },
              {
                num: '02',
                title: 'Promise ka Magic',
                color: '#7C3AED',
                bg: 'rgba(124,58,237,0.06)',
                border: 'rgba(124,58,237,0.25)',
                setup: [
                  'Scenario: "Promise vs setTimeout" chuno',
                  'Dhyan se dekho konsa pehle aata hai',
                  '2-3 baar repeat karo',
                ],
                notice: 'Purple (Promise) HAMESHA cyan (setTimeout) se pehle aata hai — chahe dono ek saath start ho.',
                insight: 'Microtasks > Macrotasks — ye rule kabhi break nahi hota. Interview gold!',
              },
              {
                num: '03',
                title: 'nextTick ka Secret',
                color: '#EF4444',
                bg: 'rgba(239,68,68,0.06)',
                border: 'rgba(239,68,68,0.25)',
                setup: [
                  'Scenario: "nextTick Priority" chuno',
                  'Speed: 0.25x karo (bahut slow)',
                  'Output order carefully dekho',
                ],
                notice: 'Red (nextTick) sabse pehle — even Promise se pehle! Ye MOST asked interview question hai.',
                insight: 'nextTick Promise se bhi zyada priority pe hai — bahut kam log ye jaante hain.',
              },
            ].map((exp) => (
              <div
                key={exp.num}
                className="rounded-2xl border p-5 flex flex-col"
                style={{ background: exp.bg, borderColor: exp.border }}
              >
                <div
                  className="text-4xl font-black mb-3 opacity-25 select-none"
                  style={{ color: exp.color }}
                >
                  {exp.num}
                </div>
                <h3 className="text-base font-bold mb-3" style={{ color: exp.color }}>
                  {exp.title}
                </h3>

                <div className="mb-4">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] mb-2">
                    Setup
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
                Agar sirf teen cheezein yaad kar sako event loop ke baare mein — ye teen hain.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                num: '1',
                heading: 'Sync Code HAMESHA Pehle',
                body: 'Call Stack mein jo synchronous code hai woh pehle pura execute hota hai. Koi queue nahi dekhi jaati jab tak Call Stack empty nahi ho jaati. Ye fundamental rule hai.',
              },
              {
                num: '2',
                heading: 'Microtasks > Macrotasks',
                body: 'Promise.then() HAMESHA setTimeout(fn, 0) se pehle chalega — chahe timeout 0ms ho. Ye guarantee hai. Promises microtask queue mein hain jo macrotask queue se higher priority pe hai.',
              },
              {
                num: '3',
                heading: 'nextTick = Highest Priority',
                body: 'process.nextTick() even Promises se pehle chalti hai. Ye Node.js specific feature hai (browser mein nahi hota). Bahut kam log ye jaante hain — ab tum jaante ho.',
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

        {/* ── SECTION 9: Common Confusion — misconceptions ──────────────────── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🚫</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">
                Common Confusion — Ye Galat Fehmiyan Saaf Karo
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Ye teen misconceptions sabse common hain. Ek ek karke saaf karte hain.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                wrong: 'setTimeout(fn, 0) matlab immediate execution',
                right:
                  '0ms timeout bhi macrotask queue mein jaata hai — sync code aur saari microtasks complete hone ke BAAD hi chalega. "0ms" sirf minimum delay hai, guaranteed immediate nahi.',
              },
              {
                wrong: 'async/await execution ko block karta hai',
                right:
                  'await sirf current async function ko pause karta hai — baaki ka program (event loop) continue karta rehta hai. Ye non-blocking hai. Isliye Node.js ek saath hazaron requests handle kar sakta hai.',
              },
              {
                wrong: 'Event loop ek loop hai jo bahut fast chalta rehta hai',
                right:
                  'Event loop intelligent hai — jab koi kaam nahi hota, woh wait karta hai (sleep state). CPU waste nahi karta. Sirf jab koi task ready hota hai tab hi action leta hai.',
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

        {/* ── SECTION 10: Real Code Mein Kaise Dikhta Hai ──────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">💻</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Real Code Mein Kaise Dikhta Hai</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Ye classic interview question hai — output kya hoga aur kyun?
              </p>
            </div>
          </div>

          <div
            className="rounded-xl overflow-hidden border"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2.5 border-b"
              style={{ background: '#0A0A0F', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs text-[#71717A] font-mono">output-quiz.js</span>
            </div>
            <div className="p-5 overflow-x-auto" style={{ background: '#0D0D15' }}>
              <pre className="text-sm font-mono leading-7">
                {CODE_LINES.map((line, i) => (
                  <div key={i} style={{ color: line.color ?? '#F5F5F7' }}>
                    {line.text || ' '}
                  </div>
                ))}
              </pre>
            </div>
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
                Event loop samajh aaya? Ab in topics pe jao.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/course/event-loop-deep-dive"
              className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(124,58,237,0.08)',
                borderColor: 'rgba(124,58,237,0.3)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'rgba(124,58,237,0.15)' }}
              >
                📚
              </div>
              <div>
                <div className="font-bold text-[#F5F5F7] group-hover:text-[#7C3AED] transition-colors">
                  Event Loop Chapter Padhna
                </div>
                <div className="text-sm text-[#A1A1AA] mt-0.5">
                  Deep dive into phases, libuv, aur Node.js internals
                </div>
              </div>
              <span className="ml-auto text-[#71717A] group-hover:text-[#7C3AED] transition-colors">→</span>
            </Link>

            <Link
              href="/visualizations/async-timeline"
              className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(6,182,212,0.08)',
                borderColor: 'rgba(6,182,212,0.3)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'rgba(6,182,212,0.15)' }}
              >
                ⚡
              </div>
              <div>
                <div className="font-bold text-[#F5F5F7] group-hover:text-[#06B6D4] transition-colors">
                  Async Timeline Dekho
                </div>
                <div className="text-sm text-[#A1A1AA] mt-0.5">
                  Sequential vs parallel — kitna time bachta hai?
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
