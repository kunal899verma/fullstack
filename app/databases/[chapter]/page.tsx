import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, ChevronRight, Clock, BookOpen, CheckCircle2, ArrowLeft } from 'lucide-react'
import { dbChapters, dbDifficultyConfig } from '@/lib/db-chapters'
import TableOfContents, { type TocItem } from '@/components/learn/TableOfContents'
import DBChapter1Content from '@/components/db-chapters/DBChapter1Content'
import DBChapter2Content from '@/components/db-chapters/DBChapter2Content'
import DBChapter3Content from '@/components/db-chapters/DBChapter3Content'
import DBChapter4Content from '@/components/db-chapters/DBChapter4Content'
import DBChapter5Content from '@/components/db-chapters/DBChapter5Content'
import DBChapter6Content from '@/components/db-chapters/DBChapter6Content'
import DBChapter7Content from '@/components/db-chapters/DBChapter7Content'
import DBChapter8Content from '@/components/db-chapters/DBChapter8Content'
import DBChapter9Content from '@/components/db-chapters/DBChapter9Content'
import DBChapter10Content from '@/components/db-chapters/DBChapter10Content'
import DBChapter11Content from '@/components/db-chapters/DBChapter11Content'
import DBChapter12Content from '@/components/db-chapters/DBChapter12Content'

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return dbChapters.map((chapter) => ({
    chapter: chapter.slug,
  }))
}

// ── TOC data per chapter ──────────────────────────────────────────────────────

const dbChapter1Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'sql-vs-nosql', title: 'SQL vs NoSQL', level: 1 },
  { id: 'acid-properties', title: 'ACID Properties', level: 1 },
  { id: 'relational-model', title: 'Relational Model', level: 1 },
  { id: 'popular-databases', title: 'Popular Databases', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const dbChapter2Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'select-basics', title: 'SELECT & WHERE', level: 1 },
  { id: 'insert-into', title: 'INSERT INTO', level: 1 },
  { id: 'update-delete', title: 'UPDATE & DELETE', level: 1 },
  { id: 'order-limit-offset', title: 'ORDER BY, LIMIT & OFFSET', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const dbChapter3Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'primary-foreign-keys', title: 'Primary & Foreign Keys', level: 1 },
  { id: 'inner-join', title: 'INNER JOIN', level: 1 },
  { id: 'left-right-join', title: 'LEFT & RIGHT JOIN', level: 1 },
  { id: 'normalization', title: 'Normalization', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const dbChapter4Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'aggregate-functions', title: 'Aggregate Functions', level: 1 },
  { id: 'group-by', title: 'GROUP BY & HAVING', level: 1 },
  { id: 'subqueries', title: 'Subqueries', level: 1 },
  { id: 'case-expressions', title: 'CASE & NULL Handling', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const dbChapter5Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'ctes', title: 'CTEs — WITH Clause', level: 1 },
  { id: 'window-functions', title: 'Window Functions', level: 1 },
  { id: 'jsonb', title: 'JSONB', level: 1 },
  { id: 'explain-analyze', title: 'EXPLAIN ANALYZE', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const dbChapter6Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'find-operators', title: 'find() & Query Operators', level: 1 },
  { id: 'update-operators', title: 'Update Operators', level: 1 },
  { id: 'aggregation-pipeline', title: 'Aggregation Pipeline', level: 1 },
  { id: 'schema-design', title: 'Schema Design', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const dbChapter7Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'explain-analyze', title: 'EXPLAIN ANALYZE', level: 1 },
  { id: 'composite-index', title: 'Composite Index Strategy', level: 1 },
  { id: 'n-plus-one', title: 'N+1 Problem', level: 1 },
  { id: 'covering-indexes', title: 'Covering Indexes', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const dbChapter8Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'prisma-schema', title: 'Prisma Schema', level: 1 },
  { id: 'prisma-crud', title: 'Prisma CRUD', level: 1 },
  { id: 'prisma-relations', title: 'Relations & Includes', level: 1 },
  { id: 'prisma-transactions', title: 'Transactions & Raw Queries', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const dbChapter9Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'mongoose-schema', title: 'Schema Definition', level: 1 },
  { id: 'mongoose-methods', title: 'Model Methods & Statics', level: 1 },
  { id: 'mongoose-virtuals-hooks', title: 'Virtuals, Hooks & populate()', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const dbChapter10Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'begin-commit-rollback', title: 'BEGIN, COMMIT & ROLLBACK', level: 1 },
  { id: 'isolation-levels', title: 'Isolation Levels & Dirty Reads', level: 1 },
  { id: 'deadlocks', title: 'Deadlocks', level: 1 },
  { id: 'optimistic-locking', title: 'Optimistic vs Pessimistic Locking', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const dbChapter11Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'repository-pattern', title: 'Repository Pattern', level: 1 },
  { id: 'soft-deletes', title: 'Soft Deletes & Audit Trails', level: 1 },
  { id: 'event-sourcing', title: 'Event Sourcing & CQRS', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const dbChapter12Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'connection-pooling', title: 'Connection Pooling', level: 1 },
  { id: 'read-replicas', title: 'Read Replicas & Sharding', level: 1 },
  { id: 'db-caching', title: 'Database Caching', level: 1 },
  { id: 'cap-theorem', title: 'CAP Theorem', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

function getTocForSlug(slug: string): TocItem[] {
  if (slug === 'db-intro') return dbChapter1Toc
  if (slug === 'sql-basics') return dbChapter2Toc
  if (slug === 'sql-joins') return dbChapter3Toc
  if (slug === 'sql-aggregations') return dbChapter4Toc
  if (slug === 'postgresql-advanced') return dbChapter5Toc
  if (slug === 'mongodb-queries') return dbChapter6Toc
  if (slug === 'query-optimization') return dbChapter7Toc
  if (slug === 'prisma-orm') return dbChapter8Toc
  if (slug === 'mongoose-odm') return dbChapter9Toc
  if (slug === 'transactions') return dbChapter10Toc
  if (slug === 'db-design-patterns') return dbChapter11Toc
  if (slug === 'db-scaling') return dbChapter12Toc
  return []
}

// ── Page params ───────────────────────────────────────────────────────────────

interface PageProps {
  params: { chapter: string }
}

// ── Difficulty badge ──────────────────────────────────────────────────────────

function DiffBadge({ difficulty }: { difficulty: 'beginner' | 'intermediate' | 'advanced' }) {
  const cfg = dbDifficultyConfig[difficulty]
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${cfg.color} ${cfg.bg} ${cfg.border}`}
    >
      {cfg.label}
    </span>
  )
}

// ── Coming Soon state ─────────────────────────────────────────────────────────

function ComingSoon({ slug }: { slug: string }) {
  const chapter = dbChapters.find((c) => c.slug === slug)
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
        {chapter.topics.map((topic) => (
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
        <p className="font-semibold text-[#F5F5F7] mb-1">Ye chapter jald aa raha hai bhai!</p>
        <p className="text-sm text-[#71717A]">
          Hum isse dhyan se craft kar rahe hain. Tab tak available chapters padho.
        </p>
      </div>

      <Link
        href="/databases"
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: 'rgba(255,107,53,0.12)',
          border: '1px solid rgba(255,107,53,0.35)',
          color: '#FF6B35',
        }}
      >
        <ArrowLeft className="w-4 h-4" />
        Database Queries Track Par Wapas Jao
      </Link>
    </div>
  )
}

// ── Right sidebar quick nav ───────────────────────────────────────────────────

function RightSidebar({ chapterNumber }: { chapterNumber: number }) {
  const idx = dbChapters.findIndex((c) => c.number === chapterNumber)
  const prev = idx > 0 ? dbChapters[idx - 1] : null
  const next = idx < dbChapters.length - 1 ? dbChapters[idx + 1] : null
  const current = dbChapters[idx]

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
              href={`/databases/${prev.slug}`}
              className="flex items-center gap-2 text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors group"
            >
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              <span className="truncate">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/databases/${next.slug}`}
              className="flex items-center gap-2 text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors group"
            >
              <span className="truncate">{next.title}</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>

      {/* Concepts count */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: 'rgba(18,18,26,0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-2">Is Chapter Mein</p>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#FF6B35]" />
          <span className="text-xs text-[#A1A1AA]">{current?.conceptCount} concepts</span>
        </div>
      </div>
    </aside>
  )
}

