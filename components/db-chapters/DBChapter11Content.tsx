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
          Junior developer aur senior developer ka fark kya hai? Junior tables aur queries likhta hai. Senior patterns likhta hai. Repository pattern — testing ke liye database mock karo bina architecture change kiye. Soft deletes — data kabhi permanently delete mat karo jab tak absolutely zaroorat na ho. Audit trails — koi bhi change trace karo, compliance ready raho. Event Sourcing — current state store karne ki jagah history store karo. CQRS — reads aur writes alag scale karo.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Ye patterns har project mein use nahi hote — lekin jab zaroorat padti hai, inhe jaanana aur implement karna senior engineer ki pehchan hai.
        </p>
      </div>

      <div id="repository-pattern">
        <ConceptCard
          title="Repository Pattern — Data Access Abstraction"
          emoji="🏛️"
          difficulty="intermediate"
          whatIsIt="Repository pattern ek abstraction layer hai aapke business logic aur database ke beech. Interface define karo: findById, findAll, save, update, delete. PostgreSQL implementation likhte ho — interface implement karo. MongoDB implementation likhni ho — same interface implement karo. Service ko pata hi nahi kaunsa database hai — sirf interface jaanta hai. Under the hood: Dependency Injection. Service constructor mein repository inject karo — production mein real repository, tests mein mock repository. Database switch karna? Sirf nayi implementation inject karo, service code zero change."
          whenToUse={[
            'Medium-large applications jahan testability important hai',
            'Database migration possible ho in future',
            'Unit testing ke liye (mock repositories inject karo)',
          ]}
          whyUseIt="Unit test likhna chahte ho UserService ke liye? Bina repository pattern ke: real database chahiye, test data seed karna padega, cleanup karna padega — slow, flaky tests. Repository pattern ke saath: MockUserRepository inject karo — in-memory array use karta hai, blazing fast tests, no database needed. 100 unit tests 2 seconds mein. Ye testability ka real meaning hai. Bonus: PostgreSQL se MongoDB migrate karne pe sirf MongoUserRepository likhna padega — service code same."
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
            explanation: 'Interface ek contract hai — ye methods honi chahiye, ye return types. PostgreSQL implementation real DB use karti hai. MockUserRepository in-memory array use karta hai — tests ke liye perfect. Service constructor mein Repository<User> type inject hota hai — TypeScript ensure karta hai dono implementations interface satisfy karte hain. Production: new UserService(new UserRepository(pool)). Testing: new UserService(new MockUserRepository()). Same service code, alag behavior — dependency injection ki power.',
            filename: 'repository-pattern.ts',
          }}
          realWorldScenario="Startup hai jo PostgreSQL use karta hai. Investors ne kaha 'MongoDB pe migrate karo — better for our use case'. Bina repository pattern ke: 6 weeks ka migration, har service file touch karna padega. Repository pattern ke saath: MongoUserRepository likhna hai, tests pass karne hain, wire karna hai — 3 days. Ye real business value hai design patterns ka — future flexibility ke liye cost aaj invest karo."
          commonMistakes={[
            { mistake: 'Repository mein business logic daalna', why: 'Repository data access layer hai — sirf CRUD operations. Business logic service layer mein', fix: 'Repository: queries only. Service: validation, business rules, orchestration' },
          ]}
          proTip="Repository mein domain-specific methods add karo — sirf generic CRUD nahi. UserRepository.findByCredentials(), UserRepository.findInactiveUsers(daysInactive), UserRepository.searchByNameOrEmail(query) — ye business-specific queries repository mein encapsulate hongi. Service code clean rehta hai — 'how to query' repository ka kaam, 'what to do with results' service ka kaam. Responsibility clear, testing easy."
        />
      </div>

      <div id="soft-deletes">
        <ConceptCard
          title="Soft Deletes & Audit Trails"
          emoji="🗑️"
          difficulty="intermediate"
          whatIsIt="Soft delete ek philosophy hai: data kabhi delete mat karo — sirf 'deleted' mark karo. deleted_at column NULL matlab active, timestamp matlab deleted. Queries mein WHERE deleted_at IS NULL — deleted records invisible. Restore karna? NULL set karo — one query. Hard delete se permanently gone, foreign key references broken, related data dangling. Audit trail: PostgreSQL trigger se automatic — koi bhi INSERT/UPDATE/DELETE par automatically audit_log mein entry. old_values aur new_values JSONB mein — exact state before and after. Who (user_id), What (table + action), When (timestamp), Before/After — complete picture."
          whenToUse={[
            'E-commerce orders, financial records — kabhi hard delete nahi',
            'GDPR compliance ke liye (user data fully deletable bhi)',
            'Undo functionality chahiye ho',
          ]}
          whyUseIt="GDPR compliance: user ne 'apna data delete karo' request kiya. Soft delete se marked deleted — user ko invisible, lekin data still there. GDPR ke liye actual hard delete bhi needed hoga — soft delete + scheduled hard delete after 30 days. Audit trail compliance ke liye: financial regulator ne audit mang liya — 'ye transaction kab, kiske dwara, kya tha pehle, kya hua baad mein'. Audit log mein sab hai — JSONB old_values/new_values mein exact snapshot. Application code mein manually log nahi karna — PostgreSQL trigger automatically handle karta hai."
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
            explanation: 'deleted_at NULL = active, timestamp = deleted. Active queries mein WHERE deleted_at IS NULL hamesha lagao — bhoolna easy hai, so global middleware ya repository level pe enforce karo. Audit trigger: TG_OP INSERT/UPDATE/DELETE operation type hai. row_to_json(OLD) aur row_to_json(NEW) JSONB snapshot hain — JSON mein poora row. current_setting(\'app.current_user_id\') app ne SET kiya hoga request mein — trigger wo read karta hai. Application code mein audit ka koi mention nahi — completely transparent.',
            filename: 'soft-delete-audit.sql',
          }}
          realWorldScenario="SaaS startup ka incident: customer support ne galti se important client account delete kar diya — Friday evening. Hard delete hota toh weekend barbad, data recovery impossible. Soft delete tha — 2 minutes mein restore. Client ko pata bhi nahi chala. Doosra scenario: SOC 2 compliance audit — auditor ne price change history maangi product ke liye. Audit trigger se automatic log — specific product ke saare price changes, kab, kiske dwara. Compliance passed. Ye do features ne company bachayi."
          commonMistakes={[
            { mistake: 'Soft delete mein UNIQUE constraints break hona', why: 'email UNIQUE — soft deleted user email se naya user nahi ban sakta', fix: 'Partial unique index: CREATE UNIQUE INDEX ON users(email) WHERE deleted_at IS NULL' },
          ]}
          proTip="UNIQUE constraint aur soft delete common conflict: email UNIQUE constraint hai, soft deleted user ka email se naya user nahi ban sakta. Solution: partial unique index — CREATE UNIQUE INDEX ON users(email) WHERE deleted_at IS NULL. Sirf active users pe uniqueness enforce hoti hai — deleted users ka email reuse possible. Ye PostgreSQL ka elegant feature hai jo ye common problem perfectly solve karta hai."
        />
      </div>

      <div id="event-sourcing">
        <ConceptCard
          title="Event Sourcing & CQRS"
          emoji="📋"
          difficulty="advanced"
          whatIsIt="Event Sourcing ek paradigm shift hai: state store mat karo — history store karo. Bank account ki tarah: balance store karne ki jagah transactions store karo, balance calculate karo jab chahiye. 'How did this happen?' ka jawab hamesha milega. Under the hood: append-only event store. Events kabhi delete ya modify nahi hote — immutable history. Current state: sab events replay karo. CQRS (Command Query Responsibility Segregation): write side (commands — OrderPlaced, ItemRemoved) aur read side (queries — GetOrderStatus, ListOrders) alag models, alag databases bhi possible. Read model denormalized view hai — fast reads, no JOINs."
          whenToUse={[
            'Complex audit requirements',
            'Undo/redo functionality',
            'Read/write performance alag scale karne ke liye (CQRS)',
            'Financial systems, order management',
          ]}
          whyUseIt="Sawaal: Event Sourcing kab use karna chahiye? Jab ye teeno true hon: (1) complete audit history genuinely zaroori ho (financial, legal, compliance), (2) undo/redo functionality chahiye, (3) 'what was the state at time T' ka jawab dena ho. Baaqi cases mein: overkill. Complexity bahut badhti hai — projections banana, events replay karna, eventual consistency handle karna. CQRS bhi carefully use karo — simple apps mein read/write same model rakho. Complex high-traffic apps mein reads 95% hain — unhe separately optimize karo (materialized views, Redis cache, separate read replicas)."
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
            explanation: 'events table append-only hai — INSERT only, no UPDATE/DELETE. version field optimistic locking karta hai — agar koi aur event add kare same version pe, conflict detect hoga. OrderAggregate TypeScript class events ek-ek karke apply karta hai — switch case se state build hoti hai. rebuild() method sab events replay karta hai — kisi bhi time se state derive karo. Ye time-travel debugging ke liye powerful hai: production bug investigate karo, events replay karo, exact state dekho jab bug hua.',
            filename: 'event-sourcing.ts',
          }}
          realWorldScenario="E-commerce order support ticket: 'customer ke order ka price galat hua — kaise hua?' Traditional app mein: impossible to know, current state bas order_amount dikhata hai. Event Sourcing mein: OrderPlaced (price 999), CouponApplied (discount 100), PriceAdjustedByAdmin (new price 850, reason: 'festival sale'). Exact sequence, exact user, exact time. Support ticket 2 minutes mein resolve. CQRS benefit: order write service transaction-consistent PostgreSQL pe, order read service Redis pe — millions of GET /orders/123 blazing fast, write service se decoupled."
          commonMistakes={[
            { mistake: 'Har project mein event sourcing apply karna', why: 'Complexity bahut badhti hai — simple CRUD apps ke liye overkill', fix: 'Event sourcing sirf jab audit trail, undo, or complex state reconstruction genuinely zaroori ho' },
          ]}
          proTip="Event Sourcing adopt karne se pehle: team mein koi hai jo ye architecture jaanta ho? Complexity justify karne ke liye use cases clearly define hain? Read model kaise banoge (projections)? Agar teeno ka satisfying jawab hai — proceed karo. EventStoreDB purpose-built hai event sourcing ke liye. Apache Kafka event streaming ke liye used hota hai, event sourcing implement kar sakte hain par alag abstraction level pe. Pehle pattern samjho, phir tool choose karo."
        />
      </div>

      <QuizSection questions={quiz} chapterSlug="db-design-patterns" />
    </div>
  )
}
