'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const tsQuiz: QuizQuestion[] = [
  {
    question: 'Conditional type ka correct syntax kaunsa hai?',
    options: [
      { text: 'T if U else X : Y', correct: false, explanation: 'Ye JavaScript if-else hai — TypeScript conditional types alag syntax use karte hain.' },
      { text: 'T extends U ? X : Y', correct: true, explanation: 'Sahi! T extends U check karta hai — agar T assignable hai U ko toh X, warna Y. Ternary operator jaisa hai types ke liye.' },
      { text: 'T instanceof U ? X : Y', correct: false, explanation: 'instanceof runtime value check hai — type-level conditional type ka syntax alag hai.' },
      { text: 'T | U ? X : Y', correct: false, explanation: 'T | U union type hai, conditional type nahi.' },
    ],
  },
  {
    question: 'infer keyword kahan use hota hai?',
    options: [
      { text: 'Variable ki type declare karne ke liye', correct: false, explanation: 'infer type declaration ke liye nahi hai — yeh conditional types ke andar type extract karta hai.' },
      { text: 'Conditional type ke extends clause mein type extract karne ke liye', correct: true, explanation: 'Bilkul! infer R conditional type ke andar pattern match karta hai aur type capture karta hai — ReturnType<T> isi se bana hai.' },
      { text: 'Generic constraint define karne ke liye', correct: false, explanation: 'Constraint ke liye T extends SomeType use karte hain — infer capture ke liye hai.' },
      { text: 'Type assertion ke liye', correct: false, explanation: 'Type assertion ke liye as keyword use hota hai — infer alag hai.' },
    ],
  },
  {
    question: 'Mapped type mein readonly modifier kaise add karte hain?',
    options: [
      { text: '{ [K in keyof T]: readonly T[K] }', correct: false, explanation: 'readonly value pe nahi, property pe lagata hai — syntax thoda alag hai.' },
      { text: '{ readonly [K in keyof T]: T[K] }', correct: true, explanation: 'Sahi! readonly property key ke pehle aata hai. Readonly<T> built-in utility type exactly ye karta hai.' },
      { text: '{ [K in keyof T as readonly K]: T[K] }', correct: false, explanation: 'as clause key remapping ke liye hai — readonly aise nahi lagata.' },
      { text: '{ [K: readonly in keyof T]: T[K] }', correct: false, explanation: 'Ye invalid syntax hai — readonly property ke saamne aata hai, key ke type annotation mein nahi.' },
    ],
  },
  {
    question: 'Discriminated union mein "discriminant" kya hota hai?',
    options: [
      { text: 'Ek optional property', correct: false, explanation: 'Discriminant optional nahi hona chahiye — hamesha present hona chahiye taaki TypeScript narrow kar sake.' },
      { text: 'Ek common literal type property jo union members ko uniquely identify kare', correct: true, explanation: 'Sahi! Jaise kind: "circle" | kind: "square" — TypeScript is literal value se type narrow karta hai automatically.' },
      { text: 'Union ka pehla type', correct: false, explanation: 'Position matter nahi karta — discriminant ek special property hai jo sab members mein hoti hai alag-alag literal value ke saath.' },
      { text: 'TypeScript ka ek built-in keyword', correct: false, explanation: 'Discriminated union ek pattern hai, built-in keyword nahi — aap khud design karte ho ye structure.' },
    ],
  },
  {
    question: 'Template literal type `${string}Id` kya match karega?',
    options: [
      { text: 'Sirf "Id" string', correct: false, explanation: 'Sirf "Id" nahi — `${string}Id` mein koi bhi string pehle aa sakta hai.' },
      { text: 'Koi bhi string jo "Id" se end ho — jaise "userId", "orderId"', correct: true, explanation: 'Bilkul! ${string} koi bhi string hai — toh "userId", "productId", "orderId" sab match honge.' },
      { text: 'Sirf single character + "Id"', correct: false, explanation: 'string template koi bhi length ka string match karta hai — sirf single character nahi.' },
      { text: 'Koi bhi string', correct: false, explanation: '"Id" suffix zaroor chahiye — toh "name" ya "email" match nahi honge.' },
    ],
  },
]

