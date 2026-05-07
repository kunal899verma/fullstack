'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

export default function ReactChapter10Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Custom Hooks — React Ka Sabse Underrated Superpower
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ek shocking baat — tum pehle se custom hooks use kar rahe ho. useAuth, useFetch, useDebounce — ye sab custom hooks hain. Lekin kya tum khud bana sakte ho? Yahan log ruk jaate hain. Aur yahi mistake hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Custom Hook sirf ek JavaScript function hai jiska naam <code className="text-[#F59E0B] bg-[rgba(245,158,11,0.15)] px-1.5 py-0.5 rounded text-sm">use</code> se shuru hota hai aur andar React hooks use karta hai. Bas itna hi definition. Lekin is simplicity mein infinite power hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Socho — 10 components mein same fetch + loading + error pattern. Ek bug fix karo — 10 jagah fix karna padega. Custom hook banao — ek jagah fix, sab theek. DRY principle React mein custom hooks se implement hota hai.
        </p>
      </div>

      <div id="custom-hook-intro">
        <ConceptCard
          title="Custom Hook Kya Hai?"
          emoji="🎣"
          difficulty="intermediate"
          whatIsIt="Custom Hook ke andar kya hota hai? Kuch special nahi — bas ek function jo React hooks call karta hai. React ka rule — hooks sirf function components ya other hooks mein call ho sakte hain. Toh ek function mein useState, useEffect, useRef — sab call karo. Naam 'use' se shuru karo — yahi React ESLint rules ko hint deta hai ki ye hook hai, component nahi. Aur bas — custom hook ready hai. React internally kuch alag nahi karta — same hook rules, same call order requirement."
          whenToUse={[
            'Same stateful logic multiple components mein repeat ho raha ho',
            'Component bahut bada ho jaaye — logic extract karo',
            'Side effects (API calls, event listeners, subscriptions) encapsulate karne ho',
            'Logic ko independently test karna ho bina UI ke',
          ]}
          whyUseIt="Ek concrete example — useFetch banao. 50 components mein useFetch('/api/...') use karo. Ek din race condition bug fix karni ho — cancelled flag — sirf useFetch.ts file mein fix karo. Sab 50 components automatically fixed. Bina custom hook: har component mein manually fix karo. Real world mein ye fark massive hota hai."
          howToUse={{
            filename: 'useWindowSize.ts',
            language: 'typescript',
            code: `// Custom hook — naam 'use' se shuru karo
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handler = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)  // Cleanup
  }, [])  // Empty array — sirf mount/unmount par

  return size  // { width, height }
}

// Component mein use karo
function MyComponent() {
  const { width, height } = useWindowSize()
  return <p>Window: {width} x {height}</p>
}`,
            explanation: "Step by step trace karo — useWindowSize call hota hai, useState initial size se. useEffect chalti hai — event listener add hota hai. Resize hota hai — handler chalta hai, setSize call hoti hai — component re-render. Cleanup — unmount pe event listener remove. Component ko ye sab kuch pata nahi — sirf { width, height } milti hai. Ye abstraction magic hai.",
          }}
          realWorldScenario="Production SaaS mein — har dashboard pe user permission check karna padta tha: const user = useAuth(); const canAccess = user.permissions.includes('billing'). 20 components mein repeat. usePermissions() banaya — const { hasAccess } = usePermissions(); hasAccess('billing'). Ek din permission logic change hua — sirf usePermissions.ts update kiya. Sab 20 components automatically correct."
          commonMistakes={[
            {
              mistake: "Hook ka naam 'use' se shuru nahi karna",
              why: "React hooks rules sirf 'use' prefix waale functions par apply hote hain. Bina prefix ke React warnings aur bugs aate hain.",
              fix: "Hamesha 'use' se shuru karo: useData, useAuth, useForm — kabhi getUser ya fetchData nahi.",
            },
            {
              mistake: 'Hook ko conditional code ke andar call karna',
              why: 'Hooks hamesha same order mein call hone chahiye. Conditional hooks React ke internal state tracking ko break karte hain.',
              fix: 'Hook ko component ke top level par call karo. Andar condition check karo: const data = useData(); if (!data) return null;',
            },
          ]}
          proTip="Return type design carefully karo — ye public API hai aapke hook ka. Single value? Seedha return karo — return size. Array? Jab order matter kare aur consumer rename karna chahta ho — [value, setValue] like useState. Object? Jab multiple named values hon aur consumer specific ones pick kare — { data, loading, error }. Rule of thumb: agar hook useState jaisi feel chahiye — array. Agar hook zyada values de — object."
        />
      </div>

      <div id="use-fetch">
        <ConceptCard
          title="useFetch — Data Fetching Hook"
          emoji="🌐"
          difficulty="intermediate"
          whatIsIt="useFetch ek classic custom hook hai — har React developer pehli baar yahi banata hai. Andar kya hota hai? useState se data, loading, error track karo. useEffect se fetch karo jab url change ho. cancelled flag — race condition fix. Ye pattern itna common hai ki TanStack Query internally isse far zyada sophisticated version implement karta hai. Ye hook banana samajh deta hai React Query ke behind-the-scenes ko."
          whenToUse={[
            'Multiple components mein same API patterns repeat ho rahe hain',
            'Simple projects ke liye TanStack Query install avoid karna ho',
            'Custom caching ya retry logic chahiye',
            'Learning ke liye — server state management ka foundation samajhna',
          ]}
          whyUseIt="Bina useFetch ke har component yahi likhega: const [data, setData] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(null); useEffect(() =&gt; { fetch(url)... }, [url]). Aur race condition bug? Har jagah alag. useFetch: ek baar theek likho, sab jagah correct behaviour."
          howToUse={{
            filename: 'useFetch.ts',
            language: 'typescript',
            code: `import { useState, useEffect } from 'react'

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false  // Race condition fix
    setLoading(true)

    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(\`HTTP \${r.status}\`)
        return r.json() as Promise<T>
      })
      .then(d => { if (!cancelled) setData(d) })
      .catch(e => { if (!cancelled) setError(e as Error) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }  // Cleanup
  }, [url])  // Re-fetch jab url change ho

  return { data, loading, error }
}

// Usage
function UserCard({ userId }: { userId: string }) {
  const { data, loading, error } = useFetch<User>(\`/api/users/\${userId}\`)
  if (loading) return <Spinner />
  if (error) return <Error message={error.message} />
  return <div>{data?.name}</div>
}`,
            explanation: "Race condition trace karo — user product A ka page kholta hai, fetch start. User fast product B pe jaata hai, component unmount. A ka fetch complete hota hai, callback chalti hai — setData(A_data) — lekin cancelled = true hai! Skip. Bina cancelled flag: A ka data B ke page pe flash karta — visible bug. cancelled flag ye fix karta hai. Simple boolean, powerful fix.",
          }}
          realWorldScenario="E-commerce product detail page — user rapidly products browse karta hai. useFetch('/api/products/' + id) — id change hote hi naya fetch. Cancelled flag ensure karta hai ki purana fetch ka data naye product pe nahi aata. Bina cancelled: laptop ka price phone pe flash karta — embarrassing UX bug."
          commonMistakes={[
            {
              mistake: 'cancelled flag use nahi karna',
              why: 'Agar component unmount ho jaaye aur fetch complete ho toh state update attempt hota hai — React warning: "Can\'t perform state update on unmounted component".',
              fix: 'Hamesha cleanup function mein cancelled = true set karo aur har setState se pehle if (!cancelled) check karo.',
            },
            {
              mistake: 'url ko dependency array se bahar rakhna',
              why: 'Stale closure — hook old url ko use karta rehega, naya nahi fetch karega.',
              fix: 'useEffect([url]) mein url include karo. Agar object pass karna ho toh useMemo se memoize karo.',
            },
          ]}
          proTip="Production mein AbortController use karo — cancelled flag se bhi powerful. const controller = new AbortController(); fetch(url, { signal: controller.signal }). Cleanup: controller.abort() — sirf React state update nahi rokta, actually network request bhi cancel hoti hai! Mobile users ke liye particularly important — bandwidth waste nahi hoti. ye upgrade ek line ka hai."
        />
      </div>

      <div id="use-local-storage">
        <ConceptCard
          title="useLocalStorage — Persistent State"
          emoji="💾"
          difficulty="intermediate"
          whatIsIt="Interesting question — localStorage directly use kyon nahi karo? Three problems: 1) React se sync nahi hoti — value change karo, component re-render nahi hoga. 2) Raw strings — JSON.stringify/parse manually karna padta hai. 3) SSR mein window undefined hai — crash. useLocalStorage ye teeno problems solve karta hai. useState ki API exactly — lekin value persist hoti hai. Lazy initializer se SSR safe. try/catch se private browsing handle. TypeScript generics se type safety."
          whenToUse={[
            'User preferences — dark mode, language, font size, layout preference',
            'Form draft data — user reload kare toh kaam lost na ho',
            'Shopping cart bina server ke persist karna',
            'Onboarding progress, tutorial state, seen banners',
          ]}
          whyUseIt="useState: memory mein — refresh pe gone. localStorage: persist hai lekin React nahi jaanta. useLocalStorage: dono ka best. API useState jaisi — destructure karo, update karo, React automatically re-render karta hai. Persistent state aur React state ek hi hook se."
          howToUse={{
            filename: 'useLocalStorage.ts',
            language: 'typescript',
            code: `import { useState, useEffect } from 'react'

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    // Lazy initializer — sirf pehli baar run hoga
    try {
      const stored = localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage full ya private mode
    }
  }, [key, value])

  return [value, setValue] as const  // useState jaisi API
}

// Usage — bilkul useState ki tarah
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark')
  return (
    <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '🌙' : '☀️'} {theme}
    </button>
  )
}`,
            explanation: "Lazy initializer kyon? () =&gt; { ... } function pass karo useState ko — sirf pehli baar execute hoga. Agar seedha localStorage.getItem() pass karo toh har render pe execute hoga — expensive operation. Lazy = once. try/catch kyon? Private browsing mein localStorage disabled hoti hai — error aata hai. try/catch se graceful fallback. as const — TypeScript ko tuple type force karo, warna array type infer karta hai.",
          }}
          realWorldScenario="Learning platform — har chapter complete karne pe useLocalStorage('completedChapters', []) mein ID push karo. Reload karo — progress bar same position pe. Ek hafte baad aao — progress wahin se. Server call nahi, database nahi — simple localStorage magic. Users love this."
          commonMistakes={[
            {
              mistake: 'SSR (Next.js) mein localStorage directly access karna',
              why: 'Server par window object nahi hota — localStorage is not defined error aata hai.',
              fix: 'useState initializer ko lazy function mein wrap karo aur typeof window !== "undefined" check karo: const stored = typeof window !== "undefined" ? localStorage.getItem(key) : null.',
            },
            {
              mistake: 'Complex objects ko bina JSON.stringify/parse ke store karna',
              why: 'localStorage sirf strings store karta hai — object directly store karne se "[object Object]" save hota hai.',
              fix: 'Hamesha JSON.stringify save karte waqt aur JSON.parse read karte waqt use karo — useLocalStorage hook ye automatically handle karta hai.',
            },
          ]}
          proTip="Ek advanced feature — multiple browser tabs sync! window 'storage' event tab se baahri changes detect karta hai. useEffect mein: window.addEventListener('storage', handler). Tab 1 mein theme dark karo — Tab 2 automatically light ho jaayega. Real-time cross-tab sync — zero WebSockets, zero server. Users wonder karte hain kaise ho raha hai — simple browser API hai."
        />
      </div>

      <div id="use-debounce">
        <ConceptCard
          title="useDebounce — Debounced Value Hook"
          emoji="⏱️"
          difficulty="intermediate"
          whatIsIt="Debounce ka concept samjho pehle — user 'react hooks' type karta hai. r-e-a-c-t (space) h-o-o-k-s — 12 keystrokes, 12 API calls. Server ko ye kab chahiye? Sirf jab user ruk jaaye! Debounce bolta hai: 'delay ke baad agar koi change nahi aaya — toh execute karo.' useDebounce hook rapidly changing value ko delayed stable value mein convert karta hai. Andar: har value change pe setTimeout reset hota hai — sirf last change ke baad delay complete hone pe update hota hai."
          whenToUse={[
            'Search input — user ke type karne par API calls dramatically reduce karo',
            'Window resize pe expensive recalculations delay karo',
            'Server-side form validation — field se leave hone par check karo',
            'Auto-save feature — user ruke toh save, har keystroke pe nahi',
          ]}
          whyUseIt="Math karo — user 'nodejs tutorial' type karta hai. 15 characters = 15 API calls. 300ms debounce ke saath: sirf 1 API call (jab user ruk jaaye). Server pe 14 unnecessary requests eliminated. Database queries, cost, response time — sab improve hota hai. Ye optimization ek hook se hoti hai."
          howToUse={{
            filename: 'useDebounce.ts',
            language: 'typescript',
            code: `import { useState, useEffect } from 'react'

function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup — pichla timer cancel karo
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Search component mein use karo
function SearchBox() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)

  // Ye effect sirf tab chalega jab user 400ms ke liye ruk jaaye
  useEffect(() => {
    if (debouncedQuery) {
      fetch(\`/api/search?q=\${debouncedQuery}\`)
        .then(r => r.json())
        .then(setResults)
    }
  }, [debouncedQuery])

  return <input value={query} onChange={e => setQuery(e.target.value)} />
}`,
            explanation: "Mechanism trace karo — user 'r' type karta hai, setTimeout(400ms) set hota hai. User 'e' type karta hai — clearTimeout! Naya setTimeout(400ms). Ye pattern repeat hota rehta hai. User ruk jaata hai 400ms ke liye — setTimeout fires — setDebouncedValue('react'). Effect runs — API call. Clean, elegant, effective.",
          }}
          realWorldScenario="GitHub code search, Google search, Notion content search — sab debounce use karte hain. Tum type karte rehte ho, results 300-500ms ke baad aate hain. Ye intentional hai, not lag. User ruk jaata hai — results aate hain. Typing ke dauraan server pe zero requests. Real apps mein ye server cost kaafi reduce karta hai."
          commonMistakes={[
            {
              mistake: 'useDebounce ke bina directly useEffect mein delay add karna',
              why: 'setTimeout andar useEffect tricky hai — cleanup theek se nahi hoti aur multiple timers queue ho jaate hain.',
              fix: 'useDebounce hook use karo jo cleanup properly handle karta hai. Debounced value ko useEffect dependency mein daalo.',
            },
            {
              mistake: 'Debounce delay bahut zyada ya bahut kam rakhna',
              why: '100ms delay barely helpful hai, 2000ms delay frustrating UX deta hai.',
              fix: 'Search ke liye 300-500ms standard hai. Auto-save ke liye 1000-2000ms theek hai. User testing se optimize karo.',
            },
          ]}
          proTip="Debounce aur Throttle confuse mat karna. Debounce: 'ruk jaane ke baad execute karo.' Throttle: 'har N ms mein sirf ek baar execute karo.' Search ke liye debounce perfect hai. Scroll events ke liye throttle better hai — debounce se scroll handler kabhi nahi chalega jab tak user scroll rokta nahi! usehooks-ts library mein dono ready-made hai — production mein edge cases handle karte hain."
        />
      </div>

      <div id="hook-composition">
        <ConceptCard
          title="Hook Composition — Hooks Ka Hook"
          emoji="🧩"
          difficulty="intermediate"
          whatIsIt="Ab ye mind-blowing hai — hooks ke andar hooks! useSearchResults hook banao jo internally useDebounce aur useFetch dono use kare. Component ko kuch nahi pata — sirf query deta hai, results milta hai. Ye layered abstraction hai. React mein UI compose hoti hai components se, logic compose hota hai hooks se. Same philosophy, alag layer. Ek hook ek concern — teeno milke powerful feature."
          whenToUse={[
            'Ek hook bahut complex ho jaaye — break karo smaller hooks mein',
            'Multiple hooks ka combination baar baar repeat ho raha ho',
            'Testing ke liye logic granular rakhna ho',
            'Team ke liye shared utility hooks banana ho',
          ]}
          whyUseIt="Composition ka power — useSearchResults = useDebounce + useFetch. Component: const { data, loading } = useSearchResults(query). Ek line. Debouncing kab hoti hai? Pata nahi component ko. Fetch kaise hoti hai? Pata nahi. Race conditions? Handled. Ye clean API hai. Component ka kaam sirf UI dikhana hai — logic hooks mein."
          howToUse={{
            filename: 'useSearchResults.ts',
            language: 'typescript',
            code: `// Base hooks
function useDebounce<T>(value: T, delay = 500): T {
  const [deb, setDeb] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDeb(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return deb
}

function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!url) return
    let cancelled = false
    setLoading(true)
    fetch(url)
      .then(r => r.json() as Promise<T>)
      .then(d => { if (!cancelled) setData(d) })
      .catch(e => { if (!cancelled) setError(e as Error) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [url])

  return { data, loading, error }
}

// Composed hook — hooks use karta hai hooks
function useSearchResults(query: string) {
  const debouncedQuery = useDebounce(query, 400)
  const url = debouncedQuery
    ? \`/api/search?q=\${encodeURIComponent(debouncedQuery)}\`
    : null
  return useFetch<SearchResult[]>(url)
}

// Component: ek line se complex behavior
function SearchPage() {
  const [query, setQuery] = useState('')
  const { data, loading, error } = useSearchResults(query)
  // ...
}`,
            explanation: "Layers trace karo — SearchPage: useSearchResults call karta hai query ke saath. useSearchResults: useDebounce call karta hai (400ms wait). useDebounce: debounced query return karta hai. useSearchResults: useFetch call karta hai null ya url ke saath. useFetch: actual fetch, cancelled flag, states return. SearchPage ko ye chain bilkul nahi pata — sirf clean interface.",
          }}
          realWorldScenario="useAuth hook — internally useLocalStorage (token persist), useEffect (server pe token validate), useState (user object). Bahar: const { user, login, logout, isLoading } = useAuth(). Teen hooks compose karke ek powerful abstraction. Koi bhi consumer ko implementation details nahi pata — sirf clean API."
          commonMistakes={[
            {
              mistake: 'Ek hook mein bahut zyada responsibility daalna',
              why: 'God hook — jab ek hook 200 lines ka ho jaaye toh testing aur debugging nightmare ban jaata hai.',
              fix: 'Single Responsibility follow karo. Ek hook — ek kaam. Phir compose karo. useUser = useAuth + useProfile zaroori nahi, alag rakh sakte hain.',
            },
            {
              mistake: 'Hooks ko conditionally call karna composition mein',
              why: 'Hook rules violate hoti hain — React internal hook order maintain karta hai aur conditional hooks isko break karte hain.',
              fix: 'Hook call always top level par. Value pass karo jo internally check kare — jaise useFetch(null) url null hone par kuch na kare.',
            },
          ]}
          proTip="Custom hooks test karna bahut clean hai — @testing-library/react ka renderHook. const { result } = renderHook(() =&gt; useDebounce('hello', 300)). Jest fake timers: jest.useFakeTimers(). act(() =&gt; jest.advanceTimersByTime(300)) — time forward karo artificially. expect(result.current).toBe('hello'). UI ke bina hook test karo — unit tests clean aur fast. Ye pattern sab custom hooks pe apply hota hai."
        />
      </div>
    </div>
  )
}
