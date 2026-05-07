'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function JwtFlowDiagram() {
  const phases = [
    {
      phase: '1. Login',
      color: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.3)',
      icon: '🔑',
      steps: [
        { from: 'Client', arrow: '→', to: 'Server', detail: 'POST /login { email, password }' },
        { from: 'Server', arrow: '→', to: 'Client', detail: 'Verify password → sign JWT → return tokens' },
      ],
    },
    {
      phase: '2. Authenticated Request',
      color: '#06B6D4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.3)',
      icon: '🛡️',
      steps: [
        { from: 'Client', arrow: '→', to: 'Server', detail: 'GET /profile  Authorization: Bearer <token>' },
        { from: 'Server', arrow: '→', to: 'Client', detail: 'Verify signature → decode payload → 200 OK' },
      ],
    },
    {
      phase: '3. Token Refresh',
      color: '#7C3AED', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.3)',
      icon: '🔄',
      steps: [
        { from: 'Client', arrow: '→', to: 'Server', detail: 'POST /refresh  { refreshToken }' },
        { from: 'Server', arrow: '→', to: 'Client', detail: 'Verify refresh token → issue new access token' },
      ],
    },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Authentication & JWT — Visual Overview</p>
      <div className="max-w-xl mx-auto space-y-3">
        {phases.map((ph, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: ph.bg, border: `1px solid ${ph.border}` }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{ph.icon}</span>
              <p className="font-bold text-sm" style={{ color: ph.color }}>{ph.phase}</p>
            </div>
            <div className="space-y-1.5 pl-2">
              {ph.steps.map((s, j) => (
                <div key={j} className="flex items-start gap-2">
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[10px] font-bold text-[#71717A]">{s.from}</span>
                    <span className="text-[10px]" style={{ color: ph.color }}>{s.arrow}</span>
                    <span className="text-[10px] font-bold text-[#71717A]">{s.to}</span>
                  </div>
                  <p className="text-[10px] text-[#A1A1AA] font-mono leading-snug">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-[#52525B] text-center mt-3">JWT encodes (not encrypts) — anyone can decode payload, only server can verify signature</p>
    </div>
  )
}

export default function Chapter14Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Authentication & JWT — Secure Auth System Banao
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ruko ek second — bahut log JWT ko "secure encryption" samajhte hain. Ye GALAT hai! JWT encode karta hai, ENCRYPT nahi. Matlab koi bhi tumhara JWT decode karke payload dekh sakta hai. Toh JWT ka kaam kya hai? Ye <strong className="text-[#F5F5F7]">verification</strong> ke liye hai, not <strong className="text-[#F5F5F7]">secrecy</strong>. Aur ye ek fundamental difference hai jo samjhna zaroori hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Authentication (kaun ho tum?) aur Authorization (kya kar sakte ho?) — ye dono security ke pillars hain. Galat implement karna — plaintext passwords, weak tokens, no rate limiting — ye sabse common security vulnerabilities hain. Ek hi baar sahi karo. Is chapter mein sab kuch step-by-step cover karenge.
        </p>
      </div>

      <JwtFlowDiagram />

      <div id="sessions-vs-jwt">
        <ConceptCard
          title="Sessions vs JWT — Stateful vs Stateless"
          emoji="🔑"
          difficulty="intermediate"
          whatIsIt="Socho sessions ek hotel room key ki tarah — hotel (server) ke paas tumhara record hai, key sirf room number hai. Har entry pe hotel apna record check karta hai — stateful. JWT ek alag type ki cheez hai — ek sealed tamper-proof envelope jisme tumhari identity likhi hai. Security ke liye — agar envelope open karo ya content change karo, immediately pata chal jaata hai. Server kuch store nahi karta — stateless. Dono approaches ke trade-offs hain aur dono production mein use hote hain."
          whenToUse={[
            'Session: Monolith apps, instant logout zaroorit, sensitive data server par',
            'JWT: Microservices, horizontal scaling, mobile apps, stateless APIs',
            'JWT: Multiple services ek token accept karein — SSO scenarios',
            'Session: Bank-level security — immediate token invalidation critical',
          ]}
          whyUseIt="Ab sawaal ye aata hai — JWT stateless hai, toh user ko logout kaise karein? JWT expire hone tak valid rehta hai — ek 15 minute token issue kar diya aur user ka account ban kar diya? Woh user 15 minute aur kaam kar sakta hai. Ye JWT ka known limitation hai. Sessions mein instant revocation possible hai — session delete karo, user immediately logged out. Lekin JWT ka fayda: koi bhi server same secret se verify kar sakta hai — horizontal scaling trivial hai. Banking app? Sessions. Social media API? JWT."
          howToUse={{
            filename: 'auth-comparison.ts',
            language: 'typescript',
            code: `// SESSIONS approach
import session from 'express-session'
import RedisStore from 'connect-redis'
import { createClient } from 'redis'

const redisClient = createClient({ url: process.env.REDIS_URL })
await redisClient.connect()

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,          // HTTPS only
    httpOnly: true,         // JS se access nahi
    maxAge: 24 * 60 * 60 * 1000,  // 1 day
    sameSite: 'strict',    // CSRF protection
  },
}))

// Login
app.post('/login', async (req, res) => {
  const user = await validateUser(req.body)
  req.session.userId = user.id  // Server mein store
  res.json({ success: true })
})

// JWT approach — stateless
import jwt from 'jsonwebtoken'

app.post('/login-jwt', async (req, res) => {
  const user = await validateUser(req.body)

  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '15m', algorithm: 'HS256' }
  )

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '7d' }
  )

  // Refresh token httpOnly cookie mein (secure)
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' })
  res.json({ accessToken })
})`,
            explanation: "Under the hood: Session store Redis mein isliye ki in-memory store multiple servers ke beech share nahi hoti — Server A ka session Server B ko nahi pata. JWT short expiry (15 min) ek security decision hai — token stolen bhi ho jaaye, 15 min mein expire. Refresh token (7 days) httpOnly cookie mein — JavaScript XSS attack cookie access nahi kar sakta. Access token memory (JavaScript variable) mein — localStorage avoid karo kyunki third-party scripts bhi localStorage access kar sakte hain.",
          }}
          realWorldScenario="Banking app — user ka account suspicious activity ke karan freeze hua. Sessions ke saath: session delete karo, user turant logged out. JWT ke saath: access token 15 minute aur valid — security risk. Banking mein sessions correct choice hai. Social media app — 50 million users, 100 servers — koi bhi server JWT verify kar sakta hai bina shared session store ke — horizontal scaling effortless. JWT correct choice."
          commonMistakes={[
            {
              mistake: 'JWT ko localStorage mein store karna production mein',
              why: 'XSS attack mein JavaScript localStorage access kar sakta hai — token steal possible. Third party scripts bhi.',
              fix: 'Access token — memory mein (JavaScript variable, not localStorage). Refresh token — httpOnly cookie. Memory tokens XSS se safe, cookies CSRF se safe (sameSite=strict).',
            },
            {
              mistake: 'JWT mein sensitive data daalna',
              why: 'JWT payload base64 encoded hai — NOT encrypted. Anyone jo token dekhe payload padh sakta hai.',
              fix: 'JWT mein sirf non-sensitive identifiers: userId, role, sessionId. Sensitive data: password, SSN, card numbers — kabhi JWT mein nahi.',
            },
          ]}
          proTip="Ye chapter samajhne ke baad ek important suggestion — production mein auth scratch se mat likho. Lucia, NextAuth v5, Clerk, Auth0 — ye battle-tested libraries hain. Auth edge cases bahut hain: timing attacks, CSRF, session fixation — ye sab handle karna mushkil hai. Theory samjho is chapter se, library use karo production mein. Samajhna aur implement karna — dono alag skills hain."
        />
      </div>

      <div
        className="rounded-xl p-5"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <p className="text-[#A78BFA] font-semibold mb-2">🤔 Ab sawaal ye aata hai...</p>
        <p className="text-[#A1A1AA] leading-relaxed">
          JWT use karna decide kar liya — lekin JWT exactly kaam kaise karta hai? Teen parts hain — Header, Payload, Signature. Signature hi wo cheez hai jo JWT ko tamper-proof banata hai. Lekin yaad rakho — payload base64 encoded hai, encrypted nahi. Iska matlab? Koi bhi header aur payload ko decode karke read kar sakta hai. Isliye sensitive data JWT mein kabhi mat daalo.
        </p>
      </div>

      <div id="jwt-implementation">
        <ConceptCard
          title="JWT — Sign, Verify, Decode"
          emoji="🪙"
          difficulty="intermediate"
          whatIsIt="JWT ek tamper-proof ticket hai. Surprise output pehle dekho: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMjMifQ.signature — ye JWT hai. Dot se teen parts: Header (algorithm info, base64 encoded), Payload (claims/data, base64 encoded — ANYONE can decode this!), Signature (HMAC/RSA — sirf ye secret se protected hai). Server JWT verify karta hai signature check karke — header ya payload tamper hone par signature match nahi karega, token reject."
          whenToUse={[
            'Stateless API authentication',
            'Service-to-service authentication (microservices)',
            'Short-lived tokens — access tokens (15 min)',
            'Claims-based authorization — role, permissions token mein',
          ]}
          whyUseIt="JWT self-contained hai — server kuch store nahi karta, stateless. Ab sawaal ye aata hai — agar multiple microservices hain? HS256 (symmetric) mein sab services secret jaanti hain — ek service compromise hone par secret leak. RS256 (asymmetric) better solution: Auth Service private key se sign karta hai, baaki services public key se verify karte hain — private key sirf Auth Service ke paas. Public key share karna safe hai — ussse sign nahi kar sakte."
          howToUse={{
            filename: 'jwt.ts',
            language: 'typescript',
            code: `import jwt from 'jsonwebtoken'
import { z } from 'zod'

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!

// Payload type
interface AccessTokenPayload {
  userId: string
  role: 'user' | 'admin'
  iat?: number
  exp?: number
}

// Token generate
function generateTokens(userId: string, role: 'user' | 'admin') {
  const accessToken = jwt.sign(
    { userId, role } satisfies Omit<AccessTokenPayload, 'iat' | 'exp'>,
    JWT_SECRET,
    { expiresIn: '15m', issuer: 'myapp', audience: 'myapp-api' }
  )

  const refreshToken = jwt.sign(
    { userId },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  )

  return { accessToken, refreshToken }
}

// Token verify — throws on invalid/expired
function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, JWT_SECRET, {
    issuer: 'myapp',
    audience: 'myapp-api',
  }) as AccessTokenPayload
}

// Middleware
function authenticate(req: Request & { userId?: string; role?: string }, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.slice(7)
  try {
    const payload = verifyAccessToken(token)
    req.userId = payload.userId
    req.role = payload.role
    next()
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'TOKEN_EXPIRED', message: 'Token expired, refresh please' })
    }
    res.status(401).json({ error: 'INVALID_TOKEN' })
  }
}

// Decode (no verify) — payload read karo
function decodeToken(token: string) {
  return jwt.decode(token) as AccessTokenPayload | null
  // WARNING: This does NOT verify signature — untrusted data
}`,
            explanation: "Under the hood: issuer aur audience claims extra security dete hain — ek service ka token doosri service mein use karo toh reject hoga. jwt.verify() internally: base64 decode karo → signature recalculate karo → match check karo → expiry check karo. TokenExpiredError specifically catch karo — client ko clear signal milna chahiye ki token refresh karo, nahi toh unauthorized jaisa hi treat karega. decode() signature verify nahi karta — kabhi authentication ke liye mat use karo.",
          }}
          realWorldScenario="Microservices architecture step-by-step: 1) User login kare Auth Service pe — private key se JWT sign hota hai. 2) User Product Service pe request kare — JWT attach. 3) Product Service public key se verify kare — Auth Service ko contact karna zaroori nahi. 4) Order Service bhi same public key use kare. Private key sirf Auth Service ke paas — compromise surface minimal."
          commonMistakes={[
            {
              mistake: "JWT_SECRET weak ya default value use karna",
              why: "'mysecret', 'jwt-secret', '123456' — brute force se crack ho sakta hai. Dictionary attacks vulnerable hain.",
              fix: "openssl rand -base64 64 se 256-bit secret generate karo. Environment variable mein rakho, code mein hardcode mat karo. Rotate periodically.",
            },
            {
              mistake: 'JWT tokens invalidate nahi kar paana',
              why: "JWT stateless hai — issued token expiry tak valid hai. User ka password change ho, account ban ho — puraana token tab bhi kaam karta hai.",
              fix: "Short expiry (15 min) + refresh token pattern. Token blacklist Redis mein (logout karne par). Aur ya JWT revocation endpoint implement karo.",
            },
          ]}
          proTip="jose library (jsonwebtoken ki replacement) consider karo — ES modules, TypeScript-first, browser support, JWKS (JSON Web Key Sets) support. RS256 ke liye key pair: openssl genrsa -out private.pem 2048 aur openssl rsa -in private.pem -pubout -out public.pem. Private key environment variable mein — kabhi commit mat karo. Public key freely distribute kar sakte ho."
        />
      </div>

      <div id="bcrypt">
        <ConceptCard
          title="bcrypt — Password Hashing"
          emoji="🔐"
          difficulty="intermediate"
          whatIsIt="Kya aap jaante ho ki MD5 se hashed password GPU se 10 billion hashes per second crack kiye ja sakte hain? 10 billion! Common password 'password123' MD5 se: milliseconds mein crack. bcrypt deliberately slow hai — intentional design. Salt rounds 12 pe: ek hash ~300ms. Brute force karo toh ek second mein sirf 3-4 attempts. Attacker ke paas million passwords crack karne ke liye centuries lagengi. Slowness feature hai, bug nahi."
          whenToUse={[
            'User passwords store karne se pehle — hamesha hash karo',
            'Login verification — plaintext vs stored hash compare karo',
            'Password change/reset flow',
            'API keys store karna bhi — hash karo, plaintext nahi',
          ]}
          whyUseIt="2012 mein LinkedIn ka data breach hua — 6 million SHA1 unsalted passwords leak hue, crack hue in hours. Agar bcrypt hota? Cracking decades lagte. Plaintext passwords store karna — criminal neglect hai, aur aaj bhi hota hai. bcrypt ki ek aur beauty: automatic salt — har hash alag hota hai. Do users ka same password ho, unka hash alag hoga — rainbow table attacks impossible. Work factor hardware ke saath increase kar sakte ho."
          howToUse={{
            filename: 'bcrypt.ts',
            language: 'typescript',
            code: `import bcrypt from 'bcrypt'

const SALT_ROUNDS = 12  // Higher = slower = more secure (min 10 for production)

// Password hash karo — registration time
async function hashPassword(plainTextPassword: string): Promise<string> {
  // bcrypt.hash automatically generates salt aur includes in hash
  return bcrypt.hash(plainTextPassword, SALT_ROUNDS)
}

// Password verify karo — login time
async function verifyPassword(plainText: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainText, hashedPassword)
  // hash mein embedded salt use karta hai comparison ke liye
}

// Complete auth flow
class AuthService {
  async register(email: string, password: string) {
    // Password strength check pehle
    if (password.length < 8) throw new Error('Password must be at least 8 characters')

    // Hash karo store karne se pehle
    const hashedPassword = await hashPassword(password)

    // DB mein save karo — sirf hash, never plaintext
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    })

    return user
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true, role: true },
    })

    // Timing attack prevent karo — user mila ya nahi, compare karo
    const passwordValid = user
      ? await verifyPassword(password, user.password)
      : await verifyPassword(password, '$2b$12$dummy')  // Dummy compare

    if (!user || !passwordValid) {
      throw new Error('Invalid credentials')  // Specific message mat do
    }

    return user
  }
}

// bcrypt hash format:
// $2b$12$saltsaltsaltsaltsaltsahash...
// $2b = version, $12 = cost factor (2^12 iterations), next 22 chars = salt, rest = hash`,
            explanation: "Under the hood: SALT_ROUNDS 10-12 production mein — 100-400ms per hash. 14+ bahut slow — user registration experience degrade hoti hai. Timing attack ek subtle security hole hai — agar user email exist nahi karta aur immediate return ho (no bcrypt compare), attacker response time measure karke pata lagaa sakta hai ki email registered hai ya nahi. Dummy compare se constant time ensure hota hai — attacker ko koi timing signal nahi milta.",
          }}
          realWorldScenario="Step-by-step: User 'mypassword123' enter kara. bcrypt.hash() internally: random 22-char salt generate karo → 2^12 = 4096 iterations of Blowfish cipher run karo → final hash produce karo. Output format: $2b$12$[22 char salt][31 char hash]. Login par: user fir se 'mypassword123' enter kare → bcrypt.compare() stored hash se salt extract kare → same iterations run kare → match check kare. Password kabhi plaintext store nahi hota."
          commonMistakes={[
            {
              mistake: 'Salt rounds 10 se kam rakhna',
              why: 'Modern GPU 1000s bcrypt hashes per second crack kar sakta hai low rounds se.',
              fix: 'Production mein minimum 10, recommend 12. Hardware fast hone par rounds increase karo — migration: rehash at next login.',
            },
            {
              mistake: 'bcrypt ke liye synchronous version use karna',
              why: 'bcrypt.hashSync() main thread block karta hai — 12 rounds = 300ms block = server 300ms requests handle nahi karta.',
              fix: 'Hamesha async: await bcrypt.hash() aur await bcrypt.compare(). Node.js async I/O benefits milte hain.',
            },
          ]}
          proTip="OWASP 2024 recommendation: Argon2id bcrypt se better hai — memory-hard algorithm hai, GPU attacks ke against more resistant. argon2 npm package use karo naye projects mein. Lekin bcrypt still excellent choice hai — mature, battle-tested, widely supported. Existing bcrypt systems ko migrate karne ki zaroorat nahi unless specific security requirement ho. Next login par silently rehash karo — gradual migration."
        />
      </div>

      <div id="refresh-tokens">
        <ConceptCard
          title="Refresh Token Pattern — Secure Auth Architecture"
          emoji="🔄"
          difficulty="intermediate"
          whatIsIt="Ek problem: JWT 15 min mein expire hoti hai — har 15 min user ko login karo? UX disaster. Doosri problem: JWT long expiry rakho — 7 din — stolen token 7 din valid. Refresh token pattern dono ka balance hai. Access token: 15 min, stateless JWT — fast API access ke liye. Refresh token: 7-30 din, server DB mein stored — sirf access token renew karne ke liye. User transparent experience pata hai, security maintain rehti hai."
          whenToUse={[
            'Production JWT auth — hamesha refresh tokens use karo',
            'Mobile apps jahan user stay logged in weeks/months',
            'Web apps jahan seamless experience chahiye — no login every 15 min',
            'Token rotation implement karna — rotate refresh token on use',
          ]}
          whyUseIt="Ab sawaal ye aata hai — refresh token steal ho gaya toh? Token rotation ek clever solution hai. Har refresh par purana token delete karo, naya issue karo. Agar purana token phir se use ho — theft detect! Attacker aur legitimate user ek saath same family ka token use karne ki koshish karte hain — family invalidate karo — dono logout. Security breach detected aur neutralized. Ye pattern bahut elegant hai."
          howToUse={{
            filename: 'refresh-tokens.ts',
            language: 'typescript',
            code: `import jwt from 'jsonwebtoken'
import crypto from 'crypto'

// Refresh token DB mein store karo (revoke karne ke liye)
interface RefreshToken {
  token: string     // hashed token
  userId: string
  expiresAt: Date
  familyId: string  // Token rotation ke liye
}

class TokenService {
  // New token pair generate karo
  async generateTokenPair(userId: string, role: string) {
    const accessToken = jwt.sign({ userId, role }, process.env.JWT_SECRET!, { expiresIn: '15m' })

    // Refresh token — random, opaque
    const refreshToken = crypto.randomBytes(64).toString('hex')
    const familyId = crypto.randomUUID()

    // Hash karke DB mein store karo
    const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex')
    await prisma.refreshToken.create({
      data: {
        token: hashedToken,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  // 7 days
        familyId,
      },
    })

    return { accessToken, refreshToken }
  }

  // Access token refresh karo
  async refreshAccessToken(refreshToken: string) {
    const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex')

    const stored = await prisma.refreshToken.findUnique({
      where: { token: hashedToken },
      include: { user: true },
    })

    if (!stored || stored.expiresAt < new Date()) {
      // Token reuse detect (rotation) — family invalidate karo
      if (stored) {
        await prisma.refreshToken.deleteMany({ where: { familyId: stored.familyId } })
      }
      throw new Error('Invalid refresh token')
    }

    // Old token delete karo, new pair generate karo (rotation)
    await prisma.refreshToken.delete({ where: { token: hashedToken } })

    return this.generateTokenPair(stored.userId, stored.user.role)
  }

  // Logout
  async logout(refreshToken: string) {
    const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex')
    await prisma.refreshToken.delete({ where: { token: hashedToken } }).catch(() => {})
  }
}`,
            explanation: "Under the hood: Refresh token opaque random string hai — JWT nahi, isliye revoke kar sakte hain. Hashed version DB mein store karo (crypto.createHash sha256) — agar DB breach ho toh plaintext tokens exposed nahi honge. Token rotation step-by-step: 1) Refresh request aaya. 2) Hash match karo DB mein. 3) Old token delete karo. 4) New token pair generate karo. 5) Agar already deleted token aaya — theft detected — family ka sabkuch invalidate karo.",
          }}
          realWorldScenario="Mobile banking app step-by-step: User login kare — access token (15 min) + refresh token (30 din) milta hai. 15 min baad access token expire — app silently background mein refresh token use karke new access token le leti hai — user ko pata nahi. Phone gum gaya — customer care ko call karo — admin server pe refresh token delete kare — user ka next API call fail hoga, app logout kare — security maintained."
          commonMistakes={[
            {
              mistake: 'Refresh token JWT banana',
              why: 'JWT stateless hai — revoke nahi kar sakte. Refresh token ka purpose hi revocability hai — DB mein store hona zaroori hai.',
              fix: 'Refresh token opaque random string rakho (crypto.randomBytes). Hashed version DB mein store karo. Revocation easy hoti hai.',
            },
            {
              mistake: 'Token rotation implement nahi karna',
              why: 'Stolen refresh token indefinitely use kiya ja sakta hai — theft detect nahi hota.',
              fix: 'Har refresh par purana delete, naya issue. Agar purana token use ho — theft! Family invalidate karo. Ye pattern detect karta hai token theft.',
            },
          ]}
          proTip="Refresh token storage hierarchy: Web app — httpOnly Secure SameSite=strict cookie (XSS se safe, CSRF se safe). Mobile app — iOS Keychain ya Android Keystore (OS-level secure storage). Kabhi localStorage nahi — ye XSS attacks ke liye open hai. httpOnly cookie JavaScript se accessible nahi hoti — even if XSS attack ho, token steal nahi hoga. Simplest aur most secure approach for web."
        />
      </div>

      <div id="oauth">
        <ConceptCard
          title="OAuth 2.0 — Third-Party Auth"
          emoji="🌐"
          difficulty="intermediate"
          whatIsIt="Socho OAuth ek reference letter ki tarah — tumhara app Google se kehta hai 'is user ko verify karo.' Google verify karta hai, reference letter (authorization code) deta hai, tumhara server Google se privately code exchange karta hai real access ke liye. Tumhare paas user ka Google password kabhi nahi aata — ye key insight hai. Authorization Code Flow: code exchange server-to-server hota hai — most secure. User ka password kabhi client code tak nahi pahunchta."
          whenToUse={[
            '"Login with Google/GitHub" feature chahiye',
            'User ka social profile access karna — email, name, avatar',
            'Scope-based permissions — calendar read, email send',
            'Third-party integrations — Slack, Salesforce OAuth',
          ]}
          whyUseIt="Ab sawaal ye aata hai — OAuth use karne ka real fayda kya hai? Stats batate hain: 'Login with Google' option hone par signup conversion 40-60% increase hoti hai. User ek aur password yaad nahi karna chahta. Google ka 2FA, passkeys — sab Google handle karta hai, tumhe implement karna nahi padta. Aur sabse important — tumhare paas password database nahi hai — breach hone par exposed passwords zero for OAuth users."
          howToUse={{
            filename: 'oauth.ts',
            language: 'typescript',
            code: `// OAuth 2.0 Authorization Code Flow
// 1. User → "Login with Google" click karo
// 2. App → Google authorize karo (redirect)
// 3. User → Google mein authenticate karo
// 4. Google → App ko authorization code bhejo (redirect back)
// 5. App → Code ko access token se exchange karo (server-to-server)
// 6. App → Access token se user info lo

// Using Passport.js (most common)
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    // User dhundho ya banao
    const user = await prisma.user.upsert({
      where: { googleId: profile.id },
      update: { name: profile.displayName },
      create: {
        googleId: profile.id,
        email: profile.emails?.[0].value ?? '',
        name: profile.displayName,
        avatar: profile.photos?.[0].value,
      },
    })
    done(null, user)
  }
))

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Authentication successful — token generate karo
    const token = generateToken(req.user as User)
    res.redirect(\`/dashboard?token=\${token}\`)
    // Better: httpOnly cookie set karo redirect ke baad
  }
)

// State parameter — CSRF protect karo
// Passport automatically state handle karta hai`,
            explanation: "Under the hood step-by-step: 1) User 'Login with Google' click kare. 2) App Google OAuth URL pe redirect kare with client_id, scope, redirect_uri, state parameter. 3) User Google pe login kare. 4) Google app ke redirect_uri pe authorization code bheje. 5) Server-side: code + client_secret Google ko bhejo → access token milta hai. 6) Access token se user profile fetch karo. State parameter CSRF attack prevent karta hai — OAuth flow hijack nahi ho sakta. PKCE mobile/SPA ke liye — client_secret safely store nahi kar sakte.",
          }}
          realWorldScenario="Productivity SaaS app — 'Login with Google' option diya toh 60% users ne Google hi choose kiya. Naye features: calendar integration OAuth se — user 'Allow calendar read' permission deta hai. App Google Calendar se meetings pull karta hai. Ye sab user ka Google password jaane bina. User trust high hai — Google pe already trust hai, naya app pe immediately trust extend hoti hai."
          commonMistakes={[
            {
              mistake: 'Client ID aur Client Secret confuse karna',
              why: 'Client ID public hai — OAuth redirect URL mein dikhta hai. Client Secret NEVER client-side code ya public repository mein.',
              fix: 'Client Secret sirf server mein, environment variable mein. Client ID front-end mein safe hai. GitHub secret scan enable karo accidentally committed secrets detect karne ke liye.',
            },
            {
              mistake: 'Access token client ko dena aur long-term store karna',
              why: "Google access token store karna aur reuse karna — ye expire hote hain, leakage risk hai.",
              fix: 'OAuth flow ke baad apna JWT issue karo user ke liye. Google access token sirf initial profile fetch ke liye use karo, phir discard karo ya securely server mein store karo agar Google API access zaroori ho.',
            },
          ]}
          proTip="OAuth scratch se likhna mat try karo — edge cases, security considerations, state management, token refresh — bahut complex hai. better-auth, Auth.js (NextAuth v5), Lucia — ye libraries ye sab handle karti hain, battle-tested hain. Theory is chapter se samjho, implementation library se karo. Senior developer wahi hota hai jo janta hai kab library use karni hai aur kab khud likhna hai."
        />
      </div>
    </div>
  )
}
