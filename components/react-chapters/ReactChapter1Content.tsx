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
          2013 mein Facebook ne React release kiya. Aaj duniya ka sabse popular UI framework. Kaise kaam karta hai? Samjho.
        </p>
        <div
          className="rounded-xl p-4 mb-8"
          style={{
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.3)',
          }}
        >
          <p className="text-[#67E8F9] text-sm">
            &ldquo;Describe karo UI kya hona chahiye — React update karenge.&rdquo; Ye ek line React ka pura philosophy hai.
          </p>
        </div>
      </div>

      {/* ConceptCard 1: Problem React Solves */}
      <div id="problem-react-solves">
        <ConceptCard
          title="Problem Jo React Ne Solve Kiya"
          emoji="😤"
          difficulty="beginner"
          whatIsIt="Vanilla JS mein DOM manually manipulate karna padta tha. State change hoti — tum manually querySelector, innerHTML update karte. 10 components, 50 state changes — sab manually. React ne kaha: 'State describe karo, hum DOM update karenge.'"
          whenToUse={[
            'Complex UI with lots of state — jahan multiple parts ek saath update hoti hain',
            'Team-based development — components clearly separated hoti hain, merge conflicts kam',
            'SPAs (Single Page Applications) — no full page reload, smooth navigation',
            'Jab reusable components chahiye — ek baar likho, hazaar jagah use karo',
          ]}
          whyUseIt="React ka declarative model mean: tum WHAT describe karte ho (UI kya dikhna chahiye), HOW ka kaam React karta hai (DOM updates). Vanilla JS mein tum har jagah manually DOM pe operations karte — React isme consistency aur predictability laata hai. Ek state variable badli, aur React khud figure karta hai kya update karna hai."
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
            explanation: 'useState hook se state declare karo. setCount call karo — React khud jaanta hai ki count wali <p> tag update karni hai. Tum sirf state manage karo, DOM React manage karega.',
          }}
          realWorldScenario="Facebook News Feed — hundreds of posts, real-time likes, comments updating — vanilla JS se maintain karna impossible tha. Ek like click karta hai, manually har element update karo? React ne ye solve kiya — state update karo, UI automatically sync hoti hai."
          commonMistakes={[
            {
              mistake: 'React mein directly DOM manipulate karna — document.getElementById(), innerHTML use karna',
              why: 'React ka rendering cycle break hota hai. React apna Virtual DOM maintain karta hai — agar tum seedha real DOM change karo, React confuse ho jaata hai aur unexpected behavior hoti hai.',
              fix: 'useState aur useRef use karo DOM access ke liye. State ke through UI update karo, direct DOM manipulation se bachao.',
            },
          ]}
          proTip="React 'unidirectional data flow' follow karta hai — data hamesha parent se child ko jaata hai (props). Ye predictability deta hai: ek bug hai toh jaante ho upar se neeche track karo, koi bi-directional confusion nahi."
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
          whatIsIt="Virtual DOM React ka in-memory representation hai real DOM ka. State change → React Virtual DOM update karta hai (fast, JS object) → 'diffing' se find karta hai kya change hua → sirf wo part real DOM update karta hai. Ye 'reconciliation' hai."
          whenToUse={[
            'Frequent state updates wali apps — like dashboards, live feeds',
            'Jab performance optimize karna ho — React.memo, useMemo ke saath',
            'Complex conditional rendering — React efficiently handle karta hai',
            'Large lists — React.key prop se React specific items ko track karta hai',
          ]}
          whyUseIt="Virtual DOM ka faida ye hai ki real DOM manipulation expensive hoti hai — har DOM change browser ko reflow aur repaint karne par majboor karta hai. Virtual DOM mein changes fast hain (JavaScript objects), phir ek batch mein real DOM update hota hai. Ye batching aur diffing React ko efficient banata hai."
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
            explanation: 'Jab score update hota hai, React poora component re-render nahi karta real DOM mein. Sirf jo change hua — wahi part real DOM mein update hota hai. Name heading wala DOM node untouched rehta hai.',
          }}
          realWorldScenario="Twitter/X ka timeline — naya tweet aata hai, sirf wahi item insert hoti hai top par. Ye Virtual DOM ka kaam hai — poora list re-render nahi hota real DOM mein, sirf new element add hoti hai. Isliye scrolling smooth rehti hai."
          commonMistakes={[
            {
              mistake: 'Virtual DOM always fastest hai — ye myth hai',
              why: 'Virtual DOM overhead add karta hai — in-memory tree maintain karna, diffing calculate karna. Small, static apps mein vanilla JS faster ho sakta hai.',
              fix: 'React use karo DX (developer experience) aur scalability ke liye, raw performance ke liye nahi. Micro-benchmarks mein vanilla JS jeet sakta hai lekin real-world complex apps mein React ka model win karta hai.',
            },
          ]}
          proTip="React 18 ka Concurrent Mode aur React Fiber reconciler bahut smarter hai — urgent updates (user input) ko non-urgent (network data) se pehle process karta hai. Ye 'Time Slicing' hai — React kaam ko chhote chunks mein tod ke browser ko breathe karne deta hai."
          demo={<VDOMDiagram />}
        />
      </div>

      {/* ConceptCard 3: Component-Based Architecture */}
      <div id="component-model">
        <ConceptCard
          title="Component Model — Lego Blocks"
          emoji="🧱"
          difficulty="beginner"
          whatIsIt="Har React app components ka tree hai. Component = isolated UI piece with its own logic + UI. Button → Form → Section → Page → App. Compose karo chhote se bade pieces. Ek baar likha Button kahin bhi use ho sakta hai — reusability React ka superpower hai."
          whenToUse={[
            'UI ka koi bhi part jo repeat hota ho — Button, Card, Modal, Input',
            'Jab ek UI section ka apna state aur behavior ho',
            'Team mein kaam karte waqt — har developer alag component par kaam kar sakta hai',
            'Jab testing chahiye — isolated components easily unit test hote hain',
          ]}
          whyUseIt="Components = separation of concerns. Har component apna kaam karta hai, apni state rakhta hai, apna UI render karta hai. Ek bug Button mein hai — Button component dekho, poori app nahi. Ek feature add karna hai — naya component banao, existing mein plug karo. Yahi maintainability ka matlab hai."
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
            explanation: 'Button ek baar define kiya — LoginForm, SignupForm, DeleteModal — har jagah reuse karo. App component sirf composition hai — different sections ko ek saath jodta hai. Har component apni responsibility jaanta hai.',
          }}
          realWorldScenario="Airbnb ki listing page mein — PropertyCard component ek baar bana, search results mein, favorites mein, map popup mein sab jagah reuse hota hai. Design change karna ho — sirf PropertyCard.tsx update karo, poori app reflect hogi. Ye component model ki power hai."
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
          proTip="Single Responsibility Principle: ek component ek kaam. Agar component zyada lamba hai ya multiple unrelated things kar raha hai, break karo. A good rule: agar tum component ka naam clearly explain nahi kar sakte ek line mein, probably wo do cheezein kar raha hai."
        />
      </div>

      {/* ConceptCard 4: React vs Others */}
      <div id="react-vs-others">
        <ConceptCard
          title="React vs Vue vs Angular vs Svelte"
          emoji="⚔️"
          difficulty="beginner"
          whatIsIt="React sirf ek library hai (UI rendering ke liye) — framework nahi. Vue aur Angular full framework hain. Svelte ek compiler hai. Har ek ka apna philosophy hai. Job market aur ecosystem ke hisaab se React clearly lead karta hai 2024 mein."
          whenToUse={[
            'React: Job market + ecosystem + React Native ke liye — best investment',
            'Vue: Agar simpler learning curve chahiye, smaller project mein',
            'Angular: Enterprise-grade apps jahan strict conventions chahiye',
            'Svelte: Performance-first projects, bundle size critical ho',
            'Next.js: Full-stack React app chahiye — SSR, SSG, API routes sab ek jagah',
          ]}
          whyUseIt="React choose karo kyunki: sabse bada job market hai, sabse bada ecosystem hai (thousands of libraries), Meta + vercel + community actively maintain karta hai, aur React sikhne ke baad React Native, Next.js, React Native Web sab tumhare reach mein hain. Ek investment — multiple platforms."
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
            explanation: 'React clearly job market lead karta hai. Angular enterprise mein strong hai. Vue Europe mein popular hai. Svelte niche hai lekin growing. Agar career ke liye seekh rahe ho — React + Next.js best bet hai.',
          }}
          realWorldScenario="Imagine karo: Meta (Facebook, Instagram, WhatsApp Web), Airbnb, Netflix, Dropbox, Atlassian — sab React use karte hain. Ye adoption ek reason se hai — React ka model scalable, maintainable aur flexible hai. Ek baar React seekha — in sab companies mein interviews de sakte ho."
          commonMistakes={[
            {
              mistake: 'Framework wars mein time waste karna — Vue vs React vs Angular',
              why: 'Fundamentals same hain — components, state, reactivity. Deep dive karo ek mein, doosra seekhna easy hoga.',
              fix: 'React choose karo job market ke liye. Ek framework mein expert bano — surface level sab mein mat raho.',
            },
          ]}
          proTip="React sikhna = React Native bhi (mobile apps), Next.js bhi (full-stack), Remix bhi, React Native Web bhi. Ek core investment — bahut saare doors khul jaate hain. Yahi React ka real value proposition hai 2024 mein."
        />
      </div>

      {/* ConceptCard 5: Setup */}
      <div id="react-setup">
        <ConceptCard
          title="React Project Setup"
          emoji="⚡"
          difficulty="beginner"
          whatIsIt="React project shuru karne ke do main tarike hain: Vite (fast dev server, pure frontend) ya Next.js (full-stack, SSR/SSG). Create React App officially deprecated hai — use mat karo. Vite dev server HMR (Hot Module Replacement) ke saath bahut fast hai."
          whenToUse={[
            'Vite + React: Pure frontend SPA — no server-side rendering needed',
            'Next.js: Full-stack app — API routes, SSR, SSG, metadata sab ek jagah',
            'Vite: Learning React, portfolio projects, internal tools',
            'Next.js: Production apps, SEO-critical sites, content sites',
          ]}
          whyUseIt="Vite Rollup par based hai — ES modules natively use karta hai browser mein. Result: nearly instant dev server start (2-3 seconds vs CRA ka 30-60 seconds), ultra-fast HMR. Next.js full-stack power deta hai — ek project mein frontend + backend + deployment (Vercel). Modern React development ka standard hai."
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
            explanation: 'Vite mein --template react-ts TypeScript template use karta hai. npm run dev se dev server start hota hai usually port 5173 par. Next.js mein app/ directory App Router use karti hai (modern approach).',
          }}
          realWorldScenario="Production mein aaj zyatar React apps ya Next.js (Vercel pe deploy), ya Vite + separate backend (Node.js/Express) ke saath deploy hoti hain. Create React App wali purani tutorials avoid karo — wo outdated hain aur slow dev experience deti hain."
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
          proTip="Vite dev server HMR (Hot Module Replacement) bahut fast hai — file save karo, instantly browser update. State bhi preserve hoti hai HMR ke dauran (jab React component update hota hai toh state reset nahi hoti). Ye development loop bahut fast bana deta hai."
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
