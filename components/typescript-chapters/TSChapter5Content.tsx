'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'private aur protected mein kya fark hai?',
    options: [
      { text: 'Koi fark nahi — dono same hain', correct: false, explanation: 'Bahut important fark hai — subclass access ke baare mein.' },
      { text: 'private sirf us class mein accessible hai; protected us class aur uski subclasses mein', correct: true, explanation: 'Sahi! private #name TypeScript aur JavaScript dono mein private hai. protected subclasses mein bhi accessible hai.' },
      { text: 'protected compile time pe check hota hai; private runtime pe', correct: false, explanation: 'Dono compile-time checks hain TypeScript mein.' },
      { text: 'private sirf constructor mein use hota hai', correct: false, explanation: 'private kisi bhi method ya property pe use ho sakta hai.' },
    ],
  },
  {
    question: 'abstract class aur interface mein sabse bada fark kya hai?',
    options: [
      { text: 'Abstract class implementation de sakti hai; interface sirf shape define karta hai', correct: true, explanation: 'Sahi! Abstract class mein concrete methods bhi ho sakte hain. Interface sirf method signatures define karta hai — koi implementation nahi.' },
      { text: 'Interface multiple inherit kar sakte hain; abstract class se nahi', correct: false, explanation: 'Ye bhi sach hai — lekin zyada bada fark implementation vs pure contract hai.' },
      { text: 'Abstract class instances bana sakti hai', correct: false, explanation: 'Abstract class ke instances NAHI bana sakte — yahi reason hai usse abstract kehte hain.' },
      { text: 'Interface runtime pe exist karta hai', correct: false, explanation: 'Interface compile time ke baad erase ho jaata hai — runtime pe exist nahi karta.' },
    ],
  },
  {
    question: 'Parameter properties shorthand kya karta hai?',
    options: [
      { text: 'Constructor parameters ko automatically class properties mein convert karta hai', correct: true, explanation: 'Bilkul! constructor(public name: string) likhne se alag se this.name = name nahi likhna padta — boilerplate drastically kam hoti hai.' },
      { text: 'Parameters optional bana deta hai', correct: false, explanation: 'Parameter properties optional banana nahi karta — shorthand for property declaration hai.' },
      { text: 'Constructor ko private banata hai', correct: false, explanation: 'Parameter properties se constructor visibility change nahi hoti.' },
      { text: 'Sirf readonly properties ke liye kaam karta hai', correct: false, explanation: 'public, private, protected, readonly — sab ke saath kaam karta hai.' },
    ],
  },
  {
    question: 'implements keyword kab use karte hain?',
    options: [
      { text: 'Jab ek class doosri class ko extend kare', correct: false, explanation: 'Class extend karne ke liye extends keyword hai, implements nahi.' },
      { text: 'Jab class ko interface ka contract fulfill karna ho', correct: true, explanation: 'Sahi! implements se TypeScript check karta hai ki class mein interface ke saare required members hain.' },
      { text: 'Jab abstract class banani ho', correct: false, explanation: 'Abstract class ke liye abstract keyword use hota hai.' },
      { text: 'Jab static methods define karne ho', correct: false, explanation: 'Static methods ke liye static keyword hai — implements se koi relation nahi.' },
    ],
  },
]

