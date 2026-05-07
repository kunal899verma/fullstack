'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

const errorQuiz: QuizQuestion[] = [
  {
    question: 'TypeError aur ReferenceError mein kya fark hai?',
    options: [
      { text: 'Dono same hain', correct: false, explanation: 'Nahi, dono alag situations mein aate hain.' },
      { text: 'TypeError: wrong type pe operation; ReferenceError: variable exist nahi karta', correct: true, explanation: 'Sahi! null.name — TypeError. undeclaredVar use karna — ReferenceError.' },
      { text: 'ReferenceError sirf Node.js mein aata hai', correct: false, explanation: 'ReferenceError browser aur Node.js dono mein aata hai.' },
      { text: 'TypeError syntax mistake se aata hai', correct: false, explanation: 'Syntax mistakes SyntaxError cause karti hain, TypeError nahi.' },
    ],
  },
  {
    question: 'finally block kab run hota hai?',
    options: [
      { text: 'Sirf jab error aaye', correct: false, explanation: 'finally sirf error pe nahi — hamesha run hota hai.' },
      { text: 'Hamesha — chahe try succeed kare ya catch trigger ho', correct: true, explanation: 'Bilkul! finally cleanup ke liye perfect hai — connection close karna, loader hide karna.' },
      { text: 'Sirf jab try successful ho', correct: false, explanation: 'Agar sirf success pe kuch karna hai toh try block mein karo — finally ke liye nahi.' },
      { text: 'finally optional hai aur kabhi nahi use karna chahiye', correct: false, explanation: 'finally bahut useful hai resource cleanup ke liye.' },
    ],
  },
  {
    question: 'Custom Error class kab banana chahiye?',
    options: [
      { text: 'Kabhi nahi — built-in Error kaafi hai', correct: false, explanation: 'Custom errors specific error types ke liye bahut useful hain.' },
      { text: 'Jab specific error types programmatically handle karne ho (instanceof check)', correct: true, explanation: 'Sahi! ValidationError, NetworkError — instanceof se type check karo aur alag handle karo.' },
      { text: 'Sirf Node.js backend mein', correct: false, explanation: 'Custom errors frontend aur backend dono mein useful hain.' },
      { text: 'Sirf async functions mein', correct: false, explanation: 'Custom errors sync aur async dono mein kaam aate hain.' },
    ],
  },
  {
    question: 'Async/await ke saath errors handle karne ka sahi tarika kya hai?',
    options: [
      { text: '.catch() use karo — async/await mein try/catch nahi hoti', correct: false, explanation: 'async/await ke saath try/catch bilkul kaam karti hai — aur clean bhi lagti hai.' },
      { text: 'try { await fn() } catch (err) { handle(err) } ya wrapper function se', correct: true, explanation: 'Bilkul! try/catch async functions mein bhi kaam karta hai — ye preferred pattern hai.' },
      { text: 'Errors ignore kar do — crash ho toh ho', correct: false, explanation: 'Unhandled errors production mein serious problems cause karte hain.' },
      { text: 'process.on("uncaughtException") pe rely karo', correct: false, explanation: 'uncaughtException last resort hai, primary error handling nahi.' },
    ],
  },
  {
    question: 'Error swallowing kyun bad practice hai?',
    options: [
      { text: 'Performance slow hoti hai', correct: false, explanation: 'Error swallowing performance se related nahi — correctness se related hai.' },
      { text: 'try { risky() } catch {} — errors silently ignore hoti hain, debugging impossible ho jaati hai', correct: true, explanation: 'Sahi! Empty catch block se errors disappear ho jaate hain — user ko kuch pata nahi, developer ko kuch pata nahi. Silent failures.' },
      { text: 'try/catch slow hai', correct: false, explanation: 'try/catch performance ka issue nahi hai modern JS engines mein.' },
      { text: 'Sirf TypeScript mein problem hai', correct: false, explanation: 'Error swallowing JavaScript aur TypeScript dono mein problematic hai.' },
    ],
  },
]

