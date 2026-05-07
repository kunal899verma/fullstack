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
          Basic Types — Aur Ek Baat: any Use Karna = TypeScript Ko Off Karna
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          TypeScript ka type system sirf string, number, boolean nahi hai — ye ek poora duniya hai. Aur is duniya mein <span className="text-[#3178C6] font-semibold">any</span> ek gaali hai. Seriously. any use karna matlab TypeScript ko bol raha ho: <em>"bhai, chhod de — mujhe pata hai main kya kar raha hoon."</em> Aur TypeScript maan jaata hai. Type safety zero. Bugs free to roam.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein ek important realization hogi: TypeScript inference bahut smart hai — har jagah type likhna zaroorat nahi hoti. Simple variables mein inference pe rely karo, functions mein explicit likho. Aur jab bahar se data aaye — API response, user input — toh <strong className="text-[#F5F5F7]">unknown</strong> use karo, any nahi. Kyun? Woh aage samjhenge.
        </p>
      </div>

      <div id="primitive-types">
        <ConceptCard
          title="Primitive Types — string, number, boolean"
          emoji="🔤"
          difficulty="beginner"
          whatIsIt="Under the hood samajhte hain — TypeScript ke core primitive types: string (text values), number (integers aur decimals dono — JavaScript mein sirf ek number type hai, no int/float), boolean (true/false), null (intentionally khaali), undefined (value assign nahi hui). Interesting fact: TypeScript compiler in types ko compile time pe check karta hai aur phir JavaScript generate karte waqt ERASE kar deta hai. Runtime pe sirf plain JS chalta hai — types exist nahi karte."
          whenToUse={[
            'Function parameters — hamesha annotate karo',
            'Function return types — clarity ke liye',
            'Variables jahan inference wrong ya ambiguous ho',
            'Class properties — hamesha declare karo',
          ]}
          whyUseIt="Ek real sawaal: function add(a, b) — IDE mein a pe kya methods dikhenge? Kuch nahi. Koi guarantee nahi a number hai. Ab function add(a: number, b: number): number — IDE pe a. type karo, number ke saare methods dikhenge: toFixed, toString, toPrecision. Code likhne ki speed 2x ho jaati hai. Aur galat type pass karo — compile time error, not runtime crash."
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
            explanation: 'Inference vs explicit — ek simple rule: let city = "Mumbai" pe string annotation mat likho, TypeScript already jaanta hai. But function parameters pe hamesha likho — yahan TypeScript guess nahi kar sakta. Aur dekho: findUser function string | null return karta hai — caller ko force karo null check karo pehle. Ye TypeScript ka sabse powerful feature hai.',
          }}
          realWorldScenario="Login form validation sochte hain: function validateEmail(email: string): boolean — caller ko ek hi contract samajhna hai: string do, boolean lo. Koi number pass karne ki koshish karo — IDE seedha red line dikhata hai. Yahi TypeScript ka kaam hai: contract enforce karna. Runtime pe surprise nahi, development mein hi sab clear."
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
          proTip="Ek advanced trick — template literal types: type EventName = \`on\${'Click' | 'Focus' | 'Blur'}\` — sirf 'onClick', 'onFocus', 'onBlur' valid honge. Galat spell karo toh compile error. Ye TypeScript ka string-level type safety hai — bahut powerful, bahut underused. Explore karo."
        />
      </div>

      <div id="arrays-tuples">
        <ConceptCard
          title="Arrays & Tuples — Ordered Collections"
          emoji="📦"
          difficulty="beginner"
          whatIsIt="Arrays aur tuples dono ordered collections hain — lekin unka use case alag hai. Arrays same type ke multiple values ke liye — string[], number[]. Tuples fixed-length, fixed-order arrays hain — [string, number] matlab index 0 HAMESHA string, index 1 HAMESHA number. Aur interesting baat — React ka useState hook bhi ek tuple return karta hai: [value, setter]. Tum roz use karte ho tuples bina jaane."
          whenToUse={[
            'Arrays: Same type ki list — users, products, numbers',
            'Tuples: Fixed structure data — coordinates [x, y], key-value pairs [string, number]',
            'Tuples: Function se multiple values return karo — [data, error]',
            'Tuples: CSV rows, database records jahan positions fixed hain',
          ]}
          whyUseIt="Sawaal: bina TypeScript ke array kya hoti hai? Any ka collection — kuch bhi andar aa sakta hai. string[] se TypeScript guarantee deta hai — sirf strings, koi number ghusta nahi, koi null nahi. Aur tuple [string, number] destructuring pe automatically correct types milte hain — const [name, age] = entry mein name: string aur age: number, TypeScript ne infer kar liya. Zero extra annotation."
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
            explanation: 'Ek pattern note karo: Result<T> tuple — [T, null] | [null, Error]. Ye Go language se inspired hai. Koi function throw nahi karta, result tuple return karta hai. Caller ko force karo check karo — agar error hai toh handle karo, agar result hai toh use karo. TypeScript ensure karta hai dono cases cover hoon.',
          }}
          realWorldScenario="React useState hook ke andar dekho — const [count, setCount] = useState(0). count: number, setCount: Dispatch. TypeScript ne automatically infer kiya — count pe number methods valid hain, setCount pe nahi. Yahi hai tuples ka real-world use — aur tum daily use karte ho without knowing it."
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
          proTip="Labeled tuples TypeScript 4.0+ mein: type Range = [start: number, end: number]. IDE mein hover karo toh start aur end labels dikhte hain — anonymous [number, number] se zyada readable. Aur ek level upar: readonly [string, number] use karo agar tuple change nahi hona chahiye — accidental mutation compile time pe pakad jaata hai."
        />
      </div>

      <div id="enums">
        <ConceptCard
          title="Enums — Named Constants Organized"
          emoji="🏷️"
          difficulty="intermediate"
          whatIsIt="Enum ka concept samajhne ke liye pehle problem samajhte hain: agar code mein if (status === 2) likha ho — ye 2 kya hai? Shipped? Cancelled? Koi nahi jaanta 6 mahine baad. Enum is magic number problem ko solve karta hai — if (status === OrderStatus.Shipped) zyada readable, zyada safe. TypeScript mein 3 types: Numeric (default — 0, 1, 2), String (explicit string values — prefer this), Const enum (compile time inline — fastest)."
          whenToUse={[
            'Fixed set of related values — directions, status codes, roles',
            'Switch statements ke liye — exhaustive checks ke saath',
            'API response status values',
            'Configuration options jo change nahi hote',
          ]}
          whyUseIt="Ek practical point: tum payment gateway ka code likhte ho aur status === 'SUCESS' type karte ho — typo hai, 'SUCCESS' hona chahiye tha. JavaScript mein: silent bug, wrong condition, production issue. String enum use karo: OrderStatus.Success se kabhi typo nahi hoga — IDE autocomplete karta hai. Rename karna ho toh ek jagah change karo — poori codebase update."
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
            explanation: 'Code mein dekho: canEdit(UserRole.Admin) — sahi. canEdit("admin") — compile error. TypeScript string ko enum ke liye accept nahi karta, explicit enum use karna padega. Const enum aur regular enum mein ek key fark: const enum compile time pe inline hota hai — const method = HttpMethod.GET compiled JS mein const method = "GET" ban jaata hai. Zero runtime object.',
          }}
          realWorldScenario="Payment webhook handler likhte hain — Razorpay se event aata hai, status check karo. enum PaymentStatus { Success = 'SUCCESS', Failed = 'FAILED', Refunded = 'REFUNDED' } — switch statement mein TypeScript exhaustive check karta hai. Nayi status add karo Razorpay ke saath, switch mein miss karo — compile error. Missed case kabhi production mein nahi jaata."
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
          proTip="Modern TypeScript mein union types enums replace kar rahe hain: type Status = 'pending' | 'active' | 'inactive'. Simple, no runtime object, tree-shakable. Enums jab use karo jab reverse mapping chahiye ya const enum performance optimisation. Dono valid hain — team mein ek approach choose karo aur consistent raho."
        />
      </div>

      <div id="any-unknown">
        <ConceptCard
          title="any vs unknown — Fark Samjho"
          emoji="❓"
          difficulty="intermediate"
          whatIsIt="Ye section dhyan se padho — bahut log TypeScript seekhte hain aur any pe stuck ho jaate hain. any TypeScript ka 'I give up' button hai — type checking completely off. Seedha bolun: any use karna matlab TypeScript ko bol raha ho 'bhai, chhod de — mujhe pata hai main kya kar raha hoon.' Aur TypeScript maan jaata hai. Saari safety gone. unknown zyada honest hai — value store kar sakte ho, lekin use karne se pehle TypeScript bolega: 'pehle check karo ye kya hai, phir use karo.' Yahi fark hai any aur unknown mein."
          whenToUse={[
            'any: Kabhi nahi prefer — legacy code migrate karte waqt temporary',
            'unknown: Bahar se aaya data — API responses, user input, JSON.parse results',
            'void: Functions jo sirf side effects karte hain (console.log, addEventListener)',
            'never: Throw-only functions, exhaustive switch checks',
          ]}
          whyUseIt="Ek sawaal: agar any everywhere use karo toh TypeScript ki zaroorat kya? Bilkul sahi — any = TypeScript uninstall karna. Isiliye any ko 'code smell' mante hain experienced developers. unknown safe alternative hai — API se jo bhi data aaye, unknown rakho, phir validate karo, phir use karo. never ek powerful tool hai switch statements ke liye — nayi case add karo aur handle karna bhool jao, compile error immediate milega."
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
            explanation: 'Code mein dekho: dangerous pe nonexistent property access — koi error nahi (any). safe pe same karo — immediate error (unknown). Yahi real fark hai. Aur never ka exhaustive switch trick — _exhaustive: never = shape — agar Shape mein nayi value add karo aur switch handle nahi karo, TypeScript bol dega compile time pe. Production mai kabhi unhandled case nahi jaata.',
          }}
          realWorldScenario="Third-party API call karo — koi guarantee nahi response ka shape kya hoga. const rawData: unknown = await fetch('/api/user').then(r => r.json()). Unknown rakho, phir Zod se validate karo: const user = UserSchema.parse(rawData). Ab user TypeScript-typed hai. Agar any use karo? No validation, no safety — ek din server response change karo aur app silently break ho jaata hai."
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
          proTip="TypeScript 4.9+ mein satisfies operator aaya — any ka ek aur clean alternative. const config = { port: 3000 } satisfies Record<string, unknown> — type check hota hai lekin config.port ka type 3000 (literal) rehta hai, number wide type nahi. Ek taraf type safety, doosri taraf narrow type preserved. Explore karo — bahut powerful hai."
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
