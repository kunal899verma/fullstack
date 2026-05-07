'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function CachePatternDiagram() {
  const hitPath = [
    { label: 'Request', icon: '→', color: '#06B6D4' },
    { label: 'Redis Cache', icon: '⚡', color: '#10B981', sublabel: '~0.1ms HIT', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
    { label: 'Response', icon: '✅', color: '#10B981', sublabel: 'Served instantly' },
  ]
  const missPath = [
    { label: 'Request', icon: '→', color: '#06B6D4' },
    { label: 'Redis Cache', icon: '❌', color: '#EF4444', sublabel: '~0.1ms MISS', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)' },
    { label: 'Database', icon: '🗄️', color: '#F59E0B', sublabel: '~50ms query', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
    { label: 'Store in Redis', icon: '💾', color: '#7C3AED', sublabel: 'SET key value EX 300', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)' },
    { label: 'Response', icon: '✅', color: '#06B6D4', sublabel: '~50ms total' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Caching with Redis — Visual Overview</p>
      <div className="max-w-xl mx-auto space-y-4">
        <div className="rounded-xl p-4" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#10B981] mb-3">Cache HIT — fast path</p>
          <div className="flex items-center gap-2 flex-wrap">
            {hitPath.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                {step.bg ? (
                  <div className="rounded-lg px-3 py-1.5 text-center" style={{ background: step.bg, border: `1px solid ${step.border}` }}>
                    <p className="text-sm">{step.icon}</p>
                    <p className="text-[10px] font-bold" style={{ color: step.color }}>{step.label}</p>
                    {step.sublabel && <p className="text-[9px] text-[#71717A]">{step.sublabel}</p>}
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-[10px]" style={{ color: step.color }}>{step.label}</p>
                    {step.sublabel && <p className="text-[9px] text-[#71717A]">{step.sublabel}</p>}
                  </div>
                )}
                {i < hitPath.length - 1 && <span className="text-[#10B981] text-sm">→</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl p-4" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#F59E0B] mb-3">Cache MISS — full path</p>
          <div className="flex items-center gap-2 flex-wrap">
            {missPath.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                {step.bg ? (
                  <div className="rounded-lg px-3 py-1.5 text-center" style={{ background: step.bg, border: `1px solid ${step.border}` }}>
                    <p className="text-sm">{step.icon}</p>
                    <p className="text-[10px] font-bold" style={{ color: step.color }}>{step.label}</p>
                    {step.sublabel && <p className="text-[9px] text-[#71717A]">{step.sublabel}</p>}
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-[10px]" style={{ color: step.color }}>{step.label}</p>
                    {step.sublabel && <p className="text-[9px] text-[#71717A]">{step.sublabel}</p>}
                  </div>
                )}
                {i < missPath.length - 1 && <span className="text-[#F59E0B] text-sm">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-[10px] text-[#52525B] text-center mt-3">Cache-aside pattern: app manages cache manually — check → miss → DB → store → respond</p>
    </div>
  )
}

export default function Chapter15Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Caching with Redis — App Ko 10x Fast Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Kya aap jaante ho ki ek well-cached app same hardware par 10x zyada users serve kar sakti hai? Database query: 50ms. Redis read: 0.1ms. 500x faster. Ye sirf numbers nahi — ye user experience ka fark hai 50ms response vs 500ms response ke beech. Right caching strategy se database load 90% tak kam ho sakta hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Redis sirf cache nahi hai — ye Swiss army knife of modern backends hai. Queues, pub/sub messaging, leaderboards, session storage, distributed locks, rate limiting — ye sab Redis se implement hote hain. Ek tool jo 10 problems solve karta hai.
        </p>
      </div>

      <CachePatternDiagram />

      <div id="why-cache">
        <ConceptCard
          title="Why Cache? — DB Load & Latency"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="Caching socho ek shortcut ki tarah — kisi cheez ko baar baar calculate karne ki bajaye, pehli baar calculate karo aur paas mein rakh lo. User profile jo har request mein chahiye — DB se har baar nahi, Redis se lo. Cache hit: Redis se 0.1ms. Cache miss: DB se 50ms, phir Redis mein store karo. Hit rate 80% — effectively 80% requests 500x faster. DB pe load dramatically kam, server costs down."
          whenToUse={[
            'Frequently read, rarely changed data — product catalog, user profiles',
            'Expensive computations — analytics reports, recommendation scores',
            'Session storage — stateless auth ke saath sessions',
            'Rate limiting counters — distributed rate limits across servers',
          ]}
          whyUseIt="Ab sawaal ye aata hai — agar data change ho jaaye aur cache purana data serve kare? Ye cache invalidation problem hai — caching ka hard part. Solution: TTL (Time-To-Live) — cache automatically expire hota hai. Ya data change hone par manually cache delete karo. Ye tension hamesha rahegi — consistency vs speed. Business logic decide karta hai kitna stale data acceptable hai: product price har 30 sec fresh chahiye, static config har 1 ghanta."
          howToUse={{
            filename: 'redis-setup.ts',
            language: 'typescript',
            code: `import { createClient, RedisClientType } from 'redis'

let client: RedisClientType

async function getRedisClient() {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL ?? 'redis://localhost:6379',
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) return new Error('Redis connection failed')
          return Math.min(retries * 100, 3000)  // Exponential backoff
        },
      },
    })

    client.on('error', (err) => console.error('Redis error:', err))
    client.on('connect', () => console.log('Redis connected'))
    client.on('reconnecting', () => console.log('Redis reconnecting...'))

    await client.connect()
  }
  return client
}

// Cache helper — generic type-safe cache
async function getOrSet<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds: number
): Promise<T> {
  const redis = await getRedisClient()

  // Cache check karo
  const cached = await redis.get(key)
  if (cached) {
    return JSON.parse(cached) as T  // Cache hit
  }

  // Cache miss — fresh data lo
  const data = await fetchFn()

  // Cache mein store karo with TTL
  await redis.setEx(key, ttlSeconds, JSON.stringify(data))

  return data
}

// Usage
const user = await getOrSet(
  \`user:\${userId}\`,
  () => prisma.user.findUnique({ where: { id: userId } }),
  300  // 5 minutes
)`,
            explanation: "Under the hood: Reconnect strategy exponential backoff implement karta hai — 100ms, 200ms, 400ms, 800ms... Redis temporarily down ho toh app crash nahi karo, retry karo. getOrSet pattern cache-aside standard pattern hai. JSON.parse/stringify overhead hai — large objects ke liye msgpack ya cbor faster binary serialization dete hain. Graceful degradation: Redis fail hone par fetchFn directly call karo — functionality break nahi honi chahiye.",
          }}
          realWorldScenario="E-commerce homepage — best sellers list calculate hone mein 2 seconds lagti hai (complex JOINs, aggregations). Redis mein 1 hour cache karke: pehla user 2s wait karta hai, baaki 999 users instant response milta hai. Math karo: bina cache 1000 users/minute = 1000 expensive queries/minute. Cache ke saath: 1 query per hour. Database pe 60,000x kam load — server costs dramatically down."
          commonMistakes={[
            {
              mistake: 'Redis connection error ignore karna',
              why: 'Redis down hone par app crash ya hang ho sakti hai agar error properly handle nahi ki.',
              fix: 'Graceful degradation implement karo — Redis fail hone par DB se serve karo. Cache unavailable hone par functionality break nahi honi chahiye.',
            },
            {
              mistake: 'TTL nahi lagana cached data par',
              why: 'Stale data indefinitely cache mein — user purana data dekhta rehta hai. Memory bhi exhaust hoti hai.',
              fix: 'Hamesha TTL set karo — setEx() use karo (set + expire). Business logic pe based TTL: static config 1 day, user data 5 min, real-time prices 30 sec.',
            },
          ]}
          proTip="ioredis library official redis package se better hai TypeScript support aur cluster support ke liye. Serverless environments ke liye Upstash Redis — per-request billing, no always-on server, free tier available. Upstash HTTP API bhi support karta hai — edge functions mein kaam karta hai jahan TCP connections nahi hote. Aur ek golden rule: Redis ke bina app kaam karna chahiye — cache optional layer hai, core functionality nahi."
        />
      </div>

      <div id="redis-data-types">
        <ConceptCard
          title="Redis Data Types — String se Sorted Set Tak"
          emoji="📊"
          difficulty="advanced"
          whatIsIt="Redis ko sirf key-value store samajhna aise hai jaise Swiss army knife ko sirf ek blade wala samajhna. Redis 5+ data structures deta hai. String (simple values, counters), Hash (object fields — user profile), List (queue ya stack — notifications), Set (unique members — online users), Sorted Set (ranked data — leaderboard). Sahi data structure = cleaner code + dramatically better performance."
          whenToUse={[
            'String: Simple values, JSON objects, counters, flags',
            'Hash: User objects, session data — multiple fields ek key mein',
            'List: Task queues, recent activity feeds, pagination',
            'Set: Unique values, tags, friend lists, online users',
            'Sorted Set: Leaderboards, priority queues, expiry timestamps',
          ]}
          whyUseIt="Ab sawaal ye aata hai — sab kuch String mein JSON.stringify karke store karo toh kya problem hai? Problem ye hai: user profile ka sirf 'lastSeen' update karna ho — JSON string read karo, parse karo, modify karo, serialize karo, write karo — 5 steps, race condition prone. Hash use karo — HSET user:123 lastSeen now — 1 step, atomic. INCR command counter ke liye atomic hai — concurrent requests race condition nahi create karte. Sahi data structure = simpler code + no bugs."
          howToUse={{
            filename: 'redis-types.ts',
            language: 'typescript',
            code: `const redis = await getRedisClient()

// STRING — basic values, counters
await redis.set('site:status', 'online')
await redis.incr('stats:pageviews')       // Atomic increment
await redis.incrBy('user:123:points', 10)
const count = await redis.get('stats:pageviews')

// HASH — object fields
await redis.hSet('user:123', {
  name: 'Rahul Kumar',
  email: 'rahul@example.com',
  role: 'admin',
  lastSeen: new Date().toISOString(),
})
const userName = await redis.hGet('user:123', 'name')
const userObj = await redis.hGetAll('user:123')  // All fields

// LIST — queue, recent items
await redis.lPush('notifications:user:123', JSON.stringify({ msg: 'New order!', ts: Date.now() }))
await redis.lTrim('notifications:user:123', 0, 49)  // Keep last 50
const notifications = await redis.lRange('notifications:user:123', 0, 9)  // First 10

// SET — unique members
await redis.sAdd('online:users', 'user:123', 'user:456')
await redis.sRem('online:users', 'user:123')
const isOnline = await redis.sIsMember('online:users', 'user:456')
const onlineCount = await redis.sCard('online:users')

// SORTED SET — leaderboard
await redis.zAdd('leaderboard', [
  { score: 1500, value: 'user:123' },
  { score: 2300, value: 'user:456' },
  { score: 980,  value: 'user:789' },
])
const rank = await redis.zRevRank('leaderboard', 'user:456')  // 0 = top
const topPlayers = await redis.zRevRangeWithScores('leaderboard', 0, 9)  // Top 10`,
            explanation: "Under the hood: lTrim list ko bounded rakhta hai — notifications indefinitely grow nahi hongi, memory safe. zRevRank sorted set mein O(log N) hai — million players ke saath bhi instant rank. INCR atomic hai — under the hood single-threaded Redis mein ye ek operation hai, race condition impossible. hGetAll ek round trip mein sab fields — multiple hGet calls multiple round trips. Network latency matter karta hai.",
          }}
          realWorldScenario="Gaming leaderboard with 1 million players: SQL approach — SELECT rank FROM (SELECT user_id, RANK() OVER (ORDER BY score DESC)) — full table scan, seconds lagte hain. Redis Sorted Set: zAdd pe O(log N), zRevRank pe O(log N), top 100 pe O(log N + 100). Real-time updates, instant reads, millions of players — ye SQL se 1000x faster hai aur code bhi simple hai."
          commonMistakes={[
            {
              mistake: 'Sab kuch String mein JSON.stringify karke store karna',
              why: 'Object ka ek field update karne ke liye poora JSON read → parse → modify → serialize → store — expensive aur race condition prone.',
              fix: 'Object-like data ke liye Hash use karo — individual fields update karo efficiently. JSON sirf jab poora object ek unit hai.',
            },
            {
              mistake: 'Unbounded Lists/Sets — no size limit',
              why: 'Notifications, feeds, logs indefinitely grow karte hain — memory exhausted.',
              fix: 'lTrim se list bounded rakho. Set ke liye regular cleanup ya TTL. Redis maxmemory policy configure karo (allkeys-lru ya similar).',
            },
          ]}
          proTip="Redis Streams (XADD, XREAD) ek hidden gem hai — Kafka-like event streaming Redis ke andar. Consumer groups, message acknowledgment, persistent messages — lightweight event bus possible hai bina Kafka setup kiye. BullMQ internally Redis Lists/Streams use karta hai. Jab Kafka overkill lage aur simple pub/sub se zyada chahiye — Redis Streams perfect middle ground hai."
        />
      </div>

      <div id="cache-strategies">
        <ConceptCard
          title="Cache Strategies — Cache-Aside, Write-Through"
          emoji="🗺️"
          difficulty="advanced"
          whatIsIt="Caching ki duniya mein ek famous quote hai: 'There are only two hard problems in computer science: cache invalidation and naming things.' Cache strategies ye decide karti hain ki data kab cache mein store ho, kab update ho, kab delete ho. Teen main strategies: Cache-Aside (app manage kare), Write-Through (write pe dono update), Write-Behind (cache mein likho, DB async). Har strategy alag tradeoffs ke saath hai — koi silver bullet nahi."
          whenToUse={[
            'Cache-Aside: Most common — read-heavy, tolerate slightly stale data',
            'Write-Through: Data must be consistent — financial data, inventory',
            'Write-Behind: High write throughput — analytics, logging, counters',
            'Read-Through: Cache automatically handles miss — libraries implement karte hain',
          ]}
          whyUseIt="Ab sawaal ye aata hai — kaunsi strategy use karein? Business requirement decide karta hai. E-commerce product price: Write-Through — price update ho toh immediately cache bhi update, customer galat price nahi dekhna chahiye. Blog view count: Write-Behind — thodi delay okay hai, high write throughput chahiye. User profile: Cache-Aside with 5 min TTL — mostly read, kabhi kabhi update, slight staleness acceptable. Rule: higher consistency cost = slower writes."
          howToUse={{
            filename: 'cache-strategies.ts',
            language: 'typescript',
            code: `// Cache-Aside (Lazy Loading) — most common
async function getCacheAside(key: string, fetchFn: () => Promise<unknown>, ttl: number) {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)          // Hit

  const data = await fetchFn()                   // Miss — DB se
  await redis.setEx(key, ttl, JSON.stringify(data))  // Cache mein store
  return data
}

// Write-Through — hamesha dono update karo
async function updateUserWriteThrough(userId: string, updates: Partial<User>) {
  // DB update karo
  const user = await prisma.user.update({ where: { id: userId }, data: updates })

  // Cache bhi update karo
  await redis.setEx(\`user:\${userId}\`, 300, JSON.stringify(user))

  return user
}

// Cache Invalidation — update pe cache delete karo
async function updateUserInvalidate(userId: string, updates: Partial<User>) {
  const user = await prisma.user.update({ where: { id: userId }, data: updates })

  // Cache delete karo — next read fresh data lega
  await redis.del(\`user:\${userId}\`)

  return user
}

// Write-Behind — async DB update (high throughput)
async function trackPageView(pageId: string) {
  // Redis mein immediately increment — fast!
  await redis.incr(\`views:\${pageId}\`)

  // Queue mein daalo for DB sync (background)
  await queue.add('syncPageViews', { pageId })  // BullMQ
}

// Background worker — DB sync
async function syncPageViewsWorker({ pageId }: { pageId: string }) {
  const views = await redis.getSet(\`views:\${pageId}\`, '0')  // Get and reset
  await prisma.page.update({
    where: { id: pageId },
    data: { views: { increment: parseInt(views ?? '0') } },
  })
}`,
            explanation: "Under the hood: Cache invalidation (del) simplest approach — next read cache miss karega aur fresh DB se fetch karke store karega. Write-through: DB update hone par immediately cache update — consistency guarantee lekin har write 2 operations. Write-behind: Redis incr immediate — background worker periodic DB sync karta hai. Redis crash se unsynced data lost — durability trade-off. Thundering herd problem: popular item TTL expire hone par 1000 requests simultaneously DB hit — mutex/lock se prevent karo.",
          }}
          realWorldScenario="E-learning platform — teen alag use cases, teen alag strategies: Video views counter (Write-Behind — thousands per second, 1-2 min delay acceptable), User subscription status (Write-Through — payment critical, stale data = wrong access), Course content pages (Cache-Aside 1 hour TTL — rarely changes, 1000x more reads than writes). Ek app mein teen strategies — ye real world hai."
          commonMistakes={[
            {
              mistake: 'Cache invalidation complex logic ignore karna',
              why: 'User A update kare, user B purana cached data dekhe — inconsistency bugs. Distributed systems mein especially complex.',
              fix: 'Short TTL + invalidation on update. Strict consistency ke liye write-through. Cache key design carefully karo — related entities ki dependencies track karo.',
            },
            {
              mistake: 'Thundering herd — sab cache miss ek saath',
              why: 'Popular item TTL expire hone par sab requests simultaneously DB hit karte hain — DB overload.',
              fix: 'Cache stampede prevention: mutex/lock — sirf pehli request DB fetch kare, baaki wait karein. Ya cache miss par probabilistic early expiration.',
            },
          ]}
          proTip="Cache warmup ek important production technique hai — deploy ke turant baad cache empty hoti hai, sab requests DB hit karti hain (cold start problem). Solution: deploy script mein top-N popular items pre-populate karo. Ya scheduled job se har hour fresh data cache mein push karo — proactive caching. User kabhi cold cache experience nahi karta. Deploy timing bhi matter karta hai — traffic low hone par deploy karo jab cold start damage minimum ho."
        />
      </div>

      <div
        className="rounded-xl p-5"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <p className="text-[#A78BFA] font-semibold mb-2">🤔 Ab sawaal ye aata hai...</p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Strategy choose kar liya — lekin Redis ki memory toh limited hai. Kya hoga jab memory full ho jaaye? TTL aur eviction policies ye handle karte hain. Aur ek aur gotcha: agar sab cached keys ek saath expire hoti hain toh? Thundering herd problem — production mein ye ek disaster hai. Neeche dekhte hain kaise prevent karein.
        </p>
      </div>

      <div id="ttl-eviction">
        <ConceptCard
          title="TTL & Eviction — Memory Management"
          emoji="⏰"
          difficulty="advanced"
          whatIsIt="TTL socho food ki expiry date ki tarah — milk 3 din mein expire, canned food 2 saal mein. Redis mein har key ko TTL lagana aise hi zaroori hai. Bina TTL ke Redis memory indefinitely badhti rehti hai. Aur jab memory full ho? Eviction policy kaam aati hai — kaun hata? allkeys-lru: recently used nahi kiya gaya data hata do. volatile-lru: sirf TTL wali keys hata do. noeviction: OOM error throw karo — app crash. Production mein allkeys-lru safest default hai."
          whenToUse={[
            'TTL: Hamesha set karo — static config ke liye bhi',
            'allkeys-lru: General cache — memory fill hone par oldest evict',
            'volatile-lru: Important non-expiring data bhi hai (session)',
            'noeviction: Redis as primary store — memory must not be lost',
          ]}
          whyUseIt="Ab sawaal ye aata hai — agar sab keys same TTL rakho toh kya hoga? Thundering herd problem! 1000 keys same time expire hoti hain — 1000 simultaneous DB queries. Server kneel karta hai. Solution: TTL mein jitter add karo — Math.random() se thoda variation daalo. Sab keys alag alag time expire hongi — load spread out. Ye ek simple trick hai jo production disasters prevent karti hai."
          howToUse={{
            filename: 'ttl-eviction.ts',
            language: 'typescript',
            code: `// TTL set karne ke ways
await redis.set('key', 'value', { EX: 300 })  // 300 seconds = 5 minutes
await redis.setEx('key', 300, 'value')         // Same

// Existing key par TTL set karo
await redis.expire('key', 3600)  // 1 hour

// TTL check karo
const ttl = await redis.ttl('key')  // Remaining seconds, -1 = no ttl, -2 = not exists

// Refresh TTL on access (sliding expiry)
async function getWithSlidingExpiry(key: string, slidingTtl: number) {
  const value = await redis.get(key)
  if (value) {
    await redis.expire(key, slidingTtl)  // Access par reset
    return JSON.parse(value)
  }
  return null
}

// Redis maxmemory config
// redis.conf:
// maxmemory 256mb
// maxmemory-policy allkeys-lru

// Node.js se check karo
const info = await redis.info('memory')
// used_memory_human: 23.45M
// maxmemory_human: 256.00M

// Eviction monitoring
const stats = await redis.info('stats')
// evicted_keys: 1234 — kitni keys evict hui

// Pattern-based TTL — different data types ke liye
const TTL = {
  user: 300,           // 5 min
  session: 3600,       // 1 hour
  productList: 600,    // 10 min
  analytics: 86400,    // 1 day
  staticConfig: 604800,// 1 week
} as const

function cacheKey(type: keyof typeof TTL, id: string) {
  return \`\${type}:\${id}\`
}`,
            explanation: "Under the hood: Sliding expiry session management ke liye ideal — har request pe TTL reset hota hai, inactive sessions naturally expire. Redis single-threaded hai — expire check lazy hota hai (access pe) aur periodic background cleanup bhi. INFO memory command Redis pe directly run karo — used_memory_human real-time dikhata hai. evicted_keys badhna warning hai — ya maxmemory badhao ya data reduce karo ya TTL adjust karo. allkeys-lru internally approximate LRU use karta hai — exact LRU nahi (performance reasons).",
          }}
          realWorldScenario="Session management step-by-step: User login kare — session Redis mein store karo, TTL 30 min. User har request pe active hai — har request pe expire reset (sliding TTL). User browser band kare — koi request nahi — 30 min baad session automatically expire. User wapas aaye login kar liya aur session expire hua — fresh login. Security aur UX ka perfect balance — user repeatedly login nahi karta, lekin idle sessions clean up hoti hain."
          commonMistakes={[
            {
              mistake: 'maxmemory-policy noeviction production mein',
              why: 'Memory fill hone par Redis OOM Error throw karta hai — application crash ya stuck.',
              fix: 'allkeys-lru production cache ke liye. noeviction sirf jab Redis primary database ho aur data loss unacceptable. Monitor evicted_keys metric.',
            },
            {
              mistake: 'All keys same TTL rakhna',
              why: 'Cache stampede — sab keys same time expire hone par sab simultaneously DB hit karte hain. Popular sites mein catastrophic.',
              fix: 'Jitter add karo TTL mein: const ttl = baseTtl + Math.random() * (baseTtl * 0.1). Expiry spread out hoti hai — thundering herd prevent.',
            },
          ]}
          proTip="Redis keyspace notifications ek powerful hidden feature hai — CONFIG SET notify-keyspace-events Ex karke expired keys real-time subscribe kar sakte ho. Order expire ho — inventory release karo. Session expire ho — cleanup karo. Ye event-driven architecture Redis ke andar possible banata hai. Lekin caution: high-volume expirations pe notifications flood kar sakte hain — carefully use karo sirf important keys ke liye."
        />
      </div>

      <div id="bullmq-queues">
        <ConceptCard
          title="BullMQ — Job Queues with Redis"
          emoji="📬"
          difficulty="advanced"
          whatIsIt="Socho BullMQ ek post office ki tarah — tum letter (job) daalte ho mailbox mein (queue) aur apna kaam karo. Postman (worker) apne time par letter deliver karta hai. Agar delivery fail ho? Retry karta hai. Ye async decoupling hai — user ka request turant complete, heavy kaam background mein. BullMQ Redis pe built hai — server restart hone par bhi jobs nahi khoote. Producer aur Consumer alag processes mein bhi chal sakte hain."
          whenToUse={[
            'Email/SMS send karna — async, retry on failure',
            'Image/video processing — CPU intensive background mein',
            'Scheduled tasks — daily reports, cleanup jobs',
            'Webhooks deliver karna — retry policy with backoff',
          ]}
          whyUseIt="Ab sawaal ye aata hai — sirf async/await se background nahi chal sakta? Problem ye hai: agar server crash hota hai job execute hone ke beech mein — job lost. Network timeout hota hai — job nahi chala. BullMQ Redis mein jobs persist karta hai — server restart ke baad bhi jobs queue mein hain. Exponential backoff retry — email server temporarily down tha, 5s baad retry, phir 10s, phir 20s — email eventually deliver hoga. Reliability guarantee milti hai jo plain async se nahi milti."
          howToUse={{
            filename: 'queue.ts',
            language: 'typescript',
            code: `import { Queue, Worker, Job } from 'bullmq'
import { createClient } from 'redis'

const redisConnection = { host: 'localhost', port: 6379 }

// Queue — jobs add karo
const emailQueue = new Queue('emails', { connection: redisConnection })

// Job add karo (Producer)
async function sendWelcomeEmail(userId: string, email: string) {
  await emailQueue.add(
    'welcome',                    // Job name
    { userId, email },            // Job data
    {
      delay: 0,                   // Immediate
      attempts: 3,                // Retry 3 times on failure
      backoff: {
        type: 'exponential',
        delay: 5000,              // 5s, 10s, 20s delays
      },
      removeOnComplete: { count: 100 },  // Completed jobs cleanup
      removeOnFail: { count: 50 },
    }
  )
}

// Scheduled job
await emailQueue.add(
  'weeklyDigest',
  { type: 'digest' },
  { repeat: { cron: '0 9 * * 1' } }  // Every Monday 9 AM
)

// Worker — jobs process karo (Consumer)
const emailWorker = new Worker(
  'emails',
  async (job: Job<{ userId: string; email: string }>) => {
    console.log(\`Processing job \${job.id}: \${job.name}\`)

    if (job.name === 'welcome') {
      await sendEmailViaSES(job.data.email, 'Welcome!', welcomeTemplate(job.data.userId))
      await job.updateProgress(100)
    }
  },
  {
    connection: redisConnection,
    concurrency: 5,  // 5 jobs simultaneously
  }
)

// Events
emailWorker.on('completed', (job) => console.log(\`Job \${job.id} completed\`))
emailWorker.on('failed', (job, err) => console.error(\`Job \${job?.id} failed:\`, err))`,
            explanation: "Under the hood: Producer queue mein job add karta hai — Redis LIST mein store hoti hai. Consumer BRPOPLPUSH se atomically job pick karta hai (processing list mein move). Job complete: done. Job fail: exponential backoff ke baad retry queue mein wapas. Concurrency: 5 workers simultaneously 5 jobs process karte hain. Cron job: BullMQ internally Redis sorted set use karta hai scheduled jobs ke liye — score = next execution time.",
          }}
          realWorldScenario="E-commerce order placed — step-by-step: 1) API order DB mein save kare, 5 jobs queue mein daale — return 200 response (50ms). 2) Background workers parallel: confirmation email (emailQueue), inventory update (inventoryQueue), fulfillment notify (fulfillmentQueue), analytics event (analyticsQueue), loyalty points add (loyaltyQueue). 5 workers parallel kaam karte hain. User instant response pata hai. Sab kaam reliably hota hai even if individual workers fail karte hain."
          commonMistakes={[
            {
              mistake: 'Heavy CPU work main process mein BullMQ worker se',
              why: 'Worker Node.js main thread par run karta hai — heavy computation event loop block karta hai — other requests suffer.',
              fix: 'CPU-bound work worker_threads mein do. BullMQ worker se Worker Thread spawn karo: const { Worker: NodeWorker } = require("worker_threads").',
            },
            {
              mistake: 'Job data mein large objects store karna',
              why: 'BullMQ job data Redis mein store hoti hai — large payloads (images, big JSON) Redis memory use karte hain aur slow ho jaate hain.',
              fix: 'Job mein reference store karo — userId, fileId — actual data S3/DB mein. Worker DB/S3 se data load kare.',
            },
          ]}
          proTip="Bull Board (@bull-board/express) install karo — ye ek visual dashboard hai jahan active jobs, completed, failed sab dikhta hai. Failed jobs retry karo one click se. Production debugging ke liye invaluable — email nahi gaya? Queue mein dekho, failed jobs mein dekho, error message padho. npm install @bull-board/express @bull-board/api. Admin route pe mount karo lekin auth lagana mat bhoolna — ye sensitive queue data expose karta hai."
        />
      </div>
    </div>
  )
}
