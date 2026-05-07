import Link from 'next/link'
import ContextVsDrillingVisualizer from '@/components/visualizations/ContextVsDrillingVisualizer'

export const metadata = {
  title: 'Context API vs Prop Drilling Visualizer — NodeMaster',
  description:
    'Side-by-side comparison of prop drilling vs Context API. Samjho kab context use karna chahiye aur kab nahi.',
}

const CODE_LINES: { text: string; color?: string }[] = [
  { text: '// ── ThemeContext Full Example ───────────────', color: '#6B7280' },
  { text: '' },
  { text: '// 1. Context create karo', color: '#6B7280' },
  { text: 'const ThemeContext = createContext<{', color: '#7C3AED' },
  { text: "  theme: 'dark' | 'light';", color: '#F5F5F7' },
  { text: '  toggleTheme: () => void;', color: '#F5F5F7' },
  { text: '}>({', color: '#7C3AED' },
  { text: "  theme: 'dark',", color: '#F5F5F7' },
  { text: '  toggleTheme: () => {},', color: '#F5F5F7' },
  { text: '});', color: '#7C3AED' },
  { text: '' },
  { text: '// 2. Provider component', color: '#6B7280' },
  { text: 'function ThemeProvider({ children }) {', color: '#06B6D4' },
  { text: "  const [theme, setTheme] = useState('dark');", color: '#F5F5F7' },
  { text: '  const toggleTheme = () =>', color: '#F5F5F7' },
  { text: "    setTheme(t => t === 'dark' ? 'light' : 'dark');", color: '#F5F5F7' },
  { text: '' },
  { text: '  return (', color: '#F5F5F7' },
  { text: '    <ThemeContext.Provider value={{ theme, toggleTheme }}>', color: '#7C3AED' },
  { text: '      {children}', color: '#F5F5F7' },
  { text: '    </ThemeContext.Provider>', color: '#7C3AED' },
  { text: '  );', color: '#F5F5F7' },
  { text: '}', color: '#06B6D4' },
  { text: '' },
  { text: '// 3. Consumer — anywhere in tree!', color: '#6B7280' },
  { text: 'function MenuItem() {', color: '#10B981' },
  { text: '  const { theme, toggleTheme } = useContext(ThemeContext);', color: '#10B981' },
  { text: '  // No prop drilling needed!', color: '#6B7280' },
  { text: '  return <div className={theme}>...</div>;', color: '#F5F5F7' },
  { text: '}', color: '#10B981' },
]

