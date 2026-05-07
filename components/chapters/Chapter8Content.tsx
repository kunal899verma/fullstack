'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── async/await Flow Visual ───────────────────────────────────────────────────

function AsyncFlowDiagram() {
  const steps = [
    {
      label: 'async function call',
      sublabel: 'Returns a Promise immediately',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.12)',
      border: 'rgba(124,58,237,0.35)',
      icon: '📞',
    },
    {
      label: 'await expression',
      sublabel: 'Pauses this function, event loop free',
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.12)',
      border: 'rgba(245,158,11,0.35)',
      icon: '⏸️',
    },
    {
      label: 'Promise resolves',
      sublabel: 'Value milti hai, function resume hoti hai',
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.12)',
      border: 'rgba(6,182,212,0.35)',
      icon: '✅',
    },
    {
      label: 'return value',
      sublabel: 'Automatically Promise.resolve() mein wrap',
      color: '#10B981',
      bg: 'rgba(16,185,129,0.12)',
      border: 'rgba(16,185,129,0.35)',
      icon: '📦',
    },
  ]

  return (
    <div className="my-6">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">
        async/await Under the Hood
      </p>
      <div className="max-w-md mx-auto space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <div
              className="rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ background: step.bg, border: `1px solid ${step.border}` }}
            >
              <span className="text-xl shrink-0">{step.icon}</span>
              <div>
                <p className="font-bold text-sm" style={{ color: step.color }}>{step.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{step.sublabel}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1">
                <span className="text-[#52525B] text-xs">↓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const asyncAwaitQuiz = [
  {
    question: 'async function hamesha kya return karta hai?',
    options: [
      {
        text: 'Sirf wahi value jo return statement mein likha ho',
        correct: false,
        explanation: 'async function hamesha ek Promise return karta hai — chahe tum explicitly koi value return karo ya nahi. Return value Promise.resolve() mein wrap ho jaati hai.',
      },
      {
        text: 'Hamesha ek Promise — return value automatically Promise.resolve() mein wrap hoti hai',
        correct: true,
        explanation: 'Sahi! async function ka return value hamesha Promise hota hai. Agar tum 42 return karo, caller ko Promise.resolve(42) milta hai. Agar throw karo toh Promise.reject() milta hai.',
      },
      {
        text: 'Undefined — async functions kuch return nahi karte',
        correct: false,
        explanation: 'Galat! async functions Promise return karte hain. Agar koi return statement nahi hai toh Promise.resolve(undefined) milta hai.',
      },
      {
        text: 'JSON string — async functions automatically serialize karte hain',
        correct: false,
        explanation: 'Ye bilkul galat hai. async functions Promise return karte hain, JSON nahi.',
      },
    ],
  },
  {
    question: 'await keyword ke bina async function mein kya hoga?',
    options: [
      {
        text: 'Code synchronously run hoga — koi difference nahi',
        correct: false,
        explanation: 'Function return Promise karega, lekin awaited operations wait nahi karenge. Promises return honge, values nahi — ye alag behavior hai.',
      },
      {
        text: 'await ke bina Promise object return hoga — resolved value nahi. Code theek se kaam nahi karega.',
        correct: true,
        explanation: 'Bilkul sahi! await ke bina getUser() ek Promise object return karta hai, user object nahi. Phir user.name try karo toh undefined.name — error!',
      },
      {
        text: 'JavaScript automatically await kar lega',
        correct: false,
        explanation: 'JavaScript automatic await nahi karta. await explicitly likhna padta hai. Bina await ke Promise object milta hai.',
      },
      {
        text: 'Syntax error aayega — await hamesha zaroori hai',
        correct: false,
        explanation: 'Syntax error nahi aayega — ye valid JavaScript hai. Lekin behavior galat hoga: Promise object milega, resolved value nahi.',
      },
    ],
  },
  {
    question: 'Sequential awaits vs Promise.all mein timing difference kya hoga agar dono operations 300ms-300ms lete hain?',
    options: [
      {
        text: 'Dono same time lenge — 300ms',
        correct: false,
        explanation: 'Sequential awaits mein total 600ms lagega (300+300). Promise.all mein sirf 300ms kyunki dono parallel chalte hain.',
      },
      {
        text: 'Sequential: 600ms total. Promise.all: 300ms total.',
        correct: true,
        explanation: 'Bilkul sahi! Sequential = ek ke baad ek = sum = 600ms. Promise.all = parallel = slowest ki time = 300ms. 2x speedup!',
      },
      {
        text: 'Promise.all slow hota hai kyunki overhead hota hai',
        correct: false,
        explanation: 'Promise.all ka overhead negligible hai. Benefit bahut bada hai — parallel execution se total time drastically kam hota hai.',
      },
      {
        text: 'Sequential: 300ms. Promise.all: 600ms.',
        correct: false,
        explanation: 'Ulta! Sequential mein dono ek ke baad ek chalte hain = 600ms. Promise.all mein parallel = 300ms.',
      },
    ],
  },
  {
    question: 'async/await mein error handling kaise karte hain?',
    options: [
      {
        text: '.catch() only — try/catch kaam nahi karta',
        correct: false,
        explanation: 'Dono kaam karte hain! async/await ke saath try/catch use karo — ye bahut cleaner hai. .catch() bhi kaam karta hai returned Promise par.',
      },
      {
        text: 'try/catch use karo — await ke saath thrown errors synchronous errors ki tarah catch hote hain',
        correct: true,
        explanation: 'Sahi! try/catch async/await ke saath perfect kaam karta hai. await ek rejected Promise ko throw mein convert karta hai — jo try/catch pakad leta hai.',
      },
      {
        text: 'async/await mein errors handle nahi ho sakte',
        correct: false,
        explanation: 'Bilkul galat! try/catch se easily handle hote hain. Ye async/await ka ek bada fayda hai — familiar error handling syntax.',
      },
      {
        text: 'process.on("error") se handle karo',
        correct: false,
        explanation: 'process.on("error") alag hai — uncaught exceptions ke liye. async/await errors ke liye try/catch use karo.',
      },
    ],
  },
  {
    question: 'async/await under the hood kya hai?',
    options: [
      {
        text: 'Ek completely naya async mechanism jo Promises se alag hai',
        correct: false,
        explanation: 'async/await Promises ka syntactic sugar hai — under the hood same Promise machinery use hoti hai. Koi naya mechanism nahi.',
      },
      {
        text: 'Promises ka syntactic sugar — under the hood same Promise machinery use hoti hai',
        correct: true,
        explanation: 'Bilkul sahi! async/await Promises ke upar built hai. Babel jaise transpilers async/await ko .then()/.catch() chains mein convert karte hain. Same thing, cleaner syntax.',
      },
      {
        text: 'Native OS threads use karta hai',
        correct: false,
        explanation: 'async/await OS threads nahi use karta. Ye Promises aur event loop use karta hai — same non-blocking mechanism.',
      },
      {
        text: 'Callbacks ka modern name hai',
        correct: false,
        explanation: 'async/await Promises ka sugar hai, callbacks ka nahi. Ye fundamentally alag hai — Promise chain ke upar cleaner syntax.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Chapter8Content() {
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
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Promises ki duniya, synchronous ka andaz.
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          async/await ne JavaScript async code ko synchronous-looking bana diya. .then() chains theek thi, lekin deeply nested async logic complex ho jaati thi. async/await ne ye solve kiya.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Aur sach mein — ye Promises hi hain under the hood.{' '}
          <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">async</code>{' '}
          function hamesha Promise return karta hai.{' '}
          <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">await</code>{' '}
          ek Promise ke resolve hone ka wait karta hai — event loop block kiye bina. Sikhte hain sab detail mein.
        </p>
      </div>

      {/* Flow Diagram */}
      <div id="async-flow">
        <AsyncFlowDiagram />
      </div>

      {/* ConceptCard 1: async/await Basics */}
      <div id="async-await-basics">
        <ConceptCard
          title="async/await — Promises Ka Sugar Syntax"
          emoji="🍬"
          difficulty="intermediate"
          whatIsIt="async function hamesha Promise return karta hai — chahe tum explicitly Promise return karo ya nahi. await operator ek Promise ke resolve hone ka wait karta hai — lekin event loop block nahi hota, doosre code chalte rehte hain. Ye Promises ka syntactic sugar hai — under the hood same thing hai, syntax sirf cleaner hai."
          whenToUse={[
            'Almost hamesha prefer karo raw .then() chains ke upar — readability better hai',
            'Sequential async operations jahan output depend kare',
            'try/catch se familiar error handling chahiye',
            'Complex async logic — multiple operations, conditional flows',
            'Express route handlers, middleware functions',
          ]}
          whyUseIt=".then() chains mein deeply nested async logic complex ho jaati thi. async/await se code linear aur readable dikhta hai — jaise synchronous code. Error handling try/catch se familiar hai. Debugging mein stack traces bhi better milte hain."
          howToUse={{
            filename: 'async-await-basics.js',
            language: 'javascript',
            code: `// async function — hamesha Promise return karta hai
async function fetchUserData(userId) {
  // await — Promise resolve hone ka wait karo
  const user = await getUser(userId)        // 200ms wait
  const orders = await getOrders(user.id)   // 300ms wait
  const profile = await getProfile(user.id) // 150ms wait

  return { user, orders, profile } // automatically Promise.resolve() mein wrap
}

// Use karna — async function Promise return karta hai
fetchUserData(42)
  .then(data => console.log(data))
  .catch(err => console.error(err))

// Ya doosri async function mein await karo:
async function main() {
  const data = await fetchUserData(42)
  console.log('User:', data.user.name)
}

// Arrow async function
const processOrder = async (orderId) => {
  const order = await getOrder(orderId)
  return order.total * 1.18 // GST add karo
}

// async function ka return value check karo:
const result = fetchUserData(42) // ek Promise return karta hai
console.log(result) // Promise { <pending> } — resolved value nahi!
const value = await fetchUserData(42) // ab resolved value milegi`,
            explanation: 'async keyword function ko Promise-returning bana deta hai. await sirf async function ke andar hi use hota hai. Return value automatically Promise.resolve() mein wrap hoti hai. Bina await ke Promise object milega, resolved value nahi.',
          }}
          realWorldScenario="Express route handler mein: async (req, res) => { const user = await User.findById(req.params.id); const orders = await Order.find({userId: user.id}); res.json({user, orders}); }. Sequential operations, clean code, familiar try/catch error handling."
          commonMistakes={[
            {
              mistake: 'await keyword miss kar dena — const user = getUser(id) bina await ke',
              why: 'Bina await ke user variable mein Promise object aata hai, user data nahi. Phir user.name access karo toh undefined aata hai ya error.',
              fix: 'const user = await getUser(id) — await hamesha zaroori hai. TypeScript mein ye catch hota hai, vanilla JS mein manually dhyaan rakhna padta hai.',
            },
            {
              mistake: 'await use karna async function ke bahar',
              why: 'await sirf async function ke andar hi valid hai. Top-level await sirf ES Modules mein kaam karta hai.',
              fix: 'Hamesha async function ke andar await use karo. Ya IIFE: (async () => { const data = await fetch(url); })();',
            },
          ]}
          proTip="async function ke return value ko automatically Promise.resolve() mein wrap kiya jaata hai. Agar throw karo — Promise.reject() mein. Iska matlab: async function ka caller hamesha .then()/.catch() use kar sakta hai ya await kar sakta hai."
          demo={
            <DiffBlock
              title="Promise .then() Chain vs async/await"
              language="javascript"
              bad={{
                label: 'Promise .then() Chain',
                code: `// .then() chaining — works lekin verbose
function getUserData(id) {
  return getUser(id)
    .then(user => {
      return getOrders(user.id)
        .then(orders => {
          return { user, orders }
        })
    })
    .catch(err => {
      console.error('Error:', err.message)
      throw err
    })
}`,
                explanation: 'Nested .then() chains, variables scope ke bahar available nahi (user vs orders), harder to read.',
              }}
              good={{
                label: 'async/await — Clean',
                code: `// async/await — same logic, much cleaner
async function getUserData(id) {
  try {
    const user = await getUser(id)
    const orders = await getOrders(user.id)
    return { user, orders }
    // user aur orders same scope mein!
  } catch (err) {
    console.error('Error:', err.message)
    throw err
  }
}`,
                explanation: 'Linear flow, all variables same scope mein, familiar try/catch, much easier to read and debug.',
              }}
            />
          }
        />
      </div>

      {/* ConceptCard 2: Error Handling */}
      <div id="async-error-handling">
        <ConceptCard
          title="Error Handling in async/await"
          emoji="🛡️"
          difficulty="intermediate"
          whatIsIt="async/await ke saath error handling try/catch se hoti hai — exactly jaise synchronous code mein. await ek rejected Promise ko throw mein convert karta hai, jo try/catch pakad leta hai. Ye Promises ke .catch() se zyada readable hai aur stack traces bhi better hote hain."
          whenToUse={[
            'Har async function mein — unhandled rejections se bachne ke liye',
            'Express routes mein — errors next() tak pahunchane ke liye',
            'Specific errors differently handle karna ho — multiple catch blocks ya instanceof check',
            'Cleanup code finalize karna ho chahe success ho ya failure',
          ]}
          whyUseIt="Bina error handling ke async function crashes silently ya unhandled rejection throw karta hai. try/catch se errors control mein rehte hain. Express ke liye asyncHandler wrapper use karo — route handler mein try/catch har baar likhne ki zarurat nahi."
          howToUse={{
            filename: 'async-error-handling.js',
            language: 'javascript',
            code: `// Basic try/catch
async function fetchUser(id) {
  try {
    const user = await User.findById(id)
    if (!user) throw new Error('User not found')
    return user
  } catch (err) {
    if (err.name === 'CastError') {
      throw new Error('Invalid user ID format')
    }
    throw err // re-throw agar handle nahi kiya
  }
}

// Express asyncHandler wrapper — baar baar try/catch mat likho
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

// Use karna:
router.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await fetchUser(req.params.id)
  res.json(user)
  // Error aaye toh automatically next(err) call hoga
  // Alag try/catch likhne ki zarurat nahi!
}))

// Global error handler Express mein:
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  })
})`,
            explanation: 'asyncHandler wrapper Express mein har route ke liye try/catch likhne se bachata hai. Errors automatically next() tak pahunchte hain jahan global error handler handle karta hai. Production-ready pattern hai ye.',
          }}
          realWorldScenario="ResumeATS jaise app mein har route handler mein asyncHandler wrap karo. DB timeout, validation error, external API failure — sab errors automatically global error handler tak pahunch jaate hain. Clean, DRY code."
          commonMistakes={[
            {
              mistake: 'try/catch mein error pakadna aur re-throw na karna jab handle nahi kiya',
              why: 'Agar error pakdo aur kuch nahi karo (ya sirf log karo), caller ko pata nahi chalega koi problem tha — silent failure.',
              fix: 'catch mein agar properly handle nahi kar rahe ho, throw err karo. Ya specific errors handle karo, baaki re-throw.',
            },
            {
              mistake: 'Express async routes mein try/catch bhool jaana',
              why: 'Unhandled promise rejection aata hai, Express ka error middleware trigger nahi hota, response hang karta hai.',
              fix: 'asyncHandler wrapper use karo ya har async route mein try/catch lagao. express-async-errors package bhi option hai.',
            },
          ]}
          proTip="Express ke liye asyncHandler wrapper: const wrap = fn => (req, res, next) => fn(req, res, next).catch(next). Ek baar define karo, har async route mein use karo. Ya npm install express-async-errors — ek line se poori Express mein async error handling fix ho jaati hai."
          demo={
            <DiffBlock
              title="Nested try/catch vs Centralized Error Handling"
              language="javascript"
              bad={{
                label: 'Har Route Mein try/catch — Repetitive',
                code: `router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
// Har route mein same try/catch — DRY violation`,
                explanation: 'Repetitive code, error handling logic scattered, inconsistent responses.',
              }}
              good={{
                label: 'asyncHandler — Clean & DRY',
                code: `const wrap = fn => (req, res, next) =>
  fn(req, res, next).catch(next)

router.get('/users/:id', wrap(async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user)
}))

router.post('/users', wrap(async (req, res) => {
  const user = await User.create(req.body)
  res.status(201).json(user)
}))

// Global error handler — ek jagah sab handle
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message })
})`,
                explanation: 'DRY code, centralized error handling, consistent error responses, clean routes.',
              }}
            />
          }
        />
      </div>

      {/* ConceptCard 3: Sequential vs Parallel */}
      <div id="sequential-vs-parallel">
        <ConceptCard
          title="await Trap — Sequential vs Parallel"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Sabse common aur expensive mistake async/await ke saath — sequential awaits use karna jab operations independent hain. Agar do operations ek doosre par depend nahi karti, unhe parallel mein chalao. Promise.all se dono ek saath start hote hain — total time sirf slowest ki time hoti hai."
          whenToUse={[
            'Promise.all: jab operations independent hain — ek ka output doosre ka input nahi',
            'Sequential await: jab operation B ko operation A ka result chahiye',
            'Mixed: kuch operations parallel, kuch sequential — ye bhi possible hai',
            'Dashboard pages — multiple data fetch parallel mein',
          ]}
          whyUseIt="Production apps mein ye ek huge performance win hai. Agar tumhara dashboard 3 API calls karta hai sequentially jo independent hain — 3x slow hai! Promise.all se total time sirf slowest call ka time hoga. Users ko fark pata chalta hai."
          howToUse={{
            filename: 'parallel-vs-sequential.js',
            language: 'javascript',
            code: `// ❌ Sequential await trap — 600ms total
async function getDashboardDataSlow(userId) {
  const user = await getUser(userId)      // 200ms wait...
  const orders = await getOrders(userId)  // 400ms wait...
  // Orders getUser ka result use nahi karta!
  // Kyun sequentially wait kar rahe ho?
  return { user, orders }
}

// ✅ Parallel with Promise.all — 400ms total (2x+ faster!)
async function getDashboardDataFast(userId) {
  const [user, orders] = await Promise.all([
    getUser(userId),    // 200ms ─┐
    getOrders(userId),  // 400ms ─┤ sab ek saath start
  ])                    //        └ Total: 400ms (slowest)
  return { user, orders }
}

// Mixed — kuch dependent, kuch independent
async function getCompleteProfile(userId) {
  // Step 1: user fetch karo (orders userId par depend karte hain)
  const user = await getUser(userId) // 200ms

  // Step 2: user ke baad, baaki sab parallel!
  const [orders, followers, notifications] = await Promise.all([
    getOrders(user.id),        // 300ms ─┐
    getFollowers(user.id),     // 250ms ─┤ parallel
    getNotifications(user.id), // 180ms ─┘ Total: 300ms
  ])

  return { user, orders, followers, notifications }
  // Total: 200ms + 300ms = 500ms
  // vs sequential: 200 + 300 + 250 + 180 = 930ms!
}`,
            explanation: 'Rule of thumb: agar operation B ko operation A ka result nahi chahiye, dono Promise.all mein dalo. Mixed approach: pehle dependent operations, phir baaki sab Promise.all mein.',
          }}
          realWorldScenario="ResumeATS mein agar tumhe user + resume + job data chahiye, teen sequential awaits = 650ms. Promise.all = 300ms (slowest ki time). Dashboard loading speed pe seedha impact. Users notice karte hain 350ms difference — especially mobile pe."
          commonMistakes={[
            {
              mistake: 'Hamesha sequential await use karna bina sochhe',
              why: 'Ye sabse common performance anti-pattern hai. Independent operations unnecessarily ek ke baad ek wait karti hain.',
              fix: 'Pehle poochho: kya ye operation pichli await ke result par depend karti hai? Nahi? Toh Promise.all mein daalo.',
            },
            {
              mistake: 'Promise.all ek bhi failure se sab kho dena',
              why: 'Ek reject hone par poora Promise.all reject ho jaata hai — baaki operations ka result bhi lost.',
              fix: 'Partial failures acceptable hain? Promise.allSettled use karo. Critical operations ke liye Promise.all hi theek hai — ek failure means data incomplete.',
            },
          ]}
          proTip="Simple rule: agar doosri await pehli await ke result par depend nahi karta — use Promise.all. Ye ek line ka change hai aur performance kaafi improve ho sakti hai. Code review mein ye pattern dhundho — common optimization opportunity hai."
          demo={
            <DiffBlock
              title="Sequential await (Slow) vs Promise.all (Fast)"
              language="javascript"
              bad={{
                label: 'Sequential — 600ms Total',
                code: `async function dashboard(userId) {
  // ❌ Ek ke baad ek — waste of time!
  const a = await taskA() // 200ms
  const b = await taskB() // 400ms
  // Total: 600ms (aur dono independent hain!)
  return { a, b }
}`,
                explanation: '200ms + 400ms = 600ms total. Dono operations ek doosre par depend nahi karti — ye wait karna waste hai.',
              }}
              good={{
                label: 'Promise.all — 400ms Total',
                code: `async function dashboard(userId) {
  // ✅ Parallel — much faster!
  const [a, b] = await Promise.all([
    taskA(), // 200ms ─┐ ek saath start
    taskB(), // 400ms ─┘
  ])
  // Total: 400ms (slowest ki time) — 1.5x faster!
  return { a, b }
}`,
                explanation: 'Dono ek saath start — total time sirf slowest (400ms). 200ms saved = 33% faster. Real apps mein ye savings bahut significant hoti hain.',
              }}
            />
          }
        />
      </div>

      {/* ConceptCard 4: Top-Level await */}
      <div id="top-level-await">
        <ConceptCard
          title="Top-Level await"
          emoji="🆕"
          difficulty="intermediate"
          whatIsIt="Top-level await ES2022 mein aaya — ES Modules (ESM) mein ab tum async function ke bahar bhi await use kar sakte ho. Module-level await directly likh sakte ho. Ye startup sequences ke liye perfect hai — DB connect karo, config load karo, phir rest of app."
          whenToUse={[
            'Module startup mein DB connection — await mongoose.connect()',
            'Config file load karna app start hone se pehle',
            'Feature flags fetch karna remote service se',
            'ES Modules (.mjs files ya type: "module" package.json) mein',
          ]}
          whyUseIt="Pehle sab kuch IIFE mein wrap karna padta tha: (async () => { await connect(); startApp(); })(). Ab seedha likh sakte ho. Cleaner module initialization code. Dependencies ka wait karna natural ho gaya."
          howToUse={{
            filename: 'top-level-await.mjs',
            language: 'javascript',
            code: `// ✅ Top-level await — sirf ES Modules mein!
// package.json mein: "type": "module"
// Ya file .mjs extension ke saath

import mongoose from 'mongoose'
import { readFile } from 'fs/promises'

// Seedha await — koi async wrapper nahi chahiye
const config = JSON.parse(
  await readFile('./config.json', 'utf8')
)

await mongoose.connect(config.mongoUri)
console.log('DB connected!')

// Ab module ke baaki exports ready hain
export const db = mongoose.connection

// Note: Ye module import karne wale modules wait karenge
// jab tak ye module fully initialize na ho jaaye

// ❌ CommonJS (.js without "type": "module") mein kaam nahi karta:
// const data = await fetch(url) // SyntaxError!

// CommonJS workaround (old way):
;(async () => {
  const data = await fetch(url)
  // ...
})()`,
            explanation: 'Top-level await sirf ES Modules mein kaam karta hai. Agar .js file hai aur package.json mein "type": "module" nahi hai — SyntaxError aayega. CommonJS mein IIFE workaround use karo.',
          }}
          realWorldScenario="Database initialization script: await mongoose.connect(MONGO_URI); — seedha top level par. Ya config-dependent startup: await loadConfig(); await initRedis(config.redis); await startServer(config.port); — clean linear startup sequence."
          commonMistakes={[
            {
              mistake: 'CommonJS files mein top-level await use karna',
              why: 'Top-level await sirf ES Modules mein valid hai. .js files without "type": "module" CommonJS hain — SyntaxError aayega.',
              fix: 'package.json mein "type": "module" add karo ya file ko .mjs rename karo. Ya IIFE workaround use karo.',
            },
            {
              mistake: 'Slow top-level awaits se module loading slow ho jaana',
              why: 'Jo modules ye module import karte hain — sab wait karenge. Ek slow top-level await poori app startup slow kar sakti hai.',
              fix: 'Top-level await mein sirf truly necessary initialization karo. Optional operations async mein baad mein karo.',
            },
          ]}
          proTip="Top-level await use karte waqt dhyaan rakho — ye module ke importers ko bhi block karta hai. App startup critical path mein sirf zaruri awaits rakho. Non-critical initialization lazy load karo — app fast start ho aur baad mein features ready hon."
        />
      </div>

      {/* ConceptCard 5: async Iteration */}
      <div id="async-iteration">
        <ConceptCard
          title="for await...of — Async Iterables"
          emoji="🔁"
          difficulty="advanced"
          whatIsIt="for await...of loop async iterables ke saath kaam karta hai — jaise Streams, paginated APIs, database cursors. Har iteration ek Promise ke resolve hone ka wait karta hai. Async generators ke saath ye powerful streaming data patterns enable karta hai."
          whenToUse={[
            'Paginated API results process karna — ek page ek time',
            'Database cursors — large result sets ko memory-efficient process karna',
            'Node.js Readable Streams iterate karna',
            'Async generators se data consume karna',
            'Real-time events consume karna — Server-Sent Events, WebSocket messages',
          ]}
          whyUseIt="Agar 10,000 records database se laane ho aur process karne ho — sab ek saath memory mein load karna risky hai. Async iteration se ek chunk at a time process karo — memory usage control mein rehta hai, processing streaming hoti hai."
          howToUse={{
            filename: 'async-iteration.js',
            language: 'javascript',
            code: `// Async Generator — data chunks produce karta hai
async function* fetchAllPages(baseUrl) {
  let page = 1
  let hasMore = true

  while (hasMore) {
    const response = await fetch(\`\${baseUrl}?page=\${page}&limit=100\`)
    const data = await response.json()

    yield data.items // Ye page ka data yield karo

    hasMore = data.hasNextPage
    page++
  }
}

// for await...of — chunks consume karna
async function processAllUsers() {
  let totalProcessed = 0

  for await (const usersChunk of fetchAllPages('/api/users')) {
    // Har iteration mein 100 users milte hain
    for (const user of usersChunk) {
      await processUser(user)
      totalProcessed++
    }
    console.log(\`Processed: \${totalProcessed} users\`)
  }
}

// Node.js Stream as async iterable (Node 10+)
const { createReadStream } = require('fs')
const { createInterface } = require('readline')

async function readLargeFileLine() {
  const stream = createReadStream('huge.csv')
  const rl = createInterface({ input: stream })

  let lineCount = 0
  for await (const line of rl) {
    // Har line ek time mein process karo
    await processCSVLine(line)
    lineCount++
  }
  console.log(\`Total lines: \${lineCount}\`)
}`,
            explanation: 'Async generators yield karte hain — consumer jab ready ho tab next value milti hai. for await...of har yield ke liye wait karta hai. Node.js streams async iterable hain Node 10+ se — seedha iterate kar sakte ho.',
          }}
          realWorldScenario="Ek reporting system mein 500K records process karne the. Promise.all se sab load karo — 2GB memory crash. for await...of se paginated cursor — 100 records at a time process karo, total memory 50MB. Same result, stable aur scalable."
          commonMistakes={[
            {
              mistake: 'for await...of regular arrays ke saath use karna unnecessarily',
              why: 'Regular arrays sync hain — normal for...of ya .forEach() better hai. for await...of overhead adds karta hai bina benefit ke.',
              fix: 'for await...of sirf async iterables ke liye use karo — streams, async generators, paginated APIs.',
            },
            {
              mistake: 'Async generator mein error handling bhool jaana',
              why: 'Generator ke andar unhandled rejection bahar nahi aata clearly. Caller ko pata nahi kab generator crash kiya.',
              fix: 'Generator ke andar try/catch use karo. Caller mein bhi try/catch lagao for await...of ke around.',
            },
          ]}
          proTip="Node.js Readable Streams Node.js 10+ mein async iterable hain — seedha for await...of se iterate karo. readline.createInterface() bhi async iterable return karta hai — large files line by line process karne ke liye perfect."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 8 Quiz — async/await Check
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — concepts clear hain toh 80%+ aasaan hai!
          </p>
        </div>
        <QuizSection questions={asyncAwaitQuiz} chapterSlug="async-await" />
      </div>
    </div>
  )
}
