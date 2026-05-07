'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const stateQuiz: QuizQuestion[] = [
  {
    question: 'useState hook ka initial value kab use hota hai?',
    options: [
      { text: 'Har re-render pe', correct: false, explanation: 'Initial value sirf pehli baar use hota hai — subsequent renders pe ignore.' },
      { text: 'Sirf pehle render pe — component mount hone pe', correct: true, explanation: 'Bilkul! useState(initialValue) sirf first render pe initial value use karta hai. Re-renders pe current state maintain hoti hai.' },
      { text: 'Jab bhi parent re-render ho', correct: false, explanation: 'Parent re-render se initial value reset nahi hoti — state persist karti hai.' },
      { text: 'Kabhi nahi — useState koi initial value nahi leta', correct: false, explanation: 'useState initial value leta hai — undefined, null, ya koi bhi value.' },
    ],
  },
  {
    question: 'Functional update form kab use karna chahiye?',
    options: [
      { text: 'Hamesha — setCount(c => c + 1) best practice hai', correct: false, explanation: 'Hamesha zaroorat nahi — sirf jab new state previous state pe depend kare.' },
      { text: 'Jab new state previous state pe depend kare — setCount(prev => prev + 1)', correct: true, explanation: 'Sahi! Functional update stale closure problem prevent karta hai — always latest state milti hai.' },
      { text: 'Sirf async functions mein', correct: false, explanation: 'Functional updates sync aur async dono mein useful hain.' },
      { text: 'Sirf arrays aur objects ke liye', correct: false, explanation: 'Functional updates primitives ke liye bhi kaam karte hain.' },
    ],
  },
  {
    question: 'State ko directly mutate karna kyun galat hai?',
    options: [
      { text: 'Kyunki TypeScript error deta hai', correct: false, explanation: 'Direct mutation TypeScript error nahi deta necessarily — runtime problem hai.' },
      { text: 'React state change detect nahi karta — re-render nahi hota', correct: true, explanation: 'Bilkul! React reference comparison se change detect karta hai — same object mutate karo toh reference same hai — no re-render.' },
      { text: 'Performance slow hoti hai', correct: false, explanation: 'Performance primary concern nahi — correctness hai.' },
      { text: 'State automatically reset ho jaati hai', correct: false, explanation: 'Direct mutation se state corrupted hoti hai — reset nahi.' },
    ],
  },
  {
    question: 'Lifting state up kab karte hain?',
    options: [
      { text: 'Jab component bahut bada ho jaaye', correct: false, explanation: 'Component size lifting state up ka reason nahi.' },
      { text: 'Jab do sibling components same state share karni ho', correct: true, explanation: 'Sahi! Siblings directly communicate nahi kar sakte — state parent mein lift karo, props se share karo.' },
      { text: 'Hamesha — state hamesha root mein honi chahiye', correct: false, explanation: 'State ko yahan rakho jahan zaroorat ho — gereksiz lifting avoid karo.' },
      { text: 'Jab API calls karne ho', correct: false, explanation: 'API calls ke liye state lifting zaroori nahi.' },
    ],
  },
  {
    question: 'React 18 automatic batching kya karta hai?',
    options: [
      { text: 'State updates queue mein daalta hai aur batches mein process karta hai — sirf ek re-render', correct: true, explanation: 'Sahi! Pehle sirf event handlers mein batching thi. React 18 mein setTimeout, Promise, async functions mein bhi automatic batching.' },
      { text: 'Multiple components ek saath render karta hai', correct: false, explanation: 'Batching multiple setState calls ke baare mein hai — multiple components nahi.' },
      { text: 'State updates cancel karta hai', correct: false, explanation: 'Batching cancel nahi karta — combine karta hai.' },
      { text: 'Sirf class components mein kaam karta hai', correct: false, explanation: 'Batching functional components mein bhi kaam karta hai.' },
    ],
  },
]

