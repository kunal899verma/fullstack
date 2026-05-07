import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind class names safely.
 * Combines clsx (conditionals, arrays, objects) with tailwind-merge
 * (deduplicates conflicting Tailwind utilities).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Format a duration in minutes into a human-readable string.
 * Examples:
 *   30  → "30 min"
 *   90  → "1 hr 30 min"
 *   120 → "2 hr"
 */
export function formatTime(minutes: number): string {
  if (minutes <= 0) return '0 min'

  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hrs === 0) return `${mins} min`
  if (mins === 0) return `${hrs} hr`
  return `${hrs} hr ${mins} min`
}

/**
 * Slug map kept in sync with chapters.ts.
 * Used when you have a chapter number but not the full chapter array.
 */
const CHAPTER_SLUG_MAP: Record<number, string> = {
  1: 'what-is-nodejs',
  2: 'event-loop-deep-dive',
  3: 'modules-commonjs-esm',
  4: 'npm-and-packages',
  5: 'file-system',
  6: 'async-callbacks',
  7: 'promises',
  8: 'async-await',
  9: 'streams',
  10: 'buffers-and-binary',
  11: 'http-and-rest-apis',
  12: 'express-deep-dive',
  13: 'databases-and-orms',
  14: 'authentication-jwt',
  15: 'caching-redis',
  16: 'websockets-realtime',
  17: 'worker-threads',
  18: 'testing',
  19: 'performance-profiling',
  20: 'security',
  21: 'microservices',
  22: 'docker-and-containers',
  23: 'deployment-and-ci-cd',
}

/**
 * Return the URL slug for a chapter given its 1-based number.
 * Falls back to "chapter-N" for out-of-range values.
 */
export function getChapterSlug(chapterNumber: number): string {
  return CHAPTER_SLUG_MAP[chapterNumber] ?? `chapter-${chapterNumber}`
}

/**
 * Clamp a number between min and max (inclusive).
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Generate a URL-safe slug from any string.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Return true when running in a browser context (not during SSR).
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Truncate a string to maxLength characters, appending "…" when truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 1) + '…'
}

/**
 * Calculate reading time estimate.
 * Assumes ~200 words per minute for technical content.
 */
export function estimateReadingTime(text: string, wordsPerMinute = 200): number {
  const wordCount = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}
