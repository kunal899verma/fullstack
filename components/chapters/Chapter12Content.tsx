'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

export default function Chapter12Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Express.js Deep Dive — Production-Grade Patterns
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Express Node.js ka sabse popular web framework hai — minimal, flexible, battle-tested. Lekin minimal matlab incomplete nahi — middleware chain, router, error handling sab carefully design hua hai. Is chapter mein hum Express ke internals aur production patterns cover karenge.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Express ko production mein use karna aur sirf hello world likhna bahut alag hai. Security headers, rate limiting, proper error handling — ye sab necessary hain real apps ke liye.
        </p>
      </div>

      <div id="middleware-chain">
        <ConceptCard
          title="Express Middleware Chain"
          emoji="⛓️"
          difficulty="intermediate"
          whatIsIt="Express mein har request middleware stack se guzarti hai — functions jo (req, res, next) accept karte hain. Middleware req/res objects modify kar sakta hai, response end kar sakta hai, ya next() call karke aage bhej sakta hai. Order matter karta hai — sequence mein execute hote hain."
          whenToUse={[
            'Request processing — authentication, logging, rate limiting',
            'Response modification — CORS headers, compression',
            'Error handling — centralized error processing',
            'Cross-cutting concerns — metrics, tracing',
          ]}
          whyUseIt="Middleware separation of concerns implement karta hai — auth logic auth middleware mein, logging middleware mein, business logic route handler mein. Reusable, composable, testable. Ye pattern itna powerful hai ki Node.js ecosystem ne adopt kar liya widely."
          howToUse={{
            filename: 'middleware.ts',
            language: 'typescript',
            code: `import express, { Request, Response, NextFunction } from 'express'

const app = express()

// Global middleware — har request par chalega
app.use(express.json({ limit: '1mb' }))          // Body parser
app.use(express.urlencoded({ extended: true }))  // Form data

// Custom logging middleware
function logger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now()
  const { method, url } = req

  // Response finish hone par log karo
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(\`\${method} \${url} \${res.statusCode} \${duration}ms\`)
  })

  next()  // Zaroor call karo — warna request stuck ho jaayega
}

app.use(logger)

// Auth middleware — specific routes ke liye
function authenticate(req: Request & { userId?: string }, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'Token required' })
    // next() mat karo — request end ho gayi
  }

  try {
    const decoded = verifyJWT(token)
    req.userId = decoded.userId  // req pe data attach karo
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Route-level middleware
app.get('/protected', authenticate, (req, res) => {
  res.json({ userId: (req as Request & { userId: string }).userId })
})

// Multiple middleware
app.post('/admin/action', authenticate, authorizeAdmin, rateLimiter, handler)`,
            explanation: "next() call na karo agar response already send kar diya — warna 'headers already sent' error. next(error) call karo error ke saath — Express error middleware ko jump karo. Middleware req pe custom properties attach kar sakte hain — par TypeScript mein interface extend karo. Order critical: json() parse karo, phir use karo.",
          }}
          realWorldScenario="API gateway middleware stack: cors → rateLimit → requestId → logger → authenticate → authorize → validateInput → businessLogic. Har middleware ek responsibility. Business logic handler tab clean rehta hai jab cross-cutting concerns alag hain."
          commonMistakes={[
            {
              mistake: 'next() aur res.json() dono call karna',
              why: 'Agar res.json() ke baad next() call kiya — aur koi middleware response modify kare — "Cannot set headers after they are sent" error.',
              fix: 'Return statement use karo: return res.json({ error: "..." }). Next() hamesha sirf jab aage bhejana ho, response send karne ke baad nahi.',
            },
            {
              mistake: 'Middleware order galat rakhhna',
              why: 'Logger body-parser ke baad hona chahiye taaki parsed body available ho. Auth middleware routes se pehle. Order logic determine karta hai.',
              fix: 'Order: error-free global middleware (cors, body-parser, logger) → auth → routes. Error middleware hamesha last mein.',
            },
          ]}
          proTip="morgan library use karo production logging ke liye: app.use(morgan('combined')). Apache-style access logs milti hain — IP, method, URL, status, size, response time. Production mein 'combined' format, development mein 'dev' format (colored, concise)."
        />
      </div>

      <div id="express-router">
        <ConceptCard
          title="Express Router — Modular Routing"
          emoji="🗂️"
          difficulty="intermediate"
          whatIsIt="express.Router() mini Express app create karta hai — apne middleware aur routes ke saath. Large apps ko feature-based modular structure deta hai. router.param() dynamic route parameters pe middleware define karta hai. Route groups, prefix mounting — clean architecture possible hoti hai."
          whenToUse={[
            'Large APIs — routes multiple files mein organize karo',
            'Feature-based routing — /api/users, /api/products alag routers',
            'Middleware scope — sirf specific routes ke liye middleware apply',
            'Versioned APIs — /api/v1 aur /api/v2 alag routers',
          ]}
          whyUseIt="Sab routes ek file mein rakhna unmanageable ho jaata hai 50+ routes ke baad. Router se modular architecture milti hai — each router ek concern handle karta hai, independently testable, team members ke beech clear ownership."
          howToUse={{
            filename: 'routes/users.ts',
            language: 'typescript',
            code: `import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'

const router = Router()

// router.param — :userId wale routes par chalega
router.param('userId', async (req: Request & { userObj?: User }, res: Response, next: NextFunction, userId: string) => {
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) return res.status(404).json({ error: 'User not found' })
  req.userObj = user  // Sabhi routes mein available
  next()
})

// Routes
router.get('/', async (req: Request, res: Response) => {
  const users = await db.user.findMany()
  res.json({ data: users })
})

router.get('/:userId', (req: Request & { userObj?: User }, res: Response) => {
  res.json({ data: req.userObj })  // param middleware ne already fetch kiya
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = createUserSchema.parse(req.body)
    const user = await db.user.create({ data: body })
    res.status(201).json({ data: user })
  } catch (err) {
    next(err)  // Error middleware ko bhejo
  }
})

export default router

// app.ts mein mount karo
// app.use('/api/users', usersRouter)
// app.use('/api/products', productsRouter)
// app.use('/api/v2/users', usersRouterV2)`,
            explanation: "router.param() powerful DRY tool hai — har route mein user fetch karne ki zaroorat nahi. param middleware har baar uss parameter wale route se pehle chalta hai. next(err) error middleware ko activate karta hai — try-catch mein catch block mein next(err) call karo.",
          }}
          realWorldScenario="E-commerce API: routes/products.ts (CRUD products), routes/orders.ts (order management), routes/users.ts (user accounts), routes/payments.ts (Stripe integration). Har router apna middleware chain rakhta hai — auth, validation, rate limiting targeted hota hai."
          commonMistakes={[
            {
              mistake: 'Router ko re-mount karna ya duplicate mount',
              why: 'app.use("/api", router) ko ek se zyada baar call karne par duplicate routes register hote hain — unexpected behavior.',
              fix: 'Har router ek baar mount karo. Module caching se import karte waqt same instance milta hai — worry mat karo.',
            },
            {
              mistake: 'router.param validation baad mein route se miss karna',
              why: 'router.param register karo route se pehle — order important nahi technically lekin readability ke liye top par rakho.',
              fix: "router.param('userId', ...) file ke top mein define karo — convention hai aur confusion se bachata hai.",
            },
          ]}
          proTip={`express-async-errors package install karo — har route handler mein try-catch nahi likhna padega. Import karo aur async errors automatically next(err) mein pass ho jaate hain: require('express-async-errors'). Ya wrappAsync utility banao: const wrap = fn => (req, res, next) => fn(req, res, next).catch(next).`}
        />
      </div>

      <div id="error-handling">
        <ConceptCard
          title="Error Handling Middleware — 4 Param Signature"
          emoji="⚠️"
          difficulty="intermediate"
          whatIsIt="Express mein error handling middleware 4 parameters leta hai: (err, req, res, next). Ye 4th parameter hi Express ko batata hai ki ye error handler hai — regular middleware se alag. Hamesha app ke end mein register karo. Custom AppError class se structured errors banao aur type-safe handling karo."
          whenToUse={[
            'Centralized error handling — sab errors ek jagah process karo',
            'API error format standardize karna',
            'Error logging — Sentry, Datadog, custom loggers',
            'Environment-specific behavior — development mein stack trace, production mein generic message',
          ]}
          whyUseIt="Bina centralized error handler ke har route mein error handling duplicate hogi. AppError class se operational errors (expected) aur programming errors (unexpected) alag karo. Stack trace production mein clients ko mat bhejo — security risk hai."
          howToUse={{
            filename: 'error-handler.ts',
            language: 'typescript',
            code: `import { Request, Response, NextFunction } from 'express'

// Custom error class
class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
    Error.captureStackTrace(this, this.constructor)
  }
}

// Common errors
class NotFoundError extends AppError {
  constructor(resource: string) {
    super(\`\${resource} not found\`, 404, 'NOT_FOUND')
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 422, 'VALIDATION_ERROR')
  }
}

class UnauthorizedError extends AppError {
  constructor() {
    super('Authentication required', 401, 'UNAUTHORIZED')
  }
}

// Error middleware — 4 params, hamesha last mein
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  // Zod validation errors
  if (err.name === 'ZodError') {
    return res.status(422).json({
      status: 'error',
      code: 'VALIDATION_ERROR',
      errors: (err as ZodError).errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    })
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ status: 'error', message: 'Invalid token' })
  }

  const statusCode = err instanceof AppError ? err.statusCode : 500
  const code = err instanceof AppError ? err.code : 'INTERNAL_ERROR'

  // Error log karo (Sentry, etc.)
  if (statusCode >= 500) {
    console.error(err)  // Sentry.captureException(err)
  }

  res.status(statusCode).json({
    status: 'error',
    code,
    message: err instanceof AppError ? err.message : 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

// 404 handler — routes ke baad, error handler se pehle
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' })
})

app.use(errorHandler)  // Hamesha LAST mein`,
            explanation: "4 parameter signature mandatory hai — 3 se error handler nahi baneg. next parameter include karo even if use nahi karte. AppError instanceof check se operational vs programming errors alag hote hain. ZodError instanceof check karo Zod validation errors ke liye — 422 return karo with field-level details.",
          }}
          realWorldScenario="Node.js production app mein uncaughtException aur unhandledRejection bhi handle karo: process.on('uncaughtException', err => { logger.error(err); process.exit(1) }). Process manager (PM2) restart karta hai. Graceful shutdown implement karo in-flight requests finish hone ke liye."
          commonMistakes={[
            {
              mistake: 'Error handler app.use() se pehle register karna',
              why: 'Express middleware order mein kaam karta hai — error handler routes ke baad aata hai taaki routes ke errors catch ho sakein.',
              fix: 'Error handler hamesha last: routes define karo → 404 handler → error handler. Ye fixed order hai Express applications mein.',
            },
            {
              mistake: 'next() error handler mein call karna',
              why: 'Agar error handler mein next() call kiya toh Express default error handler call karta hai — HTML error page return karta hai — API ke liye wrong.',
              fix: 'Error handler mein response send karo aur return karo — next() mat karo. Agar unhandled case ho toh next(err) call karo lekin ye usually loop create karta hai.',
            },
          ]}
          proTip="http-errors package use karo: import createError from 'http-errors'; throw createError(404, 'User not found'). Ye HTTP standard error objects create karta hai — statusCode, message sab built-in. Express se seamlessly integrate hota hai."
        />
      </div>

      <div id="validation">
        <ConceptCard
          title="Request Validation — Zod Schema Validation"
          emoji="✅"
          difficulty="intermediate"
          whatIsIt="Request validation ensure karta hai ki incoming data expected format mein hai — type check, required fields, string length, regex patterns. Zod TypeScript-first validation library hai — schema define karo, parse karo, type inference automatic milti hai. Validated data type-safe hoti hai."
          whenToUse={[
            'POST/PUT/PATCH request body validate karna',
            'Query parameters validate karna — page number, filters',
            'Route parameters validate karna — UUID format check',
            'Environment variables validate karna — startup validation',
          ]}
          whyUseIt="Bina validation ke — client galat data bheje, database mein garbage jaata hai, cryptic errors aate hain. Zod se: early rejection with clear error messages, type-safe data, automatic TypeScript types. Never trust client data — validate everything."
          howToUse={{
            filename: 'validation.ts',
            language: 'typescript',
            code: `import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'

// Schemas
const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  age: z.number().int().min(18).max(120).optional(),
  role: z.enum(['user', 'admin']).default('user'),
})

const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),  // coerce: string → number
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.enum(['name', 'email', 'createdAt']).optional(),
})

// TypeScript types auto-derived
type CreateUserInput = z.infer<typeof createUserSchema>  // { name: string; email: string; ... }

// Validation middleware factory
function validateBody<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(422).json({
        error: 'VALIDATION_ERROR',
        errors: result.error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      })
    }
    req.body = result.data  // Parsed and coerced data replace karo
    next()
  }
}

function validateQuery<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query)
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues })
    }
    req.query = result.data as Record<string, string>
    next()
  }
}

// Usage in routes
router.post('/users',
  validateBody(createUserSchema),
  async (req: Request<object, object, CreateUserInput>, res: Response) => {
    // req.body is fully typed and validated
    const user = await db.user.create({ data: req.body })
    res.status(201).json({ data: user })
  }
)

router.get('/users', validateQuery(paginationSchema), async (req, res) => {
  const { page, limit, sort } = paginationSchema.parse(req.query)
  // ...
})`,
            explanation: "z.coerce.number() string ko number mein convert karta hai — query params hamesha strings hoti hain. safeParse error throw nahi karta — { success: true, data } ya { success: false, error } return karta hai. z.infer<typeof schema> TypeScript type extract karta hai — DRY principle.",
          }}
          realWorldScenario="Financial transaction API — amount z.number().positive().multipleOf(0.01) (valid currency), currency z.enum(['INR', 'USD', 'EUR']), description z.string().max(500). Bina validation INR 50000.999 jaisi values ya SQL injection strings aa sakti hain."
          commonMistakes={[
            {
              mistake: 'parse() use karna safeParse() ki jagah middleware mein',
              why: 'parse() validation fail hone par throw karta hai — try-catch ke bina unhandled error, Express crash.',
              fix: 'safeParse() use karo middleware mein — no throw, structured result. parse() use karo jab sure ho data valid hai (internal use).',
            },
            {
              mistake: 'Deeply nested objects ke liye flat validation',
              why: 'Nested fields validate nahi hoti — { user: { profile: { name: "..." } } } mein profile.name nahi validate hua.',
              fix: 'Zod nested schemas support karta hai: z.object({ user: z.object({ profile: z.object({ name: z.string() }) }) }).',
            },
          ]}
          proTip="Zod aur TypeScript perfect saath kaam karte hain — database schema (Prisma) se Zod schema automatically generate karo: zod-prisma-types ya prisma-zod-generator. Ek source of truth — Prisma schema se TypeScript types aur Zod validation dono generate hoti hain."
        />
      </div>

      <div id="production-patterns">
        <ConceptCard
          title="Production Patterns — Security, Rate Limiting"
          emoji="🛡️"
          difficulty="intermediate"
          whatIsIt="Production Express app ke liye essential middleware: helmet (security headers), cors (cross-origin), express-rate-limit (DoS protection), compression (gzip). Ye sab app.use() se globally apply hote hain — har request pe automatically lagta hai. 5 lines of code, dramatically better security aur performance."
          whenToUse={[
            'Every production Express app mein — no exceptions',
            'API endpoints jo public internet pe hain',
            'Sensitive data serve karne wali APIs',
            'High traffic applications jahan DoS concern ho',
          ]}
          whyUseIt="Bina security headers ke — clickjacking, MIME sniffing, XSS attacks possible hain. Bina rate limiting ke — API hammering, credential stuffing attacks. Bina compression ke — bandwidth waste, slow responses. Ye middleware production minimum viable security deta hai."
          howToUse={{
            filename: 'production-app.ts',
            language: 'typescript',
            code: `import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import compression from 'compression'

const app = express()

// 1. Security headers — OWASP recommended
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],  // Adjust for your needs
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true },
}))

// 2. CORS — which origins can call your API
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://myapp.com', 'https://www.myapp.com']
    : true,  // Development mein all origins
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Cookies allow karo
}))

// 3. Rate limiting — DoS protection
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes window
  max: 100,                    // 100 requests per window
  standardHeaders: true,       // X-RateLimit-* headers
  legacyHeaders: false,
  message: { error: 'Too many requests, retry after 15 minutes' },
})

// Strict limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,   // 1 hour window
  max: 10,                     // 10 login attempts per hour
})

app.use('/api', limiter)
app.use('/api/auth', authLimiter)

// 4. Compression — gzip responses
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false
    return compression.filter(req, res)
  },
  level: 6,  // 1-9, 6 is good balance
}))

// 5. Body parsing with limits
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))`,
            explanation: "helmet() 15+ security headers set karta hai — X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, etc. cors() preflight OPTIONS requests handle karta hai automatically. Rate limit windowMs aur max tune karo use case ke hisaab se — auth endpoints strict rakhna. compression JSON, text compress karta hai — images nahi (already compressed).",
          }}
          realWorldScenario="Production Node.js API launch — helmet se security score A+ milta hai securityheaders.com par. Rate limiting se credential stuffing attack prevent hua — 1000 login attempts 1 hour mein sirf 10 allowed. Compression se API response size 70% kam — CDN bandwidth bill kam."
          commonMistakes={[
            {
              mistake: 'CORS mein origin: * production mein use karna',
              why: 'Har website tumhara API call kar sakti hai — CSRF attacks, unauthorized access. Credentials ke saath * allowed bhi nahi hai.',
              fix: 'Production mein specific origins list karo: origin: ["https://myapp.com"]. Development mein true ya array use karo.',
            },
            {
              mistake: 'Rate limiting sirf IP se karna',
              why: 'Attacker shared IP (corporate NAT, school network) se attack kare toh innocent users bhi block ho jaate hain.',
              fix: 'User ID se bhi rate limit karo authenticated endpoints par: keyGenerator: (req) => req.userId ?? req.ip. Per-user limits more fair hain.',
            },
          ]}
          proTip={'express-slow-down bhi use karo — rate limit ke saath gradually slow karo requests: speedLimiter = slowDown({ windowMs: 15 * 60 * 1000, delayAfter: 50, delayMs: 500 }). 50th request ke baad har additional request 500ms delay milti hai. Legitimate users slow down feel karte hain, bots frustrated ho jaate hain.'}
        />
      </div>
    </div>
  )
}
