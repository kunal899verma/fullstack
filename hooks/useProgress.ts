'use client';

import { useState, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Storage key and constants
// ─────────────────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'nodemaster_progress';
const TOTAL_CHAPTERS = 23;

// ─────────────────────────────────────────────────────────────────────────────
// Internal storage helpers (id-based, for backward-compat with older callers)
// ─────────────────────────────────────────────────────────────────────────────
function loadIdsFromStorage(): Set<number> {
  if (typeof window === 'undefined') return new Set<number>();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set<number>();
    const arr: number[] = JSON.parse(raw);
    return new Set(arr);
  } catch {
    return new Set<number>();
  }
}

function saveIdsToStorage(completed: Set<number>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completed)));
  } catch {
    // ignore quota / private-browsing errors
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Slug-based storage key (used by lib/progress.ts)
// ─────────────────────────────────────────────────────────────────────────────
const SLUG_STORAGE_KEY = 'nodemaster:progress';

function loadSlugProgress(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(SLUG_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {};
    return parsed as Record<string, boolean>;
  } catch {
    return {};
  }
}

function saveSlugProgress(data: Record<string, boolean>): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SLUG_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: SLUG_STORAGE_KEY,
        newValue: JSON.stringify(data),
        storageArea: localStorage,
      })
    );
  } catch {
    // ignore
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Legacy ProgressState interface (id-based) — kept for backward compatibility
// ─────────────────────────────────────────────────────────────────────────────
export interface ProgressState {
  completedChapters: Set<number>;
  completionPercentage: number;
  completedCount: number;
  totalChapters: number;
  isCompleted: (chapterId: number) => boolean;
  toggleComplete: (chapterId: number) => void;
  markComplete: (chapterId: number | string) => void;
  markIncomplete: (chapterId: number | string) => void;
  resetProgress: () => void;
  /** Slug-keyed progress map (for spec-compatible callers) */
  progress: Record<string, boolean>;
  /** Alias for completionPercentage (spec-compatible) */
  percent: number;
  /** Alias for resetProgress */
  reset: () => void;
  /** Check if a slug is complete */
  isComplete: (slug: string) => boolean;
  /** Toggle a slug's completion; returns new state */
  toggle: (slug: string) => boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main hook
// ─────────────────────────────────────────────────────────────────────────────
export function useProgress(): ProgressState {
  // ID-based state (numeric chapter IDs)
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(
    () => new Set<number>()
  );

  // Slug-based state
  const [slugProgress, setSlugProgress] = useState<Record<string, boolean>>({});

  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage after mount
  useEffect(() => {
    setCompletedChapters(loadIdsFromStorage());
    setSlugProgress(loadSlugProgress());
    setMounted(true);
  }, []);

  // Subscribe to cross-tab storage events
  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        setCompletedChapters(loadIdsFromStorage());
      }
      if (event.key === SLUG_STORAGE_KEY) {
        setSlugProgress(loadSlugProgress());
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // ── ID-based updater ───────────────────────────────────────────────────────
  const updateAndSave = useCallback((updater: (prev: Set<number>) => Set<number>) => {
    setCompletedChapters((prev) => {
      const next = updater(prev);
      saveIdsToStorage(next);
      return next;
    });
  }, []);

  const toggleComplete = useCallback(
    (chapterId: number) => {
      updateAndSave((prev) => {
        const next = new Set(prev);
        if (next.has(chapterId)) {
          next.delete(chapterId);
        } else {
          next.add(chapterId);
        }
        return next;
      });
    },
    [updateAndSave]
  );

  // ── Unified markComplete — accepts id (number) or slug (string) ────────────
  const markComplete = useCallback(
    (chapterId: number | string) => {
      if (typeof chapterId === 'number') {
        updateAndSave((prev) => {
          const next = new Set(prev);
          next.add(chapterId);
          return next;
        });
      } else {
        const updated = { ...loadSlugProgress(), [chapterId]: true };
        saveSlugProgress(updated);
        setSlugProgress(updated);
      }
    },
    [updateAndSave]
  );

  // ── Unified markIncomplete — accepts id (number) or slug (string) ──────────
  const markIncomplete = useCallback(
    (chapterId: number | string) => {
      if (typeof chapterId === 'number') {
        updateAndSave((prev) => {
          const next = new Set(prev);
          next.delete(chapterId);
          return next;
        });
      } else {
        const updated = { ...loadSlugProgress() };
        delete updated[chapterId];
        saveSlugProgress(updated);
        setSlugProgress(updated);
      }
    },
    [updateAndSave]
  );

  // ── Slug toggle ────────────────────────────────────────────────────────────
  const toggle = useCallback((slug: string): boolean => {
    const current = loadSlugProgress();
    const wasComplete = current[slug] === true;
    if (wasComplete) {
      delete current[slug];
    } else {
      current[slug] = true;
    }
    saveSlugProgress(current);
    setSlugProgress({ ...current });
    return !wasComplete;
  }, []);

  // ── Reset ──────────────────────────────────────────────────────────────────
  const resetProgress = useCallback(() => {
    updateAndSave(() => new Set<number>());
    saveSlugProgress({});
    setSlugProgress({});
  }, [updateAndSave]);

  // ── Derived values ─────────────────────────────────────────────────────────
  const isCompleted = useCallback(
    (chapterId: number) => (mounted ? completedChapters.has(chapterId) : false),
    [completedChapters, mounted]
  );

  const isComplete = useCallback(
    (slug: string): boolean => slugProgress[slug] === true,
    [slugProgress]
  );

  const completedCount = mounted ? completedChapters.size : 0;
  const completionPercentage = Math.round((completedCount / TOTAL_CHAPTERS) * 100);
  const percent = completionPercentage;

  return {
    // ID-based (legacy)
    completedChapters,
    completionPercentage,
    completedCount,
    totalChapters: TOTAL_CHAPTERS,
    isCompleted,
    toggleComplete,
    markComplete,
    markIncomplete,
    resetProgress,
    // Slug-based (spec-compatible)
    progress: slugProgress,
    percent,
    reset: resetProgress,
    isComplete,
    toggle,
  };
}

export default useProgress;

