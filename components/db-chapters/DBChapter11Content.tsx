'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const quiz: QuizQuestion[] = [
  {
    question: 'Repository pattern ka main benefit kya hai?',
    options: [
      { text: 'Queries automatically optimize ho jaati hain', correct: false, explanation: 'Repository pattern query optimization nahi karta.' },
      { text: 'Data access logic business logic se separate hoti hai — database change karna easy ho jaata hai', correct: true, explanation: 'Sahi! UserRepository interface change kiye bina PostgreSQL se MongoDB switch karna possible ho jaata hai. Testing mein mock repository inject kar sakte hain.' },
      { text: 'Automatically caching hoti hai', correct: false, explanation: 'Repository pattern caching guarantee nahi karta — explicitly implement karna padta hai.' },
      { text: 'Faster queries milti hain', correct: false, explanation: 'Repository abstraction hai — performance same rehti hai.' },
    ],
  },
  {
    question: 'Soft delete kab prefer karo hard delete pe?',
    options: [
      { text: 'Hamesha — hard delete kabhi use nahi karna chahiye', correct: false, explanation: 'GDPR compliance ke liye sometimes hard delete zaroori hota hai.' },
      { text: 'Jab data recovery chahiye ho, audit trail zaroori ho, ya references break na ho', correct: true, explanation: 'Sahi! E-commerce orders, financial records, user-generated content — soft delete se data recoverable rehta hai aur history preserve hoti hai.' },
      { text: 'Sirf production databases mein', correct: false, explanation: 'Soft delete application design decision hai — environment specific nahi.' },
      { text: 'Performance ke liye', correct: false, explanation: 'Soft delete actually WHERE deleted_at IS NULL add karna padta hai — overhead hota hai.' },
    ],
  },
  {
    question: 'Event Sourcing mein data kaise store hota hai?',
    options: [
      { text: 'Current state store hoti hai — hamesha latest value', correct: false, explanation: 'Ye traditional state-based persistence hai — event sourcing alag hai.' },
      { text: 'Events sequence store hoti hai — current state events replay karke derive hoti hai', correct: true, explanation: 'Sahi! OrderPlaced, ItemAdded, ItemRemoved, OrderShipped — ye sab events store. Cart current state: replay karo sabhi events. Full audit trail automatic.' },
      { text: 'Sirf deleted records store hoti hain', correct: false, explanation: 'Event sourcing deletion specific nahi hai — saare state changes events hain.' },
      { text: 'Binary format mein encrypted store', correct: false, explanation: 'Event sourcing storage format ke baare mein nahi — architectural pattern hai.' },
    ],
  },
  {
    question: 'CQRS pattern mein Command aur Query kya hain?',
    options: [
      { text: 'SQL ke CREATE aur SELECT jaise', correct: false, explanation: 'CQRS architectural pattern hai — SQL syntax se different.' },
      { text: 'Command: state change operations (write); Query: data read operations (read)', correct: true, explanation: 'Sahi! Commands write side: CreateOrder, UpdateProduct. Queries read side: GetUserProfile, ListProducts. Alag models, alag databases bhi possible.' },
      { text: 'Command: database; Query: cache', correct: false, explanation: 'CQRS separation of concerns hai — not specifically about cache vs database.' },
      { text: 'Sirf microservices mein kaam karta hai', correct: false, explanation: 'CQRS monolith mein bhi use kar sakte hain — useful when read/write patterns differ.' },
    ],
  },
  {
    question: 'Audit trail mein typically kaunsi information store hoti hai?',
    options: [
      { text: 'Sirf created_at timestamp', correct: false, explanation: 'Audit trail zyada comprehensive hoti hai.' },
      { text: 'Who (user), What (action/entity), When (timestamp), Before/After values', correct: true, explanation: 'Sahi! Complete audit: user_id, action type, entity type + id, old_value, new_value, timestamp. GDPR aur compliance ke liye essential.' },
      { text: 'Sirf error logs', correct: false, explanation: 'Error logs aur audit trail alag cheezein hain.' },
      { text: 'Sirf financial transactions', correct: false, explanation: 'Audit trails kisi bhi entity changes track kar sakti hain — products, users, orders, settings.' },
    ],
  },
]

