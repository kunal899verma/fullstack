'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const jsxQuiz = [
  {
    question: 'JSX actually kya hai? Sahi description kaun si hai?',
    options: [
      {
        text: 'JSX ek naya programming language hai jo React ne banaya',
        correct: false,
        explanation: 'JSX koi alag language nahi hai. Ye JavaScript ka syntactic extension hai jo Babel/TypeScript compile karta hai.',
      },
      {
        text: 'JSX React.createElement() calls ka syntactic sugar hai — compiler ise pure JavaScript mein convert karta hai',
        correct: true,
        explanation: 'Bilkul sahi! JSX = syntactic sugar. <div className="x"> actually React.createElement("div", { className: "x" }) ban jaata hai compile hone ke baad. Browser directly JSX nahi samajhta.',
      },
      {
        text: 'JSX HTML ka updated version hai jo React browser mein run karta hai',
        correct: false,
        explanation: 'JSX HTML nahi hai. Ye JavaScript hai. Browser sirf HTML + JS samajhta hai — JSX compile hona zaroori hai.',
      },
      {
        text: 'JSX sirf styling ke liye use hota hai React mein',
        correct: false,
        explanation: 'JSX pura UI structure describe karta hai — elements, components, logic sab. Sirf styling nahi.',
      },
    ],
  },
  {
    question: 'JSX mein HTML ka "class" attribute kyun use nahi kar sakte?',
    options: [
      {
        text: 'React ne class support karna band kar diya security reasons se',
        correct: false,
        explanation: 'Security ka koi issue nahi hai. class ka issue JavaScript reserved keyword hona hai.',
      },
      {
        text: '"class" JavaScript ka reserved keyword hai isliye JSX mein className use karte hain',
        correct: true,
        explanation: 'Correct! JSX actually JavaScript hai. "class" JS mein reserved keyword hai (ES6 classes ke liye). Isliye React ne className use kiya — conflict avoid karne ke liye.',
      },
      {
        text: 'className zyada characters likhne padti hai isliye better hai',
        correct: false,
        explanation: 'Haha, nahi. className use karne ka reason language-level conflict avoid karna hai, convenience nahi.',
      },
      {
        text: 'class aur className dono work karte hain React mein',
        correct: false,
        explanation: 'class use karne par React warning deta hai aur styling apply nahi hoti properly. Sirf className use karo.',
      },
    ],
  },
  {
    question: 'JSX ke {} mein if statement kyun nahi chal sakta?',
    options: [
      {
        text: 'if statement React mein disabled hai security ke liye',
        correct: false,
        explanation: 'React ne if disable nahi kiya. Ye JavaScript expressions vs statements ka fundamental difference hai.',
      },
      {
        text: 'if statement chal sakta hai — bas syntax alag hota hai JSX mein',
        correct: false,
        explanation: 'Nahi, if statement JSX {} mein directly nahi chal sakta. {} sirf expressions accept karta hai, statements nahi.',
      },
      {
        text: 'JSX ke {} mein sirf expressions allowed hain (jo value return karte hain), if statements expressions nahi hain',
        correct: true,
        explanation: 'Bilkul sahi! Expressions = kuch value return karta hai (ternary, function call, variable). Statements = sirf execute hote hain (if/else, for, while) — koi value return nahi. JSX {} mein expressions chahiye.',
      },
      {
        text: 'TypeScript mein if statement chal sakta hai, plain JavaScript mein nahi',
        correct: false,
        explanation: 'Ye TypeScript vs JavaScript ka issue nahi hai. Dono mein same rule hai — {} mein expressions, statements nahi.',
      },
    ],
  },
  {
    question: 'Fragment kyun use karte hain wrapper div ke jagah?',
    options: [
      {
        text: 'Fragment faster hota hai div se — always prefer karo',
        correct: false,
        explanation: 'Performance difference negligible hai. Fragment ka main reason extra DOM node avoid karna hai jo styling issues cause kar sakti hai.',
      },
      {
        text: 'Fragment extra DOM node nahi banata — parent-child CSS relationships preserve hoti hain, aur DOM clean rehta hai',
        correct: true,
        explanation: 'Sahi! Extra div wrap karna layout tod sakta hai — especially flexbox/grid mein. Fragment (<> </>) parent element without adding DOM node deta hai.',
      },
      {
        text: 'Fragment sirf TypeScript mein available hai',
        correct: false,
        explanation: 'Fragment React ka feature hai, TypeScript ka nahi. Dono plain JS aur TypeScript mein kaam karta hai.',
      },
      {
        text: 'Fragment use karna required hai JSX mein — bina iske error aata hai',
        correct: false,
        explanation: 'Fragment required nahi hai — div ya koi bhi element use kar sakte ho. Fragment optional hai cleaner DOM ke liye.',
      },
    ],
  },
  {
    question: '{0 && <Component />} kya render karega?',
    options: [
      {
        text: 'Kuch nahi — 0 falsy hai isliye Component render nahi hoga',
        correct: false,
        explanation: 'Ye common misconception hai! JavaScript mein 0 falsy hai but JSX mein 0 render hota hai ek text node ke roop mein. Screen par "0" dikhega.',
      },
      {
        text: '"0" — screen par zero dikhega kyunki JSX mein 0 render hota hai even if falsy',
        correct: true,
        explanation: 'Correct! React sab falsy values render nahi karta (false, null, undefined render nahi hote) lekin 0 (number) render hota hai. Isliye {count && <Component />} dangerous hai agar count 0 ho sakta hai.',
      },
      {
        text: 'true — 0 React mein truthy treat hota hai',
        correct: false,
        explanation: 'Nahi, 0 React mein bhi falsy hai, lekin isliye Component nahi aata — 0 itself render hota hai.',
      },
      {
        text: 'Error aata hai — 0 && invalid syntax hai',
        correct: false,
        explanation: 'Koi error nahi aata. Ye valid JSX hai. Bas unexpected output aata hai — "0" screen par.',
      },
    ],
  },
]

