'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function AsyncEvolutionDiagram() {
  const steps = [
    {
      label: 'Callbacks',
      sublabel: 'readFile(path, (err, data) => { ... })',
      note: 'Error-first convention, deeply nested, hard to follow',
      color: '#EF4444',
      bg: 'rgba(239,68,68,0.1)',
      border: 'rgba(239,68,68,0.3)',
      icon: '📞',
      complexity: '████████░░',
    },
    {
      label: 'Promises',
      sublabel: 'readFile(path).then(data => ...).catch(err => ...)',
      note: 'Chainable, single .catch(), but .then() nesting possible',
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      border: 'rgba(245,158,11,0.3)',
      icon: '🤝',
      complexity: '█████░░░░░',
    },
    {
      label: 'async / await',
      sublabel: 'const data = await readFile(path)',
      note: 'Linear code, try/catch, reads like synchronous — cleanest!',
      color: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
      border: 'rgba(16,185,129,0.3)',
      icon: '✨',
      complexity: '██░░░░░░░░',
    },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Async Callbacks — Visual Overview</p>
      <div className="max-w-lg mx-auto space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <div className="rounded-xl px-5 py-3.5 flex items-start gap-4" style={{ background: step.bg, border: `1px solid ${step.border}` }}>
              <span className="text-xl mt-0.5">{step.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className="font-bold text-sm" style={{ color: step.color }}>{step.label}</p>
                  <p className="text-[10px] font-mono tracking-wider" style={{ color: step.color }}>{step.complexity}</p>
                </div>
                <p className="text-[11px] font-mono text-[#A1A1AA]">{step.sublabel}</p>
                <p className="text-[10px] text-[#71717A] mt-0.5">{step.note}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1 items-center gap-1">
                <span className="text-[#71717A] text-[10px]">evolves →</span>
                <span className="text-[#71717A] text-xs">↓</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-[#52525B] text-center mt-3">Complexity bar: more filled = more boilerplate code</p>
    </div>
  )
}

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
            await bhool gaye? Congratulations — tumne ek silent bug banaya!
          </h2>
        </div>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ye chapter NodeMaster ka dil hai. <strong className="text-[#F5F5F7]">Agar ye samajh aa gaya, baki sab samajh aa jaega.</strong> Async programming Node.js ki superpower hai — lekin galat samjho toh sabse bada headache bhi yahi hai. const user = fetchUser() — await nahi! user ek Promise object hai, user.name undefined. Koi error nahi, koi warning nahi — sirf wrong behavior. Ye async programming ka most common gotcha hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Hum seedha dive karenge: Callbacks se shuru, Promises tak, phir async/await tak. Har ek mein real gotchas aur patterns dekhenge — sirf syntax nahi, depth mein samjhenge.
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

      <AsyncEvolutionDiagram />

      {/* ── ConceptCard 1: Callbacks ─────────────────────────────────────── */}
      <div id="callbacks">
        <ConceptCard
          title="Callbacks — Sab Kuch Yahan Se Shuru Hua"
          emoji="📞"
          difficulty="intermediate"
          whatIsIt="Callbacks JavaScript mein first-class functions hone ka direct consequence hain — functions ko arguments ki tarah pass kar sakte ho. Aur Node.js ne ye concept use karke ek poora async system banaya. Error-first callback convention yaad karo: callback(err, data) — err pehle, data baad mein. err null hai? Success. Nahi hai? Error handle karo. Ye sirf convention nahi, ye guarantee hai — har Node.js core API yahi follow karta hai. Agar tum err check karna bhool jaao, silent failures aati hain jo debug karna nightmare hota hai!"
          whenToUse={[
            'Event listeners — jab user click kare, scroll kare',
            'Simple async operations jahan chaining nahi chahiye',
            'Third-party libraries jo callback style use karti hain (legacy code)',
            'Node.js core APIs — fs, http, crypto — sab traditionally callbacks use karte hain',
          ]}
          whyUseIt="Callback hell kab hoti hai? Jab ek async operation doosre par depend kare jo teesre par depend kare. Depth badhti jaati hai — code sideways jaata hai, indentation nightmare. Error handling har level par duplicate. Ab ye compare karo Promise chain se — linear, ek .catch() sab handle karta hai. Callbacks samajhna zaroori hai legacy code ke liye, lekin naya code mein Promises ya async/await use karo. Aur util.promisify() — ye hidden gem hai jo kisi bhi callback function ko ek line mein Promise mein convert kar deta hai!"
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
          realWorldScenario="Legacy codebase modernize karna common task hai. AWS SDK v2, purana MongoDB driver, old Express middleware — sab callback style. Strategy: util.promisify() se ek-ek function ko Promise mein wrap karo. Phir async/await se use karo. Ek baar wrap karne ke baad, rest of the code modern ho jaata hai bina original library change kiye. Ye incremental migration approach hai — ek dum poori codebase nahi badalni, phir bhi benefits milti hain!"
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
          proTip="Callbacks mein throw karna forbidden hai — yaad karo! async callback ke andar throw kiya? Uncaught exception, process crash. Ye ek very common mistake hai beginners mein. Fix: errors ko callback ke through pass karo — callback(error). Ya Promises/async/await use karo jahan throw karna natural hai. Aur util.promisify() ko bookmark karo — const readFileAsync = util.promisify(fs.readFile) — ek line mein legacy to modern!"
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
          whatIsIt="Promise ek 'future ka dabba' hai — andar kuch hai lekin abhi nahi milega, thodi der baad milega ya error milega. Teen states hain: pending (kaam chal raha hai), fulfilled (success, value hai), rejected (kuch gadbad hui). Ek baar settled (fulfilled ya rejected) — state kabhi nahi badlti! Immutable. Ye guarantee hai — Promise resolved ho gayi? Wahi value hamesha milegi, koi cheez change nahi kar sakti. Ye Promises ko callbacks se zyada predictable banata hai!"
          whenToUse={[
            'Async operations chain karne ke liye — ek ke baad ek',
            'Multiple parallel operations run karni hon — Promise.all()',
            'Callback-style APIs ko modern code mein wrap karne ke liye',
            'Error handling centralize karni ho — single .catch()',
          ]}
          whyUseIt=".then() ke andar return mat bhoolna — ye bahut common bug hai! .then(user => { getOrders(user.id) }) — return nahi! Agle .then() mein undefined aayega. Sahi: .then(user => getOrders(user.id)) — implicit return, ya { return getOrders(user.id) }. Promise chain mein har .then() naya Promise return karna chahiye — yahi chain banata hai. .catch() kahan bhi error ho wahan pakadta hai — ek handler sab errors. .finally() cleanup ke liye — success ya failure dono mein chalega!"
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
          realWorldScenario="Prisma, Mongoose, Redis, fetch — sab Promises return karte hain. Ye JS ecosystem ka standard ban gaya hai 2017 ke baad. Jab tum await prisma.user.findMany() likhte ho — internally ek Promise resolve ho rahi hai. Sab libraries ne callbacks chhode, Promises adopt kiye. Isliye Promises samajhna fundamental hai — async/await bhi Promises ke upar hi build hai. async/await sirf nicer syntax hai, Promises replace nahi karte!"
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
          proTip="Unhandled Promise rejection — ye production mein scary bug hai! Node.js newer versions mein unhandled rejection process crash kar deta hai. Isliye hamesha .catch() lagao chain ke end mein. Ya global handler: process.on('unhandledRejection', (reason) => { console.error(reason); }). Ye fallback hai — har Promise handle karo properly, ye sirf last resort hai. Aur Promise chaining mein always return karo — ye rule tattoo karwa lo!"
          demo={<PromiseStateMachine />}
        />
      </div>

      {/* ── ConceptCard 3: async/await ──────────────────────────────────── */}
      <div id="async-await">
        <ConceptCard
          title="async/await — Synchronous Feel, Async Power"
          emoji="⏳"
          difficulty="intermediate"
          whatIsIt="async/await — ye dono keywords milke ek illusion create karte hain: async code synchronous jaisa dikhta hai! lekin andar se wahi Promises hain. async keyword function ke pehle laga do — woh hamesha Promise return karega. await kisi bhi Promise ke pehle laga do — woh Promise resolve hone ka wait karega, lekin main thread freeze nahi hogi (Event Loop chalta rehta hai). Ye syntactic sugar hai Promises ke upar — syntax alag, behavior same. Ek common mistake: await bhool jaana. const user = fetchUser() — Promise object hai, value nahi. user.name? Undefined. Koi error nahi — silent bug!"
          whenToUse={[
            'Complex async flows jo multiple steps involve karte hain',
            'Error handling ko try/catch se clean rakhna ho',
            'Loops mein async operations — for...of with await',
            'Readable, maintainable async code likhna ho',
          ]}
          whyUseIt="Sequential awaits vs parallel — ye performance ka sabse bada trap hai! const a = await fn1(); const b = await fn2() — total time: t1 + t2. Unnecessary! fn2 fn1 pe depend nahi karta, lekin wait karta hai. Fix: const [a, b] = await Promise.all([fn1(), fn2()]) — total time: max(t1, t2). Same result, potentially 2x faster. Production API jo 3 database queries karta hai? Sequential = 300ms. Parallel = 100ms. Real-world difference 3x. Ye ek line ki change hai jo performance dramatically improve karti hai!"
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
          realWorldScenario="Ek Next.js API route — getServerSideProps mein user, orders, aur preferences teen alag database se aate hain. Junior developer ne sequential awaits likhe: 150ms + 100ms + 80ms = 330ms per page load. Code review mein Promise.all suggest kiya: 150ms (sabse slow, parallel). Page load 330ms se 150ms — ek line ka change! User experience dramatically improve hua. Ye sequential vs parallel ka real impact hai — production mein ye metrics matter karte hain!"
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
          proTip="Top-level await — ye ek modern superpower hai! ESM files (package.json mein type: module) mein seedha await likh sakte ho — koi async wrapper nahi. Database connect karo, config load karo module level par. const db = await connectDatabase() — poora module ready hone ke baad import ho jaata hai. Ye startup logic ke liye bahut elegant pattern hai. Aur try/catch mat bhoolna async functions mein — unhandled rejection production crash karta hai!"
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
          whatIsIt="Ab sab kuch ek saath aata hai! Callbacks, Promises, async/await — sab Event Loop ki wajah se kaam karte hain. Event Loop continuously check karta hai: Call Stack khaali hai? Pehle nextTick queue dekho, phir Microtask Queue (Promises), phir 6 phases (timers, I/O, poll, check, close). Ye code ka output A, D, C, B — isliye nahi ki koi magic hai, balki isliye ki Event Loop ka fixed priority order hai: Sync → nextTick → Microtasks → Macrotasks. Ye order samajhna hi advanced async debugging ka key hai — jab 'mera code wrong order mein execute ho raha hai' problem aaye, Event Loop phases yaad karo!"
          whenToUse={[
            'Jab async code unexpected order mein execute ho',
            'Performance optimization — kya event loop mein bottle neck hai?',
            'setTimeout vs setImmediate vs process.nextTick behavior samjhna',
            'Node.js monitoring — event loop lag detect karna',
          ]}
          whyUseIt="Ye complete execution trace karo: 1. Sync code chalti hai — '1. Sync' print. 2. nextTick queue drain — '2. nextTick' print. 3. Microtask queue drain — '3. Promise.then' print. 4. Event Loop phases shuru — setImmediate ya setTimeout (outside I/O mein non-deterministic). 5. I/O callback — '6. fs.readFile callback'. 6. I/O ke andar setImmediate HAMESHA setTimeout se pehle — guaranteed! Ye sequence production debugging mein bahut kaam aata hai. Unexpected async order? Event Loop phases check karo!"
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
          realWorldScenario="Unit test mein ek mysterious bug — async function test mein assertion fail ho rahi thi 'expected value not yet updated'. Event Loop phases samajhne wale developer ne turant pata kiya: assertion Promise.then() se pehle run ho rahi thi. Fix? await Promise.resolve() se microtask queue flush karo, phir assertion karo. Ye ek line fix tha — lekin sirf Event Loop ka knowledge tha toh instant pata chala. Junior developer 2 din debug kar raha tha, senior ne 5 minutes mein fix kiya. Knowledge ka fark!"
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
          proTip="Production monitoring secret: require('perf_hooks').monitorEventLoopDelay({ resolution: 20 }).enable() — ye Event Loop delay measure karta hai milliseconds mein. Normal? 5ms se kam. Warning zone? 10-50ms. Critical? 50ms+ — koi kuch block kar raha hai! Clinic.js tool se poora breakdown milta hai — kaunsa function Event Loop ko block kar raha hai. Ye tools production incidents mein debugging ko 10x fast karte hain. Aur NodeMaster ka Event Loop Visualizer check karo — har phase animated dikhta hai!"
        />
      </div>

      {/* ── ConceptCard 5: Promise combinators ─────────────────────────── */}
      <div id="promise-combinators">
        <ConceptCard
          title="Promise.all, Promise.race, Promise.allSettled"
          emoji="🎭"
          difficulty="intermediate"
          whatIsIt="Bhai, ye teeno alag kaam karte hain — confuse mat hona! Promise.all: sab complete hone ka wait, ek fail = sab fail. Promise.race: jo pehle settle ho (success ya failure), wahi milega. Promise.allSettled: sab ke results collect karo — chahe kuch fail hoon. Promise.any: pehla SUCCESS chahiye (failures ignore). Ab sawaal ye aata hai — kab kaunsa use karein? Dashboard data = Promise.all (sab chahiye). API timeout = Promise.race. Bulk email = Promise.allSettled (kuch fail ho toh bhi process). Multiple CDN fallback = Promise.any. Sahi tool, sahi kaam!"
          whenToUse={[
            'Promise.all — parallel API calls jab sab chahiye, ek bhi fail toh sab fail',
            'Promise.race — timeout implement karna, ya jab sabse fast response chahiye',
            'Promise.allSettled — sab results chahiye chahe kuch fail hoon — batch operations',
            'Promise.any — koi bhi ek succeed kare toh kaam chale (fallbacks)',
          ]}
          whyUseIt="Promise.all fail-fast behavior yaad karo — 5 mein se ek fail hua, baaki 4 ke results nahi milenge, even agar complete ho gaye. Ye sometimes problem hai. Solution: Promise.allSettled use karo jab partial failure acceptable ho. Results mein status field dekho — 'fulfilled' ya 'rejected'. Fulfilled ones ka value lo, rejected ones ko log karo ya retry karo. Ye production batch processing ka standard pattern hai — email bhejo, log karo jo fail hua, retry karo, kisi ek failure se poora batch mat rokk!"
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
          realWorldScenario="E-commerce product page sochte hain — user data, inventory, reviews, recommendations. Strategy: inventory aur user data critical hain, Promise.all se fetch karo (dono chahiye). Reviews aur recommendations optional hain — Promise.allSettled se fetch karo. Reviews fail hua? Page load hoga, sirf 'Reviews unavailable' dikhega. Recommendations fail? 'Recommended products' hide karo. Partial failure graceful degradation hai — user ko blank page nahi milega. Ye production UX pattern hai jo large companies use karti hain!"
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
          proTip="Promise.race timeout pattern — ye bahut useful hai! const fetchWithTimeout = (url, ms) => Promise.race([fetch(url), new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout!')), ms))]). External APIs pe hamesha timeout rakho — agar API hang ho jaaye toh tumhara server bhi hang ho jaayega. Promise.race ensure karta hai ki ya toh response aaye ya timeout error — koi infinite wait nahi. Production mein yeh pattern critical hai external dependencies ke saath!"
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
