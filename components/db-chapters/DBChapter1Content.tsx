'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const dbOverviewQuiz: QuizQuestion[] = [
  {
    question: 'ACID mein "A" (Atomicity) ka kya matlab hai?',
    options: [
      { text: 'Transaction fast honi chahiye', correct: false, explanation: 'Speed ACID ka part nahi hai.' },
      { text: 'Ya poori transaction complete ho ya kuch bhi nahi ho — partial update allowed nahi', correct: true, explanation: 'Sahi! Bank transfer example: agar ek account se deduct hua lekin doosre mein credit nahi hua — dono revert ho jaate hain. Ya sab ya kuch nahi.' },
      { text: 'Data hamesha encrypted hona chahiye', correct: false, explanation: 'Encryption ACID ka part nahi hai.' },
      { text: 'Database automatically backup leta hai', correct: false, explanation: 'Backup ACID property nahi hai.' },
    ],
  },
  {
    question: 'Kaunsa use case ke liye MongoDB zyada suitable hai?',
    options: [
      { text: 'Bank transactions aur financial records', correct: false, explanation: 'Financial data ke liye ACID transactions zaroori hain — PostgreSQL better choice hai.' },
      { text: 'E-commerce ke complex order-product-user relationships', correct: false, explanation: 'Complex relationships ke liye relational DB better hai.' },
      { text: 'IoT sensor data — high write volume, flexible schema', correct: true, explanation: 'Sahi! MongoDB high write throughput aur flexible schema ke liye perfect hai — IoT data ka structure vary karta hai.' },
      { text: 'Multi-tenant SaaS billing system', correct: false, explanation: 'Billing mein ACID transactions aur relationships zaroori hain — PostgreSQL better.' },
    ],
  },
  {
    question: 'Database schema kya hota hai?',
    options: [
      { text: 'Database ka backup file', correct: false, explanation: 'Schema backup nahi hai.' },
      { text: 'Tables, columns, data types aur constraints ka structure — database ka blueprint', correct: true, explanation: 'Sahi! Schema define karta hai ki data kaise store hoga — table names, column types, primary keys, foreign keys, indexes sab schema ka part hain.' },
      { text: 'Database ka password', correct: false, explanation: 'Schema security credential nahi hai.' },
      { text: 'SQL query likhne ka style', correct: false, explanation: 'Schema structure definition hai, query style nahi.' },
    ],
  },
  {
    question: 'ACID mein "D" (Durability) ka matlab kya hai?',
    options: [
      { text: 'Database kabhi crash nahi hoga', correct: false, explanation: 'Durability crash prevention nahi hai.' },
      { text: 'Queries fast chalti hain', correct: false, explanation: 'Speed durability nahi hai.' },
      { text: 'Ek baar committed data permanent hai — power failure ke baad bhi', correct: true, explanation: 'Sahi! COMMIT ke baad data disk pe persist ho jaata hai. Server crash ya power cut ke baad bhi data safe rehta hai.' },
      { text: 'Database zyada users handle kar sakta hai', correct: false, explanation: 'Scalability alag concept hai.' },
    ],
  },
]

