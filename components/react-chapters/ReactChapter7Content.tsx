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
          useEffect React ka sabse misunderstood hook hai — aur sabse zyada abuse bhi hota hai. Bahut log useEffect ko componentDidMount ka replacement samjhte hain. Ye sahi nahi hai. useEffect ka real purpose hai: React rendering ke bahar ki duniya ke saath synchronize karna. API calls, event listeners, timers, localStorage — ye sab React ke "outside" hain. useEffect bridge hai React world aur outside world ke beech.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein dependency array ke sab patterns, cleanup functions, infinite loop bugs, aur production-ready patterns — deep dive karte hain.
        </p>
      </div>

      <div id="side-effects">
        <ConceptCard
          title="Side Effects Kya Hain?"
          emoji="🌊"
          difficulty="intermediate"
          whatIsIt="Side effects kya hain? Wo koi bhi operation jo React ke rendering world ke bahar jaata hai. Network request — React world ke bahar. localStorage access — React world ke bahar. Document title change — React world ke bahar. Timer set karna — React world ke bahar. React rendering pure honi chahiye — same inputs, same output, no external effects. Side effects useEffect mein rakhte hain — rendering ke baad run hote hain."
          whenToUse={[
            'Data fetch karna — API calls on mount ya dependency change',
            'Subscriptions — WebSocket, EventEmitter, pubsub',
            'Event listeners — global document/window listeners',
            'Document title update — browser tab mein',
          ]}
          whyUseIt="Render mein side effect karne se kya problem hoti hai? Har render pe re-run hota hai — fetch render pe, fetch har state change pe — infinite loop. React Strict Mode development mein renders twice — side effects twice. useEffect render ke baad run karta hai — browser ne UI paint kar liya, phir side effects. UI always responsive rehti hai. Cleanup se resources properly release hote hain."
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
            explanation: 'Render mein fetch — infinite loop guarantee. useEffect mein fetch — sahi approach. useEffect render ke baad run karta hai, UI block nahi hoti. Cleanup function return karo jab resources release karne ho. Document title, localStorage sync, analytics — ye sab useEffect patterns hain. Har ek ke apne cleanup hain.',
          }}
          realWorldScenario="Chat application — user chat room mein join karta hai. WebSocket connection useEffect mein open karo (on mount). Messages aate hain — setState se update karo. User chat room se nikal jaata hai (component unmount) — cleanup mein WebSocket close karo. Bina cleanup: WebSocket open, server pe unnecessary connection, memory leak, stale updates. Cleanup = professional code."
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
          proTip="async function directly useEffect mein — React accept nahi karta. useEffect(() => async () => {}) — cleanup function expected hai, Promise return nahi. Ye common error hai. Solution: IIFE ya named async function inside useEffect. (async () => { await fn() })() — immediately invoked async function. Ye pattern production mein standard hai."
        />
      </div>

      <div id="useeffect-basics">
        <ConceptCard
          title="useEffect Basics — Syntax aur When It Runs"
          emoji="⚙️"
          difficulty="intermediate"
          whatIsIt="useEffect ka signature: useEffect(callback, dependencyArray). Dependency array ka behavior: array nahi diya — har render pe run. [] diya — sirf mount pe ek baar. [dep1, dep2] — jab dep1 ya dep2 change ho. Cleanup function return karo — next effect run se pehle aur unmount pe call hoti hai. React 18 Strict Mode mein development pe effects twice run karte hain — cleanup test ke liye design."
          whenToUse={[
            'Mount pe ek baar — [] dependency',
            'Specific value change pe — [value] dependency',
            'Har render pe — no dependency (rare)',
            'Cleanup zaroori ho — subscription, listener',
          ]}
          whyUseIt="Class components mein teen lifecycle methods the — componentDidMount, componentDidUpdate, componentWillUnmount. Functional components mein ek useEffect teeno handle karta hai. Lekin mindset shift karo — ye lifecycle methods nahi hain. useEffect = synchronize with external system. Kab synchronize karna hai? Dependency array batata hai. Kab cleanup karna hai? Return function se."
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
            explanation: 'Dependency array — teen patterns: no array (every render, rare), [] (mount once), [dep] (when dep changes). Cleanup function: next effect se pehle + unmount pe. Async in useEffect: IIFE pattern ya cancelled flag. Strict Mode double-run: idempotent effects banao — cleanup properly likho aur double-run se koi issue nahi hoga.',
          }}
          realWorldScenario="User profile page — useEffect([userId]). userId change pe naya user fetch. Race condition: quickly navigate karo User 1 se User 2 pe. User 1 ka fetch slow hai, User 2 ka pehle complete hota hai. Phir User 1 ka aata hai — User 1 data User 2 ke profile pe show hota hai. Fix: cancelled flag ya AbortController — old request ka response setState call nahi karta."
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
          proTip="useLayoutEffect overuse avoid karo. useLayoutEffect synchronous hai — render ke baad lekin browser paint se pehle run hota hai. Paint block karta hai — performance issue. 99% cases mein useEffect kaafi hai. useLayoutEffect sirf DOM measurement ke liye use karo — element ka size/position jaanna ho state change ke immediately baad, paint se pehle."
        />
      </div>

      <div id="dependency-array">
        <ConceptCard
          title="Dependency Array Rules — Sab Honest Rakho"
          emoji="📝"
          difficulty="intermediate"
          whatIsIt="Dependency array mein ek rule — honest raho. Effect ke andar jo bhi use karo — props, state, functions, objects — sab dependency array mein daalo. Eslint exhaustive-deps rule yahi check karta hai. Dishonest deps se stale closures — old values pe kaam, wrong behavior. Object aur array deps — reference equality check hoti hai — har render naya reference = infinite loop. Functions — useCallback se stabilize karo."
          whenToUse={[
            'Effect mein koi bhi reactive value use ho — dep array mein daalo',
            'Function dep — useCallback se memoize karo',
            'Object dep — specific properties use karo ya useMemo karo',
            'Primitive values — directly use karo as dep',
          ]}
          whyUseIt="Object dependency ka infinite loop mechanism samjho: useEffect([config]) mein config object. React reference equality check karta hai — {} === {} → false. Har render pe naya object literal → reference change → effect re-run → setState → re-render → naya object literal → loop. Solution: specific primitives use karo config.timeout, ya useMemo se stable object banana. Reference equality React ka core concept hai."
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
            explanation: 'Key patterns: primitive deps safe (number, string, boolean — same value = same reference). Object dep — infinite loop risk (new reference every render). Fix: config.timeout use karo ya useMemo. Function dep — useCallback se stabilize. Stale closure — functional update (prev =>) se avoid. eslint exhaustive-deps enable karo — automatic catch.',
          }}
          realWorldScenario="Data table mein filters: { status, page, search } object. useEffect([filters]) — har render naya object literal, infinite loop. Ye production bug hai jo dhundna bahut mushkil hota hai. Fix: useEffect([status, page, search]) — individual primitives. Ya: const stableFilters = useMemo(() => ({status, page, search}), [status, page, search]) phir useEffect([stableFilters])."
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
          proTip="eslint-plugin-react-hooks ka exhaustive-deps rule enable karo — ye rule missing dependencies highlight karta hai automatically. Warning ko ignore mat karo — har warning ek potential bug hai. Agar dependency add karne se infinite loop hota hai — toh problem dependency nahi, toh object/function stability ka issue hai. useCallback ya useMemo se stabilize karo."
        />
      </div>

      <div id="cleanup-function">
        <ConceptCard
          title="Cleanup Function — Memory Leaks Prevent Karo"
          emoji="🧹"
          difficulty="intermediate"
          whatIsIt="Cleanup function — useEffect ka woh part jo zyada log bhool jaate hain. Return karo ek function — ye cleanup hai. Kab call hoti hai? Component unmount pe — user navigate away gaya. Next effect run se pehle — dependency change hui, naya effect run hone se pehle purana cleanup. Event listeners register karoge bina remove kiye — memory leak. Timer set kiya bina clear kiye — ghost intervals. WebSocket open bina close kiye — server pe open connections piling up."
          whenToUse={[
            'Event listeners — document.addEventListener',
            'Timers — setInterval, setTimeout',
            'Subscriptions — WebSocket, EventEmitter',
            'Async requests — cancel on unmount',
          ]}
          whyUseIt="Cleanup ki zaroorat kyun hai? Browser memory finite hai. Event listeners agar remove nahi kiye — accumulate hote hain. Timer agar clear nahi kiya — background mein run karta rehta hai, unmounted component pe setState call karta hai — React warning. WebSocket bina close kiye — server pe resources waste. Professional React code mein har useEffect mein ya toh cleanup hai ya clearly documented reason hai kyun zaroorat nahi."
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
            explanation: 'Har resource apna cleanup pattern jaanta hai: addEventListener → removeEventListener. setInterval → clearInterval. setTimeout → clearTimeout. WebSocket → ws.close(). fetch → AbortController.abort(). IntersectionObserver → observer.disconnect(). Pattern: setup in effect body, cleanup in return function. Ye pairs yaad karo — production code mein daily use.',
          }}
          realWorldScenario="Stock market ticker — live prices WebSocket se aate hain. User portfolio page se navigate karke settings mein jaata hai. Component unmount hota hai. Cleanup mein ws.close() — WebSocket close hota hai, server connection free. Bina cleanup: WebSocket open rehta hai, prices aate rehte hain, setState call hoti hai unmounted component pe — React warning, potential memory leak. App eventually sluggish hoti hai."
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
          proTip="React 18 Strict Mode development mein effects deliberately twice run karte hain. Ye feature hai, bug nahi. React tumhara cleanup test kar raha hai. mount → cleanup → remount — agar cleanup properly likhа hai toh second mount correctly work karega. Agar Strict Mode mein bugs aate hain — cleanup mein issue hai. Production mein once run hota hai — Strict Mode development health check hai."
        />
      </div>

      <div id="common-patterns">
        <ConceptCard
          title="useEffect Patterns — Data Fetching, Titles, Listeners"
          emoji="🎯"
          difficulty="intermediate"
          whatIsIt="useEffect patterns ko custom hooks mein abstract karo — ye React ka power move hai. useData, useDocumentTitle, useOutsideClick, useOnlineStatus, useMediaQuery — ye sab custom hooks hain jo useEffect wrap karte hain. Component logic clean rehti hai — sirf hook call karo, implementation details hidden. Ek baar likho, poori app mein use karo. Ye custom hooks React ka best practice hai."
          whenToUse={[
            'Data fetch hook banana — useUser, useProducts',
            'Global keyboard shortcuts — Escape key, Ctrl+K',
            'Outside click — modal/dropdown close karna',
            'Responsive hooks — useMediaQuery',
          ]}
          whyUseIt="Custom hooks ka fayda real-world mein: useOutsideClick ek baar likho — dropdown, modal, tooltip — sab components use karein. useOnlineStatus ek baar — poori app mein. Edge cases ek jagah handle — AbortController, cleanup, Strict Mode compatibility sab ek jagah. Components mein sirf useData('/api/users') — implementation concern nahi, result concern hai."
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
            explanation: 'Custom hook = use se shuru hone wala function jo React hooks call kare. Ek mental model: React ne tumhe tools diye (useState, useEffect), tum unse apne tools bana sakte ho (useData, useOutsideClick). useData AbortController se fetch cancel karta hai. useOutsideClick ref + document listener pattern. useOnlineStatus online/offline events track karta hai. Ye sab wrappers hain, magic nahi.',
          }}
          realWorldScenario="Professional modal component — useOutsideClick(modalRef, closeModal), useDocumentTitle('Modal Open - App'), aur Escape key listener useEffect mein. Teen custom hooks, ek clean component. User Escape dabaye — modal close. Bahar click kare — modal close. Tab title change ho — context pata chale. Ye UX polish hai jo custom hooks se easily milti hai."
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
          proTip="Production apps mein manual useEffect data fetching avoid karo — React Query (TanStack Query) ya SWR use karo. Ye libraries caching, background refetching, loading/error states, optimistic updates sab automatically handle karti hain. useData hook khud likhna — caching nahi, refetching nahi. React Query — sab built-in. Ye investment worthwhile hai production apps mein — less bugs, better UX."
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
