'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface CardProps {
  children?: React.ReactNode
  className?: string
  /** Enable lift + gradient border glow on hover */
  hover?: boolean
  /** Apply hero gradient tint to background */
  gradient?: boolean
  /** Render as a specific HTML element (default: div) */
  as?: 'div' | 'article' | 'section' | 'li'
  /** Additional props forwarded to the motion element */
  onClick?: React.MouseEventHandler<HTMLDivElement>
  style?: React.CSSProperties
  'aria-label'?: string
  role?: string
}

export default function Card({
  children,
  className,
  hover = false,
  gradient = false,
  onClick,
  style,
  ...rest
}: CardProps) {
  const baseInnerClasses = cn(
    'relative rounded-2xl overflow-hidden',
    'border border-[rgba(255,255,255,0.08)]',
    gradient
      ? 'bg-gradient-to-br from-[rgba(124,58,237,0.08)] to-[rgba(6,182,212,0.04)]'
      : 'bg-[rgba(26,26,38,0.8)] backdrop-blur-[12px]',
    'transition-all duration-300',
    onClick ? 'cursor-pointer' : '',
    className
  )

  if (!hover) {
    return (
      <div
        className={baseInnerClasses}
        onClick={onClick}
        style={style}
        {...rest}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      // Outer wrapper — contains the gradient border ring
      className="relative group rounded-2xl"
      whileHover="hovered"
      initial="idle"
      onClick={onClick}
      style={style}
      {...(rest as HTMLMotionProps<'div'>)}
    >
      {/* Gradient border layer — sits behind the card */}
      <motion.div
        variants={{
          idle: { opacity: 0 },
          hovered: { opacity: 1 },
        }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 rounded-2xl p-px"
        style={{
          background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
        }}
        aria-hidden="true"
      >
        {/* Inner cutout — fills gradient wrapper, leaving only a 1px ring visible */}
        <div className="h-full w-full rounded-[calc(1rem-1px)] bg-[#12121A]" />
      </motion.div>

      {/* Glow bloom below card on hover */}
      <motion.div
        variants={{
          idle: { opacity: 0, scale: 0.9 },
          hovered: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-2xl blur-xl -z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.08) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Card body — lifts on hover */}
      <motion.div
        variants={{
          idle: { y: 0 },
          hovered: { y: -4 },
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className={cn(
          'relative z-10',
          baseInnerClasses,
          // When inside the hover wrapper, remove border so gradient ring shows
          'border-transparent'
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
