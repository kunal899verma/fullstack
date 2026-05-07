'use client'

import React from 'react'
import { CheckCircle2, Circle } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'

interface ChapterProgressButtonProps {
  chapterId: number
  chapterSlug: string
}

export default function ChapterProgressButton({ chapterId }: ChapterProgressButtonProps) {
  const { isCompleted, toggleComplete } = useProgress()
  const done = isCompleted(chapterId)

  return (
    <button
      onClick={() => toggleComplete(chapterId)}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: done ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)',
        border: done ? '1px solid rgba(16,185,129,0.35)' : '1px solid rgba(255,255,255,0.12)',
        color: done ? '#10B981' : '#A1A1AA',
      }}
    >
      {done ? (
        <>
          <CheckCircle2 className="w-4 h-4" />
          Completed!
        </>
      ) : (
        <>
          <Circle className="w-4 h-4" />
          Mark as Complete
        </>
      )}
    </button>
  )
}
