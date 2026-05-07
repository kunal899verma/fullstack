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
          useState — React ka sabse important hook. Lekin ye kaam kaise karta hai? Bahut log sochte hain useState "magic" hai. Nahi hai! React ek array maintain karta hai sab hooks ke liye. Jab tum useState call karte ho, React us array ka current index dekhta hai aur value return karta hai. Isliye hooks sirf top-level pe call karne chahiye — order matter karta hai!
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein state ke har nuance ko cover karenge — batching, functional updates, lifting state up, aur state vs props kab use karna chahiye. Mystery khatam karte hain.
        </p>
      </div>

      <div id="state-kya-hai">
        <ConceptCard
          title="State Kya Hai? — Component Ki Memory"
          emoji="🧠"
          difficulty="beginner"
          whatIsIt="State aur regular variable mein kya fark hai? Sawaal simple hai — regular variable function call ke baad reset ho jaata hai. Har React render ek function call hai — count++ karo, function end hote hi count phir 0. State persist karti hai renders ke beech — React specifically is data ko yaad rakhta hai. Aur jab setState call karo — React component dobara render karta hai, naya UI screen pe aata hai. Ye reactivity ki core mechanism hai."
          whenToUse={[
            'UI data jo change hoti hai — counter, toggle, selected item',
            'Form inputs — user type karta hai',
            'API data — loaded hone ke baad store karo',
            'UI state — loading, error, open/closed',
          ]}
          whyUseIt="Re-render hona bura nahi — unnecessary re-render bura hai. Ye samajhna important hai. Jab state change hoti hai, React component re-render karta hai — ye expected aur correct behavior hai. React Virtual DOM diffing se efficiently sirf changed parts update karta hai. State ke bina static HTML hoti — koi interactivity nahi. State se dynamic, reactive UI banti hai."
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
            explanation: 'useState(initialValue) ek array return karta hai — [currentValue, setterFunction]. Array destructuring se naam dete hain. Setter call karo — React re-render queue karta hai. Multiple useState calls — React array index se track karta hai, isliye order consistent rehna chahiye. Regular variables reset hoti hain, state persist karti hai.',
          }}
          realWorldScenario="Todo app banao — const [todos, setTodos] = useState([]). Todo add karo: setTodos([...todos, newTodo]). Delete karo: setTodos(todos.filter(t => t.id !== id)). Toggle done: setTodos(todos.map(t => t.id === id ? {...t, done: !t.done} : t)). Har setState pe React list re-render karta hai — DOM automatically update. State management ki yahi simplicity hai."
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
          proTip="State update ke baad turant updated value expect karna — ye common mistake hai. setCount(5); console.log(count) — aayo oye count abhi bhi purana value dikhayega! setState async hai. Updated value next render pe milti hai. Agar value immediately chahiye — local variable use karo: const newCount = 5; setCount(newCount); console.log(newCount)."
        />
      </div>

      <div id="usestate-details">
        <ConceptCard
          title="useState — Deep Dive"
          emoji="🔍"
          difficulty="beginner"
          whatIsIt="useState ke andar deep jaate hain. Functional update form — setCount(prev => prev + 1) — ye sirf style nahi hai, ye correctness ke liye hai. Rapid updates mein, event handlers mein, closures mein — stale state ki problem hoti hai. Functional update hamesha latest state pe kaam karta hai. Object aur array state ke saath immutable pattern follow karna zaroori hai — mutate karo toh React change detect nahi karta."
          whenToUse={[
            'Simple primitive state — number, string, boolean',
            'Object state — form data, user object',
            'Array state — lists, todos, items',
            'Previous state pe depend karne wale updates',
          ]}
          whyUseIt="Stale closure problem — ye React ka ek real gotcha hai. Jab tum setCount(count + 1) likhte ho, count us render ki value hai. Agar 3 rapid clicks hote hain, teeno same count use karte hain — result +1, nahi +3. Functional update (prev => prev + 1) React ki queue se latest value use karta hai — guaranteed +3. Ye difference production mein bugs cause karta hai — samajh lo properly."
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
            explanation: 'Three patterns yaad karo — 1) Functional update: stale closure prevent karta hai, 2) Object spread: {...prev, fieldName: newValue} — sirf changed field update, baaki preserve, 3) Array patterns: spread (add), map (update), filter (delete) — kabhi push/splice use mat karo, reference same rehta hai aur React re-render nahi karta.',
          }}
          realWorldScenario="E-commerce cart implementation — add item: setCart(prev => [...prev, item]). Update quantity: setCart(prev => prev.map(i => i.id === id ? {...i, qty: newQty} : i)). Remove item: setCart(prev => prev.filter(i => i.id !== id)). Clear cart on checkout: setCart([]). Ye teeno patterns (spread, map, filter) array state ke liye production-ready approach hain."
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
          proTip="useState lazy initialization ek performance trick hai. useState(() => expensiveCompute()) — function sirf pehle render pe call hoga. localStorage.getItem('user') har render pe call hona slow hai — useState(() => JSON.parse(localStorage.getItem('user') || 'null')) se sirf ek baar call hoga. Complex initial state ke liye always lazy initialization use karo."
        />
      </div>

      <div id="state-batching">
        <ConceptCard
          title="State Batching — React 18 Ka Power"
          emoji="📦"
          difficulty="beginner"
          whatIsIt="Batching React ka ek interesting internal optimization hai. Multiple setState calls ek function mein — React sab ko queue karta hai, phir ek baar mein process karta hai — sirf ek re-render. Bina batching ke: 3 setState = 3 renders. Batching se: 3 setState = 1 render. React 18 se pehle ye sirf event handlers mein hota tha. React 18 mein automatic batching everywhere — setTimeout, Promises, async functions sab mein."
          whenToUse={[
            'Multiple setState calls ek function mein — automatic batching',
            'flushSync se emergency unbatch karna — rare cases',
            'Async functions mein state updates — React 18 mein auto-batched',
            'Performance optimize karna — unnecessary renders reduce',
          ]}
          whyUseIt="Form submit handler sochte ho: setLoading(true), setError(null), setData(null) — 3 state updates. Batching ke bina: 3 renders, intermediate states visible hote hain — flicker, bad UX. Batching se: sirf final state render hota hai, ek hi baar — no flicker. Ye optimization React ne internally handle kiya hai, developer ko manually kuch nahi karna. React 18 upgrade karo aur ye free milta hai."
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
            explanation: 'React 18 mein batching everywhere automatic hai — event handlers, setTimeout, async functions sab mein. Multiple setState calls = single re-render. flushSync ek escape hatch hai — DOM measurement ke liye state update ke baad synchronously render force karo. Ye rare case hai, 99% mein zaroorat nahi — trust React ka batching.',
          }}
          realWorldScenario="API call karte ho — setLoading(true), setError(null), setData(null) ek saath. React 18 mein sirf ek render — UI directly loading state pe jaata hai, koi flicker nahi. React 17 mein async context mein ye teen alag renders hote — user intermediate states dekhta. React 18 upgrade sirf ye ek reason se worthwhile hai production apps ke liye."
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
          proTip="startTransition React 18 ka powerful feature hai — urgent vs non-urgent state updates distinguish karo. User type kar raha hai (urgent), filter results update ho rahe hain (non-urgent). startTransition(() => setFilteredResults(...)) — React urgent typing input pehle process karta hai, filtering baad mein. UI responsive rehti hai even with expensive operations. Concurrent Mode ka practical power hai ye."
        />
      </div>

      <div id="state-vs-props">
        <ConceptCard
          title="State vs Props — Kab Kaunsa?"
          emoji="⚖️"
          difficulty="beginner"
          whatIsIt="State vs props — ye interview ka classic sawaal bhi hai aur real design decision bhi. Props parent ka data hai — read-only, child sirf read kare. State component ka apna data hai — mutable, sirf wahi component update kare. Simple rule: agar data sirf ek component use karta hai — local state. Agar do siblings share karte hain — parent mein lift karo. Agar poori app use karti hai — Context ya global state."
          whenToUse={[
            'State: component specific data — open/closed, selected item',
            'Props: parent se receive karna — user data, callbacks',
            'Shared state: parent mein — sibling components ke beech',
            'Global state: Context ya Zustand — cross-cutting concerns',
          ]}
          whyUseIt="Props + state combination React ka data model hai. Props se component reusable banti hai — same component, alag data. State se component interactive banti hai — user actions pe respond karo. Aur dono milake unidirectional flow — data upar se neeche, events neeche se upar callback ke through. Ye predictability debugging ko aasan banata hai — state kahan hai pata hai, change kahan se aata hai pata hai."
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
            explanation: 'ProductCard mein isHovered state local hai — parent ko janana zaroorat nahi. onAddToCart callback prop hai — parent state update karta hai cart ke liye. Ye perfect division hai: local UI state (hover) component ke andar, shared business state (cart) parent mein. Har state apni correct jagah pe.',
          }}
          realWorldScenario="Search feature design karo — SearchBar ka input value kaun rakhega? SearchBar mein local state rakho toh Results component kaise janega kya search kiya? Answer: SearchPage mein searchTerm state, SearchBar ko value prop aur onSearch callback. Results ko filtered products prop. Single source of truth — SearchPage. SearchBar aur Results dono same value se driven hain. Ye state co-location principle hai."
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
          proTip="Props copy karna state mein — ye ek classic mistake hai. useState(props.value) — pehle render mein props se initial value milti hai, phir props change hone pe state update nahi hoti. Props aur state sync out ho jaate hain. Agar read-only use karna hai toh props directly use karo. Agar local modification chahiye toh derived state ya useMemo use karo. Never copy props to state unless it's truly initial value."
        />
      </div>

      <div id="lifting-state">
        <ConceptCard
          title="Lifting State Up — Shared State Pattern"
          emoji="🏋️"
          difficulty="beginner"
          whatIsIt="Lifting state up — ek situation aati hai jab do sibling components same data chahte hain. Siblings directly communicate nahi kar sakte — React unidirectional flow hai. Solution: state ko unke common parent mein le jaao. Parent state manage karta hai, dono children props se data lete hain, callbacks se parent ko update karte hain. Parent intermediary ban jaata hai. Ye React ka fundamental pattern hai — pehle local, tab lift."
          whenToUse={[
            'Do ya zyada siblings same data share karein',
            'Ek component ko doosre ki state chahiye',
            'Multiple components ko sync mein rehna ho',
            'Controlled form components banana ho',
          ]}
          whyUseIt="Single source of truth — ye concept bahut important hai. Celsius aur Fahrenheit dono mein alag state rakho — kabhi sync nahi rahenge. Ek mein state rakho, doosre ke liye derive karo — hamesha consistent. Ye principle bade apps mein bhi apply hota hai: state ek jagah, derived values sab jagah. Bugs dramatically kam hote hain jab single source of truth follow karo."
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
            explanation: 'Key insight — sirf celsius state parent mein rakhi. Fahrenheit? Derived value hai — calculate karo on render, koi separate state nahi. Celsius change karo — fahrenheit automatically correct hota hai. Fahrenheit change karo — celsius mein convert karke celsius state update karo. Dono inputs hamesha in sync. Ye single source of truth ka perfect example hai.',
          }}
          realWorldScenario="Multi-step onboarding form — 4 steps. Agar har step ka data us step ke local state mein rakho — back button press karo, state lost. Parent mein sab data rakho: step1Data, step2Data, step3Data — step navigate karo, data safe rehta hai. Step 4 mein review page — parent state se sab data access. Back button pe — parent same state, previous step same data. Single source of truth."
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
          proTip="Zyada lifting state karna bhi anti-pattern hai. Modal ka open/close state — parent ko koi kaam nahi agar sirf Modal ke baad kuch nahi hota. Unnecessarily parent complex hota hai. Rule: state wahan rakho jahan zaroorat ho — co-location principle. Local state local rakho. Sirf genuinely shared data ko lift karo. Zyada lifting = unnecessary re-renders = performance problems."
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