export default function JSChapter13Content() {
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
          Error Handling — Production Code Ka Farz
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Junior developer aur senior developer mein ek bada fark hai — error handling. Junior developer happy path likhta hai — sab kuch theek chale tab. Senior developer edge cases ke baare mein sochta hai — API fail ho, user galat data de, network drop ho — tab kya hoga? Robust error handling ka matlab crash nahi — graceful degradation.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Sawaal: empty catch block likhna kyun dangerous hai? Jawab: error silently disappear ho jaata hai — user ko pata nahi kuch hua, developer ko pata nahi bug kahan hai, logs mein kuch nahi. Ye 'error swallowing' hai — production ka worst practice. Is chapter mein error types, try/catch/finally, custom errors, async error handling — sab production-grade patterns ke saath dekhenge.
        </p>
      </div>

      <div id="error-types">
        <ConceptCard
          title="JavaScript Error Types"
          emoji="🚨"
          difficulty="intermediate"
          whatIsIt="JavaScript ke built-in error types jaante ho? Har ek alag situation ke liye alag error — ye design bahut smart hai. SyntaxError: code parse time pe galat syntax — JavaScript run bhi nahi hoti. TypeError: galat type pe operation karo — null.name ek legendary TypeError hai jo har developer ne face kiya hai! ReferenceError: undeclared variable access — let/const TDZ bhi ReferenceError deta hai. RangeError: value acceptable range se bahar — infinite recursion ka bhi RangeError aata hai (Maximum call stack exceeded). Sawaal: ye types practically kahan kaam aate hain? Jawab: catch block mein instanceof check se specific errors differently handle karo — TypeError ke liye defensive code, RangeError ke liye algorithm fix. Debugging mein error.stack pata hai kahan exact problem hai."
          whenToUse={[
            'Error type identify karne ke liye — debugging mein',
            'instanceof check se specific errors handle karne ke liye',
            'Custom errors banana jab built-in types kaafi na ho',
            'Error messages from logs samajhne ke liye',
          ]}
          whyUseIt="Error types samajhne se debugging fast hoti hai — stack trace aur error name se seedha problem ka pata chalta hai. instanceof check se different error types differently handle kar sakte ho — network error pe retry, validation error pe user message, unexpected error pe log."
          howToUse={{
            filename: 'error-types.js',
            language: 'javascript',
            code: `// SyntaxError — parse time pe aata hai (code run nahi hoti)
// eval('let x = ;')  // SyntaxError: Unexpected token

// TypeError — wrong type pe operation
null.toString()        // TypeError: Cannot read property 'toString' of null
undefined.name         // TypeError: Cannot read properties of undefined
42()                   // TypeError: 42 is not a function
[1,2].hello            // undefined (no error) — but [1,2].hello() — TypeError

// ReferenceError — variable exist nahi karta
console.log(myVar)     // ReferenceError: myVar is not defined
// Note: let/const TDZ mein access — ReferenceError
{
  // console.log(x)    // ReferenceError: Cannot access 'x' before initialization
  let x = 5
}

// RangeError — value acceptable range se bahar
new Array(-1)          // RangeError: Invalid array length
(1.5).toFixed(200)     // RangeError: toFixed() digits argument must be between 0 and 100
function recurse() { return recurse() }
// recurse()           // RangeError: Maximum call stack size exceeded

// Error object properties
try {
  null.name
} catch (err) {
  console.log(err.name)      // 'TypeError'
  console.log(err.message)   // 'Cannot read properties of null'
  console.log(err.stack)     // Full stack trace — file aur line numbers
}

// instanceof check
try {
  riskyOperation()
} catch (err) {
  if (err instanceof TypeError) {
    console.log('Type problem:', err.message)
  } else if (err instanceof RangeError) {
    console.log('Range problem:', err.message)
  } else {
    throw err  // Unknown error — propagate karo!
  }
}`,
            explanation: 'SyntaxError parse time pe, TypeError/ReferenceError runtime pe. err.stack bahut valuable hai debugging ke liye — file name aur line number dikhata hai. instanceof check se specific errors handle karo — baaki re-throw karo upstream ke liye.',
          }}
          realWorldScenario="Production logging mein error type important hai: TypeError mostly undefined access hai — defensive checks add karo. RangeError recursion ya large array creation se — algorithm check karo. ReferenceError typo ya missing import — code review."
          commonMistakes={[
            {
              mistake: 'err.message instead of err.stack log karna',
              why: 'message sirf problem describe karta hai — stack trace bata hai kahan aur kyun hua.',
              fix: 'Production logging mein hamesha err.stack log karo (ya full error object). Sentry, Datadog automatically stack capture karte hain.',
            },
            {
              mistake: 'TypeError aur ReferenceError confuse karna',
              why: 'TypeError wrong type pe operation hai; ReferenceError undeclared variable hai. Different fixes.',
              fix: 'TypeError ke liye type check ya optional chaining. ReferenceError ke liye variable declare karo ya import check karo.',
            },
          ]}
          proTip="error.cause property ES2022 mein aaya — error chaining ke liye: throw new Error('Failed to load config', { cause: originalError }). Logging mein cause bhi log karo — root cause debugging much easier."
        />
      </div>

      <div id="try-catch-finally">
        <ConceptCard
          title="try / catch / finally — Flow Control"
          emoji="🔄"
          difficulty="intermediate"
          whatIsIt="try/catch/finally — error handling ka core mechanism. Lekin ek important distinction: try/catch sirf runtime errors pakadta hai — SyntaxError parse time pe hota hai, ye nahi pakdega. Ek aur gotcha: finally mein return likhna — ye try ka return OVERRIDE karta hai! function f() { try { return 'try' } finally { return 'finally' } } — 'finally' return hoga. Ye surprising behavior hai — finally mein return likhna avoid karo. Finally ka kaam cleanup hai — DB connections close karo, loader hide karo — chahe error aaye ya success. Ye hamesha run hoga — ek promise hai finally ka."
          whenToUse={[
            'API calls, file reads — failures possible hain',
            'User input parse karna — JSON.parse fail ho sakta hai',
            'Resource cleanup chahiye — DB connections, timers',
            'Controlled error handling — crash se bachna',
          ]}
          whyUseIt="try/catch se errors gracefully handle hoti hain — user friendly messages, retry logic, cleanup. finally ensure karta hai resources release ho — loader hide karo, DB connection close karo, chahe error aaye ya naa aaye. Re-throw se errors upstream propagate hoti hain."
          howToUse={{
            filename: 'try-catch.js',
            language: 'javascript',
            code: `// Basic try/catch/finally
function parseUserData(jsonString) {
  try {
    const data = JSON.parse(jsonString)  // Throw kar sakta hai
    return { success: true, data }
  } catch (err) {
    // err.name === 'SyntaxError' for invalid JSON
    console.error('Parse failed:', err.message)
    return { success: false, error: 'Invalid JSON format' }
  } finally {
    // Hamesha run hoga — success ya error
    console.log('parseUserData completed')
    // cleanupResources() — DB connections, timers, etc.
  }
}

// finally return — tricky behavior!
function tricky() {
  try {
    return 'from try'
  } finally {
    return 'from finally'   // This overrides try's return!
  }
}
tricky()  // 'from finally' — unexpected! Avoid returning in finally.

// Multiple catch scenarios
async function loadUserData(id) {
  let connection = null
  try {
    connection = await db.connect()
    const user = await connection.query('SELECT * FROM users WHERE id = ?', [id])
    if (!user) throw new Error('User not found')
    return user
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      throw new Error('Database unavailable', { cause: err })
    }
    if (err.message === 'User not found') {
      return null  // Expected case — handle gracefully
    }
    throw err  // Unexpected — propagate upstream
  } finally {
    await connection?.close()  // Hamesha cleanup!
  }
}

// Error types check karna
try {
  await processPayment(amount)
} catch (err) {
  if (err instanceof ValidationError) {
    showUserMessage(err.message)         // User ko batao
  } else if (err instanceof NetworkError) {
    scheduleRetry()                      // Retry karo
  } else {
    logToSentry(err)                     // Unknown — log karo
    showGenericError()
  }
}`,
            explanation: 'try mein risky code, catch mein specific handling, finally mein guaranteed cleanup. finally mein return mat karo — try ka return override ho jaata hai. Unexpected errors re-throw karo — upstream decide kare kya karna hai. Error cause chaining se root cause preserve hoti hai.',
          }}
          realWorldScenario="Payment processing mein: try { await charge(amount) } catch { if network error — retry, if validation error — user ko batao, if auth error — re-login karo } finally { hideLoader() }. Har error case differently handled, loader hamesha hide hota hai."
          commonMistakes={[
            {
              mistake: 'Har error ko same tarah handle karna',
              why: 'Network error ko validation error jaisa treat karna — wrong user message ya missing retry logic.',
              fix: 'Error types check karo — instanceof ya err.code — aur accordingly handle karo.',
            },
            {
              mistake: 'Empty catch block — error swallowing',
              why: 'try { risky() } catch {} — error silently disappear. Bug dhundna impossible.',
              fix: 'Catch mein minimum log karo: catch (err) { console.error(err); }. Ya proper handling.',
            },
          ]}
          proTip="try/catch sirf exceptions pakadta hai, rejections nahi — async functions mein await use karo taki rejections exceptions ban jaayein. Bina await ke: somePromise.catch(err => ...). Await ke saath: try { await somePromise } catch (err) { ... } — cleaner."
        />
      </div>

      <div id="custom-errors">
        <ConceptCard
          title="Custom Error Classes — Professional Error Handling"
          emoji="🏗️"
          difficulty="intermediate"
          whatIsIt="Custom Error classes — professional JavaScript ka pehchaan. Sirf Error throw karna beginner approach hai. Production mein: ValidationError, NetworkError, AuthError — har type ka alag behavior. Kyun zaroori hai? Kyunki catch block mein if (err instanceof ValidationError) likhoge toh ek hi catch mein multiple error types differently handle ho jaayenge. Extra properties add karo — statusCode Express route mein HTTP code set karne ke liye, field validation mein kaunsa field galat tha batane ke liye. Ye pattern Express API development mein standard hai. Sawaal: this.name = this.constructor.name kyun likhte hain? Jawab: warna err.name 'Error' dikhega ValidationError nahi — logs mein confusing."
          whenToUse={[
            'Different error types ko different tarike se handle karna ho',
            'Extra context store karna ho error mein — field name, status code',
            'Error type based routing — catch mein instanceof check',
            'API errors standardize karne ho — consistent format',
          ]}
          whyUseIt="Custom errors code much more expressive banate hain. catch block mein if (err instanceof NetworkError) clearly intent dikhata hai. Extra properties (statusCode, field) se error handling precise hoti hai — user ko exact message, developer ko exact context. Library code mein especially important."
          howToUse={{
            filename: 'custom-errors.js',
            language: 'javascript',
            code: `// Base custom error
class AppError extends Error {
  constructor(message, options = {}) {
    super(message)
    this.name = this.constructor.name  // Automatically 'AppError'
    this.timestamp = new Date().toISOString()

    // Error cause — ES2022
    if (options.cause) this.cause = options.cause

    // Stack trace fix (V8 optimization)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

// Specific error types
class ValidationError extends AppError {
  constructor(message, field) {
    super(message)
    this.field = field
    this.statusCode = 400
  }
}

class NetworkError extends AppError {
  constructor(message, { statusCode = 503, retryAfter = 60 } = {}) {
    super(message)
    this.statusCode = statusCode
    this.retryAfter = retryAfter
    this.isRetryable = statusCode >= 500
  }
}

class AuthError extends AppError {
  constructor(message = 'Authentication required') {
    super(message)
    this.statusCode = 401
    this.redirectTo = '/login'
  }
}

// Usage
function validateUser(data) {
  if (!data.email?.includes('@')) {
    throw new ValidationError('Invalid email format', 'email')
  }
  if (!data.password || data.password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters', 'password')
  }
}

async function fetchUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`)
    if (res.status === 401) throw new AuthError()
    if (!res.ok) throw new NetworkError('API request failed', { statusCode: res.status })
    return await res.json()
  } catch (err) {
    if (err instanceof AppError) throw err  // Re-throw our errors
    throw new NetworkError('Network unavailable', { cause: err })
  }
}

