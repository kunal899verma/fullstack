'use client'

import React from 'react'
import Link from 'next/link'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Event Loop Phase Diagram ──────────────────────────────────────────────────

function EventLoopPhaseDiagram() {
  const phases = [
    {
      name: 'timers',
      label: 'Timers Phase',
      desc: 'setTimeout() & setInterval() callbacks',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.12)',
      border: 'rgba(124,58,237,0.35)',
      icon: '⏱️',
    },
    {
      name: 'pending',
      label: 'Pending I/O',
      desc: 'Previous cycle ke deferred I/O callbacks',
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      border: 'rgba(245,158,11,0.3)',
      icon: '⏳',
    },
    {
      name: 'idle',
      label: 'Idle / Prepare',
      desc: 'Internal use only (libuv internals)',
      color: '#71717A',
      bg: 'rgba(113,113,122,0.08)',
      border: 'rgba(113,113,122,0.2)',
      icon: '💤',
    },
    {
      name: 'poll',
      label: 'Poll Phase',
      desc: 'Nayi I/O events fetch karo — yahan block hota hai agar koi timer na ho',
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.1)',
      border: 'rgba(6,182,212,0.3)',
      icon: '🔍',
    },
    {
      name: 'check',
      label: 'Check Phase',
      desc: 'setImmediate() callbacks yahan run hote hain',
      color: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
      border: 'rgba(16,185,129,0.3)',
      icon: '✅',
    },
    {
      name: 'close',
      label: 'Close Callbacks',
      desc: 'socket.destroy() ya close events',
      color: '#EF4444',
      bg: 'rgba(239,68,68,0.08)',
      border: 'rgba(239,68,68,0.25)',
      icon: '🔒',
    },
  ]

  return (
    <div className="my-6">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">
        Event Loop — 6 Phases (libuv)
      </p>
      <div className="flex flex-col items-center gap-1.5">
        {/* Microtask priority box at top */}
        <div
          className="w-full max-w-md rounded-xl px-4 py-2.5 flex items-center gap-3 mb-2"
          style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)' }}
        >
          <span className="text-lg">⚡</span>
          <div className="flex-1">
            <p className="text-xs font-bold text-[#9D5FF0]">Microtask Queue (hamesha pehle!)</p>
            <p className="text-[10px] text-[#71717A] mt-0.5">process.nextTick → Promise.then → phir phases</p>
          </div>
          <div className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: 'rgba(124,58,237,0.2)', color: '#9D5FF0' }}>
            HIGH PRIORITY
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-[#52525B] mb-1">
          <div className="w-px h-4 bg-[rgba(255,255,255,0.1)]" />
          <span>har phase ke baad microtasks check hoti hain</span>
          <div className="w-px h-4 bg-[rgba(255,255,255,0.1)]" />
        </div>

        {phases.map((phase, i) => (
          <div key={phase.name} className="w-full max-w-md">
            <div
              className="rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ background: phase.bg, border: `1px solid ${phase.border}` }}
            >
              <span className="text-lg">{phase.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate" style={{ color: phase.color }}>{phase.label}</p>
                <p className="text-[10px] text-[#71717A] mt-0.5 leading-relaxed">{phase.desc}</p>
              </div>
              <div
                className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: `${phase.color}18`, color: phase.color }}
              >
                #{i + 1}
              </div>
            </div>
            {i < phases.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="w-px h-3 bg-[rgba(255,255,255,0.12)]" />
              </div>
            )}
          </div>
        ))}

        {/* Loop back arrow */}
        <div className="flex items-center gap-2 mt-2">
          <div className="w-12 h-px bg-[rgba(255,255,255,0.12)]" />
          <span className="text-[10px] text-[#52525B]">↺ loop repeat hota rehta hai</span>
          <div className="w-12 h-px bg-[rgba(255,255,255,0.12)]" />
        </div>
      </div>
    </div>
  )
}

// ── Execution Order Visual ─────────────────────────────────────────────────────

