'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Monitor, MessageCircle } from 'lucide-react'

interface Method {
  icon: React.ReactNode
  emoji: string
  title: string
  subtitle: string
  description: string
  accent: string
  accentAlpha: string
  mockup: React.ReactNode
}

// ── Mockup components ────────────────────────────────────────────────────────

function WhyHowMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden text-xs font-mono"
      style={{ background: '#0d0d14', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-1.5 px-3 py-2"
        style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
        <span className="ml-2 text-[#71717A] text-[10px]">concept.mdx</span>
      </div>
      <div className="p-3 space-y-1.5">
        <div className="flex gap-2">
          <span className="text-[#7C3AED] font-bold shrink-0">KAB?</span>
          <span className="text-[#A1A1AA]">Jab yeh pattern fit ho</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[#06B6D4] font-bold shrink-0">KYUN?</span>
          <span className="text-[#A1A1AA]">Real problem solve hota hai</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[#10B981] font-bold shrink-0">KAISE?</span>
          <span className="text-[#A1A1AA]">Step-by-step build karo</span>
        </div>
        <div className="mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-[#71717A]">{'// JS • React • Node • GenAI'}</span>
          <br />
          <span className="text-[#7C3AED]">{'const '}</span>
          <span className="text-[#F5F5F7]">skill</span>
          <span className="text-[#A1A1AA]">{' = '}</span>
          <span className="text-[#F59E0B]">await</span>
          <span className="text-[#A1A1AA]">{' learn()'}</span>
        </div>
      </div>
    </div>
  )
}

function InteractiveMockup() {
  const tracks = [
    { label: 'JS', color: '#F7DF1E', alpha: 'rgba(247,223,30,' },
    { label: 'React', color: '#06B6D4', alpha: 'rgba(6,182,212,' },
    { label: 'Node', color: '#10B981', alpha: 'rgba(16,185,129,' },
    { label: 'GenAI', color: '#F97316', alpha: 'rgba(249,115,22,' },
  ]
  return (
    <div
      className="rounded-xl overflow-hidden text-xs"
      style={{ background: '#0d0d14', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
        </div>
        <span className="text-[#71717A] text-[10px]">Learning Tracks</span>
        <div />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-center gap-2 py-1 flex-wrap">
          {tracks.map((t, i) => (
            <React.Fragment key={t.label}>
              <div
                className="px-2 py-1 rounded-lg text-center"
                style={{
                  background: `${t.alpha}0.15)`,
                  border: `1px solid ${t.alpha}0.35)`,
                  color: t.color,
                  fontSize: '9px',
                  fontWeight: 700,
                }}
              >
                {t.label}
              </div>
              {i < tracks.length - 1 && (
                <span className="text-[#71717A]" style={{ fontSize: '10px' }}>→</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <motion.div
          animate={{ x: [0, 28, 56, 84, 56, 28, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="mt-2 w-3 h-3 rounded-full mx-auto"
          style={{ background: 'linear-gradient(135deg, #F7DF1E, #F97316)' }}
        />
        <p className="text-center text-[#71717A] mt-1" style={{ fontSize: '9px' }}>
          Your learning journey →
        </p>
      </div>
    </div>
  )
}

function HinglishMockup() {
  const messages = [
    { role: 'lesson', text: 'React hooks basically ek shortcut hai...', color: '#A1A1AA' },
    { role: 'code', text: 'useState vs useReducer — kab kya use karein?', color: '#7C3AED' },
    { role: 'note', text: 'Tip: useEffect cleanup zaroor karo!', color: '#F59E0B' },
  ]
  return (
    <div
      className="rounded-xl overflow-hidden text-xs"
      style={{ background: '#0d0d14', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div
        className="flex items-center gap-1.5 px-3 py-2"
        style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
        <span className="ml-2 text-[#71717A] text-[10px]">Any Chapter — Hinglish</span>
      </div>
      <div className="p-3 space-y-2.5">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="flex gap-2 items-start"
          >
            <span
              className="shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
              style={{ background: msg.color }}
            />
            <span style={{ color: msg.color }}>{msg.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────

const methods: Method[] = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    emoji: '🤔',
    title: 'When / Why / How Structure',
    subtitle: 'Sirf code nahi — pure understanding',
    description:
      'Har concept ke saath teen sawal: Kab use karein? Kyun use karein? Kaise use karein? JS ho, React ho, Node ho ya GenAI — same structured approach across all 4 tracks.',
    accent: '#7C3AED',
    accentAlpha: 'rgba(124,58,237,',
    mockup: <WhyHowMockup />,
  },
  {
    icon: <Monitor className="w-5 h-5" />,
    emoji: '🎬',
    title: 'Interactive Demos',
    subtitle: '40+ live visualizations',
    description:
      'Concepts ko animate hote dekho. JS closures, React renders, Node streams, AI token generation — sab visually samjho. Padhte nahi — feel karte hain.',
    accent: '#06B6D4',
    accentAlpha: 'rgba(6,182,212,',
    mockup: <InteractiveMockup />,
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    emoji: '💬',
    title: 'Hinglish Mein',
    subtitle: 'Jaise dost samjhata hai',
    description:
      'Ye language barrier nahi aayega. Natural Hindi-English mix mein likha hai — technical accuracy ke saath, engineer ki bolchaal mein.',
    accent: '#F59E0B',
    accentAlpha: 'rgba(245,158,11,',
    mockup: <HinglishMockup />,
  },
]

// ── Main component ────────────────────────────────────────────────────────────

export default function MethodologySection() {
  return (
    <section className="relative py-24 md:py-32 bg-[#12121A] overflow-hidden">
      {/* Background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
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
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 border border-[rgba(6,182,212,0.3)] bg-[rgba(6,182,212,0.08)] text-[#06B6D4]">
            Methodology
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#F5F5F7] mb-4 tracking-tight">
            Aise samjhaate hain hum
          </h2>
          <p className="text-lg text-[#A1A1AA] max-w-xl mx-auto">
            Ye typical tutorial site nahi hai — 4 tracks, ek proven methodology.
          </p>
        </motion.div>

        {/* Three column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {methods.map((method, i) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="group relative rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(26,26,38,0.9)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `0 0 0 1px ${method.accentAlpha}0.3), 0 12px 40px rgba(0,0,0,0.5)`,
                }}
              />

              {/* Accent orb background */}
              <div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: method.accent }}
              />

              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 text-xl"
                style={{
                  background: `${method.accentAlpha}0.15)`,
                  border: `1px solid ${method.accentAlpha}0.25)`,
                  color: method.accent,
                }}
              >
                {method.emoji}
              </div>

              {/* Text */}
              <h3 className="text-lg font-bold font-display text-[#F5F5F7] mb-1">
                {method.title}
              </h3>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: method.accent }}
              >
                {method.subtitle}
              </p>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                {method.description}
              </p>

              {/* Mini mockup preview */}
              <div className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                {method.mockup}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
