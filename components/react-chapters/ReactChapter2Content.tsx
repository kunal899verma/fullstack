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

// ── Chapter Overview Diagram ───────────────────────────────────────────────────

function JsxTransformDiagram() {
  const items = [
    {
      label: 'JSX Syntax',
      sublabel: '<div className="x"><h1>{name}</h1></div>',
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.1)',
      border: 'rgba(6,182,212,0.3)',
      icon: '✍️',
    },
    {
      label: 'Babel / SWC Transforms',
      sublabel: 'Compiler converts JSX to plain JavaScript at build time',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.1)',
      border: 'rgba(124,58,237,0.3)',
      icon: '⚙️',
    },
    {
      label: 'React.createElement() Calls',
      sublabel: 'React.createElement("div", { className: "x" }, React.createElement("h1", null, name))',
      color: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
      border: 'rgba(16,185,129,0.3)',
      icon: '🔧',
    },
    {
      label: 'Virtual DOM Object',
      sublabel: 'Lightweight JS object — { type: "div", props: { className: "x" }, children: [...] }',
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.1)',
      border: 'rgba(6,182,212,0.3)',
      icon: '🌳',
    },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">JSX Transform Pipeline — Syntactic Sugar in Action</p>
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
          Ruko — JSX HTML nahi hai. Ye bahut logo ki galti hai. JSX actually JavaScript hai jo HTML jaisi dikhti hai. Browser JSX directly nahi samajhta — Babel ya TypeScript compiler ise pure JavaScript mein convert karta hai. Jab tum {'<div className="x">'} likhte ho, compiler ise React.createElement('div', {'{ className: "x" }'}) bana deta hai. Ye samajhna zaroori hai — tab JSX ke rules automatic sense karenge.
        </p>
      </div>

      <JsxTransformDiagram />

      {/* ConceptCard 1: JSX Kya Hai Actually? */}
      <div id="jsx-what-is">
        <ConceptCard
          title="JSX — Syntactic Sugar"
          emoji="🍬"
          difficulty="beginner"
          whatIsIt="JSX ka full form hai JavaScript XML. Ye sirf ek shorthand hai React.createElement() calls ke liye — kuch nahin zyada, kuch nahin kam. Browser directly JSX nahi samajhta — Babel ya TypeScript compiler ise pure JS mein convert karta hai compile time pe. Jo tum .tsx file mein likhte ho aur jo actually browser execute karta hai — dono bilkul alag hain. Ye mystery nahi, ye sirf syntactic sugar hai."
          whenToUse={[
            'Hamesha React mein JSX use karo — ye standard hai aur zyada readable hai',
            'React.createElement() directly tab use karo jab JSX not available ho (rare case)',
            'JSX samajhna zaroori hai debugging ke liye — error stack traces mein compiled output dikhta hai',
          ]}
          whyUseIt="Socho agar JSX nahi hota toh? Har component mein React.createElement calls — nested structure mein yeh padhna nightmare hota. JSX se UI ka structure visually tree jaisa dikhta hai — exactly jaisi screen dikhti hai, waisa code bhi dikhta hai. Ye mental model bahut powerful hai. Isliye React ne JSX adopt kiya — readability aur developer experience ke liye."
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
            explanation: 'JSX compile hone ke baad React.createElement() calls ban jaate hain. Ab samajh aaya na — JSX mein ek root element kyun zaroori hai? Kyunki React.createElement() single element return karta hai. Do root elements matlab do alag createElement calls — function ek cheez return kar sakta hai. Fragment se ye solve hota hai.',
          }}
          realWorldScenario="Error stack trace mein kabhi compiled JSX output dekha hoga? React.createElement('div', null, ...) — ye exactly wahi hai jo tumne JSX mein likha tha. React DevTools mein component tree — yeh bhi JSX se aaya hai. JSX ka compiled form samajhna debugging skill hai — experienced React developers isko instantly read kar lete hain."
          commonMistakes={[
            {
              mistake: 'Sochna ki JSX HTML hai — HTML attributes use karna jaise class, for, onclick',
              why: 'JSX JavaScript hai, HTML nahi. HTML attribute names JS mein reserved words hain ya camelCase nahi hain.',
              fix: 'JSX attributes: className (not class), htmlFor (not for), onClick (not onclick), onChange (not onchange).',
            },
          ]}
          proTip="Purani tutorials mein har file ke top pe 'import React from react' dikhega. React 17 se ye zaroor nahi raha — new JSX transform automatically handle karta hai. Modern Vite ya Next.js projects mein ye import skip karo. Sirf jsx: 'react-jsx' tsconfig mein hona chahiye — jo by default hota hai."
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
          whatIsIt="JSX ke rules HTML se alag kyun hain? Ab tum jaante ho answer — JSX JavaScript hai. Aur JavaScript ke apne reserved words hain. 'class' JavaScript mein ES6 class declaration keyword hai — conflict avoid karne ke liye className. 'for' JavaScript mein loop keyword hai — htmlFor. Event handlers camelCase mein — JavaScript convention follow karo. Ye rules ek baar samajh gaye, phir automatic ho jaata hai — har bar sochna nahi padta."
          whenToUse={[
            'Har JSX file mein ye rules apply hote hain — koi exception nahi',
            'ESLint + react plugin in rules ko automatically catch karta hai',
            'TypeScript bhi in errors ko compile time par pakadta hai',
          ]}
          whyUseIt="Ye rules arbitrary nahi hain — har rule ke peeche ek reason hai. className isliye kyunki class JS keyword hai. htmlFor isliye kyunki for loop keyword hai. camelCase isliye kyunki ye JavaScript naming convention hai. Self-closing tags isliye kyunki JSX strict XML follow karta hai. Ek root element isliye kyunki React.createElement() single value return karta hai. Har rule ka reason samajh lo — toh bhuloge nahi."
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
            explanation: 'Ye paanch rules yaad rakho: className, htmlFor, camelCase events, self-closing tags, ek root element. ESLint + react/recommended plugin in sabko automatically catch karta hai — manually yaad karne ki zaroorat nahi jab ESLint setup ho.',
          }}
          realWorldScenario="Common scenario — koi developer ne HTML template ko React mein paste kiya. class, for, onclick sab wrong. Compile errors. Ye onboarding mein bahut common problem hai. Solution simple hai: ESLint setup karo, VSCode pe ES7+ React snippets extension install karo — ye automatically correct JSX attributes suggest karta hai. Ek baar tools setup karo, rules manually remember karne ki zaroorat nahi."
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
          proTip="VSCode mein Emmet JSX ke saath kaam karta hai. div.container likhke Tab dabao — <div className='container'></div> automatically ban jaata hai. Emmet JSX rules jaanta hai — className automatically correct milega. Settings mein 'emmet.includeLanguages': {'{ 'typescriptreact': 'html' }'} add karo agar kaam na kare."
        />
      </div>

      {/* ConceptCard 3: Expressions in JSX */}
      <div id="jsx-expressions">
        <ConceptCard
          title="{} Mein Kya Dal Sakte Ho?"
          emoji="🧮"
          difficulty="beginner"
          whatIsIt="JSX ke curly braces {} mein tum JavaScript expressions dal sakte ho — variables, calculations, function calls, ternary, .map(). Lekin statements nahi chal sakti — if/else, for loops, while. Sawaal ye hai: expression aur statement mein kya fark hai? Expression wo cheez hai jo koi value return karta hai. Statement sirf execute hota hai — koi value return nahi. JSX ke {} ko value chahiye — isliye sirf expressions."
          whenToUse={[
            'Dynamic values dikhane ke liye — user name, price, count',
            'Conditional rendering ke liye — ternary ya && operator',
            'Lists render karne ke liye — .map() se array to JSX',
            'Dynamic attributes ke liye — src, href, className',
            'Inline styles ke liye — style={{ color: "red" }}',
          ]}
          whyUseIt="{} ka real power ye hai — pure JavaScript ki poori taaqat JSX mein le aao. Calculations, transformations, conditional logic, array operations — sab kuch. React ko separate template language ki zaroorat nahi (jaise Angular ke ngIf, ngFor) kyunki JavaScript expressions hi kafi hain. Ye seamless integration React ko itna flexible aur powerful banata hai."
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
            explanation: 'Simple rule — {} mein kuch bhi daalo jo value return kare. if/for statements? Value return nahi karte — nahi chalenge. Conditional ke liye ternary (?:) expression hai — value return karta hai. Loops ke liye .map() expression hai — array return karta hai. Style mein double {{}} — outer {} JSX expression, inner {} JavaScript object literal.',
          }}
          realWorldScenario="Flipkart product page sochte ho — product name variable se, discounted price calculation se, stock status ternary se, images dynamic src se, related products .map() se. Sab kuch {} mein JavaScript expressions — koi alag template syntax nahi, koi ngIf nahi, koi v-if nahi. Pure JavaScript power, JSX ke andar."
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
          proTip="Style mein double curly braces kyun? style={{color: 'red'}} — outer {} ka matlab hai 'ye JSX expression hai', inner {} ka matlab hai 'ye JavaScript object hai'. Do alag purposes. Aur CSS property names camelCase mein — backgroundColor (nahi background-color), borderRadius (nahi border-radius), fontSize (nahi font-size). Ye JavaScript property naming convention follow karta hai."
        />
      </div>

      {/* ConceptCard 4: Fragments */}
      <div id="jsx-fragments">
        <ConceptCard
          title="Fragment — Unnecessary div Se Bachao"
          emoji="🧩"
          difficulty="beginner"
          whatIsIt="Fragment ek interesting trick hai. JSX mein single root zaroori hai — ye React.createElement() ka requirement hai. Lekin agar tum extra div add nahi karna chahte? Fragment use karo. Fragment ek wrapper hai jo DOM mein koi real element nahi banata — sirf React tree mein grouping karta hai. Invisible wrapper. <> </> ya <React.Fragment> — dono same kaam karte hain."
          whenToUse={[
            'Jab multiple elements return karni ho bina wrapper div ke',
            'Table structure mein — <tr> ke andar extra div add nahi kar sakte',
            'Flexbox/Grid layout mein — extra div layout tod sakta hai',
            'Ek list ke multiple items return karne ke liye jab key prop chahiye',
          ]}
          whyUseIt="Extra div kab problem hoti hai? Flexbox ya Grid layouts mein — extra div flex children ki count change kar deta hai aur layout break hoti hai. Table mein — tr ke andar sirf td/th valid HTML hain, div invalid hai. CSS selectors — parent > child relationship extra div se break hoti hai. Ye sab real problems hain. Fragment se ye sab solve hoti hain — bina koi DOM element add kiye."
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
            explanation: '<></> short syntax 90% cases ke liye kaafi hai. Ek limitation — <> key prop accept nahi karta. Lists mein jab multiple elements ke pair return karni ho (jaise dt/dd in dl), tab import { Fragment } from react karke <Fragment key={item.id}> use karo. Ye important distinction yaad rakho.',
          }}
          realWorldScenario="Glossary ya FAQ page mein dl (definition list) use hoti hai. Har entry mein dt (term) aur dd (description) hote hain. Agar React component se ye pair return karo div mein wrap karke — HTML invalid ho jaata hai. Fragment se pair saath rahta hai, DOM clean rehta hai. React DevTools mein Fragment ka koi node nahi dikhta — transparent hai."
          commonMistakes={[
            {
              mistake: '<> shorthand mein key prop dene ki koshish karna — <key={id}>',
              why: '<> shorthand React.Fragment ka compiled form hai lekin props accept nahi karta. key prop required hota hai list mein unique identification ke liye.',
              fix: 'Named Fragment use karo: import { Fragment } from "react" phir <Fragment key={item.id}>...</Fragment>.',
            },
          ]}
          proTip="React DevTools (Chrome/Firefox extension) install karo — Fragment invisible hota hai wahan bhi. Component tree mein Fragment ka koi node nahi, sirf uske children dikhte hain. Ye confirm karta hai Fragment truly DOM-less hai — sirf React tree mein grouping, actual DOM mein kuch nahi. DevTools debugging ke liye essential tool hai."
        />
      </div>

      {/* ConceptCard 5: Conditional Rendering */}
      <div id="conditional-rendering">
        <ConceptCard
          title="Conditional Rendering — 3 Patterns"
          emoji="🔀"
          difficulty="beginner"
          whatIsIt="Real apps mein 90% UI conditions pe depend karta hai — user logged in hai ya nahi, data load hua ya nahi, error hai ya nahi. JSX mein if statements directly nahi chal sakti (statements hain, expressions nahi — ab tum samajhte ho kyun). Isliye teen patterns hain: ternary (?:), logical AND (&&), aur early return. Har ek ka apna use case hai — teeno jaanna zaroori hai."
          whenToUse={[
            'Ternary: Jab do alag UI states hoon — logged in vs logged out, loading vs content',
            '&&: Jab sirf ek cheez conditionally show karni ho — error message, badge, tooltip',
            'Early return: Jab component completely alag output deta ho ek condition mein',
            'if/else in function body: Complex conditions ke liye readable approach',
          ]}
          whyUseIt="Ternary use karo jab do alag UI options hain — logged in vs logged out, loading vs content. && use karo jab sirf ek optional piece show karna ho — ya kuch, ya kuch nahi. Early return use karo jab component completely alag output deta ho ek condition mein. Ye teeno alag tools hain — sahi jagah sahi tool use karna code readability dramatically improve karta hai."
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
            explanation: 'Early return sabse clean approach hai multiple states ke liye — loading, error, not found — sab flat code mein handle hote hain, deep nesting nahi. Ternary 2 options ke liye best hai. && optional element ke liye. 0 wala bug critical hai — items.length && <List /> mein items = [] hone pe "0" screen pe dikhta hai. items.length > 0 && se fix karo.',
          }}
          realWorldScenario="Dashboard component sochte ho — data fetch ho raha hai (spinner dikhao), fetch fail hua (error page), data empty hai (empty state illustration), data hai (main content). Ye chaar alag states hain. Early return se pehle do check karo, phir main JSX likhte waqt ternary aur && use karo. Code clean rehta hai, logic maintainable."
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
          proTip="Ek important rule yaad rakho: React null, undefined, aur false render nahi karta — ye silently kuch nahi dikhata. Lekin 0 (number zero) aur '' (empty string) render hote hain. Ye JSX ka famous gotcha hai. items.length && <List /> mein jab items = [] hota hai — 0 screen pe dikhta hai. Isliye hamesha boolean convert karo: items.length > 0 ya !!items.length."
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
