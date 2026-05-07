'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const tsQuiz: QuizQuestion[] = [
  {
    question: '`import type` aur `import` mein kya fark hai?',
    options: [
      { text: 'Koi fark nahi — dono same kaam karte hain', correct: false, explanation: 'Important fark hai — import type sirf types import karta hai, runtime code nahi.' },
      { text: 'import type sirf types import karta hai — compiled JS mein erase ho jaata hai; import values bhi import karta hai', correct: true, explanation: 'Sahi! import type compile hone ke baad completely hata diya jaata hai — zero runtime overhead. Regular import runtime pe bhi exist karta hai.' },
      { text: 'import type sirf .d.ts files se import karta hai', correct: false, explanation: 'import type kisi bhi TypeScript file se types import kar sakta hai — sirf .d.ts se nahi.' },
      { text: 'import type faster compile karta hai', correct: false, explanation: 'Speed negligible hai — main benefit runtime erasure aur circular imports avoid karna hai.' },
    ],
  },
  {
    question: '.d.ts file ka kya kaam hai?',
    options: [
      { text: 'TypeScript source code store karna', correct: false, explanation: '.d.ts mein executable code nahi hota — sirf type information.' },
      { text: 'JavaScript library ke liye type declarations provide karna bina implementation ke', correct: true, explanation: 'Bilkul! Declaration files JS code ke types describe karte hain — toh TypeScript JavaScript libraries ko type-safe tarike se use kar sakta hai.' },
      { text: 'Test files ke liye', correct: false, explanation: '.test.ts ya .spec.ts test files ke liye hain — .d.ts declaration files hain.' },
      { text: 'Private type hide karne ke liye', correct: false, explanation: '.d.ts public API describe karta hai — types hide karne ke liye nahi.' },
    ],
  },
  {
    question: '@types/lodash install karne ka matlab kya hai?',
    options: [
      { text: 'lodash ka naya version install hoga', correct: false, explanation: '@types packages versions change nahi karte — sirf type definitions add karte hain.' },
      { text: 'lodash ke liye community-maintained TypeScript type definitions install honge', correct: true, explanation: 'Sahi! DefinitelyTyped (@types) community TypeScript definitions maintain karta hai JavaScript libraries ke liye jo natively TypeScript nahi hain.' },
      { text: 'lodash ko TypeScript mein rewrite karna padega', correct: false, explanation: 'Kuch nahi rewrite karna — @types sirf type definitions hai, library same JS hai.' },
      { text: 'lodash automatically TypeScript mein convert ho jaayega', correct: false, explanation: '@types sirf type-layer hai — actual lodash JS hi rehta hai.' },
    ],
  },
  {
    question: 'tsconfig.json mein path alias `@/*` set karne ke baad kya aur karna padta hai?',
    options: [
      { text: 'Kuch nahi — tsconfig kaafi hai', correct: false, explanation: 'tsconfig sirf TypeScript ke liye hai — bundler/runtime ko bhi configure karna padta hai.' },
      { text: 'Bundler (webpack/vite/next.js) mein bhi same aliases configure karne padte hain', correct: true, explanation: 'Sahi! TypeScript type checking ke liye paths samajhta hai lekin actual module resolution bundler karta hai — dono jagah configure karo.' },
      { text: 'Node.js ko restart karna padta hai', correct: false, explanation: 'Restart se kuch nahi hoga — bundler configuration change karni padti hai.' },
      { text: 'package.json mein imports field add karna padta hai', correct: false, explanation: 'Node.js subpath imports alag feature hai — tsconfig paths ke liye bundler config chahiye.' },
    ],
  },
]

