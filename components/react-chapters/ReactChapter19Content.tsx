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
          Redux ek predictable state container hai — poori app ka state ek jagah, changes sirf actions se. Redux Toolkit (RTK) ne boilerplate drastically kam kar diya — ab Redux likhna actually enjoyable hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum RTK ka modern approach sikhenge — <code className="text-[#7C3AED]">configureStore</code>, <code className="text-[#7C3AED]">createSlice</code>, async thunks, RTK Query, aur Redux DevTools.
        </p>
      </div>

      <div id="why-redux">
        <ConceptCard
          title="Kyun Redux? — Zustand vs Redux Decision"
          emoji="🤔"
          difficulty="intermediate"
          whatIsIt="Redux ek flux-inspired state management pattern hai — single source of truth, unidirectional data flow, time-travel debugging. RTK Redux ka modern, opinionated version hai."
          whenToUse={[
            'Large teams jahan predictability important hai',
            'Complex async flows (multiple dependent API calls)',
            'Time-travel debugging production bugs ke liye',
            'Enterprise apps jahan strict data flow enforce karna ho',
          ]}
          whyUseIt="Redux DevTools se har action track hoti hai — bug reproduce karna easy. Large teams mein state changes predictable hoti hain. RTK Query se API caching automatic ho jaati hai."
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
            explanation: 'Feature-based folder structure recommended hai — har feature ka apna slice. RTK install karo, plain redux nahi — RTK official recommended way hai.',
            filename: 'setup.sh',
          }}
          realWorldScenario="Flipkart, Swiggy jaise large apps mein Redux — hundreds of developers ek codebase pe. State flow predictable rehti hai, onboarding easy hoti hai. Side projects ke liye Zustand prefer karo."
          commonMistakes={[
            { mistake: 'Har cheez Redux mein daalna', why: 'Server state (API data) → RTK Query. Local UI state (modal open/close) → useState', fix: 'Redux mein sirf truly global, shared state rakho — form state, UI state local rakhna better hai' },
          ]}
          proTip="Rule of thumb: agar sirf ek component use karta hai — useState. Kuch components share karte hain — Context ya Zustand. Complex flows, large team — Redux Toolkit."
        />
      </div>

      <ReduxFlowDiagram />

      <div id="store-setup">
        <ConceptCard
          title="configureStore — Store Setup"
          emoji="🗄️"
          difficulty="intermediate"
          whatIsIt="configureStore Redux DevTools aur thunk middleware automatically setup karta hai. Saari slices yahan combine hoti hain."
          whenToUse={[
            'App ka root level — ek baar setup',
            'New slices add karne ke liye reducer mein',
          ]}
          whyUseIt="Plain Redux combineReducers + createStore se zyada convenient. DevTools, thunk, serializability checks automatically on hote hain."
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
            explanation: 'configureStore ek object leta hai reducer key ke saath. RootState aur AppDispatch automatically derived. useAppSelector aur useAppDispatch typed hooks banao — poori app mein yahi use karo.',
            filename: 'store/index.ts',
          }}
          realWorldScenario="Store file ek baar setup karo — baad mein sirf naye slices ka reducer add karte jaao. TypeScript types automatically update hoti hain — extra effort zero."
          commonMistakes={[
            { mistake: 'useSelector directly use karna bina typed hook ke', why: 'TypeScript type inference kaam nahi karta properly', fix: 'useAppSelector hook banao: export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector' },
          ]}
          proTip="Redux Persist ke saath localStorage sync: redux-persist + persistReducer + persistStore. App reload pe state restore hoti hai automatically."
        />
      </div>

      <div id="create-slice">
        <ConceptCard
          title="createSlice — Reducer + Actions Ek Saath"
          emoji="🍕"
          difficulty="intermediate"
          whatIsIt="createSlice ek function hai jo slice name, initial state, aur reducers leke automatically actions aur reducer generate karta hai."
          whenToUse={[
            'Har feature ke liye ek slice banao',
            'Synchronous state updates ke liye',
            'Loading/error states track karne ke liye',
          ]}
          whyUseIt="Plain Redux mein action types constants, action creators, switch-case reducer — alag-alag files mein. createSlice sab ek jagah — much cleaner."
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
            explanation: 'createSlice se actions automatically export hoti hain. state.value += 1 — Immer se mutation safe hai. Selectors slice file mein define karo — co-location better hai.',
            filename: 'features/counter/counterSlice.ts',
          }}
          realWorldScenario="Auth slice: login, logout, setUser actions. Cart slice: addItem, removeItem, updateQuantity, clearCart. Har feature isolated — testing aur maintenance easy."
          commonMistakes={[
            { mistake: 'Slice ke bahar state directly mutate karna', why: 'Redux state immutable hona chahiye — direct mutation bugs create karta hai', fix: 'Sirf reducer functions ke andar Immer magic kaam karta hai — bahar spread operator use karo' },
          ]}
          proTip="Selectors slice file mein co-locate karo — export const selectCartTotal = (state: RootState) => state.cart.items.reduce(...)). Component thin rehta hai, logic testable rehta hai."
        />
      </div>

      <div id="async-thunk">
        <ConceptCard
          title="createAsyncThunk — Async Operations"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="createAsyncThunk async operations ke liye — API calls, file uploads, etc. Automatically pending, fulfilled, rejected actions generate karta hai."
          whenToUse={[
            'API calls jinka result store mein save karna ho',
            'Complex async flows (multiple API calls chain)',
            'Loading/error states Redux mein track karne ke liye',
          ]}
          whyUseIt="Async logic ko component se bahar nikalo — slice mein rakho. Loading state automatic — component sirf state se read karta hai."
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
            explanation: 'createAsyncThunk first arg: action type string. Second: async function. rejectWithValue se custom error. extraReducers mein pending/fulfilled/rejected handle karo. Component sirf loading/error state read karta hai.',
            filename: 'features/auth/authSlice.ts',
          }}
          realWorldScenario="E-commerce checkout flow: validateCart → processPayment → updateInventory — teen API calls chain. Redux mein saari loading states track hoti hain — UI responsive rehti hai har step pe."
          commonMistakes={[
            { mistake: 'try/catch ke andar throw karna reject karne ke liye', why: 'thunk mein throw se rejected nahi milta — createAsyncThunk internally catch karta hai', fix: 'rejectWithValue() use karo explicitly: return rejectWithValue(errorMessage)' },
          ]}
          proTip="unwrap() se thunk result directly await karo: const user = await dispatch(loginUser(creds)).unwrap() — rejected ho toh throw karta hai, directly try/catch mein handle karo."
        />
      </div>

      <div id="rtk-query">
        <ConceptCard
          title="RTK Query — API Calls Ke Liye Best Tool"
          emoji="🚀"
          difficulty="advanced"
          whatIsIt="RTK Query Redux Toolkit mein built-in data fetching aur caching solution hai — TanStack Query jaisa lekin Redux store ke andar. Automatic caching, refetching, loading states."
          whenToUse={[
            'REST API calls jahan caching important ho',
            'Automatic cache invalidation chahiye (create → list auto-refetch)',
            'Server state aur client state dono Redux mein chahiye',
          ]}
          whyUseIt="Manual loading/error state, API calls, cache — sab automatically handle hote hain. createAsyncThunk se zyada opinionated lekin much less code."
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
            explanation: 'createApi se endpoints define karo. providesTags/invalidatesTags se cache invalidation automatic — createPost ke baad getPosts refetch ho jaata hai. Hooks automatically generated hote hain.',
            filename: 'features/posts/postsApi.ts',
          }}
          realWorldScenario="Product listing + add to cart: useGetProductsQuery se products fetch, useAddToCartMutation se cart update, invalidatesTags se cart count automatically refresh — zero manual refetch code."
          commonMistakes={[
            { mistake: 'RTK Query reducerPath store mein add karna bhool jaana', why: 'Cache work nahi karega — RTK Query ka state nowhere to live', fix: 'configureStore reducer mein [postsApi.reducerPath]: postsApi.reducer aur middleware mein postsApi.middleware' },
          ]}
          proTip="polling: useGetPostsQuery(undefined, { pollingInterval: 30000 }) — har 30s pe automatically refetch. WebSocket alternatives ke liye background data sync easily implement hoti hai."
        />
      </div>

      <div id="redux-vs-zustand">
        <h2 className="text-xl font-display font-bold text-[#F5F5F7] mb-4">Redux Toolkit vs Zustand — Comparison</h2>
        <ReduxVsZustandTable />
        <ConceptCard
          title="Redux DevTools — Time Travel Debugging"
          emoji="🕰️"
          difficulty="intermediate"
          whatIsIt="Redux DevTools browser extension se har dispatched action aur resulting state changes visually inspect kar sakte ho. Time travel: past states mein navigate karo."
          whenToUse={[
            'Production bugs reproduce karne ke liye',
            'State changes track karne ke liye development mein',
            'Team ko explain karne ke liye ki app state kaise change hoti hai',
          ]}
          whyUseIt="Console.log se debugging primitive hai. DevTools se action ka exact payload, before/after state diff, aur undo/redo sab milta hai — bugs minutes mein fix hote hain."
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
            explanation: 'DevTools RTK mein automatically on hai development mein. createSelector se expensive derived state memoize karo — sirf relevant state change pe recalculate. Production mein DevTools off karo.',
            filename: 'store/index.ts',
          }}
          realWorldScenario="Customer ne bug report kiya — cart total wrong tha. DevTools se state export karo, teammate ko bhejo — exact state mein time travel karke bug reproduce karo. 5 minutes mein fix."
          commonMistakes={[
            { mistake: 'Production mein Redux DevTools on rakhna', why: 'Sensitive state data browser extension mein visible hoti hai — security risk', fix: 'devTools: process.env.NODE_ENV !== "production" — always conditional enable karo' },
          ]}
          proTip={'Redux DevTools mein "Dispatcher" tab se manually actions dispatch kar sakte ho UI ke bina — rapid prototyping aur edge case testing ke liye.'}
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="redux-toolkit" />
    </div>
  )
}
