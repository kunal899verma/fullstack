'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

function ReRenderCausesDiagram() {
  const triggers = [
    { label: 'State changes', sublabel: 'setState / useState updater called', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', icon: '🔀', solution: 'React.memo' },
    { label: 'Props change', sublabel: 'Parent re-renders → child re-renders by default', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '📥', solution: 'React.memo + useCallback' },
    { label: 'Context updates', sublabel: 'Context value changes → all useContext consumers', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: '🌍', solution: 'Selective context / Zustand' },
    { label: 'forceUpdate', sublabel: 'Manual trigger — rare, avoid in modern React', color: '#EF4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', icon: '⚡', solution: 'Restructure state' },
  ]
  const solutions = [
    { label: 'React.memo', sublabel: 'Skip render if props unchanged', color: '#10B981', icon: '🧠' },
    { label: 'useMemo', sublabel: 'Memoize expensive computations', color: '#10B981', icon: '📌' },
    { label: 'useCallback', sublabel: 'Stable function references', color: '#10B981', icon: '🔗' },
    { label: 'Selective context', sublabel: 'Split contexts or use Zustand', color: '#10B981', icon: '✂️' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Re-render Triggers → Solutions</p>
      <div className="max-w-lg mx-auto">
        <p className="text-xs text-[#71717A] mb-2 text-center">4 Causes of Re-render</p>
        <div className="space-y-2 mb-4">
          {triggers.map((t, i) => (
            <div key={i} className="rounded-xl px-5 py-3 flex items-center gap-4" style={{ background: t.bg, border: `1px solid ${t.border}` }}>
              <span className="text-lg">{t.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: t.color }}>{t.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{t.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓ solutions</span></div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {solutions.map((s, i) => (
            <div key={i} className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}>
              <span className="text-base">{s.icon}</span>
              <div>
                <p className="font-bold text-xs font-mono" style={{ color: s.color }}>{s.label}</p>
                <p className="text-[10px] text-[#71717A] mt-0.5">{s.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ReactChapter14Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          React Performance — Enemy Ko Pehchano, Phir Maaro
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Bhai, React mein re-render hona bura nahi hai — bahut baar hona zaroori hai! Lekin UNNECESSARY re-render — ye performance killer hai. Aaj seedha enemy se ladte hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Shocking fact — React mein 80% performance problems ka root cause ek cheez hai: unnecessary re-renders. Form mein type karo — 50 components re-render hote hain jo is text se completely unrelated hain. Ye problem hai. Aur iska solution blindly sab kuch memo wrap karna nahi hai — profiler se enemy dhundo, phir targeted attack karo.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein: re-renders kyun hote hain under the hood. Profiler se slow components identify karo. React.memo, useMemo, useCallback se precise fix. Code splitting se initial load optimize karo.
        </p>
      </div>

      <ReRenderCausesDiagram />

      <div id="rerenders">
        <ConceptCard
          title="Re-renders Kyun Hote Hain?"
          emoji="🔁"
          difficulty="advanced"
          whatIsIt="React ke andar Fiber architecture hai. Har component ek fiber node hai tree mein. Re-render trigger hone pe React work loop chalata hai — fiber tree traverse karta hai, kya badle check karta hai. Teen triggers: 1) setState — khud ka state change. 2) Parent re-render — React default behavior, parent re-render karo toh child bhi (chahe props same hoon). 3) Context value change — sab useContext consumers. Ye fundamental behavior hai — opt-out karo memo se, opt-in mat karo."
          whenToUse={[
            'Profiler se pehle identify karo — kab optimize karna hai',
            'Component bar bar re-render ho aur visible jank ho',
            'List items mein expensive calculations hoon',
            'Parent mein state ho jo sibling ko affect nahi karti — state lower karo',
          ]}
          whyUseIt="Re-render hona expensive hai kyun? Component function call hoti hai — sab variables recreate hote hain, JSX evaluate hoti hai, React diffing chalti hai virtual DOM pe, DOM patches apply hote hain. Unnecessary re-render matlab ye sab work bina actual output change ke. Understanding triggers tumhe precise solution deta hai."
          howToUse={{
            filename: 'rerender-demo.tsx',
            language: 'typescript',
            code: `// State change → re-render
function Counter() {
  const [count, setCount] = useState(0)
  console.log('Counter rendered')
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}

// Parent re-render → child re-render (even without prop change)
function Parent() {
  const [count, setCount] = useState(0)
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Parent: {count}</button>
      <Child />  {/* Child re-renders even though no props changed! */}
    </>
  )
}

function Child() {
  console.log('Child rendered')  // Har parent render par log dikhega
  return <div>I am child</div>
}

// Context change → all consumers re-render
const ThemeContext = createContext('dark')

function App() {
  const [theme, setTheme] = useState('dark')
  return (
    <ThemeContext.Provider value={theme}>
      <DeepChild />  {/* Har theme change par re-render — even bich ke components */}
    </ThemeContext.Provider>
  )
}`,
            explanation: "Trace karo — Parent render. Child function call. 'Child rendered' log. Props change nahi hua — phir bhi render. Ye React ka default. Kyun? React guarantee nahi kar sakta ki output same hai bina calling ke. Memo ek shortcut hai — 'agar props same hain toh pichla output valid hai.' State isolation bhi powerful hai — search state sirf search component mein rakho, parent ko pata hi nahi.",
          }}
          realWorldScenario="Real product list page — search input mein type karo. Har keystroke: 100 ProductCard re-render. Profile karo — 100 renders per keystroke. Fix 1: React.memo on ProductCard — props change nahi toh skip. Fix 2: search state sirf Header component mein rakho — parent React.memo product list pe nahi aata. Both approaches work, combination best."
          commonMistakes={[
            {
              mistake: 'Profiler use kiye bina optimize karna',
              why: 'Guess work se wrong components optimize hoti hain — waqt waste aur code complex ho jaata hai.',
              fix: 'Pehle React DevTools Profiler se measure karo — konsa component slow hai, kitne re-renders hain. Data-driven optimization karo.',
            },
            {
              mistake: 'Har cheez React.memo mein wrap karna',
              why: 'memo overhead hai — shallow comparison cost hoti hai. Simple/fast components ke liye memo helpful nahi, harmful ho sakta hai.',
              fix: 'Sirf wo components memo karo jo: (1) frequently re-render hote hain, (2) render expensive hai, (3) props rarely change karti hain.',
            },
          ]}
          proTip="why-did-you-render library — must-have development tool. Install karo, import karo setup file mein, Component.whyDidYouRender = true set karo. Console mein: 'ProductCard re-rendered with same props! Parent passed new handleAdd reference every render — check useCallback.' Exact cause milta hai. Profiler se kahan, why-did-you-render se kyun. Combination unbeatable hai."
        />
      </div>

      <div id="react-memo">
        <ConceptCard
          title="React.memo — Component Memoization"
          emoji="🧠"
          difficulty="advanced"
          whatIsIt="React.memo ka kaam ek line mein — 'parent re-render par mujhe call mat karo agar meri props same hain.' HOC internally: pichli props store karta hai, naye props ke saath shallow compare karta hai, same? Skip. Different? Call. Shallow compare — primitives direct compare, objects/arrays reference compare. Isliye inline objects aur functions memo ko defeat karte hain. useCallback aur useMemo partners hain memo ke — inke bina memo kabhi kabhi useless ho jaata hai."
          whenToUse={[
            'Component render expensive hai — heavy DOM, complex calculations',
            'Parent frequently re-render karta hai lekin child props stable hain',
            'Large lists — har row/card memoize karo',
            'Sidebar, header — global state changes se protect karo',
          ]}
          whyUseIt="Concrete numbers se samjhte hain — 100 ProductCard. Filter change hone par: bina memo — 100 renders. Memo ke saath + stable callbacks — sirf changed products re-render (filtering ke baad jo rehe). 100 se 5 renders. 20x improvement. Ye aankhen khol deta hai."
          howToUse={{
            filename: 'memo-demo.tsx',
            language: 'typescript',
            code: `import { memo, useCallback, useState } from 'react'

// Without memo — har parent render pe re-render
function ProductCardRaw({ product, onAdd }: { product: Product; onAdd: (id: string) => void }) {
  console.log('ProductCard render:', product.id)
  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAdd(product.id)}>Add to Cart</button>
    </div>
  )
}

// With memo — sirf product ya onAdd change hone par re-render
const ProductCard = memo(ProductCardRaw)

// Custom comparison — deep check ke liye
const ProductCardCustom = memo(
  ProductCardRaw,
  (prevProps, nextProps) =>
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.price === nextProps.product.price
  // Id aur price same hain toh re-render skip — baaki fields ignore
)

function ProductList() {
  const [cart, setCart] = useState<string[]>([])
  const [filter, setFilter] = useState('')

  // Without useCallback — naya function reference har render = memo useless
  const handleAdd = useCallback((id: string) => {
    setCart(prev => [...prev, id])
  }, [])  // Empty deps — function stable rehta hai

  return (
    <>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {products
        .filter(p => p.name.includes(filter))
        .map(p => (
          <ProductCard key={p.id} product={p} onAdd={handleAdd} />
        ))
      }
    </>
  )
}`,
            explanation: "Shallow compare trace karo — ProductCard prev props: { product: { id: '1', name: 'Laptop', price: 50000 }, onAdd: fn_ref_A }. New props: { product: { id: '1', name: 'Laptop', price: 50000 }, onAdd: fn_ref_B }. fn_ref_A !== fn_ref_B — DIFFERENT! Re-render. useCallback se fn_ref stays fn_ref_A — SAME! Skip. Ek unstable prop se poori memo fail.",
          }}
          realWorldScenario="Production scenario — 100 products, user search mein type karta hai. Bina memo: 100 renders har keystroke = jank. Memo lagaya lekin useCallback miss kiya: handleAdd naya reference har render = memo defeats. Memo + useCallback: search typing pe ProductCards skip, sirf filter change pe re-render. From 300ms jank to instant typing."
          commonMistakes={[
            {
              mistake: 'memo lagaya lekin useCallback bhool gaye',
              why: 'Function prop har parent render mein naya reference create karta hai — shallow compare fail → memo useless.',
              fix: 'Callback props hamesha useCallback mein wrap karo memo ke saath: const handleClick = useCallback(() => {}, [deps]).',
            },
            {
              mistake: 'Object/array props directly JSX mein create karna',
              why: '<Card style={{ color: "red" }} /> — har render nayi object reference = memo always re-render.',
              fix: 'Object props bahar move karo: const style = { color: "red" }; const memoStyle = useMemo(() => ({ color }), [color]); <Card style={memoStyle} />.',
            },
          ]}
          proTip="Custom comparator second argument mein — memo(Component, (prev, next) =&gt; prev.id === next.id && prev.price === next.price). Sirf id aur price compare karo — name, description, image ignore karo agar wo change pe re-render nahi chahiye. Lekin: comparator khud run karta hai har render — complex comparator se comparison cost > benefit. Measure karo. lodash.isEqual deep comparison ke liye reliable hai lekin slow hai — use sparingly."
        />
      </div>

      <div id="usememo-usecallback">
        <ConceptCard
          title="useMemo & useCallback — Reference Stability"
          emoji="📌"
          difficulty="advanced"
          whatIsIt="JavaScript ek interesting behavior hai — { a: 1 } === { a: 1 } is false. Do alag objects, alag references. Har render pe objects/functions banate hain toh har render pe naya reference — memo fail, effect loop. useMemo aur useCallback reference stability guarantors hain. useMemo: 'is computation ka result memoize karo.' useCallback: 'is function reference ko stable rakho.' Dono internally same mechanism — React cache rakha hai previous result, deps same hain toh same return."
          whenToUse={[
            'useMemo: Expensive computation — 1000+ items filter/sort, complex aggregation',
            'useCallback: Functions jo memo component props mein jaate hain',
            'useCallback: Functions jo useEffect dependency array mein hain',
            'Dono: Jab reference equality downstream optimization ke liye zaroori ho',
          ]}
          whyUseIt="Practical test — open console, { a: 1 } === { a: 1 } type karo. False milega. React mein: har render pe naya { theme, lang } object. memo child ko milta hai — shallow compare: different reference = re-render! useMemo se same deps pe same reference — memo check: same! Skip. Ye fundamental JavaScript concept React performance mein directly applies hota hai."
          howToUse={{
            filename: 'usememo-callback.tsx',
            language: 'typescript',
            code: `import { useMemo, useCallback, useState } from 'react'

function DataTable({ data, filters }: { data: Product[]; filters: Filter }) {
  // useMemo — filtered+sorted list sirf tab recalculate hogi jab data ya filters change ho
  const processedData = useMemo(() => {
    console.log('Computing processed data...')
    return data
      .filter(item => item.category === filters.category)
      .filter(item => item.price >= filters.minPrice)
      .sort((a, b) => a.price - b.price)
      .slice(0, 100)  // Pagination
  }, [data, filters.category, filters.minPrice])  // Only when these change

  // useCallback — stable function reference
  const handleSort = useCallback((column: string) => {
    setSortColumn(column)
  }, [])  // No deps — function never changes

  const handleFilter = useCallback((newFilter: Partial<Filter>) => {
    setFilters(prev => ({ ...prev, ...newFilter }))
  }, [])  // No deps — setFilters stable hai

  return (
    <table>
      <SortableHeader onSort={handleSort} />  {/* memo component — stable callback */}
      <tbody>
        {processedData.map(item => (
          <ProductRow key={item.id} product={item} />
        ))}
      </tbody>
    </table>
  )
}

// Common mistake — object dependency comparison
function BadComponent({ userId }: { userId: string }) {
  // ❌ options naya object har render — useMemo hamesha recalculate karega
  const options = { userId, includeDeleted: false }
  const data = useMemo(() => expensiveCalc(options), [options])  // Always runs!

  // ✅ Primitive dependencies use karo
  const data2 = useMemo(() => expensiveCalc({ userId, includeDeleted: false }), [userId])
  return <div>{JSON.stringify(data2)}</div>
}`,
            explanation: "Dependency trap trace karo — const options = { userId, includeDeleted: false }. useMemo([options]) — har render pe options naya object = memoization always invalidate. Fix: primitive deps use karo — useMemo([userId]) — userId string hai, stable compare. useState setters hamesha stable hain — deps mein daalna zaroorat nahi. Ye common mistake hai.",
          }}
          realWorldScenario="Analytics dashboard — 10,000 data points, multiple aggregations: sum, average, trend, percentiles. Without useMemo: har filter change pe — ek interaction, poori 10k items aggregation. With useMemo: sirf dateRange ya metric change pe recalculate. UI interactions? Instant. Ye difference user feel karta hai — jank vs smooth."
          commonMistakes={[
            {
              mistake: 'useMemo sab jagah use karna "just in case"',
              why: 'useMemo khud overhead hai — dependency tracking, value storage. Simple computations mein ye overhead benefit se zyada hoti hai.',
              fix: 'Profile first. useMemo sirf tab use karo jab (1) computation genuinely expensive ho aur (2) re-computation measurably slow kar raha ho.',
            },
            {
              mistake: 'useCallback dependency array miss karna',
              why: 'Stale closure — function old values capture karta hai. Missing dep = function wahi old value return karta rehta hai.',
              fix: 'ESLint react-hooks/exhaustive-deps rule enable karo — ye missing dependencies warn karta hai automatically.',
            },
          ]}
          proTip="Advanced pattern — useRef + useCallback combo. Function definition frequently change hoti hai lekin stable reference chahiye? const fnRef = useRef(fn); useEffect(() =&gt; { fnRef.current = fn }); const stableFn = useCallback((...args) =&gt; fnRef.current(...args), []). stableFn hamesha same reference, lekin latest fn call karta hai. Stale closure problem completely solve. Ye pattern React core team recommend karta hai complex cases ke liye."
        />
      </div>

      <div id="code-splitting">
        <ConceptCard
          title="Code Splitting — Lazy Load Karo"
          emoji="✂️"
          difficulty="advanced"
          whatIsIt="Ek simple math — aapki app ka bundle 3MB hai. User home page pe jaata hai. 3MB ka poora bundle load hota hai — admin panel ka code bhi, chart library bhi, PDF generator bhi — chahe user kuch use na kare. Code splitting bolta hai: sirf jo chahiye load karo. Home page — 200KB. Dashboard navigate karo — 400KB more. Admin panel — 600KB more. Wapas home pe? Cache se instant. Dynamic import() function JavaScript ka native feature hai — React.lazy iske upar built hai."
          whenToUse={[
            'Heavy components — charts, code editors, PDF viewers, 3D renders',
            'Route-based splitting — har route ka code alag chunk',
            'Admin panel — majority users kabhi access nahi karte',
            'Third-party libraries — Monaco editor, Recharts, sirf specific pages pe',
          ]}
          whyUseIt="Real numbers — code splitting ke bina: 3MB initial bundle, 8 seconds on 3G. Code splitting ke saath: 300KB initial, 1 second on 3G. 8x improvement. Core Web Vitals pe direct impact — LCP, FID improve hote hain. Google ranking pe impact. User bounce rate reduce hota hai. Ye 'nice to have' nahi, production requirement hai."
          howToUse={{
            filename: 'lazy-loading.tsx',
            language: 'typescript',
            code: `import { lazy, Suspense } from 'react'

// Route-based lazy loading
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Profile = lazy(() => import('./pages/Profile'))
const AdminPanel = lazy(() => import('./pages/AdminPanel'))

// Heavy component lazy loading
const ChartComponent = lazy(() => import('./components/HeavyChart'))

function App() {
  return (
    <BrowserRouter>
      {/* Suspense fallback loading dikhata hai jab chunk load ho */}
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

// Component level lazy loading
function AnalyticsPage() {
  const [showChart, setShowChart] = useState(false)

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <ChartComponent data={analyticsData} />  {/* Sirf click karne par load */}
        </Suspense>
      )}
    </div>
  )
}

// Named exports ke saath — destructure karo
const HeavyEditor = lazy(() =>
  import('./components/RichTextEditor').then(m => ({ default: m.RichTextEditor }))
)`,
            explanation: "React.lazy internally dynamic import() call karta hai — browser ka native feature. Webpack/Vite automatically code split karta hai jab import() dekhta hai. Suspense: 'jab tak component load ho raha hai ye fallback dikhao.' Strategy: route level lazy loading first karo (biggest win). Phir heavy components (charts, editors) within routes. Granular se zyada loading states — balance rakho.",
          }}
          realWorldScenario="Learning platform — code editor component Monaco Editor 2MB hai. Sirf playground page pe chahiye. lazy(() =&gt; import('./MonacoEditor')) — playground pe pehli baar jaao: 2MB download. Dusri baar? Cache se instant. Baki sab pages — 0 bytes Monaco download. Initial bundle 3MB se 1MB. Real users pe measurable improvement."
          commonMistakes={[
            {
              mistake: 'Suspense boundary ke bahar lazy component render karna',
              why: 'React error throw karta hai agar lazy component koi Suspense ancestor nahi paata.',
              fix: 'Hamesha lazy components ko Suspense ke andar render karo — close ancestor mein rakho for targeted loading states.',
            },
            {
              mistake: 'Component definition andar lazy() ke bina import karna',
              why: "lazy(() => import('./Comp')) correct hai. lazy(import('./Comp')) nahi — immediate import hoti hai, lazy loading nahi.",
              fix: 'lazy() ko arrow function pass karo jo import() return kare — tabhi lazy evaluation hoti hai.',
            },
          ]}
          proTip="Bundle analysis — ye eye-opener hai. Vite mein: npm i -D rollup-plugin-visualizer, vite.config.ts mein plugin add karo. npm run build — browser mein interactive treemap khulta hai. Immediately pata chalta hai: 'bhai ye date-fns 200KB le raha hai sirf format() ke liye?' Tree-shaking check karo, lazy loading candidates identify karo. Webpack users: webpack-bundle-analyzer use karo. Pehli baar dekhoge toh shocked ho jaoge."
        />
      </div>

      <div id="profiler">
        <ConceptCard
          title="React DevTools Profiler — Flames Padho"
          emoji="🔥"
          difficulty="advanced"
          whatIsIt="Profiler React DevTools ka most powerful feature hai — aur most underused. Record dabao, interact karo app se, stop karo. Flame graph mein: horizontal axis = time, width = render duration. Color: gray = fast render, blue = rendered this commit, orange/red = slow. Har component pe hover — render time miliseconds mein. Click — 'Why did this render?' — exact props/state jo change hua. Ye data-driven optimization ka foundation hai."
          whenToUse={[
            'App slow lag rahi ho — identify karo exactly kahan time ja raha hai',
            'User interaction (click, scroll, type) mein visible lag ho',
            'Specific component render count check karna ho',
            'Optimization validate karo — before aur after compare karo numbers mein',
          ]}
          whyUseIt="Bina profiler ke optimization guess work hai. 'I think ProductCard slow hai' — maybe. Profiler ke saath: 'ProductCard 47ms, 200 times rendered in 10 seconds. SortableHeader 2ms, 500 times — unnecessary.' Targeted fix: SortableHeader — memo + stable sort callback. Result: 500 renders → 1. Profiler ne exact problem bataya — fix took 5 minutes."
          howToUse={{
            filename: 'profiler-usage.tsx',
            language: 'typescript',
            code: `import { Profiler } from 'react'

// Programmatic profiling — specific component tree
function onRenderCallback(
  id: string,               // Component ka "id" prop
  phase: 'mount' | 'update',
  actualDuration: number,   // Render time milliseconds
  baseDuration: number,     // Memoization ke bina theoretical time
  startTime: number,
  commitTime: number,
) {
  if (actualDuration > 16) {  // 60fps ke liye 16ms budget
    console.warn(\`Slow render: \${id} - \${actualDuration.toFixed(2)}ms\`)
  }
}

function App() {
  return (
    <Profiler id="ProductList" onRender={onRenderCallback}>
      <ProductList products={products} />
    </Profiler>
  )
}

// DevTools Profiler steps:
// 1. Browser → React DevTools → Profiler tab
// 2. "Record" button click karo (circle)
// 3. App interact karo — click, scroll, type
// 4. "Stop" recording
// 5. Flamechart dekho:
//    - Width = render time (wide = slow)
//    - Color = gray (didn't render), blue (rendered)
//    - Hover = component name + render time
// 6. "Why did this render?" = props/state jo change hui`,
            explanation: "React.Profiler component programmatic profiling deta hai — Profiler id='ProductList' onRender={callback} wrap karo tree ko. actualDuration: actual render time. baseDuration: memoization ke bina estimated time. baseDuration >> actualDuration? Memoization working. baseDuration ≈ actualDuration? Memoization missing ya ineffective. Ye comparison profiler ki hidden gem hai.",
          }}
          realWorldScenario="DataGrid 450ms — user complain. Profiler: 5000 rows render, 450ms. Why did this render: filter changed. Root cause: 5000 rows React.memo se protect nahi tha. Virtual rows visible nahi the phir bhi render ho rahe the. Fix: react-window virtualization (sirf visible rows render) + React.memo. Result: 450ms → 12ms. 37x improvement. User notice kiya."
          commonMistakes={[
            {
              mistake: 'Production bundle mein profiling karna',
              why: 'Production React mein profiling stripped out hoti hai by default — inaccurate ya no data milega.',
              fix: 'Development mode mein profile karo. Ya production profiling ke liye react-dom/profiling build use karo.',
            },
            {
              mistake: 'CPU throttling ke bina profile karna',
              why: 'Developer machine powerful hoti hai — real users 4G phone par slow hote hain. Fast machine par slow renders nahi dikhte.',
              fix: 'Chrome DevTools → Performance → CPU throttling 4x ya 6x set karo. Realistic performance numbers milenge.',
            },
          ]}
          proTip="React.Profiler production mein bhi use karo Real User Monitoring (RUM) ke liye! if (actualDuration &gt; 16) analytics.track('SlowRender', { component: id, duration: actualDuration, phase }). 16ms = 60fps threshold. Isse zyada render time matlab frame drop. Real users pe real slow renders identify karo. Developer machine pe fast lagta hai — real users ke old phones pe? Profiler data batata hai. Production-grade performance monitoring sirf kuch lines ka kaam hai."
        />
      </div>
    </div>
  )
}
