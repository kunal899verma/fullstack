import Link from 'next/link'
import ReactRerenderVisualizer from '@/components/visualizations/ReactRerenderVisualizer'

export const metadata = {
  title: 'React Re-render Visualizer — NodeMaster',
  description:
    'Har React component ka re-render track karo live. Samjho unnecessary renders aur React.memo ka sahi use.',
}

const CODE_LINES: { text: string; color?: string }[] = [
  { text: '// React.memo + useCallback pattern', color: '#6B7280' },
  { text: '' },
  { text: 'const Child3 = React.memo(function Child3({', color: '#10B981' },
  { text: '  onAction,', color: '#F5F5F7' },
  { text: '}: { onAction: () => void }) {', color: '#F5F5F7' },
  { text: '  console.log("Child3 rendered");', color: '#6B7280' },
  { text: '  return <button onClick={onAction}>Go</button>;', color: '#F5F5F7' },
  { text: '});', color: '#10B981' },
  { text: '' },
  { text: 'function Parent() {', color: '#06B6D4' },
  { text: '  const [count, setCount] = useState(0);', color: '#F5F5F7' },
  { text: '' },
  { text: '  // Without useCallback, new fn every render', color: '#EF4444' },
  { text: '  // React.memo wont help!', color: '#EF4444' },
  { text: '  const handleAction = useCallback(() => {', color: '#F59E0B' },
  { text: '    console.log("action!");', color: '#F5F5F7' },
  { text: '  }, []); // stable reference', color: '#F59E0B' },
  { text: '' },
  { text: '  return <Child3 onAction={handleAction} />;', color: '#F5F5F7' },
  { text: '}', color: '#06B6D4' },
  { text: '' },
  { text: '// ── Result ──────────────────────────────', color: '#6B7280' },
  { text: '// Parent re-renders → Child3 skips!', color: '#10B981' },
  { text: '// useCallback keeps fn reference stable', color: '#10B981' },
]

