'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function DatabaseChoiceDiagram() {
  const sql = {
    title: 'SQL', db: 'PostgreSQL', icon: '🏛️',
    color: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.3)',
    traits: ['Structured tables + schemas', 'ACID transactions', 'JOINs & complex queries', 'Row-level security'],
    useCases: ['E-commerce orders', 'SaaS billing', 'Financial systems'],
  }
  const nosql = {
    title: 'NoSQL', db: 'MongoDB', icon: '🍃',
    color: '#06B6D4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.3)',
    traits: ['Flexible JSON documents', 'Horizontal sharding', 'No rigid schema', 'High write throughput'],
    useCases: ['Content management', 'Event logs / IoT', 'Catalog (varying attrs)'],
  }
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Databases & ORMs — Visual Overview</p>
      <div className="flex gap-3 flex-wrap justify-center">
        {[sql, nosql].map((col, i) => (
          <div key={i} className="flex-1 min-w-[160px] rounded-xl p-4" style={{ background: col.bg, border: `1px solid ${col.border}` }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{col.icon}</span>
              <div>
                <p className="font-bold text-sm" style={{ color: col.color }}>{col.title}</p>
                <p className="text-[10px] text-[#71717A]">{col.db}</p>
              </div>
            </div>
            <div className="space-y-1 mb-3">
              {col.traits.map((t, j) => (
                <p key={j} className="text-[10px] flex gap-1" style={{ color: col.color }}>
                  <span>•</span><span>{t}</span>
                </p>
              ))}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#52525B] mb-1">Use cases</p>
            {col.useCases.map((u, j) => (
              <p key={j} className="text-[10px] text-[#71717A] flex gap-1"><span>→</span><span>{u}</span></p>
            ))}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-[#52525B] text-center mt-3">Wrong choice = expensive migration later — decide early based on data shape</p>
    </div>
  )
}

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
          Kya aap jaante ho ki ek galat database choice production mein jaake poori application ko slow kar sakti hai — aur fix karna itna mushkil ho jaata hai ki rewrite karna aasaan lagta hai? PostgreSQL ya MongoDB, Prisma ya Mongoose — ye decisions sirf "kya accha lagta hai" se nahi hote. Ye decisions data ke nature, transaction requirements, aur scaling patterns se hote hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          ORM (Object-Relational Mapper) ek container ki tarah hai jo tumhare TypeScript objects aur database rows ke beech ka kaam karta hai. Lekin is container ke andar kya ho raha hai — ek ORM magic nahi hai, woh SQL generate karta hai. Aur agar tum woh SQL nahi samjho, toh N+1 problem ek khamoshi se maarne wala bug hai jo production mein tum par attack karta hai.
        </p>
      </div>

      <DatabaseChoiceDiagram />

      <div id="postgres-vs-mongo">
        <ConceptCard
          title="PostgreSQL vs MongoDB — Sahi Choice Karo"
          emoji="⚖️"
          difficulty="intermediate"
          whatIsIt="Socho PostgreSQL ek strict bank locker hai — har cheez apni jagah par rakho, rules follow karo, koi bhi item bina permission ke nahi jaayega. MongoDB ek bada flexible bag hai — kuch bhi daalo, structure baad mein decide karo. PostgreSQL: relational tables, relationships, ACID transactions, schema enforced. MongoDB: JSON-like documents, flexible schema, horizontal scaling. Dono excellent hain — use case decide karta hai kaun jeeta hai."
          whenToUse={[
            'PostgreSQL: Structured data with relationships — users, orders, products, payments',
            'PostgreSQL: Financial data — ACID transactions critical hain',
            'MongoDB: Unstructured ya rapidly evolving schema — content, events, logs',
            'MongoDB: High write throughput, horizontal sharding — IoT, analytics',
          ]}
          whyUseIt="Ab sawaal ye aata hai — agar MongoDB itna flexible hai toh PostgreSQL kyun use karein? Kyunki flexibility ka ek price hai. Ek bank transfer sochو: 'Account A se 1000 rupay nikalo, Account B mein daalo.' Agar beech mein system crash ho? PostgreSQL ACID guarantee deta hai — ya dono ho, ya koi nahi. MongoDB mein ye guarantee default nahi hai. Wrong database choice migration cost itna zyada ho jaata hai baad mein ki team prefer karti hai naya project shuru karna."
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
            explanation: "Under the hood: ACID ka matlab hai — Atomicity (ya sab ho ya kuch nahi — half transfer impossible), Consistency (invalid state mein database kabhi nahi rahega), Isolation (ek transaction doosre ko affect nahi karta), Durability (committed = permanently saved, crash ke baad bhi). Financial apps ke liye ACID mandatory — PostgreSQL perfect choice. MongoDB transactions complex aur slow hote hain large clusters mein.",
          }}
          realWorldScenario="Sequifi CRM: User accounts, leads, pipeline stages, invoices — PostgreSQL choose karo (relationships, ACID transactions, complex reporting queries). Activity logs, email events, raw webhooks — MongoDB choose karo (high write throughput, flexible schema, koi join nahi chahiye). Ek hi app mein dono databases — polyglot persistence — ye real world mein common hai aur correct approach hai."
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
          proTip="PostgreSQL ek secret weapon deta hai — JSONB column. Matlab structured columns + flexible JSON attributes ek hi table mein. Array columns, full-text search, GIS extensions — PostgreSQL itna flexible hai ki 90% cases mein MongoDB ki zaroorat hi nahi padti. Default choice PostgreSQL rakho — MongoDB sirf tab jab specific use case genuinely demand kare."
        />
      </div>

      <div id="prisma-orm">
        <ConceptCard
          title="Prisma ORM — Schema, Migrations, CRUD"
          emoji="🔷"
          difficulty="intermediate"
          whatIsIt="Prisma socho ek contract ki tarah — schema.prisma file mein likhdo 'User model ka email field String type ka hai aur unique hoga.' Bas. Prisma TypeScript types auto-generate karta hai, migrations auto-create karta hai, aur agar tum galat field name likhte ho to TypeScript compile error aata hai — runtime par nahi, build time par. Schema.prisma file practically database ki living documentation ban jaati hai."
          whenToUse={[
            'TypeScript Node.js apps jahan type safety zaroori ho',
            'PostgreSQL, MySQL, SQLite — relational databases',
            'Team collaboration — schema file version control mein',
            'Complex relations — Prisma include/select efficient hai',
          ]}
          whyUseIt="Ab sawaal ye aata hai — raw SQL ya ORM? Raw SQL mein tum sirf strings likhte ho — prisma.user.findUnique({ where: { idd: userId } }) — agar 'idd' likhoge to TypeScript bol dega 'ye field exist nahi karta.' Ye production mein pahucha hota toh runtime error hota. Prisma type-safety ensure karta hai database level tak. Aur migrations track hoti hain — team ka koi bhi member database ki current state dekhna chahein, schema.prisma mein dekh lo."
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
            explanation: "Under the hood: global singleton pattern isliye hai kyunki development mein hot-reload har file save par module re-execute karta hai — bina singleton ke har reload pe naya PrismaClient = naya connection pool = database connections exhaust. include under the hood JOIN query generate karta hai — ek efficient query. select se specific fields only — unnecessary data fetch avoid hota hai. findUnique null return karta hai — findUniqueOrThrow directly exception throw karta hai.",
          }}
          realWorldScenario="Next.js SaaS app mein Prisma: naya developer join kiya, schema.prisma dekha — database structure samajh gaya bina DBA se poochhe. TypeScript intellisense database fields pe milti hai — galat field naam type karo, red underline immediately. Production accidents dramatically kam hote hain kyunki bugs build time par pakad mein aate hain, runtime par nahi."
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
          proTip="Serverless environments (Vercel, AWS Lambda) mein ek dangerous trap hai — har function invocation naya PrismaClient() banata hai, matlab naya connection pool. 1000 concurrent requests = 1000 connections = database overwhelmed. Solution: Prisma Accelerate — ye centralized connection pooler hai jo serverless ke liye specifically bana hai. Pehle ye problem samjho, phir Accelerate use karo."
        />
      </div>

      <div
        className="rounded-xl p-5"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}
      >
        <p className="text-[#F5A623] font-semibold mb-2">🤔 Ab sawaal ye aata hai...</p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Prisma ke saath relational databases ke liye great — lekin agar MongoDB use karna ho toh? Prisma MongoDB bhi support karta hai lekin community mein Mongoose zyada popular hai MongoDB ke saath. Dono ka use case alag hai — relational DB ke liye Prisma, document DB ke liye Mongoose generally better experience deta hai. Neeche dekhte hain Mongoose kyun.
        </p>
      </div>

      <div id="mongoose">
        <ConceptCard
          title="Mongoose — MongoDB ODM"
          emoji="🍃"
          difficulty="intermediate"
          whatIsIt="MongoDB ke saath kaam karna bina Mongoose ke aise hai jaise kuch bhi daalo, koi rok nahi. Mongoose ek blueprint deta hai — schema define karo, uspe validation lagao, lifecycle hooks lagao. Socho Mongoose ek mold ki tarah — usme MongoDB documents daalo, shape guarantee ho jaati hai. populate() se referenced documents automatically resolve hote hain — manual $lookup likhne ki zaroorat nahi."
          whenToUse={[
            'MongoDB ke saath Node.js apps',
            'Schema validation MongoDB level par chahiye — required, type checks',
            'Model methods aur statics chahiye — business logic encapsulate karna',
            'Middleware hooks — pre-save password hash, post-remove cleanup',
          ]}
          whyUseIt="Ab sawaal ye aata hai — MongoDB toh schema-less hai, toh Mongoose kyun? Kyunki schema-less ka matlab free-for-all nahi hona chahiye production mein. Bina Mongoose ke ek developer 'email' field save kare, doosra 'emailAddress' — aur ab query kaise likhoge? Mongoose validation bugs save hone se pehle pakadta hai. Hooks (pre-save password hash, post-remove cleanup) business logic ko model ke andar rakhte hain — controllers clean rehte hain."
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
            explanation: "Under the hood: select: false ka matlab password field default queries mein never return hoga — security layer. isModified('password') check isliye ki agar sirf name update ho raha ho, password re-hash mat karo — expensive bcrypt operation waste hogi. pre-save hook tab fire hota hai jab bhi document.save() call ho — ye Mongoose's lifecycle event system hai. populate() ObjectId ko actual document se replace karta hai — internally separate query fire hoti hai.",
          }}
          realWorldScenario="Blog platform: Post schema flexible hai — koi post mein video embed hai, koi mein gallery, koi sirf text. MongoDB + Mongoose perfect fit. Author populate efficient hai. Pre-save middleware se automatic slug generation — har baar manually likhne ki zaroorat nahi. Naye content types add karne ke liye schema mein ek field add karo — migration ka jhanjhat nahi."
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
          proTip="Mongoose ek secret weapon deta hai — .lean() method. By default Mongoose full document objects return karta hai with getters, setters, virtual methods — sab overhead. .lean() sirf plain JavaScript object return karta hai — 2-5x faster, kam memory. API responses ke liye User.find().lean() use karo — methods access nahi honge lekin speed ka fark clearly dikhega."
        />
      </div>

      <div id="connection-pooling">
        <ConceptCard
          title="Connection Pooling — Database Performance"
          emoji="🏊"
          difficulty="intermediate"
          whatIsIt="Socho restaurant mein waiter hire karna expensive hai — interview, training, onboarding. Har customer ke liye naya waiter hire karo, kaam hone par fire karo — ye insane hai. Connection pool wohi kaam karta hai jo samjhadaar restaurant karta hai — pehle se waiters ready rakho, customer aaye to immediately serve karo. Database connection establish karna expensive hai — TCP handshake, authentication, session setup — 100-500ms. Pool pre-established connections maintain karta hai — query aate hi available connection use karo, done hone par return karo."
          whenToUse={[
            'Production database connections — hamesha pool use karo',
            'High concurrency — many simultaneous requests',
            'Serverless ke alawa — Lambda/Vercel ke liye connection pool issues hain',
            'Performance optimization — benchmark karo pool size',
          ]}
          whyUseIt="Connection pool reuse karna matlab 100ms+ overhead har request se hata dena. Lekin ab sawaal ye aata hai — pool kitna bada rakho? Too small: requests queue mein wait karte hain. Too large: database overwhelmed ho jaata hai. PostgreSQL max connections default sirf 100 hain. Agar 10 Node.js processes hain aur har ek 20 connections rakhe — 200 connections = database reject karega naye connections. Pool size carefully tune karo."
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
            explanation: "Under the hood: client.release() try-finally mein isliye ki agar query fail bhi ho, exception throw bhi ho — finally block hamesha execute hoga aur connection pool mein wapas jaayega. Warna pool mein ek slot forever occupied — slowly sab slots khali nahi honge — naye requests hang karenge indefinitely. pool.query() ye sab automatically handle karta hai — simple cases ke liye prefer karo. Transactions ke liye explicit client zaroori hai kyunki BEGIN → COMMIT ek hi connection par hona chahiye.",
          }}
          realWorldScenario="API server pe 1000 concurrent requests aaye — 20 connections pool mein hain. 20 requests immediately serve hote hain, 980 requests milliseconds wait karti hain. DB queries fast hain (10-50ms) — jab tak pehli 20 khatam hongi, next 20 start ho jaayengi. Sab users fast response pate hain. 1000 connections open karna? Database crash guaranteed."
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
          proTip="Serverless (Vercel, Lambda) mein ek hidden trap hai — traditional connection pooling kaam nahi karta. Har function invocation naya connection banata hai, 100ms+ overhead. Solutions: PgBouncer (external connection pooler), Prisma Accelerate, ya Supabase Pooler. Ye tools specifically serverless ke liye design kiye gaye hain — connection management ko centralize karte hain. Serverless deploy karo to pehla kaam ye tools setup karna hai."
        />
      </div>

      <div
        className="rounded-xl p-5"
        style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}
      >
        <p className="text-[#F5A623] font-semibold mb-2">🤔 Ab sawaal ye aata hai...</p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Connections manage kar liye, pool bana liya — lekin ek aur problem hai jo ORM use karne waale developers ko silently slow karta hai. Iska naam hai N+1 problem. Ye aisa bug hai jo development mein dikh nahi deta — test data 10 rows hota hai. Production mein data 10,000 rows hota hai — aur tab poori picture saamne aati hai.
        </p>
      </div>

      <div id="n-plus-one">
        <ConceptCard
          title="N+1 Problem — Detection & Fix"
          emoji="🔍"
          difficulty="intermediate"
          whatIsIt="N+1 problem ek khamoshi se maarne wala bug hai. Step by step trace karo: Step 1 — posts fetch karo (1 query). Step 2 — loop mein har post ke liye author fetch karo (N queries). Total: 1 + N = N+1 queries. 10 posts ke saath? 11 queries — theek lagta hai. 1000 posts ke saath? 1001 queries — production database kneel karta hai. ORM use karo to ye silently ho sakta hai — tumhe pata bhi nahi chalta jab tak monitoring nahi lagaate."
          whenToUse={[
            'API slow ho gayi ho — database query count check karo',
            'Related data har item ke saath dikhani ho — N+1 risk',
            'ORM use karo aur lazy loading available ho',
            'GraphQL — DataLoader N+1 ke liye specifically bana hai',
          ]}
          whyUseIt="N+1 se bachne ka fayda: social media feed — 50 posts, har post ka author — naively 51 queries. include ke saath 1 query. 50x improvement. Real numbers: 200ms vs 10 seconds response time. Users 3 seconds se zyada wait nahi karte — bounce kar jaate hain. N+1 sirf slow app nahi banata — users bhaga deta hai. Development mein query logging enable karo — production mein ye bug dhundhna bahut costly hai."
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
            explanation: "Under the hood: include — Prisma ek JOIN query generate karta hai — ek hi trip mein sab data. Manual batching — 2 queries: posts pehle, phir authorIds collect karo, WHERE id IN (...) ek query. Map karo in-memory — O(n) but fast. DataLoader GraphQL ke saath magical hai — multiple resolvers ek hi batch mein resolve hote hain automatically. Prisma mein log: ['query'] enable karo — console mein SQL print hoga, N+1 immediately visible ho jaayega.",
          }}
          realWorldScenario="Social media feed — 50 posts, har post ka author, har post ke like count — naively 151 queries. include + _count se: 1 query. 150x improvement. Real production numbers: 200ms vs 3000ms response time. Aur ye sirf 50 posts ke liye — 500 posts pe? 1500 queries vs 1 query. N+1 ek compounding problem hai jaise interest rate — post count badhega to damage exponentially badhega."
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
          proTip={`Pehla kaam: Prisma mein log: ['query'] enable karo aur apni app chalao. Console mein SQL queries print hongi — count karo kitni queries ek API call pe fire ho rahi hain. Agar 10 se zyada hain, N+1 check karo. Production mein pganalyze ya Datadog slow query tracking lagao. Query performance monitoring ek baar ka kaam nahi — naye features add hone par N+1 wapas aa sakta hai. Ongoing vigilance chahiye.`}
        />
      </div>
    </div>
  )
}
