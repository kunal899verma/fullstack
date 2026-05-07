'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'
import type { QuizQuestion } from '@/components/learn/ConceptCard'

// ── Quiz ──────────────────────────────────────────────────────────────────────

const chapterQuiz: QuizQuestion[] = [
  {
    question: 'const se declare kiye gaye object ki property change ki ja sakti hai?',
    options: [
      {
        text: 'Haan, kyunki const sirf variable ki binding lock karta hai, object khud mutable rehta hai',
        correct: true,
        explanation: 'Bilkul sahi! const reassignment rokta hai — matlab tum variable ko nayi value nahi de sakte. Lekin object ke andar ki properties freely change ho sakti hain. Object.freeze() se truly immutable banana padega.',
      },
      {
        text: 'Nahi, const se poora object immutable ho jaata hai',
        correct: false,
        explanation: 'Ye galat hai. const sirf variable binding ko lock karta hai. Object ki properties const se protect nahi hoti. Object.freeze() use karo truly immutable object ke liye.',
      },
      {
        text: 'Haan, lekin sirf primitive properties ke liye',
        correct: false,
        explanation: 'Property type (primitive ya object) se koi fark nahi padta. Sab const object ki properties change ho sakti hain.',
      },
      {
        text: 'Nahi, TypeScript mein bhi const objects immutable hote hain',
        correct: false,
        explanation: 'TypeScript bhi ye behavior inherit karta hai JavaScript se. Readonly modifier ya as const assertion se TypeScript-level immutability milti hai, runtime par nahi.',
      },
    ],
  },
  {
    question: 'typeof null kya return karta hai JavaScript mein?',
    options: [
      {
        text: '"null"',
        correct: false,
        explanation: 'Aisa hona chahiye tha, lekin JavaScript ka ek famous bug hai yahan. typeof null "object" return karta hai.',
      },
      {
        text: '"object"',
        correct: true,
        explanation: 'Haan, ye JavaScript ka ek historic bug hai! null ki typeof "object" return karta hai. Ye backward compatibility ke liye fix nahi kiya gaya. Null check karne ke liye hamesha value === null use karo.',
      },
      {
        text: '"undefined"',
        correct: false,
        explanation: 'typeof undefined "undefined" return karta hai, lekin null ke liye nahi. null aur undefined alag hain.',
      },
      {
        text: '"NaN"',
        correct: false,
        explanation: 'NaN ek number value hai (typeof NaN === "number" bhi ek WTF hai!). typeof null "object" return karta hai.',
      },
    ],
  },
  {
    question: '"5" + 3 JavaScript mein kya return karta hai?',
    options: [
      {
        text: '8 (number)',
        correct: false,
        explanation: 'Agar dono numbers hote toh 8 hota. Lekin + operator string ke saath string concatenation prefer karta hai. Isliye "5" + 3 = "53".',
      },
      {
        text: '"53" (string)',
        correct: true,
        explanation: 'Sahi! + operator string ke saath concatenation karta hai. 3 ko string mein convert karke "5" se jod deta hai — result "53" string hota hai. Ye implicit type coercion ka example hai.',
      },
      {
        text: 'TypeError',
        correct: false,
        explanation: 'JavaScript type error nahi deta — balki silently type coerce karta hai. Ye hi isliye === prefer kiya jaata hai aur explicit conversions zyada readable hain.',
      },
      {
        text: '"5" + "3" = "5+3" (string literal)',
        correct: false,
        explanation: 'JavaScript concatenation karta hai string interpolation nahi. "5" + 3 = "53" hoga, "5+3" nahi.',
      },
    ],
  },
  {
    question: '?? (nullish coalescing) aur || (logical OR) mein kya fark hai?',
    options: [
      {
        text: 'Koi fark nahi — dono same kaam karte hain',
        correct: false,
        explanation: 'Bahut important fark hai! || kisi bhi falsy value (false, 0, "", NaN) par fallback karta hai. ?? sirf null aur undefined par fallback karta hai. Empty string ya 0 valid value ho sakti hai!',
      },
      {
        text: '?? sirf null aur undefined par fallback karta hai, || sabhi falsy values par',
        correct: true,
        explanation: 'Bilkul sahi! "" ?? "default" → "" (empty string valid maana jaata hai). "" || "default" → "default" (empty string falsy hai). Jab 0 ya "" valid values hon, ?? use karo.',
      },
      {
        text: '|| sirf null aur undefined par fallback karta hai, ?? sabhi falsy values par',
        correct: false,
        explanation: 'Ulta hai. || sabhi falsy values par fallback karta hai (false, 0, "", null, undefined, NaN). ?? sirf null/undefined par.',
      },
      {
        text: '?? async code mein use hota hai, || synchronous mein',
        correct: false,
        explanation: 'Dono sync/async dono mein use ho sakte hain. Fark falsy values ki treatment mein hai, not execution context mein.',
      },
    ],
  },
  {
    question: 'Shallow copy aur deep copy mein kya fark hai?',
    options: [
      {
        text: 'Shallow copy top-level properties copy karta hai — nested objects shared rehte hain. Deep copy completely independent copy banata hai.',
        correct: true,
        explanation: 'Exactly! {...obj} ya Object.assign() shallow copy hai — nested objects ka reference share hota hai. structuredClone() deep copy hai — completely independent, nested changes original ko affect nahi karte.',
      },
      {
        text: 'Shallow copy sirf strings copy karta hai, deep copy sab types',
        correct: false,
        explanation: 'Shallow vs deep copying ka matlab hai nesting ke levels — sirf type se nahi. Shallow copy top-level sab copy karta hai, lekin nested objects ke references share karta hai.',
      },
      {
        text: 'Deep copy hamesha slow hota hai aur use nahi karna chahiye',
        correct: false,
        explanation: 'Deep copy ki zaroorat tab padti hai jab truly independent copy chahiye. structuredClone() modern aur efficient hai. Performance concern tabhi hota hai jab bahut bada object ho.',
      },
      {
        text: 'JSON.parse(JSON.stringify()) aur structuredClone() same result dete hain',
        correct: false,
        explanation: 'Important fark hai! JSON approach Date objects ko string mein convert karta hai, undefined/functions ko lose karta hai. structuredClone() Date, Map, Set sab correctly handle karta hai.',
      },
    ],
  },
]

