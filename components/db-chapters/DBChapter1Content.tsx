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
          Database har serious application ka core hota hai — data store karna, retrieve karna, update karna. Sahi database choose karna ek critical decision hai jo baad mein change karna bahut expensive hai. PostgreSQL, MySQL, MongoDB, Redis — har ek ke apne strengths aur weaknesses hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum samjhenge ki SQL vs NoSQL ka real difference kya hai, ACID properties kyun zaroori hain, relational model kaise kaam karta hai, aur aapke use case ke liye kaunsa database sahi choice hoga.
        </p>
      </div>

      <div id="sql-vs-nosql">
        <ConceptCard
          title="SQL vs NoSQL — Kab Kya?"
          emoji="⚖️"
          difficulty="beginner"
          whatIsIt="SQL databases (PostgreSQL, MySQL) tables mein data store karte hain — rows aur columns, fixed schema, relationships, ACID transactions. NoSQL databases (MongoDB, Redis, Cassandra) flexible structure use karte hain — documents, key-value, graphs. SQL: structured data ke liye. NoSQL: scale, flexibility, speed ke liye specific use cases mein."
          whenToUse={[
            'SQL: Structured data jahan relationships important ho — users, orders, products',
            'SQL: Financial data — ACID transactions mandatory hain',
            'SQL: Complex queries chahiye — JOINs, GROUP BY, window functions',
            'NoSQL (MongoDB): Flexible schema chahiye — content, catalogs, varying attributes',
            'NoSQL (Redis): Caching, sessions, real-time leaderboards — in-memory speed',
            'NoSQL (Cassandra/DynamoDB): Massive scale, high write throughput — IoT, logs',
          ]}
          whyUseIt="Wrong database choice migration cost bahut zyada hoti hai — terabytes data migrate karna months ka kaam hai. SQL schema enforcement bugs early pakadta hai — invalid data save nahi hoti. NoSQL horizontal scaling easy hai — commodity servers add karte jao. Each database is a tool — ek hi project mein dono use karna (polyglot persistence) common hai."
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
            explanation: "PostgreSQL zyada cases mein best choice hai — SQL + JSONB flexibility deta hai. MongoDB sirf specific use cases mein shine karta hai. Redis almost hamesha secondary database hai — caching layer. Ek app mein PostgreSQL + Redis combination bahut common hai.",
          }}
          realWorldScenario="Ek food delivery app mein: Users, restaurants, orders, payments — PostgreSQL (relationships, transactions). Restaurant menus (varying items, attributes) — MongoDB (flexible schema). Active sessions, OTP codes — Redis (fast, auto-expiry TTL). Teen databases, teen different jobs."
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
          proTip="PostgreSQL JSONB column support karta hai — structured + flexible dono ek database mein. Users table mein proper columns rakho (id, email, name), aur ek metadata JSONB column add karo flexible attributes ke liye. 90% cases mein PostgreSQL kaafi hai — NoSQL ki zaroorat justify karo pehle."
        />
      </div>

      <div id="acid-properties">
        <ConceptCard
          title="ACID Properties — Transaction Ka Backbone"
          emoji="🔒"
          difficulty="intermediate"
          whatIsIt="ACID — Atomicity, Consistency, Isolation, Durability — ye char properties ensure karti hain ki database transactions reliable hain. ACID ke bina bank transfer mein ek account se paise deduct ho sakte hain aur doosre mein credit nahi ho — data corrupt. PostgreSQL full ACID hai. MongoDB 4.0+ mein multi-document transactions hain — lekin complex aur slow."
          whenToUse={[
            'Financial transactions — paise transfer, payments, billing',
            'Inventory management — stock levels accurate hone chahiye',
            'User authentication — concurrent login attempts safe hone chahiye',
            'Order processing — order create + inventory decrement atomic hona chahiye',
            'Any operation jahan partial failure data corrupt kar de',
          ]}
          whyUseIt="ACID ke bina concurrent transactions race conditions create karte hain — do users ek hi seat book kar lete hain, bank balance negative ho jaata hai. Isolation levels control karte hain ki concurrent transactions ek doosre ko kitna affect karte hain — stricter isolation = more consistent data = slower performance. Tradeoff samjho."
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
            explanation: "BEGIN...COMMIT transaction block hai. Error aane par ROLLBACK se sab undo hota hai. Isolation levels concurrency vs consistency tradeoff hain — default READ COMMITTED zyada cases ke liye kaafi hai. SERIALIZABLE highest isolation hai lekin performance impact hota hai — financial systems mein use karo.",
          }}
          realWorldScenario="Ek flight booking system mein: 100 log ek hi last seat book karne ki koshish kar rahe hain. Bina ACID ke — sab 100 ko confirmation milega! ACID + SERIALIZABLE isolation se sirf ek ko seat milti hai, baaki sab ko 'seat unavailable' message. Ye database level pe handle hota hai — application code mein race condition solve nahi karna padta."
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
          proTip="PostgreSQL mein SAVEPOINT use karo partial rollback ke liye — puri transaction rollback karne ki zaroorat nahi. SAVEPOINT sp1; UPDATE...; ROLLBACK TO sp1; — sirf sp1 ke baad ka kaam undo hota hai. Complex transactions mein ye bahut useful hai."
        />
      </div>

      <div id="relational-model">
        <ConceptCard
          title="Relational Model — Tables, Rows, Columns"
          emoji="📊"
          difficulty="beginner"
          whatIsIt="Relational model data tables (relations) mein organize karta hai. Table = ek entity type (users, products). Row = ek record (ek user). Column = ek attribute (name, email). Primary key har row ko uniquely identify karta hai. Foreign key doosri table se relationship establish karta hai. Schema = database ka structure — tables + columns + constraints + relationships."
          whenToUse={[
            'Jab data clearly entities mein organize ho sakta ho',
            'Entities ke beech relationships ho — user has many orders',
            'Data integrity constraints zaroori ho — email unique, balance positive',
            'Complex queries aur reporting chahiye',
            'Multiple teams ek database share karein — well-defined structure needed',
          ]}
          whyUseIt="Relational model 50+ saal purana hai lekin aaj bhi dominant hai kyunki maths pe based hai — set theory. SQL ek declarative language hai — kya chahiye batao, kaise nikalna database decide karta hai. Normalization se data duplication eliminate hoti hai. Constraints data integrity ensure karte hain application se independent."
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
            explanation: "PRIMARY KEY uniquely identify karta hai har row. FOREIGN KEY REFERENCES doosri table se link karta hai. ON DELETE CASCADE — parent delete ho toh children bhi delete. ON DELETE SET NULL — parent delete ho toh FK null ho jaaye. CHECK constraints application se independent data validation dete hain. SERIAL auto-increment integer hai — PostgreSQL mein.",
          }}
          realWorldScenario="Ek e-commerce app ka schema design: Users (id, email, name), Products (id, name, price, stock, category_id), Orders (id, user_id, total, status), OrderItems (order_id, product_id, quantity, unit_price). Ye 4 tables se puri shopping application ka data model ban jaata hai. Relationships clear hain, queries predictable hain."
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
          proTip={'PostgreSQL mein UUID primary keys ke liye uuid-ossp extension use karo: CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; phir id UUID PRIMARY KEY DEFAULT uuid_generate_v4(). Ya PostgreSQL 13+ mein gen_random_uuid() built-in hai — extension ki zaroorat nahi.'}
        />
      </div>

      <div id="popular-databases">
        <ConceptCard
          title="Popular Databases Comparison"
          emoji="🗄️"
          difficulty="beginner"
          whatIsIt="Market mein hazaron databases hain lekin top choices limited hain. PostgreSQL — feature-rich SQL. MySQL — simple, widely hosted. MongoDB — document store. Redis — in-memory cache/queue. SQLite — embedded, no server. Cassandra — massive scale write-heavy. Elasticsearch — full-text search. Har database ek specific problem ke liye optimize hai."
          whenToUse={[
            'PostgreSQL: Default choice for new projects — most versatile',
            'MySQL: Existing team familiar hai, hosting par available hai',
            'MongoDB: Genuinely document-oriented data, flexible schema needed',
            'Redis: Caching, sessions, pub/sub, rate limiting',
            'SQLite: Mobile apps, development/testing, embedded applications',
            'Elasticsearch: Full-text search, log analytics (ELK stack)',
          ]}
          whyUseIt="Right tool for right job — ek database sab kuch nahi kar sakta optimally. PostgreSQL versatile hai lekin Redis se fast cache nahi dega. Elasticsearch search ke liye PostgreSQL se better hai. Production system design mein multiple databases ka combination common hai — polyglot persistence."
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
            explanation: "Managed services use karo — database administration complex hai. Supabase PostgreSQL ke liye excellent free tier deta hai. MongoDB Atlas free tier small projects ke liye kaafi hai. Upstash Redis serverless applications ke liye best hai — per-request pricing.",
          }}
          realWorldScenario="WhatsApp ka architecture: Messages — Erlang + Mnesia (custom). User data — MySQL. Media — separate storage. Notifications — Redis. Analytics — custom. Ek billion users ke liye ek database kaafi nahi. Lekin aapke startup ke liye PostgreSQL + Redis = probably enough for first million users."
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
          proTip="Supabase free tier use karo local development ke alawa bhi — PostgreSQL + Auth + Storage + Edge Functions ek saath milte hain. New project start karne ke liye perfect hai. Neon serverless PostgreSQL hai — development ke liye unlimited free databases, production ke liye scale karo."
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
