'use client'

import React from 'react'
import { X, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface DiffBlockProps {
  bad: { code: string; label?: string; explanation?: string }
  good: { code: string; label?: string; explanation?: string }
  language?: string
  title?: string
}

// ── Custom theme ──────────────────────────────────────────────────────────────

const baseTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...(oneDark['pre[class*="language-"]'] as React.CSSProperties),
    background: 'transparent',
    margin: 0,
    padding: '1rem',
    fontSize: '0.8125rem',
    lineHeight: '1.65',
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
  },
  'code[class*="language-"]': {
    ...(oneDark['code[class*="language-"]'] as React.CSSProperties),
    background: 'transparent',
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: '0.8125rem',
  },
}

// ── Single pane ───────────────────────────────────────────────────────────────

interface PaneProps {
  code: string
  label: string
  explanation?: string
  language: string
  variant: 'bad' | 'good'
}

function Pane({ code, label, explanation, language, variant }: PaneProps) {
  const isBad = variant === 'bad'

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden flex-1 min-w-0"
      style={{
        background: isBad ? 'rgba(239,68,68,0.05)' : 'rgba(16,185,129,0.05)',
        border: isBad ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(16,185,129,0.25)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{
          background: isBad ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)',
          borderBottom: isBad ? '1px solid rgba(239,68,68,0.15)' : '1px solid rgba(16,185,129,0.15)',
        }}
      >
        <div
          className="flex items-center justify-center w-5 h-5 rounded-full"
          style={{ background: isBad ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)' }}
        >
          {isBad
            ? <X className="w-3 h-3 text-[#EF4444]" />
            : <Check className="w-3 h-3 text-[#10B981]" />}
        </div>
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: isBad ? '#EF4444' : '#10B981' }}
        >
          {label}
        </span>
      </div>

      {/* Code */}
      <div className="overflow-x-auto flex-1">
        <SyntaxHighlighter
          language={language}
          style={baseTheme}
          showLineNumbers={false}
          customStyle={{
            background: 'transparent',
            padding: 0,
            margin: 0,
            overflow: 'visible',
          }}
          codeTagProps={{
            style: {
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: '0.8125rem',
            },
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>

      {/* Explanation */}
      {explanation && (
        <div
          className="px-4 py-3 text-xs leading-relaxed"
          style={{
            color: isBad ? '#FCA5A5' : '#6EE7B7',
            borderTop: isBad ? '1px solid rgba(239,68,68,0.12)' : '1px solid rgba(16,185,129,0.12)',
          }}
        >
          {explanation}
        </div>
      )}
    </div>
  )
}

// ── Main DiffBlock ────────────────────────────────────────────────────────────

export default function DiffBlock({
  bad,
  good,
  language = 'javascript',
  title,
}: DiffBlockProps) {
  return (
    <div className="my-2">
      {title && (
        <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-3">{title}</p>
      )}
      <div className="flex flex-col md:flex-row gap-3">
        <Pane
          code={bad.code}
          label={bad.label ?? 'Galat Tarika'}
          explanation={bad.explanation}
          language={language}
          variant="bad"
        />
        <Pane
          code={good.code}
          label={good.label ?? 'Sahi Tarika'}
          explanation={good.explanation}
          language={language}
          variant="good"
        />
      </div>
    </div>
  )
}
