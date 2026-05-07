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
          Custom Hooks — Logic Reuse Ka Sahi Tarika
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Jab tum baar baar same logic alag-alag components mein likhte ho — jaise API call, localStorage access, ya debounce — toh Custom Hooks tumhare savior hain. Ek baar likho, har jagah use karo. React ka sabse powerful feature.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Custom Hook ek normal JavaScript function hai jiska naam <code className="text-[#F59E0B] bg-[rgba(245,158,11,0.15)] px-1.5 py-0.5 rounded text-sm">use</code> se shuru hota hai aur andar React hooks use karta hai. Bas itna hi. Simple concept, powerful result.
        </p>
      </div>

      <div id="custom-hook-intro">
        <ConceptCard
          title="Custom Hook Kya Hai?"
          emoji="🎣"
          difficulty="intermediate"
          whatIsIt="Custom Hook ek JavaScript function hai jo React ke built-in hooks (useState, useEffect, etc.) ko use karta hai aur uss logic ko reusable banata hai. Naam 'use' se shuru hona zaroori hai — yahi React ko bataata hai ki ye ek hook hai, component nahi."
          whenToUse={[
            'Jab same stateful logic multiple components mein repeat ho raha ho',
            'Jab koi component bahut bada ho jaaye — logic alag karo',
            'Jab side effects (API calls, subscriptions) ko encapsulate karna ho',
            'Jab logic ko independently test karna ho',
          ]}
          whyUseIt="Custom hooks se code DRY (Don't Repeat Yourself) rehta hai. Ek baar useFetch likhdo — 50 components mein use karo, bug fix bhi sirf ek jagah karo. Plus, logic aur UI alag rehte hain — code clean aur testable rehta hai."
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
            explanation: "Ye hook window resize event ko listen karta hai aur current size return karta hai. Cleanup function event listener hata deta hai jab component unmount ho — memory leak prevent hota hai. Component mein sirf ek line: const { width } = useWindowSize().",
          }}
          realWorldScenario="Sequifi jaisi SaaS app mein tumhe multiple dashboards mein user permission check karni hoti hai — usePermissions() custom hook likho jo current user ke roles check kare aur hasAccess boolean return kare. 20 components mein ek line — usePermissions().hasAccess('billing')."
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
          proTip="Custom hooks mein return value sochke design karo. Simple value return karo agar sirf ek cheez chahiye. Array return karo jab order matter kare (useState pattern). Object return karo jab multiple named values chahiye — { data, loading, error }."
        />
      </div>

      <div id="use-fetch">
        <ConceptCard
          title="useFetch — Data Fetching Hook"
          emoji="🌐"
          difficulty="intermediate"
          whatIsIt="useFetch ek custom hook hai jo API calls ke liye loading, error, aur data states manage karta hai. Ye pattern itna common hai ki har React app mein kisi na kisi form mein hota hai — TanStack Query bhi internally kuch aisa hi karta hai."
          whenToUse={[
            'Multiple components mein same API patterns use ho rahe hain',
            'TanStack Query install nahi karna simple projects ke liye',
            'Custom caching ya retry logic chahiye',
            'Learning purpose — server state management samajhna',
          ]}
          whyUseIt="Bina useFetch ke har component mein useState + useEffect repeat hota hai. useFetch ye boilerplate hide karta hai. Plus, cancelled flag race conditions se bachata hai — jab component unmount ho jaaye toh purani response state update na kare."
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
            explanation: "cancelled flag ensure karta hai ki agar component unmount ho jaaye toh state update na ho — warna React warning aati hai. Generic <T> se TypeScript type safety milti hai. url dependency array mein hai — url change hote hi refetch hota hai.",
          }}
          realWorldScenario="E-commerce app mein product details page mein product ID change hoti hai — useFetch('/api/products/' + id) automatically re-fetch karta hai jab user alag product page par jaata hai, cancelled flag ensure karta hai ki puraani response nahi aati."
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
          proTip="Production mein useFetch ko AbortController se enhance karo: const controller = new AbortController(); fetch(url, { signal: controller.signal }). Cleanup mein controller.abort() call karo — cancelled flag se bhi better, actually in-flight request cancel hoti hai."
        />
      </div>

      <div id="use-local-storage">
        <ConceptCard
          title="useLocalStorage — Persistent State"
          emoji="💾"
          difficulty="intermediate"
          whatIsIt="useLocalStorage ek custom hook hai jo useState ki tarah kaam karta hai — lekin state localStorage mein persist hoti hai. Page refresh karne par bhi state bani rehti hai. Theme, user preferences, cart data — sab kuch persist karne ke liye perfect."
          whenToUse={[
            'User preferences save karni hain — dark mode, language, font size',
            'Form data partially save karna ho taaki user reload pe lose na kare',
            'Shopping cart persist karni ho bina server se',
            'Authentication token store karna ho (lekin httpOnly cookies prefer karo sensitive data ke liye)',
          ]}
          whyUseIt="useState sirf memory mein rehta hai — refresh karne par gone. localStorage persist karta hai but raw strings store karta hai — JSON parse/stringify manually karna padta hai. useLocalStorage dono combine karta hai: React-style API + persistence. Best of both worlds."
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
            explanation: "Lazy initializer (function in useState) SSR safe hai — server par localStorage undefined hoti hai. try/catch localStorage errors handle karta hai (private browsing, full storage). as const se TypeScript correct tuple type infer karta hai.",
          }}
          realWorldScenario="NodeMaster jaisi app mein user ka chapter progress store karna — useLocalStorage('progress', {}) se har chapter complete mark hota hai aur reload ke baad bhi progress bani rehti hai."
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
          proTip="Multiple tabs sync karne ke liye window 'storage' event listen karo: window.addEventListener('storage', e => { if (e.key === key) setValue(JSON.parse(e.newValue)) }). Ab ek tab mein change hone par dusre tabs bhi update ho jaate hain."
        />
      </div>

      <div id="use-debounce">
        <ConceptCard
          title="useDebounce — Debounced Value Hook"
          emoji="⏱️"
          difficulty="intermediate"
          whatIsIt="useDebounce ek hook hai jo rapidly changing value ko delay karne ke baad return karta hai. Jab user type karta hai toh har keystroke par API call nahi honi chahiye — sirf tabb jab user ruk jaaye. Ye hi debouncing hai aur useDebounce ise simple banata hai."
          whenToUse={[
            'Search input mein — user ke type karne par API calls reduce karo',
            'Window resize pe expensive recalculations delay karo',
            'Form validation jo server-side check kare',
            'Auto-save feature — user ruke toh save ho',
          ]}
          whyUseIt="Bina debounce ke search mein har keystroke API call trigger karta hai — agar user 'react hooks' type kare toh 12 API calls! Debounce se sirf ek call hogi. Server load km, faster UI, better UX."
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
            explanation: "Har value change par pichla setTimeout cancel hota hai aur naya set hota hai. Sirf jab delay milliseconds tak koi change na aaye, debouncedValue update hota hai. Cleanup function (clearTimeout) ensure karta hai ki stale timers execute na hon.",
          }}
          realWorldScenario="GitHub ki code search mein debounce use hota hai — tum type karte rehte ho aur search results sirf tab update hote hain jab tum 300-500ms ke liye ruk jaate ho. Is se server load dramatically kam hota hai."
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
          proTip="useDebounce ke saath useCallback bhi use karo agar value function hai. Aur agar tumhe immediate execution chahiye pehli baar (leading edge debounce) toh lodash.debounce({ leading: true }) use karo — custom implement karna complex hai."
        />
      </div>

      <div id="hook-composition">
        <ConceptCard
          title="Hook Composition — Hooks Ka Hook"
          emoji="🧩"
          difficulty="intermediate"
          whatIsIt="Hook composition matlab ek custom hook ke andar doosre custom hooks use karna. useSearchResults hook use karta hai useDebounce + useFetch. Ye layered abstraction hai — har hook ek concern handle karta hai, compose karke powerful features bante hain."
          whenToUse={[
            'Jab ek hook ki complexity bahut badh jaaye — break karo chhote hooks mein',
            'Jab multiple hooks ka combination baar baar use ho',
            'Jab testing ke liye logic granular rakhna ho',
            'Team mein shared utility hooks banana ho',
          ]}
          whyUseIt="Composition React ka core philosophy hai — UI mein components compose hote hain, logic mein hooks compose hote hain. Har hook single responsibility follow karta hai. Testable, maintainable, readable code milta hai."
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
            explanation: "useSearchResults ek simple interface expose karta hai lekin andar do hooks compose karta hai. Component ko debounce ya fetch ki complexity nahi pata — sirf query deta hai, results leta hai. Ye separation of concerns ka perfect example hai.",
          }}
          realWorldScenario="Auth context hook — useAuth internally useLocalStorage (token persist karna), useEffect (token validate karna server par), aur useState (user object) — teeno compose karke ek clean API: const { user, login, logout } = useAuth()."
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
          proTip="Custom hooks ko test karo @testing-library/react ke renderHook utility se: const { result } = renderHook(() => useDebounce('hello', 300)). Jest fake timers ke saath debounce hooks test karna bahut clean hota hai — jest.useFakeTimers() + act(() => jest.advanceTimersByTime(300))."
        />
      </div>
    </div>
  )
}
