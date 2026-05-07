'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Star } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      {/* Gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #0A0A0F 0%, #180a2e 40%, #0d0d14 80%, #0A0A0F 100%)',
        }}
      />

      {/* Purple glow orb */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(124,58,237,0.22) 0%, rgba(6,182,212,0.06) 50%, transparent 80%)',
        }}
      />

      {/* Noise / grain overlay for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Animated top gradient line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.7), rgba(6,182,212,0.7), transparent)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          {/* Avatars */}
          <div className="flex -space-x-2">
            {['#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'].map((color, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-[#180a2e] flex items-center justify-center text-xs font-bold text-white"
                style={{ background: color, zIndex: 5 - i }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-0.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
              ))}
            </div>
            <span className="text-xs text-[#A1A1AA] flex items-center gap-1">
              <Users className="w-3 h-3" />
              3,000+ developers ne start kiya
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6 leading-tight"
          style={{
            background: 'linear-gradient(180deg, #F5F5F7 0%, rgba(245,245,247,0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Ab shuru kar do.
        </motion.h2>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-[#A1A1AA] max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Node.js ko aaj se seriously lo.{' '}
          <span className="text-[#F5F5F7] font-medium">
            Ek chapter roz — 3 mahine mein senior-level.
          </span>
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <Link
            href="/course"
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-white text-lg overflow-hidden transition-transform duration-200 hover:-translate-y-1 active:translate-y-0"
            style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)' }}
          >
            {/* Hover overlay */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #9d5ff0 0%, #22d3ee 100%)' }}
            />
            {/* Glow */}
            <span
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: '0 0 40px rgba(124,58,237,0.6), 0 0 80px rgba(124,58,237,0.25)' }}
            />
            <span className="relative z-10 flex items-center gap-3">
              Course Shuru Karo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </Link>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-2 text-sm text-[#71717A]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Free hai. Koi signup nahi. Koi credit card nahi.
          </motion.p>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-14"
        >
          {[
            '23 Chapters',
            '60+ Concepts',
            '30+ Demos',
            'Hinglish mein',
            'Always Free',
          ].map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium text-[#A1A1AA] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)]"
            >
              {pill}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0A0A0F)',
        }}
      />
    </section>
  )
}
