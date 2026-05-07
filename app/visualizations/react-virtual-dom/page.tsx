import Link from 'next/link'
import VirtualDOMVisualizer from '@/components/visualizations/VirtualDOMVisualizer'

export const metadata = {
  title: 'Virtual DOM Diff Visualizer — NodeMaster',
  description:
    'React ka diffing algorithm live dekho. Samjho key prop kyun zaruri hai aur minimum DOM ops kaise kaam karta hai.',
}

const CODE_LINES: { text: string; color?: string }[] = [
  { text: '// ❌ Without key — React guesses by position', color: '#EF4444' },
  { text: 'function BadList({ items }) {', color: '#06B6D4' },
  { text: '  return (', color: '#F5F5F7' },
  { text: '    <ul>', color: '#A1A1AA' },
  { text: '      {items.map(item => (', color: '#F5F5F7' },
  { text: '        <li>{item.name}</li>', color: '#EF4444' },
  { text: '        // No key! Position = identity = WRONG', color: '#6B7280' },
  { text: '      ))}', color: '#F5F5F7' },
  { text: '    </ul>', color: '#A1A1AA' },
  { text: '  );', color: '#F5F5F7' },
  { text: '}', color: '#06B6D4' },
  { text: '' },
  { text: '// ✅ With key — React knows exact identity', color: '#10B981' },
  { text: 'function GoodList({ items }) {', color: '#06B6D4' },
  { text: '  return (', color: '#F5F5F7' },
  { text: '    <ul>', color: '#A1A1AA' },
  { text: '      {items.map(item => (', color: '#F5F5F7' },
  { text: '        <li key={item.id}>{item.name}</li>', color: '#10B981' },
  { text: '        // Stable key = React tracks item!', color: '#6B7280' },
  { text: '      ))}', color: '#F5F5F7' },
  { text: '    </ul>', color: '#A1A1AA' },
  { text: '  );', color: '#F5F5F7' },
  { text: '}', color: '#06B6D4' },
  { text: '' },
  { text: '// ── Key Rule ────────────────────────────', color: '#6B7280' },
  { text: '// key = unique, stable, from data (NOT index)', color: '#F59E0B' },
  { text: '// key={index} is almost always wrong!', color: '#EF4444' },
]

