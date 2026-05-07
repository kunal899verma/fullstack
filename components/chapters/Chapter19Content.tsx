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
          Performance — Fast App Kaise Banate Hain?
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Node.js fast hai, lekin galat code likho toh bottlenecks create ho jaate hain. <strong className="text-[#F5F5F7]">Measure first, optimize second</strong> — ye rule kabhi mat bhulo. Bina data ke optimization premature hai aur often wrong place mein hoti hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein profiling, memory leak detection, event loop optimization, database performance, aur caching strategies cover karenge — practical tools ke saath.
        </p>
      </div>

      {/* ConceptCard 1: Profiling */}
      <div id="profiling">
        <ConceptCard
          title="Node.js Profiling"
          emoji="🔍"
          difficulty="advanced"
          whatIsIt="Profiling matlab pata karna ki code kahan time spend kar raha hai. node --prof flag CPU profile generate karta hai. Clinic.js aur 0x flamegraph tools se visually samajh sakte ho ki kaunsa function bottleneck hai."
          whenToUse={[
            'App slow hai — kahan time ja raha hai pata nahi',
            'High CPU usage — kaunsa function responsible hai',
            'Response time slow — endpoint specific bottleneck',
            'Before optimization — baseline measure karo',
          ]}
          whyUseIt="Bina profiling ke optimize karna andhere mein teer chalana hai. Developers often wrong function optimize karte hain. Flamegraph se visually dikhai deta hai ki 80% time kahan ja raha hai — wahi fix karo, baaki chhod do."
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
            explanation: 'Clinic.js sabse beginner-friendly hai — automatically doctor, bubbleprof, flame choose karta hai. 0x best flamegraph deta hai. Flamegraph mein wide (horizontal) bars matlab wo function zyada time le raha hai — wahi target karo.',
          }}
          realWorldScenario="E-commerce site ka /products endpoint 2 seconds le raha tha. 0x flamegraph se pata chala ki JSON.stringify() ek nested 50KB object par 1.8 seconds le raha tha. Solution: pagination add ki aur fields filter kiye — response time 120ms aa gaya. Bina profiling ke kabhi nahi milta."
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
          proTip="async_hooks se custom tracing karo — kaunsi async operation kahan se start hui, kahan gayi. OpenTelemetry ke saath integrate karo distributed tracing ke liye — production mein visibility milti hai."
        />
      </div>

      {/* ConceptCard 2: Memory Leaks */}
      <div id="memory-leaks">
        <ConceptCard
          title="Memory Leak Detection"
          emoji="🧠"
          difficulty="advanced"
          whatIsIt="Memory leak matlab objects memory mein hain lekin use nahi ho rahe — garbage collector unhe collect nahi kar sakta kyunki koi reference hai. Node.js process time ke saath zyada memory use karta hai aur eventually crash kar deta hai."
          whenToUse={[
            'Process ki memory time ke saath badh rahi hai',
            'Restart ke baad thodi der mein phir slow ho jaata hai',
            'Heap used constantly increase ho raha hai — kabhi decrease nahi hota',
            'process.memoryUsage().heapUsed zyada hai',
          ]}
          whyUseIt="Memory leaks production mein bahut dangerous hain — server crash ho jaata hai jab memory exhaust ho jaati hai. Early detection se catastrophic failure bachti hai. Node.js built-in --inspect flag se Chrome DevTools se heap analyze kar sakte ho."
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
            explanation: 'Heap snapshot Chrome DevTools mein load karo: Memory tab → Load profile. Do snapshots lo — pehle aur kuch requests ke baad. "Objects allocated between snapshots" filter se exactly kya leak ho raha hai pata chalta hai.',
          }}
          realWorldScenario="Chat server mein memory 50MB se start hokar 24 ghante mein 2GB ho jaati thi — weekly restart karna padta tha. Heap snapshot analysis se pata chala ki event listeners accumulate ho rahe the — har WebSocket connection ke liye listeners add ho rahe the lekin remove nahi. Fix: connection close par cleanup. Memory stabilize ho gayi 80MB par."
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
          proTip="--max-old-space-size se memory limit set karo — process crash hoga instead of system hanging. Production mein PM2 ya Kubernetes readiness probes se unhealthy processes restart karo. Memory leak dhundne ka shortcut: clinic heapprofiler use karo."
        />
      </div>

      {/* ConceptCard 3: CPU Optimization */}
      <div id="cpu-optimization">
        <ConceptCard
          title="CPU Optimization — Event Loop Free Rakho"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="Node.js single-threaded hai — CPU-intensive task karo toh event loop block ho jaata hai aur koi bhi request serve nahi ho sakti. Solution: CPU work yield karo setImmediate se, ya Worker Threads mein offload karo."
          whenToUse={[
            'Large data transformation karna ho (10K+ items)',
            'Heavy JSON parsing ya serialization',
            'Image processing, PDF generation, encryption',
            'Complex calculations — ML inference, report generation',
          ]}
          whyUseIt="1 second CPU blocking = 1 second mein koi HTTP response nahi. 100 concurrent users hain toh sab 1 second wait karte hain. setImmediate se chunked processing karo — event loop ko breathe karne do. Worker threads se true parallelism milti hai CPU tasks ke liye."
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
            explanation: 'setImmediate approach simple hai lekin sab kuch main thread par hi hota hai — bus interleaved. Worker Threads true parallelism deta hai — alag OS thread mein run hota hai. Heavy CPU work ke liye always worker threads prefer karo.',
          }}
          realWorldScenario="Report generation service 10K orders ki Excel file banata tha — 8 seconds mein. Is time mein server completely unresponsive tha. Worker Thread mein offload kiya — Excel generation background mein, main thread free, users ko polling endpoint diya status check ke liye. UX drastically improved."
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
          proTip="clinic eventloop tool se event loop delay measure karo. 10ms se zyada consistently toh problem hai. setImmediate vs process.nextTick: nextTick current operation ke immediately baad, setImmediate next iteration mein — yielding ke liye setImmediate use karo."
        />
      </div>

      {/* ConceptCard 4: Database Performance */}
      <div id="database-performance">
        <ConceptCard
          title="Database Performance"
          emoji="🗄️"
          difficulty="advanced"
          whatIsIt="99% mein application bottleneck database hota hai — slow queries, missing indexes, N+1 queries, ya connection pool exhaustion. Database optimization Node.js optimization se zyada impact karta hai."
          whenToUse={[
            'API response slow hai — DB query time check karo',
            'N+1 query problem — loop mein DB calls mat karo',
            'Index missing — EXPLAIN ANALYZE se pata karo',
            'Connection pool exhausted — too many concurrent queries',
          ]}
          whyUseIt="Indexes se query time seconds se milliseconds aa jaata hai. N+1 fix karne se 100 queries ki jagah 1-2 queries hoti hain. Connection pooling se baar baar connection open/close ka overhead bachta hai. Ye basic optimizations 10x-100x improvement de sakti hain."
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
            explanation: 'Connection pool tuning zaroori hai — max connections DB ka limit consider karo. N+1 problem sab se common performance killer hai. EXPLAIN ANALYZE se query plan dekho — Seq Scan bad sign hai, Index Scan good sign hai.',
          }}
          realWorldScenario="Social media app mein feed endpoint 3 seconds le raha tha. EXPLAIN ANALYZE se pata chala: posts table par full sequential scan ho raha tha 500K rows mein. Index on (userId, createdAt) add kiya — query 3000ms se 8ms aa gayi. Zero code change, pure index optimization."
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
          proTip="pg-boss ya BullMQ se heavy DB operations async queue mein daalo. User ko immediately respond karo, background mein process karo. Database read replicas use karo read-heavy workloads ke liye — primary DB sirf writes ke liye."
        />
      </div>

      {/* ConceptCard 5: Caching */}
      <div id="caching">
        <ConceptCard
          title="Caching Strategies"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="Caching matlab frequently accessed data ko fast storage mein rakhna — taaki har request par expensive computation ya DB query na karni pade. In-memory, Redis, HTTP cache headers, aur CDN — sab alag layers hain."
          whenToUse={[
            'Frequently read, rarely changed data — user profiles, config',
            'Expensive computations — analytics aggregations, reports',
            'External API responses — rate limited APIs',
            'Static content — images, CSS, JS files',
          ]}
          whyUseIt="Sahi caching se application 10x-100x fast ho sakti hai. DB load drastically reduce hota hai. Redis se distributed cache milti hai — multiple Node instances ek cache share karte hain. HTTP cache headers se browser aur CDN caching milti hai — server tak request bhi nahi aati."
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
            explanation: 'Cache-aside pattern most flexible hai. TTL carefully choose karo — too short: cache useless, too long: stale data. Cache invalidation hardest part hai — jab bhi data update ho toh cache invalidate karo. Nahi toh stale data serve hoga.',
          }}
          realWorldScenario="Product catalog wali e-commerce site par 10K requests/second aate the. Products page har request par DB hit karta tha — DB overwhelmed. Redis cache add kiya 5 minute TTL ke saath — DB load 95% reduce hua, response time 800ms se 15ms aa gayi. Cache hit rate 99%+ tha."
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
          proTip="Cache key design carefully karo — user:profile:123 format use karo. Redis SCAN se patterns match kar ke bulk delete karo: SCAN 0 MATCH user:* COUNT 100. TTL-based expiry ke saath versioned keys bhi use kar sakte ho — v2:user:profile:123."
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
