export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface ReactChapter {
  number: number
  slug: string
  title: string
  subtitle: string
  difficulty: Difficulty
  estimatedMinutes: number
  phase: 1 | 2 | 3
  topics: string[]
  conceptCount: number
  visualization?: string
}

export const reactChapters: ReactChapter[] = [
  // Phase 1: React Basics (Ch 1-6)
  { number: 1, slug: 'react-intro', title: 'React Kya Hai?', subtitle: 'Virtual DOM, component model, aur kyun React?', difficulty: 'beginner', estimatedMinutes: 30, phase: 1, topics: ['Virtual DOM', 'Component model', 'React vs Vanilla JS', 'Create React App vs Vite', 'First component'], conceptCount: 5 },
  { number: 2, slug: 'jsx', title: 'JSX — HTML in JavaScript', subtitle: 'JSX syntax, expressions, aur rules', difficulty: 'beginner', estimatedMinutes: 35, phase: 1, topics: ['JSX syntax', 'Expressions in JSX', 'JSX rules', 'Fragments', 'Conditional rendering basics'], conceptCount: 6 },
  { number: 3, slug: 'components-props', title: 'Components & Props', subtitle: 'Reusable UI building blocks', difficulty: 'beginner', estimatedMinutes: 45, phase: 1, topics: ['Functional components', 'Props', 'PropTypes', 'TypeScript props', 'Children prop', 'Component composition'], conceptCount: 7 },
  { number: 4, slug: 'state-usestate', title: 'State & useState', subtitle: 'Component ka memory — state management basics', difficulty: 'beginner', estimatedMinutes: 50, phase: 1, topics: ['useState hook', 'State updates', 'State batching', 'Derived state', 'Lifting state up', 'Controlled inputs'], conceptCount: 8 },
  { number: 5, slug: 'events-forms', title: 'Events & Forms', subtitle: 'User interactions handle karo', difficulty: 'beginner', estimatedMinutes: 40, phase: 1, topics: ['onClick', 'onChange', 'onSubmit', 'Controlled components', 'Form validation', 'Synthetic events'], conceptCount: 7 },
  { number: 6, slug: 'lists-conditional', title: 'Lists & Conditional Rendering', subtitle: 'Dynamic UIs banana', difficulty: 'beginner', estimatedMinutes: 35, phase: 1, topics: ['map() for lists', 'key prop', 'Conditional rendering', 'Ternary', '&& operator', 'null rendering'], conceptCount: 6 },

  // Phase 2: React Hooks & Patterns (Ch 7-13)
  { number: 7, slug: 'useeffect', title: 'useEffect — Side Effects', subtitle: 'API calls, subscriptions, DOM manipulation', difficulty: 'intermediate', estimatedMinutes: 60, phase: 2, topics: ['useEffect basics', 'Dependencies array', 'Cleanup', 'API calls', 'Infinite loop pitfalls', 'StrictMode double-invoke'], conceptCount: 8 },
  { number: 8, slug: 'useref-usememo', title: 'useRef, useMemo & useCallback', subtitle: 'DOM access aur performance optimization', difficulty: 'intermediate', estimatedMinutes: 55, phase: 2, topics: ['useRef', 'Mutable refs', 'useMemo', 'useCallback', 'When to optimize', 'Premature optimization'], conceptCount: 7 },
  { number: 9, slug: 'context-api', title: 'Context API', subtitle: 'Global state without prop drilling', difficulty: 'intermediate', estimatedMinutes: 50, phase: 2, topics: ['createContext', 'useContext', 'Context vs prop drilling', 'Context performance', 'Multiple contexts'], conceptCount: 6 },
  { number: 10, slug: 'custom-hooks', title: 'Custom Hooks', subtitle: 'Logic reuse karo — proper way', difficulty: 'intermediate', estimatedMinutes: 55, phase: 2, topics: ['useFetch', 'useLocalStorage', 'useDebounce', 'Hook rules', 'Custom hook patterns'], conceptCount: 7 },
  { number: 11, slug: 'react-router', title: 'React Router v6', subtitle: 'Client-side routing master karo', difficulty: 'intermediate', estimatedMinutes: 50, phase: 2, topics: ['BrowserRouter', 'Route', 'useNavigate', 'useParams', 'Nested routes', 'Protected routes'], conceptCount: 7 },
  { number: 12, slug: 'state-management', title: 'State Management — Zustand', subtitle: 'Global state zyada complex projects ke liye', difficulty: 'intermediate', estimatedMinutes: 55, phase: 2, topics: ['Zustand basics', 'Actions', 'Selectors', 'Middleware', 'Persist', 'Zustand vs Redux'], conceptCount: 7 },
  { number: 13, slug: 'data-fetching', title: 'Data Fetching — TanStack Query', subtitle: 'Server state ka sahi management', difficulty: 'intermediate', estimatedMinutes: 60, phase: 2, topics: ['useQuery', 'useMutation', 'Cache', 'Stale time', 'Loading/error states', 'Optimistic updates'], conceptCount: 8 },

  // Phase 3: Advanced React (Ch 14-18)
  { number: 14, slug: 'react-performance', title: 'React Performance', subtitle: 'Re-renders samjho aur optimize karo', difficulty: 'advanced', estimatedMinutes: 65, phase: 3, topics: ['Re-render causes', 'React.memo', 'useMemo', 'useCallback', 'Profiler', 'Code splitting'], conceptCount: 8 },
  { number: 15, slug: 'advanced-patterns', title: 'Advanced React Patterns', subtitle: 'HOC, Render Props, Compound Components', difficulty: 'advanced', estimatedMinutes: 70, phase: 3, topics: ['Higher-Order Components', 'Render Props', 'Compound Components', 'Headless UI', 'Composition patterns'], conceptCount: 7 },
  { number: 16, slug: 'testing-react', title: 'Testing React', subtitle: 'Components ko test karo — properly', difficulty: 'advanced', estimatedMinutes: 60, phase: 3, topics: ['React Testing Library', 'user-event', 'Mocking', 'Integration tests', 'Accessibility testing'], conceptCount: 7 },
  { number: 17, slug: 'nextjs-intro', title: 'Next.js — Full Stack React', subtitle: 'SSR, App Router, Server Components', difficulty: 'advanced', estimatedMinutes: 75, phase: 3, topics: ['App Router', 'Server Components', 'Client Components', 'SSG/SSR', 'API Routes', 'Image optimization'], conceptCount: 9 },
  { number: 18, slug: 'react-capstone', title: 'React Capstone', subtitle: 'Full stack app — build to deploy', difficulty: 'advanced', estimatedMinutes: 150, phase: 3, topics: ['Architecture', 'State design', 'API integration', 'Auth', 'Deployment', 'Performance'], conceptCount: 6 },
  { number: 19, slug: 'redux-toolkit', title: 'Redux Toolkit — Production State', subtitle: 'RTK se predictable, scalable global state banao', difficulty: 'advanced', estimatedMinutes: 75, phase: 3, topics: ['configureStore', 'createSlice', 'useSelector', 'useDispatch', 'createAsyncThunk', 'RTK Query', 'Redux DevTools'], conceptCount: 9 },
]

export const reactPhases = [
  { number: 1 as const, name: 'React Basics', color: '#06B6D4', chapters: reactChapters.filter(c => c.phase === 1) },
  { number: 2 as const, name: 'Hooks & Patterns', color: '#F59E0B', chapters: reactChapters.filter(c => c.phase === 2) },
  { number: 3 as const, name: 'Advanced React', color: '#7C3AED', chapters: reactChapters.filter(c => c.phase === 3) },
]

export const reactDifficultyConfig = {
  beginner: { label: 'Beginner', color: 'text-[#10B981]', bg: 'bg-[rgba(16,185,129,0.12)]', border: 'border-[rgba(16,185,129,0.3)]' },
  intermediate: { label: 'Intermediate', color: 'text-[#F59E0B]', bg: 'bg-[rgba(245,158,11,0.12)]', border: 'border-[rgba(245,158,11,0.3)]' },
  advanced: { label: 'Advanced', color: 'text-[#7C3AED]', bg: 'bg-[rgba(124,58,237,0.12)]', border: 'border-[rgba(124,58,237,0.3)]' },
}
