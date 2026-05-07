'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Chapter Overview Diagram ───────────────────────────────────────────────────

function SyntheticEventDiagram() {
  const items = [
    {
      label: 'Native DOM Event',
      sublabel: 'Browser fires raw event — click, change, keydown — different per browser',
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.1)',
      border: 'rgba(6,182,212,0.3)',
      icon: '🖱️',
    },
    {
      label: 'React Event Delegation',
      sublabel: 'Single root listener — React captures ALL events at root, not per element',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.1)',
      border: 'rgba(124,58,237,0.3)',
      icon: '🎯',
    },
    {
      label: 'SyntheticEvent Wrapper',
      sublabel: 'React normalizes event — same API across ALL browsers, all edge cases handled',
      color: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
      border: 'rgba(16,185,129,0.3)',
      icon: '📦',
    },
    {
      label: 'Unified API → Your Handler',
      sublabel: 'onClick={handleClick} — e.target, e.preventDefault(), e.stopPropagation() — consistent',
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.08)',
      border: 'rgba(6,182,212,0.25)',
      icon: '⚡',
    },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Synthetic Event System — How React Handles Events</p>
      <div className="max-w-lg mx-auto space-y-2">
        {items.map((item, i) => (
          <div key={i}>
            <div className="rounded-xl px-5 py-3.5 flex items-center gap-4" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-[#71717A] mt-0.5">{item.sublabel}</p>
              </div>
            </div>
            {i < items.length - 1 && <div className="flex justify-center py-1"><span className="text-[#71717A] text-xs">↓</span></div>}
          </div>
        ))}
      </div>
    </div>
  )
}

const eventsQuiz: QuizQuestion[] = [
  {
    question: 'React mein event handlers ko directly kaise pass karte hain?',
    options: [
      { text: 'onClick="handleClick()" — string mein function call', correct: false, explanation: 'Ye HTML syntax hai — React mein string nahi, function reference pass karo.' },
      { text: 'onClick={handleClick} — function reference', correct: true, explanation: 'Sahi! onClick={handleClick} — function reference, React appropriate time pe call karta hai.' },
      { text: 'onClick={handleClick()} — immediately call karo', correct: false, explanation: 'onClick={handleClick()} component render hote waqt call hoga — event pe nahi! undefined return value register hoga.' },
      { text: 'on-click={handleClick} — kebab case', correct: false, explanation: 'React camelCase use karta hai — onClick, onChange, onSubmit.' },
    ],
  },
  {
    question: 'Controlled input kya hota hai?',
    options: [
      { text: 'Input jo sirf numbers accept kare', correct: false, explanation: 'Input type se controlled/uncontrolled determine nahi hota.' },
      { text: 'Input whose value React state se driven hoti hai — value + onChange pattern', correct: true, explanation: 'Sahi! value={state} aur onChange={setState} — React single source of truth maintain karta hai.' },
      { text: 'Input jo disabled ho', correct: false, explanation: 'Disabled input controlled/uncontrolled dono ho sakti hai.' },
      { text: 'Input jo form mein ho', correct: false, explanation: 'Form element control nahi determine karta.' },
    ],
  },
  {
    question: 'Form submit handler mein e.preventDefault() kyon zaroori hai?',
    options: [
      { text: 'State update karne ke liye', correct: false, explanation: 'preventDefault state se related nahi.' },
      { text: 'Browser ke default behavior — page reload — rok ne ke liye', correct: true, explanation: 'Bilkul! Browser form submit pe default refresh karta hai. preventDefault se aap JavaScript se handle kar sakte ho.' },
      { text: 'Event propagation rokne ke liye', correct: false, explanation: 'Event propagation stopPropagation() rokta hai, preventDefault nahi.' },
      { text: 'Input validation ke liye', correct: false, explanation: 'Validation alag logic hai — preventDefault ki zaroorat validation se independent hai.' },
    ],
  },
  {
    question: 'Multiple inputs single handler se handle karne ka sahi tarika kya hai?',
    options: [
      { text: 'Har input ke liye alag function likhna', correct: false, explanation: 'Verbose aur repetitive — better pattern available hai.' },
      { text: 'e.target.name se field identify karo aur computed property se update karo', correct: true, explanation: 'Sahi! setForm(prev => ({ ...prev, [e.target.name]: e.target.value })) — ek handler sab inputs handle karta hai.' },
      { text: 'useRef se values directly read karo', correct: false, explanation: 'useRef uncontrolled inputs ke liye hai — controlled pattern ke liye nahi.' },
      { text: 'document.getElementById se value lena', correct: false, explanation: 'React mein DOM directly access karna anti-pattern hai — state use karo.' },
    ],
  },
  {
    question: 'React ka Synthetic Event system kya advantage deta hai?',
    options: [
      { text: 'Events faster fire karte hain', correct: false, explanation: 'Performance primary benefit nahi.' },
      { text: 'Cross-browser consistency — sab browsers mein same event behavior', correct: true, explanation: 'Sahi! React native browser events wrap karta hai — consistent API across all browsers, edge cases handle.' },
      { text: 'Events automatically async hote hain', correct: false, explanation: 'Event handling sync hai by default.' },
      { text: 'Memory automatically free hoti hai', correct: false, explanation: 'React event delegation use karta hai — efficient hai lekin ye reason nahi.' },
    ],
  },
]

