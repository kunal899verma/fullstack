'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'interface aur type mein declaration merging kiske liye hoti hai?',
    options: [
      { text: 'Dono ke liye hoti hai', correct: false, explanation: 'Sirf interface declaration merging support karta hai — type alias nahi.' },
      { text: 'Sirf interface ke liye', correct: true, explanation: 'Sahi! Aap ek hi naam se do interface declare kar sakte ho — TypeScript unhe automatically merge kar deta hai. Type alias ke liye ye possible nahi.' },
      { text: 'Sirf type ke liye', correct: false, explanation: 'Type declaration merge nahi hoti — sirf interface merge hoti hai.' },
      { text: 'Dono ke liye nahi hoti', correct: false, explanation: 'Interface merging ek real feature hai — library types extend karne ke kaam aata hai.' },
    ],
  },
  {
    question: 'readonly property ka matlab kya hai?',
    options: [
      { text: 'Property ko delete karna allowed nahi', correct: false, explanation: 'readonly sirf reassignment rokta hai — delete se alag baat hai.' },
      { text: 'Object banate waqt property set ho sakti hai lekin baad mein change nahi ho sakti', correct: true, explanation: 'Sahi! readonly fields constructor mein ya object literal mein set hote hain — baad mein obj.x = newVal error deta hai.' },
      { text: 'Property private ho jaati hai', correct: false, explanation: 'readonly aur private alag cheezein hain — readonly sirf mutability ke baare mein hai.' },
      { text: 'Ye sirf class mein kaam karta hai', correct: false, explanation: 'readonly interface aur type alias dono mein kaam karta hai.' },
    ],
  },
  {
    question: 'Union type (|) aur intersection type (&) mein kya fark hai?',
    options: [
      { text: 'Koi fark nahi — dono same hain', correct: false, explanation: 'Dono bilkul alag hain — ek "ya" hai, doosra "aur".' },
      { text: 'Union: ek ya doosra type; Intersection: dono types ke saare properties ek saath', correct: true, explanation: 'Bilkul! string | number matlab ya string ya number. A & B matlab ek object jo A aur B dono ke properties rakhta hai.' },
      { text: 'Union sirf primitives ke liye hai', correct: false, explanation: 'Union kisi bhi type ke saath kaam karta hai — objects, functions, literals.' },
      { text: 'Intersection sirf classes ke liye hai', correct: false, explanation: 'Intersection kisi bhi type pe kaam karta hai, sirf classes pe nahi.' },
    ],
  },
  {
    question: 'Optional property kaise likhte hain interface mein?',
    options: [
      { text: 'property?: type (question mark)', correct: true, explanation: 'Sahi! Question mark property ko optional banata hai — object banate waqt include na karo toh bhi chalta hai.' },
      { text: 'optional property: type', correct: false, explanation: 'optional keyword TypeScript mein nahi hota.' },
      { text: 'property: type | undefined explicitly', correct: false, explanation: 'Ye kaam karta hai lekin idiomatic way ? use karna hai — cleaner aur undefined se thoda alag behavior.' },
      { text: 'property: type? (end mein)', correct: false, explanation: 'Question mark property name ke baad aur colon se pehle aata hai: name?: string.' },
    ],
  },
  {
    question: 'Kab interface use karo aur kab type use karo?',
    options: [
      { text: 'Hamesha type use karo — interface outdated hai', correct: false, explanation: 'Interface modern TypeScript mein widely used hai — outdated bilkul nahi.' },
      { text: 'Object shapes ke liye interface prefer karo; unions, tuples, primitives ke liye type', correct: true, explanation: 'Community convention yahi hai — interface extends better karta hai, type zyada flexible hai complex types ke liye.' },
      { text: 'Sirf functions ke liye type use karo', correct: false, explanation: 'Functions ke liye dono kaam karte hain.' },
      { text: 'Hamesha interface use karo — type se zyada powerful hai', correct: false, explanation: 'Type kuch cheezein kar sakta hai jo interface nahi kar sakta — unions, mapped types, conditional types.' },
    ],
  },
]

