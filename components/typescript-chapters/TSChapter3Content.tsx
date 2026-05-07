'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const tsChapter3Quiz: QuizQuestion[] = [
  {
    question: 'TypeScript mein optional parameter kaise likhte hain?',
    options: [
      { text: 'param = undefined likhke', correct: false, explanation: 'Ye default parameter hai — optional parameter ? se likha jaata hai.' },
      { text: 'param? likhke colon se pehle', correct: true, explanation: 'Sahi! function greet(name?: string) — naam ke baad ? lagao. Optional params hamesha required params ke baad aate hain.' },
      { text: 'optional param likhke', correct: false, explanation: 'optional keyword TypeScript mein nahi hota. ? use karo.' },
      { text: 'param: undefined likhke', correct: false, explanation: 'param: undefined matlab value hamesha undefined hogi — optional nahi, type restriction hai.' },
    ],
  },
  {
    question: 'void return type kya indicate karta hai?',
    options: [
      { text: 'Function crash ho jaayega', correct: false, explanation: 'void se crash indicate nahi hota — function normally run karta hai, sirf return value nahi hota.' },
      { text: 'Function koi meaningful value return nahi karta', correct: true, explanation: 'Sahi! void bolta hai function side effects karta hai — console.log, DOM update, etc. Return value use nahi karna chahiye.' },
      { text: 'Function async hai', correct: false, explanation: 'Async functions ke liye Promise<void> likho. void sirf synchronous side-effect functions ke liye.' },
      { text: 'Function null return karta hai', correct: false, explanation: 'void undefined jaisa hai — null alag type hai TypeScript mein.' },
    ],
  },
  {
    question: 'Function overloads kya hote hain TypeScript mein?',
    options: [
      { text: 'Ek function ke multiple implementations', correct: false, explanation: 'Overloads mein ek hi implementation hoti hai — sirf multiple type signatures hote hain.' },
      { text: 'Ek function ke multiple type signatures jo alag inputs pe alag outputs describe karein', correct: true, explanation: 'Bilkul! Overload signatures function ke different calling patterns describe karte hain. Implementation sabko handle karta hai internally.' },
      { text: 'Function jo overwrite ho sakta hai subclass mein', correct: false, explanation: 'Woh method overriding hai — overloading se alag concept.' },
      { text: 'Default parameters wale functions', correct: false, explanation: 'Default params aur overloads alag features hain. Overloads alag type signatures define karte hain.' },
    ],
  },
  {
    question: 'Rest parameters ka type annotation kaise karte hain?',
    options: [
      { text: '...args: string', correct: false, explanation: 'Rest parameters array hote hain — type mein [] lagana zaroori hai.' },
      { text: '...args: string[]', correct: true, explanation: 'Sahi! ...args: string[] — three dots phir parameter naam phir colon phir array type. Rest params ko hamesha array type do.' },
      { text: 'args[]: string', correct: false, explanation: 'Ye valid TypeScript syntax nahi hai. ...args: string[] likhna hai.' },
      { text: 'Array<args: string>', correct: false, explanation: 'Ye valid syntax nahi hai. ...args: string[] ya ...args: Array<string> use karo.' },
    ],
  },
]

