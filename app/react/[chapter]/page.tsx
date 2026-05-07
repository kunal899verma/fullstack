import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, ChevronRight, Clock, BookOpen, ArrowLeft } from 'lucide-react'
import { reactChapters, reactDifficultyConfig, type Difficulty } from '@/lib/react-chapters'
import TableOfContents, { type TocItem } from '@/components/learn/TableOfContents'
import ReactChapter1Content from '@/components/react-chapters/ReactChapter1Content'
import ReactChapter2Content from '@/components/react-chapters/ReactChapter2Content'
import ReactChapter3Content from '@/components/react-chapters/ReactChapter3Content'
import ReactChapter4Content from '@/components/react-chapters/ReactChapter4Content'
import ReactChapter5Content from '@/components/react-chapters/ReactChapter5Content'
import ReactChapter6Content from '@/components/react-chapters/ReactChapter6Content'
import ReactChapter7Content from '@/components/react-chapters/ReactChapter7Content'
import ReactChapter8Content from '@/components/react-chapters/ReactChapter8Content'
import ReactChapter9Content from '@/components/react-chapters/ReactChapter9Content'
import ReactChapter10Content from '@/components/react-chapters/ReactChapter10Content'
import ReactChapter11Content from '@/components/react-chapters/ReactChapter11Content'
import ReactChapter12Content from '@/components/react-chapters/ReactChapter12Content'
import ReactChapter13Content from '@/components/react-chapters/ReactChapter13Content'
import ReactChapter14Content from '@/components/react-chapters/ReactChapter14Content'
import ReactChapter15Content from '@/components/react-chapters/ReactChapter15Content'
import ReactChapter16Content from '@/components/react-chapters/ReactChapter16Content'
import ReactChapter17Content from '@/components/react-chapters/ReactChapter17Content'
import ReactChapter18Content from '@/components/react-chapters/ReactChapter18Content'
import ReactChapter19Content from '@/components/react-chapters/ReactChapter19Content'

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return reactChapters.map((chapter) => ({
    chapter: chapter.slug,
  }))
}

// ── TOC data per chapter ──────────────────────────────────────────────────────

const chapter1Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'why-react', title: 'React Kyun Banaya Gaya?', level: 1 },
  { id: 'virtual-dom', title: 'Virtual DOM — React Ka Magic', level: 1 },
  { id: 'component-model', title: 'Component Model — Lego Blocks', level: 1 },
  { id: 'react-vs-alternatives', title: 'React vs Alternatives', level: 1 },
  { id: 'react-setup', title: 'React Setup — Vite ya CRA?', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter2Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'what-is-jsx', title: 'JSX Kya Hai?', level: 1 },
  { id: 'jsx-rules', title: 'JSX Rules', level: 1 },
  { id: 'expressions-in-jsx', title: 'Expressions in JSX', level: 1 },
  { id: 'fragments', title: 'Fragments', level: 1 },
  { id: 'conditional-rendering', title: 'Conditional Rendering Patterns', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter3Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'what-is-component', title: 'Component Kya Hai?', level: 1 },
  { id: 'props', title: 'Props — Data Pass Karo', level: 1 },
  { id: 'typescript-props', title: 'TypeScript Props Interface', level: 1 },
  { id: 'children-composition', title: 'Children Prop & Composition', level: 1 },
  { id: 'props-best-practices', title: 'Props Best Practices', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter4Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'state-kya-hai', title: 'State Kya Hai?', level: 1 },
  { id: 'usestate-details', title: 'useState — Deep Dive', level: 1 },
  { id: 'state-batching', title: 'State Batching', level: 1 },
  { id: 'state-vs-props', title: 'State vs Props', level: 1 },
  { id: 'lifting-state', title: 'Lifting State Up', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter5Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'react-events', title: 'React Event System', level: 1 },
  { id: 'controlled-inputs', title: 'Controlled Inputs', level: 1 },
  { id: 'form-handling', title: 'Form Handling', level: 1 },
  { id: 'multiple-inputs', title: 'Multiple Inputs', level: 1 },
  { id: 'form-validation', title: 'Form Validation', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter6Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'rendering-lists', title: 'Lists Render Karna', level: 1 },
  { id: 'key-prop', title: 'key Prop', level: 1 },
  { id: 'conditional-rendering', title: 'Conditional Rendering', level: 1 },
  { id: 'rendering-nothing', title: 'Null, Undefined, Fragments', level: 1 },
  { id: 'nested-lists', title: 'Nested Lists', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter7Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'side-effects', title: 'Side Effects Kya Hain?', level: 1 },
  { id: 'useeffect-basics', title: 'useEffect Basics', level: 1 },
  { id: 'dependency-array', title: 'Dependency Array Rules', level: 1 },
  { id: 'cleanup-function', title: 'Cleanup Function', level: 1 },
  { id: 'common-patterns', title: 'Common useEffect Patterns', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter8Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'useref', title: 'useRef', level: 1 },
  { id: 'usememo', title: 'useMemo', level: 1 },
  { id: 'usecallback', title: 'useCallback', level: 1 },
  { id: 'react-memo', title: 'React.memo', level: 1 },
  { id: 'performance-antipatterns', title: 'Performance Anti-Patterns', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter9Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'prop-drilling-problem', title: 'Prop Drilling Problem', level: 1 },
  { id: 'create-context', title: 'createContext + useContext', level: 1 },
  { id: 'context-optimization', title: 'Context Optimization', level: 1 },
  { id: 'multiple-contexts', title: 'Multiple Contexts', level: 1 },
  { id: 'context-vs-zustand', title: 'Context vs Zustand vs Redux', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

const chapter10Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'custom-hook-intro', title: 'Custom Hook Kya Hai?', level: 1 },
  { id: 'use-fetch', title: 'useFetch — Data Fetching Hook', level: 1 },
  { id: 'use-local-storage', title: 'useLocalStorage', level: 1 },
  { id: 'use-debounce', title: 'useDebounce', level: 1 },
  { id: 'hook-composition', title: 'Hook Composition', level: 1 },
]