// ── Type System Diagram ───────────────────────────────────────────────────────

function TypeSystemDiagram() {
  const cols = [
    {
      title: 'var', subtitle: 'Avoid — legacy', color: '#EF4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.3)',
      traits: ['Function-scoped', 'Hoisted (undefined)', 'Re-declarable ❌', 'Global leak risk'],
    },
    {
      title: 'let', subtitle: 'Reassignable', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)',
      traits: ['Block-scoped', 'TDZ (not hoisted)', 'No re-declaration', 'Reassign: ✅'],
    },
    {
      title: 'const', subtitle: 'Default choice', color: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.3)',
      traits: ['Block-scoped', 'TDZ (not hoisted)', 'No re-declaration', 'Reassign: ❌'],
    },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">var vs let vs const — Scope & Hoisting Comparison</p>
      <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
        {cols.map((col, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: col.bg, border: `1px solid ${col.border}` }}>
            <p className="font-mono font-bold text-base mb-1" style={{ color: col.color }}>{col.title}</p>
            <p className="text-[10px] text-[#71717A] mb-3">{col.subtitle}</p>
            {col.traits.map((t, j) => (
              <p key={j} className="text-[10px] text-[#A1A1AA] mb-1">• {t}</p>
            ))}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-[#52525B] text-center mt-3">Rule: const by default → let when reassignment needed → var kabhi nahi</p>
    </div>
  )
}

// ── Main Export ───────────────────────────────────────────────────────────────

