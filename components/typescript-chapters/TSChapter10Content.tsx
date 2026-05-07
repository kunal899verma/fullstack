'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: '@types/node package kab install karna hota hai?',
    options: [
      { text: 'Kabhi nahi — Node.js types built-in hain', correct: false, explanation: 'TypeScript ke liye Node.js types alag package mein hain — @types/node.' },
      { text: 'Jab Node.js ke APIs (fs, path, process) TypeScript project mein use karo', correct: true, explanation: 'Sahi! npm install --save-dev @types/node aur tsconfig mein types: ["node"] add karo.' },
      { text: 'Sirf production mein', correct: false, explanation: '@types packages devDependencies mein jaate hain — development ke liye hain.' },
      { text: 'Sirf Express ke saath', correct: false, explanation: '@types/node Node.js ke saath har TypeScript project mein chahiye hota hai.' },
    ],
  },
  {
    question: 'Express Request ko TypeScript mein kaise type karte hain request body ke liye?',
    options: [
      { text: 'Request<Params, ResBody, ReqBody, Query>', correct: true, explanation: 'Sahi! Request generic 4 type params leta hai — ReqBody third position pe. Request<{}, {}, CreateUserDto> se req.body typed ho jaata hai.' },
      { text: 'TypedRequest<Body>', correct: false, explanation: 'Ye Express ka built-in type nahi hai.' },
      { text: 'req.body as CreateUserDto', correct: false, explanation: 'Type assertion unsafe hai — runtime validation nahi hota.' },
      { text: 'Express automatically infer karta hai', correct: false, explanation: 'Express automatically infer nahi karta — explicitly type karna padta hai.' },
    ],
  },
  {
    question: 'Zod ke saath z.infer<typeof schema> kya deta hai?',
    options: [
      { text: 'Schema ka runtime validation function', correct: false, explanation: 'z.infer type extract karta hai, validation function nahi.' },
      { text: 'Schema se TypeScript type derive karta hai — duplicate type definition avoid', correct: true, explanation: 'Bilkul! Schema ek baar likho — Zod runtime validation karta hai aur TypeScript ko type bhi milti hai. DRY principle.' },
      { text: 'Schema ko JSON mein convert karta hai', correct: false, explanation: 'z.infer TypeScript type level pe kaam karta hai — runtime conversion nahi.' },
      { text: 'Schema validate karta hai', correct: false, explanation: 'Validation ke liye schema.parse() ya schema.safeParse() use karo.' },
    ],
  },
  {
    question: 'ts-node aur tsc mein kya fark hai?',
    options: [
      { text: 'Koi fark nahi — dono same hain', correct: false, explanation: 'Dono alag tools hain — different use cases.' },
      { text: 'ts-node: direct TypeScript run karo dev mein; tsc: production ke liye compile karo', correct: true, explanation: 'Sahi! ts-node JIT compilation karta hai — compile step skip. tsc JavaScript files produce karta hai production deployment ke liye.' },
      { text: 'tsc faster hai', correct: false, explanation: 'tsc compiled JS produce karta hai jo faster hai runtime pe, lekin ts-node dev mein convenient hai.' },
      { text: 'ts-node production mein use karo', correct: false, explanation: 'ts-node development ke liye hai — production mein compiled JS deploy karo.' },
    ],
  },
]

