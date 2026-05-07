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
          TypeScript control flow analysis karta hai — if-else, switch, try-catch blocks mein automatically type narrow karta hai. Lekin kab manual help chahiye? Custom type predicates, in operator, instanceof — ye sab narrowing tools hain. Exhaustiveness checking se ensure karo ki union ke koi bhi case miss na ho.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein TypeScript ke narrowing mechanisms deeply samjhenge — taaki koi bhi runtime type error se bachein aur type-safe code consistently likhein.
        </p>
      </div>

      <div id="typeof-instanceof">
        <ConceptCard
          title="typeof & instanceof Guards — Built-in Narrowing"
          emoji="🔎"
          difficulty="advanced"
          whatIsIt="TypeScript built-in control flow analysis karta hai — typeof, instanceof, equality checks, truthiness checks sab type narrow karte hain. typeof narrowing primitive types ke liye kaam karta hai: string, number, boolean, bigint, symbol, undefined, function, object. instanceof class instances ke liye."
          whenToUse={[
            'Union types mein primitives distinguish karna — string | number',
            'Class instances check karna — Error, Date, custom classes',
            'null/undefined check — if (value != null)',
            'Truthy/falsy checks — empty string, 0, null sab falsy',
          ]}
          whyUseIt="typeof aur instanceof most common narrowing tools hain — JS runtime checks directly TypeScript ko samjha dete hain. No extra setup — ye language built-in hai. TypeScript inhe reliably samjhta hai aur type narrow karta hai. Zyada cases ke liye kafi hain — custom predicates edge cases ke liye."
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
            explanation: 'typeof string, number, boolean ke liye. instanceof class instances ke liye. in operator property existence check ke liye. Equality checks literal types narrow karte hain. Ye sab compile-time information dete hain TypeScript ko — no casting needed.',
          }}
          realWorldScenario="Express error handler: app.use((err: unknown, req, res, next) => { if (err instanceof ZodError) { res.status(400).json({ errors: err.errors }) } else if (err instanceof PrismaClientKnownRequestError) { res.status(409).json({ error: 'Conflict' }) } else if (err instanceof Error) { res.status(500).json({ error: err.message }) } }). Har error type alag handled — no any."
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
          proTip="TypeScript control flow graph banata hai — har branch mein type track karta hai. Agar tum if (cond) return statement likhte ho toh baad ki code mein type already narrowed hoti hai. Early returns se nesting kam hoti hai aur TypeScript ka narrowing bhi better kaam karta hai — prefer flat code with early returns."
        />
      </div>

      <div id="type-predicates">
        <ConceptCard
          title="Custom Type Predicates — is keyword"
          emoji="🧪"
          difficulty="advanced"
          whatIsIt="Custom type predicates TypeScript ko batate hain ki ek function kisi value ka type check karta hai. Return type: param is SomeType. Jab function true return kare toh TypeScript us parameter ko SomeType maan leta hai. Reusable type guards banane ke liye — ek baar likho, kahin bhi use karo."
          whenToUse={[
            'Complex runtime type check — multiple conditions',
            'Reusable type guard — alag alag jagah same check',
            'Unknown type narrow karna — API responses, JSON.parse',
            'Array filter karna aur type preserve karna',
          ]}
          whyUseIt="Custom predicates complex narrowing logic encapsulate karte hain. (arr as User[]) casting se better — runtime mein actual check hoti hai. Array.filter(isUser) — filtered array automatically User[] type ka hota hai. Reusable — ek baar define karo, kahin bhi use karo safely."
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
            explanation: 'value is User return type TypeScript ko signal hai. Actual runtime check karo — fake predicates runtime bugs cause karte hain. Array.filter(isNotNull) — filtered type correctly narrowed. asserts x is T assertion functions ke liye — throw se baad TypeScript narrow karta hai.',
          }}
          realWorldScenario="API response validation: function isApiUser(data: unknown): data is ApiUser — Zod se built bhi kar sakte ho. const zodUser = z.object({...}). function isApiUser(x: unknown): x is z.infer<typeof zodUser> { return zodUser.safeParse(x).success }. Ab Zod validation + TypeScript narrowing dono ek saath kaam karte hain."
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
          proTip="Zod library se automatically type predicates banao: const userSchema = z.object({ name: z.string() }). type User = z.infer<typeof userSchema>. function isUser(x: unknown): x is User { return userSchema.safeParse(x).success }. Zod runtime validation karta hai aur TypeScript type dono milte hain — manually likhne ki zaroorat nahi."
        />
      </div>

      <div id="discriminated-narrowing">
        <ConceptCard
          title="Discriminated Union Narrowing — Smart Switch"
          emoji="🎯"
          difficulty="advanced"
          whatIsIt="Discriminated unions mein common literal property (discriminant) hoti hai — TypeScript switch ya if-else mein automatically narrow karta hai. Har case mein correct properties available hain — no casting. Ye pattern React state management, Redux actions, API responses ke liye ideal hai."
          whenToUse={[
            'Multiple state variants — loading, success, error',
            'Redux/Zustand actions type karna',
            'API responses — different shapes on success vs error',
            'Command pattern — different command types',
          ]}
          whyUseIt="Discriminated union narrowing zero-overhead type safety deta hai. as casting ki zaroorat nahi — TypeScript khud samjhta hai. IDE exact properties suggest karta hai har case ke liye. Naya variant add karo — TypeScript automatically batata hai kahan handle karna padega."
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
            explanation: 'status ya type property discriminant hai. switch case mein TypeScript automatically narrow karta hai. never default case mein exhaustiveness ensure karta hai. Discriminant literal type honi chahiye — string/number literal, boolean.',
          }}
          realWorldScenario="React data fetching hook: const [state, setState] = useState<AsyncState<User>>({ status: 'idle' }). useEffect mein setState({ status: 'loading' }) phir setState({ status: 'success', data: user }). Render mein switch(state.status) — har case mein exactly sahi properties available hain. Type safety throughout!"
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
          proTip="Discriminated unions ke liye match function likhna handy hai: function match<T extends { status: string }>(state: T, handlers: { [K in T['status']]: (s: Extract<T, { status: K }>) => void }): void. Type-safe pattern matching — JavaScript mein Haskell-style. ts-pattern library ye already provide karti hai production-ready tarike se."
        />
      </div>

      <div id="exhaustiveness">
        <ConceptCard
          title="Exhaustiveness Checking — Never Miss A Case"
          emoji="✅"
          difficulty="advanced"
          whatIsIt="Exhaustiveness checking ensure karta hai ki union type ke sab cases handle kiye hain. never type ko pattern: jab TypeScript narrow karta karta actual never pahunch jaaye — koi value left nahi — toh _: never assignment compile error deta hai agar koi case miss ho. TypeScript 4.9+ mein satisfies bhi help karta hai."
          whenToUse={[
            'Switch statements pe discriminated unions',
            'Agar future mein union mein naye variants add honge',
            'Compiler help chahiye — "kahan kahan update karna hai?"',
            'Runtime-safe aur compile-time-safe dono chahiye',
          ]}
          whyUseIt="Exhaustiveness checking refactoring safe banata hai. Naya union member add karo — TypeScript immediately batata hai kahan kahan handle karna hai. Bina ye check ke silent bug ho sakta hai — naya case silently default pe fall kare. This is TypeScript ki best safety feature — never type ka practical use."
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
            explanation: 'never type ko koi value assign nahi ho sakti. assertNever(x) function parameter never type leta hai — agar x never nahi hai (unhandled case) toh compile error. Record<StatusCode, string> object exhaustive map ke liye alternate approach hai.',
          }}
          realWorldScenario="E-commerce project mein OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'. 3 mahine baad 'refunded' add karna pada. Bina exhaustiveness ke — silent bug, refunded orders wrong state. Exhaustiveness checking ke saath — compiler immediately 5 alag files mein switch statements pe error deta hai."
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
          proTip="ts-pattern library (github.com/gvergnaud/ts-pattern) TypeScript mein pattern matching implement karta hai: match(shape).with({ kind: 'circle' }, s => Math.PI * s.radius ** 2).with({ kind: 'rect' }, s => s.w * s.h).exhaustive(). .exhaustive() call compile-time check karta hai — agar case miss hua toh error. Very readable pattern matching!"
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
