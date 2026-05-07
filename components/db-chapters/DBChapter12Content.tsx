'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'Connection pool ka main purpose kya hai?',
    options: [
      { text: 'Database queries cache karna', correct: false, explanation: 'Query caching alag concept hai — Redis ya application-level cache.' },
      { text: 'Pre-established database connections reuse karna — new connection overhead avoid karna', correct: true, explanation: 'Sahi! Ek connection establish karne mein ~100ms lagta hai. Pool se existing connections reuse hote hain — latency dramatically kam.' },
      { text: 'Database ka backup lena', correct: false, explanation: 'Connection pool backup se related nahi hai.' },
      { text: 'Multiple databases connect karna', correct: false, explanation: 'Multiple databases ke liye multiple pools use karte hain — pool ka purpose connection reuse hai.' },
    ],
  },
  {
    question: 'Optimal connection pool size formula kya hai?',
    options: [
      { text: 'Database connections = RAM / 10MB', correct: false, explanation: 'Memory formula correct nahi hai — CPU cores based formula use karo.' },
      { text: '(Core count * 2) + effective_spindle_count — typical range: 10-20', correct: true, explanation: 'Sahi! Ye PostgreSQL wiki se formula hai. 8-core server pe ~17 connections optimal. 100 connections nahi — zyada connections context switching se slow karta hai.' },
      { text: 'Jitne users utne connections', correct: false, explanation: 'Ek user per connection catastrophic scaling issue — 10,000 users = 10,000 DB connections!' },
      { text: 'Default hamesha best hai', correct: false, explanation: 'Default pool size 10 hai most libraries mein — production mein tune karna padta hai.' },
    ],
  },
  {
    question: 'Read replicas kab useful hoti hain?',
    options: [
      { text: 'Jab writes zyada hon reads se', correct: false, explanation: 'Replicas reads scale karte hain — writes sirf primary pe hote hain.' },
      { text: 'Jab read-heavy workload ho — analytics queries primary ko slow karna nahi chahiye', correct: true, explanation: 'Sahi! Heavy analytics queries ko read replica pe route karo — primary transactions pe focused rehta hai. Typical web apps 80-95% reads hote hain.' },
      { text: 'Disaster recovery ke liye sirf', correct: false, explanation: 'DR ek benefit hai lekin main purpose read scaling hai.' },
      { text: 'Sirf MySQL mein kaam karta hai', correct: false, explanation: 'Read replicas PostgreSQL, MySQL, MongoDB — sab databases mein supported hain.' },
    ],
  },
  {
    question: 'CAP theorem mein kaunse do properties ek distributed system ek saath guarantee kar sakta hai?',
    options: [
      { text: 'Consistency aur Availability hamesha — Partition tolerance optional', correct: false, explanation: 'Network partitions real-world mein inevitable hain — P hamesha hota hai. C ya A choose karo.' },
      { text: 'P (Partition tolerance) hamesha hota hai — C aur A mein trade-off karo', correct: true, explanation: 'Sahi! Network partitions distributed systems mein inevitable hain. Partition hone pe ya consistent raho (some nodes unavailable) ya available raho (stale data risk).' },
      { text: 'Teeno simultaneously possible hain modern databases mein', correct: false, explanation: 'CAP theorem mathematical proof hai — teeno simultaneously impossible hai partition ke dauraan.' },
      { text: 'Sirf NoSQL databases CAP pe apply hota hai', correct: false, explanation: 'CAP theorem kisi bhi distributed system pe apply hota hai — SQL ya NoSQL.' },
    ],
  },
  {
    question: 'Cache-aside pattern mein kya hota hai cache miss pe?',
    options: [
      { text: 'Error return karo', correct: false, explanation: 'Cache miss error nahi hai — normal condition hai.' },
      { text: 'Database se data fetch karo, cache mein store karo, phir return karo', correct: true, explanation: 'Sahi! Cache miss → DB query → result cache mein set karo (with TTL) → return. Next request cache se milega. Lazy loading approach.' },
      { text: 'Automatically cache refresh hoti hai', correct: false, explanation: 'Cache-aside mein application manually cache manage karta hai — automatic refresh nahi.' },
      { text: 'Request fail ho jaata hai', correct: false, explanation: 'Cache miss pe graceful fallback hota hai — database se serve karo.' },
    ],
  },
]

