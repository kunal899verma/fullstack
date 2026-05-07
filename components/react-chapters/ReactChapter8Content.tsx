'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const memoQuiz: QuizQuestion[] = [
  {
    question: 'useRef aur useState mein kya fundamental fark hai?',
    options: [
      { text: 'useRef sirf DOM ke liye hai', correct: false, explanation: 'useRef DOM references aur mutable values dono ke liye kaam karta hai.' },
      { text: 'useRef change pe re-render trigger nahi karta; useState karta hai', correct: true, explanation: 'Sahi! useRef.current update karo — UI nahi badlta. useState update karo — React re-render schedule karta hai.' },
      { text: 'useState persistent hai; useRef reset hota hai har render pe', correct: false, explanation: 'Dono persist karte hain across renders.' },
      { text: 'useRef async hai', correct: false, explanation: 'useRef synchronous hai — koi special async behavior nahi.' },
    ],
  },
  {
    question: 'useMemo kab actually helpful hota hai?',
    options: [
      { text: 'Hamesha — every computed value memoize karo', correct: false, explanation: 'Over-memoization memory waste aur code complexity badhata hai.' },
      { text: 'Jab genuinely expensive computation ho aur deps frequently change na ho', correct: true, explanation: 'Sahi! Simple calculations ke liye useMemo overhead se zyada cost hoti hai. Profile first!' },
      { text: 'Sirf arrays ke liye', correct: false, explanation: 'useMemo kisi bhi computed value ke liye — object, array, string, number.' },
      { text: 'Network requests memoize karne ke liye', correct: false, explanation: 'Network requests ke liye React Query ya SWR use karo — useMemo nahi.' },
    ],
  },
  {
    question: 'useCallback kab zaroori hai?',
    options: [
      { text: 'Hamesha — sab functions wrap karo', correct: false, explanation: 'Unnecessary useCallback overhead hai — memory + complexity.' },
      { text: 'Jab function memo wrapped child component ka prop ho ya useEffect dependency ho', correct: true, explanation: 'Bilkul! Warna har render pe new function reference — memo benefit lost, ya effect infinite loop.' },
      { text: 'Sirf async functions ke liye', correct: false, explanation: 'useCallback sync aur async dono functions ke liye kaam karta hai.' },
      { text: 'Sirf class methods ke liye', correct: false, explanation: 'useCallback functional components mein arrow functions aur regular functions sab ke liye.' },
    ],
  },
  {
    question: 'React.memo kab re-render karta hai component?',
    options: [
      { text: 'Kabhi nahi', correct: false, explanation: 'React.memo props change pe re-render karta hai.' },
      { text: 'Jab koi bhi prop reference change kare (shallow comparison)', correct: true, explanation: 'Sahi! React.memo shallow comparison karta hai. Object props change reference pe — React.memo se benefit nahi unless stable refs.' },
      { text: 'Sirf jab string props change hoon', correct: false, explanation: 'Sab props shallow compare hote hain — strings, numbers, objects, arrays, functions.' },
      { text: 'Parent render hone pe hamesha', correct: false, explanation: 'React.memo parent re-renders se protect karta hai — sirf prop change pe re-render.' },
    ],
  },
  {
    question: 'Performance optimization kab karna chahiye?',
    options: [
      { text: 'Upfront — sab kuch memoize karo from the start', correct: false, explanation: 'Premature optimization — complexity badhti hai, actual bottlenecks different ho sakte hain.' },
      { text: 'Profile first — actual bottleneck dhundo, phir optimize', correct: true, explanation: 'Sahi! Chrome Profiler se measure karo — kaunsa component slow hai. Phir targeted optimization. Guess mat karo.' },
      { text: 'Kabhi nahi — React fast enough hai', correct: false, explanation: 'Complex apps mein optimization zaroori ho sakti hai — par profile first.' },
      { text: 'Sirf production mein', correct: false, explanation: 'Development mein profile karo, understand karo, phir production fix apply karo.' },
    ],
  },
]

