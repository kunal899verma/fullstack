'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Promise State Machine Visual ──────────────────────────────────────────────

function PromiseStateMachine() {
  return (
    <div className="my-4">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">
        Promise State Machine
      </p>
      <div className="flex items-center justify-center gap-0 flex-wrap">
        {/* Pending */}
        <div
          className="rounded-xl px-4 py-3 text-center min-w-[100px]"
          style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}
        >
          <p className="text-xs font-bold text-[#F59E0B] mb-0.5">PENDING</p>
          <p className="text-[10px] text-[#71717A]">Initial state</p>
        </div>

        <div className="flex flex-col items-center mx-1 gap-6">
          {/* Arrow to fulfilled */}
          <div className="flex items-center gap-1 text-[10px] text-[#10B981]">
            <div className="w-8 h-px bg-[#10B981]" />
            <span>resolve()</span>
            <div className="w-8 h-px bg-[#10B981]" />
          </div>
          {/* Arrow to rejected */}
          <div className="flex items-center gap-1 text-[10px] text-[#EF4444]">
            <div className="w-8 h-px bg-[#EF4444]" />
            <span>reject()</span>
            <div className="w-8 h-px bg-[#EF4444]" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {/* Fulfilled */}
          <div
            className="rounded-xl px-4 py-3 text-center min-w-[110px]"
            style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}
          >
            <p className="text-xs font-bold text-[#10B981] mb-0.5">FULFILLED</p>
            <p className="text-[10px] text-[#71717A]">.then() chalta hai</p>
          </div>
          {/* Rejected */}
          <div
            className="rounded-xl px-4 py-3 text-center min-w-[110px]"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
          >
            <p className="text-xs font-bold text-[#EF4444] mb-0.5">REJECTED</p>
            <p className="text-[10px] text-[#71717A]">.catch() chalta hai</p>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-[#52525B] text-center mt-3">
        * Once settled (fulfilled/rejected), state kabhi nahi badlti — immutable!
      </p>
    </div>
  )
}

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const asyncQuiz = [
  {
    question: 'Node.js mein "error-first callback" convention kya hota hai?',
    options: [
      { text: 'Pehle data aata hai, phir error', correct: false, explanation: 'Ulta hai — error pehle, data baad mein.' },
      { text: 'Callback ka pehla argument hamesha error hota hai, phir data', correct: true, explanation: 'Bilkul sahi! callback(err, data) — agar err null hai toh success, warna error handle karo.' },
      { text: 'Errors ko throw kiya jaata hai callbacks mein', correct: false, explanation: 'Callbacks mein throw karna kaam nahi karta — uncaught exception ho jaati hai.' },
      { text: 'Errors ko ignore kiya jaata hai', correct: false, explanation: 'Errors ignore karna production mein bahut dangerous hai!' },
    ],
  },
  {
    question: 'Promise ka "pending" state ka matlab kya hai?',
    options: [
      { text: 'Promise reject ho gaya', correct: false, explanation: 'Reject hone par "rejected" state hoti hai.' },
      { text: 'Promise abhi complete nahi hua — na resolve, na reject', correct: true, explanation: 'Sahi! Pending matlab operation chal raha hai — koi result abhi nahi aaya.' },
      { text: 'Promise ka data mil gaya', correct: false, explanation: 'Data milne par "fulfilled" state hoti hai.' },
      { text: 'Promise cancel ho gaya', correct: false, explanation: 'Standard Promises cancel nahi ho saktin — AbortController alag hai.' },
    ],
  },
  {
    question: 'async function hamesha kya return karta hai?',
    options: [
      { text: 'Ek plain value', correct: false, explanation: 'async function ki return value automatically Promise mein wrap hoti hai.' },
      { text: 'undefined', correct: false, explanation: 'Kuch bhi return karo, Promise mein wrap hoga.' },
      { text: 'Ek Promise', correct: true, explanation: 'Correct! async function hamesha Promise return karta hai. Even agar tum return 42 likho, toh Promise.resolve(42) milega.' },
      { text: 'Ek callback', correct: false, explanation: 'async/await callbacks se alag pattern hai.' },
    ],
  },
  {
    question: 'Promise.all() kab use karte hain?',
    options: [
      { text: 'Jab ek ke baad ek tasks run karne hon', correct: false, explanation: 'Sequential tasks ke liye chaining ya for loop use karo.' },
      { text: 'Jab multiple async tasks parallel mein run karni hon aur sab complete hone ka wait karna ho', correct: true, explanation: 'Bilkul sahi! Promise.all([p1, p2, p3]) — sab parallel run honge, sab complete hone ka wait karega. Ek bhi fail hua toh sab fail.' },
      { text: 'Jab koi bhi ek task complete ho jaaye', correct: false, explanation: 'Pehle wali complete hone ka wait Promise.race() karta hai.' },
      { text: 'Error handling ke liye', correct: false, explanation: 'Error handling .catch() se hoti hai.' },
    ],
  },
  {
    question: 'Callback hell se bachne ka sabse modern tarika kya hai?',
    options: [
      { text: 'Aur zyada nested callbacks likhna', correct: false, explanation: 'Ye solution nahi, problem hai!' },
      { text: 'setTimeout se callbacks delay karna', correct: false, explanation: 'Ye problem solve nahi karta, sirf delay karta hai.' },
      { text: 'async/await with try/catch', correct: true, explanation: 'Sahi! async/await se code linear aur readable lagta hai, error handling try/catch se hoti hai — callback hell khatam.' },
      { text: 'Synchronous code likhna', correct: false, explanation: 'Synchronous code server ko block karta hai — acceptable nahi.' },
    ],
  },
]

