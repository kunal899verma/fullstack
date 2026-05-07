'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const microservicesQuiz = [
  {
    question: 'Microservices kab adopt karna chahiye?',
    options: [
      { text: 'Har naye project ke liye — always better hai', correct: false, explanation: 'Microservices complexity add karte hain — small teams ke liye monolith better hota hai initially.' },
      { text: 'Jab monolith genuinely pain points de raha ho — scale, deployment, team size', correct: true, explanation: 'Sahi! "Monolith first" approach follow karo. Jab team 20+ ho ya scaling issues aayein, tab microservices consider karo.' },
      { text: 'Sirf Kubernetes use karne ke liye', correct: false, explanation: 'Kubernetes orchestration tool hai — microservices requirement nahi hai.' },
      { text: 'Jab database slow ho', correct: false, explanation: 'Slow database ke liye optimization karo — microservices is problem ka solution nahi.' },
    ],
  },
  {
    question: 'BullMQ mein job retry strategy kya kaam aati hai?',
    options: [
      { text: 'Failed jobs automatically delete ho jaate hain', correct: false, explanation: 'BullMQ failed jobs retry karta hai — configurable attempts aur backoff ke saath.' },
      { text: 'Failed jobs configurable attempts aur exponential backoff ke saath retry hote hain', correct: true, explanation: 'Bilkul sahi! attempts: 3, backoff: { type: exponential, delay: 1000 } se retry behavior control hota hai.' },
      { text: 'Sirf manual retry possible hai', correct: false, explanation: 'BullMQ automatic retry support karta hai — manual bhi possible hai.' },
      { text: 'Jobs hamesha infinite retry hote hain', correct: false, explanation: 'Attempts set karo — uske baad job failed state mein jaata hai.' },
    ],
  },
  {
    question: 'API Gateway ka primary role kya hai?',
    options: [
      { text: 'Database queries optimize karna', correct: false, explanation: 'API Gateway routing aur cross-cutting concerns handle karta hai, DB nahi.' },
      { text: 'Single entry point — routing, auth, rate limiting, load balancing', correct: true, explanation: 'Correct! Clients directly services se baat nahi karte — Gateway centralized control deta hai.' },
      { text: 'Microservices deploy karna', correct: false, explanation: 'Deployment CI/CD handle karta hai — Gateway routing ke liye hai.' },
      { text: 'Data transform karna', correct: false, explanation: 'BFF (Backend for Frontend) pattern data transform karta hai — basic Gateway sirf route karta hai.' },
    ],
  },
  {
    question: 'Service-to-service communication ke liye gRPC REST se kab better hai?',
    options: [
      { text: 'Jab browser clients ho', correct: false, explanation: 'gRPC browser se directly use mushkil hai (grpc-web needed). REST browser-native hai.' },
      { text: 'Internal microservices communication mein — low latency, binary protocol, streaming', correct: true, explanation: 'Sahi! gRPC binary protocol hai — REST se 5-7x faster internal calls ke liye. Streaming bhi support karta hai.' },
      { text: 'Jab JavaScript use karna ho sirf', correct: false, explanation: 'gRPC polyglot hai — multiple languages support karta hai.' },
      { text: 'Public APIs ke liye always', correct: false, explanation: 'Public APIs ke liye REST ya GraphQL prefer karo — wider tooling aur documentation support.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Chapter21Content() {
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
          Microservices — Cool Lagta Hai, Lekin Kab Sahi Hai?
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Microservices sunne mein cool lagta hai. Netflix microservices use karta hai, Amazon microservices use karta hai, toh tumhe bhi pehle din se microservices banana chahiye? <strong className="text-[#F5F5F7]">Lekin Netflix bhi monolith se shuru hua tha. Amazon bhi monolith tha 2001 mein.</strong> Toh kab split karo? Ye sabse important question hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Microservices ek badi app ko chhote, independent pieces mein todna hai — har piece alag deploy hota hai, alag scale hota hai, alag team own karti hai. Lekin is power ke saath aata hai distributed system complexity — network failures, distributed transactions, service discovery, operational overhead. Is chapter mein trade-offs samjhenge, communication patterns dekhenge, BullMQ se async queues banayenge, aur API Gateway architecture samjhenge.
        </p>
      </div>

      {/* ConceptCard 1: Microservices vs Monolith */}
      <div id="vs-monolith">
        <ConceptCard
          title="Microservices vs Monolith"
          emoji="🏗️"
          difficulty="advanced"
          whatIsIt="Monolith socho ek badi factory ki tarah — sab kuch ek chhatt ke neeche, ek codebase, ek deployment, ek database. Microservices socho ek industrial zone ki tarah — alag-alag factories (services), har ek apna kaam, apna godown (database), apni team. Conway's Law kehta hai: 'Organizations design systems that mirror their communication structure.' Matlab — agar 3 alag teams hain, naturally 3 services ban jaati hain."
          whenToUse={[
            'Shuru karo monolith se — premature microservices ek guaranteed failure recipe hai',
            'Team 15-20+ ho gayi aur ek codebase mein conflicts roz ho rahe hain — tab split karo',
            'Specific component ko 10x scale karna ho — payment service peak traffic par — tab isolate karo',
            'Different teams ko different technology stack chahiye — Python ML service, Node.js API — tab separate karo',
          ]}
          whyUseIt="Microservices ke genuine fayde: independent deployment (payment team deploy kare bina user team ke), independent scaling (search service 50x scale karo, auth service chhod do), fault isolation (ek service crash kare toh baaki alive rehein). Nuksan: network latency, distributed transactions (nightmare!), service discovery, 3x operational complexity. Rule of thumb: monolith pehle, microservices jab genuinely needed ho."
          howToUse={{
            filename: 'architecture-decision.md',
            language: 'markdown',
            code: `# Monolith vs Microservices Decision Guide

## Monolith Raho Jab:
- Team < 15 engineers
- Product-market fit abhi dhundh rahe ho
- Deployment frequency kam hai
- Domain boundaries clear nahi hain
- Startup phase — speed > architecture

## Microservices Consider Karo Jab:
- Team 15+ hai aur alag teams conflict kar rahi hain
- Specific parts ko independently scale karna hai
- Different services ko alag technology chahiye
- Deploy karna slow hai (monolith build 20+ minutes le raha hai)
- Regulatory reasons — PCI-DSS (payment isolation)

## Trade-offs Table:
| Feature           | Monolith    | Microservices |
|-------------------|-------------|---------------|
| Complexity        | Low         | High          |
| Deployment        | Simple      | Complex       |
| Scaling           | All-or-none | Granular      |
| Team autonomy     | Low         | High          |
| Transaction mgmt  | Simple ACID | Distributed   |
| Debugging         | Easy        | Hard          |
| Initial speed     | Fast        | Slow          |

## Martin Fowler: "Monolith First"
Pehle monolith banao. Domain boundaries samjho.
Phir extract karo microservices jab genuinely needed ho.`,
            explanation: 'Sam Newman, Building Microservices ke author, kehte hain: "Microservices are not a free lunch." Pehle domain boundaries crystal clear honi chahiye — wrong boundary pe split karo toh "distributed monolith" banta hai — microservices ki complexity + monolith ki coupling. Worst of both worlds! Modular monolith ek achha middle ground hai — ek codebase, lekin well-separated modules. Agar kabhi split karna ho toh modules already clean hain.',
          }}
          realWorldScenario="StackOverflow 2023 tak monolith tha — 60 million+ users serve karta tha, billions of page views, confidently. Amazon 2001 mein full monolith tha, 2006 mein microservices adopt kiye — kyunki teams 10,000+ developers ho gayi thi, deployment conflicts daily. Dono companies ne right decision liya right time par. Lesson: technology choice context pe depend karta hai, hype pe nahi."
          commonMistakes={[
            {
              mistake: 'Day 1 se microservices — premature optimization',
              why: 'Bina domain knowledge ke services split karo toh wrong boundaries bante hain — baad mein refactor bahut costly hota hai.',
              fix: 'Monolith mein well-separated modules banao pehle. Boundaries clear hone par extract karo. "Modular monolith" middle ground hai.',
            },
            {
              mistake: 'Shared database across microservices',
              why: 'Services tightly coupled ho jaate hain — ek ki schema change dusre ko break karti hai. Microservices ka point khatam.',
              fix: 'Har service ka apna database hona chahiye — "database per service" pattern. Data share karne ke liye events use karo.',
            },
          ]}
          proTip="Inverse Conway Maneuver — ye concept powerful hai. Pehle decide karo teams kaise organize hongi, phir services naturally wahi shape lenge. Agar teen product teams hain, teen services bano. 'Team Topologies' book padho — ye software architecture nahi, organizational design hai. Architecture aur team structure ek doosre ko drive karte hain."
        />
      </div>

      {/* Akshay-style Q&A interlude */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <p className="text-[#F5F5F7] font-semibold mb-2">Ab sawaal ye aata hai...</p>
        <p className="text-[#A1A1AA] leading-relaxed">
          "Theek hai services split kar li — ab ek service doosri se kaise baat kare?" Ye microservices ki sab se interesting challenge hai. Ek phone call ki tarah REST — synchronous, tum wait karte ho reply ka. Ya ek message box ki tarah queue — tum message chhod do, woh apne time par process kare. Dono ke use cases alag hain. Galat choose karna cascading failures ki recipe hai.
        </p>
      </div>

      {/* ConceptCard 2: Communication Patterns */}
      <div id="communication">
        <ConceptCard
          title="Communication Patterns"
          emoji="📡"
          difficulty="advanced"
          whatIsIt="Services ke beech communication do tarah ki hoti hai. Synchronous — ek phone call ki tarah, ek service doosri ko call karta hai aur wait karta hai response ka (REST, gRPC). Asynchronous — ek letter box ki tarah, service message chhod ke chali jaati hai, doosri service apni marzi se process karti hai (BullMQ, RabbitMQ, Kafka). REST simple hai, gRPC internal calls ke liye 5-7x faster hai, message queues loosely coupled systems ke liye perfect hain."
          whenToUse={[
            'REST — browser clients, public APIs, simple CRUD — wide tooling support',
            'gRPC — internal service-to-service, streaming needed, latency critical — binary, fast',
            'Message queue (BullMQ) — async tasks, email, notifications, retry logic needed',
            'Event streaming (Kafka) — audit logs, event sourcing, real-time analytics, high volume',
          ]}
          whyUseIt="Synchronous chaining ka khatra — A REST call karta hai B, B REST call karta hai C, C REST call karta hai D. D slow hai? Sab slow. D down hai? Sab fail. Cascading failure! Async events se — A event publish karta hai 'order.created', B aur C independently subscribe karte hain. B down hai? C still works. A ko pata bhi nahi chalta. Loose coupling = resilience. Ye microservices architecture ka core insight hai."
          howToUse={{
            filename: 'communication-patterns.ts',
            language: 'typescript',
            code: `// ── Pattern 1: REST (simple, synchronous) ─────────────────────────────────
import axios from 'axios'

async function getUserFromUserService(userId: string) {
  const response = await axios.get(
    \`\${process.env.USER_SERVICE_URL}/users/\${userId}\`,
    { timeout: 5000 } // Timeout hamesha set karo!
  )
  return response.data
}

// ── Pattern 2: gRPC (internal, high performance) ───────────────────────────
// proto/user.proto:
// service UserService {
//   rpc GetUser (UserRequest) returns (UserResponse);
//   rpc StreamUsers (Empty) returns (stream UserResponse);
// }

import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

const packageDef = protoLoader.loadSync('./proto/user.proto')
const proto = grpc.loadPackageDefinition(packageDef) as any

const userClient = new proto.UserService(
  process.env.USER_SERVICE_GRPC,
  grpc.credentials.createInsecure()
)

function getUserGRPC(userId: string): Promise<UserResponse> {
  return new Promise((resolve, reject) => {
    userClient.getUser({ userId }, (err: Error, response: UserResponse) => {
      if (err) reject(err)
      else resolve(response)
    })
  })
}

// ── Pattern 3: Event-Driven (loose coupling) ───────────────────────────────
// Order service event publish karta hai
// Email service, inventory service independently consume karte hain

// Publisher (Order Service)
await redis.publish('order:created', JSON.stringify({
  orderId: '123',
  userId: 'abc',
  amount: 999,
  timestamp: new Date().toISOString(),
}))

// Subscriber (Email Service — independent)
await redis.subscribe('order:created', (message) => {
  const order = JSON.parse(message)
  sendOrderConfirmationEmail(order)
})`,
            explanation: 'Critical rule: REST calls mein hamesha timeout set karo — timeout: 5000. Bina timeout ke ek slow downstream service poori chain indefinitely hang kar sakti hai. Circuit breaker pattern (opossum library) use karo — agar inventory service 5 consecutive failures de, circuit "open" ho jaata hai, fallback function call hota hai. 30 second baad "half-open" — phir try karo. Ye pattern real electrical circuit breaker ki tarah kaam karta hai.',
          }}
          realWorldScenario="Payment service inventory service ko synchronous REST se stock check karta tha. Inventory service ek din slow ho gayi — DB maintenance. Payment service hang hone laga, users checkout nahi kar paaye. Business loss! Solution: inventory data async event se cache mein rakha — 'inventory.updated' event aata hai, Redis cache update hota hai. Payment service ab cache se check karta hai — milliseconds mein, inventory service chahe down bhi ho. Ek architecture change ne cascading failure eliminate ki."
          commonMistakes={[
            {
              mistake: 'Synchronous chained calls across multiple services',
              why: 'A → B → C → D — ek bhi service slow ya down, puri chain fail. Latency add hoti hai multiplicatively.',
              fix: 'Async messaging use karo jahan possible ho. Circuit breaker (opossum library) add karo sync calls mein fallback ke liye.',
            },
            {
              mistake: 'Event schema versioning ignore karna',
              why: 'Event format change karo — old consumers break ho jaate hain. Distributed system mein blue-green deploy impossible.',
              fix: 'Events versioned rakho — v1/order:created, v2/order:created. Backward compatible changes prefer karo.',
            },
          ]}
          proTip="Distributed transactions — ye microservices ka hardest problem hai. ACID transactions ek service boundary ke andar kaam karte hain — across services nahi. Saga pattern use karo: har step ek local transaction hai, failure pe compensating transaction (rollback equivalent) trigger hota hai. 'Order placed → Inventory reserve → Payment charge → Confirm' — agar Payment fail toh 'Inventory release' compensating transaction. Eventual consistency accept karo, it's a trade-off."
        />
      </div>

      {/* ConceptCard 3: BullMQ */}
      <div id="bullmq">
        <ConceptCard
          title="BullMQ — Job Queues"
          emoji="🐂"
          difficulty="advanced"
          whatIsIt="BullMQ ek job queue hai jisme tum kaam daalo aur workers utha ke karte hain — apni speed se, retry ke saath, fail hone par dobara try karte hain. Redis iska backbone hai — jobs persist rehti hain server restart ke baad bhi. Producer (kaam daalne wala) aur Worker (kaam karne wala) alag-alag processes mein ho sakte hain. Order place hone par 5 background jobs — confirmation email, inventory update, analytics, invoice PDF, warehouse notify — sab parallel, sab retry-safe."
          whenToUse={[
            'Email/SMS sending — user ko block mat karo, queue mein daalo, async bhejo',
            'Image/video processing — CPU-intensive kaam background mein bhejo',
            'Report generation — Excel, PDF generation — polling endpoint do user ko',
            'Rate-limited API calls — AI APIs, payment gateways — queue se controlled throughput',
          ]}
          whyUseIt="Sochte ho ek simple question: order place hone par email kyon user wait kare? Email server temporarily down hai toh order fail ho jaaye? BullMQ se: order place hone par job queue mein daalo, user ko instant success response do, background mein email send karo — fail hone par 3 baar retry karo (1s, 2s, 4s exponential). User happy, email reliable. Redis persistence se server restart par bhi jobs nahi jaati. Ye production-grade async processing hai."
          howToUse={{
            filename: 'bullmq-setup.ts',
            language: 'typescript',
            code: `import { Queue, Worker, QueueEvents } from 'bullmq'
import { createClient } from 'redis'

const connection = { host: 'localhost', port: 6379 }

// ── Producer — Job Add Karo ─────────────────────────────────────────────────
const emailQueue = new Queue('email-notifications', { connection })

async function sendWelcomeEmail(userId: string, email: string) {
  await emailQueue.add(
    'welcome-email', // Job name
    { userId, email },
    {
      attempts: 3,               // 3 bar try karo
      backoff: {
        type: 'exponential',
        delay: 1000,             // 1s, 2s, 4s wait karo retries mein
      },
      priority: 1,              // High priority (1 = highest)
      delay: 5000,              // 5 seconds delay (optional)
    }
  )
}

// ── Worker — Job Process Karo ──────────────────────────────────────────────
const emailWorker = new Worker(
  'email-notifications',
  async (job) => {
    console.log(\`Processing job \${job.id}: \${job.name}\`)

    if (job.name === 'welcome-email') {
      const { userId, email } = job.data
      await sendEmail({
        to: email,
        subject: 'Welcome to NodeMaster!',
        template: 'welcome',
        data: { userId },
      })
    }

    // Job completion progress update
    await job.updateProgress(100)
    return { sent: true, timestamp: new Date().toISOString() }
  },
  {
    connection,
    concurrency: 5, // 5 emails simultaneously
  }
)

// ── Event Listeners ────────────────────────────────────────────────────────
const queueEvents = new QueueEvents('email-notifications', { connection })

queueEvents.on('completed', ({ jobId, returnvalue }) => {
  console.log(\`Job \${jobId} completed:\`, returnvalue)
})

queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.error(\`Job \${jobId} failed: \${failedReason}\`)
  // Alert karo — Slack, email, etc.
})

// ── Scheduled Jobs (Cron) ──────────────────────────────────────────────────
await emailQueue.add(
  'daily-digest',
  { type: 'daily-summary' },
  {
    repeat: { pattern: '0 9 * * *' }, // Daily 9 AM
    jobId: 'daily-digest-cron', // Unique ID for deduplication
  }
)`,
            explanation: 'Trace karo: emailQueue.add() — job Redis mein store hoti hai. Worker independently running hai — job milti hai, process karta hai. Fail? attempts: 3, backoff: exponential — 1s baad retry, 2s baad, 4s baad. Teen baar fail? failed state mein jaati hai — Bull Board UI mein dikhai deti hai, manually retry kar sakte ho. Job data Redis mein hai — server restart ke baad bhi wahan milegi. Ye reliability hai jo simple setInterval kabhi de nahi sakta.',
          }}
          realWorldScenario="E-commerce order processing: order place hone par ek baar 200ms mein user ko success. Background mein 5 jobs parallel: confirmation email (priority 1), inventory update, warehouse notification, analytics event, invoice PDF generation. Sab retry ke saath, sab independent. Email server down? Email job retry karta hai — baaki 4 jobs normally complete. User ko kya pata chala? Kuch nahi — seamless experience. Ye mature engineering hai."
          commonMistakes={[
            {
              mistake: 'Worker mein unhandled errors throw karna bina try-catch ke',
              why: 'Uncaught error se job permanently failed state mein jaata hai — no retry. Worker crash bhi ho sakta hai.',
              fix: 'Worker function mein try-catch use karo. Error throw karo properly — BullMQ retry handle karega. Idempotent jobs banao.',
            },
            {
              mistake: 'Job data mein large objects store karna',
              why: 'Job data Redis mein store hoti hai — large objects memory waste karte hain aur serialization slow hoti hai.',
              fix: 'Job data mein sirf IDs store karo — worker DB se fetch kare. Large payloads ke liye S3/GCS reference store karo.',
            },
          ]}
          proTip="Idempotency — ye word yaad karo. Agar job twice run ho (network glitch, crash) toh kya hoga? Email twice jaayega? Payment twice charge hoga? Idempotent worker matlab — same job twice run karo, same result. Order confirmation email ke liye: pehle check karo email already bheja tha? Nahi bheja toh bhejna. Ye safeguard production mein bahut important hai — lockDuration: 30000 se stalled jobs bhi handle hote hain."
        />
      </div>

      {/* ConceptCard 4: API Gateway */}
      <div id="api-gateway">
        <ConceptCard
          title="API Gateway Pattern"
          emoji="🚪"
          difficulty="advanced"
          whatIsIt="API Gateway ek mall ka main entrance hai. Mall mein 50 shops hain (microservices) — lekin customer ko har shop ka address yaad nahi rakhna padta. Entrance pe security check hoti hai (auth), rules hain (rate limiting), aur signs hain (routing). Gateway single entry point hai — clients ek URL se baat karte hain, Gateway andar route karta hai sahi service par. Authentication, logging, SSL — sab yahan hota hai, har service mein duplicate nahi."
          whenToUse={[
            'Multiple microservices ko ek clean URL /api/v1/* se expose karna ho',
            'Centralized auth — har service mein JWT verification duplicate mat karo',
            'Rate limiting aur request throttling — ek jagah, applies to all',
            'API versioning — /v1/ aur /v2/ simultaneously serve karna',
          ]}
          whyUseIt="Bina Gateway ke: mobile app ko 8 service URLs yaad rakhne padte hain, har ek change pe app update karo. Security concerns — auth, rate limiting — har service mein implement karo. Ek service ka IP change karo — client code update karo. Gateway se: single URL, everything behind it is opaque. Cross-cutting concerns (auth, logging, rate limit) ek jagah change karo — sab services ko milta hai. This is the power of indirection."
          howToUse={{
            filename: 'api-gateway.ts',
            language: 'typescript',
            code: `import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import jwt from 'jsonwebtoken'

const app = express()

// ── Service Registry ────────────────────────────────────────────────────────
const services: Record<string, string> = {
  users: process.env.USER_SERVICE_URL ?? 'http://user-service:3001',
  orders: process.env.ORDER_SERVICE_URL ?? 'http://order-service:3002',
  payments: process.env.PAYMENT_SERVICE_URL ?? 'http://payment-service:3003',
}

// ── Auth Middleware ─────────────────────────────────────────────────────────
function authenticate(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) return res.status(401).json({ error: 'Auth required' })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!)
    req.headers['x-user-id'] = (payload as any).userId
    req.headers['x-user-role'] = (payload as any).role
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// ── Rate Limiting ───────────────────────────────────────────────────────────
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})

// ── Routes — Proxy to Services ──────────────────────────────────────────────
app.use('/api/v1/users', limiter, authenticate, createProxyMiddleware({
  target: services.users,
  changeOrigin: true,
  pathRewrite: { '^/api/v1/users': '/users' },
}))

app.use('/api/v1/orders', limiter, authenticate, createProxyMiddleware({
  target: services.orders,
  changeOrigin: true,
  pathRewrite: { '^/api/v1/orders': '/orders' },
}))

// Public routes — auth nahi chahiye
app.use('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', services: Object.keys(services) })
})

app.listen(3000, () => console.log('API Gateway running on :3000'))`,
            explanation: 'Architecture trace karo: client request /api/v1/users/123 → Gateway → authenticate() middleware → JWT verify → x-user-id header set → http-proxy-middleware → user-service:3001/users/123. User service ko JWT verify nahi karna — sirf x-user-id header trust karo (internal network mein safe). Gateway thin rakho — routing, auth, rate limit. Business logic services mein.',
          }}
          realWorldScenario="Fintech app mein 8 microservices alag-alag ports par chal rahe the. Mobile app codebase mein 8 different URLs, 8 separate auth implementations, 8 rate limiters. API Gateway add kiya — sab kuch /api/v1/* ke peeche. Auth ek jagah, logging ek jagah, rate limiting ek jagah. Mobile app ka network code 40% reduce hua. New service add karna? Sirf Gateway config mein ek line — koi client update nahi."
          commonMistakes={[
            {
              mistake: 'Business logic Gateway mein dalna',
              why: 'Gateway thin hona chahiye — sirf routing, auth, rate limiting. Business logic services mein honi chahiye.',
              fix: 'Gateway mein sirf cross-cutting concerns: auth, SSL, rate limit, logging, header manipulation. Complex logic services mein.',
            },
            {
              mistake: 'Gateway single point of failure banana',
              why: 'Gateway down = sab down. High availability zaroori hai.',
              fix: 'Multiple Gateway instances chalao load balancer ke peeche. Health checks aur auto-restart configure karo. Kubernetes deployment with replicas: 3.',
            },
          ]}
          proTip="High traffic ke liye NGINX ya Traefik better performance deta hai — C mein written, battle-tested. Node.js Gateway tab banao jab complex business logic chahiye. AWS API Gateway ya Kong managed solutions hain — zero servers manage karo, buss configure karo. Startup ho? Kong Community Edition free hai aur production-grade hai."
        />
      </div>

      {/* ConceptCard 5: Service Discovery */}
      <div id="service-discovery">
        <ConceptCard
          title="Service Discovery & Health Checks"
          emoji="🔎"
          difficulty="advanced"
          whatIsIt="Tumhara order-service ko user-service ka address chahiye. Hardcode karo? '192.168.1.45:3001'? Container restart hone par IP change ho jaayega. Service discovery iska solution hai — DNS-based ya registry-based. Docker Compose mein service names automatically resolve hote hain (user-service hostname directly kaam karta hai). Kubernetes mein built-in DNS service hai — user-service.default.svc.cluster.local. Health checks ensure karte hain sirf healthy instances traffic receive karein."
          whenToUse={[
            'Multiple instances of ek service chalao — load balancing chahiye',
            'Kubernetes ya ECS mein deploy karo — IPs dynamically change hote hain',
            'Zero-downtime deployment — naya pod ready ho tab tak traffic na bhejo',
            'Docker Compose local development — sab services ek network mein',
          ]}
          whyUseIt="Imagine karo — 5 instances of user-service chal rahi hain. Ek crash karti hai, naya container start hota hai — naya IP milta hai. Hardcoded IP? Broken. Service name 'user-service'? Docker/Kubernetes automatically route karta hai healthy instances pe. Ye dynamic infrastructure ki fundamental requirement hai. Health checks ke saath — broken containers traffic nahi lete, users ko unhealthy service nahi milti."
          howToUse={{
            filename: 'docker-compose.yml',
            language: 'yaml',
            code: `version: '3.9'
services:
  api-gateway:
    build: ./gateway
    ports:
      - "3000:3000"
    environment:
      - USER_SERVICE_URL=http://user-service:3001
      - ORDER_SERVICE_URL=http://order-service:3002
    depends_on:
      user-service:
        condition: service_healthy # Health check pass hone tak wait karo

  user-service:
    build: ./user-service
    expose:
      - "3001"    # Sirf internal network mein expose
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/users
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 30s  # Startup time do

  order-service:
    build: ./order-service
    expose:
      - "3002"
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3002/health"]
      interval: 10s
      timeout: 5s
      retries: 3

  postgres:
    image: postgres:15
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: pass
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 5s
      retries: 5

volumes:
  pgdata:`,
            explanation: 'Docker Compose magic trace karo: USER_SERVICE_URL=http://user-service:3001. "user-service" — ye sirf ek naam hai, koi IP nahi. Docker Compose internally DNS server chalata hai — "user-service" resolve hota hai us container ke IP par. healthcheck ke saath depends_on condition: service_healthy — db container health check pass kare tab tak api-gateway start nahi hoga. Ye startup race conditions eliminate karta hai.',
          }}
          realWorldScenario="Startup ke microservices Kubernetes mein the. Order service ne user service ka IP hardcode kiya tha. Container restart, IP changed, order service broken. Kubernetes service DNS use kiya — user-service.default.svc.cluster.local. Ab chahe 10 instances ho ya 1, chahe IPs change hon — ye DNS name always resolves to healthy pods. Zero code change, zero downtime, zero IP management. Kubernetes DNS — zero DevOps overhead ke saath service discovery."
          commonMistakes={[
            {
              mistake: 'Health check endpoint complex banana — DB query karta hai',
              why: 'Agar DB down hai, health check fail hogi — service unhealthy mark hogi aur traffic nahi milegi. DB issue alag handle karo.',
              fix: 'Shallow health check: sirf process alive hai — return 200. Deep health check: DB check bhi — /health/ready vs /health/live differentiate karo.',
            },
            {
              mistake: 'depends_on sirf service name se — healthcheck ke bina',
              why: 'depends_on bina condition: sirf service start hone tak wait karta hai, ready hone tak nahi.',
              fix: 'depends_on mein condition: service_healthy use karo — healthcheck pass hone tak wait karo.',
            },
          ]}
          proTip="Kubernetes mein teen alag probes samjho: Liveness probe — 'process zinda hai?' (fail toh restart). Readiness probe — 'traffic le sakta hai?' (fail toh load balancer se remove, restart nahi). Startup probe — 'slow app ko time do startup ka' (liveness probe ko hold rakho jab tak startup complete na ho). Teen probes, teen alag responsibilities — sab configure karo, production mature ho jaayegi."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 21 Quiz — Microservices Check
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — architecture, BullMQ, API Gateway concepts test karo!
          </p>
        </div>
        <QuizSection questions={microservicesQuiz} chapterSlug="microservices" />
      </div>
    </div>
  )
}
