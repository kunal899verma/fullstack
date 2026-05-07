'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const quizQuestions = [
  {
    question: 'Classic closure loop bug: for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100) } — kya print hoga?',
    options: [
      { text: '0 1 2', correct: false, explanation: 'Kash! var function-scoped hai — sab callbacks ek hi i share karte hain.' },
      { text: '3 3 3', correct: true, explanation: 'Sahi! var loop-scoped nahi hai — jab callbacks run hote hain, loop khatam ho chuka hai, i = 3 hai. Sab callbacks same i reference karte hain.' },
      { text: 'undefined undefined undefined', correct: false, explanation: 'undefined nahi — i exist karta hai, bas value 3 hai sab ke liye.' },
      { text: 'TypeError', correct: false, explanation: 'Koi error nahi — ye valid JavaScript hai, bas unexpected output deta hai.' },
    ],
  },
  {
    question: 'Temporal Dead Zone (TDZ) kya hai?',
    options: [
      { text: 'JavaScript engine ka timeout period', correct: false, explanation: 'Timeout se koi lena dena nahi — TDZ variable hoisting se related hai.' },
      { text: 'let/const variables ka zone jahan wo hoisted hain lekin access karne pe ReferenceError aata hai', correct: true, explanation: 'Bilkul! let/const scope ke shuru se declaration tak TDZ mein hote hain — access karo toh ReferenceError.' },
      { text: 'var variables ka undefined period', correct: false, explanation: 'var hoisting alag hai — var undefined ke saath hoist hota hai, TDZ mein nahi.' },
      { text: 'Function execution ke baad ki memory cleanup', correct: false, explanation: 'Memory cleanup garbage collection ka kaam hai, TDZ alag concept hai.' },
    ],
  },
  {
    question: 'Scope chain mein variable lookup kaisa hota hai?',
    options: [
      { text: 'Global scope se start hoke inner scope tak jaata hai', correct: false, explanation: 'Ulta! Lookup inner se outer jaata hai.' },
      { text: 'Current scope se start hoke outer scopes mein jaata hai jab tak variable mile ya global scope khatam ho', correct: true, explanation: 'Sahi! Inner scope pehle dhundha jaata hai, phir outer, phir global. Nahi mila toh ReferenceError.' },
      { text: 'Sirf current scope mein dhundha jaata hai', correct: false, explanation: 'Agar current scope mein nahi mila, toh outer scopes mein dhundha jaata hai — scope chain.' },
      { text: 'Random order mein dhundha jaata hai', correct: false, explanation: 'Lexical/static scoping hai — code likhne ke time ka structure decide karta hai lookup order.' },
    ],
  },
  {
    question: 'Closure kya hai?',
    options: [
      { text: 'Ek function jo dusre function ko call karta hai', correct: false, explanation: 'Higher-order functions alag concept hain.' },
      { text: 'Function jo apne creation ke time ke lexical scope ko "remember" karta hai even after outer scope execute ho chuka ho', correct: true, explanation: 'Bilkul! Closure = function + its lexical environment. Inner function outer variables access kar sakta hai even jab outer function return ho chuka ho.' },
      { text: 'JavaScript engine ka optimization technique', correct: false, explanation: 'Closure language feature hai, engine optimization nahi.' },
      { text: 'Object ke method ko store karne ka tarika', correct: false, explanation: 'Closures functions ke lexical scope se related hain, objects se nahi directly.' },
    ],
  },
  {
    question: 'var hoisting mein kya hota hai?',
    options: [
      { text: 'var declaration aur initialization dono hoist hote hain', correct: false, explanation: 'Sirf declaration hoist hoti hai — initialization wahan rehti hai jahan likhi hai.' },
      { text: 'var declaration hoist hoti hai as undefined, initialization nahi', correct: true, explanation: 'Sahi! var top pe move hoti hai as undefined. console.log(x); var x = 5; prints undefined, ReferenceError nahi.' },
      { text: 'var bilkul hoist nahi hoti', correct: false, explanation: 'var definitely hoist hoti hai — ye JavaScript ka classic behavior hai.' },
      { text: 'var let ki tarah hoist hoti hai TDZ ke saath', correct: false, explanation: 'var TDZ mein nahi hoti — undefined ke saath hoist hoti hai. TDZ sirf let/const ke liye hai.' },
    ],
  },
]

