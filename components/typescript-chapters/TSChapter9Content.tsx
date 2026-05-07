'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const tsQuiz: QuizQuestion[] = [
  {
    question: 'Custom type predicate function ka return type kya hota hai?',
    options: [
      { text: 'boolean', correct: false, explanation: 'Boolean return type se TypeScript type narrow nahi karta — predicate syntax alag hai.' },
      { text: 'param is SomeType', correct: true, explanation: 'Sahi! function isUser(x: unknown): x is User — ye TypeScript ko batata hai ki true return hone pe x is User type ka hai.' },
      { text: 'SomeType | false', correct: false, explanation: 'Union return type type narrowing nahi karta — is keyword wala syntax chahiye.' },
      { text: 'asserts param is SomeType', correct: false, explanation: 'asserts assertion functions ke liye hai (throw karte hain agar fail ho) — predicate functions ke liye is use hota hai.' },
    ],
  },
  {
    question: 'instanceof narrowing kab kaam karta hai?',
    options: [
      { text: 'Sirf built-in types ke liye — Array, Date', correct: false, explanation: 'instanceof custom classes ke liye bhi kaam karta hai — sirf built-ins nahi.' },
      { text: 'Jab value kisi class ka instance ho — class constructor ke saath check', correct: true, explanation: 'Sahi! instanceof runtime pe prototype chain check karta hai. TypeScript iske baad type narrow kar deta hai correctly.' },
      { text: 'Sirf interfaces ke liye', correct: false, explanation: 'Interfaces runtime pe exist nahi karte — instanceof classes ke liye kaam karta hai, interfaces ke liye nahi.' },
      { text: 'Sirf node.js mein', correct: false, explanation: 'instanceof browser aur Node.js dono mein kaam karta hai — JavaScript standard hai.' },
    ],
  },
  {
    question: 'Exhaustiveness checking ke liye kaunsa pattern use karte hain?',
    options: [
      { text: 'Default case mein throw new Error() likhna', correct: false, explanation: 'Runtime error toh aayega lekin compile-time check nahi — TypeScript ensure nahi karega ki aapne sab cases handle kiye.' },
      { text: 'Default case mein const _: never = value likhna', correct: true, explanation: 'Bilkul! never type assignable nahi hai kisi value ko. Agar koi case miss hua toh TypeScript error dega — compile time pe.' },
      { text: 'switch ke upar // @ts-nocheck likhna', correct: false, explanation: 'Ye TypeScript errors suppress karta hai — exhaustiveness check ka opposite.' },
      { text: 'Array.includes() se check karna', correct: false, explanation: 'Runtime check hai — compile time exhaustiveness ensure nahi hoti.' },
    ],
  },
  {
    question: '`in` operator narrowing kaise kaam karta hai?',
    options: [
      { text: 'Array mein element check karta hai', correct: false, explanation: 'in operator arrays ke liye index check karta hai — type narrowing objects ke property check se hoti hai.' },
      { text: 'Object mein property ka existence check karta hai — TypeScript type narrow kar deta hai', correct: true, explanation: 'Sahi! "name" in obj — agar true hai toh TypeScript jaanta hai obj mein name property hai aur type accordingly narrow karta hai.' },
      { text: 'for...in loop se related hai narrowing', correct: false, explanation: 'for...in loop alag hai — in operator unary check hai type narrowing ke liye.' },
      { text: 'Sirf string types pe kaam karta hai', correct: false, explanation: 'in operator kisi bhi object type pe kaam karta hai — discriminated unions mein especially useful.' },
    ],
  },
  {
    question: 'Assertion function `asserts x is T` aur type predicate `x is T` mein fark kya hai?',
    options: [
      { text: 'Dono same hain', correct: false, explanation: 'Important fark hai — ek throw karta hai, ek boolean return karta hai.' },
      { text: 'Assertion function throw karta hai agar condition fail ho; predicate boolean return karta hai', correct: true, explanation: 'Sahi! asserts x is T — function throw kare toh baad ka code x is T samjha jaata hai. Predicate if-condition mein use hota hai.' },
      { text: 'Assertion function faster hai', correct: false, explanation: 'Performance difference minimal hai — ye type safety mechanism hai.' },
      { text: 'Predicate functions sirf generics mein kaam karti hain', correct: false, explanation: 'Type predicates kisi bhi type ke saath kaam karti hain — generics ki zaroorat nahi.' },
    ],
  },
]

