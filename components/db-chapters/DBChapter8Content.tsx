'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'prisma migrate dev aur prisma migrate deploy mein kya fark hai?',
    options: [
      { text: 'Dono same kaam karte hain — koi fark nahi', correct: false, explanation: 'Important difference hai — wrong environment mein wrong command use karna dangerous hoga.' },
      { text: 'migrate dev: development mein migrations create + apply karta hai; migrate deploy: production mein sirf apply karta hai, create nahi', correct: true, explanation: 'Bilkul sahi! migrate dev shadow database use karta hai, new migration files generate karta hai. migrate deploy sirf existing migrations run karta hai — production ke liye safe.' },
      { text: 'migrate deploy zyada features deta hai', correct: false, explanation: 'migrate deploy intentionally limited hai — production safety ke liye.' },
      { text: 'migrate dev database delete kar deta hai', correct: false, explanation: 'migrate dev schema changes apply karta hai, delete nahi. Shadow DB use karta hai validation ke liye.' },
    ],
  },
  {
    question: 'Prisma mein include aur select mein kya fark hai?',
    options: [
      { text: 'Dono same hain — interchangeable hain', correct: false, explanation: 'Dono ka purpose alag hai — include relations ke liye, select fields ke liye.' },
      { text: 'include: related records (JOIN) fetch karta hai; select: specific fields only return karta hai', correct: true, explanation: 'Sahi! include eager loading hai — nested records. select projection hai — sirf needed columns. Dono combine bhi ho sakte hain: include mein select specify karo.' },
      { text: 'select zyada slow hai kyunki extra query fire karta hai', correct: false, explanation: 'select sirf fields limit karta hai — zyada efficient hai kyunki less data transfer hota hai.' },
      { text: 'include sirf one-to-one relations ke liye hai', correct: false, explanation: 'include sab relation types ke liye kaam karta hai — one-to-many, many-to-many bhi.' },
    ],
  },
  {
    question: 'upsert operation kya karta hai?',
    options: [
      { text: 'Sirf update karta hai — record nahi mila toh error', correct: false, explanation: 'Update ke liye findUnique + update use karo. Upsert smarter hai.' },
      { text: 'Record exists karo toh update, nahi hai toh create — ek atomic operation mein', correct: true, explanation: 'Bilkul! "update or insert" — race conditions avoid karta hai. where condition se check hota hai, update ya create accordingly.' },
      { text: 'Sirf create karta hai — duplicate par skip karta hai', correct: false, explanation: 'Skip karne ke liye createMany mein skipDuplicates: true option hai. Upsert update karta hai existing ko.' },
      { text: 'Pehle delete karta hai phir create karta hai', correct: false, explanation: 'Ye destructive operation hai — upsert soft update hai, data preserve karta hai.' },
    ],
  },
  {
    question: 'Prisma $transaction use kab karna chahiye?',
    options: [
      { text: 'Kabhi nahi — transactions slow hoti hain', correct: false, explanation: 'Transactions ACID guarantees deti hain — financial, inventory, multi-table updates mein essential.' },
      { text: 'Jab multiple operations atomically execute karni ho — ya sab succeed ya sab rollback', correct: true, explanation: 'Sahi! Bank transfer (debit + credit), order creation (order + inventory update), signup (user + profile create) — sab transactions chahiye.' },
      { text: 'Sirf read operations ke liye', correct: false, explanation: 'Read-only operations ke liye transaction overhead unnecessary hai. Writes ke liye transactions essential hain.' },
      { text: 'Sirf jab ek table ko update karna ho', correct: false, explanation: 'Single table single operation ke liye transaction overhead zaroorat nahi. Multiple operations atomicity ke liye transactions hain.' },
    ],
  },
  {
    question: '$queryRaw aur $executeRaw mein kya fark hai?',
    options: [
      { text: 'Dono same hain', correct: false, explanation: 'Return value mein important fark hai.' },
      { text: '$queryRaw rows return karta hai (SELECT); $executeRaw affected rows count return karta hai (INSERT/UPDATE/DELETE)', correct: true, explanation: 'Bilkul! $queryRaw SELECT queries ke liye — typed results. $executeRaw DDL ya write operations ke liye — sirf count return hota hai.' },
      { text: '$executeRaw transaction ke andar nahi chhal sakta', correct: false, explanation: 'Dono $transaction ke andar use ho sakte hain — koi restriction nahi.' },
      { text: '$queryRaw safer hai — SQL injection prevent karta hai automatically', correct: false, explanation: 'Dono template literals ke saath safe hain — $queryRaw`SELECT * FROM users WHERE id = ${id}`. String concatenation avoid karo dono mein.' },
    ],
  },
]

