'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'INNER JOIN aur LEFT JOIN mein kya fark hai?',
    options: [
      { text: 'Koi fark nahi — dono same results dete hain', correct: false, explanation: 'Bahut important fark hai — unmatched rows ke handling mein.' },
      { text: 'INNER JOIN sirf matching rows; LEFT JOIN saari left table rows + matching right rows', correct: true, explanation: 'Sahi! INNER JOIN sirf woh rows jahan dono tables mein match hai. LEFT JOIN left table ke saare rows aate hain — right table mein match nahi toh NULL.' },
      { text: 'LEFT JOIN faster hai', correct: false, explanation: 'Performance data size pe depend karta hai — join type se nahi.' },
      { text: 'INNER JOIN zyada rows return karta hai', correct: false, explanation: 'Ulta — LEFT JOIN zyada ya same rows deta hai kyunki saari left rows include hain.' },
    ],
  },
  {
    question: 'Foreign key kya ensure karta hai?',
    options: [
      { text: 'Column mein duplicate values nahi hongi', correct: false, explanation: 'Duplicates rokne ke liye UNIQUE constraint hai.' },
      { text: 'Referenced table mein corresponding record exist karta hai — referential integrity', correct: true, explanation: 'Sahi! Foreign key referential integrity enforce karta hai — parent record delete karo toh child records bhi handle hone chahiye (CASCADE, RESTRICT, etc.).' },
      { text: 'Column NULL nahi ho sakta', correct: false, explanation: 'NULL rokne ke liye NOT NULL constraint hai.' },
      { text: 'Data automatically sort hota hai', correct: false, explanation: 'Foreign key sorting nahi karta — referential integrity ke liye hai.' },
    ],
  },
  {
    question: '3rd Normal Form (3NF) kya require karta hai?',
    options: [
      { text: 'Har row ka unique identifier hona', correct: false, explanation: 'Ye 1NF ka requirement hai — 3NF zyada specific hai.' },
      { text: 'Koi non-key column doosre non-key column pe depend nahi karna chahiye (transitive dependency remove karo)', correct: true, explanation: 'Sahi! 3NF mein transitive dependencies remove karo — student_id → department → dept_head_name. dept_head alag table mein hona chahiye.' },
      { text: 'Saare columns same data type ke hon', correct: false, explanation: 'Data types normalization se related nahi hain.' },
      { text: 'Table mein maximum 3 columns hon', correct: false, explanation: '3NF ka naam columns se nahi — ye 3rd level normalization hai.' },
    ],
  },
  {
    question: 'Many-to-many relationship kaise implement karte hain?',
    options: [
      { text: 'Dono tables mein ek doosre ka ID array store karo', correct: false, explanation: 'Arrays normalized nahi hain aur querying difficult hoti hai.' },
      { text: 'Junction/Bridge table banao dono tables ke foreign keys ke saath', correct: true, explanation: 'Sahi! students_courses table mein student_id aur course_id dono foreign keys — ye many-to-many ka standard pattern hai.' },
      { text: 'Ek table mein dono records merge kar do', correct: false, explanation: 'Ye denormalization hai — data duplication aur update anomalies aayenge.' },
      { text: 'Many-to-many SQL mein possible nahi', correct: false, explanation: 'Junction table se many-to-many perfectly implement hoti hai — common pattern hai.' },
    ],
  },
  {
    question: 'FULL OUTER JOIN kya return karta hai?',
    options: [
      { text: 'Sirf woh rows jo dono tables mein match hain', correct: false, explanation: 'Sirf matching rows ke liye INNER JOIN hai.' },
      { text: 'Dono tables ke saare rows — match ho ya na ho, NULL fill hota hai unmatched ke liye', correct: true, explanation: 'Sahi! FULL OUTER JOIN = LEFT JOIN + RIGHT JOIN results. Dono sides ke unmatched rows bhi aate hain — NULL se fill hote hain.' },
      { text: 'Saari rows duplicate kar deta hai', correct: false, explanation: 'FULL OUTER JOIN duplicates nahi karta — bas saari rows include karta hai.' },
      { text: 'PostgreSQL mein support nahi', correct: false, explanation: 'PostgreSQL FULL OUTER JOIN support karta hai — MySQL mein nahi hota directly.' },
    ],
  },
]

