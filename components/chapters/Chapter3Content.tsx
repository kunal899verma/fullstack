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
          Module System — Code Ko Organize Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">require()</code>{' '}
          vs{' '}
          <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">import</code>?{' '}
          CommonJS vs ESM? Ye confusion hamesha ke liye khatam karo.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Node.js mein do module systems hain — purana CommonJS (CJS) aur naya ES Modules (ESM). Dono ke apne use cases hain. Is chapter mein hum dono samjhenge, unka interop dekhenge, aur tum confident ho jaoge kab kya use karna hai.
        </p>
      </div>

      {/* ConceptCard 1: What is a Module */}
      <div id="what-is-module">
        <ConceptCard
          title="Module Kya Hai?"
          emoji="📦"
          difficulty="beginner"
          whatIsIt="Module ek isolated JavaScript file hai. Uske andar jo variables, functions, classes declare hain woh by default baaki files ko accessible nahi hain — jab tak tum explicitly export na karo. Ye encapsulation Node.js ka foundation hai. Socho jaise ek dabba — andar kya hai tum choose karte ho ki kya bahar aane do."
          whenToUse={[
            'Code ko logical units mein organize karna ho — har file ek responsibility',
            'Global scope pollution se bachna ho — variables ek file mein hi rahein',
            'Code reuse karna ho — ek module kai jagah import karo',
            'Testing aasaan banani ho — isolated modules individually test ho sakte hain',
            'Team mein kaam karte waqt — clear boundaries define karo files ke beech',
          ]}
          whyUseIt="Bina modules ke, sabka code ek hi file mein hoga ya global variables share honge — spaghetti code ka nightmare. Modules se:
1. Har file apna scope maintain karti hai
2. Circular dependencies detect hoti hain
3. Node.js modules cache karta hai — performance better hoti hai
4. Code maintainable aur testable rehta hai