function ExecutionOrderVisual() {
  const steps = [
    { num: 1, label: 'Synchronous Code', sublabel: 'Call Stack — seedha chalega', color: '#06B6D4', icon: '📚' },
    { num: 2, label: 'process.nextTick()', sublabel: 'nextTick queue — microtasks se bhi pehle!', color: '#EC4899', icon: '⚡' },
    { num: 3, label: 'Promise.then / .catch', sublabel: 'Microtask queue — high priority', color: '#7C3AED', icon: '🔮' },
    { num: 4, label: 'setTimeout / setInterval', sublabel: 'Macrotask queue — timers phase', color: '#F59E0B', icon: '⏱️' },
    { num: 5, label: 'I/O Callbacks', sublabel: 'File, network operations complete', color: '#10B981', icon: '📁' },
    { num: 6, label: 'setImmediate()', sublabel: 'Check phase — I/O ke turant baad', color: '#06B6D4', icon: '✅' },
    { num: 7, label: 'Close Callbacks', sublabel: 'socket.close, connection cleanup', color: '#EF4444', icon: '🔒' },
  ]

  return (
    <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="px-4 py-3" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-xs font-bold uppercase tracking-widest text-[#71717A]">Execution Priority Order — Yaad Kar Lo!</p>
      </div>
      <div className="divide-y divide-[rgba(255,255,255,0.04)]">
        {steps.map((step) => (
          <div key={step.num} className="flex items-center gap-3 px-4 py-3">
            <div
              className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ background: `${step.color}20`, color: step.color, border: `1px solid ${step.color}40` }}
            >
              {step.num}
            </div>
            <span className="text-base">{step.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#F5F5F7]">{step.label}</p>
              <p className="text-[10px] text-[#71717A] mt-0.5">{step.sublabel}</p>
            </div>
            {step.num <= 3 && (
              <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(124,58,237,0.15)', color: '#9D5FF0' }}>
                {step.num === 1 ? 'SYNC' : 'MICRO'}
              </span>
            )}
            {step.num > 3 && (
              <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }}>
                MACRO
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Chapter Quiz data ─────────────────────────────────────────────────────────

const eventLoopQuiz = [
  {
    question: 'Node.js Event Loop mein Microtask Queue (Promises) kab execute hoti hai?',
    options: [
      {
        text: 'setTimeout callbacks ke baad',
        correct: false,
        explanation: 'Nahi! Microtasks hamesha macrotasks se pehle run karte hain. setTimeout ek macrotask hai.',
      },
      {
        text: 'Har macrotask ke baad, next macrotask se pehle',
        correct: true,
        explanation: 'Bilkul sahi! Ek macrotask complete hone ke baad, puri microtask queue clear hoti hai, phir agla macrotask start hota hai.',
      },
      {
        text: 'Sync code ke saath same time',
        correct: false,
        explanation: 'Nahi! Sync code pehle hota hai, phir microtask aur macrotask queues process hoti hain.',
      },
      {
        text: 'Randomly jab event loop free ho',
        correct: false,
        explanation: 'Event loop random nahi hai — fixed priority order follow karta hai: Sync → nextTick → Microtasks → Macrotasks.',
      },
    ],
  },
  {
    question: 'Kya hoga is code mein? setTimeout(fn, 0) vs Promise.resolve().then(fn) — kaunsa pehle execute hoga?',
    options: [
      {
        text: 'setTimeout pehle',
        correct: false,
        explanation: 'setTimeout macrotask hai — microtasks (Promise) ke baad aata hai. Chahe timeout 0ms ho.',
      },
      {
        text: 'Promise pehle',
        correct: true,
        explanation: 'Promise microtask queue mein hai — macrotask queue (setTimeout) se hamesha pehle execute hota hai, chahe timeout 0ms kyun na ho.',
      },
      {
        text: 'Dono saath chalenge',
        correct: false,
        explanation: 'JavaScript single-threaded hai — ek hi time mein ek cheez execute hoti hai, concurrent nahi.',
      },
      {
        text: 'Jo pehle declare hua woh pehle chalega',
        correct: false,
        explanation: 'Declaration order matter nahi karta — queue type (microtask vs macrotask) matter karta hai.',
      },
    ],
  },
  {
    question: 'Event Loop ko "block" karne ka matlab kya hai aur kya hota hai?',
    options: [
      {
        text: 'Too many setTimeout calls — server slow ho jaata hai',
        correct: false,
        explanation: 'setTimeout non-blocking hai — ye queue mein jaata hai, main thread block nahi hota.',
      },
      {
        text: 'Synchronous code jo bahut time le — baaki sab requests wait karti hain',
        correct: true,
        explanation: 'Bilkul! Jab sync code lamba time leta hai (heavy JSON.parse, tight loop, blocking crypto), event loop doosri callbacks process nahi kar sakta. Server unresponsive ho jaata hai!',
      },
      {
        text: 'Zyada saari Promises banana — memory full ho jaati hai',
        correct: false,
        explanation: 'Promises async hain — ye event loop block nahi karti. Memory issue alag concern hai.',
      },
      {
        text: 'Memory zyada use karna — garbage collection run karta hai',
        correct: false,
        explanation: 'GC thodi der ke liye pause karta hai, lekin ye event loop blocking nahi hai.',
      },
    ],
  },
  {
    question: 'process.nextTick() aur Promise.then() mein kya fark hai priority ke liye?',
    options: [
      {
        text: 'Dono same priority mein hain — microtask queue mein',
        correct: false,
        explanation: 'Nahi — process.nextTick() alag "nextTick queue" mein hai, Promise microtask queue mein. Alag priorities!',
      },
      {
        text: 'Promise.then() pehle execute hota hai',
        correct: false,
        explanation: 'process.nextTick() HAMESHA Promise.then() se pehle execute hota hai. nextTick queue highest priority hai.',
      },
      {
        text: 'process.nextTick() pehle execute hota hai',
        correct: true,
        explanation: 'Sahi! process.nextTick() "nextTick queue" mein hai — microtask queue (Promises) se bhi high priority. Order: nextTick → Promises → Macrotasks.',
      },
      {
        text: 'Dono same time execute hote hain',
        correct: false,
        explanation: 'JS single-threaded hai — ek time pe ek hi cheez. Aur dono alag queues mein alag priorities par hain.',
      },
    ],
  },
  {
    question: "Ye code kya output dega?\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');",
    options: [
      {
        text: 'A, B, C, D',
        correct: false,
        explanation: "B aur C async hain — sync code ke baad execute hote hain. D 'A' ke baad seedha print hoga.",
      },
      {
        text: 'A, D, B, C',
        correct: false,
        explanation: 'C (Promise/microtask) B (setTimeout/macrotask) se pehle execute hota hai — ye order galat hai.',
      },
      {
        text: 'A, D, C, B',
        correct: true,
        explanation: 'Bilkul! Sync: A, D pehle. Phir microtask queue: C (Promise). Phir macrotask queue: B (setTimeout). Ye event loop ka golden rule hai!',
      },
      {
        text: 'D, A, C, B',
        correct: false,
        explanation: "Sync code top-to-bottom execute hota hai — A pehle aa jayega, D baad mein. 'D, A' order galat hai.",
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Chapter2Content() {
  return (
    <div className="space-y-8">

      {/* ── Chapter Intro ──────────────────────────────────────────────────── */}
      <div
        id="intro"
        className="rounded-2xl p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(6,182,212,0.05) 100%)',
          border: '1px solid rgba(124,58,237,0.25)',
        }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-bold text-[#F5F5F7] mb-3">
          Event Loop JavaScript ka part hi nahi hai — phir bhi har cheez isi par depend hai!
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-4 text-base">
          Suno — bahut log sochte hain Event Loop JavaScript ka feature hai. GALAT! JavaScript engine (V8) khud akela sirf ek kaam karta hai: ek line execute karo. Event Loop Node.js (ya browser) ka feature hai — JS engine ke bahar. Ye ek gatekeeper ki tarah hai jo decide karta hai ki JavaScript kab kya chalayega. Aur yahi woh mechanism hai jo Node.js ko non-blocking banata hai.
        </p>

        {/* Quote callout */}
        <div
          className="rounded-xl p-4 mb-5"
          style={{
            background: 'rgba(124,58,237,0.06)',
            borderLeft: '4px solid #7C3AED',
          }}
        >
          <p className="text-sm text-[#C4B5FD] leading-relaxed italic font-medium">
            &ldquo;Bhai, Event Loop ka ek hi kaam hai — gatekeeper banna. Call Stack khaali hai? Callback queue mein kuch hai? Toh andar aao. Nahi hai? Wait karo.&rdquo;
          </p>
        </div>

        {/* Visualizer link */}
        <Link
          href="/visualizations/event-loop"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'rgba(6,182,212,0.12)',
            border: '1px solid rgba(6,182,212,0.3)',
            color: '#06B6D4',
          }}
        >
          🎬 Live demo dekho → /visualizations/event-loop
        </Link>
      </div>

      {/* ── ConceptCard 1: Call Stack ───────────────────────────────────────── */}
      <div id="call-stack">
        <ConceptCard
          title="Call Stack"
          emoji="📚"
          difficulty="beginner"
          whatIsIt="Pehle ye samjho — JavaScript ka koi bhi code chalane ke liye ek 'dabba' chahiye. Woh dabba hai Call Stack. Jab function call hota hai, woh dabba Call Stack mein push hota hai. Jab return karta hai, pop hota hai. LIFO — Last In, First Out. Andar aakhri aaya, bahar pehle jaayega, jaise ek dabbon ki stack. Ye hi woh jagah hai jahan tumhara poora JS code actually 'jeeta hai'. Koi bhi function chalao — Call Stack mein. Error aata hai? Stack trace yahin se nikalta hai!"
          whenToUse={[
            "Jab tumhe samajhna ho ki 'Maximum call stack size exceeded' error kyun aaya",
            'Stack traces debug karte waqt — console.error mein jo lines dikhti hain woh call stack hai',
            'Recursive functions ka behavior samajhna ho — kitna deep jayega recursion?',
          ]}
          whyUseIt="Jab greet() function chalata hai, Call Stack mein push hota hai. Andar sayName() call hota hai — woh bhi push. sayName() return karta hai — pop. greet() return karta hai — pop. Stack empty. Ye poori story ek baar mein trace kar sakte ho! Step 1: greet() push hoti hai. Step 2: sayName() push hoti hai. Step 3: sayName() return karta hai, pop. Step 4: greet() return karta hai, pop. Stack saaf! Samjhe? Ab infinite recursion mein kya hoga — stack kabhi khaali nahi hogi, overflow ho jaayegi. 'Maximum call stack size exceeded' yahin se aata hai!"
          howToUse={{
            filename: 'call-stack.js',
            language: 'javascript',
            code: `function greet(name) {
  console.log('Hello,', sayName(name)); // sayName push hoga stack par
}

function sayName(name) {
  return name.toUpperCase(); // ye complete hoga, pop hoga
}

greet('Rahul');
// Stack order: [greet] → [greet, sayName] → [greet] → []

// Error case — stack overflow dekho:
function infiniteRecurse() {
  return infiniteRecurse(); // base case nahi! Stack full ho jaayega
}
// infiniteRecurse() // ← Uncomment karo toh dekho: RangeError!

// Correct recursive function:
function factorial(n) {
  if (n <= 1) return 1;           // ← base case! Stack rokta hai
  return n * factorial(n - 1);   // recursive call
}
console.log(factorial(5)); // 120`,
            explanation:
              "greet() call hone par stack mein push hota hai. Andar sayName() call hone par wo bhi stack par aata hai. sayName() return karta hai, pop hota hai. greet() return karta hai, pop hota hai. Stack empty. Aur agar base case na ho, stack overflow — 'Maximum call stack size exceeded' error!",
          }}
          realWorldScenario="Express route handler error aaya — stack trace dikhti hai console mein. Zyada tar developers sirf pehli line dekhte hain. GALAT! Stack trace bottom se upar padhte hain — sabse neeche wali line asli culprit hoti hai, wahan se error start hua. Upar waalay lines batate hain error kaun si functions ke through travel karke aaya. Ye ek professional debugging skill hai jo 99% developers nahi jaante!"
          commonMistakes={[
            {
              mistake: 'Infinite recursion — function khud ko call karta rehta hai bina base case ke',
              why: "Stack overflow hota hai — 'Maximum call stack size exceeded' error aata hai aur app crash ho jaata hai",
              fix: 'Base case define karo recursive functions mein — ek condition jo recursion rok de. if (n <= 0) return; jaisi cheez.',
            },
            {
              mistake: 'Stack trace ignore karna — console mein dikhti hai, padhte nahi',
              why: "Log mein error dikhti hai lekin developers often sirf pehli line dekhte hain",
              fix: 'Stack trace bottom se upar padhte hain — sabse lower line hi asli culprit hoti hai jahan se error start hua.',
            },
          ]}
          proTip="Node.js mein --stack-trace-limit=50 flag se zyada stack frames dekh sakte ho. Default 10 hai, complex bugs ke liye 50+ helpful hai. Try karo: node --stack-trace-limit=50 app.js"
        />
      </div>

      {/* ── ConceptCard 2: Node.js APIs ─────────────────────────────────────── */}
      <div id="node-apis">
        <ConceptCard
          title="Node.js APIs — Async Ka Secret"
          emoji="🔌"
          difficulty="beginner"
          whatIsIt="Ab asli magic samjhte hain! Jab tum setTimeout() likhte ho, woh Call Stack mein nahi chalti — woh Node.js API (libuv) ko jaati hai. Matlab: JS thread ne kaha 'ye kaam libuv ko de do, main aage badhta hoon'. Libuv background mein timer chalata hai, file padhta hai, network request karta hai. Jab kaam ho jaata hai, woh callback ko Callback Queue mein daalta hai. Event Loop tab callback ko Call Stack par lata hai. Ye saara flow bina main thread ruke hota hai — yahi 'non-blocking' ka matlab hai!"
          whenToUse={[
            'Koi bhi async operation — file reading, network call, timer, database query',
            "Wo sab jo 'wait' karta ho — time-consuming kaam jaise AI API calls",
            'Real-time events — WebSocket messages, file watchers, timers',
          ]}
          whyUseIt="Soch ke dekho — agar setTimeout synchronously run hota, toh 2 second ka timeout entire program ko 2 seconds freeze kar deta. Server completely unresponsive! Lekin Node.js mein aisa nahi hota. setTimeout libuv ko jaata hai, libuv OS ko deta hai, main thread FREE. Is code ka output yaad karo: 1, 2, 4, 3 — kyunki file read (~5ms) setTimeout (~2000ms) se pehle complete hoti hai. Ye Node.js APIs ka asar hai — har cheez Event Loop ke through jaati hai!"
          howToUse={{
            filename: 'node-apis-demo.js',
            language: 'javascript',
            code: `console.log('1: Start'); // Call Stack mein — immediately

// setTimeout Node.js API (libuv) ko deta hai — JS thread free!
setTimeout(() => {
  console.log('3: Timeout done!'); // 2000ms baad callback queue mein aayega
}, 2000);

// fs.readFile bhi libuv ke thread pool ko jata hai
const fs = require('fs');
fs.readFile('package.json', 'utf8', (err, data) => {
  console.log('4: File read:', data?.length, 'bytes'); // jab OS ready ho
});

console.log('2: End'); // Immediately — kisi ka wait nahi karta!

// Output order:
// 1: Start
// 2: End
// 4: File read: ... (usually ~5-10ms)
// 3: Timeout done! (~2000ms baad)`,
            explanation:
              'setTimeout aur fs.readFile dono Node.js APIs ko pass hote hain — libuv. JS continue karta hai bina ruke. 2 second baad setTimeout callback queue mein aata hai, file read hote hi file callback queue mein aata hai. Event loop inhe call stack mein dalta hai ek ek karke.',
          }}
          realWorldScenario="AI chatbot API sochte hain — ek request mein OpenAI call hoti hai jo 30 seconds le sakti hai. Agar synchronous hoti, 30 seconds mein server ek bhi doosri request handle nahi karta. Node.js APIs se ye call libuv ke paas jaati hai, main thread free rehta hai. 30 seconds mein 1000 aur requests handle ho sakti hain. Ye hi production-grade Node.js ki superpower hai!"
          commonMistakes={[
            {
              mistake: 'setTimeout(fn, 0) sochte hain immediate execute hoga — synchronous code se pehle',
              why: '0ms ka timeout bhi callback queue mein jaata hai — puri sync code aur microtasks ke baad',
              fix: 'process.nextTick() use karo agar truly next iteration chahiye — ye microtask queue se bhi pehle aata hai. Ya Promise.resolve().then() microtask queue ke liye.',
            },
          ]}
          proTip="libuv ka thread pool (default 4 threads) actual file I/O handle karta hai. Agar zyada concurrent file ops ho toh UV_THREADPOOL_SIZE=8 set karo environment variable ke through. Network I/O ke liye thread pool ki zaroorat nahi — OS async networking use hoti hai directly."
        />
      </div>

      {/* ── ConceptCard 3: Callback Queue ───────────────────────────────────── */}
      <div id="callback-queue">
        <ConceptCard
          title="Callback Queue"
          emoji="📋"
          difficulty="intermediate"
          whatIsIt="Callback Queue ek waiting lounge hai — jab async kaam complete ho jaata hai (timer expire hua, file read hui, network response aayi), unki callbacks yahan queue mein line lagate hain. Ab sawaal ye aata hai — Event Loop inhe kab Call Stack par laayega? Tab jab: (1) Call Stack bilkul khaali ho, aur (2) Microtask Queue bhi completely khaali ho. Tab ek macrotask uthega aur chalega. Ek ek karke, orderly, no chaos!"
          whenToUse={[
            'setTimeout / setInterval callbacks — timers expire hone ke baad',
            'I/O callbacks — fs.readFile, net module, http requests complete hone ke baad',
            'setImmediate() — I/O phase ke turant baad run karna ho',
          ]}
          whyUseIt="50 file reads ek saath chal rahi hain, sab different times par complete ho rahi hain. Callback Queue ek civil system hai — jaise hospital mein patients queue mein wait karte hain. Koi bhi callback seedha 'jump in' nahi kar sakti. Event Loop ek ek karke process karta hai. Isliye Node.js race conditions se free hai — ek waqt ek hi callback chalti hai. No mutex, no locks, no nightmare!"
          howToUse={{
            filename: 'callback-queue.js',
            language: 'javascript',
            code: `const fs = require('fs');

console.log('1: Sync start');

// setTimeout — macrotask queue mein jayega
setTimeout(() => {
  console.log('5: setTimeout (0ms)');
}, 0);

// fs.readFile — I/O callback, macrotask queue
fs.readFile('package.json', 'utf8', () => {
  console.log('4: fs.readFile done');

  // I/O ke andar setTimeout:
  setTimeout(() => console.log('7: setTimeout inside I/O'), 0);
  setImmediate(() => console.log('6: setImmediate inside I/O')); // pehle!
});

// setImmediate — check phase, usually I/O ke baad
setImmediate(() => {
  console.log('3: setImmediate');
});

// Promise — microtask queue (macrotasks se pehle!)
Promise.resolve().then(() => {
  console.log('2: Promise microtask');
});

console.log('1b: Sync end');

// Output (approximate):
// 1: Sync start
// 1b: Sync end
// 2: Promise microtask    ← microtask, macrotask se pehle
// 3: setImmediate         ← check phase (before timers sometimes)
// 4: fs.readFile done     ← I/O callback
// 6: setImmediate inside I/O ← I/O ke andar setImmediate, setTimeout se pehle
// 5: setTimeout (0ms)
// 7: setTimeout inside I/O`,
            explanation:
              'Sync code pehle. Phir microtask queue (Promise). Phir event loop phases: setImmediate check phase mein, I/O callbacks poll phase mein, setTimeout timers phase mein. I/O ke andar setImmediate setTimeout se pehle aata hai — ye guaranteed behaviour hai.',
          }}
          realWorldScenario="Express server 100 concurrent database queries chalata hai. Sab queries libuv thread pool mein jaati hain, alag alag time par complete hoti hain. Jaise jaise complete hoti hain, unki callbacks Callback Queue mein line lagate hain. Event Loop ek ek karke uthata hai aur execute karta hai. Koi collision nahi, koi data corruption nahi — single-threaded queue ki guarantee hai ye. Java developers ke liye ye revolutionary concept tha!"
          commonMistakes={[
            {
              mistake: 'Assume karna ki callback immediately execute hoga jab async operation done ho',
              why: 'Callback queue mein aane ke baad bhi wait karna padta hai — call stack empty hone ka, aur puri microtask queue clear hone ka',
              fix: 'Async operations ka result predictably milta hai, par "immediately" nahi. Hamesha callbacks/then() use karo result ke liye.',
            },
            {
              mistake: 'I/O ke bahar setImmediate vs setTimeout order assume karna',
              why: 'I/O ke bahar dono ka order non-deterministic hai — system load par depend karta hai',
              fix: 'I/O callbacks ke andar setImmediate hamesha setTimeout se pehle aata hai — guaranteed! Isliye I/O ke andar setImmediate use karo agar order important hai.',
            },
          ]}
          proTip="Bhai, ye golden rule tattoo karwa lo: Long-running synchronous code = Callback Queue frozen. Ek heavy JSON.parse(), ek tight loop, ek synchronous crypto operation — ye sab pending callbacks ko delay karte hain. 100 requests queue mein wait karengi jab tak tumhara heavy sync code complete na ho. Rule: Main thread pe sirf I/O coordination karo, CPU kaam Worker Threads mein daalo!"
        />
      </div>

      {/* ── ConceptCard 4: Microtask Queue ─────────────────────────────────── */}
      <div id="microtask-queue">
        <ConceptCard
          title="Microtask Queue — Promises Ki Priority Lane"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Ruko — abhi bada twist aata hai! Callback Queue ke baare mein sab samjhe, lekin ek aur queue hai jo usse hamesha peeche chhod deti hai — Microtask Queue! Ye special VIP lane hai sirf Promises (.then, .catch, .finally) aur queueMicrotask() ke liye. Rule simple hai: Ek macrotask complete hone ke baad, poori Microtask Queue clear hoti hai — tab agla macrotask chalega. Matlab har macrotask ke baad Promises priority pe hain. Yahi wajah hai Promise.then() hamesha setTimeout se pehle chalti hai — chahe setTimeout(fn, 0) hi kyun na ho!"
          whenToUse={[
            'Promise.then() / .catch() / .finally() callbacks',
            'async/await internally Promise use karta hai — ye bhi microtask queue mein',
            'queueMicrotask() — directly microtask queue mein kuch dalna ho',
            'MutationObserver callbacks (browser mein)',
          ]}
          whyUseIt="Ye output dekho — Sync start, Sync end, Promise.then, setTimeout. Promise hamesha pehle. Kyon? Kyunki Promise logic application ka core hai — data processing, state updates. setTimeout typically delay ya scheduling ke liye hai. Framework designers ne decide kiya: application logic (Promises) ko priority milni chahiye UI/timer logic (setTimeout) se. Ye ensure karta hai ki Promise chains ek baar start ho ke complete hon — koi timer beech mein interrupt na kare!"
          howToUse={{
            filename: 'microtask-queue.js',
            language: 'javascript',
            code: `console.log('1: Sync start');

setTimeout(() => console.log('4: setTimeout'), 0); // macrotask

Promise.resolve()
  .then(() => console.log('3: Promise.then')); // microtask

console.log('2: Sync end');

// Output ORDER — guarantee:
// 1: Sync start
// 2: Sync end
// 3: Promise.then  ← microtask — macrotask se PEHLE!
// 4: setTimeout    ← macrotask — microtask ke BAAD

// ── Microtask chaining ──
Promise.resolve()
  .then(() => {
    console.log('Microtask A');
    // Ye nayi microtask add karti hai — same batch mein!
    return Promise.resolve('chain');
  })
  .then((val) => console.log('Microtask B:', val));

setTimeout(() => console.log('Macrotask — baad mein'), 0);

// Output:
// Microtask A
// Microtask B: chain
// Macrotask — baad mein`,
            explanation:
              "Sync code pehle. Phir microtask queue clear (Promise.then). Phir macrotask queue (setTimeout). Ye order FIXED hai — always. Microtask chain bhi sari ek saath complete hogi macrotask se pehle. Ye hi 'micro' ka matlab hai — har macrotask ke 'micro' pause mein process hoti hai.",
          }}
          realWorldScenario="Tumhara Express middleware chain sochte hain — authentication Promise, validation Promise, database query Promise. Ye sab microtask queue ke through jaate hain ek ke baad ek — koi timeout ya I/O callback beech mein nahi aa sakti. Isliye async/await code itna linear aur predictable lagta hai — microtask queue guarantee karta hai ki Promise chain atomic-jaisi complete hogi!"
          commonMistakes={[
            {
              mistake: 'Endless microtask loop — microtask andar se microtask add karte rehna',
              why: 'Puri microtask queue clear hoti hai ek macrotask ke baad. Agar microtasks continuously nayi microtasks add karti rahen, macrotasks kabhi run nahi honge!',
              fix: 'Microtask chains carefully design karo. Agar recursion chahiye, setImmediate ya setTimeout use karo toh I/O aur timers bhi run ho sakein bich mein.',
            },
          ]}
          proTip="Ek aur twist — process.nextTick() microtask queue se BHI pehle aata hai! Ye apni alag 'nextTick queue' mein hai. Priority order tattoo karwa lo: nextTick queue > Microtask queue (Promises) > Macrotask queue (setTimeout/I/O). Ab ek aur warning: Microtask chaining mein ghum jaao — agar microtasks continuously nayi microtasks add karti rahen, macrotasks kabhi chalenge hi nahi. Infinite microtask loop = server freeze!"
        />
      </div>

      {/* ── ConceptCard 5: Event Loop Orchestrator ─────────────────────────── */}
      <div id="event-loop">
        <ConceptCard
          title="Event Loop — Sab Ka Conductor"
          emoji="🔄"
          difficulty="intermediate"
          whatIsIt="Ab sab pieces ek saath aate hain! Event Loop ek continuously running loop hai — literally ek infinite while loop jo check karta rehta hai: 'Call Stack khaali hai? nextTick queue mein kuch hai? Microtask Queue mein? Koi timer expire hua? Koi I/O callback?' Ye ek specific order mein — 6 phases mein — sab check karta hai. Dekho ye code: output A, D, C, B hoga — kyunki Sync pehle (A, D), phir Microtasks (C), phir Macrotasks (B). Event Loop is order ki guarantee deta hai. Ye guarantee nahi hoti toh Node.js kabhi production-ready nahi hoti!"
          whenToUse={[
            'Jab async code unexpected order mein execute ho — event loop phases samjho',
            'Performance bottleneck dhundhna ho — kaun sa code loop block kar raha hai?',
            "setTimeout vs setImmediate vs process.nextTick — 'kab chalega?' samajhna ho",
            'Production server ka CPU 100% ho — blocking operations identify karna ho',
          ]}
          whyUseIt="Ye complete code trace karo: Step 1 — Sync code chalti hai (1 aur 1b print). Step 2 — nextTick queue drain hoti hai (2 print). Step 3 — Microtask queue drain hoti hai (3 print). Step 4 — Event Loop phases shuru: setImmediate ya setTimeout (non-deterministic outside I/O). Step 5 — File read complete: I/O callback (6 print). Step 6 — I/O ke andar setImmediate (7) hamesha setTimeout (8) se pehle — guaranteed! Har step predictable hai. Ye hi Node.js ko reliable banata hai production mein."
          howToUse={{
            filename: 'event-loop-complete.js',
            language: 'javascript',
            code: `const fs = require('fs');

console.log('=== 1: Sync code start ===');

// nextTick — highest priority async
process.nextTick(() => console.log('2: process.nextTick'));

// Promise — microtask queue
Promise.resolve().then(() => console.log('3: Promise.then'));

// setTimeout — timers phase (macrotask)
setTimeout(() => {
  console.log('5: setTimeout 0ms');
}, 0);

// File I/O — poll phase callback
fs.readFile('package.json', () => {
  console.log('6: fs.readFile callback');

  // I/O ke andar — setImmediate GUARANTEE pehle aata hai setTimeout se
  setImmediate(() => console.log('7: setImmediate (inside I/O)'));
  setTimeout(() => console.log('8: setTimeout (inside I/O)'), 0);
});

// setImmediate — check phase (usually after I/O)
setImmediate(() => console.log('4 or 5: setImmediate'));

console.log('=== 1b: Sync code end ===');

// Guaranteed order:
// 1: Sync code start
// 1b: Sync code end
// 2: process.nextTick     (nextTick queue)
// 3: Promise.then         (microtask queue)
// 4 or 5: setImmediate    (order vs setTimeout non-deterministic OUTSIDE I/O)
// 5 or 4: setTimeout 0ms
// 6: fs.readFile callback (I/O complete)
// 7: setImmediate inside  (GUARANTEED before setTimeout inside I/O)
// 8: setTimeout inside`,
            explanation:
              'Ye complete example sab queues aur phases cover karta hai. Key points: 1) Sync pehle. 2) nextTick aur microtasks har phase ke baad (always). 3) setImmediate vs setTimeout order outside I/O non-deterministic hai. 4) Inside I/O callbacks, setImmediate ALWAYS setTimeout se pehle — ye guaranteed hai!',
          }}
          realWorldScenario="Ek real production incident: Express.js server slow ho gaya. CPU usage 100%. Koi I/O heavy nahi tha. Reason? Ek developer ne ek route handler mein 10MB JSON.parse() likha tha — sync operation jo poore Event Loop ko 2-3 seconds block karta tha. Baaki saari requests wait karti thi. Fix? Worker Thread mein move kiya, main thread free hua. Server response time 2000ms se 5ms ho gaya. Yahi Event Loop ki practical importance hai!"
          commonMistakes={[
            {
              mistake: 'Event loop ko block karna — heavy synchronous operations main thread par',
              why: 'JSON.parse() large data par, synchronous crypto operations (crypto.pbkdf2Sync), heavy regex — ye sab event loop ko block karte hain. Ek bhi request process nahi hogi jab tak ye complete na ho!',
              fix: 'Worker threads use karo CPU-intensive kaam ke liye. Main thread sirf I/O coordination aur request routing kare.',
            },
            {
              mistake: 'setImmediate vs setTimeout ka order assume karna outside I/O',
              why: 'I/O ke bahar dono ka order system load aur timer precision par depend karta hai — non-deterministic hai',
              fix: 'Agar guaranteed order chahiye I/O ke bahar, explicit chaining use karo. I/O ke andar setImmediate hamesha pehle — ye use karo.',
            },
          ]}
          proTip="Event Loop ko block mat karo — ye Node.js developers ka sab se bada mantra hai! Production monitoring ke liye: require('perf_hooks').monitorEventLoopDelay() se event loop lag measure karo. 10ms+ lag dikhta hai toh block ho raha hai. clinic.js tool se poori breakdown milti hai — kaunsa function loop block kar raha hai visually dikhaata hai. Ye tools production incidents mein lifesaver hain!"
          demo={
            <div className="space-y-4">
              <EventLoopPhaseDiagram />
              <ExecutionOrderVisual />
              <div
                className="rounded-xl p-4 text-center"
                style={{ background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.2)' }}
              >
                <p className="text-sm text-[#06B6D4] font-semibold mb-1">💡 Best way to learn?</p>
                <p className="text-xs text-[#71717A]">
                  Ye concept best way se samajhna hai live demo se.{' '}
                  <Link href="/visualizations/event-loop" className="text-[#06B6D4] underline underline-offset-2 hover:text-[#22D3EE] transition-colors">
                    /visualizations/event-loop
                  </Link>{' '}
                  par jao aur khud dekho har step animated!
                </p>
              </div>
            </div>
          }
        />
      </div>

      {/* ── ConceptCard 6: nextTick vs setImmediate ─────────────────────────── */}
      <div id="nexttick-vs-immediate">
        <ConceptCard
          title="process.nextTick vs setImmediate — Ye Dono Kab?"
          emoji="🤔"
          difficulty="advanced"
          whatIsIt="Ye dono ke naam bahut confusing hain — 'next' aur 'immediate' dono lagta hai 'abhi chahiye'. Lekin ye ek common trap hai! process.nextTick() — ye naam misleading hai, ye 'next tick of event loop' nahi hai. Ye CURRENT operation ke IMMEDIATELY baad, microtask queue se bhi pehle chalti hai apni special nextTick queue mein. setImmediate() — naam se 'immediate' lagta hai, lekin ye I/O phase ke baad check phase mein chalti hai. Ek real bug: developer ne nextTick mein recursive heavy processing ki, I/O starve ho gayi. setImmediate se replace kiya — fixed!"
          whenToUse={[
            'process.nextTick() — jab current operation ke turant baad kuch run karna ho, koi bhi I/O ya timer se pehle',
            'process.nextTick() — error-first callback pattern mein error emit karne ke liye (EventEmitter pattern)',
            'setImmediate() — jab I/O ke baad next iteration mein run karna ho',
            "setImmediate() — Node.js docs recommend karte hain 'use setImmediate() in most cases for clarity'",
          ]}
          whyUseIt="Output dekho: sync → nextTick → Promise → setImmediate. Priority clearly dikhti hai. Ab sawaal ye aata hai — kab kaunsa use karein? Rule: process.nextTick() sirf jab genuinely current operation ke baad, kisi bhi I/O se pehle kuch chahiye — jaise EventEmitter mein error emit karna. setImmediate() jab heavy processing ko chunks mein karna ho — har chunk ke baad I/O callbacks bhi run ho sakein. Recursion mein hamesha setImmediate, nextTick kabhi nahi — warna I/O starvation!"
          howToUse={{
            filename: 'nexttick-vs-immediate.js',
            language: 'javascript',
            code: `// Priority order demonstration:
setImmediate(() => console.log('4: setImmediate'));
process.nextTick(() => console.log('2: nextTick'));
Promise.resolve().then(() => console.log('3: Promise'));
console.log('1: sync');

// Output: sync → nextTick → Promise → setImmediate

// ── Real use case: nextTick for error handling ──
class MyEmitter {
  constructor() {
    // nextTick se pehle listener add hone ka time milta hai
    process.nextTick(() => {
      this.emit('event'); // Caller ko listener add karne ka time mila
    });
  }
}

// ── setImmediate for recursive heavy work ──
function processLargeArray(arr, callback) {
  let index = 0;

  function processChunk() {
    // 100 items at a time process karo
    const end = Math.min(index + 100, arr.length);
    while (index < end) {
      doWork(arr[index++]);
    }

    if (index < arr.length) {
      // setImmediate se I/O callbacks bhi run ho sakenge bich mein!
      setImmediate(processChunk); // nextTick use karte toh I/O starve hoti
    } else {
      callback();
    }
  }

  processChunk();
}

function doWork(item) { /* heavy processing */ }`,
            explanation:
              'setImmediate I/O ke baad check phase mein aata hai. process.nextTick nextTick queue mein — har kuch se pehle. Promise microtask queue mein — nextTick ke baad, macrotasks se pehle. Recursive work ke liye setImmediate use karo — I/O callbacks bich mein run ho sakenge. nextTick use kiya toh I/O starve ho jaayegi!',
          }}
          realWorldScenario="Ek production incident: bulk CSV processing ke liye developer ne process.nextTick() recursive loop banaya. 1 million rows process karne tha. Kya hua? Server ke saare HTTP requests freeze ho gaye — 30 minutes tak! nextTick queue kabhi khaali nahi hoti thi. Fix? setImmediate() use kiya — same kaam, lekin har chunk ke baad HTTP callbacks bhi run hote the. Server responsive raha throughout. Ek word ka change, production incident solved!"
          commonMistakes={[
            {
              mistake: 'process.nextTick() recursive use karna heavy processing mein',
              why: 'nextTick queue macrotasks se pehle clear hoti hai — agar continuously nayi nextTick callbacks add hoti rahen, I/O aur timers kabhi execute nahi honge. I/O starvation!',
              fix: 'Recursive async work ke liye setImmediate() use karo — ye I/O phase ke baad aata hai, bich mein I/O callbacks run ho sakti hain.',
            },
          ]}
          proTip="Node.js official docs literally kehti hain: 'Use setImmediate() in most cases for clarity and portability.' Ye Node.js team ki recommendation hai, mere opinion nahi! process.nextTick() sirf do specific cases ke liye — EventEmitter error emission, ya jahan genuinely 'kisi bhi I/O se pehle' guarantee chahiye. Doubt? setImmediate(). Recursion? setImmediate(). Heavy processing chunks? setImmediate(). process.nextTick pe trust mat karo jab tak zaroorat na ho!"
          demo={
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-3">
                process.nextTick vs setImmediate — Comparison
              </p>
              <DiffBlock
                title="Kab Use Karein?"
                language="javascript"
                bad={{
                  label: 'process.nextTick() — Risky',
                  code: `// ❌ Recursive heavy work mein nextTick — DANGER!
function processItems(items, i = 0) {
  if (i >= items.length) return;
  doHeavyWork(items[i]);
  // nextTick se I/O starve ho jaayegi!
  process.nextTick(() => processItems(items, i + 1));
}

// ❌ Isse baaki requests wait karengi
// HTTP, DB queries sab block!`,
                  explanation: 'I/O starvation — HTTP requests kabhi serve nahi honge jab tak processing done na ho',
                }}
                good={{
                  label: 'setImmediate() — Safe',
                  code: `// ✅ Recursive work mein setImmediate — SAFE
function processItems(items, i = 0) {
  if (i >= items.length) return;
  doHeavyWork(items[i]);
  // setImmediate se I/O bhi bich mein run hogi!
  setImmediate(() => processItems(items, i + 1));
}

// ✅ Ye sahi hai:
// process.nextTick() sirf immediate async emit ke liye
process.nextTick(() => emitter.emit('ready'));`,
                  explanation: 'I/O bhi serve hoti rehti hai — server responsive rehta hai processing ke dauran',
                }}
              />
            </div>
          }
        />
      </div>

      {/* ── Chapter Quiz ────────────────────────────────────────────────────── */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 2 Quiz — Event Loop Check
          </h3>
          <p className="text-sm text-[#71717A]">
            Dekho kitna samjha — 5 questions, 80%+ chahiye pass ke liye. Sab clear hai toh easy lagega!
          </p>
        </div>
        <QuizSection questions={eventLoopQuiz} chapterSlug="event-loop-deep-dive" />
      </div>

    </div>
  )
}
