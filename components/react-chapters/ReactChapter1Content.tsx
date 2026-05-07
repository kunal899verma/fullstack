'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Virtual DOM Diagram ───────────────────────────────────────────────────────

function VDOMDiagram() {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-[#12121A] my-4 overflow-x-auto">
      {['State Change', 'Virtual DOM Diff', 'Real DOM Update'].map((step, i) => (
        <React.Fragment key={step}>
          <div className="text-center shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#7C3AED] text-white text-sm flex items-center justify-center mx-auto mb-1">
              {i + 1}
            </div>
            <span className="text-xs text-[#A1A1AA] whitespace-nowrap">{step}</span>
          </div>
          {i < 2 && <div className="text-[#71717A]">→</div>}
        </React.Fragment>
      ))}
    </div>
  )
}

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const reactIntroQuiz = [
  {
    question: 'React ka main problem kya hai jo solve karta hai?',
    options: [
      {
        text: 'Server-side rendering automatically karna',
        correct: false,
        explanation: 'SSR React ka core problem nahi hai — wo Next.js jaise frameworks provide karte hain. React ka main problem manual DOM manipulation tha.',
      },
      {
        text: 'Manual DOM manipulation ki complexity — state change hone par sab jagah manually update karna',
        correct: true,
        explanation: 'Bilkul sahi! Vanilla JS mein har state change ke liye manually querySelector + innerHTML update karna padta tha. React ne declarative model diya — tum UI describe karo, React DOM update karega.',
      },
      {
        text: 'JavaScript ko faster banana',
        correct: false,
        explanation: 'React JS engine nahi badalta. Ye ek UI library hai jo developer experience aur code maintainability solve karta hai.',
      },
      {
        text: 'CSS styling automate karna',
        correct: false,
        explanation: 'CSS React ka scope nahi hai. React sirf UI logic aur rendering handle karta hai.',
      },
    ],
  },
  {
    question: 'Virtual DOM real DOM se kaise alag hai?',
    options: [
      {
        text: 'Virtual DOM browser ke andar hota hai, real DOM JavaScript mein',
        correct: false,
        explanation: 'Ulta hai — real DOM browser ka hai, Virtual DOM React ka JavaScript-based in-memory representation hai.',
      },
      {
        text: 'Virtual DOM aur real DOM ek hi cheez hain',
        correct: false,
        explanation: 'Nahi, ye alag hain. Virtual DOM ek lightweight JavaScript object tree hai jo real DOM ko mirror karta hai.',
      },
      {
        text: 'Virtual DOM React ka in-memory JavaScript representation hai — real DOM se zyada fast update hota hai, phir sirf differences real DOM mein apply hote hain',
        correct: true,
        explanation: 'Sahi! Virtual DOM JavaScript object hai (fast to update), React diffing karta hai (kya change hua?), phir sirf wo parts real DOM mein update hote hain. Ise reconciliation kehte hain.',
      },
      {
        text: 'Virtual DOM sirf testing ke liye use hota hai',
        correct: false,
        explanation: 'Virtual DOM production rendering pipeline ka hissa hai, sirf testing ka nahi.',
      },
    ],
  },
  {
    question: 'Single Responsibility principle ke hisaab se component mein kya hona chahiye?',
    options: [
      {
        text: 'Ek component mein poori app ka logic hona chahiye',
        correct: false,
        explanation: 'Ye Single Responsibility ka ulta hai. Ek bada component maintain karna mushkil hota hai aur reuse nahi ho sakta.',
      },
      {
        text: 'Ek component sirf ek kaam kare — ek UI piece represent kare',
        correct: true,
        explanation: 'Bilkul sahi! Single Responsibility principle: ek component ek cheez kare. Agar component zyada lamba lagay, usay chhote components mein tod do.',
      },
      {
        text: 'Component mein CSS, JS aur HTML teeno alag files mein hone chahiye',
        correct: false,
        explanation: 'React co-location ko encourage karta hai — ek file mein JSX + logic. Alag files zaroori nahi, kaam ki separation zaroori hai.',
      },
      {
        text: 'Component sirf data fetch kare, UI nahi',
        correct: false,
        explanation: 'Components UI aur logic dono handle kar sakte hain — bas ek responsibility honi chahiye, aur separation of concerns achha practice hai.',
      },
    ],
  },
  {
    question: 'Create React App (CRA) kyun avoid karna chahiye?',
    options: [
      {
        text: 'CRA TypeScript support nahi karta',
        correct: false,
        explanation: 'CRA TypeScript support karta hai. Problem yeh nahi hai.',
      },
      {
        text: 'CRA officially deprecated hai aur bahut slow dev server provide karta hai',
        correct: true,
        explanation: 'Sahi! CRA deprecated ho gaya hai. Dev server bahut slow hai compared to Vite. Aaj Vite ya Next.js use karo — dono bahut faster hain.',
      },
      {
        text: 'CRA React 18 ke saath kaam nahi karta',
        correct: false,
        explanation: 'CRA React 18 ke saath kaam karta hai, lekin main issue deprecation aur slow performance hai.',
      },
      {
        text: 'CRA mein npm install nahi hoti',
        correct: false,
        explanation: 'CRA mein npm install perfectly hoti hai. Issue performance aur maintenance ka hai.',
      },
    ],
  },
  {
    question: 'React declarative hai — iska matlab kya hai?',
    options: [
      {
        text: 'React code hamesha declare() function se shuru hota hai',
        correct: false,
        explanation: 'Aisa koi declare() function nahi hai. Declarative programming ek paradigm hai.',
      },
      {
        text: 'Tum batate ho UI kya hona chahiye (WHAT), React khud DOM update karta hai (HOW) — tum manually DOM manipulate nahi karte',
        correct: true,
        explanation: 'Ekdum sahi! Declarative = WHAT describe karo. Imperative (vanilla JS) = HOW step by step batao. React declarative approach se code predictable aur maintainable hota hai.',
      },
      {
        text: 'React mein variables declare karne padti hain JavaScript se zyada',
        correct: false,
        explanation: 'Declarative ka matlab variables declare karna nahi hai. Ye programming style ke baare mein hai.',
      },
      {
        text: 'React automatically TypeScript types declare karta hai',
        correct: false,
        explanation: 'TypeScript types manually ya inference se aate hain. Declarative ka matlab TypeScript types nahi hai.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function ReactChapter1Content() {
  return (
    <div className="space-y-8">
      {/* Chapter Intro */}
      <div>
        <h1 className="text-4xl font-display font-bold text-[#F5F5F7] mb-3">
          React Kya Hai? ⚛️
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          Ruko ek second. React ek library hai — framework nahi. Aur ye fark sirf semantic nahi, ye practically matter karta hai. Framework opinionated hota hai — sab kuch batata hai kaise karo. Library sirf ek kaam karta hai acha se. React sirf UI ke liye hai — routing, state management, API calls — sab tumhare haath mein. Isliye React itna flexible aur powerful hai.
        </p>
        <div
          className="rounded-xl p-4 mb-8"
          style={{
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.3)',
          }}
        >
          <p className="text-[#67E8F9] text-sm">
            &ldquo;Bata do UI kya hona chahiye — React khud figure karta hai DOM ko kaise update karna hai. Ye declarative magic ka matlab hai.&rdquo;
          </p>
        </div>
      </div>

      {/* ConceptCard 1: Problem React Solves */}
      <div id="problem-react-solves">
        <ConceptCard
          title="Problem Jo React Ne Solve Kiya"
          emoji="😤"
          difficulty="beginner"
          whatIsIt="Socho pehle wala zamaana — Vanilla JS mein kya hota tha? User ne button click kiya, tumne querySelector se element dhundha, innerHTML update kiya, style change kiya. 10 jagah update karna tha — 10 baar manually. Ab imagine karo 50 state changes, 100 UI pieces. Ye maintainable nahi tha. React ne ek simple idea diya: tum describe karo UI kaisi dikhni chahiye — React khud decide karta hai DOM ko kaise update karna hai. Ye shift — imperative se declarative — React ka core idea hai."
          whenToUse={[
            'Complex UI with lots of state — jahan multiple parts ek saath update hoti hain',
            'Team-based development — components clearly separated hoti hain, merge conflicts kam',
            'SPAs (Single Page Applications) — no full page reload, smooth navigation',
            'Jab reusable components chahiye — ek baar likho, hazaar jagah use karo',
          ]}
          whyUseIt="Sawaal: Tum WHAT karte ho ya HOW? Vanilla JS mein tum HOW karte the — har step manually. getElementById, innerHTML change karo, class add karo, event listener lagao. React mein tum sirf WHAT batate ho — UI kaisi honi chahiye state ke hisaab se. HOW ka kaam React ka hai. Ek state variable badli, React khud jaanta hai kya update karna hai — tum sirf apna component likhte ho."
          howToUse={{
            filename: 'Counter.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

// ✅ React Counter — Declarative
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Click
      </button>
    </div>
  )
}

// State update karo — React automatically DOM update karega
// Koi querySelector nahi, koi innerHTML nahi`,
            explanation: 'useState se state declare karo. setCount call karo — React andar se diff calculate karta hai, sirf wahi DOM node update hoti hai jo change hua. Tumhare liye koi querySelector nahi, koi innerHTML nahi — sirf state manage karo.',
          }}
          realWorldScenario="Facebook News Feed sochte ho? Hundreds of posts, real-time likes update ho rahe hain, comments aa rahe hain, notifications badge change ho raha hai — sab simultaneously. Vanilla JS se ye banana aur maintain karna literally impossible tha. Facebook ke engineers ko ek better model chahiye tha — aur unhone React banaya. State change karo, UI automatically sync."
          commonMistakes={[
            {
              mistake: 'React mein directly DOM manipulate karna — document.getElementById(), innerHTML use karna',
              why: 'React ka rendering cycle break hota hai. React apna Virtual DOM maintain karta hai — agar tum seedha real DOM change karo, React confuse ho jaata hai aur unexpected behavior hoti hai.',
              fix: 'useState aur useRef use karo DOM access ke liye. State ke through UI update karo, direct DOM manipulation se bachao.',
            },
          ]}
          proTip="Ek baat yaad rakho hamesha — React mein data sirf ek direction mein flow karta hai: upar se neeche, parent se child. Ye unidirectional data flow hai. Bug dhundna bahut easy ho jaata hai — tree ke upar se trace karo, koi bi-directional confusion nahi. Angular mein two-way binding tha — debugging nightmare hoti thi. React ne isse fix kiya."
          demo={
            <DiffBlock
              language="javascript"
              bad={{
                label: '❌ Vanilla JS — Manual DOM',
                code: `// Counter in Vanilla JS
const countEl = document.getElementById('count')
const btn = document.getElementById('btn')
let count = 0

btn.addEventListener('click', () => {
  count++
  countEl.textContent = count // manual update
  // Agar 10 jagah update karna ho?
})`,
                explanation: 'Har state change ke liye manually DOM dhundho aur update karo. Scale nahi hota.',
              }}
              good={{
                label: '✅ React — Declarative',
                code: `// Counter in React
function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Click
      </button>
    </div>
  )
}`,
                explanation: 'State declare karo, UI describe karo. React baki sab kuch handle karta hai.',
              }}
            />
          }
        />
      </div>

      {/* ConceptCard 2: Virtual DOM */}
      <div id="virtual-dom">
        <ConceptCard
          title="Virtual DOM — React Ka Magic"
          emoji="🪄"
          difficulty="beginner"
          whatIsIt="Ab yahan ek common misconception hai — 'Virtual DOM ek special DOM hai.' Nahi! Virtual DOM sirf ek JavaScript object hai. Bas. React ek plain JS object tree maintain karta hai jo real DOM ko represent karta hai. Jab state change hoti hai — React pehle is JS object mein update karta hai (bahut fast — sirf memory operation), phir diff dhundta hai old aur new object mein, phir sirf wo differences real DOM mein apply karta hai. Is process ko reconciliation kehte hain."
          whenToUse={[
            'Frequent state updates wali apps — like dashboards, live feeds',
            'Jab performance optimize karna ho — React.memo, useMemo ke saath',
            'Complex conditional rendering — React efficiently handle karta hai',
            'Large lists — React.key prop se React specific items ko track karta hai',
          ]}
          whyUseIt="Real DOM slow kyun hai? Browser ko har DOM change pe layout recalculate karni padti hai, repaint karni padti hai — ye expensive operations hain. JavaScript object mein changes? Lightning fast — sirf memory mein kuch store ho raha hai. Virtual DOM isliye faydemand hai: React saari changes pehle JS object mein karta hai, phir ek batch mein real DOM update hota hai. Batching + targeted updates = efficient rendering."
          howToUse={{
            filename: 'reconciliation-demo.tsx',
            language: 'tsx',
            code: `import { useState } from 'react'

function UserCard({ name, score }: { name: string; score: number }) {
  return (
    <div className="card">
      <h2>{name}</h2>      {/* Ye change nahi hoga */}
      <p>{score} points</p> {/* Sirf ye update hoga */}
    </div>
  )
}

function App() {
  const [score, setScore] = useState(0)

  // Score update hone par:
  // 1. React new Virtual DOM banata hai
  // 2. Old Virtual DOM se compare karta hai (diffing)
  // 3. Sirf <p> tag update hoti hai — <h2> untouched rehti hai
  return (
    <UserCard name="Rahul" score={score} />
  )
}`,
            explanation: 'Jab score update hota hai, React do Virtual DOM trees compare karta hai — old aur new. Diff kya hai? Sirf score ki value badli. To real DOM mein sirf wahi p tag update hogi — h2 tag bilkul untouched. Ye targeted precision reconciliation algorithm ki wajah se possible hai.',
          }}
          realWorldScenario="Twitter/X ka infinite timeline sochte ho? Naya tweet aata hai — React sirf ek naya list item insert karta hai real DOM mein. Baaki hazaar tweets? Untouched. Poora list dobara render nahi hota. Ye Virtual DOM diffing aur reconciliation ki efficiency hai — isliye Twitter pe scroll karne pe jerk nahi aata."
          commonMistakes={[
            {
              mistake: 'Virtual DOM always fastest hai — ye myth hai',
              why: 'Virtual DOM overhead add karta hai — in-memory tree maintain karna, diffing calculate karna. Small, static apps mein vanilla JS faster ho sakta hai.',
              fix: 'React use karo DX (developer experience) aur scalability ke liye, raw performance ke liye nahi. Micro-benchmarks mein vanilla JS jeet sakta hai lekin real-world complex apps mein React ka model win karta hai.',
            },
          ]}
          proTip="React 16 mein andar se poora engine rewrite hua — React Fiber reconciler. Fiber ne kya naya diya? Rendering kaam ko chhote units mein tod diya. Ab React urgent updates (user type kar raha hai) ko non-urgent updates (background data fetch) se pehle process karta hai. React 18 ka Concurrent Mode isi Fiber architecture pe based hai — Time Slicing, Suspense, startTransition sab Fiber ki wajah se possible hua."
          demo={<VDOMDiagram />}
        />
      </div>

      {/* ConceptCard 3: Component-Based Architecture */}
      <div id="component-model">
        <ConceptCard
          title="Component Model — Lego Blocks"
          emoji="🧱"
          difficulty="beginner"
          whatIsIt="Poori React app actually ek tree hai — components ka tree. Har component ek isolated UI piece hai jiske paas apna logic aur apna UI hai. Sochte ho Button component — woh ek chhota sa piece. Form mein Button hai, Form Login page mein hai, Login page App mein hai. Chhote se bade — compose karo. Aur sabse badi baat? Ek baar likha Button har jagah reuse hota hai — yahi React ka asli superpower hai."
          whenToUse={[
            'UI ka koi bhi part jo repeat hota ho — Button, Card, Modal, Input',
            'Jab ek UI section ka apna state aur behavior ho',
            'Team mein kaam karte waqt — har developer alag component par kaam kar sakta hai',
            'Jab testing chahiye — isolated components easily unit test hote hain',
          ]}
          whyUseIt="Separation of concerns — ye philosophy components mein naturally fit hoti hai. Bug Button mein hai? Sirf Button.tsx dekho. Har component apna kaam karta hai, apni responsibility jaanta hai. Naya feature chahiye? Naya component banao, existing components mein plug in karo — rest of the app untouched. Ye modularity hai. Yahi real maintainability ka matlab hai — 6 mahine baad bhi code samajh mein aata hai."
          howToUse={{
            filename: 'App.tsx',
            language: 'tsx',
            code: `// Chhote components se bada banate hain

interface ButtonProps {
  label: string
  onClick: () => void
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}

function LoginForm() {
  const handleLogin = () => {
    console.log('Login attempt...')
  }

  return (
    <form>
      <input placeholder="Email" />
      <input type="password" placeholder="Password" />
      <Button label="Login" onClick={handleLogin} /> {/* reuse! */}
    </form>
  )
}

function App() {
  return (
    <div>
      <Header />      {/* Header component */}
      <LoginForm />   {/* Form component */}
      <Footer />      {/* Footer component */}
    </div>
  )
}`,
            explanation: 'Dekho — Button sirf ek baar define kiya. LoginForm, SignupForm, DeleteModal — har jagah same Button reuse ho sakta hai. App component sirf orchestration hai — different sections ko ek saath compose karta hai. Har component apni zimmedari jaanta hai, baaki se independent hai.',
          }}
          realWorldScenario="Airbnb ki listing page dekho — PropertyCard component ek baar bana. Search results mein dikhta hai, Favorites section mein dikhta hai, Map popup mein dikhta hai. Teen jagah same component. Design change karna hua — ek jagah update karo PropertyCard.tsx — teeno jagah automatically reflect hoga. Ye component-based architecture ka business value hai."
          commonMistakes={[
            {
              mistake: 'Ek giant component mein sab kuch daalna — 500 line ka App.tsx',
              why: 'Testing impossible hoti hai, multiple devs kaam nahi kar sakte, bugs dhundna nightmare hota hai.',
              fix: 'Single Responsibility follow karo — jab component 100-150 lines se zyada ho jaaye, break karne ka time hai. Har logical UI section apna component deserve karta hai.',
            },
            {
              mistake: 'Component name lowercase se shuru karna — function button() instead of Button()',
              why: 'React lowercase components ko HTML tags samajhta hai. <button> = native HTML, <Button> = tumhara component.',
              fix: 'Hamesha PascalCase use karo: Button, UserCard, LoginForm, NavBar. Ye React ki hard requirement hai.',
            },
          ]}
          proTip="Single Responsibility Principle — ek component, ek kaam. Ye rule yaad rakho: agar tum apne component ka naam clearly ek line mein explain nahi kar sakte, toh probably wo do cheezein kar raha hai. Tod do usse. Chhote components test karna aasan hai, debug karna aasan hai, reuse karna aasan hai. Big components? Sab mushkil."
        />
      </div>

      {/* ConceptCard 4: React vs Others */}
      <div id="react-vs-others">
        <ConceptCard
          title="React vs Vue vs Angular vs Svelte"
          emoji="⚔️"
          difficulty="beginner"
          whatIsIt="Ye question bahut logo ke dimag mein hota hai — React choose karun ya Vue? Angular? Svelte? Ek cheez seedha bol deta hun: React ek library hai, framework nahi. Angular ek full opinionated framework hai — sab rules set karta hai. Vue bhi framework-ish hai. React sirf UI ke liye hai — router, state management — khud choose karo. Ye flexibility ek edge hai. Aur job market? React clearly #1 hai."
          whenToUse={[
            'React: Job market + ecosystem + React Native ke liye — best investment',
            'Vue: Agar simpler learning curve chahiye, smaller project mein',
            'Angular: Enterprise-grade apps jahan strict conventions chahiye',
            'Svelte: Performance-first projects, bundle size critical ho',
            'Next.js: Full-stack React app chahiye — SSR, SSG, API routes sab ek jagah',
          ]}
          whyUseIt="React kyun? Ek investment — multiple returns. React sikh liya toh React Native se mobile apps bana sakte ho, Next.js se full-stack web, React Native Web se cross-platform. Ek core concept — teen platforms. Ecosystem sabse bada hai — koi bhi problem ke liye library available hai. Job market mein React developer ki demand Angular ya Vue se kai guna zyada hai. Ye calculation simple hai."
          howToUse={{
            filename: 'comparison.txt',
            language: 'text',
            code: `Framework    | Learning   | Job Market | Size   | Approach
─────────────┼────────────┼────────────┼────────┼──────────────────
React        | Medium     | ⭐⭐⭐⭐⭐  | Medium | Library (UI only)
Vue          | Easy       | ⭐⭐⭐      | Small  | Framework
Angular      | Hard       | ⭐⭐⭐      | Large  | Full Framework
Svelte       | Easy       | ⭐⭐        | Tiny   | Compiler
Next.js      | Medium     | ⭐⭐⭐⭐    | Medium | Full-stack React

Job count (approx 2024):
React/Next  → 65,000+ jobs globally
Angular     → 25,000+ jobs globally
Vue         → 15,000+ jobs globally
Svelte      → 3,000+ jobs globally`,
            explanation: 'Numbers dekho — React job market mein clearly dominant hai. Angular enterprise mein strong hai, Vue Asia/Europe mein popular hai. Lekin agar ek choose karni hai career ke liye, React + Next.js sabse safe aur rewarding investment hai 2025 mein.',
          }}
          realWorldScenario="Meta, Airbnb, Netflix, Dropbox, Atlassian — sab React use karte hain. Aur ye sirf brand name nahi hai — in companies ki job postings dekhte ho, React everywhere hai. Ek baar React properly seekha toh ye sab companies ke interviews dene ki eligibility aa jaati hai. Ye return on investment calculate karo."
          commonMistakes={[
            {
              mistake: 'Framework wars mein time waste karna — Vue vs React vs Angular',
              why: 'Fundamentals same hain — components, state, reactivity. Deep dive karo ek mein, doosra seekhna easy hoga.',
              fix: 'React choose karo job market ke liye. Ek framework mein expert bano — surface level sab mein mat raho.',
            },
          ]}
          proTip="Framework wars mein time mat waste karo — 'React better hai ya Vue?' ye debate unproductive hai. Fundamentals same hain dono mein — components, state, reactivity. Ek mein deep jaao, dusra sikhna easy hoga. React choose karo — job market aur ecosystem ke numbers sabse strong hain. Ek mein master bano, surface level sab mein mat raho."
        />
      </div>

      {/* ConceptCard 5: Setup */}
      <div id="react-setup">
        <ConceptCard
          title="React Project Setup"
          emoji="⚡"
          difficulty="beginner"
          whatIsIt="Ek baat pehle clear karo — Create React App (CRA) use mat karo. Officially deprecated ho gaya hai. Bahut slow dev server, outdated webpack config — 2025 mein CRA use karna matlab apne aap ko peeche rakhna. Do choices hain: Vite (blazing fast dev server, pure frontend SPA ke liye) ya Next.js (full-stack, SSR/SSG, production-grade). Dono CRA se hazaar guna better hain."
          whenToUse={[
            'Vite + React: Pure frontend SPA — no server-side rendering needed',
            'Next.js: Full-stack app — API routes, SSR, SSG, metadata sab ek jagah',
            'Vite: Learning React, portfolio projects, internal tools',
            'Next.js: Production apps, SEO-critical sites, content sites',
          ]}
          whyUseIt="Vite kyun itna fast hai? CRA Webpack use karta tha — poora app bundle karke serve karta tha. Vite ES modules natively use karta hai browser mein — sirf jo file request ho wahi serve karo. Dev server start? 2-3 seconds. HMR? Near instant. CRA ka 30-60 second wait? Bhool jaao. Next.js ek complete solution hai — frontend, API routes, SSR, SSG, image optimization, built-in. Production apps ke liye Next.js best choice hai."
          howToUse={{
            filename: 'terminal',
            language: 'bash',
            code: `# Create React app with Vite (recommended for SPA)
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev

# OR Next.js for full-stack
npx create-next-app@latest my-app --typescript

# Vite project structure:
# src/
#   main.tsx       ← entry point (ReactDOM.createRoot here)
#   App.tsx        ← root component
#   components/    ← tumhare components
#   assets/        ← images, fonts, static files
#   index.css      ← global styles

# Next.js project structure:
# app/
#   layout.tsx     ← root layout
#   page.tsx       ← home page
#   globals.css    ← global styles
# components/      ← shared components
# public/          ← static files`,
            explanation: '--template react-ts TypeScript template setup karta hai. npm run dev se dev server port 5173 pe start hota hai — instant. Next.js mein app/ directory App Router hai — ye modern approach hai, purana pages/ router avoid karo new projects mein.',
          }}
          realWorldScenario="Aaj 2025 mein production React apps ya Next.js se Vercel pe deploy hoti hain, ya Vite build + separate Node/Express backend ke saath. CRA wali tutorials jo 2021-22 mein likhi hain — unhe follow karna avoid karo. Outdated setup, slow DX. New project? Hamesha Vite ya Next.js."
          commonMistakes={[
            {
              mistake: 'Create React App (CRA) use karna — npx create-react-app',
              why: 'CRA officially deprecated hai (React team ne officially recommend karna band kar diya), bahut slow dev server hai, aur outdated webpack config hai jo customize karna mushkil hai.',
              fix: 'Hamesha Vite (npm create vite@latest) ya Next.js (npx create-next-app@latest) use karo. Dono much better developer experience dete hain.',
            },
            {
              mistake: 'TypeScript skip karna — plain JavaScript se React sikhna',
              why: 'React + TypeScript industry standard hai. Props type karne se bugs compile time par pakde jaate hain, autocomplete better hoti hai.',
              fix: '--template react-ts use karo Vite ke saath ya --typescript use karo Next.js ke saath. Thoda extra seekhna hai lekin long-term bahut fayda hai.',
            },
          ]}
          proTip="Vite ka HMR (Hot Module Replacement) ek next-level feature hai — file save karo, browser near-instantly update hota hai. Aur sabse mast cheez? State preserve hoti hai HMR ke dauran. Maan lo counter pe 42 hai, file save kiya — component update hoga lekin count 42 hi rahega. Ye development loop itna fast banata hai ki productivity dramatically improve hoti hai."
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 1 Quiz — React Basics Check
          </h3>
          <p className="text-sm text-[#71717A]">
            Dekho kitna samjha — 5 questions, 80%+ chahiye pass ke liye!
          </p>
        </div>
        <QuizSection questions={reactIntroQuiz} chapterSlug="react-intro" />
      </div>
    </div>
  )
}
