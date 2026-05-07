'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

export default function ReactChapter11Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          React Router v6 — SPA Navigation Master Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Traditional websites mein har link click pe full page reload hota hai — server se nayi HTML aati hai. React apps mein ye efficient nahi hai. React Router v6 client-side navigation deta hai — page reload ke bina URL change hoti hai aur sirf jo content change ho wo update hota hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum BrowserRouter se le kar protected routes tak — sab cover karenge. Modern React apps ka backbone hai ye.
        </p>
      </div>

      <div id="client-side-routing">
        <ConceptCard
          title="Client-Side Routing Kya Hai?"
          emoji="🗺️"
          difficulty="intermediate"
          whatIsIt="Client-side routing matlab browser mein JavaScript hi URLs manage karta hai — server pe nahi jaata. URL change hoti hai (history API use karke), React naya component render karta hai. Server pe request nahi jaati har navigation pe. Result: instant page transitions, SPA feel."
          whenToUse={[
            'React SPA (Single Page Application) mein hamesha',
            'Dashboard apps jahan navigation frequent ho aur fast chahiye',
            'Multi-page feel chahiye lekin server round-trips avoid karne hain',
            'Complex navigation — tabs, modals, nested views',
          ]}
          whyUseIt="Server-side routing mein har click pe full page reload — CSS, JS, fonts sab firse load. Slow! Client-side routing mein sirf data change hota hai — UI instant update hoti hai. Better UX, faster navigation, aur state preserve hoti hai navigation ke dauraan."
          howToUse={{
            filename: 'main.tsx',
            language: 'typescript',
            code: `// npm install react-router-dom
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      {/* Navigation — page reload nahi hota */}
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? 'text-blue-500' : 'text-gray-500'}
        >
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>

      {/* Routes — URL ke according component render */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />  {/* 404 */}
      </Routes>
    </BrowserRouter>
  )
}`,
            explanation: "BrowserRouter HTML5 History API use karta hai. Routes component match karta hai current URL se. NavLink isActive prop deta hai — active link ko style kar sako. path='*' catch-all route hai — koi bhi URL match na hone par ye render hoga.",
          }}
          realWorldScenario="Zepto ya Swiggy jaisi app mein: /home (feed), /restaurant/123 (detail), /cart, /orders — ye sab client-side routes hain. Header, footer consistent rehte hain, sirf main content change hota hai — instant navigation milti hai."
          commonMistakes={[
            {
              mistake: '<a href> use karna React Router app mein',
              why: 'Regular anchor tag full page reload karta hai — React state, scroll position sab reset ho jaata hai.',
              fix: 'Hamesha <Link to="/path"> ya <NavLink to="/path"> use karo React Router se. Ye client-side navigation karta hai.',
            },
            {
              mistake: 'BrowserRouter ko multiple baar wrap karna',
              why: 'Nested BrowserRouter se routing conflicts hote hain aur hooks kaam nahi karte.',
              fix: 'App ke root mein sirf ek BrowserRouter rakho — usually main.tsx ya App.tsx mein.',
            },
          ]}
          proTip="Production mein server ko configure karo taaki sabhi routes index.html return karein — warna direct URL access karne par 404 aayega. Nginx mein: try_files $uri $uri/ /index.html;. Vite dev server pe ye automatic hota hai."
        />
      </div>

      <div id="router-hooks">
        <ConceptCard
          title="useNavigate, useParams, useLocation"
          emoji="🪝"
          difficulty="intermediate"
          whatIsIt="React Router v6 ke ye teen hooks programmatic navigation aur URL data access dete hain. useNavigate se code se navigate karo (form submit ke baad). useParams se URL parameters nikalo (:id). useLocation se current URL ki full info lo — pathname, search, state."
          whenToUse={[
            'Form submit hone ke baad success page par navigate karna — useNavigate',
            'URL se product ID ya user ID nikalna — useParams',
            'Previous page URL dekhna (back button logic) — useLocation',
            'Search query string parse karna — useLocation + URLSearchParams',
          ]}
          whyUseIt="Ye hooks URL aur navigation ko React state ki tarah treat karne dete hain. URL hi state hai — useParams se milo, useLocation se paro, useNavigate se update karo. Deep linking aur bookmarking automatically work karta hai."
          howToUse={{
            filename: 'hooks-demo.tsx',
            language: 'typescript',
            code: `import { useNavigate, useParams, useLocation } from 'react-router-dom'

// useNavigate — programmatic navigation
function LoginForm() {
  const navigate = useNavigate()

  const handleSubmit = async (credentials: Credentials) => {
    await login(credentials)
    navigate('/dashboard')        // Seedha navigate
    navigate(-1)                  // Browser back button ki tarah
    navigate('/home', { replace: true })  // History replace (no back)
  }
  return <form onSubmit={handleSubmit}>...</form>
}

// useParams — URL se parameters nikalo
// Route: <Route path="/users/:userId/posts/:postId" element={<Post />} />
function Post() {
  const { userId, postId } = useParams<{ userId: string; postId: string }>()
  const { data } = useFetch(\`/api/users/\${userId}/posts/\${postId}\`)
  return <div>{data?.title}</div>
}

// useLocation — current URL ki poori info
function SearchResults() {
  const location = useLocation()
  // location.pathname = '/search'
  // location.search = '?q=react+hooks'
  // location.state = { from: '/home' }  // navigate se pass kiya state

  const params = new URLSearchParams(location.search)
  const query = params.get('q') ?? ''
  return <div>Results for: {query}</div>
}`,
            explanation: "useNavigate navigate() function return karta hai — string pass karo URL ke liye, number pass karo history mein (navigate(-1) = back). useParams route path mein :name se match karta hai. useLocation complete location object deta hai jisme search query string bhi hoti hai.",
          }}
          realWorldScenario="E-commerce checkout flow: cart review karo, payment form submit karo, navigate('/order-success', { state: { orderId: '123' } }) se success page par jaao. Success page pe useLocation().state.orderId se order number show karo — URL mein expose nahi karna padta."
          commonMistakes={[
            {
              mistake: 'useParams se value directly number mein use karna',
              why: 'URL params hamesha strings hote hain — parseInt ya Number() call nahi kiya toh type errors aate hain.',
              fix: 'const { id } = useParams(); const numId = parseInt(id ?? "0", 10); Ya TypeScript se explicit: useParams<{ id: string }>().',
            },
            {
              mistake: 'Router context ke bahar hooks call karna',
              why: 'useNavigate, useParams sirf Router context ke andar kaam karte hain — BrowserRouter ke bahar error aata hai.',
              fix: 'Component tree Router ke andar hona chahiye. Tests mein MemoryRouter ya renderWithRouter wrapper use karo.',
            },
          ]}
          proTip="useSearchParams hook bhi hai React Router v6 mein — URLSearchParams jaise interface deta hai lekin React state ki tarah updates: const [params, setParams] = useSearchParams(); params.get('sort'); setParams({ sort: 'price' }). Filter pages ke liye perfect."
        />
      </div>

      <div id="nested-routes">
        <ConceptCard
          title="Nested Routes — Layout Routes & Outlet"
          emoji="🪆"
          difficulty="intermediate"
          whatIsIt="Nested routes se tumhara URL structure component hierarchy reflect karta hai. /dashboard/settings, /dashboard/profile — dono share karte hain dashboard layout (sidebar, header) aur sirf center content change hota hai. Outlet component wo jagah hai jahan child routes render hote hain."
          whenToUse={[
            'Dashboard layouts jisme sidebar ya header consistent ho',
            'Tabs component jisme active tab ke andar alag content ho',
            'Multi-step forms jahan har step alag URL par ho',
            'Admin panel jisme authentication layout wrap kare sab routes ko',
          ]}
          whyUseIt="Bina nested routes ke har page mein header, sidebar manually add karna padta — code repeat hota. Nested routes se layout sirf ek baar define karo, sab child routes automatically wo layout mein render hote hain. DRY code + consistent UX."
          howToUse={{
            filename: 'routes.tsx',
            language: 'typescript',
            code: `import { Outlet } from 'react-router-dom'

// Layout component — Outlet child routes render karta hai
function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Outlet />  {/* Child route yahan render hoga */}
      </main>
    </div>
  )
}

// Route configuration
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Nested routes — DashboardLayout wrap karega */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />         {/* /dashboard */}
          <Route path="profile" element={<Profile />} />      {/* /dashboard/profile */}
          <Route path="settings" element={<Settings />} />    {/* /dashboard/settings */}
          <Route path="users/:id" element={<UserDetail />} /> {/* /dashboard/users/42 */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}`,
            explanation: "DashboardLayout Outlet render karta hai — jahan bhi Outlet likha hai, wahan active child route ka element aayega. index route wo hai jo parent path exactly match karne par render hota hai (/dashboard without any sub-path). Sidebar aur header consistent rehte hain.",
          }}
          realWorldScenario="Notion ki tarah workspace app — /workspace/:id layout mein left sidebar (page tree) hota hai, /workspace/:id/page/:pageId content area mein page render hoti hai. Outlet se sirf right panel update hota hai, sidebar stable rehta hai."
          commonMistakes={[
            {
              mistake: 'Outlet ko layout component mein bhoolna',
              why: 'Bina Outlet ke child routes render nahi honge — blank screen ya layout dikhayi dega bina content ke.',
              fix: 'Layout component mein <Outlet /> zaroor likho wahan jahan child content aana chahiye.',
            },
            {
              mistake: 'Nested route path mein leading slash dena',
              why: '<Route path="/profile"> andar /dashboard ke baad absolute path banata hai — /profile banana chahte the /dashboard/profile nahi.',
              fix: 'Child routes mein relative paths do: path="profile" (no leading slash). React Router automatically parent path se join karta hai.',
            },
          ]}
          proTip="React Router v6.4+ mein createBrowserRouter aur loader function use karo — data fetch karo navigate karne se pehle (no loading states in component). Route-level data loading se much cleaner architecture milti hai. Remix framework yahi pattern use karta hai."
        />
      </div>

      <div id="protected-routes">
        <ConceptCard
          title="Protected Routes — Auth Check Pattern"
          emoji="🔐"
          difficulty="intermediate"
          whatIsIt="Protected routes wo routes hain jahan sirf authenticated users ja sakte hain. Agar unauthenticated user /dashboard pe jaane ki koshish kare toh /login pe redirect ho. Ye pattern almost har production app mein hota hai — ek reusable ProtectedRoute component se implement hota hai."
          whenToUse={[
            'Dashboard, settings, profile — sirf logged-in users ke liye',
            'Admin panel — sirf admin role wale users ke liye',
            'Premium content — paid users ke liye gating',
            'Onboarding steps — pehle profile complete karo, fir app use karo',
          ]}
          whyUseIt="Security aur UX dono ke liye zaroori hai. Server-side bhi auth check hona chahiye — lekin client-side protection se unauthorized users ko seedha login page milta hai, broken dashboard nahi. Plus role-based access control se fine-grained permissions possible hoti hain."
          howToUse={{
            filename: 'ProtectedRoute.tsx',
            language: 'typescript',
            code: `import { Navigate, Outlet } from 'react-router-dom'

// Simple protected route
interface ProtectedRouteProps {
  isAuthenticated: boolean
  redirectTo?: string
}

function ProtectedRoute({ isAuthenticated, redirectTo = '/login' }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }
  return <Outlet />  // Authenticated hai toh child render karo
}

// Role-based protection
function AdminRoute({ user }: { user: User | null }) {
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to="/unauthorized" replace />
  return <Outlet />
}

// Routes mein use karo
function App() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <Spinner />  // Auth check hone tak wait karo

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute isAuthenticated={!!user} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin only */}
        <Route element={<AdminRoute user={user} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}`,
            explanation: "ProtectedRoute Navigate component use karta hai — redirect karta hai login pe. replace prop history mein current entry replace karta hai — login ke baad back button protected route pe nahi jaata. isLoading check zaroori hai taaki authentication check complete hone se pehle redirect na ho.",
          }}
          realWorldScenario="Sequifi mein: free users /reports pe jaayein toh /upgrade page dikhe. Admin users /admin/analytics dekh sakein. Sales reps sirf apne own leads dekh sakein. Role-based ProtectedRoute har case handle karta hai cleanly."
          commonMistakes={[
            {
              mistake: 'isLoading check kiye bina auth redirect karna',
              why: 'Agar auth state initially null/undefined ho (loading) toh user immediately login pe redirect ho jaata hai — even agar actually logged in ho.',
              fix: 'Hamesha loading state check karo pehle: if (isLoading) return <Spinner />. Tab hi isAuthenticated check karo.',
            },
            {
              mistake: 'Sirf client-side protection rely karna security ke liye',
              why: 'JavaScript code browser mein visible hai — koi bhi ProtectedRoute component bypass kar sakta hai developer tools se.',
              fix: 'Server-side bhi har API endpoint par authentication check karo. Client-side protection sirf UX ke liye hai — security guarantee nahi karta.',
            },
          ]}
          proTip="Login ke baad user ko ussi page par bhejo jahan woh jaana chahta tha — useLocation se from capture karo: navigate(location.state?.from ?? '/dashboard'). Login component mein: const location = useLocation(); <Navigate to='/login' state={{ from: location }} replace />."
        />
      </div>
    </div>
  )
}
