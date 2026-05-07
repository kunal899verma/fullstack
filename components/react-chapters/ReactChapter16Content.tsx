'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

function TestingLayersDiagram() {
  const layers = [
    {
      label: 'E2E Tests',
      sublabel: 'Full user flows — Playwright / Cypress',
      detail: 'Slowest, fewest — critical paths only (checkout, login)',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.1)',
      border: 'rgba(124,58,237,0.3)',
      icon: '🎭',
      width: '55%',
      qty: '~10%',
    },
    {
      label: 'Integration Tests',
      sublabel: 'Component interactions — RTL + MSW',
      detail: 'Medium speed — forms, data fetching, user workflows',
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.1)',
      border: 'rgba(6,182,212,0.3)',
      icon: '🔗',
      width: '75%',
      qty: '~20%',
    },
    {
      label: 'Unit Tests',
      sublabel: 'Individual components, hooks, utils',
      detail: 'Fastest, most — logic, edge cases, pure functions',
      color: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
      border: 'rgba(16,185,129,0.3)',
      icon: '🧪',
      width: '100%',
      qty: '~70%',
    },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Testing Pyramid — Bottom to Top</p>
      <div className="max-w-lg mx-auto space-y-2">
        {layers.map((l, i) => (
          <div key={i} style={{ width: l.width, marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: l.bg, border: `1px solid ${l.border}` }}>
              <span className="text-xl">{l.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm" style={{ color: l.color }}>{l.label}</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: l.bg, color: l.color, border: `1px solid ${l.border}` }}>{l.qty}</span>
                </div>
                <p className="text-xs text-[#71717A] mt-0.5">{l.sublabel}</p>
                <p className="text-[10px] text-[#71717A] mt-0.5">{l.detail}</p>
              </div>
            </div>
          </div>
        ))}
        <p className="text-[10px] text-[#71717A] text-center mt-2">Width represents relative quantity — unit tests most, E2E fewest</p>
      </div>
    </div>
  )
}