export default function ReactChapter4Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{
          background: 'rgba(6,182,212,0.06)',
          border: '1px solid rgba(6,182,212,0.2)',
        }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          State & useState — Component Ka Memory
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          State React ka sabse fundamental concept hai — component ki apni memory jो re-renders ke beech persist karti hai. useState hook se state manage karo. Counter, form inputs, toggle buttons — sab state se powered hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum state ke nuances cover karenge — batching, functional updates, lifting state up, aur state vs props kab use karna chahiye.
        </p>
      </div>

      <div id="state-kya-hai">
        <ConceptCard
          title="State Kya Hai? — Component Ki Memory"
          emoji="🧠"
          difficulty="beginner"
          whatIsIt="State component ki memory hai — re-renders ke beech data persist karta hai. Regular variables function call ke baad reset ho jaate hain — state nahi. React state change hone pe component automatically re-render karta hai — UI updated rahe. useState hook se state manage karte hain functional components mein."
          whenToUse={[
            'UI data jo change hoti hai — counter, toggle, selected item',
            'Form inputs — user type karta hai',
            'API data — loaded hone ke baad store karo',
            'UI state — loading, error, open/closed',
          ]}
          whyUseIt="State ke bina React components static hote — data nahi change hoti. State + JSX milake reactive UI banate hain — state change karo, React automatically UI update karta hai. Manual DOM manipulation ki zaroorat nahi — declare karo kya dikhna chahiye, React figure out karta hai kaise update kare."
          howToUse={{
            filename: 'Counter.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

function Counter() {
  // [currentValue, setterFunction] = useState(initialValue)
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('Click the button!')

  // State update function — React re-renders component
  function increment() {
    setCount(count + 1)  // Simple update

    if (count + 1 >= 10) {
      setMessage('10 tak pahunch gaye!')
    }
  }

  function reset() {
    setCount(0)
    setMessage('Reset ho gaya!')
  }

  return (
    <div>
      <p>Count: {count}</p>
      <p>{message}</p>
      <button onClick={increment}>+1</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

// ❌ WRONG — Regular variable, no re-render
function BrokenCounter() {
  let count = 0  // Reset hoti hai har render pe!

  function increment() {
    count++  // UI update nahi hoga
    console.log(count)  // Log hoga, lekin UI nahi banega
  }

  return <button onClick={increment}>{count}</button>
}

// Multiple state variables — each independent
function Form() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState<number | null>(null)

  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input
        type="number"
        value={age ?? ''}
        onChange={e => setAge(e.target.value ? Number(e.target.value) : null)}
      />
    </form>
  )
}`,
            explanation: 'useState(initialValue) — [currentState, setter] return karta hai. Setter call karo — React re-render schedule karta hai. Multiple state variables — each independent, organized. Regular variables reset hoti hain har render pe — state persist karti hai.',
          }}
          realWorldScenario="Todo app mein: const [todos, setTodos] = useState([]). Todo add karo: setTodos([...todos, newTodo]). Delete karo: setTodos(todos.filter(t => t.id !== id)). Har change pe React list re-render karta hai — DOM automatically update."
          commonMistakes={[
            {
              mistake: 'State ko directly mutate karna: todos.push(newTodo)',
              why: 'React same reference dekhta hai — change detect nahi hota — no re-render. Bug!',
              fix: 'Hamesha new array/object: setTodos([...todos, newTodo]) ya setTodos(prev => [...prev, newTodo]).',
            },
            {
              mistake: 'State update ke baad turant updated value expect karna',
              why: 'setState async hai — same render mein updated value nahi milti. setCount(5); console.log(count) — still old value.',
              fix: 'State update next render pe reflect hoti hai. Agar value chahiye immediate — local variable use karo: const newCount = 5; setCount(newCount); console.log(newCount).',
            },
          ]}
          proTip="useState lazy initialization: useState(() => expensiveCompute()) — function sirf pehli render pe call hoga. Complex initial state ke liye useful — JSON.parse(localStorage.getItem('data')) sirf once. Bina lazy: har render pe execute hoga (slow)."
        />
      </div>

      <div id="usestate-details">
        <ConceptCard
          title="useState — Deep Dive"
          emoji="🔍"
          difficulty="beginner"
          whatIsIt="useState initial value, updater function, functional updates support karta hai. Functional update form (prev => newValue) stale closure problem prevent karta hai. Object aur array state ke saath immutable updates zaroori hain. useState TypeScript mein generic type accept karta hai."
          whenToUse={[
            'Simple primitive state — number, string, boolean',
            'Object state — form data, user object',
            'Array state — lists, todos, items',
            'Previous state pe depend karne wale updates',
          ]}
          whyUseIt="Functional updates ensure karte hain latest state milti hai — especially async code, event listeners, closures mein. TypeScript generic se type safety: useState<User | null>(null). Object state ke saath spread operator se immutable update karo — specific fields change karo baki preserve karo."
          howToUse={{
            filename: 'UseStateDeep.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

// ── FUNCTIONAL UPDATES — Stale closure prevention ──────────────────
function Counter() {
  const [count, setCount] = useState(0)

  // ❌ May use stale value in some scenarios
  function incrementBad() {
    setCount(count + 1)
  }

  // ✅ Always uses latest state — functional update
  function incrementGood() {
    setCount(prev => prev + 1)
  }

  // Multiple rapid increments — functional update correct hai
  function increment3Times() {
    setCount(prev => prev + 1)  // Queued
    setCount(prev => prev + 1)  // Queued: uses result of above
    setCount(prev => prev + 1)  // Queued: uses result of above
    // Result: +3 guaranteed
  }

  return <button onClick={increment3Times}>{count}</button>
}

// ── OBJECT STATE — Immutable updates ─────────────────────────────
interface UserForm {
  name: string
  email: string
  bio: string
}

function UserProfile() {
  const [user, setUser] = useState<UserForm>({
    name: 'Rahul',
    email: 'rahul@example.com',
    bio: '',
  })

  // Update single field — spread rest
  function updateField(field: keyof UserForm, value: string) {
    setUser(prev => ({ ...prev, [field]: value }))
  }

  // Nested object update
  const [settings, setSettings] = useState({
    notifications: { email: true, push: false, sms: true },
    theme: 'dark',
  })

  function toggleEmailNotif() {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        email: !prev.notifications.email,
      },
    }))
  }

  return (
    <div>
      <input
        value={user.name}
        onChange={e => updateField('name', e.target.value)}
      />
      <input
        value={user.email}
        onChange={e => updateField('email', e.target.value)}
      />
    </div>
  )
}

// ── ARRAY STATE ────────────────────────────────────────────────────
function TodoList() {
  const [todos, setTodos] = useState<{ id: number; text: string; done: boolean }[]>([])

  const add = (text: string) =>
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }])

  const toggle = (id: number) =>
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))

  const remove = (id: number) =>
    setTodos(prev => prev.filter(t => t.id !== id))

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.done} onChange={() => toggle(todo.id)} />
          <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => remove(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}`,
            explanation: 'Functional update (prev => ...) stale closure prevent karta hai — hamesha latest state milti hai. Object state mein spread karo pehle, phir override karo field. Array state mein map (update), filter (delete), spread (add) use karo — never push/splice.',
          }}
          realWorldScenario="Shopping cart: add item: setCart(prev => [...prev, item]). Update qty: setCart(prev => prev.map(i => i.id === id ? {...i, qty: newQty} : i)). Remove: setCart(prev => prev.filter(i => i.id !== id)). Checkout: setCart([]) — cart clear."
          commonMistakes={[
            {
              mistake: 'Object state ko mutate karna aur spread forget karna',
              why: 'user.name = newName — same reference, no re-render. Ya sirf name field return karna — baaki fields lost.',
              fix: 'setUser(prev => ({ ...prev, name: newName })) — spread all, override specific.',
            },
            {
              mistake: 'Rapid updates mein stale closures',
              why: 'onClick triggers 3 setCount(count + 1) — all use same stale count — only +1 net change.',
              fix: 'setCount(prev => prev + 1) — each queued update gets latest value.',
            },
          ]}
          proTip="useReducer useState ka advanced alternative hai — complex state logic ke liye. Multiple related state updates ko ek reducer mein consolidate karo. dispatch({ type: 'ADD_TODO', payload: item }) — predictable, testable state transitions. Redux pattern without Redux."
        />
      </div>

      <div id="state-batching">
        <ConceptCard
          title="State Batching — React 18 Ka Power"
          emoji="📦"
          difficulty="beginner"
          whatIsIt="Batching: multiple setState calls ko React ek saath process karta hai — sirf ek re-render. React 18 se pehle sirf event handlers mein batching hoti thi. React 18 automatic batching — setTimeout, Promise, fetch callbacks mein bhi. Batching performance improve karta hai — unnecessary renders avoid."
          whenToUse={[
            'Multiple setState calls ek function mein — automatic batching',
            'flushSync se emergency unbatch karna — rare cases',
            'Async functions mein state updates — React 18 mein auto-batched',
            'Performance optimize karna — unnecessary renders reduce',
          ]}
          whyUseIt="Batching se performance improve hoti hai — 3 setState calls = 1 render, 3 nahi. React 18 automatic batching se async code mein bhi same benefit. flushSync se emergency mein sync render force karo — jab DOM measurement zaroorat ho state change ke baad."
          howToUse={{
            filename: 'Batching.tsx',
            language: 'tsx',
            code: `import { useState, flushSync } from 'react'

function BatchingDemo() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)
  const [name, setName] = useState('')

  console.log('Rendered!')

  // React 18: Event handler mein batching — sirf 1 render
  function handleClick() {
    setCount(c => c + 1)   // Queued
    setFlag(f => !f)       // Queued
    setName('Updated')     // Queued
    // All 3 together — 1 render!
  }

  // React 18: Async mein bhi batching (new!)
  async function handleAsync() {
    const data = await fetch('/api/data').then(r => r.json())
    setCount(data.count)   // Queued
    setFlag(data.flag)     // Queued
    // Ek render! React 17 mein ye 2 renders hote the
  }

  // flushSync — force sync render (rare, avoid karo)
  function handleFlushSync() {
    flushSync(() => {
      setCount(c => c + 1)
    })
    // DOM yahan updated hai — measurement possible
    const height = document.querySelector('.counter')?.getBoundingClientRect().height
    console.log('Height after update:', height)

    setFlag(f => !f)  // Next render
  }

  return (
    <div>
      <p className="counter">Count: {count}</p>
      <p>Flag: {String(flag)}</p>
      <p>Name: {name}</p>
      <button onClick={handleClick}>All 3 together (1 render)</button>
      <button onClick={handleAsync}>Async updates (1 render in React 18)</button>
    </div>
  )
}`,
            explanation: 'Batching default behavior hai React 18 mein — everywhere. Multiple setState → ek render. flushSync emergency ke liye — scroll position, DOM measurements. Batching manually rokne ki zaroorat rarely hoti hai — trust React.',
          }}
          realWorldScenario="Form submit handler: setLoading(true); setError(null); setData(null) — 3 state updates, 1 render. Bina batching: 3 renders, intermediate states visible. Batching se: sirf final state render hota hai — no flicker."
          commonMistakes={[
            {
              mistake: 'Batching pe rely karna state consistency ke liye',
              why: 'Batching implementation detail hai — future React versions behavior change ho sakta hai.',
              fix: 'Related state ko ek object mein combine karo: { loading, error, data } — hamesha consistent.',
            },
            {
              mistake: 'flushSync overuse karna',
              why: 'flushSync performance hit hai — sync render forces. Rarely needed.',
              fix: 'flushSync sirf DOM measurement cases mein use karo — ref.current dimensions after state update. Animation timing mein sometimes.',
            },
          ]}
          proTip="startTransition React 18 ka feature hai — non-urgent state updates mark karo. Urgent (typing) vs non-urgent (filtered results). React urgent updates first process karta hai — UI responsive rehti hai. Concurrent features ka foundation."
        />
      </div>

      <div id="state-vs-props">
        <ConceptCard
          title="State vs Props — Kab Kaunsa?"
          emoji="⚖️"
          difficulty="beginner"
          whatIsIt="Props parent se child ko data pass karta hai — read-only. State component ki apni data hai — mutable. Rule: component ke paas sirf uski apni state honi chahiye — shared data parent mein. Controlled components — parent state control karta hai. Uncontrolled — component apna state manage karta hai."
          whenToUse={[
            'State: component specific data — open/closed, selected item',
            'Props: parent se receive karna — user data, callbacks',
            'Shared state: parent mein — sibling components ke beech',
            'Global state: Context ya Zustand — cross-cutting concerns',
          ]}
          whyUseIt="Clear separation of concerns — props data flow explicit banate hain, state local changes handle karta hai. Props se component reusable hoti hai — alag data ke saath same component. State se component interactive hoti hai — user actions respond karo. Dono milake React ka unidirectional data flow banta hai."
          howToUse={{
            filename: 'StateVsProps.tsx',
            language: 'tsx',
            code: `// ── PROPS — read-only parent data ────────────────────────────────
interface ProductCardProps {
  product: { id: string; name: string; price: number; image: string }
  onAddToCart: (id: string) => void  // Callback prop
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // Props se data — read only!
  // product.name = 'new' — Error! Props immutable

  // Internal state — card pe hover hua?
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform: isHovered ? 'scale(1.05)' : 'none' }}
    >
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      {/* Callback prop invoke karo — parent state update */}
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  )
}

// ── LIFTING STATE UP — Sibling communication ──────────────────────
function ShoppingPage() {
  // Shared state — parent mein
  const [cartItems, setCartItems] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  const addToCart = (id: string) => {
    setCartItems(prev => [...prev, id])
  }

  return (
    <div>
      {/* Sibling 1: ProductList */}
      <ProductList
        category={selectedCategory}
        onAddToCart={addToCart}
      />
      {/* Sibling 2: Cart — props se cartItems milti hai */}
      <Cart items={cartItems} onRemove={id => setCartItems(prev => prev.filter(i => i !== id))} />
      {/* Sibling 3: CategoryFilter */}
      <CategoryFilter
        current={selectedCategory}
        onChange={setSelectedCategory}
      />
    </div>
  )
}

// ── CONTROLLED vs UNCONTROLLED ────────────────────────────────────

// Controlled — parent state controls input
function ControlledInput({ value, onChange }: {
  value: string
  onChange: (v: string) => void
}) {
  return <input value={value} onChange={e => onChange(e.target.value)} />
}

// Uncontrolled — component manages own state
function UncontrolledInput({ defaultValue = '' }: { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue)
  return <input value={value} onChange={e => setValue(e.target.value)} />
}`,
            explanation: 'Props parent → child data flow. State internal mutable data. Shared state parent mein — siblings props se access karte hain, callbacks se update. Controlled inputs parent state se — single source of truth. Uncontrolled apna state manage karte hain.',
          }}
          realWorldScenario="Search feature: SearchBar component ka input state — local (uncontrolled feel). Filter results — SearchPage mein state, SearchBar ko searchTerm prop aur onSearch callback. Results component ko filtered products prop. Single source of truth mein searchTerm — SearchBar aur Results dono same value."
          commonMistakes={[
            {
              mistake: 'Props copy karna state mein: useState(props.value)',
              why: 'State aur props sync nahi rehte — parent props update kare toh state stale rehti hai.',
              fix: 'Props directly use karo agar read-only. Agar local modification chahiye — derived state use karo ya useMemo.',
            },
            {
              mistake: 'State bahut high lift karna — root mein sab kuch',
              why: 'Root state update — poora tree re-render. Performance problem aur unnecessary complexity.',
              fix: 'State wahan rakho jahan zaroorat ho — co-location principle. Global sirf genuinely shared data ke liye.',
            },
          ]}
          proTip="State colocation principle: state ko uske nearest common ancestor mein rakho. Agar sirf ek component use karta hai — wahan rakho (local state). Do siblings share karte hain — parent mein. Bahut deep prop drilling — Context ya Zustand. Ye decision tree performance aur maintainability dono optimize karta hai."
        />
      </div>

      <div id="lifting-state">
        <ConceptCard
          title="Lifting State Up — Shared State Pattern"
          emoji="🏋️"
          difficulty="beginner"
          whatIsIt="Jab sibling components same state share karni ho — state ko unke common parent mein lift karo. Parent state manage karta hai, children props aur callbacks receive karte hain. Children direct communicate nahi karte — parent intermediary hai. Ye React ka fundamental data flow pattern hai."
          whenToUse={[
            'Do ya zyada siblings same data share karein',
            'Ek component ko doosre ki state chahiye',
            'Multiple components ko sync mein rehna ho',
            'Controlled form components banana ho',
          ]}
          whyUseIt="Lifting state se single source of truth milti hai — ek jagah change karo, sab sync. Predictable data flow — props se data neeche jaata hai, callbacks se upar. Debugging easy — state kahan hai pata hai. Components reusable hote hain — alag context mein use karo same component."
          howToUse={{
            filename: 'LiftingState.tsx',
            language: 'tsx',
            code: `// Scenario: Temperature converter — Celsius aur Fahrenheit sync mein

// ── WITHOUT lifting state — Out of sync ──────────────────────────
function BadApp() {
  // Problem: dono components separate state rakhein — never in sync!
  return (
    <div>
      <CelsiusInput />    {/* Internal state */}
      <FahrenheitInput /> {/* Different internal state */}
    </div>
  )
}

// ── WITH lifting state — In sync ─────────────────────────────────

// Child components — controlled (no own state)
function CelsiusInput({
  celsius,
  onCelsiusChange,
}: {
  celsius: string
  onCelsiusChange: (value: string) => void
}) {
  return (
    <label>
      Celsius:
      <input
        type="number"
        value={celsius}
        onChange={e => onCelsiusChange(e.target.value)}
      />
    </label>
  )
}

function FahrenheitInput({
  fahrenheit,
  onFahrenheitChange,
}: {
  fahrenheit: string
  onFahrenheitChange: (value: string) => void
}) {
  return (
    <label>
      Fahrenheit:
      <input
        type="number"
        value={fahrenheit}
        onChange={e => onFahrenheitChange(e.target.value)}
      />
    </label>
  )
}

// Parent — state yahan hai
function TemperatureConverter() {
  const [celsius, setCelsius] = useState('0')

  // Derived value — no separate state needed
  const fahrenheit = celsius === '' ? '' : String(parseFloat(celsius) * 9/5 + 32)

  function handleCelsiusChange(value: string) {
    setCelsius(value)
  }

  function handleFahrenheitChange(value: string) {
    if (value === '') {
      setCelsius('')
    } else {
      // Convert Fahrenheit to Celsius aur save
      setCelsius(String((parseFloat(value) - 32) * 5/9))
    }
  }

  return (
    <div>
      <CelsiusInput celsius={celsius} onCelsiusChange={handleCelsiusChange} />
      <FahrenheitInput fahrenheit={fahrenheit} onFahrenheitChange={handleFahrenheitChange} />
      <p>{celsius}°C = {fahrenheit}°F</p>
    </div>
  )
}`,
            explanation: 'Sirf celsius state parent mein — fahrenheit derived value hai (computed, no separate state). Celsius input changes celsius state. Fahrenheit input change celsius convert karke. Dono always in sync — single source of truth. Children pure controlled components — props in, callbacks out.',
          }}
          realWorldScenario="Multi-step form: parent state mein sab step data. Step 1, 2, 3 — sab share parent state aur update karte hain. Step 4 — review all data. Back button pe — parent state same hai, previous step data lost nahi. Single source of truth ensures consistency."
          commonMistakes={[
            {
              mistake: 'Bahut zyada props — prop drilling',
              why: '5-6 levels deep props pass karna — component mein koi kaam ka nahi lekin pass karna padta hai.',
              fix: 'Context API ya Zustand use karo prop drilling se bacchne ke liye. 2-3 levels tak props okay hain.',
            },
            {
              mistake: 'Unnecessary lifting — local state ko parent mein daalna',
              why: 'Modal ka open/close state — parent ko koi kaam nahi. Unnecessarily parent complex hota hai.',
              fix: 'Local state local rakho. Sirf genuinely shared data ko lift karo.',
            },
          ]}
          proTip="Compound components pattern lifting state elegant banata hai. Parent context provide karta hai, children useContext se state leten hain — explicit prop drilling nahi. Radix UI, Headless UI isi pattern use karte hain — Dialog.Root, Dialog.Trigger, Dialog.Content — sab same state access karte hain."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 4 Quiz — State & useState
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — React state master karo!
          </p>
        </div>
        <QuizSection questions={stateQuiz} chapterSlug="state-usestate" />
      </div>
    </div>
  )
}
