'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const quizQuestions = [
  {
    question: 'Object destructuring mein rename kaise karte hain?',
    options: [
      { text: 'const { name as displayName } = user', correct: false, explanation: "'as' keyword JavaScript destructuring mein nahi hota — TypeScript type assertion hai." },
      { text: 'const { name: displayName } = user', correct: true, explanation: 'Sahi! Colon ke baad new variable name — name property ko displayName mein rename karo.' },
      { text: 'const { name => displayName } = user', correct: false, explanation: "=> arrow function syntax hai, destructuring rename nahi." },
      { text: 'const displayName = { name } = user', correct: false, explanation: 'Ye valid syntax nahi hai destructuring ke liye.' },
    ],
  },
  {
    question: 'Object.freeze() aur Object.seal() mein kya farq hai?',
    options: [
      { text: 'Koi farq nahi', correct: false, explanation: 'Bahut important farq hai! Dono alag constraints apply karte hain.' },
      { text: 'freeze: properties add/delete/modify nahi; seal: add/delete nahi but modify kar sakte hain', correct: true, explanation: 'Bilkul sahi! freeze completely immutable, seal structure lock karta hai par values change ho sakti hain.' },
      { text: 'seal: completely immutable; freeze: sirf add nahi kar sakte', correct: false, explanation: 'Ulta hai — freeze stronger hai, seal partial lock karta hai.' },
      { text: 'Dono same hain, alag names hain', correct: false, explanation: 'Nahi — ye genuinely alag behaviors hain.' },
    ],
  },
  {
    question: 'JSON.stringify() kya skip karta hai?',
    options: [
      { text: 'Null values', correct: false, explanation: 'null JSON mein valid hai — stringify mein preserve hota hai.' },
      { text: 'Functions, undefined, Symbol values', correct: true, explanation: 'Sahi! ye sab JSON mein representable nahi hain — stringify silently skip karta hai inhe.' },
      { text: 'Numbers aur booleans', correct: false, explanation: 'Numbers aur booleans JSON mein valid hain.' },
      { text: 'Empty strings', correct: false, explanation: 'Empty strings JSON mein valid hain — stringify preserve karta hai.' },
    ],
  },
  {
    question: 'Shallow copy aur deep copy mein kya farq hai objects ke liye?',
    options: [
      { text: 'Koi farq nahi — dono same hain', correct: false, explanation: 'Bahut important farq hai — nested objects ke behavior mein.' },
      { text: 'Shallow copy nested objects ko share karta hai; deep copy completely independent hota hai', correct: true, explanation: 'Bilkul! {...obj} shallow hai — nested objects reference share karte hain. structuredClone() ya JSON.parse(JSON.stringify()) deep copy karta hai.' },
      { text: 'Shallow copy slower hai', correct: false, explanation: 'Shallow copy zyada fast hai — bas top level copy hoti hai.' },
      { text: 'Deep copy sirf primitives copy karta hai', correct: false, explanation: 'Deep copy sab kuch copy karta hai — primitives aur nested objects dono independently.' },
    ],
  },
  {
    question: 'Object.keys(), Object.values(), Object.entries() mein kya return hota hai?',
    options: [
      { text: 'Teeno same return karte hain', correct: false, explanation: 'Teeno alag output dete hain.' },
      { text: 'keys: array of key strings; values: array of values; entries: array of [key, value] pairs', correct: true, explanation: 'Sahi! entries() sabse powerful hai — destructuring ke saath: for (const [key, val] of Object.entries(obj)).' },
      { text: 'keys: object; values: array; entries: Map', correct: false, explanation: 'Teeno arrays return karte hain.' },
      { text: 'Teeno object return karte hain', correct: false, explanation: 'Teeno arrays return karte hain — iterable aur array methods compatible.' },
    ],
  },
]

// ── Main Component ────────────────────────────────────────────────────────────

