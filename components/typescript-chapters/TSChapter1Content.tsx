'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const tsChapter1Quiz: QuizQuestion[] = [
  {
    question: 'TypeScript aur JavaScript mein sabse bada fark kya hai?',
    options: [
      { text: 'TypeScript browser mein seedha run hota hai', correct: false, explanation: 'TypeScript browser mein directly run nahi hota — pehle JavaScript mein compile karna padta hai.' },
      { text: 'TypeScript static type checking deta hai jo compile time pe bugs pakadta hai', correct: true, explanation: 'Bilkul sahi! TypeScript ka main fayda compile time type safety hai — runtime se pehle errors pakad lo.' },
      { text: 'TypeScript code JavaScript se 10x faster run karta hai', correct: false, explanation: 'TypeScript JavaScript mein hi compile hota hai — runtime performance same rehti hai.' },
      { text: 'TypeScript mein async/await nahi hota', correct: false, explanation: 'TypeScript mein async/await poora support hai — ye JavaScript feature TypeScript mein bhi kaam karta hai.' },
    ],
  },
  {
    question: 'Type error TypeScript mein kab pakdi jaati hai?',
    options: [
      { text: 'Sirf production mein jab user use kare', correct: false, explanation: 'Yahi TypeScript ka main advantage hai ki production se pehle pakadta hai.' },
      { text: 'Runtime pe jab code execute ho', correct: false, explanation: 'TypeScript compile time pe type errors pakadta hai — runtime se bahut pehle.' },
      { text: 'Compile time pe — code run karne se pehle', correct: true, explanation: 'Sahi! tsc command chalate hi ya IDE mein type karte waqt TypeScript errors dikhata hai.' },
      { text: 'Kabhi nahi — TypeScript errors ignore karta hai', correct: false, explanation: 'TypeScript strict mode mein type errors clearly report karta hai.' },
    ],
  },
  {
    question: 'TypeScript project mein type annotation kaise likhte hain?',
    options: [
      { text: 'Variable ke baad angle brackets: name<string>', correct: false, explanation: 'Angle brackets generics ke liye hain, type annotations ke liye nahi.' },
      { text: 'Variable ke baad colon: name: string', correct: true, explanation: 'Sahi! TypeScript mein colon ke baad type likho — let name: string = "Rahul".' },
      { text: 'Variable ke pehle type: string name', correct: false, explanation: 'Ye C/Java style hai — TypeScript mein colon syntax use hota hai.' },
      { text: 'Double colon use karo: name:: string', correct: false, explanation: 'Double colon TypeScript mein valid syntax nahi hai.' },
    ],
  },
  {
    question: 'TypeScript project compile karne ka command kya hai?',
    options: [
      { text: 'node compile app.ts', correct: false, explanation: 'Node TypeScript seedha compile nahi karta — tsc command use karo.' },
      { text: 'typescript app.ts', correct: false, explanation: 'Ye valid command nahi hai — TypeScript compiler tsc ke naam se aata hai.' },
      { text: 'tsc app.ts', correct: true, explanation: 'Bilkul sahi! tsc (TypeScript Compiler) command .ts files ko .js mein compile karta hai.' },
      { text: 'npm run ts app.ts', correct: false, explanation: 'Ye package.json script hogi — directly tsc command use karo.' },
    ],
  },
]

