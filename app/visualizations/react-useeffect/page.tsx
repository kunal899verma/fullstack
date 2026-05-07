import Link from 'next/link'
import UseEffectVisualizer from '@/components/visualizations/UseEffectVisualizer'

export const metadata = {
  title: 'useEffect Lifecycle Visualizer — NodeMaster',
  description:
    'useEffect ka exact timing samjho — mount, update, cleanup, unmount. Infinite loops aur memory leaks se bachao.',
}

const CODE_LINES: { text: string; color?: string }[] = [
  { text: '// ✅ Correct cleanup pattern', color: '#10B981' },
  { text: 'useEffect(() => {', color: '#06B6D4' },
  { text: '  // 1. Event listener add karo', color: '#6B7280' },
  { text: "  window.addEventListener('resize', handleResize);", color: '#F5F5F7' },
  { text: '' },
  { text: '  // 2. Cleanup function return karo', color: '#6B7280' },
  { text: '  return () => {', color: '#F59E0B' },
  { text: "    window.removeEventListener('resize', handleResize);", color: '#F59E0B' },
  { text: '    // ^ Without this: memory leak!', color: '#EF4444' },
  { text: '  };', color: '#F59E0B' },
  { text: '}, []); // Mount pe add, unmount pe remove', color: '#06B6D4' },
  { text: '' },
  { text: '// ❌ Infinite loop — object in deps!', color: '#EF4444' },
  { text: 'useEffect(() => {', color: '#EF4444' },
  { text: '  fetchData(options);', color: '#F5F5F7' },
  { text: '}, [options]); // options = {} → new ref every render!', color: '#EF4444' },
  { text: '' },
  { text: '// ✅ Fix: useMemo to stabilize reference', color: '#10B981' },
  { text: 'const stableOptions = useMemo(() => ({', color: '#10B981' },
  { text: "  method: 'GET', url: '/api/data'", color: '#F5F5F7' },
  { text: '}), []); // stable reference', color: '#10B981' },
  { text: '' },
  { text: 'useEffect(() => {', color: '#06B6D4' },
  { text: '  fetchData(stableOptions); // no infinite loop', color: '#F5F5F7' },
  { text: '}, [stableOptions]);', color: '#06B6D4' },
]

