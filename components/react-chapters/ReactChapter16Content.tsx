'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

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
          Tests likho taaki fearlessly refactor kar sako, new features add karo, aur bugs production mein ja ne se pehle pakdo. React Testing Library ka philosophy: test karo jo user dekhta aur karta hai — implementation details nahi. Ye philosophy everything change kar deta hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Sahi tests: fast, reliable, maintenance-friendly. Galat tests: brittle, slow, false confidence dete hain. Is chapter mein dono ka fark samjhein.
        </p>
      </div>

      <div id="rtl-philosophy">
        <ConceptCard
          title="React Testing Library Philosophy"
          emoji="🧪"
          difficulty="advanced"
          whatIsIt="RTL (React Testing Library) ka core principle: 'The more your tests resemble the way your software is used, the more confidence they can give you.' Matlab test karo ki user kya dekhta hai aur kya karta hai — internal state, component methods, implementation details nahi. Ye user-centric approach brittle tests se bachati hai."
          whenToUse={[
            'Component render hone ke baad correct output check karna',
            'User interactions (click, type, submit) test karna',
            'Async operations ke baad UI state check karna',
            'Accessibility attributes test karna',
          ]}
          whyUseIt="Implementation-based tests (enzyme style) fragile hote hain — component refactor karo, test break. RTL style tests refactoring survive karte hain — behavior same rahega toh test pass karega. 100% confidence + maintainability = RTL philosophy."
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
            explanation: "getByRole('button', { name: /increment/i }) accessibility-first selector hai — screen reader bhi yahi use karta hai. toBeInTheDocument jest-dom matcher hai. userEvent real browser events simulate karta hai — fireEvent se better. User journey test karo, not internal mechanics.",
          }}
          realWorldScenario="Sequifi mein billing form component — test karo ki sahi error message dikhta hai jab invalid card number daalo, payment button disable rehta hai jab form incomplete ho, success message aata hai valid submission par. Implementation details nahi — user experience test karo."
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
          proTip="@testing-library/jest-dom install karo — extra matchers milti hain: toBeInTheDocument, toBeVisible, toBeDisabled, toHaveClass, toHaveValue. Ye matchers assertions much more readable banate hain. setupFilesAfterEach mein import karo: import '@testing-library/jest-dom'."
        />
      </div>

      <div id="core-apis">
        <ConceptCard
          title="render, screen, fireEvent, userEvent"
          emoji="🔧"
          difficulty="advanced"
          whatIsIt="RTL ke core APIs: render() component mount karta hai jsdom mein. screen queries se elements dhundho — getBy (throws if not found), queryBy (null if not found), findBy (async, waits). userEvent real user interactions simulate karta hai. fireEvent lower-level, specific events trigger karta hai."
          whenToUse={[
            'render — component test setup',
            'screen.getByRole — accessible elements find karo',
            'userEvent — typing, clicking, selecting test karo',
            'screen.findBy — async elements jo eventually appear hote hain',
          ]}
          whyUseIt="Ye APIs mila ke poora test workflow cover karte hain. getBy/queryBy/findBy naming convention clear hai — getBy throws (element hona chahiye), queryBy null return karta hai (element nahi hona check), findBy promise return karta hai (async wait). Sahi query choose karna tests robust banata hai."
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
            explanation: "userEvent.setup() recommended approach hai v14+ mein — proper event sequencing, pointer events, keyboard events all correctly simulated. getByRole accessibility tree use karta hai — semantic HTML correct likhne ko enforce karta hai. findBy use karo jab koi element async aata ho — automatic wait with timeout.",
          }}
          realWorldScenario="Login form test: render karo, email input mein type karo (userEvent.type), password type karo, submit button click karo, loading state check karo, success message ka wait karo (findBy). User ka exact journey replicate hota hai test mein."
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
          proTip="screen.debug() test ke andar call karo — current DOM pretty-print hota hai console mein. Troubleshoot karne ke liye perfect: render(<MyComponent />); screen.debug(); — exactly dekhta hai React kya render kar raha hai. Production tests mein remove karo."
        />
      </div>

      <div id="mocking">
        <ConceptCard
          title="Mocking — Modules, APIs, Hooks"
          emoji="🎭"
          difficulty="advanced"
          whatIsIt="Mocking matlab actual implementation ko fake se replace karna tests mein. API calls mock karo — server ki zaroorat nahi. External modules mock karo — behavior control karo. Custom hooks mock karo — complex setup se bachao. Mocking fast, reliable, isolated tests enable karta hai."
          whenToUse={[
            'API calls — msw (Mock Service Worker) ya jest.fn() se',
            'Browser APIs — localStorage, sessionStorage, navigator',
            'Date/time — jest.useFakeTimers(), jest.setSystemTime()',
            'Third party libraries — jest.mock("library-name")',
          ]}
          whyUseIt="Real API calls tests slow aur flaky banate hain — server down ho toh tests fail. Mocking isolation ensure karta hai — component ek unit hai, external dependencies fake hain. Fast, reproducible tests milte hain."
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
            explanation: "MSW (Mock Service Worker) best approach hai API mocking ke liye — actual fetch intercept karta hai, component level mein koi change nahi. setupServer Node.js mein use hota hai tests ke liye, setupWorker browser development mein. jest.mock module ko completely replace karta hai — all exports mock ho jaate hain.",
          }}
          realWorldScenario="Payment component test — real Stripe API call nahi karni. jest.mock('@stripe/stripe-js') se fake Stripe client inject karo. Success scenario test karo (mock resolve), failure test karo (mock reject). Test fast (no network), reliable (no flaky API), isolated (no real charges)."
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
          proTip="MSW v2 + vitest perfect combo hai modern testing ke liye. msw passthrough karta hai real requests jo mock nahi hain — gradual adoption easy hai. Chrome extension bhi hai — network tab mein MSW intercepted requests dikhaata hai. Production debugging mein bhi helpful."
        />
      </div>

      <div id="async-testing">
        <ConceptCard
          title="Async Testing — waitFor & findBy"
          emoji="⏳"
          difficulty="advanced"
          whatIsIt="React components async hote hain — API calls, useEffect delays, setState batching. Tests mein async operations await karne ke liye waitFor utility aur findBy queries hain. waitFor ek condition satisfied hone tak retry karta hai. findBy async version hai getBy ka — element appear hone tak wait karta hai."
          whenToUse={[
            'Loading state ke baad content appear hone ka wait — findByText',
            'Multiple updates ke baad stable state check karna — waitFor',
            'User action ke baad async side effect verify karna',
            'Error states jo async aate hain — API failure ke baad',
          ]}
          whyUseIt="Bina proper async handling ke tests flaky hote hain — race conditions. waitFor automatic retries karta hai default timeout (1000ms) tak. findBy cleaner API hai simple cases ke liye. Both ensure tests properly async operations await karte hain."
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
            explanation: "findBy = getBy + waitFor ek saath. waitFor jab multiple checks ek saath karne hoon ya complex conditions ho. Fake timers jest.useFakeTimers() se — time manually control karo bina real waiting ke. act() React state updates flush karta hai — RTL internally use karta hai, manually sirf edge cases mein.",
          }}
          realWorldScenario="Real-time chat app testing — message bhejo, API call hoti hai, response aata hai, message list mein dikhna chahiye. findByText(sentMessage) wait karega message appear hone tak. Race conditions automatically handle hoti hain."
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
          proTip="Testing mein `act` warning: 'An update to X inside a test was not wrapped in act(...)' — ye usually await miss karne ka sign hai. RTL ke async utilities (findBy, waitFor, userEvent) internally act() wrap karte hain. Manual act() rarely zaroori hota hai."
        />
      </div>

      <div id="testing-hooks">
        <ConceptCard
          title="Custom Hooks Testing — renderHook"
          emoji="🎣"
          difficulty="advanced"
          whatIsIt="renderHook utility se custom hooks independently test kar sakte ho — koi component render kiye bina. Hook ka return value, state updates, side effects — sab test hote hain. act() se state updates trigger karo aur result check karo. Pure hook logic test hoti hai — UI concern nahi."
          whenToUse={[
            'Custom hook ek complex logic implement kare',
            'Hook ka behavior independently verify karna ho',
            'Hook ki different argument combinations test karni hoon',
            'Error handling hook mein — kya correct error throw hota hai',
          ]}
          whyUseIt="Custom hooks ka test component ke through hoga toh component ka UI bhi mock karna padega — complex setup. renderHook se direct hook logic test hoti hai — simpler, more focused. Unit test philosophy: ek unit ek kaam, ek test ek behavior."
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
            explanation: "result.current hook ka latest return value hai. rerender se naye props ke saath hook re-run karo — dependency changes test karo. wrapper option context providers inject karta hai. act() state updates synchronize karta hai — result.current update ke baad expect karo.",
          }}
          realWorldScenario="useLocalStorage hook test: initial value localStorage se load hoti hai — set karo localStorage, render karo hook, check karo initial value. Update karo — localStorage update ho — rerender ke baad value persist ho. Complete contract test."
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
          proTip="Hook tests component tests se zyada stable hote hain — implementation details change karo (e.g. useState to useReducer), hook test same rahega agar behavior same hai. Yahi test philosophy ka benefit hai. Library developers primarily hooks test karte hain — components ke liye minimal integration tests."
        />
      </div>
    </div>
  )
}
