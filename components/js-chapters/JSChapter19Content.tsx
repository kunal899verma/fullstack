'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Chapter Overview Diagram ──────────────────────────────────────────────────

function TestingPyramidDiagram() {
  const layers = [
    {
      label: 'E2E Tests',
      sublabel: 'Few, slow, expensive — real browser flows',
      width: '45%',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.12)',
      border: 'rgba(124,58,237,0.35)',
      icon: '🌐',
    },
    {
      label: 'Integration Tests',
      sublabel: 'Moderate — API routes, DB queries, module interactions',
      width: '70%',
      color: '#F97316',
      bg: 'rgba(249,115,22,0.12)',
      border: 'rgba(249,115,22,0.35)',
      icon: '🔗',
    },
    {
      label: 'Unit Tests',
      sublabel: 'Many, fast, cheap — pure functions, components',
      width: '100%',
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.12)',
      border: 'rgba(245,158,11,0.35)',
      icon: '⚡',
    },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">The Testing Pyramid — 70 / 20 / 10 Rule</p>
      <div className="max-w-lg mx-auto flex flex-col items-center gap-2">
        {layers.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-0 w-full">
            <div
              className="rounded-xl px-5 py-3 flex items-center gap-4"
              style={{ background: item.bg, border: `1px solid ${item.border}`, width: item.width }}
            >
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5 leading-tight">{item.sublabel}</p>
              </div>
            </div>
            {i < layers.length - 1 && <div className="flex justify-center py-0.5"><span className="text-[#71717A] text-xs">↓ more below</span></div>}
          </div>
        ))}
        <p className="text-[10px] text-[#52525B] mt-2">Wider = more tests. Unit tests are the foundation.</p>
      </div>
    </div>
  )
}

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
          Ek honest baat: 90% developers tests likhna avoid karte hain — boring lagta hai, time waste lagta hai. Phir ek din production mein bug aata hai — 2 AM pe phone. Client ka pura data corrupt. "Bhai tune test kiya tha?" Tests likhna boring nahi — 2 AM pe phone rehne se bachne ka tarika hai!
        </p>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ab sawaal ye aata hai — "Bhai itna sab test karo toh development slow nahi hogi?" Actually ulta hota hai! Bina tests ke tum code change karte ho aur darr ke rahte ho — "kuch toot gaya toh?" Tests ke saath code change karo — tests pass hain, ship karo. Confident, fast development.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum practical testing patterns cover karenge jo aap real projects mein immediately use kar sako. Testing pyramid, Jest basics, mocking, async testing, TDD — ye sab professional developer ke essential tools hain.
        </p>
      </div>

      <TestingPyramidDiagram />

      <div id="testing-pyramid">
        <ConceptCard
          title="Testing Pyramid — Kya Test Karo, Kitna?"
          emoji="🔺"
          difficulty="advanced"
          whatIsIt="Ek surprising failure mode: company ne sirf E2E tests likhey — 500 tests, 2 ghante CI pipeline. Feature add karo — 2 ghante wait. Developer frustrated, tests skip karne lagte hain. Testing pyramid ye galti rokta hai! Base: Unit tests — fast (milliseconds), isolated, many. Middle: Integration tests — components ka interaction, moderate. Top: E2E tests — real browser/environment, slow, few. Each level trade-offs hain — speed vs confidence."
          whenToUse={[
            'Unit tests: individual functions, classes, components',
            'Integration tests: API endpoints, database queries, module interactions',
            'E2E tests: critical user flows — login, checkout, signup',
            'Snapshot tests: UI component rendering',
          ]}
          whyUseIt="Pyramid shape optimal balance hai — zyada unit tests fast feedback dete hain. E2E tests slow hain aur flaky (network issues, timing, animations) — CI mein 30% randomly fail ho sakte hain! Integration tests middle ground — real interactions test karo without full browser. 70/20/10 ratio target karo: 70% unit, 20% integration, 10% E2E. Test strategy decide karo upfront — random tests waste of time aur false confidence dete hain."
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
            explanation: 'Unit test trace karo: calculateDiscount(1000, 20) — expect 800. No setup, no database, no network — sirf pure function. Milliseconds mein run. Integration test mein: real DB — beforeEach mein fresh seed, afterEach mein rollback. Slower lekin route logic verify hota hai. E2E Playwright mein: real Chrome browser, real page navigation, real form fill. Slowest — sirf critical user flows ke liye. Critical paths E2E se cover karo, edge cases unit se.',
          }}
          realWorldScenario="Payment system mein: Unit tests har calculation (discount, tax, total) ke liye — 50 tests, 2 seconds. Integration tests payment API route ke liye — real DB lekin mocked payment gateway — 10 tests, 30 seconds. E2E test sirf happy path checkout ke liye — 3 tests, 2 minutes. Total CI: 2.5 minutes — acceptable! Sab unit hote aur integration nahi — route bugs (wrong HTTP codes, missing auth) miss hote."
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
          proTip="Property-based testing (fast-check library) se random inputs generate karo — ek baar try karo! 'For any discount between 0-100, result should be between 0 and original price' — automatically 1000 random inputs test hote hain. Jo edge cases tumne socha nahi — woh bhi! Mutation testing (Stryker) code changes karta hai — agar tests fail nahi hote toh tests weak hain. Eye-opener hai!"
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)' }}
      >
        <p className="text-sm text-[#FCD34D] font-medium">
          💡 Akshay ka insight: Jest itna popular kyun hai? Zero config! npm install jest, package.json mein "test": "jest" — done. Automatic test discovery (.test.js, .spec.js files), parallel execution, built-in coverage — sab included. Shuru karne ki cost zero!
        </p>
      </div>

      <div id="jest-basics">
        <ConceptCard
          title="Jest Basics — Testing Framework"
          emoji="🃏"
          difficulty="advanced"
          whatIsIt="Ek common confusion: toBe vs toEqual. expect({a:1}).toBe({a:1}) — FAIL! Objects different references. expect({a:1}).toEqual({a:1}) — PASS! Deep comparison. Ye ek baar confuse karo phir hamesha yaad rahega! Jest Facebook ka JavaScript testing framework hai — test runner, assertion library, mocking, coverage sab built-in. describe se tests group karo, it/test se individual test likho, expect se assertions. beforeEach/afterEach setup aur cleanup karo."
          whenToUse={[
            'Unit aur integration tests likhne ke liye',
            'Mocking aur spying — jest.fn(), jest.mock()',
            'Coverage report — kaunsa code test nahi',
            'Snapshot testing — UI components',
          ]}
          whyUseIt="Jest zero-config setup deta hai — npm install jest aur chalo. Parallel test execution se fast — 100 tests ek second mein. Built-in watch mode se instant feedback — file save karo, tests automatically run. beforeEach har test ke pehle fresh state ensure karta hai — tests ek doosre pe depend nahi karte. jest.clearAllMocks() afterEach mein — mock state reset. TypeScript ke saath @swc/jest se blazing fast compilation."
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
            explanation: 'Test structure trace karo: beforeAll — ek baar setup (DB connect). beforeEach — har test ke pehle (fresh service). Test runs. afterEach — mock clear. Next test runs. afterAll — cleanup (DB disconnect). Nested describe blocks apne beforeEach hain — outer + inner dono run. toMatchObject partial match karta hai — expect.any(String) sahi email check bina exact value jaane. expect.arrayContaining([1,3]) — order matter nahi, elements hone chahiye.',
          }}
          realWorldScenario="React component testing with Jest + React Testing Library: render(Button), userEvent.click(screen.getByRole('button')), expect(fn).toHaveBeenCalledTimes(1). Implementation details nahi test karo — user interactions test karo. getByRole — accessibility-friendly query, screen reader ke saath bhi test hota hai!"
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
          proTip="Daily workflow: jest --watch mode on rakho — save karo, tests automatically run. Failed test pe p se filter karo specific test. --coverage HTML report generate karta hai — browser mein kholo, exactly kaunsi lines test nahi hua dikhta hai. GitHub Actions mein jest --ci flag use karo — interactive mode off, fail fast on first error."
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}
      >
        <p className="text-sm text-[#6EE7B7] font-medium">
          💡 Akshay ka insight: Mocking ka golden rule — external dependencies mock karo, internal helpers nahi. Agar tum har function mock kar rahe ho — test likhne ka point kya hai? Behavior test karo, implementation nahi.
        </p>
      </div>

      <div id="mocking">
        <ConceptCard
          title="Mocking — Dependencies Isolate Karo"
          emoji="🎭"
          difficulty="advanced"
          whatIsIt="Test likhte waqt real database connect karo — test slow ho jaata hai. Network request karo — flaky ho jaata hai (server down ho toh?). Real email bhejo — test users ko actual emails milne lagte hain! Mocking real dependencies ko fake implementations se replace karta hai — testing ke liye. jest.fn() spy/stub function banata hai. jest.mock() module completely mock karta hai. jest.spyOn() existing function pe spy lagata hai — original implementation wrap karta hai."
          whenToUse={[
            'External APIs — real network calls test mein nahi',
            'Database — real DB slow aur state-dependent',
            'File system — reads/writes test environment mein',
            'Time — Date.now(), Math.random() deterministic banana',
          ]}
          whyUseIt="Real dependencies tests slow, flaky aur environment-dependent banate hain. Mocking se tests deterministic hote hain — same input → same output, always, even in CI. Function calls verify karo — toHaveBeenCalledWith exact arguments. Error scenarios easily simulate karo — mockRejectedValue se database down simulate karo, bina actual DB down kiye. mockResolvedValueOnce se specific call pe specific response."
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
            explanation: 'jest.mock() module ke top pe call karna zaroori hai — Jest hoisting karta hai isko file ke upar. import se pehle mock effective ho jaata hai. jest.fn() calls count, arguments, return values sab track karta hai — mockFn.mock.calls array mein sab calls stored. mockResolvedValueOnce: pehli call pe ye value, doosri pe different value — sequential mocking! jest.useFakeTimers() critical: real timers replace ho jaate hain, advanceTimersByTime se time skip karo bina actually waiting.',
          }}
          realWorldScenario="Payment service test mein: jest.mock('stripe') — real charge nahi, real money nahi! stripe.charges.create.mockResolvedValue({ id: 'ch_test', status: 'succeeded' }). Test karo kya function sahi arguments se call hui — expect(stripe.charges.create).toHaveBeenCalledWith({ amount: 999, currency: 'inr', source: token }). Failure scenario bhi test karo: mockRejectedValue se card declined simulate karo!"
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
          proTip="msw (Mock Service Worker) — next level API mocking! Network level intercept karta hai — test aur browser dono mein same mocks. React Testing Library ke saath perfect pair. nock Node.js HTTP mocking ke liye. afterEach mein jest.restoreAllMocks() — sab spies automatically restore. Too much mocking se tests brittle hote hain — implementation change karo, tests break."
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)' }}
      >
        <p className="text-sm text-[#93C5FD] font-medium">
          💡 Akshay ka insight: Async testing ka sabse common bug — test pass ho jaata hai bina assertion run kiye! it("test", () =&gt; asyncFn().then(result =&gt; expect(result).toBe(x))) — agar asyncFn throw kare, test pass hoga! async/await use karo hamesha.
        </p>
      </div>

      <div id="async-testing">
        <ConceptCard
          title="Testing Async Code — Promises aur Timers"
          emoji="⏳"
          difficulty="advanced"
          whatIsIt="Ek shocking false positive: it('test', () => { expect(asyncFn()).toBe(result) }) — test green! But actually assertion never ran! Promise pe .then laga bhi diya toh agar throw hota hai — test pass. Ye false sense of security hai. Async code test karna sync se alag hai. async/await tests mein natural feel deta hai — await lagao, assertion run hogi. rejects.toThrow() async errors test karta hai. jest.useFakeTimers() time-based code bina actual wait ke test karta hai."
          whenToUse={[
            'API call se data fetch karo aur result check karo',
            'Error scenarios — network failure, timeout',
            'Event-based code — setTimeout, setInterval',
            'Real-time features — WebSocket messages, polling',
          ]}
          whyUseIt="Fake timers ka power: debounce test karo bina actually 300ms wait kiye — jest.advanceTimersByTime(300) instant! Polling service test karo bina 30 second wait kiye — advance karo, check karo. Retry logic — 3 attempts simulate karo. Real wait hoti toh test suite slow ho jaata. await Promise.resolve() — microtask queue flush karta hai — async state updates visible ho jaate hain tests mein."
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
            explanation: 'Polling test trace karo: jest.useFakeTimers() — real timers off. service.start() — immediate call (count: 1). jest.advanceTimersByTime(30000) — timer fires synchronously! Lekin setTimeout callback async ho sakta hai — await Promise.resolve() se microtask flush karo. ab count: 2. Doosri advance — count: 3. 90 seconds ka test — milliseconds mein! Retry test mein mockFn: 1st call reject, 2nd call reject, 3rd call resolve — chained mockRejectedValueOnce.',
          }}
          realWorldScenario="Retry mechanism test karna: mockFn pehle 2 baar fail kare, teesri baar succeed. withRetry(mockFn, 3) call karo — expect 2 failures, 1 success. expect(mockFn).toHaveBeenCalledTimes(3). Exponential backoff timing fake timers se verify karo bina actually waiting. Real API call nahi — fast, deterministic, reliable!"
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
          proTip="React Testing Library: findBy* queries DOM mutations ka automatically wait karte hain — getBy* nahi, findBy*! findByText('Loading...') — jab appear ho tab resolve. waitForElementToBeRemoved loading spinner remove hone ka wait karta hai. Manual setTimeout ya sleep mat lagao tests mein — fragile aur slow. waitFor bhi available hai custom assertions ke liye."
        />
      </div>

      <div
        className="rounded-2xl p-4 my-2"
        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
      >
        <p className="text-sm text-[#FCA5A5] font-medium">
          💡 Akshay ka insight: TDD pehli baar karne pe weird lagta hai — "test kaise likhoon jab code hai hi nahi?" Yehi TDD ka point hai! Test likhne se tum PEHLE sochte ho — yeh function kya lega, kya return karega, kya edge cases hain. Design pehle hoti hai, code baad mein.
        </p>
      </div>

      <div id="tdd">
        <ConceptCard
          title="TDD — Test-Driven Development"
          emoji="🔴🟢♻️"
          difficulty="advanced"
          whatIsIt="TDD ka cycle sirf teen steps mein: Red — failing test likho (compile bhi nahi hoga!). Green — minimum code likho test pass karne ke liye (sirf itna, jyada nahi). Refactor — code clean karo, tests green rakhte hue. Repeat. TDD se emergent design milti hai — code inherently testable hota hai kyunki tests pehle likhe jaate hain. Agar test likhna mushkil lag raha hai — design poor hai! Yahi TDD ka design feedback hai."
          whenToUse={[
            'New features — requirements clear hon toh TDD excellent',
            'Bug fixes — pehle failing test likho bug ko reproduce karo',
            'Complex algorithms — TDD se step-by-step build karo',
            'Refactoring — existing tests safety net hain',
          ]}
          whyUseIt="TDD se code inherently decoupled aur testable hota hai — hard-to-test code usually poor design ka sign hai! 'Ye function test karna mushkil hai' — matlab function bahut zyada kaam karta hai ya dependencies hard-coded hain. Tests living documentation hain — test names requirements describe karte hain. Regression automatic catch hoti hai. Over-engineering avoid hota hai — YAGNI (You Aren't Gonna Need It) naturally enforce hota hai."
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
            explanation: 'Cart TDD trace karo: Test 1: cart.items should equal []. Cart class banao: items = []. Pass! Test 2: add karo, items.length 1 hona chahiye. add() method implement karo — push. Pass! Test 3: total 53000 chahiye. get total() implement karo — reduce. Pass! Test 4: same item add karo, length 1 rehna chahiye (merge). add() update karo — existing check. Pass! Har step laser-focused — sirf current test pass karna. Emergent design — upfront design karne ki zaroorat nahi padi.',
          }}
          realWorldScenario="Bug fix ke saath TDD: user report karta hai ki coupon code apply nahi ho raha. Pehle test likho: it('applies coupon discount', ...) — FAIL. Ye confirm karta hai bug exist karta hai. Fix karo code — PASS. Regression test permanently wahan hai — wahi bug phir kabhi nahi aayega kyunki test hamesha run hoga CI mein!"
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
          proTip="TDD sirf tests nahi — design tool hai! Agar test likhna mushkil lag raha hai toh design poor hai — too many dependencies, too many responsibilities. Yahi signal hai refactor karo. 'Outside-in TDD' — high level test se shuru karo, neeche unit tests mein jaao. BDD (Behavior-Driven Development) TDD ka extension hai — Given/When/Then format. Real-world mein hamesha strict TDD nahi hoga — lekin test-first mindset hamesha rakhna chahiye."
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
