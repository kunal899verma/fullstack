'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'HAVING aur WHERE mein kya fark hai?',
    options: [
      { text: 'Koi fark nahi — dono same hain', correct: false, explanation: 'Bahut important execution order fark hai.' },
      { text: 'WHERE rows filter karta hai GROUP BY se pehle; HAVING groups filter karta hai GROUP BY ke baad', correct: true, explanation: 'Sahi! WHERE individual rows pe apply hota hai. HAVING grouped results pe — aggregate functions (COUNT, SUM) HAVING mein use kar sakte hain, WHERE mein nahi.' },
      { text: 'HAVING WHERE se faster hai', correct: false, explanation: 'Performance execution order pe depend karta hai — HAVING zyada data process karta hai kyunki grouping pehle hoti hai.' },
      { text: 'WHERE sirf numbers ke liye hai', correct: false, explanation: 'WHERE kisi bhi data type ke liye kaam karta hai.' },
    ],
  },
  {
    question: 'COUNT(*) aur COUNT(column_name) mein kya fark hai?',
    options: [
      { text: 'Koi fark nahi', correct: false, explanation: 'NULL handling mein fark hai.' },
      { text: 'COUNT(*) saari rows count karta hai (NULLs bhi); COUNT(col) sirf non-NULL values count karta hai', correct: true, explanation: 'Sahi! COUNT(*) har row count karta hai. COUNT(email) sirf woh rows count karta hai jahan email NULL nahi.' },
      { text: 'COUNT(*) slower hai', correct: false, explanation: 'Modern databases mein COUNT(*) optimize hota hai — table stats use karta hai.' },
      { text: 'COUNT(column) faster hai', correct: false, explanation: 'Performance difference negligible hai most cases mein.' },
    ],
  },
  {
    question: 'EXISTS aur IN mein kya fark hai performance ke lihaz se?',
    options: [
      { text: 'Hamesha EXISTS prefer karo', correct: false, explanation: 'Depends on case — large IN lists ke liye EXISTS better, small sets ke liye IN fine.' },
      { text: 'EXISTS early exit karta hai — pehla match milne pe stop; IN saari values check karta hai', correct: true, explanation: 'Sahi! EXISTS correlated subquery mein efficient hai — pehli matching row milte hi true return. IN ke saath sab values evaluate hoti hain pehle.' },
      { text: 'IN hamesha faster hai', correct: false, explanation: 'Small constant value sets ke liye IN fine hai, large/correlated subqueries ke liye EXISTS better.' },
      { text: 'Dono exactly same performance', correct: false, explanation: 'Query optimizer usually optimize karta hai lekin semantically different hain.' },
    ],
  },
  {
    question: 'CASE expression SQL mein kya karta hai?',
    options: [
      { text: 'Stored procedure call karta hai', correct: false, explanation: 'CASE SQL mein conditional expression hai — procedure nahi.' },
      { text: 'Conditional logic provide karta hai — if-else ki tarah', correct: true, explanation: 'Sahi! CASE WHEN condition THEN result ELSE default END — SELECT, WHERE, ORDER BY sab mein use kar sakte hain.' },
      { text: 'Sirf UPDATE mein kaam karta hai', correct: false, explanation: 'CASE kisi bhi SQL clause mein kaam karta hai — SELECT, WHERE, ORDER BY, GROUP BY.' },
      { text: 'Tables switch karta hai', correct: false, explanation: 'CASE conditional expression hai, table switching nahi.' },
    ],
  },
  {
    question: 'COALESCE function kya karta hai?',
    options: [
      { text: 'Do values add karta hai', correct: false, explanation: 'COALESCE addition nahi karta.' },
      { text: 'Pehli non-NULL value return karta hai — NULL handling ke liye', correct: true, explanation: 'Sahi! COALESCE(value1, value2, default) — agar value1 NULL hai toh value2 check karo, woh bhi NULL toh default return karo. NULL handling ka standard way.' },
      { text: 'Null check karta hai (boolean return)', correct: false, explanation: 'IS NULL NULL check karta hai. COALESCE actual value return karta hai.' },
      { text: 'Sirf PostgreSQL mein available hai', correct: false, explanation: 'COALESCE SQL standard function hai — sab databases mein available.' },
    ],
  },
]

