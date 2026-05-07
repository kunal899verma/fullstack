'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const tsChapter2Quiz: QuizQuestion[] = [
  {
    question: 'String array ka correct TypeScript annotation kaunsa hai?',
    options: [
      { text: 'string[]', correct: true, explanation: 'Bilkul sahi! string[] ya Array<string> dono valid hain — string[] zyada common aur concise hai.' },
      { text: 'Array(string)', correct: false, explanation: 'Ye valid TypeScript syntax nahi hai. string[] ya Array<string> use karo.' },
      { text: '[string]', correct: false, explanation: '[string] ek element wala tuple hai — array nahi. Array ke liye string[] likho.' },
      { text: 'strings', correct: false, explanation: 'strings TypeScript mein valid type nahi hai. string[] likhna padega.' },
    ],
  },
  {
    question: 'TypeScript enum mein by default values kya hoti hain?',
    options: [
      { text: 'String values — "NORTH", "SOUTH", etc.', correct: false, explanation: 'Numeric enum mein by default numbers hote hain — 0, 1, 2... String enum mein explicitly values assign karni padti hain.' },
      { text: 'Numeric values — 0, 1, 2, 3...', correct: true, explanation: 'Sahi! Numeric enum mein pehla value 0 hota hai, phir automatically increment hota hai. Explicitly change kar sakte ho.' },
      { text: 'Boolean values — true/false', correct: false, explanation: 'Boolean enum nahi hota TypeScript mein. Numeric ya String enums use karo.' },
      { text: 'Koi value nahi — sirf names hote hain', correct: false, explanation: 'Enum members ko hamesha value milti hai — by default numeric (0, 1, 2...).' },
    ],
  },
  {
    question: 'unknown aur any mein kya fark hai TypeScript mein?',
    options: [
      { text: 'Dono exactly same hain', correct: false, explanation: 'Bahut important fark hai! unknown type-safe hai, any nahi.' },
      { text: 'unknown type check ke baad use ho sakta hai; any kisi bhi operation allow karta hai', correct: true, explanation: 'Sahi! unknown pe koi operation karne se pehle type narrow karo — typeof, instanceof check karo. any pe koi restriction nahi — type safety khatam.' },
      { text: 'any sirf numbers ke liye hai', correct: false, explanation: 'any kisi bhi type ke liye hai — par use avoid karo. unknown safer alternative hai.' },
      { text: 'unknown sirf functions mein use hota hai', correct: false, explanation: 'unknown kisi bhi variable, parameter, return type mein use ho sakta hai.' },
    ],
  },
  {
    question: 'never type ka use case kya hai?',
    options: [
      { text: 'Variables jo kabhi define nahi honge', correct: false, explanation: 'never impossible type represent karta hai — jaise function jo kabhi return nahi karta ya exhaustive checks.' },
      { text: 'Functions jo hamesha error throw karein ya infinite loop mein ho', correct: true, explanation: 'Sahi! never se bolta hai function kabhi normally return nahi karta. Switch exhaustive checks mein bhi use hota hai — missing case pe compile error.' },
      { text: 'Empty arrays ke liye', correct: false, explanation: 'Empty array ka type never[] hoga, lekin never ka main use control flow analysis mein hai.' },
      { text: 'Optional function parameters ke liye', correct: false, explanation: 'Optional parameters ke liye ? use karo — param?: string. never alag cheez hai.' },
    ],
  },
  {
    question: 'TypeScript mein type inference kya hai?',
    options: [
      { text: 'TypeScript automatically types figure out karta hai bina annotation ke', correct: true, explanation: 'Bilkul! let x = 42 — TypeScript infer karta hai x ka type number hai. Har jagah annotation likhne ki zaroorat nahi.' },
      { text: 'Types manually define karne padte hain hamesha', correct: false, explanation: 'Type inference se bahut baar manual annotation zaroorat nahi padti — TypeScript figure out kar leta hai.' },
      { text: 'Inference sirf primitives pe kaam karta hai', correct: false, explanation: 'Inference complex objects, arrays, function return types pe bhi kaam karta hai.' },
      { text: 'Inference use karna bad practice hai', correct: false, explanation: 'Inference encourage kiya jata hai — simple variables mein annotation redundant aur verbose hota hai.' },
    ],
  },
]

