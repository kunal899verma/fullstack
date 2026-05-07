'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

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
          Authentication (kaun ho tum?) aur Authorization (kya kar sakte ho?) — ye dono security ke pillars hain. JWT (JSON Web Tokens) modern stateless auth ka standard hai. bcrypt password hashing — production mandatory hai. Ye chapter comprehensive auth system cover karta hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Authentication galat implement karna — plaintext passwords, weak tokens, no rate limiting — sabse common security vulnerabilities hain. Sahi karo pehli baar se.
        </p>
      </div>

      <div id="sessions-vs-jwt">
        <ConceptCard
          title="Sessions vs JWT — Stateful vs Stateless"
          emoji="🔑"
          difficulty="intermediate"
          whatIsIt="Sessions: Server-side storage — session ID cookie, server session store mein user data. Stateful — server ko state yaad rakhna padta hai. JWT: Client-side storage — token mein user info, server verify karta hai signature se. Stateless — server kuch yaad nahi rakhta. Dono trade-offs hain."
          whenToUse={[
            'Session: Monolith apps, instant logout zaroorit, sensitive data server par',
            'JWT: Microservices, horizontal scaling, mobile apps, stateless APIs',
            'JWT: Multiple services ek token accept karein — SSO scenarios',
            'Session: Bank-level security — immediate token invalidation critical',
          ]}
          whyUseIt="Sessions: Instant logout (session delete karo), easy revocation. JWT: No DB lookup per request (fast), horizontally scalable (koi bhi server verify kar sakta hai), mobile-friendly (no cookies needed). Production mein refresh token pattern se JWT ke downsides mitigate hote hain."
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
            explanation: "Session store Redis mein rakho — in-memory store scale nahi hota multiple servers par. JWT short expiry (15 min) + refresh tokens (7 days) — compromise between security aur UX. Refresh token httpOnly cookie mein — XSS se safe. Access token memory mein ya localStorage mein.",
          }}
          realWorldScenario="Banking app: Session prefer karo — instant revocation critical. User login kare doosri device se, pehli device immediately logout ho. JWT se ye possible nahi bina revocation list ke. Social media app: JWT prefer karo — scale horizontally, mobile apps work well."
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
          proTip="Auth library use karo — Lucia, NextAuth, Clerk, Auth0. Auth scratch se likhna error-prone hai. Lekin samajhna zaroori hai internals — ye chapter isliye hai. Production mein battle-tested library prefer karo aur custom implementation sirf clear business reason ho toh karo."
        />
      </div>

      <div id="jwt-implementation">
        <ConceptCard
          title="JWT — Sign, Verify, Decode"
          emoji="🪙"
          difficulty="intermediate"
          whatIsIt="JWT (JSON Web Token) teen parts hain (dot se separated): Header (algorithm info) + Payload (claims/data) + Signature (HMAC/RSA). Header aur Payload base64url encoded hain. Signature secret se verify hota hai — tampered token reject ho jaata hai. HS256 (symmetric) ya RS256 (asymmetric) algorithms use hote hain."
          whenToUse={[
            'Stateless API authentication',
            'Service-to-service authentication (microservices)',
            'Short-lived tokens — access tokens (15 min)',
            'Claims-based authorization — role, permissions token mein',
          ]}
          whyUseIt="JWT self-contained hai — server kuch store nahi karta. Scalable — koi bhi server same secret se verify kar sakta hai. Standard format — libraries sabhi languages mein available hain. RS256 se public key verify kar sakta hai — private key sirf auth server ke paas."
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
            explanation: "issuer aur audience claims extra security dete hain — wrong service ka token reject hoga. TokenExpiredError specifically catch karo — client ko refresh karne ke liye clear signal. decode() kabhi trust nahi karo — verify() use karo authentication ke liye. satisfies TypeScript se ensure karta hai payload type correct hai.",
          }}
          realWorldScenario="Microservices architecture: Auth Service tokens issue karta hai, Product Service aur Order Service same public key se verify karte hain (RS256). Auth Service private key rakhta hai, baaki services public key se validate karte hain — secrets share nahi hote."
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
          proTip="jose library use karo jsonwebtoken ki jagah — ES module, TypeScript-first, browser bhi support karta hai. RS256 ke liye: node:crypto se key pair generate karo, ya openssl. RS256 microservices mein better hai — private key sirf auth server par, public key distribute karo."
        />
      </div>

      <div id="bcrypt">
        <ConceptCard
          title="bcrypt — Password Hashing"
          emoji="🔐"
          difficulty="intermediate"
          whatIsIt="bcrypt password hashing algorithm hai jiske liye specifically kaam karna slow hai — intentionally. MD5, SHA-256 fast hain — millions of passwords per second brute force karo. bcrypt 10 salt rounds mein 100ms+ per hash — brute force impractical. Salt automatic inject karta hai — rainbow table attacks prevent hote hain."
          whenToUse={[
            'User passwords store karne se pehle — hamesha hash karo',
            'Login verification — plaintext vs stored hash compare karo',
            'Password change/reset flow',
            'API keys store karna bhi — hash karo, plaintext nahi',
          ]}
          whyUseIt="Plaintext passwords store karna criminal neglect hai. MD5/SHA simple hashing — 10 billion hashes/second possible hain modern GPU se. bcrypt intentionally slow hai — work factor increase karo as hardware improves. Argon2 aur scrypt alternatives hain — Node.js mein bcrypt most popular aur battle-tested hai."
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
            explanation: "SALT_ROUNDS 10-12 production mein (100-400ms per hash). 14+ bahut slow — registration experience degrade. Timing attack: agar user nahi mila toh early return karo — attacker email existence confirm kar sakta hai timing difference se. Dummy compare se constant time ensure hota hai.",
          }}
          realWorldScenario="Data breach mein LinkedIn ka 2012 data breach — SHA1 unsalted hashes leak hue, 6 million passwords crack hue in hours. bcrypt hashes ke saath same breach — cracking decades ya centuries lagte. Sahi hashing = breach damage dramatically reduced."
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
          proTip="Argon2 (Node.js argon2 package) bcrypt se better hai newer systems ke liye — memory-hard, more resistant to GPU attacks, OWASP recommended. Lekin bcrypt still excellent aur widely supported hai. naye projects mein argon2 consider karo. bcrypt Node.js mein mature aur well-tested hai."
        />
      </div>

      <div id="refresh-tokens">
        <ConceptCard
          title="Refresh Token Pattern — Secure Auth Architecture"
          emoji="🔄"
          difficulty="intermediate"
          whatIsIt="Access token: short-lived (15 min), stateless JWT — API requests ke saath. Refresh token: long-lived (7-30 days), stored server-side — access token renew karne ke liye. Access token expire hone par refresh token se naya lo. Logout mein refresh token delete karo — access token expire hone do. Security aur UX ka balance."
          whenToUse={[
            'Production JWT auth — hamesha refresh tokens use karo',
            'Mobile apps jahan user stay logged in weeks/months',
            'Web apps jahan seamless experience chahiye — no login every 15 min',
            'Token rotation implement karna — rotate refresh token on use',
          ]}
          whyUseIt="Short access token — security: compromise hone par 15 min mein expire. Refresh token — UX: user baar baar login nahi karta. Server-side refresh token — revocation possible. Token rotation — stolen refresh token detect karo — ek refresh token ek baar use hoga."
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
            explanation: "Refresh token opaque (random bytes) hai — JWT nahi. Hashed version store karo DB mein (plaintext leak hone par security). Token rotation: har use par purana delete, naya create. Family invalidation: agar purana (already rotated) token use ho — theft detect! Poori family invalidate karo — attacker aur legitimate user dono logout.",
          }}
          realWorldScenario="Mobile banking app — user 30 days tak logged in rehta hai. Access token har 15 min renew hota hai — transparent, smooth UX. Logout karo — refresh token delete, next access token use hone par unauthorized. Phone lost — admin se emergency logout — refresh token server-side delete."
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
          proTip="Refresh token client mein store karna: Web apps mein httpOnly Secure cookie (XSS safe, CSRF use sameSite=strict se prevent). Mobile apps mein secure storage (iOS Keychain, Android Keystore). Never localStorage. Cookie-based approach simpler hai — backend SameSite=strict CSRF prevent karta hai."
        />
      </div>

      <div id="oauth">
        <ConceptCard
          title="OAuth 2.0 — Third-Party Auth"
          emoji="🌐"
          difficulty="intermediate"
          whatIsIt="OAuth 2.0 authorization framework hai — users apne Google/GitHub/Facebook account se tumhari app mein login kar sakte hain. Password tumhare paas nahi aata — Google authenticate karta hai, Google tumhe access token deta hai, tum user info le lete ho. Authorization Code Flow: most secure, server-side."
          whenToUse={[
            '"Login with Google/GitHub" feature chahiye',
            'User ka social profile access karna — email, name, avatar',
            'Scope-based permissions — calendar read, email send',
            'Third-party integrations — Slack, Salesforce OAuth',
          ]}
          whyUseIt="User ek aur password yaad nahi karna chahta. Google ka auth UI trusted aur polished hai. 2FA, passkeys — Google already handle karta hai. Tumhara password database kama hota hai — breach risk zero for those users. Social signup conversion rates higher hote hain."
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
            explanation: "Authorization Code Flow: code exchange server-to-server hota hai — client_secret never client par jaata. PKCE (Proof Key for Code Exchange) mobile/SPA ke liye — code_verifier + code_challenge. scope request minimum karo — user consent granular hoti hai. State parameter CSRF prevent karta hai OAuth flow mein.",
          }}
          realWorldScenario="Productivity SaaS app — 'Login with Google' 60% users use karte hain vs email/password. Gmail calendar integration OAuth se — user grants calendar read permission. Daily standup app pulls meetings automatically. User trust high hoti hai — no new account, Google already trusted."
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
          proTip="better-auth, Auth.js (NextAuth v5), Lucia — ye libraries OAuth, sessions, JWT sab handle karte hain. Scratch se OAuth implement karna error-prone hai — edge cases, security considerations bahut hain. Production mein library use karo. Is chapter se theory samjho, library se implement karo."
        />
      </div>
    </div>
  )
}
