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
          Generics — Ek Baar Likho, Har Type Ke Liye Kaam Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Generics TypeScript ka most powerful feature hai — aur sabse zyada misunderstood bhi. Problem ye hai: agar any use karo toh type safety gone, agar specific type use karo toh reusability gone. Generics dono ka best of worlds dete hain — <strong className="text-[#F5F5F7]">type-safe aur reusable</strong>. Aur interesting baat — tum roz generics use karte ho: <code className="text-[#3178C6]">Array&lt;T&gt;</code>, <code className="text-[#3178C6]">Promise&lt;T&gt;</code>, React ka <code className="text-[#3178C6]">useState&lt;T&gt;</code> — sab generics pe based hain.
        </p>
      </div>

      <div id="generic-functions">
        <ConceptCard
          title="Generic Functions — Ek Function Har Type Ke Liye"
          emoji="♾️"
          difficulty="intermediate"
          whatIsIt="Generic function mein type parameters hote hain — T, U, K (sirf naming convention, kuch bhi rakh sakte ho). Caller jab function call karta hai, TypeScript argument dekh ke T ka actual type infer karta hai. Ek baar samjho: identity('hello') mein TypeScript jaanta hai T = string. identity(42) mein T = number. Same function, alag types, full type safety."
          whenToUse={[
            'Jab function different types ke saath same logic apply kare',
            'Wrapper functions (identity, map, filter)',
            'Data transformation utilities',
            'API response wrappers',
          ]}
          whyUseIt="Any vs Generic ka fark code mein dekho: identityBad('hello') ka return type any — useless. identity('hello') ka return type string — TypeScript ne infer kiya. Input output relationship preserve hai. Ye generics ka core value hai: type information flow karta hai through function, lost nahi hota. Jitna specific input, utna specific output."
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
            explanation: 'ApiResponse<T> wrapper pattern note karo — fetchUser() returns Promise<ApiResponse<User>>. TypeScript poora chain track karta hai — data ka type User, status number, message string. Zero any, zero casting. zip<A, B> multiple type params ka example — pairs: [number, string][] automatically inferred. Type information complete preserved hai.',
            filename: 'generic-functions.ts',
          }}
          realWorldScenario="Custom hook banao — useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void]. T koi bhi type ho — string, number, User object. TypeScript automatically infer karta hai: useLocalStorage('theme', 'dark') mein T = string, useLocalStorage('user', null) mein T = null. Ek hook, infinite types, poori safety."
          commonMistakes={[
            { mistake: '<T> ko any ki tarah use karna', why: 'Generic ka purpose type information preserve karna hai — any ki tarah use karna benefits khatam', fix: 'Generic function ke andar T se operations karo jo T ke liye valid hain' },
          ]}
          proTip="Type inference kitni smart hai dekhte hain: identity('hello') — TypeScript automatic T = string. Tum identity<string>('hello') explicitly nahi likhna. Inference pe rely karo — verbose type parameters avoid karo jab TypeScript khud figure out kar sake. Explicitly tab likho jab inference wrong ho ya multiple type params mein ambiguity ho."
        />
      </div>

      <div id="generic-interfaces">
        <ConceptCard
          title="Generic Interfaces & Classes"
          emoji="🏗️"
          difficulty="intermediate"
          whatIsIt="Generic classes aur interfaces — same concept, zyada power. Stack<T> ek template hai — Stack<number> banao, Stack<string> banao, Stack<User> banao. Ek hi class, infinite variations, har variation type-safe. Repository<T, ID> pattern isse aur aage le jaata hai — har entity ke liye alag class likhne ki zaroorat nahi."
          whenToUse={[
            'Repository pattern mein generic base repository',
            'Container types (Stack, Queue, LinkedList)',
            'Service classes jo different data types handle karein',
          ]}
          whyUseIt="Problem without generics: UserRepository, ProductRepository, OrderRepository — same CRUD code, different types. With generics: BaseRepository<T, ID> — ek baar likho, sab entities ke liye kaam kare. Code duplication zero. Aur bade fayde mein: CRUD logic change karo ek jagah — sab automatically update. DRY principle at type level."
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
            explanation: 'Stack<T> mein numStack.push("hello") — compile error! Number stack mein string nahi jaati. Repository<T, ID> interface mein T entity type hai, ID identifier type. UserRepository implements Repository<User, number> — TypeScript verify karta hai findById(id: number) signature sahi hai. Type safety implementation tak flow karta hai.',
            filename: 'generic-classes.ts',
          }}
          realWorldScenario="NestJS ya any backend framework mein TypeORM ke saath BaseRepository<T, ID> pattern standard practice hai. findAll, findById, save, delete — once likhte hain. UserRepository, ProductRepository sab extend karte hain. Agar pagination add karni ho BaseRepository mein — sab repositories automatically paginated. Ek change, poori benefit."
          commonMistakes={[
            { mistake: 'Too many type parameters', why: 'Code unreadable ho jaata hai', fix: '2-3 se zyada type params avoid karo — object type use karo config ke liye' },
          ]}
          proTip="Generic classes extend karte waqt type fix karo: class UserRepo extends BaseRepo<User, number>. Ya generic rakho: class ReadonlyRepo<T> extends BaseRepo<T, number>. Dono valid. Choose based on use case — entity-specific extension ya further generic abstraction."
        />
      </div>

      <div id="constraints">
        <ConceptCard
          title="Generic Constraints — extends Keyword"
          emoji="🔗"
          difficulty="intermediate"
          whatIsIt="Generics powerful hain lekin kabhi kabhi too permissive hote hain — T pe koi bhi property access karo toh TypeScript complaint karta hai: 'T mein ye property guaranteed nahi.' Constraints isko solve karte hain: T extends HasLength matlab T ko length property guarantee milti hai. Constraints TypeScript ko batate hain ki T ka minimum structure kya hoga."
          whenToUse={[
            'Function ko specific properties wale objects chahiye hon',
            'keyof constraints ke liye',
            'Specific interface implement karne wale types',
          ]}
          whyUseIt="keyof constraint wala pattern — getProperty(obj, key) — ek underrated gem hai. Object ka property safely access karo without any. getProperty(user, 'phone') — compile error, 'phone' user mein exist hi nahi karta. Runtime pe koi crash nahi — compile time pe pakad liya. Ye 'safe property access' pattern production code mein bahut use hota hai."
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
            explanation: 'Dekho — getLength(42) compile error: number mein length nahi. getLength("hello") — works: string mein length hai. Constraint ne filter kar diya. getProperty(user, "phone") — compile error: phone User keys mein nahi. getProperty(user, "name") — string milega. K extends keyof T se TypeScript return type bhi T[K] infer karta hai — automatic.',
            filename: 'constraints.ts',
          }}
          realWorldScenario="Form validation helper: function validateField<T extends Record<string, unknown>, K extends keyof T>(form: T, field: K, validator: (v: T[K]) => boolean): boolean. Galat field naam doge — compile error. Validator wrong type expect kare — compile error. Type-safe form handling bina any ke, poori pipeline guaranteed."
          commonMistakes={[
            { mistake: 'extends aur implements confuse karna generic constraints mein', why: 'Generic constraints mein extends both class inheritance aur interface implementation ke liye use hota hai', fix: 'T extends Serializable — T must have serialize/deserialize methods' },
          ]}
          proTip="Conditional types constraints ke saath bahut powerful hote hain: type IsArray<T> = T extends any[] ? true : false. Aur infer keyword se types extract karo: type UnwrapPromise<T> = T extends Promise<infer U> ? U : T. Ye advanced TypeScript hai — foundation strong hoga toh yahan naturally pahunchoge."
        />
      </div>

      <div id="keyof-typeof">
        <ConceptCard
          title="keyof & typeof — Type-Level Operators"
          emoji="🔑"
          difficulty="intermediate"
          whatIsIt="keyof aur typeof — do type-level operators jo bahut zyada use hote hain. keyof T se object ke property names ka union milta hai — keyof User = 'id' | 'name' | 'email'. typeof value se runtime value ka TypeScript type milta hai — compile time pe. Ye dono milke type duplication khatam karte hain aur refactoring automatically propagate karte hain."
          whenToUse={[
            'keyof: Safe property access ke liye',
            'keyof: Object iterate karne ke liye',
            'typeof: Existing value se type derive karne ke liye',
            'typeof: Function return type extract karne ke liye',
          ]}
          whyUseIt="Ek real pain point — Config object hai, interface bhi likhna pada, dono sync mein rakhna hai. typeof defaultConfig se interface ki zaroorat nahi — object se directly type derive hoti hai. User ke properties update karo — keyof User automatically update. Ye DRY principle type level pe hai. DIRECTIONS as const pattern enums ka lightweight alternative hai — type safe, no runtime overhead."
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
            explanation: 'typeof defaultConfig see — type Config automatically bana, koi duplicate interface nahi likha. DIRECTIONS as const se Direction type = "north" | "south" | "east" | "west" — enum ki tarah typed, enum ki complexity nahi. (typeof DIRECTIONS)[keyof typeof DIRECTIONS] pattern yaad karo — ye idiom bahut common hai TypeScript codebases mein.',
            filename: 'keyof-typeof.ts',
          }}
          realWorldScenario="Form handling: const initialState = { name: '', email: '', age: 0 }. type FormFields = keyof typeof initialState = 'name' | 'email' | 'age'. Generic handler: function updateField(field: FormFields, value: ...). Field naam galat likhne ka koi way nahi — autocomplete available, typo compile error. Ye pattern React forms mein extensively use hota hai."
          commonMistakes={[
            { mistake: 'typeof aur TypeScript type annotation confuse karna', why: 'Runtime typeof (string, number, object) aur TypeScript typeof type operator alag hain', fix: 'type T = typeof value — TypeScript type operator. typeof x === "string" — runtime JavaScript check' },
          ]}
          proTip="as const + typeof = const enum without enum. ROUTES = { HOME: '/', ABOUT: '/about' } as const — type narrowing se ROUTES.HOME ka type '/' hai, string nahi. Narrow types IDE mein zyada helpful hote hain — exact values dikhte hain. Ye pattern config objects mein everywhere use hota hai."
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
          whatIsIt="Utility types TypeScript ka pre-built toolkit hai — Partial, Required, Readonly, Pick, Omit, Record, ReturnType — sab built-in hain. Khud se implement nahi karne padte. Real world mein sabse common use case: Create/Update DTOs for APIs — CreateUserDto, UpdateUserDto, UserResponse — sab existing User interface se derived, manually duplicate nahi likhna."
          whenToUse={[
            'Partial: Update/patch operations mein',
            'Pick/Omit: API responses mein sensitive fields hide karne ke liye',
            'Record: Dynamic key-value maps ke liye',
            'ReturnType: Function return types derive karne ke liye',
          ]}
          whyUseIt="Ek simple example: User interface mein password field hai. API response mein password kabhi nahi bhejna chahiye. Omit<User, 'password'> — done. Manually copy-paste nahi kiya, User update karo — PublicUser automatically update. Partial<User> update operations ke liye — sirf jo fields change karne hain woh pass karo. Ye patterns daily production code mein use hote hain."
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
            explanation: 'Ye poora DTO pattern dekho — User ek baar define hua. CreateUserDto = Omit id/createdAt. UpdateUserDto = Partial of Create (sab optional). UserResponse = Omit password. Teen types, zero code duplication. User mein phone field add karo — teen DTOs automatically update. Refactoring ka sapna hai ye.',
            filename: 'utility-types.ts',
          }}
          realWorldScenario="Real production pattern — NestJS ya Express REST API mein User entity ek baar define karo. CreateUserDto = Omit<User, 'id' | 'createdAt'>, UpdateUserDto = Partial<CreateUserDto>, UserResponseDto = Omit<User, 'password'>. Poori API type-safe, zero duplication, ek jagah change sab jagah reflect. Ye professional TypeScript code hai."
          commonMistakes={[
            { mistake: 'Too many nested utility types — unreadable', why: 'Partial<Required<Omit<Pick<T, K>, J>>> — koi nahi samjhega', fix: 'Intermediate types banao: type UserBase = Omit<User, "password">, type CreateDto = Omit<UserBase, "id">' },
          ]}
          proTip="Ek readability rule: Partial<Required<Omit<Pick<T, K>, J>>> — koi nahi samjhega, tum bhi nahi 2 hafte baad. Intermediate named types banao: type UserBase = Omit<User, 'password'>, type CreateDto = Omit<UserBase, 'id'>. Step by step, readable, maintainable. Complex type combinations helpful hote hain sirf jab naam clear ho."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="ts-generics" />
    </div>
  )
}
