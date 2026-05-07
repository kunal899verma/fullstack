'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const fpQuiz: QuizQuestion[] = [
  {
    question: 'Pure function kya hoti hai?',
    options: [
      { text: 'Sirf arrow function hoti hai', correct: false, explanation: 'Pure function ka arrow syntax se koi rishta nahi.' },
      { text: 'Same input hamesha same output deti hai aur koi side effects nahi hote', correct: true, explanation: 'Bilkul sahi! Pure functions predictable, testable aur cacheable hain.' },
      { text: 'Async nahi hoti', correct: false, explanation: 'Async function bhi pure ho sakti hai agar side effects nahi hain.' },
      { text: 'Sirf ek parameter accept karti hai', correct: false, explanation: 'Parameters ka count purity se related nahi.' },
    ],
  },
  {
    question: 'Immutability ka matlab kya hai?',
    options: [
      { text: 'Variables const se declare karna', correct: false, explanation: 'const variable ko reassign nahi kar sakta lekin object ko mutate kar sakta hai.' },
      { text: 'Data change nahi karte — naya data banate hain', correct: true, explanation: 'Sahi! Original data modify nahi karte — spread, map, filter se new values create karte hain.' },
      { text: 'Sirf strings ke liye applicable hai', correct: false, explanation: 'Immutability arrays, objects — sab ke liye applicable hai.' },
      { text: 'Performance slow karta hai hamesha', correct: false, explanation: 'Structural sharing se immutable operations often efficient hote hain.' },
    ],
  },
  {
    question: 'Higher-order function kya hoti hai?',
    options: [
      { text: 'Bahut complex logic wali function', correct: false, explanation: 'Complexity se HOF ka koi rishta nahi.' },
      { text: 'Function jo function accept kare ya return kare', correct: true, explanation: 'Bilkul! map, filter, reduce HOFs hain — callback accept karte hain.' },
      { text: 'Sirf class methods', correct: false, explanation: 'HOF regular functions bhi ho sakti hain.' },
      { text: 'Async functions', correct: false, explanation: 'Async functions automatically HOF nahi hoti.' },
    ],
  },
  {
    question: 'Function composition kya karta hai?',
    options: [
      { text: 'Functions ko ek array mein store karta hai', correct: false, explanation: 'Array storage composition nahi hai.' },
      { text: 'Multiple functions ko chain karta hai — ek ka output doosre ka input', correct: true, explanation: 'Sahi! compose(f, g)(x) === f(g(x)). Complex operations simple functions se build karo.' },
      { text: 'Functions ko parallel run karta hai', correct: false, explanation: 'Composition sequential hai — ek ke baad ek.' },
      { text: 'Error handling add karta hai functions mein', correct: false, explanation: 'Composition sirf chaining hai — error handling alag concept.' },
    ],
  },
  {
    question: 'Currying kya karta hai?',
    options: [
      { text: 'Function ko async banata hai', correct: false, explanation: 'Currying async se related nahi.' },
      { text: 'Multi-argument function ko chain of single-argument functions mein convert karta hai', correct: true, explanation: 'Sahi! add(2)(3) === add(2, 3). Partial application enable karta hai.' },
      { text: 'Function ko memoize karta hai', correct: false, explanation: 'Memoization alag optimization technique hai.' },
      { text: 'Object methods ke liye this bind karta hai', correct: false, explanation: 'bind() this ke liye hai, currying arguments ke liye.' },
    ],
  },
]

