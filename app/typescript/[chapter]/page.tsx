import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, ChevronRight, Clock, BookOpen, CheckCircle2, ArrowLeft } from 'lucide-react'
import { tsChapters, tsDifficultyConfig } from '@/lib/typescript-chapters'
import TableOfContents, { type TocItem } from '@/components/learn/TableOfContents'
import TSChapter1Content from '@/components/typescript-chapters/TSChapter1Content'
import TSChapter2Content from '@/components/typescript-chapters/TSChapter2Content'
import TSChapter3Content from '@/components/typescript-chapters/TSChapter3Content'
import TSChapter4Content from '@/components/typescript-chapters/TSChapter4Content'
import TSChapter5Content from '@/components/typescript-chapters/TSChapter5Content'
import TSChapter6Content from '@/components/typescript-chapters/TSChapter6Content'
import TSChapter7Content from '@/components/typescript-chapters/TSChapter7Content'
import TSChapter8Content from '@/components/typescript-chapters/TSChapter8Content'
import TSChapter9Content from '@/components/typescript-chapters/TSChapter9Content'
import TSChapter10Content from '@/components/typescript-chapters/TSChapter10Content'
import TSChapter11Content from '@/components/typescript-chapters/TSChapter11Content'
import TSChapter12Content from '@/components/typescript-chapters/TSChapter12Content'

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return tsChapters.map((chapter) => ({
    chapter: chapter.slug,
  }))
}

// ── TOC data per chapter ──────────────────────────────────────────────────────

const tsChapter1Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'ts-fayda', title: 'TypeScript Ka Fayda', level: 1 },
  { id: 'js-vs-ts', title: 'JavaScript vs TypeScript', level: 1 },
  { id: 'setup', title: 'Installation & Setup', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const tsChapter2Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'primitive-types', title: 'Primitive Types', level: 1 },
  { id: 'arrays-tuples', title: 'Arrays & Tuples', level: 1 },
  { id: 'enums', title: 'Enums', level: 1 },
  { id: 'any-unknown', title: 'any, unknown & never', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const tsChapter3Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'typed-params', title: 'Typed Parameters & Return Types', level: 1 },
  { id: 'optional-default', title: 'Optional & Default Params', level: 1 },
  { id: 'overloads', title: 'Function Overloads', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const tsChapter4Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'interface-vs-type', title: 'Interface vs Type', level: 1 },
  { id: 'optional-readonly', title: 'Optional & Readonly', level: 1 },
  { id: 'union-intersection', title: 'Union & Intersection', level: 1 },
  { id: 'declaration-merging', title: 'Declaration Merging', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const tsChapter5Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'access-modifiers', title: 'Access Modifiers', level: 1 },
  { id: 'abstract-classes', title: 'Abstract Classes', level: 1 },
  { id: 'implements', title: 'implements & Parameter Properties', level: 1 },
  { id: 'static-members', title: 'Static Members', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const tsChapter6Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'generic-functions', title: 'Generic Functions', level: 1 },
  { id: 'generic-interfaces', title: 'Generic Interfaces', level: 1 },
  { id: 'constraints', title: 'Constraints', level: 1 },
  { id: 'keyof-typeof', title: 'keyof & typeof', level: 1 },
  { id: 'utility-types', title: 'Utility Types', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const tsChapter7Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'conditional-types', title: 'Conditional Types', level: 1 },
  { id: 'mapped-types', title: 'Mapped Types', level: 1 },
  { id: 'template-literal-types', title: 'Template Literal Types', level: 1 },
  { id: 'discriminated-unions', title: 'Discriminated Unions', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const tsChapter8Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'es-modules', title: 'ES Modules in TypeScript', level: 1 },
  { id: 'import-type', title: 'import type', level: 1 },
  { id: 'declaration-files', title: 'Declaration Files (.d.ts)', level: 1 },
  { id: 'types-packages', title: '@types Packages', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const tsChapter9Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'typeof-instanceof', title: 'typeof & instanceof Guards', level: 1 },
  { id: 'type-predicates', title: 'Type Predicates', level: 1 },
  { id: 'discriminated-narrowing', title: 'Discriminated Union Narrowing', level: 1 },
  { id: 'exhaustiveness', title: 'Exhaustiveness Checking', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const tsChapter10Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'types-node', title: '@types/node Setup', level: 1 },
  { id: 'express-types', title: 'Express + TypeScript', level: 1 },
  { id: 'middleware-types', title: 'Zod Validation', level: 1 },
  { id: 'zod-validation', title: 'ts-node & tsx', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const tsChapter11Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'compiler-options', title: 'Recommended tsconfig', level: 1 },
  { id: 'strict-mode', title: 'Strict Mode Flags', level: 1 },
  { id: 'module-target', title: 'target & module', level: 1 },
  { id: 'path-aliases', title: 'Path Aliases & Project References', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const tsChapter12Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'branded-types', title: 'Branded Types', level: 1 },
  { id: 'builder-pattern', title: 'Builder Pattern', level: 1 },
  { id: 'decorators', title: 'Decorators', level: 1 },
  { id: 'satisfies-operator', title: 'satisfies Operator', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

function getTocForSlug(slug: string): TocItem[] {
  if (slug === 'ts-intro') return tsChapter1Toc
  if (slug === 'ts-types') return tsChapter2Toc
  if (slug === 'ts-functions') return tsChapter3Toc
  if (slug === 'ts-interfaces') return tsChapter4Toc
  if (slug === 'ts-classes') return tsChapter5Toc
  if (slug === 'ts-generics') return tsChapter6Toc
  if (slug === 'ts-advanced-types') return tsChapter7Toc
  if (slug === 'ts-modules') return tsChapter8Toc
  if (slug === 'ts-type-narrowing') return tsChapter9Toc
  if (slug === 'ts-with-nodejs') return tsChapter10Toc
  if (slug === 'ts-config') return tsChapter11Toc
  if (slug === 'ts-patterns') return tsChapter12Toc
  return []
}

// ── Page params ───────────────────────────────────────────────────────────────

interface PageProps {
  params: { chapter: string }
}

// ── Difficulty badge ──────────────────────────────────────────────────────────

function DiffBadge({ difficulty }: { difficulty: 'beginner' | 'intermediate' | 'advanced' }) {
  const cfg = tsDifficultyConfig[difficulty]
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
  const chapter = tsChapters.find((c) => c.slug === slug)
  if (!chapter) return null

  const phaseColors = ['#3178C6', '#3178C6', '#3178C6']
  const phaseColor = phaseColors[chapter.phase - 1] ?? '#3178C6'

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
          background: 'rgba(49,120,198,0.08)',
          border: '1px solid rgba(49,120,198,0.30)',
        }}
      >
        <p className="text-2xl mb-2">🚀</p>
        <p className="font-semibold text-[#F5F5F7] mb-1">Ye chapter jald aa raha hai bhai!</p>
        <p className="text-sm text-[#71717A]">
          Hum isse dhyan se craft kar rahe hain. Tab tak available chapters padho.
        </p>
      </div>

      <Link
        href="/typescript"
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: 'rgba(49,120,198,0.12)',
          border: '1px solid rgba(49,120,198,0.35)',
          color: '#3178C6',
        }}
      >
        <ArrowLeft className="w-4 h-4" />
        TypeScript Track Par Wapas Jao
      </Link>
    </div>
  )
}

