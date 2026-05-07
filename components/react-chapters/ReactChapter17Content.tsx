'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

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
          Next.js ne React ko ek meta-framework mein badal diya — file-based routing, server-side rendering, API routes, Server Components sab ek jagah. Vercel ne banaaya, lekin ye open source hai aur self-host bhi kar sakte ho. Modern web development ka go-to choice ban gaya hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          App Router (Next.js 13+) ek paradigm shift hai — React Server Components default hain, client components opt-in hain. Is chapter mein dono samjhein aur kab kya use karein decide karna seekhein.
        </p>
      </div>

      <div id="nextjs-intro">
        <ConceptCard
          title="Next.js Kya Hai? SSR, SSG, ISR"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="Next.js React ke upar ek framework hai jo rendering strategies provide karta hai: SSR (Server-Side Rendering — har request pe server render), SSG (Static Site Generation — build time render), ISR (Incremental Static Regeneration — static + periodic refresh), CSR (Client-Side Rendering — browser mein render, traditional React). Sahi strategy sahi use case ke liye choose karo."
          whenToUse={[
            'SSR: User-specific content, real-time data, SEO important content',
            'SSG: Blog posts, docs, marketing pages — rarely changing content',
            'ISR: Product pages — mostly static but occasionally update',
            'CSR: Dashboards, admin panels — SEO nahi chahiye, rich interactivity chahiye',
          ]}
          whyUseIt="Plain React CSR hai — initial HTML empty hota hai, browser JavaScript load karta hai, phir render hota hai. SEO suffer karta hai, First Contentful Paint slow. Next.js SSR/SSG se pre-rendered HTML milta hai — fast load, excellent SEO, better performance. Full-stack capabilities bhi hain."
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
            explanation: "App Router mein Server Components default hain — async function directly render karta hai. fetch mein cache option se behavior control: no-store = SSR, revalidate = ISR, default = SSG. generateStaticParams se dynamic routes build time par generate hote hain.",
          }}
          realWorldScenario="Blog site: posts SSG se build time render hain — instant load, excellent SEO. Dashboard SSR se — user-specific data fresh milta hai. Product pages ISR se — mostly static but daily price update hoti hai. Ek Next.js app mein sab strategies coexist karte hain."
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
          proTip="Next.js analytics build mein time check karo: next build output mein har page ka render type dikhata hai (SSG, ISR, SSR, Dynamic). Static pages (SSG) green, dynamic pages (SSR) orange — optimize karo static pages maximize karne ke liye. Better CDN caching = faster users."
        />
      </div>

      <div id="app-router">
        <ConceptCard
          title="App Router — The New Way"
          emoji="📁"
          difficulty="advanced"
          whatIsIt="App Router (Next.js 13+ /app directory) file-based routing system hai jahan folders = URL segments, page.tsx = route component, layout.tsx = shared layout, loading.tsx = loading UI, error.tsx = error boundary. Ye convention-over-configuration approach development speed dramatically increase karta hai."
          whenToUse={[
            'New Next.js project — hamesha App Router se shuru karo',
            'Nested layouts chahiye — admin panel, dashboard jahan tabs/sidebar consistent hain',
            'Loading UI per-route chahiye — automatic Suspense boundaries',
            'Server Components default behavior chahiye',
          ]}
          whyUseIt="App Router mein har segment apna loading.tsx, error.tsx, not-found.tsx define kar sakta hai — granular UX control. Parallel routes, intercepting routes — complex UI patterns possible hain. React Server Components default — client bundle smaller hota hai."
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
            explanation: "File naming conventions strict hain: page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx, route.ts (API). Dynamic segments: [id] = /users/123. Catch-all: [...slug] = /blog/2024/post-title. Groups: (dashboard) = folder without URL segment.",
          }}
          realWorldScenario="SaaS dashboard — /app/(auth)/login sirf auth pages ke liye layout, /app/(dashboard)/analytics dashboard layout ke saath. (auth) aur (dashboard) route groups hain — URL mein nahi dikhte. Alag layouts, same domain."
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
          proTip="Route groups (parentheses mein folder name) se URL mein affect kiye bina organize karo: /app/(marketing)/about, /app/(marketing)/pricing — alag layout, /about aur /pricing URLs clean. Authentication middleware bhi route groups se target karo."
        />
      </div>

      <div id="server-vs-client-components">
        <ConceptCard
          title="Server vs Client Components"
          emoji="🖥️"
          difficulty="advanced"
          whatIsIt="Server Components: server par render hote hain, HTML client ko jaata hai, JavaScript bundle mein nahi hote — direct database access, async/await, no hooks. Client Components: 'use client' directive, browser mein hydrate hote hain, hooks aur interactivity support karte hain. Default Server, opt-in Client."
          whenToUse={[
            'Server Component: Data fetching (DB, API), heavy computations, no interactivity',
            'Client Component: useState, useEffect, onClick, browser APIs',
            'Server: Sensitive credentials hide karna — API keys server par rehti hain',
            'Client: Forms, animations, real-time updates, local state',
          ]}
          whyUseIt="Server Components se bundle size dramatically kam hoti hai — heavy libraries server par run hoti hain, client ko sirf HTML aata hai. Better performance, faster load. Client Components sirf jahan interactivity chahiye wahan use karo — minimal JavaScript to browser."
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
            explanation: "'use client' boundary — ye file aur iske import chain client bundle mein jaate hain. Server Component children prop se Client Component receive kar sakta hai — composition pattern. Direct DB access Server Component mein — Prisma, SQL sab theek hai. Client Component mein API call karni padegi.",
          }}
          realWorldScenario="E-commerce product page — ProductPage (Server Component) se DB se product data fetch karo. Product images, description server-rendered. Add to Cart, Size selector, Reviews tab — Client Components. Server renders static content, client handles interactions."
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
          proTip="Server Components mein heavy libraries import karo — markdown parsers, syntax highlighters, PDF generators. Client bundle mein nahi jaate — zero impact on JS bundle size. Next.js bundle analyzer (@next/bundle-analyzer) se dekho kya client bundle mein ja raha hai."
        />
      </div>

      <div id="data-fetching-nextjs">
        <ConceptCard
          title="Data Fetching in Next.js"
          emoji="🌊"
          difficulty="advanced"
          whatIsIt="Next.js App Router mein Server Components mein directly async/await se data fetch karo — useEffect nahi chahiye. Route Handlers (/api/route.ts) REST API endpoints banate hain. Server Actions form submissions aur mutations ke liye — type-safe, progressive enhancement ke saath."
          whenToUse={[
            'Page data — Server Component mein fetch directly (no useEffect)',
            'API endpoints — Route Handlers in app/api/route.ts',
            'Form mutations — Server Actions (no separate API needed)',
            'Revalidation — on-demand cache invalidation',
          ]}
          whyUseIt="App Router mein data fetching dramatically simpler hai — Server Components async functions hain, seedha data fetch karo, render karo. Client-side loading states, error states — sab Next.js handle karta hai loading.tsx aur error.tsx se. Server Actions form submission ke liye API route create karna obsolete kar deta hai."
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
            explanation: "Route Handlers HTTP methods export karte hain — GET, POST, PUT, DELETE. Server Actions 'use server' directive se mark hote hain — server par run karte hain. Form action prop directly Server Action accept karta hai — JavaScript disable hone par bhi kaam karta hai (progressive enhancement). Promise.all se parallel fetching — waterfall avoid karo.",
          }}
          realWorldScenario="Blog platform: Post list page (Server Component, DB fetch, SSG), Create post form (Server Action, no separate API needed), Post detail (ISR, revalidateTag se on-demand refresh). Saari data patterns Next.js mein cleanly handled."
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
          proTip="Server Actions + zod validation + useFormState hook = complete type-safe form pipeline without any separate API layer. useFormState client component mein hota hai jo Server Action state receive karta hai — validation errors, success messages sab handle hoti hain."
        />
      </div>

      <div id="nextjs-deployment">
        <ConceptCard
          title="Deployment — Vercel, Static, Env Vars"
          emoji="🚀"
          difficulty="advanced"
          whatIsIt="Next.js deploy karna Vercel se easiest hai — git push karo, automatic deploy hota hai. Self-host bhi possible hai Node.js server par. Static export bhi possible hai (sirf SSG/CSR apps ke liye). Environment variables — public (.env.local, NEXT_PUBLIC_ prefix), server-only (.env) — sahi configuration zaroori hai."
          whenToUse={[
            'Vercel: Simplest deployment, automatic previews, Edge network',
            'Self-hosted: Custom infrastructure, more control, cost optimization',
            'Static export: Pure static site, CDN par host karo — no Node.js server needed',
            'Docker: Containerized deployment, Kubernetes, enterprise environments',
          ]}
          whyUseIt="Deployment correctly configure karna performance aur security dono affect karta hai. Vercel Next.js ke liye optimized hai — automatic SSR, ISR, Edge Functions sab work karte hain. Environment variables properly split karo — public variables client bundle mein jaate hain."
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
            explanation: "NEXT_PUBLIC_ prefix se variable client bundle mein jaata hai — sensitive values kabhi NEXT_PUBLIC_ se mark nahi karo. .env.local gitignore mein hona chahiye. Vercel mein environment variables dashboard se set karo — automatically inject hoti hain. next start production mode mein run karta hai.",
          }}
          realWorldScenario="SaaS product: Development mein .env.local, staging mein Vercel preview environment variables, production mein Vercel production environment. API keys, DB URLs — sab environment-specific. NEXT_PUBLIC_STRIPE_KEY sirf Stripe publishable key hai — secret key server-only."
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
          proTip="Vercel Speed Insights aur Analytics — @vercel/analytics package install karo, layout.tsx mein <Analytics /> add karo. Real User Metrics (Core Web Vitals) automatically track hote hain. Free plan mein limited, Pro mein full analytics. Production performance data se optimize karo."
        />
      </div>
    </div>
  )
}
