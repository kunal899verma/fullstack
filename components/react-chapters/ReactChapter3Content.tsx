'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'
import DiffBlock from '@/components/learn/DiffBlock'
import QuizSection from '@/components/learn/QuizSection'

// ── Chapter Quiz ──────────────────────────────────────────────────────────────

const componentPropsQuiz = [
  {
    question: 'React component ka naam capital letter se kyun start karna zaroori hai?',
    options: [
      {
        text: 'Convention hai — koi technical reason nahi',
        correct: false,
        explanation: 'Sirf convention nahi — ye React ke liye technical requirement hai. Lowercase = native HTML element.',
      },
      {
        text: 'React lowercase names ko native HTML elements samajhta hai — <button> HTML hai, <Button> tumhara component',
        correct: true,
        explanation: 'Bilkul sahi! React JSX mein lowercase tag names ko native HTML elements (div, span, button) ke roop mein treat karta hai. PascalCase = tumhara custom component.',
      },
      {
        text: 'TypeScript ki requirement hai PascalCase',
        correct: false,
        explanation: 'TypeScript convention hai PascalCase for classes/types, lekin React ka component naming rule TypeScript se independent hai.',
      },
      {
        text: 'Performance better hoti hai capital letter se',
        correct: false,
        explanation: 'Naming se performance ka koi lena dena nahi. Ye rendering ke saath kaise kaam karta hai iska issue hai.',
      },
    ],
  },
  {
    question: 'Props mutate karna (directly change karna) kyun galat hai?',
    options: [
      {
        text: 'TypeScript error deta hai isliye',
        correct: false,
        explanation: 'TypeScript error de sakta hai agar types correctly define hoon, lekin asli reason React ka data flow model hai.',
      },
      {
        text: 'Props parent component ke data hain — mutate karne se React ka unidirectional data flow break hota hai aur unpredictable behavior hoti hai',
        correct: true,
        explanation: 'Sahi! Props read-only hain by convention. Parent ne data diya — child sirf read kare. Change chahiye toh parent ko callback ke through batao (prop drilling / state lifting).',
      },
      {
        text: 'Props mutate karna allowed hai — performance ke liye sometimes karte hain',
        correct: false,
        explanation: 'Nahi, ye React anti-pattern hai. Props mutation se bugs aate hain jo dhundna bahut mushkil hota hai.',
      },
      {
        text: 'Sirf primitive props mutate nahi kar sakte, objects kar sakte hain',
        correct: false,
        explanation: 'Dono cases mein props mutate nahi karne chahiye. Object props mutate karna especially dangerous hai — silent bugs create hote hain.',
      },
    ],
  },
  {
    question: 'TypeScript interface mein ? ka matlab kya hai?',
    options: [
      {
        text: 'Property ka type uncertain hai',
        correct: false,
        explanation: '? type uncertainty nahi, optional property batata hai — prop pass karna required nahi hai.',
      },
      {
        text: 'Property optional hai — component use karte waqt ye prop pass karna zaroori nahi',
        correct: true,
        explanation: 'Correct! interface mein variant?: string matlab ye prop optional hai. Agar pass nahi kiya toh undefined hoga — isliye default value ya undefined check karo.',
      },
      {
        text: 'Property ek question mark string return karti hai',
        correct: false,
        explanation: 'Nahi, ? TypeScript ka optional property syntax hai, koi special string nahi.',
      },
      {
        text: 'Property sirf string type accept karti hai',
        correct: false,
        explanation: '? optional batata hai, type nahi specify karta. variant?: string matlab optional string property hai.',
      },
    ],
  },
  {
    question: 'children prop ka type kya hona chahiye TypeScript mein?',
    options: [
      {
        text: 'string — kyunki children text hota hai',
        correct: false,
        explanation: 'Children sirf text nahi hota — JSX elements, components, arrays sab ho sakte hain. string type bahut restrictive hai.',
      },
      {
        text: 'React.ReactNode — ye sab kuch accept karta hai jo React render kar sakta hai',
        correct: true,
        explanation: 'Bilkul sahi! React.ReactNode = string | number | boolean | null | undefined | ReactElement | ReactPortal | ReactFragment. Sab kuch jo React render kar sakta hai.',
      },
      {
        text: 'JSX.Element — kyunki children JSX hota hai',
        correct: false,
        explanation: 'JSX.Element sirf single React element accept karta hai — string children ya null accept nahi karta. ReactNode zyada flexible hai.',
      },
      {
        text: 'any — flexibility ke liye',
        correct: false,
        explanation: 'any TypeScript ka worst practice hai — type safety completely lose hoti hai. React.ReactNode use karo jo specific aur type-safe hai.',
      },
    ],
  },
  {
    question: 'Component ko chhote parts mein kab todna chahiye?',
    options: [
      {
        text: 'Kabhi nahi — ek bada component manage karna easy hota hai',
        correct: false,
        explanation: 'Ek bada component maintain karna, test karna, aur reuse karna mushkil hota hai. Single Responsibility follow karo.',
      },
      {
        text: 'Jab component ek se zyada independent cheezein kar raha ho ya 100-150 lines se zyada ho',
        correct: true,
        explanation: 'Sahi! 100-150 lines ek rough guideline hai. Isse zyada matlab typically multiple responsibilities hain. Agar tum component ka naam clearly ek line mein nahi de sakte, tod do.',
      },
      {
        text: 'Sirf jab TypeScript errors aane lagte hain',
        correct: false,
        explanation: 'TypeScript errors component size se nahi aate. Splitting ke liye architecture aur maintainability reasons hain.',
      },
      {
        text: 'Har 50 lines par — strict rule hai',
        correct: false,
        explanation: 'Koi strict line count rule nahi hai. Responsibilities aur readability ke hisaab se decide karo.',
      },
    ],
  },
]

