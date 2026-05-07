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

export default function TSChapter11Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(49,120,198,0.06)', border: '1px solid rgba(49,120,198,0.25)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          tsconfig Deep Dive — TypeScript Ko Configure Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          tsconfig.json TypeScript compiler ka configuration file hai. Sahi configuration se type safety maximize hoti hai, output correct hoti hai, aur build performance optimize hota hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum ek production-ready tsconfig.json banate hain — har important option explain karke.
        </p>
      </div>

      <div id="compiler-options">
        <ConceptCard
          title="Recommended tsconfig.json — Node.js Backend"
          emoji="⚙️"
          difficulty="intermediate"
          whatIsIt="tsconfig.json compiler options TypeScript ko instruct karte hain — kahan se files padhni hain, output kahan likhna hai, kaunsi checks perform karni hain."
          whenToUse={[
            'Koi bhi TypeScript project shuru karte waqt',
            'Existing project ko strict mode mein migrate karte waqt',
            'Monorepo packages ke liye individual configs',
          ]}
          whyUseIt="Sahi tsconfig se bugs compile time pe pakde jaate hain, output correct hoti hai, aur IDE IntelliSense best kaam karta hai."
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
            explanation: 'Production Node.js tsconfig. strict: true sab safety checks on. esModuleInterop se default imports kaam karte hain. incremental: true builds speed up karta hai.',
            filename: 'tsconfig.json',
          }}
          realWorldScenario="Naya Node.js + TypeScript project — ye tsconfig copy karo. Zyada projects mein ye baseline config use hoti hai — strict on, paths configured, incremental builds."
          commonMistakes={[
            { mistake: 'esModuleInterop: false rakhna', why: 'import fs from "fs" kaam nahi karta — import * as fs from "fs" likhna padta hai', fix: 'esModuleInterop: true rakho — modern import syntax kaam karta hai' },
            { mistake: 'skipLibCheck: false rakhna large projects mein', why: 'node_modules types check karna bahut slow karta hai build', fix: 'skipLibCheck: true — node_modules ke .d.ts files skip hote hain' },
          ]}
          proTip="tsx aur ts-node ke liye alag tsconfig rakh sakte ho (tsconfig.dev.json) — transpileOnly: true se faster development experience milta hai."
        />
      </div>

      <div id="strict-mode">
        <ConceptCard
          title="Strict Mode — TypeScript Ka Safety Net"
          emoji="🛡️"
          difficulty="intermediate"
          whatIsIt="strict: true ek umbrella flag hai jo kai individual strict checks enable karta hai. Har flag ek specific class of bugs prevent karta hai."
          whenToUse={[
            'Naye projects mein hamesha strict: true se start karo',
            'Existing projects: gradually enable karo individual flags',
          ]}
          whyUseIt="Strict mode ke bina TypeScript ki type safety incomplete hoti hai — null pointer exceptions, implicit any — sab possible rehte hain."
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
            explanation: 'strict: true ke 5+ flags hain. Existing project mein gradually migrate karo — pehle noImplicitAny, phir strictNullChecks, etc. Ek baar mein sab fix karna overwhelming hota hai.',
            filename: 'strict-mode.ts',
          }}
          realWorldScenario="Legacy JavaScript project ko TypeScript pe migrate karna — strict: false se start karo, slowly strict flags enable karo. Ek flag per sprint — manageable approach."
          commonMistakes={[
            { mistake: 'Legacy project mein ek baar mein strict: true karna', why: 'Thousands of errors — overwhelming', fix: 'Gradual migration: individual flags one by one enable karo' },
          ]}
          proTip="strictNullChecks sabse valuable flag hai — null/undefined bugs production mein most common errors hain. Pehle ye enable karo."
        />
      </div>

      <div id="module-target">
        <ConceptCard
          title="target & module — Output Configuration"
          emoji="🎯"
          difficulty="intermediate"
          whatIsIt="target: output JavaScript version. module: module system (CommonJS, ESM, etc.). lib: TypeScript mein available APIs."
          whenToUse={[
            'Node.js 18+: target: ES2022, module: commonjs (ya node16/nodenext)',
            'Browser/ESM: target: ES2020, module: ESNext',
            'Library: target: ES2015, module: commonjs + types generate karo',
          ]}
          whyUseIt="Correct target se output readable rehta hai, correct APIs available hote hain, aur target environment ke saath compatible rehta hai."
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
            explanation: 'Node.js backend ke liye commonjs recommend hai. ESM project ke liye node16/nodenext + package.json mein type: module. Browser ke liye moduleResolution: bundler TypeScript 5.0+ se.',
            filename: 'tsconfig-variants.json',
          }}
          realWorldScenario="Next.js project mein tsconfig.json already configured hota hai — rarely touch karna padta hai. Custom Node.js API ke liye ye configs use karo."
          commonMistakes={[
            { mistake: 'module: ESNext Node.js mein use karna', why: 'Node.js CJS expect karta hai by default — import/export nahi samjhega', fix: 'Node.js ke liye module: commonjs ya module: node16 use karo' },
          ]}
          proTip="TypeScript 5.0+ mein moduleResolution: bundler Vite/webpack projects ke liye best hai — .js extension imports require nahi karta."
        />
      </div>

      <div id="path-aliases">
        <ConceptCard
          title="Path Aliases & Project References"
          emoji="🗂️"
          difficulty="advanced"
          whatIsIt="Path aliases import paths clean karte hain. Project references large monorepos mein packages ko independently compile karne dete hain."
          whenToUse={[
            'Path aliases: ../../utils/../config se chutkara pane ke liye',
            'Project references: monorepo ya multi-package setup mein',
          ]}
          whyUseIt="Path aliases se imports readable hote hain. Project references se incremental builds milti hain — sirf changed packages rebuild hoti hain."
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
            explanation: 'Path aliases TypeScript + bundler dono mein configure karne padte hain. Project references se tsc --build sirf changed packages rebuild karta hai — large codebase mein bahut fast.',
            filename: 'tsconfig-advanced.json',
          }}
          realWorldScenario="Monorepo (turborepo/nx) mein project references essential hain. packages/shared change kiya toh sirf packages/api rebuild hoga jo shared depend karta hai — baaki skip."
          commonMistakes={[
            { mistake: 'Path aliases sirf tsconfig mein set karna', why: 'TypeScript resolve karta hai lekin bundler nahi — runtime error', fix: 'Vite/webpack/jest — sab mein same aliases add karo' },
          ]}
          proTip="typescript-paths-plugin ya tsconfig-paths package se paths automatically resolve hote hain ts-node/jest mein — manually configure nahi karna padta."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="ts-config" />
    </div>
  )
}
