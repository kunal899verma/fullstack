import Link from 'next/link'
import PropsStateFlowVisualizer from '@/components/visualizations/PropsStateFlowVisualizer'

export const metadata = {
  title: 'Props vs State Flow Visualizer — NodeMaster',
  description:
    'React ka unidirectional data flow live dekho — props down, events up. Lifting state up ka pattern samjho.',
}

const CODE_LINES: { text: string; color?: string }[] = [
  { text: '// ── Lifting State Up Pattern ────────────────', color: '#6B7280' },
  { text: '' },
  { text: '// ❌ WRONG: Each component has own state', color: '#EF4444' },
  { text: 'function ComponentA() {', color: '#EF4444' },
  { text: "  const [user, setUser] = useState('');", color: '#F5F5F7' },
  { text: '  // ComponentB can never know about this user!', color: '#6B7280' },
  { text: '}', color: '#EF4444' },
  { text: '' },
  { text: '// ✅ RIGHT: Lift state to common parent', color: '#10B981' },
  { text: 'function App() {', color: '#06B6D4' },
  { text: "  const [user, setUser] = useState('');", color: '#F5F5F7' },
  { text: '' },
  { text: '  return (', color: '#F5F5F7' },
  { text: '    <>', color: '#A1A1AA' },
  { text: '      {/* Props flow DOWN */}', color: '#6B7280' },
  { text: '      <Header user={user} />', color: '#06B6D4' },
  { text: '' },
  { text: '      {/* Callback flows to CHILD, event flows UP */}', color: '#6B7280' },
  { text: '      <UserForm', color: '#06B6D4' },
  { text: '        onUserChange={(newUser) => setUser(newUser)}', color: '#F59E0B' },
  { text: '      />', color: '#06B6D4' },
  { text: '    </>', color: '#A1A1AA' },
  { text: '  );', color: '#F5F5F7' },
  { text: '}', color: '#06B6D4' },
  { text: '' },
  { text: '// ── Golden Rule ──────────────────────────────', color: '#6B7280' },
  { text: '// Props = read-only (child cannot modify)', color: '#F59E0B' },
  { text: '// Events = the only way child changes parent', color: '#F59E0B' },
]

