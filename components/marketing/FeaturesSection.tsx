'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Feature {
  emoji: string
  title: string
  description: string
  tag: string
  conceptCount: number
  accentColor: string
  accentColorAlpha: string
}

const features: Feature[] = [
  {
    emoji: '🔄',
    title: 'Event Loop',
    description:
      'Node ka dil samjho. Single thread mein millions of requests handle karne ka magic.',
    tag: 'Core Architecture',
    conceptCount: 8,
    accentColor: '#7C3AED',
    accentColorAlpha: 'rgba(124,58,237,',
  },
  {
    emoji: '⚡',
    title: 'Async Mastery',
    description:
      'Callbacks se async/await tak — promise chains, error handling, aur concurrency patterns.',
    tag: 'Async Patterns',
    conceptCount: 12,
    accentColor: '#06B6D4',
    accentColorAlpha: 'rgba(6,182,212,',
  },
  {
    emoji: '🌊',
    title: 'Streams',
    description:
      'GB files bhi memory-efficient. Piping, backpressure, aur transform streams ka full mastery.',
    tag: 'Data Processing',
    conceptCount: 9,
    accentColor: '#10B981',
    accentColorAlpha: 'rgba(16,185,129,',
  },
  {
    emoji: '🔌',
    title: 'REST APIs',
    description:
      'Production-grade APIs banana — routing, middleware, auth, rate limiting, aur error handling.',
    tag: 'Backend APIs',
    conceptCount: 11,
    accentColor: '#F59E0B',
    accentColorAlpha: 'rgba(245,158,11,',
  },
  {
    emoji: '📈',
    title: 'Scaling',
    description:
      '10 req/s se 10k req/s tak. Worker threads, clustering, Redis caching, load balancing.',
    tag: 'Performance',
    conceptCount: 10,
    accentColor: '#EF4444',
    accentColorAlpha: 'rgba(239,68,68,',
  },
  {
    emoji: '🚀',
    title: 'DevOps',
    description:
      'Docker se deployment tak. CI/CD, containerization, zero-downtime deploys, monitoring.',
    tag: 'Production',
    conceptCount: 9,
    accentColor: '#7C3AED',
    accentColorAlpha: 'rgba(124,58,237,',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
}

interface FeatureCardProps {
  feature: Feature
}

function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative rounded-2xl p-6 cursor-default transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'rgba(26,26,38,0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Gradient border on hover — pseudo-element via box-shadow trick */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 0 1px ${feature.accentColorAlpha}0.4), 0 8px 40px rgba(0,0,0,0.5), 0 0 30px ${feature.accentColorAlpha}0.08)`,
        }}
      />

      {/* Glow orb behind emoji */}
      <div
        className="absolute top-4 left-4 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
        style={{ background: feature.accentColor }}
      />

      {/* Emoji icon */}
      <div
        className="relative w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${feature.accentColorAlpha}0.15)`,
          border: `1px solid ${feature.accentColorAlpha}0.25)`,
        }}
      >
        {feature.emoji}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold font-display text-[#F5F5F7] mb-2 group-hover:text-white transition-colors duration-200">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#A1A1AA] leading-relaxed mb-5">
        {feature.description}
      </p>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
          style={{
            background: `${feature.accentColorAlpha}0.12)`,
            color: feature.accentColor,
            border: `1px solid ${feature.accentColorAlpha}0.25)`,
          }}
        >
          {feature.tag}
        </span>
        <span className="text-xs text-[#71717A] font-medium">
          {feature.conceptCount} concepts
        </span>
      </div>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="features"
      className="relative py-24 md:py-32 bg-[#0A0A0F] overflow-hidden"
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%)',
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
            Curriculum
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F5F5F7] mb-4 tracking-tight">
            Yahan kya seekhoge?
          </h2>
          <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto">
            Sirf theory nahi —{' '}
            <span className="text-[#F5F5F7] font-medium">internalize karo, feel karo, build karo.</span>
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <p className="text-[#71717A] text-sm">
            Aur bhi bahut kuch —{' '}
            <a href="/course" className="text-[#7C3AED] hover:text-[#9d5ff0] transition-colors duration-200 font-medium underline underline-offset-4 decoration-[rgba(124,58,237,0.4)]">
              full curriculum dekho →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
