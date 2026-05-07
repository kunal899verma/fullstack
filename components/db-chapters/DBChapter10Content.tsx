'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'ACID mein Isolation ka kya matlab hai?',
    options: [
      { text: 'Data encrypted hona chahiye', correct: false, explanation: 'Isolation encryption se related nahi hai.' },
      { text: 'Concurrent transactions ek doosre ko affect nahi karna chahiye — jaise akele chal rahe hon', correct: true, explanation: 'Sahi! Isolation ensure karta hai ki uncommitted data doosre transactions ko visible nahi hona chahiye (depending on isolation level).' },
      { text: 'Transaction ek baar committed ho toh permanent hai', correct: false, explanation: 'Permanent storage Durability (D in ACID) hai.' },
      { text: 'Database crash se protect karta hai', correct: false, explanation: 'Crash protection Durability ka part hai.' },
    ],
  },
  {
    question: 'READ COMMITTED isolation level kya prevent karta hai?',
    options: [
      { text: 'Sirf dirty reads', correct: true, explanation: 'Sahi! READ COMMITTED sirf dirty reads (uncommitted data read karna) prevent karta hai. Non-repeatable reads aur phantom reads still possible hain.' },
      { text: 'Dirty reads aur phantom reads dono', correct: false, explanation: 'Phantom reads SERIALIZABLE level pe prevent hote hain.' },
      { text: 'Kuch bhi prevent nahi karta', correct: false, explanation: 'READ COMMITTED dirty reads prevent karta hai — ye default level hai most databases mein.' },
      { text: 'Saare concurrency problems', correct: false, explanation: 'Saari problems SERIALIZABLE level pe prevent hoti hain — highest isolation.' },
    ],
  },
  {
    question: 'SELECT FOR UPDATE kab use karte hain?',
    options: [
      { text: 'Jab data read karna ho sirf', correct: false, explanation: 'Sirf read ke liye regular SELECT sufficient hai.' },
      { text: 'Jab row read karke update karna ho — race condition avoid karne ke liye pessimistic locking', correct: true, explanation: 'Sahi! SELECT FOR UPDATE row pe lock lagata hai — doosra transaction woh row read nahi kar sakta jab tak current transaction commit ya rollback na kare.' },
      { text: 'Performance optimize karne ke liye', correct: false, explanation: 'SELECT FOR UPDATE locking add karta hai — performance overhead hota hai.' },
      { text: 'Sirf bulk updates ke liye', correct: false, explanation: 'SELECT FOR UPDATE single row ya multiple rows pe kaam karta hai — bulk specific nahi.' },
    ],
  },
  {
    question: 'Deadlock kaise prevent karte hain?',
    options: [
      { text: 'Database close kar do', correct: false, explanation: 'Ye solution nahi hai.' },
      { text: 'Consistent order mein resources lock karo — circular dependencies avoid karo', correct: true, explanation: 'Sahi! Agar sab transactions hamesha same order mein tables lock karein (users → orders, kabhi orders → users nahi) toh circular deadlock nahi banta.' },
      { text: 'Transactions use karna band kar do', correct: false, explanation: 'Transactions essential hain data integrity ke liye.' },
      { text: 'Sirf one transaction at a time allow karo', correct: false, explanation: 'Ye serialization hai — concurrency completely remove ho jaati hai, performance bahut slow.' },
    ],
  },
  {
    question: 'Optimistic locking kab prefer karo pessimistic locking ke upar?',
    options: [
      { text: 'Hamesha — pessimistic locking outdated hai', correct: false, explanation: 'Dono ke use cases hain — contention level pe depend karta hai.' },
      { text: 'Jab conflicts rarely hote hon — low contention scenarios mein', correct: true, explanation: 'Sahi! Optimistic locking no locks lagata — commit pe check karta hai. Low contention mein fast. High contention mein many retries — pessimistic better.' },
      { text: 'Financial transactions ke liye', correct: false, explanation: 'Financial systems high contention hoti hain — pessimistic locking (SELECT FOR UPDATE) safer hai.' },
      { text: 'Multiple users same row update karein toh', correct: false, explanation: 'Multiple users same row = high contention — pessimistic prefer karo.' },
    ],
  },
]