export default function ReactPropsStatePage() {
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
            <span className="text-[#F5F5F7]">Props vs State Flow</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">📊</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              Props vs State Flow Visualizer
            </h1>
          </div>

          <p className="text-[#A1A1AA] text-lg mb-5 max-w-2xl">
            React ka unidirectional data flow — props neeche, events upar — animated dekho.
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

        {/* ── SECTION 2: Why ────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(6,182,212,0.06)', borderColor: 'rgba(6,182,212,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-xl font-bold" style={{ color: '#06B6D4' }}>
              Pehle Samjho — React ka Golden Rule
            </h2>
          </div>

          <div className="space-y-4 text-[#F5F5F7]">
            <p className="text-base leading-relaxed">
              <span className="font-semibold" style={{ color: '#06B6D4' }}>
                React ka golden rule: data flows ONE WAY — parent se child (props).
              </span>{' '}
              Child kabhi directly parent ki state modify nahi kar sakta. Iske liye callback function pass kiya jaata hai.
              Ye visualization exactly ye dikhata hai — animated data packets ke saath.
            </p>
            <p className="text-base leading-relaxed">
              Jab ye concept clear ho jaata hai — lifting state up, sibling communication, prop drilling — sab kuch naturally samajh aata hai.
            </p>
          </div>

          <div className="mt-5 pt-5 border-t border-[rgba(6,182,212,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#06B6D4' }}>Prerequisites</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'React Components', href: '/react/react-intro' },
                { label: 'useState', href: '/react/state-usestate' },
                { label: 'Props', href: '/react/components-props' },
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
            <span className="text-2xl">📊</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#7C3AED' }}>
                Real World Analogy — Company Org Chart
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-1">React component tree ko company hierarchy ki tarah socho</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: '👔',
                title: 'CEO (Root Component)',
                desc: 'App level pe state hoti hai — company ka budget, policies, user data. Ye "global state" hai jo sab departments need karte hain.',
                color: '#7C3AED',
                bg: 'rgba(124,58,237,0.06)',
                border: 'rgba(124,58,237,0.2)',
              },
              {
                icon: '📩',
                title: 'Instructions Down (Props)',
                desc: 'Manager employees ko instructions deta hai — "ye karo, ye budget hai." Employee directly modify nahi kar sakta. Ye ek-taraf communication hai.',
                color: '#06B6D4',
                bg: 'rgba(6,182,212,0.06)',
                border: 'rgba(6,182,212,0.2)',
              },
              {
                icon: '📋',
                title: 'Reports Up (Events)',
                desc: 'Employee kuch karta hai → report manager ko jaati hai. Manager decide karta hai kya change karna hai. Employee directly policy nahi badal sakta.',
                color: '#F59E0B',
                bg: 'rgba(245,158,11,0.06)',
                border: 'rgba(245,158,11,0.2)',
              },
              {
                icon: '🤝',
                title: 'Sibling Communication',
                desc: 'Sales aur Marketing ko ek dusre ka data chahiye? Direct communication nahi hota — data CEO level pe "lift" hoti hai. Dono departments phir report mein receive karte hain.',
                color: '#10B981',
                bg: 'rgba(16,185,129,0.06)',
                border: 'rgba(16,185,129,0.2)',
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

        {/* ── SECTION 4: How to use ─────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">📖</span>
            <h2 className="text-xl font-bold text-[#F5F5F7]">Kaise Use Karein — Data Flow Trace Karo</h2>
          </div>

          <div className="space-y-3">
            {[
              { step: 1, color: '#06B6D4', icon: '📩', title: '"Change User (Props Down)" dabao', desc: 'Cyan packet App se Header pe flow karta hai. Observe: ek direction, parent to child. Header sirf receive karta hai — change nahi kar sakta.' },
              { step: 2, color: '#F59E0B', icon: '📋', title: '"Increment Count (Event Up)" dabao', desc: 'Do animations ek saath: orange (event up) CountDisplay → App, phir blue (props down) App → CountDisplay. Ye complete data cycle hai.' },
              { step: 3, color: '#7C3AED', icon: '🤝', title: '"Lifting State Up Demo" dekho', desc: 'Sibling communication: Header se App tak, phir App se Dashboard tak. Common parent = traffic controller.' },
              { step: 4, color: '#10B981', icon: '💡', title: 'Highlighted nodes observe karo', desc: 'Jab packet kisi node se guzarta hai — woh highlight hota hai. Intermediate nodes bhi highlight hote hain — lekin sirf terminal node actual value use karta hai.' },
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
            <span className="ml-2 text-sm text-[#71717A] font-mono">props-state-flow-visualizer.tsx</span>
          </div>
          <div className="p-6">
            <PropsStateFlowVisualizer />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── SECTION 7: Experiments ────────────────────────────────────────── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🧪</span>
            <h2 className="text-xl font-bold text-[#F5F5F7]">Try Karo Ye Scenarios</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: '01', title: 'Simple Props Flow',
                color: '#06B6D4', bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.25)',
                setup: ['"Change User" scenario run karo', 'Packet App → Header dekho', 'Header highlighted hota hai'],
                notice: 'Data sirf neeche jaata hai. Packet Header ke andar "consume" hota hai — aage nahi jaata.',
                insight: 'Props = one-way street. Read-only in child.',
              },
              {
                num: '02', title: 'Event Round Trip',
                color: '#F59E0B', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.25)',
                setup: ['"Increment Count" scenario run karo', 'Orange packet (event up) dekho', 'Phir blue packet (props down)'],
                notice: 'Event upar jaata hai → App state changes → phir updated prop neeche aata hai. Full cycle!',
                insight: 'React ki "one-way binding" iska matlab hai: child calls callback → parent decides → prop updates.',
              },
              {
                num: '03', title: 'Lifting State',
                color: '#7C3AED', bg: 'rgba(124,58,237,0.06)', border: 'rgba(124,58,237,0.25)',
                setup: ['"Lifting State Up Demo" run karo', 'Purple packet Header → App → Dashboard', 'Data common parent se distribute'],
                notice: 'Siblings directly communicate nahi karte. Data "up" jaata hai common parent mein, phir "down" both siblings ko.',
                insight: 'Jab siblings sync mein rehne chahein — state lift karo. Ye React ka fundamental pattern hai.',
              },
            ].map((exp) => (
              <div key={exp.num} className="rounded-2xl border p-5 flex flex-col" style={{ background: exp.bg, borderColor: exp.border }}>
                <div className="text-3xl font-black mb-2 opacity-25" style={{ color: exp.color }}>{exp.num}</div>
                <h3 className="text-sm font-bold mb-3" style={{ color: exp.color }}>{exp.title}</h3>
                <ol className="space-y-1 mb-3">
                  {exp.setup.map((s, i) => (
                    <li key={i} className="text-xs text-[#A1A1AA] flex items-start gap-1.5">
                      <span style={{ color: exp.color }}>{i + 1}.</span>{s}
                    </li>
                  ))}
                </ol>
                <div className="mt-auto space-y-2">
                  <div className="rounded-lg p-2.5" style={{ background: `${exp.color}12`, border: `1px solid ${exp.color}30` }}>
                    <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: exp.color }}>Kya Notice Karo</p>
                    <p className="text-xs text-[#F5F5F7] leading-relaxed">{exp.notice}</p>
                  </div>
                  <div className="rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] mb-1">Insight</p>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">{exp.insight}</p>
                  </div>
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
            <h2 className="text-xl font-bold" style={{ color: '#10B981' }}>Key Takeaways — Unidirectional Data Flow</h2>
          </div>

          <div className="space-y-4">
            {[
              { num: '1', heading: 'Props = Read-Only in Child', body: 'Child component kabhi directly props modify nahi kar sakta. Agar kare — React error throw karta hai. Props parent ne control kiye hain. Child sirf consume karta hai.' },
              { num: '2', heading: 'State Change Sirf Callback Se', body: 'Parent state change karna chahte ho child se? Parent callback function pass karo. Child woh function call karta hai. Parent state update karta hai. Props flow down hoti hai.' },
              { num: '3', heading: 'Lifting State = Common Pattern', body: 'Jab do sibling components ko ek hi data chahiye — state ko unke closest common ancestor mein lift karo. Ye React ka most important architectural pattern hai.' },
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
              { wrong: '"Child component props ko modify kar sakta hai"', right: 'Props immutable hain child ke liye. props.value = newValue — ye silently fail hoga ya error dega. State change karna hai toh callback function use karo.' },
              { wrong: '"State aur Props mein koi fark nahi"', right: 'State = component ka own mutable data (useState). Props = parent se receive kiya read-only data. State internal, props external. Bahut alag concepts hain.' },
              { wrong: '"Sibling components directly communicate kar sakte hain"', right: 'React mein siblings direct connection nahi rakhte. Common parent ke through communicate karte hain — state lift karo, ya Context/Redux use karo.' },
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
            <h2 className="text-xl font-bold text-[#F5F5F7]">Real Code — Lifting State Up Pattern</h2>
          </div>

          <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: '#0A0A0F', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs text-[#71717A] font-mono">lifting-state-up.tsx</span>
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
              href="/visualizations/react-context"
              className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.3)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(124,58,237,0.15)' }}>🔌</div>
              <div>
                <div className="font-bold text-[#F5F5F7] group-hover:text-[#7C3AED] transition-colors">Context API vs Prop Drilling</div>
                <div className="text-sm text-[#A1A1AA] mt-0.5">Jab lifting state bhi painful ho jaaye</div>
              </div>
              <span className="ml-auto text-[#71717A] group-hover:text-[#7C3AED] transition-colors">→</span>
            </Link>

            <Link
              href="/visualizations/react-rerender"
              className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(6,182,212,0.08)', borderColor: 'rgba(6,182,212,0.3)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(6,182,212,0.15)' }}>♻️</div>
              <div>
                <div className="font-bold text-[#F5F5F7] group-hover:text-[#06B6D4] transition-colors">Re-render Visualizer</div>
                <div className="text-sm text-[#A1A1AA] mt-0.5">Props change se kaunse components re-render hote hain?</div>
              </div>
              <span className="ml-auto text-[#71717A] group-hover:text-[#06B6D4] transition-colors">→</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
