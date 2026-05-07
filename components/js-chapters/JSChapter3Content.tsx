'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const quizQuestions = [
  {
    question: '0.1 + 0.2 === 0.3 JavaScript mein kya return karta hai?',
    options: [
      { text: 'true', correct: false, explanation: 'Floating point precision issue ki wajah se ye false hai.' },
      { text: 'false', correct: true, explanation: 'Sahi! 0.1 + 0.2 = 0.30000000000000004 hota hai JavaScript mein — floating point precision issue.' },
      { text: 'TypeError', correct: false, explanation: 'Koi error nahi aata, bas result unexpected hota hai.' },
      { text: 'NaN', correct: false, explanation: 'NaN invalid operations se aata hai, ye valid math hai — bas imprecise.' },
    ],
  },
  {
    question: '== aur === mein kya farq hai?',
    options: [
      { text: 'Dono same hain', correct: false, explanation: 'Nahi, bahut important farq hai dono mein.' },
      { text: '== type coercion karta hai, === strict equality check karta hai', correct: true, explanation: 'Bilkul sahi! == types convert karke compare karta hai, === pehle type check karta hai.' },
      { text: '=== sirf numbers ke liye hai', correct: false, explanation: 'Nahi, === sab types ke liye use hota hai.' },
      { text: '== faster hai performance mein', correct: false, explanation: 'Performance difference negligible hai — consistency aur correctness ke liye === prefer karo.' },
    ],
  },
  {
    question: 'for...of aur for...in mein kya farq hai?',
    options: [
      { text: 'Koi farq nahi', correct: false, explanation: 'Bahut bada farq hai! Dono alag cheezein iterate karte hain.' },
      { text: 'for...of values iterate karta hai, for...in keys/indices iterate karta hai', correct: true, explanation: 'Sahi! for...of arrays/iterables ki values deta hai, for...in object keys ya array indices deta hai.' },
      { text: 'for...in arrays ke liye, for...of objects ke liye', correct: false, explanation: 'Ulta hai! for...of arrays/iterables ke liye better hai, for...in objects ke liye.' },
      { text: 'for...of sirf strings pe kaam karta hai', correct: false, explanation: 'for...of kisi bhi iterable pe kaam karta hai — arrays, strings, Maps, Sets, generators.' },
    ],
  },
  {
    question: 'Nullish coalescing operator ?? kya karta hai?',
    options: [
      { text: 'null ya undefined hone par fallback value deta hai', correct: true, explanation: 'Bilkul! ?? sirf null aur undefined check karta hai — 0, false, empty string ko valid values maanta hai.' },
      { text: 'Kisi bhi falsy value par fallback deta hai', correct: false, explanation: 'Nahi, ye || ka kaam hai. ?? sirf null/undefined par fire hota hai.' },
      { text: 'Boolean comparison karta hai', correct: false, explanation: 'Nahi, ye nullish values ke liye default value provide karta hai.' },
      { text: 'Optional chaining ke liye use hota hai', correct: false, explanation: 'Optional chaining ke liye ?. operator hai. ?? alag kaam karta hai.' },
    ],
  },
  {
    question: 'switch statement mein break kyun zaroori hai?',
    options: [
      { text: 'JavaScript ka syntax rule hai', correct: false, explanation: 'Ye syntax rule nahi hai — break optional hai lekin important hai.' },
      { text: 'Bina break ke execution "fall through" ho jaati hai next case mein', correct: true, explanation: 'Sahi! Bina break ke JavaScript next case bhi execute karta hai — isliye almost hamesha break lagao.' },
      { text: 'Performance ke liye zaroori hai', correct: false, explanation: 'Performance se koi lena dena nahi — logical correctness ke liye break chahiye.' },
      { text: 'default case ke saath zaroori hai sirf', correct: false, explanation: 'Har case ke baad break chahiye, sirf default mein nahi.' },
    ],
  },
]

// ── Diagram ───────────────────────────────────────────────────────────────────

