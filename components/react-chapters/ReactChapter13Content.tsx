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
          TanStack Query — Server State Ka Sahi Tarika
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          API se data fetch karna sirf fetch() call nahi hai — loading states, error handling, caching, background refresh, pagination, optimistic updates — ye sab manage karna padta hai. TanStack Query (pehle React Query) ye sab automatically karta hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Server state client state se fundamentally alag hai — ye remote hai, stale ho sakta hai, multiple users share karte hain. TanStack Query specifically server state ke liye bana hai aur is problem ko perfectly solve karta hai.
        </p>
      </div>

      <div id="server-vs-client-state">
        <ConceptCard
          title="Server State vs Client State"
          emoji="🔄"
          difficulty="intermediate"
          whatIsIt="Client state wo state hai jo sirf browser mein exist karta hai — modal open/close, form input, selected tab. Server state wo data hai jo server par hai aur API se aata hai — user profile, products, orders. Dono fundamentally different challenges present karte hain — alag tools chahiye."
          whenToUse={[
            'API data fetch karna — hamesha TanStack Query',
            'Loading, error, success states manage karna — TanStack Query handle karta hai',
            'Caching aur background refresh chahiye — TanStack Query',
            'UI state (modal, tabs, form) — useState ya Zustand',
          ]}
          whyUseIt="Server state stale ho sakta hai — koi aur update kar de database ko. Cache invalidation hard hai manually. Background refetch, retry on error, loading states — ye sab manage karna without library repetitive aur bug-prone hai. TanStack Query ye sab out of the box deta hai."
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
            explanation: "QueryClient global cache store karta hai. staleTime: kitni der tak data fresh maano — 0 se hamesha stale (har mount pe refetch). retry: error par kitni baar dobara try karo. QueryClientProvider React Context se queryClient sab components ko available karta hai.",
          }}
          realWorldScenario="E-commerce product listing — 1000 users same products page dekh rahe hain. TanStack Query se har user ka data 1 minute cache mein rehta hai — server pe 1000x fewer API calls. Koi admin product update kare toh sab users ko background mein fresh data milta hai."
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
          proTip="TanStack Query Devtools production builds mein automatically exclude ho jaate hain. Development mein ye tool invaluable hai — har query ka status, data, stale time, observers sab dikhai deta hai. Browser extension bhi available hai."
        />
      </div>

      <div id="use-query">
        <ConceptCard
          title="useQuery — Data Fetching"
          emoji="📡"
          difficulty="intermediate"
          whatIsIt="useQuery hook server se data fetch karne ka primary way hai. Query key (unique identifier), fetch function, aur options pass karo — loading, error, data automatically manage hota hai. Same query key multiple components mein share karte hain — sirf ek fetch hoti hai, cache se serve hota hai."
          whenToUse={[
            'GET requests — user data, products, orders fetch karna',
            'Same data multiple components mein — cache se auto-serve hoga',
            'Dependent queries — ek query ki success par doosri query run karo',
            'Paginated data — useInfiniteQuery se infinite scroll',
          ]}
          whyUseIt="Bina useQuery ke har component mein useEffect + useState pattern repeat karna padta hai. useQuery ek line mein loading, error, data deta hai plus caching, background fetch, retry, devtools integration sab milta hai."
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
            explanation: "queryKey array hai — har element change par refetch hota hai. enabled: false se query disable hoti hai (dependent queries ke liye). isFetching background refetch dikhata hai. Data stale hone par background mein silently update hota hai — UI jankhani nahi dikhati.",
          }}
          realWorldScenario="Dashboard analytics — useQuery(['analytics', dateRange]) — dateRange change karne par automatically naya data fetch hota hai. Data 5 minutes cache mein rehta hai. Tab switch par background mein latest data aata hai. Loading sirf pehli baar dikhti hai — subsequent fetches silently update karte hain."
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
          proTip="select option se response data transform karo — heavy computation component mein nahi hogi: useQuery({ queryKey: ['products'], queryFn: fetchProducts, select: (data) => data.filter(p => p.inStock).sort((a,b) => a.price - b.price) }). Select result bhi memoized hota hai."
        />
      </div>

      <div id="use-mutation">
        <ConceptCard
          title="useMutation — Data Create/Update/Delete"
          emoji="✏️"
          difficulty="intermediate"
          whatIsIt="useMutation hook data create, update, ya delete karne ke liye hai — POST, PUT, PATCH, DELETE requests. Mutation run hone ke baad related queries invalidate karo — fresh data automatically fetch hoga. onSuccess, onError, onSettled callbacks se side effects handle karo."
          whenToUse={[
            'Form submit karke server pe data save karna',
            'Like, follow, cart add karna — user action pe data mutate karna',
            'Delete operations',
            'File upload',
          ]}
          whyUseIt="useMutation loading state, error handling, aur success callbacks manage karta hai. Mutation success ke baad invalidateQueries se related data automatically refetch hota hai — manual state management ki zaroorat nahi. Optimistic updates bhi easily implement hote hain."
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
            explanation: "mutation.mutate(data) async call start karta hai. isPending se loading state milti hai. invalidateQueries se ['posts'] query stale mark hoti hai — jo bhi component use kar raha ho wo background mein refetch karta hai. setQueryData se cache directly update karo bina network call ke.",
          }}
          realWorldScenario="Twitter/X pe tweet like karna — useMutation se like API call hoti hai, onSuccess mein tweet query invalidate hoti hai — updated like count milta hai. Multiple components (feed, profile) dono update hote hain automatically kyunki same queryKey invalidate hua."
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
          proTip="Form libraries ke saath useMutation perfect integrate hoti hai: React Hook Form + useMutation — handleSubmit(data => mutation.mutate(data)). Zod validation + React Hook Form + useMutation — complete type-safe form submission pipeline milti hai."
        />
      </div>

      <div id="cache-stale-time">
        <ConceptCard
          title="Cache & Stale Time — Smart Caching"
          emoji="🗄️"
          difficulty="intermediate"
          whatIsIt="TanStack Query automatically data cache karta hai queryKey se. staleTime se batao kitni der fresh maano — is dauraan component mount ya window focus par refetch nahi hoga. gcTime (garbage collection time) se batao unused cache kitni der rakhni hai. In dono ka balance = optimal performance."
          whenToUse={[
            'High staleTime (5-60 min) — rarely changing data: config, metadata, static content',
            'Low staleTime (0-30 sec) — frequently changing: live prices, notifications',
            'gcTime adjust karo — rarely accessed pages ke liye cache clear karo',
            'User-triggered refetch ke liye refetch() function use karo',
          ]}
          whyUseIt="Caching UI fast banata hai — cached data instantly show hota hai background mein update hota hai. staleTime se unnecessary network requests reduce hote hain. gcTime se memory manage hoti hai. Together these controls developer ko fine-grained caching control dete hain."
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
            explanation: "staleTime: 0 matlab data hamesha stale hai — mount ya focus par refetch hoga. refetchInterval se polling implement hota hai. prefetchQuery user hover karne par data pehle se load kar leta hai — click karne par instant display. gcTime se memory management hoti hai unused queries ke liye.",
          }}
          realWorldScenario="Financial dashboard — account balance: staleTime 0 (critical, hamesha fresh), transaction list: staleTime 5 min (stable, rarely changes immediately), currency rates: refetchInterval 60000 (live market data). Sab alag strategies, ek library."
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
          proTip="queryClient.prefetchQuery() link hover par call karo — user click karne par instant data milega. React Router loader function mein bhi prefetch karo: export const loader = ({ params }) => queryClient.prefetchQuery(['product', params.id], fetchProduct). Zero loading state UX!"
        />
      </div>

      <div id="optimistic-updates">
        <ConceptCard
          title="Optimistic Updates — UI-First Updates"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Optimistic update matlab server response ka wait kiye bina UI immediately update karna — server confirm karega assumption ke saath. Like button click karte hi count increase karo, server fail karne par rollback karo. User ko instant feedback milta hai — perceived performance bahut better hoti hai."
          whenToUse={[
            'Like/unlike, follow/unfollow — simple toggle operations',
            'Todo list — item immediately add karo, server se sync karo',
            'Comment post karna — immediately show karo, background save hoga',
            'Fast UI reactions chahiye — social features, real-time feel',
          ]}
          whyUseIt="Network latency 100-500ms hota hai. Agar user har action ke baad loading wait kare toh UX sluggish lagta hai. Optimistic updates se UI instant respond karta hai — server failure bahut rare hoti hai (99%+ requests succeed karte hain). Rare failures pe rollback elegant hota hai."
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
            explanation: "onMutate server call se pehle chalta hai — UI immediately update hoti hai. cancelQueries ongoing refetches rok deta hai conflict se bachne ke liye. previousPost snapshot rollback ke liye rakha. onError mein rollback hota hai. onSettled mein server se final state sync hota hai.",
          }}
          realWorldScenario="Instagram like button — tap karte hi heart filled ho jaata hai (optimistic), 200ms baad server confirm karta hai. Agar koi edge case mein fail ho toh unfilled ho jaata hai — lekin 99.9% mein user ko instant response milta hai. This is exactly what Instagram does."
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
          proTip="Complex optimistic updates ke liye immer library use karo — produce() se immutable updates easily likho: queryClient.setQueryData(['todos'], produce(draft => { draft.push(newTodo) })). Nested state updates bahut cleaner ho jaati hain."
        />
      </div>
    </div>
  )
}
