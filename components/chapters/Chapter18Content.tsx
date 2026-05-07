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
          Senior engineers aur juniors mein ek bada fark hota hai — <strong className="text-[#F5F5F7]">tests likhna</strong>. Bina tests ke code refactor karna andhere mein chalna hai. Is chapter mein hum Jest, Supertest, mocking, aur CI/CD mein testing integrate karna sikhenge.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Testing ek investment hai — pehle thoda time lagta hai, lekin long-term mein bugs se bachat aur confidence milta hai ki production mein kuch toot nahi jaayega.
        </p>
      </div>

      {/* ConceptCard 1: Testing Pyramid */}
      <div id="testing-pyramid">
        <ConceptCard
          title="Testing Pyramid — Sahi Balance"
          emoji="🔺"
          difficulty="advanced"
          whatIsIt="Testing pyramid ek model hai jo batata hai ki kitne types ke tests likhne chahiye. Base mein unit tests (sabse zyada), middle mein integration tests, aur top par E2E tests (sabse kam). Ye balance speed aur confidence dono deta hai."
          whenToUse={[
            'New project setup karte waqt — test strategy decide karo',
            'Slow test suite fix karte waqt — zyada E2E se unit mein shift karo',
            'Team mein testing standards define karte waqt',
            'CI/CD pipeline design karte waqt — fast feedback chahiye',
          ]}
          whyUseIt="Pyramid follow karne se test suite fast rehti hai. E2E tests slow hain (browser chalana padta hai), brittle hain (UI change hone par break), aur maintain karne mushkil hain. Unit tests milliseconds mein run hote hain — thousands bhi 30 seconds mein. Integration tests middle ground hain."
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
            explanation: 'Pyramid ke ratios approximate hain — project ke hisaab se adjust karo. API-heavy apps mein integration tests zyada hon, UI-heavy mein E2E. Key insight: unit tests ka coverage high raho, E2E minimum rakho.',
          }}
          realWorldScenario="Ek e-commerce startup ne sirf E2E tests likhne ke baad realize kiya ki CI pipeline 45 minutes le raha tha. Testing pyramid adopt karke 80% unit tests kiye — CI 8 minutes mein aa gaya. Developers ko instant feedback milne laga aur productivity double ho gayi."
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
          proTip="100% code coverage mat dhundo — meaningful coverage dhundo. 70% meaningful tests > 100% meaningless snapshot tests. Coverage report lines ki nahi, branches ki dekho — branch coverage zyada important hai."
        />
      </div>

      {/* ConceptCard 2: Jest Setup */}
      <div id="jest-setup">
        <ConceptCard
          title="Jest Setup for Node.js"
          emoji="🧪"
          difficulty="advanced"
          whatIsIt="Jest ek JavaScript testing framework hai jo zero config ke saath kaam karta hai. Isme test runner, assertion library, aur mocking sab built-in hai. Node.js projects mein industry standard hai."
          whenToUse={[
            'Naya Node.js project start karo — pehla package install karo Jest',
            'TypeScript projects ke liye — ts-jest ya babel-jest se',
            'Coverage reports chahiye — built-in coverage reporter',
            'Parallel test execution — Jest automatically parallelize karta hai',
          ]}
          whyUseIt="Jest sab kuch ek jagah deta hai — test runner, assertions (expect), mocking (jest.fn(), jest.mock()), coverage. Mocha+Chai+Sinon jaisi multiple libraries ki zaroorat nahi. TypeScript ke saath bhi bahut smooth kaam karta hai ts-jest ke saath."
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
            explanation: 'ts-jest TypeScript directly run karta hai bina compile step ke. coverageThreshold se CI mein coverage gate enforce hoti hai. setupFilesAfterFramework mein test DB connection ya global mocks setup karo.',
          }}
          realWorldScenario="SaaS product mein 300+ tests hain jo 15 seconds mein run hote hain Jest ke parallel execution ke saath. Coverage 82% hai aur har PR mein GitHub Actions mein automatically run hote hain. Team ko confidence milta hai ki koi regression nahi aayi."
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
          proTip="jest --maxWorkers=50% se CPU ka 50% use karo tests ke liye — baaki OS ke liye rakho. CI mein --forceExit use karo agar async resources properly cleanup nahi ho rahe. Watch mode mein jest --watch --testPathPattern=auth sirf auth tests run karta hai."
        />
      </div>

      {/* ConceptCard 3: Supertest */}
      <div id="supertest">
        <ConceptCard
          title="Supertest — API Testing"
          emoji="🚀"
          difficulty="advanced"
          whatIsIt="Supertest ek library hai jo Express/Fastify routes ko in-process test karne deta hai — koi actual server start nahi karna padta. HTTP request simulate karo aur response check karo. Integration testing ke liye perfect."
          whenToUse={[
            'Express routes test karo — GET, POST, PUT, DELETE',
            'Auth middleware test karo — 401, 403 responses',
            'Request validation test karo — bad input ka behavior',
            'Error handling test karo — 500 responses, error formats',
          ]}
          whyUseIt="Supertest Express app ko directly import karta hai — no port, no network. Fast hai (no TCP overhead), reliable hai (no port conflicts), aur testing mein DB mocks inject kar sakte ho easily. Real HTTP client ka feel deta hai bina infrastructure ki tension ke."
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
            explanation: 'app.ts mein server start mat karo (no app.listen) — sirf app export karo. Supertest apna internal server banata hai. afterAll mein DB connection close karo warna Jest hang karega.',
          }}
          realWorldScenario="Node.js backend mein 50+ API endpoints hain. Supertest se har endpoint ka happy path, error cases, aur auth testing 3 minutes mein run hoti hai. Koi bhi route change karo — immediate feedback milta hai ki kuch break hua ya nahi."
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
          proTip="Test fixtures ke liye beforeEach mein test data seed karo aur afterEach mein clean karo — ya transaction rollback use karo. Har test independent hona chahiye — order matter nahi karna chahiye."
        />
      </div>

      {/* ConceptCard 4: Mocking */}
      <div id="mocking">
        <ConceptCard
          title="Mocking in Node.js"
          emoji="🎭"
          difficulty="advanced"
          whatIsIt="Mocking matlab real dependencies (database, external APIs, file system) ko fake implementations se replace karna tests mein. Ye unit tests ko fast aur reliable banata hai — real network calls ya DB queries nahi hote."
          whenToUse={[
            'Unit tests mein database calls mock karo',
            'External API calls mock karo (payment gateway, email service)',
            'File system operations mock karo',
            'Time-dependent code test karo — Date.now() mock karo',
          ]}
          whyUseIt="Real DB se tests run karne par: tests slow hote hain, flaky hote hain (network issues), aur test data manage karna mushkil hota hai. Mocking se tests milliseconds mein run hote hain, always consistent rehte hain, aur har scenario simulate kar sakte ho — including error cases."
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
            explanation: 'jest.mock() module ko hoist karta hai — sab imports se pehle run hota hai. mockResolvedValueOnce se specific call ka behavior define karo. clearAllMocks se mock state reset hoti hai — tests independent rehte hain.',
          }}
          realWorldScenario="Payment service mein Stripe API mock karna zaroori hai — real API call test mein nahi karna chahte (cost, side effects). jest.mock('stripe') se har payment scenario test karo: success, card declined, network timeout — bina real Stripe dashboard touch kiye."
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
          proTip="jest.spyOn(console, 'error').mockImplementation(() => {}) se noisy error logs suppress karo tests mein. jest.useFakeTimers() se setTimeout/setInterval control karo bina actual wait kiye — time-travel testing!"
        />
      </div>

      {/* ConceptCard 5: CI/CD Testing */}
      <div id="ci-cd-testing">
        <ConceptCard
          title="CI/CD mein Testing"
          emoji="⚙️"
          difficulty="advanced"
          whatIsIt="CI/CD (Continuous Integration/Deployment) mein tests automatically run hote hain har push ya PR par. GitHub Actions se test → lint → coverage → deploy pipeline banao. Agar tests fail hon toh deploy automatically rok do."
          whenToUse={[
            'Har PR par tests automatically run karo',
            'Coverage threshold enforce karo — 80% se niche toh fail',
            'Multiple Node.js versions par test karo',
            'Deploy se pehle tests pass karo — quality gate',
          ]}
          whyUseIt="CI/CD testing se 'works on my machine' problem khatam hoti hai. Har developer ka code same clean environment mein test hota hai. Coverage thresholds enforce karte hain ki team tests nahi skip kare. Automated deployment sirf tested code ko production mein jaane deta hai."
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
            explanation: 'services block mein test DB spin up hoti hai automatically. matrix strategy se multiple Node versions par test hota hai. npm ci (not npm install) use karo — deterministic install, faster CI. Env vars secrets mein store karo.',
          }}
          realWorldScenario="Team mein 5 developers hain aur har din 20+ PRs aate hain. GitHub Actions se har PR par automatically tests run hote hain — 3 minutes mein pata chal jaata hai ki code kaam karta hai ya nahi. Coverage 80% se niche gayi toh PR merge block ho jaata hai. Production bugs 70% reduce hue."
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
          proTip="GitHub Actions cache karo npm dependencies — actions/cache@v4 use karo. Pehli run ke baad 60-70% time save hota hai. path: ~/.npm aur key: ${{ hashFiles('package-lock.json') }} se perfect cache invalidation milti hai."
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
          Complete Express Route Test Example
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
          Ye pattern follow karo — happy path test + error cases test. Har status code aur response body verify karo.
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
