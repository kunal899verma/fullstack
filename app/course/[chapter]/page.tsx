import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, ChevronRight, Clock, BookOpen, CheckCircle2, ArrowLeft } from 'lucide-react'
import { chapters, difficultyConfig } from '@/lib/chapters'
import TableOfContents, { type TocItem } from '@/components/learn/TableOfContents'
import Chapter1Content from '@/components/chapters/Chapter1Content'
import Chapter2Content from '@/components/chapters/Chapter2Content'
import Chapter3Content from '@/components/chapters/Chapter3Content'
import Chapter4Content from '@/components/chapters/Chapter4Content'
import Chapter5Content from '@/components/chapters/Chapter5Content'
import Chapter6Content from '@/components/chapters/Chapter6Content'
import Chapter7Content from '@/components/chapters/Chapter7Content'
import Chapter8Content from '@/components/chapters/Chapter8Content'
import Chapter9Content from '@/components/chapters/Chapter9Content'
import Chapter10Content from '@/components/chapters/Chapter10Content'
import Chapter11Content from '@/components/chapters/Chapter11Content'
import Chapter12Content from '@/components/chapters/Chapter12Content'
import Chapter13Content from '@/components/chapters/Chapter13Content'
import Chapter14Content from '@/components/chapters/Chapter14Content'
import Chapter15Content from '@/components/chapters/Chapter15Content'
import Chapter16Content from '@/components/chapters/Chapter16Content'
import Chapter17Content from '@/components/chapters/Chapter17Content'
import Chapter18Content from '@/components/chapters/Chapter18Content'
import Chapter19Content from '@/components/chapters/Chapter19Content'
import Chapter20Content from '@/components/chapters/Chapter20Content'
import Chapter21Content from '@/components/chapters/Chapter21Content'
import Chapter22Content from '@/components/chapters/Chapter22Content'
import Chapter23Content from '@/components/chapters/Chapter23Content'
import ChapterProgressButton from '@/components/chapters/ChapterProgressButton'

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return chapters.map((chapter) => ({
    chapter: chapter.slug,
  }))
}

// ── TOC data per chapter ──────────────────────────────────────────────────────

