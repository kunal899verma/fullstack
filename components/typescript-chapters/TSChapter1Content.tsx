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

function TsCompilePipelineDiagram() {
  const items = [
    { label: '.ts Source File', sublabel: 'TypeScript code with type annotations', color: '#3178C6', bg: 'rgba(49,120,198,0.1)', border: 'rgba(49,120,198,0.3)', icon: '📝' },
    { label: 'tsc Compiler', sublabel: 'TypeScript compiler processes your code', color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.3)', icon: '⚙️' },
    { label: 'Type Checking', sublabel: '← Errors caught HERE — never reach production!', color: '#6366F1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.3)', icon: '🛡️' },
    { label: '.js Output', sublabel: 'Plain JavaScript — types completely erased', color: '#3178C6', bg: 'rgba(49,120,198,0.1)', border: 'rgba(49,120,198,0.3)', icon: '📄' },
    { label: 'Node.js / Browser', sublabel: 'Runs the clean JS — zero TypeScript overhead', color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.3)', icon: '🚀' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">TypeScript Compile Pipeline</p>
      <div className="max-w-lg mx-auto space-y-2">
        {items.map((item, i) => (
          <div key={i}>
            <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{item.sublabel}</p>
              </div>
            </div>
            {i < items.length - 1 && <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓</span></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

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
          TypeScript Kya Hai? — Ruko, Pehle Ye Myth Todte Hain
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ruko — ye mat socho TypeScript ek naya language hai. Nahi hai! TypeScript = JavaScript + Types. Runtime pe TypeScript <span className="text-[#3178C6] font-semibold">exist hi nahi karta</span> — sab compile hokar JavaScript ban jaata hai. Toh TypeScript ka kaam sirf ek hai: DEVELOPMENT mein bugs pakadna before they reach production.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Socho TypeScript ek <strong className="text-[#F5F5F7]">spell-checker hai for code</strong> — jaise Word mein red line aati hai typo pe, waise TypeScript IDE mein red line dikhata hai type error pe. Difference sirf itna hai: spell-checker galat spelling pakadta hai, TypeScript galat <em>logic</em> pakadta hai. Is chapter mein hum seedha WHY se shuru karenge — phir HOW.
        </p>
      </div>

      <TsCompilePipelineDiagram />

      <div id="ts-fayda">
        <ConceptCard
          title="TypeScript Ka Fayda — Kyun Seekhein?"
          emoji="🛡️"
          difficulty="beginner"
          whatIsIt="Suno, ek important baat samajhte hain: TypeScript Microsoft ne banaya hua open-source language hai jo JavaScript MEIN compile hoti hai — matlab browser ya Node.js TypeScript seedha nahi samajhte. tsc compiler .ts files ko .js mein convert karta hai. Types sirf development time tak hote hain — runtime pe woh erase ho jaate hain, koi overhead nahi. Ye samajhna zaroori hai: TypeScript ek DEVELOPMENT TOOL hai, production runtime tool nahi."
          whenToUse={[
            'Koi bhi medium-to-large project — multiple files, multiple developers',
            'Public NPM libraries — consumers ko types chahiye hoti hain',
            'Complex business logic — data shapes guarantee karo',
            'Long-term projects jahan refactoring hoti rehti hai',
            'React/Next.js projects — community standard ban gaya hai',
          ]}
          whyUseIt="Sawaal: JavaScript mein TypeError: Cannot read properties of undefined kab aata hai? RUNTIME pe — user ke saamne, production mein, 2 baje raat ko. TypeScript mein wahi bug IDE mein red underline dikhaata hai — code save karte waqt, developer ke screen pe. Fark samjhe? Ek mein user crash report karta hai, doosre mein tum khud fix karte ho. Stack Overflow ke har survey mein TypeScript top loved languages mein hai. Ek baar TypeScript seekh lo — wapas plain JS pe jaana torture lagta hai."
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
            explanation: 'Dekho — getUserAge(user: User): number ek living documentation hai. Yeh function signature khud bol raha hai: mujhe User do, main number dunga. Galat call karo toh compile time pe rok lega — runtime surprise ka toh sawal hi nahi.',
          }}
          realWorldScenario="Imagine karo — ek e-commerce startup ka cart logic: addToCart(product, quantity). JavaScript mein koi bhi pass kar sakta hai — string, null, undefined, kuch bhi. Koi rok nahi hai. TypeScript mein addToCart(product: Product, quantity: number) ek contract hai. Team ka naya member join kare aur galat type pass karne ki koshish kare — TypeScript wahan khada hai: 'bhai, ye nahi chalega.' Production bug zero. Team frustration zero."
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
          proTip="Ek secret batata hoon — TypeScript gradually adopt kar sakte ho, kal se hi. allowJs: true tsconfig mein set karo aur JS+TS side-by-side chalao. Ek file rename karo .ts mein, errors dekho, fix karo, agle file pe jao. ts-migrate tool hai jo automatically types add karta hai. Ye sab-kuch-ek-saath-badlo wali mentality chhodo — incremental migration real duniya mein hoti hai."
        />
      </div>

      <div id="js-vs-ts">
        <ConceptCard
          title="JS vs TypeScript — Side-by-Side Comparison"
          emoji="⚔️"
          difficulty="beginner"
          whatIsIt="Yahan ek common confusion clear karte hain — JavaScript aur TypeScript competition mein nahi hain. TypeScript JavaScript ka superset hai — iska matlab hai aaj ka JavaScript code kal TypeScript mein bina ek line change kiye kaam karega. JavaScript: browser-native, zero compilation, quick prototype. TypeScript: type safety, mast IDE support, self-documenting code, safe refactoring. Dono ke strengths alag hain — aur production mein aaj TypeScript DEFAULT choice hai."
          whenToUse={[
            'JavaScript: Quick scripts, small utilities, learning projects',
            'TypeScript: Production applications, team projects, anything medium+',
            'TypeScript: APIs aur libraries jo doosre use karenge',
            'TypeScript: Code jahan refactoring hoti rehti ho',
          ]}
          whyUseIt="Mujhse log poochte hain: 'bhai TypeScript sikhna worth hai?' Mere paas ek seedha jawab hai — Next.js, NestJS, Angular, SvelteKit — sab TypeScript by default hain. Matlab industry ne already decide kar liya. TypeScript seekhne ki cost: thodi zyada typing initially. Benefit: ek bade team mein ek production bug bhi save nahi karna padega — ROI guaranteed. 'Thoda complex hai' wala excuse kab tak chalega?"
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
            explanation: 'Dekho side-by-side comparison — JavaScript wali calculateTotal ke 3 calls hain, 2 galat hain aur koi error nahi. TypeScript wali mein wrong calls pe immediate compile error. Yahi fark hai: ek mein runtime pe crash, doosre mein develop time pe catch. CartItem interface ek contract hai — sab ko follow karna padega.',
          }}
          realWorldScenario="Kisi bhi 20+ developer wali company mein ye scenario roz hota hai — Developer A ek function likhta hai, Developer B galat arguments pass karta hai, QA 2 din baad bug dhundta hai, fix ke liye deploy lagta hai aur users ne already errors dekhe. TypeScript mein? Woh galat argument type karo toh IDE mein same second pe red underline. Bug kabhi QA tak pahunchta hi nahi."
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
          proTip="Abhi karo — typescriptlang.org/play kholo. Browser mein hi TypeScript likhao, compile karo, JavaScript output dekho real time mein. Zero installation, zero setup. Beginners ke liye yahi best playground hai. Koi cheez samajh nahi aayi? Wahan try karo — instantly answer milega."
        />
      </div>

      <div id="setup">
        <ConceptCard
          title="Setup — 3 Minute Mein TypeScript Shuru Karo"
          emoji="⚙️"
          difficulty="beginner"
          whatIsIt="Setup simple hai — 3 minute ka kaam. Do tarike hain: globally install (npm install -g typescript) taaki tsc command system mein anywhere chale, ya project-specific (npm install --save-dev typescript) jab sirf ek project ke liye chahiye. Real teams mein save-dev use hota hai — package.json mein version pin hoti hai, CI/CD pe automatically install hota hai. Ek important setting: tsconfig.json mein strict: true — yahi TypeScript ka asli power unlock karta hai."
          whenToUse={[
            'Global install: Quick experiments, command line se tsc use karna ho',
            'Local install: Production projects, team collaboration',
            'npx tsc: Ek baar use karna ho, install kiye bina',
            'ts-node: TypeScript seedha run karna bina compile kiye — development mein',
          ]}
          whyUseIt="Sawaal: local install ya global? Jawab: production projects mein hamesha local. Kyun? Team ka har member same TypeScript version use karta hai — koi 'mere machine pe kaam karta tha' wali problem nahi. CI/CD pipeline pe npm install se automatically sab setup hota hai. Version conflicts zero. Global install sirf quick experiments ke liye — isse zyada importance mat do usse."
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
            explanation: 'strict: true — yahi ek setting hai jo TypeScript ko uski full potential pe use karwati hai. Isko kabhi false mat karna. outDir compiled JS ke liye, rootDir TypeScript source ke liye. Development mein ts-node se compile step skip karo. Production build pe tsc use karo — compiled JS fast aur clean hoti hai.',
          }}
          realWorldScenario="Ye mat bhoolna — Next.js, NestJS, Angular ye sab TypeScript by default setup dete hain. npx create-next-app@latest chalao toh pehla sawaal poochte hain: 'TypeScript use karna hai?' Seedha Yes karo. Pure Node.js API ke liye manually setup karo — 5 minute ka kaam hai jisko hum abhi kar rahe hain. Industry already TypeScript pe hai, tum sirf catch up kar rahe ho."
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
          proTip="Development mein ts-node-dev use karo — nodemon ka TypeScript version. File change karo, automatically recompile, automatically restart. Command: ts-node-dev --respawn src/server.ts. Production build ke liye tsc + node. Ye workflow production-grade projects mein use hoti hai — internalize kar lo from day one."
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
