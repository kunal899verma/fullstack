'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const testingQuiz: QuizQuestion[] = [
  {
    question: 'Testing pyramid mein sabse zyada tests kaunse level pe hone chahiye?',
    options: [
      { text: 'E2E tests — real browser mein', correct: false, explanation: 'E2E tests sabse slow aur expensive hain — kam hone chahiye.' },
      { text: 'Unit tests — sabse fast, sabse cheap, sabse zyada', correct: true, explanation: 'Sahi! Unit tests pyramid base hain — fast, isolated, many. Integration aur E2E upar kam hote hain.' },
      { text: 'Integration tests — middle layer', correct: false, explanation: 'Integration tests middle mein hain — zyada nahi, kam nahi.' },
      { text: 'Sab equal number mein', correct: false, explanation: 'Testing pyramid uneven hai — unit tests sabse zyada, E2E sabse kam.' },
    ],
  },
  {
    question: 'jest.fn() kya karta hai?',
    options: [
      { text: 'Real function run karta hai aur log karta hai', correct: false, explanation: 'jest.fn() mock hai — real implementation nahi chalata.' },
      { text: 'Mock function banata hai — calls track karta hai, return value control karta hai', correct: true, explanation: 'Bilkul! jest.fn() calls count, arguments, return values sab control karta hai — real implementation replace karta hai.' },
      { text: 'Function ko async banata hai', correct: false, explanation: 'jest.fn() async se related nahi.' },
      { text: 'Function performance measure karta hai', correct: false, explanation: 'Performance measurement alag tools se hota hai.' },
    ],
  },
  {
    question: 'TDD cycle mein kaunsa order sahi hai?',
    options: [
      { text: 'Code → Test → Refactor', correct: false, explanation: 'Ye test-after approach hai, TDD nahi.' },
      { text: 'Red → Green → Refactor', correct: true, explanation: 'Sahi! Pehle failing test (Red), phir minimum code pass karo (Green), phir clean karo (Refactor).' },
      { text: 'Refactor → Red → Green', correct: false, explanation: 'Refactoring pehle nahi — pehle test fail karo.' },
      { text: 'Green → Red → Refactor', correct: false, explanation: 'Green pehle impossible hai — test exist karta hi nahi.' },
    ],
  },
  {
    question: 'async test mein error properly catch karne ka sahi tarika kya hai?',
    options: [
      { text: 'expect(asyncFn()).toThrow()', correct: false, explanation: 'async function Promise return karta hai — directly toThrow nahi kaam karta.' },
      { text: 'await expect(asyncFn()).rejects.toThrow() ya try/catch in test', correct: true, explanation: 'Sahi! rejects.toThrow() async rejections test karta hai. Ya try/catch mein expect assertion karo.' },
      { text: 'Async errors test nahi ho sakte', correct: false, explanation: 'Async errors Jest mein bilkul test ho sakte hain.' },
      { text: 'done() callback use karo', correct: false, explanation: 'done() callback pattern outdated hai — async/await preferred hai.' },
    ],
  },
  {
    question: 'jest.mock() kab use karte hain?',
    options: [
      { text: 'Jab function slow ho', correct: false, explanation: 'Speed optimization jest.mock() ka primary use nahi.' },
      { text: 'Jab external dependencies (DB, API, file system) ko isolate karna ho', correct: true, explanation: 'Sahi! Test mein real DB call nahi — jest.mock() se fake implementation inject karo. Fast, reliable, isolated tests.' },
      { text: 'Hamesha — real implementations kabhi nahi', correct: false, explanation: 'Mocking overuse se tests fragile hote hain — real behavior test nahi hota.' },
      { text: 'Sirf async functions ke liye', correct: false, explanation: 'jest.mock() sync aur async dono mock kar sakta hai.' },
    ],
  },
]

