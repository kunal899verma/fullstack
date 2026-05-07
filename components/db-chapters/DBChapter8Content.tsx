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

function PrismaWorkflowDiagram() {
  const items = [
    { label: 'schema.prisma', sublabel: 'Define models, relations, constraints · Single source of truth', color: '#FF6B35', bg: 'rgba(255,107,53,0.1)', border: 'rgba(255,107,53,0.3)', icon: '📋' },
    { label: 'prisma migrate dev', sublabel: 'Generate + apply SQL migration · Versioned in git · Dev only', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: '🔄' },
    { label: 'prisma generate', sublabel: 'Generate TypeScript client · Types match your schema exactly', color: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', icon: '⚙️' },
    { label: 'TypeScript Code', sublabel: 'Type-safe queries · Compile-time errors · Autocomplete in IDE', color: '#FF6B35', bg: 'rgba(255,107,53,0.08)', border: 'rgba(255,107,53,0.25)', icon: '💻' },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Prisma Development Workflow</p>
      <div className="max-w-lg mx-auto space-y-2">
        {items.map((item, i) => (
          <div key={i}>
            <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{item.sublabel}</p>
              </div>
            </div>
            {i < items.length - 1 && <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓</span></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

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
          Ek baar socho — TypeScript mein column name galat likha, aur compile time pe hi error aa gayi. Database tak baat gayi hi nahi. Ye hai Prisma ka magic. Baaki ORMs mein galat field name runtime pe crash karta hai — production mein users ke saamne. Prisma mein? Editor mein red underline. Schema-first approach: ek schema.prisma file mein data model define karo — migrations aur type-safe client dono automatically generate.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein Prisma ka full arsenal cover karenge — schema language aur migrations workflow, CRUD operations with full TypeScript types, relations ke saath include (N+1 ka khatma), transactions ka ACID guarantee, aur jab ORM ka haath nahi pahunche tab raw SQL. Ye sab production apps mein daily use hone waale patterns hain.
        </p>
      </div>

      <PrismaWorkflowDiagram />

      <div id="prisma-schema">
        <ConceptCard
          title="Prisma Schema — Database Ka Blueprint"
          emoji="🔷"
          difficulty="intermediate"
          whatIsIt="schema.prisma ek single source of truth hai — ek jagah change karo, sab jagah reflect hota hai. datasource block batata hai kaunsa database use karna hai aur kahan hai. generator block TypeScript client generate karne ke instructions deta hai. model block har table ka blueprint hai — fields, types, constraints sab. Under the hood: Prisma ne ye schema parse kiya, migration SQL generate kiya, aur TypeScript types banayi — teeno kaam ek file se. @updatedAt attribute magic karta hai — Prisma automatically timestamp update karta hai har save pe. onDelete: Cascade — parent delete hone par children automatically delete. Ye sab schema mein declare karo, application code mein bhoolne ka chance nahi."
          whenToUse={[
            'TypeScript Node.js apps with PostgreSQL, MySQL, SQLite',
            'Team collaboration — schema file version control mein track hoti hai',
            'Type-safe database access chahiye — compile time errors',
            'Auto-generated migrations — manual SQL likhne se bacho',
          ]}
          whyUseIt="Sawaal: team mein 5 developers hain, sab alag-alag schema changes kar rahe hain — kaise manage karoge? Prisma migrate dev har schema change ko versioned migration file mein convert karta hai — git mein track hota hai, koi bhi developer npx prisma migrate dev se latest schema sync kar sakta hai. Production pe npx prisma migrate deploy — sirf apply karta hai, kuch create nahi karta. Safe. Aur Prisma Studio? Browser mein database ka GUI — free mein data dekho, edit karo, bina SQL likhey."
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
            explanation: "@default(cuid()) collision-resistant IDs generate karta hai — UUID se bhi better sortability ke liye. @updatedAt magic hai — Prisma internally query mein updatedAt = NOW() inject karta hai, aap bhool bhi jao toh bhi update hoga. onDelete: Cascade = parent delete hone par children bhi automatically delete — referential integrity database level pe guaranteed. @@index composite index banata hai migration ke through. Schema change karo, npx prisma migrate dev chalao — Prisma SQL generate karta hai aur apply bhi karta hai. Ek command, sab ho jaata hai.",
          }}
          realWorldScenario="Naya developer join hua team mein. Purane zamane mein: 'bhai database ka dump bhejo', 'ye 3 manual ALTER TABLE chalao', 'ye column add karna mat bhoolna'. Prisma ke saath: git clone, npm install, npx prisma migrate dev — done. Poori database history migrations mein hai. CI/CD mein npx prisma migrate deploy lagaya — har deploy pe automatically schema update. Zero manual SQL, zero communication overhead. Schema file documentation bhi hai, migration history bhi — ek file, teeno kaam."
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
          proTip={'postinstall script mein "prisma generate" add karo — npm install ke baad automatically Prisma Client regenerate hogi. Team members schema pull karein aur generate bhool jayein — build break hogi, confusing errors aayenge. postinstall se ye problem permanently solve hoti hai. Aur pgvector for AI embeddings chahiye? previewFeatures = ["postgresqlExtensions"] add karo — cutting-edge features Prisma ke through accessible hain.'}
        />
      </div>

      <div id="prisma-crud">
        <ConceptCard
          title="CRUD with Prisma Client — Fully Typed"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Prisma Client auto-generated hai schema se — aap likhte nahi, Prisma generate karta hai. findMany, findUnique, create, update, upsert, delete — ye sab fully typed methods hain. Wrong field name likhoge? Compile error — runtime nahi, editor mein. Return type bhi typed hai — IDE pe hover karo, exact shape dikhti hai. viewCount: { increment: 1 } ek powerful feature hai — atomic increment, no read-modify-write race condition. Ye sab raw SQL se zyada readable aur maintainable hai — aur type safety bonus mein."
          whenToUse={[
            'Koi bhi database read/write operation',
            'Filtered lists — findMany with where, orderBy, take, skip',
            'Upsert — record create ya update in one atomic operation',
            'Aggregations — count, sum, avg, min, max',
          ]}
          whyUseIt="Ek classic bug: developer ne 'userId' likhna tha, likha 'user_id' — camelCase vs snake_case. Raw SQL mein ye runtime pe crash karta hai. Prisma mein? Compile error. viewCount: { increment: 1 } atomic hai — 1000 users simultaneously views increment karein, koi race condition nahi. Manual read-modify-write (SELECT → increment → UPDATE) concurrent requests mein wrong count deta hai. Prisma ka atomic increment database level pe single UPDATE statement hai — bulletproof."
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
            explanation: "findUnique null return karta hai — null.name access = crash. findUniqueOrThrow use karo jab record hona expected ho. increment/decrement single UPDATE statement hai database mein — concurrency-safe. _count ek killer feature hai: har post ke liye separate COUNT(*) query fire nahi hogi, Prisma ek JOIN ke saath count nikalta hai — N+1 prevent. select se bandwidth save karo — sirf wahi fields fetch karo jo is endpoint ke liye actually chahiye.",
          }}
          realWorldScenario="Blog API real flow: GET /posts — findMany with published: true, include author, _count comments, pagination — ek query mein sab. POST /posts — create with nested tags (connect existing, create new) — ek atomic operation. PUT /posts/:id — upsert for tags (jo naya hai create, jo pehle se hai connect) — koi duplicate nahi. DELETE /posts/:id — onDelete: Cascade schema mein hai, toh comments automatically delete. Sab type-safe, IDE mein autocomplete, production mein confidence."
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
          proTip="Reusable select objects banao as const — const userPublicSelect = { id: true, name: true, email: true, avatar: true } as const. Ye multiple endpoints pe use karo — ek jagah field add karo, sab jagah reflect. Prisma.UserGetPayload<{ select: typeof userPublicSelect }> se exact return type milta hai — functions ke return types properly typed rehti hain. Ye pattern large codebases mein type safety maintain karne ka best way hai."
        />
      </div>

      <div id="prisma-relations">
        <ConceptCard
          title="Relations & include — Joined Queries"
          emoji="🔗"
          difficulty="intermediate"
          whatIsIt="Prisma relations SQL JOINs ka type-safe version hain. One-to-many (User has many Posts) — User model mein posts Post[] likhdo, Post model mein author User likhdo, Prisma relationship manage kar leta hai. Many-to-many (Post ↔ Tags) — Prisma automatically implicit join table banata hai, aap directly manage nahi karte. include = JOIN execute karo. Nested include = multiple JOINs ek query mein. Under the hood: Prisma smart hai — ek SQL query generate karta hai with all the JOINs, multiple queries nahi fire karta. Relation type safe hai — wrong relation name likhoge toh TypeScript compiler roke ga."
          whenToUse={[
            'Related data saath fetch karna ho — post with author',
            'Many-to-many operations — tags add/remove karna',
            'Nested creates — user create karo with profile in one query',
            'Filtered relations — sirf published posts include karo',
          ]}
          whyUseIt="Sawaal: post create karte waqt existing tags connect karne hain aur new tags bhi create karni hain — ek atomic operation mein kaise? connect existing records ke saath relation banata hai (join table mein entry). create new record banata hai aur relation bhi. connectOrCreate = upsert for relations — exists toh connect, nahi toh create. Ek operation mein sab, rollback-safe. Ye complexity Prisma handle karta hai — aap sirf intent express karo."
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
            explanation: "connect join table mein entry banata hai — records pehle se exist karne chahiye. create naya record banata hai aur automatically relation bhi. connectOrCreate = smart upsert: 'ye tag hai toh connect karo, nahi hai toh create karo aur connect karo' — idempotent operation. set: [] pattern tags replace karne ke liye: pehle sab existing tags disconnect, phir new set connect. _count ek single SQL COUNT(*) hai — separate query nahi, JOIN ke andar hi aggregate hota hai. Nested includes type inference maintain karte hain — har level pe exact type milti hai.",
          }}
          realWorldScenario="Social platform post creation: user ne 5 existing tags select kiye, 2 new tags type kiye. Raw SQL mein: pehle new tags INSERT karo, IDs nikalo, phir join table mein 7 entries INSERT karo — 3+ queries, error handling complex. Prisma mein: tags: { connect: existingIds, create: newTagNames } — Prisma internally sab handle karta hai, atomic hai, type-safe hai. Agar kuch bhi fail ho — rollback. Developer ne sirf intent express kiya, complexity Prisma ki zimmedaari."
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
          proTip="Relation filters bahut powerful hain — posts: { some: { tags: { some: { name: 'nodejs' } } } } matlab 'woh users jo nodejs-tagged posts likhte hain'. Ye deeply nested where conditions Prisma SQL mein subquery ke saath generate karta hai — aapko SQL likhna nahi padta. Complex filtering jab karni ho, pehle Prisma ki relation filter try karo — zyada cases mein raw SQL ki zaroorat hi nahi padti."
        />
      </div>

      <div id="prisma-transactions">
        <ConceptCard
          title="Transactions in Prisma — Atomic Operations"
          emoji="🔒"
          difficulty="advanced"
          whatIsIt="Transaction ek promise hai database se — 'ya sab hoga, ya kuch nahi hoga'. Under the hood: PostgreSQL BEGIN statement se transaction start, COMMIT se permanent, ROLLBACK se undo. Prisma $transaction do flavors mein: Sequential — array of operations dete ho, Prisma sab ek saath run karta hai. Interactive — callback ke andar tx client milta hai, previous step ka result next mein use ho sakta hai — conditional logic possible hai. Throw karo andar — automatic rollback. tx client use karo prisma ki jagah — same transaction mein rahega."
          whenToUse={[
            'Money transfers — debit + credit atomic hone chahiye',
            'Order creation — order + inventory decrement + payment record',
            'User signup — user + profile + welcome email log',
            'Any multi-step operation jahan partial success unacceptable ho',
          ]}
          whyUseIt="Sawaal: Transaction isliye slow kyun hota hai? Kyunki database locks hold karta hai, resources reserve karta hai, undo logs likhta hai — ye sab overhead hai. Lekin ye overhead zaroori hai. Bina transaction ke: payment process hua, network cut gaya, order create nahi hua — customer ka paisa gaya. Transaction ke saath: ya dono complete hoga ya dono rollback. Ye guaranteed atomicity hai. Interactive transaction ka ek rule yaad rakho: transaction ke andar sirf DB operations — payment gateway call, email bhejne wala kaam transaction baad mein karo. External APIs transaction rollback pe undo nahi hoti."
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
            explanation: "Sequential $transaction([]) — array operations parallel run hoti hain, ek round-trip. Simple cases ke liye perfect. Interactive $transaction(async tx => {}) — sequential, previous step ka result use karo. tx client critical hai — prisma use karo transaction ke andar toh alag connection pe jaayega, same transaction mein nahi rahega. Error throw karo — rollback automatic. timeout option set karo — long-running transactions database lock hold karte hain, doosre queries wait karti hain.",
          }}
          realWorldScenario="E-commerce checkout ka woh moment — user ne 'Place Order' dabaya. Stock check karo, stock decrement karo, order create karo, payment record karo — ek transaction mein. Bina transaction ke ek scenario: 2 users ek saath last item buy karte hain, dono stock check karte hain (dono ko 1 stock dikhti hai), dono order create karte hain — oversold! Transaction ke saath: pehla user commit karta hai, doosra stock check karta hai, 0 dikhta hai, error — clean failure. Ye hai transactional integrity."
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
          proTip="Outbox Pattern — ye production-grade concept hai. Transaction ke andar payment process mat karo directly. Ek outbox table mein event record karo: { type: 'PAYMENT_REQUESTED', orderId, amount }. Transaction commit hogi, outbox entry bhi commit hogi — atomic. Background worker outbox read karta hai, payment process karta hai. Payment fail ho toh retry, order data safe hai. Ye distributed systems mein standard approach hai — atomicity guarantee + external side effects decoupled."
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
