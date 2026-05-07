'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Architecture Diagram ──────────────────────────────────────────────────────

function ArchitectureDiagram() {
  const layers = [
    {
      label: 'Your Code',
      sublabel: 'JavaScript / TypeScript',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.15)',
      border: 'rgba(124,58,237,0.4)',
      icon: '📝',
    },
    {
      label: 'Node.js APIs',
      sublabel: 'fs, http, crypto, path, events...',
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.1)',
      border: 'rgba(6,182,212,0.35)',
      icon: '📦',
    },
    {
      label: 'V8 Engine + libuv',
      sublabel: 'JS execution + async I/O + thread pool',
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      border: 'rgba(245,158,11,0.35)',
      icon: '⚙️',
    },
    {
      label: 'OS / Hardware',
      sublabel: 'Linux / macOS / Windows — epoll, kqueue, IOCP',
      color: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
      border: 'rgba(16,185,129,0.35)',
      icon: '🖥️',
    },
  ]

  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">
        Node.js Architecture — Layer by Layer
      </p>
      <div className="max-w-lg mx-auto space-y-2">
        {layers.map((layer, i) => (
          <div key={i} className="relative">
            <div
              className="rounded-xl px-5 py-3.5 flex items-center gap-4"
              style={{
                background: layer.bg,
                border: `1px solid ${layer.border}`,
              }}
            >
              <span className="text-xl">{layer.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: layer.color }}>
                  {layer.label}
                </p>
                <p className="text-xs text-[#71717A] mt-0.5">{layer.sublabel}</p>
              </div>
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: layer.color }}
              />
            </div>
            {i < layers.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-px h-3 bg-[rgba(255,255,255,0.15)]" />
                  <div
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{ color: '#71717A', background: 'rgba(255,255,255,0.04)' }}
                  >
                    ↓ calls
                  </div>
                  <div className="w-px h-3 bg-[rgba(255,255,255,0.15)]" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const architectureQuiz = [
  {
    question: 'V8 engine ka main kaam kya hai Node.js mein?',
    options: [
      { text: 'File system operations handle karna', correct: false, explanation: 'File system libuv handle karta hai, V8 nahi.' },
      { text: 'JavaScript ko machine code mein compile karna', correct: true, explanation: 'Bilkul sahi! V8 JIT compilation use karta hai — JavaScript ko native machine code mein convert karta hai.' },
      { text: 'HTTP requests handle karna', correct: false, explanation: 'HTTP requests Node.js ka http module aur libuv handle karta hai.' },
      { text: 'Database connections manage karna', correct: false, explanation: 'Database connections tumhara code aur database drivers manage karte hain, V8 nahi.' },
    ],
  },
  {
    question: 'libuv Node.js mein kyun zaroori hai?',
    options: [
      { text: 'JavaScript syntax validate karne ke liye', correct: false, explanation: 'Syntax validation V8 ka kaam hai.' },
      { text: 'CSS styles apply karne ke liye', correct: false, explanation: 'CSS browser ka domain hai, Node.js ka nahi!' },
      { text: 'Async I/O operations ko non-blocking tarike se handle karne ke liye', correct: true, explanation: 'Sahi! libuv OS-level async APIs use karta hai — epoll (Linux), kqueue (macOS), IOCP (Windows) — taaki I/O operations block na hon.' },
      { text: 'Memory allocate karne ke liye', correct: false, explanation: 'Memory management V8 ka kaam hai.' },
    ],
  },
  {
    question: 'Node.js ko "single-threaded" kyun kaha jaata hai?',
    options: [
      { text: 'Kyunki ye sirf ek file process kar sakta hai', correct: false, explanation: 'Node.js multiple files process kar sakta hai.' },
      { text: 'Kyunki iska main JavaScript execution loop ek hi thread par run hota hai', correct: true, explanation: 'Bilkul sahi! Main JS thread ek hi hai, lekin libuv ke thread pool se I/O concurrently hoti hai.' },
      { text: 'Kyunki ye multi-core CPUs support nahi karta', correct: false, explanation: 'Node.js cluster module aur worker threads se multi-core use kar sakta hai.' },
      { text: 'Kyunki ye slow hai', correct: false, explanation: 'Single-threaded hone se speed slow nahi hoti — async I/O se performance excellent hoti hai I/O-bound tasks mein.' },
    ],
  },
  {
    question: 'V8 mein --max-old-space-size flag kab use karte hain?',
    options: [
      { text: 'Jab app crash kar rahi ho network error se', correct: false, explanation: 'Network errors ke liye alag debugging approach hai.' },
      { text: 'Jab default 512MB heap kaafi na ho large applications ke liye', correct: true, explanation: 'Correct! Large data processing apps (like AI pipelines) mein default heap size increase karni padti hai.' },
      { text: 'Jab code mein syntax error ho', correct: false, explanation: 'Syntax errors ke liye ye flag koi kaam ka nahi.' },
      { text: 'Hamesha production mein', correct: false, explanation: 'Sirf jab genuinely zyada memory chahiye — unnecessary increase se wastage hoti hai.' },
    ],
  },
  {
    question: 'UV_THREADPOOL_SIZE environment variable kya control karta hai?',
    options: [
      { text: 'V8 engine ke liye available CPU cores', correct: false, explanation: 'CPU cores OS level par hote hain, UV_THREADPOOL_SIZE se control nahi hote.' },
      { text: 'libuv ke worker threads ki count jo I/O operations ke liye use hote hain', correct: true, explanation: 'Sahi! Default 4 threads hote hain, max 128 tak badha sakte ho — heavy file I/O apps ke liye helpful.' },
      { text: 'HTTP concurrent connections ki limit', correct: false, explanation: 'HTTP connections ke liye alag settings hain.' },
      { text: 'Memory pool ka size', correct: false, explanation: 'Memory pool alag concept hai.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Chapter1Content() {
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
          Node.js ke andar kya hota hai?
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Jab tum <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">node app.js</code> run karte ho, toh ek poori duniya activate hoti hai. V8 tumhara code padhta hai, libuv async operations handle karta hai, aur event loop sab kuch orchestra karta hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum Node.js ki architecture samjhenge — layer by layer. Ye samajhna zaroori hai kyunki jab koi bug aata hai ya performance issue hota hai, tab architecture ki understanding hi tumhe sahi direction deti hai.
        </p>
      </div>

      {/* Architecture Diagram */}
      <div id="architecture-diagram">
        <ArchitectureDiagram />
      </div>

      {/* ConceptCard 1: V8 */}
      <div id="v8-engine">
        <ConceptCard
          title="V8 Engine"
          emoji="🔥"
          difficulty="beginner"
          whatIsIt="V8 ek JavaScript engine hai jo Google ne banaya — same jo Chrome mein use hota hai. Ye JS code ko machine code mein convert karta hai. Bhai, ye itna fast hai ki JS ko compiled languages se compete karne laayak bana deta hai."
          whenToUse={[
            'Jab tumhe samajhna ho ki JavaScript actually machine pe kaise run hoti hai',
            'Performance issues debug karte waqt — V8 ki internals samjho',
            'Memory management samajhne ke liye — heap aur garbage collection',
            'JIT compilation ki wajah se kuch code paths faster kyun hain ye samjhne ke liye',
          ]}
          whyUseIt="V8 JIT (Just-In-Time) compilation use karta hai — matlab ye JS ko pehle interpret karta hai, phir 'hot' code (jo baar baar run hota hai) ko native machine code mein compile kar deta hai. Pehle run mein thoda slow, lekin baad mein compiled languages jaisi speed. Is wajah se Node.js fast hai."
          howToUse={{
            filename: 'app.js',
            language: 'javascript',
            code: `// Ye simple script V8 ke through kaise jaati hai:
const greet = (name) => \`Hello, \${name}!\`

// Step 1: V8 parse karta hai — AST (Abstract Syntax Tree) banata hai
// Step 2: Ignition interpreter bytecode generate karta hai
// Step 3: Turbofan JIT compiler "hot" functions ko machine code mein compile karta hai

// Pehli baar — interpreted
console.log(greet('World'))

// Agar ye loop mein hai — V8 isko optimize karta hai
for (let i = 0; i < 1000; i++) {
  greet(\`User \${i}\`)
  // Yahan Turbofan kick in ho jaata hai aur native machine code generate hota hai
}

// Memory check — V8 ke heap ka usage
const used = process.memoryUsage()
console.log(\`Heap used: \${Math.round(used.heapUsed / 1024 / 1024)} MB\`)
console.log(\`Heap total: \${Math.round(used.heapTotal / 1024 / 1024)} MB\`)`,
            explanation: 'V8 do phases mein kaam karta hai — pehle Ignition interpreter bytecode banata hai (fast startup), phir Turbofan JIT compiler hot functions ko optimize karta hai (fast execution). process.memoryUsage() se tum dekh sakte ho V8 ka heap kya use kar raha hai.',
          }}
          realWorldScenario="Jab tum kisi SaaS product mein AI response process karte ho — JSON parsing, string manipulation, object transformation — ye sab kuch V8 hi execute karta hai. Microseconds mein. Is wajah se Node.js modern APIs ke liye itna popular hai — V8 ki speed backed by libuv's async power."
          commonMistakes={[
            {
              mistake: 'Assume karna ki JavaScript hamesha slow hoti hai',
              why: 'Purana myth hai. V8 ke JIT compiler ne JS ko Java aur C++ ke kaafi close la diya hai CPU-bound tasks mein.',
              fix: 'Benchmark karo pehle. V8 optimized loops aur functions mein surprisingly fast hai.',
            },
            {
              mistake: 'Garbage collection ko ignore karna memory leaks ke time',
              why: 'V8 garbage collection karta hai, lekin agar objects ki references bani rahen (closures, global arrays), toh GC unhe collect nahi kar sakta.',
              fix: 'Large arrays/objects ke saath kaam karte time unhe explicitly null karo jab kaam ho jaaye. WeakMap/WeakRef use karo cache ke liye.',
            },
          ]}
          proTip="V8 mein --max-old-space-size flag se heap size control kar sakte ho. Default 512MB hai — large apps ke liye increase karo: node --max-old-space-size=4096 app.js. Production mein hamesha memory limits set karo."
        />
      </div>

      {/* ConceptCard 2: libuv */}
      <div id="libuv">
        <ConceptCard
          title="libuv — The Hidden Hero"
          emoji="⚡"
          difficulty="beginner"
          whatIsIt="libuv ek C library hai jo Node.js ke andar chhupa hua hai. Ye async I/O operations ko handle karta hai — file system, networking, timers, sab kuch. Ye hi Node.js ko non-blocking banata hai. Bina libuv ke, Node.js ek normal blocking runtime hoti."
          whenToUse={[
            'Async behavior samajhna ho — kyun setTimeout alag time par fire hota hai',
            'Performance bottlenecks dhundho — file I/O slow kyun hai',
            'Thread pool tuning — UV_THREADPOOL_SIZE adjust karna',
            'Cross-platform async — libuv OS differences abstract karta hai',
          ]}
          whyUseIt="Without libuv, Node.js ko har I/O ke liye ek nayi thread create karni padti — jaise Java ya traditional servers karte hain. libuv OS-level async APIs use karta hai: Linux mein epoll, macOS mein kqueue, Windows mein IOCP. Ye 'event notification' system hai — OS notify karta hai jab I/O ready ho jaata hai, aur tab Node.js callback run karta hai. No wasted threads waiting!"
          howToUse={{
            filename: 'libuv-demo.js',
            language: 'javascript',
            code: `const fs = require('fs')

console.log('1. Start — main thread')

// libuv isko thread pool ko deta hai
fs.readFile('package.json', 'utf8', (err, data) => {
  // Ye callback tab run hoti hai jab OS ne file read kar li
  console.log('3. File read ho gayi —', data.length, 'bytes')
})

// Main thread block nahi hota — aage badhta hai
console.log('2. File read request bhej di — aage chalte hain')

// Output:
// 1. Start — main thread
// 2. File read request bhej di — aage chalte hain
// 3. File read ho gayi — 234 bytes

// libuv ke thread pool ka size dekhne ke liye:
// UV_THREADPOOL_SIZE=8 node app.js`,
            explanation: 'libuv file read request ko thread pool mein de deta hai. Main JS thread block nahi hota — "2" print ho jaata hai. Jab OS file read karke data deta hai, libuv event loop ko notify karta hai, aur callback run hoti hai. Yahi "non-blocking" ka matlab hai.',
          }}
          realWorldScenario="Jab tumhara Express server 1000 concurrent requests handle karta hai bina crash kiye — ye libuv ka kaam hai. Har request ke liye nayi OS thread nahi banti (jo expensive hoti hai), balki libuv async I/O notifications use karta hai. Yahi Node.js ko high-concurrency applications ke liye ideal banata hai."
          commonMistakes={[
            {
              mistake: 'CPU-heavy tasks main thread par run karna',
              why: 'libuv I/O async karta hai, lekin CPU computation (encryption, image processing, ML inference) hamesha main thread ko block karti hai — dusre requests wait karte hain.',
              fix: 'CPU-bound tasks ke liye Worker Threads use karo (Chapter 17 mein details hain). Main thread ko free rakho I/O ke liye.',
            },
            {
              mistake: 'UV_THREADPOOL_SIZE ko ignore karna file-heavy apps mein',
              why: 'Default 4 threads hain — agar 100 concurrent file operations ho rahi hain, toh 96 queue mein wait karengi.',
              fix: 'UV_THREADPOOL_SIZE=16 ya usse zyada set karo file-heavy apps ke liye. Max 128 hai.',
            },
          ]}
          proTip="UV_THREADPOOL_SIZE environment variable se libuv ka thread pool size badha sakte ho. Default 4 hai, max 128. File-heavy apps ke liye useful hai: UV_THREADPOOL_SIZE=16 node server.js. Lekin zyada threads = zyada memory, toh sensibly tune karo."
        />
      </div>

      {/* ConceptCard 3: Event Loop Brief */}
      <div id="event-loop-intro">
        <ConceptCard
          title="Event Loop — Teaser"
          emoji="🔄"
          difficulty="beginner"
          whatIsIt="Event Loop Node.js ka dil hai. Ye continuously check karta hai — koi callback ready hai? Koi promise resolve hua? Koi timer expire hua? Phir use execute karta hai. Ye hi single-threaded Node.js ko concurrent feel deta hai."
          whenToUse={[
            'Jab setTimeout vs Promise behavior confuse kare',
            'Jab async code unexpected order mein execute ho',
            'Performance optimization ke liye — kya block ho raha hai loop ko',
          ]}
          whyUseIt="Event Loop ke bina Node.js ek simple script runner hoti. Event Loop hi usse production-grade server runtime banata hai. Ye ensure karta hai ki koi bhi callback tab tak run na ho jab tak current synchronous code complete na ho jaaye."
          howToUse={{
            filename: 'event-loop-taste.js',
            language: 'javascript',
            code: `// Event Loop ka magic dekho:
console.log('A') // Synchronous — seedha

setTimeout(() => console.log('B'), 0) // Macrotask — baad mein

Promise.resolve().then(() => console.log('C')) // Microtask — macrotask se pehle

console.log('D') // Synchronous — seedha

// Output: A D C B
// Kyun? Sync code pehle, phir microtasks (Promises), phir macrotasks (setTimeout)`,
            explanation: 'Ye output order event loop ki phases explain karta hai. Synchronous code pehle, phir microtask queue (Promises), phir macrotask queue (setTimeout, setInterval). Full chapter 2 mein ye sab detail mein cover hoga!',
          }}
          realWorldScenario="Jab API call ke baad data update karte ho, Event Loop ensure karta hai ki UI/response update atomic ho — bich mein koi aur callback interfere na kare."
          commonMistakes={[
            {
              mistake: 'Ye sochna ki setTimeout(fn, 0) immediately execute hoga',
              why: 'setTimeout always macrotask queue mein jaata hai — current sync code aur all microtasks pehle run honge.',
              fix: 'Immediate async execution ke liye queueMicrotask() ya Promise.resolve().then() use karo.',
            },
          ]}
          proTip="Full Event Loop mastery ke liye Chapter 2 padho — wahan phases (timers, I/O, poll, check, close), microtasks vs macrotasks, aur process.nextTick sab cover hai. Ye course ka sabse important chapter hai!"
        />
      </div>

      {/* ConceptCard 4: Single-threaded Concurrency */}
      <div id="single-threaded">
        <ConceptCard
          title="Single-Threaded Concurrency"
          emoji="🧵"
          difficulty="beginner"
          whatIsIt="Node.js ek single main thread par run karta hai — matlab ek time mein ek hi JS code execute hoti hai. But! Ye concurrency achieve karta hai async I/O ke through. Ye contradiction nahi hai — ye genius hai. Single thread = no race conditions, no mutex, no deadlocks. Complexity drastically kam ho jaati hai."
          whenToUse={[
            'I/O-heavy applications — web servers, APIs, file processors',
            'High concurrency chahiye lekin CPU-intensive kaam nahi — thousands of simultaneous connections',
            'Real-time apps — chat servers, live dashboards, notifications',
            'Microservices jo mostly API calls aur database queries karte hain',
          ]}
          whyUseIt="Traditional multi-threaded servers (Java, PHP) har request ke liye ek nayi thread banate hain. 1000 requests = 1000 threads = heavy memory usage. Node.js mein 1000 requests bhi mostly libuv handle karta hai — main thread sirf callbacks run karta hai. Memory efficient, simpler code, no synchronization nightmares."
          howToUse={{
            filename: 'sync-vs-async.js',
            language: 'javascript',
            code: `// ❌ Blocking — main thread rok deta hai
const fs = require('fs')

// WRONG: synchronous read — server hang ho jaata hai
const data = fs.readFileSync('huge-file.json') // Blocks!
console.log('Data:', data.length)

// ✅ Non-blocking — main thread free rehta hai
fs.readFile('huge-file.json', (err, data) => {
  // Ye tab run hota hai jab file ready ho
  console.log('Data:', data.length)
})

// Main thread dusre kaam karta rehta hai:
server.on('request', (req, res) => {
  // Ye handle hota hai jab file read ho rahi ho
  res.end('Server alive!')
})`,
            explanation: 'readFileSync main thread ko block karta hai — koi bhi aur request tab tak handle nahi hogi. readFile async hai — main thread dusre requests serve karta rehta hai jab tak file read ho. Ye difference hi Node.js ki scalability ka secret hai.',
          }}
          realWorldScenario="Netflix ne Node.js adopt kiya kyunki unka API server mostly I/O karta hai — database se data fetch, upstream services ko calls. Single-threaded event loop se unhe millions of concurrent connections handle karne mein madad mili, bina traditional threading overhead ke."
          commonMistakes={[
            {
              mistake: 'CPU-intensive operations main thread par karna — jaise large JSON parsing, image resizing',
              why: 'CPU task main thread ko block karta hai — server completely unresponsive ho jaata hai jab tak task complete na ho.',
              fix: 'Worker Threads (worker_threads module) use karo CPU-bound tasks ke liye. Ye actual OS threads hain — main thread ko free rakhte hain.',
            },
            {
              mistake: 'Synchronous file APIs use karna server code mein',
              why: 'fs.readFileSync, fs.writeFileSync — ye sab block karte hain. CLI scripts mein theek hai, server mein kabhi nahi.',
              fix: 'Hamesha async versions use karo: fs.readFile(), fs.promises.readFile(), ya fs.createReadStream().',
            },
          ]}
          proTip="Worker threads ke liye: const { Worker } = require('worker_threads'). CPU-bound tasks (ML inference, image processing, heavy encryption) ko workers mein offload karo. Main thread sirf I/O coordination aur request routing kare — yahi ideal architecture hai."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 1 Quiz — Architecture Check
          </h3>
          <p className="text-sm text-[#71717A]">
            Dekho kitna samjha — 5 questions, 80%+ chahiye pass ke liye!
          </p>
        </div>
        <QuizSection questions={architectureQuiz} chapterSlug="what-is-nodejs" />
      </div>
    </div>
  )
}
