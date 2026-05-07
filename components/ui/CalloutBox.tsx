import React from 'react'
import { cn } from '@/lib/utils'

export type CalloutType = 'warning' | 'tip' | 'note' | 'danger'

export interface CalloutBoxProps {
  type: CalloutType
  title?: string
  children: React.ReactNode
  className?: string
}

interface CalloutConfig {
  icon: string
  label: string
  /** Tailwind / CSS classes for the container */
  wrapper: string
  /** Left accent border colour (Tailwind arbitrary value) */
  border: string
  /** Icon background ring */
  iconBg: string
  /** Title colour */
  titleColor: string
}

const calloutConfig: Record<CalloutType, CalloutConfig> = {
  warning: {
    icon: '⚠️',
    label: 'Warning',
    wrapper:
      'bg-[rgba(245,158,11,0.05)] border-l-4 border-[#F59E0B] border border-[rgba(245,158,11,0.2)]',
    border: 'border-[rgba(245,158,11,0.2)]',
    iconBg: 'bg-[rgba(245,158,11,0.12)]',
    titleColor: 'text-[#F59E0B]',
  },
  tip: {
    icon: '💡',
    label: 'Tip',
    wrapper:
      'bg-[rgba(6,182,212,0.05)] border-l-4 border-[#06B6D4] border border-[rgba(6,182,212,0.2)]',
    border: 'border-[rgba(6,182,212,0.2)]',
    iconBg: 'bg-[rgba(6,182,212,0.12)]',
    titleColor: 'text-[#06B6D4]',
  },
  note: {
    icon: '📌',
    label: 'Note',
    wrapper:
      'bg-[rgba(124,58,237,0.05)] border-l-4 border-[#7C3AED] border border-[rgba(124,58,237,0.2)]',
    border: 'border-[rgba(124,58,237,0.2)]',
    iconBg: 'bg-[rgba(124,58,237,0.12)]',
    titleColor: 'text-[#a78bfa]',
  },
  danger: {
    icon: '🚨',
    label: 'Danger',
    wrapper:
      'bg-[rgba(239,68,68,0.05)] border-l-4 border-[#EF4444] border border-[rgba(239,68,68,0.2)]',
    border: 'border-[rgba(239,68,68,0.2)]',
    iconBg: 'bg-[rgba(239,68,68,0.12)]',
    titleColor: 'text-[#EF4444]',
  },
}

export default function CalloutBox({
  type,
  title,
  children,
  className,
}: CalloutBoxProps) {
  const config = calloutConfig[type]
  const displayTitle = title ?? config.label

  return (
    <aside
      className={cn(
        'relative rounded-r-xl rounded-l-none my-6 p-4',
        config.wrapper,
        className
      )}
      role="note"
      aria-label={`${displayTitle} callout`}
    >
      {/* Header row */}
      <div className="flex items-center gap-2.5 mb-2">
        {/* Icon */}
        <span
          className={cn(
            'flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm leading-none',
            config.iconBg
          )}
          aria-hidden="true"
        >
          {config.icon}
        </span>

        {/* Title */}
        <span
          className={cn(
            'font-semibold text-sm tracking-wide font-display',
            config.titleColor
          )}
        >
          {displayTitle}
        </span>
      </div>

      {/* Content */}
      <div className="pl-[2.375rem] text-sm text-[#A1A1AA] leading-relaxed [&>p]:mb-0 [&>p]:text-[#A1A1AA] [&>code]:text-xs">
        {children}
      </div>
    </aside>
  )
}
