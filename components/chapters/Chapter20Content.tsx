'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const securityQuiz = [
  {
    question: 'SQL injection se bachaav ka sabse reliable tarika kya hai?',
    options: [
      { text: 'User input sanitize karo manually', correct: false, explanation: 'Manual sanitization miss ho sakti hai — parameterized queries zyada reliable hain.' },
      { text: 'Parameterized queries ya prepared statements use karo', correct: true, explanation: 'Bilkul sahi! Parameterized queries mein user input kabhi SQL code nahi banta — engine alag se process karta hai.' },
      { text: 'HTTPS use karo', correct: false, explanation: 'HTTPS encryption deta hai, SQL injection se nahi bachata.' },
      { text: 'Database ko internet se disconnect karo', correct: false, explanation: 'Database ko application se accessible rehna chahiye — ye practical solution nahi hai.' },
    ],
  },
  {
    question: 'helmet.js kya karta hai Express app mein?',
    options: [
      { text: 'HTTPS enforce karta hai', correct: false, explanation: 'Helmet HTTPS enforce nahi karta — sirf HTTP headers set karta hai.' },
      { text: 'Dangerous HTTP headers hatata hai aur secure headers add karta hai', correct: true, explanation: 'Correct! Helmet X-Powered-By hatata hai, Content-Security-Policy, HSTS, X-Frame-Options add karta hai.' },
      { text: 'Passwords hash karta hai', correct: false, explanation: 'Passwords ke liye bcrypt ya argon2 use karo — helmet headers manage karta hai.' },
      { text: 'Rate limiting implement karta hai', correct: false, explanation: 'Rate limiting ke liye express-rate-limit use karo.' },
    ],
  },
  {
    question: 'Secrets production mein store karne ka sahi tarika kya hai?',
    options: [
      { text: 'config.json file mein — easy access ke liye', correct: false, explanation: 'Config files accidentally commit ho jaate hain — secrets kabhi files mein mat rakho.' },
      { text: 'Environment variables mein — .env production mein nahi, secret manager se inject karo', correct: true, explanation: 'Sahi! .env sirf local development ke liye. Production mein AWS Secrets Manager, Vault, ya platform env vars use karo.' },
      { text: 'Database mein plaintext', correct: false, explanation: 'Database breach hone par sab secrets expose ho jaayenge.' },
      { text: 'Code mein hardcode karo — easy hai', correct: false, explanation: 'Hardcoded secrets version control mein jaate hain — kabhi nahi!' },
    ],
  },
  {
    question: 'Rate limiting kyun zaroori hai?',
    options: [
      { text: 'Sirf premium users ke liye access restrict karne ke liye', correct: false, explanation: 'Rate limiting security feature hai, business feature nahi (primarily).' },
      { text: 'Brute force attacks, DDoS, aur API abuse se bachaav ke liye', correct: true, explanation: 'Bilkul sahi! Bina rate limiting ke koi bhi unlimited requests kar sakta hai — brute force login, DDoS, scraping.' },
      { text: 'Database connections save karne ke liye', correct: false, explanation: 'Rate limiting primary purpose security hai, resource optimization secondary benefit hai.' },
      { text: 'HTTPS ke saath optional hai', correct: false, explanation: 'Rate limiting HTTPS ke saath bhi necessary hai — different threats se protect karta hai.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Chapter20Content() {
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
          Security — App ko Hacker-Proof Banao
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Security afterthought nahi hai — <strong className="text-[#F5F5F7]">pehle din se sochna padta hai</strong>. Ek bhi vulnerability se data breach ho sakta hai, users ka trust toot sakta hai, aur company ki reputation destroy ho sakti hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein OWASP Top 10, input validation, HTTP security headers, rate limiting, aur secrets management cover karenge — practical code ke saath.
        </p>
      </div>

      {/* ConceptCard 1: OWASP */}
      <div id="owasp">
        <ConceptCard
          title="OWASP Top 10 for Node.js"
          emoji="🛡️"
          difficulty="advanced"
          whatIsIt="OWASP (Open Web Application Security Project) Top 10 sabse common aur dangerous web vulnerabilities ki list hai. Node.js apps mein injection, broken auth, XSS, CSRF, aur insecure dependencies sabse common hain."
          whenToUse={[
            'New project start karte waqt — security checklist ke roop mein',
            'Security audit karte waqt — ye list use karo',
            'Code review mein — in vulnerabilities dhundo',
            'Team training ke liye — security awareness',
          ]}
          whyUseIt="OWASP Top 10 industry standard reference hai — insurance companies, compliance teams, aur security auditors ye expect karte hain ki developers ye jaante hain. In vulnerabilities fix karne se majority of real-world attacks se bachaav hota hai."
          howToUse={{
            filename: 'owasp-overview.md',
            language: 'markdown',
            code: `# OWASP Top 10 — Node.js Context

## A01: Broken Access Control
- Problem: Users dusre users ka data access kar lete hain
- Fix: Authorization har route par, not just login check
- Example: /users/:id — check karo ki logged-in user hi apna data dekhe

## A02: Cryptographic Failures
- Problem: Sensitive data unencrypted, weak algorithms (MD5, SHA1)
- Fix: bcrypt/argon2 for passwords, TLS for transport, AES-256 for data
- Example: Passwords hamesha hash karo — never plaintext

## A03: Injection (SQL, NoSQL, Command)
- Problem: User input directly query mein — attacker SQL run karta hai
- Fix: Parameterized queries, never string concatenation
- Example: db.query("SELECT * WHERE id = ?", [userId])

## A05: Security Misconfiguration
- Problem: Default credentials, verbose error messages, debug mode production mein
- Fix: Error messages generic rakho, debug off, helmet.js use karo
- Example: stack traces users ko mat dikhao

## A07: XSS (Cross-Site Scripting)
- Problem: User input HTML mein render hota hai — malicious script inject
- Fix: Output encode karo, Content-Security-Policy header
- Example: DOMPurify use karo, innerHTML avoid karo

## A09: Security Logging Failures
- Problem: Attacks log nahi hote — breach detection impossible
- Fix: Auth events log karo, failed logins, rate limit hits
- Example: Failed login attempt: user@example.com, IP: 1.2.3.4`,
            explanation: 'OWASP Top 10 2021 list hai — regularly update hoti hai. Har vulnerability ke liye OWASP website par detailed guidance milti hai including code examples aur testing techniques.',
          }}
          realWorldScenario="Ek startup ka Node.js backend OWASP A01 (Broken Access Control) se vulnerable tha — /api/orders/:id mein authorization check nahi tha. Koi bhi user kisi bhi user ke orders dekh sakta tha sirf ID guess karke. Security audit mein pakda gaya before breach. Fix: isAuthorized(req.user, order) check add kiya."
          commonMistakes={[
            {
              mistake: 'Authentication aur authorization ko ek samajhna',
              why: 'Authentication = "koi hai" (login). Authorization = "allowed hai" (permissions). Dono alag checks hain.',
              fix: 'Har route par dono check karo. Login sirf pehla step hai — role/permission check alag middleware mein karo.',
            },
            {
              mistake: 'Verbose error messages production mein dikhana',
              why: 'Stack traces, file paths, aur DB error messages attackers ko valuable information dete hain.',
              fix: 'Production mein generic error messages: "Something went wrong". Detailed errors sirf logs mein. NODE_ENV check karo.',
            },
          ]}
          proTip="npm audit se dependencies ki known vulnerabilities check karo. npm audit fix se auto-fix karo. Snyk ya Dependabot se automated PR alerts milte hain jab vulnerability discover ho."
        />
      </div>

      {/* ConceptCard 2: Input Validation */}
      <div id="input-validation">
        <ConceptCard
          title="Input Validation — Never Trust User Input"
          emoji="🔒"
          difficulty="advanced"
          whatIsIt="Input validation matlab har user input ko validate karna — format, type, length, allowed values. Zod ya Joi se schema-based validation karo. SQL injection, XSS, aur business logic attacks input validation se roko."
          whenToUse={[
            'Har API endpoint par — request body, query params, headers',
            'Database mein kuch save karne se pehle',
            'External API ko data bhejne se pehle',
            'File upload — type aur size validation',
          ]}
          whyUseIt="User input kabhi trust mat karo — Postman se koi bhi request bhej sakta hai. Frontend validation sirf UX ke liye hai — backend mein hamesha re-validate karo. Zod TypeScript ke saath perfectly integrate karta hai — type inference bhi milti hai automatically."
          howToUse={{
            filename: 'validation-with-zod.ts',
            language: 'typescript',
            code: `import { z } from 'zod'
import express from 'express'

const app = express()
app.use(express.json())

// ── Schema Define Karo ──────────────────────────────────────────────────────
const CreateUserSchema = z.object({
  email: z.string().email('Valid email chahiye'),
  password: z
    .string()
    .min(8, 'Password minimum 8 characters ka hona chahiye')
    .regex(/[A-Z]/, 'Ek capital letter chahiye')
    .regex(/[0-9]/, 'Ek number chahiye'),
  name: z.string().min(2).max(100).trim(),
  age: z.number().int().min(13).max(120).optional(),
  role: z.enum(['user', 'admin']).default('user'),
})

type CreateUserInput = z.infer<typeof CreateUserSchema>

// ── Middleware: Validation ──────────────────────────────────────────────────
function validateBody<T>(schema: z.ZodSchema<T>) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.flatten().fieldErrors,
      })
    }
    req.body = result.data // Parsed & sanitized data
    next()
  }
}

// ── Route ──────────────────────────────────────────────────────────────────
app.post('/users', validateBody(CreateUserSchema), async (req, res) => {
  const user: CreateUserInput = req.body // TypeScript knows the type!

  // SQL injection safe — parameterized query
  await db.query(
    'INSERT INTO users (email, password, name) VALUES ($1, $2, $3)',
    [user.email, await hashPassword(user.password), user.name]
  )

  res.status(201).json({ message: 'User created' })
})`,
            explanation: 'Zod schema mein transform, refine, aur custom validators use karo complex validation ke liye. safeParse error throw nahi karta — result check karo. Type inference automatically milti hai — z.infer<typeof Schema>.',
          }}
          realWorldScenario="Fintech app mein amount field mein string bheji ja sakti thi — '1e10' jaisi scientific notation se ₹10 billion transfer attempt. Zod schema ne z.number().positive().max(1000000) se block kiya. Production mein 50+ such attempts per day aate hain — sab blocked."
          commonMistakes={[
            {
              mistake: 'Sirf frontend validation — backend mein nahi',
              why: 'Browser tools se frontend validation bypass karna trivial hai. Backend validation mandatory hai.',
              fix: 'Backend par Zod/Joi se validate karo hamesha. Frontend validation sirf UX improvement hai.',
            },
            {
              mistake: 'Error messages mein sensitive info leak karna',
              why: '"Email test@test.com already exists" — user enumeration vulnerability. Attacker valid emails discover kar sakta hai.',
              fix: 'Generic error messages: "Invalid credentials" instead of "Password incorrect". Account existence mat reveal karo.',
            },
          ]}
          proTip="Zod .transform() se input normalize karo — .email().toLowerCase() se emails consistent rahengi. .strip() se unknown keys remove karo automatically — extra fields silently ignore hote hain, code safe rehta hai."
        />
      </div>

      {/* ConceptCard 3: HTTP Security Headers */}
      <div id="http-headers">
        <ConceptCard
          title="HTTP Security Headers — Helmet.js"
          emoji="⛑️"
          difficulty="advanced"
          whatIsIt="HTTP security headers browser ko bataate hain ki app kaise behave kare — kaun si resources load kare, kahan embed ho sake, HTTPS enforce karo. Helmet.js Express middleware hai jo sab important headers automatically set karta hai."
          whenToUse={[
            'Har Express app mein — pehla middleware add karo',
            'XSS attacks rokne ke liye — Content-Security-Policy',
            'Clickjacking rokne ke liye — X-Frame-Options',
            'HTTPS enforce karne ke liye — HSTS',
          ]}
          whyUseIt="Bina security headers ke app browser-level attacks ke liye vulnerable hai. Helmet.js ek line mein 14+ security improvements deta hai. CSP XSS ka most powerful defense hai — browser unauthorized scripts execute hi nahi karta."
          howToUse={{
            filename: 'security-headers.ts',
            language: 'typescript',
            code: `import express from 'express'
import helmet from 'helmet'

const app = express()

// ── Basic Helmet (sab defaults on) ─────────────────────────────────────────
app.use(helmet())

// ── Custom Configuration ───────────────────────────────────────────────────
app.use(
  helmet({
    // Content Security Policy — XSS ka sabse powerful defense
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],               // Sirf same origin
        scriptSrc: ["'self'", 'cdn.example.com'], // Allowed script sources
        styleSrc: ["'self'", "'unsafe-inline'"],  // CSS inline allow (adjust as needed)
        imgSrc: ["'self'", 'data:', 'https:'],    // Images
        connectSrc: ["'self'", 'api.example.com'], // API calls
        fontSrc: ["'self'", 'fonts.googleapis.com'],
        objectSrc: ["'none'"],                // Flash etc. block
        upgradeInsecureRequests: [],          // HTTP → HTTPS auto-upgrade
      },
    },

    // HTTP Strict Transport Security — HTTPS force karo
    hsts: {
      maxAge: 31536000,        // 1 year
      includeSubDomains: true,
      preload: true,
    },

    // Clickjacking defense
    frameguard: { action: 'sameorigin' },

    // MIME type sniffing rokna
    noSniff: true,

    // X-Powered-By header hatao — tech stack expose mat karo
    hidePoweredBy: true,

    // Referrer policy
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
)

// ── CORS (Cross-Origin Resource Sharing) ──────────────────────────────────
import cors from 'cors'

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') ?? ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))`,
            explanation: 'Helmet() pehla middleware hona chahiye — baaki middleware se pehle. CSP sabse complex lekin sabse powerful hai. CSP Report-Only mode se pehle test karo: reportOnly: true — violations report hoti hain, block nahi hoti.',
          }}
          realWorldScenario="Ek banking app mein CSP nahi thi. Attacker ne XSS vulnerability use karke malicious script inject ki jo session tokens steal kar rahi thi. Post-incident CSP add ki — ab browser unauthorized scripts execute hi nahi karta regardless of XSS vulnerability."
          commonMistakes={[
            {
              mistake: "CSP mein 'unsafe-inline' aur 'unsafe-eval' use karna",
              why: "Ye directives CSP ki effectiveness severely limit karte hain — inline scripts aur eval() allow ho jaate hain jo XSS attack vector hain.",
              fix: 'nonces ya hashes use karo specific inline scripts ke liye. Inline code baahar JavaScript files mein move karo.',
            },
            {
              mistake: 'Helmet ke baad CORS middleware lagana galat order mein',
              why: 'Order matters — Helmet headers set karta hai jo CORS headers ko override kar sakta hai wrong order mein.',
              fix: 'Helmet → CORS → other middleware order rakho. Ya app.use(cors()) pehle lagao specific routes par.',
            },
          ]}
          proTip="securityheaders.com par apna URL daalo — free security grade milta hai. A+ grade ke liye Helmet ke saath Permissions-Policy header bhi add karo. Report-URI ya report-to directive se CSP violations monitor karo production mein."
        />
      </div>

      {/* ConceptCard 4: Rate Limiting */}
      <div id="rate-limiting">
        <ConceptCard
          title="Rate Limiting & DDoS Protection"
          emoji="🚦"
          difficulty="advanced"
          whatIsIt="Rate limiting matlab ek IP ya user se ek time period mein kitni requests allow karni hain. express-rate-limit se easily implement karo. Brute force attacks, DDoS, aur API abuse se bachaao."
          whenToUse={[
            'Login endpoint — brute force password guessing rokna',
            'OTP/verification endpoints — SMS/email abuse rokna',
            'Public APIs — fair use enforce karna',
            'Registration — spam account creation rokna',
          ]}
          whyUseIt="Bina rate limiting ke koi bhi bot unlimited requests kar sakta hai — login brute force, SMS spam, server overload. express-rate-limit simple aur effective hai. Production mein Redis store use karo distributed rate limiting ke liye."
          howToUse={{
            filename: 'rate-limiting.ts',
            language: 'typescript',
            code: `import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import { createClient } from 'redis'

const redis = createClient({ url: process.env.REDIS_URL })

// ── General API Rate Limit ──────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 15 min mein 100 requests per IP
  standardHeaders: true,     // RateLimit-* headers bhejo
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please try after 15 minutes.',
  },
})

// ── Strict Login Rate Limit ──────────────────────────────────────────────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Sirf 5 login attempts per 15 min
  skipSuccessfulRequests: true, // Successful login count nahi karo
  message: {
    error: 'Too many login attempts. Account temporarily locked.',
  },
  // Redis store — distributed environment ke liye
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.sendCommand(args),
  }),
})

// ── Apply to Routes ─────────────────────────────────────────────────────────
app.use('/api', apiLimiter)              // All API routes
app.post('/auth/login', loginLimiter)   // Login specifically
app.post('/auth/forgot-password', rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 forgot password requests per hour
}))

// ── IP-based Blocking (aggressive attackers) ────────────────────────────────
const blockedIPs = new Set<string>()

app.use((req, res, next) => {
  const ip = req.ip
  if (blockedIPs.has(ip!)) {
    return res.status(403).json({ error: 'Blocked' })
  }
  next()
})`,
            explanation: 'Redis store use karo production mein — multiple Node instances ek rate limit counter share karte hain. skipSuccessfulRequests: true se legitimate users penalize nahi hote. standardHeaders: true se Retry-After header automatically set hota hai.',
          }}
          realWorldScenario="Login endpoint par daily 50K brute force attempts aa rahe the — bot network. Rate limiting add kiya: 5 attempts per 15 minutes per IP. Attack completely stopped. Bonus: Redis se distributed rate limiting — 4 Node instances ek counter share karte hain, bypass impossible."
          commonMistakes={[
            {
              mistake: 'In-memory rate limit store distributed environment mein',
              why: 'Har Node instance apna counter rakhta hai — 4 instances hain toh 4x requests allowed ho jaate hain. Rate limit bypass ho jaata hai.',
              fix: 'Redis store use karo production mein — sab instances ek counter share karte hain. rate-limit-redis package use karo.',
            },
            {
              mistake: 'Too aggressive rate limiting — legitimate users block karna',
              why: 'Agar limit bahut kam hai toh real users frustrated hote hain — false positives.',
              fix: 'Analytics se actual usage patterns dekho. Authenticated users ke liye zyada limit. IP se zyada user ID par rate limit karo.',
            },
          ]}
          proTip="Cloudflare ya similar CDN use karo first line of defense ke liye — DDoS attacks ka majority absorb karo server tak pehunche bina. Application-level rate limiting second layer hai. Bot detection: honeypot fields, CAPTCHA for suspicious patterns."
        />
      </div>

      {/* ConceptCard 5: Secrets Management */}
      <div id="secrets">
        <ConceptCard
          title="Secrets Management"
          emoji="🔑"
          difficulty="advanced"
          whatIsIt="Secrets (API keys, database passwords, JWT secrets) ko securely manage karna zaroori hai. Environment variables use karo, .env files git mein commit mat karo, aur production mein secret manager use karo."
          whenToUse={[
            'Database credentials — never hardcode',
            'Third-party API keys — OpenAI, Stripe, Twilio',
            'JWT secrets — rotate regularly',
            'Encryption keys — AES keys, private keys',
          ]}
          whyUseIt="GitHub par publicly committed API key wala incident common hai — bots continuously scan GitHub for secrets. Ek exposed key se billing fraud, data breach, aur account takeover ho sakta hai. Secret management basic hygiene hai."
          howToUse={{
            filename: 'secrets-management.ts',
            language: 'typescript',
            code: `// ── .env file (SIRF LOCAL DEVELOPMENT) ────────────────────────────────────
// .env
// DATABASE_URL=postgresql://user:pass@localhost/db
// JWT_SECRET=local-dev-secret-only

// .gitignore mein:
// .env
// .env.*
// !.env.example  ← Example file commit karo

// ── .env.example (commit karo — no real values) ────────────────────────────
// .env.example
// DATABASE_URL=postgresql://user:password@host/dbname
// JWT_SECRET=your-jwt-secret-here
// OPENAI_API_KEY=sk-your-key-here

// ── Zod se environment validation ──────────────────────────────────────────
import { z } from 'zod'

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32, 'JWT secret at least 32 chars hona chahiye'),
  OPENAI_API_KEY: z.string().startsWith('sk-'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
})

// App start par validate karo — missing secrets immediately fail
const env = EnvSchema.parse(process.env)
export default env

// Usage: env.DATABASE_URL — type-safe!

// ── AWS Secrets Manager (production) ────────────────────────────────────────
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'

const secretsClient = new SecretsManagerClient({ region: 'ap-south-1' })

async function getSecret(secretName: string): Promise<Record<string, string>> {
  const response = await secretsClient.send(
    new GetSecretValueCommand({ SecretId: secretName })
  )
  return JSON.parse(response.SecretString ?? '{}')
}

// Startup par fetch karo
const dbSecret = await getSecret('prod/myapp/database')
const db = new Pool({ connectionString: dbSecret.connectionString })`,
            explanation: 'App startup par environment validate karo — missing required secrets pe immediately crash karo with clear error. Production mein AWS Secrets Manager, GCP Secret Manager, ya HashiCorp Vault use karo. Secrets rotate karo regularly.',
          }}
          realWorldScenario="Developer ne accidentally .env file GitHub push kar di jisme live Stripe API key thi. 30 minutes mein kisi ne $5000 worth of charges kiye. Lesson: .gitignore mein .env add karo, git-secrets tool use karo pre-commit hook se, aur compromised keys immediately rotate karo."
          commonMistakes={[
            {
              mistake: '.env file git mein commit karna',
              why: 'Public repo mein secrets expose ho jaate hain. Private repo mein bhi team ka har member aur future employee access kar sakta hai.',
              fix: '.gitignore mein .env add karo. git-secrets ya detect-secrets pre-commit hook lagao. Already committed? git history se remove karo aur keys rotate karo.',
            },
            {
              mistake: 'Logs mein secrets print karna',
              why: 'console.log(process.env) — sab environment variables logs mein jaate hain. Log aggregation services par visible hote hain.',
              fix: 'Kabhi process.env ya request headers seedha log mat karo. Secrets wali keys explicitly filter karo logging middleware mein.',
            },
          ]}
          proTip="doppler.com ya 1Password Secrets Automation use karo — team ke saath secrets securely share karo bina .env files bheje. Automated secret rotation setup karo — JWT secrets har 90 days mein rotate karo. Secrets ka audit log rakho — kab kise ne kya access kiya."
        />
      </div>

      {/* Diff Block: Vulnerable vs Secured */}
      <div
        id="vulnerable-vs-secured"
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(239,68,68,0.04)',
          border: '1px solid rgba(239,68,68,0.2)',
        }}
      >
        <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-4">
          Vulnerable Code vs Secured Code
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="rounded-xl p-4"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
          >
            <p className="text-xs font-bold text-[#EF4444] uppercase tracking-wide mb-3">Vulnerable</p>
            <pre className="text-xs text-[#FCA5A5] font-mono overflow-x-auto leading-relaxed">
              <code>{`// SQL Injection ❌
const id = req.params.id
const user = await db.query(
  \`SELECT * FROM users WHERE id = \${id}\`
  // Input: "1 OR 1=1" — all users!
)

// XSS ❌
app.get('/search', (req, res) => {
  const q = req.query.q
  res.send(\`<p>Results for \${q}</p>\`)
  // Input: <script>alert(1)</script>
})`}</code>
            </pre>
          </div>
          <div
            className="rounded-xl p-4"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}
          >
            <p className="text-xs font-bold text-[#10B981] uppercase tracking-wide mb-3">Secured</p>
            <pre className="text-xs text-[#6EE7B7] font-mono overflow-x-auto leading-relaxed">
              <code>{`// SQL Injection Fixed ✅
const id = req.params.id
const user = await db.query(
  'SELECT * FROM users WHERE id = $1',
  [id] // Parameterized!
)

// XSS Fixed ✅
import DOMPurify from 'isomorphic-dompurify'
app.get('/search', (req, res) => {
  const q = DOMPurify.sanitize(req.query.q)
  res.send(\`<p>Results for \${q}</p>\`)
  // + helmet() CSP header
})`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 20 Quiz — Security Check
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — OWASP, validation, headers, secrets test karo!
          </p>
        </div>
        <QuizSection questions={securityQuiz} chapterSlug="security" />
      </div>
    </div>
  )
}
