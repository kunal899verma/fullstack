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
          TypeScript modules ES Modules standard follow karte hain — lekin kuch TypeScript-specific additions hain. import type se runtime overhead zero karo. Declaration files (.d.ts) se JavaScript libraries TypeScript mein type-safe banate hain. @types packages community ka bada contribution hai — almost har popular library ke types available hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein modules, namespaces, .d.ts files, aur path aliases sab cover karenge — taaki aapka import game professional level ka ho jaaye.
        </p>
      </div>

      <div id="es-modules">
        <ConceptCard
          title="ES Modules in TypeScript — Import/Export Patterns"
          emoji="📦"
          difficulty="advanced"
          whatIsIt="TypeScript ES Modules fully support karta hai — import/export syntax. Types export karne ke liye export type syntax hai. Re-exports, barrel files (index.ts), dynamic imports — sab TypeScript mein kaam karte hain. moduleResolution setting TypeScript ko batati hai modules kaise resolve kare — node, bundler, node16/nodenext options hain."
          whenToUse={[
            'Har TypeScript file ek module hai — import/export use karo',
            'Public API barrel file (index.ts) se re-export karo',
            'Code splitting ke liye dynamic import() use karo',
            'Circular dependency avoid karne ke liye import type use karo',
          ]}
          whyUseIt="ES Modules standard hai — future-proof. Named exports se tree-shaking better hoti hai. Barrel files se clean public API — internal implementation details hide hoti hain. Dynamic imports se code splitting aur lazy loading possible hai. TypeScript moduleResolution: bundler Next.js aur Vite ke saath best kaam karta hai."
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
            explanation: 'Named exports prefer karo — better tree-shaking. Barrel files se public API clean hoti hai. dynamic import() lazy loading ke liye — bundle size reduce hota hai. Module augmentation se third-party types extend kar sakte ho apni custom properties ke liye.',
          }}
          realWorldScenario="Large Next.js project mein components/ui/index.ts barrel file hai — 30 components export karta hai. Consumer sirf import { Button, Input, Modal } from '@/components/ui' likhta hai — which file se aata hai yeh concern nahi. Internal refactoring bhi safe hai — public API same rehti hai."
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
          proTip="moduleResolution: bundler (TypeScript 5.0+) use karo Next.js aur Vite projects mein — extensionless imports aur path aliases correctly resolve honge. node16/nodenext pure Node.js projects ke liye. bundler modern bundlers ke behavior match karta hai — best DX milti hai."
        />
      </div>

      <div id="import-type">
        <ConceptCard
          title="import type — Only Import Types"
          emoji="🔍"
          difficulty="advanced"
          whatIsIt="import type TypeScript 3.8 mein aaya — sirf type information import karta hai, values nahi. Compiled JavaScript mein completely erase ho jaata hai — zero runtime overhead. Verbatim module syntax (TypeScript 5.0+) enforce karta hai — agar sirf type use karo toh import type required."
          whenToUse={[
            'Interfaces aur type aliases import karne ke liye — hamesha import type use karo',
            'Circular dependency avoid karne ke liye — type-only imports safe hain',
            'Bundle size minimize karne ke liye — re-exports',
            'isolatedModules: true ke saath — import type required',
          ]}
          whyUseIt="import type guaranteed zero runtime output — compiled JS mein line completely missing. Circular imports mein safe — type information module load hone se pehle available hai. Bundle analyzer mein saaf dikh ta hai — types alag, values alag. isolatedModules: true ke saath (Vite/esbuild/SWC) import type required hai type-only imports ke liye."
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
            explanation: 'import type zero runtime cost hai. isolatedModules: true se bundlers (Vite, SWC, esbuild) single-file transpile karte hain — bina full type checking ke. In cases mein import type required hai warna bundler type-only exports ko value samajh ke error deta hai.',
          }}
          realWorldScenario="Vite ya Next.js project mein isolatedModules automatically true hota hai. Agar tum import { User } from './types' likhate ho aur User sirf interface hai — Vite error dega. import type { User } likhna force karta hai correct usage. Large teams mein consistency ke liye verbatimModuleSyntax: true enforce karo."
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
          proTip="verbatimModuleSyntax: true tsconfig mein set karo (TypeScript 5.0+). Ye enforce karta hai ki type-only imports pe import type zaroor likho. Accidental runtime imports eliminate hote hain. File mein koi bhi import type se start karke type annotation mein aata hai — zero cost guaranteed."
        />
      </div>

      <div id="declaration-files">
        <ConceptCard
          title="Declaration Files (.d.ts) — JS Libraries Ko Type Karo"
          emoji="📄"
          difficulty="advanced"
          whatIsIt=".d.ts files pure type declarations hain — koi executable code nahi. JavaScript libraries ke liye TypeScript types describe karte hain. Jab tum import karte ho koi JS library, TypeScript .d.ts file dhundta hai types ke liye. tsc --declaration se automatically generate hote hain TypeScript source se."
          whenToUse={[
            'JavaScript library ke liye types likhna — @types packages nahi hain',
            'Global variables type karna — window.myLib, process.env',
            'Package publish karne ke liye — types field in package.json',
            'Ambient declarations — declare keyword se',
          ]}
          whyUseIt=".d.ts files JavaScript world ko TypeScript world se connect karte hain. npm pe publish karo types ke saath — consumers ko @types install nahi karna. tsc --declaration se automatically generate hote hain — manually likhne ki zaroorat nahi zyada cases mein. Global augmentation — existing types extend karo."
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
            explanation: 'declare module JS library ke types describe karta hai. declare global se window, process.env augment kar sakte ho. tsc --declaration automatic generation karta hai — manually likhne se better. package.json mein types field se consumers automatically types paate hain.',
          }}
          realWorldScenario="Custom Webpack plugin likhte ho jo window.FEATURE_FLAGS inject karta hai build time pe. globals.d.ts mein declare: declare global { interface Window { FEATURE_FLAGS: { newUI: boolean; darkMode: boolean } } } — ab TypeScript window.FEATURE_FLAGS.newUI correctly type karta hai. Koi any nahi."
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
          proTip="dtslint tool (Microsoft) .d.ts quality check karta hai. definitely typed contributor banna chahte ho? @types/lodash jaisi files dekho inspiration ke liye. Apni library ke liye publint + @arethetypeswrong/cli tools use karo — types correctly exported hain ya nahi verify karo."
        />
      </div>

      <div id="types-packages">
        <ConceptCard
          title="@types — Community Type Definitions"
          emoji="🌐"
          difficulty="advanced"
          whatIsIt="DefinitelyTyped repository (@types npm scope) community-maintained TypeScript definitions hai JavaScript libraries ke liye. @types/node, @types/express, @types/lodash — sab yahan hain. devDependencies mein install karo — runtime pe zaroorat nahi. Modern libraries khud TypeScript mein likhi hain aur built-in types include karte hain."
          whenToUse={[
            '@types/node — Node.js built-ins: fs, path, process, http',
            '@types/express — Express.js Request, Response, NextFunction types',
            '@types/jest ya @types/mocha — Testing framework types',
            'Koi bhi old JS library jo natively types ship nahi karti',
          ]}
          whyUseIt="@types packages devDependencies mein hain — production bundle mein nahi jaate. Community verify karta hai — quality generally good hai. TypeScript automatically inhe find karta hai — explicit import ki zaroorat nahi. Modern libraries (Prisma, tRPC, Zod) khud TypeScript mein likhi hain — @types ki zaroorat nahi."
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
            explanation: '@types packages devDependencies mein rakho — production mein jaate nahi. typeRoots aur types tsconfig options se granular control. Modern libraries ke liye @types zaroorat nahi — check karo pehle. Version mismatch se type errors aate hain — major version match karo.',
          }}
          realWorldScenario="Node.js + Express API project: npm i -D @types/node @types/express. Ab process.env, req.body, res.status() sab typed. req.user? custom property ke liye module augmentation: declare module 'express-serve-static-core' { interface Request { user?: AuthUser } }. Full type safety without any."
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
          proTip="TypeScript 5.5 mein aisa pattern kaam karta hai: npx typesync — package.json padta hai aur automatically @types packages add karta hai jo missing hain. CI mein run karo ensure karne ke liye koi type package miss na ho. are-the-types-wrong (arethetypeswrong.com) tool check karta hai @types quality."
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
