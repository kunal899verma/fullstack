'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

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
          Database queries expensive hoti hain — disk I/O, CPU, network. Redis in-memory data store hai — RAM se data serve karta hai, microseconds mein. Right caching strategy se database load 90% tak kam ho sakta hai aur API response time milliseconds mein aata hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Redis sirf cache nahi hai — queues, pub/sub, leaderboards, session storage, distributed locks — ye sab Redis se implement hote hain. Swiss army knife of modern backends.
        </p>
      </div>

      <div id="why-cache">
        <ConceptCard
          title="Why Cache? — DB Load & Latency"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="Caching ka matlab hai frequently accessed ya expensive-to-compute data ko fast storage mein store karna. Database query: 10-100ms. Redis read: 0.1-1ms. 100x faster. User profile jo har request mein chahiye — DB se har baar nahi, Redis se lo. Compute-heavy reports — ek baar calculate, 1 ghante cache mein."
          whenToUse={[
            'Frequently read, rarely changed data — product catalog, user profiles',
            'Expensive computations — analytics reports, recommendation scores',
            'Session storage — stateless auth ke saath sessions',
            'Rate limiting counters — distributed rate limits across servers',
          ]}
          whyUseIt="Cache hit aur miss: Hit — Redis se fast response. Miss — DB se slow query, cache mein store, next time hit. Hit rate 80-90% — effectively 80% requests 100x faster. Database connections kam lagti hain — server costs down. Scaling much easier hota hai cache ke saath."
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
            explanation: "Reconnect strategy exponential backoff implement karta hai — Redis temporarily unavailable hone par crash nahi karo. getOrSet pattern (cache-aside) standard caching pattern hai. JSON serialize/deserialize overhead hai — msgpack ya cbor se faster binary serialization possible hai large objects ke liye.",
          }}
          realWorldScenario="E-commerce homepage — best sellers list database se calculate hone mein 2 seconds lagti hai. Redis mein 1 hour cache karke — pehla user 2s wait karta hai, baaki 999 users instant response. Database par sirf 1 query per hour instead of 1000 per minute."
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
          proTip="ioredis library Node.js mein popular alternative hai — better TypeScript support, cluster support, built-in retry logic. Upstash (serverless Redis) consider karo serverless environments ke liye — per-request billing, no always-on server. Free tier bhi available hai."
        />
      </div>

      <div id="redis-data-types">
        <ConceptCard
          title="Redis Data Types — String se Sorted Set Tak"
          emoji="📊"
          difficulty="advanced"
          whatIsIt="Redis sirf key-value store nahi hai — 5+ data structures support karta hai: String (basic), Hash (object), List (queue/stack), Set (unique values), Sorted Set (ranked leaderboard). Sahi data structure use karne se dramatically better performance aur simpler code milta hai."
          whenToUse={[
            'String: Simple values, JSON objects, counters, flags',
            'Hash: User objects, session data — multiple fields ek key mein',
            'List: Task queues, recent activity feeds, pagination',
            'Set: Unique values, tags, friend lists, online users',
            'Sorted Set: Leaderboards, priority queues, expiry timestamps',
          ]}
          whyUseIt="Wrong data type use karna performance aur simplicity dono hurt karta hai. Counter ke liye List use karna awkward hai — INCR command String par atomic counter deta hai. Leaderboard ke liye multiple keys update karna vs Sorted Set automatic sorting — asmaan zameen ka fark."
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
            explanation: "lTrim list ka size bounded rakhta hai — memory efficient. zRevRank sorted set mein rank dhundta hai — O(log N). INCR atomic operation hai — race conditions nahi hote multiple servers par. hGetAll poora hash ek baar fetch karta hai — multiple hGet calls se efficient.",
          }}
          realWorldScenario="Gaming leaderboard: Sorted Set — player score update karo (zAdd), top 100 lo (zRevRange 0 99), player ka rank lo (zRevRank) — real-time updates support karta hai millions of players ke saath. SQL COUNT query se 1000x faster."
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
          proTip="Redis Streams (XADD, XREAD) event streaming ke liye — Kafka-like functionality Redis ke andar. Consumer groups, message acknowledgment, persistent messages — powerful event bus implementation possible hai. BullMQ internally Redis Streams jaisa kaam karta hai."
        />
      </div>

      <div id="cache-strategies">
        <ConceptCard
          title="Cache Strategies — Cache-Aside, Write-Through"
          emoji="🗺️"
          difficulty="advanced"
          whatIsIt="Teen main caching strategies: Cache-Aside (lazy loading) — app cache check kare, miss hone par DB se load aur cache mein store. Write-Through — write cache aur DB dono mein simultaneously. Write-Behind (cache-behind) — cache mein likho, async DB update. Har strategy alag tradeoffs ke saath aati hai."
          whenToUse={[
            'Cache-Aside: Most common — read-heavy, tolerate slightly stale data',
            'Write-Through: Data must be consistent — financial data, inventory',
            'Write-Behind: High write throughput — analytics, logging, counters',
            'Read-Through: Cache automatically handles miss — libraries implement karte hain',
          ]}
          whyUseIt="Wrong strategy cache consistency problems deti hai — stale data, race conditions, cache aur DB out of sync. Cache-Aside simple aur effective hai most cases mein. Write-Through consistency guarantee karta hai cost par. Write-Behind throughput maximize karta hai durability risk par."
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
            explanation: "Cache invalidation ya write-through — consistency requirement pe decide karo. Delete (invalidation) simple hai — next read fresh data lata hai. Write-through both updated karta hai — consistent but two operations. Write-behind fastest writes — durability risk: Redis crash par unsynced data lose.",
          }}
          realWorldScenario="E-learning platform — video views: Write-Behind (high volume, eventual consistency okay), user subscription status: Write-Through (payment critical, must be consistent), course content: Cache-Aside with 1 hour TTL (rarely changes, read heavy)."
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
          proTip="Cache-aside pattern mein cache warmup implement karo: deploy ke baad important keys pre-populate karo. Script likho jo frequently accessed data cache mein daale. Cold start mein DB hammering avoid hogi. Scheduled job se popular items regularly refresh karo — proactive caching."
        />
      </div>

      <div id="ttl-eviction">
        <ConceptCard
          title="TTL & Eviction — Memory Management"
          emoji="⏰"
          difficulty="advanced"
          whatIsIt="TTL (Time-To-Live) key lifetime define karta hai — expire hone par automatically delete. Redis memory limit hone par eviction policy decide karta hai konsa data remove ho. Common policies: allkeys-lru (least recently used — any key evict), volatile-lru (only TTL wali keys), noeviction (OOM error — no data remove). Production mein allkeys-lru safest hai."
          whenToUse={[
            'TTL: Hamesha set karo — static config ke liye bhi',
            'allkeys-lru: General cache — memory fill hone par oldest evict',
            'volatile-lru: Important non-expiring data bhi hai (session)',
            'noeviction: Redis as primary store — memory must not be lost',
          ]}
          whyUseIt="Bina TTL ke data indefinitely grow karta hai — OOM kill. Eviction policy without understanding use karne se important data delete ho sakta hai. TTL data freshness guarantee karta hai — stale data automatically cleanup. Memory management predictable rehta hai."
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
            explanation: "Sliding expiry (expire reset on access) — active sessions alive rakhta hai, inactive expire hoti hain. Redis INFO command memory usage real-time dikhata hai. evicted_keys counter badh raha hai — maxmemory badhaao ya cache size reduce karo ya TTL kam karo. allkeys-lru LRU eviction karta hai — recently accessed data survive karta hai.",
          }}
          realWorldScenario="Session cache — user active hai toh session alive rahe, inactive 30 min ke baad expire. Sliding TTL: har request par session TTL reset. User 30 min inactive ho toh session expire — security best practice."
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
          proTip="Redis keyspace notifications subscribe karo expired events ke liye: CONFIG SET notify-keyspace-events Ex; PSUBSCRIBE __keyevent@0__:expired. Ye expired keys real-time notify karta hai — follow-up cleanup actions trigger karo. Session expired hone par cleanup, order expired hone par inventory release."
        />
      </div>

      <div id="bullmq-queues">
        <ConceptCard
          title="BullMQ — Job Queues with Redis"
          emoji="📬"
          difficulty="advanced"
          whatIsIt="BullMQ Redis-backed job queue library hai — background jobs reliably process karo. Email send karna, PDF generate karna, image resize karna — ye sab async background mein karo. Retry on failure, scheduled jobs, concurrency control, job progress tracking — sab built-in. Producer (job add karo) aur Consumer (job process karo) pattern."
          whenToUse={[
            'Email/SMS send karna — async, retry on failure',
            'Image/video processing — CPU intensive background mein',
            'Scheduled tasks — daily reports, cleanup jobs',
            'Webhooks deliver karna — retry policy with backoff',
          ]}
          whyUseIt="API request mein synchronously email bhejne par: email server slow = API slow. Exception = email nahi gaya = user angry. BullMQ se: API instantly returns, background worker email bhejta hai, failure par retry karta hai. Reliability dramatically improve hoti hai."
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
            explanation: "Producer (API server) jobs queue mein daalta hai. Consumer (separate process ya worker threads) jobs process karta hai. Redis jobs reliably store karta hai — server restart ke baad bhi jobs nahi khoote. Exponential backoff retry se temporary failures handle hote hain. concurrency multiple jobs parallel process karta hai.",
          }}
          realWorldScenario="E-commerce order placed: API immediately 200 response deta hai. Background mein queue: confirmation email, inventory decrease, fulfillment system notify, analytics event. 5 parallel background tasks — user instantly response milta hai, sab kaam reliable background mein hota hai."
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
          proTip="Bull Board (@bull-board/express) UI install karo — web dashboard se job queues monitor karo. Active jobs, completed, failed — sab visual. Retry failed jobs dashboard se. Production monitoring ke liye invaluable: npm install @bull-board/express @bull-board/api."
        />
      </div>
    </div>
  )
}