Node.js ka poora ecosystem (npm packages) modules par hi based hai."
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
          realWorldScenario="Express.js application mein har route alag file mein hoti hai — userRoutes.js, productRoutes.js, authRoutes.js. Har file apna logic manage karti hai. main app.js mein sab routes import hoti hain. Agar modules na hote, ek hi massive file mein sab kuch hota — team ka kaam impossible ho jaata."
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
          proTip="Module caching: ek baar require() hone ke baad, Node.js module ko cache kar leta hai. Baar baar require('./config') karo — same instance milega, naya nahi. Iska matlab hai ki module-level state shared hoti hai. Isko samjho — singleton pattern free mein milta hai!"
        />
      </div>

      {/* ConceptCard 2: CommonJS */}
      <div id="commonjs">
        <ConceptCard
          title="CommonJS — require() aur module.exports"
          emoji="📌"
          difficulty="beginner"
          whatIsIt="CommonJS Node.js ka original module system hai — 2009 se. require() synchronously module load karta hai — matlab code immediately execute hota hai aur result milta hai. module.exports se export karte hain. Node.js default mein CJS use karta hai (jab tak package.json mein 'type': 'module' na ho). Purana hai lekin powerful hai — poora npm ecosystem iske upar build hua hai."
          whenToUse={[
            'Existing Node.js projects jo CJS use kar rahe hain',
            'npm packages jo CJS export karte hain unhe use karte waqt',
            'CLI tools aur scripts jahan simplicity chahiye',
            'Legacy codebases jahan migration cost zyada hai',
            '__dirname aur __filename naturally chahiye ho',
          ]}
          whyUseIt="CJS battle-tested hai — 15+ saal ka ecosystem iske upar hai. npm ke 2 million+ packages mein se majority CJS use karti hain. Synchronous loading development mein predictable hai. require() conditional ya dynamic bhi ho sakta hai — runtime par decide kar sakte ho kya load karna hai."
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
          realWorldScenario="Express.js ke sab router files CJS use karti hain: const router = require('express').Router(). Module caching ki wajah se express ek baar load hota hai, sab files same instance share karti hain. Real production apps mein ye pattern lakhon routes handle karta hai."
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
          proTip="__filename aur __dirname CJS mein available hain natively — ESM mein nahi (alag workaround chahiye). Agar tumhara code heavy file operations karta hai (like reading templates relative to current file), CJS rakhne mein samajhdaari hai sirf is ek reason se bhi."
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
          whatIsIt="ES Modules (ESM) JavaScript ka modern, official module system hai — ECMAScript 2015 (ES6) mein introduce hua. Browsers aur Node.js dono mein kaam karta hai. Static analysis possible hai (bundlers unused code remove kar sakte hain — tree shaking). Async loading support karta hai. Cleaner syntax. Node.js mein ESM use karne ke liye ya .mjs extension use karo ya package.json mein 'type': 'module' set karo."
          whenToUse={[
            'Naye projects — ESM future hai, CJS legacy',
            'Frontend-backend code sharing — same file browser aur Node mein',
            'Bundlers (Vite, Webpack, esbuild) ke saath — tree shaking better hoti hai',
            'Top-level await chahiye ho — ESM mein directly possible hai',
            'TypeScript projects — ESM naturally fit karta hai',
          ]}
          whyUseIt="ESM ke fayde: Static imports top-level hote hain — bundlers statically analyze karke unused exports remove kar sakte hain (tree shaking). Top-level await support — kisi async wrapper mein wrap karna nahi padta. Better error messages. Browser compatibility. import.meta se file-level metadata milta hai."
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
          realWorldScenario="Next.js, Remix, aur modern React apps sab ESM use karte hain. Vite (superfast dev server) ESM par based hai — native browser ESM use karta hai development mein. Production build mein tree shaking se bundle size drastically kam hoti hai — unused functions automatically remove hoti hain."
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
          proTip="package.json mein 'type': 'module' set karo toh .js files ESM ban jaati hain. Ya .mjs extension use karo specific files ke liye — ye bina package.json change ke kaam karta hai. Mixed projects mein: .mjs = ESM, .cjs = CJS, chahe package.json kuch bhi kahe."
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
          whatIsIt="CJS aur ESM dono powerful hain — lekin alag use cases ke liye. Naya project shuru kar rahe ho? ESM. Purana Express app maintain kar rahe ho? CJS. npm package publish kar raha hai? Dual CJS+ESM support karo. Ye guide confusion hamesha ke liye khatam karega."
          whenToUse={[
            'CJS: Existing Node.js projects, legacy codebases, pure server-side apps',
            'ESM: Naye projects, TypeScript, Vite/Next.js/Remix, browser+Node shared code',
            'Dual (CJS+ESM): npm packages publish karte waqt — sabko support karo',
            'ESM: Jab top-level await chahiye (database connections at startup)',
            'CJS: Jab dynamic require() runtime mein chahiye without dynamic import()',
          ]}
          whyUseIt="Decision simple karo: Agar naya project hai — ESM. Agar existing CJS project hai — migrate karna optional hai, force mat karo. npm package publish karna hai — dual exports set karo (conditional exports in package.json). Interop dono directions mein possible hai lekin tricky hai."
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
          realWorldScenario="sindresorhus ke packages (chalk, got, etc.) pure ESM hain — agar tumhara project CJS hai toh dynamic import() use karna padega. Isko 'ESM Hell' kaha jaata hai. Lesson: naye projects ESM mein shuru karo taaki future-proof raho."
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
          proTip="Ek quick decision tree: New project? → ESM. Existing CJS project? → CJS raho, migrate optional. Publishing npm package? → Conditional exports use karo — dono support karo. TypeScript project? → ESM natively better fits. Full-stack Next.js/Remix? → Already ESM configured hai."
        />
      </div>

      {/* ConceptCard 5: Module Resolution */}
      <div id="module-resolution">
        <ConceptCard
          title="Module Resolution Algorithm"
          emoji="🔍"
          difficulty="intermediate"
          whatIsIt="Jab tum require('lodash') likhte ho, Node.js ek specific order mein dekhta hai: pehle core modules check karta hai, phir relative paths (./ ya ../) resolve karta hai, phir node_modules directory mein current folder se upar tak jaata hai. Ye algorithm samjho — import errors aur 'MODULE_NOT_FOUND' debugging mein kaam aayega."
          whenToUse={[
            'MODULE_NOT_FOUND errors debug karte waqt',
            'Kyon ek particular version of package load ho rahi hai ye samjhna ho',
            'Monorepo setup mein package resolution issues fix karte waqt',
            'Custom module paths configure karte waqt (NODE_PATH, tsconfig paths)',
          ]}
          whyUseIt="Resolution algorithm samjhne se tum confidently keh sako ge ki kaunsi file actually load ho rahi hai. Nested dependencies mein alag versions resolve hoti hain — ye by design hai. node_modules hoisting samjhna npm link aur monorepo debugging ke liye essential hai."
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
          realWorldScenario="Monorepo mein (nx, turborepo) ek package dusre ko use karta hai. npm install ne sab node_modules mein alag jagah rakha. Agar lodash ka v4 aur v5 dono installed hain (different packages ke dependencies), dono coexist kar sakte hain — Node.js nearest node_modules se load karta hai. Ye dependency hell se bachata hai."
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
          proTip="require.resolve() tumhara best friend hai debugging mein — bina module actually load kiye exact file path milta hai. Module Resolution Visualizer feature aane wala hai is platform par jahan tum visually dekh sako ge resolution steps. Tab tak require.resolve() use karo!"
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
