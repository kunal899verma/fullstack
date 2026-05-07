'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'Generic function T kya represent karta hai?',
    options: [
      { text: 'Hamesha string type represent karta hai', correct: false, explanation: 'T ek type parameter hai — call site pe actual type decide hoti hai.' },
      { text: 'Ek type parameter jo call ke waqt infer ya specify hota hai', correct: true, explanation: 'Sahi! T sirf naam hai — A, B, TData bhi use kar sakte ho. TypeScript call ke waqt actual type figure out karta hai.' },
      { text: 'any type ka shorthand hai', correct: false, explanation: 'Generics bilkul any se alag hai — type safety maintain rehti hai.' },
      { text: 'Template literal types ke liye hai', correct: false, explanation: 'Template literal types alag cheez hain — generics type parameters hain.' },
    ],
  },
  {
    question: 'keyof operator kya karta hai?',
    options: [
      { text: 'Object ki values ka union type banata hai', correct: false, explanation: 'Values ke liye T[keyof T] use karo — keyof sirf keys ka union deta hai.' },
      { text: 'Object ke saare property names ka union type banata hai', correct: true, explanation: 'Sahi! keyof User = "id" | "name" | "email" — compile time pe safe property access ke liye use hota hai.' },
      { text: 'Object mein keys count karta hai', correct: false, explanation: 'keyof runtime counting nahi karta — compile-time type operator hai.' },
      { text: 'Object ko iterable banata hai', correct: false, explanation: 'Iteration alag concept hai — keyof sirf type level pe kaam karta hai.' },
    ],
  },
  {
    question: 'Partial<T> utility type kya karta hai?',
    options: [
      { text: 'T ki kuch properties remove karta hai', correct: false, explanation: 'Remove karne ke liye Omit<T, K> use karo.' },
      { text: 'T ki saari properties optional bana deta hai', correct: true, explanation: 'Sahi! Update operations mein useful — sirf woh fields pass karo jo change karni hain. Required<T> iska ulta karta hai.' },
      { text: 'T ke sirf required properties rakhta hai', correct: false, explanation: 'Required<T> saari properties required banata hai — Partial ulta karta hai.' },
      { text: 'T ko readonly banata hai', correct: false, explanation: 'Readonly ke liye Readonly<T> utility type hai.' },
    ],
  },
  {
    question: '<T extends object> constraint ka matlab kya hai?',
    options: [
      { text: 'T sirf class instances ho sakti hai', correct: false, explanation: 'object type primitives (string, number, boolean) exclude karta hai — classes bhi include hain lekin sirf class nahi.' },
      { text: 'T koi bhi non-primitive type ho sakti hai (objects, arrays, functions)', correct: true, explanation: 'Sahi! extends object se TypeScript ensure karta hai ki T string, number, boolean nahi hai — ek object structure chahiye.' },
      { text: 'T object class extend kare', correct: false, explanation: 'Object class aur object type different hain — ye object type constraint hai.' },
      { text: 'T optional ho jaati hai', correct: false, explanation: 'extends constraint type limit karta hai — optional banana nahi karta.' },
    ],
  },
  {
    question: 'ReturnType<T> utility type kya karta hai?',
    options: [
      { text: 'Function ka return type extract karta hai', correct: true, explanation: 'Bilkul! ReturnType<typeof myFunc> se function ka return type mil jaata hai — duplicate type definitions avoid hoti hain.' },
      { text: 'Function ko different type return karne force karta hai', correct: false, explanation: 'ReturnType sirf existing type extract karta hai — change nahi karta.' },
      { text: 'Return type void bana deta hai', correct: false, explanation: 'ReturnType existing return type read karta hai — modify nahi karta.' },
      { text: 'Sirf async functions ke saath kaam karta hai', correct: false, explanation: 'ReturnType synchronous aur async dono functions ke saath kaam karta hai.' },
    ],
  },
]

