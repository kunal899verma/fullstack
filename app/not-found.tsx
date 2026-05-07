'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const ERROR_CODE = `// Express mein 404 handler
// (ye page bhi kuch aisa hi karta hai internally)

const express = require('express');
const app = express();

// Tere actual routes yahan hote
app.get('/', handler);
app.get('/course', handler);
app.get('/playground', handler);

// 404 handler — hamesha last mein hona chahiye
// Koi bhi route match nahi hua? Ye fire hoga.
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.url,      // "${typeof window !== 'undefined' ? window.location.pathname : '/unknown-route'}",
    hint: 'Check your URL or go back home',
  });
});

// Tere saath bhi yehi hua —
// koi route match nahi hua is path ke liye!`

function PacketAnimation() {
  const [position, setPosition] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        const next = prev + direction * 2
        if (next >= 100 || next <= 0) setDirection((d) => -d)
        return Math.max(0, Math.min(100, next))
      })
    }, 30)
    return () => clearInterval(interval)
  }, [direction])

  return (
    <div className="relative h-20 my-8 overflow-hidden">
      {/* Track */}
      <div
        className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(6,182,212,0.4), transparent)' }}
      />

      {/* Nodes */}
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 -translate-x-1/2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(124,58,237,0.4)',
          }}
        >
          👤
        </div>
        <p className="text-[9px] text-[#52525B] font-mono text-center mt-1">Client</p>
      </div>

      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 translate-x-1/2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.4)',
          }}
        >
          ❓
        </div>
        <p className="text-[9px] text-[#52525B] font-mono text-center mt-1">???</p>
      </div>

      {/* Moving packet */}
      <div
        className="absolute top-1/2 -translate-y-1/2 transition-none"
        style={{ left: `${10 + position * 0.8}%` }}
      >
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center text-sm animate-pulse"
          style={{
            background: 'rgba(6,182,212,0.2)',
            border: '1px solid rgba(6,182,212,0.5)',
            boxShadow: '0 0 12px rgba(6,182,212,0.3)',
          }}
        >
          📦
        </div>
      </div>
    </div>
  )
}

export default function NotFound() {
  const [currentPath, setCurrentPath] = useState('/unknown-route')

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const codeWithPath = ERROR_CODE.replace(
    '"${typeof window !== \'undefined\' ? window.location.pathname : \'/unknown-route\'}"',
    `"${currentPath}"`
  )

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Background glows */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: '#EF4444' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: '#7C3AED' }}
      />

      <div className="max-w-2xl w-full relative z-10">
        {/* 404 hero */}
        <div className="text-center mb-8">
          <div
            className="text-[120px] md:text-[160px] font-black leading-none bg-clip-text text-transparent select-none"
            style={{
              backgroundImage: 'linear-gradient(135deg, #EF4444 0%, #7C3AED 50%, #06B6D4 100%)',
            }}
          >
            404
          </div>

          <h1 className="text-2xl font-bold text-[#F5F5F7] mb-3 -mt-4">
            Ye route exist nahi karta
          </h1>

          <p className="text-[#A1A1AA] leading-relaxed max-w-md mx-auto">
            Jaise Express mein koi handler nahi milta, waise hi ye page bhi nahi mila.
            HTTP ka 404 — Route not found.
          </p>
        </div>

        {/* Lost packet animation */}
        <div
          className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-4 mb-6"
          style={{ background: 'rgba(26,26,38,0.6)' }}
        >
          <p className="text-[10px] font-mono text-[#52525B] uppercase tracking-widest text-center mb-2">
            Your Request Packet — Lost in Transit
          </p>
          <PacketAnimation />
          <p className="text-[10px] font-mono text-[#52525B] text-center">
            Koi server nahi mila{' '}
            <span className="text-[#71717A]">&quot;{currentPath}&quot;</span>{' '}
            pe respond karne ke liye
          </p>
        </div>

        {/* Code snippet */}
        <div
          className="rounded-2xl border border-[rgba(255,255,255,0.08)] overflow-hidden mb-8"
          style={{ background: 'rgba(10,10,15,0.8)' }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2 border-b border-[rgba(255,255,255,0.06)]"
            style={{ background: 'rgba(26,26,38,0.8)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            </div>
            <span className="text-[10px] font-mono text-[#52525B] ml-2">express-404.js</span>
          </div>
          <pre
            className="p-5 text-xs font-mono leading-relaxed overflow-x-auto"
            style={{ color: '#A1A1AA' }}
          >
            <code>
              {codeWithPath.split('\n').map((line, i) => {
                // Simple syntax coloring
                const isComment = line.trim().startsWith('//')
                return (
                  <span
                    key={i}
                    className="block"
                    style={{ color: isComment ? '#52525B' : undefined }}
                  >
                    {line || ' '}
                  </span>
                )
              })}
            </code>
          </pre>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              color: '#fff',
              boxShadow: '0 0 24px rgba(124,58,237,0.3)',
            }}
          >
            Ghar Jao →
          </Link>
          <Link
            href="/course"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:border-[rgba(255,255,255,0.2)]"
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: '#A1A1AA',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            Course Dekho
          </Link>
        </div>

        {/* Fun footer */}
        <p className="text-center text-xs text-[#52525B] mt-8 font-mono">
          HTTP 404 · Route not matched ·{' '}
          <span className="text-[#71717A]">
            app.use((req, res) =&gt; res.status(404).send(&apos;Not Found&apos;))
          </span>
        </p>
      </div>
    </div>
  )
}