export default function TSChapter5Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(49,120,198,0.06)', border: '1px solid rgba(49,120,198,0.25)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Classes & OOP in TypeScript
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          TypeScript classes mein JavaScript classes ke upar type system add hota hai — access modifiers (public/private/protected), abstract classes, interfaces implement karna, aur readonly fields. Ye features large codebases mein bugs prevent karte hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          OOP patterns — encapsulation, inheritance, polymorphism — TypeScript mein type-safe tarike se implement hote hain.
        </p>
      </div>

      <div id="access-modifiers">
        <ConceptCard
          title="Access Modifiers — public, private, protected"
          emoji="🔒"
          difficulty="intermediate"
          whatIsIt="Access modifiers control karte hain ki class ke members (properties/methods) bahar se accessible hain ya nahi."
          whenToUse={[
            'public: sabke liye accessible (default)',
            'private: sirf us class ke andar accessible',
            'protected: us class aur subclasses mein accessible',
            'readonly: set karne ke baad change nahi ho sakta',
          ]}
          whyUseIt="Encapsulation ke liye — internal state bahar se directly change nahi hona chahiye. private se implementation details hide hoti hain — public API clean rehta hai."
          howToUse={{
            code: `class BankAccount {
  private balance: number   // sirf is class ke andar
  protected owner: string   // subclasses bhi dekh sakti hain
  public readonly id: string // bahar se readable, not writable

  constructor(owner: string, initialBalance: number) {
    this.owner = owner
    this.balance = initialBalance
    this.id = Math.random().toString(36).slice(2)
  }

  // Public method — external API
  deposit(amount: number): void {
    if (amount <= 0) throw new Error('Amount must be positive')
    this.balance += amount
  }

  withdraw(amount: number): void {
    if (amount > this.balance) throw new Error('Insufficient funds')
    this.balance -= amount
  }

  getBalance(): number {
    return this.balance  // controlled access
  }
}

const acc = new BankAccount('Rahul', 1000)
acc.deposit(500)
// acc.balance = 99999   // ❌ TypeScript error: private!
// acc.id = 'new-id'     // ❌ TypeScript error: readonly!
console.log(acc.getBalance())  // ✅ 1500

// JavaScript native private fields (# syntax)
class SecureAccount {
  #balance: number  // truly private — even runtime

  constructor(balance: number) {
    this.#balance = balance
  }
}`,
            language: 'typescript',
            explanation: 'balance private hai — directly access nahi ho sakta, sirf deposit/withdraw/getBalance ke through. id readonly hai — set ho sakta hai but change nahi.',
            filename: 'access-modifiers.ts',
          }}
          realWorldScenario="Service class mein database connection private rakho, query methods public. Bahar se connection directly manipulate nahi ho sakta — sirf intended methods se interact kar sakte hain."
          commonMistakes={[
            { mistake: 'TypeScript private aur JavaScript # private confuse karna', why: 'TypeScript private compile time check hai — runtime pe accessible hai. # truly private hai', fix: 'Sensitive data ke liye # (JavaScript private fields) use karo' },
          ]}
          proTip="TypeScript private compile time only hai — runtime pe access ho sakta hai. Real privacy ke liye JavaScript native # syntax use karo: #balance."
        />
      </div>

      <div id="abstract-classes">
        <ConceptCard
          title="Abstract Classes — Template Methods Pattern"
          emoji="🎭"
          difficulty="intermediate"
          whatIsIt="Abstract class ek base class hai jo directly instantiate nahi ho sakti — sirf extend ho sakti hai. Abstract methods subclasses ko implement karne force karte hain."
          whenToUse={[
            'Jab common implementation share karni ho lekin subclass-specific behavior bhi ho',
            'Template method pattern implement karna ho',
            'Partial implementation provide karni ho',
          ]}
          whyUseIt="Abstract classes inheritance aur shared code ka balance deti hain — base class mein common logic, abstract methods mein variation points."
          howToUse={{
            code: `abstract class Animal {
  constructor(protected name: string) {}

  // Abstract method — subclass MUST implement karo
  abstract makeSound(): string

  // Concrete method — shared implementation
  describe(): string {
    return \`\${this.name} says: \${this.makeSound()}\`
  }
}

class Dog extends Animal {
  makeSound(): string {
    return 'Woof!'
  }
}

class Cat extends Animal {
  makeSound(): string {
    return 'Meow!'
  }
}

// const animal = new Animal('Generic')  // ❌ Error: abstract class!
const dog = new Dog('Bruno')
console.log(dog.describe())  // "Bruno says: Woof!"

// Real-world: Data exporter pattern
abstract class DataExporter {
  // Template method
  export(data: unknown[]): string {
    const processed = this.processData(data)
    const formatted = this.format(processed)
    return this.addHeaders(formatted)
  }

  protected abstract processData(data: unknown[]): unknown[]
  protected abstract format(data: unknown[]): string
  protected addHeaders(content: string): string {
    return \`# Export\n\${content}\`
  }
}`,
            language: 'typescript',
            explanation: 'Animal abstract class mein makeSound() abstract hai — Dog aur Cat dono implement karte hain. describe() shared method hai. Template method pattern se export() ka flow fixed hai lekin steps variable hain.',
            filename: 'abstract-classes.ts',
          }}
          realWorldScenario="Database repository abstract class: abstract findById(), abstract save() — concrete implementations PostgresRepo aur MongoRepo alag hoti hain lekin interface same rehta hai."
          commonMistakes={[
            { mistake: 'Abstract class ko interface ki jagah use karna', why: 'Abstract class inheritance hierarchy create karta hai — ye tight coupling hai', fix: 'Interface prefer karo contract ke liye, abstract class sirf jab shared implementation truly chahiye' },
          ]}
          proTip="Abstract class vs interface: abstract class 'is-a' relationship ke liye, interface 'can-do' ke liye. Dog is-an Animal, Serializable can-do serialization."
        />
      </div>

      <div id="implements">
        <ConceptCard
          title="implements — Interface Ko Enforce Karo"
          emoji="✅"
          difficulty="intermediate"
          whatIsIt="implements keyword se class ko ek ya zyada interfaces ka contract fulfill karna hota hai. TypeScript verify karta hai ki class mein saari required properties aur methods hain."
          whenToUse={[
            'Class ko specific interface ka contract satisfy karna ho',
            'Multiple interfaces implement karni hon (multiple implements)',
            'Duck typing verify karna ho compile time pe',
          ]}
          whyUseIt="implements se class ek guaranteed contract follow karta hai — dono sides (class aur interface) change hone pe TypeScript immediately error deta hai."
          howToUse={{
            code: `interface Serializable {
  serialize(): string
  deserialize(data: string): void
}

interface Loggable {
  log(message: string): void
}

// Ek class multiple interfaces implement kar sakti hai
class UserService implements Serializable, Loggable {
  private users: Map<string, object> = new Map()

  serialize(): string {
    return JSON.stringify(Object.fromEntries(this.users))
  }

  deserialize(data: string): void {
    const parsed = JSON.parse(data)
    Object.entries(parsed).forEach(([k, v]) => this.users.set(k, v as object))
  }

  log(message: string): void {
    console.log(\`[UserService] \${message}\`)
  }
}

// Parameter properties shorthand — boilerplate hatao
class Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}  // x aur y automatically assign ho jaate hain!

  distanceTo(other: Point): number {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2)
  }
}

const p = new Point(3, 4)
console.log(p.x, p.y)  // 3, 4 — no manual this.x = x needed!`,
            language: 'typescript',
            explanation: 'UserService Serializable aur Loggable dono implement karta hai. Parameter properties shorthand mein constructor parameters automatically properties ban jaati hain.',
            filename: 'implements.ts',
          }}
          realWorldScenario="Express-style middleware pattern: interface Middleware { handle(req: Request, res: Response): void }. Har middleware class ye contract implement kare — router automatically sab handle kar sakta hai."
          commonMistakes={[
            { mistake: 'implements aur extends confuse karna', why: 'extends: class se inherit karo. implements: interface ka contract fulfill karo', fix: 'class Dog extends Animal implements Runnable — dono alag hain' },
          ]}
          proTip="Parameter properties shorthand bahut common hai — constructor(private db: Database, private logger: Logger) likhne se automatically private fields ban jaate hain."
        />
      </div>

      <div id="static-members">
        <ConceptCard
          title="Static Members & Singleton Pattern"
          emoji="🏛️"
          difficulty="intermediate"
          whatIsIt="Static members class ke instance pe nahi, class itself pe hote hain. Class ka ek hi shared state hota hai."
          whenToUse={[
            'Factory methods (static create())',
            'Singleton pattern',
            'Class-level constants',
            'Utility methods jo instance state na use karein',
          ]}
          whyUseIt="Static members class-level functionality ke liye useful hain — instance banaye bina use kar sakte hain. Singleton pattern ek commonly needed pattern hai."
          howToUse={{
            code: `class Config {
  private static instance: Config | null = null
  private data: Map<string, string> = new Map()

  private constructor() {
    // Private constructor — direct instantiation block
    this.data.set('env', process.env.NODE_ENV ?? 'development')
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config()
    }
    return Config.instance
  }

  get(key: string): string | undefined {
    return this.data.get(key)
  }

  set(key: string, value: string): void {
    this.data.set(key, value)
  }

  // Static utility method
  static isProduction(): boolean {
    return process.env.NODE_ENV === 'production'
  }
}

// Usage
const config = Config.getInstance()
config.set('apiUrl', 'https://api.example.com')
console.log(Config.isProduction())  // false in dev

// Same instance everywhere
const config2 = Config.getInstance()
console.log(config === config2)  // true — singleton!`,
            language: 'typescript',
            explanation: 'Config singleton class — private constructor se direct new Config() block hai. getInstance() always same instance return karta hai.',
            filename: 'static-members.ts',
          }}
          realWorldScenario="Database connection pool — ek hi pool instance poori app mein share karo. Logger class — ek instance poori app ke logs handle kare."
          commonMistakes={[
            { mistake: 'Singleton ko overuse karna (global state become karta hai)', why: 'Testing difficult ho jaata hai — sab tests same instance share karte hain', fix: 'Dependency injection prefer karo — singleton sirf truly global resources ke liye' },
          ]}
          proTip="TypeScript 4.2+ mein abstract constructors hain: abstract new() syntax. Modern TypeScript mein Singleton se zyada dependency injection use karo — testability bahut better hoti hai."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="ts-classes" />
    </div>
  )
}
