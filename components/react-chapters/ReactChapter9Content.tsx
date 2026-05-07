'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const contextQuiz: QuizQuestion[] = [
  {
    question: 'Prop drilling kya problem hai?',
    options: [
      { text: 'Performance slow hoti hai', correct: false, explanation: 'Prop drilling primarily code maintainability issue hai — performance secondary.' },
      { text: 'Intermediate components props pass karte hain jo unhe chahiye nahi — tight coupling, maintenance nightmare', correct: true, explanation: 'Sahi! Middle components "postman" ban jaate hain — unrelated props carry karo, sab mein type change karo.' },
      { text: 'TypeScript support nahi karta', correct: false, explanation: 'TypeScript prop drilling type-safely handle karta hai — readability problem hai, not type problem.' },
      { text: 'Re-renders zyada hote hain', correct: false, explanation: 'Prop drilling re-render issue nahi — Context zyada re-renders cause kar sakta hai agar optimize nahi kiya.' },
    ],
  },
  {
    question: 'Context mein object value kyon useMemo se wrap karna chahiye?',
    options: [
      { text: 'Zaroorat nahi — Context optimized hai', correct: false, explanation: 'Context khud memoize nahi karta — developer ki responsibility hai.' },
      { text: 'Bina useMemo — har render pe new object reference — sab consumers re-render karte hain', correct: true, explanation: 'Sahi! value={{ user, setUser }} — har parent render pe new object — har useContext consumer re-render!' },
      { text: 'useMemo Context ke liye required hai TypeScript mein', correct: false, explanation: 'useMemo TypeScript requirement nahi — performance optimization hai.' },
      { text: 'useMemo Context value async banata hai', correct: false, explanation: 'useMemo async nahi hai.' },
    ],
  },
  {
    question: 'Context vs Zustand kab use karna chahiye?',
    options: [
      { text: 'Hamesha Context — Zustand third-party library hai', correct: false, explanation: 'Third-party hone se automatically worse nahi. Zustand specific advantages deta hai.' },
      { text: 'Context: simple shared state (theme, auth); Zustand: complex/frequent updates, better performance', correct: true, explanation: 'Bilkul! Auth, theme — Context fine. Shopping cart, real-time data — Zustand better (selective subscriptions, no unnecessary re-renders).' },
      { text: 'Zustand hamesha — Context deprecated hai', correct: false, explanation: 'Context deprecated nahi — different use cases hain.' },
      { text: 'Dono same hain', correct: false, explanation: 'Fundamental architecture differences hain — performance characteristics alag.' },
    ],
  },
  {
    question: 'Multiple contexts kab use karte hain?',
    options: [
      { text: 'Kabhi nahi — ek context mein sab daalo', correct: false, explanation: 'God context — sab consumers unnecessary re-renders.' },
      { text: 'Jab different concerns alag-alag update hote hain — AuthContext, ThemeContext, separate', correct: true, explanation: 'Sahi! Theme change hone pe auth consumers re-render nahi chahiye. Separate karo — independent updates.' },
      { text: 'Sirf performance ke liye — functionality ke liye ek kaafi hai', correct: false, explanation: 'Multiple contexts dono performance aur code organization ke liye — separation of concerns.' },
      { text: 'Sirf large apps mein', correct: false, explanation: 'Small apps mein bhi multiple contexts appropriate ho sakte hain agar concerns alag hain.' },
    ],
  },
  {
    question: 'useContext kahan se value return karta hai jab multiple providers ho?',
    options: [
      { text: 'Global scope se', correct: false, explanation: 'Context providers tree-based scoping use karte hain.' },
      { text: 'Nearest ancestor Provider se — component tree mein upar jaata hai', correct: true, explanation: 'Bilkul! Nearest matching Provider ki value milti hai. Nested providers se inner override outer.' },
      { text: 'Root Provider se hamesha', correct: false, explanation: 'Nearest ancestor, root nahi — nested providers override karte hain.' },
      { text: 'Latest rendered Provider se', correct: false, explanation: 'Tree position matter karta hai — timing nahi.' },
    ],
  },
]