function ConnectionPoolDiagram() {
  const steps = [
    { label: 'Client Request', color: '#FF6B35', bg: 'rgba(255,107,53,0.1)' },
    { label: 'Connection Pool', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
    { label: 'Available Connection?', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
    { label: 'Execute Query', color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
    { label: 'Return to Pool', color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
  ]
  return (
    <div className="my-5 flex flex-wrap gap-2 items-center justify-center">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className="rounded-xl px-4 py-3 text-center" style={{ background: s.bg, border: `1px solid ${s.color}40` }}>
            <p className="text-xs font-bold" style={{ color: s.color }}>{s.label}</p>
          </div>
          {i < steps.length - 1 && <span className="text-[#71717A] text-sm">→</span>}
        </React.Fragment>
      ))}
    </div>
  )
}

export default function DBChapter12Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Scaling Databases — Production Performance
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ek baar socho — aapka startup viral ho gaya. 10 users se 100,000 users ek raat mein. Database pehla bottleneck banega. Ek developer ne socha 'server upgrade kar denge' — $5000/month ki machine le li. Doosre developer ne connection pooling aur read replicas set kiye — $200/month mein same performance. Scaling engineering problem hai, paise ki nahi.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein production-grade scaling strategies seekhenge — connection pooling ka math, read replicas se 80% load shift, Redis caching se 100x speedup, aur CAP theorem se distributed systems ke trade-offs samjhenge. Ye knowledge aapko engineer se architect banata hai.
        </p>
      </div>

      <div id="connection-pooling">
        <ConnectionPoolDiagram />
        <ConceptCard
          title="Connection Pooling — Performance Ka Secret"
          emoji="🔗"
          difficulty="intermediate"
          whatIsIt="Database connection establish karna expensive operation hai — TCP handshake, authentication, session setup, ~100ms minimum. Agar har HTTP request mein naya connection banao toh 100ms sirf connection ke liye jaata hai, actual query ke liye time baad mein. Connection pool: app start pe N connections banao, pool mein rakho. Request aaye toh pool se lelo, kaam karo, wapas rakho. Under the hood: pool ek queue maintain karta hai — available connections aur waiting requests. max: 20 ka matlab 20 concurrent DB operations possible hain. 21st request wait karegi. idleTimeoutMillis: 30s ke baad idle connection close karo — resources free karo."
          whenToUse={[
            'Har production Node.js + PostgreSQL/MySQL app mein',
            'PgBouncer: extremely high connection counts ke liye (>100)',
          ]}
          whyUseIt="Sawaal: pool size 100 rakhna chahiye — zyada connections, zyada throughput? NAHI! PostgreSQL wiki ka formula hai: (cpu_cores * 2) + effective_spindle_count. 8-core server pe ~17 optimal connections. 100 connections matlab PostgreSQL ko 100 threads/processes manage karne padenge — context switching overhead, memory consumption, actually slower. Pool se 20 connections mein 1000 req/s handle karo — rotational use se. Pool monitor karo: waitingCount zyada hai toh pool size increase karo, nahi toh mat karo. Data-driven decisions."
          howToUse={{
            code: `// pg (node-postgres) connection pool
import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  // Pool configuration
  max: 20,              // max connections in pool
  idleTimeoutMillis: 30000,  // close idle connections after 30s
  connectionTimeoutMillis: 2000,  // fail if no connection available in 2s
  maxUses: 7500,        // recycle after N uses (prevents memory leaks)
})

// Health check
pool.on('error', (err) => {
  console.error('Unexpected pool error', err)
})

// Connection info logging
pool.on('connect', () => console.log('New client connected to pool'))

// Query — pool manages connection automatically
export async function query<T>(sql: string, params?: unknown[]): Promise<T[]> {
  const { rows } = await pool.query(sql, params)
  return rows
}

// Transaction — explicit client checkout
export async function withTransaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await fn(client)
    await client.query('COMMIT')
    return result
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()  // CRITICAL: always release!
  }
}

// Pool size formula (PostgreSQL wiki)
// optimal_pool = (cpu_cores * 2) + effective_spindle_count
// 8 core server: (8 * 2) + 1 = 17 connections

// Monitor pool
setInterval(() => {
  console.log('Pool stats:', {
    total: pool.totalCount,
    idle: pool.idleCount,
    waiting: pool.waitingCount,
  })
}, 60000)`,
            language: 'typescript',
            explanation: 'max: 20 connections — formula se calculate karo, guess nahi. idleTimeoutMillis: 30,000ms = 30 seconds idle ke baad connection close karo, DB pe unnecessary load nahi. connectionTimeoutMillis: 2000ms — agar 2 seconds mein pool se connection nahi mila (sab busy) toh fail fast, user ko error do rather than waiting 30+ seconds. maxUses: 7500 — connection recycle karo memory leaks prevent karne ke liye. Pool stats monitoring: waitingCount > 0 regularly matlab pool exhaust ho raha hai — either pool size badhao ya queries optimize karo.',
            filename: 'connection-pool.ts',
          }}
          realWorldScenario="Product launch day — 1000 req/sec achanak. Bina connection pool ke: har request naya connection, 1000 simultaneous connections, PostgreSQL max_connections hit, 'too many clients' error, app down. Pool ke saath: 20 connections rotate karte hain, 1000 req/s handle karta hai, PostgreSQL comfortable. Same code, same server — sirf pool configuration ne production incident prevent kiya. Connection pooling ek insurance policy hai — cheap, always on, saves you when it matters."
          commonMistakes={[
            { mistake: 'Pool mein too many connections (e.g., 100)', why: 'Zyada connections = more context switching + PostgreSQL overhead — actually slower', fix: 'Formula use karo: (cpu_cores * 2) + 1. PgBouncer se zyada app-level connections manage karo' },
          ]}
          proTip="Serverless (Vercel, AWS Lambda) mein connection pooling tricky hai — function instances short-lived hain, har instance apna pool banata hai, PostgreSQL overwhelmed. Solution: PgBouncer (external pooler) ya Supabase/Neon connection pooler use karo. Ye proxy layer application aur DB ke beech baith ke thousands of app connections ko manage karta hai, PostgreSQL ko sirf 20-50 real connections dikhata hai. Serverless mein direct DB connection = guaranteed issues at scale."
        />
      </div>

      <div id="read-replicas">
        <ConceptCard
          title="Read Replicas — Read Load Distribute Karo"
          emoji="📡"
          difficulty="advanced"
          whatIsIt="Read replica primary database ki synchronized copy hai — read-only. Under the hood: PostgreSQL streaming replication use karta hai — primary pe WAL (Write-Ahead Log) generate hota hai, replica continuously consume karta hai, almost real-time sync (milliseconds lag). Writes sirf primary pe possible hain — ACID guarantees maintain hoti hain. Reads replicas pe — primary free rehta hai write operations ke liye. Typical web app: 80-95% requests read hain — unhe replicas pe bhejdo, primary transactions mein focused rahe."
          whenToUse={[
            'Heavy read workload — dashboards, reports, search',
            'Analytics queries primary transactions slow na karen',
            'Geographic distribution (replica closer to users)',
          ]}
          whyUseIt="Replication lag ek real problem hai — primary pe write kiya, replica pe 50ms baad reflect hua. 'Read your own writes' problem: user ne profile update kiya, page refresh kiya, replica se read hua, purana data dikhta hai — user frustrated. Solution: write ke turant baad apna data primary se read karo kuch seconds ke liye. Ek pattern: user session mein 'wrote recently' flag set karo, next read pe primary use karo. Lag normally 10ms-1s — monitor karo, acceptable threshold define karo."
          howToUse={{
            code: `// Multiple database pools
import { Pool } from 'pg'

const primaryPool = new Pool({
  host: process.env.DB_PRIMARY_HOST,
  max: 20,
})

const replicaPool = new Pool({
  host: process.env.DB_REPLICA_HOST,  // read replica
  max: 40,  // more connections — reads zyada hoti hain
})

// Route reads to replica, writes to primary
class DatabaseRouter {
  async query(sql: string, params?: unknown[], write = false) {
    const pool = write ? primaryPool : replicaPool
    return pool.query(sql, params)
  }

  async read<T>(sql: string, params?: unknown[]): Promise<T[]> {
    const { rows } = await replicaPool.query(sql, params)
    return rows
  }

  async write<T>(sql: string, params?: unknown[]): Promise<T[]> {
    const { rows } = await primaryPool.query(sql, params)
    return rows
  }
}

// Usage
const db = new DatabaseRouter()

// Reads → replica
const users = await db.read('SELECT * FROM users WHERE status = $1', ['active'])

// Writes → primary
await db.write('UPDATE users SET last_login = NOW() WHERE id = $1', [userId])

// Replication lag handling
// After write, read your own writes from primary for a short window
async function updateAndRead(userId: number, data: object) {
  await db.write('UPDATE users SET ... WHERE id = $1', [userId])
  // Read from primary to avoid replica lag
  const user = await primaryPool.query('SELECT * FROM users WHERE id = $1', [userId])
  return user.rows[0]
}`,
            language: 'typescript',
            explanation: 'DatabaseRouter class reads/writes route karta hai. replicaPool max: 40 — reads primary se zyada hain isliye more connections. db.read() replica se, db.write() primary se — abstraction se caller ko pata nahi kaunsa pool use ho raha hai. updateAndRead pattern: write karo primary pe, read bhi primary se — replication lag completely avoid. Specific cases ke liye ye pattern use karo, default reads replica se karo.',
            filename: 'read-replicas.ts',
          }}
          realWorldScenario="E-commerce Black Friday: product catalog pages — 100,000 reads/min. Order processing — 5,000 writes/min. Bina replicas ke: primary overwhelmed with reads, checkout slow, orders fail. With replicas: product catalog reads replicas pe, primary sirf orders + inventory pe. Primary ke paas capacity hai transactions ke liye — checkout fast, orders process hote hain. Revenue protected. Ek read replica ne company ko Black Friday se bachaaya."
          commonMistakes={[
            { mistake: 'Replication lag ignore karna', why: 'Write ke turant baad replica se read karo — stale data mil sakta hai (lag: 10ms-1s)', fix: '"Read your own writes" pattern — apna data primary se read karo kuch seconds ke liye write ke baad' },
          ]}
          proTip="Managed databases (AWS RDS, Google Cloud SQL, Supabase, Neon) mein read replicas ek click mein create hoti hain — replication setup, monitoring, failover sab managed. Primary fail ho toh replica automatically promote hoti hai — manual intervention nahi chahiye. Production apps ke liye managed databases recommend karta hun — DevOps overhead eliminate karo, application logic pe focus karo."
        />
      </div>

      <div id="db-caching">
        <ConceptCard
          title="Database Caching — Redis ke Saath"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Cache-aside pattern ek three-step dance hai: (1) Cache check karo — hit? Return immediately. Miss? (2) Database se fetch karo. (3) Cache mein store karo with TTL, phir return karo. Next request cache se serve hogi. Under the hood: Redis in-memory store hai — RAM mein sab kuch, disk I/O zero. Database query: network roundtrip + disk I/O + query execution = 5-50ms. Redis: network roundtrip + memory lookup = 0.1-1ms. 50-500x faster. TTL (Time-To-Live) critical hai — stale data serve mat karo, lekin unnecessary DB hits bhi nahi."
          whenToUse={[
            'Frequently read, rarely changed data (product catalog, user profile)',
            'Expensive computation results (search results, aggregations)',
            'Session data, rate limiting counters',
          ]}
          whyUseIt="Cache invalidation computer science ki hardest problems mein se ek hai — phil Karlton ka famous quote. Kab invalidate karo? Update pe immediately del karo. Agar bhool gaye? Users stale data dekhte hain — trust issues. Agar too aggressive invalidate karo? Cache hit rate kam, DB load zyada. Cache stampede problem: 10,000 requests ek saath miss karte hain (cache expired), sab DB hit karte hain — thundering herd. Lock solution: ek request DB fetch kare, doosre wait karein. getWithLock pattern ye solve karta hai — NX flag se atomic lock set karo."
          howToUse={{
            code: `import { createClient } from 'redis'

const redis = createClient({ url: process.env.REDIS_URL })
await redis.connect()

// Cache-aside pattern
async function getUser(userId: number): Promise<User> {
  const cacheKey = \`user:\${userId}\`

  // 1. Check cache first
  const cached = await redis.get(cacheKey)
  if (cached) {
    return JSON.parse(cached)  // Cache hit!
  }

  // 2. Cache miss — fetch from DB
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId])

  // 3. Store in cache with TTL
  await redis.setEx(cacheKey, 3600, JSON.stringify(user))  // 1 hour TTL

  return user
}

// Cache invalidation — user update pe cache clear karo
async function updateUser(userId: number, data: Partial<User>): Promise<User> {
  const updated = await db.query('UPDATE users SET ... WHERE id = $1 RETURNING *', [userId])

  // Invalidate cache
  await redis.del(\`user:\${userId}\`)

  return updated
}

// Pattern-based invalidation
async function invalidateUserCache(userId: number) {
  const keys = await redis.keys(\`user:\${userId}:*\`)
  if (keys.length) await redis.del(keys)
}

// Cache stampede protection (only one fetches DB on miss)
async function getWithLock<T>(key: string, fetchFn: () => Promise<T>, ttl = 300): Promise<T> {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)

  const lockKey = \`lock:\${key}\`
  const locked = await redis.set(lockKey, '1', { NX: true, EX: 5 })

  if (!locked) {
    await new Promise(r => setTimeout(r, 100))
    return getWithLock(key, fetchFn, ttl)  // retry
  }

  const data = await fetchFn()
  await redis.setEx(key, ttl, JSON.stringify(data))
  await redis.del(lockKey)
  return data
}`,
            language: 'typescript',
            explanation: 'getUser: cache check → JSON.parse (cached data string format mein hoti hai) → miss → DB → JSON.stringify → redis.setEx (TTL ke saath) → return. updateUser: DB update → redis.del invalidate — simple. getWithLock: NX flag "set only if Not eXists" — atomic operation, sirf ek request lock pata hai. Doosre requests 100ms wait karke retry karte hain — by then first request cache populate kar chuka hoga. Cache hit rate monitor karo — 90%+ target karo. Niche gaya toh TTL increase karo ya caching strategy review karo.',
            filename: 'db-caching.ts',
          }}
          realWorldScenario="Viral product listing: influencer ne share kiya, 10,000 users ek product page hit kar rahe hain. Bina cache ke: 10,000 DB queries per minute, DB overwhelmed, page slow. Cache ke saath: pehli request DB hit, 1-hour TTL set, 9,999 requests Redis se — 0.1ms. DB breathing normally. Checkout ke liye capacity available. Ye caching ka real business impact hai — revenue directly protected hai."
          commonMistakes={[
            { mistake: 'Cache invalidation forget karna', why: 'Users stale data dekhte hain — trust issues, bugs', fix: 'Every write path pe cache invalidate karo. Event-driven cache invalidation: DB trigger → cache clear' },
          ]}
          proTip="Cache key naming convention important hai — user:123, user:123:posts, user:123:followers. Namespace-based invalidation easy ho jaati hai: redis.keys('user:123:*') se sab related cache clear karo. Lekin production mein keys() command slow hai large Redis instances mein — SCAN command use karo instead. Ya better: tags-based invalidation library use karo. Cache architecture planning pehle karo, adhoc keys baad mein mess create karte hain."
        />
      </div>

      <div id="cap-theorem">
        <ConceptCard
          title="CAP Theorem — Distributed Systems Ka Trade-off"
          emoji="🔺"
          difficulty="advanced"
          whatIsIt="CAP theorem Eric Brewer ne 2000 mein propose kiya — mathematical proof hai distributed systems ke liye. Consistency: har node same data dikhaye, Availability: har request response mile, Partition Tolerance: network failure hone pe bhi system kaam kare. Yahan trick hai: network partitions real-world mein inevitable hain — cables cut hote hain, routers fail hote hain, data centers disconnect hote hain. Isliye P hamesha zaroori hai. Partition ke waqt choice: ya consistent raho (kuch nodes unavailable ho jaenge) ya available raho (stale data serve karo). No free lunch — ye engineering trade-off hai, business requirements decide karte hain."
          whenToUse={[
            'Database selection ke waqt — requirements samjho',
            'Microservices architecture design mein',
          ]}
          whyUseIt="Interview mein ek common question: 'Cassandra aur PostgreSQL mein kya difference hai scaling ke context mein?' CAP theorem answer deta hai — Cassandra AP (available + partition tolerant, eventual consistency), PostgreSQL CP (consistent + partition tolerant, can be unavailable during partition). Ye knowledge database selection decisions ko guide karta hai — use case samjho, requirements analyze karo, phir database choose karo. Galat database choose karna bade systems mein redo karna bahut expensive hota hai."
          howToUse={{
            code: `/*
CAP Theorem:
- Consistency (C): Har read most recent write return kare — nodes sync mein
- Availability (A): Har request response milti hai — errors nahi
- Partition Tolerance (P): Network failure pe bhi system chal raha ho

Network partitions real world mein hote hain — P hamesha zaroori hai.
Partition ke waqt: C ya A choose karo.

CP Databases (Consistency + Partition Tolerance):
- PostgreSQL (with synchronous replication)
- MongoDB (with write concern majority)
- HBase, ZooKeeper
- Use case: Banking, inventory, anything where stale data = wrong

AP Databases (Availability + Partition Tolerance):
- Cassandra, CouchDB, DynamoDB (default)
- DNS, caching systems
- Use case: Social feeds, product views, analytics — eventual consistency ok

CA (Consistency + Availability) — only single node (no partition):
- Traditional single-node RDBMS
- Not realistic for distributed systems

PACELC Extension (more nuanced):
- If Partition: choose C or A
- Else (no partition): choose Latency or Consistency trade-off
*/

// Example: DynamoDB (AP) vs PostgreSQL (CP)

// DynamoDB — Eventual Consistency (faster, AP)
const params = {
  TableName: 'Users',
  Key: { userId: '123' },
  ConsistentRead: false  // eventual consistency — faster
}

// DynamoDB — Strong Consistency (CP for this read)
const strongParams = {
  TableName: 'Users',
  Key: { userId: '123' },
  ConsistentRead: true  // strongly consistent — slightly slower
}

// Choosing: Bank transfer requires CP
// User profile read can tolerate AP (eventual consistency)`,
            language: 'typescript',
            explanation: 'CP databases: network partition pe kuch nodes unavailable ho sakte hain, lekin jo available hai woh always consistent data dega. AP databases: partition pe sab available rehte hain, lekin kuch stale data serve kar sakte hain — eventual consistency. DynamoDB default AP hai, ConsistentRead: true se specific read ke liye CP behavior. PostgreSQL CP hai — synchronous replication ke saath. PACELC model zyada nuanced hai: Else (no partition) bhi Latency vs Consistency trade-off hota hai.',
            filename: 'cap-theorem.ts',
          }}
          realWorldScenario="WhatsApp message delivery: AP — message har haal mein deliver hona chahiye, global network failures mein bhi. Message ordering thoda off ho toh acceptable — availability > consistency. Bank balance transfer: CP — Rs. 10,000 transfer mein stale balance dikhana = actual money loss, legal liability. Consistency > availability. Ek hi company dono systems operate kar sakti hai — different services ke liye different databases, requirements ke hisaab se choose karo."
          commonMistakes={[
            { mistake: 'CAP theorem ko binary samajhna', why: 'Modern databases C aur A ke between tunable hain — write concern, read concern se', fix: 'PACELC model better hai — consistency vs latency trade-off pe think karo' },
          ]}
          proTip="Practical advice: 99% applications ke liye PostgreSQL + Redis + message queue (BullMQ/SQS) sufficient hai. Cassandra, DynamoDB, global distributed databases — inhe tab consider karo jab genuinely global scale aur high write throughput hai jo PostgreSQL handle nahi kar sakta. Premature complexity se bachna zaroorat se zyada important hai. Seed se Series A tak PostgreSQL chalega — tab optimize karo jab data prove kare ki zaroorat hai."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="db-scaling" />
    </div>
  )
}