export default function TSChapter7Content() {
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
          Advanced Types — TypeScript Ka Type-Level Programming
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          TypeScript mein types sirf labels nahi hain — ye ek complete PROGRAMMING LANGUAGE hai! Conditional types, mapped types, template literals — ye sab TypeScript ka "type-level code" hai jo compile time pe run hota hai. Matlab tumhara program run hone se pehle hi TypeScript ek alag program chala raha hota hai — types ke upar.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ab sawaal ye aata hai — Partial&lt;T&gt;, Readonly&lt;T&gt;, ReturnType&lt;T&gt; ye utility types TypeScript ne kaise banaye? Koi jaadu nahi hai — ye sab conditional types aur mapped types se bane hain. Is chapter ke baad tum khud same tarah ke utility types bana sakoge. Aur tab samjhoge ki TypeScript type system kitna powerful hai.
        </p>
      </div>

      <div id="conditional-types">
        <ConceptCard
          title="Conditional Types — Type-Level If-Else"
          emoji="🔀"
          difficulty="advanced"
          whatIsIt="Conditional types TypeScript ka if-else hai type level pe — T extends U ? X : Y. Ye code nahi hai, ye ek type-level ternary hai. Compiler dekhta hai: kya T, U ko satisfy karta hai? Haan toh type X, nahi toh type Y. infer keyword toh aur bhi powerful hai — ye conditional type ke andar pattern match karke ek naya type capture kar leta hai. ReturnType, Awaited, Parameters — ye sab TypeScript built-in utilities isi magic se bane hain."
          whenToUse={[
            'Type ko condition ke basis pe transform karna — NonNullable, Extract, Exclude',
            'Generic function se type extract karna — ReturnType, Parameters',
            'Distributive behavior — union types pe ek ek apply karna',
            'infer se nested types extract karna — Promise ke andar ka type',
          ]}
          whyUseIt="Socho — tumhara ek function hai jo string return karta hai kabhi, number kabhi. Caller ko kaise pata chalega? Bina conditional types ke — any likhna padega ya overloads. Conditional types se TypeScript khud deduce karta hai exact return type based on input. infer ke saath toh aur bhi — Promise ke andar kya hai, function ka return type kya hai — sab compile time pe extract ho jaata hai. Ye TypeScript ki real superpower hai jo zyataar log kabhi nahi seekhte."
          howToUse={{
            filename: 'conditional-types.ts',
            language: 'typescript',
            code: `// ── BASIC CONDITIONAL TYPE ──────────────────────────────────────
type IsString<T> = T extends string ? true : false

type A = IsString<string>    // true
type B = IsString<number>    // false
type C = IsString<'hello'>   // true (string literal extends string)

// ── NonNullable — conditional type se banaya ──────────────────
type NonNullable<T> = T extends null | undefined ? never : T

type D = NonNullable<string | null | undefined>  // string
type E = NonNullable<number | null>              // number

// ── infer — TYPE EXTRACT KARO ─────────────────────────────────
// ReturnType khud banana
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never

function greet(name: string): string { return \`Hello \${name}\` }
function add(a: number, b: number): number { return a + b }

type GreetReturn = MyReturnType<typeof greet>  // string
type AddReturn = MyReturnType<typeof add>      // number

// Promise ke andar ka type nikalo
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T

type Resolved = Awaited<Promise<string>>           // string
type NestedResolved = Awaited<Promise<Promise<number>>>  // number

// Array element type
type ElementType<T> = T extends (infer E)[] ? E : never
type NumElem = ElementType<number[]>    // number
type StrElem = ElementType<string[]>    // string

// ── DISTRIBUTIVE CONDITIONAL TYPES ───────────────────────────
// Union pe automatically distribute hota hai
type StringsOnly<T> = T extends string ? T : never

type Mixed = string | number | boolean | null
type OnlyStrings = StringsOnly<Mixed>  // string
// Kaise kaam karta hai: har union member pe apply hota hai:
// StringsOnly<string> | StringsOnly<number> | StringsOnly<boolean> | StringsOnly<null>
// = string | never | never | never = string

// Distributive avoid karna — wrap in tuple
type NonDistributive<T> = [T] extends [string] ? true : false
type F = NonDistributive<string | number>  // false (not distributed)`,
            explanation: 'Ab sawaal ye aata hai — infer R kahan se aaya? Ye ek placeholder hai jo TypeScript compile time pe fill karta hai. Jab T matches hota hai (...args: any[]) => infer R ke saath, TypeScript R ko function ka actual return type se replace kar deta hai. Union types pe ek aur twist hai — conditional types automatically distribute hote hain. [T] extends [U] se distribution rok sakte ho. Ye sab compile time pe hota hai — runtime mein zero cost.',
          }}
          realWorldScenario="Real API client mein socho — fetchApi('user') call karo toh User milna chahiye, fetchApi('product') call karo toh Product. Ek hi function, different return types. type ApiReturn&lt;T extends string&gt; = T extends 'user' ? User : T extends 'product' ? Product : never likhdo — TypeScript caller ko exactly sahi type deta hai. No casting, no any, zero runtime overhead. Ye conditional types ka real power hai."
          commonMistakes={[
            {
              mistake: 'infer ko conditional type ke bahar use karna',
              why: 'infer sirf extends clause ke andar kaam karta hai — warna compile error.',
              fix: 'type Extract<T> = T extends SomeType<infer U> ? U : never — infer hamesha extends ke andar.',
            },
            {
              mistake: 'Distributive behavior unexpected lagta hai',
              why: 'T extends string ? true : false — agar T = string | number, toh boolean milta hai (true | false), single boolean nahi.',
              fix: 'Agar distribution nahi chahiye toh [T] extends [string] ? true : false — tuple mein wrap karo.',
            },
          ]}
          proTip="Conditional types recursive bhi ho sakti hain — DeepReadonly&lt;T&gt;: type DeepReadonly&lt;T&gt; = T extends object ? { readonly [K in keyof T]: DeepReadonly&lt;T[K]&gt; } : T. TypeScript 4.1 se tail-recursive conditional types support hain. Lekin ek warning — bahut deep recursion se TypeScript slow ya crash ho sakta hai. Practical limit rakhna — usually 5-6 levels kaafi hai real world mein."
        />
      </div>

      <div id="mapped-types">
        <ConceptCard
          title="Mapped Types — Object Ko Transform Karo"
          emoji="🗺️"
          difficulty="advanced"
          whatIsIt="Mapped types TypeScript ka for-loop hai types ke liye. { [K in keyof T]: NewType } — ye har property pe iterate karta hai aur naya type banata hai. Ye nahi samjha? Simple karo — Partial&lt;T&gt; likh dete ho, saari properties optional ho jaati hain. Readonly&lt;T&gt; likh dete ho, saari immutable. Ye magic nahi — internally ek mapped type hai jo keyof T se loop karta hai aur ? ya readonly modifier lagata hai. as clause se toh key rename bhi ho jaata hai!"
          whenToUse={[
            'Har property optional banani ho — Partial<T>',
            'Har property readonly banani ho — Readonly<T>',
            'Har property ka type transform karna ho',
            'Key names change karne ho — as clause se remapping',
          ]}
          whyUseIt="Ab sawaal ye aata hai — agar User interface mein 10 fields hain aur mujhe UpdateUserDto banana hai jahan sab optional hain, kya main manually likhun? Nahi! type UpdateUserDto = Partial&lt;User&gt; — ek line. Naya field User mein add karo, automatically UpdateUserDto mein bhi aa jaayega. DRY principle types ke liye. Aur as clause ke saath key remapping — User type se automatically getters generate karo, event handlers generate karo. Ek type se kai derived types, zero duplication."
          howToUse={{
            filename: 'mapped-types.ts',
            language: 'typescript',
            code: `// ── BASIC MAPPED TYPE ────────────────────────────────────────────
interface User {
  id: string
  name: string
  age: number
  email: string
}

// Manually bana hua Partial
type MyPartial<T> = {
  [K in keyof T]?: T[K]
}

// Manually bana hua Readonly
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

type PartialUser = MyPartial<User>
// { id?: string; name?: string; age?: number; email?: string }

type ReadonlyUser = MyReadonly<User>
// { readonly id: string; readonly name: string; ... }

// ── MODIFIER REMOVAL — - se hatao ─────────────────────────────
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]  // readonly hatao
}

type Required<T> = {
  [K in keyof T]-?: T[K]  // optional hatao (required banao)
}

// ── TYPE TRANSFORM ────────────────────────────────────────────
// Har property ko nullable banao
type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

// Har property ko string banao (serialization ke liye)
type Stringified<T> = {
  [K in keyof T]: string
}

// ── KEY REMAPPING — as clause ─────────────────────────────────
// Property names ke saamne "get" lagao
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
}

type UserGetters = Getters<User>
// {
//   getId: () => string
//   getName: () => string
//   getAge: () => number
//   getEmail: () => string
// }

// Event handler type generate karo
type EventHandlers<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}Change\`]: (value: T[K]) => void
}

type FormHandlers = EventHandlers<{ name: string; age: number }>
// { onNameChange: (value: string) => void; onAgeChange: (value: number) => void }

// ── FILTERING with never ───────────────────────────────────────
// Sirf string properties rakhna
type StringProperties<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K]
}

type UserStrings = StringProperties<User>
// { id: string; name: string; email: string } — age (number) filter out`,
            explanation: 'Dekho — [K in keyof T] TypeScript compiler ko bol raha hai: "ek ek key lo is type ki." -? matlab remove optional modifier — Required&lt;T&gt; aise hi bana hai. as clause mein template literal likhdo aur key ka naam badal jaata hai automatically. never se filter — agar key ka type string nahi hai toh us key ko include mat karo. Sab kuch compile time pe, runtime pe kuch nahi.',
          }}
          realWorldScenario="Socho ek form validation library banani hai. type ValidationRules&lt;T&gt; = { [K in keyof T]?: (value: T[K]) => string | null }. Har field ke liye optional validator function — aur field ka type automatically sahi hai! name validator ko string milega, age validator ko number. Form type badla — validation type automatically badle. Alag maintain nahi karna. Ye real-world mapped types ka power hai."
          commonMistakes={[
            {
              mistake: 'keyof T ki jagah string use karna',
              why: 'string se type safety khatam — koi bhi key allowed ho jaati hai.',
              fix: '[K in keyof T] use karo taaki sirf valid keys iterate ho. Type narrowing bhi better hoti hai.',
            },
            {
              mistake: 'as clause mein type error ignore karna',
              why: 'Key type string nahi ho toh Capitalize kaam nahi karta — compile error aata hai.',
              fix: 'string & K use karo taaki string type ensure ho: as `get${Capitalize<string & K>}`.',
            },
          ]}
          proTip="Mapped types aur conditional types ka combination — ye TypeScript ka most powerful feature hai. type DeepPartial&lt;T&gt; = { [K in keyof T]?: T[K] extends object ? DeepPartial&lt;T[K]&gt; : T[K] }. Ye recursive mapped type hai — nested objects bhi sab optional ho jaate hain. Partial sirf top-level karta hai, DeepPartial poora nested tree. Nested forms update karne ke liye ek game changer."
        />
      </div>

      <div id="template-literal-types">
        <ConceptCard
          title="Template Literal Types — String Types Construct Karo"
          emoji="📝"
          difficulty="advanced"
          whatIsIt="Template literal types — ye TypeScript ka woh feature hai jo dekh ke pehle reaction hota hai 'ye kya hai?' TypeScript 4.1 mein aaya. Tum string pattern likh sakte ho type mein — \`user_\${string}\` matlab koi bhi string jo 'user_' se start ho. Aur union ke saath? Cartesian product! 'margin' | 'padding' aur 'top' | 'left' | 'right' | 'bottom' dono combine karo — 8 valid CSS properties automatically generate ho jaati hain. Manually likhne ki zaroorat nahi."
          whenToUse={[
            'Event names type karne ke liye — "click", "mousedown", etc.',
            'CSS property names — margin-top, padding-left',
            'API endpoint patterns — /api/users/:id',
            'Getter/setter method names generate karna',
          ]}
          whyUseIt="'onClick' likhna tha, 'onClik' likh diya — runtime error. Template literal type hota toh 'onClik' pe compile error aata. Magic strings TypeScript ki dushman hain — template literal types unhe type-safe banate hain. Aur ek baat — IDE autocomplete bhi milta hai string values ke liye! 'on' likhao toh 'onClick', 'onFocus', 'onBlur' sab suggest ho jaate hain. Ye developer experience ka next level hai."
          howToUse={{
            filename: 'template-literal-types.ts',
            language: 'typescript',
            code: `// ── BASIC TEMPLATE LITERAL TYPES ────────────────────────────────
type Greeting = \`Hello, \${string}!\`
// koi bhi: "Hello, World!", "Hello, Rahul!", etc.

type UserId = \`user_\${string}\`
type OrderId = \`order_\${number}\`

const uid: UserId = 'user_abc123'   // OK
const oid: OrderId = 'order_42'    // OK
// const bad: UserId = 'usr_123'   // Error! 'user_' prefix required

// ── UNION COMBINATIONS ────────────────────────────────────────
type Direction = 'top' | 'right' | 'bottom' | 'left'
type Property = 'margin' | 'padding'

// Cartesian product — sab combinations auto-generate!
type CSSSpacing = \`\${Property}-\${Direction}\`
// 'margin-top' | 'margin-right' | 'margin-bottom' | 'margin-left'
// 'padding-top' | 'padding-right' | 'padding-bottom' | 'padding-left'

type EventName<T extends string> = \`on\${Capitalize<T>}\`
type ClickEvent = EventName<'click'>    // 'onClick'
type FocusEvent = EventName<'focus'>    // 'onFocus'

// ── DOM EVENT PATTERNS ────────────────────────────────────────
type HTMLEvents = 'click' | 'focus' | 'blur' | 'change' | 'submit'
type EventHandlerName = \`on\${Capitalize<HTMLEvents>}\`
// 'onClick' | 'onFocus' | 'onBlur' | 'onChange' | 'onSubmit'

// ── INTRINSIC STRING MANIPULATION TYPES ───────────────────────
type Up = Uppercase<'hello'>         // 'HELLO'
type Low = Lowercase<'WORLD'>        // 'world'
type Cap = Capitalize<'hello'>       // 'Hello'
type Uncap = Uncapitalize<'Hello'>   // 'hello'

// ── PRACTICAL: TYPED EVENT EMITTER ────────────────────────────
type EventMap = {
  userCreated: { id: string; name: string }
  userDeleted: { id: string }
  orderPlaced: { orderId: string; amount: number }
}

// Auto-generate listener method types
type EventListeners = {
  [K in keyof EventMap as \`on\${Capitalize<string & K>}\`]:
    (data: EventMap[K]) => void
}
// {
//   onUserCreated: (data: { id: string; name: string }) => void
//   onUserDeleted: (data: { id: string }) => void
//   onOrderPlaced: (data: { orderId: string; amount: number }) => void
// }

// ── TYPE-SAFE QUERY PARAMS ────────────────────────────────────
type SortableField = 'name' | 'createdAt' | 'price'
type SortOrder = 'asc' | 'desc'
type SortParam = \`\${SortableField}_\${SortOrder}\`
// 'name_asc' | 'name_desc' | 'createdAt_asc' | 'createdAt_desc' | 'price_asc' | 'price_desc'`,
            explanation: 'Ye sab compile time pe hota hai — runtime pe koi string nahi bana. TypeScript compiler ye types generate karta hai aur checking karta hai. Capitalize, Uppercase jaise intrinsic string manipulation types bhi hain — TypeScript compiler internally handle karta hai. Sabse powerful use: mapped types ke saath combine karo — ek type se automatically getter/setter/handler names generate karo.',
          }}
          realWorldScenario="CSS-in-JS library banao — type SpacingProp = \`\${Property}-\${Direction}\`. Ab styles object mein 'mrgn-top': 16 likhoge toh TypeScript bol dega 'mrgn-top' valid nahi. '5' value doge toh bol dega ye SpacingValue nahi. Design system tokens bhi aise type-safe banao — brand mein yellow-500 hai ya yellow-600? Type mein define karo, typo pe compile error. Production mein CSS bugs zero."
          commonMistakes={[
            {
              mistake: 'Template literal type mein number directly use karna',
              why: '`id_${number}` sab numbers allow karta hai — bohot broad. "id_3.14" bhi valid ho jaata hai.',
              fix: 'Specific number literals use karo ya branded number type — `id_${1 | 2 | 3}` specific IDs ke liye.',
            },
            {
              mistake: 'Union combinations bahut badi ho jaati hain',
              why: '5 variants × 5 variants = 25 combinations — TypeScript slow ho sakta hai badi unions mein.',
              fix: 'Small unions ke saath use karo. Large combinations ke liye string + runtime validation better hai.',
            },
          ]}
          proTip="Template literal types aur infer ka combination — ekdum advanced territory. type ParseRoute&lt;T extends string&gt; = T extends \`/\${infer Segment}/\${infer Rest}\` ? ... — route string '/users/:id/posts' se compile time pe params nikaal sakte ho. tRPC aur Next.js internally similar patterns use karte hain. Ye dekh ke bahut log shock ho jaate hain — TypeScript mein string parsing? Haan, compile time pe!"
        />
      </div>

      <div id="discriminated-unions">
        <ConceptCard
          title="Discriminated Unions — Type-Safe Switches"
          emoji="🔱"
          difficulty="advanced"
          whatIsIt="Discriminated union ek design pattern hai — union ke har member mein ek special 'discriminant' property hoti hai jo literal type ka hoti hai. Jaise kind: 'circle' | kind: 'square'. Jab tum switch mein kind check karo toh TypeScript automatically jaanta hai — circle case mein radius milega, square mein side. Koi as casting nahi, koi optional chaining nahi. TypeScript control flow analysis karta hai aur type narrow ho jaata hai. Index signatures is pattern ke saath complement karte hain arbitrary properties ke liye."
          whenToUse={[
            'Multiple shapes/variants ka ek type — Shape, Action, Event',
            'Redux actions type karne ke liye',
            'API response variants — success ya error',
            'State machine states — loading, success, error',
          ]}
          whyUseIt="Ab sawaal ye aata hai — ek aisa union type kaise banayein jahan har variant ka structure alag ho? ApiResponse success mein data hoga, failure mein error hoga. Bina discriminant ke — har jagah optional checks likhne padenge. Discriminated union se switch likhne pe TypeScript khud samjhta hai — yahan data hai, yahan error. Type casting zero. Aur naya variant add karo union mein? Compiler immediately batata hai kahan handle karna hai — never type ke through exhaustiveness check. Ye ek complete safety net hai."
          howToUse={{
            filename: 'discriminated-unions.ts',
            language: 'typescript',
            code: `// ── DISCRIMINATED UNION ──────────────────────────────────────────
type Circle = {
  kind: 'circle'    // discriminant
  radius: number
}

type Square = {
  kind: 'square'    // discriminant
  side: number
}

type Triangle = {
  kind: 'triangle'  // discriminant
  base: number
  height: number
}

type Shape = Circle | Square | Triangle

// ── TYPE NARROWING WITH SWITCH ────────────────────────────────
function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      // TypeScript jaanta hai: shape is Circle — radius available
      return Math.PI * shape.radius ** 2

    case 'square':
      // TypeScript jaanta hai: shape is Square — side available
      return shape.side ** 2

    case 'triangle':
      // TypeScript jaanta hai: shape is Triangle — base & height available
      return 0.5 * shape.base * shape.height

    default:
      // Exhaustiveness check — agar naya shape add kiya aur case miss hua
      const _exhaustive: never = shape  // Compile error agar case missing!
      throw new Error(\`Unknown shape: \${JSON.stringify(_exhaustive)}\`)
  }
}

// ── RESULT TYPE PATTERN (Rust-inspired) ─────────────────────
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const user = await db.findUser(id)
    if (!user) return { success: false, error: new Error('User not found') }
    return { success: true, data: user }
  } catch (err) {
    return { success: false, error: err as Error }
  }
}

const result = await fetchUser('123')
if (result.success) {
  console.log(result.data.name)  // TypeScript: data is User
} else {
  console.error(result.error.message)  // TypeScript: error is Error
}

// ── INDEX SIGNATURES ─────────────────────────────────────────
// Arbitrary key-value pairs
interface StringMap {
  [key: string]: string
}

interface NumberMap {
  [key: string]: number
}

// Known + unknown properties mix
interface Config {
  name: string            // Known required property
  version: number         // Known required property
  [key: string]: unknown  // Additional arbitrary properties — unknown type!
}

const config: Config = {
  name: 'MyApp',
  version: 1,
  debug: true,     // Extra — allowed
  logLevel: 'info' // Extra — allowed
}`,
            explanation: 'Key insight: discriminant property hamesha literal type honi chahiye — "circle" nahi toh string, "square" nahi toh string. Literal type se hi TypeScript narrow kar sakta hai. const _exhaustive: never = shape — ye line TypeScript ko force karti hai ki switch exhaustive ho. Agar naya shape add kiya aur case nahi likha, toh TypeScript bolega "Type Shape is not assignable to never". Index signatures ke saath careful raho — type safety thodi loose hoti hai.',
          }}
          realWorldScenario="Redux reducer likhte waqt discriminated unions ka real power dikhta hai. type Action = | { type: 'USER_LOGIN'; payload: User } | { type: 'USER_LOGOUT' } | { type: 'SET_LOADING'; loading: boolean }. switch(action.type) — case 'USER_LOGIN' mein action.payload automatically User hai. Naya action type add karo union mein, bhool gaye reducer mein? Compiler compile hi nahi karega. Production bugs zero — TypeScript ne pakad liya."
          commonMistakes={[
            {
              mistake: 'Discriminant property optional rakhna',
              why: 'Optional discriminant se narrowing fail hoti hai — TypeScript sure nahi ho sakta kaunsa variant hai.',
              fix: 'Discriminant hamesha required rakho — koi ? nahi. Literal type ho — string literal, number literal.',
            },
            {
              mistake: 'Index signature ke saath known properties mismatch',
              why: 'interface { name: string; [key: string]: number } — name string hai lekin index signature number expect karta hai — error!',
              fix: 'Index signature ka type sab known property types include kare: [key: string]: string | number | boolean.',
            },
          ]}
          proTip="Discriminated unions ke saath ek useful utility — type ExtractByKind&lt;T, K extends string&gt; = T extends { kind: K } ? T : never. type CircleOnly = ExtractByKind&lt;Shape, 'circle'&gt; — sirf Circle type milega. Ye conditional types aur discriminated unions ka combination hai. Large codebases mein specific variant nikaalte waqt bahut useful hai — as casting se zyada safe."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 7 Quiz — Advanced Types
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — conditional types, mapped types, aur discriminated unions test karo!
          </p>
        </div>
        <QuizSection questions={tsQuiz} chapterSlug="ts-advanced-types" />
      </div>
    </div>
  )
}
