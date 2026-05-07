'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

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
          JavaScript ke advanced features — Iterators, Generators, Proxy, Reflect, Tagged templates — powerful meta-programming tools hain. React, Vue, MobX, styled-components sab ye features internally use karte hain. Inhe samajhna senior developer banaata hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum in advanced features ko practical examples ke saath cover karenge — theory nahi, real use cases.
        </p>
      </div>

      <div id="iterators">
        <ConceptCard
          title="Iterators & Iterables — Custom Traversal"
          emoji="🔁"
          difficulty="advanced"
          whatIsIt="Iterator protocol: object jo next() method implement kare jo { value, done } return kare. Iterable protocol: object jo Symbol.iterator implement kare jo iterator return kare. Arrays, strings, Maps, Sets sab built-in iterables hain. Custom iterables banao for...of, spread, destructuring ke saath."
          whenToUse={[
            'Custom data structures — linked list, tree traversal',
            'Lazy sequences — on-demand values generate karna',
            'Infinite sequences — jab tak chahiye values',
            'API ke results paginate karna lazily',
          ]}
          whyUseIt="Custom iterables for...of, spread, Array.from() sab ke saath natively kaam karte hain. Lazy evaluation se memory efficient — poori sequence upfront generate nahi hoti. Generators se iterables banane ka easy way milta hai. Reactive streams ka foundation."
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
            explanation: 'Iterator protocol: next() → { value, done }. Iterable protocol: [Symbol.iterator]() → iterator. Custom class pe Symbol.iterator implement karo — for...of, spread, destructuring sab kaam karte hain. Async iterables se paginated API results stream karo.',
          }}
          realWorldScenario="Database cursor — lazy rows fetch karo: for await (const row of db.cursor('SELECT * FROM logs')) — poora result set memory mein nahi load hota. Ek ek row process karo aur GC ko collect karne do. Large dataset processing mein essential."
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
          proTip="Array destructuring ke saath custom iterables powerful hain: const [first, second] = myCustomIterable. Generator functions sabse easy way hai iterables banane ka — Symbol.iterator manually implement karne ki zaroorat nahi. Async generators se stream processing elegant ho jaati hai."
        />
      </div>

      <div id="generators">
        <ConceptCard
          title="Generators — Pauseable Functions"
          emoji="⏸️"
          difficulty="advanced"
          whatIsIt="Generator functions function* keyword se define hoti hain. yield se values produce karo — execution pause hoti hai. next() se resume karo. Infinite sequences, lazy evaluation, coroutines — generators se possible. Redux-Saga generators use karta hai async flows manage karne ke liye."
          whenToUse={[
            'Lazy infinite sequences — IDs, timestamps, pagination',
            'Step-by-step async flows — Redux Saga style',
            'Cooperative multitasking — yield se control yield karo',
            'Infinite scrolling — generate next page on demand',
          ]}
          whyUseIt="Generators state machine implement karte hain elegantly. Infinite sequence create karo without infinite loop — pull-based values. Redux Saga generators se complex async flows readable sequential code mein likhte hain. Memory efficient — sirf current value memory mein."
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
            explanation: 'function* aur yield se pauseable execution. Infinite sequences — while(true) + yield — lazy, no memory issue. Generator composition se lazy pipelines bano — map, filter, take without creating intermediate arrays. Async generators se pagination seamless hai.',
          }}
          realWorldScenario="Large CSV file process karna Node.js mein: async generator se ek ek line yield karo. Memory mein poora file nahi — sirf current line. 10GB CSV file bhi process ho sakti hai limited memory mein. Transform, filter karo lazily — disk pe bhi write karo on-the-fly."
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
          proTip="yield* doosre iterable ko delegate karta hai: yield* otherGenerator(). Nested generators compose karne ke liye. Generator.prototype.return() generator prematurely close karta hai — for...of mein break. Redux Saga generators se complex async workflows manage karta hai — race conditions, cancellation sab."
        />
      </div>

      <div id="proxy">
        <ConceptCard
          title="Proxy — Object Operations Intercept Karo"
          emoji="🪞"
          difficulty="advanced"
          whatIsIt="Proxy ek object wrap karta hai aur operations intercept karta hai — get, set, delete, has, apply (function calls), construct (new). Traps (handlers) define karo kya intercept karna hai. Validation, logging, reactivity (Vue 3!), memoization, sandboxing — Proxy se possible."
          whenToUse={[
            'Property access validate karna — type checking, range checking',
            'Reactive systems — property change pe notification — Vue 3 internals',
            'Logging — kaunsi property access hui, kab',
            'API mocking — test mein actual calls intercept karna',
          ]}
          whyUseIt="Proxy AOP (Aspect-Oriented Programming) enable karta hai — cross-cutting concerns bina original object change kiye add karo. Vue 3 ki reactivity system entirely Proxy pe based hai. JavaScript sandboxing — unsafe code ke liye limited environment. Default values, validation — declarative approach."
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
            explanation: 'Proxy handler traps define karta hai. Reflect.get/set use karo default behavior ke liye — agar kuch zyada karna ho sirf intercept karo. Vue 3 ki reactivity system Proxy use karta hai — dependencies automatically track hoti hain. withDefaults pattern fallback values elegant tarike se handle karta hai.',
          }}
          realWorldScenario="Testing mein API mock: const mockApi = new Proxy(realApi, { get(target, method) { return async (...args) => { logCall(method, args); return mockData[method]; } }}). Sab method calls logged aur real API call nahi hota. Integration tests ke liye."
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
          proTip="Proxy aur WeakMap milake private properties simulate karo: const _private = new WeakMap(); const obj = new Proxy({}, { get(t, k) { if (k === 'secret') return _private.get(t).secret; ... } }). Ye pattern true encapsulation deta hai — closure se better kyunki subclasses ke saath bhi kaam karta hai."
        />
      </div>

      <div id="reflect">
        <ConceptCard
          title="Reflect — Meta-Programming API"
          emoji="🔮"
          difficulty="advanced"
          whatIsIt="Reflect built-in object hai jo object operations ke liye functions provide karta hai — property get/set/delete, function calls, prototype operations. Proxy traps ke saath natural pair hai — trap mein Reflect.method() se default behavior delegate karo. Reflect.ownKeys() Symbol keys bhi include karta hai."
          whenToUse={[
            'Proxy traps mein default behavior delegate karna',
            'Object operations programmatically invoke karna',
            'Safer property access — no prototype pollution risk',
            'Object.defineProperty alternative — better ergonomics',
          ]}
          whyUseIt="Reflect.get(obj, prop, receiver) — operator ke equivalent lekin function call ke roop mein. Proxy ke saath pair karna natural — each trap has a corresponding Reflect method. Reflect.has() — in operator equivalent. Reflect.ownKeys() — Object.getOwnPropertyNames() + Symbols."
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
            explanation: 'Reflect Proxy ke natural complement hai — each trap has matching Reflect method. receiver parameter getters/setters ke saath correctly kaam karta hai — target[prop] nahi. ownKeys symbols bhi deta hai. Reflect.apply function calls data-driven banata hai.',
          }}
          realWorldScenario="Dependency injection container mein: Reflect.construct(ServiceClass, dependencies) — services dynamically instantiate karo. Reflect.ownKeys(prototype) se methods list karo — method decorators apply karo all methods pe automatically."
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
          proTip="TypeScript decorators under the hood Reflect.metadata use karte hain (reflect-metadata package). @Injectable, @Component decorators metadata store karte hain — DI container runtime pe metadata read karta hai. Angular, NestJS sab is pattern pe based hain. Stage 3 Decorator proposal built-in support la raha hai."
        />
      </div>

      <div id="tagged-templates">
        <ConceptCard
          title="Tagged Template Literals — Custom String Processing"
          emoji="🏷️"
          difficulty="advanced"
          whatIsIt="Tagged templates template literal ke strings aur values ko function se process karne dete hain. tag\`Hello \${name}\` — tag function strings array aur values receive karta hai. SQL safe queries, CSS-in-JS (styled-components), i18n, HTML escaping — sab tagged templates se. Runtime mein template parts process karo."
          whenToUse={[
            'SQL queries — injection-safe parameterized queries',
            'CSS-in-JS — styled-components exactly yahi karta hai',
            'HTML escaping — user content safely render karna',
            'i18n — localized strings with interpolation',
          ]}
          whyUseIt="Tagged templates string construction ko type-safe aur feature-rich banate hain. SQL injection prevent karo — values automatically parameterize. styled-components CSS-in-JS syntax intuitive banata hai. i18n naturally fits — template parts translate karo, values as-is rakho. Powerful DSL (Domain Specific Language) banao JavaScript mein."
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
            explanation: 'strings TemplateStringsArray hai — static parts. values interpolated values hain. Interleave karo strings aur values apni logic se. SQL parameterization injection prevent karta hai. HTML escaping XSS prevent karta hai. styled-components theming aur dynamic CSS isi se karta hai.',
          }}
          realWorldScenario="Backend Node.js mein typed SQL queries: sql`SELECT * FROM users WHERE role = ${role} AND active = ${true}` — query.text aur query.values se pg/mysql safely execute karo. No string concatenation, no injection risk. slonik library exactly yahi karta hai."
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
          proTip="strings.raw tagged template hai — no escape processing: String.raw\`C:\\Users\\path\` — Windows paths bina double backslash. regex tagged template literals compile-time regex validation ke liye use hote hain. gql tag — GraphQL queries type-safe banata hai (graphql-tag). i18n libraries tagged templates use karti hain."
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
