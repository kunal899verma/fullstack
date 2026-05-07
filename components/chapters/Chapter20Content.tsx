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

// ── Chapter Diagram ───────────────────────────────────────────────────────────

function SecurityLayersDiagram() {
  const layers = [
    { label: 'Input Validation', sublabel: 'Zod schemas — never trust user input', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: '🔍' },
    { label: 'Auth & AuthZ', sublabel: 'JWT verify + role/permission checks per route', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', icon: '🔐' },
    { label: 'Rate Limiting', sublabel: 'express-rate-limit + Redis — block brute force', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '🚦' },
    { label: 'HTTPS / TLS', sublabel: 'Helmet.js + HSTS — encrypt in transit', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: '🔒' },
    { label: 'Secrets Management', sublabel: 'Env vars + AWS Secrets Manager — no hardcoding', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', icon: '🔑' },
    { label: 'Monitoring', sublabel: 'Structured logs + alerts — detect attacks live', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '📊' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Defense in Depth — Security Layers</p>
      <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
        {layers.map((layer, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: layer.bg, border: `1px solid ${layer.border}` }}>
            <span className="text-2xl mb-2 block">{layer.icon}</span>
            <p className="font-bold text-sm" style={{ color: layer.color }}>{layer.label}</p>
            <p className="text-xs text-[#71717A] mt-1">{layer.sublabel}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

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
          Security — Tumhara App Abhi Vulnerable Hai!
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          OWASP Top 10 — ye sirf ek list nahi, <strong className="text-[#F5F5F7]">ye tumhara dushman hai jo tumhare app mein ghusa hua hai right now!</strong> Ek bhi route par authorization check nahi? SQL injection possible hai? .env git mein? Hacker ko invite diya hai ghar mein. Security afterthought nahi hai — pehle din ka kaam hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Socho ek bank ki tarah — front door par lock toh hai, lekin ek khidki khuli rahi aur chor ghus gaya. App mein bhi aisa hota hai. Ek missing check, ek hardcoded secret, ek unvalidated input — kaafi hai poora system compromise karne ke liye. Is chapter mein OWASP Top 10, Zod validation, Helmet headers, rate limiting, aur secrets management — production-ready security ki complete shield banayenge.
        </p>
      </div>

      <SecurityLayersDiagram />

      {/* ConceptCard 1: OWASP */}
      <div id="owasp">
        <ConceptCard
          title="OWASP Top 10 for Node.js"
          emoji="🛡️"
          difficulty="advanced"
          whatIsIt="OWASP (Open Web Application Security Project) ek world-renowned organization hai jo regularly duniya ke sabse dangerous web vulnerabilities ki list publish karta hai. Ye list real breaches ke data se banti hai. Node.js apps mein Injection (SQL/NoSQL/Command), Broken Access Control, XSS, Cryptographic Failures, aur Security Misconfiguration sabse common killians hain. Ye list ratta maar lo — ye aapke app ki security checklist hai."
          whenToUse={[
            'Naya project start karo — pehle din OWASP checklist haath mein lo',
            'Security audit conduct karo — har item systematically check karo',
            'Code review mein — in specific patterns ko actively dhundo',
            'Team ko train karo — har developer ko ye 10 vulnerabilities pata honi chahiye',
          ]}
          whyUseIt="Real numbers sunno: 2023 mein data breaches ki average cost $4.45 million thi. Majority of breaches OWASP Top 10 mein listed vulnerabilities se hote hain. Matlab — agar sirf ye 10 cheezein theek kar lo toh majority attacks rokh sakte ho. Ye koi theory nahi — ye practical, battle-tested knowledge hai jo real companies ke real breaches se nikla hai."
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
            explanation: 'OWASP Top 10 2021 list hai — regularly update hoti hai real-world threat landscape ke hisaab se. Note karo: ye sirf list hai, detail OWASP website par milti hai har vulnerability ke liye. IDOR (Insecure Direct Object Reference) A01 ka common form hai — ID manipulate karo, dusre ka data dekho. Apne API har endpoint par ye question poochho: "kya mujhe is resource ka access hona chahiye?"',
          }}
          realWorldScenario="Ek startup ka Node.js backend A01 Broken Access Control se vulnerable tha — /api/orders/:id mein sirf JWT verify kiya tha, ye check nahi kiya ki logged-in user ka hi order hai ya nahi. Koi bhi user URL mein order ID change karke kisi ka bhi order dekh sakta tha. Security audit mein pakda gaya pehle. Fix: if (order.userId !== req.user.id) return 403. Teen line ka fix. Agar production tak jaata toh regulatory fine, user trust damage, PR nightmare."
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
          proTip="npm audit abhi chalaao — seriously, is tab ko chhodo, terminal kholo, npm audit karo. Koi high severity vulnerabilities mil gayi? npm audit fix karo. Snyk ya GitHub Dependabot add karo — ye automatically PR bhejte hain jab koi dependency mein vulnerability pakdi jaati hai. Security continuous kaam hai, ek baar ka nahi."
        />
      </div>

      {/* Akshay-style Q&A interlude */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <p className="text-[#F5F5F7] font-semibold mb-2">Ab sawaal ye aata hai...</p>
        <p className="text-[#A1A1AA] leading-relaxed">
          "OWASP list padh li, ab kya karu?" Pehla kaam — user input pe trust karna band karo. Jo bhi user bhejta hai — form data, query params, JSON body — sab mein malicious data ho sakta hai. Frontend validation sirf UX ke liye hai, Postman se koi bhi bypass kar sakta hai. Backend par validate karo. Hamesha. Koi exception nahi.
        </p>
      </div>

      {/* ConceptCard 2: Input Validation */}
      <div id="input-validation">
        <ConceptCard
          title="Input Validation — Never Trust User Input"
          emoji="🔒"
          difficulty="advanced"
          whatIsIt="User input ek package hai jo tumhare door par aaya — tum nahi jaante ander kya hai. Bomb bhi ho sakta hai. Input validation matlab har package ko X-ray machine se guzarna — format, type, length, allowed values — before letting it inside. Zod TypeScript-first schema library hai — ek schema likho, validation aur type inference dono milte hain. Ye security aur type safety dono ek saath deta hai."
          whenToUse={[
            'Har API endpoint — body, query params, path params, headers — sab validate karo',
            'Database mein kuch store karne se pehle — garbage in, garbage out',
            'External service ko data bhejne se pehle — unka system bhi vulnerable ho sakta hai',
            'File upload — type check (magic bytes), size limit — JPEG hai ya disguised executable?',
          ]}
          whyUseIt="Ek simple attack: form mein amount field mein '1e10' type karo. JavaScript parseInt('1e10') = 10! Matlab ₹10 bhejo, ₹10 billion transfer. Ya SQL injection — name field mein 'Robert'); DROP TABLE users; -- likho aur poora database gaya. Zod in sab ko schema definition se rok deta hai. z.number().positive().max(1000000) — ek line, bahut badi protection."
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
            explanation: 'Trace karo: request aata hai → validateBody(CreateUserSchema) middleware → schema.safeParse(req.body) → fail? 400 with details → pass? req.body mein clean, typed data. Business logic tak galat data pahuncha hi nahi. Zod transform bhi karta hai — z.string().email().toLowerCase() se emails hamesha lowercase aur valid. Ek schema, multiple purposes.',
          }}
          realWorldScenario="Fintech app mein amount field mein '1e10' (scientific notation for 10 billion) aata tha — JavaScript ne parse kiya, database mein chala gaya. Zod z.number().positive().max(1000000) add kiya — ab scientific notation, negative numbers, strings sab reject. Production mein 50+ such attempts daily aate hain, sab 400 error ke saath block. Ek developer ne schema mein 2 lines add ki, crores ka potential fraud roka."
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
          proTip="Zod .transform() powerful hai — .email().toLowerCase().trim() se emails normalize karo. .strip() se unknown keys automatically remove hoti hain — extra fields silently ignore. Ek aur gem: z.discriminatedUnion() se runtime type guards banao — type: 'user' | 'admin' ke hisaab se alag schemas. Ek schema library se TypeScript type safety aur runtime security dono — ye combination unbeatable hai."
        />
      </div>

      {/* ConceptCard 3: HTTP Security Headers */}
      <div id="http-headers">
        <ConceptCard
          title="HTTP Security Headers — Helmet.js"
          emoji="⛑️"
          difficulty="advanced"
          whatIsIt="HTTP response headers mein tum browser ko instructions de sakte ho — 'sirf ye scripts chalana allowed hai', 'HTTPS par hi chalana', 'kisi iframe mein mat dikhana'. Helmet.js ek Express middleware hai jo ek line mein 14+ security headers set karta hai. Content-Security-Policy (CSP) XSS ka sabse powerful defense hai — malicious script inject ho bhi jaaye toh browser run hi nahi karega."
          whenToUse={[
            'Har Express app mein — app.use(helmet()) pehla middleware hona chahiye, sab se pehle',
            'XSS attacks rokne ke liye — CSP with strict directives',
            'Clickjacking rokne ke liye — X-Frame-Options: SAMEORIGIN',
            'HTTPS force karne ke liye — HSTS header, 1 year max-age',
          ]}
          whyUseIt="Bina headers ke browser ko koi guidance nahi milti. Attacker XSS vulnerability use karta hai, malicious script inject karta hai — browser blindly run karta hai. CSP ke saath — browser sirf allowed origins se scripts run karega. Unauthorized script? Block. Koi error? Block. Ye ek force field hai tumhare app ke around. Helmet ek line mein 14+ such force fields lagata hai."
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
            explanation: 'Step by step: app.use(helmet()) sabse pehle lagao. CSP complex hai? Report-Only mode se shuru karo — reportOnly: true set karo. Sab violations console mein report honge, koi block nahi hoga. Jab sab legitimate scripts allowed hain toh enforcement mode on karo. CSP ek safety net hai — neeche set karo, phir sab check karo ki tum neeche giro nahi.',
          }}
          realWorldScenario="Banking app mein CSP nahi thi — attacker ne comment field mein XSS inject ki, script session tokens chura ke attacker server bhej rahi thi. Users ka paisa gaaya. Post-incident analysis: CSP add ki — defaultSrc: ['self'], scriptSrc: ['self']. Next attack mein injected script run hi nahi hui — browser ne block kar diya. Wahi vulnerability, wahi attacker, zero impact. CSP ek invisible shield hai."
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
          proTip="Abhi securityheaders.com kholo, apna production URL daalo — free grade milega. F ya D? Helmet add karo. A ke liye Permissions-Policy header bhi add karo — camera, microphone, geolocation — sirf wahi allow karo jo zaruri hai. Production mein report-to directive add karo — CSP violations monitor honge, attacker ke probe attacks bhi dikhengi."
        />
      </div>

      {/* ConceptCard 4: Rate Limiting */}
      <div id="rate-limiting">
        <ConceptCard
          title="Rate Limiting & DDoS Protection"
          emoji="🚦"
          difficulty="advanced"
          whatIsIt="Rate limiting ek bouncer hai club ke bahar. '15 minute mein 5 login attempts — iske baad nahi'. Bot unlimited requests kar raha hai? Bouncer rok leta hai. Bina rate limiting ke login endpoint ek open invitation hai brute force ke liye — attacker 10,000 password combinations per second try kar sakta hai. express-rate-limit simple hai, Redis ke saath distributed hai — multiple Node instances ek counter share karte hain."
          whenToUse={[
            'Login endpoint — 5 attempts per 15 minutes, phir lock. Brute force impossible',
            'OTP/SMS endpoints — 3 per hour. Warna SMS spam se tumhara Twilio bill explode',
            'Public APIs — 100 requests per 15 minutes per IP. Fair use enforce karo',
            'Registration — 10 per hour per IP. Spam account creation band',
          ]}
          whyUseIt="Ek real attack: login endpoint par bot 50,000 password attempts daily kar raha tha. Koi rate limiting nahi thi. Pehla toh server load badh gaya, doosra common passwords pe kuch accounts actually crack ho gaaye. Rate limiting add ki: 5 attempts per 15 minutes. Attack completely ruk gaya — bot blocked, legitimate users unaffected. Ek middleware, poora protection."
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
            explanation: 'Important gotcha: default in-memory store use mat karo production mein! 4 Node instances hain? Har instance apna counter rakhega — 4x requests allowed hongi, rate limit bypass ho jaayegi. Redis store use karo — sab instances ek counter share karte hain. skipSuccessfulRequests: true set karo — successful logins count nahi hote, sirf failed attempts count hote hain. Legitimate users ko penalize mat karo.',
          }}
          realWorldScenario="Login endpoint par daily 50K brute force attempts — bot network chal raha tha. Rate limiting add ki: 5 attempts per 15 minutes per IP, Redis store. Bot ka next attack: 5 attempts, phir 429 Too Many Requests, 15 minute wait, phir phir 5. Ek IP se 50K attempts ki jagah ab 5 attempts per 15 min = max 480 attempts per day. Bot effective ban ho gaya. Surprise bonus — server load bhi 40% kam hua."
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
          proTip="Defense in depth — layers mein socho. Cloudflare pehli layer: DDoS absorb karo server tak pahunche bina. Nginx ya AWS WAF doosri layer: IP-level blocking. express-rate-limit teesri layer: application-level fine control. Ek layer fail ho jaaye toh doosri hai. Hackers bhi layers check karte hain — tumhare paas bhi layers honi chahiye."
        />
      </div>

      {/* Akshay-style Q&A interlude */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <p className="text-[#F5F5F7] font-semibold mb-2">Ab sawaal ye aata hai...</p>
        <p className="text-[#A1A1AA] leading-relaxed">
          "App secure hai — Helmet hai, validation hai, rate limiting hai. Ab aur kya?" Ek cheez reh gayi — tumhari secrets. API keys, DB passwords, JWT secrets — agar ye galat jagah hain, sab mehnat bekar hai. GitHub par ek leaked .env file se 30 minute mein $5000 ka fraud ho sakta hai. Ye sirf horror story nahi — ye real incident hai. Chalo secrets ki baat karte hain.
        </p>
      </div>

      {/* ConceptCard 5: Secrets Management */}
      <div id="secrets">
        <ConceptCard
          title="Secrets Management"
          emoji="🔑"
          difficulty="advanced"
          whatIsIt="Secrets — API keys, DB passwords, JWT secrets — ye tumhari digital house keys hain. Kisi ko bhi nahi milni chahiye. Teen golden rules: (1) Kabhi source code mein hardcode mat karo, (2) .env files git mein commit mat karo, (3) Production mein AWS Secrets Manager ya HashiCorp Vault use karo. Environment variables sirf local development ke liye hain — production mein secrets platform se inject hote hain."
          whenToUse={[
            'Database credentials — ek bhi jagah hardcode nahi, koi exception nahi',
            'Third-party API keys — OpenAI, Stripe, Twilio — .env mein local, Secrets Manager mein production',
            'JWT secrets — kam se kam 32 characters, randomly generated, 90 days mein rotate',
            'Encryption keys, private keys, certificates — kabhi version control mein nahi',
          ]}
          whyUseIt="Bots 24/7 GitHub scan karte hain 'OPENAI_API_KEY', 'AWS_SECRET', 'DATABASE_URL' jaisi strings dhundne ke liye. Ek second bhi leaked key live rahi — automated tool ne use kar liya. Ek developer ne accidentally .env push ki — 30 minute mein kisi ne $5000 ka Stripe charges kiya. Ye kalpana nahi, documented incident hai. Secret management life-saving hygiene hai."
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
            explanation: 'Startup par Zod se environment validate karo — EnvSchema.parse(process.env). Missing DATABASE_URL? Immediate crash with clear error: "DATABASE_URL is required". App production mein silently run nahi karega misconfigured. Production mein: platform (Vercel, Railway, Heroku) environment variables use karo, ya AWS Secrets Manager — app startup par fetch karo, phir use karo. Secrets rotate karo regularly, especially after team member leaves.',
          }}
          realWorldScenario="Developer ne accidentally .env file GitHub push ki — live Stripe API key thi. 30 minute mein automated bot ne key use ki, $5000 fraudulent charges. Developer ko pata chala email alert se. Key immediately rotate ki — naya key, purana band. Lesson learned: .gitignore mein .env, git-secrets pre-commit hook jo commit rok de agar secret detected ho, aur every team member ko security training. Sirf ek mistake — $5000 ka lesson."
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
          proTip="Doppler.com — ye tool try karo. Team ke saath secrets securely share hote hain, rotation built-in hai, audit log automatically banta hai. .env files email ya Slack par share karna band karo — ye insecure hai. Aur ek baat: git-secrets install karo globally — har commit pe check karega ki koi secret toh nahi ja raha. Pre-commit hook security ka last line of defense hai."
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
