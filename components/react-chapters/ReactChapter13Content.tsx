'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

export default function ReactChapter13Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          TanStack Query — useEffect Se Fetch Karna Chhodo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ek honest question — kitne features manually likhe hain aapne jab bhi API call ki? Loading state — useState se. Error state — useState se. Retry on failure — khud logic. Cache — khud manage. Background refresh — setInterval se polling. Race conditions — cancelled flag. Stale data detection — khud logic. Ye sab TanStack Query out of the box deta hai — ek hook mein.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Server state aur client state fundamentally alag hain — server data remote hai, stale ho sakta hai, multiple users simultaneously change kar sakte hain. Iske liye specialized tool chahiye — TanStack Query exactly yahi hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ek baar use karo, aur aap kabhi manually useEffect se fetch nahi karoge.
        </p>
      </div>

      <div id="server-vs-client-state">
        <ConceptCard
          title="Server State vs Client State"
          emoji="🔄"
          difficulty="intermediate"
          whatIsIt="Ek critical distinction — client state aur server state alag problems hain. Modal open/close, selected tab, form input — ye client state hai. Ye sirf is user ke browser mein exists karta hai. Products list, user profile, orders — ye server state hai. Ye remote hai, koi bhi kabhi bhi change kar sakta hai, cache ho sakta hai, stale ho sakta hai. Client state ke liye useState/Zustand. Server state ke liye? TanStack Query. Wrong tool use karo — headaches guaranteed."
          whenToUse={[
            'API data fetch karna — hamesha TanStack Query (no exceptions)',
            'Loading, error, success states — automatically managed',
            'Caching, background refresh, stale detection — built-in',
            'UI state (modal, tab, form input) — useState ya Zustand, not TanStack Query',
          ]}
          whyUseIt="Socho — 1000 users ek product page dekh rahe hain. Manual useEffect: 1000 separate fetch calls. TanStack Query: ek queryClient, shared cache. Multiple components same queryKey use karein — sirf ek fetch, sab share karte hain. Admin product update kare — invalidate query — sab users ko background mein fresh data. Ye magic nahi — ye architecture hai."
          howToUse={{
            filename: 'setup.tsx',
            language: 'typescript',
            code: `// npm install @tanstack/react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,  // 1 minute — fresh maano
      retry: 2,               // Error par 2 baar retry
      refetchOnWindowFocus: true,  // Tab switch par refetch
    },
  },
})

// App ke root mein provider wrap karo
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
      </Router>
      {/* Development mein query inspector */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}`,
            explanation: "QueryClient central cache store hai — query results, metadata, observers sab yahan. staleTime kya karta hai: 0 = hamesha stale (har component mount pe refetch). 60000 = 1 minute fresh maano (is dauraan mount pe cached data return, no network call). retry: 2 = error pe 2 baar aur try karo. refetchOnWindowFocus: true = tab switch karte hi background mein latest data.",
          }}
          realWorldScenario="E-commerce — 1000 users product listing dekh rahe hain. Manual fetch: 1000 requests/minute. TanStack Query with 5min staleTime: user tab switch karta hai — background refresh — lekin stale nahi hogi 5 minute mein — ek request per user per 5 minutes. Dramatic server cost reduction. Real companies ye measure karte hain dollars mein."
          commonMistakes={[
            {
              mistake: 'TanStack Query mein client state daalna (modals, form values)',
              why: 'TanStack Query server data ke liye optimize hua hai — client state isme awkward feel karta hai aur patterns break karta hai.',
              fix: 'Clear separation: API data → TanStack Query, UI state → useState/Zustand. Dono ek saath use karo — same app mein perfectly coexist karte hain.',
            },
            {
              mistake: 'staleTime 0 rakhna production mein',
              why: 'Har render, har tab focus par refetch — server hammered ho jaata hai unnecessarily.',
              fix: 'Sane defaults set karo: 1-5 minutes for stable data, real-time data ke liye WebSocket use karo instead of polling.',
            },
          ]}
          proTip="ReactQueryDevtools — development mein indispensable tool. Bottom-right corner mein floating panel. Har query: status (fresh/stale/fetching/error), data snapshot, stale time countdown, how many observers. Query manually refetch karo, invalidate karo, remove karo — debug karo without changing code. Browser extension bhi available hai jo production pe bhi kaam karta hai."
        />
      </div>

      <div id="use-query">
        <ConceptCard
          title="useQuery — Data Fetching"
          emoji="📡"
          difficulty="intermediate"
          whatIsIt="useQuery ke andar kya hota hai? queryKey se cache entry identify hoti hai. Component mount pe: cache mein data hai? Fresh hai? Return karo instantly (cache hit). Stale hai? Background mein refetch karo, stale data dikhao while fetching. Nahi hai? Fetch karo, loading state. Multiple components same queryKey use karein — sirf ek fetch, shared cache. Ye data synchronization hai — manual useEffect mein ye impossible tha."
          whenToUse={[
            'GET requests — user data, products, orders fetch karna',
            'Same data multiple components mein — shared cache, single fetch',
            'Dependent queries — pehle user, phir user ke posts',
            'Paginated ya infinite scroll data — useInfiniteQuery',
          ]}
          whyUseIt="Manual pattern compare karo — useEffect + useState: 15 lines, race condition risk, no caching, no retry, no devtools. useQuery: 5 lines, race condition handled, caching automatic, retry built-in, devtools beautiful. Aur bonus: isFetching — background refresh indicator. User ko pata hai data update ho raha hai — transparent system."
          howToUse={{
            filename: 'useQuery-demo.tsx',
            language: 'typescript',
            code: `import { useQuery } from '@tanstack/react-query'

// Query function — async function jo data return kare
const fetchUser = async (id: string): Promise<User> => {
  const res = await fetch(\`/api/users/\${id}\`)
  if (!res.ok) throw new Error('User fetch failed')
  return res.json() as Promise<User>
}

function UserProfile({ userId }: { userId: string }) {
  const {
    data: user,
    isLoading,
    isError,
    error,
    isFetching,  // Background fetch indicator
  } = useQuery({
    queryKey: ['user', userId],  // Unique key — userId change = refetch
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000,  // 5 minutes fresh
    enabled: !!userId,           // userId hone par hi query run karo
  })

  if (isLoading) return <Skeleton />
  if (isError) return <ErrorMessage message={(error as Error).message} />

  return (
    <div>
      <h1>{user?.name}</h1>
      {isFetching && <span>Updating...</span>}  {/* Background fetch */}
    </div>
  )
}

// Dependent query — user ke baad unke posts fetch karo
function UserPosts({ userId }: { userId: string }) {
  const { data: user } = useQuery({ queryKey: ['user', userId], queryFn: () => fetchUser(userId) })

  const { data: posts } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetch(\`/api/users/\${userId}/posts\`).then(r => r.json()),
    enabled: !!user,  // User load hone ke baad hi
  })

  return <div>{posts?.map(p => <PostCard key={p.id} post={p} />)}</div>
}`,
            explanation: "queryKey array trace karo — ['user', userId]. userId '42' hai. Cache mein ['user', '42'] entry hai, fresh hai? Yes → return instantly. userId changes to '43' — ['user', '43'] — new cache entry, fetch starts. enabled: !!userId — userId undefined ya empty? Query disable, no fetch. enabled is powerful for dependent queries.",
          }}
          realWorldScenario="Analytics dashboard — useQuery(['analytics', dateRange, metricType]) — dateRange ya metricType change karo — automatic refetch. Cache: same dateRange pe wapas aao (tab switch) — instant data. Background refresh: stale hone pe silently update. User ko loading state pehli baar — aage seamless experience."
          commonMistakes={[
            {
              mistake: 'queryKey mein dynamic values miss karna',
              why: 'queryKey: ["user"] bina userId ke — sab users ke liye same cache entry, galat data dikhaai de sakta hai.',
              fix: 'Har dynamic value queryKey mein daalo: queryKey: ["user", userId, { includeDeleted: false }]. Key change = fresh fetch.',
            },
            {
              mistake: 'Query function mein error properly throw nahi karna',
              why: 'Agar fetch response !ok hai lekin throw nahi kiya toh useQuery isError: false rahega aur error state nahi milegi.',
              fix: 'Hamesha: if (!res.ok) throw new Error(res.statusText). TanStack Query sirf thrown errors ko error state mein capture karta hai.',
            },
          ]}
          proTip="select option — underused gem. useQuery({ queryKey: ['products'], queryFn: fetchProducts, select: (data) =&gt; data.filter(p =&gt; p.inStock).sort((a,b) =&gt; a.price - b.price) }). Select result memoized hai — same data same transformed result. Component ko raw API response nahi dikhta — clean transformed data milta hai. Plus: different components same query se different transforms le sakte hain!"
        />
      </div>

      <div id="use-mutation">
        <ConceptCard
          title="useMutation — Data Create/Update/Delete"
          emoji="✏️"
          difficulty="intermediate"
          whatIsIt="useMutation aur useQuery ka combination React apps ka data flow hai. useQuery reads — server se data lo. useMutation writes — server pe data bhejo (POST/PUT/PATCH/DELETE). Mutation success hone ke baad related queries invalidate karo — fresh data automatically aayega. onSuccess, onError, onSettled callbacks — side effects manage karo. isPending state — button disable karo, spinner dikhao. Clean flow, no manual state."
          whenToUse={[
            'Form submit — server pe data save karna',
            'Like, follow, cart add — user action pe data mutate karna',
            'Delete operations — confirm aur delete',
            'File upload, bulk operations',
          ]}
          whyUseIt="Manual mutation: loading state manually, try/catch manually, state update manually, related queries manually refetch, error display manually. useMutation: mutate(data) call karo — sab automatically. isPending loading ke liye, isError error ke liye, onSuccess invalidation ke liye. 5 lines replace karte hain 30 lines."
          howToUse={{
            filename: 'useMutation-demo.tsx',
            language: 'typescript',
            code: `import { useMutation, useQueryClient } from '@tanstack/react-query'

const createPost = async (post: NewPost): Promise<Post> => {
  const res = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  if (!res.ok) throw new Error('Create failed')
  return res.json() as Promise<Post>
}

function NewPostForm() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Success ke baad posts list refetch karo
      queryClient.invalidateQueries({ queryKey: ['posts'] })

      // Ya directly cache update karo bina refetch ke:
      // queryClient.setQueryData(['posts'], (old: Post[]) => [...old, newPost])
    },
    onError: (error: Error) => {
      alert(\`Error: \${error.message}\`)
    },
  })

  const handleSubmit = (data: NewPost) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={e => {
      e.preventDefault()
      handleSubmit({ title: 'My Post', content: '...' })
    }}>
      <button
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Saving...' : 'Create Post'}
      </button>
      {mutation.isError && <p className="text-red-500">{mutation.error.message}</p>}
    </form>
  )
}`,
            explanation: "invalidateQueries power samjho — onSuccess mein queryClient.invalidateQueries({ queryKey: ['posts'] }) call kiya. Ye ['posts'] query stale mark karta hai. Jo bhi component is query ko use kar raha hai — background mein refetch start. Naya post milta hai — UI update. Koi manual setState nahi, koi useEffect nahi, koi prop drilling nahi. Bus ek invalidate call.",
          }}
          realWorldScenario="Twitter like button — tap karo, useMutation: like API call. onSuccess: queryClient.invalidateQueries(['tweet', postId]). Feed mein tweet — updated like count. Profile page pe same tweet — bhi updated. Notifications — updated. Sab kyunki same queryKey invalidate hua. Ek mutation, multiple components automatically updated."
          commonMistakes={[
            {
              mistake: 'Mutation ke baad manually state update karna instead of invalidation',
              why: 'Manual update aur actual server state sync nahi ho sakti — especially concurrent updates mein galat data dikh sakta hai.',
              fix: 'invalidateQueries use karo — server se fresh data aayega. Performance critical hai toh setQueryData bhi use karo (optimistic update with invalidation fallback).',
            },
            {
              mistake: 'useMutation bina useQueryClient ke use karna',
              why: 'invalidateQueries ke liye queryClient chahiye — useQueryClient() hook se lo, import nahi karo directly.',
              fix: 'const queryClient = useQueryClient() component mein call karo, phir onSuccess mein use karo. QueryClient Provider se milta hai.',
            },
          ]}
          proTip="Power combo — Zod + React Hook Form + useMutation. Zod: schema define karo. React Hook Form: validate karo client side. useMutation: server pe bhejo. handleSubmit(data =&gt; mutation.mutate(data)) — ek line connection. Type-safe end to end: form data Zod type → mutation variable Zod type → API response type. Server errors bhi handle karo: onError mein form.setError('email', { message: serverError })."
        />
      </div>

      <div id="cache-stale-time">
        <ConceptCard
          title="Cache & Stale Time — Smart Caching"
          emoji="🗄️"
          difficulty="intermediate"
          whatIsIt="Caching strategy TanStack Query mein do numbers se control hoti hai. staleTime — 'is data ko kitni der fresh maano?' Zero: hamesha stale, har mount pe refetch. 300000 (5 min): 5 minute fresh, is dauraan koi refetch nahi. gcTime — 'unused query cache ko memory mein kitni der rakhon?' Default 5 min. Agar koi component is query use nahi kar raha toh 5 min baad cache GC se clear hoti hai. staleTime <= gcTime — warna stale ban jaayegi GC se pehle."
          whenToUse={[
            'High staleTime (5-60 min) — config, metadata, rarely changing data',
            'Low staleTime (0-30 sec) — live prices, notifications, real-time data',
            'refetchInterval — polling: har N ms mein auto-refresh',
            'User-triggered refetch — manual refresh button pe refetch() call',
          ]}
          whyUseIt="Caching ke bina — har component mount pe network call. Products page 10 components use kare — 10 calls. Cache hit se: 1 call, 9 instant. User experience: page instant load, stale indicator se pata chale refresh ho raha hai. Server cost: dramatically down. Ye optimization practically free hai — sirf staleTime set karo."
          howToUse={{
            filename: 'caching-demo.ts',
            language: 'typescript',
            code: `import { useQuery, useQueryClient } from '@tanstack/react-query'

// Different stale times for different data types
function ProductList() {
  // Products rarely change — 10 minutes fresh
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,  // 30 min cache rakho memory mein
  })
  return <div>{products?.map(p => <ProductCard key={p.id} product={p} />)}</div>
}

function LivePrices() {
  // Stock prices — hamesha fresh chahiye
  const { data, refetch } = useQuery({
    queryKey: ['prices'],
    queryFn: fetchPrices,
    staleTime: 0,             // Hamesha stale
    refetchInterval: 30000,   // Har 30 seconds auto refetch
  })
  return (
    <div>
      <button onClick={() => refetch()}>Refresh Now</button>
      {data?.map(p => <PriceRow key={p.symbol} price={p} />)}
    </div>
  )
}

// Manual cache operations
function usePrefetch() {
  const qc = useQueryClient()

  const prefetchUser = (id: string) =>
    qc.prefetchQuery({
      queryKey: ['user', id],
      queryFn: () => fetchUser(id),
    })

  return { prefetchUser }
}`,
            explanation: "staleTime 0: component mount hota hai, cache mein data hai, lekin stale (age 0ms) — background refetch starts, cached data instantly show. stale data dikhao while fresh data aata hai — ye 'stale-while-revalidate' strategy hai. refetchInterval: internal setInterval jaisa — har 30 seconds refetch. refetchIntervalInBackground: false — hidden tab mein polling band.",
          }}
          realWorldScenario="Fintech dashboard — account balance: staleTime 0 (koi bhi moment balance change ho sakta hai, hamesha fresh). Transaction history: staleTime 5 min (transactions rarely change turant). Currency exchange rates: refetchInterval 30000 (live market data, 30s polling). Teen alag data types, teen alag strategies — ek library."
          commonMistakes={[
            {
              mistake: 'staleTime aur gcTime confuse karna',
              why: 'staleTime: data ki freshness duration. gcTime: unused query kitni der memory mein raho. staleTime <= gcTime hona chahiye otherwise cache hata diya jayega fresh hone se pehle.',
              fix: 'staleTime = kitni der network se mat maango. gcTime = kitni der memory mein rakho. Default: staleTime 0, gcTime 5 min.',
            },
            {
              mistake: 'refetchInterval background tabs mein bhi run karne dena',
              why: 'Hidden tab mein bhi har 30 seconds refetch — server pe unnecessary load.',
              fix: 'refetchIntervalInBackground: false add karo — tab hidden ho toh polling ruk jaayegi.',
            },
          ]}
          proTip="Prefetching — ye elite UX trick hai. User product card pe hover karta hai — queryClient.prefetchQuery(['product', id], fetchProduct) call karo. User click karta hai — data already cached! Zero loading state. onMouseEnter event handler mein prefetch — 200-300ms lead time milta hai. Ye Netflix aur Amazon use karte hain — hover pe preload, click pe instant. Ye ek event handler change se possible hai."
        />
      </div>

      <div id="optimistic-updates">
        <ConceptCard
          title="Optimistic Updates — UI-First Updates"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Optimistic updates — ek psychological trick jo real engineering hai. User like button click karta hai — 200ms baad server respond karega. Agar user 200ms wait kare toh sluggish feel. Optimistic approach: server se pehle hi UI update karo — 'optimistically assume karo ki server agree karega.' 99.9% cases mein agreement hota hai. 0.1% failure — rollback karo. Net result: instant UI, rare rollback, amazing UX."
          whenToUse={[
            'Like/unlike, follow/unfollow — simple toggle, high frequency',
            'Todo item add/complete — instant feedback',
            'Cart operations — instant count update',
            'Comment post — immediately show, background save',
          ]}
          whyUseIt="Instagram like button example — tap karo, heart instantly filled. 200ms baad server confirms. Agar server fails: heart unfills. User notice karta hai? Rarely — because 99.9% succeed karte hain. Ye psychological trick real engineering ke saath combine hoti hai — perceived performance dramatically better hoti hai. Users feel ki app fast hai."
          howToUse={{
            filename: 'optimistic-demo.tsx',
            language: 'typescript',
            code: `import { useMutation, useQueryClient } from '@tanstack/react-query'

function LikeButton({ postId, initialLiked }: { postId: string; initialLiked: boolean }) {
  const queryClient = useQueryClient()

  const likeMutation = useMutation({
    mutationFn: (liked: boolean) =>
      fetch(\`/api/posts/\${postId}/like\`, {
        method: liked ? 'POST' : 'DELETE',
      }).then(r => r.json()),

    // Server call se pehle UI update karo
    onMutate: async (newLiked) => {
      // Conflicting refetches cancel karo
      await queryClient.cancelQueries({ queryKey: ['post', postId] })

      // Current state snapshot rakho (rollback ke liye)
      const previousPost = queryClient.getQueryData<Post>(['post', postId])

      // Optimistically update karo
      queryClient.setQueryData<Post>(['post', postId], (old) => {
        if (!old) return old
        return {
          ...old,
          liked: newLiked,
          likeCount: old.likeCount + (newLiked ? 1 : -1),
        }
      })

      return { previousPost }  // Context return karo
    },

    // Error pe rollback karo
    onError: (_err, _newLiked, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost)
      }
    },

    // Success ya error — server se latest lo
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] })
    },
  })

  return (
    <button onClick={() => likeMutation.mutate(!initialLiked)}>
      {initialLiked ? '❤️' : '🤍'} Like
    </button>
  )
}`,
            explanation: "Step by step trace karo — user like tap karta hai. onMutate: cancelQueries (ongoing refetch rok do, conflict avoid). getQueryData snapshot (rollback ke liye). setQueryData optimistically update. UI instantly updated. Server call starts. Success? onSettled invalidate (server se confirm lo). Fail? onError rollback (snapshot restore). Clean pattern.",
          }}
          realWorldScenario="Instagram like button — exactly yahi pattern. Tap — heart filled (onMutate). Server call starts. 99.9% success — onSettled final count confirm. 0.1% network error — onError rollback, heart unfills. User briefly confused — but itna rare hai ki acceptable trade-off. Real Instagram engineers ne yahi decision kiya — performance matters more than perfect consistency."
          commonMistakes={[
            {
              mistake: 'cancelQueries miss karna',
              why: 'Background refetch optimistic update ke baad run ho sakta hai aur old data se overwrite kar sakta hai.',
              fix: 'onMutate mein hamesha await queryClient.cancelQueries() karo — racing conditions avoid hoti hain.',
            },
            {
              mistake: 'rollback implement nahi karna',
              why: 'Server fail hone par optimistic update stuck reh jaata hai — user galat data dekh raha hota hai.',
              fix: 'onError mein context.previousPost use karke setQueryData se rollback karo — hamesha implement karo optimistic updates ke saath.',
            },
          ]}
          proTip="Immer library optimistic updates ko dramatically clean karta hai. queryClient.setQueryData(['todos'], produce(draft =&gt; { draft.push(newTodo) })). Spread operators nahi, nested updates easy. Complex state — todo items ke andar subtasks add karo — immer se ek line. Zustand bhi immer use karta hai internally. Ye pattern seekhna investment hai — bahut jagah kaam aata hai."
        />
      </div>
    </div>
  )
}
