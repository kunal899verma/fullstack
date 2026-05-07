'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Promise States Visual ─────────────────────────────────────────────────────

function PromiseStatesDiagram() {
  const states = [
    {
      label: 'Pending',
      sublabel: 'Wait kar rahe hain...',
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.12)',
      border: 'rgba(245,158,11,0.35)',
      icon: '⏳',
    },
    {
      label: 'Fulfilled',
      sublabel: 'Kaam ho gaya! Value mili.',
      color: '#10B981',
      bg: 'rgba(16,185,129,0.12)',
      border: 'rgba(16,185,129,0.35)',
      icon: '✅',
    },
    {
      label: 'Rejected',
      sublabel: 'Kuch galat hua. Error mila.',
      color: '#EF4444',
      bg: 'rgba(239,68,68,0.12)',
      border: 'rgba(239,68,68,0.35)',
      icon: '❌',
    },
  ]

  return (
    <div className="my-6">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">
        Promise — Teen States
      </p>
      <div className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto">
        {states.map((s, i) => (
          <div
            key={i}
            className="flex-1 rounded-xl px-4 py-3 flex flex-col items-center text-center gap-1"
            style={{ background: s.bg, border: `1px solid ${s.border}` }}
          >
            <span className="text-2xl">{s.icon}</span>
            <p className="font-bold text-sm" style={{ color: s.color }}>{s.label}</p>
            <p className="text-xs text-[#71717A]">{s.sublabel}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center">
        <span className="text-xs text-[#52525B]">
          State ek baar set ho jaaye toh change nahi hoti — immutable!
        </span>
      </div>
    </div>
  )
}

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const promisesQuiz = [
  {
    question: 'Promise ke teen states kaunse hain?',
    options: [
      {
        text: 'Start, Running, Done',
        correct: false,
        explanation: 'Ye JavaScript ke Promise states nahi hain. Sahi states hain: Pending, Fulfilled, Rejected.',
      },
      {
        text: 'Pending, Fulfilled, Rejected',
        correct: true,
        explanation: 'Bilkul sahi! Pending = wait kar rahe, Fulfilled = value mili, Rejected = error aaya. Ek baar set hone ke baad state change nahi hoti.',
      },
      {
        text: 'Loading, Success, Error',
        correct: false,
        explanation: 'Ye UI state terms hain, Promise ke official states nahi. Sahi hain: Pending, Fulfilled, Rejected.',
      },
      {
        text: 'Waiting, Complete, Failed',
        correct: false,
        explanation: 'Ye bhi galat hai. JavaScript mein Promise ke official states hain: Pending, Fulfilled, Rejected.',
      },
    ],
  },
  {
    question: 'Promise.all aur Promise.allSettled mein kya difference hai?',
    options: [
      {
        text: 'Dono same hain, bas naam alag hai',
        correct: false,
        explanation: 'Bilkul nahi! Promise.all ek bhi reject hone par turant reject karta hai. Promise.allSettled sab ke complete hone ka wait karta hai, chahe reject ho.',
      },
      {
        text: 'Promise.all ek bhi reject hone par reject ho jaata hai; Promise.allSettled sab ka result deta hai chahe fail ho',
        correct: true,
        explanation: 'Sahi! Promise.all fail-fast hai. Promise.allSettled patient hai — sab ka result deta hai, har item ka status aur value/reason ke saath.',
      },
      {
        text: 'Promise.allSettled sirf settled promises handle karta hai',
        correct: false,
        explanation: 'Promise.allSettled SARI promises ko run karta hai aur sab ke results deta hai — chahe koi fulfill ho ya reject.',
      },
      {
        text: 'Promise.all faster hai kyunki ye parallel nahi chalata',
        correct: false,
        explanation: 'Dono parallel chalate hain. Difference ye hai ki Promise.all ek bhi failure par early reject karta hai, Promise.allSettled nahi.',
      },
    ],
  },
  {
    question: '.catch() kab run hota hai?',
    options: [
      {
        text: 'Sirf jab network error aaye',
        correct: false,
        explanation: '.catch() kisi bhi rejection par run hota hai — network error, thrown error, rejected promise, kuch bhi.',
      },
      {
        text: 'Jab bhi promise chain mein koi bhi rejection ya thrown error aaye',
        correct: true,
        explanation: 'Bilkul sahi! .catch() chain mein kisi bhi jagah se aane wali rejection ko handle karta hai — reject() call ho, throw ho, ya koi bhi error aaye.',
      },
      {
        text: 'Sirf jab explicitly reject() call kiya jaaye',
        correct: false,
        explanation: '.catch() throw kiye gaye errors bhi pakadta hai, sirf explicit reject() nahi. Chain mein koi bhi uncaught error .catch() tak pahunchta hai.',
      },
      {
        text: '.catch() kabhi run nahi hota agar .then() hai',
        correct: false,
        explanation: 'Galat! .then() aur .catch() dono saath chal sakte hain. .then() success handle karta hai, .catch() errors handle karta hai.',
      },
    ],
  },
  {
    question: 'Promise chaining mein .then() ke andar return kyun zaroori hai?',
    options: [
      {
        text: 'Return sirf syntax ke liye hai, koi effect nahi',
        correct: false,
        explanation: 'Return bahut important hai! Bina return ke agle .then() ko undefined milega, asli value nahi.',
      },
      {
        text: 'Return ke bina agle .then() ko undefined milega kyunki .then() ka callback jo bhi return kare woh next .then() ko milta hai',
        correct: true,
        explanation: 'Sahi! .then() mein jo return karo woh next .then() ka input ban jaata hai. Bina return ke chain toot jaati hai aur undefined propagate hota hai.',
      },
      {
        text: 'Return isliye zaroori hai taaki Promise reject na ho',
        correct: false,
        explanation: 'Ye reason nahi hai. Return ka kaam hai — next .then() ko value dena. Bina return ke chain mein undefined aa jaata hai.',
      },
      {
        text: 'Return sirf async functions mein zaroori hota hai',
        correct: false,
        explanation: '.then() callbacks mein return hamesha zaroori hota hai agar tum chaining kar rahe ho — async function ho ya na ho.',
      },
    ],
  },
  {
    question: 'Promise.race ka sabse common real-world use case kya hai?',
    options: [
      {
        text: 'Multiple promises ko ek saath run karna',
        correct: false,
        explanation: 'Multiple parallel promises ke liye Promise.all use karte hain. Promise.race ka use case alag hai.',
      },
      {
        text: 'Timeout implement karna — agar operation zyada time le toh reject kar do',
        correct: true,
        explanation: 'Bilkul! Promise.race([actualOperation(), timeoutPromise(5000)]) — agar operation 5 seconds mein complete na ho toh timeout reject kar dega.',
      },
      {
        text: 'Sab promises settle hone ka wait karna',
        correct: false,
        explanation: 'Sab settle hone ke liye Promise.allSettled hai. Promise.race pehla settle hone wala return karta hai.',
      },
      {
        text: 'Error handling improve karna',
        correct: false,
        explanation: 'Promise.race specifically "first to settle wins" ke liye hai — timeout, fastest server select karna, etc.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function Chapter7Content() {
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
          Callback hell se aage niklo.
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Promises ek contract hain — future mein value milegi. Aaj hi samjho kaise ye pattern ne JavaScript async programming ko completely badal diya.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Callbacks mein problem thi — nested callbacks, error handling nightmare, code readability zero. Promises ne ek clean, chainable API diya jahan
          {' '}<code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">.then()</code>{', '}
          <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">.catch()</code>{' '}
          aur <code className="text-[#9D5FF0] bg-[rgba(124,58,237,0.15)] px-1.5 py-0.5 rounded text-sm">.finally()</code>{' '}
          se async code likhna ek pleasure ban gaya.
        </p>
      </div>

      {/* States Diagram */}
      <div id="promise-states">
        <PromiseStatesDiagram />
      </div>

      {/* ConceptCard 1: Promise Kya Hai */}
      <div id="what-is-promise">
        <ConceptCard
          title="Promise — Future Ka Contract"
          emoji="🤝"
          difficulty="intermediate"
          whatIsIt="Promise ek object hai jo future mein available hone wali value ya error represent karta hai. Teen states hain: Pending (abhi wait kar rahe hain), Fulfilled (kaam ho gaya, value mili), Rejected (kuch galat hua, error mila). Ek baar state set ho jaaye toh change nahi hoti — ye immutability promises ko reliable banati hai."
          whenToUse={[
            'Callback-based APIs ko Promise mein wrap karna — cleaner code ke liye',
            'Database queries jahan result future mein milega',
            'HTTP requests, file reads — koi bhi async operation',
            'Jab tumhe async operations chain karne hon sequentially',
            'Error handling centralize karne ke liye — ek .catch() sab handle kare',
          ]}
          whyUseIt="Callbacks mein problem thi — error-first convention, deep nesting, aur error propagation nightmare. Promises ne ye sab solve kiya: chainable API, built-in error propagation, aur composable async operations. Async/await bhi under the hood Promises hi use karta hai."
          howToUse={{
            filename: 'promise-basics.js',
            language: 'javascript',
            code: `// Promise banana
const fetchUser = (userId) => {
  return new Promise((resolve, reject) => {
    // Simulate DB query
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: 'Rahul', email: 'rahul@example.com' })
      } else {
        reject(new Error('Invalid user ID'))
      }
    }, 200)
  })
}

// Promise use karna
fetchUser(42)
  .then(user => {
    console.log('User mila:', user.name) // "User mila: Rahul"
    return user // next .then() ko milega
  })
  .catch(err => {
    console.error('Error:', err.message)
  })
  .finally(() => {
    console.log('Operation complete — chahe success ho ya fail')
  })

// Promise.resolve — already resolved value ko promise mein wrap karo
const instant = Promise.resolve(42)
instant.then(val => console.log(val)) // 42

// Promise.reject — already rejected promise
const failed = Promise.reject(new Error('Something broke'))
failed.catch(err => console.error(err.message))`,
            explanation: 'new Promise() mein resolve aur reject callbacks milte hain. resolve() se Promise fulfill hota hai, reject() se reject. .then() success handle karta hai, .catch() errors, .finally() hamesha run hota hai dono cases mein.',
          }}
          realWorldScenario="Express route mein DB query — return ek promise, usse chain karo. User fetch karo, phir uske orders fetch karo, phir response bhejo. Agar koi bhi step fail ho, ek .catch() sab handle kar leta hai — centralized error handling ka maza!"
          commonMistakes={[
            {
              mistake: 'new Promise() banate waqt reject case handle na karna',
              why: 'Agar rejection handle nahi ki toh unhandled promise rejection error aata hai — Node.js 15+ mein ye app crash karta hai!',
              fix: 'Hamesha reject() ko call karo error cases mein. try/catch use karo Promise constructor ke andar agar async code hai.',
            },
            {
              mistake: 'Function se Promise return karna bhool jaana',
              why: 'Agar function return nahi karta toh caller ko undefined milega — Promise ka koi fayda nahi.',
              fix: 'return new Promise(...) — return keyword mat bhulo! Arrow functions mein implicit return bhi kaam karta hai ek-liner ke liye.',
            },
          ]}
          proTip="Promise.resolve(value) ek already-resolved Promise banata hai — useful for converting synchronous values to promises, ya testing mein mock promises banane ke liye. Promise.reject(error) similarly ek already-rejected promise deta hai."
        />
      </div>

      {/* ConceptCard 2: Chaining */}
      <div id="promise-chaining">
        <ConceptCard
          title="Promise Chaining — .then().catch().finally()"
          emoji="⛓️"
          difficulty="intermediate"
          whatIsIt="Promise chaining ka matlab hai .then() calls ko connect karna — ek ke baad ek. Har .then() ek nayi Promise return karta hai jiska value woh hai jo callback ne return kiya. Errors automatically chain ke through propagate hote hain jab tak koi .catch() unhe handle na kare."
          whenToUse={[
            'Sequential async operations jahan ek ka output doosre ka input ho',
            'Data transformation pipeline — fetch, parse, validate, save',
            'Error handling centralize karna — ek .catch() poori chain ke liye',
            '.finally() mein cleanup — DB connection close, loading spinner stop',
          ]}
          whyUseIt="Chaining se callback hell khatam hoti hai. Code linear aur readable rehta hai. Error ek baar reject ho jaaye toh chahe chain kitni bhi lambi ho, seedha nearest .catch() tak pahunch jaata hai — baich ke .then() skip ho jaate hain."
          howToUse={{
            filename: 'promise-chain.js',
            language: 'javascript',
            code: `// Clean promise chain
fetchUser(userId)
  .then(user => {
    console.log('Step 1: User mila')
    return fetchOrders(user.id) // return zaroori hai!
  })
  .then(orders => {
    console.log('Step 2: Orders mile:', orders.length)
    return processOrders(orders) // value next .then() ko milti hai
  })
  .then(result => {
    console.log('Step 3: Processing done:', result)
  })
  .catch(err => {
    // Kisi bhi step mein error aaye — yahan aayega
    console.error('Kuch galat hua:', err.message)
  })
  .finally(() => {
    // Hamesha run hoga — success ho ya fail
    db.connection.close()
    hideLoadingSpinner()
  })`,
            explanation: 'Har .then() mein return karo — warna next .then() ko undefined milega. Errors automatically nearest .catch() tak float karte hain. .finally() cleanup ke liye perfect — ye hamesha run hota hai.',
          }}
          realWorldScenario="File upload flow: validate file → upload to S3 → save URL to DB → send notification email. Ye sab chain ho sakte hain. Agar S3 upload fail ho, directly .catch() mein jaayega — notification email nahi bhejega (sahi behavior!)."
          commonMistakes={[
            {
              mistake: '.then() ke andar return bhool jaana',
              why: 'Bina return ke next .then() ko undefined milta hai — chain toot jaati hai silently. Bahut common bug hai!',
              fix: 'Hamesha return karo: return fetchOrders(user.id) — explicit return. Arrow function mein: user => fetchOrders(user.id)',
            },
            {
              mistake: 'Chain mein .catch() na lagana',
              why: 'Unhandled rejection Node.js 15+ mein app crash karta hai. Hamesha errors handle karo.',
              fix: 'Chain ke end mein hamesha .catch() lagao. Ya global handler: process.on("unhandledRejection", handler)',
            },
          ]}
          proTip="Har .then() ek new Promise return karta hai — isliye chain karna possible hai. Agar .then() mein tum ek value return karo toh next .then() ko woh value milti hai. Agar ek Promise return karo toh next .then() wait karta hai us Promise ke resolve hone ka."
          demo={
            <DiffBlock
              title="Callback Hell vs Promise Chain"
              language="javascript"
              bad={{
                label: 'Callback Hell — Pyramid of Doom',
                code: `getUser(userId, (err, user) => {
  if (err) return handleError(err)
  getOrders(user.id, (err, orders) => {
    if (err) return handleError(err)
    processOrders(orders, (err, result) => {
      if (err) return handleError(err)
      sendEmail(result, (err) => {
        if (err) return handleError(err)
        console.log('Done!') // 4 levels deep!
      })
    })
  })
})`,
                explanation: 'Har step ke liye alag error check, 4 levels ki nesting, nightmare to read/debug.',
              }}
              good={{
                label: 'Promise Chain — Clean & Linear',
                code: `getUser(userId)
  .then(user => getOrders(user.id))
  .then(orders => processOrders(orders))
  .then(result => sendEmail(result))
  .then(() => console.log('Done!'))
  .catch(handleError) // ek hi catch sab ke liye`,
                explanation: 'Linear flow, centralized error handling, readable aur maintainable. Error kisi bhi step mein aaye — ek .catch() handle karta hai.',
              }}
            />
          }
        />
      </div>

      {/* ConceptCard 3: Promise.all */}
      <div id="promise-all">
        <ConceptCard
          title="Promise.all — Sab Saath Chalao"
          emoji="🏃‍♂️"
          difficulty="intermediate"
          whatIsIt="Promise.all ek array of promises leta hai aur ek nayi Promise return karta hai jo tab resolve hoti hai jab sari promises resolve ho jaayein. Sab parallel mein chalte hain — total time = slowest operation ka time, na ki sab ka sum. Agar ek bhi reject ho toh turant reject ho jaata hai (fail-fast)."
          whenToUse={[
            'Independent async operations jo parallel mein chal sakti hain',
            'Dashboard data — user info + orders + notifications ek saath fetch karo',
            'Multiple files ek saath padhna',
            'Jab sari operations ka result chahiye aur order matter karta ho',
            'API calls jo ek doosre par depend nahi karti',
          ]}
          whyUseIt="Sequential awaits 650ms le sakte hain jab tak parallel mein 300ms mein ho sake. Performance ka fark bohot bada hota hai real-world mein — especially dashboard pages ya report generation mein jahan kaafi data fetch karna hota hai."
          howToUse={{
            filename: 'promise-all.js',
            language: 'javascript',
            code: `// ❌ Sequential — SLOW (total = sum of all times)
const user = await getUser(id)      // 200ms wait...
const posts = await getPosts(id)    // 300ms wait...
const likes = await getLikes(id)    // 150ms wait...
// Total: 650ms — ek ke baad ek

// ✅ Promise.all — FAST (total = slowest ki time)
const [user, posts, likes] = await Promise.all([
  getUser(id),    // 200ms ┐
  getPosts(id),   // 300ms ├ sab ek saath start hote hain
  getLikes(id),   // 150ms ┘
])
// Total: 300ms (slowest ki time) — 2x+ speedup!

// Error handling — ek bhi fail = reject
try {
  const [user, posts] = await Promise.all([getUser(id), getPosts(id)])
  console.log(user, posts)
} catch (err) {
  // Koi bhi ek fail hone par yahan aata hai
  console.error('Koi operation fail hua:', err.message)
}`,
            explanation: 'Promise.all sab promises ek saath start karta hai — parallel execution. Total time sirf slowest operation ka hota hai. Destructuring se result seedha variables mein aa jaata hai. Ek bhi reject ho toh poora reject ho jaata hai.',
          }}
          realWorldScenario="Dashboard page pe user info + recent orders + notifications — teen parallel API calls, sequential nahi. Ya report generation mein — 10 different DB queries ek saath chalao, na ki ek ke baad ek. Ye sab Promise.all se possible hai."
          commonMistakes={[
            {
              mistake: 'Dependent operations ke liye Promise.all use karna',
              why: 'Agar operation B ka input operation A ke result par depend karta hai, toh parallel mein kaise chaloge? A ka result abhi hai hi nahi!',
              fix: 'Dependent operations ke liye sequential await use karo. Independent operations ke liye Promise.all. Dono mix bhi kar sakte ho.',
            },
            {
              mistake: 'Promise.all mein error handling bhool jaana',
              why: 'Ek bhi Promise reject ho toh poora Promise.all reject ho jaata hai — unhandled rejection.',
              fix: 'try/catch use karo await Promise.all ke saath, ya .catch() lagao. Ya Promise.allSettled use karo agar partial failures acceptable hain.',
            },
          ]}
          proTip="Promise.all ek array return karta hai — order guaranteed hota hai chahe koi pehle complete ho jaaye. Agar 3 promises hain, result array mein wahi order hoga. Ye predictability ke liye bahut useful hai destructuring mein."
        />
      </div>

      {/* ConceptCard 4: Promise Utilities */}
      <div id="promise-utilities">
        <ConceptCard
          title="Promise Utilities — race, allSettled, any"
          emoji="🛠️"
          difficulty="intermediate"
          whatIsIt="JavaScript mein 4 main Promise combinators hain: Promise.all (sab fulfill ho), Promise.allSettled (sab settle ho chahe fail ho), Promise.race (pehla settle hone wala), Promise.any (pehla fulfill hone wala). Har ek ka alag use case hai — sahi choose karna performance aur reliability ke liye zaroori hai."
          whenToUse={[
            'Promise.race: timeout implement karna — agar operation slow ho toh cancel karo',
            'Promise.allSettled: jab sab results chahiye chahe kuch fail ho — bulk operations',
            'Promise.any: multiple sources try karo, pehla successful use karo — fallback pattern',
            'Promise.all: sab chahiye aur ek failure = total failure acceptable hai',
          ]}
          whyUseIt="Ye utilities complex async scenarios handle karne mein madad karte hain. Timeout? race. Partial failures okay? allSettled. Fastest server use karo? any. Sab chahiye ya kuch nahi? all. Inhe samajhna professional Node.js development ke liye zaroori hai."
          howToUse={{
            filename: 'promise-utilities.js',
            language: 'javascript',
            code: `// 1. Promise.race — pehla settle hone wala wins
const timeout = (ms) => new Promise((_, reject) =>
  setTimeout(() => reject(new Error(\`Timeout after \${ms}ms\`)), ms)
)

const result = await Promise.race([
  fetchDataFromAPI(),   // actual operation
  timeout(5000),        // 5 second timeout
])
// Agar API 5 sec se zyada le — timeout reject karega

// 2. Promise.allSettled — sab ka result chahiye chahe fail ho
const results = await Promise.allSettled([
  sendEmail('user1@example.com'),
  sendEmail('invalid-email'),    // ye fail hoga
  sendEmail('user3@example.com'),
])

results.forEach((result, i) => {
  if (result.status === 'fulfilled') {
    console.log(\`Email \${i + 1} sent:\`, result.value)
  } else {
    console.error(\`Email \${i + 1} failed:\`, result.reason.message)
  }
})

// 3. Promise.any — pehla SUCCESSFUL result (rejections ignore)
const data = await Promise.any([
  fetchFromServer1(),  // primary
  fetchFromServer2(),  // backup 1
  fetchFromServer3(),  // backup 2
])
// Pehla jo succeed kare — woh use hoga
// Agar sab fail ho: AggregateError throw hota hai`,
            explanation: 'Promise.race timeout ke liye perfect hai. Promise.allSettled bulk operations mein partial failure handle karta hai. Promise.any fallback pattern mein — agar primary server down ho toh backup use karo.',
          }}
          realWorldScenario="CDN failover: images primary CDN se load karo, agar 3 seconds mein na aaye toh backup CDN try karo — Promise.race + Promise.any combination. Bulk email send: sab bhejo aur report karo kitne gaye kitne failed — Promise.allSettled perfect hai."
          commonMistakes={[
            {
              mistake: 'Promise.any aur Promise.race ko confuse karna',
              why: 'Promise.race pehla settle hone wala return karta hai (rejection bhi). Promise.any pehla fulfill hone wala return karta hai — rejections ignore karta hai.',
              fix: 'Race = pehla koi bhi (jeet ya haar). Any = pehla winner. Agar sirf successes chahiye — any use karo.',
            },
            {
              mistake: 'Promise.allSettled ke results check na karna',
              why: 'allSettled hamesha resolve karta hai — lekin individual results mein errors ho sakte hain. Har result ka status check karna zaroori hai.',
              fix: 'result.status === "fulfilled" check karo value access karne se pehle. result.status === "rejected" mein result.reason mein error hoga.',
            },
          ]}
          proTip="Promise.any ES2021 mein aaya — Node.js 15+ mein available hai. Agar tum CDN fallback, fastest API selection, ya retry-with-alternatives pattern implement kar rahe ho — Promise.any sabse elegant solution hai."
        />
      </div>

      {/* ConceptCard 5: Promisifying */}
      <div id="promisify">
        <ConceptCard
          title="Callback ko Promise Mein Convert Karo"
          emoji="🔄"
          difficulty="intermediate"
          whatIsIt="Bahut saari Node.js APIs abhi bhi old-style callbacks use karti hain (fs.readFile, dns.lookup, etc.). Promisification ka matlab hai — un callback-based APIs ko Promise-returning functions mein convert karna taaki .then() / async-await se use kar sako."
          whenToUse={[
            'Old Node.js APIs jo callbacks use karti hain unhe modern code mein use karna',
            'Third-party libraries jo still callback pattern follow karti hain',
            'apna legacy code refactor karna bina poori library rewrite kiye',
            'Testing mein — async wrappers banana',
          ]}
          whyUseIt="Naye code mein async/await use karna chahte ho, lekin legacy library callbacks return karti hai? Promisify karo! util.promisify() built-in Node.js function hai jo ye automatically karta hai error-first callbacks ke liye."
          howToUse={{
            filename: 'promisify.js',
            language: 'javascript',
            code: `const fs = require('fs')
const { promisify } = require('util')

// Manual promisification
const readFilePromise = (path, encoding) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

// util.promisify — automatic! (error-first callbacks ke liye)
const readFile = promisify(fs.readFile)

// Ab async/await se use karo
async function processConfig() {
  try {
    const data = await readFile('config.json', 'utf8')
    const config = JSON.parse(data)
    console.log('Config loaded:', config)
    return config
  } catch (err) {
    console.error('Config read failed:', err.message)
    throw err
  }
}

// Node.js built-in Promise versions (already available!)
const fsPromises = require('fs').promises
// ya: import { readFile } from 'fs/promises'

async function modernWay() {
  const data = await fsPromises.readFile('package.json', 'utf8')
  return JSON.parse(data)
}`,
            explanation: 'Manual promisification mein error-first callback pattern wrap karo. util.promisify() ye automatically karta hai. Lekin best approach — fs.promises, dns.promises jaise modern APIs use karo jo already Promise-based hain.',
          }}
          realWorldScenario="Legacy codebase mein redis client v3 callbacks use karta tha. util.promisify se redis.get, redis.set sab promisify kar diye — bina library change kiye async/await code mein use karne laga. Phir jab time mila redis v4 migrate kiya jo natively promises return karta hai."
          commonMistakes={[
            {
              mistake: 'util.promisify non-standard callbacks ke saath use karna',
              why: 'util.promisify sirf standard Node.js error-first callbacks ke liye kaam karta hai — (err, result). Agar callback ka signature alag hai toh kaam nahi karega.',
              fix: 'Non-standard callbacks ke liye manual promisification likho. Ya check karo library ka documentation — modern version mein Promise support ho sakta hai.',
            },
            {
              mistake: 'fs.readFile promisify karna jab fs.promises already available ho',
              why: 'Extra boilerplate! Node.js already fs.promises, dns.promises jaise built-in Promise APIs provide karta hai.',
              fix: 'Pehle check karo — modern Node.js APIs already Promise versions deti hain: fs.promises.readFile(), dns.promises.lookup(), etc.',
            },
          ]}
          proTip="fs.promises, dns.promises — bahut saari Node.js core APIs already have promise versions. Node.js 10+ mein available hain. Pehle check karo wahan — promisify karne ki zarurat hi nahi padegi. require('fs/promises') ya require('fs').promises dono kaam karte hain."
          demo={
            <DiffBlock
              title="Callback Style vs Promisified Style"
              language="javascript"
              bad={{
                label: 'Callback Style — Old Way',
                code: `const fs = require('fs')

// Nested callbacks — readability zero
fs.readFile('config.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Read failed:', err)
    return
  }
  const config = JSON.parse(data)
  fs.writeFile('output.json', JSON.stringify(config), (err) => {
    if (err) {
      console.error('Write failed:', err)
      return
    }
    console.log('Done!')
  })
})`,
                explanation: 'Har step mein manual error check, nested structure, error handling scattered.',
              }}
              good={{
                label: 'Promise Style — Modern Way',
                code: `const { readFile, writeFile } = require('fs/promises')

// Clean async/await with centralized error handling
async function processConfig() {
  const data = await readFile('config.json', 'utf8')
  const config = JSON.parse(data)
  await writeFile('output.json', JSON.stringify(config))
  console.log('Done!')
}

processConfig().catch(console.error)`,
                explanation: 'Linear flow, centralized .catch(), readable aur maintainable. Error handling ek jagah.',
              }}
            />
          }
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 7 Quiz — Promises Check
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — 80%+ chahiye pass ke liye. Dekho kitna samjha!
          </p>
        </div>
        <QuizSection questions={promisesQuiz} chapterSlug="promises" />
      </div>
    </div>
  )
}
