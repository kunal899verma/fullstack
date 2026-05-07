'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Question {
  id: number
  topic: string
  question: string
  options: string[]
  correct: number
  explanation: string
  chapter: number
}

interface ChapterScore {
  chapter: number
  title: string
  score: number
  total: number
  lastAttempt: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CHAPTER_TITLES: Record<number, string> = {
  1: 'Node.js Introduction',
  2: 'How Node.js Works',
  3: 'Modules & NPM',
  4: 'Environment Setup',
  5: 'Callbacks',
  6: 'Event Loop & Async',
  7: 'Promises',
  8: 'EventEmitter',
  9: 'Buffers',
  10: 'Streams',
  11: 'HTTP Module',
  12: 'Express Basics',
  13: 'REST APIs',
  14: 'Databases Intro',
  15: 'Security',
  16: 'MongoDB & Mongoose',
  17: 'PostgreSQL & Prisma',
  18: 'Authentication',
  19: 'Redis & Caching',
  20: 'WebSockets',
  21: 'Cluster & Workers',
  22: 'Production & Deployment',
  23: 'CI/CD & Docker',
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    topic: 'Event Loop',
    question: 'Node.js ka Event Loop kitne phases mein divided hai?',
    options: ['4', '5', '6', '8'],
    correct: 2,
    explanation: 'Event Loop ke 6 phases hain: timers, pending callbacks, idle/prepare, poll, check, close callbacks.',
    chapter: 6,
  },
  {
    id: 2,
    topic: 'Event Loop',
    question: 'Inme se kaunsa sabse pehle execute hoga?\n\nconsole.log("A");\nsetTimeout(() => console.log("B"), 0);\nPromise.resolve().then(() => console.log("C"));\nconsole.log("D");',
    options: ['A, B, C, D', 'A, D, B, C', 'A, D, C, B', 'A, C, D, B'],
    correct: 2,
    explanation: 'Synchronous code pehle (A, D), phir Microtasks — Promise (C), phir Macrotasks — setTimeout (B). Output: A D C B.',
    chapter: 6,
  },
  {
    id: 3,
    topic: 'process.nextTick',
    question: 'process.nextTick() kab run hota hai?',
    options: [
      'setTimeout ke baad',
      'Current operation complete hone ke baad, Event Loop aage badhne se pehle',
      'Har Event Loop cycle ke end mein',
      'I/O operations ke baad',
    ],
    correct: 1,
    explanation: 'process.nextTick() current operation complete hone ke immediately baad run hota hai — Event Loop ka next phase shuru hone se pehle. Ye sabse high priority async callback hai.',
    chapter: 6,
  },
  {
    id: 4,
    topic: 'Promises',
    question: 'Promise.all() ka behaviour kya hai jab ek promise reject ho jaye?',
    options: [
      'Baaki promises ka wait karta hai',
      'Immediately reject ho jaata hai',
      'Partial results return karta hai',
      'Sirf rejected promise return karta hai',
    ],
    correct: 1,
    explanation: 'Promise.all() fail-fast hai — ek bhi promise reject ho toh poora Promise.all immediately reject ho jaata hai. Promise.allSettled() use karo agar sab ka result chahiye.',
    chapter: 7,
  },
  {
    id: 5,
    topic: 'Promises',
    question: 'Promise.race() kya return karta hai?',
    options: [
      'Sab promises ka array',
      'Pehle resolve ya reject hone wali promise ka result',
      'Sirf fulfilled promises',
      'Last promise ka result',
    ],
    correct: 1,
    explanation: 'Promise.race() jo pehle settle ho (resolve ya reject dono mein se), uska result return karta hai. Timeouts implement karne ke liye use hota hai.',
    chapter: 7,
  },
  {
    id: 6,
    topic: 'Streams',
    question: 'Backpressure kya hota hai streams mein?',
    options: [
      'Stream memory mein overflow hota hai',
      'Writable stream se fast Readable stream automatically pause hota hai',
      'Data corrupt ho jaata hai',
      'Network connection slow ho jaata hai',
    ],
    correct: 1,
    explanation: 'Backpressure tab hota hai jab Writable stream, Readable se data accept karne mein slow ho. Node.js streams automatically backpressure handle karte hain — Readable pause ho jaata hai jab tak Writable ready na ho.',
    chapter: 10,
  },
  {
    id: 7,
    topic: 'Streams',
    question: 'Streams ke kitne types hote hain Node.js mein?',
    options: ['2', '3', '4', '5'],
    correct: 2,
    explanation: '4 types: Readable (sirf padhna), Writable (sirf likhna), Duplex (dono), Transform (read karo aur modify karke write karo). Transform Duplex ka subclass hai.',
    chapter: 10,
  },
  {
    id: 8,
    topic: 'HTTP',
    question: 'Express mein Error Handling Middleware ke kitne parameters hote hain?',
    options: ['2', '3', '4', '5'],
    correct: 2,
    explanation: 'Error middleware ke exactly 4 params hone chahiye: (err, req, res, next). Express isse recognize karta hai by the 4th parameter. 3 params ho toh ye normal middleware ban jaata hai.',
    chapter: 12,
  },
  {
    id: 9,
    topic: 'Security',
    question: 'bcrypt mein saltRounds ka kya role hai?',
    options: [
      'Encryption ki speed control karta hai',
      'Password ki length define karta hai',
      'Hashing ki computational cost control karta hai (higher = more secure, slower)',
      'Salt ka length set karta hai',
    ],
    correct: 2,
    explanation: 'saltRounds (ya cost factor) hashing algorithm ko kitni baar run karna hai ye define karta hai (2^saltRounds iterations). Higher = zyada secure par zyada time. Production mein 10-12 recommended hai.',
    chapter: 15,
  },
  {
    id: 10,
    topic: 'Security',
    question: 'JWT mein teen parts kaunse hote hain?',
    options: [
      'Username, Password, Signature',
      'Header, Payload, Signature',
      'Algorithm, Data, Token',
      'ID, Claims, Key',
    ],
    correct: 1,
    explanation: 'JWT = Header.Payload.Signature. Header mein algorithm, Payload mein claims (user data), Signature mein verification hota hai. Payload encoded hota hai, encrypted nahi — sensitive data mat rakho!',
    chapter: 18,
  },
  {
    id: 11,
    topic: 'Modules',
    question: 'CommonJS aur ESM mein kya fark hai?',
    options: [
      'CommonJS import/export use karta hai, ESM require() use karta hai',
      'CommonJS require() use karta hai, ESM import/export use karta hai',
      'Dono same hain, sirf syntax alag hai nahi',
      'ESM sirf browsers mein kaam karta hai',
    ],
    correct: 1,
    explanation: 'CommonJS ka syntax: require() aur module.exports. ESM ka syntax: import aur export. package.json mein "type": "module" set karo ESM ke liye. __dirname ESM mein directly available nahi hota.',
    chapter: 3,
  },
  {
    id: 12,
    topic: 'Performance',
    question: 'Node.js mein single-threaded hone ke bawajood multiple requests efficiently handle kaise hoti hain?',
    options: [
      'Node.js multiple threads create karta hai har request ke liye',
      'Event Loop aur non-blocking I/O se — waiting ke dauran dusre requests process hote hain',
      'Node.js automatically cluster mode mein chal ta hai',
      'V8 engine multi-threading handle karta hai',
    ],
    correct: 1,
    explanation: 'Node.js single-threaded hai par non-blocking I/O use karta hai. Jab I/O wait karna padta hai (DB query, file read), Event Loop dusre requests handle karta hai. Ye libuv ke thread pool ki madad se hota hai.',
    chapter: 2,
  },
  {
    id: 13,
    topic: 'Cluster',
    question: 'Cluster module mein "Master" process kya karta hai?',
    options: [
      'Sirf requests handle karta hai',
      'Workers create karta hai aur load distribute karta hai',
      'Database connections manage karta hai',
      'Log files manage karta hai',
    ],
    correct: 1,
    explanation: 'Master process Worker processes create karta hai (usually CPU cores ki sankhya ke barabar), incoming connections distribute karta hai, aur crashed workers ko restart karta hai. Master khud usually requests handle nahi karta.',
    chapter: 21,
  },
  {
    id: 14,
    topic: 'Async',
    question: 'async/await ke saath errors kaise handle karte hain?',
    options: [
      '.catch() se',
      'try/catch block se',
      'error event se',
      'callback se',
    ],
    correct: 1,
    explanation: 'async/await ke saath standard try/catch use hota hai. await ke andar throw hone wali error catch block mein aa jaati hai — bilkul synchronous code jaisa. Ye code ko readable banata hai.',
    chapter: 6,
  },
  {
    id: 15,
    topic: 'EventEmitter',
    question: 'EventEmitter mein .once() aur .on() mein kya fark hai?',
    options: [
      'Koi fark nahi',
      '.once() sirf pehli baar event fire hone par callback chalata hai',
      '.on() sirf ek baar chalata hai',
      '.once() synchronous hai',
    ],
    correct: 1,
    explanation: '.on() har baar event emit hone par callback chalata hai. .once() sirf pehli emit par chalata hai, phir automatically listener remove ho jaata hai. Memory leaks rokne ke liye useful hai.',
    chapter: 8,
  },
  {
    id: 16,
    topic: 'HTTP',
    question: 'HTTP status code 429 ka kya matlab hai?',
    options: [
      'Unauthorized',
      'Forbidden',
      'Too Many Requests',
      'Service Unavailable',
    ],
    correct: 2,
    explanation: '429 Too Many Requests — Rate limiting ka standard response code. Client ne allowed limit se zyada requests bheji hain. Retry-After header mein batate hain kab try karo.',
    chapter: 11,
  },
  {
    id: 17,
    topic: 'Buffers',
    question: 'Buffer.allocUnsafe() aur Buffer.alloc() mein kya fark hai?',
    options: [
      'allocUnsafe bada Buffer banata hai',
      'allocUnsafe faster hai kyunki memory initialize nahi karta (old data ho sakta hai!)',
      'alloc faster hai',
      'Koi practical difference nahi',
    ],
    correct: 1,
    explanation: 'Buffer.allocUnsafe() faster hai kyunki memory zero-fill nahi karta — purana data ho sakta hai! Tabhi "unsafe" hai. Hamesha data se overwrite karo immediately. Buffer.alloc() zero se fill karta hai — safer.',
    chapter: 9,
  },
  {
    id: 18,
    topic: 'Production',
    question: 'PM2 kya hai aur kyon use karte hain?',
    options: [
      'Database management tool hai',
      'Process manager — auto-restart, logging, cluster mode Node.js ke liye',
      'Build tool hai Node.js ke liye',
      'Testing framework hai',
    ],
    correct: 1,
    explanation: 'PM2 production-grade process manager hai Node.js ke liye. Crash par auto-restart, log management, cluster mode (all CPUs), startup scripts, monitoring — ye sab milta hai. pm2 start app.js se shuru karo.',
    chapter: 22,
  },
  {
    id: 19,
    topic: 'Environment',
    question: 'process.env mein environment variables kab load hote hain?',
    options: [
      'Automatically node_modules se',
      'require("dotenv").config() se .env file padhne ke baad',
      'Node.js automatically .env padhta hai',
      'package.json se',
    ],
    correct: 1,
    explanation: 'require("dotenv").config() (ya import "dotenv/config") .env file padhta hai aur process.env mein values set karta hai. Ye call hamesha app ke bilkul shuru mein karni chahiye. Node v20+ mein --env-file=.env flag bhi kaam karta hai.',
    chapter: 4,
  },
  {
    id: 20,
    topic: 'REST',
    question: 'REST API mein PATCH aur PUT mein kya fark hai?',
    options: [
      'Koi fark nahi',
      'PUT poora resource replace karta hai, PATCH partial update karta hai',
      'PATCH poora resource replace karta hai, PUT partial update karta hai',
      'PUT sirf create ke liye hai',
    ],
    correct: 1,
    explanation: 'PUT idempotent full replacement hai — poora object bhejo. PATCH partial update ke liye — sirf jo fields update karni hain woh bhejo. PATCH zyada efficient hai large objects ke liye.',
    chapter: 13,
  },
  {
    id: 21,
    topic: 'Security',
    question: 'CORS mein "preflight request" kya hota hai?',
    options: [
      'Pehla API request',
      'Browser ka automatic OPTIONS request — actual request se pehle permission check ke liye',
      'Server ka health check',
      'Authentication token verify karna',
    ],
    correct: 1,
    explanation: 'Browser cross-origin POST/PUT/DELETE ya custom headers wale requests se pehle automatically OPTIONS request bhejta hai — server check karta hai ki ye allowed hai ya nahi. Server 204 aur proper CORS headers se respond kare.',
    chapter: 15,
  },
  {
    id: 22,
    topic: 'WebSockets',
    question: 'WebSocket aur HTTP mein fundamental difference kya hai?',
    options: [
      'WebSocket sirf binary data support karta hai',
      'WebSocket full-duplex persistent connection hai — server bhi push kar sakta hai bina request ke',
      'HTTP zyada fast hai',
      'WebSocket sirf same-origin ke liye kaam karta hai',
    ],
    correct: 1,
    explanation: 'HTTP request-response model hai — client request kare tabhi server respond karta hai. WebSocket persistent bidirectional connection hai — dono sides kabhi bhi data bhej sakte hain. Real-time features ke liye essential.',
    chapter: 20,
  },
  {
    id: 23,
    topic: 'Node.js Architecture',
    question: 'V8 engine aur libuv mein kya role hai Node.js mein?',
    options: [
      'V8 memory manage karta hai, libuv networking karta hai',
      'V8 JavaScript execute karta hai, libuv async I/O aur event loop provide karta hai',
      'Dono same kaam karte hain',
      'V8 TypeScript compile karta hai, libuv deployment karta hai',
    ],
    correct: 1,
    explanation: 'V8 (Google ka JS engine) JavaScript code ko machine code mein compile karta hai. libuv C++ library hai jo event loop, thread pool (I/O ke liye), aur async I/O provide karta hai. Dono milke Node.js ka core banate hain.',
    chapter: 1,
  },
  {
    id: 24,
    topic: 'Databases',
    question: 'SQL aur NoSQL databases mein kab kya choose karo?',
    options: [
      'SQL hamesha better hai',
      'NoSQL hamesha faster hai',
      'SQL: structured data, relations, ACID; NoSQL: flexible schema, horizontal scaling, high write throughput',
      'Dono mein koi difference nahi practically',
    ],
    correct: 2,
    explanation: 'SQL (PostgreSQL, MySQL): ACID transactions, complex queries, strong consistency — e-commerce, banking. NoSQL (MongoDB, Redis): flexible schema, horizontal scaling — IoT, real-time, caching. 2025 mein mostly PostgreSQL hi recommend karo unless specific NoSQL use case ho.',
    chapter: 14,
  },
  {
    id: 25,
    topic: 'MongoDB',
    question: 'Mongoose mein populate() kya karta hai?',
    options: [
      'Database mein data seed karta hai',
      'Referenced documents ko resolve karta hai — ObjectId ki jagah actual document la deta hai',
      'Schema validate karta hai',
      'Index create karta hai',
    ],
    correct: 1,
    explanation: 'populate() MongoDB ke $lookup jaisa kaam karta hai — referenced document ka ObjectId ki jagah actual document la deta hai. Post.findById(id).populate("author") se author ka pura object milta hai sirf ID ki jagah. Virtual joins hain ye essentially.',
    chapter: 16,
  },
  {
    id: 26,
    topic: 'PostgreSQL',
    question: 'Prisma mein findMany() ke saath include aur select mein kya fark hai?',
    options: [
      'Koi fark nahi',
      'include: related records bhi fetch karo; select: sirf specific fields lo (bandwidth optimize)',
      'select: related records fetch karo; include: fields filter karo',
      'Dono same output dete hain',
    ],
    correct: 1,
    explanation: 'include: { posts: true } se User ke saath uske saare posts bhi aaenge — extra JOIN query. select: { name: true, email: true } se sirf woh fields aayenge — bandwidth save. Dono combine bhi ho sakte hain: include ke saath select nested karo.',
    chapter: 17,
  },
  {
    id: 27,
    topic: 'Redis',
    question: 'Redis ka primary use case kya hai Node.js apps mein?',
    options: [
      'Primary database ke roop mein',
      'In-memory caching, sessions, pub/sub, rate limiting, queues — lightning fast reads',
      'File storage ke liye',
      'Sirf background jobs ke liye',
    ],
    correct: 1,
    explanation: 'Redis in-memory key-value store hai — sub-millisecond reads. Use cases: DB query caching (cache-aside pattern), session storage, pub/sub messaging, rate limiting counters (INCR command), BullMQ job queues. PostgreSQL ke sath complementary hai — Redis caches, Postgres persists.',
    chapter: 19,
  },
  {
    id: 28,
    topic: 'CI/CD',
    question: 'Docker mein multi-stage build kyon use karte hain Node.js ke liye?',
    options: [
      'Multiple databases connect karne ke liye',
      'Build dependencies production image mein nahi jaate — final image chhoti aur secure',
      'Faster development ke liye',
      'Testing sirf multi-stage mein possible hai',
    ],
    correct: 1,
    explanation: 'Multi-stage: Stage 1 (builder) mein npm install + tsc compile. Stage 2 (production) sirf compiled JS + production node_modules. devDependencies, TypeScript compiler, source .ts files — sab discard. Typical savings: 800MB → 150MB. Smaller image = faster deploy + less attack surface.',
    chapter: 23,
  },
]

