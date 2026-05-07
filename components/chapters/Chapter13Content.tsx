'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

export default function Chapter13Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Databases & ORMs — Data Layer Master Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Database selection aur ORM choice application success par bahut zyada impact karti hai. PostgreSQL vs MongoDB, Prisma vs Mongoose — ye decisions early karo aur soch-samajh ke karo. Is chapter mein sab cover karenge — tradeoffs, patterns, pitfalls.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          ORM (Object-Relational Mapper) ya ODM (Object-Document Mapper) raw SQL/queries se bacha ke high-level API deta hai. Lekin ORM magic samajhna zaroori hai — warna N+1 problems aur slow queries production mein surprise dete hain.
        </p>
      </div>

      <div id="postgres-vs-mongo">
        <ConceptCard
          title="PostgreSQL vs MongoDB — Sahi Choice Karo"
          emoji="⚖️"
          difficulty="intermediate"
          whatIsIt="PostgreSQL: Relational database — tables, relationships, ACID transactions, SQL, schema enforced. MongoDB: Document database — JSON-like documents, flexible schema, horizontal scaling, no joins. Dono excellent databases hain — use case decide karta hai kaunsa sahi hai."
          whenToUse={[
            'PostgreSQL: Structured data with relationships — users, orders, products, payments',
            'PostgreSQL: Financial data — ACID transactions critical hain',
            'MongoDB: Unstructured ya rapidly evolving schema — content, events, logs',
            'MongoDB: High write throughput, horizontal sharding — IoT, analytics',
          ]}
          whyUseIt="Wrong database choice migration cost bahut high hai later. PostgreSQL schema enforcement bugs early pakadta hai. MongoDB flexibility rapid prototyping ke liye. ACID transactions financial apps mein mandatory hain — partial updates nahi hone chahiye. CAP theorem: consistency vs availability tradeoff samjho."
          howToUse={{
            filename: 'db-comparison.md',
            language: 'bash',
            code: `# PostgreSQL — When to choose
✅ E-commerce (users, orders, products, inventory)
✅ SaaS apps (billing, subscriptions, user management)
✅ Financial systems (accounts, transactions, reports)
✅ Multi-tenant apps (row-level security, schemas per tenant)
✅ Complex queries (JOINs, GROUP BY, window functions)

# MongoDB — When to choose
✅ Content management (articles, media metadata)
✅ Real-time analytics (event logs, clickstreams)
✅ Catalog systems (products with varying attributes)
✅ Mobile backends (offline sync, flexible schema)
✅ Prototyping (schema-less rapid iteration)

# CAP Theorem — distributed systems mein pick 2:
# C = Consistency (same data everywhere)
# A = Availability (always respond)
# P = Partition tolerance (network split survive)

# PostgreSQL: CP — Consistency + Partition tolerance
# MongoDB: AP (by default) — Availability + Partition tolerance

# PostgreSQL ACID:
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
-- Ya dono ho ya koi nahi — guaranteed`,
            explanation: "ACID: Atomicity (ya sab ho ya kuch nahi), Consistency (valid state se valid state), Isolation (concurrent transactions interfere nahi karte), Durability (committed data persistent hai). Financial apps ke liye ACID mandatory — PostgreSQL perfect. MongoDB transactions bade MongoDB clusters mein complex aur slow hote hain.",
          }}
          realWorldScenario="Sequifi CRM: User accounts, leads, pipeline stages, invoices — PostgreSQL (relationships, transactions, reporting). Activity logs, email events — MongoDB (high write, flexible schema). Ek app mein dono databases — polyglot persistence — real world mein common hai."
          commonMistakes={[
            {
              mistake: 'MongoDB ke liye relational data model banana',
              why: "MongoDB mein agar references use karo (like foreign keys) aur har query mein manual '$lookup' (join) — relational DB ka use karo directly.",
              fix: 'MongoDB document-oriented socho — embed data jo saath access hoti hai. Reference karo jo alag access hoti hai. Relational data ke liye PostgreSQL.',
            },
            {
              mistake: 'PostgreSQL ke liye flexible schema ke liye JSONB overuse karna',
              why: 'Har column JSONB — indexing complex, query ugly, schema benefits lost.',
              fix: 'Known structure ke liye proper columns use karo. Genuinely flexible/unknown attributes ke liye JSONB column add karo as addition.',
            },
          ]}
          proTip="PostgreSQL JSONB support karta hai — best of both worlds. Structured columns + JSONB column for flexible attributes. Array columns, full-text search, GIS extensions — PostgreSQL surprisingly flexible hai. Zyada cases mein PostgreSQL choose karo — MongoDB sirf specific use cases mein shine karta hai."
        />
      </div>

      <div id="prisma-orm">
        <ConceptCard
          title="Prisma ORM — Schema, Migrations, CRUD"
          emoji="🔷"
          difficulty="intermediate"
          whatIsIt="Prisma TypeScript-first ORM hai — schema.prisma file mein data model define karo, migrations auto-generate hoti hain, type-safe client milta hai. Query results TypeScript types ke saath aate hain — no casting needed. Prisma Studio GUI tool bhi deta hai data browse karne ke liye."
          whenToUse={[
            'TypeScript Node.js apps jahan type safety zaroori ho',
            'PostgreSQL, MySQL, SQLite — relational databases',
            'Team collaboration — schema file version control mein',
            'Complex relations — Prisma include/select efficient hai',
          ]}
          whyUseIt="Prisma type-safety ensure karta hai database level tak — wrong field name TypeScript compile error deta hai. Auto-generated client har schema change pe update hota hai. Migrations track hoti hain — database schema version control mein. Prisma Studio free database GUI tool hai."
          howToUse={{
            filename: 'schema.prisma',
            language: 'typescript',
            code: `// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]   // Relation
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  tags      Tag[]    @relation("PostTags")
}

enum Role { USER ADMIN }

// CLI commands
// npx prisma generate — client generate karo
// npx prisma migrate dev --name init — migration create + run
// npx prisma studio — browser GUI

// lib/prisma.ts — singleton instance
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ log: ['error'] })
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// CRUD operations — fully typed
async function examples() {
  // Create
  const user = await prisma.user.create({
    data: { email: 'rahul@example.com', name: 'Rahul' },
  })

  // Read with relation
  const userWithPosts = await prisma.user.findUnique({
    where: { id: user.id },
    include: { posts: { where: { published: true }, orderBy: { createdAt: 'desc' } } },
  })

  // Update
  await prisma.user.update({
    where: { id: user.id },
    data: { role: 'ADMIN' },
  })

  // Delete
  await prisma.user.delete({ where: { id: user.id } })

  // Complex query
  const stats = await prisma.post.groupBy({
    by: ['authorId'],
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
  })
}`,
            explanation: "global singleton pattern hotReload mein zyada connections prevent karta hai. include se related records fetch hote hain — JOIN equivalent. select se specific fields only — performance optimization. findUnique null return karta hai agar nahi mila — findUniqueOrThrow exception throw karta hai.",
          }}
          realWorldScenario="Next.js SaaS app mein Prisma perfect fit hai — schema.prisma file database documentation ka kaam karta hai, migrations version control mein tracked hain, TypeScript intellisense database fields pe milti hai. Production accidents dramatically kam hote hain type-safety se."
          commonMistakes={[
            {
              mistake: 'Development mein baar baar new PrismaClient() banana',
              why: 'Hot reload ke saath har file change par naya connection pool create hota hai — database connections exhaust ho jaate hain.',
              fix: 'Singleton pattern use karo — global variable mein cache karo: globalForPrisma.prisma = prisma. Next.js mein ye standard pattern hai.',
            },
            {
              mistake: 'Nested relations mein N+1 problem create karna',
              why: 'posts.map(p => prisma.user.findUnique({ where: { id: p.authorId } })) — 100 posts = 101 queries.',
              fix: 'include use karo: prisma.post.findMany({ include: { author: true } }) — ek JOIN query. Ya DataLoader se batch karo.',
            },
          ]}
          proTip="Prisma Accelerate (Prisma's connection pooler + global cache) use karo serverless environments mein — AWS Lambda, Vercel Edge Functions. Serverless mein har invocation new connection banana slow aur connection limit exhaust karta hai. Accelerate connection pooling centralize karta hai."
        />
      </div>

      <div id="mongoose">
        <ConceptCard
          title="Mongoose — MongoDB ODM"
          emoji="🍃"
          difficulty="intermediate"
          whatIsIt="Mongoose MongoDB ke liye ODM (Object-Document Mapper) hai — JavaScript schema define karo, validation, methods, virtuals, middleware (hooks) define karo. mongoose.model() se MongoDB collection interact karo type-safe way mein. populate() se referenced documents fetch karo — manual $lookup ki zaroorat nahi."
          whenToUse={[
            'MongoDB ke saath Node.js apps',
            'Schema validation MongoDB level par chahiye — required, type checks',
            'Model methods aur statics chahiye — business logic encapsulate karna',
            'Middleware hooks — pre-save password hash, post-remove cleanup',
          ]}
          whyUseIt="Raw MongoDB driver complex hai — Mongoose abstraction deta hai. Schema validation bugs early pakadta hai — invalid documents save hone se pehle. Virtuals (computed properties), hooks (lifecycle callbacks), population (references resolve karna) — features jo raw driver mein manually implement karne padte hain."
          howToUse={{
            filename: 'models/User.ts',
            language: 'typescript',
            code: `import mongoose, { Document, Model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

// TypeScript interface
interface IUser {
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  createdAt: Date
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>
}

type UserModel = Model<IUser, object, IUserMethods>

// Schema definition
const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }  // createdAt, updatedAt automatic
)

// Pre-save hook — password hash karo
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Instance method
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Virtual (computed field — DB mein save nahi)
userSchema.virtual('fullName').get(function () {
  return this.name
})

// Indexes
userSchema.index({ email: 1 })
userSchema.index({ role: 1, createdAt: -1 })

export const User = mongoose.model<IUser, UserModel>('User', userSchema)

// CRUD
const user = await User.create({ name: 'Rahul', email: 'r@r.com', password: 'secret123' })
const found = await User.findById(id).select('+password')  // password select false override
const updated = await User.findByIdAndUpdate(id, { name: 'Rahul K' }, { new: true })
await User.findByIdAndDelete(id)

// populate — referenced documents
const Post = mongoose.model('Post', new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
}))
const post = await Post.findById(postId).populate('author', 'name email')`,
            explanation: "select: false se sensitive fields default query mein nahi aate — security. isModified('password') se sirf password change hone par hash karo — update operations mein important. timestamps: true createdAt/updatedAt automatically manage karta hai. populate() ObjectId ko actual document se replace karta hai.",
          }}
          realWorldScenario="Blog platform mein Mongoose ideal hai — Post schema flexible (content structure vary kar sakta hai), Author population efficient, pre-save middleware se automatic slug generation. MongoDB flexible schema se naye content types easily add hote hain."
          commonMistakes={[
            {
              mistake: 'Connection error handle nahi karna',
              why: 'mongoose.connect() fail hone par app silently broken ho sakti hai — errors log nahi hoti, requests hang karte hain.',
              fix: "mongoose.connect(uri).catch(err => { console.error('DB connection failed', err); process.exit(1) }). Always handle connection errors.",
            },
            {
              mistake: 'Ek query mein bahut zyada populate karna',
              why: 'Deep nested populate — post.author.company.address — multiple queries fire hoti hain. N+1 worse version.',
              fix: 'Carefully choose karo kya populate karna hai. Agar join heavy ho toh MongoDB aggregation pipeline use karo — $lookup, $unwind. Selective populate karo.',
            },
          ]}
          proTip="Mongoose lean() method raw JavaScript objects return karta hai — Mongoose document overhead nahi. Faster aur less memory: User.find().lean(). Methods aur virtuals accessible nahi hote lean documents mein — read-only operations ke liye perfect (API responses)."
        />
      </div>

      <div id="connection-pooling">
        <ConceptCard
          title="Connection Pooling — Database Performance"
          emoji="🏊"
          difficulty="intermediate"
          whatIsIt="Database connection establish karna expensive hai — TCP handshake, authentication, session setup — 100-500ms. Connection pool pre-established connections maintain karta hai — query aate hi available connection use karo, done hone par return karo. Pool ke bina har request 100ms+ slow hogi."
          whenToUse={[
            'Production database connections — hamesha pool use karo',
            'High concurrency — many simultaneous requests',
            'Serverless ke alawa — Lambda/Vercel ke liye connection pool issues hain',
            'Performance optimization — benchmark karo pool size',
          ]}
          whyUseIt="Connection pool reuse connections — dramatic performance improvement. Pool size tuning zaroori hai — too small: requests wait. Too large: database overwhelmed. PostgreSQL max connections default 100 — agar 50 Node.js processes 20 connections each rakhe toh 1000 connections = DB crash."
          howToUse={{
            filename: 'db-pool.ts',
            language: 'typescript',
            code: `// Prisma — automatically pools connections
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
      // ?connection_limit=10 URL parameter se pool size
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
})

// PG pool — raw PostgreSQL
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                 // Maximum connections in pool
  min: 2,                  // Minimum connections (pre-warm)
  idleTimeoutMillis: 30000,// 30s mein idle connection close
  connectionTimeoutMillis: 2000,  // 2s mein connection nahi mili toh error
  allowExitOnIdle: true,   // Process exit kar sake pool idle hone par
})

// Pool events monitor karo
pool.on('connect', () => console.log('New connection to pool'))
pool.on('error', (err) => console.error('Pool error:', err))

// Query
async function getUser(id: string) {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM users WHERE id = $1', [id])
    return result.rows[0]
  } finally {
    client.release()  // HAMESHA release karo — connection pool mein wapas
  }
}

// Ya pool.query directly (client automatically manage hota hai)
async function getUserSimple(id: string) {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
  return result.rows[0]
}

// Mongoose pool size
mongoose.connect(uri, {
  maxPoolSize: 10,           // MongoDB default 5
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})',`,
            explanation: "client.release() try-finally mein — exception hone par bhi release hoga. Warna pool exhausted ho jaata hai. pool.query() automatically connect aur release karta hai — simple use cases ke liye prefer karo. Transactions ke liye client.connect() + explicit release zaroori hai.",
          }}
          realWorldScenario="API server 1000 concurrent requests handle kare toh 20 connections pool mein aur 980 requests wait karein briefly — 980 requests phir bhi fast complete hoti hain kyunki DB queries fast hoti hain. 1000 connections open karna DB ko crash kar dega."
          commonMistakes={[
            {
              mistake: 'client.release() bhoolna',
              why: 'Connection pool mein connection wapas nahi jaata — pool exhaust hota hai — new requests hang karte hain indefinitely.',
              fix: 'Hamesha try-finally use karo: try { ... } finally { client.release() }. Ya pool.query() use karo jo automatically release karta hai.',
            },
            {
              mistake: 'Pool size bahut bada rakhna',
              why: 'PostgreSQL default max_connections 100 hai. Agar pool size x processes = 100+ connections toh database reject karega naye connections.',
              fix: 'Rule of thumb: (max_connections - reserved_connections) / number_of_processes. PgBouncer use karo intermediate connection pooler ke roop mein — thousands of connections 10-20 actual DB connections mein multiplex karo.',
            },
          ]}
          proTip="Serverless environments (Vercel, Lambda) mein traditional connection pooling kaam nahi karta — har invocation new connection. Solutions: PgBouncer (external connection pooler), Prisma Accelerate, Supabase Pooler ya PlanetScale (serverless-friendly databases). ye specially design kiye hain serverless ke liye."
        />
      </div>

      <div id="n-plus-one">
        <ConceptCard
          title="N+1 Problem — Detection & Fix"
          emoji="🔍"
          difficulty="intermediate"
          whatIsIt="N+1 problem: N records fetch karo, phir har record ke liye 1 aur query — N+1 total queries instead of 1. 100 posts fetch karo, phir 100 separate queries for each author = 101 queries instead of 2. Database killer aur very common ORM mistake. Prisma mein include, Mongoose mein populate, SQL mein JOIN — sabse N+1 fix hota hai."
          whenToUse={[
            'API slow ho gayi ho — database query count check karo',
            'Related data har item ke saath dikhani ho — N+1 risk',
            'ORM use karo aur lazy loading available ho',
            'GraphQL — DataLoader N+1 ke liye specifically bana hai',
          ]}
          whyUseIt="N+1 exponential performance degradation deta hai. 10 posts fast, 1000 posts 100x slow. Production mein aane se pehle detect karna zaroori hai. Prisma/Mongoose query logging se detect karo, phir include/populate se fix karo."
          howToUse={{
            filename: 'n-plus-one.ts',
            language: 'typescript',
            code: `// ❌ N+1 problem — DO NOT DO THIS
async function getPostsWithAuthors_BAD() {
  const posts = await prisma.post.findMany()  // Query 1: all posts

  // Loop mein queries — N queries!
  return Promise.all(posts.map(async (post) => ({
    ...post,
    author: await prisma.user.findUnique({ where: { id: post.authorId } })  // N queries
  })))
  // Total: 1 + N queries = N+1
}

// ✅ Fix 1: Prisma include — single JOIN query
async function getPostsWithAuthors_GOOD() {
  return prisma.post.findMany({
    include: { author: { select: { id: true, name: true, email: true } } }
  })
  // Total: 1 query with JOIN
}

// ✅ Fix 2: Manual batching — author IDs collect, one query
async function getPostsWithAuthors_BATCH() {
  const posts = await prisma.post.findMany()
  const authorIds = [...new Set(posts.map(p => p.authorId))]

  const authors = await prisma.user.findMany({
    where: { id: { in: authorIds } }
  })

  const authorMap = new Map(authors.map(a => [a.id, a]))
  return posts.map(p => ({ ...p, author: authorMap.get(p.authorId) }))
  // Total: 2 queries
}

// ✅ Fix 3: DataLoader (GraphQL ke saath common)
import DataLoader from 'dataloader'

const userLoader = new DataLoader(async (ids: readonly string[]) => {
  const users = await prisma.user.findMany({ where: { id: { in: [...ids] } } })
  const userMap = new Map(users.map(u => [u.id, u]))
  return ids.map(id => userMap.get(id))  // Same order return karo
})

// Multiple graphQL resolvers same batch mein load honge
const author = await userLoader.load(post.authorId)  // Batched!`,
            explanation: "include — Prisma JOIN ke through efficiently fetch karta hai — 1 query. Manual batching — 2 queries — posts aur authors separately, phir map karo. DataLoader — GraphQL ke saath perfect — automatic batching + caching per request. Prisma logging enable karo query count dekhne ke liye.",
          }}
          realWorldScenario="Social media feed — 50 posts, har post ka author, har post ke like count — naively 151 queries. include + _count se: 1 query. 150x improvement. Real app mein ye difference 200ms vs 3000ms hota hai. Users bounce karte hain slow pages se."
          commonMistakes={[
            {
              mistake: 'ORM use karte waqt queries count check nahi karna',
              why: 'N+1 silently develop hota hai — features add hote hain, queries accumulate hoti hain, performance slowly degrades.',
              fix: 'Prisma: log: ["query"] enable karo development mein. Mongoose: mongoose.set("debug", true). Slow queries immediately visible hoti hain.',
            },
            {
              mistake: 'include sab jagah eagerly — even jab zaroorat nahi',
              why: 'Over-fetching — unnecessary data fetch karta hai, slow queries, big response payloads.',
              fix: 'Sirf wo relations include karo jo is use case mein actually chahiye. API endpoint-specific projections use karo. select se specific fields only.',
            },
          ]}
          proTip={`Prisma mein query metrics enable karo: const prisma = new PrismaClient({ log: ['query'] }). Ye log karta hai SQL queries. Production mein pganalyze, New Relic ya Datadog se slow queries track karo. Query performance monitoring continuous process hai — ek baar fix karna kaafi nahi.`}
        />
      </div>
    </div>
  )
}