export default function ReactChapter9Content() {
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
          Context API — Prop Drilling Ki Maut
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Socho ek scenario — user ka naam App mein hai. Header chahiye, Navbar chahiye, NavLinks chahiye, AdminMenu chahiye. Ye sab 5 levels deep hain. Kya karte ho? Har level pe user pass karte jaate ho? Ye Layout, NavLinks — inhe user ki zaroorat nahi hai, phir bhi ye "postman" bante hain. Ye hi prop drilling hai — aur ye React developers ka pehla major pain point hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Context API React ka built-in solution hai. Ek Provider rakho tree ke upar, koi bhi Consumer seedha value lo — beech ke postman components ko kuch nahi pata. Auth, theme, language — ye sab Context ke perfect use cases hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Lekin Context bhi perfect nahi hai — unnecessary re-renders ka trap hai. Is chapter mein setup se le kar optimization tak sab samjhenge.
        </p>
      </div>

      <div id="prop-drilling-problem">
        <ConceptCard
          title="Prop Drilling Problem — Kyun Painful Hai"
          emoji="😰"
          difficulty="intermediate"
          whatIsIt="Prop drilling ek silent killer hai. Pehle ek level, phir do, phir teen. Ek din tum dekhte ho ki Layout component user prop receive kar raha hai jo use karta hi nahi — sirf Navbar ko pass karne ke liye. Navbar bhi usi tarah NavLinks ko pass karta hai. Ye 'postman' components hain — unka kaam sirf data forward karna hai. Problem tab aati hai jab user interface mein ek field add karna ho — sab intermediate components ke types update karne padte hain. Ek change, 10 files."
          whenToUse={[
            'Problem identify karo — 3+ levels mein same prop pass ho raha hai',
            'Intermediate components unnecessarily aware hain data ke',
            'Type/interface change karne pe cascade effect hota hai',
            'Same data multiple unrelated components mein chahiye',
          ]}
          whyUseIt="Prop drilling samajhna zaroori hai — tabhi tum decide kar paoge kab fix karna hai. 1-2 levels? Fine, props use karo, Context overkill hai. 3+ levels ya genuinely global data? Context consider karo. Rule of thumb: agar intermediate component ko data ka naam pata hai lekin use nahi karta — wo postman hai, fix karo."
          howToUse={{
            filename: 'PropDrillingProblem.tsx',
            language: 'tsx',
            code: `// ── PROP DRILLING EXAMPLE — The Pain ────────────────────────────────

interface User {
  name: string
  role: 'admin' | 'user'
  avatar: string
}

// Level 1 — App has user
function App() {
  const [user] = useState<User>({ name: 'Rahul', role: 'admin', avatar: '/avatar.png' })

  return <Layout user={user} />  // Pass down...
}

// Level 2 — Layout doesn't need user, just passes it
function Layout({ user }: { user: User }) {
  return (
    <div>
      <Navbar user={user} />    {/* Pass down... */}
      <Main user={user} />     {/* Pass down... */}
      <Footer />
    </div>
  )
}

// Level 3 — Navbar needs user for display
function Navbar({ user }: { user: User }) {
  return (
    <nav>
      <Logo />
      <NavLinks user={user} />  {/* Pass down again... */}
      <UserMenu user={user} />  {/* Uses it here */}
    </nav>
  )
}

// Level 4 — NavLinks doesn't need user
function NavLinks({ user }: { user: User }) {
  return (
    <ul>
      <li>Home</li>
      <li>Products</li>
      {user.role === 'admin' && <AdminMenu user={user} />}  {/* Passes down */}
    </ul>
  )
}

// Level 5 — Finally uses user
function AdminMenu({ user }: { user: User }) {
  return <div>Admin: {user.name}</div>
}

// ── PROBLEMS WITH THIS APPROACH ────────────────────────────────────
// 1. Layout, NavLinks don't care about user — "postman" components
// 2. Add user.email — update ALL intermediate types
// 3. Refactor tree — update all prop signatures
// 4. Testing — mock user in every intermediate component test

// ── SOLUTION — Context eliminates this ─────────────────────────────
// AuthContext.Provider wraps App
// AdminMenu: const { user } = useAuth() — direct access!
// No intermediate prop passing needed`,
            explanation: 'Code trace karo — App mein user hai. Layout ko pass kiya, Layout ne Navbar ko, Navbar ne NavLinks ko, NavLinks ne AdminMenu ko. AdminMenu finally use karta hai. Lekin Layout, Navbar, NavLinks — teeno sirf postman the. Ek user.email field add karo — teeno files update. Context se: App mein Provider, AdminMenu mein useContext — teeno postman retire ho jaate hain.',
          }}
          realWorldScenario="Multi-tenant SaaS application — tenantId, theme, language, user permissions, feature flags — ye sab 6-7 levels deep chahiye hain. Prop drilling mein 200+ component files mein changes. Ek naya permission add karo — cascade of updates. Context se: ek AuthProvider, ek ThemeProvider — consumers seedha access. Maintenance 10x easier, team productivity 5x better."
          commonMistakes={[
            {
              mistake: 'Har prop drilling ko Context se fix karna',
              why: 'Context overuse — unnecessary complexity. 1-2 level passing fine hai.',
              fix: 'Context sirf 3+ levels ya genuinely global data ke liye. Component composition bhi solution hai — children prop se tree restructure.',
            },
            {
              mistake: 'Component composition try nahi karna pehle',
              why: 'Context se pehle — kya restructure se prop drilling solve ho sakti hai? Aksar haan.',
              fix: 'Children prop pattern — intermediate component data nahi jaanta: <Layout>{children}</Layout>.',
            },
          ]}
          proTip="Context se pehle ek aur option try karo — Component Composition! Bina Context: &lt;Layout&gt;&lt;Page user={user} /&gt;&lt;/Layout&gt; — user seedha Page ko diya, Layout beech mein nahi aaya. children prop pattern se Layout ko user ka pata hi nahi chala. Shallow tree, zero prop drilling. React docs mein ye pattern pehle recommend hota hai Context se. Simple cases mein ye bahut clean solution hai."
        />
      </div>

      <div id="create-context">
        <ConceptCard
          title="createContext + useContext — Complete Setup"
          emoji="🔧"
          difficulty="intermediate"
          whatIsIt="Step by step samjhte hain Context ka flow. createContext() — ek context object banata hai. Context.Provider — value prop se data broadcast karta hai — is Provider ke neeche poora subtree. useContext() — nearest ancestor Provider se value leta hai. React internally Observer pattern use karta hai — Provider value change karta hai, sab useContext consumers re-render hote hain. Isliye optimization important hai. Custom hook pattern — useAuth() ek clean API deta hai aur outside-provider use pe meaningful error throw karta hai."
          whenToUse={[
            'Auth state — user, token, login/logout functions',
            'Theme — dark/light mode toggle',
            'Language/Locale — i18n translations',
            'Global notifications — toast system',
          ]}
          whyUseIt="Suno — Context API built-in hai, koi library install nahi karni. TypeScript ke saath fully type-safe. Lekin sabse important: custom hook pattern! useAuth() likho — direct useContext nahi. Kyun? Agar koi component Provider ke baahir use kare — meaningful error milta hai: 'useAuth must be within AuthProvider.' Direct useContext use karo toh undefined milta hai — crash confusing hota hai."
          howToUse={{
            filename: 'AuthContext.tsx',
            language: 'tsx',
            code: `import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react'

// ── 1. TYPE DEFINITIONS ───────────────────────────────────────────
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

// ── 2. CREATE CONTEXT ─────────────────────────────────────────────
// TypeScript: undefined as default — custom hook will validate
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ── 3. PROVIDER COMPONENT ─────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize from localStorage (or session check)
  // useEffect(() => { checkSession().then(setUser).finally(() => setLoading(false)) }, [])

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) throw new Error('Invalid credentials')
      const userData = await response.json()
      setUser(userData)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    // Clear tokens, redirect
  }, [])

  // ✅ useMemo — stable object reference
  const value = useMemo(() => ({
    user,
    isAuthenticated: user !== null,
    login,
    logout,
    loading,
  }), [user, login, logout, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ── 4. CUSTOM HOOK — Better DX ───────────────────────────────────
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)

  // Validation — used outside provider?
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

// ── 5. USAGE ──────────────────────────────────────────────────────

// app.tsx — wrap app with provider
function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

// Any component — direct access!
function Header() {
  const { user, logout } = useAuth()

  return (
    <header>
      {user ? (
        <>
          <span>Hello, {user.name}!</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </header>
  )
}

function AdminPanel() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || user?.role !== 'admin') {
    return <div>Access denied</div>
  }

  return <div>Admin dashboard for {user.name}</div>
}`,
            explanation: 'Flow trace karo — createContext undefined default se (TypeScript ke liye). AuthProvider component — state manage karta hai, useCallback se stable functions, useMemo se stable value object. App root mein wrap karo. Koi bhi child: useAuth() call karo — nearest AuthProvider ki value milti hai. Custom hook context undefined check karta hai — warna confusing crash hoga.',
          }}
          realWorldScenario="Next.js app mein — app/layout.tsx mein AuthProvider root pe wrap karo. Protected route: const { isAuthenticated } = useAuth(); if (!isAuthenticated) redirect('/login'). Admin panel: const { user } = useAuth(); if (user?.role !== 'admin') notFound(). Clean, readable, type-safe — koi prop drilling nahi."
          commonMistakes={[
            {
              mistake: 'Context value mein object directly daalna bina useMemo ke',
              why: 'value={{ user, login }} — har parent render pe new object → sab consumers re-render!',
              fix: 'const value = useMemo(() => ({ user, login }), [user, login]) — stable reference.',
            },
            {
              mistake: 'useContext check nahi karna — undefined ho sakta hai',
              why: 'Context outside provider mein use karo — undefined return — destructuring crash.',
              fix: 'Custom hook mein validate karo: if (!context) throw new Error("useXxx must be within XxxProvider").',
            },
          ]}
          proTip="Testing mein Context ke saath ek clean pattern hai — renderWithAuth helper banao: const renderWithAuth = (ui, user) =&gt; render(&lt;AuthProvider initialUser={user}&gt;{ui}&lt;/AuthProvider&gt;). Test mein: renderWithAuth(&lt;AdminPanel /&gt;, adminUser). No mocking, real Provider, real behavior. Tests zyada reliable hote hain jab real Provider use karo mock ke jagah."
        />
      </div>

      <div id="context-optimization">
        <ConceptCard
          title="Context Optimization — Unnecessary Re-renders Avoid"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Yahan ek trap hai. Context value change hoti hai — sab useContext consumers re-render hote hain. Sab! Matlab agar ek Context mein theme aur user dono hain, aur sirf theme change hui — user consumers bhi re-render honge! Ye React ka design hai. Solution? Pehla — useMemo se value object stabilize karo (warna har parent render pe naya object, sab consumers re-render). Doosra — contexts split karo. Theme alag, auth alag. Ab theme change hone pe sirf theme consumers re-render."
          whenToUse={[
            'Context consumers bahut hain — optimization seriously zaroori',
            'Context value frequently update hoti hai',
            'Consumers sirf ek slice use karte hain poori value nahi',
            'Profiler mein context consumers unnecessary re-renders dikhaaye',
          ]}
          whyUseIt="Ek real example socho — Shopping app mein ek AppContext mein user + cart + theme sab hain. User apna cart update karta hai — theme consumers bhi re-render hote hain. Kyun? Same context. Split karo — CartContext, UserContext, ThemeContext. Ab cart update pe sirf cart consumers re-render. User aur theme ko koi fark nahi padta. Performance dramatically better."
          howToUse={{
            filename: 'ContextOptimization.tsx',
            language: 'tsx',
            code: `import { createContext, useContext, useState, useMemo, ReactNode } from 'react'

// ── SPLIT CONTEXTS — Different update frequencies ──────────────────

// User data — rarely changes
interface UserContextType {
  user: { name: string; role: string } | null
}

// UI preferences — frequently changes
interface UIContextType {
  theme: 'dark' | 'light'
  language: string
  setTheme: (theme: 'dark' | 'light') => void
  setLanguage: (lang: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)
const UIContext = createContext<UIContextType | undefined>(undefined)

// Combined Provider — cleaner API
function AppProvider({ children }: { children: ReactNode }) {
  const [user] = useState({ name: 'Rahul', role: 'admin' })
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [language, setLanguage] = useState('en')

  // Separate memoization — independent update frequencies
  const userValue = useMemo(() => ({ user }), [user])

  const uiValue = useMemo(() => ({
    theme,
    language,
    setTheme,
    setLanguage,
  }), [theme, language])

  return (
    <UserContext.Provider value={userValue}>
      <UIContext.Provider value={uiValue}>
        {children}
      </UIContext.Provider>
    </UserContext.Provider>
  )
}

// Custom hooks
function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be in AppProvider')
  return ctx
}

function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be in AppProvider')
  return ctx
}

// Now: theme change → only UI consumers re-render → user consumers unaffected!

// ── CONTEXT SELECTOR PATTERN ──────────────────────────────────────
// For large contexts where you need granular control:
// npm install use-context-selector

// import { createContext, useContextSelector } from 'use-context-selector'
//
// const StoreContext = createContext({ count: 0, name: '', theme: 'dark' })
//
// // Only re-renders when count changes — not name or theme!
// function CountDisplay() {
//   const count = useContextSelector(StoreContext, s => s.count)
//   return <div>{count}</div>
// }

// ── REDUCER + CONTEXT ─────────────────────────────────────────────
type Action =
  | { type: 'INCREMENT' }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'RESET' }

interface State {
  count: number
  name: string
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT': return { ...state, count: state.count + 1 }
    case 'SET_NAME': return { ...state, name: action.payload }
    case 'RESET': return { count: 0, name: '' }
    default: return state
  }
}

const StateContext = createContext<State | undefined>(undefined)
const DispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined)

function StateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, { count: 0, name: '' })

  // Split state and dispatch — dispatch NEVER changes!
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

// useDispatch never re-renders — dispatch stable
function useDispatch() {
  const ctx = useContext(DispatchContext)
  if (!ctx) throw new Error('useDispatch must be in StateProvider')
  return ctx
}`,
            explanation: 'Key insight — UserContext aur UIContext split kiye. User rarely change hota hai — login/logout pe. UI frequently — har theme toggle, language change. Agar ek saath hote toh theme toggle pe UserAvatar bhi re-render hoti (unnecessary!). Split se: theme change — sirf UIContext consumers. User change — sirf UserContext consumers. Surgical updates.',
          }}
          realWorldScenario="E-commerce shopping app — CartContext (har item add/remove pe update), UserContext (login ke baad stable), ThemeContext (user preference, kabhi kabhi). Teen alag contexts. Cart mein 50 items add karo — sirf CartDrawer, CartBadge re-render hote hain. Header ka UserMenu? Undisturbed. Theme toggle? Sirf theme consumers. Clean separation = clean performance."
          commonMistakes={[
            {
              mistake: 'Bahut zyada contexts banana — god context ki jagah fragmented contexts',
              why: 'Har cheez alag context mein — 20 providers tree mein — complexity extreme.',
              fix: 'Balance karo — related data ek context mein. Frequency of change se split. Common sense.',
            },
            {
              mistake: 'Context ke liye global state library replace karna hamesha',
              why: 'Complex state — shopping cart with optimistic updates, undo/redo — Context bahut verbose.',
              fix: 'Context simple cases ke liye. Complex — Zustand, Jotai consider karo.',
            },
          ]}
          proTip="Zustand aur Jotai mein built-in selector support hai — useStore(state =&gt; state.theme) sirf theme change pe re-render karta hai. Context mein ye natively nahi hai (use-context-selector library se possible hai). Agar bahut granular control chahiye — Zustand seedha zyada suitable hai Context se. Lekin auth aur theme ke liye Context + useMemo + split approach perfectly kaafi hai."
        />
      </div>

      <div id="multiple-contexts">
        <ConceptCard
          title="Multiple Contexts — Auth, Theme, Language"
          emoji="🎛️"
          difficulty="intermediate"
          whatIsIt="Production app mein ek Context se kaam nahi chalta. Socho — ThemeContext, AuthContext, LanguageContext, NotificationContext — char alag concerns, char alag update frequencies. Theme user toggle karta hai. Auth sirf login/logout pe. Language rarely. Notifications har 30 seconds. Sab ek context mein? Performance disaster. Alag alag contexts — separation of concerns + performance optimization dono ek saath milte hain."
          whenToUse={[
            'Auth — user object, permissions, login/logout functions',
            'Theme — dark/light mode, color scheme, typography scale',
            'Language — locale, translation function t()',
            'Notifications — toast queue, addNotification, removeNotification',
          ]}
          whyUseIt="Multiple contexts ka beauty — independent evolution. ThemeProvider change karo — AuthProvider ko kuch pata nahi. AuthProvider mein bug fix karo — LanguageProvider untouched. Testing mein? Sirf relevant context mock karo — poora app setup nahi karna. Team ke alag members alag contexts own kar sakte hain. Ye real engineering hai."
          howToUse={{
            filename: 'MultipleContexts.tsx',
            language: 'tsx',
            code: `import { createContext, useContext, useState, useMemo, ReactNode } from 'react'

// ── THEME CONTEXT ─────────────────────────────────────────────────
interface ThemeContextType {
  theme: 'dark' | 'light'
  toggleTheme: () => void
  colors: { bg: string; text: string; accent: string }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEMES = {
  dark: { bg: '#0A0A0F', text: '#F5F5F7', accent: '#7C3AED' },
  light: { bg: '#FFFFFF', text: '#1A1A2E', accent: '#7C3AED' },
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark'),
    colors: THEMES[theme],
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be in ThemeProvider')
  return ctx
}

// ── LANGUAGE CONTEXT ──────────────────────────────────────────────
const translations = {
  en: { greeting: 'Hello', logout: 'Logout', settings: 'Settings' },
  hi: { greeting: 'Namaste', logout: 'Logout karo', settings: 'Settings' },
  bn: { greeting: 'Nomoshkar', logout: 'Logout', settings: 'Settings' },
}

type Language = keyof typeof translations

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof translations.en) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (key: keyof typeof translations.en) => translations[language][key],
  }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be in LanguageProvider')
  return ctx
}

// ── NOTIFICATION CONTEXT ──────────────────────────────────────────
interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (msg: string, type: Notification['type']) => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useMemo(() => (msg: string, type: Notification['type']) => {
    const id = crypto.randomUUID()
    setNotifications(prev => [...prev, { id, message: msg, type }])
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000)
  }, [])

  const removeNotification = useMemo(() => (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const value = useMemo(() => ({
    notifications, addNotification, removeNotification
  }), [notifications, addNotification, removeNotification])

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {/* Toast portal */}
      <div className="fixed top-4 right-4 space-y-2">
        {notifications.map(n => (
          <div key={n.id} className={\`toast toast-\${n.type}\`}>
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotification must be in NotificationProvider')
  return ctx
}

// ── COMPOSE PROVIDERS ─────────────────────────────────────────────
function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

// Usage
function Header() {
  const { theme, toggleTheme } = useTheme()
  const { t, language, setLanguage } = useLanguage()
  const { addNotification } = useNotification()

  return (
    <header>
      <h1>{t('greeting')}</h1>
      <button onClick={toggleTheme}>{theme === 'dark' ? '🌙' : '☀️'}</button>
      <select value={language} onChange={e => setLanguage(e.target.value as Language)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
      </select>
      <button onClick={() => addNotification('Settings saved!', 'success')}>Save</button>
    </header>
  )
}`,
            explanation: 'Har context apna ek concern handle karta hai. AppProviders composite component — ek jagah sab providers nest karo, baaki app clean dikhti hai. useMemo har value mein — stable references ensure karo. Custom hooks — useTheme, useLanguage, useNotification — consumers ka implementation hide hota hai. Kisi bhi component se addNotification() call karo — toast poore app mein dikhta hai.',
          }}
          realWorldScenario="Production SaaS app — TenantProvider (tenant config, branding) wraps AuthProvider wraps ThemeProvider wraps LanguageProvider wraps NotificationProvider. Hierarchy: outer se inner. Tenant-level settings sab ke baad available. Notifications har jagah accessible. Clean layering — every concern in its place."
          commonMistakes={[
            {
              mistake: 'Provider order galat rakhna — inner context outer pe depend kare',
              why: 'AuthProvider needs ThemeProvider inside — agar bahar rakha — context undefined.',
              fix: 'Order carefully choose karo. Dependent providers andar. Independent providers bahar ya same level.',
            },
            {
              mistake: 'Context deeply nested render karna — "Context Hell"',
              why: 'Reading: 10 levels deep providers — confusing JSX tree.',
              fix: 'AppProviders composite component mein wrap karo — ek component, cleaner tree.',
            },
          ]}
          proTip="Context hell — 10 providers nesting — painful dikhta hai. Clean solution: compose helper banao. function compose(...Providers) { return ({ children }) =&gt; Providers.reduceRight((acc, P) =&gt; &lt;P&gt;{acc}&lt;/P&gt;, children) }. Use: const AppProviders = compose(ThemeProvider, AuthProvider, LanguageProvider). Ab ek line mein sab wrap. Ya react-wrap-providers npm package directly use karo — same pattern, zero boilerplate."
        />
      </div>

      <div id="context-vs-zustand">
        <ConceptCard
          title="Context vs Zustand vs Redux — Kab Kaunsa?"
          emoji="⚖️"
          difficulty="intermediate"
          whatIsIt="Seedha punchline — Context, Zustand, Redux teeno alag problems solve karte hain. Context best hai low-frequency global values ke liye (auth, theme) — built-in, no install. Zustand best hai frequent client state ke liye (cart, UI state) — selective subscriptions, no providers. Redux best hai large enterprise apps ke liye — time-travel debugging, strict patterns, middleware. Aur server state (API data) ke liye? Inmen se koi nahi — TanStack Query."
          whenToUse={[
            'Context: auth, theme, locale — rarely changing shared values',
            'Zustand: shopping cart, filters, UI state — frequent updates',
            'Redux Toolkit: large teams, time-travel debugging, strict patterns zaroori',
            'TanStack Query: server state — async data, caching, background sync',
          ]}
          whyUseIt="Practical decision guide: App 1000 lines se chhoti? useState + Context. 1000-10000 lines? Zustand add karo. 10000+ lines, badi team? Redux Toolkit. API data? Hamesha TanStack Query — koi bhi state tool nahi. Ye matrix yaad rakho — wrong tool choose karne ka cost bahut bada hota hai refactoring mein."
          howToUse={{
            filename: 'StateManagement.tsx',
            language: 'typescript',
            code: `// ── CONTEXT — Simple auth ────────────────────────────────────────
// Good for: low-frequency updates, auth, theme, i18n
const AuthContext = createContext(...)
const useAuth = () => useContext(AuthContext)

// Limitation: any change = all consumers re-render
// Solution: split contexts + useMemo

// ── ZUSTAND — Shopping cart ───────────────────────────────────────
// npm install zustand
import { create } from 'zustand'

interface CartState {
  items: CartItem[]
  total: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clear: () => void
}

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,

  addItem: (item) => set(state => {
    const existing = state.items.find(i => i.id === item.id)
    const items = existing
      ? state.items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      : [...state.items, { ...item, qty: 1 }]
    return { items, total: items.reduce((s, i) => s + i.price * i.qty, 0) }
  }),

  removeItem: (id) => set(state => {
    const items = state.items.filter(i => i.id !== id)
    return { items, total: items.reduce((s, i) => s + i.price * i.qty, 0) }
  }),

  clear: () => set({ items: [], total: 0 }),
}))

// No provider needed!
function CartIcon() {
  // Selective subscription — only items count
  const itemCount = useCartStore(state => state.items.length)
  return <span>{itemCount}</span>
}

function CartTotal() {
  // Only re-renders when total changes — not items array
  const total = useCartStore(state => state.total)
  return <span>₹{total}</span>
}

// ── REDUX TOOLKIT — Enterprise ────────────────────────────────────
// npm install @reduxjs/toolkit react-redux
import { createSlice, configureStore } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addItem: (state, action) => {
      // Immer — mutable syntax, immutable result!
      state.items.push(action.payload)
      state.total += action.payload.price
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
  }
})

// ── REACT QUERY — Server state ────────────────────────────────────
// npm install @tanstack/react-query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

function Products() {
  // Auto fetching, caching, revalidation, loading/error states
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(r => r.json()),
    staleTime: 5 * 60 * 1000,  // 5 min cache
  })

  const queryClient = useQueryClient()
  const addProduct = useMutation({
    mutationFn: (data) => fetch('/api/products', { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),  // Refetch!
  })

  if (isLoading) return <Spinner />
  if (error) return <Error />
  return <ProductList products={products} />
}`,
            explanation: 'Comparison clear karo — Context mein koi bhi change sab consumers re-render karta hai. Zustand mein selector se sirf specific slice pe subscribe karo — surgical updates. Redux mein middleware, immer, devtools — enterprise-grade. React Query mein server state ke saath staleTime, caching, background refetch — specialized server state management.',
          }}
          realWorldScenario="Real e-commerce architecture — Auth state: Context (user login, rarely changes — perfect fit). Product catalog: TanStack Query (server data, 5 minute cache, background refresh). Cart: Zustand (frequent updates — add/remove items — selective subscriptions). Theme: Context (user preference, simple). Zero Redux. Zero prop drilling. Clean separation, happy developers."
          commonMistakes={[
            {
              mistake: 'Redux for everything — even simple local state',
              why: 'Extreme boilerplate, over-engineering. Simple counter mein Redux — ridiculous.',
              fix: 'useState for local. Context for shared simple state. Zustand for complex client state. Redux sirf agar already using ya specific needs.',
            },
            {
              mistake: 'Server state client state mein store karna (Redux/Context mein API data)',
              why: 'Manual loading/error states, stale data, no caching, complex sync logic.',
              fix: 'React Query, SWR, RTK Query — server state tools. Client state (UI state, user preferences) sirf client state tools mein.',
            },
          ]}
          proTip="2025 ka practical recommendation — useState aur useReducer local state ke liye. Context auth aur theme ke liye (simple, stable). TanStack Query server state ke liye (ye game changer hai — ek baar use karo, manual useEffect fetch kabhi nahi karoge). Zustand complex client state ke liye (cart, filters). Redux sirf bade existing codebases ya very specific needs ke liye. Ye four tools mein 99% apps kaafi hain."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 9 Quiz — Context API
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — global state master karo!
          </p>
        </div>
        <QuizSection questions={contextQuiz} chapterSlug="context-api" />
      </div>
    </div>
  )
}