export default function ReactChapter5Content() {
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
          Events & Forms — User Ka React Se Baat
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          User ne button click kiya — React kya karta hai andar se? React Synthetic Event system use karta hai. Ye native browser events ke upar ek wrapper hai — cross-browser consistency ke liye. Har browser events thoda alag handle karta tha — React ne ek unified API banaya. onClick handler likhte ho — React internally event delegation use karta hai, root element pe single listener lagata hai aur sab events wahan handle karta hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein event system, controlled inputs, form handling, multi-field forms, aur validation — sab production patterns ke saath.
        </p>
      </div>

      <SyntheticEventDiagram />

      <div id="react-events">
        <ConceptCard
          title="React Event System — Synthetic Events"
          emoji="⚡"
          difficulty="beginner"
          whatIsIt="React ka Synthetic Event system ek clever design hai. Browser se natively event aata hai — React usse ek normalized SyntheticEvent object mein wrap karta hai. Har browser mein same properties, same behavior. onClick, onChange, onSubmit, onKeyDown — sab camelCase (HTML mein onclick, onchange tha). Event handler ko function reference pass karo — call time pe React event object deta hai. Event delegation — React root element pe ek listener lagata hai, sab events wahan manage hote hain."
          whenToUse={[
            'Button clicks, link clicks — onClick',
            'Input changes — onChange',
            'Form submission — onSubmit',
            'Keyboard events — onKeyDown, onKeyUp, onKeyPress',
          ]}
          whyUseIt="Synthetic events ka benefit: tum browser ke baare mein mat socho — React handle karta hai. IE mein attachEvent tha, modern browsers mein addEventListener — React ne ye sab normalize kiya. React 17 mein ek important change hua: events document pe nahi, root element pe delegate hote hain — better performance aur iframe compatibility. TypeScript ke saath MouseEvent, ChangeEvent, KeyboardEvent — fully typed, autocomplete aata hai."
          howToUse={{
            filename: 'Events.tsx',
            language: 'tsx',
            code: `import { MouseEvent, ChangeEvent, KeyboardEvent, FocusEvent } from 'react'

function EventsDemo() {
  // ── CLICK EVENTS ─────────────────────────────────────────────────
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    console.log('Clicked!', e.target)
    console.log('Mouse position:', e.clientX, e.clientY)
    console.log('Shift held?', e.shiftKey)
  }

  // ── CHANGE EVENTS ────────────────────────────────────────────────
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name, type, checked } = e.target
    // type="checkbox" ke liye checked use karo, value nahi
    const newValue = type === 'checkbox' ? checked : value
    console.log(name, newValue)
  }

  // ── KEYBOARD EVENTS ───────────────────────────────────────────────
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      // Enter press pe submit
      submitForm()
    }
    if (e.key === 'Escape') {
      // Escape pe clear
      clearInput()
    }
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault()  // Browser save rok do
      saveDocument()
    }
  }

  // ── EVENT OBJECT PROPERTIES ───────────────────────────────────────
  function handleAnyEvent(e: MouseEvent) {
    e.preventDefault()      // Default browser action rok do
    e.stopPropagation()     // Bubble rokna — parent handlers nahi milega event
    e.target                // Element jo actually clicked hua
    e.currentTarget         // Element jis pe listener laga hai
  }

  // ── PASSING ARGUMENTS ─────────────────────────────────────────────
  function handleDelete(id: string) {
    console.log('Delete:', id)
  }

  const items = ['item1', 'item2', 'item3']

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <input onChange={handleChange} onKeyDown={handleKeyDown} />

      {/* ❌ Wrong — calls immediately on render */}
      {/* <button onClick={handleDelete('item1')}>Delete</button> */}

      {/* ✅ Arrow function se argument pass karo */}
      {items.map(id => (
        <button key={id} onClick={() => handleDelete(id)}>Delete {id}</button>
      ))}

      {/* ✅ Curried function */}
      {items.map(id => (
        <button key={id} onClick={handleDelete.bind(null, id)}>Delete {id}</button>
      ))}
    </div>
  )
}`,
            explanation: 'Sabse common mistake — onClick={handleClick()} likhna. Ye render hote waqt call ho jaata hai! onClick={handleClick} — reference dete hain, React event pe call karta hai. Arguments pass karne ke liye: onClick={() => handleDelete(id)} arrow function use karo. e.target = actually clicked element, e.currentTarget = element jis pe listener laga hai — deep nesting mein ye alag hote hain.',
          }}
          realWorldScenario="Dropdown menu implement karo — button click pe open, bahar click pe close. Classic problem: button click karo — menu opens, phir document pe click event bubble karta hai — document listener immediately close kar deta hai. Solution: button click handler mein e.stopPropagation() — event document tak nahi pahunchta. Ye event bubbling ka real-world use case hai."
          commonMistakes={[
            {
              mistake: 'onClick={handleClick()} — function immediately call karna',
              why: 'Render hote waqt function call hoga, return value (undefined) onClick mein jaayega. Event pe kuch nahi hoga.',
              fix: 'onClick={handleClick} — reference. Arguments ke liye: onClick={() => handleClick(arg)}',
            },
            {
              mistake: 'e.preventDefault() karna jab zaroorat nahi',
              why: 'Anchor tags mein e.preventDefault() — navigation rok deta hai. Link navigate nahi karega.',
              fix: 'preventDefault sirf jab default browser behavior actually prevent karna ho — form submit, drag, right-click menu.',
            },
          ]}
          proTip="e.preventDefault() — sirf jab browser ka default behavior actually rokna ho. Form submit pe page reload rokna: zaroori. Anchor tag pe navigate rokna: sirf agar JavaScript handle kar raha ho. Unnecessarily har event pe preventDefault lagana — unexpected behavior cause karta hai. Sochkar use karo — kab browser default behavior chahiye, kab nahi."
        />
      </div>

      <div id="controlled-inputs">
        <ConceptCard
          title="Controlled Inputs — Single Source of Truth"
          emoji="🎛️"
          difficulty="beginner"
          whatIsIt="Controlled input ka concept simple hai — React state hi source of truth hai. value={state} + onChange={setState} — ye do props ek saath. User type karta hai — onChange fire hota hai — state update hoti hai — React re-render karta hai — input ke value mein state dikhta hai. Circle complete. Agar value prop diya bina onChange — read-only input ban jaata hai. Uncontrolled input? DOM khud state rakhta hai — ref se access karo — React control mein nahi."
          whenToUse={[
            'Form inputs jahan state pe depend karo — show/hide based on value',
            'Input validation — real-time feedback',
            'Input transformation — auto-capitalize, format phone',
            'Multiple inputs — single handler pattern',
          ]}
          whyUseIt="Controlled input ka power ye hai — value hamesha JavaScript mein available hai. Validate karo real-time. Transform karo — phone number format karo jaise type kare. Dependent UI update karo — city dropdown state ke hisaab se. Programmatically clear karo — setForm({}) se sab reset. Submit pe FormData dhundne ki zaroorat nahi — state mein sab hai. Ye control real-world apps mein bahut kaam aata hai."
          howToUse={{
            filename: 'ControlledInputs.tsx',
            language: 'tsx',
            code: `import { useState, ChangeEvent } from 'react'

function ControlledInputsDemo() {
  const [text, setText] = useState('')
  const [checked, setChecked] = useState(false)
  const [selected, setSelected] = useState('option1')
  const [textarea, setTextarea] = useState('')
  const [radioValue, setRadioValue] = useState('yes')

  return (
    <div>
      {/* Text input */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here..."
      />
      <p>You typed: {text}</p>

      {/* Checkbox */}
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        Accept terms
      </label>

      {/* Select dropdown */}
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      {/* Textarea */}
      <textarea
        value={textarea}
        onChange={(e) => setTextarea(e.target.value)}
        rows={4}
      />

      {/* Radio buttons */}
      {['yes', 'no', 'maybe'].map(option => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={radioValue === option}
            onChange={(e) => setRadioValue(e.target.value)}
          />
          {option}
        </label>
      ))}

      {/* Input transformation — auto format */}
      <PhoneInput />
    </div>
  )
}

// Real-world: Phone number auto-formatting
function PhoneInput() {
  const [phone, setPhone] = useState('')

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 5) return digits
    if (digits.length <= 8) return \`\${digits.slice(0, 5)}-\${digits.slice(5)}\`
    return \`\${digits.slice(0, 5)}-\${digits.slice(5, 8)}-\${digits.slice(8)}\`
  }

  return (
    <input
      type="tel"
      value={phone}
      onChange={e => setPhone(formatPhone(e.target.value))}
      placeholder="99999-999-999"
    />
  )
}`,
            explanation: 'Input types ke alag-alag controlled pattern: text input — value + onChange. Checkbox — checked property (value nahi!) + onChange mein e.target.checked. Select — value on select element, options mein value prop. Radio buttons — checked={radioValue === option} pattern. Phone formatting — onChange mein format karo, formatted value state mein.',
          }}
          realWorldScenario="Search bar implement karo — value={searchTerm}, onChange mein setSearchTerm aur debouncedSearch dono call karo. Clear button: setSearchTerm('') — input automatically clear ho jaata hai kyunki value state se driven hai. Programmatic set bhi — URL se search query uthao, setSearchTerm(urlParam) — input pre-filled. Ye controlled input ki flexibility hai."
          commonMistakes={[
            {
              mistake: 'value prop dena without onChange',
              why: 'Read-only input ban jaata hai — user type nahi kar sakta. React warning bhi deta hai.',
              fix: 'value ke saath hamesha onChange chahiye. Ya defaultValue use karo (uncontrolled) if you don\'t need to control it.',
            },
            {
              mistake: 'Checkbox ke liye value use karna checked ki jagah',
              why: 'Checkbox ka "value" submission mein use hota hai, display nahi. checked property se checked state control hoti hai.',
              fix: 'Checkbox ke liye: checked={isChecked} onChange={e => setIsChecked(e.target.checked)}',
            },
          ]}
          proTip="Checkbox ke liye value prop use karna — ye bahut common mistake hai. Checkbox ka value attribute HTML submission ke liye hai, React display ke liye nahi. React mein checkbox ke liye hamesha checked prop use karo: checked={isChecked} aur onChange mein e.target.checked. Ye value nahi, checked hai — input type se dependent hai."
        />
      </div>

      <div id="form-handling">
        <ConceptCard
          title="Form Handling — Submit aur Data Collection"
          emoji="📋"
          difficulty="beginner"
          whatIsIt="Complete form workflow — onSubmit handler, e.preventDefault() (page reload rokna), client-side validation, loading state set karna, API call karna, success/error handle karna. try/catch/finally pattern zaroori hai — finally mein loading reset karo, success ho ya error. Form clear karo sirf success pe — error pe user ka data preserve karo taaki wo retry kar sake."
          whenToUse={[
            'Login, signup, registration forms',
            'User profile update forms',
            'Search forms with filters',
            'Multi-step forms — wizard patterns',
          ]}
          whyUseIt="Form handling mein sabse important hai UX — user ko hamesha pata hona chahiye kya ho raha hai. Loading state: button disabled karo taaki double submit na ho, text change karo 'Logging in...' — user jaane request gayi. Error state: specific message dikhao, form data preserve karo. Success state: clear karo form, redirect karo ya success message dikhao. Ye sab states explicitly manage karna production-quality form hai."
          howToUse={{
            filename: 'FormHandling.tsx',
            language: 'tsx',
            code: `import { useState, FormEvent } from 'react'

interface LoginForm {
  email: string
  password: string
}

function LoginForm() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Single handler for all fields
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError(null)  // Error clear karo jab user type kare
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()  // Page reload rokna!

    // Client-side validation
    if (!form.email.includes('@')) {
      setError('Valid email daalo')
      return
    }
    if (form.password.length < 6) {
      setError('Password kam se kam 6 characters ka hona chahiye')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Login failed')
      }

      setSuccess(true)
      setForm({ email: '', password: '' })  // Form clear
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return <div>Login successful! Redirecting...</div>
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"        // name matches state key!
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"     // name matches state key!
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          autoComplete="current-password"
        />
      </div>

      {error && (
        <div role="alert" style={{ color: 'red' }}>
          {error}
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}`,
            explanation: 'e.preventDefault() — form submit handler ki pehli line. Single handleChange — name attribute se field identify karo, [name]: value computed property se update karo. try/catch/finally — finally mein setLoading(false) hamesha. noValidate — browser ki native validation off karo, React validation use karo. Form clear sirf success pe, error pe nahi.',
          }}
          realWorldScenario="Login form ka full flow — email/password input karo, submit karo, loading show karo, server response aaye: success pe localStorage mein token store karo aur redirect karo, error pe specific message dikhao (wrong password vs account not found — alag messages). User frustration kam karo — error pe form data preserve karo taaki wo sirf password correct kare, email dobara type na kare."
          commonMistakes={[
            {
              mistake: 'Loading state reset karna finally mein forget karna',
              why: 'Error hone pe loading stuck — button disabled, user frustrated.',
              fix: 'finally { setLoading(false) } — hamesha reset, success ya error dono mein.',
            },
            {
              mistake: 'Form clear karna after error',
              why: 'User ka data clear ho jaata hai error pe — frustrating.',
              fix: 'Form clear karo sirf success pe. Error pe form data maintain karo — user retry kar sake.',
            },
          ]}
          proTip="Finally mein setLoading(false) forget karna — ye sabse common form bug hai. Error throw hota hai, catch mein handle karte hain, lekin finally nahi likha — loading spinner forever stuck. User frustrated, button disabled, app broken laage. Hamesha try/catch/finally — finally guaranteed run karta hai, success ho ya error. Ye professional habit banao."
        />
      </div>

      <div id="multiple-inputs">
        <ConceptCard
          title="Multiple Inputs — Single Handler Pattern"
          emoji="🎹"
          difficulty="beginner"
          whatIsIt="Real-world forms mein 10-20 fields hoti hain. Har field ke liye alag handleFirstName, handleLastName, handleEmail — ye DRY (Don't Repeat Yourself) principle todbta hai. Smart pattern: ek handleChange function, name attribute se field identify karo, computed property [name] se state update karo. Naya field add karna hua — state mein add karo, input mein name attribute set karo. Done. No extra code."
          whenToUse={[
            'Registration forms — naam, email, phone, address sab',
            'Profile edit forms',
            'Settings pages — multiple preferences',
            'Product creation forms — title, description, price, category',
          ]}
          whyUseIt="[name]: value — computed property syntax. name = 'email' ho toh ye { email: value } ban jaata hai. name = 'firstName' ho toh { firstName: value }. Ek handler, koi bhi field. DRY principle follow hota hai, code maintainable rehta hai. TypeScript mein name attribute ko keyof FormType type karo — type-safe single handler banana possible hai."
          howToUse={{
            filename: 'MultipleInputs.tsx',
            language: 'tsx',
            code: `import { useState, ChangeEvent } from 'react'

interface RegistrationForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  role: string
  newsletter: boolean
}

function RegistrationForm() {
  const [form, setForm] = useState<RegistrationForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    role: 'user',
    newsletter: false,
  })

  // Single handler — name attribute se field, type se value logic
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    // Checkbox ke liye checked, rest ke liye value
    const checked = (e.target as HTMLInputElement).checked
    const newValue = type === 'checkbox' ? checked : value

    setForm(prev => ({ ...prev, [name]: newValue }))
  }

  // Submit mein form object ready hai
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await registerUser(form)
  }

  const inputClass = "w-full px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-[#F5F5F7]"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* All using same handleChange! */}
        <div>
          <label>First Name</label>
          <input
            name="firstName"   {/* Key field! Must match state key */}
            value={form.firstName}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label>Role</label>
        <select name="role" value={form.role} onChange={handleChange} className={inputClass}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="newsletter"
          checked={form.newsletter}
          onChange={handleChange}
        />
        Newsletter subscribe karo
      </label>

      <button type="submit">Register</button>
    </form>
  )
}

// Reusable — extracted as component
function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}`,
            explanation: 'Critical rule — name attribute exactly state object ki key honi chahiye. name="firstName" lekin state mein first_name — [name]: value wrong field update karega, bug. TypeScript mein ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> — teeno input types ek handler se. FormField reusable component form code aur bhi DRY banata hai.',
          }}
          realWorldScenario="Startup ke product creation form — title, description, price, category, tags, stock, weight, sku, barcode, images... 15 fields. Har ke liye alag handler likhna — 15 functions. Ek handleChange pattern se — sab 15 fields same function se, scalable. Naya field requirement aa gayi — state mein ek line, input mein name attribute — done in 2 minutes."
          commonMistakes={[
            {
              mistake: 'name attribute state key se mismatch',
              why: 'name="firstName" lekin state mein first_name — computed property wrong field update karega.',
              fix: 'name attribute exactly state object ki key honi chahiye. TypeScript mein: name={keyof FormState} — type-safe.',
            },
            {
              mistake: 'Number inputs ke saath string type',
              why: 'Input value hamesha string hoti hai — number field mein string milegi.',
              fix: 'Number fields ke liye: const newValue = type === "number" ? Number(value) : value. Ya onChange mein parse karo.',
            },
          ]}
          proTip="Number inputs ke saath string type problem — input ki value hamesha string hoti hai. number field mein e.target.value = '42' string hai. Number chahiye toh: type === 'number' ? Number(value) : value. Ya parseFloat/parseInt. TypeScript bhi catch karega agar form state mein number type define ki hai — runtime se pehle."
        />
      </div>

      <div id="form-validation">
        <ConceptCard
          title="Form Validation — Error Messages Show Karo"
          emoji="✅"
          difficulty="beginner"
          whatIsIt="Validation ka goal — user ko fast, clear feedback dena. Lekin kab validate karo? Har onChange pe? User email type kar raha hai, pehle character pe 'invalid email' error — bad UX. Har submit pe? User poora form bhar ke submit kare tab pata chale 5 fields wrong — frustrating. Best approach: onBlur pe validate (field se focus hata toh), real-time sirf already-touched fields pe, aur submit pe sab. touched state se premature errors avoid karo."
          whenToUse={[
            'Required field check — empty submit prevent',
            'Format validation — email, phone, URL',
            'Strength validation — password requirements',
            'Cross-field validation — password match, date range',
          ]}
          whyUseIt="Client-side validation user experience ke liye hai — fast feedback bina server round-trip. Lekin ye security nahi hai — JavaScript disable karo ya network tab se request modify karo, client validation bypass. Server pe bhi validate karo hamesha. Client validation = UX layer, Server validation = security layer. Dono zaroori hain — ek doosre ko replace nahi karte."
          howToUse={{
            filename: 'FormValidation.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

interface FormData {
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
}

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!form.email) {
    errors.email = 'Email required hai'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Valid email format daalo'
  }

  if (!form.password) {
    errors.password = 'Password required hai'
  } else if (form.password.length < 8) {
    errors.password = 'Password kam se kam 8 characters ka hona chahiye'
  } else if (!/(?=.*[A-Z])/.test(form.password)) {
    errors.password = 'Ek capital letter hona chahiye'
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords match nahi kar rahe'
  }

  return errors
}

function SignupForm() {
  const [form, setForm] = useState<FormData>({ email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)

    // Real-time validation sirf touched fields ke liye
    if (touched[name]) {
      const newErrors = validate(newForm)
      setErrors(prev => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }))
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))

    // Validate on blur
    const newErrors = validate(form)
    setErrors(prev => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // All fields touched
    setTouched({ email: true, password: true, confirmPassword: true })

    const newErrors = validate(form)
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Submit karo!
      console.log('Form valid, submitting:', form)
    }
  }

  const isValid = Object.keys(validate(form)).length === 0

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby={errors.email ? 'email-error' : undefined}
          style={{ borderColor: errors.email && touched.email ? 'red' : undefined }}
        />
        {errors.email && touched.email && (
          <p id="email-error" role="alert" style={{ color: 'red', fontSize: '12px' }}>
            {errors.email}
          </p>
        )}
      </div>

      <button type="submit" disabled={!isValid && Object.keys(touched).length > 0}>
        Sign Up
      </button>
    </form>
  )
}`,
            explanation: 'validate() pure function banao — input form data, output errors object. Testing aasan hoti hai pure functions ki. touched state: pehle field visit hone pe mark karo — error sirf tab dikhao. onChange pe sirf touched fields validate — real-time feedback bina premature errors. Submit pe sab touched mark karo aur validate. aria-describedby accessibility ke liye — screen reader error message padhta hai.',
          }}
          realWorldScenario="Signup form password field — strength meter dikhao: 8+ characters green, uppercase letter green, number green, special character green. Real-time feedback as user types — visual requirements checklist. User exactly jaanta hai kya chahiye, submit se pehle. Ye UX professionally implement karna validation ka art hai."
          commonMistakes={[
            {
              mistake: 'Har field change pe sab validate karna',
              why: 'User email type karna shuru kare — password error turant dikhaye. Bad UX.',
              fix: 'touched state use karo — sirf visited/blurred fields pe errors dikhao. Submit pe sab.',
            },
            {
              mistake: 'Client-side validation se satisfy hona',
              why: 'Browser mein JavaScript disable karo ya network tab se request modify karo — validation bypass.',
              fix: 'Server pe bhi validate karo hamesha. Client validation sirf UX improvement hai — not security.',
            },
          ]}
          proTip="Production apps mein react-hook-form + Zod combination best practice hai. Zod se schema define karo: z.object({ email: z.string().email(), password: z.string().min(8) }). Yahi schema frontend validation ke liye aur backend TypeScript types ke liye use karo — single source of validation truth. react-hook-form internally uncontrolled use karta hai — fewer re-renders, better performance. Manual validation se bahut better."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 5 Quiz — Events & Forms
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — React forms master karo!
          </p>
        </div>
        <QuizSection questions={eventsQuiz} chapterSlug="events-forms" />
      </div>
    </div>
  )
}