function NarrowingFlowDiagram() {
  const items = [
    { label: 'value: string | number', sublabel: 'Union type — could be either, TypeScript tracks both possibilities', color: '#3178C6', bg: 'rgba(49,120,198,0.1)', border: 'rgba(49,120,198,0.3)', icon: '❓' },
    { label: 'typeof value === "string" check', sublabel: 'TypeScript reads this condition — control flow analysis begins', color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.3)', icon: '🔎' },
    { label: 'true branch → value: string', sublabel: '.toUpperCase() · .length · .split() — all string methods available', color: '#6366F1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.3)', icon: '🔤' },
    { label: 'false branch → value: number', sublabel: '.toFixed() · .toPrecision() · Math ops — all number methods available', color: '#3178C6', bg: 'rgba(49,120,198,0.1)', border: 'rgba(49,120,198,0.3)', icon: '🔢' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Type Narrowing — Control Flow Analysis</p>
      <div className="max-w-lg mx-auto space-y-2">
        {items.map((item, i) => (
          <div key={i}>
            <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{item.sublabel}</p>
              </div>
            </div>
            {i < items.length - 1 && <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓</span></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TSChapter9Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(49,120,198,0.06)',
          border: '1px solid rgba(49,120,198,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Type Guards & Narrowing — TypeScript Ko Smarter Banao
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          TypeScript ko kaise bataao ki ye string hai ya number? Woh khud deduce karta hai — isko kehte hain narrowing. Tum condition likhte ho, TypeScript automatically type narrow kar deta hai us block ke liye. Magic nahi — science! TypeScript ek control flow graph banata hai tumhare code ka aur track karta hai ki har point pe kaunsi types possible hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ab sawaal ye aata hai — kab TypeScript khud narrow nahi kar paata? Tab custom type predicates kaam aate hain. Ye runtime check functions hain jo TypeScript ko explicitly batate hain "is function true return kare toh ye type hai." Exhaustiveness checking toh aur powerful hai — naya union member add karo, compiler khud guide karta hai kahan kahan handle karna hai. Is chapter mein ye poora narrowing system samjhenge.
        </p>
      </div>

      <NarrowingFlowDiagram />

      <div id="typeof-instanceof">
        <ConceptCard
          title="typeof & instanceof Guards — Built-in Narrowing"
          emoji="🔎"
          difficulty="advanced"
          whatIsIt="TypeScript ek compiler nahi hai — ek type inference engine hai jo control flow samjhta hai. if (typeof value === 'string') ke baad TypeScript jaanta hai us block mein value string hai — agar string nahi hoti toh woh block execute hi nahi hota. Ye control flow analysis hai. typeof primitives ke liye narrow karta hai, instanceof class instances ke liye. Aur ek caveat — typeof null === 'object' — ye JavaScript ka historic bug hai, TypeScript bhi iska shikaar hota hai."
          whenToUse={[
            'Union types mein primitives distinguish karna — string | number',
            'Class instances check karna — Error, Date, custom classes',
            'null/undefined check — if (value != null)',
            'Truthy/falsy checks — empty string, 0, null sab falsy',
          ]}
          whyUseIt="Ye sab JavaScript mein already available hai — typeof, instanceof, in operator. TypeScript ne inhe type narrowing ke liye repurpose kiya hai. No extra syntax, no new keywords seekhne ki zaroorat. Wahi JS checks jo tum already jaante ho — TypeScript automatically type deduce karta hai. Ye WHY important hai — zero learning overhead, maximum type safety. Custom predicates sirf edge cases ke liye chahiye."
          howToUse={{
            filename: 'typeof-instanceof.ts',
            language: 'typescript',
            code: `// ── TYPEOF NARROWING ─────────────────────────────────────────────
function processValue(value: string | number | boolean | null | undefined) {
  if (typeof value === 'string') {
    // value: string — string methods available
    console.log(value.toUpperCase())
    console.log(value.length)
  } else if (typeof value === 'number') {
    // value: number
    console.log(value.toFixed(2))
  } else if (typeof value === 'boolean') {
    // value: boolean
    console.log(value ? 'Yes' : 'No')
  } else {
    // value: null | undefined
    console.log('No value provided')
  }
}

// ── NULL/UNDEFINED NARROWING ──────────────────────────────────
function greet(name: string | null | undefined): string {
  // Loose equality — null aur undefined dono check
  if (name == null) {
    return 'Hello, stranger!'
  }
  // name: string guaranteed here
  return \`Hello, \${name.toUpperCase()}!\`
}

// Optional chaining — short circuit narrowing
function getLength(value?: string) {
  return value?.length ?? 0  // undefined safe
}

// ── INSTANCEOF NARROWING ──────────────────────────────────────
function handleError(error: unknown): string {
  if (error instanceof Error) {
    // error: Error — message, stack available
    return error.message
  }
  if (error instanceof TypeError) {
    return \`Type Error: \${error.message}\`
  }
  return 'Unknown error occurred'
}

// Custom class narrowing
class Cat {
  meow() { console.log('Meow!') }
}

class Dog {
  bark() { console.log('Woof!') }
}

function makeSound(animal: Cat | Dog) {
  if (animal instanceof Cat) {
    animal.meow()  // Cat methods available
  } else {
    animal.bark()  // Dog methods available — TypeScript infers Dog
  }
}

// ── IN OPERATOR NARROWING ─────────────────────────────────────
interface Fish {
  swim(): void
  fins: number
}

interface Bird {
  fly(): void
  wings: number
}

function move(creature: Fish | Bird) {
  if ('swim' in creature) {
    // creature: Fish
    creature.swim()
  } else {
    // creature: Bird
    creature.fly()
  }
}

// ── EQUALITY NARROWING ────────────────────────────────────────
type Status = 'active' | 'inactive' | 'pending'

function processStatus(status: Status | null) {
  if (status === 'active') {
    // status: 'active' — literal type narrowed
    console.log('User is active')
  } else if (status !== null) {
    // status: 'inactive' | 'pending'
    console.log(\`Status is: \${status}\`)
  }
}`,
            explanation: 'Ek important pattern dekho — value == null (loose equality) ek baar mein null aur undefined dono check karta hai. !== null strict equality sirf null check karta hai. In dono ka fark samjho. Early return pattern — agar condition fail ho toh return karo, baaki code mein type already narrowed. TypeScript is flat code style ko prefer karta hai — nested if-else se better narrowing milti hai.',
          }}
          realWorldScenario="Express global error handler — err: unknown type hota hai. instanceof chain se narrow karo: ZodError hai toh 400 validation error, PrismaClientKnownRequestError hai toh 409 conflict, generic Error hai toh 500. Har case mein sahi properties automatically available hain — err.errors, err.message. Koi as casting nahi. Ye pattern production Express apps mein standard hai."
          commonMistakes={[
            {
              mistake: 'typeof null === "object" — JavaScript bug',
              why: 'typeof null === "object" — historic JavaScript bug. null check alag karna padta hai.',
              fix: 'value !== null && typeof value === "object" — null pehle check karo. Ya value == null se null aur undefined dono ek saath.',
            },
            {
              mistake: 'instanceof se interface check karna',
              why: 'Interfaces runtime pe exist nahi karte — instanceof hamesha false return karega.',
              fix: 'Interface ke liye in operator ya custom type predicate use karo. instanceof sirf classes ke liye.',
            },
          ]}
          proTip="TypeScript ka secret weapon — agar tum if (value == null) return likhte ho, toh uske baad poore function mein value guaranteed non-null hai. TypeScript ka control flow graph ye track karta hai. Early return se guard karo, baaki code clean ho jaata hai. Ye ek coding style aur type safety dono ka best combination hai — Effective TypeScript book mein isko 'guard clauses' kehte hain."
        />
      </div>

      <div id="type-predicates">
        <ConceptCard
          title="Custom Type Predicates — is keyword"
          emoji="🧪"
          difficulty="advanced"
          whatIsIt="Custom type predicates ek special function hain — return type boolean nahi, param is SomeType hota hai. TypeScript ko explicitly bata rahe ho: 'jab ye function true return kare toh trust karo — ye value is type ki hai.' Ye runtime check + compile time type information ka combination hai. Sabse powerful use — Array.filter ke saath. filter(isNotNull) se filtered array ka type automatically correct ho jaata hai, plain arrow function se nahi hota."
          whenToUse={[
            'Complex runtime type check — multiple conditions',
            'Reusable type guard — alag alag jagah same check',
            'Unknown type narrow karna — API responses, JSON.parse',
            'Array filter karna aur type preserve karna',
          ]}
          whyUseIt="Ab sawaal ye aata hai — sirf as casting kyun nahi karte? Kyunki as casting sirf TypeScript ko chup karaata hai — runtime mein koi guarantee nahi. Type predicate actual check karta hai runtime pe. Agar check galat hai toh TypeScript galat assume karega — bug. Agar check sahi hai toh compile time pe accurate types milte hain. Predicate ek contract hai: 'meri responsibility hai ye sahi check karna.'"
          howToUse={{
            filename: 'type-predicates.ts',
            language: 'typescript',
            code: `// ── BASIC TYPE PREDICATE ─────────────────────────────────────────
interface User {
  id: string
  name: string
  email: string
}

interface Admin extends User {
  permissions: string[]
  role: 'admin'
}

// Type predicate — boolean return nahi, x is User return
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value &&
    typeof (value as any).id === 'string' &&
    typeof (value as any).name === 'string' &&
    typeof (value as any).email === 'string'
  )
}

function isAdmin(user: User): user is Admin {
  return 'permissions' in user && user.role === 'admin'
}

// ── USAGE ─────────────────────────────────────────────────────
function processApiResponse(data: unknown) {
  if (isUser(data)) {
    // data: User — fully typed
    console.log(data.name.toUpperCase())
    console.log(data.email)

    if (isAdmin(data)) {
      // data: Admin — additional properties available
      console.log(data.permissions.join(', '))
    }
  } else {
    console.log('Invalid user data received')
  }
}

// ── ARRAY FILTER WITH PREDICATE ───────────────────────────────
const mixed: (User | null | undefined)[] = [
  { id: '1', name: 'Rahul', email: 'r@example.com' },
  null,
  { id: '2', name: 'Priya', email: 'p@example.com' },
  undefined,
]

function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

const users: User[] = mixed.filter(isNotNull)
// Without predicate: (User | null | undefined)[] — type preserved wrongly
// With predicate: User[] — TypeScript correctly narrows

// ── ASSERTION FUNCTIONS ───────────────────────────────────────
// throw karo agar condition fail ho — baad ka code automatically narrowed
function assertIsUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new Error(\`Expected User but got: \${typeof value}\`)
  }
  // Function return hone ke baad: value is User guaranteed
}

function assertDefined<T>(value: T | null | undefined): asserts value is T {
  if (value == null) {
    throw new Error('Value is null or undefined')
  }
}

// Usage
async function fetchAndProcess(id: string) {
  const data = await fetch(\`/api/users/\${id}\`).then(r => r.json())
  assertIsUser(data)  // Throw karta hai agar not a User
  // Yahan: data is User — guaranteed
  return data.name
}`,
            explanation: 'Ek critical point — isUser predicate mein galat check likhoge toh TypeScript wrong type assume karega. Ye TypeScript ki limitation hai — woh trust karta hai tum par. Isliye thorough validation karo. asserts value is User — ye alag hai. Ye throw karta hai failure pe, return nahi karta. Baad ka code guaranteed User type treat karta hai. Assertion functions startup validation ke liye perfect hain.',
          }}
          realWorldScenario="API se data aaya — unknown type. Zod schema banao, safeParse karo, aur type predicate return karo. function isApiUser(x: unknown): x is ApiUser { return userSchema.safeParse(x).success }. Ab isApiUser check karo — true hai toh data poori tarah typed hai. Zod validation + TypeScript narrowing ek saath. Ye pattern real production code mein bahut use hota hai — runtime safety + compile time safety dono."
          commonMistakes={[
            {
              mistake: 'Predicate mein actual check nahi karna — return true likhna',
              why: 'TypeScript runtime check nahi karta — agar predicate wrong hai toh TypeScript wrong type assume karta hai — runtime crash.',
              fix: 'Predicate mein hamesha thorough runtime validation karo. Zod ya io-ts use karo complex schemas ke liye.',
            },
            {
              mistake: 'isNotNull predicate ki jagah arr.filter(x => x !== null)',
              why: 'Without predicate: (User | null)[] still. TypeScript arrow function se type narrow nahi karta filter mein.',
              fix: 'function isNotNull<T>(x: T | null): x is T { return x !== null } — explicit predicate zaroorat hai.',
            },
          ]}
          proTip="Zod ek game-changer hai type predicates ke liye. Schema ek baar likho — z.object({ name: z.string(), email: z.string().email() }). z.infer se TypeScript type automatically niklo. safeParse.success se type predicate banao. Manually isUser predicate likhne ki zaroorat hi nahi — Zod ne sab handle kar diya. Aur agar schema change hoga? Type aur predicate dono automatically update ho jaayenge."
        />
      </div>

      <div id="discriminated-narrowing">
        <ConceptCard
          title="Discriminated Union Narrowing — Smart Switch"
          emoji="🎯"
          difficulty="advanced"
          whatIsIt="Discriminated union narrowing — TypeScript ka most elegant feature. status ya type property ek discriminant hoti hai. TypeScript switch statement mein isko dekh ke automatically narrow karta hai — case 'loading' mein TypeScript jaanta hai sirf status hai, case 'success' mein data bhi hai. Ye pattern async operations ke liye made for hai — idle, loading, success, error — har state ka apna shape, TypeScript sab track karta hai."
          whenToUse={[
            'Multiple state variants — loading, success, error',
            'Redux/Zustand actions type karna',
            'API responses — different shapes on success vs error',
            'Command pattern — different command types',
          ]}
          whyUseIt="Socho React component mein data fetch ho raha hai. Bina discriminated union ke — data?.user?.name likhna padega everywhere optional chaining se. Discriminated union ke saath — status check karo, TypeScript ne narrow kar diya, data.user.name directly accessible. No optional chaining, no 'possibly undefined' errors. Aur naya status add karo — compiler EVERY render function mein batayega handle karo. Ye compiler-driven development hai."
          howToUse={{
            filename: 'discriminated-narrowing.ts',
            language: 'typescript',
            code: `// ── ASYNC STATE PATTERN ──────────────────────────────────────────
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error; retryCount: number }

function renderUser(state: AsyncState<User>) {
  switch (state.status) {
    case 'idle':
      return 'Click to load'

    case 'loading':
      return 'Loading...'

    case 'success':
      // state: { status: 'success'; data: User }
      return \`Hello, \${state.data.name}!\`

    case 'error':
      // state: { status: 'error'; error: Error; retryCount: number }
      return \`Error: \${state.error.message} (Attempt \${state.retryCount})\`

    default:
      const _exhaustive: never = state  // Compile error if case added but not handled
      throw new Error(_exhaustive)
  }
}

// ── REDUX-STYLE ACTIONS ───────────────────────────────────────
type CartAction =
  | { type: 'ADD_ITEM'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_DISCOUNT'; discount: number }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      // action.payload: { productId: string; quantity: number }
      return addItem(state, action.payload.productId, action.payload.quantity)

    case 'REMOVE_ITEM':
      // action.payload: { productId: string }
      return removeItem(state, action.payload.productId)

    case 'CLEAR_CART':
      // No payload — TypeScript knows this
      return emptyCart()

    case 'SET_DISCOUNT':
      // action.discount: number — directly on action
      return applyDiscount(state, action.discount)

    default:
      const _: never = action  // Exhaustive check
      return state
  }
}

// ── IF-ELSE NARROWING ─────────────────────────────────────────
type ApiResponse<T> =
  | { ok: true; data: T; statusCode: 200 | 201 }
  | { ok: false; error: string; statusCode: 400 | 401 | 403 | 404 | 500 }

function handleResponse<T>(response: ApiResponse<T>): T {
  if (response.ok) {
    // response: { ok: true; data: T; statusCode: 200 | 201 }
    console.log(\`Success: \${response.statusCode}\`)
    return response.data
  } else {
    // response: { ok: false; error: string; ... }
    throw new Error(\`API Error \${response.statusCode}: \${response.error}\`)
  }
}`,
            explanation: 'AsyncState&lt;T&gt; pattern bahut reusable hai — generic T se koi bhi data type support karta hai. const _exhaustive: never = state line — ye sirf tab compile hoti hai agar sab cases handled hain. Agar handle nahi kiya naya case toh TypeScript error: "Type X is not assignable to never." Ye compile-time guarantee hai ki koi case miss nahi hua.',
          }}
          realWorldScenario="React TanStack Query ya SWR use karte ho — unka internal state discriminated union pe based hai. Khud banao useQuery hook: useState&lt;AsyncState&lt;User&gt;&gt;({ status: 'idle' }) se start karo. setState({ status: 'loading' }) fetch ke pehle, setState({ status: 'success', data }) success pe, setState({ status: 'error', error }) failure pe. Component mein switch — TypeScript sab handle karta hai. No undefined, no null checks everywhere."
          commonMistakes={[
            {
              mistake: 'Sab variants mein same discriminant value rakhna',
              why: 'Agar dono variants mein type: "user" hai toh TypeScript distinguish nahi kar sakta.',
              fix: 'Har variant ka discriminant unique literal value hona chahiye — type: "admin" vs type: "user" etc.',
            },
            {
              mistake: 'Never type ko actual value assign karna',
              why: 'never ko koi bhi value assign nahi ho sakti — agar error aa raha hai toh case missing hai.',
              fix: 'Ye intentional hai! Error matlab hai ki naya variant add hua hai aur switch mein case handle karna hai.',
            },
          ]}
          proTip="ts-pattern library dekhte hain — match(state).with({ status: 'success' }, s => s.data).with({ status: 'error' }, s => s.error).exhaustive(). Ye JavaScript mein Haskell-style pattern matching hai. .exhaustive() method compile-time exhaustiveness check karta hai. TypeScript ke saath perfectly typed. Agar switch-case zyada verbose lage toh ts-pattern ek clean alternative hai."
        />
      </div>

      <div id="exhaustiveness">
        <ConceptCard
          title="Exhaustiveness Checking — Never Miss A Case"
          emoji="✅"
          difficulty="advanced"
          whatIsIt="Exhaustiveness checking — ye TypeScript ka never type ka sabse practical use hai. never ek special type hai jo koi bhi value nahi le sakti. Switch statement mein jab sab cases handle ho jaate hain toh remaining value never type ki ho jaati hai. const _: never = value likhne se TypeScript check karta hai — agar value never nahi hai (matlab koi case bacha hua hai) toh compile error. Ye compile-time guarantee hai ki union ke sab cases handled hain."
          whenToUse={[
            'Switch statements pe discriminated unions',
            'Agar future mein union mein naye variants add honge',
            'Compiler help chahiye — "kahan kahan update karna hai?"',
            'Runtime-safe aur compile-time-safe dono chahiye',
          ]}
          whyUseIt="Ye situation imagine karo — 3 mahine baad product team bolta hai 'naya payment method add karo — wallet.' Tum union mein add karo PaymentMethod type mein. Bina exhaustiveness ke — compiler chup rahega, wallet ka fee silently 0 rahega, production bug. Exhaustiveness ke saath — compiler immediately 5 files mein error dega jahan getPaymentFee, displayPaymentIcon, etc. hain. Ek type change se poori codebase guided update. Ye compiler-driven refactoring hai."
          howToUse={{
            filename: 'exhaustiveness.ts',
            language: 'typescript',
            code: `// ── EXHAUSTIVENESS WITH NEVER ────────────────────────────────────
type PaymentMethod = 'credit_card' | 'debit_card' | 'upi' | 'netbanking'

function getPaymentFee(method: PaymentMethod): number {
  switch (method) {
    case 'credit_card': return 0.02   // 2%
    case 'debit_card':  return 0.01   // 1%
    case 'upi':         return 0      // Free
    case 'netbanking':  return 0.015  // 1.5%
    default:
      // Agar 'wallet' add kiya aur case nahi likha toh here:
      // TypeScript error: Type 'never' is not assignable to type 'never'
      // Wait — actually agar sab cases handle hain toh yahan NEVER pahunchega
      // Agar naya case miss hua toh TypeScript error dega!
      const _exhaustive: never = method
      throw new Error(\`Unhandled payment method: \${_exhaustive}\`)
  }
}

// ── HELPER FUNCTION APPROACH ──────────────────────────────────
function assertNever(value: never): never {
  throw new Error(\`Unexpected value: \${JSON.stringify(value)}\`)
}

type UserRole = 'admin' | 'editor' | 'viewer'

function getPermissions(role: UserRole): string[] {
  switch (role) {
    case 'admin':   return ['read', 'write', 'delete', 'manage']
    case 'editor':  return ['read', 'write']
    case 'viewer':  return ['read']
    default:        return assertNever(role)  // Compile error if case missing
  }
}

// ── ADDING NEW VARIANT — WHAT HAPPENS ─────────────────────────
// Agar type mein 'moderator' add karo:
// type UserRole = 'admin' | 'editor' | 'viewer' | 'moderator'
//
// Immediately TypeScript error dega assertNever(role) pe:
// "Argument of type 'string' is not assignable to parameter of type 'never'"
// Matlab: role 'moderator' ho sakta hai — ye nahi handle hua!

// ── EXHAUSTIVE OBJECT ─────────────────────────────────────────
// Alternative: object map approach
type StatusCode = 200 | 201 | 400 | 404 | 500

// Agar koi status miss kiya toh compile error!
const statusMessages: Record<StatusCode, string> = {
  200: 'OK',
  201: 'Created',
  400: 'Bad Request',
  404: 'Not Found',
  500: 'Internal Server Error',
  // 401 add karo StatusCode mein — compiler tells you here too!
}

// ── WITH CONDITIONAL RETURNS ──────────────────────────────────
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; w: number; h: number }

function describeShape(shape: Shape): string {
  if (shape.kind === 'circle') {
    return \`Circle r=\${shape.radius}\`
  }
  if (shape.kind === 'rect') {
    return \`Rect \${shape.w}x\${shape.h}\`
  }
  // TypeScript knows: shape is never here — all cases handled
  return assertNever(shape)  // Only needed if return required
}`,
            explanation: 'assertNever helper function — ye pattern bahut reusable hai. Ek baar banao, saare switch statements mein use karo. function assertNever(value: never): never — parameter type bhi never, return type bhi never. Agar value never nahi hai, TypeScript aise hi compile error deta hai. Record&lt;StatusCode, string&gt; approach bhi dekhte hain — object map se bhi exhaustiveness check hoti hai, switch se zyada readable kabhi kabhi.',
          }}
          realWorldScenario="E-commerce project — OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'. 3 mahine baad 'refunded' add kiya. Exhaustiveness checking hai — compiler ne immediately bataya: getOrderLabel, getOrderIcon, sendOrderEmail, updateOrderUI — in 4 files mein handle nahi kiya. Team ne 1 ghante mein sab fix kar diya. Bina exhaustiveness ke — refunded orders mein wrong label, wrong emails — customer support tickets aate, production hotfix lata."
          commonMistakes={[
            {
              mistake: 'assertNever call karna agar cases actually incomplete hain',
              why: 'Compilation se pehle hi runtime error aa jayega — intentional exhaustiveness check ki jagah actual bug.',
              fix: 'Pehle sab cases handle karo, phir assertNever default mein. Never reach hona chahiye runtime pe.',
            },
            {
              mistake: 'Never check ke bina naya union member add karna',
              why: 'Bina check ke naya member silently unhandled cases create karta hai — unexpected behavior.',
              fix: 'Hamesha discriminated unions ke switch mein default: assertNever(x) likho — compiler guide karega.',
            },
          ]}
          proTip="Record approach ek hidden gem hai — const feeMap: Record&lt;PaymentMethod, number&gt; = { credit_card: 0.02, upi: 0 ... }. Agar PaymentMethod mein naya member add karo, Record compile error deta hai — key missing. Switch se zyada clean, same exhaustiveness guarantee. Simple static mappings ke liye Record pattern prefer karo, complex logic ke liye switch. Choose the right tool."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 9 Quiz — Type Guards & Narrowing
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — type predicates, narrowing, aur exhaustiveness test karo!
          </p>
        </div>
        <QuizSection questions={tsQuiz} chapterSlug="ts-type-guards-narrowing" />
      </div>
    </div>
  )
}
