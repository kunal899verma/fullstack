'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const expertQuiz = [
  {
    question: 'Repository pattern ka main benefit kya hai?',
    options: [
      { text: 'Database queries fast ho jaate hain', correct: false, explanation: 'Repository pattern performance se related nahi hai — abstraction ke liye hai.' },
      { text: 'Business logic ko data access se decouple karta hai — DB change karna easy', correct: true, explanation: 'Bilkul sahi! Repository interface ke peeche DB swap karo — business logic ko pata nahi chalega. Testing bhi easy hoti hai.' },
      { text: 'Automatically CRUD generate karta hai', correct: false, explanation: 'CRUD code manually likhna padta hai Repository mein.' },
      { text: 'Sirf TypeScript ke liye kaam karta hai', correct: false, explanation: 'Repository pattern language-agnostic design pattern hai.' },
    ],
  },
  {
    question: 'Pino logger console.log se kyun better hai production mein?',
    options: [
      { text: 'Sirf colorful output ke liye', correct: false, explanation: 'Production mein colors matter nahi karte — structured data zaroori hai.' },
      { text: 'JSON structured logs deta hai — search, filter, aur analyze karna easy', correct: true, explanation: 'Sahi! Pino structured JSON logs deta hai — Datadog, CloudWatch, Splunk mein easily filter karo. console.log unstructured text hai.' },
      { text: 'console.log se slow hai', correct: false, explanation: 'Pino actually fastest Node.js logger hai — console.log se bhi fast.' },
      { text: 'Sirf async logging ke liye', correct: false, explanation: 'Pino synchronous bhi kar sakta hai, lekin async mode performance ke liye better hai.' },
    ],
  },
  {
    question: 'ADR (Architecture Decision Record) kab likhna chahiye?',
    options: [
      { text: 'Sirf jab team disagree kare', correct: false, explanation: 'ADR important decisions ke liye hain — disagreement whether or not.' },
      { text: 'Significant architecture decisions ke liye — technology choice, major pattern adoption, trade-off accepted', correct: true, explanation: 'Correct! ADR context preserve karta hai — future developers samjhenge ki decision kyun liya gaya. "Why" document karo, not "what".' },
      { text: 'Har code change ke liye', correct: false, explanation: 'ADR high-level architecture decisions ke liye hain — code changes ke liye PR description/comments.' },
      { text: 'Project start par sirf ek baar', correct: false, explanation: 'ADRs living documents hain — project lifecycle mein naye decisions ke liye naye ADRs.' },
    ],
  },
  {
    question: 'Senior engineer kaise architecture decisions lete hain?',
    options: [
      { text: 'Hamesha latest technology use karte hain', correct: false, explanation: 'Latest != best. Trade-offs matter karte hain — team familiarity, ecosystem maturity, maintenance.' },
      { text: 'Trade-offs evaluate karte hain — context, team, scale, maintainability balance karte hain', correct: true, explanation: 'Bilkul sahi! "It depends" — senior engineer context samjhta hai aur sahi compromise karta hai. No silver bullets.' },
      { text: 'Committee decision karte hain hamesha', correct: false, explanation: 'Committee sometimes zaroori hai, lekin decision paralysis se bachna chahiye.' },
      { text: 'Sirf performance optimize karte hain', correct: false, explanation: 'Performance ek dimension hai — readability, maintainability, cost, security bhi important hain.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Chapter23Content() {
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
          Expert Mindset — Senior Engineer Kaise Sochta Hai?
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Code likhna sirf pehla step hai. <strong className="text-[#F5F5F7]">Expert engineer vo hota hai jo systems think karta hai, trade-offs samajhta hai, aur dusron ko grow hone mein madad karta hai.</strong> Is chapter mein wo mindset, patterns, aur practices cover karenge jo tumhe junior se senior banati hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ye final chapter hai — lekin ye sirf shuruwaat hai tumhari engineering journey ki. Keep building, keep learning, keep sharing.
        </p>
      </div>

      {/* ConceptCard 1: Senior Mindset */}
      <div id="senior-mindset">
        <ConceptCard
          title="Senior Engineer Ka Mindset"
          emoji="🧠"
          difficulty="advanced"
          whatIsIt="Senior engineer code mein nahi, systems mein sochta hai. Trade-offs samajhta hai. Code review mein constructive hota hai. Business impact samajhta hai. 'How' ke saath 'Why' bhi jaanta hai. Ambiguity mein comfortable hota hai."
          whenToUse={[
            'Architecture decision lene se pehle — trade-offs list karo',
            'Code review dete waqt — empathetic, specific, actionable feedback',
            'Estimation karte waqt — uncertainty acknowledge karo',
            'Unknown problem solve karte waqt — systematically break down karo',
          ]}
          whyUseIt="Junior developers ek problem ke ek solution dhundthe hain. Senior developers multiple solutions evaluate karte hain — constraints, trade-offs, future implications samajhte hain. Ye perspective aata hai experience se, aur intentionally cultivate karna padta hai."
          howToUse={{
            filename: 'senior-mindset.md',
            language: 'markdown',
            code: `# Senior Engineer Traits

## Systems Thinking
- Ek change ke ripple effects sochte hain
- "Iska downstream impact kya hoga?"
- Dependencies aur coupling identify karte hain

## Trade-off Analysis (ALWAYS)
- Har decision ke pros/cons
- "Fast vs correct vs maintainable — kya prioritize karein?"
- Context-dependent — universal answers nahi

## Code Review Philosophy
- ❌ "This is wrong" (accusatory)
- ✅ "Could we consider X because Y?" (collaborative)
- Explain the 'why' — education opportunity
- Nitpicks clearly label karo: "nit: variable name"
- Positive reinforcement — acknowledge good code

## Estimation
- Range dete hain, point nahi: "3-5 days"
- Unknowns identify karte hain: "Agar DB migration simple hai..."
- Buffer rakhte hain: 1.5x-2x estimate

## Dealing with Ambiguity
- Clarifying questions pehle
- Assumptions explicitly state karo
- Minimal viable solution dhundho
- Iterate karo feedback se`,
            explanation: 'Senior mindset skills hain — develop ho sakti hain. Intentional practice karo: har decision par trade-offs write karo, code review mein empathy practice karo, systems diagrams draw karo. Gradually ye automatic ho jaata hai.',
          }}
          realWorldScenario="Junior developer ne Redis cache implement kiya bina cache invalidation ke. Senior engineer ne code review mein likha: 'Great caching implementation! One thing to consider — when user updates their profile, this cache might serve stale data for up to 5 minutes. Could we add invalidation in the update handler? Here's one way...' Constructive, specific, educational."
          commonMistakes={[
            {
              mistake: 'Har cheez over-engineer karna kyunki "future mein chahiye ho sakta hai"',
              why: 'YAGNI (You Ain\'t Gonna Need It) — future requirements guess karna often wrong hota hai. Unnecessary complexity add hoti hai.',
              fix: 'Current requirements solve karo. Extension points chahiye toh abstractions banao, lekin premature generalization avoid karo.',
            },
            {
              mistake: 'Code review mein personality attack karna',
              why: 'Psychological safety khatam hoti hai — junior developers risk lena band kar dete hain, innovation suffers.',
              fix: 'Code criticize karo, person ko nahi. "This approach has a bug" not "You made a bug". Constructive questions use karo.',
            },
          ]}
          proTip="Daily journal rakhao architecture decisions ke liye — 5 minutes, kya decide kiya aur kyun. 6 months baad read karo — growth dikhai dega. Past decisions review karo — kya sahi nikla, kya nahi? Learning loop banao."
        />
      </div>

      {/* ConceptCard 2: Design Patterns */}
      <div id="design-patterns">
        <ConceptCard
          title="Design Patterns in Node.js"
          emoji="🏛️"
          difficulty="advanced"
          whatIsIt="Design patterns tried-and-tested solutions hain recurring problems ke liye. Repository, Factory, Strategy patterns Node.js mein commonly use hote hain — maintainable, testable, aur flexible code banate hain."
          whenToUse={[
            'Repository pattern — data access abstract karna',
            'Factory pattern — objects banane ki logic centralize karna',
            'Strategy pattern — runtime par algorithm swap karna',
            'Observer pattern — event-driven loose coupling',
          ]}
          whyUseIt="Design patterns shared vocabulary dete hain — 'ye Repository pattern hai' ek sentence mein architecture explain kar deta hai. Patterns time-tested solutions hain — common pitfalls se bachate hain. Testing easy hoti hai — patterns naturally dependency injection support karte hain."
          howToUse={{
            filename: 'design-patterns.ts',
            language: 'typescript',
            code: `// ── Repository Pattern ─────────────────────────────────────────────────────
// Data access logic business logic se separate karo

interface IUserRepository {
  findById(id: string): Promise<User | null>
  save(user: User): Promise<User>
  delete(id: string): Promise<void>
}

class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  async save(user: User) {
    return this.prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    })
  }

  async delete(id: string) {
    await this.prisma.user.delete({ where: { id } })
  }
}

// Testing mein mock repository use karo — no real DB
class MockUserRepository implements IUserRepository {
  private users = new Map<string, User>()

  async findById(id: string) { return this.users.get(id) ?? null }
  async save(user: User) { this.users.set(user.id, user); return user }
  async delete(id: string) { this.users.delete(id) }
}

// ── Strategy Pattern ────────────────────────────────────────────────────────
// Runtime par algorithm swap karo

interface PaymentStrategy {
  process(amount: number): Promise<PaymentResult>
}

class StripePayment implements PaymentStrategy {
  async process(amount: number) { /* Stripe API */ return { success: true } }
}

class RazorpayPayment implements PaymentStrategy {
  async process(amount: number) { /* Razorpay API */ return { success: true } }
}

class PaymentService {
  constructor(private strategy: PaymentStrategy) {}

  async charge(amount: number) {
    return this.strategy.process(amount)
  }
}

// Usage — runtime par strategy change karo
const payment = new PaymentService(
  user.country === 'IN' ? new RazorpayPayment() : new StripePayment()
)`,
            explanation: 'Repository pattern se DB swap karo — PostgreSQL se MongoDB migrate karo sirf implementation change karke, service code untouched. Strategy pattern se payment gateway A/B test karo ya country-specific gateways use karo. Testability dramatically improves.',
          }}
          realWorldScenario="SaaS app mein MongoDB se PostgreSQL migrate karna tha. Repository pattern already tha — sirf PostgresUserRepository implement kiya aur dependency inject kiya. Business logic code zero change. Migration smooth rahi — ek weekend mein done."
          commonMistakes={[
            {
              mistake: 'Har jagah design patterns force karna',
              why: 'Simple problems ke liye complex patterns — over-engineering. CRUD mein Repository pattern zaroori nahi agar DB change hone ki expectation nahi.',
              fix: 'Problem se shuru karo, pattern se nahi. Jab natural fit dikhe, pattern apply karo. Design patterns solutions hain specific problems ke liye.',
            },
            {
              mistake: 'God Object banaa dena — ek class mein sab kuch',
              why: 'Single Responsibility Principle violate hota hai — testing hard, modification risky.',
              fix: 'Responsibilities split karo — UserRepository (data), UserService (business logic), UserController (HTTP handling). Har class ek kaam kare.',
            },
          ]}
          proTip="Gang of Four book (Design Patterns) padho — 23 classic patterns. Node.js specific patterns ke liye 'Node.js Design Patterns' (Mario Casciaro) excellent hai. Pattern recognize karo pehle, phir implement karo — premature pattern application avoid karo."
        />
      </div>

      {/* ConceptCard 3: Observability */}
      <div id="observability">
        <ConceptCard
          title="Observability — App Ka X-Ray"
          emoji="📊"
          difficulty="advanced"
          whatIsIt="Observability matlab production mein kya ho raha hai ye jaanna — bina guessing ke. Teen pillars: Logs (kya hua), Metrics (kitna aur kaisa), Traces (request kaahan gayi). Structured logging (Pino), metrics (Prometheus), distributed tracing (OpenTelemetry)."
          whenToUse={[
            'Production bugs investigate karo — logs se timeline reconstruct karo',
            'Performance issues dhundho — metrics se anomalies detect karo',
            'Request slow kyun — distributed trace se bottleneck identify karo',
            'Business metrics track karo — DAU, conversion, error rate',
          ]}
          whyUseIt="Bina observability ke production issues andhere mein dhundne padते hain. 3 AM incident mein logs nahi hain toh guessing game hai. Structured logs se seconds mein filter karo. Metrics se proactive alerts — issue before user complaint. Traces se microservices mein request journey track karo."
          howToUse={{
            filename: 'observability-setup.ts',
            language: 'typescript',
            code: `// ── Structured Logging — Pino ──────────────────────────────────────────────
import pino from 'pino'

const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  // Production: JSON format
  // Development: pretty print
  transport: process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined,

  // Always include these fields
  base: {
    service: 'user-service',
    version: process.env.APP_VERSION ?? '1.0.0',
    env: process.env.NODE_ENV,
  },
})

// ❌ console.log — unstructured, unsearchable
console.log('User created:', userId, email)

// ✅ Pino — structured, searchable, filterable
logger.info({ userId, email, action: 'user.created' }, 'User created successfully')
logger.error({ err, userId, requestId }, 'Failed to send welcome email')

// Request logging middleware
app.use((req, res, next) => {
  const reqLogger = logger.child({
    requestId: req.headers['x-request-id'] ?? crypto.randomUUID(),
    method: req.method,
    path: req.path,
  })

  req.log = reqLogger
  const start = Date.now()

  res.on('finish', () => {
    reqLogger.info({
      statusCode: res.statusCode,
      duration: Date.now() - start,
    }, 'Request completed')
  })

  next()
})

// ── Metrics — Prometheus ────────────────────────────────────────────────────
import client from 'prom-client'

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5],
})

// Metrics endpoint — Prometheus scrape karega
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
})`,
            explanation: 'Pino child loggers use karo — requestId se poori request ki sari logs ek saath filter karo. JSON structured logs Datadog/CloudWatch/ELK mein efficiently search hote hain. Prometheus + Grafana dashboards se real-time visibility.',
          }}
          realWorldScenario="Payment service mein timeout errors aate the 2 AM ko. Pino structured logs + Datadog: error.message: 'Connection timeout' filter kiya — 95% errors ek specific IP se aa rahe the. Trace se pata chala: payment gateway rate limit hit ho raha tha. Fix: retry logic aur circuit breaker. Bina observability ke 2 weeks lagते."
          commonMistakes={[
            {
              mistake: 'console.log() production mein use karna',
              why: 'Unstructured text hai — search karna mushkil, performance poor, log level control nahi, JSON parsing impossible.',
              fix: 'Pino ya Winston use karo. Logging library se level control, structured output, aur transport flexibility milti hai.',
            },
            {
              mistake: 'Sensitive data logs mein print karna',
              why: 'Passwords, tokens, credit card numbers logs mein jaate hain — log aggregation services par visible ho jaate hain.',
              fix: 'Logger mein redact config use karo: redact: ["password", "token", "authorization"]. Automatically mask ho jaate hain.',
            },
          ]}
          proTip="OpenTelemetry SDK use karo distributed tracing ke liye — vendor neutral. Ek instrumentation code se Jaeger, Zipkin, Datadog, sab par trace bhejo. @opentelemetry/auto-instrumentations-node se Express, DB, Redis automatically instrument hote hain — zero code change."
        />
      </div>

      {/* ConceptCard 4: Career Growth */}
      <div id="career-growth">
        <ConceptCard
          title="Career Growth — Senior tak Kaise Pahuncho?"
          emoji="🚀"
          difficulty="advanced"
          whatIsIt="Technical skills zaroori hain lekin sufficient nahi. Open source contributions, blogging, community involvement, aur continuous learning — ye sab engineering career accelerate karte hain. Build in public, share learnings, give back."
          whenToUse={[
            'Career plateau feel kar raho ho — naya challenge dhundo',
            'Job change karna hai — visible portfolio chahiye',
            'Senior promotion target hai — leadership aur impact demonstrate karo',
            'Network build karna hai — community mein active raho',
          ]}
          whyUseIt="GitHub contributions, blog posts, aur open source work portfolio ban jaate hain — interview mein concrete examples dene ke liye. Community mein active log industry trends pehle jaante hain. Teaching is the best way to learn — blog likhne se concepts deeper samajh aate hain."
          howToUse={{
            filename: 'career-growth.md',
            language: 'markdown',
            code: `# Senior Engineer Growth Path

## Technical Excellence (Foundation)
- Deep dive karo — surface level nahi
- System design practice karo: design Twitter, Uber
- Distributed systems concepts: CAP theorem, consistency models
- Read papers: "Dynamo", "MapReduce", "Kafka paper"

## Open Source Contributions
1. Familiar projects ki issues dekho — "good first issue" label
2. Bug fix karo — small se shuru karo
3. Documentation improve karo — underrated but valuable
4. Apna tool banao — real problem solve karo
- GitHub: github.com/explore
- First PR nervousness normal hai — everyone starts somewhere

## Blogging / Writing
- Hashnode, dev.to, personal blog
- "TIL" (Today I Learned) posts — small but consistent
- Deep dives — what you learned building something
- Don't wait for perfection — publish and improve
- Topics: bugs you fixed, patterns you discovered, mistakes you made

## Community
- Local meetups — NodeJS meetup, JavaScript meetup
- Twitter/X: follow @nodejs, @dan_abramov, @addyosmani
- Discord: Official Node.js Discord
- Conferences: speaking > attending

## Continuous Learning
- One technical book per month
- Read changelog of tools you use
- Side projects — real problems, real solutions`,
            explanation: 'Consistency beats intensity. 30 minutes daily > 5 hours weekend. Public learning se accountability milti hai. Failures bhi share karo — people relate karte hain aur trust badhta hai.',
          }}
          realWorldScenario="Developer ne ek Node.js caching utility banai jab koi library suit nahi kar rahi thi. GitHub par publish kiya — 50 stars pehle week mein. 6 months mein 2000+ stars. Ye GitHub profile ne 3 job offers diye directly — recruiter ne repository dekha. Open source genuinely career-changing ho sakta hai."
          commonMistakes={[
            {
              mistake: '"Mujhe pehle sab jaanna hai blog likhne se pehle"',
              why: 'Perfect knowledge kabhi nahi aati. Imposter syndrome everyone ko hota hai — even senior engineers.',
              fix: '"I learned X today and here is how it works" — beginners perspective valuable hota hai. Write for past-you.',
            },
            {
              mistake: 'Sirf technical skills par focus — soft skills ignore karna',
              why: 'Senior promotion mein communication, leadership, mentoring matter karta hai utna hi jitna technical skills.',
              fix: 'Junior developers mentor karo, stakeholders ke saath communicate karna seekho, cross-functional work karo.',
            },
          ]}
          proTip="Second Brain banao — Obsidian ya Notion mein notes rakho. Learning → Notes → Blog Post → Talk pipeline banao. Ek concept 4 forms mein process karo: code karo, notes lo, blog likho, phir talk do — depth extraordinary ho jaati hai."
        />
      </div>

      {/* ConceptCard 5: Architecture Decisions */}
      <div id="architecture-decisions">
        <ConceptCard
          title="Architecture Decisions & ADRs"
          emoji="📐"
          difficulty="advanced"
          whatIsIt="ADR (Architecture Decision Record) ek short document hai jo important architecture decisions document karta hai — context, options considered, decision liya, aur consequences. Future mein 'ye kyun kiya' ka answer milta hai."
          whenToUse={[
            'Major technology choice — PostgreSQL vs MongoDB',
            'Architectural pattern adopt karna — microservices vs monolith',
            'Major trade-off accept karna — consistency vs availability',
            'Non-obvious decisions — future team members ko explain karna zaroori',
          ]}
          whyUseIt="6 months baad code dekhte waqt 'ye kyun kiya' yaad nahi rehta. PR comments archive mein khote hain. ADRs searchable, versioned, aur team ke saath shared hote hain. New team members quickly context samajhte hain bina har decision ka reason poochhe."
          howToUse={{
            filename: 'docs/adr/001-database-choice.md',
            language: 'markdown',
            code: `# ADR 001: PostgreSQL Choose Karna Primary Database

## Status
Accepted (2025-01-15)

## Context
Humein apne SaaS product ke liye primary database choose karna hai.
Requirements:
- ACID transactions zaroori hain (financial data)
- Complex queries with JOINs chahiye
- JSON data bhi store karna hai (user preferences)
- Team ka SQL expertise strong hai

## Options Considered

### Option 1: PostgreSQL
- Pros: ACID, mature, JSON support (JSONB), excellent tooling
- Cons: Horizontal scaling complex, schema migrations careful

### Option 2: MongoDB
- Pros: Flexible schema, easy horizontal scaling
- Cons: No ACID across documents (pre-4.0), team unfamiliar

### Option 3: MySQL
- Pros: Familiar, battle-tested
- Cons: JSON support weaker than PostgreSQL, JSONB not available

## Decision
PostgreSQL choose kiya.

Reasoning: ACID transactions financial data ke liye non-negotiable hain.
PostgreSQL ka JSONB support flexible fields ke liye best-of-both-worlds deta hai.
Team ka SQL expertise existing hai — learning curve minimum.

## Consequences
- Positive: Strong consistency, excellent ORM support (Prisma, TypeORM)
- Negative: Sharding manually handle karna padega agar needed (later problem)
- Mitigation: Read replicas se scale karo initially

## Review
Review karo agar: 100K concurrent users ya NoSQL features specifically needed hon.`,
            explanation: 'ADRs short rakho — 1-2 pages max. Context (kyun decide karna pada), decision (kya decide kiya), consequences (impact). docs/adr/ folder mein numbered files rakho. Code ke saath version control mein — decisions code ke saath evolve hote hain.',
          }}
          realWorldScenario="Fintech startup mein new CTO join hua. Codebase mein kuch unusual patterns the — microservices instead of expected monolith, event sourcing ki jagah simple CRUD. Bina ADRs ke 3 weeks context gathering. Baad mein ADRs implement kiye — nayi hires 2 days mein architectural context samajhne lage."
          commonMistakes={[
            {
              mistake: 'ADR sirf final decision document karna — options considered ignore karna',
              why: 'Future mein options revisit karne ka context kho jaata hai — kyun option A reject kiya tha?',
              fix: 'Har considered option document karo pros/cons ke saath. Ye historical context hi ADR ki asli value hai.',
            },
            {
              mistake: 'ADR mein "obviously correct" decisions document karna',
              why: 'Time waste — team bandwidth limited hai. Obvious decisions clutter karte hain.',
              fix: 'Sirf non-obvious, significant, ya controversial decisions ADR mein. "Hum Node.js use karenge" obvious hai — document mat karo.',
            },
          ]}
          proTip="adr-tools CLI se ADRs manage karo: adr new 'Use PostgreSQL as primary database'. Template automatically generate hoti hai. GitHub PR se ADR review process link karo — decision finalize hone par ADR merge hota hai. Architecture as code!"
        />
      </div>

      {/* Final Message */}
      <div
        id="final-message"
        className="rounded-2xl p-8 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.08))',
          border: '1px solid rgba(124,58,237,0.25)',
        }}
      >
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3">
          Congratulations! NodeMaster Course Complete!
        </h3>
        <p className="text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto mb-4">
          Tumne Node.js ka poora journey complete kiya — fundamentals se leke architecture, testing, security, performance, aur deployment tak. Lekin ye end nahi, ye beginning hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto">
          Ab kuch banao. Real projects. Real problems. Keep learning, keep shipping, keep growing. Tumhara Node.js expert ban jaana time ki baat hai — jo concepts tumne seekhe hain, unhe apply karte raho.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: 'rgba(124,58,237,0.15)', color: '#9D5FF0', border: '1px solid rgba(124,58,237,0.3)' }}>Build Projects</span>
          <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: 'rgba(6,182,212,0.12)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.3)' }}>Open Source</span>
          <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}>Write Blogs</span>
          <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: 'rgba(245,158,11,0.12)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)' }}>Keep Learning</span>
        </div>
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 23 Quiz — Expert Mindset Check
          </h3>
          <p className="text-sm text-[#71717A]">
            Final quiz — design patterns, observability, career, architecture decisions!
          </p>
        </div>
        <QuizSection questions={expertQuiz} chapterSlug="deployment-and-ci-cd" />
      </div>
    </div>
  )
}
