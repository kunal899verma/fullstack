'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Milestone {
  label: string
  sublabel?: string
}

interface LearningPath {
  id: string
  color: string
  colorAlpha: string
  iconText: string
  title: string
  subtitle: string
  href: string
  milestones: Milestone[]
}

const learningPaths: LearningPath[] = [
  {
    id: 'javascript',
    color: '#F7DF1E',
    colorAlpha: 'rgba(247,223,30,',
    iconText: 'JS',
    title: 'JavaScript',
    subtitle: '20 chapters',
    href: '/javascript',
    milestones: [
      { label: 'Variables & Types', sublabel: 'Foundation' },
      { label: 'Functions & Scope', sublabel: 'Core JS' },
      { label: 'Async / Promises', sublabel: 'Modern JS' },
      { label: 'TypeScript', sublabel: 'Advanced' },
    ],
  },
  {
    id: 'react',
    color: '#06B6D4',
    colorAlpha: 'rgba(6,182,212,',
    iconText: '⚛',
    title: 'React',
    subtitle: '18 chapters',
    href: '/react',
    milestones: [
      { label: 'Components & JSX', sublabel: 'Foundation' },
      { label: 'Hooks & State', sublabel: 'Core React' },
      { label: 'State Management', sublabel: 'Patterns' },
      { label: 'Next.js', sublabel: 'Production' },
    ],
  },
  {
    id: 'nodejs',
    color: '#10B981',
    colorAlpha: 'rgba(16,185,129,',
    iconText: 'N',
    title: 'Node.js',
    subtitle: '23 chapters',
    href: '/course',
    milestones: [
      { label: 'Event Loop', sublabel: 'Core Architecture' },
      { label: 'Streams & I/O', sublabel: 'Data Processing' },
      { label: 'REST APIs', sublabel: 'Backend Dev' },
      { label: 'Scaling & Deploy', sublabel: 'Production' },
    ],
  },
  {
    id: 'genai',
    color: '#F97316',
    colorAlpha: 'rgba(249,115,22,',
    iconText: '✦',
    title: 'GenAI',
    subtitle: '22 chapters',
    href: '/genai',
    milestones: [
      { label: 'LLM Fundamentals', sublabel: 'Foundation' },
      { label: 'Prompt Engineering', sublabel: 'Core Skills' },
      { label: 'RAG Pipelines', sublabel: 'Advanced' },
      { label: 'AI Agents', sublabel: 'Production' },
    ],
  },
]

interface PathCardProps {
  path: LearningPath
  index: number
}

function PathCard({ path, index }: PathCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'rgba(18,18,26,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Hover glow border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 0 1.5px ${path.colorAlpha}0.4), 0 8px 40px rgba(0,0,0,0.5)`,
        }}
      />

      {/* Track header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-black font-display"
          style={{
            background: `${path.colorAlpha}0.18)`,
            border: `1.5px solid ${path.colorAlpha}0.3)`,
            color: path.color,
          }}
        >
          {path.iconText}
        </div>
        <div>
          <h3 className="text-base font-display font-bold text-[#F5F5F7]">{path.title}</h3>
          <p className="text-xs text-[#71717A]">{path.subtitle}</p>
        </div>
      </div>

      {/* Horizontal flow milestones */}
      <div className="flex items-start gap-0 overflow-x-auto pb-1">
        {path.milestones.map((milestone, i) => (
          <React.Fragment key={milestone.label}>
            {/* Milestone node */}
            <div className="flex flex-col items-center gap-2 min-w-[72px] flex-1">
              {/* Circle */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.35, delay: index * 0.1 + i * 0.08 + 0.2 }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-display transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${path.colorAlpha}0.2)`,
                  border: `1.5px solid ${path.colorAlpha}0.4)`,
                  color: path.color,
                }}
              >
                {i + 1}
              </motion.div>
              {/* Label */}
              <div className="text-center">
                <p className="text-[10px] md:text-xs font-semibold text-[#F5F5F7] leading-tight">
                  {milestone.label}
                </p>
                {milestone.sublabel && (
                  <p className="text-[9px] text-[#71717A] mt-0.5">{milestone.sublabel}</p>
                )}
              </div>
            </div>

            {/* Connector line */}
            {i < path.milestones.length - 1 && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 + i * 0.08 + 0.35 }}
                className="mt-3.5 h-px flex-1 origin-left"
                style={{
                  background: `linear-gradient(to right, ${path.colorAlpha}0.5), ${path.colorAlpha}0.15))`,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
        <span className="text-xs text-[#71717A]">Structured learning path</span>
        <Link
          href={path.href}
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
          style={{ color: path.color }}
        >
          Explore
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  )
}

export default function RoadmapSection() {
  return (
    <section className="relative py-24 md:py-32 bg-[#0A0A0F] overflow-hidden">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 0% 50%, rgba(124,58,237,0.06) 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 100% 50%, rgba(6,182,212,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.08)] text-[#F59E0B]">
            Learning Paths
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F5F5F7] mb-4 tracking-tight">
            Structured Paths to Mastery
          </h2>
          <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
            Har track ek clear journey hai. Beginner se production-ready engineer tak.
          </p>
        </motion.div>

        {/* 2×2 path grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {learningPaths.map((path, i) => (
            <PathCard key={path.id} path={path} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-14"
        >
          <a
            href="/course"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-base transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
              boxShadow: '0 4px 24px rgba(124,58,237,0.4)',
            }}
          >
            Apna Path Choose Karo
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
