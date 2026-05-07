'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const perfQuiz: QuizQuestion[] = [
  {
    question: 'Debounce aur Throttle mein kya fark hai?',
    options: [
      { text: 'Dono same hain', correct: false, explanation: 'Different use cases ke liye hain.' },
      { text: 'Debounce: last event ke baad delay wait karta hai; Throttle: fixed interval mein ek baar fire karta hai', correct: true, explanation: 'Sahi! Search input ke liye debounce (typing ruke tab search), scroll ke liye throttle (har 100ms mein position check).' },
      { text: 'Throttle events cancel karta hai; Debounce delay karta hai', correct: false, explanation: 'Throttle rate limit karta hai — cancel nahi. Debounce last event ke baad wait karta hai.' },
      { text: 'Sirf React mein kaam karte hain', correct: false, explanation: 'Debounce aur throttle vanilla JavaScript patterns hain.' },
    ],
  },
  {
    question: 'V8 mein monomorphic code kyun fast hota hai?',
    options: [
      { text: 'Kyunki zyada memory use karta hai', correct: false, explanation: 'Memory use se speed ka direct relation nahi.' },
      { text: 'V8 ek type ke liye optimize karta hai — hidden class stable rehti hai', correct: true, explanation: 'Bilkul! Same "shape" ke objects ek hidden class share karte hain — V8 optimized machine code generate karta hai.' },
      { text: 'Kyunki type checking skip hoti hai', correct: false, explanation: 'JavaScript runtime pe type checking hoti nahi — interpretation ka speed concern hai.' },
      { text: 'Async code hamesha faster hai', correct: false, explanation: 'Async speed se related nahi — concurrency se related hai.' },
    ],
  },
  {
    question: 'Memory leak kab hota hai JavaScript mein?',
    options: [
      { text: 'Jab bahut zyada variables declare karo', correct: false, explanation: 'Variables garbage collected hote hain jab scope close ho.' },
      { text: 'Jab objects ke references exist karte hain jo kabhi release nahi hote', correct: true, explanation: 'Sahi! Event listeners, closures, global variables — ye references GC ko objects collect karne se rokti hain.' },
      { text: 'Jab async functions use karo', correct: false, explanation: 'Async functions automatically memory leak nahi karte.' },
      { text: 'Jab large arrays use karo', correct: false, explanation: 'Large arrays garbage collected hote hain jab referenced nahi.' },
    ],
  },
  {
    question: 'Web Workers kab use karte hain?',
    options: [
      { text: 'Har kaam ke liye — always faster', correct: false, explanation: 'Worker overhead hai — message passing, serialization. Simple kaam ke liye overkill.' },
      { text: 'CPU-intensive tasks jo main thread block karte hain — image processing, heavy computation', correct: true, explanation: 'Bilkul! Workers main thread ko free rakhte hain — UI responsive rehti hai heavy computation ke dauran.' },
      { text: 'Sirf API calls ke liye', correct: false, explanation: 'API calls async hain — main thread block nahi karte. Workers ke liye nahi.' },
      { text: 'DOM manipulation ke liye', correct: false, explanation: 'Workers DOM access nahi kar sakte — sirf JavaScript computation.' },
    ],
  },
  {
    question: 'Performance API se kya measure karte hain?',
    options: [
      { text: 'CPU usage', correct: false, explanation: 'CPU usage OS-level metric hai — Performance API se nahi.' },
      { text: 'High-resolution timing — code execution time, resource loading, user interactions', correct: true, explanation: 'Sahi! performance.now() microsecond accuracy deta hai. performance.mark() aur measure() custom timing. PerformanceObserver resource loading monitor karta hai.' },
      { text: 'Memory leaks detect karna', correct: false, explanation: 'Memory leaks ke liye Chrome DevTools Memory tab ya heapSnapshot use karo.' },
      { text: 'Network requests block karna', correct: false, explanation: 'Performance API measurement ke liye hai, blocking ke liye nahi.' },
    ],
  },
]