const chapter1Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'architecture-diagram', title: 'Architecture Diagram', level: 1 },
  { id: 'v8-engine', title: 'V8 Engine', level: 1 },
  { id: 'libuv', title: 'libuv — Hidden Hero', level: 1 },
  { id: 'event-loop-intro', title: 'Event Loop Teaser', level: 1 },
  { id: 'single-threaded', title: 'Single-Threaded Concurrency', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter2Toc: TocItem[] = [
  { id: 'intro', title: 'Chapter Intro', level: 1 },
  { id: 'call-stack', title: 'Call Stack', level: 1 },
  { id: 'node-apis', title: 'Node.js APIs', level: 1 },
  { id: 'callback-queue', title: 'Callback Queue', level: 1 },
  { id: 'microtask-queue', title: 'Microtask Queue', level: 1 },
  { id: 'event-loop', title: 'Event Loop Orchestrator', level: 1 },
  { id: 'nexttick-vs-immediate', title: 'nextTick vs setImmediate', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter3Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'what-is-module', title: 'Module Kya Hai?', level: 1 },
  { id: 'commonjs', title: 'CommonJS — require()', level: 1 },
  { id: 'esm', title: 'ES Modules — import/export', level: 1 },
  { id: 'cjs-vs-esm', title: 'CJS vs ESM Decision', level: 1 },
  { id: 'module-resolution', title: 'Module Resolution', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter4Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'package-json', title: 'package.json', level: 1 },
  { id: 'semver', title: 'Semver — Version Numbers', level: 1 },
  { id: 'package-lock', title: 'package-lock.json', level: 1 },
  { id: 'npm-scripts', title: 'npm Scripts', level: 1 },
  { id: 'npx', title: 'npx — Bina Install Kiye', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter5Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'fs-module-overview', title: 'fs Module — Teen Tarike', level: 1 },
  { id: 'reading-files', title: 'Files Padhna', level: 1 },
  { id: 'writing-files', title: 'Files Likhna', level: 1 },
  { id: 'directory-operations', title: 'Directory Operations', level: 1 },
  { id: 'file-watching', title: 'File Watching', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter6Toc: TocItem[] = [
  { id: 'intro', title: 'Chapter Intro', level: 1 },
  { id: 'callbacks', title: 'Callbacks', level: 1 },
  { id: 'promises', title: 'Promises', level: 1 },
  { id: 'async-await', title: 'async/await', level: 1 },
  { id: 'event-loop', title: 'Event Loop Anatomy', level: 1 },
  { id: 'promise-combinators', title: 'Promise.all / race / allSettled', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter7Toc: TocItem[] = [
  { id: 'intro', title: 'Chapter Intro', level: 1 },
  { id: 'promise-states', title: 'Promise States', level: 1 },
  { id: 'what-is-promise', title: 'Promise Kya Hai?', level: 1 },
  { id: 'promise-chaining', title: '.then().catch().finally()', level: 1 },
  { id: 'promise-all', title: 'Promise.all — Parallel', level: 1 },
  { id: 'promise-utilities', title: 'race / allSettled / any', level: 1 },
  { id: 'promisify', title: 'Callback ko Promisify Karo', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter8Toc: TocItem[] = [
  { id: 'intro', title: 'Chapter Intro', level: 1 },
  { id: 'async-flow', title: 'async/await Flow', level: 1 },
  { id: 'async-await-basics', title: 'async/await Basics', level: 1 },
  { id: 'async-error-handling', title: 'Error Handling', level: 1 },
  { id: 'sequential-vs-parallel', title: 'Sequential vs Parallel', level: 1 },
  { id: 'top-level-await', title: 'Top-Level await', level: 1 },
  { id: 'async-iteration', title: 'for await...of', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter9Toc: TocItem[] = [
  { id: 'intro', title: 'Chapter Intro', level: 1 },
  { id: 'stream-types', title: 'Stream Types', level: 1 },
  { id: 'what-is-stream', title: 'Streams Kya Hain?', level: 1 },
  { id: 'readable-stream', title: 'Readable Stream', level: 1 },
  { id: 'writable-stream', title: 'Writable Stream', level: 1 },
  { id: 'transform-stream', title: 'Transform Stream', level: 1 },
  { id: 'backpressure', title: 'Backpressure', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter18Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'testing-pyramid', title: 'Testing Pyramid', level: 1 },
  { id: 'jest-setup', title: 'Jest Setup', level: 1 },
  { id: 'supertest', title: 'Supertest — API Testing', level: 1 },
  { id: 'mocking', title: 'Mocking in Node.js', level: 1 },
  { id: 'ci-cd-testing', title: 'CI/CD mein Testing', level: 1 },
  { id: 'complete-test-example', title: 'Complete Test Example', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter19Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'profiling', title: 'Node.js Profiling', level: 1 },
  { id: 'memory-leaks', title: 'Memory Leak Detection', level: 1 },
  { id: 'cpu-optimization', title: 'CPU Optimization', level: 1 },
  { id: 'database-performance', title: 'Database Performance', level: 1 },
  { id: 'caching', title: 'Caching Strategies', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter20Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'owasp', title: 'OWASP Top 10', level: 1 },
  { id: 'input-validation', title: 'Input Validation', level: 1 },
  { id: 'http-headers', title: 'HTTP Security Headers', level: 1 },
  { id: 'rate-limiting', title: 'Rate Limiting', level: 1 },
  { id: 'secrets', title: 'Secrets Management', level: 1 },
  { id: 'vulnerable-vs-secured', title: 'Vulnerable vs Secured', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter21Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'vs-monolith', title: 'Microservices vs Monolith', level: 1 },
  { id: 'communication', title: 'Communication Patterns', level: 1 },
  { id: 'bullmq', title: 'BullMQ Job Queues', level: 1 },
  { id: 'api-gateway', title: 'API Gateway Pattern', level: 1 },
  { id: 'service-discovery', title: 'Service Discovery', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter22Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'dockerfile', title: 'Docker for Node.js', level: 1 },
  { id: 'docker-compose', title: 'Docker Compose', level: 1 },
  { id: 'github-actions', title: 'GitHub Actions CI/CD', level: 1 },
  { id: 'nginx', title: 'Nginx Reverse Proxy', level: 1 },
  { id: 'zero-downtime', title: 'Zero-Downtime Deployment', level: 1 },
  { id: 'production-dockerfile', title: 'Production Dockerfile', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter23Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'senior-mindset', title: 'Senior Mindset', level: 1 },
  { id: 'design-patterns', title: 'Design Patterns', level: 1 },
  { id: 'observability', title: 'Observability', level: 1 },
  { id: 'career-growth', title: 'Career Growth', level: 1 },
  { id: 'architecture-decisions', title: 'Architecture Decisions & ADRs', level: 1 },
  { id: 'final-message', title: 'Course Complete!', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter10Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'what-is-buffer', title: 'Buffer Kya Hai?', level: 1 },
  { id: 'buffer-creation', title: 'Buffer Creation', level: 1 },
  { id: 'buffer-encoding', title: 'Buffer Encodings', level: 1 },
  { id: 'buffer-operations', title: 'Buffer Operations', level: 1 },
  { id: 'buffer-vs-stream', title: 'Buffer vs Stream', level: 1 },
]

const chapter11Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'http-basics', title: 'http Module Basics', level: 1 },
  { id: 'request-handling', title: 'Request Handling', level: 1 },
  { id: 'response-handling', title: 'Response Handling', level: 1 },
  { id: 'rest-principles', title: 'REST Principles', level: 1 },
  { id: 'http-status-codes', title: 'HTTP Status Codes', level: 1 },
]

const chapter12Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'middleware-chain', title: 'Middleware Chain', level: 1 },
  { id: 'express-router', title: 'Express Router', level: 1 },
  { id: 'error-handling', title: 'Error Handling Middleware', level: 1 },
  { id: 'validation', title: 'Request Validation — Zod', level: 1 },
  { id: 'production-patterns', title: 'Production Patterns', level: 1 },
]

const chapter13Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'postgres-vs-mongo', title: 'PostgreSQL vs MongoDB', level: 1 },
  { id: 'prisma-orm', title: 'Prisma ORM', level: 1 },
  { id: 'mongoose', title: 'Mongoose ODM', level: 1 },
  { id: 'connection-pooling', title: 'Connection Pooling', level: 1 },
  { id: 'n-plus-one', title: 'N+1 Problem', level: 1 },
]

const chapter14Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'sessions-vs-jwt', title: 'Sessions vs JWT', level: 1 },
  { id: 'jwt-implementation', title: 'JWT Implementation', level: 1 },
  { id: 'bcrypt', title: 'bcrypt Password Hashing', level: 1 },
  { id: 'refresh-tokens', title: 'Refresh Token Pattern', level: 1 },
  { id: 'oauth', title: 'OAuth 2.0 Basics', level: 1 },
]

const chapter15Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'why-cache', title: 'Why Cache?', level: 1 },
  { id: 'redis-data-types', title: 'Redis Data Types', level: 1 },
  { id: 'cache-strategies', title: 'Cache Strategies', level: 1 },
  { id: 'ttl-eviction', title: 'TTL & Eviction', level: 1 },
  { id: 'bullmq-queues', title: 'BullMQ Queues', level: 1 },
]