export default function DBChapter11Content() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl p-6" style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)' }}>
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Database Design Patterns — Production-Grade Architecture
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Production databases mein sirf tables aur queries nahi hote — patterns hote hain. Repository pattern, soft deletes, audit trails, event sourcing, CQRS — ye sab complex real-world requirements solve karte hain.
        </p>
      </div>

      <div id="repository-pattern">
        <ConceptCard
          title="Repository Pattern — Data Access Abstraction"
          emoji="🏛️"
          difficulty="intermediate"
          whatIsIt="Repository pattern data access logic ko business logic se separate karta hai — ek interface ke through. Database change karo ya mock karo — business logic same rehti hai."
          whenToUse={[
            'Medium-large applications jahan testability important hai',
            'Database migration possible ho in future',
            'Unit testing ke liye (mock repositories inject karo)',
          ]}
          whyUseIt="Bina repository ke, service directly SQL ya ORM queries karta hai — test karna hard, database change karna harder. Repository se abstraction milti hai."
          howToUse={{
            code: `// Generic repository interface
interface Repository<T, ID = number> {
  findById(id: ID): Promise<T | null>
  findAll(filter?: Partial<T>): Promise<T[]>
  save(entity: Omit<T, 'id' | 'createdAt'>): Promise<T>
  update(id: ID, data: Partial<T>): Promise<T | null>
  delete(id: ID): Promise<boolean>
}

// Concrete implementation — PostgreSQL
class UserRepository implements Repository<User> {
  constructor(private pool: Pool) {}

  async findById(id: number): Promise<User | null> {
    const { rows } = await this.pool.query(
      'SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL',
      [id]
    )
    return rows[0] ?? null
  }

  async findAll(filter?: Partial<User>): Promise<User[]> {
    const { rows } = await this.pool.query(
      'SELECT * FROM users WHERE deleted_at IS NULL ORDER BY created_at DESC'
    )
    return rows
  }

  async save(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const { rows } = await this.pool.query(
      'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *',
      [data.name, data.email, data.role]
    )
    return rows[0]
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    const { rows } = await this.pool.query(
      'UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), updated_at = NOW() WHERE id = $3 RETURNING *',
      [data.name, data.email, id]
    )
    return rows[0] ?? null
  }

  async delete(id: number): Promise<boolean> {
    const { rowCount } = await this.pool.query(
      'UPDATE users SET deleted_at = NOW() WHERE id = $1',  // soft delete
      [id]
    )
    return (rowCount ?? 0) > 0
  }
}

// Mock repository for testing
class MockUserRepository implements Repository<User> {
  private users: User[] = []

  async findById(id: number) { return this.users.find(u => u.id === id) ?? null }
  async findAll() { return this.users }
  async save(data: any) { const user = { id: Date.now(), ...data }; this.users.push(user); return user }
  async update(id: number, data: any) { /* ... */ return null }
  async delete(id: number) { this.users = this.users.filter(u => u.id !== id); return true }
}

// Service uses interface — not implementation
class UserService {
  constructor(private userRepo: Repository<User>) {}

  async getUser(id: number) {
    const user = await this.userRepo.findById(id)
    if (!user) throw new Error('User not found')
    return user
  }
}

// Production: inject real repo
const service = new UserService(new UserRepository(pool))
// Testing: inject mock
const testService = new UserService(new MockUserRepository())`,
            language: 'typescript',
            explanation: 'Repository interface define karo. PostgreSQL aur Mock implementations. Service sirf interface use karta hai — concrete implementation inject hoti hai. Testing mein mock inject karo.',
            filename: 'repository-pattern.ts',
          }}
          realWorldScenario="User service tests mein database chahiye nahi — MockUserRepository inject karo. Jest tests fast chalte hain, actual database nahi chahiye. Integration tests mein real repo use karo."
          commonMistakes={[
            { mistake: 'Repository mein business logic daalna', why: 'Repository data access layer hai — sirf CRUD operations. Business logic service layer mein', fix: 'Repository: queries only. Service: validation, business rules, orchestration' },
          ]}
          proTip="Prisma ke saath repository pattern: Prisma client inject karo constructor mein — TypeScript types automatically milte hain. Repository pattern + Prisma = clean, testable, type-safe data access."
        />
      </div>

      <div id="soft-deletes">
        <ConceptCard
          title="Soft Deletes & Audit Trails"
          emoji="🗑️"
          difficulty="intermediate"
          whatIsIt="Soft delete: row actually delete nahi hota — deleted_at timestamp set hoti hai. Audit trail: saari changes record hoti hain — who changed what when."
          whenToUse={[
            'E-commerce orders, financial records — kabhi hard delete nahi',
            'GDPR compliance ke liye (user data fully deletable bhi)',
            'Undo functionality chahiye ho',
          ]}
          whyUseIt="Hard delete se data permanently gone — no recovery. Soft delete se data recoverable, references intact, history preserve."
          howToUse={{
            code: `-- Soft delete schema
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100),
  email       VARCHAR(255) UNIQUE,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW(),
  deleted_at  TIMESTAMP  -- NULL means active, timestamp means deleted
);

-- Soft delete
UPDATE users SET deleted_at = NOW(), updated_at = NOW() WHERE id = 42;

-- Queries: always filter deleted_at IS NULL
SELECT * FROM users WHERE deleted_at IS NULL;

-- Restore
UPDATE users SET deleted_at = NULL, updated_at = NOW() WHERE id = 42;

-- Audit trail table
CREATE TABLE audit_log (
  id          SERIAL PRIMARY KEY,
  table_name  VARCHAR(50) NOT NULL,
  record_id   INTEGER NOT NULL,
  action      VARCHAR(10) NOT NULL,  -- INSERT, UPDATE, DELETE
  user_id     INTEGER REFERENCES users(id),
  old_values  JSONB,
  new_values  JSONB,
  changed_at  TIMESTAMP DEFAULT NOW(),
  ip_address  INET
);

-- PostgreSQL trigger for automatic audit
CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (table_name, record_id, action, user_id, old_values, new_values)
  VALUES (
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    TG_OP,
    current_setting('app.current_user_id', true)::integer,
    CASE WHEN TG_OP != 'INSERT' THEN row_to_json(OLD)::jsonb ELSE NULL END,
    CASE WHEN TG_OP != 'DELETE' THEN row_to_json(NEW)::jsonb ELSE NULL END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();`,
            language: 'sql',
            explanation: 'Soft delete: deleted_at column. Active records: deleted_at IS NULL. Audit trigger: automatically every change record karta hai — who, what, when, before/after values.',
            filename: 'soft-delete-audit.sql',
          }}
          realWorldScenario="SaaS app: admin ne galti se user delete kar diya — soft delete se restore possible. Financial regulator audit mang le — audit log mein saara history hai. GDPR request aaye toh hard delete bhi possible."
          commonMistakes={[
            { mistake: 'Soft delete mein UNIQUE constraints break hona', why: 'email UNIQUE — soft deleted user email se naya user nahi ban sakta', fix: 'Partial unique index: CREATE UNIQUE INDEX ON users(email) WHERE deleted_at IS NULL' },
          ]}
          proTip="PostgreSQL Row-Level Security ke saath soft deletes: policy set karo ki deleted_at IS NULL automatically filter ho — application code mein manually filter nahi karna padta."
        />
      </div>

      <div id="event-sourcing">
        <ConceptCard
          title="Event Sourcing & CQRS"
          emoji="📋"
          difficulty="advanced"
          whatIsIt="Event Sourcing: current state store karne ki jagah events sequence store karo. CQRS: read aur write models separate karo. Dono often saath use hote hain."
          whenToUse={[
            'Complex audit requirements',
            'Undo/redo functionality',
            'Read/write performance alag scale karne ke liye (CQRS)',
            'Financial systems, order management',
          ]}
          whyUseIt="Event sourcing se complete history available hai — koi bhi point-in-time state derive ho sakta hai. CQRS se read model independently optimize karo (denormalized views)."
          howToUse={{
            code: `-- Event store table
CREATE TABLE events (
  id            SERIAL PRIMARY KEY,
  aggregate_id  UUID NOT NULL,      -- e.g., order ID
  aggregate_type VARCHAR(50),       -- 'Order', 'Cart', 'User'
  event_type    VARCHAR(100) NOT NULL,  -- 'OrderPlaced', 'ItemAdded'
  event_data    JSONB NOT NULL,
  version       INTEGER NOT NULL,   -- optimistic locking
  created_at    TIMESTAMP DEFAULT NOW(),
  created_by    INTEGER REFERENCES users(id)
);

-- Order events
INSERT INTO events (aggregate_id, aggregate_type, event_type, event_data, version)
VALUES
('ord-123', 'Order', 'OrderPlaced', '{"userId": 1, "items": [...]}', 1),
('ord-123', 'Order', 'ItemRemoved', '{"productId": 5}', 2),
('ord-123', 'Order', 'CouponApplied', '{"code": "SAVE10"}', 3),
('ord-123', 'Order', 'OrderShipped', '{"trackingId": "TRK-456"}', 4);

-- Current state: replay all events
SELECT event_type, event_data
FROM events
WHERE aggregate_id = 'ord-123'
ORDER BY version;

-- TypeScript event sourcing
interface Event { type: string; data: unknown; version: number }

class OrderAggregate {
  private state: OrderState = { items: [], status: 'pending', discount: 0 }

  apply(event: Event): void {
    switch (event.type) {
      case 'OrderPlaced':
        this.state = { ...this.state, ...event.data as OrderState }; break
      case 'ItemRemoved':
        const { productId } = event.data as { productId: number }
        this.state.items = this.state.items.filter(i => i.productId !== productId); break
      case 'CouponApplied':
        this.state.discount = (event.data as any).discount; break
      case 'OrderShipped':
        this.state.status = 'shipped'; break
    }
  }

  rebuild(events: Event[]): OrderState {
    events.forEach(e => this.apply(e))
    return this.state
  }
}`,
            language: 'typescript',
            explanation: 'Events append-only store. Current state replay se derive hoti hai. Version field optimistic locking. TypeScript aggregate class events apply karta hai ek-ek karke.',
            filename: 'event-sourcing.ts',
          }}
          realWorldScenario={'E-commerce: "how did this order end up in this state?" — replay events to see exactly what happened. CQRS: orders read service alag scale karo (millions of reads) vs write service (thousands of writes).'}
          commonMistakes={[
            { mistake: 'Har project mein event sourcing apply karna', why: 'Complexity bahut badhti hai — simple CRUD apps ke liye overkill', fix: 'Event sourcing sirf jab audit trail, undo, or complex state reconstruction genuinely zaroori ho' },
          ]}
          proTip="Projections se event store se read models banao — events se materialized views create karo specific use cases ke liye. EventStoreDB ya Apache Kafka event sourcing ke liye specialized tools hain."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="db-design-patterns" />
    </div>
  )
}
