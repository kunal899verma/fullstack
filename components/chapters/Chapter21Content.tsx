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
          Microservices — Ek Badi App Ko Chhote Pieces Mein Todo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Microservices architecture mein ek badi application chhote, independent services mein split hoti hai — har service apna kaam karta hai, alag deploy hota hai, alag scale hota hai. <strong className="text-[#F5F5F7]">Lekin ye silver bullet nahi hai</strong> — complexity badhti hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein monolith vs microservices trade-offs, communication patterns, BullMQ job queues, API Gateway, aur service discovery cover karenge — realistic Node.js examples ke saath.
        </p>
      </div>

      {/* ConceptCard 1: Microservices vs Monolith */}
      <div id="vs-monolith">
        <ConceptCard
          title="Microservices vs Monolith"
          emoji="🏗️"
          difficulty="advanced"
          whatIsIt="Monolith ek single deployable unit hai — sab kuch ek codebase mein. Microservices mein separate services hain — user service, order service, payment service. Conway's Law: 'Organizations design systems that mirror their communication structure.'"
          whenToUse={[
            'Monolith se shuru karo — premature microservices avoid karo',
            'Team 15-20+ ho gayi — alag team alag service own kare',
            'Specific parts ko alag scale karna ho — payment service 10x traffic',
            'Different technologies different services mein use karni hon',
          ]}
          whyUseIt="Microservices ke fayde: independent deployment, independent scaling, technology flexibility, fault isolation. Nuksan: distributed system complexity, network latency, distributed transactions, operational overhead. Amazon, Netflix ne monolith se migrate kiya kyunki teams itni badi ho gayi thin ki ek codebase mein kaam karna mushkil tha."
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
            explanation: 'Sam Newman (Building Microservices author) kehte hain: "Microservices are not a free lunch." Pehle clear domain boundaries samjho, phir split karo. Wrong boundaries se distributed monolith banta hai — worst of both worlds.',
          }}
          realWorldScenario="StackOverflow 2023 tak monolith chal raha tha — 60M+ users serve karta tha. Amazon 2001 mein monolith tha, 2006 mein microservices adopt kiye jab teams large ho gayi aur deployment conflicts roz hote the. Dono right decision kiye right time par."
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
          proTip="Team topology matter karta hai: Conway's Law reverse engineering use karo — pehle team structure decide karo, phir service boundaries. Stream-aligned teams aur platform teams organize karo. Team Topologies book padho."
        />
      </div>

      {/* ConceptCard 2: Communication Patterns */}
      <div id="communication">
        <ConceptCard
          title="Communication Patterns"
          emoji="📡"
          difficulty="advanced"
          whatIsIt="Microservices mein services ek dusre se communicate karte hain — synchronously (REST, gRPC) ya asynchronously (message queues, events). Sahi pattern choose karna performance aur reliability ke liye critical hai."
          whenToUse={[
            'REST — public APIs, browser clients, simple CRUD',
            'gRPC — internal service-to-service, high performance, streaming',
            'Message queue (BullMQ, RabbitMQ) — async tasks, email, notifications',
            'Event-driven (Kafka) — event sourcing, audit logs, real-time feeds',
          ]}
          whyUseIt="Synchronous communication chain failure ka risk rakhti hai — ek service down, sab fail. Async messaging loose coupling deta hai — services independent hote hain. gRPC REST se 5-7x faster internal communication deta hai protobuf binary encoding ke saath."
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
            explanation: 'Timeouts hamesha set karo REST calls mein. Circuit breaker pattern add karo — downstream service fail ho toh fallback karo. Event-driven loosely coupled hai — publisher ko pata nahi consumers kaun hain.',
          }}
          realWorldScenario="Payment service REST se inventory service ko stock check karta tha. Inventory service slow hone par payment checkout hang hone laga — cascading failure. Solution: inventory service async event consume karta hai, stock data cache mein rakhta hai. Payment service cache se stock check karta hai — fast aur resilient."
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
          proTip="Saga pattern use karo distributed transactions ke liye — choreography (events) ya orchestration (central coordinator). Compensating transactions define karo — agar order fail hoga toh inventory rollback karo. Eventual consistency accept karo."
        />
      </div>

      {/* ConceptCard 3: BullMQ */}
      <div id="bullmq">
        <ConceptCard
          title="BullMQ — Job Queues"
          emoji="🐂"
          difficulty="advanced"
          whatIsIt="BullMQ Redis-backed job queue library hai Node.js ke liye. Producers jobs add karte hain, workers jobs process karte hain — async, reliable, with retry logic. Email sending, image processing, report generation ke liye perfect."
          whenToUse={[
            'Email/SMS sending — async, retry on failure',
            'Image/video processing — CPU-intensive, background mein',
            'Report generation — user ko block mat karo',
            'Rate-limited API calls — queue se control karo throughput',
          ]}
          whyUseIt="BullMQ retry, priority, delay, concurrency, aur job scheduling deta hai built-in. Redis persistence se server restart par jobs lose nahi hote. Bull Board UI se jobs monitor karo real-time. Webhooks aur scheduled jobs bhi support karta hai."
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
            explanation: 'BullMQ Bull (v3) ka successor hai — TypeScript-first, better reliability. Redis connection pooling automatically karta hai. Bull Board (@bull-board/api) se UI monitor setup karo. Failed jobs queue mein rehte hain — debug karke manually retry kar sakte ho.',
          }}
          realWorldScenario="E-commerce order processing: order place hone par 5 jobs queue mein jaate hain — confirmation email, inventory update, warehouse notification, analytics event, invoice PDF. Sab parallel process hote hain, sab retry support karte hain. Order processing time 200ms se kam — user blocked nahi hota."
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
          proTip="Idempotent workers banao — agar job twice run ho (network glitch se) toh side effects duplicate nahi hone chahiye. Job ID uniqueness use karo deduplication ke liye. Stalled jobs timeout set karo — lockDuration: 30000 (30 seconds)."
        />
      </div>

      {/* ConceptCard 4: API Gateway */}
      <div id="api-gateway">
        <ConceptCard
          title="API Gateway Pattern"
          emoji="🚪"
          difficulty="advanced"
          whatIsIt="API Gateway microservices ka single entry point hai. Clients ek hi URL se baat karte hain — Gateway internally sahi service par route karta hai. Authentication, rate limiting, logging, SSL termination sab Gateway par hota hai."
          whenToUse={[
            'Multiple microservices ko ek URL se expose karna ho',
            'Centralized auth — har service mein duplicate mat karo',
            'Rate limiting aur request throttling',
            'API versioning manage karna — /v1/, /v2/',
          ]}
          whyUseIt="Bina Gateway ke clients ko har service ka URL jaanna padta hai. Security concerns (auth, rate limiting) sab services mein duplicate karne padte hain. Gateway single point of control deta hai — change once, applies everywhere. NGINX, Kong, AWS API Gateway, ya custom Node.js Gateway use kar sakte hain."
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
            explanation: 'http-proxy-middleware se simple proxy setup hota hai. Auth Gateway par karo — services pe trust karo x-user-id header. Service discovery ke liye Consul ya Kubernetes service names use karo hardcoded URLs ki jagah.',
          }}
          realWorldScenario="Fintech app mein 8 microservices the — alag alag ports par. Frontend team ko sabke URLs manage karne padte the. API Gateway add kiya — sab /api/v1/* prefix ke peeche hide ho gaye. Auth, rate limiting, logging ek jagah. Mobile app ka code 40% reduce hua."
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
          proTip="NGINX ya Traefik production mein better performance deta hai custom Node.js Gateway se routing ke liye. Node.js Gateway tab use karo jab complex business logic gateway par honi ho. Kong ya AWS API Gateway managed solutions hain — zero operational overhead."
        />
      </div>

      {/* ConceptCard 5: Service Discovery */}
      <div id="service-discovery">
        <ConceptCard
          title="Service Discovery & Health Checks"
          emoji="🔎"
          difficulty="advanced"
          whatIsIt="Service discovery matlab services runtime par ek dusre ko dhundh sakti hain — hardcoded IPs nahi. Docker Compose mein service names work karte hain. Kubernetes mein DNS-based discovery built-in hai. Health checks se traffic sirf healthy instances ko milti hai."
          whenToUse={[
            'Multiple service instances chalao — load balancing ke liye',
            'Services dynamically scale hoti hain — containers add/remove',
            'Zero-downtime deployment — unhealthy pod ka traffic route mat karo',
            'Docker Compose development environment',
          ]}
          whyUseIt="Dynamic environments mein (Kubernetes, ECS) service IPs change hote hain. Service discovery se hardcoded IPs ki zaroorat nahi — service name se communicate karo. Health checks ensure karte hain ki broken instances traffic nahi receive karte."
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
            explanation: 'Docker Compose mein service names automatically DNS resolve hote hain — user-service hostname directly use karo. healthcheck se depends_on wait karta hai healthy state ke liye. Production mein Kubernetes service DNS: user-service.production.svc.cluster.local.',
          }}
          realWorldScenario="Startup ke microservices Kubernetes mein deploy hain. Order service ko user service dhundni thi. Consul ki jagah Kubernetes native DNS use kiya — user-service.default.svc.cluster.local. Auto-scaling ke saath bhi DNS automatically update hota hai — koi hardcoded IP nahi. Zero DevOps effort."
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
          proTip="Kubernetes mein liveness probe aur readiness probe alag karo. Liveness: process alive hai (restart karo agar fail). Readiness: traffic le sakti hai (route mat karo agar fail). Startup probe bhi add karo slow-starting apps ke liye — crash loop avoid hota hai."
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
