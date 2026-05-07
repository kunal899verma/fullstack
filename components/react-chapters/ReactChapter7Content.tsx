'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const effectQuiz: QuizQuestion[] = [
  {
    question: 'useEffect ka dependency array empty [] hone pe kab run hota hai?',
    options: [
      { text: 'Har re-render pe', correct: false, explanation: 'Empty array means — sirf pehle render pe.' },
      { text: 'Sirf component mount hone pe — ek baar', correct: true, explanation: 'Sahi! [] means no dependencies — sirf mount pe run hota hai, unmount pe cleanup.' },
      { text: 'Kabhi nahi', correct: false, explanation: 'Empty array means mount pe ek baar — never kabhi nahi.' },
      { text: 'Sirf unmount pe', correct: false, explanation: 'Unmount pe sirf cleanup function run hota hai.' },
    ],
  },
  {
    question: 'useEffect mein object dependency kyon infinite loop cause karta hai?',
    options: [
      { text: 'Objects useEffect mein allowed nahi hain', correct: false, explanation: 'Objects allowed hain — behavior samajhna zaroori hai.' },
      { text: 'Har render pe naya object reference banata hai — dependency "changed" appear hoti hai — re-render — loop', correct: true, explanation: 'Sahi! { id: 1 } === { id: 1 } → false in JS. Har render naya object reference → effect re-run → state update → render → loop.' },
      { text: 'useEffect async nahi hai', correct: false, explanation: 'Async vs sync issue nahi hai yahan.' },
      { text: 'React bug hai', correct: false, explanation: 'Expected behavior hai — reference equality samajhna zaroori.' },
    ],
  },
  {
    question: 'Cleanup function kab return karna chahiye useEffect se?',
    options: [
      { text: 'Kabhi nahi — cleanup React automatically karta hai', correct: false, explanation: 'React automatic cleanup nahi karta — developer ki responsibility hai.' },
      { text: 'Jab event listeners, timers, subscriptions, ya async operations ho', correct: true, explanation: 'Bilkul! Cleanup function unmount pe (ya next effect run se pehle) call hoti hai — prevent memory leaks.' },
      { text: 'Sirf async effects mein', correct: false, explanation: 'Sync effects mein bhi cleanup zaroori ho sakti hai — event listeners, etc.' },
      { text: 'Sirf jab error ho', correct: false, explanation: 'Cleanup error handling se related nahi — resource management se related hai.' },
    ],
  },
  {
    question: 'useEffect ke dependency array mein kya daalna chahiye?',
    options: [
      { text: 'Kuch nahi — hamesha empty array rakho', correct: false, explanation: 'Empty array incorrect dependencies cause karta hai — stale closures, missing updates.' },
      { text: 'Sab props aur state jo effect ke andar use hote hain', correct: true, explanation: 'Sahi! eslint-plugin-react-hooks exhaustive-deps rule yahi check karta hai. Sab dependencies honestly list karo.' },
      { text: 'Sirf props — state nahi', correct: false, explanation: 'State bhi dependency hoti hai agar effect mein use ho.' },
      { text: 'Sirf functions — primitives nahi', correct: false, explanation: 'Primitives bhi dependencies hain — string, number, boolean sab.' },
    ],
  },
  {
    question: 'AbortController useEffect mein kyon use karte hain?',
    options: [
      { text: 'Fetch requests faster karne ke liye', correct: false, explanation: 'AbortController speed se related nahi.' },
      { text: 'Component unmount pe in-flight API call cancel karne ke liye — memory leaks avoid', correct: true, explanation: 'Bilkul! Unmount pe response aaye toh setState nahi call hoga — "setState on unmounted component" warning avoid.' },
      { text: 'CORS errors handle karne ke liye', correct: false, explanation: 'AbortController CORS se related nahi.' },
      { text: 'Multiple requests parallelize karne ke liye', correct: false, explanation: 'Promise.all parallel requests ke liye — AbortController cancellation ke liye.' },
    ],
  },
]

