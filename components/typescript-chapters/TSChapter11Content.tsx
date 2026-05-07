'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'strict: true tsconfig mein enable karne se kya kya flags on hote hain?',
    options: [
      { text: 'Sirf noImplicitAny', correct: false, explanation: 'strict ek umbrella flag hai — kai flags ek saath enable hote hain.' },
      { text: 'noImplicitAny, strictNullChecks, strictFunctionTypes, strictBindCallApply aur zyada', correct: true, explanation: 'Sahi! strict: true sab strict mode flags ek saath on karta hai. Individually bhi set kar sakte ho.' },
      { text: 'Sirf runtime errors check karta hai', correct: false, explanation: 'strict compile-time checks hain — runtime pe koi effect nahi.' },
      { text: 'Code ko slower banata hai', correct: false, explanation: 'strict sirf TypeScript checking affect karta hai — output JavaScript same rehti hai.' },
    ],
  },
  {
    question: 'target aur lib tsconfig options mein kya fark hai?',
    options: [
      { text: 'Koi fark nahi — dono same hain', correct: false, explanation: 'Bilkul alag hain — compilation output vs available APIs.' },
      { text: 'target: output JavaScript version; lib: TypeScript mein available APIs', correct: true, explanation: 'Sahi! target: "ES2020" se output ES2020 syntax mein aayega. lib: ["ES2020"] se TypeScript ko pata chalta hai kaunse APIs available hain (Promise, Map, Set etc.).' },
      { text: 'lib: source file location; target: output location', correct: false, explanation: 'Source/output locations rootDir/outDir se set hote hain.' },
      { text: 'target browser ke liye hai; lib Node.js ke liye', correct: false, explanation: 'Dono platform-agnostic hain — target aur lib independently set hote hain.' },
    ],
  },
  {
    question: 'Path aliases (@/) tsconfig mein kaise setup karte hain?',
    options: [
      { text: 'paths aur baseUrl options se', correct: true, explanation: 'Sahi! baseUrl: "." aur paths: { "@/*": ["src/*"] } — TypeScript path resolving ke liye. Bundler (webpack/vite) mein bhi same aliases add karne padte hain.' },
      { text: 'alias: { "@": "src" } se', correct: false, explanation: 'alias option tsconfig mein nahi hota — ye webpack/vite config mein hota hai.' },
      { text: 'Sirf Next.js mein possible hai', correct: false, explanation: 'Path aliases kisi bhi TypeScript project mein possible hain — bundler support bhi chahiye hogi.' },
      { text: 'import shortcuts se', correct: false, explanation: 'TypeScript mein shortcut imports nahi hote — paths configuration se aliases set hoti hain.' },
    ],
  },
  {
    question: 'strictNullChecks: false hone se kya problem hoti hai?',
    options: [
      { text: 'Code faster compile hota hai', correct: false, explanation: 'Compile speed pe negligible effect hai.' },
      { text: 'null aur undefined kisi bhi type ko assign ho sakte hain — runtime null reference errors miss ho jaati hain', correct: true, explanation: 'Sahi! strictNullChecks: false mein null check enforce nahi hota — runtime TypeError: Cannot read property of null kabhi bhi aa sakta hai.' },
      { text: 'null values use nahi kar sakte', correct: false, explanation: 'Ulta — strictNullChecks: false mein null everywhere ja sakta hai.' },
      { text: 'TypeScript errors zyada aate hain', correct: false, explanation: 'strictNullChecks: false mein errors kam aate hain — lekin runtime bugs zyada.' },
    ],
  },
  {
    question: 'Project references tsconfig mein kab use karte hain?',
    options: [
      { text: 'Small single-package projects mein hamesha', correct: false, explanation: 'Small projects mein project references overkill hai.' },
      { text: 'Monorepos ya large multi-package codebases mein incremental builds ke liye', correct: true, explanation: 'Sahi! Project references se packages independently compile hote hain — sirf changed packages rebuild hoti hain. Build time dramatically kam hota hai.' },
      { text: 'Sirf testing ke liye', correct: false, explanation: 'Project references build optimization ke liye hain — testing specific feature nahi.' },
      { text: 'TypeScript 3.0 se pehle use karte the', correct: false, explanation: 'Project references TypeScript 3.0 mein introduce hue the — modern feature hai.' },
    ],
  },
]