export default function ReactVirtualDOMPage() {
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
            <span className="text-[#F5F5F7]">Virtual DOM</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">🌳</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              Virtual DOM Diff Visualizer
            </h1>
          </div>

          <p className="text-[#A1A1AA] text-lg mb-5 max-w-2xl">
            React ka diffing algorithm step by step — samjho kya change hota hai, kya nahi, aur kyun key prop critical hai.
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
              style={{ color: '#10B981', borderColor: 'rgba(16,185,129,0.4)', background: 'rgba(16,185,129,0.08)' }}
            >
              🟢 Beginner
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{ color: '#A1A1AA', borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
            >
              🕐 ~10 minutes
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── SECTION 2: Hook / Why it matters ─────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-xl font-bold" style={{ color: '#10B981' }}>
              Pehle Samjho — Virtual DOM Kya Hai?
            </h2>
          </div>

          <div className="space-y-4 text-[#F5F5F7]">
            <p className="text-base leading-relaxed">
              <span className="font-semibold" style={{ color: '#10B981' }}>
                Virtual DOM React ka magic nahi hai — ye ek algorithm hai
              </span>{' '}
              jo calculate karta hai minimum changes needed to update the real DOM.
              Understanding this explains WHY keys are required in lists — aur kyun{' '}
              <code className="px-1.5 py-0.5 rounded text-sm font-mono" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>key=&#123;index&#125;</code>{' '}
              almost always wrong hai.
            </p>
            <p className="text-base leading-relaxed">
              Agar tum ye samajh lo — tum kabhi key related bugs nahi karoge. Aur interviews mein
              React performance questions confidently answer kar paoge.
            </p>
          </div>

          <div className="mt-5 pt-5 border-t border-[rgba(16,185,129,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#10B981' }}>Prerequisites</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'React Components', href: '/react/react-intro' },
                { label: 'JSX', href: '/react/jsx' },
                { label: 'Lists & Keys', href: '/react/lists-conditional' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border transition-colors hover:text-[#F5F5F7]"
                  style={{ color: '#10B981', borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.06)' }}
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
            <span className="text-2xl">📝</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#7C3AED' }}>
                Real World Analogy — Spell Checker
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">VDOM ko spell checker ki tarah socho</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: '📄',
                title: 'Document (Real DOM)',
                desc: 'Real DOM woh actual page hai jo user dekhta hai. Isme changes karna slow hai — browser ko layout recalculate karna padta hai.',
                color: '#A1A1AA',
                bg: 'rgba(161,161,170,0.06)',
                border: 'rgba(161,161,170,0.2)',
              },
              {
                icon: '📋',
                title: 'Draft (Virtual DOM)',
                desc: 'Virtual DOM ek lightweight JavaScript object hai — real DOM ka "draft copy". Changes yahan karna fast hai. Memory mein hota hai.',
                color: '#06B6D4',
                bg: 'rgba(6,182,212,0.06)',
                border: 'rgba(6,182,212,0.2)',
              },
              {
                icon: '🔍',
                title: 'Spell Check (Diffing)',
                desc: 'React do VDOMs compare karta hai — before aur after. Spell checker ki tarah highlighted karta hai kya changed. Sirf wahi real DOM mein update hota hai.',
                color: '#F59E0B',
                bg: 'rgba(245,158,11,0.06)',
                border: 'rgba(245,158,11,0.2)',
              },
              {
                icon: '🔑',
                title: 'Page Numbers (Keys)',
                desc: 'Imagine agar spell checker page numbers nahi dekhe — har change ke baad pura document rewrite kare. Keys = page numbers. React ko exact item track karne deta hai.',
                color: '#7C3AED',
                bg: 'rgba(124,58,237,0.06)',
                border: 'rgba(124,58,237,0.2)',
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
          <div className="flex items-start gap-3 mb-5">
            <span className="text-2xl">🎨</span>
            <h2 className="text-xl font-bold text-[#F5F5F7]">Diff Color Legend</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { color: '#10B981', label: 'Green = Added', desc: 'Naya node insert hua DOM mein' },
              { color: '#EF4444', label: 'Red = Removed', desc: 'Node DOM se remove hoga' },
              { color: '#F59E0B', label: 'Yellow = Modified', desc: 'Node ka content ya attribute changed' },
              { color: 'rgba(255,255,255,0.3)', label: 'Gray = Unchanged', desc: 'Koi change nahi — DOM operation nahi' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-5 h-5 rounded-full mx-auto mb-2" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}50` }} />
                <div className="text-xs font-semibold text-[#F5F5F7] mb-1">{item.label}</div>
                <div className="text-[10px] text-[#71717A]">{item.desc}</div>
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
            <h2 className="text-xl font-bold text-[#F5F5F7]">Kaise Use Karein — Step by Step</h2>
          </div>

          <div className="space-y-3">
            {[
              { step: 1, color: '#10B981', icon: '🎯', title: '"Add Item to End" se shuru karo', desc: 'Pehla scenario — simplest case. Dekho Before tree vs After tree. Apply Change dabao.' },
              { step: 2, color: '#EF4444', icon: '🔑', title: '"Add Item (No Key)" zaroor dekho', desc: 'Ye sabse important scenario hai. Bina key ke React position se compare karta hai — sab items modify hokar dikhte hain!' },
              { step: 3, color: '#10B981', icon: '✅', title: '"Add Item (With Key)" compare karo', desc: 'Ek naya item add hota hai — sirf wahi green. Baaki unchanged. Ye efficient update hai.' },
              { step: 4, color: '#F59E0B', icon: '📊', title: 'Diff summary dekho', desc: 'Apply karne ke baad neeche stats aate hain — kitne added, removed, modified, unchanged. DOM operations count karo.' },
              { step: 5, color: '#7C3AED', icon: '🔄', title: 'Sab scenarios try karo', desc: '"Change Text", "Remove Component" bhi try karo. Har baar observe karo kaunse nodes colored hote hain.' },
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
            <span className="ml-2 text-sm text-[#71717A] font-mono">virtual-dom-diff-visualizer.tsx</span>
          </div>
          <div className="p-6">
            <VirtualDOMVisualizer />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── SECTION 7: Key Prop Experiments ──────────────────────────────── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🔑</span>
            <div>
              <h2 className="text-xl font-bold text-[#F5F5F7]">KEY PROP Experiment — Sabse Important!</h2>
              <p className="text-sm text-[#A1A1AA] mt-1">Ye React ka most misunderstood concept hai</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border p-5" style={{ background: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.3)' }}>
              <div className="text-3xl font-black mb-3 opacity-30" style={{ color: '#EF4444' }}>01</div>
              <h3 className="text-base font-bold mb-3" style={{ color: '#EF4444' }}>Without Key — React Guesses</h3>
              <ol className="space-y-1.5 mb-4">
                {['Scenario: "Add Item (No Key)" chuno', 'Apply Change dabao', 'After side mein dekho: sab items modified!', 'React ne position 0, 1, 2 se compare kiya', 'Naya item beginning mein tha → sab shift ho gaye'].map((s, i) => (
                  <li key={i} className="text-xs text-[#A1A1AA] flex items-start gap-2">
                    <span style={{ color: '#EF4444' }}>{i + 1}.</span>{s}
                  </li>
                ))}
              </ol>
              <div className="rounded-lg p-3" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
                <p className="text-xs text-[#EF4444] font-semibold">⚠️ Result: 3 DOM operations needed — inefficient!</p>
              </div>
            </div>

            <div className="rounded-2xl border p-5" style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.3)' }}>
              <div className="text-3xl font-black mb-3 opacity-30" style={{ color: '#10B981' }}>02</div>
              <h3 className="text-base font-bold mb-3" style={{ color: '#10B981' }}>With Key — React Knows</h3>
              <ol className="space-y-1.5 mb-4">
                {['Scenario: "Add Item (With Key)" chuno', 'Apply Change dabao', 'After side mein dekho: sirf Cherry green', 'Apple aur Banana unchanged (gray)', 'React ne key se pehchana — unhe move kiya'].map((s, i) => (
                  <li key={i} className="text-xs text-[#A1A1AA] flex items-start gap-2">
                    <span style={{ color: '#10B981' }}>{i + 1}.</span>{s}
                  </li>
                ))}
              </ol>
              <div className="rounded-lg p-3" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                <p className="text-xs text-[#10B981] font-semibold">✅ Result: 1 DOM operation — insert only!</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 8: Takeaways ──────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">✅</span>
            <h2 className="text-xl font-bold" style={{ color: '#10B981' }}>Key Takeaways — Ye Teen Cheezein Yaad Rakho</h2>
          </div>

          <div className="space-y-4">
            {[
              { num: '1', heading: 'Diffing Algorithm = Minimum Changes Calculator', body: 'React VDOM before aur after compare karta hai aur calculate karta hai — minimum kitne DOM operations chahiye. Poora DOM rewrite nahi karta.' },
              { num: '2', heading: 'Keys = Stable Identity for List Items', body: 'Key bata deta hai React ko: "Ye specific item mera hai — chahe meri position change ho." Bina key ke React position se guess karta hai — galti ho sakti hai.' },
              { num: '3', heading: 'key={index} is Almost Always Wrong', body: 'Array index as key: jab item add/remove/reorder hote hain — index change ho jaata hai. React phir galat item ko updated samajhta hai. key = data ka unique stable ID hona chahiye.' },
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
              {
                wrong: '"Virtual DOM = real DOM se fast" — always',
                right: 'Virtual DOM create karna + diff karna bhi time lagta hai. Agar direct DOM manipulation bahut targeted ho — VDOM overhead ho sakta hai. VDOM ka benefit: predictability aur developer experience, not pure speed.',
              },
              {
                wrong: '"key sirf lists mein zaruri hai"',
                right: 'key kisi bhi sibling group mein helpful ho sakta hai. Agar tum component ko force-remount karna chahte ho (jaise form reset) — key change karo. React poora component destroy karke naya banata hai.',
              },
              {
                wrong: '"React DOM changes ko batch karta hai automatically"',
                right: 'React 18 se saare updates automatically batched hote hain. Pehle sirf event handlers mein batching hoti thi. Ab async functions, setTimeout, promises — sab mein batching hoti hai.',
              },
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

        {/* ── SECTION 10: Code Example ──────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">💻</span>
            <h2 className="text-xl font-bold text-[#F5F5F7]">Real Code — List with & without key</h2>
          </div>

          <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: '#0A0A0F', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs text-[#71717A] font-mono">key-prop-example.tsx</span>
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
              href="/visualizations/react-rerender"
              className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(6,182,212,0.08)', borderColor: 'rgba(6,182,212,0.3)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(6,182,212,0.15)' }}>♻️</div>
              <div>
                <div className="font-bold text-[#F5F5F7] group-hover:text-[#06B6D4] transition-colors">Re-render Visualizer</div>
                <div className="text-sm text-[#A1A1AA] mt-0.5">Samjho kaunse components re-render hote hain aur kyun</div>
              </div>
              <span className="ml-auto text-[#71717A] group-hover:text-[#06B6D4] transition-colors">→</span>
            </Link>

            <Link
              href="/visualizations/react-useeffect"
              className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.3)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(124,58,237,0.15)' }}>⏱️</div>
              <div>
                <div className="font-bold text-[#F5F5F7] group-hover:text-[#7C3AED] transition-colors">useEffect Lifecycle</div>
                <div className="text-sm text-[#A1A1AA] mt-0.5">Exact timing of effects — avoid infinite loops</div>
              </div>
              <span className="ml-auto text-[#71717A] group-hover:text-[#7C3AED] transition-colors">→</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