// ── Main Export ───────────────────────────────────────────────────────────────

export default function ReactChapter2Content() {
  return (
    <div className="space-y-8">
      {/* Chapter Intro */}
      <div>
        <h1 className="text-4xl font-display font-bold text-[#F5F5F7] mb-3">
          JSX — HTML in JavaScript? 🤯
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          React mein jo HTML jaisi cheez likhte ho — woh actually JavaScript hai. Browser directly JSX nahi samajhta. Babel/TypeScript compiler use karta hai ise React.createElement() calls mein convert karne ke liye.
        </p>
      </div>

      {/* ConceptCard 1: JSX Kya Hai Actually? */}
      <div id="jsx-what-is">
        <ConceptCard
          title="JSX — Syntactic Sugar"
          emoji="🍬"
          difficulty="beginner"
          whatIsIt="JSX = JavaScript XML. Ye React.createElement() ka shorthand hai. Browser directly JSX nahi samajhta — Babel/tsc ise compile karta hai pure JS mein. Jo tum likhte ho aur jo browser dekhta hai — dono alag hain."
          whenToUse={[
            'Hamesha React mein JSX use karo — ye standard hai aur zyada readable hai',
            'React.createElement() directly tab use karo jab JSX not available ho (rare case)',
            'JSX samajhna zaroori hai debugging ke liye — error stack traces mein compiled output dikhta hai',
          ]}
          whyUseIt="JSX bina React.createElement() baar baar likhne ki zaroorat nahi. Visual representation bahut clearer hoti hai — nested UI JSX mein tree structure jaisi dikhti hai, createElement calls mein nahi. Yahi reason hai ki React ne JSX adopt kiya aur poora ecosystem follow kiya."
          howToUse={{
            filename: 'jsx-compiled.tsx',
            language: 'tsx',
            code: `// Jo tum likhte ho (JSX):
const element = (
  <div className="greeting">
    <h1>Hello {name}!</h1>
    <p>Welcome to React</p>
  </div>
)

// Jo compiler banata hai (pure JS):
const element = React.createElement(
  'div',
  { className: 'greeting' },
  React.createElement('h1', null, 'Hello ', name, '!'),
  React.createElement('p', null, 'Welcome to React')
)

// Dono same output dete hain
// JSX sirf readability ke liye hai`,
            explanation: 'JSX compile hone ke baad React.createElement() calls ban jaate hain. Isliye JSX mein ek root element zaroori hota hai — createElement single element return karta hai. Ye samajhna important hai errors debug karte waqt.',
          }}
          realWorldScenario="Jab tum React DevTools mein component tree dekhte ho, ya error stack trace mein compiled code hota hai — tab JSX ke compiled output ko samajhna bahut kaam aata hai. 'Cannot read properties of undefined' error mein compiled createElement call indicate karta hai kahan issue hai."
          commonMistakes={[
            {
              mistake: 'Sochna ki JSX HTML hai — HTML attributes use karna jaise class, for, onclick',
              why: 'JSX JavaScript hai, HTML nahi. HTML attribute names JS mein reserved words hain ya camelCase nahi hain.',
              fix: 'JSX attributes: className (not class), htmlFor (not for), onClick (not onclick), onChange (not onchange).',
            },
          ]}
          proTip="React 17+ se 'import React from react' component files mein zaroor nahi — new JSX transform automatically handle karta hai. Purani tutorials mein ye import dikhega — modern projects mein skip kar sakte ho (tsconfig mein jsx: 'react-jsx' hona chahiye)."
          demo={
            <DiffBlock
              language="jsx"
              title="JSX vs Compiled Output"
              bad={{
                label: 'JSX (jo tum likhte ho)',
                code: `const element = (
  <div className="greeting">
    <h1>Hello {name}!</h1>
    <p>Welcome to React</p>
  </div>
)`,
                explanation: 'Readable, declarative — HTML jaisi structure clearly dikhti hai.',
              }}
              good={{
                label: 'Compiled JS (jo browser dekhta hai)',
                code: `const element = React.createElement(
  'div',
  { className: 'greeting' },
  React.createElement('h1', null, 'Hello ', name, '!'),
  React.createElement('p', null, 'Welcome to React')
)`,
                explanation: 'Yahi actually run hota hai. JSX sirf isko likhna easy banata hai.',
              }}
            />
          }
        />
      </div>

      {/* ConceptCard 2: JSX Rules */}
      <div id="jsx-rules">
        <ConceptCard
          title="JSX Ke Rules — Yaad Rakhna"
          emoji="📜"
          difficulty="beginner"
          whatIsIt="JSX ke kuch strict rules hain jo HTML se alag hain. Ye rules isliye hain kyunki JSX actually JavaScript hai — HTML attribute names Jo JS reserved words hain, unhe rename karna pada. Ye rules ek baar yaad kar lo, phir automatic ho jaata hai."
          whenToUse={[
            'Har JSX file mein ye rules apply hote hain — koi exception nahi',
            'ESLint + react plugin in rules ko automatically catch karta hai',
            'TypeScript bhi in errors ko compile time par pakadta hai',
          ]}
          whyUseIt="JSX rules JavaScript ke saath coexist karne ke liye hain. class JS mein ES6 class keyword hai — conflict avoid karne ke liye className. for JS mein loop keyword hai — htmlFor. camelCase isliye ki JS naming convention follow ho. Ek baar samajh gaye toh automatic ho jaata hai."
          howToUse={{
            filename: 'jsx-rules.tsx',
            language: 'tsx',
            code: `// Rule 1: className, not class
<div className="container">  {/* ✅ */}
// <div class="container">  ← ❌ React warning

// Rule 2: htmlFor, not for
<label htmlFor="email">Email</label>  {/* ✅ */}
// <label for="email">Email</label>  ← ❌

// Rule 3: camelCase event handlers
<input
  onClick={handleClick}    {/* ✅ */}
  onChange={handleChange}  {/* ✅ */}
  onKeyDown={handleKey}    {/* ✅ */}
/>
// onclick={} onchange={} ← ❌

// Rule 4: Self-closing tags required
<img src="logo.png" alt="Logo" />  {/* ✅ */}
<br />                              {/* ✅ */}
<input type="text" />               {/* ✅ */}
// <br> ← ❌ JSX mein self-close zaroori hai

// Rule 5: One root element
function Component() {
  return (
    <div>             {/* ✅ Single root */}
      <h1>Hello</h1>
      <p>World</p>
    </div>
  )
  // return (         ← ❌ Two roots
  //   <h1>Hello</h1>
  //   <p>World</p>
  // )
}

// Rule 5 alternative: Fragment
function Component() {
  return (
    <>                {/* ✅ Fragment — no extra DOM node */}
      <h1>Hello</h1>
      <p>World</p>
    </>
  )
}`,
            explanation: 'Ye rules memorize karo: className, htmlFor, camelCase events, self-closing tags, ek root element. ESLint react/recommended in sabko catch karta hai automatically — project mein setup karo.',
          }}
          realWorldScenario="Naye developer ne legacy HTML template React mein paste kiya — class, for, onclick sab wrong. Ye common onboarding issue hai. Solution: VSCode ka ES7+ React snippets extension aur ESLint automatically correct suggestions deta hai. Ek baar setup karo, phir manually yaad karna nahi padta."
          commonMistakes={[
            {
              mistake: 'class instead of className use karna',
              why: '"class" JavaScript mein ES6 class declaration ka keyword hai. JSX mein use karne par React warning dega aur CSS apply nahi hogi.',
              fix: 'Find & Replace karo: class=" → className=" (VS Code mein Ctrl+H). Ya ESLint jsx-a11y plugin automatically catch karta hai.',
            },
            {
              mistake: 'HTML void elements ko self-close nahi karna — <br>, <img>, <input>',
              why: 'JSX strict XML rules follow karta hai — har element properly closed hona chahiye. <br> error deta hai, <br /> correct hai.',
              fix: 'Hamesha self-close karo: <img />, <br />, <input />, <hr />. TypeScript + React type definitions ye automatically enforce karte hain.',
            },
          ]}
          proTip="VSCode mein Emmet JSX ke liye already configured hai. div.container Tab dabao → <div className='container'></div> ban jaata hai automatically. Ye JSX rules automatic handle karta hai. Settings mein 'emmet.includeLanguages': { 'typescriptreact': 'html' } add karo."
        />
      </div>

      {/* ConceptCard 3: Expressions in JSX */}
      <div id="jsx-expressions">
        <ConceptCard
          title="{} Mein Kya Dal Sakte Ho?"
          emoji="🧮"
          difficulty="beginner"
          whatIsIt="JSX ke {} mein tum JavaScript expressions dal sakte ho — variables, function calls, ternary operators, .map(). Lekin statements (if/else, for loops, while) nahi chal sakte. Expression = kuch value return karta hai. Statement = sirf execute hota hai."
          whenToUse={[
            'Dynamic values dikhane ke liye — user name, price, count',
            'Conditional rendering ke liye — ternary ya && operator',
            'Lists render karne ke liye — .map() se array to JSX',
            'Dynamic attributes ke liye — src, href, className',
            'Inline styles ke liye — style={{ color: "red" }}',
          ]}
          whyUseIt="{} ka power ye hai ki tum JavaScript poori taaqat JSX mein le aa sakte ho — calculations, transformations, conditional logic sab. Ye React ko template literals jaise feel deta hai lekin full JavaScript power ke saath. JSX aur JS ka seamless integration hi React ko itna flexible banata hai."
          howToUse={{
            filename: 'expressions.tsx',
            language: 'tsx',
            code: `const name = "Rahul"
const isLoggedIn = true
const price = 1499
const items = ['Apple', 'Mango', 'Banana']

function Component() {
  return (
    <div>
      {/* ✅ Variable */}
      <h1>Hello {name}!</h1>

      {/* ✅ Arithmetic */}
      <p>Tax: ₹{price * 0.18}</p>

      {/* ✅ Ternary — conditional rendering */}
      <p>{isLoggedIn ? "Welcome!" : "Please login"}</p>

      {/* ✅ && — show or nothing */}
      {isLoggedIn && <UserMenu />}

      {/* ✅ Function call */}
      <p>{new Date().toLocaleDateString('hi-IN')}</p>

      {/* ✅ .map() — list rendering */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* ✅ Dynamic attributes */}
      <img src={user.avatar} alt={user.name} />

      {/* ✅ Inline style — double curly! */}
      <div style={{ color: 'red', fontSize: 16 }}>
        Styled text
      </div>

      {/* ❌ These DON'T work */}
      {/* {if (condition) { return <div /> }} */}
      {/* {for (let i=0; i<5; i++) { ... }} */}
    </div>
  )
}`,
            explanation: 'Yaad rakho: {} mein expressions — jo kuch value return kare. if/for statements nahi chal sakti. Conditional ke liye ternary (?:) use karo. Loops ke liye .map() use karo. Style prop mein double {{}} — bahar wala JSX expression ke liye, andar wala JS object ke liye.',
          }}
          realWorldScenario="E-commerce product page mein — product name (variable), price with discount calculation (arithmetic), stock status (ternary), product images (dynamic src), related products (map) — sab kuch {} mein expressions se aata hai. Ye sab ek component mein cleanly handle ho jaata hai."
          commonMistakes={[
            {
              mistake: '{if (condition) { return <Component /> }} use karna',
              why: 'if statement JSX ke andar {} mein expression nahi hai — ye statement hai. Compile error aata hai.',
              fix: 'Ternary use karo: {condition ? <Component /> : null}. Ya early return pattern use karo function body mein.',
            },
            {
              mistake: "style='color: red' — string style use karna",
              why: 'JSX mein style prop object expect karta hai, string nahi. HTML ka style="" syntax JSX mein kaam nahi karta.',
              fix: "style={{ color: 'red', fontSize: 16 }} — object syntax use karo. CSS property names camelCase mein likhte hain (fontSize nahi font-size).",
            },
          ]}
          proTip="Style prop mein object dena padta hai: style={{color: 'red'}} — double curly braces: outer {} JSX expression ke liye hai, inner {} JavaScript object literal ke liye. Aur CSS property names camelCase mein hote hain JSX mein — backgroundColor nahi background-color, borderRadius nahi border-radius."
        />
      </div>

      {/* ConceptCard 4: Fragments */}
      <div id="jsx-fragments">
        <ConceptCard
          title="Fragment — Unnecessary div Se Bachao"
          emoji="🧩"
          difficulty="beginner"
          whatIsIt="Fragment React ka special component hai jo koi DOM element nahi banata. JSX mein single root required hai — Fragment ye requirement fulfill karta hai bina extra <div> add kiye. Ye DOM ko clean rakhta hai aur CSS layout issues prevent karta hai."
          whenToUse={[
            'Jab multiple elements return karni ho bina wrapper div ke',
            'Table structure mein — <tr> ke andar extra div add nahi kar sakte',
            'Flexbox/Grid layout mein — extra div layout tod sakta hai',
            'Ek list ke multiple items return karne ke liye jab key prop chahiye',
          ]}
          whyUseIt="Extra div wrapper kuch situations mein layout tod deta hai. Flexbox mein ek extra div flex container ke direct children ki count badha deta hai. Table mein <tr> ke andar sirf <td>/<th> chahiye — div invalid hai. Fragment in sab situations mein clean solution hai."
          howToUse={{
            filename: 'fragments.tsx',
            language: 'tsx',
            code: `import React, { Fragment } from 'react'

// ❌ Extra div — layout issues possible
function BadExample() {
  return (
    <div>          {/* ← unnecessary wrapper */}
      <h1>Title</h1>
      <p>Content</p>
    </div>
  )
}

// ✅ Short syntax Fragment
function GoodExample() {
  return (
    <>
      <h1>Title</h1>
      <p>Content</p>
    </>
  )
}

// ✅ Named Fragment — jab key prop chahiye (lists mein)
function ListItems({ items }: { items: { id: number; name: string; desc: string }[] }) {
  return (
    <>
      {items.map((item) => (
        <Fragment key={item.id}>  {/* key sirf named Fragment pe */}
          <dt>{item.name}</dt>
          <dd>{item.desc}</dd>
        </Fragment>
      ))}
    </>
  )
}

// ✅ Table example — extra div invalid hai
function TableRows({ data }: { data: string[][] }) {
  return (
    <>
      {data.map((row, i) => (
        <tr key={i}>
          {row.map((cell, j) => (
            <td key={j}>{cell}</td>
          ))}
        </tr>
      ))}
    </>
  )
}`,
            explanation: 'Short syntax <></> kaafi hai zyatar cases mein. Jab list mein multiple elements return karne ho aur key prop chahiye, tab <Fragment key={id}> use karo — <> shorthand mein key prop nahi de sakte.',
          }}
          realWorldScenario="Definition list (<dl>) component mein — har item ke liye <dt> (term) aur <dd> (description) pair chahiye. Inhe ek div mein wrap nahi kar sakte kyunki dl ke direct children sirf dt/dd hone chahiye. Fragment perfect solution hai — pair ko saath rakhta hai bina invalid HTML banaye."
          commonMistakes={[
            {
              mistake: '<> shorthand mein key prop dene ki koshish karna — <key={id}>',
              why: '<> shorthand React.Fragment ka compiled form hai lekin props accept nahi karta. key prop required hota hai list mein unique identification ke liye.',
              fix: 'Named Fragment use karo: import { Fragment } from "react" phir <Fragment key={item.id}>...</Fragment>.',
            },
          ]}
          proTip="React DevTools mein Fragment koi DOM element show nahi karta — Chrome/Firefox extension install karo aur Component tree mein dekho. Fragment transparent hota hai — uske children directly parent ke children dikhte hain. Isse DOM inspector mein extra nesting nahi hoti."
        />
      </div>

      {/* ConceptCard 5: Conditional Rendering */}
      <div id="conditional-rendering">
        <ConceptCard
          title="Conditional Rendering — 3 Patterns"
          emoji="🔀"
          difficulty="beginner"
          whatIsIt="React mein UI conditionally show karne ke 3 main patterns hain: ternary operator, && (logical AND), aur early return. Har pattern ka apna use case hai. Inhe samajhna zaroori hai kyunki real-world apps mein 90% UI conditions par depend karta hai."
          whenToUse={[
            'Ternary: Jab do alag UI states hoon — logged in vs logged out, loading vs content',
            '&&: Jab sirf ek cheez conditionally show karni ho — error message, badge, tooltip',
            'Early return: Jab component completely alag output deta ho ek condition mein',
            'if/else in function body: Complex conditions ke liye readable approach',
          ]}
          whyUseIt="JSX mein if statements directly nahi chal sakte (statements hain, expressions nahi). Isliye React developers ne ternary, &&, early return patterns adopt kiye. Har ek different readability aur use case deta hai — sahi pattern choose karna code cleaner banata hai."
          howToUse={{
            filename: 'conditional-rendering.tsx',
            language: 'tsx',
            code: `interface Props {
  isLoading: boolean
  hasError: boolean
  error?: string
  count: number
  user: { name: string } | null
}

function Dashboard({ isLoading, hasError, error, count, user }: Props) {

  // Pattern 3: Early return — cleanest for loading/error states
  if (isLoading) return <Spinner />
  if (hasError) return <ErrorPage message={error} />

  return (
    <div>
      {/* Pattern 1: Ternary — two different outcomes */}
      {user
        ? <h1>Welcome, {user.name}!</h1>
        : <h1>Please login</h1>
      }

      {/* Pattern 2: && — show or nothing */}
      {hasError && <ErrorMessage message={error} />}

      {/* ⚠️ Dangerous — 0 renders as "0" */}
      {count && <Badge count={count} />}

      {/* ✅ Safe version */}
      {count > 0 && <Badge count={count} />}

      {/* ✅ Also safe */}
      {Boolean(count) && <Badge count={count} />}
    </div>
  )
}`,
            explanation: 'Early return sabse clean hai loading/error ke liye — zyada nesting nahi. Ternary ? : do options ke liye. && ek optional UI ke liye. Lekin && ke saath number 0 ka dhyan rakho — safetyके liye count > 0 use karo.',
          }}
          realWorldScenario="Dashboard app mein — data fetch ho raha hai (loading spinner), fetch fail hua (error page), user logged out hai (login redirect), data empty hai (empty state), data hai (main content). Ye saare states different UI chahte hain. Early return + ternary + && combination se sab cleanly handle hota hai."
          commonMistakes={[
            {
              mistake: '{count && <Component />} — count 0 hone par "0" render hota hai screen par',
              why: 'JavaScript mein 0 falsy hai lekin React 0 (number) ko render karta hai text node ke roop mein. false, null, undefined render nahi hote, lekin 0 hota hai.',
              fix: '{count > 0 && <Component />} use karo. Ya {Boolean(count) && <Component />}. Ya ternary: {count ? <Component /> : null}.',
            },
            {
              mistake: 'Deeply nested ternaries — ternary ke andar ternary likhna',
              why: "Readable nahi hota: {a ? (b ? <X /> : <Y />) : <Z />} — samajhna mushkil, debug karna aur bhi mushkil.",
              fix: "Component extract karo ya if/else function body mein use karo aur result variable mein store karo: const content = isLoading ? <Spinner /> : <Data />.",
            },
          ]}
          proTip="Nullish rendering trick: agar tum kabhi bhi null render karna chahte ho (kuch mat dikhao), toh sirf {null} ya {false} return karo — React kuch render nahi karega. Ye pattern useful hai jab conditionally poora section hide karna ho bina layout change kiye."
          demo={
            <DiffBlock
              language="tsx"
              title="Conditional Rendering Patterns"
              bad={{
                label: '⚠️ Dangerous — 0 ka bug',
                code: `// count = 0 hone par "0" dikhega!
{count && <Badge count={count} />}

// Nested ternary — unreadable
{isLoading
  ? <Spinner />
  : hasError
    ? <Error />
    : <Content />}`,
                explanation: '0 falsy hai lekin render hota hai. Nested ternary confusing hai.',
              }}
              good={{
                label: '✅ Safe Pattern',
                code: `// Safe — count > 0 check
{count > 0 && <Badge count={count} />}

// Early return — cleaner
if (isLoading) return <Spinner />
if (hasError) return <Error />
return <Content />`,
                explanation: 'Explicit comparison se 0 bug avoid hota hai. Early return se nesting avoid hoti hai.',
              }}
            />
          }
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 2 Quiz — JSX Mastery Check
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — JSX ke sab rules yaad hain? Proof karo!
          </p>
        </div>
        <QuizSection questions={jsxQuiz} chapterSlug="jsx" />
      </div>
    </div>
  )
}
