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
          PostgreSQL sirf ek database nahi — ye ek engineering marvel hai. CTEs, window functions, JSONB, full-text search, advanced indexing, extensions, row-level security — ye sab ek open-source database mein free milta hai. Lekin in features ka real power tab aata hai jab tum samjho ye under the hood kaise kaam karte hain. Index ek phone book hai database ka — naam se number dhundna O(1), poori book padhna O(n). Ye chapter PostgreSQL ke advanced tools sikhaata hai — aur ye bhi sikhaata hai ki EXPLAIN ANALYZE se kaise verify karo ki query sach mein fast hai.
        </p>
      </div>

      <div id="ctes">
        <ConceptCard
          title="CTEs — WITH Clause — Readable Complex Queries"
          emoji="📝"
          difficulty="intermediate"
          whatIsIt="CTE (Common Table Expression) — WITH keyword se ek named temporary result set banao. Complex queries ko readable named parts mein divide karo — jaise code mein functions hote hain. Ek CTE ek query mein multiple baar reference kar sakte ho. Recursive CTEs tree structures traverse karte hain — organizational hierarchy, category trees, menu items sab ek query mein. Under the hood: PostgreSQL CTE ko optimization fence ki tarah use karta tha (older versions) — newer versions mein optimizer inline kar sakta hai."
          whenToUse={[
            'Complex multi-step queries readable banane ke liye',
            'Same subquery ek query mein multiple baar use karne ke liye',
            'Recursive queries ke liye (organizational hierarchy, trees)',
          ]}
          whyUseIt="Code mein nested functions padhna mushkil hota hai — same problem SQL nested subqueries ke saath. CTE ek step ka result name deta hai — next step us naam se use karta hai. SQL documentation ki tarah readable ban jaati hai: 'high_value_orders', 'user_details' — naam se samajh aata hai kya ho raha hai. Team mein kisi aur ko ye query maintain karni padegi — readable SQL ek professional skill hai."
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
            explanation: 'High_value_orders pehle compute hota hai, user_details alag — main query dono join karta hai. Har CTE ek step hai, readable chain. Recursive CTE = base case (managers without managers) + recursive case (employees with managers) — tree ko level by level traverse karta hai. UNION ALL — same structure, recursive step.',
            filename: 'ctes.sql',
          }}
          realWorldScenario="User retention analysis: users ka signup month nikalo (CTE 1), har user ki first order month nikalo (CTE 2), cohort assign karo (CTE 3), month-wise retention calculate karo (CTE 4), percentage nikalo (CTE 5). Ye 5 CTEs chain karo — poori cohort analysis ek query mein. Ye wahi query hai jise companies hire karte waqt data engineering rounds mein poochhti hain."
          commonMistakes={[
            { mistake: 'CTEs ko performance silver bullet samajhna', why: 'PostgreSQL ke older versions mein CTEs optimization fence tha — newer versions mein better', fix: 'Recursive CTEs performance test karo — LATERAL JOIN alternative ho sakta hai' },
          ]}
          proTip="Recursive CTE se category tree ek query mein — koi application-side recursion nahi. Depth limit lagao infinite loops se bachne ke liye: WHERE level < 10. Aur CTE ko MATERIALIZED hint de sakte ho (PostgreSQL 12+) agar optimizer wrong plan choose kar raha ho: WITH MATERIALIZED cte_name AS (...) — ye CTE ko optimization fence banata hai, baaki query independent se optimize hoti hai."
        />
      </div>

      <div id="window-functions">
        <ConceptCard
          title="Window Functions — Rows Preserve Karo + Aggregation"
          emoji="🪟"
          difficulty="intermediate"
          whatIsIt={'Window functions — ye GROUP BY aur aggregate ka hybrid hai. GROUP BY rows collapse karta hai ek group mein. Window functions har row apni jagah rakhti hain lekin saath mein aggregate value bhi dete hain. OVER() clause se "window" define hoti hai — kaunsi rows consider karo is aggregate mein. PARTITION BY se group banao window ke andar. Ye ek powerful concept hai jo complex analytics queries ko dramatically simple banata hai.'}
          whenToUse={[
            'Running totals (cumulative sum)',
            'Ranking (rank within category)',
            'Previous/next row compare karna (LAG/LEAD)',
            'Moving averages',
          ]}
          whyUseIt="Rank within a category — GROUP BY se ye nahi hoga kyunki GROUP BY rows collapse karta hai. Running total — GROUP BY se har row ka cumulative sum nahi milega. Previous row se compare karna (month-over-month growth) — GROUP BY se impossible. Window functions se ye sab possible hai har row preserve karke. Ye business analytics ka superpower hai — complex reports ek query mein."
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
            explanation: 'PARTITION BY = GROUP BY jaisa lekin rows erase nahi hoti. ORDER BY window ke andar rows ko sort karta hai aggregate ke liye. ROW_NUMBER unique number (ties mein arbitrary), RANK ties pe same number + gap (1,1,3), DENSE_RANK ties pe same number + no gap (1,1,2). LAG = previous row ka value, LEAD = next row ka value — time-series analysis ke liye essential.',
            filename: 'window-functions.sql',
          }}
          realWorldScenario="Gaming leaderboard: top 3 players har game category mein — RANK() OVER (PARTITION BY category ORDER BY score DESC), phir outer query mein WHERE rank <= 3. Monthly growth report: LAG(revenue, 1) se previous month, current - previous = absolute growth, percentage calculate karo — yahi financial dashboards mein dikhta hai. Dono ek window function se."
          commonMistakes={[
            { mistake: 'Window function WHERE clause mein use karna', why: 'Window functions GROUP BY ke baad execute hoti hain — WHERE ke baad', fix: 'CTE ya subquery mein window function use karo, outer query mein filter karo' },
          ]}
          proTip="ROWS BETWEEN custom windows ke liye — 7-day moving average: SUM(revenue) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) / 7.0. Ye stock price moving average, sales trend smoothing — sab ek clause se. UNBOUNDED PRECEDING = beginning of partition se. UNBOUNDED FOLLOWING = end tak. Application code mein koi sliding window loop nahi — pure SQL."
        />
      </div>

      <div id="jsonb">
        <ConceptCard
          title="JSONB — PostgreSQL Ka JSON Superpower"
          emoji="🗄️"
          difficulty="intermediate"
          whatIsIt="JSONB — PostgreSQL ka superpower jo MongoDB ko irrelevant banata hai 90% cases mein. Binary JSON column type hai — regular JSON column se alag: JSONB binary format mein store hota hai, GIN index support karta hai, fast queries deta hai. JSON plain text store karta hai — key order preserve hoti hai, lekin koi indexing nahi, slow queries. Hamesha JSONB choose karo JSON ke upar. Ye ek structured SQL schema + flexible document storage ka best combination hai."
          whenToUse={[
            'Flexible/variable schema data store karne ke liye',
            'User preferences, settings, metadata',
            'Semi-structured data (product attributes vary by category)',
          ]}
          whyUseIt="E-commerce ka real problem: phones mein RAM/storage/battery attributes, shirts mein size/color, books mein ISBN/author — sab different. Ek SQL table mein sab fit nahi hota bina NULL columns ke. JSONB mein har product apne attributes freely store karta hai — ALTER TABLE nahi karna padta har naye attribute pe. Aur GIN index ke saath JSONB queries bhi fast hoti hain — full table scan nahi. Ye flexibility + performance ka combination hai jo JSONB ko special banata hai."
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
            explanation: '-> JSON type return karta hai (object/array). ->> text string return karta hai (type cast ke liye). @> contains operator — GIN indexed, blazing fast. GIN index JSONB queries ke liye mandatory hai production mein — bina index Seq Scan hogi, 10x slow. Merge (||) aur remove (-) JSONB update ke liye clean operators hain.',
            filename: 'jsonb.sql',
          }}
          realWorldScenario="Ek real e-commerce decision: har product category ke liye alag table banao ya ek products table with JSONB attrs? Alag tables = schema migration nightmare har naye attribute pe. JSONB = ek table, flexible attributes, GIN indexed filtering. Brands = 'Apple' filter karo on millions of products — @> operator + GIN index = milliseconds mein result. Ye wahi reason hai Shopify jaise platforms flexible product schema ke liye similar approach use karte hain."
          commonMistakes={[
            { mistake: 'GIN index add karna bhool jaana', why: 'Bina index ke JSONB queries Seq Scan karte hain — slow on large tables', fix: 'USING GIN (attrs) index add karo JSONB column pe' },
          ]}
          proTip="jsonb_agg() se rows ko JSON array mein aggregate karo — ek query mein nested objects banao jo directly API response mein fit ho. jsonb_each() se JSONB ko rows mein expand karo — EAV pattern queries possible. Partial index on JSONB: CREATE INDEX ON products ((attrs->>'brand')) WHERE attrs->>'brand' IS NOT NULL — sirf brand wale products index mein, efficient aur small index."
        />
      </div>

      <div id="explain-analyze">
        <ConceptCard
          title="EXPLAIN ANALYZE — Query Plan Padhna"
          emoji="🔍"
          difficulty="advanced"
          whatIsIt="EXPLAIN ANALYZE — database engine ka X-ray machine. Query optimizer ka actual plan dikhata hai: kaunsa index use hua, kitne rows scan hue, kitna time laga, kaunsa join algorithm choose hua. EXPLAIN sirf estimated plan, EXPLAIN ANALYZE actually execute karta hai aur real numbers deta hai. Slow query hai? EXPLAIN ANALYZE pehla tool hai — bina ye dekhe optimize karna andhere mein kaam karna hai."
          whenToUse={[
            'Slow query optimize karte waqt',
            'Index effective hai ya nahi check karne ke liye',
            'Large table queries profile karne ke liye',
          ]}
          whyUseIt="Production mein slow API endpoint hai — kya index miss hai? Kya join wrong order mein hai? Kya table statistics stale hain? Ye sab EXPLAIN ANALYZE ke output mein visible hai. Seq Scan dikhna = index missing ya not used. Estimated rows vs actual rows bahut alag = statistics stale, ANALYZE karo. Cost numbers high = bottleneck wahan. Ye tool seekhna ek superpower hai — slow queries fix karna guess work se nahi, data se hoga."
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
            explanation: 'Seq Scan = full table read — large tables pe warning sign. Index Scan = index use ho raha hai, fast. cost=start..total: start cost = first row milne ka kaam, total = poora kaam. actual time=start..end ms: real execution time. rows estimate vs actual bahut alag = ANALYZE table run karo — statistics stale hain. BUFFERS: shared hit = cache se, read = disk se — disk reads expensive hain.',
            filename: 'explain-analyze.sql',
          }}
          realWorldScenario="Real production story: /api/orders endpoint 800ms le raha tha. EXPLAIN ANALYZE chalaya — Seq Scan on orders table, 50,000 rows scan. user_id column pe index missing tha. CREATE INDEX idx_orders_user_id ON orders(user_id); — ek command. Next request: 15ms. 53x speedup, ek index se. Ye EXPLAIN ANALYZE ki power hai — problem visible ho gayi, solution obvious tha."
          commonMistakes={[
            { mistake: 'EXPLAIN bina ANALYZE ke production pe — sirf estimated plan', why: 'Estimated plan real plan se alag ho sakta hai — statistics stale hain', fix: 'Development/staging pe EXPLAIN ANALYZE run karo, ANALYZE table regularly' },
          ]}
          proTip="Plain text EXPLAIN output padhna mushkil lagta hai? explain.dalibo.com pe paste karo — visual tree milta hai, bottlenecks highlight hote hain, recommendations milte hain. pganalyze production monitoring ke liye use karo — slow queries automatically track hote hain. Aur CREATE INDEX CONCURRENTLY use karo production pe — regular CREATE INDEX table lock karta hai, CONCURRENTLY background mein banata hai, zero downtime."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="postgresql-advanced" />
    </div>
  )
}
