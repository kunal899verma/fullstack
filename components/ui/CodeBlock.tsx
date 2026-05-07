'use client'

import React, { useState, useCallback } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

// Override specific oneDark tokens for better alignment with NodeMaster theme
const nodemasterTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...(oneDark['pre[class*="language-"]'] as React.CSSProperties),
    background: '#0d0d14',
    margin: 0,
    padding: '1.25rem 0',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    overflow: 'visible', // outer wrapper handles overflow
  },
  'code[class*="language-"]': {
    ...(oneDark['code[class*="language-"]'] as React.CSSProperties),
    background: 'transparent',
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: '0.875rem',
  },
}

export interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  className?: string
  maxHeight?: string
}

/** Traffic-light dot colours */
const trafficDots = [
  { color: '#EF4444', label: 'close' },
  { color: '#F59E0B', label: 'minimise' },
  { color: '#10B981', label: 'maximise' },
]

/** Map common aliases to Prism language identifiers */
function normaliseLanguage(lang: string): string {
  const map: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    sh: 'bash',
    shell: 'bash',
    zsh: 'bash',
    yml: 'yaml',
    Dockerfile: 'docker',
  }
  return map[lang] ?? lang
}

export default function CodeBlock({
  code,
  language = 'javascript',
  filename,
  showLineNumbers = true,
  highlightLines = [],
  className,
  maxHeight,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers / non-HTTPS
      const textarea = document.createElement('textarea')
      textarea.value = code.trim()
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [code])

  const normLang = normaliseLanguage(language)

  // Custom line-number and highlight renderer
  const lineProps = (lineNumber: number): React.HTMLAttributes<HTMLElement> => {
    const isHighlighted = highlightLines.includes(lineNumber)
    return {
      style: {
        display: 'block',
        backgroundColor: isHighlighted ? 'rgba(124,58,237,0.15)' : undefined,
        borderLeft: isHighlighted ? '2px solid #7C3AED' : '2px solid transparent',
        paddingLeft: isHighlighted ? '0.75rem' : '0.75rem',
        marginLeft: '-0.75rem',
      },
    }
  }

  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]',
        'bg-[#0d0d14] font-mono',
        'shadow-[0_4px_24px_rgba(0,0,0,0.5)]',
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[rgba(255,255,255,0.03)] border-b border-[rgba(255,255,255,0.06)]">
        {/* Left: traffic lights + optional filename */}
        <div className="flex items-center gap-3">
          {/* Traffic-light dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {trafficDots.map((dot) => (
              <span
                key={dot.label}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: dot.color }}
              />
            ))}
          </div>

          {filename && (
            <span className="text-[#71717A] text-xs font-mono ml-1 truncate max-w-[200px]">
              {filename}
            </span>
          )}
        </div>

        {/* Right: language badge + copy button */}
        <div className="flex items-center gap-2">
          {/* Language badge */}
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-[rgba(124,58,237,0.15)] text-[#a78bfa] border border-[rgba(124,58,237,0.2)]">
            {language}
          </span>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium',
              'transition-all duration-200',
              copied
                ? 'text-[#10B981] bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.25)]'
                : 'text-[#71717A] hover:text-[#A1A1AA] border border-transparent hover:border-[rgba(255,255,255,0.1)] hover:bg-white/5'
            )}
            aria-label={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code area */}
      <div
        className="overflow-x-auto"
        style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
      >
        <SyntaxHighlighter
          language={normLang}
          style={nodemasterTheme}
          showLineNumbers={showLineNumbers}
          wrapLines={highlightLines.length > 0}
          lineProps={highlightLines.length > 0 ? lineProps : undefined}
          lineNumberStyle={{
            color: '#3f3f56',
            userSelect: 'none',
            paddingRight: '1.5rem',
            paddingLeft: '1rem',
            minWidth: '3rem',
            textAlign: 'right',
            fontSize: '0.8125rem',
          }}
          customStyle={{
            background: 'transparent',
            padding: 0,
            margin: 0,
            overflow: 'visible',
          }}
          codeTagProps={{
            style: {
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: '0.875rem',
            },
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
