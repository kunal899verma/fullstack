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
          Jab simple components aur props kaafi nahi hote — jab components ko flexible, composable, aur reusable banana ho different contexts mein — tab advanced patterns kaam aate hain. HOC, Render Props, Compound Components — ye patterns React ecosystem mein everywhere hain.
        </p>
        <p className="text-[#A1A1AA] leading-relaxed">
          Radix UI, Headless UI, React Table — ye sab libraries in patterns use karti hain. Samajhne ke baad inhe use karna aur apne components mein implement karna dono easy ho jaata hai.
        </p>
      </div>

      <div id="hoc">
        <ConceptCard
          title="Higher-Order Components (HOC)"
          emoji="🔮"
          difficulty="advanced"
          whatIsIt="HOC ek function hai jo component leta hai aur enhanced component return karta hai. Logic inject karta hai — authentication, logging, theming — bina original component ko modify kiye. withAuth(Dashboard), withLoading(DataTable) — ye HOC pattern hai. Class component era ka pattern, ab Custom Hooks ne mostly replace kar liya lekin still relevant hai."
          whenToUse={[
            'Cross-cutting concerns — auth check, analytics, error boundary sab components mein',
            'Third party libraries jab component wrapping jaroori ho',
            'Legacy codebases jahan hooks nahi hain',
            'Component mein bhi logic inject karna ho — Display-time logic',
          ]}
          whyUseIt="HOC code reuse allow karta hai bina inheritance ke. withAuth wrapper ek baar likho — 20 components mein wrap karo. Each component apni pure logic pe focus karta hai, HOC cross-cutting concerns handle karta hai. Separation of concerns achieve hoti hai."
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
            explanation: "HOC generic type parameter <P extends object> use karta hai taaki original props type preserve ho. displayName DevTools mein readable name deta hai. Spread {...props} se original props pass hote hain. compose utility function multiple HOCs cleanly chain karta hai.",
          }}
          realWorldScenario="Analytics HOC — withAnalytics(PageComponent) — har page component mein page view track karna automatically. 50 pages mein ek baar wrap, HOC useEffect mein analytics.track('pageView', { page: Component.name }) call karta hai."
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
          proTip="Modern React mein Custom Hooks mostly HOC replace kar dete hain — useAuth() hook same logic deta hai without component wrapping complexity. HOC prefer karo jab component render behavior modify karna ho (conditional render, error catching). Logic reuse ke liye hooks prefer karo."
        />
      </div>

      <div id="render-props">
        <ConceptCard
          title="Render Props — Children as Function"
          emoji="📤"
          difficulty="advanced"
          whatIsIt="Render Props pattern mein component ek function prop accept karta hai — children ya render prop — jisko call karta hai kuch data ke saath. Component logic aur UI completely decoupled hoti hain. `<Mouse render={({ x, y }) => <div>Mouse at {x}, {y}</div>} />` — Mouse position track karta hai, UI tumhare haath mein."
          whenToUse={[
            'Component logic aur rendering dono share karne hoon alag alag UI ke saath',
            'Headless components banana — logic without styling',
            'Dynamic content rendering jisme parent ko child data access karna ho',
            'Libraries jaise Formik (field render props), React Table',
          ]}
          whyUseIt="Render props extreme flexibility deta hai. Ek component kai alag UIs serve kar sakta hai — DataProvider component data fetch karta hai aur children function ko data pass karta hai. Children decide karta hai kaise render karna hai. Composition over inheritance ka ideal implementation."
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
            explanation: "children function call hota hai current state ke saath. Caller (parent) decide karta hai UI kya dikhega — maximum flexibility. TypeScript generics DataFetcher ko typed banate hain. Render props hook era mein less common hain lekin library APIs mein abhi bhi bahut use hota hai.",
          }}
          realWorldScenario="Formik render props use karta hai: `<Formik onSubmit={...}>{({ values, handleChange }) => <form>...</form>}</Formik>`. React Table bhi: `const table = useReactTable({}); table.getRowModel().rows.map(...)`. Logic decoupled, UI flexible."
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
          proTip="Downshift library (autocomplete, select components) render props ka master example hai — getItemProps, getInputProps inject karta hai bina any styling. Study karo Downshift source code — advanced accessible component patterns ka perfect example hai."
        />
      </div>

      <div id="compound-components">
        <ConceptCard
          title="Compound Components — Implicit State Sharing"
          emoji="🧩"
          difficulty="advanced"
          whatIsIt="Compound Components ek parent component ke saath closely related child components hain jo state implicitly share karte hain — Context ke through. `<Tabs>`, `<Tabs.Tab>`, `<Tabs.Panel>` — parent state manage karta hai (active tab), children context se access karte hain. User ke liye declarative API milta hai."
          whenToUse={[
            'Tabs, Accordion, Dropdown, Modal — components jo multiple parts se bane hoon',
            'Related components mein state share karni ho bina prop drilling ke',
            'Flexible composition chahiye — children reorder ya customize kar sakein',
            'Library banana ho jo clean API expose kare',
          ]}
          whyUseIt="Compound components ke saath user declarative, readable JSX likhta hai. `<Select value={...} onChange={...}><Select.Option>...</Select.Option></Select>` — HTML select jaisa feel. Internal state management parent handle karta hai, consumer ko complexity ka pata nahi."
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
            explanation: "TabsContext sirf Tabs tree ke andar accessible hai. useTabs() helper null check karta hai — agar koi Tab ko bahar use kare toh clear error milega. Tabs.Tab = Tab pattern sub-components ko parent par attach karta hai — namespace organize karta hai. Children order flex hota hai — tabs reorder karo, panels anywhere rakho.",
          }}
          realWorldScenario="Radix UI primitives compound components use karte hain: `<Dialog.Root><Dialog.Trigger><Dialog.Content>` — koi bhi external styling nahi, complete control developer ko. React Select, React Table bhi similar patterns follow karte hain."
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
          proTip="Uncontrolled vs Controlled variants dono support karo: defaultTab (uncontrolled — internal state) aur value + onChange (controlled — external state). Jaise HTML input. Ye pattern maximum flexibility deta hai: simple use cases defaultTab se, complex integration value/onChange se."
        />
      </div>

      <div id="headless-ui">
        <ConceptCard
          title="Headless UI — Logic Without Styles"
          emoji="👻"
          difficulty="advanced"
          whatIsIt="Headless UI matlab components jo fully functional hain — keyboard navigation, ARIA attributes, focus management — lekin koi styling nahi. Consumer apni CSS apply karta hai. Radix UI, Headless UI (by Tailwind), React Aria — ye sab headless libraries hain. Maximum flexibility, accessibility guarantee."
          whenToUse={[
            'Custom design system banana ho from scratch',
            'Accessibility-first components chahiye bina opinionated styling ke',
            'Existing component library ka design theek nahi lagta',
            'Tailwind CSS ke saath completely custom styled components chahiye',
          ]}
          whyUseIt="Ready-made component libraries (Material UI, Ant Design) styling opinionated hoti hain — customize karna hard. Headless libraries behavior aur accessibility provide karte hain, styling tumhari. Best of both worlds: battle-tested logic + your unique design."
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
            explanation: "getToggleProps() pattern (prop getter) ARIA attributes, keyboard handlers sab ek object mein return karta hai — spread karo element par. Consumer ko accessibility ke baare mein sochna nahi — headless component sab handle karta hai. Styling 100% consumer ke haath mein.",
          }}
          realWorldScenario="Vercel aur Linear jaisi apps completely custom design systems hain — koi chakra UI ya MUI nahi. Radix UI headless primitives par banaye hain jo unke exact design implement karte hain. Ye workflow: Radix primitive + Tailwind CSS = any design possible."
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
          proTip="Radix UI, Ark UI, React ARIA — teen popular choices. Radix UI sabse polished API hai aur Tailwind ke saath perfect integrate hoti hai. shadcn/ui = Radix UI + Tailwind CSS pre-built — copy-paste components jo tumhare codebase mein rahein, no black-box library."
        />
      </div>

      <div id="pattern-guide">
        <ConceptCard
          title="Kab Kaunsa Pattern? — Decision Guide"
          emoji="🗺️"
          difficulty="advanced"
          whatIsIt="HOC, Render Props, Compound Components, Headless UI — inme se kab kya use karein? Har pattern ke trade-offs samjho aur use case ke hisaab se choose karo. Ek pattern dusre se better ya worse nahi hota — context matter karta hai."
          whenToUse={[
            'HOC: Component wrapping + logic inject karna, existing component enhance karna, decorator pattern',
            'Render Props: Dynamic rendering chahiye, consumer ko full UI control chahiye',
            'Compound Components: Related multi-part components, declarative API design, tabs/accordion/dropdown',
            'Headless: Custom design system, accessibility-first, styling freedom zaroori',
          ]}
          whyUseIt="Pattern mismatch se code messy hota hai. Right pattern right problem ke liye — clean API, maintainable code, happy consumers. Pattern selection ek skill hai jo experience ke saath aati hai."
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
            explanation: "Custom Hook > Render Props > HOC for logic reuse — modern React mein hooks preferred hain. Compound Components UI composition ke liye excellent hain. Headless library choice design system strictness par depend karta hai. Mixed usage bhi common hai — HOC for auth + Compound for UI.",
          }}
          realWorldScenario="Real app: Form library (HOC withFormik or hook useFormik), UI component Accordion (Compound Components), Button with loading state (simple component), Data grid (Headless + Render Props for row rendering). Sab patterns ek saath coexist karte hain."
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
          proTip="React ko samjhne ka best way popular open source libraries ka source code padho: Formik, React Table, Radix UI, React Hook Form. Ye sab in patterns ke excellent examples hain. GitHub par source padho — patterns real use cases mein kaise apply hote hain samjhoge."
        />
      </div>
    </div>
  )
}
