'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

export default function ReactChapter14Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          React Performance — Re-renders Samjho, Optimize Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          &ldquo;Premature optimization is the root of all evil&rdquo; — lekin jab app slow ho toh jaanna zaroori hai kyun. React mein 80% performance issues unnecessary re-renders se aate hain. Samjho kab aur kyun re-render hota hai, phir sahi tool use karo fix karne ke liye.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein: React DevTools Profiler se identify karo slow components, React.memo / useMemo / useCallback se fix karo, code splitting se initial load kam karo.
        </p>
      </div>

      <div id="rerenders">
        <ConceptCard
          title="Re-renders Kyun Hote Hain?"
          emoji="🔁"
          difficulty="advanced"
          whatIsIt="React component 3 conditions mein re-render hota hai: 1) Khud ki state change ho (setState), 2) Parent component re-render ho, 3) Context value change ho. Ye sab cases mein React component function dobara call karta hai — even agar output same ho. Ye React ka fundamental behavior hai, optimization baad mein aati hai."
          whenToUse={[
            'React DevTools Profiler se slow components identify karo pehle',
            'Component baar baar re-render ho aur visible lag lag dikhe',
            'List items ke saath expensive calculations hoon',
            'Parent mein state ho jo sibling ko affect nahi karti — state lower karo',
          ]}
          whyUseIt="Unnecessary re-renders waste karte hain — expensive render functions baar baar call honti hain, DOM diffing overhead hota hai. Understanding causes tumhe targeted optimization karne deta hai. Blind optimization (memo sab jagah) worse performance de sakta hai."
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
            explanation: "Parent re-render par Child bhi re-render hota hai — ye React ka default behavior hai. memo se prevent karo. Context value change par sab useContext users re-render hote hain — context split karo ya memoize karo. State lifting unnecessarily sab cheez re-render karta hai — state jahan use ho wahan rakho.",
          }}
          realWorldScenario="Large product list page — header mein search input mein type karo aur har keystroke par 100 ProductCard re-render ho rahe hain (parent state change). Fix: search state sirf header mein rakho, ProductCard ke props change hone par hi re-render karo — React.memo se."
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
          proTip="why-did-you-render library install karo development mein — ye console mein dikhata hai exact reason kyun component re-rendered. `import '@welldone-software/why-did-you-render'; Component.whyDidYouRender = true;`. Debugging bahut easy ho jaati hai."
        />
      </div>

      <div id="react-memo">
        <ConceptCard
          title="React.memo — Component Memoization"
          emoji="🧠"
          difficulty="advanced"
          whatIsIt="React.memo ek Higher-Order Component hai jo component wrap karta hai aur props shallow compare karta hai. Agar props same hain toh re-render skip karta hai. Ye optimization hai — pure components ke liye: same props = same output guarantee de sako toh memo lagao."
          whenToUse={[
            'Component ka render expensive hai (list items with computation)',
            'Parent frequently re-render karta hai lekin child ke props stable hain',
            'Callbacks parent mein define hain — useCallback ke saath pair karo',
            'Large lists jaise virtualised lists mein har item component',
          ]}
          whyUseIt="React.memo extra renders prevent karta hai jab props actually change nahi hui. Performance gain real hota hai expensive renders mein. Simple components pe overhead zyada hoti hai benefit se — isliye selectively apply karo."
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
            explanation: "React.memo sirf shallow compare karta hai — primitive props (string, number, boolean) correctly compare hoti hain. Objects aur arrays reference compare hote hain — naya object har render = memo miss. Isliye useCallback ke saath callback functions stable banao, useMemo se objects stable banao.",
          }}
          realWorldScenario="100 item product list mein filter change hone par sirf filtered products change hote hain — React.memo ensure karta hai ki unfiltered, unchanged products dobara render na hon. 100 renders se 5-10 renders — dramatic improvement large lists mein."
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
          proTip="memo second argument mein custom comparator function accept karta hai — deep comparison implement karo agar zaroori ho: memo(Component, (prev, next) => isEqual(prev, next)). lodash.isEqual ya fast-deep-equal use karo. Lekin custom comparison khud also overhead hai — measure karo."
        />
      </div>

      <div id="usememo-usecallback">
        <ConceptCard
          title="useMemo & useCallback — Reference Stability"
          emoji="📌"
          difficulty="advanced"
          whatIsIt="useMemo value memoize karta hai — expensive calculation dobara nahi hoti jab tak dependencies change na hon. useCallback function memoize karta hai — same function reference return karta hai dependencies stable rehne tak. Dono reference equality preserve karte hain — memo aur dependency arrays ke liye zaroori."
          whenToUse={[
            'useMemo: Expensive computation jo props/state se derive hoti ho — list filtering, sorting, complex math',
            'useCallback: Functions jo memo components ke props mein jaate hain',
            'useCallback: Functions jo useEffect dependency array mein hain',
            'Dono: Jab reference equality bahut zaroori ho downstream optimization ke liye',
          ]}
          whyUseIt="JavaScript mein { a: 1 } === { a: 1 } false hota hai — new object reference. Har render mein naya object ya function React ka diff engine trigger karta hai. useMemo/useCallback same reference return karte hain — downstream effects/memo benefit milta hai."
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
            explanation: "useMemo dependency array mein sirf primitive values ya stable references daalo — objects/arrays directly daalne se memoization break ho jaati hai (naya reference every render). useCallback dependencies mein setters (from useState) daalna zaroori nahi — ye always stable hote hain.",
          }}
          realWorldScenario="Analytics dashboard mein 10,000 data points ke saath chart — useMemo se aggregation calculation sirf tab chale jab dateRange ya metric change ho. Nahi toh har tiny UI interaction pe expensive aggregation dobara chalegi."
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
          proTip="useCallback(() => fn, []) ke bajaye useRef + useCallback pattern use karo agar function definition often change hoti hai: const fnRef = useRef(fn); useEffect(() => { fnRef.current = fn }); const stableFn = useCallback((...args) => fnRef.current(...args), []). Stable reference, latest function."
        />
      </div>

      <div id="code-splitting">
        <ConceptCard
          title="Code Splitting — Lazy Load Karo"
          emoji="✂️"
          difficulty="advanced"
          whatIsIt="Code splitting se JavaScript bundle chhote chhote chunks mein split hota hai — sirf jo code is moment chahiye wo load hota hai. React.lazy aur Suspense se components on-demand load hote hain. Route-based splitting se initial bundle dramatically kam hota hai — app faster load hota hai."
          whenToUse={[
            'Heavy components jo initially screen par nahi hain — charts, editors, modals',
            'Route-based splitting — har route ka code alag chunk mein',
            'Third-party libraries jo sirf ek feature mein use hoti hain — charts, PDF generators',
            'Admin panel jo sirf kuch users use karte hain — baki users ke liye load nahi karna',
          ]}
          whyUseIt="App ka poora JavaScript bundle ek baar load karna slow initial load deta hai — sabka code load hota hai chahe use na ho. Code splitting se user sirf wo code download karta hai jo use karta hai. First contentful paint dramatically better hota hai."
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
            explanation: "React.lazy dynamic import() use karta hai — code splitting automatically hoti hai webpack/vite se. Suspense fallback tab dikhaata hai jab component load ho raha ho. Route level lazy loading best practice hai — har route apna chunk banata hai. Suspense boundary strategic rakho — bahut granular karne se zyada loading states.",
          }}
          realWorldScenario="NodeMaster jaisi app mein — code editor component (Monaco/CodeMirror) bahut bhaari library hai. Sirf wahan load karo jahan code editor dikhna chahiye, baaqi pages pe load nahi hogi. Initial bundle 2MB se 200KB — 10x improvement."
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
          proTip="Vite mein vite-bundle-visualizer use karo bundle size analyze karne ke liye. Ye treemap dikhata hai kaunsi libraries kitni space le rahi hain — immediately obvious ho jaata hai kya lazy load karna chahiye. `npm run build -- --report` similarly webpack ke liye."
        />
      </div>

      <div id="profiler">
        <ConceptCard
          title="React DevTools Profiler — Flames Padho"
          emoji="🔥"
          difficulty="advanced"
          whatIsIt="React DevTools Profiler record karta hai har render ko — kitna time laga, kyun render hua, kaunse components slow hain. Flamechart dikhata hai component tree ka render timeline. Ye tool performance optimization ka starting point hai — andaaze lagaane se zyada accurate."
          whenToUse={[
            'App slow lag rahi ho — identify karo kahan time ja raha hai',
            'User interaction (click, scroll) mein lag feel ho',
            'Specific component ke render count check karna ho',
            'Optimization ke effect validate karne ke liye — before aur after compare karo',
          ]}
          whyUseIt="Profiler ke bina blindly optimize karte hain — wrong component memo karte hain, waqt waste hota hai. Profiler actual data deta hai: 'ProductCard 47ms le raha hai render karne mein, 200 baar render hua.' Is data se targeted fix karo."
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
            explanation: "React DevTools Profiler bar chart ya flamechart dono modes mein kaam karta hai. Ranked chart se sabse slow components top mein — easy to identify. 'Why did this render?' feature from React 17+ specific props/hooks jo change hue dikhata hai. Commit list se specific interactions analyze karo.",
          }}
          realWorldScenario="Dashboard slow ho rahi thi user report ke baad — Profiler se pata chala DataGrid component 450ms le raha tha har filter change par. Cause: 5000 row rendering. Fix: virtualization (react-window) + React.memo. Result: 450ms → 12ms render time."
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
          proTip="React.Profiler component production logging ke liye use karo — actualDuration track karo aur apne analytics mein bhejo: if (actualDuration > threshold) analytics.track('SlowRender', { component: id, duration: actualDuration }). Real user performance monitoring (RUM) ka part bana sakte ho."
        />
      </div>
    </div>
  )
}