export default function TSChapter3Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(49,120,198,0.06)',
          border: '1px solid rgba(49,120,198,0.25)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Functions in TypeScript — Function Signature = Contract
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Functions TypeScript mein ek CONTRACT ban jaate hain — parameter types guarantee karte hain caller sahi arguments pass kare, return type guarantee karta hai caller ko kya milega. Socho function signature ek legal document hai: tum ye do, main woh dunga. Galat diya — TypeScript court mein complaint kar deta hai (compile error).
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein ek interesting pattern bhi seekhenge — function overloads. Ek function, multiple signatures. TypeScript samajhta hai input ke hisaab se kya return type aayega. Ye real-world library design mein bahut kaam aata hai — aur samajhne ke baad bahut elegant lagta hai.
        </p>
      </div>

      <div id="typed-params">
        <ConceptCard
          title="Typed Parameters & Return — Function Contract"
          emoji="📝"
          difficulty="beginner"
          whatIsIt="TypeScript mein function parameters ke baad : type likho — function add(a: number, b: number). Return type function signature ke baad aata hai — function add(a: number, b: number): number. Compiler ka perspective samajhte hain: jab tum ye function call karo aur wrong type pass karo, TypeScript compilation roka deta hai — JavaScript generate hi nahi hoti jab tak error fix na ho. Ye enforcement mechanism hai, document nahi."
          whenToUse={[
            'Sab public functions — parameter aur return types annotate karo',
            'Complex return types — inference se readability kam ho',
            'Callbacks — caller ko pata ho kya pass karna hai',
            'Higher-order functions — function types explicitly define karo',
          ]}
          whyUseIt="Ek real scenario: 6 mahine pehle tumne function likha, aaj koi aur use kar raha hai. JavaScript mein: wrong arguments pass karo — runtime crash. TypeScript mein: IDE mein function call karo, parameter names aur types automatically dikhte hain. Docs padhne ki zaroorat nahi, function signature khud bol raha hai. Ye 'living documentation' hai — code ke saath update hoti hai, README ki tarah outdated nahi hoti."
          howToUse={{
            filename: 'typed-functions.ts',
            language: 'typescript',
            code: `// ── BASIC FUNCTION TYPES ─────────────────────────────────────
function add(a: number, b: number): number {
  return a + b
}

function greet(name: string): string {
  return \`Namaste, \${name}!\`
}

function logUser(name: string, age: number): void {
  console.log(\`\${name} is \${age} years old\`)
  // return undefined is fine, return 'something' is error
}

// ── ARROW FUNCTIONS ───────────────────────────────────────────
const multiply = (x: number, y: number): number => x * y
const double = (n: number): number => n * 2
const isEven = (n: number): boolean => n % 2 === 0

// Type inference works for arrow functions too
const square = (n: number) => n * n  // TypeScript infers: number

// ── FUNCTION TYPE SIGNATURE ───────────────────────────────────
// Type alias for a function type
type MathOperation = (a: number, b: number) => number
type StringTransform = (s: string) => string
type Predicate<T> = (value: T) => boolean

// Use function type as parameter
function applyOperation(a: number, b: number, op: MathOperation): number {
  return op(a, b)
}

applyOperation(10, 5, add)       // 15
applyOperation(10, 5, multiply)  // 50
// applyOperation(10, 5, greet)  // TS Error! greet is not MathOperation

// ── CALLBACK FUNCTIONS ────────────────────────────────────────
function processItems<T>(
  items: T[],
  callback: (item: T, index: number) => void
): void {
  items.forEach(callback)
}

processItems(['Rahul', 'Priya', 'Amit'], (name, idx) => {
  console.log(\`\${idx + 1}. \${name}\`)
})

// ── HIGHER ORDER FUNCTIONS ────────────────────────────────────
function createMultiplier(factor: number): (n: number) => number {
  return (n: number) => n * factor
}

const double2 = createMultiplier(2)
const triple = createMultiplier(3)

console.log(double2(5))   // 10
console.log(triple(5))    // 15

// ── OBJECT PARAMETER ──────────────────────────────────────────
interface CreateUserOptions {
  name: string
  email: string
  age: number
  role?: 'admin' | 'user'  // optional
}

function createUser(options: CreateUserOptions): CreateUserOptions & { id: string } {
  return {
    ...options,
    id: Math.random().toString(36).slice(2),
    role: options.role ?? 'user',  // default value
  }
}

const newUser = createUser({ name: 'Rahul', email: 'r@test.com', age: 25 })
// newUser.id: string — TypeScript knows id exists!`,
            explanation: 'Ek pattern note karo: MathOperation type alias se applyOperation function mein op parameter typed hai. Galat function pass karo — compile error. Ye callback type safety hai — higher order functions mein bahut zaroori. createMultiplier closure return karta hai — return type (n: number) => number explicitly likha hai, ambiguity zero.',
          }}
          realWorldScenario="Express middleware likhte hain — (req: Request, res: Response, next: NextFunction): void. TypeScript guarantee karta hai ye function koi value return nahi karta — agar accidentally kuch return kiya toh compile error. Real benefit: next() call karna bhool jao, TypeScript nahi pakad sakta — but wrong argument type dena immediately pakad jaata hai. Safety net real hai."
          commonMistakes={[
            {
              mistake: 'Return type annotate karna bhool jana complex functions mein',
              why: 'Inference sometimes wrong hoti hai — especially conditional returns wale functions mein.',
              fix: 'Complex functions mein explicit return type likho. Simple utilities mein inference pe rely karo.',
            },
            {
              mistake: 'Function type aur function value confuse karna',
              why: 'type Add = (a: number, b: number) => number function type hai. function add(a, b) { } function value hai. Different syntax.',
              fix: 'Type mein arrow (=>) syntax. Implementation mein regular function syntax. Dono type-compatible hone chahiye.',
            },
          ]}
          proTip="Ek advanced pattern — this parameter type: function greet(this: User): string. Caller galat context pe call kare toh compile error. Ye JavaScript ka this problem TypeScript mein type-safe banata hai. Utility type OmitThisParameter se this remove kar sakte ho — method ko detached function ke roop mein use karo safely."
        />
      </div>

      <div id="optional-default">
        <ConceptCard
          title="Optional & Default Params — Flexible Functions"
          emoji="🎛️"
          difficulty="beginner"
          whatIsIt="Optional (?) aur default (=) — dono parameters ko optional banate hain lekin dono ka use case alag hai. Optional (?) matlab: caller pass kare ya na kare, agar nahi kiya toh value undefined hogi — aur tum function ke andar check karo. Default (= value) matlab: caller pass na kare toh fallback value use ho. Ek important rule jo bahut log miss karte hain — optional/default params HAMESHA required params ke BAAD aane chahiye."
          whenToUse={[
            'Optional: Kuch settings rarely change — user define kar sake par default bhi kaam kare',
            'Default: Sensible fallback values hain — explicitly pass karna optional ho',
            'APIs jahan backward compatibility maintain karni ho — naye params optional karo',
            'Configuration objects mein most fields optional hote hain',
          ]}
          whyUseIt="Real code mein APIs design karte waqt — backward compatibility ek common concern hai. Nayi functionality add karni hai? New optional parameter add karo — purani calls kaam karti rehti hain. Koi breaking change nahi. Aur default params se function body clean rehti hai — andar if (!param) check likhna nahi padta, function signature mein hi default define hai. Clean aur readable."
          howToUse={{
            filename: 'optional-default-params.ts',
            language: 'typescript',
            code: `// ── OPTIONAL PARAMETERS (?) ──────────────────────────────────
function greet(name: string, title?: string): string {
  if (title) {
    return \`Namaste, \${title} \${name}!\`
  }
  return \`Namaste, \${name}!\`
}

greet('Rahul')           // 'Namaste, Rahul!'
greet('Sharma', 'Dr.')   // 'Namaste, Dr. Sharma!'
// greet()               // TS Error! name is required

// Optional param type is string | undefined
function processTitle(title?: string): string {
  // title is: string | undefined
  return title?.toUpperCase() ?? 'NO TITLE'  // Optional chaining!
}

// ── DEFAULT PARAMETERS ────────────────────────────────────────
function createButton(
  label: string,
  type: 'button' | 'submit' | 'reset' = 'button',
  disabled: boolean = false
): object {
  return { label, type, disabled }
}

createButton('Click Me')                      // { label, type: 'button', disabled: false }
createButton('Submit', 'submit')              // { label, type: 'submit', disabled: false }
createButton('Disabled', 'button', true)      // { label, type: 'button', disabled: true }

// Default pe parameter type infer hota hai — annotation optional
function delay(ms: number = 1000) {  // ms: number (inferred from default)
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ── COMBINING OPTIONAL & DEFAULT ──────────────────────────────
function sendEmail(
  to: string,                     // required
  subject: string,                // required
  body: string = '',              // default: empty string
  cc?: string[],                  // optional: undefined by default
  priority: 'low' | 'high' = 'low' // default: 'low'
): Promise<boolean> {
  console.log({ to, subject, body, cc, priority })
  return Promise.resolve(true)
}

// Multiple ways to call:
sendEmail('rahul@test.com', 'Hello')
sendEmail('priya@test.com', 'Meeting', 'Please join')
sendEmail('amit@test.com', 'Urgent', 'Critical issue', ['boss@test.com'], 'high')

// ── DESTRUCTURING WITH DEFAULTS ───────────────────────────────
interface UserOptions {
  name: string
  age?: number
  role?: 'admin' | 'user'
}

function setupUser({ name, age = 18, role = 'user' }: UserOptions): string {
  return \`\${name} (age: \${age}, role: \${role})\`
}

setupUser({ name: 'Rahul' })                           // "Rahul (age: 18, role: user)"
setupUser({ name: 'Admin', age: 30, role: 'admin' })   // "Admin (age: 30, role: admin)"`,
            explanation: 'sendEmail function dekho — required params pehle (to, subject), phir defaults (body = ""), phir optional (cc?). Ye ordering rule follow karo. Destructuring mein defaults: { name, age = 18, role = "user" } — caller sirf name de, baaki defaults se aa jaate hain. Ye configuration objects ke liye perfect pattern hai.',
          }}
          realWorldScenario="Pagination API design karo: function getUsers(page: number = 1, limit: number = 20, search?: string). Frontend wala getUsers() call kare — first page, 20 results. Admin wala getUsers(3, 100, 'rahul') — custom pagination with search. Same function, multiple use cases, TypeScript sab ensure karta hai. Backward compatible by default."
          commonMistakes={[
            {
              mistake: 'Required params ke pehle optional params rakhna',
              why: 'function foo(opt?: string, required: string) — TS Error! Required params first.',
              fix: 'Required params pehle, optional/default params baad mein. Hamesha is order mein.',
            },
            {
              mistake: 'Optional param pe undefined check bhoolna',
              why: 'function greet(title?: string) { title.toUpperCase() } — runtime crash agar title undefined ho.',
              fix: 'if (title) check karo, ya optional chaining use karo: title?.toUpperCase(). Strict null checks ensure karenge ye.',
            },
          ]}
          proTip="Classes mein ek next-level trick hai — constructor parameter properties: class User { constructor(public name: string, private age: number = 0) {} }. Constructor params pe public/private lagao — automatically class properties ban jaate hain, this.name = name alag se likhna nahi padta. Boilerplate drastically kam hoti hai. Chapter 5 mein detail mein dekhenge!"
        />
      </div>

      <div id="overloads">
        <ConceptCard
          title="Function Overloads — Ek Function, Multiple Signatures"
          emoji="🔀"
          difficulty="advanced"
          whatIsIt="Overloads ek interesting concept hai — ek function ke multiple type signatures. Jab tum string doge toh string milega, number doge toh number milega. TypeScript automatically infer karta hai kaunsi signature match ho rahi hai. Key baat: overload signatures (no body, pehle likhte hain) aur implementation signature (body hai, last mein) alag hote hain. Caller sirf overload signatures dekhta hai — implementation hidden rehti hai."
          whenToUse={[
            'Function jo string input pe string return kare, number pe number — type safe',
            'Optional params based pe alag return type',
            'Library functions jahan caller experience polish karna ho',
            'jQuery jaisi APIs — $(selector) string ya element accept kare',
          ]}
          whyUseIt="Problem samajhte hain: agar string | number return likhdo toh caller ko pata nahi kya expect karna hai. String diya — string | number milega? Ya guaranteed string? Overloads ye ambiguity khatam karte hain — 'string diya toh string milega, number diya toh number milega' — perfect precision. IDE mein bhi exact return type dikhta hai based on what you pass."
          howToUse={{
            filename: 'function-overloads.ts',
            language: 'typescript',
            code: `// ── BASIC OVERLOADS ──────────────────────────────────────────
// Overload signatures (no body)
function process(input: string): string
function process(input: number): number
// Implementation signature (has body — not directly callable by user)
function process(input: string | number): string | number {
  if (typeof input === 'string') {
    return input.toUpperCase()
  }
  return input * 2
}

const result1 = process('hello')  // TypeScript knows: string
const result2 = process(42)       // TypeScript knows: number
// const result3 = process(true)  // TS Error! No overload for boolean

// ── OVERLOADS WITH OPTIONAL PARAMS ───────────────────────────
function createElement(tag: 'a'): HTMLAnchorElement
function createElement(tag: 'div'): HTMLDivElement
function createElement(tag: 'span'): HTMLSpanElement
function createElement(tag: string): HTMLElement {
  return document.createElement(tag)
}

const anchor = createElement('a')    // HTMLAnchorElement — .href available!
const div = createElement('div')     // HTMLDivElement
const span = createElement('span')   // HTMLSpanElement

// ── PRACTICAL EXAMPLE: Format Function ───────────────────────
function formatDate(date: Date): string
function formatDate(date: Date, format: 'short'): string
function formatDate(date: Date, format: 'long'): string
function formatDate(date: Date, format: 'timestamp'): number
function formatDate(date: Date, format?: 'short' | 'long' | 'timestamp'): string | number {
  if (format === 'timestamp') {
    return date.getTime()
  }
  if (format === 'long') {
    return date.toLocaleDateString('hi-IN', { dateStyle: 'full' })
  }
  return date.toLocaleDateString('hi-IN', { dateStyle: 'short' })
}

const d = new Date()
const short: string = formatDate(d, 'short')         // string
const ts: number = formatDate(d, 'timestamp')         // number
const def: string = formatDate(d)                     // string

// ── OVERLOADS IN INTERFACES ───────────────────────────────────
interface Transformer {
  (input: string): string
  (input: number): string
  (input: boolean): string
}

const stringify: Transformer = (input: string | number | boolean): string => {
  return String(input)
}

// ── REST PARAMS WITH TYPED OVERLOADS ─────────────────────────
function combine(a: string, b: string): string
function combine(a: number, b: number): number
function combine(a: string | number, b: string | number): string | number {
  if (typeof a === 'string' && typeof b === 'string') {
    return a + b
  }
  return (a as number) + (b as number)
}

const strResult = combine('Hello, ', 'World')  // string: 'Hello, World'
const numResult = combine(10, 20)              // number: 30`,
            explanation: "formatDate example dekho — timestamp format doge toh number milega, date format doge toh string. Caller ke liye exact types, no ambiguity. Implementation mein union types hain — flexible. Lekin caller ke perspective se: clean, precise. createElement('a') pe HTMLAnchorElement milta hai — .href property available immediately. Yahi overloads ka power hai.",
          }}
          realWorldScenario="jQuery $ function sochte hain — $('div') DOM element return karta hai, $(function) ready callback ke roop mein use hota hai. Dono same $ function, alag input pe alag behavior. Overloads se ye precisely type kiya ja sakta hai — TypeScript input type dekh ke exact return type jaanta hai. Real library design yahi karta hai."
          commonMistakes={[
            {
              mistake: 'Implementation signature direct call karna',
              why: 'Implementation signature overload signatures se hidden hai — external callers use nahi kar sakte.',
              fix: 'Implementation signature sirf internal use ke liye. Overload signatures define karo caller ke liye.',
            },
            {
              mistake: 'Overloads jab simple union type kaafi ho',
              why: 'Overloads complex hote hain — zyada code, zyada maintenance.',
              fix: 'Sirf overloads use karo jab input type se output type mapped ho. Simple cases mein union types zyada clean hain.',
            },
          ]}
          proTip="Ek rule yaad rakho: overloads sirf jab zaroorat ho. Agar simple union type kaam karta hai — use karo, overloads avoid karo. Overloads jab input type se output type mapped ho aur ye relationship precisely express karna ho. Zyada overloads = zyada complexity = zyada maintenance. Simplicity always wins."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 3 Quiz — Functions in TypeScript
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — typed functions ka knowledge check karo!
          </p>
        </div>
        <QuizSection questions={tsChapter3Quiz} chapterSlug="ts-functions" />
      </div>
    </div>
  )
}