const chapter11Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'client-side-routing', title: 'Client-Side Routing', level: 1 },
  { id: 'router-hooks', title: 'useNavigate, useParams, useLocation', level: 1 },
  { id: 'nested-routes', title: 'Nested Routes & Outlet', level: 1 },
  { id: 'protected-routes', title: 'Protected Routes', level: 1 },
]

const chapter12Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'global-state-problem', title: 'Global State Ka Problem', level: 1 },
  { id: 'zustand-basics', title: 'Zustand Basics', level: 1 },
  { id: 'zustand-patterns', title: 'Zustand Patterns', level: 1 },
  { id: 'zustand-persist', title: 'Zustand Persist', level: 1 },
  { id: 'zustand-vs-alternatives', title: 'Zustand vs Context vs Redux', level: 1 },
]

const chapter13Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'server-vs-client-state', title: 'Server vs Client State', level: 1 },
  { id: 'use-query', title: 'useQuery', level: 1 },
  { id: 'use-mutation', title: 'useMutation', level: 1 },
  { id: 'cache-stale-time', title: 'Cache & Stale Time', level: 1 },
  { id: 'optimistic-updates', title: 'Optimistic Updates', level: 1 },
]

const chapter14Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'rerenders', title: 'Re-renders Kyun Hote Hain?', level: 1 },
  { id: 'react-memo', title: 'React.memo', level: 1 },
  { id: 'usememo-usecallback', title: 'useMemo & useCallback', level: 1 },
  { id: 'code-splitting', title: 'Code Splitting', level: 1 },
  { id: 'profiler', title: 'React DevTools Profiler', level: 1 },
]

const chapter15Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'hoc', title: 'Higher-Order Components', level: 1 },
  { id: 'render-props', title: 'Render Props', level: 1 },
  { id: 'compound-components', title: 'Compound Components', level: 1 },
  { id: 'headless-ui', title: 'Headless UI', level: 1 },
  { id: 'pattern-guide', title: 'Pattern Decision Guide', level: 1 },
]

const chapter16Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'rtl-philosophy', title: 'RTL Philosophy', level: 1 },
  { id: 'core-apis', title: 'render, screen, userEvent', level: 1 },
  { id: 'mocking', title: 'Mocking', level: 1 },
  { id: 'async-testing', title: 'Async Testing', level: 1 },
  { id: 'testing-hooks', title: 'Testing Custom Hooks', level: 1 },
]