export default function TSChapter1Content() {
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
          TypeScript Kya Hai? — JavaScript Ka Type-Safe Bhai
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          TypeScript ek programming language hai jo JavaScript ka superset hai — matlab sab valid JavaScript code TypeScript mein bhi valid hai. Par TypeScript ek powerful cheez add karta hai: <span className="text-[#3178C6] font-semibold">static types</span>. In types ki wajah se bugs deploy hone se pehle hi pakad jaate hain, IDE autocomplete better hoti hai, aur code khud apni documentation ban jaata hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum samjhenge: TypeScript kya hai, JavaScript se kaise alag hai, installation kaise karein, aur apna pehla .ts file kaise likhein. Shuruat easy hai — bas JS pe kuch naya seekhna hai!
        </p>
      </div>

      <div id="ts-fayda">
        <ConceptCard
          title="TypeScript Ka Fayda — Kyun Seekhein?"
          emoji="🛡️"
          difficulty="beginner"
          whatIsIt="TypeScript Microsoft ne banaya hua open-source language hai jo JavaScript mein compile hoti hai. Browser ya Node.js TypeScript seedha nahi samajhte — tsc compiler .ts files ko .js mein convert karta hai. Types sirf development time tak hote hain — runtime pe koi overhead nahi. Iska fayda: bugs code likhte waqt pakad jaate hain, production tak pahunchte hi nahi."
          whenToUse={[
            'Koi bhi medium-to-large project — multiple files, multiple developers',
            'Public NPM libraries — consumers ko types chahiye hoti hain',
            'Complex business logic — data shapes guarantee karo',
            'Long-term projects jahan refactoring hoti rehti hai',
            'React/Next.js projects — community standard ban gaya hai',
          ]}
          whyUseIt="JavaScript mein TypeError: Cannot read properties of undefined runtime pe aata hai — user ke saamne crash. TypeScript mein wahi bug IDE mein red underline dikhaata hai — save karte waqt. Stack Overflow survey mein TypeScript consistently top 5 languages mein hai. GitHub pe most popular languages mein JavaScript ke baad TypeScript aa gaya hai. Ek baar TypeScript seekh lo — wapas plain JS pe jaana mushkil lagta hai."
          howToUse={{
            filename: 'why-typescript.ts',
            language: 'typescript',
            code: `// ❌ JavaScript — silent bugs possible
function getUserAge(user) {
  return user.age  // What if user is null? Runtime crash!
}

getUserAge(null)          // Runtime: TypeError — production mein crash!
getUserAge({ name: 'Rahul' })  // Returns undefined — silent bug

// ✅ TypeScript — compile time protection
interface User {
  name: string
  age: number
  email: string
}

function getUserAge(user: User): number {
  return user.age
}

// getUserAge(null)           // TS Error: null is not assignable to User
// getUserAge({ name: 'Rahul' })  // TS Error: age is missing

getUserAge({ name: 'Rahul', age: 25, email: 'r@test.com' })  // ✅ OK!

// IDE benefits:
const user: User = { name: 'Priya', age: 30, email: 'p@test.com' }
user.  // Type karo — IDE dikhayega: name, age, email
// user.phone  // Error! Property 'phone' does not exist`,
            explanation: 'TypeScript types function signatures ko self-documenting banate hain. getUserAge(user: User): number bolta hai — User chahiye, number milega. Galat call compile time pe rok deta hai — runtime surprise nahi.',
          }}
          realWorldScenario="Imagine karo ek e-commerce site ka cart logic: addToCart(product, quantity). JavaScript mein koi bhi pass kar sakta hai — string, null, undefined. TypeScript mein addToCart(product: Product, quantity: number) force karta hai sahi types pass karo. Team ka naya member bhi galti nahi kar sakta — TypeScript batata hai kya chahiye."
          commonMistakes={[
            {
              mistake: 'TypeScript install kiya lekin strict: false rakha',
              why: 'Strict mode ke bina TypeScript half-hearted protection deta hai — many bugs still slip through.',
              fix: 'tsconfig.json mein "strict": true hamesha rakho. Ek baar set karo, lifetime ka fayda.',
            },
            {
              mistake: '.ts file banaya lekin same JS likh diya bina types ke',
              why: 'TypeScript ka koi fayda nahi mila — sirf extension badla.',
              fix: 'Function parameters, return types, variables ko explicitly type karo. Start simple — ek function se karo.',
            },
          ]}
          proTip="TypeScript gradually adopt kar sakte ho! allowJs: true tsconfig mein se mix JS+TS codebase chalao. Pehle .js files ko .ts mein rename karo ek ek karke. ts-migrate tool bhi hai jo automatically types add karta hai existing JS code mein. Zero se shuru karne ki zaroorat nahi."
        />
      </div>

      <div id="js-vs-ts">
        <ConceptCard
          title="JS vs TypeScript — Side-by-Side Comparison"
          emoji="⚔️"
          difficulty="beginner"
          whatIsIt="JavaScript aur TypeScript dono ke apne strengths hain. JavaScript: browser-native, no compilation step, quick prototyping. TypeScript: type safety, better IDE support, self-documenting code, safer refactoring. TypeScript JavaScript ka superset hai — TypeScript mein woh sab kuch likha ja sakta hai jo JavaScript mein likhte hain — plus type annotations."
          whenToUse={[
            'JavaScript: Quick scripts, small utilities, learning projects',
            'TypeScript: Production applications, team projects, anything medium+',
            'TypeScript: APIs aur libraries jo doosre use karenge',
            'TypeScript: Code jahan refactoring hoti rehti ho',
          ]}
          whyUseIt="JavaScript flexibility deta hai — quick likhna easy. TypeScript safety deta hai — large projects mein essential. Modern tooling (Next.js, NestJS, Angular) TypeScript default use karta hai. TypeScript seekhne ki cost: thodi zyada typing. Benefit: kam bugs, better autocomplete, safer changes. ROI positive hai almost always."
          howToUse={{
            filename: 'js-vs-ts-comparison.ts',
            language: 'typescript',
            code: `// ── JavaScript ───────────────────────────────────────────────────
// No types — flexible but risky
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

// Ye sab valid JavaScript hain — lekin kaun sahi hai?
calculateTotal([{ price: 100, qty: 2 }])  // ✅ Sahi
calculateTotal('not an array')             // Runtime crash!
calculateTotal([{ cost: 100, quantity: 2 }])  // NaN — wrong keys!

// ── TypeScript ────────────────────────────────────────────────
// Types se mistakes compile time pe pakdo
interface CartItem {
  price: number
  qty: number
  name: string
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

// calculateTotal('not an array')    // TS Error: string is not CartItem[]
// calculateTotal([{ cost: 100 }])   // TS Error: missing price, qty, name

calculateTotal([
  { price: 100, qty: 2, name: 'Shirt' },
  { price: 250, qty: 1, name: 'Shoes' },
])  // ✅ 450 — type-safe!

// ── Key Differences Table ─────────────────────────────────────
// | Feature          | JavaScript      | TypeScript          |
// |------------------|-----------------|---------------------|
// | Type checking    | Runtime only    | Compile time        |
// | Learning curve   | Easier          | Slightly harder     |
// | IDE support      | Basic           | Excellent           |
// | Error messages   | Runtime         | Compile time        |
// | Browser support  | Native          | Needs compilation   |
// | File extension   | .js             | .ts / .tsx          |
// | Compilation      | Not needed      | tsc required        |`,
            explanation: 'TypeScript mein types optional nahi hain — encouraged hain. Function signature itself documentation hai. CartItem interface bolta hai item mein price (number), qty (number), name (string) hona chahiye. Wrong structure pe compile error — runtime surprise nahi.',
          }}
          realWorldScenario="Sequifi jaisi product company mein 20 developers ek codebase pe kaam karte hain. JavaScript mein: developer A ek function likhta hai — developer B galat arguments pass karta hai — staging pe bug milta hai 2 din baad. TypeScript mein: galat arguments ke saath IDE seedha error — same line pe fix."
          commonMistakes={[
            {
              mistake: 'Sochna ki TypeScript runtime pe safer hai',
              why: 'TypeScript types sirf compile time tak hote hain. Runtime pe woh erase ho jaate hain — vanilla JS hi run hoti hai.',
              fix: 'Runtime validation ke liye zod ya yup use karo. TypeScript + runtime validation = complete safety.',
            },
            {
              mistake: 'TypeScript seedha skip karna "complex hai" bolke',
              why: 'Basic TypeScript bahut simple hai — sirf : type likhna hai. Complex features baad mein seekho.',
              fix: 'Start simple: function parameters aur return types annotate karo. 80% benefit sirf isse milta hai.',
            },
          ]}
          proTip="TypeScript Playground (typescriptlang.org/play) try karo — browser mein hi TypeScript likhao, compile karo, output dekho. Installation ki zaroorat nahi. Beginners ke liye best way hai concepts try karna without any setup."
        />
      </div>

      <div id="setup">
        <ConceptCard
          title="Setup — 3 Minute Mein TypeScript Shuru Karo"
          emoji="⚙️"
          difficulty="beginner"
          whatIsIt="TypeScript install karne ke do common ways hain: globally (npm install -g typescript) taaki tsc command anywhere use ho, ya project-specific (npm install --save-dev typescript) jab sirf ek project ke liye chahiye. Modern projects mein save-dev prefer kiya jata hai — version control mein pin hota hai. tsconfig.json compiler options define karta hai — strict mode, output directory, target JS version."
          whenToUse={[
            'Global install: Quick experiments, command line se tsc use karna ho',
            'Local install: Production projects, team collaboration',
            'npx tsc: Ek baar use karna ho, install kiye bina',
            'ts-node: TypeScript seedha run karna bina compile kiye — development mein',
          ]}
          whyUseIt="Local install (save-dev) prefer karo kyunki: team ka har member same TypeScript version use karta hai, CI/CD mein automatically install hota hai, package.json mein version pinned rehta hai. Global install convenience ke liye hai lekin version conflicts ho sakte hain different projects mein."
          howToUse={{
            filename: 'setup.sh',
            language: 'bash',
            code: `# ── OPTION 1: Global Install ──────────────────────────────────
npm install -g typescript

# Version check
tsc --version  # TypeScript 5.x.x

# ── OPTION 2: Project Install (Recommended) ───────────────────
mkdir my-ts-project && cd my-ts-project
npm init -y
npm install --save-dev typescript

# tsc available through npx ya npm script
npx tsc --version

# ── tsconfig.json Banao ───────────────────────────────────────
npx tsc --init  # Default tsconfig generate karta hai

# Ya manually banao tsconfig.json:
# {
#   "compilerOptions": {
#     "target": "ES2022",          // Output JS version
#     "module": "commonjs",        // Module system
#     "strict": true,              // ← ALWAYS true!
#     "esModuleInterop": true,     // CommonJS default imports
#     "skipLibCheck": true,        // Type checking skip for .d.ts
#     "outDir": "./dist",          // Compiled JS output folder
#     "rootDir": "./src"           // Source TypeScript files
#   },
#   "include": ["src/**/*"],
#   "exclude": ["node_modules", "dist"]
# }

# ── Pehla TypeScript File ─────────────────────────────────────
# src/hello.ts
# function greet(name: string): string {
#   return \`Namaste, \${name}!\`
# }
# console.log(greet('Duniya'))

# Compile karo:
npx tsc

# Output: dist/hello.js (type annotations removed, plain JS)
# Run karo:
node dist/hello.js  # Namaste, Duniya!

# ── Development mein ts-node use karo ─────────────────────────
npm install --save-dev ts-node
npx ts-node src/hello.ts  # Seedha run — no manual compile needed`,
            explanation: 'strict: true most important setting hai — hamesha on rakho. outDir compiled JS ke liye, rootDir TypeScript source ke liye. ts-node development mein convenient hai — compile step skip karta hai. Production build ke liye tsc use karo.',
          }}
          realWorldScenario="Next.js project mein TypeScript already configured hota hai — npx create-next-app@latest --typescript se ready-to-go TypeScript project milta hai. NestJS, Angular bhi TypeScript by default. Pure Node.js APIs ke liye manually setup karo — 5 minutes ka kaam hai."
          commonMistakes={[
            {
              mistake: 'tsconfig.json mein strict: true miss karna',
              why: 'Default strict: false rakhne pe TypeScript half protection deta hai — null checks, implicit any sab disabled.',
              fix: 'strict: true ek setting se sab strict checks on ho jaati hain: strictNullChecks, noImplicitAny, strictFunctionTypes, etc.',
            },
            {
              mistake: 'dist folder git mein commit karna',
              why: 'Compiled JS files generated hain — source nahi. .gitignore mein dist/ dalna chahiye.',
              fix: '.gitignore mein dist/ ya build/ add karo. Sirf src/ aur tsconfig.json commit karo.',
            },
          ]}
          proTip="ts-node-dev (npm install -g ts-node-dev) development ke liye perfect tool hai — nodemon jaisa kaam karta hai but TypeScript ke saath. File change pe automatically recompile aur restart karta hai. Command: ts-node-dev --respawn src/server.ts. Production mein tsc + node use karo."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 1 Quiz — TypeScript Basics
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — TypeScript ka foundation check karo!
          </p>
        </div>
        <QuizSection questions={tsChapter1Quiz} chapterSlug="ts-what-is" />
      </div>
    </div>
  )
}
