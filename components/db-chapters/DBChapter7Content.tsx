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
          Slow database queries production mein sabse zyada user frustration ka cause hain. 10ms query aur 3000ms query ka difference mostly indexes aur query patterns mein hai — hardware mein nahi. EXPLAIN ANALYZE aapka best friend hai — ye exactly batata hai database kya kar raha hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein seekhenge kaise queries analyze karein, indexes kab aur kaise lagaein, N+1 problem detect aur fix karein, aur covering indexes se maximum performance nikaalein. Ye skills production databases ke liye essential hain.
        </p>
      </div>

      <div id="explain-analyze">
        <ConceptCard
          title="Query Execution Plan — EXPLAIN ANALYZE"
          emoji="🔬"
          difficulty="intermediate"
          whatIsIt="EXPLAIN ANALYZE SQL command hai jo query execution plan dikhata hai — database kaise query execute karega, kaunse indexes use karega, estimated vs actual rows, aur har operation ka time cost. Seq Scan = full table scan (slow for large tables). Index Scan = index use kar raha hai. Index Only Scan = table bhi nahi chhua (fastest). Ye tool bina guess kiye queries optimize karne deta hai."
          whenToUse={[
            'Query slow lag rahi ho — pehle EXPLAIN ANALYZE chalaao',
            'Index add karne se pehle — confirm karo ki needed hai',
            'Index add karne ke baad — verify karo ki use ho raha hai',
            'ORM-generated queries debug karne ke liye — actual SQL dekho',
          ]}
          whyUseIt="Without EXPLAIN ANALYZE, index optimization guesswork hai. Database query planner smart hai — sirf index banana kaafi nahi, planner ko use karna padega. Statistics stale hone par planner wrong decisions karta hai — ANALYZE tablename se stats update karo. Actual vs estimated rows mein bada gap = statistics problem."
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
            explanation: "cost=0.00..2840.00 matlab estimated cost (relative unit). actual time=14.532..28.941 = first row..last row in ms. rows=1 estimated, actual rows check karo — bada gap = stale statistics. ANALYZE users; command se statistics update karo. EXPLAIN ANALYZE query actually run karta hai — DELETE/UPDATE ke saath BEGIN + ROLLBACK use karo.",
          }}
          realWorldScenario="E-commerce app mein orders table pe slow query: SELECT * FROM orders WHERE user_id = $1 AND status = 'pending'. EXPLAIN dikhata hai Seq Scan 500K rows pe — 800ms. Composite index (user_id, status) add karne se Index Scan — 0.5ms. 1600x improvement. EXPLAIN ne exact bottleneck bataya."
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
          proTip="explain.depesz.com ya explain.dalibo.com pe EXPLAIN output paste karo — visual tree view milti hai color-coded nodes ke saath. Slowest nodes red highlight hote hain. Complex multi-table JOIN queries debug karna bahut easier ho jaata hai visually."
        />
      </div>

      <div id="composite-index">
        <ConceptCard
          title="Composite Index Column Order — Most Selective First"
          emoji="📊"
          difficulty="intermediate"
          whatIsIt="Composite index multiple columns par banta hai. Column order critical hai — index tabhi use hoga jab query mein leading columns present hon. Rule: Most selective column (highest unique values) pehle rakho. B-tree index range queries ke liye best hai (=, &lt;, &gt;, BETWEEN, LIKE prefix). Hash index sirf equality (=) ke liye — range queries support nahi karta."
          whenToUse={[
            'Multiple WHERE columns filter karein — composite index consider karo',
            'ORDER BY + WHERE combination — sort column include karo',
            'High-frequency queries — index optimization worth karta hai',
            'Foreign key columns — JOIN performance ke liye index zaroori',
          ]}
          whyUseIt="Wrong column order = index unused. Composite index (a, b) query WHERE b = 1 ke liye kaam nahi karega — leading column 'a' missing. Index selectivity: email (near-unique, high selectivity) vs gender (2 values, low selectivity). Low selectivity column index se fayda nahi — planner seq scan prefer karta hai."
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
            explanation: "B-tree default index type hai — 99% cases ke liye sahi. Hash sirf equality — token lookups, session IDs ke liye consider karo. Partial index powerful hai — WHERE condition se small focused index banao. Unused indexes WRITE performance slow karte hain aur space waste karte hain — regularly audit karo.",
          }}
          realWorldScenario="Multi-tenant SaaS mein: WHERE org_id = $1 AND created_at > $2 ORDER BY created_at DESC. Index (org_id, created_at) — org_id high selectivity (unique per tenant), created_at range query + sort. Ye order both filter aur sort dono handle karta hai — perfect covering index for this query pattern."
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
          proTip="INCLUDE clause se covering index banao without affecting column order: CREATE INDEX idx_covering ON orders(user_id, status) INCLUDE (total_amount, created_at). user_id, status index structure mein hain (searchable), total_amount, created_at Index Only Scan ke liye available hain bina table touch kiye."
        />
      </div>

      <div id="n-plus-one">
        <ConceptCard
          title="N+1 Problem — Database Ka Silent Killer"
          emoji="🐌"
          difficulty="intermediate"
          whatIsIt="N+1 problem: N records fetch karo, phir har record ke liye 1 extra query — N+1 total queries instead of 2. 100 posts fetch karo (1 query), phir 100 authors fetch karo (100 queries) = 101 queries. Database connection overhead, network latency, per-query overhead — sab multiply ho jaate hain. 10 records fast lagta hai, 10,000 records production crash karta hai."
          whenToUse={[
            'Koi bhi related data load karna ho (posts + authors, orders + items)',
            'GraphQL resolvers — DataLoader almost always zaroori hai',
            'API endpoints jo lists return karte hain with nested data',
            'Performance investigation — query count check karo hamesha',
          ]}
          whyUseIt="N+1 development mein invisible hota hai — 10 records fast hain. Production pe 10,000 records ke saath 10,001 queries = timeout. ORM ne silently N+1 create kar diya. Logging enable karo: Prisma mein log: ['query'], Mongoose mein mongoose.set('debug', true). Phir fix karo — include/populate/JOIN."
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
            explanation: "include sabse simple fix hai — Prisma automatically JOIN query generate karta hai. Batching (Fix 2) include se zyada control deta hai — useful jab relations complex hon. DataLoader GraphQL ke liye designed hai — request mein sab loads batch karta hai, caches karta hai. Raw SQL ultimate control ke liye.",
          }}
          realWorldScenario="Social media feed: 50 posts, har post ka author, har post ka like count, har author ka follower count. Naive implementation: 1 + 50 + 50 + 50 = 151 queries. include + _count: 2-3 queries. 50x improvement, 2000ms se 40ms. Users ka bounce rate dramatically kam hota hai."
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
          proTip="Prisma mein $transaction ke andar multiple queries aur phir programmatic batching combine karo complex dashboards ke liye. prisma.$transaction([query1, query2, query3]) — teeno queries ek database round-trip mein execute hoti hain. Network latency dramatically reduce hoti hai."
        />
      </div>

      <div id="covering-indexes">
        <ConceptCard
          title="Covering Indexes — Table Access Skip Karo"
          emoji="🎯"
          difficulty="advanced"
          whatIsIt="Covering index wo index hai jisme query ke saare required columns stored hain — database ko table (heap) access karne ki zaroorat nahi. Ye 'Index Only Scan' enable karta hai — sirf index pages read hote hain. Table data pages skip hoti hain — I/O dramatically kam hota hai. Large tables par covering index 10-100x performance improvement de sakta hai."
          whenToUse={[
            'High-frequency read queries jo specific columns select karein',
            'Reports aur analytics — aggregations pe covering index',
            'API list endpoints — predictable column access pattern',
            'Hot tables jahan table pages cache mein fit na hon',
          ]}
          whyUseIt="Regular index se bhi table rows fetch karne padte hain (heap access) — extra I/O. Covering index se sirf index pages read hoti hain — table bilkul nahi. PostgreSQL mein INCLUDE clause se non-key columns add karo bina index structure affect kiye. MySQL mein composite index ke columns automatically covering ban jaate hain agar query mein saare hon."
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
            explanation: "INCLUDE columns index search mein participate nahi karte (WHERE mein use nahi hote) lekin Index Only Scan ke liye available hain. Isse index size unnecessarily bada nahi hota. status, name key columns hain (search + sort), id, email INCLUDE mein hain (sirf fetch ke liye). Heap Fetches: 0 = perfect covering index.",
          }}
          realWorldScenario="Analytics dashboard jo har minute reload hota hai — 90 day revenue report. Covering index ke bina: 2M orders table scan, 800ms. Covering index ke saath: sirf index pages, 45ms. Dashboard fast dikhta hai — users zyada engaged rehte hain. Index size: 15MB extra space — completely worth it."
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
          proTip="pg_stat_user_indexes mein idx_tup_fetch column dekho — ye 0 ya very low hone chahiye covering index ke saath (Index Only Scans). Agar high hai toh covering index incomplete hai — INCLUDE mein aur columns add karo ya query pattern check karo."
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