// Catch mein handle karo
async function handleUserLoad(id) {
  try {
    return await fetchUser(id)
  } catch (err) {
    if (err instanceof ValidationError) {
      return { error: err.message, field: err.field }
    }
    if (err instanceof AuthError) {
      window.location.href = err.redirectTo
      return null
    }
    if (err instanceof NetworkError && err.isRetryable) {
      return scheduleRetry(id, err.retryAfter)
    }
    throw err  // Unknown — upstream
  }
}`,
            explanation: 'this.name = this.constructor.name — subclass ka naam auto-set hota hai. captureStackTrace V8 optimization hai — stack trace mein custom error constructor nahi dikhega, sirf actual code. instanceof check se type-safe error routing. statusCode aur field se HTTP responses aur UI messages easy.',
          }}
          realWorldScenario="Express.js middleware mein: if (err instanceof ValidationError) return res.status(400).json({ error: err.message, field: err.field }). if (err instanceof AuthError) return res.redirect(err.redirectTo). if (err instanceof NetworkError) return res.status(err.statusCode).json({ error: err.message })."
          commonMistakes={[
            {
              mistake: 'super(message) call karna bhoolna',
              why: 'Error ka message property set nahi hoga — err.message undefined.',
              fix: 'Custom error constructor mein pehli line super(message) honi chahiye.',
            },
            {
              mistake: 'this.name set karna bhoolna',
              why: 'err.name hamesha "Error" dikhega — custom type identify nahi hoga logs mein.',
              fix: 'this.name = this.constructor.name — subclass ka naam auto-set karta hai.',
            },
          ]}
          proTip="Error hierarchy banana — base AppError se specific errors extend karo. Catch mein pehle specific errors check karo (ValidationError), phir broad ones (AppError), phir generic (Error). instanceof hierarchy follow karta hai — ValidationError instanceof AppError bhi true hoga."
        />
      </div>

      <div id="async-errors">
        <ConceptCard
          title="Async Error Handling — Promises aur Async/Await"
          emoji="⚡"
          difficulty="intermediate"
          whatIsIt="Async errors — ye synchronous errors se alag hain. Promise rejection unhandled reh sakti hai — Node.js 15+ mein process crash ho jaata hai! async/await ke saath try/catch cleanly kaam karta hai — rejection automatically exception ban jaati hai. Ek common misunderstanding: try/catch async function mein kaam karta hai agar await use karo. Bina await ke: const p = fetch(url); usse try/catch directly nahi pakad sakta (Promise create hoti hai, throw nahi hota). Await ke saath: try { const data = await fetch(url) } — rejection exception ban jaati hai, catch pakad leta hai. Ye difference critical hai async debugging mein."
          whenToUse={[
            'API calls mein errors handle karne ko — async/await + try/catch',
            'Multiple parallel requests — Promise.allSettled()',
            'Global unhandled rejections catch karne ko — process.on',
            'Promise chains mein — .catch() at end',
          ]}
          whyUseIt="Async errors ignore karna production mein silent failures cause karta hai — user kuch nahi dekh pata, data corrupt ho sakta hai. try/catch async functions mein kaam karta hai. Promise.allSettled() ensures sab results milein — kuch fail hone se baaki na rukein. Global handler last resort hai."
          howToUse={{
            filename: 'async-errors.js',
            language: 'javascript',
            code: `// ── ASYNC/AWAIT + TRY/CATCH ─────────────────────────────────────