export default function DBChapter8Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Prisma ORM — Type-Safe Queries Master Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Prisma modern TypeScript-first ORM hai jo database operations ko type-safe, readable, aur maintainable banata hai. Schema-first approach — ek schema.prisma file mein apna data model define karo, Prisma migrations aur type-safe client generate karta hai automatically.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein Prisma ka full power explore karenge — schema language, migrations workflow, CRUD operations with TypeScript types, relations with include, transactions, aur raw queries. Ye sab real production apps mein daily use hote hain.
        </p>
      </div>

      <div id="prisma-schema">
        <ConceptCard
          title="Prisma Schema — Database Ka Blueprint"
          emoji="🔷"
          difficulty="intermediate"
          whatIsIt="schema.prisma file Prisma ka heart hai — yahan apna data model define karo. datasource block database connection specify karta hai. generator block Prisma Client configuration ke liye. model block har table/collection define karta hai with fields, types, attributes. @id, @unique, @default, @relation, @updatedAt, @@index — ye attributes schema behavior control karte hain."
          whenToUse={[
            'TypeScript Node.js apps with PostgreSQL, MySQL, SQLite',
            'Team collaboration — schema file version control mein track hoti hai',
            'Type-safe database access chahiye — compile time errors',
            'Auto-generated migrations — manual SQL likhne se bacho',
          ]}
          whyUseIt="Prisma schema single source of truth hai — database structure aur TypeScript types dono yahan se generate hoti hain. ek jagah change karo, sab update. prisma generate se TypeScript client update hota hai. prisma migrate dev se migration SQL auto-generate hota hai. Prisma Studio se browser GUI milti hai free mein."
          howToUse={{
            filename: 'schema.prisma',
            language: 'prisma',
            code: `// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ── Models ─────────────────────────────────────────────────────────

model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String
  avatar    String?   // Optional field
  role      Role      @default(USER)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt    // Automatic update

  // Relations
  posts     Post[]                  // One-to-many
  comments  Comment[]
  profile   Profile?                // One-to-one (optional)

  @@index([role, createdAt])        // Composite index
}

model Post {
  id          String    @id @default(cuid())
  title       String
  content     String?
  slug        String    @unique
  published   Boolean   @default(false)
  viewCount   Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Foreign key + relation
  authorId    String
  author      User      @relation(fields: [authorId], references: [id], onDelete: Cascade)

  // Many-to-many (via implicit join table)
  tags        Tag[]     @relation("PostTags")
  comments    Comment[]

  @@index([authorId, createdAt])
  @@index([published, createdAt])
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())

  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  posts Post[] @relation("PostTags")
}

model Profile {
  id     String  @id @default(cuid())
  bio    String?
  userId String  @unique   // One-to-one guarantee
  user   User    @relation(fields: [userId], references: [id])
}

enum Role { USER ADMIN MODERATOR }

// ── CLI Commands ────────────────────────────────────────────────────
// npx prisma generate          — TypeScript client generate karo
// npx prisma migrate dev --name add_posts   — migration create + apply (dev)
// npx prisma migrate deploy    — production mein migrations apply karo
// npx prisma studio            — browser GUI open karo
// npx prisma db push           — schema push karo (no migration file — prototyping only)
// npx prisma db seed           — seed file run karo`,
            explanation: "@default(cuid()) — collision-resistant unique IDs. @updatedAt — Prisma automatically timestamp update karta hai. onDelete: Cascade — parent delete hone par children bhi delete. @@index — table-level composite index. Schema change karo, phir npx prisma migrate dev — migration SQL auto-generate + apply hota hai.",
          }}
          realWorldScenario="Next.js SaaS app mein schema.prisma file git mein tracked hoti hai. New developer join kare toh npx prisma migrate dev se local DB schema set ho jaata hai. Production deploy mein CI/CD pipeline npx prisma migrate deploy chalata hai — zero manual SQL. Schema = documentation + migrations + types sab ek jagah."
          commonMistakes={[
            {
              mistake: 'prisma db push use karna production mein',
              why: 'db push migration history track nahi karta — production schema kaise evolve hua unknown. Rollback impossible. Data loss risk.',
              fix: 'prisma db push sirf prototyping ke liye. Production ke liye hamesha prisma migrate dev (create) + prisma migrate deploy (apply).',
            },
            {
              mistake: 'schema change karne ke baad prisma generate bhoolna',
              why: 'Prisma Client outdated ho jaata hai — TypeScript types schema se match nahi karte, runtime errors.',
              fix: 'Schema change ke baad hamesha npx prisma generate. postinstall script mein add karo: "postinstall": "prisma generate" — automated.',
            },
          ]}
          proTip={'Prisma mein preview features use karo — schema.prisma mein generator mein previewFeatures = ["fullTextSearch"] add karo. Full-text search, views support, PostgreSQL extensions (pgvector for AI embeddings) — cutting-edge features early access milta hai.'}
        />
      </div>

      <div id="prisma-crud">
        <ConceptCard
          title="CRUD with Prisma Client — Fully Typed"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Prisma Client auto-generated type-safe query builder hai. findMany, findFirst, findUnique, create, createMany, update, updateMany, upsert, delete, deleteMany — ye sab methods hain. Har method ke arguments TypeScript types ke saath hain — wrong field name compile error deta hai. Results bhi typed hain — IDE autocomplete milti hai."
          whenToUse={[
            'Koi bhi database read/write operation',
            'Filtered lists — findMany with where, orderBy, take, skip',
            'Upsert — record create ya update in one atomic operation',
            'Aggregations — count, sum, avg, min, max',
          ]}
          whyUseIt="Prisma Client raw SQL se zyada readable aur maintainable hai. TypeScript types runtime errors prevent karte hain. Query builder SQL injection se safe hai — parameterized queries auto. Nested creates aur updates ek query mein possible hain — transaction implicit milti hai."
          howToUse={{
            filename: 'prisma-crud.ts',
            language: 'typescript',
            code: `import { prisma } from '@/lib/prisma'

// ── CREATE ─────────────────────────────────────────────────────────

// Single create
const user = await prisma.user.create({
  data: {
    email: 'rahul@example.com',
    name: 'Rahul Sharma',
    // Nested create — profile bhi create hoga ek query mein
    profile: {
      create: { bio: 'Full-stack developer' }
    }
  },
  include: { profile: true }  // Return mein profile bhi chahiye
})

// Bulk create
await prisma.tag.createMany({
  data: [
    { name: 'nodejs' },
    { name: 'typescript' },
    { name: 'prisma' },
  ],
  skipDuplicates: true,  // Unique constraint violation skip karo
})

// ── READ ────────────────────────────────────────────────────────────

// findUnique — exact match (returns null if not found)
const found = await prisma.user.findUnique({
  where: { email: 'rahul@example.com' },
  select: { id: true, name: true, email: true }  // Sirf ye fields
})

// findFirst — first match with ordering
const latestPost = await prisma.post.findFirst({
  where: { published: true, authorId: user.id },
  orderBy: { createdAt: 'desc' }
})

// findMany — list with filters, pagination
const posts = await prisma.post.findMany({
  where: {
    published: true,
    createdAt: { gte: new Date('2024-01-01') },
    tags: { some: { name: 'nodejs' } }  // Relation filter
  },
  include: {
    author: { select: { id: true, name: true, avatar: true } },
    tags: true,
    _count: { select: { comments: true } }  // Comment count (no N+1!)
  },
  orderBy: { viewCount: 'desc' },
  take: 10,    // LIMIT
  skip: 0,     // OFFSET (pagination ke liye)
})

// Count
const total = await prisma.post.count({
  where: { published: true }
})

// ── UPDATE ──────────────────────────────────────────────────────────

// Single update
const updated = await prisma.user.update({
  where: { id: user.id },
  data: {
    name: 'Rahul K',
    // Atomic increment — no race condition
    // (not on users but e.g. on posts)
  }
})

// Atomic increment — views++ without read-modify-write
await prisma.post.update({
  where: { id: 'post-id' },
  data: { viewCount: { increment: 1 } }
})

// Bulk update
await prisma.post.updateMany({
  where: { authorId: user.id },
  data: { published: false }
})

// UPSERT — create if not exists, update if exists
const tag = await prisma.tag.upsert({
  where: { name: 'nodejs' },
  update: {},          // Agar exists hai toh kuch update na karo
  create: { name: 'nodejs' }  // Nahi hai toh create karo
})

// ── DELETE ──────────────────────────────────────────────────────────

await prisma.post.delete({ where: { id: 'post-id' } })

// ── AGGREGATIONS ────────────────────────────────────────────────────

const stats = await prisma.post.aggregate({
  _count: { id: true },
  _avg: { viewCount: true },
  _max: { viewCount: true },
  where: { published: true }
})

// GroupBy
const byAuthor = await prisma.post.groupBy({
  by: ['authorId'],
  _count: { id: true },
  _sum: { viewCount: true },
  orderBy: { _count: { id: 'desc' } },
  take: 10
})`,
            explanation: "findUnique null return karta hai — findUniqueOrThrow error throw karta hai. increment/decrement atomic operations hain — multiple users simultaneously update kar sakte hain safely. _count se related records count ek query mein milta hai — N+1 avoid. select specific fields return karta hai — bandwidth optimize hoti hai.",
          }}
          realWorldScenario="Blog API: GET /posts — findMany with published: true, include author, _count comments, pagination. POST /posts — create with nested tag connect/create. PUT /posts/:id — update with upsert for tags (add new, connect existing). DELETE /posts/:id — cascade se comments bhi delete. Sab type-safe, compile-time checked."
          commonMistakes={[
            {
              mistake: 'findUnique ke baad null check nahi karna',
              why: 'findUnique null return karta hai agar record nahi mila. null.property access = runtime crash.',
              fix: 'findUniqueOrThrow use karo jab record hona expected ho. Ya manual null check: if (!user) throw new Error(\'User not found\'). API mein 404 return karo.',
            },
            {
              mistake: 'Loop mein individual updates karna',
              why: '100 items update karna = 100 queries. Slow aur unnecessary.',
              fix: 'updateMany use karo jab possible. Complex cases mein $transaction ke saath batch operations. Raw SQL UPDATE WHERE IN for bulk.',
            },
          ]}
          proTip="Prisma mein result types automatically infer hote hain — Prisma.UserGetPayload<typeof query> se exact return type milta hai. Reusable query objects banao: const userSelect = { id: true, name: true, email: true } as const — type-safe select reuse karo multiple places pe."
        />
      </div>

      <div id="prisma-relations">
        <ConceptCard
          title="Relations & include — Joined Queries"
          emoji="🔗"
          difficulty="intermediate"
          whatIsIt="Prisma relations schema mein define hoti hain — @relation decorator se. One-to-many (User has many Posts), Many-to-many (Post has many Tags, Tag has many Posts), One-to-one (User has one Profile). include se related records fetch hote hain — SQL JOIN equivalent. Nested include bhi possible hai — deep relation tree fetch karo ek query mein."
          whenToUse={[
            'Related data saath fetch karna ho — post with author',
            'Many-to-many operations — tags add/remove karna',
            'Nested creates — user create karo with profile in one query',
            'Filtered relations — sirf published posts include karo',
          ]}
          whyUseIt="Prisma relations type-safe hain — wrong relation name compile error. include automatically JOIN generate karta hai — N+1 prevent karta hai. Nested operations ek transaction mein atomic hain — ya sab create hoga ya kuch nahi. connect/disconnect se many-to-many relations manage karo bina join table manually touch kiye."
          howToUse={{
            filename: 'prisma-relations.ts',
            language: 'typescript',
            code: `// ── One-to-Many: User → Posts ──────────────────────────────────────

// User ke saare posts
const userWithPosts = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, title: true, slug: true, createdAt: true }
    }
  }
})

// ── Many-to-Many: Post ↔ Tags ───────────────────────────────────────

// Post create with tags
const post = await prisma.post.create({
  data: {
    title: 'Node.js Best Practices',
    slug: 'nodejs-best-practices',
    authorId: userId,
    tags: {
      // Existing tags connect karo
      connect: [{ name: 'nodejs' }, { id: 'tag-id' }],
      // New tags create karo
      create: [{ name: 'performance' }],
      // connectOrCreate — exists toh connect, nahi toh create
      connectOrCreate: [{
        where: { name: 'typescript' },
        create: { name: 'typescript' }
      }]
    }
  },
  include: { tags: true }
})

// Tags update karo — replace all
await prisma.post.update({
  where: { id: post.id },
  data: {
    tags: {
      set: [],  // Pehle sab disconnect
      connect: [{ id: 'new-tag-id' }]  // Phir naye connect
    }
  }
})

// ── Nested Includes ─────────────────────────────────────────────────

// Post with author, comments, comment authors
const postDetail = await prisma.post.findUnique({
  where: { slug: 'nodejs-best-practices' },
  include: {
    author: {
      select: { id: true, name: true, avatar: true }
    },
    tags: true,
    comments: {
      include: {
        author: { select: { id: true, name: true, avatar: true } }
      },
      orderBy: { createdAt: 'asc' },
      take: 50
    },
    _count: {
      select: { comments: true }  // Total comment count
    }
  }
})
// TypeScript type: Post & { author: {...}, tags: Tag[], comments: (Comment & { author: {...} })[], _count: { comments: number } }

// ── Relation filter ─────────────────────────────────────────────────

// Users jo kum se kum ek published post likhein
const activeAuthors = await prisma.user.findMany({
  where: {
    posts: { some: { published: true } }
  }
})

// Users jinka koi bhi post 'nodejs' tag wala ho
const nodejsAuthors = await prisma.user.findMany({
  where: {
    posts: {
      some: {
        tags: { some: { name: 'nodejs' } }
      }
    }
  }
})`,
            explanation: "connect existing records ke saath relation banata hai. create relation ke andar naya record banata hai. connectOrCreate upsert-like behavior — exists toh connect nahi toh create. set: [] se pehle sab disconnect karo phir naya set karo. _count efficient hai — COUNT(*) single query mein. Nested includes type inference maintain karta hai.",
          }}
          realWorldScenario="Social platform post creation flow: User post likhta hai, existing tags select karta hai, new tags bhi add karta hai. prisma.post.create mein tags: { connect: existingTagIds, create: newTagNames } — ek atomic operation mein sab ho jaata hai. Agar koi step fail ho toh rollback automatic."
          commonMistakes={[
            {
              mistake: 'Deeply nested includes without limits',
              why: 'posts include karo, har post ke comments include karo, har comment ke replies include karo — exponential data. Memory aur network bandwidth waste.',
              fix: 'Har include mein take: N limit lagao. Deep nesting avoid karo — separate API calls better hain. Pagination use karo.',
            },
            {
              mistake: 'Many-to-many mein direct join table access',
              why: 'Prisma implicit join table manage karta hai — direct access complex aur error-prone hai.',
              fix: 'connect/disconnect/set use karo Prisma API se. Agar extra fields join table mein chahiye toh explicit relation table use karo (Post_Tag model with extra fields).',
            },
          ]}
          proTip="Prisma mein fluent API se relation traverse karo: prisma.user.findUnique({where:{id}}).posts() — lazy loading ki tarah. Chained calls se type-safe navigation milti hai. Complex nested queries ke liye raw SQL se compare karo — sometimes $queryRaw zyada efficient hoti hai."
        />
      </div>

      <div id="prisma-transactions">
        <ConceptCard
          title="Transactions in Prisma — Atomic Operations"
          emoji="🔒"
          difficulty="advanced"
          whatIsIt="Database transaction group of operations hai jo atomically execute hoti hain — ya sab succeed ya sab rollback. Prisma $transaction do forms mein: Sequential (array of operations — simple), Interactive (callback with tx client — complex logic with dependencies). $transaction ACID guarantees provide karta hai — partial updates impossible."
          whenToUse={[
            'Money transfers — debit + credit atomic hone chahiye',
            'Order creation — order + inventory decrement + payment record',
            'User signup — user + profile + welcome email log',
            'Any multi-step operation jahan partial success unacceptable ho',
          ]}
          whyUseIt="Without transactions: agar user create ho gaya lekin profile creation fail ho gayi — incomplete state. Agar payment record ban gaya lekin inventory nahi ghata — inconsistency. Transaction ensure karta hai ya sab ho ya kuch nahi. $transaction([]) simple aur readable hai concurrent operations ke liye."
          howToUse={{
            filename: 'prisma-transactions.ts',
            language: 'typescript',
            code: `// ── Sequential Transaction (simple) ────────────────────────────────

// Bank transfer — atomic debit + credit
const [debitedAccount, creditedAccount] = await prisma.$transaction([
  prisma.account.update({
    where: { id: fromAccountId },
    data: { balance: { decrement: amount } }
  }),
  prisma.account.update({
    where: { id: toAccountId },
    data: { balance: { increment: amount } }
  }),
])
// Agar koi bhi operation fail ho toh dono rollback

// ── Interactive Transaction (complex logic) ─────────────────────────

// Order creation — logic + multiple tables
const order = await prisma.$transaction(async (tx) => {
  // Step 1: Check inventory
  const product = await tx.product.findUnique({
    where: { id: productId }
  })

  if (!product || product.stock < quantity) {
    throw new Error('Insufficient stock')  // ← Throw = automatic rollback!
  }

  // Step 2: Decrement inventory
  await tx.product.update({
    where: { id: productId },
    data: { stock: { decrement: quantity } }
  })

  // Step 3: Create order
  const newOrder = await tx.order.create({
    data: {
      userId,
      productId,
      quantity,
      total: product.price * quantity,
      status: 'CONFIRMED'
    }
  })

  // Step 4: Create payment record
  await tx.payment.create({
    data: {
      orderId: newOrder.id,
      amount: newOrder.total,
      status: 'PENDING'
    }
  })

  return newOrder  // Transaction result
})
// Stock checked, decremented, order created, payment record — sab atomic!

// ── Transaction Options ─────────────────────────────────────────────

const result = await prisma.$transaction(
  async (tx) => {
    // Complex operations...
    return someResult
  },
  {
    maxWait: 5000,      // 5s wait for transaction slot
    timeout: 10000,     // 10s max transaction duration
    isolationLevel: 'Serializable'  // Strongest isolation
  }
)

// ── Raw SQL in Transaction ──────────────────────────────────────────

const targetUserId = 42
await prisma.$transaction([
  prisma.$executeRaw\`UPDATE users SET verified = true WHERE id = \${targetUserId}\`,
  prisma.auditLog.create({
    data: { action: 'USER_VERIFIED', userId: targetUserId, timestamp: new Date() }
  })
])`,
            explanation: "Sequential transaction ($transaction([])) parallel run hoti hain — ek array mein sab operations. Interactive transaction ($transaction(async tx => {})) sequential hai — previous step ka result next mein use ho sakta hai. Error throw karna automatic rollback trigger karta hai. tx client use karo prisma ki jagah — same transaction mein rahega.",
          }}
          realWorldScenario="E-commerce checkout: inventory check karo, reserve karo, order create karo, payment process karo, inventory confirm karo — sab ek transaction mein. Payment success + inventory not updated = nightmare. Transaction ensure karta hai ya sab consistent state mein ho ya customer ko error dikhao aur retry karo."
          commonMistakes={[
            {
              mistake: 'Transaction ke andar external API call karna (payment gateway, email)',
              why: 'External API transaction ke rollback pe undo nahi hoti. Payment process hua + DB rollback = money deducted, order nahi bana.',
              fix: 'Transaction mein sirf DB operations. External calls transaction ke baad karo. Outbox pattern use karo — DB mein event log karo, worker process kare.',
            },
            {
              mistake: 'Long-running transactions',
              why: 'Transaction duration mein resources lock rahte hain — other queries wait karti hain. Deadlocks ka risk. Performance hit.',
              fix: 'Transactions chhoti rakho — sirf critical atomic operations. Lock order consistent rakho. timeout option set karo.',
            },
          ]}
          proTip="Prisma mein $transaction ke andar Prisma Pulse (realtime events) ya background jobs trigger karne ke liye — transaction ke andar event record karo (outbox table), transaction baad mein worker event process kare. Ye Outbox Pattern distributed systems mein standard approach hai atomic operations + external effects ke liye."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 8 Quiz — Prisma ORM
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — Prisma type-safe queries master karo!
          </p>
        </div>
        <QuizSection questions={quiz} chapterSlug="db-prisma-orm" />
      </div>
    </div>
  )
}
