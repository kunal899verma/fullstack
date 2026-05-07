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

function AcidDiagram() {
  const items = [
    { label: 'Atomicity — All or Nothing', sublabel: 'Bank transfer: both debit + credit succeed, or both rollback · No partial updates ever', color: '#FF6B35', bg: 'rgba(255,107,53,0.1)', border: 'rgba(255,107,53,0.3)', icon: '⚛️' },
    { label: 'Consistency — Valid State → Valid State', sublabel: 'balance >= 0 constraint always holds · Invalid data rejected at DB level', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: '✅' },
    { label: 'Isolation — Concurrent TX Don\'t Interfere', sublabel: 'Two users booking last seat: first commits, second sees 0 seats · No race conditions', color: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', icon: '🔐' },
    { label: 'Durability — Committed = Permanent', sublabel: 'COMMIT → WAL flushed to disk · Power cut after commit = data still safe', color: '#FF6B35', bg: 'rgba(255,107,53,0.08)', border: 'rgba(255,107,53,0.25)', icon: '💾' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">ACID Properties</p>
      <div className="max-w-lg mx-auto space-y-2">
        {items.map((item, i) => (
          <div key={i} className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
            <span className="text-xl">{item.icon}</span>
            <div className="flex-1">
              <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
              <p className="text-xs text-[#71717A] mt-0.5">{item.sublabel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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
          ACID properties — ye sirf acronym nahi, ye guarantee hai. Bina ACID ke banking app banana = paiso ko gamble mein lagana. Ye samjho toh sab kuch clear ho jaata hai: Atomicity = ya sab hoga ya kuch nahi. Consistency = data hamesha valid state mein. Isolation = concurrent transactions ek doosre ko affect nahi karenge. Durability = committed data crash ke baad bhi safe. Sawaal: Inke bina kya hoga? 10 rupee account se gaye, 10 doosre mein aaye nahi — paisa gayab. Ye real scenarios hain jo production mein aate hain.
        </p>
      </div>

      <AcidDiagram />

      <div id="begin-commit-rollback">
        <ConceptCard
          title="BEGIN / COMMIT / ROLLBACK — Transaction Lifecycle"
          emoji="🔄"
          difficulty="intermediate"
          whatIsIt="Transaction database ka 'ya sab ya kuch nahi' wala agreement hai. Under the hood: BEGIN se PostgreSQL ek transaction ID assign karta hai, undo log (WAL — Write-Ahead Log) likhna shuru karta hai. COMMIT pe WAL disk pe flush hota hai — durability guarantee. ROLLBACK pe undo log se sab revert. Server crash transaction ke beech mein ho jaaye? WAL se recovery — uncommitted changes undo. Ye durability guarantee hai — committed data kabhi lost nahi hota even on crash."
          whenToUse={[
            'Multiple related operations ek unit mein (bank transfer)',
            'Data consistency ensure karne ke liye',
            'Partial failure se protect karne ke liye',
          ]}
          whyUseIt="Classic scenario: e-commerce checkout — inventory reduce karo, order create karo, payment record karo. Teen operations. Agar doosre ke baad server crash ho — inventory ghata, order nahi bana, payment pending. Customer ka paisa kaata, order nahi mila. Ye production incident hai jo reputation destroy karta hai. Transaction ke saath: ya teeno complete honge ya teeno rollback — customer ko error dikhao, retry karo. Clean, recoverable state hamesha."
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
            explanation: 'BEGIN se transaction ID milta hai, WAL likhna shuru. COMMIT pe WAL disk flush — permanent. ROLLBACK pe undo log revert. Node.js mein: try mein BEGIN + operations + COMMIT. catch mein ROLLBACK — error throw hone pe guarantee. finally mein client.release() — ye CRITICAL hai, bhool gaye toh connection pool exhaust hoga aur app hang ho jaayega. SAVEPOINT advanced technique hai — transaction ke andar partial checkpoint, ROLLBACK TO sp1 se sirf wahan tak undo.',
            filename: 'transactions.sql',
          }}
          realWorldScenario="Ticket booking system: concert ka last ticket. 2 users simultaneously try karte hain. Bina transaction ke: dono users ko ticket 'available' dikhti hai, dono book karte hain — double booking. Transaction + SELECT FOR UPDATE ke saath: pehle user lock karta hai, books karta hai, commit. Doosre user ka query wait karta hai, phir try karta hai — ticket already sold, clean error. Transactions concurrency bugs prevent karte hain jo testing mein practically invisible hote hain."
          commonMistakes={[
            { mistake: 'Connection finally mein release karna bhool jaana', why: 'Connection pool leak — eventually application hang ho jaati hai', fix: 'try/catch/finally pattern use karo — finally mein hamesha client.release()' },
          ]}
          proTip="SAVEPOINT ek underused gem hai — multi-step transaction mein checkpoint lagao. Agar step 5 fail ho aur step 1-3 valid hain toh puri transaction rollback mat karo, ROLLBACK TO sp1 se safe point pe wapas jao, retry karo baaki. Complex batch operations mein ye partial recovery allow karta hai — puri mehnat waste nahi hoti."
        />
      </div>

      <div id="isolation-levels">
        <h2 className="text-xl font-display font-bold text-[#F5F5F7] mb-3">Isolation Levels — Concurrency vs Consistency</h2>
        <IsolationLevelsTable />
        <ConceptCard
          title="Isolation Levels — Phenomena Samjho"
          emoji="🔐"
          difficulty="advanced"
          whatIsIt="Isolation levels ek dial hain — ek taraf maximum consistency, doosri taraf maximum performance. Under the hood PostgreSQL mein MVCC (Multi-Version Concurrency Control) hai — writers readers ko block nahi karte, har transaction apna snapshot dekhta hai. Dirty Read: uncommitted data padhna — Transaction A ne update kiya commit nahi kiya, Transaction B ne padh liya, phir A rollback — B ne kabhi exist na karne wala data padha. Non-Repeatable Read: ek hi transaction mein same row do baar padhne pe alag value. Phantom Read: COUNT(*) ek baar aur phir different — beech mein kisi ne new row add kiya."
          whenToUse={[
            'READ COMMITTED: Most applications (default in PostgreSQL)',
            'REPEATABLE READ: Reports jo consistent snapshot chahiye (MySQL InnoDB default)',
            'SERIALIZABLE: Financial transactions, critical operations',
          ]}
          whyUseIt="Sawaal: har jagah SERIALIZABLE kyun nahi use karte? Kyunki SERIALIZABLE high contention mein serialization failures deta hai — aapki application ko retry logic likhna padta hai, aur deadlocks bhi zyada hote hain. Performance cost significant hai. Most applications ke liye PostgreSQL ka default READ COMMITTED sufficient hai — MVCC ki wajah se readers writers ko block nahi karte. SERIALIZABLE sirf critical financial operations ke liye jahan absolute consistency zaroori hai."
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
            explanation: 'READ UNCOMMITTED — kabhi use mat karo, sirf academic hai. READ COMMITTED PostgreSQL default hai — MVCC ki wajah se actually fast hai, readers block nahi hote. REPEATABLE READ consistent snapshot deta hai — MySQL InnoDB default. SERIALIZABLE strongest — transactions jaisi chal rahen jaise serial hoti hain, lekin internally PostgreSQL overlap allow karta hai jahan safe ho. Cost: serialization failures possible, retry logic zaroori.',
            filename: 'isolation-levels.sql',
          }}
          realWorldScenario="Monthly financial report generate karna hai — consistent snapshot chahiye poori report ke liye, beech mein koi new transaction affect na kare. REPEATABLE READ mein wrap karo report generation — ek snapshot se sari queries run hongi, consistent numbers. Banking dashboard: SERIALIZABLE — balance calculations pe zero tolerance for stale data. Social feed: READ COMMITTED default fine hai — ek post zyada ya kam dikhna acceptable hai."
          commonMistakes={[
            { mistake: 'SERIALIZABLE hamesha use karna', why: 'Performance hit bahut zyada — high contention mein deadlocks bhi zyada', fix: 'Most apps ke liye READ COMMITTED sufficient hai — sirf critical paths pe SERIALIZABLE' },
          ]}
          proTip="PostgreSQL ka MVCC samajhna bahut important hai — ye reason hai ki READ COMMITTED itna fast hai. Har row ki multiple versions hoti hain — reader apne transaction start time wali version dekhta hai, writer nai version banata hai. Koi row-level locking nahi readers ke liye. MySQL InnoDB bhi MVCC use karta hai lekin gap locks aur next-key locks alag hain. Oracle ki implementation aur alag hai. Database internals samajhna sahi isolation level choose karne mein help karta hai."
        />
      </div>

      <div id="deadlocks">
        <ConceptCard
          title="Deadlocks — Circular Waiting"
          emoji="🔒"
          difficulty="advanced"
          whatIsIt="Deadlock circular lock dependency hai — do transactions ek doosre ka wait karte hain, forever. Under the hood: PostgreSQL deadlock detector background process har kuch milliseconds mein lock dependency graph check karta hai. Circular dependency detect hone pe — ek transaction ko victim choose karo (usually smaller/younger), rollback karo, doosra proceed kare. Error code 40P01 aapko milega. Prevention ka golden rule: consistent ordering — hamesha users → orders lock karo, kabhi orders → users nahi. Ek order follow karo, circular dependency impossible."
          whenToUse={[
            'Deadlock prevent karna: consistent lock ordering',
            'Detect karna: application mein deadlock error handle karo aur retry karo',
          ]}
          whyUseIt="Deadlocks production mein kabhi-kabhi aate hain — predictable nahi, test mein rarely reproduce hote hain. Jab aate hain tab PostgreSQL victim transaction rollback karta hai, aapko error 40P01 milta hai. Agar retry logic nahi hai toh user ko unexplained error milta hai. Retry with exponential backoff standard solution hai — attempt 1 immediately, attempt 2 after 100ms, attempt 3 after 200ms. Usually 1-2 attempts mein succeed ho jaata hai."
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
            explanation: 'Deadlock scenario: Transaction A user 1 lock kiya, order wait. Transaction B order lock kiya, user 1 wait. Circular — PostgreSQL detect karta hai, ek rollback. Code 40P01 catch karo explicitly. withRetry wrapper generic hai — kisi bhi async function wrap karo. Exponential backoff: 100ms, 200ms, 300ms — immediate retry nahi karna, contention reduce hone do. Consistent lock ordering: hamesha users pehle, phir orders — ye rule sab code mein follow karo.',
            filename: 'deadlock-handling.ts',
          }}
          realWorldScenario="Payment service production incident: dono users simultaneously balance transfer kar rahe the — users → accounts lock order aur accounts → users lock order mixed code mein tha. Deadlocks daily hone lage. Fix: code review, consistent lock ordering enforce kiya (always users first, then accounts). Deadlocks 95% kam ho gaye. Baaki 5% ke liye retry logic — no more user-facing errors. Ek code review se production stability dramatically improve hui."
          commonMistakes={[
            { mistake: 'Deadlock error ignore karna', why: 'Transaction silently fail ho jaata hai — user ko data loss hota hai', fix: 'Deadlock errors explicitly catch karo aur retry karo — exponential backoff ke saath' },
          ]}
          proTip="lock_timeout aur statement_timeout PostgreSQL mein set karo — indefinite lock wait se protect karo. SET lock_timeout = '5s' — 5 second mein lock nahi mila toh fail karo, hang mat raho. pg_stat_activity view se current locks aur waiting queries dekho: SELECT * FROM pg_stat_activity WHERE wait_event_type = 'Lock'. Production incident investigate karne ke liye ye view gold mine hai."
        />
      </div>

      <div id="optimistic-locking">
        <ConceptCard
          title="Optimistic vs Pessimistic Locking"
          emoji="⚖️"
          difficulty="advanced"
          whatIsIt="Do philosophies hain concurrent updates ke liye. Pessimistic locking: 'mujhe lagta hai conflict hoga — pehle hi lock lagao'. SELECT FOR UPDATE row pe exclusive lock lagata hai — doosra transaction woh row read nahi kar sakta jab tak current commit/rollback na kare. Optimistic locking: 'shayad conflict nahi hoga — try karo, fail hone pe retry'. Version column use karo — read karte waqt version note karo, update karte waqt version same hona chahiye. Under the hood: UPDATE SET version = version+1 WHERE id = X AND version = Y — agar 0 rows affected toh someone else ne pehle update kiya."
          whenToUse={[
            'Pessimistic (SELECT FOR UPDATE): High contention, financial data, strict consistency',
            'Optimistic (version field): Low contention, UI forms, user profile updates',
          ]}
          whyUseIt="Sawaal: ticket booking mein konsa locking use karna chahiye? High contention — multiple users ek saath last seat buy karne ki koshish. Optimistic locking mein: sab read karte hain (version 5), sab update try karte hain — pehla succeed karta hai (version 6), baaki sab fail — retry karte hain, seat sold dikhta hai. Itne retries = performance issue. Pessimistic (SELECT FOR UPDATE) better hai: ek user lock karta hai, doosra wait karta hai, pehla complete karta hai, doosra ko 'no seats' milta hai. Contention predict karo — high contention = pessimistic, low contention = optimistic."
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
            explanation: 'SELECT FOR UPDATE ek actual row-level lock hai — doosra transaction wait karta hai, timeout pe fail. Optimistic: version column rakhna padta hai schema mein, update pe check karo rowCount === 0 — conflict detect. rowCount 0 = someone updated between your read and write. User ko clear error do ya silently retry karo. SKIP LOCKED option SELECT FOR UPDATE ke saath: queue processing ke liye — "sirf woh rows lo jo available hain, locked skip karo". Job queue implementation ke liye use karo.',
            filename: 'locking.sql',
          }}
          realWorldScenario="E-commerce admin panel product price update — 2 admins ek saath edit karte hain kabhi-kabhi. Optimistic locking: version field dikhao form mein, submit pe version check — doosra admin ko 'someone else updated, please review' message. Low contention, no performance impact. Contrast: Flash sale — 10,000 users ek saath last item buy karne ki koshish. Pessimistic SELECT FOR UPDATE: ek user at a time lock karta hai, buys karta hai, releases. Queue effectively form ho jaati hai. Right tool for right situation."
          commonMistakes={[
            { mistake: 'Optimistic locking retry nahi karna', why: 'User ko silent failure milta hai — data saved nahi hua', fix: 'version mismatch pe clear error dena ya automatic retry — user ko inform karo' },
          ]}
          proTip="SELECT FOR UPDATE SKIP LOCKED pattern PostgreSQL mein job queues implement karne ke liye perfect hai — worker pool ke multiple instances simultaneously rows fetch kar sakte hain bina conflicts ke. UPDATE jobs SET status = 'processing' WHERE id = (SELECT id FROM jobs WHERE status = 'pending' ORDER BY created_at LIMIT 1 FOR UPDATE SKIP LOCKED) RETURNING *. Ye atomic fetch + lock hai — koi job twice process nahi hogi. Bull/BullMQ internally similar pattern use karta hai."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="transactions" />
    </div>
  )
}