// ── Content resolver ──────────────────────────────────────────────────────────

function getContentForSlug(slug: string): React.ReactNode {
  if (slug === 'db-intro') return <DBChapter1Content />
  if (slug === 'sql-basics') return <DBChapter2Content />
  if (slug === 'sql-joins') return <DBChapter3Content />
  if (slug === 'sql-aggregations') return <DBChapter4Content />
  if (slug === 'postgresql-advanced') return <DBChapter5Content />
  if (slug === 'mongodb-queries') return <DBChapter6Content />
  if (slug === 'query-optimization') return <DBChapter7Content />
  if (slug === 'prisma-orm') return <DBChapter8Content />
  if (slug === 'mongoose-odm') return <DBChapter9Content />
  if (slug === 'transactions') return <DBChapter10Content />
  if (slug === 'db-design-patterns') return <DBChapter11Content />
  if (slug === 'db-scaling') return <DBChapter12Content />
  return null
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function DBChapterPage({ params }: PageProps) {
  const { chapter: slug } = params

  const chapter = dbChapters.find((c) => c.slug === slug)
  if (!chapter) notFound()

  const hasContent =
    slug === 'db-intro' ||
    slug === 'sql-basics' ||
    slug === 'sql-joins' ||
    slug === 'sql-aggregations' ||
    slug === 'postgresql-advanced' ||
    slug === 'mongodb-queries' ||
    slug === 'query-optimization' ||
    slug === 'prisma-orm' ||
    slug === 'mongoose-odm' ||
    slug === 'transactions' ||
    slug === 'db-design-patterns' ||
    slug === 'db-scaling'
  const toc = getTocForSlug(slug)

  const chapterIdx = dbChapters.findIndex((c) => c.slug === slug)
  const prevChapter = chapterIdx > 0 ? dbChapters[chapterIdx - 1] : null
  const nextChapter = chapterIdx < dbChapters.length - 1 ? dbChapters[chapterIdx + 1] : null

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
            <Link href="/databases" className="hover:text-[#A1A1AA] transition-colors">Database Queries Track</Link>
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
              {getContentForSlug(slug)}

              {/* Bottom prev/next nav */}
              <div className="mt-12 flex gap-4">
                {prevChapter && (
                  <Link
                    href={`/databases/${prevChapter.slug}`}
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
                    href={`/databases/${nextChapter.slug}`}
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
            <RightSidebar chapterNumber={chapter.number} />
          </div>
        ) : (
          <ComingSoon slug={slug} />
        )}
      </div>
    </div>
  )
}