const chapter16Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'http-vs-websocket', title: 'HTTP vs WebSocket', level: 1 },
  { id: 'socketio-basics', title: 'Socket.IO Basics', level: 1 },
  { id: 'broadcasting', title: 'Broadcasting & Rooms', level: 1 },
  { id: 'scaling-websockets', title: 'Scaling WebSockets', level: 1 },
  { id: 'sse', title: 'Server-Sent Events', level: 1 },
]

const chapter17Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'cpu-vs-io', title: 'CPU-bound vs I/O-bound', level: 1 },
  { id: 'worker-threads', title: 'Worker Threads', level: 1 },
  { id: 'cluster-module', title: 'Cluster Module', level: 1 },
  { id: 'pm2', title: 'PM2 Process Manager', level: 1 },
  { id: 'shared-array-buffer', title: 'SharedArrayBuffer', level: 1 },
]

function getTocForSlug(slug: string): TocItem[] {
  if (slug === 'what-is-nodejs') return chapter1Toc
  if (slug === 'event-loop-deep-dive') return chapter2Toc
  if (slug === 'modules-commonjs-esm') return chapter3Toc
  if (slug === 'npm-and-packages') return chapter4Toc
  if (slug === 'file-system') return chapter5Toc
  if (slug === 'async-callbacks') return chapter6Toc
  if (slug === 'promises') return chapter7Toc
  if (slug === 'async-await') return chapter8Toc
  if (slug === 'streams') return chapter9Toc
  if (slug === 'buffers-and-binary') return chapter10Toc
  if (slug === 'http-and-rest-apis') return chapter11Toc
  if (slug === 'express-deep-dive') return chapter12Toc
  if (slug === 'databases-and-orms') return chapter13Toc
  if (slug === 'authentication-jwt') return chapter14Toc
  if (slug === 'caching-redis') return chapter15Toc
  if (slug === 'websockets-realtime') return chapter16Toc
  if (slug === 'worker-threads') return chapter17Toc
  if (slug === 'testing') return chapter18Toc
  if (slug === 'performance-profiling') return chapter19Toc
  if (slug === 'security') return chapter20Toc
  if (slug === 'microservices') return chapter21Toc
  if (slug === 'docker-and-containers') return chapter22Toc
  if (slug === 'deployment-and-ci-cd') return chapter23Toc
  return []
}

