'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const performanceQuiz = [
  {
    question: 'Node.js profiling ke liye sabse pehla step kya hai?',
    options: [
      { text: 'Seedha code optimize karo bina data ke', correct: false, explanation: 'Premature optimization root of all evil hai — pehle measure karo.' },
      { text: 'node --prof flag se CPU profile generate karo, phir analyze karo', correct: true, explanation: 'Sahi! Measure first, optimize second. --prof se flamegraph banta hai jo batata hai kahan time ja raha hai.' },
      { text: 'Zyada RAM add karo server par', correct: false, explanation: 'Hardware add karna code optimization ka substitute nahi hai.' },
      { text: 'Production se code hata do', correct: false, explanation: 'Ye performance issue solve nahi karta!' },
    ],
  },
  {
    question: 'Memory leak dhundne ka sabse reliable tarika kya hai?',
    options: [
      { text: 'Server restart karo jab bhi slow ho jaaye', correct: false, explanation: 'Restart band-aid solution hai — root cause dhundo.' },
      { text: 'Chrome DevTools mein heap snapshots lete raho aur compare karo', correct: true, explanation: 'Correct! Multiple snapshots leke compare karo — growing objects memory leak indicate karte hain.' },
      { text: 'console.log se memory usage print karo', correct: false, explanation: 'process.memoryUsage() helpful hai, lekin heap snapshots zyada detailed hain.' },
      { text: 'Code delete karo jab tak leak band na ho jaaye', correct: false, explanation: 'Trial and error approach time waste hai — proper tools use karo.' },
    ],
  },
  {
    question: 'Event loop blocking kyun problem hai?',
    options: [
      { text: 'Sirf ek hi request handle ho sakti hai puri application lifecycle mein', correct: false, explanation: 'Node.js multiple requests handle karta hai, lekin blocking ke dauran nayi requests wait karti hain.' },
      { text: 'Jab main thread busy hoti hai, koi bhi request respond nahi kar sakti jab tak blocking complete na ho', correct: true, explanation: 'Bilkul sahi! 1 second ki blocking se sabhi concurrent users ke liye 1 second delay aata hai.' },
      { text: 'Database connections drop ho jaate hain', correct: false, explanation: 'Event loop blocking directly DB connections affect nahi karta.' },
      { text: 'Memory leak aata hai automatically', correct: false, explanation: 'Blocking aur memory leaks alag issues hain.' },
    ],
  },
  {
    question: 'Redis cache kab use karna chahiye?',
    options: [
      { text: 'Har cheez cache karo — speed ke liye', correct: false, explanation: 'Cache invalidation hard hai — sirf frequently accessed aur rarely changing data cache karo.' },
      { text: 'Frequently read, rarely changed data ke liye — user profiles, config, aggregated stats', correct: true, explanation: 'Sahi! Cache hit rate high rakhna zaroori hai. Stale data ka risk bhi consider karo.' },
      { text: 'Sirf images cache karo', correct: false, explanation: 'Redis primarily key-value store hai, CDN images cache karta hai.' },
      { text: 'Sirf authentication tokens ke liye', correct: false, explanation: 'Tokens session store mein rakh sakte ho, lekin Redis ka scope broader hai.' },
    ],
  },
]

// ── Chapter Diagram ───────────────────────────────────────────────────────────

