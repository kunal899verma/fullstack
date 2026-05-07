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

export default function TSChapter10Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(49,120,198,0.06)', border: '1px solid rgba(49,120,198,0.25)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          TypeScript with Node.js & Express
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          TypeScript aur Node.js ka combination production-grade backend banane ka standard ban gaya hai. @types/node, Express typing, Zod validation — sab set up karna hoga properly.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum real-world Express + TypeScript setup cover karenge — jo aap kal se use kar sako apne projects mein.
        </p>
      </div>

      <div id="types-node">
        <ConceptCard
          title="@types/node — Node.js Ko Type Karo"
          emoji="📦"
          difficulty="intermediate"
          whatIsIt="@types/node package Node.js core APIs (fs, path, http, process, Buffer, etc.) ke TypeScript type definitions provide karta hai."
          whenToUse={[
            'Koi bhi Node.js project jahan TypeScript use ho',
            'fs, path, crypto, http modules use karne se pehle',
            'process.env TypeScript-safe access ke liye',
          ]}
          whyUseIt="Without @types/node, TypeScript ko Node.js APIs ka pata nahi — har jagah 'Cannot find name' errors aate hain."
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
            explanation: '@types/node install ke baad fs, path, process sab typed ho jaate hain. process.env string | undefined return karta hai — TypeScript force karta hai null check ke liye.',
            filename: 'setup.ts',
          }}
          realWorldScenario="Production app mein process.env TypeScript-safe access: const dbUrl = process.env.DATABASE_URL — agar undefined ho toh TypeScript warn karta hai. Runtime crash se pehle issue pakad jaata hai."
          commonMistakes={[
            { mistake: 'types: ["node"] tsconfig mein bhool jaana', why: 'Global types jaise Buffer, NodeJS automatically available nahi hote', fix: 'tsconfig mein types array mein "node" add karo' },
          ]}
          proTip="process.env ke liye ek separate env.ts file banao: const env = { PORT: parseInt(process.env.PORT ?? '3000') } — saari env variables ek jagah typed."
        />
      </div>

      <div id="express-types">
        <ConceptCard
          title="Express + TypeScript — Full Setup"
          emoji="🚀"
          difficulty="intermediate"
          whatIsIt="Express request/response ko TypeScript generic parameters se type kar sakte ho — route-specific types mil jaate hain."
          whenToUse={[
            'REST API routes mein request body, params, query type karne ke liye',
            'Response type define karne ke liye',
            'Middleware mein type-safe req properties add karne ke liye',
          ]}
          whyUseIt="Typed routes se wrong body structure, missing params — sab compile time pe pakad jaate hain. Runtime crashes drastically kam hote hain."
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
            explanation: 'Request<Params, ResBody, ReqBody, Query> — 4 type parameters se complete typing milti hai. req.body, req.params, req.query sab typed hain.',
            filename: 'express-typed.ts',
          }}
          realWorldScenario="Large API mein har route ka Request type explicitly define karo. Code reviewer instantly samjh jaata hai ki route kya expect karta hai — documentation automatic ho jaati hai."
          commonMistakes={[
            { mistake: 'req.body ko any cast karna', why: 'Runtime crash risk — TypeScript benefits khatam', fix: 'Request<{}, {}, YourBodyType> use karo ya Zod se validate aur infer karo' },
          ]}
          proTip="@types/express install karo: npm install --save-dev @types/express. aur Request ko import karo — express.Request se nahi, named import se."
        />
      </div>

      <div id="middleware-types">
        <ConceptCard
          title="Zod — Runtime + TypeScript Validation"
          emoji="🛡️"
          difficulty="intermediate"
          whatIsIt="Zod schema validation library hai — ek schema define karo, runtime validation aur TypeScript type dono milti hain. z.infer<typeof schema> se type derive hoti hai."
          whenToUse={[
            'API request body validate karne ke liye',
            'Environment variables validate karne ke liye',
            'External API responses validate karne ke liye',
            'Form data validation mein',
          ]}
          whyUseIt="TypeScript sirf compile time check karta hai — runtime pe koi unknown data aata hai toh TypeScript kuch nahi kar sakta. Zod runtime safety deta hai."
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
            explanation: 'Zod schema se z.infer se type milti hai — ek baar define karo. safeParse runtime validation karta hai. validate middleware reusable pattern hai. env validation startup pe crash karta hai — better than runtime failure.',
            filename: 'zod-validation.ts',
          }}
          realWorldScenario="Production API mein Zod middleware har route pe — client ne galat body bheja toh 400 milta hai with details. No more undefined is not an object errors in production."
          commonMistakes={[
            { mistake: 'Zod schema aur TypeScript interface separately maintain karna', why: 'Sync out of sync ho jaate hain — bugs', fix: 'Sirf Zod schema likho, z.infer se TypeScript type derive karo' },
          ]}
          proTip="env.ts file mein Zod se process.env validate karo application start hone pe — agar DATABASE_URL missing hai toh app immediately fail kare, na ki first database query pe."
        />
      </div>

      <div id="zod-validation">
        <ConceptCard
          title="ts-node, tsx & Development Workflow"
          emoji="⚡"
          difficulty="beginner"
          whatIsIt="ts-node aur tsx TypeScript files ko directly Node.js mein run karne dete hain — pehle compile karne ki zaroorat nahi. Development workflow fast hota hai."
          whenToUse={[
            'Development mein scripts run karne ke liye',
            'Database migrations ke liye',
            'Build step add kiye bina TypeScript scripts run karne ke liye',
          ]}
          whyUseIt="tsc + node workflow slow hai development mein. ts-node instant TypeScript execution deta hai — save karo aur immediately test karo."
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
            explanation: 'tsx recommend karo ts-node ke upar — faster hai, ESM better support karta hai. watch mode mein file changes pe automatic restart. Production mein compiled JS use karo.',
            filename: 'package.json',
          }}
          realWorldScenario="Development mein: npm run dev — tsx watch se app restart karta hai automatically. Production mein: npm run build (tsc) then npm start (node dist/). Database seeds: tsx scripts/seed.ts."
          commonMistakes={[
            { mistake: 'Production mein ts-node use karna', why: 'Memory overhead hai, TypeScript compilation runtime pe slow karta hai', fix: 'Production: npm run build then node dist/index.js' },
          ]}
          proTip="nodemon + ts-node se zyada tsx watch reliable hai. tsconfig mein transpileOnly: true set karo ts-node ke liye — type checking IDE pe hogi, ts-node fast chalega."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="ts-with-nodejs" />
    </div>
  )
}
