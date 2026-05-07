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
          Jab application grow karta hai toh database bottleneck ban jaata hai. Connection pooling, read replicas, caching, sharding — ye strategies database ko scale karne ke liye hain. CAP theorem se trade-offs samjho.
        </p>
      </div>

      <div id="connection-pooling">
        <ConnectionPoolDiagram />
        <ConceptCard
          title="Connection Pooling — Performance Ka Secret"
          emoji="🔗"
          difficulty="intermediate"
          whatIsIt="Connection pool pre-established database connections maintain karta hai. New connection banane ki bajaye pool se existing connection lote hain — ~100ms overhead save hoti hai per request."
          whenToUse={[
            'Har production Node.js + PostgreSQL/MySQL app mein',
            'PgBouncer: extremely high connection counts ke liye (>100)',
          ]}
          whyUseIt="Every HTTP request mein new DB connection = 100ms overhead minimum. High traffic pe thousands of connections = DB overloaded. Pool se connections reuse."
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
            explanation: 'Pool max: 20 connections. idleTimeoutMillis: 30s ke baad idle connections close. connectionTimeoutMillis: 2s mein connection nahi mila toh fail. withTransaction: always release in finally.',
            filename: 'connection-pool.ts',
          }}
          realWorldScenario="High-traffic API mein bina pool ke: 1000 req/s = 1000 DB connections = PostgreSQL crash. Pool ke saath: 20 connections rotate karte hain — 1000 req/s efficiently handle karta hai."
          commonMistakes={[
            { mistake: 'Pool mein too many connections (e.g., 100)', why: 'Zyada connections = more context switching + PostgreSQL overhead — actually slower', fix: 'Formula use karo: (cpu_cores * 2) + 1. PgBouncer se zyada app-level connections manage karo' },
          ]}
          proTip="PgBouncer connection pooler add karo application aur PostgreSQL ke beech — external pooler application restart pe connections maintain karta hai. Serverless environments ke liye essential."
        />
      </div>

      <div id="read-replicas">
        <ConceptCard
          title="Read Replicas — Read Load Distribute Karo"
          emoji="📡"
          difficulty="advanced"
          whatIsIt="Read replicas primary database ki copies hain (read-only). Writes primary pe, reads replicas pe route karo — primary pe load kam hota hai."
          whenToUse={[
            'Heavy read workload — dashboards, reports, search',
            'Analytics queries primary transactions slow na karen',
            'Geographic distribution (replica closer to users)',
          ]}
          whyUseIt="90% web traffic reads hoti hain. Replicas se primary transactions ke liye dedicated capacity milti hai."
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
            explanation: 'Primary pool writes ke liye. Replica pool reads ke liye (more connections — reads zyada hoti hain). Write ke baad apna read primary se karo — replica lag avoid.',
            filename: 'read-replicas.ts',
          }}
          realWorldScenario="E-commerce: order writes primary pe, product catalog reads (zyada traffic) replica pe. Reports aur analytics heavy queries replica pe — primary checkout aur inventory pe focused."
          commonMistakes={[
            { mistake: 'Replication lag ignore karna', why: 'Write ke turant baad replica se read karo — stale data mil sakta hai (lag: 10ms-1s)', fix: '"Read your own writes" pattern — apna data primary se read karo kuch seconds ke liye write ke baad' },
          ]}
          proTip="AWS RDS, Google Cloud SQL, Supabase — sab managed read replicas provide karte hain. Automatic failover bhi milta hai — primary down ho toh replica automatically promote hoti hai."
        />
      </div>

      <div id="db-caching">
        <ConceptCard
          title="Database Caching — Redis ke Saath"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Cache-aside pattern: pehle cache check karo, miss pe database se fetch karo aur cache mein store karo. Redis in-memory store — 100x faster than DB queries."
          whenToUse={[
            'Frequently read, rarely changed data (product catalog, user profile)',
            'Expensive computation results (search results, aggregations)',
            'Session data, rate limiting counters',
          ]}
          whyUseIt="Database query: 5-50ms. Redis: 0.1ms. 100x speedup. Database load drastically reduce hota hai — same server 10x zyada traffic handle kar sakta hai."
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
            explanation: 'Cache-aside: cache check → miss → DB fetch → cache set. Cache invalidation: update pe cache delete. Lock: cache stampede prevent karo jab many requests same key miss karte hain.',
            filename: 'db-caching.ts',
          }}
          realWorldScenario="Product detail page: 10,000 requests/min same product — bina cache ke 10,000 DB queries. Cache ke saath 1 DB query + 9,999 Redis hits. Database free raha transactions ke liye."
          commonMistakes={[
            { mistake: 'Cache invalidation forget karna', why: 'Users stale data dekhte hain — trust issues, bugs', fix: 'Every write path pe cache invalidate karo. Event-driven cache invalidation: DB trigger → cache clear' },
          ]}
          proTip="Cache stampede/thundering herd problem: bahut saare requests ek saath miss karte hain aur sab DB hit karte hain. Mutex lock ya probabilistic early expiration se prevent karo."
        />
      </div>

      <div id="cap-theorem">
        <ConceptCard
          title="CAP Theorem — Distributed Systems Ka Trade-off"
          emoji="🔺"
          difficulty="advanced"
          whatIsIt="CAP theorem: distributed system Consistency, Availability, aur Partition tolerance teeno simultaneously guarantee nahi kar sakta. Network partition hone pe ya C ya A choose karna padta hai."
          whenToUse={[
            'Database selection ke waqt — requirements samjho',
            'Microservices architecture design mein',
          ]}
          whyUseIt="CAP samjhne se sahi database choose karo — banking needs CP (consistent), social feed needs AP (always available)."
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
            explanation: 'Network partition inevitable hai distributed systems mein. CP: consistency prefer karo — kuch nodes unavailable ho sakte hain. AP: availability prefer karo — stale data possible. No free lunch!',
            filename: 'cap-theorem.ts',
          }}
          realWorldScenario="WhatsApp message delivery: AP system — message deliver hona chahiye (availability), thoda stale order ok. Bank balance: CP system — stale balance = real money loss. Different requirements, different databases."
          commonMistakes={[
            { mistake: 'CAP theorem ko binary samajhna', why: 'Modern databases C aur A ke between tunable hain — write concern, read concern se', fix: 'PACELC model better hai — consistency vs latency trade-off pe think karo' },
          ]}
          proTip="Most applications mein: RDBMS (PostgreSQL) + Redis cache + message queue = 99% use cases cover. Cassandra/DynamoDB sirf genuinely global scale, high write throughput scenarios ke liye."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="db-scaling" />
    </div>
  )
}
