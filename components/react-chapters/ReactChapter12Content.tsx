'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

export default function ReactChapter12Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          State Management — Zustand Se Global State Master Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Chhoti apps mein useState kaafi hai. Lekin jab app grow hoti hai — cart, user auth, notifications, filters — tab prop drilling aur Context ke limitations saamne aate hain. Zustand ek minimal, fast, aur scalable global state solution hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Zustand ka philosophy: No boilerplate. No providers. No reducers. Bas ek store banao, use karo. Redux ki power, Context ki simplicity se bhi kam code.
        </p>
      </div>

      <div id="global-state-problem">
        <ConceptCard
          title="Global State Ka Problem"
          emoji="🌐"
          difficulty="intermediate"
          whatIsIt="Jab state multiple components mein share karni ho — cart count (header + cart page), user info (navbar + profile + settings) — toh problem hoti hai. useState local hai. Props drilling deeply nested components mein messy ho jaata hai. Context frequent updates par slow ho jaata hai."
          whenToUse={[
            'User authentication state — har jagah user chahiye',
            'Shopping cart — header mein count, cart page mein items',
            'App-wide notifications/toasts',
            'Complex filters jo URL aur multiple components mein sync honi chahiye',
          ]}
          whyUseIt="Prop drilling 5-6 levels deep ho toh code unreadable aur unmaintainable ho jaata hai. Context re-renders sab consumers ko trigger karta hai — performance issue. Zustand targeted updates karta hai — sirf wahi components re-render hote hain jo specific state piece use karte hain."
          howToUse={{
            filename: 'problem-demo.tsx',
            language: 'typescript',
            code: `// ❌ Prop drilling problem
function App() {
  const [user, setUser] = useState<User | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])

  return (
    // Props 5 levels deep pass karne padte hain
    <Layout user={user} cart={cart} setCart={setCart}>
      <Dashboard user={user}>
        <Sidebar user={user}>
          <UserMenu user={user} setUser={setUser} />  {/* Finally use hota hai */}
        </Sidebar>
      </Dashboard>
    </Layout>
  )
}

// ❌ Context performance issue
const CartContext = createContext<CartContextType>({} as CartContextType)
// CartContext.Provider ke andar har component re-render hota hai
// jab bhi cart update hoti hai — chahe wo component cart use na kare

// ✅ Zustand solution — is chapter mein aata hai`,
            explanation: "Ye demo dikhata hai kyun local state aur Context large apps mein struggle karti hain. Prop drilling intermediate components ko props pass karne par majboor karta hai jo unhe use nahi karte. Context sab consumers ko re-render trigger karta hai — even agar unka relevant state change na hua ho.",
          }}
          realWorldScenario="Instagram jaisi app — Stories viewer, Feed, Profile, DMs — sab jagah same user data chahiye. Notifications badge header mein aur notification page dono mein. Zustand se ek store banao — sab components independently read karo, performance issue nahi."
          commonMistakes={[
            {
              mistake: 'Everything ek global store mein daalna',
              why: 'Form state, local UI state (modal open/close) bhi global store mein daalne se store complex ho jaata hai aur irrelevant re-renders hote hain.',
              fix: 'Server state → TanStack Query. Local UI state → useState. Truly global state → Zustand. Sahi tool sahi kaam ke liye.',
            },
            {
              mistake: 'Context ko completely abandon karna',
              why: 'Context simple use cases ke liye perfect hai — theme, language, auth context. Har cheez ke liye Zustand overkill hai.',
              fix: 'App size aur complexity ke hisaab se tool choose karo. Small app? useState + Context. Medium-large? Zustand add karo.',
            },
          ]}
          proTip="State ko categories mein sochna help karta hai: Local state (this component only) → useState. Shared state (few siblings) → prop lifting. Global state (app-wide) → Zustand. Server state (from API) → TanStack Query. Ye 4 categories clear hoti hain toh architecture decisions easy ho jaate hain."
        />
      </div>

      <div id="zustand-basics">
        <ConceptCard
          title="Zustand Basics — Store Banao, Use Karo"
          emoji="🐻"
          difficulty="intermediate"
          whatIsIt="Zustand mein ek store create() function se banta hai. Store mein state aur actions ek saath define hote hain. Components useStore hook se state read karte hain — selector function pass karo sirf wo state lo jo chahiye. No Provider wrap, no reducers, no dispatch."
          whenToUse={[
            'Global state chahiye without Redux boilerplate',
            'Multiple components same state share karein',
            'Actions (state mutations) bhi state ke saath define karni hain',
            'Async operations (API calls) directly store actions mein handle karne hain',
          ]}
          whyUseIt="Zustand ka API extremely minimal hai — ek function create(), ek hook useStore(). Redux mein actions, reducers, store setup, Provider, useSelector, useDispatch — Zustand mein bas create aur use. Same power, 10x less code. Bundle size bhi sirf ~1kb."
          howToUse={{
            filename: 'store.ts',
            language: 'typescript',
            code: `import { create } from 'zustand'

// Types
interface User { id: string; name: string; email: string }
interface CartItem { id: string; name: string; price: number; qty: number }

interface StoreState {
  // State
  user: User | null
  cart: CartItem[]
  // Actions
  login: (user: User) => void
  logout: () => void
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
}

const useStore = create<StoreState>((set) => ({
  user: null,
  cart: [],

  login: (user) => set({ user }),
  logout: () => set({ user: null, cart: [] }),

  addToCart: (item) =>
    set((state) => ({ cart: [...state.cart, item] })),

  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),

  updateQty: (id, qty) =>
    set((state) => ({
      cart: state.cart.map((i) => (i.id === id ? { ...i, qty } : i)),
    })),
}))

// Usage — selector se sirf relevant state lo
function CartBadge() {
  const cartCount = useStore((state) => state.cart.length)
  return <span>{cartCount}</span>  // Sirf cart.length change pe re-render
}

function UserMenu() {
  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)
  return user ? <button onClick={logout}>{user.name}</button> : null
}`,
            explanation: "create() function ek hook return karta hai. set() se state update karo — object ya function pass karo (function se current state milti hai). Selectors (arrow functions) ensure karte hain ki component sirf specific state change par re-render ho — performance critical.",
          }}
          realWorldScenario="Food delivery app — RestaurantCard mein addToCart action call karo, CartDrawer mein cart items show karo, Header mein cart count badge dikhaao. Teeno components ek shared store se independently kaam karte hain — koi prop drilling nahi."
          commonMistakes={[
            {
              mistake: 'Selector ke bina poora store subscribe karna',
              why: 'useStore() bina selector ke poori store state re-render trigger karta hai — koi bhi state change hogi toh component re-render hoga.',
              fix: 'Hamesha selector use karo: useStore(state => state.cart) — sirf cart change hone par re-render hoga. Full store sirf store.getState() se outside React access karo.',
            },
            {
              mistake: 'set() mein directly state mutate karna',
              why: 'Zustand immutable updates expect karta hai. Direct mutation se React re-renders trigger nahi hote.',
              fix: 'Hamesha new object/array return karo: set(state => ({ cart: [...state.cart, newItem] })) — spread operator ya .map() use karo.',
            },
          ]}
          proTip="Zustand devtools middleware se Redux DevTools extension mein store debug kar sakte ho: import { devtools } from 'zustand/middleware'; create(devtools((set) => ({ ... }), { name: 'MyStore' })). Time-travel debugging aur state inspection milti hai production-grade apps ke liye."
        />
      </div>

      <div id="zustand-patterns">
        <ConceptCard
          title="Zustand Patterns — Selectors, Computed, Async"
          emoji="🔧"
          difficulty="intermediate"
          whatIsIt="Zustand mein advanced patterns: computed values (total price from cart), async actions (API calls inside store), aur multiple slice pattern (bade stores ko organize karna). Ye patterns production-ready stores banane ke liye zaroori hain."
          whenToUse={[
            'Cart total calculate karna — computed value pattern',
            'Login API call store action mein — async actions',
            'Bada store multiple files mein organize karna — slice pattern',
            'Derived state jo multiple state pieces se aaye — selectors',
          ]}
          whyUseIt="Computed values component mein calculate karne se har use karne wale component mein duplicate logic. Store mein computed values centralize hoti hain. Async actions se loading state bhi store mein manage hoti hai — component clean rehta hai. Slice pattern large teams ke liye maintainable code deta hai."
          howToUse={{
            filename: 'store-patterns.ts',
            language: 'typescript',
            code: `import { create } from 'zustand'

interface StoreState {
  cart: CartItem[]
  isLoading: boolean
  error: string | null
  user: User | null
  addToCart: (item: CartItem) => void
  fetchUser: (id: string) => Promise<void>
}

const useStore = create<StoreState>((set, get) => ({
  cart: [],
  isLoading: false,
  error: null,
  user: null,

  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),

  // Async action — get() se current state access karo
  fetchUser: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const res = await fetch(\`/api/users/\${id}\`)
      const user = await res.json() as User
      set({ user, isLoading: false })
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false })
    }
  },
}))

// Computed values — selector mein calculate karo
function useCartTotal() {
  return useStore((state) =>
    state.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  )
}

function CartSummary() {
  const total = useCartTotal()  // Re-renders sirf jab cart change ho
  const { isLoading } = useStore((state) => ({ isLoading: state.isLoading }))
  return <div>Total: ₹{total.toFixed(2)}</div>
}`,
            explanation: "create() mein dusra argument get hai — current state access karne ke liye async functions mein. Computed values selector mein calculate karo — memoized hoti hain. Async actions loading aur error state manage karte hain directly store mein.",
          }}
          realWorldScenario="Swiggy cart — cartTotal (sum of price * qty) computed selector se milta hai. Place order async action pehle cart validate karta hai (get() se current cart dekho), phir API call karta hai, success par cart clear karta hai — sab store mein, component clean rehta hai."
          commonMistakes={[
            {
              mistake: 'Async action mein get() ki jagah stale closure use karna',
              why: 'Async functions mein state capture hoti hai closure mein — jab tak await resolve ho, state change ho sakti hai.',
              fix: 'Hamesha get() use karo async actions mein fresh state ke liye: const currentCart = get().cart. get() hamesha latest state return karta hai.',
            },
            {
              mistake: 'Complex computed values ko har render mein recalculate karna',
              why: 'Object create karna selector mein (state => ({ total: ... })) reference equality fail karta hai — har render pe re-render.',
              fix: 'Simple primitive values return karo selector se ya useMemo ke saath computed values cache karo components mein.',
            },
          ]}
          proTip="Large apps ke liye store slices pattern: separate files mein cartSlice.ts, authSlice.ts, uiSlice.ts banao — har file mein apna (set, get) => ({...}) function likho. Main store mein combine karo: create<StoreState>()((...args) => ({ ...cartSlice(...args), ...authSlice(...args) })). Clean aur modular."
        />
      </div>

      <div id="zustand-persist">
        <ConceptCard
          title="Zustand Persist Middleware"
          emoji="💿"
          difficulty="intermediate"
          whatIsIt="Zustand ka persist middleware automatically store state ko localStorage (ya sessionStorage, ya custom storage) mein save karta hai. Page refresh karne par state restore hoti hai — cart persist, auth token persist, user preferences persist. Zero extra code from component side."
          whenToUse={[
            'Shopping cart persist karni ho refresh ke baad',
            'User theme/language preference save karni ho',
            'Auth token localStorage mein store karna ho (httpOnly cookies better hain sensitive apps mein)',
            'Onboarding progress save karna ho',
          ]}
          whyUseIt="Bina persist ke har refresh par state reset — frustrating UX. Manual localStorage.setItem har action mein — repetitive code. persist middleware ek baar configure karo — automatically sab handle hota hai. Partial persistence bhi possible hai — sirf cart persist karo, UI state nahi."
          howToUse={{
            filename: 'persisted-store.ts',
            language: 'typescript',
            code: `import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface PersistedState {
  cart: CartItem[]
  theme: 'dark' | 'light'
  addToCart: (item: CartItem) => void
  setTheme: (theme: 'dark' | 'light') => void
}

const useStore = create<PersistedState>()(
  persist(
    (set) => ({
      cart: [],
      theme: 'dark',
      addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'myapp-storage',              // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Sirf cart aur theme persist karo — baki nahi
      partialize: (state) => ({ cart: state.cart, theme: state.theme }),
    }
  )
)

// Usage bilkul same hai — persist transparent hai
function App() {
  const theme = useStore((state) => state.theme)
  // theme automatically localStorage se restore hoti hai on refresh
}`,
            explanation: "persist middleware store ko wrap karta hai. name localStorage key hai. partialize se selective persistence — actions ko persist karna zaroori nahi. createJSONStorage() JSON parse/stringify handle karta hai. Migration support bhi hai — version number add karo store schema change hone par.",
          }}
          realWorldScenario="Amazon ka cart — login ke bina bhi cart persist rehta hai. Zustand persist middleware se cart localStorage mein save hota hai. User session expire ho toh cart phir bhi rehta hai — login karne par cart merge hota hai server-side cart se."
          commonMistakes={[
            {
              mistake: 'Sensitive data (passwords, full credit card numbers) localStorage mein persist karna',
              why: 'localStorage JavaScript se accessible hai — XSS attack mein data steal ho sakta hai.',
              fix: 'Auth tokens ke liye httpOnly cookies server-side set karo. Sirf non-sensitive preferences localStorage mein. Tokens persist karne hain toh sessionStorage use karo (tab close pe clear hoti hai).',
            },
            {
              mistake: 'Store schema change hone par old persisted data handle nahi karna',
              why: 'Old structure ka data load hone par type mismatch errors ya bugs aate hain.',
              fix: 'persist middleware mein version: 1 add karo aur migrate function likho: migrate: (oldState, version) => { if (version === 0) return { ...newDefaults } }.',
            },
          ]}
          proTip="Testing mein persist middleware skip karo — jest tests mein localStorage mock ya disable karo: jest.mock('zustand/middleware', () => ({ persist: (fn: unknown) => fn, createJSONStorage: () => ({}) })). Warna tests ek doosre ke state se contaminate hoti hain."
        />
      </div>

      <div id="zustand-vs-alternatives">
        <ConceptCard
          title="Zustand vs Context vs Redux — Kab Kya?"
          emoji="⚖️"
          difficulty="intermediate"
          whatIsIt="Teen main state management approaches: Context API (built-in, no install), Zustand (minimal external library), Redux Toolkit (powerful, more setup). Sahi choice app size, team size, aur requirements par depend karti hai. Har tool ka apna sweet spot hai."
          whenToUse={[
            'Context — simple theme, auth, language — rarely changing global values',
            'Zustand — medium-large apps, frequent updates, performance matters',
            'Redux Toolkit — very large apps, time-travel debugging zaroori, strict patterns chahiye',
            'TanStack Query — server state (API data) — inme se koi nahi',
          ]}
          whyUseIt="Wrong tool choose karne ka cost high hota hai — premature optimization (Redux for todo app) ya under-powered solution (Context for high-frequency updates). Ye comparison matrix clear decision deta hai."
          howToUse={{
            filename: 'comparison.tsx',
            language: 'typescript',
            code: `// Context — simple, built-in, rarely changing
const ThemeContext = createContext<'dark' | 'light'>('dark')
// Pros: No install, built-in React
// Cons: Re-renders all consumers, no devtools, no actions

// ─────────────────────────────────────────────
// Zustand — minimal, performant
const useStore = create<State>()((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}))
// Pros: ~1kb, selectors prevent re-renders, devtools, middleware
// Cons: External dependency, slightly less structured than Redux

// ─────────────────────────────────────────────
// Redux Toolkit — structured, powerful
import { createSlice, configureStore } from '@reduxjs/toolkit'
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: { increment: (state) => { state.count++ } },
})
// Pros: Time-travel, strict patterns, excellent devtools, large ecosystem
// Cons: More boilerplate, steeper learning curve, overkill for small apps

// Decision guide:
// App < 1000 lines? → useState + Context
// App 1000-10000 lines? → Zustand
// App > 10000 lines, large team? → Redux Toolkit
// Server data? → Always TanStack Query`,
            explanation: "Ye comparison tools ke trade-offs clearly dikhata hai. Context frequency of updates ke saath poorly scales. Zustand 90% use cases ke liye sweet spot hai. Redux Toolkit large enterprise apps mein shines karta hai jahan strict patterns aur excellent debugging zaroori hain.",
          }}
          realWorldScenario="Startup MVP: Context + useState (fast to build). Product grows → users complain performance slow — Zustand add karo. Company scales, 50 developers → Redux Toolkit adopt karo team consistency ke liye. Tools evolve karte hain app ke saath."
          commonMistakes={[
            {
              mistake: 'Server state Zustand ya Redux mein manage karna',
              why: 'API data ka caching, background refresh, retry logic manually implement karna complex aur error-prone hai.',
              fix: 'TanStack Query ya SWR use karo server state ke liye — ye specifically is problem ke liye bane hain aur bahut better handle karte hain.',
            },
            {
              mistake: 'Team ke sabke liye unfamiliar tool adopt karna without training',
              why: 'Redux Toolkit powerful hai but agar team ne kabhi Redux nahi likha toh adoption friction bahut hoti hai.',
              fix: 'Team ki familiarity consider karo. Zustand learn karna 30 minutes ka kaam hai. Redux toolkit proper learning invest karo — tutorials, workshops.',
            },
          ]}
          proTip="Jotai aur Recoil bhi popular alternatives hain — atom-based model (bottom-up) jo Context se better aur Redux se simpler hai. Server Components future mein global client state ki zaroorat aur kam kar denge — Next.js 14 mein server state React Server Components mein handle hoti hai bina client bundle ke."
        />
      </div>
    </div>
  )
}
