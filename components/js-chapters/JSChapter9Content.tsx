'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const quizQuestions = [
  {
    question: 'JavaScript mein class kya hai internally?',
    options: [
      { text: 'Java/C++ jaisi real class system', correct: false, explanation: 'JavaScript mein true class-based inheritance nahi hai — prototype-based hai.' },
      { text: 'Prototype-based inheritance par syntactic sugar — internally prototypes hi use hote hain', correct: true, explanation: 'Bilkul sahi! class keyword prototype system ke upar clean syntax provide karta hai — fundamentally wahi prototypes hain.' },
      { text: 'ES2015 mein aaya bilkul naya system', correct: false, explanation: 'ES2015 mein class aaya lekin naya system nahi banaya — sirf existing prototype system ka cleaner syntax.' },
      { text: 'Performance ke liye special optimization', correct: false, explanation: 'Classes sirf syntax sugar hain — no special performance optimization.' },
    ],
  },
  {
    question: 'super() constructor mein kyun call karna padta hai extends ke saath?',
    options: [
      { text: 'Performance ke liye optional hai', correct: false, explanation: 'Sirf optional nahi — required hai!' },
      { text: 'Parent class ka constructor call karta hai — this available karne ke liye', correct: true, explanation: 'Sahi! Derived class mein super() call karne se pehle this access karna ReferenceError hai — super() this initialize karta hai.' },
      { text: 'Parent class ke static methods access karne ke liye', correct: false, explanation: 'Static methods ChildClass.parentMethod() se access hote hain, super() alag hai.' },
      { text: 'Sirf async classes mein required hai', correct: false, explanation: 'super() sab derived class constructors mein required hai, async ya nahi.' },
    ],
  },
  {
    question: 'instanceof operator kya check karta hai?',
    options: [
      { text: 'Variable ka typeof', correct: false, explanation: 'typeof alag operator hai — string return karta hai.' },
      { text: 'Object ki prototype chain mein constructor ka prototype exist karta hai ya nahi', correct: true, explanation: 'Sahi! obj instanceof Foo checks if Foo.prototype exists anywhere in obj\'s prototype chain.' },
      { text: 'Object mein specific property exist karne ko', correct: false, explanation: 'Property existence ke liye "key" in obj ya Object.hasOwn() hai.' },
      { text: 'Object same reference hai ya nahi', correct: false, explanation: 'Reference comparison ke liye === use karo.' },
    ],
  },
  {
    question: 'Private fields (#) JavaScript classes mein kya provide karte hain?',
    options: [
      { text: 'Performance improvement', correct: false, explanation: 'Performance benefit negligible hai — encapsulation ke liye hai.' },
      { text: 'True encapsulation — class ke bahar accessible hi nahi, koi workaround nahi', correct: true, explanation: 'Bilkul! # prefix se field truly private hoti hai — prototype tricks se bhi access nahi. Language-level enforcement.' },
      { text: 'Read-only fields banana', correct: false, explanation: 'Read-only ke liye getter define karo bina setter ke. # private access control hai.' },
      { text: 'Static methods banana', correct: false, explanation: 'Static ke liye static keyword hai. # privacy ke liye hai.' },
    ],
  },
  {
    question: 'Object.getPrototypeOf() kya return karta hai?',
    options: [
      { text: 'Object ki sab properties ki list', correct: false, explanation: 'Properties ke liye Object.keys() hai.' },
      { text: 'Object ke immediate prototype (parent) object ka reference', correct: true, explanation: 'Sahi! Object.getPrototypeOf(obj) === ClassName.prototype — prototype chain explore karne ka modern way.' },
      { text: 'Object ki class ka naam', correct: false, explanation: 'Class naam ke liye obj.constructor.name use karo.' },
      { text: 'Object ka JSON representation', correct: false, explanation: 'JSON ke liye JSON.stringify() hai.' },
    ],
  },
]

// ── Main Component ────────────────────────────────────────────────────────────