// ── Main Component ────────────────────────────────────────────────────────────

export default function JSChapter8Content() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div
        id="intro"
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3">
          Scope & Closures — JavaScript Ka Dil
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Bhai, ye chapter JavaScript ka soul samjhata hai. Scope decide karta hai ki variable kahan accessible hai. Closures — JavaScript ki superpower — functions ko apna environment yaad rakhne dete hain. Ye concepts samajhe bina tum JavaScript truly nahi jaante. Senior interviews mein ye mandatory hai.
        </p>
        <div
          className="rounded-xl p-4 mt-4"
          style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <p className="text-sm text-[#A1A1AA]">
            <span className="text-[#EF4444] font-semibold">Critical chapter!</span> Hoisting, TDZ, closures, scope chain — ye sab JavaScript interviews mein frequent aate hain. Dhyan se padho, code chalao, examples samjho.
          </p>
        </div>
      </div>

      {/* Card 1: Scope Types */}
      <div id="scope-types">
        <ConceptCard
          title="Scope Types — Global, Function, Block"
          emoji="🗺️"
          difficulty="intermediate"
          whatIsIt="Scope define karta hai ki variable kahan accessible hai. Global scope: script ke andar kahin bhi. Function scope: sirf us function ke andar. Block scope (ES6+): sirf {} block ke andar — let aur const ke liye. var function-scoped hai, let/const block-scoped. Ye distinction critical hai — var ek famous bug source hai."
          whenToUse={[
            'Global: truly application-wide constants — PROD URL, app version (minimize globals!)',
            'Function scope: function-specific variables — loop counters, temp calculations',
            'Block scope: if/else blocks, loops — tightest possible scope use karo',
            'Module scope: ES modules mein har file ka apna scope hota hai (not global)',
          ]}
          whyUseIt="Tighter scope = fewer bugs. Variable sirf jahan chahiye wahan accessible ho toh accidentally overwrite ya misuse nahi hota. Block scope ne var ke kai classic bugs fix kiye — for loop mein var i leak hoti hai function scope mein, let i block mein hi rehti hai. Module pattern se global pollution eliminate hoti hai."
          howToUse={{
            filename: 'scope-types.js',
            language: 'javascript',
            code: `// Global scope
let globalVar = 'everywhere accessible'
const GLOBAL_CONST = 'also global'

function demo() {
  // Function scope
  let funcVar = 'only in this function'
  var funcVar2 = 'also function-scoped'

  if (true) {
    // Block scope
    let blockVar = 'only in this if block'
    const blockConst = 'also block-scoped'
    var leakyVar = 'I leak to function scope!'

    console.log(blockVar)    // OK — in scope
    console.log(leakyVar)    // OK
  }

  // console.log(blockVar)  // ReferenceError — out of scope!
  console.log(leakyVar)     // 'I leak to function scope!' — var leaks!
}

// var in for loop — famous leak!
for (var i = 0; i < 3; i++) {
  console.log(i)  // 0, 1, 2
}
console.log(i)   // 3 — i leaked out of for loop! var is function-scoped

// let in for loop — block scoped, doesn't leak
for (let j = 0; j < 3; j++) {
  console.log(j)  // 0, 1, 2
}
// console.log(j) // ReferenceError — j is block-scoped

// Nested scopes — inner can access outer
function outer() {
  const x = 10

  function inner() {
    const y = 20
    console.log(x + y)  // 30 — inner can access outer's x
  }

  // console.log(y)  // ReferenceError — outer can't access inner's y
  inner()
}`,
            explanation: 'var function-scoped hai — block mein define karo lekin function mein leak hoti hai. let/const block-scoped hain — if, for, while blocks mein tightest scope. Hamesha let/const prefer karo — var ke bugs classic JavaScript interview questions hain.',
          }}
          realWorldScenario="Express middleware mein: har request handler ka apna function scope hai — request-specific variables ek handler se dusre mein leak nahi hote. React hooks mein: useState ka state ek component instance ka scope hai. Node.js modules mein: module scope automatically isolation deta hai — global pollution nahi."
          commonMistakes={[
            {
              mistake: 'var ko loops mein use karna jab closure chahiye',
              why: 'for (var i...) { setTimeout(() => console.log(i)) } — sab 3 print karta hai, 0,1,2 nahi.',
              fix: 'for (let i...) — block scope se har iteration ka apna i hota hai. Ya IIFE pattern use karo.',
            },
            {
              mistake: 'Global variables se data share karna modules ke beech',
              why: 'Global state naming conflicts, testing difficulties, unexpected mutations — scale pe nightmare.',
              fix: 'Module pattern, dependency injection, ya state management (Redux, Zustand) use karo.',
            },
          ]}
          proTip="Principle of least privilege: hamesha narrowest scope use karo. Block ke andar chahiye? Block mein declare karo. Function mein chahiye? Function mein declare karo. Global sirf genuinely global cheezein — configuration constants jaise."
        />
      </div>

      {/* Card 2: Scope Chain */}
      <div id="scope-chain">
        <ConceptCard
          title="Scope Chain — Lexical Scoping"
          emoji="🔗"
          difficulty="intermediate"
          whatIsIt="Scope chain variable lookup mechanism hai. Jab variable dhundha jaata hai, JavaScript pehle current scope mein dhundta hai. Nahi mila? Outer scope mein jaata hai. Phir usse outer mein. Jab tak global scope tak nahi pahunch jaata. Nahi mila? ReferenceError. Ye lexical/static scoping hai — code likhne ke time ka structure decide karta hai chain ko, runtime pe nahi."
          whenToUse={[
            'Closures samajhne ke liye — scope chain hi closures ka foundation hai',
            'Variable shadowing debug karne ke liye — same name inner aur outer scope mein',
            'Performance: deeply nested scopes mein lookup expensive hota hai',
            'Module design: scope chain minimize karo flat structures se',
          ]}
          whyUseIt="Lexical scoping predictable hai — function kahan define hua hai woh decide karta hai scope, kahan call hua nahi. Ye closures enable karta hai. Ye samajhne se variable shadowing bugs easily debug hote hain. Scope chain minimize karna — shallow nesting — performance ke liye bhi better hai."
          howToUse={{
            filename: 'scope-chain.js',
            language: 'javascript',
            code: `// Scope chain visualization
const global = 'GLOBAL'

function level1() {
  const l1 = 'LEVEL_1'

  function level2() {
    const l2 = 'LEVEL_2'

    function level3() {
      const l3 = 'LEVEL_3'

      // Scope chain lookup:
      console.log(l3)     // Found: level3 scope
      console.log(l2)     // Not in level3, found: level2 scope
      console.log(l1)     // Not in level3/2, found: level1 scope
      console.log(global) // Not in any — found: global scope
    }

    level3()
  }

  level2()
}

// Variable Shadowing — inner variable "shadows" outer
const name = 'Global Rahul'

function greet() {
  const name = 'Function Rahul'  // shadows global name
  console.log(name)  // 'Function Rahul' — inner wins
}

greet()
console.log(name)  // 'Global Rahul' — global unchanged

// Lexical scope — defined WHERE, not called FROM
const x = 10
function getX() {
  return x  // x comes from where getX was DEFINED (global scope)
}

function tricky() {
  const x = 999  // doesn't affect getX!
  return getX()  // returns 10, not 999
}
console.log(tricky())  // 10 — lexical scope!

// Dynamic vs Lexical (JavaScript is LEXICAL)
function makeCounter() {
  let count = 0  // This count is what closures capture
  return {
    increment() { return ++count },
    getValue() { return count }
  }
}
const counter = makeCounter()
counter.increment()  // 1
counter.increment()  // 2
counter.getValue()   // 2 — captured count`,
            explanation: 'Lexical scoping: function kahan likha hai woh scope decide karta hai, kahan call hua nahi. Ye "dynamic scoping" nahi hai — tricky() mein x = 999 getX() ko affect nahi karta. Variable shadowing intentional ho sakta hai lekin confusing — avoid karo same names jahan possible ho.',
          }}
          realWorldScenario="React useCallback: callback mein referenced variables lexical scope se aate hain — dependency array mein include karna padta hai. Module pattern: factory functions ke andar variables module-level scope mein hote hain. Express: route handlers mein middleware variables lexical scope se accessible hote hain agar properly structured ho."
          commonMistakes={[
            {
              mistake: 'Variable shadowing se unintentional bugs',
              why: "function process(data) { const result = 'local'; /* result accidentally shadows outer */ ... }",
              fix: 'Descriptive, unique names use karo. Linter rules like no-shadow enable karo project mein.',
            },
            {
              mistake: 'Dynamic scoping expect karna — this kahan call hua se expect karna context',
              why: 'JavaScript lexical hai — function kahan defined hai woh matter karta hai. Arrow functions is pe based hain.',
              fix: 'Arrow functions ke saath lexical this reliable hai. Regular functions ke saath .bind(), .call(), .apply() use karo.',
            },
          ]}
          proTip="'Closure = function + its lexical environment' — ye definition yaad karo. Scope chain hi closures ka mechanism hai. Jab function return hota hai, uska lexical environment survive karta hai — is liye outer variables accessible rehte hain."
        />
      </div>

      {/* Card 3: Hoisting Deep Dive */}
      <div id="hoisting">
        <ConceptCard
          title="Hoisting — var vs let/const TDZ"
          emoji="⬆️"
          difficulty="intermediate"
          whatIsIt="Hoisting JavaScript engine ka behavior hai jahan declarations scope ke top pe 'move' ho jaati hain conceptually. var declarations hoist hoti hain as undefined. let/const declarations bhi hoist hoti hain lekin Temporal Dead Zone (TDZ) mein hoti hain — access karo toh ReferenceError. Function declarations completely hoist hoti hain — body bhi. Function expressions hoisting inherit nahi karti."
          whenToUse={[
            'Hoisting samajhna: why var before declaration undefined hai, not ReferenceError',
            'TDZ: why let/const before declaration ReferenceError deta hai',
            'Function declarations hoist: isliye file mein anywhere call kar sakte ho',
            'Practical: declare first, use later — consistent style, no hoisting surprises',
          ]}
          whyUseIt="Hoisting samajhna bugs prevent karta hai — console.log(x) before var x = 5 prints undefined, not error. TDZ let/const ko safer banata hai — use before declare impossible. Function declarations hoist karne se utility functions bottom mein likhne ki flexibility milti hai. Lekin best practice: declare before use — hamesha."
          howToUse={{
            filename: 'hoisting.js',
            language: 'javascript',
            code: `// ── var Hoisting ──────────────────────────────────────

console.log(varVariable)  // undefined — hoisted, not initialized yet
var varVariable = 'hello'
console.log(varVariable)  // 'hello' — now initialized

// What JS engine sees (conceptually):
// var varVariable;          ← hoisted to top
// console.log(varVariable)  ← undefined
// varVariable = 'hello'
// console.log(varVariable)  ← 'hello'

// ── let/const — TDZ ───────────────────────────────────

// console.log(letVar)  // ReferenceError: Cannot access before initialization
let letVar = 'world'
console.log(letVar)  // 'world'

// TDZ visualization:
// {
//   ← let letVar declaration hoisted here (TDZ starts)
//   console.log(letVar)  ← TDZ! ReferenceError
//   let letVar = 'world' ← TDZ ends, initialized
// }

// ── Function Hoisting ──────────────────────────────────

// Works! Function declaration fully hoisted
sayHello()  // 'Hello!'

function sayHello() {
  console.log('Hello!')
}

// Does NOT work! Function expression not hoisted
// greet()  // TypeError: greet is not a function (var) or ReferenceError (const)

const greet = function() {
  console.log('Greet!')
}

// ── Class Hoisting ─────────────────────────────────────

// new MyClass()  // ReferenceError — class is in TDZ like let/const

class MyClass {
  constructor() { this.value = 42 }
}
const instance = new MyClass()  // Fine after declaration

// ── Practical consequence ──────────────────────────────

function example() {
  console.log(x)  // undefined — var hoisted in function scope
  if (true) {
    var x = 10  // hoisted to top of function, not block
  }
  console.log(x)  // 10 — same x, function-scoped
}`,
            explanation: 'TDZ (Temporal Dead Zone) let/const declarations ke liye scope start se actual declaration line tak rehta hai. Hamesha declare-before-use style follow karo. Function declarations unique hain — completely hoisted with body. Classes TDZ mein hoti hain let ki tarah.',
          }}
          realWorldScenario="Large codebases mein: utility functions file ke end mein define karo (function declarations), top pe use karo — hoisting help karta hai. React components: function declarations vs arrow expression — hoisting behavior different. Testing: hoisting-related bugs catch karne ke liye 'use strict' mode helpful hai."
          commonMistakes={[
            {
              mistake: 'var se variable undefined issue ko error nahi pakadna',
              why: 'console.log(x) before var x — undefined, TypeError nahi. Bug silently hide ho jaata hai.',
              fix: "Hamesha let/const use karo — TDZ force karta hai declare-before-use. ESLint 'no-use-before-define' rule enable karo.",
            },
            {
              mistake: 'Function expression ko function declaration ki tarah treat karna',
              why: "const fn = () => {} — hoisted nahi hoti. fn() before assignment = ReferenceError.",
              fix: 'Function declarations (function fn() {}) hoist hoti hain. Arrow/expressions use karo consciously knowing they are not hoisted.',
            },
          ]}
          proTip="'use strict' mode mein global variable accidental creation impossible hai — undeclared variables assignment karo toh ReferenceError. Modern JS modules automatically strict mode mein hote hain. Ye hoisting-related bugs early catch karta hai."
        />
      </div>

      {/* Card 4: Closures */}
      <div id="closures">
        <ConceptCard
          title="Closures — The Most Powerful JS Feature"
          emoji="🔮"
          difficulty="intermediate"
          whatIsIt="Closure = function + its lexical environment. Jab function return hota hai, woh apne outer scope ke variables ka reference retain karta hai — outer function ka execution context khatam ho jaane ke baad bhi. Yahi closure hai. JavaScript mein closures everywhere hain — callbacks, event handlers, factory functions, module pattern — sab closures pe based hain."
          whenToUse={[
            'Private state: function ke andar variables expose nahi karne hain',
            'Factory functions: specific configuration ke saath functions banana',
            'Memoization: expensive calculations cache karna',
            'Event handlers: specific data ke saath handler banana',
          ]}
          whyUseIt="Closures private state enable karte hain bina classes ke — encapsulation. Module pattern closures pe based hai — public API expose karo, implementation hide karo. React hooks (useState, useEffect) internally closures use karte hain. Memoization, currying, partial application — sab closures. Ye samajhne ke baad JS ek aur level pe clear ho jaata hai."
          howToUse={{
            filename: 'closures.js',
            language: 'javascript',
            code: `// Basic closure
function outer() {
  const secret = 'I am captured!'  // outer variable

  return function inner() {
    // inner function "closes over" outer's variables
    console.log(secret)  // accessible even after outer() returns!
  }
}

const closedFn = outer()  // outer() runs and returns inner
closedFn()  // 'I am captured!' — secret still accessible!

// ── Private Counter ──────────────────────────────────────
function makeCounter(initial = 0) {
  let count = initial  // private state

  return {
    increment() { return ++count },
    decrement() { return --count },
    reset() { count = initial; return count },
    value() { return count },
  }
}

const counter1 = makeCounter(0)
const counter2 = makeCounter(100)

counter1.increment()  // 1
counter1.increment()  // 2
counter2.increment()  // 101 — independent state!
// count variable directly inaccessible — private!

// ── Function Factory ─────────────────────────────────────
function makeAdder(x) {
  return (y) => x + y  // x is closed over
}

const add5 = makeAdder(5)
const add10 = makeAdder(10)
add5(3)   // 8
add10(3)  // 13

// ── Memoization ──────────────────────────────────────────
function memoize(fn) {
  const cache = new Map()  // closed over — persists!

  return function(...args) {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}

const heavyCalc = (n) => {
  // Simulate heavy computation
  let result = 0
  for (let i = 0; i < 1000000; i++) result += i
  return result + n
}

const fast = memoize(heavyCalc)
fast(42)  // slow — first time
fast(42)  // instant — cached!

// ── Once function — call only once ──────────────────────
function once(fn) {
  let called = false  // closed over
  let result

  return function(...args) {
    if (!called) {
      called = true
      result = fn(...args)
    }
    return result
  }
}

const initDB = once(() => {
  console.log('DB initialized!')
  return { connection: 'active' }
})

initDB()  // 'DB initialized!' — executes
initDB()  // Nothing — already called, returns cached result`,
            explanation: 'Counter example private state show karta hai — count variable direct access nahi. makeAdder function factory hai — partial application ka example. memoize closure se cache persist karta hai across calls. once pattern idempotent initialization ke liye — bahut useful in Node.js startup code.',
          }}
          realWorldScenario="React useState hook closure use karta hai — setCount ke andar current count ka reference. Express route: const router = makeRouter(db) — db closed over, har handler use kar sakta hai. Authentication: const auth = makeAuth(secret) — secret ke closure ke saath verify function return karo. Configuration: const createLogger = (level) => (msg) => console.log(`[${level}] ${msg}`)."
          commonMistakes={[
            {
              mistake: 'Closure mein large objects hold karna — memory leak',
              why: 'Closure outer scope ka reference rakhta hai — outer object garbage collected nahi hota jab tak closure alive hai.',
              fix: 'Sirf zaruri variables close karo. Large data ke liye WeakRef use karo. Closure ko manually null karo jab done ho.',
            },
            {
              mistake: "Loop mein var ke saath closure — famous bug",
              why: 'for (var i...) setTimeout — sab callbacks same i share karte hain, loop ke end pe i final value hai.',
              fix: 'let use karo loop mein. Ya IIFE: (function(i) { setTimeout(() => console.log(i), 100) })(i).',
            },
          ]}
          proTip="Closure memory implications: DevTools mein closure captured variables 'Closure' section mein dikh te hain Memory tab mein. Large closures memory pressure create karte hain. Long-lived closures (event listeners) mein sirf zaruri data capture karo — bade objects nahi."
          demo={
            <DiffBlock
              title="Famous Closure Bug — var vs let in Loop"
              language="javascript"
              bad={{
                code: `// Classic bug — var in loop
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i) // All print 3!
  }, 100)
}
// Output: 3, 3, 3
// Reason: var is function-scoped — ONE shared i
// By the time callbacks run, loop finished, i === 3`,
                label: 'Bug — var = Shared Reference',
                explanation: 'Sab callbacks ek hi i dekhte hain — loop khatam, i = 3',
              }}
              good={{
                code: `// Fix 1 — let creates new binding per iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i) // 0, 1, 2 — correct!
  }, 100)
}

// Fix 2 — IIFE to capture value (pre-ES6)
for (var i = 0; i < 3; i++) {
  ;((capturedI) => {
    setTimeout(() => console.log(capturedI), 100)
  })(i)
}`,
                label: 'Fix — let ya IIFE se Capture',
                explanation: 'let har iteration mein nayi binding banata hai — each closure apna i rakhta hai',
              }}
            />
          }
        />
      </div>

      {/* Card 5: Closure Patterns */}
      <div id="closure-patterns">
        <ConceptCard
          title="Practical Closure Patterns"
          emoji="🎯"
          difficulty="intermediate"
          whatIsIt="Closures ke practical design patterns: Module pattern (private state + public API), Function factories (configuration-based function generators), Memoization (caching with closures), Partial application (pre-fill some arguments), Once/debounce/throttle (call control patterns). Ye sab real-world JavaScript mein everywhere milte hain."
          whenToUse={[
            'Module pattern: private implementation chhupana, public API expose karna',
            'Debounce: user input search — har keystroke pe API call mat karo',
            'Throttle: scroll events — rate limit callbacks',
            'Partial application: reusable configured functions banana',
          ]}
          whyUseIt="Debounce aur throttle performance patterns hain — Lodash mein ye provide kiye jaate hain lekin closure se khud bhi ban sakte hain. Module pattern ES modules se pehle isolation deta tha, ab bhi useful hai specific cases mein. Ye patterns production React, Node.js applications mein daily use hote hain."
          howToUse={{
            filename: 'closure-patterns.js',
            language: 'javascript',
            code: `// ── Debounce — rapid calls throttle karo ────────────────
function debounce(fn, delay) {
  let timeoutId  // closed over

  return function(...args) {
    clearTimeout(timeoutId)  // cancel previous
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

const searchAPI = debounce(async (query) => {
  const results = await fetch(\`/search?q=\${query}\`)
  displayResults(results)
}, 300)

// input pe har keystroke pe call karo — sirf 300ms baad execute
input.addEventListener('input', (e) => searchAPI(e.target.value))

// ── Throttle — fixed interval mein call karo ─────────────
function throttle(fn, interval) {
  let lastCall = 0

  return function(...args) {
    const now = Date.now()
    if (now - lastCall >= interval) {
      lastCall = now
      return fn.apply(this, args)
    }
  }
}

const handleScroll = throttle(() => {
  updateScrollPosition()
}, 100)  // Max 10 times per second

window.addEventListener('scroll', handleScroll)

// ── Partial Application ──────────────────────────────────
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs)
  }
}

const multiply = (a, b) => a * b
const double = partial(multiply, 2)
const triple = partial(multiply, 3)
double(5)   // 10
triple(5)   // 15

// Practical: API call with base config
const apiCall = (method, baseUrl, endpoint, data) =>
  fetch(baseUrl + endpoint, { method, body: JSON.stringify(data) })

const getAPI = partial(apiCall, 'GET', 'https://api.example.com')
const postAPI = partial(apiCall, 'POST', 'https://api.example.com')

getAPI('/users')           // GET https://api.example.com/users
postAPI('/users', userData) // POST https://api.example.com/users

// ── Module Pattern ───────────────────────────────────────
const UserModule = (() => {
  // Private
  const users = new Map()
  let nextId = 1

  function validateEmail(email) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)
  }

  // Public API
  return {
    add(name, email) {
      if (!validateEmail(email)) throw new Error('Invalid email')
      const id = nextId++
      users.set(id, { id, name, email })
      return id
    },
    get(id) { return users.get(id) },
    count() { return users.size },
  }
})()

UserModule.add('Rahul', 'rahul@example.com')  // 1
UserModule.count()  // 1
// UserModule.users  // undefined — private!`,
            explanation: 'Debounce timeoutId close karta hai — har call pehle wala cancel karta hai. Throttle lastCall timestamp track karta hai. Partial application preset args close karta hai. Module pattern IIFE se immediate execution aur private scope combine karta hai. Ye sab production-ready patterns hain.',
          }}
          realWorldScenario="React search component: const debouncedSearch = useMemo(() => debounce(search, 300), []). Infinite scroll: const throttledLoadMore = throttle(loadNextPage, 1000). API client: const post = partial(apiCall, 'POST', config.baseURL). Lodash.debounce, Lodash.throttle isi pattern pe based hain."
          commonMistakes={[
            {
              mistake: 'Debounce aur throttle confuse karna',
              why: 'Debounce: "X waqt baad execute, agar dobara call aaye toh reset." Throttle: "X waqt mein ek baar max execute."',
              fix: 'Search input: debounce (wait for user to stop typing). Scroll/resize handlers: throttle (regular interval mein update).',
            },
            {
              mistake: 'Module pattern mein closures mein large data hold karna',
              why: 'Module ki lifetime app ki lifetime hai — large data memory mein hamesha rahega.',
              fix: 'Module level par sirf indices/references rakhho. Large data external store mein — database, WeakMap.',
            },
          ]}
          proTip="React useCallback aur useMemo bhi closure patterns hain — dependencies closure capture karti hain. Dependency array mein sab closed-over values include karo — warna stale closure bug aayega. ESLint 'exhaustive-deps' rule is common issue se bachata hai."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 8 Quiz — Scope & Closures
          </h3>
          <p className="text-sm text-[#71717A]">5 questions — 80%+ chahiye clear karne ke liye! (Ye chapter important hai — dhyan se answer karo)</p>
        </div>
        <QuizSection questions={quizQuestions} chapterSlug="scope-closures" />
      </div>
    </div>
  )
}
