'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export type ButtonVariant = 'gradient' | 'ghost' | 'outline' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  gradient: [
    'relative text-white font-semibold overflow-hidden',
    'before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#7C3AED] before:to-[#06B6D4] before:transition-opacity before:duration-300',
    'after:absolute after:inset-0 after:bg-gradient-to-r after:from-[#9d5ff0] after:to-[#22d3ee] after:opacity-0 after:transition-opacity after:duration-300',
    'hover:after:opacity-100',
    'shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_32px_rgba(124,58,237,0.5)]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:after:opacity-0',
  ].join(' '),

  ghost: [
    'text-[#A1A1AA] font-medium',
    'hover:text-[#F5F5F7] hover:bg-white/5',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),

  outline: [
    'text-[#F5F5F7] font-medium',
    'border border-[rgba(255,255,255,0.12)]',
    'hover:border-[#7C3AED] hover:text-[#F5F5F7] hover:bg-[rgba(124,58,237,0.08)]',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),

  danger: [
    'relative text-white font-semibold overflow-hidden',
    'before:absolute before:inset-0 before:bg-[#EF4444] before:transition-opacity before:duration-300',
    'after:absolute after:inset-0 after:bg-[#f87171] after:opacity-0 after:transition-opacity after:duration-300',
    'hover:after:opacity-100',
    'shadow-[0_0_16px_rgba(239,68,68,0.2)] hover:shadow-[0_0_24px_rgba(239,68,68,0.4)]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:after:opacity-0',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-xl gap-2',
  lg: 'h-12 px-6 text-base rounded-xl gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'gradient',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'transition-all duration-200',
          'select-none cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]',
          'active:scale-[0.97]',
          // Variant
          variantClasses[variant],
          // Size
          sizeClasses[size],
          // External className
          className
        )}
        {...props}
      >
        {/* Content sits above ::before and ::after pseudo layers */}
        <span className="relative z-10 inline-flex items-center gap-[inherit]">
          {loading ? (
            <Loader2 className="animate-spin shrink-0 w-4 h-4" aria-hidden="true" />
          ) : (
            leftIcon && (
              <span className="shrink-0" aria-hidden="true">
                {leftIcon}
              </span>
            )
          )}

          {children && <span>{children}</span>}

          {!loading && rightIcon && (
            <span className="shrink-0" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
