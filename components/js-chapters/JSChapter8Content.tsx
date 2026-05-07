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
          Scope & Closures — JavaScript Ka Sabse Gehri Raaz
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Bhai, ruk jao. Ye chapter sirf padhne ka nahi hai — ye feel karne ka hai. Scope aur closures JavaScript ke woh concepts hain jo beginner ko confuse karte hain aur senior developer ko proud karte hain. Akshay Saini kehte hain — "Closure ek function nahi hai — closure ek combination hai function + uske lexical environment ka." Ye line yaad karo, tatoo karwa lo agar zaroorat ho!
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Sabse pehle ek shocking baat: JavaScript ki har execution context ke saath ek lexical environment banta hai. Lexical environment = local memory + reference to parent's lexical environment. Yahi scope chain hai. Yahi closures ka engine hai. Sab kuch isi ek concept se aata hai.
        </p>
        <div
          className="rounded-xl p-4 mt-4"
          style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <p className="text-sm text-[#A1A1AA]">
            <span className="text-[#EF4444] font-semibold">Ye chapter interview ka king hai!</span> Hoisting, TDZ, closures, scope chain — FAANG interviews mein ye sab mandatory hain. Ek ek concept dhyan se samjho, code khud chalao, aur explanation apne words mein dohrao. Tabhi pakka hoga.
          </p>
        </div>
      </div>

      {/* Card 1: Scope Types */}
      <div id="scope-types">
        <ConceptCard
          title="Scope Types — Global, Function, Block"
          emoji="🗺️"
          difficulty="intermediate"
          whatIsIt="Scope — ye wo boundary hai jo decide karti hai ki koi variable kahan tak accessible hai. Socho ek building: global scope poori building hai, function scope ek room hai, block scope ek almirah hai us room mein. var function-scoped hai — room se bahar leak ho jaata hai. let/const block-scoped hain — almirah ke andar hi rehte hain. Sawaal: var aur let mein exact fark kya hai loop mein? Jawab: var ka ek hi instance hota hai poore function mein, let ka har iteration mein fresh instance hota hai. Yahi wo bug hai jo beginners ko raat bhar jaag ke dhundhna padta hai."
          whenToUse={[
            'Global scope: sirf truly application-wide constants — API URLs, app version. Globals minimize karo — pollution hoti hai!',
            'Function scope: function ke andar kaam aane wale variables — loop counters, temp calculations',
            'Block scope: if/else, for loops — hamesha tightest possible scope use karo, ye best practice hai',
            'Module scope: ES modules mein har file ka apna scope — global pollution zero',
          ]}
          whyUseIt="Tighter scope = fewer bugs — ye rule tattoo karwa lo. Variable sirf jahan chahiye wahan accessible ho toh accidentally overwrite ya misuse ka chance nahi. var ke classic for-loop bug ne generations ko rota kiya — let ne woh bug permanently fix kiya ES6 mein. Principle of least privilege apply karo: variable ko sirf utna scope do jitna zaroorat hai — zyada nahi."
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
            explanation: 'Ye dekho carefully: var function-scoped hai isliye for loop ke baad bhi accessible hai — yahi bug ka source hai. let/const block-scoped hain — {} ke bahar ReferenceError. Nested functions outer scope access kar sakti hain — yahi scope chain ka kaam hai. Ye hi closure ka foundation hai jo agle card mein dekhenge.',
          }}
          realWorldScenario="Express middleware mein: har request handler apna function scope rakhta hai — request-specific data ek handler se dusre mein leak nahi hota, isliye concurrent users safe hain. React hooks mein: useState ke andar count ek specific component instance ka scope hai. Node.js modules: module scope automatically isolation deta hai — global variables ka koi chakkar nahi."
          commonMistakes={[
            {
              mistake: 'var ko loops mein use karna jab independent callbacks chahiye',
              why: 'for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100) } — sab 3 print hoga, 0 1 2 nahi. var ek hi i share karta hai poori function mein.',
              fix: 'let use karo — har iteration ka fresh i milta hai. Ya IIFE pattern use karo ES5 ke liye.',
            },
            {
              mistake: 'Global variables se modules ke beech data share karna',
              why: 'window.userData = ... — naming conflicts, testing impossible, unexpected mutations. Scale pe ye disaster hai.',
              fix: 'Module pattern use karo, dependency injection karo, ya state management library (Redux, Zustand) use karo.',
            },
          ]}
          proTip="Sawaal: kya var aur let mein sirf scope ka fark hai? Jawab: nahi! let aur const Temporal Dead Zone mein bhi hote hain — TDZ matlab scope ke shuru se declaration tak access karo toh ReferenceError. var undefined ke saath hoist hota hai — yahi agle card ka topic hai! Hamesha narrowest scope choose karo — ye professional JavaScript developer ki pehchaan hai."
        />
      </div>

      {/* Card 2: Scope Chain */}
      <div id="scope-chain">
        <ConceptCard
          title="Scope Chain — Lexical Scoping Ka Secret"
          emoji="🔗"
          difficulty="intermediate"
          whatIsIt="Scope chain — ye JavaScript engine ka wo mechanism hai jo variable dhundhne ke liye use karta hai. Sunao dhyan se: jab JS engine koi variable dhundta hai, wo pehle current scope mein dekhta hai. Nahi mila? Seedha outer scope mein jaata hai. Phir usse bhi outer mein. Jab tak global scope tak nahi pahunch jaata. Global mein bhi nahi mila? ReferenceError throw hota hai. Yahi scope chain hai — chain of lexical environments! Aur ye LEXICAL scoping hai, dynamic nahi — matlab function kahan DEFINE hua hai woh decide karta hai scope ko, kahan CALL hua nahi. Ye shocking lag sakta hai pehle sunne mein!"
          whenToUse={[
            'Closures samajhne ke foundation ke liye — scope chain hi closures ki bheetar ki baat hai',
            'Variable shadowing debug karne ke liye — same name inner aur outer scope mein',
            'Ye samajhna ki function kahan se variables access karta hai — defined pe based, called pe nahi',
            'Performance consideration: deeply nested scopes mein lookup thoda expensive hota hai',
          ]}
          whyUseIt="Lexical scoping predictable hai — ek baar code dekha toh pata chal jaata hai kaunsa variable kahan se aayega. Dynamic scoping hoti toh debugging nightmare hoti. Aur seedha baat karte hain: ye concept closures enable karta hai. Bina lexical scoping samjhe, closures kabhi truly samajh nahi aayenge. Scope chain hi wo chain hai jo inner function ko outer function ke variables access karne deti hai — even after outer function return ho chuka ho."
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
            explanation: 'Ye observe karo: tricky() mein x = 999 banaya, lekin getX() phir bhi 10 return kiya — kyunki getX DEFINE hua global scope mein jahan x = 10 hai. Yahi lexical scoping hai! Scope chain lookup: level3 ka scope → level2 → level1 → global. Har level apna lexical environment rakhta hai — yahi closures ka foundation hai.',
          }}
          realWorldScenario="React useCallback mein: callback ke andar jo bhi variables reference kiye hain woh lexical scope se aate hain — isliye dependency array mein include karna padta hai, warna stale closure bug aata hai. Module pattern: factory function ke andar wale variables module ke lexical scope mein hote hain. Express route handlers: middleware variables lexical scope se accessible hain agar properly structured ho."
          commonMistakes={[
            {
              mistake: 'Variable shadowing se unintentional bugs — same naam inner aur outer scope mein',
              why: "function process(data) { const result = 'local'; ... } — bahar ka result shadow ho jaata hai, debugging mushkil.",
              fix: 'Descriptive unique names use karo. ESLint mein no-shadow rule enable karo — ye automatically warn karega.',
            },
            {
              mistake: 'Dynamic scoping expect karna — this kahan call hua wahan se context expect karna',
              why: 'JavaScript lexical hai — function kahan DEFINED hai woh matter karta hai, kahan CALLED hua nahi. Ye gotcha bahut common hai.',
              fix: 'Arrow functions ke saath lexical this reliable hai. Regular functions ke saath .bind(), .call(), .apply() explicitly this set karo.',
            },
          ]}
          proTip="Ek aur shocking statement: scope chain wo chain hai jo lexical environments ko connect karti hai. Har execution context ek lexical environment banata hai — local memory + reference to parent's lexical environment. Jab function return hota hai, uska lexical environment garbage collected nahi hota agar koi us pe reference rakh raha ho — YAHI CLOSURE HAI. Agle card mein ye seedha dekhenge!"
        />
      </div>

      {/* Card 3: Hoisting Deep Dive */}
      <div id="hoisting">
        <ConceptCard
          title="Hoisting — Magic Nahi, 2-Phase Execution Hai!"
          emoji="⬆️"
          difficulty="intermediate"
          whatIsIt="Hoisting magic nahi hai — ye JavaScript ka 2-phase execution hai! Ye shocking statement yaad rakho. Phase 1 (Memory Creation Phase): JS engine poora code scan karta hai, sab variables aur functions ko memory mein jagah deta hai. var ko undefined ke saath, function declarations ko poori body ke saath, let/const ko uninitialized (TDZ) ke saath. Phase 2 (Code Execution Phase): line by line execute hota hai. Isliye var before declaration undefined deta hai — kyunki memory creation phase mein undefined assign hua tha. let/const TDZ mein hote hain — access karo toh ReferenceError. Hoisting magic nahi hai — sirf 2-phase execution hai!"
          whenToUse={[
            'Ye samajhna ki why var before declaration undefined hai, ReferenceError nahi — 2-phase explanation do',
            'TDZ samajhna: let/const hoist hote hain lekin uninitialized — isliye ReferenceError',
            'Function declarations fully hoisted hain — body ke saath — isliye file mein anywhere call kar sakte ho',
            'Practical rule: hamesha declare-before-use — hoisting pe rely mat karo',
          ]}
          whyUseIt="Ye ek interview mein poocha jaata hai — 'Hoisting kya hai?' Galat answer: variables upar move ho jaate hain. Sahi answer: 2-phase execution mein memory creation phase pehle hota hai — isliye var declarations accessible hoti hain execution se pehle. TDZ let/const ko safer banata hai — use before declare compile-time error. Function declarations hoist se utility functions bottom pe rakh sakte ho code mein — organization ke liye helpful."
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
            explanation: 'Observe karo: varVariable before declaration undefined print hua — kyunki memory creation phase mein var ko undefined assign hua tha. letVar before declaration ReferenceError diya — kyunki let TDZ mein tha (hoisted but uninitialized). sayHello() function declaration pehle call hua, definition neeche — works! Kyunki function declaration poori body ke saath hoist hoti hai. greet() arrow function pehle call kiya — ReferenceError — kyunki const greet TDZ mein tha. 2-phase model sab explain karta hai!',
          }}
          realWorldScenario="Large codebases mein utility functions file ke end mein define karo (function declarations) aur top pe use karo — hoisting help karta hai. React component files mein helper functions neecche rakho, component upar — hoisting se kaam chalta hai. Node.js modules mein 'use strict' automatically enable hota hai — undeclared variables ka chakkar nahi."
          commonMistakes={[
            {
              mistake: 'var use karke undefined bug silently ignore karna',
              why: 'console.log(x) before var x — undefined aata hai, TypeError nahi. Bug silently chhup jaata hai — bahut dangerous!',
              fix: "Hamesha let/const use karo — TDZ force karta hai declare-before-use. ESLint 'no-use-before-define' rule enable karo project mein.",
            },
            {
              mistake: 'Function expression ko function declaration ki tarah treat karna',
              why: "const fn = () => {} — ye hoisted nahi hoti. fn() before this line = ReferenceError (TDZ kyunki const).",
              fix: 'Sirf function declarations (function fn() {}) fully hoist hoti hain. Arrow functions aur expressions conscious decision se use karo — inhe pehle define karo, phir use karo.',
            },
          ]}
          proTip="Sawaal: kya let/const hoist hote hain? Jawab: HAAN! Lekin TDZ mein. Ye interview mein trap question hai — bahut log kehte hain nahi hote. Sahi answer: hote hain, lekin uninitialized — isliye TDZ mein access karo toh ReferenceError. 'use strict' mode mein accidental global variables impossible — modern ES modules automatically strict mode mein hote hain. Ye use karo!"
        />
      </div>

      {/* Card 4: Closures */}
      <div id="closures">
        <ConceptCard
          title="Closures — JavaScript Ka Sabse Powerful Concept"
          emoji="🔮"
          difficulty="intermediate"
          whatIsIt="Closure samajhna hai? Pehle ye samjho — jab ek function apna kaam khatam karta hai, uski memory khatam ho jaati hai? NAHI! Agar koi inner function us outer function ko reference kar raha hai, toh outer function ki memory TAB TAK rahegi jab tak inner function exist kare. Yahi closure hai. Aur shocking baat: Closure ek function nahi hai — closure ek combination hai function + uske lexical environment ka. Inner function sirf function nahi hai — woh apna poora lexical environment saath uthake chal raha hai. Sawaal: outer() call karke return hua, toh outer ka execution context toh stack se gaya na? Jawab: execution context gaya, lekin lexical environment — memories — woh gaya nahi. Inner function us lexical environment ko hold kar raha hai. Yahi magic hai!"
          whenToUse={[
            'Private state banana bina classes ke — function ke andar variables koi directly access nahi kar sakta',
            'Factory functions: specific configuration ke saath specialized functions generate karna',
            'Memoization: expensive calculations cache karna — closure cache ko persist karti hai',
            'Event handlers: specific data context ke saath handler create karna',
          ]}
          whyUseIt="Closures private state enable karte hain bina classes ke — ye encapsulation ka purana tarika hai JavaScript mein. Module pattern closures pe based hai — public API expose karo, implementation chhupao. React hooks (useState, useEffect) ke andar closures hain — setCount ke andar current count ka reference closure se aata hai. Memoization, currying, partial application — sab closures ke variations hain. Ye concept samajhne ke baad JavaScript ek aur dimension mein clear ho jaata hai."
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
            explanation: 'Step by step dekhte hain: outer() call hua → secret variable bana → inner function return hua. Ab outer ka execution context gaya stack se. Lekin closedFn() call karo — secret print hota hai! Kyunki inner function ka lexical environment outer ke lexical environment ko point karta hai — closure ne usse preserve kiya. Counter example mein count private hai — koi directly access nahi kar sakta, sirf increment/decrement/value ke through. makeAdder partial application hai — x close kiya, y baad mein liya. memoize mein cache Map close hua — persist karta hai across calls.',
          }}
          realWorldScenario="React useState: const [count, setCount] = useState(0) — jab setCount(count + 1) karte ho, setCount ke andar current count ka reference closure ke through aata hai. Express route: const createRouter = (db) => { return { getUser: async (id) => db.query(...) } } — db closed over. Authentication: const makeVerifier = (secret) => (token) => jwt.verify(token, secret) — secret closure mein safe hai. Configuration-based loggers: const createLogger = (level) => (msg) => log(`[${level}] ${msg}`)."
          commonMistakes={[
            {
              mistake: 'Closure mein unnecessarily large objects hold karna — memory leak',
              why: 'Closure outer scope ka reference rakhta hai — agar outer scope mein bada object hai aur closure alive hai, woh object garbage collected nahi hoga. Long-lived event listeners mein ye common problem hai.',
              fix: 'Sirf zaruri variables close karo. Large objects ke liye sirf required data extract karo, poora object nahi. Long-lived closures mein cleanup karo.',
            },
            {
              mistake: "Loop mein var ke saath closure — JavaScript ka most famous bug",
              why: 'for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100) } — sab callbacks same i share karte hain. Loop khatam, i = 3, sab 3 print karte hain.',
              fix: 'let use karo — har iteration fresh binding banata hai. Ya IIFE: (function(capturedI) { setTimeout(() => console.log(capturedI), 100) })(i).',
            },
          ]}
          proTip="Chrome DevTools mein closure capture dekhna chahte ho? Console mein closure wala function define karo, phir Sources tab mein breakpoint lagao. Scope panel mein 'Closure' section dikhayi dega — exactly kaunse variables capture hue. Ye debugging ka powerful tool hai. Memory leak check: Memory tab mein heap snapshot lo — closures with large retained objects clearly visible hote hain."
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
          title="Practical Closure Patterns — Real World JavaScript"
          emoji="🎯"
          difficulty="intermediate"
          whatIsIt="Closure ka concept samajh liya — ab production mein kaise use hota hai ye dekhte hain. Debounce: user search box mein type karta hai — har keystroke pe API call karna wasteful hai. Debounce ke andar timeoutId close hota hai — har naya call pehle wala cancel karta hai. Throttle: scroll event handler — per-frame call karna CPU waste hai. lastCall timestamp close hota hai — fixed interval maintain karta hai. Partial application: API client setup, logger factory — configuration pehle fix karo, functions baad mein specialize karo. Module pattern: private state + public API — ye sab closures ke real-world avatars hain."
          whenToUse={[
            'Debounce: search input — user stop karne ke baad API call karo (300ms delay typical)',
            'Throttle: scroll/resize handlers — fixed interval mein maximum ek call (100ms typical)',
            'Partial application: API clients — base URL, auth headers pehle fix karo',
            'Module pattern: private implementation chhupao, clean public API expose karo',
          ]}
          whyUseIt="Debounce aur throttle performance patterns hain — Lodash mein milte hain lekin closure se khud bana sakte ho — interview mein ye demand hota hai! Module pattern purana isolation pattern hai, ES modules se pehle ka — aaj bhi specific use cases mein valuable. Ye patterns production React aur Node.js applications mein daily use hote hain. Closure ka practical mastery inhe samajhne se aata hai."
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
            explanation: 'Engine trace karo debounce ka: pehli call aai — timeoutId set hua. Doosri call aai 100ms mein — clearTimeout se pehla cancel, naya set. User ruka 300ms — finally execute! timeoutId closure mein hai — isliye cancel possible tha. Throttle mein lastCall closure mein hai — timestamp compare karo, agar interval pass ho gaya toh call karo. Partial application: presetArgs array close hua — baad mein laterArgs ke saath combine. Module IIFE se immediately execute hota hai, users Map private hai — koi directly access nahi kar sakta.',
          }}
          realWorldScenario="React search component: const debouncedSearch = useMemo(() => debounce(searchAPI, 300), []) — useMemo ensure karta hai debounce ek baar ban. Infinite scroll: const throttledLoadMore = throttle(loadNextPage, 1000) — scroll pe 1 second mein max ek call. API client: const post = partial(apiCall, 'POST', config.baseURL) — base URL close hua. Lodash.debounce aur Lodash.throttle isi exact closure pattern pe built hain."
          commonMistakes={[
            {
              mistake: 'Debounce aur throttle confuse karna',
              why: 'Debounce: "user stop karne ke BAAD execute — last call ke X ms baad." Throttle: "X waqt mein maximum ek baar execute." Alag use cases hain.',
              fix: 'Search input → debounce (user typing khatam hone ka wait karo). Scroll/resize → throttle (regular interval pe update karo, har scroll pe nahi).',
            },
            {
              mistake: 'Module pattern mein large data close karna',
              why: 'Module ki lifetime app ki lifetime hai — agar large arrays ya objects close kiye toh memory permanently occupied.',
              fix: 'Module level mein sirf small config/indices rakhho. Large data external store mein — database, WeakMap use karo.',
            },
          ]}
          proTip="React mein useCallback aur useMemo bhi closure patterns hain! Dependency array mein sab closed-over values include karo — warna stale closure bug aata hai jahan function purani values capture karta hai. ESLint 'exhaustive-deps' rule ye automatically detect karta hai. Sawaal: stale closure kya hai? Jawab: jab closure purani value capture kare aur usse update nahi ho, toh state update hone ke baad bhi function purani value use karta hai — ye stale closure bug hai."
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
