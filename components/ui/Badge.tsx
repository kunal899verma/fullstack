import React from 'react'
import { cn } from '@/lib/utils'

export type BadgeVariant = 'beginner' | 'intermediate' | 'advanced' | 'tag'

export interface BadgeProps {
  variant: BadgeVariant
  children?: React.ReactNode
  className?: string
  showDot?: boolean
}

interface BadgeStyle {
  wrapper: string
  dot: string
  label: string
}

const variantStyles: Record<BadgeVariant, BadgeStyle> = {
  beginner: {
    wrapper:
      'bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.25)] text-[#10B981]',
    dot: 'bg-[#10B981]',
    label: 'Beginner',
  },
  intermediate: {
    wrapper:
      'bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.25)] text-[#F59E0B]',
    dot: 'bg-[#F59E0B]',
    label: 'Intermediate',
  },
  advanced: {
    wrapper:
      'bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.25)] text-[#EF4444]',
    dot: 'bg-[#EF4444]',
    label: 'Advanced',
  },
  tag: {
    wrapper:
      'bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.2)] text-[#06B6D4]',
    dot: 'bg-[#06B6D4]',
    label: '',
  },
}

/** Map difficulty string (from chapter metadata) to badge variant */
export function difficultyToBadgeVariant(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): BadgeVariant {
  return difficulty
}

export default function Badge({
  variant,
  children,
  className,
  showDot = true,
}: BadgeProps) {
  const styles = variantStyles[variant]
  const displayText = children ?? styles.label

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium',
        'whitespace-nowrap select-none',
        styles.wrapper,
        className
      )}
    >
      {showDot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', styles.dot)}
          aria-hidden="true"
        />
      )}
      {displayText}
    </span>
  )
}

/** Convenience component for topic tags */
export function TopicTag({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Badge variant="tag" showDot={false} className={className}>
      {children}
    </Badge>
  )
}
