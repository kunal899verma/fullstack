'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const sqlCrudQuiz: QuizQuestion[] = [
  {
    question: 'LIKE operator mein "%" aur "_" ka kya fark hai?',
    options: [
      { text: 'Dono same hain — koi fark nahi', correct: false, explanation: 'Important fark hai in dono mein.' },
      { text: '% kisi bhi number of characters match karta hai; _ sirf exactly ek character match karta hai', correct: true, explanation: 'Sahi! LIKE "A%" = "A" se shuru hone wale sab. LIKE "A_" = sirf "AB", "AC" etc — exactly 2 character words starting with A.' },
      { text: '% case-sensitive hai; _ case-insensitive', correct: false, explanation: 'Case sensitivity LIKE ke modifiers se control hoti hai, % ya _ se nahi.' },
      { text: '% numbers ke liye hai; _ strings ke liye', correct: false, explanation: 'Dono string pattern matching ke liye hain.' },
    ],
  },
  {
    question: 'LIMIT 10 OFFSET 20 ka kya matlab hai?',
    options: [
      { text: 'Pehle 20 rows fetch karo, phir 10 rows aur', correct: false, explanation: 'OFFSET pehle N rows skip karta hai, unhe fetch nahi karta.' },
      { text: 'Pehli 20 rows skip karo, phir agli 10 rows return karo', correct: true, explanation: 'Sahi! OFFSET 20 matlab 20 rows skip. LIMIT 10 matlab agle 10 rows. Page 3 ke liye (page size 10): LIMIT 10 OFFSET 20.' },
      { text: 'Total 30 rows return karo', correct: false, explanation: 'LIMIT 10 sirf 10 rows return karta hai — OFFSET 20 rows skip karta hai.' },
      { text: 'Rows 20 se 10 tak return karo', correct: false, explanation: 'LIMIT 10 OFFSET 20 = rows 21 se 30 (1-indexed). Row 20 se 10 back jaana backward hai.' },
    ],
  },
  {
    question: 'WHERE clause ke bina UPDATE chalane ka kya danger hai?',
    options: [
      { text: 'Query slow ho jaati hai', correct: false, explanation: 'Performance issue nahi, data integrity issue hai.' },
      { text: 'SQL syntax error aata hai', correct: false, explanation: 'UPDATE without WHERE valid SQL hai — isiliye zyada dangerous hai.' },
      { text: 'Table ki SAARI rows update ho jaati hain — potentially catastrophic data loss', correct: true, explanation: 'Sahi! UPDATE users SET password = "hacked" — bina WHERE ke saare users ka password change ho jaayega. Production mein ye disaster hai.' },
      { text: 'Sirf ek row update hoti hai randomly', correct: false, explanation: 'Bina WHERE ke sab rows update hoti hain, koi random selection nahi.' },
    ],
  },
  {
    question: 'DISTINCT keyword kya karta hai?',
    options: [
      { text: 'Results ko alphabetically sort karta hai', correct: false, explanation: 'Sorting ke liye ORDER BY use karo.' },
      { text: 'Duplicate rows result se remove karta hai — unique values return karta hai', correct: true, explanation: 'Sahi! SELECT DISTINCT city FROM users — ek city sirf ek baar appear hogi chahe 1000 users ek hi city mein hoon.' },
      { text: 'NULL values remove karta hai', correct: false, explanation: 'DISTINCT NULL values bhi handle karta hai — NULL ek baar appear hogi.' },
      { text: 'Columns ko distinct banata hai', correct: false, explanation: 'DISTINCT rows pe apply hota hai, columns pe nahi.' },
    ],
  },
  {
    question: 'Column alias (AS) kab use karte hain?',
    options: [
      { text: 'Column rename karne ke liye database mein permanently', correct: false, explanation: 'AS sirf result set mein column ka naam change karta hai — actual column nahi.' },
      { text: 'Result set mein column ko readable naam dene ke liye ya calculated expressions name karne ke liye', correct: true, explanation: 'Sahi! SELECT COUNT(*) AS total_users, AVG(age) AS average_age FROM users — calculated columns ko meaningful names milte hain.' },
      { text: 'WHERE clause mein use karne ke liye', correct: false, explanation: 'WHERE clause mein alias use nahi kar sakte — alias SELECT ke baad available hota hai. HAVING mein kuch databases allow karte hain.' },
      { text: 'Performance improve karne ke liye', correct: false, explanation: 'AS sirf display name hai — query performance pe koi effect nahi.' },
    ],
  },
]

