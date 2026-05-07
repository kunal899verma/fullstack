'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Browser vs Node.js Comparison Table ──────────────────────────────────────

function BrowserVsNodeTable() {
  const rows = [
    { feature: 'Runs where?', browser: 'Chrome, Firefox, Safari', node: 'Server, terminal, cloud' },
    { feature: 'DOM access?', browser: 'Haan — document, window', node: 'Nahi — koi DOM nahi' },
    { feature: 'File system?', browser: 'Limited (File API only)', node: 'Full fs module access' },
    { feature: 'Networking?', browser: 'fetch, WebSocket', node: 'http, https, net, dgram' },
    { feature: 'Global object?', browser: 'window', node: 'global / globalThis' },
    { feature: 'Module system?', browser: 'ES Modules (import)', node: 'CJS (require) + ESM' },
    { feature: 'Main use case?', browser: 'UI, interactivity', node: 'APIs, servers, scripts' },
  ]

  return (
    <div className="my-5 overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <th className="text-left px-4 py-3 text-[#71717A] font-bold uppercase tracking-wider">Feature</th>
            <th className="text-left px-4 py-3 font-bold" style={{ color: '#06B6D4' }}>Browser JS</th>
            <th className="text-left px-4 py-3 font-bold" style={{ color: '#10B981' }}>Node.js</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
              }}
            >
              <td className="px-4 py-3 text-[#71717A] font-medium">{row.feature}</td>
              <td className="px-4 py-3 text-[#A1A1AA]">{row.browser}</td>
              <td className="px-4 py-3 text-[#A1A1AA]">{row.node}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── V8 Architecture Diagram ───────────────────────────────────────────────────

function V8Diagram() {
  const steps = [
    { label: 'JS Code', sublabel: 'Tumhara source code', color: '#7C3AED', bg: 'rgba(124,58,237,0.15)', border: 'rgba(124,58,237,0.4)', icon: '📝' },
    { label: 'Parser', sublabel: 'Syntax check → Tokens', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.35)', icon: '🔍' },
    { label: 'AST', sublabel: 'Abstract Syntax Tree', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.35)', icon: '🌳' },
    { label: 'Ignition (Interpreter)', sublabel: 'Bytecode generate karta hai — fast startup', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.35)', icon: '⚡' },
    { label: 'Turbofan (JIT Compiler)', sublabel: 'Hot code ko machine code mein compile karta hai', color: '#EC4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.35)', icon: '🚀' },
    { label: 'Machine Code', sublabel: 'CPU directly execute karta hai — blazing fast!', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.35)', icon: '💻' },
  ]

  return (
    <div className="my-6">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">
        V8 Engine — JS se Machine Code tak
      </p>
      <div className="max-w-md mx-auto space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <div
              className="rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ background: step.bg, border: `1px solid ${step.border}` }}
            >
              <span className="text-lg">{step.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: step.color }}>{step.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{step.sublabel}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-0.5">
                <div className="text-[#71717A] text-xs">↓</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Event Loop Simple Diagram ─────────────────────────────────────────────────

function SimpleEventLoopDiagram() {
  const boxes = [
    { label: 'Call Stack', sublabel: 'Currently running code', color: '#7C3AED', bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.35)' },
    { label: 'Web APIs / Node APIs', sublabel: 'setTimeout, fs.readFile, fetch...', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)' },
    { label: 'Callback Queue', sublabel: 'Callbacks waiting to run', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
    { label: 'Event Loop', sublabel: 'Stack khali hua? Queue se callback utha lo!', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
  ]

  return (
    <div className="my-6 grid grid-cols-2 gap-3 max-w-md mx-auto">
      {boxes.map((box, i) => (
        <div
          key={i}
          className="rounded-xl p-3 text-center"
          style={{ background: box.bg, border: `1px solid ${box.border}` }}
        >
          <p className="font-bold text-xs mb-1" style={{ color: box.color }}>{box.label}</p>
          <p className="text-[10px] text-[#71717A] leading-relaxed">{box.sublabel}</p>
        </div>
      ))}
    </div>
  )
}

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const jsChapter1Quiz = [
  {
    question: 'JavaScript ka original naam kya tha jab Brendan Eich ne banaya tha?',
    options: [
      { text: 'JavaScript', correct: false, explanation: 'Nahi bhai — JavaScript naam baad mein pada, mostly Java ke popularity se marketing ke liye.' },
      { text: 'Mocha', correct: true, explanation: 'Bilkul sahi! Pehle Mocha tha, phir LiveScript, phir JavaScript. Interesting journey hai na?' },
      { text: 'LiveScript', correct: false, explanation: 'LiveScript ek interim naam tha — pehle Mocha tha, phir LiveScript, phir JavaScript.' },
      { text: 'ECMA-1', correct: false, explanation: 'ECMA standard ka naam hai — language ka original naam Mocha tha.' },
    ],
  },
  {
    question: 'V8 engine kaunsi company ne banaya aur kahan use hota hai?',
    options: [
      { text: 'Mozilla — Firefox mein', correct: false, explanation: 'Mozilla ka engine SpiderMonkey hai, V8 nahi.' },
      { text: 'Apple — Safari mein', correct: false, explanation: 'Safari ka engine JavaScriptCore (Nitro) hai.' },
      { text: 'Google — Chrome aur Node.js dono mein', correct: true, explanation: 'Ekdum sahi! Google ne V8 banaya — same engine Chrome aur Node.js dono use karte hain. Isliye browser aur server pe ek hi language!' },
      { text: 'Microsoft — Edge mein sirf', correct: false, explanation: 'Microsoft ka Chakra engine tha — lekin naya Edge Chromium use karta hai, jo V8 pe hai!' },
    ],
  },
  {
    question: 'Browser JS aur Node.js mein sabse bada fundamental fark kya hai?',
    options: [
      { text: 'Node.js zyada fast hai', correct: false, explanation: 'Speed same V8 engine ki wajah se comparable hai — fark environment ka hai, raw speed ka nahi.' },
      { text: 'Browser mein DOM hai, Node.js mein file system aur server APIs', correct: true, explanation: 'Haan yaar! Browser mein window, document, DOM hota hai. Node.js mein fs, http, process hota hai. Same language, bilkul alag powers!' },
      { text: 'Node.js sirf backend ke liye hai aur JS nahi samajhta', correct: false, explanation: 'Node.js JS ko bilkul samajhta hai — V8 engine hi use karta hai!' },
      { text: 'Browser mein async nahi hota', correct: false, explanation: 'Browser mein bhi async hota hai — fetch, setTimeout, event listeners sab async hain.' },
    ],
  },
  {
    question: 'JavaScript "single-threaded" hai — matlab kya hota hai practically?',
    options: [
      { text: 'Ek waqt mein sirf ek JS operation run hoti hai main thread pe', correct: true, explanation: 'Bilkul! Main thread pe ek time mein ek kaam. Lekin async operations (I/O, timers) browser/Node APIs handle karte hain — isliye "concurrent feel" milta hai without multiple threads.' },
      { text: 'JS bahut slow hai kyunki sirf ek thread hai', correct: false, explanation: 'Single-threaded = slow nahi hota. Event loop + async I/O se millions of operations handle ho sakti hain efficiently.' },
      { text: 'Ek se zyada files nahi padh sakta', correct: false, explanation: 'Files toh bahut padh sakta hai — async I/O se. Single-threaded sirf JS execution ke liye hai.' },
      { text: 'Multi-core processors use nahi kar sakta kabhi bhi', correct: false, explanation: 'Worker Threads aur Cluster module se Node.js multi-core use kar sakta hai!' },
    ],
  },
  {
    question: 'ECMAScript kya hai — JS se kya relation hai?',
    options: [
      { text: 'Ek alag programming language hai', correct: false, explanation: 'Nahi — ECMAScript alag language nahi hai.' },
      { text: 'JavaScript ka official standard / specification hai jo TC39 committee maintain karta hai', correct: true, explanation: 'Sahi bhai! ECMAScript specification hai — JS ek implementation hai. TC39 har saal naye features add karta hai. ES6 = ECMAScript 2015 — ek bada update tha.' },
      { text: 'Node.js ka package manager hai', correct: false, explanation: 'Nahi — package manager npm hai. ECMAScript standard hai.' },
      { text: 'Ek browser plugin hai', correct: false, explanation: 'Plugin nahi — ye ek language standard/specification document hai jo ECMA International maintain karta hai.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function JSChapter1Content() {
  return (
    <div className="space-y-8">
      {/* Chapter intro */}
      <div
        className="rounded-2xl p-6"
        id="intro"
        style={{
          background: 'rgba(245,158,11,0.06)',
          border: '1px solid rgba(245,158,11,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3">
          JavaScript — duniya ki sabse popular language
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          JavaScript — duniya ki sabse popular programming language. Browser, server, mobile, desktop — sab jagah. Kaise hua ye? Aur actually kaam kaise karta hai? Let&apos;s go bhai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum JS ki history samjhenge, V8 engine ko samjhenge, browser aur Node.js ka fark dekhenge, aur samjhenge ki single-threaded JS itna powerful kyun hai. Ye sab samajhna zaroori hai — baad ke chapters mein ye foundation kaam aayega.
        </p>
      </div>

      {/* ConceptCard 1: History */}
      <div id="js-history">
        <ConceptCard
          title="JavaScript Ki Kahani"
          emoji="📜"
          difficulty="beginner"
          whatIsIt="1995 mein Brendan Eich ne sirf 10 din mein JavaScript banaya — Netscape browser ke liye. Tabse ye language itni evolve hui hai ki aaj agar Brendan dekhe toh khud recognize na kare! Original naam tha Mocha, phir LiveScript, phir JavaScript. Java ke saath koi relation nahi — sirf marketing tha uss waqt Java ka hype dekh ke."
          whenToUse={[
            'Jab JS ke design decisions samajhni hon — kyun kuch cheezein "weird" lagti hain',
            'Jab ES versions ka context samajhna ho (ES5 vs ES6 vs ES2022)',
            'Jab legacy code dekhte ho aur samajhna ho ye purani style kyun thi',
            'Interviews mein — JS history ek common topic hai',
          ]}
          whyUseIt="JS ki history samajhne se uski quirks samajh mein aati hain. Kyun var hoisting hoti hai? Kyun type coercion ajeeb hai? Kyun prototypes classes se pehle aaye? Sab history mein answer hai. Language ke decisions backward compatibility aur speed of creation se aaye — 10 din mein banaya tha!"
          howToUse={{
            filename: 'js-history.js',
            language: 'javascript',
            code: `// JavaScript version timeline — jano kya kab aaya:

// ES5 (2009) — pehla bada update
// - Array methods: forEach, map, filter, reduce
// - JSON built-in
// - strict mode
'use strict' // ES5 mein aaya

// ES6 / ES2015 — MEGA UPDATE
// - let, const (finally!)
// - Arrow functions =>
// - Classes (syntax sugar)
// - Promises
// - Destructuring
// - Template literals
// - Modules (import/export)
const greet = (name) => \`Hello, \${name}!\` // ES6 style

// ES2017 — async/await aaya
async function fetchData() {
  const data = await fetch('/api/data')
  return data.json()
}

// ES2020 — modern additions
const user = null
const name = user?.profile?.name ?? 'Anonymous' // Optional chaining + nullish coalescing

// Check kar sakte ho kaunsa JS version support hai:
console.log(typeof globalThis) // 'object' — ES2020 mein aaya`,
            explanation: 'JavaScript har saal evolve hoti hai. TC39 committee proposals review karti hai aur accepted features next ES version mein jaati hain. "Stage 4" proposals almost guaranteed hote hain. MDN pe compatibility tables dekhte rehna zaroori hai.',
          }}
          realWorldScenario="Aaj React, Angular, Vue, Node.js, React Native, Electron — sab JS pe chalte hain. Ek language, everywhere. JavaScript ne khud ko browser se bahar nikala aur ab practically har computing environment mein hai. Brendan Eich ne sochा bhi na hoga 10-din ke kaam ka ye anjaam hoga!"
          commonMistakes={[
            {
              mistake: 'Ye sochna ki JavaScript aur Java related hain',
              why: 'Sirf naam mein similarity hai — marketing trick thi 1995 mein Java ke hype ko ride karne ke liye. Language design bilkul alag hai.',
              fix: 'Yaad rakho: "Java is to JavaScript as Car is to Carpet" — naam mein similarity, kaam mein nahi.',
            },
            {
              mistake: 'ES6 features use karne se darna kyunki "old browsers support nahi karte"',
              why: '2024 mein sab major browsers ES2020+ support karte hain. Agar legacy support chahiye, Babel use karo transpile karne ke liye.',
              fix: 'Hamesha modern JS likho. Babel ya TypeScript transpile kar deta hai legacy environments ke liye automatically.',
            },
          ]}
          proTip="ECMAScript (ES) official standard hai. 'ES6' = ECMAScript 2015 — ek major update tha. TC39 committee har saal naye features add karta hai. tc39.es pe sab proposals track kar sakte ho — Stage 1 se 4 tak. Stage 4 = browser mein aa gaya!"
        />
      </div>

      {/* ConceptCard 2: Browser vs Node */}
      <div id="browser-vs-node">
        <ConceptCard
          title="Browser JS vs Node.js"
          emoji="🌐"
          difficulty="beginner"
          whatIsIt="Browser mein JS DOM manipulate karta hai, events handle karta hai, user ke saath interact karta hai. Node.js mein JS files, networks, servers handle karta hai. Same language, alag environments, alag capabilities. Dono V8 use karte hain — but ek ke paas window hai, doosre ke paas process."
          whenToUse={[
            'Jab decide karna ho ki UI code browser mein likhna hai ya server pe',
            'Jab window is not defined error aaye — ye browser-only code hai',
            'Jab localStorage use karna ho — browser only, Node mein nahi',
            'Jab file system access chahiye — Node mein hai, browser mein nahi (mostly)',
          ]}
          whyUseIt="Ye fark samajhna essential hai full-stack development ke liye. Bahut baar developers browser code server pe try karte hain ya vice-versa — aur confusing errors aate hain. Ek baar environment ki limits clear ho jaayein toh debugging much easier ho jaata hai."
          howToUse={{
            filename: 'environment-check.js',
            language: 'javascript',
            code: `// Environment detect karo — browser ya Node?

// Method 1: typeof check
if (typeof window !== 'undefined') {
  // Browser environment
  console.log('Browser mein ho bhai!')
  document.title = 'JS Learning'  // OK in browser
  localStorage.setItem('key', 'value')  // Browser only!
} else {
  // Node.js environment
  console.log('Node.js pe ho!')
  const fs = require('fs')  // Node only!
  fs.writeFileSync('output.txt', 'Hello from Node')
}

// Method 2: globalThis (works everywhere — ES2020)
if (typeof globalThis.document !== 'undefined') {
  console.log('Browser')
} else {
  console.log('Node.js')
}

// Common pitfalls:
// ❌ Browser mein ye fail hoga:
// const fs = require('fs') // fs nahi hota browser mein

// ❌ Node mein ye fail hoga:
// document.getElementById('app') // document nahi hota Node mein`,
            explanation: 'typeof check se environment detect karo. globalThis dono environments mein available hai — browser mein globalThis === window, Node mein globalThis === global. Framework code mein ye pattern bahut common hai.',
          }}
          realWorldScenario="Next.js jaise frameworks issi duality ko handle karte hain — SSR (Server-Side Rendering) mein code Node pe run hota hai, client pe browser pe. Isliye Next.js mein 'use client' directive hota hai. Ye clearly bolta hai ki ye code browser pe run karega, Node pe nahi."
          commonMistakes={[
            {
              mistake: "window object Node.js mein use karna",
              why: "window browser-specific hai. Node pe window is not defined error aayega.",
              fix: "globalThis use karo — dono environments mein kaam karta hai. Ya typeof window !== 'undefined' se pehle check karo.",
            },
            {
              mistake: "Browser mein fs module require karna",
              why: "fs (file system) Node.js specific module hai — browser ke paas direct file system access nahi hota security reasons ke liye.",
              fix: "Browser mein File API use karo (user-initiated). Server pe Node ka fs module use karo.",
            },
          ]}
          proTip="window object browser mein hai, global Node.js mein. Isliye window.localStorage Node mein kaam nahi karta. Universal code likhne ke liye globalThis use karo — ye ES2020 mein standardize hua aur dono environments mein consistently kaam karta hai."
          demo={<BrowserVsNodeTable />}
        />
      </div>

      {/* ConceptCard 3: V8 Engine */}
      <div id="v8-engine">
        <ConceptCard
          title="JS Kaise Run Hoti Hai? — V8 Engine"
          emoji="⚙️"
          difficulty="beginner"
          whatIsIt="V8 Google ka JavaScript engine hai — Chrome aur Node.js dono use karte hain. Ye JS code ko machine code mein convert karta hai. JIT (Just-In-Time) compilation use karta hai — matlab pehle interpret karta hai, phir 'hot' code compile kar deta hai. Ye wajah hai ki JS ek interpreted language hone ke bawajood itni fast hai."
          whenToUse={[
            'Performance bottlenecks understand karne ke liye',
            'Memory management debug karne ke liye',
            'Hot code optimization kaise hoti hai ye samajhne ke liye',
            'Node.js flags use karne ke liye advanced debugging mein',
          ]}
          whyUseIt="V8 ki internals samajhne se tum better code likh sakte ho. Jaise — V8 object shapes (hidden classes) track karta hai. Agar tum runtime mein object properties add ya delete karo, V8 ko re-optimize karna padta hai. Consistent object shapes = faster code. Ye sirf V8 samajh ke pata chalta hai."
          howToUse={{
            filename: 'v8-demo.js',
            language: 'javascript',
            code: `// V8 ka kaam dekho practically:

// 1. Ignition (Interpreter) — fast startup
function add(a, b) {
  return a + b
}
// Pehli baar — Ignition bytecode banata hai
console.log(add(2, 3)) // 5

// 2. Turbofan (JIT Compiler) — hot code optimize hota hai
// Jab ye loop chalega, V8 samjhega ki add() baar baar call ho raha hai
// Aur isko native machine code mein compile kar dega
for (let i = 0; i < 100000; i++) {
  add(i, i + 1) // Yahan Turbofan kick in karta hai
}

// 3. Memory usage check karo:
const memBefore = process.memoryUsage().heapUsed
const arr = new Array(1000000).fill(0)
const memAfter = process.memoryUsage().heapUsed
console.log(\`Memory used: \${Math.round((memAfter - memBefore) / 1024 / 1024)} MB\`)

// 4. Heap snapshot dekhne ke liye (Node.js):
// node --prof app.js  // profiling enable karo
// node --prof-process isolate-*.log  // results dekho

// 5. V8 flags (advanced):
// node --max-old-space-size=4096 app.js  // 4GB heap
// node --v8-options | grep -i optimize   // all optimization flags`,
            explanation: 'V8 mein do main components hain: Ignition interpreter (fast startup, bytecode generate karta hai) aur Turbofan JIT compiler (hot functions ko native machine code mein compile karta hai). process.memoryUsage() se real-time heap monitoring karo. --max-old-space-size se heap limit badhao large apps ke liye.',
          }}
          realWorldScenario="Jab tum kisi production app mein JSON parsing karte ho, objects transform karte ho, string manipulation karte ho — ye sab V8 ke through hota hai. V8 ke optimizations ki wajah se hi Node.js itne high-traffic APIs handle kar paata hai. Instagram, LinkedIn, Netflix — sab Node.js use karte hain, aur sab V8 ke speed pe depend karte hain."
          commonMistakes={[
            {
              mistake: 'Objects mein runtime pe naye properties add karna',
              why: "V8 'hidden classes' use karta hai objects ko track karne ke liye. Agar runtime mein new properties add karo, V8 ko hidden class change karni padti hai — de-optimization hoti hai.",
              fix: 'Object ke saare properties constructor ya initialization mein define karo. Runtime pe naye properties add mat karo performance-critical code mein.',
            },
            {
              mistake: 'Mixed types wali arrays banana',
              why: 'V8 typed arrays ko optimize karta hai — [1, 2, 3] fast hai. [1, "two", true, null] mixed type hai — V8 isko generic slower path pe handle karta hai.',
              fix: 'Arrays mein ek hi type rakho. Agar mixed chahiye, Map ya object use karo.',
            },
          ]}
          proTip="V8 --print-bytecode flag se dekh sakte ho ki V8 tumhara code kaise interpret kar raha hai: node --print-bytecode app.js. Ye advanced debugging ke liye bahut useful hai. Production mein node --prof se flamegraph generate karo aur hot functions identify karo."
          demo={<V8Diagram />}
        />
      </div>

      {/* ConceptCard 4: Single-Threaded */}
      <div id="single-thread">
        <ConceptCard
          title="Single-Threaded JavaScript"
          emoji="🔄"
          difficulty="beginner"
          whatIsIt="JavaScript ek single main thread par run karta hai. Matlab ek time mein ek kaam. Phir bhi async operations possible hain — event loop ki wajah se. Call stack mein current sync code hota hai, Web APIs/Node APIs async work karte hain background mein, aur callback queue mein complete hue callbacks wait karte hain. Event loop ye sab orchestrate karta hai."
          whenToUse={[
            'Jab async code ka order confuse kare tab event loop yaad aao',
            'Jab CPU-heavy task server ko slow kar de — Worker Threads solution hai',
            'Jab setTimeout(fn, 0) immediately nahi chalta — event loop explain karta hai kyun',
            'Real-time applications design karte waqt — concurrency model clear hona chahiye',
          ]}
          whyUseIt="Single-threaded hone ke faayde hain: no race conditions, no deadlocks, no mutex locks — concurrent programming bahut simpler ho jaata hai. Nuksan: CPU-heavy tasks block karte hain. Solution: async I/O ke liye event loop, CPU tasks ke liye Worker Threads. Ye mental model Node.js master karne ke liye essential hai."
          howToUse={{
            filename: 'event-loop-basics.js',
            language: 'javascript',
            code: `// Event Loop ka order samjho:

console.log('1 - Sync')  // Call Stack

setTimeout(() => {
  console.log('4 - Macrotask')  // setTimeout callback
}, 0)

Promise.resolve().then(() => {
  console.log('3 - Microtask')  // Promise callback
})

console.log('2 - Sync')  // Call Stack

// Output:
// 1 - Sync
// 2 - Sync
// 3 - Microtask   ← Microtasks pehle (Promises, queueMicrotask)
// 4 - Macrotask   ← Macrotasks baad mein (setTimeout, setImmediate)

// ---

// CPU blocking ka problem:
function heavyComputation() {
  // Ye main thread block karta hai — dusre requests wait karenge!
  let sum = 0
  for (let i = 0; i < 1_000_000_000; i++) {
    sum += i
  }
  return sum
}

// Solution: Worker Thread mein move karo
const { Worker, isMainThread, parentPort } = require('worker_threads')

if (isMainThread) {
  const worker = new Worker(__filename)
  worker.on('message', (result) => console.log('Result:', result))
} else {
  const result = heavyComputation()
  parentPort.postMessage(result)  // Main thread ko result bhejo
}`,
            explanation: 'Event loop mein priority hoti hai: Sync code → Microtasks (Promises) → Macrotasks (setTimeout). CPU-blocking code ke liye Worker Threads use karo. Main thread ke liye sirf I/O coordination aur light processing rakho.',
          }}
          realWorldScenario="Netflix ne Node.js adopt kiya kyunki unka API server mostly I/O karta hai — database fetch, upstream services ko calls, JSON serialize/deserialize. Ye sab async hai. Single-threaded event loop se unhe millions of concurrent connections handle karne mein madad mili, bina traditional threading overhead ke. Aaj unka API server Node.js pe hai!"
          commonMistakes={[
            {
              mistake: 'Synchronous file operations server code mein use karna',
              why: 'fs.readFileSync, fs.writeFileSync ye sab main thread block karte hain. Server ka ek bhi request serve nahi hoga jab tak operation complete na ho.',
              fix: 'Hamesha async versions: fs.readFile(), fs.promises.readFile(), ya fs.createReadStream(). CLI scripts mein sync theek hai, server mein kabhi nahi.',
            },
            {
              mistake: 'Large JSON parsing main thread pe karna',
              why: 'JSON.parse(largeString) blocking operation hai. 50MB JSON parse karne mein seconds lag sakte hain — server completely unresponsive.',
              fix: 'Large data ke liye Worker Thread mein parse karo. Ya streaming JSON parser use karo jaise jsonstream package.',
            },
          ]}
          proTip="Web Workers se browser mein multi-threading possible hai. Node.js mein Worker Threads. But 99% code single-threaded hai — aur ye fine hai! Sirf CPU-bound operations ke liye Workers chahiye. I/O ke liye event loop hi best hai. Rule: agar kaam 10ms se zyada le raha hai CPU pe, Worker mein move karo."
          demo={<SimpleEventLoopDiagram />}
        />
      </div>

      {/* ConceptCard 5: Setup */}
      <div id="setup">
        <ConceptCard
          title="Tumhara JavaScript Environment Setup"
          emoji="🛠️"
          difficulty="beginner"
          whatIsIt="JS seekhne ke liye tumhare paas teen cheezein chahiye: ek editor (VS Code best hai), Node.js installed (nvm se install karo — version manage karna easy hoga), aur Chrome browser (DevTools ke saath). Ye sab free hain aur industry-standard hain."
          whenToUse={[
            'Naya computer setup karte waqt — pehle nvm, phir Node',
            'Multiple projects ke liye different Node versions manage karne ke liye nvm use karo',
            'Browser mein quick JS experiment ke liye Chrome DevTools Console',
            'VS Code extensions se productivity 2x ho jaati hai',
          ]}
          whyUseIt="Sahi tools se learning 10x fast hoti hai. VS Code mein IntelliSense, error highlighting, aur Git integration built-in hai. nvm se Node versions switch karna easy hai. Chrome DevTools mein JS directly browser mein test kar sakte ho without any files."
          howToUse={{
            filename: 'setup.sh',
            language: 'bash',
            code: `# 1. nvm install (macOS/Linux):
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# nvm se Node install karo:
nvm install --lts          # Latest LTS version
nvm use --lts              # Use karo
node --version             # Verify: v20.x.x
npm --version              # Verify: 10.x.x

# 2. VS Code Extensions install karo:
# - ESLint (linting)
# - Prettier (formatting)
# - JavaScript (ES6) code snippets
# - GitLens

# 3. Pehla JS file banao aur run karo:
# hello.js file banao:
# console.log('Namaste Duniya!')
# console.log('Node version:', process.version)

node hello.js
# Output:
# Namaste Duniya!
# Node version: v20.11.0

# 4. Browser Console mein try karo:
# Chrome kholo → F12 → Console tab
# Type karo:
# console.log('Hello from browser!')
# 2 + 2  // Returns 4
# ['bhai', 'yaar', 'dekho'].map(w => w.toUpperCase())`,
            explanation: 'nvm (Node Version Manager) se multiple Node versions maintain karo. Different projects ko alag versions chahiye hote hain. VS Code mein extensions se code quality automatic improve hoti hai. Chrome DevTools Console quickest playground hai JS experiments ke liye.',
          }}
          realWorldScenario="Ek professional JS developer ke workflow mein: nvm se Node version manage karo, VS Code mein code likho with ESLint + Prettier, git se version control karo, aur Chrome DevTools se debug karo. Ye sab setup ek baar karo aur lifetime kaam aata hai."
          commonMistakes={[
            {
              mistake: 'Node.js directly website se download karke install karna (without nvm)',
              why: 'Bina nvm ke versions switch karna bahut mushkil hota hai. Alag projects ke alag Node versions ho sakte hain.',
              fix: 'Hamesha nvm (macOS/Linux) ya nvm-windows use karo Node install karne ke liye. nvm install 18; nvm install 20 — dono maintain karo.',
            },
            {
              mistake: 'Chrome DevTools Console mein multi-line code single Enter pe submit karna',
              why: 'Enter key single line submit karta hai. Multi-line code ke liye Shift+Enter chahiye.',
              fix: 'Console mein multi-line code likhne ke liye Shift+Enter use karo. Ya Snippets tab mein likhke run karo.',
            },
          ]}
          proTip="Chrome DevTools Console mein multi-line code likhne ke liye Shift+Enter use karo — ye new line add karta hai bina submit kiye. Aur try karo: $0 type karo Console mein after selecting a DOM element in Elements tab — ye selected element return karta hai. Bahut useful trick hai!"
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 1 Quiz — JS Basics Check
          </h3>
          <p className="text-sm text-[#71717A]">
            Dekho yaar kitna samjha — 5 sawaal, 80%+ chahiye pass ke liye!
          </p>
        </div>
        <QuizSection questions={jsChapter1Quiz} chapterSlug="js-what-why" />
      </div>
    </div>
  )
}
