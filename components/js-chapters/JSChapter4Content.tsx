'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const quizQuestions = [
  {
    question: 'Arrow function aur regular function mein this binding ka kya farq hai?',
    options: [
      { text: 'Koi farq nahi — dono same this use karte hain', correct: false, explanation: 'Bahut important farq hai! Ye common interview question hai.' },
      { text: 'Arrow function apna this nahi banata — enclosing scope ka this use karta hai', correct: true, explanation: 'Bilkul sahi! Arrow functions ka lexical this hota hai — surrounding context ka this inherit karta hai.' },
      { text: 'Regular function ka this hamesha window hota hai', correct: false, explanation: 'Strict mode mein regular function ka this undefined hota hai, sloppy mode mein window.' },
      { text: 'Arrow function mein this keyword available hi nahi', correct: false, explanation: 'Arrow function mein this available hai — bas woh enclosing scope ka this hota hai.' },
    ],
  },
  {
    question: 'Function hoisting kaise kaam karta hai?',
    options: [
      { text: 'Sirf function declarations hoist hoti hain — completely usable before declaration', correct: true, explanation: 'Sahi! Function declarations hoist hoti hain — puri body ke saath. Function expressions aur arrow functions nahi hoist hote.' },
      { text: 'Sab functions hoist hote hain', correct: false, explanation: 'Nahi — sirf function declarations. const/let arrow functions TDZ mein hoti hain.' },
      { text: 'Koi function hoist nahi hota', correct: false, explanation: 'Function declarations hoist hoti hain — ye JS ki important feature hai.' },
      { text: 'var se define function expressions hoist hoti hain fully', correct: false, explanation: 'var se defined function expression: variable hoist hota hai as undefined, function body nahi.' },
    ],
  },
  {
    question: 'Higher-order function kya hota hai?',
    options: [
      { text: 'Woh function jo bahut complex logic karta hai', correct: false, explanation: 'Complexity se koi lena dena nahi — HOF ki definition alag hai.' },
      { text: 'Woh function jo dusri function ko argument mein leta hai ya return karta hai', correct: true, explanation: 'Sahi! HOF functions ko first-class citizens ki tarah treat karta hai — map, filter, reduce sab HOFs hain.' },
      { text: 'Woh function jo class ke andar define hota hai', correct: false, explanation: 'Class methods HOF nahi hote automatically — HOF ka definition alag hai.' },
      { text: 'Async function hamesha HOF hoti hai', correct: false, explanation: 'Async functions HOF nahi hain necessarily — definition function accept/return karna hai.' },
    ],
  },
  {
    question: 'Pure function ki kya property hoti hai?',
    options: [
      { text: 'Woh hamesha fast execute hoti hai', correct: false, explanation: 'Speed se koi definition nahi banti — pure function ki definition different hai.' },
      { text: 'Same input pe hamesha same output aur koi side effects nahi', correct: true, explanation: 'Bilkul! Pure functions predictable, testable, aur cacheable hoti hain — functional programming ka foundation.' },
      { text: 'Woh koi argument nahi leta', correct: false, explanation: 'Pure functions arguments le sakti hain — bas same input = same output guarantee.' },
      { text: 'Woh sirf numbers ke saath kaam karta hai', correct: false, explanation: 'Pure functions kisi bhi type ke saath kaam kar sakti hain — strings, objects, arrays sab.' },
    ],
  },
  {
    question: 'Rest parameters (...args) kya karta hai?',
    options: [
      { text: 'Function ko slow karta hai', correct: false, explanation: 'Performance pe negligible impact — rest params syntax convenience hai.' },
      { text: 'Remaining arguments ko ek array mein collect karta hai', correct: true, explanation: 'Sahi! ...args function ki last parameter ke baad sare arguments ko array mein pack karta hai.' },
      { text: 'Arguments object ki tarah same hai', correct: false, explanation: 'Arguments object array-like hai lekin real array nahi — rest params actual array hain with all array methods.' },
      { text: 'Sirf 3 arguments tak kaam karta hai', correct: false, explanation: 'Rest params unlimited arguments handle kar sakte hain.' },
    ],
  },
]

// ── Main Component ────────────────────────────────────────────────────────────