function SqlCrudDiagram() {
  const items = [
    { label: 'SELECT', sublabel: 'Read data · HTTP GET · Danger: none · Safe to run anytime', color: '#FF6B35', bg: 'rgba(255,107,53,0.1)', border: 'rgba(255,107,53,0.3)', icon: '📖' },
    { label: 'INSERT', sublabel: 'Create data · HTTP POST · Danger: low · Creates new row', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: '➕' },
    { label: 'UPDATE', sublabel: 'Modify data · HTTP PUT/PATCH · Danger: HIGH · Always use WHERE', color: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', icon: '✏️' },
    { label: 'DELETE', sublabel: 'Remove data · HTTP DELETE · Danger: CRITICAL · Always use WHERE', color: '#EF4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', icon: '🗑️' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">SQL CRUD Operations Flow</p>
      <div className="max-w-lg mx-auto space-y-2">
        {items.map((item, i) => (
          <div key={i}>
            <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{item.sublabel}</p>
              </div>
            </div>
            {i < items.length - 1 && <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓</span></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DBChapter2Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          SQL Basics — CRUD Queries Master Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          SQL ek declarative language hai — tum database se kehte ho "mujhe ye chahiye," database engine khud decide karta hai "kaise laana hai." Ye 1970s mein bana, aaj 2024 mein bhi every serious backend ka backbone hai. CRUD — Create, Read, Update, Delete — ye char operations ek developer ke daily kaam ka 90% hain. SELECT, INSERT, UPDATE, DELETE — ye seekh lo, sab kuch aata hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Lekin dhyan raho: SQL mein ek galat command — UPDATE bina WHERE ke, DELETE bina WHERE ke — production disaster hai. Isliye har command ke saath "dangerous cases" bhi samjhenge. Real-world examples ke saath — WHERE conditions, filtering, sorting, pagination sab cover hoga. Code likhne se pehle samjho ki database engine under the hood kya kar raha hai.
        </p>
      </div>

      <SqlCrudDiagram />

      <div id="select-basics">
        <ConceptCard
          title="SELECT — Data Padhna"
          emoji="📖"
          difficulty="beginner"
          whatIsIt="Sawaal: SELECT kaise kaam karta hai under the hood? Database engine pehle FROM clause process karta hai, phir WHERE se rows filter karta hai, phir SELECT se columns choose karta hai, phir ORDER BY sort karta hai, aur last mein LIMIT apply hota hai. SELECT likhne ka order aur execute hone ka order different hai! WHERE se filter karo, ORDER BY se sort karo, LIMIT se paginate karo, DISTINCT se duplicates hataao, AS se column alias do — ye sab ek powerful pipeline hai."
          whenToUse={[
            'Data read karna — users list, product search, order history',
            'WHERE se specific records dhundho — id, email, status se filter',
            'ORDER BY se sorted results — latest first, price ascending',
            'LIMIT/OFFSET se pagination — page 1, page 2, page 3',
            'DISTINCT se unique values — unique cities, unique categories',
          ]}
          whyUseIt="SELECT powerful isliye hai kyunki database engine optimized execution plan banata hai — tum sirf condition likhte ho, wo khud decide karta hai index use karna hai ya nahi, kaunsa join algorithm best hai. WHERE conditions ke combinations se exact data nikalo — aur ye sab indexed data pe blazing fast hota hai. LIKE se partial match karo search feature ke liye. BETWEEN se range queries. IN se multiple values ek shot mein. Lekin yaad rakho: NULL ke liye kabhi = mat use karo, hamesha IS NULL."
          howToUse={{
            filename: 'select-queries.sql',
            language: 'sql',
            code: `-- ── PRACTICE TABLES ──────────────────────────────────────────────
-- Users table
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  city       VARCHAR(100),
  age        INT,
  salary     DECIMAL(10,2),
  is_active  BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  price      DECIMAL(10,2) NOT NULL,
  category   VARCHAR(100),
  stock      INT DEFAULT 0,
  rating     DECIMAL(3,2)
);

-- ── BASIC SELECT ──────────────────────────────────────────────────
SELECT * FROM users;                    -- Sab columns, sab rows
SELECT id, name, email FROM users;      -- Specific columns
SELECT name AS user_name, email AS contact FROM users; -- Aliases

-- ── WHERE — FILTERING ────────────────────────────────────────────
SELECT * FROM users WHERE id = 42;                    -- Equality
SELECT * FROM users WHERE city != 'Delhi';            -- Not equal
SELECT * FROM users WHERE age > 25;                   -- Greater than
SELECT * FROM users WHERE salary BETWEEN 50000 AND 100000; -- Range
SELECT * FROM products WHERE category IN ('Electronics', 'Books', 'Clothing');
SELECT * FROM users WHERE city NOT IN ('Patna', 'Ranchi');

-- ── LIKE — Pattern Matching ───────────────────────────────────────
SELECT * FROM users WHERE name LIKE 'Rahul%';    -- "Rahul" se shuru
SELECT * FROM users WHERE email LIKE '%@gmail.com'; -- Gmail users
SELECT * FROM products WHERE name LIKE '%phone%';   -- Kahin bhi "phone"
SELECT * FROM users WHERE name LIKE 'R_hul';     -- Exactly 5 chars, R_hul
-- Case-insensitive: ILIKE (PostgreSQL specific)
SELECT * FROM users WHERE name ILIKE '%kumar%';  -- case doesn't matter

-- ── NULL HANDLING ─────────────────────────────────────────────────
SELECT * FROM users WHERE city IS NULL;           -- NULL city wale
SELECT * FROM users WHERE city IS NOT NULL;       -- City hai jinke paas
-- city = NULL KAAM NAHI KARTA! Hamesha IS NULL use karo

-- ── ORDER BY ─────────────────────────────────────────────────────
SELECT * FROM products ORDER BY price ASC;        -- Sasta pehle
SELECT * FROM products ORDER BY price DESC;       -- Mehnga pehle
SELECT * FROM users ORDER BY created_at DESC;     -- Latest first
SELECT * FROM products ORDER BY category ASC, price DESC; -- Multiple cols

-- ── LIMIT & OFFSET — Pagination ───────────────────────────────────
SELECT * FROM products ORDER BY id LIMIT 10;          -- First 10
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 0; -- Page 1
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 10;-- Page 2
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 20;-- Page 3
-- Formula: OFFSET = (page_number - 1) * page_size

-- ── DISTINCT ─────────────────────────────────────────────────────
SELECT DISTINCT city FROM users;                  -- Unique cities
SELECT DISTINCT category FROM products;           -- Unique categories
SELECT DISTINCT city, is_active FROM users;       -- Unique combinations

-- ── Calculated Columns with AS ────────────────────────────────────
SELECT
  name,
  price,
  stock,
  price * stock AS total_value,
  ROUND(price * 0.18, 2) AS gst_amount,
  price + (price * 0.18) AS price_with_gst
FROM products;`,
            explanation: "SELECT * mat use karo production mein — ye network bandwidth waste karta hai aur application code fragile banata hai. BETWEEN inclusive hai — 50000 AND 100000 mein dono endpoints include hain, dhyan rakho. LIKE ke saath index sirf prefix matching pe kaam karta hai (LIKE 'prefix%') — wildcard pehle (%suffix) pe full table scan hoti hai, slow! OFFSET-based pagination large tables pe dangerous hai — cursor-based pagination use karo.",
          }}
          realWorldScenario="Amazon jaise e-commerce search feature ka core query: SELECT id, name, price, rating FROM products WHERE name ILIKE '%laptop%' AND price BETWEEN 30000 AND 80000 AND stock > 0 ORDER BY rating DESC LIMIT 20 OFFSET 0 — ye ek query search, filter, sort, aur paginate sab ek saath kar rahi hai. Real production query bilkul aisi hoti hai — ek SQL se product listing page complete. Ye dekh ke samajh aata hai SQL kyun 50 saal baad bhi relevant hai."
          commonMistakes={[
            {
              mistake: 'SELECT * use karna production mein',
              why: 'Sab columns fetch karna bandwidth waste karta hai, queries slow hoti hain, aur application code fragile hoti hai — new columns add karne par unexpected behavior.',
              fix: 'Hamesha specific columns list karo: SELECT id, name, email FROM users. Sirf jo chahiye woh fetch karo.',
            },
            {
              mistake: 'NULL check ke liye = NULL use karna',
              why: 'NULL kisi bhi value ke equal nahi hota — NULL ke saath har comparison NULL return karta hai (true ya false nahi). WHERE city = NULL — koi row nahi milegi.',
              fix: 'IS NULL aur IS NOT NULL use karo hamesha. COALESCE(city, "Unknown") se NULL ko default value se replace karo.',
            },
          ]}
          proTip="Search feature build karna hai aur LIKE too slow hai? pg_trgm extension + GIN index — game changer combo. CREATE EXTENSION IF NOT EXISTS pg_trgm; CREATE INDEX CONCURRENTLY idx_products_name_trgm ON products USING GIN (name gin_trgm_ops); — ab ILIKE '%laptop%' bhi index use karega, full table scan nahi. Ye production search feature ka correct approach hai, Elasticsearch se pehle try karo."
        />
      </div>

      <div id="insert-into">
        <ConceptCard
          title="INSERT INTO — Data Daalna"
          emoji="➕"
          difficulty="beginner"
          whatIsIt="INSERT INTO table mein naye rows add karta hai. Lekin sirf row add karna nahi — ye kaise karo ye zyada important hai. Single row, multiple rows ek saath (bulk insert), RETURNING se inserted ID immediately wapas lo — ye sab patterns hain jo production code mein common hain. ON CONFLICT = upsert pattern — agar row exist kare toh update, nahi toh insert. INSERT...SELECT se ek table se doosri mein data copy. Aur sabse zaroori: kabhi bhi string concatenation se query mat banao — SQL injection ka door khol doge."
          whenToUse={[
            'New user registration — ek row insert',
            'Bulk data import — multiple rows ek saath',
            'Upsert — agar user exist kare toh update, nahi toh create',
            'Data migration — ek table se doosre mein copy',
            'Seed data — development/testing ke liye initial data',
          ]}
          whyUseIt="INSERT ke andar ek under-the-hood detail: bulk insert single INSERT se 10-100x fast hota hai kyunki database ek transaction, ek network round-trip mein hazaron rows insert karta hai. RETURNING clause engine ke andar se directly data nikalta hai — extra SELECT query ka overhead nahi. ON CONFLICT UPSERT concurrent apps mein race condition prevent karta hai database level pe — application code mein check nahi karna padta 'exist karta hai ya nahi.'"
          howToUse={{
            filename: 'insert-queries.sql',
            language: 'sql',
            code: `-- ── SINGLE ROW INSERT ─────────────────────────────────────────────
INSERT INTO users (name, email, city, age)
VALUES ('Rahul Sharma', 'rahul@example.com', 'Mumbai', 28);

-- RETURNING — inserted row ka data wapas lo (PostgreSQL)
INSERT INTO users (name, email, city)
VALUES ('Priya Patel', 'priya@example.com', 'Ahmedabad')
RETURNING id, name, created_at;
-- Result: id=42, name='Priya Patel', created_at=2024-01-15...

-- ── MULTIPLE ROWS INSERT ──────────────────────────────────────────
INSERT INTO products (name, price, category, stock)
VALUES
  ('iPhone 15', 79999.00, 'Electronics', 50),
  ('Samsung Galaxy S24', 69999.00, 'Electronics', 75),
  ('MacBook Pro', 149999.00, 'Laptops', 20),
  ('Dell XPS 15', 119999.00, 'Laptops', 15),
  ('Sony WH-1000XM5', 24999.00, 'Audio', 100);
-- 5 rows ek INSERT mein — much faster than 5 separate INSERTs

-- ── INSERT...SELECT (Copy from another table) ─────────────────────
INSERT INTO archived_users (id, name, email, archived_at)
SELECT id, name, email, NOW()
FROM users
WHERE last_login < NOW() - INTERVAL '1 year'
  AND is_active = false;

-- ── UPSERT — ON CONFLICT ──────────────────────────────────────────
-- Agar email exist kare toh name update karo, nahi toh insert
INSERT INTO users (email, name, city)
VALUES ('rahul@example.com', 'Rahul K Sharma', 'Pune')
ON CONFLICT (email)
DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  updated_at = NOW();
-- EXCLUDED = values jo insert karna chahte the

-- Agar conflict pe kuch nahi karna — silently skip
INSERT INTO users (email, name)
VALUES ('existing@example.com', 'Someone')
ON CONFLICT (email) DO NOTHING;

-- ── Node.js ke saath INSERT ────────────────────────────────────────
import { Pool } from 'pg'
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// Single insert — parameterized query (SQL injection safe)
async function createUser(name: string, email: string, city: string) {
  const result = await pool.query(
    'INSERT INTO users (name, email, city) VALUES ($1, $2, $3) RETURNING *',
    [name, email, city]  // Parameters — never string concatenate!
  )
  return result.rows[0]
}

// Bulk insert
async function bulkInsertProducts(products: Array<{name: string, price: number}>) {
  const values = products.map((p, i) =>
    \`($\${i * 2 + 1}, $\${i * 2 + 2})\`
  ).join(', ')

  const params = products.flatMap(p => [p.name, p.price])

  await pool.query(
    \`INSERT INTO products (name, price) VALUES \${values}\`,
    params
  )
}`,
            explanation: "Hamesha parameterized queries ($1, $2) — ye security ki pehli line hai. Database parameter ko string nahi, data ki tarah treat karta hai — injection impossible. RETURNING * se inserted row engine se directly milti hai, extra SELECT nahi. ON CONFLICT upsert concurrent apps mein database-level race condition safety deta hai. Bulk insert ek transaction mein — ek commit, maximum performance.",
          }}
          realWorldScenario="User signup flow — real production pattern: INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id, email, created_at — ek query mein user create bhi, aur response ke liye data bhi. RETURNING se mila id seedha session banane ke liye use karo. Koi extra SELECT query nahi, koi race condition nahi. Ye ek small optimization, lekin large traffic pe real difference karta hai."
          commonMistakes={[
            {
              mistake: 'String concatenation se SQL query banana',
              why: "const query = `INSERT INTO users (name) VALUES ('${userName}')` — agar userName = \"'; DROP TABLE users; --\" toh table delete ho jaayega. SQL injection attack.",
              fix: 'Hamesha parameterized queries use karo: pool.query("INSERT INTO users (name) VALUES ($1)", [userName]). Database parameter ko string nahi, value ki tarah treat karta hai.',
            },
            {
              mistake: 'Column names specify nahi karna INSERT mein',
              why: 'INSERT INTO users VALUES (1, "Rahul", "rahul@example.com") — agar table mein column order change ho ya column add ho toh query break hogi ya wrong data insert hoga.',
              fix: 'Hamesha column names specify karo: INSERT INTO users (id, name, email) VALUES (1, "Rahul", "rahul@example.com").',
            },
          ]}
          proTip="Millions of rows insert karne hain? COPY command use karo — regular INSERT se 100x faster hai kyunki ye database ka native binary format use karta hai, row-by-row overhead nahi. CSV file se: COPY products FROM '/path/to/file.csv' WITH CSV HEADER. Node.js mein pg-copy-streams library se streaming bulk insert possible hai — file stream seedha database mein flow karo, memory mein sab load nahi karna. Data migration ke liye yahi sahi tool hai."
        />
      </div>

      <div id="update-delete">
        <ConceptCard
          title="UPDATE & DELETE — Dhyan Se!"
          emoji="⚠️"
          difficulty="beginner"
          whatIsIt="UPDATE aur DELETE — ye do commands jinse sabse zyada production accidents hote hain. Rule number one: WHERE clause lagana mandatory hai. Bina WHERE ke UPDATE matlab SAARI table ke rows update — bina WHERE ke DELETE matlab POORI table delete. Ye SQL syntax error nahi deta — silently sab kuch badal deta hai! UPDATE...RETURNING se updated row wapas milti hai. Soft delete pattern — actual delete ki jagah deleted_at timestamp set karo — ye professional apps ka standard approach hai."
          whenToUse={[
            'UPDATE: User profile update, password change, order status change',
            'UPDATE: Bulk status update — sab pending orders ko processing mein',
            'DELETE: Permanent data removal — GDPR compliance, old records cleanup',
            'Soft Delete: is_deleted = true — data physically rakho, logically hide karo',
            'Always use WHERE — target specific rows',
          ]}
          whyUseIt="Ye sach mein hua hai bade companies mein — ek developer ne production pe UPDATE chalaya bina WHERE ke, aur hazaron users ke passwords corrupt ho gaye. Soft delete prefer karo hard delete se — data physically rahega, logically hidden hoga. Recovery possible, audit trail available, GDPR compliance easier. RETURNING se updated/deleted data directly milta hai — ek query mein confirm bhi karo ki sahi row change hui. Transaction mein wrap karo — ROLLBACK lifeline hoti hai."
          howToUse={{
            filename: 'update-delete-queries.sql',
            language: 'sql',
            code: `-- ── UPDATE — Single Row ──────────────────────────────────────────
UPDATE users
SET name = 'Rahul Kumar Sharma', city = 'Bangalore'
WHERE id = 42;

-- RETURNING — kya update hua
UPDATE users
SET salary = salary * 1.10  -- 10% raise
WHERE department = 'Engineering' AND is_active = true
RETURNING id, name, salary;

-- ── UPDATE ke saath subquery ──────────────────────────────────────
UPDATE products
SET stock = stock - oi.quantity
FROM order_items oi
WHERE products.id = oi.product_id
  AND oi.order_id = 100;

-- ── Multiple columns update ───────────────────────────────────────
UPDATE orders
SET
  status = 'shipped',
  shipped_at = NOW(),
  tracking_number = 'IND123456789'
WHERE id = 55 AND status = 'processing';

-- ── DELETE — Careful! ─────────────────────────────────────────────
DELETE FROM users WHERE id = 42;  -- Ek specific user

-- RETURNING — kaun delete hua
DELETE FROM sessions
WHERE expires_at < NOW()  -- Expired sessions cleanup
RETURNING id, user_id;

-- DELETE with JOIN (PostgreSQL)
DELETE FROM order_items oi
USING orders o
WHERE oi.order_id = o.id
  AND o.status = 'cancelled'
  AND o.created_at < NOW() - INTERVAL '30 days';

-- ── SOFT DELETE Pattern (Recommended) ────────────────────────────
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP;

-- Soft delete
UPDATE users
SET deleted_at = NOW()
WHERE id = 42;

-- Query active users only
SELECT * FROM users WHERE deleted_at IS NULL;

-- "Restore" deleted user
UPDATE users
SET deleted_at = NULL
WHERE id = 42;

-- ── DANGER DEMOS — Ye mat karo production mein! ──────────────────
-- ❌ UPDATE bina WHERE ke — SAARE users affected!
-- UPDATE users SET password = 'hacked';  -- NEVER!

-- ❌ DELETE bina WHERE ke — POORI table delete!
-- DELETE FROM orders;  -- NEVER!

-- ✅ Safe practice: Transaction mein wrap karo pehle test karo
BEGIN;
UPDATE products SET price = price * 0.9 WHERE category = 'Electronics';
-- Pehle check karo kitne rows affected hue
SELECT COUNT(*) FROM products WHERE category = 'Electronics';
-- Sab theek lage toh:
COMMIT;
-- Ghalti lage toh:
-- ROLLBACK;`,
            explanation: "Golden rule: production pe UPDATE/DELETE se pehle SAME WHERE se SELECT chalao — dekho kitne rows affected honge. Transaction mein wrap karo, BEGIN karo, check karo, COMMIT karo — galti lage toh ROLLBACK. Soft delete preferred pattern hai: data physically rakho, logically hide karo. Ye ek habit banao — ek baar bina WHERE ke UPDATE chalana enough hai ye lesson permanently yaad karne ke liye.",
          }}
          realWorldScenario="E-commerce order cancellation — ye sochte ho sirf ek UPDATE hai, lekin real mein do operations atomic hone chahiye: order status cancel karo + stock wapas restore karo. Agar order cancel hua lekin stock restore nahi hua toh inventory galat ho jaata hai — silent bug. Solution: BEGIN; UPDATE orders SET status = 'cancelled'... UPDATE products SET stock = stock + oi.quantity... COMMIT; — dono ya toh saath hote hain ya dono rollback. Ye ACID + transaction ka real-world power hai."
          commonMistakes={[
            {
              mistake: 'Production pe direct UPDATE/DELETE without testing',
              why: 'Wrong WHERE clause se unintended rows affected. Ye undo nahi hota easily.',
              fix: 'Pehle same WHERE se SELECT run karo — rows count dekho. Staging environment pe test karo. Production pe transaction mein wrap karo — ROLLBACK option rakho.',
            },
            {
              mistake: 'Hard delete use karna data retention ki zaroorat hone par',
              why: 'DELETE karne ke baad data gone — recovery costly aur sometimes impossible. Audit trail bhi khatam.',
              fix: 'Soft delete pattern: deleted_at TIMESTAMP column add karo. DELETE ki jagah UPDATE SET deleted_at = NOW(). Queries mein WHERE deleted_at IS NULL. Periodic cron se actually delete karo agar needed.',
            },
          ]}
          proTip="Development mein test data wipe karna hai? TRUNCATE TABLE se poori table instant empty hoti hai — DELETE FROM table se 100x fast kyunki row-by-row scan nahi karta. TRUNCATE RESTART IDENTITY se auto-increment counter bhi reset — ids phir se 1 se start. Lekin production mein TRUNCATE = nuclear option, hamesha double check karo. Staging pe pehle test karo, production pe use karo tabhi jab zaroorat ho."
        />
      </div>

      <div id="order-limit-offset">
        <ConceptCard
          title="ORDER BY, LIMIT & OFFSET — Sorting aur Pagination"
          emoji="📄"
          difficulty="beginner"
          whatIsIt="ORDER BY results sort karta hai — ASC (ascending, default) ya DESC (descending). Lekin under the hood kya hota hai? Database sort algorithm run karta hai — small data memory mein, large data disk pe (expensive!). Multiple columns pe sort possible hai — primary column first, tiebreaker second. LIMIT rows limit karta hai. OFFSET N rows skip karta hai. Pagination ke liye ye combo use karte hain — lekin OFFSET pe ek hidden performance trap hai jo page number badhne pe slow karta jaata hai."
          whenToUse={[
            'Sorted lists — latest products, highest rated, cheapest first',
            'Pagination — page 1, page 2 (blog posts, products, users)',
            'Top N results — top 10 sellers, last 5 orders',
            'Feed/timeline — latest content pehle (DESC created_at)',
            'Leaderboard — highest score first',
          ]}
          whyUseIt="Ye jaanna zaroori hai: bina ORDER BY ke database rows kisi bhi order mein return kar sakta hai — same query do baar chalao, different order mil sakta hai. Pagination ORDER BY bina consistent nahi hoti. OFFSET ka hidden trap: SELECT ... LIMIT 10 OFFSET 100000 pe database pehle 100000 rows scan karta hai sirf throw karne ke liye — page badhne ke saath query linear slow hoti jaati hai. Cursor-based pagination us linear scan ko bypass karta hai."
          howToUse={{
            filename: 'order-limit-offset.sql',
            language: 'sql',
            code: `-- ── ORDER BY ─────────────────────────────────────────────────────
SELECT * FROM products ORDER BY price ASC;          -- Sasta pehle
SELECT * FROM products ORDER BY price DESC;         -- Mehnga pehle
SELECT * FROM products ORDER BY price;              -- ASC default hai

-- Multiple columns — tiebreaker
SELECT * FROM products
ORDER BY category ASC, price ASC;  -- Category se sort, same category mein price

SELECT * FROM users
ORDER BY city ASC, name ASC;  -- City sort, same city mein name alphabetical

-- NULL sorting (PostgreSQL)
SELECT * FROM products ORDER BY rating DESC NULLS LAST;  -- NULL end mein
SELECT * FROM products ORDER BY rating ASC NULLS FIRST;  -- NULL start mein

-- ── LIMIT ─────────────────────────────────────────────────────────
SELECT * FROM products ORDER BY rating DESC LIMIT 10;    -- Top 10
SELECT * FROM orders ORDER BY created_at DESC LIMIT 5;   -- Last 5 orders
SELECT * FROM users ORDER BY salary DESC LIMIT 1;        -- Highest paid

-- ── OFFSET — Skip rows ────────────────────────────────────────────
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 0;   -- Page 1 (rows 1-10)
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 10;  -- Page 2 (rows 11-20)
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 20;  -- Page 3 (rows 21-30)

-- ── Pagination Formula ────────────────────────────────────────────
-- OFFSET = (page - 1) * pageSize
-- page=1, size=20: LIMIT 20 OFFSET 0
-- page=2, size=20: LIMIT 20 OFFSET 20
-- page=5, size=20: LIMIT 20 OFFSET 80

-- ── Cursor-based Pagination (Better for large data) ───────────────
-- OFFSET slow hai — first N rows scan karta hai phir skip
-- Cursor: last seen item ki value use karo

-- Page 1 — latest 10 orders
SELECT * FROM orders ORDER BY id DESC LIMIT 10;
-- Last row ka id = 95 (maan lo)

-- Page 2 — 95 se pehle wale orders
SELECT * FROM orders WHERE id < 95 ORDER BY id DESC LIMIT 10;
-- Last row ka id = 85

-- Page 3 — 85 se pehle wale
SELECT * FROM orders WHERE id < 85 ORDER BY id DESC LIMIT 10;
-- Much faster! Index use hota hai, rows skip nahi karte

-- ── Node.js Pagination Helper ─────────────────────────────────────
async function getProducts(page: number, pageSize: number = 20) {
  const offset = (page - 1) * pageSize
  const [items, countResult] = await Promise.all([
    pool.query(
      'SELECT * FROM products ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [pageSize, offset]
    ),
    pool.query('SELECT COUNT(*) FROM products'),
  ])

  const total = parseInt(countResult.rows[0].count)
  return {
    data: items.rows,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      hasNext: page * pageSize < total,
    },
  }
}`,
            explanation: "ORDER BY hamesha specify karo paginated queries mein — bina iske results unpredictable hain. Cursor-based pagination large tables ke liye OFFSET se zyada efficient hai — OFFSET pe database O(n) kaam karta hai (scan + discard), cursor ke saath O(log n) index lookup. Last seen ID use karo next page ke liye — 100th page pe bhi same speed.",
          }}
          realWorldScenario="Instagram feed — infinite scroll ka implementation: First load: SELECT * FROM posts WHERE user_id IN (...following IDs...) ORDER BY created_at DESC LIMIT 20; Last post ka created_at save karo. Next scroll: SELECT * FROM posts WHERE user_id IN (...) AND created_at < '2024-01-15 10:30:00' ORDER BY created_at DESC LIMIT 20 — cursor-based pagination. Index seedha us timestamp pe jump karta hai, koi extra scan nahi. Ye wahi reason hai Instagram infinite scroll smooth rehta hai."
          commonMistakes={[
            {
              mistake: 'ORDER BY bina LIMIT use karna pagination mein',
              why: 'Consistent results guarantee nahi — same page pe alag results aa sakte hain different requests mein. Database ka internal sort order change ho sakta hai.',
              fix: 'Hamesha ORDER BY with a stable, unique column (id ya created_at + id) use karo pagination ke liye.',
            },
            {
              mistake: 'OFFSET-based pagination bahut bada OFFSET ke liye',
              why: 'SELECT * FROM posts ORDER BY id LIMIT 10 OFFSET 100000 — database pehle 100000 rows scan karta hai phir discard. Page 10000 pe bohot slow ho jaata hai.',
              fix: 'Cursor-based pagination use karo large datasets ke liye: WHERE id < last_seen_id ORDER BY id DESC LIMIT 10.',
            },
          ]}
          proTip="Pagination ke saath total count bhi chahiye ek query mein? PostgreSQL window function se: SELECT *, COUNT(*) OVER() AS total_count FROM products ORDER BY id LIMIT 10 — ek query mein data bhi, total bhi, koi extra COUNT(*) query nahi. Ya CTE se: WITH total AS (SELECT COUNT(*) FROM products) SELECT p.*, t.count FROM products p, total t LIMIT 10. Ye small trick ek API request ka latency half kar deti hai."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 2 Quiz — SQL Basics CRUD
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — SQL queries ka confidence check karo!
          </p>
        </div>
        <QuizSection questions={sqlCrudQuiz} chapterSlug="sql-basics-crud" />
      </div>
    </div>
  )
}