const chapter17Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'nextjs-intro', title: 'Next.js — SSR, SSG, ISR', level: 1 },
  { id: 'app-router', title: 'App Router', level: 1 },
  { id: 'server-vs-client-components', title: 'Server vs Client Components', level: 1 },
  { id: 'data-fetching-nextjs', title: 'Data Fetching in Next.js', level: 1 },
  { id: 'nextjs-deployment', title: 'Deployment', level: 1 },
]

const chapter18Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'project-architecture', title: 'Project Architecture', level: 1 },
  { id: 'state-design', title: 'State Design', level: 1 },
  { id: 'performance-checklist', title: 'Performance Checklist', level: 1 },
  { id: 'testing-strategy', title: 'Testing Strategy', level: 1 },
  { id: 'production-checklist', title: 'Production Checklist', level: 1 },
]

const chapter19Toc: TocItem[] = [
  { id: 'intro', title: 'Introduction', level: 1 },
  { id: 'why-redux', title: 'Kyun Redux? — vs Zustand', level: 1 },
  { id: 'store-setup', title: 'configureStore Setup', level: 1 },
  { id: 'create-slice', title: 'createSlice — Reducers & Actions', level: 1 },
  { id: 'async-thunk', title: 'createAsyncThunk — Async Ops', level: 1 },
  { id: 'rtk-query', title: 'RTK Query — API Caching', level: 1 },
  { id: 'redux-vs-zustand', title: 'DevTools & Memoized Selectors', level: 1 },
  { id: 'chapter-quiz', title: 'Chapter Quiz', level: 1 },
]

function getTocForSlug(slug: string): TocItem[] {
  if (slug === 'react-intro') return chapter1Toc
  if (slug === 'jsx') return chapter2Toc
  if (slug === 'components-props') return chapter3Toc
  if (slug === 'state-usestate') return chapter4Toc
  if (slug === 'events-forms') return chapter5Toc
  if (slug === 'lists-conditional') return chapter6Toc
  if (slug === 'useeffect') return chapter7Toc
  if (slug === 'useref-usememo') return chapter8Toc
  if (slug === 'context-api') return chapter9Toc
  if (slug === 'custom-hooks') return chapter10Toc
  if (slug === 'react-router') return chapter11Toc
  if (slug === 'state-management') return chapter12Toc
  if (slug === 'data-fetching') return chapter13Toc
  if (slug === 'react-performance') return chapter14Toc
  if (slug === 'advanced-patterns') return chapter15Toc
  if (slug === 'testing-react') return chapter16Toc
  if (slug === 'nextjs-intro') return chapter17Toc
  if (slug === 'react-capstone') return chapter18Toc
  if (slug === 'redux-toolkit') return chapter19Toc
  return []
}

// ── Page params ───────────────────────────────────────────────────────────────

interface PageProps {
  params: { chapter: string }
}

// ── Difficulty badge ──────────────────────────────────────────────────────────

function DiffBadge({ difficulty }: { difficulty: Difficulty }) {
  const cfg = reactDifficultyConfig[difficulty]
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      {cfg.label}
    </span>
  )
}

// ── Coming Soon state ─────────────────────────────────────────────────────────

function ComingSoon({ slug }: { slug: string }) {
  const chapter = reactChapters.find(c => c.slug === slug)
  if (!chapter) return null

  const phaseColors = ['#06B6D4', '#F59E0B', '#7C3AED']
  const phaseColor = phaseColors[chapter.phase - 1]

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20 px-4">
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

      <div
        className="rounded-2xl px-8 py-5 mb-8 max-w-sm"
        style={{
          background: `rgba(6,182,212,0.06)`,
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
        href="/react"
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: 'rgba(6,182,212,0.15)',
          border: '1px solid rgba(6,182,212,0.35)',
          color: '#06B6D4',
        }}
      >
        <ArrowLeft className="w-4 h-4" />
        React Course Par Wapas Jao
      </Link>
    </div>
  )
}

// ── Right sidebar quick nav ───────────────────────────────────────────────────