export default function ReactChapter8Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(6,182,212,0.06)',
          border: '1px solid rgba(6,182,212,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          useRef, useMemo, useCallback — Performance Tools
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          React performance optimization ke teen hooks — useRef (mutable values without re-render), useMemo (expensive computation cache), useCallback (function reference stability). Plus React.memo (component memoization). Lekin remember: profile first, optimize second.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum ye teeno hooks cover karenge — kab use karo, kab nahi use karo, aur common anti-patterns.
        </p>
      </div>

      <div id="useref">
        <ConceptCard
          title="useRef — Mutable Values Without Re-render"
          emoji="📌"
          difficulty="intermediate"
          whatIsIt="useRef ek mutable container hai — .current property se access karo. DOM elements directly access karne ke liye. Mutable values jo re-render trigger nahi karte — previous values, timers, instance variables. Ref change hone pe component re-render nahi karta — useState se ye fundamental difference hai."
          whenToUse={[
            'DOM element directly access karna — focus, scroll, measurements',
            'Previous state value store karna',
            'Timer/interval IDs store karna',
            'Mutable values jo UI affect nahi karte',
          ]}
          whyUseIt="useRef se woh values store karo jo render cycle se independent hain. Focus management — input focus on mount. Previous value comparison — animation triggers. Timer IDs — cleanup ke liye. Re-render trigger nahi karta — performance better."
          howToUse={{
            filename: 'UseRef.tsx',
            language: 'tsx',
            code: `import { useRef, useEffect, useState } from 'react'

// ── DOM ACCESS ────────────────────────────────────────────────────
function AutoFocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Mount pe focus
    inputRef.current?.focus()
  }, [])

  return <input ref={inputRef} type="text" placeholder="Auto-focused!" />
}

// ── PREVIOUS VALUE HOOK ───────────────────────────────────────────
function usePrevious<T>(value: T): T | undefined {
  const prevRef = useRef<T | undefined>(undefined)

  // After render — store current as previous
  useEffect(() => {
    prevRef.current = value
  })

  return prevRef.current  // Returns previous render's value
}

function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <div>
      <p>Current: {count} | Previous: {prevCount ?? 'none'}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  )
}

// ── TIMER STORAGE ─────────────────────────────────────────────────
function Stopwatch() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function start() {
    setRunning(true)
    intervalRef.current = setInterval(() => {
      setTime(t => t + 1)
    }, 1000)
  }

  function stop() {
    setRunning(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  function reset() {
    stop()
    setTime(0)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div>
      <p>{time}s</p>
      {running ? <button onClick={stop}>Stop</button> : <button onClick={start}>Start</button>}
      <button onClick={reset}>Reset</button>
    </div>
  )
}

// ── SCROLL INTO VIEW ──────────────────────────────────────────────
function MessageList({ messages }: { messages: string[] }) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // New message pe bottom scroll karo
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div style={{ height: '300px', overflowY: 'scroll' }}>
      {messages.map((msg, i) => <p key={i}>{msg}</p>)}
      <div ref={bottomRef} />  {/* Scroll target */}
    </div>
  )
}

// ── INSTANCE VARIABLES (avoid class fields) ───────────────────────
function ComponentWithInstanceVar() {
  const renderCountRef = useRef(0)
  const [count, setCount] = useState(0)

  renderCountRef.current++  // Track renders — no re-render triggered!

  return (
    <div>
      <p>State count: {count} | Renders: {renderCountRef.current}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  )
}`,
            explanation: 'useRef DOM nodes ke liye — ref prop se. Mutable values ke liye — .current directly assign karo. Re-render trigger nahi karta — pure mutable container. Previous value pattern — render ke baad update. Timer IDs store karo — cleanup ke liye.',
          }}
          realWorldScenario="Video player component: const videoRef = useRef<HTMLVideoElement>(null). play() button: videoRef.current?.play(). pause() button: videoRef.current?.pause(). seekTo(time): videoRef.current!.currentTime = time. Direct DOM API — React state nahi."
          commonMistakes={[
            {
              mistake: 'useRef change karna aur UI update expect karna',
              why: 'ref.current change UI trigger nahi karta. User value nahi dekh pata.',
              fix: 'UI display ke liye useState use karo. useRef sirf internal tracking ke liye.',
            },
            {
              mistake: 'ref.current render mein seedha read karna',
              why: 'Render mein ref.current stale ho sakta hai — renders ke beech sync nahi guaranteed.',
              fix: 'ref.current event handlers aur useEffect mein safely read karo.',
            },
          ]}
          proTip="forwardRef parent ko child DOM access deta hai: const Input = forwardRef<HTMLInputElement, Props>((props, ref) => <input ref={ref} {...props} />). Parent: const inputRef = useRef<HTMLInputElement>(null); <Input ref={inputRef} />. Library components often forwardRef expose karte hain."
        />
      </div>

      <div id="usememo">
        <ConceptCard
          title="useMemo — Expensive Computation Cache"
          emoji="🧮"
          difficulty="intermediate"
          whatIsIt="useMemo computation result memoize karta hai — dependencies change hone pe hi recompute. Referential equality maintain karta hai — same object/array reference agar value same hai. Overuse se overhead — memoization ka cost computation cost se kam hona chahiye. Profile karo pehle!"
          whenToUse={[
            'Genuinely expensive computation — sorting 10k items, complex filtering',
            'Referential stability — useMemo result useEffect ya memo child pe dep hai',
            'Derived state — multiple state values se complex object banana',
            'Kabhi nahi — unless actual performance problem measured ho',
          ]}
          whyUseIt="useMemo re-renders pe unnecessary recomputation prevent karta hai. Referential stability — child components memo ke saath unnecessary re-renders avoid karte hain. Complex derived data — filter + sort + group ek saath memoize karo. But: simple calculations memoize mat karo — overhead zyada hoga."
          howToUse={{
            filename: 'UseMemo.tsx',
            language: 'tsx',
            code: `import { useMemo, useState } from 'react'

// ── EXPENSIVE COMPUTATION ─────────────────────────────────────────
function ProductList({ products, filters }: {
  products: Product[]
  filters: { category: string; minPrice: number; maxPrice: number; search: string }
}) {
  // ❌ Without useMemo — recomputes on EVERY render!
  // const filtered = products
  //   .filter(p => p.category === filters.category)
  //   .filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)
  //   .filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()))
  //   .sort((a, b) => a.price - b.price)

  // ✅ With useMemo — recomputes only when deps change
  const filtered = useMemo(() => {
    return products
      .filter(p => filters.category === 'all' || p.category === filters.category)
      .filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)
      .filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()))
      .sort((a, b) => a.price - b.price)
  }, [products, filters.category, filters.minPrice, filters.maxPrice, filters.search])

  return (
    <div>
      <p>{filtered.length} products found</p>
      {filtered.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}

// ── REFERENTIAL STABILITY ─────────────────────────────────────────
function Parent() {
  const [theme, setTheme] = useState('dark')
  const [lang, setLang] = useState('en')

  // Without useMemo — new object every render — Child always re-renders!
  // const config = { theme, lang }

  // With useMemo — same reference if theme and lang haven't changed
  const config = useMemo(() => ({ theme, lang }), [theme, lang])

  return (
    <>
      <Child config={config} />  {/* React.memo protected child */}
      <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>Toggle Theme</button>
    </>
  )
}

const Child = React.memo(({ config }: { config: { theme: string; lang: string } }) => {
  console.log('Child re-rendered with config:', config)
  return <div>Theme: {config.theme}, Lang: {config.lang}</div>
})

// ── WHEN NOT TO USEMEMO ───────────────────────────────────────────
function SimpleComponent({ items }: { items: string[] }) {
  // ❌ Unnecessary — this is NOT expensive
  const count = useMemo(() => items.length, [items])

  // ✅ Just use directly
  const count2 = items.length

  // ❌ Unnecessary — string concat is cheap
  const title = useMemo(() => items.join(', '), [items])

  // ✅ Just use directly
  const title2 = items.join(', ')

  return <div>{count2} items: {title2}</div>
}`,
            explanation: 'useMemo deps change pe recompute, warna cached return. Referential stability — same deps → same object reference → child memo works. Expensive: 1000+ items sort/filter. NOT expensive: simple arithmetic, string concat, < 100 items. Profile first — guess mat karo.',
          }}
          realWorldScenario="Data table: 5000 rows, multiple column filters, sort — useMemo se filter + sort result cache karo. Filter changes — recompute. Theme change — no recompute (products same). Bina useMemo: har parent re-render pe 5000 items re-filter — visible jank."
          commonMistakes={[
            {
              mistake: 'useMemo hamesha use karna "just in case"',
              why: 'useMemo overhead hai — comparison cost, cache storage. Simple values ke liye net slower.',
              fix: 'React Profiler se measure karo. useMemo sirf measurable bottlenecks pe. Start without, add if needed.',
            },
            {
              mistake: 'useMemo mein side effects',
              why: 'useMemo pure computation ke liye hai — side effects here unpredictable.',
              fix: 'Side effects useEffect mein. useMemo pure transformation — input → output, no external changes.',
            },
          ]}
          proTip="useMemo aur useCallback React.memo ke saath synergy hai. Bina React.memo — memoization useless hai (component re-renders anyway). Trio: React.memo component, useMemo object props, useCallback function props — properly implemented se dramatic performance gains. Profile, measure, then optimize."
        />
      </div>

      <div id="usecallback">
        <ConceptCard
          title="useCallback — Function Reference Stability"
          emoji="🔒"
          difficulty="intermediate"
          whatIsIt="useCallback function memoize karta hai — same reference return karta hai agar deps same hain. Function props ke liye React.memo child ke saath zaroori hai. useEffect dependency ke liye. Bina useCallback — every render pe naya function reference → memo benefit lost ya effect loop."
          whenToUse={[
            'Memo wrapped child component ke liye function prop',
            'useEffect dependency mein function',
            'Heavy computation karne wali functions (rare)',
            'Context value mein functions',
          ]}
          whyUseIt="Functions JavaScript mein reference types hain — () => {} === () => {} is false. Har render pe naya function reference. React.memo shallow comparison karta hai — function prop changed → child re-render. useCallback stable reference deta hai — memo works, effects stable."
          howToUse={{
            filename: 'UseCallback.tsx',
            language: 'tsx',
            code: `import { useCallback, useState, memo } from 'react'

// ── WITHOUT useCallback — Child always re-renders ──────────────────
function ParentBad() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  // New function every render — even when count doesn't change!
  const handleDelete = (id: string) => {
    deleteItem(id)
  }

  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      {/* Child re-renders on EVERY name change — even though handleDelete same! */}
      <ExpensiveList onDelete={handleDelete} />
    </>
  )
}

// ── WITH useCallback — Child only re-renders when needed ───────────
function ParentGood() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  // Stable reference — only recreates when deps change
  const handleDelete = useCallback((id: string) => {
    deleteItem(id)
  }, [])  // No deps — never recreates (deleteItem is stable external fn)

  const handleUpdate = useCallback((id: string, data: object) => {
    updateItem(id, data)
    setCount(c => c + 1)  // Uses functional update — no dep needed
  }, [])  // Stable!

  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      {/* Only re-renders when handleDelete changes (never) */}
      <ExpensiveList onDelete={handleDelete} onUpdate={handleUpdate} />
    </>
  )
}

// Memoized child
const ExpensiveList = memo(({ onDelete, onUpdate }: {
  onDelete: (id: string) => void
  onUpdate: (id: string, data: object) => void
}) => {
  console.log('ExpensiveList rendered!')
  return <div>Complex list...</div>
})

// ── useCallback WITH useEffect ────────────────────────────────────
function DataFetcher({ userId }: { userId: string }) {
  const [data, setData] = useState(null)

  // Without useCallback — fetchUser new every render → effect loop!
  const fetchUser = useCallback(async () => {
    const res = await fetch(\`/api/users/\${userId}\`)
    return res.json()
  }, [userId])  // Re-create only when userId changes

  useEffect(() => {
    fetchUser().then(setData)
  }, [fetchUser])  // Safe — fetchUser stable unless userId changes

  return <div>{JSON.stringify(data)}</div>
}

// ── WHEN NOT TO USE useCallback ────────────────────────────────────
function SimpleList({ items }: { items: string[] }) {
  // ❌ Unnecessary — handler not passed to memo child or effect
  const handleClick = useCallback((item: string) => {
    console.log(item)
  }, [])

  // ✅ Just arrow function fine here
  return (
    <ul>
      {items.map(item => (
        <li key={item} onClick={() => console.log(item)}>{item}</li>
      ))}
    </ul>
  )
}`,
            explanation: 'useCallback stable function reference deta hai. React.memo ke saath synergy — function prop stable → child no unnecessary re-render. useEffect dep mein function → useCallback zaroori. Without React.memo — useCallback useless (component re-renders anyway). Both together — optimization.',
          }}
          realWorldScenario="Large table mein row actions — edit, delete, view. ParentTable har filter change pe re-render. Bina useCallback — sab 1000 rows re-render. useCallback stable handlers + React.memo rows — sirf changed rows re-render. Visible performance improvement."
          commonMistakes={[
            {
              mistake: 'useCallback use karna without React.memo child',
              why: 'Parent re-renders → child re-renders anyway — useCallback overhead mein paisa barbaad.',
              fix: 'useCallback + React.memo together. Warna useCallback pointless.',
            },
            {
              mistake: 'useCallback deps mein state miss karna',
              why: 'Stale closure — function mein old state value. Wrong behavior.',
              fix: 'Deps honest rakho. Agar state update zaroorat hai — functional update use karo: setState(prev => ...) — dep nahi chahiye.',
            },
          ]}
          proTip="useCallback implementation internally useMemo hai: useCallback(fn, deps) === useMemo(() => fn, deps). Yaad rakhna easy ho jaata hai. React Compiler (upcoming) automatically memoize karta hai — manual useCallback/useMemo deprecated ho jaayenge eventually. Abhi ke liye ye patterns zaroori hain."
        />
      </div>

      <div id="react-memo">
        <ConceptCard
          title="React.memo — Component Memoization"
          emoji="🛡️"
          difficulty="intermediate"
          whatIsIt="React.memo HOC hai jo component ke props shallow compare karta hai — agar same hain toh re-render skip. Parent re-renders se protect karta hai child ko. Custom comparison function de sakte ho — deep comparison ya specific fields. Overuse se counterproductive — comparison cost."
          whenToUse={[
            'Expensive render wale child components',
            'Parent frequently re-renders but child props rarely change',
            'Large lists ke items — rows, cards',
            'Sidebar, header — global state changes pe re-render avoid',
          ]}
          whyUseIt="React.memo parent re-renders se protect karta hai. Same props → no re-render. useCallback aur useMemo ke saath synergy — function/object props stable bano toh memo benefit milta hai. Heavy components — charts, complex UIs — memo ke saath fast feel."
          howToUse={{
            filename: 'ReactMemo.tsx',
            language: 'tsx',
            code: `import { memo, useState, useCallback, useMemo } from 'react'

// ── BASIC REACT.MEMO ──────────────────────────────────────────────
const ProductCard = memo(({ product, onAddToCart }: {
  product: { id: string; name: string; price: number }
  onAddToCart: (id: string) => void
}) => {
  console.log(\`ProductCard rendered: \${product.name}\`)

  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  )
})

// Parent — frequent re-renders
function Shop() {
  const [cartCount, setCartCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  const products = [
    { id: '1', name: 'Laptop', price: 50000 },
    { id: '2', name: 'Phone', price: 30000 },
  ]

  // ✅ useCallback — stable reference for memo child
  const handleAddToCart = useCallback((id: string) => {
    setCartCount(c => c + 1)
    addToCart(id)
  }, [])  // Stable

  return (
    <>
      <p>Cart: {cartCount}</p>
      <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      {/* ProductCard won't re-render when searchTerm changes! */}
      {products.map(p => (
        <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
      ))}
    </>
  )
}

// ── CUSTOM COMPARISON ─────────────────────────────────────────────
const ExpensiveChart = memo(
  ({ data, config }: { data: number[]; config: { color: string } }) => {
    // ... heavy chart rendering
    return <canvas>Chart</canvas>
  },
  // Custom comparison — only re-render if data values actually changed
  (prevProps, nextProps) => {
    // Return true = no re-render (equal), false = re-render (not equal)
    if (prevProps.config.color !== nextProps.config.color) return false
    if (prevProps.data.length !== nextProps.data.length) return false
    return prevProps.data.every((v, i) => v === nextProps.data[i])
  }
)

// ── WHEN NOT TO USE REACT.MEMO ────────────────────────────────────
// ❌ Simple components — overhead zyada, benefit kam
const SimpleText = memo(({ text }: { text: string }) => <span>{text}</span>)
// ✅ Just use directly
const SimpleTextV2 = ({ text }: { text: string }) => <span>{text}</span>

// ❌ Component jo always re-render karna chahiye
const Clock = memo(() => <p>{new Date().toISOString()}</p>)
// Always re-renders needed — memo useless

// ── PERFORMANCE CHECK ─────────────────────────────────────────────
// Chrome DevTools → Profiler tab → Record → Interact → Stop
// See render flame graph — which components slow, which re-render unnecessarily`,
            explanation: 'React.memo props shallow compare karta hai. Custom comparator — false = re-render, true = skip. useCallback + React.memo together zaroori. Simple components memoize mat karo — overhead > benefit. Profiler se actual slow components dhundo, then memo add karo.',
          }}
          realWorldScenario="Dashboard mein Sidebar, Header, Chart, DataTable. State changes frequently (live data). Sidebar aur Header — no data dep — memo karo. Chart — data dep — memo with custom compare (deep data check). DataTable rows — memo karo individual rows."
          commonMistakes={[
            {
              mistake: 'React.memo bina useCallback ke function props ke saath',
              why: 'Function prop new reference every render → memo ki shallow comparison false → re-render anyway — memo useless.',
              fix: 'useCallback + React.memo duo. Dono ek saath warna koi benefit nahi.',
            },
            {
              mistake: 'Custom comparator mein side effects',
              why: 'Comparator pure honi chahiye — side effects unexpected behavior cause karte hain.',
              fix: 'Comparator only comparison kare — props read karo, true/false return karo. No setState, no logging.',
            },
          ]}
          proTip="React DevTools Profiler tab → Record interaction → Flame graph. Gray components — re-rendered but fast. Orange/red — slow. Click component — props diff dekho what changed. 'Why did this render' option enable karo. Actual data se optimize karo — guessing mat karo."
        />
      </div>

      <div id="performance-antipatterns">
        <ConceptCard
          title="Performance Anti-Patterns — Kya Avoid Karo"
          emoji="⚠️"
          difficulty="intermediate"
          whatIsIt="Common React performance mistakes: inline object creation (new reference every render), anonymous functions in render (memo defeats), state updates in render loop, missing keys, over-memoization, premature optimization. Profiler se measure karo — phir specific fix apply karo."
          whenToUse={[
            'Code review mein — in patterns dhundo',
            'Performance complaint aane pe — profile first, then fix',
            'Large lists mein — keys aur memo check karo',
            'Context overuse — unnecessary re-renders',
          ]}
          whyUseIt="Anti-patterns dhundna aur fix karna performance dramatically improve kar sakta hai. Inline objects har render pe new reference — memo useless. Missing keys — unnecessary DOM operations. Over-rendering — unnecessary computation. Profile-first approach ensures sahi jagah fix."
          howToUse={{
            filename: 'AntiPatterns.tsx',
            language: 'tsx',
            code: `import { useState, useMemo, useCallback, memo } from 'react'

// ── ANTI-PATTERN 1: Inline objects ────────────────────────────────
// ❌ New object every render — memo useless
function BadParent() {
  return (
    <MemoChild
      style={{ color: 'red', fontSize: 16 }}  // New object!
      data={{ name: 'test' }}                  // New object!
    />
  )
}

// ✅ Stable references
const STYLE = { color: 'red', fontSize: 16 }  // Outside component — stable

function GoodParent() {
  const data = useMemo(() => ({ name: 'test' }), [])
  return <MemoChild style={STYLE} data={data} />
}

// ── ANTI-PATTERN 2: Anonymous functions in render ─────────────────
// ❌ New function every render for memo child
function BadList({ items }: { items: string[] }) {
  return (
    <MemoList
      onItemClick={(item) => console.log(item)}  // New fn!
    />
  )
}

// ✅ useCallback
function GoodList({ items }: { items: string[] }) {
  const handleClick = useCallback((item: string) => {
    console.log(item)
  }, [])
  return <MemoList onItemClick={handleClick} />
}

// ── ANTI-PATTERN 3: State updates in render ────────────────────────
// ❌ State update in render — infinite loop!
function BadComponent({ data }: { data: string[] }) {
  const [count, setCount] = useState(0)
  setCount(data.length)  // Called on every render — loop!
  return <div>{count}</div>
}

// ✅ Derive directly or use useEffect
function GoodComponent({ data }: { data: string[] }) {
  const count = data.length  // Direct derivation
  return <div>{count}</div>
}

// ── ANTI-PATTERN 4: Context causing unnecessary re-renders ─────────
// ❌ Object in context — every consumer re-renders on ANY change
function BadContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('dark')

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  )
}

// ✅ Split contexts — consumers only re-render for their slice
function GoodContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('dark')

  const userValue = useMemo(() => ({ user, setUser }), [user])
  const themeValue = useMemo(() => ({ theme, setTheme }), [theme])

  return (
    <UserContext.Provider value={userValue}>
      <ThemeContext.Provider value={themeValue}>
        {children}
      </ThemeContext.Provider>
    </UserContext.Provider>
  )
}

// ── PROFILER-FIRST APPROACH ───────────────────────────────────────
// 1. React DevTools → Profiler → Record
// 2. Interact with slow UI
// 3. Stop → See flame graph
// 4. Identify slow/unnecessary renders
// 5. Apply targeted fix (memo, useCallback, useMemo)
// 6. Record again — verify improvement`,
            explanation: 'Anti-patterns: inline objects (new ref), anonymous fns (new ref), state in render (loop), context without split (all consumers re-render). Fix: constants, useMemo, useCallback, split contexts. Profile first — do not guess which is slow.',
          }}
          realWorldScenario="Form mein 20 fields — har keystroke pe sab re-render. Profiler: SubmitButton, PreviewPanel har change pe re-render. Fix: memo them, useCallback handler. After: sirf changed field re-render. Typing instant — no jank."
          commonMistakes={[
            {
              mistake: 'Optimization se pehle profile nahi karna',
              why: 'Wrong component optimize karo — no improvement. Wasted effort.',
              fix: 'Profile first — React DevTools Profiler. Actual slow renders identify karo. Phir target karo.',
            },
            {
              mistake: 'Sab kuch memo wrap karna',
              why: 'Over-memoization — memory overhead, comparison cost, code complexity. Net slower sometimes.',
              fix: 'Memo sirf jab actual performance problem identified ho. Profile, identify, fix specific components.',
            },
          ]}
          proTip="why-did-you-render library install karo development mein — automatic detection karti hai unnecessary re-renders. Console mein detailed logs — 'ParentComponent re-rendered MemoChild with same props — check useCallback!'. Production se remove karo. Essential debugging tool."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 8 Quiz — useRef, useMemo, useCallback
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — React performance master karo!
          </p>
        </div>
        <QuizSection questions={memoQuiz} chapterSlug="useref-usememo" />
      </div>
    </div>
  )
}
