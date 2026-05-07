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
          Advanced Types — TypeScript Ka Power Level Badhao
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Basic types seekh liye? Ab advanced types ki bari — conditional types, mapped types, template literal types aur discriminated unions. Ye features TypeScript ko ek powerful meta-programming tool banate hain. Types se types generate karo, object shapes transform karo, aur string patterns type-safely describe karo.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter ke baad aap samjhoge ki Partial&lt;T&gt;, Readonly&lt;T&gt;, ReturnType&lt;T&gt; jaise utility types andar se kaise kaam karte hain — aur apne custom utility types bhi bana sakoge.
        </p>
      </div>

      <div id="conditional-types">
        <ConceptCard
          title="Conditional Types — Type-Level If-Else"
          emoji="🔀"
          difficulty="advanced"
          whatIsIt="Conditional types TypeScript mein type-level ternary operator hain: T extends U ? X : Y. Agar T, U ko satisfy karta hai toh type X hoga, warna Y. infer keyword conditional types ke saath type extract karne ke liye use hota hai — jaise ReturnType<T> aur Awaited<T> built-in types isi pattern se bane hain."
          whenToUse={[
            'Type ko condition ke basis pe transform karna — NonNullable, Extract, Exclude',
            'Generic function se type extract karna — ReturnType, Parameters',
            'Distributive behavior — union types pe ek ek apply karna',
            'infer se nested types extract karna — Promise ke andar ka type',
          ]}
          whyUseIt="Conditional types se complex type transformations possible hain jo otherwise impossible hote. infer keyword se TypeScript compiler se types extract kar sakte ho — function ka return type, Promise ka resolved type, array ka element type. Built-in utility types ka foundation yahi hai. Bina conditional types ke TypeScript ki expressiveness aadhi reh jaati."
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
            explanation: 'T extends U ? X : Y type-level ternary hai. infer R pattern matching karta hai aur type capture karta hai. Union types pe conditional types automatically distribute hote hain — har member pe alag alag apply. Tuple mein wrap karo ([T] extends [U]) agar distribution rokna ho.',
          }}
          realWorldScenario="API client banana: type ApiReturn<T extends string> = T extends 'user' ? User : T extends 'product' ? Product : never. Ek generic function likho fetchApi<T extends 'user' | 'product'>(endpoint: T): Promise<ApiReturn<T>> — caller ko manual casting ki zaroorat nahi, TypeScript automatically correct return type deta hai."
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
          proTip="Conditional types recursive bhi ho sakte hain — DeepReadonly<T>: type DeepReadonly<T> = T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T. Nested objects sab readonly ho jaate hain. TypeScript 4.1 se tail-recursive conditional types support hain — infinite loops avoid karo depth limit se."
        />
      </div>

      <div id="mapped-types">
        <ConceptCard
          title="Mapped Types — Object Ko Transform Karo"
          emoji="🗺️"
          difficulty="advanced"
          whatIsIt="Mapped types existing type ke har property pe iterate karke naya type banate hain: { [K in keyof T]: NewType }. Modifiers add ya remove kar sakte ho — readonly, optional (?). as clause se key rename bhi ho sakta hai (key remapping). Built-in Partial, Required, Readonly, Record sab mapped types hain."
          whenToUse={[
            'Har property optional banani ho — Partial<T>',
            'Har property readonly banani ho — Readonly<T>',
            'Har property ka type transform karna ho',
            'Key names change karne ho — as clause se remapping',
          ]}
          whyUseIt="Mapped types DRY principle types ke liye implement karte hain. Ek base type se multiple derived types banao — manually duplicate karne ki zaroorat nahi. Object shape transform karo without boilerplate. Key remapping se event handler types automatically generate kar sakte ho base type se."
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
            explanation: '[K in keyof T] sab keys pe iterate karta hai. ? optional banata hai, readonly immutable. -? aur -readonly se modifiers hatate hain. as clause key rename karta hai — template literal types ke saath powerful combination. never se keys filter ho jaate hain.',
          }}
          realWorldScenario="Form validation library banao: type ValidationRules<T> = { [K in keyof T]?: (value: T[K]) => string | null }. Har field ke liye optional validator — field ka exact type correctly typed. Form type se automatically validation type derive hoti hai — alag alag define karne ki zaroorat nahi."
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
          proTip="Mapped types conditional types ke saath combine karo: type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] }. Ye recursively nested objects ke sab properties optional banata hai — sirf top-level nahi. Nested form update karne ke liye perfect."
        />
      </div>

      <div id="template-literal-types">
        <ConceptCard
          title="Template Literal Types — String Types Construct Karo"
          emoji="📝"
          difficulty="advanced"
          whatIsIt="Template literal types TypeScript 4.1 mein aaye — string literal types ko template syntax se combine karo. \`\${string}Id\` — koi bhi string jo 'Id' se end ho. Union types ke saath powerful: \`\${HttpMethod}\${Endpoint}\` se sab valid combinations generate ho jaate hain automatically."
          whenToUse={[
            'Event names type karne ke liye — "click", "mousedown", etc.',
            'CSS property names — margin-top, padding-left',
            'API endpoint patterns — /api/users/:id',
            'Getter/setter method names generate karna',
          ]}
          whyUseIt="Template literal types string patterns ko type-safe banate hain. Magic strings ki jagah — precise types. IDE autocomplete string values bhi deta hai. Typos compile time pe pakde jaate hain. Mapped types ke saath — automatic method/handler name generation possible."
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
            explanation: 'Template literal types backtick syntax use karte hain — bilkul template literals jaisa. Union types ke saath cartesian product generate hota hai. Capitalize, Uppercase jaise intrinsic types string manipulation karte hain. Mapped types ke saath combine karo automatic type generation ke liye.',
          }}
          realWorldScenario="Typed CSS-in-JS library: type SpacingValue = 0 | 4 | 8 | 16 | 24 | 32. type SpacingProp = `${Property}-${Direction}`. const styles: Partial<Record<SpacingProp, SpacingValue>> = { 'margin-top': 16 }. Typo karo 'mrgn-top' — compile error. Wrong value do 5 — compile error. Full type safety."
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
          proTip="Template literal types infer ke saath combine karo parsing ke liye: type ParseRoute<T extends string> = T extends \`/\${infer Segment}/\${infer Rest}\` ? { segment: Segment } & ParseRoute<\`/\${Rest}\`> : T extends \`/\${infer Last}\` ? { segment: Last } : {}. Route string se automatically typed params extract kar sakte ho!"
        />
      </div>

      <div id="discriminated-unions">
        <ConceptCard
          title="Discriminated Unions — Type-Safe Switches"
          emoji="🔱"
          difficulty="advanced"
          whatIsIt="Discriminated union ek pattern hai jahan union ke sab members mein ek common literal type property hoti hai — discriminant. TypeScript is property ki value se automatically type narrow karta hai. Jaise kind: 'circle' check karo toh TypeScript jaanta hai radius available hai. Index signatures se arbitrary key-value pairs describe karte hain."
          whenToUse={[
            'Multiple shapes/variants ka ek type — Shape, Action, Event',
            'Redux actions type karne ke liye',
            'API response variants — success ya error',
            'State machine states — loading, success, error',
          ]}
          whyUseIt="Discriminated unions type-safe switch statements enable karte hain — koi casting nahi, koi as. Each case mein correct properties automatically available hain. TypeScript exhaustiveness check bhi karta hai never ke saath — naya variant add karo aur bhool jaao handle karna toh compile error aata hai."
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
            explanation: 'Discriminant property literal type honi chahiye — string, number, boolean literal. Switch statement pe TypeScript automatically narrow karta hai. never type exhaustiveness check ke liye — naya case miss nahi hoga. Index signatures arbitrary properties allow karte hain lekin type safety thodi kam hoti hai.',
          }}
          realWorldScenario="Redux-style state management: type Action = | { type: 'USER_LOGIN'; payload: User } | { type: 'USER_LOGOUT' } | { type: 'SET_LOADING'; loading: boolean }. Reducer mein switch(action.type) — har case mein payload correctly typed. action.type === 'USER_LOGIN' ke baad action.payload automatically User type ka hai."
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
          proTip="Discriminated unions ke saath utility functions: type DiscriminantValue<T> = T extends { kind: infer K } ? K : never. type ExtractByKind<T, K extends DiscriminantValue<T>> = T extends { kind: K } ? T : never. type CircleOnly = ExtractByKind<Shape, 'circle'>. Specific variant type extract karna easy ho jaata hai!"
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
