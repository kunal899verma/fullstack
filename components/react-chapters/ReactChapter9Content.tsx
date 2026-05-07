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
          Context API — Prop Drilling Ka Solution
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Prop drilling — data 5-6 levels deep pass karna — painful hai. Context API React ka built-in solution hai — global-like state without props. Auth, theme, language, notifications — sab Context ke ideal use cases hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum Context setup, optimization, multiple contexts, aur Context vs Zustand vs Redux comparison cover karenge.
        </p>
      </div>

      <div id="prop-drilling-problem">
        <ConceptCard
          title="Prop Drilling Problem — Kyun Painful Hai"
          emoji="😰"
          difficulty="intermediate"
          whatIsIt="Prop drilling — data ko component tree mein 3+ levels deep pass karna props se. Middle components 'postman' ban jaate hain — unke koi kaam ka nahi data carry karte. Ek type change karo — sab intermediate components update karne padte hain. Maintainability nightmare."
          whenToUse={[
            'Problem identify karna — 3+ level prop passing',
            'Intermediate components unnecessarily aware hain data ke',
            'Type changes cascade karte hain multiple files mein',
            'Same data multiple unrelated components mein chahiye',
          ]}
          whyUseIt="Prop drilling samajhna zarooori hai — kab Context use karna hai decide karne ke liye. 1-2 levels prop passing fine hai. 3+ levels — Context consider karo. Data type change — sab files update — sign of prop drilling problem."
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
            explanation: 'Prop drilling: data har level se pass karo. Middle components unnecessarily aware. Type change = many files. Context solution: provider wraps tree, consumers directly access. Components se "postman" responsibility hata do.',
          }}
          realWorldScenario="Multi-tenant SaaS mein: tenantId, theme, language, user permissions — sab 6-7 levels deep chahiye. Prop drilling se 200+ component files mein changes. Context se: ek provider, consumers directly access. Maintenance 10x easier."
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
          proTip="Component composition prop drilling alternative hai. Bina Context: <App><Layout><Page user={user} /></Layout></App> — user sirf Page ko chahiye, Layout nahi jaanta. Children/slots pattern se deep nesting bina prop drilling. React docs mein ye pattern highlighted hai."
        />
      </div>

      <div id="create-context">
        <ConceptCard
          title="createContext + useContext — Complete Setup"
          emoji="🔧"
          difficulty="intermediate"
          whatIsIt="createContext se context object banao. Provider component mein value prop se data provide karo. useContext hook se value consume karo. TypeScript ke saath: context type define karo, default value set karo. Custom hook wrap karo useContext ko — better DX, validation."
          whenToUse={[
            'Auth state — user, token, login/logout functions',
            'Theme — dark/light mode',
            'Language/Locale — i18n',
            'Global notifications — toast system',
          ]}
          whyUseIt="Context API built-in hai — no extra library. TypeScript ke saath fully type-safe. Custom hook pattern — useAuth() clean API deta hai, implementation details hide karta hai. Agar context outside provider mein use hoa — custom hook warning throw kar sakta hai."
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
            explanation: 'createContext → Provider → useContext pattern. TypeScript: context type define karo, undefined default. Custom hook useAuth() — validation + clean API. useMemo value — stable reference. Provider app root mein wrap karo. Consumers direct access karte hain — no prop drilling.',
          }}
          realWorldScenario="Next.js app mein: AuthProvider app/layout.tsx mein wrap karo — har page accessible. Protected routes mein: const { isAuthenticated } = useAuth(); if (!isAuthenticated) redirect('/login'). Admin pages: const { user } = useAuth(); if (user.role !== 'admin') notFound()."
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
          proTip="Context testing: render component within provider in tests: render(<AuthProvider><ComponentToTest /></AuthProvider>). Ya test utilities: const renderWithAuth = (ui) => render(<AuthProvider>{ui}</AuthProvider>). Mock user inject karo: <AuthProvider initialUser={testUser}>."
        />
      </div>

      <div id="context-optimization">
        <ConceptCard
          title="Context Optimization — Unnecessary Re-renders Avoid"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Context value change pe sab consumers re-render karte hain — ek bhi value change = sab update. useMemo se value stabilize karo. Context split karo — auth aur theme alag. Selector pattern — sirf specific slice select karo. use-context-selector library se surgical updates."
          whenToUse={[
            'Context consumers bahut hain — optimization zaroori',
            'Context value frequently update hota hai',
            'Consumers sirf ek slice chahiye — poora nahi',
            'Performance profile mein context consumers slow dikhe',
          ]}
          whyUseIt="Unoptimized context — theme change pe auth consumers re-render. Over-rendering se jank. useMemo aur split contexts se consumer specific data pe re-render hote hain. Production apps mein ye optimization dramatic improvement de sakta hai."
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
            explanation: 'Split contexts — different update frequencies alag. useMemo value — stable. useReducer + Context — dispatch never changes (great for actions). Selector libraries (use-context-selector) granular subscriptions. Profile before optimize — measure actual problem.',
          }}
          realWorldScenario="Shopping app: CartContext (frequent updates — add/remove items) + UserContext (rare — login) + ThemeContext (user preference) — split. Cart consumers re-render sirf cart change pe. User ko theme change se koi fark nahi. Better performance, cleaner code."
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
          proTip="React Compiler (upcoming) automatic memoization karega — Context optimization manual nahi karna padega. Abhi Zustand/Jotai consider karo complex global state ke liye — built-in selector support, no boilerplate, atomic updates."
        />
      </div>

      <div id="multiple-contexts">
        <ConceptCard
          title="Multiple Contexts — Auth, Theme, Language"
          emoji="🎛️"
          difficulty="intermediate"
          whatIsIt="Real apps mein multiple contexts: AuthContext, ThemeContext, LanguageContext, NotificationContext — har ek alag concern handle karta hai. Provider nesting ke saath — compose karo. Custom hooks se clean API. Each context independent — update frequency alag, consumers alag."
          whenToUse={[
            'Auth — user, permissions, login state',
            'Theme — dark/light, color scheme',
            'Language — locale, translations',
            'Notifications — toast, banners',
          ]}
          whyUseIt="Separation of concerns — each context ek responsibility. Theme change karo — auth consumers unaffected. Auth logout karo — theme same rahti hai. Testing easier — sirf relevant context mock karo. Team different contexts parallel develop kar sakti hai."
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
            explanation: 'Each context alag concern. Provider compose karo — nesting. Custom hooks clean API. AppProviders component se provider composition centralize karo. Notifications bhi context mein — any component se toast trigger karo. useMemo har value stabilize karta hai.',
          }}
          realWorldScenario="Production SaaS: AuthProvider (user, permissions) + TenantProvider (tenant config, branding) + ThemeProvider (dark/light) + LanguageProvider (i18n) + NotificationProvider (toasts). Hierarchy: tenant → auth → theme → lang → notif → app. Cleanly layered."
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
          proTip="react-wrap-providers library ya custom compose helper: function compose(...providers) { return ({ children }) => providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children) }. Clean single component instead of nesting."
        />
      </div>

      <div id="context-vs-zustand">
        <ConceptCard
          title="Context vs Zustand vs Redux — Kab Kaunsa?"
          emoji="⚖️"
          difficulty="intermediate"
          whatIsIt="Context: built-in, simple shared state, best for low-frequency updates (auth, theme). Zustand: minimal library, excellent performance, selective subscriptions, no providers. Redux: enterprise, time-travel debugging, middleware, complex patterns. Jotai/Recoil: atomic state — fine-grained reactivity."
          whenToUse={[
            'Context: auth, theme, locale — simple, rarely changing',
            'Zustand: shopping cart, UI state, frequent updates',
            'Redux: large teams, complex state, time-travel debugging zaroori',
            'React Query: server state — async data, caching, sync',
          ]}
          whyUseIt="Right tool right job. Context simple setup, no dependencies. Zustand excellent DX, minimal code, no provider needed. Redux powerful lekin verbose. React Query async state ke liye — manual useEffect fetch replace karo. Most apps: Context + React Query kaafi hai."
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
            explanation: 'Context: simple, built-in, low-frequency. Zustand: excellent for client state, selective subscriptions, no boilerplate. Redux: enterprise, middleware, time-travel. React Query: server state — async data management. Most apps need Context + React Query, sometimes Zustand. Redux rarely needed today.',
          }}
          realWorldScenario="E-commerce: Auth → Context (user login, rarely changes). Product catalog → React Query (server data, cache). Cart → Zustand (frequent updates, selective subscriptions). Theme → Context (user preference). Zero Redux. Clean separation, right tool right job."
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
          proTip="2024 recommendation: useState + useReducer for local state. Context for simple shared state (auth, theme). React Query/TanStack Query for server state. Zustand for complex client-side shared state. Redux sirf large enterprise apps ya already existing codebases mein. Jotai/Recoil — fine-grained reactivity ke liye."
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
