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
          Classes & OOP in TypeScript — Encapsulation Ka Asli Matlab
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          JavaScript mein classes hain — lekin access modifiers nahi the. TypeScript ne woh gap fill kiya. private, protected, readonly — ye sirf keywords nahi, ye <strong className="text-[#F5F5F7]">encapsulation ka enforcement</strong> hai. Sochte hain: BankAccount ka balance koi seedha access nahi kar sakta — sirf deposit/withdraw methods se. TypeScript ensure karta hai ye rule kabhi break na ho.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ek important baat yaad rakho: TypeScript private compile-time check hai — runtime pe technically accessible hai. Truly private ke liye JavaScript # syntax use karo. Aur abstract classes — sirf extend ho sakti hain, instantiate nahi. Kyun? Template method pattern ke liye — base mein common logic, subclass mein variation. Samjhenge sab andar.
        </p>
      </div>

      <div id="access-modifiers">
        <ConceptCard
          title="Access Modifiers — public, private, protected"
          emoji="🔒"
          difficulty="intermediate"
          whatIsIt="Access modifiers — TypeScript ka encapsulation mechanism. public: sabke liye, default hai. private: sirf is class ke andar. protected: is class aur subclasses mein. readonly: set karo but change mat karo. Compiler ka perspective: ye rules compile time pe enforce hoti hain — galat access karo toh JavaScript file generate hi nahi hoti."
          whenToUse={[
            'public: sabke liye accessible (default)',
            'private: sirf us class ke andar accessible',
            'protected: us class aur subclasses mein accessible',
            'readonly: set karne ke baad change nahi ho sakta',
          ]}
          whyUseIt="Ek real problem sochte hain: acc.balance = 99999 — JavaScript mein ye perfectly valid hai. TypeScript private ke saath? Compile error. Yahi encapsulation ka fayda hai — implementation details hide, public API expose. Koi bhi directly balance change nahi kar sakta, sirf deposit/withdraw ke through. Bank ki real duniya jaisa — teller ke through transaction, directly vault access nahi."
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
            explanation: 'acc.balance = 99999 — compile error! acc.id = "new-id" — compile error! Ye TypeScript enforced contracts hain. SecureAccount mein # syntax — ye JavaScript native privacy hai, truly private, runtime pe bhi accessible nahi. Production sensitive data ke liye # prefer karo — TypeScript private compile-time only hai.',
            filename: 'access-modifiers.ts',
          }}
          realWorldScenario="DatabaseService class mein connection pool private rakho, query method public. Koi bhi directly pool ko manipulate nahi kar sakta — sirf execute() ya transaction() ke through. Ye ensures ek entry point hai — connection management centralized, bugs isolated. Real production code yahi karta hai."
          commonMistakes={[
            { mistake: 'TypeScript private aur JavaScript # private confuse karna', why: 'TypeScript private compile time check hai — runtime pe accessible hai. # truly private hai', fix: 'Sensitive data ke liye # (JavaScript private fields) use karo' },
          ]}
          proTip="Ye important distinction yaad rakho: TypeScript private = compile-time check, JavaScript private (#) = runtime enforcement. Passwords, tokens, sensitive data ke liye hamesha # use karo. TypeScript private developer experience ke liye hai — consumers ko galti se access karne se rokne ke liye. Real security ke liye # mandatory hai."
        />
      </div>

      <div id="abstract-classes">
        <ConceptCard
          title="Abstract Classes — Template Methods Pattern"
          emoji="🎭"
          difficulty="intermediate"
          whatIsIt="Abstract class ek incomplete blueprint hai — directly use nahi kar sakte, sirf extend kar sakte ho. Abstract methods force karte hain subclass mein implement karo. Template method pattern ke liye perfect: base class mein algorithm ka flow fix karo, steps abstract rakho — subclass apna implementation de. Compiler guarantee karta hai koi abstract method miss nahi hoga."
          whenToUse={[
            'Jab common implementation share karni ho lekin subclass-specific behavior bhi ho',
            'Template method pattern implement karna ho',
            'Partial implementation provide karni ho',
          ]}
          whyUseIt="Sawaal: interface aur abstract class mein kyun choose karun? Interface sirf contract hai — koi code share nahi hota. Abstract class mein concrete methods bhi hote hain — shared implementation plus forced customization. Use karo jab 'is-a' relationship ho aur common code share karna ho. Dog IS-AN Animal — abstract class. Dog CAN-DO Serialization — interface."
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
            explanation: 'new Animal("Generic") — compile error! Abstract class direct instantiate nahi hoti. Dog aur Cat makeSound() implement karte hain — compiler check karta hai. DataExporter mein template method pattern: export() ka flow fixed hai (processData → format → addHeaders), sirf steps abstract hain. Subclass flow change nahi kar sakta, sirf steps customize kar sakta hai.',
            filename: 'abstract-classes.ts',
          }}
          realWorldScenario="Database repository pattern — abstract BaseRepository mein findAll(), findById(), save(), delete() abstract methods. PostgresRepo aur MongoRepo dono extend karte hain — implementation alag, interface same. Service layer BaseRepository type ka use karta hai — underlying database change karo, service layer untouched. Ye abstraction ka real power hai."
          commonMistakes={[
            { mistake: 'Abstract class ko interface ki jagah use karna', why: 'Abstract class inheritance hierarchy create karta hai — ye tight coupling hai', fix: 'Interface prefer karo contract ke liye, abstract class sirf jab shared implementation truly chahiye' },
          ]}
          proTip="Abstract classes tight coupling create karte hain — inheritance hierarchy ek design decision hai jo baad mein change karna mushkil hota hai. Prefer composition over inheritance. Abstract class sirf jab truly 'is-a' relationship ho aur shared implementation genuinely zaroorat ho. Interface + multiple small classes aksar better design hoti hai."
        />
      </div>

      <div id="implements">
        <ConceptCard
          title="implements — Interface Ko Enforce Karo"
          emoji="✅"
          difficulty="intermediate"
          whatIsIt="implements se class ek guaranteed contract follow karta hai. Jab class Serializable implements karta hai — TypeScript checklist banata hai: serialize() hai? deserialize() hai? Ek bhi miss karo — compile error, class incomplete hai. Ek aur powerful feature: ek class multiple interfaces implement kar sakti hai — class UserService implements Serializable, Loggable, Cacheable."
          whenToUse={[
            'Class ko specific interface ka contract satisfy karna ho',
            'Multiple interfaces implement karni hon (multiple implements)',
            'Duck typing verify karna ho compile time pe',
          ]}
          whyUseIt="Interface update karo — nayi method add karo — TypeScript immediately batayega kaunsi classes contract fulfill nahi kar rahi. Manual search nahi, grep nahi — compiler khud bolta hai. Ye refactoring safety hai. 20 classes ek interface implement karti hain, interface change karo — 20 errors immediate. Zero silently broken code."
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
            explanation: 'Point class dekho — constructor(public readonly x: number, public readonly y: number). Sirf itna likhne se x aur y automatically public readonly properties ban gayi. this.x = x alag se likhna nahi pada. Ye parameter property shorthand hai — boilerplate minimum, readability maximum.',
            filename: 'implements.ts',
          }}
          realWorldScenario="Plugin system banao — interface Plugin { initialize(): Promise<void>; teardown(): Promise<void>; name: string }. Koi bhi plugin class ye implement kare. Plugin manager sirf Plugin[] array rakhta hai — actual class types nahi jaanta. Naya plugin add karo, existing system untouched. Open/closed principle in action."
          commonMistakes={[
            { mistake: 'implements aur extends confuse karna', why: 'extends: class se inherit karo. implements: interface ka contract fulfill karo', fix: 'class Dog extends Animal implements Runnable — dono alag hain' },
          ]}
          proTip="Parameter properties ek habit banao — constructor(private readonly db: Database, private logger: Logger) se zero boilerplate. readonly injection ke liye perfect — dependency inject ho, change na ho. NestJS jaisi frameworks internally yahi pattern use karti hain har service class mein."
        />
      </div>

      <div id="static-members">
        <ConceptCard
          title="Static Members & Singleton Pattern"
          emoji="🏛️"
          difficulty="intermediate"
          whatIsIt="Static members class ke instances se belong nahi karte — class khud ka state hota hai. Matlab 100 instances bano ya 1000 — static member ek hi hai, shared. Singleton pattern isi pe based hai: private constructor — directly new se ban nahi sakta — aur static getInstance() method — ek hi instance guaranteed."
          whenToUse={[
            'Factory methods (static create())',
            'Singleton pattern',
            'Class-level constants',
            'Utility methods jo instance state na use karein',
          ]}
          whyUseIt="Config class sochte hain — poori app mein ek hi config chahiye, multiple instances nahi. Singleton guarantee karta hai Config.getInstance() hamesha same object return kare. config === config2 true — yahi singleton ka proof hai. Ek common warning: singletons testing mein painful hote hain — global state. Dependency injection better approach hai production mein."
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
            explanation: 'Private constructor ka matlab: new Config() likhne se compile error. Sirf Config.getInstance() se instance mile. First call pe create hota hai, baad ke calls pe same instance return hoti hai. Static isProduction() factory method hai — class pe call karo, instance ki zaroorat nahi. TypeScript static members ko class ke naam se access karta hai, this se nahi.',
            filename: 'static-members.ts',
          }}
          realWorldScenario="Database connection pool singleton pattern mein perfect hai — connections expensive hain, ek pool poori app share kare. Logger bhi classic singleton example hai. Lekin real production apps mein — dependency injection frameworks (NestJS, inversify) singleton lifecycle manage karte hain, manual Singleton class likhne ki zaroorat nahi hoti usually."
          commonMistakes={[
            { mistake: 'Singleton ko overuse karna (global state become karta hai)', why: 'Testing difficult ho jaata hai — sab tests same instance share karte hain', fix: 'Dependency injection prefer karo — singleton sirf truly global resources ke liye' },
          ]}
          proTip="Singleton overuse mat karo — global state testing ka dushman hai. Har test same instance share kare toh test isolation gone. Iska alternative: module-level exports — Node.js mein module cache karta hai, effectively singleton behavior milti hai bina explicit pattern ke. Simple aur testable."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="ts-classes" />
    </div>
  )
}