export default function DBChapter4Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Aggregations, GROUP BY & Subqueries
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Data summarize karna ek core database skill hai — sales totals, user counts, averages. GROUP BY aur aggregate functions se powerful analytical queries likhte hain. Subqueries aur CASE se aur bhi complex logic possible hai.
        </p>
      </div>

      <div id="aggregate-functions">
        <ConceptCard
          title="Aggregate Functions — Data Summarize Karo"
          emoji="📊"
          difficulty="beginner"
          whatIsIt="Aggregate functions multiple rows ki values ek result mein summarize karte hain — COUNT, SUM, AVG, MIN, MAX."
          whenToUse={[
            'Total sales calculate karne ke liye',
            'Average order value find karne ke liye',
            'Most/least expensive item find karne ke liye',
            'User count janna ho',
          ]}
          whyUseIt="Application code mein array loop se aggregate karna inefficient hai — database mein aggregate karo, indexed data pe bahut fast hota hai."
          howToUse={{
            code: `-- Basic aggregates
SELECT
  COUNT(*) AS total_orders,
  COUNT(shipped_at) AS shipped_orders,  -- non-NULL only
  SUM(total) AS revenue,
  AVG(total) AS avg_order_value,
  MIN(total) AS smallest_order,
  MAX(total) AS largest_order,
  ROUND(AVG(total), 2) AS avg_rounded
FROM orders
WHERE created_at >= '2024-01-01';

-- GROUP BY — category ke saath
SELECT
  category,
  COUNT(*) AS product_count,
  AVG(price) AS avg_price,
  SUM(stock) AS total_stock
FROM products
GROUP BY category
ORDER BY product_count DESC;

-- HAVING — groups filter karo (aggregate conditions)
SELECT
  user_id,
  COUNT(*) AS order_count,
  SUM(total) AS total_spent
FROM orders
WHERE status != 'cancelled'
GROUP BY user_id
HAVING COUNT(*) >= 5         -- sirf frequent buyers
   AND SUM(total) > 10000    -- aur zyada spend karne wale
ORDER BY total_spent DESC
LIMIT 20;`,
            language: 'sql',
            explanation: 'Aggregate functions NULL values skip karte hain (COUNT column ke liye). GROUP BY se category-wise results. HAVING aggregate conditions apply karta hai — WHERE pe nahi.',
            filename: 'aggregations.sql',
          }}
          realWorldScenario="Sales dashboard: monthly revenue, average order value, top 10 customers by spend — sab ek efficient SQL query se. Application layer mein loops nahi lagani."
          commonMistakes={[
            { mistake: 'SELECT mein non-aggregated column without GROUP BY', why: 'SQL error: ambiguous column — kaunsa row ki value leni hai?', fix: 'Har non-aggregated SELECT column GROUP BY mein hona chahiye' },
          ]}
          proTip="COUNT(DISTINCT column) se unique values count karo — COUNT(DISTINCT user_id) se unique active users. Regular COUNT duplicate count karta hai."
        />
      </div>

      <div id="group-by">
        <ConceptCard
          title="GROUP BY & HAVING — Advanced Grouping"
          emoji="📦"
          difficulty="intermediate"
          whatIsIt="GROUP BY same values wale rows ko ek group mein combine karta hai. HAVING us group pe filter lagata hai — WHERE GROUP BY ke baad nahi apply hota."
          whenToUse={[
            'Category-wise, month-wise reports',
            'Top N users/products find karne ke liye',
            'Thresholds check karne ke liye (orders > 5)',
          ]}
          whyUseIt="Complex business reports ek query mein — monthly sales trend, category performance, customer segments sab GROUP BY se."
          howToUse={{
            code: `-- Monthly revenue trend
SELECT
  DATE_TRUNC('month', created_at) AS month,
  COUNT(*) AS orders,
  SUM(total) AS revenue,
  AVG(total) AS avg_order
FROM orders
WHERE status = 'delivered'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month;

-- Multiple GROUP BY columns
SELECT
  DATE_TRUNC('month', created_at) AS month,
  status,
  COUNT(*) AS count
FROM orders
GROUP BY month, status
ORDER BY month, count DESC;

-- ROLLUP — totals automatically
SELECT
  COALESCE(category, 'TOTAL') AS category,
  COUNT(*) AS products,
  SUM(price) AS revenue
FROM products
GROUP BY ROLLUP(category);
-- Last row: TOTAL across all categories

-- FILTER clause (PostgreSQL) — conditional aggregates
SELECT
  COUNT(*) AS total_users,
  COUNT(*) FILTER (WHERE is_premium = true) AS premium_users,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') AS new_users
FROM users;`,
            language: 'sql',
            explanation: 'DATE_TRUNC month grouping se monthly trends. ROLLUP automatic subtotals. FILTER clause se ek query mein multiple conditional counts.',
            filename: 'group-by.sql',
          }}
          realWorldScenario="Business intelligence dashboard: har metric ek query se — ek hi GROUP BY query se revenue by category, by month, by region sab nikalna possible hai."
          commonMistakes={[
            { mistake: 'HAVING mein WHERE wali conditions likhna', why: 'Performance suffer karta hai — GROUP BY ke baad filter hota hai', fix: 'Individual row conditions WHERE mein, aggregate conditions HAVING mein' },
          ]}
          proTip="GROUPING SETS, ROLLUP, CUBE PostgreSQL features hain jo ek query se multiple grouping levels provide karte hain — analytics queries mein bahut powerful."
        />
      </div>

      <div id="subqueries">
        <ConceptCard
          title="Subqueries — Query ke Andar Query"
          emoji="🪆"
          difficulty="intermediate"
          whatIsIt="Subquery ek query hai jo doosri query ke andar hoti hai — SELECT, WHERE, FROM, HAVING mein use ho sakti hai."
          whenToUse={[
            'Aggregate result compare karne ke liye (avg se zyada products)',
            'Correlated filtering (user ki last order)',
            'Derived tables (FROM clause mein subquery)',
          ]}
          whyUseIt="Complex logic ek query mein express kar sakte ho bina application code ke. Often CTEs se zyada readable bhi hoti hain."
          howToUse={{
            code: `-- WHERE mein subquery
SELECT name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);
-- Avg se mehenge products

-- IN ke saath subquery
SELECT name, email
FROM users
WHERE id IN (
  SELECT DISTINCT user_id
  FROM orders
  WHERE created_at > NOW() - INTERVAL '30 days'
);
-- Last 30 din mein order karne wale users

-- EXISTS — efficient correlated subquery
SELECT u.name, u.email
FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.user_id = u.id
    AND o.status = 'delivered'
    AND o.total > 5000
);
-- Users jinke 5000+ ki delivered order hai

-- FROM mein subquery (derived table)
SELECT
  category,
  avg_price,
  RANK() OVER (ORDER BY avg_price DESC) AS price_rank
FROM (
  SELECT category, AVG(price) AS avg_price
  FROM products
  GROUP BY category
) AS category_stats;

-- Scalar subquery — single value
SELECT
  name,
  salary,
  (SELECT AVG(salary) FROM employees) AS company_avg,
  salary - (SELECT AVG(salary) FROM employees) AS diff
FROM employees;`,
            language: 'sql',
            explanation: 'Scalar subquery single value return karta hai. IN subquery matching IDs return karta hai. EXISTS early exit karta hai. FROM subquery derived table banata hai.',
            filename: 'subqueries.sql',
          }}
          realWorldScenario="Recommendation engine: user ki purchase history dekho (subquery), similar category ke products filter karo — complex logic ek efficient query mein."
          commonMistakes={[
            { mistake: 'Correlated subqueries N+1 problem create kar sakte hain', why: 'Har outer row ke liye inner query execute hoti hai — slow for large datasets', fix: 'JOINs ya CTEs se correlated subqueries replace karo jahan possible ho' },
          ]}
          proTip="Subquery vs JOIN: same result zyada cases mein. Query optimizer usually same plan generate karta hai. Code readability ke hisaab se choose karo — performance profile karo toh pata chalega."
        />
      </div>

      <div id="case-expressions">
        <ConceptCard
          title="CASE & NULL Handling — SQL Ka if-else"
          emoji="🔀"
          difficulty="intermediate"
          whatIsIt="CASE SQL mein conditional logic provide karta hai. COALESCE, NULLIF, IS NULL NULL values handle karte hain — NULL database mein special hai."
          whenToUse={[
            'Data transformation — status codes ko readable labels',
            'Conditional aggregation',
            'NULL safe comparisons aur defaults',
          ]}
          whyUseIt={'NULL = NULL false hota hai SQL mein! IS NULL use karna padta hai. COALESCE default values provide karta hai — UI pe "N/A" dikhane ke liye.'}
          howToUse={{
            code: `-- Simple CASE (like switch)
SELECT
  name,
  CASE status
    WHEN 'p' THEN 'Pending'
    WHEN 'a' THEN 'Active'
    WHEN 'c' THEN 'Cancelled'
    ELSE 'Unknown'
  END AS status_label
FROM orders;

-- Searched CASE (like if-else)
SELECT
  name,
  price,
  CASE
    WHEN price < 500 THEN 'Budget'
    WHEN price < 2000 THEN 'Mid-range'
    WHEN price < 10000 THEN 'Premium'
    ELSE 'Luxury'
  END AS price_category
FROM products;

-- Conditional aggregation with CASE
SELECT
  DATE_TRUNC('month', created_at) AS month,
  COUNT(*) AS total,
  SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) AS delivered,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled,
  ROUND(
    100.0 * SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) / COUNT(*),
    1
  ) AS delivery_rate
FROM orders
GROUP BY month ORDER BY month;

-- NULL handling
SELECT
  name,
  COALESCE(phone, 'N/A') AS phone_display,  -- NULL → 'N/A'
  COALESCE(discount, 0) AS discount,         -- NULL → 0
  NULLIF(stock, 0) AS stock_or_null          -- 0 → NULL (for division)
FROM users;

-- NULL comparison — WRONG
-- WHERE email = NULL  ❌ Always false!
-- CORRECT:
WHERE email IS NULL     -- ✅
WHERE email IS NOT NULL -- ✅`,
            language: 'sql',
            explanation: 'CASE multiple conditions handle karta hai. Conditional aggregation CASE + SUM se ek query mein multiple counts. COALESCE NULL ke liye default. NULL = NULL false hai SQL mein — IS NULL use karo.',
            filename: 'case-null.sql',
          }}
          realWorldScenario="Report card query: ek query se pending, delivered, cancelled orders ka count aur percentage — CASE se conditional aggregation. Status codes ko human-readable labels mein convert karo."
          commonMistakes={[
            { mistake: 'NULL = NULL comparison likhna', why: 'SQL mein NULL = NULL hamesha false — undefined = undefined ki tarah', fix: 'IS NULL ya IS NOT NULL use karo. NULL-safe equality: IS NOT DISTINCT FROM' },
          ]}
          proTip="CASE expressions ORDER BY mein bhi kaam karte hain: ORDER BY CASE WHEN status = 'urgent' THEN 0 ELSE 1 END — urgent items pehle sort ho jaate hain."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="sql-aggregations" />
    </div>
  )
}
