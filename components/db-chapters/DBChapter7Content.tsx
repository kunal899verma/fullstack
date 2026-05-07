'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'Composite index (a, b, c) hai. Kaunsi query is index ka full benefit legi?',
    options: [
      { text: 'WHERE b = 1 AND c = 2', correct: false, explanation: 'Leading column "a" skip ho gaya — index seek nahi hoga, sirf partial scan.' },
      { text: 'WHERE a = 1 AND b = 2', correct: true, explanation: 'Sahi! Leading columns left-to-right use ho rahe hain — index efficiently use hoga.' },
      { text: 'WHERE c = 3', correct: false, explanation: 'Sirf trailing column hai — composite index ka fayda nahi, full scan hoga.' },
      { text: 'WHERE b = 1', correct: false, explanation: 'Leading column "a" missing — index ka sirf partial use hoga ya seq scan.' },
    ],
  },
  {
    question: 'EXPLAIN ANALYZE output mein "Seq Scan" dikhna kya indicate karta hai?',
    options: [
      { text: 'Query perfectly optimized hai', correct: false, explanation: 'Sequential scan matlab poori table scan ho rahi hai — usually slow for large tables.' },
      { text: 'Database poori table row-by-row scan kar raha hai — index use nahi ho raha', correct: true, explanation: 'Bilkul sahi! Seq Scan large tables mein slow hota hai. Index Scan ya Index Only Scan target hai.' },
      { text: 'Query cached hai memory mein', correct: false, explanation: 'Caching alag concept hai — Seq Scan sirf access method batata hai.' },
      { text: 'Database parallel workers use kar raha hai', correct: false, explanation: 'Parallel workers "Parallel Seq Scan" mein dikhte hain — ye bhi slow hai large tables ke liye.' },
    ],
  },
  {
    question: 'N+1 problem ko solve karne ka sabse direct tarika Prisma mein kya hai?',
    options: [
      { text: 'Promise.all() use karo parallel queries ke liye', correct: false, explanation: 'Promise.all() parallelism deta hai lekin N+1 queries phir bhi fire hongi — database pe load same.' },
      { text: 'include use karo relation ke saath — single JOIN query', correct: true, explanation: 'Sahi! include se Prisma ek JOIN query generate karta hai — N+1 ki jagah sirf 1 query.' },
      { text: 'Async/await remove karo', correct: false, explanation: 'Async/await N+1 se unrelated hai — problem query pattern mein hai, async handling mein nahi.' },
      { text: 'Database connection pool size badhao', correct: false, explanation: 'Pool size se throughput badh sakti hai lekin N+1 queries ki count kam nahi hogi.' },
    ],
  },
  {
    question: 'Covering index kya hota hai?',
    options: [
      { text: 'Index jo saari tables ko cover karta hai', correct: false, explanation: 'Covering index specific query ke saare columns ko cover karta hai — poori database ko nahi.' },
      { text: 'Index jo query ke saare required columns store karta hai — table access ki zaroorat nahi', correct: true, explanation: 'Bilkul! Index Only Scan hota hai — table heap access skip hoti hai. Maximum performance.' },
      { text: 'Compressed index jo disk space bachata hai', correct: false, explanation: 'Covering index performance ke liye hai — compression alag concept hai.' },
      { text: 'Partial index with WHERE clause', correct: false, explanation: 'Partial index alag concept hai — sirf kuch rows index karta hai WHERE condition pe.' },
    ],
  },
  {
    question: 'Index selectivity kya hai aur high selectivity kyun better hai?',
    options: [
      { text: 'Index ka file size — chhota better hai', correct: false, explanation: 'Selectivity size se nahi, uniqueness se related hai.' },
      { text: 'Distinct values ka ratio total rows se — high selectivity matlab index scan kam rows filter karta hai', correct: true, explanation: 'Sahi! email column high selectivity — har value near-unique. gender column low selectivity — sirf 2-3 values, index useless. High selectivity = effective index.' },
      { text: 'Index kitna frequently update hota hai', correct: false, explanation: 'Update frequency performance cost hai — selectivity data distribution hai.' },
      { text: 'Kitne columns index mein hain', correct: false, explanation: 'Column count composite index ka concept hai — selectivity distribution ka measure hai.' },
    ],
  },
]