// ── Right sidebar quick nav ───────────────────────────────────────────────────

function RightSidebar({ chapterNumber }: { chapterNumber: number }) {
  const idx = tsChapters.findIndex((c) => c.number === chapterNumber)
  const prev = idx > 0 ? tsChapters[idx - 1] : null
  const next = idx < tsChapters.length - 1 ? tsChapters[idx + 1] : null
  const current = tsChapters[idx]

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
              href={`/typescript/${prev.slug}`}
              className="flex items-center gap-2 text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors group"
            >
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              <span className="truncate">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/typescript/${next.slug}`}
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
          <CheckCircle2 className="w-4 h-4 text-[#3178C6]" />
          <span className="text-xs text-[#A1A1AA]">{current?.conceptCount} concepts</span>
        </div>
      </div>
    </aside>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function TSChapterPage({ params }: PageProps) {
  const { chapter: slug } = params

  const chapter = tsChapters.find((c) => c.slug === slug)
  if (!chapter) notFound()

  const hasContent =
    slug === 'ts-intro' ||
    slug === 'ts-types' ||
    slug === 'ts-functions' ||
    slug === 'ts-interfaces' ||
    slug === 'ts-classes' ||
    slug === 'ts-generics' ||
    slug === 'ts-advanced-types' ||
    slug === 'ts-modules' ||
    slug === 'ts-type-narrowing' ||
    slug === 'ts-with-nodejs' ||
    slug === 'ts-config' ||
    slug === 'ts-patterns'
  const toc = getTocForSlug(slug)

  const chapterIdx = tsChapters.findIndex((c) => c.slug === slug)
  const prevChapter = chapterIdx > 0 ? tsChapters[chapterIdx - 1] : null
  const nextChapter = chapterIdx < tsChapters.length - 1 ? tsChapters[chapterIdx + 1] : null

  const trackColor = '#3178C6'

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
            background: `radial-gradient(ellipse 60% 80% at 50% 0%, ${trackColor}18 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5 text-xs text-[#71717A]">
            <Link href="/" className="hover:text-[#A1A1AA] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/typescript" className="hover:text-[#A1A1AA] transition-colors">TypeScript Track</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#A1A1AA]">Chapter {chapter.number}</span>
          </div>

          {/* Chapter number badge */}
          <div
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4"
            style={{
              background: `${trackColor}18`,
              border: `1px solid ${trackColor}35`,
              color: trackColor,
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
              {slug === 'ts-intro' && <TSChapter1Content />}
              {slug === 'ts-types' && <TSChapter2Content />}
              {slug === 'ts-functions' && <TSChapter3Content />}
              {slug === 'ts-interfaces' && <TSChapter4Content />}
              {slug === 'ts-classes' && <TSChapter5Content />}
              {slug === 'ts-generics' && <TSChapter6Content />}
              {slug === 'ts-advanced-types' && <TSChapter7Content />}
              {slug === 'ts-modules' && <TSChapter8Content />}
              {slug === 'ts-type-narrowing' && <TSChapter9Content />}
              {slug === 'ts-with-nodejs' && <TSChapter10Content />}
              {slug === 'ts-config' && <TSChapter11Content />}
              {slug === 'ts-patterns' && <TSChapter12Content />}

              {/* Bottom prev/next nav */}
              <div className="mt-12 flex gap-4">
                {prevChapter && (
                  <Link
                    href={`/typescript/${prevChapter.slug}`}
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
                    href={`/typescript/${nextChapter.slug}`}
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