// Clean pattern
async function fetchUserData(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`)
    if (!response.ok) {
      throw new NetworkError(\`HTTP \${response.status}\`, { statusCode: response.status })
    }
    const data = await response.json()
    return { data, error: null }
  } catch (err) {
    console.error('fetchUserData failed:', err)
    return { data: null, error: err.message }
  }
}

// Error propagation — let it bubble up
async function processOrder(orderId) {
  // No try/catch here — let caller handle it
  const order = await fetchOrder(orderId)     // Can throw
  const payment = await processPayment(order) // Can throw
  return await shipOrder(payment)             // Can throw
}

// Caller handles:
try {
  await processOrder(123)
} catch (err) {
  handleOrderError(err)
}

// ── PROMISE.ALLSETTLED ───────────────────────────────────────────
// Jab kuch fail ho sakti hain — sab results chahiye
async function loadDashboard(userId) {
  const [usersResult, postsResult, analyticsResult] = await Promise.allSettled([
    fetchUsers(),
    fetchPosts(userId),
    fetchAnalytics(userId),  // Ye fail ho sakti hai
  ])

  return {
    users: usersResult.status === 'fulfilled' ? usersResult.value : [],
    posts: postsResult.status === 'fulfilled' ? postsResult.value : [],
    analytics: analyticsResult.status === 'fulfilled' ? analyticsResult.value : null,
    errors: [usersResult, postsResult, analyticsResult]
      .filter(r => r.status === 'rejected')
      .map(r => r.reason.message),
  }
}

// ── GLOBAL ERROR HANDLERS ────────────────────────────────────────

// Browser
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  event.preventDefault()  // Default handling rok do
  // Log to error service: Sentry.captureException(event.reason)
})

window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error)
})

// Node.js
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  // Graceful shutdown
  process.exit(1)
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
  process.exit(1)  // MUST exit — state corrupted ho sakti hai
})

// ── WRAPPER PATTERN — DRY error handling ─────────────────────────
// Every async function mein try/catch avoid karo
async function tryCatch(asyncFn) {
  try {
    const result = await asyncFn()
    return [result, null]
  } catch (err) {
    return [null, err]
  }
}

// Usage — Go-style error handling in JS
const [user, err] = await tryCatch(() => fetchUser(id))
if (err) {
  handleError(err)
  return
}
processUser(user)`,
            explanation: 'async functions mein Promise rejections automatically caught hoti hain by try/catch. Promise.allSettled parallel requests mein partial failures handle karta hai. Global handlers last resort hain — proper error handling at call site prefer karo. tryCatch wrapper DRY pattern hai.',
          }}
          realWorldScenario="Dashboard loading mein 5 parallel API calls — kuch fail ho sakti hain: Promise.allSettled use karo. Jo data aaya woh show karo, jo nahi aaya uski jagah fallback UI. User ko partial dashboard dikhana better hai blank page se."
          commonMistakes={[
            {
              mistake: 'Async function mein error handle karna aur return nahi karna',
              why: 'catch mein console.log karo aur return forget karo — function continues to run with undefined data.',
              fix: 'Catch block mein return karo ya error re-throw karo: catch (err) { return null; } ya catch (err) { throw err; }',
            },
            {
              mistake: 'Promise.all() jab kuch fail ho sakti hain',
              why: 'Promise.all() ek bhi reject hone par fail — baaki results bhi nahi milte.',
              fix: 'Partial failures acceptable hain toh Promise.allSettled() use karo.',
            },
          ]}
          proTip="React Query / TanStack Query async error handling built-in karta hai — isError, error, isLoading states. Manually try/catch na likho har API call ke liye. Similar patterns: SWR, RTK Query. Production apps mein ye libraries use karo — bahut kam boilerplate."
        />
      </div>

      <div id="error-propagation">
        <ConceptCard
          title="Error Propagation — Kahan Handle Karo?"
          emoji="🌊"
          difficulty="intermediate"
          whatIsIt="Error propagation — yahi decide karta hai production code clean hai ya messy. Rule: low-level code errors throw kare, high-level code handle kare. Har function mein try/catch mat lagao — ye error messages spread aur dilute kar deta hai. Layered architecture: database layer throw karta hai, service layer context add karke re-throw karta hai, API handler finally handle karta hai aur HTTP response deta hai. Re-throw pattern: throw new Error('Failed to fetch user', { cause: originalErr }) — cause se original stack trace preserve hoti hai. Sawaal: unexpected errors ko swallow karna kyun galat hai? Jawab: unknown bug chhup jaata hai — application broken state mein silently run karta rehta hai!"
          whenToUse={[
            'Low-level utilities — errors throw karo, handle nahi karo',
            'Mid-level — catch karo, context add karo, re-throw',
            'Highest level (API handler, React component) — catch karo aur user ko dikhao',
            'Unexpected errors — hamesha re-throw ya log karo',
          ]}
          whyUseIt="Har jagah error handle karne se code bloated aur error messages lose ho jaate hain. Correct propagation se error information intact rehti hai — upstream caller decide karta hai kya karna hai. Business logic aur error handling separated rehti hai. Debugging much easier."
          howToUse={{
            filename: 'propagation.js',
            language: 'javascript',
            code: `// ── LAYERED ERROR HANDLING ──────────────────────────────────────

// Layer 1: Data access — throw, don't handle
async function db_getUser(id) {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
  if (result.rows.length === 0) {
    throw new NotFoundError(\`User \${id} not found\`)
  }
  return result.rows[0]
}

// Layer 2: Business logic — add context, re-throw
async function service_getUser(id) {
  try {
    const user = await db_getUser(id)
    return sanitizeUser(user)  // Remove sensitive fields
  } catch (err) {
    if (err instanceof NotFoundError) throw err  // Expected — pass up
    // Unexpected DB error — wrap with context
    throw new Error(\`Failed to fetch user \${id}\`, { cause: err })
  }
}

// Layer 3: API handler — handle everything, respond
app.get('/users/:id', async (req, res) => {
  try {
    const user = await service_getUser(req.params.id)
    res.json(user)
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ error: err.message })
    }
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message, field: err.field })
    }
    // Unknown error
    console.error('Unexpected error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// ── SWALLOWING vs PROPER HANDLING ────────────────────────────────

// ❌ Galat — error swallowing
async function badPattern(id) {
  try {
    return await fetchUser(id)
  } catch {
    // Shhh... kuch nahi hua
    return null  // Caller ko pata nahi error tha ya user nahi mila
  }
}

// ✅ Sahi — meaningful handling ya re-throw
async function goodPattern(id) {
  try {
    return await fetchUser(id)
  } catch (err) {
    if (err instanceof NotFoundError) return null  // Explicit: user nahi mila
    throw err  // Unexpected — upstream ko batao
  }
}

// ── RESULT TYPE PATTERN — Go-style ───────────────────────────────
// Errors as values — no exceptions
type Result<T> = { data: T; error: null } | { data: null; error: Error }

async function safeGet<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    return { data: await fn(), error: null }
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) }
  }
}

const { data: user, error } = await safeGet(() => fetchUser(id))
if (error) {
  // Handle specifically
}`,
            explanation: 'Low level throw, high level handle. Mid level context add karke re-throw. Never swallow unexpected errors — log karo minimum. Result type pattern errors as values banata hai — no hidden control flow. API boundary par catch karo aur HTTP responses map karo.',
          }}
          realWorldScenario="Express app mein global error middleware: app.use((err, req, res, next) => { if (err instanceof AppError) return res.status(err.statusCode).json({ error: err.message }); logger.error(err); res.status(500).json({ error: 'Server error' }); }). Har route se errors yahan propagate hoti hain."
          commonMistakes={[
            {
              mistake: 'Har function mein try/catch daalna',
              why: 'Error handling logic everywhere scattered — code bloated, error messages lost ya mangled.',
              fix: 'Low-level functions throw karein. Single high-level boundary par handle karo. Express global error handler use karo.',
            },
            {
              mistake: 'Re-throw karte waqt original error lose karna',
              why: 'throw new Error("Failed") — original stack trace aur type lost. Debugging impossible.',
              fix: 'throw new Error("context", { cause: originalErr }) — cause se original error preserve hoti hai.',
            },
          ]}
          proTip="Express mein error handling middleware add karo — app.use((err, req, res, next) => ...). Ye har unhandled error catch karta hai. Combine with custom error classes aur instanceof routing — clean, centralized error handling without repeating catch logic in every route."
        />
      </div>

      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 13 Quiz — Error Handling
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — robust code likhna seekho!
          </p>
        </div>
        <QuizSection questions={errorQuiz} chapterSlug="error-handling-js" />
      </div>
    </div>
  )
}
