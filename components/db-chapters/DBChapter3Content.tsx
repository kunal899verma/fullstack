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
          Real databases mein data multiple tables mein hota hai — users, orders, products alag-alag tables. JOINs se inhe ek saath query kar sakte ho. Relationships aur normalization se data duplication avoid hoti hai.
        </p>
      </div>

      <div id="primary-foreign-keys">
        <ConceptCard
          title="Primary & Foreign Keys — Data Ka Backbone"
          emoji="🔑"
          difficulty="beginner"
          whatIsIt="Primary key har row ko uniquely identify karta hai. Foreign key doosri table ke primary key ko reference karta hai — relationships ke liye."
          whenToUse={[
            'Har table mein primary key hona chahiye',
            'Related tables ko connect karne ke liye foreign key',
            'Referential integrity enforce karne ke liye',
          ]}
          whyUseIt="Keys se data consistent rehta hai — orphaned records nahi bante (order without a customer). Joins fast hote hain indexed keys pe."
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
            explanation: 'users.id primary key. orders.user_id foreign key — user delete pe CASCADE se orders bhi delete. student_courses junction table many-to-many implement karta hai.',
            filename: 'schema.sql',
          }}
          realWorldScenario="E-commerce: users, products, orders, order_items — sab tables foreign keys se connected. orders.user_id ensure karta hai ki orphan orders nahi bante."
          commonMistakes={[
            { mistake: 'ON DELETE action specify nahi karna', why: 'Default RESTRICT parent delete block kar deta hai — ya NULL set hota hai FK pe', fix: 'Always specify: ON DELETE CASCADE ya ON DELETE SET NULL ya RESTRICT' },
          ]}
          proTip="Composite primary keys junction tables mein use karo (student_id, course_id) — separate id column unnecessary hai aur duplicate enrollments block hoti hain."
        />
      </div>

      <div id="inner-join">
        <h2 className="text-xl font-display font-bold text-[#F5F5F7] mb-3" id="join-types">Join Types — Visual Overview</h2>
        <JoinsDiagram />
        <ConceptCard
          title="INNER JOIN — Sirf Match Karne Wale Rows"
          emoji="⚡"
          difficulty="beginner"
          whatIsIt="INNER JOIN sirf woh rows return karta hai jahan dono tables mein matching record ho. Koi match nahi — row exclude ho jaata hai."
          whenToUse={[
            'Jab sirf complete data chahiye (user + order dono exist karein)',
            'Most common join type in practice',
          ]}
          whyUseIt="Users aur unke orders ek saath — sirf woh users jinke orders hain. Incomplete/orphan data exclude ho jaata hai."
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
            explanation: 'INNER JOIN users aur orders ko user_id pe join karta hai. Multiple JOINs chain karke 4 tables ek saath query. INNER keyword optional hai — JOIN alone bhi INNER JOIN hai.',
            filename: 'inner-join.sql',
          }}
          realWorldScenario="Order history page: user ki delivered orders dikhao — sirf woh users jinke deliver orders hain. INNER JOIN se customers without orders automatically exclude hote hain."
          commonMistakes={[
            { mistake: 'JOIN condition (ON) bhool jaana', why: 'Cartesian product ban jaata hai — har row har doosri row se multiply', fix: 'Always ON condition specify karo: ON users.id = orders.user_id' },
          ]}
          proTip="JOIN condition mein indexed columns use karo — performance bahut better hoti hai. user_id pe index chahiye orders table mein."
        />
      </div>

      <div id="left-right-join">
        <ConceptCard
          title="LEFT JOIN — Saari Left Table Rows"
          emoji="⬅️"
          difficulty="beginner"
          whatIsIt="LEFT JOIN left table ke saare rows return karta hai, chahe right table mein match ho ya na ho. Match nahi hoga toh right columns NULL honge."
          whenToUse={[
            'Users dikhao chahe orders hon ya na hon',
            'Optional relationships query karne ke liye',
            'Missing data find karne ke liye (NULL check)',
          ]}
          whyUseIt="User report mein saare users dikhane hain — orders wale aur bina orders wale dono. INNER JOIN se bina orders wale users choot jaate."
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
            explanation: 'LEFT JOIN + COUNT(o.id) — users without orders bhi aate hain (count = 0). WHERE o.id IS NULL — sirf woh users jo orders nahi hai. COALESCE NULL ko 0 mein convert karta hai.',
            filename: 'left-join.sql',
          }}
          realWorldScenario="Admin dashboard mein user stats: saare registered users dikhao unke order count ke saath — 0 orders wale bhi dikhne chahiye taaki marketing team target kar sake."
          commonMistakes={[
            { mistake: 'WHERE clause mein right table filter karna (NULL rows filter ho jaati hain)', why: 'WHERE o.status = "pending" se NULL rows (no orders) eliminate ho jaati hain — effectively INNER JOIN ban jaata hai', fix: 'Right table conditions ko JOIN ON mein rakho ya NULL check add karo: WHERE o.status = "pending" OR o.id IS NULL' },
          ]}
          proTip={'"Find records without a match" pattern: LEFT JOIN + WHERE right.id IS NULL. Yahi anti-join ka SQL way hai — orphan records find karne ke liye.'}
        />
      </div>

      <div id="normalization">
        <ConceptCard
          title="Normalization — Data Duplication Khatam Karo"
          emoji="🏛️"
          difficulty="intermediate"
          whatIsIt="Normalization database design process hai jisse data duplication aur update anomalies eliminate hoti hain. 1NF, 2NF, 3NF — teen levels."
          whenToUse={[
            'Database schema design karte waqt',
            'Data inconsistency problems solve karte waqt',
            'OLTP (transaction processing) systems mein',
          ]}
          whyUseIt="Unnormalized table mein customer address ek baar change karni ho toh hazaron rows update karni padengi. Normalization se ek jagah update."
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
            explanation: '1NF: atomic values, no arrays. 2NF: partial dependencies hataao. 3NF: transitive dependencies hataao. Har level previous level include karta hai.',
            filename: 'normalization.sql',
          }}
          realWorldScenario="Product catalog: products, categories, brands alag tables. Product category change karo ek jagah — 10,000 product rows mein manually update nahi karna. Referential integrity automatic."
          commonMistakes={[
            { mistake: 'Over-normalization — too many joins', why: 'Har query 10 joins karne padte hain — slow aur complex', fix: 'Balance karo — read-heavy apps mein strategic denormalization (materialized views, caching) better ho sakti hai' },
          ]}
          proTip="OLTP (transactional) apps: normalize karo. OLAP (analytics/reporting) apps: denormalize karo (star schema, fact tables). Different problems, different optimal designs."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="sql-joins" />
    </div>
  )
}