// ── Chapter Overview Diagram ───────────────────────────────────────────────────

function PropsFlowDiagram() {
  const items = [
    {
      label: 'Parent Component',
      sublabel: 'Owns state — passes data DOWN via props to children',
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.1)',
      border: 'rgba(6,182,212,0.3)',
      icon: '👨',
    },
    {
      label: 'Child Component  ← props flow down (read-only)',
      sublabel: 'Receives props, uses them, cannot mutate them',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,0.1)',
      border: 'rgba(124,58,237,0.3)',
      icon: '👦',
    },
    {
      label: 'Grandchild Component  ← props flow down',
      sublabel: 'Deepest consumer — still read-only props',
      color: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
      border: 'rgba(16,185,129,0.3)',
      icon: '👶',
    },
    {
      label: 'Events flow UP ↑ via callback props',
      sublabel: 'onClick, onChange, onSubmit — child calls parent\'s function to update state',
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.07)',
      border: 'rgba(6,182,212,0.25)',
      icon: '↩️',
    },
  ]
  return (
    <div className="my-8">
      <p className="text-xs font-bold uppercase tracking-widest text-[#71717A] mb-4 text-center">Props Flow — One-Way Data Binding</p>
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

export default function ReactChapter3Content() {
  return (
    <div className="space-y-8">
      {/* Chapter Intro */}
      <div>
        <h1 className="text-4xl font-display font-bold text-[#F5F5F7] mb-3">
          Components &amp; Props 🧱
        </h1>
        <p className="text-[#A1A1AA] text-lg mb-6">
          Ab real React ki duniya mein aao — components aur props. Suno ek cheez pehle: component ek JavaScript function hai. Bas. Koi magic nahi. Ye function JSX return karta hai, aur React usse render karta hai. Props? Wo sirf function ke arguments hain. Jab ye simple truth samajh aata hai, toh React bahut less mysterious lagta hai.
        </p>
        <div
          className="rounded-xl p-4 mb-8"
          style={{
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(124,58,237,0.3)',
          }}
        >
          <p className="text-[#C4B5FD] text-sm">
            &ldquo;Ek component ek kaam kare, props ke through data receive kare, aur callbacks ke through parent se baat kare.&rdquo; — ye teen rules yaad karo, components sahi banoge.
          </p>
        </div>
      </div>

      <PropsFlowDiagram />

      {/* ConceptCard 1: Component Kya Hai? */}
      <div id="what-is-component">
        <ConceptCard
          title="Component Kya Hai?"
          emoji="🏗️"
          difficulty="beginner"
          whatIsIt="Component = JavaScript function that returns JSX. Itna simple hai definition. PascalCase naam zaroori hai — Button nahi button. React lowercase names ko HTML native elements samajhta hai: <button> HTML hai, <Button> tumhara component hai. Har component ek isolated UI piece hai — apna logic, apna state, apna output. Poori React app? Components ka ek tree."
          whenToUse={[
            'Har UI element jo repeat hota ho — Button, Card, Avatar, Badge',
            'Har major UI section — Header, Sidebar, Footer, Modal',
            'Jab ek cheez ka apna state aur behavior ho',
            'Jab koi UI piece test karna ho independently',
            'Team mein parallel development ke liye — alag log alag components',
          ]}
          whyUseIt="Components ki asli value reusability aur isolation mein hai. Bug Button mein hai? Sirf Button.tsx mein jaao. Feature add karna hai? Naya component banao, existing mein compose karo. Design update karna hai? Ek component update — poori app reflect. Team mein kaam kar rahe ho? Alag log alag components pe parallel kaam kar sakte hain. Ye sab composability ki wajah se possible hai."
          howToUse={{
            filename: 'UserCard.tsx',
            language: 'tsx',
            code: `// ✅ Basic functional component
function Greeting() {
  return <h1>Namaste!</h1>
}

// ✅ Component with props
function UserCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  )
}

// ✅ Arrow function component (same thing, different syntax)
const Badge = ({ text }: { text: string }) => (
  <span className="badge">{text}</span>
)

// ✅ Usage — compose karo
function App() {
  return (
    <div>
      <Greeting />
      <UserCard name="Rahul Sharma" role="Senior Dev" />
      <Badge text="Pro Member" />
    </div>
  )
}

// ❌ Lowercase — React ise HTML element samjhega
function userCard() {  // ← WRONG
  return <div>Card</div>
}`,
            explanation: 'PascalCase rule koi optional convention nahi — React ka requirement hai. function button() likhoge toh React <button> ko HTML tag samjhega. Function keyword ya arrow function — dono equally valid hain. Components compose karo Lego blocks ki tarah — chhote pieces se bada structure.',
          }}
          realWorldScenario="Zomato app dekhte ho — RestaurantCard component ek baar bana. Search results mein dikhta hai, Favorites mein dikhta hai, Nearby section mein dikhta hai. Teen jagah, ek component. Agar restaurant card ka design update karna ho — sirf RestaurantCard.tsx update karo — teeno jagah automatically update. Ye real-world component reusability hai."
          commonMistakes={[
            {
              mistake: 'Component name lowercase — function button() ya const card = ...',
              why: 'React <button> ko native HTML button element samjhega, tumhara component nahi. No error, but rendering completely wrong hoga.',
              fix: 'Hamesha PascalCase: function Button(), const UserCard = ..., function LoginForm(). Ye React ki strict requirement hai.',
            },
            {
              mistake: 'Component ke andar component define karna — nested function components',
              why: 'Har render mein inner component re-create hota hai — React ise naya component type samjhta hai aur pura unmount/mount cycle hota hai. State lost hoti hai, performance bad hoti hai.',
              fix: 'Components ko file ke top level par define karo, function ke andar nahi. Agar data share karna hai toh props use karo.',
            },
          ]}
          proTip="Ek anti-pattern bahut common hai — component ke andar component define karna. Ye kabhi mat karo! Har render pe inner component re-create hoti hai, React ise naya component type samjhta hai, pura unmount/remount cycle hota hai — state lost, performance bad. Components hamesha top-level pe define karo, kabhi function ke andar nahi."
        />
      </div>

      {/* ConceptCard 2: Props */}
      <div id="props">
        <ConceptCard
          title="Props — Parent Se Child Ko Data"
          emoji="📦"
          difficulty="beginner"
          whatIsIt="Props ka real matlab kya hai? Props sirf function arguments hain. Jab tum <Button label='Save' onClick={fn} /> likhte ho, React behind the scenes Button({label: 'Save', onClick: fn}) call karta hai. Ye sirf ek function call hai! Props read-only hain — child component unhe change nahi kar sakta — kyunki ye parent ka data hai, child ka nahi. Ye React ka unidirectional data flow hai."
          whenToUse={[
            'Parent se child ko koi bhi data pass karna ho — text, numbers, objects, functions',
            'Component ko configurable banana — different variants, sizes, colors',
            'Event handlers pass karna — onClick, onChange callbacks',
            'Child component ko control dena parent ke state se',
          ]}
          whyUseIt="Props ke bina components static aur hardcoded hote — reuse karne ka koi tarika nahi. Props se ek Button component infinite variations mein use ho sakta hai — primary, secondary, danger, small, large, disabled, loading — sab props se control hota hai. Props = component ka public API. Interface define karo, users (other developers) samjhenge component kya accept karta hai."
          howToUse={{
            filename: 'props-patterns.tsx',
            language: 'tsx',
            code: `// ── Pattern 1: Basic props ──────────────────────────────
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>
}
<Greeting name="Rahul" />

// ── Pattern 2: Destructuring with default values ─────────
function Button({
  label,
  onClick,
  variant = 'primary',  // default value
  size = 'medium',
}: {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
}) {
  return (
    <button onClick={onClick} className={\`btn-\${variant} btn-\${size}\`}>
      {label}
    </button>
  )
}

// ── Pattern 3: Object prop ───────────────────────────────
interface User {
  name: string
  email: string
  avatarUrl: string
}

function UserAvatar({ user }: { user: User }) {
  return (
    <div>
      <img src={user.avatarUrl} alt={user.name} />
      <p>{user.name}</p>
    </div>
  )
}

// ── Pattern 4: Spread props ──────────────────────────────
const buttonProps = { label: 'Submit', variant: 'primary' as const }
<Button onClick={handleSubmit} {...buttonProps} />`,
            explanation: 'Destructuring se props directly unpack karo — clean aur readable. Default values function parameter mein hi define karo — props drilling avoid. Object props ke liye separate interface banao — self-documenting API. Spread operator {...buttonProps} se existing objects pass karo.',
          }}
          realWorldScenario="Company ka design system sochte ho — Button component variant (primary/secondary/danger), size (sm/md/lg), disabled, isLoading, leftIcon — sab props hain. Marketing page mein, admin panel mein, mobile app mein — same Button component, sirf props alag. Ek component, poori company use kare. Ye design system ki power hai."
          commonMistakes={[
            {
              mistake: 'Props mutate karna — props.name = "New Name" ya props.user.age = 25',
              why: "Props React ka read-only convention follow karte hain. Direct mutation se React ka virtual DOM sync break hota hai, parent state update nahi hoti, aur bugs produce hote hain jo dhundna bahut mushkil hai.",
              fix: 'Agar value change karni hai, parent mein state rakho aur callback prop pass karo. Child callback call kare → parent state update kare → new props child ko mile.',
            },
            {
              mistake: 'Too many props — 15-20 props ek component ko pass karna',
              why: 'Component ka API confusing ho jaata hai, testing mushkil, usage verbose. Sign hai ki component too many responsibilities le raha hai.',
              fix: 'Props ko ek config object mein group karo. Ya component ko chhote components mein tod do. "Prop drilling" badh raha ho toh Context ya state management consider karo.',
            },
          ]}
          proTip="Props mutate karna — kabhi mat karo. props.name = 'New Value' likhna literally React ka data flow tod deta hai. Parent state update nahi hoti, React ka virtual DOM sync break hota hai, bugs produce hote hain jo dhundna nightmare hai. Props read karo, kabhi write mat karo. Change chahiye? Parent ko callback ke through batao."
          demo={
            <DiffBlock
              language="tsx"
              title="Without Props vs With Props"
              bad={{
                label: '❌ Hardcoded — Not Reusable',
                code: `// Sirf ek kaam ka hai
function WelcomeRahul() {
  return (
    <div className="card primary large">
      <h2>Hello, Rahul!</h2>
      <p>Senior Developer</p>
    </div>
  )
}`,
                explanation: 'Sirf Rahul ke liye kaam karta hai. Kisi aur ke liye naya component banana padega.',
              }}
              good={{
                label: '✅ Props — Fully Reusable',
                code: `// Kisi bhi user ke liye use karo
function UserCard({
  name,
  role,
  variant = 'primary',
}: {
  name: string
  role: string
  variant?: 'primary' | 'secondary'
}) {
  return (
    <div className={\`card \${variant}\`}>
      <h2>Hello, {name}!</h2>
      <p>{role}</p>
    </div>
  )
}

<UserCard name="Rahul" role="Senior Dev" />
<UserCard name="Priya" role="Designer" variant="secondary" />`,
                explanation: 'Props se component reusable ban gaya — any user, any role, any variant.',
              }}
            />
          }
        />
      </div>

      {/* ConceptCard 3: TypeScript Interfaces for Props */}
      <div id="typescript-props">
        <ConceptCard
          title="TypeScript Se Props Type Karo"
          emoji="🔷"
          difficulty="beginner"
          whatIsIt="TypeScript ke bina React kya hoga? Runtime mein errors — user screen pe crash dekhta hai. TypeScript ke saath? Wrong props pass karo — editor mein red underline, compile time pe catch. Ye shift runtime se compile time — development mein time bachata hai, production mein bugs bachata hai. React + TypeScript 2025 mein industry standard hai — TypeScript skip karna apne aap ko nuksaan pahunchana hai."
          whenToUse={[
            'Hamesha — TypeScript use karna hai toh interfaces define karo',
            'Reusable components ke liye — clear API documentation',
            'Team projects mein — dusre devs samjhein component kya accept karta hai',
            'Complex prop types ke liye — unions, generics, callbacks',
          ]}
          whyUseIt="TypeScript ka value proposition simple hai: compile time errors > runtime errors. Wrong prop pass karo — editor immediately batata hai, production code mein jaata hi nahi. Autocomplete — editor jaanta hai component kaunse props accept karta hai, sab suggest karta hai. Self-documenting API — interface padhke samajh aata hai component kaise use karna hai, README update karne ki zaroorat nahi."
          howToUse={{
            filename: 'Button.tsx',
            language: 'tsx',
            code: `// ── Interface define karo ───────────────────────────────
interface ButtonProps {
  label: string                          // required
  onClick: () => void                    // required, callback
  variant?: 'primary' | 'secondary' | 'danger'  // optional union
  size?: 'sm' | 'md' | 'lg'            // optional union
  disabled?: boolean                     // optional boolean
  isLoading?: boolean                    // optional boolean
  icon?: React.ReactNode                 // optional JSX element
  className?: string                     // optional CSS class
}

// ── Component ────────────────────────────────────────────
function Button({
  label,
  onClick,
  variant = 'primary',    // default value
  size = 'md',
  disabled = false,
  isLoading = false,
  icon,
  className = '',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={\`btn btn-\${variant} btn-\${size} \${className}\`}
    >
      {isLoading ? (
        <span className="spinner" />
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {label}
        </>
      )}
    </button>
  )
}

// ── Usage — TypeScript yahan errors pakdega ──────────────
<Button label="Save" onClick={handleSave} />                    // ✅
<Button label="Delete" onClick={handleDelete} variant="danger" /> // ✅
// <Button onClick={handleSave} />   ← ❌ label missing — TS error
// <Button label="X" variant="invalid" onClick={fn} /> ← ❌ TS error`,
            explanation: 'Interface mein ? matlab optional prop — nahi diya toh TypeScript error nahi aayega. Union types (\'primary\' | \'secondary\' | \'danger\') exact allowed values define karte hain — typo hone pe immediately error. React.ReactNode icons ke liye — sab kuch accept karta hai jo React render kar sakta hai. Interface inline type se better hai — reusable aur readable.',
          }}
          realWorldScenario="Kisi bhi production React codebase mein jaao — Button.tsx ke paas ButtonProps interface hoga. Koi naya developer join karta hai, Button use karta hai — editor automatically sab props suggest karta hai, required aur optional dono. Koi README padhne ki zaroorat nahi, koi documentation update karne ki zaroorat nahi. TypeScript itself documentation hai — living, always up-to-date."
          commonMistakes={[
            {
              mistake: "any type use karna — props: any ya value: any",
              why: 'any TypeScript ki type safety completely disable kar deta hai — wrong types pass karo, koi error nahi. Type checking ka poora fayda khatam.',
              fix: 'Proper types use karo: string, number, boolean, React.ReactNode, specific union types. Agar type pata nahi, unknown use karo aur type narrow karo — any nahi.',
            },
            {
              mistake: 'Interface ke liye Props suffix miss karna — interface Button instead of ButtonProps',
              why: 'Convention matter karta hai — ButtonProps clearly batata hai ye Button component ke props hain. Button naam clashes ho sakta hai kisi imported type se.',
              fix: "Convention follow karo: ComponentNameProps — ButtonProps, UserCardProps, ModalProps. Ya type alias use karo: type ButtonProps = {...}. Dono valid hain.",
            },
          ]}
          proTip="any type use karna TypeScript ka sabse bura use hai. any matlab type checking completely off — wrong types pass karo, koi error nahi. Type safety ka koi fayda nahi. Agar type pata nahi, unknown use karo — phir narrow karo. Prop type pata nahi? Bas sochte raho kya accept karna chahiye — API design karo, any mat daalo."
        />
      </div>

      {/* ConceptCard 4: children Prop */}
      <div id="children-prop">
        <ConceptCard
          title="children — Nested Content"
          emoji="🪆"
          difficulty="beginner"
          whatIsIt="children prop ke baare mein ek interesting cheez — ye automatically available hoti hai. <Card><p>Hello</p></Card> mein opening aur closing tag ke beech jo bhi likha, woh children prop mein aata hai. Koi explicitly pass nahi karna — React khud handle karta hai. React.ReactNode type use karo — ye sab kuch accept karta hai: string, JSX elements, arrays, null. Ye composition pattern enable karta hai — container component banao jo kuch bhi wrap kare."
          whenToUse={[
            'Container components — Card, Modal, Section, Layout wrappers',
            'Styled wrappers — consistent padding/border/bg ke saath',
            'Layout components — Sidebar, Header, PageContainer',
            'Generic slots — jahan content flexible rakhna ho',
            'Compound components — Tab, TabPanel, Accordion patterns',
          ]}
          whyUseIt="children ke bina container component rigid hota hai — hardcoded content. children se container apni styling aur behavior handle karta hai, kya dikhana hai ye parent decide karta hai. Ye separation of concerns hai — Card component ko nahi pata kya content aayega, sirf jaanta hai kaise wrap karna hai. Content flexibility parent ke haath mein. Ye flexibility composition ko powerful banati hai."
          howToUse={{
            filename: 'composition.tsx',
            language: 'tsx',
            code: `import React from 'react'

// ── Basic children prop ──────────────────────────────────
interface CardProps {
  children: React.ReactNode    // ye type use karo hamesha
  title?: string
  className?: string
}

function Card({ children, title, className = '' }: CardProps) {
  return (
    <div className={\`card \${className}\`}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

// ── Usage — flexible! ────────────────────────────────────
function App() {
  return (
    <>
      {/* Text content */}
      <Card title="Profile">
        <p>Rahul Sharma</p>
        <p>Senior Developer</p>
      </Card>

      {/* Component content */}
      <Card title="Stats">
        <StatsChart data={chartData} />
        <MetricsList metrics={metrics} />
      </Card>

      {/* Mixed content */}
      <Card>
        <img src="/hero.png" alt="Hero" />
        <h2>Welcome to NodeMaster</h2>
        <p>Learn Node.js step by step</p>
        <Button label="Start Learning" onClick={handleStart} />
      </Card>
    </>
  )
}

// ── Slot pattern — named children ────────────────────────
interface ModalProps {
  header: React.ReactNode   // named slot
  footer: React.ReactNode   // named slot
  children: React.ReactNode // main content
}

function Modal({ header, footer, children }: ModalProps) {
  return (
    <div className="modal">
      <div className="modal-header">{header}</div>
      <div className="modal-body">{children}</div>
      <div className="modal-footer">{footer}</div>
    </div>
  )
}

// Modal usage:
<Modal
  header={<h2>Confirm Delete</h2>}
  footer={
    <div className="flex gap-2">
      <Button label="Cancel" variant="secondary" onClick={onClose} />
      <Button label="Delete" variant="danger" onClick={onDelete} />
    </div>
  }
>
  <p>Kya aap sure hain? Ye action undo nahi hoga.</p>
</Modal>`,
            explanation: 'React.ReactNode = sab kuch jo React render kar sakta hai (string, number, JSX, null, array). Ye most flexible type hai children ke liye. Named slots (header, footer props) se structured composition banati hai — Modal example mein teen distinct areas hain, each independently composable.',
          }}
          realWorldScenario="Admin dashboard sochte ho — PageLayout component ek baar banao: sidebar, header, main content area. Har page same layout use karta hai, sirf content alag hota hai. DashboardPage, SettingsPage, UsersPage — sab <PageLayout> ke andar. Layout code ek jagah — consistent structure guarantee hai. Navigation color change? Sirf PageLayout.tsx update karo."
          commonMistakes={[
            {
              mistake: 'children ka type string ya JSX.Element define karna',
              why: 'string type sirf text accept karta hai — component children fail honge. JSX.Element sirf single React element — null, undefined, string fail honge.',
              fix: 'Hamesha React.ReactNode use karo children ke liye — ye most flexible type hai jo sab kuch accept karta hai React render kar sakta hai.',
            },
            {
              mistake: 'children ko ek prop ki tarah explicitly pass karna — <Card children={<p>Hello</p>} />',
              why: 'Ye kaam karta hai technically, lekin readable nahi. JSX opening-closing tag syntax ke liye bana hai.',
              fix: '<Card><p>Hello</p></Card> use karo — yahi idiomatic React hai. children prop explicitly pass karna confusing convention hai.',
            },
          ]}
          proTip="children ka type string ya JSX.Element kabhi mat likho. string sirf text children accept karta hai — component children fail honge. JSX.Element sirf single React element — null ya string fail honge. Hamesha React.ReactNode — ye most inclusive type hai. Ye ek common mistake hai jo TypeScript error deta hai bina obvious reason ke."
        />
      </div>

      {/* ConceptCard 5: Component Composition */}
      <div id="component-composition">
        <ConceptCard
          title="Composition — Lego Blocks Build Karo"
          emoji="🏰"
          difficulty="beginner"
          whatIsIt="Composition React ka core design principle hai — inheritance nahi. Object-oriented programming mein inheritance hoti thi, React mein nahi. Kyun? Composition zyada flexible hai. Chhote, focused components banao, unhe combine karo. Button + Icon = IconButton. Card + Avatar + Stats = ProfileCard. Ye Lego approach hai — basic blocks se kuch bhi banao. Har block independently testable, replaceable, reusable."
          whenToUse={[
            'Complex UI jo multiple smaller pieces se bani ho',
            'Jab code repetition dikh raha ho — pattern extract karo ek component mein',
            'Jab ek component zyada complex ho raha ho — split karo',
            'Shared layout patterns — consistent spacing, borders, shadows',
            'Feature-specific components — UserProfile = Avatar + UserInfo + UserActions',
          ]}
          whyUseIt="Composition ke bina God components bante hain — 500 line ka ek file, sab kuch ek jagah. Test karna impossible, modify karna risky, team kaam nahi kar sakti. Composition se pyramid banata hai — atomic components base pe, complex UI upar. Button test karo independently. ProductCard test karo — Button mock karo. ProductPage test karo — ProductCard mock karo. Har level isolated, testable, changeable."
          howToUse={{
            filename: 'ProductCard.tsx',
            language: 'tsx',
            code: `// ── Level 1: Atomic components ──────────────────────────
function Badge({ text, color }: { text: string; color: 'green' | 'red' | 'yellow' }) {
  const colorMap = {
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
  }
  return <span className={\`badge \${colorMap[color]}\`}>{text}</span>
}

function PriceTag({ price, discountPrice }: { price: number; discountPrice?: number }) {
  return (
    <div className="price">
      {discountPrice ? (
        <>
          <span className="line-through text-gray-400">₹{price}</span>
          <span className="text-green-600 font-bold">₹{discountPrice}</span>
        </>
      ) : (
        <span className="font-bold">₹{price}</span>
      )}
    </div>
  )
}

// ── Level 2: Composed component ──────────────────────────
interface ProductCardProps {
  name: string
  price: number
  discountPrice?: number
  imageUrl: string
  inStock: boolean
  rating: number
  onAddToCart: () => void
}

function ProductCard({
  name,
  price,
  discountPrice,
  imageUrl,
  inStock,
  rating,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} />
      <div className="product-info">
        <h3>{name}</h3>
        <div className="flex items-center gap-2">
          <Badge
            text={inStock ? 'In Stock' : 'Out of Stock'}
            color={inStock ? 'green' : 'red'}
          />
          <span>⭐ {rating}/5</span>
        </div>
        <PriceTag price={price} discountPrice={discountPrice} />
        <Button
          label={inStock ? 'Add to Cart' : 'Notify Me'}
          onClick={onAddToCart}
          variant={inStock ? 'primary' : 'secondary'}
          disabled={!inStock}
        />
      </div>
    </div>
  )
}

// ── Level 3: Page level ──────────────────────────────────
function ProductGrid({ products }: { products: ProductCardProps[] }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product, i) => (
        <ProductCard key={i} {...product} />
      ))}
    </div>
  )
}`,
            explanation: 'Teen levels dekho — atomic (Badge, PriceTag), composed (ProductCard), page-level (ProductGrid). Har level apna kaam karta hai. Badge ka design change karna ho? Sirf Badge.tsx. Price format change karna ho? Sirf PriceTag.tsx. ProductCard UI update? Sirf ProductCard.tsx. Ye isolation composition ki gift hai.',
          }}
          realWorldScenario="Flipkart product listing ka dissection karo — Badge (discount %), PriceTag (original + discounted), RatingStars, AddToCartButton — sab alag components hain jo ProductCard mein compose hote hain. Big Sale aane pe? Sirf Badge aur PriceTag components update karo — poora site automatically reflect karta hai. Ek junior developer Badge fix kar sakta hai bina ProductCard ya ProductGrid ko touch kiye."
          commonMistakes={[
            {
              mistake: 'God components — ek component mein sab kuch: state, API calls, UI, business logic',
              why: 'Testing impossible, multiple developers kaam nahi kar sakte, har change unrelated bugs introduce karta hai, reuse zero.',
              fix: 'Separate karo: Container components (data fetching + state) aur Presentational components (sirf UI). Phir chhote UI pieces mein tod do.',
            },
            {
              mistake: 'Premature abstraction — pehli use se hi generic component banana',
              why: "Rule of Three: ek baar use hoga toh specific likho. Doosri baar use hoga toh copy karo. Teesri baar use hoga tab generalize karo. Premature abstraction wrong abstraction hoti hai — baad mein fix karna mushkil.",
              fix: 'Pehle specific likho, jab repetition dikh toh abstract karo. YAGNI principle: You Ain\'t Gonna Need It.',
            },
          ]}
          proTip="Premature abstraction avoid karo — Rule of Three follow karo. Ek jagah use hoga? Specific likho. Doosri jagah use hoga? Copy karo. Teesri jagah use hoga? Tab generalize karo. Pehli use se generic component banana frequently wrong abstraction hoti hai — baad mein change karna mushkil. YAGNI — You Ain't Gonna Need It. Pehle specific, repetition dikhne par abstract."
          demo={
            <DiffBlock
              language="tsx"
              title="Monolithic vs Composed"
              bad={{
                label: '❌ Monolithic Component',
                code: `// 200+ lines ka ek component
function ProductPage() {
  // API calls
  // State management
  // Business logic
  // Image gallery
  // Reviews
  // Related products
  // Cart logic
  // ALL IN ONE FILE 😰
  return (
    <div>
      {/* Sab kuch ek jagah */}
    </div>
  )
}`,
                explanation: 'Test karna impossible, modify karna risky, team kaam nahi kar sakti.',
              }}
              good={{
                label: '✅ Composed Components',
                code: `// Clean composition
function ProductPage({ productId }: { productId: string }) {
  const { product, isLoading } = useProduct(productId)

  if (isLoading) return <ProductSkeleton />

  return (
    <PageLayout>
      <ProductGallery images={product.images} />
      <ProductInfo product={product} />
      <ProductReviews productId={productId} />
      <RelatedProducts category={product.category} />
    </PageLayout>
  )
}`,
                explanation: 'Har component apna kaam karta hai. Test karo alag alag. Modify karo bina risk ke.',
              }}
            />
          }
        />
      </div>

      {/* Chapter Quiz */}
      <div id="chapter-quiz">
        <div className="mb-4">
          <h3 className="text-lg font-display font-bold text-[#F5F5F7] mb-1">
            Chapter 3 Quiz — Components &amp; Props Check
          </h3>
          <p className="text-sm text-[#71717A]">
            5 questions — React ka foundation kitna solid hai? Proof karo!
          </p>
        </div>
        <QuizSection questions={componentPropsQuiz} chapterSlug="components-props" />
      </div>
    </div>
  )
}
