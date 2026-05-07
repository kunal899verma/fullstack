import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, ChevronRight, Clock, BookOpen, CheckCircle2, ArrowLeft } from 'lucide-react'
import { jsChapters, jsDifficultyConfig } from '@/lib/js-chapters'
import TableOfContents, { type TocItem } from '@/components/learn/TableOfContents'
import JSChapter1Content from '@/components/js-chapters/JSChapter1Content'
import JSChapter2Content from '@/components/js-chapters/JSChapter2Content'
import JSChapter3Content from '@/components/js-chapters/JSChapter3Content'
import JSChapter4Content from '@/components/js-chapters/JSChapter4Content'
import JSChapter5Content from '@/components/js-chapters/JSChapter5Content'
import JSChapter6Content from '@/components/js-chapters/JSChapter6Content'
import JSChapter7Content from '@/components/js-chapters/JSChapter7Content'
import JSChapter8Content from '@/components/js-chapters/JSChapter8Content'
import JSChapter9Content from '@/components/js-chapters/JSChapter9Content'
import JSChapter10Content from '@/components/js-chapters/JSChapter10Content'
import JSChapter11Content from '@/components/js-chapters/JSChapter11Content'
import JSChapter12Content from '@/components/js-chapters/JSChapter12Content'
import JSChapter13Content from '@/components/js-chapters/JSChapter13Content'
import JSChapter14Content from '@/components/js-chapters/JSChapter14Content'
import JSChapter15Content from '@/components/js-chapters/JSChapter15Content'
import JSChapter16Content from '@/components/js-chapters/JSChapter16Content'
import JSChapter17Content from '@/components/js-chapters/JSChapter17Content'
import JSChapter18Content from '@/components/js-chapters/JSChapter18Content'
import JSChapter19Content from '@/components/js-chapters/JSChapter19Content'
import JSChapter20Content from '@/components/js-chapters/JSChapter20Content'

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return jsChapters.map((chapter) => ({
    chapter: chapter.slug,
  }))
}

// ── TOC data per chapter ──────────────────────────────────────────────────────

