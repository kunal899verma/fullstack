export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface DBChapter {
  number: number
  slug: string
  title: string
  subtitle: string
  difficulty: Difficulty
  estimatedMinutes: number
  phase: 1 | 2 | 3
  topics: string[]
  conceptCount: number
  visualization?: string
}

export const dbChapters: DBChapter[] = [
  // Phase 1: SQL Foundation (Ch 1-4)
  {
    number: 1,
    slug: 'db-intro',
    title: 'Databases Ka Overview',
    subtitle: 'SQL vs NoSQL, ACID properties, sahi database choose karo',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    phase: 1,
    topics: ['What is a database', 'SQL vs NoSQL', 'ACID properties', 'Relational model', 'When to use what', 'Popular databases'],
    conceptCount: 6,
  },
  {
    number: 2,
    slug: 'sql-basics',
    title: 'SQL Basics — CRUD Queries',
    subtitle: 'SELECT, INSERT, UPDATE, DELETE — database ka pura vocabulary',
    difficulty: 'beginner',
    estimatedMinutes: 50,
    phase: 1,
    topics: ['SELECT & WHERE', 'INSERT INTO', 'UPDATE & SET', 'DELETE FROM', 'ORDER BY & LIMIT', 'DISTINCT & aliases'],
    conceptCount: 8,
  },
  {
    number: 3,
    slug: 'sql-joins',
    title: 'Joins & Relationships',
    subtitle: 'INNER JOIN, LEFT JOIN, foreign keys, normalization',
    difficulty: 'beginner',
    estimatedMinutes: 60,
    phase: 1,
    topics: ['Primary & Foreign Keys', 'INNER JOIN', 'LEFT / RIGHT JOIN', 'FULL OUTER JOIN', 'Self JOIN', '1NF, 2NF, 3NF'],
    conceptCount: 8,
  },
  {
    number: 4,
    slug: 'sql-aggregations',
    title: 'Aggregations, GROUP BY & Subqueries',
    subtitle: 'Data summarize karo — COUNT, SUM, AVG, GROUP BY, HAVING',
    difficulty: 'beginner',
    estimatedMinutes: 55,
    phase: 1,
    topics: ['COUNT / SUM / AVG / MIN / MAX', 'GROUP BY', 'HAVING vs WHERE', 'Subqueries', 'EXISTS & IN', 'CASE expressions'],
    conceptCount: 8,
  },

  // Phase 2: Deep Dive (Ch 5-9)
  {
    number: 5,
    slug: 'postgresql-advanced',
    title: 'PostgreSQL Deep Dive',
    subtitle: 'CTEs, window functions, indexes, JSON support',
    difficulty: 'intermediate',
    estimatedMinutes: 75,
    phase: 2,
    topics: ['CTEs — WITH clause', 'Window functions', 'JSONB columns', 'Full-text search', 'Indexes deep dive', 'EXPLAIN ANALYZE'],
    conceptCount: 9,
    visualization: 'n-plus-one',
  },
  {
    number: 6,
    slug: 'mongodb-queries',
    title: 'MongoDB Queries & Aggregation',
    subtitle: 'find(), aggregation pipeline, indexes, schema design',
    difficulty: 'intermediate',
    estimatedMinutes: 65,
    phase: 2,
    topics: ['find() & operators', 'Update operators', 'Aggregation pipeline', '$match $group $project', 'Indexes in MongoDB', 'Schema design patterns'],
    conceptCount: 9,
  },
  {
    number: 7,
    slug: 'query-optimization',
    title: 'Query Optimization & Indexes',
    subtitle: 'Slow queries fix karo — EXPLAIN, index strategies, N+1 problem',
    difficulty: 'intermediate',
    estimatedMinutes: 70,
    phase: 2,
    topics: ['Query execution plans', 'B-tree vs Hash indexes', 'Composite indexes', 'Index selectivity', 'N+1 problem', 'Query rewriting'],
    conceptCount: 8,
    visualization: 'n-plus-one',
  },
  {
    number: 8,
    slug: 'prisma-orm',
    title: 'Prisma ORM — Type-Safe Queries',
    subtitle: 'Schema-first development, migrations, relations, type safety',
    difficulty: 'intermediate',
    estimatedMinutes: 75,
    phase: 2,
    topics: ['Prisma schema', 'Migrations', 'CRUD with Prisma', 'Relations & includes', 'Transactions', 'Raw queries'],
    conceptCount: 9,
  },
  {
    number: 9,
    slug: 'mongoose-odm',
    title: 'Mongoose ODM — MongoDB + Node.js',
    subtitle: 'Schema, models, validators, virtuals, middleware hooks',
    difficulty: 'intermediate',
    estimatedMinutes: 60,
    phase: 2,
    topics: ['Schema definition', 'Model methods', 'Validators', 'Virtual fields', 'Pre/post hooks', 'Population'],
    conceptCount: 8,
  },

  // Phase 3: Production (Ch 10-12)
  {
    number: 10,
    slug: 'transactions',
    title: 'Transactions & Concurrency',
    subtitle: 'ACID deep dive, isolation levels, deadlocks, optimistic locking',
    difficulty: 'advanced',
    estimatedMinutes: 70,
    phase: 3,
    topics: ['BEGIN/COMMIT/ROLLBACK', 'Isolation levels', 'Dirty reads & phantoms', 'Deadlock detection', 'Optimistic locking', 'MVCC'],
    conceptCount: 9,
  },
  {
    number: 11,
    slug: 'db-design-patterns',
    title: 'Database Design Patterns',
    subtitle: 'Repository pattern, event sourcing, CQRS, soft deletes',
    difficulty: 'advanced',
    estimatedMinutes: 65,
    phase: 3,
    topics: ['Repository pattern', 'Soft deletes', 'Audit trails', 'Event sourcing', 'CQRS', 'Polymorphic associations'],
    conceptCount: 8,
  },
  {
    number: 12,
    slug: 'db-scaling',
    title: 'Scaling Databases',
    subtitle: 'Connection pooling, read replicas, sharding, caching layer',
    difficulty: 'advanced',
    estimatedMinutes: 75,
    phase: 3,
    topics: ['Connection pooling', 'Read replicas', 'Horizontal sharding', 'Database caching', 'Partitioning', 'CAP theorem'],
    conceptCount: 9,
  },
]

export const dbPhases = [
  { number: 1 as const, name: 'SQL Foundation', color: '#FF6B35', chapters: dbChapters.filter((c) => c.phase === 1) },
  { number: 2 as const, name: 'Deep Dive', color: '#F59E0B', chapters: dbChapters.filter((c) => c.phase === 2) },
  { number: 3 as const, name: 'Production', color: '#EF4444', chapters: dbChapters.filter((c) => c.phase === 3) },
]

export const dbDifficultyConfig: Record<
  Difficulty,
  { label: string; color: string; bg: string; border: string }
> = {
  beginner: {
    label: 'Beginner',
    color: 'text-[#10B981]',
    bg: 'bg-[rgba(16,185,129,0.12)]',
    border: 'border-[rgba(16,185,129,0.3)]',
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-[#F59E0B]',
    bg: 'bg-[rgba(245,158,11,0.12)]',
    border: 'border-[rgba(245,158,11,0.3)]',
  },
  advanced: {
    label: 'Advanced',
    color: 'text-[#7C3AED]',
    bg: 'bg-[rgba(124,58,237,0.12)]',
    border: 'border-[rgba(124,58,237,0.3)]',
  },
}
