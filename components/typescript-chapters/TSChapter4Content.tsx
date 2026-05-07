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

function InterfaceVsTypeDiagram() {
  const items = [
    { label: 'interface — Object Shapes', sublabel: 'extends ✅ · declaration merging ✅ · class implements ✅', color: '#3178C6', bg: 'rgba(49,120,198,0.1)', border: 'rgba(49,120,198,0.3)', icon: '🏗️' },
    { label: 'type — Flexible Aliases', sublabel: 'union types ✅ · tuple types ✅ · primitive aliases ✅ · mapped types ✅', color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.3)', icon: '🏷️' },
    { label: 'Rule of Thumb', sublabel: 'Object shapes → interface · Everything else → type', color: '#6366F1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.3)', icon: '✅' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">interface vs type — When To Use Each</p>
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
          Interfaces & Type Aliases — Object Ki "Blueprint" Define Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ek interesting sawaal: TypeScript mein object ka shape define karne ke do tarike hain — <code className="text-[#3178C6]">interface</code> aur <code className="text-[#3178C6]">type</code>. Aur ye debate community mein real hai: kab kya use karein? Simple answer: object shapes ke liye <strong className="text-[#F5F5F7]">interface prefer karo</strong>, unions/tuples/primitives ke liye <strong className="text-[#F5F5F7]">type use karo</strong>. Lekin kyun? Woh samjhenge andar.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein interfaces, type aliases, optional/readonly properties, union/intersection types, aur declaration merging cover karenge. Ek baat pehle bata dun — <em>readonly</em> ka concept bahut underused hai. Jab koi cheez change nahi honi chahiye, TypeScript ko bolo — compiler enforce karega.
        </p>
      </div>

      <InterfaceVsTypeDiagram />

      <div id="interface-vs-type">
        <ConceptCard
          title="interface — Object Shape Define Karo"
          emoji="🏗️"
          difficulty="beginner"
          whatIsIt="Interface ek blueprint hai object ka — kaunsi properties hongi, unke types kya honge. Compiler ka perspective: jab bhi koi object User type ka claim kare, TypeScript checklist banata hai — id hai? string hai? email hai? Ek bhi miss karo ya wrong type do — compile error. Runtime tak kuch nahi jaata wrong."
          whenToUse={[
            'Jab object shapes define karni ho (API responses, function params)',
            'Jab library types extend karni ho (declaration merging)',
            'Jab class ke contract define karna ho (implements)',
          ]}
          whyUseIt="Sawaal: bina interface ke function likhte waqt kaise pata chalega kaunse properties valid hain? Guess karna padta hai ya documentation dhundna padta hai. Interface se — IDE mein object literal type karo aur autocomplete khul jaata hai: id, name, email, age — sab available. Typo karo toh red line. Ye developer experience 10x better hai."
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
            explanation: 'Dekho — age? matlab optional, createdAt readonly matlab set karo par change mat karo. Agar user.createdAt = new Date() karo — compile error. TypeScript immutability enforce karta hai. AdminUser extends User — User ke saare guarantees inherit hote hain plus admin-specific properties. Inheritance type-safe hai.',
            filename: 'interfaces.ts',
          }}
          realWorldScenario="E-commerce backend mein Product interface define karo — id, name, price, stock, category. Database se object aaya? TypeScript check karega. API response banaya? TypeScript check karega. Frontend mein render kiya? TypeScript check karega. Ek interface, poori pipeline ka guarantee."
          commonMistakes={[
            { mistake: 'interface mein default values likhna', why: 'interface sirf type definition hai — runtime values nahi', fix: 'Default values class ya function parameters mein likho' },
            { mistake: 'interface aur class confuse karna', why: 'Interface sirf shape describe karta hai — no implementation, no runtime object', fix: 'Interface type checking ke liye, class implementation ke liye' },
          ]}
          proTip="Object shapes ke liye interface prefer karo — extends syntax clean hai, aur declaration merging ki wajah se third-party library types augment kar sakte ho (Express Request pe user property add karna yaad hai?). Ye interface ka exclusive superpower hai — type alias ye nahi kar sakta."
        />
      </div>

      <div id="optional-readonly">
        <ConceptCard
          title="Type Aliases — Flexible Type Definitions"
          emoji="🏷️"
          difficulty="beginner"
          whatIsIt="type alias ek naam deta hai kisi bhi type ko — aur yahan 'kisi bhi' ka matlab serious hai. Interface sirf object shapes define kar sakta hai. type alias object, union, tuple, primitive alias, function type — sab kuch. Yahi flexibility hai jo type ko interface se alag banati hai."
          whenToUse={[
            'Union types define karne ke liye (string | number)',
            'Tuple types ke liye ([string, number])',
            'Complex generic types ke liye',
            'Primitive type renaming ke liye',
          ]}
          whyUseIt="Ek practical win — type Status = 'active' | 'inactive' | 'pending'. Agar kal 'suspended' add karna ho? Ek jagah change karo, TypeScript poori codebase mein dhund ke batayega kahan handle karna hai. Manual search karne ki zaroorat nahi. Ye refactoring safety hai — type alias ka real world value."
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
            explanation: 'Code mein dekho — const bad: Status = "deleted" pe compile error. TypeScript sirf "active" | "inactive" | "pending" allow karta hai. Aur Callback type function signature hai — caller ko pata hai exactly kaunsa function pass karna hai. Type aliases code ko self-documenting banate hain.',
            filename: 'type-aliases.ts',
          }}
          realWorldScenario="User management system mein Role type define karo — 'admin' | 'user' | 'moderator'. Koi function route guard banaye aur galat string pass kare? Compile error. Nayi role add karni ho? Type update karo — TypeScript batayega kahan kahan handle karna hai. Centralized type definition = centralized control."
          commonMistakes={[
            { mistake: 'type aur interface ko completely interchangeable samajhna', why: 'Subtle differences hain — merging, extending syntax', fix: 'Objects ke liye interface, unions/tuples ke liye type' },
          ]}
          proTip="String literal unions modern TypeScript ka preferred approach hai enums ki jagah. type Direction = 'north' | 'south' | 'east' | 'west' — no runtime object, tree-shakable, simple. Enums ki zaroorat sirf tab hai jab reverse mapping ya const enum optimization chahiye. Nahi toh union types hi use karo."
        />
      </div>

      <div id="union-intersection">
        <ConceptCard
          title="Union & Intersection Types"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Union aur intersection — naam se hi samajh lo. Union (|) = ya — string | number matlab ya string ya number, dono mein se koi ek. Intersection (&) = aur — A & B matlab ek object jo A aur B dono ke saare properties rakhta hai. Ek baat shocking: string & number = never — koi value ek saath dono nahi ho sakti. Intersection sirf compatible types pe use karo, usually objects."
          whenToUse={[
            'Union: function multiple types accept kare (string | number)',
            'Union: discriminated union pattern ke liye',
            'Intersection: do types ko combine karna ho (mixins)',
            'Intersection: base type ko extend karna',
          ]}
          whyUseIt="Discriminated union pattern mera favorite TypeScript feature hai — ek tag field rakho (kind, type, status), TypeScript automatically narrow kar deta hai. Shape kya hai? Circle hai toh radius available, rect hai toh width/height. Runtime mein if/switch se determine karo — TypeScript samajhta hai. Iska matlab: impossible states type system mein represent hi nahi ho sakte."
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
            explanation: 'AuditedEntity = Timestamps & SoftDelete — do types merge ho gaye. Aur User mein & AuditedEntity karo — User ke id/name ke saath saari audit fields automatic. Koi manual copy-paste nahi. Discriminated union: shape.kind se TypeScript jaanta hai circle mein radius hai, rect mein width/height. Type narrowing automatic.',
            filename: 'union-intersection.ts',
          }}
          realWorldScenario="API response ka type design karo: type ApiResponse<T> = { success: true; data: T } | { success: false; error: string }. Agar response.success === true hai — TypeScript automatically jaanta hai response.data available hai. Agar false — response.error available hai. Impossible state represent karna type system mein impossible. Zero runtime null checks, compiler sab handle karta hai."
          commonMistakes={[
            { mistake: 'Intersection of primitives expect karna (string & number = never)', why: 'Koi value ek saath string bhi ho aur number bhi — impossible!', fix: 'Intersection sirf compatible types pe use karo, usually objects' },
            { mistake: 'Union mein common properties assume karna', why: 'TypeScript sirf woh properties allow karta hai jo saare union members mein hain', fix: 'Narrow karo pehle — typeof, instanceof, ya discriminant field' },
          ]}
          proTip="Discriminated unions use karte waqt always exhaustive check lagao — never trick se. switch default mein const _check: never = shape. Nayi type add karo — TypeScript force karega handle karo. Ye future-proof code hai — compiler khud bataata hai kahan update karna hai."
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
          whatIsIt="Declaration merging — interface ka ek unique superpower. Ek hi naam se do interface likhte hain — TypeScript unhe automatically merge kar deta hai. type alias se ye impossible hai, error aayega. Ye feature especially useful hai third-party libraries extend karne mein — unka code touch kiye bina apni properties add karo."
          whenToUse={[
            'Third-party library types extend karne ke liye',
            'Express Request object pe custom properties add karne ke liye',
            'Global types augment karne ke liye',
          ]}
          whyUseIt="Real scenario: Express authentication middleware likhte ho — req.user set karte ho. Lekin TypeScript bolta hai req mein user property exist nahi karta. Any use karo? Nahi! Express Request interface augment karo — poori app mein req.user TypeScript-safe ho jaata hai. Library types extend karna bina forking ke — yahi module augmentation hai."
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
            explanation: 'Dekho — Express namespace ke andar Request interface augment kiya req.user ke saath. Ab poori app mein req.user safely access ho sakta hai, koi any nahi, koi as cast nahi. Declaration merging ne existing library type ko silently extend kiya. Yahi TypeScript ka design — extensible without touching original code.',
            filename: 'declaration-merging.ts',
          }}
          realWorldScenario="Auth middleware wala scenario bahut common hai — JWT verify karo, user object req pe set karo, aage ke routes mein use karo. Bina declaration merging ke: req.user pe TypeScript error ya any type. Merging ke baad: ek types.d.ts file mein Express Request augment karo — poori app mein req.user auto-complete aur type-safe."
          commonMistakes={[
            { mistake: 'type alias ko merge karne ki koshish karna', why: 'type alias re-declaration allow nahi karta — error aayega', fix: 'Sirf interface declaration merging support karta hai' },
          ]}
          proTip="Project mein ek dedicated types.d.ts file banao — sab library augmentations wahan rakho. Express Request, global types, module declarations — centralized. Ye file tsconfig mein included hogi automatically. Clean architecture: types alag, implementation alag."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="ts-interfaces" />
    </div>
  )
}
