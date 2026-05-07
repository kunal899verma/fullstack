'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'Redux Toolkit aur plain Redux mein sabse bada fark kya hai?',
    options: [
      { text: 'RTK zyada slow hai', correct: false, explanation: 'RTK performance same hai — boilerplate kam hai.' },
      { text: 'RTK mein createSlice se reducer aur actions ek saath define hote hain — mutating syntax allowed hai (Immer under the hood)', correct: true, explanation: 'Sahi! createSlice se actions automatically generate hote hain. state.value++ jaise mutations likh sakte ho — Immer internally immutable update karta hai.' },
      { text: 'RTK sirf TypeScript ke liye hai', correct: false, explanation: 'RTK JavaScript aur TypeScript dono mein kaam karta hai.' },
      { text: 'RTK mein useSelector nahi hota', correct: false, explanation: 'useSelector RTK mein bhi waise hi kaam karta hai.' },
    ],
  },
  {
    question: 'createSlice mein reducers aur extraReducers mein kya fark hai?',
    options: [
      { text: 'Koi fark nahi — dono same hain', correct: false, explanation: 'Dono alag use cases ke liye hain.' },
      { text: 'reducers: slice ke apne actions; extraReducers: doosre slices ya createAsyncThunk ke actions handle karo', correct: true, explanation: 'Sahi! reducers se apne actions auto-generate hote hain. extraReducers se thunk pending/fulfilled/rejected ya doosri slice ki actions handle karo.' },
      { text: 'extraReducers sirf error handling ke liye hai', correct: false, explanation: 'extraReducers kisi bhi external action handle karne ke liye hai.' },
      { text: 'reducers async operations ke liye hai', correct: false, explanation: 'reducers synchronous hai — async ke liye createAsyncThunk use karo.' },
    ],
  },
  {
    question: 'useSelector ko optimize kab karna padta hai?',
    options: [
      { text: 'Kabhi nahi — Redux automatically optimize karta hai', correct: false, explanation: 'useSelector har re-render pe run karta hai — optimization zaroori ho sakta hai.' },
      { text: 'Jab selector expensive computation kare — createSelector (memoized selector) use karo', correct: true, explanation: 'Sahi! createSelector Reselect library se — input selectors change na karein toh cached result return karta hai. Derived data ke liye zaroori.' },
      { text: 'useSelector ko kabhi directly use mat karo', correct: false, explanation: 'Simple state reads ke liye useSelector direct theek hai.' },
      { text: 'Sirf large arrays ke saath', correct: false, explanation: 'Koi bhi expensive computation (filter, sort, transform) memoize karo.' },
    ],
  },
  {
    question: 'createAsyncThunk mein pending, fulfilled, rejected states kahan handle karte hain?',
    options: [
      { text: 'Component mein useEffect ke andar', correct: false, explanation: 'Ye states Redux store mein handle hoti hain, component mein nahi.' },
      { text: 'Slice ke extraReducers mein — builder.addCase se', correct: true, explanation: 'Sahi! extraReducers mein builder.addCase(thunk.pending, ...).addCase(thunk.fulfilled, ...).addCase(thunk.rejected, ...) — loading/success/error state store mein track hoti hai.' },
      { text: 'createAsyncThunk ke callback function mein', correct: false, explanation: 'Callback mein async logic hai — state updates slice mein.' },
      { text: 'Redux middleware mein', correct: false, explanation: 'RTK middleware automatically handle karta hai — explicitly write nahi karna.' },
    ],
  },
  {
    question: 'RTK Query aur createAsyncThunk mein kab kya use karo?',
    options: [
      { text: 'Hamesha createAsyncThunk use karo', correct: false, explanation: 'RTK Query API calls ke liye zyada convenient aur powerful hai.' },
      { text: 'RTK Query: REST/GraphQL API calls ke liye (caching, refetching automatic); createAsyncThunk: custom async logic ke liye', correct: true, explanation: 'Sahi! RTK Query opinionated but powerful — caching, invalidation, loading states automatic. createAsyncThunk general async operations ke liye — form submissions, file uploads, complex logic.' },
      { text: 'RTK Query sirf Next.js mein kaam karta hai', correct: false, explanation: 'RTK Query kisi bhi React app mein kaam karta hai.' },
      { text: 'createAsyncThunk RTK Query se replace ho gaya', correct: false, explanation: 'Dono coexist karte hain — different use cases hain.' },
    ],
  },
  {
    question: 'Redux DevTools mein "time travel debugging" kya hota hai?',
    options: [
      { text: 'Future actions predict karna', correct: false, explanation: 'Time travel debugging future ke baare mein nahi hai.' },
      { text: 'Previous actions pe wapas jaana aur us waqt ka state dekhna — bugs reproduce karna', correct: true, explanation: 'Sahi! Har action ka before/after state stored rehta hai. Slider se undo/redo karo — exact bug ki state recreate karo. Redux ka biggest debugging advantage.' },
      { text: 'Performance profiling', correct: false, explanation: 'Performance profiling React DevTools mein hota hai.' },
      { text: 'Sirf errors show karna', correct: false, explanation: 'DevTools state, actions, diffs — sab show karta hai, sirf errors nahi.' },
    ],
  },
]