function RightSidebar({ chapterNumber }: { chapterNumber: number }) {
  const idx = reactChapters.findIndex(c => c.number === chapterNumber)
  const prev = idx > 0 ? reactChapters[idx - 1] : null
  const next = idx < reactChapters.length - 1 ? reactChapters[idx + 1] : null
  const current = reactChapters[idx]

  return (
    <aside className="w-56 shrink-0 hidden xl:flex flex-col sticky top-24 self-start gap-4">
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
              href={`/react/${prev.slug}`}
              className="flex items-center gap-2 text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors group"
            >
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              <span className="truncate">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/react/${next.slug}`}
              className="flex items-center gap-2 text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors group"
            >
              <span className="truncate">{next.title}</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>

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
          <BookOpen className="w-4 h-4 text-[#06B6D4]" />
          <span className="text-xs text-[#A1A1AA]">{current?.conceptCount} concepts</span>
        </div>
      </div>
    </aside>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ReactChapterPage({ params }: PageProps) {
  const { chapter: slug } = params

  const chapter = reactChapters.find(c => c.slug === slug)
  if (!chapter) notFound()

  const hasContent = (
    slug === 'react-intro' ||
    slug === 'jsx' ||
    slug === 'components-props' ||
    slug === 'state-usestate' ||
    slug === 'events-forms' ||
    slug === 'lists-conditional' ||
    slug === 'useeffect' ||
    slug === 'useref-usememo' ||
    slug === 'context-api' ||
    slug === 'custom-hooks' ||
    slug === 'react-router' ||
    slug === 'state-management' ||
    slug === 'data-fetching' ||
    slug === 'react-performance' ||
    slug === 'advanced-patterns' ||
    slug === 'testing-react' ||
    slug === 'nextjs-intro' ||
    slug === 'react-capstone' ||
    slug === 'redux-toolkit'
  )
  const toc = getTocForSlug(slug)

  const chapterIdx = reactChapters.findIndex(c => c.slug === slug)
  const prevChapter = chapterIdx > 0 ? reactChapters[chapterIdx - 1] : null
  const nextChapter = chapterIdx < reactChapters.length - 1 ? reactChapters[chapterIdx + 1] : null

  const phaseColors = ['#06B6D4', '#F59E0B', '#7C3AED']
  const phaseColor = phaseColors[chapter.phase - 1]

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* ── Chapter Header ──────────────────────────────────────────────── */}
      <div
        className="relative py-10 md:py-14 overflow-hidden"
        style={{ background: '#12121A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
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
            <Link href="/react" className="hover:text-[#A1A1AA] transition-colors">React</Link>
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
              {slug === 'react-intro' && <ReactChapter1Content />}
              {slug === 'jsx' && <ReactChapter2Content />}
              {slug === 'components-props' && <ReactChapter3Content />}
              {slug === 'state-usestate' && <ReactChapter4Content />}
              {slug === 'events-forms' && <ReactChapter5Content />}
              {slug === 'lists-conditional' && <ReactChapter6Content />}
              {slug === 'useeffect' && <ReactChapter7Content />}
              {slug === 'useref-usememo' && <ReactChapter8Content />}
              {slug === 'context-api' && <ReactChapter9Content />}
              {slug === 'custom-hooks' && <ReactChapter10Content />}
              {slug === 'react-router' && <ReactChapter11Content />}
              {slug === 'state-management' && <ReactChapter12Content />}
              {slug === 'data-fetching' && <ReactChapter13Content />}
              {slug === 'react-performance' && <ReactChapter14Content />}
              {slug === 'advanced-patterns' && <ReactChapter15Content />}
              {slug === 'testing-react' && <ReactChapter16Content />}
              {slug === 'nextjs-intro' && <ReactChapter17Content />}
              {slug === 'react-capstone' && <ReactChapter18Content />}
              {slug === 'redux-toolkit' && <ReactChapter19Content />}

              {/* Bottom prev/next nav */}
              <div className="mt-12 flex gap-4">
                {prevChapter && (
                  <Link
                    href={`/react/${prevChapter.slug}`}
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
                    href={`/react/${nextChapter.slug}`}
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
