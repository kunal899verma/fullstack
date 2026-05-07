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
          Prototypes & Classes — JavaScript Ki Sachchi Kahani
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ek shocking statement se shuru karte hain: Classes JavaScript mein exist hi nahi karti — ye sirf syntactic sugar hai! Ye sunke shocking lagta hai, lekin ye sach hai. JavaScript ek prototype-based language hai. Har object ke paas ek hidden [[Prototype]] link hota hai jo doosre object ko point karta hai. Yahi inheritance ka real mechanism hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          ES6 class keyword ne code likhna easy kiya — lekin engine ke andar wahi prototype chain chal rahi hai. Ye samajhna zaroori hai kyunki interviews mein poochha jaata hai, bugs prototype misunderstanding se aate hain, aur Node.js ke core modules isi pe based hain.
        </p>
        <div
          className="rounded-xl p-4 mt-4"
          style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)' }}
        >
          <p className="text-sm text-[#A1A1AA]">
            <span className="text-[#F59E0B] font-semibold">Interview ka hot topic!</span> Prototype chain, constructor functions, ES6 classes, inheritance, private fields (#) — sab cover hoga. Har concept mein ye poochha jaata hai: "internally kaise kaam karta hai?" Ab tum answer de paoge.
          </p>
        </div>
      </div>

      {/* Card 1: Prototype Chain */}
      <div id="prototype-chain">
        <ConceptCard
          title="Prototype Chain — Property Lookup"
          emoji="🔗"
          difficulty="intermediate"
          whatIsIt="Har JavaScript object ke paas ek hidden secret hota hai — [[Prototype]] — ek invisible link jo doosre object ko point karta hai. Jab tum dog.breathe() call karte ho aur dog pe breathe nahi hai, JS engine rukta nahi — wo chain ke upar jaata hai. dog ka [[Prototype]] animal hai, animal pe breathe hai — mil gaya! Animal ke [[Prototype]] Object.prototype hai. Object.prototype ke [[Prototype]] null hai — chain khatam. Sawaal: ye chain kab tak jaati hai? Jawab: jab tak null nahi milta — agar null tak pohunch ke bhi nahi mila toh undefined return hota hai (property access ke liye) ya ReferenceError (variable ke liye). Yahi prototype chain hai — JavaScript ka real inheritance mechanism!"
          whenToUse={[
            'Methods memory-efficient share karne ke liye — sab instances ek hi prototype pe methods share karte hain, copies nahi',
            'Object.getPrototypeOf() se chain inspect karo — debugging aur understanding ke liye',
            'hasOwnProperty vs in operator — own vs inherited properties check karna',
            'instanceof se type checking — prototype chain lookup karta hai',
          ]}
          whyUseIt="Prototype chain memory efficient hai — agar 1000 User objects hain, methods har ek mein copy nahi hote, sirf User.prototype pe ek copy. Sab 1000 objects same functions share karte hain! Ye samajhna bugs prevent karta hai — prototype modify karo toh sab existing instances turant affect hote hain. Classes internally yahi karte hain — isliye 'classes exist nahi karti' ka matlab samajh aata hai."
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
            explanation: 'Trace karo: dog.breathe() call hota hai → dog mein breathe nahi → animal (dog ka prototype) mein dhundhta hai → milta hai! dog.isAlive → animal mein milta hai. dog.toString() → Object.prototype mein milta hai. Chain: dog → animal → Object.prototype → null. Object.hasOwn(dog, "breathe") false — inherited hai, own nahi. "breathe" in dog true — chain search karta hai. Prototype modify karo (animal.eat add kiya) → dog.eat() turant work karta hai!',
          }}
          realWorldScenario="Array ke methods (.map, .filter, .reduce) sab Array.prototype pe hain — har array instance unhe inherit karta hai. String methods String.prototype pe hain. Agar millions of strings create karo, sab same String.prototype share karte hain — ek hi copy memory mein. JavaScript engine ne ye memory optimization prototype chain se achieve kiya. Built-in prototypes monkey-patch karna production mein kabhi mat karo — future conflicts guaranteed."
          commonMistakes={[
            {
              mistake: 'Array.prototype ya Object.prototype mein custom methods add karna',
              why: "Monkey-patching: agar future JavaScript version ya koi library same naam use kare toh conflict. Native methods override ho sakti hain — silent bugs.",
              fix: 'Utility functions alag file mein likhho. Genuinely extend karna hai toh subclass banao — class MyArray extends Array {}.',
            },
            {
              mistake: '__proto__ directly use karna',
              why: '__proto__ deprecated accessor hai — non-standard hai, kuch engines mein slow bhi. Avoid karo.',
              fix: 'Object.getPrototypeOf(obj) use karo read ke liye. Object.create(proto) use karo creation ke time pe. Object.setPrototypeOf() runtime mein set karna bahut slow hai — avoid karo.',
            },
          ]}
          proTip="Sawaal: Object.create(null) kab use karte hain? Jawab: jab pure dictionary chahiye — koi prototype chain nahi, toString/hasOwnProperty jaise inherited methods interfere nahi karte. Key-value stores, caches, event maps ke liye perfect. 'key' in obj bhi safe hai — inherited methods se collision nahi. Ye pattern Node.js internals mein use hota hai."
        />
      </div>

      {/* Card 2: Constructor Functions */}
      <div id="constructor-functions">
        <ConceptCard
          title="Constructor Functions — new Keyword"
          emoji="🏗️"
          difficulty="intermediate"
          whatIsIt="Classes aane se pehle JavaScript mein objects kaise banate the? Constructor functions se! Naming convention: PascalCase. Ab most important concept: new keyword kya karta hai exactly? 4 steps hain — (1) ek naya empty object create karta hai, (2) us object ka [[Prototype]] constructor.prototype pe set karta hai, (3) constructor function run karta hai with this = naya object, (4) woh naya object return karta hai. Ye 4 steps yaad karo — interview mein 'new keyword kya karta hai?' poocha jaata hai! Constructor function class ka poorvaj hai — class internally yahi karta hai, bas cleaner syntax se."
          whenToUse={[
            'Legacy code samajhne ke liye — purani Node.js codebases constructors heavily use karti hain',
            'Classes ke internals samajhne ke liye — class = constructor + prototype, internally yahi hai',
            'Interview mein: "class internally kaise kaam karta hai?" — ye answer do',
            'new keyword ka exact behavior samajhna — ye critical knowledge hai',
          ]}
          whyUseIt="Constructor functions samajhna classes ke dark room ko illuminate karta hai. new keyword ka 4-step process jaanna prototype chain mastery ke liye critical hai. Ye bhi samajh aata hai ki new ke bina constructor call karna kyun dangerous hai — this global object ban jaata hai! Legacy Node.js, Express source code, aur DOM APIs isi pattern pe built hain — ye dekhoge production mein."
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
            explanation: 'customNew dekhao — new ki exact mechanics expose karta hai: Object.create(Constructor.prototype) se naya object banata hai aur prototype link set karta hai, phir Constructor.apply(instance, args) se constructor run karta hai. Yahi new karta hai internally! Methods prototype pe hain — rahul.greet === priya.greet true hai — same function reference! Ek hi copy memory mein. constructor mein methods define karo — 1000 instances mein 1000 copies. prototype pe define karo — 1 copy, sab share karte hain.',
          }}
          realWorldScenario="Node.js EventEmitter class constructor function pe based hai. Express ka req, res objects constructor functions se banate the. DOM APIs jaise XMLHttpRequest, WebSocket constructors use karte hain. jQuery internally constructor functions heavily use karta hai. Production Node.js code mein ye pattern milega — ab tum read kar paoge."
          commonMistakes={[
            {
              mistake: "Constructor ko new keyword ke bina call karna",
              why: 'Person("Rahul", 25) bina new ke — this global object ban jaata hai (window browser mein, global Node.js mein)! name, age global variables ban jaate hain — pollution!',
              fix: "Constructor ke andar guard rakhho: if (!(this instanceof Person)) return new Person(name, age). Ya modern classes use karo — strict mode mein this undefined hota hai bina new ke — automatically safe.",
            },
            {
              mistake: 'Methods constructor ke andar define karna — this.greet = function() {}',
              why: 'Har new call pe naya function object create hota hai. 1000 instances = 1000 separate greet functions memory mein — waste!',
              fix: 'Methods hamesha Constructor.prototype pe define karo. Ya class syntax use karo — methods automatically prototype pe jaate hain.',
            },
          ]}
          proTip="new.target meta-property se check karo ki function new ke saath call hua ya nahi: function Person() { if (!new.target) throw new Error('Use new keyword!'); }. Classes automatically ye enforce karti hain — bina new ke call karo toh TypeError. Interview mein: 'new.target kya hai?' — ek hi line mein answer: 'constructor ya method reference jo new ya super ke saath call hua ho, warna undefined.'"
        />
      </div>

      {/* Card 3: ES6 Classes */}
      <div id="es6-classes">
        <ConceptCard
          title="ES6 Classes — Modern Syntax"
          emoji="🏛️"
          difficulty="intermediate"
          whatIsIt="ES6 classes — yaad rakho ye SYNTAX SUGAR hain, naya mechanism nahi! Lekin bahut useful sugar hai. class keyword se sab kuch ek jagah aa jaata hai — constructor, methods, getters, setters, static members. Classes hoist nahi hote (TDZ mein hote hain let ki tarah). class body automatically strict mode mein hota hai. Methods non-enumerable hote hain — for...in loop mein nahi dikhte. Private fields (#) ES2022 mein aaye — true encapsulation. Sawaal: class ke methods instance ka hissa hain ya prototype ka? Jawab: prototype ka! Instance pe copy nahi hote — memory efficient hai."
          whenToUse={[
            'Multiple similar objects banana — same structure, shared methods — class perfect blueprint hai',
            'Object-oriented patterns: encapsulation (private #), inheritance (extends)',
            'Custom modules aur Node.js services: class UserService, class DatabaseClient',
            'Clean API design: constructor clearly shows required data, getters/setters validation dete hain',
          ]}
          whyUseIt="Classes blueprint jaisi hain — ek jagah sab clearly defined. Methods automatically prototype pe jaate hain — memory efficient. Private fields (#) true encapsulation dete hain — koi bhi class ke bahar se access nahi kar sakta, koi workaround nahi. Method chaining (return this) se fluent API ban sakti hai. Modern JavaScript mein classes standard pattern hain."
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
            explanation: 'Trace karo: #balance private field — class ke bahar account.#balance karo toh SyntaxError compile time pe (not runtime)! Getter balance use karo — property jaisa access, () nahi lagana. Setter mein validation — automatically run hota hai assign karne pe. Method chaining: deposit().withdraw() — ye isliye kaam karta hai kyunki har method return this karta hai. Static calculateInterest — class pe call hota hai, instance pe nahi. #formatCurrency private method — class ke andar hi use ho sakta hai.',
          }}
          realWorldScenario="Node.js production code mein: class DatabaseClient, class QueueService, class CacheManager — sab common patterns hain. TypeScript ke saath: interfaces + classes powerful type-safe OOP milti hai. Mongoose models internally class-like patterns use karte hain. Express Router internally class hai. React class components legacy hain lekin aaj bhi production mein milte hain."
          commonMistakes={[
            {
              mistake: 'this context class methods mein loose karna — detached methods',
              why: 'const { deposit } = account; deposit(100) — this undefined in strict mode! Method class se detach hua toh this lost.',
              fix: 'Constructor mein bind karo: this.deposit = this.deposit.bind(this). Ya arrow function field: deposit = (amount) => { this.#balance += amount }. Arrow function ka this lexically bound hai.',
            },
            {
              mistake: 'Static method instance pe call karna',
              why: 'account.calculateInterest(10000, 5) — TypeError! Static methods instances pe nahi hote — sirf class pe hote hain.',
              fix: 'BankAccount.calculateInterest(10000, 5) — class name se call karo. Rule: static = class ka kaam, instance methods = object ka kaam.',
            },
          ]}
          proTip="Arrow function as class field JavaScript mein automatic this binding deta hai: class Counter { count = 0; increment = () => { this.count++ } }. Increment ko event listener mein pass karo bina bind ke — this hamesha Counter instance rahega. React class components mein ye pattern bahut common tha. Aaj functional components preferred hain — lekin ye knowledge zaroori hai."
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
          whatIsIt="extends keyword se ek class doosri class ki functionality inherit karti hai. Lekin ye bhi internally prototype chain hai! Child.prototype ka [[Prototype]] Parent.prototype ko point karta hai — chain extend hoti hai. super() — ye child constructor mein mandatory hai this use karne se PEHLE. Kyunki? Kyunki parent constructor hi this object initialize karta hai derived class ke liye. Bina super() ke this access karo toh ReferenceError. super.method() se parent ka overridden method call kar sakte ho. Most useful inheritance pattern: Custom Error classes! Error extend karo aur statusCode, field jaise properties add karo."
          whenToUse={[
            'Specialized types banana — Vehicle → Car → ElectricCar — shared base, unique specialization',
            'Custom Error classes — sabse practical inheritance use case production mein',
            'Framework base classes extend karna — React.Component extend karna (legacy), EventEmitter extend karna',
            'Deep hierarchies avoid karo — 2-3 levels max. Composition often better hai',
          ]}
          whyUseIt="Inheritance se code reuse hota hai — common behavior parent mein, specialization child mein. Custom Error classes production code mein essential hain — instanceof check se specific errors differently handle karo. Lekin warning: 'Prefer composition over inheritance' — deep hierarchies maintenance nightmare hain. Agar-warna relationship hai toh inheritance, agar has-a relationship hai toh composition prefer karo."
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
            explanation: 'tesla instanceof ElectricCar true — direct. tesla instanceof Car true — prototype chain mein Car.prototype hai. tesla instanceof Vehicle true — chain mein Vehicle.prototype bhi hai. tesla instanceof Object true — sab objects. Yahi prototype chain ka power hai! Custom Error classes: ValidationError mein super(message) se Error ka message set hua, statusCode extra property hai. Express route mein: if (err instanceof ValidationError) res.status(err.statusCode) — type-safe, clean!',
          }}
          realWorldScenario="Express.js production pattern: class DatabaseError extends AppError, class AuthError extends AppError — centralized error handler mein type check karo. Node.js EventEmitter extend: class MyEventBus extends EventEmitter {} — custom events add karo base ke upar. React class components (legacy): class MyComponent extends React.Component — ye aaj bhi existing codebases mein milte hain."
          commonMistakes={[
            {
              mistake: 'Derived constructor mein super() call bhoolna',
              why: "ReferenceError: Must call super constructor before accessing 'this' — this toh parent ne initialize karna tha!",
              fix: 'Derived class constructor mein pehli meaningful line super(...args) honi chahiye. this access karne se pehle hamesha.',
            },
            {
              mistake: '5+ level deep inheritance hierarchy banana',
              why: 'Ek level change karo — sab neeche break ho jaata hai. Testing nightmare. Debugging impossible. Technical debt ka raja.',
              fix: '2-3 levels max. Composition prefer karo — class Car { engine = new Engine() } — has-a relationship. Mixins use karo shared behavior ke liye. GoF principle: "Favor composition over inheritance."',
            },
          ]}
          proTip="Custom Error classes production ka most valuable inheritance pattern hain. Express middleware mein: err.statusCode se HTTP response code, err.code se machine-readable identifier, err.field se validation feedback. if (err instanceof ValidationError) return res.status(400).json(...) — ek line mein type-safe handling. Ye pattern apnao — generic Error.message string matching se bahut better hai!"
        />
      </div>

      {/* Card 5: Static, Getters, Private */}
      <div id="static-getters-private">
        <ConceptCard
          title="Static, Getters/Setters & Private Fields"
          emoji="🔐"
          difficulty="intermediate"
          whatIsIt="Static, getters/setters, aur private fields (#) — teen powerful class features jo professional code mein daily use hote hain. Static: class pe hote hain, instances pe nahi. Factory methods: User.fromJSON(data) — new User(...) se descriptive. Getters: computed property jaisa access — obj.fullName bina () ke. Setters: validation before assignment. Private fields (#): ES2022 feature — true encapsulation — syntactically impossible to access outside class. Ye underscore convention (_private) nahi hai — ye LANGUAGE LEVEL enforcement hai. Koi bhi workaround nahi!"
          whenToUse={[
            'static: factory methods (User.fromJSON()), utility functions, singleton pattern, class-level constants',
            'Getter: computed property — firstName + lastName = fullName, balance calculation',
            'Setter: validation before assignment — type check, range check, format check',
            'Private (#): internal state chhupana, helper methods, implementation details — true encapsulation',
          ]}
          whyUseIt="Static factory methods named constructors hain — User.fromJSON(data) vs new User(data.id, data.name, ...) — zyada readable, descriptive. Getters property-like API dete hain bina function call ke — this.balance pehle this.getBalance() tha. Private fields guarantee karte hain implementation detail leak nahi hogi — underscore convention sirf polite tha, # actual enforcement hai. Ye professional JavaScript hai."
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
            explanation: 'User.fromJSON() — named constructor hai, new User(data.id, data.name, data.email) se cleaner. User.fromFormData() — dono factory methods, alag sources se create karte hain. user1.displayName — getter hai, () nahi lagana! user1.isLocked — getter hai, computed value. user1.password = "abc" — setter run hoga, 8 char check. user1.#password — SyntaxError — private field outside class! User.#instances — private static, class ka secret counter. User.count() — static method, class pe call.',
          }}
          realWorldScenario="Database ORM: User.findById(id) static method, User.create(data) factory method. Config singleton: Config.getInstance() — poori app mein ek hi instance. Mongoose models: User.find() internally static method hai. Payment SDK: Payment.fromWebhook(payload) named constructor — webhook data se payment object banana. Node.js Logger: Logger.getInstance() singleton — poori app ek hi logger use kare."
          commonMistakes={[
            {
              mistake: 'Static method instance pe call karna',
              why: 'user.fromJSON(data) — TypeError: user.fromJSON is not a function. Static methods instances pe exist nahi karte.',
              fix: 'User.fromJSON(data) — class name se call karo. Mental model: static = class ka kaam, instance methods = object ka kaam.',
            },
            {
              mistake: 'Getter ke baad () lagana — method samajh lena',
              why: 'user.displayName() — TypeError: user.displayName is not a function. Getter property jaisa access hota hai.',
              fix: 'user.displayName — bina parentheses. Getter access karo toh automatically execute hota hai. TypeScript mein type checking ye galti pakadti hai.',
            },
          ]}
          proTip="Singleton pattern with private static: class Config { static #instance; static getInstance() { if (!Config.#instance) Config.#instance = new Config(); return Config.#instance; } }. Private static field ensures sirf ek hi instance banta hai — agar dobara getInstance() karo toh same instance milta hai. Database connections, configuration objects, loggers — ye sab singleton pattern use karte hain production mein."
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
