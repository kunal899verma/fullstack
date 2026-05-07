'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const modulesQuiz = [
  {
    question: 'CommonJS aur ES Modules mein sabse bada fundamental difference kya hai?',
    options: [
      {
        text: 'CJS sirf browsers mein kaam karta hai, ESM sirf Node.js mein',
        correct: false,
        explanation: 'Ulta hai bhai! CJS Node.js ka original system hai. ESM browsers aur Node.js dono mein kaam karta hai.',
      },
      {
        text: 'CJS synchronous load karta hai (require), ESM asynchronous aur statically analyzed hota hai (import)',
        correct: true,
        explanation: 'Sahi! require() synchronous hai — file immediately load hoti hai. import static hai — bundlers tree-shaking kar sakte hain, aur top-level await support milta hai ESM mein.',
      },
      {
        text: 'CJS faster hai kyunki ye compiled hota hai',
        correct: false,
        explanation: 'Speed difference module system se nahi aati — V8 JIT compilation dono ke liye same hai.',
      },
      {
        text: 'ESM mein default exports nahi hote',
        correct: false,
        explanation: 'ESM mein default exports perfectly kaam karte hain — export default syntax use karo.',
      },
    ],
  },
  {
    question: 'require() exactly kya return karta hai?',
    options: [
      {
        text: 'Module ka source code string mein',
        correct: false,
        explanation: 'require() source code nahi deta — woh module.exports object return karta hai.',
      },
      {
        text: 'Hamesha ek function',
        correct: false,
        explanation: 'require() jo bhi module.exports mein set hai woh return karta hai — function, object, string, kuch bhi ho sakta hai.',
      },
      {
        text: 'module.exports object — jo bhi us file ne export kiya hai',
        correct: true,
        explanation: 'Bilkul sahi! require() executed module ka module.exports return karta hai. Pehli baar load hota hai, phir cache se same object milta hai.',
      },
      {
        text: 'Ek Promise jo module ko async load karta hai',
        correct: false,
        explanation: 'require() synchronous hai — Promise nahi deta. Dynamic async import ke liye import() use karo.',
      },
    ],
  },
  {
    question: 'package.json mein "type": "module" set karne ka kya effect hota hai?',
    options: [
      {
        text: 'Sirf .mjs files ESM ban jaati hain',
        correct: false,
        explanation: '.mjs extension toh bina "type": "module" ke bhi ESM treat hoti hai. "type": "module" se .js files ESM ban jaati hain.',
      },
      {
        text: 'Sab .js files ESM ki tarah treat hoti hain, require() kaam nahi karta directly',
        correct: true,
        explanation: 'Sahi! "type": "module" se us package ki saari .js files ESM ban jaati hain. CJS ke liye .cjs extension use karo.',
      },
      {
        text: 'Code TypeScript mein compile ho jaata hai',
        correct: false,
        explanation: 'TypeScript compilation alag tool hai (tsc). "type": "module" sirf module system define karta hai.',
      },
      {
        text: 'Node.js automatically transpile karta hai purane browsers ke liye',
        correct: false,
        explanation: 'Node.js transpilation nahi karta — woh server-side runtime hai. Transpilation ke liye Babel ya esbuild use karo.',
      },
    ],
  },
  {
    question: 'ES Modules mein __dirname kaise get karein? (CJS mein directly available hai)',
    options: [
      {
        text: 'process.dirname() call karo',
        correct: false,
        explanation: 'process.dirname() exist nahi karta. Path operations ke liye path module use hota hai.',
      },
      {
        text: 'import.meta.dirname use karo (Node 21.2+) ya import.meta.url se manually construct karo',
        correct: true,
        explanation: 'Correct! Node 21.2+ mein import.meta.dirname directly available hai. Purane versions mein: const __dirname = path.dirname(fileURLToPath(import.meta.url)) use karo.',
      },
      {
        text: '__dirname ESM mein automatically available hai',
        correct: false,
        explanation: 'Nahi bhai! __dirname aur __filename CJS-only globals hain. ESM mein ye undefined hote hain.',
      },
      {
        text: 'fs.pwd() use karo',
        correct: false,
        explanation: 'fs.pwd() exist nahi karta. Current working directory ke liye process.cwd() hai, lekin woh __dirname ka replacement nahi hai.',
      },
    ],
  },
  {
    question: 'Circular dependency ka kya hota hai Node.js CJS mein?',
    options: [
      {
        text: 'Node.js crash ho jaata hai immediately',
        correct: false,
        explanation: 'Node.js crash nahi hota — lekin behavior unexpected hota hai jo bugs cause karta hai.',
      },
      {
        text: 'Infinite loop mein jaata hai',
        correct: false,
        explanation: 'Node.js circular dependency detect karta hai aur partially loaded module return karta hai — infinite loop nahi hota.',
      },
      {
        text: 'Circular module ko partially loaded (incomplete) exports milte hain — undefined properties aa sakti hain',
        correct: true,
        explanation: 'Sahi! Jab A require B karta hai aur B require A karta hai, toh B ko A ka partially loaded version milta hai — kuch exports undefined ho sakte hain us point par. Isse carefully handle karna padta hai.',
      },
      {
        text: 'Dono files fresh reload hoti hain har baar',
        correct: false,
        explanation: 'Module caching ki wajah se fresh reload nahi hota. Circular dependency ke case mein partial exports milte hain.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Chapter3Content() {
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
          require() aur import — ye dono same kaam karte hain? GALAT!
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Suno — bahut log sochte hain{' '}
          <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">require()</code>{' '}
          aur{' '}
          <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">import</code>{' '}
          sirf alag syntax hain — same kaam karte hain. YE GALAT HAI! CommonJS (CJS) synchronous hai, ESM async aur static hai. Ye sirf syntax ka nahi — architecture ka difference hai. CJS runtime par decide karta hai kya load karna hai, ESM compile-time par. Ye difference bundlers ki tree-shaking ability ko affect karta hai, top-level await ko, aur bahut kuch.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Bhai, ye confusion hamesha ke liye khatam karo — is chapter ke baad tum confidently decide kar paoge kab require(), kab import, aur kab dono saath.
        </p>
      </div>

      {/* ConceptCard 1: What is a Module */}
      <div id="what-is-module">
        <ConceptCard
          title="Module Kya Hai?"
          emoji="📦"
          difficulty="beginner"
          whatIsIt="Kya aap jaante ho — agar Node.js mein modules na hote, har ek variable globally available hota! Imagine karo — 100 files hain, sab ke variables clash karte hain, koi control nahi. Module ek isolated dabba hai. Jo andar hai woh locked hai jab tak tum explicitly export na karo. Bhai, ye encapsulation sirf organization ke liye nahi — ye security aur predictability ke liye bhi hai. Ek file ka private state doosri file affect nahi kar sakti. Ye Node.js ka foundation hai — sab kuch modules par build hua hai!"
          whenToUse={[
            'Code ko logical units mein organize karna ho — har file ek responsibility',
            'Global scope pollution se bachna ho — variables ek file mein hi rahein',
            'Code reuse karna ho — ek module kai jagah import karo',
            'Testing aasaan banani ho — isolated modules individually test ho sakte hain',
            'Team mein kaam karte waqt — clear boundaries define karo files ke beech',
          ]}
          whyUseIt="Modules ke bina kya hota? Sochte hain — ek 50,000 line JavaScript file, sab variables global, koi alag scope nahi. Team ka ek developer ek variable change kare, poori app crash ho jaaye. Ye actually hota tha purane days mein! Modules se: (1) Har file apna scope maintain karti hai — koi collision nahi. (2) Node.js modules cache karta hai — same file baar baar require karo, ek hi instance milega. (3) Circular dependencies detect hoti hain. (4) Testing easy — ek module independently test karo. Aur sab se important: npm ke 2 million packages modules ki wajah se exist karte hain!"
          howToUse={{
            filename: 'math.js',
            language: 'javascript',
            code: `// math.js — ek module
// Ye variables sirf is file mein accessible hain:
const PI = 3.14159

// Export karna hai toh module.exports mein daalo:
function add(a, b) {
  return a + b
}

function multiply(a, b) {
  return a * b
}

// Explicitly export karo:
module.exports = { add, multiply, PI }

// ─────────────────────────────────────────────
// app.js — dusri file
const math = require('./math')

console.log(math.add(2, 3))       // 5
console.log(math.multiply(4, 5))  // 20
console.log(math.PI)              // 3.14159

// math.PI directly available nahi tha — tum ne export kiya tab mila
// math ke internal variables bahar nahi jaate`,
            explanation: 'math.js mein PI, add, multiply define hain. Sirf jo module.exports mein daala woh bahar jaata hai. app.js mein require() se import karo — selective access milti hai. Ye encapsulation hai!',
          }}
          realWorldScenario="Ek production Express app sochte hain — userRoutes.js, productRoutes.js, authRoutes.js, paymentRoutes.js, each 200-300 lines. Modules ki wajah se: ek developer auth kaam kar raha hai, doosra payment — koi conflict nahi. main app.js sirf routes mount karta hai. Naya developer join kiya? Seedha authRoutes.js padho — context clear hai, 3000 line file nahi padhni. Ye scalable teams ke liye mandatory hai."
          commonMistakes={[
            {
              mistake: 'Circular dependencies banana — A requires B, B requires A',
              why: 'Circular deps mein ek module ko doosre ka partially loaded (incomplete) exports milte hain. undefined properties aati hain jo runtime errors cause karti hain.',
              fix: 'Architecture refactor karo — shared logic ko teesre module C mein move karo jise A aur B dono import karein. Circular deps ek design smell hai.',
            },
            {
              mistake: 'Export karna bhool jaana — module.exports set nahi kiya',
              why: 'Agar module.exports set nahi kiya, require() ek empty object {} return karega. Koi error nahi aayega — silently fail karega.',
              fix: 'Hamesha apni files ke end mein verify karo ki sab zaroori cheezein export ki hain. Named exports use karo clarity ke liye.',
            },
          ]}
          proTip="Module caching ek hidden superpower hai — aur hidden gotcha bhi! Ek baar require('./config') karo, Node.js cache karta hai. Baar baar require karo — same instance milega. Matlab module-level state share hoti hai. Singleton pattern free mein! Lekin test mein problem ho sakti hai — agar module state carry kare tests ke beech. Test mein cache clear karo: delete require.cache[require.resolve('./config')]. Ye pattern advanced testing mein kaam aata hai."
        />
      </div>

      {/* ConceptCard 2: CommonJS */}
      <div id="commonjs">
        <ConceptCard
          title="CommonJS — require() aur module.exports"
          emoji="📌"
          difficulty="beginner"
          whatIsIt="2009 se hai CommonJS — Node.js ka original system. Aur 2025 mein bhi npm ke 80%+ packages iske upar hain! Ye battle-tested hai. require() synchronously module load karta hai — matlab ye function call return karta hai tab jab module poora load ho jaaye. Koi Promise nahi, koi callback nahi — seedha wahi milta hai jo module.exports mein daala gaya hai. Purana hai, lekin iska matlab weak nahi hai. Production mein lagay aur kaam karta rehega!"
          whenToUse={[
            'Existing Node.js projects jo CJS use kar rahe hain',
            'npm packages jo CJS export karte hain unhe use karte waqt',
            'CLI tools aur scripts jahan simplicity chahiye',
            'Legacy codebases jahan migration cost zyada hai',
            '__dirname aur __filename naturally chahiye ho',
          ]}
          whyUseIt="CJS ka ek killer feature hai jo ESM ke paas nahi — dynamic runtime require! Dekho ye pattern: const env = process.env.NODE_ENV; const config = require('./config.' + env). Runtime par decide karo kya load karna hai! ESM mein ye static import se nahi hota — dynamic import() async hai. CJS mein condition ke hisaab se module load karna natural hai. Plugin systems, feature flags, environment-specific configs — ye sab CJS ke saath bahut easy hain."
          howToUse={{
            filename: 'user-service.js',
            language: 'javascript',
            code: `// ── EXPORTING ─────────────────────────────────────────────

// Style 1: module.exports ko ek object assign karo
module.exports = {
  getUser,
  createUser,
  deleteUser,
}

// Style 2: exports shorthand (same object reference hai)
exports.getUser = getUser
exports.createUser = createUser

// Style 3: Single function ya class export karo
module.exports = class UserService {
  constructor(db) { this.db = db }
  async getUser(id) { return this.db.find(id) }
}

// ── IMPORTING ─────────────────────────────────────────────

// Core module (no path needed)
const fs = require('fs')
const path = require('path')

// Local file (relative path with ./)
const { getUser, createUser } = require('./user-service')

// npm package (no path, looks in node_modules)
const express = require('express')

// Dynamic require — runtime par decide
const env = process.env.NODE_ENV
const config = require(\`./config.\${env}\`)  // config.development.js ya config.production.js

// __filename aur __dirname — CJS mein free mein milte hain
console.log(__filename)  // /Users/you/project/app.js
console.log(__dirname)   // /Users/you/project`,
            explanation: 'CJS mein teen export styles hain. Style 1 (module.exports = {}) sabse clear hai. exports shorthand same kaam karta hai lekin module.exports ko reassign karo toh link toot jaata hai. __dirname aur __filename CJS mein globally available hain — ESM mein nahi.',
          }}
          realWorldScenario="Ek production Node.js app mein config.development.js, config.production.js, config.test.js teen alag files hain. CJS se: const config = require('./config.' + process.env.NODE_ENV) — ek line mein environment-specific config! ESM mein ye dynamic import() await banana padta. CJS ki simplicity real-world apps mein kitni kaam aati hai ye dekho — legacy ya nahi, powerful hai."
          commonMistakes={[
            {
              mistake: "exports.foo = 'bar' ke baad module.exports = {} likhdena",
              why: 'exports aur module.exports pehle same object reference hote hain. module.exports reassign karne se exports ka link toot jaata hai. require() sirf module.exports return karta hai — exports mein daali cheezein lost ho jaati hain.',
              fix: 'Ek style use karo consistently. Ya toh module.exports = { foo, bar } use karo, ya exports.foo = ... use karo. Dono mix mat karo.',
            },
            {
              mistake: "require('./utils') — .js extension add karna",
              why: 'Extension dena galat nahi hai, lekin Node.js automatically .js, .json, .node try karta hai. Puri community .js extension chhod deti hai consistency ke liye.',
              fix: "require('./utils') — clean aur standard. Lekin .ts files ke saath TypeScript projects mein extension rules alag hote hain.",
            },
          ]}
          proTip="CJS ka ek underrated gift: __filename aur __dirname free mein milte hain. ESM mein ye nahi hai — import.meta.url se manually banana padta hai. Bhai, ye sirf convenience nahi — agar tumhara code templates, assets, ya files current file ke relative path se load karta hai, CJS mein ye bahut clean hai. ESM mein ye ek extra boilerplate hai. Chhoti cheez, lekin daily development mein bahut fark padta hai!"
        />

        {/* DiffBlock inside Chapter content */}
        <div className="mt-6">
          <DiffBlock
            title="module.exports — Teen Styles Ka Comparison"
            language="javascript"
            bad={{
              label: 'Confusing Mix (Avoid)',
              code: `// exports aur module.exports mix — dangerous!
exports.add = (a, b) => a + b
exports.PI = 3.14

// Ye module.exports reference todta hai!
module.exports = {
  multiply: (a, b) => a * b
}
// require() sirf { multiply } return karega
// add aur PI LOST ho gaye!`,
              explanation: 'exports aur module.exports mix karna silent bug deta hai. exports.add kaam nahi karega kyunki module.exports reassign ho gaya.',
            }}
            good={{
              label: 'Clear Pattern (Recommended)',
              code: `// Pattern 1: Ek hi module.exports object — CLEAR
module.exports = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
  PI: 3.14,
}

// Pattern 2: Destructured import
const { add, multiply } = require('./math')

// Pattern 3: Single class/function export
module.exports = class Logger {
  log(msg) { console.log(\`[\${Date.now()}] \${msg}\`) }
}`,
              explanation: 'Ek consistent style use karo. module.exports = { ... } sabse readable aur predictable hai. Destructured import se sirf kya chahiye woh lo.',
            }}
          />
        </div>
      </div>

      {/* ConceptCard 3: ES Modules */}
      <div id="esm">
        <ConceptCard
          title="ES Modules — Modern import/export"
          emoji="🆕"
          difficulty="beginner"
          whatIsIt="ESM JavaScript ka official, future-proof module system hai — 2015 mein spec mein aaya, Node.js mein stable support 2020 mein aaya. Ye CJS se fundamentally alag hai — imports static hote hain, compile-time par resolve hote hain. Matlab bundler (Vite, Webpack) file padhne se pehle hi jaanta hai kaunse imports hain. Isliye tree-shaking possible hai — jo use nahi ho raha woh bundle mein nahi jaata. Aur ESM browser mein bhi natively kaam karta hai — same file server aur browser mein share kar sakte ho. Ye future hai!"
          whenToUse={[
            'Naye projects — ESM future hai, CJS legacy',
            'Frontend-backend code sharing — same file browser aur Node mein',
            'Bundlers (Vite, Webpack, esbuild) ke saath — tree shaking better hoti hai',
            'Top-level await chahiye ho — ESM mein directly possible hai',
            'TypeScript projects — ESM naturally fit karta hai',
          ]}
          whyUseIt="ESM ka sab se bada superpower — top-level await! CJS mein async function banana padta tha sab kuch await karne ke liye. ESM mein seedha: const data = await fetch(url) — module level par! Database connections, API calls, startup configuration — sab module level par async ho sakta hai. Aur tree-shaking: lodash ka sirf cloneDeep use karo, sirf wahi bundle mein jaayega — baaki 100KB waste nahi hogi. Production bundle size 30-50% kam ho sakti hai sirf ESM switch karne se!"
          howToUse={{
            filename: 'math.mjs',
            language: 'javascript',
            code: `// ── NAMED EXPORTS ─────────────────────────────────────────
// math.mjs
export const PI = 3.14159

export function add(a, b) {
  return a + b
}

export class Vector {
  constructor(x, y) { this.x = x; this.y = y }
  magnitude() { return Math.sqrt(this.x ** 2 + this.y ** 2) }
}

// ── DEFAULT EXPORT ─────────────────────────────────────────
// config.mjs
const config = {
  port: 3000,
  db: process.env.DATABASE_URL,
}
export default config

// ── RE-EXPORTS (barrel pattern) ────────────────────────────
// index.mjs — ek entry point se sab export karo
export { add, PI } from './math.mjs'
export { default as config } from './config.mjs'
export * from './utils.mjs'

// ── IMPORTING ─────────────────────────────────────────────
// app.mjs
import { add, PI, Vector } from './math.mjs'
import config from './config.mjs'
import * as MathUtils from './math.mjs'  // namespace import

// Top-level await — ESM mein directly possible!
const data = await fetch('https://api.example.com/data')
const json = await data.json()

// import.meta — file metadata
console.log(import.meta.url)       // file:///Users/you/project/app.mjs
console.log(import.meta.dirname)   // Node 21.2+ mein available`,
            explanation: 'ESM mein named exports aur default export alag concepts hain. Named: import { add } from. Default: import config from. Re-exports se barrel pattern bana sakte ho — ek file se sab export karo. Top-level await ESM ka superpower hai.',
          }}
          realWorldScenario="Vite — ye duniya ka fastest dev server — seedha browser ESM use karta hai development mein. Koi bundling nahi, native import statements. Ye isliye possible hai kyunki ESM static hai — browser khud imports resolve kar sakta hai. CJS ke saath ye nahi hota tha. Ye Next.js, Remix, SvelteKit — sab modern frameworks ESM par build hain. Naya project shuru karo? ESM. Koi sawaal nahi."
          commonMistakes={[
            {
              mistake: "import { readFile } from 'fs' — extension chhod dena local files mein",
              why: "ESM strict mode mein relative imports ke saath extension mandatory hai: import { foo } from './utils.js'. CJS ki tarah extension auto-resolve nahi hota.",
              fix: "import { foo } from './utils.js' — hamesha extension likho local files mein. npm packages ke liye extension nahi chahiye.",
            },
            {
              mistake: 'require() use karna ESM file mein',
              why: "ESM files mein require() defined nahi hota — ReferenceError: require is not defined aayega.",
              fix: "import use karo. Agar kisi CJS module ko dynamically load karna hai, createRequire use karo: import { createRequire } from 'module'; const require = createRequire(import.meta.url)",
            },
          ]}
          proTip="ESM mein ek trap hai jo sabko milta hai — local imports mein .js extension mandatory hai! import { foo } from './utils' kaam nahi karega — import { foo } from './utils.js' chahiye. CJS mein extension optional tha. Node.js strict hai is baare mein. Aur ek aur — .mjs extension hamesha ESM, .cjs extension hamesha CJS — chahe package.json mein kuch bhi likha ho. Extension > package.json. Ye yaad karo!"
        />

        <div className="mt-6">
          <DiffBlock
            title="CJS require vs ESM import — Side by Side"
            language="javascript"
            bad={{
              label: 'CommonJS (require)',
              code: `// CJS — synchronous, dynamic possible
const fs = require('fs')
const { add } = require('./math')
const config = require('./config.json')

// Dynamic require — runtime mein
const plugin = require(\`./plugins/\${name}\`)

// No top-level await — ye error hai:
// const data = await fetch(url)  ❌

// __dirname available:
const filePath = path.join(__dirname, 'templates', 'email.html')`,
              explanation: 'CJS: synchronous, runtime dynamic imports possible, __dirname free mein milta hai.',
            }}
            good={{
              label: 'ES Modules (import)',
              code: `// ESM — static, async capable
import fs from 'node:fs/promises'
import { add } from './math.js'  // extension required!

// JSON import (Node 22+):
import config from './config.json' assert { type: 'json' }

// Dynamic import — async, works in ESM
const plugin = await import(\`./plugins/\${name}.js\`)

// Top-level await — ESM superpower!
const data = await fetch(url)
const json = await data.json()

// __dirname workaround:
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))`,
              explanation: 'ESM: static imports, top-level await, browser compatible. Local files mein extension required.',
            }}
          />
        </div>
      </div>

      {/* ConceptCard 4: CJS vs ESM Decision */}
      <div id="cjs-vs-esm">
        <ConceptCard
          title="CJS vs ESM — Decision Guide"
          emoji="⚖️"
          difficulty="intermediate"
          whatIsIt="Ab ek baar mein poora decision clear karte hain! Ye ek common question hai: 'CJS use karoon ya ESM?' Galat sawaal hai — sahi sawaal hai: 'Mere project ki context kya hai?' Naya project = ESM, koi doubt nahi. Purana project = CJS mein raho jab tak pain nahi ho. npm package = dono support karo (dual exports). TypeScript project = ESM naturally fit karta hai. Aur ek warning: CJS project mein pure-ESM npm packages (sindresorhus ke sab packages) use karna pain deta hai — dynamic import() banana padta hai. Ye 'ESM Hell' hai!"
          whenToUse={[
            'CJS: Existing Node.js projects, legacy codebases, pure server-side apps',
            'ESM: Naye projects, TypeScript, Vite/Next.js/Remix, browser+Node shared code',
            'Dual (CJS+ESM): npm packages publish karte waqt — sabko support karo',
            'ESM: Jab top-level await chahiye (database connections at startup)',
            'CJS: Jab dynamic require() runtime mein chahiye without dynamic import()',
          ]}
          whyUseIt="Dual package setup samjho: package.json ke exports field mein 'import' (ESM users ke liye) aur 'require' (CJS users ke liye) dono entries daalo. ESM wala .mjs file, CJS wala .cjs file. Koi bhi package install kare — automatically sahi version milega. CJS project mein ESM module load karna hai? require() nahi chalega! async function ke andar dynamic import() use karo. ESM se CJS import? Mostly seedha kaam karta hai — default export milta hai."
          howToUse={{
            filename: 'interop-examples.js',
            language: 'javascript',
            code: `// ── DUAL PACKAGE: package.json ────────────────────────────
// Dono CJS aur ESM users ko support karo:
{
  "name": "my-package",
  "exports": {
    ".": {
      "import": "./dist/esm/index.mjs",
      "require": "./dist/cjs/index.cjs"
    }
  },
  "main": "./dist/cjs/index.cjs"
}

// ── CJS FILE MEIN ESM MODULE USE KARNA ────────────────────
// CJS mein ESM module ko require() se import NAHI kar sakte!
// Dynamic import() use karo:

// ❌ Ye kaam nahi karta:
// const esmModule = require('pure-esm-package')

// ✅ Ye kaam karta hai:
async function loadEsmModule() {
  const { default: fetch } = await import('node-fetch')
  return fetch
}

// ── ESM FILE MEIN CJS MODULE USE KARNA ────────────────────
// ESM mein CJS module import kar sakte ho — usually works:
import lodash from 'lodash'              // CJS package, ESM mein import
import { readFileSync } from 'fs'        // Node built-in CJS, ESM mein kaam karta hai

// Named imports from CJS — sometimes tricky:
import { cloneDeep } from 'lodash'       // May work or may not — depends on package`,
            explanation: 'Dual package setup se CJS aur ESM dono users support hote hain. CJS se pure ESM package load karne ke liye async import() use karo. ESM se CJS packages usually directly import ho jaate hain.',
          }}
          realWorldScenario="Sindre Sorhus — chalk, got, execa, ora — 200+ popular packages ke creator — ne declare kiya ki sab packages pure ESM honge. CJS projects mein ye packages require() se nahi aa sakte. 'ESM Hell' shuru hua — developers ek ek package ke liye dynamic import() wrappers likhne lage. Lesson: Naya project hamesha ESM se shuru karo. Future-proof rahoge aur ye pain kabhi nahi milega."
          commonMistakes={[
            {
              mistake: 'CJS project mein .mjs file mein require() use karna',
              why: '.mjs files hamesha ESM treat hoti hain regardless of package.json. require() ESM mein defined nahi hota.',
              fix: 'File extension sahi rakho: .mjs = ESM (import use karo), .cjs = CJS (require use karo), .js = package.json ke "type" field pe depend karta hai.',
            },
            {
              mistake: "ESM mein __dirname use karna bina workaround ke",
              why: '__dirname aur __filename CJS-only globals hain. ESM files mein ye ReferenceError dete hain.',
              fix: 'Node 21.2+ mein: import.meta.dirname. Older: const __dirname = dirname(fileURLToPath(import.meta.url)) — path aur url modules se.',
            },
          ]}
          proTip="Decision tree ek baar aur — laminate karwa lo: New project? ESM. Old project pain deta hai? CJS raho. npm package publish? Dual exports. TypeScript? ESM. Next.js/Remix/Vite? Already ESM configured, kuch karna nahi. Aur agar CJS project mein pure-ESM package aaye? wrapper function banao: async function loadEsm() { const mod = await import('pkg'); return mod.default; } — ek hi jagah fix karo, sab jagah use karo."
        />
      </div>

      {/* ConceptCard 5: Module Resolution */}
      <div id="module-resolution">
        <ConceptCard
          title="Module Resolution Algorithm"
          emoji="🔍"
          difficulty="intermediate"
          whatIsIt="Kabhi socha hai — jab require('lodash') likhte ho, Node.js kaisa jaanta hai ki lodash kahan se laaye? Ye magic nahi — ek specific algorithm hai! Step 1: Core modules check karo — 'fs', 'path', 'http' — ye instantly milte hain. Step 2: './' ya '../' se shuru ho? Relative path resolve karo. Step 3: Kuch nahi? node_modules mein current folder se shuru karo, phir parent, phir parent ka parent — root tak jaate raho. Pehle milega woh use hoga. Ye samajhna 'MODULE_NOT_FOUND' errors ko instantly debug karne mein kaam aata hai!"
          whenToUse={[
            'MODULE_NOT_FOUND errors debug karte waqt',
            'Kyon ek particular version of package load ho rahi hai ye samjhna ho',
            'Monorepo setup mein package resolution issues fix karte waqt',
            'Custom module paths configure karte waqt (NODE_PATH, tsconfig paths)',
          ]}
          whyUseIt="Ek secret — require.resolve() ek underrated tool hai! Bina module actually load kiye, exact file path milta hai. Debugging mein gold hai ye: require.resolve('lodash') se pata chalta hai exactly kaunsi lodash file load ho rahi hai. Monorepo mein multiple versions hain? require.resolve se seedha pata chalega kaunsi version kahan se aa rahi hai. MODULE_NOT_FOUND error aaye toh seedha require.resolve() se diagnose karo — typo, wrong path, ya missing package — turant pata chalega!"
          howToUse={{
            filename: 'resolution-demo.js',
            language: 'javascript',
            code: `// require('X') ka resolution order:
//
// 1. CORE MODULES — pehle check hote hain
require('fs')      // ✅ Built-in — seedha milta hai
require('path')    // ✅ Built-in
require('http')    // ✅ Built-in
//
// 2. RELATIVE PATH — ./ ya ../ se shuru ho
require('./utils')          // ./utils.js → ./utils/index.js try hota hai
require('../config')        // Parent directory mein
require('./data/users.json') // JSON bhi directly load hota hai
//
// 3. NODE_MODULES — algorithm:
require('lodash')
// Node.js ye order mein dekhta hai:
//   /your/project/node_modules/lodash/
//   /your/node_modules/lodash/         (ek level upar)
//   /node_modules/lodash/              (root tak)
//
// 4. DIRECTORY IMPORT — jab folder require karo
require('./utils')
// Try karta hai:
//   ./utils.js
//   ./utils.json
//   ./utils.node
//   ./utils/index.js    ← package.json "main" nahi mila toh index.js
//   ./utils/index.json

// Kaunsi file actually load hui ye check karo:
console.log(require.resolve('lodash'))
// Output: /project/node_modules/lodash/lodash.js

console.log(require.resolve('./utils'))
// Output: /project/utils.js

// require.resolve throws agar module nahi mila
try {
  require.resolve('non-existent-package')
} catch (e) {
  console.log(e.code) // 'MODULE_NOT_FOUND'
}`,
            explanation: "require.resolve() se actual file path pata chalta hai without loading the module. Bahut useful for debugging MODULE_NOT_FOUND errors. Core modules hamesha jeet te hain — agar 'fs' naam ka npm package bhi ho, built-in fs hi load hoga.",
          }}
          realWorldScenario="Turborepo monorepo mein ek bug tha — package-a mein lodash v4 tha, package-b mein v5. Dono coexist kar rahe the — Node.js ne dono ko different node_modules se load kiya. Koi crash nahi! Ye resolution algorithm ka design hai — nearest node_modules wins. Debugging karna tha? require.resolve('lodash') ne exactly bataya kaunsi version kahan se aa rahi hai. Algorithm samjha toh problem 5 minutes mein solve hua."
          commonMistakes={[
            {
              mistake: "require('utils') — relative path ke bina",
              why: 'Bina ./ ke Node.js pehle core modules check karta hai, phir node_modules. Agar local utils.js file hai, wo load nahi hogi — MODULE_NOT_FOUND aayega.',
              fix: "require('./utils') — local files ke liye hamesha ./ lagao. require('utils') sirf npm packages ke liye hai.",
            },
            {
              mistake: 'Extension include karna .json files ke liye nahi',
              why: '.json files automatically load hoti hain require ke saath — no issue. Lekin agar tum sochte ho extension required hai aur galat extension likhte ho, error aayega.',
              fix: "require('./config') ya require('./config.json') — dono kaam karte hain JSON files ke liye.",
            },
          ]}
          proTip="require.resolve() daily debugging tool banana chahiye! Error hotspot 1: require('utils') — ./ chhod diya, Node.js node_modules mein dekhega, local file nahi milegi. Fix: require('./utils'). Error hotspot 2: Core module ka naam npm package ke naam se clash — require('fs') hamesha built-in milega, npm 'fs' package kabhi nahi. Core modules hamesha jeet te hain. Ye dono common gotchas hain jo 90% developers ek baar zaroor milte hain!"
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 3 Quiz — Modules Check
          </h3>
          <p className="text-sm text-[#71717A]">
            CJS vs ESM sab clear hai? 5 questions — 80%+ chahiye pass ke liye!
          </p>
        </div>
        <QuizSection questions={modulesQuiz} chapterSlug="modules-commonjs-esm" />
      </div>
    </div>
  )
}