export default function ReactChapter16Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Testing React — Confidence Ke Saath Ship Karo
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Bata dete hain ek shocking truth — tests likhna tumhari coding speed slow nahi karta, fast karta hai. "Yaar tests likhne ka time nahi" wale log 6 mahine baad sabse zyada time waste karte hain production bugs fix karne mein. Testing ka funda simple hai: ek baar test likho, hazaar baar fearlessly refactor karo. Bina test ke refactor? Gambling hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          React Testing Library ka ek revolutionary idea hai — implementation details mat test karo, user behavior test karo. Ye ek line itna kuch change kar deti hai ki testing ka poora philosophy badal jaata hai. Sahi tests refactoring survive karte hain. Galat tests ek rename se toot jaate hain. Is chapter mein ye fark seekhenge.
        </p>
      </div>

      <TestingLayersDiagram />

      <div id="rtl-philosophy">
        <ConceptCard
          title="React Testing Library Philosophy"
          emoji="🧪"
          difficulty="advanced"
          whatIsIt="RTL ke creator Kent C. Dodds ne ek baat likhi jo testing ki duniya badal di: 'The more your tests resemble the way your software is used, the more confidence they can give you.' Padhte hain phir se — 'the way your software is used.' User test karo, not code. Agar user button pe click karta hai aur text dikhta hai — test karo. Agar internal setState se count++ hota hai — user ko kya fark? Woh nahi dekhta. Toh test kyun karo? Implementation test = fragile tests. User behavior test = bulletproof tests."
          whenToUse={[
            'Component render hone ke baad correct output check karna',
            'User interactions (click, type, submit) test karna',
            'Async operations ke baad UI state check karna',
            'Accessibility attributes test karna',
          ]}
          whyUseIt="Purana Enzyme style test dekho — wrapper.state('count') check karta tha. Ab useState ko useReducer se replace kiya? Test toot gaya. Lekin RTL test mein? screen.getByText('Count: 1') — mujhe nahi pata andar useState hai ya useReducer. Mujhe bas pata hai 'Count: 1' dikhna chahiye. Refactor karo useState se useReducer mein — test ek bhi break nahi hoga. Ye hai RTL ki real value. Tests maintenance burden nahi, safety net hai."
          howToUse={{
            filename: 'rtl-intro.test.tsx',
            language: 'typescript',
            code: `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// ❌ Implementation testing (avoid)
// test('state updates when clicked', () => {
//   const wrapper = shallow(<Counter />)
//   wrapper.find('button').simulate('click')
//   expect(wrapper.state('count')).toBe(1)  // Internal state check — fragile
// })

// ✅ Behavior testing (RTL way)
describe('Counter component', () => {
  test('increments count when button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    // User jo dekhta hai — text content
    expect(screen.getByText('Count: 0')).toBeInTheDocument()

    // User jo karta hai — click
    await user.click(screen.getByRole('button', { name: /increment/i }))

    // User jo ab dekhta hai
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
  })

  test('decrements below zero nahi jaata', async () => {
    const user = userEvent.setup()
    render(<Counter min={0} />)

    const decrementBtn = screen.getByRole('button', { name: /decrement/i })
    await user.click(decrementBtn)

    expect(screen.getByText('Count: 0')).toBeInTheDocument()  // No negative
    expect(decrementBtn).toBeDisabled()  // Button disable hona chahiye
  })
})`,
            explanation: "getByRole('button', { name: /increment/i }) — ye kya hai? Ye accessibility tree ko query karta hai, DOM nahi. Screen reader exactly ise hi use karta hai. Iska matlab? Agar ye test pass karta hai, screen reader bhi button dhundh sakta hai. Ek test — dono test ho gaye. Smart! toBeInTheDocument — jest-dom ka magic matcher. userEvent vs fireEvent — userEvent real browser jaisa behave karta hai, poori event chain fire karta hai. fireEvent direct ek event. Simple cases mein dono kaam karte hain, complex mein userEvent more reliable.",
          }}
          realWorldScenario="Billing form hai — payment gateway integration. Kya test karoge? Invalid card number daalo — error message 'Invalid card number' dikhna chahiye. Form incomplete ho — Submit button disabled rehna chahiye. Valid form submit karo — 'Payment successful' message aana chahiye. In teen tests ne cover kar liye saare critical user journeys. Implementation mein Stripe hai ya koi aur library — test ko fark nahi padta. Ye hai user-centric testing."
          commonMistakes={[
            {
              mistake: 'getByTestId prefer karna',
              why: 'data-testid artificial attributes hain — real users ya screen readers inhe use nahi karte. Ye tests implementation-coupled hain.',
              fix: 'Preference order: getByRole > getByLabelText > getByPlaceholderText > getByText > getByTestId. getByTestId sirf last resort.',
            },
            {
              mistake: 'snapshot tests unnecessarily use karna',
              why: 'Large snapshot diffs readable nahi hote. Component mein koi bhi change — intentional ya accidental — snapshot break karta hai.',
              fix: 'Targeted assertions prefer karo: expect(screen.getByText("Hello")).toBeInTheDocument() — specific behavior test karo.',
            },
          ]}
          proTip="Ek package install karo aaj: @testing-library/jest-dom. Ye matchers deta hai jaise — toBeInTheDocument, toBeVisible, toBeDisabled, toHaveValue. Compare karo: expect(el !== null).toBe(true) vs expect(el).toBeInTheDocument(). Dono same kaam karte hain, lekin doosra padhne pe instantly samajh aata hai. Tests documentation bhi hote hain — readable tests = better docs."
        />
      </div>

      <div id="core-apis">
        <ConceptCard
          title="render, screen, fireEvent, userEvent"
          emoji="🔧"
          difficulty="advanced"
          whatIsIt="RTL ke paas teen query families hain — ye yaad karna critical hai. getBy — element dhundha nahi toh test toot jaata hai (element HONA chahiye). queryBy — element nahi mila toh null milta hai (element NA hone ka test). findBy — promise return karta hai, element appear hone tak wait karta hai (async ke liye). Ye teen ko sahi jagah use karna testing ki 80% galtiyan khatam kar deta hai. Aur userEvent? Real browser jaisi typing, clicking — sabse realistic simulation."
          whenToUse={[
            'render — component test setup',
            'screen.getByRole — accessible elements find karo',
            'userEvent — typing, clicking, selecting test karo',
            'screen.findBy — async elements jo eventually appear hote hain',
          ]}
          whyUseIt="Ek confusing scenario — tum test kar rahe ho ki error message nahi dikhna chahiye page load par. getByText('Error') use kiya — test toot gaya, throw hua. Kyon? Element hi nahi tha! getBy expects element to exist. Solution: queryByText('Error') use karo — null milega, expect(el).not.toBeInTheDocument() pass karega. Ye naming convention ek baar samjh lo — baaki automatically follow hoga."
          howToUse={{
            filename: 'core-apis.test.tsx',
            language: 'typescript',
            code: `import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Query types
test('query examples', () => {
  render(<LoginForm />)

  // getBy — throws if not found (use when element should exist)
  const emailInput = screen.getByRole('textbox', { name: /email/i })
  const submitBtn = screen.getByRole('button', { name: /login/i })
  const heading = screen.getByText(/welcome back/i)

  // queryBy — returns null if not found (use for absence checks)
  const error = screen.queryByRole('alert')
  expect(error).not.toBeInTheDocument()  // Error nahi hona chahiye

  // findBy — async, returns Promise (use for async content)
  // const message = await screen.findByText(/success/i)
})

// userEvent vs fireEvent
test('userEvent is more realistic', async () => {
  const user = userEvent.setup()
  render(<SearchInput onSearch={jest.fn()} />)

  const input = screen.getByRole('textbox')

  // userEvent — real typing, fires all keyboard events
  await user.type(input, 'react hooks')
  expect(input).toHaveValue('react hooks')

  // userEvent.clear, .selectOptions, .upload, .tab
  await user.clear(input)
  expect(input).toHaveValue('')

  // fireEvent — direct event dispatch (simpler but less realistic)
  fireEvent.change(input, { target: { value: 'test' } })
  expect(input).toHaveValue('test')
})

// getAllBy — multiple elements
test('list rendering', () => {
  const items = [{ id: '1', name: 'React' }, { id: '2', name: 'Node' }]
  render(<ItemList items={items} />)

  const listItems = screen.getAllByRole('listitem')
  expect(listItems).toHaveLength(2)
  expect(listItems[0]).toHaveTextContent('React')
})`,
            explanation: "userEvent.setup() v14 ka recommended way — pehle const user = userEvent.setup() karo, phir user.type(), user.click(). Kyon? Proper event sequencing ensure hoti hai. userEvent.type keyboard events ek-ek karke fire karta hai, real user jaisa. getByRole accessibility tree query karta hai — iska side effect: tumhara HTML semantic nahi hai toh test dhundh nahi payega. Test failure = accessibility bug! findBy — internally waitFor wrap hai. Automatic retry karta hai 1000ms tak. Element appear hua toh resolve, nahi hua toh reject.",
          }}
          realWorldScenario="Login form ka test ek movie jaisa hota hai — scene by scene. Render hota hai, form dikhta hai. Email type karte hain. Password type karte hain. Submit click karte hain. Loading spinner aata hai — check karo. Success message eventually aata hai — findBy se wait karo. Ye ek test mein poora user journey cover ho gaya. Test fail hua matlab koi cheez user ke liye broken hai — exactly wahi production mein bhi fail hoga."
          commonMistakes={[
            {
              mistake: 'getBy use karna jab element exist nahi karta',
              why: 'getBy throw karta hai agar element nahi mila — test fail with confusing error.',
              fix: 'Element absence check karne ke liye queryBy use karo: expect(screen.queryByText("Error")).not.toBeInTheDocument().',
            },
            {
              mistake: 'Async content ke liye getBy use karna',
              why: 'Agar element async aata hai (API call ke baad) toh getBy immediately fail karta hai — element abhi render nahi hua.',
              fix: 'findBy use karo — ye wait karta hai element appear hone tak: const msg = await screen.findByText("Success").',
            },
          ]}
          proTip="Test fail ho raha hai, samajh nahi aa raha DOM mein kya hai? Ek line daal do — screen.debug(). Console mein poora DOM pretty-print ho jaata hai. Exact HTML dekhoge jo React render kar raha hai us moment. Element dhundh sakte ho manually. Debugging ka sabse underrated tool. Sirf yaad raho — production commit se pehle remove karo."
        />
      </div>

      <div id="mocking">
        <ConceptCard
          title="Mocking — Modules, APIs, Hooks"
          emoji="🎭"
          difficulty="advanced"
          whatIsIt="Test mein real Stripe API call karo — slow, flaky, aur ek din accidentally real charge ho jaaye! Ye nahi chalega. Mocking ka matlab: production wali cheez ko test mein ek samajhdaar replacement se swap karo. MSW (Mock Service Worker) network requests intercept karta hai — component ko pata bhi nahi lagta ki fake data aa raha hai. jest.mock() module ko replace karta hai — useAuth hook ko mock karo, fake user inject karo. Tests fast, reliable, isolated."
          whenToUse={[
            'API calls — msw (Mock Service Worker) ya jest.fn() se',
            'Browser APIs — localStorage, sessionStorage, navigator',
            'Date/time — jest.useFakeTimers(), jest.setSystemTime()',
            'Third party libraries — jest.mock("library-name")',
          ]}
          whyUseIt="Bina mocking ke test suite ka kya haal hota hai? CI pe 3 baje raat server down ho gaya — poore tests fail. Developer subah aaye, samjhe nahi production issue hai ya test issue. Panic. Aur ye test backend team ke kaam pe depend karta hai tumhara frontend test. MSW se? Network intercept hoti hai, real server ki zaroorat nahi. Tests offline bhi chalte hain. CI server restart se tests nahi tooton ge. Isolation = sanity."
          howToUse={{
            filename: 'mocking.test.tsx',
            language: 'typescript',
            code: `import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// MSW — API mocking (preferred approach)
const server = setupServer(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json({ id: '1', name: 'Rahul', email: 'rahul@example.com' }))
  }),
  rest.post('/api/login', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ token: 'fake-token' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('user profile loads', async () => {
  render(<UserProfile />)
  expect(screen.getByText(/loading/i)).toBeInTheDocument()
  const name = await screen.findByText('Rahul')
  expect(name).toBeInTheDocument()
})

// Server error ko override karo specific test mein
test('shows error on API failure', async () => {
  server.use(
    rest.get('/api/user', (req, res, ctx) => res(ctx.status(500)))
  )
  render(<UserProfile />)
  await screen.findByText(/error loading user/i)
})

// jest.mock — module mock
jest.mock('../hooks/useAuth', () => ({
  useAuth: () => ({ user: { name: 'Mock User' }, isLoading: false }),
}))

// localStorage mock
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })`,
            explanation: "MSW kaise kaam karta hai under the hood? Service Worker register hota hai jo network requests intercept karta hai browser level pe. fetch('/api/user') call hoti hai — MSW pakad leta hai, real server tak jaane nahi deta, fake response return karta hai. Component ko pata nahi — real response lag raha hai. Node.js mein tests ke liye setupServer use hota hai (no Service Worker, just interceptor). jest.mock() ka hoisting trick yaad rakho — module top pe hoist hota hai, variables capture nahi hote. MSW is more predictable.",
          }}
          realWorldScenario="Payment component test karna hai — Stripe integration. Real card charge nahi karna test mein obviously! MSW se '/api/checkout' ko mock karo — success response dete hain pehle test mein, failure response ek test mein. jest.mock('@stripe/stripe-js') se Stripe ka mock inject karo. Test fast (milliseconds), reliable (koi network nahi), safe (koi real charge nahi), aur repeatably run hota hai. Yahi real-world mocking ka power hai."
          commonMistakes={[
            {
              mistake: 'jest.mock hoisting ignore karna',
              why: 'jest.mock() calls hoisted hote hain — function body ke upar. Iska matlab import statements se pehle run hota hai. Variables capture nahi hote.',
              fix: 'factory function mein hardcode karo values ya jest.resetModules() + dynamic import use karo. Ya MSW use karo — hoisting issues nahi hote.',
            },
            {
              mistake: 'Mocks cleanup nahi karna test ke baad',
              why: 'Ek test mein mock set karo — next test mein bhi same mock active — test pollution.',
              fix: 'afterEach mein jest.clearAllMocks() ya jest.resetAllMocks() call karo. MSW mein server.resetHandlers() afterEach mein.',
            },
          ]}
          proTip="Modern stack recommendation: MSW v2 + Vitest. Vitest Jest-compatible hai lekin 10x faster — Vite pe based hai. MSW v2 ka passthrough feature — sirf jo mock kiya wahi intercept karo, baaki real server jaate hain. Gradual migration easy. MSW Chrome extension bhi hai — DevTools network tab mein exactly dikhega kya intercept hua. Development mein bhi use karo — backend ready nahi toh MSW pe kaam karo. Frontend + backend parallel develop karo."
        />
      </div>

      <div id="async-testing">
        <ConceptCard
          title="Async Testing — waitFor & findBy"
          emoji="⏳"
          difficulty="advanced"
          whatIsIt="Ye scenario imagine karo — button click karte ho, API call hoti hai, data aata hai, UI update hota hai. Synchronous test likhoge toh? Test button click karega, immediately check karega — data abhi aaya nahi! Test fail. Async testing ka kaam yahi hai — 'ruko, jab tak data aa nahi jaata.' findBy ek element ka wait karta hai. waitFor ek condition ka wait karta hai. Dono retry karte hain baar baar jab tak succeed na ho ya timeout na ho. Real async world ke liye real async tests."
          whenToUse={[
            'Loading state ke baad content appear hone ka wait — findByText',
            'Multiple updates ke baad stable state check karna — waitFor',
            'User action ke baad async side effect verify karna',
            'Error states jo async aate hain — API failure ke baad',
          ]}
          whyUseIt="Flaky tests — ye sabse frustrating cheez hai testing mein. Kabhi pass, kabhi fail, same code. 99% cases mein cause kya hota hai? Race condition — test async operation ka wait nahi karta. findBy aur waitFor se race conditions khatam ho jaati hain. waitFor 1000ms tak retry karta hai — agar element 800ms mein aaya toh bhi test pass karega. Ye resilience hai. No more random failures."
          howToUse={{
            filename: 'async-testing.test.tsx',
            language: 'typescript',
            code: `import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('form submission shows success', async () => {
  const user = userEvent.setup()
  render(<ContactForm />)

  await user.type(screen.getByLabelText(/name/i), 'Rahul')
  await user.type(screen.getByLabelText(/email/i), 'rahul@test.com')
  await user.click(screen.getByRole('button', { name: /submit/i }))

  // findBy — element appear hone tak wait karo
  const successMsg = await screen.findByText(/message sent successfully/i)
  expect(successMsg).toBeInTheDocument()
})

// waitFor — multiple assertions ya complex conditions
test('cart updates after adding item', async () => {
  const user = userEvent.setup()
  render(<ProductPage product={mockProduct} />)

  await user.click(screen.getByRole('button', { name: /add to cart/i }))

  // waitFor — condition true hone tak retry karo
  await waitFor(() => {
    expect(screen.getByText(/1 item in cart/i)).toBeInTheDocument()
    expect(screen.getByText(/₹999/i)).toBeInTheDocument()  // Multiple assertions
  })
})

// Error states
test('shows error when API fails', async () => {
  // Server returns 500 (setup in MSW)
  render(<UserList />)

  await screen.findByText(/failed to load users/i)
  expect(screen.queryByRole('list')).not.toBeInTheDocument()
})

// act() — state updates manually wrap karo jab zaroorat ho
import { act } from '@testing-library/react'

test('timer-based update', async () => {
  jest.useFakeTimers()
  render(<CountdownTimer seconds={5} />)

  act(() => {
    jest.advanceTimersByTime(1000)
  })

  expect(screen.getByText('4 seconds left')).toBeInTheDocument()
  jest.useRealTimers()
})`,
            explanation: "findBy internally waitFor wrap karta hai — ek shorthand hai. waitFor use karo jab multiple assertions ek sath check karni hoon ya complex condition ho. Fake timers ka magic — jest.useFakeTimers() ke baad time real mein nahi beetha. jest.advanceTimersByTime(1000) call karo — JavaScript sochta hai 1 second beeth gaya. CountdownTimer test milliseconds mein run hota hai, real 5 second nahi wait karna. act() ke baare mein — RTL automatically sab ko act() mein wrap karta hai. Manual act() sirf third-party async operations ya rare edge cases mein.",
          }}
          realWorldScenario="Chat app testing — user message type karta hai, Send press karta hai, API call hoti hai, message list mein naya message appear hona chahiye. Test: user.type, user.click, phir `await screen.findByText('Hello World')` — ye wait karega jab tak message list mein nahi dikhta. API 300ms mein respond kare ya 700ms mein — findBy ka wait handle kar lega. Race condition zero."
          commonMistakes={[
            {
              mistake: 'waitFor mein side effects karna (click, type)',
              why: 'waitFor retry karta hai — agar andar user action ho toh wo baar baar trigger hoga. Unexpected behavior.',
              fix: 'User actions waitFor se bahar karo. waitFor sirf assertions ke liye: await user.click(btn); await waitFor(() => expect(el).toBeVisible()).',
            },
            {
              mistake: 'findBy ke saath await miss karna',
              why: 'findBy Promise return karta hai — await ke bina assertion immediate ho jaata hai, element load hone se pehle.',
              fix: 'Hamesha await findBy: const el = await screen.findByText("Success"). ESLint plugin testing-library/await-async-queries ye enforce karta hai.',
            },
          ]}
          proTip="'An update to X inside a test was not wrapped in act(...)' — ye warning dikhti hai toh ghabrao nahi. 99% cases mein matlab simple hai: koi await miss ho raha hai. findBy ke aage await nahi daala? userEvent ke aage await nahi daala? Add karo, warning gayab. RTL automatically act() wrap karta hai apni async utilities mein. Manual act() likhna usually signal hai ki kuch aur approach better hoga."
        />
      </div>

      <div id="testing-hooks">
        <ConceptCard
          title="Custom Hooks Testing — renderHook"
          emoji="🎣"
          difficulty="advanced"
          whatIsIt="Custom hook ka test component ke through karo toh kya hoga? Component UI bhi mock karna padega, rendering bhi handle karna padega — testing ki focus blur ho jaati hai. renderHook magic yahan kaam karta hai — hook directly chalao, koi component nahi. result.current se hook ka return value milta hai. act() se manually state update trigger karo. Pure hook behavior test karo — UI ka koi jhanjhat nahi."
          whenToUse={[
            'Custom hook ek complex logic implement kare',
            'Hook ka behavior independently verify karna ho',
            'Hook ki different argument combinations test karni hoon',
            'Error handling hook mein — kya correct error throw hota hai',
          ]}
          whyUseIt="Unit test philosophy ka core — ek test ek cheez. useDebounce hook test karo toh sirf debounce logic test hona chahiye — koi button, koi form, koi UI nahi. renderHook se hook izolate hoti hai. result.current hamesha latest value deta hai — stale reference problem nahi. rerender se naye props ke saath hook dobara chalao. wrapper se Context inject karo. Ye tool set custom hooks ko ek first-class citizen banata hai — components ki tarah testable."
          howToUse={{
            filename: 'hook-testing.test.tsx',
            language: 'typescript',
            code: `import { renderHook, act } from '@testing-library/react'

// useCounter hook test
test('useCounter increments correctly', () => {
  const { result } = renderHook(() => useCounter(0))

  expect(result.current.count).toBe(0)

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(1)
})

// useDebounce hook test — fake timers ke saath
test('useDebounce delays value update', () => {
  jest.useFakeTimers()
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebounce(value, delay),
    { initialProps: { value: 'initial', delay: 500 } }
  )

  expect(result.current).toBe('initial')

  rerender({ value: 'updated', delay: 500 })
  expect(result.current).toBe('initial')  // Abhi update nahi hua

  act(() => {
    jest.advanceTimersByTime(500)
  })

  expect(result.current).toBe('updated')  // Ab update hua
  jest.useRealTimers()
})

// Hook with API calls — MSW use karo
test('useFetch returns data', async () => {
  const { result } = renderHook(() => useFetch<User>('/api/user'))

  expect(result.current.loading).toBe(true)

  await act(async () => {
    await new Promise(r => setTimeout(r, 0))
  })

  expect(result.current.loading).toBe(false)
  expect(result.current.data?.name).toBe('Mock User')  // MSW response
})

// Hook with context dependency — wrapper provide karo
test('useAuth needs AuthContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  )
  const { result } = renderHook(() => useAuth(), { wrapper })
  expect(result.current.user).toBeNull()
})`,
            explanation: "result kya hai? Ek live reference hai — result.current hamesha hook ka latest return value hai. Koi destructuring mat karo pehle se — const { count } = result.current kiya toh snapshot ban jaata hai, update nahi hoga. Hamesha result.current.count expect mein likhna. act() zaroorat kab? Jab state update manually trigger karo — result.current.increment() call karna act() mein wrap karo. Fake timers ke saath bhi act() wrap karo. Async operations ke liye await act(async () => {...}).",
          }}
          realWorldScenario="useLocalStorage hook — test kaise karoge? localStorage mock karo, renderHook se hook chalao, initial value check karo localStorage se aata hai. setValue call karo — localStorage update hua? renderHook ke result mein naya value reflect hua? Page reload simulate karo — renderHook dobara, value localStorage se read ho? Teen scenarios, teen tests, hook ka complete contract verified. Ye hai systematic hook testing."
          commonMistakes={[
            {
              mistake: 'act() ke bahar state updates check karna',
              why: 'Hook ke andar state update hoti hai — test mein result.current stale ho sakta hai bina act().',
              fix: 'act() mein actions wrap karo: act(() => { result.current.increment() }). Async operations ke liye await act(async () => { ... }).',
            },
            {
              mistake: 'result ko destructure karna pehle',
              why: 'const { count } = result.current — ye current render ka snapshot hai. After update, count stale rahega.',
              fix: 'Hamesha result.current access karo expect mein: expect(result.current.count).toBe(1). Pehle destructure nahi karo.',
            },
          ]}
          proTip="Hook tests sabse stable tests hote hain poore codebase mein. Reason? Implementation details se completely decoupled. useState se useReducer migrate karo — behavior same raha toh hook test ek bhi break nahi hoga. UI change hogi — hook test same rahega. Ye hai separation of concerns ka testing benefit. Library authors mostly hooks test karte hain, components mein minimal integration tests. Tumhara custom logic agar hooks mein hai — well-tested hai."
        />
      </div>
    </div>
  )
}
