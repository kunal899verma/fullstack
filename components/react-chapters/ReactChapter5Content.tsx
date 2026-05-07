'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

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
          Events React apps ko interactive banate hain — user click kare, type kare, form submit kare. React synthetic events browser differences abstract karte hain. Forms controlled inputs se clean, validated, manageable ho jaate hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Is chapter mein hum React event system, controlled inputs, form handling, multiple inputs, aur validation cover karenge — real-world patterns ke saath.
        </p>
      </div>

      <div id="react-events">
        <ConceptCard
          title="React Event System — Synthetic Events"
          emoji="⚡"
          difficulty="beginner"
          whatIsIt="React synthetic events native browser events wrap karte hain — consistent cross-browser behavior. onClick, onChange, onSubmit, onKeyDown, onFocus — sab camelCase. Event handlers function references receive karte hain. React event delegation use karta hai — root pe listener, niche se bubble."
          whenToUse={[
            'Button clicks, link clicks — onClick',
            'Input changes — onChange',
            'Form submission — onSubmit',
            'Keyboard events — onKeyDown, onKeyUp, onKeyPress',
          ]}
          whyUseIt="Synthetic events cross-browser inconsistencies handle karte hain automatically. React 17+ mein events document pe nahi, root element pe delegate hote hain — better iframe compatibility. camelCase naming consistent aur predictable hai. TypeScript types fully supported hain."
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
            explanation: 'Event handlers camelCase mein — onClick, onChange. Function reference pass karo — onClick={fn} not onClick={fn()}. Arguments pass karne ke liye arrow function ya bind use karo. TypeScript types import karo React se — MouseEvent, ChangeEvent, etc. e.target vs e.currentTarget — target actual element, currentTarget listener wala.',
          }}
          realWorldScenario="Dropdown menu: button click pe menu toggle. Document click pe menu close. e.stopPropagation() button click mein — warna document listener immediately close kar deta hai. Event delegation se menu items handle karo — individual listeners nahi."
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
          proTip="useCallback ke saath event handlers — sirf jab child component memo mein ho aur performance concern ho. Otherwise arrow functions fine hain. React 17+ event system change: events root element pe delegate hote hain — custom root mein stopPropagation karo, document listener nahi pakdega."
        />
      </div>

      <div id="controlled-inputs">
        <ConceptCard
          title="Controlled Inputs — Single Source of Truth"
          emoji="🎛️"
          difficulty="beginner"
          whatIsIt="Controlled input: value React state se aata hai, onChange se state update hoti hai. Input ki value hamesha state se match karti hai — single source of truth. Uncontrolled: DOM apna state manage karta hai, ref se access. React controlled pattern prefer karta hai — predictable, easy to validate and transform."
          whenToUse={[
            'Form inputs jahan state pe depend karo — show/hide based on value',
            'Input validation — real-time feedback',
            'Input transformation — auto-capitalize, format phone',
            'Multiple inputs — single handler pattern',
          ]}
          whyUseIt="Controlled inputs se input value hamesha JavaScript mein available hai — validate karo, transform karo, dependent UI update karo. React state se render — predictable. Programmatic clear, set, populate easy. Server-side validation sync karo easily."
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
            explanation: 'Controlled: value={state} + onChange={setState}. Checkbox: checked property. Select: value on select element. Radio: checked={value === option}. Input transformation onChange mein — format before setting state. Uncontrolled (ref) — rare cases, DOM library integration.',
          }}
          realWorldScenario="Search input: value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); debouncedSearch(e.target.value); }}. Input value aur search both state driven — clear button: setSearchTerm('') — input bhi clear."
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
          proTip="React Hook Form ya Zod + react-hook-form combination production forms ke liye best hai — controlled lekin performance optimized (fewer re-renders). Uncontrolled internally, controlled API externally. Native HTML5 validation attributes bhi use karo: required, minLength, pattern — no JS needed for basic validation."
        />
      </div>

      <div id="form-handling">
        <ConceptCard
          title="Form Handling — Submit aur Data Collection"
          emoji="📋"
          difficulty="beginner"
          whatIsIt="Form handling mein: onSubmit handler, e.preventDefault(), state se data collect karna, API call karna, loading/error states manage karna. FormData API se bhi data collect ho sakti hai. React mein controlled pattern preferred hai — state mein form data hamesha available."
          whenToUse={[
            'Login, signup, registration forms',
            'User profile update forms',
            'Search forms with filters',
            'Multi-step forms — wizard patterns',
          ]}
          whyUseIt="Controlled form data JS mein always available — validate karo before submit. Loading state se UI feedback do user ko. Error state se server errors display karo. preventDefault se page reload rok. Async submit ke saath UX smooth rehti hai."
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
            explanation: 'e.preventDefault() hamesha pehli line. Single handleChange function — name attribute se field identify. Loading/error state — UX feedback. try/catch/finally — loading always reset. noValidate browser native validation disable karta hai — custom React validation use karo.',
          }}
          realWorldScenario="Onboarding form: step 1 personal info, step 2 preferences, step 3 review. Parent mein state: { step, personal: {}, preferences: {} }. Har step controlled inputs se update kare parent state. Final step — all data submit karo. Back button — state preserve."
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
          proTip="react-hook-form library controlled inputs se zyada performant hai — uncontrolled internally, controlled-like API. Sirf dirty fields re-render karta hai. Zod se schema validation integrate karo. Server actions (Next.js 14+) se form directly server pe submit karo — no API route needed."
        />
      </div>

      <div id="multiple-inputs">
        <ConceptCard
          title="Multiple Inputs — Single Handler Pattern"
          emoji="🎹"
          difficulty="beginner"
          whatIsIt="Multiple inputs ke liye ek handleChange function — name attribute se field identify, computed property se state update. ye pattern forms scalable banata hai — 20 fields bhi same handler se. Specific field handlers se better — DRY principle follow karta hai."
          whenToUse={[
            'Registration forms — naam, email, phone, address sab',
            'Profile edit forms',
            'Settings pages — multiple preferences',
            'Product creation forms — title, description, price, category',
          ]}
          whyUseIt="Ek handler sab kuch handle karta hai — code DRY rehta hai. Naya field add karo — state mein add karo, input mein name attribute set karo, done. No extra function needed. TypeScript ke saath type-safe bhi reh sakta hai."
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
            explanation: 'name attribute state key se match karna zaroori hai — [name]: value computed property use karta hai. Checkbox ke liye checked, rest ke liye value. TypeScript: union type ChangeEvent<HTMLInputElement | HTMLSelectElement> — sab supported. FormField reusable component DRY principle follow karta hai.',
          }}
          realWorldScenario="Admin dashboard mein product create form — 15 fields: title, description, price, category, tags, images, stock, weight, dimensions, etc. Single handleChange sab handle karta hai. Naya field add karo — state mein add, input mein name attribute — done. No extra code."
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
          proTip="Field component bana — FormField, CheckboxField, SelectField — reusable across forms. Form state TypeScript generic bana: function useForm<T extends object>(initial: T) — type-safe any form ke liye. Zod schema define karo — parse karo submit pe — full validation in one place."
        />
      </div>

      <div id="form-validation">
        <ConceptCard
          title="Form Validation — Error Messages Show Karo"
          emoji="✅"
          difficulty="beginner"
          whatIsIt="Form validation ensure karta hai user correct data de. Client-side validation: required fields, email format, password length, etc. Error messages field-level ya form-level. Validation trigger karo: onChange (real-time), onBlur (when field loses focus), ya onSubmit. Touched state se premature errors avoid karo."
          whenToUse={[
            'Required field check — empty submit prevent',
            'Format validation — email, phone, URL',
            'Strength validation — password requirements',
            'Cross-field validation — password match, date range',
          ]}
          whyUseIt="Client-side validation fast feedback deta hai — server round-trip se pehle. UX better hoti hai — user jaldi pata chalta hai kya galat hai. Server validation bhi zaroori hai — client validation bypass ho sakti hai. Both layers of validation best practice."
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
            explanation: 'validate() pure function — form state le, errors object return karo. touched state — premature errors avoid karo (sirf visited fields). onBlur pe touch mark karo. onChange pe real-time validate sirf touched fields. Submit pe sab validate. aria-describedby accessibility ke liye.',
          }}
          realWorldScenario="Password strength meter: validate karo length, uppercase, lowercase, number, special char — sab alag messages. Real-time feedback as user types — green checkmarks requirements ko. Submit pe sab requirements check."
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
          proTip="Zod schema se validation: const schema = z.object({ email: z.string().email(), password: z.string().min(8) }). safeParse(form) se errors milte hain — type-safe. Yahi schema frontend aur backend pe share karo — types aur validation ek jagah. react-hook-form + Zod = production-grade form handling."
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