export default function DBChapter1Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Databases Ka Overview — SQL se NoSQL Tak
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Database choose karna — ye decision ek baar galat ho gayi toh production mein migrate karna BAHUT costly hai. Netflix ne MySQL se CockroachDB migrate kiya — 2 saal lage! Pehle sahi choose karo. PostgreSQL, MySQL, MongoDB, Redis — har ek ke apne strengths hain, aur ye strengths tab kaam aate hain jab aap unhe sahi jagah use karo.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Sawaal ye nahi ki "kaunsa database best hai" — sawaal ye hai ki "mere use case ke liye kaunsa sahi hai?" Is chapter mein hum SQL vs NoSQL ka real difference samjhenge, ACID properties kyun zaroori hain — ek bank transfer example se, relational model ka math samjhenge, aur ye decide karna seekhenge ki aapke project ke liye kaunsa database choose karo.
        </p>
      </div>

      <div id="sql-vs-nosql">
        <ConceptCard
          title="SQL vs NoSQL — Kab Kya?"
          emoji="⚖️"
          difficulty="beginner"
          whatIsIt="Sawaal: SQL aur NoSQL mein real difference kya hai? SQL databases (PostgreSQL, MySQL) data ko tables mein store karte hain — rows, columns, fixed schema, relationships, ACID transactions. Ye set theory aur relational algebra pe based hai — pure maths! NoSQL databases (MongoDB, Redis, Cassandra) flexible structure use karte hain — documents, key-value, graphs. Rule simple hai: SQL structured relational data ke liye, NoSQL specific scale ya flexibility problems ke liye."
          whenToUse={[
            'SQL: Structured data jahan relationships important ho — users, orders, products',
            'SQL: Financial data — ACID transactions mandatory hain',
            'SQL: Complex queries chahiye — JOINs, GROUP BY, window functions',
            'NoSQL (MongoDB): Flexible schema chahiye — content, catalogs, varying attributes',
            'NoSQL (Redis): Caching, sessions, real-time leaderboards — in-memory speed',
            'NoSQL (Cassandra/DynamoDB): Massive scale, high write throughput — IoT, logs',
          ]}
          whyUseIt="Ye decision production mein bahut costly hoti hai agar galat ho — isliye pehle samjho. Wrong database choice ka matlab hai: terabytes data migrate karna, months ka kaam, aur production downtime ka risk. SQL ka schema enforcement ek guard ki tarah kaam karta hai — invalid data save hi nahi hogi, bug early pakda jaayega. NoSQL horizontal scaling easy deta hai — commodity servers add karo, scale badhao. Lekin sabse powerful approach hai polyglot persistence — ek hi app mein PostgreSQL + Redis dono use karo, har ek apna kaam kare."
          howToUse={{
            filename: 'sql-vs-nosql-comparison.md',
            language: 'bash',
            code: `# ── SQL DATABASES ────────────────────────────────────────────────
# PostgreSQL — Best overall SQL database
✅ ACID transactions (critical for financial data)
✅ Complex JOINs, window functions, CTEs
✅ JSONB support (best of both worlds)
✅ Row-level security, schemas per tenant
✅ Extensions: PostGIS (geo), pgvector (AI embeddings)
Use: E-commerce, SaaS, financial apps, APIs

# MySQL — Popular, widely supported
✅ High read performance, mature ecosystem
✅ Used by Twitter, Facebook (historically)
⚠️  Fewer advanced features than PostgreSQL
Use: Web apps, WordPress, legacy systems

# ── NoSQL DATABASES ──────────────────────────────────────────────
# MongoDB — Document database
✅ Flexible JSON-like documents (BSON)
✅ Horizontal sharding, replica sets
✅ Aggregation pipeline (powerful analytics)
⚠️  No true JOINs (use $lookup — slower)
Use: Content management, catalogs, mobile backends

# Redis — In-memory key-value store
✅ Microsecond latency — fastest database
✅ Data structures: strings, lists, sets, sorted sets, hashes
✅ Pub/Sub, Streams, Lua scripting
⚠️  Data fits in RAM — not for large datasets
Use: Caching, sessions, rate limiting, leaderboards, queues

# ── DECISION GUIDE ────────────────────────────────────────────────
# Choose PostgreSQL when:
  → Relationships between entities
  → Transactions critical (money, inventory)
  → Complex reporting queries
  → Team knows SQL

# Choose MongoDB when:
  → Document-like data (blog posts, products with varying fields)
  → High write throughput needed
  → Schema changes frequently during development

# Choose Redis when:
  → Need sub-millisecond response
  → Caching expensive DB queries
  → Session storage, rate limiting`,
            explanation: "PostgreSQL zyada cases mein best choice hai — SQL ki power aur JSONB ki flexibility ek jagah milti hai. MongoDB sirf specific use cases mein shine karta hai — genuinely document-oriented data. Redis almost hamesha secondary database hai, caching layer ki tarah. Ek app mein PostgreSQL + Redis combination = industry ka most battle-tested pattern.",
          }}
          realWorldScenario="Ek food delivery app ka real architecture socho: Users, restaurants, orders, payments — PostgreSQL kyunki yahan relationships hain aur transactions zaroori hain. Restaurant menus (dishes vary karte hain — pizza ke toppings, biryani ke variants) — MongoDB kyunki schema flexible chahiye. Active sessions, OTP codes — Redis kyunki millisecond latency chahiye aur auto-expiry TTL free mein milti hai. Teen problems, teen databases, teen different tools."
          commonMistakes={[
            {
              mistake: 'MongoDB choose karna sirf isliye ki "flexible hai"',
              why: 'Flexibility ka matlab ye nahi ki MongoDB hamesha better hai. Agar data relational hai, MongoDB mein manual $lookup (JOIN equivalent) slow aur complex hota hai.',
              fix: 'Data relationships map karo pehle. Agar entities ek doosre se connected hain aur saath query hoti hain — SQL choose karo. Genuinely document-like data ke liye MongoDB.',
            },
            {
              mistake: 'Redis ko primary database ki tarah use karna',
              why: 'Redis in-memory hai — server restart par data lost ho sakta hai (persistence configure karna padta hai). RAM expensive hai — large datasets fit nahi hote.',
              fix: 'Redis ko caching layer ki tarah use karo. Primary data PostgreSQL/MongoDB mein rakho, frequently accessed data Redis mein cache karo.',
            },
          ]}
          proTip="Pro tip jo 90% devs miss karte hain: PostgreSQL JSONB column support karta hai — structured + flexible dono ek hi database mein! Users table mein proper columns rakho (id, email, name), aur ek metadata JSONB column add karo flexible attributes ke liye. Matlab na MongoDB chahiye, na schema migration — best of both worlds. 90% projects ke liye PostgreSQL alone kaafi hai — NoSQL ki zaroorat pehle justify karo, phir add karo."
        />
      </div>

      <div id="acid-properties">
        <ConceptCard
          title="ACID Properties — Transaction Ka Backbone"
          emoji="🔒"
          difficulty="intermediate"
          whatIsIt="ACID — Atomicity, Consistency, Isolation, Durability. Ye char properties database transactions ko bulletproof banati hain. Ek second ke liye socho: bank transfer mein ek account se Rs 5000 deduct ho gaye, phir exactly us moment server crash ho gaya — doosre account mein credit nahi hua. Bina ACID ke yahi hoga. Atomicity ensure karta hai: ya poora transaction hoga, ya bilkul nahi. PostgreSQL full ACID hai. MongoDB 4.0+ mein multi-document transactions aaye — lekin complex hain aur overhead hai."
          whenToUse={[
            'Financial transactions — paise transfer, payments, billing',
            'Inventory management — stock levels accurate hone chahiye',
            'User authentication — concurrent login attempts safe hone chahiye',
            'Order processing — order create + inventory decrement atomic hona chahiye',
            'Any operation jahan partial failure data corrupt kar de',
          ]}
          whyUseIt="ACID ke bina concurrent transactions race conditions create karte hain — aur ye bugs production mein sirf tab dikhte hain jab traffic zyada hoti hai! Do users ek hi seat book kar lete hain, bank balance negative ho jaata hai — sab real production disasters hain. Isolation levels ek dial ki tarah hain: stricter isolation = more consistent data = slower performance. Ye tradeoff samajhna engineer ka kaam hai — blindly highest isolation mat lagao."
          howToUse={{
            filename: 'acid-demo.sql',
            language: 'sql',
            code: `-- ── ATOMICITY — Ya sab ho ya kuch nahi ──────────────────────────
BEGIN;
  UPDATE accounts SET balance = balance - 5000 WHERE id = 1;
  UPDATE accounts SET balance = balance + 5000 WHERE id = 2;
  -- Agar doosra UPDATE fail ho toh dono revert ho jaate hain
COMMIT;
-- Agar error aaye:
ROLLBACK; -- Sab undo ho jaata hai

-- ── CONSISTENCY — Valid state se valid state ─────────────────────
ALTER TABLE accounts ADD CONSTRAINT balance_positive
  CHECK (balance >= 0);
-- Ye constraint ensure karta hai balance kabhi negative nahi hoga
-- ACID consistency = constraints hamesha satisfy hote hain

-- ── ISOLATION — Concurrent transactions interfere nahi karte ─────
-- Isolation Levels (strictness increasing order):
-- READ UNCOMMITTED — dirty reads possible (avoid karo)
-- READ COMMITTED   — default PostgreSQL — safe
-- REPEATABLE READ  — same query same result (same transaction mein)
-- SERIALIZABLE     — strictest — transactions ek ke baad ek run hote hain

SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN;
  SELECT balance FROM accounts WHERE id = 1; -- 10000
  -- Koi aur transaction balance change kare...
  SELECT balance FROM accounts WHERE id = 1; -- Still 10000 (repeatable)
COMMIT;

-- ── DURABILITY — Committed data permanent hai ─────────────────────
BEGIN;
  INSERT INTO orders (user_id, total) VALUES (42, 999.00);
COMMIT;
-- Ab server crash ho jaaye, power cut ho — ye order saved rahega
-- WAL (Write-Ahead Log) ensure karta hai durability
-- PostgreSQL disk pe write karta hai COMMIT se pehle

-- ── Practical transaction example ────────────────────────────────
CREATE OR REPLACE FUNCTION transfer_money(
  from_account INT,
  to_account INT,
  amount DECIMAL
) RETURNS void AS $$
BEGIN
  UPDATE accounts SET balance = balance - amount
    WHERE id = from_account AND balance >= amount;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient balance ya account nahi mila';
  END IF;

  UPDATE accounts SET balance = balance + amount
    WHERE id = to_account;
END;
$$ LANGUAGE plpgsql;`,
            explanation: "BEGIN...COMMIT transaction block hai — engine ke liye signal hai 'ye sab ek unit hai.' Error aane par ROLLBACK se sab kuch undo hota hai, jaise kuch hua hi nahi. Isolation levels engine ke under chhupe knobs hain — default READ COMMITTED 90% cases ke liye kaafi hai. SERIALIZABLE highest isolation hai, performance impact hota hai — sirf financial systems jaise critical places pe use karo.",
          }}
          realWorldScenario="Socho BookMyShow pe last ticket — 100 log ek saath book karne ki koshish kar rahe hain. Bina ACID ke sab 100 ko confirmation milega, aur phir physical seat kahan se aayegi? ACID + SERIALIZABLE isolation se database ensure karta hai sirf ek successful booking hogi, baaki sab ko 'seat unavailable' — ye sab database engine handle karta hai, tum application code mein manually race condition solve nahi karte. Ye ACID ki real power hai."
          commonMistakes={[
            {
              mistake: 'Long-running transactions open chhodna',
              why: 'Transaction open rakhna locks hold karta hai — doosre queries wait karte hain. Database performance drastically down hoti hai.',
              fix: 'Transactions short rakhno — sirf zaroori operations include karo. BEGIN se COMMIT ke beech network calls, file operations mat karo.',
            },
            {
              mistake: 'ROLLBACK bhoolna error handling mein',
              why: 'Exception handle karo lekin ROLLBACK nahi kiya toh transaction open rehta hai aur resources lock rehte hain.',
              fix: 'Try-catch-finally pattern: try { BEGIN; /* operations */; COMMIT; } catch { ROLLBACK; } pattern hamesha follow karo.',
            },
          ]}
          proTip="Underrated feature: PostgreSQL mein SAVEPOINT se partial rollback possible hai — poori transaction rollback nahi karni. SAVEPOINT sp1; kuch kaam karo; ROLLBACK TO sp1; — sirf sp1 ke baad ka kaam undo hoga, baaki transaction intact rahegi. Complex multi-step transactions mein ye game changer hai — galti pe puri mehnat waste nahi hoti."
        />
      </div>

      <div id="relational-model">
        <ConceptCard
          title="Relational Model — Tables, Rows, Columns"
          emoji="📊"
          difficulty="beginner"
          whatIsIt="SQL sirf ek query language nahi — ye ek MATH hai! Relational Algebra pe based hai. Relational model data ko tables (relations) mein organize karta hai — aur ye 1970 mein Edgar Codd ne define kiya, aaj bhi dominant hai. Table = ek entity type (users, products). Row = ek record. Column = ek attribute. Primary key har row ko uniquely identify karta hai. Foreign key doosri table se relationship banata hai. Schema = database ka blueprint — structure, constraints, relationships sab define karo ek baar."
          whenToUse={[
            'Jab data clearly entities mein organize ho sakta ho',
            'Entities ke beech relationships ho — user has many orders',
            'Data integrity constraints zaroori ho — email unique, balance positive',
            'Complex queries aur reporting chahiye',
            'Multiple teams ek database share karein — well-defined structure needed',
          ]}
          whyUseIt="Relational model 50+ saal purana hai lekin aaj bhi dominant kyunki — maths jhootha nahi hota. SQL declarative hai — tum sirf batao 'kya chahiye,' database engine khud decide karta hai 'kaise laana hai.' Query planner ke andar ek optimizer hota hai jo best execution plan choose karta hai — tum index lagao, wo automatically use karega. Normalization se data duplication khatam hoti hai. Constraints application se independent data validation dete hain — database pe directly koi galat data daale toh bhi fail hoga."
          howToUse={{
            filename: 'relational-schema.sql',
            language: 'sql',
            code: `-- ── TABLE CREATION ────────────────────────────────────────────────
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,        -- Auto-increment integer PK
  email      VARCHAR(255) UNIQUE NOT NULL,
  name       VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_active  BOOLEAN DEFAULT true
);

CREATE TABLE categories (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  price       DECIMAL(10, 2) NOT NULL CHECK (price > 0), -- Constraint
  stock       INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  category_id INT REFERENCES categories(id) ON DELETE SET NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id         SERIAL PRIMARY KEY,
  user_id    INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status     VARCHAR(50) DEFAULT 'pending',
  total      DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
  id         SERIAL PRIMARY KEY,
  order_id   INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT NOT NULL REFERENCES products(id),
  quantity   INT NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10, 2) NOT NULL -- Price at time of order
);

-- ── BASIC QUERIES ─────────────────────────────────────────────────
-- Ek user ke sab orders
SELECT o.id, o.status, o.total, o.created_at
FROM orders o
WHERE o.user_id = 42
ORDER BY o.created_at DESC;

-- Order ke items with product details
SELECT oi.quantity, oi.unit_price, p.name as product_name,
       (oi.quantity * oi.unit_price) as line_total
FROM order_items oi
JOIN products p ON oi.product_id = p.id
WHERE oi.order_id = 100;

-- Data types quick reference
-- INT, BIGINT — integers
-- DECIMAL(p,s), NUMERIC — exact decimals (money ke liye)
-- VARCHAR(n), TEXT — strings
-- BOOLEAN — true/false
-- DATE, TIME, TIMESTAMP — date/time
-- UUID — globally unique identifier
-- JSONB — flexible JSON storage`,
            explanation: "PRIMARY KEY = database ka police officer — duplicate allowed nahi. FOREIGN KEY REFERENCES doosri table ka ID link karta hai — relational model ki jaan. ON DELETE CASCADE matlab parent delete ho toh children bhi automatically delete. ON DELETE SET NULL matlab parent delete ho toh FK null ho jaaye — orphan records nahi bante. CHECK constraints application bypass karke bhi data corrupt nahi kar sakta. SERIAL PostgreSQL ka auto-increment magic hai.",
          }}
          realWorldScenario="Flipkart jaisi e-commerce app ka core schema sirf 4 tables mein fit hota hai: Users (id, email, name), Products (id, name, price, stock, category_id), Orders (id, user_id, total, status), OrderItems (order_id, product_id, quantity, unit_price). Relationships foreign keys se clear hain — user_id, category_id, product_id. Queries predictable hain, data consistent hai. Ye relational model ki simplicity aur power hai — 4 tables, puri duniya."
          commonMistakes={[
            {
              mistake: 'Sab kuch ek table mein rakhna (flat structure)',
              why: 'Ek order table mein user_name, user_email, product_name sab duplicate hota hai. User ka email change karo — 1000 order rows update karne padte hain.',
              fix: 'Normalize karo — separate tables, foreign keys se link karo. Data ek jagah update hota hai, sab jagah reflect hota hai.',
            },
            {
              mistake: 'Primary key ke liye auto-increment integer rely karna hamesha',
              why: 'Distributed systems mein multiple servers ek hi ID generate kar sakte hain. Security issue bhi hai — ID expose se total records count pata chalta hai.',
              fix: 'UUID use karo public-facing IDs ke liye — gen_random_uuid(). Internal tables ke liye SERIAL theek hai.',
            },
          ]}
          proTip={'Auto-increment integer IDs expose mat karo public-facing APIs mein — user /users/1, /users/2 dekh ke total user count estimate kar sakta hai (competitor intelligence!). UUID use karo: PostgreSQL 13+ mein gen_random_uuid() built-in hai — CREATE EXTENSION bhi nahi chahiye. id UUID PRIMARY KEY DEFAULT gen_random_uuid(). Internal tables ke liye SERIAL theek hai — public URLs mein UUID.'}
        />
      </div>

      <div id="popular-databases">
        <ConceptCard
          title="Popular Databases Comparison"
          emoji="🗄️"
          difficulty="beginner"
          whatIsIt="Market mein hazaron databases hain — DynamoDB, CockroachDB, EdgeDB, TiDB — infinite options. Lekin real-world mein 4-5 choices se 95% problems solve hoti hain. PostgreSQL — feature-rich SQL, default best choice. MySQL — simple, widely hosted, legacy systems. MongoDB — document store, flexible schema. Redis — in-memory speed, caching aur queues. SQLite — embedded, no server needed. Har database ek specific problem ke liye optimize hai — tool choose karo problem dekh ke, hype dekh ke nahi."
          whenToUse={[
            'PostgreSQL: Default choice for new projects — most versatile',
            'MySQL: Existing team familiar hai, hosting par available hai',
            'MongoDB: Genuinely document-oriented data, flexible schema needed',
            'Redis: Caching, sessions, pub/sub, rate limiting',
            'SQLite: Mobile apps, development/testing, embedded applications',
            'Elasticsearch: Full-text search, log analytics (ELK stack)',
          ]}
          whyUseIt="Ek carpenter ke paas sirf hammer nahi hota — screwdriver, drill, saw sab hote hain. Database bhi aisi hi tool belt hai. PostgreSQL versatile hai lekin Redis ki microsecond latency nahi de sakta. Elasticsearch full-text search ke liye PostgreSQL se 10x better hai. Production system mein multiple databases ka combination — polyglot persistence — ye beginners ko complex lagta hai, lekin experienced engineers ka default approach hai. Har database apna kaam, apni jagah."
          howToUse={{
            filename: 'databases-comparison-table.md',
            language: 'bash',
            code: `┌─────────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│   Feature       │ PostgreSQL   │   MongoDB    │    Redis     │   SQLite     │
├─────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Type            │ SQL/Relational│ Document    │ Key-Value    │ SQL/Embedded │
│ Schema          │ Strict       │ Flexible     │ None (keys)  │ Strict       │
│ ACID            │ Full         │ Single-doc   │ Limited      │ Full         │
│ Joins           │ Full JOINs   │ $lookup only │ No           │ Full JOINs   │
│ Scaling         │ Vertical/Read│ Horizontal   │ Cluster      │ Single file  │
│ Performance     │ Good         │ Good         │ Fastest      │ Fast (local) │
│ Use Case        │ General apps │ Docs/Catalog │ Cache/Queue  │ Mobile/Tests │
│ Cloud Options   │ RDS, Supabase│ Atlas        │ ElastiCache  │ Embedded     │
│ Free Tier       │ Supabase     │ Atlas 512MB  │ Upstash      │ Always free  │
├─────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Best For        │ 90% projects │ Flexible data│ Speed layer  │ Dev/Mobile   │
└─────────────────┴──────────────┴──────────────┴──────────────┴──────────────┘

# Common Stack Combinations:
# Startup Standard:     PostgreSQL + Redis
# Content Platform:     MongoDB + Redis + Elasticsearch
# High-Scale:           Cassandra + Redis + PostgreSQL (analytics)
# Serverless:           PlanetScale (MySQL) + Upstash Redis

# Managed Services (Cloud hosted, no ops):
# PostgreSQL: Supabase (generous free tier), Neon, AWS RDS
# MongoDB:    MongoDB Atlas (free 512MB), AWS DocumentDB
# Redis:      Upstash (serverless, free tier), AWS ElastiCache
# SQLite:     Turso (distributed SQLite), Cloudflare D1`,
            explanation: "Managed services use karo — database administration ek poora career hai, usmein mat ghuso jab tak zaroorat na ho. Supabase PostgreSQL ke liye excellent free tier deta hai — sath mein Auth, Storage, aur Edge Functions free mein. MongoDB Atlas free 512MB project start karne ke liye kaafi hai. Upstash Redis serverless apps ke liye best — per-request pricing, zero ops.",
          }}
          realWorldScenario="WhatsApp ka architecture dekho: Messages — Erlang + Mnesia (custom built). User data — MySQL. Media — separate object storage. Notifications — Redis. Analytics — custom pipeline. Ek billion users ke liye ek database nahi chalta. Lekin ye mat socho tum bhi pehle din se itna complex banao — aapke startup ke liye PostgreSQL + Redis = probably enough for first million users. Premature optimization is the root of all evil."
          commonMistakes={[
            {
              mistake: 'FOMO se latest database choose karna',
              why: 'Hype-driven decisions — CockroachDB, PlanetScale, EdgeDB — cool hain lekin community smaller hai, documentation kam hai, debugging harder hai.',
              fix: 'Boring technology choose karo — PostgreSQL, MySQL, Redis. Large community, mature documentation, battle-tested. Unique scale problem solve karte waqt exotic databases consider karo.',
            },
            {
              mistake: 'Development mein SQLite use karna, production mein PostgreSQL',
              why: 'SQLite aur PostgreSQL ke behavior differences hain — NULL handling, date functions, full-text search. Bugs development mein nahi dikte.',
              fix: 'Development mein bhi PostgreSQL use karo. Docker Compose se local PostgreSQL run karo — free aur easy hai.',
            },
          ]}
          proTip="Supabase free tier sirf local development tak mat rakhna — ye PostgreSQL + Auth + Storage + Edge Functions ek saath deta hai, kisi bhi SaaS se better deal hai. New project start karne ke liye hands down best choice. Neon serverless PostgreSQL try karo — development ke liye unlimited free databases, production ke liye scale karo, cold start bhi nahi hota. Dono free hain, dono production-ready hain."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 1 Quiz — Databases Ka Overview
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — database fundamentals test karo!
          </p>
        </div>
        <QuizSection questions={dbOverviewQuiz} chapterSlug="db-overview" />
      </div>
    </div>
  )
}