export default function JSChapter9Content() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div
        id="intro"
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3">
          Prototypes & Classes — Objects Ka Deep Dive
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          JavaScript mein inheritance alag tarah hoti hai Java ya C++ se. Koi real class nahi hai — sab kuch prototype chain pe based hai. ES6 classes ek cleaner syntax deti hain lekin internally wahi prototypes hain. Ye samajhna advanced JavaScript mastery ke liye essential hai.
        </p>
        <div
          className="rounded-xl p-4 mt-4"
          style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)' }}
        >
          <p className="text-sm text-[#A1A1AA]">
            <span className="text-[#F59E0B] font-semibold">Intermediate chapter!</span> Prototype chain, constructor functions, ES6 classes, inheritance, static methods, getters/setters, private fields (#) — sab cover hoga. Interview prep ke liye bahut important.
          </p>
        </div>
      </div>

      {/* Card 1: Prototype Chain */}
      <div id="prototype-chain">
        <ConceptCard
          title="Prototype Chain — Property Lookup"
          emoji="🔗"
          difficulty="intermediate"
          whatIsIt="Har JavaScript object ke paas ek hidden property hoti hai — [[Prototype]] (accessible as __proto__ ya Object.getPrototypeOf()). Jab property access karo, JS pehle object pe dhundta hai. Nahi mila? Prototype pe jaata hai. Phir prototype ka prototype. Jab tak null nahi milta. Yahi prototype chain hai — inheritance ka mechanism."
          whenToUse={[
            'Methods shared karne ke liye — sab instances ek hi prototype pe methods share karte hain',
            'Object.getPrototypeOf() se prototype chain inspect karne ke liye',
            'hasOwnProperty vs in operator — own vs inherited properties',
            'instanceof se type checking — prototype chain lookup karta hai',
          ]}
          whyUseIt="Prototype chain memory efficient hai — methods har instance pe copy nahi hote, prototype pe ek hi copy hoti hai. Ye samajhna bugs prevent karta hai — prototype pe add karo toh sab instances pe available. Classes internally yahi karte hain — constructor.prototype pe methods add karte hain."
          howToUse={{
            filename: 'prototype-chain.js',
            language: 'javascript',
            code: `// Every object has a prototype
const obj = { name: 'Rahul' }

// obj --> Object.prototype --> null (end of chain)
Object.getPrototypeOf(obj) === Object.prototype  // true
Object.getPrototypeOf(Object.prototype)          // null — end!

// Property lookup chain
const animal = {
  breathe() { return 'Breathing...' },
  isAlive: true,
}

const dog = Object.create(animal)  // dog's prototype = animal
dog.name = 'Bruno'
dog.bark = function() { return 'Woof!' }

// Lookup chain: dog --> animal --> Object.prototype --> null
dog.name    // 'Bruno' — found on dog
dog.bark()  // 'Woof!' — found on dog
dog.breathe() // 'Breathing...' — found on animal (prototype)
dog.isAlive   // true — found on animal
dog.toString() // found on Object.prototype

// Check if property is own or inherited
Object.hasOwn(dog, 'name')    // true — own property
Object.hasOwn(dog, 'breathe') // false — inherited
'breathe' in dog              // true — checks chain too

// instanceof — checks prototype chain
dog instanceof Object  // true — Object.prototype in chain

// Visualize chain
let proto = dog
while (proto !== null) {
  console.log(proto)
  proto = Object.getPrototypeOf(proto)
}
// dog object
// { breathe: f, isAlive: true } (animal)
// {} (Object.prototype)
// null

// Modifying prototype — affects all instances!
animal.eat = function() { return 'Eating...' }
dog.eat()  // 'Eating...' — immediately available!`,
            explanation: 'Prototype chain property lookup: own properties first, phir prototype chain. Object.create(proto) se specify karo prototype. hasOwnProperty/Object.hasOwn sirf own properties check karta hai, in operator chain check karta hai. Prototype modify karo toh sab instances immediately affected hote hain.',
          }}
          realWorldScenario="Array ke methods (.map, .filter, .reduce) sab Array.prototype pe hain — har array instance unhe inherit karta hai. String methods similarly String.prototype pe hain. Ye memory efficient design hai — millions of strings same String.prototype share karte hain. Prototype mein monkey-patching (built-ins modify karna) production mein kabhi nahi karna chahiye."
          commonMistakes={[
            {
              mistake: 'Built-in prototypes modify karna — Array.prototype.customMethod = ...',
              why: "Monkey-patching: agar future JS ya koi library same name use kare toh conflict. Production mein strict no!",
              fix: 'Utility functions alag file mein rakhho, prototype extend mat karo. Subclass banao agar genuinely extend karna hai.',
            },
            {
              mistake: '__proto__ directly use karna',
              why: '__proto__ deprecated accessor hai — non-standard aur slow in some engines.',
              fix: 'Object.getPrototypeOf(obj) aur Object.setPrototypeOf(obj, proto) use karo. Ya Object.create() se create karo.',
            },
          ]}
          proTip="Object.create(null) se pure dictionary banao — koi prototype chain nahi, toString/hasOwnProperty jaise methods interfere nahi karte. Config maps, caches, event maps ke liye perfect."
        />
      </div>

      {/* Card 2: Constructor Functions */}
      <div id="constructor-functions">
        <ConceptCard
          title="Constructor Functions — new Keyword"
          emoji="🏗️"
          difficulty="intermediate"
          whatIsIt="ES6 classes se pehle, constructor functions se objects banate the. Naming convention: PascalCase. new keyword se call karo — empty object create hota hai (this), function run hota hai, prototype set hota hai, object return hota hai. Constructor.prototype pe methods add karne se sab instances share karte hain. Ye hi classes internally karte hain."
          whenToUse={[
            'Legacy code samajhne ke liye — bahut purani codebases constructors use karti hain',
            'Class ke vs constructor internals samajhne ke liye',
            'Low-level: kab class zyada appropriate hai samajhna',
            'Interview: "class internally kaise kaam karta hai" question ke liye',
          ]}
          whyUseIt="Constructor functions samajhna classes ke internals reveal karta hai. new keyword kya karta hai exactly jaanna prototype chain mastery ke liye critical hai. Legacy Node.js code mein ye pattern bahut milega. Aaj classes prefer karo lekin ye samajhna important hai."
          howToUse={{
            filename: 'constructor-functions.js',
            language: 'javascript',
            code: `// Constructor function — PascalCase convention
function Person(name, age) {
  // 'new' ke saath call hone par:
  // 1. Empty object banata hai: {}
  // 2. this = {} set karta hai
  this.name = name  // 3. Properties assign karta hai
  this.age = age
  // 4. Object return karta hai (implicit)
}

// Methods — prototype pe rakhho, not inside constructor
// (otherwise har instance ka alag copy hoga — memory waste)
Person.prototype.greet = function() {
  return \`Hi, I'm \${this.name}, \${this.age} years old\`
}

Person.prototype.birthday = function() {
  this.age++
}

// new keyword se instantiation
const rahul = new Person('Rahul', 25)
const priya = new Person('Priya', 28)

rahul.greet()  // "Hi, I'm Rahul, 25 years old"
priya.greet()  // "Hi, I'm Priya, 28 years old"

// Methods prototype pe share hote hain — same reference
rahul.greet === priya.greet  // true! Same function in prototype

// What 'new' does internally:
function customNew(Constructor, ...args) {
  const instance = Object.create(Constructor.prototype) // 1. Create object with prototype
  const result = Constructor.apply(instance, args)      // 2. Run constructor with this = instance
  return typeof result === 'object' && result !== null  // 3. Return object if constructor returns one
    ? result
    : instance
}

const aman = customNew(Person, 'Aman', 22)
aman.greet()  // "Hi, I'm Aman, 22 years old"

// instanceof check
rahul instanceof Person  // true
rahul instanceof Object  // true — Object.prototype in chain

// Constructor function check
rahul.constructor === Person  // true`,
            explanation: 'new keyword 4 steps karta hai: empty object create, this bind, constructor run, object return. Methods prototype pe rakhne se memory save hoti hai — sab instances ek hi function reference share karte hain. customNew function internally new ki mechanics demonstrate karta hai.',
          }}
          realWorldScenario="Node.js EventEmitter class constructor function internally use karta hai. Express request/response objects constructor functions se banate the. DOM APIs (XMLHttpRequest, etc.) constructor functions use karte hain. Legacy jQuery plugins constructors use karte hain. Ye pattern everywhere milega legacy code mein."
          commonMistakes={[
            {
              mistake: "Constructor ko new ke bina call karna",
              why: 'Person("Rahul", 25) bina new ke — this global object (window/global) hoga! name, age global ban jaayenge.',
              fix: "Constructor ke andar check: if (!(this instanceof Person)) return new Person(name, age). Ya classes use karo — strict mode mein this undefined hota hai bina new ke.",
            },
            {
              mistake: 'Methods constructor ke andar define karna — this.method = function() {}',
              why: 'Har instance ke saath new function create hoti hai — 1000 instances = 1000 copies of the same function.',
              fix: 'Methods Constructor.prototype pe define karo. Ya class syntax use karo jo automatically prototype pe dalta hai.',
            },
          ]}
          proTip="new.target meta-property se check karo ki function new ke saath call hua ya nahi: function Foo() { if (!new.target) throw new Error('Use new!'); }. Classes automatically ye enforce karti hain."
        />
      </div>

      {/* Card 3: ES6 Classes */}
      <div id="es6-classes">
        <ConceptCard
          title="ES6 Classes — Modern Syntax"
          emoji="🏛️"
          difficulty="intermediate"
          whatIsIt="ES6 classes JavaScript mein object-oriented programming ka cleaner syntax provide karte hain — prototype-based system ke upar. class keyword, constructor(), methods, static methods, getters, setters. Classes hoist nahi hote (TDZ mein hote hain let ki tarah). class body automatically strict mode mein hota hai. Methods non-enumerable hote hain."
          whenToUse={[
            'Multiple similar objects banana — same structure, shared methods',
            'Object-oriented patterns: encapsulation, inheritance',
            'Frameworks: React class components (legacy), Angular, custom Node.js modules',
            'Clean API: clear constructor, public methods, getters/setters',
          ]}
          whyUseIt="Classes readability dramatically improve karte hain — blueprint clearly defined hai. Methods automatically prototype pe jaate hain. Inheritance extends aur super se clean aur readable. Private fields (#) true encapsulation dete hain. Modern JavaScript mein classes standard pattern hain complex object modeling ke liye."
          howToUse={{
            filename: 'classes.js',
            language: 'javascript',
            code: `class BankAccount {
  // Private fields (ES2022)
  #balance
  #transactionHistory

  // Static property
  static interestRate = 0.04

  constructor(owner, initialBalance = 0) {
    this.owner = owner        // public
    this.#balance = initialBalance  // private!
    this.#transactionHistory = []
  }

  // Getter — computed property-like access
  get balance() {
    return this.#balance
  }

  // Setter — with validation
  set balance(amount) {
    if (typeof amount !== 'number' || amount < 0) {
      throw new Error('Invalid amount')
    }
    this.#balance = amount
  }

  // Instance methods
  deposit(amount) {
    if (amount <= 0) throw new Error('Invalid deposit')
    this.#balance += amount
    this.#transactionHistory.push({ type: 'deposit', amount, date: new Date() })
    return this
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error('Insufficient funds')
    this.#balance -= amount
    this.#transactionHistory.push({ type: 'withdrawal', amount, date: new Date() })
    return this  // method chaining!
  }

  // Static method — called on class, not instance
  static calculateInterest(balance, years) {
    return balance * (1 + BankAccount.interestRate) ** years - balance
  }

  // Private method
  #formatCurrency(amount) {
    return \`₹\${amount.toLocaleString('en-IN')}\`
  }

  toString() {
    return \`Account[\${this.owner}]: \${this.#formatCurrency(this.#balance)}\`
  }
}

const account = new BankAccount('Rahul', 10000)
account.deposit(5000).withdraw(2000)  // method chaining
account.balance  // 13000 — via getter
// account.#balance  // SyntaxError! Private!

BankAccount.calculateInterest(10000, 5)  // static method
// account.calculateInterest(...)  // TypeError! Static, not on instance`,
            explanation: 'Private fields (#) true encapsulation provide karte hain — class ke bahar access impossible hai. Getter/setter property-like access with validation dete hain. Method chaining return this se enable hota hai. Static methods class-level utility functions hain. toString() override karo custom representation ke liye.',
          }}
          realWorldScenario="Node.js mein: class Database, class ApiClient, class Queue — sab common patterns hain. React (legacy): class components. TypeScript ke saath: interfaces + classes powerful type-safe OOP. Mongoose models internally class-like patterns use karte hain. Express Router bhi internally class hai."
          commonMistakes={[
            {
              mistake: 'this context class methods mein loose karna',
              why: 'const { method } = instance; method() — this undefined in strict mode!',
              fix: 'Ya bind: this.method = this.method.bind(this) constructor mein. Ya arrow function field: method = () => {}.',
            },
            {
              mistake: 'Class aur instance ki static vs instance confusion',
              why: 'ClassName.staticMethod() — class pe. instance.staticMethod() — TypeError! Static methods instances pe nahi hote.',
              fix: 'Static methods hamesha class name se call karo. Instances ke liye instance methods define karo.',
            },
          ]}
          proTip="Arrow function as class field (stage 3 proposal, widely supported) automatically this bind karta hai: class Counter { count = 0; increment = () => { this.count++ } }. Event listeners aur callbacks ke liye perfect — no bind() needed."
          demo={
            <DiffBlock
              title="Constructor Function vs ES6 Class"
              language="javascript"
              bad={{
                code: `// Old constructor function way
function Animal(name, sound) {
  this.name = name
  this.sound = sound
}
Animal.prototype.speak = function() {
  return this.name + ' says ' + this.sound
}
Animal.prototype.toString = function() {
  return 'Animal: ' + this.name
}
// Static method workaround
Animal.create = function(name, sound) {
  return new Animal(name, sound)
}`,
                label: 'Constructor Function — Verbose',
                explanation: 'Prototype assignments scattered — hard to read and maintain',
              }}
              good={{
                code: `// ES6 Class — clean and readable
class Animal {
  constructor(name, sound) {
    this.name = name
    this.sound = sound
  }

  speak() {
    return \`\${this.name} says \${this.sound}\`
  }

  toString() {
    return \`Animal: \${this.name}\`
  }

  static create(name, sound) {
    return new Animal(name, sound)
  }
}`,
                label: 'ES6 Class — Clean Blueprint',
                explanation: 'Sab ek jagah — readable, maintainable, modern',
              }}
            />
          }
        />
      </div>

      {/* Card 4: Inheritance */}
      <div id="inheritance">
        <ConceptCard
          title="Inheritance — extends & super"
          emoji="👨‍👦"
          difficulty="intermediate"
          whatIsIt="ES6 mein inheritance extends keyword se hoti hai. super() parent constructor call karta hai — required before this in derived class. super.method() parent class ka method call karta hai. Child class parent class ke sab methods inherit karta hai aur override kar sakta hai. Prototype chain automatically set hoti hai. Multi-level inheritance bhi possible hai."
          whenToUse={[
            'Specialized types banana — Vehicle → Car → ElectricCar',
            'Shared behavior parent mein, specialized behavior child mein',
            'Framework base classes extend karna — React.Component, Error subclassing',
            'Avoid deep inheritance hierarchies — 2-3 levels max, composition prefer karo',
          ]}
          whyUseIt="Inheritance code reuse enable karta hai — parent mein common code, child mein specialization. Custom errors subclassing Error se powerful error handling enable karta hai. But: 'Prefer composition over inheritance' — zyada complex hierarchies maintenance nightmare hain. Mixins aur composition often better hain deep inheritance se."
          howToUse={{
            filename: 'inheritance.js',
            language: 'javascript',
            code: `class Vehicle {
  #fuel

  constructor(make, model, fuelType = 'petrol') {
    this.make = make
    this.model = model
    this.#fuel = fuelType
    this.speed = 0
  }

  accelerate(amount) {
    this.speed += amount
    return this
  }

  brake(amount) {
    this.speed = Math.max(0, this.speed - amount)
    return this
  }

  get info() {
    return \`\${this.make} \${this.model} (\${this.#fuel})\`
  }
}

// Child class — extends Vehicle
class Car extends Vehicle {
  #doors

  constructor(make, model, doors = 4) {
    super(make, model, 'petrol')  // MUST call super first!
    this.#doors = doors
    this.isAutomatic = false
  }

  get doors() { return this.#doors }

  // Override parent method
  get info() {
    return \`\${super.info} — \${this.#doors} doors\`
  }
}

// Grandchild class
class ElectricCar extends Car {
  #batteryCapacity

  constructor(make, model, batteryKwh) {
    super(make, model, 4)  // Calls Car constructor
    this.#batteryCapacity = batteryKwh
  }

  get range() {
    return this.#batteryCapacity * 6  // km per kWh estimate
  }

  get info() {
    return \`\${super.info} — Electric, \${this.#batteryCapacity}kWh\`
  }
}

const tesla = new ElectricCar('Tesla', 'Model 3', 75)
tesla.accelerate(60).accelerate(30)
tesla.speed    // 90
tesla.range    // 450 km
tesla.info     // 'Tesla Model 3 (petrol) — 4 doors — Electric, 75kWh'
tesla instanceof ElectricCar  // true
tesla instanceof Car          // true
tesla instanceof Vehicle      // true

// Custom Error classes — most useful pattern!
class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL') {
    super(message)  // Sets this.message
    this.name = this.constructor.name  // 'AppError'
    this.statusCode = statusCode
    this.code = code
  }
}

class ValidationError extends AppError {
  constructor(field, message) {
    super(message, 400, 'VALIDATION_ERROR')
    this.field = field
  }
}

class NotFoundError extends AppError {
  constructor(resource) {
    super(\`\${resource} not found\`, 404, 'NOT_FOUND')
    this.resource = resource
  }
}

// Usage
try {
  throw new ValidationError('email', 'Invalid email format')
} catch (err) {
  if (err instanceof ValidationError) {
    console.log(err.field)      // 'email'
    console.log(err.statusCode) // 400
  }
}`,
            explanation: 'super() derived class constructor mein this use karne se pehle call karna mandatory hai. Custom Error subclassing most valuable inheritance use case hai — type-safe error handling, specific fields, HTTP status codes. instanceof prototype chain mein check karta hai — isliye tesla instanceof Vehicle true hai.',
          }}
          realWorldScenario="Express.js error handling: class DatabaseError extends AppError, class AuthError extends AppError — Express mein centralized error handler type check karta hai. Node.js EventEmitter extend karna: class MyEmitter extends EventEmitter {}. React class components: class MyComponent extends React.Component — legacy but still seen."
          commonMistakes={[
            {
              mistake: 'super() call bhool jaana derived constructor mein',
              why: 'ReferenceError: Must call super constructor before accessing this — this initialized nahi hota.',
              fix: 'Derived class constructor mein hamesha super(...args) pehle line par call karo.',
            },
            {
              mistake: 'Deep inheritance hierarchy — 5+ levels',
              why: 'Understanding difficult, debugging nightmare, tightly coupled — change parent = break children.',
              fix: 'Maximum 2-3 levels. Composition over inheritance prefer karo — mixins ya has-a relationship. "Favor composition over inheritance" — GoF principle.',
            },
          ]}
          proTip="Custom Error classes production code mein essential hain. Express mein: err.statusCode se HTTP response code, err.code se machine-readable error, err.message se user message. Type-safe error handling: if (err instanceof ValidationError) — much better than err.type === 'validation'."
        />
      </div>

      {/* Card 5: Static, Getters, Private */}
      <div id="static-getters-private">
        <ConceptCard
          title="Static, Getters/Setters & Private Fields"
          emoji="🔐"
          difficulty="intermediate"
          whatIsIt="Static members class pe hote hain, instances pe nahi — utility functions, factory methods, constants. Getters computed properties provide karte hain — obj.fullName property jaisa access. Setters controlled assignment — validation. Private fields (#) ES2022 — true encapsulation, class ke bahar syntactically impossible to access. Private methods bhi # se."
          whenToUse={[
            'static: factory methods (Animal.create()), utility functions, singleton pattern, class-level constants',
            'Getter: computed property — firstName + lastName = fullName, price calculation',
            'Setter: validation before assignment — type check, range check',
            'Private (#): internal state, helper methods, implementation details chhupana',
          ]}
          whyUseIt="Static factory methods constructors se more descriptive hote hain — User.fromJSON(data) vs new User(data.id, data.name, ...). Getters property-like API dete hain function call ke bina — this.balance instead of this.getBalance(). Private fields encapsulation enforce karte hain — koi bhi bypass nahi kar sakta unlike underscore convention."
          howToUse={{
            filename: 'static-getters-private.js',
            language: 'javascript',
            code: `class User {
  // Private instance fields
  #password
  #loginAttempts = 0

  // Static property (class-level)
  static MAX_LOGIN_ATTEMPTS = 5
  static #instances = 0  // private static!

  constructor(id, name, email) {
    this.id = id
    this.name = name
    this.email = email
    User.#instances++
  }

  // Static factory methods — named constructors
  static fromJSON(json) {
    const data = typeof json === 'string' ? JSON.parse(json) : json
    return new User(data.id, data.name, data.email)
  }

  static fromFormData(formData) {
    return new User(
      Date.now(),
      formData.get('name'),
      formData.get('email')
    )
  }

  // Static utility
  static count() { return User.#instances }

  // Getter — computed, no ()
  get displayName() {
    return \`\${this.name} <\${this.email}>\`
  }

  get isLocked() {
    return this.#loginAttempts >= User.MAX_LOGIN_ATTEMPTS
  }

  // Setter — with validation
  set password(raw) {
    if (raw.length < 8) throw new Error('Password too short')
    // In real code: hash it!
    this.#password = raw
  }

  // Private methods
  #resetAttempts() {
    this.#loginAttempts = 0
  }

  login(password) {
    if (this.isLocked) throw new Error('Account locked')

    if (password === this.#password) {
      this.#resetAttempts()  // private method call
      return { success: true }
    }

    this.#loginAttempts++
    return { success: false, remaining: User.MAX_LOGIN_ATTEMPTS - this.#loginAttempts }
  }
}

// Factory methods — more descriptive
const user1 = User.fromJSON('{"id":1,"name":"Rahul","email":"r@x.com"}')
const user2 = User.fromJSON({ id: 2, name: 'Priya', email: 'p@x.com' })

user1.displayName  // 'Rahul <r@x.com>' — getter, no ()
user1.password = 'SecurePass123'  // setter with validation
// user1.#password  // SyntaxError — private!

User.count()  // 2 — static method`,
            explanation: 'Static factory methods ("named constructors") User.fromJSON() cleaner API dete hain. Private fields (#) compile-time enforcement karte hain — underscore convention sirf polite request tha. Getters computed values ke liye cleaner hain — property access, function call nahi. Static private field (#instances) class-level private state hai.',
          }}
          realWorldScenario="Database model: User.findById(id) static method, User.create(data) factory. Config: Config.getInstance() singleton pattern. React store: Store.getState() static. Mongoose model methods: User.find() static method hai internally. Payment SDK: Payment.fromWebhook(payload) named constructor."
          commonMistakes={[
            {
              mistake: 'Static method instance pe call karna',
              why: 'user.fromJSON(data) — TypeError: user.fromJSON is not a function. Static instance pe nahi hota.',
              fix: 'User.fromJSON(data) — class name se call karo static methods.',
            },
            {
              mistake: 'Getter ke liye () lagana',
              why: 'user.displayName() — TypeError: user.displayName is not a function. Getter property jaisa access hota hai.',
              fix: 'user.displayName — bina parentheses ke. Getter automatically execute hota hai.',
            },
          ]}
          proTip="Singleton pattern with static: class Config { static #instance; static getInstance() { if (!Config.#instance) Config.#instance = new Config(); return Config.#instance; } }. Private static field ensures ek hi instance. Database connections, configuration, loggers ke liye common pattern."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 9 Quiz — Prototypes & Classes
          </h3>
          <p className="text-sm text-[#71717A]">5 questions — 80%+ chahiye clear karne ke liye!</p>
        </div>
        <QuizSection questions={quizQuestions} chapterSlug="prototypes-classes" />
      </div>
    </div>
  )
}
