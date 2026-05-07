'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Track {
  id: string
  color: string
  colorAlpha: string
  iconText: string
  title: string
  subtitle: string
  description: string
  topics: string[]
  cta: string
  href: string
  chapters: number
  difficulty: string
}

const tracks: Track[] = [
  {
    id: 'javascript',
    color: '#F7DF1E',
    colorAlpha: 'rgba(247,223,30,',
    iconText: 'JS',
    title: 'JavaScript',
    subtitle: 'Har jagah ki language',
    description:
      'Browser se server tak. ES6+ se TypeScript tak. Variables, closures, async patterns — sab kuch ek jagah.',
    topics: ['Variables', 'Functions', 'Async', 'DOM', 'TypeScript'],
    cta: 'Start Learning',
    href: '/javascript',
    chapters: 20,
    difficulty: 'Beginner to Advanced',
  },
  {
    id: 'react',
    color: '#06B6D4',
    colorAlpha: 'rgba(6,182,212,',
    iconText: '⚛',
    title: 'React.js',
    subtitle: 'Modern UI development',
    description:
      'Components, hooks, state management, aur Next.js. Modern frontend ka complete blueprint.',
    topics: ['JSX', 'useState', 'Hooks', 'Router', 'Next.js'],
    cta: 'Start Learning',
    href: '/react',
    chapters: 19,
    difficulty: 'Intermediate',
  },
  {
    id: 'nodejs',
    color: '#10B981',
    colorAlpha: 'rgba(16,185,129,',
    iconText: 'N',
    title: 'Node.js',
    subtitle: 'Backend mastery',
    description:
      'Event loop se production deployment tak. APIs, streams, databases, Docker — real backend engineering.',
    topics: ['Event Loop', 'Streams', 'Express', 'Databases', 'Docker'],
    cta: 'Start Learning',
    href: '/course',
    chapters: 23,
    difficulty: 'Intermediate to Advanced',
  },
  {
    id: 'genai',
    color: '#F97316',
    colorAlpha: 'rgba(249,115,22,',
    iconText: '✦',
    title: 'Generative AI',
    subtitle: 'AI engineer bano',
    description:
      'ML fundamentals se production AI apps tak. LLMs, RAG pipelines, aur autonomous agents build karo.',
    topics: ['LLMs', 'Prompt Engineering', 'Claude API', 'RAG', 'Agents'],
    cta: 'Start Learning',
    href: '/genai',
    chapters: 22,
    difficulty: 'Beginner to Advanced',
  },
  {
    id: 'typescript',
    color: '#3178C6',
    colorAlpha: 'rgba(49,120,198,',
    iconText: 'TS',
    title: 'TypeScript',
    subtitle: 'Type-safe JavaScript',
    description:
      'JavaScript ka type-safe superset. Generics, advanced types, decorators — aur Node.js ke saath production setup.',
    topics: ['Types', 'Interfaces', 'Generics', 'Advanced Types', 'Node.js + TS'],
    cta: 'Start Learning',
    href: '/typescript',
    chapters: 12,
    difficulty: 'Beginner to Advanced',
  },
  {
    id: 'databases',
    color: '#FF6B35',
    colorAlpha: 'rgba(255,107,53,',
    iconText: '🗄',
    title: 'Database Queries',
    subtitle: 'SQL se NoSQL tak',
    description:
      'PostgreSQL, MongoDB, Prisma, Mongoose — queries likhna, optimize karna, aur production pe scale karna.',
    topics: ['SQL Joins', 'Aggregations', 'Prisma ORM', 'Query Optimization', 'Scaling'],
    cta: 'Start Learning',
    href: '/databases',
    chapters: 12,
    difficulty: 'Beginner to Advanced',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
}

interface TrackCardProps {
  track: Track
}

function TrackCard({ track }: TrackCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative rounded-2xl p-7 flex flex-col gap-5 cursor-default transition-transform duration-300 hover:-translate-y-1.5"
      style={{
        background: 'rgba(18,18,26,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Gradient border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          boxShadow: `0 0 0 1.5px ${track.colorAlpha}0.5), 0 12px 48px rgba(0,0,0,0.6), 0 0 40px ${track.colorAlpha}0.1)`,
        }}
      />

      {/* Background glow orb */}
      <div
        className="absolute -top-6 -right-6 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
        style={{ background: track.color }}
      />

      {/* Header row: icon + badges */}
      <div className="flex items-start justify-between gap-3">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black font-display transition-transform duration-300 group-hover:scale-110 shrink-0"
          style={{
            background: `${track.colorAlpha}0.18)`,
            border: `1.5px solid ${track.colorAlpha}0.3)`,
            color: track.color,
          }}
        >
          {track.iconText}
        </div>

        {/* Chapter count badge */}
        <div className="flex flex-col items-end gap-1">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              background: `${track.colorAlpha}0.12)`,
              color: track.color,
              border: `1px solid ${track.colorAlpha}0.25)`,
            }}
          >
            {track.chapters} chapters
          </span>
          <span className="text-[10px] text-[#71717A] font-medium text-right leading-tight">
            {track.difficulty}
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <h3
          className="text-2xl font-display font-bold tracking-tight"
          style={{ color: track.color }}
        >
          {track.title}
        </h3>
        <p className="text-sm font-semibold text-[#A1A1AA] uppercase tracking-widest">
          {track.subtitle}
        </p>
        <p className="text-sm text-[#71717A] leading-relaxed mt-1">
          {track.description}
        </p>
      </div>

      {/* Topic pills */}
      <div className="flex flex-wrap gap-1.5">
        {track.topics.map((topic) => (
          <span
            key={topic}
            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium"
            style={{
              background: `${track.colorAlpha}0.08)`,
              color: `${track.color}cc`,
              border: `1px solid ${track.colorAlpha}0.15)`,
            }}
          >
            {topic}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={track.href}
        className="mt-auto inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        style={{
          background: `${track.colorAlpha}0.15)`,
          color: track.color,
          border: `1px solid ${track.colorAlpha}0.3)`,
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLAnchorElement).style.background = `${track.colorAlpha}0.25)`
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLAnchorElement).style.background = `${track.colorAlpha}0.15)`
        }}
      >
        {track.cta}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
      </Link>
    </motion.div>
  )
}

export default function TracksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="tracks"
      className="relative py-24 md:py-32 bg-[#0A0A0F] overflow-hidden"
    >
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[600px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 0% 0%, rgba(247,223,30,0.04) 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 100% 0%, rgba(6,182,212,0.05) 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 0% 100%, rgba(16,185,129,0.04) 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 100% 100%, rgba(249,115,22,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.1)] text-[#7C3AED]">
            Learning Tracks
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F5F5F7] mb-4 tracking-tight">
            4 Complete Learning Tracks
          </h2>
          <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
            Ek platform, sab kuch.{' '}
            <span className="text-[#F5F5F7] font-medium">Choose your path.</span>
          </p>
        </motion.div>

        {/* 2×2 Track grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        >
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