export default function JSChapter2Content() {
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
        <h1 className="text-4xl font-display font-bold text-[#F5F5F7] mb-3">
          Variables &amp; Data Types — JavaScript Ki Memory Ka Raaz
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          Ruko ek second — JavaScript mein <strong className="text-[#F5F5F7]">var, let, const</strong> teen keywords hain ek hi kaam ke liye? Haan! Aur typeof null ka answer sunoge toh hairan ho jaoge. Memory Creation Phase mein JavaScript pehle hi sab variables ko jaanta hai — yahi hoisting ka raaz hai. Chalte hain under the hood.
        </p>
      </div>

      <TypeSystemDiagram />

      {/* Akshay-style Insight box */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}
      >
        <p className="text-sm font-bold text-[#F59E0B] mb-1">Memory Creation Phase — Execution Context Ka Pehla Kadam</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <strong className="text-[#F5F5F7]">Ye shocking hai</strong> — JavaScript apna code run karne se pehle ek baar poora code scan karta hai. Is Memory Creation Phase mein <code className="text-[#06B6D4]">var</code> variables ko undefined se initialize karta hai, <code className="text-[#06B6D4]">let</code> aur <code className="text-[#06B6D4]">const</code> ko TDZ (Temporal Dead Zone) mein dalta hai. Yahi wajah hai ki var se pehle access karo toh undefined milta hai, let se karo toh ReferenceError! Ye hoisting magic nahi, JavaScript ka execution model hai!
        </p>
      </div>

      {/* ConceptCard 1: var vs let vs const */}
      <div id="var-let-const">
        <ConceptCard
          title="var vs let vs const — Execution Context Ka Nazar"
          emoji="📦"
          difficulty="beginner"
          whatIsIt="Teen keywords, teen alag behaviors — aur sab ka reason Execution Context mein chhupa hai. var = function-scoped, Memory Creation Phase mein undefined se hoist hota hai (yahi confusion ka source!). let = block-scoped, TDZ mein hota hai jab tak initialize na ho. const = block-scoped, must be initialized, binding lock hai value nahi — isliye const object ki properties change ho sakti hain!"
          whenToUse={[
            'const by default — hamesha. Ye clearly bolta hai: ye binding change nahi hogi.',
            'let jab reassignment zaroor ho — loop counter, conditional assignment, accumulator.',
            'var kabhi nahi — sirf legacy code mein milega. Naya code mein bilkul avoid karo.',
          ]}
          whyUseIt="Bhai, const aur let se code predictable hota hai — scope crystal clear hota hai, accidental reassignment nahi hoti. var ki function-scoping aur Memory Creation Phase hoisting se unexpected bugs aate hain jo debug karna ek nightmare hai. Modern JS mein var ka koi valid use case nahi hai — ye historical artifact hai."
          howToUse={{
            filename: 'var-let-const.ts',
            language: 'typescript',
            code: `// const — block-scoped, cannot reassign binding
const PI = 3.14159;
// PI = 3; // ❌ TypeError: Assignment to constant variable

// const object — properties CAN change
const user = { name: 'Rahul', age: 25 };
user.name = 'Priya';  // ✅ allowed! reference same hai
user.city = 'Mumbai'; // ✅ allowed! new property bhi add ho sakti hai
// user = {};         // ❌ Error! reassignment nahi

// let — block-scoped, can reassign
let score = 0;
for (let i = 0; i < 5; i++) {
  score += i; // reassignment ok
}
console.log(score); // 10

// var — function-scoped (avoid this!)
function varDemo() {
  if (true) {
    var x = 10; // leaks out of if block
  }
  console.log(x); // 10 — BAD! x visible here
}

// let — block-scoped (correct)
function letDemo() {
  if (true) {
    let y = 10; // stays in if block
  }
  // console.log(y); // ❌ ReferenceError — correct!
}`,
            explanation: 'const binding lock karta hai, value nahi. let block-scope deta hai. var function-scope deta hai aur hoisting se confusing behavior hota hai. Rule: const → let → var (never) — is order mein socho.',
          }}
          realWorldScenario="React mein tum almost hamesha const use karte ho: const [count, setCount] = useState(0). Loop variables ke liye let. var modern React/Node code mein practically nahi milta — aur milta hai toh red flag hai ki code purana hai ya author new hai."
          commonMistakes={[
            {
              mistake: 'Const matlab immutable — ye galat hai',
              why: 'const sirf reassignment rokta hai. Object ki properties ya array ke elements change ho sakte hain. const arr = [1,2,3]; arr.push(4) — ye perfectly valid hai!',
              fix: 'Truly immutable object ke liye Object.freeze() use karo: const obj = Object.freeze({ x: 1, y: 2 }). Phir properties bhi change nahi hongi.',
            },
            {
              mistake: 'var use karna loops mein jab async callbacks ho',
              why: 'for (var i = 0; i < 5; i++) { setTimeout(() => console.log(i)) } — sab 5 print hoga! var shared hai. let se ye issue nahi hoti.',
              fix: 'Hamesha let use karo loop counters ke liye. Har iteration ka apna alag scope hoga.',
            },
          ]}
          proTip="Rule: hamesha const se start karo. Agar reassignment chahiye toh let use karo. var kabhi nahi. TypeScript mein prefer-const ESLint rule enable karo — automatic suggestion milegi."
          demo={
            <DiffBlock
              title="var Problems vs let/const Solution"
              language="javascript"
              bad={{
                label: '❌ var — Unpredictable',
                code: `var x = 10;
if (true) {
  var x = 20;  // SAME variable! var is function-scoped
  console.log(x); // 20
}
console.log(x); // 20 — BAD! x changed outside if block

// Hoisting confusion
console.log(y); // undefined (not ReferenceError!)
var y = 5;`,
                explanation: 'var leaks out of blocks aur silently hoists — bugs dhundhna nightmare hai.',
              }}
              good={{
                label: '✅ let/const — Predictable',
                code: `const x = 10;
if (true) {
  let x = 20;  // Different variable! Block-scoped
  console.log(x); // 20
}
console.log(x); // 10 — GOOD! Outer x unchanged

// const object — properties CAN change
const user = { name: 'Rahul' };
user.name = 'Priya';  // ✅ allowed! reference same hai
// user = {};         // ❌ Error! reassignment nahi`,
                explanation: 'let/const block-scoped hain — predictable behavior, clear intent.',
              }}
            />
          }
        />
      </div>

      {/* Akshay-style insight box */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)' }}
      >
        <p className="text-sm font-bold text-[#10B981] mb-1">Ab Sawaal Ye Aata Hai — typeof null?</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <code className="text-[#F59E0B]">typeof null</code> kya return karta hai? Answer hai <strong className="text-[#F5F5F7]">&quot;object&quot;</strong> — yaar ye JavaScript ka ek famous bug hai jo 1995 se chala aa raha hai! Backward compatibility ke liye fix nahi kiya gaya. Aur <code className="text-[#F59E0B]">typeof NaN</code>? Answer hai <strong className="text-[#F5F5F7]">&quot;number&quot;</strong> — NaN (Not a Number) ek number hai! Ye JavaScript ke woh quirks hain jo history samajhne se hi samajh mein aate hain.
        </p>
      </div>

      {/* ConceptCard 2: 7 Primitive Types */}
      <div id="primitive-types">
        <ConceptCard
          title="JavaScript Ke 7 Primitive Types — Stack Pe Rehte Hain"
          emoji="🔢"
          difficulty="beginner"
          whatIsIt="Primitives = immutable values — Stack mein store hote hain. Copy by value hote hain — jab ek primitive variable doosre ko assign karo, ek completely nayi copy banti hai, original untouched. 7 types hain: string, number, boolean, null, undefined, symbol, bigint. Inhe Execution Context ke Memory Component mein directly store kiya jaata hai."
          whenToUse={[
            'string: Text data — names, messages, URLs, JSON strings.',
            'number: Integers aur floats dono — JavaScript mein alag number types nahi hain (unlike Java).',
            'boolean: Flags, conditions, feature toggles.',
            'null: Intentional absence of value — "koi user select nahi hua".',
            'undefined: Variable declare hua lekin value assign nahi ki.',
            'symbol: Unique identifiers — mostly library authors ke liye.',
            'bigint: Huge integers jo Number ki safe range se bahar hain.',
          ]}
          whyUseIt="Primitives lightweight hain — stack par store hote hain, heap par nahi. Copy by value hone se unexpected mutations nahi hoti. TypeScript mein ye types compile-time safety dete hain."
          howToUse={{
            filename: 'primitives.ts',
            language: 'typescript',
            code: `// String
const name: string = 'Rahul';
const greeting: string = \`Hello \${name}!\`; // template literal
const multiLine = \`Line 1
Line 2\`; // backticks se multiline

// Number (integers AND floats — ek hi type)
const age: number = 25;
const pi: number = 3.14159;
const huge: number = 1_000_000; // numeric separator — readable!
const notANumber: number = NaN; // typeof NaN === 'number' 🤯
const inf: number = Infinity;

// Boolean
const isActive: boolean = true;
const isEmpty: boolean = false;

// null — intentional absence of value
const selectedUser: string | null = null; // "koi user select nahi"

// undefined — variable declared but not assigned
let score: number | undefined; // undefined by default
console.log(score); // undefined

// Symbol — unique identifier (advanced use)
const id1 = Symbol('userId');
const id2 = Symbol('userId');
console.log(id1 === id2); // false! har symbol unique hai

// BigInt — for huge integers (n suffix)
const bigNum: bigint = 9007199254740993n;
const maxSafe: number = Number.MAX_SAFE_INTEGER; // 9007199254740991
console.log(9007199254740992 === 9007199254740993); // true! (bug — number kan't represent this)
console.log(9007199254740992n === 9007199254740993n); // false! bigint is exact`,
            explanation: 'Har primitive ka apna use case hai. null aur undefined mein fark karo — null intentional hai, undefined accidental ya uninitialized. NaN ek number hai (paradoxical but true). BigInt financial aur cryptographic calculations ke liye use karo.',
          }}
          realWorldScenario="User profile API mein: name (string), age (number), isVerified (boolean), deletedAt (Date | null — null matlab nahi delete hua), score (number | undefined — undefined matlab abhi calculate nahi hua). Ye types clear communication karte hain intent ki."
          commonMistakes={[
            {
              mistake: "typeof null === 'object' — ye bug hai, value nahi",
              why: "JavaScript ka original bug hai — backward compatibility ke liye fix nahi kiya. typeof null 'object' return karta hai, jo misleading hai.",
              fix: "null check karne ke liye value === null use karo, typeof nahi. Optional: value == null dono null aur undefined pakadta hai (loose equality — ek valid exception).",
            },
            {
              mistake: 'isNaN() use karna NaN check karne ke liye',
              why: "isNaN('hello') → true! kyunki isNaN pehle string ko number mein convert karta hai, jo NaN hoti hai. Ye misleading hai.",
              fix: "Number.isNaN() use karo — ye sirf actual NaN values ke liye true return karta hai. Number.isNaN('hello') → false (correct!).",
            },
          ]}
          proTip="Number.isNaN() is better than global isNaN(). isNaN('hello') returns true (converts to NaN first). Number.isNaN('hello') returns false — correct behavior. Similarly, Number.isFinite() is better than global isFinite()."
        />
      </div>

      {/* Akshay-style insight box */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(236,72,153,0.07)', border: '1px solid rgba(236,72,153,0.2)' }}
      >
        <p className="text-sm font-bold text-[#EC4899] mb-1">Surprise! Ye Output Kya Hoga?</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <code className="text-[#06B6D4]">&apos;5&apos; + 3</code> kya dega? <strong className="text-[#F5F5F7]">&quot;53&quot;</strong> — string concatenation! <br/>
          <code className="text-[#06B6D4]">&apos;5&apos; - 3</code> kya dega? <strong className="text-[#F5F5F7]">2</strong> — numeric subtraction! <br/>
          Same + aur - operators, alag alag behavior — kyun? Ye type coercion hai. JavaScript silently types convert karta hai. Isliye <code className="text-[#F59E0B]">===</code> hamesha use karte hain — ye coercion nahi karta!
        </p>
      </div>

      {/* ConceptCard 3: Type Coercion */}
      <div id="type-coercion">
        <ConceptCard
          title="Type Coercion — Magic Nahi, JavaScript Ka Rule Hai"
          emoji="🎩"
          difficulty="intermediate"
          whatIsIt="JavaScript automatically ek type ko doosre mein convert karta hai — ye 'coercion' hai. Ye magic nahi hai, JavaScript ka defined behavior hai. Kabhi helpful hota hai, kabhi nightmare. Isliye == (loose equality) avoid karte hain — ye coercion karta hai. Hamesha === use karo — ye strict hai, type bhi check karta hai. Yahi ek rule yaad rakho: hamesha ===."
          whenToUse={[
            'Explicit coercion: Number(), String(), Boolean(), parseInt() — jab intentionally type convert karna ho.',
            'Template literals mein automatic string conversion — \`Hello ${name}\`.',
            'Comparison mein — hamesha === use karo, == kabhi nahi (null == undefined exception).',
          ]}
          whyUseIt="Coercion samajhna zaroori hai kyunki ye bugs ka bada source hai. JavaScript mein koi bhi value truthy ya falsy ho sakti hai, aur ye conversion silently hoti hai. Explicit conversions se code readable aur predictable hota hai."
          howToUse={{
            filename: 'type-coercion.ts',
            language: 'typescript',
            code: `// Implicit coercion — JS khud karta hai (avoid karo)
console.log('5' + 3);          // '53' — string concat!
console.log('5' - 3);          // 2 — numeric subtraction
console.log('5' * '3');        // 15 — both to number
console.log(true + false);     // 1 — boolean to number
console.log(true + true);      // 2

// Equality coercion gotchas
console.log('' == false);       // true — both coerce to 0
console.log(0 == false);        // true
console.log(null == undefined); // true
console.log(null == 0);         // false! (gotcha!)
console.log(null == false);     // false! (another gotcha!)

// == vs === — ALWAYS use ===
console.log(5 == '5');          // true  (loose — dangerous)
console.log(5 === '5');         // false (strict — safe)
console.log(null == undefined); // true  (== ke liye valid check)
console.log(null === undefined);// false (strict — different types)

// Explicit coercion — readable aur intentional
const strNum: string = '42px';
console.log(Number('42'));      // 42
console.log(Number('42px'));    // NaN (strict conversion)
console.log(parseInt('42px'));  // 42 (lenient parsing — takes leading digits)
console.log(String(42));        // '42'
console.log(Boolean(0));        // false
console.log(Boolean(''));       // false
console.log(Boolean(null));     // false
console.log(Boolean('hello'));  // true`,
            explanation: 'Implicit coercion JS khud karta hai — often surprising results deta hai. Explicit coercion (Number(), String(), parseInt()) zyada readable hai. === hamesha type check karta hai, koi coercion nahi.',
          }}
          realWorldScenario="API se data aane par strings aur numbers mix ho jaate hain. req.query.page type string hoga, lekin tum integer chahte ho. parseInt(req.query.page, 10) ya Number(req.query.page) explicit conversion hai — predictable behavior. Implicit conversion se bugs aate hain."
          commonMistakes={[
            {
              mistake: '== use karna comparison mein',
              why: "Unexpected coercion se bugs aate hain. 0 == false (true), '' == false (true), null == undefined (true) — ye sab surprising hain.",
              fix: 'HAMESHA === use karo. Single exception: value == null dono null aur undefined check karta hai — ek readable shorthand hai.',
            },
          ]}
          proTip="Explicit coercion zyada readable hai: Number('5'), String(42), Boolean(0), parseInt('42px'). Implicit coercion se bachna better hai. TypeScript mein strict mode aur ESLint rules coercion bugs pakad lete hain compile time par."
          demo={
            <DiffBlock
              title="== Loose vs === Strict Equality"
              language="javascript"
              bad={{
                label: '❌ == (loose) — avoid karo',
                code: `// Ye sab TRUE return karte hain — confusing!
0 == false        // true
'' == false       // true
null == undefined // true
'1' == 1          // true
[] == false       // true (!)
[] == ![]         // true (!!)`,
                explanation: 'Loose equality type coercion karta hai — unexpected behavior. Bugs ka bada source.',
              }}
              good={{
                label: '✅ === (strict) — hamesha use karo',
                code: `// Ye sab FALSE return karte hain — predictable!
0 === false        // false (different types)
'' === false       // false (different types)
null === undefined // false (different types)
'1' === 1          // false (different types)

// Only valid == exception:
value == null // true for both null AND undefined
// Same as: value === null || value === undefined`,
                explanation: 'Strict equality type check karta hai. Predictable, readable, bug-free.',
              }}
            />
          }
        />
      </div>

      {/* Akshay-style insight box */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <p className="text-sm font-bold text-[#7C3AED] mb-1">Counter-Intuitive Alert — Ye Mat Bhoolna!</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <code className="text-[#06B6D4]">if ([])</code> — ye <strong className="text-[#F5F5F7]">true</strong> hai! Empty array truthy hai! <br/>
          <code className="text-[#06B6D4]">if ({})</code> — ye bhi <strong className="text-[#F5F5F7]">true</strong> hai! Empty object truthy hai! <br/>
          Sirf 8 falsy values hain — baki sab truthy. <strong className="text-[#F59E0B]">?? vs ||</strong> ka fark yaad rakho: <code className="text-[#06B6D4]">0 ?? 5</code> = 0 (valid!), <code className="text-[#06B6D4]">0 || 5</code> = 5 (0 ko falsy maan ke replace kar diya). Yahi wajah hai ?? zyada safe hai!
        </p>
      </div>

      {/* ConceptCard 4: Falsy Values */}
      <div id="falsy-values">
        <ConceptCard
          title="Falsy Values — Sirf 8 Hain, Yaad Karo"
          emoji="❓"
          difficulty="beginner"
          whatIsIt="JavaScript mein kuch values boolean context mein false ki tarah behave karti hain — ye 'falsy' values hain. Sirf 8 falsy values hain: false, 0, -0, 0n (BigInt zero), '' (empty string), null, undefined, NaN. Baki sab truthy — including empty array [] aur empty object {}! Ye counter-intuitive lagta hai, lekin yaad ho gaya toh bugs 10x kam hote hain."
          whenToUse={[
            'Optional chaining (?.) — null/undefined par safe property access ke liye.',
            'Nullish coalescing (??) — sirf null/undefined ke liye default value chahiye ho.',
            'Logical OR (||) — koi bhi falsy value par default chahiye ho (use carefully!).',
            'Boolean conversion — if (value) se pehle samjho value truthy hai ya nahi.',
          ]}
          whyUseIt="Falsy values samajhna bugs se bachata hai. 0 aur '' valid values ho sakti hain — inhe false se treat karna galat hoga. ?. aur ?? modern JavaScript ke powerful tools hain safe null handling ke liye."
          howToUse={{
            filename: 'falsy-nullish.ts',
            language: 'typescript',
            code: `// Falsy values — sirf ye 8 hain
const falsyValues = [false, 0, -0, 0n, '', null, undefined, NaN];
falsyValues.forEach(v => console.log(Boolean(v))); // sab false

// Truthy examples (baaki sab!)
Boolean('false') // true — non-empty string
Boolean([])      // true — empty array bhi truthy hai!
Boolean({})      // true — empty object bhi truthy hai!
Boolean(-1)      // true — negative numbers bhi truthy hain

// Optional chaining (?.) — safe navigation
const user: { profile?: { name?: string }; posts?: string[] } | null = null;
const name = user?.profile?.name;    // undefined (not TypeError!)
const firstPost = user?.posts?.[0];  // undefined (array access bhi safe)

interface UserWithGreet {
  greet?: () => string;
}
const userObj: UserWithGreet = {};
const greeting = userObj.greet?.();  // undefined (method call bhi safe)

// Nullish coalescing (??) — only null/undefined → fallback
const displayName = user?.profile?.name ?? 'Anonymous'; // 'Anonymous'

// vs || which also catches '', 0, false:
const count = 0;
console.log(count ?? 'no count');  // 0 — ?? respects 0 as valid!
console.log(count || 'no count'); // 'no count' — || treats 0 as falsy!

const label = '';
console.log(label ?? 'Unnamed');  // '' — ?? respects empty string!
console.log(label || 'Unnamed'); // 'Unnamed' — || treats '' as falsy!`,
            explanation: '?. sirf null/undefined check karta hai navigation ke dauraan. ?? sirf null/undefined par fallback karta hai — 0, false, "" ko valid maanta hai. Ye dono modern JS ke best features hain.',
          }}
          realWorldScenario="E-commerce cart mein: const total = cart?.items?.reduce((sum, item) => sum + item.price, 0) ?? 0. Agar cart null hai toh safely 0 milega. Agar items empty array hai toh 0 milega (reduce ka initial value). Double safety — no crashes."
          commonMistakes={[
            {
              mistake: '|| se default value dena jab 0 ya "" valid ho',
              why: "config.timeout || 5000 — agar timeout 0 set kiya (intentionally!) toh bhi 5000 use hoga. || 0 ko falsy treat karta hai.",
              fix: 'config.timeout ?? 5000 use karo. ?? sirf null/undefined par fallback karta hai — 0 valid value hai.',
            },
            {
              mistake: 'Empty array [] ko falsy assume karna',
              why: 'if ([]) — ye true hoga! Empty array truthy hai JavaScript mein. Ye counter-intuitive hai.',
              fix: 'Array length check karo: if (arr.length === 0) ya if (arr.length). Direct if (arr) se array emptiness check nahi hoti.',
            },
          ]}
          proTip="?? aur ?. optional chaining modern JavaScript ke game-changers hain. TypeScript mein non-null assertion (!) ka use kam karo — ye runtime errors hide karta hai. ?. zyada safe hai. Enable TypeScript strict mode: 'strictNullChecks: true'."
        />
      </div>

      {/* Akshay-style insight box */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(6,182,212,0.07)', border: '1px solid rgba(6,182,212,0.2)' }}
      >
        <p className="text-sm font-bold text-[#06B6D4] mb-1">React Developers Ke Liye — Ye Critical Hai</p>
        <p className="text-sm text-[#A1A1AA] leading-relaxed">
          <strong className="text-[#F5F5F7]">Ab sawaal ye aata hai</strong> — React state directly mutate kyun nahi karte? Kyunki object reference same rehti hai! React check karta hai ki reference badla ki nahi — agar nahi badla, re-render nahi karta. Isliye hamesha new object return karo: <code className="text-[#06B6D4]">setState({'{'} ...prev, name: &apos;Priya&apos; {'}'}) </code>. Spread operator nayi object banata hai — nayi reference = React ko pata chala!
        </p>
      </div>

      {/* ConceptCard 5: Reference Types */}
      <div id="reference-types">
        <ConceptCard
          title="Primitive vs Reference Types — Stack vs Heap"
          emoji="📌"
          difficulty="intermediate"
          whatIsIt="Primitives Stack mein store hote hain, copy by value — nayi copy banti hai, original untouched. Objects aur arrays Heap mein store hote hain, copy by reference — dono variables same Heap location point karte hain. Ek change karo, doosra bhi change! Execution Context ke memory mein object ki location (address) store hoti hai, actual object nahi — yahi reference hai!"
          whenToUse={[
            'Shallow copy: jab top-level properties independent karni hon (spread operator ya Object.assign).',
            'Deep copy: jab completely independent copy chahiye — nested objects bhi alag honi chahiye.',
            'structuredClone(): modern deep copy — Date, Map, Set sab handle karta hai.',
            'Immutability: React state mein hamesha new object return karo, mutation avoid karo.',
          ]}
          whyUseIt="Reference type behavior samajhna React state management ke liye critical hai. Agar tum directly state mutate karo, React detect nahi kar paata change — UI update nahi hota. Hamesha new objects/arrays return karo state updates mein."
          howToUse={{
            filename: 'reference-types.ts',
            language: 'typescript',
            code: `// Primitives — copy by VALUE
let a = 10;
let b = a; // b ek nayi copy hai
b = 20;
console.log(a); // 10 — a unchanged!

// Objects — copy by REFERENCE
const obj1 = { x: 1, y: 2 };
const obj2 = obj1; // SAME object! sirf reference copy hua
obj2.x = 999;
console.log(obj1.x); // 999 — obj1 bhi change ho gaya!

// Functions bhi reference se pass hote hain
function modify(arr: number[]): void {
  arr.push(4); // original array modify ho raha hai!
}
const myArr = [1, 2, 3];
modify(myArr);
console.log(myArr); // [1, 2, 3, 4] — MODIFIED!

// ─── Copying Solutions ───────────────────────────────────────
interface NestedObj {
  a: number;
  b: { c: number };
}

const original: NestedObj = { a: 1, b: { c: 2 } };

// Shallow copy — top-level new, nested still shared
const shallow1: NestedObj = { ...original };
const shallow2: NestedObj = Object.assign({}, original);

shallow1.a = 999;   // original.a unchanged ✅
shallow1.b.c = 999; // original.b.c ALSO CHANGES! ❌ (shared reference)

// Deep copy — completely independent (modern approach)
const deep = structuredClone(original);
deep.b.c = 999;     // original.b.c unchanged ✅

// React state — hamesha new object return karo
// ❌ Wrong:
// state.count++; setState(state); // mutation!
// ✅ Correct:
// setState(prev => ({ ...prev, count: prev.count + 1 }));`,
            explanation: 'Reference types ki wajah se bugs subtle hote hain. structuredClone() best deep copy solution hai — globally available, Date/Map/Set support karta hai. React mein immutable updates critical hain.',
          }}
          realWorldScenario="Redux ya React state mein: agar tum direct mutation karo — state.user.name = 'Priya' — React re-render nahi karega kyunki object reference same rahega. Hamesha new object: setState({ ...state, user: { ...state.user, name: 'Priya' } }). Ye immutability pattern React performance ka basis hai."
          commonMistakes={[
            {
              mistake: 'Array ko function mein pass karna aur modify karna',
              why: 'Arrays objects hain — reference pass hota hai. Function ke andar push/pop/splice original array modify karte hain.',
              fix: 'Function ke andar copy banao: const arrCopy = [...arr]. Ya function se new array return karo instead of mutating.',
            },
            {
              mistake: 'JSON.parse(JSON.stringify()) ko perfect deep copy samajhna',
              why: 'JSON serialization se Date objects strings ban jaate hain, undefined values lost ho jaati hain, functions completely remove ho jaate hain, circular references crash karte hain.',
              fix: 'structuredClone() use karo — ye sab edge cases handle karta hai. Node.js 17+ aur modern browsers mein globally available hai.',
            },
          ]}
          proTip="structuredClone() globally available hai Node.js 17+ aur modern browsers mein. Date, Map, Set, RegExp — sab handle karta hai. JSON.parse/stringify se better. Circular references bhi handle karta hai (JSON approach crash karti hai). Production code mein ye use karo."
          demo={
            <DiffBlock
              title="Shallow Copy vs Deep Copy Gotcha"
              language="typescript"
              bad={{
                label: '❌ Shallow Copy — Nested Objects Shared',
                code: `const original = { a: 1, b: { c: 2 } };

// Shallow copy — spread ya Object.assign
const copy = { ...original };

copy.a = 999;    // ✅ original.a still 1
copy.b.c = 999;  // ❌ original.b.c ALSO 999!
// Because copy.b points to SAME object as original.b`,
                explanation: 'Spread only copies top-level — nested objects remain shared.',
              }}
              good={{
                label: '✅ Deep Copy — Completely Independent',
                code: `const original = { a: 1, b: { c: 2 } };

// structuredClone — proper deep copy
const deepCopy = structuredClone(original);

deepCopy.a = 999;   // ✅ original.a still 1
deepCopy.b.c = 999; // ✅ original.b.c still 2!
// deepCopy is completely independent

// Also works with Date, Map, Set:
const withDate = { createdAt: new Date(), data: [1, 2] };
const cloned = structuredClone(withDate);
// cloned.createdAt is a real Date, not a string!`,
                explanation: 'structuredClone() creates a completely independent deep copy. Modern and reliable.',
              }}
            />
          }
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 2 Quiz — Variables &amp; Memory Ka Test
          </h3>
          <p className="text-sm text-[#71717A]">
            Ab dekho — Execution Context ka mental model kitna strong hai? 5 sawaal, 80%+ chahiye!
          </p>
        </div>
        <QuizSection questions={chapterQuiz} chapterSlug="variables-datatypes" />
      </div>
    </div>
  )
}
