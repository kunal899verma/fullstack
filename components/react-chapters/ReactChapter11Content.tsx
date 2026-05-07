'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

function RouterMatchingDiagram() {
  const routes = [
    { url: '/', component: 'Home', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', icon: '🏠' },
    { url: '/about', component: 'About', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '📄' },
    { url: '/users/:id', component: 'UserDetail', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: '👤', dynamic: true },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">URL → Router → Route Matching → Component Renders</p>
      <div className="max-w-lg mx-auto">
        <div className="rounded-xl px-5 py-3 flex items-center gap-3 mb-2" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}>
          <span className="text-lg">🌐</span>
          <div className="flex-1">
            <p className="font-bold text-sm text-[#F5F5F7]">BrowserRouter</p>
            <p className="text-xs text-[#71717A]">History API — URL change detect karta hai</p>
          </div>
        </div>
        <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓ matches URL</span></div>
        <div className="space-y-2">
          {routes.map((r, i) => (
            <div key={i} className="rounded-xl px-5 py-3 flex items-center gap-4" style={{ background: r.bg, border: `1px solid ${r.border}` }}>
              <span className="text-xl">{r.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-mono text-xs font-bold" style={{ color: r.color }}>{r.url}</p>
                  {r.dynamic && <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: 'rgba(16,185,129,0.2)', color: '#10B981' }}>dynamic param</span>}
                </div>
                <p className="text-xs text-[#71717A] mt-0.5">→ renders <span className="font-semibold text-[#A1A1AA]">{r.component}</span></p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl px-5 py-3 flex items-center gap-3" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}>
          <span className="text-lg">❓</span>
          <div className="flex-1">
            <p className="font-bold text-sm text-[#F5F5F7]">path="*"</p>
            <p className="text-xs text-[#71717A]">No match → 404 NotFound component</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReactChapter11Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          React Router v6 — URL Tumhara State Hai
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ek interesting thought experiment — aapki React app ka URL kya hai? Sirf ek address? Nahi! URL aapka state hai. /dashboard/settings mein user hai — ye state hai. /products?sort=price&filter=electronics — ye state hai. URL seedha shareable, bookmarkable, back-button-compatible state hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Traditional sites mein har link click pe full page reload — CSS, JS, fonts sab dobara download. React SPA mein? JavaScript hi URL manage karta hai — History API — sirf content swap hota hai. Instant navigation. Ye hi client-side routing hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein routing basics se le kar protected routes tak, nested layouts tak — sab samjhenge under the hood ke saath.
        </p>
      </div>

      <RouterMatchingDiagram />

      <div id="client-side-routing">
        <ConceptCard
          title="Client-Side Routing Kya Hai?"
          emoji="🗺️"
          difficulty="intermediate"
          whatIsIt="Under the hood samjhte hain — browser mein HTML5 History API hoti hai. window.history.pushState('/about', ...) — page reload ke bina URL change hoti hai! React Router yahi use karta hai. BrowserRouter History API wrap karta hai. Routes component current URL sunti hai. URL match karta hai — component render. URL change karta hai — React tree update. Zero server request. Pura flow JavaScript mein."
          whenToUse={[
            'React SPA — hamesha React Router use karo',
            'Dashboard apps jahan navigation frequent ho',
            'Multi-page feel chahiye lekin server round-trips avoid karne hain',
            'Complex navigation — tabs, modals, nested layouts',
          ]}
          whyUseIt="Server-side routing: link click → browser server pe jaata hai → server HTML bhejta hai → browser parse karta hai → sab re-render. 300-500ms minimum. Client-side routing: link click → JavaScript URL change karta hai → React sirf changed component render karta hai → 0-50ms. Ye difference user clearly feel karta hai."
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
            explanation: "Flow trace karo — user /users/42 pe jaata hai. BrowserRouter History API se URL sunti hai. Routes component URL match karta hai: /, /about, /dashboard, /users/:id — ah! /users/42 match hua! UserProfile component render hota hai. :id ke place pe '42' inject hoga. NavLink isActive check karta hai current URL se — active pe 'text-blue-500' class. path='*' last resort — koi match nahi toh NotFound.",
          }}
          realWorldScenario="Swiggy jaisi food delivery app — /home (feed), /restaurant/123 (detail page), /cart, /orders/456 (order tracking). Header aur BottomNavigation consistent — sirf center content swap hota hai. User /restaurant/123 se /cart jaata hai — JavaScript URL change karta hai, sirf center component swap. Header ne notice nahi kiya, cart count update hua. This is SPA magic."
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
          proTip="Common production gotcha — direct URL /dashboard pe jaao, server 404 deta hai! Kyun? Server pe /dashboard folder nahi hai — sirf index.html hai. Fix: server ko batao sab routes pe index.html serve karo. Nginx: try_files $uri $uri/ /index.html;. Vercel/Netlify: _redirects file ya vercel.json mein rewrite rules. Ye ek baar configure karo — aage tension nahi."
        />
      </div>

      <div id="router-hooks">
        <ConceptCard
          title="useNavigate, useParams, useLocation"
          emoji="🪝"
          difficulty="intermediate"
          whatIsIt="Teen hooks — teeno URL ke alag aspects handle karte hain. useNavigate: 'mujhe programmatically navigate karna hai' — form submit ke baad redirect. useParams: 'URL mein jo :id hai wo mujhe chahiye' — dynamic segments. useLocation: 'poori URL ki info chahiye — pathname, search string, state jo navigate ke saath bheja' — breadcrumbs, analytics, back navigation. Teeno React Router ka internal context use karte hain — BrowserRouter ke bahar call karo toh error."
          whenToUse={[
            'Form submit hone ke baad success page navigate karna — useNavigate',
            'URL se product ID, user ID, post slug nikalna — useParams',
            'Previous page URL ya search query string dekhna — useLocation',
            'navigate state ke saath data pass karna — useNavigate + useLocation',
          ]}
          whyUseIt="URL ko state ki tarah treat karo — ye React ka philosophy hai. Product ID URL mein hai — useParams se lo, koi prop drilling nahi. User search karta hai — query URL mein hai — useLocation se lo, bookmark karo, share karo. Login ke baad — useNavigate se wahan bhejo jahan jaana chahta tha."
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
            explanation: "useNavigate ke options important hain — navigate('/home', { replace: true }) se history mein current entry replace hoti hai. Matlab back button click karo — yahan wapas nahi aoge. Login forms ke liye perfect — login ke baad back nahi chahiye. navigate(-1) browser history mein literally ek step back — exactly like browser back button. navigate(location.state?.from ?? '/dashboard') — login ke baad original destination pe bhejo.",
          }}
          realWorldScenario="E-commerce checkout flow — user cart mein item add karta hai, /checkout pe jaata hai, payment form fill karta hai, submit hone par navigate('/order-success', { state: { orderId: order.id, items: cart } }). Success page pe useLocation().state se orderId aur items milte hain — URL mein sensitive data expose nahi hua. Clean, secure, shareable."
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
          proTip="useSearchParams — ye v6 ka hidden gem hai! const [params, setParams] = useSearchParams(). params.get('sort') → current sort value. setParams({ sort: 'price', filter: 'electronics' }) → URL update hoti hai, component re-render hota hai. Filter page banao jahan sab filters URL mein hoon — user bookmark kar sake, share kar sake, back button kaam kare. Ye real-world apps mein bahut important pattern hai."
        />
      </div>

      <div id="nested-routes">
        <ConceptCard
          title="Nested Routes — Layout Routes & Outlet"
          emoji="🪆"
          difficulty="intermediate"
          whatIsIt="Nested routes ek powerful concept hai — URL structure component hierarchy se match karta hai. /dashboard/settings aur /dashboard/profile — dono /dashboard ka part hain. Dono Sidebar aur Header share karte hain. Sirf center content alag hai. Outlet component wo placeholder hai jahan child route ka component render hoga. Parent layout consistent rehta hai — sirf child slot update hota hai. Bahut efficient."
          whenToUse={[
            'Dashboard layouts — sidebar, header consistent, sirf main content change',
            'Tabs — active tab ka content alag URL pe',
            'Multi-step forms — har step alag URL pe (sharable progress)',
            'Auth layout — login, register, forgot password same layout share karein',
          ]}
          whyUseIt="Sochte hain bina nested routes ke — Dashboard.tsx, DashboardSettings.tsx, DashboardProfile.tsx — teeno mein Sidebar import karo, Header import karo. Koi bhi change Sidebar mein? Teeno files update. Nested routes se: DashboardLayout ek baar — Sidebar, Header. Outlet pe child render. Sidebar change? Ek file. DRY principle routing mein."
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
            explanation: "Render flow trace karo — user /dashboard/settings pe jaata hai. Routes tree match: /dashboard match hua — DashboardLayout render hota hai. DashboardLayout mein Sidebar, Header, aur Outlet hai. Outlet ke liye child match karo: 'settings' match hua — Settings component. Outlet ki jagah Settings render hota hai. Sidebar, Header untouched — zero re-render.",
          }}
          realWorldScenario="Notion jaisi app — /workspace/:id layout mein left sidebar hai (page hierarchy tree). /workspace/:id/page/:pageId mein right panel mein page content. Outlet sirf right panel update karta hai jab user pages switch karta hai. Sidebar stable — tree structure collapsed/expanded state preserve hoti hai. Perfect nested routing."
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
          proTip="React Router v6.4+ mein createBrowserRouter aur loader function aya — ye game changer hai! Route pe loader define karo: loader: ({ params }) =&gt; fetchUser(params.id). Component render hone se pehle data already loaded hoga. Component mein: const user = useLoaderData(). Zero loading state! Ye Remix framework ka concept hai ab React Router mein aa gaya. Future mein ye approach standard ban jaayegi."
        />
      </div>

      <div id="protected-routes">
        <ConceptCard
          title="Protected Routes — Auth Check Pattern"
          emoji="🔐"
          difficulty="intermediate"
          whatIsIt="Har production app ka core pattern — protected routes. Unauthenticated user /dashboard pe jaaye toh kya? Navigate to /login. Bina ProtectedRoute: sab components mein manually auth check. ProtectedRoute component Outlet use karta hai — authenticate check karo, pass? Outlet render karo (child route). Fail? Navigate to login. Ek component, sab routes protected. Aur role-based protection? Same pattern extend karo — role check."
          whenToUse={[
            'Dashboard, settings, profile — sirf logged-in users ke liye',
            'Admin panel — sirf admin role wale users ke liye',
            'Premium features — paid subscription wale users ke liye',
            'Onboarding flow — steps complete karne ke baad hi app accessible',
          ]}
          whyUseIt="Security layered approach chahiye — client-side protection UX ke liye (unauthorized users seamlessly login pe jaate hain), server-side protection actual security ke liye (API endpoints verify karo). Dono zaroori hain. Client-side sirf convenience hai — JavaScript disable karo, bypass ho jaata hai. Server trust mat karo client pe."
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
            explanation: "isLoading check critical hai — ye bahut log bhulte hain. Auth state initially null hoti hai (loading). Bina isLoading check: null user = redirect to login. But user actually logged in hai, sirf check ho raha hai! isLoading ke saath: wait karo — spinner dikhao. Check complete? Phir decide karo redirect karna hai ya nahi. replace: true — back button press karo login ke baad, protected route pe nahi jaoge.",
          }}
          realWorldScenario="SaaS application — free users /analytics pe jaayein toh /upgrade dikhe. Pro users sab features access karein. Admin users /admin/* access karein. Super admin sensitive settings manage kare. Nested ProtectedRoutes: outer authentication check, inner role check. Clean, composable, reusable."
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
          proTip="Best UX pattern — user /dashboard/reports pe jaata hai, login nahi hua — ProtectedRoute redirect karta hai: &lt;Navigate to='/login' state={{ from: location }} replace /&gt;. Login page pe: const location = useLocation(); navigate(location.state?.from?.pathname ?? '/dashboard'). Login hota hai — wapas /dashboard/reports pe! User ek second bhi nahi socha — seamless. Ye small detail enormous UX improvement hai."
        />
      </div>
    </div>
  )
}