function PerfWorkflowDiagram() {
  const steps = [
    { label: 'Measure', sublabel: 'Baseline latency, RPS, memory — autocannon / k6', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: '📏' },
    { label: 'Profile', sublabel: 'Flame graph via 0x or Clinic.js — find hot paths', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', icon: '🔥' },
    { label: 'Identify', sublabel: 'Bottleneck pinpointed — wide bar = culprit', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '🎯' },
    { label: 'Fix', sublabel: 'Optimize the one thing that matters most', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: '🔧' },
    { label: 'Measure Again', sublabel: 'Confirm improvement — loop back if needed', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: '✅' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Performance Workflow — Measure First, Always</p>
      <div className="max-w-lg mx-auto space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: step.bg, border: `1px solid ${step.border}` }}>
              <span className="text-xl">{step.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: step.color }}>{step.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{step.sublabel}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1">
                <span className="text-[#71717A] text-xs">{i === steps.length - 2 ? '↺ loop' : '↓'}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Chapter19Content() {
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
          Performance — Measure Pehle, Optimize Baad Mein!
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Production mein app slow hai. Kya karo? <strong className="text-[#F5F5F7]">95% developers guess karte hain — "shayad database slow hai", "shayad RAM kam hai"</strong>. Aur phir ghante optimize karte hain wrong jagah. Akshay Saini style — measure first, optimize second! Bina data ke optimization andhere mein teer chalana hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Socho ek baar — tumhara Node.js process ek box hai. Us box ke andar kya ho raha hai? Kaunsa function zyada time kha raha hai? Kahan memory leak ho rahi hai? Is chapter mein hum profiling ka X-ray machine use karenge, memory leaks ke ghost pakdenge, event loop ko breathe karne dengey, aur caching se app ko rocket banana seekhenge.
        </p>
      </div>

      <PerfWorkflowDiagram />

      {/* ConceptCard 1: Profiling */}
      <div id="profiling">
        <ConceptCard
          title="Node.js Profiling"
          emoji="🔍"
          difficulty="advanced"
          whatIsIt="Profiling matlab Node.js ke CPU ka CCTV footage lena — exactly pata karna ki code ka kaunsa hissa kitna time kha raha hai. node --prof flag ek isolate file banata hai, Clinic.js doctor ki tarah diagnose karta hai, aur 0x ek flamegraph banata hai — jisme wide (horizontal) bars wale functions wo darogas hain jo sab time waste kar rahe hain."
          whenToUse={[
            'App slow hai aur kahan time ja raha hai bilkul pata nahi — profile karo',
            'CPU 100% hai lekin samajh nahi aa raha kyun — flamegraph dekho',
            'Response time 2 second + hai — endpoint specific X-ray lo',
            'Optimize karne se pehle — baseline measure karo, warna kaise pata chalega ki improvement hua?',
          ]}
          whyUseIt="Suno — developers ka sabse bada crime hai premature optimization. Koi sochta hai 'JSON.parse slow hoga' aur usse optimize karte hain, jabki asli bottleneck database query thi. Flamegraph ek sachai dikhata hai — wide bar matlab wo function 80% time le raha hai. Wahi target karo, baaki sab chhod do. Energy invest karo wahan jahan actual pain hai."
          howToUse={{
            filename: 'profiling-workflow.sh',
            language: 'bash',
            code: `# Method 1: Built-in Node.js profiler
node --prof app.js

# Load generate karo (ab, hey, wrk use karo)
npx autocannon -c 100 -d 30 http://localhost:3000/api/heavy

# Profile process karo
node --prof-process isolate-0x*.log > profile.txt

# Method 2: Clinic.js (recommended — visual!)
npm install -g clinic
clinic doctor -- node app.js
# Browser mein automatically open hota hai — recommendations deta hai

# Method 3: 0x (best flamegraph!)
npm install -g 0x
0x -- node app.js
# Load generate karo phir Ctrl+C
# SVG flamegraph open hoga — wide bars = slow functions

# Method 4: Chrome DevTools (interactive)
node --inspect app.js
# Chrome mein: chrome://inspect → Open dedicated DevTools for Node
# CPU tab mein record karo, phir analyze karo`,
            explanation: 'Ab sawaal ye aata hai — kaunsa tool use karein? Clinic.js sabse beginner-friendly hai — woh khud doctor, bubbleprof, ya flame choose karta hai. 0x best flamegraph deta hai production-level analysis ke liye. Flamegraph mein horizontally wide bars dhundo — unhe pakdo, wahi tumhara dushman hai.',
          }}
          realWorldScenario="Ek e-commerce site ka /products endpoint 2 second le raha tha. Team ko laga DB slow hai, toh unhone DB optimize kiya — koi fark nahi. Phir 0x flamegraph chalaya. Surprise! JSON.stringify() ek nested 50KB object pe 1.8 second kha raha tha. Solution: pagination add ki, sirf zaruri fields bheje — response time 120ms aa gaya. Bina profiling ke yaar, ye kabhi nahi milta. Andhere mein haath maarte rehte."
          commonMistakes={[
            {
              mistake: 'Development mein profile karna instead of production-like load ke saath',
              why: 'Low load par bottlenecks visible nahi hote. Real bottlenecks high concurrency par dikhai dete hain.',
              fix: 'Realistic load generate karo — autocannon ya k6 se. 100 concurrent users simulate karo minimum.',
            },
            {
              mistake: 'Sirf response time dekhna, CPU profile nahi',
              why: 'Response time slow ho sakta hai bina high CPU ke — DB wait, external API wait. Root cause alag hoga.',
              fix: 'clinic doctor se shuru karo — ye automatically identify karta hai ki issue CPU hai, I/O hai, ya event loop delay.',
            },
          ]}
          proTip="Ek aur baat — async_hooks se custom tracing karo aur OpenTelemetry ke saath wire karo. Distributed system mein ek request 5 services se guzarti hai — bina tracing ke 3 AM incident mein tum andhere mein ho. Har async operation ka trail rakho, production mein visibility priceless hai."
        />
      </div>

      {/* ConceptCard 2: Memory Leaks */}
      <div id="memory-leaks">
        <ConceptCard
          title="Memory Leak Detection"
          emoji="🧠"
          difficulty="advanced"
          whatIsIt="Memory leak — naam sunke daro mat, lekin production mein ye ek silent killer hai. Objects memory mein hain lekin use nahi ho rahe — garbage collector unhe collect nahi kar sakta kyunki koi chhupa reference hai. Socho ek bucket mein paani daal rahe ho aur pata nahi hai ki neeche se leak ho raha hai. Node.js process slowly 50MB se 500MB se 2GB ho jaata hai aur ek din KABOOM — crash."
          whenToUse={[
            'Process ki memory time ke saath ek hi direction mein badh rahi hai — kabhi neeche nahi aati',
            'Server restart ke baad thodi der mein phir slow ho jaata hai — ye band-aid solution hai',
            'Heap used metric monitoring mein hamesha upar hi upar jaata dikhe',
            'process.memoryUsage().heapUsed check karo — suspiciously high hai?',
          ]}
          whyUseIt="Yaar, memory leak wala server ek baar crash hota hai 3 AM ko. Restart karo, 2 din baad phir crash. Weekly restart schedule bana dete hain log — ye jugaad solution hai, engineering nahi! Sahi tarika: heap snapshot lo, compare karo, exactly dekho kaun se objects grow ho rahe hain. Chrome DevTools ka Memory tab tumhara detective partner hai."
          howToUse={{
            filename: 'memory-debug.ts',
            language: 'typescript',
            code: `// Step 1: Memory monitor karo
import v8 from 'v8'

function logMemory(label: string) {
  const heap = process.memoryUsage()
  console.log(\`[\${label}]\`, {
    heapUsed: \`\${Math.round(heap.heapUsed / 1024 / 1024)} MB\`,
    heapTotal: \`\${Math.round(heap.heapTotal / 1024 / 1024)} MB\`,
    external: \`\${Math.round(heap.external / 1024 / 1024)} MB\`,
  })
}

// Step 2: Heap snapshot lena (Node.js 14+)
import { writeHeapSnapshot } from 'v8'

// Routes mein ya cron job se trigger karo
app.get('/debug/heap', (req, res) => {
  const filename = writeHeapSnapshot()
  res.json({ snapshot: filename })
})

// Step 3: Common leak patterns fix karo:

// ❌ LEAK: Event listener kabhi remove nahi hota
class DataProcessor {
  start() {
    process.on('data', this.handleData) // Memory leak!
  }
  // Destructor nahi hai!
}

// ✅ FIX: Cleanup karo
class DataProcessor {
  private handleData = (data: Buffer) => { /* ... */ }

  start() {
    process.on('data', this.handleData)
  }

  stop() {
    process.off('data', this.handleData) // Cleanup!
  }
}

// ❌ LEAK: Global cache unbounded
const cache: Map<string, any> = new Map()
// Items kabhi remove nahi hote!

// ✅ FIX: LRU cache ya TTL se
import LRU from 'lru-cache'
const cache = new LRU({ max: 1000, ttl: 1000 * 60 * 5 }) // 5 min TTL`,
            explanation: 'Step-by-step trace karo aise: pehle app fresh start karo, heap snapshot lo. Kuch requests karo. Doosra snapshot lo. Chrome DevTools Memory tab mein "Objects allocated between snapshots" filter karo — jo objects dono snapshots mein hain aur grow ho rahe hain, wahi leak hain. Unka constructor name dekho — EventEmitter? Map? Closure? Wahan jaake fix karo.',
          }}
          realWorldScenario="Ek chat server mein memory 50MB se start hokar 24 ghante mein 2GB ho jaati thi — weekly restart schedule tha. Heap snapshot analysis se pata chala — har WebSocket connection ke liye process.on('data', handler) add ho raha tha lekin connection close hone par remove nahi ho raha. Thousands of listeners accumulate ho gaye the. Fix: connection.on('close') mein cleanup. Memory 80MB par stabilize ho gayi, weekly restarts band. Tab samjhe ki event listeners bhi ek resource hain!"
          commonMistakes={[
            {
              mistake: 'WeakMap ki jagah Map use karna caches ke liye',
              why: 'Map strong references rakhta hai — objects GC nahi ho paate. Memory indefinitely grow karti hai.',
              fix: 'Object references cache karne ke liye WeakMap use karo — jab object ka koi aur reference na rahe, GC automatically collect karta hai.',
            },
            {
              mistake: 'setInterval clear nahi karna',
              why: 'setInterval callback har X milliseconds run hota rehta hai forever — interval variable loose hone par bhi. Memory + CPU waste.',
              fix: 'const interval = setInterval(...) aur clearInterval(interval) jab kaam ho jaaye. Class mein cleanup method banao.',
            },
          ]}
          proTip="--max-old-space-size=512 flag laga do production mein — process 512MB pe crash karega instead of poora server hang karna. Crash is better than hang. PM2 ya Kubernetes readiness probes se auto-restart configure karo. Aur ek shortcut: clinic heapprofiler — ek command mein sab analysis kar deta hai."
        />
      </div>

      {/* Akshay-style Q&A interlude */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <p className="text-[#F5F5F7] font-semibold mb-2">Ab sawaal ye aata hai...</p>
        <p className="text-[#A1A1AA] leading-relaxed">
          "Memory leak fix kiya, profiling bhi kar li — toh ab app fast hai na?" Nahi yaar! Memory aur CPU — ye do alag problems hain. Memory leak matlab objects accumulate ho rahe hain. CPU block matlab event loop ruka hua hai. Ek hi second ki CPU blocking mein 100 users ka request queue mein pada hai — koi response nahi. Is dono ko alag alag solve karna padta hai. Chalo next problem dekho.
        </p>
      </div>

      {/* ConceptCard 3: CPU Optimization */}
      <div id="cpu-optimization">
        <ConceptCard
          title="CPU Optimization — Event Loop Free Rakho"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="Node.js ek single lane highway hai. Ek truck (CPU-intensive task) lane block kar le toh peeche saari gadiyan (HTTP requests) ruk jaati hain. Node.js single-threaded hai — 1 second ka heavy calculation event loop ko completely freeze kar deta hai. 100 users connected hain? Sab 1 second wait karenge. Solution: ya toh kaam ko chunked karo setImmediate se — truck ko thoda aage chalo phir dusron ko jaane do — ya ek alag lane bana do Worker Threads se."
          whenToUse={[
            'Large array 10K+ items transform karna ho — loop mein heavy computation',
            'Heavy JSON parsing ya serialization — nested 100KB object',
            'Image processing, PDF generation, video conversion — bilkul main thread par mat karo',
            'ML inference, complex report generation, encryption — sab Worker Thread ke kaam hain',
          ]}
          whyUseIt="Ek thought experiment karo: tumhara server ek single chef hai. Chef report banana shuru karta hai (8 second ka kaam). Iss beech 50 customers aa gaye — koi khaana nahi milega 8 second tak. Agar woh kaam ek alag kitchen mein bhej de (Worker Thread), toh main kitchen free rehta hai. Node.js mein ye exactly setImmediate aur Worker Threads karte hain — main thread ko breathe karne do."
          howToUse={{
            filename: 'cpu-optimization.ts',
            language: 'typescript',
            code: `// ❌ BAD: Blocking — event loop freeze ho jaata hai
function processLargeArray(items: number[]): number[] {
  return items.map(n => heavyComputation(n)) // 100K items = blocked!
}

// ✅ GOOD: Chunked processing with setImmediate
async function processLargeArrayAsync(
  items: number[],
  chunkSize = 1000,
): Promise<number[]> {
  const results: number[] = []

  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize)
    const chunkResult = chunk.map(n => heavyComputation(n))
    results.push(...chunkResult)

    // Event loop ko breathe karne do har chunk ke baad
    await new Promise<void>(resolve => setImmediate(resolve))
  }

  return results
}

// ✅ BEST for CPU-intensive: Worker Threads
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads'

// worker.ts
if (!isMainThread) {
  const result = heavyComputation(workerData.input)
  parentPort!.postMessage(result)
}

// main.ts
function runInWorker(input: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, { workerData: { input } })
    worker.on('message', resolve)
    worker.on('error', reject)
  })
}

// Usage:
const result = await runInWorker(largeInput)
// Main thread free rehta hai dusre requests ke liye!`,
            explanation: 'Step by step trace karo: setImmediate approach chunked processing karta hai — 1000 items process karo, phir event loop ko ek turn do, phir agli 1000. Main thread pe hi rehta hai lekin kaam share karta hai. Worker Threads alag OS thread mein run hote hain — true parallelism. Heavy lifting ke liye Worker Threads, light chunking ke liye setImmediate.',
          }}
          realWorldScenario="Report generation service 10K orders ki Excel file banata tha — 8 second ka kaam. Is poore time mein server completely freeze tha, koi request nahi jaati thi. Worker Thread mein offload kiya — Excel wala kaam alag thread mein, main thread free, users ko ek polling endpoint diya '/report/status/:id' check karne ke liye. UX drastically improved. Users ko lag raha tha app chal raha hai — background mein kaam hota raha."
          commonMistakes={[
            {
              mistake: 'Synchronous crypto operations use karna (crypto.pbkdf2Sync)',
              why: 'pbkdf2Sync deliberately slow hai (security ke liye) — main thread seconds tak block hota hai.',
              fix: 'crypto.pbkdf2 (async version) ya bcrypt.hash() use karo — ye automatically thread pool use karte hain.',
            },
            {
              mistake: 'Regular expressions mein catastrophic backtracking',
              why: 'Certain regex patterns exponential time le sakte hain — ReDoS (Regular Expression Denial of Service).',
              fix: 'Regex validator tools use karo. Simple, linear patterns prefer karo. validator.js library use karo complex validation ke liye.',
            },
          ]}
          proTip="clinic eventloop chalao aur event loop delay measure karo. 10ms consistently cross ho raha hai? Red flag hai. Aur ek confusion clear karte hain — setImmediate vs process.nextTick: nextTick current operation khatam hote hi fire hota hai (blocking hone ka khatra), setImmediate next event loop iteration mein — yielding ke liye hamesha setImmediate use karo."
        />
      </div>

      {/* Akshay-style Q&A interlude */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <p className="text-[#F5F5F7] font-semibold mb-2">Ab sawaal ye aata hai...</p>
        <p className="text-[#A1A1AA] leading-relaxed">
          "CPU optimize ho gayi, memory bhi theek hai — toh response time kyun slow hai?" Bhai, 99% cases mein asli villain database hota hai. Node.js ki code fast hai lekin database query 3 second le rahi hai — kya fayda? Profiling karo toh dekhoge — 80% time DB wait mein jaata hai. Chalo database ki duniya mein ghuste hain.
        </p>
      </div>

      {/* ConceptCard 4: Database Performance */}
      <div id="database-performance">
        <ConceptCard
          title="Database Performance"
          emoji="🗄️"
          difficulty="advanced"
          whatIsIt="Database ek library hai jisme laakhon kitaabein hain. Index nahi hai toh library attendant har shelf check karega — poori library scan. Index hai toh seedha shelf 42, row 7 — milliseconds mein. N+1 problem matlab 100 users ke liye 100 alag queries — ek hi JOIN se ho sakta tha. Connection pool: baar baar naye connections banana — waiter hire karo, kaam karo, fire karo — ek pagalpan hai. Ek pool banao jisme waiters hamesha ready rehte hain."
          whenToUse={[
            'API response 500ms+ le raha hai — Prisma logging on karo, slow queries dekho',
            'Loop mein DB calls ho rahe hain — N+1 problem, include/JOIN use karo',
            'EXPLAIN ANALYZE likho query ke aage — Seq Scan dekhe toh index missing',
            'Connection pool exhaustion errors aa rahe hain — pool size badhao ya queries optimize karo',
          ]}
          whyUseIt="Ek true story: ek social media feed query 3 second le rahi thi. Developer ne Node.js optimize kiya — kuch fark nahi. Team ne Redis cache add kiya — thoda better. Phir database index add kiya — 8ms. Socho! Index ek hi cheez thi jo matter karti thi. Node.js ki code theek thi, caching unnecessary thi — bas ek index nahi tha. Database optimization is the highest ROI optimization you will ever do."
          howToUse={{
            filename: 'db-optimization.ts',
            language: 'typescript',
            code: `import { Pool } from 'pg'
import { PrismaClient } from '@prisma/client'

// ── Connection Pooling ──────────────────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// ── N+1 Problem Fix ─────────────────────────────────────────────────────────
const prisma = new PrismaClient()

// ❌ N+1: Har user ke liye alag query
async function getUserOrdersBad() {
  const users = await prisma.user.findMany() // 1 query
  for (const user of users) {
    user.orders = await prisma.order.findMany({ // N queries!
      where: { userId: user.id },
    })
  }
}

// ✅ FIX: Include se single query
async function getUserOrdersGood() {
  return prisma.user.findMany({
    include: { orders: true }, // JOIN — single query!
  })
}

// ── Query Optimization ──────────────────────────────────────────────────────
// ❌ BAD: Full table scan
const orders = await prisma.order.findMany({
  where: { status: 'pending' }, // Index nahi hai status par?
})

// ✅ Add index in Prisma schema:
// model Order {
//   status String
//   @@index([status])        // Single index
//   @@index([userId, status]) // Composite index
// }

// ── Slow Query Logging ──────────────────────────────────────────────────────
const prismaWithLogging = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
  ],
})

prismaWithLogging.$on('query', (e) => {
  if (e.duration > 100) { // 100ms se slow queries log karo
    console.warn(\`Slow query (\${e.duration}ms): \${e.query}\`)
  }
})`,
            explanation: 'Step-by-step trace karo: Prisma mein log: [query] on karo, slow queries dekho. Koi query 100ms+ le rahi hai? Us query ke aage EXPLAIN ANALYZE lagao PostgreSQL mein. Output mein "Seq Scan on posts (cost=0.00..50000)" dikhe toh — ek index chahiye! Add karo @@index([userId, createdAt]). Run again — "Index Scan using posts_userId_createdAt_idx" aana chahiye. 3000ms se 8ms. Magic nahi, engineering hai.',
          }}
          realWorldScenario="Social media app mein feed endpoint 3 second le raha tha. EXPLAIN ANALYZE chalaya — posts table par 500K rows ka full sequential scan. Har baar! Index on (userId, createdAt) add kiya — query 3000ms se 8ms. Zero code change, zero Node.js optimization, zero extra RAM. Pure database engineering se 375x improvement. Ye story sunao apne interviewer ko!"
          commonMistakes={[
            {
              mistake: 'SELECT * karna instead of specific columns',
              why: 'Unnecessary data transfer hota hai — network + parsing overhead. Large text/JSON columns especially expensive hain.',
              fix: 'Sirf wahi columns select karo jo chahiye: SELECT id, name, email FROM users. Prisma mein select: { id: true, name: true }.',
            },
            {
              mistake: 'Connection pool size default chhod dena',
              why: 'Default pool size often too small — connections exhaust ho jaate hain high traffic mein.',
              fix: 'Pool size = (core count * 2) + effective spindle count — ya load test se tune karo.',
            },
          ]}
          proTip="Heavy DB operations ke liye BullMQ queue use karo — user ko immediately 202 Accepted do, background mein process karo. Aur ek senior-level tip: read replicas set karo. Primary DB sirf writes handle kare, read replicas sab read traffic absorb karein. Ek read-heavy app mein ye single change 10x scale de sakta hai."
        />
      </div>

      {/* ConceptCard 5: Caching */}
      <div id="caching">
        <ConceptCard
          title="Caching Strategies"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="Caching ek photocopy machine hai. Pehli baar DB se original document lo, photocopy rakh lo shelf par. Agli baar shelf se do — DB tak jaane ki zaroorat hi nahi. In-memory (LRU cache), Redis (distributed shelf), HTTP headers (browser ki shelf), CDN (duniya bhar mein distributed shelf) — sab alag caching layers hain, sab ek hi concept ke forms hain."
          whenToUse={[
            'Frequently read, rarely changed data — user profiles, product catalog, config settings',
            'Expensive computations — analytics report jo 2 second leti hai aur 1000 users ek saath maangein',
            'External rate-limited APIs — OpenAI, weather API — baar baar mat maango',
            'Static content — images, CSS, JS — CDN pe rakh do, server tak aaane hi mat do',
          ]}
          whyUseIt="Ek zaruri distinction — cache fast hota hai kyunki RAM memory hai, DB disk ya network call hai. RAM access nanoseconds mein, disk milliseconds mein, network request 50-200ms mein. 10K requests per second wali e-commerce site par agar har request DB hit kare — DB ghutan mein mar jaayega. Redis cache se 99% cache hit rate matlab 99% requests DB tak gaye hi nahi. Ye scalability ka raaz hai."
          howToUse={{
            filename: 'caching-strategies.ts',
            language: 'typescript',
            code: `import { createClient } from 'redis'

const redis = createClient({ url: process.env.REDIS_URL })
await redis.connect()

// ── Pattern 1: Cache-Aside (most common) ───────────────────────────────────
async function getUserProfile(userId: string) {
  const cacheKey = \`user:profile:\${userId}\`

  // 1. Cache check karo
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  // 2. DB se fetch karo (cache miss)
  const user = await db.users.findById(userId)

  // 3. Cache mein store karo (5 minute TTL)
  await redis.setEx(cacheKey, 300, JSON.stringify(user))

  return user
}

// Cache invalidation
async function updateUserProfile(userId: string, data: Partial<User>) {
  await db.users.update(userId, data)
  await redis.del(\`user:profile:\${userId}\`) // Stale cache hatao
}

// ── Pattern 2: HTTP Cache Headers ──────────────────────────────────────────
app.get('/api/products', async (req, res) => {
  const products = await getProducts()

  // Browser aur CDN 1 minute cache karenge
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=30')
  res.set('ETag', generateETag(products))
  res.json(products)
})

// ── Pattern 3: In-Memory Cache (single instance) ───────────────────────────
import LRU from 'lru-cache'

const memCache = new LRU<string, unknown>({
  max: 500, // Max 500 items
  ttl: 1000 * 60 * 5, // 5 minute TTL
})

// Simple in-memory — no Redis needed for small scale
function getFromMemCache<T>(key: string): T | undefined {
  return memCache.get(key) as T | undefined
}`,
            explanation: 'Cache-aside pattern ka flow trace karo: request aaya → cache check karo → miss? DB se lo → cache mein daalo → return karo. Next request → cache check karo → HIT! DB bypass. TTL set karo — too short matlab cache useless, too long matlab stale data serve hoga. Cache invalidation, Phil Karlton ka famous quote hai: "There are only two hard things in Computer Science: cache invalidation and naming things."',
          }}
          realWorldScenario="Product catalog wali e-commerce site par 10K requests/second. Products page har request DB hit karta tha — DB overwhelmed, 800ms response time. Redis cache 5 minute TTL ke saath add kiya — DB load 95% reduce, response time 800ms se 15ms. Cache hit rate 99%+. Aur sab se mast cheez — DB ki cost bhi 60% kam ho gayi kyunki queries kam ho gayi. Caching = speed + savings."
          commonMistakes={[
            {
              mistake: 'Cache invalidation ignore karna',
              why: 'Data update karo lekin cache invalidate na karo — users purana data dekhte rehte hain. Silent bug.',
              fix: 'Hamesha update ke saath cache delete karo. Cache-aside pattern properly implement karo — write-through ya invalidation on update.',
            },
            {
              mistake: 'Cache stampede — sab ek saath cache miss karte hain',
              why: 'Cache expire hone par sabhi requests ek saath DB hit karte hain — thundering herd problem.',
              fix: 'Cache lock ya probabilistic early expiration use karo. Redis SETNX se distributed lock implement karo.',
            },
          ]}
          proTip="Cache key naming convention adopt karo — user:profile:123 jaisi namespace:entity:id format. Redis SCAN se bulk invalidation karo: SCAN 0 MATCH user:* COUNT 100 — sab user cache ek saath delete. Ek advanced trick: versioned keys — v2:user:profile:123. Cache invalidate karne ki jagah version number badhao — instant stale cache bypass."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 19 Quiz — Performance Mastery
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — profiling, memory, caching concepts check karo!
          </p>
        </div>
        <QuizSection questions={performanceQuiz} chapterSlug="performance-profiling" />
      </div>
    </div>
  )
}