export default function JSChapter17Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(124,58,237,0.06)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          JavaScript Performance — Speed Ka Science
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          V8 engine ka JIT compiler bahut smart hai — lekin tum usse bhi bewakoof bana sakte ho! Kaise? Ek object banao — x:1, y:2. Doosra banao — y:2, x:1. Properties ka order alag! V8 ek nayi hidden class banata hai — aur optimization window miss ho jaati hai! Yahi aaj seekhenge.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ab sawaal ye aata hai — "Bhai ye sab jaanna zarooori hai kya normal developer ke liye?" Zaroor hai! Ye directly user experience affect karta hai. Amazon ne research kiya — 100ms delay = 1% revenue loss. 100 milliseconds! Ek slow function loop mein call karo — wahi 100ms ban jaata hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum JavaScript performance ke real tools aur techniques cover karenge — measurement se lekar optimization tak. Golden rule yaad rakho: "Pehle measure karo, phir optimize karo!" Guess mat karo.
        </p>
      </div>

      <div id="v8-optimization">
        <ConceptCard
          title="V8 Optimization — Engine Kaise Sochta Hai"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="V8 ke andar kya hota hai — jaante ho? Jab tum object banate ho, V8 ek 'hidden class' (shape) banata hai. Sab objects jo same properties same order mein hain — ek hi hidden class share karte hain. Ab V8 unke liye optimized machine code generate karta hai. Ye monomorphic code hai — fastest! Lekin agar ek object mein x pehle, doosre mein y pehle — alag hidden classes — polymorphic. V8 optimize nahi kar sakta. JIT compiler hot code ko native machine code mein compile karta hai — isliye JavaScript itna fast hai!"
          whenToUse={[
            'Hot paths optimize karne ke liye — frequently called functions',
            'Object creation patterns — consistent shapes maintain karo',
            'Array optimizations — typed arrays CPU-intensive code mein',
            'Performance bottleneck identify karte waqt',
          ]}
          whyUseIt="V8 optimizations samajhne se accidentally de-optimize nahi karte. Monomorphic functions V8 ke liye best case hain — benchmark karo: same shape objects ke liye code 3x-10x faster ho sakta hai polymorphic se. delete operator — ye ek cheez hai jo V8 ko bahut paresaan karta hai! Property delete karo toh hidden class change hoti hai — optimization throw away hoti hai. Isliye delete ki jagah null ya undefined assign karo."
          howToUse={{
            filename: 'v8-optimization.js',
            language: 'javascript',
            code: `// ── HIDDEN CLASSES — Consistent Object Shapes ───────────────────

// ❌ Polymorphic — different shapes, V8 optimize nahi kar sakta
function createPoint(x, y, hasZ) {
  const point = { x, y }
  if (hasZ) point.z = 0  // Different shape! De-optimization
  return point
}

// ✅ Monomorphic — same shape hamesha
function createPoint(x, y, z = undefined) {
  return { x, y, z }  // Always same shape — V8 optimize karta hai
}

// ❌ Property order change — new hidden class
const obj1 = { x: 1, y: 2 }  // Shape: x, y
const obj2 = { y: 2, x: 1 }  // Different shape: y, x — polymorphic!

// ❌ delete operator — class changes, de-optimizes
delete obj1.x  // Hidden class changes!

// ── INLINE CACHING ────────────────────────────────────────────────
class Shape {
  getArea() { return 0 }  // Override in subclass
}
class Circle extends Shape {
  getArea() { return Math.PI * this.r * this.r }
}
class Square extends Shape {
  getArea() { return this.side * this.side }
}

// ❌ Megamorphic — many types, V8 gives up
function totalArea(shapes) {
  return shapes.reduce((sum, s) => sum + s.getArea(), 0)
}
// If shapes has Circle, Square, Triangle, Pentagon, Hexagon... too polymorphic

// ✅ Process same types together
const circles = shapes.filter(s => s instanceof Circle)
const squares = shapes.filter(s => s instanceof Square)
const circleArea = circles.reduce((sum, c) => sum + c.getArea(), 0)  // Monomorphic!

// ── TYPED ARRAYS — For CPU-Intensive Work ────────────────────────
// Regular array
const regular = new Array(1000000).fill(1)

// Typed array — direct memory, no boxing
const typed = new Float64Array(1000000).fill(1)

// Heavy computation
function sum(arr) {
  let total = 0
  for (let i = 0; i < arr.length; i++) total += arr[i]
  return total
}

// TypedArray is ~3-5x faster for numerical operations!

// ── V8 FLAGS FOR DEBUGGING ────────────────────────────────────────
// node --trace-deopt app.js  — deoptimizations dekhne ke liye
// node --trace-opt app.js    — optimizations dekhne ke liye
// node --allow-natives-syntax app.js + %OptimizeFunctionOnNextCall(fn)`,
            explanation: 'Step by step trace karo: createPoint(1, 2) call hota hai — object { x: 1, y: 2, z: undefined } banta hai. Hamesha same shape! V8 ek hidden class banata hai aur optimize karta hai. Agar conditional property add karo — different shapes, V8 de-optimize karta hai. TypedArrays ke andar kya hota hai: regular array mein har element ek JavaScript object hai (boxing). Float64Array mein directly 64-bit floats — no boxing, no GC pressure, CPU-friendly memory layout.',
          }}
          realWorldScenario="Game loop ya physics simulation mein: particles ke positions store karo Float32Array mein — millions of particles bhi handle ho jaate hain smoothly. Node.js mein image processing: Buffer (TypedArray) use karo regular arrays ki jagah — directly memory mein kaam karo, boxing overhead nahi, 3-5x speed improvement real-world mein measurable hai."
          commonMistakes={[
            {
              mistake: 'Premature optimization — profile kiye bina optimize karna',
              why: 'Wrong place optimize karo — effort waste, aur kabhi kabhi code worse hota hai.',
              fix: 'Pehle measure karo — Chrome DevTools Profiler, Node.js --prof flag. Hot paths dhundo, phir optimize karo.',
            },
            {
              mistake: 'delete use karna objects ko "cleanup" karne ke liye',
              why: 'delete hidden class change karta hai — future accesses de-optimize ho jaate hain.',
              fix: 'delete ki jagah property ko undefined ya null set karo: obj.prop = undefined. Ya new object banao without that property.',
            },
          ]}
          proTip="Kabhi bhi guess mat karo — measure karo pehle! node --inspect app.js run karo, Chrome DevTools se connect karo (chrome://inspect) — full profiler, heap snapshots, real-time performance graph. 0x library se flamegraphs generate karo — visual bottleneck identification. Flamegraph mein wide bars = slow functions = optimize karo!"
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)' }}
      >
        <p className="text-sm text-[#FCD34D] font-medium">
          💡 Akshay ka insight: Memory leaks ka ek surprising fact — JavaScript mein garbage collection automatic hai, phir bhi leaks hote hain! Kyun? Kyunki GC sirf wahi objects collect karta hai jinke koi references nahi hain. Agar tum accidentally reference hold kar rahe ho — GC nahi kar sakta!
        </p>
      </div>

      <div id="memory-management">
        <ConceptCard
          title="Memory Management — Leaks Dhundo"
          emoji="🧠"
          difficulty="advanced"
          whatIsIt="Ek real scenario: Node.js server deploy kiya. Pehle din — 200MB memory. Ek hafta baad — 800MB. Ek mahina baad — OOM crash, server down! Ye hai memory leak. JavaScript automatic garbage collection karta hai — V8 unreachable objects memory se hatata hai. Lekin unreachable tab hota hai jab koi reference nahi hota. Memory leaks tab hoti hain jab objects reference mein hain lekin actual use nahi hota — event listeners, closures, global variables, detached DOM nodes. Heap mein objects live karte hain, stack mein local variables."
          whenToUse={[
            'Application memory slowly grow ho — suspected leak',
            'Long-running Node.js servers — eventual OOM avoid karna',
            'Browsers mein SPA — user navigate kare aur memory kam na ho',
            'Large data processing — memory efficient hona zaroori',
          ]}
          whyUseIt="Memory leaks gradually performance degrade karte hain aur eventually crash karte hain — silently! Server pe memory leak — process restart required (but temporarily fix, leak fir hoga). Browser mein SPA — user navigate kare pages pe, memory grow karti jaati hai. WeakMap/WeakRef se cache bina leak ke — GC objects collect kar sakta hai. Cleanup functions — event listeners, timers, subscriptions — essential. React mein useEffect cleanup — yahi kaam karta hai!"
          howToUse={{
            filename: 'memory.js',
            language: 'javascript',
            code: `// ── COMMON MEMORY LEAKS ──────────────────────────────────────────

// 1. Event listeners without cleanup
function initComponent() {
  const handler = (e) => processEvent(e)
  document.addEventListener('click', handler)  // Added!

  // ❌ Forget to remove — memory leak
  // ✅ Return cleanup:
  return () => document.removeEventListener('click', handler)
}

// 2. Closures holding large data
function processLargeData() {
  const bigArray = new Array(1000000).fill('data')

  // ❌ Inner function holds reference to bigArray
  return {
    summary: () => \`Count: \${bigArray.length}\`,
    // bigArray never GC'd as long as this object exists
  }
}

// ✅ Release reference when done
function processLargeData() {
  let bigArray = new Array(1000000).fill('data')
  const count = bigArray.length
  bigArray = null  // Release!

  return { summary: () => \`Count: \${count}\` }
}

// 3. Growing arrays / sets without cleanup
const events = []  // Grows forever if never cleared!
function trackEvent(event) {
  events.push(event)  // Leak if events.length is unbounded
}

// ✅ Bounded collection
const MAX_EVENTS = 1000
function trackEvent(event) {
  events.push(event)
  if (events.length > MAX_EVENTS) events.shift()  // Keep only last 1000
}

// ── WEAKMAP / WEAKREF — Cache without leak ────────────────────────
// WeakMap — keys are weakly held (GC can collect them)
const cache = new WeakMap()

function processUser(userObj) {
  if (cache.has(userObj)) return cache.get(userObj)
  const result = expensiveCompute(userObj)
  cache.set(userObj, result)  // When userObj GC'd, entry removed!
  return result
}

// WeakRef — weak reference to object
const weakRef = new WeakRef(largeObject)
// Later:
const obj = weakRef.deref()
if (obj) {
  processObject(obj)
} else {
  // Object was garbage collected — reload if needed
}

// FinalizationRegistry — cleanup when GC'd
const registry = new FinalizationRegistry((heldValue) => {
  console.log(\`Object cleaned up: \${heldValue}\`)
  // Cleanup associated resources
})
registry.register(someObject, 'cleanup-token')

// ── MEASURING MEMORY ─────────────────────────────────────────────
// Browser
const memory = performance.memory
console.log(\`Heap used: \${memory.usedJSHeapSize / 1024 / 1024} MB\`)
console.log(\`Heap total: \${memory.totalJSHeapSize / 1024 / 1024} MB\`)

// Node.js
const { heapUsed, heapTotal, rss } = process.memoryUsage()
console.log(\`Heap used: \${heapUsed / 1024 / 1024} MB\`)
console.log(\`RSS: \${rss / 1024 / 1024} MB\`)`,
            explanation: 'Under the hood trace karo: document.addEventListener("click", handler) — DOM ek internal list mein handler reference store karta hai. Component unmount ho — DOM reference hata do, nahi toh handler living raha, closure ke through saara component data memory mein hold hota raha. WeakMap ka secret: keys weakly held hain — agar key object GC ho jaaye toh entry automatically hatati hai! Regular Map mein key hold karta hai reference — GC nahi hota. WeakRef similarly — object GC ho sakta hai, deref() se check karo exist karta hai kya.',
          }}
          realWorldScenario="React SPA mein: useEffect cleanup function event listeners remove karta hai. Bina cleanup ke navigate karo 100 pages — 100 listeners DOM par accumulate! Har listener closure ke through apna component data hold karta hai. Memory continuously grow karti jaati hai. Pro tip: setTimeout aur setInterval bhi clear karo cleanup mein — ye bhi leak karte hain!"
          commonMistakes={[
            {
              mistake: 'setInterval clear karna bhoolna',
              why: 'Interval forever runs — callback function reference aur closure data GC nahi ho sakta.',
              fix: 'const id = setInterval(...); clearInterval(id) cleanup mein. React: useEffect(() => { const id = setInterval(...); return () => clearInterval(id); }, []);',
            },
            {
              mistake: 'Global variable mein accumulated data',
              why: 'Global variables GC nahi hoti — agar continuously add karo toh memory grow karti jaati hai.',
              fix: 'Local variables scope mein use karo. Global cache ke liye bounded size (LRU cache) ya WeakMap use karo.',
            },
          ]}
          proTip="Chrome DevTools memory leak dhundne ka step-by-step: Memory tab → Take Heap Snapshot. Suspected action karo. Dusra snapshot lo. Comparison mode mein dekho — kaunse objects badhenge jo nahi badhne chahiye. '#Detached' elements dhundo — DOM se hataye gaye lekin reference hold hain. Allocation instrumentation on timeline — leaking allocations real-time dekho!"
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}
      >
        <p className="text-sm text-[#6EE7B7] font-medium">
          💡 Akshay ka insight: Ek surprising number — scroll event ek second mein 100+ baar fire ho sakta hai! Agar har event pe API call ya DOM update karo — page freeze. Debounce aur Throttle — ye do patterns ye problem solve karte hain.
        </p>
      </div>

      <div id="debounce-throttle">
        <ConceptCard
          title="Debounce & Throttle — Rate Limiting"
          emoji="⏱️"
          difficulty="advanced"
          whatIsIt="Pehle dono ki definition sticky way mein yaad karo: Debounce = 'last call ke baad X time tak ruko, phir execute karo.' Throttle = 'X time mein maximum ek baar execute karo.' User 'react hooks' type kare — r-e-a-c-t (5 keystrokes) — Debounce ke saath sirf ek API call ('react hooks' pe). Bina debounce: 5 API calls. Scroll event pe Throttle — har 100ms mein ek baar position check, chahe 50 scroll events fire hoon."
          whenToUse={[
            'Search input — debounce: har keystroke pe API call nahi',
            'Window resize — debounce: resize complete hone pe',
            'Scroll events — throttle: har 100-200ms mein position check',
            'Button click — debounce: accidental double-click prevent',
          ]}
          whyUseIt="Real numbers dekhte hain: scroll event 100 times/second. Throttle 10 times/second tak limit karo — 90% calls save! Search input: user 'javascript tutorial' type kare — 20 keystrokes — 20 API calls bina debounce. Debounce se: 1 API call. Backend pe 95% load kam. Network requests, DOM updates, heavy computations sab protect karo. Ye simple patterns bahut bada impact dete hain."
          howToUse={{
            filename: 'debounce-throttle.js',
            language: 'javascript',
            code: `// ── DEBOUNCE Implementation ──────────────────────────────────────
function debounce(fn, delay) {
  let timeoutId = null

  return function(...args) {
    // Previous timer cancel karo
    clearTimeout(timeoutId)

    // Naya timer set karo
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
      timeoutId = null
    }, delay)
  }
}

// Usage:
const searchInput = document.querySelector('#search')
const debouncedSearch = debounce(async (query) => {
  const results = await searchApi(query)
  renderResults(results)
}, 300)  // 300ms pause ke baad

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value)
})

// ── DEBOUNCE with immediate option ────────────────────────────────
function debounceAdvanced(fn, delay, immediate = false) {
  let timeoutId = null

  return function(...args) {
    const shouldCallNow = immediate && !timeoutId

    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      timeoutId = null
      if (!immediate) fn.apply(this, args)
    }, delay)

    if (shouldCallNow) fn.apply(this, args)
  }
}

// ── THROTTLE Implementation ────────────────────────────────────────
function throttle(fn, interval) {
  let lastCallTime = 0
  let timeoutId = null

  return function(...args) {
    const now = Date.now()
    const remaining = interval - (now - lastCallTime)

    if (remaining <= 0) {
      // Enough time passed — call immediately
      clearTimeout(timeoutId)
      lastCallTime = now
      fn.apply(this, args)
    } else {
      // Wait for remaining time
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now()
        fn.apply(this, args)
      }, remaining)
    }
  }
}

// Usage:
const throttledScroll = throttle(() => {
  const scrollY = window.scrollY
  updateNavbar(scrollY)
  updateProgressBar(scrollY)
}, 100)  // Max 10 times per second

window.addEventListener('scroll', throttledScroll)

// ── REACT HOOKS ───────────────────────────────────────────────────
import { useState, useCallback, useRef } from 'react'

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Usage in component:
const [search, setSearch] = useState('')
const debouncedSearch = useDebounce(search, 300)
// useEffect([debouncedSearch]) — API call when typing stops`,
            explanation: 'Debounce ke andar kya hota hai trace karo: pehli call — clearTimeout (kuch nahi), naya timer set. Doosri call 100ms baad — clearTimeout (pehla cancel!), naya timer set. Teesri call 200ms baad — clearTimeout (doosra cancel!), naya timer set. 300ms koi call nahi — timer fires! Sirf teesri call execute hui. Throttle mein: pehli call immediately execute. Doosri call 50ms baad — remaining = 100-50 = 50ms. setTimeout 50ms ke liye. Koi aur calls? Cancel-replace. 100ms total pe fire.',
          }}
          realWorldScenario="Autocomplete search bar: debounce(300ms). User 'react' type kare — r, re, rea, reac, react — sirf last 'react' pe API call. Bina debounce: 5 API calls, server pe 5x load, pehle wale results outdated. Debounce ke saath: 1 API call, sahi result! Ye production mein bahut noticeable difference hai!"
          commonMistakes={[
            {
              mistake: 'React mein debounce function inline create karna',
              why: 'Har render pe nayi function — debounce timer reset hoti rehti hai — never fires!',
              fix: 'useCallback ke andar debounce wrap karo, ya useRef mein store karo, ya useMemo use karo.',
            },
            {
              mistake: 'Event listeners cleanup mein throttled/debounced function remove nahi karna',
              why: 'Original function reference aur debounced reference alag hain — removeEventListener fail.',
              fix: 'Debounced function ko variable mein store karo: const throttledFn = throttle(fn, 100). Same reference use karo add aur remove mein.',
            },
          ]}
          proTip="React mein common gotcha — debounce function component ke andar mat banao! Har render pe nayi function — timer reset, kabhi fire nahi! useCallback ya useRef mein wrap karo. lodash.debounce production-ready hai — leading/trailing options, cancel, flush — sab handle karta hai. React Query mein built-in staleTime bhi ek tarah ka debouncing hai!"
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)' }}
      >
        <p className="text-sm text-[#93C5FD] font-medium">
          💡 Akshay ka insight: JavaScript single-threaded hai — ye suna hai. Lekin iska matlab ye nahi ki heavy computation nahi kar sakte! Web Workers alag thread mein kaam karte hain — UI thread free rehta hai. Browser freeze ka daur khatam!
        </p>
      </div>

      <div id="web-workers">
        <ConceptCard
          title="Web Workers — CPU Work Offload Karo"
          emoji="👷"
          difficulty="advanced"
          whatIsIt="Ek experiment karo: 1 billion tak loop chalao main thread pe — browser tab freeze ho jaayega, scroll nahi hoga, buttons click nahi hote! Ye hai main thread blocking. Web Workers background threads hain — JavaScript main thread se bilkul alag. CPU-intensive tasks (image processing, data parsing, ML inference, encryption) workers mein run karo — UI smooth rehti hai. Workers DOM access nahi kar sakte — message passing se communicate karte hain, data structured clone se transfer hota hai. Node.js mein worker_threads module same concept."
          whenToUse={[
            'Heavy computation — image processing, video encoding',
            'Large data parsing — CSV, JSON, XML processing',
            'Real-time data processing — streaming analytics',
            'WebAssembly heavy operations alongside JS',
          ]}
          whyUseIt="Main thread blocking UI freeze karta hai — user frustration, bounce rate badh jaata hai. Workers parallel computation enable karte hain. Modern CPUs 8-16 cores hain — sirf ek core use karna waste! Workers se multi-core effectively use hoti hain. Node.js mein CPU-intensive operations (image resize, PDF generate, ML inference) sirf ek request pe server ko slow kar dete hain — workers mein isolate karo."
          howToUse={{
            filename: 'worker-main.js',
            language: 'javascript',
            code: `// ── BROWSER WEB WORKER ───────────────────────────────────────────

// worker.js — separate file
self.addEventListener('message', (event) => {
  const { data, type } = event.data

  if (type === 'PROCESS') {
    // Heavy CPU work — main thread block nahi karega
    const result = heavyComputation(data)
    self.postMessage({ type: 'RESULT', result })
  }
})

function heavyComputation(data) {
  // Imagine: image processing, ML inference, data transformation
  return data.map(x => x * x).reduce((a, b) => a + b, 0)
}

// main.js — main thread
const worker = new Worker('./worker.js')  // or 'type: module' for ESM

// Worker ko kaam do
worker.postMessage({ type: 'PROCESS', data: largeArray })

// Result receive karo
worker.addEventListener('message', (event) => {
  if (event.data.type === 'RESULT') {
    console.log('Computation done:', event.data.result)
  }
})

// Cleanup
function destroyWorker() {
  worker.terminate()
}

// ── INLINE WORKER (no separate file) ─────────────────────────────
function createInlineWorker(fn) {
  const code = \`self.onmessage = function(e) { self.postMessage((\${fn.toString()})(e.data)) }\`
  const blob = new Blob([code], { type: 'application/javascript' })
  return new Worker(URL.createObjectURL(blob))
}

const squareWorker = createInlineWorker((data) => data.map(x => x * x))
squareWorker.onmessage = (e) => console.log('Result:', e.data)
squareWorker.postMessage([1, 2, 3, 4, 5])

// ── NODE.JS WORKER THREADS ────────────────────────────────────────
// worker-thread.js
import { workerData, parentPort } from 'worker_threads'
const result = processHeavyTask(workerData)
parentPort.postMessage(result)

// main.js (Node.js)
import { Worker } from 'worker_threads'

function runInWorker(workerFile, data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerFile, { workerData: data })
    worker.on('message', resolve)
    worker.on('error', reject)
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(\`Worker exited with code \${code}\`))
    })
  })
}

// Usage
const result = await runInWorker('./worker-thread.js', { items: largeDataset })`,
            explanation: 'Communication flow trace karo: main.js → worker.postMessage(data) → serialization (structured clone) → Worker thread receives event.data → heavy computation → self.postMessage(result) → serialization → main thread receives event.data.result. Data ko serialize-deserialize karna hota hai — isliye very large objects ke liye slow ho sakta hai. Solution: Transferable objects (ArrayBuffer) — zero-copy transfer, ownership main thread se worker ko transfer hota hai.',
          }}
          realWorldScenario="Image editing app mein: user filter apply karta hai (blur, sharpen) — CPU-intensive operation. Worker mein ImageData process karo — main thread UI events (buttons, cancel button, sliders) handle karta hai. Bina worker: progress bar freeze, cancel button nahi kaam karta — user tab close karta hai! Worker ke saath: smooth UI, background processing, cancel bhi possible."
          commonMistakes={[
            {
              mistake: 'Har choti computation ke liye worker banana',
              why: 'Worker creation expensive hai — postMessage serialization overhead bhi. Small tasks ke liye net slower.',
              fix: 'Workers tab banao jab computation > few milliseconds. Ek worker reuse karo multiple tasks ke liye — worker pool pattern.',
            },
            {
              mistake: 'Large non-transferable objects postMessage se bhejna',
              why: 'Data serialize/deserialize hota hai — slow for very large objects.',
              fix: 'Transferable objects use karo (ArrayBuffer, MessagePort) — zero-copy transfer. transfer array mein pass karo: worker.postMessage(buffer, [buffer]).',
            },
          ]}
          proTip="Comlink library (by Google) workers ko regular async functions ki tarah feel deta hai — no manual postMessage/onmessage boilerplate. const worker = wrap(new Worker('./worker.js')); await worker.compute(data) — clean async API! Worker pool pattern reuse karo workers ko — ek worker create karo, multiple tasks queue karo, overhead minimize karo."
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
      >
        <p className="text-sm text-[#FCA5A5] font-medium">
          💡 Akshay ka insight: Ye chapter ka golden rule: "Measure first, optimize second." Bina measure kiye optimize karna — andhere mein taeer karna hai. Performance API aur DevTools — ye tumhara torch hai!
        </p>
      </div>

      <div id="performance-measurement">
        <ConceptCard
          title="Performance Measurement — Profile First"
          emoji="📊"
          difficulty="advanced"
          whatIsIt="Tumne kabhi console.time() use kiya hoga performance measure karne ke liye. Ye theek hai — lekin production mein real users ka data chahiye! Performance API browser aur Node.js mein high-resolution timing provide karta hai. performance.now() microsecond accuracy deta hai — Date.now() milliseconds mein hota hai, Performance API sub-millisecond precision. performance.mark() aur measure() custom timing ke liye. PerformanceObserver LCP, FID, CLS (Core Web Vitals) monitor karta hai — real user data!"
          whenToUse={[
            'Code path slow hai — exact timing measure karo',
            'Core Web Vitals optimize karne ko',
            'API response times monitor karne ko',
            'Regression detect karne ko — before/after benchmark',
          ]}
          whyUseIt="Measurement se pehle optimization guess work hai — 9 out of 10 baar wrong jagah optimize karte ho! Performance API production mein bhi use ho sakta hai — real user data collect karo. Chrome Profiler flamegraph se exactly kaunsa function kitna time le raha hai pata chalta hai — andazaa nahi, exact data. Lighthouse automated audit karta hai — score deta hai, specific improvements suggest karta hai."
          howToUse={{
            filename: 'performance-api.js',
            language: 'javascript',
            code: `// ── performance.now() — High-resolution timing ───────────────────
const start = performance.now()

// Expensive operation
const result = expensiveCalculation()

const end = performance.now()
console.log(\`Took: \${(end - start).toFixed(2)}ms\`)

// ── Marks & Measures — Named timing ──────────────────────────────
performance.mark('fetchStart')
const data = await fetch('/api/data')
performance.mark('fetchEnd')

performance.mark('processStart')
const processed = processData(data)
performance.mark('processEnd')

performance.measure('Total Fetch', 'fetchStart', 'fetchEnd')
performance.measure('Total Process', 'processStart', 'processEnd')

// Results
const measures = performance.getEntriesByType('measure')
measures.forEach(m => {
  console.log(\`\${m.name}: \${m.duration.toFixed(2)}ms\`)
})

// Cleanup
performance.clearMarks()
performance.clearMeasures()

// ── PerformanceObserver — Continuous monitoring ────────────────────
const observer = new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') {
      console.log('LCP:', entry.startTime)  // Target: < 2500ms
    }
    if (entry.entryType === 'first-input') {
      console.log('FID:', entry.processingStart - entry.startTime)  // Target: < 100ms
    }
  }
})

observer.observe({ type: 'largest-contentful-paint', buffered: true })
observer.observe({ type: 'first-input', buffered: true })

// ── Resource timing ───────────────────────────────────────────────
const resources = performance.getEntriesByType('resource')
const slowRequests = resources
  .filter(r => r.duration > 1000)
  .map(r => ({ name: r.name, duration: r.duration }))

console.log('Slow resources:', slowRequests)

// ── Node.js — perf_hooks ─────────────────────────────────────────
import { performance, PerformanceObserver } from 'perf_hooks'

const obs = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log(\`\${entry.name}: \${entry.duration.toFixed(2)}ms\`)
  })
})
obs.observe({ entryTypes: ['measure'] })

performance.mark('start')
await expensiveOperation()
performance.mark('end')
performance.measure('My Operation', 'start', 'end')`,
            explanation: 'performance.mark() aur measure() DevTools Performance tab mein bhi dikhte hain — visual timeline mein apni custom marks! LCP target: 2.5 seconds se kam — is se zyada toh Google ranking impact hoti hai. FID target: 100ms se kam — ye interaction responsiveness hai. PerformanceObserver ke saath buffered: true dena — page load ke pehle jo entries aayi hain unhe bhi milti hain. Node.js perf_hooks same API hai — server-side operations bhi measure karo.',
          }}
          realWorldScenario="Core Web Vitals production monitoring: PerformanceObserver se LCP, FID, CLS data collect karo aur analytics ko bhejo. Median user ka actual experience measure karo — synthetic tests se alag hota hai! Slow LCP? Server response time ya large images check karo. High FID? Heavy JS blocking main thread hai — split karo. Real data se real decisions!"
          commonMistakes={[
            {
              mistake: 'Date.now() se performance measure karna',
              why: 'Date.now() millisecond precision deta hai — modern CPUs nanosecond mein operations complete karte hain. Inaccurate measurements.',
              fix: 'performance.now() use karo — sub-millisecond precision. Agar consistently measure karna ho toh average multiple runs.',
            },
            {
              mistake: 'Development mein optimize karna, production measure nahi karna',
              why: 'Dev tools aur production bahut alag hote hain — network, CPU throttled users, different data sizes.',
              fix: 'Production monitoring setup karo — Real User Monitoring (RUM). Sentry, Datadog RUM, web-vitals library use karo.',
            },
          ]}
          proTip="web-vitals npm package (Google) — sirf 2 lines: import getLCP from 'web-vitals'; getLCP(metric =&gt; sendToAnalytics(metric)). Production mein har user ka LCP data collect karo — Plausible, Amplitude, ya custom endpoint. Lighthouse CI setup karo — PR merge karo toh automatically performance score check ho. Score girega toh build fail!"
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 17 Quiz — JavaScript Performance
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — fast code likhna seekho!
          </p>
        </div>
        <QuizSection questions={perfQuiz} chapterSlug="js-performance" />
      </div>
    </div>
  )
}