export default function JSChapter6Content() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div
        id="intro"
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3">
          Objects — JavaScript Ki Backbone
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Objects JavaScript mein sab kuch hain — functions objects hain, arrays objects hain, almost everything is an object. Key-value pairs store karna, data structure banana, behavior encapsulate karna — sab objects se hota hai. Modern ES6+ syntax ne objects ke saath kaam karna bahut cleaner bana diya hai.
        </p>
        <div
          className="rounded-xl p-4 mt-4"
          style={{ background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.2)' }}
        >
          <p className="text-sm text-[#A1A1AA]">
            <span className="text-[#06B6D4] font-semibold">Is chapter mein:</span> Object creation ways, property access, destructuring (basic, nested, rename, defaults), spread & merge patterns, aur useful static methods — keys/values/entries, freeze, seal, JSON caveats.
          </p>
        </div>
      </div>

      {/* Card 1: Object Creation */}
      <div id="object-creation">
        <ConceptCard
          title="Object Creation — Char Tarike"
          emoji="🏗️"
          difficulty="beginner"
          whatIsIt="JavaScript mein objects banane ke multiple ways hain. Object literal {}: simplest aur most common. Constructor function: new keyword se. Object.create(): prototype-based creation. ES6 Class: syntactic sugar over prototypes. Har method ka apna use case hai — lekin 90% cases mein object literal hi use hota hai."
          whenToUse={[
            'Object literal {}: simple data containers, configuration, return values',
            'Constructor function / Class: blueprints se multiple similar objects banana',
            'Object.create(proto): specific prototype chain ke saath objects banana',
            'Factory function: encapsulation chahiye, new keyword ke bina',
          ]}
          whyUseIt="Object literal terseness aur readability ka champion hai. Classes similar objects ke liye blueprint provide karte hain — code duplication remove karte hain. Object.create null prototype ke saath objects banane ke liye useful hai — pure key-value store jahan prototype chain interfere na kare."
          howToUse={{
            filename: 'object-creation.js',
            language: 'javascript',
            code: `// 1. Object literal — most common
const user = {
  name: 'Rahul',
  age: 25,
  city: 'Mumbai',
  greet() {                    // shorthand method
    return \`Hi, I'm \${this.name}\`
  },
}

// 2. Computed properties — dynamic keys
const field = 'email'
const dynamic = {
  [field]: 'rahul@example.com',        // computed key
  [\`get_\${field}\`]: () => 'getter',  // dynamic method name
}

// 3. Factory function — closure se private state
function createUser(name, age) {
  let loginCount = 0  // private!
  return {
    name,
    age,
    login() { loginCount++ },
    getLoginCount() { return loginCount },
  }
}
const u = createUser('Priya', 28)
u.login()
u.getLoginCount()  // 1
// u.loginCount   // undefined — private!

// 4. Object.create() — prototype setup
const animalMethods = {
  speak() { return \`\${this.name} says \${this.sound}\` },
  eat() { return \`\${this.name} is eating\` },
}
const dog = Object.create(animalMethods)
dog.name = 'Bruno'
dog.sound = 'Woof'
dog.speak()  // "Bruno says Woof"

// Null prototype — pure key-value store, no prototype pollution
const store = Object.create(null)
store.key1 = 'value1'
// store.toString  // undefined — no Object.prototype methods`,
            explanation: 'Factory functions encapsulation dete hain bina class ke — private variables close karke. Computed properties dynamic keys banane ke liye powerful hain — API response shapes map karne ke liye. Object.create(null) dictionary/hashmap ke liye safer hai — prototype chain pollution ka risk nahi.',
          }}
          realWorldScenario="Config objects: const dbConfig = { host, port, database, ssl: true }. API response shaping: return { id: user._id, name: user.fullName, avatar: user.picture }. Event payload objects. Express middleware: req.user = createUserFromJWT(token) — factory function se typed user object. Ye daily patterns hain."
          commonMistakes={[
            {
              mistake: 'Object mein circular reference banana aur JSON.stringify karna',
              why: 'const a = {}; a.self = a; JSON.stringify(a) — TypeError: circular structure.',
              fix: 'Circular references avoid karo serialization ke liye. Ya replacer function use karo JSON.stringify mein.',
            },
            {
              mistake: 'this keyword object literal ke andar arrow function mein use karna',
              why: "const obj = { name: 'X', greet: () => this.name } — this arrow function mein object nahi hoga!",
              fix: 'Object methods ke liye regular function ya shorthand: { greet() { return this.name } }.',
            },
          ]}
          proTip="Object.create(null) use karo jab pure hashmap chahiye — prototype methods (toString, hasOwnProperty) interfere nahi karenge. Cache, lookup tables, frequency counts ke liye perfect hai."
        />
      </div>

      {/* Card 2: Property Access & Shorthand */}
      <div id="property-access">
        <ConceptCard
          title="Property Access, Computed & Shorthand"
          emoji="🔑"
          difficulty="beginner"
          whatIsIt="Property access ke do ways: dot notation (obj.name) aur bracket notation (obj['name']). Bracket notation dynamic keys ke liye zaroori hai. ES6 shorthand: jab variable name aur key name same ho — { name } instead of { name: name }. Computed properties: [expression] se dynamic keys. Optional chaining (?.) se null-safe access."
          whenToUse={[
            'Dot notation: static, known property names ke liye — most common',
            'Bracket notation: dynamic keys, variable-based access, special characters wale keys',
            'Shorthand { name, age }: function return values, object creation jab variable names match karein',
            'Optional chaining (?.) hamesha: deeply nested properties safely access karne ke liye',
          ]}
          whyUseIt="Shorthand syntax verbosity drastically reduce karta hai — function return mein { id, name, email } instead of { id: id, name: name, email: email }. Computed properties dynamically structured data handle karte hain — user analytics, form field mapping. Optional chaining undefined errors eliminate karta hai."
          howToUse={{
            filename: 'property-access.js',
            language: 'javascript',
            code: `const user = { name: 'Rahul', address: { city: 'Mumbai', pin: '400001' } }

// Dot notation
user.name  // 'Rahul'

// Bracket notation — dynamic key access
const key = 'name'
user[key]  // 'Rahul'

// Optional chaining — null-safe deep access
user?.address?.city       // 'Mumbai'
user?.phone?.number       // undefined — no error!
user?.getName?.()         // undefined — safe method call

// Shorthand property names
const name = 'Priya'
const age = 28
const city = 'Delhi'
const shorthand = { name, age, city }
// Same as: { name: name, age: age, city: city }

// Shorthand in function return
function getProfile(id) {
  const name = fetchName(id)
  const email = fetchEmail(id)
  return { id, name, email }  // shorthand!
}

// Computed property names
const prefix = 'get'
const obj = {
  [prefix + 'Name']() { return this.name },
  [\`\${prefix}Age\`]() { return this.age },
  name: 'Rahul',
  age: 25,
}
obj.getName()  // 'Rahul'

// Dynamic property setting
function setProperty(obj, path, value) {
  obj[path] = value
}

// Property existence check
'name' in user              // true — checks prototype too
Object.hasOwn(user, 'name') // true — only own properties
user.hasOwnProperty('name') // true — older way`,
            explanation: 'Optional chaining ?. ne JavaScript null-safety dramatically improve ki hai. Shorthand properties React components mein ubiquitous hain — prop destructure karo, modify karo, shorthand se return karo. Object.hasOwn() modern alternative hai hasOwnProperty ke liye.',
          }}
          realWorldScenario="React props: function Card({ title, subtitle, image }) {} — destructuring + shorthand. Redux action creators: return { type: ACTION.UPDATE, payload }. API key mapping: const headers = { 'Content-Type': contentType, Authorization: \`Bearer \${token}\` }. Analytics: events[eventName] = (events[eventName] || 0) + 1."
          commonMistakes={[
            {
              mistake: 'Deeply nested access bina optional chaining ke',
              why: "data.user.profile.avatar — agar user null hai toh TypeError. Production mein data unexpected hota hai.",
              fix: 'data?.user?.profile?.avatar ?? defaultAvatar — optional chaining aur nullish coalescing combine karo.',
            },
            {
              mistake: 'in operator se hasOwnProperty ki jagah use karna',
              why: "'toString' in obj — true! Because prototype mein hai. Ye misleading hota hai own properties check karne ke liye.",
              fix: 'Object.hasOwn(obj, key) ya obj.hasOwnProperty(key) use karo own properties ke liye.',
            },
          ]}
          proTip="Optional chaining function calls mein bhi kaam karta hai: obj?.method?.() — method exist kare tabhi call hoga. Array access mein bhi: arr?.[0] — arr null/undefined ho toh crash nahi. Ye patterns API responses handle karte waqt invaluable hain."
        />
      </div>

      {/* Card 3: Destructuring */}
      <div id="destructuring">
        <ConceptCard
          title="Object Destructuring — Variables Nikalo"
          emoji="📦"
          difficulty="beginner"
          whatIsIt="Destructuring syntax se object ke properties ko directly variables mein extract karo. Basic: const { name, age } = user. Rename: const { name: displayName } = user. Default value: const { role = 'user' } = user. Nested: const { address: { city } } = user. Function parameters mein: function process({ id, items }) {}. Ye ES6 ka ek killer feature hai."
          whenToUse={[
            'API responses se specific properties extract karne ke liye',
            'Function parameters mein — named arguments ki tarah readable',
            'React props — component ke andar props destructure karo',
            'Import statements mein — const { useState, useEffect } = React',
          ]}
          whyUseIt="Destructuring boilerplate eliminate karta hai — const name = user.name; const age = user.age; ki zaroorat nahi. Function parameters mein destructuring named arguments ki tarah kaam karta hai — caller ko pata hota hai kya pass karna hai. Deeply nested data easily accessible hoti hai."
          howToUse={{
            filename: 'destructuring.js',
            language: 'javascript',
            code: `const user = {
  id: 42,
  name: 'Rahul Kumar',
  email: 'rahul@example.com',
  role: 'admin',
  address: {
    city: 'Mumbai',
    state: 'Maharashtra',
    pin: '400001',
  },
  preferences: {
    theme: 'dark',
    notifications: true,
  },
}

// Basic destructuring
const { id, name, email } = user

// Rename (colon = rename, not value!)
const { name: fullName, email: userEmail } = user
// fullName = 'Rahul Kumar', userEmail = 'rahul@example.com'

// Default values (undefined hone par)
const { role = 'user', age = 0 } = user
// role = 'admin' (exists), age = 0 (doesn't exist)

// Nested destructuring
const { address: { city, pin }, preferences: { theme } } = user
// city = 'Mumbai', pin = '400001', theme = 'dark'

// Rest in destructuring
const { id: userId, ...userWithoutId } = user
// userId = 42, userWithoutId = { name, email, role, address, ... }

// Function parameter destructuring
function sendEmail({ to, subject, body, cc = [], bcc = [] }) {
  console.log(\`Sending to \${to}: \${subject}\`)
}
sendEmail({ to: 'rahul@example.com', subject: 'Hello!', body: 'Hi' })

// Rename + default in params
function renderCard({ title: cardTitle = 'Untitled', subtitle = '' }) {
  return \`<h2>\${cardTitle}</h2><p>\${subtitle}</p>\`
}

// Dynamic key destructuring — computed property
const key = 'theme'
const { [key]: selectedTheme } = user.preferences
// selectedTheme = 'dark'`,
            explanation: 'Rename syntax yaad rakho: { property: newVariableName }. Nested destructuring concise hai lekin zyada nesting se readability suffer karta hai — 2-3 levels tak theek hai. Rest operator (...) bache hue properties collect karta hai — "omit" pattern ke liye useful hai.',
          }}
          realWorldScenario="Express route handler: const { params: { id }, body: { name, price }, query: { page = 1 } } = req — ek line mein sab kuch extract! React component: function ProductCard({ title, price, image, onAddToCart }) {} — named props, readable. Redux action: const { payload: { userId, data } } = action."
          commonMistakes={[
            {
              mistake: '{ name: displayName } ko name equals displayName samajhna',
              why: "Destructuring mein : rename hai, assignment nahi — { name: 'Priya' } pattern nahi karta!",
              fix: 'Property access: { name } gets user.name into variable name. Rename: { name: alias } gets user.name into variable alias.',
            },
            {
              mistake: 'Deeply nested destructuring with non-existent intermediate keys',
              why: "const { a: { b } } = {} — TypeError: Cannot destructure property 'b' of undefined.",
              fix: 'Safe nested destructuring: const { a: { b } = {} } = {} — intermediate default value set karo.',
            },
          ]}
          proTip="Swap variables bina temp: [a, b] = [b, a]. Array destructuring se multiple return values: function minMax(arr) { return [Math.min(...arr), Math.max(...arr)] }; const [min, max] = minMax([1,2,3]). Clean aur readable!"
        />
      </div>

      {/* Card 4: Spread & Merge */}
      <div id="spread-merge">
        <ConceptCard
          title="Spread, Object.assign & Merge Patterns"
          emoji="🔀"
          difficulty="beginner"
          whatIsIt="Spread operator (...) objects ko expand karta hai — clone karo, merge karo, override karo. Object.assign(target, ...sources) target mein properties copy karta hai — mutates target! Object.keys() array of keys, Object.values() array of values, Object.entries() array of [key, value] pairs — ye sab iteration ke liye powerful tools hain."
          whenToUse={[
            'Spread {...obj}: shallow clone, merge multiple objects, override specific properties',
            'Object.assign: existing object mein properties add karna (rare in modern code)',
            'Object.keys/values/entries: object ko iterate karna, transform karna',
            'structuredClone(): deep clone ke liye (Node.js 17+, modern browsers)',
          ]}
          whyUseIt="Spread immutable updates ke liye perfect hai — original object unchanged. Redux state updates: { ...state, loading: false } — purana state preserve, ek property update. Object.entries + reduce: object transform karna. Spread ek powerful shallow clone tool hai — per iteration nayi object banao."
          howToUse={{
            filename: 'spread-merge.js',
            language: 'javascript',
            code: `// Spread — shallow clone
const original = { name: 'Rahul', age: 25 }
const clone = { ...original }  // new object, same values
clone.name = 'Priya'  // original unchanged

// Merge — last one wins for same keys
const defaults = { theme: 'dark', lang: 'en', debug: false }
const userPrefs = { theme: 'light', fontSize: 16 }
const merged = { ...defaults, ...userPrefs }
// { theme: 'light', lang: 'en', debug: false, fontSize: 16 }

// Override specific properties — immutable update pattern
const state = { loading: false, data: null, error: null }
const newState = { ...state, loading: true }  // only loading changes

// Add/override computed property
const updatedUser = { ...original, updatedAt: new Date(), role: 'admin' }

// Object.keys, values, entries
const config = { host: 'localhost', port: 3000, debug: true }

Object.keys(config)    // ['host', 'port', 'debug']
Object.values(config)  // ['localhost', 3000, true]
Object.entries(config) // [['host','localhost'], ['port',3000], ['debug',true]]

// Iterate with entries
for (const [key, value] of Object.entries(config)) {
  console.log(\`\${key}: \${value}\`)
}

// Transform object — entries + reduce
const uppercased = Object.fromEntries(
  Object.entries(config).map(([k, v]) =>
    [k.toUpperCase(), String(v)]
  )
)
// { HOST: 'localhost', PORT: '3000', DEBUG: 'true' }

// Deep clone — structuredClone (modern)
const deep = { name: 'Rahul', address: { city: 'Mumbai' } }
const deepClone = structuredClone(deep)  // completely independent
deepClone.address.city = 'Delhi'
deep.address.city  // still 'Mumbai'`,
            explanation: 'Spread shallow clone karta hai — nested objects share kiye jaate hain. Deep clone ke liye structuredClone() best option hai modern JS mein (JSON.parse(JSON.stringify()) functions/undefined/Dates ke saath issue karta hai). Object.fromEntries entries array ko wapas object mein convert karta hai.',
          }}
          realWorldScenario="React state: setUser(prev => ({ ...prev, isVerified: true })) — immutable update. API response normalize karna: Object.fromEntries(Object.entries(response).map(([k, v]) => [camelCase(k), v])). Config override: const finalConfig = { ...defaultConfig, ...envConfig, ...runtimeConfig }. Redux reducers mein spread pattern central hai."
          commonMistakes={[
            {
              mistake: 'Spread ko deep clone samajhna',
              why: "const clone = { ...user } — clone.address.city = 'X' se original.address.city bhi change ho jaata hai!",
              fix: 'Nested objects ke liye structuredClone() use karo. Ya manual deep: { ...user, address: { ...user.address } }.',
            },
            {
              mistake: 'Object.assign pehle argument mein fresh object nahi dena',
              why: 'Object.assign(original, updates) — original mutate ho jaata hai! Unexpected side effects.',
              fix: 'Object.assign({}, original, updates) — empty object pehle. Ya spread prefer karo: { ...original, ...updates }.',
            },
          ]}
          proTip="Object.fromEntries(map) Map ko plain object mein convert karta hai. Object.entries(obj) Object ko Map mein: new Map(Object.entries(obj)). Ye dono conversions powerful data manipulation ke liye useful hain!"
          demo={
            <DiffBlock
              title="Verbose Old Way vs ES6+ Modern Syntax"
              language="javascript"
              bad={{
                code: `// Old verbose JavaScript
var user = {}
user.name = name
user.email = email
user.role = role
user.createdAt = new Date()

// Merge — assign manually
var merged = {}
for (var key in defaults) {
  merged[key] = defaults[key]
}
for (var key in overrides) {
  merged[key] = overrides[key]
}`,
                label: 'Purana Verbose Way',
                explanation: 'Zyada lines, error-prone, hard to scan',
              }}
              good={{
                code: `// Modern ES6+ shorthand
const user = {
  name,        // shorthand — same as name: name
  email,
  role,
  createdAt: new Date(),
}

// Merge with spread — one line!
const merged = { ...defaults, ...overrides }`,
                label: 'Modern ES6+ Concise',
                explanation: 'Intent instantly clear, half the lines, no mutations',
              }}
            />
          }
        />
      </div>

      {/* Card 5: Object Methods */}
      <div id="object-methods">
        <ConceptCard
          title="Object Methods — freeze, seal, JSON caveats"
          emoji="🛡️"
          difficulty="beginner"
          whatIsIt="Object.freeze() object ko completely immutable banata hai — properties add, delete, ya modify nahi ho sakti. Object.seal() structure lock karta hai — properties add/delete nahi ho sakti lekin existing modify ho sakti hain. JSON.stringify() object ko JSON string mein convert karta hai — lekin functions, undefined, aur Symbols silently skip ho jaate hain, Dates strings ban jaati hain."
          whenToUse={[
            'freeze(): constants, configuration objects jo kabhi change nahi hone chahiye',
            'seal(): objects jo extend nahi honge lekin values update ho sakti hain',
            'JSON.stringify(): network pe bhejne ke liye, localStorage mein store karne ke liye',
            'JSON.parse(): JSON string wapas object mein convert karna',
          ]}
          whyUseIt="freeze() accidental mutations se protect karta hai — config objects, permission maps, constants. JSON methods simple serialization ke liye perfect hain lekin limitations samajhna zaroori hai. structuredClone() deep copy ke liye better alternative hai kyunki Date, RegExp, Map, Set sab handle karta hai."
          howToUse={{
            filename: 'object-methods.js',
            language: 'javascript',
            code: `// Object.freeze — completely immutable
const CONFIG = Object.freeze({
  API_URL: 'https://api.example.com',
  TIMEOUT: 5000,
  MAX_RETRIES: 3,
})
CONFIG.API_URL = 'hacked!'  // silently fails in non-strict mode
CONFIG.NEW_KEY = 'value'    // TypeError in strict mode
console.log(CONFIG.API_URL) // still 'https://api.example.com'

// Shallow freeze — nested objects still mutable!
const config = Object.freeze({
  db: { host: 'localhost', port: 5432 }
})
config.db.host = 'hacked!'  // WORKS! nested not frozen
config.db  // { host: 'hacked!', port: 5432 }

// Deep freeze (manual)
function deepFreeze(obj) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      deepFreeze(obj[key])
    }
  })
  return Object.freeze(obj)
}

// Object.seal — add/delete nahi, modify ok
const user = Object.seal({ name: 'Rahul', age: 25 })
user.name = 'Priya'  // OK — modify allowed
user.email = 'x@x.com'  // silently fails — new property
delete user.age         // silently fails
console.log(user)  // { name: 'Priya', age: 25 }

// JSON caveats — kya kya skip hota hai
const tricky = {
  name: 'Rahul',
  age: 25,
  greet: () => 'Hi!',      // function — SKIP!
  status: undefined,        // undefined — SKIP!
  id: Symbol('id'),         // Symbol — SKIP!
  birthday: new Date('1999-01-15'), // Date — STRING!
  balance: Infinity,        // Infinity — null!
  pattern: /hello/g,        // RegExp — empty object {}
}
JSON.stringify(tricky)
// '{"name":"Rahul","age":25,"birthday":"1999-01-15T...","balance":null,"pattern":{}}'`,
            explanation: 'freeze() shallow hai — nested objects ke liye deep freeze chahiye. JSON limitations yaad rakho: functions/undefined/Symbol skip, Date strings ban jaata hai, Infinity null. Production mein Dates handle karne ke liye serialize/deserialize carefully karo.',
          }}
          realWorldScenario="App configuration: const ROLES = Object.freeze({ ADMIN: 'admin', USER: 'user', MOD: 'moderator' }) — string enum ki tarah. Redux state updates ke liye freeze ensures mutations caught hoti hain development mein. API response store karna localStorage mein: JSON.stringify aur parse — Dates handle karna mat bhulo."
          commonMistakes={[
            {
              mistake: 'JSON.stringify ke baad Date parse karna date object ke roop mein expect karna',
              why: 'JSON.parse(JSON.stringify(date)) returns string, Date object nahi — comparison fails.',
              fix: 'Date reviver use karo: JSON.parse(str, (key, value) => isDateString(value) ? new Date(value) : value). Ya date-fns/dayjs use karo.',
            },
            {
              mistake: 'Object.freeze ko deep freeze samajhna',
              why: 'const a = Object.freeze({b: {c: 1}}); a.b.c = 2 — works! Only top level frozen.',
              fix: 'Deep freeze function use karo ya Immer library production mein immutability ke liye.',
            },
          ]}
          proTip="Object.isFrozen(obj) aur Object.isSealed(obj) se check karo. structuredClone(obj) (Node 17+) deep clone karta hai correctly — Date, RegExp, Map, Set sab handle karta hai. JSON.parse(JSON.stringify()) se better hai most cases mein."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 6 Quiz — Objects
          </h3>
          <p className="text-sm text-[#71717A]">5 questions — 80%+ chahiye clear karne ke liye!</p>
        </div>
        <QuizSection questions={quizQuestions} chapterSlug="objects" />
      </div>
    </div>
  )
}