// ── Page params ───────────────────────────────────────────────────────────────

interface PageProps {
  params: { chapter: string }
}

// ── Difficulty badge (server component) ──────────────────────────────────────

function DiffBadge({ difficulty }: { difficulty: 'beginner' | 'intermediate' | 'advanced' }) {
  const cfg = difficultyConfig[difficulty]
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      {cfg.label}
    </span>
  )
}

// ── Coming Soon state ─────────────────────────────────────────────────────────

function ComingSoon({ slug }: { slug: string }) {
  const chapter = chapters.find(c => c.slug === slug)
  if (!chapter) return null

  const phaseColors = ['#10B981', '#F59E0B', '#7C3AED']
  const phaseColor = phaseColors[chapter.phase - 1]

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20 px-4">
      {/* Big chapter number */}
      <div
        className="text-8xl md:text-9xl font-display font-bold mb-4 leading-none select-none"
        style={{
          background: `linear-gradient(135deg, ${phaseColor}, ${phaseColor}55)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {String(chapter.number).padStart(2, '0')}
      </div>

      <h1 className="text-3xl font-display font-bold text-[#F5F5F7] mb-2">{chapter.title}</h1>
      <p className="text-[#71717A] text-base mb-6 max-w-md">{chapter.subtitle}</p>

      {/* Metadata badges */}
      <div className="flex items-center gap-3 flex-wrap justify-center mb-8">
        <DiffBadge difficulty={chapter.difficulty} />
        <span className="flex items-center gap-1.5 text-sm text-[#71717A]">
          <Clock className="w-4 h-4" />
          {chapter.estimatedMinutes} min
        </span>
        <span className="flex items-center gap-1.5 text-sm text-[#71717A]">
          <BookOpen className="w-4 h-4" />
          {chapter.conceptCount} concepts
        </span>
      </div>

      {/* Topics */}
      <div className="flex flex-wrap gap-2 justify-center mb-10 max-w-lg">
        {chapter.topics.map(topic => (
          <span
            key={topic}
            className="px-3 py-1 rounded-full text-xs font-medium text-[#A1A1AA] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Coming soon message */}
      <div
        className="rounded-2xl px-8 py-5 mb-8 max-w-sm"
        style={{
          background: `rgba(${chapter.phase === 3 ? '124,58,237' : chapter.phase === 2 ? '245,158,11' : '16,185,129'}, 0.08)`,
          border: `1px solid ${phaseColor}30`,
        }}
      >
        <p className="text-2xl mb-2">🚀</p>
        <p className="font-semibold text-[#F5F5F7] mb-1">Ye chapter jald aa raha hai!</p>
        <p className="text-sm text-[#71717A]">
          Hum isse carefully craft kar rahe hain. Abhi ke liye available chapters padho.
        </p>
      </div>

      <Link
        href="/course"
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: 'rgba(124,58,237,0.15)',
          border: '1px solid rgba(124,58,237,0.35)',
          color: '#9D5FF0',
        }}
      >
        <ArrowLeft className="w-4 h-4" />
        Course Page Par Wapas Jao
      </Link>
    </div>
  )
}

// ── Right sidebar quick nav ───────────────────────────────────────────────────

function RightSidebar({ chapterId }: { chapterId: number }) {
  const idx = chapters.findIndex(c => c.number === chapterId)
  const prev = idx > 0 ? chapters[idx - 1] : null
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null

  return (
    <aside className="w-56 shrink-0 hidden xl:flex flex-col sticky top-24 self-start gap-4">
      {/* Quick nav */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: 'rgba(18,18,26,0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-3">Quick Nav</p>
        <div className="space-y-2">
          {prev && (
            <Link
              href={`/course/${prev.slug}`}
              className="flex items-center gap-2 text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors group"
            >
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              <span className="truncate">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/course/${next.slug}`}
              className="flex items-center gap-2 text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors group"
            >
              <span className="truncate">{next.title}</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>

      {/* Phase info */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: 'rgba(18,18,26,0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-2">In this chapter</p>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
          <span className="text-xs text-[#A1A1AA]">{chapters.find(c => c.number === chapterId)?.conceptCount} concepts</span>
        </div>
      </div>
    </aside>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ChapterPage({ params }: PageProps) {
  const { chapter: slug } = params

  const chapter = chapters.find(c => c.slug === slug)
  if (!chapter) notFound()

  const hasContent = (
    slug === 'what-is-nodejs' ||
    slug === 'event-loop-deep-dive' ||
    slug === 'modules-commonjs-esm' ||
    slug === 'npm-and-packages' ||
    slug === 'file-system' ||
    slug === 'async-callbacks' ||
    slug === 'promises' ||
    slug === 'async-await' ||
    slug === 'streams' ||
    slug === 'buffers-and-binary' ||
    slug === 'http-and-rest-apis' ||
    slug === 'express-deep-dive' ||
    slug === 'databases-and-orms' ||
    slug === 'authentication-jwt' ||
    slug === 'caching-redis' ||
    slug === 'websockets-realtime' ||
    slug === 'worker-threads' ||
    slug === 'testing' ||
    slug === 'performance-profiling' ||
    slug === 'security' ||
    slug === 'microservices' ||
    slug === 'docker-and-containers' ||
    slug === 'deployment-and-ci-cd'
  )
  const toc = getTocForSlug(slug)

  const chapterIdx = chapters.findIndex(c => c.slug === slug)
  const prevChapter = chapterIdx > 0 ? chapters[chapterIdx - 1] : null
  const nextChapter = chapterIdx < chapters.length - 1 ? chapters[chapterIdx + 1] : null

  const phaseColors = ['#10B981', '#F59E0B', '#7C3AED']
  const phaseColor = phaseColors[chapter.phase - 1]

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* ── Chapter Header ──────────────────────────────────────────────── */}
      <div
        className="relative py-10 md:py-14 overflow-hidden"
        style={{ background: '#12121A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Background glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 80% at 50% 0%, ${phaseColor}18 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5 text-xs text-[#71717A]">
            <Link href="/" className="hover:text-[#A1A1AA] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/course" className="hover:text-[#A1A1AA] transition-colors">Course</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#A1A1AA]">Chapter {chapter.number}</span>
          </div>

          {/* Chapter number badge */}
          <div
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4"
            style={{
              background: `${phaseColor}18`,
              border: `1px solid ${phaseColor}35`,
              color: phaseColor,
            }}
          >
            Chapter {String(chapter.number).padStart(2, '0')} &middot; Phase {chapter.phase}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#F5F5F7] mb-3 tracking-tight max-w-3xl">
            {chapter.title}
          </h1>
          <p className="text-base md:text-lg text-[#A1A1AA] mb-5 max-w-2xl">{chapter.subtitle}</p>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-3">
            <DiffBadge difficulty={chapter.difficulty} />
            <span className="flex items-center gap-1.5 text-sm text-[#71717A]">
              <Clock className="w-4 h-4" />
              {chapter.estimatedMinutes} min
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[#71717A]">
              <BookOpen className="w-4 h-4" />
              {chapter.conceptCount} concepts
            </span>
          </div>

          {/* Mark complete — client component */}
          <div className="mt-5">
            <ChapterProgressButton chapterId={chapter.number} chapterSlug={chapter.slug} />
          </div>
        </div>
      </div>

      {/* ── Main content area ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {hasContent ? (
          <div className="flex gap-8">
            {/* Left TOC sidebar */}
            <aside className="w-64 shrink-0 hidden lg:block">
              <TableOfContents items={toc} />
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0 max-w-3xl">
              {slug === 'what-is-nodejs' && <Chapter1Content />}
              {slug === 'event-loop-deep-dive' && <Chapter2Content />}
              {slug === 'modules-commonjs-esm' && <Chapter3Content />}
              {slug === 'npm-and-packages' && <Chapter4Content />}
              {slug === 'file-system' && <Chapter5Content />}
              {slug === 'async-callbacks' && <Chapter6Content />}
              {slug === 'promises' && <Chapter7Content />}
              {slug === 'async-await' && <Chapter8Content />}
              {slug === 'streams' && <Chapter9Content />}
              {slug === 'buffers-and-binary' && <Chapter10Content />}
              {slug === 'http-and-rest-apis' && <Chapter11Content />}
              {slug === 'express-deep-dive' && <Chapter12Content />}
              {slug === 'databases-and-orms' && <Chapter13Content />}
              {slug === 'authentication-jwt' && <Chapter14Content />}
              {slug === 'caching-redis' && <Chapter15Content />}
              {slug === 'websockets-realtime' && <Chapter16Content />}
              {slug === 'worker-threads' && <Chapter17Content />}
              {slug === 'testing' && <Chapter18Content />}
              {slug === 'performance-profiling' && <Chapter19Content />}
              {slug === 'security' && <Chapter20Content />}
              {slug === 'microservices' && <Chapter21Content />}
              {slug === 'docker-and-containers' && <Chapter22Content />}
              {slug === 'deployment-and-ci-cd' && <Chapter23Content />}

              {/* Bottom prev/next nav */}
              <div className="mt-12 flex gap-4">
                {prevChapter && (
                  <Link
                    href={`/course/${prevChapter.slug}`}
                    className="flex-1 flex items-center gap-3 rounded-2xl p-4 transition-all duration-200 hover:-translate-x-0.5 group"
                    style={{
                      background: 'rgba(26,26,38,0.8)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <ChevronLeft className="w-5 h-5 text-[#71717A] shrink-0 group-hover:text-[#A1A1AA] transition-colors" />
                    <div>
                      <p className="text-xs text-[#71717A] mb-0.5">Pichla Chapter</p>
                      <p className="text-sm font-semibold text-[#F5F5F7] leading-tight">{prevChapter.title}</p>
                    </div>
                  </Link>
                )}
                {nextChapter && (
                  <Link
                    href={`/course/${nextChapter.slug}`}
                    className="flex-1 flex items-center justify-end gap-3 rounded-2xl p-4 transition-all duration-200 hover:translate-x-0.5 group text-right"
                    style={{
                      background: 'rgba(26,26,38,0.8)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div>
                      <p className="text-xs text-[#71717A] mb-0.5">Agla Chapter</p>
                      <p className="text-sm font-semibold text-[#F5F5F7] leading-tight">{nextChapter.title}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#71717A] shrink-0 group-hover:text-[#A1A1AA] transition-colors" />
                  </Link>
                )}
              </div>
            </main>

            {/* Right sidebar */}
            <RightSidebar chapterId={chapter.number} />
          </div>
        ) : (
          <ComingSoon slug={slug} />
        )}
      </div>
    </div>
  )
}
