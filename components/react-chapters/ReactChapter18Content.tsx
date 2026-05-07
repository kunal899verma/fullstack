'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

function FullStackArchDiagram() {
  const layers = [
    { label: 'Browser — React', sublabel: 'Client Components, TanStack Query, Zustand', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', icon: '🌐' },
    { label: 'Next.js — API Layer', sublabel: 'Route Handlers, Server Actions, Server Components', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '⚡' },
    { label: 'Auth Layer', sublabel: 'NextAuth / JWT — session verify, middleware guard', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', icon: '🔐', aside: true },
    { label: 'Database — PostgreSQL', sublabel: 'Prisma ORM — queries, migrations, type-safe schema', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: '🗄️' },
    { label: 'Cache — Redis', sublabel: 'Session store, rate limiting, hot data cache', color: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', icon: '⚡' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Full Stack React Architecture — Data Flow</p>
      <div className="max-w-lg mx-auto">
        <div className="space-y-2">
          {layers.filter(l => !l.aside).map((l, i, arr) => (
            <div key={i}>
              <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: l.bg, border: `1px solid ${l.border}` }}>
                <span className="text-xl">{l.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: l.color }}>{l.label}</p>
                  <p className="text-xs text-[#71717A] mt-0.5">{l.sublabel}</p>
                </div>
              </div>
              {i < arr.length - 1 && (
                <div className="flex justify-center py-1">
                  <span className="text-[#71717A] text-xs">
                    {i === 0 ? '↓ fetch / Server Action / API call' : i === 1 ? '↓ DB query via Prisma' : '↓ cache invalidation'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl px-5 py-3 flex items-center gap-4" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}>
          <span className="text-lg">🔐</span>
          <div className="flex-1">
            <p className="font-bold text-xs text-[#F5F5F7]">Auth Layer (cross-cutting)</p>
            <p className="text-xs text-[#71717A] mt-0.5">NextAuth / JWT — middleware verifies every request to protected routes</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReactChapter18Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          React Capstone — Sab Kuch Ek Saath
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Yaar, poora React course kar liya. Ab ek important sawaal — kya tum React jaante ho, ya kya tum production mein React ship karna jaante ho? Ye dono alag cheezein hain. Course mein sab cheezein isolated sikhte hain — real apps mein sab ek saath kaam karta hai, ek doosre pe depend karta hai, aur ek cheez galat ho toh poora system suffer karta hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum production mindset banate hain. Architecture decisions kab karo, state kahan rakho, performance kab optimize karo, kaise test karo, kya production pe check karo. Ye sirf checklist nahi — ye ek senior developer ki soch hai jo tumhare andar develop honi chahiye. Real engineers har decision ke saath trade-offs justify karte hain. Aaj se tum bhi karoge.
        </p>
      </div>

      <FullStackArchDiagram />

      <div id="project-architecture">
        <ConceptCard
          title="Project Architecture — Feature-Based Folder Structure"
          emoji="🏗️"
          difficulty="advanced"
          whatIsIt="Ek painful scenario — checkout bug fix karna hai. /components mein jaao, 200 files mein CheckoutForm dhundho. /hooks mein useCheckout dhundho. /services mein checkoutService dhundho. /types mein CheckoutTypes dhundho. Checkout related code chaar jagah bichha hua hai. Feature-based structure mein? /features/checkout — sab kuch ek jagah. Component, hook, service, types — ek folder. Bug fix karna hai? /features/checkout mein jaao, done. Ye hai feature-based structure ka ROI."
          whenToUse={[
            'Medium-large apps jahan multiple features/domains hain',
            'Multiple team members kaam kar rahe hoon — clear ownership',
            'Code splitting route-level karna ho — feature = chunk',
            'Features independent deploy karne ki possibility ho future mein',
          ]}
          whyUseIt="Naya developer join hua team mein. Pehla task: leads feature mein kuch add karna. Type-based structure mein? 'Bhai, yahan components hain, yahan hooks hain, yahan services hain — samjho khud.' Feature-based structure mein? '/features/leads kholo, sab kuch wahan hai.' Onboarding time dramatically kam. Code ownership clear — lead feature issue? Leads team. Billing bug? Billing team. Ye clarity 20 developers ki team mein invaluable hai."
          howToUse={{
            filename: 'project-structure.txt',
            language: 'bash',
            code: `src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (auth)/
│   │   └── login/page.tsx
│   └── dashboard/
│       └── page.tsx
│
├── features/               # Feature modules
│   ├── auth/
│   │   ├── components/     # AuthForm, LoginButton
│   │   ├── hooks/          # useAuth, useSession
│   │   ├── store/          # authSlice.ts (Zustand)
│   │   ├── api/            # auth.service.ts (API calls)
│   │   ├── types/          # auth.types.ts
│   │   └── index.ts        # Public API — only export what's needed
│   │
│   ├── cart/
│   │   ├── components/     # CartDrawer, CartItem, CartSummary
│   │   ├── hooks/          # useCart, useCartTotal
│   │   ├── store/          # cartSlice.ts
│   │   └── index.ts
│   │
│   └── products/
│       ├── components/     # ProductCard, ProductGrid, ProductDetail
│       ├── hooks/          # useProducts, useProduct
│       ├── api/            # products.queries.ts (TanStack Query)
│       └── index.ts
│
├── shared/                 # Shared across features
│   ├── components/         # Button, Input, Modal, Toast
│   ├── hooks/              # useDebounce, useLocalStorage
│   ├── utils/              # formatPrice, cn(), dates
│   └── types/              # Common types
│
└── lib/                    # Third-party config
    ├── prisma.ts
    ├── redis.ts
    └── query-client.ts`,
            explanation: "index.ts ka concept — public API boundary. Koi bhi feature ke andar directly import nahi karega: import { something } from '@/features/auth/components/AuthForm'. Sirf: import { AuthForm } from '@/features/auth'. Kyon? Kal internal file rename karo — baaki features ko koi fark nahi, index.ts same rahega. Encapsulation — feature apni internals hide karta hai. Shared folder mein kya aata hai? Koi bhi code jo teen ya zyada features use karte hain — utility functions, shared components, shared types. lib folder = third-party setup files — prisma.ts, redis.ts, stripe.ts.",
          }}
          realWorldScenario="Real CRM product mein: /features/leads (lead management), /features/pipeline (deal stages), /features/contacts (contact profiles), /features/billing (subscription). Har team apna folder own karti hai. Production bug aaya leads import mein — koi confusion nahi, /features/leads mein jaao. New developer billing feature pe lagana hai — /features/billing unka tera, khud explore kare, 2 din mein productive. Ye structure scale karta hai — 5 developers ho ya 50."
          commonMistakes={[
            {
              mistake: 'Features ke beech circular imports allow karna',
              why: 'cart imports from auth, auth imports from cart — circular dependency build issues aur mental model confusion create karta hai.',
              fix: 'Shared dependencies /shared ya /lib mein move karo. Feature A ke baare mein Feature B ko nahi pata hona chahiye ideally.',
            },
            {
              mistake: 'Structure decide karne mein bahut waqt lagana',
              why: 'Architecture bikeshedding — feature develop karne ke bajaye folder structure debate mein waqt waste.',
              fix: 'Simple se shuru karo: /components, /hooks, /pages. Feature-based tab move karo jab dard feel ho — usually around 10+ components.',
            },
          ]}
          proTip="../../../../components/Button — yaar ye padhna bhi painful hai. tsconfig.json mein path aliases: @/* = ./src/*. Ab: import Button from '@/shared/components/Button'. Clean, readable, refactoring-friendly — folder move karo, import same rehta hai. Barrel exports (index.ts) ke saath combine karo — import { AuthForm, useAuth } from '@/features/auth'. Ek line, clean API, no internal paths leak. Setup mein 5 minute — DX improvement permanent."
        />
      </div>

      <div id="state-design">
        <ConceptCard
          title="State Design — Sahi Jagah Sahi State"
          emoji="🎯"
          difficulty="advanced"
          whatIsIt="Ek common interview question — 'React mein state kahan rakhni chahiye?' Wrong answer: 'Sab Zustand mein daal do.' Right answer: 'Depend karta hai.' Aur ye genuinely depend karta hai. Har state ka ek natural home hota hai — local, lifted, global client, server state. Galat jagah rakha toh ya unnecessary re-renders milenge, ya stale data milega, ya debugging nightmare. Sahi jagah rakkha toh code simple rehta hai."
          whenToUse={[
            'Local: Modal open/close, form input, hover state — sirf ek component use kare',
            'Lifted: Sibling components share karein — common parent mein rakho',
            'Global (Zustand): Cart, user auth, notifications — app-wide persistent state',
            'Server (TanStack Query): API data — user list, products, orders',
          ]}
          whyUseIt="Co-location principle — state jahan use ho wahan rakho. Ek button ka isLoading state global store mein kyun? Sirf woh button use karta hai! useState wahan. Tab ek modal open state — sirf us feature mein. useState wahan. User ka cart — app mein kahin bhi add/remove hota hai — Zustand. User list — API se aata hai, cache chahiye, invalidation chahiye — TanStack Query. Ye categories ek baar internalize karo, state management decisions automatic ho jaati hain."
          howToUse={{
            filename: 'state-design.tsx',
            language: 'typescript',
            code: `// 1. LOCAL STATE — component ke andar
function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)  // Local
  const [showDetails, setShowDetails] = useState(false)     // Local
  return <div>...</div>
}

// 2. LIFTED STATE — sibling share kare
function ProductFilters({ onFilter }: { onFilter: (f: Filter) => void }) {
  // Filter state parent mein, siblings share karte hain
  return <FilterUI onFilter={onFilter} />
}

// 3. GLOBAL STATE (Zustand) — app-wide
const useCartStore = create<CartState>()((set) => ({
  items: [],
  addItem: (item) => set(s => ({ items: [...s.items, item] })),
}))

// Anywhere in app:
function CartBadge() {
  const count = useCartStore(s => s.items.length)  // Selective subscription
  return <span>{count}</span>
}

// 4. SERVER STATE (TanStack Query) — API data
function ProductList() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.getProducts(),
  })
  return isLoading ? <Skeleton /> : <Grid products={products ?? []} />
}

// Decision flowchart:
// Is it from API? → TanStack Query
// Is it UI-only (no persistence)? → useState
// Do siblings need it? → Lift to parent
// Does entire app need it? → Zustand
// Do multiple tabs need sync? → Zustand + persist`,
            explanation: "Decision tree yaad karo — API se aata hai? TanStack Query, done. Component ke andar sirf? useState. Siblings share karte hain? Parent mein lift karo. Poori app mein? Zustand. Multiple browser tabs sync? Zustand + persist middleware. Ye flow 90% situations cover karta hai. Edge cases: URL bar mein state chahiye — React Router searchParams use karo. Form state — React Hook Form ke paas khud store hai, useFormState use karo. Animation state — Framer Motion ke paas. Har tool apna state apne paas rakhta hai.",
          }}
          realWorldScenario="Twitter clone state map — Tweet list? TanStack Query se API data fetch, automatic caching. Like button click? Optimistic update — useMutation se immediately UI update karo, rollback karo agar fail ho. Compose modal open/close? Local useState — sirf wahi component use karta hai. Notification count? Zustand — header aur multiple places use karta hai. Dark mode? Zustand + persist — page reload ke baad bhi yaad rahe. Har piece apni sahi jagah — no coupling, no confusion."
          commonMistakes={[
            {
              mistake: 'Server data ko useState mein copy karna aur manually sync karna',
              why: 'Cache invalidation hard hai — useState mein rakha data stale ho jaata hai. Double source of truth.',
              fix: 'Server data sirf TanStack Query mein rakho — queryClient.invalidateQueries se fresh data lo. useState sirf optimistic UI ke liye.',
            },
            {
              mistake: 'Form state Zustand mein daalna',
              why: 'Form state transient hai — submit hone par reset hona chahiye. Global store mein daalne se complexity aur stale form state issues aate hain.',
              fix: 'Form state ke liye React Hook Form use karo — validation, submission, error handling sab built-in. Zustand se form data mat rakho.',
            },
          ]}
          proTip="Global state audit karo — Zustand store mein kitni properties hain? 3-5 — normal. 20+ — warning signal. 50+ — critical, refactor immediately. Zyada global state ka matlab 90% cases mein ye hai ki server state galat jagah rakhi hai. User list, products, orders — ye sab API data hai, TanStack Query mein hona chahiye, Zustand mein nahi. Zustand sirf truly global client state ke liye — cart, auth user, theme, UI preferences. Audit karo, migrate karo — app dramatically simpler ho jaayegi."
        />
      </div>

      <div id="performance-checklist">
        <ConceptCard
          title="Performance Checklist — Production Ready"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="Shocking stat — Google research kehta hai: 1 second slow = 7% conversion loss. Ek second! Tumhara app agar 4 seconds mein load hota hai aur competitor ka 2 seconds mein — users wahan jaayenge. Performance sirf 'nice to have' nahi, direct business metric hai. Core Web Vitals Google ranking factor bhi hain — slow site = lower search ranking = less organic traffic. Ye checklist ensure karta hai ki launch se pehle known performance holes cover ho jaayein."
          whenToUse={[
            'Pre-launch checklist — deploy se pehle',
            'Performance regression caught hone par — Lighthouse score drop',
            'New feature add karne ke baad audit',
            'User complaints — "app slow hai"',
          ]}
          whyUseIt="Lighthouse score < 70 matlab poor SEO aur poor user experience. LCP > 2.5 seconds — Google red flag. CLS 0.15 — user ka content click karte waqt shift hota hai, frustration. Ye sab fixable hain — agar pata ho kahan dekhna hai. Next.js Image component, dynamic imports, virtual lists — ye tools exist karte hain exactly in problems ke liye. Pata hona kaafi hai."
          howToUse={{
            filename: 'performance-checklist.tsx',
            language: 'typescript',
            code: `// 1. BUNDLE SIZE
// next build output dekho — koi page > 500KB? Investigate
// @next/bundle-analyzer use karo
// Dynamic imports for heavy components:
const HeavyChart = dynamic(() => import('./Chart'), { ssr: false })

// 2. IMAGE OPTIMIZATION — Next.js Image component
import Image from 'next/image'

function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      loading="lazy"     // Below fold images lazy load
      priority           // Above fold — priority={true} LCP image
      placeholder="blur" // Low quality placeholder while loading
      blurDataURL="..."
    />
  )
}

// 3. REACT QUERY — Prefetch on hover
function ProductLink({ product }: { product: Product }) {
  const qc = useQueryClient()
  return (
    <Link
      href={'/products/' + product.slug}
      onMouseEnter={() =>
        qc.prefetchQuery(['product', product.slug], () => fetchProduct(product.slug))
      }
    >
      {product.name}
    </Link>
  )
}

// 4. MEMOIZATION — Profiler se identify karo pehle
const ProductCard = memo(({ product }: { product: Product }) => (
  <div>{product.name}</div>
))

// 5. VIRTUAL LISTS — 1000+ items ke liye
import { FixedSizeList } from 'react-window'
function VirtualList({ items }: { items: Item[] }) {
  return (
    <FixedSizeList height={600} itemCount={items.length} itemSize={50} width="100%">
      {({ index, style }) => <ItemRow item={items[index]} style={style} />}
    </FixedSizeList>
  )
}`,
            explanation: "Targets yaad karo — LCP < 2.5 seconds (largest element visible hone ka time), INP < 100ms (button click pe response time), CLS < 0.1 (unexpected layout jumps). Next.js Image kya karta hai automatically? AVIF/WebP convert karta hai (30-40% smaller), lazy load karta hai, blur placeholder deta hai, dimensions se CLS prevent karta hai. Koi manual optimization nahi — bas Image component use karo. react-window ka kaam: 10000 items render karni hain — sab DOM mein nahi daalega, sirf visible items render hoti hain. Scroll karte waqt swap hoti hain. Performance constant — list size se independent.",
          }}
          realWorldScenario="Real incident — product launch 2 din pehle Lighthouse run kiya. LCP 4.2 seconds — hero image priority={true} nahi tha, browser lazy load kar raha tha. Priority add kiya — 2.1 seconds. CLS 0.15 — images pe width/height nahi tha, browser layout reserve nahi karta tha, load hone par shift. Width/height add kiya — CLS 0.02. Score 62 se 94. Next hafte Google search ranking upar gayi. Do Lighthouse issues — measurable business impact."
          commonMistakes={[
            {
              mistake: 'Production performance data ke bina optimize karna',
              why: 'Development machine bahut fast hai — real user experience different. Staging par optimize karna misleading ho sakta hai.',
              fix: 'Vercel Analytics, Sentry Performance, ya Google Search Console se real user data lo. Core Web Vitals field data dekho lab data nahi.',
            },
            {
              mistake: 'Sab kuch memoize karna',
              why: 'memo, useMemo, useCallback sab overhead add karte hain — small components mein benefit se zyada cost.',
              fix: 'Profile first — React DevTools Profiler se slow components identify karo. Sirf proven slow components optimize karo.',
            },
          ]}
          proTip="Google Fonts ko @import ya link tag se mat lo — har user ek extra network request karta hai Google servers pe. next/font se? Fonts build time pe download hote hain, locally serve hoti hain — zero external request, better privacy, faster. Font size optimize hoti hai (sirf used characters). Aur sabse important — CLS eliminate hoti hai font swap se. Koi 'FOUT' (Flash of Unstyled Text) nahi. Ye ek line ka change — multiple performance wins."
        />
      </div>

      <div id="testing-strategy">
        <ConceptCard
          title="Testing Strategy — Kya Kitna Test Karo"
          emoji="🧪"
          difficulty="advanced"
          whatIsIt="'100% code coverage chahiye' — ye sunke smile aata hai. 100% coverage possible hai useless tests se. Ek return true likhne wala test bhi coverage deta hai. Coverage metric ek proxy hai, guarantee nahi. Asl goal: meaningful confidence. Ye milta hai right testing strategy se — unit tests for logic, integration tests for behavior, E2E for critical paths. Testing pyramid: base mein unit (fast, many), middle mein integration, top pe E2E (slow, few). 70/20/10 ratio — fast feedback + real confidence."
          whenToUse={[
            'Unit: Utility functions, custom hooks, complex logic — hamesha',
            'Integration: Forms, data fetching components, user workflows',
            'E2E (Playwright/Cypress): Checkout, signup, login — critical paths',
            'Visual regression: Design system components — screenshot tests',
          ]}
          whyUseIt="Sab E2E tests wali team ka CI time 45 minutes tha. PR merge karne se pehle 45 minute wait. Developer context switch karta tha, waapas aata tha, phir merge karta tha — productivity crash. Pyramid-based approach: unit + integration 5 minutes, E2E 15 minutes sirf critical paths ke liye. Total 20 minutes. Developer productive, CI fast, same confidence level. Trade-offs jaanna hi real engineering hai."
          howToUse={{
            filename: 'testing-strategy.test.tsx',
            language: 'typescript',
            code: `// UNIT TEST — utility function
describe('formatPrice', () => {
  test('formats Indian rupees correctly', () => {
    expect(formatPrice(999)).toBe('₹999')
    expect(formatPrice(1000)).toBe('₹1,000')
    expect(formatPrice(100000)).toBe('₹1,00,000')
  })
})

// INTEGRATION TEST — component + hook
describe('ProductSearch', () => {
  test('shows results after typing', async () => {
    const user = userEvent.setup()
    render(<ProductSearch />)  // Renders with MSW API mock

    await user.type(screen.getByRole('searchbox'), 'laptop')
    const results = await screen.findAllByRole('listitem')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0]).toHaveTextContent(/laptop/i)
  })
})

// E2E TEST (Playwright)
// tests/checkout.spec.ts
import { test, expect } from '@playwright/test'

test('complete checkout flow', async ({ page }) => {
  await page.goto('/products')
  await page.click('[data-testid="product-laptop"]')
  await page.click('button:has-text("Add to Cart")')
  await page.click('[href="/cart"]')
  await page.click('button:has-text("Checkout")')

  // Fill form
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="card"]', '4242424242424242')
  await page.click('button:has-text("Place Order")')

  await expect(page.locator('h1')).toContainText('Order Confirmed')
})`,
            explanation: "Har layer ka purpose alag hai. Unit — formatPrice function ek jagah test karo, 10 edge cases cover karo. Milliseconds mein run hota hai. Integration — ProductSearch component test karo MSW mock ke saath — API call, render, user interaction, result display — ek test mein sab. E2E — Playwright real browser mein chalata hai, real click karta hai, real navigation karta hai — slow lekin most realistic. Mix karo: 70% unit (fast, many, cheap), 20% integration (medium), 10% E2E (slow, few, expensive). Total coverage meaningful.",
          }}
          realWorldScenario="Fintech app — real numbers. 500 unit tests, chalte hain 1 minute mein. Interest calculation, formatting, validation logic sab covered. 100 integration tests — 3 minutes. Transfer form, account statement, transaction history behavior. 20 E2E tests — 10 minutes. Fund transfer complete flow, login/logout, critical payment paths. Total: 14 minutes CI. Deploy pe confidence: high. Developer frustration: low. Ye balance hai production team ka."
          commonMistakes={[
            {
              mistake: '100% code coverage target karna',
              why: 'Coverage metric ek proxy hai — easy to game. 100% coverage par bhi critical bugs ho sakte hain. Wrong priority.',
              fix: 'Critical business logic test karo — payment processing, auth, data transformation. Coverage metric reference ke liye dekhо, target nahi. Quality over quantity.',
            },
            {
              mistake: 'E2E tests ko CI mein blocking karna',
              why: 'E2E flaky hote hain — network issues, timing issues. Flaky tests CI block karte hain — team frustrated, tests ignore hone lagte hain.',
              fix: 'E2E tests retry configure karo (Playwright: retries: 2). Flaky tests isolate karo. E2E separate CI job mein chalao — block nahi karein fast unit/integration tests.',
            },
          ]}
          proTip="Kent C. Dodds ka Testing Trophy React ke liye zyada relevant hai — pyramid se zyada integration tests wali diamond shape. React apps mein integration tests sabse zyada bang-for-buck dete hain. Snapshot tests? Mostly skip karo — maintenance burden high, value low. Ek component mein koi bhi change karo — snapshot break — update karo — CI green. Koi real bug nahi pakda, sirf noise. Specific behavior test karo — toBeInTheDocument, toHaveValue. Meaningful assertions = meaningful tests."
        />
      </div>

      <div id="production-checklist">
        <ConceptCard
          title="Production Checklist — Ship Karo Confidently"
          emoji="🚀"
          difficulty="advanced"
          whatIsIt="Pehli production deployment — exciting moment. Koi feature push kiya, 100 users ne dekha, kisi ne kuch weird action kiya — app crash ho gaya. White screen. Users bounce kar gaye. Sentry nahi tha — pata bhi nahi chala. Error boundary nahi tha — poora app blank ho gaya. Analytics nahi tha — kitne users bounce kiye ye nahi pata. Ye avoidable hai. Ye checklist sirf checklist nahi — ye wo sab hai jo production mein kuch galat hone pe tumhe bachata hai. Senior vs junior ka fark yahi hai — senior ko pata hai kya miss ho sakta hai."
          whenToUse={[
            'New feature ship karne se pehle',
            'Initial production launch se pehle',
            'Major refactor ke baad',
            'Team mein onboard naye engineers ke liye reference',
          ]}
          whyUseIt="Ek stat jo mind blow kar deta hai — production bug fix karna development bug fix karne se 10x zyada expensive hai. User impact, reputation damage, SLA breach, hotfix pressure. Prevention much cheaper than cure. Ye checklist ek baar run karo — potentially bahut saara pain avoid ho jaata hai. Aur best part — ek baar habits ban gayi, checklist ki zaroorat nahi — sab automatically ho jaata hai."
          howToUse={{
            filename: 'production-checklist.tsx',
            language: 'typescript',
            code: `// 1. ERROR BOUNDARIES — crashes graceful handle karo
'use client'
import { Component, ErrorInfo, ReactNode } from 'react'

class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() { return { hasError: true } }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error caught:', error, info)
    // Sentry.captureException(error)  // Error tracking
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

// 2. ANALYTICS
import { Analytics } from '@vercel/analytics/react'
function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />  {/* Production mein Core Web Vitals track */}
      </body>
    </html>
  )
}

// 3. SECURITY HEADERS — next.config.ts
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: "default-src 'self'..." },
]

// 4. ENVIRONMENT CHECK
if (process.env.NODE_ENV === 'production') {
  // Console.log disable karo production mein
  console.log = () => {}
}

// Production checklist:
// [ ] Error boundaries sab critical sections mein
// [ ] Sentry ya similar error tracking setup
// [ ] Analytics (Vercel, Mixpanel, Posthog)
// [ ] Security headers configured
// [ ] Environment variables sahi set
// [ ] robots.txt, sitemap.xml
// [ ] Open Graph tags for social sharing
// [ ] Accessibility audit (axe-core)
// [ ] Lighthouse score > 90
// [ ] Load testing karo
// [ ] Rollback plan ready ho`,
            explanation: "Error boundaries kyon class component hain? Kyunki ye getDerivedStateFromError lifecycle method use karta hai — ye hook form mein abhi available nahi hai React mein. react-error-boundary package functional wrapper deta hai. Sentry setup kaise? npm install @sentry/nextjs, Sentry.init() karo — done. Free tier mein 5000 errors/month — small apps ke liye kaafi. Security headers — X-Frame-Options SAMEORIGIN se clickjacking prevent hoti hai, X-Content-Type-Options se MIME sniffing. Ye OWASP top 10 se basic protection hai. next.config.ts mein ek baar add karo — sab pages pe apply hoga.",
          }}
          realWorldScenario="Startup launch story — 2 hafte mein sab set kiya: Sentry, Vercel Analytics, error boundaries, Lighthouse 94, accessibility pass. Launch day ke 3 ghante baad — Sentry pe 3 errors aaye. Edge cases the — specific browser, specific flow. Next morning fix deploy. Users ne hardly notice kiya. Bina Sentry ke? Ye bugs kabhi pata nahi chalte jab tak koi explicitly complain nahi karta. Monitoring ki wajah se response time: hours, not weeks."
          commonMistakes={[
            {
              mistake: 'Error boundary poori app ke root par sirf ek',
              why: 'Ek component crash kare toh poori app blank ho jaati hai — terrible UX.',
              fix: 'Granular error boundaries — Feature level par, page section par. Sidebar crash kare toh main content intact rahe. react-error-boundary se easy implementation.',
            },
            {
              mistake: 'console.log production mein chhodna',
              why: 'Sensitive data logs mein aa sakta hai — user info, API responses. Performance overhead bhi.',
              fix: 'process.env.NODE_ENV check karo ya logging library use karo jaise pino — levels configure ho production mein. Next.js mein dead code elimination se automatically remove hote hain.',
            },
          ]}
          proTip="Uptime monitoring — Better Uptime ya OpenStatus free tier se setup karo. Har 1 minute pe check hota hai — site down ho toh SMS/email immediately. Tumse pehle tumhe pata hoga issue ka. Aur ek culture tip — postmortem karo. Har production incident ke baad 5 minute ka write-up: kya hua, root cause kya tha, fix kya kiya, prevention kaise karte. Blame nahi — learnings. Ye culture team ko exponentially better banata hai. Same mistake baar baar nahi hoti."
        />
      </div>
    </div>
  )
}
