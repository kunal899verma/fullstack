'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const tsQuiz: QuizQuestion[] = [
  {
    question: 'TypeScript ka main advantage JavaScript ke upar kya hai?',
    options: [
      { text: 'Code faster run karta hai', correct: false, explanation: 'TypeScript runtime pe JS mein compile hota hai — speed same hai.' },
      { text: 'Compile time type errors catch karta hai, runtime se pehle', correct: true, explanation: 'Sahi! Bugs deploy hone se pehle pakad jaate hain — better developer experience aur fewer production bugs.' },
      { text: 'Async code automatically handle karta hai', correct: false, explanation: 'TypeScript async handling change nahi karta.' },
      { text: 'Node.js ke bina browser mein run ho sakta hai', correct: false, explanation: 'TypeScript transpile hota hai JavaScript mein — browser JS hi run karta hai.' },
    ],
  },
  {
    question: 'unknown aur any mein kya fark hai?',
    options: [
      { text: 'Dono same hain', correct: false, explanation: 'Bahut important fark hai — type safety ke lihaz se.' },
      { text: 'any type checks bypass karta hai; unknown pe type check required hai operations karne se pehle', correct: true, explanation: 'Sahi! unknown safe hai — operations karne se pehle type narrow karo. any sab kuch allow karta hai — TypeScript ki benefits khatam.' },
      { text: 'unknown sirf null ke liye hai', correct: false, explanation: 'unknown kisi bhi value ke liye hai — but type-safe.' },
      { text: 'any error throw karta hai', correct: false, explanation: 'any TypeScript type checking skip karta hai — no errors.' },
    ],
  },
  {
    question: 'Interface aur Type alias mein kya fark hai?',
    options: [
      { text: 'Koi fark nahi', correct: false, explanation: 'Subtle lekin important differences hain.' },
      { text: 'Interface extend aur merge ho sakti hai; Type union/intersection aur primitive aliases bana sakta hai', correct: true, explanation: 'Sahi! Interface declaration merging support karta hai. Type zyada flexible hai — unions, tuples, mapped types.' },
      { text: 'Type faster compile hoti hai', correct: false, explanation: 'Compile speed meaningful difference nahi.' },
      { text: 'Interface sirf objects ke liye hai; Type functions ke liye', correct: false, explanation: 'Dono objects aur functions ke liye kaam karte hain.' },
    ],
  },
  {
    question: 'Generics kab use karte hain?',
    options: [
      { text: 'Kabhi nahi — TypeScript complicated ho jaata hai', correct: false, explanation: 'Generics TypeScript ka core feature hai — reusable type-safe code ke liye essential.' },
      { text: 'Jab function different types ke saath kaam kare lekin type safety maintain ho', correct: true, explanation: 'Bilkul! Array<T>, Promise<T>, useState<T> — sab generics use karte hain.' },
      { text: 'Sirf class mein', correct: false, explanation: 'Generics functions, interfaces, types — sab mein use hote hain.' },
      { text: 'Jab any use karna ho', correct: false, explanation: 'Generics any ka type-safe alternative hai.' },
    ],
  },
  {
    question: 'Partial<T> utility type kya karta hai?',
    options: [
      { text: 'T ke saare properties required banata hai', correct: false, explanation: 'Saare required karne ke liye Required<T> hai.' },
      { text: 'T ke saare properties optional banata hai', correct: true, explanation: 'Sahi! Update functions mein useful — sirf jo fields update karne ho woh pass karo.' },
      { text: 'T se kuch properties select karta hai', correct: false, explanation: 'Properties select karne ke liye Pick<T, K> hai.' },
      { text: 'T ko readonly banata hai', correct: false, explanation: 'Readonly ke liye Readonly<T> utility type hai.' },
    ],
  },
]