function JoinTypesDiagram() {
  const items = [
    { label: 'INNER JOIN', sublabel: 'Only matching rows · Both sides must match · Most common', color: '#FF6B35', bg: 'rgba(255,107,53,0.1)', border: 'rgba(255,107,53,0.3)', icon: '⚡' },
    { label: 'LEFT JOIN', sublabel: 'All left rows + matching right · NULL if no right match', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: '⬅️' },
    { label: 'RIGHT JOIN', sublabel: 'Matching left + all right rows · NULL if no left match', color: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', icon: '➡️' },
    { label: 'FULL OUTER JOIN', sublabel: 'All rows from both sides · NULLs where no match exists', color: '#FF6B35', bg: 'rgba(255,107,53,0.08)', border: 'rgba(255,107,53,0.25)', icon: '🔀' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">SQL Join Types</p>
      <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
        {items.map((item, i) => (
          <div key={i} className="rounded-xl px-4 py-3.5 flex items-start gap-3" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
            <span className="text-xl mt-0.5">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
              <p className="text-xs text-[#71717A] mt-0.5 leading-snug">{item.sublabel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function JoinsDiagram() {
  const joins = [
    { name: 'INNER JOIN', color: '#3178C6', bg: 'rgba(49,120,198,0.1)', desc: 'Sirf matching rows', sql: 'INNER JOIN' },
    { name: 'LEFT JOIN', color: '#FF6B35', bg: 'rgba(255,107,53,0.1)', desc: 'Saari left + matching right', sql: 'LEFT JOIN' },
    { name: 'RIGHT JOIN', color: '#10B981', bg: 'rgba(16,185,129,0.1)', desc: 'Matching left + saari right', sql: 'RIGHT JOIN' },
    { name: 'FULL OUTER JOIN', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', desc: 'Dono tables ki saari rows', sql: 'FULL OUTER JOIN' },
  ]
  return (
    <div className="my-5 grid grid-cols-2 gap-3">
      {joins.map((j) => (
        <div key={j.name} className="rounded-xl p-4" style={{ background: j.bg, border: `1px solid ${j.color}40` }}>
          <p className="font-bold text-sm mb-1" style={{ color: j.color }}>{j.name}</p>
          <p className="text-xs text-[#A1A1AA]">{j.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default function DBChapter3Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Joins & Relationships — Tables Ko Connect Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          JOIN kaise kaam karta hai andar se? Database engine pehle dono tables ka CROSS PRODUCT banata hai — matlab har row ko har doosri row se multiply karta hai. Ek 1000 rows table aur ek 500 rows table ka cross product = 500,000 rows! Phir ON condition apply hota hai filter ke liye. Isliye unindexed JOIN pe full table scan hota hai — ek expensive operation. Indexes JOIN ke liye engine ko shortcut deta hai — cross product ka sirf relevant part process hota hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Real databases mein data multiple tables mein hota hai — users, orders, products alag-alag. JOINs se inhe ek saath query karo. Relationships aur normalization se data duplication avoid hoti hai. Is chapter mein JOINs ka internals, relationships, aur normalization ka real-world logic samjhenge.
        </p>
      </div>

      <JoinTypesDiagram />

      <div id="primary-foreign-keys">
        <ConceptCard
          title="Primary & Foreign Keys — Data Ka Backbone"
          emoji="🔑"
          difficulty="beginner"
          whatIsIt="Primary key har row ka unique identity card hai — koi duplicate allowed nahi. Foreign key doosri table ke primary key ko reference karta hai — ye relational model ki jaan hai, tables ke beech bridge banata hai. Bina foreign keys ke tables sirf alag-alag islands hain. Constraints ke saath ye automatically referential integrity enforce karta hai — database engine ensure karta hai ki orphan records (order without a customer) kabhi nahi banenge."
          whenToUse={[
            'Har table mein primary key hona chahiye',
            'Related tables ko connect karne ke liye foreign key',
            'Referential integrity enforce karne ke liye',
          ]}
          whyUseIt="Keys ke bina data inconsistencies silent bugs create karti hain — orders exist karte hain jinke customers delete ho chuke hain, products reference karte hain categories jo exist nahi karti. Ye bugs production mein tabhi dikhte hain jab koi edge case hit hota hai. Foreign key constraints application layer se independent guard hai — koi bhi (developer, script, direct SQL) galat data nahi daal sakta. Aur indexed keys pe JOINs blazing fast hote hain — engine seedha matching rows pe jump karta hai."
          howToUse={{
            code: `-- Users table
CREATE TABLE users (
  id        SERIAL PRIMARY KEY,     -- auto-increment PK
  name      VARCHAR(100) NOT NULL,
  email     VARCHAR(255) UNIQUE NOT NULL
);

-- Orders table — FK references users
CREATE TABLE orders (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id)
              ON DELETE CASCADE,      -- user delete ho toh orders bhi
  total       DECIMAL(10,2) NOT NULL,
  status      VARCHAR(20) DEFAULT 'pending',
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Many-to-many: students & courses
CREATE TABLE students (id SERIAL PRIMARY KEY, name VARCHAR(100));
CREATE TABLE courses (id SERIAL PRIMARY KEY, title VARCHAR(200));

CREATE TABLE student_courses (  -- Junction table
  student_id  INTEGER REFERENCES students(id) ON DELETE CASCADE,
  course_id   INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (student_id, course_id)  -- composite PK
);`,
            language: 'sql',
            explanation: 'users.id primary key — database ki police, duplicates instant reject. orders.user_id foreign key — user delete pe ON DELETE CASCADE: orders bhi automatically delete. Composite primary key (student_id, course_id) same student same course mein duplicate enrollment impossible banata hai — application code mein check nahi karna padta.',
            filename: 'schema.sql',
          }}
          realWorldScenario="Ek real e-commerce ka database: users, products, orders, order_items — ye sab foreign keys se ek connected graph hai. orders.user_id = users.id ensure karta hai ki ek bhi order bina valid customer ke exist nahi kar sakta. order_items.product_id = products.id ensure karta hai product exist karta hai. Ye automatic guarantees hain — application developer ko manually check nahi karna padta ki related record exist karta hai ya nahi."
          commonMistakes={[
            { mistake: 'ON DELETE action specify nahi karna', why: 'Default RESTRICT parent delete block kar deta hai — ya NULL set hota hai FK pe', fix: 'Always specify: ON DELETE CASCADE ya ON DELETE SET NULL ya RESTRICT' },
          ]}
          proTip="Junction tables mein composite primary key use karo (student_id, course_id) — extra id column unnecessary overhead hai. Composite PK automatically duplicate enrollments block karta hai database level pe. Ek aur tip: foreign key columns pe index lagao — ORDER_ID foreign key orders table mein index ke bina JOIN full table scan karega, ek slow query."
        />
      </div>

      <div id="inner-join">
        <h2 className="text-xl font-display font-bold text-[#F5F5F7] mb-3" id="join-types">Join Types — Visual Overview</h2>
        <JoinsDiagram />
        <ConceptCard
          title="INNER JOIN — Sirf Match Karne Wale Rows"
          emoji="⚡"
          difficulty="beginner"
          whatIsIt="INNER JOIN sirf woh rows return karta hai jahan dono tables mein matching record ho — koi match nahi toh row exclude. Internals mein: engine pehle cross product banata hai (har row X har row), phir ON condition filter karta hai. Index pe yahi optimization hoti hai — engine cross product physically nahi banata, directly matching rows dhundta hai. INNER keyword optional hai — sirf JOIN likhna bhi INNER JOIN hai."
          whenToUse={[
            'Jab sirf complete data chahiye (user + order dono exist karein)',
            'Most common join type in practice',
          ]}
          whyUseIt="INNER JOIN sabse common join hai — sirf complete data chahiye jahan match guaranteed ho. Users aur unke orders ek saath — sirf woh users jinke orders hain. Orders bina user ke? INNER JOIN mein automatically exclude. Ye behavior cleaner aur faster hota hai kyunki engine NULL rows skip karta hai. 80% JOINs real production code mein INNER JOIN hote hain."
          howToUse={{
            code: `-- Users aur unke orders
SELECT
  u.name,
  u.email,
  o.id AS order_id,
  o.total,
  o.status
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.status = 'delivered'
ORDER BY o.created_at DESC;

-- Multiple JOINs — order items bhi
SELECT
  u.name,
  o.id AS order_id,
  p.name AS product_name,
  oi.quantity,
  oi.price
FROM users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
WHERE u.id = 42;`,
            language: 'sql',
            explanation: 'INNER JOIN ON user_id pe join karta hai — yahan index hona zaroori hai warna full table scan. Multiple JOINs chain karo — engine optimal join order decide karta hai, tum sirf condition likhte ho. 4 tables ek saath bhi efficient hota hai jab indexes sahi jagah ho.',
            filename: 'inner-join.sql',
          }}
          realWorldScenario="Order history page build karo: ek user ke sab delivered orders nikalo saath product names ke. INNER JOIN users, orders, order_items, products — chaaron tables chain mein. Sirf woh rows aate hain jahan sab match karte hain — incomplete data automatically excluded. Ye single query se complete page render ho jaata hai, application mein multiple API calls nahi karne padte."
          commonMistakes={[
            { mistake: 'JOIN condition (ON) bhool jaana', why: 'Cartesian product ban jaata hai — har row har doosri row se multiply', fix: 'Always ON condition specify karo: ON users.id = orders.user_id' },
          ]}
          proTip="Slow JOIN query? Pehle EXPLAIN ANALYZE chalao — Seq Scan dikhega toh missing index hai. Orders table mein user_id pe index: CREATE INDEX idx_orders_user_id ON orders(user_id) — ye ek command se JOIN 10x fast ho sakta hai. Foreign key columns pe indexes hamesha lagao — ye common beginner mistake hai jo production mein expensive padti hai."
        />
      </div>

      <div id="left-right-join">
        <ConceptCard
          title="LEFT JOIN — Saari Left Table Rows"
          emoji="⬅️"
          difficulty="beginner"
          whatIsIt="LEFT JOIN left table ke saare rows return karta hai — match ho ya na ho. Match nahi hua right table mein? Right side ke saare columns NULL ho jaate hain. Ye ek powerful pattern hai: 'mujhe left table ka har record chahiye, aur agar right mein match hai toh wo bhi lao.' NULL wali rows = missing/optional data. LEFT JOIN + WHERE right.id IS NULL = records find karo jinका right mein match hi nahi."
          whenToUse={[
            'Users dikhao chahe orders hon ya na hon',
            'Optional relationships query karne ke liye',
            'Missing data find karne ke liye (NULL check)',
          ]}
          whyUseIt="Admin dashboard banate waqt — saare registered users dikhane hain, chahe unne order kiya ho ya nahi. INNER JOIN se bina orders wale users choot jaate hain, report incomplete hoti hai. LEFT JOIN ensure karta hai koi user chhoot nahi. COALESCE se NULL ko 0 ya 'N/A' mein convert karo — UI pe NULL mat dikhao. Ye pattern CRM, analytics dashboards mein bahut common hai."
          howToUse={{
            code: `-- Saare users — orders hon ya na hon
SELECT
  u.name,
  u.email,
  COUNT(o.id) AS order_count,
  COALESCE(SUM(o.total), 0) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email
ORDER BY total_spent DESC;

-- Users jinke koi orders NAHI hain — NULL trick
SELECT u.name, u.email
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;  -- no matching order

-- Products with optional category
SELECT
  p.name,
  p.price,
  c.name AS category  -- NULL if no category
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;`,
            language: 'sql',
            explanation: 'LEFT JOIN + COUNT(o.id) — users without orders bhi aate hain (count = 0 unke liye kyunki NULL count nahi hota). WHERE o.id IS NULL = anti-join pattern — sirf woh users jinke koi orders nahi hain. COALESCE NULL ko 0 mein convert karta hai — clean output.',
            filename: 'left-join.sql',
          }}
          realWorldScenario="Marketing team ka request: 'un users ki list do jo registered hain lekin koi order nahi kiya' — re-engagement email campaign ke liye. LEFT JOIN + WHERE o.id IS NULL se exactly yahi milta hai. Phir in users ko special discount email bhejo. Ye 'conversion funnel analysis' hai — database query se direct business action."
          commonMistakes={[
            { mistake: 'WHERE clause mein right table filter karna (NULL rows filter ho jaati hain)', why: 'WHERE o.status = "pending" se NULL rows (no orders) eliminate ho jaati hain — effectively INNER JOIN ban jaata hai', fix: 'Right table conditions ko JOIN ON mein rakho ya NULL check add karo: WHERE o.status = "pending" OR o.id IS NULL' },
          ]}
          proTip={'Anti-join pattern — yaad rakhna: LEFT JOIN + WHERE right.id IS NULL. Ye "records dhundho jinke koi match nahi" ka SQL way hai. Orphan records find karo, unsubscribed users nikalo, products find karo jinhe kabhi order nahi hua — sab isi ek pattern se. NOT IN ya NOT EXISTS se bhi same hota hai lekin LEFT JOIN NULL check zyada readable aur often faster hota hai.'}
        />
      </div>

      <div id="normalization">
        <ConceptCard
          title="Normalization — Data Duplication Khatam Karo"
          emoji="🏛️"
          difficulty="intermediate"
          whatIsIt="Normalization ek maths-based process hai jisse data duplication aur update anomalies eliminate hoti hain. 1NF, 2NF, 3NF — teen levels, har level previous ko include karta hai. 1NF: atomic values, no arrays in columns. 2NF: partial dependencies hataao. 3NF: transitive dependencies hataao. Matlab: har fact ek jagah likha ho, ek jagah update karo — sab jagah reflect ho. Ye relational model ka core principle hai."
          whenToUse={[
            'Database schema design karte waqt',
            'Data inconsistency problems solve karte waqt',
            'OLTP (transaction processing) systems mein',
          ]}
          whyUseIt="Real problem: unnormalized orders table mein customer_name aur customer_email har order mein duplicate. Customer ka email change hua — ab 500 order rows update karne padte hain. Ek miss ho gayi toh inconsistent data. Normalize karo: customers alag table, orders mein sirf customer_id. Email ek jagah, ek update, sab consistent. Ye 'single source of truth' principle hai — har data ek jagah, ek baar."
          howToUse={{
            code: `-- BAD: Unnormalized (1NF violation — repeating groups)
-- order_id | customer_name | products (comma-separated!)
-- 1        | Rahul         | "Phone, Case, Charger"

-- 1NF: Atomic values only, no repeating groups
-- (separate table for order items)

-- BAD: 2NF violation (partial dependency)
-- order_id | product_id | product_name | quantity
-- product_name depends ONLY on product_id, not full PK (order_id, product_id)

-- 2NF: Non-key columns must depend on FULL primary key
CREATE TABLE order_items (
  order_id    INTEGER REFERENCES orders(id),
  product_id  INTEGER REFERENCES products(id),
  quantity    INTEGER NOT NULL,  -- depends on BOTH order_id AND product_id
  price       DECIMAL(10,2),     -- price at time of order
  PRIMARY KEY (order_id, product_id)
);

-- BAD: 3NF violation (transitive dependency)
-- student_id | dept_id | dept_name | dept_head
-- dept_name depends on dept_id, not student_id (transitive!)

-- 3NF: No transitive dependencies
CREATE TABLE departments (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(100),
  head  VARCHAR(100)
);
CREATE TABLE students (
  id      SERIAL PRIMARY KEY,
  name    VARCHAR(100),
  dept_id INTEGER REFERENCES departments(id)
);`,
            language: 'sql',
            explanation: '1NF violation = comma-separated values ek column mein — ye searching aur filtering impossible banata hai. 2NF = full primary key pe depend karo, partial dependency nahi. 3NF = non-key column se non-key column depend nahi karna chahiye — transitive chain todna. Har level previous pe build hota hai.',
            filename: 'normalization.sql',
          }}
          realWorldScenario="Meesho jaisi product catalog: 10 lakh products hain. Category 'Mobile Phones' ka naam 'Smartphones' karna hai. Unnormalized: 10 lakh rows update karo, kuch miss hogi, inconsistent data. Normalized: categories table mein ek row update karo — instantly sab 10 lakh products mein reflect. Ye normalization ka practical power hai — ek update, zero inconsistency."
          commonMistakes={[
            { mistake: 'Over-normalization — too many joins', why: 'Har query 10 joins karne padte hain — slow aur complex', fix: 'Balance karo — read-heavy apps mein strategic denormalization (materialized views, caching) better ho sakti hai' },
          ]}
          proTip="Normalization vs denormalization — dono sahi hain different contexts mein. OLTP (online transactions, daily use apps): normalize karo — consistency critical hai. OLAP (analytics, reporting, data warehouse): denormalize karo — star schema, fact tables. Complex JOINs slow hote hain analytics queries mein. Production mein dono ho sakte hain: PostgreSQL normalized OLTP ke liye, ek separate analytics database (BigQuery, Redshift) denormalized OLAP ke liye."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="sql-joins" />
    </div>
  )
}
