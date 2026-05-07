'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const testingQuiz = [
  {
    question: 'Testing pyramid mein sabse zyada tests kaunse hone chahiye?',
    options: [
      { text: 'E2E tests — kyunki ye sab kuch test karte hain', correct: false, explanation: 'E2E tests slow aur brittle hote hain — kam hone chahiye.' },
      { text: 'Unit tests — fast, cheap, aur focused', correct: true, explanation: 'Bilkul sahi! Unit tests base hain — fast execution, low cost, targeted feedback.' },
      { text: 'Integration tests — dono ko cover karte hain', correct: false, explanation: 'Integration tests important hain lekin pyramid mein middle mein hote hain.' },
      { text: 'Manual tests — human judgment zaroori hai', correct: false, explanation: 'Manual tests automation se replace karo jahan possible ho.' },
    ],
  },
  {
    question: 'Supertest kiska use karta hai routes test karne ke liye?',
    options: [
      { text: 'Browser open karke real HTTP requests bhejta hai', correct: false, explanation: 'Supertest browser nahi chalata — ye Node.js mein hi kaam karta hai.' },
      { text: 'Express app ko directly in-process test karta hai bina server start kiye', correct: true, explanation: 'Sahi! Supertest app instance ko directly test karta hai — fast aur no port conflicts.' },
      { text: 'Database se directly data fetch karta hai', correct: false, explanation: 'Supertest HTTP layer test karta hai, database nahi.' },
      { text: 'Mock server banata hai separate port par', correct: false, explanation: 'Supertest actual Express app use karta hai, mock server nahi.' },
    ],
  },
  {
    question: 'jest.mock() kab use karte hain?',
    options: [
      { text: 'Jab actual implementation test karni ho', correct: false, explanation: 'jest.mock() implementation ko replace karta hai — actual test ke liye nahi.' },
      { text: 'Jab external dependencies (database, API) ko isolate karna ho unit test mein', correct: true, explanation: 'Correct! Mocking se unit test fast aur reliable banti hai — real DB/API par depend nahi karti.' },
      { text: 'Sirf frontend components ke liye', correct: false, explanation: 'jest.mock() backend aur frontend dono mein use hota hai.' },
      { text: 'Jab test fail ho raha ho', correct: false, explanation: 'Mocking architecture ka decision hai, failing tests ka fix nahi.' },
    ],
  },
  {
    question: 'GitHub Actions mein coverage threshold fail hone par kya hota hai?',
    options: [
      { text: 'Sirf warning aata hai, PR merge ho jaata hai', correct: false, explanation: 'Threshold set karo toh CI fail hoti hai — merge block ho jaata hai.' },
      { text: 'CI pipeline fail hoti hai aur PR merge block ho jaata hai', correct: true, explanation: 'Bilkul sahi! --coverageThreshold flag se CI fail karo jab coverage low ho — quality gate.' },
      { text: 'Automatically tests generate ho jaate hain', correct: false, explanation: 'Coverage tools tests generate nahi karte — sirf report karte hain.' },
      { text: 'Production deployment automatic ho jaata hai', correct: false, explanation: 'Coverage failure deployment trigger nahi karta — CI fail hoti hai.' },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Chapter18Content() {
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
          Testing ke bina ship mat karo!
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Kya aap jaante ho ki bina tests ke code refactor karna andhere mein furniture shift karna hai? Har cheez theek lagti hai — phir raat ko pair mein table lag jaati hai. Tests woh lights hain jo cheezein clearly dikhati hain. Senior engineers aur juniors mein ek bada fark hai — <strong className="text-[#F5F5F7]">tests likhna</strong>. Ye patience nahi, ye professionalism hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Testing ek investment hai — pehle 2 ghante tests likhne mein. Baad mein 20 ghante debugging nahi. Aur sabse important: tests confidence dete hain — bina dar ke refactor karo, naye features add karo — agar kuch toot jaye, test fail ho jaata hai. Production mein nahi, development mein.
        </p>
      </div>

      {/* ConceptCard 1: Testing Pyramid */}
      <div id="testing-pyramid">
        <ConceptCard
          title="Testing Pyramid — Sahi Balance"
          emoji="🔺"
          difficulty="advanced"
          whatIsIt="Testing pyramid ek brilliant insight hai. Socho building ki tarah: strong foundation (unit tests — bahut saare, fast, cheap), solid walls (integration tests — medium, important paths), chota roof (E2E tests — kam, slow, expensive). Agar foundation weak hai — building giregi. Agar sirf roof banao (sirf E2E) — koi stability nahi. Balance: 70% unit, 20% integration, 10% E2E — ye fast feedback aur confidence dono deta hai."
          whenToUse={[
            'New project setup karte waqt — test strategy decide karo',
            'Slow test suite fix karte waqt — zyada E2E se unit mein shift karo',
            'Team mein testing standards define karte waqt',
            'CI/CD pipeline design karte waqt — fast feedback chahiye',
          ]}
          whyUseIt="Ab sawaal ye aata hai — E2E tests toh sab kuch test karte hain, toh unit tests kyun? Kyunki E2E tests slow hain (30 seconds+), brittle hain (ek UI element ka class change hone par 50 tests break), aur fail hone par clear feedback nahi milti — kahan exactly fail hua? Unit test fail ho toh exact function clear hai. 1000 unit tests = 30 seconds. 100 E2E tests = 50 minutes. CI mein waiting 50 minutes — developer frustration peak karta hai."
          howToUse={{
            filename: 'testing-pyramid.md',
            language: 'markdown',
            code: `# Testing Pyramid for Node.js

## Unit Tests (70%) — Jest
- Individual functions, classes, utilities test karo
- External dependencies mock karo (DB, APIs, file system)
- Run time: < 10ms per test
- Example: auth service ki validate() function

## Integration Tests (20%) — Jest + Supertest
- Multiple units ek saath kaam karte hain
- Real DB (test DB) use karo, external APIs mock karo
- Run time: 100ms - 1s per test
- Example: POST /auth/login — DB tak end-to-end

## E2E Tests (10%) — Playwright/Cypress
- Full user journey — browser se DB tak
- Slow, expensive, run nightly ya on release
- Run time: 5s - 30s per test
- Example: user signup → login → dashboard flow`,
            explanation: 'Under the hood: Pyramid ke ratios approximate hain — project ke hisaab se adjust karo. API-heavy apps mein integration tests zyada hon, UI-heavy mein E2E. Unit test milliseconds mein run hote hain kyunki koi I/O nahi — pure function calls. Integration tests real DB hit karte hain — 100ms-1s. E2E browser spawn karta hai — 5-30s. Speed difference ye ratios justify karta hai.',
          }}
          realWorldScenario="E-commerce startup real story: sirf E2E tests likhe. CI pipeline 45 minutes. Developer PR push kare, coffee peene jaaye, wapas aaye, results dekhe, fix kare, push kare — 1 PR merge karne mein 2 ghante. Testing pyramid adopt kiya — 80% unit tests. CI 8 minutes. Developers feedback loop short hua, productivity double. Ye measurement hai, estimate nahi."
          commonMistakes={[
            {
              mistake: 'Sirf E2E tests likhna kyunki "full coverage dete hain"',
              why: 'E2E tests slow, brittle, aur expensive hote hain. Ek small UI change 50 tests break kar sakta hai.',
              fix: 'Business logic unit test karo. Integration tests critical paths ke liye. E2E sirf happy path user journeys ke liye.',
            },
            {
              mistake: 'Test mein implementation details test karna (private methods, internal state)',
              why: 'Implementation change hone par tests break hote hain — false negatives milte hain aur refactoring mushkil ho jaati hai.',
              fix: 'Public API aur behavior test karo — "kya function sahi output deta hai" nahi "kaise karta hai".',
            },
          ]}
          proTip="100% code coverage ka trap: developers tests likhte hain sirf coverage ke liye — empty functions, trivial assertions. Coverage green, quality zero. Meaningful tests likho — edge cases, error paths, business logic. 70% meaningful branch coverage >>> 100% line coverage with garbage tests. jest --coverage report mein 'Branches' column dekho — ye actual decision points test karta hai, sirf execution nahi."
        />
      </div>

      {/* ConceptCard 2: Jest Setup */}
      <div id="jest-setup">
        <ConceptCard
          title="Jest Setup for Node.js"
          emoji="🧪"
          difficulty="advanced"
          whatIsIt="Pehle zamaane mein testing ke liye Mocha (runner) + Chai (assertions) + Sinon (mocking) + Istanbul (coverage) — 4 alag tools, 4 alag configs, integration issues. Jest ne sab ek jagah kiya — runner, assertions, mocking, coverage sab built-in. Zero config — install karo, test likhna shuru karo. TypeScript ke saath ts-jest add karo — compilation step automatically. Kya aap jaante ho Jest parallel test execution karta hai by default? 1000 tests simultaneously run hote hain."
          whenToUse={[
            'Naya Node.js project start karo — pehla package install karo Jest',
            'TypeScript projects ke liye — ts-jest ya babel-jest se',
            'Coverage reports chahiye — built-in coverage reporter',
            'Parallel test execution — Jest automatically parallelize karta hai',
          ]}
          whyUseIt="Ab sawaal ye aata hai — ts-jest ya babel-jest? ts-jest TypeScript directly run karta hai — type checking during tests. babel-jest TypeScript transpile karta hai bina type checking ke — faster lekin type errors nahi pakadta. Production-grade project mein ts-jest use karo — type errors test mein bhi pakad mein aayein. coverageThreshold CI mein quality gate hai — 80% se niche coverage hogi toh CI fail hogi, PR merge block hogi. Team discipline automatically enforce hoti hai."
          howToUse={{
            filename: 'jest.config.ts',
            language: 'typescript',
            code: `// jest.config.ts
import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Test file patterns
  testMatch: ['**/__tests__/**/*.test.ts', '**/*.spec.ts'],

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts', // Entry point skip karo
  ],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Module path aliases (agar tsconfig mein hain)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Setup file (DB connection etc.)
  setupFilesAfterFramework: ['<rootDir>/src/test-setup.ts'],
}

export default config

// package.json scripts:
// "test": "jest",
// "test:watch": "jest --watch",
// "test:coverage": "jest --coverage"`,
            explanation: 'Under the hood: ts-jest TypeScript directly run karta hai — ts-node jaisa kaam karta hai tests ke liye. coverageThreshold se CI quality gate enforce hoti hai — jest --coverage run karo, agar branches 70% se niche gayi toh exit code 1 = CI fail. setupFilesAfterEachFramework mein global test setup karo — DB connection, global mocks, environment variables. jest.config.ts mein type checking hai — wrong config values compile error.',
          }}
          realWorldScenario="SaaS product: 300+ tests, 15 seconds mein run hote hain Jest parallel execution ke saath. Coverage 82%. Har PR mein GitHub Actions automatically tests run karti hai. Naya developer join kiya — ek week mein independently features ship kar raha hai kyunki tests safety net dete hain. Existing code confidently refactor karo — tests batayenge kuch toot gaya kya."
          commonMistakes={[
            {
              mistake: 'jest.config.js use karna TypeScript project mein',
              why: 'Type safety nahi milti — config errors runtime par pakad mein aate hain.',
              fix: 'jest.config.ts use karo ts-jest ke saath — compile-time config validation milti hai.',
            },
            {
              mistake: 'Test files src/ folder mein rakhna instead of __tests__/',
              why: 'Production build mein test files include ho jaati hain — bundle size badhta hai.',
              fix: '__tests__/ folder use karo ya *.spec.ts/*.test.ts naming convention — build se exclude karo.',
            },
          ]}
          proTip="Jest watch mode ek powerful developer experience hai — jest --watch se sirf changed files ke tests run hote hain. TDD (Test-Driven Development) ke liye ideal — test likhо, fail dekho, implementation likhо, pass dekho. jest --testPathPattern=auth sirf auth-related tests run karta hai — specific module pe kaam karte waqt fast feedback. --maxWorkers=50% CI mein use karo — baaki CPU OS ke liye. --forceExit agar test suite hang kare — async cleanup issue hai."
        />
      </div>

      {/* ConceptCard 3: Supertest */}
      <div id="supertest">
        <ConceptCard
          title="Supertest — API Testing"
          emoji="🚀"
          difficulty="advanced"
          whatIsIt="Supertest ka ek magical feature hai — Express app ko bina server start kiye test karo. Surprise: request(app).post('/auth/login').send({...}) — koi port nahi, koi network nahi, koi startup time nahi. Supertest internally ek ephemeral server create karta hai — test ke liye — phir destroy. Fast, no port conflicts, no 'EADDRINUSE' errors. Integration testing ka best friend."
          whenToUse={[
            'Express routes test karo — GET, POST, PUT, DELETE',
            'Auth middleware test karo — 401, 403 responses',
            'Request validation test karo — bad input ka behavior',
            'Error handling test karo — 500 responses, error formats',
          ]}
          whyUseIt="Ab sawaal ye aata hai — Supertest sirf happy path test karne ke liye hai? Nahi — error handling test karna aur bhi important hai. 401 unauthorized, 400 bad input, 500 server error — sab scenarios test karo. Ek common mistake: sirf 200 responses test karna. Production mein 40% traffic error responses hoti hai — ye test hona chahiye. .set('Authorization', `Bearer ${token}`) se auth header simulate karo."
          howToUse={{
            filename: '__tests__/auth.test.ts',
            language: 'typescript',
            code: `import request from 'supertest'
import app from '../src/app' // Express app (without app.listen!)
import { db } from '../src/db'

// Test khatam hone par DB connection close karo
afterAll(async () => {
  await db.close()
})

describe('POST /auth/login', () => {
  it('returns JWT on valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'password123' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(typeof response.body.token).toBe('string')
  })

  it('returns 401 on invalid password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'wrong' })

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')
  })

  it('returns 400 on missing fields', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com' }) // password missing

    expect(response.status).toBe(400)
  })

  it('sends auth header correctly', async () => {
    const token = 'valid-jwt-token'
    const response = await request(app)
      .get('/api/profile')
      .set('Authorization', \`Bearer \${token}\`)

    expect(response.status).toBe(200)
  })
})`,
            explanation: 'Under the hood: Supertest app instance le ke internally http.createServer() use karta hai — ephemeral server, random port. Test khatam → server destroy. app.ts mein app.listen() call karo toh permanent server bhi start hoga — port conflict ya duplicate. Pattern: app.ts sirf Express app export kare, server.ts mein app.listen() ho. afterAll mein DB connection close karo — warna Jest process alive rehta hai — "Jest did not exit" warning.',
          }}
          realWorldScenario="50+ API endpoints: har endpoint ke 3-5 tests (happy path, auth fail, validation fail, edge case). 200+ Supertest tests — 45 seconds mein run hote hain. Developer ne auth middleware refactor kiya — instantly 8 tests fail hue — auth header format change ho gaya tha. Bina tests ke ye production mein jaata. Tests ne prevent kiya. Ye investment hai, cost nahi."
          commonMistakes={[
            {
              mistake: 'app.js mein app.listen() call karna — Supertest ke saath conflict',
              why: 'Supertest apna port manage karta hai — agar app.listen() call hoga toh port conflict ho sakta hai.',
              fix: 'app.ts mein sirf Express app export karo. server.ts mein app.listen() karo. Tests app.ts import karte hain.',
            },
            {
              mistake: 'afterAll mein DB connection close nahi karna',
              why: 'Jest "open handles" warning deta hai aur test suite hang ho jaati hai kyunki DB connection alive rehta hai.',
              fix: 'afterAll(async () => { await db.close() }) ya jest --forceExit (last resort) use karo.',
            },
          ]}
          proTip="Test isolation golden rule: har test independent hona chahiye — test 1 ke results test 2 ko affect nahi karein. beforeEach mein fresh test data seed karo, afterEach mein clean karo. Ya better: PostgreSQL transactions use karo — test ke andar transaction open karo, rollback at end — DB clean, koi cleanup code nahi. Jest parallel execution ke saath independent tests fast aur reliable hote hain."
        />
      </div>

      {/* Q&A Bridge */}
      <div
        className="rounded-xl p-5"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <p className="text-[#A78BFA] font-semibold mb-2">🤔 Ab sawaal ye aata hai...</p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Supertest se integration tests likhne lagte hain — lekin har test real DB hit karta hai, slow hai. Unit tests mein DB call kaise test karein bina actual DB ke? Mocking ka jawab hai. Jest mocking system se exact scenarios simulate karo — success, failure, edge cases — sab milliseconds mein.
        </p>
      </div>

      {/* ConceptCard 4: Mocking */}
      <div id="mocking">
        <ConceptCard
          title="Mocking in Node.js"
          emoji="🎭"
          difficulty="advanced"
          whatIsIt="Mocking socho rehearsal ki tarah — actress ko actual stage, real audience, real props ki zaroorat nahi practice ke liye. Fake stage, fake audience — lekin acting practice perfect hoti hai. Unit test mein actual DB ki zaroorat nahi — fake DB jo exactly woh return kare jo hum test karna chahte hain. Ye control deta hai — exactly woh scenario test karo jo chahiye, including error cases jo real environment mein reproduce karna mushkil hai."
          whenToUse={[
            'Unit tests mein database calls mock karo',
            'External API calls mock karo (payment gateway, email service)',
            'File system operations mock karo',
            'Time-dependent code test karo — Date.now() mock karo',
          ]}
          whyUseIt="Ab sawaal ye aata hai — mock karna matlab real behavior test nahi hota? Ye misunderstanding hai. Unit test mein: service logic test karo — mock DB se. Integration test mein: real DB pe route test karo — Supertest se. Dono alag levels hain. Mocking se error scenarios test karna asaan hai — mockResolvedValueOnce(new Error('DB connection failed')) — ye real DB mein simulate karna mushkil hai. Complete code paths test karo bina infrastructure ki dependency ke."
          howToUse={{
            filename: '__tests__/user-service.test.ts',
            language: 'typescript',
            code: `import { UserService } from '../src/services/UserService'
import { db } from '../src/db' // Module mock karenge

// Poora module mock karo
jest.mock('../src/db', () => ({
  db: {
    query: jest.fn(),
    transaction: jest.fn(),
  },
}))

const mockDb = db as jest.Mocked<typeof db>

describe('UserService', () => {
  let userService: UserService

  beforeEach(() => {
    userService = new UserService(db)
    jest.clearAllMocks() // Har test se pehle mocks reset karo
  })

  it('creates user successfully', async () => {
    // DB ka behavior define karo
    mockDb.query.mockResolvedValueOnce({
      rows: [{ id: 1, email: 'user@test.com', name: 'Test User' }],
    })

    const user = await userService.create({
      email: 'user@test.com',
      name: 'Test User',
    })

    expect(user.id).toBe(1)
    expect(mockDb.query).toHaveBeenCalledTimes(1)
    expect(mockDb.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO users'),
      expect.any(Array),
    )
  })

  it('throws error when email already exists', async () => {
    // DB error simulate karo
    mockDb.query.mockRejectedValueOnce(
      new Error('duplicate key value violates unique constraint')
    )

    await expect(
      userService.create({ email: 'existing@test.com', name: 'Test' })
    ).rejects.toThrow('Email already exists')
  })
})`,
            explanation: 'Under the hood: jest.mock() Babel/ts-jest transform ke through hoist hota hai file ke top pe — isliye import se pehle execute hota hai. mockResolvedValueOnce ek linked list maintain karta hai — har call ek item consume karta hai. clearAllMocks mock call history reset karta hai. jest.config.ts mein clearMocks: true set karo — hamesha automatic clear. Module mock Factory pattern: () => ({ ... }) — har import ke liye same mock object milta hai.',
          }}
          realWorldScenario="Payment service: Stripe API real calls karne par — actual charges, test mode credits deplete, network delays, occasional Stripe downtime. jest.mock('stripe') — full control: card.success, card.declined, card.insufficient_funds, network.timeout — sab scenarios milliseconds mein test karo. Koi real charge nahi, koi Stripe dependency nahi, consistent results. 50 payment scenarios = 2 seconds. Ye mocking ka superpower hai."
          commonMistakes={[
            {
              mistake: 'afterEach mein mocks clear nahi karna',
              why: 'Previous test ka mock state next test ko affect karta hai — flaky tests ka sabse common reason.',
              fix: 'jest.clearAllMocks() afterEach mein ya jest.config mein clearMocks: true set karo automatically.',
            },
            {
              mistake: 'Sab kuch mock karna — real logic bhi',
              why: 'Agar service logic bhi mock karo toh test kuch test nahi kar raha — useless hai.',
              fix: 'Sirf external dependencies mock karo. Unit under test ki real implementation use karo.',
            },
          ]}
          proTip="jest.useFakeTimers() ek powerful trick hai — time manipulation. Token expiry test karo: jest.useFakeTimers() → jest.advanceTimersByTime(16 * 60 * 1000) → 16 minutes fast-forward → token should be expired. Bina actually 16 minutes wait kiye! setTimeout, setInterval, Date.now() sab fake ho jaate hain. jest.spyOn(console, 'error').mockImplementation(() => {}) se expected error logs suppress karo — noisy test output clean hoti hai."
        />
      </div>

      {/* ConceptCard 5: CI/CD Testing */}
      <div id="ci-cd-testing">
        <ConceptCard
          title="CI/CD mein Testing"
          emoji="⚙️"
          difficulty="advanced"
          whatIsIt="CI/CD mein testing socho security guard ki tarah — har PR merge se pehle automatically check karta hai. GitHub Actions pipeline: code push hota hai → tests run hote hain → lint check → coverage check → agar sab pass toh merge allowed. Koi bhi bura code accidentally merge nahi ho sakta. 'Works on my machine' problem permanently solve hoti hai — same clean environment mein sab ke saath run hota hai."
          whenToUse={[
            'Har PR par tests automatically run karo',
            'Coverage threshold enforce karo — 80% se niche toh fail',
            'Multiple Node.js versions par test karo',
            'Deploy se pehle tests pass karo — quality gate',
          ]}
          whyUseIt="Ab sawaal ye aata hai — CI setup karna time lagta hai, kya worth it hai? Numbers: team mein 5 developers, 20 PRs per day. Bina CI: ek bug slip kare toh production incident, 2-3 ghante debug, rollback, hotfix. CI ke saath: bug test mein pakad mein aaye — 5 minutes fix. Return on investment: CI setup 1 din = production incidents se bachaya gaya time months mein. Ek developer ne tests skip kiye — coverage drop — CI fail — merge block — team notice kare. Accountability automatic."
          howToUse={{
            filename: '.github/workflows/test.yml',
            language: 'yaml',
            code: `name: Test & Coverage

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x] # Multiple versions test karo

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: testuser
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4

      - name: Node.js ${"{{ matrix.node-version }}"} setup
        uses: actions/setup-node@v4
        with:
          node-version: ${"{{ matrix.node-version }}"}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests with coverage
        run: npm run test:coverage
        env:
          DATABASE_URL: postgresql://testuser:testpass@localhost:5432/testdb
          JWT_SECRET: test-secret-key
          NODE_ENV: test

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          token: \${{ secrets.CODECOV_TOKEN }}`,
            explanation: 'Under the hood: GitHub Actions services block mein Docker containers spin up hote hain — PostgreSQL container ready hone ke baad workflow step shuru hota hai (health check). matrix strategy parallel jobs create karta hai — Node 18 aur Node 20 simultaneously test hote hain, time save. npm ci: package-lock.json strictly follow karta hai, faster, clean install. Secrets: Settings → Secrets → Actions → ${{ secrets.NAME }} se safe access.',
          }}
          realWorldScenario="Real team metrics: 5 developers, GitHub Actions CI. Before CI: 2-3 production bugs per week, each taking 2+ hours. After CI setup: 3 minutes per PR feedback, coverage gate 80%, production bugs dropped to 1-2 per month. Developer satisfaction up — nobody fears deployments anymore. 'We can ship on Friday' culture — CI gives confidence. Coverage 80% se niche gayi — PR blocked, team notice kare, tests likhe — quality improving flywheel."
          commonMistakes={[
            {
              mistake: 'npm install use karna CI mein instead of npm ci',
              why: 'npm install package-lock.json ignore kar sakta hai — different versions install ho sakti hain. CI mein non-deterministic builds.',
              fix: 'Hamesha npm ci use karo CI mein — package-lock.json ko strictly follow karta hai, faster bhi hai.',
            },
            {
              mistake: 'Secrets hardcode karna .github/workflows/ mein',
              why: 'Secrets public repository mein expose ho jaate hain — security breach.',
              fix: 'GitHub Secrets use karo — Settings → Secrets → Actions. Workflow mein ${{ secrets.MY_SECRET }} se access karo.',
            },
          ]}
          proTip="CI speed optimization: npm dependencies cache karo — actions/setup-node@v4 mein cache: 'npm' sirf is se. First run: 60 seconds npm install. Subsequent runs: 10 seconds cache restore. 60-70% CI time save. matrix: node-version: [18.x, 20.x] se multiple Node versions pe test karo — version compatibility issues early pakad mein aate hain. services: block mein test PostgreSQL spin up — real integration tests, no mocks needed."
        />
      </div>

      {/* Code Example */}
      <div
        id="complete-test-example"
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(6,182,212,0.05)',
          border: '1px solid rgba(6,182,212,0.2)',
        }}
      >
        <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-4">
          Complete Express Route Test — Step-by-Step Trace
        </h3>
        <pre
          className="text-sm text-[#A1A1AA] overflow-x-auto leading-relaxed"
          style={{
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <code>{`describe('POST /auth/login', () => {
  it('returns JWT on valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
  it('returns 401 on invalid password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'wrong' });
    expect(response.status).toBe(401);
  });
});`}</code>
        </pre>
        <p className="text-sm text-[#71717A] mt-3">
          Ye pattern follow karo — happy path + error cases dono test karo. Sirf 200 response test karna kaafi nahi. Har status code aur response body structure verify karo. Ye wahi code hai jo production failures se bachata hai.
        </p>
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 18 Quiz — Testing Mastery
          </h3>
          <p className="text-sm text-[#71717A]">
            4 questions — testing concepts aur best practices check karo!
          </p>
        </div>
        <QuizSection questions={testingQuiz} chapterSlug="testing" />
      </div>
    </div>
  )
}
