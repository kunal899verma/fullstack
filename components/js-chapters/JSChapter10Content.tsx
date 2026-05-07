'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const quizQuestions = [
  {
    question: 'Classic async output order question: setTimeout(()=>console.log("A"), 0); Promise.resolve().then(()=>console.log("B")); console.log("C") — kya print hoga?',
    options: [
      { text: 'A B C', correct: false, explanation: 'Sync code hamesha pehle — C pehle, phir microtasks (B), phir macrotasks (A).' },
      { text: 'C B A', correct: true, explanation: 'Sahi! C (sync), phir B (Promise microtask), phir A (setTimeout macrotask). Microtasks macrotasks se pehle run hote hain!' },
      { text: 'C A B', correct: false, explanation: 'Nahi — Promises microtask queue mein hote hain, setTimeout macrotask queue mein. Microtasks pehle.' },
      { text: 'B C A', correct: false, explanation: 'Sync code (C) hamesha sabse pehle — koi async operation sync se pehle nahi chalta.' },
    ],
  },
  {
    question: 'Promise.allSettled() aur Promise.all() mein kya farq hai?',
    options: [
      { text: 'Koi farq nahi', correct: false, explanation: 'Bahut important farq hai — failure handling bahut alag hai.' },
      { text: 'allSettled sab complete hone tak wait karta hai regardless of failure; all pehli rejection pe reject ho jaata hai', correct: true, explanation: 'Bilkul! allSettled hamesha all results deta hai (fulfilled/rejected). all ek bhi fail hone par immediately reject.' },
      { text: 'allSettled sirf rejections return karta hai', correct: false, explanation: 'allSettled sab settled promises return karta hai — fulfilled aur rejected dono.' },
      { text: 'all hamesha sab complete hone tak wait karta hai', correct: false, explanation: 'Nahi — all pehli rejection pe immediately reject ho jaata hai.' },
    ],
  },
  {
    question: 'async/await ka sequential trap kya hai?',
    options: [
      { text: 'async functions hamesha slow hoti hain', correct: false, explanation: 'Speed directly related nahi hai async/await se.' },
      { text: 'await use karne se independent async operations sequentially run hoti hain, parallel se slower', correct: true, explanation: 'Sahi! const a = await fn1(); const b = await fn2(); — fn2 fn1 khatam hone ke baad shuru hoti hai. Promise.all se parallel run karo!' },
      { text: 'async functions errors hide karte hain', correct: false, explanation: 'try/catch ya .catch() se errors handle hoti hain — hide nahi hoti.' },
      { text: 'await sirf Promises ke saath kaam karta hai', correct: false, explanation: 'await non-Promise values ke saath bhi kaam karta hai — woh Promise.resolve(value) mein wrap ho jaate hain.' },
    ],
  },
  {
    question: 'Error-first callback pattern mein callback signature kya hoti hai?',
    options: [
      { text: 'callback(data, error)', correct: false, explanation: 'Ulta hai — error hamesha pehla argument hota hai Node.js convention mein.' },
      { text: 'callback(error, data)', correct: true, explanation: 'Sahi! Node.js convention: pehla argument error (null agar success), doosra data. fs.readFile, db.query sab isi pattern mein hain.' },
      { text: 'callback(success, error, data)', correct: false, explanation: 'Ye Node.js convention nahi hai — standard 2-argument pattern hai.' },
      { text: 'callback(data) only', correct: false, explanation: 'Error handling mandatory hai — callback(error, data) pattern ensure karta hai errors handle hon.' },
    ],
  },
  {
    question: 'Promise.race() kya karta hai?',
    options: [
      { text: 'Sab promises parallel mein run karta hai', correct: false, explanation: 'Sab parallel hote hain but Promise.race ka special behavior alag hai.' },
      { text: 'Jo pehle settle ho (fulfill ya reject), sirf uska result return karta hai', correct: true, explanation: 'Sahi! race timeout implementation ke liye useful hai — Promise.race([actualFetch, timeoutPromise]).' },
      { text: 'Sab fulfill hone tak wait karta hai', correct: false, explanation: 'Ye Promise.all ka kaam hai. race pehle settle hone wale pe stop karta hai.' },
      { text: 'Sirf fastest fulfilled promise return karta hai — rejections ignore karta hai', correct: false, explanation: 'race rejections bhi consider karta hai — jo pehle settle ho, chahe fulfill ya reject.' },
    ],
  },
]

