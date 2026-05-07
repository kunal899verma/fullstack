'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function IteratorProtocolDiagram() {
  const steps = [
    { label: 'Iterable Object', sublabel: 'Has [Symbol.iterator]() method — arrays, strings, Maps, Sets', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', icon: '📦' },
    { label: 'Calls @@iterator', sublabel: 'for...of / spread / destructuring calls Symbol.iterator()', color: '#F97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.35)', icon: '🔑' },
    { label: 'Returns Iterator', sublabel: 'An object with a next() method', color: '#7C3AED', bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.35)', icon: '⚙️' },
    { label: 'iterator.next()', sublabel: 'Called each iteration — returns { value, done }', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', icon: '▶️' },
    { label: '{ value: x, done: false/true }', sublabel: 'done: true → for...of loop stops', color: '#F97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.35)', icon: '✅' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Iterator Protocol — How for...of Works</p>
      <div className="max-w-lg mx-auto space-y-2">
        {steps.map((item, i) => (
          <div key={i}>
            <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{item.sublabel}</p>
              </div>
            </div>
            {i < steps.length - 1 && <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓</span></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

const advancedQuiz: QuizQuestion[] = [
  {
    question: 'Symbol.iterator kya karta hai?',
    options: [
      { text: 'Object ko sort karta hai', correct: false, explanation: 'Symbol.iterator sorting se related nahi.' },
      { text: 'Object ko iterable banata hai — for...of aur spread ke saath use ho sakta hai', correct: true, explanation: 'Sahi! Custom iterable banana ho toh Symbol.iterator implement karo — next() method return karo.' },
      { text: 'Symbol create karta hai', correct: false, explanation: 'Symbol() symbol create karta hai — Symbol.iterator ek specific built-in symbol hai.' },
      { text: 'Array ke last element pe jaata hai', correct: false, explanation: 'Iterator protocol traversal ke baare mein hai — specific position nahi.' },
    ],
  },
  {
    question: 'Generator function kya unique karta hai?',
    options: [
      { text: 'Async hai hamesha', correct: false, explanation: 'Regular generators sync hain. Async generators bhi hote hain lekin mandatory nahi.' },
      { text: 'Pause aur resume ho sakti hai — yield se value produce karo, state preserve hoti hai', correct: true, explanation: 'Bilkul! function* aur yield se lazy, pauseable sequences banao — infinite bhi.' },
      { text: 'Faster hai regular function se', correct: false, explanation: 'Generators speed ke liye nahi — control flow ke liye hain.' },
      { text: 'Sirf numbers produce karo', correct: false, explanation: 'Generators koi bhi value yield kar sakte hain.' },
    ],
  },
  {
    question: 'Proxy object kya karta hai?',
    options: [
      { text: 'Object copy karta hai', correct: false, explanation: 'Proxy copy nahi karta — wrap karta hai.' },
      { text: 'Object operations intercept karta hai — get, set, delete, function calls', correct: true, explanation: 'Sahi! Proxy traps se property access, mutation, method calls sab intercept karo — validation, logging, reactivity.' },
      { text: 'Network requests proxy karta hai', correct: false, explanation: 'JavaScript Proxy network se related nahi — object meta-programming ke liye hai.' },
      { text: 'Sirf read operations intercept karta hai', correct: false, explanation: 'Proxy set, delete, apply, construct — sab intercept kar sakta hai.' },
    ],
  },
  {
    question: 'Tagged template literal kya enable karta hai?',
    options: [
      { text: 'Multi-line strings', correct: false, explanation: 'Multi-line regular template literals se possible hai.' },
      { text: 'Template literal ke strings aur values process karna — custom interpolation', correct: true, explanation: 'Bilkul! sql\`SELECT * FROM ${table}\` — SQL injection safe query building. styled-components isi se CSS-in-JS karta hai.' },
      { text: 'TypeScript types add karna strings mein', correct: false, explanation: 'TypeScript tags alag concept hai.' },
      { text: 'Sirf HTML strings ke liye', correct: false, explanation: 'Tagged templates kisi bhi use case ke liye — SQL, CSS, i18n, regex.' },
    ],
  },
  {
    question: 'Reflect API ka main use case kya hai?',
    options: [
      { text: 'Asynchronous code handle karna', correct: false, explanation: 'Reflect async se related nahi.' },
      { text: 'Object operations ko first-class functions ke roop mein use karna — meta-programming', correct: true, explanation: 'Sahi! Reflect.get, Reflect.set — ek-jaisi Proxy traps ke liye clean API. Object operations programmatically invoke karo.' },
      { text: 'CSS reflect property set karna', correct: false, explanation: 'JavaScript ka Reflect CSS se bilkul alag hai.' },
      { text: 'Types runtime pe check karna', correct: false, explanation: 'Runtime type checking alag concept hai.' },
    ],
  },
]

export default function JSChapter18Content() {
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
          Advanced JavaScript Patterns — Language Ka Deep End
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ek surprising baat: Vue 3 ki reactivity system — jab tum reactive state change karte ho aur component automatically re-render hota hai — andar Proxy use hota hai. styled-components CSS-in-JS — Tagged template literals use hota hai. for...of loop kaise work karta hai? Iterator protocol! Ye sab features daily use karte ho — bas under the hood nahi pata tha.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ab sawaal ye aata hai — "Kya mujhe ye features khud likhne ki zaroorat padegi?" Haan! Ek baar zaroor padegi. Custom data structure banao, paginated API lazily iterate karo, reactive system build karo — tabhi ye kaam aayenge. Aur jab inhe samjhoge toh dusre frameworks ka source code bhi padhna aayega.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum in advanced features ko practical examples ke saath cover karenge — theory nahi, real use cases. Senior developer territory mein aao!
        </p>
      </div>

      <IteratorProtocolDiagram />

      <div id="iterators">
        <ConceptCard
          title="Iterators & Iterables — Custom Traversal"
          emoji="🔁"
          difficulty="advanced"
          whatIsIt="Pehle ek experiment: for (const char of 'hello') — string pe for...of! Ye kaise kaam karta hai? String Symbol.iterator implement karti hai — under the hood! Iterator protocol: object jo next() method implement kare jo { value, done } return kare. Iterable protocol: object jo Symbol.iterator implement kare jo iterator return kare. Arrays, strings, Maps, Sets sab built-in iterables hain. Custom iterables banao — for...of, spread, destructuring sab automatically kaam karte hain!"
          whenToUse={[
            'Custom data structures — linked list, tree traversal',
            'Lazy sequences — on-demand values generate karna',
            'Infinite sequences — jab tak chahiye values',
            'API ke results paginate karna lazily',
          ]}
          whyUseIt="Custom iterables for...of, spread, Array.from() sab ke saath natively kaam karte hain — ek baar implement karo, sab jagah use karo. Lazy evaluation se memory efficient — poori sequence upfront generate nahi hoti, sirf jab maango tab generate karo. 1 million items ka array memory mein load karne ki zaroorat nahi — lazily iterate karo! Generators se iterables banane ka easy way milta hai. Node.js streams ka foundation yehi protocol hai."
          howToUse={{
            filename: 'iterators.js',
            language: 'javascript',
            code: `// ── ITERATOR PROTOCOL ────────────────────────────────────────────

// Manual iterator
function range(start, end, step = 1) {
  let current = start
  return {
    next() {
      if (current <= end) {
        const value = current
        current += step
        return { value, done: false }
      }
      return { value: undefined, done: true }
    }
  }
}

const it = range(1, 5)
it.next()  // { value: 1, done: false }
it.next()  // { value: 2, done: false }
it.next()  // { value: 3, done: false }

// ── ITERABLE PROTOCOL — Symbol.iterator ──────────────────────────

// Iterable object — for...of ke saath kaam karta hai
const rangeIterable = {
  [Symbol.iterator]() {
    let current = 1
    return {
      next() {
        return current <= 5
          ? { value: current++, done: false }
          : { value: undefined, done: true }
      }
    }
  }
}

for (const n of rangeIterable) {
  console.log(n)  // 1, 2, 3, 4, 5
}

const arr = [...rangeIterable]    // [1, 2, 3, 4, 5]
const [a, b, c] = rangeIterable  // Destructuring!

// ── CUSTOM LINKED LIST ────────────────────────────────────────────
class LinkedList {
  #head = null
  #size = 0

  push(value) {
    this.#head = { value, next: this.#head }
    this.#size++
    return this
  }

  [Symbol.iterator]() {
    let current = this.#head
    return {
      next() {
        if (current) {
          const value = current.value
          current = current.next
          return { value, done: false }
        }
        return { value: undefined, done: true }
      }
    }
  }

  get size() { return this.#size }
}

const list = new LinkedList()
list.push(1).push(2).push(3)

for (const item of list) console.log(item)  // 3, 2, 1
console.log([...list])  // [3, 2, 1]

// ── ASYNC ITERABLE — for await...of ──────────────────────────────
async function* asyncRange(start, end) {
  for (let i = start; i <= end; i++) {
    await new Promise(r => setTimeout(r, 100))  // Simulate async
    yield i
  }
}

for await (const n of asyncRange(1, 5)) {
  console.log(n)  // 1, 2, 3, 4, 5 with 100ms delay
}`,
            explanation: 'Step by step trace karo for...of loop: engine rangeIterable[Symbol.iterator]() call karta hai — iterator milta hai. Har iteration pe iterator.next() call hota hai — { value: 1, done: false } milta hai. Loop body execute hota hai. Jab done: true milta hai — loop khatam! [...rangeIterable] spread: same process, sab values array mein push hote hain. Async iterable mein same — lekin next() Promise return karta hai, for await...of await karta hai.',
          }}
          realWorldScenario="Database cursor — lazy rows fetch karo: for await (const row of db.cursor('SELECT * FROM logs')) — poora result set memory mein nahi load hota! 10 million rows bhi process ho sakti hain limited memory mein. Ek ek row process karo aur GC ko collect karne do. Elasticsearch scroll API, MongoDB cursor — sab async iterables se elegantly handle hote hain."
          commonMistakes={[
            {
              mistake: 'Iterator aur Iterable confuse karna',
              why: 'Iterator next() wala object hai. Iterable Symbol.iterator implement karta hai (returns iterator). Generator dono hota hai.',
              fix: 'for...of iterable chahiye. Manual next() calls iterator se. Generator function dono automatically implement karta hai.',
            },
            {
              mistake: 'Infinite iterator mein break nahi lagana',
              why: 'Infinite iterator spread karo: [...infiniteIterable] — browser hang ya crash.',
              fix: 'Infinite iterators ke saath hamesha for...of + break ya limit implement karo.',
            },
          ]}
          proTip="Generator functions sabse easy way hai iterables banane ka — Symbol.iterator manually implement karne ki zaroorat nahi! function* range() already iterable return karta hai. Destructuring ka ek fun use: const [first, , third] = myCustomIterable — sirf pehla aur teesra lo! Async generators se stream processing elegant ho jaati hai — file line by line padhna, API pages iterate karna."
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)' }}
      >
        <p className="text-sm text-[#FCD34D] font-medium">
          💡 Akshay ka insight: Generator functions JavaScript ki most mind-bending feature hain! Function pause ho sakti hai — ye concept pehle confusing lagta hai. Ek baar simpleGen example trace karo line by line — phir sab clear ho jaayega.
        </p>
      </div>

      <div id="generators">
        <ConceptCard
          title="Generators — Pauseable Functions"
          emoji="⏸️"
          difficulty="advanced"
          whatIsIt="Ek shocking output: simpleGen() call karo — kuch nahi hota! Log bhi nahi! kyun? Generator functions execute nahi hoti jab call karo — ek iterator return karti hain. Pehla gen.next() call karo tab 'Before first yield' print hoga aur yield 1 pe ruk jaayegi. Doosra gen.next() — resume, 'After first yield' print, yield 2 pe ruk. Ye hai function* aur yield ka magic! Redux-Saga generators use karta hai async flows manage karne ke liye — ek powerful concept."
          whenToUse={[
            'Lazy infinite sequences — IDs, timestamps, pagination',
            'Step-by-step async flows — Redux Saga style',
            'Cooperative multitasking — yield se control yield karo',
            'Infinite scrolling — generate next page on demand',
          ]}
          whyUseIt="Generators state machine implement karte hain elegantly. Infinite sequence create karo without infinite loop freezing — pull-based: sirf jab maango tab generate karo. idGenerator() — infinite IDs lazily generate karta hai. Fibonacci — infinite sequence, sirf jitna chahiye utna nikalo! Memory efficient — sirf current value memory mein, poori sequence nahi. Redux Saga generators se complex async flows (cancel, race, retry) readable sequential code mein likhte hain."
          howToUse={{
            filename: 'generators.js',
            language: 'javascript',
            code: `// ── BASIC GENERATOR ──────────────────────────────────────────────
function* simpleGen() {
  console.log('Before first yield')
  yield 1                          // Pause here, return 1
  console.log('After first yield')
  yield 2                          // Pause here, return 2
  console.log('After second yield')
  return 3                         // Done!
}

const gen = simpleGen()
gen.next()  // Logs: "Before first yield", returns { value: 1, done: false }
gen.next()  // Logs: "After first yield", returns { value: 2, done: false }
gen.next()  // Logs: "After second yield", returns { value: 3, done: true }
gen.next()  // { value: undefined, done: true }

// ── INFINITE SEQUENCE ─────────────────────────────────────────────
function* idGenerator(prefix = 'ID') {
  let id = 1
  while (true) {  // Infinite loop — but lazy!
    yield \`\${prefix}-\${String(id++).padStart(6, '0')}\`
  }
}

const ids = idGenerator('USR')
ids.next().value   // 'USR-000001'
ids.next().value   // 'USR-000002'
// Never exhausts — generate as needed

// Fibonacci — infinite sequence
function* fibonacci() {
  let [a, b] = [0, 1]
  while (true) {
    yield a;
    [a, b] = [b, a + b]
  }
}

function take(n, iterable) {
  const result = []
  for (const value of iterable) {
    result.push(value)
    if (result.length === n) break
  }
  return result
}

take(8, fibonacci())  // [0, 1, 1, 2, 3, 5, 8, 13]

// ── GENERATOR COMPOSITION ─────────────────────────────────────────
function* map(iterable, fn) {
  for (const value of iterable) yield fn(value)
}

function* filter(iterable, predicate) {
  for (const value of iterable) {
    if (predicate(value)) yield value
  }
}

function* take2(n, iterable) {
  for (const value of iterable) {
    yield value
    if (--n === 0) return
  }
}

// Lazy pipeline:
const result = [...take2(5,
  filter(
    map(fibonacci(), x => x * 2),  // Double each fib
    x => x % 3 === 0               // Only divisible by 3
  )
)]
// [0, 6, 24, 96, 384] — computed lazily, only as needed!

// ── ASYNC GENERATOR ───────────────────────────────────────────────
async function* paginate(url) {
  let page = 1
  let hasMore = true

  while (hasMore) {
    const res = await fetch(\`\${url}?page=\${page}&limit=20\`)
    const { data, meta } = await res.json()

    for (const item of data) yield item  // Yield each item

    hasMore = meta.page < meta.totalPages
    page++
  }
}

// Usage — process all items, page by page, lazily
for await (const user of paginate('/api/users')) {
  await processUser(user)
}`,
            explanation: 'Under the hood trace karo idGenerator: ids.next() call hota hai — generator resume hoti hai while(true) mein entry. id = 1. yield "USR-000001" — pause! ids.next() fir call — resume. id = 2. yield "USR-000002" — pause. Infinite loop hai lekin crash nahi — kyunki har yield pe pause hoti hai, next() call hone tak. Generator composition ka magic: map(fibonacci(), x =&gt; x*2) — ek generator dusre ko lazily wrap karta hai. Koi intermediate array nahi!',
          }}
          realWorldScenario="Large CSV file process karna Node.js mein: async generator se ek ek line yield karo. Memory mein poora file nahi — sirf current line! 10GB CSV file bhi process ho sakti hai 50MB RAM mein. Transform, filter karo lazily — disk pe bhi write karo on-the-fly. Data pipeline — generator chain banao — CSV read → parse → filter → transform → write. Elegant aur memory-efficient!"
          commonMistakes={[
            {
              mistake: 'Generator return value expect karna for...of mein',
              why: 'for...of done: true value ignore karta hai. return value collect nahi hoti.',
              fix: 'Return value ke liye gen.next() manually call karo, ya generator ke last yield use karo.',
            },
            {
              mistake: 'Generator re-use karna',
              why: 'Generator ek-baar iterable hai — exhaust hone ke baad done: true hamesha.',
              fix: 'Naya generator instance banao: const gen = myGenerator(). Iterator factory pattern use karo.',
            },
          ]}
          proTip="yield* ek powerful shortcut hai — doosre iterable ko delegate karo: yield* otherGenerator(). Nested generators compose karne ke liye. Generator.prototype.return() generator prematurely close karta hai — for...of mein break ye internally karta hai. Redux Saga ka tutorial zaroor padhna — wahan generators se async flows ka real-world use bahut clearly dikhta hai!"
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}
      >
        <p className="text-sm text-[#6EE7B7] font-medium">
          💡 Akshay ka insight: Proxy JavaScript ka bodyguard hai — object ke aage khada ho jaata hai, saari requests intercept karta hai. Vue 3 ki reactivity — Proxy. MobX — Proxy. Ye ek baar samjha toh reactive systems kaise kaam karte hain — raaz khul jaata hai!
        </p>
      </div>

      <div id="proxy">
        <ConceptCard
          title="Proxy — Object Operations Intercept Karo"
          emoji="🪞"
          difficulty="advanced"
          whatIsIt="Ek surprising demo: user.age = 'old' — JavaScript silently accept kar leta hai! Koi error nahi. Ab Proxy lagao — set trap mein type check karo — TypeError throw karo! Runtime validation bina class change kiye. Proxy ek object wrap karta hai aur operations intercept karta hai — get, set, delete, has, apply (function calls). Traps (handlers) define karo kya intercept karna hai. Vue 3 ki reactivity system entirely Proxy pe based hai — state.count++ karo toh set trap fire hota hai, component re-render hota hai!"
          whenToUse={[
            'Property access validate karna — type checking, range checking',
            'Reactive systems — property change pe notification — Vue 3 internals',
            'Logging — kaunsi property access hui, kab',
            'API mocking — test mein actual calls intercept karna',
          ]}
          whyUseIt="Proxy AOP (Aspect-Oriented Programming) enable karta hai — cross-cutting concerns bina original object change kiye add karo. Vue 2 Object.defineProperty use karta tha — arrays properly reactive nahi thi! Vue 3 Proxy use karta hai — sab kuch reactive. JavaScript sandboxing — unsafe code ke liye limited environment. Default values, validation — declarative approach. withLogging example dekhno — kisi bhi function ko wrap karo logging ke saath — original code ek character nahi badla!"
          howToUse={{
            filename: 'proxy.js',
            language: 'javascript',
            code: `// ── BASIC PROXY ───────────────────────────────────────────────────
const handler = {
  get(target, prop, receiver) {
    console.log(\`Getting property: \${String(prop)}\`)
    return Reflect.get(target, prop, receiver)  // Default behavior
  },

  set(target, prop, value, receiver) {
    console.log(\`Setting \${String(prop)} = \${value}\`)

    // Validation
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number')
    }
    if (prop === 'age' && (value < 0 || value > 150)) {
      throw new RangeError('Age must be between 0 and 150')
    }

    return Reflect.set(target, prop, value, receiver)  // Default set
  },

  deleteProperty(target, prop) {
    if (prop === 'id') throw new Error('Cannot delete id property')
    return Reflect.deleteProperty(target, prop)
  }
}

const user = new Proxy({ id: '123', name: 'Rahul', age: 25 }, handler)
user.name  // Logs: "Getting property: name"
user.age = 26  // Logs: "Setting age = 26"
user.age = 'old'  // Throws TypeError!
delete user.id  // Throws Error!

// ── DEFAULT VALUES ────────────────────────────────────────────────
function withDefaults(target, defaults) {
  return new Proxy(target, {
    get(obj, prop) {
      return prop in obj ? obj[prop] : defaults[prop]
    }
  })
}

const config = withDefaults(
  { port: 8080 },
  { host: 'localhost', timeout: 5000, debug: false }
)
config.port     // 8080 (own property)
config.host     // 'localhost' (from defaults)
config.timeout  // 5000 (from defaults)

// ── REACTIVE OBJECT (Vue 3 style) ────────────────────────────────
function reactive(obj, onChange) {
  return new Proxy(obj, {
    set(target, prop, value) {
      const old = target[prop]
      const result = Reflect.set(target, prop, value)
      if (old !== value) onChange({ prop, oldValue: old, newValue: value })
      return result
    }
  })
}

const state = reactive({ count: 0, name: 'App' }, (change) => {
  console.log('State changed:', change)
  reRender()  // Trigger re-render
})

state.count = 1  // "State changed: { prop: 'count', oldValue: 0, newValue: 1 }"

// ── FUNCTION PROXY — Method Logging ──────────────────────────────
function withLogging(fn) {
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      console.log(\`Calling \${target.name} with args:, args\`)
      const start = performance.now()
      const result = Reflect.apply(target, thisArg, args)
      console.log(\`\${target.name} took \${(performance.now() - start).toFixed(2)}ms\`)
      return result
    }
  })
}

const loggedFetch = withLogging(fetch)
await loggedFetch('/api/data')  // Logged automatically!`,
            explanation: 'Vue 3 reactivity trace karo: reactive(obj) call hota hai — Proxy banta hai. Component render hone pe state.count access hota hai — get trap fires — dependency track hoti hai (yahi dependency tracking hai!). state.count = 1 assign hota hai — set trap fires — onChange call hota hai — component re-render! Yehi hai reactivity ka core. withDefaults pattern: config.host access karo — get trap check karta hai obj mein hai kya? Nahi toh defaults se lo. Elegant!',
          }}
          realWorldScenario="Testing mein API mock: const mockApi = new Proxy(realApi, { get(target, method) { return async (...args) => { logCall(method, args); return mockData[method]; } }}). Sab method calls logged aur real API call nahi hota — bina koi specific mock likhne ke! Generic interceptor — koi bhi method mock ho jaata hai. Integration tests ke liye perfect."
          commonMistakes={[
            {
              mistake: 'Proxy traps mein Reflect na use karna',
              why: 'Manual get/set implementation edge cases miss karta hai — prototype chain, descriptors, receivers.',
              fix: 'Default behavior ke liye hamesha Reflect.get/set use karo — sirf extra logic add karo.',
            },
            {
              mistake: 'Proxy performance-critical loops mein use karna',
              why: 'Proxy overhead hai — har property access trap se jaata hai. Hot paths pe measurable slowdown.',
              fix: 'Profile pehle. Cache results, ya Proxy sirf non-hot paths mein. Vue 3 optimized compilation se Proxy overhead minimize karta hai.',
            },
          ]}
          proTip="Important warning: Proxy performance-critical loops mein use mat karo — har property access trap se jaata hai, overhead hota hai. Hot paths mein profile karo pehle. Proxy aur WeakMap milake private properties simulate karo — true encapsulation deta hai. Vue 3 ke source code mein Proxy ke use dhundho — reactivity system samajhne ka best way hai!"
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)' }}
      >
        <p className="text-sm text-[#93C5FD] font-medium">
          💡 Akshay ka insight: Reflect Proxy ka natural partner hai. Proxy trap mein agar sirf extra logic add karna hai aur default behavior preserve karna hai — Reflect.get(target, prop, receiver) use karo. target[prop] nahi — receiver ke saath getters properly kaam karte hain!
        </p>
      </div>

      <div id="reflect">
        <ConceptCard
          title="Reflect — Meta-Programming API"
          emoji="🔮"
          difficulty="advanced"
          whatIsIt="Ye sunne mein simple lagta hai — Reflect sirf object operations ko functions ki tarah use karne deta hai. Lekin importance samjho: Proxy trap mein target[prop] use karo — getter pe receiver properly nahi pass hota! Edge case miss hota hai. Reflect.get(target, prop, receiver) use karo — bilkul correct. Reflect built-in object hai jo object operations ke liye functions provide karta hai — property get/set/delete, function calls, prototype operations. Reflect.ownKeys() Symbol keys bhi include karta hai — Object.keys() se complete!"
          whenToUse={[
            'Proxy traps mein default behavior delegate karna',
            'Object operations programmatically invoke karna',
            'Safer property access — no prototype pollution risk',
            'Object.defineProperty alternative — better ergonomics',
          ]}
          whyUseIt="Reflect.get(obj, prop, receiver) — operator ke equivalent lekin function call ke roop mein — programmatic access! Proxy ke saath pair karna natural — each trap has a corresponding Reflect method. Rule: har Proxy trap mein corresponding Reflect method use karo default behavior ke liye. Reflect.ownKeys() — Object.getOwnPropertyNames() + Symbols — complete property list. Reflect.apply() — fn.call() ka functional version."
          howToUse={{
            filename: 'reflect.js',
            language: 'javascript',
            code: `// ── REFLECT vs Traditional ────────────────────────────────────────

// Traditional:
const value = obj.prop              // Reflect.get(obj, 'prop')
obj.prop = value                    // Reflect.set(obj, 'prop', value)
delete obj.prop                     // Reflect.deleteProperty(obj, 'prop')
'prop' in obj                       // Reflect.has(obj, 'prop')
obj instanceof SomeClass            // Reflect.has(SomeClass.prototype, 'prop') — not exact
fn.call(thisArg, ...args)          // Reflect.apply(fn, thisArg, args)
new SomeClass(...args)              // Reflect.construct(SomeClass, args)
Object.getPrototypeOf(obj)          // Reflect.getPrototypeOf(obj)
Object.setPrototypeOf(obj, proto)   // Reflect.setPrototypeOf(obj, proto)

// ── REFLECT IN PROXY TRAPS ────────────────────────────────────────
const loggingProxy = new Proxy(target, {
  get(target, prop, receiver) {
    console.log(\`GET \${String(prop)}\`)
    return Reflect.get(target, prop, receiver)  // Correct default!
    // Don't use: return target[prop] — misses receiver for getters
  },

  set(target, prop, value, receiver) {
    console.log(\`SET \${String(prop)} = \${JSON.stringify(value)}\`)
    return Reflect.set(target, prop, value, receiver)
    // Don't use: target[prop] = value — misses setter inheritance
  },
})

// ── REFLECT.OWNKEYS — All own property names + symbols ────────────
const sym = Symbol('secret')
const obj = {
  name: 'Rahul',
  age: 25,
  [sym]: 'hidden',
}

Object.keys(obj)               // ['name', 'age'] — no symbols
Object.getOwnPropertyNames(obj) // ['name', 'age'] — no symbols
Reflect.ownKeys(obj)           // ['name', 'age', Symbol(secret)] — complete!

// ── REFLECT.APPLY — Function calls as data ───────────────────────
function greet(greeting, name) {
  return \`\${greeting}, \${name}! I am \${this.role}\`
}

const context = { role: 'developer' }
const result = Reflect.apply(greet, context, ['Hello', 'Rahul'])
// Equivalent to: greet.call(context, 'Hello', 'Rahul')

// ── REFLECT.CONSTRUCT — new as function ──────────────────────────
class User {
  constructor(name, role) {
    this.name = name
    this.role = role
  }
}

// Dynamic construction
const args = ['Rahul', 'admin']
const user = Reflect.construct(User, args)
// Equivalent to: new User(...args)

// With different prototype:
const user2 = Reflect.construct(User, args, AdminUser)
// instance of AdminUser, but User constructor ran`,
            explanation: 'Receiver ka importance: class A { get x() { return this._x } }. Proxy wrap karo — get trap mein target[prop] use karo. Getter mein this = target (proxy nahi!). Reflect.get(target, prop, receiver) mein this = receiver (proxy!) — getter chain properly work karta hai. Ye subtle lekin important hai. Reflect.ownKeys dekhno — name, age symbols bhi include karta hai. Object.keys sirf enumerable string keys deta hai — incomplete!',
          }}
          realWorldScenario="NestJS jaise frameworks DI container mein: Reflect.construct(ServiceClass, dependencies) — services dynamically instantiate karo. reflect-metadata ke saath: @Injectable() decorator metadata store karta hai, container Reflect.getMetadata se types read karta hai, Reflect.construct se instances banata hai. Angular bhi same pattern!"
          commonMistakes={[
            {
              mistake: 'Proxy trap mein target[prop] use karna Reflect.get ki jagah',
              why: 'Getter/setter inheritance aur receiver properly handle nahi hota — subtle bugs.',
              fix: 'Proxy traps mein hamesha corresponding Reflect method use karo — Reflect.get(target, prop, receiver).',
            },
            {
              mistake: 'Reflect ko security boundary samajhna',
              why: 'Reflect JavaScript object model se bahar nahi jaata — normal access control bypass nahi karta.',
              fix: 'Reflect meta-programming ke liye hai — security ke liye proper patterns (class private fields, closures) use karo.',
            },
          ]}
          proTip="Rule 1: Proxy trap mein hamesha Reflect.method() use karo default behavior ke liye — target[prop] nahi. Rule 2: Reflect sirf meta-programming ke liye hai — security boundary nahi. TypeScript decorators under the hood Reflect.metadata use karte hain — @Injectable, @Component decorators metadata store karte hain. Stage 3 Decorator proposal built-in support la raha hai — exciting future hai!"
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
      >
        <p className="text-sm text-[#FCA5A5] font-medium">
          💡 Akshay ka insight: styled-components ka syntax: const Button = styled.button`background: blue;` — ye koi magic nahi, tagged template literal hai! Ye samajhne ke baad styled-components, graphql-tag, sql templates — sab ka andar ka raaz pata chal jaata hai.
        </p>
      </div>

      <div id="tagged-templates">
        <ConceptCard
          title="Tagged Template Literals — Custom String Processing"
          emoji="🏷️"
          difficulty="advanced"
          whatIsIt="Pehle ek surprising output: sql`SELECT * FROM users WHERE id = ${userId}` — ye normal string concatenation nahi hai! sql function call ho raha hai with special arguments. tag`Hello ${name}!` — tag function ko milta hai: strings = ['Hello ', '!'], values = [name]. Alag! Tagged templates template literal ke strings aur values ko function se process karne dete hain. SQL injection prevent karo, XSS prevent karo, CSS-in-JS — sab tagged templates se possible!"
          whenToUse={[
            'SQL queries — injection-safe parameterized queries',
            'CSS-in-JS — styled-components exactly yahi karta hai',
            'HTML escaping — user content safely render karna',
            'i18n — localized strings with interpolation',
          ]}
          whyUseIt="SQL injection — ye web security ki sabse common vulnerability hai. Tagged sql template se values automatically parameterize ho jaate hain — `$1`, `$2` placeholders bante hain. Database driver safely escape karta hai. String concatenation se SQL inject karna impossible! styled-components mein CSS-in-JS — props-based dynamic styles naturally likhte hain. i18n naturally fits — template parts translate karo, values as-is rakho. Powerful DSL (Domain Specific Language) banao JavaScript mein!"
          howToUse={{
            filename: 'tagged-templates.js',
            language: 'javascript',
            code: `// ── HOW TAGGED TEMPLATES WORK ────────────────────────────────────
function tag(strings, ...values) {
  // strings: ['Hello, ', '! You are ', ' years old.']
  // values: ['Rahul', 25]
  console.log(strings)  // TemplateStringsArray — raw strings
  console.log(values)   // Interpolated values

  // Reconstruct string (default behavior):
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] !== undefined ? values[i] : '')
  }, '')
}

const name = 'Rahul', age = 25
tag\`Hello, \${name}! You are \${age} years old.\`

// ── SQL SAFE QUERIES ──────────────────────────────────────────────
function sql(strings, ...values) {
  const text = strings.reduce((query, str, i) => {
    return query + str + (values[i] !== undefined ? \`$\${i}\` : '')
  }, '')
  return { text, values }  // Parameterized query!
}

const userId = '123; DROP TABLE users; --'  // SQL injection attempt
const query = sql\`SELECT * FROM users WHERE id = \${userId}\`
// query.text: "SELECT * FROM users WHERE id = $1"
// query.values: ['123; DROP TABLE users; --']
// Safe! Value parameterized hai

// Database execute karo:
// await db.query(query.text, query.values)

// ── HTML ESCAPING ─────────────────────────────────────────────────
function html(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] !== undefined
      ? String(values[i])
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
      : ''
    return result + str + value
  }, '')
}

const userInput = '<script>alert("XSS")</script>'
const safe = html\`<div>\${userInput}</div>\`
// '<div>&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</div>'

// ── STYLED-COMPONENTS UNDER THE HOOD ─────────────────────────────
// styled-components roughly does this:
function styled(element) {
  return (strings, ...values) => {
    const cssClass = generateUniqueClass()
    const css = strings.reduce((acc, str, i) => {
      const value = typeof values[i] === 'function'
        ? values[i]({ theme })  // Props/theme inject
        : values[i]
      return acc + str + (value ?? '')
    }, '')
    injectCSS(\`.\${cssClass} { \${css} }\`)

    // Return React component
    return ({ children, ...props }) =>
      createElement(element, { ...props, className: cssClass }, children)
  }
}

const Button = styled('button')\`
  background: \${props => props.primary ? '#7C3AED' : '#1A1A26'};
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
\`

// ── i18n ─────────────────────────────────────────────────────────
const translations = {
  en: { greeting: 'Hello, {0}! You have {1} messages.' },
  hi: { greeting: 'Namaste, {0}! Aapke paas {1} sandesh hain.' },
}

function i18n(key) {
  return (strings, ...values) => {
    const template = translations[currentLang][key]
    return values.reduce((str, val, i) => str.replace(\`{\${i}}\`, val), template)
  }
}

i18n('greeting')\`\${'Rahul'}\${5}\`  // "Hello, Rahul! You have 5 messages." (en)`,
            explanation: 'Step by step trace karo sql tag: sql`SELECT WHERE id = ${userId}` — strings = ["SELECT WHERE id = ", ""], values = [userId]. reduce function: "SELECT WHERE id = " + "$1" + "" = "SELECT WHERE id = $1". values = [userId]. Database ko ye bhejo — database driver userId ko $1 position pe safely bind karta hai. Koi string interpolation nahi — injection impossible! HTML tag mein: values mein special chars replace hote hain — &lt; banta hai, script inject nahi ho sakta.',
          }}
          realWorldScenario="Backend Node.js mein typed SQL queries: sql`SELECT * FROM users WHERE role = ${role} AND active = ${true}` — query.text aur query.values se pg/mysql safely execute karo. No string concatenation, no injection risk ever. slonik aur postgres.js libraries exactly yahi karte hain. Ek baar ye pattern adopt karo — SQL injection ki tension hamesha ke liye khatam!"
          commonMistakes={[
            {
              mistake: 'Tagged templates ko regular template literals samajhna',
              why: 'tag`string` aur `string` bahut alag hain — tag function ke saath string processing custom hoti hai.',
              fix: 'Tag function first argument strings array hai (static parts), baaki values (dynamic parts). Samjho dono alag hain.',
            },
            {
              mistake: 'SQL template mein values directly embed karna',
              why: 'Parameterization miss ho jaaye toh SQL injection vulnerability.',
              fix: 'sql tag function se values ko params array mein separately rakho — database driver parameterized queries use kare.',
            },
          ]}
          proTip="String.raw built-in tag hai — String.raw`C:\\Users\\path` — backslash double nahi karna padta, Windows paths easy! gql tag — GraphQL queries type-safe banata hai (graphql-tag), IDE syntax highlighting bhi milti hai. i18n libraries tagged templates use karti hain — ek baar explore karo ke styled-components ka source code — tagged templates samajhne ka best way!"
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 18 Quiz — Advanced JS Patterns
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — deep JavaScript samjho!
          </p>
        </div>
        <QuizSection questions={advancedQuiz} chapterSlug="advanced-patterns" />
      </div>
    </div>
  )
}
