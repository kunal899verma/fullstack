'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

function AppRouterDiagram() {
  const files = [
    { label: 'app/', sublabel: 'Root directory — file system = routes', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', icon: '📁', indent: 0 },
    { label: 'layout.tsx', sublabel: 'Persistent shell — re-renders nahi on child navigate', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', icon: '🏛️', indent: 1, tag: 'Server Component' },
    { label: 'page.tsx', sublabel: 'Route content — / maps to this file', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '📄', indent: 1, tag: 'Server Component' },
    { label: 'loading.tsx', sublabel: 'Auto Suspense boundary — shows while page loads', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: '⏳', indent: 1 },
    { label: 'error.tsx', sublabel: 'Auto Error boundary — catches component errors', color: '#EF4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', icon: '⚠️', indent: 1, tag: '"use client"' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">App Router — File System Routing + Server/Client Split</p>
      <div className="max-w-lg mx-auto space-y-2">
        {files.map((f, i) => (
          <div key={i} style={{ marginLeft: f.indent * 20 }}>
            <div className="rounded-xl px-5 py-3 flex items-center gap-4" style={{ background: f.bg, border: `1px solid ${f.border}` }}>
              <span className="text-xl">{f.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-sm font-mono" style={{ color: f.color }}>{f.label}</p>
                  {f.tag && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: f.color === '#06B6D4' || f.color === '#7C3AED' ? 'rgba(6,182,212,0.15)' : 'rgba(239,68,68,0.15)', color: f.color === '#06B6D4' || f.color === '#7C3AED' ? '#06B6D4' : '#EF4444' }}>{f.tag}</span>
                  )}
                </div>
                <p className="text-xs text-[#71717A] mt-0.5">{f.sublabel}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-3 rounded-xl px-5 py-3 flex items-center gap-4" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}>
          <span className="text-lg">✂️</span>
          <div className="flex-1">
            <p className="font-bold text-xs text-[#10B981]">"use client" boundary</p>
            <p className="text-xs text-[#71717A] mt-0.5">Server Component default — add "use client" only for useState / onClick / browser APIs</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReactChapter17Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Next.js — Full Stack React Ka Future
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Next.js React ka 'grown-up version' nahi hai — ye ek completely alag mental model hai! Server Components, Client Components, Edge Runtime — pehle ye samjho phir Next.js samjho. Jo log Next.js ko sirf 'React with routing' samjhte hain — unhe App Router dekhke brain freeze hota hai. Aaj hum seedha mental model se shuru karenge.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Plain React kya hai? Browser mein JavaScript chalti hai, HTML generate hoti hai. Next.js kya hai? Server pe bhi React chalta hai — HTML server se aata hai, JavaScript baad mein hydrate hoti hai. Ye shift sab kuch change kar deta hai — performance, SEO, data fetching, architecture sab. App Router (Next.js 13+) ek paradigm shift hai — React Server Components default hain. Is chapter mein ye mental model build karenge.
        </p>
      </div>

      <AppRouterDiagram />

      <div id="nextjs-intro">
        <ConceptCard
          title="Next.js Kya Hai? SSR, SSG, ISR"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="Ek sawaal pehle — user jab tumhari site kholta hai toh kya hota hai? Plain React mein: blank HTML milta hai, JavaScript load hoti hai, component render hota hai, data fetch hoti hai. Total: 3-4 seconds first meaningful paint. Next.js mein? Server pehle data fetch karta hai, HTML generate karta hai, user ko ready-made page milta hai. Aur Next.js mein teen strategies hain. SSG — build time pe banao, CDN pe serve karo. ISR — mostly static, periodically refresh. SSR — har request pe fresh. CSR — traditional React. Sahi jagah sahi strategy — ye Next.js ki asli skill hai."
          whenToUse={[
            'SSR: User-specific content, real-time data, SEO important content',
            'SSG: Blog posts, docs, marketing pages — rarely changing content',
            'ISR: Product pages — mostly static but occasionally update',
            'CSR: Dashboards, admin panels — SEO nahi chahiye, rich interactivity chahiye',
          ]}
          whyUseIt="Google bot aata hai tumhari plain React site pe — blank page milti hai, JavaScript run hota hai, content dikhta hai. Google bot ko JavaScript run karna pasand nahi — SEO suffer karta hai. Next.js SSG se? Google bot aaya, HTML already ready hai — content seedha readable. SEO excellent. Performance? SSG pages CDN pe hote hain — duniya mein kahi se bhi milliseconds mein load. Ye sirf framework ka fark nahi — business impact hai."
          howToUse={{
            filename: 'next-rendering.tsx',
            language: 'typescript',
            code: `// SSG — build time render (default in App Router)
// app/blog/[slug]/page.tsx

interface PageProps { params: { slug: string } }

// Build time mein run hota hai — static HTML generate
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json())
  return posts.map((p: { slug: string }) => ({ slug: p.slug }))
}

// Ye bhi build time mein run hota hai
async function BlogPost({ params }: PageProps) {
  const post = await fetch(\`https://api.example.com/posts/\${params.slug}\`)
    .then(r => r.json())
  return <article>{post.content}</article>
}
export default BlogPost

// ISR — revalidate every N seconds
async function ProductPage({ params }: PageProps) {
  const product = await fetch(
    \`https://api.example.com/products/\${params.params}\`,
    { next: { revalidate: 3600 } }  // 1 hour mein refresh
  ).then(r => r.json())
  return <ProductDetail product={product} />
}

// SSR — har request pe render (dynamic data)
async function DashboardPage() {
  const data = await fetch('/api/dashboard', {
    cache: 'no-store'  // SSR — cache bypass karo
  }).then(r => r.json())
  return <Dashboard data={data} />
}`,
            explanation: "Step by step trace karte hain. generateStaticParams kab chalta hai? Build time pe — next build ke dauran. Ye function sab possible slugs return karta hai, Next.js har slug ke liye BlogPost function call karta hai, HTML generate karta hai, file system mein save karta hai. User request aati hai — pre-built HTML serve. Zero computation at request time! ISR mein — first request ke baad page serve hota hai. Background mein revalidate time pe fresh generate hota hai. SSR mein — har request pe server function chalata hai, fresh data fetch karta hai, HTML banata hai, response bhejta hai. cache: 'no-store' = har request pe fresh.",
          }}
          realWorldScenario="Ek e-commerce site hai. Blog posts? SSG — content roz nahi badlata, CDN pe fast. Product catalog? ISR — har ghante refresh, prices update hote hain. User dashboard? SSR — personal data, har request fresh. Shopping cart? CSR — heavy interactivity, SEO ki zaroorat nahi. Ek hi Next.js app mein charon strategies apni jagah perfect kaam kar rahe hain. Ye hai Next.js ka real power."
          commonMistakes={[
            {
              mistake: 'Har page SSR karna unnecessarily',
              why: 'SSR slow hai — har request pe server DB call + render + send. Mostly static content ke liye SSG/ISR much better.',
              fix: 'Default SSG rakhne do. Dynamic data ke liye cache: no-store ya route segment config export: export const dynamic = "force-dynamic".',
            },
            {
              mistake: 'Next.js ke App Router aur Pages Router mix karna',
              why: 'Dono alag paradigms hain — confusion hoti hai. Features overlap karte hain differently.',
              fix: 'Naye projects mein App Router use karo (Next.js 13+ default). Legacy projects gradually migrate karo. Ek time pe ek use karo.',
            },
          ]}
          proTip="next build run karo aur output dhyan se padho. Har page ke aage symbols hain — circle = SSG, lambda = SSR, clock = ISR. Kitne pages static hain? Kitne dynamic? Target: static pages maximum, dynamic minimum. Ek orange SSR page dikhta hai jo actually static ho sakta tha? Fix karo — cache: 'no-store' hata do. CDN caching improve hogi, users ko faster pages milenge. Build output = performance audit free mein."
        />
      </div>

      <div id="app-router">
        <ConceptCard
          title="App Router — The New Way"
          emoji="📁"
          difficulty="advanced"
          whatIsIt="App Router ek convention-over-configuration masterpiece hai. Ek sawaal pehle — tumne kabhi routes configure karne mein ghanta lagaya hai? React Router mein routes.tsx banao, paths define karo, components match karo. App Router mein? Folder banao, page.tsx rakho — done. Route ready. Lekin isse bhi zyada — folder ke andar loading.tsx rakho — automatic Suspense boundary. error.tsx — automatic error boundary. not-found.tsx — 404 automatic. Convention se sab automatic — configuration zero."
          whenToUse={[
            'New Next.js project — hamesha App Router se shuru karo',
            'Nested layouts chahiye — admin panel, dashboard jahan tabs/sidebar consistent hain',
            'Loading UI per-route chahiye — automatic Suspense boundaries',
            'Server Components default behavior chahiye',
          ]}
          whyUseIt="Sochte hain — dashboard mein analytics section slow load hota hai. Loading state sirf analytics section mein dikhni chahiye, baaki dashboard intact rahna chahiye. App Router mein? /dashboard/analytics/loading.tsx — bas itna. Sirf analytics ka loading UI, sidebar chal raha hai, header chal raha hai. Ye granular control pehle manually Suspense wrap se hota tha — ab file system se automatic. Development speed dramatically increase hoti hai."
          howToUse={{
            filename: 'app-structure.txt',
            language: 'bash',
            code: `app/
├── layout.tsx          # Root layout — wraps everything
├── page.tsx            # Home page (/)
├── loading.tsx         # Root loading UI
├── error.tsx           # Root error boundary
├── globals.css
│
├── dashboard/
│   ├── layout.tsx      # Dashboard layout (sidebar, nav)
│   ├── page.tsx        # /dashboard
│   ├── loading.tsx     # Dashboard-specific loading
│   │
│   ├── analytics/
│   │   └── page.tsx    # /dashboard/analytics
│   │
│   └── settings/
│       ├── page.tsx    # /dashboard/settings
│       └── profile/
│           └── page.tsx  # /dashboard/settings/profile
│
├── blog/
│   ├── page.tsx        # /blog (list)
│   └── [slug]/
│       └── page.tsx    # /blog/my-post (dynamic)
│
└── api/
    └── users/
        └── route.ts    # /api/users (API endpoint)

// layout.tsx example
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}

// loading.tsx — automatic Suspense fallback
export default function Loading() {
  return <DashboardSkeleton />
}`,
            explanation: "Convention yaad karo ek baar — page.tsx (route), layout.tsx (shared wrapper, state preserve), loading.tsx (Suspense fallback), error.tsx (error boundary), not-found.tsx (404), route.ts (API endpoint). [id] — dynamic segment, URL pe /users/123 toh params.id = '123'. [...slug] — catch-all, /blog/2024/jan/post toh params.slug = ['2024','jan','post']. (parentheses) — route group, URL mein visible nahi — sirf organize karne ke liye. Ye conventions ek baar internalize karo — mentally file structure se URL map ho jaayega.",
          }}
          realWorldScenario="SaaS product example — login page aur dashboard ka layout bilkul alag hai. Login pe navbar nahi chahiye, sirf centered card. Dashboard pe sidebar chahiye, top nav chahiye. Route groups se: /(auth)/login apna layout, /(dashboard)/analytics apna layout. URL mein (auth) aur (dashboard) dikhai nahi dete — /login aur /analytics clean URLs. Architecture clean, URLs clean, layouts separate. Ye real projects mein rozana kaam aata hai."
          commonMistakes={[
            {
              mistake: 'layout.tsx aur template.tsx confuse karna',
              why: 'layout.tsx re-renders nahi hota child navigate hone par — state preserve hoti hai. template.tsx har navigate par re-mount hota hai.',
              fix: 'Sidebar, navigation ke liye layout.tsx (state preserve). Analytics tracking, animations ke liye template.tsx (fresh mount).',
            },
            {
              mistake: 'Server Component mein client features use karna',
              why: 'useState, onClick, browser APIs — ye sirf client components mein hain. Server Component mein use karne par error.',
              fix: 'File ke top par "use client" directive add karo. Ya component ko alag file mein nikalo aur import karo.',
            },
          ]}
          proTip="Route groups ka ek aur underrated use — middleware targeting. middleware.ts mein config.matcher se specific route groups target karo. /(protected) ke sab pages authentication require karte hain, /(public) mein koi check nahi. Ek file mein poora auth gating — saari protected pages automatically covered. Ye pattern large apps mein badi time saver hai."
        />
      </div>

      <div id="server-vs-client-components">
        <ConceptCard
          title="Server vs Client Components"
          emoji="🖥️"
          difficulty="advanced"
          whatIsIt="Ye Next.js ka sabse important mental model hai — seedha dimaag mein daal lo. Server Component: server pe chalega, JS bundle mein nahi jaayega, database seedha access kar sako, async/await directly likh sako, useState use mat karo. Client Component: 'use client' likho, browser pe chalega, useState/useEffect sab milega, interactivity possible. Default Server, opt-in Client. Kyon? Kyunki zyada components actually interactivity chahte hi nahi — sirf data render karte hain. Unhe client bundle mein bhejne ki kya zaroorat?"
          whenToUse={[
            'Server Component: Data fetching (DB, API), heavy computations, no interactivity',
            'Client Component: useState, useEffect, onClick, browser APIs',
            'Server: Sensitive credentials hide karna — API keys server par rehti hain',
            'Client: Forms, animations, real-time updates, local state',
          ]}
          whyUseIt="Ek example — markdown syntax highlight karna hai. Plain React mein: highlight.js bundle mein jaata hai — 150KB user ke browser pe. Next.js Server Component mein: highlighting server pe hoti hai, HTML already highlighted client ko aata hai — highlight.js client bundle mein zero KB. 150KB JavaScript save! Page load dramatically faster. Ye ek example tha — heavy libraries jo server pe hi run ho sakti hain, unhe client bundle se nikalo. Users ko faster experience milega."
          howToUse={{
            filename: 'server-client.tsx',
            language: 'typescript',
            code: `// SERVER COMPONENT (default — no directive needed)
// app/products/page.tsx
import { db } from '@/lib/db'  // Direct DB access — client par nahi chalega

async function ProductsPage() {
  // Async/await directly — no useEffect, no loading state
  const products = await db.product.findMany({ take: 20 })

  return (
    <div>
      <h1>Products</h1>
      {/* Server Component — Client Component mix possible */}
      {products.map(p => (
        <ProductCard key={p.id} product={p}>
          <AddToCartButton productId={p.id} />  {/* Client Component */}
        </ProductCard>
      ))}
    </div>
  )
}

// CLIENT COMPONENT — 'use client' directive
// components/AddToCartButton.tsx
'use client'

import { useState } from 'react'

interface AddToCartButtonProps { productId: string }

function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)

  return (
    <button
      onClick={() => {
        addToCart(productId)
        setAdded(true)
      }}
    >
      {added ? '✓ Added' : 'Add to Cart'}
    </button>
  )
}

// Server Component mein async data fetching — clean!
// No useState, no useEffect, no loading spinner needed
async function UserProfile({ userId }: { userId: string }) {
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) notFound()
  return <div>{user.name}</div>  // Direct render
}`,
            explanation: "Under the hood kya hota hai — 'use client' ek boundary mark karta hai. Ye file aur is file ke sare imports client bundle mein jaate hain. Server Component db.product.findMany() call karta hai — ye server pe chalta hai, Prisma client, DB credentials — sab server pe. ProductCard Server Component hai — DB data direct receive karta hai. AddToCartButton 'use client' hai — useState hai, onClick hai — ye client bundle mein jaata hai. Lekin Server Component AddToCartButton ko children ki tarah pass kar sakta hai — composition pattern. Sahi architecture: data fetching server pe, interactivity client pe.",
          }}
          realWorldScenario="Product page anatomy — ProductPage Server Component (DB se product fetch, description render, SEO metadata). ProductImages Server Component (images render — no interactivity). AddToCartButton Client Component (useState, onClick — basket mein add). SizeSelector Client Component (selected state, user interaction). ReviewsTab Client Component (tab switch, load more). Server: content aur SEO. Client: sirf jahan click, type, state chahiye. JavaScript bundle minimum — user happy."
          commonMistakes={[
            {
              mistake: '"use client" unnecessarily puri page par lagana',
              why: 'Poori page client bundle mein jaati hai — Server Components ka benefit lost.',
              fix: 'Sirf leaf components client mark karo jahan interactivity chahiye. Parent Server Component rakho — data fetch wahan hoti hai.',
            },
            {
              mistake: 'Server Component mein browser-only code use karna',
              why: 'window, document, localStorage — server par exist nahi karte. Error: window is not defined.',
              fix: 'Browser APIs sirf Client Components mein use karo. Ya dynamic import with ssr: false: import dynamic from "next/dynamic"; const Comp = dynamic(() => import("./BrowserOnly"), { ssr: false }).',
            },
          ]}
          proTip="@next/bundle-analyzer install karo — visual treemap milta hai client bundle ka. Kya heavy library unnecessarily client bundle mein hai? Server Component mein move karo. Markdown parser, syntax highlighter, PDF generator, date library — sab potential candidates hain server-only ke liye. Bundle size se performance directly correlate karta hai. 1 second faster load = zyada conversions. Bundle analyzer = money saver."
        />
      </div>

      <div id="data-fetching-nextjs">
        <ConceptCard
          title="Data Fetching in Next.js"
          emoji="🌊"
          difficulty="advanced"
          whatIsIt="Ek shocking realization — App Router mein useEffect se data fetch karna zyada zaroori nahi raha. Server Component directly async function hai — awaitt karo, data lo, render karo. Khatam. No useEffect, no loading state, no empty state. Route Handlers REST API endpoints hain — /api/users/route.ts aur /api/users kaam karta hai. Server Actions — form submission ke liye API route banana bhi optional ho gaya. 'use server' mark karo, form mein action prop deo — JavaScript bhi band kar do toh bhi kaam karega. Progressive enhancement real mein."
          whenToUse={[
            'Page data — Server Component mein fetch directly (no useEffect)',
            'API endpoints — Route Handlers in app/api/route.ts',
            'Form mutations — Server Actions (no separate API needed)',
            'Revalidation — on-demand cache invalidation',
          ]}
          whyUseIt="Gino — plain React mein form submit karne ke liye kya karna padta tha? useState se form state manage karo, onSubmit handler likho, fetch('/api/submit') call karo, loading state handle karo, error state handle karo — minimum 50 lines. Server Action se? createPost function likho, form ka action prop do — 10 lines. API route banana nahi pada. Client JavaScript kam hua. TypeScript end-to-end type safe raha. Progressive enhancement bonus. Ye hai simplification ka real impact."
          howToUse={{
            filename: 'data-fetching.tsx',
            language: 'typescript',
            code: `// Route Handler — API endpoint
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const users = await db.user.findMany()
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json() as NewUser
  const user = await db.user.create({ data: body })
  return NextResponse.json(user, { status: 201 })
}

// Server Action — form submission
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  await db.post.create({ data: { title, content } })

  // Cache revalidate karo — ISR pages fresh data lo
  revalidatePath('/blog')
}

// Form mein Server Action directly use karo
function CreatePostForm() {
  return (
    <form action={createPost}>  {/* No client JS needed! */}
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">Create Post</button>
    </form>
  )
}

// Server Component mein parallel data fetching
async function Dashboard() {
  // Parallel fetch — waterfall nahi
  const [user, stats, notifications] = await Promise.all([
    fetchUser(),
    fetchStats(),
    fetchNotifications(),
  ])

  return <DashboardUI user={user} stats={stats} notifications={notifications} />
}`,
            explanation: "Route Handler file mein GET, POST, PUT, DELETE — functions export karo. URL automatically handle hota hai. Server Action mein 'use server' — Next.js guarantee karta hai ye code sirf server pe chalega, client bundle mein nahi jaayega. Form ki action prop ek function accept karta hai — browser built-in form submission use hoti hai. JavaScript disabled ho toh bhi form submit hoti hai — HTML form POST. Parallel fetching — Promise.all se teen API calls simultaneously. Ek await karo — teeno ek saath chalenge. Waterfall vs parallel — 3x performance difference possible.",
          }}
          realWorldScenario="Blog platform complete data flow — Post list Server Component hai, DB se directly posts fetch karta hai, SSG generate hota hai. Create post form — Server Action createPost hai, API route nahi banaya. revalidatePath('/blog') call hota hai — ISR cache invalidate hoti hai, next visitor ko fresh list milti hai. Post detail ISR hai — mostly static, on-demand refresh possible. Ek Next.js app mein sab data patterns elegantly handled."
          commonMistakes={[
            {
              mistake: 'Sequential fetch instead of parallel',
              why: 'Waterfall: user fetch → stats fetch → notifications fetch — total time additive. 3 parallel fetches much faster.',
              fix: 'Promise.all se parallel fetch karo: const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]). N/A agar ek fetch doosre ka result need karta ho.',
            },
            {
              mistake: 'Server Action mein sensitive data client ko return karna',
              why: 'Server Action return value client par available hota hai — database objects, internal IDs expose ho sakte hain.',
              fix: 'Specific fields return karo: return { id: user.id, name: user.name } — never full DB object. Passwords, internal fields strip karo.',
            },
          ]}
          proTip="Full type-safe form pipeline without API layer — Server Action + Zod validation + useFormState. Server Action Zod se input validate karta hai, errors return karta hai. Client Component useFormState hook se server state receive karta hai — validation errors inline dikhao, success state handle karo. No REST API, no extra fetch, no manual error state — end-to-end type safe form in 30 lines. Ye 2024 ka modern full-stack React pattern hai."
        />
      </div>

      <div id="nextjs-deployment">
        <ConceptCard
          title="Deployment — Vercel, Static, Env Vars"
          emoji="🚀"
          difficulty="advanced"
          whatIsIt="Next.js deploy karna simple hai, lekin environment variables ka ek critical gotcha hai jo beginners har baar miss karte hain. NEXT_PUBLIC_ prefix wale variables client bundle mein jaate hain — browser mein visible, source code mein readable. Bina NEXT_PUBLIC_ wale sirf server pe. Ye distinction security ke liye critical hai. API keys, DB passwords — kabhi NEXT_PUBLIC_ nahi. Publishable keys, public URLs — NEXT_PUBLIC_ theek hai. Ye rule ek baar dil pe likh lo."
          whenToUse={[
            'Vercel: Simplest deployment, automatic previews, Edge network',
            'Self-hosted: Custom infrastructure, more control, cost optimization',
            'Static export: Pure static site, CDN par host karo — no Node.js server needed',
            'Docker: Containerized deployment, Kubernetes, enterprise environments',
          ]}
          whyUseIt="Vercel choose kyon karein? Kyunki Vercel ne Next.js banaya — dono ek sath evolve hote hain. ISR, Edge Functions, Image Optimization, Analytics — sab Vercel pe out of the box kaam karta hai. Self-host pe manually configure karna padta hai. But Vercel costly ho sakta hai scale pe — tab Docker + VPS. Environment variables — Vercel dashboard mein set karo, never .env.production file mein commit karo. Git history permanent hai — ek baar secret commit hua toh rotate karna padega."
          howToUse={{
            filename: 'deployment.env',
            language: 'bash',
            code: `# .env.local — local development
DATABASE_URL="postgresql://localhost:5432/mydb"
JWT_SECRET="local-secret-key"
STRIPE_SECRET_KEY="sk_test_..."

# Client mein accessible — NEXT_PUBLIC_ prefix
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXT_PUBLIC_STRIPE_KEY="pk_test_..."

# next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static export (no Node.js server)
  // output: 'export',

  // Image domains allow karo
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.example.com' },
    ],
  },

  // Redirects
  async redirects() {
    return [
      { source: '/old-blog/:slug', destination: '/blog/:slug', permanent: true },
    ]
  },
}
export default nextConfig

# Vercel deploy — .env.production mein kabhi hardcode nahi karo
# Vercel Dashboard → Project Settings → Environment Variables mein add karo

# Docker deploy
# FROM node:20-alpine
# COPY . .
# RUN npm ci && npm run build
# CMD ["npm", "start"]  -- next start`,
            explanation: "Ek mental model — NEXT_PUBLIC_ = public announcement. Sab sun sakte hain. Bina prefix = secret meeting. Sirf server ko pata hai. Database URL, JWT secret, Stripe secret key — ye sab server-only. Koi bhi browser DevTools khol ke network tab mein bundle dekhe toh NEXT_PUBLIC_ variables seedhe readable hain. .env.local file gitignore mein hona MANDATORY hai — .env.example template file banao, real values nahi, sirf keys. Naye developer clone kare toh samjhe kaun se variables chahiye.",
          }}
          realWorldScenario="Proper setup kaise karta hai — .env.local development mein hai, gitignored. .env.example template GitHub pe hai — sirf key names, no values. Vercel mein teen environments hain — development, preview, production. Staging PR pe deploy hota hai — preview environment variables lagti hain. Production merge hota hai — production variables. Alag Stripe keys har environment ke liye — test keys staging pe, live keys production pe. Koi accidental charge nahi, koi secret leak nahi."
          commonMistakes={[
            {
              mistake: 'SECRET keys NEXT_PUBLIC_ se prefix karna',
              why: 'NEXT_PUBLIC_ variables client bundle mein visible hote hain — browser source code mein dikh jaate hain. Security breach.',
              fix: 'Server-only secrets: DATABASE_URL, JWT_SECRET, STRIPE_SECRET_KEY — kabhi NEXT_PUBLIC_ prefix mat lagao. Sirf client-safe values: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.',
            },
            {
              mistake: '.env.local production mein use karna',
              why: '.env.local local development ke liye hai. Production mein Vercel/server ke environment variables use hote hain.',
              fix: '.env.local gitignore mein rakho. Production variables Vercel dashboard ya server environment mein set karo. .env.example file rakho template ke liye (no real values).',
            },
          ]}
          proTip="@vercel/analytics package — ek component, real user data. layout.tsx mein <Analytics /> add karo — Core Web Vitals real users ka track hona shuru. Ye lab data nahi, field data hai — actual users ke actual devices pe actual network speeds. LCP slow hai Mumbai mein? Bangalore mein theek hai? Ye granularity Lighthouse nahi deta. Real data se optimize karo — guesswork khatam, impact maximum."
        />
      </div>
    </div>
  )
}
