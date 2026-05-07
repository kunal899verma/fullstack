'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'CTE (WITH clause) aur subquery mein kya advantage hai?',
    options: [
      { text: 'CTE hamesha faster hai', correct: false, explanation: 'Performance similar hoti hai most cases mein — optimizer usually same plan use karta hai.' },
      { text: 'CTE named aur reusable hoti hai — readability better, ek baar define karo multiple baar reference karo', correct: true, explanation: 'Sahi! CTE complex query ko readable parts mein divide karta hai. Same CTE ko ek query mein multiple baar reference kar sakte hain.' },
      { text: 'CTE sirf SELECT mein use hoti hai', correct: false, explanation: 'CTEs INSERT, UPDATE, DELETE mein bhi use hoti hain.' },
      { text: 'CTE sirf PostgreSQL mein hai', correct: false, explanation: 'CTEs SQL Server, MySQL 8+, PostgreSQL, SQLite — sab mein hain.' },
    ],
  },
  {
    question: 'Window function aur GROUP BY mein kya fark hai?',
    options: [
      { text: 'Koi fark nahi — same results dete hain', correct: false, explanation: 'Fundamentally alag hain — row preservation ka difference.' },
      { text: 'Window functions individual rows preserve karte hain — GROUP BY rows collapse karta hai ek group mein', correct: true, explanation: 'Sahi! ROW_NUMBER(), RANK(), SUM OVER() — har row apni jagah rehti hai lekin aggregate value bhi milti hai. GROUP BY distinct groups banata hai.' },
      { text: 'Window functions GROUP BY se slower hain', correct: false, explanation: 'Performance data aur query pe depend karta hai — generally comparable.' },
      { text: 'Window functions sirf ranking ke liye hain', correct: false, explanation: 'SUM, AVG, LEAD, LAG, FIRST_VALUE — sab window functions hain — ranking se zyada karte hain.' },
    ],
  },
  {
    question: 'JSONB aur JSON PostgreSQL columns mein kya fark hai?',
    options: [
      { text: 'Koi fark nahi', correct: false, explanation: 'Storage format aur querying mein important differences hain.' },
      { text: 'JSONB binary format mein store hota hai — indexed ho sakta hai, faster queries; JSON plain text', correct: true, explanation: 'Sahi! JSONB GIN index support karta hai — complex JSON queries pe bahut fast. JSON sirf text store karta hai — koi indexing, key order preserve hota hai.' },
      { text: 'JSON zyada storage efficient hai', correct: false, explanation: 'JSONB thoda zyada space leta hai lekin performance benefits justify karte hain.' },
      { text: 'JSONB sirf numbers store kar sakta hai', correct: false, explanation: 'JSONB full JSON support karta hai — objects, arrays, strings, numbers, booleans, null.' },
    ],
  },
  {
    question: 'EXPLAIN ANALYZE mein "Seq Scan" dekhna kya indicate karta hai?',
    options: [
      { text: 'Query correct hai', correct: false, explanation: 'Seq Scan correctness indicate nahi karta — performance issue ho sakta hai.' },
      { text: 'Table ki poori rows scan ho rahi hain — index use nahi ho raha', correct: true, explanation: 'Sahi! Seq Scan = Sequential Scan = full table read. Large tables pe ye slow hota hai. Index Scan ya Index Only Scan better hai.' },
      { text: 'Query result empty hai', correct: false, explanation: 'Seq Scan empty result indicate nahi karta.' },
      { text: 'Table mein data nahi hai', correct: false, explanation: 'Seq Scan kisi bhi table pe ho sakta hai — data existence se independent.' },
    ],
  },
  {
    question: 'B-tree index kab best perform karta hai?',
    options: [
      { text: 'Sirf exact match queries pe (=)', correct: false, explanation: 'B-tree range queries pe bhi excellent hai.' },
      { text: 'Equality (=) aur range queries (<, >, BETWEEN, LIKE "prefix%") pe', correct: true, explanation: 'Sahi! B-tree sorted order mein store karta hai — range queries efficient. LIKE "%suffix%" efficient nahi — full-text search use karo.' },
      { text: 'JSON aur array queries pe', correct: false, explanation: 'JSON/array ke liye GIN index better hai.' },
      { text: 'Only DESC order ke liye', correct: false, explanation: 'B-tree ASC aur DESC dono support karta hai.' },
    ],
  },
]

