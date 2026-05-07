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
          Zustand — Redux Ka Chhota Bhai Jo Zyada Kaam Ka Hai
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Shocking comparison — Redux Toolkit mein ek simple counter ke liye: createSlice, configureStore, Provider, useSelector, useDispatch — 50+ lines. Zustand mein wahi counter: create() mein ek object — 10 lines. Same power. 5x less code. Koi Provider nahi. Koi reducers nahi.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Zustand ka core insight — state ek JavaScript object hai, mutations simple function calls hain, aur subscriptions automatic hain. Context ke saath farq: Context mein sab consumers re-render hote hain. Zustand mein? Sirf jo specific state piece use kar raha hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein basics se le kar persist middleware, async actions, aur slice pattern tak — sab cover karenge.
        </p>
      </div>

      <div id="global-state-problem">
        <ConceptCard
          title="Global State Ka Problem"
          emoji="🌐"
          difficulty="intermediate"
          whatIsIt="Global state problem ka ek concrete example samjhte hain. Cart — Header mein count chahiye, CartDrawer mein items chahiye, CheckoutPage mein total chahiye. Teeno components mein same cart data. useState se? Kahan rakhoge — lift up to App component — toh prop drilling. Context se? CartContext.Provider wraps sab — lekin har cart update pe Header, Sidebar, Footer — sab re-render. Zustand se? Store mein cart. Header: sirf cart.length subscribe karo. Cart change hone pe sirf length consumers re-render. Surgical precision."
          whenToUse={[
            'User auth state — har jagah chahiye, rarely changes',
            'Shopping cart — header count, drawer items, checkout total',
            'App-wide notifications, toasts, alerts',
            'Complex filters jo multiple components mein sync hone chahiye',
          ]}
          whyUseIt="Prop drilling — itna pain hai ki developers Redux seekhte hain sirf escape karne ke liye. Context — simple lekin selective subscriptions nahi, sab consumers re-render. Zustand — ek store, selector-based subscriptions, no provider, 1kb bundle. Middle ground perfect hai."
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
            explanation: "Two problems clearly dikhte hain — PropDrilling: Layout, Dashboard, Sidebar sirf postman hain, useUser aur setUser unhe use nahi karte. Aur Context problem: har CartContext.Provider consumer re-render hoga jab bhi cart change hogi — chahe component sirf user dikhata ho. Zustand dono solve karta hai — koi prop passing nahi, selective re-renders.",
          }}
          realWorldScenario="Instagram jaisi app — Stories, Feed, Profile, DMs, Notifications — sab jagah same user data chahiye, notification count chahiye. Zustand store: useUserStore, useNotificationStore. Har component exactly jo chahiye sirf wo subscribe karta hai. Notification count update? Sirf NotificationBadge re-render. Feed? Undisturbed."
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
          proTip="State categories matrix yaad rakho — ye architectural clarity deta hai. Local (sirf ye component) → useState. Sibling share (2-3 levels) → prop lifting ya Context. App-wide (sab jagah) → Zustand. Server data (API se) → TanStack Query. In categories se sochna shuru karo — decision automatic hoti hai. 'Ye state kahan se aati hai aur kahan jaati hai?' Ye sawaal poocho."
        />
      </div>

      <div id="zustand-basics">
        <ConceptCard
          title="Zustand Basics — Store Banao, Use Karo"
          emoji="🐻"
          difficulty="intermediate"
          whatIsIt="Zustand ke andar kya hota hai? create() function ek closure banata hai — state internally store hoti hai is closure mein. Component call karta hai useStore — Zustand internally subscribe karta hai. State change hoti hai set() se — Zustand dekhta hai kaunse components subscribe hain, sirf unhe notify karta hai. Selector — state ka ek piece select karo. Sirf woh piece change hone par re-render. Context mein ye granularity nahi hai — wahan poora value object change pe sab re-render."
          whenToUse={[
            'Global state chahiye without Redux boilerplate',
            'Multiple components same state share karein with selective updates',
            'State aur actions ek saath define karne ho (clean code)',
            'Async operations (API calls) directly store actions mein handle karne ho',
          ]}
          whyUseIt="Redux comparison — actions file, reducers file, store config file, Provider wrap, useSelector, useDispatch — sirf ek counter ke liye 5 files. Zustand — create() mein state aur actions, useStore hook — ek file, ek function. Same selective subscriptions. Same devtools support. 10x less code. Ye fark jaruri hai samajhna."
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
            explanation: "Selector pattern trace karo — CartBadge: useStore(state =&gt; state.cart.length). Zustand internally: ye selector baar baar run karta hai jab bhi state change hoti hai. Previous result: 3. New result: 4? Changed! Re-render. New result: 3 again? Same! Skip re-render. Ye selector memoization automatic hai. CartTotal alag selector — sirf total change pe re-render. Teeno components independently optimized.",
          }}
          realWorldScenario="Food delivery app — RestaurantCard pe addToCart button: useCartStore.getState().addToCart(item) ya useStore selector se. CartDrawer: useStore(s =&gt; s.cart) — items dikhao. Header CartBadge: useStore(s =&gt; s.cart.length) — sirf count. Teeno independent. Cart update? Sirf CartDrawer aur CartBadge re-render. RestaurantCard? Not a single re-render."
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
          proTip="Redux DevTools Zustand ke saath kaam karta hai! devtools middleware wrap karo: create(devtools((set) =&gt; ({ ... }), { name: 'CartStore' })). Browser mein Redux DevTools open karo — CartStore state tree dikhi, action log mein addToCart, removeFromCart sab. Time-travel: purani state restore karo, debug karo. Production mein bhi devtools kaam karta hai — toggle kar sakte ho. This is powerful."
        />
      </div>

      <div id="zustand-patterns">
        <ConceptCard
          title="Zustand Patterns — Selectors, Computed, Async"
          emoji="🔧"
          difficulty="intermediate"
          whatIsIt="Production patterns dekhte hain. Computed values — cartTotal har component mein calculate karna? Duplicate logic + multiple sources of truth. Store selector mein calculate karo — ek jagah, sab jagah correct. Async actions — fetchUser API call store mein hi rakho, isLoading bhi store mein. Component clean — sirf { user, isLoading } use karo, fetch logic kuch pata nahi. get() function — async actions mein current state fresh milti hai, stale closure nahi."
          whenToUse={[
            'Cart total, derived values — computed selector pattern',
            'Login, data fetch — async actions in store',
            'Bada store multiple files mein — slice pattern',
            'Derived state multiple pieces se — selector composition',
          ]}
          whyUseIt="Async logic component mein rakhne se: component complex hoti hai, testing hard hoti hai, loading states manual hote hain. Store mein: action ek function, loading/error state bhi store mein, component sirf UI — render karo aur action call karo. Separation of concerns properly implement hota hai."
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
            explanation: "get() kyon zaroori hai async actions mein? set() inside async function — state change ho chuki hogi jab await complete hoga (stale closure). get() hamesha latest state deta hai — fresh snapshot. fetchUser: set isLoading true → await fetch → get() se fresh check → set user + isLoading false. Cart total selector: har render pe calculate hoga? Nahi — Zustand selector result memoize karta hai.",
          }}
          realWorldScenario="Food delivery app — placeOrder async action: get() se cart check karo (empty? error return), set isLoading: true, API call karo, success? set cart: [], set isLoading: false, navigate to success. Fail? set error: message. Component: useStore(s =&gt; s.isLoading) se spinner, useStore(s =&gt; s.error) se error message. Component bilkul clean."
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
          proTip="Bada app — ek store file 500 lines — messy. Slice pattern: cartSlice.ts mein sirf cart state aur actions. authSlice.ts mein sirf auth. uiSlice.ts mein sirf UI state. Main store.ts: create()((...args) =&gt; ({ ...cartSlice(...args), ...authSlice(...args), ...uiSlice(...args) })). Har slice alag file, alag owner, alag tests. Clean architecture scales with team size."
        />
      </div>

      <div id="zustand-persist">
        <ConceptCard
          title="Zustand Persist Middleware"
          emoji="💿"
          difficulty="intermediate"
          whatIsIt="Persist middleware Zustand ka ek killer feature hai. Ek baar configure karo — store automatically localStorage se sync rehti hai. Page refresh karo — state wahi se shuru hoti hai jahan chhoodi thi. Cart mein items the? Abhi bhi hain. Theme dark tha? Abhi bhi dark. partialize option se choose karo kya persist karna hai — actions nahi karni (wo functions hain, serialize nahi hoti), sirf state values."
          whenToUse={[
            'Shopping cart refresh ke baad persist karni ho',
            'User theme/language preference — tab close pe bhi save',
            'Onboarding progress — user wahan se shuru kare jahan chhooda',
            'Form draft — user reload kare toh data loss nahi',
          ]}
          whyUseIt="Bina persist: user ne cart mein 5 items daale, accidentally page refresh — cart gone. Frustrating! Manual localStorage: har action mein localStorage.setItem — boilerplate everywhere. Persist middleware: ek baar name batao, partialize karo — middleware khud sab handle karta hai. Zero component code."
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
            explanation: "Flow trace karo — app load hoti hai. persist middleware localStorage se 'myapp-storage' key read karta hai. JSON parse karta hai. cart aur theme store mein inject karta hai. Component useStore(s =&gt; s.cart) — refreshed cart milti hai. User cart update karta hai — set() chalta hai — persist middleware automatically localStorage update karta hai. Transparent!",
          }}
          realWorldScenario="E-commerce — login ke bina bhi cart persist hoti hai. Zustand persist middleware: cart localStorage mein. User browser band karta hai, kal wapas aata hai — cart wahi hai. Login karta hai? Server pe stored cart se merge karo. Best of both worlds — offline persistence + server sync."
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
          proTip="Testing mein persist middleware ek headache hai — test ek doosre ke localStorage state se contaminate hote hain. Fix: jest.mock('zustand/middleware', () =&gt; ({ persist: (fn: unknown) =&gt; fn, createJSONStorage: () =&gt; ({}) })). Ya beforeEach mein localStorage.clear() karo. Aur migration versioning — store schema change hone par version: 1 se version: 2 karo aur migrate function likho — warna old data type mismatch crash karega."
        />
      </div>

      <div id="zustand-vs-alternatives">
        <ConceptCard
          title="Zustand vs Context vs Redux — Kab Kya?"
          emoji="⚖️"
          difficulty="intermediate"
          whatIsIt="Final comparison — decision guide. Context: zero install, built-in React. Low-frequency updates ke liye perfect (auth, theme). Limitation: no selectors, sab consumers re-render. Zustand: 1kb, no provider, selectors, devtools, middleware — sweet spot 90% apps ke liye. Redux Toolkit: powerful, verbose, enterprise-grade — strict patterns, excellent DevTools, badi teams ke liye. TanStack Query: server state specialist — inmen se koi nahi karta jo ye karta hai."
          whenToUse={[
            'Context — auth, theme, locale — simple, rarely changing global values',
            'Zustand — medium-large apps, frequent updates, cart, UI state',
            'Redux Toolkit — very large apps (10k+ lines), badi teams, strict patterns zaroori',
            'TanStack Query — server state, API data — always, no exceptions',
          ]}
          whyUseIt="Wrong tool ka cost real hai. Todo app mein Redux — 50 files, 500 lines boilerplate, ek counter. E-commerce mein sirf Context — cart update pe poori app re-render. Decision matrix follow karo — app size, update frequency, team size — sahi tool milega."
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
            explanation: "Decision guide line by line — App < 1000 lines? useState + Context. 1000-10000 lines? Zustand add karo. 10000+ lines, large team? Redux Toolkit. Server data? Always TanStack Query. Ye matrix real experience se bana hai — ghar pe try karo, apni app pe lagu karo.",
          }}
          realWorldScenario="Startup journey — MVP: Context + useState (fast to build, zero overhead). 6 months: users complain cart is slow — profile karo, Context consumers re-render — Zustand add karo. 2 years: 50 developers, strict patterns zaroori — Redux Toolkit adopt karo. Tools app ke saath evolve karte hain — ye normal hai."
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
          proTip="Jotai explore karo — atom-based state. Zustand top-down hai (ek store), Jotai bottom-up hai (atomic units). Fine-grained reactivity chahiye, independent atoms — Jotai. One store, organized state — Zustand. Future mein React Server Components server state handle karenge client bundle ke bina — global client state ki zaroorat aur kam hogi. Abhi ke liye Zustand solid choice hai."
        />
      </div>
    </div>
  )
}