export default function JSChapter19Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(124,58,237,0.06)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Testing JavaScript — Code Ka Safety Net
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Tests confidence dete hain — code change karo, tests pass karein, ship karo. Bina tests ke refactoring fearful hoti hai. Testing pyramid, Jest basics, mocking, async testing, TDD — ye sab professional developer ke essential tools hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum practical testing patterns cover karenge jo aap real projects mein immediately use kar sako.
        </p>
      </div>

      <div id="testing-pyramid">
        <ConceptCard
          title="Testing Pyramid — Kya Test Karo, Kitna?"
          emoji="🔺"
          difficulty="advanced"
          whatIsIt="Testing pyramid batata hai kitne tests kis level pe hone chahiye. Base: Unit tests — fast, isolated, many. Middle: Integration tests — components ka interaction, moderate. Top: E2E tests — real browser/environment, slow, few. Each level trade-offs hain — speed vs confidence."
          whenToUse={[
            'Unit tests: individual functions, classes, components',
            'Integration tests: API endpoints, database queries, module interactions',
            'E2E tests: critical user flows — login, checkout, signup',
            'Snapshot tests: UI component rendering',
          ]}
          whyUseIt="Pyramid shape optimal balance hai — zyada unit tests fast feedback dete hain. E2E tests slow hain aur flaky (network issues, timing). Integration tests middle ground — real interactions test karo without full browser. Test strategy decide karo upfront — random tests waste of time."
          howToUse={{
            filename: 'testing-strategy.js',
            language: 'javascript',
            code: `// ── UNIT TEST — Pure function test ───────────────────────────────
// utils/price.js
export function calculateDiscount(price, discountPercent) {
  if (price < 0) throw new RangeError('Price cannot be negative')
  if (discountPercent < 0 || discountPercent > 100) {
    throw new RangeError('Discount must be between 0 and 100')
  }
  return price * (1 - discountPercent / 100)
}

// utils/price.test.js
import { calculateDiscount } from './price'

describe('calculateDiscount', () => {
  it('applies discount correctly', () => {
    expect(calculateDiscount(1000, 20)).toBe(800)
  })
  it('handles 0% discount', () => {
    expect(calculateDiscount(500, 0)).toBe(500)
  })
  it('handles 100% discount', () => {
    expect(calculateDiscount(500, 100)).toBe(0)
  })
  it('throws for negative price', () => {
    expect(() => calculateDiscount(-100, 10)).toThrow(RangeError)
  })
})

// ── INTEGRATION TEST — API endpoint ──────────────────────────────
// routes/users.test.js
import request from 'supertest'
import { app } from '../app'
import { db } from '../db'

describe('GET /api/users/:id', () => {
  beforeEach(async () => {
    await db.migrate.latest()
    await db.seed.run()  // Seed test data
  })

  afterEach(async () => {
    await db.migrate.rollback()
  })

  it('returns user when found', async () => {
    const res = await request(app).get('/api/users/1').expect(200)
    expect(res.body).toMatchObject({
      id: 1,
      name: expect.any(String),
      email: expect.stringContaining('@'),
    })
  })

  it('returns 404 when user not found', async () => {
    await request(app).get('/api/users/99999').expect(404)
  })
})

// ── E2E TEST — Playwright example ────────────────────────────────
// e2e/login.spec.ts
import { test, expect } from '@playwright/test'

test('user can log in', async ({ page }) => {
  await page.goto('/login')
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="password"]', 'password123')
  await page.click('[type="submit"]')

  await expect(page).toHaveURL('/dashboard')
  await expect(page.locator('h1')).toContainText('Dashboard')
})`,
            explanation: 'Unit tests pure functions — no setup, fast. Integration tests real DB/server — setup/teardown zaroori. E2E tests real browser — slow, fragile, use karo kam. 70% unit, 20% integration, 10% E2E — approximate target. Critical paths E2E se cover karo, edge cases unit se.',
          }}
          realWorldScenario="Payment system mein: Unit tests har calculation function ke liye. Integration tests payment API route ke liye — real DB lekin mocked payment gateway. E2E test sirf happy path checkout flow ke liye. Agar sab unit hote aur integration nahi — route level bugs miss hote."
          commonMistakes={[
            {
              mistake: 'Sirf E2E tests likhna — pyramid invert karna',
              why: 'E2E tests slow, flaky, debugging mushkil. CI slow, developers frustrated.',
              fix: 'Unit tests pehle banao — fast feedback loop. Integration tests API level pe. E2E sirf critical flows.',
            },
            {
              mistake: 'Test coverage percentage ko quality metric samajhna',
              why: '100% coverage bhi garbage tests ho sakti hain — assertions missing, wrong scenarios.',
              fix: 'Coverage useful hai dead code dhundne ke liye. Lekin test quality assertions ki quality se measure karo, coverage se nahi.',
            },
          ]}
          proTip="Property-based testing (fast-check library) se random inputs generate karo aur properties verify karo — 'for any valid input, output should satisfy X'. Edge cases automatically discover ho jaate hain jo manually nahi socha. Mutation testing (Stryker) code changes karta hai — agar test fail nahi hote toh tests weak hain."
        />
      </div>

      <div id="jest-basics">
        <ConceptCard
          title="Jest Basics — Testing Framework"
          emoji="🃏"
          difficulty="advanced"
          whatIsIt="Jest Facebook ka JavaScript testing framework hai — test runner, assertion library, mocking, coverage sab built-in. describe se tests group karo, it/test se individual test likho, expect se assertions. beforeEach/afterEach setup aur cleanup karo. Matchers — toBe, toEqual, toContain, toThrow, toHaveBeenCalled."
          whenToUse={[
            'Unit aur integration tests likhne ke liye',
            'Mocking aur spying — jest.fn(), jest.mock()',
            'Coverage report — kaunsa code test nahi',
            'Snapshot testing — UI components',
          ]}
          whyUseIt="Jest zero-config setup deta hai — npm install jest aur chalo. Parallel test execution se fast. Built-in watch mode se instant feedback. Snapshot testing UI regressions catch karta hai. TypeScript ke saath ts-jest ya @swc/jest se seamless."
          howToUse={{
            filename: 'jest-basics.test.js',
            language: 'javascript',
            code: `// ── BASIC TEST STRUCTURE ─────────────────────────────────────────
describe('User Service', () => {
  // Shared state — scope to describe block
  let service

  beforeAll(async () => {
    // Once before all tests in this describe
    await setupDatabase()
  })

  afterAll(async () => {
    await teardownDatabase()
  })

  beforeEach(() => {
    // Before each test — fresh service
    service = new UserService(mockDb)
  })

  afterEach(() => {
    jest.clearAllMocks()  // Mock call counts reset
  })

  it('creates user with hashed password', async () => {
    const user = await service.createUser({ name: 'Rahul', password: 'secret' })
    expect(user.name).toBe('Rahul')
    expect(user.password).not.toBe('secret')  // Should be hashed
    expect(user.password).toMatch(/^\$2[aby]?\$\d+\$/)  // bcrypt pattern
  })

  describe('findById', () => {
    it('returns user when found', async () => {
      const user = await service.findById('123')
      expect(user).not.toBeNull()
      expect(user).toMatchObject({
        id: '123',
        email: expect.stringContaining('@'),
        createdAt: expect.any(Date),
      })
    })

    it('returns null for unknown id', async () => {
      const user = await service.findById('nonexistent')
      expect(user).toBeNull()
    })
  })
})

// ── MATCHERS ─────────────────────────────────────────────────────

// Equality
expect(2 + 2).toBe(4)                    // Strict equality (===)
expect({ a: 1 }).toEqual({ a: 1 })       // Deep equality
expect({ a: 1, b: 2 }).toMatchObject({ a: 1 })  // Partial match

// Type checking
expect('hello').toEqual(expect.any(String))
expect(42).toEqual(expect.any(Number))

// Arrays
expect([1, 2, 3]).toContain(2)
expect([1, 2, 3]).toHaveLength(3)
expect([1, 2, 3]).toEqual(expect.arrayContaining([1, 3]))  // Order doesn't matter

// Strings
expect('hello world').toContain('world')
expect('hello').toMatch(/^hel/)

// Errors
expect(() => JSON.parse('invalid')).toThrow()
expect(() => JSON.parse('invalid')).toThrow(SyntaxError)
expect(() => fn()).toThrow('specific message')

// Truthiness
expect(null).toBeNull()
expect(undefined).toBeUndefined()
expect('').toBeFalsy()
expect(1).toBeTruthy()`,
            explanation: 'describe groups related tests. beforeEach fresh state ensure karta hai. expect(value).matcher() se assertions. toMatchObject partial object match karta hai — flexible. expect.any() type-based matching. jest.clearAllMocks() mocks reset karta hai between tests.',
          }}
          realWorldScenario="React component testing with Jest + React Testing Library: render(<Button onClick={fn}>Click</Button>); userEvent.click(screen.getByRole('button')); expect(fn).toHaveBeenCalledTimes(1); expect(screen.getByRole('button')).toHaveClass('active')."
          commonMistakes={[
            {
              mistake: 'toBe vs toEqual confuse karna objects ke liye',
              why: 'toBe strict equality hai (===) — objects reference comparison. toEqual deep comparison.',
              fix: 'Objects ke liye hamesha toEqual use karo. Primitives (strings, numbers) ke liye toBe.',
            },
            {
              mistake: 'async test mein await bhoolna',
              why: 'Async test bina await ke — test pass ho jaata hai assertion se pehle (false positive).',
              fix: 'Async test functions mein async/await use karo: it("test", async () => { await someAsyncFn(); expect(...) })',
            },
          ]}
          proTip="jest.config.js mein setupFilesAfterFramework se global setup karo — jest-extended matchers, custom matchers. --watch mode development mein use karo — save karo, tests run. --coverage se HTML report milti hai. GitHub Actions se CI mein jest --ci flag use karo — watch mode disable, fail fast."
        />
      </div>

      <div id="mocking">
        <ConceptCard
          title="Mocking — Dependencies Isolate Karo"
          emoji="🎭"
          difficulty="advanced"
          whatIsIt="Mocking real dependencies ko fake implementations se replace karta hai — testing ke liye. jest.fn() spy/stub function banata hai. jest.mock() module completely mock karta hai. jest.spyOn() existing function pe spy lagata hai. Mocking se tests fast, reliable aur isolated hote hain."
          whenToUse={[
            'External APIs — real network calls test mein nahi',
            'Database — real DB slow aur state-dependent',
            'File system — reads/writes test environment mein',
            'Time — Date.now(), Math.random() deterministic banana',
          ]}
          whyUseIt="Real dependencies tests slow, flaky aur environment-dependent banate hain. Mocking se tests deterministic hote hain — same input → same output, always. Function calls verify karo — toHaveBeenCalledWith. Error scenarios easily simulate karo — database down, network timeout."
          howToUse={{
            filename: 'mocking.test.js',
            language: 'javascript',
            code: `// ── jest.fn() — Spy / Mock Function ─────────────────────────────
const mockFn = jest.fn()
mockFn('hello')
mockFn('world')

expect(mockFn).toHaveBeenCalledTimes(2)
expect(mockFn).toHaveBeenCalledWith('hello')
expect(mockFn).toHaveBeenLastCalledWith('world')

// Return value control karo
const mockGetUser = jest.fn()
  .mockResolvedValueOnce({ id: '1', name: 'Rahul' })  // First call
  .mockResolvedValueOnce({ id: '2', name: 'Priya' })  // Second call
  .mockRejectedValue(new Error('Not found'))           // All subsequent calls

// ── jest.mock() — Module mock ─────────────────────────────────────
// services/email.js
export const sendEmail = async (to, subject, body) => {
  // Real SMTP connection — slow, external
}

// In test:
jest.mock('./services/email')  // Auto-mock — all exports become jest.fn()
import { sendEmail } from './services/email'

// sendEmail is now a jest.fn()
sendEmail.mockResolvedValue({ success: true, messageId: 'msg_123' })

// Test:
it('sends confirmation email on registration', async () => {
  await registerUser({ email: 'test@example.com', password: 'pass' })
  expect(sendEmail).toHaveBeenCalledWith(
    'test@example.com',
    'Welcome!',
    expect.stringContaining('activation')
  )
})

// ── jest.spyOn() — Spy on existing function ───────────────────────
import * as utils from './utils'

it('calls helper function', () => {
  const spy = jest.spyOn(utils, 'formatDate')
  spy.mockReturnValue('2024-01-01')  // Override

  const result = processDate(new Date())

  expect(spy).toHaveBeenCalled()
  expect(result).toContain('2024-01-01')

  spy.mockRestore()  // Restore original implementation!
})

// ── MANUAL MOCK — __mocks__ directory ────────────────────────────
// __mocks__/axios.js (beside node_modules)
const axios = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => axios),
}
export default axios

// ── MOCK TIMERS ───────────────────────────────────────────────────
it('debounce waits for delay', () => {
  jest.useFakeTimers()

  const fn = jest.fn()
  const debounced = debounce(fn, 500)

  debounced()
  debounced()
  debounced()  // Only last should fire

  expect(fn).not.toHaveBeenCalled()  // Not yet!

  jest.advanceTimersByTime(499)
  expect(fn).not.toHaveBeenCalled()  // Still waiting

  jest.advanceTimersByTime(1)        // 500ms total
  expect(fn).toHaveBeenCalledTimes(1)

  jest.useRealTimers()  // Restore
})`,
            explanation: 'jest.fn() calls track karta hai aur return values control karta hai. jest.mock() module level pe mock karta hai — import automatically mocked milti hai. jest.spyOn() existing implementation wrap karta hai — spy lagao, restore karo. jest.useFakeTimers() setTimeout/setInterval control karta hai — time-based tests deterministic.',
          }}
          realWorldScenario="Payment service test mein: jest.mock('stripe') — real charge nahi. stripe.charges.create.mockResolvedValue({ id: 'ch_test', status: 'succeeded' }). Test karo kya function sahi arguments se call hoi — expect(stripe.charges.create).toHaveBeenCalledWith({ amount: 999, currency: 'inr', source: token })."
          commonMistakes={[
            {
              mistake: 'jest.spyOn ke baad mockRestore bhoolna',
              why: 'Next test mein spy active rehta hai — real function replaced, tests interfere karte hain.',
              fix: 'afterEach(() => jest.restoreAllMocks()) — automatically sab spies restore. Ya individual spy.mockRestore().',
            },
            {
              mistake: 'Too much mocking — implementation details test karna',
              why: 'Har internal function mock karo — refactoring pe tests break, actual behavior test nahi hota.',
              fix: 'Behavior test karo, implementation nahi. External dependencies mock karo — internal helpers nahi.',
            },
          ]}
          proTip="msw (Mock Service Worker) API mocking ke liye excellent hai — network level intercept karta hai. Test aur browser dono mein same mocks. nock Node.js HTTP mocking ke liye. jest-environment-jsdom browser environment simulate karta hai. Happy-dom lighter alternative hai jsdom se."
        />
      </div>

      <div id="async-testing">
        <ConceptCard
          title="Testing Async Code — Promises aur Timers"
          emoji="⏳"
          difficulty="advanced"
          whatIsIt="Async code test karna sync se alag hai. async/await tests mein natural feel deta hai. rejects.toThrow() async errors test karta hai. waitFor() DOM changes ka wait karta hai. jest.useFakeTimers() time-based code test karta hai bina actually waiting. Promise.race mocks se timeouts simulate karo."
          whenToUse={[
            'API call se data fetch karo aur result check karo',
            'Error scenarios — network failure, timeout',
            'Event-based code — setTimeout, setInterval',
            'Real-time features — WebSocket messages, polling',
          ]}
          whyUseIt="Async code mein false positives easy hain — test completes before assertion runs. Proper async testing patterns ensure assertions actually run. Fake timers se debounce, polling, retry logic fast test hoti hai — real wait nahi. waitFor React Testing Library mein DOM updates ka wait karta hai."
          howToUse={{
            filename: 'async-testing.test.js',
            language: 'javascript',
            code: `// ── ASYNC/AWAIT TESTS ─────────────────────────────────────────────
it('fetches user data successfully', async () => {
  const mockResponse = { id: '1', name: 'Rahul', email: 'rahul@example.com' }
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse,
  })

  const user = await fetchUser('1')

  expect(user.name).toBe('Rahul')
  expect(fetch).toHaveBeenCalledWith('/api/users/1')
})

// ── ASYNC ERRORS ─────────────────────────────────────────────────
it('throws on network failure', async () => {
  fetch.mockRejectedValueOnce(new Error('Network error'))

  // Method 1: rejects.toThrow
  await expect(fetchUser('1')).rejects.toThrow('Network error')

  // Method 2: try/catch
  try {
    await fetchUser('1')
    fail('Should have thrown')  // Never reach here
  } catch (err) {
    expect(err.message).toBe('Network error')
  }
})

it('returns null for 404', async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
    status: 404,
  })

  const user = await fetchUser('999')
  expect(user).toBeNull()
})

// ── FAKE TIMERS ───────────────────────────────────────────────────
describe('Polling service', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('polls every 30 seconds', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ data: [] })
    const service = new PollingService(mockFetch, 30000)
    service.start()

    expect(mockFetch).toHaveBeenCalledTimes(1)  // Immediate first call

    jest.advanceTimersByTime(30000)  // Skip 30 seconds
    await Promise.resolve()          // Flush microtasks

    expect(mockFetch).toHaveBeenCalledTimes(2)

    jest.advanceTimersByTime(30000)
    await Promise.resolve()

    expect(mockFetch).toHaveBeenCalledTimes(3)

    service.stop()
  })
})

// ── RETRY LOGIC TEST ──────────────────────────────────────────────
it('retries 3 times on failure, then throws', async () => {
  const fn = jest.fn()
    .mockRejectedValueOnce(new Error('Error 1'))
    .mockRejectedValueOnce(new Error('Error 2'))
    .mockRejectedValueOnce(new Error('Error 3'))

  await expect(withRetry(fn, 3)).rejects.toThrow('Error 3')
  expect(fn).toHaveBeenCalledTimes(3)
})

it('succeeds on second attempt', async () => {
  const fn = jest.fn()
    .mockRejectedValueOnce(new Error('First attempt'))
    .mockResolvedValueOnce({ success: true })

  const result = await withRetry(fn, 3)

  expect(result).toEqual({ success: true })
  expect(fn).toHaveBeenCalledTimes(2)
})`,
            explanation: 'async/await in tests natural hai — await result, then assert. rejects.toThrow() async errors ke liye. Fake timers time-based code test fast karte hain. await Promise.resolve() microtask queue flush karta hai — async updates visible ho jaate hain. Mock chaining se different calls different results deti hain.',
          }}
          realWorldScenario="Retry mechanism test karna: mockFn pehle 2 baar fail kare, teesri baar succeed. withRetry(mockFn, 3) call karo — expect 2 failures, 1 success. expect(mockFn).toHaveBeenCalledTimes(3). Backoff timing fake timers se verify karo. Real API call nahi."
          commonMistakes={[
            {
              mistake: 'Async test mein async keyword missing',
              why: 'it("test", () => { expect(asyncFn()).toBe(result) }) — Promise check nahi hota, test passes wrongly.',
              fix: 'Hamesha: it("test", async () => { const result = await asyncFn(); expect(result).toBe(expected) })',
            },
            {
              mistake: 'jest.useFakeTimers ke baad real timers restore nahi karna',
              why: 'Fake timers other tests mein bleed — unexpected behavior.',
              fix: 'afterEach(() => jest.useRealTimers()) ya jest.clearAllTimers(). beforeEach mein useFakeTimers karo.',
            },
          ]}
          proTip="React Testing Library ke waitFor() aur findBy* queries DOM mutations ka automatically wait karte hain — manual setTimeout nahi. findByText('Loading...') await karo — jab appear ho tab resolve. waitForElementToBeRemoved loading spinner remove hone ka wait karta hai."
        />
      </div>

      <div id="tdd">
        <ConceptCard
          title="TDD — Test-Driven Development"
          emoji="🔴🟢♻️"
          difficulty="advanced"
          whatIsIt="TDD ek development methodology hai — code se pehle test likho. Red: failing test likho. Green: minimum code likho test pass karne ke liye. Refactor: code clean karo tests green rakhte hue. Repeat. TDD se emergent design milti hai — code inherently testable hota hai kyunki tests pehle likhe."
          whenToUse={[
            'New features — requirements clear hon toh TDD excellent',
            'Bug fixes — pehle failing test likho bug ko reproduce karo',
            'Complex algorithms — TDD se step-by-step build karo',
            'Refactoring — existing tests safety net hain',
          ]}
          whyUseIt="TDD se code inherently decoupled aur testable hota hai — hard-to-test code usually poor design ka sign hai. Tests living documentation hain — intent clear hoti hai. Regression automatic catch hoti hai. Developer confidence badhti hai. Over-engineering avoid hota hai — sirf itna likho jitna test requires."
          howToUse={{
            filename: 'tdd-example.test.js',
            language: 'javascript',
            code: `// ── TDD CYCLE — Shopping Cart Feature ────────────────────────────

// STEP 1: RED — Failing test likho
// cart.test.js
import { Cart } from './cart'

describe('Cart', () => {
  // Test 1: Empty cart
  it('starts empty', () => {
    const cart = new Cart()
    expect(cart.items).toEqual([])
    expect(cart.total).toBe(0)
  })
})

// cart.js — minimum implementation:
// export class Cart {}  // Run test → FAIL (items undefined)

// STEP 2: GREEN — Minimum code to pass
// cart.js
export class Cart {
  items = []
  get total() { return 0 }
}
// Test passes! ✅

// STEP 3: Next test — RED
it('adds item to cart', () => {
  const cart = new Cart()
  cart.add({ id: '1', name: 'Laptop', price: 50000, qty: 1 })
  expect(cart.items).toHaveLength(1)
  expect(cart.items[0].name).toBe('Laptop')
})

// GREEN — add method implement karo
export class Cart {
  items = []

  add(item) {
    this.items.push(item)
  }

  get total() { return 0 }
}

// RED — total test
it('calculates total correctly', () => {
  const cart = new Cart()
  cart.add({ id: '1', name: 'Laptop', price: 50000, qty: 1 })
  cart.add({ id: '2', name: 'Mouse', price: 1500, qty: 2 })
  expect(cart.total).toBe(53000)
})

// GREEN
get total() {
  return this.items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

// RED — quantity update
it('updates quantity if item already in cart', () => {
  const cart = new Cart()
  cart.add({ id: '1', name: 'Laptop', price: 50000, qty: 1 })
  cart.add({ id: '1', name: 'Laptop', price: 50000, qty: 1 })
  expect(cart.items).toHaveLength(1)  // Not duplicated!
  expect(cart.items[0].qty).toBe(2)
})

// GREEN + REFACTOR
add(item) {
  const existing = this.items.find(i => i.id === item.id)
  if (existing) {
    existing.qty += item.qty
  } else {
    this.items.push({ ...item })
  }
}

// Now refactor freely — tests are green safety net!`,
            explanation: 'TDD Red→Green→Refactor cycle. Pehle failing test (Red) — exact requirement specify karta hai. Minimum code pass karo (Green) — no more. Refactor cleanly (Refactor) — tests ensure correctness. Har step small — focus clear. Emergent design — complex upfront design nahi.',
          }}
          realWorldScenario="Bug fix ke saath TDD: user report karta hai ki coupon code apply nahi ho raha. Test likho: it('applies coupon discount', ...) — FAIL. Fix karo code — PASS. Regression test permanently wahan hai — wahi bug phir nahi aayega."
          commonMistakes={[
            {
              mistake: 'Saara code pehle likhna, phir tests',
              why: 'Test-after mein tests implementation se influenced hote hain — real requirements test nahi hoti.',
              fix: 'Test-first discipline raho — sirf ek test fail karo, minimum code likho pass karne ke liye.',
            },
            {
              mistake: 'Refactoring step skip karna',
              why: 'Green hone ke baad move on — code dheere dheere messy hota jaata hai.',
              fix: 'Red→Green→Refactor — teeno steps mandatory. Green ke baad code review karo — clean karo, tests pass rakhkar.',
            },
          ]}
          proTip="TDD sirf tests nahi — design tool hai. Agar test likhna mushkil lag raha hai toh design poor hai — too many dependencies, too many responsibilities. Design pressure se push karo — simpler interface, better separation. TDD se self-documenting code milta hai — test names requirements describe karte hain."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 19 Quiz — Testing JavaScript
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — confident code likhna seekho!
          </p>
        </div>
        <QuizSection questions={testingQuiz} chapterSlug="testing-js" />
      </div>
    </div>
  )
}
