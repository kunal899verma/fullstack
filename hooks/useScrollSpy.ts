'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * useScrollSpy
 *
 * Observes a list of DOM elements by their IDs using IntersectionObserver
 * and returns the ID of the element currently most visible in the viewport.
 *
 * Typically used to highlight the active heading in a table of contents.
 *
 * @param ids     - Array of element IDs to observe (without the leading "#")
 * @param options - Optional IntersectionObserver options
 * @returns The ID of the currently-in-view heading, or null if none
 */
export function useScrollSpy(
  ids: string[],
  options?: IntersectionObserverInit
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  // Keep a ref to the latest ids array to avoid re-creating the observer
  // every time the parent re-renders with an identical ids array.
  const idsRef = useRef<string[]>(ids)
  useEffect(() => {
    idsRef.current = ids
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return
    }

    if (ids.length === 0) {
      setActiveId(null)
      return
    }

    // Map of id → intersection ratio, so we can pick the most visible element
    const ratioMap = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        // Update ratio map
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id')
          if (id) {
            ratioMap.set(id, entry.intersectionRatio)
          }
        })

        // Pick the id with the highest intersection ratio
        let bestId: string | null = null
        let bestRatio = 0

        idsRef.current.forEach((id) => {
          const ratio = ratioMap.get(id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        // If nothing is clearly visible, fall back to the topmost observed element
        // by document order — useful when scrolling quickly between sections.
        if (bestId === null || bestRatio === 0) {
          // Find the element closest to the top of the viewport that has been seen
          const visible = idsRef.current
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null)
            .filter((el) => {
              const rect = el.getBoundingClientRect()
              return rect.top <= (options?.rootMargin ? 0 : 80)
            })

          if (visible.length > 0) {
            // The last element that is above the scroll threshold
            bestId = visible[visible.length - 1].id
          }
        }

        if (bestId !== null) {
          setActiveId(bestId)
        }
      },
      {
        // Default: observe the top 80% of the viewport
        rootMargin: '-80px 0px -20% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        ...options,
      }
    )

    // Observe each element
    const elements: HTMLElement[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
        elements.push(el)
      }
    })

    return () => {
      elements.forEach((el) => observer.unobserve(el))
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(','), options?.rootMargin, options?.threshold])

  return activeId
}

export default useScrollSpy