export default function DBChapter7Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Query Optimization & Indexes — Database Ko Rocket Banao
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Slow query hai production mein. Pehle kya karte ho? 90% developers GUESS karte hain — "index add karte hain". GALAT approach! Pehle EXPLAIN ANALYZE chalao — phir dekho problem kahan hai. Measure first, optimize second — ye Akshay Saini style hai!
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Sawaal: 10ms query aur 3000ms query mein kya fark hai? Hardware nahi — indexes aur query patterns. Is chapter mein seekhenge kaise queries X-ray karein, indexes kab aur kaise lagaein, N+1 problem ka silent killer detect karein, aur covering indexes se table ko bilkul touch kiye bina maximum performance nikaalein. Ye sab skills production databases ke liye life-and-death hain.
        </p>
      </div>

      <div id="explain-analyze">
        <ConceptCard
          title="Query Execution Plan — EXPLAIN ANALYZE"
          emoji="🔬"
          difficulty="intermediate"
          whatIsIt="EXPLAIN ANALYZE ek X-ray machine hai aapki query ke liye — database ke andar exactly kya ho raha hai woh dikhata hai. Seq Scan matlab poori table row-by-row padh li jaati hai — jaise library mein book dhundne ke liye har shelf check karo. Index Scan matlab seedha sahi row tak pahuncho — jaise index page se page number nikaalo. Index Only Scan = table ko chhua hi nahi — sirf index pages se kaam ho gaya, fastest possible path. Under the hood: query planner statistics dekh ke decide karta hai kaunsa path sabse sasta hai — cost units mein. Aur EXPLAIN ke bina optimize karna? Andheron mein teer chalana hai."
          whenToUse={[
            'Query slow lag rahi ho — pehle EXPLAIN ANALYZE chalaao',
            'Index add karne se pehle — confirm karo ki needed hai',
            'Index add karne ke baad — verify karo ki use ho raha hai',
            'ORM-generated queries debug karne ke liye — actual SQL dekho',
          ]}
          whyUseIt="Query optimize karna guess work nahi — EXPLAIN karo pehle! Bina EXPLAIN ke agar index lagao aur planner us index ko use hi na kare — toh woh index bakwaas hai. Planner ke paas statistics hain — table mein kitne rows, distribution kya hai, disk I/O cost kya hai. Agar statistics stale hain (ANALYZE nahi kiya kaafi time se) toh planner galat path choose karta hai. Actual rows vs estimated rows mein bada gap dikhna matlab: bhai, statistics update karo. EXPLAIN ANALYZE woh mirror hai jo jhooth nahi bolta."
          howToUse={{
            filename: 'explain-analyze.sql',
            language: 'sql',
            code: `-- Basic EXPLAIN — execution plan (no actual run)
EXPLAIN SELECT * FROM users WHERE email = 'rahul@example.com';

-- EXPLAIN ANALYZE — actual run + timing
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'rahul@example.com';

-- ❌ Before index — Seq Scan (bad for large tables)
-- Output:
-- Seq Scan on users  (cost=0.00..2840.00 rows=1 width=120)
--                    (actual time=14.532..28.941 rows=1 loops=1)
--   Filter: (email = 'rahul@example.com')
--   Rows Removed by Filter: 99999
-- Planning Time: 0.3ms
-- Execution Time: 28.9ms   ← SLOW!

-- Index create karo:
CREATE INDEX idx_users_email ON users(email);

-- ✅ After index — Index Scan (fast)
-- Output:
-- Index Scan using idx_users_email on users
--              (cost=0.42..8.44 rows=1 width=120)
--              (actual time=0.081..0.083 rows=1 loops=1)
--   Index Cond: (email = 'rahul@example.com')
-- Planning Time: 0.4ms
-- Execution Time: 0.1ms    ← 289x FASTER!

-- Covering index — Index Only Scan (fastest)
CREATE INDEX idx_users_email_name ON users(email, name);

EXPLAIN ANALYZE
SELECT name FROM users WHERE email = 'rahul@example.com';
-- Index Only Scan using idx_users_email_name on users
-- Heap Fetches: 0   ← Table nahi chhua!

-- Complex query with JOIN
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON p.author_id = u.id
WHERE u.created_at > NOW() - INTERVAL '30 days'
GROUP BY u.id, u.name
ORDER BY post_count DESC
LIMIT 10;

-- BUFFERS option: cache hit/miss dikhata hai
-- Hit Blocks: N → data already in memory (fast)
-- Read Blocks: N → disk se read hua (slow)`,
            explanation: "cost=0.00..2840.00 — ye relative unit hai, actual milliseconds nahi. actual time=14.532..28.941 matlab first row ka time..last row ka time milliseconds mein. Estimated rows vs actual rows compare karo — agar 1 estimate tha aur 50,000 actual — bhai ANALYZE karo! EXPLAIN ANALYZE query actually execute karta hai andar se — DELETE/UPDATE pe BEGIN + ROLLBACK wrap karo, warna production data delete ho jaayega. Aur haan: explain.depesz.com pe paste karo output — visual tree milegi jo seedha bottleneck highlight karegi.",
          }}
          realWorldScenario="Sochiye: production mein ek angry Slack message — 'checkout page 3 second le raha hai!' Team PANIC. Sabne socha 'server upgrade karo'. Ek developer ne EXPLAIN ANALYZE chalaya — orders table pe Seq Scan, 500K rows, 800ms. Composite index (user_id, status) banaya — ek migration, 0.5ms. 1600x improvement. Server upgrade cancel. EXPLAIN ne exact bottleneck bataya — bina guess work ke."
          commonMistakes={[
            {
              mistake: 'Index banana aur assume karna ki use ho raha hai',
              why: 'Query planner statistics ke basis par decide karta hai — sometimes seq scan efficient hoti hai (small tables ya very low selectivity).',
              fix: 'EXPLAIN ANALYZE se verify karo index use ho raha hai. Agar nahi ho raha: ANALYZE tablename; se statistics update karo.',
            },
            {
              mistake: 'EXPLAIN ANALYZE production mein heavy queries par chalaana',
              why: 'EXPLAIN ANALYZE actually query execute karta hai — slow query production traffic slow kar sakti hai.',
              fix: 'Development DB ya replica pe chalaao. Production mein pg_stat_statements extension se slow queries track karo automatically.',
            },
          ]}
          proTip="Pro tip jo bahut log miss karte hain: explain.depesz.com ya explain.dalibo.com pe apna EXPLAIN output paste karo — visual flamegraph jaisi tree milti hai, slowest nodes red mein highlight hoti hain. Multi-table JOIN queries ka analysis jo terminal mein 30 minute lagta woh visually 2 minute mein ho jaata hai. Bookmark karo — ye free tool hai jo senior engineers daily use karte hain."
        />
      </div>

      <div id="composite-index">
        <ConceptCard
          title="Composite Index Column Order — Most Selective First"
          emoji="📊"
          difficulty="intermediate"
          whatIsIt="Composite index ek telephone directory ki tarah hai jisme pehle last name, phir first name sorted hota hai — agar sirf first name se dhundho toh directory ka koi fayda nahi. Exactly aise hi composite index (a, b, c) hai — leading column 'a' query mein hona hi chahiye, tabhi index use hoga. B-tree index under the hood: sorted data structure — range queries, sorting, LIKE prefix sab handle karta hai. Hash index sirf equality ke liye: token lookup pe blazing fast, lekin ORDER BY ya range? Nahi kar sakta. High selectivity matlab: email column ke 1 lakh unique values hain — 1 row identify ho jaati hai. Gender column ke sirf 2 values — database socha 'index se kya fayda, seedha scan karta hun'."
          whenToUse={[
            'Multiple WHERE columns filter karein — composite index consider karo',
            'ORDER BY + WHERE combination — sort column include karo',
            'High-frequency queries — index optimization worth karta hai',
            'Foreign key columns — JOIN performance ke liye index zaroori',
          ]}
          whyUseIt="Sawaal: orders table pe (status, user_id) index banaya — kyun galat hai? Status ki 3 values hain ('active', 'pending', 'done') — matlab index pehle 33% data filter karega, phir user_id. Ulta karo: (user_id, status) — user_id se directly us user ke orders niklo (shayad 10-20 rows), phir status filter. Order matters — high selectivity pehle always. Unused indexes detect karo: pg_stat_user_indexes mein idx_scan = 0 — ye indexes sirf write operations slow kar rahe hain aur disk space kha rahe hain. Audit karo, drop karo."
          howToUse={{
            filename: 'composite-indexes.sql',
            language: 'sql',
            code: `-- ❌ Wrong order — low selectivity column first
CREATE INDEX idx_bad ON orders(status, user_id);
-- status = 'active'/'pending'/'done' — sirf 3 values
-- user_id = millions of unique values
-- Query: WHERE status = 'active' AND user_id = 123
-- Database 'active' orders bahut saare nikaalega, phir user_id filter — inefficient

-- ✅ Correct order — high selectivity first
CREATE INDEX idx_good ON orders(user_id, status);
-- user_id se directly user ke orders milenge (few rows)
-- phir status filter — minimal work
-- Query: WHERE user_id = 123 AND status = 'active'
-- Super fast!

-- Index types:
-- B-tree (default) — range queries, sorting, equality
CREATE INDEX idx_btree ON products(price);  -- price > 100, price BETWEEN 50 AND 200
CREATE INDEX idx_btree2 ON users(created_at);  -- last 30 days queries

-- Hash — only equality (=), cannot sort
CREATE INDEX idx_hash ON sessions USING HASH (token);
-- WHERE token = 'abc123' — perfect for lookups
-- Cannot: token LIKE 'abc%' or ORDER BY token

-- Partial index — index karo sirf relevant rows
CREATE INDEX idx_active_orders ON orders(user_id)
WHERE status = 'active';
-- Sirf active orders index mein — much smaller, faster
-- Perfect when most orders are 'completed' (old data)

-- Index selectivity check karo:
SELECT
  indexname,
  idx_scan,       -- Kitni baar use hua
  idx_tup_read,   -- Rows read via index
  idx_tup_fetch   -- Actual table rows fetched
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;

-- Unused indexes find karo:
SELECT indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0 AND schemaname = 'public';
-- Ye indexes sirf space waste kar rahe hain — drop karo!`,
            explanation: "B-tree default hai — 99% cases ke liye yahi use karo. Hash index sirf equality ke liye blazing fast hai lekin range queries nahi kar sakta — session tokens, API keys ke liye sahi choice. Partial index ek mast trick hai: WHERE status = 'active' se sirf active orders index mein hain — completed orders (jo 90% hain) index mein hi nahi. Chhota index, faster scans. Unused indexes list regularly check karo — zero idx_scan means wo index waste of resources hai, drop it!",
          }}
          realWorldScenario="Multi-tenant SaaS mein classic query: WHERE org_id = $1 AND created_at > $2 ORDER BY created_at DESC. Agar sirf (org_id) index hota toh filter ke baad sort ka kaam baaki rehta. (org_id, created_at) index banao — org_id se filter, created_at already sorted in index, ORDER BY free mein milti hai. Ek index se teen kaam: filter + range + sort. Ye hai smart indexing — brute force nahi."
          commonMistakes={[
            {
              mistake: 'Har column par alag index banana',
              why: 'Index write operations slow karte hain (INSERT/UPDATE/DELETE). Zyada indexes = more maintenance overhead. Planner bhi confuse hota hai sometimes.',
              fix: 'Composite indexes banao jo actual query patterns match karein. pg_stat_user_indexes se unused indexes regularly remove karo.',
            },
            {
              mistake: 'LIKE %keyword% ke liye regular B-tree index banana',
              why: "LIKE '%keyword%' (leading wildcard) B-tree index use nahi kar sakta — full scan hoga.",
              fix: 'Full-text search ke liye: GIN index + tsvector. Ya Elasticsearch/Meilisearch. LIKE prefix (keyword%) B-tree se kaam karta hai.',
            },
          ]}
          proTip="INCLUDE clause ek superpower hai jise 90% developers nahi jaante: CREATE INDEX idx_covering ON orders(user_id, status) INCLUDE (total_amount, created_at). user_id aur status index structure mein hain — WHERE ke liye. total_amount aur created_at INCLUDE mein hain — index search affect nahi karte, lekin Index Only Scan ke waqt table ko chhua bina available hain. Table access zero. Isko covering index kehte hain — query poori index se serve hoti hai."
        />
      </div>

      <div id="n-plus-one">
        <ConceptCard
          title="N+1 Problem — Database Ka Silent Killer"
          emoji="🐌"
          difficulty="intermediate"
          whatIsIt="N+1 problem development mein ek chhupa hua bomb hai — development mein 10 records pe sab theek lagta hai, production mein 10,000 records pe application timeout. Kya hota hai under the hood: 50 posts fetch karo (1 query), phir har post ke liye author fetch karo (50 queries) = 51 queries. Har query ka overhead: TCP connection reuse, query parse, execution plan, result serialize — 50 baar. ORM ne silently ye kar diya — aapko pata hi nahi chala. Database ke liye 51 round trips = shooting yourself in the foot. JOIN se same kaam 1 query mein hota hai — 51x less database work."
          whenToUse={[
            'Koi bhi related data load karna ho (posts + authors, orders + items)',
            'GraphQL resolvers — DataLoader almost always zaroori hai',
            'API endpoints jo lists return karte hain with nested data',
            'Performance investigation — query count check karo hamesha',
          ]}
          whyUseIt="Sabse pehla kaam: logging enable karo. Prisma mein log: ['query'] lagao, console mein dekho kitni queries fire ho rahi hain. Agar koi simple list endpoint 50 queries fire kar raha hai — bhai N+1 hai. Ye fix karna mandatory hai production se pehle. include se Prisma ek JOIN query generate karta hai — N queries ki jagah 1. DataLoader pattern GraphQL mein gold standard hai — multiple resolver calls ko ek batch mein combine karta hai. Ye 'batching' concept samjhna bahut important hai distributed systems mein bhi."
          howToUse={{
            filename: 'n-plus-one-fix.ts',
            language: 'typescript',
            code: `// ❌ N+1 Problem — 1 + N queries
async function getPostsFeedBAD() {
  const posts = await prisma.post.findMany({ take: 50 })
  // 1 query above ↑

  return Promise.all(posts.map(async (post) => {
    const author = await prisma.user.findUnique({
      where: { id: post.authorId }
    })
    // ↑ 50 separate queries! = 51 total queries
    return { ...post, author }
  }))
}

// ✅ Fix 1: Prisma include — 1 JOIN query
async function getPostsFeedGOOD() {
  return prisma.post.findMany({
    take: 50,
    include: {
      author: { select: { id: true, name: true, avatar: true } }
    }
  })
  // 1 query with JOIN — 50x faster!
}

// ✅ Fix 2: Manual batching — 2 queries
async function getPostsFeedBATCH() {
  const posts = await prisma.post.findMany({ take: 50 })
  const authorIds = [...new Set(posts.map(p => p.authorId))]

  const authors = await prisma.user.findMany({
    where: { id: { in: authorIds } },
    select: { id: true, name: true, avatar: true }
  })

  const authorMap = new Map(authors.map(a => [a.id, a]))
  return posts.map(p => ({ ...p, author: authorMap.get(p.authorId) }))
  // 2 queries total — any scale pe works
}

// ✅ Fix 3: DataLoader (GraphQL mein standard)
import DataLoader from 'dataloader'

const userLoader = new DataLoader(async (ids: readonly string[]) => {
  const users = await prisma.user.findMany({
    where: { id: { in: [...ids] } }
  })
  const userMap = new Map(users.map(u => [u.id, u]))
  // Same order maintain karo — DataLoader requirement!
  return ids.map(id => userMap.get(id) ?? null)
})

// Multiple resolvers ek hi batch mein load honge
const author = await userLoader.load(post.authorId)

// ✅ Fix 4: SQL JOIN directly
const result = await prisma.$queryRaw\`
  SELECT p.*, u.name as author_name, u.avatar as author_avatar
  FROM posts p
  JOIN users u ON u.id = p.author_id
  ORDER BY p.created_at DESC
  LIMIT 50
\``,
            explanation: "include fix #1 — Prisma automatically JOIN query generate karta hai, N+1 khatam. Fix #2 batching: pehle sab IDs nikalo, phir ek IN query mein sab fetch karo, phir Map se join karo — ye manual JOIN hai application level pe, 2 queries. DataLoader fix #3 GraphQL ke liye — request ke andar sab load() calls batch hoti hain, ek round-trip. Raw SQL fix #4 ultimate control — complex aggregations ke liye. Konsa use karo? include simple hai, batching zyada flexible, DataLoader GraphQL ke liye mandatory jaise hain.",
          }}
          realWorldScenario="Social media feed banate ho — 50 posts, har post ka author, har post ka like count. Naive code likhte ho: 1 + 50 + 50 = 101 queries. Tum socho '101 queries? Zyada kya? Sab async hain.' Aur phir production mein user complain karta hai feed load hone mein 4 second lag rahe hain. include + _count use karo: 2-3 queries, 40ms. 100x improvement. Bounce rate kam hota hai — directly revenue impact hai. N+1 fix karna feature nahi hai — ye aapki duty hai."
          commonMistakes={[
            {
              mistake: 'Development mein query logging disable rakhna',
              why: 'N+1 silently develop hoti hai — feature add hoti hai, queries accumulate hoti hain, tab pata chalta hai production mein crash hone par.',
              fix: 'Prisma: log: [\'query\'] development mein hamesha on. Query count 10 se zyada dikh rahi hai toh investigate karo immediately.',
            },
            {
              mistake: 'include har jagah eagerly add karna "safe side" ke liye',
              why: 'Over-fetching — unnecessary data, heavy queries, big payloads. Agar user sirf post titles chahiye toh author data include karna waste hai.',
              fix: 'Har endpoint ke liye specific select/include pattern define karo. Sirf wahi fetch karo jo is request ke liye actually chahiye.',
            },
          ]}
          proTip="Ek aur powerful trick: prisma.$transaction([query1, query2, query3]) — teeno queries ek single database round-trip mein execute hoti hain. Dashboard mein 5 alag counts chahiye? $transaction mein daal do — 5 queries ki network latency ki jagah 1 round-trip. Ye parallel execution hai transaction wrapper ke andar. Complex dashboards ke liye ye pattern game-changer hai."
        />
      </div>

      <div id="covering-indexes">
        <ConceptCard
          title="Covering Indexes — Table Access Skip Karo"
          emoji="🎯"
          difficulty="advanced"
          whatIsIt="Covering index ka concept samajhna hai toh ye sochiye: regular index ek library catalog hai — book ka location batata hai, phir jaake shelf se book uthao. Covering index mein catalog ke saath book ka poora content bhi hai — shelf pe jaane ki zaroorat hi nahi. Under the hood: PostgreSQL mein table data 'heap' mein store hota hai. Normal index scan: index pages read karo (fast), phir heap pages read karo (slow, random I/O). Index Only Scan: sirf index pages — heap bilkul nahi. Heap Fetches: 0 dikhna matlab 'table ko chhua hi nahi'. Large tables pe 10-100x improvement possible hai."
          whenToUse={[
            'High-frequency read queries jo specific columns select karein',
            'Reports aur analytics — aggregations pe covering index',
            'API list endpoints — predictable column access pattern',
            'Hot tables jahan table pages cache mein fit na hon',
          ]}
          whyUseIt="Sawaal: index hai toh bhi slow kyun? Kyunki index ne row locate kar liya — ab heap pe random I/O hogi actual data lene ke liye. Har row ke liye alag disk page fetch ho sakta hai — 45,000 random reads = slow. Covering index isse eliminate karta hai. INCLUDE clause smart hai — ye columns B-tree structure mein participate nahi karte (WHERE mein use nahi hote) lekin Index Only Scan ke liye stored hain. Index size unnecessarily nahi badhta. Result: same storage size, dramatically better read performance."
          howToUse={{
            filename: 'covering-index.sql',
            language: 'sql',
            code: `-- Scenario: User list API
-- Query: SELECT id, name, email FROM users WHERE status = 'active' ORDER BY name

-- ❌ Regular index — table access required
CREATE INDEX idx_status ON users(status);

EXPLAIN ANALYZE
SELECT id, name, email FROM users WHERE status = 'active' ORDER BY name;
-- Index Scan using idx_status on users
-- Heap Fetches: 45000   ← 45K table rows bhi read kiye!
-- Execution Time: 120ms

-- ✅ Covering index — no table access!
CREATE INDEX idx_covering_users
ON users(status, name)
INCLUDE (id, email);
-- status: WHERE condition
-- name: ORDER BY (already sorted in index)
-- id, email: INCLUDE — available without table access

EXPLAIN ANALYZE
SELECT id, name, email FROM users WHERE status = 'active' ORDER BY name;
-- Index Only Scan using idx_covering_users on users
-- Heap Fetches: 0   ← TABLE NAHI CHHUA!
-- Execution Time: 8ms   ← 15x FASTER!

-- Analytics covering index example
CREATE INDEX idx_orders_analytics
ON orders(created_at, status)
INCLUDE (total_amount, user_id);

-- Fast dashboard query:
SELECT
  DATE_TRUNC('day', created_at) as date,
  status,
  COUNT(*) as order_count,
  SUM(total_amount) as revenue
FROM orders
WHERE created_at > NOW() - INTERVAL '90 days'
GROUP BY 1, 2
-- Index Only Scan — no table touch

-- Check index usage:
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch,  -- 0 = Index Only Scan ho raha hai (!)
  pg_size_pretty(pg_relation_size(indexrelid)) as index_size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;`,
            explanation: "status aur name key columns hain — WHERE aur ORDER BY ke liye B-tree structure mein hain. id aur email INCLUDE mein hain — sirf 'paas mein rakh do' for fetch, structure affect nahi karta. Heap Fetches: 0 dekhna matlab covering index perfect kaam kar raha hai — table ko chhua hi nahi. Ye woh moment hai jab aap EXPLAIN ANALYZE chalate ho aur 120ms se 8ms dikhti hai — wo feeling ekdum alag hai!",
          }}
          realWorldScenario="Analytics dashboard jo har minute reload hota hai — 90 day revenue report, 2 million orders table. Covering index ke bina: har reload pe 2M rows scan, 800ms, users frustrated. Covering index banaya: sirf index pages, Heap Fetches: 0, 45ms. Dashboard smooth, users happy. Index ne 15MB extra disk liya — 15MB ke liye 18x speedup. Ye trade-off clearly worth it hai — aur ye woh decision hai jo senior engineers karte hain: measure karo, trade-offs samjho, phir implement karo."
          commonMistakes={[
            {
              mistake: 'INCLUDE mein too many columns dalna',
              why: 'Index size bahut bada ho jaata hai — memory mein fit nahi hota, I/O benefit lost hoti hai. Worse than no covering index.',
              fix: 'Sirf frequently accessed, high-value columns INCLUDE mein rakho. Har query ke liye alag covering index — one-size-fits-all nahi.',
            },
            {
              mistake: 'Visibility map outdated hone par Index Only Scan table access kar raha hai',
              why: 'PostgreSQL visibility map track karta hai konse pages mein saare rows visible hain. Agar outdated hai toh Index Only Scan bhi heap check karta hai.',
              fix: 'Regular VACUUM ensure karta hai visibility map up-to-date hai. autovacuum normally ye handle karta hai — check karo aggressive write tables mein enabled hai.',
            },
          ]}
          proTip="Covering index check karne ka quick way: pg_stat_user_indexes mein idx_tup_fetch column zero ya near-zero hona chahiye — wo number batata hai kitni baar table heap access hua index ke through. High number = covering index incomplete. Phir INCLUDE mein aur columns add karo. Aur ye bhi: regular VACUUM chalate raho — visibility map stale hone se Index Only Scan bhi heap check karta hai. autovacuum enabled raho write-heavy tables pe."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 7 Quiz — Query Optimization & Indexes
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — indexes master karo!
          </p>
        </div>
        <QuizSection questions={quiz} chapterSlug="db-query-optimization" />
      </div>
    </div>
  )
}
