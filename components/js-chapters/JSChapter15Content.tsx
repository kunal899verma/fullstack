'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function DesignPatternsDiagram() {
  const categories = [
    {
      label: 'Creational',
      sublabel: '"How to create" — Factory, Singleton',
      desc: 'Object creation logic hide karo',
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      border: 'rgba(245,158,11,0.3)',
      icon: '🏭',
    },
    {
      label: 'Structural',
      sublabel: '"How to combine" — Decorator, Proxy',
      desc: 'Objects compose karke larger structures banao',
      color: '#F97316',
      bg: 'rgba(249,115,22,0.1)',
      border: 'rgba(249,115,22,0.3)',
      icon: '🧱',
    },
    {
      label: 'Behavioral',
      sublabel: '"How to communicate" — Observer, Strategy',
      desc: 'Objects ke beech responsibilities assign karo',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.1)',
      border: 'rgba(124,58,237,0.3)',
      icon: '🤝',
    },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">3 Categories of Design Patterns</p>
      <div className="max-w-lg mx-auto space-y-2">
        {categories.map((item, i) => (
          <div key={i} className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <p className="font-bold text-sm" style={{ color: item.color }}>{item.label} <span className="font-normal text-xs text-[#71717A]">— {item.sublabel}</span></p>
              <p className="text-xs text-[#71717A] mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const patternsQuiz: QuizQuestion[] = [
  {
    question: 'Module pattern ka main faida kya hai?',
    options: [
      { text: 'Code fast run hota hai', correct: false, explanation: 'Performance module pattern ka primary benefit nahi.' },
      { text: 'Private state — external code directly access/modify nahi kar sakta', correct: true, explanation: 'Sahi! Closure se private scope banti hai — encapsulation ka foundation.' },
      { text: 'Async operations easy ho jaate hain', correct: false, explanation: 'Module pattern async se related nahi.' },
      { text: 'Memory less use hoti hai', correct: false, explanation: 'Memory benefit zyada nahi hota module pattern se.' },
    ],
  },
  {
    question: 'Singleton pattern ka downside kya hai?',
    options: [
      { text: 'Slow hai', correct: false, explanation: 'Singleton slow nahi hota — global state ki problems alag hain.' },
      { text: 'Global state — testing difficult, tight coupling, hidden dependencies', correct: true, explanation: 'Bilkul! Singleton global state hai — tests ek doosre pe depend karte hain, mocking mushkil.' },
      { text: 'Multiple instances ban jaate hain', correct: false, explanation: 'Singleton ka point hi ek instance hai.' },
      { text: 'Browser mein kaam nahi karta', correct: false, explanation: 'Singleton browser aur Node.js dono mein kaam karta hai.' },
    ],
  },
  {
    question: 'Observer pattern mein publisher aur subscriber ka kya relationship hai?',
    options: [
      { text: 'Publisher subscriber ko directly call karta hai', correct: false, explanation: 'Direct coupling nahi hoti — publish/subscribe ke beech abstraction hoti hai.' },
      { text: 'Loose coupling — publisher events emit karta hai, subscribers independently listen karte hain', correct: true, explanation: 'Sahi! Publisher subscribers ke baare mein nahi jaanta — decoupled communication.' },
      { text: 'Subscriber publisher se inherit karta hai', correct: false, explanation: 'Observer pattern inheritance nahi, composition hai.' },
      { text: 'Dono same object hote hain', correct: false, explanation: 'Publisher aur subscriber alag entities hain.' },
    ],
  },
  {
    question: 'Factory pattern kab use karna chahiye?',
    options: [
      { text: 'Jab sirf ek type ka object banana ho', correct: false, explanation: 'Ek type ke liye simple constructor ya class kaafi hai.' },
      { text: 'Jab object creation logic complex ho ya type runtime pe decide ho', correct: true, explanation: 'Bilkul! new keyword hide karo, creation logic centralize karo, polymorphism enable karo.' },
      { text: 'Hamesha — new keyword kabhi mat use karo', correct: false, explanation: 'Factory hamesha zaroorat nahi — simple cases mein direct new theek hai.' },
      { text: 'Sirf singleton objects ke liye', correct: false, explanation: 'Factory pattern multiple objects create kar sakta hai — singleton nahi.' },
    ],
  },
  {
    question: 'Strategy pattern kya problem solve karta hai?',
    options: [
      { text: 'Memory leaks', correct: false, explanation: 'Memory leaks alag problem hai.' },
      { text: 'Swappable algorithms — algorithm ko runtime pe change karo bina calling code badlaye', correct: true, explanation: 'Sahi! Payment processing strategy (credit card vs UPI), sorting strategy — runtime switch.' },
      { text: 'Async code manage karna', correct: false, explanation: 'Strategy pattern sync aur async dono mein use hota hai.' },
      { text: 'DOM manipulation simplify karna', correct: false, explanation: 'Strategy pattern UI se specific nahi.' },
    ],
  },
]

export default function JSChapter15Content() {
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
          Design Patterns in JavaScript — Battle-Tested Solutions
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Design patterns sunne mein bohot fancy lagta hai — actually ye sirf "proven solutions to common problems" hain. Gang of Four ne 1994 mein 23 patterns describe kiye the. Aaj bhi wahi use hote hain! Ye patterns isliye exist karte hain kyunki hazaaron developers ne same problems face kiye — aur best solutions dhundh ke document kiye.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ab sawaal ye aata hai — "Bhai patterns yaad karne padenge kya?" Nahi! Samajhne padenge. Jab tum Module pattern dekhoge toh pehchaan jaoge — "aha, ye toh wahi encapsulation wala trick hai!" React itself internally Observer pattern, Factory pattern use karta hai. Tum pehle se patterns use kar rahe ho — bas naam nahi pata tha.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Patterns seekhne se tum dusre developers ka code better samjhoge — aur apna code better likho. Senior developers ki pehchaan hoti hai — woh patterns naam se nahi, problem se pehchante hain.
        </p>
      </div>

      <DesignPatternsDiagram />

      <div id="module-pattern">
        <ConceptCard
          title="Module Pattern — Private State"
          emoji="📦"
          difficulty="intermediate"
          whatIsIt="Socho ek ATM machine — tum balance dekhte ho, paise nikalte ho. Lekin machine ke andar ka mechanism — cash cassette, counter, security logic — tumhe kabhi directly touch nahi karta. Yehi Module pattern hai! Closure use karta hai private state banana ke liye. External code directly private variables access nahi kar sakta — sirf exposed methods se interact kar sakta hai. Revealing Module Pattern variant mein public interface clearly define hota hai. ES Modules (import/export) ise natively support karte hain."
          whenToUse={[
            'Private state ke saath utility/service banana ho',
            'Global namespace pollution rokna ho',
            'Public API clearly define karni ho',
            'Third-party code se implementation details hide karni ho',
          ]}
          whyUseIt="Encapsulation bugs prevent karta hai — baaki code internals mess nahi kar sakta. Public API stable rakha ja sakta hai, private implementation change hoti rahe. Socho — agar tumhara counter ka count variable bahar se directly change ho sake, toh koi bhi raat ko count = 9999 kar de! Module pattern ye power deta hai ki tum decide karo kya bahar jaayega, kya nahi. Libraries aur SDKs ye pattern extensively use karte hain. ES Modules modern equivalent hain."
          howToUse={{
            filename: 'module-pattern.js',
            language: 'javascript',
            code: `// ── CLASSIC MODULE PATTERN (IIFE) ────────────────────────────────
const counterModule = (() => {
  // Private state — bahar se access nahi
  let count = 0
  const history = []

  // Private function
  function logChange(action, value) {
    history.push({ action, value, timestamp: Date.now() })
  }

  // Public interface — expose karo
  return {
    increment() {
      count++
      logChange('increment', count)
      return this
    },
    decrement() {
      if (count > 0) {
        count--
        logChange('decrement', count)
      }
      return this
    },
    getCount() { return count },
    getHistory() { return [...history] },  // Copy — original safe
    reset() {
      count = 0
      history.length = 0
      return this
    },
  }
})()

counterModule.increment().increment().increment()
console.log(counterModule.getCount())   // 3
console.log(counterModule.count)        // undefined — private!

// ── REVEALING MODULE PATTERN ──────────────────────────────────────
function createUserService(baseUrl) {
  // Private
  let _cache = new Map()
  const _headers = { 'Content-Type': 'application/json' }

  async function _fetchUser(id) {
    if (_cache.has(id)) return _cache.get(id)
    const res = await fetch(\`\${baseUrl}/users/\${id}\`, { headers: _headers })
    const user = await res.json()
    _cache.set(id, user)
    return user
  }

  function _invalidateCache(id) {
    if (id) _cache.delete(id)
    else _cache.clear()
  }

  async function updateUser(id, data) {
    const res = await fetch(\`\${baseUrl}/users/\${id}\`, {
      method: 'PUT',
      headers: _headers,
      body: JSON.stringify(data),
    })
    _invalidateCache(id)
    return await res.json()
  }

  // Reveal only public API
  return {
    getUser: _fetchUser,
    updateUser,
    clearCache: () => _invalidateCache(),
  }
}

const userService = createUserService('https://api.example.com')
await userService.getUser(123)     // Cached on second call
await userService.updateUser(123, { name: 'New Name' })`,
            explanation: 'Under the hood kya ho raha hai: IIFE execute hoti hai — ek closure create hoti hai. Us closure ka scope bahar se invisible hai. Return kiya hua object public API hai — ye sirf usi closure ke andar jhankne ke "windows" hain. counterModule.count karo toh undefined milega — kyunki count variable closure ke andar kabhi return nahi kiya! Revealing module pattern private variables with _ prefix convention follow karta hai. Factory function version se multiple independent instances banana possible hai.',
          }}
          realWorldScenario="Node.js mein database service: const db = createDbService(connectionString). External code sirf db.query(), db.transaction() access kar sakta hai — connection pool, retry logic, credentials sab private. Ek baar ye pattern samjha toh production code mein hamesha dikhega — Stripe SDK, Firebase SDK sab isi pattern pe based hain!"
          commonMistakes={[
            {
              mistake: 'Private state return object mein directly expose karna',
              why: 'return { _count: count } — reference expose ho jaata hai, external code mutate kar sakta hai.',
              fix: 'Getter function return karo: return { getCount: () => count }. Ya copy return karo: return { getHistory: () => [...history] }',
            },
            {
              mistake: 'Module mein bahut zyada expose karna',
              why: 'Agar sab kuch public hai toh encapsulation ka fayda kya? Breaking changes common.',
              fix: 'Minimum public API define karo — only what consumers actually need.',
            },
          ]}
          proTip="Akshay ka pro tip: ES Modules native module pattern hain — import/export syntax. Private variables file scope mein hain, exported functions public API. TypeScript mein private keyword bhi hai class members ke liye. Modern code mein classes ya ESM prefer karo IIFE pattern se. Interview mein agar poochha jaaye 'closure ka practical use batao' — Module pattern best answer hai!"
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)' }}
      >
        <p className="text-sm text-[#FCD34D] font-medium">
          💡 Akshay ka insight: Module pattern ke baad ek common sawaal aata hai — "agar mujhe sirf ek hi instance chahiye globally, toh kya karoon?" Yahan Singleton pattern aata hai stage pe!
        </p>
      </div>

      <div id="singleton">
        <ConceptCard
          title="Singleton — Ek Hi Instance"
          emoji="1️⃣"
          difficulty="intermediate"
          whatIsIt="Pehle ye bolo: kitni baar tumne new PrismaClient() kiya tha baar baar? Har function mein new connection banana — ye bahut badi galti hai! Singleton pattern ensure karta hai ki ek class ka sirf ek instance ho — globally accessible. Database connection pool, configuration manager, logger, cache — ye sab singletons common use cases hain. JavaScript mein module system natural singleton hai — same module import karo, same instance milega."
          whenToUse={[
            'Shared resource manage karna — DB connection pool',
            'Global configuration — ek jagah se sab jagah accessible',
            'Event bus — application-wide events',
            'Cache — shared memoization store',
          ]}
          whyUseIt="Ek nayi DB connection banana — expensive hai! Handshake hota hai, authentication hoti hai, resources allocate hote hain. Agar har API request pe nayi connection banaao — memory exhaust ho jaayegi, database connection limit hit ho jaayegi. Singleton expensive resources ko multiple baar create hone se rokta hai. Global access point se sab modules same state share karte hain. Node.js module caching natural singleton behavior deta hai."
          howToUse={{
            filename: 'singleton.js',
            language: 'javascript',
            code: `// ── NODE.JS NATURAL SINGLETON (ESM) ─────────────────────────────
// config.js — import karo, same object milega hamesha
const config = {
  dbUrl: process.env.DATABASE_URL,
  port: parseInt(process.env.PORT ?? '3000'),
  jwtSecret: process.env.JWT_SECRET,
}
export default config

// Any file mein:
import config from './config.js'
// Same object — module cache se

// ── CLASS SINGLETON ───────────────────────────────────────────────
class DatabasePool {
  static #instance = null  // Private static field

  #pool = null
  #connectionCount = 0

  constructor(connectionString) {
    if (DatabasePool.#instance) {
      return DatabasePool.#instance  // Existing instance return
    }
    this.#pool = this.#createPool(connectionString)
    DatabasePool.#instance = this
  }

  static getInstance(connectionString) {
    if (!DatabasePool.#instance) {
      new DatabasePool(connectionString)
    }
    return DatabasePool.#instance
  }

  #createPool(cs) {
    // Create actual pool
    return { connectionString: cs }
  }

  async query(sql, params) {
    this.#connectionCount++
    // Use pool to execute
    return []
  }
}

// Usage
const pool1 = DatabasePool.getInstance(process.env.DATABASE_URL)
const pool2 = DatabasePool.getInstance()
console.log(pool1 === pool2)  // true — same instance!

// ── SIMPLE OBJECT SINGLETON ───────────────────────────────────────
// Simplest JavaScript singleton — just an object!
const logger = {
  level: 'info',
  logs: [],

  log(message, level = 'info') {
    const entry = { message, level, timestamp: new Date().toISOString() }
    this.logs.push(entry)
    console.log(\`[\${level.toUpperCase()}] \${message}\`)
  },

  getLogs() { return [...this.logs] },
}

export default logger  // ESM export = singleton`,
            explanation: 'Under the hood: Node.js module system require() ya import karo pehli baar — module execute hota hai, cache mein store hota hai. Doosri baar same module import karo — cache se wahi object milta hai. Nayi execution nahi! Isliye config.js export karo — sab jagah same config object. Class singleton mein #instance static field check karo — agar exist karta hai toh wahi return karo, naya mat banao.',
          }}
          realWorldScenario="Prisma ORM se: const prisma = new PrismaClient() — ek baar banao, export karo, sab jagah import karo same instance milti hai. Ye ek baar samajh lo phir poori life yaad rahega: Node.js mein ek baar export kiya object = Singleton by default. Isliye db.ts mein ek baar banao, baaki jagah import karo."
          commonMistakes={[
            {
              mistake: 'Singleton ko test mein reset nahi karna',
              why: 'Tests ek doosre pe depend karte hain — Singleton state previous test se carry forward.',
              fix: 'Test mein reset method expose karo, ya dependency injection use karo — singleton inject karo, hard-code nahi karo.',
            },
            {
              mistake: 'Multi-process environments mein singleton assume karna',
              why: 'Node.js cluster mode ya serverless — har process apna singleton maintain karta hai — shared nahi.',
              fix: 'Truly shared state ke liye Redis ya database use karo — process-level singletons ki limits samjho.',
            },
          ]}
          proTip="Bhai, Singleton ka ek dark side hai — global state! Tests ek doosre pe depend karne lagte hain. Dependency injection prefer karo — singleton inject karo, globally import mat karo. Jest mein jest.mock() se singleton mock kar sakte ho. Rule of thumb: Singleton sirf wahan use karo jahan genuinely ek hi resource chahiye — DB pool, config, logger."
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}
      >
        <p className="text-sm text-[#6EE7B7] font-medium">
          💡 Akshay ka insight: Abhi tak Module aur Singleton se sikhaa ki ek cheez ko manage kaise karo. Ab Observer pattern sikhate hain — alag-alag cheezein aapas mein kaise baat karen bina tightly connected hue! Ye event-driven programming ka dil hai.
        </p>
      </div>

      <div id="observer">
        <ConceptCard
          title="Observer / EventEmitter — Loose Coupling"
          emoji="👁️"
          difficulty="intermediate"
          whatIsIt="Socho newspaper subscription — newspaper company ko nahi pata kitne log padhte hain. Jo subscribe karta hai — newspaper milta hai. Jo unsubscribe karta hai — band ho jaata hai. Publisher subscribers ke baare mein kuch nahi jaanta! Observer pattern mein ek subject (publisher) multiple observers (subscribers) ko notify karta hai jab state change hoti hai. JavaScript ka addEventListener isi pattern ka implementation hai — tum daily use karte ho! Node.js ka EventEmitter bhi same. Pub-Sub variant mein publisher aur subscriber direct connected nahi hote — event bus mediator hota hai."
          whenToUse={[
            'Cross-module communication — tight coupling avoid karna',
            'DOM events — click, submit, scroll handlers',
            'Real-time updates — WebSocket messages',
            'Plugin systems — extensible architecture',
          ]}
          whyUseIt="Ab sawaal ye aata hai — bina Observer pattern ke kya hoga? Agar OrderService ko directly EmailService, SMSService, Analytics sab call karne padein — tight coupling! Kal nayi service add karni ho — OrderService ka code change karo. Observer loose coupling deta hai — publisher subscribers ke baare mein kuch nahi jaanta. New subscribers add karo bina publisher change kiye. React, Vue, Angular sab internally Observer use karte hain — ye patterns everywhere hain!"
          howToUse={{
            filename: 'observer.js',
            language: 'javascript',
            code: `// ── CUSTOM EVENT EMITTER ─────────────────────────────────────────
class EventEmitter {
  #listeners = new Map()

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set())
    }
    this.#listeners.get(event).add(listener)
    return () => this.off(event, listener)  // Unsubscribe function return
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args)
      this.off(event, wrapper)
    }
    return this.on(event, wrapper)
  }

  off(event, listener) {
    this.#listeners.get(event)?.delete(listener)
  }

  emit(event, ...args) {
    this.#listeners.get(event)?.forEach(listener => listener(...args))
  }
}

// ── USAGE — Application Event Bus ────────────────────────────────
const eventBus = new EventEmitter()

// Cart module
function cartModule() {
  const unsubscribe = eventBus.on('user:logout', () => {
    clearCart()  // Cart clear karo jab logout
  })

  // Cleanup jab component/module destroy ho
  return { destroy: unsubscribe }
}

// Auth module
function authModule() {
  async function logout() {
    await clearSession()
    eventBus.emit('user:logout', { timestamp: Date.now() })
    eventBus.emit('user:changed', null)
  }
  return { logout }
}

// ── NODE.JS EVENTEMITTER ─────────────────────────────────────────
import { EventEmitter as NodeEventEmitter } from 'events'

class OrderService extends NodeEventEmitter {
  async createOrder(data) {
    const order = await db.create('orders', data)
    this.emit('order:created', order)    // Subscribers notify
    return order
  }

  async updateStatus(id, status) {
    const order = await db.update('orders', id, { status })
    this.emit(\`order:status:\${status}\`, order)
    return order
  }
}

const orderService = new OrderService()

// Email service listens
orderService.on('order:created', async (order) => {
  await emailService.sendConfirmation(order.userEmail, order)
})

// Analytics listens
orderService.on('order:created', (order) => {
  analytics.track('order_created', { orderId: order.id, amount: order.total })
})

// ── DOM EVENT DELEGATION (Observer in browser) ────────────────────
document.querySelector('.menu').addEventListener('click', (e) => {
  const item = e.target.closest('[data-action]')
  if (!item) return
  const action = item.dataset.action
  eventBus.emit(\`menu:\${action}\`, item.dataset)
})`,
            explanation: 'Step by step trace karo: on() call hota hai — event ke liye ek Set mein listener store hota hai (Set isliye ki duplicate listeners nahi hote). emit() call hota hai — us event ke Set ke saare listeners forEach se call hote hain. Ek listener remove karo — off() se Set se delete. once() clever trick hai — listener ko ek wrapper mein wrap karo jo fire hone ke baad khud ko remove kar le! Event bus pattern isliye powerful hai — OrderService ko pata hi nahi kaun sun raha hai.',
          }}
          realWorldScenario="E-commerce mein order creation: OrderService event emit karta hai. EmailService, SMSService, Analytics, Inventory — sab independently listen karte hain. Naya WhatsApp notification service add karna? Sirf ek line: orderService.on('order:created', sendWhatsApp) — OrderService ka ek character bhi nahi badla! Ye hai loose coupling ka jadoo."
          commonMistakes={[
            {
              mistake: 'Event listeners cleanup nahi karna',
              why: 'Memory leak — component unmount ho toh bhi listener active. EventEmitter reference hold karta hai component ko.',
              fix: 'on() se returned unsubscribe function call karo cleanup mein. React mein useEffect return function mein.',
            },
            {
              mistake: 'Too many event types — event soup',
              why: 'user:created, user:updated, user:name:changed, user:email:changed — tracking difficult.',
              fix: 'Events meaningful, coarse-grained rakho. user:updated with diff object. Unnecessary fine-grained events avoid karo.',
            },
          ]}
          proTip="Yaad rakho ek important baat — event listeners cleanup ZAROOR karo! React useEffect mein return function se remove karo. Nahi kiya toh memory leak — page slow ho jaayega dheere dheere. mitt ya tiny-emitter lightweight EventEmitter libraries hain — 200 bytes! RxJS zyada powerful hai — Observables, operators, backpressure. Signals (Angular 17+, Preact) modern reactive primitive hain — Observer pattern ka evolution."
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)' }}
      >
        <p className="text-sm text-[#93C5FD] font-medium">
          💡 Akshay ka insight: Module, Singleton, Observer — teeno patterns samajh aaye. Ab Factory pattern — object banane ka ek clean, powerful tarika. new keyword ko chhupaao, creation logic centralize karo!
        </p>
      </div>

      <div id="factory">
        <ConceptCard
          title="Factory Pattern — Object Creation Magic"
          emoji="🏭"
          difficulty="intermediate"
          whatIsIt="Ek surprising sawaal — Amazon pe payment karo toh kya hota hai andar? Kya Amazon ka code Credit Card ke liye alag, UPI ke liye alag check karta hai har jagah? Nahi! Factory pattern object creation logic centralize karta hai — caller ko sirf bolta hai 'mujhe UPI payment object chahiye' aur factory sab handle karta hai. new keyword hide karta hai, creation complex ho sakti hai. Factory function type decide kar sakti hai runtime pe — polymorphism. Builder pattern complex object step-by-step banata hai."
          whenToUse={[
            'Object type runtime pe decide hota ho — user role se',
            'Complex object creation — validation, defaults, dependencies',
            'new keyword hide karna — nicer API',
            'Testing mein mock objects create karna',
          ]}
          whyUseIt="Factory centralizes creation logic — ek jagah change karo, sab jagah reflect. Type decide runtime pe — plugin systems, feature flags. Caller ko implementation details nahi jaannni — factory se lo, use karo. Aur sabse bada fayda? Nayi payment method add karni ho — sirf factory mein ek case add karo. Calling code ek character nahi badlata. Testing mein factory se different types inject karo."
          howToUse={{
            filename: 'factory.js',
            language: 'javascript',
            code: `// ── SIMPLE FACTORY FUNCTION ──────────────────────────────────────
function createUser(data) {
  // Validation
  if (!data.email?.includes('@')) throw new ValidationError('Invalid email')

  // Defaults
  const defaults = { role: 'user', active: true, createdAt: new Date() }

  // Build object
  return {
    ...defaults,
    ...data,
    id: generateId(),
    email: data.email.toLowerCase(),
    displayName: data.name.trim(),
  }
}

const user = createUser({ name: '  Rahul  ', email: 'RAHUL@EXAMPLE.COM' })
// { id: '...', email: 'rahul@example.com', displayName: 'Rahul', role: 'user', ... }

// ── POLYMORPHIC FACTORY ───────────────────────────────────────────
function createPaymentMethod(type, config) {
  const methods = {
    credit_card: (cfg) => ({
      type: 'credit_card',
      charge: async (amount) => stripeApi.charge(cfg.token, amount),
      refund: async (id) => stripeApi.refund(id),
    }),
    upi: (cfg) => ({
      type: 'upi',
      charge: async (amount) => upiApi.initiate(cfg.vpa, amount),
      refund: async (id) => upiApi.reverse(id),
    }),
    wallet: (cfg) => ({
      type: 'wallet',
      charge: async (amount) => walletApi.debit(cfg.walletId, amount),
      refund: async (id) => walletApi.credit(id),
    }),
  }

  const creator = methods[type]
  if (!creator) throw new Error(\`Unknown payment type: \${type}\`)
  return creator(config)
}

// Calling code doesn't care about implementation:
const payment = createPaymentMethod(user.preferredPayment, user.paymentConfig)
await payment.charge(999)  // Same API regardless of type!

// ── BUILDER PATTERN ───────────────────────────────────────────────
class QueryBuilder {
  #table = ''
  #conditions = []
  #orderBy = null
  #limit = null
  #offset = 0

  from(table) { this.#table = table; return this }
  where(condition) { this.#conditions.push(condition); return this }
  order(field, dir = 'ASC') { this.#orderBy = \`\${field} \${dir}\`; return this }
  limit(n) { this.#limit = n; return this }
  page(p, size = 20) { this.#offset = (p - 1) * size; this.#limit = size; return this }

  build() {
    let sql = \`SELECT * FROM \${this.#table}\`
    if (this.#conditions.length) sql += \` WHERE \${this.#conditions.join(' AND ')}\`
    if (this.#orderBy) sql += \` ORDER BY \${this.#orderBy}\`
    if (this.#limit !== null) sql += \` LIMIT \${this.#limit} OFFSET \${this.#offset}\`
    return sql
  }
}

const query = new QueryBuilder()
  .from('users')
  .where('active = true')
  .where('role = "admin"')
  .order('name', 'ASC')
  .page(2, 20)
  .build()
// SELECT * FROM users WHERE active = true AND role = "admin" ORDER BY name ASC LIMIT 20 OFFSET 20`,
            explanation: 'Trace karo polymorphic factory: createPaymentMethod("upi", config) call hota hai. methods["upi"] function milta hai. Woh function config se ek object return karta hai jiske andar charge() aur refund() methods hain. Calling code sirf payment.charge(999) call karta hai — uski baat nahi ke andar UPI hai ya Credit Card. Same interface, different implementations — yehi hai polymorphism ka real world use! Builder pattern method chaining se complex object step-by-step banata hai — readable aur flexible.',
          }}
          realWorldScenario="React component library mein: createButton({ variant: 'primary' | 'secondary', size: 'sm' | 'md' | 'lg' }) — sahi class combinations generate karo. API client factory: createApiClient({ baseUrl, apiKey, timeout }) — configured instance return karo. Aur sunno — Axios khud factory pattern use karta hai: axios.create({ baseURL }) — configured instance deta hai!"
          commonMistakes={[
            {
              mistake: 'Factory ke andar too much logic daalna',
              why: 'Factory god object ban jaata hai — har cheez jaanta hai, har cheez karta hai.',
              fix: 'Factory sirf creation kare. Configuration validate karo, defaults apply karo, return karo. Business logic bahar rakho.',
            },
            {
              mistake: 'Builder mein build() call karna bhoolna',
              why: 'Builder chain return karta hai, actual object build() se milta hai.',
              fix: 'Chain ke end mein .build() call karo. TypeScript mein return type enforce karo.',
            },
          ]}
          proTip="Builder pattern ka method chaining ekdum addictive hai! QueryBuilder mein har method this return karta hai — isliye chain hota hai. Ye pattern Knex.js, Prisma query builder mein use hota hai. Interview mein poochho: 'Factory vs Constructor mein kya fark hai?' — Factory creation logic hide karta hai aur polymorphism enable karta hai. Constructor direct class ke saath tied hota hai."
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
      >
        <p className="text-sm text-[#FCA5A5] font-medium">
          💡 Akshay ka insight: Ye chapter ka sabse important pattern hai — Strategy! Isko samajh lo toh Dependency Injection (DI) bhi automatically samajh aayega. Aur DI samajhne wala developer — senior develop developer!
        </p>
      </div>

      <div id="strategy">
        <ConceptCard
          title="Strategy Pattern — Swappable Algorithms"
          emoji="♟️"
          difficulty="intermediate"
          whatIsIt="Ek bade e-commerce site ka code socho — payment ke liye if/else: if (type === 'credit') { ... } else if (type === 'upi') { ... } else if (type === 'wallet') { ... } — nayi payment type add karo toh ye if/else chain badhti jaati hai. Yahi problem Strategy pattern solve karta hai! Algorithm ko runtime pe swap karo — same interface, different implementations. Sorting strategy, payment strategy, validation strategy — sab runtime configurable. Dependency Injection isi pattern ka direct application hai — dependencies inject karo, hard-code nahi karo."
          whenToUse={[
            'Multiple algorithms — sorting, validation, payment methods',
            'Runtime algorithm selection — user preference, feature flags',
            'if/else chains replace karna',
            'Testing mein real implementation ko mock se replace karna — DI',
          ]}
          whyUseIt="Open/Closed Principle yaad hai? 'Open for extension, closed for modification.' Strategy isi principle ka implementation hai — naye strategies add karo bina existing code change kiye. Testing mein sabse bada fayda: DI ke saath mockDb, mockEmailService inject karo — real database connect nahi hoti, real emails nahi jaate. Tests fast, isolated, reliable. Plugin architectures Strategy se build hoti hain."
          howToUse={{
            filename: 'strategy.js',
            language: 'javascript',
            code: `// ── STRATEGY PATTERN — Payment ────────────────────────────────────

// Strategies — same interface
const creditCardStrategy = {
  async pay(amount, details) {
    return stripe.charge(details.token, amount)
  },
  validate(details) {
    return !!(details.token && details.cvv)
  },
}

const upiStrategy = {
  async pay(amount, details) {
    return upiGateway.initiate(details.vpa, amount)
  },
  validate(details) {
    return /^[\w.-]+@\w+$/.test(details.vpa)
  },
}

const walletStrategy = {
  async pay(amount, details) {
    const balance = await wallet.getBalance(details.userId)
    if (balance < amount) throw new Error('Insufficient balance')
    return wallet.debit(details.userId, amount)
  },
  validate(details) {
    return !!details.userId
  },
}

// Context — strategy inject karo
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy
  }

  setStrategy(strategy) {
    this.strategy = strategy
  }

  async process(amount, details) {
    if (!this.strategy.validate(details)) {
      throw new ValidationError('Invalid payment details')
    }
    return this.strategy.pay(amount, details)
  }
}

// Usage
const processor = new PaymentProcessor(creditCardStrategy)
await processor.process(999, { token: 'tok_xyz', cvv: '123' })

// Runtime switch
processor.setStrategy(upiStrategy)
await processor.process(999, { vpa: 'rahul@upi' })

// ── DEPENDENCY INJECTION ──────────────────────────────────────────

// Without DI — hard-coded dependency
class OrderService {
  async createOrder(data) {
    const db = new MongoDatabase()  // Hard-coded! Testing impossible
    return db.insert('orders', data)
  }
}

// With DI — testable
class OrderService {
  constructor(db, emailService, logger) {
    this.db = db
    this.emailService = emailService
    this.logger = logger
  }

  async createOrder(data) {
    const order = await this.db.insert('orders', data)
    await this.emailService.send(data.email, 'Order confirmed', order)
    this.logger.info(\`Order created: \${order.id}\`)
    return order
  }
}

// Production:
const service = new OrderService(mongoDb, sendgrid, consoleLogger)

// Testing:
const service = new OrderService(
  mockDb,          // In-memory fake
  mockEmailService, // No actual emails sent
  noopLogger,      // Silent
)`,
            explanation: 'Step by step trace karo DI example: OrderService constructor mein db, emailService, logger inject ho rahe hain. createOrder() call hota hai — this.db.insert() call hota hai jo bhi db inject kiya tha. Production mein real MongoDB. Test mein in-memory mockDb. Same code, alag behavior! Ye hai Dependency Injection ki beauty — code decouple ho jaata hai. Strategy mein context sirf strategy.pay() call karta hai — andar kya hoga, usse koi matlab nahi.',
          }}
          realWorldScenario="Sorting feature mein: user choose kare — by price ascending, by rating descending, by popularity. Har ek alag strategy object. ProductList component sirf currentStrategy.sort(products) call karta hai — implementation details nahi jaanta. New sort option add karna? New strategy object, register karo, done — ek line bhi ProductList mein nahi badla! Ye baar baar socho jab bhi if/else chain zyada lamba ho raha ho."
          commonMistakes={[
            {
              mistake: 'Strategy mein state store karna',
              why: 'Strategies stateful ban jaayein toh sharing problematic — parallel use mein state corrupt.',
              fix: 'Strategies stateless rakho — sirf algorithms, no state. Context mein state rakho.',
            },
            {
              mistake: 'Strategy pattern overuse karna jahan simple if/else kaafi hoga',
              why: 'Over-engineering — 2 options ke liye full Strategy hierarchy unnecessary complexity.',
              fix: 'Strategy pattern tab use karo jab 3+ algorithms ho aur runtime switching genuinely needed ho.',
            },
          ]}
          proTip="Yaad rakho — JavaScript mein strategies simple objects ya functions ho sakti hain — classes zaroorat nahi. const strategies = { credit_card: creditCardFn, upi: upiFn }. strategies[selectedType](amount, details). Object lookup is baar if/else ki jagah! DI containers (InversifyJS, TSyringe) large apps mein automatic injection manage karte hain. NestJS pure DI pe based hai — iska seedha connection Strategy + DI pattern se hai!"
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 15 Quiz — Design Patterns
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — patterns master karo!
          </p>
        </div>
        <QuizSection questions={patternsQuiz} chapterSlug="js-patterns" />
      </div>
    </div>
  )
}
