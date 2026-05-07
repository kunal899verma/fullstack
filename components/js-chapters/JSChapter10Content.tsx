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

// ── Diagram ───────────────────────────────────────────────────────────────────

function EventQueueDiagram() {
  const queues = [
    {
      label: '① Synchronous Code',
      sublabel: 'console.log(), math, assignments',
      note: 'Runs first — Call Stack, blocks everything',
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      border: 'rgba(245,158,11,0.3)',
      icon: '🔄',
    },
    {
      label: '② Microtask Queue',
      sublabel: 'Promise.then() / queueMicrotask()',
      note: 'Runs second — ALL microtasks drain before any macrotask',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.1)',
      border: 'rgba(124,58,237,0.3)',
      icon: '⚡',
    },
    {
      label: '③ Macrotask Queue',
      sublabel: 'setTimeout() / setInterval() / I/O callbacks',
      note: 'Runs last — one task per event loop tick',
      color: '#F97316',
      bg: 'rgba(249,115,22,0.1)',
      border: 'rgba(249,115,22,0.3)',
      icon: '⏰',
    },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Event Loop — Execution Priority Order</p>
      <div className="max-w-lg mx-auto space-y-2">
        {queues.map((item, i) => (
          <div key={i}>
            <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-[#A1A1AA] mt-0.5">{item.sublabel}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{item.note}</p>
              </div>
            </div>
            {i < queues.length - 1 && <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓</span></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

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
          Asynchronous JavaScript — Event Loop Aur Uske Secrets
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          JavaScript single-threaded hai — ek time mein ek kaam. Toh phir ye kaise karta hai ek saath API call, timers, user events? Event loop! Ye JavaScript ka sabse misunderstood concept hai. Aur is pe based hai poora async world — callbacks, Promises, async/await. Ye sab ek ladder pe hain — har step pehle se better.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Sawaal: setTimeout(fn, 0) immediately execute hota hai? Jawab: NAHI! Ye macrotask queue mein jaata hai. Promise.then microtask queue mein jaata hai. Microtasks macrotasks se pehle execute hote hain. Is ek concept se poore async output order questions solve ho jaate hain — interview ka game-changer!
        </p>
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)' }}
        >
          <p className="text-sm text-[#A1A1AA]">
            <span className="text-[#F59E0B] font-semibold">Interview trap alert!</span> setTimeout(()=&gt;log("A"), 0); Promise.resolve().then(()=&gt;log("B")); log("C") — kya print hoga? Answer: C B A. Sync pehle, phir microtasks (Promise), phir macrotasks (setTimeout). Ye rule yaad karo, sab solve ho jaayega!
          </p>
        </div>
      </div>

      <EventQueueDiagram />

      {/* Card 1: Why Async — Event Loop Basics */}
      <div id="why-async">
        <ConceptCard
          title="Why Async? — Blocking vs Non-Blocking"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="JavaScript single-threaded hai — call stack pe ek time mein sirf ek function execute hota hai. Toh phir async kaise kaam karta hai? Event loop! JS engine I/O operations browser/Node.js ke lower layers (libuv) ko delegate karta hai. Main thread free rehta hai. Jab I/O ready hoti hai, callback queue ya microtask queue mein daal deta hai. Event loop check karta hai — call stack khaali hai? Queue mein kuch hai? Execute karo! Yahi concurrency without parallelism hai. Microtask queue (Promises, queueMicrotask) ka priority macrotask queue (setTimeout, I/O) se zyada hai — ek bhi macrotask execute hone se pehle sab microtasks drain ho jaate hain."
          whenToUse={[
            'Network requests: fetch, axios — hamesha async, synchronous network call nahi hoti',
            'File I/O: fs.promises.readFile — server mein async mandatory, readFileSync server block karta hai',
            'Database queries: hamesha async — Mongoose, Prisma, Sequelize sab Promises return karte hain',
            'Timers: setTimeout, setInterval — async, microtask ya macrotask queue mein jaate hain',
          ]}
          whyUseIt="Blocking I/O mein server ek request ke liye ruka rehta hai — doosre requests starve hote hain. Non-blocking mein server I/O bhejta hai, immediately next request handle karta hai, jab I/O complete ho callback/Promise se result leta hai. Yahi Node.js ko C10K problem solve karne deta hai — thousands of concurrent connections bina threads ke. Ye model samajhna performance optimization ka foundation hai."
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
            explanation: 'Ye order memorize karo — ye interview ka sab se classic question hai: (1) Sync code poora run hota hai — "1: Synchronous" aur "2: Also Synchronous". (2) Microtask queue drain hota hai — Promise.then aur queueMicrotask — "3: Promise", "3.2: queueMicrotask", "3.5: Second microtask". (3) Macrotask queue se ek task — "4: setTimeout". Rule: Call stack khaali ho → microtasks sab khatam karo → phir ek macrotask. Ye cycle hai event loop ka.',
          }}
          realWorldScenario="Express server mein: ek request database query pe wait kar rahi hai (async), doosri request uske beech aa jaati hai — event loop usse handle kar leta hai. Blocking nahi hota. Ye isliye Node.js 10,000+ concurrent connections handle kar sakta hai — ek thread pe, bina multi-threading ke. Ye Node.js ka power hai."
          commonMistakes={[
            {
              mistake: 'Server code mein synchronous APIs use karna',
              why: 'fs.readFileSync, crypto.scryptSync main thread block karte hain — sab requests wait karte hain jab tak ye run ho. Production disaster!',
              fix: 'Hamesha async versions: fs.promises.readFile, util.promisify(crypto.scrypt). Server code mein Sync APIs strict no — rule follow karo.',
            },
            {
              mistake: 'setTimeout(fn, 0) ko immediately execute samajhna',
              why: 'setTimeout(fn, 0) macrotask queue mein jaata hai — current synchronous code khatam ho, phir sab microtasks, tab jaake ye execute hoga.',
              fix: "Truly immediate async ke liye: Promise.resolve().then(fn) ya queueMicrotask(fn) — microtask queue mein jaate hain. setTimeout 0 genuinely 'last mein karo' ke liye use karo.",
            },
          ]}
          proTip="Node.js specific: process.nextTick() microtask queue se bhi PEHLE run karta hai — even before Promise.then! Ye Node.js ka special queue hai. setImmediate() I/O callbacks ke baad run karta hai. Order: process.nextTick → Promise microtasks → setImmediate → setTimeout. Ye order Node.js performance tuning mein matter karta hai. Recursive process.nextTick() starvation cause kar sakta hai — production mein careful!"
        />
      </div>

      {/* Card 2: Callbacks */}
      <div id="callbacks">
        <ConceptCard
          title="Callbacks — The Beginning"
          emoji="📞"
          difficulty="intermediate"
          whatIsIt="Callback — ek function jo dusre function ko argument ke roop mein pass kiya jaata hai, aur jab kaam complete ho tab call hota hai. Ye JavaScript async ka purana tarika hai — aaj bhi event listeners mein hamesha use hota hai. Node.js ka error-first callback convention: callback(error, data) — pehla argument hamesha error (null agar success), doosra actual data. Ye convention isliye bana kyunki agar error argument nahi hota toh developers bhool jaate the error check karna. Callback hell ya 'pyramid of doom' — nested callbacks ek ke andar ek — ye padhne wala thak jaata hai. Isi wajah se Promises aaye."
          whenToUse={[
            'Node.js core APIs: fs, http, crypto — in ka traditional API callback-based hai',
            'Event listeners: addEventListener — ye permanently callback pattern use karta hai',
            'setTimeout, setInterval — callback-based timers',
            'Legacy code: purani Node.js codebases — inhe padhna aur samajhna zaroori hai',
          ]}
          whyUseIt="Callbacks JavaScript ka foundation hain — Promises aur async/await internally callbacks pe built hain. Error-first convention ensure karta hai errors silently swallow nahi hote — pehla argument hamesha check karo. util.promisify se purani callback-based APIs ko modern async/await ke saath use karo. Ye samajhna zaroori hai legacy code ke liye aur Node.js source code padhne ke liye."
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
            explanation: 'Error-first pattern trace karo: pehla check — if(error) return — nahi toh data undefined hoga aur JSON.parse crash. Callback hell pyramid dekhao — har level ek indentation andar. 4 nested callbacks = 4 levels deep = unreadable. util.promisify magic: fs.readFile ek callback function hai → readFile(path, cb) → promisify se readFile Promise return karne laga → await se flat code! Yahi evolution hai callbacks se Promises tak.',
          }}
          realWorldScenario="Node.js fs, http, crypto modules traditionally callback-based hain. AWS SDK v2, older database drivers callbacks use karte hain. util.promisify se inhe modern async/await ke saath use karo — purana code modernize karo. EventEmitter (socket.io events, file watcher) permanently callbacks use karte hain — ye pattern kabhi nahi jaayega."
          commonMistakes={[
            {
              mistake: 'Error argument ignore karna — sirf data ke saath kaam karna',
              why: 'fs.readFile(path, (err, data) => { JSON.parse(data) }) — agar file nahi mili, err set hai, data undefined. JSON.parse crash!',
              fix: 'Hamesha pehle if(err) check karo. Error-first convention ko respect karo — yahi Node.js ka foundation hai.',
            },
            {
              mistake: 'Error handle karke return karna bhoolna',
              why: 'if(err) { handleError(err) } doNextThing(data) — return nahi kiya toh dono run hote hain! handleError ke baad bhi doNextThing chalta hai.',
              fix: 'if(err) { handleError(err); return; } — return mandatory hai early exit ke liye. Ye classic Node.js bug hai.',
            },
          ]}
          proTip="Modern Node.js mein fs.promises namespace hai — fs.promises.readFile, fs.promises.writeFile — natively Promises return karte hain. Naye code mein hamesha fs.promises use karo. Legacy APIs ke liye util.promisify — ek line mein callback to Promise. Node.js 10+ mein ye standard approach hai. Callback hell kabhi mat banao — ek nazar mein padh lene wala code likho."
        />
      </div>

      {/* Card 3: Promises */}
      <div id="promises">
        <ConceptCard
          title="Promises — States, Chaining & Errors"
          emoji="🤝"
          difficulty="intermediate"
          whatIsIt="Promise ek object hai jo future value represent karta hai — teen states: pending (kaam chal raha hai), fulfilled (success), rejected (failure). Ek baar settled hone ke baad state change nahi hoti — ye immutable hai! .then() fulfilled value handle karta hai, .catch() rejection handle karta hai, .finally() hamesha run karta hai (success ya failure). Chaining ka magic: har .then() ek naya Promise return karta hai — isliye .then().then().then() flat chain possible hai. Error propagation automatic hai — chain mein koi bhi .then() throw kare, seedha .catch() pe jump karta hai, beech ke sab .then() skip."
          whenToUse={[
            'Async operations jo ek result produce karte hain — API calls, file reads, database queries',
            'new Promise(): callback-based APIs ko Promise mein wrap karna',
            '.then() chaining: sequential transformations — flat, readable',
            'Promise.all, allSettled, race, any — multiple Promises coordinate karna',
          ]}
          whyUseIt="Promises callback hell solve karte hain — nested callbacks ki jagah flat .then() chain. Error propagation automatic hai — ek jagah .catch() chain ke kisi bhi point se errors pakad leta hai. async/await Promises ke upar built hai — Promises samjhe toh async/await automatically samajh aayega. Composable hain — Promise.all, race, allSettled powerful parallel patterns dete hain."
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
            explanation: 'Promise chaining trace karo: fetch() Promise return karta hai. Pehla .then(response => ...) — response check karo, ok nahi toh throw. throw kiya toh chain mein baaki sab .then() skip ho jaate hain, seedha .catch() pe jaata hai. Return response.json() — ye bhi Promise hai, isliye next .then() uski resolved value milti hai — user object. User se aur ek fetch — orders. Finally(): hamesha run hota hai — setLoading(false) chahiye success mein bhi, failure mein bhi. Ye pattern perfect hai!',
          }}
          realWorldScenario="React data fetching: useEffect(() => { fetchUser(id).then(setUser).catch(setError).finally(() => setLoading(false)) }, [id]) — ek clean chain. Node.js API route: UserModel.findById(id).then(user => OrderModel.find({userId: user.id})).then(orders => res.json({user, orders})).catch(next) — Express next() error middleware ko bhejta hai."
          commonMistakes={[
            {
              mistake: 'Promise nesting — .then() ke andar .then() — callback hell wapas!',
              why: '.then(() => { return fetch().then(() => fetch().then(...)) }) — pyramid of doom waapas! Return bhool gaye bahar.',
              fix: 'Return karo Promises from .then() — chain flat rehti hai: .then(() => fetch()).then(() => anotherFetch()). Ya seedha async/await use karo.',
            },
            {
              mistake: '.catch() lagana bhool jaana',
              why: 'Unhandled Promise rejection — Node.js 15+ mein process crash ho jaata hai! Pehle warning tha, ab crash.',
              fix: 'Hamesha .catch() lagao chains mein. async/await ke saath try/catch use karo. Global: process.on("unhandledRejection", (reason) => { /* log karo aur gracefully shutdown karo */ }).',
            },
          ]}
          proTip="Sawaal: kya async function return karke Promise return karta hai? Jawab: HAAN! async function ke andar return 42 likho — caller ko Promise<42> milta hai — automatically wrapped. Throw karo — Promise reject hoti hai. Ye samajhne se async/await ka mental model clear ho jaata hai. Promise.resolve(value) immediately resolved promise — testing mein useful. Promise.reject(new Error()) immediately rejected."
        />
      </div>

      {/* Card 4: async/await */}
      <div id="async-await">
        <ConceptCard
          title="async/await — Promises Ka Clean Syntax"
          emoji="⏳"
          difficulty="intermediate"
          whatIsIt="async/await — Promises ka syntactic sugar. Lekin kitna powerful sugar hai! async keyword function ke pehle lagao — wo automatically Promise return karta hai. await keyword kisi bhi Promise ke pehle lagao — wo Promise resolve hone ka wait karta hai, aur code synchronous jaisa lagta hai. Lekin ek BADA trap hai: sequential await! Sawaal: do independent API calls ko sequentially await karo — kya problem hai? Jawab: doosri call pehli khatam hone ka wait karti hai — total time = sum of both. Promise.all se parallel chalao — total time = max of both. HUGE performance difference! Ye ek common interview aur production bug hai."
          whenToUse={[
            'Hamesha Promise .then() chains pe prefer karo — zyada readable, zyada debuggable',
            'Sequential operations: pehla result aane ke baad doosra operation karo — await chain',
            'Error handling: try/catch familiar pattern — same syntax as synchronous code',
            'Parallel independent operations: await Promise.all([op1(), op2()]) — kabhi sequentially await mat karo independent ops ko',
          ]}
          whyUseIt="async/await code synchronous ki tarah padha jaata hai — sab line by line, upar se neeche. Debugging mein stack traces better hote hain — async aur Promise.then() chains se more meaningful. try/catch se error handling familiar aur clean hai. Lekin Promise.all seekhna mandatory hai — sequential trap production mein slow APIs ka common root cause hai!"
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
            explanation: 'Sequential trap clearly dekhao: user fetch (200ms) → products fetch (150ms) → settings fetch (100ms) = 450ms total. Parallel: teen sath start hote hain → 200ms maximum = 200ms total. 2.25x faster! Production mein ye difference 3 second API se 1.3 second ban sakti hai — user experience dramatic improvement. forEach async bug: forEach return value ignore karta hai — async callback ka Promise catch nahi hota. for...of properly await karta hai. Promise.all parallel ke liye — best of both worlds.',
          }}
          realWorldScenario="Express profile API: async function getProfile(req, res) { try { const [user, posts, followers] = await Promise.all([User.findById(id), Post.find({userId: id}), Follower.count({userId: id})]); res.json({ user, posts, followers }) } catch(err) { next(err) } } — teen DB queries parallel! Sequential hota toh 3x slow hota."
          commonMistakes={[
            {
              mistake: 'Independent operations sequentially await karna — parallel trap',
              why: 'const a = await op1(); const b = await op2() — op2 op1 khatam hone ka wait karta hai. Independent hain toh kyun wait?',
              fix: 'const [a, b] = await Promise.all([op1(), op2()]) — dono parallel mein. Hamesha: independent operations = Promise.all.',
            },
            {
              mistake: 'forEach ke saath async/await — silent bug',
              why: "ids.forEach(async id => await process(id)) — forEach async callback ka Promise await nahi karta! Code aage chal jaata hai before processing done.",
              fix: 'Sequential ke liye: for (const id of ids) { await process(id) }. Parallel ke liye: await Promise.all(ids.map(id => process(id))). forEach async ke liye kabhi use mat karo.',
            },
          ]}
          proTip="Top-level await ES2022 mein ES modules mein available hai — const data = await fetch(url).then(r => r.json()) seedha module level pe. CommonJS (Node.js default) mein ye kaam nahi karta — async function mein wrap karo ya IIFE: (async () => { const data = await fetchData() })(). Node.js mein .mjs ya package.json mein 'type: module' set karo top-level await ke liye."
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
          whatIsIt="Promise combinators — 4 powerful tools jo multiple Promises ko coordinate karte hain. Promise.all: sab fulfill ho toh array of results, koi bhi reject ho toh immediately reject — all or nothing. Promise.allSettled: sab settle karne ka wait karo regardless — fulfilled ya rejected, har ek ka result deta hai — partial success pattern. Promise.race: jo pehle settle ho, uska result (fulfilled ya rejected) — timeout implementation ka perfect tool. Promise.any: jo pehle FULFILL ho, uska result — rejections ignore karta hai, sab reject hoin toh AggregateError. Sawaal: all aur allSettled mein exact fark? Jawab: all ek rejection pe immediately fail, allSettled hamesha sab complete karta hai — partial data chahiye toh allSettled."
          whenToUse={[
            'Promise.all: dashboard data — sab APIs zaruri hain, ek fail toh sab fail — ok hai',
            'Promise.allSettled: partial failures acceptable — har result chahiye, fail hua toh fallback data use karo',
            'Promise.race: timeout implementation — fetch vs timeout promise race — jo pehle settle ho',
            'Promise.any: fastest CDN, fastest server — pehla successful response use karo',
          ]}
          whyUseIt="Ye 4 combinators real-world async patterns solve karte hain. Bina inke har case ke liye manual logic likhna padta. Promise.all parallel execution deta hai — sequential se dramatically faster. allSettled graceful degradation enable karta hai — partial data better than nothing. race timeout pattern industry standard hai. any fallback/redundancy implement karta hai."
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
            explanation: 'allSettled — result.status check karo: "fulfilled" ya "rejected". Successful: result.value. Failed: result.reason. race timeout pattern trace karo: fetch("/api/heavy-query") race karo timeoutPromise ke saath. Jo pehle settle ho — agar timeout pehle reject karta hai, race reject hoti hai. Agar fetch pehle fulfill karta hai — race fulfill hoti hai. any CDN example: teen CDN parallel start hote hain — jo pehle respond kare, uska data milta hai. Sab fail hoin — AggregateError mein sab errors.',
          }}
          realWorldScenario="E-commerce checkout: Promise.all([validateInventory(items), processPayment(total), updateUserAddress(address)]) — sab zaruri hain, ek fail toh rollback. Product page: Promise.allSettled([fetchReviews(id), fetchRecommendations(id), fetchSimilarProducts(id)]) — optional sections, ek fail toh section hide karo. Microservices health check: Promise.any([primaryDB.ping(), replicaDB.ping()]) — koi bhi live ho toh app run karo."
          commonMistakes={[
            {
              mistake: 'Promise.all use karna jab partial success acceptable ho',
              why: 'Dashboard mein analytics fail ho — Promise.all se user ka aur sara data bhi fail ho jaata hai. Bad UX!',
              fix: 'Promise.allSettled use karo — har result individually handle karo. Jo data aaya show karo, jo nahi aaya uski jagah fallback UI.',
            },
            {
              mistake: 'Promise.any se sab results ki umeed rakhna',
              why: 'Promise.any sirf PEHLA successful result deta hai — baaki Promises run karte rehte hain but results ignore hote hain.',
              fix: 'Sirf ek successful response chahiye (fastest CDN, fastest server) — any use karo. Sab results chahiye — allSettled use karo.',
            },
          ]}
          proTip="AbortController se cancellable fetch banao: const controller = new AbortController(); const promise = fetch(url, { signal: controller.signal }); controller.abort() — Promise reject hoti hai AbortError ke saath. Race ke saath combine karo: Promise.race([fetch(url, {signal}), timeout(5000)]).catch(err => { if (err.name === 'AbortError') ... }). Ye production-grade timeout + cancel pattern hai!"
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