const jsChapter1Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'js-history', title: 'JavaScript Ki Kahani', level: 1 },
  { id: 'browser-vs-node', title: 'Browser JS vs Node.js', level: 1 },
  { id: 'v8-engine', title: 'V8 Engine — Kaise Kaam Karta Hai', level: 1 },
  { id: 'single-thread', title: 'Single-Threaded JavaScript', level: 1 },
  { id: 'setup', title: 'Environment Setup', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter2Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'var-let-const', title: 'var vs let vs const', level: 1 },
  { id: 'primitive-types', title: '7 Primitive Data Types', level: 1 },
  { id: 'type-coercion', title: 'Type Coercion — JS Ka Jaadu', level: 1 },
  { id: 'null-undefined', title: 'null vs undefined vs empty string', level: 1 },
  { id: 'reference-types', title: 'Primitive vs Reference Types', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter3Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'arithmetic-operators', title: 'Arithmetic & Assignment Operators', level: 1 },
  { id: 'comparison-logical', title: 'Comparison & Logical Operators', level: 1 },
  { id: 'conditionals', title: 'if/else, Ternary & Nullish Coalescing', level: 1 },
  { id: 'loops', title: 'Loops — for, while, for...of, for...in', level: 1 },
  { id: 'switch-statement', title: 'switch Statement', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter4Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'function-types', title: 'Declaration vs Expression vs Arrow', level: 1 },
  { id: 'parameters', title: 'Default, Rest & Destructured Params', level: 1 },
  { id: 'higher-order', title: 'Higher-Order Functions', level: 1 },
  { id: 'iife', title: 'IIFE — Immediately Invoked Functions', level: 1 },
  { id: 'pure-functions', title: 'Pure vs Impure Functions', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter5Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'array-creation', title: 'Array Creation & Basics', level: 1 },
  { id: 'mutating-methods', title: 'Mutating Methods — push, pop, splice', level: 1 },
  { id: 'map-filter-reduce', title: 'map, filter, reduce — The Big Three', level: 1 },
  { id: 'search-methods', title: 'Search Methods — find, some, every', level: 1 },
  { id: 'advanced-arrays', title: 'flat, flatMap & Method Chaining', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter6Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'object-creation', title: 'Object Creation — Char Tarike', level: 1 },
  { id: 'property-access', title: 'Property Access & Shorthand', level: 1 },
  { id: 'destructuring', title: 'Object Destructuring', level: 1 },
  { id: 'spread-merge', title: 'Spread, Object.assign & Merge', level: 1 },
  { id: 'object-methods', title: 'freeze, seal, JSON Caveats', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter7Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'string-basics', title: 'String Creation & Immutability', level: 1 },
  { id: 'string-methods', title: 'Essential String Methods', level: 1 },
  { id: 'template-literals', title: 'Template Literals — Backtick Magic', level: 1 },
  { id: 'string-manipulation', title: 'replace, trim, pad & repeat', level: 1 },
  { id: 'regex-basics', title: 'Regular Expressions Basics', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter8Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'scope-types', title: 'Global, Function, Block Scope', level: 1 },
  { id: 'scope-chain', title: 'Scope Chain — Lexical Scoping', level: 1 },
  { id: 'hoisting', title: 'Hoisting — var vs let/const TDZ', level: 1 },
  { id: 'closures', title: 'Closures — The Most Powerful Feature', level: 1 },
  { id: 'closure-patterns', title: 'Practical Closure Patterns', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter9Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'prototype-chain', title: 'Prototype Chain', level: 1 },
  { id: 'constructor-functions', title: 'Constructor Functions & new', level: 1 },
  { id: 'es6-classes', title: 'ES6 Classes — Modern Syntax', level: 1 },
  { id: 'inheritance', title: 'Inheritance — extends & super', level: 1 },
  { id: 'static-getters-private', title: 'Static, Getters & Private Fields', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter10Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'why-async', title: 'Why Async? — Event Loop Basics', level: 1 },
  { id: 'callbacks', title: 'Callbacks & Error-First Pattern', level: 1 },
  { id: 'promises', title: 'Promises — States & Chaining', level: 1 },
  { id: 'async-await', title: 'async/await — Clean Syntax', level: 1 },
  { id: 'promise-combinators', title: 'Promise Combinators — all, race, any', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

function getTocForSlug(slug: string): TocItem[] {
  if (slug === 'js-what-why') return jsChapter1Toc
  if (slug === 'variables-datatypes') return jsChapter2Toc
  if (slug === 'operators-control-flow') return jsChapter3Toc
  if (slug === 'functions') return jsChapter4Toc
  if (slug === 'arrays') return jsChapter5Toc
  if (slug === 'objects') return jsChapter6Toc
  if (slug === 'strings-template-literals') return jsChapter7Toc
  if (slug === 'scope-closures') return jsChapter8Toc
  if (slug === 'prototypes-classes') return jsChapter9Toc
  if (slug === 'async-js') return jsChapter10Toc
  if (slug === 'dom-manipulation') return jsChapter11Toc
  if (slug === 'es6-modern') return jsChapter12Toc
  if (slug === 'error-handling-js') return jsChapter13Toc
  if (slug === 'functional-programming') return jsChapter14Toc
  if (slug === 'js-patterns') return jsChapter15Toc
  if (slug === 'typescript-basics') return jsChapter16Toc
  if (slug === 'js-performance') return jsChapter17Toc
  if (slug === 'advanced-patterns') return jsChapter18Toc
  if (slug === 'testing-js') return jsChapter19Toc
  if (slug === 'js-capstone') return jsChapter20Toc
  return []
}

const jsChapter11Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'dom-kya-hai', title: 'DOM Kya Hai?', level: 1 },
  { id: 'selecting-elements', title: 'Elements Select Karna', level: 1 },
  { id: 'modifying-dom', title: 'DOM Modify Karna', level: 1 },
  { id: 'creating-removing', title: 'Elements Create aur Remove', level: 1 },
  { id: 'events', title: 'Events — Interactivity Ka Dil', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter12Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'destructuring', title: 'Destructuring', level: 1 },
  { id: 'spread-rest', title: 'Spread & Rest', level: 1 },
  { id: 'optional-chaining-nullish', title: 'Optional Chaining & Nullish Coalescing', level: 1 },
  { id: 'es2020-plus', title: 'ES2020+ Features', level: 1 },
  { id: 'modules', title: 'ES Modules', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter13Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'error-types', title: 'Error Types', level: 1 },
  { id: 'try-catch-finally', title: 'try / catch / finally', level: 1 },
  { id: 'custom-errors', title: 'Custom Error Classes', level: 1 },
  { id: 'async-errors', title: 'Async Error Handling', level: 1 },
  { id: 'error-propagation', title: 'Error Propagation', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter14Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'pure-functions', title: 'Pure Functions', level: 1 },
  { id: 'immutability', title: 'Immutability', level: 1 },
  { id: 'higher-order-functions', title: 'Higher-Order Functions', level: 1 },
  { id: 'composition', title: 'Function Composition & Pipe', level: 1 },
  { id: 'currying', title: 'Currying', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter15Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'module-pattern', title: 'Module Pattern', level: 1 },
  { id: 'singleton', title: 'Singleton', level: 1 },
  { id: 'observer', title: 'Observer / EventEmitter', level: 1 },
  { id: 'factory', title: 'Factory Pattern', level: 1 },
  { id: 'strategy', title: 'Strategy Pattern', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter16Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'why-typescript', title: 'Kyun TypeScript?', level: 1 },
  { id: 'basic-types', title: 'TypeScript Types', level: 1 },
  { id: 'interfaces-types', title: 'Interfaces vs Types', level: 1 },
  { id: 'generics', title: 'Generics', level: 1 },
  { id: 'utility-types', title: 'Utility Types', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter17Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'v8-optimization', title: 'V8 Optimization', level: 1 },
  { id: 'memory-management', title: 'Memory Management', level: 1 },
  { id: 'debounce-throttle', title: 'Debounce & Throttle', level: 1 },
  { id: 'web-workers', title: 'Web Workers', level: 1 },
  { id: 'performance-measurement', title: 'Performance Measurement', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter18Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'iterators', title: 'Iterators & Iterables', level: 1 },
  { id: 'generators', title: 'Generators', level: 1 },
  { id: 'proxy', title: 'Proxy', level: 1 },
  { id: 'reflect', title: 'Reflect', level: 1 },
  { id: 'tagged-templates', title: 'Tagged Template Literals', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter19Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'testing-pyramid', title: 'Testing Pyramid', level: 1 },
  { id: 'jest-basics', title: 'Jest Basics', level: 1 },
  { id: 'mocking', title: 'Mocking', level: 1 },
  { id: 'async-testing', title: 'Testing Async Code', level: 1 },
  { id: 'tdd', title: 'TDD', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const jsChapter20Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'project-architecture', title: 'Project Architecture', level: 1 },
  { id: 'build-tools', title: 'Build Tools', level: 1 },
  { id: 'code-quality', title: 'Code Quality', level: 1 },
  { id: 'performance-checklist', title: 'Performance Checklist', level: 1 },
  { id: 'deployment', title: 'Deployment', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

// ── Page params ───────────────────────────────────────────────────────────────

interface PageProps {
  params: { chapter: string }
}

// ── Difficulty badge ──────────────────────────────────────────────────────────

function DiffBadge({ difficulty }: { difficulty: 'beginner' | 'intermediate' | 'advanced' }) {
  const cfg = jsDifficultyConfig[difficulty]
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
  const chapter = jsChapters.find((c) => c.slug === slug)
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
        href="/javascript"
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: 'rgba(245,158,11,0.12)',
          border: '1px solid rgba(245,158,11,0.35)',
          color: '#F59E0B',
        }}
      >
        <ArrowLeft className="w-4 h-4" />
        JS Course Page Par Wapas Jao
      </Link>
    </div>
  )
}