function ReduxFlowDiagram() {
  const steps = [
    { label: 'Component', sublabel: 'dispatch(action)', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', icon: '🖥️' },
    { label: 'Store', sublabel: 'Redux ka central state', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '🗄️' },
    { label: 'Reducer (Slice)', sublabel: 'state update karo', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: '⚙️' },
    { label: 'New State', sublabel: 'immutable update', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: '✅' },
    { label: 'useSelector', sublabel: 'component re-renders', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', icon: '🔄' },
  ]
  return (
    <div className="my-6">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">
        Redux Data Flow — Unidirectional
      </p>
      <div className="max-w-sm mx-auto space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <div
              className="rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ background: step.bg, border: `1px solid ${step.border}` }}
            >
              <span className="text-lg">{step.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: step.color }}>{step.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{step.sublabel}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-0.5">
                <span className="text-[#71717A] text-xs">↓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ReduxVsZustandTable() {
  const rows = [
    { feature: 'Boilerplate', redux: 'RTK se bahut kam', zustand: 'Minimal' },
    { feature: 'Bundle size', redux: '~50KB (RTK + React-Redux)', zustand: '~8KB' },
    { feature: 'DevTools', redux: '✅ Excellent (time travel)', zustand: '⚠️ Limited' },
    { feature: 'Learning curve', redux: 'Medium (concepts zyada)', zustand: 'Very easy' },
    { feature: 'Async handling', redux: 'createAsyncThunk / RTK Query', zustand: 'Direct (no boilerplate)' },
    { feature: 'Middleware', redux: '✅ Full middleware support', zustand: '⚠️ Limited' },
    { feature: 'Best for', redux: 'Large teams, complex flows', zustand: 'Small-medium apps' },
    { feature: 'TypeScript', redux: '✅ Excellent first-class', zustand: '✅ Good' },
  ]
  return (
    <div className="my-5 overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <th className="text-left px-4 py-3 text-[#71717A] font-bold uppercase tracking-wider">Feature</th>
            <th className="text-left px-4 py-3 font-bold" style={{ color: '#7C3AED' }}>Redux Toolkit</th>
            <th className="text-left px-4 py-3 font-bold" style={{ color: '#F59E0B' }}>Zustand</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
              <td className="px-4 py-3 text-[#71717A] font-medium">{row.feature}</td>
              <td className="px-4 py-3 text-[#A1A1AA]">{row.redux}</td>
              <td className="px-4 py-3 text-[#A1A1AA]">{row.zustand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ReactChapter19Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Redux Toolkit — Production-Grade State Management
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Redux — ye naam sunke log darte kyun hain? Kyunki unhone Redux boilerplate wala purana version dekha tha. Action types constants, action creators, switch-case reducers, combineReducers — 200 lines likho ek feature ke liye. Redux Toolkit ke saath Redux ab actually enjoyable hai — aaj prove karenge!
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          RTK ne sab boilerplate khatam kar diya — <code className="text-[#7C3AED]">createSlice</code> se actions automatic generate hoti hain, <code className="text-[#7C3AED]">configureStore</code> se DevTools automatic on, Immer se mutations safe. Aur RTK Query? TanStack Query jaisi caching, bina extra library ke. Is chapter mein RTK ka poora modern arsenal seekhenge.
        </p>
      </div>

      <ReduxFlowDiagram />

      <div id="why-redux">
        <ConceptCard
          title="Kyun Redux? — Zustand vs Redux Decision"
          emoji="🤔"
          difficulty="intermediate"
          whatIsIt="Redux ka core idea padhne mein simple lagta hai — poori app ka state ek jagah. Action dispatch karo — state change hoti hai. Koi aur rasta nahi. Ye predictability ka fayda kya hai? Kal bug aaya — Redux DevTools kholo, exact actions replay karo, exact state pe jaao. Bug reproduce karna 5 minutes. Bina Redux ke? 'Kaunsa component ne state change kiya?' — detective work ghanton ka. RTK ye sab modern syntax mein — kam code, same power."
          whenToUse={[
            'Large teams jahan predictability important hai',
            'Complex async flows (multiple dependent API calls)',
            'Time-travel debugging production bugs ke liye',
            'Enterprise apps jahan strict data flow enforce karna ho',
          ]}
          whyUseIt="Zustand vs Redux — sach bolun toh dono acche hain. Zustand: 8KB, minimal setup, small-medium apps perfect. Redux: 50KB, more concepts, lekin time-travel debugging ka koi jawab nahi. Large teams mein Redux ka unidirectional flow enforce karta hai — koi bhi kisi bhi component se koi bhi state secretly change nahi kar sakta. Sab actions logged. Ye auditability enterprise apps ke liye invaluable hai. Tool sahi problem ke liye choose karo."
          howToUse={{
            code: `# Installation
npm install @reduxjs/toolkit react-redux

# Folder structure (Feature-based — recommended)
src/
  store/
    index.ts          # configureStore
  features/
    counter/
      counterSlice.ts  # createSlice
    auth/
      authSlice.ts
      authThunks.ts   # createAsyncThunk
    posts/
      postsApi.ts     # RTK Query

# When to use Redux vs Zustand:
# Redux: Large team, complex flows, time-travel debugging zaroori
# Zustand: Small team, simple global state, minimal boilerplate
# Context: Rarely changing data (theme, auth user)`,
            language: 'bash',
            explanation: 'Plain redux install mat karo — ye 2015 ka approach tha. RTK official recommended way hai Redux team ka. npm install @reduxjs/toolkit react-redux — dono chahiye. Folder structure: feature-based rakho — /features/auth mein authSlice.ts, /features/posts mein postsApi.ts. Sab related code ek jagah. New slice add karna? New folder banao, store mein reducer add karo — done.',
            filename: 'setup.sh',
          }}
          realWorldScenario="Large Indian tech companies — Flipkart, Swiggy, Zepto — inke scale pe Redux ka unidirectional flow ensure karta hai ki 100 developers ek saath kaam kar rahe hain, koi bhi unexpectedly state corrupt nahi kar sakta. New engineer join kiya — DevTools khola, actions dekhe, sab samajh aaya. Side projects mein? Zustand — 5 minute setup, minimal overhead, chill. Context samjho, phir decide karo."
          commonMistakes={[
            { mistake: 'Har cheez Redux mein daalna', why: 'Server state (API data) → RTK Query. Local UI state (modal open/close) → useState', fix: 'Redux mein sirf truly global, shared state rakho — form state, UI state local rakhna better hai' },
          ]}
          proTip="Decision rule easy hai — ek component use karta hai? useState. Few components share? Context ya Zustand. Complex async flows, large team, time-travel debugging zaroori? Redux Toolkit. Ye rule 95% decisions cover karta hai. Baaki 5% mein? Document karo kyun normal rule fit nahi hua — future you ko thanks milega."
        />
      </div>

      <div id="store-setup">
        <ConceptCard
          title="configureStore — Store Setup"
          emoji="🗄️"
          difficulty="intermediate"
          whatIsIt="configureStore — ek function, sab kuch setup. Plain Redux mein kya karna padta tha? combineReducers manually, createStore, applyMiddleware, DevTools enhancer manually connect karo — 30 lines boilerplate. RTK mein? configureStore ek object — reducer key mein apni slices dalo. DevTools automatically on. Thunk middleware automatically on. Serializability checks automatically on. Ek function call — poora Redux ready."
          whenToUse={[
            'App ka root level — ek baar setup',
            'New slices add karne ke liye reducer mein',
          ]}
          whyUseIt="TypeScript users ke liye RootState aur AppDispatch types — ye two lines critical hain. RootState = store ka poora type. AppDispatch = dispatch function ka type — thunk aware. useAppSelector aur useAppDispatch typed hooks banao ek baar — poori app mein yahi use karo. Koi bhi selector likhoge toh state ka type automatically milega. Type errors at compile time, not runtime. Safety net free mein."
          howToUse={{
            code: `// store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import authReducer from '../features/auth/authSlice'
import postsReducer from '../features/posts/postsSlice'
import { postsApi } from '../features/posts/postsApi'  // RTK Query

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    posts: postsReducer,
    [postsApi.reducerPath]: postsApi.reducer,  // RTK Query
  },
  // middleware automatically includes thunk + RTK Query middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
})

// TypeScript: RootState aur AppDispatch types derive karo
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Typed hooks — poori app mein yahi use karo
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// main.tsx / index.tsx mein Provider wrap karo
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)`,
            language: 'typescript',
            explanation: 'Step by step trace — configureStore call hota hai, internally DevTools setup hota hai, thunk middleware add hota hai. reducer key mein jo objects diye — woh combine hote hain. counter: counterReducer matlab state.counter se counterSlice ka state milega. RootState kya hai? ReturnType<typeof store.getState> — TypeScript se automatically derive karo, manually likhne ki zaroorat nahi. AppDispatch similarly derived. useAppSelector typed hook — state argument ka type automatically RootState hoga, intellisense sab selectors mein milega.',
            filename: 'store/index.ts',
          }}
          realWorldScenario="Project start karo — store ek baar setup karo. Kal naya feature banao, naya slice banao — store mein ek line add karo reducer mein. RootState automatically update ho jaata hai, naye slice ki state accessible ho jaati hai poori app mein. TypeScript sab catch karta hai. Team mein koi bhi naya slice add kare — store setup change nahi hota, bas reducer key add hoti hai. Ye scalability hai."
          commonMistakes={[
            { mistake: 'useSelector directly use karna bina typed hook ke', why: 'TypeScript type inference kaam nahi karta properly', fix: 'useAppSelector hook banao: export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector' },
          ]}
          proTip="User ka cart browser close karne ke baad bhi yaad rakhni hai? redux-persist library install karo. persistReducer + persistStore — 10 lines. App reload karo — cart wapas aa jaata hai localStorage se. Selective persistence bhi possible — sirf cart persist karo, UI state nahi. Ye small detail hai jo UX dramatically improve karta hai — user ki mehnat kabhi nahi jaati."
        />
      </div>

      <div id="create-slice">
        <ConceptCard
          title="createSlice — Reducer + Actions Ek Saath"
          emoji="🍕"
          difficulty="intermediate"
          whatIsIt="createSlice — yaar ye ek revolution tha Redux ke liye. Pehle kya hota tha? Ek feature ke liye — actionTypes.ts (constants), actionCreators.ts (functions), reducer.ts (switch-case) — teen files, 100+ lines. createSlice se? Ek file, ek function call — actions automatic generate hoti hain, reducer automatic ban jaata hai. Immer included — state.value++ likh sako directly. Ye boilerplate ka end tha."
          whenToUse={[
            'Har feature ke liye ek slice banao',
            'Synchronous state updates ke liye',
            'Loading/error states track karne ke liye',
          ]}
          whyUseIt="Immer magic samjho — state.value += 1 kaise safe hai? Immer tumhare reducer ko proxy wrap karta hai. Tumhara mutation detect karta hai. Internally immutable update generate karta hai. Redux store actually immutable rehta hai — Immer ne convert kar diya. Tum sirf natural JavaScript likh rahe ho — baaki Immer ka kaam. Ye developer experience tha jo Redux mein miss tha — RTK ne fix kar diya."
          howToUse={{
            code: `// features/counter/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
  status: 'idle' | 'loading' | 'failed'
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Immer ki wajah se direct mutation allowed!
    increment: (state) => {
      state.value += 1  // Immer internally immutable update karta hai
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    reset: (state) => {
      state.value = 0
    },
  },
})

// Actions automatically generated!
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions

// Selector
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer

// ── Component mein use karo ───────────────────────────────────────────

import { useAppDispatch, useAppSelector } from '@/store'
import { increment, decrement, incrementByAmount, selectCount } from './counterSlice'

function Counter() {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>+10</button>
    </div>
  )
}`,
            language: 'typescript',
            explanation: 'Deep dive — createSlice internally kya karta hai? name + reducers key se action types generate karta hai: counter/increment, counter/decrement. Action creators bhi generate karta hai: increment() call karo — { type: "counter/increment" } milta hai. Ye sab counterSlice.actions mein available hain. counterSlice.reducer ek standard Redux reducer hai — switch-case internally generate hua, tum nahi likha. Component mein dispatch(increment()) — clean, no string action types, no boilerplate. Selectors co-locate karo — selectCount wahan define karo jahan state define hai.',
            filename: 'features/counter/counterSlice.ts',
          }}
          realWorldScenario="Auth slice mein — login, logout, setUser, setToken actions. Har action ek reducer function — clean, testable. Cart slice mein — addItem, removeItem, updateQuantity, clearCart. Ek feature ka kaam? Apni slice mein. Bug? Sirf us slice mein dhundho. New developer? Slice padhega — poora feature samajh jaayega. Isolation ka ye fayda sirf code organization nahi, mental clarity bhi hai."
          commonMistakes={[
            { mistake: 'Slice ke bahar state directly mutate karna', why: 'Redux state immutable hona chahiye — direct mutation bugs create karta hai', fix: 'Sirf reducer functions ke andar Immer magic kaam karta hai — bahar spread operator use karo' },
          ]}
          proTip="Selector co-location pattern — selectCartTotal, selectUserName, selectIsAuthenticated — sab slice file mein define karo. Component mein? useAppSelector(selectCartTotal) — ek line. Component bilkul dumb rehta hai — sirf render karta hai. Logic selector mein — testable, reusable, co-located. Kal cart logic change karo — sirf cartSlice.ts mein jaao. Component touch nahi karna. Separation of concerns ka real-world benefit."
        />
      </div>

      <div id="async-thunk">
        <ConceptCard
          title="createAsyncThunk — Async Operations"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="Async operation Redux mein kaise? Reducer synchronous hai — async nahi ho sakta. Solution: thunk — ek function jo dispatch receive karta hai, async operation karta hai, phir actions dispatch karta hai. createAsyncThunk ye pattern formalize karta hai. Automatic pending, fulfilled, rejected actions milti hain — loading state, success state, error state — sab trackable hain Redux DevTools mein. Koi magic nahi — sirf structured pattern."
          whenToUse={[
            'API calls jinka result store mein save karna ho',
            'Complex async flows (multiple API calls chain)',
            'Loading/error states Redux mein track karne ke liye',
          ]}
          whyUseIt="Component mein async logic rakhne ka problem kya hai? Ek component mein fetch hai, loading state hai, error handling hai, navigation hai — ek component 100+ lines ka ho jaata hai. createAsyncThunk se? Async logic slice mein — component sirf loading/error/data state read karta hai. Component thin, logic testable, Redux DevTools mein har step visible. Ek aur benefit — agar multiple components same data chahte hain, ek dispatch, sab update."
          howToUse={{
            code: `// features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

// createAsyncThunk — type, async function
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) {
        const error = await response.json()
        return rejectWithValue(error.message)
      }
      return await response.json()  // User object
    } catch (err) {
      return rejectWithValue('Network error')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null } as AuthState,
  reducers: {
    logout: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout } = authSlice.actions

// Component mein use karo
function LoginForm() {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.auth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(loginUser({ email, password }))
    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard')  // success
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      <button disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}`,
            language: 'typescript',
            explanation: 'Under the hood — dispatch(loginUser(credentials)) call karte ho. createAsyncThunk pehle auth/loginUser/pending dispatch karta hai — extraReducers mein loading = true. Async function run hoti hai. Success? auth/loginUser/fulfilled dispatch — user = action.payload. Fail? rejectWithValue call karo — auth/loginUser/rejected dispatch — error = message. Ye teen actions automatically DevTools mein dikhti hain — debugging mein clear visibility milti hai kya hua. Component mein loginUser.fulfilled.match(result) — dispatch ka return value check karo — navigation conditionally karo.',
            filename: 'features/auth/authSlice.ts',
          }}
          realWorldScenario="Checkout flow — teen async steps chain karo. validateCart thunk — pending (checking...), fulfilled (valid), rejected (out of stock). processPayment thunk — pending (processing payment...), fulfilled (charged), rejected (card declined). updateInventory thunk — backend update. DevTools mein sab steps visible — kahan fail hua? Exactly dikh jaata hai. UI har step pe user ko feedback deta hai — loading state, error state, success. No confusion, no blank screen."
          commonMistakes={[
            { mistake: 'try/catch ke andar throw karna reject karne ke liye', why: 'thunk mein throw se rejected nahi milta — createAsyncThunk internally catch karta hai', fix: 'rejectWithValue() use karo explicitly: return rejectWithValue(errorMessage)' },
          ]}
          proTip="unwrap() — ye RTK ka hidden gem hai. dispatch(loginUser(creds)).unwrap() — rejected ho toh throw karta hai, fulfilled ho toh data return karta hai. try/catch mein wrap karo — clean async/await pattern. Bina unwrap() ke rejected action silently fail ho jaata hai, error component mein manually check karna padta hai. unwrap() se promise-style error handling milti hai — modern async code jaisa feel."
        />
      </div>

      <div id="rtk-query">
        <ConceptCard
          title="RTK Query — API Calls Ke Liye Best Tool"
          emoji="🚀"
          difficulty="advanced"
          whatIsIt="RTK Query — ye woh moment hai jab Redux ne kaha 'TanStack Query ka challenge accept hai.' Automatic caching, automatic refetching, loading states, cache invalidation — sab built-in. Aur ye Redux store mein hai — client state aur server state ek jagah. TanStack Query se zyada opinionated lekin agar already Redux use kar rahe ho toh extra library nahi chahiye. createApi ek baar likhlo — hooks automatically generate ho jaate hain. Ye magic hai."
          whenToUse={[
            'REST API calls jahan caching important ho',
            'Automatic cache invalidation chahiye (create → list auto-refetch)',
            'Server state aur client state dono Redux mein chahiye',
          ]}
          whyUseIt="createAsyncThunk se 50 lines likhte ho — API call, loading state, error state, caching manually. RTK Query se? createApi mein endpoint define karo — 5 lines. Hook automatically milta hai — useGetPostsQuery(). Loading? isLoading. Error? isError. Data? data. Refetch? refetch(). Cache hit? Automatic, zero code. Post create karo, getPosts invalidate karo — automatic refetch. Ye sab zero extra code mein. Design decision: REST API ke liye RTK Query, complex custom async logic ke liye createAsyncThunk."
          howToUse={{
            code: `// features/posts/postsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      // Auth token automatically add karo
      const token = (getState() as RootState).auth.token
      if (token) headers.set('Authorization', \`Bearer \${token}\`)
      return headers
    },
  }),
  tagTypes: ['Post'],  // Cache invalidation ke liye tags
  endpoints: (builder) => ({
    // Query — data fetch karo
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => \`/posts/\${id}\`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    // Mutation — data change karo
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Post'],  // getPosts automatically refetch ho jaayega!
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({ url: \`/posts/\${id}\`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
})

// Auto-generated hooks
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsApi

// Component mein use karo
function PostsList() {
  const { data: posts, isLoading, isError, refetch } = useGetPostsQuery()
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error fetching posts</p>

  return (
    <div>
      {posts?.map(post => <PostCard key={post.id} post={post} />)}
      <button
        onClick={() => createPost({ title: 'New Post', body: '...' })}
        disabled={isCreating}
      >
        Add Post
      </button>
    </div>
  )
}`,
            language: 'typescript',
            explanation: 'Tagging system samjho — ye RTK Query ka brain hai. providesTags: ["Post"] matlab getPosts cached data "Post" tag se label hai. createPost mein invalidatesTags: ["Post"] — ye tag wala sab cache stale ho jaata hai. Next useGetPostsQuery run hota hai — fresh fetch. Ye automatic cache invalidation hai bina koi manual refetch call kiye. prepareHeaders se auth token har request mein automatically add hota hai — koi baar baar headers set karne ka kaam nahi. Hooks useGetPostsQuery, useCreatePostMutation — ye automatically generate hoti hain endpoint names se.',
            filename: 'features/posts/postsApi.ts',
          }}
          realWorldScenario="E-commerce listings page — useGetProductsQuery se products automatic fetch, cached hain, component re-mount pe re-fetch nahi hota. useAddToCartMutation se cart add karo — invalidatesTags: ['Cart'] — cart count badge automatically update. useGetCartQuery — fresh cart data. Zero manual refetch kala. Ek page pe 3 API calls hain, sab cached, sab synchronized through tags. Ye production-grade API management hai."
          commonMistakes={[
            { mistake: 'RTK Query reducerPath store mein add karna bhool jaana', why: 'Cache work nahi karega — RTK Query ka state nowhere to live', fix: 'configureStore reducer mein [postsApi.reducerPath]: postsApi.reducer aur middleware mein postsApi.middleware' },
          ]}
          proTip="Real-time data bina WebSocket ke? pollingInterval option — useGetPostsQuery(undefined, { pollingInterval: 30000 }) — har 30 seconds pe background mein refetch. Tab focus hone par bhi refetch — refetchOnFocus: true. Network reconnect pe — refetchOnReconnect: true. Ye options stock prices, notifications, live dashboards ke liye perfect hain — simple polling, zero complexity."
        />
      </div>

      <div id="redux-vs-zustand">
        <h2 className="text-xl font-display font-bold text-[#F5F5F7] mb-4">Redux Toolkit vs Zustand — Comparison</h2>
        <ReduxVsZustandTable />
        <ConceptCard
          title="Redux DevTools — Time Travel Debugging"
          emoji="🕰️"
          difficulty="intermediate"
          whatIsIt="Redux DevTools — ye feature akele Redux ko justify karta hai large apps ke liye. Chrome extension install karo — Redux DevTools. Ab har action log hoti hai. Action ka payload kya tha? Before/after state diff kya tha? Timeline pe slider drag karo — past state mein jaao. Ek bug hai — user ek specific set of actions karta hai toh crash hota hai. DevTools mein exact sequence replay karo — bug reproduce, debug, fix. Ye time-travel debugging hai aur ye genuinely useful hai production debugging mein."
          whenToUse={[
            'Production bugs reproduce karne ke liye',
            'State changes track karne ke liye development mein',
            'Team ko explain karne ke liye ki app state kaise change hoti hai',
          ]}
          whyUseIt="Console.log debugging — state print karo, action print karo, manually trace karo. Time: 30 minutes. DevTools mein — actions list dekho, state diff dekho, specific action pe click karo, woh state recreate ho jaata hai. Time: 3 minutes. 10x faster debugging. Aur createSelector se expensive derived state memoize karo — cartItems ya products change na hoon toh selectCartTotal recalculate nahi hoga. Har render pe heavy computation nahi — performance free mein."
          howToUse={{
            code: `// Redux DevTools automatically enabled hai RTK mein development mode mein
// Browser extension: "Redux DevTools" install karo Chrome/Firefox mein

// configureStore mein customize karo:
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',  // production mein off
})

// DevTools features:
// 1. Action log — har action ka type aur payload
// 2. State diff — exactly kya change hua
// 3. Time travel — slider se states navigate karo
// 4. Import/Export — bug reproduce karne ke liye state export karo

// Production logging ke liye (optional):
// Redux Logger middleware:
import logger from 'redux-logger'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === 'development'
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
})

// Memoized selectors — createSelector (Reselect)
import { createSelector } from '@reduxjs/toolkit'

const selectCartItems = (state: RootState) => state.cart.items
const selectProducts = (state: RootState) => state.products.items

// Expensive derived data memoize karo
export const selectCartTotal = createSelector(
  [selectCartItems, selectProducts],
  (cartItems, products) => {
    return cartItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId)
      return total + (product?.price ?? 0) * item.quantity
    }, 0)
  }
)
// selectCartTotal tab hi recalculate hoga jab cartItems ya products change ho`,
            language: 'typescript',
            explanation: 'DevTools automatically on hai development mein — koi setup nahi. Production mein devTools: process.env.NODE_ENV !== "production" — security ke liye off karo. createSelector — Reselect library ka part, RTK mein built-in. Input selectors — ye check karte hain kya inputs change hue. Nahi hue? Cached result return. Hue? Recalculate. selectCartTotal har render pe reduce() nahi chalega — sirf jab cartItems ya products actually change ho. React.memo jaisa, but for derived state.',
            filename: 'store/index.ts',
          }}
          realWorldScenario="Customer ne bug report kiya — Mumbai se call aaya, cart total wrong aa raha hai. Bina DevTools ke: reproduce karna, manually same actions karna, state track karna — 2 ghante. DevTools ke saath: customer ka session state export karo (DevTools mein Import/Export button hai), teammate ko share karo, exact state import karo, replay karo — bug milgaya, 5 minutes mein fixed. Ye DevTools ka real production value hai."
          commonMistakes={[
            { mistake: 'Production mein Redux DevTools on rakhna', why: 'Sensitive state data browser extension mein visible hoti hai — security risk', fix: 'devTools: process.env.NODE_ENV !== "production" — always conditional enable karo' },
          ]}
          proTip="Redux DevTools mein 'Dispatcher' tab explore karo — manually actions dispatch karo bina UI touch kiye. addItem action dispatch karo cart empty state se — UI kaise behave karta hai test karo instantly. Yahi hai rapid prototyping. Edge cases test karo — 50 items cart mein, negative quantity, special characters in names. UI banana ke baad nahi — state directly manipulate karo pehle. Development speed 2x."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="redux-toolkit" />
    </div>
  )
}