export default function TSChapter2Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(49,120,198,0.06)',
          border: '1px solid rgba(49,120,198,0.25)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Basic Types — TypeScript Ka Type System Samjho
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          TypeScript ka type system bahut rich aur expressive hai. Primitive types (string, number, boolean) se lekar special types (any, unknown, never, void) tak — har cheez ka apna use case hai. Is chapter mein hum TypeScript ke sab important types cover karenge: primitive types, arrays, tuples, enums, aur woh special types jo TypeScript ko itna powerful banate hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ek important cheez: TypeScript bahut smart inference karta hai — har jagah type likhna zaroorat nahi. Jahan inference fail ho ya clarity chahiye wahan explicit types likho.
        </p>
      </div>

      <div id="primitive-types">
        <ConceptCard
          title="Primitive Types — string, number, boolean"
          emoji="🔤"
          difficulty="beginner"
          whatIsIt="TypeScript ke core primitive types hain: string (text values), number (integers aur decimals dono — JavaScript sirf ek number type rakhta hai), boolean (true/false), null (intentionally empty), aur undefined (value assign nahi hui). Type inference se TypeScript aksar automatically type figure out kar leta hai — explicit annotation har jagah zaroorat nahi."
          whenToUse={[
            'Function parameters — hamesha annotate karo',
            'Function return types — clarity ke liye',
            'Variables jahan inference wrong ya ambiguous ho',
            'Class properties — hamesha declare karo',
          ]}
          whyUseIt="Primitive types se code self-documenting ho jaata hai. function add(a: number, b: number): number likhte hi documentation ready. Caller galat type pass kare toh compile error. IDE autocomplete bhi better kaam karta hai — string methods suggest hote hain string pe, number methods number pe."
          howToUse={{
            filename: 'primitive-types.ts',
            language: 'typescript',
            code: `// ── EXPLICIT TYPE ANNOTATIONS ─────────────────────────────────
let name: string = 'Rahul Sharma'
let age: number = 25
let isActive: boolean = true
let nothing: null = null
let notSet: undefined = undefined

// ── TYPE INFERENCE — annotation zaroorat nahi ─────────────────
let city = 'Mumbai'         // TypeScript infers: string
let score = 95.5            // TypeScript infers: number
let loggedIn = true         // TypeScript infers: boolean

// Try karo — IDE mein hover karo city pe: string dikha!

// ── WHAT HAPPENS WITH WRONG TYPES ────────────────────────────
let userName: string = 'Priya'
// userName = 42          // TS Error: number is not assignable to string
// userName = true        // TS Error: boolean is not assignable to string

// ── NUMBER DETAILS ────────────────────────────────────────────
let integer: number = 42
let decimal: number = 3.14
let negative: number = -100
let hex: number = 0xFF       // 255
let binary: number = 0b1010  // 10

// NaN aur Infinity bhi number hain!
let notANumber: number = NaN
let infinity: number = Infinity

// ── STRING TEMPLATE LITERALS ──────────────────────────────────
let firstName: string = 'Rahul'
let lastName: string = 'Sharma'
let fullName: string = \`\${firstName} \${lastName}\`  // 'Rahul Sharma'

// ── BOOLEAN USE CASES ─────────────────────────────────────────
function isAdult(age: number): boolean {
  return age >= 18
}

const adult: boolean = isAdult(20)  // true
const minor: boolean = isAdult(15)  // false

// ── NULL & UNDEFINED ──────────────────────────────────────────
// strict: true ke saath null aur undefined alag types hain
function findUser(id: string): string | null {
  if (id === '123') return 'Rahul'
  return null  // Not found
}

const user = findUser('123')  // string | null
// user.toUpperCase()          // TS Error! user might be null
if (user !== null) {
  user.toUpperCase()           // ✅ Safe — narrowed to string
}`,
            explanation: 'Type inference use karo simple variables mein — let city = "Mumbai" pe string annotation redundant hai. Function parameters aur return types mein explicit annotation likho — yahan inference help nahi karta. null | string union se force karo caller null check kare.',
          }}
          realWorldScenario="Form validation function: function validateEmail(email: string): boolean. Caller ko pata hai string pass karna hai aur boolean milega. Agar number pass karne ki koshish karo toh compile error. Runtime pe no surprise — type contract clear hai."
          commonMistakes={[
            {
              mistake: 'let x: number = 42 — redundant annotation',
              why: 'TypeScript already infer karta hai — extra typing sirf noise hai.',
              fix: 'let x = 42 — inference pe rely karo. Annotation sirf jab inference wrong ya ambiguous ho.',
            },
            {
              mistake: 'Number() aur number type confuse karna',
              why: 'number (lowercase) type hai. Number (uppercase) built-in constructor object hai — type ke liye nahi use karo.',
              fix: 'Type annotations mein hamesha lowercase: string, number, boolean. Uppercase wale constructors hain.',
            },
          ]}
          proTip="TypeScript mein template literal types bhi hain — string types precisely control karo: type Greeting = \`Hello, \${string}!\` — yahan koi bhi string interpolate ho sakti hai. Ya specific combinations: type EventName = \`on\${'Click' | 'Focus' | 'Blur'}\` — sirf 'onClick', 'onFocus', 'onBlur' valid honge."
        />
      </div>

      <div id="arrays-tuples">
        <ConceptCard
          title="Arrays & Tuples — Ordered Collections"
          emoji="📦"
          difficulty="beginner"
          whatIsIt="Arrays same type ke multiple values store karte hain — string[], number[], CustomType[]. Tuples fixed-length arrays hain jahan har position ka type predetermined hota hai — [string, number] matlab index 0 hamesha string, index 1 hamesha number. Tuples se precise data shapes model karo."
          whenToUse={[
            'Arrays: Same type ki list — users, products, numbers',
            'Tuples: Fixed structure data — coordinates [x, y], key-value pairs [string, number]',
            'Tuples: Function se multiple values return karo — [data, error]',
            'Tuples: CSV rows, database records jahan positions fixed hain',
          ]}
          whyUseIt="string[] se guarantee hai array mein sirf strings honge — koi number, object, null nahi. Tuple [string, number] se guarantee hai exactly do elements honge aur order correct hoga. React ke useState bhi tuple return karta hai — [value, setter]. TypeScript tuple mein destructuring pe bhi correct types milte hain."
          howToUse={{
            filename: 'arrays-tuples.ts',
            language: 'typescript',
            code: `// ── ARRAYS ───────────────────────────────────────────────────
const names: string[] = ['Rahul', 'Priya', 'Amit']
const scores: number[] = [95, 87, 92, 78]
const flags: boolean[] = [true, false, true]

// Generic syntax (same thing, different style)
const items: Array<string> = ['a', 'b', 'c']
const nums: Array<number> = [1, 2, 3]

// Mixed type array — union types
const mixed: (string | number)[] = ['hello', 42, 'world', 100]

// Readonly array — push/pop/splice not allowed
const immutable: readonly string[] = ['fixed', 'values']
// immutable.push('new')   // TS Error: push not on readonly array

// Nested arrays (2D)
const matrix: number[][] = [[1, 2], [3, 4], [5, 6]]

// Array of objects
interface Product {
  id: number
  name: string
  price: number
}
const products: Product[] = [
  { id: 1, name: 'Shirt', price: 500 },
  { id: 2, name: 'Pants', price: 800 },
]

// ── TUPLES ────────────────────────────────────────────────────
// Fixed-length, fixed-type
type Coordinate = [number, number]
type NameAge = [string, number]
type HttpResponse = [number, string]  // [statusCode, message]

const point: Coordinate = [10, 20]
const entry: NameAge = ['Rahul', 25]
const response: HttpResponse = [200, 'OK']

// const wrong: Coordinate = [10, 'twenty']  // TS Error!
// const tooShort: Coordinate = [10]          // TS Error: 2 elements needed

// Tuple destructuring — correct types automatically!
const [x, y] = point           // x: number, y: number
const [name, age] = entry      // name: string, age: number
const [status, msg] = response // status: number, msg: string

// Optional tuple elements
type OptionalTuple = [string, number?]
const t1: OptionalTuple = ['hello']      // OK
const t2: OptionalTuple = ['hello', 42]  // Also OK

// Rest elements in tuples
type StringThenNumbers = [string, ...number[]]
const data: StringThenNumbers = ['label', 1, 2, 3, 4]

// ── REAL PATTERN: Error Handling Tuple ───────────────────────
type Result<T> = [T, null] | [null, Error]

function divide(a: number, b: number): Result<number> {
  if (b === 0) return [null, new Error('Division by zero')]
  return [a / b, null]
}

const [result, error] = divide(10, 2)
if (error) {
  console.error(error.message)
} else {
  console.log(result)  // number — type safe!
}`,
            explanation: 'string[] simplest array type. Tuples exact shape guarantee karte hain — [string, number] exactly 2 elements. Tuple destructuring pe TypeScript sahi types assign karta hai. Result<T> tuple pattern Go language se inspired hai — elegant error handling.',
          }}
          realWorldScenario="React useState hook bhi tuple return karta hai: const [count, setCount] = useState<number>(0). count: number, setCount: Dispatch<SetStateAction<number>>. TypeScript automatically sahi types deta hai — count.toFixed() valid, setCount.toFixed() error. Tuples ka practical real-world use."
          commonMistakes={[
            {
              mistake: 'Tuple mein push karna — tuple nahi raha phir',
              why: 'Tuple type pe push allowed hai TypeScript mein (known bug/limitation). Runtime pe element add ho sakta hai but type system ne catch nahi kiya.',
              fix: 'Readonly tuples use karo: readonly [string, number]. Ab push compile error dega.',
            },
            {
              mistake: '[string, number] aur (string | number)[] confuse karna',
              why: '[string, number] tuple hai — exactly 2 elements, fixed order. (string | number)[] array hai — koi bhi length, any order.',
              fix: 'Fixed structure ke liye tuple. Variable length collection ke liye array. Different use cases hain.',
            },
          ]}
          proTip="Labeled tuple elements TypeScript 4.0+ mein: type Range = [start: number, end: number]. IDE mein hover karne pe start aur end labels dikhte hain — much better documentation. Function rest parameters bhi tuples se type ho sakte hain: function fn(...args: [string, number]) { }."
        />
      </div>

      <div id="enums">
        <ConceptCard
          title="Enums — Named Constants Organized"
          emoji="🏷️"
          difficulty="intermediate"
          whatIsIt="Enum (enumeration) related named constants ka group hai. TypeScript mein 3 types: Numeric enum (default — 0, 1, 2...), String enum (explicit string values), aur Const enum (compile time mein inline ho jaate hain — no runtime object). Enums se magic numbers aur strings avoid karo — meaningful names use karo."
          whenToUse={[
            'Fixed set of related values — directions, status codes, roles',
            'Switch statements ke liye — exhaustive checks ke saath',
            'API response status values',
            'Configuration options jo change nahi hote',
          ]}
          whyUseIt="if (status === 2) ke bajaye if (status === OrderStatus.Shipped) zyada readable hai. Enum values IDEs mein autocomplete hoti hain. Rename karna easy — ek jagah change, sab update. Numeric enums mein TypeScript reverse mapping provide karta hai — value se name mil sakta hai. Const enums performance ke liye."
          howToUse={{
            filename: 'enums.ts',
            language: 'typescript',
            code: `// ── NUMERIC ENUM (Default) ────────────────────────────────────
enum Direction {
  North,  // 0
  South,  // 1
  East,   // 2
  West,   // 3
}

const heading: Direction = Direction.North  // 0
console.log(heading)               // 0
console.log(Direction[0])          // "North" — reverse mapping!

// Custom starting value
enum Priority {
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 10,
}

// ── STRING ENUM ───────────────────────────────────────────────
enum OrderStatus {
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Shipped = 'SHIPPED',
  Delivered = 'DELIVERED',
  Cancelled = 'CANCELLED',
}

function getStatusMessage(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending:    return 'Aapka order receive ho gaya'
    case OrderStatus.Processing: return 'Order process ho raha hai'
    case OrderStatus.Shipped:    return 'Order dispatch ho gaya'
    case OrderStatus.Delivered:  return 'Order deliver ho gaya!'
    case OrderStatus.Cancelled:  return 'Order cancel ho gaya'
  }
}

// ── CONST ENUM — No runtime object (fastest) ─────────────────
const enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

// Compile time mein inline ho jaata hai:
const method: HttpMethod = HttpMethod.GET
// Compiled JS: const method = "GET" — no enum object at runtime!

// ── ENUM IN FUNCTION ──────────────────────────────────────────
enum UserRole {
  Admin = 'admin',
  User = 'user',
  Moderator = 'moderator',
  Guest = 'guest',
}

function canEdit(role: UserRole): boolean {
  return role === UserRole.Admin || role === UserRole.Moderator
}

canEdit(UserRole.Admin)  // true
// canEdit('admin')       // TS Error! String not assignable to UserRole

// ── ALTERNATIVE: UNION TYPE (Modern Approach) ─────────────────
// Many teams prefer union types over enums
type Status = 'pending' | 'active' | 'inactive'
type Role = 'admin' | 'user' | 'moderator'

// String literal union — simpler, no enum overhead
function processStatus(status: Status) {
  if (status === 'pending') { /* ... */ }
}`,
            explanation: 'String enums prefer karo — debugging mein actual string value dikhti hai, number nahi. Const enum performance ke liye. Modern TypeScript mein union types (string literals) often enums replace karte hain — simpler aur no runtime object. Switch pe TypeScript exhaustive check karta hai.',
          }}
          realWorldScenario="Payment gateway integration mein: enum PaymentStatus { Success = 'SUCCESS', Failed = 'FAILED', Pending = 'PENDING', Refunded = 'REFUNDED' }. Database se string aata hai, TypeScript enum se compare karo — typos impossible, autocomplete available, readable code. Webhook handler mein switch(status) pe sab cases handle karo."
          commonMistakes={[
            {
              mistake: 'Numeric enum values directly compare karna (status === 2)',
              why: 'Magic numbers — 2 kya hai kisi ko yaad nahi. Maintainability zero.',
              fix: 'Hamesha enum member use karo: status === OrderStatus.Shipped. String enums isse bhi better — actual string value readable.',
            },
            {
              mistake: 'Enum aur union type dono use karna same codebase mein',
              why: 'Inconsistency — team confused, code review mein debate.',
              fix: 'Ek approach choose karo. Modern TypeScript mein union types trend hai — simpler, no runtime cost. Enums jab reverse mapping ya const enum chahiye.',
            },
          ]}
          proTip="Ambient enums declare karo external values ke liye: declare enum ExternalLibEnum { Value1, Value2 }. Ye sirf type checking ke liye hai — runtime object generate nahi hota. Third-party library ke enums TypeScript mein use karne ka clean way."
        />
      </div>

      <div id="any-unknown">
        <ConceptCard
          title="any vs unknown — Fark Samjho"
          emoji="❓"
          difficulty="intermediate"
          whatIsIt="any TypeScript ka escape hatch hai — type checking completely disable. any type ke value pe koi bhi operation allowed hai. unknown any ka safer version hai — value store kar sakte ho lekin use karne se pehle type check mandatory hai. void function return type hai — kuch return nahi karta. never impossible type — function jo kabhi return nahi karta."
          whenToUse={[
            'any: Kabhi nahi prefer — legacy code migrate karte waqt temporary',
            'unknown: Bahar se aaya data — API responses, user input, JSON.parse results',
            'void: Functions jo sirf side effects karte hain (console.log, addEventListener)',
            'never: Throw-only functions, exhaustive switch checks',
          ]}
          whyUseIt="any use karne se TypeScript benefits khatam ho jaate hain. unknown pe operations force karta hai type check pehle — runtime errors prevent hote hain. never se switch statements exhaustive hote hain — agar koi case miss ho toh compile error. void clearly communicate karta hai function kuch return nahi karta."
          howToUse={{
            filename: 'any-unknown-never-void.ts',
            language: 'typescript',
            code: `// ── ANY — Avoid Karo! ────────────────────────────────────────
let dangerous: any = 'hello'
dangerous = 42         // OK
dangerous = true       // OK
dangerous.nonexistent  // OK — NO ERROR! But will crash at runtime
dangerous()            // OK — NO ERROR! But will crash at runtime

// any ek "I give up" sign hai — TypeScript ki value zero

// ── UNKNOWN — Safe Alternative ────────────────────────────────
let safe: unknown = fetchDataFromAPI()  // Could be anything

// safe.name          // TS Error! Can't access on unknown
// safe.toUpperCase() // TS Error! Can't call methods on unknown

// Type narrowing required — check karo phir use karo
if (typeof safe === 'string') {
  safe.toUpperCase()   // ✅ Safe — narrowed to string
}

if (typeof safe === 'number') {
  safe.toFixed(2)      // ✅ Safe — narrowed to number
}

if (safe !== null && typeof safe === 'object' && 'name' in safe) {
  const name = (safe as { name: string }).name  // Type assertion
}

// JSON.parse returns any — cast to unknown first
const rawData: unknown = JSON.parse('{"name": "Rahul", "age": 25}')

// ── VOID — No Return Value ────────────────────────────────────
function logMessage(msg: string): void {
  console.log(msg)
  // return undefined  // OK
  // return 'something' // TS Error! void function can't return value
}

// Arrow function void
const printName = (name: string): void => {
  console.log(name)
}

// ── NEVER — Impossible Type ───────────────────────────────────

// Function jo kabhi return nahi karta
function throwError(message: string): never {
  throw new Error(message)
  // Code after throw is unreachable
}

function infiniteLoop(): never {
  while (true) { /* runs forever */ }
}

// Exhaustive switch — never ka real power!
type Shape = 'circle' | 'square' | 'triangle'

function getArea(shape: Shape): number {
  switch (shape) {
    case 'circle':   return Math.PI * 25
    case 'square':   return 25
    case 'triangle': return 12.5
    default:
      // 'rectangle' add karo Shape mein — ye line error degi!
      const _exhaustive: never = shape
      throw new Error(\`Unhandled shape: \${_exhaustive}\`)
  }
}`,
            explanation: 'unknown safe hai kyunki operations se pehle type check force karta hai. any dangerous hai kyunki koi restriction nahi. never switch mein add karo — nayi Shape case miss karo toh compile error immediate milega. void aur undefined similar hain — subtle fark hai.',
          }}
          realWorldScenario="API response handle karna: const response: unknown = await fetch('/api/data').then(r => r.json()). unknown se force karo proper validation karo. Zod ya io-ts se schema validate karo — phir typed data milega. any use karo toh validation bhool sakte ho — production bugs."
          commonMistakes={[
            {
              mistake: 'any use karna type error "fix" karne ke liye',
              why: 'Type error reveal karta hai real problem — any se hide ho jaata hai. Bug deploy ho jaata hai.',
              fix: 'Type error samjho aur properly fix karo. Unknown + type narrowing, ya correct interface define karo.',
            },
            {
              mistake: 'void aur undefined confuse karna',
              why: 'void means "return value ignore karo." undefined specific value hai. Subtle difference but matters in callbacks.',
              fix: 'Function return type ke liye void use karo (side-effect only functions). undefined type ke liye undefined use karo.',
            },
          ]}
          proTip="satisfies operator (TypeScript 4.9+) powerful hai: const config = { port: 3000, debug: false } satisfies Record<string, unknown>. config.port ka type 3000 (literal) remain karta hai — number nahi. Type check hota hai lekin narrow type preserve hota hai. any ka clean alternative."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 2 Quiz — Basic Types
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — TypeScript types ka knowledge check karo!
          </p>
        </div>
        <QuizSection questions={tsChapter2Quiz} chapterSlug="ts-basic-types" />
      </div>
    </div>
  )
}