export default function JSChapter16Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(124,58,237,0.06)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          TypeScript Basics — Type-Safe JavaScript
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          TypeScript JavaScript ka superset hai — extra type system ke saath. Compile time pe bugs catch karta hai, better IDE support deta hai, aur code documentation ki tarah kaam karta hai. Modern React aur Node.js development mein TypeScript standard ban gaya hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum TypeScript ke core concepts cover karenge — jo aapko day-to-day TypeScript code likhne ke liye chahiye.
        </p>
      </div>

      <div id="why-typescript">
        <ConceptCard
          title="Kyun TypeScript? — The Case for Types"
          emoji="🛡️"
          difficulty="advanced"
          whatIsIt="TypeScript JavaScript mein static type checking add karta hai. Ye compile karta hai plain JavaScript mein — browser/Node.js ko TypeScript run karne ki zaroorat nahi. Types code ki documentation ban jaati hain, IDE autocomplete improve hoti hai, aur bugs deploy hone se pehle pakde jaate hain."
          whenToUse={[
            'Large codebases — multiple developers, long-term maintenance',
            'Public APIs ya libraries — consumers ko types chahiye',
            'Complex data structures — guarantee karo shape sahi hai',
            'Refactoring — type system batata hai kya break hua',
          ]}
          whyUseIt="JavaScript mein undefined is not a function runtime pe crash karta hai — TypeScript compiler pe catch hota hai. Autocomplete se development faster hoti hai — property names yaad rakhne ki zaroorat nahi. Refactoring safe hoti hai — TypeScript sab broken references highlight karta hai. GitHub survey: TypeScript top 5 languages consistently."
          howToUse={{
            filename: 'why-typescript.ts',
            language: 'typescript',
            code: `// ❌ JavaScript — runtime mein crash
function getFullName(user) {
  return user.firstName + ' ' + user.lastName
}

getFullName(null)  // Runtime: TypeError — production mein crash!
getFullName({ firstName: 'Rahul' })  // 'Rahul undefined' — silent bug

// ✅ TypeScript — compile time catch
interface User {
  firstName: string
  lastName: string
  age: number
}

function getFullName(user: User): string {
  return \`\${user.firstName} \${user.lastName}\`
}

// getFullName(null)  // TS Error: Argument of type 'null' is not assignable
// getFullName({ firstName: 'Rahul' })  // TS Error: Property 'lastName' is missing

// TypeScript benefits at work:
const users: User[] = []
users.push({ firstName: 'Rahul', lastName: 'Sharma', age: 25 })

// IDE autocomplete — type karo user. aur sab properties dikhti hain
const name = users[0].firstName   // Autocomplete!
// users[0].phone                 // TS Error: Property 'phone' does not exist

// tsconfig.json basics
// {
//   "compilerOptions": {
//     "target": "ES2022",     // Output JS version
//     "strict": true,          // All strict checks on — always!
//     "module": "ESNext",
//     "moduleResolution": "bundler",
//     "outDir": "./dist",
//     "rootDir": "./src"
//   }
// }`,
            explanation: 'TypeScript strict mode sabse important hai — true karo hamesha. Interface se object shape define karo. Function parameters aur return types annotate karo. Compiler ghar pe crash dhundega pehle — production mein nahi.',
          }}
          realWorldScenario="Sequifi jaisi company mein 50+ developers ek codebase pe kaam karte hain. TypeScript ke bina: koi bhi function call karo wrong arguments ke saath — runtime pe pata chale. TypeScript ke saath: wrong call pe IDE seedha red underline — save karte hi pata chalta hai."
          commonMistakes={[
            {
              mistake: 'strict: false rakhna',
              why: 'Strict mode ke bina TypeScript half-baked safety deta hai — any bahut zyada allowed, null checks miss.',
              fix: 'tsconfig.json mein strict: true hamesha. Ek baar setup karo, lifetime benefits.',
            },
            {
              mistake: 'any type use karna "quick fix" ke liye',
              why: 'any TypeScript ki saari benefits eliminate karta hai — type checking skip hoti hai.',
              fix: 'unknown use karo jab type sure na ho. Type assertions (as Type) specific cases ke liye. Fix karo types properly.',
            },
          ]}
          proTip="TypeScript gradually adopt karo — .js files ko .ts mein rename karo ek ek karke. allowJs: true tsconfig mein se mix hone deta hai. tsc --noEmit se sirf type check karo bina compile kiye. ESLint + @typescript-eslint ke saath powerful static analysis."
        />
      </div>

      <div id="basic-types">
        <ConceptCard
          title="TypeScript Types — Complete Guide"
          emoji="🔤"
          difficulty="advanced"
          whatIsIt="TypeScript ke primitive types: string, number, boolean. Special types: any (skip type checking), unknown (safe any), never (impossible), void (no return), undefined, null. Complex: object, array, tuple, enum. Union types se multiple types allow karo. Literal types exact values define karte hain."
          whenToUse={[
            'Function parameters type karne ko',
            'Variables explicitly type karne ko (inference kaafi na ho)',
            'Union types — multiple valid types',
            'Literal types — exact allowed values',
          ]}
          whyUseIt="Types documentation hai jo outdated nahi hoti — code hi spec hai. never type exhaustive checks enable karta hai. unknown pe operations karne se pehle type narrow karna mandatory — safe. Tuple exact shape define karta hai — index 0 hamesha string, index 1 number."
          howToUse={{
            filename: 'types.ts',
            language: 'typescript',
            code: `// ── PRIMITIVE TYPES ──────────────────────────────────────────────
let name: string = 'Rahul'
let age: number = 25
let isActive: boolean = true
let nothing: null = null
let notDefined: undefined = undefined

// Type inference — usually annotation zaroorat nahi
let score = 100  // TypeScript infers: number
let greeting = 'Hello'  // Infers: string

// ── SPECIAL TYPES ─────────────────────────────────────────────────

// any — avoid karo! Type checking skip
let x: any = 'hello'
x = 42  // OK — no type checking
x.nonexistent.property  // OK — no error even at compile time!

// unknown — safe version of any
let y: unknown = fetchSomeData()
// y.name  // Error! Type check required first

if (typeof y === 'string') {
  y.toUpperCase()  // Now safe — narrowed to string
}
if (y !== null && typeof y === 'object' && 'name' in y) {
  console.log((y as { name: string }).name)
}

// never — impossible type (exhaustive checks)
type Shape = 'circle' | 'square' | 'triangle'
function getArea(shape: Shape): number {
  switch (shape) {
    case 'circle': return Math.PI * 5 * 5
    case 'square': return 25
    case 'triangle': return 12.5
    default:
      const _exhaustive: never = shape  // Error agar new shape add ho aur case miss ho!
      throw new Error(\`Unknown shape: \${_exhaustive}\`)
  }
}

// void — function kuch return nahi karta
function logMessage(msg: string): void {
  console.log(msg)
  // return undefined is OK
  // return 'something'  // Error!
}

// ── UNION TYPES ───────────────────────────────────────────────────
type StringOrNumber = string | number
let id: StringOrNumber = 'user_123'
id = 42  // Also OK!

function processId(id: string | number) {
  if (typeof id === 'string') {
    return id.toUpperCase()  // string narrowed
  }
  return id.toFixed(2)  // number narrowed
}

// ── LITERAL TYPES ─────────────────────────────────────────────────
type Direction = 'north' | 'south' | 'east' | 'west'
type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500

let heading: Direction = 'north'
// heading = 'up'  // Error! Not in union

// ── ARRAYS & TUPLES ───────────────────────────────────────────────
const nums: number[] = [1, 2, 3]
const names: Array<string> = ['Rahul', 'Priya']  // Generic syntax

// Tuple — fixed length, fixed types at each position
type Coordinate = [number, number]
type NameAge = [string, number]

const point: Coordinate = [10, 20]
const entry: NameAge = ['Rahul', 25]
// entry[0].toFixed()  // Error! index 0 is string, not number`,
            explanation: 'Type inference bahut powerful hai — annotations everywhere zaroorat nahi. unknown > any hamesha — safe operations force karta hai. never exhaustive switch checks ke liye perfect — naya case add karo bhool gaye toh compile error. Literal types exact valid values constrain karte hain.',
          }}
          realWorldScenario="API response type karo: type ApiResponse<T> = { data: T; status: 200 | 201; } | { error: string; status: 400 | 401 | 500 }. Caller response check kare — TypeScript force karta hai error case handle karo. Runtime surprises nahi."
          commonMistakes={[
            {
              mistake: 'any use karna type error fix karne ke liye',
              why: 'Any se type checking bypass hoti hai — future bugs guaranteed.',
              fix: 'unknown + type narrowing, ya proper interface define karo, ya type assertion (as Type) — any se better.',
            },
            {
              mistake: 'Har jagah explicit type annotation likhna',
              why: 'Over-annotation — TypeScript inference kaafi hai. const name: string = "Rahul" — redundant.',
              fix: 'Inference pe rely karo simple cases mein. Annotations jab inference wrong ho ya function signatures mein.',
            },
          ]}
          proTip="satisfies operator TypeScript 4.9 mein aaya — object ko type match karo lekin inferred type preserve karo: const palette = { red: [255, 0, 0] } satisfies Record<string, [number, number, number]>. palette.red ka type [255, 0, 0] remain karta hai — number[] nahi."
        />
      </div>

      <div id="interfaces-types">
        <ConceptCard
          title="Interfaces vs Types — Kab Kaunsa?"
          emoji="📋"
          difficulty="advanced"
          whatIsIt="Interface object shapes define karta hai — extend aur merge ho sakti hai. Type alias kuch bhi alias kar sakta hai — primitives, unions, intersections, tuples, mapped types. Object types ke liye dono mostly interchangeable hain. Interface declaration merging support karta hai — Type nahi. Type zyada expressive hai complex transformations mein."
          whenToUse={[
            'Object shapes — interface prefer karo (convention)',
            'Union types — sirf type se possible',
            'Tuple types — sirf type se',
            'Library types extend karna — interface declaration merging',
          ]}
          whyUseIt="Interface extend se type hierarchy banana readable aur maintainable hai. Declaration merging se third-party types augment kar sakte ho — Window interface pe custom property add karo. Type zyada flexible hai — computed properties, conditional types, mapped types — all type se."
          howToUse={{
            filename: 'interfaces-types.ts',
            language: 'typescript',
            code: `// ── INTERFACE ─────────────────────────────────────────────────────
interface User {
  id: string
  name: string
  email: string
  age?: number  // Optional
  readonly createdAt: Date  // Immutable
}

// Extend — inheritance
interface AdminUser extends User {
  role: 'admin'
  permissions: string[]
}

// Declaration merging — same name multiple times
interface Window {
  myCustomProp: string  // Augment browser's Window type!
}

// Method signature
interface Repository<T> {
  findById(id: string): Promise<T | null>
  findAll(filters?: Partial<T>): Promise<T[]>
  save(entity: T): Promise<T>
  delete(id: string): Promise<void>
}

// ── TYPE ALIAS ────────────────────────────────────────────────────
// Primitive alias
type UserId = string
type Timestamp = number

// Union — only possible with type
type Status = 'active' | 'inactive' | 'suspended'
type ID = string | number

// Intersection — combine types
type AdminWithProfile = AdminUser & { profilePicUrl: string }

// Tuple
type Pair<T> = [T, T]
type StringPair = Pair<string>  // [string, string]

// Conditional type — advanced
type IsArray<T> = T extends any[] ? true : false
type Test1 = IsArray<string[]>  // true
type Test2 = IsArray<string>    // false

// Mapped type — transform object types
type Readonly<T> = { readonly [K in keyof T]: T[K] }
type Optional<T> = { [K in keyof T]?: T[K] }

// ── INTERFACE vs TYPE — Practical Examples ────────────────────────

// Same thing, different syntax:
interface Point { x: number; y: number }
type PointT = { x: number; y: number }

// Extending:
interface Point3D extends Point { z: number }
type Point3DT = PointT & { z: number }

// Interface: declaration merging (augmenting existing types)
// Type: union, intersection, conditional, mapped types

// Function type:
interface Fn { (x: number): string }
type FnT = (x: number) => string  // More readable`,
            explanation: 'Interface object shapes ke liye idiomatic TypeScript hai. Declaration merging se third-party types extend karo. Type alias unions, tuples, conditional types ke liye essential. Most cases mein dono equivalent hain — codebase mein consistent raho.',
          }}
          realWorldScenario="Express.js Request type augment karna: interface Request { user?: AuthenticatedUser } — declare globally toh req.user TypeScript samjhega. Library types modify karne ki zaroorat Interface ki unique strength hai."
          commonMistakes={[
            {
              mistake: 'Interface aur Type dono ka mixed use — inconsistent codebase',
              why: 'Readability kam hoti hai, code review mein confusion.',
              fix: 'Team convention choose karo — object types ke liye interface, complex types ke liye type. Consistent raho.',
            },
            {
              mistake: 'Object type annotation mein semicolons aur commas mix karna',
              why: 'Interface mein semicolons convention hai, type literal mein bhi. Consistency important.',
              fix: 'Interface: { a: string; b: number }. TypeScript dono accept karta hai lekin consistent raho.',
            },
          ]}
          proTip="Discriminated unions TypeScript ki superpower hai: type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; side: number }. switch (shape.kind) pe TypeScript automatically type narrow karta hai — each case mein correct properties available. Exhaustive checks bhi kaam karti hain."
        />
      </div>

      <div id="generics">
        <ConceptCard
          title="Generics — Type-Safe Reusability"
          emoji="🔬"
          difficulty="advanced"
          whatIsIt="Generics type parameters hain — T, K, V jaise placeholder types jo caller specify karta hai. Array<T>, Promise<T>, useState<T> — sab generics use karte hain. Constraints se T ko specific types tak limit karo. Generic functions kisi bhi type ke saath kaam karte hain type safety maintain karte hue."
          whenToUse={[
            'Functions jo kisi bhi type ke saath kaam kare — utility functions',
            'Data structures — collections, queues, stacks',
            'API wrappers — response type generic',
            'React hooks — useState, useRef, useCallback',
          ]}
          whyUseIt="Generics any ki jagah type-safe polymorphism dete hain. identity<T>(x: T): T — koi bhi type, but return type same hoga. Constraints ensure karte hain T zaroor certain properties rakhe. Inference se caller usually generics explicitly specify nahi karte — TypeScript figure out karta hai."
          howToUse={{
            filename: 'generics.ts',
            language: 'typescript',
            code: `// ── BASIC GENERICS ───────────────────────────────────────────────
function identity<T>(value: T): T {
  return value
}

identity('hello')         // string
identity(42)              // number
identity([1, 2, 3])       // number[]
identity<boolean>(true)   // Explicitly specify

// ── GENERIC FUNCTIONS ─────────────────────────────────────────────
function first<T>(arr: T[]): T | undefined {
  return arr[0]
}

first([1, 2, 3])          // number | undefined
first(['a', 'b'])         // string | undefined
first([])                 // undefined

// Pick from object — key must exist
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: 'Rahul', age: 25, email: 'rahul@example.com' }
getProperty(user, 'name')   // string
getProperty(user, 'age')    // number
// getProperty(user, 'phone')  // Error! 'phone' not in user

// ── GENERIC INTERFACES ────────────────────────────────────────────
interface ApiResponse<T> {
  data: T
  status: number
  message: string
  timestamp: string
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    pageSize: number
    total: number
  }
}

async function fetchUsers(): Promise<PaginatedResponse<User>> {
  const res = await fetch('/api/users')
  return res.json()
}

const { data: users, pagination } = await fetchUsers()
// users: User[] — fully typed!
// pagination.total: number

// ── CONSTRAINTS ───────────────────────────────────────────────────
// T must have a name property
function printName<T extends { name: string }>(item: T): void {
  console.log(item.name)
}
printName({ name: 'Rahul', age: 25 })  // OK
// printName({ age: 25 })  // Error! No 'name'

// Multiple constraints
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b }
}

// ── GENERIC CLASSES ────────────────────────────────────────────────
class Stack<T> {
  private items: T[] = []

  push(item: T): void { this.items.push(item) }
  pop(): T | undefined { return this.items.pop() }
  peek(): T | undefined { return this.items[this.items.length - 1] }
  isEmpty(): boolean { return this.items.length === 0 }
  size(): number { return this.items.length }
}

const numStack = new Stack<number>()
numStack.push(1); numStack.push(2)
// numStack.push('hello')  // Error! number stack only`,
            explanation: 'T generic parameter hai — caller specify karta hai. keyof T se object ke keys type mein milte hain. extends constraint T ke possible types limit karta hai. Type inference usually manual specification zaroorat nahi banata. Generics se any ki zaroorat eliminate hoti hai.',
          }}
          realWorldScenario="Custom useAsync hook: function useAsync<T>(asyncFn: () => Promise<T>) — caller specify karta hai return type. const { data, loading, error } = useAsync<User>(() => fetchUser(id)). data automatically User type ka hai — no casting needed."
          commonMistakes={[
            {
              mistake: 'Har cheez ke liye generic banana jab specific type kaafi ho',
              why: 'Over-engineering — simple functions complex ho jaate hain unnecessarily.',
              fix: 'Generic sirf jab genuinely multiple types support karne ho. Specific types prefer karo jab possible.',
            },
            {
              mistake: 'T extend any lagana',
              why: 'T extends any practically unconstrained hai — point khatam.',
              fix: 'Meaningful constraints use karo: T extends object, T extends string | number, T extends { id: string }',
            },
          ]}
          proTip="Conditional generics powerful pattern hain: type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T. infer keyword generic type se type extract karta hai. ReturnType<T>, Parameters<T>, InstanceType<T> — built-in utility types jo generics use karte hain complex inference ke liye."
        />
      </div>

      <div id="utility-types">
        <ConceptCard
          title="Utility Types — TypeScript Ka Toolkit"
          emoji="🛠️"
          difficulty="advanced"
          whatIsIt="TypeScript built-in utility types hain jo common type transformations provide karte hain. Partial, Required, Pick, Omit, Record, Readonly, Extract, Exclude, ReturnType, Awaited — ye sab kaam aate hain. Type manipulation bina repeat kiye — DRY principle types ke liye."
          whenToUse={[
            'Update function mein sirf kuch fields — Partial<T>',
            'API response se sensitive fields remove karna — Omit<T, K>',
            'Object type dictionary banana — Record<K, V>',
            'Function return type infer karna — ReturnType<T>',
          ]}
          whyUseIt="Utility types se types reuse hoti hain — ek base type define karo, derive karo variations. DRY — change karo ek jagah, sab derived types update. TypeScript documentation — intent clear hoti hai: Partial bolta hai optional update, Omit bolta hai certain fields absent."
          howToUse={{
            filename: 'utility-types.ts',
            language: 'typescript',
            code: `interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  createdAt: Date
}

// ── Partial<T> — sab optional ─────────────────────────────────────
function updateUser(id: string, updates: Partial<User>): Promise<User> {
  // updates mein koi bhi field optional hai
  return db.update('users', id, updates)
}
updateUser('123', { name: 'New Name' })  // Only name — valid!

// ── Required<T> — sab required ───────────────────────────────────
type CompleteUser = Required<User>  // All optional fields become required

// ── Pick<T, K> — subset of properties ────────────────────────────
type UserPublic = Pick<User, 'id' | 'name' | 'role'>
// { id: string; name: string; role: 'admin' | 'user' }

// ── Omit<T, K> — remove properties ───────────────────────────────
type UserWithoutPassword = Omit<User, 'password'>
type UserSafe = Omit<User, 'password' | 'createdAt'>

function serializeUser(user: User): UserWithoutPassword {
  const { password, ...rest } = user
  return rest
}

// ── Record<K, V> — dictionary type ───────────────────────────────
type RolePermissions = Record<'admin' | 'user' | 'moderator', string[]>

const permissions: RolePermissions = {
  admin: ['read', 'write', 'delete', 'manage'],
  user: ['read'],
  moderator: ['read', 'write'],
}

type UserMap = Record<string, User>  // { [userId: string]: User }

// ── ReturnType<T> ─────────────────────────────────────────────────
function createConfig() {
  return { port: 3000, host: 'localhost', debug: false }
}

type Config = ReturnType<typeof createConfig>
// { port: number; host: string; debug: boolean }

// ── Awaited<T> — unwrap Promise ───────────────────────────────────
async function fetchUser(): Promise<User> { /* ... */ return {} as User }
type FetchedUser = Awaited<ReturnType<typeof fetchUser>>  // User (not Promise<User>)

// ── Extract & Exclude ─────────────────────────────────────────────
type T1 = Extract<'a' | 'b' | 'c', 'a' | 'c'>  // 'a' | 'c'
type T2 = Exclude<'a' | 'b' | 'c', 'a' | 'c'>  // 'b'

// ── NonNullable<T> ────────────────────────────────────────────────
type T3 = NonNullable<string | null | undefined>  // string

// ── Parameters<T> ─────────────────────────────────────────────────
function createUser(name: string, age: number, role: string) { /* */ }
type CreateUserParams = Parameters<typeof createUser>  // [string, number, string]`,
            explanation: 'Utility types type derivation ke liye essential hain. Omit<User, "password"> API-safe user type banata hai. Partial<T> update functions ke liye perfect. ReturnType<typeof fn> function return type capture karta hai. Record<K, V> typed dictionaries ke liye. In sab se boilerplate bahut kam hoti hai.',
          }}
          realWorldScenario="API mein: POST /users accept karta hai Omit<User, 'id' | 'createdAt'> (ye server generate karta hai). PATCH /users/:id accept karta hai Partial<Omit<User, 'id' | 'createdAt'>>. Same User base type se sab derive — ek jagah change, sab update."
          commonMistakes={[
            {
              mistake: 'Manually type duplicate karna utility types ki jagah',
              why: 'User change karo — manually duplicated types outdated ho jaati hain. Bugs.',
              fix: 'Base type se derive karo — Partial, Pick, Omit. Change ek jagah, sab update.',
            },
            {
              mistake: 'DeepPartial<T> built-in samajhna',
              why: 'Partial<T> sirf top-level properties optional karta hai — nested objects still required.',
              fix: 'Deep partial ke liye custom utility type likho ya ts-essentials library use karo.',
            },
          ]}
          proTip="Template literal types TypeScript 4.1 mein aaye — string types manipulate karo: type EventName = \`on\${Capitalize<string>}\`. Mapped types ke saath: type EventHandlers = { [K in keyof State as \`on\${Capitalize<string & K>}Change\`]: (value: State[K]) => void }. Powerful meta-programming!"
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 16 Quiz — TypeScript Basics
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — type-safe code likhna seekho!
          </p>
        </div>
        <QuizSection questions={tsQuiz} chapterSlug="typescript-basics" />
      </div>
    </div>
  )
}