export default function JSChapter4Content() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div
        id="intro"
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3">
          Functions — Har Function Call Ek Naya Execution Context Banata Hai!
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ruko yaar — <strong className="text-[#F5F5F7]">functions sirf code reuse nahi hain</strong>. JavaScript mein har function call ek naya Execution Context banata hai — apna Memory Component, apna Code Execution Phase, Call Stack pe push hota hai. Jab function return karta hai, woh Context pop ho jaata hai. Yahi closures ka raaz bhi hai — function ka Execution Context hata lekin uska memory kuch cheezein yaad rakhta hai! Functions first-class citizens hain — variable mein rakho, pass karo, return karo. Ye hi functional programming ka dil hai.
        </p>
        <div
          className="rounded-xl p-4 mt-4"
          style={{ background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.2)' }}
        >
          <p className="text-sm text-[#A1A1AA]">
            <span className="text-[#06B6D4] font-semibold">Is chapter mein:</span> Function declarations vs expressions vs arrows; default, rest, destructured params; higher-order functions; IIFE; pure vs impure functions — closures ka introduction bhi yahan hoga!
          </p>
        </div>
      </div>

      {/* Akshay-style insight box */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}
      >
        <p className="text-sm font-bold text-[#F59E0B] mb-1">Execution Context Mein Functions — Shocking Insight</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <strong className="text-[#F5F5F7]">Ye dikhao kisi ko</strong> — ye code valid hai JavaScript mein:
          <br/><code className="text-[#06B6D4]">greet(&apos;Rahul&apos;)  // works! Before declaration</code><br/>
          <code className="text-[#06B6D4]">function greet(name) {'{'} return &apos;Hi &apos; + name {'}'}</code><br/>
          <strong className="text-[#F5F5F7]">Kyun kaam karta hai?</strong> Memory Creation Phase mein JS ne pehle se function declaration ko poori body ke saath store kar liya — ye hoisting hai! Lekin const/let arrow functions ke saath yahi nahi hota — woh TDZ mein hote hain.
        </p>
      </div>

      {/* Card 1: Declaration vs Expression vs Arrow */}
      <div id="function-types">
        <ConceptCard
          title="Declaration vs Expression vs Arrow — Execution Context Ka Fark"
          emoji="📝"
          difficulty="beginner"
          whatIsIt="JavaScript mein functions teen tarike se likhe jaate hain. Function Declaration: function greet() {} — Memory Creation Phase mein puri body hoist hoti hai, anywhere call kar sakte ho. Function Expression: const greet = function() {} — let/const ke saath TDZ mein hota hai. Arrow Function: const greet = () => {} — concise syntax, apna this nahi hota (lexical this — enclosing context ka this use karta hai). Teeno mein key differences hain jo real-world mein matter karte hain!"
          whenToUse={[
            'Declaration: utility functions, named functions jo file mein anywhere use ho sakti hain',
            'Expression: conditional function assignment, callbacks, ek hi jagah use karna hai',
            'Arrow: callbacks, array methods (map/filter), React components, lexical this chahiye',
            'Arrow AVOID: object methods, constructors, event handlers jahan dynamic this chahiye',
          ]}
          whyUseIt="Arrow functions callbacks ke liye perfect hain kyunki this parent context ka hota hai — class mein method ke andar setTimeout(() => this.update(), 1000) kaam karta hai. Regular functions object methods ke liye better hain kyunki this dynamically bound hota hai. Ye samajhna runtime errors se bachata hai."
          howToUse={{
            filename: 'function-types.js',
            language: 'javascript',
            code: `// 1. Function Declaration — hoisted!
greet('Rahul')  // Works before declaration!
function greet(name) {
  return \`Hello, \${name}!\`
}

// 2. Function Expression — not hoisted
const double = function(n) {
  return n * 2
}
// double(5) before this line = ReferenceError

// 3. Arrow Function — concise, lexical this
const triple = (n) => n * 3
const add = (a, b) => a + b
const makeUser = (name) => ({ name, createdAt: new Date() })  // Object return — wrap in ()

// this binding difference
class Timer {
  constructor() {
    this.seconds = 0
  }

  startRegular() {
    // ❌ Regular function — this is undefined in strict mode
    setInterval(function() {
      // this.seconds++  // ERROR! this !== Timer instance
    }, 1000)
  }

  startArrow() {
    // ✅ Arrow function — lexical this from Timer
    setInterval(() => {
      this.seconds++  // Works! this === Timer instance
      console.log(this.seconds)
    }, 1000)
  }
}

// Hoisting visual:
console.log(typeof declaration)  // 'function' — hoisted!
console.log(typeof expression)   // 'undefined' — var hoisted as undefined
console.log(typeof arrowFn)      // ReferenceError — let in TDZ

function declaration() {}
var expression = function() {}
const arrowFn = () => {}`,
            explanation: 'Function declarations hoist hoti hain puri body ke saath. var function expressions undefined ki jagah hoist hoti hain. Arrow functions this lexically bind karte hain — class methods aur callbacks ke liye perfect. this binding difference hi most common JS confusion ka source hai.',
          }}
          realWorldScenario="React components almost always arrow functions hain. Event handlers class components mein arrows use karte hain this issue se bachne ke liye. Express route handlers regular ya arrow functions dono kaam karte hain. Node.js utility modules mein function declarations common hain — anywhere use kar sakte ho file mein."
          commonMistakes={[
            {
              mistake: 'Arrow function ko object method ke liye use karna',
              why: "const obj = { name: 'Rahul', greet: () => this.name } — this obj nahi hoga! Arrow lexical this leta hai — likely undefined ya window.",
              fix: 'Object methods ke liye regular function syntax: { greet() { return this.name } } ya { greet: function() { return this.name } }.',
            },
            {
              mistake: 'Arrow function ko constructor ke liye use karna',
              why: 'const Person = (name) => { this.name = name }; new Person("Rahul") — TypeError! Arrow functions constructors nahi ban sakte.',
              fix: 'Constructor ke liye regular function ya class syntax use karo.',
            },
          ]}
          proTip="Arrow function ek argument ke saath parentheses optional hain: const double = n => n * 2. Object return karte waqt parentheses required hain: const obj = () => ({ key: 'value' }). Bina parens ke {} block samjha jaata hai, object nahi."
          demo={
            <DiffBlock
              title="Arrow vs Regular — this Binding Trap"
              language="javascript"
              bad={{
                code: `class Counter {
  constructor() { this.count = 0 }

  start() {
    // Regular function — this is LOST!
    setInterval(function() {
      this.count++  // undefined.count — crash!
      console.log(this.count)
    }, 1000)
  }
}`,
                label: 'Galat — Regular Function in Callback',
                explanation: 'this context lost ho jaata hai — runtime error',
              }}
              good={{
                code: `class Counter {
  constructor() { this.count = 0 }

  start() {
    // Arrow function — lexical this!
    setInterval(() => {
      this.count++  // Counter instance ka this
      console.log(this.count)  // 1, 2, 3...
    }, 1000)
  }
}`,
                label: 'Sahi — Arrow Function Preserves this',
                explanation: 'Arrow function enclosing scope (Counter) ka this use karta hai',
              }}
            />
          }
        />
      </div>

      {/* Card 2: Parameters */}
      <div id="parameters">
        <ConceptCard
          title="Parameters — Default, Rest &amp; Destructured — Modern JS Ka Power"
          emoji="🎛️"
          difficulty="beginner"
          whatIsIt="Modern JavaScript mein parameters bahut flexible hain. Default parameters: function greet(name = 'Guest') — argument miss hone par default use hota hai, no more value || 'default' pattern! Rest parameters: function sum(...nums) — remaining args ek real array mein collect hote hain (arguments object se better!). Destructured parameters: function process({'{'} id, name {'}'}) — object ya array seedha parameter mein destructure — named arguments ki tarah readable!"
          whenToUse={[
            'Default params: optional arguments ke liye — config functions, utility functions',
            'Rest params: variable number of arguments — Math.max jaisi functions, event emitters',
            'Destructured params: object ya array pass karne ke liye — readable named arguments',
            'Options object pattern: function init(options = {}) — extensible APIs ke liye',
          ]}
          whyUseIt="Default parameters null checks eliminate karte hain — const name = param || 'default' ki zaroorat nahi. Rest params arguments object se better hain — actual array hai, all array methods available. Destructured params function signature self-documenting banate hain — caller ko pata chalta hai kya pass karna hai."
          howToUse={{
            filename: 'parameters.js',
            language: 'javascript',
            code: `// Default parameters
function createUser(
  name,
  role = 'user',
  isActive = true,
  permissions = []
) {
  return { name, role, isActive, permissions }
}
createUser('Rahul')            // role: 'user', isActive: true
createUser('Admin', 'admin')   // role: 'admin', isActive: true

// Default with expression
function getTimestamp(date = new Date()) {
  return date.toISOString()
}

// Rest parameters — unlimited args
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0)
}
sum(1, 2, 3, 4, 5)  // 15
sum(10, 20)          // 30

// Mixed — regular + rest
function log(level, ...messages) {
  console.log(\`[\${level.toUpperCase()}]\`, ...messages)
}
log('error', 'File not found', 'Path:', '/etc/config')

// Destructured object params
function processOrder({ id, items, discount = 0, user: { name } }) {
  const total = items.reduce((sum, item) => sum + item.price, 0)
  return {
    orderId: id,
    customer: name,
    total: total * (1 - discount),
  }
}

// Destructured array params
function getFirstTwo([first, second, ...rest]) {
  return { first, second, remaining: rest.length }
}
getFirstTwo([1, 2, 3, 4, 5])  // { first: 1, second: 2, remaining: 3 }`,
            explanation: 'Default params pehle evaluate hote hain function call ke waqt — default expression side effects produce kar sakta hai (new Date()). Rest params last parameter hona chahiye. Destructured params deeply nested objects ko readable banate hain.',
          }}
          realWorldScenario="Express route handler: function handler(req, res, next = defaultMiddleware) {}. Database query builder: function query(table, { where = {}, limit = 10, offset = 0, orderBy = 'id' } = {}) {}. Yahan destructuring se default config bahut readable ho jaata hai — callers sirf jo chahiye woh pass karte hain."
          commonMistakes={[
            {
              mistake: 'Default parameter mein mutable object — function({ list = [] })',
              why: 'Default [] ek reference hai — agar mutate karo toh... actually yahan safe hai kyunki har call naya default evaluate karta hai.',
              fix: 'Function parameters mein defaults safe hain. Problem tab hoti hai jab default value object/array outer scope se aaye.',
            },
            {
              mistake: 'Rest params ko middle mein rakhna — function(a, ...b, c)',
              why: 'SyntaxError! Rest params sirf last position par aa sakte hain.',
              fix: 'Rest params hamesha last: function(first, second, ...rest).',
            },
          ]}
          proTip="Options object pattern: function init({ host = 'localhost', port = 3000, debug = false } = {}) {}. Last = {} ensure karta hai ki bina argument ke bhi call ho sake — very common in library APIs. Named parameters ki tarah readable hota hai!"
        />
      </div>

      {/* Akshay-style insight box */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)' }}
      >
        <p className="text-sm font-bold text-[#10B981] mb-1">Closures Are Functions That Remember — Ye Phrase Yaad Rakho</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <strong className="text-[#F5F5F7]">Ab sawaal ye aata hai</strong> — function return ho jaata hai, uska Execution Context Call Stack se hat jaata hai, phir bhi woh outer variables kaise yaad rakhta hai? Ye closures hain! Function ka inner scope outer scope ka memory access rakhta hai, chahe outer function khatam ho gaya ho. Yahi HOFs aur factory functions ka magic hai — har returned function apna closure banata hai.
        </p>
      </div>

      {/* Card 3: Higher-Order Functions */}
      <div id="higher-order">
        <ConceptCard
          title="Higher-Order Functions — Functions Jo Functions Lete Aur Dete Hain"
          emoji="🏗️"
          difficulty="beginner"
          whatIsIt="Higher-Order Functions (HOF) woh functions hain jo ya toh dusri function ko argument mein lete hain, ya function return karte hain, ya dono. JavaScript mein functions first-class citizens hain — variables mein store ho sakte hain, arguments ban sakte hain, return ho sakte hain. map, filter, reduce, setTimeout, addEventListener — sab HOFs hain. Closures are functions that remember — returned function apne outer scope ko yaad rakhta hai. Ye functional programming ka dil hai!"
          whenToUse={[
            'Behavior ko parameterize karna — ek function alag alag logic ke saath reuse karna',
            'Callbacks: async operations ke results handle karna',
            'Function factories: ek function jo specific configuration ke saath nayi function banaye',
            'Decorators/middleware: existing function ko wrap karke functionality add karna',
          ]}
          whyUseIt="HOFs code duplication drastically reduce karte hain. Closures ke saath milke powerful patterns banate hain — memoization, currying, partial application. Express middleware, React hooks, lodash utility functions — sab HOF patterns use karte hain. Ye samajhna advanced JavaScript mastery ki key hai."
          howToUse={{
            filename: 'higher-order.js',
            language: 'javascript',
            code: `// Functions as arguments — classic HOF
function applyTwice(fn, value) {
  return fn(fn(value))
}
const double = (n) => n * 2
applyTwice(double, 5)  // 20

// Functions as return values — function factory
function multiplier(factor) {
  return (number) => number * factor  // closure!
}
const triple = multiplier(3)
const tenX = multiplier(10)
triple(5)  // 15
tenX(7)    // 70

// Practical: memoization — cache expensive results
function memoize(fn) {
  const cache = new Map()
  return function(...args) {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      console.log('Cache hit!')
      return cache.get(key)
    }
    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

const expensiveCalc = (n) => {
  console.log('Computing...')
  return n * n * n
}
const cachedCalc = memoize(expensiveCalc)
cachedCalc(10)  // Computing... 1000
cachedCalc(10)  // Cache hit! 1000

// Middleware pattern (like Express)
function withLogging(fn) {
  return function(...args) {
    console.log(\`Calling \${fn.name} with\`, args)
    const result = fn(...args)
    console.log(\`Result:\`, result)
    return result
  }
}
const loggedDouble = withLogging(double)
loggedDouble(5)  // Logs call and result

// Curry — one arg at a time
const curry = (fn) => {
  const arity = fn.length
  return function curried(...args) {
    if (args.length >= arity) return fn(...args)
    return (...moreArgs) => curried(...args, ...moreArgs)
  }
}
const add = (a, b, c) => a + b + c
const curriedAdd = curry(add)
curriedAdd(1)(2)(3)  // 6
curriedAdd(1, 2)(3)  // 6`,
            explanation: 'Multiplier function factory ek closure banata hai jahan factor captured rehta hai. Memoize HOF kisi bhi function ko cache karne wali version mein convert karta hai. withLogging bina original function modify kiye logging add karta hai. Ye patterns composable, testable code banate hain.',
          }}
          realWorldScenario="Express.js mein: app.use(authMiddleware) ek HOF pattern hai. React mein: useState, useEffect hooks HOF hain. Lodash/Ramda: _.debounce(fn, 300) ek HOF hai jo function ko wrap karta hai. Database layer mein: withTransaction(fn) ensure karta hai ki fn ek transaction ke andar chale."
          commonMistakes={[
            {
              mistake: 'HOF mein this context lost karna',
              why: 'function wrapper ke andar this bind nahi hota — class methods wrap karte waqt issue hota hai.',
              fix: 'Arrow function use karo wrapper mein, ya .bind(this), ya Function.prototype.apply.',
            },
            {
              mistake: 'Memory leaks in memoization — unbounded cache',
              why: 'Cache Map hamesha grow karta rehta hai agar entries remove na ho — large-scale apps mein memory issue.',
              fix: 'LRU cache implement karo ya max size set karo. Npm mein lru-cache popular hai.',
            },
          ]}
          proTip="Currying aur partial application powerful patterns hain — ek function ko gradually arguments do. const addTax = curriedAdd(0.18) — ye partially applied function tax calculator ban jaata hai. Functional composition ke saath milake incredibly expressive code likha ja sakta hai."
        />
      </div>

      {/* Card 4: IIFE */}
      <div id="iife">
        <ConceptCard
          title="IIFE — Define Karo, Turant Chalao!"
          emoji="⚡"
          difficulty="beginner"
          whatIsIt="IIFE (pronounced 'iffy') ek function hai jo define hote hi immediately call ho jaata hai — (function() {'{'} /* code */ {'}'})() . Ye global scope ko pollute karne se bachata hai aur private scope banata hai. Pehle yaar, ES modules se pehle yahi modules ka kaam karta tha! Aaj bhi async initialization ke liye bahut useful hai — jab top-level await available na ho."
          whenToUse={[
            'Initialization code jo ek baar run hona chahiye aur global scope expose nahi karna',
            'Async initialization: (async () => { await setup(); })() — top-level await alternative',
            'Legacy code mein private scope banana — ES modules se pehle ka pattern',
            'Configuration setup jo immediately execute honi chahiye',
          ]}
          whyUseIt="IIFE variables ko global scope se isolate karta hai — koi naming conflicts nahi. Immediately execute hota hai — initialization ke liye perfect. async IIFE top-level await ke alternative ke roop mein use hota hai jab module context available na ho. Aaj bhi Node.js scripts aur configuration files mein commonly seen hai."
          howToUse={{
            filename: 'iife.js',
            language: 'javascript',
            code: `// Basic IIFE
(function() {
  const secret = 'yahan koi access nahi kar sakta'
  console.log('IIFE executed!')
})()

// Arrow IIFE
(() => {
  const localVar = 'isolated scope mein'
  console.log(localVar)
})()

// IIFE with return value
const config = (() => {
  const env = process.env.NODE_ENV || 'development'
  const isDev = env === 'development'
  return {
    apiUrl: isDev ? 'http://localhost:3000' : 'https://api.prod.com',
    debug: isDev,
    timeout: isDev ? 30000 : 5000,
  }
})()
console.log(config.apiUrl)  // Based on NODE_ENV

// Async IIFE — jab top-level await nahi hai
;(async () => {
  try {
    const data = await fetch('/api/init')
    const json = await data.json()
    console.log('Init done:', json)
  } catch (err) {
    console.error('Init failed:', err)
  }
})()

// IIFE for counter — private state
const counter = (() => {
  let count = 0  // private!
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  }
})()
counter.increment()  // 1
counter.increment()  // 2
counter.value()      // 2
// count  // ReferenceError — private hai!`,
            explanation: 'IIFE immediately execute hota hai aur scope isolate karta hai. Return value se public API expose kar sakte ho — revealing module pattern. Async IIFE async initialization ke liye useful hai. Semicolon ; se shuru karna best practice hai chaining issues se bachne ke liye.',
          }}
          realWorldScenario="Node.js configuration setup: environment detect karo, secrets load karo, config object return karo — sab IIFE mein. Browser mein: analytics scripts, polyfills, widget initialization IIFE use karte hain taaki kisi existing code ko break na karein. Jest test setup files mein async IIFE common hai."
          commonMistakes={[
            {
              mistake: 'IIFE ke pehle semicolon nahi lagana',
              why: 'Agar previous line bina semicolon ke khatam hoto (function call jaisi), toh IIFE concatenated ho sakta hai — unexpected behavior.',
              fix: ';(function() {...})() — leading semicolon defensive programming hai. Ya hamesha semicolons use karo.',
            },
            {
              mistake: 'Modern code mein har jagah IIFE use karna',
              why: 'ES modules (import/export) already module scope provide karte hain — IIFE ki zaroorat kam ho gayi hai.',
              fix: 'ES modules prefer karo modern code mein. IIFE async initialization aur specific legacy patterns ke liye rakh lo.',
            },
          ]}
          proTip="Top-level await ES2022+ mein available hai ES modules mein — async IIFE ki zaroorat kam ho gayi hai. Lekin CommonJS (.js Node.js files bina 'type: module') mein async IIFE valuable hai: ;(async () => { await initialize(); })();"
        />
      </div>

      {/* Akshay-style insight box */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(236,72,153,0.07)', border: '1px solid rgba(236,72,153,0.2)' }}
      >
        <p className="text-sm font-bold text-[#EC4899] mb-1">Pure Functions — Testability Ka Gold Standard</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <strong className="text-[#F5F5F7]">Purity test karo</strong> — kya function ko test karne ke liye kuch setup karna padega? Database, environment variables, mock files? Agar haan — impure hai. Pure functions directly call karo, result check karo — no setup, no teardown. Redux reducers isliye pure hain: <code className="text-[#06B6D4]">(state, action) =&gt; newState</code>. Same input, hamesha same output. Testing trivial ho jaati hai!
        </p>
      </div>

      {/* Card 5: Pure vs Impure */}
      <div id="pure-functions">
        <ConceptCard
          title="Pure vs Impure Functions — Predictability Ka Raaz"
          emoji="✨"
          difficulty="beginner"
          whatIsIt="Pure function: same input hamesha same output deta hai, koi side effects nahi — ye science hai, magic nahi. Impure function: external state pe depend karta hai ya modify karta hai — console.log, HTTP calls, database writes, Date.now(). Pure functions predictable, testable, aur cacheable hoti hain. Real apps mein dono chahiye — trick hai unhe separate karna. Pure core, impure shell — yahi clean architecture ka basis hai!"
          whenToUse={[
            'Pure: data transformations, calculations, validations — maximally testable',
            'Pure: utility functions — string formatting, number rounding, object mapping',
            'Impure (intentional): I/O operations, database, API calls, logging',
            'Pattern: pure core, impure shell — side effects ko edges par rakhna',
          ]}
          whyUseIt="Pure functions unit test karna trivially easy hai — no mocks needed. Memoize kar sakte ho safely. Concurrent execution mein race conditions nahi. React ka state update, Redux reducers — sab pure functions pe based hain. Impure functions zaroor chahiye lekin unhe isolate karo — pure core, impure shell architecture."
          howToUse={{
            filename: 'pure-impure.js',
            language: 'javascript',
            code: `// ✅ Pure functions
const add = (a, b) => a + b
const double = (arr) => arr.map(x => x * 2)  // new array, original unchanged
const formatName = (first, last) => \`\${first} \${last}\`
const calculateTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)

// Same input = same output, no side effects
add(2, 3)  // Always 5
double([1, 2, 3])  // Always [2, 4, 6], original unchanged

// ❌ Impure functions
let globalCount = 0
const impureIncrement = () => globalCount++  // modifies external state

const getTimestamp = () => Date.now()  // different output each time

const fetchUser = async (id) => {      // I/O operation
  const res = await fetch(\`/users/\${id}\`)
  return res.json()
}

// ✅ Separating concerns — pure core, impure shell
// Pure calculation logic
const calculateCartTotal = (items, discount = 0) => {
  const subtotal = items.reduce((sum, item) =>
    sum + item.price * item.quantity, 0)
  return subtotal * (1 - discount)
}

// Impure orchestration
async function processCart(userId) {
  // Impure: fetch from DB
  const cart = await db.getCart(userId)
  const user = await db.getUser(userId)

  // Pure: calculate
  const discount = user.isPremium ? 0.1 : 0
  const total = calculateCartTotal(cart.items, discount)  // pure!

  // Impure: save to DB
  await db.saveOrder({ userId, total, items: cart.items })
  return { total, items: cart.items }
}`,
            explanation: 'calculateCartTotal pure hai — easily testable bina database ke. processCart impure hai (async, DB calls) lekin business logic pure function mein isolate hai. Ye separation testing, debugging, aur refactoring dramatically easy banata hai.',
          }}
          realWorldScenario="Redux store ke reducers pure functions hain — (state, action) => newState. React ka useState update function pure transformations expect karta hai. Test mein: pure functions ko easily test karo bina mocking ke. Impure functions ko integration tests ya end-to-end tests mein test karo. Ye clean architecture ka foundation hai."
          commonMistakes={[
            {
              mistake: 'Function ke andar input array/object mutate karna',
              why: "const sort = (arr) => arr.sort() — arr.sort() original array modify karta hai! Pure nahi.",
              fix: 'Copy banao pehle: const sort = (arr) => [...arr].sort() — original untouched.',
            },
            {
              mistake: 'Random numbers ya Date.now() pure function mein use karna',
              why: 'Same input pe different output — pure function ki definition violate hoti hai. Testing nightmare.',
              fix: 'Random/Date ko parameter ke roop mein inject karo: const gen = (seed, random = Math.random) => random() * seed.',
            },
          ]}
          proTip="Purity test: kya function ko test karne ke liye kuch setup karna padega — environment variables, database, mock files? Agar haan, toh pure nahi. Pure functions directly call karo — no setup, no teardown. Ye hi testability ka gold standard hai."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 4 Quiz — Functions &amp; Execution Context
          </h3>
          <p className="text-sm text-[#71717A]">Har function call ek naya context banata hai — kya tumhara model solid hai? 5 sawaal, 80%+ chahiye!</p>
        </div>
        <QuizSection questions={quizQuestions} chapterSlug="functions" />
      </div>
    </div>
  )
}
