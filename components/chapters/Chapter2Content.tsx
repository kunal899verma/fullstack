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
          Event Loop — Node ka Dil ❤️
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-4 text-base">
          Ye ek concept hai jo sab cheezein explain karta hai. Agar ye samajh aa gaya, tum kabhi frustrated nahi hoge.
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
            &ldquo;Single thread hai Node.js, phir bhi 10,000 concurrent requests handle karta hai. Kaise? Event loop. Bas.&rdquo;
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
          whatIsIt="Call stack ek data structure hai jahan JavaScript apne currently executing functions track karta hai. Jab function call hota hai, stack par push hota hai. Jab return karta hai, stack se pop hota hai. LIFO (Last In, First Out) order follow karta hai. Simple baat: ye hi wo jagah hai jahan tumhara JS code actually 'chalta' hai."
          whenToUse={[
            "Jab tumhe samajhna ho ki 'Maximum call stack size exceeded' error kyun aaya",
            'Stack traces debug karte waqt — console.error mein jo lines dikhti hain woh call stack hai',
            'Recursive functions ka behavior samajhna ho — kitna deep jayega recursion?',
          ]}
          whyUseIt="Call stack ke bina JavaScript ka execution track karna impossible hota. Har function apna context stack par rakhta hai — local variables, return address sab kuch. Ye hi enable karta hai ki ek function doosre ko call kar sake, aur doosra khatam ho toh pehla resume ho. Bhai, ye JavaScript ka backbone hai."
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
          realWorldScenario="Jab tum Express route handler mein ek function call karte ho jo doosra function call karta hai, sab call stack mein track hota hai. Isliye stack trace mein error kahan se start hua aur kahan tak gaya — sab dikh jaata hai. Bhai, agle time error aaye toh stack trace bottom se upar padho — sabse neeche wali line asli culprit hoti hai!"
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
          whatIsIt="Jab tum setTimeout(), fs.readFile(), fetch() etc. call karte ho, ye call stack mein execute nahi hota directly. Ye Node.js ki internal APIs ko pass ho jaata hai — libuv ya browser mein Web APIs. Ye APIs background mein kaam karti hain bina JS thread ko rokne ke. Tumhara JS code aage badhta rehta hai!"
          whenToUse={[
            'Koi bhi async operation — file reading, network call, timer, database query',
            "Wo sab jo 'wait' karta ho — time-consuming kaam jaise AI API calls",
            'Real-time events — WebSocket messages, file watchers, timers',
          ]}
          whyUseIt="Agar setTimeout synchronously run hota, toh 1000ms ka timeout tumhara poora program 1 second ke liye freeze kar deta. Ye APIs background mein chalti hain — Node.js free rehta hai doosra kaam karne ke liye. Isi wajah se ek Node.js server 10,000 concurrent requests handle kar sakta hai!"
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
          realWorldScenario="ResumeATS mein jab AI API call hoti hai (30 seconds tak lag sakti hai), ye bhi Node.js API ke through jaati hai. Request ek thread ko block nahi karti — tum 100 aur requests simultaneously handle kar sakte ho. Ye hi Node.js ki superpower hai I/O-heavy apps ke liye!"
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
          whatIsIt="Callback queue (ya macrotask queue) woh waiting area hai jahan completed async operations ke callbacks wait karte hain. setTimeout, setInterval, I/O operations (fs.readFile, network) ke callbacks yahan aate hain. Event loop inhe uthata hai aur call stack mein dalta hai — par tab jab stack bilkul empty ho aur microtask queue bhi clear ho jaaye."
          whenToUse={[
            'setTimeout / setInterval callbacks — timers expire hone ke baad',
            'I/O callbacks — fs.readFile, net module, http requests complete hone ke baad',
            'setImmediate() — I/O phase ke turant baad run karna ho',
          ]}
          whyUseIt="Ye queue ensure karti hai ki async operations ka result orderly process ho. Bhai, sochlo — 50 alag file reads chal rahe hain, sab ek saath ready ho gaye. Callback queue ensure karti hai ki ye ek ek karke, predictable order mein process ho. Chaos nahi, order!"
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
          realWorldScenario="Jab tumhara Express server 100 database queries parallel run karta hai — sab ke callbacks callback queue mein lined up hote hain. Event loop ek ek karke process karta hai. Isliye Node.js safe hai without mutex ya locks — single-threaded queue ensures no race conditions!"
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
          proTip="Bhai, ek important baat: jab bhi tum Node.js mein koi long-running sync operation karte ho (heavy for loop, JSON.parse on 50MB data), ye callback queue ke saare pending callbacks ko delay kar deta hai. Server ke baaki requests wait karengi! Isliye always: async raho ya Worker Threads use karo."
        />
      </div>

      {/* ── ConceptCard 4: Microtask Queue ─────────────────────────────────── */}
      <div id="microtask-queue">
        <ConceptCard
          title="Microtask Queue — Promises Ki Priority Lane"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Microtask queue ek SPECIAL high-priority queue hai specifically Promises (.then, .catch, .finally) aur queueMicrotask() ke liye. Ye callback queue se pehle execute hoti hai — HAMESHA. Ek bhi macrotask execute hone se pehle, puri microtask queue clear honi chahiye. Ye Promise-based code itna predictable feel karta hai iski wajah se!"
          whenToUse={[
            'Promise.then() / .catch() / .finally() callbacks',
            'async/await internally Promise use karta hai — ye bhi microtask queue mein',
            'queueMicrotask() — directly microtask queue mein kuch dalna ho',
            'MutationObserver callbacks (browser mein)',
          ]}
          whyUseIt="Promises ko high priority isliye milti hai kyunki ye generally application logic ke close hote hain. Agar setTimeout aur Promise ek saath resolve ho, Promise pehle handle hona chahiye — isiliye framework authors ne microtask queue banaya. Ye ensure karta hai ki async logic consistent aur predictable ho."
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
          realWorldScenario="Jab tum await API call karte ho, phir response process karte ho, ye sab microtask queue ke through hota hai. Isliye Promise-based code ka execution order itna predictable feel karta hai — microtask queue ensure karti hai ki async operations ka chain complete ho pehle, koi bhi timer ya I/O callback interfere na kare."
          commonMistakes={[
            {
              mistake: 'Endless microtask loop — microtask andar se microtask add karte rehna',
              why: 'Puri microtask queue clear hoti hai ek macrotask ke baad. Agar microtasks continuously nayi microtasks add karti rahen, macrotasks kabhi run nahi honge!',
              fix: 'Microtask chains carefully design karo. Agar recursion chahiye, setImmediate ya setTimeout use karo toh I/O aur timers bhi run ho sakein bich mein.',
            },
          ]}
          proTip="process.nextTick() microtask queue se bhi pehle aata hai — ye alag 'nextTick queue' mein jaata hai! Priority order: nextTick queue > Microtask queue (Promises) > Macrotask queue (setTimeout/I/O). Ye bahut confusing lag sakta hai pehle — but chart yaad kar lo aur life easy ho jaayegi!"
        />
      </div>

      {/* ── ConceptCard 5: Event Loop Orchestrator ─────────────────────────── */}
      <div id="event-loop">
        <ConceptCard
          title="Event Loop — Sab Ka Conductor"
          emoji="🔄"
          difficulty="intermediate"
          whatIsIt="Event loop ek continuously running loop hai jo check karta rehta hai: 'Call stack khaali hai? Agar haan, toh queues mein kuch hai kya?' Pehle nextTick queue check karta hai, phir microtask queue, phir 6 phases mein se guzarta hai. Ye hi Node.js ki concurrency ka magic hai — single thread, lekin har cheez orchestrated!"
          whenToUse={[
            'Jab async code unexpected order mein execute ho — event loop phases samjho',
            'Performance bottleneck dhundhna ho — kaun sa code loop block kar raha hai?',
            "setTimeout vs setImmediate vs process.nextTick — 'kab chalega?' samajhna ho",
            'Production server ka CPU 100% ho — blocking operations identify karna ho',
          ]}
          whyUseIt="Event loop ke bina Node.js sirf ek synchronous script runner hoti. Event loop hi usse production-grade async server banata hai. Ye ensure karta hai ki I/O, timers, aur application code sab milkar kaam karen bina ek doosre ko block kiye. Ye samajhna mandatory hai serious Node.js developer ke liye."
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
          realWorldScenario="Express.js server mein jab request aati hai, request handler execute hota hai (sync), phir middleware promises resolve hote hain (microtasks), phir database queries complete hoti hain (I/O callbacks), phir response send hoti hai. Ye poora flow event loop manage karta hai. Koi bhi step block ho toh poora server slow ho jaata hai!"
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
          proTip="Event loop ko block mat karo! JSON.parse() large data par, synchronous crypto operations, heavy regex, tight CPU loops — sab block karte hain. Worker threads use karo CPU-intensive kaam ke liye. Aur clinic.js ya 0x tool se event loop lag profile karo production mein — kya block kar raha hai easily dikhega!"
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
          whatIsIt="process.nextTick() current operation ke IMMEDIATELY baad run karta hai — microtask queue se bhi pehle, apni special 'nextTick queue' mein. setImmediate() I/O phase ke baad 'check' phase mein run karta hai. Dono 'immediate' lagte hain naam se, par difference critical hai aur real bugs produce karta hai jab galat use ho."
          whenToUse={[
            'process.nextTick() — jab current operation ke turant baad kuch run karna ho, koi bhi I/O ya timer se pehle',
            'process.nextTick() — error-first callback pattern mein error emit karne ke liye (EventEmitter pattern)',
            'setImmediate() — jab I/O ke baad next iteration mein run karna ho',
            "setImmediate() — Node.js docs recommend karte hain 'use setImmediate() in most cases for clarity'",
          ]}
          whyUseIt="Dono different use cases ke liye hain. process.nextTick() ensure karta hai ki kuch current synchronous block ke baad, par kisi bhi async operation se pehle, run ho. setImmediate() ensure karta hai ki event loop ka ek poora pass complete ho pehle. Galat choice se subtle bugs aate hain jo reproduce karna mushkil hota hai!"
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
          realWorldScenario="Bhai, real bug scenario: ek developer ne large CSV processing mein process.nextTick() recursive use ki. Server ke saare HTTP requests queue mein wait karne lage — I/O kabhi run hi nahi hoi! setImmediate se replace kiya toh server responsive ho gaya. Ye ek line ka difference tha, par production incident!"
          commonMistakes={[
            {
              mistake: 'process.nextTick() recursive use karna heavy processing mein',
              why: 'nextTick queue macrotasks se pehle clear hoti hai — agar continuously nayi nextTick callbacks add hoti rahen, I/O aur timers kabhi execute nahi honge. I/O starvation!',
              fix: 'Recursive async work ke liye setImmediate() use karo — ye I/O phase ke baad aata hai, bich mein I/O callbacks run ho sakti hain.',
            },
          ]}
          proTip="Node.js docs officially recommend: 'Use setImmediate() in most cases for clarity and portability.' process.nextTick() reserved karo specific use cases ke liye: error emission in EventEmitters, ya koi aise case jahan truly 'before any I/O' chahiye. Doubt mein? setImmediate()."
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
