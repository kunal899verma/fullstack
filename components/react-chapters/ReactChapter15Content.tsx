'use client'

import React from 'react'
import ConceptCard from '@/components/learn/ConceptCard'

export default function ReactChapter15Content() {
  return (
    <div className="space-y-8">
      <div
        className="rounded-2xl p-6"
        style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
      >
        <h2 className="text-2xl font-display font-bold text-[#F5F5F7] mb-3" id="intro">
          Advanced React Patterns — Pro Level Components
        </h2>
        <p className="text-[#A1A1AA] leading-relaxed mb-3">
          Ruko ek second. Tum React seekh rahe ho — useState, useEffect, props — sab theek hai. Lekin ek din tumhara manager aayega aur bolega: "Yaar, ye component 20 alag jagah use ho raha hai aur har jagah same auth check likh rahe ho?" Us din tumhe Advanced Patterns ki zaroorat padegi. HOC, Render Props, Compound Components — ye sirf "advanced" nahi hain, ye React ka asli power hai.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Socho ek baar — Radix UI, Headless UI, React Table, Formik — ye sab multi-million download libraries hain. In sab ke andar same patterns hain. Aaj hum ye patterns seedha source code level pe samjhenge. Phir tum sirf library use nahi karoge — tum khud aisi library bana sakte ho.
        </p>
      </div>

      <div id="hoc">
        <ConceptCard
          title="Higher-Order Components (HOC)"
          emoji="🔮"
          difficulty="advanced"
          whatIsIt="Sunne mein complex lagta hai lekin concept ekdum simple hai — HOC ek aisa function hai jo ek component andar jaata hai aur ek upgraded component baahir aata hai. Jaise transformer. withAuth(Dashboard) — Dashboard andar gaya, ProtectedDashboard baahir aaya. Authentication logic? Inject ho gayi. Original Dashboard ko ek line bhi nahi chhuna pada. Ye hai HOC — component ka 'power-up.' Class component era ka pattern hai, ab Custom Hooks ne mostly replace kar liya, lekin Radix UI aur legacy codebases mein aaj bhi zinda hai."
          whenToUse={[
            'Cross-cutting concerns — auth check, analytics, error boundary sab components mein',
            'Third party libraries jab component wrapping jaroori ho',
            'Legacy codebases jahan hooks nahi hain',
            'Component mein bhi logic inject karna ho — Display-time logic',
          ]}
          whyUseIt="Socho tumhare paas 20 protected pages hain. Har page mein auth check likhoge? Kal auth logic change ho gayi toh 20 files khologe? Ye madness hai! HOC ka funda simple hai — ek baar likho, sab jagah wrap karo. withAuth ek baar, 20 components protected. Kal logic change karo — sirf withAuth mein karo, 20 pages automatically updated. Ye hai separation of concerns — har component apna kaam kare, HOC cross-cutting concerns sambhale."
          howToUse={{
            filename: 'hoc-patterns.tsx',
            language: 'typescript',
            code: `import { ComponentType, useEffect } from 'react'

// withAuth HOC — authentication check
function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth()

    if (isLoading) return <Spinner />
    if (!user) return <Navigate to="/login" replace />

    return <WrappedComponent {...props} />
  }

  // DevTools mein readable name
  AuthenticatedComponent.displayName = \`withAuth(\${WrappedComponent.displayName ?? WrappedComponent.name})\`

  return AuthenticatedComponent
}

// withLoading HOC — loading state
function withLoading<P extends { isLoading?: boolean }>(WrappedComponent: ComponentType<P>) {
  return function WithLoadingComponent(props: P) {
    if (props.isLoading) return <LoadingSpinner />
    return <WrappedComponent {...props} />
  }
}

// Usage — wrap karo
const ProtectedDashboard = withAuth(Dashboard)
const DataTableWithLoading = withLoading(DataTable)

function App() {
  return (
    <>
      <ProtectedDashboard />  {/* Auth check automatic */}
      <DataTableWithLoading isLoading={loading} data={data} />
    </>
  )
}

// Multiple HOCs compose karo
const compose = (...hocs: Array<(c: ComponentType) => ComponentType>) =>
  (Component: ComponentType) => hocs.reduceRight((acc, hoc) => hoc(acc), Component)

const EnhancedDashboard = compose(withAuth, withErrorBoundary, withAnalytics)(Dashboard)`,
            explanation: "Ab seedha under the hood chalte hain. <P extends object> TypeScript generic hai — iska matlab: 'jo bhi props Original Component leta tha, wahi Enhanced Component bhi lega.' Type safety guarantee ho gayi bina kuch extra likhe. displayName kya hai? DevTools mein bina ye likhe component 'Unknown' dikhega — debugging nightmare. Spread operator {...props} — original component ko uske saare props milte hain, HOC beech mein sirf apna logic add karta hai, interfere nahi karta. compose? Ek baar multiple HOCs chain karne ki need padi — withAuth(withErrorBoundary(withAnalytics(Dashboard))) itna nested likhoge? compose se ek line mein — DRY principle, elegance.",
          }}
          realWorldScenario="Imagine karo ek startup hai — 50 pages hain, ek din investor ne bola 'analytics chahiye, har page pe user kahan jaata hai track karo.' Junior developer ne kya kiya? 50 files mein jaake manually analytics.track() daal diya. Senior developer ne kya kiya? withAnalytics HOC likha — ek baar, har component wrap kar diya — 10 minutes mein kaam done. Yahi hai real-world HOC ka power. Aur kal koi bhi page agar analytics nahi chahiye — bas wrap hatao."
          commonMistakes={[
            {
              mistake: 'render function ke andar HOC call karna',
              why: 'Har render mein naya component create hoga — React tree mein unmount/remount cycle — performance hit aur state loss.',
              fix: 'HOC module level par ya component ke bahar call karo: const Enhanced = withAuth(MyComponent). Kabhi return ke andar nahi.',
            },
            {
              mistake: 'Static methods aur refs forward nahi karna',
              why: 'Wrapped component ke static methods accessible nahi hote HOC return se. Ref bhi forward nahi hota by default.',
              fix: 'hoist-non-react-statics library use karo: hoistNonReactStatics(Wrapper, WrappedComponent). Refs ke liye React.forwardRef use karo.',
            },
          ]}
          proTip="Ye puchna mat bhulo khud se — 'Custom Hook se kaam chal sakta hai kya?' Agar haan, hook prefer karo. HOC apna kaam tab karta hai jab component ka rendering behavior change karna ho — conditional render, error catch, bina component ko touch kiye. Rule of thumb: logic reuse = hook, render behavior change = HOC. Dono ek dusre ke competitor nahi, teammates hain."
        />
      </div>

      <div id="render-props">
        <ConceptCard
          title="Render Props — Children as Function"
          emoji="📤"
          difficulty="advanced"
          whatIsIt="Ye naam sunke confusing lagta hai — 'Render Props.' Lekin ek simple sawaal se shuru karte hain: ek component jo mouse position track kare, aur us data se koi bhi UI banana ho — text, image, heatmap, anything. Kaise karoge? Render Props pattern ka jawab hai: component ek function accept karta hai jisko woh call karta hai apna data de ke. Aap us data se jo chaaho bana lo. Logic component ke paas, UI aapke haath mein. Jaise ek chef jo sirf ingredients deta hai — dish aap banao."
          whenToUse={[
            'Component logic aur rendering dono share karne hoon alag alag UI ke saath',
            'Headless components banana — logic without styling',
            'Dynamic content rendering jisme parent ko child data access karna ho',
            'Libraries jaise Formik (field render props), React Table',
          ]}
          whyUseIt="Sochte hain practically — MouseTracker component likhna ek baar, use karna kahin bhi. Pehle jagah pe coordinates text mein dikhao. Doosri jagah pe ek image mouse follow kare. Teesri jagah pe heatmap banao. Har case mein naya component likhna padega kya? Nahi! Render Props se ek component ki logic sabki service karta hai, UI har jagah alag. Ye hai 'composition over inheritance' — hierarchy banana ki zaroorat nahi, sirf compose karo."
          howToUse={{
            filename: 'render-props.tsx',
            language: 'typescript',
            code: `// Mouse position tracker — logic without UI
interface MousePosition { x: number; y: number }

interface MouseTrackerProps {
  children: (position: MousePosition) => React.ReactNode
  // ya render prop: render: (position: MousePosition) => React.ReactNode
}

function MouseTracker({ children }: MouseTrackerProps) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) =>
      setPosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return <>{children(position)}</>  // Function call karo, result render karo
}

// Different UIs, same logic
function App() {
  return (
    <>
      {/* Coordinates as text */}
      <MouseTracker>
        {({ x, y }) => <p>Mouse: {x}, {y}</p>}
      </MouseTracker>

      {/* Following cat */}
      <MouseTracker>
        {({ x, y }) => (
          <img
            src="/cat.png"
            style={{ position: 'fixed', left: x, top: y, pointerEvents: 'none' }}
          />
        )}
      </MouseTracker>
    </>
  )
}

// Data fetching render prop (HOC alternative)
interface DataFetcherProps<T> {
  url: string
  children: (state: { data: T | null; loading: boolean; error: Error | null }) => React.ReactNode
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const state = useFetch<T>(url)
  return <>{children(state)}</>
}`,
            explanation: "Step by step trace karte hain — MouseTracker render hota hai, useEffect mein mousemove listener attach hota hai. Har mouse move pe position update hota hai. Ab return mein kya hai? children(position) — aapka function call ho raha hai position data ke saath! Aap jo function pass kiya tha — woh chalta hai, result render hota hai. TypeScript mein DataFetcher<T> ka generic T kya kaam karta hai? Ensure karta hai ki data ka type jo API return kare wahi type aapke UI ko milega — no type mismatch at runtime. Hooks aane ke baad ye pattern less popular hua, lekin library APIs mein aaj bhi everywhere hai — Formik, React Table dekho.",
          }}
          realWorldScenario="Formik ko kholo — `<Formik onSubmit={...}>{({ values, handleChange, errors }) => <form>...</form>}</Formik>`. Woh function pass kiya na tumne? Woh Render Props pattern hai. Form ka poora state management Formik sambhalta hai, aapka UI aapke control mein. React Table bhi same — table logic library mein, rendering tumhara. Ek baar samjho phir ye libraries automatically crystal clear ho jaati hain."
          commonMistakes={[
            {
              mistake: 'Render prop function ke andar arrow function create karna',
              why: 'Har parent render mein naya function reference = children ko new prop milta hai = unnecessary re-render.',
              fix: 'Function ko class method mein ya useCallback mein define karo: const renderContent = useCallback(({ x, y }) => <div>{x}</div>, []).',
            },
            {
              mistake: 'Render Props aur Custom Hooks dono implement karna',
              why: 'Over-engineering — Custom Hooks render props se simpler aur more composable hain modern React mein.',
              fix: 'Pehle Custom Hook implement karo (useMousePosition). Agar library API banana ho jahan hooks use nahi ho sakta toh Render Props use karo.',
            },
          ]}
          proTip="Homework assignment hai — Downshift library kholo. Autocomplete, combobox — pure logic, zero styling. getItemProps, getInputProps — function se props milte hain, UI tumhara. Ye Render Props aur prop getter pattern ka masterclass hai. Source code padha toh pattern truly internalize ho jaayega. Real React engineers libraries padhte hain, sirf use nahi karte."
        />
      </div>

      <div id="compound-components">
        <ConceptCard
          title="Compound Components — Implicit State Sharing"
          emoji="🧩"
          difficulty="advanced"
          whatIsIt="Ek sawaal — HTML ka `<select>` aur `<option>` kaise kaam karta hai? Select internally state rakhta hai — kaunsa option selected hai. Option ko pata bhi nahi hota parent ka kya state hai, phir bhi sab kaam karta hai. Ye hai Compound Components! React mein parent Context se state share karta hai children ke saath — children ko explicitly kuch pass nahi karna. `<Tabs>` active tab track karta hai, `<Tabs.Tab>` khud context se poochh leta hai 'kya main active hoon?' Declarative, clean, aur feels like native HTML."
          whenToUse={[
            'Tabs, Accordion, Dropdown, Modal — components jo multiple parts se bane hoon',
            'Related components mein state share karni ho bina prop drilling ke',
            'Flexible composition chahiye — children reorder ya customize kar sakein',
            'Library banana ho jo clean API expose kare',
          ]}
          whyUseIt="Bina Compound Components ke Tabs likhne ka try karo — activeTab prop har child ko pass karo, setActiveTab pass karo, phir every Tab mein condition check karo. Prop drilling ka nightmare! Compound Components mein parent state sambhalta hai, children Context se le lete hain — user ka code ekdum clean: `<Tabs defaultTab='a'><Tabs.Tab id='a'>Tab A</Tabs.Tab><Tabs.Panel id='a'>Content</Tabs.Panel></Tabs>`. Bas itna. Complexity hide ho gayi, API beautiful ho gayi."
          howToUse={{
            filename: 'compound-component.tsx',
            language: 'typescript',
            code: `import { createContext, useContext, useState } from 'react'

// Context — child components ke liye
interface TabsContextValue {
  activeTab: string
  setActiveTab: (id: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('useTabs must be used within Tabs')
  return ctx
}

// Parent — state manage karta hai
interface TabsProps {
  defaultTab: string
  children: React.ReactNode
}

function Tabs({ defaultTab, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

// Tab button
function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const { activeTab, setActiveTab } = useTabs()
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={activeTab === id ? 'active' : ''}
    >
      {children}
    </button>
  )
}

// Tab panel
function Panel({ id, children }: { id: string; children: React.ReactNode }) {
  const { activeTab } = useTabs()
  if (activeTab !== id) return null
  return <div>{children}</div>
}

// Attach sub-components
Tabs.Tab = Tab
Tabs.Panel = Panel

// User ka code — clean declarative API
function Dashboard() {
  return (
    <Tabs defaultTab="overview">
      <div className="tab-list">
        <Tabs.Tab id="overview">Overview</Tabs.Tab>
        <Tabs.Tab id="analytics">Analytics</Tabs.Tab>
        <Tabs.Tab id="settings">Settings</Tabs.Tab>
      </div>
      <Tabs.Panel id="overview"><OverviewContent /></Tabs.Panel>
      <Tabs.Panel id="analytics"><AnalyticsContent /></Tabs.Panel>
      <Tabs.Panel id="settings"><SettingsContent /></Tabs.Panel>
    </Tabs>
  )
}`,
            explanation: "Code trace karte hain step by step: Tabs render hota hai, useState se activeTab 'overview' hai. Context.Provider wrap karta hai sab children ko. Ab Tabs.Tab render hota hai — useTabs() call karta hai, Context se activeTab milta hai. Button click hota hai? setActiveTab('analytics') — Context update hota hai. Sab Tabs.Tab aur Tabs.Panel re-render hote hain apni state se. Kahin koi prop drilling nahi! useTabs() mein null check kyon? Agar koi Tab ko Tabs ke baahir use kare toh 'useTabs must be used within Tabs' — clear error, confusing undefined nahi. Tabs.Tab = Tab — ye pattern sub-components namespace mein organize karta hai. Ek import, sab kuch accessible.",
          }}
          realWorldScenario="Radix UI ka Dialog kholo — `<Dialog.Root>`, `<Dialog.Trigger>`, `<Dialog.Content>`. Exactly same pattern. Root state manage karta hai — dialog open hai ya nahi. Trigger Context se state leke toggle karta hai. Content conditionally render hota hai. Aur ye sab bina ek bhi external class ya style ke. Zero styling, pure behavior. Ye hai production-grade Compound Components — Vercel, Linear, Raycast sab ye Radix UI pe banaye hain."
          commonMistakes={[
            {
              mistake: 'Context ke bajaye cloneElement use karna',
              why: 'React.cloneElement props inject karta hai lekin fragile hai — children structure change hone par break hota hai.',
              fix: 'Context use karo compound components ke liye — flexible, robust, any nesting depth support karta hai.',
            },
            {
              mistake: 'Sub-components ko forget karna attach karna parent par',
              why: 'Tabs.Tab = Tab na likhne par user import kaise karega?',
              fix: 'Export type: export { Tabs, Tab, Panel } ya attach karo: Tabs.Tab = Tab; Tabs.Panel = Panel. Default export clean API ke liye.',
            },
          ]}
          proTip="Pro move — dono variants support karo: defaultTab (uncontrolled, internal state, simple use) aur value + onChange (controlled, external state, complex integration). Bilkul HTML input jaisa — simple form mein uncontrolled, complex form library ke saath controlled. Ye ek component ko beginner-friendly bhi banata hai aur power-user-friendly bhi. Real library developers yahi karte hain."
        />
      </div>

      <div id="headless-ui">
        <ConceptCard
          title="Headless UI — Logic Without Styles"
          emoji="👻"
          difficulty="advanced"
          whatIsIt="'Headless' — ye naam kyon? Kyunki body hai, head nahi. Logic hai, face nahi. Keyboard navigation? Hai. ARIA attributes? Hai. Focus trap? Hai. Styling? Zero. Yaar, ye accessibility ka kaam tumhara nahi, library ka hai — aur styling ka kaam library ka nahi, tumhara hai. Radix UI, Headless UI, React Aria — ye sab keh rahe hain: 'hum behavior aur accessibility guarantee karte hain, aap design apna laao.' Ye hai headless philosophy — aur ye future hai component development ka."
          whenToUse={[
            'Custom design system banana ho from scratch',
            'Accessibility-first components chahiye bina opinionated styling ke',
            'Existing component library ka design theek nahi lagta',
            'Tailwind CSS ke saath completely custom styled components chahiye',
          ]}
          whyUseIt="MUI ya Ant Design use kiya hai kabhi? Sundar hain, lekin customize karna? Ek button ka color change karne ke liye theme override, sx prop, makeStyles — documentation ka jungle. Aur phir bhi kabhi kabhi override nahi hota. Headless se? Radix Dialog liya, apni Tailwind classes daalein — done. No overrides, no !important hacks. Battle-tested behavior + tumhara unique design = winning combination."
          howToUse={{
            filename: 'headless-demo.tsx',
            language: 'typescript',
            code: `// Custom headless toggle — logic without styles
interface UseToggleReturn {
  isOn: boolean
  toggle: () => void
  on: () => void
  off: () => void
  getToggleProps: () => {
    role: 'switch'
    'aria-checked': boolean
    onClick: () => void
    onKeyDown: (e: React.KeyboardEvent) => void
  }
}

function useToggle(initial = false): UseToggleReturn {
  const [isOn, setIsOn] = useState(initial)

  const toggle = useCallback(() => setIsOn(v => !v), [])
  const on = useCallback(() => setIsOn(true), [])
  const off = useCallback(() => setIsOn(false), [])

  const getToggleProps = useCallback(() => ({
    role: 'switch' as const,
    'aria-checked': isOn,
    onClick: toggle,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        toggle()
      }
    },
  }), [isOn, toggle])

  return { isOn, toggle, on, off, getToggleProps }
}

// Consumer apni styling decide karta hai
function DarkModeToggle() {
  const { isOn, getToggleProps } = useToggle(false)

  return (
    <button
      {...getToggleProps()}
      className={\`\${isOn ? 'bg-violet-600' : 'bg-gray-300'} w-12 h-6 rounded-full transition-colors relative\`}
    >
      <span className={\`\${isOn ? 'translate-x-6' : 'translate-x-1'} w-4 h-4 bg-white rounded-full absolute top-1 transition-transform\`} />
    </button>
  )
}

// Using Radix UI (real headless library)
import * as Dialog from '@radix-ui/react-dialog'

function MyModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="my-custom-button-class">Open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 w-96">
          <Dialog.Title>My Custom Modal</Dialog.Title>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}`,
            explanation: "getToggleProps() — ye prop getter pattern hai. Ek function call karo, ek object milta hai — role, aria-checked, onClick, onKeyDown — sab preset. Aap sirf spread karo `{...getToggleProps()}`. Button pe automatically: screen reader ko pata hai ye switch hai, Space/Enter se toggle hoga, aria state update hoga. Ye kaam tumne nahi kiya — headless component ne kiya! Styling mein? IsOn se conditional class lagao — done. Complete separation of concerns — logic aur look alag alag."
          }}
          realWorldScenario="Vercel ka UI dekho — world class design. Linear ka UI — gorgeous. Dono Radix UI use karte hain. Shadcn/ui — ye Radix UI + Tailwind ka pre-built collection hai. Jo cheez powerful hai — components tumhari codebase mein copy hote hain, black-box library nahi. Customize karna? Direct file mein jaao, change karo. Ye next level hai — tumhara design system, tumhara control, production-grade accessibility free mein."
          commonMistakes={[
            {
              mistake: 'Accessibility props miss karna headless component mein',
              why: 'Headless component ka main value proposition accessibility hai — bina ARIA attributes ke screen readers kaam nahi karte.',
              fix: 'role, aria-checked, aria-expanded, aria-label — ye sab include karo. WCAG guidelines follow karo. Radix UI use karo agar properly implement karna mushkil lage.',
            },
            {
              mistake: 'Headless library ka overhead ignore karna simple cases mein',
              why: 'Simple button ke liye full headless library overkill hai — bundle size increase hoti hai.',
              fix: 'Simple use cases ke liye native HTML elements use karo — <button>, <input>, <select>. Headless libraries complex interactive components ke liye — modals, comboboxes, date pickers.',
            },
          ]}
          proTip="Teen options hain tumhare paas — Radix UI (polished, Tailwind ready, industry standard), Ark UI (chakra team ka, great API), React ARIA (Adobe ka, most comprehensive). Recommendation? Radix UI + shadcn/ui se shuru karo. shadcn/ui install nahi hota — copy paste hota hai. Components tumhare codebase mein, tumhari ownership. Ek baar setup karo, life mein kabhi custom component ki tension nahi."
        />
      </div>

      <div id="pattern-guide">
        <ConceptCard
          title="Kab Kaunsa Pattern? — Decision Guide"
          emoji="🗺️"
          difficulty="advanced"
          whatIsIt="Sab patterns seekh liye — ab sabse important sawaal: 'Kab kya use karoon?' Ye decision hi senior developer aur junior developer ko alag karta hai. Junior developer ek pattern seekhta hai aur sab jagah lagata hai. Senior developer problem dekh ke decide karta hai — hammer ke paas sab kuch nail nahi hota. Har pattern ek specific problem ka solution hai. Galat pattern lagao — code complex ho jaata hai. Sahi pattern lagao — code almost khud document karta hai."
          whenToUse={[
            'HOC: Component wrapping + logic inject karna, existing component enhance karna, decorator pattern',
            'Render Props: Dynamic rendering chahiye, consumer ko full UI control chahiye',
            'Compound Components: Related multi-part components, declarative API design, tabs/accordion/dropdown',
            'Headless: Custom design system, accessibility-first, styling freedom zaroori',
          ]}
          whyUseIt="Pattern mismatch ek silent killer hai. Sab kuch technically kaam karta hai lekin code padhna torture ban jaata hai. Right pattern mein: naya developer code padhe aur instantly samjhe kya ho raha hai. Wrong pattern mein: experienced developer bhi 20 minutes baad bhi confuse. Pattern selection ek skill hai — aaj ye guide roto, kal ye intuition ban jaayegi."
          howToUse={{
            filename: 'pattern-guide.tsx',
            language: 'typescript',
            code: `// Decision matrix:

// ✅ HOC — jab:
// - Component enhance karna ho bina source modify kiye
// - Cross-cutting concerns (auth, analytics, error boundaries)
const withAuth = (C: ComponentType) => (props) => { /* ... */ }
const SecurePage = withAuth(Dashboard)

// ✅ Render Props — jab:
// - Same logic, different UI
// - Consumer ko complete rendering control chahiye
<DataFetcher url="/api/data">
  {({ data, loading }) => loading ? <Spinner /> : <Table data={data} />}
</DataFetcher>

// ✅ Compound Components — jab:
// - Multi-part component family banana ho
// - State siblings ke beech share karni ho
<Tabs defaultTab="a">
  <Tabs.Tab id="a">Tab A</Tabs.Tab>
  <Tabs.Panel id="a">Content A</Tabs.Panel>
</Tabs>

// ✅ Custom Hook — jab:
// - Logic reuse karna ho components mein
// - Stateful logic extract karna ho
// - Ye modern React mein HOC aur Render Props ka better replacement hai
const { data, loading } = useDataFetcher('/api/data')
const { isOn, toggle } = useToggle()

// ✅ Headless — jab:
// - Complete styling control chahiye
// - Accessible but unstyled components banana ho
<Dialog.Root><Dialog.Content className="my-style">...</Dialog.Content></Dialog.Root>`,
            explanation: "Decision flow — ek baar yaad kar lo seedha. Server data hai? TanStack Query. Simple UI toggle? useState. Logic share karni sibling mein? Lift to parent. App-wide logic reuse? Custom Hook pehle try karo. Hook se render behavior change nahi ho sakta? Tab HOC. Multi-part component family banana hai? Compound Components. Complete styling freedom chahiye accessible component ke saath? Headless. Mixed usage real apps mein normal hai — auth ke liye HOC, Tabs ke liye Compound, Button ke liye plain component. Sab ek saath coexist karte hain — force nahi karo.",
          }}
          realWorldScenario="Ek real SaaS dashboard mein kya hoga: Auth check ke liye withAuth HOC, Tabs UI ke liye Compound Components, user data fetch ke liye Custom Hook useUser, Button component simple component, Data grid ke liye Headless + Render Props. Ek hi app mein sab patterns kaam kar rahe hain — harmony mein. Ye hai real React architecture — no dogma, just pragmatic choices."
          commonMistakes={[
            {
              mistake: 'Ek pattern sab jagah force karna',
              why: 'HOC for everything ya Compound for everything — round peg in square hole.',
              fix: 'Problem-pattern alignment karo. Simple state = useState. Logic sharing = Custom Hook. UI composition = Compound. Library = Headless.',
            },
            {
              mistake: 'Patterns mix karna unnecessarily',
              why: 'HOC + Render Props + Compound sab ek component mein — complexity explosion.',
              fix: 'Simplest solution pehle try karo. Agar kaam kare toh done. Advanced patterns sirf jab actually needed ho.',
            },
          ]}
          proTip="Sabse powerful learning technique jo mai jaanta hoon — popular open source libraries ka source code padho. Formik, React Table, Radix UI, React Hook Form — sab GitHub pe hain, sab free hain. Ye patterns real production code mein kaise use hote hain dekhna — course se 10x zyada sikhoge. Challenge: aaj raat Radix UI Dialog ka source kholo. Compound Components ka pattern tumhe wahan milega — crystal clear."
        />
      </div>
    </div>
  )
}