export default function DBChapter5Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          PostgreSQL Deep Dive — Advanced Features
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          PostgreSQL most feature-rich open-source relational database hai — CTEs, window functions, JSONB, full-text search, advanced indexing. Ye features complex problems elegantly solve karte hain.
        </p>
      </div>

      <div id="ctes">
        <ConceptCard
          title="CTEs — WITH Clause — Readable Complex Queries"
          emoji="📝"
          difficulty="intermediate"
          whatIsIt="CTE (Common Table Expression) ek named temporary result set hai jo query ke andar define hoti hai — WITH keyword se. Complex queries ko readable named parts mein divide karta hai."
          whenToUse={[
            'Complex multi-step queries readable banane ke liye',
            'Same subquery ek query mein multiple baar use karne ke liye',
            'Recursive queries ke liye (organizational hierarchy, trees)',
          ]}
          whyUseIt="Nested subqueries hard to read hoti hain. CTEs se ek step ke result ko naam dete hain — next step use karta hai. SQL code documentation ki tarah readable hoti hai."
          howToUse={{
            code: `-- Basic CTE
WITH high_value_orders AS (
  SELECT user_id, SUM(total) AS lifetime_value
  FROM orders
  WHERE status = 'delivered'
  GROUP BY user_id
  HAVING SUM(total) > 50000
),
user_details AS (
  SELECT id, name, email, created_at
  FROM users
  WHERE is_active = true
)
SELECT
  ud.name,
  ud.email,
  hvo.lifetime_value,
  EXTRACT(YEAR FROM AGE(ud.created_at)) AS years_as_customer
FROM user_details ud
INNER JOIN high_value_orders hvo ON ud.id = hvo.user_id
ORDER BY hvo.lifetime_value DESC;

-- Recursive CTE — org hierarchy
WITH RECURSIVE org_tree AS (
  -- Base case: top-level employees
  SELECT id, name, manager_id, 0 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive case: employees with managers
  SELECT e.id, e.name, e.manager_id, ot.level + 1
  FROM employees e
  INNER JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT level, name FROM org_tree ORDER BY level, name;`,
            language: 'sql',
            explanation: 'High_value_orders aur user_details alag CTEs hain — main query dono use karta hai. Recursive CTE org hierarchy traverse karta hai — base case + recursive case.',
            filename: 'ctes.sql',
          }}
          realWorldScenario="Analytics query: monthly cohort analysis, user retention — 5 CTEs chain karo har step ke liye. Query readable documentation ki tarah ban jaati hai."
          commonMistakes={[
            { mistake: 'CTEs ko performance silver bullet samajhna', why: 'PostgreSQL ke older versions mein CTEs optimization fence tha — newer versions mein better', fix: 'Recursive CTEs performance test karo — LATERAL JOIN alternative ho sakta hai' },
          ]}
          proTip="Recursive CTEs se tree structures (categories, org charts, menu items) ko single query mein traverse kar sakte ho — application code mein multiple queries nahi karne padte."
        />
      </div>

      <div id="window-functions">
        <ConceptCard
          title="Window Functions — Rows Preserve Karo + Aggregation"
          emoji="🪟"
          difficulty="intermediate"
          whatIsIt={'Window functions aggregate operations perform karte hain lekin individual rows erase nahi hoti — GROUP BY ki tarah. OVER() clause se "window" define hoti hai.'}
          whenToUse={[
            'Running totals (cumulative sum)',
            'Ranking (rank within category)',
            'Previous/next row compare karna (LAG/LEAD)',
            'Moving averages',
          ]}
          whyUseIt="Sales mein running total ya rank within category — GROUP BY se ek row per group hota hai. Window function mein har row apni jagah rehti hai aur aggregate value bhi milti hai."
          howToUse={{
            code: `-- ROW_NUMBER, RANK, DENSE_RANK
SELECT
  name,
  department,
  salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank,
  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank
FROM employees;

-- Running total (cumulative sum)
SELECT
  created_at::date AS date,
  SUM(total) AS daily_revenue,
  SUM(SUM(total)) OVER (
    ORDER BY created_at::date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM orders
WHERE status = 'delivered'
GROUP BY date ORDER BY date;

-- LAG / LEAD — previous/next row values
SELECT
  month,
  revenue,
  LAG(revenue, 1) OVER (ORDER BY month) AS prev_month_revenue,
  revenue - LAG(revenue, 1) OVER (ORDER BY month) AS growth,
  ROUND(
    100.0 * (revenue - LAG(revenue, 1) OVER (ORDER BY month))
    / NULLIF(LAG(revenue, 1) OVER (ORDER BY month), 0),
    1
  ) AS growth_pct
FROM monthly_revenue;

-- FIRST_VALUE / LAST_VALUE — per partition
SELECT
  name, department, salary,
  FIRST_VALUE(name) OVER (
    PARTITION BY department ORDER BY salary DESC
  ) AS top_earner_in_dept
FROM employees;`,
            language: 'sql',
            explanation: 'PARTITION BY se group ke andar window define hoti hai. ORDER BY window ke andar sorting. ROW_NUMBER unique, RANK ties mein same number, DENSE_RANK no gaps. LAG previous row value deta hai.',
            filename: 'window-functions.sql',
          }}
          realWorldScenario="Leaderboard: rank players by score within each game category — RANK() OVER (PARTITION BY category ORDER BY score DESC). Monthly growth report — LAG se previous month revenue comparison."
          commonMistakes={[
            { mistake: 'Window function WHERE clause mein use karna', why: 'Window functions GROUP BY ke baad execute hoti hain — WHERE ke baad', fix: 'CTE ya subquery mein window function use karo, outer query mein filter karo' },
          ]}
          proTip="ROWS BETWEEN clause se custom windows define karo: ROWS BETWEEN 6 PRECEDING AND CURRENT ROW se 7-day moving average. Powerful analytics without any application code."
        />
      </div>

      <div id="jsonb">
        <ConceptCard
          title="JSONB — PostgreSQL Ka JSON Superpower"
          emoji="🗄️"
          difficulty="intermediate"
          whatIsIt="JSONB PostgreSQL ka binary JSON column type hai — regular JSON se faster queries, GIN indexing support, aur powerful operators."
          whenToUse={[
            'Flexible/variable schema data store karne ke liye',
            'User preferences, settings, metadata',
            'Semi-structured data (product attributes vary by category)',
          ]}
          whyUseIt="Product attributes — phones mein RAM/storage, shirts mein size/color — JSONB mein flexible store hote hain bina alter table ke. Complex filtering bhi fast hoti hai."
          howToUse={{
            code: `-- Table with JSONB column
CREATE TABLE products (
  id      SERIAL PRIMARY KEY,
  name    VARCHAR(200),
  price   DECIMAL(10,2),
  attrs   JSONB  -- flexible attributes
);

INSERT INTO products (name, price, attrs) VALUES
('iPhone 15', 79999, '{"brand": "Apple", "storage": 128, "colors": ["black", "white"]}'),
('Samsung S24', 74999, '{"brand": "Samsung", "storage": 256, "colors": ["gray"]}');

-- JSONB operators
-- -> returns JSON (object/array)
-- ->> returns text
SELECT
  name,
  attrs -> 'brand' AS brand_json,      -- "Apple" (JSON)
  attrs ->> 'brand' AS brand_text,     -- Apple (text)
  attrs ->> 'storage' AS storage,
  (attrs ->> 'storage')::integer AS storage_num,
  attrs -> 'colors' -> 0 AS first_color  -- first array element
FROM products;

-- Filter with JSONB
SELECT name FROM products
WHERE attrs ->> 'brand' = 'Apple';

-- @> (contains) operator
SELECT name FROM products
WHERE attrs @> '{"brand": "Apple"}';  -- contains key-value

-- GIN index for fast JSONB queries
CREATE INDEX idx_products_attrs ON products USING GIN (attrs);
CREATE INDEX idx_products_brand ON products USING GIN ((attrs -> 'brand'));

-- Update JSONB
UPDATE products
SET attrs = attrs || '{"rating": 4.5}'  -- merge
WHERE id = 1;

UPDATE products
SET attrs = attrs - 'old_field'  -- remove key
WHERE id = 1;`,
            language: 'sql',
            explanation: '-> JSON object/array return karta hai. ->> text string return karta hai. @> contains operator fast filtering ke liye. GIN index JSONB queries dramatically fast karta hai.',
            filename: 'jsonb.sql',
          }}
          realWorldScenario="E-commerce product attributes: saari categories ek table mein — phones mein specs, clothes mein sizing, books mein authors — JSONB mein flexible store karo, filter bhi fast karo."
          commonMistakes={[
            { mistake: 'GIN index add karna bhool jaana', why: 'Bina index ke JSONB queries Seq Scan karte hain — slow on large tables', fix: 'USING GIN (attrs) index add karo JSONB column pe' },
          ]}
          proTip="JSONB jsonb_agg() se rows ko JSON array mein aggregate kar sakte hain. jsonb_each() se JSONB ko rows mein expand — powerful data transformation queries banati hain."
        />
      </div>

      <div id="explain-analyze">
        <ConceptCard
          title="EXPLAIN ANALYZE — Query Plan Padhna"
          emoji="🔍"
          difficulty="advanced"
          whatIsIt="EXPLAIN ANALYZE actual execution plan show karta hai — rows count, execution time, index usage, join strategies. Slow queries diagnose karne ka primary tool."
          whenToUse={[
            'Slow query optimize karte waqt',
            'Index effective hai ya nahi check karne ke liye',
            'Large table queries profile karne ke liye',
          ]}
          whyUseIt="Bina execution plan dekhe query optimize karna andhere mein teer chalana hai. EXPLAIN se actual bottleneck dikhai deta hai."
          howToUse={{
            code: `-- Basic EXPLAIN
EXPLAIN SELECT * FROM orders WHERE user_id = 42;

-- ANALYZE: actually execute karo, real timing dikho
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;

-- BUFFERS: cache hits/misses bhi dikho
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5;

-- Output samajhna:
/*
Hash Join  (cost=245.00..890.50 rows=1500 width=50)
           (actual time=12.3..45.6 rows=1234 loops=1)
  Hash Cond: (o.user_id = u.id)
  ->  Seq Scan on orders o  (cost=0..580.00 rows=25000...)
      Filter: (status = 'delivered')
  ->  Hash  (cost=125.00..125.00 rows=9600...)
      ->  Index Scan using users_pkey on users u

cost=start_cost..total_cost
rows=estimated_rows
actual time=ms..ms rows=actual_rows

Seq Scan: Full table scan — index nahi! Add karo
Index Scan: Index use ho raha hai ✅
Hash Join: Large tables ke liye efficient
*/

-- Index add karo aur compare karo
CREATE INDEX idx_orders_user_id ON orders(user_id);
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;
-- Ab Index Scan dikhega instead of Seq Scan!`,
            language: 'sql',
            explanation: 'EXPLAIN output mein Seq Scan slow hota hai large tables pe. Index Scan fast. cost= estimated work, actual time= real ms. rows= estimate vs actual rows fark hoga toh statistics stale hain (ANALYZE run karo).',
            filename: 'explain-analyze.sql',
          }}
          realWorldScenario="Production mein slow API endpoint — EXPLAIN ANALYZE se pata chalta hai ki 50,000 rows scan ho rahi hain. user_id index add karne se 10ms se 0.2ms — 50x speedup."
          commonMistakes={[
            { mistake: 'EXPLAIN bina ANALYZE ke production pe — sirf estimated plan', why: 'Estimated plan real plan se alag ho sakta hai — statistics stale hain', fix: 'Development/staging pe EXPLAIN ANALYZE run karo, ANALYZE table regularly' },
          ]}
          proTip="explain.dalibo.com ya pganalyze pe EXPLAIN output paste karo — visual plan milta hai jo much easier to understand hota hai than plain text."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="postgresql-advanced" />
    </div>
  )
}