function IsolationLevelsTable() {
  const levels = [
    { level: 'READ UNCOMMITTED', dirty: '❌ Possible', nonRepeat: '❌ Possible', phantom: '❌ Possible', color: '#EF4444' },
    { level: 'READ COMMITTED', dirty: '✅ Prevented', nonRepeat: '❌ Possible', phantom: '❌ Possible', color: '#F59E0B' },
    { level: 'REPEATABLE READ', dirty: '✅ Prevented', nonRepeat: '✅ Prevented', phantom: '❌ Possible', color: '#3B82F6' },
    { level: 'SERIALIZABLE', dirty: '✅ Prevented', nonRepeat: '✅ Prevented', phantom: '✅ Prevented', color: '#10B981' },
  ]
  return (
    <div className="my-5 overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <th className="text-left px-4 py-3 text-[#71717A] font-bold uppercase">Isolation Level</th>
            <th className="text-left px-4 py-3 text-[#71717A] font-bold uppercase">Dirty Read</th>
            <th className="text-left px-4 py-3 text-[#71717A] font-bold uppercase">Non-Repeatable Read</th>
            <th className="text-left px-4 py-3 text-[#71717A] font-bold uppercase">Phantom Read</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((l, i) => (
            <tr key={i} style={{ borderBottom: i < levels.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <td className="px-4 py-3 font-bold" style={{ color: l.color }}>{l.level}</td>
              <td className="px-4 py-3 text-[#A1A1AA]">{l.dirty}</td>
              <td className="px-4 py-3 text-[#A1A1AA]">{l.nonRepeat}</td>
              <td className="px-4 py-3 text-[#A1A1AA]">{l.phantom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function DBChapter10Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Transactions & Concurrency — Data Integrity Ka Core
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Bank transfer ka classic example: ek account se debit karo, doosre mein credit karo — dono ek saath ya kuch bhi nahi. Transactions ACID properties guarantee karte hain. Concurrency mein multiple users same data access karte hain — isolation levels decide karte hain kya visible hoga.
        </p>
      </div>

      <div id="begin-commit-rollback">
        <ConceptCard
          title="BEGIN / COMMIT / ROLLBACK — Transaction Lifecycle"
          emoji="🔄"
          difficulty="intermediate"
          whatIsIt="Transaction ek unit of work hai — ya saari operations succeed karein, ya saari rollback ho jaayein. BEGIN se start, COMMIT se save, ROLLBACK se undo."
          whenToUse={[
            'Multiple related operations ek unit mein (bank transfer)',
            'Data consistency ensure karne ke liye',
            'Partial failure se protect karne ke liye',
          ]}
          whyUseIt="Bina transactions ke agar server crash ho bank transfer ke beech mein — ek account se paisa gaya, doosre mein aaya nahi. Transactions ye impossibility guarantee karte hain."
          howToUse={{
            code: `-- PostgreSQL transaction
BEGIN;

-- Step 1: Debit source account
UPDATE accounts
SET balance = balance - 5000
WHERE id = 1 AND balance >= 5000;

-- Check agar rows affected nahi (insufficient balance)
-- Application ye check karta hai: if rowCount == 0 then ROLLBACK

-- Step 2: Credit destination
UPDATE accounts
SET balance = balance + 5000
WHERE id = 2;

-- Step 3: Log the transaction
INSERT INTO transaction_log (from_id, to_id, amount, created_at)
VALUES (1, 2, 5000, NOW());

-- Sab sahi? Commit karo
COMMIT;

-- Kuch galat? Rollback karo (automatically agar exception)
-- ROLLBACK;

-- Node.js mein (with pg)
const client = await pool.connect()
try {
  await client.query('BEGIN')
  await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [5000, 1])
  await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [5000, 2])
  await client.query('COMMIT')
} catch (err) {
  await client.query('ROLLBACK')
  throw err
} finally {
  client.release()
}`,
            language: 'sql',
            explanation: 'BEGIN se transaction start. COMMIT se permanent save. ROLLBACK se undo. Node.js mein try/catch se catch block mein ROLLBACK ensure karo. finally mein connection release.',
            filename: 'transactions.sql',
          }}
          realWorldScenario="E-commerce checkout: inventory reduce karo, order create karo, payment record karo — teen operations. Ek fail ho toh sab rollback. Customer ka paisa nahi kaatna jab order create nahi hua."
          commonMistakes={[
            { mistake: 'Connection finally mein release karna bhool jaana', why: 'Connection pool leak — eventually application hang ho jaati hai', fix: 'try/catch/finally pattern use karo — finally mein hamesha client.release()' },
          ]}
          proTip="SAVEPOINT se transaction ke andar partial rollback possible hai: SAVEPOINT sp1; ... ROLLBACK TO sp1; Complex transactions mein useful hai."
        />
      </div>

      <div id="isolation-levels">
        <h2 className="text-xl font-display font-bold text-[#F5F5F7] mb-3">Isolation Levels — Concurrency vs Consistency</h2>
        <IsolationLevelsTable />
        <ConceptCard
          title="Isolation Levels — Phenomena Samjho"
          emoji="🔐"
          difficulty="advanced"
          whatIsIt="Isolation levels define karte hain ki concurrent transactions ek doosre ko kitna affect kar sakte hain. Higher isolation = more consistency, less concurrency, more locking."
          whenToUse={[
            'READ COMMITTED: Most applications (default in PostgreSQL)',
            'REPEATABLE READ: Reports jo consistent snapshot chahiye (MySQL InnoDB default)',
            'SERIALIZABLE: Financial transactions, critical operations',
          ]}
          whyUseIt="Wrong isolation level se data inconsistency hoti hai — users stale data dekhte hain, calculations wrong hote hain."
          howToUse={{
            code: `-- Set isolation level
BEGIN ISOLATION LEVEL SERIALIZABLE;
-- ya
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Dirty Read example (READ UNCOMMITTED)
-- Transaction A: UPDATE users SET balance = 0 WHERE id = 1 (not committed yet)
-- Transaction B: SELECT balance FROM users WHERE id = 1 → reads 0!
-- Transaction A: ROLLBACK — balance was never 0, but B read wrong value

-- Non-Repeatable Read (READ COMMITTED allows this)
-- Transaction A: SELECT price FROM products WHERE id = 1 → 100
-- Transaction B: UPDATE products SET price = 200 WHERE id = 1; COMMIT;
-- Transaction A: SELECT price FROM products WHERE id = 1 → 200 (different!)

-- Phantom Read (REPEATABLE READ allows this)
-- Transaction A: SELECT COUNT(*) FROM orders WHERE user_id = 1 → 5
-- Transaction B: INSERT INTO orders (user_id, ...) VALUES (1, ...); COMMIT;
-- Transaction A: SELECT COUNT(*) FROM orders WHERE user_id = 1 → 6 (phantom row!)

-- Node.js mein isolation level
const client = await pool.connect()
await client.query('BEGIN ISOLATION LEVEL SERIALIZABLE')
try {
  const { rows } = await client.query(
    'SELECT balance FROM accounts WHERE id = $1 FOR UPDATE',
    [accountId]
  )
  // ... update logic
  await client.query('COMMIT')
} catch (e) {
  await client.query('ROLLBACK')
}`,
            language: 'sql',
            explanation: 'READ UNCOMMITTED dirty reads allow — almost never use karo. READ COMMITTED (PostgreSQL default) dirty reads prevent. SERIALIZABLE highest isolation — slowest but safest.',
            filename: 'isolation-levels.sql',
          }}
          realWorldScenario="Banking system: SERIALIZABLE isolation ensure karta hai ki concurrent transfers never result in negative balance. E-commerce: REPEATABLE READ se inventory check consistent rehta hai checkout flow mein."
          commonMistakes={[
            { mistake: 'SERIALIZABLE hamesha use karna', why: 'Performance hit bahut zyada — high contention mein deadlocks bhi zyada', fix: 'Most apps ke liye READ COMMITTED sufficient hai — sirf critical paths pe SERIALIZABLE' },
          ]}
          proTip="PostgreSQL ka MVCC (Multi-Version Concurrency Control) system readers ko writers block nahi karne deta — READ COMMITTED bahut fast hai. Oracle/MySQL mein different concurrency model hai."
        />
      </div>

      <div id="deadlocks">
        <ConceptCard
          title="Deadlocks — Circular Waiting"
          emoji="🔒"
          difficulty="advanced"
          whatIsIt="Deadlock: Transaction A Table1 lock kar ke Table2 wait kar raha hai. Transaction B Table2 lock kar ke Table1 wait kar raha hai. Dono forever wait karte hain — database detect karta hai aur ek rollback karta hai."
          whenToUse={[
            'Deadlock prevent karna: consistent lock ordering',
            'Detect karna: application mein deadlock error handle karo aur retry karo',
          ]}
          whyUseIt="Deadlocks production mein randomly aate hain — application crash ya hang ho sakta hai. Detection aur retry logic essential hai."
          howToUse={{
            code: `-- Deadlock scenario:
-- Transaction A:
BEGIN;
UPDATE users SET balance = balance - 1000 WHERE id = 1;  -- locks user 1
-- Waits for order lock...

-- Transaction B (simultaneously):
BEGIN;
UPDATE orders SET status = 'processing' WHERE user_id = 1;  -- locks order
UPDATE users SET last_order = NOW() WHERE id = 1;  -- waits for user 1 lock!
-- DEADLOCK DETECTED!

-- Prevention: consistent ordering
-- ALWAYS lock users first, then orders (never reverse)

-- Deadlock retry in Node.js
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err: any) {
      const isDeadlock =
        err.code === '40P01' ||           // PostgreSQL deadlock
        err.errno === 1213                // MySQL deadlock
      if (isDeadlock && attempt < maxRetries) {
        console.warn(\`Deadlock attempt \${attempt}, retrying...\`)
        await new Promise(r => setTimeout(r, 100 * attempt))  // backoff
        continue
      }
      throw err
    }
  }
  throw new Error('Max retries exceeded')
}

// Usage
await withRetry(() => transferMoney(from, to, amount))`,
            language: 'javascript',
            explanation: 'Deadlock: circular lock dependency. PostgreSQL code 40P01. Retry with exponential backoff. Consistent lock ordering se prevention — always same table order mein lock karo.',
            filename: 'deadlock-handling.ts',
          }}
          realWorldScenario="Payment service: deadlock retry logic essential hai. Ek failed attempt ka matlab data corrupt nahi hua — just retry karo. Consistent table ordering se majority deadlocks prevent hote hain."
          commonMistakes={[
            { mistake: 'Deadlock error ignore karna', why: 'Transaction silently fail ho jaata hai — user ko data loss hota hai', fix: 'Deadlock errors explicitly catch karo aur retry karo — exponential backoff ke saath' },
          ]}
          proTip="lock_timeout aur statement_timeout PostgreSQL settings se long locks automatically cancel ho jaate hain — deadlock ke baad indefinite wait prevent karta hai."
        />
      </div>

      <div id="optimistic-locking">
        <ConceptCard
          title="Optimistic vs Pessimistic Locking"
          emoji="⚖️"
          difficulty="advanced"
          whatIsIt="Pessimistic: read karte waqt lock lagao — doosra wait kare. Optimistic: koi lock nahi — commit pe version check karo, conflict hoga toh retry."
          whenToUse={[
            'Pessimistic (SELECT FOR UPDATE): High contention, financial data, strict consistency',
            'Optimistic (version field): Low contention, UI forms, user profile updates',
          ]}
          whyUseIt="Pessimistic locking safe lekin slow — locks hold karne se concurrency kam. Optimistic faster lekin retry logic chahiye."
          howToUse={{
            code: `-- Pessimistic Locking (SELECT FOR UPDATE)
BEGIN;
SELECT balance, version FROM accounts WHERE id = 1 FOR UPDATE;
-- Row is now locked — other transactions wait!
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
COMMIT;
-- Lock released on commit

-- Optimistic Locking (version column)
-- Schema
CREATE TABLE products (
  id      SERIAL PRIMARY KEY,
  name    VARCHAR(200),
  price   DECIMAL(10,2),
  version INTEGER DEFAULT 0  -- optimistic lock version
);

-- Read
SELECT id, name, price, version FROM products WHERE id = 42;
-- price: 999, version: 5

-- Update — only if version hasn't changed
UPDATE products
SET price = 1099, version = version + 1
WHERE id = 42 AND version = 5;  -- optimistic check!
-- If rowCount = 0: someone else updated — conflict! Retry or error.

-- Node.js optimistic locking
async function updatePrice(productId: number, newPrice: number) {
  const product = await db.query('SELECT * FROM products WHERE id = $1', [productId])
  const { version } = product.rows[0]

  const result = await db.query(
    'UPDATE products SET price = $1, version = version + 1 WHERE id = $2 AND version = $3',
    [newPrice, productId, version]
  )

  if (result.rowCount === 0) {
    throw new Error('Concurrent update conflict — please retry')
  }
}`,
            language: 'sql',
            explanation: 'Pessimistic: SELECT FOR UPDATE row lock. Optimistic: version field se conflict detect. Commit pe version mismatch = someone else updated — application retry kare.',
            filename: 'locking.sql',
          }}
          realWorldScenario="Admin panel product price update — low contention, optimistic locking fine. Ticket booking system — high contention (multiple users buying last seat), pessimistic locking zaroori."
          commonMistakes={[
            { mistake: 'Optimistic locking retry nahi karna', why: 'User ko silent failure milta hai — data saved nahi hua', fix: 'version mismatch pe clear error dena ya automatic retry — user ko inform karo' },
          ]}
          proTip="Prisma ORM mein optimistic locking built-in hai: @@updatedAt generates version automatically. Sequelize mein version: true option. ORM se easy implement hota hai."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="transactions" />
    </div>
  )
}
