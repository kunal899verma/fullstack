'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

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
          Congratulations! Tum React ka poora course complete karne wale ho. Ab waqt hai sab cheez ek saath apply karne ka — production-grade React application banane ki strategy. Architecture se leke deployment tak, performance se testing tak — ye chapter aapka guide hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ye sirf ek checklist nahi hai — ye ek mindset hai jisme har decision ko trade-offs ke saath justify kiya jaata hai. Real engineers yahi karte hain.
        </p>
      </div>

      <div id="project-architecture">
        <ConceptCard
          title="Project Architecture — Feature-Based Folder Structure"
          emoji="🏗️"
          difficulty="advanced"
          whatIsIt="Scalable React app ke liye feature-based folder structure best hai — type-based nahi. Type-based: /components, /hooks, /services — sab flat, hard to navigate. Feature-based: /features/auth, /features/cart, /features/dashboard — sab related code ek jagah. Team collaboration, code ownership, lazy loading — sab better hota hai."
          whenToUse={[
            'Medium-large apps jahan multiple features/domains hain',
            'Multiple team members kaam kar rahe hoon — clear ownership',
            'Code splitting route-level karna ho — feature = chunk',
            'Features independent deploy karne ki possibility ho future mein',
          ]}
          whyUseIt="Feature-based structure mein ek feature ka code ek jagah hota hai — add karo, delete karo, refactor karo bina poori codebase chhaan ke. Naya developer /features/checkout dekhe toh immediately samajh jaata hai kya kaata hai ye feature. Scalability — 100 features mein bhi same mental model."
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
            explanation: "index.ts as public API — sirf wahi export karo jo baahir chahiye. Features ek doosre ko sirf index.ts se import karein — direct file imports avoid karo (tight coupling). Shared folder cross-feature code ke liye. lib folder third-party library configuration ke liye.",
          }}
          realWorldScenario="Sequifi CRM mein: /features/leads, /features/pipeline, /features/contacts, /features/billing — har ek apna world hai. Lead related bug? /features/leads mein jaao. Billing feature naya developer ko assign karo — /features/billing unka territory. Clear ownership, fast debugging."
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
          proTip="Barrel exports (index.ts) se import paths clean hote hain: import { AuthForm, useAuth } from '@/features/auth' — ek source of truth. Path aliases configure karo tsconfig.json mein: @/features/*, @/shared/*, @/lib/*. Relative paths ../../../ never again."
        />
      </div>

      <div id="state-design">
        <ConceptCard
          title="State Design — Sahi Jagah Sahi State"
          emoji="🎯"
          difficulty="advanced"
          whatIsIt="State design ka matlab hai har piece of state ke liye sahi home decide karna. Local state (single component), lifted state (parent shared), global client state (Zustand), server state (TanStack Query) — ye four categories clearly sochna zaroori hai. Wrong placement — unnecessary complexity, bugs, performance issues."
          whenToUse={[
            'Local: Modal open/close, form input, hover state — sirf ek component use kare',
            'Lifted: Sibling components share karein — common parent mein rakho',
            'Global (Zustand): Cart, user auth, notifications — app-wide persistent state',
            'Server (TanStack Query): API data — user list, products, orders',
          ]}
          whyUseIt="State jahan use ho wahan rakho — co-location principle. Global state minimise karo — zyada global state = zyada coupling, zyada re-renders, harder debugging. Server state server state library se manage karo — caching, sync, invalidation sab free mein milta hai."
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
            explanation: "State decision flow: Server data? TanStack Query. UI state only? useState. Shared? Lift or Zustand. Ye simple decision tree 90% cases cover karta hai. Edge cases: URL state (React Router searchParams), form state (React Hook Form), animation state (Framer Motion).",
          }}
          realWorldScenario="Twitter clone: Tweet list (TanStack Query — API data), Like state (optimistic update via useMutation), Compose modal open (useState — local), Notification count (Zustand — app-wide), Dark mode (Zustand + persist — user preference). Har piece sahi jagah."
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
          proTip="State colocation rule: State jitna neeche rakho component tree mein utna better. Global state minimize karo. Measure karo: Zustand mein kitni properties hain? 3-5 — normal. 50+ — refactor needed. Zyada global state usually server state galat jagah rakha hota hai."
        />
      </div>

      <div id="performance-checklist">
        <ConceptCard
          title="Performance Checklist — Production Ready"
          emoji="⚡"
          difficulty="advanced"
          whatIsIt="Production React app ke liye performance checklist — kya measure karo, kya optimize karo. Core Web Vitals (LCP, FID, CLS) Google ranking factor hain. Bundle size, image optimization, lazy loading — ye sab measurably impact karte hain. Checklist-driven approach ensure karta hai kuch miss na ho."
          whenToUse={[
            'Pre-launch checklist — deploy se pehle',
            'Performance regression caught hone par — Lighthouse score drop',
            'New feature add karne ke baad audit',
            'User complaints — "app slow hai"',
          ]}
          whyUseIt="Performance directly business metrics affect karta hai — Google research: 1 second delay = 7% conversion loss. Lighthouse score < 70 = poor SEO. Ye checklist ensure karta hai ki known optimization opportunities miss na hon."
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
            explanation: "Core Web Vitals targets: LCP < 2.5s (largest content paint), FID/INP < 100ms (interaction delay), CLS < 0.1 (layout shift). Next.js Image component AVIF/WebP automatic, lazy loading, blur placeholder — no manual optimization needed. react-window virtualised lists large datasets ke liye.",
          }}
          realWorldScenario="Product launch ke 2 din pehle Lighthouse run karo: LCP 4.2s (too slow) — hero image priority prop missing tha, fix kiya 2.1s. CLS 0.15 (bad) — image dimensions nahi diye the, width/height add kiya 0.02 ho gaya. Score 62 se 94. Search ranking improve hua."
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
          proTip="next/font se Google Fonts locally host karo — no external network request, better privacy, faster font load. `import { Inter } from 'next/font/google'; const inter = Inter({ subsets: ['latin'] })` — automatic optimization. CLS eliminate hoti hai font swap se."
        />
      </div>

      <div id="testing-strategy">
        <ConceptCard
          title="Testing Strategy — Kya Kitna Test Karo"
          emoji="🧪"
          difficulty="advanced"
          whatIsIt="Testing pyramid: Unit tests (fast, isolated, many) → Integration tests (medium speed, component + hooks together) → E2E tests (slow, full browser, few). React apps ke liye: unit tests for utilities/hooks, integration tests for components, E2E for critical user flows. 70/20/10 ratio aim karo."
          whenToUse={[
            'Unit: Utility functions, custom hooks, complex logic — hamesha',
            'Integration: Forms, data fetching components, user workflows',
            'E2E (Playwright/Cypress): Checkout, signup, login — critical paths',
            'Visual regression: Design system components — screenshot tests',
          ]}
          whyUseIt="All E2E tests — bahut slow, brittle. All unit tests — confidence low (integration bugs miss). Pyramid balance: fast feedback (unit), component confidence (integration), production confidence (E2E critical flows). 100% coverage nahi, meaningful coverage."
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
            explanation: "Unit tests for pure logic — no React rendering. Integration tests for components with mocked APIs (MSW). E2E for critical user flows — real browser, real (staging) API. Percentage aim: 70% unit, 20% integration, 10% E2E. E2E slow hain — sirf critical paths.",
          }}
          realWorldScenario="Fintech app testing: Unit tests — interest calculation, formatting functions. Integration tests — transfer form validation, account statement render. E2E — fund transfer flow, login/logout. 500 unit tests (1 min), 100 integration (3 min), 20 E2E (10 min). Total CI run 14 min — acceptable."
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
          proTip="Testing Trophy (Kent C. Dodds) > Testing Pyramid for React — Integration tests sabse zyada value dete hain React apps mein. Unit tests for logic, Integration tests for components + hooks together, few E2E. Skip snapshot tests mostly — maintenance burden zyada, value kam."
        />
      </div>

      <div id="production-checklist">
        <ConceptCard
          title="Production Checklist — Ship Karo Confidently"
          emoji="🚀"
          difficulty="advanced"
          whatIsIt="Production deployment se pehle ye checklist check karo — error boundaries, analytics, monitoring, security headers, accessibility. Ek baar checklist follow karo aur habits ban jaate hain. Senior engineer aur junior engineer ka fark yahi hai — senior pata hai kya miss ho sakta hai."
          whenToUse={[
            'New feature ship karne se pehle',
            'Initial production launch se pehle',
            'Major refactor ke baad',
            'Team mein onboard naye engineers ke liye reference',
          ]}
          whyUseIt="Production bugs fix karna development bugs se 10x expensive hota hai — user impact, reputation, SLA. Checklist systematic approach ensure karta hai ki known issues miss na hon. Ye senior engineers ka institutional knowledge hai — systematize karo."
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
            explanation: "Error boundaries React class components hain — functional components mein nahi hote. react-error-boundary library simple wrapper deti hai. Sentry free tier mein 5000 errors/month — production monitoring ke liye must-have. Security headers OWASP recommended — next.config.ts mein add karo.",
          }}
          realWorldScenario="Startup product launch: Sentry install kiya, Vercel Analytics setup kiya, error boundaries add kiye, Lighthouse 94 score, accessibility audit pass. Launch day — real users se 3 edge case errors aaye Sentry pe — next day fix. Bina monitoring ke ye bugs kabhi pata nahi chalta."
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
          proTip="OpenStatus ya Better Uptime se uptime monitoring setup karo — site down hone par immediately alert aao. Postmortem culture: har production incident ke baad 5-minute write-up karo — kya hua, root cause, fix, prevention. Team sikhti hai aur same mistake repeat nahi hoti."
        />
      </div>
    </div>
  )
}