// ─── Storage helpers ──────────────────────────────────────────────────────────

function loadChapterScores(): ChapterScore[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('nm_chapter_scores')
    return raw ? (JSON.parse(raw) as ChapterScore[]) : []
  } catch {
    return []
  }
}

function loadMockTestStats(): { taken: number; bestScore: number; lastScore: number; totalScoreSum: number } {
  if (typeof window === 'undefined') return { taken: 0, bestScore: 0, lastScore: 0, totalScoreSum: 0 }
  try {
    const raw = localStorage.getItem('nm_mock_stats')
    const parsed = raw ? JSON.parse(raw) : { taken: 0, bestScore: 0, lastScore: 0, totalScoreSum: 0 }
    return { totalScoreSum: 0, ...parsed }
  } catch {
    return { taken: 0, bestScore: 0, lastScore: 0, totalScoreSum: 0 }
  }
}

function saveMockTestStats(score: number, total: number) {
  if (typeof window === 'undefined') return
  const pct = Math.round((score / total) * 100)
  const prev = loadMockTestStats()
  const next = {
    taken: prev.taken + 1,
    bestScore: Math.max(prev.bestScore, pct),
    lastScore: pct,
    totalScoreSum: prev.totalScoreSum + pct,
  }
  localStorage.setItem('nm_mock_stats', JSON.stringify(next))
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const TIMER_SECS = 45

function ScoreBar({ score, total }: { score: number; total: number }) {
  const pct = Math.round((score / total) * 100)
  const color = pct >= 80 ? '#10B981' : pct >= 60 ? '#F59E0B' : '#EF4444'
  return (
    <div className="relative h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  )
}

function ChapterCard({
  chapter,
  scores,
}: {
  chapter: number
  scores: ChapterScore[]
}) {
  const score = scores.find((s) => s.chapter === chapter)
  const title = CHAPTER_TITLES[chapter]

  return (
    <div
      className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 transition-all duration-200 hover:border-[rgba(124,58,237,0.25)]"
      style={{ background: 'rgba(26,26,38,0.6)' }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <span className="text-[10px] font-mono text-[#52525B]">Ch.{chapter}</span>
          <p className="text-xs font-semibold text-[#A1A1AA] leading-snug">{title}</p>
        </div>
        {score ? (
          <span
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              background:
                score.score / score.total >= 0.8
                  ? 'rgba(16,185,129,0.15)'
                  : score.score / score.total >= 0.6
                  ? 'rgba(245,158,11,0.15)'
                  : 'rgba(239,68,68,0.15)',
              color:
                score.score / score.total >= 0.8
                  ? '#10B981'
                  : score.score / score.total >= 0.6
                  ? '#F59E0B'
                  : '#EF4444',
            }}
          >
            {Math.round((score.score / score.total) * 100)}%
          </span>
        ) : (
          <span className="text-[10px] font-mono text-[#52525B]">—</span>
        )}
      </div>
      {score ? (
        <ScoreBar score={score.score} total={score.total} />
      ) : (
        <div className="h-1.5 bg-[rgba(255,255,255,0.04)] rounded-full" />
      )}
    </div>
  )
}

function QuizQuestion({
  question,
  questionIndex,
  total,
  timeLeft,
  onAnswer,
  answered,
}: {
  question: Question
  questionIndex: number
  total: number
  timeLeft: number
  onAnswer: (idx: number) => void
  answered: number | null
}) {
  const timerPct = (timeLeft / TIMER_SECS) * 100
  const timerColor = timeLeft > 20 ? '#10B981' : timeLeft > 10 ? '#F59E0B' : '#EF4444'

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-[#71717A] font-mono">
          Q{questionIndex + 1} / {total}
        </span>
        <div className="flex items-center gap-2">
          <div
            className="relative w-12 h-12 flex-shrink-0"
            style={{
              background: `conic-gradient(${timerColor} ${timerPct}%, rgba(255,255,255,0.06) 0%)`,
              borderRadius: '50%',
            }}
          >
            <div
              className="absolute inset-1 rounded-full flex items-center justify-center text-sm font-bold font-mono"
              style={{ background: '#0A0A0F', color: timerColor }}
            >
              {timeLeft}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[rgba(255,255,255,0.06)] rounded-full mb-6 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${((questionIndex + 1) / total) * 100}%`,
            background: 'linear-gradient(90deg, #7C3AED, #06B6D4)',
          }}
        />
      </div>

      {/* Topic badge */}
      <span
        className="text-[10px] font-mono px-2.5 py-1 rounded-full mb-4 inline-block"
        style={{
          background: 'rgba(124,58,237,0.15)',
          color: '#A78BFA',
          border: '1px solid rgba(124,58,237,0.3)',
        }}
      >
        {question.topic} · Ch.{question.chapter}
      </span>

      {/* Question */}
      <div
        className="rounded-2xl border border-[rgba(255,255,255,0.1)] p-6 mb-6"
        style={{ background: 'rgba(26,26,38,0.8)' }}
      >
        <p className="text-base font-medium text-[#F5F5F7] leading-relaxed whitespace-pre-line">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, i) => {
          const isSelected = answered === i
          const isCorrect = i === question.correct
          const showFeedback = answered !== null

          let borderColor = 'rgba(255,255,255,0.1)'
          let bgColor = 'rgba(26,26,38,0.6)'
          let textColor = '#A1A1AA'

          if (showFeedback && isCorrect) {
            borderColor = 'rgba(16,185,129,0.5)'
            bgColor = 'rgba(16,185,129,0.1)'
            textColor = '#10B981'
          } else if (showFeedback && isSelected && !isCorrect) {
            borderColor = 'rgba(239,68,68,0.5)'
            bgColor = 'rgba(239,68,68,0.1)'
            textColor = '#EF4444'
          } else if (!showFeedback) {
            borderColor = 'rgba(255,255,255,0.1)'
            bgColor = 'rgba(26,26,38,0.6)'
            textColor = '#A1A1AA'
          }

          return (
            <button
              key={i}
              onClick={() => answered === null && onAnswer(i)}
              disabled={answered !== null}
              className="w-full text-left rounded-xl border p-4 transition-all duration-200 flex items-center gap-3"
              style={{ background: bgColor, borderColor, color: textColor }}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold font-mono flex-shrink-0"
                style={{
                  background: showFeedback && isCorrect
                    ? 'rgba(16,185,129,0.2)'
                    : showFeedback && isSelected && !isCorrect
                    ? 'rgba(239,68,68,0.2)'
                    : 'rgba(255,255,255,0.06)',
                  color: textColor,
                }}
              >
                {showFeedback && isCorrect ? '✓' : showFeedback && isSelected && !isCorrect ? '✗' : String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm">{option}</span>
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {answered !== null && (
        <div
          className="mt-5 rounded-xl border p-4 animate-fade-in"
          style={{
            background: 'rgba(6,182,212,0.06)',
            borderColor: 'rgba(6,182,212,0.2)',
          }}
        >
          <p className="text-xs font-mono text-[#06B6D4] uppercase tracking-wider mb-1.5">Explanation</p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}

function ResultsScreen({
  questions,
  answers,
  elapsed,
  onRetry,
  onBack,
}: {
  questions: Question[]
  answers: (number | null)[]
  elapsed: number
  onRetry: () => void
  onBack: () => void
}) {
  const correct = answers.filter((a, i) => a === questions[i].correct).length
  const total = questions.length
  const pct = Math.round((correct / total) * 100)
  const elapsedMin = Math.floor(elapsed / 60)
  const elapsedSec = elapsed % 60

  const grade =
    pct >= 90 ? { label: 'Outstanding!', color: '#10B981', emoji: '🏆' } :
    pct >= 75 ? { label: 'Bahut Achha!', color: '#7C3AED', emoji: '🎉' } :
    pct >= 60 ? { label: 'Theek Hai', color: '#F59E0B', emoji: '👍' } :
               { label: 'Aur Padho', color: '#EF4444', emoji: '📚' }

  // Breakdown by topic
  const topicStats: Record<string, { correct: number; total: number }> = {}
  questions.forEach((q, i) => {
    if (!topicStats[q.topic]) topicStats[q.topic] = { correct: 0, total: 0 }
    topicStats[q.topic].total++
    if (answers[i] === q.correct) topicStats[q.topic].correct++
  })

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Score hero */}
      <div
        className="rounded-2xl border p-8 text-center"
        style={{
          background: 'rgba(26,26,38,0.8)',
          borderColor: `${grade.color}33`,
        }}
      >
        <div className="text-5xl mb-3">{grade.emoji}</div>
        <h2 className="text-3xl font-bold mb-1" style={{ color: grade.color }}>
          {pct}%
        </h2>
        <p className="text-lg text-[#F5F5F7] font-semibold mb-1">{grade.label}</p>
        <p className="text-sm text-[#71717A]">
          {correct}/{total} correct · {elapsedMin}m {elapsedSec}s mein
        </p>
      </div>

      {/* Topic breakdown */}
      <div
        className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-5"
        style={{ background: 'rgba(26,26,38,0.6)' }}
      >
        <h3 className="text-sm font-bold text-[#F5F5F7] mb-4">Topic Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(topicStats).map(([topic, stat]) => {
            const tPct = Math.round((stat.correct / stat.total) * 100)
            const tColor = tPct >= 75 ? '#10B981' : tPct >= 50 ? '#F59E0B' : '#EF4444'
            return (
              <div key={topic}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#A1A1AA]">{topic}</span>
                  <span className="text-xs font-mono" style={{ color: tColor }}>
                    {stat.correct}/{stat.total}
                  </span>
                </div>
                <ScoreBar score={stat.correct} total={stat.total} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Question review */}
      <div
        className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-5"
        style={{ background: 'rgba(26,26,38,0.6)' }}
      >
        <h3 className="text-sm font-bold text-[#F5F5F7] mb-4">Question Review</h3>
        <div className="space-y-2">
          {questions.map((q, i) => {
            const isCorrect = answers[i] === q.correct
            const wasAnswered = answers[i] !== null
            return (
              <div
                key={q.id}
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{
                  background: isCorrect
                    ? 'rgba(16,185,129,0.06)'
                    : wasAnswered
                    ? 'rgba(239,68,68,0.06)'
                    : 'rgba(245,158,11,0.06)',
                }}
              >
                <span
                  className="text-sm flex-shrink-0 mt-0.5"
                  style={{ color: isCorrect ? '#10B981' : wasAnswered ? '#EF4444' : '#F59E0B' }}
                >
                  {isCorrect ? '✓' : wasAnswered ? '✗' : '⏰'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#A1A1AA] line-clamp-1">{q.question.split('\n')[0]}</p>
                  {!isCorrect && (
                    <p className="text-[10px] text-[#52525B] mt-0.5">
                      Correct: {q.options[q.correct]}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
            color: '#fff',
          }}
        >
          Dobara Khelo
        </button>
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.06)',
            color: '#A1A1AA',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          Hub pe Wapas
        </button>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function QuizPage() {
  const [phase, setPhase] = useState<'hub' | 'quiz' | 'results'>('hub')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(TIMER_SECS)
  const [startTime, setStartTime] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [chapterScores, setChapterScores] = useState<ChapterScore[]>([])
  const [mockStats, setMockStats] = useState({ taken: 0, bestScore: 0, lastScore: 0, totalScoreSum: 0 })
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS)
  const [waitingForNext, setWaitingForNext] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const nextRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    setChapterScores(loadChapterScores())
    setMockStats(loadMockTestStats())
  }, [])

  // Timer logic
  useEffect(() => {
    if (phase !== 'quiz') return
    if (waitingForNext) return

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // Time's up — mark as unanswered and move on
          handleAnswer(null)
          return TIMER_SECS
        }
        return t - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentQ, waitingForNext])

  const handleAnswer = useCallback(
    (answerIdx: number | null) => {
      if (waitingForNext) return
      if (timerRef.current) clearInterval(timerRef.current)
      setWaitingForNext(true)

      setAnswers((prev) => {
        const next = [...prev]
        next[currentQ] = answerIdx
        return next
      })

      // Move to next question after delay (let user see feedback)
      nextRef.current = setTimeout(() => {
        const nextQ = currentQ + 1
        if (nextQ >= questions.length) {
          // Quiz done
          const endTime = Date.now()
          setElapsed(Math.round((endTime - startTime) / 1000))
          setPhase('results')
          const finalAnswers = [...answers]
          finalAnswers[currentQ] = answerIdx
          const correct = finalAnswers.filter((a, i) => a === questions[i].correct).length
          saveMockTestStats(correct, questions.length)
          setMockStats(loadMockTestStats())
        } else {
          setCurrentQ(nextQ)
          setTimeLeft(TIMER_SECS)
          setWaitingForNext(false)
        }
      }, 1500)
    },
    [waitingForNext, currentQ, questions, startTime, answers]
  )

  const startQuiz = useCallback(() => {
    // Shuffle questions
    const shuffled = [...MOCK_QUESTIONS].sort(() => Math.random() - 0.5)
    setQuestions(shuffled)
    setCurrentQ(0)
    setAnswers(new Array(shuffled.length).fill(null))
    setTimeLeft(TIMER_SECS)
    setStartTime(Date.now())
    setWaitingForNext(false)
    setPhase('quiz')
  }, [])

  const goToHub = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (nextRef.current) clearTimeout(nextRef.current)
    setPhase('hub')
    setChapterScores(loadChapterScores())
    setMockStats(loadMockTestStats())
  }, [])

  // Stats
  const totalQuizzesTaken = mockStats.taken
  const avgScore = mockStats.taken > 0 ? Math.round(mockStats.totalScoreSum / mockStats.taken) : 0

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* ── Header ── */}
      <div className="relative border-b border-[rgba(255,255,255,0.08)] py-10 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/3 w-80 h-80 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
          style={{ background: '#7C3AED' }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          {phase === 'hub' && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🧠</span>
                <h1 className="text-3xl font-bold text-[#F5F5F7]">Test Apna Gyan</h1>
              </div>
              <p className="text-[#71717A]">
                Mock tests aur chapter quizzes — apni progress track karo
              </p>
            </>
          )}
          {phase === 'quiz' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <h1 className="text-2xl font-bold text-[#F5F5F7]">Mock Test</h1>
              </div>
              <button
                onClick={goToHub}
                className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  color: '#EF4444',
                  border: '1px solid rgba(239,68,68,0.25)',
                }}
              >
                Quit
              </button>
            </div>
          )}
          {phase === 'results' && (
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <h1 className="text-2xl font-bold text-[#F5F5F7]">Results</h1>
            </div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* ── HUB ── */}
        {phase === 'hub' && (
          <div className="space-y-10">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Tests Liye', value: totalQuizzesTaken.toString(), color: '#7C3AED' },
                { label: 'Best Score', value: mockStats.taken > 0 ? `${mockStats.bestScore}%` : '—', color: '#10B981' },
                { label: 'Last Score', value: mockStats.taken > 0 ? `${mockStats.lastScore}%` : '—', color: '#06B6D4' },
                { label: 'Avg Score', value: mockStats.taken > 0 ? `${avgScore}%` : '—', color: '#F59E0B' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[rgba(255,255,255,0.08)] p-4 text-center"
                  style={{ background: 'rgba(26,26,38,0.6)' }}
                >
                  <p className="text-2xl font-bold font-mono" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#71717A] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Mock test CTA */}
            <div
              className="rounded-2xl border p-8 relative overflow-hidden"
              style={{
                background: 'rgba(124,58,237,0.08)',
                borderColor: 'rgba(124,58,237,0.25)',
              }}
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ background: '#7C3AED' }}
              />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🎯</span>
                    <h2 className="text-xl font-bold text-[#F5F5F7]">Mixed Mock Test</h2>
                  </div>
                  <p className="text-sm text-[#A1A1AA] mb-1">
                    {MOCK_QUESTIONS.length} questions · All chapters · 60s per question
                  </p>
                  <p className="text-xs text-[#71717A]">
                    Sab topics mix hoke aate hain — real exam jaise!
                  </p>
                </div>
                <button
                  onClick={startQuiz}
                  className="flex-shrink-0 px-8 py-4 rounded-xl text-base font-bold transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                    color: '#fff',
                    boxShadow: '0 0 30px rgba(124,58,237,0.4)',
                  }}
                >
                  Mock Test Shuru Karo →
                </button>
              </div>
            </div>

            {/* Chapter grid */}
            <div>
              <h2 className="text-lg font-bold text-[#F5F5F7] mb-4">Chapter Quiz Scores</h2>
              <p className="text-xs text-[#71717A] mb-5">
                Ye scores chapter pages pe embedded quizzes se aate hain. Har chapter mein quiz complete karo!
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {Object.keys(CHAPTER_TITLES).map((ch) => (
                  <ChapterCard
                    key={ch}
                    chapter={parseInt(ch)}
                    scores={chapterScores}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {phase === 'quiz' && (
          <QuizQuestion
            question={questions[currentQ]}
            questionIndex={currentQ}
            total={questions.length}
            timeLeft={timeLeft}
            onAnswer={handleAnswer}
            answered={answers[currentQ] ?? null}
          />
        )}

        {/* ── RESULTS ── */}
        {phase === 'results' && (
          <ResultsScreen
            questions={questions}
            answers={answers}
            elapsed={elapsed}
            onRetry={startQuiz}
            onBack={goToHub}
          />
        )}
      </div>
    </div>
  )
}