function UtilityTypesTable() {
  const types = [
    { name: 'Partial<T>', desc: 'Saari properties optional', example: 'Partial<User> → update operations' },
    { name: 'Required<T>', desc: 'Saari properties required', example: 'Required<Config> → validated config' },
    { name: 'Readonly<T>', desc: 'Saari properties readonly', example: 'Readonly<Config> → immutable config' },
    { name: 'Record<K, V>', desc: 'Keys K, Values V ka object', example: 'Record<string, number> → scores map' },
    { name: 'Pick<T, K>', desc: 'Sirf kuch properties lo', example: 'Pick<User, "id" | "name">' },
    { name: 'Omit<T, K>', desc: 'Kuch properties hata do', example: 'Omit<User, "password">' },
    { name: 'ReturnType<T>', desc: 'Function return type nikalo', example: 'ReturnType<typeof getUser>' },
    { name: 'Parameters<T>', desc: 'Function params ka tuple', example: 'Parameters<typeof fetch>' },
    { name: 'NonNullable<T>', desc: 'null/undefined hata do', example: 'NonNullable<string | null>' },
    { name: 'Awaited<T>', desc: 'Promise unwrap karo', example: 'Awaited<Promise<User>> → User' },
  ]
  return (
    <div className="my-5 overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <th className="text-left px-4 py-3 text-[#71717A] font-bold uppercase tracking-wider">Utility Type</th>
            <th className="text-left px-4 py-3 text-[#71717A] font-bold uppercase tracking-wider">Kya Karta Hai</th>
            <th className="text-left px-4 py-3 text-[#71717A] font-bold uppercase tracking-wider">Example</th>
          </tr>
        </thead>
        <tbody>
          {types.map((t, i) => (
            <tr key={i} style={{ borderBottom: i < types.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
              <td className="px-4 py-3 font-mono text-[#3178C6] font-medium">{t.name}</td>
              <td className="px-4 py-3 text-[#A1A1AA]">{t.desc}</td>
              <td className="px-4 py-3 text-[#71717A] font-mono text-[10px]">{t.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TSChapter6Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(49,120,198,0.06)', border: '1px solid rgba(49,120,198,0.25)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Generics — Reusable Type-Safe Code
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Generics TypeScript ka most powerful feature hai. Ek function ya class likhte ho jo kisi bhi type ke saath kaam kare — lekin any ki tarah type safety kho nahi jaati.{' '}
          <code className="text-[#3178C6]">Array&lt;T&gt;</code>, <code className="text-[#3178C6]">Promise&lt;T&gt;</code>, React ka <code className="text-[#3178C6]">useState&lt;T&gt;</code> — sab generics use karte hain.
        </p>
      </div>

      <div id="generic-functions">
        <ConceptCard
          title="Generic Functions — Ek Function Har Type Ke Liye"
          emoji="♾️"
          difficulty="intermediate"
          whatIsIt="Generic function mein ek ya zyada type parameters hote hain (T, U, K). Caller ke argument se TypeScript automatically infer karta hai ki T kya hai."
          whenToUse={[
            'Jab function different types ke saath same logic apply kare',
            'Wrapper functions (identity, map, filter)',
            'Data transformation utilities',
            'API response wrappers',
          ]}
          whyUseIt="any ki jagah generics use karo — type information preserve rehti hai. Input T doge toh output bhi T milega — TypeScript guarantee karta hai."
          howToUse={{
            code: `// any use karna — type information kho jaati hai
function identityBad(arg: any): any {
  return arg
}
const val = identityBad('hello')  // val: any — useless!

// Generic version — type safe!
function identity<T>(arg: T): T {
  return arg
}
const str = identity('hello')   // str: string ✅
const num = identity(42)        // num: number ✅
const obj = identity({ a: 1 }) // obj: { a: number } ✅

// Generic API response wrapper
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

async function fetchUser(): Promise<ApiResponse<User>> {
  const res = await fetch('/api/user/1')
  return res.json()
}

// Generic pair — multiple type params
function zip<A, B>(a: A[], b: B[]): [A, B][] {
  return a.map((item, i) => [item, b[i]])
}

const pairs = zip([1, 2, 3], ['a', 'b', 'c'])
// pairs: [number, string][] — fully typed!`,
            language: 'typescript',
            explanation: 'identity<T> function T ko preserve karta hai. ApiResponse<T> wrapper mein T woh type hai jo server return karta hai. zip<A, B> multiple type params use karta hai.',
            filename: 'generic-functions.ts',
          }}
          realWorldScenario="useLocalStorage<T>(key) custom hook — T se TypeScript jaanta hai ki stored value ka type kya hai. string, number, object — koi bhi type safely use kar sakte hain."
          commonMistakes={[
            { mistake: '<T> ko any ki tarah use karna', why: 'Generic ka purpose type information preserve karna hai — any ki tarah use karna benefits khatam', fix: 'Generic function ke andar T se operations karo jo T ke liye valid hain' },
          ]}
          proTip="Type inference bahut smart hai — zyada cases mein explicitly T specify nahi karna padta: identity('hello') automatically T = string infer kar leta hai."
        />
      </div>

      <div id="generic-interfaces">
        <ConceptCard
          title="Generic Interfaces & Classes"
          emoji="🏗️"
          difficulty="intermediate"
          whatIsIt="Interface aur class bhi generic ho sakte hain — type parameter ek variable ki tarah kaam karta hai jo use karte waqt specific type se fill hota hai."
          whenToUse={[
            'Repository pattern mein generic base repository',
            'Container types (Stack, Queue, LinkedList)',
            'Service classes jo different data types handle karein',
          ]}
          whyUseIt="Generic classes ek template hain — UserRepository aur ProductRepository ke liye alag code likhne ki zaroorat nahi."
          howToUse={{
            code: `// Generic Stack class
class Stack<T> {
  private items: T[] = []

  push(item: T): void {
    this.items.push(item)
  }

  pop(): T | undefined {
    return this.items.pop()
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1]
  }

  get size(): number {
    return this.items.length
  }
}

const numStack = new Stack<number>()
numStack.push(1)
numStack.push(2)
// numStack.push('hello')  // ❌ Type error!

// Generic Repository
interface Repository<T, ID> {
  findById(id: ID): Promise<T | null>
  findAll(): Promise<T[]>
  save(entity: T): Promise<T>
  delete(id: ID): Promise<void>
}

class UserRepository implements Repository<User, number> {
  async findById(id: number): Promise<User | null> {
    return db.query('SELECT * FROM users WHERE id = $1', [id])
  }
  // ... implement other methods
}`,
            language: 'typescript',
            explanation: 'Stack<T> kisi bhi type store kar sakta hai. Repository<T, ID> generic interface — UserRepository User ke liye implement karta hai. Type safety full maintain hoti hai.',
            filename: 'generic-classes.ts',
          }}
          realWorldScenario="Generic Repository pattern real-world mein bahut common hai — UserRepo, ProductRepo, OrderRepo sab ek BaseRepository<T, ID> se extend karte hain. CRUD code once likho."
          commonMistakes={[
            { mistake: 'Too many type parameters', why: 'Code unreadable ho jaata hai', fix: '2-3 se zyada type params avoid karo — object type use karo config ke liye' },
          ]}
          proTip="Generic class extend karte waqt type specify kar sakte ho: class UserRepo extends BaseRepo<User, number>. Ya generic rakh sakte ho: class BaseRepo<T> extends EventEmitter."
        />
      </div>

      <div id="constraints">
        <ConceptCard
          title="Generic Constraints — extends Keyword"
          emoji="🔗"
          difficulty="intermediate"
          whatIsIt="extends se generic type ko constrain kar sakte ho — T sirf woh types ho sakti hain jo certain structure ya interface follow karein."
          whenToUse={[
            'Function ko specific properties wale objects chahiye hon',
            'keyof constraints ke liye',
            'Specific interface implement karne wale types',
          ]}
          whyUseIt="Without constraints T mein koi bhi property access karna type error hai. Constraint se TypeScript guarantee karta hai ki required property exist karta hai."
          howToUse={{
            code: `// Without constraint — error!
function getLength<T>(arg: T): number {
  return arg.length  // ❌ Property 'length' does not exist on T
}

// With constraint
interface HasLength {
  length: number
}

function getLength<T extends HasLength>(arg: T): number {
  return arg.length  // ✅ TypeScript knows T has .length
}

getLength('hello')       // ✅ string has length
getLength([1, 2, 3])     // ✅ array has length
getLength({ length: 5 }) // ✅ object with length

// keyof constraint — safe property access
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: 'Rahul', age: 25, email: 'r@example.com' }
const name = getProperty(user, 'name')   // string
const age = getProperty(user, 'age')     // number
// getProperty(user, 'phone')  // ❌ Type error — 'phone' not in User!`,
            language: 'typescript',
            explanation: '<T extends HasLength> se T ko length property guarantee milti hai. <K extends keyof T> ensures K is a valid key of T — runtime errors impossible.',
            filename: 'constraints.ts',
          }}
          realWorldScenario="Database helper: function findBy<T extends Model, K extends keyof T>(model: T[], key: K, value: T[K]) — type-safe model querying bina any ke."
          commonMistakes={[
            { mistake: 'extends aur implements confuse karna generic constraints mein', why: 'Generic constraints mein extends both class inheritance aur interface implementation ke liye use hota hai', fix: 'T extends Serializable — T must have serialize/deserialize methods' },
          ]}
          proTip="Conditional generics: function first<T extends unknown[]>(arr: T): T[0] — array ka first element ka type exactly infer hota hai."
        />
      </div>

      <div id="keyof-typeof">
        <ConceptCard
          title="keyof & typeof — Type-Level Operators"
          emoji="🔑"
          difficulty="intermediate"
          whatIsIt="keyof T object ke saare property names ka union type deta hai. typeof value — value ka TypeScript type deta hai. Dono type-level operators hain."
          whenToUse={[
            'keyof: Safe property access ke liye',
            'keyof: Object iterate karne ke liye',
            'typeof: Existing value se type derive karne ke liye',
            'typeof: Function return type extract karne ke liye',
          ]}
          whyUseIt="Type duplication avoid hoti hai — ek baar define karo, types automatically derived hoti hain. Refactoring mein automatically update hota hai."
          howToUse={{
            code: `interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

// keyof — property names ka union
type UserKeys = keyof User  // "id" | "name" | "email" | "role"

// typeof — value se type derive karo
const defaultConfig = {
  theme: 'dark' as const,
  language: 'en' as const,
  fontSize: 16,
  notifications: true,
}

type Config = typeof defaultConfig
// Config = { theme: 'dark'; language: 'en'; fontSize: number; notifications: boolean }

// Ek saath — object ka values union
type ConfigValues = (typeof defaultConfig)[keyof typeof defaultConfig]
// 'dark' | 'en' | number | boolean

// Enum alternatives with typeof
const DIRECTIONS = {
  NORTH: 'north',
  SOUTH: 'south',
  EAST: 'east',
  WEST: 'west',
} as const

type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS]
// 'north' | 'south' | 'east' | 'west'`,
            language: 'typescript',
            explanation: 'keyof User se property names ka union milta hai. typeof defaultConfig se object ka type derive hota hai — duplicate interface likhne ki zaroorat nahi. DIRECTIONS pattern enum ka type-safe alternative hai.',
            filename: 'keyof-typeof.ts',
          }}
          realWorldScenario="Form validation: type FormFields = keyof typeof initialFormState — ek hi jagah field names define karo, form handlers automatically typed ho jaate hain."
          commonMistakes={[
            { mistake: 'typeof aur TypeScript type annotation confuse karna', why: 'Runtime typeof (string, number, object) aur TypeScript typeof type operator alag hain', fix: 'type T = typeof value — TypeScript type operator. typeof x === "string" — runtime JavaScript check' },
          ]}
          proTip="as const assertion ke saath typeof bahut powerful ho jaata hai — string literals narrow ho jaate hain, const enums bana sakte hain bina actual enum ke."
        />
      </div>

      <div id="utility-types">
        <h2 className="text-xl font-display font-bold text-[#F5F5F7] mb-4">
          Built-in Utility Types — TypeScript Ka Toolkit
        </h2>
        <UtilityTypesTable />
        <ConceptCard
          title="Utility Types in Practice"
          emoji="🛠️"
          difficulty="intermediate"
          whatIsIt="TypeScript built-in utility types common type transformations provide karte hain — in generic patterns ko bar-bar likhna nahi padta."
          whenToUse={[
            'Partial: Update/patch operations mein',
            'Pick/Omit: API responses mein sensitive fields hide karne ke liye',
            'Record: Dynamic key-value maps ke liye',
            'ReturnType: Function return types derive karne ke liye',
          ]}
          whyUseIt="DRY principle — types ek baar define karo, utility types se variations derive karo. Refactoring mein automatically update hota hai."
          howToUse={{
            code: `interface User {
  id: number
  name: string
  email: string
  password: string
  createdAt: Date
}

// Update operation — sirf jo fields chahiye
type UpdateUserDto = Partial<Omit<User, 'id' | 'createdAt'>>
// { name?: string; email?: string; password?: string }

// API response — password mat bhejo
type PublicUser = Omit<User, 'password'>

// Cache store
type UserCache = Record<number, User>
// { [key: number]: User }

// Pick sirf required fields
type UserPreview = Pick<User, 'id' | 'name'>

// ReturnType — function return type derive karo
async function getUser(id: number): Promise<User> {
  return db.findOne(id)
}

type GetUserReturn = Awaited<ReturnType<typeof getUser>>
// User — no need to write User again!

// Real-world: CRUD DTOs pattern
type CreateUserDto = Omit<User, 'id' | 'createdAt'>
type UpdateUserDtoFull = Partial<CreateUserDto>
type UserResponse = Omit<User, 'password'>`,
            language: 'typescript',
            explanation: 'UpdateUserDto = Partial<Omit<...>> — update mein sirf optional fields jo id/createdAt nahi hain. PublicUser se password automatic hata. DTOs pattern compose kiye utility types se.',
            filename: 'utility-types.ts',
          }}
          realWorldScenario="REST API mein: CreateUserDto (no id/createdAt), UpdateUserDto (all optional), UserResponse (no password). Utility types compose karke manually duplicate nahi likhna padta."
          commonMistakes={[
            { mistake: 'Too many nested utility types — unreadable', why: 'Partial<Required<Omit<Pick<T, K>, J>>> — koi nahi samjhega', fix: 'Intermediate types banao: type UserBase = Omit<User, "password">, type CreateDto = Omit<UserBase, "id">' },
          ]}
          proTip="Utility types compose hote hain — chaining se complex transformations banti hain. Lekin zyada nesting se readability khatam — intermediate named types prefer karo."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="ts-generics" />
    </div>
  )
}