function ModuleSystemDiagram() {
  const items = [
    { label: 'Regular import', sublabel: 'import { fn } from "./mod" — value + type, survives to compiled JS', color: '#3178C6', bg: 'rgba(49,120,198,0.1)', border: 'rgba(49,120,198,0.3)', icon: '📦' },
    { label: 'import type', sublabel: 'import type { User } from "./mod" — TYPE ONLY, completely erased at runtime', color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.3)', icon: '🔍' },
    { label: 'Declaration file (.d.ts)', sublabel: 'Pure type declarations — no runtime code at all, only type info', color: '#6366F1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.3)', icon: '📄' },
    { label: '@types package', sublabel: 'Community types for JS libs (DefinitelyTyped) — devDependency only, zero production bundle', color: '#3178C6', bg: 'rgba(49,120,198,0.1)', border: 'rgba(49,120,198,0.3)', icon: '🌐' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Module System — What Survives to JavaScript</p>
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

export default function TSChapter8Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(49,120,198,0.06)',
          border: '1px solid rgba(49,120,198,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          TypeScript Modules & Declaration Files — Imports Ka Sahi Tarika
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ye sunke tumhe shock lagna chahiye — jab TypeScript compile hota hai, import type ki saari lines completely DELETE ho jaati hain JavaScript se. Compiler jaanta hai ye sirf type information hai, runtime pe koi zaroorat nahi. Isliye import type likhna sirf best practice nahi — ye ek architectural decision hai ki kya runtime pe exist karega aur kya nahi.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ab sawaal ye aata hai — JavaScript libraries jo TypeScript mein nahi likhi, unke types kahan se aate hain? .d.ts files. Ye ek alag file format hai sirf type declarations ke liye — koi executable code nahi. @types packages mein yahi hota hai. Is chapter mein hum ye poora ecosystem samjhenge — modules, declaration files, @types, aur path aliases.
        </p>
      </div>

      <ModuleSystemDiagram />

      <div id="es-modules">
        <ConceptCard
          title="ES Modules in TypeScript — Import/Export Patterns"
          emoji="📦"
          difficulty="advanced"
          whatIsIt="TypeScript ES Modules ka poora support karta hai — named exports, default exports, re-exports, dynamic imports. Lekin TypeScript ka ek extra feature hai — export type. Ye sirf type information export karta hai, runtime pe woh export exist nahi karta. Barrel files (index.ts) se public API define karo — andar kya hai hide karo, bahar sirf select cheezein dikhao. moduleResolution setting TypeScript ko batati hai imports kaise resolve karo — bundler mode modern projects ke liye best hai."
          whenToUse={[
            'Har TypeScript file ek module hai — import/export use karo',
            'Public API barrel file (index.ts) se re-export karo',
            'Code splitting ke liye dynamic import() use karo',
            'Circular dependency avoid karne ke liye import type use karo',
          ]}
          whyUseIt="Named exports se tree-shaking better hoti hai — bundler exact kya use ho raha hai track kar sakta hai. Barrel files se team ke log andar ki structure nahi jaante — refactor karo andar, bahar ka API same rehta hai. Dynamic import se heavy libraries sirf tab load hoti hain jab zaroorat ho — initial bundle size chhota rehta hai. Ye sab WHY pehle — performance, maintainability, clean architecture."
          howToUse={{
            filename: 'modules.ts',
            language: 'typescript',
            code: `// ── NAMED EXPORTS ────────────────────────────────────────────────
// utils/math.ts
export function add(a: number, b: number): number {
  return a + b
}

export function multiply(a: number, b: number): number {
  return a * b
}

export const PI = 3.14159

// ── DEFAULT EXPORT ────────────────────────────────────────────
// utils/logger.ts
class Logger {
  log(message: string): void { console.log(\`[LOG] \${message}\`) }
  error(message: string): void { console.error(\`[ERROR] \${message}\`) }
}

export default Logger

// ── IMPORT PATTERNS ────────────────────────────────────────────
import { add, multiply, PI } from './utils/math'         // Named
import Logger from './utils/logger'                       // Default
import * as MathUtils from './utils/math'                 // Namespace import
import { add as sum } from './utils/math'                 // Alias

// ── RE-EXPORTS (Barrel file) ──────────────────────────────────
// components/index.ts — public API
export { Button } from './Button'
export { Modal } from './Modal'
export { Table } from './Table'
export type { ButtonProps } from './Button'  // Type-only re-export

// Consumer: import { Button, Modal } from '@/components'
// Clean API — internal structure hidden

// ── DYNAMIC IMPORTS ────────────────────────────────────────────
// Lazy loading — code splitting ke liye
async function loadChart() {
  const { Chart } = await import('./components/Chart')
  // Chart sirf tab load hoga jab zaroorat ho
  return new Chart()
}

// Next.js mein dynamic import
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
})

// ── MODULE AUGMENTATION ───────────────────────────────────────
// Existing module mein types add karo
declare module 'express' {
  interface Request {
    user?: { id: string; email: string }  // Custom property add
  }
}`,
            explanation: 'Ab sawaal ye aata hai — module augmentation kya hai? declare module "express" se tum Express ke types extend kar rahe ho — req.user add kar rahe ho. Ye TypeScript compiler ko batata hai ki is module ka Request type ab user field bhi rakhta hai. Ye sirf types mein hota hai — runtime pe tum middleware mein actual user attach karte ho. Types aur runtime dono aligned rakhna zaroori hai.',
          }}
          realWorldScenario="Large Next.js project mein components/ui/index.ts barrel file banao — 30 components sab wahan se export. Dusre developers sirf import { Button, Input, Modal } from '@/components/ui' likhte hain. Tum andar folder restructure karo, files rename karo — bahar ka code nahi toota. Ye encapsulation ka sahi use hai. Module augmentation use karo Express mein req.user ke liye — middleware attach karta hai, TypeScript types mein declare karo."
          commonMistakes={[
            {
              mistake: 'Default export har jagah use karna',
              why: 'Default exports rename ho sakte hain — consistency kam hoti hai. IDE refactoring bhi harder.',
              fix: 'Named exports prefer karo. Default export sirf ek primary export ke liye — jaise React components mein convention hai.',
            },
            {
              mistake: 'Circular imports — A imports B, B imports A',
              why: 'Runtime mein undefined values aa sakti hain — subtle bugs. Bundlers handle karte hain lekin anti-pattern hai.',
              fix: 'Shared types/interfaces alag file mein nikalo. import type se type-only circular imports sometimes OK hain.',
            },
          ]}
          proTip="moduleResolution: bundler TypeScript 5.0 ka naya mode hai — Vite, Next.js, webpack ke behavior ko match karta hai. Extensionless imports kaam karte hain, path aliases sahi resolve hote hain. node16/nodenext use karo sirf jab pure Node.js ESM project ho. Zyataar modern projects ke liye bundler mode best developer experience deta hai."
        />
      </div>

      <div id="import-type">
        <ConceptCard
          title="import type — Only Import Types"
          emoji="🔍"
          difficulty="advanced"
          whatIsIt="Ye shocking fact hai — import type ki line compiled JavaScript mein exist hi nahi karta. TypeScript 3.8 mein aaya ye feature. Jab tum sirf type annotation mein koi value use karte ho — interface, type alias — toh import type likhna chahiye. Compiler guarantee karta hai ki ye line delete ho jaayegi. Verbatim module syntax (TypeScript 5.0+) toh aur strict hai — type-only import karo aur import ki jagah import type nahi likha? Compile error."
          whenToUse={[
            'Interfaces aur type aliases import karne ke liye — hamesha import type use karo',
            'Circular dependency avoid karne ke liye — type-only imports safe hain',
            'Bundle size minimize karne ke liye — re-exports',
            'isolatedModules: true ke saath — import type required',
          ]}
          whyUseIt="Ab sawaal ye aata hai — sirf type import hai toh fark kya padta hai? Bahut fark padta hai! Vite aur esbuild single-file transpile karte hain — unhe nahi pata type hai ya value. Agar import type nahi likha toh woh value samjh ke include kar lete hain — bundle size badh sakta hai, circular dependency issues ho sakte hain. import type likh do — bundler ko pata hai ye erase karni hai. Clarity for humans, instruction for machines."
          howToUse={{
            filename: 'import-type.ts',
            language: 'typescript',
            code: `// ── IMPORT TYPE USAGE ─────────────────────────────────────────
// types.ts
export interface User {
  id: string
  name: string
  email: string
}

export type UserId = string
export type Status = 'active' | 'inactive'

export class UserService {
  getUser(id: string): Promise<User> { /* ... */ return Promise.resolve({} as User) }
}

// ── consumer.ts ───────────────────────────────────────────────
// ✅ Sahi — types ke liye import type
import type { User, UserId, Status } from './types'

// ✅ Value ke liye regular import
import { UserService } from './types'

// ✅ Mix — type aur value alag alag
import { UserService as US } from './types'
import type { User as UserType } from './types'

// ── COMPILED OUTPUT ───────────────────────────────────────────
// TypeScript compile karne ke baad:
// import type lines COMPLETELY MISSING from JS
// Sirf: import { UserService } from './types'  — ye rehta hai

// ── INLINE TYPE IMPORTS ───────────────────────────────────────
// TypeScript 4.5+: ek line mein mix
import { UserService, type User as IUser, type Status as S } from './types'

// ── VERBATIM MODULE SYNTAX ────────────────────────────────────
// tsconfig: "verbatimModuleSyntax": true (TypeScript 5.0+)
// Enforce karta hai: agar sirf type use karo toh import type required
// Otherwise compile error!

// ── RE-EXPORT TYPES ───────────────────────────────────────────
// index.ts barrel file mein type-only re-export
export type { User, Status } from './user-types'
export type { Product } from './product-types'
// In JS output: these lines won't exist

// ── PRACTICAL EXAMPLE ─────────────────────────────────────────
import type { RequestHandler } from 'express'

const handler: RequestHandler = (req, res) => {
  res.json({ ok: true })
}
// RequestHandler sirf type annotation mein use hua — import type perfect`,
            explanation: 'isolatedModules: true ka matlab — TypeScript ek file ko baaki sab se independent compile karta hai. Toh woh nahi jaanta koi import value hai ya type. Isliye import type zaroori ho jaata hai — bundler ya transpiler clearly samjhe ki ye erase karna hai. Vite projects mein ye automatically true hota hai. verbatimModuleSyntax: true aur bhi strict hai — ye enforce karta hai har type import pe import type likho.',
          }}
          realWorldScenario="Team project mein ek developer import { User } from './types' likhta hai — User sirf interface hai. Local mein tsc kaam karta hai, lekin CI mein Vite build fail hoti hai. Reason: isolatedModules: true. Fix: import type { User }. Ye ek common gotcha hai. verbatimModuleSyntax: true tsconfig mein add karo — sab developers ko force karo correct imports likhne ke liye. CI failures zero."
          commonMistakes={[
            {
              mistake: 'import type se value (class, function) import karna',
              why: 'import type { UserService } aur new UserService() — Runtime error! Class erased ho jaati hai.',
              fix: 'import type sirf types ke liye — interfaces, type aliases, enums (careful!). Values ke liye regular import.',
            },
            {
              mistake: 'Enum ke saath import type use karna',
              why: 'Enum TypeScript mein value bhi generate karta hai — import type se runtime mein missing.',
              fix: 'Const enum ya string literal union prefer karo. Regular enum ke liye regular import use karo.',
            },
          ]}
          proTip="verbatimModuleSyntax: true — ye TypeScript 5.0 ka recommended setting hai new projects ke liye. Set karo aur phir chhod do — compiler khud guide karega. Jab bhi type sirf annotation mein use ho aur tum import likhoge, error aayega. Ek baar ye habit ban gayi toh import type aur import ke beech confusion kabhi nahi hoga."
        />
      </div>

      <div id="declaration-files">
        <ConceptCard
          title="Declaration Files (.d.ts) — JS Libraries Ko Type Karo"
          emoji="📄"
          difficulty="advanced"
          whatIsIt=".d.ts files ek alag duniya hain — pure type declarations, koi executable code nahi. Socho ek blueprint jahan sirf structure hai, implementation nahi. Jab TypeScript import karta hai koi JavaScript library, toh woh .d.ts file dhundhta hai — kya hai is library mein? tsc --declaration flag se TypeScript khud generate karta hai tumhare source se .d.ts files. Npm package publish karo types ke saath — consumers ko @types install nahi karna padega."
          whenToUse={[
            'JavaScript library ke liye types likhna — @types packages nahi hain',
            'Global variables type karna — window.myLib, process.env',
            'Package publish karne ke liye — types field in package.json',
            'Ambient declarations — declare keyword se',
          ]}
          whyUseIt="JavaScript aur TypeScript ke beech bridge hai .d.ts. Bina .d.ts ke — koi bhi old JS library import karo, TypeScript bolta hai 'any'. Aur any matlab type safety khatam. declare global se window object augment karo — window.analytics TypeScript-safe ho jaata hai. process.env typed karo — missing env variable pe compile error. Ye real production value hai — runtime surprises ko compile time pe pakadna."
          howToUse={{
            filename: 'declarations.d.ts',
            language: 'typescript',
            code: `// ── SIMPLE JS LIBRARY KE LIYE .d.ts ─────────────────────────────
// math-utils.js (JavaScript library — no types)
// module.exports = { add, multiply, formatNumber }

// math-utils.d.ts (Type declaration file)
declare module 'math-utils' {
  export function add(a: number, b: number): number
  export function multiply(a: number, b: number): number
  export function formatNumber(n: number, decimals?: number): string
}

// ── GLOBAL VARIABLES DECLARE KARO ────────────────────────────
// globals.d.ts
declare const __DEV__: boolean              // Webpack DefinePlugin variable
declare const __APP_VERSION__: string       // Build-time injected

// ── GLOBAL OBJECT AUGMENTATION ────────────────────────────────
// window mein custom property add
declare global {
  interface Window {
    analytics: {
      track(event: string, props?: Record<string, unknown>): void
      identify(userId: string): void
    }
  }

  // Node.js process.env type karo
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      JWT_SECRET: string
      PORT?: string
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}  // File ko module banane ke liye (global augmentation ke baad)

// ── .d.ts AUTO-GENERATE ────────────────────────────────────────
// tsconfig.json mein:
// {
//   "compilerOptions": {
//     "declaration": true,        // .d.ts generate karo
//     "declarationDir": "./types", // Output directory
//     "emitDeclarationOnly": true  // Sirf .d.ts, no JS
//   }
// }

// ── PACKAGE.JSON MEIN TYPES FIELD ────────────────────────────
// {
//   "name": "my-library",
//   "main": "./dist/index.js",
//   "types": "./dist/index.d.ts",  // Types location
//   "exports": {
//     ".": {
//       "import": "./dist/index.mjs",
//       "require": "./dist/index.cjs",
//       "types": "./dist/index.d.ts"  // Modern: exports mein bhi
//     }
//   }
// }

// ── TRIPLE SLASH DIRECTIVES ────────────────────────────────────
/// <reference types="node" />     // @types/node include karo
/// <reference path="./other.d.ts" /> // Local .d.ts reference`,
            explanation: 'Ab sawaal ye aata hai — declare module mein declare keyword kyu? Kyunki .d.ts mein koi implementation nahi hoti. declare bol raha hai "trust me TypeScript, ye exists hai at runtime." Bina declare ke TypeScript complaint karega. export {} at the end — ye file ko module banata hai, warna global script samjha jaata hai aur declare global kaam nahi karta. Ye ek common gotcha hai.',
          }}
          realWorldScenario="Webpack DefinePlugin se __APP_VERSION__ inject karo build time pe. Bina declaration ke — TypeScript bolta hai 'Cannot find name __APP_VERSION__'. globals.d.ts mein declare const __APP_VERSION__: string likho — done. Isi tarah window.FEATURE_FLAGS — Webpack inject karta hai runtime pe, TypeScript types declare karo .d.ts mein, aur window.FEATURE_FLAGS.darkMode type-safe ho jaata hai. No any, no TypeScript suppress karna."
          commonMistakes={[
            {
              mistake: '.d.ts mein implementation likhna',
              why: '.d.ts sirf declarations ke liye — executable code nahi chalta yahan.',
              fix: 'declare keyword use karo — declare function, declare class, declare const. Implementation .ts mein hogi.',
            },
            {
              mistake: 'Global augmentation ke baad export {} bhool jaana',
              why: 'Bina export {} ke file script mode mein hoti hai — declare global kaam nahi karta module ke andar.',
              fix: 'declare global { ... } ke baad export {} add karo file ko module banane ke liye.',
            },
          ]}
          proTip="Apni library npm pe publish karne wale hain? @arethetypeswrong/cli tool run karo — ye check karta hai ki tumhare .d.ts files correctly configured hain ya nahi. Package.json mein exports field mein bhi types specify karo modern bundlers ke liye. Ye ek common problem hai — types field hai lekin exports mein types nahi — modern bundlers miss kar jaate hain."
        />
      </div>

      <div id="types-packages">
        <ConceptCard
          title="@types — Community Type Definitions"
          emoji="🌐"
          difficulty="advanced"
          whatIsIt="DefinitelyTyped — ye community ka ek massive project hai. 8000+ JavaScript libraries ke TypeScript type definitions yahan hain. @types/node, @types/express, @types/lodash — sab. Koi bhi contribute kar sakta hai. Lekin ek important baat — modern libraries jaise Prisma, Zod, tRPC, Fastify — ye khud TypeScript mein likhi hain, unhe @types ki zaroorat nahi. @types sirf wahan chahiye jahan library JS mein hai aur alag types maintain ho rahi hain."
          whenToUse={[
            '@types/node — Node.js built-ins: fs, path, process, http',
            '@types/express — Express.js Request, Response, NextFunction types',
            '@types/jest ya @types/mocha — Testing framework types',
            'Koi bhi old JS library jo natively types ship nahi karti',
          ]}
          whyUseIt="@types install karo aur TypeScript automatically pick up karta hai — koi explicit import nahi likhna. devDependencies mein rakho — production build mein nahi jaate, bundle size pe zero impact. Community review karta hai ye types — generally trustworthy hain. Lekin dependency alag maintain hoti hai — library update hoti hai lekin @types update nahi hua toh mismatch ho sakta hai. Hamesha major version match karo."
          howToUse={{
            filename: 'types-packages.ts',
            language: 'typescript',
            code: `// ── INSTALL KARO ──────────────────────────────────────────────
// npm install --save-dev @types/node @types/express

// ── AUTOMATIC TYPE RESOLUTION ─────────────────────────────────
// TypeScript automatically node_modules/@types/ se types load karta hai
// Explicit import ki zaroorat nahi

// ── NODE.JS TYPES ─────────────────────────────────────────────
import fs from 'fs'
import path from 'path'
import { EventEmitter } from 'events'

// @types/node install karne ke baad:
fs.readFileSync('/path/to/file', 'utf8')  // string — typed!
path.join('/usr', 'local', 'bin')         // string
process.env.NODE_ENV                       // string | undefined

// ── EXPRESS TYPES ──────────────────────────────────────────────
import express, { Request, Response, NextFunction } from 'express'

const app = express()

app.get('/users', (req: Request, res: Response) => {
  // req.query — typed (unknown values, string/string[])
  // req.params — typed
  // res.json() — typed
  res.json([])
})

// ── CHECK KARO — LIBRARY KE KHUD TYPES HAIN YA NAHI ─────────────
// package.json mein "types" ya "typings" field dekho
// Ya: node_modules/library-name/index.d.ts check karo

// Prisma — khud types ship karta hai (no @types needed)
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// prisma.user.findMany() — fully typed!

// Zod — khud TypeScript (no @types needed)
import { z } from 'zod'
const schema = z.object({ name: z.string() })
// schema.parse() — typed!

// ── TYPES FIELD IN TSCONFIG ───────────────────────────────────
// tsconfig.json:
// {
//   "compilerOptions": {
//     "types": ["node", "jest"]  // Sirf ye @types load karo
//     // Default: sab @types packages automatically load hote hain
//   }
// }

// ── VERSION MATCHING ──────────────────────────────────────────
// express@4.x ke liye @types/express@4.x install karo
// Major version match karni chahiye generally`,
            explanation: 'Ab sawaal ye aata hai — kaise pata chalega library khud types ship karti hai ya @types chahiye? Package.json mein "types" ya "typings" field dekho. Ya node_modules/library-name/index.d.ts dekho — agar hai toh @types ki zaroorat nahi. Dono install karo toh conflict ho sakta hai — duplicate type definitions, version mismatch. Pehle check karo, phir install karo.',
          }}
          realWorldScenario="Naya Express + TypeScript project shuru karo — npm i -D @types/node @types/express. Ab TypeScript jaanta hai fs.readFile kya return karta hai, req.body kya hai, res.status kya karta hai. Custom middleware mein req.user attach karo — declare module se Request type extend karo. Ek baar ye setup karo, poori team ko benefit milta hai — no any, no ts-ignore, proper intellisense everywhere."
          commonMistakes={[
            {
              mistake: '@types ko dependencies mein dalna (devDependencies ki jagah)',
              why: 'Types sirf development time pe chahiye — production bundle mein nahi. dependencies mein dalne se production bundle bada hota hai unnecessarily.',
              fix: 'npm install --save-dev @types/... hamesha. devDependencies mein rakho.',
            },
            {
              mistake: 'Library khud types ship karti hai lekin @types bhi install karna',
              why: 'Conflict ho sakta hai — duplicate types, version mismatch errors.',
              fix: 'Pehle check karo: package.json mein types/typings field hai? Hai toh @types zaroorat nahi.',
            },
          ]}
          proTip="npx typesync tool run karo — ye tumhara package.json padta hai aur automatically missing @types packages add karta hai. New developer join karo project mein, package.json clone karo, typesync run karo — sab types automatically set. CI pipeline mein bhi add karo ensure karne ke liye koi type package miss na ho. Simple tool, big time saver."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 8 Quiz — Modules & Declaration Files
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — imports, .d.ts files, aur @types packages test karo!
          </p>
        </div>
        <QuizSection questions={tsQuiz} chapterSlug="ts-modules-declarations" />
      </div>
    </div>
  )
}