export default function ReactChapter7Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(6,182,212,0.06)',
          border: '1px solid rgba(6,182,212,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          useEffect — Side Effects Ka Sahi Tarika
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          useEffect React ka sabse misunderstood hook hai. Side effects — API calls, event listeners, timers, DOM updates — ye sab useEffect se handle hote hain. Dependency array, cleanup functions, infinite loops — sab samajhna zaroori hai production-grade code ke liye.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum useEffect ko depth mein cover karenge — har dependency array pattern, cleanup, aur famous bugs including infinite loop.
        </p>
      </div>

      <div id="side-effects">
        <ConceptCard
          title="Side Effects Kya Hain?"
          emoji="🌊"
          difficulty="intermediate"
          whatIsIt="Side effects wo operations hain jo React rendering se bahar jaate hain — network requests, DOM manipulation (direct), browser APIs (localStorage, geolocation), timers (setTimeout/setInterval), subscriptions (WebSocket, EventSource), logging. Pure rendering mein ye nahi hone chahiye — useEffect ke andar rakhte hain."
          whenToUse={[
            'Data fetch karna — API calls on mount ya dependency change',
            'Subscriptions — WebSocket, EventEmitter, pubsub',
            'Event listeners — global document/window listeners',
            'Document title update — browser tab mein',
          ]}
          whyUseIt="Side effects rendering ke bahar hote hain kyunki render pure honi chahiye — same props/state → same output. useEffect rendering ke baad run hota hai — browser paint ho chuka hai. Ye ensure karta hai UI fast render ho pehle, then side effects. Cleanup se memory leaks prevent hoti hain."
          howToUse={{
            filename: 'SideEffects.tsx',
            language: 'tsx',
            code: `import { useEffect, useState } from 'react'

// ── WHAT ARE SIDE EFFECTS ─────────────────────────────────────────

// ❌ Side effect in render — WRONG!
function BadComponent({ userId }: { userId: string }) {
  const [user, setUser] = useState(null)

  // This runs on EVERY render — bugs!
  fetch(\`/api/users/\${userId}\`).then(r => r.json()).then(setUser)

  return <div>{user?.name}</div>
}

// ✅ Side effect in useEffect — CORRECT!
function GoodComponent({ userId }: { userId: string }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(r => r.json())
      .then(setUser)
  }, [userId])  // Re-run when userId changes

  return <div>{user?.name}</div>
}

// ── COMMON SIDE EFFECTS ───────────────────────────────────────────

// 1. Document title
function PageWithTitle({ title }: { title: string }) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    return () => {
      document.title = previousTitle  // Restore on unmount
    }
  }, [title])

  return <main>Content...</main>
}

// 2. localStorage sync
function usePersistentState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState] as const
}

// 3. Analytics tracking
function ProductPage({ productId }: { productId: string }) {
  useEffect(() => {
    analytics.track('product_viewed', { productId })
    // No cleanup needed — one-time fire
  }, [productId])

  return <div>Product content...</div>
}`,
            explanation: 'Side effects render mein mat karo — useEffect mein karo. useEffect render ke baad run hota hai — UI fast. Cleanup function se resources release karo. Document title, localStorage, analytics — sab useEffect patterns.',
          }}
          realWorldScenario="Chat app: WebSocket connection useEffect mein open karo (on mount), messages receive karo (setState), component unmount pe (user navigates away) close karo — cleanup function. Bina cleanup: WebSocket open rehta hai, memory leak, stale messages."
          commonMistakes={[
            {
              mistake: 'Side effects directly in render function',
              why: 'Render pure honi chahiye — side effects har render pe run karte hain — bugs, performance issues.',
              fix: 'useEffect mein move karo with proper dependencies.',
            },
            {
              mistake: 'async function directly useEffect mein',
              why: 'useEffect async function accept nahi karta — Promise return nahi kar sakta. React cleanup function expect karta hai.',
              fix: 'IIFE: useEffect(() => { (async () => { await fn() })() }, []). Ya named async function inside.',
            },
          ]}
          proTip="React Query / TanStack Query useEffect-based data fetching replace karta hai — caching, refetching, loading/error states automatic. SWR bhi same. Production apps mein these libraries prefer karo manual useEffect fetch se — bahut less bugs."
        />
      </div>

      <div id="useeffect-basics">
        <ConceptCard
          title="useEffect Basics — Syntax aur When It Runs"
          emoji="⚙️"
          difficulty="intermediate"
          whatIsIt="useEffect(callback, deps) — callback side effect function, deps dependency array. Dependency array behavior: no array = every render, [] = only mount, [dep1, dep2] = when deps change. Cleanup function return karo — runs before next effect aur on unmount. React 18 Strict Mode mein development pe double-fire hota hai."
          whenToUse={[
            'Mount pe ek baar — [] dependency',
            'Specific value change pe — [value] dependency',
            'Har render pe — no dependency (rare)',
            'Cleanup zaroori ho — subscription, listener',
          ]}
          whyUseIt="useEffect lifecycle methods replace karta hai (componentDidMount, componentDidUpdate, componentWillUnmount) — ek hook teeno handle karta hai. Dependency array se fine-grained control — exactly kab run ho. Cleanup se resource management clean."
          howToUse={{
            filename: 'UseEffectBasics.tsx',
            language: 'tsx',
            code: `import { useEffect, useState } from 'react'

function UseEffectPatternsDemo() {
  const [count, setCount] = useState(0)
  const [userId, setUserId] = useState('1')

  // ── PATTERN 1: Run on mount only ─────────────────────────────────
  useEffect(() => {
    console.log('Component mounted!')
    initializeApp()

    return () => {
      console.log('Component unmounted — cleanup!')
      cleanupApp()
    }
  }, [])  // Empty array — mount/unmount only

  // ── PATTERN 2: Run when dependency changes ────────────────────────
  useEffect(() => {
    console.log(\`userId changed to: \${userId}\`)
    fetchUser(userId)
  }, [userId])  // Re-run when userId changes

  // ── PATTERN 3: Run on every render (rare!) ────────────────────────
  useEffect(() => {
    console.log(\`Rendered! count = \${count}\`)
    // No array — runs after every render
  })

  // ── PATTERN 4: Multiple dependencies ─────────────────────────────
  useEffect(() => {
    fetchFilteredData(userId, count)
  }, [userId, count])  // Run when either changes

  // ── CLEANUP DEMO ──────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)

    // Cleanup: clear timer before next run or unmount
    return () => {
      clearInterval(timer)
      console.log('Timer cleared!')
    }
  }, [])  // Setup once, cleanup on unmount

  // ── TIMING ────────────────────────────────────────────────────────
  // useEffect runs AFTER render + browser paint
  // useLayoutEffect runs AFTER render but BEFORE paint (rare)

  return <div>Count: {count}</div>
}

// ── ASYNC IN USEEFFECT ────────────────────────────────────────────
function AsyncEffect({ id }: { id: string }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ❌ Can't make useEffect async directly
    // async () => { ... }  — useEffect can't return Promise

    // ✅ Way 1: IIFE
    let cancelled = false

    ;(async () => {
      setLoading(true)
      try {
        const result = await fetchData(id)
        if (!cancelled) setData(result)  // Only set if not cancelled
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }  // Cancel on unmount
  }, [id])

  return loading ? <Spinner /> : <DataView data={data} />
}`,
            explanation: 'No array: every render. []: mount only. [dep]: when dep changes. Cleanup: before next effect run + on unmount. Async in useEffect: IIFE approach ya cancelled flag. React 18 Strict Mode development mein effects double-run karta hai — idempotent banao.',
          }}
          realWorldScenario="User profile page: useEffect([userId]) — userId change pe naya user fetch. Cleanup mein cancelled = true — agar user quickly navigates away, old userId fetch nahi set karta naye user pe. Clean race condition handling."
          commonMistakes={[
            {
              mistake: 'useEffect se async function directly return karna',
              why: 'useEffect expects cleanup function (or nothing) — Promise return karna unexpected behavior.',
              fix: 'IIFE pattern ya separate async function inside effect. useEffect(() => { const fn = async () => { await something() }; fn(); }, [])',
            },
            {
              mistake: 'useLayoutEffect overuse karna',
              why: 'useLayoutEffect synchronous hai — paint block karta hai. Performance issue.',
              fix: 'useEffect prefer karo 99% cases mein. useLayoutEffect sirf DOM measurement + sync paint update ke liye.',
            },
          ]}
          proTip="eslint-plugin-react-hooks ka exhaustive-deps rule enable karo — missing dependencies highlight hoti hain. tsconfig strict ke saath powerful combination. VSCode react-hooks extension se missing deps auto-suggest bhi hote hain."
        />
      </div>

      <div id="dependency-array">
        <ConceptCard
          title="Dependency Array Rules — Sab Honest Rakho"
          emoji="📝"
          difficulty="intermediate"
          whatIsIt="Dependency array mein sab values daalo jo effect ke andar use hoti hain — props, state, derived values, functions. Eslint rule yahi enforce karta hai. Dishonest deps — stale closures, bugs. Object/array deps — infinite loop risk (reference equality). Functions deps — useCallback se stabilize karo."
          whenToUse={[
            'Effect mein koi bhi reactive value use ho — dep array mein daalo',
            'Function dep — useCallback se memoize karo',
            'Object dep — specific properties use karo ya useMemo karo',
            'Primitive values — directly use karo as dep',
          ]}
          whyUseIt="Honest dependencies ensure karte hain effect latest values pe run kare. Stale closures se bugs hote hain — old value pe kaam, wrong behavior. Object/array reference change har render pe — infinite loop. Eslint rule automatic catch karta hai issues."
          howToUse={{
            filename: 'DependencyArray.tsx',
            language: 'tsx',
            code: `import { useEffect, useState, useCallback, useMemo } from 'react'

function DepsDemo() {
  const [userId, setUserId] = useState('1')
  const [filter, setFilter] = useState('active')

  // ── PRIMITIVE DEPS — Safe ─────────────────────────────────────────
  useEffect(() => {
    fetchUserData(userId, filter)
  }, [userId, filter])  // Primitives — reference stable

  // ── OBJECT DEP — INFINITE LOOP BUG ────────────────────────────────
  // ❌ This causes infinite loop!
  function BadComponent({ config }: { config: { timeout: number } }) {
    const [data, setData] = useState(null)

    useEffect(() => {
      fetchWithConfig(config.timeout).then(setData)
    }, [config])  // config object — new reference every render → loop!

    return <div>{JSON.stringify(data)}</div>
  }

  // ✅ Solution 1: Use specific primitive
  function FixedComponent({ config }: { config: { timeout: number } }) {
    const [data, setData] = useState(null)

    useEffect(() => {
      fetchWithConfig(config.timeout).then(setData)
    }, [config.timeout])  // Primitive — stable!

    return <div>{JSON.stringify(data)}</div>
  }

  // ✅ Solution 2: useMemo for objects
  function FixedComponent2({ userId, role }: { userId: string; role: string }) {
    const [data, setData] = useState(null)

    const params = useMemo(
      () => ({ userId, role }),
      [userId, role]  // Only recreate when primitives change
    )

    useEffect(() => {
      fetchData(params).then(setData)
    }, [params])  // params stable now

    return <div>{JSON.stringify(data)}</div>
  }

  // ── FUNCTION DEP — useCallback ────────────────────────────────────
  // ❌ Function dep without useCallback — re-creates every render
  function BadFunctionDep() {
    function fetchData() { /* ... */ }

    useEffect(() => {
      fetchData()
    }, [fetchData])  // New function every render — infinite loop!
  }

  // ✅ useCallback for stable function reference
  function GoodFunctionDep({ userId }: { userId: string }) {
    const fetchData = useCallback(async () => {
      const res = await fetch(\`/api/users/\${userId}\`)
      return res.json()
    }, [userId])  // Re-create only when userId changes

    useEffect(() => {
      fetchData().then(console.log)
    }, [fetchData])  // Stable reference — safe!
  }

  // ── THE STALE CLOSURE BUG ─────────────────────────────────────────
  function StaleClosureDemo() {
    const [count, setCount] = useState(0)

    // ❌ Missing dep — stale closure
    useEffect(() => {
      const timer = setInterval(() => {
        console.log('count is:', count)  // Always 0! Stale closure
        // setCount(count + 1)  // Always sets to 1!
      }, 1000)
      return () => clearInterval(timer)
    }, [])  // [] — effect sees initial count only

    // ✅ Functional update or add dep
    useEffect(() => {
      const timer = setInterval(() => {
        setCount(prev => prev + 1)  // Functional — always latest
      }, 1000)
      return () => clearInterval(timer)
    }, [])  // Still [] — functional update doesn't need dep!
  }

  return null
}`,
            explanation: 'Primitives safe deps — reference stable across renders. Objects har render pe new reference — infinite loop. Specific property use karo ya useMemo. Functions har render pe recreate — useCallback se stabilize. Stale closures — functional updates se avoid. eslint exhaustive-deps rule enable karo!',
          }}
          realWorldScenario="Data table mein filter object: const filters = { status, page, search }. Har render naya object — useEffect infinite loop. Fix: useEffect([status, page, search]) — individual primitives. Ya useMemo se stable object banana."
          commonMistakes={[
            {
              mistake: 'eslint exhaustive-deps warning ignore karna',
              why: 'Warning = potential bug. Stale closure se wrong data dikhega ya actions galat trigger honge.',
              fix: 'Warning fix karo — deps add karo. Ya useCallback/useMemo se stabilize karo. Disable mat karo.',
            },
            {
              mistake: 'Functions as deps without useCallback',
              why: 'Har render pe naya function reference — infinite loop ya unnecessary effect runs.',
              fix: 'Ek option: function ko effect ke andar move karo (no dep needed). Ya useCallback wrap karo.',
            },
          ]}
          proTip="useEffectEvent (experimental, React 19) solves stale closure problem elegantly — event handler inside effect use karo without adding to deps. Jab stable ho jaaye tab mainstream solution. Abhi: functional updates aur useCallback se manage karo."
        />
      </div>

      <div id="cleanup-function">
        <ConceptCard
          title="Cleanup Function — Memory Leaks Prevent Karo"
          emoji="🧹"
          difficulty="intermediate"
          whatIsIt="useEffect callback se function return karo — ye cleanup function hai. Cleanup tab call hoti hai: component unmount pe, ya next effect run se pehle (jab deps change hote hain). Event listeners, timers, WebSocket connections, Observables — sab cleanup karo. Bina cleanup: memory leaks, stale callbacks, ghost updates."
          whenToUse={[
            'Event listeners — document.addEventListener',
            'Timers — setInterval, setTimeout',
            'Subscriptions — WebSocket, EventEmitter',
            'Async requests — cancel on unmount',
          ]}
          whyUseIt="Cleanup se resources properly release hote hain. Unmounted component pe setState — React warning (memory leak). Event listener remain karta hai — callback stale reference hold karta hai — garbage collection nahi. Proper cleanup se app memory-efficient aur stable rehta hai."
          howToUse={{
            filename: 'Cleanup.tsx',
            language: 'tsx',
            code: `import { useEffect, useState } from 'react'

// ── EVENT LISTENER CLEANUP ────────────────────────────────────────
function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener('scroll', handleScroll)

    // CLEANUP — Remove listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])  // Once on mount

  return <div>Scroll: {scrollY}px</div>
}

// ── TIMER CLEANUP ─────────────────────────────────────────────────
function Countdown({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    if (remaining <= 0) return

    const timer = setTimeout(() => {
      setRemaining(r => r - 1)
    }, 1000)

    return () => clearTimeout(timer)  // Cancel pending timer
  }, [remaining])

  return <div>{remaining > 0 ? \`\${remaining}s remaining\` : 'Time\'s up!'}</div>
}

// ── WEBSOCKET CLEANUP ─────────────────────────────────────────────
function LiveUpdates({ channelId }: { channelId: string }) {
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const ws = new WebSocket(\`wss://api.example.com/channels/\${channelId}\`)

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data])
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    // CLEANUP — Close connection
    return () => {
      ws.close()
    }
  }, [channelId])

  return <ul>{messages.map((m, i) => <li key={i}>{m}</li>)}</ul>
}

// ── FETCH WITH ABORT CONTROLLER ───────────────────────────────────
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<null | { name: string }>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()  // Cancel mechanism

    async function fetchUser() {
      try {
        setLoading(true)
        const res = await fetch(\`/api/users/\${userId}\`, {
          signal: controller.signal,  // Attach abort signal
        })
        const data = await res.json()
        setUser(data)  // Only if not aborted
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          // Request was aborted — expected, not an error
          return
        }
        console.error('Fetch failed:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    // CLEANUP — Abort in-flight request
    return () => {
      controller.abort()
    }
  }, [userId])

  return loading ? <Spinner /> : <div>{user?.name}</div>
}

// ── INTERSECTION OBSERVER CLEANUP ─────────────────────────────────
function LazyImage({ src, alt }: { src: string; alt: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const imgRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = imgRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()  // One-time — stop observing after visible
      }
    })

    observer.observe(element)
    return () => observer.disconnect()  // CLEANUP
  }, [])

  return (
    <div ref={imgRef}>
      {isVisible ? <img src={src} alt={alt} /> : <div className="placeholder" />}
    </div>
  )
}`,
            explanation: 'return () => cleanup() pattern. addEventListener + removeEventListener. setInterval/setTimeout + clear. WebSocket open + close. AbortController + abort() — fetch cancel karo. IntersectionObserver disconnect. Cleanup next effect se pehle bhi call hoti hai — dep change pe.',
          }}
          realWorldScenario="Stock price ticker: WebSocket se live prices. User navigates to another page (component unmount) — cleanup closes WebSocket. Bina cleanup: WebSocket open, prices aate rehte hain, setState crash (component gone). Proper cleanup — professional behavior."
          commonMistakes={[
            {
              mistake: 'cleanup function return karna bhoolna',
              why: 'Memory leaks — event listeners accumulate, timers run indefinitely, WebSockets open.',
              fix: 'Har addEventListener ke saath removeEventListener cleanup. setInterval/setTimeout + clear. WebSocket + close.',
            },
            {
              mistake: 'Async cleanup function return karna',
              why: 'React expects synchronous cleanup — async return ignore hota hai.',
              fix: 'Cleanup synchronous honi chahiye. Agar async cleanup zaroori ho — cancelled flag use karo, cleanup mein sync cancel karo.',
            },
          ]}
          proTip="React 18 Strict Mode development mein effects twice run karte hain (mount → unmount → remount) — cleanup properly test hoti hai. Production mein once run hota hai. Ye design decision — cleanups test karna zaroori hai. Agar cleanup nahi hai, Strict Mode mein bugs visible ho jaate hain."
        />
      </div>

      <div id="common-patterns">
        <ConceptCard
          title="useEffect Patterns — Data Fetching, Titles, Listeners"
          emoji="🎯"
          difficulty="intermediate"
          whatIsIt="Common useEffect patterns: data fetching with loading/error states, document title update, global event listeners, outside click detection, media query watching, online/offline status. Ye sab patterns production mein daily use hote hain — master karo inhe."
          whenToUse={[
            'Data fetch hook banana — useUser, useProducts',
            'Global keyboard shortcuts — Escape key, Ctrl+K',
            'Outside click — modal/dropdown close karna',
            'Responsive hooks — useMediaQuery',
          ]}
          whyUseIt="Ye patterns reusable hooks mein abstract ho sakte hain — ek jagah likho, sab jagah use karo. Custom hooks useEffect wrap karte hain — component logic clean rehti hai. Production-proven patterns — edge cases already handled."
          howToUse={{
            filename: 'UseEffectPatterns.tsx',
            language: 'tsx',
            code: `import { useEffect, useState, useRef, useCallback } from 'react'

// ── PATTERN 1: Data Fetching Hook ─────────────────────────────────
function useData<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch(url, { signal: controller.signal })
      .then(r => r.ok ? r.json() : Promise.reject(new Error(\`HTTP \${r.status}\`)))
      .then(data => { setData(data); setLoading(false) })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}

// Usage:
// const { data: users, loading, error } = useData<User[]>('/api/users')

// ── PATTERN 2: Document Title ─────────────────────────────────────
function useDocumentTitle(title: string) {
  useEffect(() => {
    const prev = document.title
    document.title = title
    return () => { document.title = prev }
  }, [title])
}

// ── PATTERN 3: Outside Click ──────────────────────────────────────
function useOutsideClick(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [callback])  // callback should be stable (useCallback)
}

// Usage:
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setIsOpen(false), [])
  useOutsideClick(dropdownRef, close)

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <div className="dropdown-content">Content...</div>}
    </div>
  )
}

// ── PATTERN 4: Online/Offline Status ──────────────────────────────
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

// ── PATTERN 5: Media Query ────────────────────────────────────────
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)

    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}

// const isMobile = useMediaQuery('(max-width: 768px)')`,
            explanation: 'Custom hooks useEffect wrap karte hain — reusable. useData generic data fetching + loading/error. useOutsideClick modal/dropdown pattern. useOnlineStatus connectivity detect karta hai. useMediaQuery responsive JavaScript. Ye sab patterns custom hooks mein abstract karo — components clean.',
          }}
          realWorldScenario="Modal component: useOutsideClick(modalRef, closeModal) + useDocumentTitle('Dialog - App') + useEffect ke andar Escape key listener. Teeno useEffect patterns ek modal mein — professional behavior. User Escape press karo ya bahar click karo — modal closes."
          commonMistakes={[
            {
              mistake: 'Custom hook mein callback prop without useCallback',
              why: 'useOutsideClick(ref, callback) — callback har render pe new reference — effect infinite loop.',
              fix: 'Callers useCallback use karein. Ya hook mein useCallback se stabilize. eslint hook rules help karta hai.',
            },
            {
              mistake: 'Data fetching hook mein error boundary nahi',
              why: 'Unhandled errors component crash karte hain — no fallback UI.',
              fix: 'Error state expose karo. Callers error handle karein. Error boundary se wrap karo important sections.',
            },
          ]}
          proTip="usehooks.com aur ahooks library mein production-tested custom hooks available hain — useLocalStorage, useDebounce, useIntersection, useGeolocation, etc. Pehle dekhna — wheel reinvent mat karo. React Query, SWR data fetching hooks comprehensive solutions provide karte hain."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 7 Quiz — useEffect
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — React ka sabse tricky hook master karo!
          </p>
        </div>
        <QuizSection questions={effectQuiz} chapterSlug="useeffect" />
      </div>
    </div>
  )
}
