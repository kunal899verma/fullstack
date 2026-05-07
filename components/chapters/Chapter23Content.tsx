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

// ── Chapter Diagram ───────────────────────────────────────────────────────────

function CiCdPipelineDiagram() {
  const stages = [
    { label: 'Code Push', sublabel: 'git push → main branch triggers workflow', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: '📤', status: '✅' },
    { label: 'GitHub Actions', sublabel: 'Workflow file picked up — ubuntu-latest runner', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', icon: '⚙️', status: '🔄' },
    { label: 'Tests Run', sublabel: 'npm ci → lint → jest --coverage (quality gate)', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: '🧪', status: '✅' },
    { label: 'Build', sublabel: 'TypeScript compile + asset bundling', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', icon: '🔨', status: '✅' },
    { label: 'Docker Build', sublabel: 'Multi-stage Dockerfile — lean production image', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '🐳', status: '✅' },
    { label: 'Push to Registry', sublabel: 'ghcr.io — tagged with git SHA + latest', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', icon: '📦', status: '✅' },
    { label: 'Deploy to Production', sublabel: 'SSH → docker pull → docker run — zero downtime', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', icon: '🚀', status: '✅' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">CI/CD Pipeline — Code Push to Production</p>
      <div className="max-w-lg mx-auto space-y-2">
        {stages.map((stage, i) => (
          <div key={i} className="relative">
            <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: stage.bg, border: `1px solid ${stage.border}` }}>
              <span className="text-lg">{stage.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: stage.color }}>{stage.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{stage.sublabel}</p>
              </div>
              <span className="text-sm">{stage.status}</span>
            </div>
            {i < stages.length - 1 && (
              <div className="flex justify-center py-0.5">
                <span className="text-[#71717A] text-xs">↓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

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
          Expert Mindset — Junior aur Senior Mein Kya Fark Hota Hai?
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Tumhe ek shocking sachai bataata hoon — <strong className="text-[#F5F5F7]">Senior engineer woh nahi hota jo sabse zyada code jaanta hai. Senior engineer woh hota hai jo sahi sawaal poochhta hai, trade-offs samajhta hai, aur dusron ko better banata hai.</strong> Code likhna toh junior bhi karta hai. Systems mein sochna, ambiguity mein decisions lena, failures se gracefully recover karna — ye senior hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ye NodeMaster ka final chapter hai. Lekin yaar, ye end nahi — ye shuruwaat hai. Is chapter mein senior mindset, design patterns, observability, career growth, aur architecture decisions — woh sab cheezein jo curriculum mein nahi hoti lekin career mein sabse zyada matter karti hain. Keep building, keep learning, keep sharing.
        </p>
      </div>

      <CiCdPipelineDiagram />

      {/* ConceptCard 1: Senior Mindset */}
      <div id="senior-mindset">
        <ConceptCard
          title="Senior Engineer Ka Mindset"
          emoji="🧠"
          difficulty="advanced"
          whatIsIt="Junior developer sochta hai: 'Is problem ka solution kya hai?' Senior developer sochta hai: 'Is problem ka solution kya hai, iska downstream impact kya hoga, kya ye future mein scale karega, kaunsi trade-offs hain, team kya samjhegi, aur kya hum actually sahi problem solve kar rahe hain?' Ye different thinking hai — ek dimension nahi, multiple dimensions simultaneously. Ye skill hai, magical power nahi — develop ho sakti hai."
          whenToUse={[
            'Architecture decision lene se pehle — options list karo, trade-offs write karo',
            'Code review dete waqt — empathetic, specific, actionable feedback',
            'Estimation dete waqt — range do, unknowns explicitly state karo',
            'Unknown problem face karo — systematically break down karo, assumptions state karo',
          ]}
          whyUseIt="Junior aur senior mein yahi fark hai — junior code likhta hai, senior systems design karta hai. Ek real example: junior 'Redis add karo, performance improve ho jaayegi' bolta hai. Senior poochhta hai: 'Kahan bottleneck hai? DB hai? Network hai? CPU hai? Pehle measure karo, phir decide karo.' Premature optimization avoid karna, root cause dhundna — ye mindset 10x impact deta hai."
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
            explanation: 'Senior mindset practice se aata hai. Intentional practice karo: aaj se har architecture decision par ek choti list banao — option A, option B, trade-offs, chosen option, why. 6 months baad ye lists padho. Growth clearly dikhai degi. Code review mein empathy practice karo — "Could we..." instead of "You must...". Systems diagrams draw karo — whiteboards ka use karo, sochna visual hone se clear hota hai.',
          }}
          realWorldScenario="Junior developer ne Redis cache implement kiya bina invalidation ke. Senior engineer ne code review mein likha: 'Great caching implementation! One thing to consider — when user updates their profile, this cache might serve stale data for up to 5 minutes. Could we add cache invalidation in the update handler? Here is one approach...' Specific, constructive, educational, empathetic. Junior ne seekha, bura nahi laga, code improve hua. Ye senior ka asli kaam hai — code fix karna nahi, engineers build karna."
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
          proTip="Ek habit adopt karo aaj se — daily 5 minute 'engineering journal'. Kya challenge aaya, kya decide kiya, kya seekha. 6 months baad padho — growth clearly dikhai degi. Failures bhi write karo — failure se seekhna fast track hai. Jo engineers fail karte hain aur usse process karte hain, woh sabse tezi se grow karte hain."
        />
      </div>

      {/* Akshay-style Q&A interlude */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <p className="text-[#F5F5F7] font-semibold mb-2">Ab sawaal ye aata hai...</p>
        <p className="text-[#A1A1AA] leading-relaxed">
          "Senior mindset samajh aa gaya. Lekin practically code mein kaun se patterns use karein?" Design patterns — ye wo shared vocabulary hai jo engineers ke beech communication fast karta hai. "Repository pattern use kiya hai" — ek sentence mein architecture explain ho jaata hai. Patterns ratta maarne ke liye nahi hain, problems solve karne ke liye hain. Chalo dekhte hain.
        </p>
      </div>

      {/* ConceptCard 2: Design Patterns */}
      <div id="design-patterns">
        <ConceptCard
          title="Design Patterns in Node.js"
          emoji="🏛️"
          difficulty="advanced"
          whatIsIt="Design patterns — 1994 mein Gang of Four (GoF) ne 23 recurring problems aur unke battle-tested solutions document kiye. Ye universal vocabulary ban gaya software engineers ke liye. Repository: data access abstract karo. Strategy: runtime par algorithm swap karo. Observer: event-driven loose coupling. Patterns problems se aate hain — pehle problem samjho, phir pattern recognize karo."
          whenToUse={[
            'Repository pattern — data access business logic se alag karo, DB swap easy ho',
            'Factory pattern — object creation centralize karo — agar creation complex hai',
            'Strategy pattern — runtime par algorithm swap karo — payment gateway, sorting, validation',
            'Observer pattern — event-driven loose coupling — ek event, multiple independent handlers',
          ]}
          whyUseIt="Testing ka seedha fayda — Repository interface ke peeche DB swap karo. PrismaUserRepository production mein, MockUserRepository tests mein — same interface, alag implementation. Tests mein real DB nahi chahiye, mocks se kaam chalta hai. Strategy pattern se A/B testing easy — user.country === 'IN' ? RazorpayPayment() : StripePayment(). Runtime decision, zero if-else chains in business logic."
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
            explanation: 'Repository pattern ka power: interface define karo (IUserRepository), implementations alag karo (PrismaUserRepository, MockUserRepository). Business logic (UserService) sirf interface ke saath baat karta hai — implementation ko jaanta nahi. Test mein MockUserRepository inject karo — zero DB calls, blazing fast tests. Strategy pattern: PaymentService sirf PaymentStrategy interface jaanta hai — Stripe ya Razorpay? Caller decide karta hai.',
          }}
          realWorldScenario="SaaS app mein MongoDB se PostgreSQL migrate karna tha. Repository pattern already implement tha. Sirf PostgresUserRepository banaya, IUserRepository implement kiya — findById, save, delete, sab. Dependency injection se swap kiya. Business logic code — zero changes. Service code — zero changes. Test code — zero changes. Ek weekend mein migration done. Bina pattern ke? Weeks of refactoring. Pattern ne ROI 100x diya."
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
          proTip="Gang of Four ki original 'Design Patterns' book padho — 23 patterns, timeless wisdom. Node.js specific ke liye Mario Casciaro ki 'Node.js Design Patterns' best resource hai. Yaad rakho: pattern problem se aata hai. Pehle problem clearly samjho, phir natural fit dhundo. Pattern force mat karo — over-engineered code maintenance nightmare hai."
        />
      </div>

      {/* ConceptCard 3: Observability */}
      <div id="observability">
        <ConceptCard
          title="Observability — App Ka X-Ray"
          emoji="📊"
          difficulty="advanced"
          whatIsIt="Observability — ye word NASA se aaya hai. 'Can we infer the internal state from external outputs?' Bina observability ke tumhara production app ek black box hai — andar kya ho raha hai pata nahi. Teen pillars: Logs (kya hua — narrative), Metrics (kitna aur kaisa — numbers), Traces (request kahan gayi — journey). Teeno ek saath — 3 AM incident mein tum detective ho, guessing nahi karte."
          whenToUse={[
            'Production bug investigate karo — logs se timeline reconstruct karo',
            'Performance anomaly detect karo — metrics se proactive alerts, user complaint se pehle',
            'Request slow kyun — distributed trace se exact bottleneck identify karo, microsecond level',
            'Business health track karo — error rate badha? Conversion gira? Metrics batayenge',
          ]}
          whyUseIt="Bina observability — 3 AM ko production down hai. Kya hua? Guessing game. Timeout? Memory? DB? Ek service? Sab services? 2 ghante troubleshoot. Observability ke saath — error.message filter karo, requestId se poori request ki trace dekho, kaunsi service slow thi exactly millisecond mein. 10 minute mein root cause. Observability engineers ki neend bachata hai."
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
            explanation: 'Trace karo: har request pe requestId generate karo (crypto.randomUUID()). Pino child logger banao — logger.child({requestId}). Ab ek request ki sari logs ek requestId se filter ho jaayengi. Metrics endpoint /metrics Prometheus scrape karega, Grafana dashboard banao — real-time graphs. Alert set karo: error rate > 1% → PagerDuty alert. Ye complete observability stack hai.',
          }}
          realWorldScenario="Payment service mein timeout errors 2 AM ko. Pino structured logs + Datadog: error.message: 'Connection timeout' filter kiya — 95% errors ek specific payment gateway IP se. OpenTelemetry trace dekha — exact millisecond par timeout ho raha tha — gateway rate limit. Fix: exponential retry + circuit breaker. Root cause 10 minute mein. Bina observability ke 2 weeks ka debugging hota — assumptions, guesses, SSH sessions. Observability is the difference between engineering and guessing."
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
          proTip="OpenTelemetry — ye future hai. Vendor-neutral SDK — ek baar instrument karo, Jaeger/Zipkin/Datadog/Honeycomb kisi pe bhi bhejo. @opentelemetry/auto-instrumentations-node ek package hai — Express, Prisma, Redis, HTTP sab automatically trace hote hain. Zero manual instrumentation. Ye foundation rakho ab — later vendor choose karo."
        />
      </div>

      {/* ConceptCard 4: Career Growth */}
      <div id="career-growth">
        <ConceptCard
          title="Career Growth — Senior tak Kaise Pahuncho?"
          emoji="🚀"
          difficulty="advanced"
          whatIsIt="Ek harsh truth: sirf coding karne se career slow grow karta hai. Visible kaam karna — build in public, blog likho, open source contribute karo — career exponentially accelerate karta hai. Ek GitHub repo jo 500 stars le, ek blog post jo viral ho, ek conference talk — ye resume se zyada powerful hain. 'Show don't tell' — claims mat karo, kaam dikhaao."
          whenToUse={[
            'Career plateau feel ho — visible work, naya challenge visible karein',
            'Job change karna hai — portfolio chahiye sirf CV se zyada',
            'Senior promotion — leadership, mentoring, aur community impact demonstrate karo',
            'Network build karna — community mein active log best opportunities pehle paate hain',
          ]}
          whyUseIt="Bina visibility ke — aaj tum Node.js expert ho, lekin duniya ko pata nahi. Recruiter ko LinkedIn profile milti hai — koi standout cheez nahi. GitHub contributions milti hai — koi public work nahi. Interview mein 'experienced engineer' claim karte ho — proof? Visibility proof hai. Blog post, open source, talk — ye claimable proof hain. Consistent karo — din mein 30 minutes bhi kaafi hai."
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
            explanation: 'Consistency beats intensity — har jagah. 30 minutes daily > 5 hours weekend. Public learning mein accountability milti hai — tweet karo "aaj ye seekha" — log engage karte hain, tum accountable rehte ho. Failures share karo bhi — "maine ye mistake ki aur ye seekha" — ye posts viral hote hain, relatability se trust banta hai. Perfect hone ka wait mat karo — aaj start karo.',
          }}
          realWorldScenario="Developer ne ek Node.js rate limiting utility likhi jab existing libraries ek specific use case cover nahi karte thi. GitHub par publish kiya. Pehle week: 50 stars. 6 months: 2000+ stars, npm pe weekly 5000 downloads. Recruiter ne GitHub explore pe dekha — email kiya directly: 'We are looking for Node.js engineers, impressed by your work.' Teen job offers — bina job hunting ke. Open source genuinely career-changing hota hai. Ye koi fluke nahi — ye visibility ki power hai."
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
          proTip="Tiago Forte ka 'Second Brain' concept try karo — Obsidian ya Notion mein sab notes karo. Pipeline banao: Learn → Note → Blog post → Conference talk. Ek concept 4 baar process karo — depth extraordinary ho jaati hai. First talk dene ke baad log tumhe 'expert' perceive karte hain us topic par. Perception reality banata hai."
        />
      </div>

      {/* ConceptCard 5: Architecture Decisions */}
      <div id="architecture-decisions">
        <ConceptCard
          title="Architecture Decisions & ADRs"
          emoji="📐"
          difficulty="advanced"
          whatIsIt="ADR (Architecture Decision Record) ek short but powerful document hai — ek architecture decision ka snapshot. Context: kyun decide karna pada. Options: kya-kya socha. Decision: kya choose kiya. Consequences: aage kya hoga. Ye document code ke saath version control mein rehta hai — future mein 'ye MongoDB kyun choose kiya tha?' ka jawab milta hai bina detective work ke."
          whenToUse={[
            'Major technology choice — PostgreSQL vs MongoDB, REST vs gRPC',
            'Architectural pattern adopt karo — microservices vs modular monolith',
            'Significant trade-off accept karo — consistency vs availability, speed vs correctness',
            'Non-obvious decisions jahan future team members poochh sakein — kyun?',
          ]}
          whyUseIt="6 months baad code dekhte hain, ek khaas decision samajh nahi aata. Original developer se poochho — 'kuch yaad nahi, PR comments dhundo'. PR comments archive mein kho gaye, Slack history expire ho gayi. ADR hota toh — docs/adr/005-chose-mongodb.md — context, options, reasoning sab preserved. Naya CTO join kiya, onboarding 3 weeks — ADRs hain toh 3 days. Knowledge transfer ka most undervalued tool."
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
            explanation: 'ADR template follow karo: Status (Proposed/Accepted/Deprecated), Context (problem), Options (A vs B vs C with pros/cons), Decision (chosen option + reasoning), Consequences (positive + negative). docs/adr/001-database-choice.md — numbered, short, to the point. 1-2 pages max. Code ke saath git mein — decision evolve karna hai toh ADR update karo ya naya ADR likho (old deprecated karo).',
          }}
          realWorldScenario="Fintech startup mein new CTO join kiya. Codebase mein microservices tha jab monolith expected tha, event sourcing tha jab simple CRUD expected tha. Koi documentation nahi — 3 weeks poochh-poochh ke context gather kiya. Baad mein ADRs implement kiye. Agla hire join kiya — 2 din mein sab architectural decisions ki reasoning samajh aayi. Unedit CTO ka onboarding 3 weeks se 3 days. Knowledge as competitive advantage."
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
          proTip="adr-tools CLI install karo — adr new 'Use PostgreSQL as primary database' ek command se template generate hoti hai. GitHub PR workflow mein ADR link karo — major architectural PR ke saath ADR required. Merge hone pe decision finalized. Architecture as code — code aur decisions dono version controlled, dono reviewable."
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
          NodeMaster Complete! Ab Asli Kaam Shuru Hota Hai!
        </h3>
        <p className="text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto mb-4">
          Yaar, tumne poora Node.js journey complete kiya — event loop se lekar microservices tak, security se lekar zero-downtime deployment tak. Ye cheezein bahut log jaante hain theory mein. Tum ab apply kar sakte ho — ye sabse badi difference hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto">
          Ab sawaal ye aata hai — "Aage kya?" Ek real project banao. Ek problem dhundo jo tumhe personally affect karti hai, aur usse solve karo Node.js se. Ship karo. Break karo. Fix karo. Learn karo. Fir repeat karo. Expert ban jaana time ki baat hai — ye foundation tumhare paas hai. Baaki journey tumhara wait kar rahi hai. Keep building!
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