function TsconfigMapDiagram() {
  const items = [
    { label: 'Output Options', sublabel: 'target (ES version) · module (CJS/ESM) · outDir (dist/) · rootDir (src/)', color: '#3178C6', bg: 'rgba(49,120,198,0.1)', border: 'rgba(49,120,198,0.3)', icon: '📤' },
    { label: 'Safety Options', sublabel: 'strict · noImplicitAny · strictNullChecks · strictFunctionTypes', color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.3)', icon: '🛡️' },
    { label: 'Paths Options', sublabel: 'baseUrl · paths (@/* aliases) · moduleResolution (bundler/node/node16)', color: '#6366F1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.3)', icon: '🗂️' },
    { label: 'Build Options', sublabel: 'incremental · composite · skipLibCheck · declaration · declarationMap', color: '#3178C6', bg: 'rgba(49,120,198,0.1)', border: 'rgba(49,120,198,0.3)', icon: '⚙️' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">tsconfig.json Option Groups</p>
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

export default function TSChapter11Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(49,120,198,0.06)', border: '1px solid rgba(49,120,198,0.25)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          tsconfig Deep Dive — TypeScript Compiler Ko Samjho
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ye fact shocking hai — strict: false hone pe TypeScript sirf JavaScript hai thoda better syntax ke saath. Null pointer exceptions, implicit any, uninitialized properties — sab possible rahenge. Bahut saare tutorials mein strict: false dikhate hain "simple examples" ke liye — ye ek terrible habit set karta hai. Hamesha strict: true se shuru karo.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ab sawaal ye aata hai — tsconfig ke itne options hain, kaunsa set karein? target, module, lib, moduleResolution — ye sab alag alag hain, confusing lagta hai. Is chapter mein systematically samjhenge — har option ka WHY, phir HOW. Ek production-ready tsconfig banate hain saath mein.
        </p>
      </div>

      <TsconfigMapDiagram />

      <div id="compiler-options">
        <ConceptCard
          title="Recommended tsconfig.json — Node.js Backend"
          emoji="⚙️"
          difficulty="intermediate"
          whatIsIt="tsconfig.json TypeScript compiler ka complete instruction manual hai — output JavaScript version kya ho, kahan output karo, kaunsi strict checks perform karo, modules kaise resolve karo, source maps banao ya nahi. Ye sab compilerOptions mein jaata hai. include/exclude se control karo kaunse files compile karni hain. Ek sahi tsconfig production aur development dono ke liye foundation hai."
          whenToUse={[
            'Koi bhi TypeScript project shuru karte waqt',
            'Existing project ko strict mode mein migrate karte waqt',
            'Monorepo packages ke liye individual configs',
          ]}
          whyUseIt="Galat tsconfig se bahut problems hote hain — esModuleInterop: false se import express from 'express' kaam nahi karta. skipLibCheck: false se node_modules ke type errors tumhare code mein aate hain. strict: false se type safety half. Sahi tsconfig ek baar set karo — phir TypeScript tumhara partner hai, dushman nahi."
          howToUse={{
            code: `// tsconfig.json — Node.js Backend (Recommended)
{
  "compilerOptions": {
    // ── Output ──────────────────────────────────────
    "target": "ES2022",        // output JavaScript version
    "module": "commonjs",      // require() system (Node.js default)
    "lib": ["ES2022"],         // available built-in APIs
    "outDir": "./dist",        // compiled JS output folder
    "rootDir": "./src",        // source TypeScript files

    // ── Strict Mode ─────────────────────────────────
    "strict": true,            // enable all strict checks

    // ── Module Resolution ───────────────────────────
    "moduleResolution": "node", // how imports resolve
    "esModuleInterop": true,    // import express from 'express' works
    "resolveJsonModule": true,  // import config.json allowed

    // ── Paths ───────────────────────────────────────
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]         // @/utils/db → src/utils/db
    },

    // ── Source Maps ─────────────────────────────────
    "sourceMap": true,         // debugging ke liye

    // ── Build Options ───────────────────────────────
    "incremental": true,       // faster subsequent builds
    "skipLibCheck": true,      // node_modules types skip — faster

    // ── Declaration ─────────────────────────────────
    "declaration": true,       // .d.ts files generate karo (if library)
    "declarationMap": true     // declaration source maps
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}`,
            language: 'json',
            explanation: 'Har option ka reason hai. target: ES2022 — Node.js 18+ ES2022 support karta hai, so downcompile nahi karna. esModuleInterop: true — CommonJS default export mechanism se ES module default imports compatible karta hai. incremental: true — .tsbuildinfo file banata hai, next build sirf changed files recompile karta hai. skipLibCheck: true — node_modules ki .d.ts files skip, bahut faster builds.',
            filename: 'tsconfig.json',
          }}
          realWorldScenario="Har naye project mein ye tsconfig copy karo baseline ke taur pe. Team onboarding mein — naya developer clone kare, npm install kare, aur TypeScript sahi kaam kare. Koi 'why is import not working' confusion nahi. Sahi tsconfig ek silent productivity multiplier hai — team ke sab log same rules pe hain."
          commonMistakes={[
            { mistake: 'esModuleInterop: false rakhna', why: 'import fs from "fs" kaam nahi karta — import * as fs from "fs" likhna padta hai', fix: 'esModuleInterop: true rakho — modern import syntax kaam karta hai' },
            { mistake: 'skipLibCheck: false rakhna large projects mein', why: 'node_modules types check karna bahut slow karta hai build', fix: 'skipLibCheck: true — node_modules ke .d.ts files skip hote hain' },
          ]}
          proTip="Multiple tsconfig files use karo — tsconfig.json base, tsconfig.build.json production build ke liye (exclude tests), tsconfig.test.json jest ke liye. extends field se base inherit karo. Ye pattern large projects mein bahut useful hai — har environment ke liye slightly different config, lekin DRY principle maintain."
        />
      </div>

      <div id="strict-mode">
        <ConceptCard
          title="Strict Mode — TypeScript Ka Safety Net"
          emoji="🛡️"
          difficulty="intermediate"
          whatIsIt="strict: true ek single flag hai jo actually 7+ flags ek saath on karta hai — noImplicitAny, strictNullChecks, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, noImplicitThis, useUnknownInCatchVariables. Ye sab individually bhi set kar sakte ho. Lekin strict: true best practice hai — sab ek saath on. Har flag ek specific real-world bug class prevent karta hai."
          whenToUse={[
            'Naye projects mein hamesha strict: true se start karo',
            'Existing projects: gradually enable karo individual flags',
          ]}
          whyUseIt="strictNullChecks off karo — null pointer exceptions TypeScript catch nahi karega. noImplicitAny off karo — any types sirf hote hain, TypeScript chup rahega. Ye TypeScript ki real value khatam ho jaati hai. Strict mode on karne se initially errors aate hain — ye features nahi, ye bugs hain jo pehle se code mein the. Fix karo unhe, phir TypeScript tumhara guardian hai."
          howToUse={{
            code: `// strict: true ke andar ye flags shamil hain:

// 1. noImplicitAny — inferred any pe error
function process(data) {  // ❌ Parameter 'data' has implicit any
  return data.toUpperCase()
}
function process(data: string) { return data.toUpperCase() }  // ✅

// 2. strictNullChecks — null/undefined explicit check
let user: User | null = getUser()
user.name  // ❌ Object is possibly null
if (user) user.name  // ✅ narrowed to User

// 3. strictFunctionTypes — function parameter variance
type Fn = (x: string | number) => void
const fn: Fn = (x: string) => {}  // ❌ not assignable

// 4. strictPropertyInitialization — class fields
class Service {
  private db: Database  // ❌ not definitely assigned
  private db: Database = new Database()  // ✅
  // ya constructor mein assign karo
}

// 5. noImplicitThis — class methods
const obj = {
  name: 'Rahul',
  greet() {
    console.log(this.name)  // ✅ TypeScript knows 'this'
  }
}

// Incremental strict mode migration:
{
  "compilerOptions": {
    "strict": false,        // off globally
    "noImplicitAny": true,  // specific flags on
    "strictNullChecks": true
  }
}`,
            language: 'typescript',
            explanation: 'Ab sawaal ye aata hai — legacy project mein strict: true ek baar mein enable karo toh thousands of errors? Haan, isliye gradual approach hai. strict: false rakhte hue individual flags ek ek enable karo. pehle noImplicitAny — sabse zyada bugs pakadta hai. Phir strictNullChecks — sabse zyada production crashes prevent karta hai. Ek sprint mein ek flag, manageable migration.',
            filename: 'strict-mode.ts',
          }}
          realWorldScenario="Legacy JS codebase ko TypeScript pe migrate karo — allow-js: true se start karo, strict: false, rename files .ts. Pehle quarter mein sirf noImplicitAny. Dusre mein strictNullChecks. Teen mahine mein significant type coverage. Team frustrated nahi hoti kyunki incremental — har sprint progress visible hai."
          commonMistakes={[
            { mistake: 'Legacy project mein ek baar mein strict: true karna', why: 'Thousands of errors — overwhelming', fix: 'Gradual migration: individual flags one by one enable karo' },
          ]}
          proTip="TypeScript error count track karo migration mein — tsc --noEmit 2>&1 | grep 'error TS' | wc -l. Sprint start pe count, sprint end pe count. Downward trend motivation deta hai team ko. Ye quantitative progress hai — stakeholders ko bhi samjha sakte ho ki TypeScript migration ke kya tangible benefits hain."
        />
      </div>

      <div id="module-target">
        <ConceptCard
          title="target & module — Output Configuration"
          emoji="🎯"
          difficulty="intermediate"
          whatIsIt="Teen alag options hain jo log confuse karte hain. target — compiled JavaScript mein kaunsi syntax features use hongi (arrow functions, async/await, classes). module — output mein module system kaunsa hoga (require vs import). lib — TypeScript ko batao kaunsi runtime APIs available hain (Promise, Map, Array.at etc.). Teen alag concerns, teen alag options. target aur lib usually sync mein hote hain lekin technically independent hain."
          whenToUse={[
            'Node.js 18+: target: ES2022, module: commonjs (ya node16/nodenext)',
            'Browser/ESM: target: ES2020, module: ESNext',
            'Library: target: ES2015, module: commonjs + types generate karo',
          ]}
          whyUseIt="Galat target — target: ES5 set karo modern Node.js ke liye — sab async/await, destructuring polyfill hoga, output code ugly aur heavy. target: ES2022 set karo Node.js 18 ke liye — modern syntax, readable output, smaller bundle. Galat module — module: ESNext Node.js mein — require nahi chalega, crash. Ye foundations hain — sahi karo ek baar."
          howToUse={{
            code: `// Different project types ke liye configs:

// Node.js Backend (CommonJS)
{
  "target": "ES2022",
  "module": "commonjs",
  "lib": ["ES2022"]
}

// Node.js Backend (ESM — package.json mein "type": "module")
{
  "target": "ES2022",
  "module": "node16",  // ya "nodenext"
  "lib": ["ES2022"],
  "moduleResolution": "node16"
}

// Modern Browser / Vite / Bundler
{
  "target": "ES2020",
  "module": "ESNext",
  "lib": ["ES2020", "DOM", "DOM.Iterable"],
  "moduleResolution": "bundler"  // TypeScript 5.0+
}

// Library (npm publish karna hai)
{
  "target": "ES2015",  // widest compatibility
  "module": "commonjs",
  "declaration": true,  // .d.ts files generate karo
  "declarationMap": true
}

// Sirf types check karna hai, transpile nahi
{
  "noEmit": true,  // koi output files mat banao
  "strict": true
}`,
            language: 'json',
            explanation: 'Ye different configs kab use karein? CommonJS — existing Node.js projects, compatibility important. node16/nodenext — pure ESM Node.js project, explicit .js extensions imports mein chahiye. bundler — Next.js, Vite, Webpack ke saath — extensionless imports kaam karte hain. noEmit: true — sirf type checking, koi output nahi — CI type check ke liye perfect.',
            filename: 'tsconfig-variants.json',
          }}
          realWorldScenario="New Express API project — target: ES2022, module: commonjs, lib: ['ES2022'], moduleResolution: node. Ready to go. Next.js project — tsconfig Next.js ne already generate kiya, bundler mode se, DOM types included. Ye sab automatically configured hota hai next create-next-app se. Lekin samajhna zaroori hai — jab kuch wrong ho toh troubleshoot kar sako."
          commonMistakes={[
            { mistake: 'module: ESNext Node.js mein use karna', why: 'Node.js CJS expect karta hai by default — import/export nahi samjhega', fix: 'Node.js ke liye module: commonjs ya module: node16 use karo' },
          ]}
          proTip="moduleResolution: bundler TypeScript 5.0 ka naya mode hai — ye specify karta hai ki TypeScript bundler ke behavior ko match kare. Extensionless imports, path aliases, barrel files — sab correctly handle hote hain. Older node ya node16 modes mein kabhi kabhi weird errors aate hain extensionless imports pe. Bundler mode se ye resolved ho jaata hai."
        />
      </div>

      <div id="path-aliases">
        <ConceptCard
          title="Path Aliases & Project References"
          emoji="🗂️"
          difficulty="advanced"
          whatIsIt="Path aliases — import '../../../utils/database' ki jagah import '@/utils/database'. Clean, readable, refactor-friendly. baseUrl + paths tsconfig mein set karo. Lekin ek gotcha hai — TypeScript type checking ke liye aliases samjhta hai, actual module resolution bundler karta hai. Bundler mein bhi same aliases add karne padte hain. Project references monorepos ke liye hain — packages independently compile, sirf changed rebuild. tsc --build se incremental builds."
          whenToUse={[
            'Path aliases: ../../utils/../config se chutkara pane ke liye',
            'Project references: monorepo ya multi-package setup mein',
          ]}
          whyUseIt="Ab sawaal ye aata hai — path aliases sirf cosmetic hai ya real benefit? Real benefit — directory structure change karo. @/utils/database ke sab imports automatically resolve honge naye location pe. Relative paths ke saath ../../ change karna padta ek ek file mein. Project references ka real benefit monorepo mein — 10 packages hain, sirf 2 change kiye, tsc --build sirf woh 2 rebuild karta hai. Build time 10 minutes se 2 minutes. Real productivity."
          howToUse={{
            code: `// tsconfig.json — Path aliases
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  }
}

// Ab ye sab kaam karta hai:
import { db } from '@/utils/database'     // src/utils/database
import type { User } from '@types/user'   // src/types/user

// IMPORTANT: Bundler mein bhi aliases add karo!
// vite.config.ts:
import { resolve } from 'path'
export default {
  resolve: {
    alias: { '@': resolve(__dirname, './src') }
  }
}

// Monorepo Project References:
// packages/api/tsconfig.json
{
  "compilerOptions": {
    "composite": true,  // required for project references
    "outDir": "./dist"
  },
  "references": [
    { "path": "../shared" },  // depends on shared package
    { "path": "../types" }
  ]
}

// Root tsconfig.json
{
  "references": [
    { "path": "./packages/api" },
    { "path": "./packages/web" },
    { "path": "./packages/shared" }
  ],
  "files": []  // no direct source files
}

// Build: tsc --build (builds only changed packages)`,
            language: 'json',
            explanation: 'Ye common mistake hai — tsconfig mein aliases set karo, TypeScript type checking kaam karta hai, lekin Vite/webpack runtime pe error deta hai. Bundler ko bhi batana padta hai. Vite mein resolve.alias, Next.js mein jsconfig.json ya tsconfig paths automatic pick up karta hai. Jest mein moduleNameMapper. Har tool ko separately configure karo — tsconfig sirf TypeScript ke liye hai.',
            filename: 'tsconfig-advanced.json',
          }}
          realWorldScenario="Turborepo monorepo — packages/shared change kiya. tsc --build run karo — sirf packages/shared rebuild hota hai aur packages/api jo shared depend karta hai. packages/web, packages/admin — skip. CI time dramatically kam. Ek team ne 15 minutes CI ko 4 minutes pe laya sirf project references add karke. Ye optimization worth it hai large codebases mein."
          commonMistakes={[
            { mistake: 'Path aliases sirf tsconfig mein set karna', why: 'TypeScript resolve karta hai lekin bundler nahi — runtime error', fix: 'Vite/webpack/jest — sab mein same aliases add karo' },
          ]}
          proTip="tsconfig-paths package ts-node ke saath path aliases automatically resolve karta hai — manually configure nahi karna. tsconfig-paths/register require karo startup pe. Jest ke liye pathsToModuleNameMapper function hai jo tsconfig paths se jest moduleNameMapper automatically generate karta hai. Ek baar setup karo, phir @/ imports everywhere kaam karein."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="ts-config" />
    </div>
  )
}