function InterfaceVsTypeTable() {
  const rows = [
    { feature: 'Object shapes define karna', iface: '✅ Haan', type: '✅ Haan' },
    { feature: 'Declaration merging', iface: '✅ Haan', type: '❌ Nahi' },
    { feature: 'extends keyword', iface: '✅ Haan', type: '❌ (& use karo)' },
    { feature: 'Union types (A | B)', iface: '❌ Nahi', type: '✅ Haan' },
    { feature: 'Tuple types', iface: '❌ Nahi', type: '✅ Haan' },
    { feature: 'Mapped types', iface: '❌ Nahi', type: '✅ Haan' },
    { feature: 'Primitive aliases', iface: '❌ Nahi', type: '✅ Haan' },
    { feature: 'implements (class)', iface: '✅ Haan', type: '✅ Haan' },
  ]
  return (
    <div className="my-5 overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <th className="text-left px-4 py-3 text-[#71717A] font-bold uppercase tracking-wider">Feature</th>
            <th className="text-left px-4 py-3 font-bold" style={{ color: '#3178C6' }}>interface</th>
            <th className="text-left px-4 py-3 font-bold" style={{ color: '#0EA5E9' }}>type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
              <td className="px-4 py-3 text-[#71717A] font-medium">{row.feature}</td>
              <td className="px-4 py-3 text-[#A1A1AA]">{row.iface}</td>
              <td className="px-4 py-3 text-[#A1A1AA]">{row.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TSChapter4Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(49,120,198,0.06)', border: '1px solid rgba(49,120,198,0.25)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Interfaces & Type Aliases — Object Shapes Define Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          TypeScript mein objects ka shape define karne ke do tarike hain — <code className="text-[#3178C6]">interface</code> aur <code className="text-[#3178C6]">type</code>. Dono similar kaam karte hain lekin subtle differences hain jo production code mein matter karte hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum interfaces, type aliases, optional/readonly properties, union/intersection types, aur declaration merging cover karenge.
        </p>
      </div>

      <div id="interface-vs-type">
        <ConceptCard
          title="interface — Object Shape Define Karo"
          emoji="🏗️"
          difficulty="beginner"
          whatIsIt="interface ek named type definition hai jo object ka structure describe karta hai — kaunse properties honge, unke types kya honge."
          whenToUse={[
            'Jab object shapes define karni ho (API responses, function params)',
            'Jab library types extend karni ho (declaration merging)',
            'Jab class ke contract define karna ho (implements)',
          ]}
          whyUseIt="interface se TypeScript ko pata chalta hai ki kaunsa object valid hai — typos aur wrong property types compile time pe pakad jaate hain."
          howToUse={{
            code: `interface User {
  id: number
  name: string
  email: string
  age?: number        // optional
  readonly createdAt: Date  // can't be changed after set
}

// Usage
const user: User = {
  id: 1,
  name: 'Rahul',
  email: 'rahul@example.com',
  createdAt: new Date(),
}

// TypeScript error: createdAt is readonly
// user.createdAt = new Date()  // ❌

// Extending interfaces
interface AdminUser extends User {
  permissions: string[]
  adminSince: Date
}`,
            language: 'typescript',
            explanation: 'interface User define kiya with required aur optional fields. AdminUser User ko extend karta hai — User ke saare properties inherit hote hain.',
            filename: 'interfaces.ts',
          }}
          realWorldScenario="E-commerce app mein Product interface define karo — price, name, stock, etc. Har jagah jahan Product use ho TypeScript check karega ki saari required fields present hain."
          commonMistakes={[
            { mistake: 'interface mein default values likhna', why: 'interface sirf type definition hai — runtime values nahi', fix: 'Default values class ya function parameters mein likho' },
            { mistake: 'interface aur class confuse karna', why: 'Interface sirf shape describe karta hai — no implementation, no runtime object', fix: 'Interface type checking ke liye, class implementation ke liye' },
          ]}
          proTip="Object shapes ke liye interface prefer karo — extends cleaner lagta hai aur declaration merging ki vajah se library types augment kar sakte ho."
        />
      </div>

      <div id="optional-readonly">
        <ConceptCard
          title="Type Aliases — Flexible Type Definitions"
          emoji="🏷️"
          difficulty="beginner"
          whatIsIt="type alias ek naam deta hai kisi bhi type ko — primitive se leke complex objects tak. interface se zyada flexible hai."
          whenToUse={[
            'Union types define karne ke liye (string | number)',
            'Tuple types ke liye ([string, number])',
            'Complex generic types ke liye',
            'Primitive type renaming ke liye',
          ]}
          whyUseIt="type alias complex types ko readable naam deta hai. Reuse hota hai poori codebase mein — change ek jagah karo, sab jagah reflect ho jaata hai."
          howToUse={{
            code: `// Primitive alias
type UserID = string
type Timestamp = number

// Union type
type Status = 'active' | 'inactive' | 'pending'
type Result = string | number | null

// Object type (same as interface)
type Product = {
  id: UserID
  name: string
  price: number
  status: Status
}

// Tuple type (interface ye nahi kar sakta)
type Coordinates = [latitude: number, longitude: number]
type RGB = [number, number, number]

// Function type
type Callback = (error: Error | null, result: string) => void

// Usage
const userId: UserID = 'user_123'
const loc: Coordinates = [28.6139, 77.2090]  // Delhi coordinates
const status: Status = 'active'
// const bad: Status = 'deleted'  // ❌ Type error!`,
            language: 'typescript',
            explanation: 'type alias se UserID, Status jaise meaningful names milte hain. Union types aur tuple types sirf type ke saath hi define ho sakte hain.',
            filename: 'type-aliases.ts',
          }}
          realWorldScenario="API mein Status type define karo — 'active' | 'inactive' | 'banned'. Jab bhi status check karo TypeScript valid values enforce karta hai — typo ho toh immediately error milti hai."
          commonMistakes={[
            { mistake: 'type aur interface ko completely interchangeable samajhna', why: 'Subtle differences hain — merging, extending syntax', fix: 'Objects ke liye interface, unions/tuples ke liye type' },
          ]}
          proTip="String literal unions type ke saath define karo — type Direction = 'north' | 'south' | 'east' | 'west'. Ye enums se zyada lightweight aur flexible hote hain."
        />
      </div>

      <div id="union-intersection">
        <ConceptCard
          title="Union & Intersection Types"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Union type (|) matlab 'ya' — ek ya doosra. Intersection type (&) matlab 'aur' — dono ek saath."
          whenToUse={[
            'Union: function multiple types accept kare (string | number)',
            'Union: discriminated union pattern ke liye',
            'Intersection: do types ko combine karna ho (mixins)',
            'Intersection: base type ko extend karna',
          ]}
          whyUseIt="Union types flexible APIs banate hain. Intersection types type composition allow karta hai bina inheritance ke."
          howToUse={{
            code: `// Union type
type StringOrNumber = string | number
type ID = string | number

function formatId(id: ID): string {
  if (typeof id === 'string') return id.toUpperCase()
  return id.toString()
}

// Literal union — very common pattern
type Theme = 'light' | 'dark' | 'system'
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// Intersection type
type Timestamps = {
  createdAt: Date
  updatedAt: Date
}

type SoftDelete = {
  deletedAt: Date | null
}

type AuditedEntity = Timestamps & SoftDelete
// AuditedEntity has: createdAt, updatedAt, deletedAt

type User = {
  id: number
  name: string
} & AuditedEntity
// User has: id, name, createdAt, updatedAt, deletedAt

// Discriminated union — powerful pattern
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2
    case 'rect': return shape.width * shape.height
  }
}`,
            language: 'typescript',
            explanation: 'Union types flexible parameters banate hain. Intersection se AuditedEntity ek reusable mixin hai. Discriminated union pattern (kind field) se TypeScript shape ke type ko narrow kar leta hai.',
            filename: 'union-intersection.ts',
          }}
          realWorldScenario="API response type: type ApiResponse<T> = { success: true; data: T } | { success: false; error: string }. success field se TypeScript jaanta hai ki data field available hai ya nahi."
          commonMistakes={[
            { mistake: 'Intersection of primitives expect karna (string & number = never)', why: 'Koi value ek saath string bhi ho aur number bhi — impossible!', fix: 'Intersection sirf compatible types pe use karo, usually objects' },
            { mistake: 'Union mein common properties assume karna', why: 'TypeScript sirf woh properties allow karta hai jo saare union members mein hain', fix: 'Narrow karo pehle — typeof, instanceof, ya discriminant field' },
          ]}
          proTip="Discriminated unions ke liye ek kind/type/tag field rakho. switch(shape.kind) mein TypeScript automatically narrowing kar deta hai — bahut clean code banta hai."
        />
      </div>

      <div id="declaration-merging">
        <h2 className="text-xl font-display font-bold text-[#F5F5F7] mb-4" id="interface-vs-type-comparison">
          interface vs type — Comparison
        </h2>
        <InterfaceVsTypeTable />
        <ConceptCard
          title="Declaration Merging — Interface Ka Special Power"
          emoji="🔗"
          difficulty="intermediate"
          whatIsIt="Declaration merging se aap ek hi naam se multiple interface declarations likh sakte ho — TypeScript automatically merge kar deta hai. type alias ke saath ye possible nahi."
          whenToUse={[
            'Third-party library types extend karne ke liye',
            'Express Request object pe custom properties add karne ke liye',
            'Global types augment karne ke liye',
          ]}
          whyUseIt="Library types mein apne custom properties add kar sakte ho bina original code touch kiye — ye module augmentation ka base hai."
          howToUse={{
            code: `// Original interface (node_modules mein)
interface Window {
  innerWidth: number
  innerHeight: number
}

// Aap apni file mein add kar sakte ho:
interface Window {
  myCustomApp: { version: string }
}

// TypeScript dono merge kar deta hai — koi error nahi
window.myCustomApp.version // ✅ TypeScript jaanta hai ye exist karta hai

// Real-world: Express Request typing
// express.d.ts (global augmentation)
declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email: string }
    }
  }
}

// Ab app mein:
app.use((req, res, next) => {
  req.user = { id: 1, email: 'test@example.com' }  // ✅ No error
  next()
})`,
            language: 'typescript',
            explanation: 'Declaration merging se Window interface mein custom property add ki. Express Request ko extend kiya req.user ke liye — ye real-world mein bahut common pattern hai.',
            filename: 'declaration-merging.ts',
          }}
          realWorldScenario="Authentication middleware mein req.user set karte ho. Express Request interface augment karo — poori app mein req.user TypeScript-safe ho jaata hai bina any type use kiye."
          commonMistakes={[
            { mistake: 'type alias ko merge karne ki koshish karna', why: 'type alias re-declaration allow nahi karta — error aayega', fix: 'Sirf interface declaration merging support karta hai' },
          ]}
          proTip="Express, Koa jaise frameworks ke liye declaration merging essential pattern hai. Ek types.d.ts file banao aur wahan sab augmentations rakho."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="ts-interfaces" />
    </div>
  )
}
