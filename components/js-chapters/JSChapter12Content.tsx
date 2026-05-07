'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const es6Quiz: QuizQuestion[] = [
  {
    question: 'Optional chaining (?.) kab use karte hain?',
    options: [
      { text: 'Jab object definitely exist karta ho', correct: false, explanation: 'Agar definitely exist karta hai toh regular dot notation use karo.' },
      { text: 'Jab nested property access karna ho aur koi bhi level null/undefined ho sakta ho', correct: true, explanation: 'Bilkul! user?.address?.city se TypeErrors avoid hoti hain — agar koi bhi level null/undefined hai toh undefined return hota hai, error nahi.' },
      { text: 'Array methods ke liye', correct: false, explanation: 'Optional chaining objects aur functions par bhi kaam karta hai, lekin yahan context different hai.' },
      { text: 'Sirf TypeScript mein kaam karta hai', correct: false, explanation: 'Optional chaining ES2020 JavaScript feature hai — TypeScript mein bhi hai lekin JS mein bhi.' },
    ],
  },
  {
    question: 'Nullish coalescing (??) aur OR (||) mein kya fark hai?',
    options: [
      { text: 'Koi fark nahi, dono same hain', correct: false, explanation: 'Bahut important fark hai — falsy values treat karne ka.' },
      { text: '?? sirf null/undefined check karta hai; || saari falsy values (0, "", false) ke liye bhi fallback deta hai', correct: true, explanation: 'Sahi! count ?? 0 se count = 0 valid rakha jaata hai. count || 0 se 0 bhi replace ho jaata hai — bug!' },
      { text: '|| zyada modern hai', correct: false, explanation: '?? ES2020 mein aaya — newer hai.' },
      { text: '?? sirf strings ke liye kaam karta hai', correct: false, explanation: '?? kisi bhi type ke saath kaam karta hai.' },
    ],
  },
  {
    question: 'Rest parameters (...args) aur spread operator (...arr) mein kya fark hai?',
    options: [
      { text: 'Dono same hain, bas naam alag hai', correct: false, explanation: 'Syntax same hai lekin use case alag hai.' },
      { text: 'Rest: multiple values ko ek array mein collect karta hai; Spread: array/object ko values mein expand karta hai', correct: true, explanation: 'Perfect! Rest function parameters mein collect karta hai: function f(...args). Spread values expand karta hai: [...arr1, ...arr2].' },
      { text: 'Rest sirf arrays ke saath kaam karta hai', correct: false, explanation: 'Rest function parameters ke saath kaam karta hai, object destructuring mein bhi.' },
      { text: 'Spread sirf function calls mein use hota hai', correct: false, explanation: 'Spread array literals, object literals, aur function calls mein — teeno jagah use hota hai.' },
    ],
  },
  {
    question: 'structuredClone() kab use karte hain?',
    options: [
      { text: 'Shallow copy ke liye', correct: false, explanation: 'Shallow copy ke liye {...obj} ya Object.assign() use karte hain.' },
      { text: 'Nested objects ka deep clone banana ho bina JSON.parse(JSON.stringify()) ke', correct: true, explanation: 'Bilkul! structuredClone native deep clone hai — Dates, Sets, Maps bhi correctly clone karta hai jo JSON method nahi karta.' },
      { text: 'Functions clone karne ke liye', correct: false, explanation: 'structuredClone functions clone nahi kar sakta — TypeError throw karta hai.' },
      { text: 'Array.from() ka alternative hai', correct: false, explanation: 'Array.from() shallow conversion hai, structuredClone deep clone hai.' },
    ],
  },
  {
    question: 'Dynamic import() kab use karte hain?',
    options: [
      { text: 'Hamesha — static imports se better hai', correct: false, explanation: 'Static imports tree-shaking aur analysis ke liye better hote hain. Dynamic import special cases ke liye hai.' },
      { text: 'Jab module conditionally ya lazily load karna ho — code splitting ke liye', correct: true, explanation: 'Sahi! import() Promise return karta hai — route-based code splitting, lazy loading heavy libraries ke liye perfect.' },
      { text: 'Node.js mein require() ka replacement', correct: false, explanation: 'Node.js mein ESM static import use karo, dynamic import() specific use cases ke liye.' },
      { text: 'Sirf browser mein kaam karta hai', correct: false, explanation: 'Dynamic import() Node.js mein bhi kaam karta hai ESM modules ke saath.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function JSChapter12Content() {
  return (
    <div className="space-y-8">
      {/* Chapter intro */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(124,58,237,0.06)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Modern JavaScript (ES6+) — Ek Naya JavaScript Seekho
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          ES6 (2015) ne JavaScript ko badal diya — permanently. Usse pehle ka JS aur baad ka JS literally alag languages lagte hain. Destructuring, spread/rest, optional chaining, nullish coalescing — ye sab code ko cleaner, safer, aur zyada expressive banate hain. Modern production code — React apps, Node.js APIs — ye sab ES6+ features daily use karte hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Sawaal: kyun ye features important hain? Jawab: kyunki ye real problems solve karte hain jo developers daily face karte the — verbose object access, null checks, arguments handling, module organization. Har feature ek pain point ka solution hai — samajhoge toh immediately appreciate karoge!
        </p>
      </div>

      {/* ConceptCard 1 */}
      <div id="destructuring">
        <ConceptCard
          title="Destructuring — Values Unpack Karo"
          emoji="📦"
          difficulty="intermediate"
          whatIsIt="Destructuring — ek powerful syntax jo objects aur arrays se values seedha variables mein extract karta hai. Pehle ye kaam hota tha: const name = user.name; const age = user.age; — do lines, repetitive. Destructuring ke baad: const { name, age } = user — ek line, clean! Renaming bhi possible: const { name: userName } — collision avoid. Default values: const { salary = 50000 } — agar undefined ho toh default. Sawaal: nested destructuring ka practical use kab aata hai? Jawab: API responses mein — response.data.user.name instead of const { data: { user: { name } } } = response — ek line mein sab."
          whenToUse={[
            'Object se specific properties extract karne ho',
            'Array return karne wale functions — useState, useReducer',
            'Function parameters mein object unpack karne ho',
            'Nested data structures se deep values nikalne ho',
          ]}
          whyUseIt="Destructuring code DRY rakhta hai — bar bar obj.name, obj.age likhne ki zaroorat nahi. Renaming se naming conflicts avoid hote hain. Default values se undefined errors se protection milti hai. Function params mein destructuring APIs self-documenting banata hai."
          howToUse={{
            filename: 'destructuring.js',
            language: 'javascript',
            code: `// Object destructuring
const user = { name: 'Rahul', age: 25, city: 'Mumbai', role: 'dev' }

const { name, age } = user
console.log(name, age)  // 'Rahul' 25

// Rename karo
const { name: userName, city: userCity } = user
console.log(userName)   // 'Rahul'

// Default values
const { role, salary = 50000 } = user
console.log(salary)     // 50000 (user.salary undefined hai)

// Nested destructuring
const response = {
  data: {
    user: { name: 'Priya', address: { city: 'Delhi' } }
  },
  status: 200
}
const { data: { user: { name: apiName, address: { city } } }, status } = response
console.log(apiName, city, status)  // 'Priya' 'Delhi' 200

// Function parameters mein destructuring
function displayUser({ name, age, city = 'Unknown' }) {
  return \`\${name} (\${age}) from \${city}\`
}
displayUser(user)  // Clean API!

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5]
console.log(first, second, rest)  // 1 2 [3, 4, 5]

// Skip elements
const [,, third] = [1, 2, 3]
console.log(third)   // 3

// Swap variables
let a = 1, b = 2
;[a, b] = [b, a]
console.log(a, b)   // 2 1

// useState pattern (React) — array destructuring
const [count, setCount] = useState(0)`,
            explanation: 'Object destructuring variables directly banata hai. Renaming (:) collision avoid karta hai. Array destructuring position-based hai. Rest (...) baaki sab collect karta hai. Function params mein destructuring named parameters effect deta hai — order matter nahi karta!',
          }}
          realWorldScenario="API response handle karna: const { data: { users }, meta: { total, page } } = await fetchUsers(). Ek line mein nested response unpack — no more response.data.users ya response.meta.total. Clean aur readable!"
          commonMistakes={[
            {
              mistake: 'Undefined object ko destructure karna',
              why: 'const { name } = undefined — TypeError! API response aane se pehle destructure karo toh crash.',
              fix: 'Default value do: const { name } = user ?? {}. Ya optional chaining: user?.name.',
            },
            {
              mistake: 'Deeply nested destructuring overuse karna',
              why: 'Bahut deep nesting se code unreadable ho jaata hai aur refactoring painful.',
              fix: 'Ek level destructure karo, phir nested object se separately destructure karo.',
            },
          ]}
          proTip="Function return mein object return karo — caller destructure kar sakta hai jo chahiye. const { data, error, loading } = useFetch(url) — caller sirf jo chahiye woh lo, baaki ignore karo. Array return se order yaad rakhna padta hai — object return cleaner hai."
        />
      </div>

      {/* ConceptCard 2 */}
      <div id="spread-rest">
        <ConceptCard
          title="Spread & Rest — Flexibility Ka Mantra"
          emoji="🌊"
          difficulty="intermediate"
          whatIsIt="Spread aur rest — same syntax (...), opposite direction! Spread expand karta hai: [...arr] array ko individual values mein phailata hai. Rest collect karta hai: function sum(...numbers) — multiple arguments ek array mein sameta. Ye distinction yaad rakho: context dekho — function parameter mein rest, baaki jagah spread. Spread ke saath ek important gotcha: shallow copy hai! Nested objects copy nahi hote — reference same rehta hai. Ye classic React bug hai — state mutate ho jaati hai kyunki spread shallow tha."
          whenToUse={[
            'Arrays merge ya copy karne ho — spread',
            'Objects clone ya merge karne ho — spread',
            'Variadic functions — unknown number of arguments — rest',
            'Function call mein array elements individually pass karne ho — spread',
          ]}
          whyUseIt="Spread immutable updates easy banata hai — Redux, React state updates mein essential. Object spread se shallow clone aur merge ek line mein. Rest parameters arguments object se better hain — actual array milta hai, array methods directly use hoti hain."
          howToUse={{
            filename: 'spread-rest.js',
            language: 'javascript',
            code: `// ── SPREAD ──────────────────────────────────────────────────────

// Array spread
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const merged = [...arr1, ...arr2]        // [1, 2, 3, 4, 5, 6]
const copy = [...arr1]                   // Shallow copy
const withExtra = [0, ...arr1, 4]       // [0, 1, 2, 3, 4]

// Object spread
const defaults = { theme: 'dark', lang: 'en', fontSize: 14 }
const userPrefs = { theme: 'light', fontSize: 16 }
const config = { ...defaults, ...userPrefs }  // userPrefs overrides defaults
// { theme: 'light', lang: 'en', fontSize: 16 }

// Immutable update — React state pattern!
const state = { user: 'Rahul', count: 0, items: [] }
const newState = { ...state, count: state.count + 1 }  // state nahi bada

// Function call mein spread
const nums = [3, 1, 4, 1, 5]
Math.max(...nums)          // Math.max(3, 1, 4, 1, 5) — 5
console.log(...['a', 'b', 'c'])  // a b c separately

// String spread
const chars = [..."Hello"]  // ['H', 'e', 'l', 'l', 'o']

// ── REST ─────────────────────────────────────────────────────────

// Rest parameters — last position mein hona chahiye
function sum(...numbers) {           // numbers is an Array!
  return numbers.reduce((a, b) => a + b, 0)
}
sum(1, 2, 3, 4, 5)  // 15

// First few + rest
function first2AndRest(a, b, ...others) {
  console.log(a, b, others)
}
first2AndRest(1, 2, 3, 4, 5)  // 1 2 [3, 4, 5]

// Rest in destructuring
const { name, ...otherProps } = { name: 'Rahul', age: 25, city: 'Mumbai' }
console.log(otherProps)  // { age: 25, city: 'Mumbai' }

const [head, ...tail] = [1, 2, 3, 4, 5]
console.log(head, tail)  // 1 [2, 3, 4, 5]`,
            explanation: 'Spread expand karta hai, rest collect karta hai. Object spread shallow hai — nested objects copy nahi hote. Rest hamesha last parameter hona chahiye. Destructuring rest se object se specific properties hata kar baaki rakh sakte ho — bahut useful pattern.',
          }}
          realWorldScenario="Redux reducer mein immutable state update: return { ...state, users: [...state.users, newUser], loading: false }. Bina spread ke original state mutate ho jaata — bugs aur unexpected re-renders. Spread se clean immutable updates."
          commonMistakes={[
            {
              mistake: 'Object spread se deep clone karna',
              why: 'Spread shallow copy hai — nested objects still share reference. {...obj} karo, nested object ka reference same rahega.',
              fix: 'Deep clone ke liye structuredClone(obj) use karo, ya lodash cloneDeep.',
            },
            {
              mistake: 'Rest parameter last position ke alawa kahi aur daalna',
              why: 'SyntaxError — rest parameter hamesha last hona chahiye.',
              fix: 'function f(a, b, ...rest) — rest always last. Ek function mein sirf ek rest parameter.',
            },
          ]}
          proTip="Object se specific properties remove karne ka clean way — omit pattern: const { password, __v, ...safeUser } = dbUser. Ab safeUser mein password aur __v nahi hain — API response mein sensitive data filter karo. Ye pattern backend code mein bahut common hai."
        />
      </div>

      {/* ConceptCard 3 */}
      <div id="optional-chaining-nullish">
        <ConceptCard
          title="Optional Chaining & Nullish Coalescing"
          emoji="🛡️"
          difficulty="intermediate"
          whatIsIt="Optional chaining (?.) aur nullish coalescing (??) — ye do features API responses ke saath kaam karte waqt kitne zaroori hain ye tab pata chalta hai jab TypeError: Cannot read property 'name' of undefined aata hai raat ko production mein. Optional chaining solution hai — user?.address?.city: agar user null ya undefined hai toh undefined return karo, TypeError nahi. Nullish coalescing ka ek critical fark: ?? sirf null aur undefined ke liye fallback deta hai. || 0, false, '' ko bhi replace kar deta hai — bug! score || 10 — score 0 hoga toh bhi 10 aa jaayega. score ?? 10 — score 0 hoga toh 0 hi rahega, 10 nahi. Ye fark production bugs ka source hai!"
          whenToUse={[
            'Nested API responses access karte waqt — data?.user?.address?.city',
            'Optional methods call karne ho — obj?.method?.()',
            'Default values set karne ho jahan 0 ya "" valid hai',
            'Config objects mein optional properties access karne ho',
          ]}
          whyUseIt="Optional chaining se defensive if-null checks ki zaroorat nahi — code 3x cleaner ho jaata hai. Nullish coalescing || se better hai jab 0, false, '' valid values hain — count || 0 bug hai, count ?? 0 correct hai. Dono milake null-safety provide karte hain bina verbosity ke."
          howToUse={{
            filename: 'optional-nullish.js',
            language: 'javascript',
            code: `// ── OPTIONAL CHAINING (?.) ──────────────────────────────────────

// Without: verbose aur error-prone
const city = user && user.address && user.address.city
  ? user.address.city
  : 'Unknown'

// With optional chaining:
const city2 = user?.address?.city ?? 'Unknown'  // Clean!

// Array access
const firstItem = data?.items?.[0]?.name

// Method calls
const result = obj?.method?.()  // method exist nahi karta toh undefined
const upper = str?.toUpperCase?.()  // Agar str string hai ya null/undefined

// API response example
const response = {
  data: null,  // API ne kuch nahi diya
  status: 200
}
const userName = response?.data?.user?.name ?? 'Guest'
// undefined?.user → undefined; undefined?.name → undefined; ?? 'Guest' → 'Guest'

// Optional chaining with array methods
const users = null
const activeUsers = users?.filter(u => u.active) ?? []  // []

// ── NULLISH COALESCING (??) ──────────────────────────────────────

// Problem with ||:
const count = 0
console.log(count || 10)   // 10 — WRONG! 0 is valid
console.log(count ?? 10)   // 0 — CORRECT! 0 not null/undefined

const name = ''
console.log(name || 'Anonymous')   // 'Anonymous' — maybe wrong
console.log(name ?? 'Anonymous')   // '' — empty string is valid

const active = false
console.log(active || true)   // true — WRONG!
console.log(active ?? true)   // false — correct!

// Nullish assignment (??=)
let config = {}
config.timeout ??= 3000    // Sirf set karo agar null/undefined
config.retries ??= 3

// Logical OR assignment (||=) — falsy check
let msg = ''
msg ||= 'Default message'  // '' ko override karega

// Optional chaining + nullish coalescing combo:
const userCity = apiResponse?.user?.preferences?.city ?? 'Mumbai'`,
            explanation: '?. null/undefined pe silently undefined return karta hai. ?? sirf null/undefined ke liye fallback — 0, false, "" valid maanta hai. ||= falsy values ko override karta hai; ??= sirf null/undefined ko. Production APIs ke saath kaam karte waqt ye dono essential hain.',
          }}
          realWorldScenario="E-commerce product page mein: const price = product?.variants?.[selectedSize]?.discountPrice ?? product?.basePrice ?? 0. Ek line mein complex nested access with proper fallbacks. Bina optional chaining ke ye 10+ lines if/else hota."
          commonMistakes={[
            {
              mistake: '?? ki jagah || use karna default values ke liye',
              why: 'score || 0 — agar score 0 hai toh bhi 0 se replace ho jaayega. Bug!',
              fix: 'score ?? 0 use karo — sirf null/undefined replace hoga, 0 preserve hoga.',
            },
            {
              mistake: 'Optional chaining har jagah use karna "just to be safe"',
              why: 'user?.name jab user definitely exist karta hai — actual errors mask ho jaati hain. Debugging mushkil.',
              fix: 'Sirf genuinely optional values pe use karo. Agar koi value hamesha exist karni chahiye — wahan optional chaining mat use karo.',
            },
          ]}
          proTip="?? aur = milane se ??= operator milta hai: options.timeout ??= 5000 — sirf tab set karo jab timeout already set nahi hai. Config initialization ke liye perfect. Similarly ||= aur &&=. Ye logical assignment operators ES2021 mein aaye."
        />
      </div>

      {/* ConceptCard 4 */}
      <div id="es2020-plus">
        <ConceptCard
          title="ES2020+ Features — New Superpowers"
          emoji="🚀"
          difficulty="intermediate"
          whatIsIt="ES2020 se lekar ES2024 tak bahut useful features aaye hain — Array.at(), String.replaceAll(), Object.hasOwn(), structuredClone(), Array.fromAsync() aur zyada. Ye sab quality-of-life improvements hain jo common patterns ko simpler banate hain."
          whenToUse={[
            'Array ka last element chahiye — Array.at(-1)',
            'String mein sab occurrences replace karni ho — replaceAll()',
            'Object property check karna ho safely — Object.hasOwn()',
            'Deep clone banana ho — structuredClone()',
          ]}
          whyUseIt="Ye features common workarounds ko native APIs se replace karte hain — faster, cleaner, safer. Array.at(-1) array[array.length - 1] se zyada readable hai. Object.hasOwn() obj.hasOwnProperty() se safer hai (prototype pollution se protected). structuredClone() JSON trick se better hai."
          howToUse={{
            filename: 'es2020-plus.js',
            language: 'javascript',
            code: `// ── Array.at() — ES2022 ──────────────────────────────────────────
const arr = [1, 2, 3, 4, 5]
arr.at(0)     // 1 — same as arr[0]
arr.at(-1)    // 5 — last element! No more arr[arr.length - 1]
arr.at(-2)    // 4 — second to last

// ── String.replaceAll() — ES2021 ─────────────────────────────────
const text = 'foo bar foo baz foo'
text.replace('foo', 'qux')     // 'qux bar foo baz foo' — sirf pehla
text.replaceAll('foo', 'qux')  // 'qux bar qux baz qux' — sab!
// Old way: text.replace(/foo/g, 'qux') — regex needed

// ── Object.hasOwn() — ES2022 ─────────────────────────────────────
const obj = { name: 'Rahul', age: 25 }
Object.hasOwn(obj, 'name')      // true — own property
Object.hasOwn(obj, 'toString')  // false — inherited property

// hasOwnProperty() se kyun better:
const dangerous = Object.create(null)  // No prototype!
// dangerous.hasOwnProperty('key')  // TypeError!
Object.hasOwn(dangerous, 'key')        // Safe — always works

// ── structuredClone() — ES2022 ───────────────────────────────────
const original = {
  name: 'Priya',
  birth: new Date('1995-01-15'),  // Date object!
  scores: [95, 87, 92],
  meta: { active: true }
}

// JSON trick — Dates convert ho jaate hain strings mein
const jsonClone = JSON.parse(JSON.stringify(original))
console.log(jsonClone.birth)  // String! Not Date object

// structuredClone — proper deep clone
const clone = structuredClone(original)
clone.meta.active = false
console.log(original.meta.active)  // true — original untouched!
console.log(clone.birth instanceof Date)  // true — Date preserved!

// Limitation: functions clone nahi hoti
// structuredClone({ fn: () => {} })  // DataCloneError!

// ── Object.entries(), Object.fromEntries() ───────────────────────
const config = { host: 'localhost', port: 3000, debug: true }

// Entries loop
Object.entries(config).forEach(([key, value]) => {
  console.log(\`\${key}: \${value}\`)
})

// Transform object
const upperKeys = Object.fromEntries(
  Object.entries(config).map(([k, v]) => [k.toUpperCase(), v])
)
// { HOST: 'localhost', PORT: 3000, DEBUG: true }

// ── Promise.allSettled() — ES2020 ────────────────────────────────
const results = await Promise.allSettled([
  fetch('/api/users'),
  fetch('/api/posts'),    // Ye fail bhi ho sakta hai
  fetch('/api/comments'),
])
results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log('Success:', result.value)
  } else {
    console.log('Failed:', result.reason)
  }
})`,
            explanation: 'Array.at() negative indexing enable karta hai. replaceAll() regex ke bina global replace. Object.hasOwn() prototype pollution se safe. structuredClone() proper deep clone with Date, Set, Map support. Promise.allSettled() jab kuch requests fail ho sakti hain aur sab results chahiye.',
          }}
          realWorldScenario="Analytics dashboard mein last 7 days data: const lastWeek = data.at(-7). User input sanitize karna: sanitized.replaceAll('<', '&lt;').replaceAll('>', '&gt;'). State deep clone: const newState = structuredClone(currentState) — Redux mein useful."
          commonMistakes={[
            {
              mistake: 'structuredClone se functions clone karne ki koshish',
              why: 'DataCloneError throw karta hai — functions structured clone algorithm support nahi karta.',
              fix: 'Functions wale objects ke liye spread {...obj} ya lodash cloneDeep use karo.',
            },
            {
              mistake: 'Object.keys().forEach() ki jagah Object.entries() use na karna',
              why: 'Object.keys() sirf keys deta hai — value ke liye obj[key] alag se access karna padta hai.',
              fix: 'Object.entries().forEach(([key, value]) => ...) — ek baar mein dono milte hain.',
            },
          ]}
          proTip="Object.groupBy() ES2024 feature hai — array ko key se group karo: const grouped = Object.groupBy(users, u => u.role). { admin: [...], user: [...] }. Lodash _.groupBy() ka native replacement. Array.fromAsync() bhi aaya hai — async iterables se arrays banao."
        />
      </div>

      {/* ConceptCard 5 */}
      <div id="modules">
        <ConceptCard
          title="ES Modules — Import/Export ka Sahi Tarika"
          emoji="📦"
          difficulty="intermediate"
          whatIsIt="ES Modules — JavaScript ka official module system. Pehle CommonJS tha (require/module.exports) — Node.js ka original system. Phir ESM aaya (import/export) — browser aur Node.js dono ke liye standard. Kya fark hai? ESM STATIC hai — import statements compile time pe analyze hoti hain, runtime pe nahi. Isliye tree shaking possible hai — unused exports bundle se hata sakte hain. CommonJS dynamic hai — require() runtime pe call hota hai, conditional require possible hai lekin tree shaking nahi. Aaj: browser default ESM, Node.js dono support karta hai (.mjs ya package.json 'type: module'). Dynamic import() — lazy loading ka native solution."
          whenToUse={[
            'Multiple related values export karne ho ek file se — named exports',
            'Main functionality export karni ho — default export',
            'Lazy loading — route-based code splitting — dynamic import()',
            'Browser aur Node.js dono ke liye same code — ESM',
          ]}
          whyUseIt="ESM static imports se bundlers (Vite, esbuild) tree shaking karte hain — unused code bundle se hata dete hain. dynamic import() se code splitting hoti hai — initial bundle size kam hoti hai. import.meta se module metadata milti hai — current file path, environment."
          howToUse={{
            filename: 'modules.js',
            language: 'javascript',
            code: `// ── NAMED EXPORTS ────────────────────────────────────────────────
// utils.js
export const PI = 3.14159
export function add(a, b) { return a + b }
export function multiply(a, b) { return a * b }
export class Calculator { /* ... */ }

// Import named exports
import { add, multiply, PI } from './utils.js'
import { add as addNumbers } from './utils.js'  // Rename
import * as utils from './utils.js'              // All as namespace

// ── DEFAULT EXPORT ────────────────────────────────────────────────
// logger.js
export default class Logger {
  log(msg) { console.log(\`[LOG] \${msg}\`) }
  error(msg) { console.error(\`[ERROR] \${msg}\`) }
}

// Import default — naam kuch bhi de sakte ho
import Logger from './logger.js'
import MyLogger from './logger.js'  // Same thing

// Mix named + default
// api.js
export default async function fetchData(url) { /* ... */ }
export const BASE_URL = 'https://api.example.com'
export const TIMEOUT = 5000

import fetchData, { BASE_URL, TIMEOUT } from './api.js'

// ── DYNAMIC IMPORT ───────────────────────────────────────────────
// Code splitting — sirf jab chahiye tab load
async function loadHeavyLibrary() {
  const module = await import('./heavy-chart-library.js')
  module.default.render('#chart', data)
}

// Route-based lazy loading (React-like)
async function loadPage(route) {
  const { default: Component } = await import(\`./pages/\${route}.js\`)
  return Component
}

// ── import.meta ──────────────────────────────────────────────────
console.log(import.meta.url)       // Current file's URL
console.log(import.meta.env)       // Vite/bundler environment vars
console.log(import.meta.dirname)   // Node.js 20.11+ — __dirname like

// ── Re-exports — barrel files ────────────────────────────────────
// components/index.js — barrel file
export { Button } from './Button.js'
export { Input } from './Input.js'
export { default as Modal } from './Modal.js'

// Consumer mein:
import { Button, Input, Modal } from './components'`,
            explanation: 'Named exports — multiple values. Default export — ek main value. Dynamic import() — async loading on demand. Barrel files (index.js) se clean import paths milte hain. Tree shaking sirf used named exports ko bundle mein rakhta hai — bundle size kam hoti hai.',
          }}
          realWorldScenario="Large React app mein route-based code splitting: const Dashboard = lazy(() => import('./pages/Dashboard')). Dashboard ka JS sirf tab load hoga jab user us route par jaata hai — initial load time bahut kam ho jaati hai."
          commonMistakes={[
            {
              mistake: 'Har file mein ek hi default export dena aur named exports ignore karna',
              why: 'Tree shaking sirf named exports pe effectively kaam karta hai. Default export whole module pull karta hai.',
              fix: 'Utility functions ke liye named exports prefer karo. Default export sirf jab ek primary thing export karni ho.',
            },
            {
              mistake: 'Barrel files mein re-export karte waqt circular dependencies banana',
              why: 'Circular imports runtime errors ya undefined values cause karte hain — debugging nightmare.',
              fix: 'Barrel files mein sirf leaf modules se import karo, never from files jo us barrel ko import karte hain.',
            },
          ]}
          proTip="import.meta.env Vite mein environment variables access karta hai — VITE_ prefix ke saath. Production mein secrets mat daalo — bundler mein inline ho jaate hain. Node.js mein process.env use karo. import.meta.glob Vite-specific feature hai — glob pattern se multiple files import karo."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 12 Quiz — Modern JS (ES6+)
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — modern JS ke game changers!
          </p>
        </div>
        <QuizSection questions={es6Quiz} chapterSlug="es6-modern" />
      </div>
    </div>
  )
}