export default function ReactUseEffectPage() {
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
            <span className="text-[#F5F5F7]">useEffect Lifecycle</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">⏱️</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              useEffect Lifecycle Visualizer
            </h1>
          </div>

          <p className="text-[#A1A1AA] text-lg mb-5 max-w-2xl">
            Effect ka exact timing — render ke baad, paint ke baad. Cleanup kab chalta hai. Timeline pe dekho.
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

        {/* ── SECTION 2: Why ────────────────────────────────────────────────── */}
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
                useEffect sabse zyada misused hook hai.
              </span>{' '}
              Infinite loops, stale closures, memory leaks — ye sab useEffect ke galat use se aate hain.
              WHEN effects run ye samajhna bina — ye bugs impossible hain debug karna.
            </p>
            <p className="text-base leading-relaxed">
              Ye timeline visualizer ye unmistakable banata hai: exact order mein render → paint → effect → cleanup.
              Koi aur guessing nahi, koi aur confusion nahi.
            </p>
          </div>

          <div className="mt-5 pt-5 border-t border-[rgba(6,182,212,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#06B6D4' }}>Prerequisites</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'React Hooks Basics', href: '/react/useeffect' },
                { label: 'useState', href: '/react/state-usestate' },
                { label: 'Component Lifecycle', href: '/react/useeffect' },
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
            <span className="text-2xl">🛎️</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#7C3AED' }}>
                Real World Analogy — Hotel Room Service
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">useEffect lifecycle ko hotel stay ki tarah socho</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '🏨', title: 'Check In (Mount)', desc: 'Pehli baar component DOM mein aata hai. Effect runs. Subscriptions start, API calls, timers — ye sab "check in" pe hote hain.', color: '#7C3AED' },
              { icon: '🛏️', title: 'Stay (Render)', desc: 'Har render = ek "day" hotel mein. Component screen pe dikh raha hai. User kuch kar sakta hai.', color: '#A1A1AA' },
              { icon: '🔄', title: 'Room Change (Update)', desc: 'Dep change = naya room. Pehle purana room "checkout" (cleanup), phir naya room "checkin" (effect). Order guaranteed.', color: '#F59E0B' },
              { icon: '🚪', title: 'Check Out (Unmount)', desc: 'Component remove hote waqt cleanup runs — always. Ye FINAL cleanup hai — subscriptions cancel karo, timers clear karo.', color: '#EF4444' },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border p-4" style={{ background: `${card.color}08`, borderColor: `${card.color}25` }}>
                <div className="text-2xl mb-2">{card.icon}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: card.color }}>{card.title}</div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 4: Legend ─────────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-5">
            <span className="text-2xl">🎨</span>
            <h2 className="text-xl font-bold text-[#F5F5F7]">Timeline Legend</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { color: '#7C3AED', label: 'Purple — Mount', desc: 'Component pehli baar DOM mein aaya' },
              { color: '#A1A1AA', label: 'Gray — Render', desc: 'React ne JSX execute kiya, VDOM banaya' },
              { color: '#71717A', label: 'Dark — Paint', desc: 'Browser ne real DOM update kiya — user dekhta hai' },
              { color: '#06B6D4', label: 'Cyan — Effect', desc: 'useEffect callback chala (after paint)' },
              { color: '#F59E0B', label: 'Amber — Cleanup', desc: 'Previous effect cleanup (before next effect + unmount)' },
              { color: '#EF4444', label: 'Red — Unmount', desc: 'Component DOM se remove hua' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-2 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-3 h-3 rounded-full mt-0.5 flex-shrink-0" style={{ background: item.color }} />
                <div>
                  <div className="text-xs font-semibold" style={{ color: item.color }}>{item.label}</div>
                  <div className="text-[10px] text-[#71717A] mt-0.5">{item.desc}</div>
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
            <h2 className="text-xl font-bold text-[#F5F5F7]">Kaise Use Karein — Teen Modes Try Karo</h2>
          </div>

          <div className="space-y-3">
            {[
              { step: 1, color: '#10B981', icon: '🟢', title: 'Empty [] mode se shuru karo', desc: 'Ye sabse common aur correct pattern hai. Mount karo, dekho sirf ek effect. Phir state update karo — effect nahi chalta. Fir unmount — cleanup.' },
              { step: 2, color: '#EF4444', icon: '🔴', title: 'No deps mode try karo', desc: 'Ab "No deps" chuno. Mount karo, state update karo — har render pe effect chalta hai! Ye mostly wrong behavior hai — infinite loop ka risk.' },
              { step: 3, color: '#06B6D4', icon: '🔵', title: 'With deps [count] mode dekho', desc: '"Change Dep Value" button dabao. Effect sirf tab chalta hai jab dep change hoti hai. "State Update (unrelated)" dabao — effect skip hota hai!' },
              { step: 4, color: '#F59E0B', icon: '⚠️', title: 'Cleanup observe karo', desc: 'Kisi bhi mode mein second state change pe dekho: PEHLE cleanup chalta hai (previous effect ka), PHIR naya effect. Order unmistakable hai timeline pe.' },
              { step: 5, color: '#7C3AED', icon: '🚪', title: 'Unmount karke final cleanup dekho', desc: '"Unmount Component" dabao. Dekho final cleanup kaisa dikhta hai timeline pe — chahe koi bhi mode ho.' },
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
            <span className="ml-2 text-sm text-[#71717A] font-mono">use-effect-lifecycle-visualizer.tsx</span>
          </div>
          <div className="p-6">
            <UseEffectVisualizer />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── SECTION 7: 3 Dep Array Forms ──────────────────────────────────── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🧪</span>
            <h2 className="text-xl font-bold text-[#F5F5F7]">Teen Dependency Array Forms — Comparison</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: '01', title: 'No Deps Array', mode: 'useEffect(fn)',
                color: '#EF4444', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.25)',
                when: 'Har render ke baad',
                usecase: 'Almost never — very rare use cases',
                risk: '⚠️ Infinite loop risk if state set inside',
                items: ['Mount pe: ✓ runs', 'Update pe: ✓ runs (every time!)', 'Cleanup: before each re-run', 'Unmount: ✓ cleanup'],
              },
              {
                num: '02', title: 'Empty Deps []', mode: 'useEffect(fn, [])',
                color: '#10B981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.25)',
                when: 'Sirf mount pe (once)',
                usecase: 'API call, subscription setup, event listener',
                risk: '✅ Safe — most common pattern',
                items: ['Mount pe: ✓ runs', 'Update pe: ✗ skipped', 'Cleanup: only on unmount', 'Unmount: ✓ cleanup'],
              },
              {
                num: '03', title: 'With Deps [val]', mode: 'useEffect(fn, [val])',
                color: '#06B6D4', bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.25)',
                when: 'Jab dep values change hoti hain',
                usecase: 'Sync effect to specific state/prop',
                risk: '⚠️ Object/array dep = infinite loop!',
                items: ['Mount pe: ✓ runs', 'Update pe: ✓ if dep changed', 'Cleanup: before next effect', 'Unmount: ✓ cleanup'],
              },
            ].map((exp) => (
              <div key={exp.num} className="rounded-2xl border p-5 flex flex-col" style={{ background: exp.bg, borderColor: exp.border }}>
                <div className="text-3xl font-black mb-2 opacity-25" style={{ color: exp.color }}>{exp.num}</div>
                <h3 className="text-sm font-bold mb-1" style={{ color: exp.color }}>{exp.title}</h3>
                <code className="text-[11px] font-mono mb-3" style={{ color: exp.color }}>{exp.mode}</code>
                <div className="space-y-1 mb-3">
                  {exp.items.map((item, i) => (
                    <div key={i} className="text-[11px] text-[#A1A1AA] flex items-center gap-1.5">
                      <span style={{ color: item.includes('✓') ? '#10B981' : '#71717A' }}>{item.startsWith('✗') || item.includes('skipped') ? '✗' : '·'}</span>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-auto space-y-2">
                  <div className="rounded p-2 text-[10px]" style={{ background: `${exp.color}12`, border: `1px solid ${exp.color}30` }}>
                    <span style={{ color: exp.color }} className="font-semibold">When: </span>
                    <span className="text-[#F5F5F7]">{exp.when}</span>
                  </div>
                  <div className="text-[10px] text-[#71717A]">{exp.risk}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 8: Takeaways ──────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">✅</span>
            <h2 className="text-xl font-bold" style={{ color: '#10B981' }}>
              Key Takeaways — useEffect ke Teen Rules
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { num: '1', heading: 'Effect ALWAYS runs after paint — never before', body: 'useEffect = "after render + DOM update." React pehle screen update karta hai, PHIR effect chalta hai. Users changes dekhte hain before effects run. (useLayoutEffect = synchronous, before paint — rare use case).' },
              { num: '2', heading: 'Cleanup runs BEFORE next effect, not after', body: 'Agar dep change se effect re-run hone wala hai — pehle previous effect ka cleanup chalta hai. Order: render → paint → [cleanup] → effect. Cleanup ek "undo" hai.' },
              { num: '3', heading: 'Object/array in deps = infinite loop warning', body: 'Objects aur arrays reference se compare hote hain. {} === {} is false in JavaScript. Agar object dep mein hai aur component render pe new object create karta hai — effect infinite loop mein ja sakta hai.' },
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
            <h2 className="text-xl font-bold text-[#F5F5F7]">Common Confusion — Galat Fehmiyan</h2>
          </div>

          <div className="space-y-3">
            {[
              { wrong: '"Effect render se pehle chalta hai"', right: 'GALAT. Effect ALWAYS render ke BAAD chalta hai. React pehle screen update karta hai (paint), phir effects. Isi liye name hai "use-EFFECT" — side effects, after the fact.' },
              { wrong: '"Empty [] matlab effect kabhi nahi chalta"', right: 'GALAT. Empty [] matlab effect sirf mount pe chalta hai — once. Dependencies mein "nothing" hai jis par depend kare, so it runs once and never again (until unmount cleanup).' },
              { wrong: '"useEffect mein async function directly pass kar sakte hain"', right: 'Nahi. useEffect callback ya kuch return nahi karta ya cleanup function return karta hai. Async function Promise return karta hai — ye React confuse karta hai. Solution: async function andar define karo aur call karo.' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex items-start gap-3 p-4" style={{ background: 'rgba(239,68,68,0.08)', borderBottom: '1px solid rgba(239,68,68,0.2)' }}>
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

        {/* ── SECTION 10: Code ──────────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">💻</span>
            <h2 className="text-xl font-bold text-[#F5F5F7]">Real Code — Cleanup Pattern + Infinite Loop Fix</h2>
          </div>

          <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: '#0A0A0F', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs text-[#71717A] font-mono">use-effect-patterns.tsx</span>
            </div>
            <div className="p-5 overflow-x-auto" style={{ background: '#0D0D15' }}>
              <pre className="text-sm font-mono leading-7">
                {CODE_LINES.map((line, i) => (
                  <div key={i} style={{ color: line.color ?? '#F5F5F7' }}>{line.text || ' '}</div>
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
            <h2 className="text-xl font-bold text-[#F5F5F7]">Agla Step — Aage Kya Seekhein?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/visualizations/react-props-state"
              className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(6,182,212,0.08)', borderColor: 'rgba(6,182,212,0.3)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(6,182,212,0.15)' }}>📊</div>
              <div>
                <div className="font-bold text-[#F5F5F7] group-hover:text-[#06B6D4] transition-colors">Props vs State Flow</div>
                <div className="text-sm text-[#A1A1AA] mt-0.5">Data flow animation — props down, events up</div>
              </div>
              <span className="ml-auto text-[#71717A] group-hover:text-[#06B6D4] transition-colors">→</span>
            </Link>

            <Link
              href="/visualizations/react-context"
              className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.3)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(124,58,237,0.15)' }}>🔌</div>
              <div>
                <div className="font-bold text-[#F5F5F7] group-hover:text-[#7C3AED] transition-colors">Context API vs Prop Drilling</div>
                <div className="text-sm text-[#A1A1AA] mt-0.5">Side-by-side comparison — when to use what</div>
              </div>
              <span className="ml-auto text-[#71717A] group-hover:text-[#7C3AED] transition-colors">→</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