export default function ReactContextPage() {
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
            <span className="text-[#F5F5F7]">Context vs Prop Drilling</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">🔌</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              Context API vs Prop Drilling
            </h1>
          </div>

          <p className="text-[#A1A1AA] text-lg mb-5 max-w-2xl">
            Side-by-side comparison — painful prop drilling vs clean Context API. Switch theme aur dekho difference.
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
              🕐 ~8 minutes
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── SECTION 2: The Problem ────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">😫</span>
            <h2 className="text-xl font-bold" style={{ color: '#EF4444' }}>
              Problem: Prop Drilling Pain
            </h2>
          </div>

          <div className="space-y-4 text-[#F5F5F7]">
            <p className="text-base leading-relaxed">
              <span className="font-semibold" style={{ color: '#EF4444' }}>
                Prop drilling: theme/user/language 5 levels ke components se pass karna
              </span>{' '}
              jo in props ko USE bhi nahi karte — sirf &ldquo;pass-through&rdquo; karte hain.
              Ye painful, brittle, aur refactoring nightmare hai.
            </p>
            <p className="text-base leading-relaxed">
              Context API ye solve karta hai — lekin{' '}
              <span className="font-semibold" style={{ color: '#F59E0B' }}>
                context kab galat choice hai ye bhi utna important hai.
              </span>{' '}
              Bahut saare consumers = performance issues.
            </p>
          </div>

          <div className="mt-5 pt-5 border-t border-[rgba(239,68,68,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#EF4444' }}>Prerequisites</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'Props & State', href: '/visualizations/react-props-state' },
                { label: 'React Hooks', href: '/react/useeffect' },
                { label: 'Component Tree', href: '/react/react-intro' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border transition-colors hover:text-[#F5F5F7]"
                  style={{ color: '#EF4444', borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)' }}
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
            <span className="text-2xl">📄</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#7C3AED' }}>
                Real World Analogy — Office Memo vs Company Email
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: '📝',
                title: 'Office Memo Chain (Prop Drilling)',
                desc: 'CEO ne memo likha → MD ko diya → GM ko diya → Manager ko diya → Employee ko mila. Sab beech wale log sirf "forward" karte rahe. Waste of everyone\'s time.',
                color: '#EF4444',
                bg: 'rgba(239,68,68,0.06)',
                border: 'rgba(239,68,68,0.2)',
              },
              {
                icon: '📧',
                title: 'Company-Wide Email (Context)',
                desc: 'CEO ne email bheja → seedha Employee ke inbox mein. Beech wale affected hi nahi hue. Context exactly aisa kaam karta hai — Provider se Consumer directly.',
                color: '#10B981',
                bg: 'rgba(16,185,129,0.06)',
                border: 'rgba(16,185,129,0.2)',
              },
              {
                icon: '📢',
                title: 'Announcement Board (Context)',
                desc: 'Company-wide announcement: ek jagah update karo — sabko ek saath mila. Theme, language, user data — ye sab "announcements" hain jo sab need karte hain.',
                color: '#7C3AED',
                bg: 'rgba(124,58,237,0.06)',
                border: 'rgba(124,58,237,0.2)',
              },
              {
                icon: '⚠️',
                title: 'Too Many Subscribers = Chaos',
                desc: 'Agar har chhoti baat ke liye company-wide email jaye — inbox flooded. Context bhi aisa hai: bahut saare consumers = har context change pe sab re-render. Oversue mat karo.',
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

        {/* ── SECTION 4: How to Use ─────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(26,26,38,0.8)', borderColor: 'rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">📖</span>
            <h2 className="text-xl font-bold text-[#F5F5F7]">Kaise Use Karein — Both Sides Compare Karo</h2>
          </div>

          <div className="space-y-3">
            {[
              { step: 1, color: '#EF4444', icon: '👀', title: 'Dono sides dhyan se dekho', desc: 'Left = Prop Drilling, Right = Context. Har level pe kya ho raha hai — boxes carefully padhao.' },
              { step: 2, color: '#7C3AED', icon: '🔄', title: '"Switch Theme" button dabao', desc: 'Dekho left side pe: sab layers update hote hain (prop pass through). Right side pe: sirf Provider + MenuItem update.' },
              { step: 3, color: '#EF4444', icon: '🔴', title: 'Red indicators dekho (left side)', desc: 'Drilling mein Layout, Sidebar, Menu pe "just passing through!" likha hai — ye wasted boilerplate hai.' },
              { step: 4, color: '#10B981', icon: '🟢', title: 'Context jump line dekho (right side)', desc: 'Animated dotted line Provider se MenuItem seedhi jaati hai — intermediate nodes bypass ho rahe hain completely.' },
              { step: 5, color: '#F59E0B', icon: '📊', title: 'Comparison table padhao', desc: 'Neeche comparison table hai — files to update, boilerplate, performance, best use case. Ye table hamesha yaad rakhna.' },
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

        {/* ── SECTION 5: When NOT to use Context ───────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-5">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-xl font-bold" style={{ color: '#F59E0B' }}>
              When NOT to Use Context — Ye Bhi Utna Important Hai
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Props 1-2 levels deep', desc: 'Agar data sirf 1-2 level down jaana hai — props hi theek hai. Context overkill hai. Simple stay karo.', verdict: 'Props use karo' },
              { title: 'Frequently changing data', desc: 'Har render pe change hone wala data context mein = har consumer re-render. Performance nightmare. Use local state ya zustand.', verdict: 'Local state ya Zustand' },
              { title: 'Complex state logic', desc: 'Context mein complex reducers nahi rakhne chahiye. Iske liye zustand ya Redux zyaada suitable hain.', verdict: 'Zustand / Redux' },
              { title: 'Component-specific state', desc: 'Sirf ek component ka state context mein dalna = unnecessary global exposure. Private rakho jise private rehna chahiye.', verdict: 'Local state' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border p-4" style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.2)' }}>
                <div className="font-semibold text-sm text-[#F5F5F7] mb-1">{item.title}</div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed mb-2">{item.desc}</p>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)' }}>
                  ✓ {item.verdict}
                </span>
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
            <span className="ml-2 text-sm text-[#71717A] font-mono">context-vs-drilling-visualizer.tsx</span>
          </div>
          <div className="p-6">
            <ContextVsDrillingVisualizer />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── SECTION 7: Experiments ────────────────────────────────────────── */}
        <div>
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🧪</span>
            <h2 className="text-xl font-bold text-[#F5F5F7]">Try Karo Ye Experiments</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                num: '01', title: 'Prop Drilling Pain Count',
                color: '#EF4444', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.25)',
                setup: ['Left side (prop drilling) dekho', 'Count karo kitne boxes "theme prop" badge rakhte hain', 'Sirf MenuItem actually uses it'],
                notice: 'App, Layout, Sidebar, Menu — sab 4 components ko "theme prop" pass karna pada — sirf ek component ke liye!',
                insight: '4 files ko update karna pada. 4 places pe breakage ka risk. Agar ek aur level add ho — 5 ho jayenge.',
              },
              {
                num: '02', title: 'Context Shortcut',
                color: '#10B981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.25)',
                setup: ['Right side (context) dekho', 'Theme Switch karo', 'Animated dotted line observe karo'],
                notice: 'Provider se seedha MenuItem tak — Layout, Sidebar, Menu ko pata bhi nahi chala ke theme changed! Zero prop passing.',
                insight: 'Sirf 2 files update karne pade: ThemeContext.Provider (theme value) + MenuItem (useContext). Thats it.',
              },
            ].map((exp) => (
              <div key={exp.num} className="rounded-2xl border p-5 flex flex-col" style={{ background: exp.bg, borderColor: exp.border }}>
                <div className="text-4xl font-black mb-3 opacity-25" style={{ color: exp.color }}>{exp.num}</div>
                <h3 className="text-base font-bold mb-3" style={{ color: exp.color }}>{exp.title}</h3>
                <ol className="space-y-1 mb-4">
                  {exp.setup.map((s, i) => (
                    <li key={i} className="text-xs text-[#A1A1AA] flex items-start gap-2">
                      <span style={{ color: exp.color }}>{i + 1}.</span>{s}
                    </li>
                  ))}
                </ol>
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

        {/* ── SECTION 8: Takeaways ──────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 md:p-8"
          style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.35)' }}
        >
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">✅</span>
            <h2 className="text-xl font-bold" style={{ color: '#10B981' }}>Key Takeaways — Context API Rules</h2>
          </div>

          <div className="space-y-4">
            {[
              { num: '1', heading: 'Context is for Global/Shared Data', body: 'Theme, authenticated user, language/locale, feature flags — ye sab context ke ideal candidates hain. Bohot sare components need karte hain, rarely change hote hain.' },
              { num: '2', heading: 'Context Value Change = All Consumers Re-render', body: 'Ye most important gotcha hai: jab context value change hoti hai — EVERY component jo useContext use karta hai re-render hota hai. Frequent changes + many consumers = performance problem.' },
              { num: '3', heading: 'Zustand for Complex/Frequent State', body: 'Complex state logic, frequent updates, slice-specific subscriptions — ye sab zustand ya Redux ke liye hain. Context React ki built-in solution hai — simple cases ke liye. Complex apps need more.' },
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
              { wrong: '"Context use karo toh prop drilling completely khatam ho jaata hai"', right: 'Context ek tool hai — sab kuch solve nahi karta. Local component state, lifting state — ye patterns abhi bhi important hain. Context sirf truly global data ke liye use karo.' },
              { wrong: '"Context aur Redux same cheez hain"', right: 'Context sirf ek mechanism hai data pass karne ka — middleware, dev tools, time travel nahi. Redux/Zustand complex state management systems hain built-in features ke saath.' },
              { wrong: '"Context memoization se slow re-renders fix ho jaate hain"', right: 'Context consumers ko memoize karna help karta hai — lekin agar context value itself unstable object hai (har render pe new object), consumers re-render karte hain chahe memoized ho.' },
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
            <h2 className="text-xl font-bold text-[#F5F5F7]">Real Code — ThemeContext Complete Example</h2>
          </div>

          <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: '#0A0A0F', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="ml-2 text-xs text-[#71717A] font-mono">theme-context.tsx</span>
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
                <div className="text-sm text-[#A1A1AA] mt-0.5">Context consumers ke re-renders live dekho</div>
              </div>
              <span className="ml-auto text-[#71717A] group-hover:text-[#06B6D4] transition-colors">→</span>
            </Link>

            <Link
              href="/course/zustand"
              className="group flex items-center gap-4 p-5 rounded-xl border transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.3)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(124,58,237,0.15)' }}>🐻</div>
              <div>
                <div className="font-bold text-[#F5F5F7] group-hover:text-[#7C3AED] transition-colors">Zustand State Management</div>
                <div className="text-sm text-[#A1A1AA] mt-0.5">Context se beyond — complex state ke liye</div>
              </div>
              <span className="ml-auto text-[#71717A] group-hover:text-[#7C3AED] transition-colors">→</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
