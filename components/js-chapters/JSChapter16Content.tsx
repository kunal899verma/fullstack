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
          Sunke surprising lagega — TypeScript JavaScript ko kuch bhi naya nahi deta runtime pe! Browser TypeScript nahi samjhta. Node.js TypeScript nahi samjhta. Phir bhi poori duniya TypeScript use karti hai — kyun? Kyunki ye ek time machine hai jo future ke bugs aaj dikhata hai!
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Socho — tumne ek function likha getUser(id). Kisi ne call kiya getUser(null). Production mein crash! TypeScript hota toh compile time pe hi error — "Argument of type 'null' is not assignable to parameter of type 'string'." Ab sawaal ye aata hai — "Bhai JavaScript mein toh kaam ho jaata hai bina TypeScript ke?" Haan! Lekin jab codebase bada hota hai, team badi hoti hai — toh types documentation ban jaate hain jo kabhi outdated nahi hoti.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum TypeScript ke core concepts cover karenge — jo aapko day-to-day TypeScript code likhne ke liye chahiye. Ye sirf types add karna nahi hai — ye ek alag mindset hai!
        </p>
      </div>

      <div id="why-typescript">
        <ConceptCard
          title="Kyun TypeScript? — The Case for Types"
          emoji="🛡️"
          difficulty="advanced"
          whatIsIt="Pehle ek surprise dekho: getFullName(null) JavaScript mein silently run karta hai — null.firstName undefined, undefined + ' ' + undefined = 'undefined undefined'. Production mein user ka poora naam 'undefined undefined' dikhega! TypeScript JavaScript mein static type checking add karta hai — ye error compile time pe pakadta hai. Ye compile karta hai plain JavaScript mein — browser/Node.js ko TypeScript run karne ki zaroorat nahi. Types code ki documentation ban jaati hain, IDE autocomplete improve hoti hai, aur bugs deploy hone se pehle pakde jaate hain."
          whenToUse={[
            'Large codebases — multiple developers, long-term maintenance',
            'Public APIs ya libraries — consumers ko types chahiye',
            'Complex data structures — guarantee karo shape sahi hai',
            'Refactoring — type system batata hai kya break hua',
          ]}
          whyUseIt="JavaScript mein undefined is not a function runtime pe crash karta hai — production mein! TypeScript compiler pe catch hota hai — deploy se pehle. Autocomplete se development faster hoti hai — type karo user. aur sab properties dikhti hain, yaad rakhne ki zaroorat nahi. Refactoring safe hoti hai — koi function rename karo, TypeScript sab broken references highlight karta hai. GitHub survey: TypeScript top 5 languages consistently hai aur growing hai."
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
            explanation: 'Under the hood: TypeScript compiler (tsc) code read karta hai, type check karta hai, phir plain JavaScript generate karta hai. Types completely disappear ho jaate hain runtime pe! tsc kaam karta hai sirf compile time pe. Isliye TypeScript "zero runtime overhead" deta hai. strict: true sabse important setting hai — bina iske TypeScript half-baked safety deta hai. Interface se object shape define karo — compiler guarantee karta hai ki sab required properties hain.',
          }}
          realWorldScenario="Ek badi company mein 50+ developers ek codebase pe kaam karte hain. TypeScript ke bina: koi bhi function call karo wrong arguments ke saath — runtime pe pata chale — aur wo runtime production mein hota hai! TypeScript ke saath: wrong call pe IDE seedha red underline — save karte hi pata chalta hai. New developer onboard — function ka type signature dekh ke immediately samajh jaata hai kya pass karna hai."
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
          proTip="Existing JavaScript project mein TypeScript dene ka sahi tarika: allowJs: true karo tsconfig mein — gradually migrate karo. ek ek file .ts mein rename karo. tsc --noEmit se sirf type check karo bina compile kiye — CI mein useful. ESLint + @typescript-eslint ke saath powerful static analysis milta hai. Rule of thumb: strict: true hamesha, any kabhi nahi!"
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)' }}
      >
        <p className="text-sm text-[#FCD34D] font-medium">
          💡 Akshay ka insight: Ab sawaal ye aata hai — types kaise likhte hain? Ek shocking baat: zyada baar tum type likhte hi NAHI — TypeScript khud inference karta hai! Lekin kuch special types hain — unknown, never, literal — inhe zaroor samjho.
        </p>
      </div>

      <div id="basic-types">
        <ConceptCard
          title="TypeScript Types — Complete Guide"
          emoji="🔤"
          difficulty="advanced"
          whatIsIt="Ek surprising experiment karo: let x: any = 'hello'; x.nonexistent.property — TypeScript mein ye compile hota hai! Koi error nahi! Ye any ka danger hai. Ab unknown dekho: let y: unknown = fetchSomeData(); y.name — Error! Type check required first. Ek hi jagah se aaya data — any se kabhi kuch bhi kar sako, unknown se operations se pehle type prove karna padega. TypeScript ke primitive types: string, number, boolean. Special types: any (skip type checking — avoid!), unknown (safe any — use this!), never (impossible), void. Union types se multiple types allow karo. Literal types exact values define karte hain."
          whenToUse={[
            'Function parameters type karne ko',
            'Variables explicitly type karne ko (inference kaafi na ho)',
            'Union types — multiple valid types',
            'Literal types — exact allowed values',
          ]}
          whyUseIt="Types documentation hai jo outdated nahi hoti — code hi spec hai! Readme outdated ho sakta hai, types nahi — compiler enforce karta hai. never type ka ek killer use case: exhaustive switch. Naya Shape type add karo — compiler FORCE karta hai case add karo warna compile error. unknown pe operations karne se pehle type narrow karna mandatory — safe. Tuple exact shape define karta hai — index 0 hamesha string, index 1 number."
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
            explanation: 'Type inference trace karo: let score = 100 — TypeScript automatically infer karta hai: number type. Annotation likhne ki zaroorat nahi! Lekin function parameters mein inference nahi hoti — wahan likhna padega. unknown ka narrowing dekhno: typeof y === "string" check ke baad — us if block ke andar TypeScript jaanta hai y string hai. Isliye y.toUpperCase() allowed hai. Bahar allowed nahi! Ye hai type narrowing — static analysis se runtime behavior predict karna.',
          }}
          realWorldScenario="API response type karo: type ApiResponse<T> = { data: T; status: 200 | 201; } | { error: string; status: 400 | 401 | 500 }. Caller response check kare — TypeScript force karta hai error case handle karo nahi toh compile error. Runtime pe 'undefined is not a function' waali problem hamesha ke liye khatam!"
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
          proTip="Ek sticky rule: any kabhi use mat karo. Jab bhi any likhne ka mann kare — sochoo kya unknown + type narrowing se solve ho sakta hai? Ya proper interface se? as Type assertion ka use karo sirf last resort mein. satisfies operator TypeScript 4.9 mein aaya — object ko type match karo lekin inferred type preserve karo. Interview mein poochha jaaye toh: any aur unknown mein fark — ye perfect jawab hai!"
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}
      >
        <p className="text-sm text-[#6EE7B7] font-medium">
          💡 Akshay ka insight: Interface vs Type — ye TypeScript ka sabse poochha jaane wala interview question hai! Dono almost same hain, lekin 2 key differences hain. Inhe ek baar clearly samjho — aur phir kabhi confuse nahi hoge.
        </p>
      </div>

      <div id="interfaces-types">
        <ConceptCard
          title="Interfaces vs Types — Kab Kaunsa?"
          emoji="📋"
          difficulty="advanced"
          whatIsIt="Interview mein seedha poochha jaata hai: 'Interface aur Type mein kya fark hai?' Dono se object shape define ho jaati hai — Point { x: number; y: number } — koi fark nahi. Lekin interface ek special power hai: Declaration Merging! Ek hi interface naam se do baar declare karo — merge ho jaate hain. Ye third-party types augment karne ke liye kaam aata hai — Express ke Request pe apna user property add karo. Type ye nahi kar sakta. Type ki special power: union types, tuple types, conditional types, mapped types — ye sab sirf type se possible hain."
          whenToUse={[
            'Object shapes — interface prefer karo (convention)',
            'Union types — sirf type se possible',
            'Tuple types — sirf type se',
            'Library types extend karna — interface declaration merging',
          ]}
          whyUseIt="Interface extend se type hierarchy banana readable aur maintainable hai — AdminUser extends User. Declaration merging se third-party types augment kar sakte ho — Window interface pe custom property add karo bina original file change kiye! Type zyada flexible hai — union types (string | number), conditional types, mapped types — ye sab type se. Simple objects ke liye — convention hai interface. Complex transformations ke liye — type."
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
            explanation: 'Step by step socho: Express mein req.user use karna hai. Express ke types mein user property nahi hai. Interface declaration merging use karo: interface Request { user?: AuthenticatedUser } declare karo — ab TypeScript req.user samjhega. Type se ye possible nahi. Discriminated unions ka example: type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number } — switch (shape.kind) pe TypeScript automatically type narrow karta hai. Most cases mein dono equivalent hain — codebase mein consistent raho.',
          }}
          realWorldScenario="Express.js Request type augment karna: interface Request { user?: AuthenticatedUser } — declare globally toh req.user TypeScript samjhega. Authentication middleware ke baad req.user se user ka data access karo, TypeScript errors nahi dega. Library types modify karne ki zaroorat — sirf Interface se possible. Ye real production code mein bahut kaam aata hai!"
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
          proTip="Discriminated unions TypeScript ki superpower hai — ye pattern memorize karo! type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; side: number }. switch (shape.kind) pe TypeScript automatically type narrow karta hai — each case mein correct properties available. Exhaustive checks bhi kaam karti hain. Redux action types, API response variants — sab isi pattern se type karo."
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)' }}
      >
        <p className="text-sm text-[#93C5FD] font-medium">
          💡 Akshay ka insight: Generics pehle dekhke confusing lagti hain — ye T, K, V kya hai? Ek simple way socho: T ek "placeholder type" hai. Function call karte waqt tum decide karte ho T kya hoga. Array&lt;string&gt; mein T = string. Promise&lt;User&gt; mein T = User. Bas itna hai!
        </p>
      </div>

      <div id="generics">
        <ConceptCard
          title="Generics — Type-Safe Reusability"
          emoji="🔬"
          difficulty="advanced"
          whatIsIt="Socho ek box — box mein kuch bhi rakh sakte ho. Lekin ek baar rakh diya toh wahi type milegi wापस. Box&lt;string&gt; mein string rakha — string milega. Box&lt;number&gt; mein number rakha — number milega. Yahi hai Generic! Generics type parameters hain — T, K, V jaise placeholder types jo caller specify karta hai. Array&lt;T&gt;, Promise&lt;T&gt;, useState&lt;T&gt; — sab generics use karte hain. Constraints se T ko specific types tak limit karo. Generic functions kisi bhi type ke saath kaam karte hain type safety maintain karte hue."
          whenToUse={[
            'Functions jo kisi bhi type ke saath kaam kare — utility functions',
            'Data structures — collections, queues, stacks',
            'API wrappers — response type generic',
            'React hooks — useState, useRef, useCallback',
          ]}
          whyUseIt="Generics any ki jagah type-safe polymorphism dete hain. Bina generics ke first([1,2,3]) ka return type any hoga — unsafe! Generics se return type automatically number | undefined hoga. Constraints ensure karte hain T zaroor certain properties rakhe — T extends { name: string } matlab T mein name hona chahiye. Inference se caller usually generics explicitly specify nahi karte — TypeScript figure out karta hai. Yahi magic hai!"
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
            explanation: 'Trace karo getProperty(user, "name"): TypeScript infer karta hai T = typeof user (User type), K = "name" (keyof User). Return type T[K] = User["name"] = string. Automatically! Manually kuch specify nahi kiya. Ab getProperty(user, "phone") — TypeScript error dega kyunki "phone" keyof User mein nahi hai! Ye compile-time safety generics ki real power hai. any se ye possible nahi hota.',
          }}
          realWorldScenario="Custom useAsync hook: function useAsync&lt;T&gt;(asyncFn: () =&gt; Promise&lt;T&gt;) — caller specify karta hai return type. const { data, loading, error } = useAsync&lt;User&gt;(() =&gt; fetchUser(id)). data automatically User type ka hai — no casting needed, no any. Ek generic hook, infinite use cases!"
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
          proTip="infer keyword — TypeScript ka hidden gem! type Awaited&lt;T&gt; = T extends Promise&lt;infer U&gt; ? Awaited&lt;U&gt; : T — iska matlab: agar T Promise hai toh us Promise ke andar wala type nikalo. ReturnType&lt;T&gt;, Parameters&lt;T&gt;, InstanceType&lt;T&gt; — sab built-in utility types generics aur infer use karte hain. Initially complex lagta hai — lekin ek baar samjha toh TypeScript ka sabse powerful tool ban jaata hai!"
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
      >
        <p className="text-sm text-[#FCA5A5] font-medium">
          💡 Akshay ka insight: Utility types TypeScript ka ready-made toolkit hai — Partial, Omit, Pick, Record — ye aapko daily kaam aayenge. Ek User type banao — baaki sab derive karo. DRY principle types ke liye!
        </p>
      </div>

      <div id="utility-types">
        <ConceptCard
          title="Utility Types — TypeScript Ka Toolkit"
          emoji="🛠️"
          difficulty="advanced"
          whatIsIt="Socho User interface hai — ab API mein password field return nahi karna, update API mein id aur createdAt accept nahi karni. Kya alag-alag types likhoge manually? Nahi! Partial&lt;User&gt; — sab optional. Omit&lt;User, 'password'&gt; — password nikalo. Pick&lt;User, 'id' | 'name'&gt; — sirf ye fields lo. TypeScript built-in utility types hain jo common type transformations provide karte hain. Type manipulation bina repeat kiye — DRY principle types ke liye. Ek base type, infinite derived types!"
          whenToUse={[
            'Update function mein sirf kuch fields — Partial<T>',
            'API response se sensitive fields remove karna — Omit<T, K>',
            'Object type dictionary banana — Record<K, V>',
            'Function return type infer karna — ReturnType<T>',
          ]}
          whyUseIt="Bina utility types ke kya hota: User mein ek field add karo — manually har derived type update karo. Bhool gaye toh bug! Utility types se sab automatically update hote hain. Omit&lt;User, 'password'&gt; — ab User mein koi bhi field badlo, UserWithoutPassword automatically update. DRY — Don't Repeat Yourself — types ke liye. Intent clear hoti hai: Partial bolta hai optional update, Omit bolta hai certain fields absent."
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
            explanation: 'Trace karo Partial&lt;User&gt;: internally ye mapped type hai — { [K in keyof User]?: User[K] }. Har property optional ho jaati hai. Omit internally Exclude aur mapped types use karta hai. Record&lt;K, V&gt; — K ke har value ke liye V type ka property. ReturnType&lt;typeof fn&gt; — typeof se function ka type lo, ReturnType se return type extract karo. Ye patterns samajhne ke baad khud bhi utility types bana sakte ho!',
          }}
          realWorldScenario="Real API design: POST /users accept karta hai Omit&lt;User, 'id' | 'createdAt'&gt; — ye server generate karta hai. PATCH /users/:id accept karta hai Partial&lt;Omit&lt;User, 'id' | 'createdAt'&gt;&gt; — sirf jo fields update karne ho. Same User base type se sab derive — User mein role field add karo, automatically sab derived types mein aayega!"
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
          proTip="Ye 5 utility types daily kaam aate hain — yaad rakho: Partial (sab optional), Required (sab required), Pick (kuch lo), Omit (kuch hatao), Record (typed dictionary). Template literal types TypeScript 4.1 mein aaye — string types manipulate karo: type EventName = `on${Capitalize&lt;string&gt;}`. Ye advanced feature hai — pehle basics master karo!"
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
