/**
 * Progress tracking backed by localStorage.
 * All functions are wrapped in try/catch so they degrade gracefully
 * when called during SSR (where localStorage is undefined).
 */

const STORAGE_KEY = 'nodemaster:progress'
const TOTAL_CHAPTERS = 23

/** Returns a map of slug → completed (true/false). */
export function getProgress(): Record<string, boolean> {
  try {
    if (typeof window === 'undefined') return {}
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {}
    return parsed as Record<string, boolean>
  } catch {
    return {}
  }
}

/** Persist a full progress map back to localStorage. */
function saveProgress(data: Record<string, boolean>): void {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    // Dispatch a storage event so other hooks / tabs can react
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: JSON.stringify(data),
        storageArea: localStorage,
      })
    )
  } catch {
    // Silently ignore — quota exceeded, private browsing, etc.
  }
}

/** Mark a chapter as complete by its slug. */
export function markChapterComplete(slug: string): void {
  const progress = getProgress()
  progress[slug] = true
  saveProgress(progress)
}

/** Mark a chapter as incomplete (removes the completion flag). */
export function markChapterIncomplete(slug: string): void {
  const progress = getProgress()
  delete progress[slug]
  saveProgress(progress)
}

/**
 * Toggle a chapter's completion state.
 * Returns the new state (true = complete, false = incomplete).
 */
export function toggleChapterComplete(slug: string): boolean {
  const progress = getProgress()
  const wasComplete = progress[slug] === true
  if (wasComplete) {
    delete progress[slug]
  } else {
    progress[slug] = true
  }
  saveProgress(progress)
  return !wasComplete
}

/** Return the number of completed chapters. */
export function getCompletedCount(): number {
  try {
    const progress = getProgress()
    return Object.values(progress).filter(Boolean).length
  } catch {
    return 0
  }
}

/**
 * Return completion percentage (0–100), rounded to one decimal.
 * Uses the fixed TOTAL_CHAPTERS constant as denominator.
 */
export function getProgressPercent(): number {
  try {
    const completed = getCompletedCount()
    return Math.round((completed / TOTAL_CHAPTERS) * 1000) / 10
  } catch {
    return 0
  }
}

/** Check if a specific chapter is marked complete. */
export function isChapterComplete(slug: string): boolean {
  try {
    return getProgress()[slug] === true
  } catch {
    return false
  }
}

/** Wipe all progress from localStorage. */
export function resetProgress(): void {
  try {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: null,
        storageArea: localStorage,
      })
    )
  } catch {
    // Silently ignore.
  }
}