function OperatorPrecedenceDiagram() {
  const groups = [
    {
      label: 'Arithmetic',
      sublabel: '** → * / % → + −   (highest priority)',
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      border: 'rgba(245,158,11,0.3)',
      icon: '🔢',
    },
    {
      label: 'Comparison',
      sublabel: '> < >= <=  then  === !==   (returns boolean)',
      color: '#F97316',
      bg: 'rgba(249,115,22,0.1)',
      border: 'rgba(249,115,22,0.3)',
      icon: '⚖️',
    },
    {
      label: 'Logical',
      sublabel: '!  then  &&  then  ||  then  ??   (short-circuit)',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.1)',
      border: 'rgba(124,58,237,0.3)',
      icon: '🔀',
    },
    {
      label: 'Assignment',
      sublabel: '= += -= *= /= **= ??= &&= ||=   (lowest priority)',
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.1)',
      border: 'rgba(6,182,212,0.3)',
      icon: '📝',
    },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Operator Precedence — High to Low</p>
      <div className="max-w-lg mx-auto space-y-2">
        {groups.map((item, i) => (
          <div key={i}>
            <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{item.sublabel}</p>
              </div>
            </div>
            {i < groups.length - 1 && <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓</span></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function JSChapter3Content() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div
        id="intro"
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3">
          Operators &amp; Control Flow — Code Ka Dimaag
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          <strong className="text-[#F5F5F7]">Ek shocking sawaal</strong> — <code className="text-[#06B6D4]">0.1 + 0.2 === 0.3</code> JavaScript mein kya return karta hai? <strong className="text-[#F59E0B]">false!</strong> Kyunki floating point representation mein 0.1 + 0.2 = 0.30000000000000004 hota hai. Ye woh cheez hai jo sirf JS mein nahi — sab languages mein hota hai IEEE 754 standard ki wajah se. Operators sikhna matlab numbers, comparisons aur logic — sab ki under-the-hood reality samajhna.
        </p>
        <div
          className="rounded-xl p-4 mt-4"
          style={{ background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.2)' }}
        >
          <p className="text-sm text-[#A1A1AA]">
            <span className="text-[#06B6D4] font-semibold">Is chapter mein:</span> Arithmetic, comparison, logical operators; if/else, ternary, nullish coalescing; for, while, for...of, for...in loops; switch statement — sab covered hai!
          </p>
        </div>
      </div>

      <OperatorPrecedenceDiagram />

      {/* Akshay-style insight box */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}
      >
        <p className="text-sm font-bold text-[#F59E0B] mb-1">Ye Sirf Math Nahi Hai — Ye Logic Hai</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <strong className="text-[#F5F5F7]">Ab sawaal ye aata hai</strong> — <code className="text-[#06B6D4]">let a = 5; console.log(a++)</code> kya print hoga? <strong className="text-[#F5F5F7]">5</strong> — kyunki post-increment pehle value use karta hai, phir badhata hai. Lekin <code className="text-[#06B6D4]">++a</code> hota toh <strong className="text-[#F5F5F7]">6</strong> aata — pehle badhata hai, phir return karta hai. Ye difference loops mein kabhi kabhi matter karta hai!
        </p>
      </div>

      {/* Card 1: Arithmetic & Assignment */}
      <div id="arithmetic-operators">
        <ConceptCard
          title="Arithmetic &amp; Assignment Operators — Numbers Ka Khel"
          emoji="🔢"
          difficulty="beginner"
          whatIsIt="Arithmetic operators numbers ke saath math karte hain — +, -, *, /, %, **. Assignment operators variable mein value store karte hain — =, +=, -=, *=, /=, %=, **=. Aur unary operators hain — ++, -- jo value ek se badhate ya ghatate hain. Yaar, % (modulo) ka use sirf remainder ke liye nahi — even/odd check aur circular arrays ke liye bhi hota hai!"
          whenToUse={[
            'Math calculations — price compute karna, discount lagana, total nikalna',
            '+= aur -= jab existing value update karni ho bina rewriting ke',
            '** (exponentiation) jab powers chahiye — 2**10 = 1024',
            '% (modulo) jab remainder chahiye — even/odd check, circular index',
          ]}
          whyUseIt="Ye operators programming ka foundation hain. ++ aur -- se loop counters manage hote hain. %= se rotation aur circular data structures banate hain. **= se compound assignment readability badhata hai. Ye shortcuts code concise aur readable banate hain."
          howToUse={{
            filename: 'operators.js',
            language: 'javascript',
            code: `// Arithmetic operators
const price = 1000
const discount = 0.2
const total = price - (price * discount) // 800
const tax = total * 1.18                  // 944
console.log('Final price:', tax)

// Exponentiation
const squareArea = 5 ** 2  // 25
const cubeVol = 3 ** 3     // 27

// Modulo — even/odd check
const isEven = (n) => n % 2 === 0
console.log(isEven(4))  // true
console.log(isEven(7))  // false

// Circular index (array mein wrap around)
const items = ['A', 'B', 'C']
let idx = 0
idx = (idx + 1) % items.length  // 1
idx = (idx + 1) % items.length  // 2
idx = (idx + 1) % items.length  // 0 — wapas start

// Assignment operators
let score = 100
score += 50   // score = 150
score -= 20   // score = 130
score *= 2    // score = 260
score /= 4    // score = 65
score **= 2   // score = 4225

// Pre vs post increment
let a = 5
console.log(a++)  // 5 — pehle use, phir increment
console.log(a)    // 6
console.log(++a)  // 7 — pehle increment, phir use`,
            explanation: 'Modulo operator % bahut useful hai — even/odd check karo, circular arrays banao, time format karo. ** (ES2016) exponentiation ke liye Math.pow() se better hai. Pre-increment (++a) pehle badhata hai phir return karta hai; post-increment (a++) pehle return karta hai phir badhata hai.',
          }}
          realWorldScenario="E-commerce app mein: price ke saath discount lagana, GST add karna, quantity multiply karna — sab arithmetic operators. Cart mein items ki count ke liye ++ aur --. Pagination ke liye modulo se circular navigation — ye sab daily use cases hain."
          commonMistakes={[
            {
              mistake: '0.1 + 0.2 === 0.3 assume karna',
              why: 'Floating point representation ki wajah se 0.1 + 0.2 = 0.30000000000000004 hota hai JavaScript mein.',
              fix: 'Money ke liye: Math.round((0.1 + 0.2) * 100) / 100. Ya toFixed(2) use karo display ke liye.',
            },
            {
              mistake: 'i++ aur ++i ka difference ignore karna',
              why: 'Loop mein usually fark nahi padta, lekin expression mein padta hai — let x = i++ aur let x = ++i alag results denge.',
              fix: 'Loop counter ke liye i++ theek hai. Jab value use bhi karni ho aur increment bhi — carefully choose karo.',
            },
          ]}
          proTip="Floats ke saath precise calculation ke liye integers mein kaam karo — paisa ke liye paise mein store karo (100 paisa = 1 rupee), display ke waqt convert karo. Ya Decimal.js library use karo financial apps mein."
        />
      </div>

      {/* Akshay-style insight box */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)' }}
      >
        <p className="text-sm font-bold text-[#10B981] mb-1">=== Hamesha — Ek Rule Jo Sab Fix Kar Deta Hai</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <strong className="text-[#F5F5F7]">Ye yaad rakho</strong> — <code className="text-[#06B6D4]">0 == false</code> is <strong className="text-[#F59E0B]">true</strong>. <code className="text-[#06B6D4]">0 === false</code> is <strong className="text-[#F59E0B]">false</strong>. == coercion karta hai, === nahi. Aur <code className="text-[#06B6D4]">null == undefined</code> true hai — ye ek accepted exception hai. Lekin hamesha rule: <strong className="text-[#F5F5F7]">triple equals (===) use karo</strong>. Ek baar yaad ho gaya, life mein type bugs nahi aayenge!
        </p>
      </div>

      {/* Card 2: Comparison & Logical */}
      <div id="comparison-logical">
        <ConceptCard
          title="Comparison &amp; Logical Operators — Short-Circuit Ka Jadoo"
          emoji="⚖️"
          difficulty="beginner"
          whatIsIt="Comparison operators values compare karte hain — ==, ===, !=, !==, >, &lt;, >=, &lt;=. Logical operators conditions combine karte hain — && (AND), || (OR), ! (NOT). Ye sab boolean return karte hain. Short-circuit evaluation ek powerful feature hai — && mein agar pehla false ho, doosra evaluate hi nahi hota. || mein agar pehla true ho, doosra skip. Ye performance aur null safety dono deta hai!"
          whenToUse={[
            'Hamesha === aur !== use karo — kabhi == ya != mat use karo (type coercion bugs aate hain)',
            '&& short-circuit se safely property access karo — user && user.name',
            '|| se default values do — name || "Guest"',
            '! se boolean flip karo — !isLoggedIn, !isEmpty(arr)',
          ]}
          whyUseIt="=== triple equals ensures ki type aur value dono match hon — predictable aur bug-free code. Short-circuit evaluation ek killer feature hai: a && b mein agar a false hai, b evaluate hi nahi hota. a || b mein agar a true hai, b skip hota hai. Ye null checks aur defaults ke liye invaluable hai."
          howToUse={{
            filename: 'comparison.js',
            language: 'javascript',
            code: `// === vs == — hamesha === use karo
console.log(0 == false)   // true — BAD! type coercion
console.log(0 === false)  // false — GOOD! strict
console.log('' == false)  // true — BAD!
console.log('' === false) // false — GOOD!
console.log(null == undefined)  // true
console.log(null === undefined) // false

// Short-circuit evaluation
const user = null
const name = user && user.name  // null — user falsy hai toh short-circuit
console.log(name)  // null — koi error nahi!

const username = null || 'Guest'  // 'Guest'
const port = process.env.PORT || 3000  // 3000 if not set

// Chaining comparisons — DO NOT do this:
// 1 < 2 < 3  // evaluates as (1 < 2) < 3 = true < 3 = 1 < 3 = true (misleading!)

// Complex conditions
const age = 25
const hasID = true
const canEnter = age >= 18 && hasID  // true
const isVIP = age > 30 || hasID      // true (hasID is true)
const isMinor = !canEnter            // false

// Logical assignment operators (ES2021)
let config = {}
config.theme ??= 'dark'   // assign only if null/undefined
config.debug ||= false    // assign if falsy
config.retry &&= 3        // assign only if truthy`,
            explanation: '=== strict equality hamesha use karo. Short-circuit se null checks handle hoti hain bina if/else ke. Logical assignment operators (??=, ||=, &&=) ES2021 mein aaye — concise aur powerful hain.',
          }}
          realWorldScenario="API response mein: data && data.user && data.user.profile.avatar — har step null check. User authentication: isLoggedIn && hasPermission('admin') && featureEnabled. Default values: config.timeout || 5000. Ye patterns har production codebase mein hote hain."
          commonMistakes={[
            {
              mistake: 'if (value == null) se null aur undefined dono check karna',
              why: 'Ye intentional bhi hota hai (null == undefined true hai), lekin confusing code banata hai.',
              fix: 'Explicit likho: if (value === null || value === undefined) ya modern way: if (value == null) ek accepted exception hai.',
            },
            {
              mistake: '|| se default values set karna jab 0 ya false valid values hain',
              why: '0 || 5 = 5 — 0 falsy hai! Agar 0 valid value hai toh || galat default dega.',
              fix: '?? (nullish coalescing) use karo: 0 ?? 5 = 0 — sirf null/undefined par fallback karta hai.',
            },
          ]}
          proTip="Optional chaining ke saath short-circuit: user?.profile?.avatar ?? 'default.png'. Ye ek line mein null-safe access aur default value deta hai. Modern JavaScript ka ek beautiful combination!"
        />
      </div>

      {/* Card 3: if/else, ternary, nullish coalescing */}
      <div id="conditionals">
        <ConceptCard
          title="if/else, Ternary &amp; Nullish Coalescing — Sahi Tool, Sahi Jagah"
          emoji="🔀"
          difficulty="beginner"
          whatIsIt="if/else code ka flow control karta hai conditionally. Ternary operator (condition ? valueIfTrue : valueIfFalse) ek-liner conditional hai — React JSX mein bade kaam aata hai. Nullish coalescing (??) sirf null/undefined par fallback deta hai — ye || se alag hai! ??: sirf null/undefined replace karta hai. ||: koi bhi falsy replace karta hai. Yahi fark bugs aur no-bugs ka hai!"
          whenToUse={[
            'if/else: complex conditions, multiple branches, side effects (console.log, function calls)',
            'Ternary: simple value selection — ek expression mein return ya assign karna',
            '??: null/undefined ke liye default values — 0 aur false ko preserve karna chahte ho',
            'Nested ternary: kabhi mat karo — if/else much more readable hai',
          ]}
          whyUseIt="Ternary operator JSX mein invaluable hai — {isLoggedIn ? <UserMenu /> : <LoginButton />}. ?? operator || se better hai jab 0, false, ya empty string valid values hain. Sahi tool sahi jagah use karna code ko self-documenting banata hai."
          howToUse={{
            filename: 'conditionals.js',
            language: 'javascript',
            code: `// if/else — complex logic ke liye
function getDiscount(user) {
  if (!user) return 0
  if (user.isPremium && user.yearsActive > 2) return 0.3
  if (user.isPremium) return 0.2
  if (user.isNewUser) return 0.1
  return 0
}

// Ternary — simple value selection
const greeting = user ? \`Welcome, \${user.name}!\` : 'Please login'
const statusColor = isActive ? '#10B981' : '#EF4444'
const buttonText = isLoading ? 'Loading...' : 'Submit'

// Nullish coalescing — null/undefined only
const config = {
  timeout: 0,          // valid value, 0 ka matlab no timeout
  retries: null,       // explicitly null
  debug: false,        // valid boolean
}
const timeout = config.timeout ?? 5000   // 0 — preserved!
const retries = config.retries ?? 3      // 3 — null replaced
const debug = config.debug ?? true       // false — preserved!

// Optional chaining + nullish coalescing
const avatar = user?.profile?.avatar ?? '/default-avatar.png'
const city = user?.address?.city ?? 'Unknown City'

// AVOID nested ternary — unreadable!
// const x = a ? b ? 'bb' : 'ba' : 'a'  // Don't!
// Instead use if/else or early returns`,
            explanation: 'if/else complex branching ke liye, ternary simple value selection ke liye, ?? null/undefined fallback ke liye. Optional chaining (?.) ke saath ?? ek powerful combination hai. Nested ternary kabhi mat use karo — immediate readability kill hai.',
          }}
          realWorldScenario="React component mein: {isLoggedIn ? <Dashboard /> : <Login />}. API response se data extract karna: const items = response?.data?.items ?? []. User settings mein: const theme = userPref.theme ?? systemDefault ?? 'dark'. Ye patterns React, Vue, Angular — sab mein daily use hote hain."
          commonMistakes={[
            {
              mistake: "config.value || 'default' jab 0 ya false valid hai",
              why: '0 aur false falsy hain — || se ye replace ho jaate hain even jab ye valid values hain.',
              fix: "config.value ?? 'default' use karo — sirf null/undefined replace karta hai.",
            },
            {
              mistake: 'Nested ternary — condition ? a ? x : y : b ? m : n',
              why: 'Human brain linear reasoning karta hai — 2+ levels ternary debugging nightmare hai.',
              fix: 'if/else ya switch use karo complex conditions ke liye. Readability > cleverness.',
            },
          ]}
          proTip="Early return pattern aur ternary milake clean code banao: function getLabel(status) { if (!status) return 'Unknown'; return status === 'active' ? 'Active' : 'Inactive'; }. Guard clause + ternary = beautiful readable code."
          demo={
            <DiffBlock
              title="Ternary vs if/else — Sahi Jagah Sahi Tool"
              language="javascript"
              bad={{
                code: `// Nested ternary — reading nightmare
const label = isAdmin
  ? isActive
    ? 'Admin Active'
    : 'Admin Inactive'
  : isActive
    ? 'User Active'
    : 'User Inactive'`,
                label: 'Galat — Unreadable Nested Ternary',
                explanation: 'Brain ko parse karna padta hai — bugs chhup jaate hain',
              }}
              good={{
                code: `// if/else — crystal clear
function getLabel(isAdmin, isActive) {
  if (isAdmin && isActive) return 'Admin Active'
  if (isAdmin) return 'Admin Inactive'
  if (isActive) return 'User Active'
  return 'User Inactive'
}`,
                label: 'Sahi — Early Returns, Crystal Clear',
                explanation: 'Padh ke instantly samajh aata hai — debug bhi aasaan',
              }}
            />
          }
        />
      </div>

      {/* Akshay-style insight box before loops */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <p className="text-sm font-bold text-[#7C3AED] mb-1">for...of vs for...in — Confusion Khatam Karo</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <strong className="text-[#F5F5F7]">Ab sawaal ye aata hai</strong> — array iterate karne ke liye for...in use karo? Nahi bhai! for...in array indices string ke roop mein deta hai — &quot;0&quot;, &quot;1&quot; — aur prototype properties bhi aa sakti hain! for...of arrays, strings, Maps, Sets ke liye hai — actual values deta hai. Rule: <strong className="text-[#F59E0B]">for...of arrays ke liye, for...in objects ke liye</strong>.
        </p>
      </div>

      {/* Card 4: Loops */}
      <div id="loops">
        <ConceptCard
          title="Loops — for, while, for...of, for...in — Kaun Kab?"
          emoji="🔁"
          difficulty="beginner"
          whatIsIt="Loops code ko baar baar repeat karte hain. for loop jab exact count pata ho. while loop jab condition-based repetition chahiye. for...of arrays, strings, Maps, Sets iterate karta hai — values milti hain (modern JS ka choice!). for...in objects iterate karta hai — keys milti hain. Har loop ka apna use case hai — galat loop use karna subtle bugs laata hai jo dhundna mushkil hota hai."
          whenToUse={[
            'for loop: jab exact count pata ho — 1 se 100 tak, array ka index chahiye',
            'while: jab condition-based loop chahiye — "jab tak user ne quit na kiya"',
            'for...of: arrays/iterables ki values chahiye — most common modern choice',
            'for...in: object ki keys chahiye — lekin hasOwnProperty check karo',
          ]}
          whyUseIt="for...of array iteration ke liye gold standard hai — clean, readable, works with any iterable. for...in objects ke liye useful hai, lekin caution chahiye kyunki prototype properties bhi aa sakti hain. while loop recursion-like patterns ke liye useful hai jab termination condition dynamic ho."
          howToUse={{
            filename: 'loops.js',
            language: 'javascript',
            code: `// Classic for loop — index chahiye ya fixed count
for (let i = 0; i < 5; i++) {
  console.log(\`Step \${i + 1}\`)
}

// Reverse loop
for (let i = arr.length - 1; i >= 0; i--) {
  console.log(arr[i])
}

// while — condition-based
let attempts = 0
while (attempts < 3) {
  const success = tryLogin()
  if (success) break
  attempts++
}

// do...while — at least once run hota hai
let input
do {
  input = getUserInput()
} while (!isValid(input))

// for...of — arrays, strings, Maps, Sets
const fruits = ['aam', 'kela', 'seb']
for (const fruit of fruits) {
  console.log(fruit)  // values milti hain
}

// for...of with index — entries() use karo
for (const [index, fruit] of fruits.entries()) {
  console.log(\`\${index}: \${fruit}\`)
}

// for...in — object keys
const person = { name: 'Rahul', age: 25, city: 'Mumbai' }
for (const key in person) {
  if (Object.hasOwn(person, key)) {  // prototype properties skip karo
    console.log(\`\${key}: \${person[key]}\`)
  }
}

// Break aur continue
for (let i = 0; i < 10; i++) {
  if (i === 3) continue  // 3 skip karo
  if (i === 7) break     // 7 pe stop karo
  console.log(i)         // 0,1,2,4,5,6
}`,
            explanation: 'for...of modern JavaScript mein preferred hai arrays ke liye — clean aur readable. for...in object keys ke liye, lekin hasOwnProperty/Object.hasOwn se filter karo inherited properties. while jab termination condition dynamic ho. break aur continue se loop control karo.',
          }}
          realWorldScenario="Data processing: for...of se API results iterate karo, transform karo. Config object se settings read karo for...in se. Retry logic: while (retries < maxRetries) ke saath network requests. Batch processing: for loop se fixed-size chunks process karo. Ye loops har Node.js backend mein daily use hote hain."
          commonMistakes={[
            {
              mistake: 'Array iterate karne ke liye for...in use karna',
              why: 'for...in array indices string format mein deta hai ("0", "1") aur prototype properties bhi aa sakti hain.',
              fix: 'Arrays ke liye hamesha for...of ya forEach. for...in sirf plain objects ke liye.',
            },
            {
              mistake: 'Infinite while loop — termination condition miss ho jaana',
              why: 'while (true) bina proper break ke — program hang ho jaata hai ya memory exhaust ho jaati hai.',
              fix: 'Hamesha clear exit condition rakho. Complex conditions ke liye counter ya timeout add karo as safety net.',
            },
          ]}
          proTip="Performance tip: for...of aur for loop dono fast hain. forEach slightly overhead hai (function call per iteration). Agar billions of iterations hain toh for loop marginally faster, otherwise readability prefer karo. Break karna chahte ho toh for...of, forEach se better hai."
        />
      </div>

      {/* Card 5: switch */}
      <div id="switch-statement">
        <ConceptCard
          title="switch Statement — Fall-Through Trap Se Bacho"
          emoji="🎛️"
          difficulty="beginner"
          whatIsIt="switch statement ek value ko multiple possible values ke saath compare karta hai — strict === comparison karta hai, magic nahi science hai. Lekin yaar, ek trap hai — bina break ke execution 'fall through' ho jaati hai next case mein! Ye silent bug hai — Ab sawaal ye aata hai ki aaj-kal switch use karein ya nahi? Professionals object lookup ya Map dispatch prefer karte hain — cleaner, testable, no fall-through risk."
          whenToUse={[
            'Ek variable ke 3+ discrete values pe alag action chahiye',
            'String ya number based routing — command parser, menu handler',
            'Intentional fall-through chahiye — multiple cases same code run karein',
            'Avoid karein jab conditions complex hain ya ranges involved hain',
          ]}
          whyUseIt="switch clean dihkta hai jab bohot saari cases hों. Lekin aaj-kal object lookup ya Map zyada preferred hain — ye data-driven hote hain, runtime pe modify ho sakte hain, aur fall-through risk nahi hota. switch ko samajhna important hai legacy code ke liye aur interviews ke liye."
          howToUse={{
            filename: 'switch.js',
            language: 'javascript',
            code: `// Basic switch
const day = 'Monday'
switch (day) {
  case 'Saturday':
  case 'Sunday':
    console.log('Weekend hai!')
    break
  case 'Monday':
    console.log('Week shuru!')
    break
  case 'Friday':
    console.log('Almost weekend!')
    break
  default:
    console.log('Normal weekday')
}

// switch ki tarah object lookup — often better!
const statusMessages = {
  200: 'OK',
  201: 'Created',
  400: 'Bad Request',
  401: 'Unauthorized',
  404: 'Not Found',
  500: 'Internal Server Error',
}
const getMessage = (code) => statusMessages[code] ?? 'Unknown Status'
console.log(getMessage(404))  // 'Not Found'

// Map-based dispatch — functions as values
const commands = new Map([
  ['help', () => showHelp()],
  ['quit', () => process.exit(0)],
  ['list', () => listItems()],
])
const handler = commands.get(userInput)
if (handler) handler()
else console.log('Unknown command')`,
            explanation: 'switch fall-through hota hai bina break ke — multiple cases same action share kar sakte hain (Saturday/Sunday example). Object lookup aur Map dispatch often cleaner alternatives hain — testable, dynamic, aur no fall-through risk.',
          }}
          realWorldScenario="HTTP method routing: switch(method) { case 'GET': ...; case 'POST': ... }. Error code handling. State machine transitions. Lekin Express.js mein tum router use karte ho, Redux mein reducers — ye sab switch ki evolved forms hain ya object-based alternatives hain."
          commonMistakes={[
            {
              mistake: 'break bhool jaana — unintentional fall-through',
              why: "Bina break ke case 'A' ke baad case 'B' bhi run hota hai — silent bug.",
              fix: 'Har case ke baad break lagao. Intentional fall-through ke waqt comment likho: // intentional fall-through.',
            },
            {
              mistake: 'switch mein type coercion — string vs number mix',
              why: "switch strict comparison (===) karta hai — case '1' aur case 1 alag hain. Lekin confusing hota hai.",
              fix: 'Switch use karne se pehle type consistent rakho. String parse karo ya number convert karo.',
            },
          ]}
          proTip="Modern code mein switch ki jagah object literal use karo jab sirf value map karni ho: const map = { a: 1, b: 2, c: 3 }; const result = map[key] ?? defaultValue. Ye cleaner, testable, aur extensible hai."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 3 Quiz — Operators &amp; Logic Ka Test
          </h3>
          <p className="text-sm text-[#71717A]">Ab sawaal ye aata hai — kya tumhara logic solid hai? 5 sawaal, 80%+ chahiye!</p>
        </div>
        <QuizSection questions={quizQuestions} chapterSlug="operators-control-flow" />
      </div>
    </div>
  )
}