export default function ReactRerenderPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">

      {/* ── SECTION 1: Header ─────────────────────────────────────────────── */}
      <div className="border-b border-[rgba(255,255,255,0.08)] py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-[#A1A1AA] text-sm mb-6">
            <Link href="/visualizations" className="hover:text-[#F5F5F7] transition-colors">
              ← Visualizations
            </Link>
            <span className="text-[#71717A]">/</span>
            <span className="text-[#F5F5F7]">React Re-renders</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">♻️</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              React Re-render Visualizer
            </h1>
          </div>

          <p className="text-[#A1A1AA] text-lg mb-5 max-w-2xl">
            Dekho exactly kaunse components re-render hote hain — aur kaunse nahi hone chahiye the.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#06B6D4', borderColor: 'rgba(6,182,212,0.4)', background: 'rgba(6,182,212,0.08)' }}
            >
              ⚛️ React
            </span>
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
              🕐 ~12 minutes
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

        {/* ── SECTION 2: Why this matters ───────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(6,182,212,0.06)', borderColor: 'rgba(6,182,212,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-xl font-bold" style={{ color: '#06B6D4' }}>
              Pehle Samjho — Ye Kyun Important Hai?
            </h2>
          </div>

          <div className="space-y-4 text-[#F5F5F7]">
            <p className="text-base leading-relaxed">
              <span className="font-semibold" style={{ color: '#06B6D4' }}>
                React apps slow hote hain unnecessary re-renders ki wajah se.
              </span>{' '}
              Lekin zyaadatar developers nahi jaante ki exactly kaunsa component re-render hoga jab state change hoti hai.
              Ye visualizer ye confusion permanently khatam kar deta hai.
            </p>
            <p className="text-base leading-relaxed">
              Ek common trap:{' '}
              <code className="px-1.5 py-0.5 rounded text-sm font-mono" style={{ background: 'rgba(6,182,212,0.15)', color: '#06B6D4' }}>
                Child2
              </code>{' '}
              re-render hota hai even though uske props nahi badle.{' '}
              <span className="font-semibold">Ye &ldquo;wasted render&rdquo; hai — aur React.memo isko rokta hai.</span>
            </p>
          </div>

          <div className="mt-5 pt-5 border-t border-[rgba(6,182,212,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#06B6D4' }}>
              Prerequisites
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'React Basics', href: '/react/react-intro' },
                { label: 'useState Hook', href: '/react/state-usestate' },
                { label: 'Props & Components', href: '/react/components-props' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border transition-colors hover:text-[#F5F5F7]"
                  style={{ color: '#06B6D4', borderColor: 'rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.06)' }}
                >
                  {item.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 3: Analogy ────────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🁣</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#7C3AED' }}>
                Real World Analogy — Domino Effect
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">
                React re-renders ko dominos ki tarah socho
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: '🁣',
                title: 'Domino Chain (No Memo)',
                desc: 'Parent re-renders = ek domino girta hai. Saare children bhi girte hain — chahe unhe koi fark na pade. Ye chain reaction hai jo performance kill karta hai.',
                color: '#EF4444',
                bg: 'rgba(239,68,68,0.06)',
                border: 'rgba(239,68,68,0.2)',
              },
              {
                icon: '🧱',
                title: 'React.memo = Firewall',
                desc: 'React.memo ek firewall hai. Jab domino chain usse mirti hai — woh check karta hai "kya mere props changed?" Nahi changed → chain rok deta hai!',
                color: '#10B981',
                bg: 'rgba(16,185,129,0.06)',
                border: 'rgba(16,185,129,0.2)',
              },
              {
                icon: '⚡',
                title: 'Props Change = Domino Falls',
                desc: 'Agar prop actually change hua — memo bhi re-render karta hai. Ye sahi hai. Memo lazy hai, not invisible.',
                color: '#06B6D4',
                bg: 'rgba(6,182,212,0.06)',
                border: 'rgba(6,182,212,0.2)',
              },
              {
                icon: '🔄',
                title: 'useCallback = Stable Props',
                desc: 'Function props stable rakhne ke liye useCallback use karo. Warna React.memo bhi kaam nahi karega — har render pe naya function = prop changed!',
                color: '#F59E0B',
                bg: 'rgba(245,158,11,0.06)',
                border: 'rgba(245,158,11,0.2)',
              },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border p-4" style={{ background: card.bg, borderColor: card.border }}>
                <div className="text-2xl mb-2">{card.icon}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: card.color }}>{card.title}</div>
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
              <p className="text-sm text-[#A1A1AA] mt-1">Visualizer mein har color ka matlab</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { color: '#06B6D4', label: 'Blue — Re-rendering', desc: 'Ye component abhi render ho raha hai. State ya prop change se triggered.' },
              { color: '#F59E0B', label: 'Orange — Wasted Render', desc: 'Re-render hua but props/state nahi badle. Unnecessary — React.memo se bachao.' },
              { color: '#10B981', label: 'Green — Skipped (memo)', desc: 'React.memo ne props check kiya — unchanged hai. Render skip! Performance win.' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60` }} />
                <div>
                  <div className="text-sm font-semibold text-[#F5F5F7]">{item.label}</div>
                  <div className="text-xs text-[#71717A] mt-1 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 5: How to Use ─────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">📖</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Kaise Use Karein — Step by Step</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">6 steps mein complete re-render samajh aayega</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { step: 1, color: '#06B6D4', icon: '🎯', title: 'React.memo OFF se shuru karo', desc: 'Default state mein shuru karo. Toggle OFF hona chahiye. Ye "worst case" scenario hai.' },
              { step: 2, color: '#7C3AED', icon: '▶️', title: '"Increment Count" dabao', desc: 'Dekho Parent, Child1, Child2, Child3 — sab blue flash karte hain. Render counter increment hota hai sabka.' },
              { step: 3, color: '#F59E0B', icon: '⚠️', title: 'Orange indicators dekho', desc: 'Child2 aur Child3 orange hain — wasted render! Inke props changed nahi the, phir bhi re-render.' },
              { step: 4, color: '#10B981', icon: '🛡️', title: 'React.memo ON karo', desc: 'Toggle ON karo. Ab dobara increment karo. Child3 green ho jaata hai — skipped!' },
              { step: 5, color: '#EF4444', icon: '🔬', title: '"Change Unrelated State" try karo', desc: 'Ye button ek alag state change karta hai. Child1 ka count prop nahi badla — phir bhi re-renders. Observe karo.' },
              { step: 6, color: '#7C3AED', icon: '🔌', title: 'Context toggle try karo', desc: 'Context ON karo aur "Change Context" dabao. Context consumer ke re-renders dekhne ke liye.' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: `${item.color}20`, color: item.color, border: `1.5px solid ${item.color}50` }}>
                  {item.step}
                </div>
                <div className="flex-1">
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

      {/* ── SECTION 6: THE VISUALIZER ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
        <div className="rounded-2xl border overflow-hidden" style={{ background: 'rgba(18,18,26,0.9)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="ml-2 text-sm text-[#71717A] font-mono">react-rerender-visualizer.tsx</span>
          </div>
          <div className="p-6">
            <ReactRerenderVisualizer />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── SECTION 7: Experiments ────────────────────────────────────────── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🧪</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Try Karo Ye Experiments</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Ye teen experiments karo in order</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: '01', title: 'Without vs With Memo',
                color: '#06B6D4', bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.25)',
                setup: ['Memo OFF karo', '5 baar Increment karo', 'Sab counters note karo', 'Ab Memo ON karo', 'Phir 5 baar Increment karo'],
                notice: 'With memo ON: Child3 ka render counter zero pe ruka. Without memo: har click pe badhta tha.',
                insight: 'React.memo ek powerful optimization — lekin sirf tab use karo jab zarurat ho.',
              },
              {
                num: '02', title: 'Unrelated State Change',
                color: '#F59E0B', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.25)',
                setup: ['Memo OFF karo', '"Change Unrelated State" dabao', 'Child1 observe karo', 'Child1 ka prop changed nahi — wasted!'],
                notice: 'Child1 ko count prop milta hai. Unrelated state change se count nahi badla. Phir bhi re-render hua!',
                insight: 'Parent re-render = ALL children re-render by default. Props change nahi bhi hue toh bhi.',
              },
              {
                num: '03', title: 'Context Consumer',
                color: '#7C3AED', bg: 'rgba(124,58,237,0.06)', border: 'rgba(124,58,237,0.25)',
                setup: ['Context toggle ON karo', '"Change Context" dabao', 'Sirf ContextConsumer re-renders', 'Baaki children ke saath compare karo'],
                notice: 'Context change se sirf direct consumers re-render hote hain — context tree ke through selective update.',
                insight: 'Context bahut saare consumers pe re-renders cause karta hai. Overuse se performance issues.',
              },
            ].map((exp) => (
              <div key={exp.num} className="rounded-2xl border p-5 flex flex-col" style={{ background: exp.bg, borderColor: exp.border }}>
                <div className="text-4xl font-black mb-3 opacity-25 select-none" style={{ color: exp.color }}>{exp.num}</div>
                <h3 className="text-base font-bold mb-3" style={{ color: exp.color }}>{exp.title}</h3>
                <div className="mb-4">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] mb-2">Setup</p>
                  <ol className="space-y-1">
                    {exp.setup.map((s, i) => (
                      <li key={i} className="text-xs text-[#A1A1AA] flex items-start gap-2">
                        <span style={{ color: exp.color }}>{i + 1}.</span>{s}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="mt-auto space-y-2">
                  <div className="rounded-lg p-3" style={{ background: `${exp.color}12`, border: `1px solid ${exp.color}30` }}>
                    <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: exp.color }}>Kya Notice Karo</p>
                    <p className="text-xs text-[#F5F5F7] leading-relaxed">{exp.notice}</p>
                  </div>
                  <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] mb-1">Key Insight</p>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">{exp.insight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 8: Key Takeaways ──────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">✅</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#10B981' }}>
                3 Rules of React Re-renders — Hamesha Yaad Rakho
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { num: '1', heading: 'State change → component + ALL descendants re-render', body: 'Koi bhi component ki state badli → woh aur uske saare children (aur unke children) re-render hote hain. Chahe props change hue ho ya nahi. Ye React ka default behavior hai.' },
              { num: '2', heading: 'Props change → child re-renders (even if value same)', body: 'Agar parent naya object/array/function pass kare — even if value same hai — React usse "changed" maanta hai. Reference comparison hota hai, not deep equality.' },
              { num: '3', heading: 'React.memo + useCallback = optimization combo', body: 'React.memo props compare karta hai. Agar parent function prop pass kar raha hai — useCallback ke bina woh function har render pe naya hoga → memo kaam nahi karega!' },
            ].map((point) => (
              <div key={point.num} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0" style={{ background: 'rgba(16,185,129,0.2)', color: '#10B981' }}>
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

        {/* ── SECTION 9: Common Confusion ───────────────────────────────────── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🚫</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Common Confusion — Ye Galat Fehmiyan Saaf Karo</h2>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                wrong: '"React.memo use karo toh performance hamesha better hogi"',
                right: 'React.memo khud ek overhead hai — props comparison ka cost hota hai. Agar component lightweight hai ya props har render change hote hain — memo help nahi karta, hurt karta hai. Profile first, optimize second.',
              },
              {
                wrong: '"Sirf state wala component re-render hota hai"',
                right: 'State wala component re-renders → saare children re-render hote hain (unless memo). Ye chain bahut deep ja sakti hai aur silently performance kill karte hain.',
              },
              {
                wrong: '"useCallback aur useMemo hamesha use karna chahiye"',
                right: 'Ye memoization hooks hain — memory use karte hain aur complexity badhate hain. Sirf specific optimization scenarios mein use karo jab measurement se prove ho ki optimization needed hai.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex items-start gap-3 p-4" style={{ background: 'rgba(239,68,68,0.08)', borderBottom: '1px solid rgba(239,68,68,0.2)' }}>
                  <span className="text-lg flex-shrink-0">❌</span>
                  <p className="text-sm text-[#F5F5F7] font-medium">{item.wrong}</p>
                </div>
                <div className="flex items-start gap-3 p-4" style={{ background: 'rgba(16,185,129,0.06)' }}>
                  <span className="text-lg flex-shrink-0">✅</span>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.right}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 10: Code Example ──────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">💻</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Real Code — React.memo + useCallback Pattern</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Ye woh pattern hai jo production mein sahi tarah se use hota hai</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: '#0A0A0F', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs text-[#71717A] font-mono">memo-pattern.tsx</span>
            </div>
            <div className="p-5 overflow-x-auto" style={{ background: '#0D0D15' }}>
              <pre className="text-sm font-mono leading-7">
                {CODE_LINES.map((line, i) => (
                  <div key={i} style={{ color: line.color ?? '#F5F5F7' }}>
                    {line.text || ' '}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>

        {/* ── SECTION 11: Next Steps ────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🚀</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">Agla Step — Aage Kya Seekhein?</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/course/react-performance"
              className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.3)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(124,58,237,0.15)' }}>📚</div>
              <div>
                <div className="font-bold text-[#F5F5F7] group-hover:text-[#7C3AED] transition-colors">React Performance Chapter</div>
                <div className="text-sm text-[#A1A1AA] mt-0.5">useMemo, useCallback, profiler — deep dive</div>
              </div>
              <span className="ml-auto text-[#71717A] group-hover:text-[#7C3AED] transition-colors">→</span>
            </Link>

            <Link
              href="/visualizations/react-virtual-dom"
              className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(6,182,212,0.08)', borderColor: 'rgba(6,182,212,0.3)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(6,182,212,0.15)' }}>🌳</div>
              <div>
                <div className="font-bold text-[#F5F5F7] group-hover:text-[#06B6D4] transition-colors">Virtual DOM Diff Visualizer</div>
                <div className="text-sm text-[#A1A1AA] mt-0.5">Samjho React kaise DOM efficiently update karta hai</div>
              </div>
              <span className="ml-auto text-[#71717A] group-hover:text-[#06B6D4] transition-colors">→</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