// ── Right sidebar quick nav ───────────────────────────────────────────────────

function RightSidebar({ chapterNumber }: { chapterNumber: number }) {
  const idx = jsChapters.findIndex((c) => c.number === chapterNumber)
  const prev = idx > 0 ? jsChapters[idx - 1] : null
  const next = idx < jsChapters.length - 1 ? jsChapters[idx + 1] : null
  const current = jsChapters[idx]

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
              href={`/javascript/${prev.slug}`}
              className="flex items-center gap-2 text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors group"
            >
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              <span className="truncate">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/javascript/${next.slug}`}
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
          <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-xs text-[#A1A1AA]">{current?.conceptCount} concepts</span>
        </div>
      </div>
    </aside>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function JSChapterPage({ params }: PageProps) {
  const { chapter: slug } = params

  const chapter = jsChapters.find((c) => c.slug === slug)
  if (!chapter) notFound()

  const hasContent =
    slug === 'js-what-why' ||
    slug === 'variables-datatypes' ||
    slug === 'operators-control-flow' ||
    slug === 'functions' ||
    slug === 'arrays' ||
    slug === 'objects' ||
    slug === 'strings-template-literals' ||
    slug === 'scope-closures' ||
    slug === 'prototypes-classes' ||
    slug === 'async-js' ||
    slug === 'dom-manipulation' ||
    slug === 'es6-modern' ||
    slug === 'error-handling-js' ||
    slug === 'functional-programming' ||
    slug === 'js-patterns' ||
    slug === 'typescript-basics' ||
    slug === 'js-performance' ||
    slug === 'advanced-patterns' ||
    slug === 'testing-js' ||
    slug === 'js-capstone'
  const toc = getTocForSlug(slug)

  const chapterIdx = jsChapters.findIndex((c) => c.slug === slug)
  const prevChapter = chapterIdx > 0 ? jsChapters[chapterIdx - 1] : null
  const nextChapter = chapterIdx < jsChapters.length - 1 ? jsChapters[chapterIdx + 1] : null

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
            <Link href="/javascript" className="hover:text-[#A1A1AA] transition-colors">JavaScript</Link>
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
              {slug === 'js-what-why' && <JSChapter1Content />}
              {slug === 'variables-datatypes' && <JSChapter2Content />}
              {slug === 'operators-control-flow' && <JSChapter3Content />}
              {slug === 'functions' && <JSChapter4Content />}
              {slug === 'arrays' && <JSChapter5Content />}
              {slug === 'objects' && <JSChapter6Content />}
              {slug === 'strings-template-literals' && <JSChapter7Content />}
              {slug === 'scope-closures' && <JSChapter8Content />}
              {slug === 'prototypes-classes' && <JSChapter9Content />}
              {slug === 'async-js' && <JSChapter10Content />}
              {slug === 'dom-manipulation' && <JSChapter11Content />}
              {slug === 'es6-modern' && <JSChapter12Content />}
              {slug === 'error-handling-js' && <JSChapter13Content />}
              {slug === 'functional-programming' && <JSChapter14Content />}
              {slug === 'js-patterns' && <JSChapter15Content />}
              {slug === 'typescript-basics' && <JSChapter16Content />}
              {slug === 'js-performance' && <JSChapter17Content />}
              {slug === 'advanced-patterns' && <JSChapter18Content />}
              {slug === 'testing-js' && <JSChapter19Content />}
              {slug === 'js-capstone' && <JSChapter20Content />}

              {/* Bottom prev/next nav */}
              <div className="mt-12 flex gap-4">
                {prevChapter && (
                  <Link
                    href={`/javascript/${prevChapter.slug}`}
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
                    href={`/javascript/${nextChapter.slug}`}
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