export default function JSChapter14Content() {
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
          Functional Programming — Code Ka Philosophy
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Functional Programming (FP) ek coding style hai jahan functions data transform karte hain — state mutate nahi karte. React, Redux, RxJS sab FP principles par built hain. Pure functions, immutability, higher-order functions — ye sab aapko predictable, testable code likhne dete hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum FP ke core concepts cover karenge — practical examples ke saath jo aap real projects mein use kar sako.
        </p>
      </div>

      <div id="pure-functions">
        <ConceptCard
          title="Pure Functions — Predictability Ka Raaz"
          emoji="💎"
          difficulty="intermediate"
          whatIsIt="Pure function do properties follow karti hai: (1) Same input → hamesha same output. (2) No side effects — external state change nahi karti. Side effects hain: DOM manipulation, API calls, console.log, global variable change, random numbers, current time. Pure functions predictable, testable aur cacheable hain."
          whenToUse={[
            'Data transformation — objects/arrays ko convert karna',
            'Calculations — price compute karna, tax calculate karna',
            'String formatting — names, dates, currencies format karna',
            'Validation logic — input check karna',
          ]}
          whyUseIt="Pure functions test likhna trivial hai — no mocking, no setup, no teardown. Bugs dhundna easy hai — same input diya, expected output chahiye. Memoization possible hai — same args ke liye result cache karo. Parallel execution safe hai — no shared state."
          howToUse={{
            filename: 'pure-functions.js',
            language: 'javascript',
            code: `// ❌ Impure — side effects hain
let total = 0
function addToTotal(amount) {
  total += amount  // External state mutate!
  return total
}
addToTotal(5)  // 5 — depends on previous calls
addToTotal(5)  // 10 — same input, different output!

// ✅ Pure — same input, same output, no side effects
function add(a, b) {
  return a + b
}
add(5, 3)  // Always 8
add(5, 3)  // Always 8 — predictable!

// ❌ Impure — external dependency (Date)
function greetUser(name) {
  const hour = new Date().getHours()  // Side effect: time dependency
  return hour < 12 ? \`Good morning, \${name}!\` : \`Good evening, \${name}!\`
}

// ✅ Injection se pure banao
function greetUser(name, hour) {  // hour inject karo
  return hour < 12 ? \`Good morning, \${name}!\` : \`Good evening, \${name}!\`
}
// Test karna easy:
greetUser('Rahul', 10)  // Always "Good morning, Rahul!"
greetUser('Rahul', 20)  // Always "Good evening, Rahul!"

// ❌ Impure — argument mutate karta hai
function sortUsers(users) {
  users.sort((a, b) => a.name.localeCompare(b.name))  // Original array mutate!
  return users
}

// ✅ Pure — new array return karo
function sortUsers(users) {
  return [...users].sort((a, b) => a.name.localeCompare(b.name))
}

// Memoization — pure functions ke saath possible
function memoize(fn) {
  const cache = new Map()
  return function(...args) {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

const expensiveCalc = memoize((n) => {
  // Heavy computation
  return n * n
})
expensiveCalc(100)  // Computes
expensiveCalc(100)  // From cache — instant!`,
            explanation: 'Pure functions external state nahi padhti ya change nahi karti. Dependency injection (hour parameter pass karna) se time/IO dependence pure banata hai. Array methods jaise sort mutate karte hain — spread se copy banao pehle. Memoization pure functions ke saath naturally fits.',
          }}
          realWorldScenario="Redux reducers pure functions hote hain — same state + action → same new state. Ye predictability Redux DevTools time-travel debugging enable karta hai. React rendering bhi pure concept follow karta hai — same props → same output."
          commonMistakes={[
            {
              mistake: 'console.log wali function ko pure samajhna',
              why: 'console.log side effect hai — external system (console) change hota hai. Technically impure.',
              fix: 'Business logic aur logging separate karo. Pure core logic, impure shell (logging, API calls).',
            },
            {
              mistake: 'Object argument mutate karna',
              why: 'JS objects reference se pass hote hain — mutation caller ka object change kar deta hai.',
              fix: 'New object return karo: return { ...input, modified: true }. Never modify input directly.',
            },
          ]}
          proTip="Functional core, imperative shell pattern: pure functions se business logic likho, impure side effects (API calls, DB, logging) ko edge par rakho. Testing mein sirf pure core test karo — bahut fast aur reliable. Integration tests shell ke liye."
        />
      </div>

      <div id="immutability">
        <ConceptCard
          title="Immutability — Data Protect Karo"
          emoji="🔒"
          difficulty="intermediate"
          whatIsIt="Immutability ka matlab — existing data modify mat karo. Naya data create karo. Spread operator, map, filter, reduce — ye sab new values return karte hain. Object.freeze() shallow immutability. Immer.js deep immutable updates easy banata hai. React state immutable rakhna mandatory hai."
          whenToUse={[
            'React state updates — never mutate, always new object/array',
            'Redux reducers — immutable state transitions',
            'Shared data structures — multiple places pe same reference use ho',
            'Change detection — immutable data mein reference equality fast hai',
          ]}
          whyUseIt="Mutable data bugs ka source number one hai — kahan mutate hua, kisne mutate kiya, track karna mushkil. Immutable data predictable hai — original hamesha safe. React change detection reference comparison pe kaam karta hai — mutate karo toh re-render nahi hoga!"
          howToUse={{
            filename: 'immutability.js',
            language: 'javascript',
            code: `// ── ARRAY IMMUTABLE OPERATIONS ──────────────────────────────────

const arr = [1, 2, 3, 4, 5]

// Add element — immutable
const withItem = [...arr, 6]           // [1,2,3,4,5,6]
const atStart = [0, ...arr]            // [0,1,2,3,4,5]
const atIndex = [...arr.slice(0, 2), 99, ...arr.slice(2)]  // Insert at index 2

// Remove element — immutable
const withoutFirst = arr.slice(1)      // [2,3,4,5]
const withoutLast = arr.slice(0, -1)   // [1,2,3,4]
const withoutIndex = arr.filter((_, i) => i !== 2)  // Remove index 2: [1,2,4,5]
const withoutValue = arr.filter(x => x !== 3)       // Remove value 3

// Update element — immutable
const updated = arr.map((x, i) => i === 2 ? 99 : x)  // Replace index 2

// ── OBJECT IMMUTABLE OPERATIONS ──────────────────────────────────

const user = { name: 'Rahul', age: 25, city: 'Mumbai' }

// Add/update property — spread
const withEmail = { ...user, email: 'rahul@example.com' }
const olderUser = { ...user, age: 26 }  // age override

// Remove property — rest destructuring
const { city, ...withoutCity } = user  // { name: 'Rahul', age: 25 }

// Nested update — careful!
const state = {
  user: { name: 'Priya', address: { city: 'Delhi', pin: '110001' } },
  posts: [],
  loading: false,
}

// ❌ Shallow copy bug:
const newState = { ...state, loading: true }
newState.user.address.city = 'Mumbai'  // Mutates original! state.user.address.city changed!

// ✅ Deep nested update — each level spread:
const correctState = {
  ...state,
  loading: true,
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city: 'Mumbai',
    },
  },
}

// ── IMMER.JS — Easy deep immutable updates ───────────────────────
import produce from 'immer'

const nextState = produce(state, (draft) => {
  draft.loading = true
  draft.user.address.city = 'Mumbai'  // Immer handles immutability!
  draft.posts.push({ id: 1, title: 'New Post' })  // .push() safe here!
})

// ── Object.freeze() — Runtime immutability ───────────────────────
const config = Object.freeze({
  API_URL: 'https://api.example.com',
  TIMEOUT: 5000,
})

config.API_URL = 'hacked'  // Silent failure in non-strict, TypeError in strict
config.API_URL  // Still 'https://api.example.com'

// Shallow freeze — nested objects mutable:
const deepObj = Object.freeze({ nested: { value: 1 } })
deepObj.nested.value = 999  // Works! Object.freeze shallow hai`,
            explanation: 'Immutability ke liye spread, map, filter, reduce — all return new values. Nested updates ke liye every level spread karo — verbose. Immer.js mutable-looking syntax se immutable updates easy karta hai. Object.freeze runtime protection deta hai — config objects ke liye useful.',
          }}
          realWorldScenario="React todo app: setTodos(prev => [...prev, newTodo]) — correct. setTodos(prev => { prev.push(newTodo); return prev; }) — wrong! Same reference, React re-render nahi karega. Redux reducer: return { ...state, users: state.users.filter(u => u.id !== id) }."
          commonMistakes={[
            {
              mistake: 'Spread se deep clone samajhna',
              why: 'Spread shallow hai — nested objects still share references. state.user ko mutate karo toh newState.user bhi change.',
              fix: 'Every nested level spread karo, ya structuredClone() use karo, ya Immer.js.',
            },
            {
              mistake: 'const use karna aur immutability samajhna',
              why: 'const object/array ko reassign nahi kar sakta, mutate kar sakta hai. const arr = []; arr.push(1) valid hai!',
              fix: 'Immutability data operations ke baare mein hai — push, splice mat use karo. spread, filter, map use karo.',
            },
          ]}
          proTip="Zustand, Jotai jaise modern state managers Immer integrate karte hain — mutable looking code se immutable updates. React useState mein bhi Immer use kar sakte ho: useImmer hook from 'use-immer' package. Complex nested state updates bahut easy ho jaate hain."
        />
      </div>

      <div id="higher-order-functions">
        <ConceptCard
          title="Higher-Order Functions — Reduce Se Sab Kuch"
          emoji="🔧"
          difficulty="intermediate"
          whatIsIt="Higher-order functions (HOF) wo functions hain jo functions accept karte hain ya return karte hain. map, filter, reduce, every, some, find — sab HOFs hain. reduce sabse powerful hai — map aur filter dono reduce se implement ho sakte hain. Custom HOFs likhna — decorators, middleware, memoization."
          whenToUse={[
            'Array transform karna — map',
            'Array filter karna — filter',
            'Array ko single value mein reduce karna — reduce',
            'Custom behavior inject karna — callback pattern',
          ]}
          whyUseIt="HOFs imperative loops ko declarative expressions mein convert karte hain — intent clear hota hai. Chaining se complex operations readable pipeline mein likhte hain. reduce se koi bhi array operation implement ho sakti hai — grouping, flattening, object building, sab kuch."
          howToUse={{
            filename: 'hof.js',
            language: 'javascript',
            code: `const users = [
  { name: 'Rahul', age: 25, role: 'admin', salary: 80000 },
  { name: 'Priya', age: 30, role: 'user', salary: 60000 },
  { name: 'Amit', age: 22, role: 'admin', salary: 90000 },
  { name: 'Sneha', age: 28, role: 'user', salary: 70000 },
]

// map — transform each element
const names = users.map(u => u.name)
// ['Rahul', 'Priya', 'Amit', 'Sneha']

// filter — subset
const admins = users.filter(u => u.role === 'admin')
// [{ name: 'Rahul'... }, { name: 'Amit'... }]

// reduce — the universal array operation
const totalSalary = users.reduce((sum, u) => sum + u.salary, 0)
// 300000

// reduce se groupBy:
const byRole = users.reduce((groups, user) => {
  const key = user.role
  return {
    ...groups,
    [key]: [...(groups[key] ?? []), user],
  }
}, {})
// { admin: [...], user: [...] }

// reduce se map implement karo:
function myMap(arr, fn) {
  return arr.reduce((acc, item) => [...acc, fn(item)], [])
}

// reduce se filter implement karo:
function myFilter(arr, predicate) {
  return arr.reduce((acc, item) => predicate(item) ? [...acc, item] : acc, [])
}

// Chain karo:
const adminNames = users
  .filter(u => u.role === 'admin')
  .map(u => u.name.toUpperCase())
  .sort()
// ['AMIT', 'RAHUL']

// Custom HOF — retry logic
function withRetry(asyncFn, maxRetries = 3) {
  return async function(...args) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await asyncFn(...args)
      } catch (err) {
        if (attempt === maxRetries) throw err
        console.log(\`Attempt \${attempt} failed, retrying...\`)
        await new Promise(r => setTimeout(r, attempt * 1000))
      }
    }
  }
}

const fetchWithRetry = withRetry(fetch, 3)
const data = await fetchWithRetry('/api/data')  // Auto-retry on failure`,
            explanation: 'map transform, filter subset, reduce sab kuch. Chaining readable pipeline banati hai. Custom HOFs cross-cutting concerns inject karte hain — logging, retry, caching bina original function change kiye. reduce most powerful tool hai — koi bhi array transformation possible.',
          }}
          realWorldScenario="E-commerce cart: const total = items.reduce((sum, item) => sum + item.price * item.qty, 0). Discount apply: const discounted = items.map(item => ({ ...item, price: item.price * 0.9 })). Out of stock remove: items.filter(item => item.stock > 0). Chain karo sab."
          commonMistakes={[
            {
              mistake: 'reduce mein initial value bhoolna',
              why: 'Empty array pe reduce without initial value — TypeError. Ek element pe pehla element return hoga bina callback ke.',
              fix: 'Hamesha initial value do: reduce((acc, x) => ..., 0) ya reduce((acc, x) => ..., [])',
            },
            {
              mistake: 'map mein forEach ka kaam karna — side effects daalna',
              why: 'map transform ke liye hai, side effects ke liye nahi. map se API call karna confusing aur unpredictable.',
              fix: 'Side effects ke liye forEach ya for...of. map sirf new array return karne ke liye.',
            },
          ]}
          proTip="flatMap() map + flat ek saath karta hai — nested arrays flatten karo aur transform karo ek step mein. users.flatMap(u => u.posts) — har user ke posts ek flat array mein. Array.from({ length: 5 }, (_, i) => i) — range create karo. Ye patterns production code mein bahut common hain."
        />
      </div>

      <div id="composition">
        <ConceptCard
          title="Function Composition & Pipe"
          emoji="🔗"
          difficulty="intermediate"
          whatIsIt="Function composition — do ya zyada functions ko chain karo taaki ek ka output doosre ka input ho. compose(f, g)(x) === f(g(x)) — right to left. pipe(f, g)(x) === g(f(x)) — left to right (more readable). Complex operations simple pure functions se build karo."
          whenToUse={[
            'Data pipeline — steps clearly define karne ho',
            'Multiple transformations ek ke baad ek apply karne ho',
            'Code reusability — small functions compose karke complex behavior',
            'Point-free style — function arguments explicitly mention nahi karne',
          ]}
          whyUseIt="Composition small, pure, single-responsibility functions ko combine karta hai. Readable data flow — pipe se left to right, natural reading order. Each step independently testable. Adding/removing steps easy — just add/remove from pipeline. Unix pipe concept ka JS implementation."
          howToUse={{
            filename: 'composition.js',
            language: 'javascript',
            code: `// ── COMPOSE — right to left ──────────────────────────────────────
const compose = (...fns) => x => fns.reduceRight((v, fn) => fn(v), x)

const double = x => x * 2
const increment = x => x + 1
const square = x => x * x

const transform = compose(square, increment, double)
transform(3)  // square(increment(double(3))) = square(increment(6)) = square(7) = 49

// ── PIPE — left to right (more readable) ─────────────────────────
const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x)

const processNumber = pipe(
  double,      // 3 → 6
  increment,   // 6 → 7
  square,      // 7 → 49
)
processNumber(3)  // 49 — same result, more readable!

// ── REAL WORLD — User data pipeline ──────────────────────────────
const trim = s => s.trim()
const toLowerCase = s => s.toLowerCase()
const removeSpaces = s => s.replace(/\s+/g, '-')
const truncate = max => s => s.slice(0, max)

// Slug banana
const createSlug = pipe(
  trim,
  toLowerCase,
  removeSpaces,
  truncate(50),
)

createSlug('  Hello World From India  ')  // 'hello-world-from-india'

// User object process karo
const sanitizeName = s => s.trim()
const capitalizeFirst = s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
const formatName = pipe(sanitizeName, capitalizeFirst)

const processUser = user => ({
  ...user,
  name: formatName(user.name),
  email: user.email.toLowerCase().trim(),
  slug: createSlug(user.name),
})

// ── ASYNC PIPE ────────────────────────────────────────────────────
const pipeAsync = (...fns) => x => fns.reduce(
  (promise, fn) => promise.then(fn),
  Promise.resolve(x)
)

const processOrder = pipeAsync(
  validateOrder,      // async: throw if invalid
  calculatePricing,   // async: add taxes, discounts
  processPayment,     // async: charge card
  sendConfirmation,   // async: email user
)

await processOrder(orderData)

// ── POINT-FREE STYLE ─────────────────────────────────────────────
// With explicit args:
const getUserNames = users => users.map(user => user.name)

// Point-free:
const getName = user => user.name
const getUserNamesPointFree = users => users.map(getName)
// ya:
const mapName = map(getName)  // Curried map required
const getUserNamesPF = mapName(users)`,
            explanation: 'pipe left-to-right hai — data flow reading direction mein. compose right-to-left mathematical convention follow karta hai. pipeAsync Promise chain banata hai. Point-free style function arguments hide karta hai — zyada declarative. Small pure functions compose karke complex pipelines bano.',
          }}
          realWorldScenario="Data import pipeline: pipe(parseCSV, validateRows, transformToSchema, deduplicateByEmail, saveToDatabase). Har step alag function — independent testing possible. Step add karna? Pipe mein insert karo. Step skip karna? Remove karo. Clean aur flexible."
          commonMistakes={[
            {
              mistake: 'Composition mein type mismatches',
              why: 'Ek function string return kare, agla number expect kare — runtime error ya NaN.',
              fix: 'TypeScript use karo types ensure karne ke liye. Ya unit test each step independently.',
            },
            {
              mistake: 'Bahut granular functions — single character operations',
              why: 'Unnecessary over-abstraction — readability kam, debugging mushkil.',
              fix: 'Meaningful abstractions banana — har function ek complete, useful transformation kare.',
            },
          ]}
          proTip="Ramda.js aur fp-ts curried utilities provide karte hain — R.pipe, R.compose, auto-curried map/filter/reduce. fp-ts TypeScript ke saath FP ekdum professional level pe le jaata hai. Sirf kaam se seekho — RxJS bhi pipe operator use karta hai same concept ke saath."
        />
      </div>

      <div id="currying">
        <ConceptCard
          title="Currying — Partial Application Ka Magic"
          emoji="🍛"
          difficulty="intermediate"
          whatIsIt="Currying ek multi-argument function ko single-argument functions ki chain mein convert karta hai. add(2, 3) se add(2)(3). Partial application — kuch arguments pehle fix karo, baaki baad mein. Reusable, specialized functions banao. JavaScript mein manually ya Ramda/lodash se auto-curry."
          whenToUse={[
            'Partially apply karna — kuch args fix karo, function reuse karo',
            'Point-free style mein — composition ke saath',
            'Event handlers mein — extra context inject karna',
            'Configuration-first APIs banana',
          ]}
          whyUseIt="Currying se specialized functions easily create hoti hain — add5 = add(5), double = multiply(2). Composition ke saath powerful — pipe(add(1), multiply(2)) — point-free. DRY principle — common logic share karo different configurations ke saath."
          howToUse={{
            filename: 'currying.js',
            language: 'javascript',
            code: `// Basic currying — manually
function add(a) {
  return function(b) {
    return a + b
  }
}
// Arrow version:
const add = a => b => a + b

add(2)(3)   // 5
const add5 = add(5)  // Partial application
add5(3)     // 8
add5(10)    // 15

// ── AUTO CURRY ────────────────────────────────────────────────────
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs))
    }
  }
}

const multiply = curry((a, b) => a * b)
multiply(2, 3)   // 6 — normal call
multiply(2)(3)   // 6 — curried call
const double = multiply(2)  // Partial application
double(5)        // 10
double(100)      // 200

// ── REAL WORLD EXAMPLES ───────────────────────────────────────────

// Logger with level
const log = level => message => console.log(\`[\${level.toUpperCase()}] \${message}\`)
const info = log('info')
const warn = log('warn')
const error = log('error')

info('Server started')   // [INFO] Server started
warn('Memory high')      // [WARN] Memory high
error('DB connection failed')  // [ERROR] DB connection failed

// Filter with curried predicate
const hasRole = role => user => user.role === role
const isAdmin = hasRole('admin')
const isUser = hasRole('user')

users.filter(isAdmin)   // Only admins
users.filter(isUser)    // Only users

// API calls with base URL
const makeRequest = method => baseUrl => endpoint => body =>
  fetch(baseUrl + endpoint, { method, body: JSON.stringify(body) })

const post = makeRequest('POST')
const apiPost = post('https://api.example.com')
const createUser = apiPost('/users')
const createPost = apiPost('/posts')

await createUser({ name: 'Rahul' })
await createPost({ title: 'Hello' })

// ── EVENT HANDLER WITH DATA ───────────────────────────────────────
// Without currying — closure
items.map(item => (
  <button onClick={() => handleDelete(item.id)}>Delete</button>
))

// With currying — cleaner
const handleDelete = id => () => deleteItem(id)
items.map(item => (
  <button onClick={handleDelete(item.id)}>Delete</button>
))`,
            explanation: 'Currying a => b => a + b — ek argument lega, function return karega jo baaki lega. Partial application specific, reusable functions banata hai. Auto-curry utility multi-arg functions curried banata hai. Real world: loggers, API builders, event handlers — configuration-first pattern.',
          }}
          realWorldScenario="React mein: const handleFieldChange = field => value => setFormData(prev => ({ ...prev, [field]: value })). Ab: <input onChange={handleFieldChange('email')} />. Clean, no anonymous functions cluttering JSX. Same handler multiple fields ke liye."
          commonMistakes={[
            {
              mistake: 'Sab kuch curry karna',
              why: 'Over-engineering — simple 2-arg functions ke liye currying overkill aur confusing.',
              fix: 'Currying jab partial application genuinely useful ho. Composition ke saath ya multiple places pe partial use ho.',
            },
            {
              mistake: 'Arrow function return expression bhoolna',
              why: 'a => b => { a + b } — return nahi hai! { } block hai, expression nahi.',
              fix: 'a => b => a + b — implicit return. Ya: a => b => { return a + b }',
            },
          ]}
          proTip="Ramda.js har function auto-curried deta hai — R.map, R.filter, R.reduce sab curried. const admins = R.filter(R.propEq('role', 'admin')). R.pipe ke saath compose karo point-free style mein. Lodash/fp bhi curried utilities provide karta hai."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 14 Quiz — Functional Programming
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — FP philosophy samjho!
          </p>
        </div>
        <QuizSection questions={fpQuiz} chapterSlug="functional-programming" />
      </div>
    </div>
  )
}
