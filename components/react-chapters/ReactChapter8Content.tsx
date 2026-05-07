'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Chapter Overview Diagram ───────────────────────────────────────────────────

function HooksComparisonDiagram() {
  const hooks = [
    {
      name: 'useRef',
      icon: '📌',
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.1)',
      border: 'rgba(6,182,212,0.3)',
      persists: true,
      rerender: false,
      desc: 'Mutable .current box — DOM refs, timer IDs, previous values',
      key: 'NO re-render on change',
    },
    {
      name: 'useMemo',
      icon: '🧮',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.1)',
      border: 'rgba(124,58,237,0.3)',
      persists: true,
      rerender: false,
      desc: 'Caches computed value — re-compute only when deps change',
      key: 'Stable VALUE reference',
    },
    {
      name: 'useCallback',
      icon: '🔒',
      color: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
      border: 'rgba(16,185,129,0.3)',
      persists: true,
      rerender: false,
      desc: 'Caches function — stable reference for memo children & effects',
      key: 'Stable FUNCTION reference',
    },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">React Performance Hooks — Key Differences</p>
      <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3">
        {hooks.map((hook) => (
          <div key={hook.name} className="rounded-xl p-4 flex flex-col gap-2" style={{ background: hook.bg, border: `1px solid ${hook.border}` }}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{hook.icon}</span>
              <p className="font-bold text-sm" style={{ color: hook.color }}>{hook.name}</p>
            </div>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">{hook.desc}</p>
            <div className="mt-auto rounded-lg px-2 py-1.5" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <p className="text-xs font-bold" style={{ color: hook.color }}>{hook.key}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-[#71717A] text-center mt-3">All three persist across renders — but only useState triggers re-render on change</p>
    </div>
  )
}

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
          useRef, useMemo, useCallback — React Ka Performance Toolkit
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ek second ruko. useRef ka naam sunta hai toh log kehte hain — "haan DOM reference ke liye hai." Galat! useRef ek mutable box hai — renders ke across value preserve karta hai bina re-render kiye. Ye React ka escape hatch hai DOM se bhi aur render cycle se bhi. Isko sirf input.focus() ke liye mat waste karo.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Aur useMemo? Log hamesha poochhte hain — "bhai sab kuch memoize kar doon?" Nahi! "Premature optimization is the root of all evil — but in React, no optimization is the root of slow apps." Balance dhundna padega.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum teeno hooks ko andar se samjhenge — kab use karo, kab bilkul mat karo, aur kya hota hai hood ke neeche jab React in hooks ko execute karta hai.
        </p>
      </div>

      <HooksComparisonDiagram />

      <div id="useref">
        <ConceptCard
          title="useRef — Mutable Values Without Re-render"
          emoji="📌"
          difficulty="intermediate"
          whatIsIt="Suno dhyan se — useRef ka naam 'reference' se hai, lekin ye sirf DOM reference ke liye nahi! Ye ek mutable box hai jisme .current property hoti hai. Ye box renders ke across apni value preserve karta hai — aur sabse important baat: is box ki value change karne se component RE-RENDER NAHI HOTA. Ye useState se iska fundamental fark hai. React Fiber ke andar, useRef ek plain JavaScript object hai jo fiber node se attached rehta hai. Har render pe same object reference milti hai — naya object nahi banta."
          whenToUse={[
            'DOM element directly access karna — focus, scroll, video.play(), canvas',
            'Previous state value store karna bina re-render kiye',
            'Timer/interval IDs store karna — cleanup ke liye',
            'Mutable values jo UI affect nahi karte — render count, flag variables',
          ]}
          whyUseIt="Sochte hain — bhai useState se hi ho jaata? Nahi! Agar timer ID useState mein rakhoge toh har timer update pe re-render hoga — poora component dobara chalega sirf ek timer ID ke liye. Ye waste hai. useRef se woh values store karo jo render cycle se bilkul independent hain. DOM access, timer cleanup, previous value tracking — sab useRef ka kaam hai."
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
            explanation: 'Step by step sochte hain — useRef ek box hai (plain object). React is box ko fiber tree mein store karta hai. Har render pe same box milta hai. .current change karo — React ko pata nahi chalta, re-render nahi hota. DOM ref ke liye React khud .current assign karta hai mount aur unmount pe. Timer IDs store karo — warna garbage collector utha le jaata hai reference ko.',
          }}
          realWorldScenario="Real duniya example — YouTube jaisi video player. videoRef.current?.play() — direct DOM API call. videoRef.current?.pause() — koi state update nahi, koi re-render nahi, bas DOM pe directly command. seekTo(time): videoRef.current!.currentTime = time — instant! Ye sab useState se impossible tha."
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
          proTip="Ek aur hidden gem — forwardRef! Parent component apna ref child ke DOM tak pohoncha sakta hai: const Input = forwardRef&lt;HTMLInputElement, Props&gt;((props, ref) =&gt; &lt;input ref={ref} {...props} /&gt;). Ab parent: const inputRef = useRef&lt;HTMLInputElement&gt;(null); phir &lt;Input ref={inputRef} /&gt; — parent seedha child ke input pe focus, blur, select kar sakta hai. Design system components mein ye pattern bahut use hota hai."
        />
      </div>

      <div id="usememo">
        <ConceptCard
          title="useMemo — Expensive Computation Cache"
          emoji="🧮"
          difficulty="intermediate"
          whatIsIt="Ab samjho useMemo ke andar kya hota hai. Jab component render hota hai, React dekhta hai — kya useMemo ki dependencies change hui? Nahi? Toh cached result return karo, computation mat chalao. Haan? Toh naya computation chalao, result cache karo. Simple! Lekin ye caching free nahi hai — React ko dependencies compare karni padti hain, result store karna padta hai. Isliye simple calculations ke liye useMemo overhead add karta hai, benefit nahi deta."
          whenToUse={[
            'Genuinely expensive computation — 10k+ items sort, complex filtering, heavy math',
            'Referential stability chahiye — jab useMemo result kisi useEffect ya memo child pe dep ho',
            'Derived state — multiple state values se complex object banana',
            'Sirf tab jab actual performance problem measure ho — guess mat karo!',
          ]}
          whyUseIt="Bhai, ek sawal — filter + sort 5000 items ka har render pe chale ya sirf jab products ya filters change hon? Obviously sirf jab zaroorat ho. useMemo ye guarantee deta hai. Plus referential equality — const config = { theme, lang } — ye naya object har render pe banta hai, child component React.memo se protect hai toh bhi re-render hoga! useMemo se same deps pe same reference milta hai."
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
            explanation: 'Step by step trace karo — useMemo pehli baar chalta hai, result cache hota hai. Parent re-render? React deps check karta hai — changed? No? Cached value return. Yes? Recompute. Expensive: 1000+ items sort/filter — useMemo se dramatic improvement. Cheap: items.length, string concat — useMemo se overhead. Rule: measure first, then decide.',
          }}
          realWorldScenario="Real scenario — aapka data table 5000 rows, multiple filters, sorting. Har parent re-render pe (tab switch, theme change, kuch bhi) 5000 items re-filter ho rahe the — visible lag! useMemo lagaya — sirf filter/sort deps change hone pe recompute. Theme change karo — no recompute, cached data. Ye fark user immediately feel karta hai."
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
          proTip="Ek important insight — useMemo aur React.memo ka deep connection hai. Akele useMemo kuch nahi karta agar child component memo nahi hai — woh re-render hoga anyway! Trio sochte hain: React.memo se component protect karo, useMemo se object props stable banao, useCallback se function props stable banao. Teeno ek saath — tab asli optimization milti hai. Lekin pehle profile karo — React DevTools Profiler kholo, record karo, actual slow components dhundo."
        />
      </div>

      <div id="usecallback">
        <ConceptCard
          title="useCallback — Function Reference Stability"
          emoji="🔒"
          difficulty="intermediate"
          whatIsIt="Seedha question — JavaScript mein () =&gt; {} === () =&gt; {} kya hoga? FALSE! Do alag function objects hain. Har render pe React naya function banata hai — naya reference. React.memo child ko bhejo — shallow compare karta hai — 'function changed!' — re-render. Infinite loop ka dar! useCallback ka kaam simple hai: 'bhai is function ko memoize karo — deps same hain toh same reference do.' Internally, useCallback(fn, deps) is useMemo(() =&gt; fn, deps) ke barabar hai. Yahi yaad rakho!"
          whenToUse={[
            'Memo wrapped child component ke liye function prop — stable reference zaroori',
            'useEffect dependency array mein function — warna infinite loop!',
            'Context value mein functions — consumers ko stable reference do',
            'Jab function reference change karna side effect cause kare',
          ]}
          whyUseIt="Practical samajhte hain — ParentBad mein handleDelete har render pe naya function banta hai. Typing karo search mein — parent re-render — naya handleDelete — ExpensiveList ka memo check karta hai — 'function changed!' — re-render. 1000 rows. Lag. useCallback se handleDelete stable rehta hai — typing karo — parent re-render — same handleDelete reference — memo check — 'same!' — skip. Zero lag."
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
            explanation: 'Step by step — React render hota hai, useCallback check karta hai: deps changed? No — same function reference return. Yes — new function create, cache update. Function prop memo child ko jaata hai — same reference hai — no re-render. useEffect mein function dep hai — stable reference hai — effect baar baar nahi chalta. Magic? Nahi — simple reference equality.',
          }}
          realWorldScenario="Production mein 1000-row data table. Row actions: edit, delete, view. Filter change karo — parent re-render. Bina useCallback: teeno handlers naye reference — teeno memo children re-render — 1000 rows re-render — 3 seconds lag. useCallback ke saath: handlers stable — memo check pass — sirf actual changed rows re-render — instant response. Ye real difference hai."
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
          proTip="Ek gem — React Compiler aa raha hai jo automatically memoize karega. Matlab future mein useCallback/useMemo manually likhna zaroorat nahi hogi! Lekin abhi 2025 mein manually likhna padta hai. Aur ek practical tip — functional updates se dep list chhoti rakho: setState(prev =&gt; prev + 1) mein setState dep nahi chahiye — ye always stable hoti hai. Clean deps = cleaner memoization."
        />
      </div>

      <div id="react-memo">
        <ConceptCard
          title="React.memo — Component Memoization"
          emoji="🛡️"
          difficulty="intermediate"
          whatIsIt="React.memo ko samjho ek bodyguard ki tarah — parent ke har re-render pe child ko rokta hai aur poochhta hai: 'props badli kya?' Shallow compare karta hai — strings, numbers primitive hai toh direct compare, objects/functions reference compare. Same? 'Andar mat jao, pehle wala output use karo.' Alag? 'Theek hai, render karo.' Custom comparator bhi de sakte ho — second argument mein function pass karo jo return kare true (skip) ya false (render). HOC hai internally — component ko wrap karta hai aur memoized version return karta hai."
          whenToUse={[
            'Expensive render wale child components — chart, complex UI, 100+ DOM nodes',
            'Parent frequently re-renders but child props rarely change',
            'Large lists ke items — rows, cards, table cells',
            'Sidebar, header — global state changes se protect karo',
          ]}
          whyUseIt="Default React behavior — parent re-render karo, sab children re-render. Chahe props change na hui ho. ProductCard 50 baar render hota hai sirf isliye ki parent ke search input mein user type kar raha hai. React.memo bodyguard lagao — sirf product ya onAddToCart change hone par render karo. Baaki sab renders? Ignore."
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
            explanation: 'React.memo ke andar kya hota hai: prevProps aur nextProps leke shallow compare. Primitives: === operator. Objects/Arrays: reference comparison — naya object = always different! Isliye useCallback aur useMemo partners hain. Custom comparator mein: return true matlab "same hai, skip render." return false matlab "different hai, render karo." Opposite of equality — confusing hai, dhyan rakho.',
          }}
          realWorldScenario="Live analytics dashboard — har 5 seconds mein data update hota hai. Sidebar, Header ko ye data chahiye nahi — memo lagao, unhe peace do. Chart — data update hone par re-render zaroori — memo with custom deep compare (sirf data values changed?). DataTable rows — individual row memo — sirf changed row re-render hogi. Clean architecture."
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
          proTip="Chrome React DevTools mein Profiler tab open karo — Record button dabao, interact karo app se, stop karo. Flame graph mein gray = fast re-render (okay hai), orange/red = slow (investigate karo). Kisi component pe click karo — 'Why did this render?' option hai — exact props/state jo change hui dikhaata hai. Ye goldmine hai optimization ke liye. Andaaze se nahi, data se optimize karo."
        />
      </div>

      <div id="performance-antipatterns">
        <ConceptCard
          title="Performance Anti-Patterns — Kya Avoid Karo"
          emoji="⚠️"
          difficulty="intermediate"
          whatIsIt="Ab seedha baat karte hain — kya kya galat karte hain log. Anti-pattern #1: JSX mein seedha object likho — &lt;Card style={{ color: 'red' }} /&gt; — ye naya object hai har render pe, memo ka koi fayda nahi. Anti-pattern #2: anonymous function memo child ko — &lt;MemoList onClick={(item) =&gt; ...} /&gt; — naya function, memo fail. Anti-pattern #3: render mein state update — infinite loop guaranteed. Anti-pattern #4: ek bada Context mein sab — har consumer har change pe re-render. Ye patterns code mein dhundna sikho."
          whenToUse={[
            'Code review mein — in patterns actively search karo',
            'Performance complaint aane pe — profile karo, pattern identify karo, fix karo',
            'Large lists mein — keys, memo, aur inline objects check karo',
            'Context overuse — split karo concerns',
          ]}
          whyUseIt="Anti-patterns dhundna aur fix karna kabhi kabhi dramatic improvement deta hai — bina extra library, bina architecture change. Inline object fix: constant bahar move karo — ek line change, 1000 re-renders gone. Ye cheezein profile se clearly dikhti hain — isliye profile-first approach essential hai."
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
            explanation: 'Ek ek step trace karo — BadParent render hota hai, style={{ color: "red" }} — naya object banta hai memory mein, naya reference. MemoChild ko milta hai naya prop — shallow compare: different! Re-render. Ek simple const STYLE = {} bahar move karo — problem solve! GoodParent render hota hai, STYLE same reference hai — memo check: same! Skip. Zero re-render.',
          }}
          realWorldScenario="20-field form — har keystroke pe SubmitButton, PreviewPanel, SummaryPanel — sab re-render ho rahe the. Profiler khola — inline objects everywhere, anonymous handlers. Three fixes: 1) handlers useCallback mein, 2) config objects useMemo mein, 3) memo lagaya critical components pe. Typing instant ho gaya — real user ne notice kiya."
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
          proTip="Ek secret weapon — why-did-you-render library. npm install karo dev dependency mein, Component.whyDidYouRender = true set karo — console mein seedha aayega: 'ParentComponent re-rendered MemoChild with same props! Check useCallback on handleDelete.' Ye library tumhara optimization coach hai. Profiler se slow component dhundo, why-did-you-render se exact cause samjho, phir fix karo. Ye trio unbeatable hai."
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