// ── Main Component ────────────────────────────────────────────────────────────

export default function JSChapter10Content() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div
        id="intro"
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3">
          Asynchronous JavaScript — The Final Boss
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Bhai, async JavaScript JavaScript ka sabse important aur sabse confusing topic hai. Callbacks se Promises tak, Promises se async/await tak — evolution samajhna zaroori hai. Aur Promise combinators — all, race, allSettled, any — ye production code mein daily use hote hain.
        </p>
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)' }}
        >
          <p className="text-sm text-[#A1A1AA]">
            <span className="text-[#F59E0B] font-semibold">Classic Quiz Pehle!</span> Output order: setTimeout + Promise + sync code — answer hai: sync pehle, phir Promise .then, phir setTimeout (microtask &gt; macrotask).
          </p>
        </div>
      </div>

      {/* Card 1: Why Async — Event Loop Basics */}
      <div id="why-async">
        <ConceptCard
          title="Why Async? — Blocking vs Non-Blocking"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="JavaScript single-threaded hai — ek time mein ek kaam. Agar file read, network call, ya database query ke liye wait karein synchronously — sab kuch block ho jaata hai. Async model: I/O operations background mein hoti hain (libuv), main thread free rehta hai. Jab result ready ho, callback/promise/await ke through result mile. Yahi Node.js ki scalability ka secret hai."
          whenToUse={[
            'Network requests: fetch, axios — hamesha async',
            'File I/O: fs.promises.readFile — async preferred server mein',
            'Database queries: hamesha async — Mongoose, Prisma sab async',
            'Timers: setTimeout, setInterval, setImmediate — sab async',
          ]}
          whyUseIt="Blocking I/O mein server ek request complete hone tak ruka rehta hai — doosre requests wait karte hain. Non-blocking mein server I/O request bhejta hai, immediately next request handle karta hai, jab I/O complete ho callback se result leta hai. Ye model Node.js ko thousands of concurrent connections handle karne deta hai bina heavy threading ke."
          howToUse={{
            filename: 'blocking-vs-nonblocking.js',
            language: 'javascript',
            code: `// ── Blocking — BAD for servers ──────────────────────
const fs = require('fs')

// WRONG: Entire server hangs during read
const data = fs.readFileSync('/path/to/large/file.json')
// While this runs, no other request can be served!

// ── Non-blocking — GOOD ──────────────────────────────
// Promise-based — modern Node.js
async function readConfig() {
  const data = await fs.promises.readFile('/path/config.json', 'utf8')
  return JSON.parse(data)
}

// ── Event Loop — Classic Output Order ────────────────
console.log('1: Synchronous')

setTimeout(() => {
  console.log('4: setTimeout — macrotask')
}, 0)

Promise.resolve()
  .then(() => console.log('3: Promise — microtask'))
  .then(() => console.log('3.5: Second microtask'))

queueMicrotask(() => console.log('3.2: queueMicrotask'))

console.log('2: Also Synchronous')

// Output ORDER:
// 1: Synchronous
// 2: Also Synchronous
// 3: Promise — microtask
// 3.2: queueMicrotask
// 3.5: Second microtask
// 4: setTimeout — macrotask

// Rule: Sync code → Microtask queue → Macrotask queue
// Microtasks: Promises (.then), queueMicrotask, MutationObserver
// Macrotasks: setTimeout, setInterval, I/O callbacks, setImmediate`,
            explanation: 'Event loop phases: 1) Synchronous code run karo. 2) Microtask queue khaali karo (sab Promise.then, queueMicrotask). 3) Macrotask queue se ek task run karo (setTimeout). 4) Repeat. Isliye Promise.then hamesha setTimeout se pehle aata hai even agar dono "0 delay" pe hain.',
          }}
          realWorldScenario="Express server mein: har request independently handle hoti hai. Ek request slow database query kar rahi hai — dusre requests block nahi hote, wo apna kaam karte rehte hain. Ye concurrency without parallelism hai — JavaScript single-threaded hai but I/O concurrent hai via event loop aur libuv."
          commonMistakes={[
            {
              mistake: 'Server code mein synchronous APIs use karna',
              why: 'fs.readFileSync, crypto.scryptSync jaise calls main thread block karte hain — sab requests wait karte hain.',
              fix: 'Hamesha async versions: fs.promises.readFile, crypto.scrypt with callback/promisify. Server code mein Sync APIs strict no.',
            },
            {
              mistake: 'setTimeout(fn, 0) ko synchronous samajhna',
              why: 'setTimeout 0 milliseconds delay ke baad bhi macrotask queue mein jaata hai — current sync code ke baad.',
              fix: "Immediate microtask ke liye: Promise.resolve().then(fn) ya queueMicrotask(fn). setTimeout 0 genuinely 'last mein karo' ke liye.",
            },
          ]}
          proTip="process.nextTick() (Node.js only) microtask queue se bhi pehle run karta hai — even before Promise.then! Use with caution — starvation cause kar sakta hai agar recursively use karo. setImmediate() I/O callbacks ke baad, setTimeout(fn, 0) se baad mein run hota hai Node.js mein."
        />
      </div>

      {/* Card 2: Callbacks */}
      <div id="callbacks">
        <ConceptCard
          title="Callbacks — The Beginning"
          emoji="📞"
          difficulty="intermediate"
          whatIsIt="Callback ek function hai jo dusre function ko pass kiya jaata hai — jab async operation complete ho tab call karo. Node.js ka error-first callback convention: callback(error, data) — pehla argument hamesha error (null if success), doosra data. Ye simple lekin scale pe messy ho jaata hai — callback hell ya 'pyramid of doom'."
          whenToUse={[
            'Node.js core APIs: fs, http, crypto — callbacks use karte hain traditionally',
            'Event listeners: addEventListener — callback pattern',
            'setTimeout, setInterval — callback hai',
            'Legacy code: purana Node.js code callbacks heavily use karta tha',
          ]}
          whyUseIt="Callbacks JavaScript ka foundation hai — Promises aur async/await internally callbacks pe built hain. Error-first pattern ensure karta hai ki errors silently swallow nahi hote. Samajhna zaroori hai legacy code ke liye aur Node.js internals ke liye. util.promisify se callbacks ko Promises mein convert karo."
          howToUse={{
            filename: 'callbacks.js',
            language: 'javascript',
            code: `const fs = require('fs')
const util = require('util')

// ── Error-First Callback Pattern ──────────────────────
fs.readFile('/path/to/file.json', 'utf8', function(error, data) {
  // ALWAYS check error first!
  if (error) {
    console.error('File read karne mein error:', error.message)
    return  // Early return — don't continue with data
  }
  const json = JSON.parse(data)
  console.log('File read:', json)
})

// ── Callback Hell — "Pyramid of Doom" ───────────────
fs.readFile('user.json', 'utf8', (err1, userData) => {
  if (err1) return handleError(err1)

  const user = JSON.parse(userData)
  db.find('orders', { userId: user.id }, (err2, orders) => {
    if (err2) return handleError(err2)

    paymentApi.getHistory(user.id, (err3, payments) => {
      if (err3) return handleError(err3)

      // Deeply nested — hard to read, maintain, test
      emailService.send(user.email, orders, payments, (err4) => {
        if (err4) return handleError(err4)
        console.log('Done!')
        // Keep nesting... 😱
      })
    })
  })
})

// ── util.promisify — Callbacks to Promises ───────────
const readFile = util.promisify(fs.readFile)

// Now use with async/await!
async function processFile() {
  const data = await readFile('/path/to/file.json', 'utf8')
  return JSON.parse(data)
}

// ── Custom promisify ─────────────────────────────────
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }
}`,
            explanation: 'Error-first pattern: hamesha if(error) check karo pehle, return karo. util.promisify callbacks wale functions ko Promise-based banata hai — modern async/await ke saath use karo. Callback hell solve karo Promises ya async/await se — code flat aur readable ho jaata hai.',
          }}
          realWorldScenario="Node.js fs, http, crypto modules callback-based hain. Third-party SDKs (AWS SDK v2, older libraries) callbacks use karte hain. util.promisify se inhe modern async/await ke saath use karo. EventEmitter based patterns (socket events, file watcher) callbacks use karte hain permanently."
          commonMistakes={[
            {
              mistake: 'Error argument ignore karna',
              why: 'fs.readFile(path, (err, data) => { JSON.parse(data) }) — agar err hai, data undefined hai, JSON.parse crash!',
              fix: 'Hamesha if(err) check karo first. Node.js convention ko respect karo — error is always first.',
            },
            {
              mistake: 'Callback ke baad code continue karna return ke bina',
              why: 'if(err) { handleError(err) } // forgot return; doNextThing(data) — dono run hote hain!',
              fix: 'if(err) { handleError(err); return; } — return ensure karta hai function wahan ruke.',
            },
          ]}
          proTip="Modern Node.js mein fs.promises.readFile, http.request ke alternatives Promises return karte hain natively. Naye code ke liye hamesha fs.promises ya util.promisify use karo — callback hell se bachao. Node.js 10+ mein util.promisify standard approach hai."
        />
      </div>

      {/* Card 3: Promises */}
      <div id="promises">
        <ConceptCard
          title="Promises — States, Chaining & Errors"
          emoji="🤝"
          difficulty="intermediate"
          whatIsIt="Promise ek object hai jo future value represent karta hai — pending (wait), fulfilled (success), rejected (failure). Ek baar settled, state change nahi hoti. .then() fulfilled handle karta hai, .catch() rejected handle karta hai, .finally() hamesha run karta hai. Chaining: .then() naya Promise return karta hai — flat async flow possible."
          whenToUse={[
            'Async operations jo ek result produce karte hain — API calls, file reads',
            'Promise.all: multiple async operations parallel mein run karo',
            '.then() chaining: sequential transformations',
            'new Promise(): callbacks ko Promise mein wrap karo',
          ]}
          whyUseIt="Promises callback hell solve karte hain — flat chaining. Error propagation automatic hai — chain mein koi bhi .then() throw kare toh .catch() pe jaata hai. Cancellable nahi (AbortController alag topic), lekin composable hain — Promise.all, Promise.race, allSettled se powerful patterns. async/await Promises ke upar built hai."
          howToUse={{
            filename: 'promises.js',
            language: 'javascript',
            code: `// ── Promise States ───────────────────────────────────
const pendingPromise = new Promise((resolve, reject) => {
  // async operation
  setTimeout(() => {
    resolve('Success!')  // fulfilled
    // OR: reject(new Error('Failed!'))  // rejected
  }, 1000)
})

// ── Promise Chaining ─────────────────────────────────
fetch('/api/user/42')
  .then(response => {
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`)
    return response.json()  // Returns another Promise!
  })
  .then(user => {
    return fetch(\`/api/orders/\${user.id}\`)  // Another fetch
  })
  .then(response => response.json())
  .then(orders => {
    console.log('User orders:', orders)
    return orders  // Pass to next .then()
  })
  .catch(error => {
    // Catches ANY error from the entire chain above!
    console.error('Something failed:', error)
  })
  .finally(() => {
    // Always runs — cleanup, hide loading spinner
    setLoading(false)
  })

// ── Creating Promises — wrapping callbacks ───────────
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    require('fs').readFile(path, 'utf8', (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

// ── Promise Chaining is Flat — vs Callback Nesting ──
readFileAsync('user.json')
  .then(data => JSON.parse(data))
  .then(user => fetchOrders(user.id))
  .then(orders => sendEmail(orders))
  .catch(handleError)
// Beautiful flat chain vs callback pyramid!

// ── Error propagation ────────────────────────────────
Promise.resolve()
  .then(() => { throw new Error('Step 2 failed') })
  .then(() => console.log('Never runs'))
  .then(() => console.log('Also never runs'))
  .catch(err => console.log('Caught:', err.message))  // 'Step 2 failed'`,
            explanation: 'Promise chaining flat async flow enable karta hai. .catch() chain mein kisi bhi point pe throw caught hota hai. .finally() cleanup ke liye — loading hide karo, connection close karo. Every .then() return value next .then() ko milta hai — transform pipeline banao.',
          }}
          realWorldScenario="React data fetching: useEffect(() => { fetchUser(id).then(setUser).catch(setError).finally(() => setLoading(false)) }, [id]). Node.js API: UserModel.findById(id).then(user => OrderModel.find({userId: user.id})).then(orders => res.json({user, orders})). Express middleware: Promise chaining request pipeline handle karta hai."
          commonMistakes={[
            {
              mistake: 'Promise nesting — callback hell inside .then()',
              why: '.then(() => { fetch().then(() => { fetch().then... }) }) — pyramid of doom wapas!',
              fix: 'Return Promises in .then() to flatten: .then(() => fetch()).then(() => anotherFetch()). Ya async/await.',
            },
            {
              mistake: '.catch() lagana bhool jaana',
              why: 'Unhandled promise rejection — Node.js mein process crash ho sakta hai (UnhandledPromiseRejection warning).',
              fix: 'Hamesha .catch() lagao Promise chains mein. Ya async/await ke saath try/catch. Global handler: process.on("unhandledRejection", ...)',
            },
          ]}
          proTip="Promise.resolve(value) ek immediately resolved promise banata hai — testing aur default values ke liye useful. Promise.reject(error) immediately rejected. Async function automatically Promise return karta hai — return 42 inside async function = resolved promise with 42."
        />
      </div>

      {/* Card 4: async/await */}
      <div id="async-await">
        <ConceptCard
          title="async/await — Promises Ka Clean Syntax"
          emoji="⏳"
          difficulty="intermediate"
          whatIsIt="async/await Promises ka syntactic sugar hai — async function declare karo, await se Promises ko synchronous-looking code mein use karo. async function hamesha Promise return karta hai. await sirf async function ke andar kaam karta hai (ya top-level ES modules mein). Error handling try/catch se. Sequential vs parallel trap — common performance bug."
          whenToUse={[
            'Almost hamesha Promises se prefer karo async/await — much more readable',
            'Sequential operations: file read → parse → validate → save',
            'Error handling: try/catch structured error handling',
            'Parallel: await Promise.all([op1(), op2()]) — independent operations parallel karo',
          ]}
          whyUseIt="async/await Promise chains se dramatically more readable hai — synchronous code ki tarah likhta hai. Debugging easier hai — stack traces better hote hain. try/catch familiar error handling pattern. Parallel trap samajhna critical hai — sequential await se unnecessary slow code. Promise.all parallel operations ke liye."
          howToUse={{
            filename: 'async-await.js',
            language: 'javascript',
            code: `// ── Basic async/await ───────────────────────────────
async function fetchUser(id) {
  const response = await fetch(\`/api/users/\${id}\`)
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`)
  return response.json()  // No need to await the final return
}

// ── Error Handling — try/catch ────────────────────────
async function getUserWithOrders(userId) {
  try {
    const user = await fetchUser(userId)
    const orders = await fetchOrders(user.id)
    return { user, orders }
  } catch (error) {
    if (error instanceof NotFoundError) {
      return { user: null, orders: [] }
    }
    throw error  // Re-throw unexpected errors
  } finally {
    // Always runs
    console.log('fetchUserWithOrders completed')
  }
}

// ── Sequential vs Parallel TRAP ───────────────────────
// ❌ Sequential — SLOW! (each waits for previous)
async function sequential() {
  const user = await fetchUser(1)      // Wait 200ms
  const products = await fetchProducts()  // Wait 150ms — TOTAL: 350ms!
  const settings = await fetchSettings()  // Wait 100ms — TOTAL: 450ms!
  return { user, products, settings }
}

// ✅ Parallel — FAST! (all start simultaneously)
async function parallel() {
  const [user, products, settings] = await Promise.all([
    fetchUser(1),       // Start immediately
    fetchProducts(),    // Start immediately
    fetchSettings(),    // Start immediately
    // All run concurrently — total: max(200, 150, 100) = 200ms!
  ])
  return { user, products, settings }
}

// ── Parallel with error handling ──────────────────────
async function safeParallel() {
  const results = await Promise.allSettled([
    fetchUser(1),
    fetchProducts(),
  ])

  const [userResult, productsResult] = results
  const user = userResult.status === 'fulfilled' ? userResult.value : null
  const products = productsResult.status === 'fulfilled' ? productsResult.value : []
  return { user, products }
}

// ── async forEach gotcha ──────────────────────────────
const ids = [1, 2, 3, 4, 5]

// ❌ forEach doesn't await properly
ids.forEach(async (id) => {
  await processItem(id)  // Not waited by forEach!
})
// Code continues before processing done!

// ✅ for...of — proper sequential
for (const id of ids) {
  await processItem(id)  // Properly awaited
}

// ✅ Parallel with map + Promise.all
const results2 = await Promise.all(ids.map(id => processItem(id)))`,
            explanation: 'Sequential trap: do 3 await calls sequentially = sum of all times. Parallel: Promise.all se = max of all times. HUGE performance difference! forEach async bug: forEach awaits nahi karta, for...of ya Promise.all use karo. Finally always runs — cleanup ke liye.',
          }}
          realWorldScenario="Express API handler: async function getProfile(req, res) { try { const [user, posts, followers] = await Promise.all([User.findById(req.params.id), Post.find({userId}), Follower.count({userId})]); res.json({ user, posts, followers }) } catch(err) { next(err) } }. Parallel se 3x faster than sequential!"
          commonMistakes={[
            {
              mistake: 'Independent operations sequentially await karna',
              why: 'const a = await op1(); const b = await op2() — op2 op1 khatam hone ke baad shuru hoti hai — unnecessary wait.',
              fix: 'const [a, b] = await Promise.all([op1(), op2()]) — dono parallel mein chalta hai.',
            },
            {
              mistake: 'forEach ke saath async/await — async forEach bug',
              why: "ids.forEach(async id => await process(id)) — forEach async callbacks ko await nahi karta — code continue ho jaata hai.",
              fix: 'for...of loop use karo sequential ke liye. Promise.all(ids.map(async id => process(id))) parallel ke liye.',
            },
          ]}
          proTip="Top-level await ES2022 mein ES modules mein available hai: const data = await fetch(url).then(r => r.json()) — directly at module level, IIFE ke bina! CommonJS (Node.js default) mein IIFE ya async function wrapper use karo."
          demo={
            <DiffBlock
              title="Callback Hell vs async/await — Night and Day"
              language="javascript"
              bad={{
                code: `// Callback Hell — Pyramid of Doom
getUser(userId, (err, user) => {
  if (err) return handleError(err)
  getOrders(user.id, (err2, orders) => {
    if (err2) return handleError(err2)
    getPayments(user.id, (err3, payments) => {
      if (err3) return handleError(err3)
      sendSummary(user, orders, payments, (err4) => {
        if (err4) return handleError(err4)
        console.log('Done!')
      })
    })
  })
})`,
                label: 'Callback Hell — Deeply Nested',
                explanation: 'Error handling har level pe, hard to read/test/debug',
              }}
              good={{
                code: `// async/await — Flat and Clean
async function processUser(userId) {
  try {
    const user = await getUser(userId)
    const [orders, payments] = await Promise.all([
      getOrders(user.id),
      getPayments(user.id),
    ])
    await sendSummary(user, orders, payments)
    console.log('Done!')
  } catch (err) {
    handleError(err)
  }
}`,
                label: 'async/await — Flat & Readable',
                explanation: 'Ek try/catch, parallel where possible, linear reading',
              }}
            />
          }
        />
      </div>

      {/* Card 5: Promise Combinators */}
      <div id="promise-combinators">
        <ConceptCard
          title="Promise Combinators — all, race, allSettled, any"
          emoji="🎯"
          difficulty="intermediate"
          whatIsIt="Promise combinators multiple promises handle karne ke liye hain. Promise.all: sab fulfill ho toh succeed, koi ek fail ho toh reject. Promise.allSettled: sab settle ho, result har ek ka — success ya failure. Promise.race: jo pehle settle ho uska result. Promise.any: jo pehle fulfill ho uska result — rejections ignore karta hai (AggregateError agar sab reject)."
          whenToUse={[
            'Promise.all: multiple API calls parallel mein, sab zaruri hain',
            'Promise.allSettled: partial failures OK hain — har result chahiye',
            'Promise.race: timeout implementation — fetch vs timeout race',
            'Promise.any: fastest working server find karo — multiple CDNs try karo',
          ]}
          whyUseIt="Ye combinators real-world async patterns solve karte hain. Dashboard: sab widgets parallel load — Promise.all. Report generation: kuch sources fail ho sakti hain but report partially generate honi chahiye — allSettled. CDN fallback: pehla working CDN use karo — Promise.any. API timeout: race ke saath implement karo."
          howToUse={{
            filename: 'promise-combinators.js',
            language: 'javascript',
            code: `// ── Promise.all — All or Nothing ─────────────────────
async function getDashboardData(userId) {
  // All required — ek fail = sab fail
  const [user, orders, analytics] = await Promise.all([
    User.findById(userId),
    Order.find({ userId }),
    Analytics.getMetrics(userId),
  ])
  return { user, orders, analytics }
}

// ── Promise.allSettled — Partial Success OK ──────────
async function getReportData(sources) {
  const results = await Promise.allSettled(
    sources.map(src => fetchFromSource(src))
  )

  const successful = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value)

  const failed = results
    .filter(r => r.status === 'rejected')
    .map(r => r.reason.message)

  console.log(\`\${successful.length} succeeded, \${failed.length} failed\`)
  return { data: successful, errors: failed }
}

// ── Promise.race — Timeout Pattern ───────────────────
function withTimeout(promise, ms, message = 'Operation timed out') {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(message)), ms)
  )
  return Promise.race([promise, timeout])
}

// Fetch with 5 second timeout
const data = await withTimeout(
  fetch('/api/heavy-query'),
  5000,
  'API call timed out — try again'
)

// ── Promise.any — First Success ───────────────────────
async function fetchFromFastestCDN(path) {
  const cdns = [
    'https://cdn1.example.com',
    'https://cdn2.example.com',
    'https://cdn3.example.com',
  ]

  try {
    const data = await Promise.any(
      cdns.map(cdn => fetch(cdn + path).then(r => r.json()))
    )
    return data
  } catch (err) {
    // AggregateError — sab CDN fail ho gaye!
    if (err instanceof AggregateError) {
      throw new Error('All CDNs failed: ' + err.errors.map(e => e.message).join(', '))
    }
    throw err
  }
}

// ── Chaining combinators ──────────────────────────────
async function robustDataFetch(userIds) {
  // Phase 1: Get all users (required)
  const users = await Promise.all(userIds.map(id => User.findById(id)))

  // Phase 2: Get supplementary data (optional)
  const enrichResults = await Promise.allSettled(
    users.map(user => enrichUserData(user))
  )

  return users.map((user, i) => ({
    ...user,
    extra: enrichResults[i].status === 'fulfilled'
      ? enrichResults[i].value
      : null,
  }))
}`,
            explanation: 'allSettled result.status === "fulfilled" / "rejected" check karo. race timeout pattern standard implementation hai — kisi bhi async operation ka timeout. any AggregateError throw karta hai agar sab reject ho — catch karo. Combinators chain karo complex scenarios ke liye.',
          }}
          realWorldScenario="E-commerce checkout: Promise.all([validateInventory(items), processPayment(total), updateUserAddress(address)]) — sab zaruri. Product page: Promise.allSettled([fetchReviews(id), fetchRecommendations(id)]) — optional data. Health check: Promise.any([primaryDB.ping(), replicaDB.ping()]) — koi bhi respond kare."
          commonMistakes={[
            {
              mistake: 'Promise.all mein ek failure se sab kuch fail karna jab partial success OK hai',
              why: 'Dashboard mein ek widget fail ho — sab crash ho jaata hai bina user ke useful data dikhaye.',
              fix: 'Promise.allSettled use karo aur per-result error handle karo. Partial data show karo error indicator ke saath.',
            },
            {
              mistake: 'Promise.any ko all successful results ki umeed rakhna',
              why: 'Promise.any sirf pehla successful result deta hai — baaki promises ignore hote hain (lekin run karte hain).',
              fix: 'Sab results chahiye? allSettled use karo. Koi ek chahiye jo succeed kare? any use karo.',
            },
          ]}
          proTip="AbortController ke saath cancellable fetch: const controller = new AbortController(); fetch(url, { signal: controller.signal }); controller.abort() — Promise immediately reject hoti hai AbortError ke saath. Timeout + abort combine karo better UX ke liye."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 10 Quiz — Asynchronous JavaScript
          </h3>
          <p className="text-sm text-[#71717A]">5 questions — 80%+ chahiye! Async JS ka final boss clear karo!</p>
        </div>
        <QuizSection questions={quizQuestions} chapterSlug="async-js" />
      </div>
    </div>
  )
}