function TsNodeSetupDiagram() {
  const items = [
    { label: 'Type Foundation', sublabel: '@types/node + @types/express — typed Node.js APIs + typed Express routes', color: '#3178C6', bg: 'rgba(49,120,198,0.1)', border: 'rgba(49,120,198,0.3)', icon: '📦' },
    { label: 'tsconfig.json', sublabel: 'strict: true · target: ES2022 · module: commonjs · esModuleInterop: true', color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.3)', icon: '⚙️' },
    { label: 'Development (ts-node / tsx)', sublabel: 'JIT compilation — no manual compile step · tsx watch for hot reload', color: '#6366F1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.3)', icon: '⚡' },
    { label: 'Production (tsc → node)', sublabel: 'tsc compiles to dist/ · node dist/index.js runs clean compiled JS', color: '#3178C6', bg: 'rgba(49,120,198,0.1)', border: 'rgba(49,120,198,0.3)', icon: '🚀' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">TypeScript + Node.js Setup Layers</p>
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

export default function TSChapter10Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(49,120,198,0.06)', border: '1px solid rgba(49,120,198,0.25)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          TypeScript with Node.js & Express — Backend Ka Sahi Stack
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ye shocking lagna chahiye — process.env.DATABASE_URL TypeScript mein string | undefined hai, plain string nahi. Iska matlab agar tum directly prisma connect karo bina check ke, TypeScript warn karega. Ye ek real bug hai jo production mein hota hai — app start hoti hai, first database query pe crash. TypeScript ne pehle hi bataya tha, kisi ne dhyan nahi diya.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ab sawaal ye aata hai — Node.js TypeScript ke saath theek se kaise setup karo? @types/node se Node.js APIs typed ho jaate hain, Express generics se request body typed hoti hai, Zod se runtime + compile time dono safe hote hain. Is chapter mein ye poora setup cover karenge — kal se apne project mein use karo.
        </p>
      </div>

      <TsNodeSetupDiagram />

      <div id="types-node">
        <ConceptCard
          title="@types/node — Node.js Ko Type Karo"
          emoji="📦"
          difficulty="intermediate"
          whatIsIt="@types/node ek devDependency hai jo Node.js ke core module APIs ke types provide karta hai — fs, path, http, Buffer, process, EventEmitter sab. Bina iske TypeScript ko Node.js ka existence hi nahi pata. Ye installed hai toh process.cwd() string return karta hai — TypeScript jaanta hai. process.env.PORT string | undefined hai — TypeScript force karta hai check karo. Har Node.js TypeScript project mein ye zaroori hai."
          whenToUse={[
            'Koi bhi Node.js project jahan TypeScript use ho',
            'fs, path, crypto, http modules use karne se pehle',
            'process.env TypeScript-safe access ke liye',
          ]}
          whyUseIt="Bina @types/node ke fs.readFile likhoge toh TypeScript bolta hai 'Cannot find module fs'. process.env access karo — 'Cannot find name process'. Ye frustrating hota hai. @types/node install karo — sab kuch click karne pe exact documentation milti hai IDE mein. Return types pata hain, overloads pata hain, callbacks pata hain. Zero guessing, zero MDN lookup for Node.js basics."
          howToUse={{
            code: `# Install
npm install --save-dev @types/node typescript ts-node

# tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "types": ["node"],          // explicit include
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}

# Now Node.js APIs are typed:
import fs from 'fs/promises'
import path from 'path'

async function readConfig(filename: string): Promise<object> {
  const filePath = path.join(process.cwd(), 'config', filename)
  const content = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(content)
}

// process.env is typed as NodeJS.ProcessEnv (Record<string, string | undefined>)
const port = parseInt(process.env.PORT ?? '3000', 10)  // safely typed`,
            language: 'typescript',
            explanation: 'Ab sawaal ye aata hai — tsconfig mein types: ["node"] kyun likhna hai agar @types automatically pick up hota hai? Granular control ke liye. Agar sirf "node" specify karo toh sirf Node.js types available hain. Agar types field nahi likhi toh sab @types packages load hote hain — browser types bhi, test framework types bhi. Server-side only project mein DOM types include nahi hone chahiye.',
            filename: 'setup.ts',
          }}
          realWorldScenario="Production deployment — DATABASE_URL env variable set karna bhool gaye. Bina TypeScript — app start hoti hai, first request aata hai, db.connect(undefined) — crash. TypeScript ke saath — process.env.DATABASE_URL string | undefined hai, Zod parse pe startup mein hi throw. Fail fast, fail loud. Ye production cost save karta hai."
          commonMistakes={[
            { mistake: 'types: ["node"] tsconfig mein bhool jaana', why: 'Global types jaise Buffer, NodeJS automatically available nahi hote', fix: 'tsconfig mein types array mein "node" add karo' },
          ]}
          proTip="env.ts file banao jahan Zod se saari environment variables validate aur export karo. import { env } from './env' — phir poori app mein env.DATABASE_URL, env.PORT use karo directly. process.env kabhi direct access mat karo — sirf env.ts mein ek jagah. Agar variable missing hai toh startup pe loudly fail karo, not silently at runtime."
        />
      </div>

      <div id="express-types">
        <ConceptCard
          title="Express + TypeScript — Full Setup"
          emoji="🚀"
          difficulty="intermediate"
          whatIsIt="Express Request ek generic type hai — Request&lt;Params, ResBody, ReqBody, Query&gt; — 4 type parameters. Ye bahut kaam ki cheez hai. req.body TypeScript mein by default any hota hai — generic se typed kar sakte ho. req.params, req.query bhi. Ye compile-time guarantee deta hai ki handler sahi structure expect karta hai. Middleware se req.user add karo — module augmentation se typed ho jaata hai."
          whenToUse={[
            'REST API routes mein request body, params, query type karne ke liye',
            'Response type define karne ke liye',
            'Middleware mein type-safe req properties add karne ke liye',
          ]}
          whyUseIt="Sochte hain kya hota hai bina typed routes ke — req.body.email likhate ho, client ne emial bheja (typo), undefined.toLowerCase() — crash. TypeScript ke saath Request&lt;{}, {}, CreateUserDto&gt; — req.body.email string guaranteed hai (after Zod validation). Dono — compile time structure check aur runtime Zod validation — dono chahiye. TypeScript guarantee nahi deta ki data actually aayega, sirf ki shape sahi hai."
          howToUse={{
            code: `import express, { Request, Response, NextFunction } from 'express'

// DTOs
interface CreateUserBody {
  name: string
  email: string
  password: string
}

interface UserParams {
  id: string
}

interface UserQuery {
  include?: string
}

// Typed route handler
// Request<Params, ResponseBody, RequestBody, QueryParams>
app.post(
  '/users',
  async (
    req: Request<{}, {}, CreateUserBody>,
    res: Response
  ) => {
    const { name, email, password } = req.body  // fully typed!
    // name: string, email: string, password: string
    const user = await userService.create({ name, email, password })
    res.status(201).json(user)
  }
)

app.get(
  '/users/:id',
  async (
    req: Request<UserParams, {}, {}, UserQuery>,
    res: Response
  ) => {
    const { id } = req.params   // string
    const { include } = req.query  // string | undefined
    const user = await userService.findById(parseInt(id))
    res.json(user)
  }
)

// Typed error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message)
  res.status(500).json({ error: err.message })
})`,
            language: 'typescript',
            explanation: 'Ab sawaal ye aata hai — Request generic ke 4 parameters mein khali {} kyun likhte hain? Kyunki unhe use nahi karna us route pe. Params route ke liye hai (:id etc.), ResBody zyada use nahi hota, ReqBody POST ke liye important hai, Query query strings ke liye. Sirf jo chahiye use karo — baaki empty rakhna theek hai.',
            filename: 'express-typed.ts',
          }}
          realWorldScenario="Team mein code review — naya developer ne route likha req.body.userName access kar raha hai. TypeScript bolta hai 'Property userName does not exist' — CreateUserDto mein name hai, userName nahi. Ye review comment nahi bana, TypeScript ne already catch kiya. Routes typed rakhne se documentation bhi automatic ho jaati hai — interface dekho, route kya expect karta hai samjh jaata hai."
          commonMistakes={[
            { mistake: 'req.body ko any cast karna', why: 'Runtime crash risk — TypeScript benefits khatam', fix: 'Request<{}, {}, YourBodyType> use karo ya Zod se validate aur infer karo' },
          ]}
          proTip="req.user ke liye module augmentation zaroor karo — src/types/express.d.ts banao, declare module 'express-serve-static-core' likhke Request interface extend karo. Ye pattern har Express + TypeScript project mein chahiye. Middleware user attach karta hai, TypeScript poori app mein req.user ko safely typed maanta hai."
        />
      </div>

      <div id="middleware-types">
        <ConceptCard
          title="Zod — Runtime + TypeScript Validation"
          emoji="🛡️"
          difficulty="intermediate"
          whatIsIt="Zod TypeScript ka best friend hai — ek schema likho, ek baar. z.object({ name: z.string(), email: z.string().email() }). z.infer se TypeScript type automatically derive hoti hai. Runtime pe safeParse validation karta hai. Ye DRY principle ka perfect example hai — interface alag, validation alag — nahi! Schema ek, dono milte hain. Ye soch ke design kiya gaya hai TypeScript ke saath."
          whenToUse={[
            'API request body validate karne ke liye',
            'Environment variables validate karne ke liye',
            'External API responses validate karne ke liye',
            'Form data validation mein',
          ]}
          whyUseIt="Ye bahut important concept hai — TypeScript compile time disappear ho jaata hai. Runtime pe koi TypeScript nahi hai. Toh jab API request aata hai, body koi bhi structure bhej sakta hai — TypeScript kuch nahi rok sakta. Isliye runtime validation zaroori hai. Zod dono problems solve karta hai — schema se type bhi milti hai TypeScript ko, aur safeParse se runtime validation bhi. Do tools ki jagah ek."
          howToUse={{
            code: `import { z } from 'zod'
import { Request, Response } from 'express'

// Schema define karo — ek baar
const CreateUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().int().positive().optional(),
  role: z.enum(['user', 'admin']).default('user'),
})

// TypeScript type automatically derive hoti hai — duplicate nahi!
type CreateUserDto = z.infer<typeof CreateUserSchema>
// { name: string; email: string; password: string; age?: number; role: 'user' | 'admin' }

// Validation middleware
function validate<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.flatten(),
      })
    }
    req.body = result.data  // validated & transformed data
    next()
  }
}

// Route mein use karo
app.post('/users', validate(CreateUserSchema), async (req, res) => {
  const userData: CreateUserDto = req.body  // fully safe!
  const user = await userService.create(userData)
  res.status(201).json(user)
})

// Env validation — startup pe
const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  PORT: z.coerce.number().default(3000),
})

export const env = EnvSchema.parse(process.env)  // throws on startup if invalid`,
            language: 'typescript',
            explanation: 'Validate middleware ek reusable pattern hai — schema pass karo, middleware body validate karta hai, next() call karta hai. Route handler mein data guaranteed valid hai. result.error.flatten() Zod ka feature hai — field-specific errors nicely formatted. Env validation — EnvSchema.parse(process.env) startup pe. Missing variable hai toh immediate throw, meaningful message ke saath.',
            filename: 'zod-validation.ts',
          }}
          realWorldScenario="User registration route — client ne password: 123 bheja (number, string nahi). Bina Zod — TypeScript khush, runtime mein password.length call pe TypeError. Zod ke saath — middleware mein safeParse fail, 400 error with 'password must be a string'. Client developer immediately samjhta hai kya fix karna hai. Ye developer experience hai — fast feedback loop."
          commonMistakes={[
            { mistake: 'Zod schema aur TypeScript interface separately maintain karna', why: 'Sync out of sync ho jaate hain — bugs', fix: 'Sirf Zod schema likho, z.infer se TypeScript type derive karo' },
          ]}
          proTip="Zod ka z.coerce.number() — string '3000' automatically number mein convert ho jaata hai. Port number ke liye perfect — process.env.PORT hamesha string hota hai. z.coerce use karo conversions ke liye. Aur z.preprocess bhi dekhna — custom transformations ke liye. Zod bahut powerful library hai — official docs zaroor padho."
        />
      </div>

      <div id="zod-validation">
        <ConceptCard
          title="ts-node, tsx & Development Workflow"
          emoji="⚡"
          difficulty="beginner"
          whatIsIt="ts-node aur tsx — ye TypeScript ka JIT (Just-In-Time) execution hai. tsc compile karo phir node run karo — ye workflow development mein slow hai. ts-node aur tsx TypeScript directly run karte hain — compile step skip. tsx faster hai kyunki esbuild use karta hai transpilation ke liye. Production mein use nahi karna — wahan compiled JS deploy karo. Development aur scripts ke liye perfect."
          whenToUse={[
            'Development mein scripts run karne ke liye',
            'Database migrations ke liye',
            'Build step add kiye bina TypeScript scripts run karne ke liye',
          ]}
          whyUseIt="Development speed matter karta hai. tsc run karo — 5-10 seconds. File badlo, phir tsc — 5-10 seconds. Ye disruptive hai. tsx watch mode mein chalaao — file save karo, instant restart. Flow maintain rehta hai. Aur Node 22 mein experimental built-in TypeScript support bhi aaya hai — future mein ye tools ki zaroorat kam ho jaayegi. Lekin abhi tsx best bet hai."
          howToUse={{
            code: `# ts-node install
npm install --save-dev ts-node

# tsx (faster alternative, ESM support better)
npm install --save-dev tsx

# package.json scripts
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "migrate": "tsx src/scripts/migrate.ts"
  }
}

# Direct run
npx ts-node src/server.ts
npx tsx src/server.ts

# Node 22+ built-in TypeScript support (experimental)
node --experimental-strip-types src/server.ts

# tsconfig for ts-node (tsconfig.json mein)
{
  "ts-node": {
    "transpileOnly": true,  // type checking skip — faster
    "esm": true
  }
}`,
            language: 'bash',
            explanation: 'Ab sawaal ye aata hai — ts-node vs tsx, kaunsa use karein? tsx recommend karo. ts-node TypeScript compiler use karta hai — slower. tsx esbuild use karta hai — 10-100x faster. ESM support bhi tsx mein better hai. Node 22+ ka --experimental-strip-types interesting hai — types strip karta hai, runtime pe type check nahi. Future direction yahi lag raha hai.',
            filename: 'package.json',
          }}
          realWorldScenario="Professional Node.js project ka standard workflow — dev: tsx watch, build: tsc, start: node dist/index.js, seed: tsx scripts/seed.ts, migrate: tsx scripts/migrate.ts. Scripts ke liye tsx bahut convenient hai — build step nahi, TypeScript directly. CI mein build + start. Ye separation development speed aur production reliability dono deta hai."
          commonMistakes={[
            { mistake: 'Production mein ts-node use karna', why: 'Memory overhead hai, TypeScript compilation runtime pe slow karta hai', fix: 'Production: npm run build then node dist/index.js' },
          ]}
          proTip="ts-node use karna hi hai toh transpileOnly: true set karo — type checking skip karta hai, sirf transpile. Speed dramatically better. Type checking IDE aur separate tsc --noEmit command pe karo. tsx ke liye koi alag config nahi chahiye — out of the box fast. Ek tip: tsx mein --tsconfig flag se custom tsconfig specify kar sakte ho scripts ke liye."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="ts-with-nodejs" />
    </div>
  )
}