// ── Main Chapter 6 Content ────────────────────────────────────────────────────

export default function Chapter6Content() {
  return (
    <div className="space-y-8">
      {/* Chapter intro */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(124,58,237,0.06)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🫀</span>
          <h2 className="text-2xl font-display font-bold text-[#F5F5F7]" id="intro">
            NodeMaster ka Dil
          </h2>
        </div>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ye chapter NodeMaster ka dil hai. <strong className="text-[#F5F5F7]">Agar ye samajh aa gaya, baki sab samajh aa jaega.</strong> Async programming Node.js ki superpower hai — lekin galat samjho toh sabse bada headache bhi yahi hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Hum seedha dive karenge: Callbacks se shuru, Promises tak, phir async/await tak. Aur phir Event Loop ki full anatomy — microtasks, macrotasks, phases — sab kuch.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {['Callbacks', 'Promises', 'async/await', 'Event Loop', 'Promise.all'].map((topic) => (
            <span
              key={topic}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(124,58,237,0.15)',
                border: '1px solid rgba(124,58,237,0.3)',
                color: '#9D5FF0',
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* ── ConceptCard 1: Callbacks ─────────────────────────────────────── */}
      <div id="callbacks">
        <ConceptCard
          title="Callbacks — Sab Kuch Yahan Se Shuru Hua"
          emoji="📞"
          difficulty="intermediate"
          whatIsIt="Callback ek function hai jo doosre function ko diya jaata hai argument ke roop mein, aur baad mein execute hota hai. Ye JavaScript mein async programming ka pehla aur original tarika tha. Simple concept — lekin misuse karo toh 'callback hell' aa jaata hai."
          whenToUse={[
            'Event listeners — jab user click kare, scroll kare',
            'Simple async operations jahan chaining nahi chahiye',
            'Third-party libraries jo callback style use karti hain (legacy code)',
            'Node.js core APIs — fs, http, crypto — sab traditionally callbacks use karte hain',
          ]}
          whyUseIt="Callbacks fundamental hain kyunki ye JavaScript ki nature ko reflect karte hain — functions first-class citizens hain, unhe pass kar sakte ho. Ye pattern ensure karta hai ki heavy operations (file I/O, network calls) complete hone par hi processing ho — main thread block kiye bina. Lekin complexity badhne par alternatives better hain."
          howToUse={{
            filename: 'callbacks.js',
            language: 'javascript',
            code: `const fs = require('fs')

// ✅ Error-first callback — Node.js convention
// pehla argument hamesha error, phir data
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('File read error:', err.message)
    return // Important! return karo warna baaki code bhi chalega
  }
  console.log('File content:', data)
})

// ❌ Callback Hell — jab ek ke andar ek callbacks ho
fs.readFile('user.json', 'utf8', (err, userData) => {
  if (err) return console.error(err)

  const user = JSON.parse(userData)

  fs.readFile(\`orders/\${user.id}.json\`, 'utf8', (err, ordersData) => {
    if (err) return console.error(err)

    const orders = JSON.parse(ordersData)

    fs.readFile(\`products/\${orders[0].productId}.json\`, 'utf8', (err, productData) => {
      if (err) return console.error(err)
      // Pyramid of doom! Aur gehri hoti jaati hai...
      console.log('Product:', JSON.parse(productData))
    })
  })
})`,
            explanation: 'Error-first pattern (err, data) Node.js ka official convention hai — fs, http, crypto sab yahi follow karte hain. Pehle err check karo, null hua toh proceed karo. Callback hell tab hota hai jab multiple async operations chain hoti hain — code sideways badhta rehta hai. Iska solution Promises hain.',
          }}
          realWorldScenario="Purana Express.js code, MongoDB callbacks, AWS SDK v2 — ye sab callback style use karte the. Aaj bhi legacy codebases mein common hai. Samajhna zaroori hai taaki purana code maintain ya modernize kar sako."
          commonMistakes={[
            {
              mistake: 'Error check karna bhool jaana callback mein',
              why: 'if(!err) check skip karo toh program crashed state mein aage badhta rehta hai — JSON.parse(undefined) jaisi errors aati hain.',
              fix: 'Hamesha pehla kaam: if (err) { handle it; return; } — return mat bhulo!',
            },
            {
              mistake: 'Callback mein throw karna error handle karne ke liye',
              why: 'Async callbacks mein throw kiya hua error catch nahi hota — process crash ho jaata hai ya silently ignore hota hai.',
              fix: 'Callbacks mein errors callback ke pehle argument se pass karo, ya Promises use karo proper .catch() ke saath.',
            },
          ]}
          proTip="Error-first callbacks Node.js convention hai: pehla argument hamesha error, phir data — callback(err, data). Agar library callback convention nahi follow karti, toh util.promisify() se Promise mein convert karo: const readFileAsync = require('util').promisify(fs.readFile)"
          demo={
            <DiffBlock
              title="Callback Hell vs Promise Chain"
              language="javascript"
              bad={{
                code: `// Callback Hell 😱
getUser(id, (err, user) => {
  getOrders(user.id, (err, orders) => {
    getProduct(orders[0].id, (err, product) => {
      getReviews(product.id, (err, reviews) => {
        // Depth 4 — aur badhti jaayegi!
        console.log(reviews)
      })
    })
  })
})`,
                label: 'Callback Hell',
                explanation: 'Pyramid of doom — har level ek nayi indent level. Error handling duplicate hoti hai, code unreadable.'
              }}
              good={{
                code: `// Promise Chain ✅
getUser(id)
  .then(user => getOrders(user.id))
  .then(orders => getProduct(orders[0].id))
  .then(product => getReviews(product.id))
  .then(reviews => console.log(reviews))
  .catch(err => console.error('Kuch gadbad:', err))`,
                label: 'Promise Chain',
                explanation: 'Linear, readable, ek hi .catch() sab errors handle karta hai.'
              }}
            />
          }
        />
      </div>

      {/* ── ConceptCard 2: Promises ─────────────────────────────────────── */}
      <div id="promises">
        <ConceptCard
          title="Promises — Callback Hell Ka Ilaaj"
          emoji="🤝"
          difficulty="intermediate"
          whatIsIt="Promise ek object hai jo future value ya error represent karta hai. Ye teen states mein hota hai: pending (chal raha hai), fulfilled (success), ya rejected (error). Promise ek 'agreement' hai — ya toh value milegi, ya clear error milegi. Dono cases mein, predictable behavior."
          whenToUse={[
            'Async operations chain karne ke liye — ek ke baad ek',
            'Multiple parallel operations run karni hon — Promise.all()',
            'Callback-style APIs ko modern code mein wrap karne ke liye',
            'Error handling centralize karni ho — single .catch()',
          ]}
          whyUseIt="Promises callback hell solve karte hain kyunki ye chainable hain — .then() har baar naya Promise return karta hai. Error kahan bhi ho, .catch() sabse neeche sab handle kar leta hai. Code linear aur readable rehta hai, nesting nahi badhti. Aur Promise.all() se parallel execution easy ho jaata hai."
          howToUse={{
            filename: 'promises.js',
            language: 'javascript',
            code: `// Promise banana (agar callback-based API ko wrap karna ho)
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err)    // Error case
      else resolve(data)       // Success case
    })
  })
}

// Promise chaining — linear, clean
readFilePromise('user.json')
  .then(data => JSON.parse(data))
  .then(user => {
    console.log('User:', user.name)
    return readFilePromise(\`orders/\${user.id}.json\`) // Next async step
  })
  .then(data => JSON.parse(data))
  .then(orders => console.log('Orders:', orders.length))
  .catch(err => {
    // Kahan bhi error aaye — yahan catch hoga
    console.error('Kuch gadbad:', err.message)
  })
  .finally(() => {
    // Success ya failure — ye hamesha chalega
    console.log('Operation complete')
  })

// Promise.all — parallel execution
const [users, products, orders] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/products').then(r => r.json()),
  fetch('/api/orders').then(r => r.json()),
])
// Teeno parallel chalenge — total time = sabse slow wala`,
            explanation: 'new Promise((resolve, reject)) se custom Promise banate hain. .then() success case handle karta hai aur naya Promise return karta hai — isliye chain hota hai. .catch() kisi bhi .then() mein error ho toh handle karta hai. .finally() cleanup ke liye.',
          }}
          realWorldScenario="Modern Node.js apps mein sab kuch Promises return karta hai — fetch API, Prisma queries, Redis operations, file system promises. Jab tum await fetch('/api') likhte ho, toh internally ek Promise resolve ho rahi hoti hai."
          commonMistakes={[
            {
              mistake: '.catch() lagana bhool jaana Promise chain mein',
              why: 'Unhandled promise rejection Node.js mein warning deta hai (ya newer versions mein crash). Silent failures bahut dangerous hain production mein.',
              fix: 'Har Promise chain ke end mein .catch() lagao, ya async/await ke saath try/catch use karo.',
            },
            {
              mistake: 'Promise ke andar return bhool jaana',
              why: '.then(user => { getOrders(user.id) }) — return nahi likha! Agle .then() mein undefined aayega.',
              fix: '.then(user => getOrders(user.id)) — implicit return ya { return getOrders(user.id) }',
            },
          ]}
          proTip="util.promisify() se koi bhi Node.js callback function Promise mein convert karo: const { promisify } = require('util'); const readFile = promisify(fs.readFile). Ya directly fs.promises.readFile() use karo — Node.js 10+ mein built-in hai."
          demo={<PromiseStateMachine />}
        />
      </div>

      {/* ── ConceptCard 3: async/await ──────────────────────────────────── */}
      <div id="async-await">
        <ConceptCard
          title="async/await — Synchronous Feel, Async Power"
          emoji="⏳"
          difficulty="intermediate"
          whatIsIt="async/await, Promises ke upar ek syntactic sugar hai. async function hamesha Promise return karta hai. await ek Promise ke resolve hone ka wait karta hai — lekin main thread block nahi hota, sirf is function ka execution pause hota hai. Code synchronous jaisa lagta hai, lekin actually async hai."
          whenToUse={[
            'Complex async flows jo multiple steps involve karte hain',
            'Error handling ko try/catch se clean rakhna ho',
            'Loops mein async operations — for...of with await',
            'Readable, maintainable async code likhna ho',
          ]}
          whyUseIt="async/await se code ki readability dramatically improve hoti hai. Promise chaining mein bhi code readable tha, lekin complex branching (ek step fail ho toh alag path) mushkil tha. async/await ke saath normal if/else, try/catch, loops sab kuch natural tarike se kaam karta hai."
          howToUse={{
            filename: 'async-await.js',
            language: 'javascript',
            code: `const { promises: fs } = require('fs')

// async function — hamesha Promise return karta hai
async function processUser(userId) {
  try {
    // await Promise resolve hone ka wait karta hai
    const userData = await fs.readFile(\`users/\${userId}.json\`, 'utf8')
    const user = JSON.parse(userData)

    console.log('User mila:', user.name)

    // Sequential — ek ke baad ek
    const orders = await getOrders(user.id)
    const enriched = await enrichOrdersWithProducts(orders)

    return { user, orders: enriched }

  } catch (err) {
    // Koi bhi await fail ho — yahan aayega
    console.error('processUser failed:', err.message)
    throw err // Upar pass karo
  } finally {
    console.log('processUser done — success ya failure dono mein')
  }
}

// ❌ Common mistake — await bhool jaana
async function wrong() {
  const data = fetch('/api/user') // await nahi! data = Promise object, value nahi
  console.log(data.name) // undefined — bug!
}

// ✅ Correct
async function correct() {
  const data = await fetch('/api/user').then(r => r.json())
  console.log(data.name) // Actual name
}

// Parallel execution — await se sequential ho jaata hai
// ❌ Slow — sequential awaits
const a = await apiCall1() // Wait karo
const b = await apiCall2() // Phir wait karo — total: t1 + t2

// ✅ Fast — parallel
const [a, b] = await Promise.all([apiCall1(), apiCall2()]) // total: max(t1, t2)`,
            explanation: 'async functions Promise return karte hain — hamesha. await kisi bhi Promise ke aage laga sakte ho. try/catch se async errors handle karo. Lekin yaad rakho — sequential awaits slow hote hain, parallel ke liye Promise.all use karo.',
          }}
          realWorldScenario="Aaj kal har modern Node.js code async/await use karta hai — Express handlers, Next.js API routes, database queries. Ye itna common ho gaya hai ki naya developer directly yahan se start karta hai, callbacks baad mein samjhta hai."
          commonMistakes={[
            {
              mistake: 'await bhool jaana — Promise object treat karna value ki tarah',
              why: 'const user = fetchUser() mein await nahi — user ek pending Promise object hai, aur user.name undefined hoga.',
              fix: 'const user = await fetchUser() — har async call ke pehle await lagao.',
            },
            {
              mistake: 'try/catch nahi lagana async functions mein',
              why: 'await fail ho toh unhandled rejection hoti hai — production mein crash ya silent failure.',
              fix: 'Har async function mein try/catch lagao, ya caller mein .catch() use karo.',
            },
            {
              mistake: 'Sequential awaits jab parallel ho sakti thi',
              why: 'const a = await fn1(); const b = await fn2() — total time: t1 + t2. Unnecessary slow.',
              fix: 'const [a, b] = await Promise.all([fn1(), fn2()]) — total time: max(t1, t2).',
            },
          ]}
          proTip="async function hamesha Promise return karta hai — ye rule yaad rakhna. Top-level await ab possible hai ES modules mein (type: module in package.json). Aur await for...of se async loops likhna natural lagta hai: for (const id of ids) { await process(id) } — ek ek karke process hoga."
          demo={
            <DiffBlock
              title="Promise Chain vs async/await"
              language="javascript"
              bad={{
                code: `// Promise Chain (complex branching mein mushkil)
function getProfile(userId) {
  return getUser(userId)
    .then(user => {
      if (!user.active) {
        return Promise.reject(new Error('Inactive'))
      }
      return getOrders(user.id)
        .then(orders => ({ user, orders }))
    })
    .catch(handleError)
}`,
                label: 'Promise Chain',
                explanation: 'Complex branching mein .then() ke andar conditions likhna awkward lagta hai.'
              }}
              good={{
                code: `// async/await (natural aur readable)
async function getProfile(userId) {
  try {
    const user = await getUser(userId)
    if (!user.active) throw new Error('Inactive')
    const orders = await getOrders(user.id)
    return { user, orders }
  } catch (err) {
    handleError(err)
  }
}`,
                label: 'async/await',
                explanation: 'Normal if/else, try/catch — code synchronous jaisa readable hai.'
              }}
            />
          }
        />
      </div>

      {/* ── ConceptCard 4: Event Loop Deep Dive ────────────────────────── */}
      <div id="event-loop">
        <ConceptCard
          title="Event Loop — Poori Anatomy"
          emoji="🔄"
          difficulty="intermediate"
          whatIsIt="Event Loop ek continuously running mechanism hai jo check karta hai — koi callback ready hai? Koi Promise resolve hua? Koi timer expire hua? Ye ek specific order mein ye sab check karta hai — 'phases' mein. Ye order samajhna hi advanced async debugging ka key hai."
          whenToUse={[
            'Jab async code unexpected order mein execute ho',
            'Performance optimization — kya event loop mein bottle neck hai?',
            'setTimeout vs setImmediate vs process.nextTick behavior samjhna',
            'Node.js monitoring — event loop lag detect karna',
          ]}
          whyUseIt="Event Loop ke phases samjhne se tum predict kar sakte ho ki kab kaunsa callback run hoga. Ye interview mein zaroori hai, lekin production debugging mein bhi real kaam aata hai — jab tumhara 'setImmediate' callback expected time par nahi chalta, ya Promise chain kisi strange order mein execute hoti hai."
          howToUse={{
            filename: 'event-loop-phases.js',
            language: 'javascript',
            code: `// Event Loop Phases Order:
// 1. timers       — setTimeout, setInterval callbacks
// 2. I/O callbacks — I/O errors
// 3. idle, prepare — internal
// 4. poll          — naye I/O events wait karo
// 5. check         — setImmediate callbacks
// 6. close         — close events

// Microtasks (Promises, queueMicrotask) — HAR PHASE KE BAAD

console.log('1. Sync')

setTimeout(() => console.log('5. setTimeout'), 0)   // Phase 1
setImmediate(() => console.log('4. setImmediate'))   // Phase 5

Promise.resolve().then(() => console.log('3. Promise microtask'))

process.nextTick(() => console.log('2. nextTick'))   // Sabse pehle microtask

console.log('2. Sync end')

// Output order:
// 1. Sync
// 2. Sync end
// 2. nextTick          ← nextTick sabse pehle microtask
// 3. Promise microtask ← Promise microtasks
// 4. setImmediate      ← check phase
// 5. setTimeout        ← timers phase

// ── Microtasks vs Macrotasks ─────────────────────
// MICROTASKS (Priority — phases ke beech):
//   - Promise.resolve().then()
//   - queueMicrotask()
//   - process.nextTick() (sabse pehle)

// MACROTASKS (Phases mein):
//   - setTimeout
//   - setInterval
//   - setImmediate
//   - I/O callbacks`,
            explanation: 'Ye order critical hai! process.nextTick > Promise microtasks > setImmediate > setTimeout(0). Har phase complete hone ke baad microtask queue drain hoti hai. Is wajah se Promises setTimeout se pehle resolve hoti hain — even agar setTimeout(0) ho.',
          }}
          realWorldScenario="Jab tumhara API response handling mein data update thoda late aata hai — ya test mein async assertion fail hoti hai kyunki data abhi nahi aaya — event loop phases ka ye knowledge direct kaam aata hai. Node.js performance monitoring tools (Clinic.js) event loop lag measure karte hain — agar loop blocked hai, toh sab requests slow ho jaati hain."
          commonMistakes={[
            {
              mistake: 'process.nextTick() ka overuse',
              why: 'nextTick microtask queue mein sabse pehle jaata hai — agar recursively call karo, event loop kabhi aage nahi badhega (I/O starve ho jaati hai).',
              fix: 'nextTick sirf wahan use karo jahan genuinely current operation ke baad aur I/O se pehle kuch karna ho. Normally setImmediate ya Promise.resolve() prefer karo.',
            },
            {
              mistake: 'setTimeout(fn, 0) ko "immediate" maanna',
              why: 'setTimeout(fn, 0) timers phase mein jaata hai — current sync code + all microtasks + possible setImmediate ke baad. Zero delay ka matlab zero wait nahi hai.',
              fix: 'True immediate async execution ke liye Promise.resolve().then(fn) ya queueMicrotask(fn) use karo.',
            },
          ]}
          proTip="Event Loop visualize karne ke liye NodeMaster ka Event Loop Visualizer tool check karo — har phase, har callback ka execution order animate hota hai. Samajhna bahut aasaan ho jaata hai visually. Aur production mein event loop lag detect karne ke liye: require('perf_hooks').monitorEventLoopDelay()"
        />
      </div>

      {/* ── ConceptCard 5: Promise combinators ─────────────────────────── */}
      <div id="promise-combinators">
        <ConceptCard
          title="Promise.all, Promise.race, Promise.allSettled"
          emoji="🎭"
          difficulty="intermediate"
          whatIsIt="Ye teeno methods multiple Promises ko combine karne ke liye hain — har ek alag use case ke liye. Promise.all sab complete hone ka wait karta hai. Promise.race pehle wale ka wait karta hai. Promise.allSettled sab ke results collect karta hai — fail bhi, pass bhi. Sahi tool sahi kaam ke liye."
          whenToUse={[
            'Promise.all — parallel API calls jab sab chahiye, ek bhi fail toh sab fail',
            'Promise.race — timeout implement karna, ya jab sabse fast response chahiye',
            'Promise.allSettled — sab results chahiye chahe kuch fail hoon — batch operations',
            'Promise.any — koi bhi ek succeed kare toh kaam chale (fallbacks)',
          ]}
          whyUseIt="Sequential awaits bahut slow hote hain independent operations ke liye. Promise.all se parallel execution hoti hai — total time = sabse slow wali operation ka time, na sab ka sum. Ek backend API call jo 3 databases se data fetch kare — Promise.all se teeno parallel chalenge."
          howToUse={{
            filename: 'promise-combinators.js',
            language: 'javascript',
            code: `// ── Promise.all — sab chahiye, ek fail = sab fail ──────────
async function getDashboardData(userId) {
  // Teeno parallel chalenge — total time = max(t1, t2, t3)
  const [user, orders, notifications] = await Promise.all([
    fetchUser(userId),           // t1: 120ms
    fetchOrders(userId),         // t2: 80ms
    fetchNotifications(userId),  // t3: 60ms
  ])
  // Total: ~120ms (not 260ms!)
  return { user, orders, notifications }
}

// ── Promise.race — jo pehle aaye ──────────────────────────
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const fetchPromise = fetch(url)
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout!')), timeoutMs)
  )
  return Promise.race([fetchPromise, timeoutPromise])
}

// ── Promise.allSettled — sab results chahiye ───────────────
async function processAllUsers(userIds) {
  const results = await Promise.allSettled(
    userIds.map(id => processUser(id))
  )

  const succeeded = results.filter(r => r.status === 'fulfilled')
  const failed = results.filter(r => r.status === 'rejected')

  console.log(\`Success: \${succeeded.length}, Failed: \${failed.length}\`)
  failed.forEach(f => console.error('Failed:', f.reason))
}

// ── Promise.any — koi bhi ek succeed kare ─────────────────
async function fetchFromFastestCDN(path) {
  // Jo CDN pehle respond kare woh win
  return Promise.any([
    fetch(\`https://cdn1.example.com/\${path}\`),
    fetch(\`https://cdn2.example.com/\${path}\`),
    fetch(\`https://cdn3.example.com/\${path}\`),
  ])
}`,
            explanation: 'Promise.all — all-or-nothing, parallel. Promise.race — first wins. Promise.allSettled — collect all, even failures. Promise.any — first success (ignore failures). Choose based on your failure tolerance.',
          }}
          realWorldScenario="E-commerce product page: user data, inventory, reviews, recommendations — chaaron parallel fetch karo Promise.all se. Agar ek bhi critical fail ho (inventory), page error show karo. Non-critical (reviews) ke liye Promise.allSettled use karo — page still load ho, sirf reviews missing hon."
          commonMistakes={[
            {
              mistake: 'Promise.all mein ek failure se sab fail ho jaata hai — ye handle nahi karna',
              why: 'Agar 5 mein se ek API call fail ho, baaki 4 ke results bhi milte nahi — even agar wo complete ho gaye hain.',
              fix: 'Partial failure tolerance chahiye toh Promise.allSettled use karo aur individually check karo status.',
            },
            {
              mistake: 'Sequential awaits likhna jab parallel ho sakti thi',
              why: 'const a = await fn1(); const b = await fn2() — fn2 fn1 complete hone ka wait karta hai unnecessarily.',
              fix: 'const [a, b] = await Promise.all([fn1(), fn2()]) — drastically faster for independent operations.',
            },
          ]}
          proTip="Promise.allSettled use karo jab batch operations run karo — emails bhejne, notifications, etc. Kuch fail hone par bhi poori batch process hogi aur tum detailed report ban sakte ho: { succeeded: [...], failed: [...] }. Production-grade async code ka core pattern hai ye."
          demo={
            <DiffBlock
              title="Sequential Awaits vs Promise.all"
              language="javascript"
              bad={{
                code: `// Sequential — 600ms total ❌
async function getData() {
  const user = await fetchUser()        // 200ms wait
  const orders = await fetchOrders()    // 200ms wait
  const prefs = await fetchPrefs()      // 200ms wait
  // Total: 600ms (unnecessary!)
  return { user, orders, prefs }
}`,
                label: 'Sequential Awaits',
                explanation: 'Har call pichli complete hone ka wait karta hai — bhale hi independent hain.'
              }}
              good={{
                code: `// Parallel — 200ms total ✅
async function getData() {
  const [user, orders, prefs] = await Promise.all([
    fetchUser(),    // Parallel
    fetchOrders(),  // Parallel
    fetchPrefs(),   // Parallel
  ])
  // Total: ~200ms (fastest wins!)
  return { user, orders, prefs }
}`,
                label: 'Promise.all',
                explanation: 'Teeno parallel chalte hain — total time sabse slow wali ka. 3x faster!'
              }}
            />
          }
        />
      </div>

      {/* ── Chapter Quiz ─────────────────────────────────────────────────── */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 6 Quiz — Async Mastery Check
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions. 80%+ chahiye pass ke liye. All the best!
          </p>
        </div>
        <QuizSection questions={asyncQuiz} chapterSlug="async-callbacks" />
      </div>
    </div>
  )
}
