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
          Data summarize karna ek core database skill hai — sales totals, user counts, averages. Lekin ye andar se kaise kaam karta hai? GROUP BY ke baad database ek sorting pass karta hai — similar values ek jagah aate hain, phir aggregate functions har group pe apply hote hain. Ye samajhna zaroori hai taaki slow GROUP BY queries optimize kar sako. Subqueries aur CASE se complex business logic SQL mein seedha express ho jaata hai — application code mein loop nahi lagani padti.
        </p>
      </div>

      <div id="aggregate-functions">
        <ConceptCard
          title="Aggregate Functions — Data Summarize Karo"
          emoji="📊"
          difficulty="beginner"
          whatIsIt="Aggregate functions multiple rows ki values collapse karke ek single result dete hain — COUNT, SUM, AVG, MIN, MAX. Ye database engine ke andar highly optimized operations hain — indexed data pe milliseconds mein million rows process ho jaate hain. COUNT(*) har row count karta hai (NULLs bhi). COUNT(column) sirf non-NULL values. SUM/AVG NULL values ignore karte hain — ek gotcha jo unexpected results de sakti hai."
          whenToUse={[
            'Total sales calculate karne ke liye',
            'Average order value find karne ke liye',
            'Most/least expensive item find karne ke liye',
            'User count janna ho',
          ]}
          whyUseIt="Application code mein 10,000 orders fetch karo phir JavaScript mein sum karo — ye 10,000 rows network pe travel karte hain, memory mein load hote hain, JavaScript loop lagti hai. Database mein aggregate karo — sirf ek number wapas aata hai. Database indexed data pe aggregate karna C mein optimized hai, JavaScript loops se 100x fast. Ye engineering decision hai — data process karo wahan jahan data hai."
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
            explanation: 'COUNT(*) saari rows, COUNT(col) non-NULL only — ye difference NULL data mein unexpected results deta hai. GROUP BY internally sort + group karta hai — expensive operation large data pe. HAVING aggregate conditions ke liye hai — WHERE individual rows pe, HAVING groups pe. SQL execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.',
            filename: 'aggregations.sql',
          }}
          realWorldScenario="Startup ke founder ne pucha: 'aaj kitna revenue aaya, average order value kya hai, kaun top 10 customers hain?' Teen separate questions — ek efficient SQL query mein sab nikal aata hai. Database engine sort + group karta hai, aggregate compute karta hai, sort karta hai — sab server side. Application sirf result display karta hai. Ye real dashboard engineering hai."
          commonMistakes={[
            { mistake: 'SELECT mein non-aggregated column without GROUP BY', why: 'SQL error: ambiguous column — kaunsa row ki value leni hai?', fix: 'Har non-aggregated SELECT column GROUP BY mein hona chahiye' },
          ]}
          proTip="COUNT(DISTINCT user_id) se unique active users nikalo — COUNT(*) duplicate count karta hai (ek user ke 5 orders = 5 count). Ye distinction analytics mein bahut important hai. PostgreSQL mein FILTER clause aur bhi powerful hai: COUNT(*) FILTER (WHERE status = 'delivered') AS delivered_count — conditional aggregation ek line mein, separate GROUP BY nahi chahiye."
        />
      </div>

      <div id="group-by">
        <ConceptCard
          title="GROUP BY & HAVING — Advanced Grouping"
          emoji="📦"
          difficulty="intermediate"
          whatIsIt="GROUP BY same values wale rows collapse karke ek group banata hai — phir har group pe aggregate apply hota hai. HAVING us collapsed group pe filter karta hai. Critical distinction: WHERE individual rows pe apply hota hai GROUP BY se pehle, HAVING grouped results pe apply hota hai GROUP BY ke baad. HAVING mein aggregate functions use kar sakte ho — WHERE mein nahi. Execution order: WHERE rows filter → GROUP BY group banao → HAVING groups filter."
          whenToUse={[
            'Category-wise, month-wise reports',
            'Top N users/products find karne ke liye',
            'Thresholds check karne ke liye (orders > 5)',
          ]}
          whyUseIt="Business intelligence ka core tool hai GROUP BY — monthly sales trend, category-wise performance, customer segments, cohort analysis sab isi se nikalta hai. Bina GROUP BY ke har metric ke liye alag query chahiye. GROUP BY ke saath ek query mein poora dashboard data nikal aata hai. ROLLUP se automatic subtotals — total across all groups bina extra query ke."
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
            explanation: 'DATE_TRUNC month pe group — ye month-wise trends ka standard pattern hai. ROLLUP ek power feature hai: automatically grand total row add karta hai, alag SUM query nahi karna padta. FILTER clause modern PostgreSQL ka underused gem hai — multiple conditional aggregates ek query mein, GROUP BY se cleaner.',
            filename: 'group-by.sql',
          }}
          realWorldScenario="Ek fintech startup ka weekly review meeting: 'Monthly revenue trend dikhao, aur saath mein category-wise breakdown bhi.' Naive approach: 2 separate queries + JavaScript merge. Smart approach: GROUP BY DATE_TRUNC('month', ...), category — ek query, sab kuch. Ye wahi difference hai junior aur senior engineer ke approach mein — database ko kaam karne do."
          commonMistakes={[
            { mistake: 'HAVING mein WHERE wali conditions likhna', why: 'Performance suffer karta hai — GROUP BY ke baad filter hota hai', fix: 'Individual row conditions WHERE mein, aggregate conditions HAVING mein' },
          ]}
          proTip="PostgreSQL ka GROUPING SETS, ROLLUP, CUBE — ye teen advanced GROUP BY variants hain jo multiple grouping levels ek query mein dete hain. ROLLUP (year, month) se yearly totals, monthly totals, aur grand total teeno ek saath. CUBE se har possible combination. GROUPING SETS se custom combinations. Analytics reports ke liye ye tools application code ko dramatically simplify karte hain."
        />
      </div>

      <div id="subqueries">
        <ConceptCard
          title="Subqueries — Query ke Andar Query"
          emoji="🪆"
          difficulty="intermediate"
          whatIsIt="Subquery ek query ke andar doosri query hai — SQL ka nesting. WHERE mein subquery: filter value dynamically compute karo. FROM mein subquery (derived table): pehle ek intermediate result banao, phir us pe query karo. EXISTS subquery early exit karta hai — pehla match milte hi stop, saari values evaluate nahi karta. Correlated subquery: outer query ki har row ke liye inner query run hoti hai — powerful lekin N+1 problem ka source bhi."
          whenToUse={[
            'Aggregate result compare karne ke liye (avg se zyada products)',
            'Correlated filtering (user ki last order)',
            'Derived tables (FROM clause mein subquery)',
          ]}
          whyUseIt="N+1 problem ek khamoshi se app ko barbad karne wala bug hai — aur correlated subqueries iska ek common source hain. Har outer row ke liye inner query run hoti hai: 1000 users ke liye 1000 inner queries = N+1. Lekin sahi jagah subqueries bahut powerful hain — dynamic filter values, derived tables, EXISTS checks. Rule: agar subquery ek baar run hoti hai (scalar ya uncorrelated) — theek hai. Agar har outer row ke liye run hoti hai — JOIN ya CTE se replace karo."
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
            explanation: 'Scalar subquery single value return karta hai — ek baar run, value substitute. IN subquery matching IDs return karta hai — whole list evaluate hoti hai. EXISTS early exit karta hai — pehla match milte hi stop, faster for large datasets. FROM subquery derived table banata hai — pehle group karo, phir rank karo, ek shot mein.',
            filename: 'subqueries.sql',
          }}
          realWorldScenario="'Average se mehenge products dikhao' — ye ek subquery ka classic use case hai: WHERE price > (SELECT AVG(price) FROM products). AVG pehle calculate hota hai, phir filter apply hota hai. Recommendation engine mein: user ki purchase categories nikalo (subquery), un categories ke naye products filter karo — complex personalization logic ek SQL query mein, koi application-side loop nahi."
          commonMistakes={[
            { mistake: 'Correlated subqueries N+1 problem create kar sakte hain', why: 'Har outer row ke liye inner query execute hoti hai — slow for large datasets', fix: 'JOINs ya CTEs se correlated subqueries replace karo jahan possible ho' },
          ]}
          proTip="Subquery vs JOIN vs CTE — kab kya? Subquery: simple, ek jagah, readability ke liye. JOIN: performance critical, index use hoga. CTE (WITH): complex multi-step logic, reusable intermediate results. Query optimizer usually same plan generate karta hai in teeno mein. Profile karo EXPLAIN ANALYZE se — gut feeling pe mat jao. Aur correlated subqueries hamesha suspect karo: N+1 problem ka check karo."
        />
      </div>

      <div id="case-expressions">
        <ConceptCard
          title="CASE & NULL Handling — SQL Ka if-else"
          emoji="🔀"
          difficulty="intermediate"
          whatIsIt="CASE SQL ka if-else hai — SELECT mein, WHERE mein, ORDER BY mein, GROUP BY mein — har jagah kaam karta hai. NULL database mein ek special creature hai: NULL = NULL bhi FALSE hai SQL mein! Ye three-valued logic hai — TRUE, FALSE, NULL. Ye samajhna critical hai kyunki bahut saare bugs sirf is misunderstanding se aate hain. COALESCE pehli non-NULL value return karta hai — NULL handling ka standard tool."
          whenToUse={[
            'Data transformation — status codes ko readable labels',
            'Conditional aggregation',
            'NULL safe comparisons aur defaults',
          ]}
          whyUseIt={'Sawaal: WHERE city = NULL kyun kaam nahi karta? Kyunki NULL ka matlab hai "unknown value" — unknown = unknown bhi unknown hi hota hai, TRUE nahi. SQL mein three-valued logic hai: TRUE, FALSE, NULL. Isliye IS NULL use karte hain. COALESCE NULL ko meaningful default mein convert karta hai — UI pe "N/A" ya 0 dikhao, NULL nahi. Ye bugs jo NULL se aate hain — silent hote hain, production mein edge cases mein surface hote hain.'}
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
            explanation: 'Simple CASE switch ki tarah — specific values check. Searched CASE if-else ki tarah — conditions check. Conditional aggregation CASE + SUM se ek GROUP BY mein multiple counts — ye ek powerful pattern hai. COALESCE NULL ko default se replace karta hai. NULL = NULL hamesha FALSE — IS NULL hamesha use karo NULL check ke liye.',
            filename: 'case-null.sql',
          }}
          realWorldScenario="Operations manager ka weekly report: 'Is week kitne orders delivered hue, kitne cancelled, delivery success rate kya hai?' Naive approach: teen separate queries. Smart approach: ek GROUP BY query with CASE conditional aggregation — SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) se delivered count, divide karke percentage. Ek query, poora report."
          commonMistakes={[
            { mistake: 'NULL = NULL comparison likhna', why: 'SQL mein NULL = NULL hamesha false — undefined = undefined ki tarah', fix: 'IS NULL ya IS NOT NULL use karo. NULL-safe equality: IS NOT DISTINCT FROM' },
          ]}
          proTip="CASE ORDER BY mein bhi use kar sakte ho — custom sort order define karo: ORDER BY CASE WHEN status = 'urgent' THEN 0 WHEN status = 'high' THEN 1 ELSE 2 END. Urgent items automatically pehle aate hain. Ye business priority pe sorting hai, alphabetical nahi. Aur NULLIF use karo zero-division se bachne ke liye: NULLIF(denominator, 0) — agar denominator 0 hai toh NULL return karo, divide by zero error nahi."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="sql-aggregations" />
    </div>
  )
}
